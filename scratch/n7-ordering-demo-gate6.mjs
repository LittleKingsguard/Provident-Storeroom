// N7 — GATE 6 RE-RUN OF THE ARCHITECT'S ACCEPTANCE TEST ("Verify ordering holding in demo") AND ITS
// EXTENSION TO THE `A116` SEAM'S OWN LAW.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. The package is resolved BY ITS PUBLISHED NAME
// (`provident-storeroom` -> `scratch/node_modules/provident-storeroom` -> `bindings/js`), the store is
// built through the package's own `storeCreate` (its instance now carries the FOURTH member `settle`),
// the constraint pair is registered through the kernel's declared `register`, the write through the
// kernel's `commit`, the pass driven through `runAttempt` to its terminal arm, and the settled state read
// back through the store's own `read`, the attempt's own `log`/`report`. NOTHING IS PATCHED: the package
// and `bindings/js/src/constraint-kernel.mjs` are READ-ONLY inputs. The only wrapper this file places is
// on the INSTANCE IT ITSELF CREATED — for the trail alone (the seam's own call record); it calls through
// to the unmodified member with the same receiver and the same arguments.
//
// THE LAW THIS FILE DERIVES ITS EXPECTATIONS FROM (read at its own clauses, not from the old record):
//   `A112`/`A114`: on a write the surface runs the triggered CONSTRAINTS FIRST, and THE OTHER LISTENERS
//     ONLY ONCE EVERY CONSTRAINT HAS PASSED; a write that fails on constraints DISCARDS the listeners —
//     never delivered.
//   `A116` (the seam): the instance carries `settle(record)`, called by the KERNEL at (a) BEFORE the
//     store's write verb (the entry withholds its in-window invocation for that write) and at (b) the
//     pass's terminal arm (the entry delivers the record's `pending` RESIDUE through its own registry, one
//     invocation per handle with the triggering address as the single argument). The carrier is
//     `CommitRecord.pending`; the check-off and the DISCARD are its only removals; a BARE caller-made write
//     keeps the post-verb instant and is NEVER withheld (`§2.7` item 8).
//
// LIMBS: 1 ORDER · 2 DISCARD · 3 REPLACEMENT · 4 REPEAT · 5 BARE WRITE · 6 STALE ADOPTION.
//
// Run: node scratch/n7-ordering-demo-gate6.mjs run1   (then run2 — determinism)

import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const RUN = process.argv[2] || 'run1';
const OUT = `scratch/n7-ordering-demo-gate6-out-${RUN}.json`;
const TXT = `scratch/n7-ordering-demo-gate6-out-${RUN}.txt`;

const ADDR = ['n7', 'ord'];
const PREFIX = ['n7'];
const TIER = 'mem';
const BARE1 = ['n7', 'bare'];
const BARE2 = ['n7', 'bare2'];
const SETTLE_PROBE_ADDR = ['n7', 'settleprobe'];

// ---------------------------------------------------------------------------------------------
// THE CALL RECORD TRAIL — one monotone sequence over every mark of this process. Each BODY records its own
// call; the driver marks the instants its own calls opened and returned, and records every reach of the
// instance's `settle` member (the trail wrapper only READS the record it was handed and passes it through).
// ---------------------------------------------------------------------------------------------
let SEQ = 0;
const TRAIL = [];
let PHASE = 'idle';
let CURRENT = null;
// THE FIXTURE'S OWN PREPARATION LEDGER — one entry per store whose parent map stands already, so the
// sequence limb's later cells reuse the store's own state instead of writing the parent again.
const PREPARED = new WeakSet();
function mark(kind, extra) {
  const entry = Object.assign({ seq: ++SEQ, phase: PHASE, cell: CURRENT, kind }, extra || {});
  TRAIL.push(entry);
  return entry.seq;
}
const inCell = (kind, cell) => TRAIL.filter((x) => x.kind === kind && x.cell === cell);
const seqsOf = (kind, cell) => inCell(kind, cell).map((x) => x.seq);
const firstSeq = (kind, cell) => { const s = seqsOf(kind, cell); return s.length ? s[0] : null; };
const lastSeq = (kind, cell) => { const s = seqsOf(kind, cell); return s.length ? s[s.length - 1] : null; };
const anyInPhase = (kind, cell, phase) => TRAIL.some((e) => e.kind === kind && e.cell === cell && e.phase === phase);
const json = (v) => { try { return JSON.stringify(v); } catch (_) { return String(v); } };
const grab = (fn) => { try { return { value: fn() }; } catch (thrown) { return { thrown }; } };
const statusOf = (t) => (t && typeof t === 'object' && typeof t.status === 'string') ? t.status : null;

// ---------------------------------------------------------------------------------------------
// A STORE WITH ITS INSTANCE MEMBERS OBSERVED. `settle` is wrapped for the trail ONLY: the wrapper records
// the reach, the phase and the `pending` length it was handed, then calls the original member with the same
// receiver and the same single argument.
// ---------------------------------------------------------------------------------------------
function freshStore() {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  // THE FIXTURE'S OWN STRUCTURAL PREPARATION, TAKEN HERE — BEFORE ANY REGISTRATION AND BEFORE THE KERNEL IS
  // REACHED — because the store's own rule needs it (a write at ['n7','ord'] needs ['n7'] to stand as a MAP
  // link) and because a later write at the watched prefix would fire a stale prefix listener and be
  // attributed to the kernel write under test. Taken on a store on which NOTHING is registered, it fires
  // nothing and it never touches any measurement.
  grab(() => storeNs.write(store, PREFIX, TIER, { ord: 0 }));
  PREPARED.add(store);
  const original = store.settle;
  const wrapped = function settle(record) {
    mark('settle.reach', {
      pendingLen: record && Array.isArray(record.pending) ? record.pending.length : null,
      argIsTheKernelRecord: record !== null,
    });
    return arguments.length >= 1 ? original.call(this, record) : original.call(this);
  };
  store.settle = wrapped;
  return store;
}

function armOf(store, commitRecord) {
  try { const r = runAttempt(store, commitRecord); return { kind: 'returned', outcome: r ? r.outcome : null, report: r }; }
  catch (thrown) { return { kind: 'thrown', status: statusOf(thrown), message: String(thrown.message || ''), carriesLog: Array.isArray(thrown.log) }; }
}

const cells = [];

