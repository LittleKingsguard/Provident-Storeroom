// probe (gate 6, second run), part 5 — the K-2 hold arm, cleanly: an attempt that FAILS with residue and
// leaves its commit-registry entry standing, then a fresh K-2 at the same address.  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-hold2-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: 64, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status, msg: e.message }; } };

console.log('== H3. an object at [a] so a repair may land at [a,b]; the attempt fails UNREPAIRABLY (arm c, KC-3) ==');
{
  const s = mk();
  const seed = write(s, ['a'], 'mem', { n: 0 }).op;         // object at ['a'] so ['a','b'] is writable
  for (let i = 0; i < 8; i += 1) write(s, ['a'], 'mem', { n: i + 1 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value && ctx.value.n === 99
    ? { message: 'x bad', repair: () => { const w = write(s, ['a', 'b'], 'mem', { b: 7 }); return { ok: true, op: w.op }; } }
    : true));
  K1(s, ['a'], 'z', (ctx) => (ctx.value && ctx.value.b !== 7 ? true : { message: 'z bad' }));  // violates the repaired landing
  const c = grab(() => K2(s, ['a'], 'mem', { n: 99 }));
  let t = null; try { K3(s, c.v); } catch (e) { t = e; }
  const rep = K5(s, c.v.attempt);
  console.log(`attempt status=${t && t.status} msg=${JSON.stringify(t && t.message)}`);
  console.log(`ops=${JSON.stringify(rep.ops.map((o) => [o.opId, o.address]))}`);
  console.log(`steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps, rest: x.restoredTo })))}`);
  console.log(`read ['a'] after = ${JSON.stringify(grab(() => read(s, ['a'])))}`);
  const c2 = grab(() => K2(s, ['a'], 'mem', { n: 5 }));
  console.log(`a FRESH K-2 at ['a'] after the terminal arm = ${JSON.stringify(c2.ok ? { opId: c2.v.op.opId } : c2)}`);
  if (c2.ok) { const r2 = grab(() => K3(s, c2.v)); console.log(`   its K-3 = ${JSON.stringify(r2.ok ? r2.v.outcome : r2.status)}`); }
}

console.log('\n== H4. the residue arm proper: a call that THREW (KC-8), then a fresh K-2 at the same address ==');
{
  const s = mk();
  write(s, ['a'], 'mem', { n: 0 });
  for (let i = 0; i < 8; i += 1) write(s, ['a'], 'mem', { n: i + 1 });
  write(s, ['a', 'b'], 'mem', { b: 0 });
  K1(s, ['a'], 'x', (ctx) => (ctx.value && ctx.value.n === 99
    ? { message: 'x bad', repair: () => { const w = write(s, ['a', 'b'], 'mem', { b: 7 }); return { ok: true, op: w.op }; } }
    : true));
  K1(s, ['a'], 'z', () => ({ message: 'z bad' }));                 // no repair -> the re-run halts at z
  const c = grab(() => K2(s, ['a'], 'mem', { n: 99 }));
  let t = null; try { K3(s, c.v); } catch (e) { t = e; }
  const rep = K5(s, c.v.attempt);
  console.log(`attempt status=${t && t.status}`);
  console.log(`steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps.length })))}`);
  console.log(`outcome entries=${JSON.stringify(t && t.log.filter((e) => e.kind === 'outcome'))}`);
  const c2 = grab(() => K2(s, ['a'], 'mem', { n: 5 }));
  console.log(`a FRESH K-2 at ['a'] after that arm = ${JSON.stringify(c2.ok ? { opId: c2.v.op.opId } : c2)}`);
}
