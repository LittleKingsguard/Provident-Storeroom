import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
let ancCalls = 0;
const cL = () => { ancCalls += 1; return true; };
const anc = register(s, ['a'], 'cL', cL);
storeNs.write(s, ['a'], 'mem', { k: 1 });
const own = register(s, ['a', 'b'], 'own', () => ({ message: 'violated' }));
const rec = commit(s, ['a', 'b'], 'mem', 2);
console.log('anc === own?', anc === own);
console.log('triggered =', rec.triggered.map((h, i) => i + ':' + (h === anc ? 'anc' : h === own ? 'own' : 'other')), 'len', rec.triggered.length);
console.log('pending   =', rec.pending.map((h, i) => i + ':' + (h === anc ? 'anc' : h === own ? 'own' : 'other')), 'len', rec.pending.length);
try { runAttempt(s, rec); console.log('arm did not throw'); } catch (e) { console.log('arm token', e.status); }
console.log('after pass pending =', rec.pending.map((h, i) => i + ':' + (h === anc ? 'anc' : h === own ? 'own' : 'other')), 'len', rec.pending.length, 'ancCalls', ancCalls);
