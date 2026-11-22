#!/usr/bin/env node
// ============================================================================
// GATE 6 — THE LIVE BATTERY FOR THE `file`-TIER SAVE  (role_live_scenario_runner)
// unit: the `file`-tier durable commit as the `settle` seam's terminal-arm act
// LAYER EVERY CELL CLAIMS: LIVE / ASSEMBLED PACKAGE
//
// WHAT THIS IS.  The blind set at bindings/js/greens/file-tier-save/ (GATE 5)
// authored 89 cells whose own header claims `LIVE/ASSEMBLED PACKAGE`.  This
// driver drives THAT SET AGAIN, unchanged in its ids, its clauses and its
// observables — but as a REAL CONSUMER of the BUILT package:
//
//   * the package entry   `bindings/js/index.mjs`                       (BUILT)
//   * the internal addon  `bindings/js/build/Release/storeroom_js_binding.node` (BUILT)
//   * the constraint kernel at `bindings/js/src/constraint-kernel.mjs` — the
//     package's OWN caller-side entry for the constraint pair, per
//     kernel-surface.md §1 (unchanged from the blind set: the kernel IS the
//     live path a consumer must use to install a constraint pair)
//   * REAL FILES on a REAL filesystem, under `scratch/live/file-tier-save/fs/`
//     (NOT os.tmpdir(): the durability question is about bytes on disk, and the
//     files are left in place as evidence)
//
// The blind set's own two doc-disagreement cells (FTS-09.5, FTS-11.5) keep the
// CONFLICT verdict here, and the same exit rule applies: exit 0 iff no FAIL and
// no CONFLICT.
//
// NO spec, test, implementation, tracker or greens byte is read or written by
// this pass.  This file is this pass's own artifact and writes only under
// scratch/live/file-tier-save/.
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');           // the repository root
const ENTRY = path.join(ROOT, 'bindings/js/index.mjs');
const ADDON_PATH = path.join(ROOT, 'bindings/js/build/Release/storeroom_js_binding.node');
const KERNEL_PATH = path.join(ROOT, 'bindings/js/src/constraint-kernel.mjs');
const FSROOT = path.join(HERE, 'fs');

const stamp = Date.now();
const RUNROOT = path.join(FSROOT, `run-${stamp}`);
fs.mkdirSync(RUNROOT, { recursive: true });
const scratchDirs = [];

const PKG = await import(pathToFileURL(ENTRY).href);
const K = await import(pathToFileURL(KERNEL_PATH).href);
const require = createRequire(import.meta.url);
const ADDON = require(ADDON_PATH);

console.log(`LIVE ENTRY   ${ENTRY}`);
console.log(`LIVE ADDON   ${ADDON_PATH}  (${fs.statSync(ADDON_PATH).size} bytes)`);
console.log(`LIVE KERNEL  ${KERNEL_PATH}`);
console.log(`LIVE FSROOT  ${RUNROOT}   uid=${typeof process.getuid === 'function' ? process.getuid() : 'n/a'} node=${process.version}`);

// ---------------------------------------------------------------- harness ---
const CELLS = [];
let SCENARIO = 'FTS-00';
const SCENARIO_VERDICT = {};
const RANK = { PASS: 0, CONFLICT: 1, FAIL: 2 };
const describe = (e) => {
  if (e === null) return 'null';
  if (e === undefined) return 'undefined';
  if (e instanceof Error) return `${e.constructor.name}: ${e.message}`;
  if (typeof e === 'object') {
    const keys = Object.getOwnPropertyNames(e).join(',');
    const inner = 'status' in e || 'message' in e ? ` status=${JSON.stringify(e.status)} message=${JSON.stringify(e.message)}` : '';
    return `thrown object{${keys}}${inner}`;
  }
  return `${typeof e} ${JSON.stringify(e)}`;
};
function record(id, verdict, detail, clause) {
  CELLS.push({ id, verdict, detail, clause });
  console.log(`RESULT ${id} ${verdict} :: ${detail} :: ${clause}`);
  const now = SCENARIO_VERDICT[SCENARIO] || 'PASS';
  if (verdict in RANK && RANK[verdict] > RANK[now]) SCENARIO_VERDICT[SCENARIO] = verdict;
}
function cell(id, clause, observable, body) {
  let verdict; let detail;
  try {
    const r = body();
    if (r === true) { verdict = 'PASS'; detail = observable; }
    else if (Array.isArray(r)) { verdict = r[0] ? 'PASS' : 'FAIL'; detail = `${observable} :: ${r[1]}`; }
    else if (r && typeof r === 'object' && r.conflict) { verdict = 'CONFLICT'; detail = `${observable} :: ${r.detail}`; }
    else if (r && typeof r === 'object' && 'ok' in r) { verdict = r.ok ? 'PASS' : 'FAIL'; detail = `${observable} :: ${r.detail}`; }
    else { verdict = 'FAIL'; detail = `${observable} :: cell returned no verdict: ${JSON.stringify(r)}`; }
  } catch (e) {
    verdict = 'FAIL'; detail = `${observable} :: UNDECLARED THROW: ${describe(e)}`;
  }
  record(id, verdict, detail, clause);
}
function observed(id, clause, observable, body) {
  let value;
  try { value = JSON.stringify(body(), (k, v) => (typeof v === 'function' ? '[function]' : v)); }
  catch (e) { value = `THREW ${describe(e)}`; }
  if (value === undefined) value = 'undefined';
  record(id, 'OBSERVED', `${observable} :: ${value}`, clause);
}
function notDrivable(id, clause, reason) { record(id, 'NOT DRIVABLE LIVE', reason, clause); }
const C = (ok, detail) => ({ ok: !!ok, detail });
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const bytes = (p) => { try { return fs.readFileSync(p); } catch (e) { return null; } };
const bytesEq = (a, b) => (a === null || b === null ? a === b : a.equals(b));
const imgStr = (b) => (b === null ? 'NO FILE' : JSON.stringify(b.toString('utf8')));
const PLACEHOLDER = /<[A-Za-z_ ]+>/;
// every fixture is a REAL path under the run root, kept as evidence
function tmp() { const d = path.join(RUNROOT, `c${String(scratchDirs.length).padStart(2, '0')}`); fs.mkdirSync(d, { recursive: true }); scratchDirs.push(d); return d; }
function scenario(id, title, clause, body) {
  SCENARIO = id;
  SCENARIO_VERDICT[id] = SCENARIO_VERDICT[id] || 'PASS';
  console.log(`\n--- ${id} ${title} — ${clause}`);
  try { body(); } catch (e) { record(`${id}.x0`, 'FAIL', `the scenario threw outside a cell: ${describe(e)}`, clause); }
  console.log(`SCENARIO ${id} ${SCENARIO_VERDICT[id]} :: ${title}`);
}

