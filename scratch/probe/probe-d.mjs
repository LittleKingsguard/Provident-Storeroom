import { storeCreate, write as W, read as R } from 'provident-storeroom';
import { register, commit, runAttempt, report, log } from './kernel-instrumented.mjs';
const s = storeCreate({ listeners: [], journalLength: 64 });
for (let i = 0; i < 6; i += 1) W(s, ['a'], 'mem', i + 1);
console.log('pre read =', JSON.stringify(R(s, ['a'])));
register(s, ['a'], 'x', (ctx) => (ctx.value > 5
  ? { message: 'too large', repair: () => { const w = W(s, ['a'], 'mem', 100); console.log('   [repair] write returned opId=', w.op.opId, 'value now=', JSON.stringify(R(s, ['a']))); return { ok: true, op: w.op }; } }
  : { message: 'still too large' }));
const c = commit(s, ['a'], 'mem', 9);
console.log('commit op =', c.op.opId);
let thrown = null; try { runAttempt(s, c); } catch (e) { thrown = e; }
console.log('thrown =', JSON.stringify(thrown && { status: thrown.status, message: thrown.message }));
const rep = report(s, c.attempt);
console.log('ops =', JSON.stringify(rep.ops.map(o => o.opId)));
console.log('outcome =', rep.outcome);
console.log('rollback =', JSON.stringify(rep.rollback, null, 1));
console.log('log =', JSON.stringify(rep.log.map(e => [e.seq, e.kind, e.id, e.opId, e.state])));
console.log('post read =', JSON.stringify((()=>{try{return R(s,['a'])}catch(e){return e.status}})()));
