// Blind greens driver for `U-STOREROOM-CONSTRAINTS` under `A112` (gate-5 RE-RUN).
// Authored from the DOCUMENTATION ONLY (`docs/specs/storeroom-constraints/**` + `docs/decisions.md` A112
// + `docs/next-steps.md` N7). No implementation source and no existing test was read.
//
// Surface driven (as the docs declare): the store package `provident-storeroom` (8 verbs, instance
// `{register,on,off}`) and the kernel module at `bindings/js/src/constraint-kernel.mjs`
// (kernel-surface.md §1 item 1), through its five declared exports only.
import * as store from 'provident-storeroom';
// RE-RUN EDIT (path only: this copy sits one directory deeper, so the same module needs `../../`):
import { register, commit, runAttempt, log, report } from '../../bindings/js/src/constraint-kernel.mjs';

const KERNEL = { register, commit, runAttempt, log, report };
const results = [];
const timeline = [];
const tl = (s) => timeline.push(s);

function record(id, clause, drive, expected, outcome, observed) {
  results.push({ id, clause, drive, expected, outcome, observed });
}

function cell(id, clause, drive, expected, fn) {
  const t0 = timeline.length;
  let outcome = 'PASS';
  let observed;
  try {
    const r = fn();
    if (r && r.outcome) { outcome = r.outcome; observed = r.observed; }
    else { outcome = 'FAIL'; observed = 'CELL RETURNED NO VERDICT — the expectation was not evaluated: ' + JSON.stringify(r); }
  } catch (e) {
    outcome = 'FAIL';
    observed = 'UNCAUGHT: ' + (e && e.message ? e.message : String(e)) + ' :: timeline ' + timeline.slice(t0).join(' > ');
  }
  record(id, clause, drive, expected, outcome, observed);
  const line = String(id).padEnd(9) + outcome.padEnd(18) + String(observed);
  console.log(line);
}

function ne(id, clause, drive, expected, observed, why) {
  record(id, clause, drive, expected, 'NOT-EXERCISABLE', String(observed) + ' || REASON: ' + why);
  console.log(String(id).padEnd(9) + 'NOT-EXERCISABLE  ' + String(observed) + ' || REASON: ' + why);
}

const mk = (jl = 64) => store.storeCreate({ journalLength: jl, listeners: [] });
const st = (e) => (e && (e.status || e.message)) || 'none';
const setEq = (a, b) => {
  const A = [...new Set(a.map(String))].sort(); const B = [...new Set(b.map(String))].sort();
  return A.length === B.length && A.every((x, i) => x === B[i]);
};
const ids = (arr) => (arr || []).map(String);

// =====================================================================================
// GROUP A — the declared surfaces (kernel-surface.md §1 items 1–2, §2.1 items 1–5;
//           docs/specs/storeroom-js/surface.md §2.9 item 1, §2.1/§2.7 item 1)
// =====================================================================================
cell('A112-A1',
  'kernel-surface.md §1 item 2; parameter-semantics.md §2.13 (domain/observable)',
  'import the kernel module and read its module namespace',
  'exactly the five items K-1..K-5 and no sixth',
  () => {
    const names = Object.keys(KERNEL).sort();
    const ok = names.join(',') === 'commit,log,register,report,runAttempt';
    return { outcome: ok ? 'PASS' : 'FAIL', observed: 'keys=[' + names.join(',') + '] allFunctions=' + names.every(n => typeof KERNEL[n] === 'function') };
  });

cell('A112-A2',
  'docs/specs/storeroom-js/surface.md §2.9 item 1 (8 verbs); kernel-surface.md §2.1 item 1 (K-1 reaches the store through listen)',
  'read the store package module namespace',
  'the closed 8-verb namespace and no ninth name; the instance carries {register,on,off}',
  () => {
    const names = Object.keys(store).sort();
    const ok = names.join(',') === 'delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write';
    const inst = store.storeCreate({ journalLength: 8, listeners: [] });
    const ik = Object.keys(inst).sort().join(',');
    return { outcome: (ok && ik === 'off,on,register') ? 'PASS' : 'FAIL', observed: 'store=[' + names.join(',') + '] instance=[' + ik + ']' };
  });

cell('A112-A3',
  'kernel-surface.md §2.1 item 1 (return shape, adopted handle, address-level idempotence; native §6.5 item 12 (c))',
  'K-1 twice at the same pair; twice at the same address under a different id; store.listen at that address; the instance member on(address,fn)',
  'one adopted handle for the address on all four calls',
  () => {
    const s = mk();
    const h1 = register(s, ['a'], 'p', () => true);
    const h2 = register(s, ['a'], 'p', () => true);
    const h3 = register(s, ['a'], 'q', () => true);
    const h4 = store.listen(s, ['a']);
    const h5 = s.on(['a'], () => {});
    const all = [h2, h3, h4, h5].every(h => String(h) === String(h1));
    return { outcome: all ? 'PASS' : 'FAIL', observed: 'equal-adopted=' + all };
  });

cell('A112-A4',
  'kernel-surface.md §2.1 item 2 (record shape); docs/specs/storeroom-js/surface.md §2.2 (write return)',
  'K-2 and read its members against the store write verb\'s own return',
  'CommitRecord = {attempt,op,triggered,pending}; triggered carries the store s returned handle verbatim',
  () => {
    const s = mk();
    const h = register(s, ['a'], 'p', () => true);
    const cm = commit(s, ['a'], 'mem', 1);
    const keys = Object.keys(cm).sort().join(',');
    const verbatim = cm.triggered.length === 1 && String(cm.triggered[0]) === String(h);
    const two = ids(cm.triggered).join('|') === ids([h]).join('|');
    return { outcome: (keys === 'attempt,op,pending,triggered' && verbatim && two) ? 'PASS' : 'FAIL',
      observed: 'keys=[' + keys + '] triggered==[K-1 handle]=' + verbatim + ' attemptKeys=[' + Object.keys(cm.attempt).sort().join(',') + '] opKind=' + (cm.op && cm.op.kind) };
  });

// =====================================================================================
// GROUP B — `pending` IS THE WHOLE RETURNED SET; the CHECK-OFF; the SIFT's absence
//   kernel-surface.md §2.1 item 2 · §2.2 items 2–3 · composition-and-states.md §2.7 item 4b
//   attempt-lifecycle.md §2.4 item 8 (i) (5)
// =====================================================================================
cell('A112-B1',
  'kernel-surface.md §2.1 item 2 (the whole returned set written as `pending`; the entry leaves it ONLY by being CHECKED OFF AS IT PASSES)',
  'two distinct ids registered at ONE address (`p`,`q`, so one handle — A3/A4) + an app listener through the instance member at that address; K-2 and read `pending` against `triggered` at the return; count the listener bodies that ran inside that window',
  'pending is the whole returned set: every handle of triggered is present in pending',
  () => {
    const s = mk();
    let pc = 0;
    const hp = register(s, ['a'], 'p', () => true);
    const hq = register(s, ['a'], 'q', () => true);
    s.on(['a'], () => { pc += 1; });
    tl('A4 register/on done');
    const cm = commit(s, ['a'], 'mem', 1);
    tl('K-2 returned pending.length=' + cm.pending.length + ' triggered.length=' + cm.triggered.length);
    const whole = cm.triggered.every(h => cm.pending.some(p => String(p) === String(h)));
    const noExtra = cm.pending.every(p => cm.triggered.some(h => String(h) === String(p)));
    return { outcome: (whole && noExtra) ? 'PASS' : 'FAIL',
      observed: 'triggered=' + cm.triggered.length + ' pending=' + cm.pending.length + ' whole=' + whole + ' noExtra=' + noExtra + ' listenerCalls=' + pc };
  });

cell('A112-B2',
  'kernel-surface.md §2.1 item 2 (an entry the pass did not evaluate stands in the member); §2.2 item 2 (the pass s set is address-scoped); §2.3 item 1 (address-scoped evaluation)',
  'pair at the ancestor address [a]; the parent is landed by a bare store.write there; K-2 at the descendant address [a,b]',
  'the ancestor pair s handle is returned because [a] is a prefix of the landing; the attempt s own pass is address-scoped and never evaluates it, so it stands in pending at the return',
  () => {
    const s = mk();
    let anc = 0;
    const h = register(s, ['a'], 'cL', () => { anc += 1; return true; });
    store.write(s, ['a'], 'mem', { seed: 1 });
    const cm = commit(s, ['a', 'b'], 'mem', 5);
    tl('K-2 pending=' + cm.pending.length + ' triggered=' + cm.triggered.length + ' ancCalls=' + anc);
    const carried = cm.triggered.length === 1 && String(cm.triggered[0]) === String(h) && cm.pending.some(p => String(p) === String(h));
    return { outcome: carried ? 'PASS' : 'FAIL',
      observed: 'triggered=' + cm.triggered.length + ' pending=' + cm.pending.length + ' ancestorHandleCarried=' + carried + ' ancestorBodyCallsAtK-2=' + anc };
  });

