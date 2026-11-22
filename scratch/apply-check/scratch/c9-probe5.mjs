// probe 5 — cells 5..9's fixture (store2, no compaction), measured on this tree
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const KERNEL_URL = new URL('../bindings/js/src/constraint-kernel.mjs', import.meta.url);
const PKG_URL = new URL('../bindings/js/index.mjs', import.meta.url);
const kernel = await import(KERNEL_URL);
const pkg = await import(PKG_URL);
const { register: kernelRegister, commit, runAttempt, report } = kernel;
const atLanding = (ctx) => ctx !== null && typeof ctx === 'object' && ctx.tier === null && ctx.op === null;
const landingOnly = (body) => (ctx) => (atLanding(ctx) ? true : body(ctx));
const register = (store, address, id, body) => kernelRegister(store, address, id, landingOnly(body));

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'c9-probe5-'));
let seq = 0;
const newStore = () => pkg.storeCreate({ filePath: path.join(TMP, `s${(seq += 1)}.json`), journalLength: 64, listeners: [] });
const tryCall = (fn) => { try { return { ok: true, value: fn() }; } catch (e) { return { ok: false, err: e }; } };
const readVal = (s, addr) => { try { return s.read(addr, []); } catch (e) { return Symbol.for(e.status ?? 'threw'); } };
const keysOf = (o) => (o && typeof o === 'object' ? Object.keys(o).sort().join(',') : `<${typeof o}>`);
const stepShape = (st) => keysOf(st) === 'answer,checkpoint,failed,opId,restoredTo,undoneOps';
function declaredCallList(ops, checkpoint) {
  const list = (ops ?? []).map((o) => o.opId);
  const cp = (ops ?? []).find((o) => o.opId === checkpoint);
  const start = cp ? (ops ?? []).indexOf(cp) : -1;
  return list.slice(start + 1).reverse();
}

const BESIDE_SEED = 41;
const store2 = newStore();
store2.write(['b'], 'mem', BESIDE_SEED);
register(store2, ['a'], 'A', (ctx) => (ctx.value <= 10
  ? true
  : { repair: (rc) => { const w = store2.write(['b'], 'mem', 7, rc); return { ok: true, message: 'repaired at b', op: w.op }; }, message: 'A violated' }));
register(store2, ['a'], 'B', (ctx) => (ctx.value <= 5 ? true : { message: 'B unrepaired' }));
const c2 = commit(store2, ['a'], 'mem', 99);
const run2 = tryCall(() => runAttempt(store2, c2));
const f2 = run2.err ?? {};
console.log('status =', run2.ok ? run2.value?.outcome : f2.status, '|', f2.message);
const rr2 = report(store2, c2.attempt);
console.log('ops =', JSON.stringify(rr2.ops.map((o) => ({ id: o.opId, address: o.address }))));
const st2 = rr2.rollback ?? [];
console.log('steps =', JSON.stringify(st2, null, 0));
const declared2 = declaredCallList(rr2.ops, st2[0]?.checkpoint ?? null);
console.log('declaredList =', JSON.stringify(declared2));
console.log('stepShape all =', st2.every(stepShape), 'distinct opIds =', new Set(st2.map((s) => s.opId)).size === st2.length);
console.log('read a =', JSON.stringify(readVal(store2, ['a'])), ' read b =', JSON.stringify(readVal(store2, ['b'])));
const union = new Set(st2.flatMap((s) => s.undoneOps ?? []));
const performed = new Set(st2.map((s) => s.opId));
const addresses = [];
for (const op of rr2.ops) {
  const key = JSON.stringify(op.address);
  if (!addresses.some((a) => a.key === key)) addresses.push({ key, first: op.opId });
}
console.log('addresses =', JSON.stringify(addresses), 'union =', JSON.stringify([...union]), 'performed =', JSON.stringify([...performed]));
console.log('cell6 =', JSON.stringify({
  ownInUnion: rr2.ops.filter((o) => JSON.stringify(o.address) === JSON.stringify(['a'])).every((o) => union.has(o.opId)),
  besideInUnion: rr2.ops.filter((o) => JSON.stringify(o.address) !== JSON.stringify(['a'])).every((o) => union.has(o.opId)),
  stepsEqAddresses: st2.length === addresses.length,
  firstsPerformed: addresses.every((a) => performed.has(a.first)),
  besideRestored: readVal(store2, ['b']) === BESIDE_SEED,
  not99: readVal(store2, ['a']) !== 99,
  nonEmptyOrFailed: st2.every((s) => (s.undoneOps ?? []).length > 0 || s.failed === true),
}));
console.log('cell7 =', new Set(st2.map((s) => s.opId)).size === st2.length
  && !st2.some((s, i) => st2.slice(0, i).some((t) => (t.undoneOps ?? []).includes(s.opId))));
console.log('cell8 =', st2.length > 0 && new Set(st2.map((s) => JSON.stringify(s.checkpoint))).size === 1);
console.log('cell9 =', st2.every((s) => s.checkpoint === null || typeof s.checkpoint === 'string') && st2.every((s) => s.opId !== s.checkpoint));