// =============================================================== FTS-01 =====
scenario('FTS-01', 'the terminal arm: constraint first, save second, listener third (the ordinary passing path)',
  'surface.md §2.11 clauses 2-3; §2.7 item 6; §2.4 item 9 table', async () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const emptyImage = bytes(P);
    const ord = []; const seen = [];
    const imageAt = () => (bytes(P) === null ? 'NO FILE' : bytes(P).toString('utf8'));
    const h = K.register(s, ['c'], 'c1', () => { ord.push(['constraint', imageAt()]); return true; });
    s.register(h, (addr) => { ord.push(['listener', imageAt()]); seen.push(addr); });
    const rec = K.commit(s, ['c'], 'file', 42);
    const rep = K.runAttempt(s, rec);
    const image = bytes(P);
    const report = (() => { const r = tryCall(() => K.report(s, rec.attempt)); return r.ok ? r.v : r.v; })();
    const logEntries = (() => { const r = tryCall(() => K.log(s, rec.attempt)); return r.ok ? r.v : r.v; })();
    cell('FTS-01.1', 'surface.md §2.11 clause 3 (i) + §2.7 item 6',
      'the constraint body runs at the pass, and at that instant the file carries the construction\'s own zero-byte image (nothing of this write is saved yet)',
      () => C(ord.length >= 1 && ord[0][0] === 'constraint' && emptyImage !== null && emptyImage.length === 0 && ord[0][1] === '',
        `ordinals=${JSON.stringify(ord)} image at construction=${imgStr(emptyImage)}`));
    cell('FTS-01.2', 'surface.md §2.11 clause 3 (ii) + contract.md §7.2 item 2',
      'every body of the delivered set runs AFTER the save: the listener reads the file and finds the post-save image carrying the write\'s version',
      () => {
        const listener = ord.find((o) => o[0] === 'listener');
        let parsed = null;
        try { parsed = listener ? JSON.parse(listener[1]) : null; } catch (e) { parsed = null; }
        return C(!!listener && !!parsed && parsed.c === 42, `ordinals=${JSON.stringify(ord)} image read inside the listener=${listener ? JSON.stringify(listener[1]) : 'NO LISTENER BODY RAN'}`);
      });
    cell('FTS-01.3', 'surface.md §2.11 clause 3 (the save stands between the two bodies)',
      'the recorded ordinals are exactly two — the constraint then the listener — and the SAVE stands between them: the first read the pre-save image (empty text) and the second the post-save image carrying the version',
      () => {
        const first = ord[0] || []; const second = ord[1] || [];
        let parsed = null;
        try { parsed = JSON.parse(second[1]); } catch (e) { parsed = null; }
        return C(ord.length === 2 && first[0] === 'constraint' && first[1] === '' && second[0] === 'listener' && !!parsed && parsed.c === 42,
          `ordinals=${JSON.stringify(ord)}`);
      });
    cell('FTS-01.4', 'surface.md §2.7 item 7 (a) (the triggering address as the single argument)',
      'the listener body is invoked once, with the write\'s own address as its single argument',
      () => C(seen.length === 1 && JSON.stringify(seen[0]) === JSON.stringify(['c']), `invocations=${seen.length} arguments=${JSON.stringify(seen)}`));
    cell('FTS-01.5', 'surface.md §2.11 clause 2 + contract.md §8.1',
      'the pass reports the passing arm: outcome "passed", an empty rollback list, and no throw',
      () => C(rep.outcome === 'passed' && Array.isArray(rep.rollback) && rep.rollback.length === 0, `outcome=${rep.outcome} rollback=${JSON.stringify(rep.rollback)}`));
    cell('FTS-01.6', 'surface.md §2.11 clause 2 (keyed by the settled record\'s own op)',
      'the durable image is the register the pass settled: the write\'s version is present in the file',
      () => {
        const parsed = image ? JSON.parse(image.toString('utf8')) : null;
        return C(!!parsed && parsed.c === 42, `before=${imgStr(emptyImage)} after=${imgStr(image)}`);
      });
    observed('FTS-01.7', 'surface.md §2.4 item 9 (e)-(f) (the record\'s own members)',
      'the record\'s residue and checked-off sets as the run carries them', () => ({ triggered: rec.triggered.length, pending: rec.pending.length }));
    cell('FTS-01.8', 'kernel-surface.md §2.1 item 3\'s `LogKind` table AS AMENDED 2026-10-16 + §2.5 item 1\'s ordering clause (THE `commit` ENTRY IS APPENDED **AFTER THE SAVE HAS STOOD**, AND IT IS APPENDED **EXACTLY ONCE AND LAST** ON THE PASSING ARM)',
      'the passing arm\'s log carries the `commit` entry EXACTLY ONCE and LAST, and its `opId` is the attempt\'s last op — the entry that once preceded the save no longer does',
      () => {
        const kinds = logEntries.map((e) => e.kind);
        const commitEntries = logEntries.filter((e) => e.kind === 'commit');
        const lastOp = rep.ops[rep.ops.length - 1];
        return C(commitEntries.length === 1 && kinds[kinds.length - 1] === 'commit'
          && commitEntries[0].opId === lastOp.opId,
          `kind order=${JSON.stringify(kinds)} ; commit entries=${commitEntries.length} ; commit.opId=${commitEntries.length ? commitEntries[0].opId : '-'} last op=${lastOp.opId}`);
      });
    console.log(`  LIVE-READ FTS-01 file=${imgStr(image)} path=${P}`);
    console.log(`  LIVE-READ FTS-01 report=${JSON.stringify(report)}`);
    console.log(`  LIVE-READ FTS-01 log=${JSON.stringify(logEntries)}`);
  });

// =============================================================== FTS-02 =====
scenario('FTS-02', 'a constraint\'s refusal prevents the save and discards the write\'s listeners',
  'surface.md §2.11 clause 1 (the failing arm unmoved), clause 3 (i), clause 4 (i); fail-surface.md §2 KC-3', async () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const hPre = K.register(s, ['p'], 'cP', () => true);
    const recPre = K.commit(s, ['p'], 'file', 111);
    K.runAttempt(s, recPre);
    const preImage = bytes(P);
    let fired = 0;
    const h = K.register(s, ['e'], 'cE', () => ({ message: 'refused by the application' }));
    s.register(h, () => { fired++; });
    const rec = K.commit(s, ['e'], 'file', 7);
    const out = tryCall(() => K.runAttempt(s, rec));
    cell('FTS-02.1', 'surface.md §2.11 clause 4 (i) + contract.md §7.2 item 2',
      'the pass fails, so no save is performed: the bytes at cfg.filePath are byte-identical to the pre-image',
      () => C(!out.ok && bytesEq(bytes(P), preImage), `pre=${imgStr(preImage)} post=${imgStr(bytes(P))}`));
    cell('FTS-02.2', 'surface.md §2.11 clause 3 (i) + §2.7 items 6-7 (d)',
      'the failing pass\'s discard reaches the triggered set: no body of this write ran',
      () => C(fired === 0, `listener invocations=${fired}`));
    cell('FTS-02.3', 'docs/specs/storeroom-constraints/fail-surface.md §1.1',
      'the pass reports the failure in the kernel\'s single form: one thrown value carrying { status, message, log }',
      () => C(!out.ok && out.v && typeof out.v === 'object' && ['status', 'message', 'log'].every((k) => k in out.v) && Array.isArray(out.v.log),
        `thrown=${describe(out.v)}`));
    cell('FTS-02.4', 'fail-surface.md §2 (KC-3 — ConstraintViolated)',
      'the failure token is a member of the kernel\'s closed set and is KC-3 (the unrepairable constraint violation)',
      () => C(!out.ok && out.v && out.v.status === 'KC-3', `status=${JSON.stringify(out.v && out.v.status)} message=${JSON.stringify(out.v && out.v.message)}`));
    cell('FTS-02.5', 'surface.md §2.11 clause 1 (the failing arm drives no store call for that write)',
      'the refused write left no state: the store answers AddressNotFound at its address while the pre-image remains readable',
      () => {
        const r = tryCall(() => PKG.read(s, ['e']));
        return C(!r.ok && r.v && r.v.status === 'AddressNotFound', `read e -> ${describe(r.v)}`);
      });
    cell('FTS-02.6', 'surface.md §2.1 item 3 (THROWS — the log gains the outcome entry)',
      'the thrown failure\'s log carries the outcome entry whose state is the token the form\'s status carries',
      () => {
        const lg = tryCall(() => K.log(s, rec.attempt));
        const entries = lg.ok ? lg.v : [];
        const outcome = entries.filter((e) => e.kind === 'outcome');
        return C(lg.ok && outcome.length === 1 && outcome[0].state === 'KC-3',
          `log=${JSON.stringify(entries.map((e) => [e.kind, e.state]))}`);
      });
    console.log(`  LIVE-READ FTS-02 file=${imgStr(bytes(P))} path=${P}`);
    void hPre;
  });