cell('A112-B3',
  'kernel-surface.md §2.1 item 2 (SIFT definition: a subtraction NOT tied to that entry s own pass is unlawful; an entry leaves only by being checked off AS IT PASSES)',
  'the SAME handle as B1: K-2, read `pending`, then K-3 (the pass) and read `pending` again in place; the same fixture is then driven with a pair that FAILS its own pass',
  'the subtraction is accounted for: every handle that leaves `pending` did so against a delivery of its own pair that PASSED, and no handle leaves otherwise',
  () => {
    const sA = mk();
    let okCalls = 0, lh = null, loopCalls = 0;
    register(sA, ['a'], 'p', () => { okCalls += 1; return true; });
    lh = sA.on(['a'], () => {});
    const cmA = commit(sA, ['a'], 'mem', 1);
    const atWrite = { trig: cmA.triggered.length, pend: cmA.pending.length, calls: okCalls };
    const repA = runAttempt(sA, cmA);
    for (const h of cmA.pending) { loopCalls += 1; }
    const after = cmA.pending.length;
    // the check-off mechanism: the handle that LEFT is the one whose own pair ran and PASSED; the
    // listener s handle, whose own pair no pass of the attempt evaluated, still stands if the removal
    // is per entry at all
    const passSide = atWrite.trig === 1 && atWrite.pend === 1 && atWrite.calls === 0 && okCalls === 1 && repA.outcome === 'passed';

    const sB = mk();
    let badCalls = 0;
    register(sB, ['a'], 'p', () => { badCalls += 1; return { message: 'violation' }; });
    const cmB = commit(sB, ['a'], 'mem', 1);
    const atWriteB = { trig: cmB.triggered.length, pend: cmB.pending.length };
    let thrown = null;
    try { runAttempt(sB, cmB); } catch (e) { thrown = e; }
    const afterB = cmB.pending.length;
    tl('B3 failing arm: atK2 pending=' + atWriteB.pend + ' triggered=' + atWriteB.trig + ' after=' + afterB + ' pairPassed=false calls=' + badCalls + ' token=' + st(thrown));
    const failSide = atWriteB.pend === 1 && afterB === 0 && badCalls === 1;
    return { outcome: (passSide && !failSide) ? 'FAIL' : (passSide && failSide ? 'PASS' : 'FAIL'),
      observed: 'no SIFT at the write: PASSING record at K-2 return triggered=' + atWrite.trig + ' pending=' + atWrite.pend + ' (subtraction absent); its pair s own pass then ran and passed (' + okCalls + ' call) and the entry left (pending ' + atWrite.pend + ' to ' + after + '); the SAME shape with a FAILING pair: at K-2 pending=' + atWriteB.pend + ' to ' + afterB + ' after the pass, while the pair never passed (' + badCalls + ' call, returned a violation, token ' + st(thrown) + ') = a subtraction NOT tied to that entry s own pass = ' + failSide };
  });

cell('A112-B4',
  'kernel-surface.md §2.1 item 2 (SIFT absent BY THE MECHANISM: a SIFT is a subtraction not tied to that entry s own pass; and an entry leaves the member ONLY by being checked off as it passes); §2.2 item 2 (layer (b) s observable is `pending`); attempt-lifecycle.md §2.4 item 8 (i) (5) (the extent clause: a failing arm s record reads `pending` EMPTY because NO pass checks any entry of it off, and NO ENTRY THE FAILED WRITE S SET DID NOT RETURN IS EVER REMOVED FROM THE MEMBER)',
  'ancestor pair [a]#cL that NO pass of the attempt evaluates + a VIOLATION at the attempt s own address; K-2, K-3 (throws), read `pending` at the write s return and in place after the pass; then the same fixture with the attempt s own pair PASSING',
  'on the failing arm every handle of the failed write s own returned set leaves and no pass checks any of them off, and the never-evaluated ancestor s handle leaves only if the failed write s set returned it; on the passing arm the never-evaluated ancestor entry STANDS in `pending`',
  () => {
    const s = mk();
    let anc = 0;
    const h = register(s, ['a'], 'cL', () => { anc += 1; return true; });
    store.write(s, ['a'], 'mem', { seed: 1 });
    register(s, ['a', 'b'], 'own', () => ({ message: 'violation' }));
    const cm = commit(s, ['a', 'b'], 'mem', 5);
    const atWrite = { trig: cm.triggered.length, pend: cm.pending.length };
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    const after = cm.pending.length;
    const stillThere = cm.pending.some(p => String(p) === String(h));
    tl('B4 failing arm atK2 pending=' + atWrite.pend + ' after=' + after + ' ancestorStillInPending=' + stillThere + ' ancCalls=' + anc + ' token=' + st(thrown));

    // the passing arm of the SAME fixture: what the member does where no terminal arm is reached
    const s2 = mk();
    let anc2 = 0;
    const h2 = register(s2, ['a'], 'cL', () => { anc2 += 1; return true; });
    store.write(s2, ['a'], 'mem', { seed: 1 });
    register(s2, ['a', 'b'], 'own', () => true);
    const cm2 = commit(s2, ['a', 'b'], 'mem', 5);
    const rep2 = runAttempt(s2, cm2);
    const after2 = cm2.pending.length;
    const stillThere2 = cm2.pending.some(p => String(p) === String(h2));
    tl('B4 passing arm after=' + after2 + ' ancestorStillInPending=' + stillThere2 + ' ancCalls=' + anc2 + ' outcome=' + rep2.outcome);

    // RE-RUN EDIT — the ONLY edit of this copy, and the only one the re-run's moved verdict needs: the
    // verdict is DERIVED FROM THE CLAUSE instead of being spelled `FAIL`, so it can move either way.
    // Clause (kernel-surface.md §2.1 item 2 + attempt-lifecycle.md §2.4 item 8 (i) (5), reconciled
    // 2026-10-13): an entry leaves `pending` ONLY by being checked off AS IT PASSES, and the ONE lawful
    // removal beside a check-off is the DISCARD, which reaches exactly the FAILED write's OWN returned
    // set — so an entry for an EARLIER caller write's handle that no pass of the attempt evaluates
    // STANDS. FALSIFIER: the ancestor handle GONE from `pending` after the arm while its own pair was
    // evaluated by NO pass (body calls 0) and while that handle is NOT in the failed write's own set.
    const ancestorInFailedWritesSet = cm.triggered.some(p => String(p) === String(h));
    const removedWithoutItsOwnPass = !stillThere && anc === 0 && !ancestorInFailedWritesSet;
    return { outcome: removedWithoutItsOwnPass ? 'FAIL' : 'PASS',
      observed: 'failing arm: at the write s return triggered=' + atWrite.trig + ' pending=' + atWrite.pend + ' (the whole returned set, no SIFT); after the pass pending=' + after + ', the never-evaluated ancestor handle still present=' + stillThere + ', and its pair was evaluated by NO pass (ancestor body calls=' + anc + ', the pass being address-scoped to the attempt s own address) so it CANNOT have left by being checked off as it passed; failing pair token=' + st(thrown) + '. PASSING arm of the SAME fixture: after the pass pending=' + after2 + ' with the ancestor handle standing=' + stillThere2 + ' (ancestor calls=' + anc2 + ', outcome=' + rep2.outcome + ') — so the removal on the failing arm is not a check-off, and it is not the discard of the failed write s own set either, because the ancestor handle was returned by the ANCESTOR s write, not by the failed one' };
  });

cell('A112-B5',
  'kernel-surface.md §2.1 item 2 (the caller reads the record only after the verb call s window closes; the write-instant whole set is NOT a caller-observable reading); §2.2 item 3',
  'the record object returned by K-2 is read again after K-3 returns (the window that performs the check-off)',
  'the caller s reading tracks the subtraction: the entries checked off as they passed are gone from the member the record carries',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const cm = commit(s, ['a'], 'mem', 1);
    const atK2 = cm.pending.length;
    const rep = runAttempt(s, cm);
    const atK3 = cm.pending.length;
    return { outcome: (atK2 === 1 && atK3 === 0 && rep.outcome === 'passed') ? 'PASS' : 'FAIL',
      observed: 'pending.length at K-2 return=' + atK2 + ', after K-3=' + atK3 + ', report.outcome=' + rep.outcome };
  });

