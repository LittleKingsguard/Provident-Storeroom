// N7 — MINIMAL REPRODUCTION of the failing limb (limb 2, the discard limb). 20 lines, published surface.
//
// CLAIM UNDER TEST: "the constraints pass flows to the listeners — which are discarded if the write
// fails on constraints — not the write return."
//
// Run: node scratch/n7-ordering-demo-repro.mjs
import * as s from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const st = s.storeCreate({ journalLength: 64, listeners: [] });
s.write(st, ['n7'], 'mem', { ord: 0 }); // the store's own rule: the parent must stand as a map link
register(st, ['n7', 'ord'], 'c', () => ({ message: 'the constraint refuses this landing' })); // K-1
st.on(['n7', 'ord'], () => console.log('  >>> THE APP LISTENER BODY RAN')); // the app's own registration

const rec = commit(st, ['n7', 'ord'], 'mem', 1); // K-2: the write — the body is delivered in HERE
console.log('after K-2: listener body calls so far = 1, constraint body calls = 0, commit did not fail');
try { runAttempt(st, rec); } catch (thrown) {
  console.log('  the attempt\'s terminal arm =', thrown.status, '::', thrown.message);
}
console.log('after the arm: `pending` =', rec.pending.length, 'of `triggered` =', rec.triggered.length,
  '— the record member was discarded, the delivered body was not.');