// =============================================================== FTS-03 =====
scenario('FTS-03', 'a passing pass\'s image is durable before any listener body runs, and survives a fresh boot',
  'surface.md §2.11 clause 4 (ii); contract.md §7.2 item 6 (the boot)', async () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    let freshRead = 'NO BODY RAN';
    const h = K.register(s, ['c'], 'c1', () => true);
    s.register(h, () => {
      const fresh = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      const r = tryCall(() => PKG.read(fresh, ['c']));
      freshRead = r.ok ? JSON.stringify(r.v) : describe(r.v);
    });
    const rec = K.commit(s, ['c'], 'file', 4242);
    const rep = K.runAttempt(s, rec);
    cell('FTS-03.1', 'surface.md §2.11 clause 4 (ii)',
      'the file\'s bytes read from a FRESH instance over an equal cfg.filePath carry the version the write installed, at the instant the first body runs',
      () => C(freshRead === '4242', `fresh instance read inside the body = ${freshRead}`));
    cell('FTS-03.2', 'contract.md §7.2 item 6 + §2.11 clause 4 (ii)',
      'a fresh boot after the pass loads the installed version (the image is the register the pass settled)',
      () => {
        const fresh = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
        const r = tryCall(() => PKG.read(fresh, ['c']));
        return C(r.ok && r.v === 4242, `fresh boot read = ${r.ok ? JSON.stringify(r.v) : describe(r.v)} image=${imgStr(bytes(P))}`);
      });
    cell('FTS-03.3', 'surface.md §2.11 clause 2 (the act is keyed by the settled record\'s own op)',
      'the passing pass reports passed and the file image is a JSON object carrying this write\'s version',
      () => {
        const b = bytes(P); const parsed = b ? JSON.parse(b.toString('utf8')) : null;
        return C(rep.outcome === 'passed' && !!parsed && parsed.c === 4242, `outcome=${rep.outcome} image=${imgStr(b)}`);
      });
    console.log(`  LIVE-READ FTS-03 file=${imgStr(bytes(P))} path=${P}`);
  });

// =============================================================== FTS-04 =====
scenario('FTS-04', 'the failing save: rollback first, message second, the pre-image standing',
  'surface.md §2.11 clause 5; contract.md §7.2 items 2-3; §8.1 #15; §8.2', async () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const hPre = K.register(s, ['a'], 'cA', () => true);
    const recPre = K.commit(s, ['a'], 'file', 111);
    K.runAttempt(s, recPre);
    const preImage = bytes(P);
    let fired = 0;
    let caught = null; let stateInsideCatch = null;
    // THE EXTERNAL EVENT: the parent directory's access changes between the
    // construction and the save.  Verified FIRST (the deny probe below), so a
    // root session parks this scenario instead of driving a green.
    fs.chmodSync(d, 0o555);
    const denyProbe = tryCall(() => { fs.writeFileSync(path.join(d, '.probe'), 'x'); fs.unlinkSync(path.join(d, '.probe')); return true; });
    const h = K.register(s, ['b'], 'cB', () => true);
    s.register(h, () => { fired++; });
    const rec = K.commit(s, ['b'], 'file', 222);
    try { K.runAttempt(s, rec); } catch (e) { caught = e; stateInsideCatch = tryCall(() => PKG.read(s, ['b'])); }
    fs.chModSync ? null : null;
    try { fs.chmodSync(d, 0o755); } catch (e) { /* reported below */ }
    if (denyProbe.ok) {
      notDrivable('FTS-04.*', 'surface.md §2.11 clause 5 (the failing save)',
        `this environment does not deny a write into a 0o555 directory (uid=${process.getuid()}), so a failing save cannot be produced by that event; the direct write into it SUCCEEDED.`);
      return;
    }
    cell('FTS-04.1', 'surface.md §2.11 clause 5',
      'the save\'s own act fails and the caller catches exactly one thrown value (the pass does not resolve)',
      () => C(caught !== null, `caught=${describe(caught)}`));
    cell('FTS-04.2', 'contract.md §8.1 #15 (the caller meets the store\'s single failure form)',
      'the caught value is the store\'s form: a plain object of exactly two members { status, message }, never returned',
      () => C(caught && typeof caught === 'object' && !(caught instanceof Error) && Object.getOwnPropertyNames(caught).length === 2
        && 'status' in caught && 'message' in caught, `members=${caught ? Object.getOwnPropertyNames(caught).join(',') : '-'} caught=${describe(caught)}`));
    cell('FTS-04.3', 'contract.md §8.1 rank #15 (FileCommitFailed; the trigger widened to reach the save act)',
      'the caught status is the store\'s own #15 token FileCommitFailed',
      () => C(caught && caught.status === 'FileCommitFailed', `status=${JSON.stringify(caught && caught.status)}`));
    cell('FTS-04.4', 'contract.md §8.2 (the #15 row: the mismatch clause, the path slot, no placeholder)',
      'the caught message is the generated one #15 carries: non-empty, the row\'s two clauses present, the failing path in its <PATH> slot, no unsubstituted placeholder',
      () => {
        const m = caught && caught.message;
        return C(typeof m === 'string' && m.length > 0 && !PLACEHOLDER.test(m) && m.includes('could not be committed to')
          && m.includes('the file write failed at') && m.includes(P), `message=${JSON.stringify(m)}`);
      });
    cell('FTS-04.5', 'surface.md §2.11 clause 4 (i) (a failing pass leaves the last passing image durable)',
      'the bytes at cfg.filePath are byte-identical to the pre-image: no partial, truncated or rebuilt image stands',
      () => C(bytesEq(bytes(P), preImage), `pre=${imgStr(preImage)} post=${imgStr(bytes(P))}`));
    cell('FTS-04.6', 'contract.md §7.2 item 3 + surface.md §2.11 clause 5 (the rollback happens FIRST)',
      'at the instant the caller catches the failure the store\'s own state is already rolled back: the failed write\'s value is gone and the pre-image value is readable',
      () => {
        const r = stateInsideCatch;
        const a = tryCall(() => PKG.read(s, ['a']));
        return C(r && !r.ok && r.v && r.v.status === 'AddressNotFound' && a.ok && a.v === 111,
          `inside the catch: read b -> ${describe(r && r.v)} ; read a -> ${a.ok ? JSON.stringify(a.v) : describe(a.v)}`);
      });
    cell('FTS-04.7', 'surface.md §2.11 clause 3 (i) + §2.7 item 7 (d)',
      'the failing save is a failing arm: no body of the delivered set ran',
      () => C(fired === 0, `listener invocations=${fired}`));
    cell('FTS-04.8', 'surface.md §2.11 clause 5 (the two triggers do not overlap)',
      'the failed save never answers the sixteenth member\'s code: #15 and #16 stay distinct',
      () => C(caught && caught.status !== 'ConstraintListInvalid', `status=${JSON.stringify(caught && caught.status)}`));
    cell('FTS-04.9', 'surface.md §2.11 clause 5 (the entry is a KC token of the kernel\'s own set; the pass reports the failure) read with kernel-surface.md §2.1 item 3\'s `LogKind` table AS AMENDED 2026-10-16 (THE FAILING ARM CARRIES THE ONE `outcome` ENTRY AND **NO** `commit` ENTRY AT ALL) and §2.5 item 1\'s ordering clause (appended AFTER the save has stood, exactly once and last)',
      'the attempt\'s own record reports the save\'s failure: the log gains exactly one outcome entry carrying a KC token, the report does not claim the passing arm, and the failed save left NO `commit` entry in the log',
      () => {
        const lg = tryCall(() => K.log(s, rec.attempt));
        const rp = tryCall(() => K.report(s, rec.attempt));
        const entries = lg.ok ? lg.v : [];
        const outcome = entries.filter((e) => e.kind === 'outcome');
        const commits = entries.filter((e) => e.kind === 'commit');
        const kc = /^KC-[1-8]$/;
        return C(lg.ok && outcome.length === 1 && kc.test(String(outcome[0].state)) && commits.length === 0
          && rp.ok && rp.v.outcome !== 'passed',
          `log=${JSON.stringify(entries.map((e) => [e.kind, e.state, e.message]))} commit entries=${commits.length} report.outcome=${rp.ok ? rp.v.outcome : describe(rp.v)} report.rollback=${rp.ok ? JSON.stringify(rp.v.rollback) : '-'}`);
      });
    console.log(`  LIVE-READ FTS-04 file=${imgStr(bytes(P))} path=${P} denyProbe=${denyProbe.ok ? 'NOT DENIED' : 'DENIED'}`);
    void hPre;
  });

