import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');

const store = storeCreate({ journalLength: 8, listeners: [] });
const addr = ['blast2'];
const plainCalls = [];
const constrCalls = [];
store.on(addr, (a) => plainCalls.push(a));
register(store, addr, 'x', () => { constrCalls.push('x'); return true; });
const rec = commit(store, addr, 'mem', 'v');
console.log('K-2 pending len', rec.pending.length, 'triggered len', rec.triggered.length, 'plain calls', plainCalls.length, 'constr calls', constrCalls.length);
const before = plainCalls.length;
store.settle(rec);   // THE ADVERSARIAL CALLER — before runAttempt
console.log('after caller settle: plain invocations', plainCalls.length - before, 'constr invocations', constrCalls.length);
const b = plainCalls.length;
const out = runAttempt(store, rec);
console.log('arm: outcome', out.outcome, 'plain invocations at terminal arm', plainCalls.length - b, 'pending len', rec.pending.length, 'triggered len', rec.triggered.length);
// the NEXT bare write: does it find a stale marker?
const b3 = plainCalls.length;
storeWrite(store, addr, 'mem', 'next');
console.log('next bare write invocations', plainCalls.length - b3);
