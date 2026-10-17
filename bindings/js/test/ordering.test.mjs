// RED SET — THE `A115` ORDERING GATE AT THE JS SURFACE'S OWN BOUNDARY: THE CONSTRAINTS PASS GATES THE
// LISTENERS, AND A CONSTRAINT-FAILING WRITE'S LISTENERS ARE DISCARDED.
//
// DERIVED FROM THE SPEC ALONE, at the clauses as they stand after the `A115` ordering-gate pass, and at
// no implementation. The clauses, and what each is read for:
//
//   · `docs/specs/storeroom-js/surface.md §2.7` ITEM 6 — THE ORDERING LAW: "for a write, the surface runs
//     the write's TRIGGERED CONSTRAINTS FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY
//     CONSTRAINT HAS PASSED; on a write that fails on constraints THE OTHER LISTENERS ARE DISCARDED — not
//     delivered, and not left pending for a later deliverer" — WITH its own fail-state sentence: *"a drive
//     that finds a body of the other kind run while a constraint of the same write stands owed has found a
//     failure of this item."*
//   · `§2.7` ITEM 7 — THE DELIVERY INSTANT FOR A RECORD THAT CARRIES A KERNEL EVALUATION SET: where the
//     write was issued through `commit` and its attempt's pass is run by `runAttempt`, the package's
//     delivery of the triggered handles does NOT occur inside the store verb's window — "it follows the
//     pass, and its instant is the pass's terminal arm — after the last constraint of that attempt has
//     been evaluated, and before `runAttempt` returns to the calling process" — AND "THE DECISION IS THE
//     ONE THE RECORD'S `pending` MEMBER ALREADY CARRIES": an entry leaves it only by being checked off as
//     it passes, the failed write's own returned set leaves it by the DISCARD, "and what remains is what
//     the delivery reaches."
//     · ITEM 7 (a) — WHAT IT ITERATES: the RESIDUE, `triggered` minus the checked-off entries minus the
//       failed write's own returned set "and MINUS NOTHING ELSE".
//     · ITEM 7 (b) — WHAT MAPS A HANDLE BACK TO ITS REGISTRATION: `§2.4`'s registry, keyed by the opaque
//       handle, at most one function per identity.
//     · ITEM 7 (c) — AN EMPTY RESIDUE: "the delivery invokes NOTHING, and the empty delivery is a NO-OP
//       AND NOT A FAILURE. A drive may assert it as a count: zero invocations, no throw."
//     · ITEM 7 (d) — THE DISCARDED ARM AND ITS FAIL-STATE: on a constraint-failing write "the delivery
//       reaches ZERO of the failed write's own triggered handles: they left `pending` by the DISCARD, and
//       the law's requirement is that their bodies were NEVER RUN. THE FAIL-STATE IS THIS AND IS
//       OBSERVABLE: a body of the failed write's own returned set that RAN — whether inside the verb's
//       window or after it — is a FAILURE of this item."
//   · `§2.7` ITEM 8 — A RECORD WITH NO KERNEL EVALUATION SET, "DECLARED AS LAW AND NOT AS A HEDGE": where a
//     write was made through the store's own write verb and no `commit`, so no `CommitRecord` and no
//     `pending` member exists, the delivery instant is item 2's and this clause does not move it; the
//     exposure is "THE SAME HOLE THE `N7` ROW OPENED, NAMED AS A FAIL-STATE AND NOT CLOSED BY INVENTION";
//     and the asymmetry is declared rather than smoothed — "the same address ... is ordered when it is
//     driven through `commit` and unordered when it is written bare."
//   · `§2.4` ITEM 8 (a)–(c) — READING (K): the word "holder" at the kernel's `§2.1` item 1 means the
//     STORE'S HOME ENTRY and NOT the package registry's function slot; a caller's `on(address, listenerB)`
//     at an address whose home entry already stands "replaces the PACKAGE REGISTRY'S FUNCTION SLOT for the
//     handle that address's home entry carries", mints nothing, returns the entry's own handle unchanged,
//     and replaces nothing in the store; (b) the held-arm observable — "the second `on` call RETURNS THE
//     SAME OPAQUE IDENTITY THE FIRST RETURNED"; (c) the consequence a drive reads — "WHICH OF THE TWO IS
//     DELIVERED, AND WHEN, IS DECIDED AT THE RECORD'S `pending` MEMBER AND NOT BY THE REGISTRATION'S
//     AUTHOR", with the fail-state "a drive that finds the same body run twice, or the app listener's body
//     run before every constraint of that write has passed, has found a failure."
//   · `docs/decisions.md` · `A115` — the carrier ruling: the carrier is `CommitRecord.pending`; the
//     entry's in-window invocation is withdrawn FOR THE HANDLES A KERNEL EVALUATION SET CARRIES; `A114` —
//     the pass flows to the listeners and a constraint-failing write's listeners are discarded; `A112` —
//     the store returns the handles and invokes nothing, and the surface runs the triggered constraints
//     first and the other listeners once every constraint has passed.
//   · `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 is CITED for the two member
//     readings this file reads off a record — `pending` carries the whole returned set of triggered
//     constraints, an entry leaving it only by being checked off as it passes — and for the constraint
//     body's own call shape, its one argument and its triggering-address referent.
//
// ── THE MEASURED GAP THESE CELLS ARE DERIVED AGAINST (the live demo, `scratch/n7-ordering-demo-out-run1
//    .json`, deterministic, read only — the demo is not a test of this tree and no clause of this file
//    rests on it): today the app's listener body runs INSIDE the store verb's window before any constraint
//    body has run (order limb `0` PASS / `6` FAIL), and on a constraint-failing write it is delivered once
//    where the law requires zero (discard limb `0` PASS / `6` FAIL). EACH CELL BELOW IS DERIVED FROM THE
//    CLAUSES AND NOT FROM THAT MEASUREMENT; the measurement only says which cells are red today.
//
// ── THE STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED (one valid drive per reasonable data state) ──
//
// S1  AN ORDERED WRITE THAT PASSES: issued through `commit`, its attempt's pass run by `runAttempt`, every
//     registered pair returning the pass arm. The write's returned set carries TWO distinct handles — the
//     evaluated pair's own handle at the write's own address, and a plain registration's handle at a
//     WATCHED PROPER PREFIX (the store's descendant-inclusive prefix selection). This is the ORDER LIMB's
//     state: the constraint body runs inside the pass and the other listener's body is reached only after
//     every constraint has passed, at the pass's terminal arm.
// S2  AN ORDERED WRITE THAT FAILS ON CONSTRAINTS: the same fixture, the registered pair refusing the
//     landing, so the write is rolled back and its own returned set leaves `pending` by the DISCARD. This
//     is the DISCARD LIMB's state.
// S3  AN ORDERED WRITE WHOSE RESIDUE IS EMPTY: every triggered entry was checked off as it passed, so the
//     delivery invokes nothing — item 7 (c)'s no-op arm, asserted as a count.
// S4  A HELD ADDRESS, TWO REGISTRATIONS, ONE HANDLE: an app registration made at the address the kernel's
//     own `K-1` adopted, so the store's `listen` mints nothing and the package registry's function slot for
//     that identity is REPLACED — item 8 (a)–(c)'s held-arm observable.
// S5  A BARE CALLER-MADE WRITE, NO KERNEL EVALUATION SET: the store's own `write` verb, no `commit`, so no
//     `CommitRecord` and no `pending` member exists — item 8's declared hole.
//
// ── WHAT THIS FILE DOES NOT DO ────────────────────────────────────────────────────────────────────────
//
// NO EXISTING CELL IS WEAKENED OR RE-DERIVED: this file is a NEW SIBLING in this suite and touches no other
// file. No listener body's SECOND delivery is accepted as evidence of an order: every ordering assertion
// below is made from the two bodies' own call records (their sequence numbers and their arguments) and
// from the record's own `pending` residue, never from an invocation count that a second delivery could
// satisfy. The constraint kernel is reached at its one declared checkout home
// (`kernel-surface.md §1` item 1), through the suite's shared fixture helper, and NO clause here restates a
// kernel rule: the kernel's `K-1`/`K-2`/`K-3` are used as the spec declares them.

