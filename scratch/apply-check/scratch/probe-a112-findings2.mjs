// Probe the repair-body-throw arm's log/report, and the store members the kernel reaches (reordered).
import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';

const mk = () => storeNs.storeCreate({ journalLength: 64, listeners: [] });
const J = (v) => { try { return JSON.stringify(v); } catch (e) { return String(v); } };

// PROBE 8: the repair body's throw — the closed attempt's log and report.
{
  const s = mk();
  register(s, ['a'], 'p', () => ({
    repair: (rc) => { const w = storeNs.write(s, ['a', 'leaf'], rc.tier, 'orphan'); return { ok: true, message: 'x', op: w.op }; },
    message: 'p refuses',
  }));
  const rec = commit(s, ['a'], 'mem', 'leaf-value');
  let thrown = null;
  try { runAttempt(s, rec); } catch (e) { thrown = e; }
  const k4 = (() => { try { return log(s, rec.attempt); } catch (e) { return 'K-4 THREW ' + J(e); } })();
  const k5 = (() => { try { return report(s, rec.attempt); } catch (e) { return 'K-5 THREW ' + J(e); } })();
  console.log('PROBE8 thrown keys=[' + Object.keys(thrown || {}).sort().join(',') + '] status=' + (thrown && thrown.status));
  console.log('PROBE8 K-4=' + J(k4));
  console.log('PROBE8 K-5 outcome=' + (k5 && k5.outcome) + ' log=' + J(k5 && k5.log && k5.log.map(x => x.kind + ':' + x.state + ':' + x.message)));
}

// PROBE 9: which store members the kernel reaches on the caller's own instance (instance-method spy).
{
  const real = mk();
  const seen = [];
  const wrapped = new Proxy({}, {
    get(t, p) {
      seen.push('read:' + String(p));
      if (p === 'on') return (...a) => { seen.push('call:on'); return real.on(...a); };
      if (p === 'register') return (...a) => { seen.push('call:register'); return real.register(...a); };
      if (p === 'off') return (...a) => { seen.push('call:off'); return real.off(...a); };
      const v = real[p];
      if (typeof v === 'function') return (...a) => { seen.push('call:' + String(p)); return v.apply(real, a); };
      return v;
    },
  });
  try {
    register(wrapped, ['a'], 'p', () => true);
    const rec = commit(wrapped, ['a'], 'mem', 1);
    runAttempt(wrapped, rec);
  } catch (e) { seen.push('THREW ' + J(e)); }
  console.log('PROBE9 members reached on the passed instance=[' + [...new Set(seen)].join(',') + ']');
}

// PROBE 10: the same, but the passed instance is the REAL instance — the kernel's own verb call route is
// read by whether the STORE's verb sees the caller's instance (the store's own refusal names a Proxy).
{
  const real = mk();
  register(real, ['a'], 'p', () => true);
  const rec = commit(real, ['a'], 'mem', 1);
  console.log('PROBE10 (control) real-instance cycle ok:', Object.keys(rec).sort().join(','));
}
