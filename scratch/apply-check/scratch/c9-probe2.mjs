// probe 2 — the successor fixture: can the composition's own floor call MEET the dropped op?
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const KERNEL_URL = new URL('../bindings/js/src/constraint-kernel.mjs', import.meta.url);
const PKG_URL = new URL('../bindings/js/index.mjs', import.meta.url);
const kernel = await import(KERNEL_URL);
const pkg = await import(PKG_URL);
const { register: kernelRegister, commit, runAttempt, log, report } = kernel;

const atLanding = (ctx) => ctx !== null && typeof ctx === 'object' && ctx.tier === null && ctx.op === null;
const landingOnly = (body) => (ctx) => (atLanding(ctx) ? true : body(ctx));
const register = (store, address, id, body) => kernelRegister(store, address, id, landingOnly(body));

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'c9-probe2-'));
let seq = 0;
const tryCall = (fn) => { try { return { ok: true, value: fn() }; } catch (e) { return { ok: false, err: e }; } };
const show = (t) => (t.ok ? `RETURNED ${JSON.stringify(t.value)}` : `THREW ${t.err?.status} :: ${t.err?.message}`);
const st = (s, a) => { try { return JSON.stringify(s.read(a, [])); } catch (e) { return `threw ${e.status}`; } };

console.log('=== two repairs at one address push the attempt\'s first op out of a cap of 2 ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `f${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const droppedWrites = [];
  for (let i = 0; i < 6; i += 1) droppedWrites.push(floor.write(['a'], 'mem', i));
  const ops = [];
  let xRuns = 0, zRuns = 0;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { xRuns += 1; const w = floor.write(['a'], 'mem', 1, rc); return { ok: true, message: 'x clamped', op: w.op }; },
    message: 'x too large',
  }));
  register(floor, ['a'], 'z', (ctx) => (ctx.value === 1 ? true : {
    repair: (rc) => { zRuns += 1; const w = floor.write(['a'], 'mem', 1, rc); return { ok: true, message: 'z clamped', op: w.op }; },
    message: 'z not 1',
  }));
  register(floor, ['a'], 'w', (ctx) => (ctx.value === 1 ? true : { message: 'w unrepaired' }));
  const before = st(floor, ['a']);
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  console.log('  commit =', cF.ok ? `attempt=${cF.value.attempt.id} op=${cF.value.op.opId} seq=${cF.value.op.seq}` : show(cF));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  runAttempt.ok =', runF.ok, 'status =', runF.ok ? runF.value?.outcome : runF.err?.status);
  const lg = runF.ok ? (runF.value?.log ?? []) : (runF.err?.log ?? []);
  console.log('  log =', JSON.stringify(lg?.map((e) => `${e.kind}/${e.id}/${e.state}/${e.message}`)));
  const rF = tryCall(() => report(floor, cF.value.attempt));
  console.log('  report =', rF.ok ? JSON.stringify(rF.value, null, 0) : show(rF));
  console.log('  xRuns=', xRuns, 'zRuns=', zRuns);
  console.log('  read(["a"]) before =', before, ' after =', st(floor, ['a']));
  // the caller's own reversal of an op the compaction took
  console.log('  pre-attempt w1 =', droppedWrites[0].op.opId, '-> rollback =', show(tryCall(() => floor.rollback(droppedWrites[0].op.opId))));
  // what the store still holds / what the attempt's own ops answer
  console.log('  rollback(attempt first op) =', show(tryCall(() => floor.rollback(cF.value.op.opId))));
  console.log('  read(["a"]) after that =', st(floor, ['a']));
}

console.log('\n=== the same, with the caller\'s own reversal taken INSIDE a body (the dropped op) ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `g${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const pre = [];
  for (let i = 0; i < 6; i += 1) pre.push(floor.write(['a'], 'mem', i));
  let bodyReversal = null;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { const w = floor.write(['a'], 'mem', 1, rc); return { ok: true, message: 'x clamped', op: w.op }; },
    message: 'x too large',
  }));
  register(floor, ['a'], 'z', (ctx) => (ctx.value === 1 ? true : {
    repair: (rc) => { const w = floor.write(['a'], 'mem', 1, rc); return { ok: true, message: 'z clamped', op: w.op }; },
    message: 'z not 1',
  }));
  register(floor, ['a'], 'w', (ctx) => {
    if (ctx.op !== null) bodyReversal = tryCall(() => floor.rollback(pre[0].op.opId));
    return ctx.value === 1 ? true : { message: 'w unrepaired' };
  });
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  body reversal of the dropped op =', bodyReversal ? show(bodyReversal) : '(never called)');
  console.log('  runAttempt =', runF.ok ? `outcome=${runF.value?.outcome}` : `${runF.err?.status} :: ${runF.err?.message}`);
  const rF = tryCall(() => report(floor, cF.value.attempt));
  console.log('  report.rollback =', rF.ok ? JSON.stringify(rF.value.rollback) : show(rF));
  console.log('  read(["a"]) =', st(floor, ['a']));
}