// ---------------------------------------------------------------------------------------------
// ONE ORDERING CELL — the shared shape of limbs 1 and 2. The constraint pair is registered at ADDR; the
// app listener is registered by one of the three declared handlings; the write is committed and the pass is
// driven to its terminal arm. The window boundary is the driver's own mark: the listener delivered BETWEEN
// `write.enter` and `write.return` is the in-window delivery the seam withholds, and any delivery after
// `K3.return` is the terminal-arm delivery the seam owes.
// ---------------------------------------------------------------------------------------------
function orderingCell({ id, limb, variant, outcome, round, sharedStore, secondPair }) {
  const store = sharedStore || freshStore();
  CURRENT = id;
  const rec = { cell: id, limb, variant, outcome, round, store: sharedStore ? 'SAME STORE (sequence)' : 'fresh store' };
  let failNow = outcome === 'fail';

  // THE FIXTURE'S OWN PREPARATION — SKIPPED HERE, because `freshStore` took it before any registration and
  // marked the store. The mark is read so the trail records that this cell wrote nothing of its own.
  const prep = grab(() => {
    if (PREPARED.has(store)) { mark('prep.skipped', { why: 'the parent map stands already, taken before any registration' }); return { op: { opId: null } }; }
    PREPARED.add(store);
    mark('prep.write');
    return storeNs.write(store, PREFIX, TIER, { ord: 0 });
  });
  rec.parentPrepared = prep.thrown ? { threw: statusOf(prep.thrown) } : { opId: prep.value.op.opId };
  rec.parentPrepared = prep.thrown ? { threw: statusOf(prep.thrown) } : { opId: prep.value.op.opId };

  const bodies = { c1: 0, c2: 0, app: 0 };
  const appArgs = [];
  const constraintBody = (tag) => () => {
    bodies[tag] += 1;
    mark(tag === 'c1' ? 'constraint1.body' : 'constraint2.body', { returned: failNow ? '{message}' : 'true' });
    return failNow ? { message: `n7: the constraint ${tag} refused this landing` } : true;
  };
  const appBody = (address) => { bodies.app += 1; appArgs.push(json(address)); mark('app-listener.body', { listenerArg: json(address) }); };

  PHASE = 'K-1';
  mark('K1.enter');
  const hAdopted = register(store, ADDR, 'n7c', constraintBody('c1'));
  mark('K1.return', { adoptedHandleType: typeof hAdopted });
  rec.kernelAdoptedHandleClass = typeof hAdopted;
  let hAdopted2 = null;
  if (secondPair) {
    mark('K1b.enter');
    hAdopted2 = register(store, ADDR, 'n7c2', constraintBody('c2'));
    mark('K1b.return');
  }

  let hApp;
  if (variant === 'prefix-address') {
    hApp = storeNs.listen(store, PREFIX);
    store.register(hApp, appBody);
  } else if (variant === 'on-at-adopted-address') {
    hApp = store.on(ADDR, appBody);
  } else {
    hApp = hAdopted;
    store.register(hAdopted, appBody);
  }
  rec.appHandleIsTheKernelAdoptedHandle = hApp === hAdopted;
  rec.appHandleSecondPairAlsoAdopted = secondPair ? hApp === hAdopted2 : null;
  rec.bodiesAfterRegistration = Object.assign({}, bodies);

  const preRead = grab(() => storeNs.read(store, ADDR));
  rec.stateBeforeTheWrite = preRead.thrown ? { absent: true, code: statusOf(preRead.thrown) } : { absent: false, value: json(preRead.value) };
  // THE BASELINE the delivery delta is read against: the fixture's own preparation (a bare write at the
  // prefix) has already delivered to a prefix-addressed listener, so only the DELTA over this write is the
  // surface's delivery for it.
  rec.bodiesBeforeThisWrite = Object.assign({}, bodies);

  PHASE = 'K-2';
  mark('K2.enter');
  let commitRecord = null; let k2Thrown = null;
  try { commitRecord = commit(store, ADDR, TIER, round * 100); } catch (thrown) { k2Thrown = thrown; }
  mark('K2.return', { thrown: statusOf(k2Thrown) });
  rec.settleReachesInsideK2 = inCell('settle.reach', id).filter((e) => e.phase === 'K-2').map((e) => e.seq);
  rec.bodiesAtK2Return = Object.assign({}, bodies);
  PHASE = 'idle';
  rec.k2 = k2Thrown
    ? { threw: true, status: statusOf(k2Thrown) }
    : { threw: false, triggeredAtReturn: commitRecord.triggered.length, pendingAtReturn: commitRecord.pending.length };

  PHASE = 'K-3';
  mark('K3.enter');
  const k3 = commitRecord === null ? null : armOf(store, commitRecord);
  mark('K3.return', { thrown: k3 ? statusOf(k3.status || null) : null, outcome: k3 ? (k3.outcome || null) : null });
  rec.settleReachesInsideK3 = inCell('settle.reach', id).filter((e) => e.phase === 'K-3').map((e) => e.seq);
  PHASE = 'idle';
  rec.arm = k3 ? { kind: k3.kind, status: k3.status || null, outcome: k3.outcome || null } : { kind: 'no-record' };
  rec.bodiesAfterTheArm = Object.assign({}, bodies);
  // THE DELIVERY THIS WRITE OWED: the bodies' own call records read from the registration that precedes the
  // write's commit to the arm — the whole of what this write delivered, on a fresh store or on a shared one.
  rec.delivered = {
    c1: bodies.c1 - rec.bodiesAfterRegistration.c1,
    c2: bodies.c2 - rec.bodiesAfterRegistration.c2,
    app: bodies.app - rec.bodiesAfterRegistration.app,
  };
  rec.appListenerArgs = appArgs;
  rec.appListenerArgsThisWrite = appArgs.slice(rec.bodiesAfterRegistration.app);
  rec.triggeringAddressInTheArg = rec.appListenerArgsThisWrite.length > 0 && rec.appListenerArgsThisWrite[0] === json(ADDR);

  // THE ORDER OBSERVABLE: each body's own call record and the window each call stood in.
  const c1 = seqsOf('constraint1.body', id);
  const c2 = seqsOf('constraint2.body', id);
  const app = seqsOf('app-listener.body', id);
  rec.order = {
    constraint1BodySeqs: c1, constraint2BodySeqs: c2, appListenerSeqs: app,
    constraint1BodyCalls: c1.length, constraint2BodyCalls: c2.length, appListenerCalls: app.length,
    appListenerCallsInTheWriteWindow: inCell('app-listener.body', id).filter((e) => e.phase === 'K-2').length,
    appListenerCallsInsideTheK3Window: inCell('app-listener.body', id).filter((e) => e.phase === 'K-3').length,
    appListenerRanBeforeAnyConstraint: app.length > 0 && (c1.length === 0 || app[0] < c1[0]),
    appListenerRanBeforeEveryConstraint: app.length > 0 && (c1.length === 0 || c2.length === 0 || app[0] < Math.max(c1[0], c2[0])),
    appListenerRanAtTheTerminalArm: app.length > 0 && lastSeq('K3.enter', id) !== null && app[0] > lastSeq('K3.enter', id),
  };
  rec.order.firstDeliverySeq = app.length ? app[0] : null;
  rec.order.k3EnterSeq = firstSeq('K3.enter', id);
  rec.order.k3ReturnSeq = firstSeq('K3.return', id);

  // THE SETTLED END STATE.
  rec.triggeredAfterTheArm = commitRecord === null ? null : commitRecord.triggered.length;
  rec.pendingAfterTheArm = commitRecord === null ? null : commitRecord.pending.length;
  rec.theAppHandleStandsInPendingAfterTheArm = commitRecord === null ? null : commitRecord.pending.includes(hApp);
  const readAtAddr = grab(() => storeNs.read(store, ADDR));
  rec.storeReadAtAttemptAddress = readAtAddr.thrown ? { absent: true, code: statusOf(readAtAddr.thrown) } : { absent: false, value: json(readAtAddr.value) };
  if (commitRecord !== null) {
    const ref = commitRecord.attempt;
    const lg = grab(() => log(store, ref));
    rec.log = lg.thrown ? { threw: statusOf(lg.thrown) } : lg.value.map((e) => `${e.seq}:${e.kind}:${e.id}:${e.state}`);
    const rp = grab(() => report(store, ref));
    rec.report = rp.thrown ? { threw: statusOf(rp.thrown) }
      : { outcome: rp.value.outcome, ops: rp.value.ops.length, rollbackSteps: rp.value.rollback.map((s) => ({ opId: s.opId, answer: s.answer, failed: s.failed, undoneOps: s.undoneOps, restoredTo: s.restoredTo })) };
    const steps = rp.thrown ? [] : rp.value.rollback;
    rec.rollbackCallsAllReturned = steps.length > 0 && steps.every((s) => s.failed === false);
    rec.rollbackUndidTheAttemptsOwnOp = steps.some((s) => s.undoneOps.includes(commitRecord.op.opId));
    rec.rollbackFloor = steps.find((s) => s.failed === true) || null;
  }
  CURRENT = null;
  cells.push(rec);
  console.log([
    String(id).padEnd(38),
    `arm=${rec.arm.kind === 'thrown' ? rec.arm.status : rec.arm.outcome}`.padEnd(18),
    `c1Body=${rec.order.constraint1BodyCalls}`.padEnd(10),
    `appBody=${rec.order.appListenerCalls}`.padEnd(11),
    `deliveredByThisWrite=${rec.delivered.app}`.padEnd(26),
    `inWriteWindow=${rec.order.appListenerCallsInTheWriteWindow}`.padEnd(18),
    `pending@arm=${rec.pendingAfterTheArm}`,
  ].join(' '));
  return rec;
}

// =============================================================================================
// THE MATRIX — three registration handlings x two outcomes x two rounds, fresh store per cell, in ONE
// process (limbs 1 and 2, plus the raw material of limb 3).
// =============================================================================================
const VARIANTS = ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle'];
for (let round = 1; round <= 2; round += 1) {
  for (const variant of VARIANTS) {
    for (const outcome of ['pass', 'fail']) {
      orderingCell({ id: `O${outcome === 'pass' ? 1 : 2}-${variant}-r${round}`, limb: outcome === 'pass' ? 1 : 2, variant, outcome, round });
    }
  }
}

// =============================================================================================
// THE TWO-CONSTRAINT ORDER CELL — `A112`'s clause read at its strongest: BOTH pairs at the address run, and
// the app's body is reached ONLY ONCE EVERY CONSTRAINT HAS PASSED (no delivery between the two passes).
// =============================================================================================
const twoPairPass = orderingCell({ id: 'O1-two-pairs-pass', limb: 1, variant: 'prefix-address', outcome: 'pass', round: 1, secondPair: true });

