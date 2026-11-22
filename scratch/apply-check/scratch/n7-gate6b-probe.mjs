// N7 GATE-6 SECOND RE-RUN — PROBE B: the identity relationships and the residue accounting behind the
// limb-1 `on-at-adopted-address` / `register-at-adopted-handle` cells and (3) limb-3.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. Published name resolution (`provident-storeroom` -> scratch/node_modules
// -> bindings/js), the kernel at its declared checkout home. NOTHING IS PATCHED: only the instance's own
// `settle` member is wrapped, ON THE INSTANCE THIS FILE CREATES, for the trail alone.
//
// Run: node scratch/n7-gate6b-probe.mjs

import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const TIER = 'mem';
const out = [];
const say = (s) => { out.push(s); console.log(s); };

function freshStore(sink, top) {
  const store = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  storeNs.write(store, [top], TIER, {}); // the parent map, before any registration
  const original = store.settle;
  store.settle = function settle(record) {
    sink.settleReaches.push({ pendingLen: Array.isArray(record && record.pending) ? record.pending.length : null, record, sameAsCommitted: sink.committed === record });
    return arguments.length >= 1 ? original.call(this, record) : original.call(this);
  };
  return store;
}

// ── CASE A: the listener registered AT the pair's own address, by `on` ────────────────────────────────
{
  const sink = { settleReaches: [] };
  const store = freshStore(sink, 'a');
  const ADDR = ['a', 'pair'];
  const constraintCalls = [];
  const appCalls = [];
  const hAdopted = register(store, ADDR, 'c', () => { constraintCalls.push(1); return true; });
  const hApp = store.on(ADDR, (arg) => { appCalls.push(arg); });
  const rec = commit(store, ADDR, TIER, 1);
  sink.committed = rec;
  say(`  DEBUG at the commit's return: rec.pending.length=${rec.pending.length} triggered=${rec.triggered.length} pendingIsTriggered=${rec.pending === rec.triggered} settleReaches[0].pendingLen=${sink.settleReaches[0] && sink.settleReaches[0].pendingLen}`);
  const beforePass = { pending: rec.pending.slice(), triggered: rec.triggered.slice() };
  const report = runAttempt(store, rec);
  const afterPass = { pending: rec.pending.slice(), triggered: rec.triggered.slice() };
  say('── CASE A: `on` at the pair address ──────────────────────────────────────────────');
  say(`  identity: hAdopted === hApp = ${hAdopted === hApp}`);
  say(`  commit returned: triggered=${rec.triggered.length} pending=${rec.pending.length}`);
  say(`  the SAME identity in triggered twice? ${rec.triggered.filter((h) => h === hAdopted).length} occurrence(s) of the adopted handle in triggered`);
  say(`  BEFORE the pass: pending carries the adopted handle = ${beforePass.pending.includes(hAdopted)} (len ${beforePass.pending.length}); the FIRST settle reach's own record === the commit's returned record? ${sink.settleReaches[0] && sink.settleReaches[0].sameAsCommitted}`);
  say(`  constraint body calls after the whole arm = ${constraintCalls.length}; app body calls = ${appCalls.length} (args ${JSON.stringify(appCalls)})`);
  say(`  AFTER the pass: pending len = ${afterPass.pending.length}; outcome=${report.outcome}`);
  say(`  settle reaches (pendingLen seen) = ${JSON.stringify(sink.settleReaches)}`);
}

// ── CASE B: the listener registered AT the pair's own address, through `register(hAdopted, fn)` ───────
{
  const sink = { settleReaches: [] };
  const store = freshStore(sink, 'b');
  const ADDR = ['b', 'pair'];
  const constraintCalls = [];
  const appCalls = [];
  const hAdopted = register(store, ADDR, 'c', () => { constraintCalls.push(1); return true; });
  store.register(hAdopted, (arg) => { appCalls.push(arg); });
  const rec = commit(store, ADDR, TIER, 2);
  sink.committed = rec;
  const report = runAttempt(store, rec);
  say('── CASE B: `register(adoptedHandle, fn)` at the pair address ─────────────────────');
  say(`  constraint body calls = ${constraintCalls.length}; app body calls = ${appCalls.length}; outcome=${report.outcome}; pending after the arm = ${rec.pending.length}`);
}

// ── CASE C: the listener on the store's OWN handle for a SECOND pair at the pair address ──────────────
// Two DISTINCT home entries at one address are not reachable through `on` (the store returns ONE handle per
// address), so this case spells the duplicate the way the surface allows: the store's own `listen` verb
// twice, then one `on` — to read whether the store ever returns TWO handles for one address.
{
  const sink = { settleReaches: [] };
  const store = freshStore(sink, 'c');
  const ADDR = ['c', 'pair'];
  const appCalls = [];
  register(store, ADDR, 'c', () => true);
  const h2 = storeNs.listen(store, ADDR);
  const hApp = store.on(ADDR, (arg) => { appCalls.push(arg); });
  const rec = commit(store, ADDR, TIER, 3);
  runAttempt(store, rec);
  say('── CASE C: two `listen` calls at one address, then `on` ──────────────────────────');
  say(`  listen returned a handle distinct from hApp? ${h2 !== hApp}; triggered len=${rec.triggered.length}; occurrences of hApp in triggered=${rec.triggered.filter((h) => h === hApp).length}; app body calls=${appCalls.length}`);
}

