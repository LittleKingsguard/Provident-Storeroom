import { storeCreate, write as W, read as R } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5 } from '../../bindings/js/src/constraint-kernel.mjs';
const grab = (fn) => { try { return { ret: fn() }; } catch (e) { return { threw: e.status, msg: e.message }; } };
// I1: fresh store, ONE pair, repair lands and the re-run passes -> outcome passed (rollback stays [])
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value <= 10 ? true : { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } }));
  const c = K2(s, ['a'], 'mem', 99);
  const rep = K3(s, c);
  console.log('I1 outcome=', rep.outcome, 'ops=', rep.ops.map(o=>o.opId), 'rollback=', JSON.stringify(rep.rollback));
}
// I2: a SECOND pair with no repair violates the repair's landing -> the re-run fails, checkpoint? 
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  W(s, ['a'], 'mem', 1);   // pre-existing state so the pre-state is readable
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } } : true));
  K1(s, ['a'], 'y', (ctx) => (ctx.value === 5 ? { message: 'y broken by the repair' } : true));
  const c = K2(s, ['a'], 'mem', 99);
  const thrown = grab(() => K3(s, c));
  console.log('I2 thrown=', JSON.stringify(thrown));
  const rep = K5(s, c.attempt);
  console.log('I2 outcome=', rep.outcome, 'ops=', rep.ops.map(o=>o.opId));
  console.log('I2 rollback=', JSON.stringify(rep.rollback));
  console.log('I2 read a =', JSON.stringify(grab(() => R(s, ['a']))));
}
