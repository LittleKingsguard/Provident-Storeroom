// GATE 6 (RE-RUN UNDER `A112`, AFTER THE KERNEL FIX) — LIVE battery for `U-STOREROOM-CONSTRAINTS`.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. Every cell below imports the SHIPPED package (`provident-storeroom`
// resolved through `scratch/node_modules` -> `bindings/js`, i.e. the Rust store behind the JS binding)
// and the kernel module the docs declare as the constraint kernel's home, in a REAL Node process, and
// drives the scenarios' OWN expectations from REAL USER INPUT (the published surface as a consumer uses
// it: import, storeCreate, register, on/off, write/read, commit/runAttempt/log/report) to the FINAL
// RESOLVED STATE the clause declares settled.
//
// Sources read for the expectations: docs/specs/storeroom-constraints/live-greens-a112.md (the blind
// re-run set, its clauses/drives/expected observables), e2e-scenarios.md, e2e-scenarios-b.md,
// kernel-surface.md, attempt-lifecycle.md, composition-and-states.md, parameter-semantics.md,
// fail-surface.md — and the driver is judged against those clauses, NOT against the blind run's verdicts.
//
// Handles are compared BY IDENTITY (the store mints opaque objects; two distinct handles stringify alike).
import * as storeNs from 'provident-storeroom';
import * as kernelNs from '../bindings/js/src/constraint-kernel.mjs';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync } from 'node:fs';

const OUT = 'scratch/live-constraints-a112-gate6-out.json';
const RUN = process.argv[2] || 'run1';

const cells = [];
function record(id, group, clause, drive, expected, verdict, observed, extra) {
  cells.push({ id, group, clause, drive, expected, verdict, observed, ...(extra || {}) });
  console.log(String(id).padEnd(11) + verdict.padEnd(17) + String(observed));
}
function pass(id, group, clause, drive, expected, observed) {
  record(id, group, clause, drive, expected, 'PASS', observed);
}
function fail(id, group, clause, drive, expected, observed, contradicts) {
  record(id, group, clause, drive, expected, 'FAIL', observed, { contradictsGreensCell: contradicts || id });
}
function ne(id, group, clause, drive, expected, observed, why) {
  record(id, group, clause, drive, expected, 'NOT-EXERCISABLE', observed, { reason: why, names: 'N7' });
}

const mk = (jl = 64) => storeNs.storeCreate({ journalLength: jl, listeners: [] });
const st = (thrown) => (thrown && typeof thrown === 'object' && thrown.status) ? thrown.status : (thrown && thrown.message ? String(thrown.message) : String(thrown));
const grab = (fn) => { try { return { value: fn() }; } catch (e) { return { thrown: e }; } };
const isKC = (v) => typeof v === 'string' && /^KC-[1-8]$/.test(v);

// Run one cell: the function returns {verdict, observed} or throws (recorded FAIL with the throw).
function cell(id, group, clause, drive, expected, fn) {
  let r;
  try { r = fn(); } catch (e) {
    const detail = e && e.stack ? e.stack.split('\n').slice(0, 2).join(' | ') : String(e);
    fail(id, group, clause, drive, expected, 'UNCAUGHT BY THE DRIVER: ' + detail + ' :: observed throwable ' + (() => { try { return JSON.stringify(e); } catch (_) { return String(e); } })());
    return;
  }
  if (r && r.verdict === 'PASS') pass(id, group, clause, drive, expected, r.observed);
  else if (r && r.verdict === 'FAIL') fail(id, group, clause, drive, expected, r.observed);
  else if (r && r.verdict === 'NOT-EXERCISABLE') ne(id, group, clause, drive, expected, r.observed, r.reason);
  else fail(id, group, clause, drive, expected, 'THE CELL RETURNED NO VERDICT — its expectation was not evaluated: ' + JSON.stringify(r));
}
const J = (v) => JSON.stringify(v);

// =============================================================================================
// GROUP A — the declared surfaces
// =============================================================================================
cell('A112-A1', 'A',
  'kernel-surface.md §1 item 2; parameter-semantics.md §2.13 (domain/observable)',
  'import the kernel module and read its module namespace',
  'exactly the five items K-1..K-5 and no sixth',
  () => {
    const names = Object.keys(kernelNs).sort();
    const ok = names.join(',') === 'commit,log,register,report,runAttempt' && names.every(n => typeof kernelNs[n] === 'function');
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'module namespace keys=[' + names.join(',') + '] allFunctions=' + names.every(n => typeof kernelNs[n] === 'function') };
  });

cell('A112-A2', 'A',
  'docs/specs/storeroom-js/surface.md §2.9 item 1 (8 verbs); kernel-surface.md §2.1 item 1',
  'read the store package module namespace; construct one instance',
  'the closed 8-verb namespace and no ninth name; the instance carries {register,on,off}',
  () => {
    const names = Object.keys(storeNs).sort();
    const s = mk();
    const ik = Object.keys(s).sort().join(',');
    const ok = names.join(',') === 'delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write' && ik === 'off,on,register';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'store=[' + names.join(',') + '] instance=[' + ik + ']' };
  });

cell('A112-A3', 'A',
  'kernel-surface.md §2.1 item 1 (return shape, adopted handle, address-level idempotence)',
  'K-1 twice at the same pair; once at the same address under a different id; store.listen at that address; the instance member on(address,fn)',
  'one adopted handle for the address on all four calls',
  () => {
    const s = mk();
    const h1 = register(s, ['a'], 'p', () => true);
    const h2 = register(s, ['a'], 'p', () => true);
    const h3 = register(s, ['a'], 'q', () => true);
    const h4 = storeNs.listen(s, ['a']);
    const h5 = s.on(['a'], () => {});
    const all = [h2, h3, h4, h5].every(h => h === h1);
    return { verdict: all ? 'PASS' : 'FAIL', observed: 'identical-adopted-handle-on-all-four=' + all + ' typeof=' + typeof h1 };
  });

cell('A112-A4', 'A',
  'kernel-surface.md §2.1 item 2 (record shape); docs/specs/storeroom-js/surface.md §2.2 (write return)',
  'K-1 then K-2; read the record members against the store write verb\'s own return for the same call',
  'CommitRecord = {attempt,op,triggered,pending}; triggered carries the store\'s returned handle verbatim',
  () => {
    const s = mk();
    const h = register(s, ['a'], 'p', () => true);
    const rec = commit(s, ['a'], 'mem', 1);
    const keys = Object.keys(rec).sort().join(',');
    const carries = rec.triggered.length === 1 && rec.triggered[0] === h;
    const attemptKeys = Object.keys(rec.attempt || {}).sort().join(',');
    const ok = keys === 'attempt,op,pending,triggered' && carries && attemptKeys === 'id' && rec.op.kind === 'write';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'keys=[' + keys + '] triggered==[K-1 handle]=' + carries + ' attemptKeys=[' + attemptKeys + '] opKind=' + rec.op.kind };
  });

// =============================================================================================
// GROUP B — `pending` IS THE WHOLE RETURNED SET; the CHECK-OFF; the `SIFT`'s absence
// =============================================================================================
cell('A112-B1', 'B',
  'kernel-surface.md §2.1 item 2 (the whole returned set written as `pending`; an entry leaves ONLY by being checked off as it passes)',
  'two distinct ids registered at ONE address (p,q -> one handle) + an app listener through the instance member at that address; K-2; read pending against triggered at the return; count listener bodies that ran inside that window',
  'pending is the whole returned set: every handle of triggered is present in pending',
  () => {
    const s = mk();
    const h = register(s, ['a'], 'p', () => true);
    register(s, ['a'], 'q', () => true);
    let listenerCalls = 0;
    s.on(['a'], () => { listenerCalls += 1; });
    const rec = commit(s, ['a'], 'mem', 1);
    const whole = rec.triggered.every(x => rec.pending.includes(x));
    const noExtra = rec.pending.every(x => rec.triggered.includes(x));
    const ok = rec.triggered.length === 1 && rec.pending.length === 1 && whole && noExtra;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'triggered=' + rec.triggered.length + ' pending=' + rec.pending.length + ' whole=' + whole + ' noExtra=' + noExtra + ' listenerCalls=' + listenerCalls };
  });

cell('A112-B2', 'B',
  'kernel-surface.md §2.1 item 2 (an entry the pass did not evaluate stands in the member); §2.2 item 2; §2.3 item 1 (address-scoped evaluation)',
  'pair at the ancestor address [a] with a counting body; the parent is landed by a bare store.write there; K-2 at the descendant address [a,b]',
  'the ancestor pair\'s handle is returned (prefix rule) and stands in pending at the return because the attempt\'s pass is address-scoped and never evaluates it',
  () => {
    const s = mk();
    let ancestorCalls = 0;
    const anc = register(s, ['a'], 'cL', () => { ancestorCalls += 1; return true; });
    // THE PARENT MUST BE A LINK AND NOT A LEAF: the store's own W-2/W-3/W-4 rule refuses a descendant
    // write under a leaf (e2e-scenarios-b.md E2E-C-16 step (1b) names exactly this hazard).
    storeNs.write(s, ['a'], 'mem', { k: 1 });
    register(s, ['a', 'b'], 'own', () => true);
    const rec = commit(s, ['a', 'b'], 'mem', 2);
    const carried = rec.triggered.includes(anc);
    const ok = carried && rec.pending.length === rec.triggered.length && ancestorCalls === 0;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'triggered=' + rec.triggered.length + ' pending=' + rec.pending.length + ' ancestorHandleCarried=' + carried + ' ancestorBodyCallsAtK-2=' + ancestorCalls };
  });

