// probe 3 — force the failure after two repair appends, so the composition's floor call names a DROPPED op
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

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'c9-probe3-'));
let seq = 0;
const tryCall = (fn) => { try { return { ok: true, value: fn() }; } catch (e) { return { ok: false, err: e }; } };
const show = (t) => (t.ok ? `RETURNED ${JSON.stringify(t.value)}` : `THREW ${t.err?.status} :: ${t.err?.message}`);
const st = (s, a) => { try { return JSON.stringify(s.read(a, [])); } catch (e) { return `threw ${e.status}`; } };

console.log('=== x repairs to 1, z repairs to 0, w fails unrepaired -> the composition names a DROPPED op ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `f${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const pre = [];
  for (let i = 0; i < 6; i += 1) pre.push(floor.write(['a'], 'mem', i));
  let xRuns = 0, zRuns = 0, repairId = null;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { xRuns += 1; const w = floor.write(['a'], 'mem', 1, rc); repairId = w.op?.opId; return { ok: true, message: 'x clamped', op: w.op }; },
    message: 'x too large',
  }));
  register(floor, ['a'], 'z', (ctx) => (ctx.value === 0 ? true : {
    repair: (rc) => { zRuns += 1; const w = floor.write(['a'], 'mem', 0, rc); repairId = w.op?.opId; return { ok: true, message: 'z clamped', op: w.op }; },
    message: 'z not zero',
  }));
  register(floor, ['a'], 'w', (ctx) => (ctx.value === 0 ? true : { message: 'w unrepaired' }));
  const before = st(floor, ['a']);
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  console.log('  commit =', cF.ok ? `attempt=${cF.value.attempt.id} op=${cF.value.op.opId} seq=${cF.value.op.seq} pending=${JSON.stringify(cF.value.pending)}` : show(cF));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  runAttempt.ok =', runF.ok, 'status =', runF.ok ? runF.value?.outcome : runF.err?.status, '|', runF.err?.message);
  const lg = runF.ok ? (runF.value?.log ?? []) : (runF.err?.log ?? []);
  console.log('  log =', JSON.stringify(lg?.map((e) => `${e.kind}/${e.id}/${e.state}/${e.message}`)));
  const rF = tryCall(() => report(floor, cF.value.attempt));
  if (!rF.ok) console.log('  report =', show(rF));
  else {
    console.log('  outcome =', rF.value.outcome);
    console.log('  ops =', JSON.stringify(rF.value.ops.map((o) => ({ id: o.opId, addr: o.address, before: o.before, after: o.after }))));
    console.log('  rollback =', JSON.stringify(rF.value.rollback));
  }
  console.log('  xRuns=', xRuns, 'zRuns=', zRuns, 'lastRepairOp=', repairId);
  console.log('  read(["a"]) before =', before, ' after =', st(floor, ['a']));
  console.log('  caller rollback(pre[0]) =', show(tryCall(() => floor.rollback(pre[0].op.opId))));
  console.log('  caller rollback(commit op) =', show(tryCall(() => floor.rollback(cF.value.op.opId))));
  console.log('  read(["a"]) after those =', st(floor, ['a']));
}

console.log('\n=== the same attempt, with the caller\'s own reversal of the dropped op taken INSIDE the w body ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `g${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const pre = [];
  for (let i = 0; i < 6; i += 1) pre.push(floor.write(['a'], 'mem', i));
  let bodyReversal = null, bodyAt = null;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { const w = floor.write(['a'], 'mem', 1, rc); return { ok: true, message: 'x clamped', op: w.op }; },
    message: 'x too large',
  }));
  register(floor, ['a'], 'z', (ctx) => (ctx.value === 0 ? true : {
    repair: (rc) => { const w = floor.write(['a'], 'mem', 0, rc); return { ok: true, message: 'z clamped', op: w.op }; },
    message: 'z not zero',
  }));
  register(floor, ['a'], 'w', (ctx) => {
    if (ctx.op !== null) { bodyAt = ctx.op?.opId ?? null; bodyReversal = tryCall(() => floor.rollback(pre[0].op.opId)); }
    return ctx.value === 0 ? true : { message: 'w unrepaired' };
  });
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  body ctx.op =', bodyAt, ' body reversal =', bodyReversal ? show(bodyReversal) : '(never called)');
  console.log('  runAttempt =', runF.ok ? `outcome=${runF.value?.outcome}` : `${runF.err?.status} :: ${runF.err?.message}`);
  const rF = tryCall(() => report(floor, cF.value.attempt));
  console.log('  report.rollback =', rF.ok ? JSON.stringify(rF.value.rollback) : show(rF));
  const lg = runF.ok ? (runF.value?.log ?? []) : (runF.err?.log ?? []);
  console.log('  log =', JSON.stringify(lg?.map((e) => `${e.kind}/${e.id}/${e.state}/${e.message}`)));
  console.log('  read(["a"]) =', st(floor, ['a']));
}