// =============================================================================================
// LIMB 4 — THE REPEAT LIMB: pass, fail, pass, fail at ONE address on ONE store, in this same process.
// =============================================================================================
{
  // ONE STORE, prepared by `freshStore` before any registration, so nothing of the fixture writes into the
  // sequence the four arms measure.
  const shared = freshStore();
  ['pass', 'fail', 'pass', 'fail'].forEach((outcome, i) => {
    orderingCell({ id: `R-seq${i + 1}-${outcome}`, limb: 4, variant: 'prefix-address', outcome, round: i + 1, sharedStore: shared });
  });
}

// =============================================================================================
// LIMB 5 — THE BARE WRITE (`§2.7` item 8): a caller-made write with NO kernel evaluation set keeps the
// post-verb instant, is never withheld, and carries no `pending`.
// =============================================================================================
const bareWrite = (() => {
  const id = 'B-bare-write';
  CURRENT = id;
  const rec = { cell: id, limb: 5, variant: 'bare-caller-made-write', phases: {} };

  // (5a) ON A STORE NO KERNEL ACT HAS TOUCHED AT ALL.
  {
    const store = freshStore();
    let calls = 0;
    const handle = store.on(BARE1, () => { calls += 1; mark('app-listener.body', { listenerArg: json(BARE1), route: 'bare-write-only' }); });
    grab(() => storeNs.write(store, PREFIX, TIER, { bare: 0 })); // the parent map, itself a bare write
    PHASE = 'store-write';
    mark('write.enter');
    const out = grab(() => storeNs.write(store, BARE1, TIER, 5));
    mark('write.return', { thrown: out.thrown ? statusOf(out.thrown) : null });
    PHASE = 'idle';
    const seqs = seqsOf('app-listener.body', id);
    const inWindow = anyInPhase('app-listener.body', id, 'store-write');
    rec.phases.freshStoreNoKernel = {
      whatTheLawRequires: 'a bare caller-made write is delivered at the package\'s own POST-VERB instant (inside the write verb\'s frame), never withheld',
      writeThrew: out.thrown ? statusOf(out.thrown) : null,
      triggeredReturned: out.thrown ? null : out.value.triggered.length,
      returnedRecordMembers: out.thrown ? null : Object.keys(out.value).sort(),
      carriesNoPendingMember: out.thrown ? null : out.value.pending === undefined,
      appListenerBodyCalls: calls,
      appListenerSeqs: seqs,
      deliveredInsideTheWriteVerbsOwnFrame: inWindow,
      handleOpaque: typeof handle === 'object' || typeof handle === 'function',
    };
  }

  // (5b) ON A STORE WHOSE KERNEL-DRIVEN WRITE HAS ALREADY REACHED ITS TERMINAL ARM — the adoption is
  // consumed, so nothing stands to withhold this write.
  {
    const store = freshStore();
    grab(() => storeNs.write(store, PREFIX, TIER, { bare: 0 }));
    register(store, ADDR, 'n7c', () => true); // a passing pair at the other address
    let appCalls = 0;
    const kernelRecord = commit(store, ADDR, TIER, 7);
    const kernelArm = armOf(store, kernelRecord);
    const hBare = store.on(BARE2, () => { appCalls += 1; mark('app-listener.body', { listenerArg: json(BARE2), route: 'bare-write-after-a-kernel-pass' }); });
    PHASE = 'store-write';
    mark('write.enter');
    const out = grab(() => storeNs.write(store, BARE2, TIER, 9));
    mark('write.return', { thrown: out.thrown ? statusOf(out.thrown) : null });
    PHASE = 'idle';
    const seqs = seqsOf('app-listener.body', id);
    const inWindow = anyInPhase('app-listener.body', id, 'store-write');
    rec.phases.afterAKernelPass = {
      whatTheLawRequires: 'the kernel act moved no instant of the NEXT, unrelated bare write: its delivery stands in its own window',
      kernelWriteArm: kernelArm.kind === 'thrown' ? kernelArm.status : kernelArm.outcome,
      appListenerBodyCalls: appCalls,
      appListenerSeqs: seqs,
      deliveredInsideTheWriteVerbsOwnFrame: inWindow,
      bareHandleDistinctFromTheKernelHandle: hBare !== undefined,
      settleReachesDuringTheBareWrite: inCell('settle.reach', id).filter((e) => e.phase === 'store-write').length,
    };
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
})();
console.log(`\n[${bareWrite.cell}] LIMB 5 — bare write: no-kernel window=${json(bareWrite.phases.freshStoreNoKernel.deliveredInsideTheWriteVerbsOwnFrame)} calls=${bareWrite.phases.freshStoreNoKernel.appListenerBodyCalls}; after-a-kernel-pass window=${json(bareWrite.phases.afterAKernelPass.deliveredInsideTheWriteVerbsOwnFrame)} calls=${bareWrite.phases.afterAKernelPass.appListenerBodyCalls}`);

// =============================================================================================
// LIMB 7 — THE DELIVERY COUNT OF ONE KERNEL-DRIVEN WRITE (`surface.md §2.4` item 9's table row (a):
// *"the package's post-verb invocation reaches NO handle of that write, so its in-window invocation set is
// EMPTY"*; read together with `§2.7` item 6 and item 9 (d)). The app's listener is registered on a handle the
// STORE returns for the written address in its own right — the watched prefix's handle, which the store's own
// prefix test returns for the write at the descendant address. Nothing of the kernel's is at that handle, so
// this is the one fixture in which a write's triggered set carries a handle outside the kernel's own pair.
// The question the demo must answer: HOW MANY TIMES does ONE passing write invoke that body, and AT WHICH
// INSTANT?
// =============================================================================================
const deliveryCount = (() => {
  const id = 'D-delivery-count';
  CURRENT = id;
  const rec = { cell: id, limb: 7, phases: {} };
  const address = ['d7', 'leaf'];
  const prefix = ['d7'];

  const oneArm = (outcome) => {
    const store = freshStore();
    // THIS FIXTURE'S OWN ADDRESSES NEED THEIR OWN PARENT MAP, and it is taken BEFORE the app's registration
    // so this write fires nothing and no measurement of the kernel write below can be attributed to it.
    grab(() => storeNs.write(store, prefix, TIER, { leaf: 0 }));
    let calls = 0;
    let inTheWindow = 0;
    let atTheArm = 0;
    const argSeen = [];
    const hApp = store.on(prefix, (a) => {
      calls += 1;
      argSeen.push(json(a));
      if (PHASE === 'K-2') inTheWindow += 1;
      if (PHASE === 'K-3') atTheArm += 1;
      mark('app-listener.body', { listenerArg: json(a), armOfTheWrite: outcome });
    });
    // THE PARENT MAP ALREADY STANDS (`freshStore` took it before any registration on this store), so this
    // fixture writes nothing at the watched prefix and the delivery count below is the write's own.
    register(store, address, 'd7c', () => (outcome === 'fail' ? { message: 'd7 refuses' } : true));
    const before = { calls, inTheWindow, atTheArm };
    PHASE = 'K-2';
    mark('K2.enter');
    let commitRecord = null;
    const c = grab(() => commit(store, address, TIER, outcome === 'fail' ? 21 : 20));
    commitRecord = c.thrown ? null : c.value;
    mark('K2.return', { thrown: c.thrown ? statusOf(c.thrown) : null });
    PHASE = 'idle';
    const afterK2 = { calls, inTheWindow, atTheArm };
    PHASE = 'K-3';
    mark('K3.enter');
    const k3 = commitRecord === null ? null : armOf(store, commitRecord);
    mark('K3.return', { thrown: k3 ? statusOf(k3.status || null) : null });
    PHASE = 'idle';
    return {
      arm: k3 ? (k3.kind === 'thrown' ? k3.status : k3.outcome) : 'no-record',
      appBodyCallsInTheWholeArm: calls - before.calls,
      appBodyCallsInsideTheWriteWindow: inTheWindow - before.inTheWindow,
      appBodyCallsAtTheTerminalArm: atTheArm - before.atTheArm,
      appBodyCallsAfterTheWriteReturnedButBeforeThePass: afterK2.calls - afterK2.inTheWindow - afterK2.atTheArm - before.calls,
      listenerArgsSeen: argSeen,
      triggeredReturnedByTheWrite: commitRecord === null ? null : commitRecord.triggered.length,
      appHandleIsAmongTheWritesTriggeredHandles: commitRecord === null ? null : commitRecord.triggered.includes(hApp),
      pendingAfterTheArm: commitRecord === null ? null : commitRecord.pending.length,
      theAppHandleStandsInPendingAfterTheArm: commitRecord === null ? null : commitRecord.pending.includes(hApp),
    };
  };

  // THE CONTROL: THE SAME FIXTURE WITHOUT THE KERNEL — the one write's own post-verb instant, read twice.
  const control = (() => {
    const store = freshStore();
    grab(() => storeNs.write(store, prefix, TIER, { leaf: 0 })); // the parent map, before the registration
    let calls = 0; let inWindow = 0;
    const hApp = store.on(prefix, () => { calls += 1; if (PHASE === 'store-write') inWindow += 1; mark('app-listener.body', { listenerArg: json(prefix), armOfTheWrite: 'bare-control' }); });
    const before = calls;
    PHASE = 'store-write';
    mark('write.enter');
    const w = grab(() => storeNs.write(store, address, TIER, 20));
    mark('write.return', { thrown: w.thrown ? statusOf(w.thrown) : null });
    PHASE = 'idle';
    return {
      whatTheLawRequires: 'a bare caller-made write invokes each registered body ONCE, at its post-verb instant (`§2.7` item 2 / item 8)',
      writesDriven: 1,
      appBodyCallsForTheOneWrite: calls - before,
      callsInsideTheWriteWindow: inWindow,
      triggeredReturned: w.thrown ? null : w.value.triggered.length,
    };
  })();

  rec.phases.passingWrite = Object.assign({
    whatTheLawRequires: 'ONE kernel-driven passing write: `§2.4` item 9 row (a) — the post-verb invocation reaches NO handle of that write, so its in-window invocation set is EMPTY — and the body of a handle the write triggered is invoked at instant (b) and nowhere else, once (`§2.7` item 5; item 9 (b))',
  }, oneArm('pass'));
  rec.phases.failingWrite = Object.assign({
    whatTheLawRequires: 'ONE kernel-driven failing write: the DISCARD empties the member, so the seam delivers zero of that write\'s own triggered handles — and `§2.4` item 9 (d): "a body of that failed write\'s own triggered set that ran — at instant (a), inside the store write\'s window, or anywhere after it — is a failure of this item and of item 6 with it". The app\'s handle at the watched prefix IS a member of the failed write\'s triggered set (the store\'s prefix test returns it), so this limb is the by-set clause\'s own drive.',
  }, oneArm('fail'));
  rec.phases.bareControl = control;
  rec.phases.reading = {
    passingWrite: rec.phases.passingWrite.appBodyCallsInTheWholeArm === 1
      ? 'ONE delivery for the one write'
      : `${rec.phases.passingWrite.appBodyCallsInTheWholeArm} DELIVERIES FOR ONE WRITE (${rec.phases.passingWrite.appBodyCallsInsideTheWriteWindow} inside the write verb's own window, ${rec.phases.passingWrite.appBodyCallsAtTheTerminalArm} at the terminal arm)`,
    failingWrite: rec.phases.failingWrite.appBodyCallsInTheWholeArm === 0
      ? 'zero deliveries for the failed write'
      : `${rec.phases.failingWrite.appBodyCallsInTheWholeArm} DELIVERIES FOR THE FAILED WRITE (${rec.phases.failingWrite.appBodyCallsInsideTheWriteWindow} in the window, ${rec.phases.failingWrite.appBodyCallsAfterTheWriteReturnedButBeforeThePass} between the verb's return and the pass, ${rec.phases.failingWrite.appBodyCallsAtTheTerminalArm} at the arm) — the handle IS a member of that write's triggered set=${rec.phases.failingWrite.appHandleIsAmongTheWritesTriggeredHandles}`,
  };
  CURRENT = null;
  cells.push(rec);
  return rec;
})();
console.log(`\n[${deliveryCount.cell}] LIMB 7 — one passing kernel-driven write: app body calls=${deliveryCount.phases.passingWrite.appBodyCallsInTheWholeArm} (in the write window=${deliveryCount.phases.passingWrite.appBodyCallsInsideTheWriteWindow}, at the arm=${deliveryCount.phases.passingWrite.appBodyCallsAtTheTerminalArm}); one failing: calls=${deliveryCount.phases.failingWrite.appBodyCallsInTheWholeArm} (triggered=${json(deliveryCount.phases.failingWrite.triggeredReturnedByTheWrite)}, handle in that set=${json(deliveryCount.phases.failingWrite.appHandleIsAmongTheWritesTriggeredHandles)}); bare control: calls for one write=${deliveryCount.phases.bareControl.appBodyCallsForTheOneWrite} (in window=${deliveryCount.phases.bareControl.callsInsideTheWriteWindow})`);

// =============================================================================================
// LIMB 6 — THE STALE ADOPTION.
// =============================================================================================
const staleAdoption = (() => {
  const id = 'S-stale-adoption';
  CURRENT = id;
  const rec = { cell: id, limb: 6, phases: {} };

  // (6-ii) A `commit` REFUSED BETWEEN INSTANT (a) AND THE VERB. Three routes to that refusal are driven on
  // stores of their own, each followed by a BARE write whose window the law fixes: an adoption the refused
  // commit released must leave the next bare write untouched.
  const refusedCommitRoute = (route, makeStoreAndRefuse) => {
    const store = freshStore();
    grab(() => storeNs.write(store, PREFIX, TIER, { bare: 0 }));
    let calls = 0;
    const out = makeStoreAndRefuse(store);
    // the bare write under test, at an address of its own, with its own listener
    const hProbe = store.on(BARE1, () => { calls += 1; mark('app-listener.body', { listenerArg: json(BARE1), route }); });
    const seqsBefore = seqsOf('app-listener.body', id).length;
    const before = calls;
    PHASE = 'store-write';
    mark('write.enter');
    const w = grab(() => storeNs.write(store, BARE1, TIER, 11));
    mark('write.return', { thrown: w.thrown ? statusOf(w.thrown) : null });
    PHASE = 'idle';
    return {
      refusedCommit: out.refused,
      refusalCode: out.code,
      settledReachesBeforeTheRefusal: out.settleReaches,
      extra: out.extra || null,
      bareWrite: {
        threw: w.thrown ? statusOf(w.thrown) : null,
        triggeredReturned: w.thrown ? null : w.value.triggered.length,
        callsOwedByThisBareWrite: 1,
        callsMadeByThisBareWrite: calls - before,
        deliveredInsideTheWriteVerbsOwnFrame: (calls - before) === 1,
        appListenerBodyCallsInTheCellSoFar: calls,
        appListenerSeqsInTheCellSoFar: seqsOf('app-listener.body', id),
      },
    };
  };
  rec.phases.noAttemptWasOpen = Object.assign({
    whatTheLawRequires: 'instant (a) stands BEFORE the store\'s write verb, so the seam is reached and the refusal follows it; the store\'s own refusal releases that adoption (`index.mjs` write\'s catch arm), so the NEXT bare write reaches NO adoption and is NOT withheld',
  }, refusedCommitRoute('the store\'s own refusal at the verb: `value` absent', (store) => {
    const before = inCell('settle.reach', id).length;
    const r = grab(() => commit(store, ADDR, TIER)); // no fourth argument: `value` absent
    return {
      refused: r.thrown ? statusOf(r.thrown) : null,
      code: r.thrown ? statusOf(r.thrown) : 'NO REFUSAL',
      settleReaches: inCell('settle.reach', id).length - before,
      extra: { refusedMessage: r.thrown ? String(r.thrown.message || '').slice(0, 120) : null },
    };
  }));
  rec.phases.anAttemptWasAlreadyOpen = Object.assign({
    whatTheLawRequires: 'the same law, the other route to a refused commit: the second commit is refused KC-7 BEFORE instant (a), so the FIRST commit\'s adoption — a genuinely kernel-driven write, its arm not yet run — is the identity the next bare write meets; if that bare write\'s window is withheld, that is a stale adoption drawn on by a write it does not name',
  }, refusedCommitRoute('KC-7, a live attempt stands open at that address', (store) => {
    const held = commit(store, ADDR, TIER, 1); // the live attempt: its instant (a) ran, its write returned, its arm NOT run
    const before = inCell('settle.reach', id).length;
    const r = grab(() => commit(store, ADDR, TIER, 2));
    return {
      refused: r.thrown ? statusOf(r.thrown) : null,
      code: r.thrown ? statusOf(r.thrown) : 'NO REFUSAL',
      settleReaches: inCell('settle.reach', id).length - before,
      extra: { heldAttemptOpen: held !== null, heldRecordPending: held ? held.pending.length : null },
    };
  }));

  // (6-i) THE CALLER CALLS `settle` ITSELF — the route that is the one open red (`ck_neg_dm_07_*`). The
  // caller-made record carries `pending`, which is the whole of the domain test `settleOn` applies to an
  // identity this instance has not adopted; the law's own sentence is that THE SEAM IS THE KERNEL'S and a
  // bare caller-made write is never withheld.
  {
    const store = freshStore();
    grab(() => storeNs.write(store, PREFIX, TIER, { bare: 0 })); // the parent map the address needs, BEFORE any adoption
    let calls = 0;
    const callSeqs = [];
    const h = store.on(SETTLE_PROBE_ADDR, (a) => { calls += 1; callSeqs.push(json(a)); mark('app-listener.body', { listenerArg: json(a), route: 'caller-settle' }); });
    const callerRecord = { op: null, triggered: [], pending: [h] }; // a caller-made record carrying `pending`
    PHASE = 'caller';
    mark('caller.settle.enter');
    const settled = grab(() => store.settle(callerRecord));
    mark('caller.settle.return', { thrown: settled.thrown ? String(settled.thrown.name) : null });
    PHASE = 'idle';
    const secondSettle = grab(() => store.settle(callerRecord)); // the LATER call: the delivery of the same identity
    // ACT 2 — a bare write at the registered address, and its own window read as a delta of its own.
    const beforeWrite = calls;
    PHASE = 'store-write';
    mark('write.enter');
    const w = grab(() => storeNs.write(store, SETTLE_PROBE_ADDR, TIER, 13));
    mark('write.return', { thrown: w.thrown ? statusOf(w.thrown) : null });
    PHASE = 'idle';
    const afterFirstWrite = calls;
    // ACT 3 — one more bare write, to show whether the withholding persists past the write it met
    PHASE = 'store-write';
    mark('write2.enter');
    const w2 = grab(() => storeNs.write(store, SETTLE_PROBE_ADDR, TIER, 14));
    mark('write2.return', { thrown: w2.thrown ? statusOf(w2.thrown) : null });
    PHASE = 'idle';
    rec.phases.callerCallsSettleItself = {
      whatTheLawRequires: 'the seam is the kernel\'s arm alone (`A116` (D1): it withholds "the write in flight"); a caller\'s own `settle` call is not a kernel act, so the NEXT bare caller-made write keeps the post-verb instant and is NEVER withheld (`§2.7` item 8)',
      callerSettleThrew: settled.thrown ? String(settled.thrown.name) : null,
      callerSettleMessage: settled.thrown ? String(settled.thrown.message || '') : null,
      callerSettleReturnsUndefined: settled.thrown ? null : settled.value === undefined,
      secondCallForTheSameIdentityThrew: secondSettle.thrown ? String(secondSettle.thrown.name) : null,
      settleReaches: inCell('settle.reach', id).map((e) => ({ seq: e.seq, phase: e.phase, pendingLen: e.pendingLen })),
      firstBareWrite: {
        threw: w.thrown ? statusOf(w.thrown) : null,
        triggeredReturned: w.thrown ? null : w.value.triggered.length,
        callsOwed: 1,
        callsMade: afterFirstWrite - beforeWrite,
        deliveredInsideItsOwnWindow: calls > beforeWrite,
        appListenerSeqsInThisWindow: seqsOf('app-listener.body', id).filter((s) => s >= (firstSeq('write.enter', id) || 0) && s < (firstSeq('write2.enter', id) || 1e9)),
      },
      secondBareWrite: {
        threw: w2.thrown ? statusOf(w2.thrown) : null,
        callsOwed: 1,
        callsMade: calls - afterFirstWrite,
        deliveredInsideItsOwnWindow: calls > afterFirstWrite,
        totalAppListenerBodyCallsInTheCell: calls,
        appListenerArgsSeen: callSeqs,
      },
      readingSoFar: 'reported as observed below',
    };
    // THE READING THE VALUES THEMSELVES GIVE, PRINTED WITH THEM.
    const first = rec.phases.callerCallsSettleItself.firstBareWrite;
    const second = rec.phases.callerCallsSettleItself.secondBareWrite;
    rec.phases.callerCallsSettleItself.readingSoFar = (first.deliveredInsideItsOwnWindow && second.deliveredInsideItsOwnWindow)
      ? 'the caller\'s own `settle` did NOT withhold any bare write\'s window: both bare writes delivered once each'
      : `A BARE CALLER-MADE WRITE'S WINDOW IS WITHHELD BY A CALLER'S OWN \`settle\` CALL: the first bare write owed 1 in-window invocation and made ${first.callsMade} (triggered returned ${json(first.triggeredReturned)}), the second owed 1 and made ${second.callsMade}, so the caller's own adoption was drawn on by the write it does not name`;
    rec.phases.callerCallsSettleItself.verdict = (first.callsMade === 1 && second.callsMade === 1) ? 'PASS' : 'FAIL';
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
})();
console.log(`\n[${staleAdoption.cell}] LIMB 6 — refused commit (store's own refusal, no attempt open): code=${json(staleAdoption.phases.noAttemptWasOpen.refusalCode)} bare-write window=${json(staleAdoption.phases.noAttemptWasOpen.bareWrite.deliveredInsideTheWriteVerbsOwnFrame)} calls=${staleAdoption.phases.noAttemptWasOpen.bareWrite.callsMadeByThisBareWrite}/1; `
  + `refused commit (attempt open, KC-7): code=${json(staleAdoption.phases.anAttemptWasAlreadyOpen.refusalCode)} bare-write window=${json(staleAdoption.phases.anAttemptWasAlreadyOpen.bareWrite.deliveredInsideTheWriteVerbsOwnFrame)} calls=${staleAdoption.phases.anAttemptWasAlreadyOpen.bareWrite.callsMadeByThisBareWrite}/1; `
  + `caller calls settle: ${staleAdoption.phases.callerCallsSettleItself.verdict} — first bare write calls=${staleAdoption.phases.callerCallsSettleItself.firstBareWrite.callsMade}/1, second=${staleAdoption.phases.callerCallsSettleItself.secondBareWrite.callsMade}/1`);

// =============================================================================================
// VERDICTS.
// =============================================================================================
const verdicts = [];
const passCells = (variant) => [1, 2].map((r) => cells.find((c) => c.cell === `O1-${variant}-r${r}`));
const failCells = (variant) => [1, 2].map((r) => cells.find((c) => c.cell === `O2-${variant}-r${r}`));
const deliveredAtTheArm = (c) => c.delivered.app === 1 && c.order.appListenerCallsInTheWriteWindow === 0 && c.order.appListenerRanAtTheTerminalArm === true && c.triggeringAddressInTheArg === true;

// LIMB 1 — ORDER.
for (const variant of VARIANTS) {
  for (const c of passCells(variant)) {
    if (c === undefined) continue;
    const constraintRan = c.delivered.c1 === 1;
    const oneDeliveryAtTheArm = deliveredAtTheArm(c);
    const armPassed = c.arm.kind === 'returned' && c.arm.outcome === 'passed';
    const heldInWindow = c.order.appListenerCallsInTheWriteWindow === 0;
    verdicts.push({
      limb: 1, cell: c.cell,
      requires: 'the triggered constraints run FIRST; the listener\'s body runs ONLY ONCE EVERY CONSTRAINT HAS PASSED — never inside the write verb\'s window, delivered at the pass\'s terminal arm (`A112`; `A114`; `A116` (a)-(b)).',
      observed: `DELIVERED BY THIS WRITE: constraint body calls=${c.delivered.c1}, app listener body calls=${c.delivered.app} (the fixture\'s own parent write delivered to a prefix-addressed app listener before this write, so the delta and not the cell total is read); constraint body seqs=${json(c.order.constraint1BodySeqs)}, app body seqs=${json(c.order.appListenerSeqs)}; `
        + `app delivery inside the write window=${c.order.appListenerCallsInTheWriteWindow}, inside the pass's own window=${c.order.appListenerCallsInsideTheK3Window}; settle reaches: at instant (a), in the write window seqs=${json(c.settleReachesInsideK2)}, at instant (b), in the pass seqs=${json(c.settleReachesInsideK3)}; `
        + `terminal arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; pending after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}; the app body's one argument is THIS write's triggering address=${c.triggeringAddressInTheArg} (args read off this write's calls: ${json(c.appListenerArgsThisWrite)}); store read at ${json(ADDR)}=${json(c.storeReadAtAttemptAddress)}`,
      verdict: (constraintRan && oneDeliveryAtTheArm && armPassed && heldInWindow) ? 'PASS' : 'FAIL',
    });
  }
}

// LIMB 1's strongest cell — TWO PAIRS: no delivery stands between the two constraint bodies.
{
  const c = twoPairPass;
  const bothRan = c.delivered.c1 === 1 && c.delivered.c2 === 1;
  const neitherBeforeTheApp = c.order.appListenerRanBeforeAnyConstraint === false;
  const noGapDelivery = c.order.appListenerRanBeforeEveryConstraint === false;
  verdicts.push({
    limb: 1, cell: c.cell,
    requires: 'with TWO pairs at the address, EVERY constraint runs first and the app\'s body is reached only once BOTH have passed; the app\'s body is delivered exactly once (`A112`: "the triggered constraints first, and only once every constraint has passed the other listeners").',
    observed: `DELIVERED BY THIS WRITE: constraint 1 body calls=${c.delivered.c1} (seqs ${json(c.order.constraint1BodySeqs)}), constraint 2 body calls=${c.delivered.c2} (seqs ${json(c.order.constraint2BodySeqs)}), app listener calls=${c.delivered.app} (seqs ${json(c.order.appListenerSeqs)}); app ran before any constraint=${c.order.appListenerRanBeforeAnyConstraint}, before every constraint=${c.order.appListenerRanBeforeEveryConstraint}, inside the write window=${c.order.appListenerCallsInTheWriteWindow}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; pending after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}`,
    verdict: (bothRan && neitherBeforeTheApp && noGapDelivery && c.delivered.app === 1 && c.order.appListenerCallsInTheWriteWindow === 0) ? 'PASS' : 'FAIL',
  });
}

// LIMB 2 — DISCARD.
for (const variant of VARIANTS) {
  for (const c of failCells(variant)) {
    if (c === undefined) continue;
    const constraintEvaluatedAndRefused = c.delivered.c1 === 1;
    const failedOnConstraints = c.arm.kind === 'thrown' && c.arm.status === 'KC-3';
    const zeroDeliveries = c.delivered.app === 0 && c.order.appListenerCallsInTheWriteWindow === 0;
    const rolledBack = c.rollbackCallsAllReturned === true && c.rollbackUndidTheAttemptsOwnOp === true;
    verdicts.push({
      limb: 2, cell: c.cell,
      requires: 'a write that fails on constraints DISCARDS the listeners — the listener\'s body must NOT RUN AT ALL, and the record\'s `pending` is empty by the DISCARD before the arm reads it (`A114`; `A113` (D1); `A116` (b)). THE WRITE MUST ACTUALLY FAIL ON CONSTRAINTS for this limb to be driven at all: a landing at which no constraint body ran is not a constraint failure and cannot stand as a pass here.',
      observed: `terminal arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome} (failed on constraints=${failedOnConstraints}, constraint body ran=${constraintEvaluatedAndRefused}); DELIVERED BY THIS WRITE: app listener body calls=${c.delivered.app} (inside the write window=${c.order.appListenerCallsInTheWriteWindow}, at the terminal arm seqs=${json(c.order.appListenerSeqs)}); `
        + `settle reaches: instant (a) in the write window seqs=${json(c.settleReachesInsideK2)}, instant (b) in the pass seqs=${json(c.settleReachesInsideK3)}; pending after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}; `
        + `store read at ${json(ADDR)}: before the write=${json(c.stateBeforeTheWrite)}, after the arm=${json(c.storeReadAtAttemptAddress)} (rollback calls all returned=${c.rollbackCallsAllReturned}, undid the attempt's own op=${c.rollbackUndidTheAttemptsOwnOp}, floor=${json(c.rollbackFloor)}); log=${json(c.log)}`,
      verdict: (constraintEvaluatedAndRefused && failedOnConstraints && zeroDeliveries && rolledBack && c.pendingAfterTheArm === 0) ? 'PASS' : 'FAIL',
    });
  }
}

// LIMB 3 — REPLACEMENT: what the two holders' own call records show.
{
  const onPass = cells.find((c) => c.cell === 'O1-on-at-adopted-address-r1');
  const onFail = cells.find((c) => c.cell === 'O2-on-at-adopted-address-r1');
  const regPass = cells.find((c) => c.cell === 'O1-register-at-adopted-handle-r1');
  const regFail = cells.find((c) => c.cell === 'O2-register-at-adopted-handle-r1');
  const basePass = cells.find((c) => c.cell === 'O1-prefix-address-r1');
  const baseFail = cells.find((c) => c.cell === 'O2-prefix-address-r1');
  const onReplacedTheAdoptedSlot = onPass.appHandleIsTheKernelAdoptedHandle === true;
  const constraintBodyStillRanUnderOn = onPass.delivered.c1 === 1;
  const appDeliveredUnderOn = onPass.delivered.app === 1 && onPass.order.appListenerCallsInTheWriteWindow === 0 && onPass.order.appListenerRanAtTheTerminalArm === true;
  const discardUnderOn = onFail.arm.kind === 'thrown' && onFail.arm.status === 'KC-3' && onFail.delivered.app === 0;
  const survives = onReplacedTheAdoptedSlot && constraintBodyStillRanUnderOn && appDeliveredUnderOn && discardUnderOn;
  verdicts.push({
    limb: 3, cell: 'L3-replacement-seam',
    requires: 'one function per identity (`surface.md §2.4` rule 2): a later registration REPLACES. The two holders\' own call records are reported, and the question is whether THE ORDERING SURVIVES THE REPLACEMENT.',
    observed: `(a) the kernel\'s K-1 adopted a handle at ${json(ADDR)}; the app then called store.on(${json(ADDR)}, appFn) and received the IDENTICAL handle=${onPass.appHandleIsTheKernelAdoptedHandle} — so the app\'s function took the slot the kernel\'s adopted handle names. THE TWO BODIES\' OWN RECORDS, PASSING WRITE: the kernel\'s constraint body calls=${onPass.delivered.c1} (seqs ${json(onPass.order.constraint1BodySeqs)}); the app\'s body calls=${onPass.delivered.app} (seqs ${json(onPass.order.appListenerSeqs)}), inside the write window=${onPass.order.appListenerCallsInTheWriteWindow}, at the terminal arm=${onPass.order.appListenerRanAtTheTerminalArm}, before any constraint=${onPass.order.appListenerRanBeforeAnyConstraint}; pending after the arm=${onPass.pendingAfterTheArm} of triggered=${onPass.triggeredAfterTheArm} (the pass checked off the one handle the registration names, so the residue the arm reads is empty). FAILING WRITE, the same seam: arm=${onFail.arm.kind === 'thrown' ? onFail.arm.status : onFail.arm.outcome}, app body calls=${onFail.delivered.app} (inside the window=${onFail.order.appListenerCallsInTheWriteWindow}), pending after the arm=${onFail.pendingAfterTheArm}. `
      + `(b) the same adopted handle through the §2.4 item 5 site store.register(adoptedHandle, appFn): passing write — constraint body calls=${regPass.delivered.c1}, app body calls=${regPass.delivered.app} (inside the window=${regPass.order.appListenerCallsInTheWriteWindow}, at the arm=${regPass.order.appListenerRanAtTheTerminalArm}); failing write — arm=${regFail.arm.kind === 'thrown' ? regFail.arm.status : regFail.arm.outcome}, app body calls=${regFail.delivered.app}. `
      + `(c) BASELINE, the app\'s listener at the PREFIX address ${json(PREFIX)} on a handle of its own (no replacement): passing write app body calls=${basePass.delivered.app} (inside the window=${basePass.order.appListenerCallsInTheWriteWindow}, at the arm=${basePass.order.appListenerRanAtTheTerminalArm}); failing write app body calls=${baseFail.delivered.app}, pending after the arm=${baseFail.pendingAfterTheArm}.`,
    verdict: survives
      ? 'PASS (the ordering survives both replacement routes: at the address, the app\'s body is withheld from the window and delivered at the arm while the kernel\'s pair still runs first; at the adopted handle, the kernel\'s slot is the delivery register and the constraint pair still runs)'
      : 'FAIL',
  });
}

// LIMB 4 — REPEAT.
{
  const seq = cells.filter((c) => c.limb === 4);
  const shapeOf = (c) => json({
    c1: c.delivered.c1, app: c.delivered.app,
    inWindow: c.order.appListenerCallsInTheWriteWindow, appBeforeAnyConstraintBody: c.order.appListenerRanBeforeAnyConstraint,
  });
  const passOnes = seq.filter((c) => c.outcome === 'pass');
  const failOnes = seq.filter((c) => c.outcome === 'fail');
  const passConsistent = passOnes.every((c) => shapeOf(c) === shapeOf(passOnes[0]));
  const failConsistent = failOnes.every((c) => shapeOf(c) === shapeOf(failOnes[0]));
  const armsAsTheLawFixes = seq.every((c) => (c.outcome === 'pass') === (c.arm.kind === 'returned'));
  const matrixRepeats = VARIANTS.every((v) => {
    const a = cells.find((c) => c.cell === `O1-${v}-r1`); const b = cells.find((c) => c.cell === `O1-${v}-r2`);
    const d = cells.find((c) => c.cell === `O2-${v}-r1`); const e = cells.find((c) => c.cell === `O2-${v}-r2`);
    return json([shapeOf(a), a.arm]) === json([shapeOf(b), b.arm]) && json([shapeOf(d), d.arm, d.pendingAfterTheArm]) === json([shapeOf(e), e.arm, e.pendingAfterTheArm]);
  });
  const armsDiverge = new Set(failOnes.map((c) => c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome)).size > 1;
  verdicts.push({
    limb: 4, cell: 'L4-repeat',
    requires: 'the result is not a first-call artifact: the passing and the failing write are each run twice in one process, and each handling on two fresh stores.',
    observed: `four sequential attempts at ONE address on ONE store in one process (the app listener sits at the watched PREFIX ${json(PREFIX)}, so the fixture\'s own parent write also reaches it — the DELTA over each write is the term read here): ${seq.map((c) => `${c.cell}: arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}, c1Body=${c.delivered.c1}, appDeliveredByThisWrite=${c.delivered.app}, inWindow=${c.order.appListenerCallsInTheWriteWindow}, pending@arm=${c.pendingAfterTheArm}, storeRead@arm=${json(c.storeReadAtAttemptAddress)}`).join(' | ')}; `
      + `the passing write repeats identically across the two rounds of every variant=${passConsistent} and the failing write too=${failConsistent} (fresh stores each); every arm token is the one the law fixes for its outcome=${armsAsTheLawFixes}; the failing arms' tokens diverge across the sequence=${armsDiverge}`
      + `${armsDiverge ? ` — the first failing attempt answers KC-3, the second ${seq.filter((c) => c.outcome === 'fail').map((c) => c.arm.status).join('/')} with the per-op rollback meeting the store's own floor (KC-8), and the refused value STANDS at the address (store read after that arm=${json(seq.find((c) => c.arm.status === 'KC-8').storeReadAtAttemptAddress)})` : ''}; `
      + `and over the sequence the app body is delivered exactly once per PASSING write and ZERO times on a write that fails on constraints, in both rounds=${seq.every((c) => (c.outcome === 'pass') === (c.delivered.app === 1))}`,
    verdict: (passConsistent && failConsistent && armsAsTheLawFixes && matrixRepeats) ? 'PASS' : 'FAIL',
  });
}

// LIMB 5 — BARE WRITE.
{
  const a = bareWrite.phases.freshStoreNoKernel;
  const b = bareWrite.phases.afterAKernelPass;
  const ok = a.appListenerBodyCalls === 1 && a.deliveredInsideTheWriteVerbsOwnFrame === true && a.carriesNoPendingMember === true
    && b.appListenerBodyCalls === 1 && b.deliveredInsideTheWriteVerbsOwnFrame === true && b.settleReachesDuringTheBareWrite === 0;
  verdicts.push({
    limb: 5, cell: bareWrite.cell,
    requires: 'a caller-made write with NO kernel evaluation set keeps the POST-VERB instant, is NEVER withheld, and carries no `pending` (`§2.7` item 8; `A116` (d)): it reaches no adoption, so the seam touches it not at all.',
    observed: `(a) a store no kernel act has touched: write threw=${json(a.writeThrew)}, triggered returned=${a.triggeredReturned}, the returned record's members=${json(a.returnedRecordMembers)} (it carries no \`pending\` member=${a.carriesNoPendingMember}); the app body ran ${a.appListenerBodyCalls} time at seqs ${json(a.appListenerSeqs)}, INSIDE the write verb's own frame=${a.deliveredInsideTheWriteVerbsOwnFrame}. `
      + `(b) after a kernel-driven write reached its arm (${b.kernelWriteArm}) at another address: the next bare write delivered in its own window=${b.deliveredInsideTheWriteVerbsOwnFrame} (calls=${b.appListenerBodyCalls}), and the seam was reached during it=${b.settleReachesDuringTheBareWrite} times.`,
    verdict: ok ? 'PASS' : 'FAIL',
  });
}

// LIMB 6 — STALE ADOPTION.
{
  const ii = staleAdoption.phases.noAttemptWasOpen;
  const ii2 = staleAdoption.phases.anAttemptWasAlreadyOpen;
  const i = staleAdoption.phases.callerCallsSettleItself;
  const iiOk = ii.settledReachesBeforeTheRefusal >= 1 && ii.refusalCode !== null && ii.bareWrite.callsMadeByThisBareWrite === 1 && ii.bareWrite.deliveredInsideTheWriteVerbsOwnFrame === true;
  const ii2Ok = ii2.refusalCode === 'KC-7' && ii2.bareWrite.callsMadeByThisBareWrite === 1 && ii2.bareWrite.deliveredInsideTheWriteVerbsOwnFrame === true;
  const iOk = i.callerSettleThrew === null && i.firstBareWrite.callsMade === 1 && i.secondBareWrite.callsMade === 1;
  verdicts.push({
    limb: 6, cell: staleAdoption.cell,
    requires: '`A116` (d) with `§2.4` item 9\'s table row (a) read at `§2.7` item 8: (ii) a `commit` refused BETWEEN instant (a) and the verb leaves NO adoption consumable — the next bare write still delivers in its own window; (i) the caller calling `settle` itself is NOT a kernel act (the seam withholds "the write in flight" and only it), so no bare caller-made write may be withheld because of it.',
    observed: `(ii-a) REFUSED COMMIT, THE STORE\'S OWN REFUSAL, NO ATTEMPT OPEN: instant (a) reached the seam ${ii.settledReachesBeforeTheRefusal} time(s) before the refusal, the refusal was ${json(ii.refusalCode)}${ii.extra && ii.extra.refusedMessage ? ` (${json(ii.extra.refusedMessage)})` : ''}, and THE NEXT BARE WRITE owed 1 in-window invocation and made ${ii.bareWrite.callsMadeByThisBareWrite} (delivered in its own window=${ii.bareWrite.deliveredInsideTheWriteVerbsOwnFrame}, app body seqs in the cell ${json(ii.bareWrite.appListenerSeqsInTheCellSoFar)}, triggered returned=${ii.bareWrite.triggeredReturned}) — the released adoption withheld nothing. `
      + `(ii-b) REFUSED COMMIT OF THE KC-7 ROUTE (a live attempt stands open at that address — its own instant (a) taken, its write returned, its arm NOT run): the second commit was refused ${json(ii2.refusalCode)} BEFORE its own instant (a), so the FIRST attempt\'s adoption was the identity standing; THE NEXT BARE WRITE owed 1 in-window invocation and made ${ii2.bareWrite.callsMadeByThisBareWrite} (delivered in its own window=${ii2.bareWrite.deliveredInsideTheWriteVerbsOwnFrame}) — and the live attempt\'s residue is left undelivered by that consumption. `
      + `(i) THE CALLER CALLS \`settle\` ITSELF: the call threw=${json(i.callerSettleThrew)}, returned \`undefined\`=${json(i.callerSettleReturnsUndefined)}; the second call for the same identity threw=${json(i.secondCallForTheSameIdentityThrew)}; the seam reaches recorded=${json(i.settleReaches)}. THE FIRST BARE WRITE AFTER IT: threw=${json(i.firstBareWrite.threw)}, triggered returned=${json(i.firstBareWrite.triggeredReturned)}, and it owed 1 in-window invocation and made ${i.firstBareWrite.callsMade} (delivered inside its own window=${json(i.firstBareWrite.deliveredInsideItsOwnWindow)}); THE SECOND BARE WRITE owed 1 and made ${i.secondBareWrite.callsMade} (the app body has run ${i.secondBareWrite.totalAppListenerBodyCalls} time in the whole cell, args seen ${json(i.secondBareWrite.appListenerArgsSeen)}). ${i.readingSoFar}`,
    verdict: (iiOk && ii2Ok && iOk) ? 'PASS' : 'FAIL',
  });
}

// LIMB 7 — THE DELIVERY COUNT OF ONE KERNEL-DRIVEN WRITE.
{
  const p = deliveryCount.phases.passingWrite;
  const f = deliveryCount.phases.failingWrite;
  const ctl = deliveryCount.phases.bareControl;
  const passOk = p.appBodyCallsInTheWholeArm === 1 && p.appBodyCallsInsideTheWriteWindow === 0;
  const failOk = f.appBodyCallsInTheWholeArm === 0;
  const ctlOk = ctl.appBodyCallsForTheOneWrite === 1 && ctl.callsInsideTheWriteWindow === 1;
  verdicts.push({
    limb: 7, cell: deliveryCount.cell,
    requires: '(`surface.md §2.4` item 9 table row (a)): for a kernel-driven write "the package\'s post-verb invocation reaches NO handle of that write, so its in-window invocation set is EMPTY" — the write\'s triggered handles are reached at instant (b) and nowhere else, ONCE; and (item 9 (d)) a body of a FAILED write\'s own triggered set that ran at instant (a), inside the store write\'s window, or anywhere after it is a failure. The fixture: the app\'s listener holds the STORE\'s own handle for the written address\'s watched prefix, so it IS a member of each write\'s triggered set while being NOTHING of the kernel\'s.',
    observed: `PASSING WRITE (one write, arm=${p.arm}): the write returned triggered=${p.triggeredReturnedByTheWrite} handles and the app\'s handle IS among them=${p.appHandleIsAmongTheWritesTriggeredHandles}; the app body ran ${p.appBodyCallsInTheWholeArm} time(s) for that ONE write — ${p.appBodyCallsInsideTheWriteWindow} time(s) INSIDE the write verb\'s own window (in-window invocation set of ${p.appBodyCallsInsideTheWriteWindow}, the declared EMPTY), ${p.appBodyCallsAfterTheWriteReturnedButBeforeThePass} between the verb\'s return and the pass, and ${p.appBodyCallsAtTheTerminalArm} at the terminal arm; the invocation arguments seen were ${json(p.listenerArgsSeen)}; pending after the arm=${p.pendingAfterTheArm}, the app\'s handle in it=${p.appHandleStandsInPendingAfterTheArm}. `
      + `FAILING WRITE (arm=${f.arm}): the write returned triggered=${f.triggeredReturnedByTheWrite} handles with the app\'s handle among them=${f.appHandleIsAmongTheWritesTriggeredHandles}; the app body ran ${f.appBodyCallsInTheWholeArm} time(s) — ${f.appBodyCallsInsideTheWriteWindow} in the window, ${f.appBodyCallsAfterTheWriteReturnedButBeforeThePass} between the verb\'s return and the pass, ${f.appBodyCallsAtTheTerminalArm} at the arm (the DISCARD left pending=${f.pendingAfterTheArm}). `
      + `CONTROL, the same fixture with no kernel (bare caller-made write): ${ctl.appBodyCallsForTheOneWrite} invocation(s) for the one write, ${ctl.callsInsideTheWriteWindow} of them inside the verb\'s window.`,
    verdict: (passOk && failOk && ctlOk) ? 'PASS' : 'FAIL',
  });
}

// =============================================================================================
// THE INSTANCE FIGURE (the declared member set) AND THE REPORT.
// =============================================================================================
const figureStore = freshStore();
const instanceMembers = Object.keys(figureStore).sort();
const memberFigure = {
  instanceMembers,
  memberCount: instanceMembers.length,
  settleIsAMember: typeof figureStore.settle === 'function',
  moduleNamespaceKeys: Object.keys(storeNs).sort(),
  settleIsANamedExportOfTheEntry: typeof storeNs.settle === 'function',
  note: 'the instance\'s members are read off the object `storeCreate` returned; the package\'s named export set is read off the module namespace.',
};

const totals = {
  cells: cells.length,
  verdictCount: verdicts.length,
  limb1: { cells: verdicts.filter((v) => v.limb === 1).length, pass: verdicts.filter((v) => v.limb === 1 && v.verdict === 'PASS').length, fail: verdicts.filter((v) => v.limb === 1 && v.verdict === 'FAIL').length },
  limb2: { cells: verdicts.filter((v) => v.limb === 2).length, pass: verdicts.filter((v) => v.limb === 2 && v.verdict === 'PASS').length, fail: verdicts.filter((v) => v.limb === 2 && v.verdict === 'FAIL').length },
  limb3: verdicts.filter((v) => v.limb === 3).map((v) => v.verdict),
  limb4: verdicts.filter((v) => v.limb === 4).map((v) => v.verdict),
  limb5: verdicts.filter((v) => v.limb === 5).map((v) => v.verdict),
  limb6: verdicts.filter((v) => v.limb === 6).map((v) => v.verdict),
  limb7: verdicts.filter((v) => v.limb === 7).map((v) => v.verdict),
};
const record = {
  demo: 'N7 GATE 6 — the `A116` ordering seam re-run and extension ("Verify ordering holding in demo")',
  run: RUN,
  layer: 'LIVE / ASSEMBLED PACKAGE',
  layerStatement: {
    resolution: 'the package is RESOLVED BY ITS PUBLISHED NAME through scratch/node_modules/provident-storeroom -> bindings/js (package.json v0.1.3, exports "." -> ./index.mjs); the kernel module is reached at its declared checkout home bindings/js/src/constraint-kernel.mjs, whose own fixture binding is the package SELF-REFERENCE (Node resolves \'provident-storeroom\' from bindings/js/src to bindings/js/index.mjs), so the kernel, the driver and the store share ONE module instance and ONE loaded addon; the Rust store behind the JS binding is exercised in a real Node process (node ' + process.version + ').',
    publishedInstall: 'NOT exercised, and it could not show this demo at all: package.json "files" carries index.mjs + README.md + index.d.ts only and "exports" declares "." alone, so an install from the registry carries NO src/constraint-kernel.mjs and no subpath that reaches it — the constraint kernel is checkout-only (kernel-surface.md §1 item 1). `settle` IS a member of the published instance (it is built by storeCreate in index.mjs), so a published install WOULD show the fourth member and the withheld post-verb window for a write an install\'s own code adopted — but it could not show the constraint pass, its ordering, its discard, or the kernel\'s two settle instants, because no consumer can reach src/.',
    settleWrapper: 'the instance\'s `settle` member is wrapped by this driver ON THE INSTANCE IT ITSELF CREATED, for the trail alone (it records the reach, the phase and the pending length, then calls the original member with the same receiver and same argument). No package file, no kernel module and no existing record was edited.',
  },
  fixture: {
    address: ADDR, prefixAddress: PREFIX, tier: TIER, bareAddresses: [BARE1, BARE2, SETTLE_PROBE_ADDR],
    constraintPair: { address: ADDR, ids: ['n7c', 'n7c2'] },
    registrationVariants: VARIANTS,
    drivingOrder: 'K-1 register -> listener registration -> K-2 commit -> K-3 runAttempt -> store read / log / report',
  },
  memberFigure,
  verdicts,
  totals,
  determinismDigest: null,
  twoPairPass,
  bareWrite,
  staleAdoption,
  deliveryCount,
  cellsWithOrdering: cells.filter((c) => c.order !== undefined),
  cellsOther: cells.filter((c) => c.order === undefined),
  trail: TRAIL,
};
const digestOf = (r) => {
  const copy = JSON.parse(JSON.stringify(r));
  delete copy.run;
  delete copy.determinismDigest;
  return createHash('sha256').update(JSON.stringify(copy)).digest('hex');
};
record.determinismDigest = digestOf(record);

const lines = [];
lines.push(`N7 GATE 6 ORDERING DEMO — run ${RUN} — LAYER: LIVE / ASSEMBLED PACKAGE`);
lines.push(`resolution: ${record.layerStatement.resolution}`);
lines.push(`published install: ${record.layerStatement.publishedInstall}`);
lines.push(`instance member figure: ${json(memberFigure.instanceMembers)} (settle is a member=${memberFigure.settleIsAMember}; settle is a named export=${memberFigure.settleIsANamedExportOfTheEntry})`);
lines.push('');
for (const v of verdicts) {
  lines.push(`[${v.cell}] LIMB ${v.limb} — ${v.verdict}`);
  lines.push(`  ${v.requires}`);
  lines.push(`  OBSERVED: ${v.observed}`);
  lines.push('');
}
lines.push(`TOTALS: ordering cells=${totals.cells} verdicts=${totals.verdictCount} limb1=${totals.limb1.pass}P/${totals.limb1.fail}F (of ${totals.limb1.cells}) limb2=${totals.limb2.pass}P/${totals.limb2.fail}F (of ${totals.limb2.cells})`);
lines.push(`limb3=${json(totals.limb3)} limb4=${json(totals.limb4)} limb5=${json(totals.limb5)} limb6=${json(totals.limb6)} limb7=${json(totals.limb7)}`);
lines.push(`determinismDigest=${record.determinismDigest}`);
writeFileSync(OUT, JSON.stringify(record, null, 2));
writeFileSync(TXT, lines.join('\n') + '\n');
console.log('');
console.log(lines.join('\n'));
console.log(`\nrecord: ${OUT}\nrecord: ${TXT}\ndigest: ${record.determinismDigest}`);