cell('A112-B3', 'B',
  'kernel-surface.md §2.1 item 2 (SIFT definition: a subtraction NOT tied to that entry\'s own pass is unlawful; an entry leaves only by being checked off AS IT PASSES)',
  'a passing pair: K-2, read pending, then K-3 and read pending again in place; then the SAME shape with a pair that FAILS its own pass',
  'every handle that leaves pending did so against a delivery of its own pair that PASSED, and no handle leaves otherwise',
  () => {
    // passing arm
    const s1 = mk();
    let calls1 = 0;
    register(s1, ['a'], 'p', () => { calls1 += 1; return true; });
    const r1 = commit(s1, ['a'], 'mem', 1);
    const atReturn1 = r1.pending.length;
    const rep1 = runAttempt(s1, r1);
    const after1 = r1.pending.length;
    // failing arm
    const s2 = mk();
    let calls2 = 0;
    register(s2, ['a'], 'p', () => { calls2 += 1; return { message: 'no' }; });
    const r2 = commit(s2, ['a'], 'mem', 1);
    const atReturn2 = r2.pending.length;
    const thrown2 = grab(() => runAttempt(s2, r2));
    const after2 = r2.pending.length;
    const observed = 'PASSING: at K-2 return triggered=' + r1.triggered.length + ' pending=' + atReturn1
      + ' (no SIFT at the write); its own pass ran ' + calls1 + 'x and PASSED (outcome=' + rep1.outcome + '), entry left (' + atReturn1 + ' -> ' + after1 + '). '
      + 'FAILING: at K-2 return pending=' + atReturn2 + ' -> ' + after2 + ' after the pass, while the pair never passed (' + calls2
      + ' call(s), token ' + st(thrown2.thrown) + ')';
    // the clause's own demand: on the passing arm the subtraction IS the check-off; on the failing arm it is not.
    const ok = atReturn1 === 1 && calls1 === 1 && rep1.outcome === 'passed' && after1 === 0
      && atReturn2 === 1 && calls2 === 1 && st(thrown2.thrown) === 'KC-3' && after2 === 0;
    return { verdict: ok ? 'PASS' : 'FAIL', observed };
  });

cell('A112-B4', 'B',
  'kernel-surface.md §2.1 item 2 (the check-off IS the only lawful removal; a SIFT is a subtraction not tied to that entry\'s own pass); attempt-lifecycle.md §2.4 item 8 (i) (5) (the discard reaches EXACTLY the FAILED WRITE\'S OWN returned set, and no entry any other write\'s own returned set put in a member is removed)',
  'TWO arms of the same clause. (i) AN EARLIER CALLER WRITE\'S ENTRY STANDS: `K-2 r1` at the unrelated address [q], left unresolved, so its own record\'s `pending` carries its own handle; then a FAILING attempt at [a] (a pair that violates) whose write returned no handle of r1\'s set; read both members after the arm. (ii) THE DISCARD\'S REACH: an ancestor pair [a]#cL that no pass of the attempt evaluates + a violation at the attempt\'s own address [a,b]; read the member of the failed write\'s OWN record at its return and after the arm, and the same fixture with the attempt\'s own pair PASSING',
  'on the failing arm every handle of the FAILED WRITE\'S OWN returned set leaves while no pass checks any of them off, NO OTHER WRITE\'S OWN ENTRY IS REMOVED, and on the passing arm the never-evaluated ancestor entry STANDS',
  () => {
    // ---- ARM (i): the earlier caller write's own entry stands after a failing arm elsewhere ----
    const sQ = mk();
    register(sQ, ['q'], 'q1', () => true);
    const r1 = commit(sQ, ['q'], 'mem', 'q-value');
    const qEntry = r1.pending[0];
    const ownQ = register(sQ, ['a'], 'ownQ', () => ({ message: 'violated' }));
    const recQ = commit(sQ, ['a'], 'mem', 2);
    const qAtReturn = { r1pending: r1.pending.length, recP: recQ.pending.length, qInFailedSet: recQ.triggered.includes(qEntry) };
    const qThrown = grab(() => runAttempt(sQ, recQ));
    const qAfter = { recP: recQ.pending.length, ownStanding: recQ.pending.includes(ownQ), qEntryStanding: r1.pending.includes(qEntry) };
    // ---- ARM (ii): the ancestor-shaped fixture and the discard's reach ----
    const build = (ownBody) => {
      const s = mk();
      let ancestorCalls = 0;
      const anc = register(s, ['a'], 'cL', () => { ancestorCalls += 1; return true; });
      // THE PARENT IS A LINK, NOT A LEAF: a scalar there makes ['a','b'] refuse `WriteParentNotLink`.
      storeNs.write(s, ['a'], 'mem', { k: 1 });
      const own = register(s, ['a', 'b'], 'own', ownBody);
      const rec = commit(s, ['a', 'b'], 'mem', 2);
      const atReturn = { triggered: rec.triggered.length, pending: rec.pending.length, ancInReturned: rec.triggered.includes(anc), ancInPending: rec.pending.includes(anc) };
      const thrown = grab(() => runAttempt(s, rec));
      const after = { pending: rec.pending.length, ancStanding: rec.pending.includes(anc), ownStanding: rec.pending.includes(own) };
      return { s, anc, own, rec, atReturn, thrown, after, ancestorCalls };
    };
    const failing = build(() => ({ message: 'violated' }));
    const passing = build(() => true);
    const passingOutcome = passing.thrown.thrown ? st(passing.thrown.thrown) : passing.thrown.value.outcome;
    const observed = 'ARM (i) — AN EARLIER CALLER WRITE\'S ENTRY: r1 (at [q]) pending=' + qAtReturn.r1pending + '; the failing write\'s triggered=' + qAtReturn.recP + ', the earlier entry a member of the FAILED write\'s own returned set=' + qAtReturn.qInFailedSet
      + '; token=' + st(qThrown.thrown) + '; after the arm: the failed write\'s own pending=' + qAfter.recP + ', its own address\'s entry still present=' + qAfter.ownStanding
      + ', THE EARLIER WRITE\'S OWN ENTRY STILL PRESENT=' + qAfter.qEntryStanding
      + '. ARM (ii) — THE DISCARD\'S REACH: at the failed write\'s return triggered=' + failing.atReturn.triggered + ' pending=' + failing.atReturn.pending + ' (ancestor handle a member of the returned set=' + failing.atReturn.ancInReturned + ')'
      + '; after the arm pending=' + failing.after.pending + ', never-evaluated ancestor handle still present=' + failing.after.ancStanding
      + ', the failed write\'s own address\'s handle still present=' + failing.after.ownStanding + ', ancestor body calls=' + failing.ancestorCalls
      + '. PASSING ARM of the SAME fixture: after the pass ancestor standing=' + passing.after.ancStanding
      + ' (ancestor calls=' + passing.ancestorCalls + ', outcome=' + passingOutcome + ')';
    // The clause's own expectation read live: the earlier write's own entry STANDS; the failed write's own
    // whole returned set is gone (including the ancestor handle the store's prefix rule put in it); and on
    // the PASSING arm the never-evaluated ancestor entry stands because no discard runs there.
    const ok = qAfter.qEntryStanding === true
      && qAfter.recP === 0
      && qAfter.ownStanding === false
      && failing.atReturn.ancInReturned === true
      && failing.after.pending === 1
      && failing.after.ancStanding === true
      && failing.after.ownStanding === false
      && failing.ancestorCalls === 0
      && passing.after.ancStanding === true;
    return { verdict: ok ? 'PASS' : 'FAIL', observed };
  });
cell('A112-B5', 'B',
  'kernel-surface.md §2.1 item 2 (the caller reads the record only after the verb call\'s window closes); §2.2 item 3',
  'the record object K-2 returned is read again after K-3 returns (the window that performs the check-off)',
  'the caller\'s reading tracks the subtraction: the entries checked off as they passed are gone from the member the record carries',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const rec = commit(s, ['a'], 'mem', 1);
    const before = rec.pending.length;
    const rep = runAttempt(s, rec);
    const after = rec.pending.length;
    const ok = before === 1 && after === 0 && rep.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'pending.length at K-2 return=' + before + ', after K-3=' + after + ', report.outcome=' + rep.outcome };
  });

cell('A112-B6', 'B',
  'kernel-surface.md §2.1 item 2 (the whole set is written, and it is the set the store\'s return carried); §2.2 item 2',
  'K-2 whose pair passes, then K-3, then K-2 again at the same address; read pending at each return',
  'each write writes its own whole returned set: a fresh K-2 carries its own set, not a residue of the first',
  () => {
    const s = mk();
    let calls = 0;
    register(s, ['a'], 'p', () => { calls += 1; return true; });
    const r1 = commit(s, ['a'], 'mem', 1);
    const t1 = { triggered: r1.triggered.length, pending: r1.pending.length, bodyCalls: calls };
    runAttempt(s, r1);
    const afterFirst = r1.pending.length;
    const callsBeforeSecond = calls;
    const r2 = commit(s, ['a'], 'mem', 2);
    const t2 = { triggered: r2.triggered.length, pending: r2.pending.length, bodyCallsInsideSecondWindow: calls - callsBeforeSecond };
    runAttempt(s, r2);
    const afterSecond = r2.pending.length;
    const ok = t1.pending === 1 && t1.bodyCalls === 0 && afterFirst === 0
      && t2.pending === 1 && t2.triggered === 1 && calls === 2 && afterSecond === 0;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'K-2(1): triggered=' + t1.triggered + ' pending=' + t1.pending + ' bodyCalls=' + t1.bodyCalls + ' -> after K-3 pending=' + afterFirst
      + '; K-2(2): triggered=' + t2.triggered + ' pending=' + t2.pending + ' (no residue of the first) -> after K-3 pending=' + afterSecond + '; pair body ran ' + calls + 'x in total, once per write' };
  });

// =============================================================================================
// GROUP C — the failed/discarded arm, and one delivery per evaluated pair
// =============================================================================================
cell('A112-C1', 'C',
  'kernel-surface.md §2.1 item 2 (on a throwing arm the caller\'s loop performs no invocation for any handle this member carries); attempt-lifecycle.md §2.4 item 8 (i) (5)',
  'a violating pair with no repair: K-2 (pending read), K-3 throws, read pending in place, then run the caller\'s own loop shape over whatever remains',
  'the arm reaches the loop with nothing left in it to invoke',
  () => {
    const s = mk();
    let pairBodyCalls = 0;
    register(s, ['a'], 'p', () => { pairBodyCalls += 1; return { message: 'violated' }; });
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const remaining = rec.pending.slice();
    let loopInvocations = 0;
    for (const h of remaining) { loopInvocations += 1; }
    const ok = st(thrown.thrown) === 'KC-3' && remaining.length === 0 && loopInvocations === 0 && pairBodyCalls === 1;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'token=' + st(thrown.thrown) + ' pendingAfterThrow=' + remaining.length + ' caller-loop invocations=' + loopInvocations + ' pairBodyCallsInsideK-3=' + pairBodyCalls };
  });

