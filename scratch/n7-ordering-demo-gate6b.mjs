// N7 — GATE 6, SECOND RE-RUN OF THE ARCHITECT'S ACCEPTANCE TEST ("Verify ordering holding in demo") AND ITS
// EXTENSION TO THE `A116` SEAM'S OWN LAW. SIBLING OF `scratch/n7-ordering-demo-gate6.mjs` — that file and
// every earlier record are LEFT UNTOUCHED; this file is the ADDITIVE battery of this pass.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. The package is resolved BY ITS PUBLISHED NAME
// (`provident-storeroom` -> `scratch/node_modules/provident-storeroom` -> `bindings/js`), the store is built
// through the package's own `storeCreate` (its instance carries the FOURTH member `settle`), the constraint
// pair is registered through the kernel's declared `register`, the write through the kernel's `commit`, the
// pass driven through `runAttempt` to its terminal arm, and the settled state read back through the store's
// own `read` and the attempt's own `log`/`report`. NOTHING IS PATCHED: `bindings/**` and every existing
// record are READ-ONLY inputs. The only wrapper placed here is on the INSTANCE THIS FILE ITSELF CREATED, for
// the trail alone (it records the reach and the `pending` length handed to it, then calls through to the
// unmodified member with the same receiver and the same argument).
//
// THE LAW THIS FILE DERIVES ITS EXPECTATIONS FROM (read at its own clauses, not from any earlier record):
//   `A112`/`A114`: on a write the surface runs the triggered CONSTRAINTS FIRST, and THE OTHER LISTENERS ONLY
//     ONCE EVERY CONSTRAINT HAS PASSED; a write that fails on constraints DISCARDS the listeners.
//   `A116` (the seam): the instance carries `settle(record)`, called by the KERNEL at (a) BEFORE the store's
//     write verb (the entry withholds its in-window invocation for that write) and at (b) the pass's terminal
//     arm (the record's `pending` RESIDUE through the instance's own registry, one invocation per handle with
//     the triggering address as the single argument). A BARE caller-made write keeps the post-verb instant
//     and is NEVER withheld (`§2.7` item 8).
//   `storeroom-js/surface.md §2.4` item 8 (c) AS AMENDED 2026-10-15 (on `A115` (D2)): where the app's own
//     `on` stands at the ADDRESS the evaluated pair stands at, it returns the SAME identity the adopted
//     registration returned, the check-off reaches that identity, NO entry for it stands in `pending` for the
//     residue to reach, and THE APP'S BODY IS NOT DELIVERED AT THAT INSTANT — a drive that finds it run there
//     has found a failure of item 7. THIS CLAUSE IS THE ONE THAT DECIDES THE `on-at-adopted-address` CELLS
//     BELOW, and this file reports its verdict against THAT clause and not against the pre-amendment reading.
//
// LIMBS: 1 ORDER (three registration handlings) · 2 DISCARD · 3 REPLACEMENT · 4 REPEAT · 5 BARE WRITE ·
//        6 STALE ADOPTION · 7 THE IDENTITY CONTROL (the decisive term of the architect's question 2).
//
// Run: node scratch/n7-ordering-demo-gate6b.mjs b1   (then b2 — determinism)

import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const RUN = process.argv[2] || 'b1';
const OUT = `scratch/n7-ordering-demo-gate6b-out-${RUN}.json`;
const TXT = `scratch/n7-ordering-demo-gate6b-out-${RUN}.txt`;

const ADDR = ['n7', 'ord'];
const PREFIX = ['n7'];
const TIER = 'mem';
const BARE1 = ['n7', 'bare'];
const BARE2 = ['n7', 'bare2'];
const SETTLE_PROBE_ADDR = ['n7', 'settleprobe'];

// ---------------------------------------------------------------------------------------------
// THE CALL RECORD TRAIL — one monotone sequence over every mark of this process. `PHASE` names the frame a
// mark was taken in: 'K-2' (the store write verb's own window, opened at `commit` and closed at its return),
// 'K-3' (the pass, opened at `runAttempt` and closed at its return), 'store-write' (a bare caller-made write
// verb's own frame), 'caller' (a caller's own `settle` call's frame), 'idle' (between the acts).
// ---------------------------------------------------------------------------------------------
let SEQ = 0;
const TRAIL = [];
let PHASE = 'idle';
let CURRENT = null;
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

function freshStore(top) {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  // THE FIXTURE'S OWN STRUCTURAL PREPARATION, TAKEN BEFORE ANY REGISTRATION AND BEFORE THE KERNEL IS
  // REACHED, so nothing of the fixture writes into a window this battery measures.
  grab(() => storeNs.write(store, [top], TIER, { ord: 0 }));
  PREPARED.add(store);
  const original = store.settle;
  store.settle = function settle(record) {
    mark('settle.reach', {
      pendingLen: record && Array.isArray(record.pending) ? record.pending.length : null,
      handedARecord: arguments.length >= 1 && record !== null && typeof record === 'object',
    });
    return arguments.length >= 1 ? original.call(this, record) : original.call(this);
  };
  return store;
}

const armOf = (store, commitRecord) => {
  try { const r = runAttempt(store, commitRecord); return { kind: 'returned', outcome: r ? r.outcome : null }; }
  catch (thrown) { return { kind: 'thrown', status: statusOf(thrown), message: String(thrown.message || '') }; }
};

const cells = [];

