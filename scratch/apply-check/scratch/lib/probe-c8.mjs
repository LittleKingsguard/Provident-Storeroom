import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write: sWrite, listen: sListen } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const s = storeCreate({ filePath: '/tmp/probe-c8.json', journalLength: 64, listeners: [] });
const step = (label, fn) => { try { const v = fn(); console.log('OK   ', label, v === undefined ? '' : JSON.stringify(v).slice(0,140)); return v; } catch (e) { console.log('THREW', label, e.status, e.message); return null; } };
step('seed write at [a]', () => sWrite(s, ['a'], 'mem', { o: 1 }));
step('K1 at [a]', () => K1(s, ['a'], 'x', () => true));
const h = step('listen [a]', () => sListen(s, ['a']));
const r = { runs: 0, args: [], inLoop: false, nested: null };
const b = (addr) => {
  r.runs += 1; r.args.push(addr);
  if (!r.inLoop) { console.log('   body invoked by the STORE inside the write, addr=', JSON.stringify(addr)); return; }
  console.log('   body invoked by the LOOP, addr=', JSON.stringify(addr));
  try { const c2 = K2(s, ['a', 'c'], 'mem', 5); r.nested = { op: c2.op.opId }; console.log('   nested K2 at [a,c] OK op=', c2.op.opId); }
  catch (e) { r.nested = { threw: e.status }; console.log('   nested K2 at [a,c] THREW', e.status, e.message); }
};
step('register', () => s.register(h, b));
const c = step('K2 write at [a,c]', () => K2(s, ['a', 'c'], 'mem', 3));
if (c) {
  console.log('triggered=', c.triggered.length, 'pending=', c.pending.length, 'pendingHas=', c.pending.includes(h), 'runs=', r.runs);
  r.inLoop = true;
  for (const hnd of c.pending) { const f = hnd === h ? b : null; console.log('   loop entry, handle matches=', hnd === h); if (f) f(['a', 'c']); }
  console.log('after loop runs=', r.runs, 'nested=', JSON.stringify(r.nested));
  step('K3', () => { const rep = K3(s, c); return { outcome: rep.outcome, steps: rep.rollback.length }; });
}