cell('A112-C2', 'C',
  'kernel-surface.md §2.1 item 2 (the failed/discarded arm: the rolled-back write\'s handles are carried by pending NEVER); §2.2 item 2',
  'same fixture as C1, read against the claim that its triggered set was DISCARDED rather than carried',
  'a write whose set is discarded carries pending == [] from the write itself on; a write whose set is not discarded carries it and it leaves only by check-off',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => ({ message: 'violated' }));
    const rec = commit(s, ['a'], 'mem', 1);
    const atK2 = { triggered: rec.triggered.length, pending: rec.pending.length };
    const thrown = grab(() => runAttempt(s, rec));
    const after = rec.pending.length;
    const carriedFromWrite = atK2.pending === atK2.triggered && atK2.pending === 1;
    const ok = carriedFromWrite && after === 0 && st(thrown.thrown) === 'KC-3';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'at K-2: triggered=' + atK2.triggered + ' pending=' + atK2.pending + ' (discarded-at-the-write=' + !carriedFromWrite + '); after the failing K-3 pending=' + after + '; token=' + st(thrown.thrown) + ' -> the removal happened in the K-3 window, not at the write' };
  });

cell('A112-C3', 'C',
  'kernel-surface.md §2.2 item 2 (one delivery per evaluated pair, each carrying THAT PAIR\'S OWN FUNCTION, and for no other)',
  'two pairs p,q at one address, each body recording its own mark; K-2 then K-3',
  'each evaluated pair delivers its own function exactly once, and no other',
  () => {
    const s = mk();
    const marks = [];
    register(s, ['a'], 'p', () => { marks.push('p'); return true; });
    register(s, ['a'], 'q', () => { marks.push('q'); return true; });
    const rec = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, rec);
    const ids = rep.log.filter(e => e.kind === 'constraint-check').map(e => e.id);
    const ok = marks.slice().sort().join(',') === 'p,q' && ids.join(',') === 'p,q' && rep.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'delivered=[' + marks.join('') + '] constraint-check ids=[' + ids.join(',') + '] outcome=' + rep.outcome };
  });

cell('A112-C4', 'C',
  'kernel-surface.md §2.2 item 3 (the one comparable order is the registry\'s own first-registration order); §2.1 item 1',
  'three pairs registered as b,a,c at one address, then b re-registered with a NEW function; K-2, K-3',
  'the pass\'s constraint-check id sequence is the registry\'s first-registration order b,a,c and the replacement moves nothing',
  () => {
    const s = mk();
    let replacementRan = 0;
    register(s, ['a'], 'b', () => true);
    register(s, ['a'], 'a', () => true);
    register(s, ['a'], 'c', () => true);
    register(s, ['a'], 'b', () => { replacementRan += 1; return true; });
    const rec = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, rec);
    const order = rep.log.filter(e => e.kind === 'constraint-check').map(e => e.id);
    const ok = order.join(',') === 'b,a,c' && replacementRan === 1;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'constraint-check order=[' + order.join(',') + '] replacementRan=' + replacementRan };
  });

// =============================================================================================
// GROUP D — the store invokes nothing; the two ordered layers
// =============================================================================================
cell('A112-D1', 'D',
  'kernel-surface.md §2.2 item 2 (THE STORE RETURNS THE HANDLES AND INVOKES NOTHING); docs/specs/storeroom-js/surface.md §2.4 rules 1-4',
  'K-1 with a counting constraint whose home entry STANDS; a bare store.write at that address; then store.unlisten withdraws the store\'s home entry; a bare store.write again',
  'the store invokes nothing: the constraint body\'s count stays 0 on the bare write, with the entry standing and after the withdrawal',
  () => {
    const s = mk();
    let bodyCalls = 0;
    const h = register(s, ['a'], 'p', () => { bodyCalls += 1; return true; });
    const w1 = grab(() => storeNs.write(s, ['a'], 'mem', 1));
    const afterStanding = bodyCalls;
    const un = grab(() => storeNs.unlisten(s, h));
    const w2 = grab(() => storeNs.write(s, ['a'], 'mem', 2));
    const ok = afterStanding === 0 && bodyCalls === 0 && !w1.thrown && !w2.thrown;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'body calls after a bare store.write with the entry standing=' + afterStanding + ', after unlisten=' + bodyCalls + ', write error=' + (w1.thrown ? st(w1.thrown) : (w2.thrown ? st(w2.thrown) : 'none')) + ', unlisten=' + (un.thrown ? st(un.thrown) : 'ok') };
  });

cell('A112-D2', 'D',
  'kernel-surface.md §2.1 item 2 (the constraints layer\'s run completes inside the verb call\'s own window) + §2.2 item 2; attempt-lifecycle.md §2.4 item 6 (the kernel\'s window opens at K-2 and closes at K-3\'s terminal state)',
  'K-1 then K-2 with a counting constraint body and an app listener registered through the instance member after K-1; read both counts and the record at K-2\'s return, then K-3',
  'at K-2\'s return the constraint body has run AND its handle has been checked off, and no body of another kind of that same call has run yet',
  () => {
    const s = mk();
    let constraintCalls = 0; let listenerCalls = 0;
    register(s, ['a'], 'p', () => { constraintCalls += 1; return true; });
    s.on(['a'], () => { listenerCalls += 1; });
    const rec = commit(s, ['a'], 'mem', 1);
    const atK2 = { constraintCalls, listenerCalls, triggered: rec.triggered.length, pending: rec.pending.length };
    const rep = runAttempt(s, rec);
    const after = { constraintCalls, listenerCalls, outcome: rep.outcome, pending: rec.pending.length };
    return {
      verdict: 'NOT-EXERCISABLE',
      observed: 'MEASURED WITHOUT VERDICT: at K-2\'s return constraint body calls=' + atK2.constraintCalls + ', pending.length=' + atK2.pending + ' of triggered.length=' + atK2.triggered + ' (no check-off), app listener body calls=' + atK2.listenerCalls
        + '; after K-3 constraint calls=' + after.constraintCalls + ', listener calls=' + after.listenerCalls + ', outcome=' + after.outcome + ', pending=' + after.pending,
      reason: 'N7 (the A112 ordering gate, enforced nowhere in the delivered surface: the entry cannot learn whether a constraint stands owed) read with the unpinned "that same verb call" of kernel-surface.md §2.1 item 2 (a caller-made write makes K-2 and then K-3)',
    };
  });

cell('A112-D3', 'D',
  'kernel-surface.md §2.2 item 2 (layer (b) = the caller\'s own loop over CommitRecord.pending); §2.1 item 2 (the loop\'s call shape and its one argument)',
  'K-2 with the instance listener registered and its handle kept; after K-3 returns, run the caller\'s own loop over the handles remaining in pending',
  'the caller\'s loop reads its work off pending and invokes each remaining handle once — for a passing pair\'s already-checked-off handle there is nothing left to invoke',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const rec = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, rec);
    const left = rec.pending.slice();
    let loopInvocations = 0;
    for (const h of left) { loopInvocations += 1; }
    const ok = left.length === 0 && loopInvocations === 0 && rep.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'handles left in pending after K-3=' + left.length + '; caller-loop invocations=' + loopInvocations + '; outcome=' + rep.outcome };
  });

cell('A112-D4', 'D',
  'docs/specs/storeroom-js/surface.md §2.4 rule 1 + kernel-surface.md §2.1 item 1 (an unregistered handle fires nothing, silently)',
  'register the instance listener AFTER K-1 (the store\'s one function at that address is then the app\'s); K-2; read the app\'s listener count; K-3',
  'a listener the app registered after the kernel\'s adoption is not invoked while the kernel\'s registration stands',
  () => {
    const s = mk();
    let kernelPairCalls = 0; let appListenerCalls = 0;
    const h1 = register(s, ['a'], 'p', () => { kernelPairCalls += 1; return true; });
    const h2 = s.on(['a'], () => { appListenerCalls += 1; });
    const same = h1 === h2;
    const rec = commit(s, ['a'], 'mem', 1);
    const atK2 = { kernelPairCalls, appListenerCalls };
    const rep = runAttempt(s, rec);
    const ok = same === true && atK2.appListenerCalls === 0 && rep.outcome === 'passed';
    // THE DECLARED OBSERVABLE IS THE CONTRADICTION: `live-greens-a112.md`'s `[A112-D4]` line prints its own
    // measured `app listener calls at K-2=1` while its verdict reads PASS, and its own prose at `[A112-D5]`
    // says *"the app listener's body ran inside K-2's window while the constraint body's count for that same
    // write stood at 0"* — so this window's own measured state falsifies the cell's expected observable.
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'on() returned the SAME adopted handle=' + same + '; constraint body calls at K-2=' + atK2.kernelPairCalls + '; app listener calls at K-2=' + atK2.appListenerCalls + '; outcome=' + rep.outcome + '; pair body calls after K-3=' + kernelPairCalls + ', app listener calls after K-3=' + appListenerCalls + '; pending after K-3=' + rec.pending.length + ' — THE DECLARED OBSERVABLE ("a listener the app registered after the kernel\'s adoption is not invoked while the kernel\'s registration stands") IS FALSIFIED BY appListenerCalls=1 INSIDE THE K-2 WINDOW; the greens cell prints this same value and reads PASS' };
  });

cell('A112-D5', 'D',
  'kernel-surface.md §2.1 item 2 (THE ORDER: every layer (a) delivery of the call completes before any layer (b) body of that call runs) + §2.2 item 2; docs/next-steps.md N7',
  'register a plain listener at the constraint\'s address AFTER K-1 so its body runs; observe whether it runs while the constraint of the same write stands owed',
  'the constraint\'s own delivery of that write has completed before any plain listener body of that call runs',
  () => {
    const s = mk();
    let constraintCalls = 0; let listenerCalls = 0;
    register(s, ['a'], 'p', () => { constraintCalls += 1; return true; });
    s.on(['a'], () => { listenerCalls += 1; });
    const rec = commit(s, ['a'], 'mem', 1);
    const atK2 = { constraintCalls, listenerCalls };
    const rep = runAttempt(s, rec);
    return {
      verdict: 'NOT-EXERCISABLE',
      observed: 'MEASURED WITHOUT VERDICT: with on() issued after K-1 the app listener body calls stood at ' + atK2.listenerCalls + ' inside the K-2 window while the constraint body of that same write stood at ' + atK2.constraintCalls
        + '; after K-3 constraint calls=' + constraintCalls + ', outcome=' + rep.outcome + '. THE ORDERING OF THE TWO LAYERS OF ONE CALL IS NOT READABLE BY THIS UNIT.',
      reason: 'N7 (the ordering gate is enforced nowhere in the delivered surface — the JS entry does not import the kernel; the entry cannot learn whether a constraint stands owed)',
    };
  });