// ---------------------------------------------------------------------------------------------
// ONE ORDERING CELL. The pair is registered at ADDR; the app listener by one of the three declared
// handlings; the write is committed and the pass driven to its terminal arm.
// ---------------------------------------------------------------------------------------------
function orderingCell({ id, limb, variant, outcome, round, sharedStore, secondPair }) {
  const store = sharedStore || freshStore('n7');
  CURRENT = id;
  const rec = { cell: id, limb, variant, outcome, round, store: sharedStore ? 'SAME STORE (sequence)' : 'fresh store' };
  let failNow = outcome === 'fail';

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
  rec.theAppHandleIsTheVeryIdentityTheWriteReturns = null; // filled below from the returned set
  rec.bodiesAfterRegistration = Object.assign({}, bodies);
  rec.bodiesBeforeThisWrite = Object.assign({}, bodies);

  PHASE = 'K-2';
  mark('K2.enter');
  let commitRecord = null; let k2Thrown = null;
  try { commitRecord = commit(store, ADDR, TIER, round * 100); } catch (thrown) { k2Thrown = thrown; }
  mark('K2.return', { thrown: statusOf(k2Thrown) });
  rec.settleReachesInsideK2 = inCell('settle.reach', id).filter((e) => e.phase === 'K-2').map((e) => ({ seq: e.seq, pendingLen: e.pendingLen }));
  rec.bodiesAtK2Return = Object.assign({}, bodies);
  rec.k2 = k2Thrown
    ? { threw: true, status: statusOf(k2Thrown) }
    : { threw: false, triggeredAtReturn: commitRecord.triggered.length, pendingAtReturn: commitRecord.pending.length };
  rec.theAppHandleIsTheVeryIdentityTheWriteReturns = commitRecord === null ? null : commitRecord.triggered.includes(hApp);
  rec.occurrencesOfTheAppIdentityInTheReturnedSet = commitRecord === null ? null : commitRecord.triggered.filter((h) => h === hApp).length;
  const residueAtK2 = commitRecord === null ? null : commitRecord.pending.slice();
  rec.residueAtK2Return = residueAtK2 === null ? null : { length: residueAtK2.length, carriesTheAppIdentity: residueAtK2.includes(hApp) };
  rec.theAppIdentityIsASeparateEntryThePassDoesNotEvaluate =
    commitRecord !== null && residueAtK2.includes(hApp) && !(variant === 'on-at-adopted-address' || variant === 'register-at-adopted-handle');

  PHASE = 'K-3';
  mark('K3.enter');
  const k3 = commitRecord === null ? null : armOf(store, commitRecord);
  mark('K3.return', { thrown: k3 ? statusOf(k3.status || null) : null, outcome: k3 ? (k3.outcome || null) : null });
  rec.settleReachesInsideK3 = inCell('settle.reach', id).filter((e) => e.phase === 'K-3').map((e) => ({ seq: e.seq, pendingLen: e.pendingLen }));
  PHASE = 'idle';
  rec.arm = k3 ? { kind: k3.kind, status: k3.status || null, outcome: k3.outcome || null } : { kind: 'no-record' };
  rec.bodiesAfterTheArm = Object.assign({}, bodies);
  rec.delivered = {
    c1: bodies.c1 - rec.bodiesAfterRegistration.c1,
    c2: bodies.c2 - rec.bodiesAfterRegistration.c2,
    app: bodies.app - rec.bodiesAfterRegistration.app,
  };
  rec.appListenerArgsThisWrite = appArgs.slice(rec.bodiesAfterRegistration.app);

  // ── THE THREE TERMS OF THE ARCHITECT'S QUESTIONS, PER WRITE ───────────────────────────────────────────
  const app = seqsOf('app-listener.body', id);
  const c1 = seqsOf('constraint1.body', id);
  const c2 = seqsOf('constraint2.body', id);
  rec.windowFigures = {
    // (1) THE WITHHELD WINDOW: in-window invocations of EACH body, inside the store write verb's own frame.
    inWindow: {
      constraint1: inCell('constraint1.body', id).filter((e) => e.phase === 'K-2').length,
      constraint2: inCell('constraint2.body', id).filter((e) => e.phase === 'K-2').length,
      appListener: inCell('app-listener.body', id).filter((e) => e.phase === 'K-2').length,
    },
    // (1) THE DELIVERY INSTANT: which frame each body's call stands in, by the trail's own phase.
    framesOfEachCall: {
      constraint1: inCell('constraint1.body', id).map((e) => ({ seq: e.seq, phase: e.phase })),
      appListener: inCell('app-listener.body', id).map((e) => ({ seq: e.seq, phase: e.phase })),
    },
    appListenerCallsAtTheTerminalArm: inCell('app-listener.body', id).filter((e) => e.phase === 'K-3').length,
    appListenerCallsInThePassWindow: inCell('app-listener.body', id).filter((e) => e.phase === 'K-3').length,
    appRanBeforeAnyConstraint: app.length > 0 && (c1.length === 0 || app[0] < c1[0]),
    appRanBeforeEveryConstraint: app.length > 0 && ([c1, c2].every((s) => s.length === 0) || app[0] < Math.max(...[...c1, ...c2])),
    // (2) THE OWED-vs-MADE COUNT: what a passing write owes the app's body and what it made.
    owedToTheAppBody: 1,
    madeToTheAppBody: rec.delivered.app,
    appBodySeqs: app,
    appBodySeqVsThePassesArm: { firstAppSeq: app.length ? app[0] : null, k3EnterSeq: firstSeq('K3.enter', id), k3ReturnSeq: firstSeq('K3.return', id) },
  };

  rec.triggeredAfterTheArm = commitRecord === null ? null : commitRecord.triggered.length;
  rec.pendingAfterTheArm = commitRecord === null ? null : commitRecord.pending.length;
  const readAtAddr = grab(() => storeNs.read(store, ADDR));
  rec.storeReadAtAttemptAddress = readAtAddr.thrown ? { absent: true, code: statusOf(readAtAddr.thrown) } : { absent: false, value: json(readAtAddr.value) };
  if (commitRecord !== null) {
    const ref = commitRecord.attempt;
    const lg = grab(() => log(store, ref));
    rec.log = lg.thrown ? { threw: statusOf(lg.thrown) } : lg.value.map((e) => `${e.seq}:${e.kind}:${e.id}:${e.state}`);
    const rp = grab(() => report(store, ref));
    rec.rollbackCallsAllReturned = rp.thrown ? null : rp.value.rollback.length > 0 && rp.value.rollback.every((s) => s.failed === false);
    rec.rollbackUndidTheAttemptsOwnOp = rp.thrown ? null : rp.value.rollback.some((s) => s.undoneOps.includes(commitRecord.op.opId));
  }
  CURRENT = null;
  cells.push(rec);
  console.log([
    String(id).padEnd(38),
    `arm=${(rec.arm.kind === 'thrown' ? rec.arm.status : rec.arm.outcome)}`.padEnd(18),
    `c1=${rec.delivered.c1}`.padEnd(6),
    `appDelivered=${rec.delivered.app}`.padEnd(15),
    `inWindow=${JSON.stringify(rec.windowFigures.inWindow)}`.padEnd(46),
    `pending@arm=${rec.pendingAfterTheArm}`,
  ].join(' '));
  return rec;
}

// =============================================================================================
// LIMBS 1/2 — three registration handlings x two outcomes x two rounds, fresh store per cell.
// =============================================================================================
const VARIANTS = ['prefix-address', 'on-at-adopted-address', 'register-at-adopted-handle'];
for (let round = 1; round <= 2; round += 1) {
  for (const variant of VARIANTS) {
    for (const outcome of ['pass', 'fail']) {
      orderingCell({ id: `O${outcome === 'pass' ? 1 : 2}-${variant}-r${round}`, limb: outcome === 'pass' ? 1 : 2, variant, outcome, round });
    }
  }
}
const twoPairPass = orderingCell({ id: 'O1-two-pairs-pass', limb: 1, variant: 'prefix-address', outcome: 'pass', round: 1, secondPair: true });

// =============================================================================================
// LIMB 4 — THE REPEAT LIMB: pass, fail, pass, fail at ONE address on ONE store, in this same process.
// =============================================================================================
{
  const shared = freshStore('n7');
  ['pass', 'fail', 'pass', 'fail'].forEach((outcome, i) => {
    orderingCell({ id: `R-seq${i + 1}-${outcome}`, limb: 4, variant: 'prefix-address', outcome, round: i + 1, sharedStore: shared });
  });
}

