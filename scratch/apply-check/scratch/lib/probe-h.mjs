import { storeCreate, write as W, read as R, rollback as RB } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5 } from '../../bindings/js/src/constraint-kernel.mjs';
const grab = (fn) => { try { return { ret: fn() }; } catch (e) { return { threw: e.status }; } };

// H1: the greens' C-15 window shape (outer body writes at the descendant, inner attempt there fails, outer fails too)
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  let outerBodyWrite = null;
  K1(s, ['a'], 'a1', () => { // the outer pair: violated when the value at ['a'] is an object with n > 1
    return true;
  });
  K1(s, ['a', 'b'], 'b1', (ctx) => (ctx.value > 1 ? { message: 'b is bad' } : true));
  const outer = K2(s, ['a'], 'mem', { n: 1 });
  // the OUTER attempt's own K-3 runs the outer pair; the inner is opened by the caller (the greens' drive)
  const inner = K2(s, ['a', 'b'], 'mem', 2);
  let innerT = null; try { K3(s, inner); } catch (e) { innerT = e; }
  const innerRep = K5(s, inner.attempt);
  console.log('H1 inner:', innerT && innerT.status, 'inner cp=', JSON.stringify(innerRep.rollback.map(x=>[x.opId,x.checkpoint])));
  console.log('H1 read a/b after inner =', JSON.stringify(grab(() => R(s, ['a','b']))));
  const outerRep = K5(s, outer.attempt);
  console.log('H1 outer report (before its K-3) =', outerRep);
}
// H2: the passing-repair window's own composition (checkpoint's stop-op role when the attempt PASSES)
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value <= 10 ? true : { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } }));
  const c = K2(s, ['a'], 'mem', 99);
  const rep = K3(s, c);
  console.log('H2 outcome=', rep.outcome, 'rollback=', JSON.stringify(rep.rollback));
}
// H3: a passing attempt at an address that already holds a value: rollback is [] so the checkpoint is unobservable there
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  W(s, ['a'], 'mem', 1);
  K1(s, ['a'], 'x', () => true);
  const c = K2(s, ['a'], 'mem', 1);
  const rep = K3(s, c);
  console.log('H3 outcome=', rep.outcome, 'rollback=', JSON.stringify(rep.rollback), 'read=', JSON.stringify(grab(() => R(s, ['a']))));
}
// H4: does the store REFUSE a rollback op the previous attempt already swept (KC-8 for a fresh K-2 after ANY earlier rollback)?
{
  const s = storeCreate({ listeners: [], journalLength: 64 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  const c1 = K2(s, ['a'], 'mem', 9); grab(() => K3(s, c1));
  const c2 = K2(s, ['a'], 'mem', 9); const r2 = grab(() => K3(s, c2));
  console.log('H4 second attempt at the same address after a prior rollback =', JSON.stringify(r2), 'report=', JSON.stringify(K5(s, c2.attempt).rollback));
}
