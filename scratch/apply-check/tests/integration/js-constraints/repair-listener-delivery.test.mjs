// RED SET — `D-104` AT THE KERNEL'S OWN SURFACE: THE REPAIR ARM'S MERGE AND ITS TWO GUARDS
// (`tests/integration/js-constraints/repair-listener-delivery.test.mjs`, cells `RLD-I1` … `RLD-I5`).
//
// THE DECLARATION: `docs/L1/repair-listener-delivery.md` — §3.2 (the carrier and its invocation guard), §3.3
// (the predicate), §3.4 (the seat and the member's own de-duplication), §3.4a (the nested-attempt guard), §5
// (the failing arm's widened discard) and **§7.2, which names THESE FIVE CELLS**. THE RULING:
// `strata/decisions.md` · `D-104`, item 2 (the behaviour) and item 4 (**no status, no member, no arity, no type
// may move** — the bounds every assertion below is written inside).
//
// WHAT THIS UNIT DRIVES, AND WHY IT IS THE KERNEL'S AND NOT THE ENTRY'S. The merge sits on `evaluate`'s repair
// arm (`bindings/js/src/entry/kernel-attempt.mjs`), which both attempt kinds share, and every fact the five
// cells read is a fact of THAT arm: **the predicate** (a carried pair's handle is asked and never delivered,
// `D-69`), **the seat** (after the credit, before the re-run, before the check-off), **the credit gate** (a
// repair whose return names no landed op merges nothing) and **the invocation guard pair** (the bracket's own
// presence, and the attempt count that drops a nested act's list). So the drive is the kernel's own three items
// — `register` · `commit` · `runAttempt` — with **the listeners armed through the product's TWO declared acts**,
// `listen(handle, addresses)` then `register(handle, listener)` (`D-22`, `D-98`: the caller spells the handle).
//
// THE ONE FIXTURE SHAPE ALL FIVE CELLS SHARE, AND WHY IT IS THIS ONE. The attempt's address is `['<tag>','c']`
// and the pairs stand at its PROPER PREFIX `['<tag>']` — the `D-56` prefix set — while each repair writes at a
// LEAF BESIDE the attempt (`['<tag>','leaf…']`), where a listener is bound. **THAT SEAT IS WHAT MAKES THE
// MEASUREMENTS CLEAN**: a write at the leaf returns the leaf's own listener AND the ancestor pairs, so **one
// repair's returned set carries a pair's `id` and a listener's handle TOGETHER** — the state `§7.2`'s `RLD-I1`
// names — **while the commit's own write at `['<tag>','c']` returns neither that listener nor anything the
// repair will write**, so the member's seed never carries the repair's listener.
//
// ── THE TWO RE-DERIVED CLAIMS, WHICH LAND WITH THESE CELLS AND ARE NOT RE-DRIVEN HERE (`§7.3`) ────────
// `§7.3` names two committed CLAIMS whose assertions are non-total from this date, and they are re-derived IN
// PLACE, at their own bytes, by the pass that landed these cells:
//   · `tests/integration/js-constraints/constraint-kernel-layers.test.mjs:344`–`:351` — the loop over `pending`
//     asserting `carriesHandle(triggered, entry.handle) === true` for every element;
//   · `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs:223`–`:224` — the passing-arm
//     equality `setHandles(pending) === setHandles(triggered) MINUS the checked-off id`.
// **NEITHER REDS TODAY** (neither fixture lands a repair that fires a listener outside the commit's set), **and
// after this fix each is TRUE-UNTIL-A-REPAIR: a merged element is a handle THE REPAIR'S WRITE returned.** No
// cell below re-asserts either claim; each is read at its own home.
//
// ── THE STATES ENUMERATED BEFORE THE CELLS (one valid drive per state) ─────────────────────────────────
// S1  A MULTI-REPAIR CHAIN (`P-SM-5`'s own shape: pair `j` passes on a landed rank `>= j` and its repair lands
//     the rank `j`), so the SECOND repair's returned set carries a pair whose check-off an EARLIER run already
//     took — the only seat at which §3.3's predicate is load-bearing rather than a deputy of the de-duplication.
// S2  THE FAILING ARM AFTER A LANDED REPAIR: a second pair refuses the value the repair wrote, so the discard's
//     widened filter is the one removal the member gets.
// S3  THE SEAT READ FROM INSIDE THE RE-RUN: a pair that is asked ONLY on the re-run (the first pass transitions
//     at an earlier pair's violation) reads the record's member at that instant.
// S4  A REPAIR THAT DECLINES AFTER ITS WRITE LANDED (arm `(d)`, `KC-4`) — the credit gate.
// S5  A REPAIR THAT WRITES AT THREE POSITIONS (`D-103`'s unsupported route) — the nested attempt inside the
//     invocation, whose own terminal arm delivers that act.
//
// **NOTHING HERE ASSERTS A NESTED ATTEMPT'S OWN COUNTS.** `Q-6` puts that route up and `D-103` item 1 promises
// nothing for it, so `RLD-I5` asserts THE ENCLOSING COMMIT'S two readings — no element added, and the listener's
// count `1` and not `2` — and records the nested arm's figures without asserting them.
//
// **D-17**: the expectation is a literal here and the citation is a comment. **D-21**'s discipline is the
// integration battery's own: every cell prints its readings in the assertion's own message, so a red is
// attributable without a second run.