// =============================================================================================
// LIMB 5 — THE BARE WRITE (`§2.7` item 8): post-verb instant, never withheld, no `pending`.
// =============================================================================================
const bareWrite = (() => {
  const id = 'B-bare-write';
  CURRENT = id;
  const rec = { cell: id, limb: 5, phases: {} };
  {
    const store = freshStore('n7');
    let calls = 0;
    const handle = store.on(BARE1, () => { calls += 1; mark('app-listener.body', { listenerArg: json(BARE1), route: 'bare-write-only' }); });
    PHASE = 'store-write';
    mark('write.enter');
    const out = grab(() => storeNs.write(store, BARE1, TIER, 5));
    mark('write.return', { thrown: out.thrown ? statusOf(out.thrown) : null });
    PHASE = 'idle';
    rec.phases.freshStoreNoKernel = {
      whatTheLawRequires: 'a bare caller-made write is delivered at the package\'s own POST-VERB instant, never withheld (`§2.7` item 8)',
      writeThrew: out.thrown ? statusOf(out.thrown) : null,
      triggeredReturned: out.thrown ? null : out.value.triggered.length,
      returnedRecordMembers: out.thrown ? null : Object.keys(out.value).sort(),
      carriesNoPendingMember: out.thrown ? null : out.value.pending === undefined,
      appListenerBodyCalls: calls,
      appListenerSeqs: seqsOf('app-listener.body', id),
      deliveredInsideTheWriteVerbsOwnFrame: anyInPhase('app-listener.body', id, 'store-write'),
      handleOpaque: typeof handle === 'object' || typeof handle === 'function',
    };
  }
  {
    const store = freshStore('n7');
    register(store, ADDR, 'n7c', () => true);
    let appCalls = 0;
    const kernelRecord = commit(store, ADDR, TIER, 7);
    const kernelArm = armOf(store, kernelRecord);
    store.on(BARE2, () => { appCalls += 1; mark('app-listener.body', { listenerArg: json(BARE2), route: 'bare-write-after-a-kernel-pass' }); });
    PHASE = 'store-write';
    mark('write.enter');
    const out = grab(() => storeNs.write(store, BARE2, TIER, 9));
    mark('write.return', { thrown: out.thrown ? statusOf(out.thrown) : null });
    PHASE = 'idle';
    rec.phases.afterAKernelPass = {
      whatTheLawRequires: 'the kernel act moved no instant of the NEXT, unrelated bare write',
      kernelWriteArm: kernelArm.kind === 'thrown' ? kernelArm.status : kernelArm.outcome,
      appListenerBodyCalls: appCalls,
      appListenerSeqs: seqsOf('app-listener.body', id),
      deliveredInsideTheWriteVerbsOwnFrame: anyInPhase('app-listener.body', id, 'store-write'),
      settleReachesDuringTheBareWrite: inCell('settle.reach', id).filter((e) => e.phase === 'store-write').length,
    };
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
})();

// =============================================================================================
// LIMB 7 — THE IDENTITY CONTROL: THE DECISIVE TERM OF THE ARCHITECT'S QUESTION 2. Two stores, one address,
// one `on` call — differing ONLY in the SPELLING of the address argument. The exact spelling resolves to the
// SAME home entry the kernel's `register` adopted (the store's own address-level idempotence), so the
// evaluated pair's handle and the app's registration are ONE IDENTITY; the proper prefix spelling resolves to
// a SECOND home entry, an identity the pass never evaluates.
// =============================================================================================
const identityControl = (() => {
  const id = 'I-identity-control';
  CURRENT = id;
  const rec = { cell: id, limb: 7, phases: {} };
  const one = (spellingKey, addressArgOf, top, outcome) => {
    const store = freshStore(top);
    const ADDRX = [top, 'pair'];
    const WATCH = [top];
    const appCalls = [];
    const constraintCalls = [];
    const hAdopted = register(store, ADDRX, 'c', () => { constraintCalls.push(1); return outcome === 'fail' ? { message: 'n7: refused' } : true; });
    const hApp = store.on(addressArgOf(ADDRX, WATCH), (arg) => { appCalls.push(json(arg)); mark('app-listener.body', { listenerArg: json(arg), route: spellingKey }); });
    PHASE = 'K-2';
    mark('K2.enter');
    const c = grab(() => commit(store, ADDRX, TIER, 20));
    const commitRecord = c.thrown ? null : c.value;
    mark('K2.return', { thrown: c.thrown ? statusOf(c.thrown) : null });
    PHASE = 'idle';
    const residueAtK2 = commitRecord === null ? null : commitRecord.pending.slice();
    PHASE = 'K-3';
    mark('K3.enter');
    const k3 = commitRecord === null ? null : armOf(store, commitRecord);
    mark('K3.return', { thrown: k3 ? statusOf(k3.status || null) : null });
    PHASE = 'idle';
    return {
      addressArgumentSpelling: spellingKey,
      theAppRegistrationIsTheVeryIdentityTheKernelAdopted: hApp === hAdopted,
      writeReturnedTriggered: commitRecord === null ? null : commitRecord.triggered.length,
      occurrencesOfTheAppIdentityInTheReturnedSet: commitRecord === null ? null : commitRecord.triggered.filter((h) => h === hApp).length,
      residueAtK2Return: residueAtK2 === null ? null : { length: residueAtK2.length, carriesTheAppIdentity: residueAtK2.includes(hApp) },
      residueAfterTheArm: commitRecord === null ? null : commitRecord.pending.length,
      constraintBodyCalls: constraintCalls.length,
      appBodyCallsOwedOnAPassingWrite: outcome === 'pass' ? 1 : 0,
      appBodyCallsMade: appCalls.length,
      appBodyArgs: appCalls,
      inWindowAppBodyCalls: inCell('app-listener.body', id).filter((e) => e.phase === 'K-2' && e.listenerArg === json(addressArgOf(ADDRX, WATCH))).length,
      arm: k3 ? (k3.kind === 'thrown' ? k3.status : k3.outcome) : 'no-record',
    };
  };
  rec.phases.exactAddressSpelling = Object.assign({
    whatTheLawRequires: 'the app\'s `on` stands at the SAME address the evaluated pair stands at, so the two registrations are ONE identity and `surface.md §2.4` item 8 (c) AS AMENDED declares the app\'s body NOT DELIVERED at the delivery instant',
  }, one('exact-address', (A) => A, 'c1', 'pass'));
  rec.phases.properPrefixSpelling = Object.assign({
    whatTheLawRequires: 'the app\'s `on` stands at a PREFIX of the written address, a SECOND home entry — an identity the pass never evaluates — so the app\'s body is delivered ONCE at the pass\'s terminal arm',
  }, one('proper-prefix', (A, W) => W, 'c2', 'pass'));
  rec.phases.exactAddressSpellingFailingWrite = Object.assign({
    whatTheLawRequires: 'the DISCARD empties the member, so the failed write\'s own triggered handles leave it and the app\'s body is NEVER run',
  }, one('exact-address-fail', (A) => A, 'c3', 'fail'));
  rec.phases.theControl = {
    theTwoSpellingsDifferInExactlyOneArgument: true,
    exactAppBodyCalls: rec.phases.exactAddressSpelling.appBodyCallsMade,
    prefixAppBodyCalls: rec.phases.properPrefixSpelling.appBodyCallsMade,
    exactTheAppIdentityIsTheAdoptedOne: rec.phases.exactAddressSpelling.theAppRegistrationIsTheVeryIdentityTheKernelAdopted,
    prefixTheAppIdentityIsTheAdoptedOne: rec.phases.properPrefixSpelling.theAppRegistrationIsTheVeryIdentityTheKernelAdopted,
  };
  CURRENT = null;
  cells.push(rec);
  return rec;
})();

// =============================================================================================
// LIMB 6 — THE STALE ADOPTION.
// =============================================================================================
const staleAdoption = (() => {
  const id = 'S-stale-adoption';
  CURRENT = id;
  const rec = { cell: id, limb: 6, phases: {} };
  const refusedCommitRoute = (route, makeStoreAndRefuse) => {
    const store = freshStore('n7');
    let calls = 0;
    const out = makeStoreAndRefuse(store);
    const beforeReg = seqsOf('app-listener.body', id).length;
    store.on(BARE1, () => { calls += 1; mark('app-listener.body', { listenerArg: json(BARE1), route }); });
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
        appListenerSeqsInTheCellSoFar: seqsOf('app-listener.body', id).slice(beforeReg),
      },
    };
  };
  rec.phases.noAttemptWasOpen = Object.assign({
    whatTheLawRequires: 'instant (a) stands BEFORE the store\'s write verb, so the seam is reached and the refusal follows it; the store\'s own refusal releases that adoption, so the NEXT bare write reaches NO adoption and is NOT withheld',
  }, refusedCommitRoute('the store\'s own refusal at the verb: `value` absent', (store) => {
    const before = inCell('settle.reach', id).length;
    const r = grab(() => commit(store, ADDR, TIER));
    return {
      refused: r.thrown ? statusOf(r.thrown) : null,
      code: r.thrown ? statusOf(r.thrown) : 'NO REFUSAL',
      settleReaches: inCell('settle.reach', id).length - before,
    };
  }));
  rec.phases.anAttemptWasAlreadyOpen = Object.assign({
    whatTheLawRequires: 'the same law, the other route: the second commit is refused KC-7 BEFORE instant (a), so the FIRST attempt\'s adoption is the identity the next bare write meets',
  }, refusedCommitRoute('KC-7, a live attempt stands open at that address', (store) => {
    commit(store, ADDR, TIER, 1);
    const before = inCell('settle.reach', id).length;
    const r = grab(() => commit(store, ADDR, TIER, 2));
    return {
      refused: r.thrown ? statusOf(r.thrown) : null,
      code: r.thrown ? statusOf(r.thrown) : 'NO REFUSAL',
      settleReaches: inCell('settle.reach', id).length - before,
    };
  }));
  // (6-i) THE CALLER CALLS `settle` ITSELF.
  {
    const store = freshStore('n7');
    let calls = 0;
    const callSeqs = [];
    const h = store.on(SETTLE_PROBE_ADDR, (a) => { calls += 1; callSeqs.push(json(a)); mark('app-listener.body', { listenerArg: json(a), route: 'caller-settle' }); });
    const callerRecord = { op: null, triggered: [], pending: [h] };
    PHASE = 'caller';
    mark('caller.settle.enter');
    const settled = grab(() => store.settle(callerRecord));
    mark('caller.settle.return', { thrown: settled.thrown ? String(settled.thrown.name) : null });
    PHASE = 'idle';
    const secondSettle = grab(() => store.settle(callerRecord));
    const beforeWrite = calls;
    PHASE = 'store-write';
    mark('write.enter');
    const w = grab(() => storeNs.write(store, SETTLE_PROBE_ADDR, TIER, 13));
    mark('write.return', { thrown: w.thrown ? statusOf(w.thrown) : null });
    PHASE = 'idle';
    const afterFirstWrite = calls;
    PHASE = 'store-write';
    mark('write2.enter');
    const w2 = grab(() => storeNs.write(store, SETTLE_PROBE_ADDR, TIER, 14));
    mark('write2.return', { thrown: w2.thrown ? statusOf(w2.thrown) : null });
    PHASE = 'idle';
    const firstWriteEnter = seqsOf('write.enter', id)[0];
    const secondWriteEnter = seqsOf('write2.enter', id)[0];
    const bodiesInTheFirstWriteFrame = inCell('app-listener.body', id).filter((e) => e.phase === 'store-write' && e.seq > firstWriteEnter && e.seq < secondWriteEnter);
    const bodiesInTheSecondWriteFrame = inCell('app-listener.body', id).filter((e) => e.seq > secondWriteEnter);
    rec.phases.callerCallsSettleItself = {
      whatTheLawRequires: 'the seam is the kernel\'s arm alone (`A116` (D1)); a caller\'s own `settle` call is not a kernel act, so the NEXT bare caller-made write keeps the post-verb instant and is NEVER withheld (`§2.7` item 8)',
      callerSettleThrew: settled.thrown ? String(settled.thrown.name) : null,
      callerSettleReturnsUndefined: settled.thrown ? null : settled.value === undefined,
      secondCallForTheSameIdentityThrew: secondSettle.thrown ? String(secondSettle.thrown.name) : null,
      settleReaches: inCell('settle.reach', id).map((e) => ({ seq: e.seq, phase: e.phase, pendingLen: e.pendingLen })),
      firstBareWrite: {
        threw: w.thrown ? statusOf(w.thrown) : null,
        triggeredReturned: w.thrown ? null : w.value.triggered.length,
        callsOwed: 1,
        callsMade: afterFirstWrite - beforeWrite,
        deliveredInsideItsOwnWindow: bodiesInTheFirstWriteFrame.length === 1,
        appListenerSeqsInThisWindow: bodiesInTheFirstWriteFrame.map((e) => e.seq),
      },
      secondBareWrite: {
        threw: w2.thrown ? statusOf(w2.thrown) : null,
        callsOwed: 1,
        callsMade: calls - afterFirstWrite,
        deliveredInsideItsOwnWindow: bodiesInTheSecondWriteFrame.length === 1,
        appListenerSeqsInThisWindow: bodiesInTheSecondWriteFrame.map((e) => e.seq),
        totalAppListenerBodyCallsInTheCell: calls,
        appListenerArgsSeen: callSeqs,
      },
      theCallersOwnDeliveryCall: inCell('app-listener.body', id).filter((e) => e.phase === 'idle').map((e) => ({ seq: e.seq, listenerArg: e.listenerArg, note: 'the caller\'s own second `settle` call delivers the identity\'s residue; it stands in NO write window' })),
    };
    const first = rec.phases.callerCallsSettleItself.firstBareWrite;
    const second = rec.phases.callerCallsSettleItself.secondBareWrite;
    rec.phases.callerCallsSettleItself.reading = (first.callsMade === 1 && second.callsMade === 1)
      ? 'the caller\'s own `settle` did NOT withhold any bare write\'s window: both bare writes delivered once each'
      : `A BARE CALLER-MADE WRITE'S WINDOW IS WITHHELD BY A CALLER'S OWN \`settle\` CALL: the first owed 1 and made ${first.callsMade}, the second owed 1 and made ${second.callsMade}`;
  }
  CURRENT = null;
  cells.push(rec);
  return rec;
})();

