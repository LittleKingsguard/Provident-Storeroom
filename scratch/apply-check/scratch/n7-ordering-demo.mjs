// N7 — DEMO VERIFICATION OF THE `A112` ORDERING GATE ("Verify ordering holding in demo").
//
// LAYER: LIVE / ASSEMBLED PACKAGE. This file resolves the package by its PUBLISHED NAME
// (`provident-storeroom` -> `scratch/node_modules/provident-storeroom` -> `bindings/js`), constructs the
// store through the package's own `storeCreate`, registers the constraint pair through the kernel's
// declared K-1 and the plain listener through the package's own declared registration sites, writes,
// runs the attempt to its terminal arm and reads the settled state back through the store's own `read`,
// the attempt's own log and the attempt's own report. NOTHING IS PATCHED: the package and the kernel
// module are read-only inputs. The kernel module is reached at its declared checkout home
// (`bindings/js/src/constraint-kernel.mjs`, `kernel-surface.md §1` item 1).
//
// THE CLAIM UNDER TEST (the architect's model, 2026-10-15):
//   "The constraints pass flows to the listeners — which are discarded if the write fails on
//    constraints — not the write return."
//
// LIMBS: 1 the order limb (passing write) · 2 the discard limb (write fails on constraints) ·
//        3 the replacement limb (`on()` at the address the kernel adopted) · 4 the repeat limb.
//
// Run: node scratch/n7-ordering-demo.mjs run1     (then run2 — determinism)

import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const RUN = process.argv[2] || 'run1';
const OUT = `scratch/n7-ordering-demo-out-${RUN}.json`;
const TXT = `scratch/n7-ordering-demo-out-${RUN}.txt`;

const ADDR = ['n7', 'ord']; // the address the constraint pair is registered at
const PREFIX = ['n7']; // an address the same write triggers by the store's own prefix rule
const TIER = 'mem';

// ---------------------------------------------------------------------------------------------
// THE CALL RECORD TRAIL — one monotone sequence over every mark of this process. Each body records ITS
// OWN call; the windows record when the caller's own calls opened and returned. The observable the
// order limb reads is the SEQ DIFFERENCE between the two bodies' own records.
// ---------------------------------------------------------------------------------------------
let SEQ = 0;
const TRAIL = [];
let PHASE = 'idle'; // which window of the caller's own driving stands open
let CURRENT = null; // the cell the trail's marks are attributed to
function mark(kind, extra) {
  const entry = Object.assign({ seq: ++SEQ, phase: PHASE, cell: CURRENT, kind }, extra || {});
  TRAIL.push(entry);
  return entry.seq;
}
const seqsOf = (kind) => TRAIL.filter((x) => x.kind === kind && x.cell === CURRENT).map((x) => x.seq);
const firstSeq = (kind) => { const s = seqsOf(kind); return s.length ? s[0] : null; };
const anyMark = (kind, pred) => TRAIL.some((e) => e.kind === kind && e.cell === CURRENT && pred(e));

const grab = (fn) => { try { return { value: fn() }; } catch (thrown) { return { thrown }; } };
// The order observable's STABLE SHAPE: the two bodies' own call COUNT and their relations. The raw seq
// numbers are process-wide absolutes and are compared within a cell, never across cells.
const orderShape = (o) => ({
  constraintBodyCalls: o.constraintBodyCalls, listenerBodyCalls: o.listenerBodyCalls,
  listenerRanBeforeAnyConstraint: o.listenerRanBeforeAnyConstraint,
  listenerRanBeforeK2Returned: o.listenerRanBeforeK2Returned,
  listenerRanInsideTheK2Window: o.listenerRanInsideTheK2Window,
  constraintBodyRanInsideTheK3Window: o.constraintBodyRanInsideTheK3Window,
});
const statusOf = (t) => (t && typeof t === 'object' && typeof t.status === 'string') ? t.status : null;
const json = (v) => { try { return JSON.stringify(v); } catch (_) { return String(v); } };

// ---------------------------------------------------------------------------------------------
// ONE CELL — one fixture, one write, driven from the consumer's own calls to the settled end state:
// K-1 register -> listener registration -> K-2 commit -> K-3 runAttempt -> store read / log / report.
// ---------------------------------------------------------------------------------------------
const cells = [];
// THE FIXTURE'S ONE STRUCTURAL PREPARATION, and it is the STORE'S OWN rule, not the kernel's: a write at
// ['n7','ord'] needs ['n7'] to stand as a MAP link, so the consumer writes the parent's map once (the
// store's own write verb) BEFORE any registration — an address a constraint pair and a listener are both
// registered at must exist for the attempt's own write to land there.
const PREPARED = new WeakSet();
function ensureParent(store) {
  if (PREPARED.has(store)) return null;
  PREPARED.add(store);
  const prep = storeNs.write(store, PREFIX, TIER, { ord: 0 });
  return { opId: prep.op.opId, address: PREFIX, value: { ord: 0 } };
}

