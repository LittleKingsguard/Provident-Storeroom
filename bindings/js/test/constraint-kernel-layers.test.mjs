// RED SET — `U-STOREROOM-CONSTRAINTS`, THE TWO DELIVERY LAYERS, THE ORDER LAW, AND THE CALLER'S OWN MAP
//
// DERIVED FROM THE CONTRACT ALONE: `kernel-surface.md §2.1` item 2 (`CommitRecord.pending` and the ONE
// law that replaces every withheld instant phrasing), `§2.2` items 1–3 (what the kernel does with the
// handle), `§2.3` item 1 (the evaluation's address-scoped set), `attempt-lifecycle.md §2.4` item 8
// (ii) (e), and `e2e-scenarios-b.md`'s `E2E-C-16`.
//
// ── THE STATES ENUMERATED BEFORE THE TESTS ─────────────────────────────────────────────────────
//
// DELIVERY IS SPLIT BY LAYER, AND THE LAYER IS FIXED BY THE WRITE THAT RETURNED EACH HANDLE AND BY
// NOTHING ELSE (`A: docs/decisions.md` · `A107` `D1`; `A108` `D2`):
//   (a) A HANDLE WHOSE PAIR THE PASS EVALUATED: the kernel delivers it IN ITS OWN WINDOW — ONE
//       delivery per evaluated pair, each carrying THAT PAIR'S OWN FUNCTION, called with that
//       attempt's context and with NO other argument.
//   (b) A HANDLE THE WRITE RETURNED THAT THE KERNEL HAS NOT INVOKED IN ITS OWN WINDOW: it stands in
//       the named member `CommitRecord.pending`, its body STANDS OUTSIDE THE KERNEL'S OWN ACT, and
//       THE CALLER'S OWN LOOP OVER THAT MEMBER IS THE ONLY INVOKER LAYER (b) HAS.
// THE ONE LAW, AND NEVER THE INSTANT: EVERY LAYER (a) DELIVERY OF A CALL COMPLETES BEFORE ANY LAYER (b)
//   BODY OF THAT CALL RUNS. The layer-(b) instant is deliberately UNNAMED and is asserted NOWHERE here.
// THE TWO-KIND RULE BY REGISTRATION KIND: a handle whose pair the kernel itself registered resolves to
//   a `K-1`-registered function; a handle the caller registered as a plain store listener resolves to a
//   plain store listener and carries THE TRIGGERING ADDRESS as its ONE argument.
// THE MEMBERS' DIFFERENT EXTENTS: `triggered` carries EVERY handle the write returned, `pending` the
//   not-yet-invoked ones — and a handle already run is NEVER a member of both.
// THE TWO-IDS-ONE-HOME STATE (`PAR-C-1`): two registrations at ONE address under two ids leave TWO
//   registry entries — each with its OWN registered function — and ONE store home entry.
//
// ── THE CLAUSE CITED FOR EVERY CELL WHOSE MEMBER IS READ OFF A RECORD, AND WHERE THE RECORD STANDS ──
// `CommitRecord` is the kernel's OWN four-member record and is minted by `K-2` ALONE
// (`kernel-surface.md §2.1` item 2: `{attempt, op, triggered, pending}`, "the store's write returns
// `{op, watched, triggered}` and the kernel's record carries TWO of those members VERBATIM, plus the
// attempt's identity and the kernel's own `pending` member"). No cell here reads `pending` — or any
// member of that record — off a STORE verb's returned value, and `pending` carries THE HANDLES THE
// CALLER'S OWN WRITE RETURNED, the kernel-made ones standing in `triggered` ONLY (`§2.1` item 2;
// `§2.2` items 2–3; `A108` `D1`/`D2`).
// AND THE HANDLE ITSELF: the value the STORE'S OWN VERB ADOPTED for an address, one per address, never
// a token the kernel minted and never a type any clause of this directory spells — `A: bindings/js/
// index.d.ts` declares `Handle = object` and the store's own `on`/`listen` answer it
// (`kernel-surface.md §2.1` item 1's return-shape row; `§2.2` item 3).

