// scratch/rebind-greens/moved-cells-probe.mjs
// THE INDEPENDENT RE-READ OF THE FIVE MOVED CELLS, driven OUTSIDE the runner so the re-recorded verdicts do
// not rest on the runner's own bookkeeping: FTS-09.5 / FTS-09.6 (the ruled law, `A119`) and
// FTS-11.1 / FTS-11.5 (the repair context and the carry at the fifth position). The package entry and the
// kernel entry are IMPORTED AND DRIVEN only — never read. `FTS-04.9`/`FTS-04.10` are re-read by
// `scratch/rebind-greens/commit-residue-probe.mjs` on both failing routes.
// Run: node scratch/rebind-greens/moved-cells-probe.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const PKG = await import('../../bindings/js/index.mjs');
const K = await import('../../bindings/js/src/constraint-kernel.mjs');
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const out = [];
const say = (s) => out.push(s);

// ---- FTS-09.5 : a zero-byte file boots an INSTANCE (the exemption keys on the FILE's bytes, `A119`) -----
{
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-moved-'));
  const P = path.join(d, 'empty.json');
  PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  const size = fs.statSync(P).size;
  const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
  const reg = r.ok ? tryCall(() => PKG.read(r.v, [])) : null;
  say(`FTS-09.5  zero-byte file: size=${size} -> ${r.ok ? `INSTANCE read([])=${JSON.stringify(reg.ok ? reg.v : reg.v.status)}` : `THREW ${r.v.status}`} ; size after=${fs.statSync(P).size}`);
  const Q = path.join(d, 'two.json'); fs.writeFileSync(Q, '{}');
  const r2 = tryCall(() => PKG.storeCreate({ filePath: Q, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
  say(`FTS-09.6  present two-byte {} image: ${r2.ok ? 'AN INSTANCE (DRIFT!)' : `REFUSED ${r2.v.status}`}`);
  fs.rmSync(d, { recursive: true, force: true });
}

// ---- FTS-11.1 / FTS-11.5 : the context the kernel hands a repair, and the carry at the fifth position --
{
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-moved-'));
  const P = path.join(d, 'join.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  let members = null; let carryRoute = 'NOT ATTEMPTED'; let fired = 0; let repairCalls = 0;
  K.register(s, ['c'], 'c1', (ctx) => {
    if (ctx.value <= 10) return true;
    return { message: 'too large', repair: (rc) => {
      repairCalls++;
      members = Object.keys(rc).sort().join(',');
      const wCarry = tryCall(() => PKG.write(s, ['c'], 'file', 10, rc));
      carryRoute = wCarry.ok ? `ACCEPTED (op=${JSON.stringify(wCarry.v.op && wCarry.v.op.opId)})` : `REFUSED: ${wCarry.v && wCarry.v.message}`;
      const w = wCarry.ok ? wCarry : tryCall(() => PKG.write(s, ['c'], 'file', 10));
      return { ok: true, op: w.ok ? w.v.op : undefined };
    } };
  });
  const hListen = PKG.listen(s, ['c']);
  s.register(hListen, () => { fired++; });
  const rec = K.commit(s, ['c'], 'file', 99);
  const res = tryCall(() => K.runAttempt(s, rec));
  say(`FTS-11.1  RepairContext members=[${members}] repairs=${repairCalls} -> six declared=${members === 'address,id,op,pending,tier,value'}`);
  say(`FTS-11.5  the kernel-handed context carried at the fifth position: ${carryRoute}`);
  say(`(the passing arm of the same drive) outcome=${res.ok ? res.v.outcome : `THREW ${res.v.status}`} ops=${res.ok ? res.v.ops.length : '-'} kinds=${res.ok ? JSON.stringify(res.v.log.map((e) => e.kind)) : '-'} listener invocations=${fired} image=${JSON.stringify(fs.readFileSync(P, 'utf8'))}`);
  fs.rmSync(d, { recursive: true, force: true });
}

console.log(out.join('\n'));