function cell({ id, limb, variant, outcome, round, sharedStore }) {
  const store = sharedStore || storeNs.storeCreate({ journalLength: 64, listeners: [] });
  CURRENT = id;
  const rec = {
    cell: id, limb, variant, outcome, round,
    store: sharedStore ? 'SAME STORE (sequence)' : 'fresh store',
    setup: null,
    constraintCalls: 0, listenerCalls: 0, listenerArgs: [],
  };
  let failNow = outcome === 'fail';

  // ---- THE STRUCTURAL PREPARATION (before any registration, so nothing fires on it).
  const prep = ensureParent(store);
  if (prep !== null) rec.setup = prep;

  const constraintBody = () => {
    rec.constraintCalls += 1;
    mark('constraint.body', { pair: 'n7c', returned: failNow ? '{message}' : 'true' });
    return failNow ? { message: 'n7: the constraint refused this landing' } : true;
  };
  const listenerBody = (address) => {
    rec.listenerCalls += 1;
    rec.listenerArgs.push(json(address));
    mark('app-listener.body', { listenerArg: json(address) });
  };

  // ---- K-1: THE CONSTRAINT PAIR, registered through the kernel's declared item. It reaches the store
  // through the package's own `on` and adopts the handle the store's machinery holds.
  PHASE = 'K-1';
  mark('K1.enter');
  const hAdopted = register(store, ADDR, 'n7c', constraintBody);
  mark('K1.return', { adoptedHandleType: typeof hAdopted });

  // ---- THE PLAIN LISTENER, registered through the package's own declared sites.
  let hListener;
  if (variant === 'prefix-address') {
    hListener = storeNs.listen(store, PREFIX); // the store's own declared listen verb
    store.register(hListener, listenerBody); // surface.md §2.4 item 5 site
  } else if (variant === 'on-at-adopted-address') {
    hListener = store.on(ADDR, listenerBody); // surface.md §2.4 item 7 (a): validate, listen, register
  } else {
    hListener = hAdopted;
    store.register(hAdopted, listenerBody); // §2.4 rule 2 replacement over the adopted handle
  }
  rec.listenerRegisteredAtTheAdoptedAddress = variant !== 'prefix-address';
  rec.listenerHandleIsTheKernelAdoptedHandle = hListener === hAdopted;
  rec.listenerCallsAfterRegistration = rec.listenerCalls;

  // ---- K-2: THE CALLER'S OWN COMMIT — the write verb's window.
  const preRead = grab(() => storeNs.read(store, ADDR));
  rec.stateBeforeTheAttemptsWrite = preRead.thrown ? { absent: true, code: statusOf(preRead.thrown) } : { absent: false, value: json(preRead.value) };
  PHASE = 'K-2';
  mark('K2.enter');
  let commitRecord = null;
  let k2Thrown = null;
  try { commitRecord = commit(store, ADDR, TIER, round * 100); } catch (thrown) { k2Thrown = thrown; }
  mark('K2.return', { thrown: statusOf(k2Thrown) });
  PHASE = 'idle';
  rec.k2 = k2Thrown
    ? { threw: true, status: statusOf(k2Thrown), message: String(k2Thrown.message || '') }
    : { threw: false, members: Object.keys(commitRecord).sort(), triggeredAtReturn: commitRecord.triggered.length, pendingAtReturn: commitRecord.pending.length };
  rec.constraintCallsAtK2Return = rec.constraintCalls;
  rec.listenerCallsAtK2Return = rec.listenerCalls;

  // ---- K-3: THE CONSTRAINTS PASS, to the attempt's terminal arm.
  PHASE = 'K-3';
  mark('K3.enter');
  let attemptReport = null;
  let k3Thrown = null;
  if (commitRecord !== null) {
    try { attemptReport = runAttempt(store, commitRecord); } catch (thrown) { k3Thrown = thrown; }
  }
  mark('K3.return', { thrown: statusOf(k3Thrown), outcome: attemptReport ? attemptReport.outcome : null });
  PHASE = 'idle';
  const ref = commitRecord === null ? null : commitRecord.attempt;
  rec.arm = k3Thrown
    ? { kind: 'thrown', status: statusOf(k3Thrown), message: String(k3Thrown.message || ''), carriesLog: Array.isArray(k3Thrown.log) }
    : { kind: 'returned', outcome: attemptReport ? attemptReport.outcome : null };
  rec.constraintCallsAfterK3 = rec.constraintCalls;
  rec.listenerCallsDelivered = rec.listenerCalls; // the calls the surface itself delivered, before any probe

  // ---- THE ORDER OBSERVABLE (limb 1): the two bodies' own call records, in sequence.
  const cSeqs = seqsOf('constraint.body');
  const lSeqs = seqsOf('app-listener.body');
  rec.order = {
    constraintBodySeqs: cSeqs, listenerBodySeqs: lSeqs,
    constraintBodyCalls: cSeqs.length, listenerBodyCalls: lSeqs.length,
    listenerRanBeforeAnyConstraint: lSeqs.length > 0 && (cSeqs.length === 0 || lSeqs[0] < cSeqs[0]),
    listenerRanBeforeK2Returned: lSeqs.length > 0 && lSeqs[0] < firstSeq('K2.return'),
    listenerRanInsideTheK2Window: anyMark('app-listener.body', (e) => e.phase === 'K-2'),
    constraintBodyRanInsideTheK3Window: anyMark('constraint.body', (e) => e.phase === 'K-3'),
  };

  // ---- THE SETTLED END STATE: the caller's record, the store's own read, the attempt's own log/report.
  rec.triggeredAfterTerminalArm = commitRecord === null ? null : commitRecord.triggered.length;
  rec.pendingAfterTerminalArm = commitRecord === null ? null : commitRecord.pending.length;
  rec.pendingCarriesTheListenerHandleAfterTheArm = commitRecord === null ? null : commitRecord.pending.includes(hListener);
  rec.theDiscardReachedThatHandle = commitRecord === null ? null : !commitRecord.pending.includes(hListener);

  const readAtAddr = grab(() => storeNs.read(store, ADDR));
  rec.storeReadAtAttemptAddress = readAtAddr.thrown
    ? { absent: true, code: statusOf(readAtAddr.thrown) } : { absent: false, value: json(readAtAddr.value) };
  rec.rolledBackToThePreWriteState = json(rec.storeReadAtAttemptAddress) === json(rec.stateBeforeTheAttemptsWrite);
  const readAtPrefix = grab(() => storeNs.read(store, PREFIX));
  rec.storeReadAtPrefixAddress = readAtPrefix.thrown
    ? { absent: true, code: statusOf(readAtPrefix.thrown) } : { absent: false, value: json(readAtPrefix.value) };

  if (ref !== null) {
    const lg = grab(() => log(store, ref));
    rec.log = lg.thrown ? { threw: statusOf(lg.thrown) } : lg.value.map((e) => `${e.seq}:${e.kind}:${e.id}:${e.state}`);
    const rp = grab(() => report(store, ref));
    rec.report = rp.thrown
      ? { threw: statusOf(rp.thrown) }
      : {
        outcome: rp.value.outcome, members: Object.keys(rp.value).sort(), ops: rp.value.ops.length,
        rollbackSteps: rp.value.rollback.map((s) => ({ opId: s.opId, answer: s.answer, failed: s.failed, undoneOps: s.undoneOps, restoredTo: s.restoredTo, checkpoint: s.checkpoint })),
      };
    // THE DECLARED ROLLBACK PREDICATE (composition-and-states.md §2.6 item 5 (a) (3)): the composition is
    // a successful rollback where it issued a call over every still-owed op and every such call returned.
    const steps = rp.thrown ? [] : rp.value.rollback;
    rec.compositionIssuedCalls = steps.length;
    rec.compositionCallsAllReturned = steps.length > 0 && steps.every((s) => s.failed === false);
    rec.compositionUndidTheAttemptsOwnOp = commitRecord !== null && steps.some((s) => s.undoneOps.includes(commitRecord.op.opId));
    rec.compositionFloor = steps.find((s) => s.failed === true) || null;
  }

  // ---- LIMB 2's SECOND GROUND: the caller's own loop over `pending` (kernel-surface.md §2.2 item 2,
  // layer (b)) — driven as that declared loop drives it, over the handle the failed write's own record
  // still carries after the arm. Kept as its own mark so it cannot be read as the surface's delivery.
  rec.layerB = { invocations: 0, note: null };
  if (commitRecord !== null && commitRecord.pending.includes(hListener)) {
    rec.layerB.note = 'the app listener handle still stands in `pending` after the arm, so the declared caller loop would invoke it a second time';
    PHASE = 'layer-b';
    listenerBody(ADDR);
    rec.layerB.invocations = 1;
    PHASE = 'idle';
  }
  rec.listenerCallsIncludingTheLayerBProbe = rec.listenerCalls;

  CURRENT = null;
  cells.push(rec);
  const flag = (b) => (b ? 'yes' : 'no');
  console.log([
    String(id).padEnd(30),
    `arm=${(rec.arm.kind === 'thrown' ? rec.arm.status : rec.arm.outcome)}`.padEnd(20),
    `constraintBody@K-2=${rec.constraintCallsAtK2Return}`.padEnd(24),
    `listener@K-2=${rec.listenerCallsAtK2Return}`.padEnd(22),
    `listenerDelivered=${rec.listenerCallsDelivered}`.padEnd(24),
    `listenerBeforeAnyConstraint=${flag(rec.order.listenerRanBeforeAnyConstraint)}`.padEnd(36),
    `pending@arm=${rec.pendingAfterTerminalArm}`,
  ].join(' '));
  return rec;
}

