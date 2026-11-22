import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const mk = () => store.storeCreate({ journalLength: 64, listeners: [] });

// 1: one pair, no listener
{ const s = mk(); let c = 0; register(s, ['a'], 'p', () => { c += 1; return true; });
  const cm = commit(s, ['a'], 'mem', 1);
  console.log('one-pair-no-listener  K-2 pending=', cm.pending.length, 'triggered=', cm.triggered.length, 'bodyCalls=', c);
  const rep = runAttempt(s, cm);
  console.log('   after K-3 pending=', cm.pending.length, 'outcome=', rep.outcome, 'calls=', c); }

// 2: one pair + listener via s.on (same as B1 shape minus the 2nd pair)
{ const s = mk(); let c = 0, l = 0; register(s, ['a'], 'p', () => { c += 1; return true; }); s.on(['a'], () => { l += 1; });
  const cm = commit(s, ['a'], 'mem', 1);
  console.log('one-pair-plus-listener K-2 pending=', cm.pending.length, 'triggered=', cm.triggered.length, 'bodyCalls=', c, 'listenerCalls=', l);
  const rep = runAttempt(s, cm);
  console.log('   after K-3 pending=', cm.pending.length, 'outcome=', rep.outcome, 'calls=', c); }

// 3: two pairs, no listener
{ const s = mk(); let c = 0; register(s, ['a'], 'p', () => { c += 1; return true; }); register(s, ['a'], 'q', () => true);
  const cm = commit(s, ['a'], 'mem', 1);
  console.log('two-pairs-no-listener K-2 pending=', cm.pending.length, 'triggered=', cm.triggered.length, 'bodyCalls=', c); }

// 4: B6 shape repeated twice in one process
for (const i of [1,2]) {
  const s = mk(); let c = 0; register(s, ['a'], 'p', () => { c += 1; return true; });
  const cm1 = commit(s, ['a'], 'mem', 1);
  console.log('B6-shape run'+i+' K-2(1) pending=', cm1.pending.length, 'triggered=', cm1.triggered.length, 'calls=', c);
  const r1 = runAttempt(s, cm1);
  const cm2 = commit(s, ['a'], 'mem', 2);
  console.log('   K-2(2) pending=', cm2.pending.length, 'triggered=', cm2.triggered.length, 'calls=', c, 'r1=', r1.outcome);
}

// 5: fresh pair at a DIFFERENT address, one pair only
{ const s = mk(); let c = 0; register(s, ['zz'], 'p', () => { c += 1; return true; });
  const cm = commit(s, ['zz'], 'mem', 1);
  console.log('fresh-address-one-pair K-2 pending=', cm.pending.length, 'triggered=', cm.triggered.length, 'calls=', c); }
