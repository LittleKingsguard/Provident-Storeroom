import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const mk = (jl) => store.storeCreate({ journalLength: jl, listeners: [] });
const st = e => e && (e.status || e.message);

// mimic the battery's earlier cells: a failing attempt at ['a'] then a fresh pair at ['a']
{ const s = mk(64); let c = 0;
  register(s, ['a'], 'p', () => { c += 1; return { message: 'violation' }; });
  const cm = commit(s, ['a'], 'mem', 1);
  try { runAttempt(s, cm); } catch (e) { console.log('failing arm:', st(e)); }
  console.log('after failed attempt: pending=', cm.pending.length);
  // now a FRESH instance with a passing pair at the same address
  const s2 = mk(64); let c2 = 0;
  register(s2, ['a'], 'p', () => { c2 += 1; return true; });
  const cm2 = commit(s2, ['a'], 'mem', 1);
  console.log('fresh instance, same address: K-2 pending=', cm2.pending.length, 'triggered=', cm2.triggered.length, 'calls=', c2);
  const r2 = runAttempt(s2, cm2);
  console.log('   after K-3 pending=', cm2.pending.length, 'outcome=', r2.outcome, 'calls=', c2);
}

// replicate A4 then a fresh instance
{ const s = mk(64);
  const h1 = register(s, ['a'], 'p', () => true);
  const h2 = register(s, ['a'], 'q', () => true);
  const h3 = store.listen(s, ['a']);
  const h4 = s.on(['a'], () => {});
  console.log('handles equal:', [h2,h3,h4].every(h => String(h) === String(h1)));
  const s2 = mk(64);
  const g = register(s2, ['a'], 'p', () => true);
  const cm = commit(s2, ['a'], 'mem', 1);
  console.log('after A4 shape: fresh K-2 pending=', cm.pending.length, 'triggered=', cm.triggered.length, 'handleEqual=', String(g) === String(h1));
}