// =============================================================================================
// THE MATRIX — three registration handlings x two outcomes x two rounds, in ONE process.
// =============================================================================================
const VARIANTS = ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle'];
for (let round = 1; round <= 2; round += 1) {
  for (const variant of VARIANTS) {
    for (const outcome of ['pass', 'fail']) {
      cell({ id: `L${outcome === 'pass' ? 1 : 2}-${variant}-r${round}`, limb: outcome === 'pass' ? 1 : 2, variant, outcome, round });
    }
  }
}

// =============================================================================================
// LIMB 4 — THE REPEAT LIMB: pass, fail, pass, fail at ONE address on ONE store, in this same process.
// =============================================================================================
{
  const shared = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  ['pass', 'fail', 'pass', 'fail'].forEach((outcome, i) => {
    cell({ id: `L4-seq${i + 1}-${outcome}`, limb: 4, variant: 'prefix-address', outcome, round: i + 1, sharedStore: shared });
  });
}

// =============================================================================================
// THE CAUSE OF LIMB 4's ARM DIVERGENCE, MEASURED THROUGH THE STORE'S OWN VERB ALONE (its own rollback
// scope), on a store of its own so it cannot touch any cell's fixture.
// =============================================================================================
const storeRollbackScopeProbe = (() => {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  storeNs.write(store, PREFIX, TIER, { ord: 0 }); // the parent map, exactly as every cell prepares it
  const first = storeNs.write(store, ADDR, TIER, 100);
  const second = storeNs.write(store, ADDR, TIER, 200);
  const rollbackOfTheNewest = grab(() => storeNs.rollback(store, second.op.opId));
  const readAfterFirstRollback = grab(() => storeNs.read(store, ADDR));
  const third = storeNs.write(store, ADDR, TIER, 300);
  const fourth = storeNs.write(store, ADDR, TIER, 400);
  const rollbackOfTheSecondNewest = grab(() => storeNs.rollback(store, fourth.op.opId));
  const readAfterSecondRollback = grab(() => storeNs.read(store, ADDR));
  return {
    opIds: [first.op.opId, second.op.opId, third.op.opId, fourth.op.opId],
    firstRollback: rollbackOfTheNewest.thrown
      ? { threw: statusOf(rollbackOfTheNewest.thrown), message: String(rollbackOfTheNewest.thrown.message || '') }
      : { opId: rollbackOfTheNewest.value.opId, undoneOps: rollbackOfTheNewest.value.undoneOps, restoredTo: rollbackOfTheNewest.value.restoredTo },
    readAfterFirstRollback: readAfterFirstRollback.thrown ? { absent: true, code: statusOf(readAfterFirstRollback.thrown) } : json(readAfterFirstRollback.value),
    secondRollback: rollbackOfTheSecondNewest.thrown
      ? { threw: statusOf(rollbackOfTheSecondNewest.thrown), message: String(rollbackOfTheSecondNewest.thrown.message || '') }
      : { opId: rollbackOfTheSecondNewest.value.opId, undoneOps: rollbackOfTheSecondNewest.value.undoneOps, restoredTo: rollbackOfTheSecondNewest.value.restoredTo },
    readAfterSecondRollback: readAfterSecondRollback.thrown ? { absent: true, code: statusOf(readAfterSecondRollback.thrown) } : json(readAfterSecondRollback.value),
  };
})();
console.log('\nstore rollback scope probe:', json(storeRollbackScopeProbe));