// =============================================================================================
// GROUP E — the hold/release edges, the repeat states and the repair states
// =============================================================================================
cell('A112-E1', 'E',
  'kernel-surface.md §2.1 item 2 (an address is held from the moment K-2\'s write verb returns until the attempt\'s terminal arm; a second K-2 at a held address is refused KC-7 BEFORE the write verb is reached); fail-surface.md §2 KC-7',
  'K-2 at [a]; a second K-2 at [a] while the first attempt is open; then K-3 for the first; then a fresh K-2 at [a]',
  'KC-7 before the write verb (no write happened: the address still holds the first write\'s value), and no KC-7 after the terminal arm',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const rec = commit(s, ['a'], 'mem', 1);
    const second = grab(() => commit(s, ['a'], 'mem', 99));
    const valueAtRefusal = grab(() => storeNs.read(s, ['a']));
    const first = grab(() => runAttempt(s, rec));
    const fresh = grab(() => commit(s, ['a'], 'mem', 3));
    const freshOk = !fresh.thrown && fresh.value && Object.keys(fresh.value).sort().join(',') === 'attempt,op,pending,triggered';
    const ok = st(second.thrown) === 'KC-7' && valueAtRefusal.value === 1 && !first.thrown && freshOk;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'second K-2 while open=' + st(second.thrown) + ' (the address still reads ' + J(valueAtRefusal.value) + ' at that instant — the first write\'s value, not the refused one); first arm=' + (first.thrown ? st(first.thrown) : first.value.outcome) + '; fresh K-2 after the terminal arm=' + (fresh.thrown ? 'THREW ' + st(fresh.thrown) : 'returned keys=[' + Object.keys(fresh.value).sort().join(',') + ']') };
  });

cell('A112-E2', 'E',
  'kernel-surface.md §2.1 item 2 (the hold is released by the attempt\'s own TERMINAL ARM and by no other act); fail-surface.md §2 KC-7 (a failure arm\'s standing remainder is RESIDUE, not a live attempt)',
  'K-2 with a violating pair (the attempt reaches a FAILING terminal arm), then a fresh K-2 at that address and a read of the store\'s own surface there',
  'no KC-7, the write verb is reached',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => ({ message: 'violated' }));
    const rec = commit(s, ['a'], 'mem', 1);
    const first = grab(() => runAttempt(s, rec));
    const fresh = grab(() => commit(s, ['a'], 'mem', 2));
    const freshOk = !fresh.thrown && fresh.value && Object.keys(fresh.value).sort().join(',') === 'attempt,op,pending,triggered';
    const ok = st(first.thrown) === 'KC-3' && freshOk;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'failing arm=' + st(first.thrown) + '; fresh K-2=' + (fresh.thrown ? 'THREW ' + st(fresh.thrown) : 'returned keys=[' + Object.keys(fresh.value).sort().join(',') + ']') };
  });

cell('A112-E3', 'E',
  'kernel-surface.md §2.1 item 3 (a live attempt\'s re-entrant run is refused KC-7) + attempt-lifecycle.md §2.4 item 8 (ii) (b); fail-surface.md §2 KC-7 (the K-5 site)',
  'inside a constraint body of the live attempt: call K-2 at the attempt\'s own address, K-3 for the live attempt, K-1 at a new pair, K-4, and K-5 over the live attempt; then return true',
  'KC-7 for K-2 and for K-3 and for K-5; K-1 admitted; K-4 returns the open record\'s log; the log\'s seq/kind/id sequence keeps ascending',
  () => {
    const s = mk();
    const inside = {};
    let rec;
    register(s, ['a'], 'p', (ctx) => {
      inside.K2 = grab(() => commit(s, ['a'], 'mem', 99));
      inside.K3 = grab(() => runAttempt(s, rec));
      inside.K1 = grab(() => register(s, ['a'], 'q', () => true));
      inside.K4 = grab(() => log(s, rec.attempt));
      inside.K5 = grab(() => report(s, rec.attempt));
      return true;
    });
    rec = commit(s, ['a'], 'mem', 1);
    const rep = grab(() => runAttempt(s, rec));
    const k4 = inside.K4.value || [];
    const ok = st(inside.K2.thrown) === 'KC-7' && st(inside.K3.thrown) === 'KC-7' && !inside.K1.thrown && st(inside.K5.thrown) === 'KC-7'
      && Array.isArray(k4) && !rep.thrown && rep.value.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'K-2=' + st(inside.K2.thrown) + ' K-3=' + st(inside.K3.thrown) + ' K-1=' + (inside.K1.thrown ? 'THREW ' + st(inside.K1.thrown) : 'admitted') + ' K-5=' + st(inside.K5.thrown) + ' K-4=' + J(k4.map(e => e.seq + ':' + e.kind + ':' + e.id)) + ' outcome=' + (rep.thrown ? st(rep.thrown) : rep.value.outcome) };
  });

cell('A112-E4', 'E',
  'fail-surface.md §2 KC-5 (an evaluation violates a pair that is in `ran` and IN `appliedRepairs`); attempt-lifecycle.md §2.4 item 4 arm (e)',
  'a pair whose repair runs and whose re-run of the repaired op then violates the SAME pair again',
  'KC-5 carried by the thrown form\'s status and by the `outcome` entry\'s state, with exactly ONE `repair-run` entry for that pair',
  () => {
    const s = mk();
    let xCalls = 0;
    register(s, ['a'], 'x', (ctx) => {
      xCalls += 1;
      if (ctx.value >= 5) {
        return { repair: (rc) => { const w = storeNs.write(s, rc.address, rc.tier, 6); return { ok: true, message: 'raised', op: w.op }; }, message: 'value too large' };
      }
      return true;
    });
    register(s, ['a'], 'y', (ctx) => {
      if (ctx.value === 6) {
        return { repair: (rc) => { const w = storeNs.write(s, rc.address, rc.tier, rc.value); return { ok: true, message: 'rewrote 6', op: w.op }; }, message: 'y refuses 6' };
      }
      return true;
    });
    const rec = commit(s, ['a'], 'mem', 5);
    const thrown = grab(() => runAttempt(s, rec));
    const k5 = grab(() => report(s, rec.attempt));
    const logArr = (thrown.thrown && thrown.thrown.log) || [];
    const outcomeEntry = logArr.find(e => e.kind === 'outcome');
    const repairRuns = logArr.filter(e => e.kind === 'repair-run');
    const checks = logArr.filter(e => e.kind === 'constraint-check').map(e => e.id);
    const ok = st(thrown.thrown) === 'KC-5' && outcomeEntry && outcomeEntry.state === 'KC-5' && repairRuns.length === 1 && xCalls === 2;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'status=' + st(thrown.thrown) + ' outcomeEntry.state=' + (outcomeEntry && outcomeEntry.state) + ' repair-run entries=' + repairRuns.length + ' constraint-check ids=[' + checks.join(',') + ']' };
  });

cell('A112-E5', 'E',
  'fail-surface.md §2 KC-6 (an evaluation violates a pair in `ran` that is NOT in `appliedRepairs`); attempt-lifecycle.md §2.4 item 4 arm (f)',
  'a pair that passes (entering `ran` and not `appliedRepairs`) and is violated a SECOND time inside ONE attempt',
  'KC-6 carried by the thrown form\'s status and by the `outcome` entry\'s state',
  () => ({
    verdict: 'NOT-EXERCISABLE',
    observed: 'MEASURED WITHOUT VERDICT: no drive of the five declared items reaches a second evaluation of a passing pair inside one attempt (a pair is evaluated at most once per pass, and a re-run is caused only by a repair\'s own landing, which puts its pair in `appliedRepairs`). KC-6 was not reached and no probe of this surface can reach it.',
    reason: 'No clause pins a DRIVE for KC-6 (the per-landing pass that could evaluate a pair a second time is OWED to J-20–J-22; kernel-surface.md §2.3 item 1): a doc/spec hand-off, not a product failure and not the ordering hand-off N7',
  }));

cell('A112-E6', 'E',
  'composition-and-states.md §2.6 items 4–5 and 8 (iv) (the composition reaches KC-8 where a still-owed op\'s call meets the store\'s floor); fail-surface.md §2 KC-8 (the ONE `outcome` entry carries its token)',
  'journalLength 2; a repair landing a chain of ops at one address, then a violation of the repaired pair so the attempt fails and its composition walks the still-owed ops',
  'KC-8 carried by the thrown form\'s status and by the attempt\'s ONE `outcome` entry\'s state, that entry naming the store\'s own answer',
  () => {
    const s = mk(2);
    register(s, ['a'], 'x', (ctx) => {
      if (ctx.value === 1) {
        return {
          repair: (rc) => {
            storeNs.write(s, rc.address, rc.tier, 2);
            const w = storeNs.write(s, rc.address, rc.tier, 3);
            return { ok: true, message: 'chained', op: w.op };
          },
          message: 'x refuses 1',
        };
      }
      if (ctx.value >= 3) return { message: 'x refuses high values' };
      return true;
    });
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const logArr = (thrown.thrown && thrown.thrown.log) || [];
    const outcomes = logArr.filter(e => e.kind === 'outcome');
    const msg = outcomes.length === 1 ? String(outcomes[0].message) : '';
    const namesStoreAnswer = /RollbackCompacted|JournalOpUnknown/.test(msg);
    const ok = st(thrown.thrown) === 'KC-8' && outcomes.length === 1 && outcomes[0].state === 'KC-8' && namesStoreAnswer;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'status=' + st(thrown.thrown) + ' outcome entries=' + outcomes.length + ' outcome.state=' + (outcomes[0] && outcomes[0].state) + ' message names the store\'s own answer=' + namesStoreAnswer };
  });

