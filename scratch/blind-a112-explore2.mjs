// Blind exploration probe 2 (A112 re-run) — observation only.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const p = (k, v) => console.log(String(k).padEnd(42), typeof v === 'string' ? v : JSON.stringify(v));

// ---- A: handle identity, in-place mutation of pending, delivery timing
{
  const s = store.storeCreate({ journalLength: 8, listeners: [] });
  let calls = 0;
  const body = () => { calls += 1; return true; };
  const h1 = register(s, ['a'], 'c', body);
  const h2 = register(s, ['a'], 'c', body);
  p('A.pair-idempotent same handle', String(h1) === String(h2));
  const h3 = register(s, ['a'], 'd', () => true);
  p('A.different id same handle', String(h1) === String(h3));
  const hListen = store.listen(s, ['a']);
  p('A.listen handle === K-1 handle', String(hListen) === String(h1));

  const cm = commit(s, ['a'], 'mem', 7);
  p('A.triggered.length', cm.triggered.length);
  p('A.pending.length at K-2', cm.pending.length);
  p('A.pending holds triggered[0]', cm.pending.some(x => String(x) === String(cm.triggered[0])));
  p('A.body calls at K-2', calls);
  const pendBefore = cm.pending.length;
  const rep = runAttempt(s, cm);
  p('A.report.outcome', rep.outcome);
  p('A.body calls after K-3', calls);
  p('A.pending after K-3 (same array read)', cm.pending.length);
  p('A.pending was', pendBefore);
  p('A.report.log kinds', rep.log.map(e => e.kind).join(','));
  p('A.log ids', rep.log.map(e => String(e.id)).join(','));
  p('A.log states', rep.log.map(e => String(e.state)).join(','));
  p('A.ops kinds', rep.ops.map(o => o.kind).join(','));
  const ctx = null;
}

// ---- B: a plain listener registered through store.listen + instance.register, and a throwing one
{
  const s = store.storeCreate({ journalLength: 8, listeners: [] });
  let plainCalls = 0;
  const plainHandle = store.listen(s, ['b']);
  s.register(plainHandle, () => { plainCalls += 1; });
  const cm = commit(s, ['b'], 'mem', 1);   // no kernel pair registered at ['b']
  p('B.commit ok (no pairs)', Object.keys(cm).sort().join(','));
  p('B.triggered.length', cm.triggered.length);
  p('B.plain calls after K-2', plainCalls);
  p('B.pending.length after K-2', cm.pending.length);
  const rep = runAttempt(s, cm);
  p('B.report.outcome', rep.outcome);
  p('B.plain calls after K-3', plainCalls);
}

// ---- C: throwing listener body at a kernel write
{
  const s = store.storeCreate({ journalLength: 8, listeners: [] });
  const throwing = store.listen(s, ['c']);
  s.register(throwing, () => { throw new Error('throw-from-listener'); });
  let threw = 'none';
  try {
    commit(s, ['c'], 'mem', 1);
  } catch (e) {
    threw = String(e && (e.message || e.status));
  }
  p('C.commit outcome with throwing listener', threw);
}

// ---- D: a pair whose address the write does not touch (ancestor pair) stays in pending
{
  const s = store.storeCreate({ journalLength: 8, listeners: [] });
  let ancCalls = 0;
  register(s, ['a'], 'cL', () => { ancCalls += 1; return true; });   // ancestor pair
  let childCalls = 0;
  const cm = commit(s, ['a', 'b'], 'mem', 5);                        // write at descendant
  p('D.triggered.length at descendant write', cm.triggered.length);
  p('D.pending.length at K-2', cm.pending.length);
  p('D.ancestor body calls at K-2', ancCalls);
  const rep = runAttempt(s, cm);
  p('D.report.outcome', rep.outcome);
  p('D.ancestor body calls after K-3', ancCalls);
  p('D.pending.length after K-3', cm.pending.length);
  p('D.log kinds', rep.log.map(e => e.kind).join(','));
  p('D.log ids', rep.log.map(e => String(e.id)).join(','));
}

// ---- E: failing constraint, no repair — what pending reads afterwards and what is thrown
{
  const s = store.storeCreate({ journalLength: 8, listeners: [] });
  let calls = 0;
  register(s, ['e'], 'c', () => { calls += 1; return { message: 'nope' }; });
  const cm = commit(s, ['e'], 'mem', 3);
  p('E.triggered.length', cm.triggered.length);
  p('E.pending.length at K-2', cm.pending.length);
  let thrown = null;
  try { runAttempt(s, cm); } catch (e) { thrown = e; }
  p('E.thrown status', thrown && thrown.status);
  p('E.thrown keys', thrown && Object.keys(thrown).sort().join(','));
  p('E.thrown log kinds', thrown && thrown.log && thrown.log.map(x => x.kind).join(','));
  p('E.thrown log states', thrown && thrown.log && thrown.log.map(x => String(x.state)).join(','));
  p('E.rollback steps in thrown?', thrown && ('rollback' in thrown));
  p('E.pending after failed K-3', cm.pending.length);
  p('E.calls', calls);
}