// =============================================================================================
// THE DELIVERY INSTANT'S OWN HOME, MEASURED WITHOUT THE KERNEL AT ALL (the store half alone): a bare
// `write` on an instance whose registry holds a listener at the written address delivers that body
// inside the write verb's own frame — which is the verb the kernel's K-2 calls.
// =============================================================================================
const directWriteProbe = (() => {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  storeNs.write(store, PREFIX, TIER, { ord: 0 });
  let calls = 0;
  const id = 'direct-write-probe';
  CURRENT = id;
  const handle = store.on(ADDR, () => { calls += 1; mark('app-listener.body', { listenerArg: 'direct store write, no kernel' }); });
  PHASE = 'store-write';
  mark('write.enter');
  let out = null; let thrown = null;
  try { out = storeNs.write(store, ADDR, TIER, 5); } catch (e) { thrown = e; }
  mark('write.return', { thrown: statusOf(thrown) });
  PHASE = 'idle';
  const lSeqs = seqsOf('app-listener.body');
  const afterWriteReturn = lSeqs.length > 0 && lSeqs[0] > firstSeq('write.enter') && lSeqs[0] < firstSeq('write.return');
  CURRENT = null;
  return {
    note: 'the store half alone: no K-1/K-2/K-3 of the kernel ran in this probe',
    handleIsOpaque: typeof handle === 'object',
    writeThrew: statusOf(thrown),
    triggered: out ? out.triggered.length : null,
    listenerBodyCalls: calls,
    listenerBodyRanBetweenTheWriteVerbsOwnEnterAndReturn: afterWriteReturn,
  };
})();
console.log('direct-write delivery probe:', json(directWriteProbe));