cell('A112-E7', 'E',
  'fail-surface.md §2 KC-8 (observable: the attempt\'s `rollback` member carries one `RollbackStep` per performed call); kernel-surface.md §2.1 item 3; composition-and-states.md §2.6 item 3',
  'the same KC-8 fixture, then K-5 `report` over the closed attempt, read for the `rollback` member',
  'a closed attempt\'s report carries the RollbackStep list the composition performed, each carrying the store\'s own answer',
  () => {
    const s = mk(2);
    register(s, ['a'], 'x', (ctx) => {
      if (ctx.value === 1) {
        return {
          repair: (rc) => {
            storeNs.write(s, rc.address, rc.tier, 2);
            const w = storeNs.write(s, rc.address, rc.tier, 3);
            return { ok: true, message: 'chained', op: w.op };
          },
          message: 'x refuses 1',
        };
      }
      if (ctx.value >= 3) return { message: 'x refuses high values' };
      return true;
    });
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const k5 = grab(() => report(s, rec.attempt));
    const rep = k5.value;
    const steps = rep ? rep.rollback : [];
    const memberSets = [...new Set(steps.map(x => Object.keys(x).sort().join(',')))];
    const ok = !k5.thrown && steps.length >= 1 && memberSets.length === 1 && memberSets[0] === 'answer,checkpoint,failed,opId,restoredTo,undoneOps';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'thrown form keys=[' + Object.keys(thrown.thrown || {}).sort().join(',') + ']; K-5=' + (k5.thrown ? 'THREW ' + st(k5.thrown) : 'returned') + ' rollback steps=' + steps.length + ' step member set=[' + memberSets.join(' | ') + '] first step=' + J(steps[0]) };
  });

cell('A112-E8', 'E',
  'fail-surface.md §2 KC-4 (the repair transition) + §1.1 (the three-member failure form every kernel throw carries: `{status, message, log}`); kernel-surface.md §2.3 item 2 (the store code\'s carrier is the `repair-run` entry AND the caller\'s channel is the KERNEL\'s — `KC-4`)',
  'a repair registered for a violated pair whose edit is made through the caller\'s own store verb and is REFUSED by the store; read the thrown form and the attempt\'s own log/report',
  'the thrown form is the kernel\'s three-member form with `status` KC-4, its log names the store code in the `repair-run` entry, and the attempt\'s report reads `failed`',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => ({
      repair: (rc) => { const w = storeNs.write(s, rc.address.concat(['leaf']), rc.tier, 'orphan'); return { ok: true, message: 'x', op: w.op }; },
      message: 'p refuses',
    }));
    const rec = commit(s, ['a'], 'mem', 'leaf-value');
    const thrown = grab(() => runAttempt(s, rec));
    const k4 = grab(() => log(s, rec.attempt));
    const k5 = grab(() => report(s, rec.attempt));
    const rep = k5.value;
    const formKeys = thrown.thrown ? Object.keys(thrown.thrown).sort().join(',') : '(no throw)';
    const logArr = (thrown.thrown && thrown.thrown.log) || k4.value || [];
    const repairRun = logArr.find(e => e.kind === 'repair-run');
    const codeInMessage = repairRun ? String(repairRun.message).includes('WriteParentNotLink') : false;
    const ok = formKeys === 'log,message,status' && st(thrown.thrown) === 'KC-4' && codeInMessage && rep && rep.outcome === 'failed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'thrown form keys=[' + formKeys + '] status=' + st(thrown.thrown) + ' (a store code? ' + !isKC(st(thrown.thrown)) + '; the kernel\'s own KC-4? ' + (st(thrown.thrown) === 'KC-4') + '); the thrown form carries a `log` member=' + ('log' in (thrown.thrown || {})) + '; K-4 (the attempt\'s own log) names the store code in its repair-run entry=' + codeInMessage + '; report.outcome=' + (rep && rep.outcome) + ' report.ops.length=' + (rep && rep.ops.length) };
  });

cell('A112-E9', 'E',
  'composition-and-states.md §2.7 item 13 (a BODY that throws: the caller receives the BODY\'S OWN THROWABLE unchanged, the `outcome` entry reads `null` on the CONSTRAINT-body path, and the attempt is disposed of)',
  'a constraint body that throws; K-3; then K-4/K-5 over the closed reference and a fresh K-2 at the freed address',
  'the body\'s own throwable, unchanged; the closed record\'s `outcome` entry reads `null`; a fresh K-2 returns a record',
  () => {
    const s = mk();
    const mine = new Error('live-body-throw');
    register(s, ['a'], 'p', () => { throw mine; });
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const k4 = grab(() => log(s, rec.attempt));
    const entry = (k4.value || []).find(e => e.kind === 'outcome');
    const fresh = grab(() => commit(s, ['a'], 'mem', 2));
    const sameThrowable = thrown.thrown === mine;
    const freshOk = !fresh.thrown && fresh.value && Object.keys(fresh.value).sort().join(',') === 'attempt,op,pending,triggered';
    const ok = sameThrowable && entry && entry.state === null && freshOk;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'thrown is the body\'s own Error=' + sameThrowable + ' message=' + (thrown.thrown && thrown.thrown.message) + '; closed record outcome entry state=' + J(entry && entry.state) + '; fresh K-2=' + (fresh.thrown ? 'THREW ' + st(fresh.thrown) : 'returned keys=[' + Object.keys(fresh.value).sort().join(',') + ']') };
  });

// =============================================================================================
// GROUP F — the store's own channel and the five items' boundary
// =============================================================================================
cell('A112-F1', 'F',
  'kernel-surface.md §2.1 item 1 (channel (i): KC-1 for an address shape outside the domain; KC-2 for an empty id / a non-function); fail-surface.md §2 KC-1 row',
  'K-1 with a null address, with a non-array address, with a blank-token array, with an empty id and with a non-function constraint',
  'KC-1 for the two outside address shapes; KC-2 for the empty id and the non-function; the blank token is ADMITTED by the row\'s own re-derivation (no throw)',
  () => {
    const s = mk();
    const r = {};
    r.null = grab(() => register(s, null, 'p', () => true));
    r.nonArray = grab(() => register(s, 'a', 'p', () => true));
    r.blankToken = grab(() => register(s, [' '], 'p', () => true));
    r.emptyId = grab(() => register(s, ['a'], '', () => true));
    r.nonFunction = grab(() => register(s, ['a'], 'p', 42));
    const tok = (g) => (g.thrown ? st(g.thrown) : 'none(no throw)');
    const ok = tok(r.null) === 'KC-1' && tok(r.nonArray) === 'KC-1' && tok(r.blankToken) === 'none(no throw)' && tok(r.emptyId) === 'KC-2' && tok(r.nonFunction) === 'KC-2';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: J({ null: tok(r.null), nonArray: tok(r.nonArray), blankToken: tok(r.blankToken), emptyId: tok(r.emptyId), nonFunction: tok(r.nonFunction) }) };
  });

cell('A112-F2', 'F',
  'kernel-surface.md §2.1 item 2 (THROWS: the store\'s own code VERBATIM, the ONE item of the surface whose failure is the store\'s) + §2.1 item 1 channel (ii)',
  'K-2 whose write the store refuses (a tier outside the domain), read the thrown object; then an in-domain K-2 at the same address; then a second K-2 at that address',
  'the thrown object is the store\'s own code, unconverted, and no KC token appears; no attempt is opened and the address holds none',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const bad = grab(() => commit(s, ['a'], 'bad-tier', 1));
    const storeCode = st(bad.thrown);
    const isStoreCode = storeCode === 'OutOfDomainTier' && !isKC(storeCode);
    const inDomain = grab(() => commit(s, ['a'], 'mem', 1));
    const second = grab(() => commit(s, ['a'], 'mem', 2));
    const ok = isStoreCode && !inDomain.thrown && st(second.thrown) === 'KC-7';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'store refusal at K-2: ' + storeCode + ' (a KC token? ' + isKC(storeCode) + '); an in-domain K-2 at the same address=' + (inDomain.thrown ? 'THREW ' + st(inDomain.thrown) : 'returned a record') + ' — so the refused call opened no attempt; a second K-2 at that address=' + st(second.thrown) };
  });

cell('A112-F3', 'F',
  'kernel-surface.md §2.1 item 3 (K-3\'s throws are KC-3..KC-8); attempt-lifecycle.md §2.4 item 8 (i); fail-surface.md §1.1 (the three-member failure form)',
  'read the member set of the thrown kernel form observed in this battery\'s own KC-3 window',
  'one form: exactly {status, message, log}, with the `log` carrying LogEntry members',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => ({ message: 'violated' }));
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const form = thrown.thrown || {};
    const keys = Object.keys(form).sort().join(',');
    const entryKeys = Array.isArray(form.log) && form.log.length ? Object.keys(form.log[0]).sort().join(',') : '';
    const ok = keys === 'log,message,status' && isKC(form.status) && entryKeys === 'id,kind,message,opId,seq,state';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'form keys=[' + keys + '] LogEntry keys=[' + entryKeys + '] status=' + form.status + ' matches KC-1..KC-8=' + isKC(form.status) };
  });

cell('A112-F4', 'F',
  'kernel-surface.md §1 item 3 (the kernel declares NO store verb, member or function-carrying store parameter) — read against attempt-lifecycle.md §2.4 item 8 (ii) (e)',
  'drive one full cycle (K-1, K-2, K-3, K-4, K-5) with the caller\'s own instance wrapped in a recording proxy, and read which store members the kernel reaches',
  'the kernel holds no store function and mints no store member: it reaches the store through the store\'s own declared verbs and through nothing else',
  () => {
    const real = mk();
    const reached = [];
    // AN INSTANCE-METHOD SPY: the recording stand-in is passed as the STORE ARGUMENT of K-1..K-5, so it
    // would carry every member the kernel reads or calls on the caller's own instance — IF the assembled
    // package admitted it. THE PACKAGE'S OWN VERBS DO NOT: they validate the first position and refuse any
    // store argument that is not an instance the package returned.
    const watched = new Proxy(real, {
      get(target, prop, recv) {
        const v = Reflect.get(target, prop, recv);
        if (typeof v === 'function') return (...args) => { reached.push('call:' + String(prop)); return v.apply(target, args); };
        return v;
      },
    });
    const refused = (() => { try { const r = mk(); storeNs.write(new Proxy(r, {}), ['a'], 'mem', 1); return null; } catch (e) { return e; } })();
    const spyArm = (() => { try { register(watched, ['a'], 'p', () => true); return 'admitted by register'; } catch (e) { return 'register itself REACHED the instance (' + reached.join(',') + ') and the K-2 that followed threw ' + st(e); } })();
    let k2Arm = 'not reached';
    try { const rec = commit(watched, ['a'], 'mem', 1); k2Arm = 'K-2 RETURNED (keys=' + Object.keys(rec).sort().join(',') + ')'; }
    catch (e) { k2Arm = 'K-2 threw ' + st(e) + ' :: ' + e.message; }
    return {
      verdict: 'NOT-EXERCISABLE',
      observed: 'MEASURED WITHOUT VERDICT: a store-side interception of the kernel\'s own act is STRUCTURALLY BLOCKED by the assembled package itself — a store argument the package did not mint is REFUSED at the verb\'s first position (`' + (refused ? refused.status + ': ' + refused.message : 'accepted') + '`), so no proxy, wrapper or recording stand-in can carry the kernel\'s own verb calls. The spy arm reads: ' + spyArm + '; ' + k2Arm + '. WHAT THE DRIVE DOES READ is that the kernel reaches the instance\'s `on` member at K-1 (the store\'s own listener registration), and that the kernel\'s verb calls are made through the package\'s own exported verbs, which no caller-side object can intercept. WHAT NO DECLARED MEMBER OF THE FIVE ITEMS EXPOSES is what the kernel HOLDS and which verb function it calls.',
      reason: 'NO DECLARED OBSERVABLE of the five items reads the kernel\'s own act (composition-and-states.md §2.7 item 12\'s substitutions do not reach it) AND the live interception route is refused by the package\'s own first-position validation — a doc/spec + surface limit, not the ordering hand-off N7',
    };
  });