// =============================================================== FTS-04b ====
// THE SECOND INDEPENDENT ROUTE TO A FAILING SAVE the blind set reports: the
// file's place is taken by a DIRECTORY after the construction.  Driven live so
// the FTS-04.9 finding is not read as an artefact of one event.
scenario('FTS-04b', 'the failing save, second route: the image path becomes a directory between construction and save',
  'surface.md §2.11 clause 5 (reproduced on an independent route)', async () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const hPre = K.register(s, ['a'], 'cA', () => true);
    K.runAttempt(s, K.commit(s, ['a'], 'file', 111));
    const preImage = bytes(P);
    let caught = null;
    fs.rmSync(P); fs.mkdirSync(P);              // the image's place is now a directory
    const dirProbe = tryCall(() => { fs.writeFileSync(P, 'x'); return true; });
    K.register(s, ['b'], 'cB', () => true);
    const rec = K.commit(s, ['b'], 'file', 222);
    let logEntries = null; let report = null;
    try { K.runAttempt(s, rec); } catch (e) { caught = e; }
    const lg = tryCall(() => K.log(s, rec.attempt)); if (lg.ok) logEntries = lg.v.map((e) => [e.kind, e.state, e.message]);
    const rp = tryCall(() => K.report(s, rec.attempt)); if (rp.ok) report = rp.v;
    cell('FTS-04b.1', 'contract.md §8.1 #15 (the same member, an independent route)',
      'the directory-valued image path makes the save fail with the store\'s own #15, and the caller catches it',
      () => C(caught && caught.status === 'FileCommitFailed',
        `direct write into the directory ${dirProbe.ok ? 'SUCCEEDED (unexpected)' : 'failed as required'} ; caught=${describe(caught)}`));
    cell('FTS-04b.2', 'surface.md §2.11 clause 5 (the report of a failed save, second route) read with kernel-surface.md §2.1 item 3\'s `LogKind` table AS AMENDED 2026-10-16 (no `commit` entry on the failing arm)',
      'the attempt\'s own record reports the save\'s failure on this route too: the log carries exactly one outcome entry with a KC token, NO commit entry, and the report does not claim the passing arm',
      () => {
        const outcome = (logEntries || []).filter((e) => e[0] === 'outcome');
        const commits = (logEntries || []).filter((e) => e[0] === 'commit');
        const kc = /^KC-[1-8]$/;
        return C(outcome.length === 1 && kc.test(String(outcome[0][1])) && commits.length === 0
          && !!report && report.outcome !== 'passed',
          `log=${JSON.stringify(logEntries)} commit entries=${commits.length} report.outcome=${report ? report.outcome : 'NO REPORT'} report.rollback=${report ? JSON.stringify(report.rollback) : '-'}`);
      });
    console.log(`  LIVE-READ FTS-04b caught=${describe(caught)} fileAtPath=${fs.existsSync(P) ? 'a directory stands at the image path' : 'NO FILE'}`);
    void hPre; void preImage;
  });

// =============================================================== FTS-05 =====
scenario('FTS-05', 'the save\'s arm table is closed and total (bare write, mem tier, file tier, a closed record)',
  'surface.md §2.11 clause 2; contract.md §7.2 item 5; §2.11 clause 1 (the failing arm unmoved)', async () => {
    const d1 = tmp(); const P1 = path.join(d1, 'a.json');
    const s1 = PKG.storeCreate({ filePath: P1, journalLength: 8, listeners: [] });
    const w1 = tryCall(() => PKG.write(s1, ['a'], 'file', 1));
    cell('FTS-05.1', 'surface.md §2.11 clause 2 (the act is the terminal arm\'s, and there is no second arm of it)',
      'a bare caller-made file-tier write performs NO save: the verb returns its own result and the file keeps the construction\'s zero-byte image',
      () => C(w1.ok && !!w1.v.op && (bytes(P1) || Buffer.from('')).length === 0, `write=${w1.ok ? JSON.stringify(w1.v.op.opId) : describe(w1.v)} image=${imgStr(bytes(P1))}`));
    cell('FTS-05.2', 'surface.md §2.11 clause 2 (a record whose own op is not a file-tier write\'s performs no save)',
      'a mem-tier write driven through commit and runAttempt performs no save and still delivers its listener',
      () => {
        const d = tmp(); const P = path.join(d, 'm.json');
        const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
        let n = 0;
        const h = K.register(s, ['m'], 'cM', () => true);
        s.register(h, () => { n++; });
        const rec = K.commit(s, ['m'], 'mem', 3);
        const rep = K.runAttempt(s, rec);
        return C(rep.outcome === 'passed' && n === 1 && (bytes(P) || Buffer.from('')).length === 0,
          `outcome=${rep.outcome} listener invocations=${n} image=${imgStr(bytes(P))}`);
      });
    cell('FTS-05.3', 'surface.md §2.11 clause 2 (the act IS performed on the passing arm for a file-tier op)',
      'a file-tier write driven through commit and runAttempt performs the save: the bytes move from the pre-image to the image carrying the version',
      () => {
        const d = tmp(); const P = path.join(d, 'f.json');
        const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
        const pre = bytes(P);
        K.register(s, ['c'], 'c1', () => true);
        const rec = K.commit(s, ['c'], 'file', 5);
        const rep = K.runAttempt(s, rec);
        const image = bytes(P); const parsed = image ? JSON.parse(image.toString('utf8')) : null;
        return C(rep.outcome === 'passed' && pre.length === 0 && !!parsed && parsed.c === 5, `pre=${imgStr(pre)} post=${imgStr(image)}`);
      });
    cell('FTS-05.4', 'surface.md §2.1 item 3 (the closed record) + §2.11 clause 2 (at most one save per record)',
      'a re-drive of the same settled record is refused with a KC token and performs NO second save: the bytes stand',
      () => {
        const d = tmp(); const P = path.join(d, 'r.json');
        const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
        K.register(s, ['c'], 'c1', () => true);
        const rec = K.commit(s, ['c'], 'file', 6);
        K.runAttempt(s, rec);
        const afterFirst = bytes(P);
        const again = tryCall(() => K.runAttempt(s, rec));
        const kc = /^KC-[1-8]$/;
        return C(!again.ok && kc.test(String(again.v && again.v.status)) && bytesEq(bytes(P), afterFirst),
          `re-drive=${describe(again.v)} image after the first save=${imgStr(afterFirst)} image after the re-drive=${imgStr(bytes(P))}`);
      });
  });

