import { storeCreate } from '../../bindings/js/index.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
const make = () => storeCreate({ journalLength: 256, listeners: [] });
const attempt = (fn) => { try { return { ok: true, value: fn() }; } catch (c) { return { ok: false, caught: c }; } };
const SEED = 5, LANDED = 9, THIRD = 7;
const w = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });
const rec = (store, context) => ({ v: context.value, at: context.address, att: context.attempt === null ? null : 'A', op: context.op === null ? null : 'O', w: w(store), win: undefined });
const drive = (id, build) => {
  const store = make();
  const asks = [];
  build(store, (context) => asks.push(rec(store, context)));
  console.log(`${id} · ${asks.map((a) => JSON.stringify(a)).join(' | ')}`);
};
drive('H1', (store, push) => {
  store.write(['a'], 'mem', SEED); const target = store.write(['a'], 'mem', LANDED);
  let rev = null;
  store.addConstraint({ address: ['a'], id: 'H1' }, (c) => { push(c); if (c.attempt !== null && rev === null && Object.is(c.value, THIRD)) rev = attempt(() => store.rollback(target.op.opId)); return Object.is(c.value, SEED) ? { message: 'x' } : true; });
  attempt(() => store.write(['a'], 'mem', THIRD));
});
drive('H3', (store, push) => {
  store.write(['a'], 'mem', SEED); const target = store.write(['a'], 'mem', LANDED); store.write(['b'], 'mem', 1);
  let rev = null;
  store.addConstraint({ address: ['a'], id: 'H3' }, (c) => { push(c); return Object.is(c.value, SEED) ? { message: 'x' } : true; });
  store.register(store.listen('L', [['b']]), () => { if (rev === null) rev = attempt(() => store.rollback(target.op.opId)); });
  attempt(() => store.write(['b'], 'mem', 2));
});
drive('H4', (store, push) => {
  store.write(['a'], 'mem', SEED); const target = store.write(['a'], 'mem', LANDED);
  attempt(() => store.addConstraint({ address: ['a'], id: 'H4' }, (c) => { push(c); attempt(() => store.rollback(target.op.opId)); return true; }));
});
drive('H7', (store, push) => {
  store.write(['a'], 'mem', SEED); const target = store.write(['a'], 'mem', LANDED); store.write(['b'], 'mem', 1);
  let rev = null;
  store.addConstraint({ address: ['a'], id: 'H7' }, (c) => { push(c); return Object.is(c.value, SEED) ? { message: 'x' } : true; });
  store.register(store.listen('L', [['b']]), () => { if (rev !== null) return; rev = attempt(() => store.rollback(target.op.opId)); attempt(() => store.write(['c'], 'mem', 11)); });
  attempt(() => store.write(['b'], 'mem', 2));
});
