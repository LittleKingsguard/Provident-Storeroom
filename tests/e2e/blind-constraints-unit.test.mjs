// tests/e2e/blind-constraints-unit.test.mjs
//
// BLIND INSTRUMENT — THE CONSTRAINTS UNIT'S OWN §2.8/§2.9: the repair's CLOSED TWO-ARM result, the
// applied-repair marker's per-attempt lifetime, and — carried with them because the unit declares them at
// the same parts — the attempt's lifecycle states, the `KC-7`/`KC-2` distinction, and what the log carries.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/parameter-semantics.md`
//     §2.4 (`PAR-C-4`, the log's entry set and its order) · §2.5 (`PAR-C-5`, the constraint's CLOSED
//     THREE-ARM outcome and the outside forms' reading) · §2.6 (`PAR-C-6`, the repair and its ONE
//     argument) · §2.7 (`PAR-C-7`, the repair's own edit and the op its return carries) · §2.8
//     (`PAR-C-8`, the repair's CLOSED TWO-ARM result and its outside forms) · §2.9 (`PAR-C-9`, the
//     applied-repair marker) · §2.16 (`PAR-C-16`, the attempt and repair contexts)
//   · .../storeroom-constraints/attempt-lifecycle.md §2.4 items 1, 3 and 4 (the nine-member open record and
//     the five-member closed report; the SIX states; the closed transition table and the four
//     disjointness predicates) and item 2 (the pair key)
//   · .../storeroom-constraints/kernel-surface.md §2.1 items 1–5 (the item shapes and their answers) and
//     §2.5 item 1 (the `LogEntry`'s six members, its four kinds, `seq` ascending from `1`, `state` `null`
//     on the three non-`outcome` kinds, and whose text each kind's `message` carries)
//   · .../storeroom-constraints/fail-surface.md §1.1 items 1–4 (the one three-member thrown form and the
//     token spelling) and §2 (the closed set of eight and the `KC-2`/`KC-7` rows)
//   · .../storeroom-constraints/composition-and-states.md §2.6 items 1–3 (the composition's reach, order
//     and the six-member `RollbackStep`)
//
// The six existing blind instances were read ONLY to avoid duplicating a cell; `blind-constraints-surface`
// drives the ENTRY's constraint methods (`addConstraint`…), and nothing of its cells is re-authored here:
// this file drives the UNIT's own kernel-level declarations. NO byte of `bindings/js/index.mjs`,
// `bindings/js/src/**` or `src/**` was read, NO other battery or runner under `tests/**` was read, and NO
// CELL OPENS A `docs/**` PATH AT RUNTIME (`D-17`): every expectation below is a LITERAL written here.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { commit, log, register, remove, report, runAttempt } from '../../bindings/js/src/constraint-kernel.mjs';
import { storeCreate } from '../../bindings/js/index.mjs';

/** A store constructed at the two REQUIRED `cfg` keys alone (`surface.md §2.1`). */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** Run `fn`, returning the thrown value. A call that RETURNS is a failure of every cell that uses this. */
const catchIt = (fn) => {
  try {
    fn();
  } catch (thrown) {
    return thrown;
  }
  assert.fail('the call returned; the declared surface says it THROWS');
};

/** The entries of one kind in a log list. */
const ofKind = (entries, kind) => entries.filter((entry) => entry.kind === kind);

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

/** `attempt-lifecycle.md §2.4` item 3: the SIX states, each named so a `P-SM` row can drive it. */
const SIX_STATES = ['OPEN', 'EVALUATING', 'REPAIRING', 'FAILING', 'PASSED', 'CLOSED'];

/** The five members the CLOSED report does NOT carry: *"`open`, `ran`, `appliedRepairs`, `commit` and
 *  `ref` are read off an OPEN attempt and never off a closed one"* (`attempt-lifecycle.md §2.4` item 1). */
const OPEN_ONLY = ['open', 'ran', 'appliedRepairs', 'commit', 'ref'];

/** `kernel-surface.md §2.5` item 1: the log entry's SIX members and the four kinds. */
const LOG_MEMBERS = ['seq', 'kind', 'id', 'message', 'opId', 'state'];
const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];

/** `composition-and-states.md §2.6` item 3: the six-member `RollbackStep`. */
const STEP_MEMBERS = ['opId', 'undoneOps', 'restoredTo', 'answer', 'failed', 'checkpoint'];

