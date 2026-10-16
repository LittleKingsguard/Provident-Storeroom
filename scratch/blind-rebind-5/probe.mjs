#!/usr/bin/env node
// scratch probe (blind): reads the values at the states `contract.md §7.2` item 1 names,
// so the cells' expectations are written against clauses whose shape is known.
// NOTE: this probe's VALUES are read first; the cells' expected values are then written
// FROM THE CLAUSES (address-presence), and the runner is run cold.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PKG = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const K = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/src/constraint-kernel.mjs');
const dirs = [];
const tmp = () => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-probe-')); dirs.push(d); return d; };
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const d = (x) => (x instanceof Error ? `${x.constructor.name}: ${x.message} status=${JSON.stringify(x.status)}` : JSON.stringify(x));

// (1) an image carrying a key the supplied list does NOT name.
{
  const dir = tmp(); const P = path.join(dir, 'image.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s, ['a'], 'ca', () => true);
  const r1 = K.commit(s, ['a'], 'file', 5); K.runAttempt(s, r1);
  const s2 = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s2, ['b'], 'cb', () => true);
  const r2 = K.commit(s2, ['b'], 'file', 6); K.runAttempt(s2, r2);
  const image = fs.readFileSync(P, 'utf8');
  const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
  console.log('(1) unnamed-key boot');
  console.log('    image      =', JSON.stringify(image));
  console.log('    answer     =', r.ok ? 'INSTANCE' : `THREW ${d(r.v)}`);
  if (r.ok) { const reg = tryCall(() => PKG.read(r.v, [])); console.log('    read([])   =', reg.ok ? JSON.stringify(reg.v) : d(reg.v)); }
  console.log('    image after=', JSON.stringify(fs.readFileSync(P, 'utf8')));
}
// (2) a present two-byte `{}` image.
{
  const dir = tmp(); const P = path.join(dir, 'empty-obj.json');
  fs.writeFileSync(P, '{}');
  const before = fs.readFileSync(P);
  const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
  console.log('(2) present `{}` image');
  console.log('    size before=', before.length, 'answer =', r.ok ? 'INSTANCE' : `THREW ${d(r.v)}`);
  console.log('    image after=', JSON.stringify(fs.readFileSync(P, 'utf8')), 'byte-identical=', fs.readFileSync(P).equals(before));
}
// (3) a zero-byte file at cfg.filePath (the construction's own exclusive create).
{
  const dir = tmp(); const P = path.join(dir, 'zero.json');
  const first = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] }));
  const size0 = fs.existsSync(P) ? fs.statSync(P).size : null;
  const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
  console.log('(3) zero-byte file');
  console.log('    first create ok=', first.ok, 'size=', size0);
  console.log('    answer     =', r.ok ? 'INSTANCE' : `THREW ${d(r.v)}`);
  if (r.ok) { const reg = tryCall(() => PKG.read(r.v, [])); console.log('    read([])   =', reg.ok ? JSON.stringify(reg.v) : d(reg.v)); }
  console.log('    size after =', fs.statSync(P).size);
}
// (4) the same unnamed-key image, but the list names an address the image does NOT carry (the control).
{
  const dir = tmp(); const P = path.join(dir, 'image2.json');
  const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s, ['a'], 'ca', () => true);
  const r1 = K.commit(s, ['a'], 'file', 5); K.runAttempt(s, r1);
  const s2 = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
  K.register(s2, ['b'], 'cb', () => true);
  const r2 = K.commit(s2, ['b'], 'file', 6); K.runAttempt(s2, r2);
  const before = fs.readFileSync(P);
  const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }, { address: ['zz'], id: 'c2' }] }));
  console.log('(4) control: one named address resolves, one does not');
  console.log('    answer     =', r.ok ? 'INSTANCE' : `THREW ${d(r.v)}`, 'byte-identical=', fs.readFileSync(P).equals(before));
}
for (const x of dirs) { try { fs.rmSync(x, { recursive: true, force: true }); } catch (e) { /* */ } }