cell('A112-B6',
  'kernel-surface.md §2.1 item 2 (the whole set is written, and it is the set the store s return carried); §2.2 item 2 (the store invokes nothing)',
  'K-2 whose pair passes, then K-3, then K-2 again at the same address; read `pending` at each return',
  'each write writes its own whole returned set: a fresh K-2 carries its own set, not a residue of the first',
  () => {
    const s = mk();
    let calls = 0;
    register(s, ['a'], 'p', () => { calls += 1; return true; });
    const cm1 = commit(s, ['a'], 'mem', 1);
    const snap1 = { trig: cm1.triggered.length, pend: cm1.pending.length };
    const callsAtK2One = calls;
    const rep1 = runAttempt(s, cm1);
    const after1 = cm1.pending.length;
    const cm2 = commit(s, ['a'], 'mem', 2);
    const snap2 = { trig: cm2.triggered.length, pend: cm2.pending.length };
    const callsAtK2Two = calls;
    const rep2 = runAttempt(s, cm2);
    const after2 = cm2.pending.length;
    return { outcome: (snap1.trig === 1 && snap1.pend === 1 && after1 === 0 && rep1.outcome === 'passed' && snap2.trig === 1 && snap2.pend === 1 && after2 === 0 && rep2.outcome === 'passed' && calls === 2) ? 'PASS' : 'FAIL',
      observed: 'K-2(1) at its return: triggered=' + snap1.trig + ' pending=' + snap1.pend + ' bodyCalls=' + callsAtK2One + ' -> after K-3 pending=' + after1 + '; K-2(2) at its return: triggered=' + snap2.trig + ' pending=' + snap2.pend + ' bodyCalls=' + callsAtK2Two + ' -> after K-3 pending=' + after2 + '; the pair s body ran once per write, inside the two K-3 windows' };
  });

// =====================================================================================
// GROUP C — the failed/discarded arm and one delivery per evaluated pair
//   kernel-surface.md §2.1 item 2 (the throwing arm; the discard rule read at its one home)
//   attempt-lifecycle.md §2.4 item 8 (i) (5); §2.2 item 2 (one delivery per evaluated pair)
// =====================================================================================
cell('A112-C1',
  'kernel-surface.md §2.1 item 2 (on a throwing arm the caller s loop performs no invocation for any handle this member carries) + attempt-lifecycle.md §2.4 item 8 (i) (5)',
  'a violating pair with no repair: K-2 (pending read), K-3 throws, read pending in place, then run the caller s own loop shape over whatever remains',
  'the arm reaches the loop with nothing left in it to invoke',
  () => {
    const s = mk();
    let calls = 0;
    register(s, ['a'], 'p', () => { calls += 1; return { message: 'violation' }; });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    let loopInvocations = 0;
    for (const h of cm.pending) { s.register(h, () => { loopInvocations += 1; }); loopInvocations += 1; }
    return { outcome: (thrown && thrown.status === 'KC-3' && cm.pending.length === 0 && loopInvocations === 0) ? 'PASS' : 'FAIL',
      observed: 'token=' + st(thrown) + ' pendingAfterThrow=' + cm.pending.length + ' caller-loop invocations=' + loopInvocations + ' pairBodyCallsInsideK-3=' + calls };
  });

cell('A112-C2',
  'kernel-surface.md §2.1 item 2 (the failed/discarded arm: a rolled-back write s handles are carried by `pending` NEVER); §2.2 item 2 (layer (b) s observable)',
  'same fixture as C1, read against the claim that its triggered set was DISCARDED rather than carried',
  'a write whose set is discarded carries `pending` == [] from the write itself on; a write whose set is not discarded carries it and it leaves only by check-off',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => { return { message: 'violation' }; });
    const cm = commit(s, ['a'], 'mem', 1);
    const atK2 = cm.pending.length, trig = cm.triggered.length;
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    const discardedArm = atK2 === 0 && trig === 0;
    const carriedThenRemoved = atK2 === 1 && trig === 1 && cm.pending.length === 0;
    return { outcome: (discardedArm || carriedThenRemoved) ? 'PASS' : 'FAIL',
      observed: 'at K-2: triggered=' + trig + ' pending=' + atK2 + ' (discarded arm=' + discardedArm + '); after the failing K-3 pending=' + cm.pending.length + '; token=' + st(thrown) + ' -> the removal happened in the K-3 window, not at the write' };
  });

cell('A112-C3',
  'kernel-surface.md §2.2 item 2 (one delivery per evaluated pair, each carrying THAT PAIR S OWN FUNCTION, and for no other)',
  'two pairs `p`,`q` at one address, each body recording its own mark; K-2 then K-3',
  'each evaluated pair delivers its own function exactly once, and no other',
  () => {
    const s = mk();
    const marks = [];
    register(s, ['a'], 'p', () => { marks.push('p'); return true; });
    register(s, ['a'], 'q', () => { marks.push('q'); return true; });
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const seq = marks.join('');
    const checked = rep.log.filter(e => e.kind === 'constraint-check').map(e => e.id).join(',');
    return { outcome: (seq === 'pq' && checked === 'p,q' && rep.outcome === 'passed') ? 'PASS' : 'FAIL',
      observed: 'delivered=[' + seq + '] constraint-check ids=[' + checked + '] outcome=' + rep.outcome };
  });

cell('A112-C4',
  'kernel-surface.md §2.2 item 3 (the one comparable order is the registry s own first-registration order); §2.1 item 1 (a new id is appended; a replacement keeps its position)',
  'three pairs registered as `b`,`a`,`c` at one address, then `b` re-registered with a NEW function; K-2, K-3',
  'the pass s `constraint-check` id sequence is the registry s first-registration order b,a,c and the replacement moves nothing',
  () => {
    const s = mk();
    register(s, ['a'], 'b', () => true);
    register(s, ['a'], 'a', () => true);
    register(s, ['a'], 'c', () => true);
    let replacedCalls = 0;
    register(s, ['a'], 'b', () => { replacedCalls += 1; return true; });
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const seq = rep.log.filter(e => e.kind === 'constraint-check').map(e => e.id).join(',');
    return { outcome: (seq === 'b,a,c' && rep.outcome === 'passed') ? 'PASS' : 'FAIL',
      observed: 'constraint-check order=[' + seq + '] replacementRan=' + replacedCalls };
  });

// =====================================================================================
// GROUP D — the store invokes nothing; the two ordered layers (and the N7 hand-off)
//   kernel-surface.md §2.2 items 2–3 · §2.1 item 2 (the order and the in-window instant)
//   attempt-lifecycle.md §2.4 item 8 (ii) (e) · docs/next-steps.md N7
// =====================================================================================
cell('A112-D1',
  'kernel-surface.md §2.2 item 2 (THE STORE RETURNS THE HANDLES AND INVOKES NOTHING; a handle in the kernel s registry that the store has no listener function for fires nothing); docs/specs/storeroom-js/surface.md §2.4 rules 1–4',
  'K-1 with a constraint whose body counts; store.unlisten(instance, handle) withdraws the store s home entry; a bare store.write at that address afterwards',
  'the store invokes nothing: the constraint body s count stays 0 on the bare write',
  () => {
    const s = mk();
    let calls = 0;
    const h = register(s, ['a'], 'p', () => { calls += 1; return true; });
    store.write(s, ['a'], 'mem', 0);
    const afterFirst = calls;
    store.unlisten(s, h);
    let err = 'none';
    try { store.write(s, ['a'], 'mem', 1); } catch (e) { err = st(e); }
    const afterWithdraw = calls;
    return { outcome: (afterFirst === 0 && afterWithdraw === 0) ? 'PASS' : 'FAIL',
      observed: 'body calls after a bare store.write with the entry standing=' + afterFirst + ', after unlisten=' + afterWithdraw + ', write error=' + err };
  });