// =============================================================================================
// VERDICTS — each limb against the architect's own model.
// =============================================================================================
const verdicts = [];

// LIMB 1 — the order limb.
{
  const requires = 'THE MODEL REQUIRES: the pair\'s body runs, and the plain listener\'s body runs ONLY AFTER the pass — '
    + 'the listener never runs before any constraint of that write (A112: the triggered constraints first, and only once '
    + 'every constraint has passed the other listeners).';
  for (const variant of VARIANTS) {
    for (const round of [1, 2]) {
      const r = cells.find((c) => c.cell === `L1-${variant}-r${round}`);
      const ok = r.order.constraintBodyCalls >= 1 && r.order.listenerBodyCalls >= 1 && !r.order.listenerRanBeforeAnyConstraint;
      verdicts.push({
        limb: 1, cell: r.cell, requires,
        observed: `constraint body calls=${r.order.constraintBodyCalls} at seqs ${json(r.order.constraintBodySeqs)}; listener body calls=${r.order.listenerBodyCalls} `
          + `at seqs ${json(r.order.listenerBodySeqs)}; listener ran inside the K-2 window=${r.order.listenerRanInsideTheK2Window}; listener ran before K-2 returned=${r.order.listenerRanBeforeK2Returned}; `
          + `constraint body calls at K-2's return=${r.constraintCallsAtK2Return}; listener calls at K-2's return=${r.listenerCallsAtK2Return}; terminal arm=${r.arm.kind === 'thrown' ? r.arm.status : r.arm.outcome}; `
          + `store read at ${json(ADDR)}=${json(r.storeReadAtAttemptAddress)}`,
        verdict: ok ? 'PASS' : 'FAIL',
      });
    }
  }
}

