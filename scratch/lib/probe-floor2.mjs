// probe (gate 6, second run) — which opIds answer the store's RollbackCompacted, and can the KERNEL's
// composition (as the settled law composes it) reach that floor at all?  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read, rollback } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-floor2-'));
let n = 0;
const mk = (jl) => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: jl, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status }; } };
const ansi = (r) => (r.ok ? `ok(${JSON.stringify(r.v.undoneOps)})` : r.status);

console.log('== E1. which opIds meet the floor (journalLength=4, 9 writes at [\'a\']) ==');
for (const count of [6, 9, 12]) {
  const s = mk(4);
  const ops = [];
  for (let i = 0; i < count; i += 1) ops.push(write(s, ['a'], 'mem', i + 1).op);
  const out = ops.map((o, i) => `${i}=${ansi(grab(() => rollback(s, o.opId)))}`);
  console.log(`count=${count}\n  ${out.join('\n  ')}`);
}

console.log('\n== E2. store shape: leaf then child ==');
{
  const s = mk(64);
  console.log(`write leaf at ['a']=${JSON.stringify(grab(() => write(s, ['a'], 'mem', 1).op.opId))}`);
  console.log(`write child at ['a','b'] after a leaf=${JSON.stringify(grab(() => write(s, ['a', 'b'], 'mem', 1)))}`);
  const s2 = mk(64);
  console.log(`write obj at ['a']=${JSON.stringify(grab(() => write(s2, ['a'], 'mem', { o: 1 }).op.opId))}`);
  console.log(`write child at ['a','b'] under an object=${JSON.stringify(grab(() => write(s2, ['a', 'b'], 'mem', 1).op.opId))}`);
}

console.log("\n== E3. can the KERNEL's composition reach the floor in an attempt whose ops span two addresses? ==");
for (const jl of [4, 8, 64]) {
  for (const count of [6, 9, 20]) {
    const s = mk(jl);
    let seed = null;
    for (let i = 0; i < count; i += 1) seed = write(s, ['a'], 'mem', { n: i }).op;
    write(s, ['a', 'b'], 'mem', 1);
    // a pair at ['a'] whose repair lands at ['a','b'] (a sibling subtree of the attempt's own op)
    K1(s, ['a'], 'x', (ctx) => (ctx.value && ctx.value.n === 99
      ? { message: 'too large', repair: () => { const w = write(s, ['a', 'b'], 'mem', 7); return { ok: true, op: w.op }; } }
      : true));
    const c = grab(() => K2(s, ['a'], 'mem', { n: 99 }));
    if (!c.ok) { console.log(`jl=${jl} count=${count} K-2 refused ${c.status}`); continue; }
    let t = null; try { K3(s, c.v); } catch (e) { t = e; }
    const rep = K5(s, c.v.attempt);
    console.log(`jl=${jl} count=${count} status=${t && t.status} ops=${JSON.stringify(rep.ops.map((o) => [o.opId, o.address]))} steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps.length })))}`);
  }
}
