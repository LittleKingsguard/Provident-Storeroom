// GATE 6 — U-STOREROOM-CONSTRAINTS, caller-side library surface. Independent live probe (probe A).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { storeCreate, write as sWrite, read as sRead, rollback as sRollback, listen as sListen } from 'provident-storeroom';
import { register, commit, runAttempt, log as kLog, report as kReport } from './bindings/js/src/constraint-kernel.mjs';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-g6-'));
const mk = () => storeCreate({ filePath: path.join(dir, `s-${Math.random().toString(36).slice(2)}.json`), journalLength: 64, listeners: [] });

const out = [];
const p = (s) => out.push(s);

// --- P1: what does a plain caller store.write answer, and does it invoke a body? ---
{
  const s = mk();
  let plainRuns = 0, addrSeen = [];
  const h = s.on(['a'], (a) => { plainRuns++; addrSeen.push(a); });
  const w = sWrite(s, ['a'], 'mem', 1);
  p(`P1 write.triggered=${w.triggered.length} watched=${JSON.stringify(w.watched)} plainRuns=${plainRuns} args=${JSON.stringify(addrSeen)}`);
  // listen() then instance.register(handle, fn)
  let regRuns = 0;
  const h2 = sListen(s, ['a']);
  s.register(h2, (a) => { regRuns++; addrSeen.push(a); });
  const w2 = sWrite(s, ['a'], 'mem', 2);
  p(`P1b registered-body runs=${regRuns} triggered=${w2.triggered.length} same-handle=${h2 === h} args=${JSON.stringify(addrSeen)}`);
  p(`P1c handle types: on-handle=${typeof h} listen-handle=${typeof h2} equal=${String(h) === String(h2)}`);
}

// --- P2: K-2 with a kernel registration only: pending vs triggered ---
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large' } : undefined));
  const c = commit(s, ['a'], 'mem', 1);
  p(`P2 commit keys=${Object.keys(c).join(',')} triggered=${c.triggered.length} pending=${c.pending.length} opId=${c.op.opId}`);
  const r = runAttempt(s, c);
  p(`P2 report keys=${Object.keys(r).join(',')} outcome=${r.outcome} ops=${JSON.stringify(r.ops.map(o=>o.opId))} log=${JSON.stringify(r.log.map(e=>[e.seq,e.kind,e.id,e.opId,e.state]))}`);
  p(`P2 K-4 len=${kLog(s, c.attempt).length} K-5 same=${kReport(s, c.attempt).outcome}`);
}

// --- P3: caller-side plain listener + K-2: pending? ---
{
  const s = mk();
  let runs = 0;
  s.on(['a'], () => { runs++; });
  register(s, ['a'], 'x', () => undefined);
  const c = commit(s, ['a'], 'mem', 1);
  p(`P3 triggered=${c.triggered.length} pending=${c.pending.length} plain-body-runs-by-K-2-return=${runs}`);
  runAttempt(s, c);
  p(`P3 after K-3 pending=${c.pending.length} plain runs=${runs}`);
}

// --- P4: two commits in one tick at one address (KC-7 timing) ---
{
  const s = mk();
  register(s, ['a'], 'x', () => undefined);
  const c1 = commit(s, ['a'], 'mem', 1);
  let second;
  try { second = { ret: commit(s, ['a'], 'mem', 2) }; } catch (e) { second = { threw: e.status, msg: e.message }; }
  p(`P4 same-tick second K-2 = ${JSON.stringify(second).slice(0, 200)}`);
  runAttempt(s, c1);
  let third;
  try { third = { ret: commit(s, ['a'], 'mem', 3) }; } catch (e) { third = { threw: e.status }; }
  p(`P4 later-tick (after terminal) second K-2 = ${JSON.stringify(third).slice(0, 160)}`);
}

// --- P5: checkpoint reachability — a repair that lands at the attempt address ---
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: (rctx) => { const w = sWrite(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } } : undefined));
  const c = commit(s, ['a'], 'mem', 99);
  const r = runAttempt(s, c);
  p(`P5 outcome=${r.outcome} ops=${JSON.stringify(r.ops.map(o=>o.opId))} rollback=${JSON.stringify(r.rollback)} log=${JSON.stringify(r.log.map(e=>[e.seq,e.kind,e.id,e.opId]))}`);
  p(`P5 read after = ${JSON.stringify(sRead(s, ['a']))}`);
}

// --- P6: a failing repair whose store verb refuses (WriteParentNotLink) ---
{
  const s = mk();
  const thrownInBody = {};
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => { const w = sWrite(s, ['a','b'], 'mem', 1); return { ok: true, op: w.op }; } } : undefined));
  const c = commit(s, ['a'], 'mem', 99);
  let caught;
  try { runAttempt(s, c); } catch (e) { caught = e; }
  p(`P6 threw status=${caught && caught.status} keys=${caught && Object.keys(caught).join(',')} msg=${caught && caught.message}`);
  const rep = kReport(s, c.attempt);
  p(`P6 report outcome=${rep.outcome} log=${JSON.stringify(rep.log)}`);
}

// --- P7: repair returns {ok:false,message} ---
{
  const s = mk();
  register(s, ['a'], 'x', (ctx) => (ctx.value > 10 ? { message: 'too large', repair: () => ({ ok: false, message: 'attempted to clamp at 5 and was refused' }) } : undefined));
  const c = commit(s, ['a'], 'mem', 99);
  let caught;
  try { runAttempt(s, c); } catch (e) { caught = e; }
  p(`P7 threw status=${caught && caught.status} log=${JSON.stringify(caught && caught.log)}`);
}

console.log(out.join('\n'));