/** A constraint whose violation carries a repair that writes at a DIFFERENT address and returns the op it
 *  landed — `PAR-C-5`'s `{repair, message}` arm and `PAR-C-8`'s `{ok: true, op}` arm, read at `A110`. */
const repairElsewhere = (store, address, violatingValue, repairAddress) => () =>
  store.read(address) === violatingValue
    ? {
        message: 'the value must not be ' + violatingValue,
        repair: () => {
          const landed = store.write(repairAddress, 'mem', 9);
          return { ok: true, op: landed.op };
        },
      }
    : true;

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('unit · attempt-lifecycle.md §2.4 item 3 · THE ATTEMPT\'S SIX STATES ARE `OPEN` · `EVALUATING` · `REPAIRING` · `FAILING` · `PASSED` · `CLOSED`, AND ONLY THE TWO TERMINAL ARMS REACH `CLOSED`', () => {
  assert.equal(SIX_STATES.length, 6);
  // `OPEN`: the record stands in the registry and nothing has been evaluated — **AND ITS LIST IS NO LONGER A
  // CONSUMER READ FROM 2026-10-28 (`D-58`)**: `K-4` over a live attempt refuses `KC-7`, so an open log is read
  // through the record the closing act hands off and never through the store.
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  assert.equal(catchIt(() => log(store, issued.attempt)).status, 'KC-7');
  // `PASSED` → `CLOSED`: the report is the five-member closed form and the address is released, so a fresh
  // `K-2` there is LAWFUL (`KC-7` is refused only while the attempt is genuinely live).
  const attemptReport = runAttempt(store, issued);
  assert.equal(attemptReport.outcome, 'passed');
  assert.equal(commit(store, ['a'], 'mem', 2).attempt.id.length > 0, true, 'the terminal arm released the hold');
  // The five members read off an OPEN attempt stand on no closed report.
  for (const member of OPEN_ONLY) {
    assert.equal(member in attemptReport, false, `${member} is an OPEN record's member, never the report's`);
  }
});

test('unit · fail-surface.md §2 (`KC-7` and `KC-2` rows) · THE SAME POSITION, TWO TOKENS BY STATE: `KC-7` is an attempt that is LIVE (a second `K-2` at a held address; `K-5` over an open attempt) and `KC-2` is a reference the kernel holds NO attempt for', () => {
  const live = make();
  const open = commit(live, ['q'], 'mem', 1);
  assert.equal(catchIt(() => commit(live, ['q'], 'mem', 2)).status, 'KC-7');
  assert.equal(catchIt(() => report(live, open.attempt)).status, 'KC-7');
  // ⟶ AND `K-4`'s LIVE ARM IS THE SAME `KC-7` FROM 2026-10-28 — `D-58`, the architect, verbatim: *"The client
  // does not need any insight into the current state of a commit/attempt before it completes. Don't expose any
  // of it."* **The two readers refuse a live attempt with ONE member, one shape and one message family.**
  assert.equal(catchIt(() => log(live, open.attempt)).status, 'KC-7');

  const closed = make();
  const issued = commit(closed, ['b'], 'mem', 1);
  runAttempt(closed, issued);
  // The CLOSED state ANSWERS: `K-5` over a closed attempt returns the retained record and throws nothing —
  // `D-58` keeps the outcome and lets the message log go.
  assert.equal(report(closed, issued.attempt).outcome, 'passed');
  assert.equal('log' in report(closed, issued.attempt), false, 'and the retained record carries no log');
  assert.deepEqual(log(closed, issued.attempt), [], 'while `K-4` answers the empty retained list');
  const unknown = 'attempt-that-never-was';
  assert.equal(catchIt(() => log(closed, unknown)).status, 'KC-2');
  assert.equal(catchIt(() => report(closed, unknown)).status, 'KC-2');
  assert.notEqual(
    catchIt(() => commit(live, ['q'], 'mem', 2)).status,
    catchIt(() => log(closed, unknown)).status,
    'the live state and the unknown reference are told apart by the token and by nothing else',
  );
});

