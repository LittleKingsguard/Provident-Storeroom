// scratch/p3-probe.mjs — a throwaway probe for `P-3`'s package-side cells. Not part of the patch.
import { storeCreate } from '../bindings/js/index.mjs';

const store = storeCreate({ journalLength: 8, listeners: [] });
const h = store.listen('h', [['a']]);
console.log('listen answered:', JSON.stringify(h));
console.log('register answered:', String(store.register(h, (address) => console.log('   fired at', JSON.stringify(address)))));

const first = store.write(['a'], 'mem', 1);
console.log('first record keys:', JSON.stringify(Object.keys(first)));
console.log('first own names:', JSON.stringify(Object.getOwnPropertyNames(first)));
console.log('first triggered:', JSON.stringify(first.triggered), 'watched:', JSON.stringify(first.watched));
console.log('first log:', JSON.stringify(first.log));
console.log('first discarded:', JSON.stringify(first.discarded));
console.log('first bodyFailures:', JSON.stringify(first.bodyFailures), 'returnedValues:', JSON.stringify(first.returnedValues));
console.log('first bodyFailures frozen:', Object.isFrozen(first.bodyFailures), 'shared:', first.bodyFailures === first.returnedValues);

const second = store.write(['a'], 'mem', 1);
console.log('second keys:', JSON.stringify(Object.keys(second)));
console.log('second triggered:', JSON.stringify(second.triggered), 'watched:', JSON.stringify(second.watched));
console.log('second log:', JSON.stringify(second.log));
console.log('second op:', JSON.stringify(second.op));
console.log('second discarded:', JSON.stringify(second.discarded));
console.log('second getOwnPropertyNames:', JSON.stringify(Object.getOwnPropertyNames(second)));

// A pair whose body would refuse `1`, then a no-change write beside it.
const store2 = storeCreate({ journalLength: 8, listeners: [] });
const asks = [];
store2.write(['a'], 'mem', 1);
store2.addConstraint({ address: ['a'], id: 'k' }, (context) => {
  asks.push({ value: context.value, op: context.op === null ? null : 'op' });
  return true;
});
asks.length = 0;
const noChange = store2.write(['a'], 'mem', 1);
console.log('CD-12 asks after the no-change write:', JSON.stringify(asks));
console.log('CD-12 log kinds:', JSON.stringify(noChange.log.map((e) => e.kind)));
const changed = store2.write(['a'], 'mem', 2);
console.log('CD-12 asks after a changing write:', JSON.stringify(asks));
console.log('CD-12 changing log kinds:', JSON.stringify(changed.log.map((e) => e.kind)));

// CD-16: a listener that rewrites the same literal at its own address.
let invocations = 0;
const store3 = storeCreate({ journalLength: 8, listeners: [] });
const h3 = store3.listen('self', [['a']]);
store3.register(h3, () => {
  invocations += 1;
  store3.write(['a'], 'mem', 1);
});
store3.write(['a'], 'mem', 1);
console.log('CD-16 invocations for a same-literal self-write:', invocations);

let invocations2 = 0;
const store4 = storeCreate({ journalLength: 8, listeners: [] });
const h4 = store4.listen('self', [['a']]);
store4.register(h4, () => {
  invocations2 += 1;
  if (invocations2 === 1) store4.write(['a'], 'mem', 2);
});
store4.write(['a'], 'mem', 1);
console.log('CD-16 invocations for a DIFFERENT-literal self-write:', invocations2);

// CD-14: a repair that lands the literal already standing, at `addConstraint`.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const dir = mkdtempSync(join(tmpdir(), 'p3-probe-'));
const filePath = join(dir, 'store.json');
const store5 = storeCreate({ journalLength: 32, listeners: [], filePath });
store5.write(['w'], 'file', 'by-repair');
let delivered = [];
const h5 = store5.listen('W', [['w']]);
store5.register(h5, (address) => delivered.push(address));
let repairs = 0;
const asks2 = [];
const identity = store5.addConstraint({ address: ['a'], id: 'reg' }, (context) => {
  asks2.push({ opIsNull: context.op === null, tierIsNull: context.tier === null, value: context.value });
  if (context.op !== null) return true;
  return {
    message: 'must exist',
    repair: (record) => {
      repairs += 1;
      return { ok: true, op: record.write(['w'], 'file', 'by-repair').op };
    },
  };
});
console.log('CD-14 identity:', JSON.stringify(identity), 'repairs:', repairs, 'deliveries:', JSON.stringify(delivered), 'asks:', JSON.stringify(asks2));
console.log('CD-14 constraints():', JSON.stringify(store5.constraints()));
console.log('CD-14 file bytes:', existsSync(filePath) ? readFileSync(filePath, 'utf8') : null);
rmSync(dir, { recursive: true, force: true });
