import { storeCreate, write as W, listen as L, read as R } from 'provident-storeroom';
const mk = (t) => storeCreate({ listeners: [], journalLength: 32 });
// case 1: listen+register only
{
  const s = mk();
  let runs = 0;
  const h = L(s, ['a']); s.register(h, () => { runs++; });
  const w = W(s, ['a'], 'mem', 1);
  console.log('listen+register: triggered=', w.triggered.length, 'runs=', runs, 'handle-identity-in-triggered=', w.triggered.includes(h));
}
// case 2: on only
{
  const s = mk();
  let runs = 0;
  const h = s.on(['a'], () => { runs++; });
  const w = W(s, ['a'], 'mem', 1);
  console.log('on: triggered=', w.triggered.length, 'runs=', runs, 'handle-identity-in-triggered=', w.triggered.includes(h));
}
// case 3: on with a listener registered via register on the same handle
{
  const s = mk();
  let a = 0, b = 0;
  const h = s.on(['a'], () => { a++; });
  s.register(h, () => { b++; });
  const w = W(s, ['a'], 'mem', 1);
  console.log('on+register(same handle): triggered=', w.triggered.length, 'onRuns=', a, 'registerRuns=', b);
}
// case 4: kernel K-1 handle then caller on()
{
  const k = await import('../../bindings/js/src/constraint-kernel.mjs');
  const s = mk();
  let plain = 0;
  const hk = k.register(s, ['a'], 'x', () => true);
  const ho = s.on(['a'], () => { plain++; });
  const c = k.commit(s, ['a'], 'mem', 1);
  console.log('K-1 + on: triggered=', c.triggered.length, 'pending=', c.pending.length, 'plainRuns=', plain, 'pendingHasOnHandle=', c.pending.includes(ho), 'K1handleInTriggered=', c.triggered.includes(hk));
}
// case 5: depth-2 write on a fresh store
{
  const s = mk();
  try { W(s, ['a','b'], 'mem', 1); console.log('depth-2 first write: ADMITTED'); } catch (e) { console.log('depth-2 first write refused:', e.status); }
  const s2 = mk();
  W(s2, ['a'], 'mem', { seed: true });
  try { W(s2, ['a','b'], 'mem', 1); console.log('depth-2 after structured seed: ADMITTED, read=', JSON.stringify(R(s2, ['a','b']))); } catch (e) { console.log('depth-2 after seed refused:', e.status); }
}