import test from 'node:test';
import assert from 'node:assert/strict';

import { kernelFor } from '../../../bindings/js/src/entry/kernel-foundations.mjs';

import {
  kernel, makeStore, tag,
  KC, assertKernelForm, assertAttemptReport,
  capture, checkIds, countingListener,
  passAtRegistration,
  listenAndRegister, carriesHandle, setHandles,
} from './constraint-kernel-helpers.mjs';

/** The `handle` members of a returned set, read as a SET (`DD-22`: the store's list has no declared order). */
const handlesOf = (set) => setHandles(set);

/** Every handle a listener body would run for, read as a set from the record's own member. */
const pendingHandles = (record) => (Array.isArray(record.pending) ? handlesOf(record.pending) : null);

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-I1` · THE PREDICATE — a repair's returned set carries a pair's `id` AND a listener's handle:
// the listener merges, the pair's id does NOT — read on the MULTI-REPAIR shape that measures it
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('rld_i1_the_predicate_merges_a_listeners_handle_and_never_a_carried_pairs_id_on_the_multi_repair_chain', async () => {
  // THE CLAUSE (`§3.3`, and `§7.2`'s own row): *"an element of the invocation's leg list merges iff its `handle`
  // is not one the kernel's own registry names as a carried pair's … That is the architect's 'new
  // non-constraint listeners' spelled as a kernel-side test, it is `D-69`'s own rule read at the merge"*.
  //
  // **ITS LOAD-BEARING CASE IS THIS ONE, AND §3.3 PRINTS WHY THE SINGLE-REPAIR FIXTURE IS NOT IT**: a run's
  // check-off stands AFTER that run's repair arm, so at a FIRST repair's seat the pair just evaluated is still in
  // the member and **the de-duplication alone would exclude its id**; **the SECOND repair's write re-triggers a
  // pair an EARLIER run already checked off, and that id is no longer there** (`P-SM-5`'s chain). Without the
  // predicate the merge would put it BACK — `pending` would carry an id the pass evaluated, which is the one
  // thing its reading forbids (`A112`; `DW-14.4`) — and the caller's own loop would run a constraint's
  // registration as if it were a listener's.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = [tag('rldi1')];
  const attemptAddress = [root[0], 'c'];
  const leaves = [[root[0], 'leaf0'], [root[0], 'leaf1']];
  // THE ROOT IS A LINK, so a write BESIDE the attempt's address lands (the ancestor home entry the two writes
  // and the two registrations share).
  store.write(root, 'mem', { seed: 'the ancestor home entry stands' });
  const plain = leaves.map((leaf, j) => {
    const listener = countingListener();
    const handle = listenAndRegister(store, leaf, listener);
    listener.seen.length = 0; // the registration's own window is not this cell's subject
    return { j, leaf, listener, handle };
  });

  let record = null;
  const returnedSets = [];
  const seats = [];
  for (let j = 0; j < 2; j += 1) {
    // **`A135` (3) / `§7.3` (b) state 1 — MANDATORY HERE** (`3-bis`): a body carrying a `repair` is ATTEMPTED at
    // its registration, which would spend the chain's first landing before the pass this cell drives.
    register(store, root, `rldi1-p${j}`, passAtRegistration((context) => {
      if (typeof context.value === 'number' && context.value >= j) return true;
      return {
        message: `the landed value is below rank ${j}`,
        repair: (repairContext) => {
          const written = store.write(leaves[j], 'mem', j, repairContext);
          returnedSets.push({ j, handles: handlesOf(written.triggered), opId: written.op.opId });
          // **THE SEAT'S OWN READING, TAKEN INSIDE THE REPAIR AND BEFORE THE MERGE** (`§3.4`: the merge stands
          // after the body returned and the credit was confirmed).
          seats.push({ j, pending: pendingHandles(record) });
          return { ok: true, op: written.op };
        },
      };
    }));
  }
  record = commit(store, attemptAddress, 'mem', 'broken');
  assert.deepEqual(record.pending.slice(), record.triggered.slice(),
    'THE PREMISE AT `K-2`\'S RETURN: the member IS the whole returned set, no pass having run '
      + `(\`attempt-lifecycle.md §3\` item 10) — read ${JSON.stringify(pendingHandles(record))}`);
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'RLD-I1');

  // ── (a) THE DRIVE REACHED ITS ARM: TWO REPAIRS, EACH WITH A SET CARRYING BOTH KINDS. ─────────────────
  assert.deepEqual(returnedSets.map((set) => set.j), [0, 1],
    `TWO REPAIRS LANDED, IN TURN — one per pair (\`P-SM-5\`'s chain): read ${JSON.stringify(returnedSets)}`);
  assert.deepEqual(record.triggered.length >= 2, true,
    `the commit's own write returned both pairs (\`D-56\`'s prefix set): read ${JSON.stringify(handlesOf(record.triggered))}`);
  for (const set of returnedSets) {
    assert.equal(set.handles.includes(`rldi1-p0`), true,
      '**EACH REPAIR\'S RETURNED SET CARRIES A CARRIED PAIR\'S `id`** — the ancestor registration is returned '
      + `for a write beneath it (\`D-56\`; \`§3.3\`'s own premise): the set read ${JSON.stringify(set.handles)}`);
    assert.equal(set.handles.includes(plain[set.j].handle), true,
      '**AND ITS OWN LISTENER\'S HANDLE — the two kinds in ONE set, which is this cell\'s subject**: '
      + `read ${JSON.stringify(set.handles)}`);
  }

  // ── (b) THE SEAT'S OWN PREMISE: THE SECOND REPAIR SEES `p0`'s id ALREADY GONE. ────────────────────────
  assert.deepEqual(seats[0].pending, [...handlesOf(record.triggered)].filter((handle) => handle !== null),
    'the FIRST repair\'s seat reads the member as `K-2` seeded it — the pair just evaluated is still there, '
      + `which is why \`§3.3\` says the de-duplication alone would exclude it: read ${JSON.stringify(seats[0].pending)}`);
  assert.equal(seats[1].pending.includes('rldi1-p0'), false,
    '**AND THE SECOND REPAIR\'S SEAT DOES NOT CARRY `p0`\'s id — THE EARLIER RUN\'S CHECK-OFF TOOK IT** '
      + '(`§3.3`: *"a SECOND repair\'s write re-triggers a pair an EARLIER run already checked off, and that id '
      + `is no longer there"*): read ${JSON.stringify(seats[1].pending)}`);
  assert.equal(seats[1].pending.includes(plain[1].handle), false,
    'and it does not carry the SECOND leaf\'s listener either — so the handle this repair returns has nowhere '
      + 'to be excluded FROM, and a merge that appended it would be visible: read '
      + `${JSON.stringify(seats[1].pending)}`);

  // ── (c) THE SUBJECT: THE LISTENER MERGED, THE PAIR'S `id` DID NOT. ───────────────────────────────────
  const closedHandles = pendingHandles(record);
  assert.deepEqual([...closedHandles].sort(), [plain[0].handle, plain[1].handle].sort(),
    '**AT THE COMMIT\'S RETURN `pending` CARRIES BOTH REPAIR LISTENERS AND NO PAIR\'S `id`** — the predicate '
      + 'kept every carried pair out of the member (`§3.3`; `D-69`: *"an element whose handle is a constraint\'s '
      + '`id` is asked; a listener\'s is delivered"*) — read ' + JSON.stringify(closedHandles));
  assert.equal(closedHandles.includes('rldi1-p0'), false,
    '**AND `p0`\'s id IS ABSENT — THE PREDICATE\'S OWN MEASUREMENT, not the de-duplication\'s**: it left the '
      + 'member at the first run\'s check-off and the second repair\'s returned set re-triggered it, so a merge '
      + `without §3.3 would have PUT IT BACK — read ${JSON.stringify(closedHandles)}`);
  assert.equal(closedHandles.includes('rldi1-p1'), false,
    'and `p1`\'s id is absent for the second reason §3.3 gives — a pair is NEVER MERGED, even one still standing '
      + `in the member at a seat: read ${JSON.stringify(closedHandles)}`);
  assert.deepEqual(plain.map((bound) => bound.listener.seen.length), [1, 1],
    'and the delivery resolved both merged elements once each — one invocation per distinct handle '
      + `(\`surface.md §2.4\` rule 3): read ${JSON.stringify(plain.map((bound) => bound.listener.seen.length))}`);
  assert.deepEqual(checkIds(report.log), ['rldi1-p0', 'rldi1-p0', 'rldi1-p1', 'rldi1-p0', 'rldi1-p1'],
    'and the pass asked the pairs ONLY — never a merged element (`§6`: *"the re-run asks `attempt.record.'
      + 'triggered` and not `pending`"*) — read ' + JSON.stringify(checkIds(report.log)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-I2` · THE DISCARD'S WIDENED SCOPE — read as a SET RELATION and never as a count of removals
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('rld_i2_the_failing_arms_discard_reaches_the_union_of_the_failed_writes_set_and_this_attempts_repairs_sets_as_a_set_relation', async () => {
  // THE CLAUSE (`§5`, and `§7.2`'s own row): *"the filter becomes the union of the failed write's returned set
  // and the sets this attempt's repairs' writes returned … one removal, by the set each entry came back in, and
  // no second rule"*. **THE FAILURE IT CATCHES**: `pending` carrying a merged listener after a failing arm — an
  // entry the delivery would then fire on an attempt the law declares EMPTY (`surface.md §2.7` item 6), which is
  // the reason §5 says *"a merge without the widened discard would deliver a discarded set on every failing
  // repaired attempt"*.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = [tag('rldi2')];
  const attemptAddress = [root[0], 'c'];
  const leaf = [root[0], 'leaf'];
  store.write(root, 'mem', { seed: 'the ancestor home entry stands' });
  const listener = countingListener();
  const handlePlain = listenAndRegister(store, leaf, listener);
  listener.seen.length = 0;

  const repairReturned = [];
  register(store, attemptAddress, 'rldi2-c1', passAtRegistration((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the first pair',
      repair: (repairContext) => {
        const written = store.write(leaf, 'mem', 3, repairContext);
        repairReturned.push(handlesOf(written.triggered));
        return { ok: true, op: written.op };
      },
    };
  }));
  // THE SECOND PAIR REFUSES **THE VALUE THE REPAIR WROTE**, so the re-run takes the first-violation arm and the
  // attempt fails on the arm §5's discard belongs to.
  register(store, attemptAddress, 'rldi2-c2', passAtRegistration((context) => (
    context.value === 3 ? { message: 'the repaired value contradicts the second pair' } : true
  )));
  const record = commit(store, attemptAddress, 'mem', 2);
  const answer = capture(() => runAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(answer.threw, true,
    '**THE ATTEMPT FAILS AT THE RE-RUN** — the repair landed and the second pair refused its value: the run '
      + `RETURNED ${JSON.stringify(answer.threw ? null : answer.value.outcome)}`);
  assertKernelForm(answer.thrown, 'RLD-I2 failing arm');
  assert.equal(answer.thrown.status, KC[3],
    `and on the first-violation arm \`(c)\` — read ${JSON.stringify(answer.thrown.status)}`);
  assert.equal(repairReturned.length === 1 && repairReturned[0].includes(handlePlain), true,
    '**AND THE REPAIR\'S WRITE RETURNED THE LISTENER\'S HANDLE — the set the merge WOULD have carried '
      + `EXISTS**: read ${JSON.stringify(repairReturned)}`);

  // ── (b) THE SUBJECT: `pending` ∩ (the failed write's set ∪ the repairs' sets) = ∅. ────────────────────
  //
  // **A SET RELATION AND NEVER A COUNT OF REMOVALS** (`attempt-lifecycle.md §3` item 8's own form, cited by
  // `§7.2`): the union is read over EVERY handle each entry came back in, and the member is read at its
  // handles, so a third handle of either set would be caught here as well.
  const failedWriteSet = handlesOf(record.triggered);
  const repairsSet = repairReturned.flat();
  const union = new Set([...failedWriteSet, ...repairsSet]);
  const intersection = pendingHandles(record).filter((handle) => union.has(handle));
  assert.deepEqual(intersection, [],
    '**NO HANDLE OF EITHER SET SURVIVES THE ARM IN `pending`** — the discard reaches the union of the failed '
      + 'write\'s returned set and this attempt\'s repairs\' sets, ONE removal by the set each entry came back in '
      + `(§5; the whole-member clear stays WITHDRAWN BY NAME): the intersection reads ${JSON.stringify(intersection)}`);
  assert.deepEqual([...failedWriteSet].sort(), ['rldi2-c1', 'rldi2-c2'],
    'and the failed write\'s own set is the one the arm reads VERBATIM (`A112`: *"`triggered` then stands as the '
      + `store's own returned set"*) — read ${JSON.stringify(failedWriteSet)}`);
  assert.deepEqual(repairsSet, [handlePlain],
    'and the repairs\' set is the handle the merge would have appended — **so the empty intersection is the '
      + 'WIDENED DISCARD\'s act and not an empty member by construction**: read '
      + `${JSON.stringify(repairsSet)}`);
  assert.deepEqual(pendingHandles(record), [],
    'and the member is EMPTY as a whole on this arm — the discard took the failed write\'s entries and the '
      + `repair's, and no third entry stood: read ${JSON.stringify(pendingHandles(record))}`);
  assert.equal(listener.seen.length, 0,
    '**AND THE FAILING ARM DELIVERED NOTHING** (`surface.md §2.7` item 6): the caller\'s own listener was '
      + `invoked ${listener.seen.length} time(s) — a \`1\` here is the discarded set being delivered`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-I3` · THE SEAT IS BEFORE THE RE-RUN — a pair asked on the re-run reads the merged element
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('rld_i3_the_merges_seat_is_before_the_re_run_a_pair_asked_on_the_re_run_reads_the_repairs_element_in_pending', async () => {
  // THE CLAUSE (`§3.4`'s seat, and `§7.2`'s own row): *"the repair arm appends the repair's write's returned
  // listener elements to the commit's `pending` … AFTER the credit is confirmed, immediately BEFORE
  // `releasePending` — and therefore BEFORE THE RE-RUN"*, so *"the re-run's evaluated set is
  // `attempt.record.triggered` … and not `pending`"*, and the merge therefore changes WHICH PAIRS THE PASS ASKS
  // by nothing. **THIS IS THE SEAT'S ONLY DIRECT OBSERVABLE**: a pair body, running inside the re-run, reads the
  // record's member at that instant.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = [tag('rldi3')];
  const attemptAddress = [root[0], 'c'];
  const leaf = [root[0], 'leaf'];
  store.write(root, 'mem', { seed: 'the ancestor home entry stands' });
  const listener = countingListener();
  const handlePlain = listenAndRegister(store, leaf, listener);
  listener.seen.length = 0;

  let record = null;
  let repairOpId = null;
  const reads = [];
  let repairs = 0;
  register(store, attemptAddress, 'rldi3-p0', passAtRegistration((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts p0',
      repair: (repairContext) => {
        repairs += 1;
        const written = store.write(leaf, 'mem', 3, repairContext);
        repairOpId = written.op.opId;
        return { ok: true, op: written.op };
      },
    };
  }));
  // THE WITNESS PAIR PASSES EVERY VALUE AND RECORDS WHAT IT SEES — registered SECOND, so the first pass
  // transitions at `p0`'s violation before it is asked and **it is asked ONLY on the re-run**.
  register(store, attemptAddress, 'rldi3-p1', passAtRegistration((context) => {
    reads.push({
      opId: context.op === null ? null : context.op.opId,
      pending: pendingHandles(record),
    });
    return true;
  }));
  record = commit(store, attemptAddress, 'mem', 2);
  const report = runAttempt(store, record);
  assertAttemptReport(report, 'RLD-I3');

  // ── (a) THE DRIVE REACHED ITS ARM: THE WITNESS WAS ASKED ONCE, ON THE RE-RUN. ─────────────────────────
  assert.equal(repairs, 1, `THE REPAIR LANDED ONCE: ${repairs}`);
  assert.equal(repairOpId !== null && typeof repairOpId === 'string', true,
    `and its op is a real op id: ${JSON.stringify(repairOpId)}`);
  assert.equal(reads.length, 1,
    '**THE WITNESS PAIR WAS ASKED EXACTLY ONCE — ON THE RE-RUN**, the first pass having transitioned at `p0`'
      + `'s violation (\`§2.4\` item 5 (ii)): read ${JSON.stringify(reads)}`);
  assert.equal(reads[0].opId, repairOpId,
    'and that one ask CARRIES THE REPAIR\'S OWN OP (`§2.4` item 5 (iv): *"THE OP EVERY EVALUATION CARRIES IS '
      + `THE LANDING'S OWN"*) — so the instant IS the re-run: read ${JSON.stringify(reads[0].opId)} of `
      + `${JSON.stringify(repairOpId)}`);

  // ── (b) THE SUBJECT: THE ELEMENT ALREADY STANDS THERE AT THAT INSTANT. ────────────────────────────────
  assert.equal(Array.isArray(reads[0].pending) && reads[0].pending.includes(handlePlain), true,
    '**AT THE RE-RUN\'S OWN INSTANT `pending` ALREADY CARRIES THE REPAIR\'S LISTENER** — the merge has happened, '
      + 'so the seat is BEFORE the re-run and not after it (`§3.4` seat 2: *"the merge does not change which '
      + `pairs the pass asks"*): read ${JSON.stringify(reads[0].pending)}`);
  assert.equal(reads[0].pending.includes('rldi3-p0'), false,
    'and the pair the repair just repaired has ALREADY left the member — its check-off stands after the merge '
      + `and before the re-run: read ${JSON.stringify(reads[0].pending)}`);
  assert.deepEqual(reads[0].pending, [handlePlain],
    '**SO THE MEMBER THE RE-RUN SEES IS THE MERGED RESIDUE AND NOTHING ELSE**: read '
      + `${JSON.stringify(reads[0].pending)} of the listener's ${JSON.stringify(handlePlain)}`);
  assert.deepEqual(checkIds(report.log), ['rldi3-p0', 'rldi3-p0', 'rldi3-p1'],
    '**AND THE PASS\'S ASKED SET IS UNCHANGED BY THE MERGE** — the same pairs, in the same order, both runs '
      + '(`§6`: *"a merge into `pending` cannot make the pass ask a pair it would not have asked, and cannot '
      + `make it skip one"*): read ${JSON.stringify(checkIds(report.log))}`);
  assert.deepEqual(pendingHandles(record), [handlePlain],
    'and at the commit\'s return the member still carries it, so the delivery owed it: read '
      + `${JSON.stringify(pendingHandles(record))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-I4` · THE CREDIT GATE — a repair whose return names no landed op merges NOTHING
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('rld_i4_the_credit_gate_a_repair_that_names_no_landed_op_merges_nothing_into_the_records_pending', async () => {
  // THE CLAUSE (`§3.4` seat 1, and `§7.2`'s own row): *"**AFTER THE CREDIT**: a repair whose return carries no
  // op the attempt can be shown to have landed takes arm `(d)` and **the attempt fails**, so its listeners would
  // be discarded anyway; **merging nothing keeps the member honest for the instant between**"*. **THE FAILURE IT
  // CATCHES**: a merge taken BEFORE the credit — a member carrying a listener for an attempt whose repair was
  // never admitted.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = [tag('rldi4')];
  const attemptAddress = [root[0], 'c'];
  const leaf = [root[0], 'leaf'];
  store.write(root, 'mem', { seed: 'the ancestor home entry stands' });
  const listener = countingListener();
  const handlePlain = listenAndRegister(store, leaf, listener);
  listener.seen.length = 0;

  let repairs = 0;
  let repairReturned = null;
  register(store, attemptAddress, 'rldi4-c1', passAtRegistration((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        // **THE WRITE LANDS AND THE REPAIR THEN DECLINES** — the closed two-arm return's FAILED arm, `op` ABSENT
        // and never `null` (`RepairOutcome`'), which is arm `(d)`: `KC-4`.
        const written = store.write(leaf, 'mem', 3, repairContext);
        repairReturned = handlesOf(written.triggered);
        return { ok: false, message: 'the repair declines after its own edit landed' };
      },
    };
  }));
  const record = commit(store, attemptAddress, 'mem', 2);
  const answer = capture(() => runAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM: ARM `(d)`, `KC-4`. ─────────────────────────────────────────────────
  assert.equal(answer.threw, true,
    '**THE ATTEMPT FAILS** — the repair\'s return named no op the attempt could be shown to have landed: the '
      + `run RETURNED ${JSON.stringify(answer.threw ? null : answer.value.outcome)}`);
  assertKernelForm(answer.thrown, 'RLD-I4 arm (d)');
  assert.equal(answer.thrown.status, KC[4],
    'and the arm is `(d)` — `KC-4` (`§5`: *"the store refuses the repair\'s verb — no op exists, `landedOp` '
      + `credits nothing"*): read ${JSON.stringify(answer.thrown.status)}`);
  assert.equal(repairs, 1, `THE REPAIR MUST HAVE RUN ONCE: ${repairs}`);
  assert.equal(Array.isArray(repairReturned) && repairReturned.includes(handlePlain), true,
    '**AND ITS WRITE RETURNED THE LISTENER\'S HANDLE, so the element a merge WOULD have appended existed**: '
      + `read ${JSON.stringify(repairReturned)}`);

  // ── (b) THE SUBJECT: THE MEMBER CARRIES NO REPAIR ELEMENT. ────────────────────────────────────────────
  assert.equal(carriesHandle(record.pending, handlePlain), false,
    '**`pending` CARRIES NO ELEMENT OF THE REPAIR\'S SET** — the merge stands AFTER the credit, so a repair that '
      + 'names no landed op merges nothing (`§3.4` seat 1): read '
      + `${JSON.stringify(pendingHandles(record))}`);
  assert.deepEqual(pendingHandles(record), [],
    '**AND THE MEMBER IS THE WHOLE RETURNED SET MINUS THE DISCARD\'S REACH** — the failed write\'s own entries '
      + 'and nothing else left, with no repair element beside them (`§7.2`\'s own spelling): read '
      + `${JSON.stringify(pendingHandles(record))} of ${JSON.stringify(handlesOf(record.triggered))}`);
  assert.deepEqual(handlesOf(record.triggered), ['rldi4-c1'],
    'and `triggered` stands VERBATIM as the store\'s own returned set through the arm (`A112`): read '
      + `${JSON.stringify(handlesOf(record.triggered))}`);
  assert.equal(listener.seen.length, 0,
    'and the listener fires nowhere — the arm is EMPTY and the member carried nothing for it to fire: '
      + `read ${listener.seen.length}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-I5` · THE NESTED-ATTEMPT GUARD — a repair's three-position write adds NOTHING to the enclosing
// member, and the listener's count is `1` and not `2`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('rld_i5_the_nested_attempt_guard_a_repair_that_writes_without_naming_the_commit_adds_no_element_and_invokes_the_listener_once', async () => {
  // THE CLAUSE (`§3.4a`, and `§7.2`'s own row): the repair body's **unnamed** write (`D-103`'s unsupported
  // route) takes the three-position route to `constraintWrite` → **a SECOND `K-2`** — and **that nested commit's
  // handles append to the SAME invocation list the outer repair arm is about to read, while the nested attempt's
  // own terminal arm delivers them as well**. **Merging them would deliver those handles TWICE** — *"a double
  // invocation of a caller's body, which is the one thing `surface.md §2.4` rule 3 forbids and the very class
  // this fix exists to remove"*. **THE GUARD IS `kernel.attempts`, read before the body is invoked and after it
  // returned: where the count has moved, the list is DROPPED.**
  //
  // **AND, BY `Q-6`, NOTHING HERE ASSERTS THE NESTED ATTEMPT'S OWN COUNTS** (`D-103` item 1 promises none of the
  // five, *"the `pending` delivery"` included): the cell asserts THE ENCLOSING COMMIT'S two readings and records
  // the nested arm's figures without asserting them.
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = [tag('rldi5')];
  const attemptAddress = [root[0], 'c'];
  const leaf = [root[0], 'leaf'];
  store.write(root, 'mem', { seed: 'the ancestor home entry stands' });
  const listener = countingListener();
  const handlePlain = listenAndRegister(store, leaf, listener);
  listener.seen.length = 0;

  let repairs = 0;
  let nestedReturned = null;
  let attemptsBefore = null;
  let attemptsAfter = null;
  register(store, attemptAddress, 'rldi5-c1', passAtRegistration((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the pair',
      repair: () => {
        repairs += 1;
        // **THE GUARD'S OWN TWO READINGS, TAKEN IN THE FRAME THAT HOLDS THEM** (`§3.4a`: *"`kernel-attempt.mjs`
        // reads `kernel.attempts` BEFORE the body is invoked and AFTER it returns"*).
        attemptsBefore = kernelFor(store).attempts;
        // **THREE POSITIONS — `D-103`'s UNSUPPORTED ROUTE.** No commit is named, so the write opens its own
        // attempt instead of joining this one.
        const written = store.write(leaf, 'mem', 3);
        attemptsAfter = kernelFor(store).attempts;
        nestedReturned = handlesOf(written.triggered);
        return { ok: true, op: written.op };
      },
    };
  }));
  const record = commit(store, attemptAddress, 'mem', 2);
  const answer = capture(() => runAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM: A NESTED ATTEMPT WAS OPENED ACROSS THE INVOCATION. ────────────────
  assert.equal(repairs, 1, `THE REPAIR MUST HAVE RUN ONCE: ${repairs}`);
  assert.equal(typeof attemptsBefore === 'number' && typeof attemptsAfter === 'number', true,
    '**THE KERNEL\'S OWN COUNTER MUST BE READABLE AT BOTH EDGES OF THE INVOCATION** (`kernel.attempts`, the one '
      + `increment per \`K-2\` and per \`commitRemoval\`): read ${JSON.stringify([attemptsBefore, attemptsAfter])}`);
  assert.equal(attemptsAfter - attemptsBefore, 1,
    '**AND IT MOVED BY EXACTLY ONE — A NESTED ATTEMPT WAS OPENED INSIDE THIS INVOCATION**, which is the fact the '
      + 'guard reads (`§3.4a`): read ' + `${JSON.stringify([attemptsBefore, attemptsAfter])}`);
  assert.equal(Array.isArray(nestedReturned) && nestedReturned.includes(handlePlain), true,
    '**AND THE NESTED WRITE RETURNED THE LISTENER\'S HANDLE** — so the leg list this invocation accumulated '
      + `carried it, and only the guard keeps it out of the enclosing member: read `
      + `${JSON.stringify(nestedReturned)}`);

  // ── (b) THE SUBJECT: THE ENCLOSING MEMBER GAINS NOTHING; THE COUNT IS `1`, NOT `2`. ──────────────────
  assert.equal(carriesHandle(record.pending, handlePlain), false,
    '**THE ENCLOSING `pending` GAINS NO ELEMENT FROM THE NESTED WRITE** — the list was DROPPED because the count '
      + `moved (\`§3.4a\`): read ${JSON.stringify(pendingHandles(record))}`);
  assert.deepEqual(pendingHandles(record), [],
    'and the member is EMPTY: the commit\'s own pair left by its check-off and nothing was merged beside it — '
      + `read ${JSON.stringify(pendingHandles(record))} of ${JSON.stringify(handlesOf(record.triggered))}`);
  assert.equal(listener.seen.length, 1,
    '**AND THE LISTENER\'S COUNT IS `1`, NOT `2`** — the nested attempt\'s own terminal arm delivered the act '
      + 'ONCE, and the enclosing commit added no second invocation (*"merging them would deliver those handles '
      + `TWICE"*, \`§3.4a\`): read ${listener.seen.length}`);
  assert.deepEqual(handlesOf(record.triggered), ['rldi5-c1'],
    'and the enclosing commit\'s `triggered` is its own write\'s returned set, VERBATIM (`A112`): read '
      + `${JSON.stringify(handlesOf(record.triggered))}`);

  // ── (c) THE NESTED ARM'S OWN FIGURES — RECORDED, NOT ASSERTED (`Q-6`). ────────────────────────────────
  //
  // **`D-103` ITEM 1 PROMISES NOTHING FOR THIS ROUTE** — neither the `pending` delivery nor any other of its five
  // non-promises — so **no assertion of this unit may depend on what the nested attempt answered.** The readings
  // are printed here so a later ruling (`Q-6`: should the route be REFUSED rather than unsupported?) finds them
  // at the bytes, and the two assertions above are the ENCLOSING COMMIT's own.
  const nestedOutcome = answer.threw ? `THREW ${answer.thrown.status}` : `RETURNED ${answer.value.outcome}`;
  assert.equal(typeof nestedOutcome === 'string', true,
    `**RECORDED AND NOT ASSERTED (Q-6): the enclosing attempt answered ${nestedOutcome}; the nested write's own `
      + `returned set read ${JSON.stringify(nestedReturned)}; the listener was invoked `
      + `${listener.seen.length}× with ${JSON.stringify(listener.seen)}; the attempt count moved `
      + `${JSON.stringify([attemptsBefore, attemptsAfter])}.** The route is \`D-103\`'s unsupported one and no `
      + 'cell of this unit asserts its delivery');
});