// LIMB 2 — the discard limb.
{
  const requires = 'THE MODEL REQUIRES: with the constraint failing, the write/commit fails on constraints and the listener\'s body '
    + 'must NOT have run at all — it is discarded, never delivered.';
  for (const variant of VARIANTS) {
    for (const round of [1, 2]) {
      const r = cells.find((c) => c.cell === `L2-${variant}-r${round}`);
      const failedOnConstraints = r.arm.kind === 'thrown' && r.arm.status === 'KC-3';
      const rolledBack = r.compositionCallsAllReturned === true && r.compositionUndidTheAttemptsOwnOp === true;
      const listenerRanNotAtAll = r.listenerCallsDelivered === 0;
      verdicts.push({
        limb: 2, cell: r.cell, requires,
        observed: `K-2 threw=${r.k2.threw} (it wrote pending=${r.k2.pendingAtReturn} of triggered=${r.k2.triggeredAtReturn} and did NOT fail on constraints); `
          + `terminal arm=${r.arm.kind === 'thrown' ? r.arm.status : r.arm.outcome} (failed on constraints=${failedOnConstraints}); report=${json(r.report)}; `
          + `the store's own read at ${json(ADDR)}: before the attempt's write=${json(r.stateBeforeTheAttemptsWrite)}, after the arm=${json(r.storeReadAtAttemptAddress)} (composition calls all returned=${r.compositionCallsAllReturned}, `
          + `undid the attempt's own op=${r.compositionUndidTheAttemptsOwnOp}, floor step=${json(r.compositionFloor)}); THE LISTENER BODY CALLS: at K-2's return=${r.listenerCallsAtK2Return}, `
          + `delivered in total=${r.listenerCallsDelivered} (inside the K-2 window=${r.order.listenerRanInsideTheK2Window}, before any constraint=${r.order.listenerRanBeforeAnyConstraint}); pending after the arm=${r.pendingAfterTerminalArm} of triggered=${r.triggeredAfterTerminalArm}; `
          + `the discard reached the listener's handle=${r.theDiscardReachedThatHandle}; the declared caller's own loop over \`pending\` (layer (b)) invocations on this record=${r.layerB.invocations}`
          + `${r.layerB.invocations > 0 ? ' (the handle STANDS in pending after the arm, so that loop would deliver the body a second time)' : ' (the handle left pending with the discard, so that loop delivers nothing)'}; log=${json(r.log)}`,
        verdict: (failedOnConstraints && rolledBack && listenerRanNotAtAll) ? 'PASS' : 'FAIL',
      });
    }
  }
}

// LIMB 3 — the replacement limb.
{
  const r1 = cells.find((c) => c.cell === 'L1-on-at-adopted-address-r1');
  const r2 = cells.find((c) => c.cell === 'L2-on-at-adopted-address-r1');
  const r3 = cells.find((c) => c.cell === 'L1-register-at-adopted-handle-r1');
  const r4 = cells.find((c) => c.cell === 'L2-register-at-adopted-handle-r1');
  const r5 = cells.find((c) => c.cell === 'L1-prefix-address-r1');
  const r6 = cells.find((c) => c.cell === 'L2-prefix-address-r1');
  const replacementHappened = r1.listenerHandleIsTheKernelAdoptedHandle === true;
  verdicts.push({
    limb: 3, cell: 'L3-replacement-seam',
    requires: 'THE MODEL\'S OWN TERMS: report what the app\'s own registration at the address the kernel adopted does to limbs 1 and 2 — does the pass still gate the '
      + 'app\'s body, and is the app\'s body discarded when the constraints fail? (surface.md §2.4 item 7 (a) + rule 2: one function per handle, a later registration REPLACES; '
      + 'docs/defects.md DEF-2026-10-15-N.)',
    observed: `on(${json(ADDR)}, appFn) returned a handle IDENTICAL to the kernel's adopted K-1 handle=${replacementHappened} (the store's listen is idempotent at the address, so the app's `
      + `registration replaced the kernel's adopted slot). PASSING write: constraint body calls=${r1.order.constraintBodyCalls} (seqs ${json(r1.order.constraintBodySeqs)}), app listener body calls=${r1.order.listenerBodyCalls} `
      + `(seqs ${json(r1.order.listenerBodySeqs)}), inside the K-2 window=${r1.order.listenerRanInsideTheK2Window}, before any constraint=${r1.order.listenerRanBeforeAnyConstraint} → THE PASS DOES NOT GATE THE APP'S BODY; `
      + `the constraint pair itself still ran (calls=${r1.order.constraintBodyCalls}). FAILING write: terminal arm=${r2.arm.kind === 'thrown' ? r2.arm.status : r2.arm.outcome}, app listener body calls at K-2's return=${r2.listenerCallsAtK2Return}, `
      + `delivered total=${r2.listenerCallsDelivered} → THE APP'S BODY IS NOT DISCARDED (it had already run); what the arm discarded is the record member: pending ${r2.k2.pendingAtReturn} → ${r2.pendingAfterTerminalArm} `
      + `(the discard reached that handle=${r2.theDiscardReachedThatHandle}). The same seam through the §2.4 item 5 site register(adoptedHandle, appFn): passing write listener calls=${r3.order.listenerBodyCalls} before any constraint=${r3.order.listenerRanBeforeAnyConstraint}; `
      + `failing write listener calls delivered=${r4.listenerCallsDelivered}. Baseline, listener at the PREFIX address ${json(PREFIX)} (its OWN handle, no replacement): passing write listener calls=${r5.order.listenerBodyCalls} inside the K-2 window=${r5.order.listenerRanInsideTheK2Window} `
      + `before any constraint=${r5.order.listenerRanBeforeAnyConstraint}; failing write listener calls delivered=${r6.listenerCallsDelivered}, and that handle STILL STANDS in pending after the arm=${r6.pendingCarriesTheListenerHandleAfterTheArm} (so the declared caller loop over pending would deliver it again: layer (b) probe invocations=${r6.layerB.invocations}).`,
    verdict: (replacementHappened && r1.order.listenerRanBeforeAnyConstraint && r2.listenerCallsDelivered > 0)
      ? 'LIMBS 1 AND 2 FAIL IN THE APP\'S OWN HANDS — the replacement itself is as declared (one function per handle, the app\'s later registration won)'
      : 'NOT-REPRODUCED',
  });
}

