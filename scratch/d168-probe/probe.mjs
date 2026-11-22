// PROBE ONLY (this pass's measurement instrument, not delivered): at every ask any host makes, is
// `context.value` equal to `store.read(context.address)` at that instant?  And what does each host's log
// carry now?
import { storeCreate } from '../../bindings/js/index.mjs';

const make = () => storeCreate({ journalLength: 256, listeners: [] });
const attempt = (fn) => { try { return { ok: true, value: fn() }; } catch (caught) { return { ok: false, caught }; } };
const readAt = (store, address) => {
  try { return { ok: true, value: store.read(address) }; } catch (thrown) { return { ok: false, status: thrown.status }; }
};
const rec = (context, store) => {
  const read = readAt(store, context.address);
  return {
    value: context.value,
    address: context.address,
    attempt: context.attempt === null ? null : context.attempt.id,
    present: read.ok,
    read: read.ok ? read.value : `<${read.status}>`,
    equal: read.ok ? Object.is(context.value, read.value) : (context.value === undefined),
  };
};
const show = (id, asks, log) => {
  console.log(`\n=== ${id}`);
  asks.forEach((a, i) => console.log(`   ask[${i}] ${JSON.stringify(a)}`));
  if (log !== undefined) console.log(`   log ${JSON.stringify(log.map((e) => [e.kind, e.id ?? null]))}`);
};

const SEED = 5, LANDED = 9, THIRD = 7;

// ---- HOST 1 · a repair body (W9's DW-09.1)
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let rb = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'repair-host' }, (context) => {
    asks.push(rec(context, store));
    if (Object.is(context.value, THIRD) && context.attempt !== null) {
      return {
        message: 'the repair host refuses this state and reverses',
        repair: () => { rb = attempt(() => store.rollback(target.op.opId)); return { ok: false, message: 'the repair gave up' }; },
      };
    }
    return Object.is(context.value, SEED) ? { message: 'the state this pair is asked for is not one it admits' } : true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const caught = terminal.ok === false ? terminal.caught : null;
  show('HOST 1 · repair body', asks, caught === null ? [] : caught.log);
  console.log(`   registered ${registered.ok} · answer ${caught === null ? 'answered' : caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
  if (caught !== null) console.log(`   refusal message ${JSON.stringify(caught.message)}`);
}

// ---- HOST 2 · a delete's pass (W9's DW-09.2)
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  store.write(['x'], 'mem', 1);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let rollback = null, receipt = null, acted = false;
  const listener = store.listen('delete-pass-listener', [['x']]);
  store.register(listener, () => { if (rollback === null) rollback = attempt(() => store.rollback(target.op.opId)); });
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'delete-pass-host' }, (context) => {
    asks.push(rec(context, store));
    if (context.attempt !== null && acted === false) {
      acted = true;
      receipt = attempt(() => store.delete(['x'], 'mem'));
      return { message: 'the delete host refuses the state its delivery left' };
    }
    return Object.is(context.value, SEED) ? { message: 'the state this pair is asked for is not one it admits' } : true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const caught = terminal.ok === false ? terminal.caught : null;
  show('HOST 2 · delete pass', asks, caught === null ? [] : caught.log);
  console.log(`   registered ${registered.ok} · acted ${acted} · answer ${caught === null ? 'answered' : caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
  if (caught !== null) console.log(`   refusal message ${JSON.stringify(caught.message)}`);
  console.log(`   delete receipt ${receipt === null ? '<none>' : JSON.stringify(receipt.ok ? receipt.value.discarded : String(receipt.caught))}`);
}

// ---- HOST 3 · reentrant (W9's DW-09.3)
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let rollback = null, nested = null;
  const listener = store.listen('reentrant-listener', [['a']]);
  store.register(listener, () => {
    if (rollback === null) { rollback = attempt(() => store.rollback(target.op.opId)); nested = attempt(() => store.write(['b'], 'mem', 11)); }
  });
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'reentrant-host' }, (context) => {
    asks.push(rec(context, store));
    return Object.is(context.value, SEED) ? { message: 'the state the reversal leaves is not one this pair admits' } : true;
  }));
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const caught = terminal.ok === false ? terminal.caught : null;
  show('HOST 3 · reentrant', asks, caught === null ? [] : caught.log);
  console.log(`   registered ${registered.ok} · answer ${caught === null ? 'answered' : caught.status} · store a=${JSON.stringify(readAt(store, ['a']))} b=${JSON.stringify(readAt(store, ['b']))}`);
}

// ---- CONTROL · the declared window (W9's DW-09.4)
{
  const store = make();
  store.write(['a'], 'mem', 1);
  store.write(['b'], 'mem', SEED);
  const target = store.write(['b'], 'mem', LANDED);
  const asks = [];
  const registered = attempt(() => store.addConstraint({ address: ['b'], id: 'declared-window-pair' }, (context) => {
    asks.push(rec(context, store));
    if (Object.is(context.value, LANDED)) return true;
    return { message: 'the state this pair is asked for is not one it admits' };
  }));
  let rollback = null;
  const listener = store.listen('declared-window-listener', [['a']]);
  store.register(listener, () => { if (rollback === null) rollback = attempt(() => store.rollback(target.op.opId)); });
  const del = attempt(() => store.delete(['a'], 'mem'));
  show('CONTROL · declared window', asks);
  console.log(`   registered ${registered.ok} · delete ${del.ok ? 'answered' : del.caught.status} · witness ${JSON.stringify(del.ok ? del.value.discarded : null)} · store ${JSON.stringify(readAt(store, ['b']))}`);
}