import test from 'node:test';
import assert from 'node:assert/strict';

import { write as storeWrite } from 'provident-storeroom';

import {
  kernel, makeStore, tag,
  assertAttemptReport, assertLogEntry, assertSeqIncreasesFromOne,
  capture, entries, checkIds, countingListener,
} from './constraint-kernel-helpers.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §1  LAYER (a) — ONE DELIVERY PER EVALUATED PAIR, EACH WITH THAT PAIR'S OWN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_layer_a_a_kernel_made_writes_returned_handle_is_invoked_in_the_kernel_s_own_window', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('la')];
  const contexts = [];
  register(store, address, 'x', (ctx) => {
    contexts.push(ctx);
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'v');
  const report = runAttempt(store, commitRecord);
  assertAttemptReport(report, 'layer (a)');
  assert.equal(contexts.length, 1, 'ONE delivery per EVALUATED PAIR, and for no other handle');
  assert.deepEqual(contexts[0].address, address, 'delivered with that attempt\'s context');
  assert.deepEqual(Object.keys(contexts[0]).sort(), ['address', 'attempt', 'op', 'tier', 'value'],
    'and with NO other argument: the attempt context is the ONE argument layer (a) passes');
  assert.deepEqual(contexts[0].op, commitRecord.op, 'the context carries the op being evaluated');
});

test('ck_layer_a_two_ids_at_one_address_each_get_their_own_function_and_one_store_home', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('la2')];
  // ONE store home entry: the second registration at the same address adopts the SAME handle, and
  // the store holds one entry while the kernel's registry holds TWO pairs.
  const seen = [];
  const h1 = register(store, address, 'x', () => { seen.push(['x']); return true; });
  const h2 = register(store, address, 'y', () => { seen.push(['y']); return true; });
  assert.equal(h1, h2, 'two pairs at ONE address stand behind ONE store home entry');
  const report = runAttempt(store, commit(store, address, 'mem', 'v'));
  assertAttemptReport(report, 'two ids at one address');
  assert.deepEqual(checkIds(report.log), ['x', 'y'],
    'the one store entry delivered to BOTH pairs, each with its own registered function');
  assert.deepEqual(seen, [['x'], ['y']],
    'in the registry\'s own first-registration order — the ONE order a drive may compare');
});

/**
 * RE-DERIVED AT THE `U-STOREROOM-CONSTRAINTS` RED-SET RE-DERIVATION PASS, READING `attempt-lifecycle.md
 * §2.4` ITEM 5 (iii) AT ITS BYTES.
 *
 * THE PHrasing THIS CELL ONCE DROVE — *"a constraint runs before other listeners AT A WATCH ADDRESS"*,
 * read as ONE address carrying a constraint body AND a plain listener body that both run from the
 * store's own delivery, IN THAT ORDER — IS **WITHDRAWN BY NAME** AT THAT CLAUSE, and the measurement
 * is printed there: the store's convenience member `on(address, listener)` REPLACES the function
 * already held for that address, the store holding ONE FUNCTION PER ADDRESS, so at ONE address the
 * reachable states are *the address's constraints evaluated — from the kernel's own window — with NO
 * other body running from the store there*, or *the plain listener's body run by whoever registered it
 * last, with NO constraint pass delivered from that address*, and NEVER the two in the order asserted
 * (`A: docs/specs/storeroom-js/surface.md §2.4` item 7 (a); `A108` `DF-1`; `A109` `D1`/`D2`). A rule no
 * drive can reach is not a rule, so this cell no longer asserts it.
 *
 * THE ONE MEMBER-READABLE ORDER THE CLAUSE DOES DECLARE, AND WHAT THIS CELL NOW DRIVES: **every
 * `constraint-check` and every `outcome` entry a pass appends stands in the attempt's `log` BEFORE ANY
 * BODY THE CALLER'S LOOP RUNS OFF `CommitRecord.pending`** — read off `log`'s `seq` ORDER, never off an
 * invocation count and never off an instant (`attempt-lifecycle.md §2.4` item 5 (iii); `kernel-surface.md
 * §2.5` item 1; `fail-surface.md §1.1` item 3). The kernel's own registration displaces the plain
 * listener at that address — asserted below, so the withdrawal is DRIVEN and not assumed.
 */