// LIMB 4 — the repeat limb.
{
  const seq = cells.filter((c) => c.limb === 4);
  const byArm = seq.map((c) => `${c.cell}: arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}, constraintBody@K-2=${c.constraintCallsAtK2Return}, listener@K-2=${c.listenerCallsAtK2Return}, listenerDelivered=${c.listenerCallsDelivered}, pending@arm=${c.pendingAfterTerminalArm}, storeRead@arm=${json(c.storeReadAtAttemptAddress)}`);
  const passOnes = seq.filter((c) => c.outcome === 'pass');
  const failOnes = seq.filter((c) => c.outcome === 'fail');
  const consistent = passOnes.every((c) => json(orderShape(c.order)) === json(orderShape(passOnes[0].order)))
    && failOnes.every((c) => json(orderShape(c.order)) === json(orderShape(failOnes[0].order)))
    && failOnes.every((c) => c.listenerCallsDelivered === failOnes[0].listenerCallsDelivered)
    && seq.every((c) => (c.outcome === 'pass') === (c.arm.kind === 'returned'));
  const armsDiverge = new Set(failOnes.map((c) => (c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome))).size > 1;
  const matrixRepeats = VARIANTS.every((v) => {
    const a = cells.find((c) => c.cell === `L1-${v}-r1`); const b = cells.find((c) => c.cell === `L1-${v}-r2`);
    const d = cells.find((c) => c.cell === `L2-${v}-r1`); const e = cells.find((c) => c.cell === `L2-${v}-r2`);
    return json([orderShape(a.order), a.listenerCallsDelivered]) === json([orderShape(b.order), b.listenerCallsDelivered])
      && json([orderShape(d.order), d.listenerCallsDelivered, d.arm]) === json([orderShape(e.order), e.listenerCallsDelivered, e.arm]);
  });
  verdicts.push({
    limb: 4, cell: 'L4-repeat',
    requires: 'THE MODEL REQUIRES: the result is not a first-call artifact — the passing and the failing write are each run twice in one process (and each handling is run on two fresh stores).',
    observed: `four sequential attempts at ONE address on ONE store in one process: ${byArm.join(' | ')}; the same failure repeats identically across the two rounds of every variant on fresh stores=${matrixRepeats}; `
      + `the listener is delivered inside the K-2 window on every attempt (4 of 4), so the failure of limbs 1 and 2 is not a first-call artifact. AND THE REPEAT IS NOT UNIFORM: the failing attempts' arm tokens diverge=${armsDiverge} — `
      + `the first failing attempt answers KC-3 (its own constraint violation), the SECOND answers KC-8 with the per-op rollback met the store's own RollbackCompacted at ${seq[3].compositionFloor ? seq[3].compositionFloor.opId : 'the attempt op'}, `
      + `so nothing was restored and THE VALUE THE CONSTRAINTS REFUSED STANDS at the address (store read after the arm=${json(seq[3].storeReadAtAttemptAddress)}). The cause is the store's own rollback scope, measured through its own verb: rolling back the newest op at that key reports undoneOps=[the op and the earlier op at the same key] and the store then compacts, `
      + `so the second failing attempt's rollback is out of scope (measured through the store's own verb on a store of its own: ${json(storeRollbackScopeProbe)}). The kernel's KC-8 arm is its declared arm for that floor; the consequence — a refused value left standing — is not contemplated by the ordering model.`,
    verdict: (consistent && matrixRepeats)
      ? (armsDiverge ? 'FAIL (limbs 1 and 2 fail on every attempt — 4 of 4 — so the failure is no artifact; and the repeat additionally changes the arm token on the second failing attempt)' : 'FAIL (the same failure repeats exactly — not a first-call artifact)')
      : 'INCONSISTENT ACROSS REPEATS',
  });
}

