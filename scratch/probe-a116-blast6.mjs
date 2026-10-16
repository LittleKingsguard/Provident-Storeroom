import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');
const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['b6'];
const op = ['b6', 'op'];
const calls = [];
const appHandle = store.on(watch, (...v) => calls.push(v.length));      // the caller's plain listener (ancestor)
let evals = 0;
const pairHandle = register(store, op, 'x', () => { evals += 1; return true; }); // the K-1 pair at the attempt's address
const rec = commit(store, op, 'mem', 'v');
console.log('K-2: triggered', rec.triggered.length, 'pending', rec.pending.length, 'app calls', calls.length, 'evals', evals, 'appHandle===pairHandle', appHandle === pairHandle);
store.settle(rec);   // THE ADVERSARIAL CALLER — instant (b), before runAttempt
console.log('after caller settle: app invocations', calls.length, 'evals', evals);
const armBase = calls.length;
const out = runAttempt(store, rec);
console.log('arm', out.outcome, '| app invocations at the arm', calls.length - armBase, 'evals', evals, '| pending after arm', rec.pending.length);
const b1 = calls.length;
storeWrite(store, op, 'mem', 'next');
console.log('NEXT BARE WRITE app invocations', calls.length - b1);
const b2 = calls.length;
storeWrite(store, op, 'mem', 'next2');
console.log('SECOND BARE WRITE app invocations', calls.length - b2);