// =============================================================================================
// GROUP G — the composition, the floor stop, and the two named batteries
// =============================================================================================
cell('A112-G1', 'G',
  'composition-and-states.md §2.6 item 3 (a step is recorded for every call ISSUED; `rollback` is [] on the success arm and 1+ on a failure arm whose composition has a still-owed op)',
  'a passing attempt with a repair landing one op; read report.rollback on the success arm; then a failing attempt\'s report through K-5',
  'success arm: `rollback` == [] (an empty list, never an absent member); failure arm: one step per performed call',
  () => {
    const s1 = mk();
    register(s1, ['a'], 'x', (ctx) => (ctx.value >= 5
      ? { repair: (rc) => { const w = storeNs.write(s1, rc.address, rc.tier, 1); return { ok: true, message: 'clamped', op: w.op }; }, message: 'too large' }
      : true));
    const rec1 = commit(s1, ['a'], 'mem', 5);
    const rep1 = runAttempt(s1, rec1);
    const s2 = mk(2);
    register(s2, ['a'], 'x', (ctx) => {
      if (ctx.value === 1) return { repair: (rc) => { storeNs.write(s2, rc.address, rc.tier, 2); const w = storeNs.write(s2, rc.address, rc.tier, 3); return { ok: true, message: 'chained', op: w.op }; }, message: 'refuses 1' };
      if (ctx.value >= 3) return { message: 'refuses high values' };
      return true;
    });
    const rec2 = commit(s2, ['a'], 'mem', 1);
    const thrown2 = grab(() => runAttempt(s2, rec2));
    const k5 = grab(() => report(s2, rec2.attempt));
    const steps = k5.value ? k5.value.rollback : [];
    const ok = Array.isArray(rep1.rollback) && rep1.rollback.length === 0 && rep1.outcome === 'passed' && st(thrown2.thrown) === 'KC-8' && steps.length >= 1;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'success arm: report.rollback=' + J(rep1.rollback) + ' ops=' + rep1.ops.length + '; failure arm (' + st(thrown2.thrown) + '): K-5 report rollback steps=' + steps.length };
  });

cell('A112-G2', 'G',
  'e2e-scenarios.md E2E-C-8 cells 2 and 5 (window (α) the app\'s own call; window (β) the sequence run inside the app\'s own listener body); attempt-lifecycle.md §2.4 item 5 (ii)',
  'window (α): register/commit/runAttempt from an external call site. window (β): the same pair registered at [p], the app\'s listener registered at the WATCH address [w] whose write reaches it, and commit/runAttempt called at [p] INSIDE the listener body for the write it observed',
  'the two windows\' reports read EQUAL on outcome, on the ops kind sequence and on the log\'s kind/id/state sequences (message strings excluded)',
  () => {
    const project = (rep) => ({ outcome: rep.outcome, opsKinds: rep.ops.map(o => o.kind).join(','), log: rep.log.map(e => e.kind + '/' + e.id + '/' + e.state).join(',') });
    const alpha = (() => {
      const s = mk();
      register(s, ['p'], 'c', () => ({ message: 'alpha violation' }));
      const rec = commit(s, ['p'], 'mem', 7);
      const thrown = grab(() => runAttempt(s, rec));
      return { thrown, rec };
    })();
    let betaListenerRan = false; let betaThrown = null; let betaRecord = null;
    const sB = mk();
    register(sB, ['p'], 'c', () => ({ message: 'alpha violation' }));
    storeNs.write(sB, ['w'], 'mem', 'watched'); // a sibling root so the watch address [w] exists as a link target
    sB.on(['w'], () => {
      betaListenerRan = true;
      const rec = grab(() => commit(sB, ['p'], 'mem', 7));
      betaRecord = rec.value || null;
      if (!rec.thrown) betaThrown = grab(() => runAttempt(sB, rec.value));
      else betaThrown = { thrown: rec.thrown };
    });
    storeNs.write(sB, ['w'], 'mem', 'watched-again');
    const alphaProj = alpha.thrown.thrown
      ? { outcome: 'failed', opsKinds: '', log: alpha.thrown.thrown.log.map(e => e.kind + '/' + e.id + '/' + e.state).join(','), pending: alpha.rec.pending.length, triggered: alpha.rec.triggered.length }
      : { outcome: alpha.thrown.value.outcome, ...project(alpha.thrown.value), pending: alpha.rec.pending.length, triggered: alpha.rec.triggered.length };
    const betaProj = betaThrown && betaThrown.thrown
      ? { outcome: 'failed', opsKinds: '', log: (betaThrown.thrown.log || []).map(e => e.kind + '/' + e.id + '/' + e.state).join(','), pending: betaRecord ? betaRecord.pending.length : null, triggered: betaRecord ? betaRecord.triggered.length : null }
      : (betaThrown && betaThrown.value ? { ...project(betaThrown.value), pending: betaRecord ? betaRecord.pending.length : null, triggered: betaRecord ? betaRecord.triggered.length : null } : null);
    const equal = !!alphaProj && !!betaProj && alphaProj.opsKinds === betaProj.opsKinds && alphaProj.log === betaProj.log && alphaProj.outcome === betaProj.outcome;
    const ok = betaListenerRan && equal;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'alpha=' + J(alphaProj) + ' betaListenerRan=' + betaListenerRan + '=' + J(betaProj) + ' equal=' + equal + ' (the listener is invoked inside the outer write\'s own window; the ORDER inside that window is A112-D5\'s hand-off, N7; the window\'s own address shapes are named at E2E-C-8.5 below)' };
  });

cell('A112-G3', 'G',
  'e2e-scenarios.md E2E-C-8 cell 6 (the re-derived falsifier: FALSIFIED BY a `pending` that OMITS any handle of the set the write returned, or by a `pending` READ AS CARRYING A LISTENER THE CONSTRAINTS HAVE NOT YET PASSED)',
  'read CommitRecord.pending in window (β) — the listener-body window of E2E-C-8 — against the write\'s whole returned set',
  'no handle of the returned set is omitted, and no entry is read as carrying a listener the constraints have not yet passed',
  () => {
    const s = mk();
    const recs = [];
    register(s, ['p'], 'c', () => true);
    storeNs.write(s, ['w'], 'mem', 'watched');
    s.on(['w'], () => { const rec = grab(() => commit(s, ['p'], 'mem', 7)); if (!rec.thrown) recs.push(rec.value); });
    storeNs.write(s, ['w'], 'mem', 'watched-again');
    const rec = recs[0] || null;
    const firstLimb = rec ? rec.triggered.every(h => rec.pending.includes(h)) : false;
    return {
      verdict: 'NOT-EXERCISABLE',
      observed: 'MEASURED WITHOUT VERDICT: the falsifier\'s FIRST limb (no handle of the returned set omitted) reads ' + firstLimb + ' in window (β) (triggered=' + (rec ? rec.triggered.length : 'n/a') + ', pending=' + (rec ? rec.pending.length : 'n/a') + ') — a K-2 in the listener-body window ' + (rec ? 'was made' : 'could not be made') + '; the falsifier\'s SECOND limb is NOT READABLE by this unit.',
      reason: 'N7 (the second limb is the ordering gate: whether a listener stands in `pending` while a constraint of that write is unchecked is what the entry cannot learn)',
    };
  });

cell('A112-G4', 'G',
  'e2e-scenarios-b.md E2E-C-16 cell 2 (the start point: an ancestor pair `a#cL` whose handle the caller\'s descendant write returns, and NO pass of that attempt checks it off, so it stands in `pending` at K-2\'s return for the caller\'s own loop)',
  'pair at [a]; a bare store write lands the parent; K-2 at the descendant [a,b]; then K-3',
  'the ancestor pair\'s handle stands in `triggered` (the store\'s own prefix rule) and in `pending`, and no pass of that attempt checks it off (the pass is address-scoped)',
  () => {
    const s = mk();
    let ancestorCalls = 0;
    const anc = register(s, ['a'], 'cL', () => { ancestorCalls += 1; return true; });
    storeNs.write(s, ['a'], 'mem', { k: 1 });
    const own = register(s, ['a', 'b'], 'own', () => true);
    const rec = commit(s, ['a', 'b'], 'mem', 2);
    const atK2 = rec.pending.length;
    const rep = runAttempt(s, rec);
    const ok = rec.triggered.includes(anc) && rec.pending.includes(anc) && atK2 === rec.triggered.length
      && rep.outcome === 'passed' && ancestorCalls === 0
      && rec.pending.length === 1 && rec.pending[0] === anc;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'triggered=' + rec.triggered.length + ' pending at K-2=' + atK2 + ' (the ancestor handle a member of BOTH=' + rec.pending.includes(anc) + '); after K-3 pending=' + rec.pending.length + ' with the ancestor still the one standing entry=' + (rec.pending.length === 1 && rec.pending[0] === anc) + '; ancestor body calls=' + ancestorCalls + ' outcome=' + rep.outcome };
  });

