// probe (gate 6, second run), part 8 — the DESCENDANT window with a gate, so one delivery is measured at a
// time: who invokes the registered body when the KERNEL's own write lands below the registered address, and
// what does `pending` carry at K-2's return?  Experiment only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const pkg = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write, listen } = pkg;
const { register: K1, commit: K2, runAttempt: K3 } = kern;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-deliv3-'));
let n = 0;
const mk = () => storeCreate({ filePath: path.join(TMP, `s-${++n}.json`), journalLength: 64, listeners: [] });
const grab = (f) => { try { return { ok: true, v: f() }; } catch (e) { return { ok: false, status: e.status, msg: e.message }; } };

console.log("== G1. gated listener body, K-2's write at ['a','c'] below the registered ['a'] ==");
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });
  K1(s, ['a'], 'cx', () => true);
  const h = listen(s, ['a']);
  let runs = 0; const args = []; let gate = 0; let nested = null;
  const body = (a) => {
    runs += 1; args.push(a);
    if (gate > 0) return;              // the re-entrant invocations the store's own delivery makes
    gate += 1;
    try { const c = K2(s, ['a', 'c'], 'mem', 5); nested = c.op.opId; } catch (e) { nested = { threw: e.status }; }
  };
  s.register(h, body);
  const c = K2(s, ['a', 'c'], 'mem', 3);
  console.log(`at K-2's return: body runs=${runs} (re-entrant=${runs - 1}) args=${JSON.stringify(args.slice(0, 3))} triggered=${c.triggered.length} pending=${c.pending.length}`);
  console.log(`   listener handle in pending=${c.pending.includes(h)}; nested K-2 from the body=${JSON.stringify(nested)}`);
  const map = new Map([[h, body]]);
  let loopN = 0;
  for (const hnd of c.pending) { loopN += 1; const f = map.get(hnd); if (f) f(['a', 'c']); }
  console.log(`   the caller's loop over pending invoked ${loopN}; body runs now=${runs}`);
  const rep = grab(() => K3(s, c));
  console.log(`   K-3 over the K-2 record = ${JSON.stringify(rep.ok ? rep.v.outcome : rep.status)}`);
}

console.log("\n== G2. the same window with NO registered pair at the watch address ==");
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });
  const h = listen(s, ['a']);
  let runs = 0; const args = []; let gate = 0;
  const body = (a) => { runs += 1; args.push(a); if (gate > 0) return; gate += 1; };
  s.register(h, body);
  const c = K2(s, ['a', 'c'], 'mem', 3);
  console.log(`at K-2's return: runs=${runs} args=${JSON.stringify(args)} triggered=${c.triggered.length} pending=${c.pending.length} listenerInPending=${c.pending.includes(h)}`);
  let loopN = 0; const map = new Map([[h, body]]);
  for (const hnd of c.pending) { loopN += 1; const f = map.get(hnd); if (f) f(['a', 'c']); }
  console.log(`   the caller's loop invoked ${loopN}; runs now=${runs}`);
}

console.log("\n== G3. a caller's OWN store.write at a descendant, under a K-1 registration (the docs' step (1b)) ==");
{
  const s = mk();
  write(s, ['a'], 'mem', { o: 1 });
  K1(s, ['a'], 'cx', () => true);
  const h = listen(s, ['a']);
  let runs = 0; const args = []; let gate = 0;
  const body = (a) => { runs += 1; args.push(a); if (gate > 0) return; gate += 1; };
  s.register(h, body);
  const w = write(s, ['a', 'c'], 'mem', 5);
  console.log(`the caller's own write: runs=${runs} args=${JSON.stringify(args)} triggered=${w.triggered.length} keys=${Object.keys(w).join(',')}`);
}
