// The RCA's own drive, re-taken: one unchanged address, journalLength 64, N writes (docs/L1/journal-retention-rca.md §2).
import { storeCreate } from '../bindings/js/index.mjs';
import { withAddon } from '../bindings/js/src/entry/addon-slot.mjs';

const N = Number(process.argv[2] ?? 1000);
const base = process.memoryUsage();
const t0 = process.hrtime.bigint();
const store = storeCreate({ journalLength: 64, listeners: [] });
let digest = 0;
for (let i = 0; i < N; i += 1) {
  const record = store.write(['a'], 'mem', { a: 1 });
  digest += record.op.seq;
}
const ms = Number(process.hrtime.bigint() - t0) / 1e6;
const after = process.memoryUsage();
const mb = (bytes) => Math.round((bytes / 1048576) * 10) / 10;

// The store still answers every verb after N writes.
const read = store.read(['a']);
const again = store.write(['a'], 'mem', { a: 1 });
const mark = Reflect.apply(withAddon().journalMark, store, []);
const back = store.rollback(again.op.opId);
console.log(JSON.stringify({
  N,
  rssMB: mb(after.rss - base.rss),
  heapUsedMB: mb(after.heapUsed - base.heapUsed),
  heapUsedKBPerWrite: Math.round(((after.heapUsed - base.heapUsed) / N / 1024) * 100) / 100,
  ms: Math.round(ms),
  digest: digest % 1000,
  read: JSON.stringify(read),
  mark: mark === null ? null : 'present',
  undoneOps: back.undoneOps.length,
  restoredTo: JSON.stringify(back.restoredTo),
}));
