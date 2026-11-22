// probe for E2E-C-9 re-derivation — measures the tree's answers, not a test
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

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'c9-probe-'));
let seq = 0;
const newStore = (journalLength = 64) => pkg.storeCreate({ filePath: path.join(TMP, `s${(seq += 1)}.json`), journalLength, listeners: [] });
const tryCall = (fn) => { try { return { ok: true, value: fn() }; } catch (e) { return { ok: false, err: e }; } };
const show = (t) => (t.ok ? `RETURNED ${JSON.stringify(t.value)}` : `THREW ${t.err?.status} :: ${t.err?.message}`);
const st = (s, a) => { try { return JSON.stringify(s.read(a, [])); } catch (e) { return `threw ${e.status}`; } };

console.log('=== A: the row\'s AS-FILED floor fixture (cap 2, six pre-writes, x repair, y rollback-in-body) ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `floor${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  for (let i = 0; i < 6; i += 1) floor.write(['a'], 'mem', i);
  let repairOp = null, repairRuns = 0, yRollback = null;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { repairRuns += 1; const w = floor.write(['a'], 'mem', 1, rc); repairOp = w.op?.opId; return { ok: true, message: 'clamped', op: w.op }; },
    message: 'x is too large',
  }));
  register(floor, ['a'], 'y', (ctx) => {
    if (ctx.op !== null && ctx.value === 1) yRollback = tryCall(() => floor.rollback(ctx.op.opId));
    return ctx.value === 0 ? true : { message: 'y unrepaired' };
  });
  const before = st(floor, ['a']);
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  console.log('  commit =', show(cF));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  runAttempt.ok =', runF.ok, 'status =', runF.ok ? runF.value?.outcome : runF.err?.status,
    'errMessage =', runF.err?.message);
  console.log('  the y body\'s own floor.rollback(repair op) =', yRollback ? show(yRollback) : '(never called)');
  console.log('  repairRuns =', repairRuns, 'repairOp =', repairOp, 'commitOp =', cF.value?.op?.opId);
  const rF = tryCall(() => report(floor, cF.value.attempt));
  if (!rF.ok) console.log('  report THREW', rF.err?.status, rF.err?.message);
  else {
    console.log('  report keys =', Object.keys(rF.value).sort().join(','));
    console.log('  report.ops =', JSON.stringify(rF.value.ops?.map((o) => ({ id: o.opId, address: o.address }))));
    console.log('  report.rollback =', JSON.stringify(rF.value.rollback));
  }
  const lg = runF.ok ? (runF.value?.log ?? []) : (runF.err?.log ?? []);
  console.log('  log =', JSON.stringify(lg?.map((e) => `${e.kind}/${e.id}/${e.state}`)));
  console.log('  read(["a"]) before =', before, ' after =', st(floor, ['a']));
}

