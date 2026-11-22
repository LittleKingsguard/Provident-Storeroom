// Blind exploration probe (A112 re-run) — observation only, imports the two documented modules.
import * as store from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';

const out = [];
const rec = (name, v) => out.push([name, v]);

const s = store.storeCreate({ journalLength: 8, listeners: [] });

const events = [];
let calls = 0;
const c = (ctx) => { calls += 1; events.push(['constraint-body', calls, JSON.stringify(ctx)]); return true; };

const h = register(s, ['a'], 'c', c);
rec('register handle type', typeof h);
rec('register handle value', String(h));

// plain listener through the store's own instance member
let plainCalls = 0;
let plainHandle = null;
try {
  plainHandle = s.on(['a'], (addr) => { plainCalls += 1; events.push(['plain-body', JSON.stringify(addr)]); });
  rec('on handle', String(plainHandle));
  rec('on handle === register handle', String(plainHandle) === String(h));
} catch (e) {
  rec('on error', e && (e.status || e.message));
}

const cm = commit(s, ['a'], 'mem', 42);
rec('commit keys', Object.keys(cm).sort());
rec('commit.triggered', JSON.stringify(cm.triggered));
rec('commit.pending', JSON.stringify(cm.pending));
rec('constraint calls at K-2 return', calls);
rec('plain calls at K-2 return', plainCalls);
rec('events at K-2 return', JSON.stringify(events));

const rep = runAttempt(s, cm);
rec('runAttempt keys', Object.keys(rep).sort());
rec('report.outcome', rep.outcome);
rec('report.ops kinds', JSON.stringify(rep.ops.map(o => o.kind)));
rec('report.log', JSON.stringify(rep.log.map(e => ({ seq: e.seq, kind: e.kind, id: e.id, state: e.state }))));
rec('report.rollback', JSON.stringify(rep.rollback));
rec('constraint calls after K-3', calls);
rec('plain calls after K-3', plainCalls);
rec('events after K-3', JSON.stringify(events));

const l = log(s, rep.attempt);
rec('log length', l.length);
const r2 = report(s, rep.attempt);
rec('report(closed).outcome', r2.outcome);
rec('report(closed) === report', JSON.stringify(r2) === JSON.stringify(rep));

for (const [k, v] of out) console.log(k.padEnd(36), v);
