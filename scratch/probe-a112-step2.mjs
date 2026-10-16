import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const J = (v) => { try { return JSON.stringify(v); } catch (e) { return String(e); } };
const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
register(s, ['a'], 'cL', () => true);
storeNs.write(s, ['a'], 'mem', { k: 1 });
register(s, ['a', 'b'], 'cA', () => true);         // the FIRST attempt's pair
register(s, ['a', 'c'], 'cB', () => true);         // the second attempt's pair (the greens' step 2 address)
let nested = 'listener did not run';
s.on(['a'], () => {                                 // the app's body the ['a'] home runs
  const c = (() => { try { return { v: commit(s, ['a', 'c'], 'mem', 2) }; } catch (e) { return { e }; } })();
  nested = c.e ? 'K-2 THREW ' + c.e.status : 'K-2 RETURNED keys=[' + Object.keys(c.v).sort().join(',') + '] pending=' + c.v.pending.length;
  if (c.v) { const r = (() => { try { return { v: runAttempt(s, c.v) }; } catch (e) { return { e }; } })(); nested += ' / K-3 ' + (r.e ? 'THREW ' + r.e.status : r.v.outcome); }
});
const rec = commit(s, ['a', 'b'], 'mem', 3);        // the FIRST attempt opens (open while the listener runs)
console.log('nested inside the K-2 window =', nested, '| outer record pending', rec.pending.length);
let arm = 'n/a';
try { const r = runAttempt(s, rec); arm = r.outcome; } catch (e) { arm = 'THREW ' + e.status; }
console.log('first attempt arm =', arm);