test('unit · parameter-semantics.md §2.8 (`PAR-C-8`) · THE REPAIR\'S RETURN IS A CLOSED TWO-ARM SET OF THREE MEMBERS — `{ok: true, op}` and `{ok: false, message}` — and the `op` is the op the repair LANDED, read off that return and nowhere else', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  store.write(['m'], 'mem', 0);
  const landedOps = [];
  register(store, ['n'], 'c1', () => {
    if (store.read(['n']) !== 1 || store.read(['m']) === 2) return true;
    return {
      message: 'n must not be 1',
      repair: () => {
        const landed = store.write(['m'], 'mem', 2);
        landedOps.push(landed.op.opId);
        return { ok: true, op: landed.op };
      },
    };
  });
  const issued = commit(store, ['n'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  // The repair's edit resolved the violation, so arm `(g)` is reached and the repair's op joined `ops`.
  assert.equal(attemptReport.outcome, 'passed');
  assert.equal(attemptReport.ops.length, 2, 'the attempt created TWO ops: the write\u2019s and the repair\u2019s');
  assert.equal(attemptReport.ops[0].opId, issued.op.opId, 'the write\u2019s op stands FIRST, in creation order');
  assert.equal(attemptReport.ops[1].opId, landedOps[0], 'the repaired op IS the op the repair\u2019s own return carried');
});

test('unit · parameter-semantics.md §2.8 (`PAR-C-8`) outside forms · A REPAIR THAT CARRIES NO OP — a bare `true`, a bare `false`, `undefined`, `{ok: true}` with no `op`, `{ok: false}` with no message, or any other object — IS READ AS THE `{ok: false, message}` ARM, and the kernel\'s own sentence names the unrecognized result', () => {
  for (const outside of [true, false, undefined, { ok: true }, { ok: false }, { ok: 'yes', message: 'x' }, 'done', 7]) {
    const store = make();
    store.write(['n'], 'mem', 0);
    register(store, ['n'], 'c1', () =>
      store.read(['n']) === 1 ? { message: 'v', repair: () => outside } : true,
    );
    const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
    assert.equal(
      caught.status,
      'KC-4',
      `the repair returned ${JSON.stringify(outside)}; the declared answer is arm (d), KC-4`,
    );
    const repairs = ofKind(caught.log, 'repair-run');
    assert.equal(repairs.length, 1);
    assert.equal(repairs[0].state, null, 'the repair-run entry carries no state');
    assert.equal(ofKind(caught.log, 'outcome')[0].state, 'KC-4', 'arm (d)\u2019s state stands on the outcome entry');
  }
});

test('unit · parameter-semantics.md §2.8 (`PAR-C-8`) `observable` · A REPAIR THAT RETURNS `{ok: true, op}` WHOSE `op` IS NOT THE OP IT LANDED HAS CARRIED NO OP — the declared answer is `KC-4` (arm `(d)`) and never a state of its own', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'c1', () =>
    store.read(['n']) === 1
      ? {
          message: 'v',
          repair: () => {
            store.write(['m'], 'mem', 2); // the op it ACTUALLY landed
            return { ok: true, op: { opId: 'not-the-op-it-landed' } }; // … and the one it names
          },
        }
      : true,
  );
  const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  assert.equal(caught.status, 'KC-4');
  assert.equal(ofKind(caught.log, 'outcome')[0].state, 'KC-4');
});

test('unit · parameter-semantics.md §2.6 (`PAR-C-6`) and §2.16 (`PAR-C-16`) · THE REPAIR TAKES ONE ARGUMENT — the SIX-member `RepairContext {op, address, id, value, tier, pending}` — and the caller\'s own text is CARRIED WHOLE into the `repair-run` entry', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  let context = null;
  register(store, ['n'], 'c1', () =>
    store.read(['n']) === 1
      ? {
          message: 'constraint text carried whole',
          repair: (received) => {
            context = received;
            return { ok: false, message: 'repair text carried whole' };
          },
        }
      : true,
  );
  const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  assert.deepEqual(Object.keys(context).sort(), ['address', 'id', 'op', 'pending', 'tier', 'value']);
  assert.equal(context.id, 'c1');
  assert.deepEqual(context.address, ['n']);
  assert.equal(context.tier, 'mem');
  const repairs = ofKind(caught.log, 'repair-run');
  assert.equal(repairs[0].message, 'repair text carried whole', 'the repair\u2019s own text, never rewritten');
  assert.equal(ofKind(caught.log, 'constraint-check')[0].message, 'constraint text carried whole');
});

