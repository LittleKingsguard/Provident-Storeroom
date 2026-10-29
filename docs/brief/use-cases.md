# Six use cases, each driven

Every block below is printed output from a drive against this checkout, through the published entry (`bindings/js/index.mjs`). Each use case gives the situation, the shape of the calls, the guarantee that makes it safe, and what the drive printed. Every drive is a `node --input-type=module` script run from the repository root; the code blocks are the bodies, abbreviated where a line is setup.

---

## 1 · Persist a document tree, and read it back in a new process

**Situation.** You have a document tree — a window, its tabs, each tab's own state — and you need the next process to open it. You do not want to write a serializer, a schema or a recovery path.

**The shape.** Construct with a `filePath`; write each node at the `file` tier; the next process constructs over the same `filePath` and reads.

```js
// process A
const s = storeCreate({ journalLength: 128, listeners: [], filePath: STORE });
s.write(['window'], 'file', {});
s.write(['window','tabs'], 'file', { landingPage: { active: true }, settings: { active: false } });

// process B — a different OS process, same path
const b = storeCreate({ journalLength: 128, listeners: [], filePath: STORE });
b.read(['window','tabs','landingPage','active']);
```

**The guarantee.** A construction over the path reads the tree the previous process left, and a `file`-tier write is durable when the call returns (use case 5 kills a process to measure that). `mem` and `temp` values do not come back; only `file` does.

**What it printed.**

```
A: wrote op op-2 seq 2 tier file
A: register {"window":{"tabs":{"landingPage":{"active":true},"settings":{"active":false}}}}
B: a NEW process, a FRESH instance over the same filePath
B: register {"window":{"tabs":{"landingPage":{"active":true},"settings":{"active":false}}}}
B: window.tabs.landingPage.active = true
C: no filePath -> register {}
```

Process C, constructed with no `filePath`, read an empty register — the memory is the instance's, and only the path is the process's.

---

## 2 · Keep an invariant where the data lives

**Situation.** The rule is "the ledger balances". It must hold for every edit that touches the ledger, whoever makes it, not only in the one function that updates it.

**The shape.** A pair at `['ledger']` reads the branch and answers `true` or a refusal. The pass asks it on every edit at or below `['ledger']`, including an edit at a descendant. A refusal is thrown and the commit is rolled back; a pair may instead offer a `repair`, whose write joins the same commit.

```js
store.addConstraint({ address: ['ledger'], id: 'balance' }, (ctx) => {
  const held = store.read(['ledger']);               // the body reads what it judges
  if (held.debits === held.credits) return true;
  return {
    message: 'ledger must balance: the repair posts the credit',
    repair: () => {
      const landed = store.write(['ledger','credits'], 'mem', held.debits);
      return { ok: true, op: landed.op };
    },
  };
});
store.write(['ledger','debits'], 'mem', 40);
```

**The guarantee.** A refused write leaves the address it wrote as it found it. A repair runs inside the write's own commit: its op is the op the write's record carries, and the re-run asks the pair at the repaired state.

**What it printed** — the refusing arm first (no repair registered), then the repairing arm.

```
REFUSED ConstraintPassRefused | address ["ledger","debits"] | log ["constraint-check","outcome/KC-3"]
  message: ledger must balance: 40 vs 0
  ledger before {"credits":0,"debits":0} | after the refusal {"credits":0,"debits":0}
REPAIRED: write answered op op-5 | ledger {"credits":40,"debits":40}
  pair asked 4 times: [{"contextValue":{"credits":0,"debits":0},"ledger":{"credits":0,"debits":0}},
                       {"contextValue":40,"ledger":{"credits":0,"debits":40}},
                       {"contextValue":40,"ledger":{"credits":40,"debits":40}},
                       {"contextValue":40,"ledger":{"credits":40,"debits":40}}]
```

Four asks: the registration's own evaluation, the pass's (the ledger unbalances — `debits 40` against `credits 0`), the repair's own joined write, and the re-run that passes at the repaired state.

