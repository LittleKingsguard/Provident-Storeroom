import { storeCreate } from '../../bindings/js/index.mjs';
const make = () => storeCreate({ journalLength: 256, listeners: [] });
const attempt = (fn) => { try { return { ok: true, value: fn() }; } catch (c) { return { ok: false, caught: c }; } };
const SEED = 5, LANDED = 9, THIRD = 7;
const dump = (id, asks, act) => {
  console.log(`\n=== ${id} · act ${act.ok ? 'answered' : act.caught.status}`);
  asks.forEach((c, i) => console.log(`  ask[${i}] ${JSON.stringify({ ...c, attempt: c.attempt === null ? null : { id: c.attempt.id, keys: Object.keys(c.attempt) }, op: c.op === null ? null : { id: c.op.opId ?? null, keys: Object.keys(c.op) } })}`));
};
// H3
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  store.write(['b'], 'mem', 1);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H3-pair' }, (context) => {
    asks.push({ address: context.address, tier: context.tier, value: context.value, attempt: context.attempt, op: context.op, keys: Object.keys(context) });
    return Object.is(context.value, SEED) ? { message: 'H3 refuses' } : true;
  });
  const handle = store.listen('H3-listener', [['b']]);
  store.register(handle, () => { if (reversal === null) reversal = attempt(() => store.rollback(target.op.opId)); });
  dump('H3', asks, attempt(() => store.write(['b'], 'mem', 2)));
}
// H7
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  store.write(['b'], 'mem', 1);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H7-pair' }, (context) => {
    asks.push({ address: context.address, tier: context.tier, value: context.value, attempt: context.attempt, op: context.op, keys: Object.keys(context) });
    return Object.is(context.value, SEED) ? { message: 'H7 refuses' } : true;
  });
  const handle = store.listen('H7-listener', [['b']]);
  store.register(handle, () => { if (reversal !== null) return; reversal = attempt(() => store.rollback(target.op.opId)); attempt(() => store.write(['c'], 'mem', 11)); });
  dump('H7', asks, attempt(() => store.write(['b'], 'mem', 2)));
}
// H1
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H1-pair' }, (context) => {
    asks.push({ address: context.address, tier: context.tier, value: context.value, attempt: context.attempt, op: context.op, keys: Object.keys(context) });
    if (context.attempt !== null && reversal === null && Object.is(context.value, THIRD)) reversal = attempt(() => store.rollback(target.op.opId));
    return Object.is(context.value, SEED) ? { message: 'H1 refuses' } : true;
  });
  dump('H1', asks, attempt(() => store.write(['a'], 'mem', THIRD)));
}
