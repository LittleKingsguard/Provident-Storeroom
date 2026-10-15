import { storeCreate, write as W, read as R, rollback as RB } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5, log as K4 } from '../../bindings/js/src/constraint-kernel.mjs';
const s = storeCreate({ listeners: [], journalLength: 64 });
W(s, ['a'], 'mem', { seed: true });
K1(s, ['a'], 'a1', () => true);
K1(s, ['a', 'b'], 'b1', () => true);
K1(s, ['a', 'b'], 'b2', (ctx) => (ctx.value > 1 ? { message: 'b is bad' } : true));
const inner = K2(s, ['a', 'b'], 'mem', 2);
let innerT = null; try { K3(s, inner); } catch (e) { innerT = e; }
const innerRep = K5(s, inner.attempt);
console.log('inner thrown =', JSON.stringify(innerT && { status: innerT.status, message: innerT.message }));
console.log('inner rollback =', JSON.stringify(innerRep.rollback));
console.log('read a =', JSON.stringify((()=>{try{return R(s,['a'])}catch(e){return e.status}})()));
console.log('read a/b =', JSON.stringify((()=>{try{return R(s,['a','b'])}catch(e){return e.status}})()));
const outer = K2(s, ['a'], 'mem', 5);
console.log('outer commit op =', outer.op.opId);
let outerT = null, outerRet = null;
try { outerRet = K3(s, outer); } catch (e) { outerT = e; }
console.log('outer thrown =', JSON.stringify(outerT && { status: outerT.status, message: outerT.message }));
console.log('outer returned =', outerRet && outerRet.outcome);
const outerRep = K5(s, outer.attempt);
console.log('outer outcome =', outerRep.outcome, 'ops=', JSON.stringify(outerRep.ops.map(o=>o.opId)), 'rollback=', JSON.stringify(outerRep.rollback));
console.log('outer log =', JSON.stringify(outerRep.log.map(e=>[e.kind,e.id,e.opId,e.state])));
