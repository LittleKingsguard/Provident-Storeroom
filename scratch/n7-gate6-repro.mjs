// N7 GATE 6 — MINIMAL REPRODUCTION OF THE TWO FAILING LIMBS, over the published surface alone.
// Run: node scratch/n7-gate6-repro.mjs
//
// LIMB 1/3 (a registration at the address the kernel adopted): an app body registered on the handle the
// kernel's constraint pair adopted receives ZERO invocations on a passing write — the kernel's own pass
// checks that handle off the record's `pending`, so the seam's terminal arm has no residue for it.
// LIMB 6 (i) (the caller calls `settle` itself): the caller-made adoption is consumed by the NEXT bare
// caller-made write, which then delivers NOTHING in its own window.
import * as s from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const ADDR = ['r', 'ord'];
const TIER = 'mem';

// ── 1. THE ADOPTED-ADDRESS REGISTRATION ────────────────────────────────────────────────────────────────
{
  const st = s.storeCreate({ journalLength: 64, listeners: [] });
  s.write(st, ['r'], TIER, { ord: 0 }); // the store's own rule: the parent must stand as a map link
  let constraintCalls = 0;
  const hAdopted = register(st, ADDR, 'c', () => { constraintCalls += 1; return true; }); // K-1
  let appCalls = 0;
  const hApp = st.on(ADDR, () => { appCalls += 1; }); // the app's registration at the kernel's own address
  const rec = commit(st, ADDR, TIER, 1); // K-2
  const arm = (() => { try { return runAttempt(st, rec).outcome; } catch (e) { return e.status; } })();
  console.log('1. app registered at the kernel\'s address');
  console.log('   on(ADDR, appFn) returned the kernel\'s adopted handle:', hApp === hAdopted);
  console.log('   passing write: arm =', arm, '| kernel constraint body calls =', constraintCalls,
    '| APP BODY CALLS =', appCalls, '| pending after the arm =', rec.pending.length, 'of triggered =', rec.triggered.length);
  console.log('   → the app\'s registration is registered and never invoked: 0 deliveries of 1 owed.\n');
}

// ── 2. THE SAME SEAM THROUGH store.register ON THE ADOPTED HANDLE ──────────────────────────────────────
{
  const st = s.storeCreate({ journalLength: 64, listeners: [] });
  s.write(st, ['r'], TIER, { ord: 0 });
  let constraintCalls = 0;
  const hAdopted = register(st, ADDR, 'c', () => { constraintCalls += 1; return true; });
  let appCalls = 0;
  st.register(hAdopted, () => { appCalls += 1; }); // surface.md §2.4 item 5 site
  const rec = commit(st, ADDR, TIER, 1);
  const arm = (() => { try { return runAttempt(st, rec).outcome; } catch (e) { return e.status; } })();
  console.log('2. app registered on the kernel\'s adopted handle');
  console.log('   passing write: arm =', arm, '| kernel constraint body calls =', constraintCalls,
    '| APP BODY CALLS =', appCalls, '| pending after the arm =', rec.pending.length, 'of triggered =', rec.triggered.length);
  console.log('   → 0 deliveries of 1 owed.\n');
}

// ── 3. THE CALLER'S OWN `settle` CALL ──────────────────────────────────────────────────────────────────
{
  const st = s.storeCreate({ journalLength: 64, listeners: [] });
  s.write(st, ['r'], TIER, { ord: 0 });
  let calls = 0;
  const h = st.on(ADDR, () => { calls += 1; });
  const callerRecord = { op: null, triggered: [], pending: [h] };
  let threw = null;
  try { st.settle(callerRecord); } catch (e) { threw = e.name; }
  const before = calls;
  const first = s.write(st, ADDR, TIER, 2); // the FIRST bare caller-made write after the caller's settle
  const afterFirst = calls;
  const second = s.write(st, ADDR, TIER, 3); // the next one
  console.log('3. the caller calls `settle` itself with a record no kernel wrote');
  console.log('   the call threw:', threw, '| first bare write: triggered =', first.triggered.length,
    '| APP BODY CALLS IN THAT WRITE\'S OWN WINDOW =', afterFirst - before, 'of 1 owed');
  console.log('   the second bare write: triggered =', second.triggered.length,
    '| APP BODY CALLS IN THAT WINDOW =', calls - afterFirst, 'of 1 owed');
  console.log('   → the caller-made adoption is consumed by the first bare write and withheld from it; the leak does not persist.');
}
