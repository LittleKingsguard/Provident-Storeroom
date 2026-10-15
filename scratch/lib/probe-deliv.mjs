// probe (gate 6, second run), part 6 — the delivery split as the settled law declares it: layer (a) for a
// handle the KERNEL's own write returned, layer (b) for a handle the CALLER's own write returned, and who
// invokes a registered body at this build.  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read, listen } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-deliv-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: 64, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status }; } };

console.log('== D1. a plain listener at [a], a KERNEL-made write (K-2) at [a] ==');
{
  const s = mk();
  let runs = 0; const args = [];
  const h = listen(s, ['a']);
  const body = (a) => { runs += 1; args.push(a); };
  s.register(h, body);
  const cPair = K1(s, ['a'], 'cx', () => true);
  const c = K2(s, ['a'], 'mem', 1);
  console.log(`at K-2's return: runs=${runs} args=${JSON.stringify(args)} triggered=${c.triggered.length} pending=${c.pending.length}`);
  console.log(`   triggered holds the listener handle=${c.triggered.includes(h)}  pending holds it=${c.pending.includes(h)}`);
  let loop = 0; for (const hnd of c.pending) { loop += 1; if (hnd === h) body(['a']); }
  console.log(`   the caller's loop invoked ${loop}; runs now=${runs}`);
  console.log(`   K-1's adopted handle in triggered=${c.triggered.includes(cPair)}`);
}

console.log('\n== D2. the caller\'s own write at a DESCENDANT of the registration address ==');
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });              // so ['a','c'] is writable
  let runs = 0; const args = [];
  const h = listen(s, ['a']);
  const body = (a) => { runs += 1; args.push(a); };
  s.register(h, body);
  const w = write(s, ['a', 'c'], 'mem', 5);
  console.log(`the caller's own store.write at ['a','c']: runs=${runs} args=${JSON.stringify(args)} triggered=${w.triggered.length} keys=${Object.keys(w).join(',')}`);
  console.log(`   the listener handle in triggered=${w.triggered.includes(h)}  (the write's returned set carries it by the prefix rule)`);
  console.log(`   the record the caller holds for that write carries a pending member=${'pending' in w}`);
}

console.log('\n== D3. a KERNEL-made write at a DESCENDANT of a registered address ==');
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });
  let runs = 0; const args = [];
  const h = listen(s, ['a']);
  const body = (a) => { runs += 1; args.push(a); };
  s.register(h, body);
  K1(s, ['a'], 'cx', () => true);
  const c = K2(s, ['a', 'c'], 'mem', 5);
  console.log(`at K-2's return (write at ['a','c']): runs=${runs} args=${JSON.stringify(args)} triggered=${c.triggered.length} pending=${c.pending.length}`);
  console.log(`   the listener handle in triggered=${c.triggered.includes(h)}  in pending=${c.pending.includes(h)}`);
}

console.log('\n== D4. the caller\'s own store.write under a K-1 registration at the SAME address ==');
{
  const s = mk();
  let runs = 0; const args = [];
  K1(s, ['a'], 'cx', () => true);
  const h = listen(s, ['a']);
  const body = (a) => { runs += 1; args.push(a); };
  s.register(h, body);
  const w = write(s, ['a'], 'mem', 5);
  console.log(`caller's own write at ['a']: runs=${runs} args=${JSON.stringify(args)} triggered=${w.triggered.length} keys=${Object.keys(w).join(',')}`);
}
