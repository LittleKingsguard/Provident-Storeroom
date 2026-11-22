import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');

const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['pw2'];
const operation = [...watch, 'op'];
const pairAddress = [...operation, 'pp'];
const calls = [];
const inner = store.settle;
store.settle = function (record) {
  console.log('settle called; answered?', '(intercepted)');
  return inner.call(this, record);
};
const h = store.on(watch, (a) => { console.log('   >> LISTENER CALLED at', JSON.stringify(a)); calls.push(String(a)); });
register(store, pairAddress, 'p', () => true);
storeWrite(store, watch, 'mem', { seed: 1 });
console.log('--- commit now');
const rec = commit(store, operation, 'mem', 1);
console.log('after commit: calls', calls.length, 'triggered', rec.triggered.length);