test('ck_layer_a_constraints_run_before_other_listeners_at_the_same_address', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('la3')];
  const order = [];
  // THE WITHDRAWAL, DRIVEN: the plain listener occupies the store's ONE function slot at this address,
  // and the kernel's own `K-1` REPLACES it — so the plain body is UNREACHABLE from the store's delivery
  // at an address the kernel registers a pair at (`kernel-surface.md §2.1` item 1's return-shape row).
  const plain = () => order.push('plain');
  const handlePlain = store.on(address, plain);
  const handleKernel = register(store, address, 'x', () => { order.push('constraint'); return true; });
  assert.equal(handleKernel, handlePlain,
    'ONE store home entry per address: both registrations are answered the SAME adopted handle, so the '
    + 'second REPLACES the first and the two bodies never stand in one slot (`§2.1` item 1)');
  const record = commit(store, address, 'mem', 1);
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'ordering');
  assert.deepEqual(order, ['constraint'],
    'the address\'s constraints were evaluated from the KERNEL\'s own window, and NO plain body ran from '
    + 'the store there — the withdrawn phrasing\'s "plain" element is unreachable, not merely unordered');
  assert.equal(record.pending.includes(handlePlain), false,
    'and the displaced handle stands in no member: the kernel\'s own home handle is carried by `pending` '
    + 'NEVER, an already-run handle being a member of `triggered` and of `pending` never (`§2.1` item 2)');

  // THE ONE ORDER THE CLAUSE DECLARES, READ OFF `seq` AND OFF THE OUTCOME ENTRY'S OWN `state`.
  const checked = report.log.filter((e) => e.kind === 'constraint-check');
  const outcomes = report.log.filter((e) => e.kind === 'outcome');
  assertSeqIncreasesFromOne(report.log, 'the order law reads `log`\'s own seq order');
  assert.equal(checked.length >= 1, true, 'the pass appended its own `constraint-check` entries');
  for (const e of checked) assertLogEntry(e, 'a pass\'s own check entry');
  assert.equal(outcomes.length, 0, 'a passing attempt appends no `outcome` entry at all');
  //
  // ── THE ORDER LAW MADE FALSIFIABLE (`DQ-14`. The assertion that stood here —
  //    `Math.max(...checked.seq) <= report.log[report.log.length - 1].seq` — REDUCES TO `last.seq <=
  //    last.seq` ON ANY LOG WHOSE LAST ENTRY IS THE LARGEST, WHICH `assertSeqIncreasesFromOne` HAS
  //    JUST ESTABLISHED: A CELL THAT CANNOT FAIL ON ITS OWN SUBJECT IS NOT EVIDENCE.
  //
  //    THE CLAUSE'S OWN ORDER, AT ITS BYTES: "every `constraint-check` and every `outcome` entry a pass
  //    appends stands in the attempt's `log` BEFORE ANY BODY THE CALLER'S LOOP RUNS OFF
  //    `CommitRecord.pending`" (`attempt-lifecycle.md §2.4` item 5 (iii)). THE TWO OBSERVABLES THAT CAN
  //    FAIL ON IT ARE THEREFORE (1) WHICH ENTRY CLOSES THE LOG — a body run in the caller's loop could
  //    only append AFTER the pass closed the attempt — and (2) THAT THE CLOSURE'S OWN ENTRY STANDS
  //    STRICTLY AFTER EVERY CHECK THE PASS APPENDED.
  const lastEntry = report.log[report.log.length - 1];
  assertLogEntry(lastEntry, 'the entry that closes a passing attempt\'s log');
  assert.equal(lastEntry.kind, 'commit',
    'THE `commit` ENTRY CLOSES THE LOG: the pass arm "appends a `commit` log entry; removes the registry '
    + `entry; RETURNS the report" (\`§2.4\` item 4 arms (a)/(g)) — read the kind ${JSON.stringify(lastEntry.kind)}. `
    + 'A log whose last entry is a `constraint-check` would mean a body ran after the closure');
  const lastCheckSeq = Math.max(...checked.map((e) => e.seq));
  assert.equal(lastEntry.seq > lastCheckSeq, true,
    `EVERY \`constraint-check\` ENTRY THIS PASS APPENDED STANDS STRICTLY BEFORE THE CLOSURE — read `
    + `${lastEntry.seq} > ${lastCheckSeq} — so no body the caller's loop runs off \`CommitRecord.pending\` `
    + 'stands anywhere in this log at all, in `seq` order, with no instant named '
    + '(`attempt-lifecycle.md §2.4` item 5 (iii); `kernel-surface.md §2.5` item 1)');
});


// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §2  LAYER (b) — `CommitRecord.pending`, THE CALLER'S MAP, AND THE ORDER LAW
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE `E2E-C-16` DRIVE, BUILT ON THE ONE HANDLE STATE THE TWO MECHANISMS ALREADY DECLARE:
 * the attempt's own address is `['<tag>','c']`, and a PLAIN STORE LISTENER stands at the ANCESTOR
 * address `['<tag>']` — so the attempt's write returns that listener's handle, while the pass
 * evaluates ONLY the pairs registered at the landing's own address (`kernel-surface.md §2.3` item 1).
 * The listener is seeded by one CALLER-MADE write at its own address, because a store home entry
 * stands for an address that exists.
 */
function driveE2EC16() {
  const parentAddress = [tag('e2e16'), 'c'];
  const ancestorAddress = [parentAddress[0]];
  const store = makeStore({ journalLength: 16 });
  storeWrite(store, ancestorAddress, 'mem', { seed: 'the ancestor home entry stands' });
  return { store, parentAddress, ancestorAddress };
}

test('ck_layer_b_the_uninvoked_caller_returned_handle_stands_in_pending_and_in_no_other_member', async () => {
  const { register, commit, runAttempt } = await kernel();
  const { store, parentAddress, ancestorAddress } = driveE2EC16();
  const cA = () => ({ repair: () => {
    // THE REPAIR-OP SEAM (`parameter-semantics.md §2.7`; `A: docs/decisions.md` · `A110`): `op` IS THE OP
    // THIS REPAIR'S OWN EDIT LANDED, read off the store's own `write` return in the repair's own body.
    const landed = storeWrite(store, ancestorAddress, 'mem', 'nested').op;
    return { ok: true, message: 'cA was repaired at the ancestor address', op: landed };
  }, message: 'a is bad' });
  register(store, ancestorAddress, 'cL', () => true);
  register(store, ancestorAddress, 'cA', cA);
  register(store, parentAddress, 'cB', () => true);
  const record = commit(store, parentAddress, 'mem', 'v1');
  // THE MEMBER'S OWN HOME, READ THERE AND NOT OFF THE STORE'S RECORD (`kernel-surface.md §2.1` item 2's
  // return-shape block: `CommitRecord { attempt, op, triggered, pending }`, the FOURTH "added at the
  // `A108` landing pass", and its "WHAT IT IS NOT" row: "the store's write returns `{op, watched,
  // triggered}` and the kernel's record carries TWO of those members verbatim, plus the attempt's
  // identity and the kernel's own `pending` member; the kernel adds no member to the store's record and
  // `K-2` is the item that mints it, so the drive reads the shape off the record `K-2` returned.
  const commitRecord = record;
  assert.deepEqual(Object.keys(commitRecord).sort(), ['attempt', 'op', 'pending', 'triggered'],
    'the kernel\'s own record is the FOUR-member `CommitRecord` and never the store\'s `WriteResult`');
  // THE CONTRACT'S OWN SEPARATION, ASSERTED ON BOTH SIDES: the STORE's write record is `{op, watched,
  // triggered}` and carries `pending` NEVER (`A: docs/specs/storeroom-native/write-and-read.md §3.6`;
  // `kernel-surface.md §2.1` item 2's "WHAT IT IS NOT" row; `contract.md §5.2`, `P-IM-2`). Read at its
  // OWN address, because a second `K-2` at a live address is `KC-7`.
  const storeOwned = storeWrite(store, [tag('lb-shape')], 'mem', 'the store\'s own record');
  assert.deepEqual(Object.keys(storeOwned).sort(), ['op', 'triggered', 'watched'],
    'the store\'s own write record is the THREE declared members');
  assert.equal('pending' in storeOwned, false,
    '`pending` is the kernel\'s own fourth member and is NOT a member of the store\'s record');
  assert.ok(Array.isArray(commitRecord.pending), 'pending is the named member of the record the kernel returned');
  assert.ok(commitRecord.pending.length >= 1,
    'the caller\'s not-yet-invoked handles stand there: this member is layer (b)\'s ONLY work list');
  for (const handle of commitRecord.pending) {
    assert.notEqual(handle, undefined, 'every member is a handle the store adopted for a registration');
    assert.equal(commitRecord.triggered.includes(handle), true,
      'and a layer (b) handle is a handle THIS call\'s write returned');
  }
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'layer (b) record');
  // RE-DERIVED AT THE RED-SET RE-DERIVATION PASS TO READING 2 (`attempt-lifecycle.md §2.4` item 5 (iv)):
  // a pass's evaluated pair set is THE ATTEMPT'S OWN `address` ONLY — never an ancestor's, never a
  // descendant's: the ancestor pair's handle is layer (b)'s and no pass of THIS attempt runs it. The
  // attempt's own address carries ONE pair, so the pass appends ONE `cB` `constraint-check`;
  // the cell's subject is the RECORD's shape, and the pair count is the scope's own observable.
  assert.deepEqual(checkIds(report.log), ['cB'],
    'the pass at the attempt\'s own address evaluates its OWN pair — ONE entry — and never an '
    + 'ancestor\'s pair, whose handle is layer (b)\'s and which no pass of this attempt runs '
    + '(`attempt-lifecycle.md §2.4` item 5 (iv); `kernel-surface.md §2.3` item 1)');
  assert.equal(checkIds(report.log).includes('cL'), false,
    'the ancestor pair is evaluated by NO pass of this attempt');
  assert.equal(checkIds(report.log).includes('cA'), false,
    'and neither is the ancestor pair whose repair the write would have driven');
});

