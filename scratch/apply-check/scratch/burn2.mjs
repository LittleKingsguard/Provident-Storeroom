import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const p = (k, v) => console.log(String(k).padEnd(56), typeof v === 'string' ? v : JSON.stringify(v));

// failing attempt with a repair that landed, then a second violation -> rollback of the attempt's ops
for (const jl of [2, 4, 8, 16]) {
  const s = store.storeCreate({ journalLength: jl, listeners: [] });
  let n = 0;
  register(s, ['f'], 'c', () => { n += 1; if (n === 1) return { repair: (rc) => { const w = store.write(s, ['f'], 'mem', 500); return { ok: true, message: 'fixed', op: w.op }; }, message: 'bad-1' };  if (n === 2) return { message: 'still-bad' }; return true; });
  const cm = commit(s, ['f'], 'mem', 1);
  let th = null, rep = null;
  try { rep = runAttempt(s, cm); } catch (e) { th = e; }
  p('jl=' + jl + ' token', th ? th.status : rep.outcome);
  if (th) p('jl=' + jl + ' has rollback member', String('rollback' in th));
  p('jl=' + jl + ' log', th && th.log ? th.log.map(e => e.kind + ':' + String(e.state)).join(',') : '-');
}

// KC-8 hunt: many ops in one attempt then failure, small journal
for (const jl of [2, 4, 8]) {
  const s = store.storeCreate({ journalLength: jl, listeners: [] });
  let n = 0;
  register(s, ['g'], 'c', () => { n += 1; if (n === 1) return { repair: (rc) => {
      let last = null;
      for (let i = 0; i < 4; i++) { const w = store.write(s, ['g' + i], 'mem', i); last = w.op; }
      // second pair that keeps failing so the attempt fails after the repair
      return { ok: true, message: 'fixed', op: last }; }, message: 'bad-1' }; if (n === 2) return { message: 'still-bad' }; return true; });
  const cm = commit(s, ['g'], 'mem', 1);
  let th = null, rep = null;
  try { rep = runAttempt(s, cm); } catch (e) { th = e; }
  p('jl=' + jl + ' chain token', th ? th.status : rep.outcome);
  p('jl=' + jl + ' log', th && th.log ? th.log.map(e => e.kind + ':' + String(e.state)).join(',') : '-');
}
