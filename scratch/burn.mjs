import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const p = (k, v) => console.log(String(k).padEnd(56), typeof v === 'string' ? v : JSON.stringify(v));

for (const jl of [2, 3, 4, 6, 12]) {
  const s = store.storeCreate({ journalLength: jl, listeners: [] });
  let n = 0;
  register(s, ['z'], 'b', () => { n += 1; if (n === 1) return { repair: (rc) => {
      let last = null;
      for (let i = 0; i < 5; i++) { const w = store.write(s, ['zz' + i], 'mem', i); last = w.op; }
      return { ok: true, message: 'fixed', op: last }; }, message: 'bad' }; return true; });
  const cm = commit(s, ['z'], 'mem', 0);
  let th = null, rep = null;
  try { rep = runAttempt(s, cm); } catch (e) { th = e; }
  p('jl=' + jl + ' outcome', rep ? rep.outcome : (th && th.status));
  p('jl=' + jl + ' ops/rollback', rep ? rep.ops.length + '/' + rep.rollback.length : '-');
  if (th && th.log) p('jl=' + jl + ' fail log', th.log.map(e => e.kind + ':' + String(e.state)).join(','));
}