test('unit · parameter-semantics.md §2.5 (`PAR-C-5`) · THE CONSTRAINT\'S OUTCOME IS A CLOSED THREE-ARM SET — `true`, `{repair, message}`, `{message}` — AND NO TRUTHY VALUE IS A PASS: every outside form is read as the `{message}` arm', () => {
  for (const outside of [false, 0, '', 'pass', {}, [], () => true, { ok: true }]) {
    const store = make();
    store.write(['n'], 'mem', 0);
    register(store, ['n'], 'c1', () => (store.read(['n']) === 1 ? outside : true));
    const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
    assert.equal(caught.status, 'KC-3', `the constraint returned ${JSON.stringify(outside)} and no pass may be inferred`);
  }
});

test('unit · attempt-lifecycle.md §2.4 item 4 arms `(e)`/`(f)` · A REPEAT VIOLATION IS `KC-5` WHERE THE PAIR\'S REPAIR IS RECORDED AS APPLIED AND `KC-6` WHERE IT IS NOT — the repair\'s own edit broken by another repair, versus a repair the attempt never applied', () => {
  // `(e)`: the repair runs, its op lands, and the pair violates AGAIN with the repair already recorded.
  const applied = make();
  applied.write(['n'], 'mem', 0);
  register(applied, ['n'], 'R', repairElsewhere(applied, ['n'], 1, ['z']));
  const caughtApplied = catchIt(() => runAttempt(applied, commit(applied, ['n'], 'mem', 1)));
  assert.equal(caughtApplied.status, 'KC-5');
  assert.equal(ofKind(caughtApplied.log, 'repair-run').length, 1, 'the arm\u2019s own repair-run count is 1 and never 0');

  // `(f)`: a pair that RAN and passed is broken by ANOTHER pair's repair, and its own repair never ran.
  const never = make();
  never.write(['a'], 'mem', 0);
  never.write(['c'], 'mem', 0);
  register(never, ['a'], 'A', () => (never.read(['c']) === 9 ? { message: 'A: c must stay 0' } : true));
  register(never, ['a'], 'B', () =>
    never.read(['a']) === 1 && never.read(['c']) === 0
      ? {
          message: 'B: set c to 9',
          repair: () => ({ ok: true, op: never.write(['c'], 'mem', 9).op }),
        }
      : true,
  );
  const caughtNever = catchIt(() => runAttempt(never, commit(never, ['a'], 'mem', 1)));
  assert.equal(caughtNever.status, 'KC-6');
  assert.equal(ofKind(caughtNever.log, 'constraint-check').filter((entry) => entry.id === 'A').length, 2);
});

test('unit · parameter-semantics.md §2.9 (`PAR-C-9`) · THE APPLIED-REPAIR MARKER IS PER ATTEMPT AND FOR NO OTHER: a second, SEPARATE attempt at the same address runs the SAME repair AGAIN, with its OWN `repair-run` entry', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'R', repairElsewhere(store, ['n'], 1, ['z']));
  const first = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  const second = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  assert.equal(first.status, 'KC-5');
  assert.equal(second.status, 'KC-5');
  assert.equal(ofKind(first.log, 'repair-run').length, 1);
  assert.equal(ofKind(second.log, 'repair-run').length, 1, 'the second attempt\u2019s marker started EMPTY');
  assert.notDeepEqual(first.log, second.log, 'the two logs are two records and never one shared list');
});

test('unit · kernel-surface.md §2.5 item 1 · `LogEntry` CARRIES EXACTLY SIX MEMBERS — `{seq, kind, id, message, opId, state}` — with `seq` strictly increasing from `1`, `kind` one of the four, and `state` `null` on the three non-`outcome` kinds', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  store.write(['m'], 'mem', 0);
  register(store, ['n'], 'c1', () =>
    store.read(['n']) === 1 && store.read(['m']) !== 2
      ? {
          message: 'v',
          repair: () => ({ ok: true, op: store.write(['m'], 'mem', 2).op }),
        }
      : true,
  );
  register(store, ['m'], 'c2', () => true);
  const attemptReport = runAttempt(store, commit(store, ['n'], 'mem', 1));
  assert.ok(attemptReport.log.length >= 3);
  attemptReport.log.forEach((entry, index) => {
    assert.deepEqual(Object.keys(entry).sort(), [...LOG_MEMBERS].sort());
    assert.equal(entry.seq, index + 1, 'the kernel\u2019s own append ordinal, strictly increasing from 1');
    assert.equal(LOG_KINDS.includes(entry.kind), true);
    assert.equal(typeof entry.message, 'string');
    if (entry.kind === 'outcome') {
      assert.match(entry.state, /^KC-[1-9]$/);
    } else {
      assert.equal(entry.state, null);
    }
  });
});