**And the commit's record carries the repair's own op.** The same drive, with the repair's op captured beside the write's answer:

```
the write answered op op-3 | the repair landed op op-3 | equal: true
the op's address: ["ledger","credits"] | before {"present":true,"value":0} | after {"present":true,"value":40}
ledger {"credits":40,"debits":40} | record keys ["op","watched","triggered"]
```

The act the caller asked for was a write at `['ledger','debits']`; the state the commit stands at is the repair's, at `['ledger','credits']`, and one record describes both.

**One measured limit.** A repair may not write at the address the attempt itself wrote — that write is refused, because the attempt is open there:

```
  repair write refused: ConstraintPassRefused | a constraint attempt is already open at a; it is disposed of by its own K-3 and by no other act
```

So a correction lands beside or below the act; it does not re-write the act's own address.

---

## 3 · React to a change — and why a callback that writes is a constraint

**Situation.** Something else in the application must notice a change: a screen redraws, an external call is made. That is a listener.

**The shape.** `listen(handle, addresses)` registers the caller's own handle over a set of addresses and answers it; `register(handle, listener)` binds the function. The listener is called with the act's address as its one argument.

```js
store.listen('screen', [['doc']]);
store.register('screen', (address) => render(address, store.read(['doc'])));
store.write(['doc'], 'mem', { title: 'x' });
```

**The guarantee.** A passing write delivers its residue to the listeners once every constraint has passed, and what the listener sees is the landed state.

**What it printed.**

```
listen answered "screen"
write answered op op-1 | triggered [{"handle":"screen","address":["doc"]}]
listener ran 1 time(s): [{"address":["doc"],"saw":{"title":"x"}}]
```

**The rule that a callback which writes is a constraint, not a listener.** A constraint body's write joins the write's own commit and is judged by the pass; a listener body's write opens a commit of its own, after the pass has already passed — so the chain it starts is the caller's to bound. Measured on the commit counter (`Symbol.for('provident-storeroom.attempt-opened')`), one act at a time:

```
openings  listen+register only         : 1
openings  ... plus one write            : 2
openings  ... the listener WRITES       : 3
openings  addConstraint + one write     : 2
openings  ... the constraint body WRITES: 2
```

The writing listener adds an opening; the writing constraint body does not. That is the mechanical difference the rule names: the pass sees a constraint's write, and the pass is over before a listener runs.

**And the failure form tells you whose act it was.** The same pair, refusing the same value, from the caller's own call and from inside a listener:

```
caller wrote [a]; threw ConstraintPassRefused | address ["b"] <- the LISTENER's act
caller wrote [b]; threw ConstraintPassRefused | address ["b"] <- its OWN act
```

The status and the message are identical; `address` is the discriminator.

---

## 4 · Undo: `rollback` and the reach of its restore

**Situation.** An act went wrong and you have its record. You want the state it left gone.

**The shape.** Every write's record carries `op.opId`; `rollback(opId)` reverses from that op forward over the subtree at that op's address and answers `{opId, undoneOps, restoredTo}`.

```js
const made = store.write(['win','tabs'], 'mem', { landingPage: { active: true } });
store.write(['win','settings'], 'mem', { theme: 'dark' });
store.write(['win','tabs','landingPage','active'], 'mem', false);
const r = store.rollback(made.op.opId);
```

**The guarantee.** The whole subtree at the named op's address is restored to the state before that op, and addresses outside that subtree are untouched.

**What it printed.**

```
before rollback: {"settings":{"theme":"dark"},"tabs":{"landingPage":{"active":false}}}
rollback(op-2)  -> {"opId":"op-2","undoneOps":["op-4","op-2"],"restoredTo":{"present":false}}
after:           {"settings":{"theme":"dark"}}
  [win,tabs]     -> ABSENT (AddressNotFound) <- the named op's whole subtree
  [win,settings] -> {"theme":"dark"} <- outside the named subtree
```

Two further measured properties of the same member:

