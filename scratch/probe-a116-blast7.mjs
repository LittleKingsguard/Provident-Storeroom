import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');
const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['b7'];
const op = ['b7', 'op'];
const calls = [];
const appHandle = store.on(watch, (...v) => calls.push(v.length));
let evals = 0;
const pairHandle = register(store, op, 'x', () => { evals += 1; return true; });
storeWrite(store, watch, 'mem', { link: 1 });          // the minting write (link tier)
const before = calls.length;
const rec = commit(store, op, 'mem', 'v');
console.log('K-2 in-window app invocations', calls.length - before, '| triggered', rec.triggered.length, 'pending', rec.pending.length);
const atSettle = calls.length;
store.settle(rec);   // THE ADVERSARIAL CALLER: instant (b) BEFORE runAttempt
console.log('after caller settle: app invocations', calls.length - atSettle, 'evals', evals, '| pending', rec.pending.length);
const armBase = calls.length;
const out = runAttempt(store, rec);
console.log('arm', out.outcome, '| app invocations at the arm', calls.length - armBase, 'evals', evals, '| pending after arm', rec.pending.length);
const b1 = calls.length;
storeWrite(store, op, 'mem', 'next');
console.log('NEXT BARE WRITE app invocations', calls.length - b1);
const b2 = calls.length;
storeWrite(store, op, 'mem', 'next2');
console.log('SECOND BARE WRITE app invocations', calls.length - b2);
// and the terminal-arm repeat-call arm: settle(rec) once more after the arm
try { store.settle(rec); console.log('3rd settle after arm: no throw'); } catch (e) { console.log('3rd settle threw', e.message); }
const b3 = calls.length;
storeWrite(store, op, 'mem', 'next3');
console.log('BARE WRITE AFTER 3rd SETTLE app invocations', calls.length - b3);