test('unit · kernel-surface.md §2.5 item 1\'s kind table · WHAT THE LOG CARRIES BY KIND: a `constraint-check` entry carries the constraint\'s own text where it supplied one, a `repair-run` entry the repair\'s own, the `commit` entry the kernel\'s own and names no store code, and the `outcome` entry the terminal token', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'c1', () =>
    store.read(['n']) === 1
      ? {
          message: 'the constraint\u2019s own sentence',
          repair: () => ({ ok: false, message: 'the repair\u2019s own sentence' }),
        }
      : true,
  );
  const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  assert.equal(ofKind(caught.log, 'constraint-check')[0].message, 'the constraint\u2019s own sentence');
  assert.equal(ofKind(caught.log, 'repair-run')[0].message, 'the repair\u2019s own sentence');
  const outcome = ofKind(caught.log, 'outcome');
  assert.equal(outcome.length, 1, 'ONE outcome entry and never two');
  assert.equal(outcome[0], caught.log[caught.log.length - 1], 'the outcome entry is LAST');
  assert.equal(outcome[0].state, caught.status, 'the entry\u2019s state and the form\u2019s status read the SAME token');

  // The passing arm appends the `commit` entry, and its text is the kernel's own — a STORE code may never be
  // its state, and the entry names none.
  const passing = make();
  assert.equal(runAttempt(passing, commit(passing, ['a'], 'mem', 1)).log.at(-1).kind, 'commit');
  assert.equal(/^KC-/.test(runAttempt(passing, commit(passing, ['b'], 'mem', 1)).log.at(-1).state ?? ''), false);
});

test('unit · fail-surface.md §1.1 item 3 · A FAILURE\'S `log` IS THE ATTEMPT\'S OWN LIST, CARRIED AND NOT COPIED — and from 2026-10-28 (`D-58`) the list the refusal carries is THE HANDED-OFF RECORD\'s, which the store no longer retains', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'c1', () => (store.read(['n']) === 1 ? { message: 'violated' } : true));
  const issued = commit(store, ['n'], 'mem', 1);
  // THE OPEN LIST IS NOT A CONSUMER READ (`D-58`): the live arm is `KC-7`, so the list before the pass is the
  // empty one BY CONSTRUCTION, and the entries below are the two the closing out appended.
  assert.equal(catchIt(() => log(store, issued.attempt)).status, 'KC-7');
  const caught = catchIt(() => runAttempt(store, issued));
  assert.equal(caught.status, 'KC-3');
  assert.equal(caught.log.length, 0 + 2, 'a constraint-check entry and the ONE outcome entry were appended');
  assert.deepEqual(caught.log.map((entry) => entry.kind), ['constraint-check', 'outcome'],
    'and the list the refusal carries is the commit\'s ONE list, entry for entry');
  // THE STORE RETAINS NO LOG AFTER THE HANDOFF (`D-58`): the record it still answers keeps the arm and lets the
  // entries go — the refusal the caller caught is the one holding them.
  const retained = report(store, issued.attempt);
  assert.equal(retained.outcome, 'failed');
  assert.equal('log' in retained, false, 'the retained record answers no log');
  assert.deepEqual(log(store, issued.attempt), [], 'and `K-4` answers the empty retained list');
});

