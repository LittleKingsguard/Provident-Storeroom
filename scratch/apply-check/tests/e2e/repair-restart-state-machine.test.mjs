// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE REPAIR RESTART — the architect's state machine, MEASURED against the pass, property by property.
//
// **THE CLAIM, VERBATIM** (the architect's state machine, this pass's brief):
//
//   `initial action --> Constraint check #1 (fail) --> Repair --> Constraint check 1 (pass) --> Constraint
//    check 2 (fail) --> repair --> Constraint check 1 (pass, unless constraint 2 breaks it, then reverse and
//    exit) --> constraint check 2 (pass) --> final return`
//
// **FOUR PROPERTIES IT ASSERTS, AND THIS FILE MEASURES EACH ONE THROUGH THE ENTRY:**
//   1. **SEQUENTIAL, SINGLE-THREADED, THROUGH THE ENTRY** — one action, then the checks in order;
//   2. **★ A REPAIR RESTARTS THE CHECKS FROM #1**, not from the pair after the one that failed, *"because a
//      repair can break a constraint already passed"* — every earlier check is stale;
//   3. **★ TERMINATION IS STRUCTURAL** — a repair that breaks an earlier check REVERSES AND EXITS; **not a
//      counter but a state that cannot proceed**, which is what makes `P-SM-6`'s *"no repair budget"*
//      (`docs/specs/storeroom-constraints/contract.md §5.6`, `S-NO-BUDGET`) true rather than aspirational;
//   4. **EVERY CHECK RUNS WITH AN OPEN COMMIT** (`D-44`), satisfied by construction here.
//
// **WHAT THE CODE'S SHAPE IS, MEASURED AND PRINTED RATHER THAN ASSUMED — AND IT IS THE ONE FINDING OF `(1)`.**
// A pass evaluates **the pairs standing at the attempt's own `address`**, by EXACT address
// (`kernel-foundations.mjs`'s `pairsAtAddress`; `docs/specs/storeroom-constraints/contract.md §5.5` names the
// set and its order). **So the state machine's *"#1 at one address and #2 at another"* is NOT a shape one action
// can judge**: an action at `['a']` asks every pair AT `['a']` and no pair at `['b']`. **The flow — one action,
// two constraints, two repairs, and the checks restarting from `#1` — is drivable at ONE address, and that is the
// fixture every cell below drives.** The two-address claim is driven and printed at `(1)`'s second arm: one pair
// at `['a']`, one at `['b']`, and the action at `['a']` asks the first and never the second. **That is the
// declared exact-address rule and not a defect this pass may repair by widening the pass** — widening it would
// re-spell `contract.md §2.8` item `1` and the pass's whole evaluated set.
//
// **WHAT EACH CELL PROVES.**
//   (1) THE FLOW, PRINTED — the sequence of asks across an attempt with two constraints and two repairs: which
//       pair, in what order, at which value, how many times, and the window each ask was taken in. **The printout
//       is the evidence a reader checks properties `1`, `2` and `4` against line by line.**
//   (2) THE RESTART-FROM-`#1` PROPERTY — after `#2`'s repair, `#1` is ASKED AGAIN, at the state that repair left.
//       **Asserted off the recorded event list, not inferred from the printout.**
//   (3) THE STRUCTURAL EXIT — `#2`'s repair breaks `#1`: `#1`'s second violation is answered by the kernel's own
//       terminal arm `KC-5`, the attempt REVERSES (the store is back at the state it found) and EXITS. **No
//       second repair of `#1` is invoked and no counter decides it**: the discriminator is the pair's own
//       membership of `ran` and of `appliedRepairs` (`P-SM-6`'s `S-FIRST-REPEAT`; `KC-5` at `fail-surface.md §2`).
//   (4) THE LAWFUL SIDE — a single-constraint attempt's sequence is unchanged: two asks, one repair, the pass
//       arm, the repair's value standing.
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`; a cell that cannot reach its arm
// asserts the drive's coherence FIRST and says so instead of reporting a verdict.
//
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s exported accessor over the
// in-flight verb windows) and the kernel record's `live` map (`kernelFor(store).live`), so the window each ask is
// taken in is MEASURED and not assumed.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

/** The ONE crossed form's member set (`docs/specs/storeroom-js/surface.md §2.5` items 3–4), sorted. */
const REFUSAL_MEMBERS = ['address', 'log', 'message', 'status'];
/** The set's rank-`20` member, the ONE status a constraint refusal crosses with (`D-38` · `DEF-H`). */
const PASS_REFUSED = 'ConstraintPassRefused';
/** `P-SM-6`'s limb (i)'s token, carried on the attempt's `outcome` entry's `state` (`fail-surface.md §2`). */
const REPAIR_REPEAT = 'KC-5';

const SEED = 1;    // the state every attempt FINDS — and the state a failed attempt owes back (`D-40`)
const WANT = 2;    // the value the initial action lands; `c1` refuses it
const FIRST = 3;   // the value `c1`'s repair lands; `c2` refuses it
const SECOND = 4;  // the value `c2`'s repair lands; every pair admits it
const BREAKS = 5;  // the value a hostile `c2` repair lands: one `c1` refuses

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The window an ask is taken in, read off the discriminator's OWN two sources (`D-44`'s two conjuncts). */
const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

/** A refusal's log as a list, or `[]` where the drive answered something else. */
function logOf(caught) {
  return caught !== null && typeof caught === 'object' && Array.isArray(caught.log) ? caught.log : [];
}

/** The log's entries of one kind, optionally for one pair. */
function entries(log, kind, id) {
  return log.filter((entry) => entry.kind === kind && (id === undefined || entry.id === id));
}

/** The asks, as the order-and-value list a reader checks the state machine against. */
const asked = (events) => events.filter((one) => one.kind === 'ask').map((one) => `${one.pair}@${one.value}`);

/**
 * THE FIXTURE EVERY ONE-ADDRESS CELL DRIVES — two pairs at `['a']`, each refusing one value and repairing it.
 *
 * The pair bodies record every PASS ask (`context.attempt` is non-null inside a pass and `null` at the
 * registration instant — `kernel-surface.md §2.3` item 1 — so the registration instant is shielded by the
 * declaration's own fact and not by a counter). `c2`'s repair lands `c2RepairsTo`, so the hostile cell makes it
 * land the one value `c1` refuses. `call.inCall` is the entry-call flag the flow cell reads to prove every ask
 * was taken inside the one `write` call.
 */
function twoPairFixture(c2RepairsTo, hostile) {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const events = [];
  const repairs = [];
  const call = { inCall: false };
  const body = (id, decide) => (context) => {
    if (context.attempt === null) return true;
    events.push({ kind: 'ask', pair: id, value: context.value, window: windowOf(store), inCall: call.inCall });
    return decide(context);
  };
  const repair = (pair, value) => (rctx) => {
    repairs.push({ pair, at: rctx.value });
    events.push({ kind: 'repair', pair, at: rctx.value });
    const landed = store.write(['a'], 'mem', value, rctx).op;
    return { ok: true, message: `${pair} landed ${value}`, op: landed };
  };
  // `c1` refuses the initial action's value and repairs it to `FIRST`; in the hostile arm it also refuses the
  // value `c2` repairs to, and the repair body it returns there must NEVER be invoked — the repeat is the exit.
  const registeredOne = attempt(() => store.addConstraint({ address: ['a'], id: 'c1' }, body('c1', (context) => {
    if (Object.is(context.value, WANT)) {
      return { message: 'c1 refuses the initial action', repair: repair('c1', FIRST) };
    }
    if (hostile && Object.is(context.value, c2RepairsTo)) {
      return { message: 'c1 refuses the value c2 repaired to', repair: repair('c1-second', FIRST) };
    }
    return true;
  })));
  // `c2` refuses `FIRST` — the value `c1`'s repair landed — and repairs it.
  const registeredTwo = attempt(() => store.addConstraint({ address: ['a'], id: 'c2' }, body('c2', (context) => (
    Object.is(context.value, FIRST)
      ? { message: 'c2 refuses the value c1 repaired to', repair: repair('c2', c2RepairsTo) }
      : true
  ))));
  return { store, events, repairs, call, registeredOne, registeredTwo };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE FLOW, PRINTED — two constraints, two repairs, and every ask in the order it was taken
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('REPAIR RESTART (1) · THE FLOW, MEASURED AND PRINTED: two constraints at one address, two repairs — the asks are `c1@2, c1@3, c2@3, c1@4, c2@4`, every ask inside ONE open commit and the ONE synchronous entry call, and the action asks the pair at ITS address and never the pair at another', (t) => {
  // **ARM A — THE STATE MACHINE'S FLOW AT ONE ADDRESS**, which is the only shape in which one action judges two
  // constraints: `['a']` holds the pair that refuses the action's value and the pair that refuses the first
  // repair's value.
  const flow = twoPairFixture(SECOND, false);
  const terminal = (() => {
    flow.call.inCall = true;
    try {
      return { ok: true, value: flow.store.write(['a'], 'mem', WANT) };
    } catch (caught) {
      return { ok: false, caught };
    } finally {
      flow.call.inCall = false;
    }
  })();
  const standing = flow.store.read(['a']);
  const sequence = asked(flow.events);
  const asks = flow.events.filter((one) => one.kind === 'ask');
  const windows = asks.map((one) => one.window);

  assert.equal(flow.registeredOne.ok, true,
    `c1 must REGISTER (it passes at ${SEED}): ${JSON.stringify(flow.registeredOne.caught)}`);
  assert.equal(flow.registeredTwo.ok, true,
    `c2 must REGISTER (it passes at ${SEED}): ${JSON.stringify(flow.registeredTwo.caught)}`);
  // ── THE SEQUENCE, MEMBER FOR MEMBER — the state machine's own order, and the printout's subject. ──────
  assert.deepEqual(sequence, ['c1@2', 'c1@3', 'c2@3', 'c1@4', 'c2@4'],
    `the asks must be the state machine's flow — #1 at the action's value (fail), #1 again at its repair's `
      + `value (pass), #2 at that same value (fail), then BOTH from #1 again at #2's repair's value (pass, `
      + `pass). THE DRIVE RECORDED ${JSON.stringify(sequence)}`);
  assert.deepEqual(flow.repairs, [{ pair: 'c1', at: WANT }, { pair: 'c2', at: FIRST }],
    `exactly TWO repairs, each at the value that prompted it: ${JSON.stringify(flow.repairs)}`);
  // ── PROPERTY 1: ONE ACTION, THEN THE CHECKS IN ORDER, ALL INSIDE THE ENTRY'S OWN CALL. ────────────────
  assert.deepEqual(asks.map((one) => one.inCall), [true, true, true, true, true],
    `every ask must be taken inside the one \`write\` call — one action, then the checks: `
      + `${JSON.stringify(asks.map((one) => one.inCall))}`);
  // ── PROPERTY 4: EVERY CHECK RUNS WITH AN OPEN COMMIT (`D-44`), AND NO ASK STANDS OUTSIDE THE PASS. ───
  assert.deepEqual(windows, [
    { open: 1, live: 1 }, { open: 1, live: 1 }, { open: 1, live: 1 }, { open: 1, live: 1 }, { open: 1, live: 1 },
  ], `every ask must be taken with ONE OPEN COMMIT and ONE LIVE ATTEMPT: ${JSON.stringify(windows)}`);
  assert.equal(terminal.ok, true,
    `both repairs land and the final re-run passes, so the write ANSWERS: the drive caught `
      + `${JSON.stringify(terminal.caught)}`);
  assert.equal(standing, SECOND,
    `the store stands at the value the last repair landed (${SECOND}): the drive read ${JSON.stringify(standing)}`);

  // **ARM B — THE TWO-ADDRESS CLAIM, DRIVEN.** One pair at `['a']`, one at `['b']`: the action at `['a']` asks
  // the first and NEVER the second, so the state machine's *"#1 at one address and #2 at another"* is not a shape
  // one action can judge.
  const split = make();
  split.write(['a'], 'mem', SEED);
  split.write(['b'], 'mem', SEED);
  const splitAsks = [];
  const one = attempt(() => split.addConstraint({ address: ['a'], id: 'a1' }, (context) => {
    if (context.attempt === null) return true;
    splitAsks.push(`a1@${context.value}`);
    return true;
  }));
  const two = attempt(() => split.addConstraint({ address: ['b'], id: 'b1' }, (context) => {
    if (context.attempt === null) return true;
    splitAsks.push(`b1@${context.value}`);
    return true;
  }));
  const splitWrite = attempt(() => split.write(['a'], 'mem', WANT));
  assert.equal(one.ok && two.ok, true,
    `both pairs must REGISTER: ${JSON.stringify([one.caught, two.caught])}`);
  assert.equal(splitWrite.ok, true,
    `the two-address action is lawful: ${JSON.stringify(splitWrite.caught)}`);
  assert.deepEqual(splitAsks, ['a1@2'],
    `the action at ['a'] asks the pair AT ['a'] and the pair at ['b'] is NOT ASKED — the exact-address rule `
      + `(\`pairsAtAddress\`) and the reason the flow above is driven at one address. THE DRIVE RECORDED `
      + `${JSON.stringify(splitAsks)}`);

  t.diagnostic(`REPAIR RESTART (1) · THE FLOW: ${sequence.length} asks — ${sequence.join(' → ')} · repairs `
    + `${flow.repairs.map((one) => `${one.pair}@${one.at}`).join(' → ')} · windows `
    + `${JSON.stringify(windows)} · write ${terminal.ok ? 'returned' : 'threw'}, store `
    + `${JSON.stringify(standing)} · TWO ADDRESSES: the action at ['a'] asked `
    + `${JSON.stringify(splitAsks)} — the pair at ['b'] was never asked`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE RESTART-FROM-#1 PROPERTY — after #2's repair, #1 is asked again, at the state that repair left
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('REPAIR RESTART (2) · RESTART FROM #1: after c2\'s repair lands, the VERY NEXT ask is c1 — at the value c2\'s repair left — so a repair restarts the checks from the first pair and not from the pair after the one that failed', (t) => {
  const flow = twoPairFixture(SECOND, false);
  const terminal = attempt(() => flow.store.write(['a'], 'mem', WANT));
  const sequence = asked(flow.events);
  // **THE ASK IMMEDIATELY AFTER `c2`'S REPAIR, READ OFF THE ONE EVENT LIST** — repairs and asks share their
  // order because both are pushed from the same synchronous drive.
  const repairedAt = flow.events.findIndex((one) => one.kind === 'repair' && one.pair === 'c2');
  const after = flow.events.slice(repairedAt + 1).filter((one) => one.kind === 'ask');
  const firstAfter = after.length === 0 ? null : after[0];
  const c1Asks = flow.events.filter((one) => one.kind === 'ask' && one.pair === 'c1').map((one) => one.value);

  assert.equal(terminal.ok, true, `the drive must reach the passing arm: ${JSON.stringify(terminal.caught)}`);
  assert.equal(repairedAt === -1, false,
    `c2's repair must have RUN, or this cell has no subject: the events are ${JSON.stringify(flow.events)}`);
  // ── THE PROPERTY, ASSERTED AND NOT INFERRED. ───────────────────────────────────────────────────────────
  assert.equal(firstAfter === null ? null : firstAfter.pair, 'c1',
    `THE FIRST ASK AFTER c2's REPAIR MUST BE c1 — the restart begins at the FIRST pair and not at the pair `
      + `after c2. THE DRIVE RECORDED ${JSON.stringify(sequence)} (first after the repair: `
      + `${JSON.stringify(firstAfter)})`);
  assert.equal(firstAfter === null ? null : firstAfter.value, SECOND,
    `and it is asked at the value c2's repair LEFT (${SECOND}) and never at the stale ${FIRST}: `
      + `${JSON.stringify(firstAfter)}`);
  assert.deepEqual(flow.events.filter((one) => one.kind === 'ask').slice(-2).map((one) => one.pair), ['c1', 'c2'],
    `the final re-run asks BOTH pairs from the first: ${JSON.stringify(sequence)}`);
  assert.deepEqual(c1Asks, [WANT, FIRST, SECOND],
    `c1 was asked THREE times: the action's value, its own repair's value and c2's repair's value — the `
      + `third ask is the one this cell exists for. THE DRIVE RECORDED ${JSON.stringify(c1Asks)}`);

  t.diagnostic(`REPAIR RESTART (2) · RESTART FROM #1: ${sequence.join(' → ')} · the first ask after `
    + `c2's repair (${FIRST}) is ${firstAfter === null ? 'none' : `${firstAfter.pair}@${firstAfter.value}`} · `
    + `c1's asks ${JSON.stringify(c1Asks)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) THE STRUCTURAL EXIT — #2's repair breaks #1: the attempt REVERSES and EXITS on the repeat
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('REPAIR RESTART (3) · THE STRUCTURAL EXIT: c2\'s repair lands the one value c1 refuses — c1 is asked again, refuses again, and the attempt REVERSES AND EXITS on the repeat: `KC-5`, no second repair of c1 is invoked, and the store is back at the state the attempt found', (t) => {
  const flow = twoPairFixture(BREAKS, true);
  const terminal = attempt(() => flow.store.write(['a'], 'mem', WANT));
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = logOf(caught);
  const standing = flow.store.read(['a']);
  const sequence = asked(flow.events);
  const secondRepairs = flow.repairs.filter((one) => one.pair === 'c1-second');

  assert.equal(terminal.ok, false,
    `the violating effect must NOT stand: an attempt whose repair broke a pair that had already been repaired `
      + `must not pass. THE DRIVE'S WRITE ANSWERED ok (store stands at ${JSON.stringify(standing)}) after `
      + `${JSON.stringify(sequence)}`);
  // ── THE DECLARED ARM, AND THE STATE — NOT A COUNT — THAT DECIDES IT (`P-SM-6` · `KC-5`). ───────────────
  assert.equal(caught === null ? null : caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-20 member ${JSON.stringify(PASS_REFUSED)}: the drive read `
      + `${JSON.stringify(caught === null ? null : caught.status)}`);
  assert.deepEqual(Object.keys(caught === null ? {} : caught).sort(), REFUSAL_MEMBERS,
    `the refusal crosses as exactly ${JSON.stringify(REFUSAL_MEMBERS)}: `
      + `${JSON.stringify(Object.keys(caught === null ? {} : caught))}`);
  const outcomes = entries(log, 'outcome');
  assert.equal(outcomes.length, 1, `ONE outcome entry: ${JSON.stringify(log)}`);
  assert.equal(outcomes[0].state, REPAIR_REPEAT,
    `the attempt's own \`state\` is ${JSON.stringify(REPAIR_REPEAT)} — limb (i): the pair had ALREADY RUN and `
      + `its repair stood in \`appliedRepairs\` (\`P-SM-6\`; \`fail-surface.md §2\`). THE DRIVE READ `
      + `${JSON.stringify(outcomes[0].state)} and its message ${JSON.stringify(outcomes[0].message)}`);
  // ── THE LOG NAMES BOTH PAIRS. ───────────────────────────────────────────────────────────────────────────
  assert.equal(entries(log, 'constraint-check', 'c1').length, 3,
    `c1's own \`constraint-check\` entries are THREE — the action's value, its own repair's value and the `
      + `repeat — and never a fourth: the attempt exits AT the repeat, so no further evaluation of that pair `
      + `runs. THE DRIVE RECORDED ${JSON.stringify(entries(log, 'constraint-check', 'c1'))}`);
  assert.equal(entries(log, 'constraint-check', 'c2').length >= 1, true,
    `c2 was evaluated too, and the log NAMES it: ${JSON.stringify(entries(log, 'constraint-check', 'c2'))}`);
  assert.deepEqual(entries(log, 'repair-run').map((one) => one.id), ['c1', 'c2'],
    `the log names BOTH repairs — one per pair, in the order they ran: `
      + `${JSON.stringify(entries(log, 'repair-run'))}`);
  // ── P_SM_6's OWN TWO COUNTS: NO REPAIR RUNS TWICE, AND THE SECOND REPAIR IS NEVER INVOKED. ─────────────
  assert.equal(entries(log, 'repair-run', 'c1').length, 1,
    `NO REPAIR RUNS TWICE IN ONE ATTEMPT: c1's own repair-run count is ONE and never two — the repeat is `
      + `answered by the exit and not by a second repair (\`P-SM-6\`). THE DRIVE RECORDED `
      + `${JSON.stringify(entries(log, 'repair-run'))}`);
  assert.equal(secondRepairs.length, 0,
    `and the repair c1's repeat REGISTERED was never invoked — its count is 0: ${JSON.stringify(secondRepairs)}`);
  // ── AND THE REVERSAL: THE STORE STANDS WHERE THE ATTEMPT FOUND IT (`D-40`). ─────────────────────────────
  assert.equal(standing, SEED,
    `the failed attempt reverses what it landed and leaves the store at the state it FOUND (${SEED}): the `
      + `drive read ${JSON.stringify(standing)}`);
  assert.deepEqual(sequence, ['c1@2', 'c1@3', 'c2@3', 'c1@5'],
    `and the exit is at the REPEAT — the fourth ask — and not after some budget of further asks: `
      + `${JSON.stringify(sequence)}`);

  const logNames = log.map((one) => `${one.kind}:${one.id}`);
  t.diagnostic(`REPAIR RESTART (3) · STRUCTURAL EXIT: ${sequence.join(' → ')} · c2's repair landed ${BREAKS} `
    + `and c1 refused it · the attempt closed \`${outcomes[0].state}\` `
    + `(${JSON.stringify(outcomes[0].message)}) · log names ${JSON.stringify(logNames)} · c1 repair-run `
    + `count ${entries(log, 'repair-run', 'c1').length}, second repair invoked ${secondRepairs.length} times · `
    + `store ${JSON.stringify(standing)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (4) THE LAWFUL SIDE — a single-constraint attempt's sequence is unchanged
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('REPAIR RESTART (4) · THE LAWFUL SIDE: a single-constraint attempt asks `c1@2, c1@3` and nothing else — one repair, one re-run from the first pair, the pass arm, and the repair\'s value standing', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const sequence = [];
  const repairs = [];
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'c1' }, (context) => {
    if (context.attempt === null) return true;
    sequence.push(`c1@${context.value}`);
    if (Object.is(context.value, WANT)) {
      return { message: 'c1 refuses the action', repair: (rctx) => {
        repairs.push(rctx.value);
        const landed = store.write(['a'], 'mem', FIRST, rctx).op;
        return { ok: true, message: 'c1 repaired', op: landed };
      } };
    }
    return true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', WANT));
  const standing = store.read(['a']);

  assert.equal(registered.ok, true, `c1 must REGISTER: ${JSON.stringify(registered.caught)}`);
  assert.deepEqual(sequence, ['c1@2', 'c1@3'],
    `a single-constraint attempt asks the pair at the action's value, repairs, and asks it again at the `
      + `repair's value — TWO asks and no more. THE DRIVE RECORDED ${JSON.stringify(sequence)}`);
  assert.deepEqual(repairs, [WANT],
    `ONE repair, at the value that prompted it: ${JSON.stringify(repairs)}`);
  assert.equal(terminal.ok, true,
    `the write ANSWERS on the pass arm: ${JSON.stringify(terminal.caught)}`);
  assert.equal(standing, FIRST,
    `the store stands at the repair's value (${FIRST}): the drive read ${JSON.stringify(standing)}`);

  t.diagnostic(`REPAIR RESTART (4) · LAWFUL SIDE: ${sequence.join(' → ')} · one repair at `
    + `${JSON.stringify(repairs)} · write returned, store ${JSON.stringify(standing)}`);
});