// =============================================================== FTS-06 =====
scenario('FTS-06', 'the fifth position: absence proceeds, a supplied `undefined` is refused by the arity gate',
  'surface.md §2.2 clauses 1-4; parameter-semantics.md §2.20; §2.4 item 9 (g) item 1', async () => {
    const d = tmp(); const P = path.join(d, 'arg5.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    cell('FTS-06.1', 'surface.md §2.2 clause 2 (the position is optional; absent it is IN DOMAIN)',
      'a write of four arguments proceeds and returns the store\'s own write result',
      () => {
        const w = tryCall(() => PKG.write(s, ['a'], 'file', 1));
        return C(w.ok && !!w.v && !!w.v.op && typeof w.v.op.opId === 'string', `write -> ${w.ok ? JSON.stringify(Object.keys(w.v)) : describe(w.v)}`);
      });
    const refused = tryCall(() => PKG.write(s, ['z'], 'file', 1, undefined));
    cell('FTS-06.2', 'surface.md §2.2 clause 3 (a supplied `undefined` is refused, and this is the arity gate\'s own case)',
      'a fifth argument supplied as undefined is refused by the position\'s own arity reading (not by the class test)',
      () => C(!refused.ok, `write(a,t,v,undefined) -> ${refused.ok ? 'PROCEEDED' : describe(refused.v)}`));
    cell('FTS-06.3', 'surface.md §2.4 item 9 (b) (the refusal\'s form: one class, `status` absent, a string `message` required)',
      'the refusal is a TypeError — one class, its `status` member ABSENT, a non-empty string `message` present',
      () => {
        const e = refused.v;
        return C(!refused.ok && e instanceof TypeError && !('status' in e)
          && typeof e.message === 'string' && e.message.length > 0,
          `class=${e && e.constructor && e.constructor.name} status present?=${e && 'status' in e} ownMembers=${e ? Object.getOwnPropertyNames(e).join(',') : '-'} message=${JSON.stringify(e && e.message)}`);
      });
    cell('FTS-06.4', 'surface.md §2.2 clause 4 (a refused write does not proceed)',
      'the refused write performed no store call: the address still holds nothing',
      () => {
        const r = tryCall(() => PKG.read(s, ['z']));
        const reg = tryCall(() => PKG.read(s, []));
        return C(!r.ok && r.v && r.v.status === 'AddressNotFound' && reg.ok && !('z' in reg.v),
          `read z -> ${describe(r.v)} ; register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)}`);
      });
    observed('FTS-06.5', 'surface.md §2.2 clause 4 (the arity reading is separate from the class test)',
      'the refusal\'s message as the boundary spells it', () => String(refused.v && refused.v.message));
  });

// =============================================================== FTS-07 =====
scenario('FTS-07', 'the fifth position\'s class test: every outside value refused, a plain object carrying `pending` admitted',
  'surface.md §2.4 item 9 (g) item 1; parameter-semantics.md §2.19, §2.20', async () => {
    const d = tmp(); const P = path.join(d, 'class.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const outside = [
      ['null', null], ['a number', 3], ['a string', 'x'], ['a boolean', true],
      ['a function', () => true], ['an Array', []], ['a plain object {}', {}],
      ['a plain object carrying `pending: undefined`', { pending: undefined }],
    ];
    let i = 0;
    for (const [label, v] of outside) {
      i += 1;
      const r = tryCall(() => PKG.write(s, ['q'], 'file', 1, v));
      cell(`FTS-07.${i}`, 'surface.md §2.4 item 9 (g) item 1 (the class test)',
        `${label} at the fifth position is refused: a TypeError whose status is ABSENT and whose message is a string`,
        () => {
          const e = r.v;
          return C(!r.ok && e instanceof TypeError && !('status' in e) && typeof e.message === 'string' && e.message.length > 0,
            `${r.ok ? 'PROCEEDED' : `class=${e && e.constructor && e.constructor.name} statusPresent=${e && 'status' in e} message=${JSON.stringify(e && e.message)}`}`);
        });
    }
    cell('FTS-07.9', 'surface.md §2.4 item 9 (g) item 1 + §2.19 (a Proxy is refused on its class, before any member read)',
      'a Proxy carrying `pending` is refused, where the same member on a plain object stands IN DOMAIN',
      () => {
        const proxied = tryCall(() => PKG.write(s, ['q'], 'file', 1, new Proxy({ pending: [] }, {})));
        const plain = tryCall(() => PKG.write(s, ['q'], 'file', 1, { pending: [] }));
        return C(!proxied.ok && plain.ok, `Proxy -> ${proxied.ok ? 'PROCEEDED' : describe(proxied.v)} ; plain {pending: []} -> ${plain.ok ? 'PROCEEDED' : describe(plain.v)}`);
      });
    cell('FTS-07.10', 'surface.md §2.19 (the class test is what the boundary evaluates, and never an adoption history)',
      'a plain object carrying a present, non-undefined `pending` is IN DOMAIN: the write proceeds with no throw',
      () => {
        const r = tryCall(() => PKG.write(s, ['q'], 'file', 1, { pending: [] }));
        return C(r.ok && !!r.v.op, `write -> ${r.ok ? JSON.stringify(r.v.op.opId) : describe(r.v)}`);
      });
    cell('FTS-07.11', 'surface.md §2.4 item 9 (g) item 1 AS RULED 2026-10-16 (the wider class is ADMITTED — docs/decisions.md · A120 (1), whose own words lift the "no drive may assert this row" bar)',
      'the wider class is law and admits: an object carrying `pending` whose entries are ANOTHER instance\'s handle, and one whose entries are not handles at all, BOTH PROCEED at the fifth position — the class test asks only whether a `pending` member is present, and an unresolvable residue is the caller\'s own error surfacing later',
      () => {
        const foreign = PKG.listen(s, ['fa']);
        const foreignContext = { pending: [foreign] };
        const junkContext = { pending: [{ notAHandle: true }] };
        const a = tryCall(() => PKG.write(s, ['q'], 'file', 1, foreignContext));
        const b = tryCall(() => PKG.write(s, ['q'], 'file', 1, junkContext));
        return C(a.ok && !!a.v.op && b.ok && !!b.v.op,
          `{pending:[another instance's handle]} -> ${a.ok ? `PROCEEDED (${a.v.op.opId})` : describe(a.v)} ; {pending:[{notAHandle:true}]} -> ${b.ok ? `PROCEEDED (${b.v.op.opId})` : describe(b.v)} ; the class test reads the member's PRESENCE and never its contents`);
      });
  });