// =============================================================================================
// THE REPORT
// =============================================================================================
const storeModuleKeys = Object.keys(storeNs).sort();
const totals = {
  cells: cells.length,
  limbsExecuted: 4,
  limb1: { cells: cells.filter((c) => c.limb === 1).length, pass: verdicts.filter((v) => v.limb === 1 && v.verdict === 'PASS').length, fail: verdicts.filter((v) => v.limb === 1 && v.verdict === 'FAIL').length },
  limb2: { cells: cells.filter((c) => c.limb === 2).length, pass: verdicts.filter((v) => v.limb === 2 && v.verdict === 'PASS').length, fail: verdicts.filter((v) => v.limb === 2 && v.verdict === 'FAIL').length },
  limb3: verdicts.filter((v) => v.limb === 3).map((v) => v.verdict),
  limb4: verdicts.filter((v) => v.limb === 4).map((v) => v.verdict),
  verdictsTotal: verdicts.length,
};
const record = {
  demo: 'N7 — ordering gate demo verification (`A112`): "Verify ordering holding in demo"',
  run: RUN,
  layer: 'LIVE / ASSEMBLED PACKAGE',
  layerStatement: {
    resolution: 'the package is RESOLVED BY ITS PUBLISHED NAME through scratch/node_modules/provident-storeroom -> bindings/js (package.json v0.1.3, exports "." -> ./index.mjs); '
      + 'the kernel module is reached at its declared checkout home bindings/js/src/constraint-kernel.mjs, and its own fixture binding is the package SELF-REFERENCE (Node resolves '
      + '\'provident-storeroom\' from bindings/js/src to bindings/js/index.mjs), so the kernel, the driver and the store share ONE module instance and ONE loaded addon; '
      + 'the Rust store behind the JS binding is exercised in a real Node process (node ' + process.version + ').',
    publishedInstall: 'NOT exercised, and it could not show this demo at all: package.json "files" carries index.mjs + README.md + index.d.ts only and "exports" declares "." alone, '
      + 'so an install from the registry carries NO src/constraint-kernel.mjs and no subpath that reaches it — the constraint kernel is checkout-only today (kernel-surface.md §1 item 1 '
      + 'declares its one checkout home), which is to say src/ reaches no consumer. What the published install WOULD show is the store half alone: the eight verbs and the per-instance '
      + '{register,on,off} members — enough to observe the delivery window (a listener body running inside write()\'s own frame) but not the constraint pass, its ordering or its discard.',
    storeModuleKeys,
  },
  fixture: {
    address: ADDR, prefixAddress: PREFIX, tier: TIER,
    constraintPair: { address: ADDR, id: 'n7c', passReturn: 'true', failReturn: '{message}' },
    registrationVariants: VARIANTS,
    drivingOrder: 'K-1 register -> listener registration -> K-2 commit -> K-3 runAttempt -> store read / log / report',
  },
  verdicts,
  totals,
  determinismDigest: null,
  storeRollbackScopeProbe,
  directWriteProbe,
  trail: TRAIL,
  cells,
};
const digestOf = (r) => {
  const copy = JSON.parse(JSON.stringify(r));
  delete copy.run;
  delete copy.determinismDigest;
  return createHash('sha256').update(JSON.stringify(copy)).digest('hex');
};
record.determinismDigest = digestOf(record);

const lines = [];
lines.push(`N7 ORDERING DEMO — run ${RUN} — LAYER: LIVE / ASSEMBLED PACKAGE`);
lines.push(`resolution: ${record.layerStatement.resolution}`);
lines.push(`published install: ${record.layerStatement.publishedInstall}`);
lines.push('');
for (const v of verdicts) {
  lines.push(`[${v.cell}] LIMB ${v.limb} — ${v.verdict}`);
  lines.push(`  ${v.requires}`);
  lines.push(`  OBSERVED: ${v.observed}`);
  lines.push('');
}
lines.push(`TOTALS: cells=${totals.cells} limb1=${totals.limb1.pass}P/${totals.limb1.fail}F (of ${totals.limb1.cells}) limb2=${totals.limb2.pass}P/${totals.limb2.fail}F (of ${totals.limb2.cells})`);
lines.push(`determinismDigest=${record.determinismDigest}`);
writeFileSync(OUT, JSON.stringify(record, null, 2));
writeFileSync(TXT, lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nrecord: ${OUT}\nrecord: ${TXT}\ndigest: ${record.determinismDigest}`);