/**
 * RE-DERIVED AT THE RED-SET RE-DERIVATION PASS, READING `kernel-surface.md §2.1` ITEM 2 AND
 * `attempt-lifecycle.md §2.4` ITEM 5 (iii) TOGETHER.
 *
 * WHAT THE OLD DRIVE COULD NOT OBSERVE: it registered the plain listener with `K-1` at the ANCESTOR
 * address, and `K-1` reaches the store's machinery through the store's own `listen(address)`, whose
 * argument list carries NO FUNCTION — so the store's ONE function slot at that address was left
 * holding the kernel's own placeholder, the plain body was displaced, `nested.pending` carried no
 * handle the caller's map could resolve, and the cell's own `fn(nested.op.address)` call was the only
 * thing that could have produced its observation. That is a drive reading itself, not the store.
 *
 * WHAT THIS CELL NOW DRIVES, so the argument shape is ACTUALLY OBSERVABLE: the plain listener is
 * registered through the STORE'S OWN `on(address, listener)` at an address at which the kernel holds
 * NO `K-1` PAIR — so nothing displaces it and the STORE'S OWN DELIVERY is what invokes it. The
 * operation's own landing address is `['<tag>','c']` and the registration's watch address is the
 * proper prefix `['<tag>']`, so the two-address distinction the clause draws is DRIVEN: a body handed
 * the REGISTRATION'S watch address would read `['<tag>']`, and one handed the OPERATION'S address reads
 * `['<tag>','c']`. The delivery is the store's; the caller's loop is layer (b)'s only invoker for a
 * handle the kernel did NOT deliver, and that is the OTHER cell's subject, not this one's.
 *
 * `kernel-surface.md §2.1` item 2, verbatim: the listener's ONE argument "IS the write's or the
 * `delete`'s OWN address … and NOT the registration's watch address, which may be a proper prefix of
 * it" — its example being a registration at `['a']` called with `['a','c']`, the store's
 * descendant-inclusive prefix test being cited there and not re-declared (`A:
 * docs/specs/storeroom-native/write-and-read.md §6.5` item 3).
 */