// =============================================================== FTS-08 =====
scenario('FTS-08', 'the fourth cfg key at construction: the legal forms make an instance, every outside form answers #16 and leaves nothing behind',
  'surface.md §2.1 (the dated four-key clause); contract.md §7.1 step 4-bis; §8.1 #16; parameter-semantics.md §2.21', async () => {
    const legal = [
      ['absent (no list is declared)', 'ABSENT', []],
      ['the empty list', [], []],
      ['one valid pair', [{ address: ['a'], id: 'c1' }], []],
      ['two valid pairs, with an integer segment', [{ address: ['a'], id: 'c1' }, { address: ['b', 0], id: 'c2' }], []],
    ];
    let n = 0;
    for (const [label, value] of legal) {
      n += 1;
      cell(`FTS-08.${n}`, 'surface.md §2.1 (dated) + parameter-semantics.md §2.21 (the legal forms; `constraints` alone is optional)',
        `${label} is IN DOMAIN: the construction returns an instance and the register carries no key of the list`,
        () => {
          const d = tmp(); const P = path.join(d, 'ok.json');
          const cfg = { filePath: P, journalLength: 8, listeners: [] };
          if (value !== 'ABSENT') cfg.constraints = value;
          const r = tryCall(() => PKG.storeCreate(cfg));
          if (!r.ok) return C(false, `THREW ${describe(r.v)}`);
          const reg = tryCall(() => PKG.read(r.v, []));
          const keys = reg.ok ? Object.keys(reg.v) : [];
          return C(!keys.includes('constraints'), `instance returned ; register keys=${JSON.stringify(keys)}`);
        });
    }
    const outsideList = [
      ['an element that is not a pair ({})', [{}]],
      ['a pair whose id is absent', [{ address: ['a'] }]],
      ['a pair whose id is not a string', [{ address: ['a'], id: 42 }]],
      ['a pair whose address is a string and not a segment array', [{ address: 'a', id: 'c1' }]],
      ['an address with a non-integer numeric segment', [{ address: [1.5], id: 'c1' }]],
      ['an address with a negative segment', [{ address: [-1], id: 'c1' }]],
      ['null', null],
      ['undefined present', undefined],
      ['a string', 'a'],
      ['a number', 7],
      ['a plain object', { address: ['a'], id: 'c1' }],
      ['a function', () => true],
    ];
    for (const [label, value] of outsideList) {
      n += 1;
      cell(`FTS-08.${n}`, 'surface.md §2.1 (dated) + parameter-semantics.md §2.21 (the outside values)',
        `${label} answers the store\'s own #16 with no instance returned`,
        () => {
          const d = tmp(); const P = path.join(d, 'bad.json');
          const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: value }));
          if (r.ok) return C(false, 'an instance was returned for an outside value');
          const e = r.v;
          return C(e && e.status === 'ConstraintListInvalid' && typeof e.message === 'string' && e.message.length > 0, `${describe(e)}`);
        });
    }
    observed('FTS-08.17', 'parameter-semantics.md §2.21 (the outside-value list names "a pair whose `id` is absent or not a string" — an empty string is a string, so it is NOT on that list) read against kernel-surface.md §1 (K-1 takes a non-empty string id)',
      'a pair whose id is the EMPTY STRING', () => {
        const d = tmp(); const P = path.join(d, 'empty-id.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: '' }] }));
        return r.ok ? 'INSTANCE (the empty id is in domain)' : `THREW ${describe(r.v)} — refused although §2.21's own outside-value list does not name this form`;
      });
    observed('FTS-08.18', 'contract.md §1.5 item 4 (the empty address exists; the register\'s own address) read against §2.21\'s domain (an address "inside §1.5\'s segment array")',
      'the empty address `[]` and the single integer segment `[0]` as a pair\'s address', () => {
        const d = tmp(); const P = path.join(d, 'empty-addr.json');
        return [[], [0]].map((a) => {
          const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: a, id: 'c1' }] }));
          return `address ${JSON.stringify(a)} -> ${r.ok ? 'INSTANCE' : `THREW ${r.v.status}`}`;
        }).join(' ; ');
      });
    observed('FTS-08.19', 'parameter-semantics.md §2.21 (the pair is spelled `{ address, id }`) — no clause names an extra member on the pair',
      'a pair carrying a third member beside its address and id', () => {
        const d = tmp(); const P = path.join(d, 'extra-member.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1', extra: 1 }] }));
        return r.ok ? 'INSTANCE (the extra member is ignored)' : `THREW ${describe(r.v)}`;
      });
    cell('FTS-08.20', 'contract.md §8.2 (the #16 row: the mismatch clause, the container slot, no placeholder)',
      'the #16 message carries the row\'s own clauses, names the container `constraints`, and leaves no unsubstituted placeholder',
      () => {
        const d = tmp(); const P = path.join(d, 'msg.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{}] }));
        const m = r.ok ? null : r.v.message;
        return C(typeof m === 'string' && !PLACEHOLDER.test(m) && m.includes('is not a valid constraint entry in') && m.includes('constraints')
          && m.includes('a constraint entry is an address and an id, and the address is a segment array'), `message=${JSON.stringify(m)}`);
      });
    cell('FTS-08.21', 'contract.md §7.1 step 4-bis (the list is validated BEFORE the store\'s own create)',
      'a refused construction leaves NOTHING behind: a path that did not exist still does not exist after the refusal',
      () => {
        const d = tmp(); const P = path.join(d, 'never.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{}] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid' && !fs.existsSync(P), `refused with ${r.ok ? 'an instance' : r.v.status} ; path exists?=${fs.existsSync(P)}`);
      });
    observed('FTS-08.22', 'CONFLICT SOURCE: surface.md §2.1 (dated: "the package adds NO FIFTH KEY") read against contract.md §7.1 ("any key beyond the declared set on cfg is ignored")',
      'a cfg carrying a fifth key beside a valid four-key set', () => {
        const d = tmp(); const P = path.join(d, 'fifth.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [], extra: 1 }));
        return r.ok ? 'INSTANCE (the extra key is ignored)' : `THREW ${describe(r.v)}`;
      });
  });

// =============================================================== FTS-09 =====
scenario('FTS-09', 'the loaded state validated against the supplied list at load',
  'contract.md §7.2 item 6 as amended; surface.md §2.1 (dated: the two instants); §8.1 #16; parameter-semantics.md §2.21', async () => {
    const d = tmp(); const P = path.join(d, 'image.json');
    {
      const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      K.register(s, ['a'], 'ca', () => true);
      K.runAttempt(s, K.commit(s, ['a'], 'file', 5));
      const s2 = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      K.register(s2, ['b'], 'cb', () => true);
      K.runAttempt(s2, K.commit(s2, ['b'], 'file', 6));
    }
    const image = bytes(P);
    console.log(`  LIVE-READ FTS-09 image=${imgStr(image)} path=${P}`);
    cell('FTS-09.1', 'contract.md §7.2 item 6 as amended + surface.md §2.1 (dated: "the loaded state is validated against the supplied list")',
      'an existing image whose state carries every supplied pair\'s address boots into an instance, and the register reads the loaded keys',
      () => {
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }, { address: ['b'], id: 'c2' }] }));
        if (!r.ok) return C(false, `THREW ${describe(r.v)}`);
        const reg = tryCall(() => PKG.read(r.v, []));
        return C(reg.ok && reg.v.a === 5 && reg.v.b === 6, `register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)}`);
      });
    cell('FTS-09.2', 'contract.md §8.1 #16 (the load-side trigger: "the loaded state no longer satisfies the supplied list")',
      'the same image with a supplied pair naming an address the loaded state does not carry answers #16 and returns no instance',
      () => {
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }, { address: ['zz'], id: 'c2' }] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid', `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(r.v)}`);
      });
    cell('FTS-09.3', 'contract.md §7.1 step 4-bis (the list itself is validated at load too)',
      'the same image with a malformed element answers #16 and returns no instance',
      () => {
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{}] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid', `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(r.v)}`);
      });
    cell('FTS-09.4', 'contract.md §7.2 item 2 (the boot is a read) + §8.1 #16',
      'a refused boot leaves the image BYTE-IDENTICAL',
      () => C(bytesEq(bytes(P), image), `before=${imgStr(image)} after=${imgStr(bytes(P))}`));
    cell('FTS-09.5', 'contract.md §7.2 items 3-4 (ADDED 2026-10-16: the zero-length file is ruled by item 6\'s own sentence, the exemption keyed on the FILE\'S BYTES) read with parameter-semantics.md §2.21\'s observable AS RECONCILED 2026-10-16 ("a boot over an existing, NON-ZERO-LENGTH cfg.filePath") and docs/decisions.md · A119',
      'an empty-but-present image (the zero-byte file a construction leaves over a fresh path) against a supplied non-empty list boots into an INSTANCE with no validation — the two clauses that met at this input class now agree, and §2.21 is read through item 6\'s qualifier',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'empty.json');
        PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [] });
        const size = fs.statSync(PP).size;
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        const reg = r.ok ? tryCall(() => PKG.read(r.v, [])) : { ok: false, v: null };
        return C(r.ok && reg.ok && Object.keys(reg.v).length === 0 && fs.statSync(PP).size === size,
          `image is ${size} bytes ; the run answers: ${r.ok ? `INSTANCE, register=${JSON.stringify(reg.v)}` : `THREW ${describe(r.v)}`} ; the file still ${fs.statSync(PP).size} bytes ; the discriminator is the file's own bytes and not the loaded state's size (§7.2 item 3; FTS-09.6 is its other half)`);
      });
    cell('FTS-09.6', 'contract.md §7.2 item 6 as amended (the discriminator: the exemption is keyed on the FILE, not on the state)',
      'a NON-zero-length image carrying an empty state (`{}`) against the same supplied list is validated and answers #16',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'zero-state.json');
        fs.writeFileSync(PP, '{}');
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid', `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(r.v)}`);
      });
    cell('FTS-09.7', 'contract.md §7.2 item 1 (ADDED 2026-10-16: the load-side predicate IS spelled, `docs/decisions.md` · A119/A120)',
      'the state the two candidate readings answered differently, now decided: an image carrying a key NO supplied pair names still boots (a resolution is required and a coverage is not), and a supplied pair whose address does NOT resolve is refused with #16',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'carry.json');
        fs.writeFileSync(PP, JSON.stringify({ named: 1, other: 2 }));
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['named'], id: 'c1' }] }));
        if (!r.ok) return C(false, `the unnamed key REFUSED the boot — the key-coverage reading governs: ${describe(r.v)}`);
        const reg = tryCall(() => PKG.read(r.v, []));
        return C(reg.ok && reg.v.named === 1 && reg.v.other === 2,
          `the unnamed key ${JSON.stringify('other')} did NOT refuse the boot ; register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)} — every supplied address resolved, which is the whole of the predicate`);
      });
    cell('FTS-09.8', 'contract.md §7.2 item 1 item 2 (the failure the predicate produces, on the same image)',
      'the same image whose supplied list names an address the loaded state does not carry answers #16 and returns no instance — so FTS-09.7 is discriminating and not vacuous',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'carry2.json');
        fs.writeFileSync(PP, JSON.stringify({ named: 1, other: 2 }));
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['named'], id: 'c1' }, { address: ['absent'], id: 'c2' }] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid', `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(r.v)}`);
      });
  });

