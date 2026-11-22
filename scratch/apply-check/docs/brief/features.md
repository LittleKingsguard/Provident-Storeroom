# The feature set, row by row

One row per capability: the member or mechanism that carries it, and what it guarantees. Everything in the right-hand column was measured on this tree; where a guarantee is a sentence of the declaration rather than a drive, the row says so. The figures live in one place — the **counts** table — and each figure carries the command or the site that produced it.

The package's whole namespace is **one name**: `storeCreate`. Everything else is a member of the object it returns.

## The fourteen own members

Measured at a live instance: `Object.getOwnPropertyNames(storeCreate({ journalLength: 64, listeners: [] }))` answers fourteen names, in this order — `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` · `constraintOff` · `constraints` · `removeListener` · `removeConstraint` · `register`. Each was driven at least once in the same pass.

| Member | What it does | What it guarantees (measured) |
|---|---|---|
| `storeCreate(cfg)` | constructs a store and answers its instance | the config's four declared keys are `journalLength` · `listeners` · `filePath` · `constraints`; a missing `journalLength` answered `ConstructionArgumentMissing`, a missing `listeners` answered `AddressMalformed`, `journalLength: 0` answered `AddressMalformed`, an unreachable `filePath` answered `FilePathUnreachable` |
| `read(address, tier?)` | the standing value at an address | `[]` reads the register; a tier argument is one token or an array read as an any-match set: `read([], ['mem','file'])` answered `{"f":"file","m":"mem"}`; a supplied `undefined` tier answered `AddressMalformed` |
| `readLiteral(address, tier?)` | the same read, narrowed to a leaf | a branch answered `ReadTargetIsBranch` — *"'doc' is a branch and not a leaf in 'doc', it holds a branch"* |
| `write(address, tier, value, commit?)` | lands one version at one tier and answers `{op, watched, triggered}` | the answer's `op` is the store's own eight-member journal record; `watched` is the listener addresses the act reached (`[["win"]]` with a listener at `['win']`, `[]` when none was), and `triggered` the pairs it fired; the constraint pass runs before the call returns; an array at the tier position answered `OutOfDomainTier`; a write under a leaf answered `WriteParentNotLink`; a child outranking its parent answered `ParentAnchorMonotonicityViolation` |
| `delete(address, tier?)` | removes the versions the address names and answers `{address, tiers, triggered, op}` | a tier holding no version is a success with `tiers: []` and `op: null`; an absent address answered `AddressNotFound` |
| `rollback(opId)` | reverses from an op forward over the subtree at that op's address and answers `{opId, undoneOps, restoredTo}` | the named op's whole subtree is restored (`[win,tabs]` read `ABSENT` after a rollback naming an op inside it) and addresses outside it are untouched; an op the journal no longer holds answered `JournalOpUnknown` |
| `listen(handle, addresses)` | binds the caller's own handle over a set of addresses and answers that handle | `listen('screen', [['doc']])` answered `"screen"`; the pair the act fires names the binding's address |
| `unlisten(handle)` | withdraws the binding and answers `undefined` | a value outside the domain is a no-op success (`unlisten('h1')` → `undefined`); the handle is the caller's, so a later `listen` under the same spelling answered that same spelling (`listen('x')`, `unlisten('x')`, `listen('x')` → `"x"`, `"x"`) |
| `register(handle, listener)` | binds a function to a handle | answers `undefined`; called before its `listen`, it answered `AddressMalformed` naming the rule that a registration names a live listener entry |
| `addConstraint(pair, constraint)` | registers a pair and answers an opaque identity | a second `addConstraint` at the same pair answered **the same identity** (`id === second` → `true`) and replaces the function; the pair is one address or a set of addresses |
| `constraintOn(pair, constraint)` | enables the pair, answering `undefined` | a re-enable re-evaluates the pair at its own instant: enabled over a state the pair refuses, it answered `ConstraintRefusedAtRegistration` — *"a registered constraint must answer true for the state its pair is registered at"* |
| `constraintOff(pair, constraint)` | disables the pair without removing it, answering `undefined` | the disabled pair still appears in `constraints()` (`[{"address":[["a"]],"id":"no-two"}]` after the call), and a write it would have refused landed and read back `2` |
| `constraints()` | the registered pairs | a fresh array in registration order: `[{"address":[["doc"]],"id":"c1"}]` — the `address` member is the pair's own address set, and no function and no identity is in it |
| `removeListener(handle)` | removes the entry whole, answering `undefined` | measured `undefined` at a live handle |
| `removeConstraint(pair)` | removes the pair, answering `undefined` | accepts `{address: ['doc'], id: 'c1'}`; **handing back the element `constraints()` answered** (whose `address` is `[["doc"]]`) was refused: *"the pair … is 'c1' at [["doc"]], and this instance holds no constraint pair there"* |

