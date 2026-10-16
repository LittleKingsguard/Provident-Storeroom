// scratch probe (blind greens author): record every value the four owed cells will assert.
// imports and DRIVES the package/kernel; reads no implementation source.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const PKG = await import('../../bindings/js/index.mjs');
const K = await import('../../bindings/js/src/constraint-kernel.mjs');
const desc = (e) => (e && e.status ? `${e.constructor.name} status=${JSON.stringify(e.status)} message=${JSON.stringify(e.message)}` : String(e && e.message));
const dirs = [];
const tmp = () => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-probe-')); dirs.push(d); return d; };
const C = (ok, detail) => console.log(`  ${ok ? 'OK  ' : 'RED '} ${detail}`);

// ---------------------------------------------------------------- A: passing-arm commit entry
{
  console.log('\n== A. passing-arm `commit` entry (surface.md §2.11 cl. 2; kernel-surface.md §2.1 item 3) ==');
  const d = tmp(); const P = path.join(d, 'p.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const h = K.register(s, ['c'], 'c1', () => true);
  const rec = K.commit(s, ['c'], 'file', 42);
  const rep = K.runAttempt(s, rec);
  const lg = K.log(s, rec.attempt);
  console.log('  kinds =', JSON.stringify(lg.map((e) => e.kind)));
  console.log('  entries =', JSON.stringify(lg));
  const commit = lg.filter((e) => e.kind === 'commit');
  C(commit.length === 1, `commit entries = ${commit.length}`);
  C(lg[lg.length - 1].kind === 'commit', `last kind = ${lg[lg.length - 1].kind}`);
  C(lg.filter((e) => e.kind === 'outcome').length === 0, `outcome entries = ${lg.filter((e) => e.kind === 'outcome').length}`);
  C(commit[0] && commit[0].id === null, `commit.id = ${JSON.stringify(commit[0] && commit[0].id)}`);
  C(commit[0] && commit[0].state === null, `commit.state = ${JSON.stringify(commit[0] && commit[0].state)}`);
  C(commit[0] && commit[0].opId === rep.ops[rep.ops.length - 1].opId,
    `commit.opId = ${JSON.stringify(commit[0] && commit[0].opId)} vs last op ${JSON.stringify(rep.ops[rep.ops.length - 1].opId)}`);
  C(lg.every((e, i) => e.seq === i + 1), `seq = ${JSON.stringify(lg.map((e) => e.seq))}`);
  C(lg.every((e) => Object.getOwnPropertyNames(e).length === 6),
    `member counts = ${JSON.stringify(lg.map((e) => Object.getOwnPropertyNames(e).length))} names=${JSON.stringify(Object.getOwnPropertyNames(lg[0]))}`);
  C(rep.outcome === 'passed', `report.outcome = ${JSON.stringify(rep.outcome)}`);
  void h;
}

// ---------------------------------------------------------------- B: mem-tier passing arm (control)
{
  console.log('\n== B. control: the `commit` entry on a mem-tier passing arm ==');
  const d = tmp(); const P = path.join(d, 'm.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s, ['m'], 'cM', () => true);
  const rec = K.commit(s, ['m'], 'mem', 3);
  const rep = K.runAttempt(s, rec);
  const lg = K.log(s, rec.attempt);
  console.log('  kinds =', JSON.stringify(lg.map((e) => e.kind)), 'outcome =', rep.outcome);
}

// ---------------------------------------------------------------- C: FTS-08.17/.18/.19
{
  console.log('\n== C. the entry-shape law (contract.md §7.2, items (a)/(b)/(c), ADDED 2026-10-16) ==');
  const one = (label, constraints) => {
    const d = tmp(); const P = path.join(d, 'e.json');
    let r;
    try { r = { ok: true, v: PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints }) }; }
    catch (e) { r = { ok: false, v: e }; }
    if (r.ok) {
      let reg, kc;
      try { reg = { ok: true, v: PKG.read(r.v, []) }; } catch (e) { reg = { ok: false, v: e }; }
      console.log(`  ${label}: INSTANCE ; file exists=${fs.existsSync(P)} register=${reg.ok ? JSON.stringify(reg.v) : desc(reg.v)} ; register carries a constraints key?=${reg.ok ? Object.prototype.hasOwnProperty.call(reg.v, 'constraints') : '-'}`);
    } else {
      console.log(`  ${label}: THREW ${desc(r.v)} ; file exists=${fs.existsSync(P)} ; message=${JSON.stringify(r.v && r.v.message)}`);
    }
  };
  one("[{address:['a'], id:''}] (a: empty-string id)", [{ address: ['a'], id: '' }]);
  one('[{address:[], id:"c1"}] (b: the empty address)', [{ address: [], id: 'c1' }]);
  one('[{address:[0], id:"c1"}] (b: the single integer segment)', [{ address: [0], id: 'c1' }]);
  one("pair carrying a third member (c)", [{ address: ['a'], id: 'c1', note: 'x' }]);
  one("control: [{address:['a']}] (id absent -> #16)", [{ address: ['a'] }]);
  one("[{address:['a'], id: 42}] (id not a string -> #16)", [{ address: ['a'], id: 42 }]);
}

// ---------------------------------------------------------------- D: FTS-07.11 (A120 (1): admission)
{
  console.log('\n== D. the wider class at the fifth position (surface.md §2.4 item 9 (g) item 2, re-spelt 2026-10-16) ==');
  const d = tmp(); const P = path.join(d, 'w.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const other = PKG.storeCreate({ filePath: path.join(d, 'other.json'), journalLength: 8, listeners: [] });
  const foreign = K.register(other, ['f'], 'cf', () => true);
  const foreignRec = K.commit(other, ['f'], 'mem', 1); // another instance's own record
  const foreignResidue = try_(() => foreignRec.pending);
  function try_(f) { try { return f(); } catch (e) { return `THREW ${desc(e)}`; } }
  const cases = [
    ['a context carrying ANOTHER instance\'s handle (pending: [foreignHandle])', { pending: [foreign] }],
    ['a context carrying ANOTHER instance\'s whole record', foreignRec],
    ['a context carrying a member that is NOT a handle at all (pending: [42, "x", null])', { pending: [42, 'x', null] }],
    ['a context carrying a plain object in pending', { pending: [{ notAHandle: true }] }],
    ['control: an object carrying no pending member', { op: 'op-1' }],
    ['control: a plain object carrying pending: []', { pending: [] }],
  ];
  for (const [label, v] of cases) {
    const r = try_(() => PKG.write(s, ['q'], 'file', 1, v));
    const ok = r && r.op;
    console.log(`  ${label}: ${ok ? `PROCEEDED op=${JSON.stringify(r.op.opId)}` : `refused/other: ${typeof r === 'string' ? r : desc(r)}`}`);
  }
  console.log('  foreign record own members =', JSON.stringify(Object.getOwnPropertyNames(foreignRec)));
  console.log('  foreign record pending =', JSON.stringify(foreignResidue, (k, x) => (typeof x === 'function' ? '[fn]' : x)));
  for (const dd of dirs) { try { fs.chmodSync(dd, 0o755); fs.rmSync(dd, { recursive: true, force: true }); } catch (e) { void e; } }
}
