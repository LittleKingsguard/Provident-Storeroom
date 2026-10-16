import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
register(s, ['q'], 'q1', () => true);           // a registration at the earlier write's address
const r1 = commit(s, ['q'], 'mem', 'q-value');   // the earlier caller write (K-2), left unresolved
const own = register(s, ['a'], 'own', () => ({ message: 'violated' }));
const rec = commit(s, ['a'], 'mem', 2);
console.log('r1 triggered/pending', r1.triggered.length, r1.pending.length,
  '| rec triggered/pending', rec.triggered.length, rec.pending.length,
  '| r1 handle in rec.triggered', rec.triggered.includes(r1.pending[0]));
let token = 'passed';
try { runAttempt(s, rec); } catch (e) { token = e.status; }
console.log('after the failing arm: rec.pending', rec.pending.length, 'own standing', rec.pending.includes(own),
  '| the other write\'s r1.pending', r1.pending.length, 'standing', r1.pending.includes(r1.triggered?.[0]) || r1.pending.length === 1, '| token', token);