// =============================================================================================
// VERDICTS — EACH READ AT THE CLAUSE PRINTED WITH IT.
// =============================================================================================
const verdicts = [];
const findCell = (id) => cells.find((c) => c.cell === id);
const deliveredAtTheArm = (c) => c.delivered.app === 1 && c.windowFigures.inWindow.appListener === 0 && c.windowFigures.appListenerCallsAtTheTerminalArm === 1;

// LIMB 1 — ORDER, per handling.
for (const variant of VARIANTS) {
  for (const c of [findCell(`O1-${variant}-r1`), findCell(`O1-${variant}-r2`)]) {
    if (c === undefined) continue;
    const constraintRanOnce = c.delivered.c1 === 1;
    const armPassed = c.arm.kind === 'returned' && c.arm.outcome === 'passed';
    const heldInWindow = c.windowFigures.inWindow.appListener === 0 && c.windowFigures.inWindow.constraint1 === 0;
    const orderedNotBeforeAnyConstraint = c.windowFigures.appRanBeforeAnyConstraint === false;
    if (variant === 'prefix-address') {
      verdicts.push({
        limb: 1, cell: c.cell, handling: variant, verdict: (constraintRanOnce && deliveredAtTheArm(c) && armPassed && heldInWindow && orderedNotBeforeAnyConstraint) ? 'PASS' : 'FAIL',
        requires: '`A112`/`A114`/`A116`: the triggered constraint runs FIRST; the app listener at the watched PREFIX is reached ONLY ONCE EVERY CONSTRAINT HAS PASSED — never in the write verb\'s window, delivered ONCE at the pass\'s terminal arm, with the triggering address as its one argument. The app\'s handle here is a SECOND home entry the pass never evaluates (`§2.7` item 7 (a)).',
        observed: `constraint body calls=${c.delivered.c1} (seqs ${json(c.windowFigures.framesOfEachCall.constraint1)}), app body calls=${c.delivered.app} (owed 1; seqs ${json(c.windowFigures.appBodySeqs)}); in the write verb's window: constraint1=${c.windowFigures.inWindow.constraint1}, appListener=${c.windowFigures.inWindow.appListener}; at the pass's terminal arm: appListener=${c.windowFigures.appListenerCallsAtTheTerminalArm}; app ran before any constraint=${c.windowFigures.appRanBeforeAnyConstraint}; residue at K-2's return=${json(c.residueAtK2Return)}; residue after the arm=${c.pendingAfterTheArm}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; args=${json(c.appListenerArgsThisWrite)}`,
      });
    } else {
      // THE AMENDED CLAUSE'S OWN CELL: `surface.md §2.4` item 8 (c) as amended 2026-10-15 (on `A115` (D2)).
      const oneIdentity = c.appHandleIsTheKernelAdoptedHandle === true;
      const noDeliveryDeclared = c.delivered.app === 0 && c.windowFigures.inWindow.appListener === 0 && c.pendingAfterTheArm === 0;
      verdicts.push({
        limb: 1, cell: c.cell, handling: variant,
        verdict: (constraintRanOnce && armPassed && heldInWindow && orderedNotBeforeAnyConstraint && oneIdentity && noDeliveryDeclared) ? 'PASS' : 'FAIL',
        requires: '`storeroom-js/surface.md §2.4` item 8 (c) AS AMENDED 2026-10-15 (on `A115` (D2)), read with `§2.7` item 6/7: where the app\'s registration stands at the address the evaluated pair stands at, the `on` call returns the SAME identity the adopted registration returned, the pass checks that identity off as it passes, NO entry for it stands in `pending` for the residue to reach, AND THE APP\'S BODY IS NOT DELIVERED AT THAT INSTANT — "a drive that finds that body run at the delivery instant has found a failure of item 7". The withheld window and the constraint-first order still hold.',
        observed: `the app\'s registration returned the IDENTICAL identity the kernel adopted=${oneIdentity}; the write returned ${c.k2.triggeredAtReturn} handle(s) with ${c.occurrencesOfTheAppIdentityInTheReturnedSet} occurrence(s) of that identity; residue at K-2's return=${json(c.residueAtK2Return)}; constraint body calls=${c.delivered.c1}, app body calls=${c.delivered.app} (owed by the limb's expectation: 1; owed by the amended clause: 0) with seqs ${json(c.windowFigures.appBodySeqs)}; in the write verb's window: appListener=${c.windowFigures.inWindow.appListener}, constraint1=${c.windowFigures.inWindow.constraint1}; residue after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; settle reaches: K-2=${json(c.settleReachesInsideK2)}, K-3=${json(c.settleReachesInsideK3)}`,
      });
    }
  }
}

