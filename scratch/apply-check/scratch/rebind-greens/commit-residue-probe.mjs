// scratch/rebind-greens/commit-residue-probe.mjs
// The residue of FTS-04.10, driven on the SECOND failing route the filed pass named (the path replaced by a
// regular file), so the finding is shown not to be route-specific. Driven, never read: the package entry and
// the kernel entry are imported only. Run: node scratch/rebind-greens/commit-residue-probe.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PKG = await import('../../bindings/js/index.mjs');
const K = await import('../../bindings/js/src/constraint-kernel.mjs');

const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-residue-'));
const P = path.join(d, 'store.json');
const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
K.register(s, ['a'], 'cA', () => true);
K.runAttempt(s, K.commit(s, ['a'], 'file', 111));
const pre = fs.readFileSync(P);
fs.rmSync(d, { recursive: true, force: true });
fs.writeFileSync(d, 'not a directory');

let caught = null; let log = null; let report = null;
K.register(s, ['b'], 'cB', () => true);
const rec = K.commit(s, ['b'], 'file', 222);
try { K.runAttempt(s, rec); } catch (e) { caught = e; }
try { log = K.log(s, rec.attempt); } catch (e) { log = `log threw ${e && e.message}`; }
try { report = K.report(s, rec.attempt); } catch (e) { report = `report threw ${e && e.message}`; }

console.log(`route: the path replaced by a regular file`);
console.log(`pre-image (before the path was replaced): ${pre.toString('utf8')}`);
console.log(`caught: ${caught ? `${caught.status} :: ${caught.message}` : '<no throw>'}`);
console.log(`log kinds: ${JSON.stringify(Array.isArray(log) ? log.map((e) => [e.kind, e.state, e.message]) : log)}`);
console.log(`report.outcome=${report && report.outcome} rollback=${report && JSON.stringify(report.rollback)}`);
fs.rmSync(d, { recursive: true, force: true });