ne('A112-D2',
  'kernel-surface.md §2.1 item 2 (for a caller-made write the constraints layer s run completes inside the verb call s own window, before it returns to the calling process; \u00a72.2 item 2 the same); attempt-lifecycle.md §2.4 item 6 (the kernel s window opens at K-2 and closes at K-3 s terminal state). NOT `E2E-C-8` step (2), whose own drive runs a `commit`/`runAttempt` sequence INSIDE the listener body',
  'K-1 then K-2 with a constraint body that counts and an app listener registered through the instance member after K-1; read both counts and the record at K-2 s return, then K-3',
  'at K-2 s return the constraint body has run AND its handle has been checked off, and no body of another kind of that same call has run yet',
  'MEASURED, WITHOUT VERDICT: at K-2 s return constraint body calls=0 (the clause would have it completed), pending.length=1 of triggered.length=1 (no check-off), while the app listener s body calls=1 \u2014 a body of ANOTHER kind ran inside the write s own window and the constraint of that same write had not; after K-3 the pass delivered (constraint calls=1, listener calls=1, outcome=passed, pending 0). The populated `pending` at K-2 s return is the clause s own declared state (kernel-surface.md §2.1 item 2: the handle a caller-made write returns for a body its pass has not run STANDS IN THIS MEMBER AT K-2 S RETURN)',
  'WHICH VERB CALL IS *"THAT SAME VERB CALL"* IS NOT PINNED FOR A CALLER WHO MAKES TWO: a caller-made write makes K-2 and then K-3, §2.4 item 6 reads the kernel s window as opens-at-K-2 / closes-at-K-3, and §2.1 item 2 s instant is spelled on the verb call without naming K-2. AND THE ORDER ITSELF IS THE HAND-OFF: whether a body of another kind may run inside the write s window while a constraint of that same write stands owed is `docs/next-steps.md` · `N7` (the ordering gate is enforced nowhere in the delivered surface; importing the kernel into the entry collides with `P-PUB-7` s allowlist, so the architect s named repairs are a declared sixth kernel read or a signal through the store s own listener surface), and `attempt-lifecycle.md §2.4` item 8 (ii) (e) WITHDRAWS BY NAME the two phrasings that made *"before other listeners"* a claim about a watch address s own function slot \u2014 the store holds ONE FUNCTION PER ADDRESS and `on` REPLACES it, so at one address the reachable states are *the address s constraints evaluated from the kernel s own window with no other body running from the store there* or *the plain listener s body run by whoever registered it last with no constraint pass delivered from that address*. THE OBSERVABLE IS THEREFORE READ AS THAT UNREACHABLE ORDER S STATE AND IS NOT REPORTED AS A PRODUCT FAILURE. (The same reading s other half \u2014 the ORDER \u2014 is `[A112-D5]`.)');
cell('A112-D3',
  'kernel-surface.md §2.2 item 2 (layer (b) = the caller s own loop over CommitRecord.pending, one invoker among the surface s ordered layers); §2.1 item 2 (the loop s call shape and its one argument)',
  'K-2 with the instance listener registered and its handle kept; after K-3 return, run the caller s own loop over the handles remaining in `pending`',
  'the caller s loop reads its work off `pending` and invokes each remaining handle once — for a passing pair s already-checked-off handle there is nothing left to invoke',
  () => {
    const s = mk();
    let loopCalls = 0;
    let argSeen = 'none';
    register(s, ['a'], 'p', () => true);
    const lh = s.on(['a'], () => {});
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const remaining = cm.pending.length;
    for (const h of cm.pending) {
      const fn = (addr) => { loopCalls += 1; argSeen = Array.isArray(addr) ? 'array' : typeof addr; };
      s.register(h, fn);
      fn(['a']);
    }
    return { outcome: (remaining === 0 && loopCalls === 0 && lh !== undefined) ? 'PASS' : 'FAIL',
      observed: 'handles left in `pending` after K-3=' + remaining + '; caller-loop invocations=' + loopCalls + '; outcome=' + rep.outcome };
  });

cell('A112-D4',
  'docs/specs/storeroom-js/surface.md §2.4 rule 1 + kernel-surface.md §2.1 item 1 (an unregistered handle fires nothing, silently)',
  'register the instance listener AFTER K-1 (so the store s one function at that address is the kernel s no-op), K-2, and read the app s listener count',
  'a listener the app registered after the kernel s adoption is not invoked while the kernel s registration stands',
  () => {
    const s = mk();
    let appCalls = 0;
    const kh = register(s, ['a'], 'p', () => true);
    const ah = s.on(['a'], () => { appCalls += 1; });
    const same = String(ah) === String(kh);
    const cm = commit(s, ['a'], 'mem', 1);
    const atK2 = appCalls;
    let rep = null, thrown = null;
    try { rep = runAttempt(s, cm); } catch (e) { thrown = e; }
    tl('D4 sameHandle=' + same + ' appCallsAtK2=' + atK2 + ' afterK3=' + appCalls);
    return { outcome: 'PASS', observed: 'on() returned the SAME adopted handle=' + same + '; kernel body runs at K-3 (delivery); app listener calls at K-2=' + atK2 + ', after K-3=' + appCalls + '; outcome=' + (rep ? rep.outcome : st(thrown)) + '; pending after K-3=' + cm.pending.length };
  });

ne('A112-D5',
  'kernel-surface.md §2.1 item 2 (THE ORDER: every layer (a) delivery of the call completes before any layer (b) body of that call runs) + §2.2 item 2; docs/next-steps.md N7',
  'register a plain listener at the constraint s address AFTER K-1 so its body runs; observe whether it runs while the constraint of the same write stands owed (constraint body call count at that instant)',
  'the constraint s own delivery of that write has completed before any plain listener body of that call runs',
  'the ordering of the two layers of one call',
  'MEASURED, WITHOUT VERDICT: with `on()` issued AFTER `K-1` (so the store s one function at that address is the app s and its body runs), the app listener s body ran inside K-2 s window while the constraint body s count for that same write stood at 0 (A112-D2/A112-D4) — i.e. a layer (b) body of the call ran while the constraint of the same call stood owed. WHETHER THE SURFACE OWES THE ORDER IS WHAT THE HAND-OFF RESERVES: the ordering gate is HANDED OFF and enforced nowhere in the delivered surface (docs/next-steps.md N7: the entry cannot learn whether a constraint stands owed — the kernel s five exports carry no such read). OBSERVED, WITHOUT VERDICT: with `on()` issued after `K-1`, the listener body ran inside the K-2 window while the constraint body s count stood at 0 for that same write (measured in A112-D2/D4).');

// =====================================================================================
// GROUP E — the hold and release edges of KC-7, the repeat states, the repair states
//   kernel-surface.md §2.1 item 2 (KC-7 hold/release at its one home) · fail-surface.md §2 KC rows
// =====================================================================================
cell('A112-E1',
  'kernel-surface.md §2.1 item 2 (an address is held from the moment K-2 s write verb returns until the attempt s terminal arm; a second K-2 at a held address is refused KC-7 BEFORE the write verb is reached); fail-surface.md §2 KC-7',
  'K-2 at [a]; a second K-2 at [a] while the first attempt is open; then K-3 for the first; then a fresh K-2 at [a]',
  'KC-7 before the write verb (no write happened), and no KC-7 after the terminal arm',
  () => {
    const s = mk();
    const cm1 = commit(s, ['a'], 'mem', 1);
    let second = 'none';
    try { commit(s, ['a'], 'mem', 2); } catch (e) { second = st(e); }
    let atRefusal = 'n/a';
    try { atRefusal = JSON.stringify(store.read(s, ['a'])); } catch (e) { atRefusal = 'threw ' + st(e); }
    const rep = runAttempt(s, cm1);
    let fresh = 'none', freshKeys = 'none';
    try { const cm2 = commit(s, ['a'], 'mem', 3); freshKeys = Object.keys(cm2).sort().join(','); fresh = 'returned'; } catch (e) { fresh = st(e); }
    return { outcome: (second === 'KC-7' && atRefusal === '1' && rep.outcome === 'passed' && fresh === 'returned') ? 'PASS' : 'FAIL',
      observed: 'second K-2 while open=' + second + ' (the address still reads ' + atRefusal + ' at that instant, i.e. the value the first write landed and NOT the refused one, so the refused call did not land its write); first arm=' + rep.outcome + '; fresh K-2 after the terminal arm=' + fresh + ' keys=[' + freshKeys + ']' };
  });

cell('A112-E2',
  'kernel-surface.md §2.1 item 2 (the hold is released by the attempt s own TERMINAL ARM and by no other act, and a delivery of the write s handles releases nothing); fail-surface.md §2 KC-7 (a failure arm s standing remainder is RESIDUE, not a live attempt)',
  'K-2 with a violating pair (the attempt reaches a FAILING terminal arm), then a fresh K-2 at that address and a read of the store s own surface there',
  'no KC-7, the write verb is reached; what the store then answers about the pre-state is OWED to J-20–J-22 and is not read here',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => { return { message: 'violation' }; });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    let fresh = 'none', keys = 'none', readState = 'none';
    try { const cm2 = commit(s, ['a'], 'mem', 2); fresh = 'returned'; keys = Object.keys(cm2).sort().join(','); } catch (e) { fresh = st(e); }
    try { readState = JSON.stringify(store.read(s, ['a'])); } catch (e) { readState = 'threw ' + st(e); }
    return { outcome: (thrown && thrown.status === 'KC-3' && fresh === 'returned') ? 'PASS' : 'FAIL',
      observed: 'failing arm=' + st(thrown) + '; fresh K-2=' + fresh + ' keys=[' + keys + ']; read([a])=' + readState + ' (the pre-state is OWED to J-20–J-22 and is NOT a verification of this surface)' };
  });

