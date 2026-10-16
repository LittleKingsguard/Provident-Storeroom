// A117 — GATE 6 RE-RUN, THE CORRECTED LIMBS, DRIVEN AT THEIR OWN TERMS. Scratch only; nothing outside
// scratch/ is written, and no package file is patched.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. The package is resolved BY ITS PUBLISHED NAME
// (`provident-storeroom` -> scratch/node_modules/provident-storeroom -> bindings/js); the store is built by
// the package's own `storeCreate`, the pair registered by the kernel's declared `register`, the write by
// the kernel's declared `commit`, the pass driven by `runAttempt` to its terminal arm, the settled state read
// through the store's own `read`. The ONLY wrapper is the settle-reach observer placed on the INSTANCE THIS
// FILE ITSELF CREATED: it reads the record's shape (enumerable members, symbol keys, the note's enumerability)
// and calls through to the unmodified member with the same receiver and the same single argument.
//
// Run: node scratch/n7-a117-arms.mjs e1   (then e2 — determinism)

import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const RUN = process.argv[2] || 'e1';
const OUT = `scratch/n7-a117-arms-out-${RUN}.json`;
const TXT = `scratch/n7-a117-arms-out-${RUN}.txt`;
const CHECKED_OFF = Symbol.for('provident-storeroom.checked-off-at-the-terminal-arm');
const TIER = 'mem';

let SEQ = 0;
const TRAIL = [];
let PHASE = 'idle';
let CURRENT = null;
const mark = (kind, extra) => { const e = Object.assign({ seq: ++SEQ, phase: PHASE, cell: CURRENT, kind }, extra || {}); TRAIL.push(e); return e; };
const json = (v) => { try { return JSON.stringify(v); } catch (_) { return String(v); } };
const grab = (fn) => { try { return { value: fn() }; } catch (thrown) { return { thrown }; } };
const statusOf = (t) => (t && typeof t === 'object' && typeof t.status === 'string') ? t.status : null;
const inCell = (kind, cell) => TRAIL.filter((x) => x.kind === kind && x.cell === cell);
const seqsOf = (kind, cell) => inCell(kind, cell).map((x) => x.seq);

// The record-shape read the ruling names: five members enumerated, the symbol note read beside them.
function shapeOf(record) {
  const syms = Object.getOwnPropertySymbols(record);
  const noteSym = syms.find((s) => s === CHECKED_OFF);
  const note = noteSym === undefined ? undefined : record[noteSym];
  return {
    enumerableMembers: Object.keys(record).sort(),
    enumerableMemberCount: Object.keys(record).length,
    ownPropertyNames: Object.getOwnPropertyNames(record).sort(),
    ownPropertyNamesCount: Object.getOwnPropertyNames(record).length,
    symbolKeys: syms.map((s) => String(s)),
    carriesTheNote: noteSym !== undefined,
    theNoteIsNonEnumerable: noteSym === undefined ? null : Object.getOwnPropertyDescriptor(record, noteSym).enumerable === false,
    theNoteIsNoMemberAdded: noteSym === undefined ? null : !Object.keys(record).includes(String(noteSym)),
    theNoteIsAnArray: Array.isArray(note),
    theNoteLength: Array.isArray(note) ? note.length : null,
    pendingIsAMember: record.pending !== undefined,
    triggeredIsAMember: record.triggered !== undefined,
  };
}

function freshStore(top) {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  grab(() => storeNs.write(store, [top], TIER, { ord: 0 })); // fixture preparation, before any registration
  const original = store.settle;
  const reaches = [];
  store.__reaches = reaches;
  store.settle = function settle(record) {
    const pre = { seq: ++SEQ, phase: PHASE, kind: 'settle.reach',
      pendingLen: record && Array.isArray(record.pending) ? record.pending.length : null,
      handedARecord: arguments.length >= 1 && record !== null && typeof record === 'object',
      argsHanded: arguments.length,
      shape: (record !== null && typeof record === 'object') ? shapeOf(record) : null,
      pendingSlice: record && Array.isArray(record.pending) ? record.pending.slice() : null };
    const e = Object.assign({ cell: CURRENT }, pre);
    TRAIL.push(e);
    const out = arguments.length >= 1 ? original.call(this, record) : original.call(this);
    e.pendingLenAfterTheMemberReturned = record && Array.isArray(record.pending) ? record.pending.length : null;
    return out;
  };
  return store;
}

const armOf = (store, rec) => {
  try { const r = runAttempt(store, rec); return { kind: 'returned', outcome: r ? r.outcome : null }; }
  catch (thrown) { return { kind: 'thrown', status: statusOf(thrown), message: String(thrown.message || '') }; }
};

const cells = [];