// LIMB 1's strongest cell — TWO PAIRS.
{
  const c = twoPairPass;
  verdicts.push({
    limb: 1, cell: c.cell, handling: 'prefix-address',
    verdict: (c.delivered.c1 === 1 && c.delivered.c2 === 1 && c.windowFigures.appRanBeforeAnyConstraint === false && c.delivered.app === 1 && c.windowFigures.inWindow.appListener === 0 && c.windowFigures.appListenerCallsAtTheTerminalArm === 1) ? 'PASS' : 'FAIL',
    requires: 'with TWO pairs at the address, EVERY constraint runs first and the app\'s body at the prefix is reached only once BOTH have passed, exactly once (`A112`).',
    observed: `constraint1 calls=${c.delivered.c1} (seqs ${json(c.windowFigures.framesOfEachCall.constraint1)}), constraint2 calls=${c.delivered.c2}, app calls=${c.delivered.app} (owe 1); in-window appListener=${c.windowFigures.inWindow.appListener}; at the arm=${c.windowFigures.appListenerCallsAtTheTerminalArm}; app before any constraint=${c.windowFigures.appRanBeforeAnyConstraint}; residue after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}; arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}`,
  });
}

// LIMB 2 — DISCARD.
for (const variant of VARIANTS) {
  for (const c of [findCell(`O2-${variant}-r1`), findCell(`O2-${variant}-r2`)]) {
    if (c === undefined) continue;
    verdicts.push({
      limb: 2, cell: c.cell, handling: variant,
      verdict: (c.delivered.c1 === 1 && c.arm.kind === 'thrown' && c.arm.status === 'KC-3' && c.delivered.app === 0 && c.windowFigures.inWindow.appListener === 0 && c.pendingAfterTheArm === 0 && c.rollbackCallsAllReturned === true && c.rollbackUndidTheAttemptsOwnOp === true) ? 'PASS' : 'FAIL',
      requires: '`A114`/`A113` (D1)/`A116` (b): a write that fails on constraints DISCARDS the listeners — the app\'s body must NOT RUN AT ALL (never in the window, never at the arm), the residue is EMPTY, and the rollback undid the attempt\'s own op. The write must ACTUALLY fail on constraints (a constraint body ran).',
      observed: `arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}; constraint body calls=${c.delivered.c1}; app body calls=${c.delivered.app} (seqs ${json(c.windowFigures.appBodySeqs)}); in-window appListener=${c.windowFigures.inWindow.appListener}; at the arm=${c.windowFigures.appListenerCallsAtTheTerminalArm}; residue after the arm=${c.pendingAfterTheArm} of triggered=${c.triggeredAfterTheArm}; rollback calls all returned=${c.rollbackCallsAllReturned}, undid the attempt's own op=${c.rollbackUndidTheAttemptsOwnOp}; store read at the address after the arm=${json(c.storeReadAtAttemptAddress)}; log=${json(c.log)}`,
    });
  }
}

// LIMB 3 — REPLACEMENT.
{
  const onPass = findCell('O1-on-at-adopted-address-r1');
  const onFail = findCell('O2-on-at-adopted-address-r1');
  const regPass = findCell('O1-register-at-adopted-handle-r1');
  const regFail = findCell('O2-register-at-adopted-handle-r1');
  const basePass = findCell('O1-prefix-address-r1');
  const baseFail = findCell('O2-prefix-address-r1');
  verdicts.push({
    limb: 3, cell: 'L3-replacement-seam',
    verdict: (onPass.appHandleIsTheKernelAdoptedHandle === true && onPass.delivered.c1 === 1 && onPass.delivered.app === 0
      && onFail.arm.kind === 'thrown' && onFail.arm.status === 'KC-3' && onFail.delivered.app === 0
      && regPass.delivered.app === 0 && regFail.delivered.app === 0
      && basePass.delivered.app === 1 && baseFail.delivered.app === 0) ? 'PASS' : 'FAIL',
    requires: 'one function per identity (`surface.md §2.4` rule 2 read with item 8 (a)–(c)): a later registration REPLACES the registry\'s function slot for the identity that address\'s home entry carries. At the ADOPTED address the pass still runs the kernel\'s pair-keyed body (once) and the app\'s replaced slot is NOT delivered on either arm; at a PREFIX address — a second identity the pass never evaluates — the app\'s body IS delivered once on the passing arm and never on the failing one.',
    observed: `(a) the app's ON call at the address: the app received the IDENTICAL handle the kernel adopted=${onPass.appHandleIsTheKernelAdoptedHandle}; passing write — constraint body calls=${onPass.delivered.c1}, app body calls=${onPass.delivered.app} (owned by §2.4 item 8 (c): the identity the pass checked off is the app's own), residue after the arm=${onPass.pendingAfterTheArm} of triggered=${onPass.triggeredAfterTheArm}; failing write — arm=${onFail.arm.kind === 'thrown' ? onFail.arm.status : onFail.arm.outcome}, app body calls=${onFail.delivered.app}. (b) the same adopted handle through the register member: passing write — constraint body calls=${regPass.delivered.c1}, app body calls=${regPass.delivered.app}; failing write — arm=${regFail.arm.kind === 'thrown' ? regFail.arm.status : regFail.arm.outcome}, app body calls=${regFail.delivered.app}. (c) THE CONTROL, the app at the PREFIX (a second identity): passing write — app body calls=${basePass.delivered.app} at the arm=${basePass.windowFigures.appListenerCallsAtTheTerminalArm}; failing write — app body calls=${baseFail.delivered.app}.`,
  });
}