// ---- HOSTS H1..H7 of W16
const hostOf = (id, seed, build) => {
  const store = make();
  build(store, { id, record: (context) => rec(context, store) });
};

// H1
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H1-pair' }, (context) => {
    asks.push(rec(context, store));
    if (context.attempt !== null && reversal === null && Object.is(context.value, THIRD)) reversal = attempt(() => store.rollback(target.op.opId));
    return Object.is(context.value, SEED) ? { message: 'H1 refuses the state the reversal left' } : true;
  });
  const act = attempt(() => store.write(['a'], 'mem', THIRD));
  show('H1', asks, act.ok ? [] : act.caught.log);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
}
// H2
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H2-pair' }, (context) => {
    asks.push(rec(context, store));
    if (context.attempt !== null && Object.is(context.value, THIRD)) {
      return {
        message: 'H2 refuses this state and repairs',
        repair: () => { if (reversal === null) reversal = attempt(() => store.rollback(target.op.opId)); return { ok: false, message: 'the repair gave up' }; },
      };
    }
    return Object.is(context.value, SEED) ? { message: 'H2 refuses the state the reversal left' } : true;
  });
  const act = attempt(() => store.write(['a'], 'mem', THIRD));
  show('H2', asks, act.ok ? [] : act.caught.log);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
  if (!act.ok) console.log(`   refusal message ${JSON.stringify(act.caught.message)}`);
}
// H3
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  store.write(['b'], 'mem', 1);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H3-pair' }, (context) => {
    asks.push(rec(context, store));
    return Object.is(context.value, SEED) ? { message: 'H3 refuses the state the reversal left' } : true;
  });
  const handle = store.listen('H3-listener', [['b']]);
  store.register(handle, () => { if (reversal === null) reversal = attempt(() => store.rollback(target.op.opId)); });
  const act = attempt(() => store.write(['b'], 'mem', 2));
  show('H3', asks, act.ok ? [] : act.caught.log);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
}
// H4
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'H4-pair' }, (context) => {
    asks.push(rec(context, store));
    if (reversal === null) reversal = attempt(() => store.rollback(target.op.opId));
    return true;
  }));
  const later = attempt(() => store.write(['z'], 'mem', 3));
  show('H4', asks);
  console.log(`   registered ${registered.ok} · later ${later.ok ? 'answered' : later.caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
}
// H5
{
  const store = make();
  store.write(['b'], 'mem', SEED);
  const target = store.write(['b'], 'mem', LANDED);
  store.write(['a'], 'mem', 1);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['b'], id: 'H5-pair' }, (context) => {
    asks.push(rec(context, store));
    return Object.is(context.value, SEED) ? { message: 'H5 refuses the state the reversal left' } : true;
  });
  const handle = store.listen('H5-listener', [['a']]);
  store.register(handle, () => { if (reversal === null) reversal = attempt(() => store.rollback(target.op.opId)); });
  const act = attempt(() => store.delete(['a'], 'mem'));
  show('H5', asks);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · witness ${JSON.stringify(act.ok ? act.value.discarded : null)} · store ${JSON.stringify(readAt(store, ['b']))}`);
}
// H6
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H6-pair' }, (context) => {
    asks.push(rec(context, store));
    if (context.attempt !== null && reversal === null) reversal = attempt(() => store.rollback(target.op.opId));
    return Object.is(context.value, SEED) ? { message: 'H6 refuses the state the reversal left' } : true;
  });
  const act = attempt(() => store.delete(['a'], 'mem'));
  show('H6', asks, act.ok ? [] : act.caught.log);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · store ${JSON.stringify(readAt(store, ['a']))}`);
}
// H6b · the lawful arm
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  const asks = [];
  let reversal = null;
  store.addConstraint({ address: ['a'], id: 'H6b-pair' }, (context) => {
    asks.push(rec(context, store));
    if (context.attempt !== null && reversal === null) reversal = attempt(() => store.rollback(target.op.opId));
    return true;
  });
  const act = attempt(() => store.delete(['a'], 'mem'));
  show('H6b · lawful arm', asks);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · witness ${JSON.stringify(act.ok ? act.value.discarded : null)} · store ${JSON.stringify(readAt(store, ['a']))}`);
}
// H7
{
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = store.write(['a'], 'mem', LANDED);
  store.write(['b'], 'mem', 1);
  const asks = [];
  let reversal = null, nested = null;
  store.addConstraint({ address: ['a'], id: 'H7-pair' }, (context) => {
    asks.push(rec(context, store));
    return Object.is(context.value, SEED) ? { message: 'H7 refuses the state the reversal left' } : true;
  });
  const handle = store.listen('H7-listener', [['b']]);
  store.register(handle, () => {
    if (reversal !== null) return;
    reversal = attempt(() => store.rollback(target.op.opId));
    nested = attempt(() => store.write(['c'], 'mem', 11));
  });
  const act = attempt(() => store.write(['b'], 'mem', 2));
  show('H7', asks, act.ok ? [] : act.caught.log);
  console.log(`   act ${act.ok ? 'answered' : act.caught.status} · store ${JSON.stringify(readAt(store, ['a']))} · nested ${nested === null ? '<none>' : (nested.ok ? 'answered' : nested.caught.status)}`);
}
