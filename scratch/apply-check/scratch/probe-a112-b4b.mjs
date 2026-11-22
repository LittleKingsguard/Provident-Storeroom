import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const mk = () => storeNs.storeCreate({ journalLength: 64, listeners: [] });

// FIXTURE 1: an earlier caller write that went through the KERNEL (K-2 r1, never resolved).
{
  const s = mk();
  const anc = register(s, ['a'], 'cL', () => true);
  const r1 = commit(s, ['q'], 'mem', 'q-value');
  const earlyPair = register(s, ['a', 'b'], 'own', () => ({ message: 'violated' }));
  storeNs.write(s, ['a'], 'mem', { k: 1 });
  const rec = commit(s, ['a', 'b'], 'mem', 2);
  console.log('FIXTURE1 r1.pending.len at r1', r1.pending.length, 'r1 handle in rec.triggered', rec.triggered.includes(r1.pending[0]));
  let token = 'passed';
  try { runAttempt(s, rec); } catch (e) { token = e.status; }
  console.log('FIXTURE1 after failing arm: rec.pending.len', rec.pending.length, 'anc standing', rec.pending.includes(anc), 'own standing', rec.pending.includes(earlyPair), 'r1 entry standing', rec.pending.includes(r1.pending[0]), 'token', token);
  try { runAttempt(s, r1); console.log('FIXTURE1 r1 resolved'); } catch (e) { console.log('FIXTURE1 r1 arm threw', e.status); }
}
// FIXTURE 2: the earlier write at an address that is NOT a prefix of the failed write's address.
{
  const s = mk();
  const r1 = commit(s, ['q'], 'mem', 'q-value');
  const own = register(s, ['a'], 'own', () => ({ message: 'violated' }));
  const rec = commit(s, ['a'], 'mem', 2);
  console.log('FIXTURE2 rec.triggered.len', rec.triggered.length, 'rec.pending.len', rec.pending.length, 'r1 entry in rec.triggered', rec.triggered.includes(r1.pending[0]));
  let token = 'passed';
  try { runAttempt(s, rec); } catch (e) { token = e.status; }
  console.log('FIXTURE2 after failing arm: rec.pending.len', rec.pending.length, 'r1 entry standing', rec.pending.includes(r1.pending[0]), 'own standing', rec.pending.includes(own), 'token', token);
  try { runAttempt(s, r1); console.log('FIXTURE2 r1 resolved outcome', 'ok'); } catch (e) { console.log('FIXTURE2 r1 arm threw', e.status); }
}
