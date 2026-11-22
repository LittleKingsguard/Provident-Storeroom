import { storeCreate, write as W, read as R, rollback as RB } from 'provident-storeroom';
import { register, commit, runAttempt, report } from '../../bindings/js/src/constraint-kernel.mjs';
const mk = () => storeCreate({ listeners: [], journalLength: 32 });
const grab = (fn) => { try { return { ret: fn() }; } catch (e) { return { threw: e.status, msg: e.message }; } };

// A: alpha's shape on a FRESH store (one op, fails, no repair)
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  const c = commit(s, ['a'], 'mem', 9);
  console.log('A commit:', grab(() => runAttempt(s, c)));
  const rep = report(s, c.attempt);
  console.log('A report outcome=', rep.outcome, 'rollback=', JSON.stringify(rep.rollback));
  console.log('A read after =', grab(() => R(s, ['a'])));
}
// B: second attempt on a store that already has one write/rollback
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  const c1 = commit(s, ['a'], 'mem', 9); grab(() => runAttempt(s, c1));
  const c2 = commit(s, ['a'], 'mem', 9);
  console.log('B second attempt:', grab(() => runAttempt(s, c2)));
  console.log('B report rollback=', JSON.stringify(report(s, c2.attempt).rollback));
}
// C: successful repair that leaves the address valid: does the repair op survive the rollback? (store pre-state)
{
  const s = mk();
  W(s, ['a'], 'mem', 1);   // pre-existing valid state
  register(s, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 6); return { ok: true, op: w.op }; } } : true));
  const c = commit(s, ['a'], 'mem', 9);
  console.log('C attempt:', grab(() => runAttempt(s, c)));
  const rep = report(s, c.attempt);
  console.log('C outcome=', rep.outcome, 'rollback=', JSON.stringify(rep.rollback), 'read after=', JSON.stringify(grab(() => R(s, ['a']))));
}
// D: repair writes a value that STILL violates -> failing attempt with a repair op
{
  const s = mk();
  W(s, ['a'], 'mem', 1);
  register(s, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 2); return { ok: true, op: w.op }; } } : (ctx.value > 1 ? { message: 'still too large' } : true)));
  const c = commit(s, ['a'], 'mem', 9);
  console.log('D attempt:', grab(() => runAttempt(s, c)));
  const rep = report(s, c.attempt);
  console.log('D outcome=', rep.outcome, 'rollback=', JSON.stringify(rep.rollback), 'read after=', JSON.stringify(grab(() => R(s, ['a']))));
}
// E: rollback of a fresh store's only op
{
  const s = mk();
  const w = W(s, ['a'], 'mem', 1);
  console.log('E rollback(first op only):', grab(() => RB(s, w.op.opId)));
}
// F: what does rollback answer after an earlier rollback swept the subtree
{
  const s = mk();
  const w1 = W(s, ['a'], 'mem', 1);
  const w2 = W(s, ['a'], 'mem', 2);
  console.log('F rb(w2):', grab(() => RB(s, w2.op.opId)));
  console.log('F rb(w1):', grab(() => RB(s, w1.op.opId)));
}
