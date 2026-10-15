// RED SET — `U-STOREROOM-CONSTRAINTS`, THE NEGATIVE GENERATORS `P-NEG-14` … `P-NEG-20` AND `P-NEG-22`
// (the gate-4 closure verification's SECOND red set; `P-NEG-21`, the register's own closure, stands
// beside the budget cell it reads, `constraint-kernel-properties.test.mjs`, because it reads that
// file's own `ROW_CELLS`).
//
// EVERY CELL HERE TESTS A DECLARED RULE AND CITES IT BESIDE THE ASSERTION. NOTHING HERE IS DRIVEN
// THROUGH THE REGISTER'S `row()` HARNESS: these are HAND-BUILT NEGATIVE DRIVES, so the register's own
// census — the `row()` cell count `21`, the `21 x 19 = 399 <= 400` budget arithmetic, the `27` declared
// strategy ids and their `24 + 3` closure — MOVES NOT ONE TERM.
//
// THE FIXTURE RULE IS THE UNIT'S (`kernel-surface.md §1` item 1, cited and not re-declared): every
// store here is the package's own `storeCreate(cfg)` through the shared helper, and no drive reaches a
// store another way.
//
// ── THE EIGHT CELLS, ONE LINE EACH, WITH THE CLAUSE EACH IS DERIVED FROM ─────────────────────────
//   `P-NEG-14` the ancestor plain listener's handle: `[]` after a failing `K-3`, still standing after a
//        passing one whose checkpoint is non-null — `attempt-lifecycle.md §2.4` item 8 (i) (5), read
//        with `kernel-surface.md §2.1` item 2's discarded-set clause.
//   `P-NEG-15` a pair registered MID-PASS joins no pass: `checkIds == ['a']`, `b` ran zero times, the
//        attempt `passed` — `attempt-lifecycle.md §2.4` item 5 (iv)'s no-exclusion clause read with
//        `CX-12`.
//   `P-NEG-16` the outside form decides AT THE FIRST violating pair, whatever its form: `KC-3`,
//        `checkIds == ['a']`, `b`'s body never ran — `attempt-lifecycle.md §2.4` items 4 (c) and 5 (ii).
//   `P-NEG-17` `repair-run`'s `opId` on arm `(d)` is THE OP IT WAS INVOKED FOR, on both arms —
//        `kernel-surface.md §2.5` item 1's kind table.
//   `P-NEG-18` a repair naming an op landed BEFORE the attempt credits nothing: `KC-4`,
//        `report.ops.length == 1` — `parameter-semantics.md §2.7`; `attempt-lifecycle.md §2.4`
//        item 4's arm `(d)`.
//   `P-NEG-19` a `CommitRecord` from ANOTHER instance is refused `KC-2` and eats nothing —
//        `kernel-surface.md §2.1` item 3's `RD-9` clause (READING WRITTEN, printed below).
//   `P-NEG-20` a constraint body that throws over a COMPACTED base: the ONE `outcome` entry carries
//        `KC-8` — `composition-and-states.md §2.6` item 6 (a)'s ruling.
//   `P-NEG-22` a DELETE-shaped repair reaches arm `(d)`/`KC-4` — `parameter-semantics.md §2.7`'s
//        `observable` cell (READING WRITTEN, printed below).

import test from 'node:test';
import assert from 'node:assert/strict';

import { write as storeWrite, delete as storeDelete } from 'provident-storeroom';

import {
  kernel, makeStore, tag, KC,
  assertKernelForm, assertAttemptReport, assertSeqIncreasesFromOne,
  capture, entries, checkIds, countingListener,
} from './constraint-kernel-helpers.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-14` — THE DISCARDED HANDLE SET: EMPTY AFTER A FAILING `K-3`, STANDING AFTER A PASSING ONE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE, AT ITS ONE HOME (`attempt-lifecycle.md §2.4` item 8 (i) (5)): **where a caller-made write
 * failed the registered constraints at its landing and could not be repaired, its composition is rolled
 * back to the attempt's last valid state and the triggered set THAT WRITE RETURNED IS DISCARDED WHOLE —
 * no handle in it is delivered by either layer, and a body already run is never un-run, so the discard
 * reaches only the triggers not yet invoked.** Read with `kernel-surface.md §2.1` item 2, which is the
 * member's own observable: *"so `triggered` then stands as the store's own returned set while `pending`
 * is `[]` and no handle of that write is invoked by either layer."*
 *
 * THE DRIVE'S OWN MEMBER: an ANCESTOR plain listener's handle — a registration the store's prefix
 * selection returns for the attempt's write and which the kernel invokes in NO window of its own, so it
 * is layer (b)'s and `CommitRecord.pending` is its only work list (`§2.1` item 2; `§2.2` item 2 (ii)).
 *
 * STATES ENUMERATED FIRST: (1) the record as `K-2` returns it — the ancestor's handle stands in
 * `pending`; (2) THE FAILING ARM — `x` registers no repair, the attempt fails `KC-3`, its write is
 * rolled back and the set is discarded, so `pending` reads `[]`; (3) THE PASSING ARM WHOSE CHECKPOINT IS
 * NON-NULL — `x`'s repair lands and the re-run's landing evaluation passes at that op, so the landing
 * left every registered pair at the attempt's address passing and the checkpoint is that op
 * (`composition-and-states.md §2.6` item 8 (i)–(ii)); no discard reaches a passing attempt, so the
 * handle STILL STANDS.
 *
 * ▸ THE STORE'S OWN DELIVERY IS NOT A LAYER OF THIS UNIT AND IS NOT COUNTED AS ONE: a plain registration
 * at an ancestor address is invoked by the STORE ITSELF on every write beneath it, on both arms, and no
 * clause of this part reaches that delivery (`A: docs/specs/storeroom-js/surface.md §2.4` item 7). The
 * count is therefore read as a POSITIVE CONTROL that the registration is live, and the discard is read
 * where the clauses read it — off the record's own `pending` member, layer (b)'s only work list.
 *
 * FAIL STATES: a record whose discarded set still stands in `pending` after the failure (the defect this
 * cell exists for); a passing attempt that empties `pending` for a set the attempt never rolled back.
 *
 * ▸ AND ONE READING OF ONE MEMBER IS REPORTED AND NOT ASSERTED HERE: `composition-and-states.md §2.7`
 * item 4b's own sentence — *"a write that failed the registered constraints and was rolled back leaves
 * its set in `triggered` and in `pending` NEVER"* — read literally would empty `triggered` too, while
 * `kernel-surface.md §2.1` item 2 prints the SAME state as *"`triggered` then stands as the store's own
 * returned set"*. This cell therefore reads `pending` alone, the member both clauses agree is `[]`.
 */