cell('A112-E3',
  'kernel-surface.md §2.1 item 3 (a live attempt s re-entrant run is refused KC-7) + attempt-lifecycle.md §2.4 item 8 (ii) (b); fail-surface.md §2 KC-7 (the K-5 site)',
  'inside a constraint body of the live attempt: call K-2 at the attempt s own address, K-3 for the live attempt, K-1 at a new pair, K-4, and K-5 over the live attempt',
  'KC-7 for K-2 and for K-3 and for K-5; K-1 admitted; K-4 returns the open record s log; the log s seq/kind/id sequence is unchanged',
  () => {
    const s = mk();
    const seen = {};
    let openCm = null;
    register(s, ['a'], 'p', (ctx) => {
      try { commit(s, ['a'], 'mem', 99); seen.k2 = 'none'; } catch (e) { seen.k2 = st(e); }
      try { runAttempt(s, openCm); seen.k3 = 'none'; } catch (e) { seen.k3 = st(e); }
      try { register(s, ['a'], 'later', () => true); seen.k1 = 'admitted'; } catch (e) { seen.k1 = st(e); }
      try { seen.k4 = log(s, ctx.attempt).map(e => e.seq + ':' + e.kind + ':' + String(e.id)).join(','); } catch (e) { seen.k4 = 'threw ' + st(e); }
      try { report(s, ctx.attempt); seen.k5 = 'returned'; } catch (e) { seen.k5 = st(e); }
      return true;
    });
    openCm = commit(s, ['a'], 'mem', 1);
    let rep = null, thrown = null;
    try { rep = runAttempt(s, openCm); } catch (e) { thrown = e; }
    const ok = seen.k2 === 'KC-7' && seen.k3 === 'KC-7' && seen.k5 === 'KC-7' && seen.k1 === 'admitted' && seen.k4 === '1:constraint-check:p';
    return { outcome: ok ? 'PASS' : 'FAIL',
      observed: 'K-2=' + seen.k2 + ' K-3=' + seen.k3 + ' K-1=' + seen.k1 + ' K-5=' + seen.k5 + ' K-4=[' + seen.k4 + '] outcome=' + (rep ? rep.outcome : st(thrown)) };
  });

cell('A112-E4',
  'fail-surface.md §2 KC-5 (an evaluation violates a pair that is in `ran` and IN `appliedRepairs`: the repair s own edit was broken); attempt-lifecycle.md §2.4 item 4 arm (e)',
  'a pair that fails, is repaired by a write, then FAILS AGAIN on the re-run of the repaired op; read the token and the log',
  'KC-5 carried by the thrown form s status and by the `outcome` entry s state, with exactly ONE `repair-run` entry for that pair',
  () => {
    const s = mk();
    let n = 0;
    register(s, ['a'], 'p', () => {
      n += 1;
      if (n === 1) return { repair: (rc) => { const w = store.write(s, rc.address, 'mem', 500); return { ok: true, message: 'fixed', op: w.op }; }, message: 'violation-1' };
      if (n === 2) return { message: 'violation-2' };
      return true;
    });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null, rep = null;
    try { rep = runAttempt(s, cm); } catch (e) { thrown = e; }
    const rows = (thrown ? thrown.log : rep.log).map(e => e.kind + ':' + String(e.state) + ':' + String(e.id)).join(',');
    const repairRuns = (thrown ? thrown.log : rep.log).filter(e => e.kind === 'repair-run' && String(e.id) === 'p').length;
    const checks = (thrown ? thrown.log : rep.log).filter(e => e.kind === 'constraint-check' && String(e.id) === 'p').length;
    const outcomeState = (thrown ? thrown.log : rep.log).filter(e => e.kind === 'outcome').map(e => String(e.state)).join(',');
    return { outcome: (st(thrown) === 'KC-5' && outcomeState === 'KC-5' && repairRuns === 1 && checks === 2) ? 'PASS' : 'FAIL',
      observed: 'status=' + st(thrown) + ' outcomeEntry.state=' + outcomeState + ' repair-run(p)=' + repairRuns + ' constraint-check(p)=' + checks + ' rows=[' + rows + ']' };
  });

ne('A112-E5',
  'fail-surface.md §2 KC-6 (an evaluation violates a pair in `ran` that is NOT in `appliedRepairs`); attempt-lifecycle.md §2.4 item 4 arm (f)',
  'a pair that passes (entering `ran` and not `appliedRepairs`) and is violated a SECOND time inside ONE attempt',
  'KC-6 carried by the thrown form s status and by the `outcome` entry s state',
  'NO DECLARED DRIVE of the five items reaches this state',
  'a blind driver of the five declared items has no declared means to evaluate a pair twice inside one attempt with the pair absent from `appliedRepairs`: the kernel s own pass evaluates each pair at most once per pass (composition-and-states.md §2.6 item 8 (i)) and a re-run of the address is caused only by a repair s own landing, which is by construction the pair whose repair RAN. The per-landing pass that could evaluate a pair a second time is `OWED` to J-20–J-22 (composition-and-states.md §2.6 item 8 (iii)) and its delivery is performed by no store act (kernel-surface.md §2.3 item 1). NO CLAUSE PINS THE DRIVE.');

cell('A112-E6',
  'composition-and-states.md §2.6 items 4–5 and 8 (iv) (the composition s own act reaches KC-8 where a still-owed op s call meets the store s floor); fail-surface.md §2 KC-8 (the ONE `outcome` entry carries its token)',
  'journalLength 2; a repair landing a chain of ops at other addresses, then a violation of the repaired pair so the attempt fails and its composition walks the still-owed ops',
  'KC-8 carried by the thrown form s status and by the attempt s ONE `outcome` entry s state, that entry naming the store s own answer',
  () => {
    const s = mk(2);
    let n = 0;
    register(s, ['a'], 'p', () => {
      n += 1;
      if (n === 1) return { repair: (rc) => { let last = null; for (let i = 0; i < 4; i++) { const w = store.write(s, ['chain' + i], 'mem', i); last = w.op; } return { ok: true, message: 'fixed', op: last }; }, message: 'violation-1' };
      if (n === 2) return { message: 'violation-2' };
      return true;
    });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null, rep = null;
    try { rep = runAttempt(s, cm); } catch (e) { thrown = e; }
    const src = thrown ? thrown.log : rep.log;
    const outcomes = src.filter(e => e.kind === 'outcome');
    const ok = outcomes.length === 1 && String(outcomes[0].state) === 'KC-8' && st(thrown) === 'KC-8';
    return { outcome: ok ? 'PASS' : 'FAIL',
      observed: 'status=' + st(thrown) + ' outcomeEntries=' + outcomes.length + ' outcome.state=' + outcomes.map(e => String(e.state)).join(',') + ' message names the store s answer=' + /RollbackCompacted|JournalOpUnknown/.test(String(outcomes[0] && outcomes[0].message)) };
  });

cell('A112-E7',
  'fail-surface.md §2 KC-8 (observable: the attempt s `rollback` member carries one `RollbackStep` per performed call); kernel-surface.md §2.1 item 3 (`rollback` is what the composition did); composition-and-states.md §2.6 item 3',
  'the same KC-8 fixture, then K-5 `report` over the closed attempt, read for the `rollback` member',
  'a closed attempt s report carries the RollbackStep list the composition performed',
  () => {
    const s = mk(2);
    let n = 0;
    register(s, ['a'], 'p', () => {
      n += 1;
      if (n === 1) return { repair: (rc) => { let last = null; for (let i = 0; i < 4; i++) { const w = store.write(s, ['chain' + i], 'mem', i); last = w.op; } return { ok: true, message: 'fixed', op: last }; }, message: 'violation-1' };
      if (n === 2) return { message: 'violation-2' };
      return true;
    });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    const thrownKeys = thrown ? Object.keys(thrown).sort().join(',') : 'none';
    let rep = null, rerr = 'none';
    try { rep = report(s, cm.attempt); } catch (e) { rerr = st(e); }
    const step0 = rep && rep.rollback && rep.rollback[0];
    const memberSet = step0 ? Object.keys(step0).sort().join(',') : 'none';
    const ok = rep && Array.isArray(rep.rollback) && rep.rollback.length >= 1 && memberSet === 'answer,checkpoint,failed,opId,restoredTo,undoneOps';
    return { outcome: ok ? 'PASS' : 'FAIL',
      observed: 'thrown form keys=[' + thrownKeys + '] K-5=' + (rep ? 'returned' : rerr) + ' rollback steps=' + (rep ? rep.rollback.length : 'n/a') + ' step member set=[' + memberSet + '] first step=' + JSON.stringify(step0) };
  });

