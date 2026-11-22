import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');
globalThis.__DBGW = true;
const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['b8'];
const op = ['b8', 'op'];
const calls = [];
store.on(watch, () => calls.push(1));
register(store, op, 'x', () => true);
storeWrite(store, watch, 'mem', { link: 1 });
const rec = commit(store, op, 'mem', 'v');
const wv = rec.pending;   // not the ledger's; probe-only
store.settle(rec);
const out = runAttempt(store, rec);
console.log('arm', out.outcome);
const before = calls.length;
storeWrite(store, op, 'mem', 'next');
console.log('NEXT BARE WRITE invocations', calls.length - before);
// Re-run the same shape on a FRESH store to compare