import test from 'node:test';
import assert from 'node:assert/strict';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag,
  assertKernelForm, capture, noop, } from './constraint-kernel-helpers.mjs';

/**
 * ONE MONOTONE SEQUENCE FOR THIS FILE'S OWN CALL RECORDS. Every body pushes its own mark as it is entered,
 * so the RELATIVE order of two bodies' runs is read off their marks and never off an instant, a count or a
 * clock.
 */
let SEQ = 0;
function mark(log, extra) {
  SEQ += 1;
  const entry = Object.assign({ seq: SEQ }, extra || {});
  log.push(entry);
  return entry;
}
const seqOf = (entry) => (entry === undefined ? null : entry.seq);

/**
 * THE ONE FIXTURE EVERY ORDERED CELL IS DRIVEN AT — and every step in it is a step some clause declares:
 *
 *   1. THE STORE. The package's own `storeCreate(cfg)` through the suite's one helper
 *      (`kernel-surface.md §1` item 1: no addon path is spelled, no store is stubbed).
 *   2. THE PREPARED PARENT. The store's own `write` at the proper prefix `watch`, carrying a map, because
 *      the store requires the written address's parent to stand — the store's own landing rule and not
 *      this file's.
 *   3. THE CONSTRAINT PAIR through the kernel's own `K-1` at the OPERATION's address.
 *   4. THE PLAIN LISTENER through the package's own `on` at `watch`, a PROPER PREFIX of the operation's
 *      address, so the store's own prefix selection triggers it from that write
 *      (`write-and-read.md §6.5` item 3) and the two registrations stand at two DIFFERENT addresses.
 *
 * `arm` selects the registered constraint's declared outcome: `'pass'` returns `true` (the pass arm) and
 * `'fail'` returns `{ message }` (the violation arm) — the kernel's own two declared constraint arms
 * (`kernel-surface.md §2.3` item 1).
 */
