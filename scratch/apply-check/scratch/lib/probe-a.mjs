import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { storeCreate, write as sWrite, read as sRead, listen as sListen, rollback as sRollback } from 'provident-storeroom';
import { register, commit, runAttempt, log as kLog, report as kReport } from '../../bindings/js/src/constraint-kernel.mjs';
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-g6-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(dir, `s${++n}.json`), journalLength: 64, listeners: [] });
const out = []; const p = (s) => out.push(s);

// P1: caller-side plain listener behaviour + pending
{
  const s = mk(); let plainRuns = 0; const seen = [];
  s.on(['a'], (a) => { plainRuns++; seen.push(JSON.stringify(a)); });
  const w = sWrite(s, ['a'], 'mem', 1);
  p(`P1 store.write: triggered=${w.triggered.length} watched=${JSON.stringify(w.watched)} plainBodyRuns=${plainRuns} arg=${JSON.stringify(seen)}`);
  let regRuns = 0; const h2 = sListen(s, ['a']); s.register(h2, () => { regRuns++; });
  const w2 = sWrite(s, ['a'], 'mem', 2);
  p(`P1b listen+register body runs=${regRuns} triggered=${w2.triggered.length}`);
  register(s, ['a'], 'x', () => true);
  let plain2 = 0; s.on(['a'], () => { plain2++; });
  const c = commit(s, ['a'], 'mem', 3);
  p(`P1c K-2: triggered=${c.triggered.length} pending=${c.pending.length} plainRunsTotal=${plainRuns} newPlainRuns=${plain2}`);
}
// P2 happy path
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large' } : true));
  const c = commit(s, ['a'], 'mem', 1);
  p(`P2 commit keys=${Object.keys(c).join(',')} attempt=${JSON.stringify(c.attempt)} triggered=${c.triggered.length} pending=${c.pending.length}`);
  const r = runAttempt(s, c);
  p(`P2 report keys=${Object.keys(r).join(',')} outcome=${r.outcome} ops=${JSON.stringify(r.ops.map(o=>o.opId))} rollback=${JSON.stringify(r.rollback)}`);
  p(`P2 log=${JSON.stringify(r.log)}`);
  p(`P2 K-4=${kLog(s,c.attempt).length} K-5=${kReport(s,c.attempt).outcome}`);
}
// P4 KC-7 timing
{
  const s = mk(); register(s, ['a'], 'x', () => true);
  const c1 = commit(s, ['a'], 'mem', 1);
  let second; try { second = 'RETURNED ' + JSON.stringify(Object.keys(commit(s, ['a'], 'mem', 2))); } catch (e) { second = 'THREW ' + e.status + ' :: ' + e.message; }
  p(`P4 same-tick second K-2: ${second}`);
  const r1 = runAttempt(s, c1);
  let third; try { third = 'RETURNED ' + JSON.stringify(Object.keys(commit(s, ['a'], 'mem', 3))); } catch (e) { third = 'THREW ' + e.status; }
  p(`P4 after terminal: ${third}`);
  let fourth; try { const c4 = commit(s, ['a'], 'mem', 4); runAttempt(s, c4); const c5 = commit(s, ['a'], 'mem', 5); fourth = 'second-in-tick-after-first-terminal = RETURNED'; } catch (e) { fourth = 'THREW ' + e.status; }
  p(`P4b: ${fourth}`);
}
// P5 checkpoint with a repair landing at the attempt address
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => { const w = sWrite(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } } : true));
  const c = commit(s, ['a'], 'mem', 99);
  const r = runAttempt(s, c);
  p(`P5 outcome=${r.outcome} ops=${JSON.stringify(r.ops.map(o=>o.opId))} rollback=${JSON.stringify(r.rollback)} read=${JSON.stringify(sRead(s,['a']))}`);
  p(`P5 log=${JSON.stringify(r.log.map(e=>[e.seq,e.kind,e.id,e.opId,e.message,e.state]))}`);
}
// P6 repair verb refused -> repair body throws
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => { const w = sWrite(s, ['a','b'], 'mem', 1); return { ok: true, op: w.op }; } } : true));
  const c = commit(s, ['a'], 'mem', 99);
  let caught; try { runAttempt(s, c); } catch (e) { caught = e; }
  p(`P6 threw=${JSON.stringify(caught)}`);
  const rep = kReport(s, c.attempt);
  p(`P6 report outcome=${rep.outcome} log=${JSON.stringify(rep.log)}`);
}
// P7 repair returns {ok:false,message}
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => ({ ok: false, message: 'attempted to clamp at 5 and was refused' }) } : true));
  const c = commit(s, ['a'], 'mem', 99);
  let caught; try { runAttempt(s, c); } catch (e) { caught = e; }
  p(`P7 threw status=${caught.status} keys=${Object.keys(caught).join(',')} log=${JSON.stringify(caught.log)}`);
}
// P8 repair returns {ok:true, op} but the store's write was refused inside the body: body catches and returns ok:false with the store's code
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => { try { sWrite(s, ['a','b'], 'mem', 1); return { ok: true }; } catch (e) { return { ok: false, message: 'refused: ' + e.status }; } } } : true));
  const c = commit(s, ['a'], 'mem', 99);
  let caught; try { runAttempt(s, c); } catch (e) { caught = e; }
  p(`P8 threw status=${caught.status} log=${JSON.stringify(caught.log)}`);
}
console.log(out.join('\n'));
