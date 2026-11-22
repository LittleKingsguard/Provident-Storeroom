// Isolated reproduction of the two FAILING cells, on fresh instances (no battery neighbours).
import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const mk = () => store.storeCreate({ journalLength: 64, listeners: [] });
const st = e => e && (e.status || e.message);

// A112-D2, isolated
{
  const s = mk(); let c = 0, l = 0;
  register(s, ['a'], 'p', () => { c += 1; return true; });
  s.on(['a'], () => { l += 1; });
  const cm = commit(s, ['a'], 'mem', 1);
  console.log('D2 isolated: at K-2 return  constraintCalls=', c, ' listenerCalls=', l, ' pending=', cm.pending.length, ' triggered=', cm.triggered.length);
  const r = runAttempt(s, cm);
  console.log('D2 isolated: after K-3     constraintCalls=', c, ' listenerCalls=', l, ' pending=', cm.pending.length, ' outcome=', r.outcome);
}

// A112-B4, isolated (fresh instance)
{
  const s = mk(); let anc = 0;
  const h = register(s, ['a'], 'cL', () => { anc += 1; return true; });
  store.write(s, ['a'], 'mem', { seed: 1 });
  register(s, ['a', 'b'], 'own', () => ({ message: 'violation' }));
  const cm = commit(s, ['a', 'b'], 'mem', 5);
  console.log('B4 isolated: at K-2 return  triggered=', cm.triggered.length, ' pending=', cm.pending.length, ' ancestorCalls=', anc);
  let th = null; try { runAttempt(s, cm); } catch (e) { th = e; }
  console.log('B4 isolated: after K-3     pending=', cm.pending.length, ' ancestorStillInPending=', cm.pending.some(p => String(p) === String(h)), ' ancestorCalls=', anc, ' token=', st(th));
}

// B4 on the PASSING arm, isolated: does the never-evaluated ancestor entry survive a passing pass?
{
  const s = mk(); let anc = 0;
  const h = register(s, ['a'], 'cL', () => { anc += 1; return true; });
  store.write(s, ['a'], 'mem', { seed: 1 });
  register(s, ['a', 'b'], 'own', () => true);
  const cm = commit(s, ['a', 'b'], 'mem', 5);
  console.log('B4-pass isolated: at K-2   triggered=', cm.triggered.length, ' pending=', cm.pending.length);
  const r = runAttempt(s, cm);
  console.log('B4-pass isolated: after K-3 pending=', cm.pending.length, ' ancestorStillInPending=', cm.pending.some(p => String(p) === String(h)), ' ancestorCalls=', anc, ' outcome=', r.outcome);
}