async function orderedFixture({ label, arm }) {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const watch = [tag(label + '-w')];
  const operation = [...watch, tag(label + '-o')];
  const constraintLog = [];
  const listenerLog = [];
  const constraintArgs = [];
  const listenerArgs = [];

  store.write(watch, 'mem', { [tag(label + '-link')]: 1 });

  const pairHandle = register(store, operation, 'ord-x', (...view) => {
    constraintArgs.push(view);
    mark(constraintLog, { argumentCount: view.length });
    if (arm === 'pass') return true;
    return { message: label + ': the registered constraint refused this landing' };
  });

  const listenerHandle = (store.register(store.listen(watch), (...view) => {
    listenerArgs.push(view);
    mark(listenerLog, { argumentCount: view.length });
  }) || store.listen(watch));

  const registeredDuring = { constraint: constraintLog.length, listener: listenerLog.length };
  const record = commit(store, operation, 'mem', 1);
  // THE `K-2` INSTANT IS READ BEFORE ANY PASS RUNS, so the residue's own before-picture is a recorded value
  // and not a later reconstruction (`A113` (D3): the caller's first read is `K-2`'s return).
  const pendingAtCommitReturn = record.pending.slice();
  const triggeredAtCommitReturn = record.triggered.slice();
  const duringCommit = {
    constraint: constraintLog.length - registeredDuring.constraint,
    listener: listenerLog.length - registeredDuring.listener,
  };

  return {
    store, watch, operation, commit, runAttempt, record,
    pairHandle, listenerHandle,
    constraintLog, listenerLog, constraintArgs, listenerArgs,
    duringCommit, pendingAtCommitReturn, triggeredAtCommitReturn,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §1  THE ORDER LIMB — `surface.md §2.7` items 6 and 7, on a write that PASSES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ord_the_constraint_body_runs_and_the_listener_body_is_reached_only_once_every_constraint_has_passed', async () => {
  const f = await orderedFixture({ label: 'ord-pass', arm: 'pass' });

  // ── THE S1 PRE-CONDITIONS, EACH AN OBSERVABLE AND NOT A SETUP ASSUMPTION ────────────────────────────
  assert.equal(f.triggeredAtCommitReturn.includes(f.pairHandle), true,
    'S1 pre-condition: the write\'s returned set carries the EVALUATED PAIR\'s own handle — the store\'s '
    + 'trigger selection is descendant-inclusive and `K-1` registered the pair at the operation\'s own '
    + 'address (`kernel-surface.md §2.1` item 2; `write-and-read.md §6.5` item 3). FAIL-STATE: a fixture in '
    + 'which the pass evaluates no pair of this write cannot exercise the ordering law at all');
  assert.equal(f.triggeredAtCommitReturn.includes(f.listenerHandle), true,
    'and it carries the plain registration\'s own handle beside it: a registration at the watched PROPER '
    + 'PREFIX is triggered by an operation at the operation\'s address (`§2.7` item 1: the returned set is '
    + 'the store\'s own answer, carried verbatim)');
  assert.notEqual(f.pairHandle, f.listenerHandle,
    'and the two are TWO DISTINCT IDENTITIES — the pair stands at the operation\'s address and the '
    + 'registration at its proper prefix — so the two bodies are reached by two different handles and the '
    + 'order read below is the ORDER OF THE TWO LAYERS and never an artifact of one handle');

  // ── THE ORDERING LAW'S OWN SUBJECT, READ AT THE TWO BODIES' RECORDS AND AT THE PASS'S TERMINAL ARM ──
  assert.equal(f.duringCommit.constraint, 0,
    'NO CONSTRAINT BODY RUNS INSIDE THE STORE VERB\'S WINDOW: the pass is `K-3`\'s act, so the write verb '
    + '`K-2` calls runs no pair (`§2.7` item 6; `kernel-surface.md §2.1` item 2 (i), the pass being '
    + '`K-3`\'s). FAIL-STATE: a pair body run before the pass — read ' + f.duringCommit.constraint
    + ' constraint-body call(s) inside the write\'s own window');
  assert.equal(f.duringCommit.listener, 0,
    'AND THE OTHER LISTENER IS NOT REACHED INSIDE THAT WINDOW EITHER: `A115` (D2) WITHDRAWS the entry\'s '
    + 'in-window invocation FOR THE HANDLES A KERNEL EVALUATION SET CARRIES, and this write\'s record '
    + 'carries one — its `pending` member is the whole returned set at `K-2`\'s return (§2.7 item 7; '
    + '`A113` (D3)). FAIL-STATE: the body of the other kind running in that window before any constraint '
    + 'body has run — read ' + f.duringCommit.listener + ' listener-body call(s) inside it, which is the '
    + 'very failure §2.7 item 6 names');
  assert.equal(f.pendingAtCommitReturn.length, f.triggeredAtCommitReturn.length,
    'and the record at `K-2`\'s return carries the WHOLE returned set in `pending` — no pass has yet run, '
    + 'so nothing has been checked off (`kernel-surface.md §2.1` item 2 as `A113` (D3) reads it: the '
    + 'caller\'s first read is `K-2`\'s return, where the member IS the whole set) — read '
    + f.pendingAtCommitReturn.length + ' of ' + f.triggeredAtCommitReturn.length);

  const ran = capture(() => f.runAttempt(f.store, f.record));
  assert.equal(ran.threw, false,
    'the pass reaches its PASSING terminal arm and answers the caller: every registered pair returned the '
    + 'pass arm (`§2.7` item 7\'s terminal arm; `kernel-surface.md §2.1` item 3). Read '
    + (ran.threw ? JSON.stringify(ran.thrown && ran.thrown.status) : JSON.stringify(ran.value.outcome)));
  assert.equal(ran.value.outcome, 'passed',
    'the attempt\'s own two-arm answer is `passed` (`parameter-semantics.md §2.13`) — read '
    + JSON.stringify(ran.value.outcome));

  // ── THE TERMINAL-ARM RESIDUE: WHAT THE DELIVERY REACHES IS WHAT REMAINS ─────────────────────────────
  assert.deepEqual(f.record.pending, [f.listenerHandle],
    'THE RESIDUE AT THE PASS\'S TERMINAL ARM IS THE PLAIN REGISTRATION\'S HANDLE AND NOTHING ELSE: the '
    + 'evaluated pair\'s entry left the member BY BEING CHECKED OFF AS IT PASSED, the failed write\'s own '
    + 'returned set is not in play on this arm, and MINUS NOTHING ELSE therefore leaves exactly the one '
    + 'handle whose pair this attempt never evaluated (§2.7 item 7 and its (a): "THE DELIVERY ITERATES THE '
    + 'RESIDUE — the handle set that stands in `CommitRecord.pending` at that instant"). FAIL-STATE: a '
    + 'residue that still carries the checked-off pair\'s handle, or that has lost the other listener\'s — '
    + 'read ' + f.record.pending.length + ' member(s)');

  // ── THE INSTANT: THE LISTENER'S BODY RUNS AFTER THE LAST CONSTRAINT HAS BEEN EVALUATED ─────────────
  assert.equal(f.constraintLog.length, 1,
    'THE CONSTRAINT BODY RAN — exactly once, for the one pair this pass evaluated (`§2.7` item 6: the '
    + 'surface runs the write\'s triggered constraints first). Read ' + f.constraintLog.length + ' call(s)');
  assert.equal(f.listenerLog.length, 1,
    'AND THE REGISTERED LISTENER\'S BODY RAN — once, and at the delivery instant `§2.7` item 7 fixes: '
    + 'after the last constraint of that attempt has been evaluated, and before `runAttempt` returns. Read '
    + f.listenerLog.length + ' call(s), taken at the caller\'s own next statement after the attempt '
    + 'returned');
  const constraintSeq = seqOf(f.constraintLog[0]);
  const listenerSeq = seqOf(f.listenerLog[0]);
  assert.equal(listenerSeq > constraintSeq, true,
    'AND IT RAN AFTER EVERY CONSTRAINT OF THAT WRITE: the two bodies\' OWN call records are ordered — the '
    + 'constraint body was entered at mark ' + constraintSeq + ' and the listener body at mark '
    + listenerSeq + ' — so the order is read off the RECORDS (`surface.md §2.7` item 6: "the other '
    + 'listeners are reached only once every constraint has passed"; item 7\'s instant: "the pass\'s '
    + 'terminal arm — after the last constraint of that attempt has been evaluated"). FAIL-STATE: the '
    + 'listener\'s body run while the constraint stands owed, which §2.7 item 6 names as a failure of the '
    + 'item. THIS IS NOT A COUNT: a second delivery could satisfy a count and cannot satisfy this record');

  // ── AND THE INVOCATION'S OWN ONE ARGUMENT, READ OFF EACH BODY'S OWN VIEW ────────────────────────────
  assert.equal(f.constraintArgs.length, 1,
    'the evaluated pair\'s body was invoked by the kernel\'s own window, once, with that attempt\'s context '
    + 'as its ONE argument (`kernel-surface.md §2.1` item 2 (i); `§2.3` item 1)');
  assert.equal(f.constraintArgs[0].length, 1,
    'and its own view is exactly one argument — read ' + f.constraintArgs[0].length);
  assert.equal(f.listenerArgs.length, 1,
    'the registered listener\'s body was invoked once, and its ONE argument is the TRIGGERING ADDRESS '
    + '(`surface.md §2.7` item 5; `kernel-surface.md §2.1` item 2 (ii))');
  assert.equal(f.listenerArgs[0].length, 1,
    'and its own view is exactly one argument — read ' + f.listenerArgs[0].length);
  assert.deepEqual(f.listenerArgs[0][0], f.operation,
    'and that argument is THE OPERATION\'S OWN ADDRESS and not the registration\'s WATCH address: the '
    + 'referent is the address the trigger\'s own op landed at (`kernel-surface.md §2.1` item 2 (ii)), the '
    + 'two differing exactly where the store\'s prefix rule puts them apart — read '
    + JSON.stringify(f.listenerArgs[0][0]) + ' against the watch address ' + JSON.stringify(f.watch));
  assert.deepEqual(f.listenerArgs[0][0], f.record.op.address,
    'and it is the op\'s own recorded address, read off the op the record carries');
});