test('ck_p_neg_14_the_discarded_handle_set_reads_empty_after_a_failing_attempt_and_stands_on_a_passing_one', async () => {
  const { register, commit, runAttempt, report } = await kernel();

  // ── ARM 2 FIRST, so the two arms' own addresses and handles never meet ──────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const ancestor = [tag('n14p')];
    const address = [ancestor[0], 'c'];
    storeWrite(store, ancestor, 'mem', { seed: 'the ancestor home entry stands' });
    const plain = countingListener();
    const handlePlain = store.on(ancestor, plain);
    let landed = null;
    let evaluations = 0;
    register(store, address, 'x', () => {
      evaluations += 1;
      if (evaluations === 1) {
        return {
          repair: () => {
            landed = storeWrite(store, address, 'mem', 'fixed').op;
            return { ok: true, message: 'x was repaired at the attempt\'s own address', op: landed };
          },
          message: 'x is invalid on the committed value',
        };
      }
      return true;
    });
    const record = commit(store, address, 'mem', 'broken');
    assert.equal(record.pending.includes(handlePlain), true,
      'the caller\'s own write returned the ancestor registration\'s handle and the kernel has invoked '
      + 'it in no window of its own, so it stands in `pending` — layer (b)\'s ONLY work list '
      + '(`kernel-surface.md §2.1` item 2)');
    const done = runAttempt(store, record);
    assertAttemptReport(done, 'P-NEG-14 passing arm');
    assert.equal(done.outcome, 'passed', 'the attempt resolves on the pass arm: the repair landed and the '
      + 're-run evaluated the pair at the repair\'s own op, where it passed');
    const closed = report(store, record.attempt);
    assert.equal(landed !== null && typeof landed.opId === 'string', true,
      'the repair\'s own edit landed an op through the caller\'s own verb');
    const atTheLanding = entries(closed.log, 'constraint-check').filter((e) => e.opId === landed.opId);
    assert.equal(atTheLanding.length, 1,
      'THE CHECKPOINT IS NON-NULL, AND THIS IS ITS OWN DECLARED EVIDENCE: the landing at the repair\'s op '
      + 'ran ONE pass over the ONE pair registered at the attempt\'s address, and its `constraint-check` '
      + 'entry stands in the log at that op (`composition-and-states.md §2.6` item 8 (ii) (2): "the '
      + `attempt's log carries a PASS \`constraint-check\` entry for every pair of that scope at that op")`);
    assert.equal(entries(closed.log, 'outcome').length, 0,
      'and no evaluation of that op returned a violation, so the landing left every registered pair at '
      + 'the attempt\'s address passing and the member is pinned at that op and NOT at `null` '
      + '(`composition-and-states.md §2.6` item 8 (iii))');
    assert.ok(plain.seen.length >= 1,
      'THE STORE\'S OWN DELIVERY IS NOT ONE OF THIS UNIT\'S TWO LAYERS, AND IT IS NOT COUNTED AS ONE: a '
      + 'plain registration at an ancestor address is invoked by the STORE ITSELF on every write beneath '
      + 'it (`A: docs/specs/storeroom-js/surface.md §2.4` item 7; the layers set\'s '
      + '`ck_layer_b_the_plain_store_listener_carries_the_triggering_address_as_its_one_argument`), so '
      + 'this count is the store\'s — read ' + plain.seen.length + ' — and the DISCARD is read where the '
      + 'clauses read it: off the record\'s own `pending` member');
    assert.equal(record.pending.includes(handlePlain), true,
      'AND THE HANDLE STILL STANDS: no discard reaches a passing attempt — the discard rule is the '
      + 'FAILURE arm\'s own (`attempt-lifecycle.md §2.4` item 8 (i) (5)) — read '
      + `pending.length = ${record.pending.length}`);
  }

  // ── ARM 1 — THE FAILING ATTEMPT, WHOSE SET IS DISCARDED ─────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const ancestor = [tag('n14f')];
    const address = [ancestor[0], 'c'];
    storeWrite(store, ancestor, 'mem', { seed: 'the ancestor home entry stands' });
    const plain = countingListener();
    const handlePlain = store.on(ancestor, plain);
    register(store, address, 'x', () => ({ message: 'x is invalid and registers no repair' }));
    const record = commit(store, address, 'mem', 'v');
    assert.equal(record.triggered.includes(handlePlain), true,
      'the set the caller\'s own write returned carries the ancestor registration\'s handle, so the '
      + 'discard below has a member to reach');
    assert.equal(record.pending.includes(handlePlain), true,
      'and it stands in `pending` as `K-2` returns the record');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'the attempt fails: `x` registers no repair for its violation');
    assertKernelForm(r.thrown, 'P-NEG-14 failing arm');
    assert.equal(r.thrown.status, KC[3],
      'and the arm it fails on is the first-violation arm `(c)` read with the outside-form rule — here '
      + `\`x\`'s own \`{message}\` arm — read ${JSON.stringify(r.thrown.status)}`);
    assert.ok(plain.seen.length >= 1,
      'and the store\'s own delivery reached the ancestor registration before the attempt closed — read '
      + plain.seen.length + '; the set the record carries points at a live registration');
    assert.deepEqual(record.pending, [],
      'THE DISCARD RULE\'S OWN OBSERVABLE: the set the rolled-back write returned is DISCARDED rather '
      + 'than carried, "so `triggered` then stands as the store\'s own returned set while `pending` is '
      + '`[]`" (`kernel-surface.md §2.1` item 2; `attempt-lifecycle.md §2.4` item 8 (i) (5)) — and `pending` '
      + 'is layer (b)\'s ONLY WORK LIST, the member the caller\'s own loop runs off, so a record that '
      + 'still carries the handle hands a discarded set to a loop that must not run it — read '
      + `pending.length = ${record.pending.length}`);
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-15` — A PAIR REGISTERED MID-PASS JOINS NO PASS AND APPENDS NO ENTRY IN IT
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`attempt-lifecycle.md §2.4` item 5 (iv), read with `CX-12`): **a pass's evaluated set is
 * EVERY PAIR STANDING AT THE ATTEMPT'S OWN ADDRESS WHEN THAT PASS BEGINS — a snapshot taken at the
 * pass's start — each evaluated ONCE in clause (ii)'s first-registration order, with NO EXCLUSION and
 * NO SKIP; and a pair registered DURING a pass is carried into the NEXT pass's set and appends NO
 * `constraint-check` entry of the pass it was registered in** (`kernel-surface.md §2.5` item 1's
 * `constraint-check` row: one entry per evaluation, and an evaluation this pass never ran appends none).
 * **The `K-1` that returns DURING a pass is ADMITTED** (`§2.4` item 8 (ii) (c)), so the drive is lawful.
 *
 * STATES ENUMERATED FIRST: (1) pair `a` alone at the pass's start, its body registering pair `b` at the
 * attempt's address MID-PASS and returning the pass arm; (2) the pass's own snapshot — `a` alone, so
 * `checkIds == ['a']` and `b`'s body runs ZERO times in it; (3) the attempt's outcome — `passed`, `b`'s
 * violation being no arm of this attempt; (4) THE POSITIVE CONTROL — the pair DOES stand in the
 * registry, so the next attempt at that address evaluates it (`checkIds == ['a', 'b']`).
 *
 * FAIL STATES: a pass that re-reads its own registry and evaluates the pair it registered mid-pass
 * (`checkIds` carrying `b`, `b`'s body running, and the attempt failing on `b`'s violation); a `K-1`
 * whose mid-pass registration is dropped rather than carried into the registry (the positive control's
 * own fail state).
 */
test('ck_p_neg_15_a_pair_registered_mid_pass_joins_no_pass_and_appends_no_entry_in_it', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n15')];
  let aRuns = 0;
  let bRuns = 0;
  let bHandle = null;
  register(store, address, 'a', () => {
    aRuns += 1;
    if (aRuns === 1) {
      bHandle = register(store, address, 'b', () => {
        bRuns += 1;
        return { message: 'b is invalid on this value' };
      });
    }
    return true;
  });
  const record = commit(store, address, 'mem', 'v');
  const first = capture(() => runAttempt(store, record));
  assert.equal(first.threw, false,
    'THE ATTEMPT RESOLVES ON THE PASS ARM: the pass evaluated the snapshot taken at its start, and the '
    + 'pair registered during it is no arm of this attempt — a kernel that re-read its own registry '
    + 'mid-pass has evaluated `b` inside this pass and failed the attempt on `b`\'s violation — read '
    + (first.threw ? JSON.stringify(first.thrown.status) + ' / ' + JSON.stringify(first.thrown.message)
      : JSON.stringify(first.value.outcome)));
  const done = first.value;
  assert.equal(aRuns, 1, 'the pass evaluated `a` exactly once');
  assert.equal(bHandle !== null && bHandle !== undefined, true,
    'the mid-pass `K-1` was ADMITTED and answered the store\'s own adopted handle for that address '
    + '(`attempt-lifecycle.md §2.4` item 8 (ii) (c); `kernel-surface.md §2.1` item 1)');
  assert.deepEqual(checkIds(done.log), ['a'],
    'THE PASS\'S EVALUATED SET IS THE SNAPSHOT TAKEN WHEN THE PASS BEGAN: `b` was registered during it, so '
    + '`b` appends NO `constraint-check` entry of this pass — read ' + JSON.stringify(checkIds(done.log))
    + ' (`§2.4` item 5 (iv); `CX-12`)');
  assert.equal(bRuns, 0,
    'and `b`\'s body ran ZERO times in that pass — read ' + bRuns
    + '; a pass that evaluated it has re-read its own registry mid-pass');
  assert.equal(done.outcome, 'passed',
    'the attempt resolves on the pass arm: `b`\'s `{message}` violation is no arm of THIS attempt, whose '
    + 'evaluated set is the snapshot — read ' + JSON.stringify(done.outcome));
  assert.equal(entries(done.log, 'outcome').length, 0,
    'and a passing attempt appends no `outcome` entry (`kernel-surface.md §2.5` item 1)');

  // ── THE POSITIVE CONTROL: the pair STANDS, and the NEXT attempt at that address evaluates it ────
  const second = capture(() => runAttempt(store, commit(store, address, 'mem', 'v2')));
  assert.equal(second.threw, true,
    'and the pair the mid-pass `K-1` registered DOES stand in the registry: the next attempt at that '
    + 'address meets it and fails');
  assert.equal(second.thrown.status, KC[3],
    'on the first-violation arm `(c)`, `b` registering no repair — read '
    + JSON.stringify(second.thrown.status));
  assert.deepEqual(checkIds(second.thrown.log), ['a', 'b'],
    'the next pass evaluated BOTH pairs, in first-registration order (`§2.4` item 5 (ii)) — read '
    + JSON.stringify(checkIds(second.thrown.log)));
  assert.equal(bRuns, 1, 'and `b`\'s body has run ONCE in the instance\'s life — in the second pass and '
    + 'in no part of the first');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-16` — THE ARM IS TAKEN AT THE FIRST VIOLATING PAIR, WHATEVER ITS FORM
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`attempt-lifecycle.md §2.4` item 4's arm `(c)` read with item 5 (ii)): **a value OUTSIDE
 * `ConstraintOutcome`'s three declared arms is READ AS the `{message}` arm and never as an arm of its
 * own, so the pair's own `(c)` predicate holds for it exactly as it holds for a `{message}` return; and
 * "the attempt TRANSITIONS at THE FIRST evaluating pair whose outcome is a violation — that pair's own
 * arm decides what happens next", so a LATER pair of the same pass is NOT evaluated** (`§2.4` item 5
 * (iii): *"where two pairs of one pass would violate, the FIRST in clause (ii)'s order decides and THE
 * SECOND IS NOT EVALUATED"*). **The transition is taken at the pair that violated FIRST and never at a
 * later pair's registered repair**, so a pass whose first pair returned an outside form reaches `KC-3`
 * whatever the pairs behind it carry.
 *
 * STATES ENUMERATED FIRST: (1) pair `a`, registered first, returning the OUTSIDE form `undefined` on its
 * first evaluation; (2) pair `b`, registered later, carrying a REPAIR that lands a lawful op; (3) the
 * pass's transition — taken at `a`, so `checkIds == ['a']`, `b`'s body runs ZERO times, its repair runs
 * ZERO times, and the thrown form's status is `KC-3`; (4) the one `outcome` entry, whose `state` is the
 * same `KC-3` token.
 *
 * FAIL STATES: an outside form carried to the end of the pass so that a later pair is evaluated (the
 * defect this cell exists for — `b`'s body running, its repair landing, and the arm becoming the
 * repeat/`KC-5` arm of a re-run); an outside form routed to an arm of its own rather than `(c)`; a
 * second pair evaluated after the transition.
 */