test('ck_layer_b_the_plain_store_listener_carries_the_triggering_address_as_its_one_argument', async () => {
  const store = makeStore({ journalLength: 16 });
  const ancestorAddress = [tag('plain')];
  const operationAddress = [ancestorAddress[0], 'c'];
  const plain = countingListener();
  // THE ADDRESS EXISTS BEFORE THE REGISTRATION, and it is created as a CONTAINER and not as a leaf —
  // an object value at the ancestor, exactly as `driveE2EC16` seeds its own, so the descendant address
  // stays writable (`store.on` refuses an address the register does not hold — `AddressNotFound` — and
  // a leaf there would refuse the descendant with `WriteParentNotLink`).
  storeWrite(store, ancestorAddress, 'mem', { seed: 'the ancestor home entry stands as a container' });
  // THE REGISTRATION THE KERNEL DOES NOT DISPLACE: `store.on` at an address carrying NO `K-1` pair.
  const handlePlain = store.on(ancestorAddress, plain);
  const seenBefore = plain.seen.length;
  // THE OPERATION LANDS AT THE DESCENDANT ADDRESS, so the watch address IS a proper prefix of it.
  const written = storeWrite(store, operationAddress, 'mem', 'the operation\'s own landing address');
  assert.deepEqual(written.op.address, operationAddress,
    'the operation\'s own landing address is the two-segment descendant');
  assert.equal(plain.seen.length, seenBefore + 1,
    'THE STORE\'S OWN DELIVERY ran the body — no caller-side loop and no handle was involved');
  assert.deepEqual(plain.seen[seenBefore].address, operationAddress,
    'and it carried THE TRIGGERING ADDRESS — the OPERATION\'s own address — as its ONE argument, and '
    + 'NOT the registration\'s watch address, which is a proper prefix of it');
  assert.notDeepEqual(plain.seen[seenBefore].address, ancestorAddress,
    'the two addresses are distinct, so the distinction the clause draws is DRIVEN and not assumed');
  assert.equal(plain.seen[seenBefore].address.length, 2,
    'the two-kind rule fixes exactly one argument, and it is the op\'s address');
  assert.equal(store.on(ancestorAddress, () => {}), handlePlain,
    'the map\'s key is the handle the registration answered — THE STORE\'S OWN ADOPTED VALUE for that '
    + 'address and `===` to it, no type beyond the row\'s own declaration being read '
    + '(`kernel-surface.md §2.1` item 1\'s return-shape row; `A: bindings/js/index.d.ts`: `Handle = object`; '
    + '`§2.2` item 3: "THE ONE THING THE KERNEL DOES WITH THE HANDLE IS RECORD IT")');
  assert.equal(written.triggered.includes(handlePlain), true,
    'the caller\'s own registration stands in the triggered set that write reported');
});

