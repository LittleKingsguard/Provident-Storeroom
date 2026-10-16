// Blind exploration probe 5 (A112 re-run) — observation only.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';

const p = (k, v) => console.log(String(k).padEnd(50), typeof v === 'string' ? v : JSON.stringify(v));
const mk = () => store.storeCreate({ journalLength: 32, listeners: [] });

// ---- K: KC-7 hold and release
{
  const s = mk();
  const cm1 = commit(s, ['k'], 'mem', 1);
  let st = 'none';
  try { commit(s, ['k'], 'mem', 2); } catch (e) { st = e && (e.status || e.message); }
  p('K.second K-2 while first open', st);
  const rep = runAttempt(s, cm1);
  p('K.first attempt outcome', rep.outcome);
  let st2 = 'none', ok = null;
  try { ok = commit(s, ['k'], 'mem', 3); } catch (e) { st2 = e && (e.status || e.message); }
  p('K.fresh K-2 after terminal arm', st2);
  p('K.fresh K-2 keys', ok && Object.keys(ok).sort().join(','));
  let st3 = 'none';
  try { report(s, cm1.attempt); } catch (e) { st3 = e && (e.status || e.message); }
  p('K.report over closed attempt', st3);
}

// ---- L: KC-5 (repeat of an applied repair) and KC-6 (second violation, no repair)
{
  const s = mk();
  let n = 0;
  register(s, ['l'], 'c', () => { n += 1; if (n === 1) return { repair: (rc) => { const w = store.write(s, rc.address, 'mem', 10 + n); return { ok: true, message: 'fixed', op: w.op }; }, message: 'bad-1' }; return { message: 'bad-again' }; });
  const cm = commit(s, ['l'], 'mem', 1);
  let th = null;
  try { runAttempt(s, cm); } catch (e) { th = e; }
  p('L.status (expect KC-5)', th && th.status);
  p('L.log rows', th && JSON.stringify(th.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('L.body calls', n);

  const s2 = mk();
  let m = 0;
  register(s2, ['m'], 'c', () => { m += 1; return m === 1 ? true : { message: 'second-violation' }; });
  const cm2 = commit(s2, ['m'], 'mem', 1);
  const repA = runAttempt(s2, cm2);
  p('L2.first attempt outcome', repA.outcome);
  const cm3 = commit(s2, ['m'], 'mem', 2);
  let th2 = null;
  try { runAttempt(s2, cm3); } catch (e) { th2 = e; }
  p('L2.status (expect KC-6)', th2 && th2.status);
  p('L2.log rows', th2 && JSON.stringify(th2.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('L2.body calls', m);
}

// ---- M: KC-1 / KC-2 registration channels
{
  const s = mk();
  const cases = [
    ['null address', () => register(s, null, 'c', () => true)],
    ['blank token address', () => register(s, ['', 'x'], 'c', () => true)],
    ['non-array address', () => register(s, 'a', 'c', () => true)],
    ['empty id', () => register(s, ['m'], '', () => true)],
    ['non-function constraint', () => register(s, ['m'], 'c', 5)],
  ];
  for (const [name, fn] of cases) {
    const started = Date.now();
    let r = 'none';
    try { fn(); } catch (e) { r = e && (e.status || e.message) + ' keys=' + Object.keys(e || {}).sort().join(','); }
    p('M.' + name, r);
  }
  // out-of-domain but in-shape address -> the store's own channel (listen throws)
  let r = 'none';
  try { register(s, ['m'], 'c', () => true); const cm = commit(s, ['m'], 'mem', 1); } catch (e) { r = e && (e.status || e.message); }
  p('M.in-domain register + commit', r);
}

// ---- N: throw from a constraint body
{
  const s = mk();
  register(s, ['n'], 'c', () => { throw new Error('body-throw'); });
  const cm = commit(s, ['n'], 'mem', 1);
  let th = null;
  try { runAttempt(s, cm); } catch (e) { th = e; }
  p('N.thrown is Error', th instanceof Error);
  p('N.thrown message', th && th.message);
  const lg = log(s, cm.attempt);
  p('N.K-4 after closed record', JSON.stringify(lg.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  const rp = report(s, cm.attempt);
  p('N.K-5 report outcome', rp && rp.outcome);
  let st = 'none';
  try { commit(s, ['n'], 'mem', 2); } catch (e) { st = e && (e.status || e.message); }
  p('N.fresh K-2 after body throw', st);
}

// ---- O: KC-8 floor; KC-4 failed repair
{
  const s = mk();
  register(s, ['o'], 'c', () => ({ repair: (rc) => { store.write(s, [rc.address[0], 'x'], 'mem', 5); return { ok: false, message: 'cannot' }; }, message: 'bad' }));
  const cm = commit(s, ['o'], 'mem', 1);
  let th = null;
  try { runAttempt(s, cm); } catch (e) { th = e; }
  p('O.status (expect KC-4)', th && th.status);
  p('O.log rows', th && JSON.stringify(th.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('O.thrown has rollback', th && ('rollback' in th));

  const s2 = mk();
  register(s2, ['o2'], 'c', () => ({ repair: (rc) => { throw new Error('repair-throw'); }, message: 'bad' }));
  const cm2 = commit(s2, ['o2'], 'mem', 1);
  let th2 = null;
  try { runAttempt(s2, cm2); } catch (e) { th2 = e; }
  p('O2.thrown message', th2 && (th2.message || th2.status));
  p('O2.log rows', th2 && th2.log && JSON.stringify(th2.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
}