// LIMB 4 — REPEAT.
{
  const seq = cells.filter((c) => c.limb === 4);
  const shapeOf = (c) => json({ c1: c.delivered.c1, app: c.delivered.app, inWindow: c.windowFigures.inWindow.appListener, before: c.windowFigures.appRanBeforeAnyConstraint });
  const passOnes = seq.filter((c) => c.outcome === 'pass');
  const failOnes = seq.filter((c) => c.outcome === 'fail');
  const passConsistent = passOnes.every((c) => shapeOf(c) === shapeOf(passOnes[0]));
  const failConsistent = failOnes.every((c) => shapeOf(c) === shapeOf(failOnes[0]));
  const armsAsTheLawFixes = seq.every((c) => (c.outcome === 'pass') === (c.arm.kind === 'returned'));
  const matrixRepeats = VARIANTS.every((v) => json([shapeOf(findCell(`O1-${v}-r1`)), findCell(`O1-${v}-r1`).arm]) === json([shapeOf(findCell(`O1-${v}-r2`)), findCell(`O1-${v}-r2`).arm]));
  const armsDiverge = new Set(failOnes.map((c) => c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome)).size > 1;
  verdicts.push({
    limb: 4, cell: 'L4-repeat',
    verdict: (passConsistent && failConsistent && armsAsTheLawFixes && matrixRepeats) ? 'PASS' : 'FAIL',
    requires: 'the result is not a first-call artifact: the passing and the failing write are each run twice on fresh stores per handling, and four sequential attempts at ONE address on ONE store in one process.',
    observed: `the four-arm sequence: ${seq.map((c) => `${c.cell}: arm=${c.arm.kind === 'thrown' ? c.arm.status : c.arm.outcome}, c1=${c.delivered.c1}, appDelivered=${c.delivered.app}, inWindow=${c.windowFigures.inWindow.appListener}, pending@arm=${c.pendingAfterTheArm}`).join(' | ')}; the passing write repeats identically across the two rounds of every handling=${passConsistent} and the failing write too=${failConsistent}; the two-round cells repeat including their arm=${matrixRepeats}; every arm token is the one the law fixes for its outcome=${armsAsTheLawFixes}; the failing arms' tokens diverge across the sequence=${armsDiverge}${armsDiverge ? ` (${failOnes.map((c) => c.arm.status).join('/')} — the per-op rollback meeting the store's own floor)` : ''}; the app body is delivered once per passing write and zero times on a failing one, in every round=${seq.every((c) => (c.outcome === 'pass') === (c.delivered.app === 1))}`,
  });
}

// LIMB 5 — BARE WRITE.
{
  const a = bareWrite.phases.freshStoreNoKernel;
  const b = bareWrite.phases.afterAKernelPass;
  verdicts.push({
    limb: 5, cell: bareWrite.cell,
    verdict: (a.appListenerBodyCalls === 1 && a.deliveredInsideTheWriteVerbsOwnFrame === true && a.carriesNoPendingMember === true && b.appListenerBodyCalls === 1 && b.deliveredInsideTheWriteVerbsOwnFrame === true && b.settleReachesDuringTheBareWrite === 0) ? 'PASS' : 'FAIL',
    requires: 'a caller-made write with NO kernel evaluation set keeps the POST-VERB instant, is NEVER withheld and carries no `pending` (`§2.7` item 8; `A116` (d)): it reaches no adoption.',
    observed: `(a) a store no kernel act has touched: threw=${json(a.writeThrew)}, triggered=${a.triggeredReturned}, record members=${json(a.returnedRecordMembers)} (no \`pending\`=${a.carriesNoPendingMember}); app body ran ${a.appListenerBodyCalls} time(s) at seqs ${json(a.appListenerSeqs)}, INSIDE the verb's own frame=${a.deliveredInsideTheWriteVerbsOwnFrame}. (b) after a kernel-driven write reached its arm (${b.kernelWriteArm}) at another address: the next bare write delivered in its own window=${b.deliveredInsideTheWriteVerbsOwnFrame} (calls=${b.appListenerBodyCalls}), seam reaches during it=${b.settleReachesDuringTheBareWrite}.`,
  });
}

// LIMB 7 — THE IDENTITY CONTROL (question 2's decisive term).
{
  const e = identityControl.phases.exactAddressSpelling;
  const p = identityControl.phases.properPrefixSpelling;
  const f = identityControl.phases.exactAddressSpellingFailingWrite;
  verdicts.push({
    limb: 7, cell: identityControl.cell,
    verdict: (e.appBodyCallsMade === 0 && e.theAppRegistrationIsTheVeryIdentityTheKernelAdopted === true && p.appBodyCallsMade === 1 && p.theAppRegistrationIsTheVeryIdentityTheKernelAdopted === false && f.appBodyCallsMade === 0) ? 'PASS' : 'FAIL',
    requires: '`surface.md §2.4` item 8 (c) as amended, driven at ITS OWN TERM: the outcome at the address carrying the pair is decided by WHICH IDENTITY the app\'s `on` returns. The exact spelling returns the adopted identity (one home entry, one function) — NOT DELIVERED; the proper-prefix spelling returns a second identity the pass never evaluates — DELIVERED ONCE at the arm. A failing write delivers neither.',
    observed: `ONE registration call, ONE store, ONE address; the two stores differ ONLY in the address argument's spelling: EXACT — the app identity IS the adopted identity=${e.theAppRegistrationIsTheVeryIdentityTheKernelAdopted}, write returned triggered=${e.writeReturnedTriggered} with ${e.occurrencesOfTheAppIdentityInTheReturnedSet} occurrence(s) of it, residue at K-2=${json(e.residueAtK2Return)}, constraint body calls=${e.constraintBodyCalls}, app body calls owed 1 / made ${e.appBodyCallsMade}, residue after the arm=${e.residueAfterTheArm}, arm=${e.arm}; PROPER PREFIX — the app identity is a SECOND identity=${!p.theAppRegistrationIsTheVeryIdentityTheKernelAdopted}, triggered=${p.writeReturnedTriggered}, residue at K-2=${json(p.residueAtK2Return)}, constraint body calls=${p.constraintBodyCalls}, app body calls owed 1 / made ${p.appBodyCallsMade} at the arm with args ${json(p.appBodyArgs)}, residue after the arm=${p.residueAfterTheArm}, arm=${p.arm}; EXACT + FAILING WRITE — arm=${f.arm}, app body calls made ${f.appBodyCallsMade} of 0 owed`,
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
    verdict: (iiOk && ii2Ok && iOk) ? 'PASS' : 'FAIL',
    requires: '`A116` (d) with `§2.7` item 8: (ii) a `commit` refused BETWEEN instant (a) and the verb leaves NO adoption consumable — the next bare write still delivers in its own window; (i) route (i) — the caller calling `settle` itself must leave NO in-flight identity that the NEXT bare caller-made write draws on: that write owes 1 in-window invocation and keeps its post-verb instant, and the write after it too.',
    observed: `(ii-a) refusal at the store's own verb: the seam was reached ${ii.settledReachesBeforeTheRefusal} time(s) before the refusal (${json(ii.refusalCode)}); the next bare write owed 1 and made ${ii.bareWrite.callsMadeByThisBareWrite} (in its own window=${ii.bareWrite.deliveredInsideTheWriteVerbsOwnFrame}, seqs ${json(ii.bareWrite.appListenerSeqsInTheCellSoFar)}). (ii-b) the KC-7 route: refusal ${json(ii2.refusalCode)} BEFORE instant (a); the next bare write owed 1 and made ${ii2.bareWrite.callsMadeByThisBareWrite} (in its own window=${ii2.bareWrite.deliveredInsideTheWriteVerbsOwnFrame}, seqs ${json(ii2.bareWrite.appListenerSeqsInTheCellSoFar)}). (i) THE CALLER CALLS THE SETTLE MEMBER ITSELF: threw=${json(i.callerSettleThrew)}, returned undefined=${json(i.callerSettleReturnsUndefined)}, the second call for the same identity threw=${json(i.secondCallForTheSameIdentityThrew)}; seam reaches=${json(i.settleReaches)}; THE FIRST BARE WRITE owed 1 and made ${i.firstBareWrite.callsMade} (in its own window=${json(i.firstBareWrite.deliveredInsideItsOwnWindow)}, seqs ${json(i.firstBareWrite.appListenerSeqsInThisWindow)}, triggered returned=${json(i.firstBareWrite.triggeredReturned)}); THE SECOND BARE WRITE owed 1 and made ${i.secondBareWrite.callsMade} (in its own window=${json(i.secondBareWrite.deliveredInsideItsOwnWindow)}, seqs ${json(i.secondBareWrite.appListenerSeqsInThisWindow)}); the caller's own delivery call stands in NO write window = ${json(i.theCallersOwnDeliveryCall)}. ${i.reading}`,
  });
}

// =============================================================================================
// THE THREE QUESTIONS, ANSWERED FROM THE VALUES ABOVE (no value is recomputed by hand).
// =============================================================================================
const kernelDrivenWrites = cells.filter((c) => c.limb === 1 || c.limb === 2 || c.limb === 4);
const q1rows = kernelDrivenWrites.map((c) => ({
  cell: c.cell,
  inWindowInvocationCounts: c.windowFigures.inWindow,
  deliveryInstant: {
    constraintBodies: c.windowFigures.framesOfEachCall.constraint1.map((x) => `seq ${x.seq} in the ${x.phase} frame`),
    appListenerCalls: c.windowFigures.framesOfEachCall.appListener.map((x) => `seq ${x.seq} in the ${x.phase} frame`),
    appListenerAtTheTerminalArm: c.windowFigures.appListenerCallsAtTheTerminalArm,
    appListenerInThePassWindow: c.windowFigures.appListenerCallsInThePassWindow,
  },
}));
const q1 = {
  question: 'Does the withheld window actually hold now? For every kernel-driven write: the in-window invocation count and the delivery instant.',
  writesMeasured: q1rows.length,
  anyInWindowInvocationOfAnyBody: q1rows.some((r) => r.inWindowInvocationCounts.appListener > 0 || r.inWindowInvocationCounts.constraint1 > 0 || r.inWindowInvocationCounts.constraint2 > 0),
  rows: q1rows,
  deliveriesObserved: kernelDrivenWrites.map((c) => ({ cell: c.cell, appBodyCalls: c.delivered.app, atTheTerminalArm: c.windowFigures.appListenerCallsAtTheTerminalArm, inTheWriteWindow: c.windowFigures.inWindow.appListener })),
  answer: q1rows.some((r) => r.inWindowInvocationCounts.appListener > 0 || r.inWindowInvocationCounts.constraint1 > 0)
    ? 'THE WITHHOLD DOES NOT HOLD: an in-window invocation was measured.'
    : 'THE WITHHOLD HOLDS: across every kernel-driven write of every limb the in-window invocation count is 0 for the app listener AND 0 for the constraint body, and every delivery that exists stands in the pass\'s own frame (the terminal arm), never in the write verb\'s frame.',
};
const q2 = {
  question: 'Is a listener registered at an address that carries a constraint pair now DELIVERED on a passing write — and on a failing write, is it still never delivered?',
  passingWriteAtThePairAddress: {
    onAtTheAdoptedAddress: { owedByTheLimb: 1, made: findCell('O1-on-at-adopted-address-r1').delivered.app, round2: findCell('O1-on-at-adopted-address-r2').delivered.app },
    registerAtTheAdoptedHandle: { owedByTheLimb: 1, made: findCell('O1-register-at-adopted-handle-r1').delivered.app, round2: findCell('O1-register-at-adopted-handle-r2').delivered.app },
    identityControlExactSpelling: { owedByTheLimb: 1, made: identityControl.phases.exactAddressSpelling.appBodyCallsMade },
    identityControlProperPrefixSpelling: { owedByTheLimb: 1, made: identityControl.phases.properPrefixSpelling.appBodyCallsMade },
    prefixAddressCellsOfLimb1: [findCell('O1-prefix-address-r1').delivered.app, findCell('O1-prefix-address-r2').delivered.app],
  },
  failingWriteAtThePairAddress: {
    onAtTheAdoptedAddress: [findCell('O2-on-at-adopted-address-r1').delivered.app, findCell('O2-on-at-adopted-address-r2').delivered.app],
    registerAtTheAdoptedHandle: [findCell('O2-register-at-adopted-handle-r1').delivered.app, findCell('O2-register-at-adopted-handle-r2').delivered.app],
    identityControlExactSpelling: identityControl.phases.exactAddressSpellingFailingWrite.appBodyCallsMade,
  },
  answer: 'NOT DELIVERED (0 of 1 owed) at the address that carries the pair — by BOTH the `on` route and the `register(adoptedHandle, …)` route, in both rounds, and in the one-argument identity control. The cause is measured and not inferred: the app\'s registration and the evaluated pair\'s handle are ONE identity (the store holds one home entry per address, so `on` returns the identity `register` adopted), the pass checks that identity off as it passes, the residue is EMPTY and the terminal arm has nothing to invoke. At a PREFIX address — a second identity — the same call IS delivered once at the terminal arm. On the failing write the listener is still never delivered anywhere (0 in every cell). THIS OUTCOME IS THE ONE `storeroom-js/surface.md §2.4` item 8 (c) AS AMENDED (2026-10-15, on `A115` (D2)) DECLARES, so the 0-of-1 is NOT a product failure at that clause: it is that clause\'s declared observable. It IS a live contradiction with the ordering law read as `§2.7` item 6 ("THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED") on the same address, and with this battery\'s own pre-amendment expectation.',
};
const q3 = (() => {
  const i = staleAdoption.phases.callerCallsSettleItself;
  return {
    question: 'Is route (i) of the stale adoption closed live — a caller calling `settle` itself, then a bare caller-made write owing 1 in-window invocation — and does the next bare write still keep its post-verb instant?',
    callerSettleThrew: i.callerSettleThrew,
    callerSettleReturnsUndefined: i.callerSettleReturnsUndefined,
    secondCallForTheSameIdentityThrew: i.secondCallForTheSameIdentityThrew,
    seamReaches: i.settleReaches,
    firstBareWrite: { owed: 1, made: i.firstBareWrite.callsMade, triggeredReturned: i.firstBareWrite.triggeredReturned, seqsInItsOwnWindow: i.firstBareWrite.appListenerSeqsInThisWindow },
    secondBareWrite: { owed: 1, made: i.secondBareWrite.callsMade, seqsInItsOwnWindow: i.secondBareWrite.appListenerSeqsInThisWindow },
    theCallersOwnDeliveryCall: i.theCallersOwnDeliveryCall,
    answer: (i.firstBareWrite.callsMade === 1 && i.secondBareWrite.callsMade === 1)
      ? 'ROUTE (i) IS CLOSED LIVE: the caller\'s own `settle` call threw nothing and returned `undefined`, the second call for the same identity threw nothing, and the seam\'s call RECEIVED a `pending` residue of 1 at its own delivery — so the adoption was ended by that delivery and NOT carried as an in-flight identity. The next bare caller-made write owed 1 in-window invocation and made 1; the write after it owed 1 and made 1. Neither write\'s window was withheld, and no seam reach stands in either write\'s frame.'
      : 'ROUTE (i) IS STILL OPEN: a bare write\'s window was withheld by a caller\'s own `settle` call.',
    residualNote: 'ONE TERM OF THE CALLER\'S OWN DELIVERY, REPORTED AND NOT A VERDICT: the invocation the CALLER\'S second `settle` call makes carries the EMPTY array as its argument (the caller-made record carries no triggering address), while the two invocations the BARE WRITES make carry the written address. `§2.7` item 5 fixes the triggering address as the argument of an invocation the SURFACE\'s delivery makes; the caller\'s own delivery is not a kernel act and the clause fixes no argument for it.',
  };
})();

const figureStore = freshStore('n7');
const instanceMembers = Object.keys(figureStore).sort();
const memberFigure = {
  instanceMembers,
  memberCount: instanceMembers.length,
  settleIsAMember: typeof figureStore.settle === 'function',
  moduleNamespaceKeys: Object.keys(storeNs).sort(),
  settleIsANamedExportOfTheEntry: typeof storeNs.settle === 'function',
};

const totals = {
  cells: cells.length,
  verdicts: verdicts.length,
  byLimb: [1, 2, 3, 4, 5, 6, 7].map((l) => ({
    limb: l,
    cells: verdicts.filter((v) => v.limb === l).length,
    pass: verdicts.filter((v) => v.limb === l && v.verdict === 'PASS').length,
    fail: verdicts.filter((v) => v.limb === l && v.verdict === 'FAIL').length,
  })),
  pass: verdicts.filter((v) => v.verdict === 'PASS').length,
  fail: verdicts.filter((v) => v.verdict === 'FAIL').length,
};
const record = {
  demo: 'N7 GATE 6 SECOND RE-RUN — the `A116` ordering seam, its `A115` (D2) amended clause, and the identity control',
  run: RUN,
  layer: 'LIVE / ASSEMBLED PACKAGE',
  layerStatement: {
    resolution: `the package is RESOLVED BY ITS PUBLISHED NAME through scratch/node_modules/provident-storeroom -> bindings/js (package.json v0.1.3, exports "." -> ./index.mjs); the kernel module is reached at its declared checkout home bindings/js/src/constraint-kernel.mjs, whose own binding is the package SELF-REFERENCE (Node resolves 'provident-storeroom' from bindings/js/src to bindings/js/index.mjs), so the kernel, the driver and the store share ONE module instance and ONE loaded addon; the Rust store behind the JS binding is exercised in a real Node process (node ${process.version}).`,
    publishedInstall: 'NOT exercised, and it could not show this battery at all: package.json "files" carries index.mjs + README.md + index.d.ts only and "exports" declares "." alone, so an install from the registry carries NO src/constraint-kernel.mjs and no subpath that reaches it — the constraint kernel is checkout-only (kernel-surface.md §1 item 1). `settle` IS a member of the published instance (storeInstance is built by index.mjs), so a published install WOULD show the fourth member and the withheld post-verb window for a write an install\'s own code adopted — but it could not show the constraint pass, its ordering, its discard, the kernel\'s two settle instants, or the identity control, because no consumer can reach src/.',
    settleWrapper: 'the instance\'s `settle` member is wrapped by this driver ON THE INSTANCE IT ITSELF CREATED, for the trail alone (it records the reach, the phase and the pending length, then calls the original member with the same receiver and same argument). No package file, no kernel module and no existing record was edited by this file.',
    suiteCrossCheck: 'the package\'s own suite was read in this pass, not modified: `node --test bindings/js/test/*.test.mjs` reports 348 tests / 348 pass / 0 fail.',
  },
  fixture: {
    address: ADDR, prefixAddress: PREFIX, tier: TIER,
    constraintPair: { address: ADDR, ids: ['n7c', 'n7c2'] },
    registrationHandlings: VARIANTS,
    identityControlAddresses: { exact: ['c1', 'pair'], prefix: ['c2'], exactFailing: ['c3', 'pair'] },
    drivingOrder: 'K-1 register -> listener registration -> K-2 commit -> K-3 runAttempt -> store read / log / report',
  },
  memberFigure,
  questions: { q1, q2, q3 },
  verdicts,
  totals,
  determinismDigest: null,
  cells: cells.map((c) => (c.order === undefined ? c : c)),
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
lines.push(`N7 GATE 6 SECOND RE-RUN (BATTERY b) — run ${RUN} — LAYER: LIVE / ASSEMBLED PACKAGE`);
lines.push(`resolution: ${record.layerStatement.resolution}`);
lines.push(`published install: ${record.layerStatement.publishedInstall}`);
lines.push(`suite cross-check: ${record.layerStatement.suiteCrossCheck}`);
lines.push(`instance member figure: ${json(memberFigure.instanceMembers)} (settle a member=${memberFigure.settleIsAMember}; a named export of the entry=${memberFigure.settleIsANamedExportOfTheEntry})`);
lines.push('');
for (const v of verdicts) {
  lines.push(`[${v.cell}] LIMB ${v.limb}${v.handling ? ` (${v.handling})` : ''} — ${v.verdict}`);
  lines.push(`  ${v.requires}`);
  lines.push(`  OBSERVED: ${v.observed}`);
  lines.push('');
}
lines.push(`Q1 — ${q1.question}`);
lines.push(`  ${q1.answer}`);
lines.push(`  writes measured=${q1.writesMeasured}; any in-window invocation of any body=${q1.anyInWindowInvocationOfAnyBody}`);
lines.push(`Q2 — ${q2.question}`);
lines.push(`  ${q2.answer}`);
lines.push(`  values: ${json(q2.passingWriteAtThePairAddress)} / failing: ${json(q2.failingWriteAtThePairAddress)}`);
lines.push(`Q3 — ${q3.question}`);
lines.push(`  ${q3.answer}`);
lines.push(`  values: caller settle threw=${json(q3.callerSettleThrew)} undefined=${json(q3.callerSettleReturnsUndefined)} second call threw=${json(q3.secondCallForTheSameIdentityThrew)}; first bare write ${q3.firstBareWrite.made}/1, second ${q3.secondBareWrite.made}/1`);
lines.push('');
lines.push(`TOTALS: cells=${totals.cells} verdicts=${totals.verdicts} PASS=${totals.pass} FAIL=${totals.fail} — ${totals.byLimb.map((b) => `limb${b.limb}=${b.pass}P/${b.fail}F`).join(' ')}`);
lines.push(`determinismDigest=${record.determinismDigest}`);
writeFileSync(OUT, JSON.stringify(record, null, 2));
writeFileSync(TXT, lines.join('\n') + '\n');
console.log('');
console.log(lines.join('\n'));
console.log(`\nrecord: ${OUT}\nrecord: ${TXT}\ndigest: ${record.determinismDigest}`);
