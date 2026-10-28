// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// NO CONSTRAINT CHECK WITHOUT AN OPEN COMMIT — `D-44`, enforced WHERE THE CHECK RUNS.
//
// **THE RULING** (`strata/decisions.md` · `D-44`, 2026-10-26, the architect, verbatim): *"There should be no state
// where a constraint is being checked without an open commit. Any action that would cause a constraint check
// should open a commit before beginning"* — and its enforcement clause: *"it is enforced where the check runs,
// not where it is called from — **a seam a driver can bypass is not an invariant.**"* **THE CASE THAT MAKES THE
// DIFFERENCE REAL IS THE DIRECT DRIVE**: `runAttempt` (`K-3`) has ONE production call site
// (`constraints.mjs`'s `constraintWrite`, inside the verb's own commit window) **and is driven straight through
// `K-2`/`K-3` by the batteries**, so a bracket taken at the production call site would be joined by that path and
// bypassed by this one. **So the pass opens its own scope** — `state.mjs`'s `installAttemptSeam` installs
// `Symbol.for('provident-storeroom.commit-scope')` on the store instance and `kernel-attempt.mjs`'s `runAttempt`
// runs its pass inside it — **and a store that carries no such channel is REFUSED rather than run uncommitted**
// (the invariant fails closed).
//
// **WHAT THIS FILE DRIVES, AND WHAT EACH ARM PROVES.**
//   (1) THE DIRECT-PASS WINDOW — a pass driven by hand through `K-2`/`K-3`: **the count of open commits seen at
//       every ask DURING the pass is ≥ `1`** (it read `0` before `D-44`, which is the window the ruling names:
//       *"a pass driven by hand, `open=0`/`live=1`: **that state must not exist**"*), the count is `0` before and
//       after, and **the production path's count is UNCHANGED** — the write's own commit is JOINED, not doubled
//       (`§4.1`'s join rule), measured at the two moments the count can be caught: inside the pass, and at the
//       `attempt-opened` channel, which fires ONCE for a production write and ONCE for a direct drive (never
//       twice, and never zero).
//   (2) THE BODY'S ACTION INSIDE THAT PASS — a constraint body that issues a violating `rollback` while a
//       directly driven pass evaluates it. **The window it runs in is `open` `1` / `live` `1`** (`D-44`'s
//       precondition holds at the action too), the reversal still ANSWERS its record (`D-40`'s gate: the step is
//       not judged as a step), **AND THE RESTART NOW FIRES.** **RE-DERIVED 2026-10-27**: the arm this cell read
//       before that date was *"the check is NOT restarted — the request dies with its window, because no
//       `constraintWrite` frame stands above a directly driven pass to consume it"*, and the consumer is no
//       longer a property of that call site: **the pass's own commit scope drains what its pass recorded**
//       (`kernel-attempt.mjs`'s `runAttempt` → `state.mjs`'s `restart-drain` channel → `constraints.mjs`'s
//       `drainRestartRequests`). **So the pair IS asked at the state the reversal left, and the REPORT — the
//       five-member `AttemptReport` `K-3` answers and `K-5` reads back — says the restarted check refused:
//       `outcome` `'failed'`, and one `constraint-check` entry in `log` naming the pair, the state it refused and
//       the undoing.** `K-3` does not throw: the pass it was asked to run passed, and the refusal is a later
//       check's — the write's own path is where that refusal is thrown (`constraintWrite`).
//   (3) A STORE WITHOUT THE SEAM — the channel removed from a real store, and a foreign object handed as one:
//       **both REFUSED with the kernel's `KC-2`, with the pass NOT run, the attempt still open and the count
//       still `0`** — never a pass evaluated outside a commit. The pair used here REFUSES the value that stands,
//       so a drive that ran the pass uncommitted would answer that refusal instead, which is what makes the
//       `KC-2` this cell reads a real discriminator.
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`, and asserts the drive's coherence
// BEFORE its verdict, so a cell that could not reach its arm says so instead of failing on a symptom.
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s exported accessor, the same
// index the `attempt-count` channel answers), `kernelFor(store).live` (the kernel record's open-attempt map) and
// the `attempt-opened` channel — so the window each arm is taken in is MEASURED and not assumed.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
// **THE KERNEL'S OWN TWO CALLS, REACHED AS A DIRECT DRIVE REACHES THEM** (`tests/e2e/blind-constraints-unit.test.mjs`
// drives the same two names the same way).
import { commit as kernelCommit, report as kernelReport, runAttempt as kernelRunAttempt } from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

/** **THE SEAM `D-44` ADDS, SPELLED AS A DRIVE READS IT** — a `Symbol.for` key on the store instance, declared on
 *  both sides so the kernel imports no entry and the entry imports no kernel (`state.mjs`; `kernel-attempt.mjs`).
 *  A drive that fails against this key fails against `D-44`'s enforcement point. */
const COMMIT_SCOPE = Symbol.for('provident-storeroom.commit-scope');
/** **THE COUNT'S DECLARED CHANNEL** (`finalizer-and-teardown.md §4.2` item 1; `P-ADA-5`) — `openCommits` answers
 *  the same index it does, and this arm reads the OBSERVER so that an OPENING is caught at its own instant rather
 *  than inferred from a later count (`§4.2` item 2). */
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

const SEED = 5;    // the state a pair below REFUSES
const LANDED = 9;  // the value `K-2` lands in the direct drive — and the value the refused-pair drive commits
const THIRD = 7;   // the direct pass's own op
const LATER = 11;  // the outermost write that follows the direct pass

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

/** The `status` and `message` of a caught value, or a marker for a value that is not a refusal record. */
function shapeOf(caught) {
  if (caught === null || typeof caught !== 'object') return { status: null, message: String(caught) };
  return { status: caught.status ?? null, message: typeof caught.message === 'string' ? caught.message : null };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE DIRECT-PASS WINDOW — `open` during the pass, `0 → 1`; the production path's count, `1 → 1`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-44 (1) · THE DIRECT-PASS WINDOW: a pass driven by hand through `K-2`/`K-3` runs inside an OPEN COMMIT — the count seen at every ask DURING it is ≥ 1 — and the PRODUCTION path\'s count is unchanged, because the write\'s own commit is JOINED and not doubled', (t) => {
  // ── (a) THE DIRECT DRIVE: `K-2` by hand, then `K-3` by hand, with TWO pairs so the window is read at more than
  // one instant of the same pass. Their bodies record the count at every ask the PASS makes (`context.attempt`
  // is non-null exactly there; it is `null` at registration).
  const direct = make();
  direct.write(['a'], 'mem', SEED);
  const during = [];
  for (const id of ['d1', 'd2']) {
    const registered = attempt(() => direct.addConstraint({ address: ['a'], id }, (context) => {
      if (context.attempt !== null) during.push(openCommits(direct));
      return true;
    }));
    assert.equal(registered.ok, true,
      `the pair '${id}' must REGISTER (it admits every value), or this arm drives no pass: the call caught `
        + `${JSON.stringify(shapeOf(registered.caught))}`);
  }
  const directRecord = attempt(() => kernelCommit(direct, ['a'], 'mem', LANDED));
  assert.equal(directRecord.ok, true,
    `\`K-2\` must open the attempt the pass is run over: the call caught `
      + `${JSON.stringify(shapeOf(directRecord.caught))}`);
  // **THE COUNT'S OWN OPENING IS CAUGHT AT ITS INSTANT, NOT INFERRED FROM A LATER READ** (`§4.2` item 2): the
  // observer is registered AFTER `K-2` returned, so its window is the PASS alone.
  let directOpenings = 0;
  const stopDirect = direct[ATTEMPT_OPENED](() => { directOpenings += 1; });
  const beforeDirect = openCommits(direct);
  const directRun = attempt(() => kernelRunAttempt(direct, directRecord.value));
  stopDirect();
  const afterDirect = openCommits(direct);

  // ── (b) THE PRODUCTION PATH, MEASURED THE SAME WAY. A caller's `write` opens the commit (`§4.1` table `1`), the
  // pass's scope inside it must JOIN, and a NESTED WRITE issued by the body must join too — so the count inside
  // the pass is `1` at both moments it is read, and the `attempt-opened` channel fires ONCE for the whole call.
  const production = make();
  production.write(['a'], 'mem', SEED);
  const nesting = [];
  const registeredProduction = attempt(() => production.addConstraint({ address: ['a'], id: 'p1' }, (context) => {
    if (context.attempt !== null) {
      nesting.push(openCommits(production));
      const nested = attempt(() => production.write(['b'], 'mem', 'nested'));
      assert.equal(nested.ok, true,
        `the body's own nested write must land: it caught ${JSON.stringify(shapeOf(nested.caught))}`);
      nesting.push(openCommits(production));
    }
    return true;
  }));
  let productionOpenings = 0;
  const stopProduction = production[ATTEMPT_OPENED](() => { productionOpenings += 1; });
  const productionWrite = attempt(() => production.write(['a'], 'mem', THIRD));
  stopProduction();
  const afterProduction = openCommits(production);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registeredProduction.ok, true,
    `the production arm's pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registeredProduction.caught))}`);
  assert.equal(during.length, 2,
    `the direct pass must ASK BOTH REGISTERED PAIRS, or no window was read during it: the drive recorded `
      + `${JSON.stringify(during)}`);
  assert.equal(directRun.ok, true,
    `\`K-3\` must return the pass's report: the run caught ${JSON.stringify(shapeOf(directRun.caught))}`);
  assert.equal(productionWrite.ok, true,
    `the production write must complete: it caught ${JSON.stringify(shapeOf(productionWrite.caught))}`);

  // ── THE FINDING: A CHECK NEVER RUNS WHERE NO COMMIT IS OPEN (`D-44`). ────────────────────────
  assert.equal(beforeDirect, 0,
    `nothing is open BEFORE the direct pass — the drive must start from rest or the window it reads is someone `
      + `else's: the count read ${beforeDirect}`);
  assert.equal(during.every((count) => count >= 1), true,
    `EVERY ASK OF THE DIRECT PASS MUST RUN WITH A COMMIT OPEN (\`D-44\`: *"There should be no state where a `
      + `constraint is being checked without an open commit"*; the state this closes is *"a pass driven by hand, `
      + `\`open=0\`/\`live=1\` — that state must not exist"*). THE DRIVE READ ${JSON.stringify(during)} — a \`0\` `
      + `here is a constraint being checked with no commit open`);
  assert.deepEqual(during, [1, 1],
    `and the pass opens EXACTLY ONE — its own scope, no second and no zero: the drive read `
      + `${JSON.stringify(during)}`);
  assert.equal(directOpenings, 1,
    `the pass OPENED that commit itself (the \`attempt-opened\` channel fires once per opening, \`§4.2\` item 2): `
      + `the observer counted ${directOpenings} openings in the window of \`K-3\` alone`);
  assert.equal(afterDirect, 0,
    `and it CLOSED ONLY WHAT IT OPENED — the count is back at zero on the return to the caller (\`§4.1\`: *"a `
      + `count left non-zero after a return"* is on \`§5\`'s failure list): it read ${afterDirect}`);

  // ── AND THE PRODUCTION PATH IS UNCHANGED: JOINED, NOT DOUBLED. ───────────────────────────────
  assert.deepEqual(nesting, [1, 1],
    `the production path's count DURING the pass is \`1\` — at the body's own ask and again after the body's `
      + `nested write — so the pass's scope JOINED the write's commit and neither the pass nor the nested write `
      + `opened a second (\`§4.1\`: *"a verb that finds an extant commit JOINS it rather than opening a second, `
      + `which is what keeps the count exact under nesting"*). THE DRIVE READ ${JSON.stringify(nesting)}`);
  // **⟶ MOVED `2 → 1` ON 2026-10-28 BY `D-53`'S SECOND INVARIANT, AND THE LIMB IT REPLACES IS NAMED: the
  // `D-45` reading that made the body's nested write an opening of its own is SUPERSEDED — *"Constraints/Repairs
  // should always use the same commit"* — so the nested write JOINS the write's commit and the whole production
  // call opens ONE commit, not two. THE INVARIANT THIS CELL EXISTS FOR IS UNMOVED AND IS NOW STRONGER: the count
  // during the pass is `1` at both asks (`nesting` above), the pass's scope opens nothing, AND NEITHER DOES A
  // CONSTRAINT BODY'S VERB.** The superseded sentence follows as the record of the `D-45` instant:
  assert.equal(productionOpenings, 1,
    `and the \`attempt-opened\` channel fired ONCE across the whole production call — THE WRITE'S OWN OPENING `
      + `ALONE, which the pass's scope and the body's nested write BOTH JOINED (\`D-53\`: *"Constraints/Repairs `
      + `should always use the same commit"*) — while `
      + `nothing. **⟶ RE-DERIVED 2026-10-27 BY \`D-45\`, ONE LIMB AND NO OTHER**: this assertion read \`1\` and its `
      + `sentence read *"the pass's scope and the nested write both joined it"*; strata/decisions.md's D-45 `
      + `rules that *"a call entering the surface from an externally-supplied function OPENS A NEW COMMIT by `
      + `default"* and names the constraint body as that function, so the nested write is an opening of its own `
      + `and the pass's scope is the only thing that joins. **THE INVARIANT THIS CELL EXISTS FOR IS UNMOVED**: `
      + `the count during the pass is \`1\` at both asks (\`nesting\` above), the pass opens nothing, and the `
      + `production call returns at \`0\`. The observer counted ${productionOpenings}`);
  assert.equal(afterProduction, 0,
    `and the production call returns with the count at zero: it read ${afterProduction}`);

  t.diagnostic(`D-44 (1) · 2026-10-27 · THE DIRECT-PASS WINDOW: \`K-2\`/\`K-3\` driven by hand — count BEFORE `
    + `${beforeDirect}, DURING ${JSON.stringify(during)} (at every ask the pass made), AFTER ${afterDirect}; the `
    + `pass opened ${directOpenings} commit itself. THE PRODUCTION PATH: count DURING the pass `
    + `${JSON.stringify(nesting)} (at the body's ask and after its nested write), openings across the whole call `
    + `${productionOpenings}, after the call ${afterProduction} — JOINED, not doubled, and unchanged by `
    + `\`D-44\`.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE BODY'S ACTION INSIDE THAT PASS — judged, or restarted?
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-44 (2) · THE BODY\'S ACTION INSIDE THAT PASS: a constraint body\'s violating `rollback` in a directly driven pass runs with ONE OPEN COMMIT and ONE OPEN ATTEMPT, still answers its record (`D-40`\'s gate), and the RESTART FIRES — the pair is asked at the state the reversal left and the REPORT carries the restarted check\'s refusal', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  // **THE REVERSAL'S TARGET** — the op whose undoing leaves `SEED` standing, the state this pair refuses.
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  assert.equal(target.ok, true,
    `the reversal's target op must land: the write caught ${JSON.stringify(shapeOf(target.caught))}`);

  const facts = [];
  const asked = [];
  let inner = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'ra' }, (context) => {
    asked.push(context.value);
    if (context.attempt !== null) {
      facts.push(windowOf(store));
      // THE ACTION, ONCE, FROM INSIDE THE PASS.
      if (inner === null) inner = attempt(() => store.rollback(target.value.op.opId));
    }
    return context.value === SEED
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const record = attempt(() => kernelCommit(store, ['a'], 'mem', THIRD));
  assert.equal(record.ok, true,
    `\`K-2\` must open the attempt: the call caught ${JSON.stringify(shapeOf(record.caught))}`);
  const run = attempt(() => kernelRunAttempt(store, record.value));
  // **THE PASS'S OWN READINGS ARE SNAPSHOTTED HERE, BEFORE ANYTHING ELSE TOUCHES THE STORE**: the write below is
  // an ordinary call whose OWN pass asks this same pair, and a cell that read `asked`/`facts` afterwards would be
  // reading that write's asks as though they were the directly driven pass's.
  const passFacts = facts.slice();
  const passAsks = asked.slice();
  const standing = store.read(['a']);
  const report = run.ok === true ? run.value : null;
  // **THE REPORT A DRIVER THAT IS NOT THE ENTRY CAN REACH — `K-5` over the attempt the record names.**
  const restated = report === null ? null : attempt(() => kernelReport(store, report.attempt));
  const log = report !== null && Array.isArray(report.log) ? report.log : [];
  const lastEntry = log.length === 0 ? null : log[log.length - 1];
  // **THE NEXT OUTERMOST WRITE**: it must now find NOTHING owed to it — the request was consumed by the pass
  // that raised it — and it asks the pair at ITS OWN value only.
  const following = attempt(() => store.write(['a'], 'mem', LATER));
  const afterFollow = asked.slice();

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it passes against ${LANDED} and refuses only ${SEED}): the call caught `
      + `${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(passFacts.length, 1,
    `the pass must ASK the pair exactly once, or no window was measured inside it: the drive recorded `
      + `${JSON.stringify(passFacts)}`);
  assert.equal(inner.ok, true,
    `the reversal itself is NOT judged at its instant (\`D-40\`'s gate stands: the step is still not judged as a `
      + `step), so the body's call ANSWERS its declared record: the drive caught `
      + `${JSON.stringify(shapeOf(inner.caught))}`);
  assert.deepEqual(Object.keys(inner.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a lawful reversal answers \`{opId, undoneOps, restoredTo}\` and no new member (\`PAR-JS-9\`): the drive read `
      + `${JSON.stringify(Object.keys(inner.value))}`);
  assert.equal(run.ok, true,
    `\`K-3\` must ANSWER A REPORT — the pass it was asked to run passed, so the kernel does not throw for a `
      + `later check's refusal: the run caught ${JSON.stringify(shapeOf(run.caught))}`);
  assert.equal(restated.ok, true,
    `and the attempt's report must be readable at \`K-5\` by a driver that is not the entry: the read caught `
      + `${JSON.stringify(shapeOf(restated.caught))}`);

  // ── THE WINDOW THE ACTION RAN IN: `D-44`'S PRECONDITION, AT THE ACTION ITSELF. ────────────────
  assert.deepEqual(passFacts, [{ open: 1, live: 1 }],
    `the body's action runs in ONE OPEN COMMIT and ONE OPEN ATTEMPT — the pass's own scope (\`D-44\`) — and NOT `
      + `in the \`open=0\`/\`live=1\` window this ruling closed: the drive recorded ${JSON.stringify(passFacts)}`);

  // ── THE FINDING: THE RESTART FIRES, AND THE REPORT CARRIES ITS REFUSAL. ──────────────────────
  assert.deepEqual(passAsks, [LANDED, THIRD, SEED],
    `**THE PAIR IS ASKED AT THE STATE THE ACTION LEFT.** Its asks are REGISTRATION (${LANDED}), the PASS `
      + `(${THIRD}) and — from the drain the pass's own commit scope performs — the RESTART (${SEED}). THE `
      + `DRIVE'S ASKS WERE ${JSON.stringify(passAsks)}; a \`${JSON.stringify(SEED)}\` missing from them is the `
      + `request dying with its window`);
  assert.equal(report.outcome, 'failed',
    `**THE REPORT SAYS THE RESTARTED CHECK REFUSED** — \`outcome\` is the attempt's answer and the state its `
      + `pass approved does not stand, so the answer is \`'failed'\` and never a third arm. THE DRIVE READ `
      + `${JSON.stringify(report.outcome)}`);
  assert.deepEqual(Object.keys(report).sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback'],
    `**AND IT KEEPS ITS FIVE READABLE MEMBERS** — the refusal travels beside them, not among them: the drive `
      + `read ${JSON.stringify(Object.keys(report))}`);
  assert.equal(restated.value === report, true,
    `and \`K-5\` answers THE SAME REPORT OBJECT \`K-3\` answered, so a driver reading the record afterwards learns `
      + `the same arm (the closed record is that one object, not a copy)`);
  assert.equal(log.length, 3,
    `the log carries the pass's \`constraint-check\`, its \`commit\`, and the restarted check's ONE entry: `
      + `${JSON.stringify(log.map((entry) => entry.kind))}`);
  assert.deepEqual(log.map((entry) => entry.seq), [1, 2, 3],
    `and the entries keep the log's own ordinals, the appended one included (\`kernel-surface.md §2.5\` item 1): `
      + `${JSON.stringify(log.map((entry) => entry.seq))}`);
  assert.equal(lastEntry.kind, 'constraint-check',
    `**THE LOG ENTRY** — the refusal's own entry, of the kernel's own kind set: ${JSON.stringify(lastEntry)}`);
  assert.equal(lastEntry.id, 'ra',
    `and it NAMES the pair that refused the state the reversal left: ${JSON.stringify(lastEntry.id)}`);
  assert.equal(/UNDONE/.test(lastEntry.message), true,
    `and it says the reversal was UNDONE, so a driver knows the store is back where it started: `
      + `${JSON.stringify(lastEntry.message)}`);
  assert.equal(/budget is spent/.test(lastEntry.message), false,
    `and it is a PAIR's refusal rather than a spent budget: ${JSON.stringify(lastEntry.message)}`);
  assert.equal(lastEntry.opId, target.value.op.opId,
    `the entry's \`opId\` is the store's own echo of the id the reversal named: `
      + `${JSON.stringify(lastEntry.opId)} against ${JSON.stringify(target.value.op.opId)}`);
  assert.equal(standing, THIRD,
    `**AND THE VIOLATING EFFECT DOES NOT STAND**: the refusal's own compensating act restores what the `
      + `reversal moved, so the store stands at the journal's head — the pass's own op ${JSON.stringify(THIRD)} — `
      + `and NOT at ${JSON.stringify(SEED)}, the state the reversal left. THE DRIVE READ `
      + `${JSON.stringify(standing)}`);
  assert.equal(following.ok, true,
    `and the write that follows is lawful — nothing owed to it survived: it caught `
      + `${JSON.stringify(shapeOf(following.caught))}`);
  assert.deepEqual(afterFollow, [LANDED, THIRD, SEED, LATER],
    `and it asks the pair at ITS OWN VALUE (${LATER}) and at nothing else: a surviving request would have been `
      + `consumed there and asked it at ${JSON.stringify(SEED)} again. THE DRIVE'S ASKS WERE `
      + `${JSON.stringify(afterFollow)}`);

  t.diagnostic(`D-44 (2) · RE-DERIVED 2026-10-27 · THE BODY'S ACTION INSIDE A DIRECTLY DRIVEN PASS: window `
    + `${JSON.stringify(passFacts[0])} ⇒ the reversal ANSWERED its record ${JSON.stringify(inner.value)} (a STEP: `
    + `not judged at its instant); the pair was asked at ${JSON.stringify(passAsks)} — the third ask is THE `
    + `RESTART'S, at ${JSON.stringify(SEED)}, taken by the pass's own commit scope; the report says `
    + `\`outcome\` ${JSON.stringify(report.outcome)} and carries its entry '${lastEntry.id}': `
    + `${JSON.stringify(lastEntry.message)}; the store stands at ${JSON.stringify(standing)} — the reversal `
    + `UNDONE; the following write asked at ${JSON.stringify(afterFollow)} and found nothing owed. **RESTARTED**: `
    + `the consumer is the scope the check owns, not a caller's frame.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) A STORE WITHOUT THE SEAM — refused, never run uncommitted
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-44 (3) · A STORE WITHOUT THE SEAM IS REFUSED, NOT RUN UNCOMMITTED: with the channel removed from a real store — and with a foreign object handed as one — `K-3` answers `KC-2`, the pass does NOT run, the attempt stays OPEN and no commit is opened', (t) => {
  // **THE PAIR REFUSES THE VALUE THAT STANDS**, so a drive that ran the pass UNCOMMITTED would answer that
  // refusal (`KC-3`) instead of `KC-2` — which is what makes the status this cell reads a discriminator and not a
  // coincidence.
  const store = make();
  store.write(['a'], 'mem', SEED);
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'rf' }, (context) => {
    asked.push(context.value);
    return context.value === LANDED
      ? { message: 'this pair refuses the value that stands, so an uncommitted pass would say so' }
      : true;
  }));
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it refuses only ${LANDED}): the call caught `
      + `${JSON.stringify(shapeOf(registered.caught))}`);
  const record = attempt(() => kernelCommit(store, ['a'], 'mem', LANDED));
  assert.equal(record.ok, true,
    `\`K-2\` must open the attempt: the call caught ${JSON.stringify(shapeOf(record.caught))}`);
  // **THE SEAM IS REMOVED FROM A STORE THIS PACKAGE BUILT** — the channel is `configurable` by declaration, so a
  // store that is no longer this package's store is exactly this state.
  const had = typeof store[COMMIT_SCOPE];
  delete store[COMMIT_SCOPE];
  const removed = typeof store[COMMIT_SCOPE];
  const askedBefore = asked.length;
  const liveBefore = kernelFor(store).live.size;
  const openBefore = openCommits(store);

  const refused = attempt(() => kernelRunAttempt(store, record.value));

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(had, 'function',
    `the channel must have been INSTALLED on this store before it is removed, or nothing is being driven: it `
      + `read ${had}`);
  assert.equal(removed, 'undefined',
    `and the removal must take: the channel now reads ${removed}`);
  assert.equal(liveBefore, 1,
    `the attempt must be OPEN when the refusal is asked for: \`live\` read ${liveBefore}`);

  // ── THE FINDING: REFUSED, AND NOTHING RAN. ────────────────────────────────────────────────────
  assert.equal(refused.ok, false,
    `**THE INVARIANT FAILS CLOSED (\`D-44\`): a store that cannot open a commit may not run a pass.** THE PASS `
      + `RAN: the drive answered ok (asked at ${JSON.stringify(asked)})`);
  assert.equal(shapeOf(refused.caught).status, 'KC-2',
    `the refusal is the kernel's own argument token \`KC-2\` — the token its other store-mismatch arms answer `
      + `with, and no ninth token is minted (\`fail-surface.md §2\`): the drive read `
      + `${JSON.stringify(shapeOf(refused.caught))}`);
  assert.equal(/commit-scope/.test(shapeOf(refused.caught).message ?? ''), true,
    `and its message NAMES the missing precondition, so a consumer is told why nothing ran: `
      + `${JSON.stringify(shapeOf(refused.caught).message)}`);
  assert.equal(asked.length, askedBefore,
    `**NO BODY WAS INVOKED**: the pass did not run, so the pair was not asked — the drive's asks were `
      + `${JSON.stringify(asked)} before the refusal at ${askedBefore} of them`);
  assert.equal(kernelFor(store).live.size, liveBefore,
    `and the attempt still STANDS — the refusal is taken BEFORE \`status\` moves, so the caller's own attempt is `
      + `neither run nor closed: \`live\` read ${kernelFor(store).live.size} against ${liveBefore}`);
  assert.equal(openCommits(store), openBefore,
    `and no commit was opened for it either: the count read ${openCommits(store)} against ${openBefore}`);

  // ── AND A FOREIGN OBJECT IS THE SAME ANSWER, WITH NOTHING TOUCHED. ─────────────────────────────
  const foreign = attempt(() => kernelRunAttempt({}, {}));
  assert.equal(foreign.ok, false,
    `a value that is not this package's store must be REFUSED, not run: the drive answered ok`);
  assert.equal(shapeOf(foreign.caught).status, 'KC-2',
    `and in the same token: ${JSON.stringify(shapeOf(foreign.caught))}`);

  t.diagnostic(`D-44 (3) · 2026-10-27 · A STORE WITHOUT THE SEAM: the channel was ${had} and is now ${removed}; `
    + `\`K-3\` refused \`${shapeOf(refused.caught).status}\` — ${JSON.stringify(shapeOf(refused.caught).message)} `
    + `— with the pair asked ${asked.length === askedBefore ? 'NOT AT ALL' : 'AT ' + JSON.stringify(asked)}, the `
    + `attempt still OPEN (\`live\` ${kernelFor(store).live.size}) and the count still ${openCommits(store)}; a `
    + `foreign object answered the same \`${shapeOf(foreign.caught).status}\`. NOTHING WAS CHECKED WITHOUT A `
    + `COMMIT: the pass did not run`);
});
