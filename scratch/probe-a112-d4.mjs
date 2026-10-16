import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';
const J = (v) => { try { return JSON.stringify(v); } catch (e) { return String(v); } };

// (1) on() AFTER K-1: which body runs during K-2's window?
{
  const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  let kernelPairCalls = 0, appListenerCalls = 0, appListenerArgs = null;
  const h1 = register(s, ['a'], 'p', () => { kernelPairCalls += 1; return true; });
  const h2 = s.on(['a'], (addr) => { appListenerCalls += 1; appListenerArgs = addr; });
  console.log('D4-1 handle identity K-1 vs on() =', h1 === h2);
  const rec = commit(s, ['a'], 'mem', 1);
  console.log('D4-1 inside K-2 window: kernelPairCalls', kernelPairCalls, 'appListenerCalls', appListenerCalls, 'arg', J(appListenerArgs), 'pending', rec.pending.length);
  runAttempt(s, rec);
  console.log('D4-1 after K-3: kernelPairCalls', kernelPairCalls, 'appListenerCalls', appListenerCalls);
}
// (2) off() then a bare write: is the withdrawn registration silent?
{
  const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  let calls = 0;
  const h = register(s, ['a'], 'p', () => { calls += 1; return true; });
  const off = (() => { try { return s.off(['a'], h); } catch (e) { return 'THREW ' + J(e); } })();
  storeNs.write(s, ['a'], 'mem', 1);
  console.log('D4-2 off() =', J(off), 'body calls after the bare write =', calls);
}
// (3) a fresh kernel cycle after on(): does the constraint body still run inside K-3's window?
{
  const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  let kernelPairCalls = 0, appListenerCalls = 0;
  register(s, ['a'], 'p', () => { kernelPairCalls += 1; return true; });
  s.on(['a'], () => { appListenerCalls += 1; });
  const rec = commit(s, ['a'], 'mem', 1);
  const rep = runAttempt(s, rec);
  console.log('D4-3 after K-3: kernelPairCalls', kernelPairCalls, 'appListenerCalls', appListenerCalls, 'outcome', rep.outcome, 'log', J(rep.log.map(e => e.kind + ':' + e.id)));
}
