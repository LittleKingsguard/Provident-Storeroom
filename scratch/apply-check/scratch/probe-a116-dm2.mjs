import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');

const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['pw'];
const operation = [...watch, 'op'];
const pairAddress = [...operation, 'pp'];
const calls = [];
const h = store.on(watch, (a) => calls.push(String(a)));
register(store, pairAddress, 'p', () => true);
storeWrite(store, watch, 'mem', { seed: 1 });
const before = calls.length;
console.log('after minting write: calls', calls.length);
const rec = commit(store, operation, 'mem', 1);
console.log('after commit: calls', calls.length, '(in-window beyond minting:', calls.length - before, ')');
console.log('triggered len', rec.triggered.length, 'pending len', rec.pending.length);
const rep = runAttempt(store, rec);
console.log('after runAttempt: outcome', rep.outcome, 'calls', calls.length, 'pending', rec.pending.length);
