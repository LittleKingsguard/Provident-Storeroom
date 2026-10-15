// probe (gate 6, second run), part 7 — the window shape the settled law leaves open for layer (b): the
// KERNEL's own write lands at a DESCENDANT of the registered address, so the write's pass evaluates no pair
// of that registration and the handle stands in `pending` for the caller's loop.  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, read, listen } = pkg;
const { register: K1, commit: K2, runAttempt: K3, report: K5 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-deliv2-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: 64, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status }; } };

console.log("== W1. K-1 pair at ['a']; a plain listener at ['a']; K-2's write at ['a','c'] (a descendant) ==");
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });            // object at ['a'] so ['a','c'] is writable
  K1(s, ['a'], 'cx', () => true);              // a pair at the WATCH address (not at the landing address)
  const h = listen(s, ['a']);
  let runs = 0; const args = [];
  let nested = null;
  const body = (a) => {
    runs += 1; args.push(a);
    try { const c = K2(s, ['a', 'c'], 'mem', 5); nested = K3(s, c); } catch (e) { nested = { threw: e.status }; }
  };
  s.register(h, body);
  const c = K2(s, ['a', 'c'], 'mem', 3);
  console.log(`at K-2's return: body runs=${runs} args=${JSON.stringify(args)} triggered=${c.triggered.length} pending=${c.pending.length}`);
  console.log(`   listener handle in pending=${c.pending.includes(h)}`);
  const map = new Map([[h, body]]);
  let loopN = 0;
  for (const hnd of c.pending) { loopN += 1; const f = map.get(hnd); if (f) f(['a', 'c']); }
  console.log(`   the caller's loop invoked ${loopN}; body runs now=${runs} args=${JSON.stringify(args)}`);
  console.log(`   the nested attempt from the body=${JSON.stringify(nested && (nested.threw || nested.outcome))}`);
  const rep = K5(s, c.attempt);
  console.log(`   the K-2 record's own attempt report outcome=${JSON.stringify(rep.outcome)} log=[${rep.log.map((e) => e.kind + '/' + e.id + '/' + e.state).join(' ')}]`);
}

console.log("\n== W2. the same, with the listener registered at ['a'] and the write at ['a'] (the driver's old shape) ==");
{
  const s = mk();
  K1(s, ['a'], 'cx', () => true);
  const h = listen(s, ['a']);
  let runs = 0;
  s.register(h, () => { runs += 1; });
  const c = K2(s, ['a'], 'mem', 3);
  console.log(`at K-2's return: runs=${runs} triggered=${c.triggered.length} pending=${c.pending.length}`);
}
