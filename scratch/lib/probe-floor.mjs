// probe (gate 6, second run) — is the store's compacted floor reachable from the caller's own acts at
// this build, and what does a `rollback` over a still-owed op answer once an earlier call reported it
// undone?  Read-only experiment beside the driver; it mints no cell and no claim.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const { storeCreate, write, read, rollback } = pkg;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-floor-'));
let n = 0;
const mk = (jl) => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: jl, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status, msg: e.message }; } };

console.log('== A. does a small journalLength compact an entry? ==');
for (const jl of [2, 3, 4, 8, 64]) {
  const s = mk(jl);
  const ops = [];
  for (let i = 0; i < 8; i += 1) ops.push(write(s, ['a'], 'mem', i + 1).op);
  const compacted = ops.map((o) => o.compacted);
  // roll back the OLDEST op: if a compacted base exists in its candidate set the verb answers RollbackCompacted
  const rb1 = grab(() => rollback(s, ops[0].opId));
  console.log(`journalLength=${jl} ops=${ops.length} compacted-flags=${JSON.stringify(compacted)} rollback(oldest ${ops[0].opId})=${JSON.stringify(rb1.ok ? rb1.v : rb1.status)}`);
}

console.log('\n== B. rollback over an op an earlier call already reported undone ==');
{
  const s = mk(64);
  const ops = [];
  for (let i = 0; i < 8; i += 1) ops.push(write(s, ['a'], 'mem', i + 1).op);
  const newest = ops[ops.length - 1].opId;
  const r1 = grab(() => rollback(s, newest));
  console.log(`first call over ${newest}: ${JSON.stringify(r1.ok ? { undoneOps: r1.v.undoneOps, restoredTo: r1.v.restoredTo } : r1.status)}`);
  const second = ops[ops.length - 2].opId;
  const r2 = grab(() => rollback(s, second));
  console.log(`second call over ${second} (already reported undone by the first): ${JSON.stringify(r2.ok ? { undoneOps: r2.v.undoneOps, restoredTo: r2.v.restoredTo } : r2.status)}`);
}

console.log('\n== C. does the KERNEL reach the floor at all: a repair landing OUTSIDE the attempt address ==');
{
  const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
  const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
  const s = mk(4);
  for (let i = 0; i < 8; i += 1) write(s, ['a'], 'mem', i + 1);
  const seed = read(s, ['a']);
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 5
    ? { message: 'too large', repair: () => { const w = write(s, ['a', 'b'], 'mem', 1); return { ok: true, op: w.op }; } }
    : true));
  const c = K2(s, ['a'], 'mem', 9);
  let t = null; try { K3(s, c); } catch (e) { t = e; }
  const rep = K5(s, c.attempt);
  console.log(`seed read=${JSON.stringify(seed)} attempt status=${t && t.status}`);
  console.log(`steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, answer: x.answer, failed: x.failed, undoneOps: x.undoneOps })))}`);
  console.log(`ops=${JSON.stringify(rep.ops.map((o) => ({ opId: o.opId, address: o.address })))}`);
  const rd = grab(() => read(s, ['a']));
  console.log(`read ['a'] after=${JSON.stringify(rd.ok ? rd.v : rd.status)}  read ['a','b'] after=${JSON.stringify(grab(() => read(s, ['a', 'b'])).v ?? 'threw')}`);
}

console.log('\n== D. what does rollback answer over an opid the journal no longer holds (JournalOpUnknown)? ==');
{
  const s = mk(4);
  for (let i = 0; i < 8; i += 1) write(s, ['a'], 'mem', i + 1);
  console.log(`rollback('op-999')=${JSON.stringify(grab(() => rollback(s, 'op-999')))}`);
}
