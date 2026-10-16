#!/usr/bin/env node
// ---------------------------------------------------------------------------
// GATE 6 — LIVE DIAGNOSTIC for the two cells where the live assembled package
// differs from the blind set: FTS-04.9 (the failed save's own record) and
// FTS-11.1/11.5 (the RepairContext at the fifth position).
// Read-only with respect to the repository: writes only under this directory.
// Every value printed here is a value the LIVE package produced.
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
const RUNROOT = path.join(HERE, 'fs', `probe-${Date.now()}`);
fs.mkdirSync(RUNROOT, { recursive: true });
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const show = (v) => { try { return JSON.stringify(v, (k, x) => (x instanceof Error ? `${x.constructor.name}: ${x.message}` : x)); } catch (e) { return String(v); } };

console.log(`== P1: THE FAILING SAVE'S OWN RECORD (FTS-04.9) ==========================`);
{
  const d = path.join(RUNROOT, 'p1'); fs.mkdirSync(d);
  const P = path.join(d, 'store.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.runAttempt(s, K.commit(s, ['a'], 'file', 111));
  let caught = null;
  fs.rmSync(P); fs.mkdirSync(P);                       // the image's place is now a directory
  K.register(s, ['b'], 'cB', () => true);
  const rec = K.commit(s, ['b'], 'file', 222);
  try { K.runAttempt(s, rec); } catch (e) { caught = e; }
  const lg = tryCall(() => K.log(s, rec.attempt));
  const rp = tryCall(() => K.report(s, rec.attempt));
  console.log(`thrown status = ${show(caught && caught.status)}`);
  console.log(`thrown members = ${caught ? Object.getOwnPropertyNames(caught).join(',') : '-'}`);
  console.log(`K.log(attempt) = ${show(lg.ok ? lg.v : lg.v)}`);
  console.log(`K.report(attempt) = ${show(rp.ok ? rp.v : rp.v)}`);
  const throwLog = caught && caught.log;
  console.log(`thrown.log = ${show(throwLog)}`);
}

console.log(`\n== P2: THE REPAIR'S CONTEXT AND THE FIFTH POSITION (FTS-11) ==============`);
{
  const d = path.join(RUNROOT, 'p2'); fs.mkdirSync(d);
  const P = path.join(d, 'join.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const seen = [];
  let fired = 0;
  K.register(s, ['c'], 'c1', (ctx) => {
    if (ctx.value <= 10) return true;
    return { message: 'too large', repair: (rc) => {
      seen.push({
        members: Object.getOwnPropertyNames(rc).sort().join(','),
        keys: Object.keys(rc).sort().join(','),
        pendingType: typeof rc.pending,
        pendingIsArray: Array.isArray(rc.pending),
        pendingLen: Array.isArray(rc.pending) ? rc.pending.length : null,
        pending: show(rc.pending),
        op: show(rc.op && rc.op.opId), address: show(rc.address), id: show(rc.id), value: show(rc.value), tier: show(rc.tier),
      });
      // THE CLAUSE'S OWN ROUTE: the repair's write carries the commit it was handed,
      // at the fifth position.  Issued with the context AS THE KERNEL HANDED IT.
      const w = tryCall(() => PKG.write(s, ['c'], 'file', 10, rc));
      seen[seen.length - 1].writeWithContext = w.ok ? `PROCEEDED ${show(w.v.op && w.v.op.opId)}` : `REFUSED ${w.v && w.v.constructor && w.v.constructor.name}: ${w.v && w.v.message}`;
      if (!w.ok) {
        const w2 = tryCall(() => PKG.write(s, ['c'], 'file', 10, { op: rc.op, address: rc.address, id: rc.id, value: rc.value, tier: rc.tier }));
        seen[seen.length - 1].writeWithFiveMemberLiteral = w2.ok ? `PROCEEDED ${show(w2.v.op && w2.v.op.opId)}` : `REFUSED ${w2.v && w2.v.message}`;
      }
      const w3 = tryCall(() => PKG.write(s, ['c'], 'file', 10, { pending: rc.pending }));   // the bare carrier, as the class test reads it
      seen[seen.length - 1].writeWithBarePending = w3.ok ? `PROCEEDED ${show(w3.v.op && w3.v.op.opId)}` : `REFUSED ${w3.v && w3.v.message}`;
      return { ok: true, op: (w.ok ? w.v.op : null) };
    } };
  });
  const h = PKG.listen(s, ['c']);
  s.register(h, () => { fired++; });
  const rec = K.commit(s, ['c'], 'file', 99);
  const out = tryCall(() => K.runAttempt(s, rec));
  console.log(`repair context, as the kernel handed it: ${show(seen)}`);
  console.log(`runAttempt outcome = ${out.ok ? out.v.outcome : show(out.v)} ; ops = ${out.ok ? show(out.v.ops.map((o) => [o.opId, o.address, o.value])) : '-'}`);
  console.log(`log kinds = ${out.ok ? show(out.v.log.map((e) => [e.kind, e.state, e.opId])) : '-'}`);
  console.log(`file bytes = ${show(fs.readFileSync(P, 'utf8'))} ; listener invocations = ${fired}`);
}

console.log(`\n== P3: THE FIVE-MEMBER LITERAL AND THE BARE CARRIER AT THE FIFTH POSITION ==`);
{
  const d = path.join(RUNROOT, 'p3'); fs.mkdirSync(d);
  const P = path.join(d, 'five.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const five = tryCall(() => PKG.write(s, ['c'], 'file', 10, { op: 'x', address: ['c'], id: 'c1', value: 10, tier: 'file' }));
  const bare = tryCall(() => PKG.write(s, ['c'], 'file', 11, { pending: [] }));
  const bareUndef = tryCall(() => PKG.write(s, ['c'], 'file', 12, { pending: undefined }));
  console.log(`five-member literal {op,address,id,value,tier} -> ${five.ok ? 'PROCEEDED' : `REFUSED TypeError: ${five.v && five.v.message}`}`);
  console.log(`{ pending: [] } -> ${bare.ok ? `PROCEEDED ${show(bare.v.op.opId)}` : `REFUSED ${bare.v && bare.v.message}`}`);
  console.log(`{ pending: undefined } -> ${bareUndef.ok ? 'PROCEEDED' : `REFUSED TypeError: ${bareUndef.v && bareUndef.v.message}`}`);
  console.log(`file bytes = ${show(fs.readFileSync(P, 'utf8'))}`);
}

console.log(`\n== P4: THE ADDON'S OWN COMMIT AND VERSION EXPORTS ========================`);
console.log(`addon exports = ${show(Object.keys(ADDON).sort())}`);
console.log(`addon.version() = ${show(tryCall(() => ADDON.version()).v)}`);
console.log(`\nFIXTURES LEFT AT ${RUNROOT}`);