// ── CASE D: the listener at the WATCHED PREFIX (the base limb-1 cell, for contrast) ───────────────────
{
  const sink = { settleReaches: [] };
  const store = freshStore(sink, 'd');
  const WATCH = ['d'];
  const ADDR = ['d', 'pair'];
  const appCalls = [];
  register(store, ADDR, 'c', () => true);
  const hApp = store.on(WATCH, (arg) => { appCalls.push(arg); });
  const rec = commit(store, ADDR, TIER, 4);
  const beforePass = rec.pending.length;
  runAttempt(store, rec);
  say('── CASE D: the listener at the proper PREFIX of the written address ─────────────');
  say(`  triggered len=${rec.triggered.length}; the app handle is a distinct identity from the adopted one: ${rec.triggered.includes(hApp)}; pending before the pass=${beforePass}; after=${rec.pending.length}; app body calls=${appCalls.length} (args ${JSON.stringify(appCalls)})`);
}

// ── CASE D2: THE DECISIVE CONTROL FOR QUESTION 2 — the SAME store, the SAME address, the SAME `on` call,
//    differing ONLY in the spelling of the address argument (the exact array, against the proper prefix that
//    the store's own prefix test returns the SAME home handle for). Both must be registered the same way and
//    both must be triggered by the one write.
{
  const runOne = (top, spelling) => {
    const sink = { settleReaches: [] };
    const store = freshStore(sink, top);
    const ADDR = [top, 'pair'];
    const WATCH = [top];
    const appCalls = [];
    const constraintCalls = [];
    const hAdopted = register(store, ADDR, 'c', () => { constraintCalls.push(1); return true; });
    const hApp = store.on(spelling === 'exact' ? ADDR : WATCH, (arg) => { appCalls.push(arg); });
    const rec = commit(store, ADDR, TIER, 5);
    const pendingBefore = rec.pending.length;
    const report = runAttempt(store, rec);
    return {
      spelling, sameHandleAsTheAdopted: hApp === hAdopted,
      triggered: rec.triggered.length, pendingBefore, pendingAfter: rec.pending.length,
      constraintCalls: constraintCalls.length, appCalls: appCalls.length,
      appArgs: appCalls, outcome: report.outcome,
      settleReaches: sink.settleReaches.map((s) => s.pendingLen),
    };
  };
  const exact = runOne('e1', 'exact');
  const prefix = runOne('e2', 'prefix');
  say('── CASE D2: `on` at the EXACT address vs at the PROPER PREFIX (one difference) ────');
  say(`  EXACT  spelling: hApp===hAdopted=${exact.sameHandleAsTheAdopted} triggered=${exact.triggered} pending ${exact.pendingBefore}->${exact.pendingAfter} constraintCalls=${exact.constraintCalls} appCalls=${exact.appCalls} args=${JSON.stringify(exact.appArgs)} outcome=${exact.outcome}`);
  say(`  PREFIX spelling: hApp===hAdopted=${prefix.sameHandleAsTheAdopted} triggered=${prefix.triggered} pending ${prefix.pendingBefore}->${prefix.pendingAfter} constraintCalls=${prefix.constraintCalls} appCalls=${prefix.appCalls} args=${JSON.stringify(prefix.appArgs)} outcome=${prefix.outcome}`);
}

// ── CASE E (3): the minimal reproduction of the limb-1 zero-delivery term ─────────────────────────────
say('── CASE E: MINIMAL REPRODUCTION ───────────────────────────────────────────────────');
say('  1. storeCreate({journalLength:64, listeners:[]}); write(store, ["<top>"], "mem", {})');
say('  2. register(store, ["m","leaf"], "c", () => true)          // returns the adopted handle H');
say('  3. store.on(["m","leaf"], appFn)                            // returns the SAME H (identity)');
say('  4. const rec = commit(store, ["m","leaf"], "mem", 1)        // H is the only member of rec.triggered and rec.pending');
say('  5. runAttempt(store, rec)                                   // the pass checks H off as it passes => residue EMPTY');
say('  EXPECTED by the limb: appFn invoked once at the pass\'s terminal arm. OBSERVED: 0.');

// ── CASE F: the SAME address after the kernel act, driven by a BARE caller-made write ────────────────
// The identity the app's registration holds is the address's home entry; this reads whether ANY later
// write at that address reaches the app's body once the kernel's attempt has reached its arm.
{
  const sink = { settleReaches: [] };
  const store = freshStore(sink, 'f');
  const ADDR = ['f', 'pair'];
  const appCalls = [];
  const constraintCalls = [];
  register(store, ADDR, 'c', () => { constraintCalls.push(1); return true; });
  store.on(ADDR, (arg) => { appCalls.push(arg); });
  const rec = commit(store, ADDR, TIER, 6);
  runAttempt(store, rec);
  const afterKernel = appCalls.length;
  const w = storeNs.write(store, ADDR, TIER, 7);
  say('── CASE F: the same identity under a later BARE caller-made write ─────────────────');
  say(`  after the kernel arm: app body calls=${afterKernel}; the later bare write returned triggered=${w.triggered.length} and the app body calls after it=${appCalls.length}`);
}
