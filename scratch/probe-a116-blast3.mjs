import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');

const store = storeCreate({ journalLength: 8, listeners: [] });
const addr = ['blast3'];
const calls = [];
const child = [addr[0], 'child'];
let evaluations = 0;
register(store, addr, 'x', () => { evaluations += 1; return true; });  // FIRST: the kernel's home
store.on(child, (a) => calls.push(a));                                  // SECOND: the caller's own handle
const rec = commit(store, addr, 'mem', 'v');
console.log('pending len', rec.pending.length, 'calls', calls.length, 'evals', evaluations);
// find the caller's handle: the one that is NOT the kernel's
const held = rec.triggered.find((h) => true);
console.log('triggered len', rec.triggered.length);
const before = calls.length;
store.settle(rec);   // THE ADVERSARIAL CALLER
console.log('after caller settle: caller-body invocations', calls.length - before, 'evals', evaluations);
const b = calls.length;
const out = runAttempt(store, rec);
console.log('arm outcome', out.outcome, '| caller-body invocations at terminal arm', calls.length - b, '| evals', evaluations);
const b3 = calls.length;
storeWrite(store, addr, 'mem', 'next');
console.log('NEXT BARE WRITE invocations', calls.length - b3);