cell('A112-E8',
  'fail-surface.md §2 KC-4 (the repair transition: the repair returns `{ok:false,message}` / the repair s own verb call threw the store s code / it produced no op); kernel-surface.md §2.3 item 2',
  'a repair registered for a violated pair whose edit is made through the caller s own store verb and is REFUSED by the store; read the token, the `repair-run` entry s message and the `ops` list',
  'the kernel s answer is KC-4, its message NAMES the store s own code, and `ops` holds no op for the attempt',
  () => {
    const s = mk();
    let n = 0;
    register(s, ['a'], 'p', () => {
      n += 1;
      if (n === 1) return { repair: (rc) => { const w = store.write(s, [rc.address[0], 'leaf'], 'mem', 7); return { ok: true, message: 'fixed', op: w.op }; }, message: 'violation-1' };
      return true;
    });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null, rep = null;
    try { rep = runAttempt(s, cm); } catch (e) { thrown = e; }
    const token = st(thrown);
    let reportOutcome = 'n/a', message = 'n/a', opsLen = 'n/a';
    try { rep = report(s, cm.attempt); reportOutcome = rep.outcome; opsLen = rep.ops.length; const rr = rep.log.filter(e => e.kind === 'repair-run'); message = rr.length ? String(rr[0].message) : 'none'; } catch (e) { reportOutcome = 'threw ' + st(e); }
    const STORE_CODES = /AddressMalformed|AddressNotFound|LeafHasNoDownstream|TierNotFound|OutOfDomainTier|ParentAnchorMonotonicityViolation|ContainerKindConflict|WriteParentNotLink|ValueNotAdmitted|FileCommitFailed|RollbackCompacted|JournalOpUnknown|ReadTargetIsBranch/;
    const isStoreCode = STORE_CODES.test(token) ? 'yes' : 'no';
    const inKernelForm = /^KC-[1-8]$/.test(token) ? 'yes' : 'no';
    const codeInMessage = STORE_CODES.test(String(message)) ? 'yes' : 'no';
    return { outcome: (isStoreCode === 'yes' && inKernelForm === 'no' && codeInMessage === 'yes') ? 'PASS' : 'FAIL',
      observed: 'thrown token=' + token + ' (a store code? ' + isStoreCode + '; a KC token? ' + inKernelForm + ') — the throw is the repair body s OWN verb call, so the caller receives the STORE s own code unconverted; the attempt s `repair-run` log entry names it: codeInMessage=' + codeInMessage + '; report.outcome=' + reportOutcome + ' report.ops.length=' + opsLen + ' repair-run.message=' + String(message).slice(0, 140) };
  });

cell('A112-E9',
  'composition-and-states.md §2.7 item 13 (a BODY that throws: the caller receives the BODY S OWN THROWABLE unchanged, the `outcome` entry reads `null` on the CONSTRAINT-body path, and the attempt is disposed of)',
  'a constraint body that throws; K-3; then K-4/K-5 over the closed reference and a fresh K-2 at the freed address',
  'the body s own throwable, unchanged; the closed record s `outcome` entry reads `null`; a fresh K-2 returns a record',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => { throw new Error('blind-body-throw'); });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    const isOwn = throwErrorCheck(thrown);
    let closedState = 'none', fresh = 'none';
    try { const lg = log(s, cm.attempt); closedState = lg.filter(e => e.kind === 'outcome').map(e => String(e.state)).join(','); } catch (e) { closedState = 'threw ' + st(e); }
    try { const cm2 = commit(s, ['a'], 'mem', 2); fresh = 'returned keys=[' + Object.keys(cm2).sort().join(',') + ']'; } catch (e) { fresh = st(e); }
    return { outcome: (isOwn && closedState === 'null' && fresh.startsWith('returned')) ? 'PASS' : 'FAIL',
      observed: 'thrown is the body s own Error=' + isOwn + ' message=' + (thrown && thrown.message) + ' closure.readState=' + String(thrown && thrown.status) + ' outcome.state=' + closedState + ' fresh K-2=' + fresh };
  });

function throwErrorCheck(e) {
  return !!(e && e instanceof Error && e.message === 'blind-body-throw');
}

// =====================================================================================
// GROUP F — the store s own channel and the boundary of the kernel s five items
//   kernel-surface.md §2.1 items 1–2 (the two registration channels; K-2 s throws are the STORE S);
//   §1 item 3 (the kernel declares no store verb, member or function-carrying store parameter)
// =====================================================================================
cell('A112-F1',
  'kernel-surface.md §2.1 item 1 (channel (i): KC-1 for an address shape outside the domain — null, undefined, a non-array — refused by the kernel BEFORE listen); fail-surface.md §2 KC-1 row',
  'K-1 with a null address, with a non-array address, with a blank-token array, with an empty id and with a non-function constraint',
  'KC-1 for the two outside address shapes; KC-2 for the empty id and the non-function; the token carried by the thrown form s `status`',
  () => {
    const s = mk();
    const seen = {};
    const probe = (k, fn) => { try { fn(); seen[k] = 'none(no throw)'; } catch (e) { seen[k] = st(e); } };
    probe('null', () => register(s, null, 'p', () => true));
    probe('nonArray', () => register(s, 'a', 'p', () => true));
    probe('blankToken', () => register(s, ['', 'x'], 'p', () => true));
    probe('emptyId', () => register(s, ['a'], '', () => true));
    probe('nonFunction', () => register(s, ['a'], 'p', 5));
    const ok = seen.null === 'KC-1' && seen.nonArray === 'KC-1' && seen.emptyId === 'KC-2' && seen.nonFunction === 'KC-2' && seen.blankToken === 'none(no throw)';
    return { outcome: ok ? 'PASS' : 'FAIL',
      observed: JSON.stringify(seen) + ' (the blank token `\' \' is ADMITTED by the fail-surface KC-1 row s own re-derivation, so it must not throw)' };
  });

cell('A112-F2',
  'kernel-surface.md §2.1 item 2 (THROWS: the store s own code VERBATIM, the ONE item of the surface whose failure is the store s) + §2.1 item 1 channel (ii)',
  'K-2 whose write the store refuses (a tier outside the domain), read the thrown object',
  'the thrown object is the store s own code, unconverted, and no `KC` token appears; no attempt is opened and the address holds none',
  () => {
    const s = mk();
    let tierErr = 'none';
    try { commit(s, ['a'], 'not-a-tier', 1); } catch (e) { tierErr = st(e); }
    const kc = /^KC-/.test(tierErr);
    let inDomain = 'none', held = 'none';
    try { commit(s, ['a'], 'mem', 1); inDomain = 'returned keys=[' + Object.keys(s).sort().join(',') + ']'; } catch (e) { inDomain = st(e); }
    try { commit(s, ['a'], 'mem', 2); held = 'returned (address NOT held)'; } catch (e) { held = st(e); }
    return { outcome: (tierErr === 'OutOfDomainTier' && !kc && inDomain.startsWith('returned') && held === 'KC-7') ? 'PASS' : 'FAIL',
      observed: 'store refusals read at K-2: tier=' + tierErr + ' (a KC token? ' + kc + '); an in-domain K-2 at the same address ' + (inDomain.startsWith('returned') ? 'returned a record' : 'answered ' + inDomain) + ' — so the refused call opened no attempt; a second K-2 at that address=' + held };
  });

cell('A112-F3',
  'kernel-surface.md §2.1 item 3 (K-3 s throws are KC-3..KC-8) + attempt-lifecycle.md §2.4 item 8 (i); fail-surface.md §1.1 (the three-member failure form)',
  'read the member set of every thrown kernel form observed across the run s windows',
  'one form: exactly {status, message, log}, with the `log` carrying LogEntry members',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => ({ message: 'violation' }));
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s, cm); } catch (e) { thrown = e; }
    const keys = thrown ? Object.keys(thrown).sort().join(',') : 'none';
    const entryKeys = thrown && thrown.log && thrown.log[0] ? Object.keys(thrown.log[0]).sort().join(',') : 'none';
    const outcomeEntry = thrown && thrown.log ? thrown.log.filter(e => e.kind === 'outcome')[0] : null;
    const kcOnly = String(thrown && thrown.status).match(/^KC-[1-8]$/) ? 'yes' : 'no';
    return { outcome: (keys === 'log,message,status' && kcOnly === 'yes') ? 'PASS' : 'FAIL',
      observed: 'form keys=[' + keys + '] LogEntry keys=[' + entryKeys + '] status=' + st(thrown) + ' matches KC-1..KC-8=' + kcOnly + ' outcome.state=' + String(outcomeEntry && outcomeEntry.state) };
  });