test('ck_p_neg_16_the_outside_form_decides_at_the_first_violating_pair_whatever_its_form', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n16')];
  let bRuns = 0;
  let bRepairs = 0;
  register(store, address, 'a', () => undefined);
  register(store, address, 'b', () => {
    bRuns += 1;
    return {
      repair: () => {
        bRepairs += 1;
        const landed = storeWrite(store, address, 'mem', 'fixed').op;
        return { ok: true, message: 'b was repaired', op: landed };
      },
      message: 'b is invalid on this value',
    };
  });
  const record = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, record));
  assert.equal(bRuns, 0,
    'THE TRANSITION IS TAKEN AT THE FIRST VIOLATING PAIR: `a` returned a value outside the three '
    + 'declared arms, which is READ AS its `{message}` arm and is a violation, so `b` — the SECOND pair '
    + `of the pass — is "NOT EVALUATED" and its body runs ZERO times — read ${bRuns} `
    + '(`attempt-lifecycle.md §2.4` items 4 (c) and 5 (ii)–(iii))');
  assert.equal(bRepairs, 0, 'and its registered repair runs ZERO times — read ' + bRepairs
    + '; a drive that reached it has read the outside form as a form the pass may carry to its end');
  assert.equal(r.threw, true, 'the attempt fails at `a`');
  assertKernelForm(r.thrown, 'P-NEG-16');
  assert.equal(r.thrown.status, KC[3],
    'and the arm is `(c)` — `KC-3` — `a` being not in `ran` before its evaluation and carrying no '
    + 'repair: read ' + JSON.stringify(r.thrown.status) + '; the arm a later pair\'s repair would move '
    + 'the attempt to is the re-run\'s own and not this one');
  assert.deepEqual(checkIds(r.thrown.log), ['a'],
    'and the log carries ONE `constraint-check` entry, `a`\'s — read '
    + JSON.stringify(checkIds(r.thrown.log)));
  const outcomes = entries(r.thrown.log, 'outcome');
  assert.equal(outcomes.length, 1, 'and the closure writes ONE `outcome` entry');
  assert.equal(outcomes[0].state, KC[3],
    'whose `state` is the same `KC-3` token the thrown form\'s `status` carries (`fail-surface.md §1.1` '
    + 'item 1 (c)) — read ' + JSON.stringify(outcomes[0].state));
  assertSeqIncreasesFromOne(r.thrown.log, 'P-NEG-16 log');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-17` — `repair-run`'s `opId` ON ARM `(d)`: THE OP THE ENTRY WAS INVOKED FOR
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`kernel-surface.md §2.5` item 1's kind table, the `repair-run` row): **`repair-run`'s
 * `opId` is "the op the repair produced where it produced one, ELSE THE OP IT WAS INVOKED FOR"** — and on
 * arm `(d)` the repair produces none, so the entry names the op the pair's evaluation carried: the
 * attempt's own first write's op on the pass that reached it (`attempt-lifecycle.md §2.4` item 4's arm
 * `(d)`; item 3's A110 clause, whose seam reads the op off the repair's own return and nowhere else).
 * **The entry is appended BEFORE the arm's terminal act on BOTH of arm `(d)`'s printed forms** (`§2.4`
 * item 8 (i) (2)).
 *
 * STATES ENUMERATED FIRST: (1) arm `(d)` reached through an `{ok: false, message}` return — the repair's
 * own text carried WHOLE into the entry's `message`, the caller receiving the kernel's `KC-4` form;
 * (2) arm `(d)` reached through a repair BODY that THROWS — the caller receiving the body's own throwable
 * unchanged and the closed record's `outcome` entry carrying `KC-4`'s token
 * (`composition-and-states.md §2.7` item 13); (3) on both, the ONE `repair-run` entry of that attempt.
 *
 * FAIL STATES: a `repair-run` entry whose `opId` is `null` on arm `(d)` — the state the assertion this
 * cell replaces tolerated; an entry naming the op the repair produced where it produced none; an entry
 * appended only on the returning arm.
 */
test('ck_p_neg_17_the_repair_run_entry_names_the_op_it_was_invoked_for_on_both_arm_d_arms', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const arms = [];

  // ── ARM 1 — `{ok: false, message}` ──────────────────────────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const address = [tag('n17a')];
    register(store, address, 'x', () => ({
      repair: () => ({ ok: false, message: 'the repair attempted a rewrite of the value' }),
      message: 'x is invalid on the committed value',
    }));
    const record = commit(store, address, 'mem', 'broken');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'arm 1: the attempt fails');
    assertKernelForm(r.thrown, 'P-NEG-17 arm 1');
    assert.equal(r.thrown.status, KC[4], 'arm 1: `KC-4` — read ' + JSON.stringify(r.thrown.status));
    arms.push({
      arm: 'the `{ok: false, message}` arm',
      record,
      log: r.thrown.log,
      carried: 'the repair attempted a rewrite of the value',
    });
  }

  // ── ARM 2 — THE REPAIR BODY THROWS ──────────────────────────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const address = [tag('n17b')];
    const fromTheBody = { fromTheRepairBody: true };
    register(store, address, 'x', () => ({
      repair: () => { throw fromTheBody; },
      message: 'x is invalid on the committed value',
    }));
    const record = commit(store, address, 'mem', 'broken');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'arm 2: the attempt ends at the body\'s throw');
    assert.equal(r.thrown, fromTheBody,
      'arm 2: THE BODY\'S OWN THROWABLE reaches the caller UNCHANGED and UNCONVERTED — no kernel form is '
      + 'minted for a body that threw (`composition-and-states.md §2.7` item 13; `PAR-C-6`)');
    const closed = report(store, record.attempt);
    assertAttemptReport(closed, 'P-NEG-17 arm 2 closed record');
    assert.equal(entries(closed.log, 'outcome')[0].state, KC[4],
      'and the closed record\'s ONE `outcome` entry carries `KC-4`\'s token — the repair-body path\'s own '
      + 'declared member (`§2.7` item 13) — read '
      + JSON.stringify(entries(closed.log, 'outcome')[0].state));
    arms.push({ arm: 'the throwing repair body', record, log: closed.log, carried: null });
  }

  for (const { arm, record, log, carried } of arms) {
    const runs = entries(log, 'repair-run');
    assert.equal(runs.length, 1,
      `${arm}: the pair's repair ran once and its \`repair-run\` entry IS appended on arm (d) `
      + '(`attempt-lifecycle.md §2.4` item 8 (i) (2))');
    assert.equal(runs[0].opId, record.op.opId,
      `${arm}: the entry's \`opId\` IS "the op the repair produced where it produced one, ELSE THE OP IT `
      + 'WAS INVOKED FOR" — this repair produced none, so the entry names the op the pair\'s evaluation '
      + `carried, the attempt's own first write's op — read ${JSON.stringify(runs[0].opId)} against `
      + `${JSON.stringify(record.op.opId)} (\`kernel-surface.md §2.5\` item 1's \`repair-run\` row)`);
    assert.equal(runs[0].state, null,
      `${arm}: and \`state\` stays \`null\` on this kind — read ${JSON.stringify(runs[0].state)}`);
    assert.equal(runs[0].id, 'x', `${arm}: the entry names the constraint's own bare id`);
    if (carried !== null) {
      assert.equal(runs[0].message, carried,
        `${arm}: and the \`message\` carries the repair's own "what was ATTEMPTED" WHOLE `
        + '(`kernel-surface.md §2.5` item 1\'s message table, the `repair-run` row)');
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-18` — A REPAIR NAMING AN OP LANDED BEFORE THE ATTEMPT CREDITS NOTHING AND IS `KC-4`
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`parameter-semantics.md §2.7`, the seam's ONE home): **`op` IS THE OP THE REPAIR'S OWN
 * EDIT LANDED — the store's own `write` return's value, the ONE channel the kernel reads it off — and
 * "AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined`, OR NOT THE OP THE REPAIR ACTUALLY LANDED
 * IS THE APP'S OWN DEFECT AND NOT A KERNEL STATE OF ITS OWN: THE KERNEL CREDITS NO OP, THE ATTEMPT TAKES
 * ARM `(d)` AND FAILS `KC-4`, its `repair-run` entry is appended, and the kernel's own generated
 * sentence NAMES THE UNRECOGNIZED OR UNLANDED `op`"** (`attempt-lifecycle.md §2.4` item 4's arm `(d)`).
 *
 * THE DRIVE'S OWN STATE: an op that landed BEFORE the attempt — a caller-made write at the attempt's own
 * address, so the identity the repair names is a REAL op of the store and of the same address, and the
 * ONLY thing that makes it unlanded is that THE ATTEMPT DID NOT CREATE IT.
 *
 * STATES ENUMERATED FIRST: (1) the pre-attempt write's op, standing in no member of the attempt's `ops`;
 * (2) the repair's own edit, landing ITS OWN op — which the repair does NOT name; (3) the repair's return,
 * naming the PRE-ATTEMPT op; (4) the arm — `(d)`, `KC-4`, the kernel's sentence naming that id;
 * (5) the report's `ops` — the attempt's own first write, and NOT the named op.
 *
 * FAIL STATES: an attempt that CREDITS the foreign op (the defect this cell exists for — `ops` growing to
 * two, the pair entering `appliedRepairs` and the attempt re-evaluating at a landing it never made); an
 * arm other than `(d)`; a kernel sentence that names nothing of the return it refused.
 */
test('ck_p_neg_18_a_repair_naming_a_pre_attempt_op_credits_nothing_and_is_KC4', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n18')];
  // (1) THE FOREIGN OP: a write that landed BEFORE the attempt, at the attempt's own address.
  const before = storeWrite(store, address, 'mem', 'before').op;
  let repairedOp = null;
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          // (2) THE REPAIR'S OWN EDIT LANDS — and its own op is NOT the one it names below.
          repairedOp = storeWrite(store, address, 'mem', 'fixed').op;
          // (3) THE IDENTITY IT NAMES IS THE PRE-ATTEMPT OP.
          return { ok: true, message: 'x was repaired', op: before };
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const record = commit(store, address, 'mem', 'broken');
  assert.equal(repairedOp, null, 'the drive has run no repair yet');
  const r = capture(() => runAttempt(store, record));
  assert.equal(repairedOp !== null && repairedOp.opId !== before.opId, true,
    'the drive\'s own two identities are TWO: the op this repair landed and the op it named are '
    + `different ops — read ${JSON.stringify(repairedOp && repairedOp.opId)} against `
    + `${JSON.stringify(before.opId)}`);
  assert.equal(record.op.opId !== before.opId, true,
    'and the commit\'s own write is a SECOND op at that address, distinct from the pre-attempt op the '
    + 'repair will name — the two identities of this drive are two ops of one store');
  assert.equal(r.threw, true,
    'the repair named an op it did not land — an op the attempt never created — so the attempt fails');
  assertKernelForm(r.thrown, 'P-NEG-18');
  assert.equal(r.thrown.status, KC[4],
    'AND THE ARM IS `(d)`: a return naming an op the repair did not land "is the app\'s own defect ... '
    + 'the kernel credits no op, the attempt takes arm (d) and fails KC-4" — read '
    + JSON.stringify(r.thrown.status) + ' (`parameter-semantics.md §2.7`, its `observable` cell)');
  assert.equal(r.thrown.message.includes(before.opId), true,
    'and the kernel\'s own generated sentence NAMES the unlanded op it refused — read '
    + JSON.stringify(r.thrown.message) + ` for ${JSON.stringify(before.opId)}`);
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'P-NEG-18 closed record');
  assert.equal(closed.ops.length, 1,
    'AND NO FOREIGN LANDING IS CREDITED: `ops` carries the ONE op the attempt itself created — read '
    + `\`ops.length\` = ${closed.ops.length}; the arm-(d) proof must exclude a landing this attempt never `
    + 'made, and a credit is what would move the pair into `appliedRepairs` and the attempt into a '
    + 're-evaluation at an op of the attempt\'s own past');
  assert.equal(closed.ops[0].opId, record.op.opId,
    'and that one op is the op the commit record carries — read '
    + JSON.stringify(closed.ops[0].opId) + ' against ' + JSON.stringify(record.op.opId));
  assert.equal(closed.ops.some((o) => o.opId === before.opId), false,
    'the pre-attempt op stands in NO member of `ops`, in no order and under no spelling');
  assert.equal(entries(closed.log, 'outcome')[0].state, KC[4],
    'and the closed record\'s ONE `outcome` entry carries the same `KC-4` token the thrown form does');
  assert.equal(entries(closed.log, 'repair-run').length, 1,
    'and its `repair-run` entry was appended, as arm (d) owes');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-19` — A `CommitRecord` FROM ANOTHER INSTANCE: REFUSED `KC-2`, AND NOTHING IS EATEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`kernel-surface.md §2.1` item 3's `RD-9` clause): **a `K-3` whose `CommitRecord.attempt`
 * names a CLOSED attempt — one its own terminal arm already disposed of, so the kernel's registry holds
 * no attempt for it — OR AN UNKNOWN attempt is REFUSED WITH `KC-2` (`ConstraintArgRefused`), and NOT with
 * `KC-7`; NO STATE MOVES AND NO ENTRY IS APPENDED.** **And `§2.1` item 4's unconstrained-argument clause —
 * "for `K-4` and `K-5` the argument is NEITHER VALIDATED NOR READ" — is declared for THE TWO READERS
 * ALONE and is not extended to `K-3`, whose first position IS read: the kernel reaches the store through
 * it** (cited, neither re-derived nor widened here).
 *
 * ▸ THE READING THIS CELL IS WRITTEN AGAINST, NAMED BECAUSE THE SPEC WRITER HAS NOT RULED THE
 * FOREIGN-INSTANCE `K-3` BY NAME AND BOTH READINGS STAND: **(a) WRITTEN HERE** — the record names an
 * attempt THE KERNEL INSTANCE THAT WAS HANDED THE RECORD holds none for (the `AttemptRef` is minted
 * per kernel instance, `attempt-lifecycle.md §2.4` item 1), so the call is the `RD-9` refusal: `KC-2`,
 * no state moved, and the caller's attempt still the caller's to run from its own instance. **(b) NOT
 * ASSERTED** — the run is accepted, so the attempt is consumed and its address is not left `KC-7` for
 * the instance's life. The two readings are MUTUALLY EXCLUSIVE on the fresh-`K-2` observable: reading (a)
 * leaves the attempt OPEN and its address held, reading (b) does not. This cell asserts (a).
 *
 * STATES ENUMERATED FIRST: (1) an OPEN attempt at instance A, its pair passing, its record held by the
 * caller; (2) a SECOND instance B, holding no attempt at all; (3) THE FOREIGN CALL — `runAttempt(B, record
 * of A)`: refused `KC-2`, with NO pass run over the record and no entry appended anywhere; (4) THE
 * CALLER'S OWN RUN — `runAttempt(A, record)` still reaches A's terminal arm, the pair evaluated ONCE and
 * by that run alone; (5) AFTER IT, A's address answers a fresh `K-2`, its registry entry removed by its
 * own terminal act (`§2.4` item 3; `composition-and-states.md §2.7` item 13).
 *
 * FAIL STATES: a foreign record that RUNS the attempt against the other instance (the defect this cell
 * exists for — the attempt eaten, so the caller's own `K-3` then meets `KC-2`, and A's address left
 * `KC-7` for the instance's life because the terminal act freed the WRONG kernel's entry); a refusal
 * carrying `KC-7` or a store member; a refusal that moved the caller's attempt.
 */
test('ck_p_neg_19_a_commit_record_from_another_instance_is_refused_KC2_and_eats_nothing', async () => {
  const { register, commit, runAttempt } = await kernel();
  const storeA = makeStore({ journalLength: 16 });
  const storeB = makeStore({ journalLength: 16 });
  const address = [tag('n19')];
  let runs = 0;
  register(storeA, address, 'x', () => { runs += 1; return true; });
  const recordA = commit(storeA, address, 'mem', 'v');
  assert.equal(runs, 0, 'no pass has run: `K-2` opens the attempt and evaluates nothing');

  // ── (3) THE FOREIGN CALL ─────────────────────────────────────────────────────────────────────────
  const foreign = capture(() => runAttempt(storeB, recordA));
  assert.equal(foreign.threw, true,
    'READING (a): the record names an attempt the kernel instance handed the record holds none for, so '
    + 'the call is refused — read `threw` = ' + foreign.threw);
  assertKernelForm(foreign.thrown, 'P-NEG-19 foreign K-3');
  assert.equal(foreign.thrown.status, KC[2],
    'and the refusal is `KC-2` (`ConstraintArgRefused`) and never `KC-7`, whose `K-3` site is the '
    + 'RE-ENTRANT call for a LIVE attempt (`kernel-surface.md §2.1` item 3\'s `RD-9` clause) — read '
    + JSON.stringify(foreign.thrown.status));
  assert.equal(runs, 0,
    'AND NO STATE MOVED: no pass ran over the record — read the pair\'s own evaluation count ' + runs
    + '; a foreign run that evaluated the pair has reached instance A\'s attempt through the wrong handle');
  assert.deepEqual(entries(foreign.thrown.log, 'commit'), [],
    'and no entry was appended anywhere: the refusal\'s own log is empty (`RD-9`: "NO STATE MOVES AND NO '
    + 'ENTRY IS APPENDED") — read ' + foreign.thrown.log.length + ' entries');

  // ── (4) THE CALLER'S OWN RUN ─────────────────────────────────────────────────────────────────────
  const own = capture(() => runAttempt(storeA, recordA));
  assert.equal(own.threw, false,
    'AND THE CALLER\'S OWN ATTEMPT IS STILL THE CALLER\'S: `K-3` over its own instance reaches its '
    + 'terminal arm — read `threw` = ' + own.threw
    + '; a `KC-2` here is a foreign call that CONSUMED an attempt it did not own');
  assertAttemptReport(own.value, 'P-NEG-19 the caller\'s own run');
  assert.equal(own.value.outcome, 'passed', 'and its arm is the pass arm — read '
    + JSON.stringify(own.value.outcome));
  assert.equal(runs, 1,
    'the pair was evaluated ONCE in the instance\'s life, by the caller\'s own run and by no foreign one '
    + '— read ' + runs);

  // ── (5) THE ADDRESS IS NOT LEFT `KC-7` FOR THE INSTANCE'S LIFE ───────────────────────────────────
  const after = capture(() => commit(storeA, address, 'mem', 'after'));
  assert.equal(after.threw, false,
    'and store A\'s address is not left `KC-7` for the instance\'s life: the attempt\'s OWN terminal act '
    + 'removed the entry that held it (`attempt-lifecycle.md §2.4` item 3; `composition-and-states.md '
    + '§2.7` item 13) — read `threw` = ' + after.threw
    + (after.threw ? ' with status ' + JSON.stringify(after.thrown.status) : ''));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-20` — A THROWING BODY OVER A COMPACTED BASE: THE ONE `outcome` ENTRY CARRIES `KC-8`
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`composition-and-states.md §2.6` item 6 (a), whose own sentence RULES this case once):
 * **"AND WHICH CLAUSE GOVERNS THE ENTRY'S `state` WHERE THE ATTEMPT'S OWN BODY THREW *AND* THE
 * COMPOSITION MET THE FLOOR IS RULED HERE, ONCE ... THE FLOOR GOVERNS — this clause's rule is applied to
 * EVERY path on which the attempt's own composition meets the floor, INCLUDING EACH OF THE TWO
 * BODY-THROW PATHS ... SO ON THE CONSTRAINT-BODY PATH THE ENTRY'S `state` IS `KC-8` AND NOT `null`, that
 * path's `null` arm standing WHERE THE COMPOSITION MEETS NO FLOOR"** — read with item 5 (b)'s guard and
 * with `kernel-surface.md §2.5` item 1's `state` row. **The ruling IS ON DISK at that clause's own
 * bytes; a cell written against `composition-and-states.md §2.7` item 13's `null` alone would be the
 * reading this clause WITHDRAWS by name where the floor is met** (`RE-6`; `RD-7`; `RD-8`; `S7`).
 *
 * THE DRIVE: a journal base COMPACTED under the attempt (`StoreConfig.journalLength` small, six seeded
 * writes past it — the same store-state condition `constraint-kernel-states.test.mjs`'s `ck_neg_3`
 * pins), an attempt whose own commit op lies past that base, and a constraint body that THROWS.
 *
 * STATES ENUMERATED FIRST: (1) the compacted base and the attempt's own op standing on it; (2) the
 * constraint body's THROW on the first evaluation, no `constraint-check` entry retained and the body's
 * own throwable reaching the caller; (3) the composition, whose call over the still-owed op meets
 * `RollbackCompacted` — ONE step with `failed: true` and the store's own code in `answer`;
 * (4) THE ONE `outcome` ENTRY, its `state` `KC-8` and its `message` naming the store's own
 * `RollbackCompacted` as the store's answer (`§2.6` item 6 (a)).
 *
 * FAIL STATES: an `outcome` entry left at `null` on this path (the withdrawn reading); a SECOND
 * `outcome` entry appended for the floor; a floor answered by the violation arm's own token.
 *
 * ▸ AND ONE MEMBER THIS CELL DOES NOT READ, WITH ITS TWO READINGS NAMED BECAUSE THE SPEC IS INTERNALLY
 * INCONSISTENT ON IT AND THE SUPERVISOR OF THIS PASS HAS NOT RULED IT: THE CALLER'S OWN CHANNEL.
 * `composition-and-states.md §2.6` item 6 (b) says the kernel THROWS ITS OWN FORM with `KC-8` carrying
 * the attempt's own log, while `attempt-lifecycle.md §2.4` item 8 (i) says *"what the caller receives
 * where the composition meets the floor on that path: THE BODY'S OWN THROWABLE AND NOTHING ELSE"*. The
 * two cannot both hold on one path, so this cell asserts NOTHING about `r.thrown` and reads the ruled
 * member — the `outcome` entry's `state` — off the closed record `K-5` returns.
 */
test('ck_p_neg_20_a_throwing_body_over_a_compacted_base_leaves_the_one_outcome_entry_at_KC8', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 2 });
  const address = [tag('n20')];
  for (let i = 0; i < 6; i += 1) storeWrite(store, address, 'mem', `seed-${i}`);
  const fromTheBody = { fromTheConstraintBody: true };
  register(store, address, 'x', () => { throw fromTheBody; });
  const record = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the attempt ends at the body\'s throw');
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'P-NEG-20 closed record');
  assert.equal(closed.outcome, 'failed', 'and its terminal record answers the failed arm — read '
    + JSON.stringify(closed.outcome));
  const failed = closed.rollback.filter((s) => s.failed === true);
  assert.equal(failed.length, 1,
    'THE DRIVE REACHED THE FLOOR: ONE per-op call carries `failed: true` — read ' + failed.length
    + '; where it is 0 the drive did not reach the compacted base and this cell cannot speak');
  const outcomes = entries(closed.log, 'outcome');
  assert.equal(outcomes.length, 1,
    'AND THE ATTEMPT HAS ONE `outcome` ENTRY: the floor "is answered in that same one entry ... and NO '
    + 'SECOND ENTRY IS APPENDED" — read ' + outcomes.length + ' (`§2.6` item 6 (a))');
  assert.equal(outcomes[0].state, KC[8],
    'THE RULED MEMBER: on the CONSTRAINT-body path the entry\'s `state` IS `KC-8` and NOT `null` where the '
    + 'composition met the floor — read ' + JSON.stringify(outcomes[0].state)
    + '; `composition-and-states.md §2.6` item 6 (a) rules this case once and by name, and its `null` arm '
    + 'stands only where the composition meets NO floor');
  assert.equal(outcomes[0].message.includes('RollbackCompacted'), true,
    'and its `message` NAMES the store\'s own `RollbackCompacted` as the STORE\'S answer — read '
    + JSON.stringify(outcomes[0].message) + ' (`§2.6` item 6 (a); `kernel-surface.md §2.5` item 1\'s '
    + 'message table, the `outcome` row)');
  assert.equal(outcomes[0].id, null, 'and the entry names no constraint: its `id` is `null`');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-22` — A DELETE-SHAPED REPAIR REACHES ARM `(d)`: THE DELETE RECORD CARRIES NO OP
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`parameter-semantics.md §2.7`'s `observable` cell, the seam's ONE home, read with
 * `§2.8`'s): **"a repair whose `delete` REMOVED VERSIONS and whose attempt arm is STILL `KC-4`, because
 * the `DeleteReceipt` carries no op member; a repair whose `delete` REMOVED NOTHING, which returns NO op
 * and fails `KC-4`"** — and the shape's own sentence: **`op` IS "the store's own `write` return's value",
 * the ONE carrier, so a repair whose edit landed by the store's own `delete` has NO op to carry and its
 * return has carried none at all** (`attempt-lifecycle.md §2.4` item 4's arm `(d)`: *"the kernel credits
 * no op, the attempt takes arm `(d)` and fails `KC-4`"*). **A `write` that lands an UNCHANGED value DOES
 * return an op and is credited; a `delete` does not, on either arm** (`§2.7`'s own two arms; `RC-1`).
 *
 * ▸ THE READING THIS CELL IS WRITTEN AGAINST, NAMED BECAUSE THE HEADLINE THIS GENERATOR WAS TASKED WITH
 * (`"the arm is NOT (d)/KC-4 ONCE the spec writer names the delete route's op carrier"`) IS CONDITIONAL
 * ON A RULING THAT IS NOT ON DISK — no `DR-9` row stands anywhere in `docs/` — WHILE THE CLAUSE AS
 * PRINTED RULES THE DELETE ROUTE BY NAME AND IN THE OPPOSITE DIRECTION: **STILL `KC-4`**. So this cell is
 * written THE PRINTED WAY, asserting that arm `(d)` IS REACHED, and it INVERTS to the task's other
 * wording on the day a ruling names a delete op carrier.
 *
 * STATES ENUMERATED FIRST: (1) versions standing at the attempt's address before the attempt; (2) the
 * repair's own `delete`, WHICH LANDS — its record naming the tier the removed versions stood on;
 * (3) the delete's record — THREE members, `{address, tiers, triggered}`, and NO `op` member;
 * (4) the arm — `(d)`, `KC-4`, one `repair-run` entry and one `outcome` entry; (5) the report's `ops` —
 * the attempt's own first write alone.
 *
 * FAIL STATES: a delete-shaped repair CREDITED with an op (the reading a delete op carrier would land);
 * an arm other than `(d)`; a `repair-run` entry omitted; an op credited off a record that carries none.
 */
test('ck_p_neg_22_a_delete_shaped_repair_reaches_arm_d_KC4_because_the_delete_record_carries_no_op', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n22')];
  storeWrite(store, address, 'mem', 'one');
  let removed = null;
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          // THE EDIT LANDS — THE STORE'S OWN `delete` REMOVES THE VERSIONS THE ADDRESS NAMES.
          removed = storeDelete(store, address);
          return { ok: true, message: 'x was repaired by removing the versions at the address' };
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const record = commit(store, address, 'mem', 'two');
  const r = capture(() => runAttempt(store, record));
  assert.equal(removed !== null, true,
    'the repair\'s own `delete` RETURNED — a delete at an address that holds no versions is the store\'s '
    + 'own refusal, so a returned record IS the removal having landed');
  assert.deepEqual(Object.keys(removed).sort(), ['address', 'tiers', 'triggered'],
    'and THE PIVOT OF THIS CELL: the store\'s own delete record is those THREE members — read '
    + JSON.stringify(Object.keys(removed).sort()) + ' (`A: bindings/js/index.d.ts`: `DeleteRecord`)');
  assert.equal('op' in removed, false,
    'A DELETE NEVER RETURNS AN OP ON EITHER ARM — the `DeleteReceipt` carries no op member (`RC-1`) — so a '
    + 'repair whose edit landed by the store\'s own `delete` has no op it can name, the seam\'s ONE '
    + 'carrier being "the store\'s own `write` return\'s value" (`parameter-semantics.md §2.7`)');
  assert.deepEqual(removed.tiers, ['mem'],
    'and the record names the tier the removed versions stood on — read ' + JSON.stringify(removed.tiers));
  assert.equal(r.threw, true, 'so the attempt fails');
  assertKernelForm(r.thrown, 'P-NEG-22');
  assert.equal(r.thrown.status, KC[4],
    'AND THE ARM IS `(d)`: "a repair whose `delete` REMOVED VERSIONS ... its attempt arm is STILL `KC-4`, '
    + 'because the `DeleteReceipt` carries no op member" — read ' + JSON.stringify(r.thrown.status)
    + ' (`parameter-semantics.md §2.7`\'s `observable` cell)');
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'P-NEG-22 closed record');
  assert.equal(closed.ops.length, 1,
    'and NO OP IS CREDITED for the delete: `ops` carries the ONE op the attempt itself created — read '
    + '`ops.length` = ' + closed.ops.length);
  assert.equal(closed.ops[0].opId, record.op.opId,
    'that one op being the attempt\'s own commit write — read ' + JSON.stringify(closed.ops[0].opId));
  assert.equal(entries(closed.log, 'repair-run').length, 1,
    'and its `repair-run` entry was appended, as arm (d) owes (`attempt-lifecycle.md §2.4` item 8 (i) (2))');
  assert.equal(entries(closed.log, 'outcome').length, 1, 'and its ONE `outcome` entry stands');
  assert.equal(entries(closed.log, 'outcome')[0].state, KC[4],
    'carrying `KC-4`\'s token — read ' + JSON.stringify(entries(closed.log, 'outcome')[0].state));
});
