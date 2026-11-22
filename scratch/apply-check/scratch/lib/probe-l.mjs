import { storeCreate, write as W, read as R } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5, attemptCheckpoint } from './live-kernel-view.mjs';
const grab = (fn) => { try { return fn(); } catch (e) { return e; } };
// L1: the LIVE passing-repair window (green E2E-C-3 shape)
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value <= 10 ? true : { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } }));
  const c = K2(s, ['a'], 'mem', 99);
  const rep = K3(s, c);
  console.log('L1 passing repair: outcome=', rep.outcome, 'ops=', rep.ops.map(o=>o.opId), 'checkpoint(view)=', JSON.stringify(attemptCheckpoint(rep)));
}
// L2: the LIVE failing window whose repair's op LANDED and passed its own atomic evaluation
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  W(s, ['a'], 'mem', 2);
  K1(s, ['a'], 'x', (ctx) => (ctx.value === 2 ? true : { message: 'x violated', repair: () => { const w = W(s, ['b'], 'mem', 3); return { ok: true, op: w.op }; } }));
  const c = K2(s, ['a'], 'mem', 9);
  const t = grab(() => K3(s, c));
  const rep = K5(s, c.attempt);
  console.log('L2 cross-address repair: thrown=', t.status, 'ops=', rep.ops.map(o=>o.opId), 'checkpoint(view)=', JSON.stringify(attemptCheckpoint(rep)));
  console.log('   rollback=', JSON.stringify(rep.rollback), 'read a =', JSON.stringify(grab(() => R(s, ['a']))));
}
// L3: a failing attempt at an address that HELD a value: what does the store stand at afterwards?
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  W(s, ['a'], 'mem', 2);
  K1(s, ['a'], 'x', () => ({ message: 'always violated' }));
  const c = K2(s, ['a'], 'mem', 9);
  const t = grab(() => K3(s, c));
  const rep = K5(s, c.attempt);
  console.log('L3 always-violated failing attempt: thrown=', t.status, 'checkpoint(view)=', JSON.stringify(attemptCheckpoint(rep)));
  console.log('   read a after =', JSON.stringify(grab(() => R(s, ['a']))), '   <-- the pre-state was 2; the docs assert the pre-state only where every op the attempt created lies under a performed call, and this attempt created ONE op at [\'a\']');
  console.log('   rollback=', JSON.stringify(rep.rollback));
}
// L4: a SECOND attempt at the same address after the first one rolled back everything
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', () => ({ message: 'always violated' }));
  const c1 = K2(s, ['a'], 'mem', 1); grab(() => K3(s, c1));
  const c2 = K2(s, ['a'], 'mem', 2); const t2 = grab(() => K3(s, c2));
  console.log('L4 second attempt at the same address: thrown=', t2.status, '|', t2.message);
  console.log('   second attempt rollback=', JSON.stringify(K5(s, c2.attempt).rollback));
}
