// Focused live probes for the gate-6 findings (scratch only).
import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const mk = () => storeNs.storeCreate({ journalLength: 64, listeners: [] });
const J = (v) => { try { return JSON.stringify(v); } catch (e) { return String(v); } };

// ---- PROBE 1: does the store's own `write` deliver the listener inside K-2's window, or after? ----
{
  const events = [];
  const s = mk();
  register(s, ['a'], 'p', () => { events.push('constraint-body'); return true; });
  s.on(['a'], () => { events.push('app-listener'); });
  events.push('before-K2');
  const rec = commit(s, ['a'], 'mem', 1);
  events.push('after-K2-returned');
  events.push('pending-at-K2=' + rec.pending.length);
  runAttempt(s, rec);
  events.push('after-K3');
  console.log('PROBE1 order:', events.join(' > '));
}

// ---- PROBE 2: nested K-2 at the SAME address from inside the app listener body (E2E-C-8 window β) ----
{
  const s = mk();
  register(s, ['c'], 'c', () => true);
  let nested = 'listener did not run';
  s.on(['c'], () => {
    try { const r = commit(s, ['c'], 'mem', 7); nested = 'K-2 RETURNED keys=' + Object.keys(r).sort().join(','); }
    catch (e) { nested = 'K-2 THREW ' + J(e); }
  });
  const out = storeNs.write(s, ['c'], 'mem', 7);
  console.log('PROBE2 (outer store.write under a registration) nested=' + nested + ' outerOp=' + out.op.opId);
}
{
  // the outer act is the KERNEL's own K-2 (a caller-made write through K-2), then the app listener nests a K-2
  const s = mk();
  register(s, ['c'], 'c', () => true);
  let nested = 'listener did not run';
  s.on(['c'], () => {
    try { const r = commit(s, ['c'], 'mem', 8); nested = 'nested K-2 RETURNED keys=' + Object.keys(r).sort().join(','); }
    catch (e) { nested = 'nested K-2 THREW ' + J(e); }
  });
  try { const rec = commit(s, ['c'], 'mem', 7); console.log('PROBE2b outer K-2 RETURNED; nested=' + nested); }
  catch (e) { console.log('PROBE2b outer K-2 THREW ' + J(e) + '; nested=' + nested); }
}

// ---- PROBE 3: nested K-2 at a DIFFERENT address from inside the listener body ----
{
  const s = mk();
  register(s, ['a'], 'cL', () => true);
  storeNs.write(s, ['a'], 'mem', { k: 1 });
  register(s, ['a', 'b'], 'cB', () => true);
  let nested = 'listener did not run';
  s.on(['a'], () => {
    try { const r = commit(s, ['a', 'b'], 'mem', 9); nested = 'nested K-2 RETURNED keys=' + Object.keys(r).sort().join(',') + ' pending=' + r.pending.length; }
    catch (e) { nested = 'nested K-2 THREW ' + J(e); }
  });
  const out = storeNs.write(s, ['a'], 'mem', { k: 2 });
  console.log('PROBE3 nested=' + nested);
}

// ---- PROBE 4: the failing arm's discard extent — ancestor handle + an earlier other-address entry ----
{
  const s = mk();
  let ancestorCalls = 0;
  const anc = register(s, ['a'], 'cL', () => { ancestorCalls += 1; return true; });
  // an EARLIER caller write at a SIBLING address under its own registration
  const sib = register(s, ['z'], 'z1', () => true);
  const early = storeNs.write(s, ['z'], 'mem', 'zv');
  const earlyHandle = early.triggered[0];
  storeNs.write(s, ['a'], 'mem', { k: 1 });
  register(s, ['a', 'b'], 'own', () => { return { message: 'violated' }; });
  const rec = commit(s, ['a', 'b'], 'mem', 2);
  const atReturn = { triggered: rec.triggered.length, pending: rec.pending.length, ancInReturned: rec.triggered.includes(anc), ancInPending: rec.pending.includes(anc) };
  let token = 'none';
  try { runAttempt(s, rec); token = 'no throw (passed)'; } catch (e) { token = e.status; }
  console.log('PROBE4 atReturn=' + J(atReturn) + ' token=' + token
    + ' after: pending=' + rec.pending.length + ' ancStanding=' + rec.pending.includes(anc)
    + ' earlyHandleStanding=' + rec.pending.includes(earlyHandle) + ' sibHandle==earlyHandle=' + (sib === earlyHandle)
    + ' ancestorCalls=' + ancestorCalls);
}

// ---- PROBE 5: the repair body's throw — what does the caller receive and what does the log carry? ----
{
  const s = mk();
  register(s, ['a'], 'p', () => ({
    repair: (rc) => { const w = storeNs.write(s, ['a', 'leaf'], rc.tier, 'orphan'); return { ok: true, message: 'x', op: w.op }; },
    message: 'p refuses',
  }));
  const rec = commit(s, ['a'], 'mem', 'leaf-value');
  try { runAttempt(s, rec); console.log('PROBE5 no throw'); }
  catch (e) {
    console.log('PROBE5 caller received form keys=[' + Object.keys(e).sort().join(',') + '] status=' + e.status
      + ' log=' + J((e.log || []).map(x => x.kind + ':' + x.state + ':' + x.message)));
  }
  try { console.log('PROBE5 K-5=' + J(storeNs.rollback === undefined) + ' report=' + J((() => { const { report } = null; return null; })())); } catch (e) { /* ignore */ }
}

// ---- PROBE 6: which store members the kernel reaches on the CALLER'S OWN INSTANCE (proxy) ----
{
  const real = mk();
  const seen = [];
  const proxied = new Proxy(real, {
    get(t, p, r) { const v = Reflect.get(t, p, r); if (typeof v === 'function') { return (...a) => { seen.push('call:' + String(p)); return v.apply(t, a); }; } seen.push('read:' + String(p)); return v; },
    set(t, p, v) { seen.push('set:' + String(p)); return Reflect.set(t, p, v); },
  });
  register(proxied, ['a'], 'p', () => true);
  const rec = commit(proxied, ['a'], 'mem', 1);
  runAttempt(proxied, rec);
  console.log('PROBE6 members reached on the passed instance=[' + [...new Set(seen)].join(',') + ']');
}

// ---- PROBE 7: the same cycle with the kernel's write reached through the PACKAGE module (not the instance) ----
{
  const real = mk();
  const seen = [];
  const spy = (name) => (...a) => { seen.push(name); return storeNs[name === 'write' ? 'write' : 'rollback'](...a); };
  // wrap the INSTANCE's methods to see whether the kernel's own verb call goes through them
  const wrapped = {
    register: (...a) => { seen.push('instance.register'); return real.register(...a); },
    on: (...a) => { seen.push('instance.on'); return real.on(...a); },
    off: (...a) => { seen.push('instance.off'); return real.off(...a); },
  };
  register(wrapped, ['a'], 'p', () => true);
  const rec = commit(wrapped, ['a'], 'mem', 1);
  runAttempt(wrapped, rec);
  console.log('PROBE7 instance methods the kernel called=[' + seen.join(',') + '] (a kernel that reached the store through the INSTANCE\'s verb position would show more than on)');
}
