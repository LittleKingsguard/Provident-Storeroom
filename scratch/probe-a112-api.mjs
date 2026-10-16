// API smoke probe for the live gate-6 driver (scratch only).
import * as store from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';

const s = store.storeCreate({ journalLength: 8, listeners: [] });
console.log('store keys', Object.keys(store).sort().join(','));
console.log('instance keys', Object.keys(s).sort().join(','));

const h = register(s, ['a'], 'p', (ctx) => true);
console.log('K-1 handle', typeof h, String(h), JSON.stringify(h));

const rec = commit(s, ['a'], 'mem', 1);
console.log('K-2 record keys', Object.keys(rec).sort().join(','));
console.log('triggered', rec.triggered.map(String), 'pending', rec.pending.map(String));
console.log('op', JSON.stringify(rec.op));
console.log('attempt', JSON.stringify(rec.attempt));

const rep = runAttempt(s, rec);
console.log('K-3 report', JSON.stringify(rep, (k, v) => (typeof v === 'function' ? '[fn]' : v)));
console.log('K-4', JSON.stringify(log(s, rec.attempt)));
console.log('K-5 keys', Object.keys(report(s, rec.attempt)).sort().join(','));

// bare store write shape
const w = store.write(s, ['a'], 'mem', 2);
console.log('bare write keys', Object.keys(w).sort().join(','), JSON.stringify(w, (k, v) => (typeof v === 'function' ? '[fn]' : v)));
