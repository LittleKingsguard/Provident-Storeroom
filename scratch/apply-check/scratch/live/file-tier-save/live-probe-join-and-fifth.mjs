#!/usr/bin/env node
// ---------------------------------------------------------------------------
// GATE 6 — LIVE DIAGNOSTIC 2: (a) the repair-join's firing order and count,
// (b) the fifth position with a FOREIGN `pending` (the spec's OPEN wider class),
// (c) the two saves of one record.  Values printed are the live package's own.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const PKG = await import(pathToFileURL(path.join(ROOT, 'bindings/js/index.mjs')).href);
const K = await import(pathToFileURL(path.join(ROOT, 'bindings/js/src/constraint-kernel.mjs')).href);
const require = createRequire(import.meta.url);
const ADDON = require(path.join(ROOT, 'bindings/js/build/Release/storeroom_js_binding.node'));
const RUNROOT = path.join(HERE, 'fs', `probe2-${Date.now()}`);
fs.mkdirSync(RUNROOT, { recursive: true });
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const show = (v) => JSON.stringify(v);

console.log('== F5: THE REPAIR JOIN, THE ROUTE THE CLAUSE NAMES ======================');
{
  const d = path.join(RUNROOT, 'f5'); fs.mkdirSync(d);
  const P = path.join(d, 'join.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const fires = [];
  let rcSeen = null;
  K.register(s, ['c'], 'c1', (ctx) => {
    if (ctx.value <= 10) return true;
    return { message: 'too large', repair: (rc) => {
      rcSeen = rc;
      const w = tryCall(() => PKG.write(s, ['c'], 'file', 10, rc));   // the clause's own route
      return w.ok ? { ok: true, op: w.v.op } : { ok: false };
    } };
  });
  const h = PKG.listen(s, ['c']);
  s.register(h, (addr) => { fires.push([addr, fs.readFileSync(P, 'utf8')]); });
  const rec = K.commit(s, ['c'], 'file', 99);
  const out = tryCall(() => K.runAttempt(s, rec));
  console.log(`outcome=${out.ok ? out.v.outcome : show(out.v)} ops=${out.ok ? out.v.ops.length : '-'}`);
  console.log(`listener fires (address, file bytes at that instant): ${show(fires)}`);
  console.log(`file bytes after the pass = ${show(fs.readFileSync(P, 'utf8'))}`);
  console.log(`rc.op.opId=${show(rcSeen && rcSeen.op && rcSeen.op.opId)} rc.pending.length=${rcSeen && rcSeen.pending && rcSeen.pending.length}`);
  const ops = out.ok ? out.v.ops.map((o) => [o.opId, o.kind, o.address, o.seq]) : [];
  console.log(`ops = ${show(ops)}`);
  console.log(`log = ${out.ok ? show(out.v.log.map((e) => [e.kind, e.state, e.opId, e.message])) : '-'}`);
}

console.log('\n== F6: THE FIFTH POSITION VS A FOREIGN `pending` (the OPEN wider class) ==');
{
  const d = path.join(RUNROOT, 'f6'); fs.mkdirSync(d);
  const P = path.join(d, 'foreign.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const other = PKG.storeCreate({ filePath: path.join(d, 'other.json'), journalLength: 8, listeners: [] });
  const foreign = PKG.listen(other, ['c']);       // a handle the FIRST instance was never handed
  const r = tryCall(() => PKG.write(s, ['c'], 'file', 1, { pending: [foreign] }));
  console.log(`write with { pending: [<a handle this instance never minted>] } -> ${r.ok ? `PROCEEDED ${show(r.v.op.opId)}` : `REFUSED ${r.v && r.v.message}`}`);
  const r2 = tryCall(() => PKG.write(s, ['c'], 'file', 2, { pending: [{ notAHandle: true }] }));
  console.log(`write with { pending: [{ notAHandle: true }] } -> ${r2.ok ? `PROCEEDED ${show(r2.v.op.opId)}` : `REFUSED ${r2.v && r2.v.message}`}`);
  const r3 = tryCall(() => PKG.write(s, ['c'], 'file', 3, { pending: [] }));
  console.log(`write with { pending: [] } -> ${r3.ok ? `PROCEEDED ${show(r3.v.op.opId)}` : `REFUSED ${r3.v && r3.v.message}`}`);
  console.log(`file bytes = ${show(fs.readFileSync(P, 'utf8'))}`);
}

console.log('\n== F7: ONE RECORD, TWO SAVES ============================================');
{
  const d = path.join(RUNROOT, 'f7'); fs.mkdirSync(d);
  const P = path.join(d, 'twice.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s, ['c'], 'c1', () => true);
  const rec = K.commit(s, ['c'], 'file', 6);
  const first = tryCall(() => K.runAttempt(s, rec));
  const after1 = fs.readFileSync(P, 'utf8');
  PKG.write(s, ['c'], 'file', 7);                       // a memory-only change after the save
  const again = tryCall(() => K.runAttempt(s, rec));
  console.log(`first drive = ${first.ok ? first.v.outcome : show(first.v)} ; bytes after 1st = ${show(after1)}`);
  console.log(`re-drive = ${again.ok ? `RESOLVED ${show(again.v.outcome)}` : `REFUSED ${show(again.v && [again.v.status, again.v.message])}`}`);
  console.log(`bytes after re-drive = ${show(fs.readFileSync(P, 'utf8'))}`);
}

console.log("\n== F8: THE SAVE'S OWN ARM ON THE FAILING PATH, READ INSIDE THE CATCH ====");
{
  const d = path.join(RUNROOT, 'f8'); fs.mkdirSync(d);
  const P = path.join(d, 'arm.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  fs.rmSync(P); fs.mkdirSync(P);
  K.register(s, ['b'], 'cB', () => true);
  const rec = K.commit(s, ['b'], 'file', 222);
  let caught = null; let inside = null;
  try { K.runAttempt(s, rec); } catch (e) { caught = e; }
  const lg = tryCall(() => K.log(s, rec.attempt));
  const rp = tryCall(() => K.report(s, rec.attempt));
  inside = { log: lg.ok ? lg.v.map((e) => [e.kind, e.state]) : null, report: rp.ok ? [rp.v.outcome, rp.v.rollback] : null };
  console.log(`thrown = ${show(caught && [caught.status, caught.message])}`);
  console.log(`inside/after the catch: ${show(inside)}`);
  console.log(`the failing store's own register reads (['b']) = ${show(tryCall(() => PKG.read(s, ['b'])).v && 'AddressNotFound expected')}`);
}

console.log(`\nFIXTURES LEFT AT ${RUNROOT}`);
void ADDON;
