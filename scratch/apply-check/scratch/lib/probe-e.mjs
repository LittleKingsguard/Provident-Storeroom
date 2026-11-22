import { storeCreate, write as W, listen as L, read as R } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3 } from '../../bindings/js/src/constraint-kernel.mjs';
const mk = () => storeCreate({ listeners: [], journalLength: 32 });
// E1: register-then-K1 (the C-16 order)
{
  const s = mk(); let runs = 0;
  const h = L(s, ['a']); s.register(h, () => { runs++; });
  const hk = K1(s, ['a'], 'x', () => true);
  const c = K2(s, ['a'], 'mem', 1);
  console.log('E1 register-then-K1: triggered=', c.triggered.length, 'pending=', c.pending.length, 'runs=', runs, 'sameHandle=', h === hk, 'hkInTriggered=', c.triggered.includes(hk));
}
// E2: K1-then-register
{
  const s = mk(); let runs = 0;
  const hk = K1(s, ['a'], 'x', () => true);
  const h = L(s, ['a']); s.register(h, () => { runs++; });
  const c = K2(s, ['a'], 'mem', 1);
  console.log('E2 K1-then-register: triggered=', c.triggered.length, 'pending=', c.pending.length, 'runs=', runs, 'sameHandle=', h === hk);
}
// E3: on() then K1
{
  const s = mk(); let runs = 0;
  s.on(['a'], () => { runs++; });
  const hk = K1(s, ['a'], 'x', () => true);
  const c = K2(s, ['a'], 'mem', 1);
  console.log('E3 on-then-K1: triggered=', c.triggered.length, 'pending=', c.pending.length, 'runs=', runs);
}
// E4: K1 then on()
{
  const s = mk(); let runs = 0;
  const hk = K1(s, ['a'], 'x', () => true);
  s.on(['a'], () => { runs++; });
  const c = K2(s, ['a'], 'mem', 1);
  console.log('E4 K1-then-on: triggered=', c.triggered.length, 'pending=', c.pending.length, 'runs=', runs);
}
// E5: register on a FRESH listen at another address, then K1 at ['a']
{
  const s = mk(); let runs = 0;
  const h = L(s, ['a']); s.register(h, () => { runs++; });
  const c0 = W(s, ['a'], 'mem', 1);
  console.log('E5 caller write before any K-1: triggered=', c0.triggered.length, 'runs=', runs);
}
