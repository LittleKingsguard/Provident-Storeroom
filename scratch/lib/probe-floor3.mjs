// probe (gate 6, second run), part 3 — the floor's own shape (which opId meets it after N writes) and an
// attempt whose composition has TWO still-owed ops in DIFFERENT subtrees (the only shape the skip rule
// leaves for a second call).  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read, rollback } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-floor3-'));
let n = 0;
const mk = (jl) => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: jl, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status }; } };
const ansi = (r) => (r.ok ? `ok[${r.v.undoneOps.length}]` : r.status);

console.log('== E5. journalLength=64, N writes at [a]: rollback each op, newest first ==');
for (const count of [6, 8, 10, 16, 40]) {
  const s = mk(64);
  const ops = [];
  for (let i = 0; i < count; i += 1) ops.push(write(s, ['a'], 'mem', i + 1).op);
  const out = [];
  for (let i = ops.length - 1; i >= 0; i -= 1) out.push(`${i}:${ansi(grab(() => rollback(s, ops[i].opId)))}`);
  console.log(`count=${count} newest→oldest: ${out.join(' ')}`);
}

console.log("\n== E4. the kernel's composition with two still-owed ops in DIFFERENT subtrees ==");
for (const jl of [4, 8, 64]) {
  for (const count of [4, 8, 20]) {
    const s = mk(jl);
    for (let i = 0; i < count; i += 1) write(s, ['a'], 'mem', { n: i });
    write(s, ['a', 'b'], 'mem', { b: 0 });
    // pair at ['a'] whose repair lands at ['a','b']; the re-run then violates a pair with NO repair
    K1(s, ['a'], 'x', (ctx) => (ctx.value && ctx.value.n === 99
      ? { message: 'x bad', repair: () => { const w = write(s, ['a', 'b'], 'mem', { b: 7 }); return { ok: true, op: w.op }; } }
      : true));
    K1(s, ['a'], 'z', () => ({ message: 'z bad' }));
    const c = grab(() => K2(s, ['a'], 'mem', { n: 99 }));
    if (!c.ok) { console.log(`jl=${jl} count=${count} K-2 refused ${c.status}`); continue; }
    let t = null; try { K3(s, c.v); } catch (e) { t = e; }
    const rep = K5(s, c.v.attempt);
    console.log(`jl=${jl} count=${count} status=${t && t.status} msg=${JSON.stringify(t && t.message)}`);
    console.log(`   ops=${JSON.stringify(rep.ops.map((o) => [o.opId, o.address]))} steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps.length, rest: x.restoredTo })))}`);
  }
}
