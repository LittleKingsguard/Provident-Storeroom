// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RESTART'S CONSUMER IS THE PASS'S OWN COMMIT SCOPE — `D-42` CONSUMED WHERE `D-44` PUT THE SCOPE.
//
// **THE THREAD, AS THE LAST PASS NAMED IT, AND AS IT NOW CLOSES.** `D-44` gave every check an open commit —
// `kernel-attempt.mjs`'s `runAttempt` runs its pass inside `state.mjs`'s commit scope, so the state *"a pass
// driven by hand, `open=0`/`live=1`"* no longer exists — **and did no more.** The RESTART's request was still
// consumed by `constraintWrite`'s frame, so **a constraint body's `rollback` inside a directly driven `K-2`/`K-3`
// was neither judged at its instant nor restarted**: the pair was asked `[9, 7]` and **never at `5`**, and the
// request died with its window by the epoch rule. **`D-44`'s own terms declared the cure it did not build**:
// *"If every check has a commit, every request has a consumer, and the consumer stops being a property of one
// call site."* **THE REQUEST IS A STORE-SIDE FACT, SO ITS CONSUMER IS THE STORE'S OWN COMMIT SCOPE — ONE
// MECHANISM, NOT TWO.**
//
// **WHAT EACH ARM PROVES.**
//   (1) THE EXACT THREAD — a constraint body issuing a violating `rollback` INSIDE a directly driven `K-2`/`K-3`:
//       the reversal still answers its declared record (`D-40`'s gate: the step is not judged as a step), **THE
//       PAIR IS ASKED AT THE STATE THE ACTION LEFT (`5`)**, **THE REPORT SAYS THE RESTARTED PASS REFUSED**
//       (`outcome` `'failed'` and one `constraint-check` entry in `log` naming the pair and the undoing), the
//       store is restored to the journal's head, and `K-5` answers the same report to a driver that is not the
//       entry.
//   (2) THE LAWFUL PARTNER — the same direct drive with a pair that admits every value: the check still
//       restarts (the pair is asked at `5`) and **NO refusal is produced** — `K-3`'s report keeps `outcome`
//       `'passed'`, the log keeps its two entries, and the reversal's effect STANDS. The restart is not a
//       blanket fail.
//   (3) THE TERMINAL WRITE ARM, UNCHANGED — the same violating action through `store.write`: the write REFUSES
//       `ConstraintPassRefused` with the surface's one plain form and ONE log entry, and restores. `D-42`'s arms
//       are unmoved by the move; this arm is what makes the report-carried refusal a second reader of ONE
//       refusal and not a second refusal.
//   (4) THE BOUND — a pair body that issues a reversal on EVERY ask the restarted check makes, inside a directly
//       driven pass: the budget is `RESTART_LIMIT` restarts PER SCOPE, it is measured as a count, and the arm
//       past it refuses in the same form and status with its entry saying the budget was spent.
//   (5) THE EPOCH, MEASURED — a request raised in a window whose check never ran (a `delete`'s listener
//       delivery) NAMES that window, so the next pass's drain DROPS it rather than judging an unrelated act's
//       state; the following write answers. **That is the one window this pass still leaves, declared with
//       `D-43` item `2`'s exit.**
//       **⟶ AND THE WORD *"DROPS"* IS READ THROUGH `D-54`, 2026-10-28 — THE DRAIN NO LONGER TAKES A REQUEST IT
//       DID NOT RAISE.** `RCA-8(g)` ANNOTATE-BESIDE: the assertions below are UNMOVED and green; what moved is
//       the mechanism a mismatched request meets. **This window's request is consumed by the `delete`'s OWN
//       WITNESS before the following pass runs** (`D-49`: `record.discarded`, one entry), so the observable this
//       cell asserts — the following write ANSWERS and the pair is never asked at the state the stale window
//       left — stands either way. **A mismatched request the witness did not reach is now LEFT STANDING rather
//       than cleared** (it can be consumed by no later pass, because windows are never reused), which is
//       `D-54` (a)'s whole content: *a pass does not consume a request it did not raise.*
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`, and asserts the drive's coherence
// BEFORE its verdict, so a cell that could not reach its arm says so instead of failing on a symptom.
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s exported accessor, the
// index the `attempt-count` channel answers), `kernelFor(store).live` (the kernel record's open-attempt map) and
// the kernel's own `report` (`K-5`), read for the report a driver that is not the entry can reach.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
// **THE KERNEL'S OWN TWO CALLS, REACHED AS A DIRECT DRIVE REACHES THEM** (`tests/e2e/blind-constraints-unit.test.mjs`
// drives the same names the same way), and `K-5` for the report a non-entry driver reads back.
import { commit as kernelCommit, report as kernelReport, runAttempt as kernelRunAttempt } from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';
// **THE RESTART'S DECLARED BOUND, READ FROM ITS ONE HOME** (`constraints.mjs`) rather than re-spelled here.
import { RESTART_LIMIT } from '../../bindings/js/src/entry/constraints.mjs';

/** `surface.md §2.5` items 3–4: the ONE crossed form's member set, sorted ascending. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];
/** The set's rank-`20` member (`src/error.rs`'s `CODES`, `[&str; 20]`), the ONE status both arms of a
 *  constraint refusal cross with (`DEF-H`; `D-38`). */
const PASS_REFUSED = 'ConstraintPassRefused';
/** `AttemptReport`'s five declared members (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause). */
const REPORT_MEMBERS = ['attempt', 'log', 'ops', 'outcome', 'rollback'];

const SEED = 5;      // the state the reversal RESTORES — and the state the pair REFUSES
const LANDED = 9;    // the value the reversal's op landed — the state the pair is registered at
const THIRD = 7;     // the direct pass's own op
const LATER = 11;    // a following outermost write's value

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The window each arm is taken in, read off the discriminator's OWN two sources. */
const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

/** A refusal's log as a list, or `[]` where the drive answered something else. */
function logOf(caught) {
  return caught !== null && typeof caught === 'object' && Array.isArray(caught.log) ? caught.log : [];
}

/** The `status` and `message` of a caught value, or a marker for a value that is not a refusal record. */
function shapeOf(caught) {
  if (caught === null || typeof caught !== 'object') return { status: null, message: String(caught) };
  return { status: caught.status ?? null, message: typeof caught.message === 'string' ? caught.message : null };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE EXACT THREAD — a constraint body's violating `rollback` inside a DIRECTLY DRIVEN `K-2`/`K-3`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DIRECT-PASS RESTART (1) · a constraint body\'s violating `rollback` INSIDE a directly driven `K-2`/`K-3` is RESTARTED by the pass\'s own commit scope: the pair IS asked at the state the action left (`5`), the REPORT says the restarted pass refused, and the store is restored', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  // THE REVERSAL'S TARGET — the op whose undoing leaves `SEED` standing, the state this pair refuses.
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  assert.equal(target.ok, true,
    `the reversal's target op must land: the write caught ${JSON.stringify(shapeOf(target.caught))}`);

  const facts = [];
  const asked = [];
  let inner = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'restart-direct' }, (context) => {
    asked.push(context.value);
    // THE ACTION, ONCE, FROM INSIDE THE PASS (`context.attempt` is non-null exactly where a pass evaluates
    // this pair; it is `null` at registration and at the restarted check's own ask).
    if (context.attempt !== null && inner === null) {
      facts.push(windowOf(store));
      inner = attempt(() => store.rollback(target.value.op.opId));
    }
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const record = attempt(() => kernelCommit(store, ['a'], 'mem', THIRD));
  assert.equal(record.ok, true,
    `\`K-2\` must open the attempt the pass runs over: the call caught `
      + `${JSON.stringify(shapeOf(record.caught))}`);
  const run = attempt(() => kernelRunAttempt(store, record.value));
  const passFacts = facts.slice();
  const passAsks = asked.slice();
  const standing = store.read(['a']);
  const report = run.ok === true ? run.value : null;
  const log = report !== null && Array.isArray(report.log) ? report.log : [];
  const lastEntry = log.length === 0 ? null : log[log.length - 1];
  // **THE REPORT A DRIVER THAT IS NOT THE ENTRY READS BACK — `K-5` over the attempt the record names.**
  const restated = report === null ? null : attempt(() => kernelReport(store, report.attempt));

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it passes against ${LANDED} and refuses only ${SEED}): the call caught `
      + `${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(inner.ok, true,
    `the reversal itself is NOT judged at its instant (\`D-40\`'s gate stands: the step is still not judged as a `
      + `step), so the body's call ANSWERS its declared record: the drive caught `
      + `${JSON.stringify(shapeOf(inner.caught))}`);
  assert.deepEqual(Object.keys(inner.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a lawful reversal answers \`{opId, undoneOps, restoredTo}\` and no new member (\`PAR-JS-9\`): the drive read `
      + `${JSON.stringify(Object.keys(inner.value))}`);
  assert.equal(run.ok, true,
    `**\`K-3\` CANNOT THROW FOR A LATER CHECK'S REFUSAL** — the pass it was asked to run passed, and the refusal `
      + `is the restarted check's: the run caught ${JSON.stringify(shapeOf(run.caught))}`);
  assert.equal(restated.ok, true,
    `and the attempt's report must be readable at \`K-5\` by a driver that is not the entry: the read caught `
      + `${JSON.stringify(shapeOf(restated.caught))}`);

  // ── THE FINDING (i): THE PAIR IS ASKED AT THE STATE THE ACTION LEFT. ────────────────────────
  assert.deepEqual(passFacts, [{ open: 1, live: 1 }],
    `the body's action must run with ONE OPEN COMMIT AND ONE OPEN ATTEMPT — the pass's own scope (\`D-44\`) — `
      + `or this cell is not driving the window it names: the drive recorded ${JSON.stringify(passFacts)}`);
  assert.deepEqual(passAsks, [LANDED, THIRD, SEED],
    `**THE PAIR IS ASKED AT THE STATE THE REVERSAL LEFT** — REGISTRATION (${LANDED}), the PASS (${THIRD}) and `
      + `THE RESTART (${SEED}), the last taken by the pass's own commit scope after its terminal act. THE `
      + `DRIVE'S ASKS WERE ${JSON.stringify(passAsks)}: \`[${LANDED},${THIRD}]\` and no \`${SEED}\` is the request `
      + `dying with its window, the state \`D-44\` left behind`);

  // ── THE FINDING (ii): THE REPORT SAYS THE RESTARTED PASS REFUSED. ───────────────────────────
  assert.equal(report.outcome, 'failed',
    `**THE ATTEMPT'S ANSWER IS THE RESTARTED CHECK'S** — the state its pass approved does not stand, so `
      + `\`outcome\` is \`'failed'\` and never a third arm. THE DRIVE READ ${JSON.stringify(report.outcome)}`);
  assert.deepEqual(Object.keys(report).sort(), REPORT_MEMBERS,
    `and the report keeps its five declared members — the refusal travels beside them, not among them: the `
      + `drive read ${JSON.stringify(Object.keys(report))}`);
  assert.equal(restated.value.outcome, 'failed',
    `and \`K-5\` answers the RETAINED record — THE SAME ARM — so a driver reading it afterwards learns the same `
      + `answer, while the record \`K-3\` handed off is the one that holds the entries (\`D-58\`)`);
  assert.equal('log' in restated.value, false,
    '`D-58`: the store retains no message log after the handoff, so `K-5` answers none');
  assert.equal(log.length, 3,
    `the log carries the pass's \`constraint-check\`, its \`commit\`, and the restarted check's ONE entry: `
      + `${JSON.stringify(log.map((entry) => entry.kind))}`);
  assert.deepEqual(log.map((entry) => entry.seq), [1, 2, 3],
    `and every entry keeps the log's own ordinal, the appended one included (\`kernel-surface.md §2.5\` item 1): `
      + `${JSON.stringify(log.map((entry) => entry.seq))}`);
  assert.equal(lastEntry.kind, 'constraint-check',
    `**THE LOG ENTRY** is the refusal's own, of the kernel's own kind set: ${JSON.stringify(lastEntry)}`);
  assert.equal(lastEntry.id, 'restart-direct',
    `and it NAMES the pair that refused the state the reversal left: ${JSON.stringify(lastEntry.id)}`);
  assert.equal(/the value there is 5/.test(lastEntry.message), true,
    `and it names THE STATE it refused — \`5\`, not the pass's own \`${THIRD}\`: `
      + `${JSON.stringify(lastEntry.message)}`);
  assert.equal(/UNDONE/.test(lastEntry.message), true,
    `and it says the reversal was UNDONE, so a driver knows the store stands again where it began: `
      + `${JSON.stringify(lastEntry.message)}`);
  assert.equal(lastEntry.opId, target.value.op.opId,
    `the entry's \`opId\` is the store's own echo of the id the reversal named: `
      + `${JSON.stringify(lastEntry.opId)} against ${JSON.stringify(target.value.op.opId)}`);

  // ── THE FINDING (iii): THE VIOLATING EFFECT DOES NOT STAND. ─────────────────────────────────
  assert.equal(standing, THIRD,
    `**THE STORE IS RESTORED**: the refusal's own compensating act undoes the reversal it refused, so the store `
      + `stands at the journal's head — the pass's own op ${JSON.stringify(THIRD)} — and NOT at `
      + `${JSON.stringify(SEED)}, the state the reversal left. THE DRIVE READ ${JSON.stringify(standing)}`);

  t.diagnostic(`DIRECT-PASS RESTART (1) · 2026-10-27 · THE EXACT THREAD: window `
    + `${JSON.stringify(passFacts[0])} ⇒ the reversal ANSWERED its record ${JSON.stringify(inner.value)} (a STEP: `
    + `not judged at its instant); the pass's own commit scope then DRAINED its request and re-ran the check — `
    + `the pair was asked at ${JSON.stringify(passAsks)}, \`${SEED}\` included; the report answers `
    + `\`outcome\` ${JSON.stringify(report.outcome)} and its log carries '${lastEntry.id}': `
    + `${JSON.stringify(lastEntry.message)}; the store stands at ${JSON.stringify(standing)} — the reversal `
    + `UNDONE — and \`K-5\` hands the same report to a driver that is not the entry`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE LAWFUL PARTNER — an in-commit action that violates NOTHING, inside a directly driven pass
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DIRECT-PASS RESTART (2) · the LAWFUL partner: an in-commit action that violates NOTHING produces NO refusal in a directly driven pass — the check still restarts (the pair is asked at `5`) and passes, the report keeps `outcome: \'passed\'`, and the reversal\'s effect stands', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  const facts = [];
  const asked = [];
  let inner = null;
  // **THIS PAIR ADMITS EVERY VALUE**, so the state the reversal leaves (`5`) is one it approves and the
  // restarted check's ask passes.
  store.addConstraint({ address: ['a'], id: 'restart-lawful-direct' }, (context) => {
    asked.push(context.value);
    if (context.attempt !== null && inner === null) {
      facts.push(windowOf(store));
      inner = attempt(() => store.rollback(target.value.op.opId));
    }
    return true;
  });
  const record = attempt(() => kernelCommit(store, ['a'], 'mem', THIRD));
  assert.equal(record.ok, true,
    `\`K-2\` must open the attempt: the call caught ${JSON.stringify(shapeOf(record.caught))}`);
  const run = attempt(() => kernelRunAttempt(store, record.value));
  const passAsks = asked.slice();
  const standing = store.read(['a']);
  const report = run.ok === true ? run.value : null;

  assert.deepEqual(facts, [{ open: 1, live: 1 }],
    `the lawful arm must be taken in the SAME window as arm (1): ${JSON.stringify(facts)}`);
  assert.equal(inner.ok, true,
    `the reversal answers its record: the drive caught ${JSON.stringify(shapeOf(inner.caught))}`);
  assert.equal(run.ok, true,
    `the direct pass must complete: it caught ${JSON.stringify(shapeOf(run.caught))}`);
  assert.deepEqual(passAsks, [LANDED, THIRD, SEED],
    `**THE CHECK STILL RESTARTS** — the pair is asked at the state the reversal left (${SEED}) — and passes, so `
      + `the restart is not a blanket fail. THE DRIVE WAS ASKED AT ${JSON.stringify(passAsks)}`);
  assert.equal(report.outcome, 'passed',
    `and the report keeps the pass's own arm: \`outcome\` ${JSON.stringify(report.outcome)}`);
  assert.equal(report.log.length, 2,
    `and its log keeps its TWO entries — no refusal entry is appended where nothing refused: `
      + `${JSON.stringify(report.log.map((entry) => entry.kind))}`);
  assert.equal(standing, SEED,
    `the reversal's effect STANDS because nothing refused it: the drive read ${JSON.stringify(standing)}`);

  t.diagnostic(`DIRECT-PASS RESTART (2) · 2026-10-27 · THE LAWFUL PARTNER: window `
    + `${JSON.stringify(facts[0])} ⇒ the reversal ANSWERED its record, the pair was asked at `
    + `${JSON.stringify(passAsks)} (the restart's ask at ${JSON.stringify(SEED)} included) and passed — the `
    + `report keeps \`outcome\` ${JSON.stringify(report.outcome)} with ${report.log.length} log entries — and `
    + `the reversal's effect stands at ${JSON.stringify(standing)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) THE TERMINAL WRITE ARM — unchanged: the write refuses, in the declared form, and restores
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DIRECT-PASS RESTART (3) · THE TERMINAL WRITE ARM IS UNCHANGED by the move: the SAME violating action through `write` REFUSES `ConstraintPassRefused` with the one plain form and ONE log entry, and the store is restored — so the report-carried refusal is a second reader of ONE refusal and not a second refusal', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  const asked = [];
  let inner = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'restart-write' }, (context) => {
    asked.push(context.value);
    if (context.attempt !== null && inner === null) {
      inner = attempt(() => store.rollback(target.value.op.opId));
    }
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const standing = store.read(['a']);
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = logOf(caught);

  assert.equal(registered.ok, true,
    `the pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(inner.ok, true,
    `the reversal answers its record: the drive caught ${JSON.stringify(shapeOf(inner.caught))}`);
  assert.equal(terminal.ok, false,
    `**THE WRITE MUST REFUSE**: the state the action left is one the pair refuses. THE DRIVE'S WRITE `
      + `ANSWERED ok (store stands at ${JSON.stringify(standing)})`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-\`20\` member (${JSON.stringify(PASS_REFUSED)}): the drive read `
      + `${JSON.stringify(caught.status)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `and the crossed form is ${JSON.stringify(REFUSAL_MEMBERS)}: ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(log.length, 1,
    `with ONE log entry — the refusal's own, not the report's copy: ${JSON.stringify(log)}`);
  assert.equal(log[0].id, 'restart-write',
    `naming the pair: ${JSON.stringify(log[0].id)}`);
  assert.equal(log[0].seq, 1,
    `and carrying the \`seq\` of the one-entry list it stands in — the declared ordinal rule, never an ordinal `
      + `read off a log that is not there (\`D-48\` · \`DEF-AI\`): ${JSON.stringify(log[0])}`);
  assert.deepEqual(asked, [LANDED, THIRD, SEED],
    `the pair is asked at REGISTRATION, by the PASS and by the RESTART — the SAME three asks arm (1)'s direct `
      + `drive made: ${JSON.stringify(asked)}`);
  // **⟶ RE-DERIVED 2026-10-27 (`DEF-AE`'s FIX: *"Cache the restoreMark when opening a commit, based on the last
  // valid state/op of the journal."*) AND RE-DERIVED AGAIN 2026-10-28 — `D-63`: *"After the constraint sweep ends in
  // a valid state, bump the restore mark. The passing constraint state marks the new next valid state."***
  // **THE ASSERTION HERE READ `${THIRD}` (the journal's head), THEN `${LANDED}` (the commit's opening), AND IT READS
  // `${THIRD}` AGAIN — A THIRD READING OF THE SAME VALUE AND A DIFFERENT ONE OF THE SAME RULE:** the head was wrong
  // because nothing named the position; the opening was right while nothing MOVED it; **and from this date the
  // position MOVES FORWARD AT EVERY PASSING SWEEP, so the value the restore names here is the state the write's own
  // sweep VALIDATED.** **THE TWO READINGS ARE TOLD APART BY THEIR REASON AND NOT BY THE NUMBER**: under the head it
  // stood there because the head was all there was, and under `D-63` it stands there because THE PASS APPROVED IT —
  // a validated edit stands against a later refusal, while the reversal's own effect (the violating `${SEED}`) is
  // gone. `RCA-8(g)` ANNOTATE-BESIDE: the cell's subject — the terminal write refuses AND restores, in ONE form and
  // ONE log entry — is unchanged. It stands beside arm (1)'s own re-derivation in `tests/e2e/in-commit-restart.test.mjs`.
  assert.equal(standing, THIRD,
    `**A VALIDATED EDIT STANDS AGAINST A LATER REFUSAL** — the LAST VALIDATED MARK the write's commit holds `
      + `(${THIRD}, the state its passing sweep approved), and neither the state the commit opened at (${LANDED}) `
      + `nor the violating state the reversal left (${SEED}): the drive read ${JSON.stringify(standing)}`);

  t.diagnostic(`DIRECT-PASS RESTART (3) · 2026-10-27 · THE TERMINAL WRITE ARM: pair asked at `
    + `${JSON.stringify(asked)}; the write refused \`${caught.status}\` with ${log.length} log entry naming `
    + `'${log[0].id}' and no \`seq\`; the store stands at ${JSON.stringify(standing)} — the validated landing `
    + `standing, the reversal's effect gone, exactly as \`D-42\`\'s arms and \`D-63\`\'s mark declare`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (4) THE BOUND — `RESTART_LIMIT` restarts PER SCOPE, measured as a count, from a directly driven pass
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DIRECT-PASS RESTART (4) · TERMINATION from a DIRECT drive: a pair body that issues a reversal on EVERY ask the restarted check makes cannot restart it for ever — the budget is `RESTART_LIMIT` restarts PER SCOPE and the arm past it refuses in the same form and status', (t) => {
  // **THE FIXTURE, AND WHY IT TAKES TWO PAIRS.** The pass runs at the attempt's address (`['a']`), and the pair
  // whose body acts on every ask of the RESTARTED CHECK stands at the REGISTER (`[]`) — the address a reversal of
  // a root-level target moves. **THE FIRST ACTION IS THE PASS'S OWN**, taken by a second pair at `['a']`: the
  // request the pass records is the one this pass scope must consume.
  const store = make();
  const targets = [];
  for (let index = 0; index < 6; index += 1) targets.push(store.write([`t${index}`], 'mem', 100 + index));
  let armed = false;
  let next = 1;
  const restartAsks = [];
  const actions = [];
  const registeredBound = attempt(() => store.addConstraint({ address: [], id: 'restart-bound' }, () => {
    if (armed === false) return true;
    restartAsks.push(restartAsks.length + 1);
    if (next < targets.length) {
      const target = targets[next];
      next += 1;
      actions.push(attempt(() => store.rollback(target.op.opId)).ok);
    }
    return true;
  }));
  const registeredActor = attempt(() => store.addConstraint({ address: ['a'], id: 'restart-actor' },
    (context) => {
      if (armed === true && context.attempt !== null && actions.length === 0) {
        actions.push(attempt(() => store.rollback(targets[0].op.opId)).ok);
      }
      return true;
    }));
  armed = true;
  const record = attempt(() => kernelCommit(store, ['a'], 'mem', THIRD));
  assert.equal(record.ok, true,
    `\`K-2\` must open the attempt: the call caught ${JSON.stringify(shapeOf(record.caught))}`);
  const run = attempt(() => kernelRunAttempt(store, record.value));
  const report = run.ok === true ? run.value : null;
  const log = report !== null && Array.isArray(report.log) ? report.log : [];
  const lastEntry = log.length === 0 ? null : log[log.length - 1];

  assert.equal(registeredBound.ok, true,
    `the register's pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registeredBound.caught))}`);
  assert.equal(registeredActor.ok, true,
    `and the pass's own pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registeredActor.caught))}`);
  assert.equal(actions[0], true,
    `the pass's own action must be a reversal that MOVES the register, or the restarted check has nothing to `
      + `restart from: the drive recorded ${JSON.stringify(actions)}`);
  assert.equal(run.ok, true,
    `a check that cannot settle still ANSWERS A REPORT on a direct drive — the terminal call refuses, not the `
      + `kernel's report: the run caught ${JSON.stringify(shapeOf(run.caught))}`);
  assert.equal(report.outcome, 'failed',
    `a check that cannot settle must not PASS: \`outcome\` read ${JSON.stringify(report.outcome)}`);
  assert.equal(lastEntry.kind, 'constraint-check',
    `the budget-spent arm answers the same kind of entry: ${JSON.stringify(lastEntry)}`);
  assert.equal(lastEntry.id, 'restart-bound',
    `and it NAMES the pair the restarted check could not settle: ${JSON.stringify(lastEntry.id)}`);
  assert.equal(/budget is spent/i.test(lastEntry.message), true,
    `and its sentence says the budget was SPENT rather than that a pair refused a state it never judged: `
      + `${JSON.stringify(lastEntry.message)}`);
  // **THE BOUND, MEASURED AS A COUNT** — the restarted check asked exactly `RESTART_LIMIT` times inside ONE pass
  // scope, and the request past it is the one the budget spent.
  // **⟶ RE-DERIVED 2026-10-29 (`D-56`) — THE FIRST ASK IS THE PASS'S OWN.** **What stood here** read *"the
  // restarted check makes EXACTLY `${RESTART_LIMIT}` asks inside one pass scope"* — true while the pass at
  // `['a']` did not ask the pair standing at the REGISTER `[]`. **`D-56` makes `[]` a PREFIX of `['a']`**, so
  // the pass asks `restart-bound` itself, exactly as the fixture's own head says it would ("THE FIRST ACTION IS
  // THE PASS'S OWN … the request the pass records is the one this pass scope must consume"). **THE BOUND IS
  // UNMOVED**: the restarts the budget counts are still `RESTART_LIMIT`, and the count measured here is the
  // pass's one ask plus those — `1 + RESTART_LIMIT`.
  assert.equal(restartAsks.length, RESTART_LIMIT + 1,
    `the pass's own ask plus EXACTLY ${RESTART_LIMIT} restart asks inside one pass scope before the budget is `
      + `spent (1 + ${RESTART_LIMIT} = ${RESTART_LIMIT + 1} by \`D-56\`: the pair at the REGISTER \`[]\` is a `
      + `member of the pass at \`['a']\`) — it terminates, and the count is the declared bound rather than the `
      + `body's patience. THE DRIVE COUNTED ${restartAsks.length} asks (actions: ${actions.length})`);
  assert.equal(actions.length, RESTART_LIMIT + 1,
    `the actions are the pass's own plus one per restarted round: ${RESTART_LIMIT + 1} in all — the drive `
      + `recorded ${actions.length}`);

  t.diagnostic(`DIRECT-PASS RESTART (4) · 2026-10-27 · TERMINATION, DIRECT DRIVE: the pass's own body acted, then `
    + `the restarted check asked ${restartAsks.length} times (the declared bound is ${RESTART_LIMIT}, the actions `
    + `${actions.length}) and terminated; the report answers \`outcome\` ${JSON.stringify(report.outcome)} and its `
    + `log's last entry names '${lastEntry.id}' and says the budget is spent — no body-driven loop reaches the `
    + `driver`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (5) THE EPOCH, MEASURED — a request raised in a window with no check DIES with its window
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DIRECT-PASS RESTART (5) · THE EPOCH: a request raised in a window whose check never ran (a `delete`\'s listener delivery) NAMES that window, so the next pass\'s drain DROPS it rather than judging an unrelated act\'s state — the following write ANSWERS, and that window is the exit this pass still leaves (`D-43` item `2`)', (t) => {
  const store = make();
  store.write(['a'], 'mem', 1);
  store.write(['b'], 'mem', SEED);
  const target = attempt(() => store.write(['b'], 'mem', LANDED));
  assert.equal(target.ok, true,
    `the reversal's target op must land: the write caught ${JSON.stringify(shapeOf(target.caught))}`);
  // **THE PAIR STANDS AT `['b']` AND REFUSES `SEED`** — so a drain that wrongly consumed the stale request would
  // ask it at `SEED` and REFUSE, and the following write would refuse instead of answering. **THE LISTENER
  // STANDS AT `['a']`** (a listener and a constraint never share one address, `D-25`) and its body reverses the
  // op that landed `['b']` — so the reversal MOVES the pair's own address.
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['b'], id: 'restart-epoch' }, (context) => {
    asked.push(context.value);
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  // **THE ACTION IS RAISED IN A `delete`'s DELIVERY: ONE OPEN COMMIT AND NO PASS.** `D-1-bis` (*a delete
  // consults no constraint*) is **READ THROUGH `D-55` item `3` OF 2026-10-29**: the delete now runs a pass of its
  // own kind, at ITS OWN address, and THIS delivery still runs none — `D-54`'s declared passless window is the
  // DELIVERY and not the verb — so no check exists to restart and the request stands stamped with the delete's
  // own window identity, **and that window's own witness consumes it on the delete's answer** (`D-49`; this cell
  // still reads *"drops"* at that name and the reading is `D-54` (a)'s: see the header). **THE PAIR HERE STANDS
  // AT `['b']` AND THE DELETE AT `['a']`, so the delete's own pass asks nothing and this arm's readings are
  // unmoved.**
  const windows = [];
  let inner = null;
  const handle = store.listen('restart-epoch-listener', [['a']]);
  store.register(handle, () => {
    // **THE FIRST FIRING IS THE DELETE'S** (the following write delivers this listener too, inside ITS window,
    // and it acts on neither), so the window this arm measures is the delete's alone.
    if (inner === null) {
      windows.push(windowOf(store));
      inner = attempt(() => store.rollback(target.value.op.opId));
    }
  });
  const removed = attempt(() => store.delete(['a'], 'mem'));
  const afterDelete = asked.slice();
  // **AND THE NEXT OUTERMOST WRITE IS A PASS IN A DIFFERENT WINDOW**: the stale request must not be attributed
  // to it.
  const following = attempt(() => store.write(['a'], 'mem', LATER));
  const standingB = store.read(['b']);
  const standingA = store.read(['a']);

  assert.equal(registered.ok, true,
    `the pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registered.caught))}`);
  assert.deepEqual(windows, [{ open: 1, live: 0 }],
    `the delete's listener must run inside the DELETE's own commit window with no attempt live — the window `
      + `\`D-42\` item \`3\` names as having no check to restart: the drive recorded ${JSON.stringify(windows)}`);
  assert.equal(inner.ok, true,
    `the reversal still answers its record inside that window: the drive caught `
      + `${JSON.stringify(shapeOf(inner.caught))}`);
  assert.equal(removed.ok, true,
    `the delete itself must complete: it caught ${JSON.stringify(shapeOf(removed.caught))}`);
  assert.equal(standingB, SEED,
    `**THE REVERSAL MOVED THE PAIR'S OWN ADDRESS** — \`['b']\` stands at ${JSON.stringify(SEED)} once the step is `
      + `done — so a check asked there would REFUSE it: the drive read ${JSON.stringify(standingB)}`);
  assert.deepEqual(afterDelete, [LANDED],
    "**NO CHECK RAN IN THAT WINDOW** — the delivery runs no pass (`D-54`'s declared window; `D-55` item 3 gives "
      + "the DELETE a pass at its own address and this pair does not stand there), so the pair was never asked at "
      + `${JSON.stringify(SEED)} there: ${JSON.stringify(afterDelete)}`);
  assert.equal(following.ok, true,
    `**AND THE STALE REQUEST DOES NOT REACH THE NEXT PASS** (\`D-42\` item \`3\`: *"a request belongs to the act `
      + `that raised it"* — measured, as the window identity the request was stamped with): the write ANSWERS. `
      + `It caught ${JSON.stringify(shapeOf(following.caught))}`);
  assert.equal(asked.includes(SEED), false,
    `and the pair is NEVER asked at the state the stale window's action left — the request died with its `
      + `window rather than being attributed to an unrelated check. THE DRIVE'S ASKS WERE `
      + `${JSON.stringify(asked)}`);
  assert.equal(standingA, LATER,
    `the following write's own value stands: ${JSON.stringify(standingA)}`);

  t.diagnostic(`DIRECT-PASS RESTART (5) · 2026-10-27 · THE EPOCH: the delete's listener ran at window `
    + `${JSON.stringify(windows[0])} and reversed ${JSON.stringify(inner.value)}, leaving ['b'] at `
    + `${JSON.stringify(standingB)}; no check ran in that window, so the pair was asked at `
    + `${JSON.stringify(afterDelete)}; the following write ANSWERED and the pair was asked at `
    + `${JSON.stringify(asked)} — never at ${JSON.stringify(SEED)}, the stale window's state — and ['a'] stands at `
    + `${JSON.stringify(standingA)}. **THIS IS THE ONE WINDOW THE PASS STILL LEAVES**, declared with \`D-43\` item `
    + `\`2\`'s exit: the file reloads or the client regenerates the store — and a REGISTRATION's own evaluation `
    + `is the second such window, whose request dies the same way`);
});