test('unit · attempt-lifecycle.md §2.4 item 4 arm `(c)` · `FAILING` APPENDS THE FAILING ENTRY AND THE `outcome` ENTRY, COMPOSES THE PER-OP ROLLBACK, AND ONLY THEN THROWS — the report reached afterwards carries one six-member `RollbackStep` per PERFORMED call', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'c1', () => (store.read(['n']) === 1 ? { message: 'violated' } : true));
  const issued = commit(store, ['n'], 'mem', 1);
  const caught = catchIt(() => runAttempt(store, issued));
  assert.equal(caught.status, 'KC-3');
  const closed = report(store, issued.attempt);
  assert.equal(closed.ops.length, 1, 'the attempt created ONE op — the write\u2019s');
  assert.equal(closed.rollback.length, 1, 'one step per performed call');
  assert.deepEqual(Object.keys(closed.rollback[0]).sort(), [...STEP_MEMBERS].sort());
  assert.equal(closed.rollback[0].opId, issued.op.opId, 'the opId the kernel PASSED, echoed');
  assert.equal(closed.rollback[0].failed, false);
  assert.equal(closed.rollback[0].answer, 'ok');
  assert.deepEqual(closed.rollback[0].undoneOps, [issued.op.opId], 'the store\u2019s own `undoneOps`, VERBATIM');
  assert.deepEqual(closed.rollback[0].restoredTo, { present: true, value: 0 }, 'the store\u2019s own `restoredTo`, VERBATIM');
});

test('unit · parameter-semantics.md §2.3 (`PAR-C-3`) and kernel-surface.md §2.3 item 1 · A CONSTRAINT IS INVOKED WITH ONE ARGUMENT — the FIVE-member `AttemptContext {address, tier, value, attempt, op}` — and the attempt\'s own `op` is the one the pass is evaluating', () => {
  const store = make();
  const seen = [];
  register(store, ['a'], 'c1', (context) => {
    seen.push(context);
    return true;
  });
  const issued = commit(store, ['a'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  assert.equal(attemptReport.outcome, 'passed');
  assert.ok(seen.length >= 2, 'the registration evaluation and the pass’s landing evaluation both ran');
  for (const context of seen) {
    assert.deepEqual(Object.keys(context).sort(), ['address', 'attempt', 'op', 'tier', 'value']);
    assert.deepEqual(context.address, ['a']);
  }
  // `kernel-surface.md §2.3` item 1's registration-instant clause: at the registration no landing exists, so
  // `tier` and `op` are ABSENT and spelled `null`, `attempt` is `null` at state 1, and `value` is the
  // store’s CURRENT value read (not landed).
  const registration = seen[0];
  assert.equal(registration.tier, null);
  assert.equal(registration.op, null);
  assert.equal(registration.attempt, null);
  // … and at an address HOLDING NOTHING the store's own `read` refuses `AddressNotFound`, so the declared
  // content of `value` is `undefined` — *"no value stands here"* — and never a `null` answer.
  assert.equal(registration.value, undefined);
  // And the landing evaluation carries the write’s own three values VERBATIM.
  const landing = seen.slice(1).find((context) => context.op !== null);
  assert.equal(landing.tier, 'mem');
  assert.equal(landing.value, 1);
  assert.equal(landing.op.opId, issued.op.opId);
  assert.equal(landing.attempt.id, issued.attempt.id);
});

test('unit · attempt-lifecycle.md §2.4 item 4 arm `(d)` and kernel-surface.md §2.3 item 2 · A REPAIR WHOSE OWN STORE VERB IS REFUSED IS `KC-4`, AND THE STORE\'S OWN CODE IS NAMED INSIDE THE `repair-run` ENTRY\'S `message` AS THE STORE\'S ANSWER — never as the thrown `status`', () => {
  const store = make();
  store.write(['n'], 'mem', 0);
  register(store, ['n'], 'c1', () =>
    store.read(['n']) === 1
      ? {
          message: 'v',
          repair: () => {
            // The store's own write inside the attempt's own window is the declared channel — and a store
            // refusal is the STORE'S code, named inside the entry's message (`§2.5` item 1's kind table).
            try {
              const landed = store.write(['n'], 'mem', 2);
              return { ok: true, op: landed.op };
            } catch (refused) {
              return { ok: false, message: 'the store refused: ' + refused.status };
            }
          },
        }
      : true,
  );
  const caught = catchIt(() => runAttempt(store, commit(store, ['n'], 'mem', 1)));
  assert.equal(caught.status, 'KC-4');
  assert.equal(caught.status.startsWith('KC-'), true, 'a `KC` token and never a store code');
  const repairs = ofKind(caught.log, 'repair-run');
  assert.equal(repairs.length, 1);
  assert.equal(typeof repairs[0].message, 'string');
  assert.equal(repairs[0].state, null);
});