console.log('\n=== B: a y body that pushes the attempt\'s own first op OUT of the cap (three writes) ===');
{
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `drop${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  for (let i = 0; i < 6; i += 1) floor.write(['a'], 'mem', i);
  let repairOp = null, yRollback = null;
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { const w = floor.write(['a'], 'mem', 1, rc); repairOp = w.op?.opId; return { ok: true, message: 'clamped', op: w.op }; },
    message: 'x is too large',
  }));
  register(floor, ['a'], 'y', (ctx) => {
    if (ctx.op !== null && ctx.value === 1) {
      // THE CALLER'S OWN ACT: reverse the op the repair landed, and then write enough that the compaction
      // takes the attempt's own first op out of the journal.
      yRollback = tryCall(() => floor.rollback(ctx.op.opId));
      tryCall(() => floor.write(['a'], 'mem', 4));
      tryCall(() => floor.write(['a'], 'mem', 4));
    }
    return ctx.value === 0 ? true : { message: 'y unrepaired' };
  });
  const cF = tryCall(() => commit(floor, ['a'], 'mem', 9));
  const runF = tryCall(() => runAttempt(floor, cF.value));
  console.log('  commit =', show(cF));
  console.log('  the y body\'s own floor.rollback =', yRollback ? show(yRollback) : '(never called)');
  console.log('  runAttempt.ok =', runF.ok, 'status =', runF.ok ? runF.value?.outcome : runF.err?.status, 'msg =', runF.err?.message);
  const rF = tryCall(() => report(floor, cF.value.attempt));
  if (!rF.ok) console.log('  report THREW', rF.err?.status, rF.err?.message);
  else console.log('  report.rollback =', JSON.stringify(rF.value.rollback), ' ops =', JSON.stringify(rF.value.ops?.map((o) => o.opId)));
  const lg = runF.ok ? (runF.value?.log ?? []) : (runF.err?.log ?? []);
  console.log('  log =', JSON.stringify(lg?.map((e) => `${e.kind}/${e.id}/${e.state}`)));
  console.log('  read(["a"]) =', st(floor, ['a']));
}

console.log('\n=== C: the caller\'s own reversal of an op the compaction dropped, and of an id never minted ===');
{
  const s = pkg.storeCreate({ filePath: path.join(TMP, `refuse${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const w1 = s.write(['a'], 'mem', 1);
  s.write(['a'], 'mem', 2);
  s.write(['a'], 'mem', 3);
  s.write(['a'], 'mem', 4);
  console.log('  dropped op id =', w1.op.opId);
  console.log('  rollback(dropped) =', show(tryCall(() => s.rollback(w1.op.opId))));
  console.log('  rollback(never minted) =', show(tryCall(() => s.rollback('op-999999'))));
  console.log('  rollback(garbage) =', show(tryCall(() => s.rollback('not-an-op'))));
  console.log('  read(["a"]) after the refusals =', st(s, ['a']));
}

console.log('\n=== D: the three windows (intact / corrupt / empty), as the row builds them ===');
{
  const stateAt = (s, address) => { try { return { present: true, value: s.read(address, []) }; } catch (e) { return { present: false, status: e.status }; } };
  const window_ = (image) => {
    const p = path.join(TMP, `compact${(seq += 1)}.json`);
    const s = tryCall(() => pkg.storeCreate({ filePath: p, journalLength: 2, listeners: [] }));
    if (!s.ok) return { constructed: false, status: s.err?.status, message: s.err?.message };
    fs.writeFileSync(p, image);
    s.value.write(['m'], 'mem', 'swallowed');
    const a1 = s.value.write(['a'], 'mem', 1);
    s.value.write(['a'], 'mem', 2);
    s.value.write(['a'], 'mem', 3);
    const before = { a: stateAt(s.value, ['a']), m: stateAt(s.value, ['m']), z: stateAt(s.value, ['z']), bytes: fs.readFileSync(p, 'utf8') };
    const call = tryCall(() => s.value.rollback(a1.op.opId));
    const after = { a: stateAt(s.value, ['a']), m: stateAt(s.value, ['m']), z: stateAt(s.value, ['z']), bytes: fs.readFileSync(p, 'utf8') };
    const boot = tryCall(() => pkg.storeCreate({ filePath: p, journalLength: 2, listeners: [] }));
    return {
      constructed: true, a1: a1.op.opId, before, call, after,
      boot: boot.ok ? { ok: true, a: stateAt(boot.value, ['a']), m: stateAt(boot.value, ['m']), z: stateAt(boot.value, ['z']) }
        : { ok: false, status: boot.err?.status, message: boot.err?.message },
    };
  };
  for (const [name, image] of [['INTACT', '{"z":7}'], ['CORRUPT', "this is not the store's image"], ['EMPTY', '']]) {
    const out = window_(image);
    console.log(`  ${name}: constructed=${out.constructed}`, JSON.stringify(out, null, 0));
  }
}

console.log('\n=== E: what a constraint body\'s own throw of RollbackCompacted does to the attempt ===');
{
  const s = pkg.storeCreate({ filePath: path.join(TMP, `bodythrow${(seq += 1)}.json`), journalLength: 2, listeners: [] });
  const w1 = s.write(['a'], 'mem', 1);
  s.write(['a'], 'mem', 2);
  s.write(['a'], 'mem', 3);
  let thrown = null;
  register(s, ['a'], 'v', (ctx) => {
    if (ctx.op !== null) thrown = tryCall(() => s.rollback(w1.op.opId));
    return ctx.value <= 5 ? true : { message: 'v too large' };
  });
  const c = tryCall(() => commit(s, ['a'], 'mem', 9));
  const r = tryCall(() => runAttempt(s, c.value));
  console.log('  the body call =', thrown ? show(thrown) : '(never called)');
  console.log('  runAttempt =', r.ok ? JSON.stringify({ outcome: r.value?.outcome, log: r.value?.log?.map((e) => `${e.kind}/${e.id}/${e.state}`) }) : `${r.err?.status} :: ${r.err?.message}`);
  console.log('  read(["a"]) =', st(s, ['a']));
}
