import { storeCreate, write as W, read as R, rollback as RB } from 'provident-storeroom';
const grab = (fn) => { try { return { ret: fn() }; } catch (e) { return { threw: e.status, msg: e.message }; } };
const s = storeCreate({ listeners: [], journalLength: 128 });
const wa = W(s, ['a'], 'mem', 1);
const wb = W(s, ['b'], 'mem', 2);
console.log('a=', JSON.stringify(grab(() => R(s, ['a']))), 'b=', JSON.stringify(grab(() => R(s, ['b']))));
console.log('rollback(a-op) =', JSON.stringify(grab(() => RB(s, wa.op.opId))));
console.log('after: a=', JSON.stringify(grab(() => R(s, ['a']))), 'b=', JSON.stringify(grab(() => R(s, ['b']))));
console.log('   <-- per-op reach would leave b=2 standing');