```
rollback to the FIRST op at [a]: {"opId":"op-5","undoneOps":["op-7","op-5"],"restoredTo":{"present":false}}
  a = ABSENT (AddressNotFound) | b = 2 <- another subtree is not reached
```

a second subtree is not reached, and — with a short journal — the floor refuses an op that has been compacted away:

```
journalLength 2, rollback to the oldest op ->
  JournalOpUnknown | 'op-1' is not an operation this store's journal holds, ops are reached through the journal op a write returned
```

---

## 5 · Survive a crash: the journal, the floor, what a restart reads

**Situation.** The process is killed — not asked to shut down. What does the next process see?

**The shape.** No special call: write at the `file` tier, and construct the next store over the same path. The drive kills its own process with `SIGKILL` after the last write.

```js
s.write(['doc','count'], 'file', 7);
process.kill(process.pid, 'SIGKILL');
// ... a new process:
const again = storeCreate({ journalLength: 8, listeners: [], filePath: STORE });
again.read(['doc']);
```

**The guarantee.** In this drive a process killed with `SIGKILL` after three `file`-tier writes lost none of them, and the restart read the tree the killed process left. The restart reads the data; it does not carry the previous process's journal, so an undo of a pre-crash op is refused.

**What it printed.**

```
A: last op op-3 seq 3 | doc = {"count":7,"title":"hello"}
file: /tmp/uc5/crash.store 35 bytes
B: a NEW process over the same filePath
B: doc = {"count":7,"title":"hello"} | doc.title = "hello" | doc.count = 7
B: rollback to op-1 -> JournalOpUnknown | 'op-1' is not an operation this store's journal holds, ops are reached through the journal op a write returned
```

**The floor.** `journalLength` bounds the journal: past it, older ops are compacted, and a rollback reaching one of them is refused with a store floor code. Use case 4 prints that arm with a journal of two — `journalLength 2, rollback to the oldest op -> JournalOpUnknown` — and `RollbackCompacted` is the pair's other member, at `STORE_FLOOR_CODES` in `bindings/js/src/entry/kernel-foundations.mjs`.

---

## 6 · Watch a whole subtree

**Situation.** One binding must cover a subtree, not one address: whatever changes under `['win']` — a tab's state, an entry in a list — should reach the same function.

**The shape.** One handle, one listener, one address at the ancestor. The drive asks whether the binding at the ancestor is reached by an act at a descendant, and which address each of the two carries.

```js
store.listen('watch', [['win']]);
store.register('watch', (address) => repaint(address));
store.addConstraint({ address: ['win'], id: 'whole-subtree' }, (ctx) => true);
store.write(['win','tabs','landingPage','active'], 'mem', false);
```

**Guarantee, and the two addresses that are easy to confuse.** The record's trigger pair names **the binding's** address; the listener's argument is **the act's** address. Both were read in the same drive.

**What it printed.**

```
write answered op op-3
  record.triggered  : [{"handle":"watch","address":["win"]},{"handle":"whole-subtree","address":["win"]}]
  listener argument : [["win","tabs","landingPage","active"]] <- the ACT address, not the binding address
  the pass asked the pair: [{"act":["win"],"value":{"tabs":{"landingPage":{"active":true}}}},
                            {"act":["win","tabs","landingPage","active"],"value":false}]
```

The first pair entry is the registration's own evaluation; the second is the pass, asked at a descendant of the pair's address.

**An index is a segment, and the register stores a list as one node.** Writing at `['win','list',1]` is an ordinary write at an address whose last segment is an index; the listener received that address, and the register still shows one node holding the whole list.

```
  write at [win,list,1] landed; list = ["a","B"] | listener argument: ["win","list",1]
  register holds the list as ONE node: {"win":{"list":["a","B"],"tabs":{"landingPage":{"active":false}}}}
  read [win,list,0] = "a"
  read [win,list,2] -> AddressNotFound | 2 does not exist in 'win.list', list are 0, 1
```

An out-of-range index is refused, and the refusal names the indices that do exist. The register holds one node for the list, and the index addresses a position inside that node's value rather than a node of its own.