## The judgement, the repair and the delivery

| Mechanism | What it is | What it guarantees (measured) |
|---|---|---|
| a constraint pair | an address plus a JS function, called with one context argument | a passing write asks the pairs at the act's address and at its ancestors, and a pair BELOW the act when the act changes what stands at the pair's address: a write of `{c:2}` at `['a','b']` asked the pair at `['a','b','c']` once and the pair at `['a','b','e']` **0** times; a write of `{c:2,e:9}` there asked both once. A body that reads its own address answers on what it read — `context.value` is the value the write verb returned, measured `40` while the pair's own address still held `credits: 0` |
| a refusal | a thrown plain object, not an `Error` and not a returned value | four own members, always: `status` · `message` · `log` · `address`; the store is exactly as it stood before the refused act |
| a repair | the object a pair may return instead of `true`: `{message, repair}` | the repair's write joins the write's commit — the write's record carried the repair's own op (`op-3` both sides, at `["ledger","credits"]`) — and the re-run asks the pair at the repaired state |
| a listener | a JS function registered under a caller's handle, called with the act's address | runs once every constraint has passed, and reads the landed state (`saw {"title":"x"}`); a listener's own write opens a commit of its own — a `listen` + `register` + `write` drive opened `2` commits, and `3` when the listener's body wrote, while the same drive with a constraint body writing opened `2` |
| the addresses a binding carries | `triggered` on the record, and the listener's argument | the pair names the **binding's** address (`{"handle":"watch","address":["win"]}`) and the listener's argument is the **act's** address (`["win","tabs","landingPage","active"]`) |
| which act was refused | the fourth member of the failure form | equal to the address you wrote means your own act was refused; different means a listener's was: writing `[a]`, the caller caught `ConstraintPassRefused | address ["b"]`; writing `[b]` itself, `address ["b"]` |

## Counts, each measured

