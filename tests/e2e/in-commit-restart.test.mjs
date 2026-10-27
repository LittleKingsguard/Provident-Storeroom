// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// IN-COMMIT RESTART — `D-42`: *"Actions inside of an open commit start the constraint check over again."*
//
// **THE RULING** (`strata/decisions.md` · `D-42`, 2026-10-26, the architect, verbatim: *"Actions inside of an
// open commit start the constraint check over again."*). **THE WINDOW IT CLOSES, AS THE DOWNSTREAM MEASURED
// IT** (`D-41` item `3`): a reversal issued INSIDE an open commit — from a listener body, from a constraint
// body — was UNJUDGED by the conjunction (`reversalAtRest`: no open commit **and** no live attempt), so **its
// violating effect STOOD** — *"zero judgement invocations inside a body, while the identical call one frame
// out is refused and restored"*: **the conservative direction had become the permissive one.**
//
// **WHAT THIS FILE DRIVES, AND WHAT EACH ARM PROVES.**
//   (1) THE LISTENER ARM — a violating `rollback` issued from inside a LISTENER BODY during a write: the
//       window is open commit `1` / live attempt `0`, the reversal call still answers its record (the step is
//       not judged as a step), and **the TERMINAL CALL refuses** — the check restarting from its beginning
//       against the state the reversal left, the pair asked there, the declared form `{status, message, log}`
//       with the set's rank-`20` `ConstraintPassRefused`, and the store restored to the pre-reversal state.
//   (2) THE BODY ARM — the same reversal issued from inside a CONSTRAINT BODY during the pass: open commit
//       `1` / live attempt `1`, the same refusal, the same restored store.
//   (3) THE LAWFUL ARM — an in-commit action that violates NOTHING: the check still restarts (the pair is
//       asked at the state the reversal left) and **no refusal is produced** — the restart is not a blanket
//       fail, and its effect stands because nothing refused it.
//   (4) THE CONTROL — the SAME reversal one frame out, at rest: judged, refused, restored. This is what makes
//       (1) and (2) findings rather than vacuous greens: the pair really does refuse the state those reversals
//       leave, and only the window differs.
//   (5) TERMINATION — a pair body that ACTS on every ask the restart makes: the restart is bounded
//       (`RESTART_LIMIT` restarts per terminal act), the bound is MEASURED here as a count, and the arm past
//       the budget fails closed in the same declared form and status.
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`; a cell that cannot reach its
// arm asserts the drive's coherence FIRST and says so instead of reporting a verdict.
//
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (the store's in-flight verb windows,
// `state.mjs`'s exported accessor) and the kernel record's `live` map (`kernelFor(store).live`), so the window
// each arm is taken in is MEASURED and not assumed.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';
// **THE RESTART'S DECLARED BOUND, READ FROM ITS ONE HOME** (`constraints.mjs`) rather than re-spelled here.
import { RESTART_LIMIT } from '../../bindings/js/src/entry/constraints.mjs';

/** `surface.md §2.5` items 3–4: the ONE crossed form's member set, sorted ascending. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];
/** `contract.md §2.6` item 4 as corrected by `D-41` item `4`: the no-attempt refusal's entry carries FIVE
 *  members and NO `seq` — no attempt log stands to supply one. */
const NO_ATTEMPT_LOG_MEMBERS = ['kind', 'id', 'message', 'opId', 'state'];
/** The set's rank-`20` member (`src/error.rs`'s `CODES`, `[&str; 20]`), the ONE status both arms of a
 *  constraint refusal cross with (`DEF-H`; `D-38`). */
const PASS_REFUSED = 'ConstraintPassRefused';

const SEED = 5;      // the state the reversal RESTORES — and the state the pair REFUSES
const LANDED = 9;    // the value the reversal's op landed — the state the pair is registered at
const THIRD = 7;     // the terminal write's value — the state the pass approves

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

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE LISTENER ARM — a violating `rollback` issued from INSIDE A LISTENER BODY during a write
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('IN-COMMIT RESTART (1) · a violating `rollback` issued from a LISTENER BODY during a write RESTARTS the check: the pair is asked at the state the reversal left, the TERMINAL CALL refuses `ConstraintPassRefused`, and the violating effect is restored — not left standing', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  // THE WINDOW MEASURED AT THE INSTANT THE BODY RUNS, and the reversal the body issues ONCE.
  const facts = [];
  let inner = null;
  const handle = store.listen('restart-listener', [['a']]);
  store.register(handle, () => {
    facts.push(windowOf(store));
    if (inner === null) inner = attempt(() => store.rollback(target.op.opId));
  });
  // **THE PAIR IS REGISTERED AFTER THE `LANDED` WRITE, SO IT PASSES AT REGISTRATION (state `9`) AND REFUSES THE
  // STATE THE REVERSAL LEAVES (`5`)** — which is exactly the shape the downstream measured.
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'r1' }, (context) => {
    asked.push(context.value);
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const standing = store.read(['a']);
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = logOf(caught);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it passes against the state standing then, ${LANDED}): the call caught `
      + `${JSON.stringify(registered.caught)}`);
  assert.deepEqual(facts, [{ open: 1, live: 0 }],
    `the listener body must run with ONE OPEN COMMIT and NO LIVE ATTEMPT — the window \`D-41\` item \`3\` `
      + `measured — or this cell is not driving it: the drive recorded ${JSON.stringify(facts)}`);
  assert.equal(inner.ok, true,
    `the reversal itself is NOT judged at its instant (\`D-40\`'s gate stands: the step is still not judged `
      + `as a step), so the body's call ANSWERS its declared record; the drive caught `
      + `${JSON.stringify(inner.caught)}`);
  assert.deepEqual(Object.keys(inner.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a lawful reversal answers \`{opId, undoneOps, restoredTo}\` and no new member (\`PAR-JS-9\`): the drive `
      + `read ${JSON.stringify(Object.keys(inner.value))}`);

  // ── THE FINDING: THE TERMINAL CALL REFUSES, IN THE DECLARED FORM, WITH THE DECLARED STATUS. ──
  assert.equal(terminal.ok, false,
    `the violating effect must NOT stand: the write that held the reversal refuses. THE DRIVE'S WRITE `
      + `ANSWERED ok (store stands at ${JSON.stringify(standing)}) where the pair refuses `
      + `${JSON.stringify(SEED)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `a refused pass crosses this surface as exactly ${JSON.stringify(REFUSAL_MEMBERS)} — ONE thrown plain `
      + `object (\`docs/specs/storeroom-js/surface.md §2.5\` items 3–4): the drive caught `
      + `${JSON.stringify(Object.keys(caught))}`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-\`20\` member ${JSON.stringify(PASS_REFUSED)} (\`D-38\`'s one `
      + `member for the refusal, both arms): the drive read ${JSON.stringify(caught.status)}`);
  assert.equal(log.length, 1,
    `the no-attempt refusal's \`log\` is ONE entry (\`contract.md §2.6\` item 4): ${JSON.stringify(log)}`);
  assert.equal(log[0].kind, 'constraint-check',
    `the entry is a \`constraint-check\` of the kernel's own kind set: ${JSON.stringify(log[0])}`);
  assert.equal(log[0].id, 'r1',
    `the entry NAMES the pair that refused the state the reversal left: ${JSON.stringify(log[0])}`);
  assert.deepEqual(Object.keys(log[0]).sort(), NO_ATTEMPT_LOG_MEMBERS.slice().sort(),
    `the entry carries ${JSON.stringify(NO_ATTEMPT_LOG_MEMBERS)} and no \`seq\` (\`D-41\` item \`4\`): `
      + `${JSON.stringify(Object.keys(log[0]))}`);
  assert.equal(log[0].opId, target.op.opId,
    `the entry's \`opId\` is the store's own echo of the id the reversal named: `
      + `${JSON.stringify(log[0].opId)} against ${JSON.stringify(target.op.opId)}`);
  assert.equal(log.some((entry) => typeof entry.message === 'string' && /undone/i.test(entry.message)), true,
    `the refusal's entry says the reversal was UNDONE, so a consumer knows the store is back where it `
      + `started: ${JSON.stringify(log.map((entry) => entry.message))}`);

  // ── AND THE RESTART'S OWN EVIDENCE: THE PAIR WAS ASKED AT THE STATE THE REVERSAL LEFT. ─────
  assert.deepEqual(asked, [LANDED, THIRD, SEED],
    `the pair is asked at REGISTRATION (${LANDED}), by the write's PASS (${THIRD}) and — from \`D-42\` — by `
      + `the RESTART, at the state the reversal left (${SEED}). THE DRIVE WAS ASKED AT `
      + `${JSON.stringify(asked)}`);
  assert.equal(standing, THIRD,
    `the violating effect does not stand: the refusal's own compensation restores the pre-reversal state, and `
      + `a reversal appends no journal entry, so that state is the journal's head — the drive read `
      + `${JSON.stringify(standing)} where ${JSON.stringify(SEED)} would be the violating effect standing`);

  t.diagnostic(`IN-COMMIT RESTART (1) · D-42 (2026-10-27) · LISTENER ARM: window ${JSON.stringify(facts[0])} `
    + `⇒ the reversal ANSWERED its record ${JSON.stringify(inner.value)} (not judged as a step), the check `
    + `RESTARTED, the pair was asked at ${JSON.stringify(asked)} and REFUSED ${JSON.stringify(SEED)}; the `
    + `terminal write refused \`${caught.status}\` with ${log.length} log entry naming '${log[0].id}'; the `
    + `store stands at ${JSON.stringify(standing)} — the pre-reversal state, restored`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE BODY ARM — the same violating `rollback`, issued from INSIDE A CONSTRAINT BODY during the pass
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('IN-COMMIT RESTART (2) · a violating `rollback` issued from a CONSTRAINT BODY during a write\'s pass RESTARTS the check from its beginning: the pair is asked again at the state the reversal left, the TERMINAL CALL refuses `ConstraintPassRefused`, and the violating effect is restored', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const facts = [];
  const asked = [];
  let inner = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'r2' }, (context) => {
    asked.push(context.value);
    // THE REVERSAL, ONCE, FROM INSIDE THE PASS (`context.attempt` is non-null exactly where a pass evaluates
    // this pair; it is `null` at registration and at the restart's own ask).
    if (context.attempt !== null && inner === null) {
      facts.push(windowOf(store));
      inner = attempt(() => store.rollback(target.op.opId));
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
    `the pair must REGISTER (it passes against ${LANDED}): the call caught ${JSON.stringify(registered.caught)}`);
  assert.deepEqual(facts, [{ open: 1, live: 1 }],
    `the body must run with ONE OPEN COMMIT and ONE LIVE ATTEMPT — the kernel-driven-pass window — or this `
      + `cell is not driving it: the drive recorded ${JSON.stringify(facts)}`);
  assert.equal(inner.ok, true,
    `the reversal itself still ANSWERS its declared record: the drive caught ${JSON.stringify(inner.caught)}`);
  assert.equal(terminal.ok, false,
    `the write must REFUSE: the check the body's reversal invalidated restarts and the pair refuses the `
      + `state it left. THE DRIVE'S WRITE ANSWERED ok (store stands at ${JSON.stringify(standing)})`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is ${JSON.stringify(PASS_REFUSED)}: the drive read ${JSON.stringify(caught.status)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `the refusal crosses as ${JSON.stringify(REFUSAL_MEMBERS)}: the drive caught ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(log.length, 1, `ONE log entry: ${JSON.stringify(log)}`);
  assert.equal(log[0].id, 'r2',
    `the entry NAMES the pair that refused the state the reversal left: ${JSON.stringify(log[0])}`);
  assert.deepEqual(asked, [LANDED, THIRD, SEED],
    `the pair is asked at REGISTRATION, by the PASS and — from \`D-42\` — by the RESTART at the state the `
      + `reversal left. THE DRIVE WAS ASKED AT ${JSON.stringify(asked)}`);
  assert.equal(standing, THIRD,
    `the violating effect does not stand: the store is restored to the pre-reversal state — the drive read `
      + `${JSON.stringify(standing)}`);

  t.diagnostic(`IN-COMMIT RESTART (2) · D-42 (2026-10-27) · BODY ARM: window ${JSON.stringify(facts[0])} ⇒ `
    + `the reversal ANSWERED ${JSON.stringify(inner.value)}; the pair was asked at ${JSON.stringify(asked)} `
    + `and REFUSED ${JSON.stringify(SEED)}; the terminal write refused \`${caught.status}\` with its log `
    + `naming '${log[0].id}'; the store stands at ${JSON.stringify(standing)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) THE LAWFUL ARM — an in-commit action that violates NOTHING produces NO refusal
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('IN-COMMIT RESTART (3) · an in-commit action that violates NOTHING produces NO refusal — the check still restarts (the pair is asked at the state the reversal left) and passes, so the restart is not a blanket fail', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const facts = [];
  let inner = null;
  const handle = store.listen('restart-lawful', [['a']]);
  store.register(handle, () => {
    facts.push(windowOf(store));
    if (inner === null) inner = attempt(() => store.rollback(target.op.opId));
  });
  // **THIS PAIR ADMITS EVERY VALUE** — so the state the reversal leaves (`5`) is one it approves, and the
  // restart's ask passes.
  const asked = [];
  store.addConstraint({ address: ['a'], id: 'r3' }, (context) => {
    asked.push(context.value);
    return true;
  });
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const standing = store.read(['a']);

  assert.deepEqual(facts, [{ open: 1, live: 0 }],
    `the lawful arm must be taken in the same LISTENER window as arm (1): ${JSON.stringify(facts)}`);
  assert.equal(inner.ok, true,
    `the reversal answers its record: the drive caught ${JSON.stringify(inner.caught)}`);
  assert.equal(terminal.ok, true,
    `an in-commit action that violates NOTHING must NOT produce a refusal: the write caught `
      + `${JSON.stringify(terminal.caught)}`);
  assert.deepEqual(asked, [LANDED, THIRD, SEED],
    `the check still RESTARTS — the pair is asked at the state the reversal left (${SEED}) — and passes, so `
      + `the restart is not a blanket fail. THE DRIVE WAS ASKED AT ${JSON.stringify(asked)}`);
  assert.equal(standing, SEED,
    `the reversal's effect STANDS because nothing refused it (the restart asked and passed): the drive read `
      + `${JSON.stringify(standing)}`);

  t.diagnostic(`IN-COMMIT RESTART (3) · D-42 (2026-10-27) · LAWFUL ARM: window `
    + `${JSON.stringify(facts[0])} ⇒ the reversal ANSWERED its record, the pair was asked at `
    + `${JSON.stringify(asked)} (the restart's ask at ${JSON.stringify(SEED)} included) and passed, NO `
    + `refusal was produced, and the reversal's effect stands at ${JSON.stringify(standing)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (4) THE CONTROL — the one-frame-out arm: the SAME reversal at rest is judged, refused and restored
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('IN-COMMIT RESTART (4) · THE CONTROL: the SAME violating `rollback` ONE FRAME OUT (at rest: no open commit, no live attempt) is judged, refused `ConstraintPassRefused` and restored — so arm (1) is a finding and not a vacuous green', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asked = [];
  store.addConstraint({ address: ['a'], id: 'r4' }, (context) => {
    asked.push(context.value);
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  });
  const facts = [windowOf(store)];
  const control = attempt(() => store.rollback(target.op.opId));
  const standing = store.read(['a']);
  const caught = control.ok === false ? control.caught : null;
  const log = logOf(caught);

  assert.deepEqual(facts, [{ open: 0, live: 0 }],
    `the control must be measured AT REST — no open commit, no live attempt — or its judgement would be the `
      + `discriminator's accident: the drive recorded ${JSON.stringify(facts)}`);
  assert.equal(control.ok, false,
    `the terminal reversal of the SAME shape must be REFUSED (\`D-38\`), or arm (1) has no control: the `
      + `drive answered ok=${control.ok} caught=${JSON.stringify(caught)}`);
  assert.equal(caught.status, PASS_REFUSED,
    `the control's status is ${JSON.stringify(PASS_REFUSED)}: the drive read ${JSON.stringify(caught.status)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `the control crosses as ${JSON.stringify(REFUSAL_MEMBERS)}: ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(log.length, 1, `ONE log entry: ${JSON.stringify(log)}`);
  assert.equal(log[0].id, 'r4',
    `the control's entry names the pair that refused: ${JSON.stringify(log[0])}`);
  assert.deepEqual(asked, [LANDED, SEED],
    `the control asks the pair TWICE — at registration (${LANDED}) and by the judgement (${SEED}), with no `
      + `pass ask because no attempt stands: the drive was asked at ${JSON.stringify(asked)}`);
  assert.equal(standing, LANDED,
    `the control's refusal undoes the reversal it refused: the store stands again at the pre-reversal `
      + `standing ${JSON.stringify(LANDED)} — the drive read ${JSON.stringify(standing)}`);

  t.diagnostic(`IN-COMMIT RESTART (4) · D-42 (2026-10-27) · CONTROL: window `
    + `${JSON.stringify(facts[0])} ⇒ JUDGED, refused \`${caught.status}\`, pair asked at `
    + `${JSON.stringify(asked)}, store restored to ${JSON.stringify(standing)} — the arm (1) and (2) `
    + `reversals are refused for exactly this state, and only the window differs`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (5) TERMINATION — a pair body that ACTS on every ask: the restart is BOUNDED, and the bound is measured
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('IN-COMMIT RESTART (5) · TERMINATION: a pair body that issues a reversal on EVERY ask the restart makes cannot restart the check for ever — the budget is spent at the declared bound and the arm past it refuses in the same form and status', (t) => {
  // **THE FIXTURE.** A pair at the REGISTER (`[]`) — asked by the restart at every address it can see moved —
  // whose body, on every ask the RESTART makes, reverses ONE FRESH target op: each reversal moves the register,
  // so the restart's next ask is at a different state and the body acts again. **THE FIRST ACTION COMES FROM A
  // LISTENER BODY** (the window arm (1) measures), and the body is armed only after registration, so its own
  // registration ask is not an action.
  const store = storeCreate({ journalLength: 256, listeners: [] });
  const targets = [];
  for (let index = 0; index < 6; index += 1) targets.push(store.write([`t${index}`], 'mem', 100 + index));
  let armed = false;
  let next = 1;
  const restartAsks = [];
  const actions = [];
  const registered = attempt(() => store.addConstraint({ address: [], id: 'rt' }, () => {
    if (armed === false) return true;
    restartAsks.push(restartAsks.length + 1);
    if (next < targets.length) {
      const target = targets[next];
      next += 1;
      actions.push(attempt(() => store.rollback(target.op.opId)).ok);
    }
    return true;
  }));
  const handle = store.listen('restart-terminate', [['a']]);
  store.register(handle, () => {
    actions.push(attempt(() => store.rollback(targets[0].op.opId)).ok);
  });
  armed = true;
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = logOf(caught);

  assert.equal(registered.ok, true,
    `the register's pair must REGISTER (it passes at the state standing then): the call caught `
      + `${JSON.stringify(registered.caught)}`);
  assert.equal(actions[0], true,
    `the listener body's action must be a reversal that MOVES the register, or the restart has nothing to `
      + `restart from: the drive recorded ${JSON.stringify(actions)}`);
  assert.equal(terminal.ok, false,
    `a check that cannot settle must not PASS: the write answered ok where the budget was spent`);
  assert.equal(caught.status, PASS_REFUSED,
    `the arm past the budget crosses the SAME status (${JSON.stringify(PASS_REFUSED)}): the drive read `
      + `${JSON.stringify(caught.status)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `and the SAME form (${JSON.stringify(REFUSAL_MEMBERS)}): ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(log.length, 1, `ONE log entry: ${JSON.stringify(log)}`);
  assert.equal(log[0].id, 'rt',
    `the entry NAMES the pair the restart could not settle: ${JSON.stringify(log[0])}`);
  // **THE BOUND, MEASURED AS A COUNT** — the restart asked exactly `RESTART_LIMIT` times, and the fourth
  // request is the one the budget spent.
  assert.equal(restartAsks.length, RESTART_LIMIT,
    `the restart makes EXACTLY ${RESTART_LIMIT} asks before the budget is spent — it terminates, and the `
      + `count is the declared bound rather than the body's patience. THE DRIVE COUNTED `
      + `${restartAsks.length} restart asks (actions: ${actions.length})`);
  assert.equal(actions.length, RESTART_LIMIT + 1,
    `the actions are the listener's own plus one per restart ask: ${RESTART_LIMIT + 1} in all — the drive `
      + `recorded ${actions.length}`);
  assert.equal(log.some((entry) => typeof entry.message === 'string' && /budget is spent/i.test(entry.message)), true,
    `the entry says the budget was SPENT rather than that a pair refused a state it never judged: `
      + `${JSON.stringify(log.map((entry) => entry.message))}`);

  t.diagnostic(`IN-COMMIT RESTART (5) · D-42 (2026-10-27) · TERMINATION: a pair body acted inside the `
    + `check on every ask; the restart asked ${restartAsks.length} times (the declared bound is `
    + `${RESTART_LIMIT}, the actions ${actions.length}) and terminated; the terminal write refused `
    + `\`${caught.status}\` with its log naming '${log[0].id}' and saying the budget was spent — no `
    + `body-driven loop reaches the caller`);
});