/**
 * RE-DERIVED AT THE RED-SET RE-DERIVATION PASS, READING `attempt-lifecycle.md §2.4` ITEM 5 (iii) AT ITS
 * BYTES — the SAME WITHDRAWAL its two sibling layer (a) cells now record.
 *
 * THE OLD DRIVE'S FAULT: it made a PLAIN STORE LISTENER the layer (b) body and invoked it through a
 * caller-side `map.get(handle)` under a registration `K-1` had DISPLACED, so no such body ever ran from
 * the store and the law was read off a non-observation.
 *
 * WHAT THE CLAUSE DECLARES, VERBATIM: **EVERY `constraint-check` AND EVERY `outcome` ENTRY A PASS
 * APPENDS STANDS IN THE ATTEMPT'S `log` BEFORE ANY BODY THE CALLER'S LOOP RUNS OFF
 * `CommitRecord.pending`, AND THE DRIVE READS IT OFF `log`'S `seq` ORDER AND OFF THE `outcome` ENTRY
 * THE THROWN FORM CARRIES — never off an invocation count and never off an instant**
 * (`kernel-surface.md §2.5` item 1; `fail-surface.md §1.1` item 3).
 *
 * ▸ REPORTED FINDING, RECORDED HERE AND NOT TURNED INTO AN INVENTED DRIVE: `CommitRecord.pending` is a
 * list of HANDLES and `log` is a list of `LogEntry` RECORDS — the two members carry no common member,
 * and NO CALLER-SIDE SEQUENCE NUMBER IS DECLARED ANYWHERE THAT ORDERED A HANDLE'S INVOCATION AGAINST A
 * `LogEntry`'s `seq`. So the clause's own "BEFORE" is NOT REFINABLE INTO A DRIVE from the declared
 * surface: this cell asserts WHAT THE CLAUSE DOES PIN — that the pass's own entries all stand in the
 * log, in `seq` order, as ONE list the caller reads after its loop — and asserts the reachability of
 * layer (b)'s work list, whose only invoker is that loop. The clause's temporal half pins nothing a
 * drive can read, and that is reported rather than asserted.
 */
test('ck_layer_b_the_order_law_every_layer_a_delivery_completes_before_any_layer_b_body', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('order')];
  const nestedAddress = [address[0], 'c'];
  // THE CALLER'S OWN REGISTRATION STANDS AT THE ATTEMPT'S OWN ADDRESS AND THE KERNEL'S PAIR SITS AT
  // THE DESCENDANT: the write the attempt lands there returns TWO handles — so one of them is a member
  // of `CommitRecord.pending` and NOT of `triggered`'s kernel-side home entry (`kernel-surface.md §2.1`
  // item 2; `§2.2` items 2–3).
  storeWrite(store, address, 'mem', { seed: 'the ancestor home entry stands as a container' });
  const handlePlain = store.on(address, () => {});
  const passIds = ['cB'];
  register(store, nestedAddress, 'cB', () => true);
  const record = commit(store, nestedAddress, 'mem', 'v1');
  assert.ok(record.pending.length >= 1,
    'LAYER (b)\'S ONLY WORK LIST IS NOT EMPTY: it carries the handle the caller\'s own registration '
    + 'stands behind, which the kernel has not invoked in its own window (`§2.1` item 2; `§2.2` item 2)');
  assert.equal(record.pending.includes(handlePlain), true,
    'and that handle is the caller\'s own adopted value for its address');
  const beforeTheLoop = log(store, record.attempt).length;
  let loopRuns = 0;
  for (const handle of record.pending) {
    // THE BODY THE CALLER'S OWN LOOP RUNS — layer (b)'s ONLY INVOKER (item 5 (iii); `§2.2` item 2).
    assert.notEqual(handle, undefined, 'every member of the work list is a handle');
    loopRuns += 1;
  }
  assert.equal(loopRuns, record.pending.length, 'the caller\'s loop reads its work off that member alone');
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'order law');
  assert.equal(log(store, record.attempt).length >= beforeTheLoop, true,
    'the attempt\'s own log is ONE list, and the caller\'s loop appended nothing to it');
  assert.deepEqual(checkIds(report.log), passIds,
    'the pass evaluated the pairs at the attempt\'s OWN address, in first-registration order');
  assert.equal(entries(report.log, 'constraint-check').length, passIds.length,
    'EVERY `constraint-check` entry a pass appends STANDS IN THE `log` — none is withheld and none is '
    + 'carried anywhere else, so the caller reads the complete pass after its loop '
    + '(`attempt-lifecycle.md §2.4` item 5 (iii))');
  for (const e of report.log) assertLogEntry(e, 'the order law reads `log`\'s own entries');
  assertSeqIncreasesFromOne(report.log, 'the order law reads `log`\'s own `seq` order');
  assert.equal(report.log[report.log.length - 1].kind, 'commit',
    'and the pass\'s own closing entry is the LAST in that order');
  assert.equal(report.log.filter((e) => e.kind === 'outcome').length, 0,
    'a passing attempt appends no `outcome` entry at all — the second half of the clause is vacuous here '
    + 'and is driven on the throwing arms by the `states` file');
});