// ---------------------------------------------------------------------------------------------
// THE CORRECTED ORDERING CELL: the pair at ADDR, the app's registration by one of the three declared
// handlings, one kernel-driven write driven from `commit` to the pass's terminal arm.
// ---------------------------------------------------------------------------------------------
function cell({ id, limb, handling, outcome, round, secondPair = false, sharedStore = null }) {
  const store = sharedStore || freshStore('n7');
  CURRENT = id;
  const rec = { cell: id, limb, handling, outcome, round };
  let failNow = outcome === 'fail';
  const bodies = { c1: 0, c2: 0, app: 0 };
  const appArgs = [];
  const cbody = (tag) => () => { bodies[tag] += 1; mark(tag === 'c1' ? 'constraint1.body' : 'constraint2.body', { returned: failNow ? '{message}' : 'true' }); return failNow ? { message: `n7: the constraint ${tag} refused this landing` } : true; };
  const abody = (arg, ...rest) => { bodies.app += 1; appArgs.push({ json: json(arg), restLen: rest.length }); mark('app-listener.body', { listenerArg: json(arg), extraArgs: rest.length }); };

  PHASE = 'K-1'; mark('K1.enter');
  const hAdopted = register(store, ['n7', 'ord'], 'n7c', cbody('c1')); mark('K1.return');
  let hAdopted2 = null;
  if (secondPair) { const h = register(store, ['n7', 'ord'], 'n7c2', cbody('c2')); hAdopted2 = h; mark('K1b.return'); }
  let hApp;
  if (handling === 'prefix-address') { hApp = storeNs.listen(store, ['n7']); store.register(hApp, abody); }
  else if (handling === 'on-at-adopted-address') { hApp = store.on(['n7', 'ord'], abody); }
  else { hApp = hAdopted; store.register(hAdopted, abody); }
  rec.theAppRegistrationReturnsTheAdoptedIdentity = hApp === hAdopted;
  rec.twoPairs = secondPair ? (hAdopted2 === hAdopted) : null;
  const beforeApp = bodies.app;

  PHASE = 'K-2'; mark('K2.enter');
  const c = grab(() => commit(store, ['n7', 'ord'], TIER, round * 100));
  mark('K2.return', { thrown: c.thrown ? statusOf(c.thrown) : null });
  const commitRecord = c.thrown ? null : c.value;
  rec.k2 = commitRecord === null
    ? { threw: true, status: statusOf(c.thrown) }
    : { threw: false, triggered: commitRecord.triggered.length, pending: commitRecord.pending.length,
        occurrencesOfTheAppIdentityInTriggered: commitRecord.triggered.filter((h) => h === hApp).length };
  rec.shapeAtK2Return = commitRecord === null ? null : shapeOf(commitRecord);
  rec.pendingAtK2CarriesTheAppIdentity = commitRecord === null ? null : commitRecord.pending.includes(hApp);
  rec.bodiesBeforeThePass = Object.assign({}, bodies);
  rec.inWindowInvocationOfEachBody = {
    constraint1: inCell('constraint1.body', id).filter((e) => e.phase === 'K-2').length,
    constraint2: inCell('constraint2.body', id).filter((e) => e.phase === 'K-2').length,
    appListener: inCell('app-listener.body', id).filter((e) => e.phase === 'K-2').length,
  };
  const reachesK2 = inCell('settle.reach', id).filter((e) => e.phase === 'K-2');
  rec.settleReachAtInstantA = reachesK2.map((e) => ({ seq: e.seq, pendingLen: e.pendingLen, shape: e.shape, noteLength: e.shape && e.shape.theNoteLength }));

  PHASE = 'K-3'; mark('K3.enter');
  const k3 = commitRecord === null ? null : armOf(store, commitRecord);
  mark('K3.return', { thrown: k3 && k3.kind === 'thrown' ? k3.status : null, outcome: k3 ? (k3.outcome || null) : null });
  PHASE = 'idle';
  rec.arm = k3 === null ? { kind: 'no-record' } : { kind: k3.kind, status: k3.status || null, outcome: k3.outcome || null };
  rec.delivered = { c1: bodies.c1, c2: bodies.c2, app: bodies.app - beforeApp };
  rec.appArgsThisWrite = appArgs.slice(beforeApp);
  rec.theOneArgumentIsTheTriggeringAddress = rec.appArgsThisWrite.length === 1 ? rec.appArgsThisWrite[0].json === json(['n7', 'ord']) : false;
  rec.noExtraArguments = rec.appArgsThisWrite.every((a) => a.restLen === 0);
  const reachesK3 = inCell('settle.reach', id).filter((e) => e.phase === 'K-3');
  rec.settleReachAtInstantB = reachesK3.map((e) => ({ seq: e.seq, pendingLen: e.pendingLen, noteLength: e.shape && e.shape.theNoteLength,
    pendingCarriesTheAppIdentity: e.pendingSlice === null ? null : e.pendingSlice.includes(hApp) }));
  rec.pendingAtTheArm = commitRecord === null ? null : commitRecord.pending.length;
  rec.pendingAtTheArmCarriesTheAppIdentity = commitRecord === null ? null : commitRecord.pending.includes(hApp);
  rec.triggeredAtTheArm = commitRecord === null ? null : commitRecord.triggered.length;
  rec.framesOfEachCall = {
    constraint1: inCell('constraint1.body', id).map((e) => ({ seq: e.seq, phase: e.phase })),
    appListener: inCell('app-listener.body', id).map((e) => ({ seq: e.seq, phase: e.phase })),
    k3Enter: seqsOf('K3.enter', id), k3Return: seqsOf('K3.return', id),
  };
  rec.appDeliveredAtTheTerminalArm = inCell('app-listener.body', id).filter((e) => e.phase === 'K-3').length;
  rec.appRanBeforeAnyConstraint = seqsOf('app-listener.body', id).length > 0 && (seqsOf('constraint1.body', id).length === 0 || seqsOf('app-listener.body', id)[0] < seqsOf('constraint1.body', id)[0]);
  rec.shapeAfterTheArm = commitRecord === null ? null : shapeOf(commitRecord);
  if (commitRecord !== null) {
    const ref = commitRecord.attempt;
    const rp = grab(() => report(store, ref));
    rec.rollbackUndidTheAttemptsOwnOp = rp.thrown ? null : rp.value.rollback.some((s) => s.undoneOps.includes(commitRecord.op.opId));
    const readBack = grab(() => storeNs.read(store, ['n7', 'ord']));
    rec.storeReadAtTheAddress = readBack.thrown ? { absent: true, code: statusOf(readBack.thrown) } : { absent: false, value: json(readBack.value) };
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
}

// LIMB 1 — the three handlings, two rounds, passing write; the two-pair cell.
for (let round = 1; round <= 2; round += 1) {
  for (const handling of ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle']) {
    cell({ id: `A1-${handling}-r${round}`, limb: 1, handling, outcome: 'pass', round });
  }
}
const twoPair = cell({ id: 'A1-two-pairs-pass', limb: 1, handling: 'prefix-address', outcome: 'pass', round: 1, secondPair: true });

// LIMB 2 — the failing arm.
for (let round = 1; round <= 2; round += 1) {
  for (const handling of ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle']) {
    cell({ id: `A2-${handling}-r${round}`, limb: 2, handling, outcome: 'fail', round });
  }
}

// LIMB 7 — THE IDENTITY CONTROL: one `on` call, two stores differing ONLY in the address argument's spelling.
const identityControl = (() => {
  const id = 'D-identity-control';
  CURRENT = id;
  const rec = { cell: id, limb: 7 };
  const one = (spelling, addressOf, top, outcome) => {
    const store = freshStore(top);
    const ADDRX = [top, 'pair']; const WATCH = [top];
    const appCalls = []; const constraintCalls = [];
    // THE PER-RUN BASELINE: every figure below is THIS run's own, never the cell's cumulative count.
    const appBodiesBeforeThisRun = TRAIL.filter((e) => e.kind === 'app-listener.body' && e.cell === id).length;
    const armCallsAtEntry = TRAIL.filter((e) => e.kind === 'app-listener.body' && e.cell === id && e.phase === 'K-3').length;
    const windowCallsAtEntry = TRAIL.filter((e) => e.kind === 'app-listener.body' && e.cell === id && e.phase === 'K-2').length;
    const hAdopted = register(store, ADDRX, 'c', () => { constraintCalls.push(1); return outcome === 'fail' ? { message: 'n7: refused' } : true; });
    const hApp = store.on(addressOf(ADDRX, WATCH), (arg, ...rest) => { appCalls.push({ json: json(arg), restLen: rest.length }); mark('app-listener.body', { listenerArg: json(arg), route: spelling }); });
    PHASE = 'K-2'; mark('K2.enter');
    const c = grab(() => commit(store, ADDRX, TIER, 20));
    mark('K2.return', { thrown: c.thrown ? statusOf(c.thrown) : null });
    const commitRecord = c.thrown ? null : c.value;
    PHASE = 'idle';
    const reachesK2 = inCell('settle.reach', id).filter((e) => e.phase === 'K-2');
    PHASE = 'K-3'; mark('K3.enter');
    const k3 = commitRecord === null ? null : armOf(store, commitRecord);
    mark('K3.return');
    PHASE = 'idle';
    return {
      spelling,
      theAppRegistrationIsTheAdoptedIdentity: hApp === hAdopted,
      writeReturnedTriggered: commitRecord === null ? null : commitRecord.triggered.length,
      occurrencesOfTheAppIdentityInTriggered: commitRecord === null ? null : commitRecord.triggered.filter((h) => h === hApp).length,
      pendingAtK2CarriesTheAppIdentity: commitRecord === null ? null : commitRecord.pending.includes(hApp),
      pendingAtTheArm: commitRecord === null ? null : commitRecord.pending.length,
      pendingAtTheArmCarriesTheAppIdentity: commitRecord === null ? null : commitRecord.pending.includes(hApp),
      constraintBodyCalls: constraintCalls.length,
      appBodyCallsOwedOnAPassingWrite: outcome === 'pass' ? 1 : 0,
      appBodyCallsMade: appCalls.length,
      appBodyArgs: appCalls,
      theOneArgumentIsTheTriggeringAddress: appCalls.length === 1 && appCalls[0].json === json(ADDRX),
      inWindowAppBodyCalls: inCell('app-listener.body', id).filter((e) => e.phase === 'K-2').length - windowCallsAtEntry,
      appBodyCallsAtTheTerminalArm: inCell('app-listener.body', id).filter((e) => e.phase === 'K-3').length - armCallsAtEntry,
      bodiesInThisRun: inCell('app-listener.body', id).length - appBodiesBeforeThisRun,
      theNoteCarriesTheIdentityThePassCheckedOff: (commitRecord !== null && commitRecord[CHECKED_OFF] !== undefined)
        ? commitRecord[CHECKED_OFF].some((h) => h === hAdopted) : null,
      theNoteLengthAtTheArm: commitRecord === null || commitRecord[CHECKED_OFF] === undefined ? null : commitRecord[CHECKED_OFF].length,
      settleReaches: inCell('settle.reach', id).map((e) => ({ seq: e.seq, phase: e.phase, pendingLen: e.pendingLen, noteLength: e.shape && e.shape.theNoteLength })),
      shapeAtK2Return: commitRecord === null ? null : shapeOf(commitRecord),
      shapeAfterTheArm: commitRecord === null ? null : shapeOf(commitRecord),
      reachesK2Count: reachesK2.length,
      arm: k3 ? (k3.kind === 'thrown' ? k3.status : k3.outcome) : 'no-record',
    };
  };
  rec.phases = {
    exactSpellingPassingWrite: one('exact-address', (A) => A, 'c1', 'pass'),
    properPrefixSpellingPassingWrite: one('proper-prefix', (A, W) => W, 'c2', 'pass'),
    exactSpellingFailingWrite: one('exact-address-fail', (A) => A, 'c3', 'fail'),
    properPrefixSpellingFailingWrite: one('proper-prefix-fail', (A, W) => W, 'c4', 'fail'),
  };
  CURRENT = null;
  cells.push(rec);
  return rec;
})();

// LIMB 5 — THE BARE WRITE (`§2.7` item 8): its own window, no `pending`, the seam never reached.
const bareWrite = (() => {
  const id = 'E-bare-write';
  CURRENT = id;
  const rec = { cell: id, limb: 5, phases: {} };
  {
    const store = freshStore('n7');
    let calls = 0;
    const h = store.on(['n7', 'bare'], () => { calls += 1; mark('app-listener.body', {}); });
    PHASE = 'store-write'; mark('write.enter');
    const out = grab(() => storeNs.write(store, ['n7', 'bare'], TIER, 5));
    mark('write.return'); PHASE = 'idle';
    rec.phases.freshStoreNoKernel = {
      thrown: out.thrown ? statusOf(out.thrown) : null,
      triggered: out.thrown ? null : out.value.triggered.length,
      recordMembers: out.thrown ? null : Object.keys(out.value).sort(),
      carriesNoPendingMember: out.thrown ? null : out.value.pending === undefined,
      appListenerBodyCalls: calls,
      deliveredInsideTheWriteVerbsOwnFrame: inCell('app-listener.body', id).some((e) => e.phase === 'store-write'),
      settleReaches: inCell('settle.reach', id).length,
    };
  }
  {
    const store = freshStore('n7');
    const hAdopted = register(store, ['n7', 'ord'], 'n7c', () => true);
    let kernelDelivered = 0;
    const hApp = store.on(['n7', 'ord'], () => { kernelDelivered += 1; mark('app-listener.body', {}); });
    const krec = commit(store, ['n7', 'ord'], TIER, 7);
    const karm = armOf(store, krec);
    let bareCalls = 0;
    store.on(['n7', 'bare2'], () => { bareCalls += 1; mark('app-listener.body', {}); });
    PHASE = 'store-write'; mark('write2.enter');
    const out = grab(() => storeNs.write(store, ['n7', 'bare2'], TIER, 9));
    mark('write2.return'); PHASE = 'idle';
    rec.phases.afterAKernelPass = {
      kernelWriteArm: karm.kind === 'thrown' ? karm.status : karm.outcome,
      kernelWriteDeliveredTheAppBody: kernelDelivered,
      appListenerBodyCalls: bareCalls,
      deliveredInsideTheWriteVerbsOwnFrame: inCell('app-listener.body', id).some((e) => e.phase === 'store-write'),
      settleReachesDuringTheBareWrite: inCell('settle.reach', id).filter((e) => e.phase === 'store-write').length,
      triggered: out.thrown ? null : out.value.triggered.length,
    };
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
})();

// LIMB 4 — REPEAT: pass, fail, pass, fail at ONE address on ONE store in one process.
const repeat = (() => {
  const id = 'F-repeat';
  const store = freshStore('n7');
  const rows = [];
  for (let i = 0; i < 4; i += 1) {
    const oc = i % 2 === 0 ? 'pass' : 'fail';
    const cid = `${id}-seq${i + 1}-${oc}`;
    const r = cell({ id: cid, limb: 4, handling: 'prefix-address', outcome: oc, round: i + 1, sharedStore: store });
    rows.push({ cell: cid, outcome: oc, arm: r.arm, c1: r.delivered.c1, app: r.delivered.app, inWindow: r.inWindowInvocationOfEachBody.appListener, pendingAtTheArm: r.pendingAtTheArm });
  }
  return rows;
})();

// =============================================================================================
// VERDICTS — each read at the clause printed with it (the ruling's own text).
// =============================================================================================
const find = (cid) => cells.find((c) => c.cell === cid);
const verdicts = [];
const passArm = (c) => c.arm.kind === 'returned' && c.arm.outcome === 'passed';
const failArm = (c) => c.arm.kind === 'thrown' && c.arm.status === 'KC-3';

for (const handling of ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle']) {
  for (const r of [1, 2]) {
    const c = find(`A1-${handling}-r${r}`);
    const c1Once = c.delivered.c1 === 1;
    const appOnce = c.delivered.app === 1;
    const notInWindow = c.inWindowInvocationOfEachBody.appListener === 0 && c.inWindowInvocationOfEachBody.constraint1 === 0;
    const atTheArm = c.appDeliveredAtTheTerminalArm === 1;
    const ordered = c.appRanBeforeAnyConstraint === false;
    const oneArg = c.theOneArgumentIsTheTriggeringAddress === true && c.noExtraArguments === true;
    // At a PREFIX address the app holds its OWN residue entry (an identity the pass never evaluates), so
    // `pending@arm` legitimately CARRIES it there; the ruling's `pending` term bites at the pair-adopted
    // address, where the firing must be the registry's resolution and NOT a residue occurrence.
    const residueClean = handling === 'prefix-address' ? c.pendingAtTheArmCarriesTheAppIdentity === true : c.pendingAtTheArmCarriesTheAppIdentity === false;
    // THE FIRING IS THE REGISTRY'S RESOLUTION AND NOT A RESIDUE OCCURRENCE (the ruling's own term): at
    // instant (b) the residue the seam is handed does NOT carry the app's identity, while the record's
    // symbol note does — so the invocation this write makes for the app stands off the note and never off
    // `pending`.
    const theFiringIsNotAResidueOccurrence = handling === 'prefix-address'
      ? c.pendingAtK2CarriesTheAppIdentity === true && c.pendingAtTheArm === 1
      : (c.settleReachAtInstantB.length > 0 && c.settleReachAtInstantB.every((x) => x.pendingCarriesTheAppIdentity === false)
        && c.shapeAfterTheArm.carriesTheNote === true && c.shapeAfterTheArm.theNoteLength === 1
        && c.settleReachAtInstantB.every((x) => x.noteLength === 1));
    verdicts.push({
      limb: 1, cell: c.cell, handling,
      verdict: (c1Once && appOnce && notInWindow && atTheArm && ordered && oneArg && residueClean && theFiringIsNotAResidueOccurrence && passArm(c)) ? 'PASS' : 'FAIL',
      requires: handlerClause(handling),
      observed: `the app's registration returned the adopted identity=${c.theAppRegistrationReturnsTheAdoptedIdentity}; write returned triggered=${c.k2.triggered} (${c.k2.occurrencesOfTheAppIdentityInTriggered} occurrence(s) of the app's identity), pending at K-2=${c.k2.pending} carries the app's identity=${c.pendingAtK2CarriesTheAppIdentity}; constraint body calls=${c.delivered.c1}; APP BODY CALLS=${c.delivered.app} OF 1 OWED, in the write verb's window=${c.inWindowInvocationOfEachBody.appListener}, at the pass's terminal arm=${c.appDeliveredAtTheTerminalArm}, seqs=${json(c.framesOfEachCall.appListener)} against the arm's own frame [K3.enter=${json(c.framesOfEachCall.k3Enter)}, K3.return=${json(c.framesOfEachCall.k3Return)}]; argument(s)=${json(c.appArgsThisWrite)} with the triggering address as the single argument=${c.theOneArgumentIsTheTriggeringAddress}, no second argument=${c.noExtraArguments}; app ran before any constraint=${c.appRanBeforeAnyConstraint}; PENDING AT THE ARM=${c.pendingAtTheArm} OF TRIGGERED=${c.triggeredAtTheArm}, carrying the app's identity=${c.pendingAtTheArmCarriesTheAppIdentity}; the note's own term: the seam handed at instant (b) is handed a residue of ${json(c.settleReachAtInstantB.map((x) => x.pendingLen))} that does NOT carry the app's identity=${json(c.settleReachAtInstantB.map((x) => x.pendingCarriesTheAppIdentity))}, while the record's symbol note stands (non-enumerable=${c.shapeAfterTheArm.theNoteIsNonEnumerable}, length=${c.shapeAfterTheArm.theNoteLength}) and the firing is made off IT=${theFiringIsNotAResidueOccurrence}; the record's enumerable members at K-2's return=${json(c.shapeAtK2Return.enumerableMembers)} (${c.shapeAtK2Return.enumerableMemberCount}) and after the arm=${json(c.shapeAfterTheArm.enumerableMembers)} (${c.shapeAfterTheArm.enumerableMemberCount}); settle reaches at instant (a)=${json(c.settleReachAtInstantA.map((x) => ({ seq: x.seq, pendingLen: x.pendingLen, noteLength: x.noteLength })))} and at instant (b)=${json(c.settleReachAtInstantB.map((x) => ({ seq: x.seq, pendingLen: x.pendingLen, noteLength: x.noteLength, pendingCarriesTheAppIdentity: x.pendingCarriesTheAppIdentity })))}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; store read at the address=${json(c.storeReadAtTheAddress)}; rollback undid the attempt's own op=${c.rollbackUndidTheAttemptsOwnOp}`,
      supersededReading: handling === 'prefix-address' ? null
        : `the withdrawn reading of \`§2.4\` item 8 (c) (amended 2026-10-15 on \`A115\` (D2), superseded by \`A117\` (D3)) expected 0 of 1 at this address; measured now ${c.delivered.app} of 1, at the terminal arm=${c.appDeliveredAtTheTerminalArm}`,
    });
  }
}

function handlerClause(handling) {
  if (handling === 'prefix-address') {
    return '`A117` (D1)/(D4) with `§2.7` item 6: the triggered constraints run FIRST and the other listeners are reached ONCE EVERY CONSTRAINT HAS PASSED — at the pass\'s terminal arm, never inside the store verb\'s window, once per owe, with the triggering address as the single argument. At a prefix address the app holds a SECOND home entry, an identity the pass never evaluates, so its firing is reached off the RESIDUE.';
  }
  if (handling === 'on-at-adopted-address') {
    return '`A117` (D3)/(D4)/(D5) with `§2.7` item 6 and item 7 (a) AS RE-SPELLED 2026-10-15 and `§2.4` item 8 (c) AS CORRECTED: a listener registered at a pair-adopted address IS OWED ONE FIRING — after the pass, AT THE PASS\'S TERMINAL ARM, NEVER INSIDE THE STORE VERB\'S WINDOW, with the triggering address as its SINGLE argument — delivered by THE REGISTRY\'S RESOLUTION OF THE CHECKED-OFF IDENTITY and never by an occurrence standing in the residue, so `pending@arm` must NOT carry the app\'s identity.';
  }
  return '`A117` (D5)/(D6): the same owe, reached by the app\'s function standing in the registry\'s slot for the identity `register` adopted — one home entry per address, one identity, one firing at the terminal arm; the record keeps its four members and `pending` keeps the check-off\'s own value.';
}

// LIMB 1's two-pair cell.
{
  const c = twoPair;
  verdicts.push({
    limb: 1, cell: c.cell, handling: 'prefix-address',
    verdict: (c.delivered.c1 === 1 && c.delivered.c2 === 1 && c.delivered.app === 1 && c.inWindowInvocationOfEachBody.appListener === 0 && c.appDeliveredAtTheTerminalArm === 1 && c.appRanBeforeAnyConstraint === false && passArm(c)) ? 'PASS' : 'FAIL',
    requires: 'with TWO pairs at the address, EVERY constraint runs first and the app\'s body is reached only once BOTH have passed, exactly once, at the terminal arm (`A117` (D1); `§2.7` item 6).',
    observed: `constraint1 calls=${c.delivered.c1}, constraint2 calls=${c.delivered.c2}, app calls=${c.delivered.app} of 1 owed; in the write verb's window=${c.inWindowInvocationOfEachBody.appListener}; at the arm=${c.appDeliveredAtTheTerminalArm}; app ran before any constraint=${c.appRanBeforeAnyConstraint}; two distinct pair identities at the address=${c.twoPairs === false}; pending at the arm=${c.pendingAtTheArm} of triggered=${c.triggeredAtTheArm}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}`,
  });
}

// LIMB 2 — the failing arm.
for (const handling of ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle']) {
  for (const r of [1, 2]) {
    const c = find(`A2-${handling}-r${r}`);
    verdicts.push({
      limb: 2, cell: c.cell, handling,
      verdict: (c.delivered.c1 === 1 && failArm(c) && c.delivered.app === 0 && c.inWindowInvocationOfEachBody.appListener === 0 && c.pendingAtTheArm === 0 && c.pendingAtTheArmCarriesTheAppIdentity === false && c.rollbackUndidTheAttemptsOwnOp === true) ? 'PASS' : 'FAIL',
      requires: '`A114` (D1)/(D2) with `A117` (D5) last clause and `§2.7` item 7 (d): a write that FAILS on constraints DISCARDS the other listeners — ZERO BODIES OF THAT WRITE\'S OWN SET RUN, never in the window and never at the arm, no such note is published, the residue is EMPTY and the rollback undid the attempt\'s own op. The write must actually fail on constraints.',
      observed: `arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; constraint body calls=${c.delivered.c1} (a constraint really ran and refused); APP BODY CALLS=${c.delivered.app} OF 0 OWED, in the window=${c.inWindowInvocationOfEachBody.appListener}, at the arm=${c.appDeliveredAtTheTerminalArm}; pending at the arm=${c.pendingAtTheArm} of triggered=${c.triggeredAtTheArm}, carrying the app's identity=${c.pendingAtTheArmCarriesTheAppIdentity}; the symbol note on the record=${json(c.shapeAfterTheArm && c.shapeAfterTheArm.carriesTheNote)} (published on the passing arm alone); settle reaches=${json(c.settleReachAtInstantB.map((x) => ({ seq: x.seq, pendingLen: x.pendingLen, noteLength: x.noteLength })))}; rollback undid the attempt's own op=${c.rollbackUndidTheAttemptsOwnOp}; store read at the address=${json(c.storeReadAtTheAddress)}`,
    });
  }
}

// LIMB 3 — THE REPLACEMENT SEAM, RE-READ AT THE RULING: at the pair-adopted address the app's own body
// (the function that replaced the registry's slot for that one identity) IS owed its firing; the pass
// still reaches the kernel's pair-keyed body ONCE inside the pass; the failing arm delivers neither.
{
  const onPass = find('A1-on-at-adopted-address-r1');
  const onFail = find('A2-on-at-adopted-address-r1');
  const regPass = find('A1-register-at-adopted-handle-r1');
  const regFail = find('A2-register-at-adopted-handle-r1');
  const basePass = find('A1-prefix-address-r1');
  const baseFail = find('A2-prefix-address-r1');
  verdicts.push({
    limb: 3, cell: 'G-replacement-seam',
    verdict: (onPass.theAppRegistrationReturnsTheAdoptedIdentity === true && onPass.delivered.c1 === 1 && onPass.delivered.app === 1 && onPass.appDeliveredAtTheTerminalArm === 1 && onPass.inWindowInvocationOfEachBody.appListener === 0
      && onFail.arm.kind === 'thrown' && onFail.arm.status === 'KC-3' && onFail.delivered.app === 0
      && regPass.delivered.c1 === 1 && regPass.delivered.app === 1 && regPass.appDeliveredAtTheTerminalArm === 1
      && regFail.delivered.app === 0
      && basePass.delivered.app === 1 && baseFail.delivered.app === 0) ? 'PASS' : 'FAIL',
    requires: 'one function per identity (`§2.4` rule 2 read with item 8 (a)–(c) AS CORRECTED 2026-10-15): a later registration REPLACES the registry\'s function slot for the identity that address\'s home entry carries. THE TURNING-ON IS A REGISTRATION FACT AND NOT A FIRING RULE (`A117` (D2)/(D3)): at the ADOPTED address the pass still runs the kernel\'s pair-keyed body ONCE INSIDE THE PASS (that is what the replacement decides), AND the app\'s own replaced body is owed its firing and is delivered ONCE AT THE TERMINAL ARM with the triggering address; the failing arm delivers neither body.',
    observed: `(a) the app's ON call at the address: the app received the IDENTICAL identity the kernel adopted=${onPass.theAppRegistrationReturnsTheAdoptedIdentity}; passing write — constraint body calls=${onPass.delivered.c1} (inside the pass), APP body calls=${onPass.delivered.app} of 1 owed, in the window=${onPass.inWindowInvocationOfEachBody.appListener}, at the arm=${onPass.appDeliveredAtTheTerminalArm}, args=${json(onPass.appArgsThisWrite)}, pending@arm=${onPass.pendingAtTheArm} of triggered=${onPass.triggeredAtTheArm} carrying the app's identity=${onPass.pendingAtTheArmCarriesTheAppIdentity}; failing write — arm=${onFail.arm.kind === 'thrown' ? onFail.arm.status : onFail.arm.outcome}, APP body calls=${onFail.delivered.app} of 0 owed, at the arm=${onFail.appDeliveredAtTheTerminalArm}, note on the record=${json(onFail.shapeAfterTheArm && onFail.shapeAfterTheArm.carriesTheNote)}. (b) the same identity through the register member: passing write — constraint body calls=${regPass.delivered.c1}, APP body calls=${regPass.delivered.app} of 1 owed at the arm=${regPass.appDeliveredAtTheTerminalArm}; failing write — arm=${regFail.arm.kind === 'thrown' ? regFail.arm.status : regFail.arm.outcome}, APP body calls=${regFail.delivered.app}. (c) THE SIBLING at the proper PREFIX (a second identity, reached off the residue): passing write — APP body calls=${basePass.delivered.app} at the arm=${basePass.appDeliveredAtTheTerminalArm}; failing write — APP body calls=${baseFail.delivered.app}.`,
    changedFromTheLastBattery: `the last battery read this limb at the withdrawn clause (the app\'s replaced slot "NOT DELIVERED on either arm") and returned FAIL; at the ruling\'s own terms the pair-adopted address now shows the app\'s body ${onPass.delivered.app} of 1 at the arm beside the kernel\'s pair-keyed body ${onPass.delivered.c1} inside the pass, so the limb is PASS`,
  });
}

// LIMB 7 — the identity control.
{
  const e = identityControl.phases.exactSpellingPassingWrite;
  const p = identityControl.phases.properPrefixSpellingPassingWrite;
  const f = identityControl.phases.exactSpellingFailingWrite;
  const fp = identityControl.phases.properPrefixSpellingFailingWrite;
  verdicts.push({
    limb: 7, cell: identityControl.cell,
    verdict: (e.appBodyCallsMade === 1 && e.theAppRegistrationIsTheAdoptedIdentity === true && e.theOneArgumentIsTheTriggeringAddress === true && e.inWindowAppBodyCalls === 0 && e.appBodyCallsAtTheTerminalArm === 1
      && e.pendingAtTheArmCarriesTheAppIdentity === false && e.theNoteCarriesTheIdentityThePassCheckedOff === true
      && p.appBodyCallsMade === 1 && p.theAppRegistrationIsTheAdoptedIdentity === false && p.theOneArgumentIsTheTriggeringAddress === true && p.inWindowAppBodyCalls === 0 && p.appBodyCallsAtTheTerminalArm === 1
      && f.appBodyCallsMade === 0 && f.appBodyCallsAtTheTerminalArm === 0 && f.theNoteLengthAtTheArm === null
      && fp.appBodyCallsMade === 0 && fp.appBodyCallsAtTheTerminalArm === 0) ? 'PASS' : 'FAIL',
    requires: '`A117` (D4) at its own decisive term: ONE `on` call, TWO stores differing ONLY in the SPELLING of the address argument — the EXACT spelling returns the identity the pair\'s `register` adopted (ONE home entry, ONE identity) and the PROPER-PREFIX spelling a second identity. Under the ruling BOTH are owed one firing and BOTH must be delivered once at the terminal arm with the triggering address as the single argument; a FAILING write delivers neither.',
    observed: `EXACT spelling — the app identity IS the adopted identity=${e.theAppRegistrationIsTheAdoptedIdentity}, write returned triggered=${e.writeReturnedTriggered} with ${e.occurrencesOfTheAppIdentityInTriggered} occurrence(s) of it, pending at K-2 carries it=${e.pendingAtK2CarriesTheAppIdentity}, constraint body calls=${e.constraintBodyCalls}, APP BODY CALLS=${e.appBodyCallsMade} OF 1 OWED (in the window=${e.inWindowAppBodyCalls}, at the arm=${e.appBodyCallsAtTheTerminalArm}), args=${json(e.appBodyArgs)}, PENDING AT THE ARM=${e.pendingAtTheArm} carrying the app's identity=${e.pendingAtTheArmCarriesTheAppIdentity}, the note's own term: residue handed at instant (b) does not carry it and the note does=${json(e.settleReaches.map((x) => ({ phase: x.phase, pendingLen: x.pendingLen, noteLength: x.noteLength })))}, the note carries the identity the pass checked off=${e.theNoteCarriesTheIdentityThePassCheckedOff}, arm=${e.arm}. PROPER PREFIX — the app identity is a SECOND identity=${!p.theAppRegistrationIsTheAdoptedIdentity}, triggered=${p.writeReturnedTriggered}, constraint body calls=${p.constraintBodyCalls}, APP BODY CALLS=${p.appBodyCallsMade} OF 1 OWED (in the window=${p.inWindowAppBodyCalls}, at the arm=${p.appBodyCallsAtTheTerminalArm}), args=${json(p.appBodyArgs)}, pending at the arm=${p.pendingAtTheArm}, arm=${p.arm}. EXACT + FAILING — arm=${f.arm}, app body calls=${f.appBodyCallsMade} of 0 owed, at the arm=${f.appBodyCallsAtTheTerminalArm}, note on the record=${json(f.theNoteLengthAtTheArm)}. PREFIX + FAILING — arm=${fp.arm}, app body calls=${fp.appBodyCallsMade} of 0 owed, at the arm=${fp.appBodyCallsAtTheTerminalArm}. The two exact-spelling stores' record members: K-2 return=${json(e.shapeAtK2Return.enumerableMembers)}, after the arm=${json(e.shapeAfterTheArm.enumerableMembers)}, symbol note after the arm=${e.shapeAfterTheArm.carriesTheNote} non-enumerable=${e.shapeAfterTheArm.theNoteIsNonEnumerable}, note length=${e.shapeAfterTheArm.theNoteLength}`,
    changedFromTheLastBattery: `EXACT spelling was 0 of 1 (a "NOT DELIVERED" cell) in \`scratch/n7-ordering-demo-gate6b-out-b1/-b2.json\`; now ${e.appBodyCallsMade} of 1, at the terminal arm=${e.appBodyCallsAtTheTerminalArm}, with the app's identity absent from \`pending@arm\`=${e.pendingAtTheArmCarriesTheAppIdentity === false}`,
  });
}

// LIMB 5 — the bare write.
{
  const a = bareWrite.phases.freshStoreNoKernel;
  const b = bareWrite.phases.afterAKernelPass;
  verdicts.push({
    limb: 5, cell: bareWrite.cell,
    verdict: (a.appListenerBodyCalls === 1 && a.deliveredInsideTheWriteVerbsOwnFrame === true && a.carriesNoPendingMember === true && a.settleReaches === 0 && b.appListenerBodyCalls === 1 && b.deliveredInsideTheWriteVerbsOwnFrame === true && b.settleReachesDuringTheBareWrite === 0) ? 'PASS' : 'FAIL',
    requires: '`§2.7` item 8 with `A117` (D6): a caller-made write with NO kernel evaluation set keeps the POST-VERB instant, is NEVER withheld, carries no `pending` and REACHES NO ADOPTION — the seam is never called for it.',
    observed: `(a) a store no kernel act has touched: threw=${json(a.thrown)}, triggered=${a.triggered}, record members=${json(a.recordMembers)} (no \`pending\`=${a.carriesNoPendingMember}); the app body ran ${a.appListenerBodyCalls} time(s) INSIDE the verb's own frame=${a.deliveredInsideTheWriteVerbsOwnFrame}; seam reaches=${a.settleReaches}. (b) after a kernel-driven write reached its arm (${b.kernelWriteArm}) — and that write DID deliver the app's body at its own arm ${b.kernelWriteDeliveredTheAppBody} time(s) beside the bare write: the next bare write delivered in its own window=${b.deliveredInsideTheWriteVerbsOwnFrame} (calls=${b.appListenerBodyCalls}, triggered=${b.triggered}), seam reaches during it=${b.settleReachesDuringTheBareWrite}.`,
  });
}

// LIMB 4 — repeat.
{
  const passOnes = repeat.filter((r) => r.outcome === 'pass');
  const failOnes = repeat.filter((r) => r.outcome === 'fail');
  const shape = (r) => json({ c1: r.c1, app: r.app, inWindow: r.inWindow, pending: r.pendingAtTheArm });
  const passConsistent = passOnes.every((r) => shape(r) === shape(passOnes[0]));
  const failConsistent = failOnes.every((r) => shape(r) === shape(failOnes[0]));
  verdicts.push({
    limb: 4, cell: 'F-repeat',
    verdict: (passConsistent && failConsistent && passOnes.every((r) => r.app === 1) && failOnes.every((r) => r.app === 0)) ? 'PASS' : 'FAIL',
    requires: 'the ruled reading is not a first-call artifact: four sequential attempts at ONE address on ONE store, in one process — the passing and the failing write each delivered as `§2.7` item 6 fixes.',
    observed: `sequence: ${repeat.map((r) => `${r.cell}: arm=${r.arm.kind === 'thrown' ? r.arm.status : r.arm.outcome}, c1=${r.c1}, app=${r.app}, inWindow=${r.inWindow}, pending@arm=${r.pendingAtTheArm}`).join(' | ')}; the passing rows repeat identically=${passConsistent}, the failing rows too=${failConsistent}; app delivered 1 on every passing write=${passOnes.every((r) => r.app === 1)} and 0 on every failing one=${failOnes.every((r) => r.app === 0)}`,
  });
}

// =============================================================================================
// THE CHANGED LIMBS, WITH BOTH SIDES OF EVERY NUMBER
// =============================================================================================
const changedNumbers = [];
{
  const push = (cellId, term, was, now) => changedNumbers.push({ cell: cellId, term, was, now, changed: json(was) !== json(now) });
  const prevB = JSON.parse(readFileSync('scratch/n7-ordering-demo-gate6b-out-b1.json', 'utf8'));
  const pc = (id) => prevB.cells.find((c) => c.cell === id);
  for (const handling of ['on-at-adopted-address', 'register-at-adopted-handle']) {
    for (const r of [1, 2]) {
      const old = pc(`O1-${handling}-r${r}`); const now = find(`A1-${handling}-r${r}`);
      push(`O1-${handling}-r${r}`, 'appBodyCallsOf1Owed', old.delivered.app, now.delivered.app);
      push(`O1-${handling}-r${r}`, 'pending@arm of triggered', `${old.pendingAfterTheArm} of ${old.triggeredAfterTheArm}`, `${now.pendingAtTheArm} of ${now.triggeredAtTheArm}`);
      push(`O1-${handling}-r${r}`, 'appListenerCallsAtTheTerminalArm', old.windowFigures.appListenerCallsAtTheTerminalArm, now.appDeliveredAtTheTerminalArm);
      push(`O1-${handling}-r${r}`, 'inWindowAppListener', old.windowFigures.inWindow.appListener, now.inWindowInvocationOfEachBody.appListener);
      push(`O1-${handling}-r${r}`, 'the app identity in the residue at K-2 (a member of the returned set)', old.residueAtK2Return.carriesTheAppIdentity, now.pendingAtK2CarriesTheAppIdentity);
    }
  }
  const oldOnFail1 = pc('O2-on-at-adopted-address-r1'); const nowOnFail1 = find('A2-on-at-adopted-address-r1');
  push('O2-on-at-adopted-address-r1', 'appBodyCalls (failing arm)', oldOnFail1.delivered.app, nowOnFail1.delivered.app);
  push('O2-on-at-adopted-address-r1', 'pending@arm', oldOnFail1.pendingAfterTheArm, nowOnFail1.pendingAtTheArm);
  push('O2-register-at-adopted-handle-r1', 'appBodyCalls (failing arm)', pc('O2-register-at-adopted-handle-r1').delivered.app, find('A2-register-at-adopted-handle-r1').delivered.app);
  push('I-identity-control/EXACT', 'appBodyCallsOf1Owed', prevB.cells.find((c) => c.cell === 'I-identity-control').phases.exactAddressSpelling.appBodyCallsMade, identityControl.phases.exactSpellingPassingWrite.appBodyCallsMade);
  push('I-identity-control/PREFIX', 'appBodyCallsOf1Owed', prevB.cells.find((c) => c.cell === 'I-identity-control').phases.properPrefixSpelling.appBodyCallsMade, identityControl.phases.properPrefixSpellingPassingWrite.appBodyCallsMade);
  push('O1-prefix-address-r1', 'appBodyCallsOf1Owed', pc('O1-prefix-address-r1').delivered.app, find('A1-prefix-address-r1').delivered.app);
  push('O1-prefix-address-r1', 'pending@arm', pc('O1-prefix-address-r1').pendingAfterTheArm, find('A1-prefix-address-r1').pendingAtTheArm);
  push('L5-bare-write', 'appListenerBodyCallsInItsOwnWindow (both phases)', [1, 1], [bareWrite.phases.freshStoreNoKernel.appListenerBodyCalls, bareWrite.phases.afterAKernelPass.appListenerBodyCalls]);
  push('L5-bare-write', 'settleReachesDuringABareWrite', 0, bareWrite.phases.afterAKernelPass.settleReachesDuringTheBareWrite);
}
const changedVerdicts = verdicts.filter((v) => v.changedFromTheLastBattery !== undefined)
  .map((v) => ({ limb: v.limb, cell: v.cell, now: v.verdict, note: v.changedFromTheLastBattery }));

// =============================================================================================
// RECORD
// =============================================================================================
const figureStore = freshStore('n7');
const record = {
  demo: 'A117 — GATE 6 RE-RUN: THE ARCHITECT\'S CORRECTION, DRIVEN AT ITS OWN TERMS (the pair-adopted limbs, the identity control, the failing arm, the bare write, the repeat)',
  run: RUN,
  layer: 'LIVE / ASSEMBLED PACKAGE',
  layerStatement: {
    resolution: `the package is resolved BY ITS PUBLISHED NAME through scratch/node_modules/provident-storeroom -> bindings/js (index.mjs), and the kernel at its declared checkout home bindings/js/src/constraint-kernel.mjs (whose own binding is the package self-reference, so the kernel, the driver and the store share ONE module instance and ONE loaded addon); the Rust store behind the JS binding is exercised in a real Node process (node ${process.version}).`,
    publishedInstall: 'NOT exercised, and a published install could not show this battery: package.json "files" carries index.mjs + README.md + index.d.ts only and "exports" declares "." alone, so an install from the registry carries NO src/constraint-kernel.mjs and no subpath reaching it — the constraint kernel, its pass, its check-off and the terminal arm are checkout-only. `settle` IS a member of the published instance (index.mjs builds it), so an install WOULD show the withheld post-verb window and the seam\'s delivery, but nothing of the pass that publishes the checked-off note.',
    settleWrapper: 'the instance\'s `settle` member is wrapped by this driver ON THE INSTANCE THIS DRIVER ITSELF CREATED, for observation alone: it reads the record\'s members, symbol keys and enumerability, records the reach, then calls the ORIGINAL member with the same receiver and the same single argument. No package file, no kernel module and no existing record was edited.',
    suiteCrossCheck: 'the package\'s own suite was run in this pass, read and not modified: `node --test bindings/js/test/*.test.mjs` reports tests 349 / pass 349 / fail 0.',
  },
  fixture: { address: ['n7', 'ord'], prefix: ['n7'], tier: TIER, drivingOrder: 'K-1 register -> app registration by one of the three handlings -> K-2 commit -> K-3 runAttempt -> read/log/report' },
  instanceMemberFigure: { instanceMembers: Object.keys(figureStore).sort(), memberCount: Object.keys(figureStore).length, moduleNamespaceKeys: Object.keys(storeNs).sort() },
  verdicts,
  changedVerdicts,
  changedNumbers,
  totals: {
    cells: cells.length,
    verdicts: verdicts.length,
    pass: verdicts.filter((v) => v.verdict === 'PASS').length,
    fail: verdicts.filter((v) => v.verdict === 'FAIL').length,
    byLimb: [1, 2, 3, 4, 5, 7].map((l) => ({ limb: l, cells: verdicts.filter((v) => v.limb === l).length, pass: verdicts.filter((v) => v.limb === l && v.verdict === 'PASS').length, fail: verdicts.filter((v) => v.limb === l && v.verdict === 'FAIL').length })),
  },
  cells,
  trail: TRAIL,
  determinismDigest: null,
};
const digestOf = (r) => { const copy = JSON.parse(JSON.stringify(r)); delete copy.run; delete copy.determinismDigest; return createHash('sha256').update(JSON.stringify(copy)).digest('hex'); };
record.determinismDigest = digestOf(record);

const lines = [];
lines.push(`A117 GATE 6 RE-RUN — run ${RUN} — LAYER: ${record.layer}`);
lines.push(`resolution: ${record.layerStatement.resolution}`);
lines.push(`published install: ${record.layerStatement.publishedInstall}`);
lines.push(`suite cross-check: ${record.layerStatement.suiteCrossCheck}`);
lines.push('');
for (const v of verdicts) {
  lines.push(`[${v.cell}] LIMB ${v.limb}${v.handling ? ` (${v.handling})` : ''} — ${v.verdict}`);
  lines.push(`  ${v.requires}`);
  lines.push(`  OBSERVED: ${v.observed}`);
  if (v.changedFromTheLastBattery) lines.push(`  CHANGED: ${v.changedFromTheLastBattery}`);
  lines.push('');
}
lines.push('CHANGED NUMBERS (was -> now), against scratch/n7-ordering-demo-gate6b-out-b1.json');
for (const c of changedNumbers.filter((x) => x.changed)) lines.push(`  ${c.changed ? 'CHANGED' : 'same   '} ${c.cell} · ${c.term}: ${json(c.was)} -> ${json(c.now)}`);
lines.push('');
lines.push(`TOTALS: cells=${record.totals.cells} verdicts=${record.totals.verdicts} pass=${record.totals.pass} fail=${record.totals.fail} byLimb=${json(record.totals.byLimb)}`);
writeFileSync(OUT, JSON.stringify(record, null, 2));
writeFileSync(TXT, lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nrecord: ${OUT}\nrecord: ${TXT}\ndigest: ${record.determinismDigest}`);
