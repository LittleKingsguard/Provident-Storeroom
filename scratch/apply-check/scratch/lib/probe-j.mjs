import { storeCreate, write as W, read as R } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5 } from '../../bindings/js/src/constraint-kernel.mjs';
const grab = (fn) => { try { return { ret: fn() }; } catch (e) { return { threw: e.status, msg: e.message }; } };
// J-1: THE BATTERY'S OWN E2E-C-2 SHAPE — a pre-existing value at ['a'], then a two-op failing attempt
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  W(s, ['a'], 'mem', 2);                          // the value that stood there BEFORE commit was called
  console.log('J-1 pre-commit read =', JSON.stringify(grab(() => R(s, ['a']))));
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 4
    ? { message: 'x too large', repair: () => { const w = W(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } }
    : true));
  K1(s, ['a'], 'y', (ctx) => (ctx.value === 5 ? { message: 'y broken by the repair' } : true));
  const c = K2(s, ['a'], 'mem', 9);
  const t = grab(() => K3(s, c));
  console.log('J-1 thrown =', JSON.stringify(t));
  console.log('J-1 read after failure =', JSON.stringify(grab(() => R(s, ['a']))), '   <-- docs: "the value that stood there BEFORE commit was called" = 2');
  const rep = K5(s, c.attempt);
  console.log('J-1 ops =', JSON.stringify(rep.ops.map(o => o.opId)), 'rollback =', JSON.stringify(rep.rollback));
  console.log('J-1 log =', JSON.stringify(rep.log.map(e => [e.seq, e.kind, e.id, e.opId, e.state])));
}
// J-2: pre-existing writes by the KERNEL's own earlier PASSING attempt, then a failing attempt: is the earlier state still there?
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value === 1 ? true : { message: 'x too large' }));
  const good = K2(s, ['a'], 'mem', 1);
  const rg = K3(s, good);
  console.log('J-2 first (passing) attempt outcome =', rg.outcome, 'read =', JSON.stringify(grab(() => R(s, ['a']))));
  const bad = K2(s, ['a'], 'mem', 9);
  const rb = grab(() => K3(s, bad));
  console.log('J-2 second (failing) attempt =', JSON.stringify(rb));
  console.log('J-2 read after the failure =', JSON.stringify(grab(() => R(s, ['a']))), '   <-- docs: the last valid state (value 1)');
}
// J-3: does the store answer a rollback of an op from an EARLIER passing attempt (reach beyond the attempt)?
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  const w1 = W(s, ['a'], 'mem', 1);
  console.log('J-3 rollback of an old op =', JSON.stringify(grab(() => s.rollback(w1.op.opId))));
}
