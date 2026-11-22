// probe (gate 6, second run), part 4 — the settled `K-2` hold arm: a fresh `K-2` at an address whose earlier
// attempt reached its terminal arm while leaving its own commit-registry entry standing.  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-hold-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: 64, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status, msg: e.message }; } };

console.log('== H1. live attempt open: second K-2 refused KC-7 ==');
{
  const s = mk();
  K1(s, ['a'], 'x', () => true);
  const c1 = K2(s, ['a'], 'mem', 1);           // opened, NOT run: the attempt is live
  console.log(`second K-2 while live = ${JSON.stringify(grab(() => K2(s, ['a'], 'mem', 2)))}`);
  K3(s, c1);
  console.log(`after the terminal arm, K-2 = ${JSON.stringify(grab(() => { const c = K2(s, ['a'], 'mem', 2); return { opId: c.op.opId, pending: c.pending.length }; }))}`);
}

console.log("\n== H2. failure arm: a failed attempt whose composition threw, leaving its commit-registry entry ===");
{
  const s = mk();
  for (let i = 0; i < 8; i += 1) write(s, ['a'], 'mem', i + 1);   // so a compacted base stands under ['a']
  K1(s, ['a'], 'x', (ctx) => (ctx.value === 99
    ? { message: 'x bad', repair: () => { const w = write(s, ['a', 'b'], 'mem', 1); return { ok: true, op: w.op }; } }
    : true));
  K1(s, ['a'], 'z', () => ({ message: 'z bad' }));                // no repair: the re-run halts here
  const c = K2(s, ['a'], 'mem', 99);
  let t = null; try { K3(s, c); } catch (e) { t = e; }
  const rep = K5(s, c.attempt);
  console.log(`attempt status=${t && t.status} steps=${JSON.stringify(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed })))}`);
  console.log(`read ['a'] after the failure = ${JSON.stringify(grab(() => read(s, ['a'])))}`);
  console.log(`a fresh K-2 at ['a'] after the terminal arm = ${JSON.stringify(grab(() => { const c2 = K2(s, ['a'], 'mem', 5); return { opId: c2.op.opId }; }))}`);
  // and after seeding the address again through the store's own verb
  console.log(`write via the store's own verb = ${JSON.stringify(grab(() => write(s, ['a'], 'mem', 5).op.opId))}`);
  console.log(`then K-2 at ['a'] = ${JSON.stringify(grab(() => { const c3 = K2(s, ['a'], 'mem', 6); return { opId: c3.op.opId }; }))}`);
  console.log(`then K-3 = ${JSON.stringify(grab(() => K3(s, c3v).outcome))}`);
}
