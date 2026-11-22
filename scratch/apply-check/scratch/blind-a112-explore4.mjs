// Blind exploration probe 4 (A112 re-run) — observation only.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const p = (k, v) => console.log(String(k).padEnd(50), typeof v === 'string' ? v : JSON.stringify(v));

// ---- G: pass/fail split at one address: does the failing pair's handle leave pending?
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  register(s, ['g'], 'ok', () => true);
  register(s, ['g'], 'bad', () => ({ message: 'violation' }));
  const cm = commit(s, ['g'], 'mem', 1);
  p('G.triggered.length', cm.triggered.length);
  p('G.pending.length at K-2', cm.pending.length);
  let thrown = null;
  try { runAttempt(s, cm); } catch (e) { thrown = e; }
  p('G.thrown status', thrown && thrown.status);
  p('G.log rows', JSON.stringify(thrown.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('G.pending.length after failing K-3', cm.pending.length);
  p('G.pending identities still there', cm.pending.map(String).join('|'));
  p('G.triggered identities', cm.triggered.map(String).join('|'));
}

// ---- H: two passes at one address (two attempts), handle checked off by the first pass
{
  const s = store.storeCreate({ journalLength: 32, listeners: [] });
  let calls = 0;
  register(s, ['h'], 'c', () => { calls += 1; return true; });
  const cm1 = commit(s, ['h'], 'mem', 1);
  const rep1 = runAttempt(s, cm1);
  p('H.rep1 outcome', rep1.outcome);
  p('H.pending(1) after rep1', cm1.pending.length);
  const cm2 = commit(s, ['h'], 'mem', 2);
  p('H.K-2(2) triggered.length', cm2.triggered.length);
  p('H.K-2(2) pending.length', cm2.pending.length);
  const rep2 = runAttempt(s, cm2);
  p('H.rep2 outcome', rep2.outcome);
  p('H.pending(2) after rep2', cm2.pending.length);
  p('H.calls', calls);
}

// ---- I: app listener at the same address, registered BEFORE and AFTER the kernel's K-1
{
  const s1 = store.storeCreate({ journalLength: 16, listeners: [] });
  let appCalls = 0;
  const appH = s1.on(['i'], () => { appCalls += 1; });
  const kH = register(s1, ['i'], 'c', () => true);
  p('I.app handle === kernel handle (app first)', String(appH) === String(kH));
  const cm = commit(s1, ['i'], 'mem', 1);
  p('I.triggered.length', cm.triggered.length);
  p('I.pending.length at K-2', cm.pending.length);
  p('I.app body calls at K-2', appCalls);
  const rep = runAttempt(s1, cm);
  p('I.outcome', rep.outcome);
  p('I.app body calls after K-3', appCalls);
  p('I.pending after K-3', cm.pending.length);

  const s2 = store.storeCreate({ journalLength: 16, listeners: [] });
  let app2Calls = 0;
  const kH2 = register(s2, ['i'], 'c', () => true);
  const appH2 = s2.on(['i'], () => { app2Calls += 1; });
  p('I2.app handle === kernel handle (kernel first)', String(appH2) === String(kH2));
  const cm2 = commit(s2, ['i'], 'mem', 1);
  p('I2.triggered.length', cm2.triggered.length);
  p('I2.pending.length at K-2', cm2.pending.length);
  p('I2.app body calls at K-2', app2Calls);
  const rep2 = runAttempt(s2, cm2);
  p('I2.outcome', rep2.outcome);
  p('I2.app body calls after K-3', app2Calls);
  p('I2.pending after K-3', cm2.pending.length);
}

// ---- J: store.listen idempotence and its handle vs K-1 at one address
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  const a = store.listen(s, ['j']);
  const b = store.listen(s, ['j']);
  p('J.listen twice same handle', String(a) === String(b));
  const h = s.on(['j'], () => {});
  p('J.on after listen same handle', String(h) === String(a));
  const k = register(s, ['j'], 'c', () => true);
  p('J.K-1 same handle', String(k) === String(a));
}
