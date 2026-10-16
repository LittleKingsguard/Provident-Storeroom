import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');
// The caller's own registration at a DESCENDANT of the attempt's address: the store's prefix test returns
// it for this write (a registration W is triggered by a write at X iff W is a prefix of X), while the
// kernel's own pair stands at X itself — so the two handles are distinct and the caller's body is the
// observable that a withheld window is read through.
const store = storeCreate({ journalLength: 8, listeners: [] });
const addr = ['b5'];
const child = ['b5', 'c'];
const calls = [];
const h = store.on(child, (a) => calls.push(String(a)));
let evals = 0;
const pair = register(store, addr, 'x', () => { evals += 1; return true; });
const rec = commit(store, addr, 'mem', 'v');
console.log('K-2: pending', rec.pending.length, 'triggered', rec.triggered.length, 'caller-body calls', calls.length, 'is caller handle?', rec.triggered.includes(h));
store.settle(rec);  // THE ADVERSARIAL CALLER — before runAttempt
console.log('caller settle: caller-body invocations', calls.length, 'evals', evals);
const afterArm = calls.length;
const out = runAttempt(store, rec);
console.log('arm', out.outcome, '| caller-body invocations at the arm', calls.length - afterArm, 'evals', evals);
const before = calls.length;
storeWrite(store, addr, 'mem', 'next');
console.log('NEXT BARE WRITE invocations', calls.length - before);
const before2 = calls.length;
storeWrite(store, addr, 'mem', 'next2');
console.log('SECOND BARE WRITE invocations', calls.length - before2);
