import { storeCreate } from '../../bindings/js/index.mjs';
const make = () => storeCreate({ journalLength: 256, listeners: [] });
const attempt = (fn) => { try { return { ok: true, value: fn() }; } catch (c) { return { ok: false, caught: c }; } };
const SEED = 5, LANDED = 9, THIRD = 7;
// repair host
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  store.addConstraint({ address: ['a'], id: 'repair-host' }, (c) => {
    if (Object.is(c.value, THIRD) && c.attempt !== null) {
      return { message: 'the repair host refuses this state and reverses', repair: () => { attempt(() => store.rollback(target.op.opId)); return { ok: false, message: 'the repair gave up' }; } };
    }
    return Object.is(c.value, SEED) ? { message: 'the state this pair is asked for is not one it admits' } : true;
  });
  const t = attempt(() => store.write(['a'], 'mem', THIRD));
  console.log('REPAIR HOST log entries:');
  for (const e of (t.ok ? [] : t.caught.log)) console.log('  ', JSON.stringify(e));
  console.log('  refusal message:', JSON.stringify(t.ok ? null : t.caught.message));
}
// delete host
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  store.write(['x'], 'mem', 1);
  const target = store.write(['a'], 'mem', LANDED);
  let rb = null, acted = false;
  store.register(store.listen('L', [['x']]), () => { if (rb === null) rb = attempt(() => store.rollback(target.op.opId)); });
  store.addConstraint({ address: ['a'], id: 'delete-pass-host' }, (c) => {
    if (c.attempt !== null && acted === false) { acted = true; attempt(() => store.delete(['x'], 'mem')); return { message: 'the delete host refuses the state its delivery left' }; }
    return Object.is(c.value, SEED) ? { message: 'the state this pair is asked for is not one it admits' } : true;
  });
  const t = attempt(() => store.write(['a'], 'mem', THIRD));
  console.log('DELETE HOST log entries:');
  for (const e of (t.ok ? [] : t.caught.log)) console.log('  ', JSON.stringify(e));
}
// reentrant host
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  let rb = null;
  store.register(store.listen('L', [['a']]), () => { if (rb === null) { rb = attempt(() => store.rollback(target.op.opId)); attempt(() => store.write(['b'], 'mem', 11)); } });
  store.addConstraint({ address: ['a'], id: 'reentrant-host' }, (c) => (Object.is(c.value, SEED) ? { message: 'no' } : true));
  const t = attempt(() => store.write(['a'], 'mem', THIRD));
  console.log('REENTRANT HOST log entries:');
  for (const e of (t.ok ? [] : t.caught.log)) console.log('  ', JSON.stringify(e));
}