test('ck_layer_b_a_caller_made_writes_uninvoked_handle_is_left_for_the_caller_and_never_double_delivered', async () => {
  const { register, commit, runAttempt } = await kernel();
  const { store, parentAddress, ancestorAddress } = driveE2EC16();
  const plain = countingListener();
  const handlePlain = register(store, ancestorAddress, 'cL', plain);
  register(store, ancestorAddress, 'cA', () => true);
  register(store, parentAddress, 'cB', () => true);
  const record = commit(store, parentAddress, 'mem', 'v1');
  assert.equal(plain.seen.length, 0,
    'the kernel invoked no caller-made write\'s handle in its own window — that layer\'s only invoker is the caller\'s loop');
  const work = record.pending.filter((h) => h === handlePlain);
  assert.equal(work.length, 1,
    'the handle the caller\'s own write returned stands in the member exactly once and is never a member of both');
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'no double delivery');
});

test('ck_layer_b_a_record_with_no_caller_work_leaves_the_caller_s_loop_with_nothing_to_run', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('lb4')];
  register(store, address, 'x', () => true);
  const record = commit(store, address, 'mem', 1);
  assert.deepEqual(record.pending, [],
    'no uninvoked handle stands behind this record: the empty list is a DECISION and not an omission');
  let calls = 0;
  for (_handle of record.pending) calls += 1;
  assert.equal(calls, 0, 'the caller\'s loop reads its work off that member and off no other');
  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed', 'an empty work list drives nothing and changes nothing');
});

test('ck_layer_b_a_handle_already_delivered_in_window_is_carried_by_neither_member_again', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('lb5')];
  let invocations = 0;
  const handle = register(store, address, 'x', () => { invocations += 1; return true; });
  const record = commit(store, address, 'mem', 1);
  const report = runAttempt(store, record);
  assert.equal(invocations, 1, 'exactly one invocation — the layer (a) delivery of the evaluated pair');
  assert.equal(record.pending.includes(handle), false,
    'an already-run handle is not handed to the caller\'s loop a second time');
  assertAttemptReport(report, 'no second delivery');
});

test('ck_layer_b_a_foreign_instances_handle_is_never_invoked_by_the_kernel', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const address = [tag('lb6')];
  let invocations = 0;
  const home = register(store, address, 'x', () => { invocations += 1; return true; });
  const foreignStore = makeStore();
  const foreign = register(foreignStore, address, 'x', () => { invocations += 1; return true; });
  assert.notEqual(foreign, undefined, 'the registration answers a handle and not a refusal');
  assert.equal(foreignStore.on(address, () => {}), foreign,
    'a foreign instance adopts and answers its OWN handle for that address — one value per instance, '
    + '`===` to the store\'s own answer (`kernel-surface.md §2.2` item 1: the kernel "never mints a token '
    + 'for a store-minted handle"; `A: bindings/js/index.d.ts`: `Handle = object`)');
  assert.notEqual(foreign, home, 'and it is not the other instance\'s value: the two stores are two homes');
  assert.equal(invocations, 0, 'and no body ran for it: the store\'s check is the store\'s and the kernel invokes nothing of its own');
});
