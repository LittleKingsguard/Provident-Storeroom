// Blind exploration probe 3 (A112 re-run) — observation only.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt, log } from '../bindings/js/src/constraint-kernel.mjs';

const p = (k, v) => console.log(String(k).padEnd(46), typeof v === 'string' ? v : JSON.stringify(v));

// ---- D1: parent-established ancestor pair, write at descendant
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  let ancCalls = 0;
  const h = register(s, ['a'], 'cL', () => { ancCalls += 1; return true; });
  // establish the parent with a bare store write (no kernel attempt)
  const w = store.write(s, ['a'], 'mem', {});
  p('D1.bare store write triggered.length', w.triggered.length);
  p('D1.ancestor body calls after bare write', ancCalls);
  const cm = commit(s, ['a', 'b'], 'mem', 5);
  p('D1.K-2 triggered.length', cm.triggered.length);
  p('D1.K-2 pending.length', cm.pending.length);
  p('D1.K-2 pending holds the ancestor handle', cm.pending.some(x => String(x) === String(h)));
  p('D1.ancestor body calls at K-2', ancCalls);
  const rep = runAttempt(s, cm);
  p('D1.report.outcome', rep.outcome);
  p('D1.log kinds', rep.log.map(e => e.kind).join(','));
  p('D1.log ids', rep.log.map(e => String(e.id)).join(','));
  p('D1.pending.length after K-3', cm.pending.length);
  p('D1.pending holds ancestor handle after K-3', cm.pending.some(x => String(x) === String(h)));
  p('D1.ancestor body calls after K-3', ancCalls);
}

// ---- D2: write directly at a deep address with no parent
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  register(s, ['a'], 'cL', () => true);
  try {
    const cm = commit(s, ['a', 'b'], 'mem', 5);
    p('D2.commit ok triggered', cm.triggered.length);
    p('D2.pending', cm.pending.length);
  } catch (e) {
    p('D2.commit threw', e && (e.status || e.message));
  }
}

// ---- E: failing constraint with no repair
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  let calls = 0;
  const h = register(s, ['e'], 'c', () => { calls += 1; return { message: 'nope' }; });
  const cm = commit(s, ['e'], 'mem', 3);
  p('E.K-2 pending.length', cm.pending.length);
  let thrown = null;
  try { runAttempt(s, cm); } catch (e) { thrown = e; }
  p('E.thrown status', thrown && thrown.status);
  p('E.thrown keys', thrown && Object.keys(thrown).sort().join(','));
  p('E.thrown.log kinds', thrown && thrown.log && thrown.log.map(x => x.kind).join(','));
  p('E.thrown.log states', thrown && thrown.log && thrown.log.map(x => String(x.state)).join(','));
  p('E.pending.length after failed K-3', cm.pending.length);
  p('E.body calls', calls);
  p('E.log(K-4) kinds', log(s, cm.attempt).map(x => x.kind).join(','));
}

// ---- F: failing constraint with a repair that fixes it — which handles pass
{
  const s = store.storeCreate({ journalLength: 16, listeners: [] });
  let cCalls = 0, rCalls = 0;
  register(s, ['f'], 'c', () => { cCalls += 1; return cCalls === 1 ? { repair: (rc) => { rCalls += 1; const wr = store.write(s, rc.address, 'mem', 99); return { ok: true, message: 'fixed', op: wr.op }; }, message: 'bad' } : true; });
  const cm = commit(s, ['f'], 'mem', 1);
  p('F.K-2 pending.length', cm.pending.length);
  const rep = runAttempt(s, cm);
  p('F.outcome', rep.outcome);
  p('F.ops kinds', rep.ops.map(o => o.kind).join(','));
  p('F.log rows', JSON.stringify(rep.log.map(e => [e.seq, e.kind, String(e.id), String(e.state)])));
  p('F.rollback', rep.rollback.length);
  p('F.pending after K-3', cm.pending.length);
  p('F.calls c/r', cCalls + '/' + rCalls);
}