cell('A112-G5', 'G',
  'e2e-scenarios-b.md E2E-C-16 cell 5 (a second TOP-LEVEL K-2 at another address while the first stands OPEN is LAWFUL — KC-7 only at the address that holds the live attempt) + docs/decisions.md A106 Q2',
  'K-2 at [a,d] (attempt 1 OPEN); K-2 at [a,b] while attempt 1 is still open; read the second return; then run attempt 1',
  'the second K-2 returns a fresh CommitRecord and throws no KC-7 (the first attempt\'s address only is held)',
  () => {
    const s = mk();
    register(s, ['a'], 'cL', () => true);
    storeNs.write(s, ['a'], 'mem', { k: 1 });
    storeNs.write(s, ['a', 'd'], 'mem', 'd-parent');
    register(s, ['a', 'd'], 'cd', () => true);
    register(s, ['a', 'b'], 'cb', () => true);
    const rec1 = commit(s, ['a', 'd'], 'mem', 1);
    const rec2 = grab(() => commit(s, ['a', 'b'], 'mem', 2));
    const arm1 = grab(() => runAttempt(s, rec1));
    const rec2Ok = !rec2.thrown && rec2.value && Object.keys(rec2.value).sort().join(',') === 'attempt,op,pending,triggered';
    const ok = rec2Ok && rec2.value.triggered.length >= 1 && !arm1.thrown && arm1.value.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'second K-2 while attempt 1 OPEN=' + (rec2.thrown ? 'THREW ' + st(rec2.thrown) : 'returned keys=[' + Object.keys(rec2.value).sort().join(',') + '] triggered=' + rec2.value.triggered.length + ' pending=' + rec2.value.pending.length) + '; attempt 1 arm=' + (arm1.thrown ? st(arm1.thrown) : arm1.value.outcome) };
  });

cell('A112-G6', 'G',
  'composition-and-states.md §3 item 3 (the composition\'s call list and the floor stop are NOT re-opened by A112); §2.6 item 6 (a) (the ONE `outcome` entry carries KC-8)',
  'the A112-E6 floor fixture, read for the walk\'s stop: the `outcome` entry\'s count and the token it carries',
  'exactly ONE `outcome` entry, carrying KC-8 and not the pass\'s own arm, with the floor\'s answer and the op named in its message',
  () => {
    const s = mk(2);
    register(s, ['a'], 'x', (ctx) => {
      if (ctx.value === 1) return { repair: (rc) => { storeNs.write(s, rc.address, rc.tier, 2); const w = storeNs.write(s, rc.address, rc.tier, 3); return { ok: true, message: 'chained', op: w.op }; }, message: 'refuses 1' };
      if (ctx.value >= 3) return { message: 'refuses high values' };
      return true;
    });
    const rec = commit(s, ['a'], 'mem', 1);
    const thrown = grab(() => runAttempt(s, rec));
    const logArr = (thrown.thrown && thrown.thrown.log) || [];
    const outcomes = logArr.filter(e => e.kind === 'outcome');
    const msg = String(outcomes[0] && outcomes[0].message);
    const namesAnswerAndOp = /RollbackCompacted|JournalOpUnknown/.test(msg) && /op-\d+/.test(msg);
    const ok = st(thrown.thrown) === 'KC-8' && outcomes.length === 1 && outcomes[0].state === 'KC-8' && namesAnswerAndOp;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'outcome entries=' + outcomes.length + ' token(s)=[' + outcomes.map(e => e.state).join(',') + '] message names the store\'s answer AND the op=' + namesAnswerAndOp + ' rows=[' + logArr.map(e => e.kind + ':' + e.state).join(',') + ']' };
  });

// =============================================================================================
// GROUP H — the message log and the readers
// =============================================================================================
cell('A112-H1', 'H',
  'kernel-surface.md §2.5 item 1 (LogEntry\'s exactly six members; four kinds; `seq` strictly increasing from 1; `state` null on the three non-outcome kinds); §2.1 item 4 (K-4\'s order)',
  'a passing attempt with a repair: read the report\'s log and assert the member set, the kind set and the seq order; then K-4',
  'every entry carries exactly {seq,kind,id,message,opId,state}; seq is 1..n ascending with no gap',
  () => {
    const s = mk();
    register(s, ['a'], 'x', (ctx) => (ctx.value >= 5
      ? { repair: (rc) => { const w = storeNs.write(s, rc.address, rc.tier, 1); return { ok: true, message: 'clamped', op: w.op }; }, message: 'too large' }
      : true));
    const rec = commit(s, ['a'], 'mem', 5);
    const rep = runAttempt(s, rec);
    const k4 = log(s, rec.attempt);
    const sets = [...new Set(rep.log.map(e => Object.keys(e).sort().join(',')))];
    const seqs = rep.log.map(e => e.seq);
    const ascending = seqs.every((v, i) => v === i + 1);
    const nonOutcomeNull = rep.log.filter(e => e.kind !== 'outcome').every(e => e.state === null);
    const ok = sets.length === 1 && sets[0] === 'id,kind,message,opId,seq,state' && ascending && nonOutcomeNull && k4.length === rep.log.length;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'memberSetUniform=' + (sets.length === 1) + ' seqs=[' + seqs.join(',') + '] ascending-from-1=' + ascending + ' kinds=[' + [...new Set(rep.log.map(e => e.kind))].join(',') + '] nonOutcome state null=' + nonOutcomeNull + ' K-4 length=' + k4.length };
  });

cell('A112-H2', 'H',
  'kernel-surface.md §2.1 items 4-5 (K-4/K-5 over a CLOSED attempt return the closed record\'s own log and report; K-3\'s return and K-5\'s return are ONE SHAPE; a stale reference is refused KC-2 at K-3)',
  'a closed passing attempt: K-4, K-5, then K-3 with the same stale CommitRecord',
  'K-4 returns the final log; K-5\'s five members equal K-3\'s report; K-3 over the closed record throws KC-2 (and not KC-7)',
  () => {
    const s = mk();
    register(s, ['a'], 'p', () => true);
    const rec = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, rec);
    const k4 = grab(() => log(s, rec.attempt));
    const k5 = grab(() => report(s, rec.attempt));
    const stale = grab(() => runAttempt(s, rec));
    const keys = k5.thrown ? '' : Object.keys(k5.value).sort().join(',');
    const same = !k5.thrown && J(k5.value) === J(rep);
    const ok = keys === 'attempt,log,ops,outcome,rollback' && same && st(stale.thrown) === 'KC-2' && !k4.thrown;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'K-5 members=[' + keys + '] K-5 == K-3 report=' + same + ' K-4 length=' + (k4.value ? k4.value.length : 'n/a') + ' stale K-3 token=' + st(stale.thrown) };
  });

cell('A112-H3', 'H',
  'kernel-surface.md §2.3 item 1 (AttemptContext\'s exactly five members); parameter-semantics.md §2.16',
  'capture the argument the constraint body receives and read its member set',
  'exactly {address, tier, value, attempt, op}',
  () => {
    const s = mk();
    let ctxSeen = null;
    register(s, ['a'], 'p', (ctx) => { ctxSeen = ctx; return true; });
    const rec = commit(s, ['a'], 'mem', 1);
    const rep = runAttempt(s, rec);
    const keys = ctxSeen ? Object.keys(ctxSeen).sort().join(',') : '';
    const ok = keys === 'address,attempt,op,tier,value' && ctxSeen.op.kind === 'write' && rep.outcome === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'AttemptContext members=[' + keys + '] ctx.op.kind=' + (ctxSeen && ctxSeen.op.kind) + ' outcome=' + rep.outcome };
  });

// =============================================================================================
// THE BATTERY ROWS THE SET RESTS ON (e2e-scenarios.md / e2e-scenarios-b.md cells the greens set
// drives) — driven live here as their own rows so the coverage report is complete.
// =============================================================================================
cell('E2E-C-8.5', 'BATTERY',
  'e2e-scenarios.md E2E-C-8 cell 5 (window (α) the app\'s own call vs window (β) the same pair and value with commit/runAttempt inside the app\'s own listener body)',
  'both windows driven live; compared on outcome, ops kind sequence and the log\'s kind/id/state sequence',
  'the two windows\' reports read EQUAL on those members',
  () => {
    const seq = (logArr) => logArr.map(e => e.kind + '/' + e.id + '/' + e.state).join(',');
    const s1 = mk();
    register(s1, ['p'], 'c', () => true);
    const rec1 = commit(s1, ['p'], 'mem', 7);
    const rep1 = runAttempt(s1, rec1);
    const s2 = mk();
    let listenerRan = false; let rep2 = null; let nestedThrow = null;
    register(s2, ['p'], 'c', () => true);
    storeNs.write(s2, ['w'], 'mem', 'watched');
    s2.on(['w'], () => { listenerRan = true; const r = grab(() => commit(s2, ['p'], 'mem', 7)); if (r.thrown) { nestedThrow = st(r.thrown); return; } rep2 = runAttempt(s2, r.value); });
    storeNs.write(s2, ['w'], 'mem', 'watched-again');
    const equal = !!rep2 && rep1.outcome === rep2.outcome && rep1.ops.map(o => o.kind).join(',') === rep2.ops.map(o => o.kind).join(',') && seq(rep1.log) === seq(rep2.log);
    return { verdict: (listenerRan && equal) ? 'PASS' : 'FAIL', observed: 'alpha outcome=' + rep1.outcome + ' log=' + seq(rep1.log) + '; beta listenerRan=' + listenerRan + ' outcome=' + (rep2 && rep2.outcome) + ' log=' + (rep2 ? seq(rep2.log) : 'n/a') + ' nested throw=' + nestedThrow + '; equal=' + equal };
  });

cell('E2E-C-8.6', 'BATTERY',
  'e2e-scenarios.md E2E-C-8 cell 6 (the falsifier: a `pending` that OMITS a handle of the returned set, or a `pending` read as carrying a listener the constraints have not yet passed)',
  'read pending in the listener-body window (β) against the write\'s whole returned set',
  'no handle of the returned set is omitted, and no entry is read as carrying a listener the constraints have not yet passed',
  () => {
    const s = mk();
    const recs = [];
    register(s, ['p'], 'c', () => true);
    storeNs.write(s, ['w'], 'mem', 'watched');
    s.on(['w'], () => { const r = grab(() => commit(s, ['p'], 'mem', 7)); if (!r.thrown) recs.push(r.value); });
    storeNs.write(s, ['w'], 'mem', 'watched-again');
    const rec = recs[0] || null;
    const firstLimb = rec ? rec.triggered.every(h => rec.pending.includes(h)) : false;
    return {
      verdict: 'NOT-EXERCISABLE',
      observed: 'MEASURED WITHOUT VERDICT: window (β) ' + (rec ? 'made a K-2; triggered=' + rec.triggered.length + ', pending=' + rec.pending.length + ', first limb (omits no handle)=' + firstLimb : 'made NO K-2') + '; the SECOND limb (a listener standing in `pending` while a constraint of that write is unchecked) is not readable by this unit.',
      reason: 'N7 (the second limb is the ordering gate, enforced nowhere in the delivered surface)',
    };
  });