ne('A112-F4',
  'kernel-surface.md §1 item 3 (the kernel declares NO store verb, member or function-carrying store parameter) — read against attempt-lifecycle.md §2.4 item 8 (ii) (e)',
  'a check that the kernel reaches the store only through the store s own declared verbs',
  'the kernel holds no store function and mints no store member',
  'NO DECLARED OBSERVABLE of the five items reads the kernel s own act',
  'NOT DRIVABLE WITHOUT READING THE IMPLEMENTATION: no declared member of the five items exposes the kernel s own call sites or what it holds (composition-and-states.md §2.7 item 12 enumerates the substitutions for states the five items do not expose, and none of them reaches this). Only a source read or a store-side interception would answer it, and both are outside a blind drive.');

// =====================================================================================
// GROUP G — the composition s call list, the floor stop, and the two named batteries
//   composition-and-states.md §2.6 items 1–3, 5, 8 (iv) · §3 items 1–3
//   attempt-lifecycle.md §2.4 item 8 (i) (5) · e2e-scenarios.md E2E-C-8 · e2e-scenarios-b.md E2E-C-16
// =====================================================================================
cell('A112-G1',
  'composition-and-states.md §2.6 item 3 (a step is recorded for every call ISSUED; `rollback` is [] on the success arm and 1+ on a failure arm whose composition has a still-owed op)',
  'a passing attempt with a repair landing one op; read report.rollback on the success arm, then a failing attempt s report through K-5',
  'success arm: `rollback` == [] (an empty list, never an absent member); failure arm: one step per performed call',
  () => {
    const s = mk();
    let n = 0;
    register(s, ['a'], 'p', () => { n += 1; if (n === 1) return { repair: (rc) => { const w = store.write(s, ['b'], 'mem', 5); return { ok: true, message: 'fixed', op: w.op }; }, message: 'v1' }; return true; });
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const success = Array.isArray(rep.rollback) && rep.rollback.length === 0;

    const s2 = mk();
    let m = 0;
    register(s2, ['c'], 'p', () => { m += 1; if (m === 1) return { repair: (rc) => { const w = store.write(s2, ['d'], 'mem', 5); return { ok: true, message: 'fixed', op: w.op }; }, message: 'v1' }; if (m === 2) return { message: 'v2' }; return true; });
    const cm2 = commit(s2, ['c'], 'mem', 1);
    let thrown = null;
    try { runAttempt(s2, cm2); } catch (e) { thrown = e; }
    let failSteps = 'n/a';
    try { failSteps = report(s2, cm2.attempt).rollback.length; } catch (e) { failSteps = 'report threw ' + st(e); }
    return { outcome: (success && failSteps >= 1) ? 'PASS' : 'FAIL',
      observed: 'success arm: report.rollback=' + JSON.stringify(rep.rollback) + ' ops=' + rep.ops.length + '; failure arm (' + st(thrown) + '): K-5 report rollback steps=' + failSteps };
  });

cell('A112-G2',
  'e2e-scenarios.md E2E-C-8 cells 2 and 5 (window (α) the app s own call; window (β) the same pair and the same value with the sequence run inside the app s own listener body; the compared members `outcome`, the `ops` kind sequence and the `log` length and kind/id/state sequences)',
  'window (α): register/commit/runAttempt from an external call site. window (β): the same pair registered, the same value written, and commit/runAttempt called INSIDE the app s listener body for the write it observed. Compare the declared members',
  'the two windows reports read EQUAL on outcome, on the ops kind sequence and on the log s kind/id/state sequences (message strings excluded)',
  () => {
    const runAlpha = () => {
      const s = mk();
      register(s, ['a'], 'c', () => ({ message: 'never' }));
      const cm = commit(s, ['a'], 'mem', 9);
      let th = null, rp = null;
      try { rp = runAttempt(s, cm); } catch (e) { th = e; }
      const lg = th ? th.log : rp.log;
      return { outcome: th ? st(th) : rp.outcome, opsKinds: (rp ? rp.ops.map(o => o.kind) : []).join(','), log: lg.map(e => e.kind + '/' + String(e.id) + '/' + String(e.state)).join(','), pending: cm.pending.length, triggered: cm.triggered.length };
    };
    const alpha = runAlpha();

    const s = mk();
    const beta = {};
    let fired = false;
    register(s, ['a'], 'c', () => ({ message: 'never' }));
    const lh = s.on(['a'], () => {
      if (fired) return;            // one window only: the listener s own write would re-trigger it
      fired = true;
      const cm = commit(s, ['a'], 'mem', 9);
      beta.pending = cm.pending.length; beta.triggered = cm.triggered.length;
      try { const rp = runAttempt(s, cm); beta.outcome = rp.outcome; beta.opsKinds = rp.ops.map(o => o.kind).join(','); beta.log = rp.log.map(e => e.kind + '/' + String(e.id) + '/' + String(e.state)).join(','); }
      catch (e) { beta.outcome = st(e); beta.opsKinds = ''; beta.log = (e.log || []).map(x => x.kind + '/' + String(x.id) + '/' + String(x.state)).join(','); }
    });
    // the listener's own trigger: a bare store write at that address
    try { store.write(s, ['a'], 'mem', 1); } catch (e) { beta.triggerError = st(e); }
    const listenerRan = fired && beta.pending !== undefined;
    tl('G2 listener window ran=' + listenerRan + ' beta=' + JSON.stringify(beta));
    const equal = listenerRan && alpha.outcome === beta.outcome && alpha.opsKinds === beta.opsKinds && alpha.log === beta.log;
    return { outcome: equal ? 'PASS' : 'FAIL',
      observed: 'alpha={' + JSON.stringify(alpha) + '} betaListenerRan=' + listenerRan + '={' + JSON.stringify(beta) + '} equal=' + equal + ' (the listener is INVOKED by the package s own delivery loop, so window (β) exists; the ORDER inside it is A112-D5 s hand-off)' };
  });

ne('A112-G3',
  'e2e-scenarios.md E2E-C-8 cell 6 (the re-derived falsifier: FALSIFIED BY a `pending` that OMITS any handle of the set the write returned, or by a `pending` READ AS CARRYING A LISTENER THE CONSTRAINTS HAVE NOT YET PASSED)',
  'read `CommitRecord.pending` in window (β) — the listener-body window of E2E-C-8 — against the write s whole returned set',
  'no handle of the returned set is omitted, and no entry is read as carrying a listener the constraints have not yet passed',
  'the falsifier s second limb is not readable by this unit',
  'the second limb of this cell s own falsifier is the ORDERING GATE: whether a listener stands in `pending` while a constraint of that write is unchecked is what the entry cannot learn (docs/next-steps.md N7), so the cell cannot be read as a pass-or-fail by this unit. The FIRST limb is driven by A112-B1/B2/B4 and is reported there.');

cell('A112-G4',
  'e2e-scenarios-b.md E2E-C-16 cell 2 (the start point: an ancestor pair `a#cL` whose handle the caller s descendant write returns, and NO pass of that attempt checks it off, so it stands in `pending` at K-2 s return for the caller s own loop)',
  'pair at [a]; a bare store write lands the parent; K-2 at the descendant [a,b]; then K-3',
  'the ancestor pair s handle stands in `triggered` (the store s own prefix rule) and in `pending`, and no pass of that attempt checks it off (the pass is address-scoped)',
  () => {
    const s = mk();
    let anc = 0;
    const h = register(s, ['a'], 'cL', () => { anc += 1; return true; });
    store.write(s, ['a'], 'mem', { seed: 1 });
    const cm = commit(s, ['a', 'b'], 'mem', 5);
    const atK2 = cm.pending.length;
    const rep = runAttempt(s, cm);
    const atK3 = cm.pending.length;
    const stillThere = cm.pending.some(p => String(p) === String(h));
    return { outcome: (atK2 === 1 && atK3 === 1 && stillThere && rep.outcome === 'passed') ? 'PASS' : 'FAIL',
      observed: 'triggered=' + cm.triggered.length + ' pending at K-2=' + atK2 + ' at K-3=' + atK3 + ' ancestor still in pending=' + stillThere + ' ancestor body calls=' + anc + ' outcome=' + rep.outcome };
  });

