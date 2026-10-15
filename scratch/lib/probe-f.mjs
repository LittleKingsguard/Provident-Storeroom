import { storeCreate, write as W, listen as L, read as R } from 'provident-storeroom';
import { register as K1, commit as K2, runAttempt as K3, report as K5 } from '../../bindings/js/src/constraint-kernel.mjs';
const mk = () => storeCreate({ listeners: [], journalLength: 32 });
// F1: K-1 first, then the caller's on() at the same address, then K-2 + caller loop over pending
{
  const s = mk(); let bodyRuns = 0; const args = [];
  K1(s, ['a'], 'x', () => true);
  const hOn = s.on(['a'], (a) => { bodyRuns += 1; args.push(a); });
  const c = K2(s, ['a'], 'mem', 1);
  console.log('F1 K-2: triggered=', c.triggered.length, 'pending=', c.pending.length, 'bodyRuns by K-2 return=', bodyRuns, 'pending holds the on-handle=', c.pending.includes(hOn), 'triggered holds it=', c.triggered.includes(hOn));
  let loop = 0;
  const map = new Map([[hOn, (a) => { bodyRuns += 1; args.push(['LOOP', a]); }]]);
  for (const h of c.pending) { loop += 1; const f = map.get(h); if (f) f(['a']); }
  console.log('F1 caller loop over pending invoked', loop, 'entries; bodyRuns now=', bodyRuns, 'args=', JSON.stringify(args));
  const rep = K3(s, c); console.log('F1 outcome=', rep.outcome, 'log=', JSON.stringify(rep.log.map(e=>[e.kind,e.id,e.state])));
}
// F2: K-1 first, then the caller's listen()+register (same thing, other spelling)
{
  const s = mk(); let bodyRuns = 0;
  K1(s, ['a'], 'x', () => true);
  const h = L(s, ['a']); s.register(h, () => { bodyRuns += 1; });
  const c = K2(s, ['a'], 'mem', 1);
  console.log('F2: triggered=', c.triggered.length, 'pending=', c.pending.length, 'bodyRuns=', bodyRuns, 'pending holds h=', c.pending.includes(h));
}
// F3: K-1 at ['a'], caller on() at ['a'], then a second K-1 at a DIFFERENT pair id
{
  const s = mk(); let bodyRuns = 0;
  K1(s, ['a'], 'x', () => true);
  s.on(['a'], () => { bodyRuns += 1; });
  K1(s, ['a'], 'y', () => true);
  const c = K2(s, ['a'], 'mem', 1);
  console.log('F3: triggered=', c.triggered.length, 'pending=', c.pending.length, 'bodyRuns=', bodyRuns);
}
// F4: two caller on() bodies + K-1, does K-3 clear them from pending?
{
  const s = mk(); let a = 0, b = 0;
  K1(s, ['a'], 'x', () => true);
  const h1 = s.on(['a'], () => { a += 1; });
  const h2 = s.on(['a'], () => { b += 1; });
  const c = K2(s, ['a'], 'mem', 1);
  console.log('F4 at K-2: triggered=', c.triggered.length, 'pending=', c.pending.length, 'a=', a, 'b=', b);
  K3(s, c);
  console.log('F4 after K-3: pending=', c.pending.length);
}
