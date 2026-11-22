// Blind exploration probe 6 (A112 re-run) — observation only.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const p = (k, v) => console.log(String(k).padEnd(52), typeof v === 'string' ? v : JSON.stringify(v));

// ---- P: journalLength small -> a failed attempt's rollback meets the compacted floor?
for (const jl of [1, 2, 3, 4, 8]) {
  const s = store.storeCreate({ journalLength: jl, listeners: [] });
  let n = 0;
  register(s, ['p'], 'c', () => { n += 1; if (n === 1) return { repair: (rc) => { const w = store.write(s, rc.address, 'mem', 100 + n); return { ok: true, message: 'fixed', op: w.op }; }, message: 'bad-1' }; return true; });
  const cm = commit(s, ['p'], 'mem', 1);
  const rep = runAttempt(s, cm);
  p('P jl=' + jl + ' successful attempt: outcome/ops/rollback', rep.outcome + '/' + rep.ops.length + '/' + rep.rollback.length);

  const s2 = store.storeCreate({ journalLength: jl, listeners: [] });
  let m = 0;
  register(s2, ['q'], 'c', () => { m += 1; if (m === 1) return { message: 'unrepairable' }; return true; });
  const cm2 = commit(s2, ['q'], 'mem', 1);
  // burn journal entries with plain store writes
  for (let i = 0; i < 6; i++) { try { store.write(s2, ['burn', i], 'mem', i); } catch (e) { p('P burn threw', e.status); break; } }
  let th = null;
  try { runAttempt(s2, cm2); } catch (e) { th = e; }
  p('P jl=' + jl + ' failing attempt token', th && th.status);
  p('P jl=' + jl + ' outcome entry state', th && th.log && th.log.filter(e => e.kind === 'outcome').map(e => String(e.state)).join(','));
}

// ---- Q: is KC-6 reachable — a pair in ran that is not in appliedRepairs, violated again
{
  const s = store.storeCreate({ journalLength: 32, listeners: [] });
  let a = 0, b = 0;
  register(s, ['r'], 'a', () => { a += 1; return true; });                       // passes, enters ran
  register(s, ['r'], 'b', () => { b += 1; return b === 1 ? { repair: (rc) => { const w = store.write(s, rc.address, 'mem', 77); return { ok: true, message: 'fixed', op: w.op }; }, message: 'bad' } : true; });
  const cm = commit(s, ['r'], 'mem', 1);
  const rep = runAttempt(s, cm);
  p('Q outcome', rep.outcome);
  p('Q log rows', JSON.stringify(rep.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('Q calls a/b', a + '/' + b);
  p('Q ops', rep.ops.length);
}

// ---- R: a constraint body that writes into the store (does its own write trigger a pass?)
{
  const s = store.storeCreate({ journalLength: 32, listeners: [] });
  let a = 0, b = 0;
  register(s, ['t'], 'a', (ctx) => { a += 1; if (a === 1 && ctx.tier === 'mem') { try { store.write(s, ['t'], 'mem', 555); } catch (e) {} } return true; });
  register(s, ['t'], 'b', () => { b += 1; return true; });
  const cm = commit(s, ['t'], 'mem', 1);
  let th = null;
  try { runAttempt(s, cm); } catch (e) { th = e; }
  p('R token', th && th.status);
  p('R log rows', (th && th.log ? th.log : []).map(e => [e.seq, e.kind, String(e.id), String(e.state)].join('/')).join(' | '));
  p('R calls a/b', a + '/' + b);
}