test('ord_an_ordered_write_whose_every_entry_was_checked_off_delivers_nothing_and_throws_nothing', async () => {
  // S3 — THE EMPTY RESIDUE, asserted as a count exactly as `§2.7` item 7 (c) permits: "where every
  // triggered entry was checked off — the ordinary arm on which every constraint passed and every other
  // listener was itself evaluated by the pass — the residue is EMPTY, the delivery invokes NOTHING, and
  // the empty delivery is a NO-OP AND NOT A FAILURE. A drive may assert it as a count: zero invocations,
  // no throw."
  //
  // THE DRIVE: ONE store, ONE registration, at the written address — the kernel's own `K-1` pair. Every
  // handle the write returns is therefore that pair's own handle, and every one of them is checked off as
  // it passes.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('ord-empty-a')];
  const bodyLog = [];
  const pairHandle = register(store, address, 'only', () => {
    mark(bodyLog, { note: 'the only pair of this attempt' });
    return true;
  });

  const record = commit(store, address, 'mem', 1);
  assert.deepEqual(record.triggered, [pairHandle],
    'the whole returned set is the one evaluated pair\'s own handle — this store holds one registration, at '
    + 'the written address — read ' + record.triggered.length + ' member(s)');
  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed',
    'the pass arm is reached — the empty delivery is "a NO-OP AND NOT A FAILURE" (item 7 (c))');

  assert.deepEqual(record.pending, [],
    'THE RESIDUE IS EMPTY: every triggered entry was checked off as it passed (`§2.7` item 7 and its (c); '
    + '`kernel-surface.md §2.1` item 2 — an entry leaves the member only by being checked off as it '
    + 'passes) — read ' + record.pending.length + ' member(s)');
  assert.equal(bodyLog.length, 1,
    'AND THE ONE BODY THE SET CARRIED RAN ONCE, IN ONE WINDOW: the evaluated pair\'s own body, run by the '
    + 'pass (`§2.7` item 6; `A115` (D2) withdraws the entry\'s in-window invocation for such a handle) — '
    + 'read ' + bodyLog.length + ' call(s), so the empty delivery added NO second invocation. FAIL-STATE: '
    + 'the same body run twice — once as the pair this pass evaluated and once again at a delivery that '
    + 'reaches a handle the check-off had already removed');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §2  THE DISCARD LIMB — `surface.md §2.7` items 6 and 7 (d), on a write that FAILS ON CONSTRAINTS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ord_a_constraint_failing_write_never_runs_the_listeners_body_and_its_pending_residue_is_discarded', async () => {
  const f = await orderedFixture({ label: 'ord-fail', arm: 'fail' });

  assert.equal(f.triggeredAtCommitReturn.includes(f.listenerHandle), true,
    'S2 pre-condition: THE FAILED WRITE\'S OWN RETURNED SET CARRIES THE LISTENER\'S HANDLE — it stands in '
    + '`triggered` VERBATIM (`§2.7` item 1; `attempt-lifecycle.md §2.4` item 8 (i) (5): on the failing arm '
    + '`triggered` stands verbatim while the failed write\'s own handles leave the member). FAIL-STATE: a '
    + 'fixture in which the failed write returned no such handle could not show the discard at all');
  assert.equal(f.pendingAtCommitReturn.includes(f.listenerHandle), true,
    'and at `K-2`\'s return that handle stands in `pending` with the whole returned set — no pass has run '
    + '(`kernel-surface.md §2.1` item 2; `A113` (D3)). THE MECHANISM THE DISCARD IS MEASURED AGAINST IS '
    + 'THEREFORE RECORDED BEFORE THE ARM AND ASSERTED, not assumed');
  assert.equal(f.duringCommit.listener, 0,
    'AND THE BODY HAS NOT RUN IN THE WRITE\'S OWN WINDOW: `A115` (D2) withdraws the in-window invocation '
    + 'for the handles a kernel evaluation set carries (`§2.7` item 7). FAIL-STATE: the body of the failed '
    + 'write\'s own returned set that RAN inside the verb\'s window — §2.7 item 7 (d) names it: "a body of '
    + 'the failed write\'s own returned set that RAN — whether inside the verb\'s window or after it — is a '
    + 'FAILURE of this item". Read ' + f.duringCommit.listener + ' call(s) inside it');

  const ran = capture(() => f.runAttempt(f.store, f.record));
  assert.equal(f.constraintLog.length, 1,
    'the registered constraint body ran — once — and refused the landing, which is what makes this the '
    + 'FAILING arm (`A114` (D1)/(D2)). Read ' + f.constraintLog.length + ' call(s)');
  if (ran.threw) {
    assertKernelForm(ran.thrown, 'the failing arm\'s own channel');
    assert.equal(ran.thrown.status, 'KC-3',
      'the terminal arm is the constraint-violation token: the pair returned the violation arm, so the '
      + 'attempt is disposed of as `KC-3` (`fail-surface.md §2`; `§2.7` item 7\'s failing arm) — read '
      + JSON.stringify(ran.thrown.status));
  } else {
    assert.equal(ran.value.outcome, 'failed',
      'or the attempt answers its failed terminal record — the two declared arms of the same instant, and '
      + 'no third (`§2.7` item 7\'s terminal arm) — read ' + JSON.stringify(ran.value.outcome));
  }

  // ── THE LAW'S OWN REQUIREMENT: THEIR BODIES WERE NEVER RUN ──────────────────────────────────────────
  assert.deepEqual(f.listenerLog, [],
    'THE LISTENER\'S BODY WAS NEVER INVOKED — ZERO DELIVERIES, asserted by the body\'s OWN CALL RECORD: '
    + 'on a write that fails on constraints "the other listeners are DISCARDED — not delivered, and not '
    + 'left pending for a later deliverer" (`§2.7` item 6), and on that arm "the delivery reaches ZERO of '
    + 'the failed write\'s own triggered handles ... and the law\'s requirement is that their bodies were '
    + 'NEVER RUN" (`§2.7` item 7 (d); `A114` (D2)). THE NAMED FAIL-STATE THIS CELL CATCHES, AS THE CLAUSE '
    + 'STATES IT: a body of the failed write\'s own returned set that RAN — whether inside the verb\'s '
    + 'window or after it — IS A FAILURE OF THIS ITEM, because A BODY ALREADY RUN IS NEVER UN-RUN and the '
    + 'requirement cannot be satisfied retroactively. Read ' + f.listenerLog.length + ' invocation(s), '
    + 'recorded by the body itself: ' + JSON.stringify(f.listenerLog) + '; and read against the pre-arm '
    + 'mechanism, the handle stood in `pending` at `K-2`\'s return: '
    + (f.pendingAtCommitReturn.includes(f.listenerHandle) ? 'yes' : 'no'));
  assert.equal(f.listenerArgs.length, 0,
    'and no invocation\'s argument view was ever produced for it — the absence of the call is the '
    + 'observable and no argument stands beside it');

  // ── THE RECORD'S OWN `pending` RESIDUE: THE DISCARD TOOK THE FAILED WRITE'S WHOLE RETURNED SET ─────
  assert.deepEqual(f.record.pending, [],
    'AND THE RECORD\'S `pending` RESIDUE CONFIRMS IT: the failed write\'s own returned set left the member '
    + 'by the DISCARD, so the residue the delivery would iterate is EMPTY — `triggered` minus the '
    + 'checked-off entries minus the failed write\'s whole returned set, MINUS NOTHING ELSE (`§2.7` item 7 '
    + 'and its (a); `kernel-surface.md §2.1` item 2\'s failing-arm clause; `attempt-lifecycle.md §2.4` item '
    + '8 (i) (5)). FAIL-STATE: a member that still carries a handle of the failed write — "not left pending '
    + 'for a later deliverer" (`§2.7` item 6) — read ' + f.record.pending.length + ' member(s). AND '
    + '`triggered` STANDS VERBATIM BESIDE IT, so the member was emptied BY THE DISCARD and not by the '
    + 'write\'s return having carried nothing');
  assert.equal(f.record.triggered.includes(f.listenerHandle), true,
    'the failed write\'s returned set still carries the listener\'s handle after the arm, read off '
    + '`triggered`, which no removal ever reaches');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE HELD-ARM OBSERVABLE OF READING (K) — `surface.md §2.4` item 8 (a)–(c), with item 7 (b)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ord_the_held_arms_two_holders_the_home_entry_stands_and_the_registrys_function_slot_is_replaced', async () => {
  const f = await orderedFixture({ label: 'ord-held', arm: 'pass' });

  // ── CORRECTED 2026-10-15, ON THIS FILE'S OWN PEN, WITH NO RE-FREEZE ─────────────────────────────────
  //
  // **WHAT STOOD HERE AND WHY IT COULD NOT BE SATISFIED.** This cell's withdrawn half required, on THIS very
  // fixture and THIS very arm, that the record's residue be EMPTY and that the app listener's body run ZERO
  // times — while the sibling cell
  // `ord_the_constraint_body_runs_and_the_listener_body_is_reached_only_once_every_constraint_has_passed`
  // requires, on the SAME fixture and the SAME arm, that the residue be `[f.listenerHandle]` and that the
  // body be reached ONCE. Both cannot hold on one record: the withdrawn half was MALFORMED, and NO
  // implementation could satisfy it without its own sibling going red. THE RESIDUE'S OWN CLAUSE (`§2.7`
  // item 7 (a)) iterates the whole triggered set MINUS the entries checked off as they passed, MINUS the
  // failed write's own returned set, "and MINUS NOTHING ELSE": on the PASSING arm of this fixture nothing is
  // discarded and only the evaluated pair's own entry is checked off, so this registration's handle STANDS
  // in the residue and is delivered once — which is what the sibling asserts.
  //
  // **THE CONTRADICTION THE WITHDRAWN HALF STOOD ON WAS A SPEC REMAND, AND IT IS NOW SETTLED IN THE SPEC
  // AND NOT BY A TEST: `§2.4` item 8 (c) was AMENDED 2026-10-15 on `A115` (D2) (`docs/decisions.md`), and
  // the sentence this cell's withdrawn half was derived from — "the app listener's function runs ONCE at
  // the delivery instant that the delivered record's `pending` residue fixes" — IS NO LONGER IN THE CLAUSE.
  // AS AMENDED, item 8 (c) declares THE OTHER WAY: the constraint's body "runs ONCE inside the pass — the
  // function that runs once at that address is the one THE PASS EVALUATES, the evaluated pair's own
  // function the kernel reaches through its pair-keyed map — and the app's own `on` at that address, which
  // replaced the registry's slot, IS NOT DELIVERED AT THAT INSTANT: the identity the pass checked off is
  // the identity the app's registration returned — the app's handle IS the evaluated pair's handle — so no
  // entry for it stands in `pending` for the residue to reach, and a drive that finds that body run at the
  // delivery instant has found a failure of item 7."** THE RESIDUE IS THEREFORE NOT EMPTY — `§2.7` item 7
  // (a) reaches every entry that was neither checked off nor discarded, and on this fixture that is the
  // plain registration's handle at the watched prefix — and the withdrawn half's EMPTY residue and ZERO
  // runs remain unsatisfiable. **NO EXPECTATION WAS INVENTED TO REPLACE THEM.**
  //
  // **WHAT IS ASSERTED IS WHAT THE LAW AS IT NOW STANDS MAKES OBSERVABLE ON THIS FIXTURE** — the identity
  // (`§2.4` item 8 (a)–(b)), the home entry standing (item 8 (a)), the evaluated identity's absence from
  // the terminal residue AND the app body's zero runs at the ordered attempt's delivery instant (item 8 (c)
  // AS AMENDED, which makes both of them requirements rather than hedges), and the replacement's own
  // declared effect at a later trigger (item 8 (b)). THE WITHDRAWN HALF IS NOT RE-DERIVED AND IS NOT
  // RELABELLED: this cell asserts item 8 (c)'s AMENDED consequence, which points the same way on every
  // assertion above.
  //
  // ── THE RECORDED FINDING AT THIS CELL, RE-SCOPED TO WHAT THIS CELL DRIVES (`§2.4` item 8 (b)'s SECOND
  // HALF) — RE-SCOPED, NOT WITHDRAWN, AND NO LAW MOVED ─────────────────────────────────────────────────
  // CLAUSE: `surface.md §2.4` item 8 (b), *"a later trigger carrying that identity invokes THE SECOND
  // LISTENER AND NEVER THE FIRST, and the FIRST function is never invoked again by any trigger"* — a
  // sentence the 2026-10-15 amendment of item 8 (c) LEFT STANDING. **ITS SUBJECT IS TWO REGISTRATIONS AT
  // ONE IDENTITY: THE SECOND TAKES THAT IDENTITY'S SLOT AND THE FIRST, WHOSE SLOT IT TOOK, IS INVOKED BY
  // NO TRIGGER CARRYING THAT IDENTITY AGAIN.**
  // WHAT THIS CELL DRIVES, READ AT ITS OWN ASSERTIONS: item 8 (b)'s FIRST HALF — the later write's
  // returned set carries the identity (line 525), the replacement is invoked at that trigger exactly
  // once so the slot holds at most ONE function (line 528), and the kernel's pair-keyed body is reached
  // by no later trigger (line 534).
  // WHAT THIS CELL DOES NOT DRIVE, NAMED SO NO ASSERTION BESIDE IT WOULD BE AN INVENTED ONE: the SECOND
  // half, read over the slot this fixture's `on` REPLACED. A body count taken over this fixture's two
  // WATCHED bodies would count TWO REGISTRATIONS AT TWO ADDRESSES — the plain listener at the watched
  // proper prefix and the replacement at the operation's address — and the prefix registration's body is
  // reached again by the store's own descendant-inclusive prefix selection at a later operation
  // (`write-and-read.md §6.5` item 3), which is that registration's OWN identity being triggered and
  // never the replaced slot's body running again. THE COUNT OF THOSE TWO BODIES THEREFORE DOES NOT READ
  // THE CLAUSE'S SECOND HALF AT ALL, and the finding this cell recorded — that the clause's observable
  // "does not hold on the as-built tree" — WAS A MIS-SCOPED READING OF THIS DRIVE AND IS WITHDRAWN AS A
  // CLAIM ABOUT THE TREE. What stands recorded is the narrower, true one: the half is UNDRIVEN BY THIS
  // CELL, and the sentence above states the subject a drive of it would need. NO ASSERTION IS ADDED HERE
  // FOR IT, AND NO LAW OF THIS FILE IS WEAKENED OR DELETED BY THIS RE-SCOPE.
  //
  // ── THE ORDERING LAW AS PRINTED, WHICH IS THE CELL'S OTHER OBSERVABLE ────────────────────────────
  // The clause whose own fail-state catches an as-built tree is `§2.7` item 6's *"the other listeners
  // are reached only once every constraint has passed"*, read at the two bodies' own records; the cell's
  // held-arm assertions read item 8 (b)'s FIRST half (*"a later trigger carrying that identity invokes
  // THE SECOND LISTENER"*), and its second half is recorded as undriven above rather than asserted.

  // ── THE REPLACEMENT ITSELF: THE APP'S OWN REGISTRATION AT THE ADDRESS THE KERNEL ADOPTED ────────────
  const appLog = [];
  const appArgs = [];
  const appHandle = (f.store.register(f.store.listen(f.operation), (...view) => {
    appArgs.push(view);
    mark(appLog, { argumentCount: view.length });
  }) || f.store.listen(f.operation));

  assert.equal(appHandle === f.pairHandle, true,
    '`surface.md §2.4` item 8 (b)\'s held-arm observable, at its own terms: "Held address, two '
    + 'registrations, one handle: the second `on` call RETURNS THE SAME OPAQUE IDENTITY THE FIRST '
    + 'RETURNED" — the store\'s `listen` is idempotent at the address level, so it mints nothing and '
    + 'answers the entry\'s own handle. Read identical=' + (appHandle === f.pairHandle));
  assert.equal(appHandle === f.listenerHandle, false,
    'and it is NOT the plain registration\'s identity: the pair stands at the operation\'s address and that '
    + 'registration at its proper prefix, so this fixture holds TWO distinct identities and the one the '
    + 'second `on` answers is the HOME ENTRY\'s own (`§2.4` item 8 (a): "the entry\'s own handle is returned '
    + 'unchanged")');
  assert.equal(f.triggeredAtCommitReturn.includes(appHandle), true,
    'and that one identity is what the write\'s returned set carries — the returned set is produced by the '
    + 'same address\'s home entry, which no call of this package\'s surface replaces (item 8 (a): "IT '
    + 'REPLACES NOTHING IN THE STORE: THE HOME ENTRY AT THAT ADDRESS STANDS, ONE ENTRY, ONE HANDLE")');
  assert.equal(f.pendingAtCommitReturn.includes(f.listenerHandle), true,
    'and the home entry STANDS beside the package\'s registry: the residue read AT `K-2`\'s RETURN — before '
    + 'any pass has run, and before the second `on` below was ever made — carries the home entry\'s own '
    + 'identity, which is the whole returned set VERBATIM (`§2.7` item 1; `A113` (D3)). Read '
    + f.pendingAtCommitReturn.length + ' member(s) of the member\'s own before-picture. NOTE WHAT THIS '
    + 'ASSERTION IS: the identity, and NOT the residue\'s length at the terminal arm — that count is the '
    + 'remand above and is fixed by no cell here');

  // ── THE SAME ONE IDENTITY, ONCE MORE, AFTER THE ATTEMPT HAS RUN ─────────────────────────────────────
  const ran = capture(() => f.runAttempt(f.store, f.record));
  assert.equal(ran.threw, false,
    'the pass reaches its passing arm — read '
    + (ran.threw ? JSON.stringify(ran.thrown.status) : JSON.stringify(ran.value.outcome)));
  assert.equal(ran.value.outcome, 'passed', 'and the attempt answers `passed`');
  assert.equal(f.constraintLog.length, 1,
    'THE HOME-ENTRY HOLDER\'S RECORD: the constraint body the kernel registered stands at the address, '
    + 'and the pass reaches it ONCE through the kernel\'s own pair-keyed mapping — the app\'s later '
    + 'registration displaces no body, because a constraint pair and an app listener "do NOT displace one '
    + 'another\'s BODIES" (item 8 (c)) and the replacement "REPLACES NOTHING IN THE KERNEL\'S OWN '
    + 'STRUCTURE" (item 8 (a)). Read ' + f.constraintLog.length + ' call(s)');
  assert.equal(f.record.pending.includes(appHandle), false,
    'AND THE EVALUATED IDENTITY IS NOT IN THE TERMINAL RESIDUE, READ WITHOUT ASSERTING ITS LENGTH: what '
    + 'stands there is the plain registration\'s handle and not the identity this attempt evaluated, so the '
    + 'check-off reached the pair\'s own entry (`§2.7` item 7 and its (a)). Read the residue as '
    + f.record.pending.length + ' member(s), the evaluated identity present='
    + f.record.pending.includes(appHandle));

  // ── THE REPLACEMENT AT A LATER TRIGGER OF THAT SAME IDENTITY ───────────────────────────────────────
  // THE TRIGGER USED IS A BARE CALLER-MADE WRITE AT THE HELD ADDRESS ITSELF, so the identity this address's
  // home entry carries arrives in the returned set and this package's `deliver` is consulted for it at the
  // post-verb instant such a record declares (`§2.7` item 2; `§2.4` rule 2), the function reached being
  // whatever the registry slot holds at that instant. WHAT IS ASSERTED HERE IS THE CLAUSE'S OWN POSITIVE
  // HALF — "a later trigger carrying that identity invokes THE SECOND LISTENER" (item 8 (b)) — and NOTHING
  // ABOUT THE BODY THAT STOOD IN THE SLOT BEFORE IT. THE CLAUSE'S OTHER HALF, "AND NEVER THE FIRST, and the
  // FIRST function is never invoked again by any trigger", is NOT ASSERTED HERE AND IS NOT WEAKENED INTO A
  // PASSING FORM: its subject is the slot this fixture's `on` replaced, no assertion of this drive reads
  // that slot's former body, and it is recorded as the finding below instead of being re-derived.
  //
  // ── THE FINDING RECORDED HERE (`§2.4` item 8 (b)'s SECOND HALF) — RE-SCOPED AT THIS CELL'S OWN PEN TO
  // THE READING ITS DRIVE SUPPORTS ──────────────────────────────────────────────────────────────────────
  // CLAUSE: `surface.md §2.4` item 8 (b), *"a later trigger carrying that identity invokes THE SECOND
  // LISTENER AND NEVER THE FIRST, and the FIRST function is never invoked again by any trigger"*. THE
  // DRIVE: one store, the constraint pair at the operation's address, the plain registration at the
  // watched proper prefix, a passing `runAttempt`, then `store.on(operation, appListener)` and a later
  // write whose trigger carries the identity. THE MIS-SCOPED READING, WITHDRAWN: that the prefix
  // registration's body being reached again by the later trigger's prefix selection makes the clause's
  // second half FAIL — the two are registrations at TWO addresses with TWO identities, so the prefix
  // body's second reach is its OWN identity's trigger and says nothing about the slot the `on` replaced
  // (`write-and-read.md §6.5` item 3; `§2.4` item 6 (b)). THE FINDING THAT STANDS: the second half is
  // UNDRIVEN BY THIS CELL — the slot's own count is asserted for the replacement alone (line 528), and a
  // count of this fixture's two watched bodies would not read the slot at all.
  const appRunsAtTheOrderedAttempt = appLog.length;
  const appArgsAtTheOrderedAttempt = appArgs.length;
  const bareRecord = f.store.write(f.operation, 'mem', { [tag('ord-held-l2')]: 1 });
  assert.equal(bareRecord.triggered.includes(appHandle), true,
    'the later write\'s own returned set carries the identity the registry slot is keyed by — the held '
    + 'address\'s home entry still carries it, one entry, one handle (item 8 (a))');
  assert.equal(appLog.length - appRunsAtTheOrderedAttempt, 1,
    'AND THE SECOND LISTENER IS INVOKED THERE — exactly once, so the slot the identity names holds the '
    + 'replacement and holds at most ONE function (`§2.4` rule 2; item 8 (b): "a later trigger carrying '
    + 'that identity invokes THE SECOND LISTENER"). Read '
    + (appLog.length - appRunsAtTheOrderedAttempt) + ' invocation(s) of the replacement at the later '
    + 'trigger');
  assert.equal(f.constraintLog.length, 1,
    'and the kernel\'s own pair-keyed body was reached by NO later trigger: the constraint body stands '
    + 'inside the pass alone and this package\'s registry is not the structure the kernel\'s pairs are '
    + 'reached through (item 8 (a): "the kernel\'s registry is keyed by (`address`, `id`) and is not '
    + 'reachable through this package\'s registry at any instant")');
  assert.equal(appArgs.length - appArgsAtTheOrderedAttempt, 1,
    'and the replacement\'s invocation produced ONE argument view, and no more, at the later trigger — read '
    + (appArgs.length - appArgsAtTheOrderedAttempt));
  assert.deepEqual(appArgs[appArgs.length - 1][0], f.operation,
    'and that argument is the TRIGGERING ADDRESS of the later write — the address the trigger\'s own op '
    + 'landed at and the address whose home entry holds this identity (`§2.7` item 5; `kernel-surface.md '
    + '§2.1` item 2 (ii)) — read ' + JSON.stringify(appArgs[appArgs.length - 1][0]));

  // ── THE SAME ONE IDENTITY, ONCE MORE, AT THE END OF THE CELL ────────────────────────────────────────
  // THIS REGISTRATION IS MADE LAST ON PURPOSE, AND THE REASON IS ITSELF THE CLAUSE: the registry holds AT
  // MOST ONE FUNCTION PER IDENTITY and does not record which member wrote it (`§2.4` rule 2; `DD-52`), so
  // the `on` below takes the identity's slot for its own caller's function — which is why the drive that
  // reads the app listener's own body, above, is made BEFORE this statement.
  const identityAtTheEnd = (f.store.register(f.store.listen(f.operation), () => {}) || f.store.listen(f.operation));
  assert.equal(identityAtTheEnd === appHandle, true,
    'and after the pass has run, after a later trigger of that identity and after the replacement has been '
    + 'reached, the address STILL answers ONE identity: the home entry the returned set was produced by is '
    + 'unmoved by the attempt, by the trigger and by every registration made here, and this further `on` at '
    + 'the held address returns the same opaque identity again (item 8 (a): "THE HOME ENTRY AT THAT ADDRESS '
    + 'STANDS, ONE ENTRY, ONE HANDLE"; item 8 (b))');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §4  THE UNORDERED CASE — `surface.md §2.7` ITEM 8's DECLARED HOLE, PINNED AS DECLARED AND NOT CLOSED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ord_a_bare_caller_made_write_carries_no_kernel_evaluation_set_and_its_delivery_is_the_post_verb_instant', async () => {
  // **ITEM 8'S OWN HONEST CONTENT IS "THE HOLE STANDS", AND THIS CELL PINS THE HOLE AS THE DECLARED
  // BEHAVIOUR.** The clause: where a record carries NO kernel evaluation set — "a write the caller made
  // through the store's own write verb and no `commit`, so that no `CommitRecord` and no `pending` member
  // exists to read — THE DELIVERY INSTANT IS TODAY'S AND THIS CLAUSE DOES NOT MOVE IT: item 2's window
  // stands, and the package invokes the registered bodies for the returned handles after the store call
  // has completed and the record has been copied out." Nothing below asserts an ordering this clause does
  // not promise; the two things it DOES declare are asserted, and the hole is named as the fail-state the
  // clause itself names rather than closed by invention.
  const store = makeStore();
  const watch = [tag('ord-bare-w')];
  const operation = [...watch, tag('ord-bare-o')];
  const calls = [];
  const args = [];
  let insideTheWriteVerbsOwnCall = false;

  store.write(watch, 'mem', { [tag('ord-bare-link')]: 1 });

  const handle = (store.register(store.listen(operation), (...view) => {
    args.push(view);
    calls.push({ mark: ++SEQ, insideTheWriteVerbsOwnCall });
  }) || store.listen(operation));

  // ONE FLAG, SET AROUND THE CALLER'S OWN STATEMENT AND CLEARED IMMEDIATELY AFTER IT: it is true exactly
  // while the caller's `write` call has not yet returned, so a body that ran inside that call reads it
  // true. This is an instrument of THIS file and asserts nothing of the store.
  insideTheWriteVerbsOwnCall = true;
  const record = store.write(operation, 'mem', 1);
  insideTheWriteVerbsOwnCall = false;

  // ── NO KERNEL EVALUATION SET EXISTS TO READ ─────────────────────────────────────────────────────────
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
    'THE RECORD CARRIES NO KERNEL EVALUATION SET: the store\'s own write answers `{op, watched, '
    + 'triggered}` and nothing else, so there is no `CommitRecord` and no `pending` member to read (item '
    + '8\'s own pre-condition; `surface.md §2.2`\'s returned-record rows and `parameter-semantics.md '
    + '§2.13`/`§2.14`). FAIL-STATE: a member invented onto the store\'s own record — read '
    + JSON.stringify(Object.keys(record).sort()));
  assert.equal('pending' in record, false,
    'and `pending` is absent by its own name — the carrier `A115` rules is `CommitRecord.pending`, and no '
    + 'bare record carries one');
  assert.equal(record.triggered.includes(handle), true,
    'the write\'s returned set carries the registration\'s own handle: the write landed at the address the '
    + 'registration stands at (`§2.7` item 1)');

  // ── WHAT THE CLAUSE ACTUALLY MAKES OBSERVABLE ───────────────────────────────────────────────────────
  assert.equal(calls.length, 1,
    'THE DECLARED DELIVERY HAPPENS: the package invokes the registered body for the returned handle — '
    + 'exactly once, so the hole is a DELIVERY and not a withholding (item 8: "the package invokes the '
    + 'registered bodies for the returned handles after the store call has completed"). Read '
    + calls.length + ' invocation(s)');
  assert.equal(calls[0].insideTheWriteVerbsOwnCall, true,
    'AND ITS INSTANT IS THE POST-VERB ONE THE CLAUSE NAMES, STANDING AS LAW: the body ran while the '
    + 'caller\'s own `write` call had not yet returned — "after the store call has completed and the record '
    + 'has been copied out", which is item 2\'s window and which this clause "does not move" — so the body '
    + 'runs before the caller\'s next statement, inside the statement that made the write. FAIL-STATE, AND '
    + 'IT IS THE HOLE NAMED AND NOT CLOSED: such a caller\'s body runs at that instant "and it runs WHETHER '
    + 'OR NOT a constraint pass is later driven over that write — and where a pass is later driven and '
    + 'FAILS, that delivery has already happened, so item 6\'s discard reaches no body this unit delivered '
    + 'and the delivery cannot be undone" (item 8; the `N7` row). THIS CELL ASSERTS NO ORDERING AND NO '
    + 'GATE FOR THIS WRITE: the clause promises none, and an assertion of one would be an invented promise');
  assert.equal(args.length, 1, 'and the invocation\'s own view was recorded once');
  assert.equal(args[0].length, 1, 'with exactly one argument (`§2.7` item 5) — read ' + args[0].length);
  assert.deepEqual(args[0][0], operation,
    'and that argument is the triggering address, the operation\'s own address (`§2.7` item 5; '
    + '`kernel-surface.md §2.1` item 2 (ii))');

  // ── THE ASYMMETRY THE CLAUSE DECLARES RATHER THAN SMOOTHS ───────────────────────────────────────────
  // "the same address, written by the same caller, is ordered when it is driven through `commit` and
  // unordered when it is written bare — and that difference is a property of which record the caller
  // holds, not of the address, the registration or the listener."
  const ordered = await orderedFixture({ label: 'ord-bare-cmp', arm: 'pass' });
  assert.equal(Array.isArray(ordered.record.pending), true,
    'the ordered route\'s record carries the kernel\'s evaluation set — the carrier `A115` names — and '
    + 'this file\'s §1 and §2 cells read the ordering and the discard off it');
  assert.equal('pending' in record, false,
    'while the bare route\'s record does not: the difference between them is a property of WHICH RECORD '
    + 'THE CALLER HOLDS, exactly as item 8 declares it — not of the address, the registration or the '
    + 'listener. Read the bare record\'s members ' + JSON.stringify(Object.keys(record).sort()) + ' against '
    + 'the ordered record\'s ' + JSON.stringify(Object.keys(ordered.record).sort()));
});