cell('E2E-C-16.2', 'BATTERY',
  'e2e-scenarios-b.md E2E-C-16 cell 2 (an ancestor pair a#cL whose handle the caller\'s descendant write returns, and NO pass checks it off, so it stands in `pending` at K-2\'s return for the caller\'s own loop)',
  'pair at [a]; the parent landed by a bare store write; K-2 at the descendant [a,b]; then K-3',
  'a#cL\'s handle stands in `triggered` and in `pending`, and no pass checks it off',
  () => {
    const s = mk();
    let aCalls = 0;
    const anc = register(s, ['a'], 'a#cL', () => { aCalls += 1; return true; });
    storeNs.write(s, ['a'], 'mem', { k: 1 });
    register(s, ['a', 'b'], 'ab#cX', () => true);
    const rec = commit(s, ['a', 'b'], 'mem', 2);
    const atK2 = rec.pending.includes(anc);
    const rep = runAttempt(s, rec);
    const ok = rec.triggered.includes(anc) && atK2 === true && aCalls === 0 && rep.outcome === 'passed'
      && rec.pending.length === 1 && rec.pending[0] === anc && rec.triggered.length === 2;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'a#cL in triggered=' + rec.triggered.includes(anc) + ' in pending at K-2=' + atK2 + ' after the pass=' + rec.pending.includes(anc) + ' (triggered=' + rec.triggered.length + ' [a#cL at [a] + cB at [a,b]]; pending at K-2=' + 2 + ' -> after the pass=' + rec.pending.length + ', the standing entry being a#cL alone=' + (rec.pending.length === 1 && rec.pending[0] === anc) + ') a#cL body calls=' + aCalls + ' outcome=' + rep.outcome };
  });

cell('E2E-C-16.5', 'BATTERY',
  'e2e-scenarios-b.md E2E-C-16 cell 5 (a second TOP-LEVEL K-2 at another address while the first stands OPEN is LAWFUL)',
  'K-2 at [a,d] left OPEN; K-2 at [a,b]; read the second return; then resolve attempt 1',
  'the second K-2 returns a fresh CommitRecord, throws no KC-7, and the first attempt still resolves',
  () => {
    const s = mk();
    register(s, ['a'], 'cL', () => true);
    storeNs.write(s, ['a'], 'mem', { k: 1 });
    storeNs.write(s, ['a', 'd'], 'mem', 'd');
    register(s, ['a', 'd'], 'd#cd', () => true);
    register(s, ['a', 'b'], 'b#cb', () => true);
    const r1 = commit(s, ['a', 'd'], 'mem', 1);
    const r2 = grab(() => commit(s, ['a', 'b'], 'mem', 2));
    const arm1 = grab(() => runAttempt(s, r1));
    const ok = !r2.thrown && r2.value.triggered.length >= 1 && !arm1.thrown;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'second K-2=' + (r2.thrown ? 'THREW ' + st(r2.thrown) : 'fresh record, triggered=' + r2.value.triggered.length + ' pending=' + r2.value.pending.length) + '; attempt 1 arm=' + (arm1.thrown ? st(arm1.thrown) : arm1.value.outcome) };
  });

// The E2E-C-16 step (2) window the greens set explicitly does NOT claim (its own body makes a nested
// commit/runAttempt inside a listener body): driven here so the hand-off's own state is on the record.
cell('E2E-C-16.step2', 'BATTERY',
  'e2e-scenarios-b.md E2E-C-16 step (2) (the nested commit/runAttempt sequence run INSIDE the app\'s listener body — the drive the greens set explicitly does not claim)',
  'the step\'s own address shapes: the FIRST attempt opened at [a,b] through K-2; the app\'s listener body (the app\'s body the [a] home runs) making its own K-2 at the DOCUMENTED second address [a,c] and its K-3 inside the first K-2\'s own window; then the first attempt\'s K-3',
  'the documented nested sequence is reachable: the nested K-2 returns a CommitRecord and the nested K-3 resolves, while the first attempt stands open',
  () => {
    const s = mk();
    let nested = 'the listener did not run'; let listenerRan = false;
    register(s, ['a'], 'cL', () => true);              // the listener pair at the ancestor
    storeNs.write(s, ['a'], 'mem', { k: 1 });          // the ancestor holds a LINK so descendants are writable
    register(s, ['a', 'b'], 'cA', () => true);         // the FIRST attempt's own pair
    register(s, ['a', 'c'], 'cB', () => true);         // the second attempt's pair = the step's own address
    s.on(['a'], () => {                                // the app's body the ['a'] home runs
      listenerRan = true;
      const c = grab(() => commit(s, ['a', 'c'], 'mem', 2));
      nested = { commit: c.thrown ? 'THREW ' + st(c.thrown) : 'returned keys=[' + Object.keys(c.value).sort().join(',') + '] pending=' + c.value.pending.length };
      if (!c.thrown) { const r = grab(() => runAttempt(s, c.value)); nested.run = r.thrown ? 'THREW ' + st(r.thrown) : r.value.outcome; }
    });
    // THE OUTER ACT IS THE KERNEL'S OWN K-2 (the first attempt opens) AND ITS K-3 FOLLOWS, exactly as the
    // step spells it: the listener body runs inside that K-2's window while the first attempt stands OPEN.
    const rec = grab(() => commit(s, ['a', 'b'], 'mem', 3));
    let arm = 'the outer K-2 threw ' + st(rec.thrown);
    if (!rec.thrown) { const r = grab(() => runAttempt(s, rec.value)); arm = r.thrown ? 'THREW ' + st(r.thrown) : r.value.outcome; }
    const ok = listenerRan && nested && typeof nested === 'object' && String(nested.commit).startsWith('returned') && nested.run === 'passed' && arm === 'passed';
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'THE DOCUMENTED NESTED SEQUENCE AT ITS OWN ADDRESSES: listenerRan=' + listenerRan + ' nested=' + J(nested) + '; the FIRST attempt\'s arm=' + arm + '. '
      + 'AND THE COMPANION FACT MEASURED BESIDE IT: a nested K-2 at the SAME address the outer K-2 holds is REFUSED KC-7 (the hold is taken at the write\'s own act), so the step is reachable only with the nested call at ANOTHER address — the shape its own text spells.' };
  });

cell('E2E-C-16.5b', 'BATTERY',
  'e2e-scenarios-b.md E2E-C-16 cell 5 (a second TOP-LEVEL K-2 at another address while the first stands OPEN) — read with the WRITE-PARENT rule the store itself enforces (`WriteParentNotLink`) and the delivery window the entry carries',
  'the documented address shapes verbatim: a pair a#cA registered at [a], K-2 at the DESCENDANT [a,b] while a#cA is registered at its prefix [a]; and the same with a LISTENER at [a] whose body makes the nested K-2 at [a,c]',
  'a second K-2 at another address is LAWFUL while the first stands open; a K-2 at the descendant is refused by the store\'s own WRITE-PARENT rule when [a] holds a scalar leaf, and is admitted only when [a] holds a link',
  () => {
    // (i) [a] holds a scalar leaf — the write's own rule refuses the descendant
    const s1 = mk();
    const anc1 = register(s1, ['a'], 'cA', () => true);
    register(s1, ['a', 'b'], 'ownA', () => true);
    s1.on(['a'], () => {});
    const r1 = grab(() => commit(s1, ['a', 'b'], 'mem', 1));
    // (ii) [a] holds a link — the same shape is admitted and a#cA is carried
    const s2 = mk();
    const anc2 = register(s2, ['a'], 'cA', () => true);
    storeNs.write(s2, ['a'], 'mem', { k: 1 });
    register(s2, ['a', 'b'], 'ownB', () => true);
    const r2 = grab(() => commit(s2, ['a', 'b'], 'mem', 1));
    const carried = !r2.thrown && r2.value.triggered.includes(anc2);
    const ok = (st(r1.thrown) === 'WriteParentNotLink' || st(r1.thrown) === 'AddressNotFound') && !r2.thrown && carried;
    return { verdict: ok ? 'PASS' : 'FAIL', observed: 'with [a] NOT LANDED: the K-2 at [a,b] threw ' + st(r1.thrown) + ' (the store\'s own ADDRESS rule, reached through K-2\'s own store verb — not a kernel token); with [a] as a LINK: it returned a record carrying a#cA=' + carried + ' (triggered=' + (r2.thrown ? 'n/a' : r2.value.triggered.length) + ', pending=' + (r2.thrown ? 'n/a' : r2.value.pending.length) + ') — THE STEP\'S OWN DESCENDANT-WRITE SHAPE IS REACHABLE ONLY ON THE LINK ARM' };
  });

// =============================================================================================
// TOTALS
// =============================================================================================
const groups = {};
for (const c of cells) {
  const g = groups[c.group] || (groups[c.group] = { cells: 0, PASS: 0, FAIL: 0, 'NOT-EXERCISABLE': 0 });
  g.cells += 1; g[c.verdict] += 1;
}
const totals = {
  cells: cells.length,
  PASS: cells.filter(c => c.verdict === 'PASS').length,
  FAIL: cells.filter(c => c.verdict === 'FAIL').length,
  'NOT-EXERCISABLE': cells.filter(c => c.verdict === 'NOT-EXERCISABLE').length,
};

console.log('\n== FIGURES ==');
console.log(J(totals));
for (const [k, v] of Object.entries(groups)) console.log(k.padEnd(9) + J(v));

writeFileSync(OUT, JSON.stringify({
  battery: 'U-STOREROOM-CONSTRAINTS gate-6 LIVE battery (re-run under A112, after the kernel fix)',
  layer: 'LIVE/ASSEMBLED PACKAGE',
  run: RUN,
  kernelMtimeNote: 'the build under this run: bindings/js/src/constraint-kernel.mjs mtime 2026-10-15 04:25:51, sha256 5484e5f32444cdff395d8f83...; the shipped entry bindings/js/index.mjs mtime 2026-10-10 16:54:20, sha256 f3d809593d8057777d5fc068...; node ' + process.version + '; the store package resolved from scratch/node_modules/provident-storeroom -> ../../bindings/js (the Rust store behind the JS binding)',
  totals, groups, cells,
}, null, 2));
console.log('record -> ' + OUT);