| Figure | Value | Measured by |
|---|---|---|
| named exports of the entry | **1** (`storeCreate`) | `Object.keys(await import('./bindings/js/index.mjs'))` → `["storeCreate"]`; declared at `bindings/js/index.d.ts`'s header |
| own members of an instance | **14** | `Object.getOwnPropertyNames(storeCreate({journalLength:64,listeners:[]}))`, the fourteen quoted above; declared at `StoreInstance` in `index.d.ts` |
| declared config keys | **4** | `StoreConfig` in `bindings/js/index.d.ts`; each key's refusal driven (table above) |
| tiers | **3** — `mem` · `file` · `temp` | `index.d.ts`'s `Tier`; one write at each tier landed, and only `file` survived a restart |
| the closed status set | **20**, ranked `1`…`20` | `src/error.rs`'s `pub const CODES: [&str; 20]` (line 113) — the list lives there, one quoted member per line; mirrored in `index.d.ts`'s `StoreStatus` (`sed -n '325,346p'` counts 20 literals, plus the `(string & {})` escape arm) |
| the kernel's `KC` tokens | **9** — `KC-1`…`KC-9` | `bindings/js/src/entry/kernel-foundations.mjs`'s `KC`: `Object.values(KC).length` → 9 |
| `LogEntry` members | **5** — `kind` · `id` · `message` · `opId` · `state` | a real refusal's entry: `Object.keys(e.log[0])` → `["kind","id","opId","message","state"]`; declared at `index.d.ts`'s `LogEntry` |
| `LogEntry` kinds | **4** — `constraint-check` · `repair-run` · `commit` · `outcome` | the `kind` union in `index.d.ts`'s `LogEntry`; all four read off real refusals in this pass (a simple refusal printed `constraint-check` and `outcome`; a failed repair printed `["constraint-check","repair-run","commit","constraint-check","outcome/KC-5"]`) |
| the failure form's members | **4** — `status` · `message` · `log` · `address` | `Object.keys(caught).length` → 4 on a real refusal; declared at `index.d.ts`'s `StoreRefusal` |
| `discarded`'s carriers | **3** — the write record, the delete record, the rollback record | `Object.getOwnPropertyDescriptor(record,'discarded')` on each of the three read `enumerable=false`, `value=[]` |
| non-enumerable record members, by name | **2** — `discarded` (on all three records) and `commit` (on the delete's receipt) | the same descriptor probe: `delete.commit` is an own, non-enumerable data property; therefore a spread copy of a record carries neither member |
| restart budget | **3** | `RESTART_LIMIT = 3` in `bindings/js/src/entry/constraints.mjs`; its own refusal message reads *"the check was restarted 3 times and the budget is spent"* |
| the value walk's depth ceiling | **126** admitted, **127** refused | `deep(125)`/`deep(126)` admitted, `deep(127)`/`deep(128)` refused `ValueRefusedAtBoundary`; `const ENCODER_CEILING = 126` in `bindings/js/src/entry/carrier.mjs:94` and `if depth > 126` in `bindings/js/src/crossing.rs:716` |
| the value walk's node ceiling | **1,000,000** | `export const NODE_CEILING = 1_000_000` in `bindings/js/src/entry/class-decision.mjs:1025` and `visited > 1_000_000` in `bindings/js/src/crossing.rs:716` — **read at its bytes, not driven**: no drive in this pass built a million-node value |
| the packed member set | **20** | `npm pack --dry-run --json` at `bindings/js`: `entryCount` 20 — `1` `package.json` + `5` root files + `13` entry modules + `1` kernel |
| the manifest's `files` allowlist | **7** rows | `bindings/js/package.json`'s `files` array: `index.mjs` · `README.md` · `README.guide.md` · `RELEASE-NOTES.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` |

## Limits a reader should know before writing code

- **A leaf is not a link.** The value at a node is whole; writing a child under a leaf answered `WriteParentNotLink` (*"'kid' cannot be written into 'leaf', it holds a leaf and not a link"*) and reading one answered `LeafHasNoDownstream`. Write an object or an empty object at a node first if you want children under it.
- **Persistence runs one way.** `temp` < `mem` < `file`; a child may not outrank its parent, and the register's own tier is fixed at construction (`file` with a `filePath`, `mem` without).
- **A repair corrects beside the act.** The attempt is open at its own address, so a repair's write there was refused: *"a constraint attempt is already open at a; it is disposed of by its own K-3 and by no other act"*.
- **The read of a pair is not the pair a removal takes.** `constraints()` answers `{address: [["doc"]], id}`, and `removeConstraint` wants `{address: ["doc"], id}`.
- **The refusal restores the act's own address; a write a body made BESIDE it is not always reached.** Two failing arms of the same commit, each driven once: a body that wrote `['side']` and then refused (no repair offered) left `side = "body wrote this"` standing while `a` was restored to `1`, with **one** commit open during the whole write (`["constraint-check","commit","outcome/KC-3"]`); a body that offered a repair, whose repair wrote `['side']` and whose re-run then refused, left `side` `ABSENT` and `a` at `1` (`["constraint-check","repair-run","commit","constraint-check","outcome/KC-5"]`). The two arms differ, and this pass measured the difference rather than explaining it: **keep the pre-attempt value of any beside address yourself if your own code writes there.**

## Not present

Named as plainly as the list of what is there, because a reader who assumes one of these will design around machinery that is absent.

- **No schema language.** No type declaration, no migration, no validator, no versioned document format. A value is admitted or refused by the store's own walk, and a rule you want enforced is a function you register.
- **No query language.** No selector, no path expression, no filter, no projection. The readers are `read`, `readLiteral` and `constraints`, and each takes an address, not a pattern.
- **No read-side enforcement.** A read asks no pair: with a pair registered at `['a']`, `asks at registration: 1 | asks after 4 reads: 1`.
- **No network API.** The shipped entry, the thirteen entry modules, the kernel and `src/store.rs` carry zero matches for a socket, an HTTP client or a server.
- **No coordination between instances — one process per store.** Two instances opened over one `filePath` in one process did not see each other's writes, and the later writer's file replaced the earlier one's: after `A` wrote `k` and `B` wrote `k2`, a third instance read `{"k2":"from B"}`.
- **No release verb.** No `dispose`, no `close`, no finalizer: the instance's state is released with the instance. A grep of `index.d.ts` for those three words finds them only in the sentences that refuse them.
- **No undo across a restart.** The journal an op id names belongs to the process: after a `SIGKILL` and a restart, a rollback to a pre-crash op answered `JournalOpUnknown`.
- **No guard on a listener chain.** The restart budget, the applied-repair marker and the per-op floor belong to the constraint pass. A listener that writes has no budget and no depth bound: a listener that wrote the node it watched ran to the depth its own condition allowed (`4` levels in the drive) and one further caller write opened `4` commits as the chain ran — the chain proceeded until the drive's own condition stopped it.
- **No cross-store transaction.** A store is one path; there is no envelope over two stores and no two-phase anything.
- **No digest, no registry tie, no consumer-loading claim** in these documents: they describe a locally built tree, and no registry figure appears in them.