// =============================================================== FTS-10 =====
scenario('FTS-10', 'the sixteenth member\'s own clause and its template row; the generator\'s census over the closed set',
  'contract.md §8.1 #16; §8.2 (the generator rule, the template table, completeness); package.md §1.3 item 4 (the addon\'s five exports)', async () => {
    const set16 = ['AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
      'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
      'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
      'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid'];
    cell('FTS-10.1', 'contract.md §8.1 (the set is closed at 16 members) + §2.2 clause 7',
      'the closed set this artifact drives against is the sixteen named ranks, #16 last',
      () => C(set16.length === 16 && set16[15] === 'ConstraintListInvalid', `set=${set16.length} members, #16=${JSON.stringify(set16[15])}`));
    cell('FTS-10.2', 'package.md §1.3 item 4 (the internal addon\'s export set is exactly five names and no sixth)',
      'the addon\'s own exports are the five declared names, `errorMessage` among them',
      () => {
        const keys = Object.keys(ADDON).sort();
        return C(JSON.stringify(keys) === JSON.stringify(['call', 'errorMessage', 'register', 'storeCreate', 'version']), `addon exports=${JSON.stringify(keys)}`);
      });
    cell('FTS-10.3', 'contract.md §8.2 (completeness: every code of §8.1 generates a non-empty, placeholder-free message)',
      'every one of the sixteen codes renders its row through the generator reachable from JS',
      () => {
        const bad = [];
        for (const c of set16) {
          const r = tryCall(() => ADDON.errorMessage(c, 'a'));
          const m = r.ok ? r.v : null;
          if (!r.ok || typeof m !== 'string' || m.length === 0 || PLACEHOLDER.test(m) || m.includes('outside the closed set')) bad.push([c, r.ok ? m : describe(r.v)]);
        }
        return C(bad.length === 0, bad.length === 0 ? 'all sixteen codes rendered' : `unrendered: ${JSON.stringify(bad)}`);
      });
    cell('FTS-10.4', 'contract.md §8.2 (the control: the generator\'s own outside-the-set answer)',
      'a name outside the closed set does NOT render a row but answers the generator\'s outside-the-set sentence, so FTS-10.3 is discriminating',
      () => {
        const r = tryCall(() => ADDON.errorMessage('NoSuchCodeName', 'a'));
        return C(r.ok && typeof r.v === 'string' && r.v.includes('outside the closed set'), `answer=${r.ok ? JSON.stringify(r.v) : describe(r.v)}`);
      });
    observed('FTS-10.5', 'contract.md §8.2 (the #16 row: "the failing entry\'s address spelling, or the element\'s own position printed bare")',
      'the segment slot\'s rendering for an element carrying no address at all', () => {
        const d = tmp(); const P = path.join(d, 'seg.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{}] }));
        return r.ok ? 'INSTANCE' : r.v.message;
      });
  });

// =============================================================== FTS-11 =====
scenario('FTS-11', 'the join: a repair\'s write is a new entry in the same commit, and its own save is its own terminal arm\'s act',
  'surface.md §2.11 clause 6; kernel-surface.md §2.3 item 2; parameter-semantics.md §2.20', async () => {
    const d = tmp(); const P = path.join(d, 'join.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const rcMembers = []; const logKinds = [];
    let repairCalls = 0; let carryAttempt = 'NOT ATTEMPTED';
    let fired = 0;
    // RE-DERIVED 2026-10-16 TO `surface.md §2.11` CLAUSE 6: the repair's write CARRIES THE COMMIT THE
    // CONSTRAINT PASSED IT — the kernel-handed context, at the fifth position this section's §2.2 fixes.
    // The pre-edit driver wrote with the position ABSENT and offered a five-member literal IN PLACE OF
    // the handed context, so the join `§2.11` clause 6 declares was driven by neither the write nor the
    // cell (`kernel-surface.md §2.3` item 2; `docs/decisions.md` · `A120` (1)).
    let handed = null; let writeOp = null; let strippedRefusal = 'NOT ATTEMPTED';
    K.register(s, ['c'], 'c1', (ctx) => {
      if (ctx.value === 10) return true;
      return { message: 'too large', repair: (rc) => {
        repairCalls++;
        rcMembers.push(Object.keys(rc).sort().join(','));
        carryAttempt = Array.isArray(rc.pending) ? `an array of ${rc.pending.length}` : typeof rc.pending;
        handed = rc;
        const w = PKG.write(s, ['c'], 'file', 10, rc);   // THE FIFTH POSITION CARRIES THE HANDED CONTEXT
        writeOp = w.op;
        return { ok: true, op: w.op };
      } };
    });
    const hListen = PKG.listen(s, ['c']);
    s.register(hListen, () => { fired++; });
    const rec = K.commit(s, ['c'], 'file', 99);
    const out = tryCall(() => K.runAttempt(s, rec));
    if (out.ok) for (const e of out.v.log) logKinds.push(e.kind);
    cell('FTS-11.1', 'kernel-surface.md §2.3 item 2 (the repair context\'s member set, DECLARED-DEFAULT)',
      'the repair is invoked with one argument carrying exactly the SIX declared members { op, address, id, value, tier, pending }',
      () => C(rcMembers.length === 1 && rcMembers[0] === 'address,id,op,pending,tier,value',
        `RepairContext members=${JSON.stringify(rcMembers)} pending=${carryAttempt}`));
    cell('FTS-11.2', 'surface.md §2.11 clause 6 (the commit\'s op set grows by exactly one per repair write)',
      'the repair\'s write joins the commit: the passing attempt carries two ops',
      () => C(out.ok && out.v.outcome === 'passed' && Array.isArray(out.v.ops) && out.v.ops.length === 2,
        `outcome=${out.ok ? out.v.outcome : describe(out.v)} ops=${out.ok ? out.v.ops.length : '-'}`));
    cell('FTS-11.3', 'kernel-surface.md §2.3 item 2 ("the constraints RE-RUN against it")',
      'the constraint is re-evaluated against the repair\'s op: the log carries the repair-run entry and a second constraint check',
      () => C(logKinds.includes('repair-run') && logKinds.filter((k) => k === 'constraint-check').length === 2,
        `log kinds=${JSON.stringify(logKinds)}`));
    cell('FTS-11.4', 'surface.md §2.11 clause 6 ("its own save is its own terminal arm\'s act")',
      'the terminal arm\'s save lands the repaired register: the file carries the repaired value',
      () => {
        const b = bytes(P); const parsed = b && b.length ? JSON.parse(b.toString('utf8')) : null;
        return C(!!parsed && parsed.c === 10, `image=${imgStr(b)} repairs=${repairCalls}`);
      });
    cell('FTS-11.5', 'surface.md §2.4 item 9 (g) item 1 AS RULED 2026-10-16 + surface.md §2.11 clause 6 ("it carries the commit the constraint passed it, AT THE FIFTH POSITION this section\'s §2.2 fixes")',
      'THE KERNEL-HANDED CONTEXT ITSELF — the very object the repair was invoked with — is offered at the fifth position: the position ADMITS it (any value carrying a `pending` member) and the write PROCEEDS and LANDS',
      () => {
        const r = tryCall(() => PKG.write(s, ['c'], 'file', 10, handed));
        const got = r.ok ? `the kernel-handed context PROCEEDED at the fifth position (opId=${r.v.op.opId})`
          : `the kernel-handed context is REFUSED there: ${describe(r.v).slice(0, 170)}`;
        if (!r.ok) return C(false, `${got} ; context=object{${Object.getOwnPropertyNames(handed).sort().join(',')}} rc.pending is ${carryAttempt}`);
        return C(handed !== null && typeof r.v.op.opId === 'string',
          `${got} ; context=object{${Object.getOwnPropertyNames(handed).sort().join(',')}} rc.pending is ${carryAttempt} ; the position reads the member's PRESENCE and never its contents (docs/decisions.md · A120 (1))`);
      });
    cell('FTS-11.6', 'surface.md §2.4 item 9 (g) item 1 (the class test is the ONLY thing asked of the position: the SAME context stripped of its `pending` member is refused)',
      'the discriminating half, driven on the same object: the handed context without its `pending` member is REFUSED at the fifth position — so the admission of `FTS-11.5` is the `pending` member\'s and not the object\'s origin',
      () => {
        const twinPath = path.join(d, 'stripped.json');
        const s2 = PKG.storeCreate({ filePath: twinPath, journalLength: 8, listeners: [] });
        const stripped = { op: handed.op, address: handed.address, id: handed.id, value: handed.value, tier: handed.tier };
        const r = tryCall(() => PKG.write(s2, ['c'], 'file', 10, stripped));
        return C(!r.ok && r.v instanceof TypeError && typeof r.v.message === 'string'
          && r.v.message.includes('carrying a `pending` member'),
          `members=object{${Object.getOwnPropertyNames(stripped).join(',')}} -> ${r.ok ? 'PROCEEDED (unexpected)' : describe(r.v)} ; the handed context's own key set is ${JSON.stringify(Object.getOwnPropertyNames(handed).sort())}`);
      });
    cell('FTS-11.7', 'surface.md §2.11 clause 6 (the discriminator clause of 2026-10-16: a write JOINS the commit by the op its own return carries, "and not the mere presence of an `op`")',
      'the join read off the identity: the op the repair RETURNED is the op the commit\'s own set carries as its second entry, and the two entries are distinct identities',
      () => {
        const ops = out.ok ? out.v.ops : [];
        const opIds = ops.map((o) => (o && typeof o.opId === 'string' ? o.opId : 'NO opId'));
        return C(out.ok && ops.length === 2 && writeOp !== null && opIds[1] === writeOp.opId
          && opIds[0] !== opIds[1] && (handed.pending.length > 0),
          `repair returned opId=${writeOp && writeOp.opId} ; commit ops=${JSON.stringify(opIds)} ; the context's own residue=${handed.pending.length} entr(y|ies)`);
      });
    observed('FTS-11.8', 'surface.md §2.7 item 7 (a) (the checked-off identity\'s firing, resolved through the registry)',
      'the number of times the delivered body ran on the repair-join arm', () => `listener invocations=${fired}`);
    console.log(`  LIVE-READ FTS-11 file=${imgStr(bytes(P))} path=${P}`);
    void rec;
  });

// =============================================================== FTS-12 =====
scenario('FTS-12', 'the censuses clause 7 leaves unmoved',
  'surface.md §2.11 clause 7; §2.3 item 1 (the instance\'s member set); kernel-surface.md §1 (the kernel\'s extent)', async () => {
    const d = tmp(); const P = path.join(d, 'census.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    cell('FTS-12.1', 'surface.md §2.11 clause 7 (the instance\'s member set stays { register, on, off, settle })',
      'the instance exposes exactly those four members and no fifth',
      () => {
        const members = Object.getOwnPropertyNames(s).sort();
        return C(JSON.stringify(members) === JSON.stringify(['off', 'on', 'register', 'settle']), `members=${JSON.stringify(members)}`);
      });
    cell('FTS-12.2', 'surface.md §2.11 clause 7 (the module namespace stays at 8 verbs)',
      'the package\'s module namespace carries exactly the eight declared verbs',
      () => {
        const keys = Object.keys(PKG).sort();
        return C(keys.length === 8 && JSON.stringify(keys) === JSON.stringify(['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write']), `namespace=${JSON.stringify(keys)}`);
      });
    cell('FTS-12.3', 'surface.md §2.11 clause 7 (the kernel\'s extent stays FIVE)',
      'the kernel entry carries exactly its five declared items',
      () => {
        const keys = Object.keys(K).sort();
        return C(keys.length === 5 && JSON.stringify(keys) === JSON.stringify(['commit', 'log', 'register', 'report', 'runAttempt']), `kernel extent=${JSON.stringify(keys)}`);
      });
    observed('FTS-12.4', 'surface.md §2.1 item 1 (an app\'s own `listen` and the kernel\'s `register` at one address return the same adopted handle)',
      'the two handles\' identity at one address', () => {
        const h1 = K.register(s, ['x'], 'cx', () => true);
        const h2 = PKG.listen(s, ['x']);
        return `kernel.register === PKG.listen ? ${h1 === h2}`;
      });
  });

// ----------------------------------------------------------------- tail ---
const fails = CELLS.filter((c) => c.verdict === 'FAIL');
const conflicts = CELLS.filter((c) => c.verdict === 'CONFLICT');
const passes = CELLS.filter((c) => c.verdict === 'PASS');
const obs = CELLS.filter((c) => c.verdict === 'OBSERVED');
const nd = CELLS.filter((c) => c.verdict === 'NOT DRIVABLE LIVE');
console.log(`\nTOTALS cells=${CELLS.length} pass=${passes.length} fail=${fails.length} conflict=${conflicts.length} observed=${obs.length} not-drivable=${nd.length}`);
console.log(`SCENARIOS ${Object.entries(SCENARIO_VERDICT).map(([k, v]) => `${k}=${v}`).join(' ')}`);
console.log(`LAYER LIVE / ASSEMBLED PACKAGE — entry ${ENTRY} ; addon ${ADDON_PATH} ; fixtures left at ${RUNROOT}`);
if (fails.length || conflicts.length) {
  console.log('\nFAILED / CONFLICTED CELLS');
  for (const c of [...fails, ...conflicts]) console.log(`  ${c.verdict} ${c.id} :: ${c.detail} :: ${c.clause}`);
}
process.exit(fails.length || conflicts.length ? 1 : 0);