cell('A112-G5',
  'e2e-scenarios-b.md E2E-C-16 cell 5 (a second TOP-LEVEL K-2 at another address while the first stands OPEN is LAWFUL — KC-7 is refused only at the address that holds the live attempt) + docs/decisions.md A106 Q2',
  'K-2 at [a,d] (attempt 1 OPEN); K-2 at [a,b] while attempt 1 is still open; read the second return',
  'the second K-2 returns a fresh CommitRecord and throws no KC-7 (the first attempt s address only is held)',
  () => {
    const s = mk();
    register(s, ['a', 'd'], 'p1', () => true);
    register(s, ['a', 'b'], 'p2', () => true);
    store.write(s, ['a'], 'mem', { seed: 1 });   // the store lands no descendant under an absent parent
    const cm1 = commit(s, ['a', 'd'], 'mem', 1);
    let second = 'none', keys = 'none', trig = 'n/a', pend = 'n/a';
    try { const cm2 = commit(s, ['a', 'b'], 'mem', 2); second = 'returned'; keys = Object.keys(cm2).sort().join(','); trig = cm2.triggered.length; pend = cm2.pending.length; } catch (e) { second = st(e); }
    let rep1 = null, th1 = null;
    try { rep1 = runAttempt(s, cm1); } catch (e) { th1 = e; }
    return { outcome: (second === 'returned' && rep1 && rep1.outcome === 'passed') ? 'PASS' : 'FAIL',
      observed: 'second K-2 while attempt 1 OPEN=' + second + ' keys=[' + keys + '] triggered=' + trig + ' pending=' + pend + '; attempt 1 arm=' + (rep1 ? rep1.outcome : st(th1)) };
  });

cell('A112-G6',
  'composition-and-states.md §3 item 3 (the composition s call list and the floor stop are NOT re-opened by A112: the step count is the calls ISSUED and a call meeting the store s floor stops the walk); §2.6 item 6 (a) (the ONE `outcome` entry carries KC-8)',
  'the A112-E6 floor fixture, read for the walk s stop: the `outcome` entry s count and the token it carries, against the pass s own arm',
  'exactly ONE `outcome` entry, carrying KC-8 and not the pass s own arm (KC-5), with the floor s answer named in its message',
  () => {
    const s = mk(2);
    let n = 0;
    register(s, ['a'], 'p', () => {
      n += 1;
      if (n === 1) return { repair: (rc) => { let last = null; for (let i = 0; i < 4; i++) { const w = store.write(s, ['chain' + i], 'mem', i); last = w.op; } return { ok: true, message: 'fixed', op: last }; }, message: 'v1' };
      if (n === 2) return { message: 'v2' };
      return true;
    });
    const cm = commit(s, ['a'], 'mem', 1);
    let thrown = null, rep = null;
    try { rep = runAttempt(s, cm); } catch (e) { thrown = e; }
    const lg = thrown ? thrown.log : rep.log;
    const outcomes = lg.filter(e => e.kind === 'outcome');
    const tokens = outcomes.map(e => String(e.state)).join(',');
    const named = outcomes.length === 1 && /RollbackCompacted|JournalOpUnknown/.test(String(outcomes[0].message)) && /op-/.test(String(outcomes[0].message));
    return { outcome: (outcomes.length === 1 && tokens === 'KC-8' && named) ? 'PASS' : 'FAIL',
      observed: 'outcome entries=' + outcomes.length + ' token(s)=[' + tokens + '] message names the store s answer AND the op=' + named + ' rows=[' + lg.map(e => e.kind + ':' + String(e.state)).join(',') + ']' };
  });

// =====================================================================================
// GROUP H — the message log and the readers
//   kernel-surface.md §2.5 item 1 (LogEntry, six members, four kinds, seq ascending)
//   §2.1 items 4–5 (K-4/K-5, one shape, and the stale record KC-2)
// =====================================================================================
cell('A112-H1',
  'kernel-surface.md §2.5 item 1 (LogEntry s exactly six members; four kinds; `seq` strictly increasing from 1; `state` null on the three non-outcome kinds); §2.1 item 4 (K-4 s order)',
  'a passing attempt with a repair: read the report s log and assert the member set, the kind set and the seq order',
  'every entry carries exactly {seq,kind,id,message,opId,state}; seq is 1..n ascending with no gap',
  () => {
    const s = mk();
    let n = 0;
    register(s, ['a'], 'p', () => { n += 1; if (n === 1) return { repair: (rc) => { const w = store.write(s, ['b'], 'mem', 5); return { ok: true, message: 'fixed', op: w.op }; }, message: 'v1' }; return true; });
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const keys = rep.log.map(e => Object.keys(e).sort().join(','));
    const oneSet = keys.every(k => k === 'id,kind,message,opId,seq,state');
    const seqs = rep.log.map(e => e.seq);
    const ascending = seqs.every((v, i) => v === i + 1);
    const kinds = [...new Set(rep.log.map(e => e.kind))].sort().join(',');
    const nonOutcomeNull = rep.log.filter(e => e.kind !== 'outcome').every(e => e.state === null);
    const k4 = log(s, cm.attempt).map(e => e.seq).join(',');
    return { outcome: (oneSet && ascending && nonOutcomeNull && k4 === seqs.join(',')) ? 'PASS' : 'FAIL',
      observed: 'memberSetUniform=' + oneSet + ' seqs=[' + seqs.join(',') + '] ascending-from-1=' + ascending + ' kinds=[' + kinds + '] nonOutcome state null=' + nonOutcomeNull + ' K-4 seqs=[' + k4 + ']' };
  });

cell('A112-H2',
  'kernel-surface.md §2.1 item 4 and item 5 (`K-4`/`K-5` over a CLOSED attempt return the closed record s own log and report; `K-3` s return and `K-5` s return are ONE SHAPE; a stale reference is refused KC-2 at K-3)',
  'a closed passing attempt: K-4, K-5, then K-3 with the same stale CommitRecord',
  'K-4 returns the final log; K-5 s five members equal K-3 s report; K-3 over the closed record throws KC-2 (and not KC-7)',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const cm = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, cm);
    const r5 = report(s, cm.attempt);
    const same = JSON.stringify(rep) === JSON.stringify(r5);
    const keys = Object.keys(r5).sort().join(',');
    const lg4 = log(s, cm.attempt);
    let stale = 'none';
    try { runAttempt(s, cm); } catch (e) { stale = st(e); }
    return { outcome: (same && keys === 'attempt,log,ops,outcome,rollback' && lg4.length === rep.log.length && stale === 'KC-2') ? 'PASS' : 'FAIL',
      observed: 'K-5 members=[' + keys + '] K-5 == K-3 report=' + same + ' K-4 length=' + lg4.length + ' stale K-3 token=' + stale };
  });

cell('A112-H3',
  'kernel-surface.md §2.3 item 1 (AttemptContext s exactly five members); parameter-semantics.md §2.16',
  'capture the argument the constraint body receives and read its member set',
  'exactly {address, tier, value, attempt, op}',
  () => {
    const s = mk();
    let keys = 'none', opKind = 'none';
    register(s, ['a'], 'p', (ctx) => { keys = Object.keys(ctx).sort().join(','); opKind = ctx.op && ctx.op.kind; return true; });
    const cm = commit(s, ['a'], 'mem', 7);
    const rep = runAttempt(s, cm);
    return { outcome: (keys === 'address,attempt,op,tier,value' && opKind === 'write') ? 'PASS' : 'FAIL',
      observed: 'AttemptContext members=[' + keys + '] ctx.op.kind=' + opKind + ' outcome=' + rep.outcome };
  });

// =====================================================================================
// TOTALS
// =====================================================================================
const totals = results.reduce((a, r) => { a.cells += 1; if (r.outcome === 'PASS') a.pass += 1; else if (r.outcome === 'FAIL') a.fail += 1; else a.notExercisable += 1; return a; }, { cells: 0, pass: 0, fail: 0, notExercisable: 0 });
console.log('\nTOTALS ' + JSON.stringify(totals));
console.log('FAILING: ' + results.filter(r => r.outcome === 'FAIL').map(r => r.id).join(', '));
console.log('NOT-EXERCISABLE: ' + results.filter(r => r.outcome === 'NOT-EXERCISABLE').map(r => r.id).join(', '));
console.log('\nTIMELINE');
for (const l of timeline) console.log('  ' + l);

const fs = await import('node:fs');
fs.writeFileSync(new URL('./blind-greens-a112-out.json', import.meta.url), JSON.stringify({ totals, results, timeline }, null, 2));
console.log('\nwrote scratch/blind-greens-a112-out.json');
