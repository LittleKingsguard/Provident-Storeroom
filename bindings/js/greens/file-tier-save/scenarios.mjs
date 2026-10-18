#!/usr/bin/env node
// ============================================================================
// GATE 5 — THE BLIND GREENS SET FOR THE `file`-TIER SAVE
// unit: the file-tier durable commit as the `settle` seam's terminal-arm act
// artifact id: FTS (file-tier-save)   runner: bindings/js/greens/file-tier-save/scenarios.mjs
//
// AUTHORED FROM THE DOCUMENTATION ONLY (docs/specs/**, the *-greens.md set).
// The package and the kernel entry are IMPORTED and DRIVEN; no src/**, no
// index.d.ts and no existing test file was read while writing this file.
//
// Convention (house form, `docs/specs/storeroom-constraints/live-greens.md`):
//   RESULT <id> <verdict> :: <detail> :: <clause>
//   verdicts: PASS | FAIL | CONFLICT | OBSERVED | NOT DRIVABLE BLIND
//   PASS    — the clause's own observable was produced by a run.
//   FAIL    — the run answered something the clause does not declare.
//   CONFLICT— the run answered a value TWO LIVE CLAUSES disagree about:
//             the value is declared by one clause and contradicted by
//             another, so neither PASS nor FAIL is honest. Counted and
//             printed separately; the clause pair is named in the detail.
//   OBSERVED— the run's value is recorded and NOT asserted (a clause leaves
//             the reading open). Never counted as a pass.
//   EXIT: 0 iff no cell FAILed and no cell CONFLICTed (this harness is
//   stricter than the house exit rule, which counts FAILs only: a
//   doc-versus-doc CONFLICT on the unit's own newest clauses is a finding a
//   supervisor must rule on, and it must not read as green).
// ============================================================================
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const PKG = await import('../../index.mjs');
const K = await import('../../src/constraint-kernel.mjs');
const require = createRequire(import.meta.url);
const ADDON = require('../../build/Release/storeroom_js_binding.node');

// ---------------------------------------------------------------- harness ---
const CELLS = [];
let SCENARIO = 'FTS-00';
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
const SCENARIO_VERDICT = {};
const RANK = { PASS: 0, CONFLICT: 1, FAIL: 2 };
function record(id, verdict, detail, clause) {
  CELLS.push({ id, verdict, detail, clause });
  console.log(`RESULT ${id} ${verdict} :: ${detail} :: ${clause}`);
  const now = SCENARIO_VERDICT[SCENARIO] || 'PASS';
  if (verdict in RANK && RANK[verdict] > RANK[now]) SCENARIO_VERDICT[SCENARIO] = verdict;
}
// A cell body returns:
//   true                          -> PASS
//   [bool, detail]                -> PASS/FAIL with the detail
//   { ok: bool, detail }          -> PASS/FAIL with the detail
//   { conflict: true, detail }    -> CONFLICT (two live clauses disagree; the run follows one)
// an undeclared throw inside a cell is an observation and never a pass.
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
function notDrivable(id, clause, reason) { record(id, 'NOT DRIVABLE BLIND', reason, clause); }
const C = (ok, detail) => ({ ok: !!ok, detail });
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };
const bytes = (p) => { try { return fs.readFileSync(p); } catch (e) { return null; } };
const bytesEq = (a, b) => (a === null || b === null ? a === b : a.equals(b));
const imgStr = (b) => (b === null ? 'NO FILE' : JSON.stringify(b.toString('utf8')));
const PLACEHOLDER = /<[A-Za-z_ ]+>/;
const dirs = [];
function tmp() { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fts-green-')); dirs.push(d); return d; }

/// **THE REGISTRATION-INSTANT SHIELD, ADDED 2026-10-17** (`A135` (3); `docs/specs/storeroom-native/
/// contract.md §7.3` (b) state 1).
///
/// EVERY CELL OF THIS SET THAT REGISTERS A CONSTRAINT THROUGH `K.register` AND THEN READS WHAT THE **WRITE**
/// DID — its own ordinal against the listener's (`FTS-01.*`), the failing arm's own bytes and tokens
/// (`FTS-02.*`, `FTS-04.*`), the save's arm (`FTS-11.*`) — MEETS THE RULING THE SAME WAY: `A135` (3) ADDS ONE
/// INVOCATION OF EVERY CONSTRAINT BODY AT ITS REGISTRATION, AND AT THAT INSTANT NO SAVE HAS RUN, NO ATTEMPT
/// EXISTS AND NO WRITE'S OP IS IN ANY SET. **A BODY THAT VIOLATES ITS REGISTRATION'S STATE IS REFUSED THERE
/// WITH `ConstraintListInvalid` AND NOTHING IS REGISTERED AT ALL** (`§7.3` (b) state 2); a body that passes
/// would still mark an ordinal an attempt's window never produced.
///
/// **THE SHIELD ANSWERS THE REGISTRATION INSTANT `true` AND HANDS EVERY OTHER CONTEXT TO THE CELL'S OWN
/// BODY UNTOUCHED**, so the pair is CARRIED (state 1) and every observable the cell reads is the WRITE's. The
/// instant is told by the two members `kernel-surface.md §2.3` item 1's registration clause spells `null`
/// (`tier`, `op`), which no landing's context carries together.
function atLandingOnly(record) {
  return (context) => {
    if (context !== null && typeof context === 'object'
      && context.tier === null && context.op === null) {
      return true; // the registration stands (`§7.3` (b) state 1) and this invocation is no write's
    }
    return record(context);
  };
}
function scenario(id, title, clause, body) {
  SCENARIO = id;
  SCENARIO_VERDICT[id] = SCENARIO_VERDICT[id] || 'PASS';
  console.log(`\n--- ${id} ${title} — ${clause}`);
  try { body(); } catch (e) { record(`${id}.x0`, 'FAIL', `the scenario threw outside a cell: ${describe(e)}`, clause); }
  console.log(`SCENARIO ${id} ${SCENARIO_VERDICT[id]} :: ${title}`);
}

// =============================================================== FTS-01 =====
scenario('FTS-01', 'the terminal arm: constraint first, save second, listener third (the ordinary passing path)',
  'surface.md §2.11 clauses 2-3; §2.7 item 6; §2.4 item 9 table', () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const emptyImage = bytes(P);
    const ord = [];
    const seen = [];
    const imageAt = () => (bytes(P) === null ? 'NO FILE' : bytes(P).toString('utf8'));
    // the kernel's own registration comes first: §2.1 item 1 (K) rule 2 / §2.4 item 7 (a) —
    // a second registration at one identity replaces the function the slot holds.
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS THIS BODY ONCE, and at that
    // instant no save has run — so an unshielded `ord.push` would open the ordinal list this cell orders with
    // a second `'constraint'` entry carrying the CONSTRUCTION's own zero-byte image. **`FTS-01.3`'s own
    // observable is *"the recorded ordinals are exactly two — the constraint then the listener"*, AND THE
    // CONSTRAINT BODY'S OWN SUBJECT IS PRESERVED EXACTLY: it still reads the file's bytes at the PASS's own
    // instant, which is the pre-save image `FTS-01.1` asserts.** The shield answers the registration `true`
    // (`§7.3` (b) state 1 — the pair is CARRIED) and hands the LANDING's context to this body unchanged.
    const h = K.register(s, ['c'], 'c1', atLandingOnly((ctx) => { ord.push(['constraint', imageAt()]); return true; }));
    s.register(h, (addr) => { ord.push(['listener', imageAt()]); seen.push(addr); });
    const rec = K.commit(s, ['c'], 'file', 42);
    const rep = K.runAttempt(s, rec);
    const image = bytes(P);
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
    cell('FTS-01.3', 'surface.md §2.11 clause 3 (the save stands between the two bodies; §2.7 item 3 asserts membership, never sequence, among the bodies)',
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
  });

// =============================================================== FTS-02 =====
scenario('FTS-02', 'a constraint\'s refusal prevents the save and discards the write\'s listeners',
  'surface.md §2.11 clause 1 (the failing arm unmoved), clause 3 (i), clause 4 (i); fail-surface.md §2 KC-3', () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    // a passing pass installs the pre-image
    const hPre = K.register(s, ['p'], 'cP', () => true);
    const recPre = K.commit(s, ['p'], 'file', 111);
    K.runAttempt(s, recPre);
    const preImage = bytes(P);
    // the write under test: its pair refuses
    let fired = 0;
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THIS BODY VIOLATES AT ITS REGISTRATION, AND UNTIL THIS
    // PASS *"registering a constraint does not run its body"* WAS THE PREMISE THE WHOLE SET STOOD ON — so this
    // registration WAS the refusal the scenario threw on (`FTS-02.x0`). **THE CELL'S SUBJECT IS UNMOVED:**
    // `FTS-02.1`–`FTS-02.6` all read the WRITE's own failing pass (`KC-3`, the byte-identical image, the
    // discard reaching the triggered set, the one `outcome` entry), and every one of them is reached exactly
    // as filed once the registration STANDS. **THE SHELF REACHES THE VIOLATION THE WAY THE LAW NOW REQUIRES:
    // THE PAIR IS REGISTERED AGAINST A STATE IT ACCEPTS, AND THE VIOLATING VALUE IS WRITTEN AFTERWARDS** —
    // `K.commit(s, ['e'], 'file', 7)` registers nothing and writes `7`, which this body refuses.
    const h = K.register(s, ['e'], 'cE', atLandingOnly(() => ({ message: 'refused by the application' })));
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
        const r = tryCall(() => s.read(['e']));
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
    void hPre;
  });

// =============================================================== FTS-03 =====
scenario('FTS-03', 'a passing pass\'s image is durable before any listener body runs, and survives a fresh boot',
  'surface.md §2.11 clause 4 (ii); contract.md §7.2 item 6 (the boot)', () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    let freshRead = 'NO BODY RAN';
    const h = K.register(s, ['c'], 'c1', () => true);
    s.register(h, () => {
      const fresh = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      const r = tryCall(() => fresh.read(['c']));
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
        const r = tryCall(() => fresh.read(['c']));
        return C(r.ok && r.v === 4242, `fresh boot read = ${r.ok ? JSON.stringify(r.v) : describe(r.v)} image=${imgStr(bytes(P))}`);
      });
    cell('FTS-03.3', 'surface.md §2.11 clause 2 (the act is keyed by the settled record\'s own op)',
      'the passing pass reports passed and the file image is a JSON object carrying this write\'s version',
      () => {
        const b = bytes(P); const parsed = b ? JSON.parse(b.toString('utf8')) : null;
        return C(rep.outcome === 'passed' && !!parsed && parsed.c === 4242, `outcome=${rep.outcome} image=${imgStr(b)}`);
      });
  });

// =============================================================== FTS-04 =====
scenario('FTS-04', 'the failing save: rollback first, message second, the pre-image standing',
  'surface.md §2.11 clause 5; contract.md §7.2 items 2-3; §8.1 #15; §8.2', () => {
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const hPre = K.register(s, ['a'], 'cA', () => true);
    const recPre = K.commit(s, ['a'], 'file', 111);
    K.runAttempt(s, recPre);
    const preImage = bytes(P);
    let fired = 0;
    let caught = null; let stateInsideCatch = null;
    // the external event: the parent directory's access changes between the construction and the save
    fs.chmodSync(d, 0o555);
    const denyProbe = tryCall(() => { fs.writeFileSync(path.join(d, '.probe'), 'x'); fs.unlinkSync(path.join(d, '.probe')); return true; });
    const h = K.register(s, ['b'], 'cB', () => true);
    s.register(h, () => { fired++; });
    const rec = K.commit(s, ['b'], 'file', 222);
    try { K.runAttempt(s, rec); } catch (e) { caught = e; stateInsideCatch = tryCall(() => s.read(['b'])); }
    fs.chmodSync(d, 0o755);
    if (denyProbe.ok) {
      notDrivable('FTS-04.*', 'surface.md §2.11 clause 5 (the failing save)',
        `this environment does not deny a write into a 0o555 directory (\`id -u\` is likely 0), so a failing save cannot be produced here; the direct write into it SUCCEEDED.`);
      return;
    }
    cell('FTS-04.1', 'surface.md §2.11 clause 5',
      'the save\'s own act fails and the caller catches exactly one thrown value (the pass does not resolve)',
      () => C(caught !== null, `caught=${describe(caught)}`));
    // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`), ON THE
    // ARCHITECT'S RULING *"Override the failure form limit"* READ WITH HIS EARLIER *"Bubble the message log to the
    // client on failure, override any clauses that forbid this."*: THIS CELL'S MEMBER-SET LIMB WAS THE SUPERSEDED
    // `DD-12` / `Refusal` DECLARATION (*"EXACTLY two members, no third"*), and the AMENDED CLAUSE IS
    // `surface.md §2.5` item 4 — the member set is THREE and FLAT ACROSS ARMS — read with item 9 (`log` an
    // ORDINARY OWN ENUMERABLE DATA MEMBER; `Object.keys(caught)` reads `["log","message","status"]`, length `3`).
    // THE OTHER LIMBS ARE KEPT WHOLE: the caught value is a THROWN PLAIN OBJECT (`!instanceof Error`) that is
    // NEVER RETURNED, `status` and `message` are both PRESENT. AND THIS ARM'S `log` VALUE IS `[]` BY ITEM 4: the
    // failing save is the TERMINAL ARM's own act on a record whose attempt is live — but the assertion this cell
    // can take from the clause is that `log` is an ARRAY (item 9's *"never a non-array"*); whether this arm's
    // entries are empty is the KERNEL's own record and is asserted at `FTS-04.9`, not here.
    cell('FTS-04.2', 'contract.md §8.1 #15 (the caller meets the store\'s single failure form) read with surface.md §2.5 items 4 and 9 and the Architect\'s *"Override the failure form limit"* — the two-member limit this cell took from `DD-12` is superseded',
      'the caught value is the store\'s form: a plain object of exactly three members { log, message, status }, `log` an ARRAY, never returned',
      () => C(caught && typeof caught === 'object' && !(caught instanceof Error)
        && Object.getOwnPropertyNames(caught).sort().join(',') === 'log,message,status'
        && 'status' in caught && 'message' in caught && Array.isArray(caught.log),
        `members=${caught ? Object.getOwnPropertyNames(caught).join(',') : '-'} log=${Array.isArray(caught && caught.log) ? `[]×${caught.log.length}` : describe(caught && caught.log)} caught=${describe(caught)}`));
    cell('FTS-04.3', 'contract.md §8.1 rank #15 (FileCommitFailed; the trigger widened to reach the save act)',
      'the caught status is the store\'s own #15 token FileCommitFailed',
      () => C(caught && caught.status === 'FileCommitFailed', `status=${JSON.stringify(caught && caught.status)}`));
    cell('FTS-04.4', 'contract.md §8.2 (the #15 row: the mismatch clause, the path slot, no placeholder)',
      'the caught message is the generated one #15 carries: non-empty, the row\'s two clauses present, the failing path in its <PATH> slot, no unsubstituted placeholder',
      () => {
        const m = caught && caught.message;
        return C(typeof m === 'string' && m.length > 0 && !PLACEHOLDER.test(m) && m.includes('could not be committed to')
          && m.includes('the file write failed at') && m.includes(P),
          `message=${JSON.stringify(m)}`);
      });
    cell('FTS-04.5', 'surface.md §2.11 clause 4 (i) (a failing pass leaves the last passing image durable)',
      'the bytes at cfg.filePath are byte-identical to the pre-image: no partial, truncated or rebuilt image stands',
      () => C(bytesEq(bytes(P), preImage), `pre=${imgStr(preImage)} post=${imgStr(bytes(P))}`));
    cell('FTS-04.6', 'contract.md §7.2 item 3 + surface.md §2.11 clause 5 (the rollback happens FIRST)',
      'at the instant the caller catches the failure the store\'s own state is already rolled back: the failed write\'s value is gone and the pre-image value is readable',
      () => {
        const r = stateInsideCatch;
        const a = tryCall(() => s.read(['a']));
        return C(r && !r.ok && r.v && r.v.status === 'AddressNotFound' && a.ok && a.v === 111,
          `inside the catch: read b -> ${describe(r && r.v)} ; read a -> ${a.ok ? JSON.stringify(a.v) : describe(a.v)}`);
      });
    cell('FTS-04.7', 'surface.md §2.11 clause 3 (i) + §2.7 item 7 (d)',
      'the failing save is a failing arm: no body of the delivered set ran',
      () => C(fired === 0, `listener invocations=${fired}`));
    cell('FTS-04.8', 'surface.md §2.11 clause 5 (the two triggers do not overlap)',
      'the failed save never answers the sixteenth member\'s code: #15 and #16 stay distinct',
      () => C(caught && caught.status !== 'ConstraintListInvalid', `status=${JSON.stringify(caught && caught.status)}`));
    // ⟶ RE-EXECUTED AND RE-RECORDED 2026-10-16 (this pass, against the tree whose kernel bytes stand at
    // `20:49:40`): THE `FAIL` THIS CELL CARRIED AT `20:38:41` IS SUPERSEDED BY LATER BYTES and is WITHDRAWN
    // BY NAME. The failed save now reports itself: the attempt's own closed record gains its `outcome`
    // entry carrying a `KC` token, and `K-5`'s report reads `outcome: "failed"` with a NON-EMPTY `rollback`.
    // The cell's own expectation is unchanged and its assertion is re-derived to the failure arm's two
    // declared members (`composition-and-states.md §2.7`; `kernel-surface.md §2.1` items 3-5).
    cell('FTS-04.9', 'surface.md §2.11 clause 5 (the entry is a KC token of the kernel\'s own set; the pass reports the failure as it reports any other); kernel-surface.md §2.1 items 3-5 (the closed record\'s final log and report)',
      'the attempt\'s own record reports the save\'s failure: the log gains the outcome entry carrying a KC token, the report reads the FAILURE arm (outcome "failed" with a non-empty rollback), and it does not claim the passing arm',
      () => {
        const lg = tryCall(() => K.log(s, rec.attempt));
        const rp = tryCall(() => K.report(s, rec.attempt));
        const entries = lg.ok ? lg.v : [];
        const outcome = entries.filter((e) => e.kind === 'outcome');
        const kc = /^KC-[1-8]$/;
        return C(lg.ok && outcome.length === 1 && kc.test(String(outcome[0].state)) && rp.ok
          && rp.v.outcome === 'failed' && Array.isArray(rp.v.rollback) && rp.v.rollback.length > 0,
          `log=${JSON.stringify(entries.map((e) => [e.kind, e.state, e.message]))} report.outcome=${rp.ok ? rp.v.outcome : describe(rp.v)} report.rollback=${rp.ok ? JSON.stringify(rp.v.rollback) : '-'}`);
      });
    // ⟶ RE-EXECUTED AND RE-RECORDED 2026-10-16 (THE SECOND RE-MEASURE OF THE DAY, this pass; the tree whose
    // kernel bytes stand at `21:08:24`): THE `FAIL` THIS CELL FILED AT `20:49:40` IS CLOSED BY LATER BYTES AND
    // THE VERDICT IS WITHDRAWN BY NAME — `docs/defects.md` · `DEF-2026-10-16-B` is `FIXED`, the `commit` entry
    // now being appended on the PASSING arm alone, after the terminal arm's save has stood. ON A SAVE THAT DID
    // NOT STAND THE LOG NO LONGER CARRIES A `commit` ENTRY AT ALL: driven on BOTH failing routes this set
    // named (`chmod 0o555` on the parent; the path replaced by a regular file —
    // `scratch/rebind-greens/commit-residue-probe.txt`, its re-run beside it), each answers one
    // `constraint-check` + ONE `outcome`/`KC-8` and NO `commit`, with `report().outcome === "failed"` and a
    // non-empty `rollback`. THE CELL'S EXPECTATION WAS WRITTEN BEFORE ITS RUN AND IS UNMOVED; it now MATCHES
    // the bytes and is asserted. THE FILED READING IS KEPT BELOW AS THE RECORD OF THE `20:49:40` BYTES, whose
    // one remaining question the ruling at `FTS-04.9` answered:
    // the `commit` entry, declared to BE the attempt's SUCCESS arm, appended once, and the PASSED arm's
    // `commit` entry is declared to BE the attempt's SUCCESS arm, appended once, and to be the PASSED arm's
    // own entry (`kernel-surface.md §2.1` item 3's `LogKind` table; `composition-and-states.md §2.7` items 5
    // and 7). SO THE CONTRADICTION IS OF THE ENTRY'S OWN DECLARED TEXT AND NOT OF `surface.md §2.11` CLAUSE 5:
    // clause 5 names the `commit` entry NOWHERE, its own declared observable (the `outcome` entry carrying a
    // `KC` token and the report on the failure arm — cell `FTS-04.9`) IS PRODUCED, and clause 5 is what makes
    // the entry's own sentence *"every constraint registered at [...] passed; the commit stands"* FALSE on
    // this arm, the save being evaluated as the LAST constraint of the write.
    cell('FTS-04.10', 'kernel-surface.md §2.1 item 3 (the LogKind table: `commit` = the attempt\'s SUCCESS arm, appended once; `outcome` = the attempt\'s FAILURE arm, appended once) read with composition-and-states.md §2.7 items 5 and 7 (the PASSED arm\'s own entry sequence) and surface.md §2.11 clause 5 (the save is the LAST constraint, so a save that fails is a violation)',
      'a save that did not stand leaves the attempt\'s log carrying the FAILURE arm\'s entry alone: NO `commit` entry stands in the log of an attempt whose own report reads outcome "failed"',
      () => {
        const lg = tryCall(() => K.log(s, rec.attempt));
        const entries = lg.ok ? lg.v : [];
        const commitEntries = entries.filter((e) => e.kind === 'commit');
        return C(lg.ok && commitEntries.length === 0,
          `log=${JSON.stringify(entries.map((e) => [e.kind, e.state, e.message]))} — ${commitEntries.length === 0
            ? 'NO commit entry stands on the attempt whose report reads outcome "failed": the log carries the FAILURE arm\'s own entry alone (the residue filed at 20:49:40 is closed by later bytes, `DEF-2026-10-16-B` FIXED)'
            : 'a COMMIT entry stands on an attempt whose report reads outcome "failed" and whose save was refused at the file, and that entry\'s own declared text is "the attempt\'s SUCCESS arm, appended once"'}`);
      });
    // ⟶ RE-EXECUTED 2026-10-16 (this pass, ON THIS TREE, whose package stands at `20:49:05`, whose addon
    // stands at `20:23` and whose kernel stands at `21:08:24`): `FTS-04.10`'s post-fix green now carries its
    // OWN ROW — the row this set owed at `storeroom-native/contract.md §7.2`'s re-spelling clause (*"that
    // cell's POST-FIX GREEN HAS NO ARTEFACT ROW … the cell's `PASS` rests on the later bytes alone"*, owner
    // `role_blind_test_writer`, revisit condition *"a re-measurement of the set on a tree not older than
    // `21:08:24`, with each moved cell's `PASS` printed as its own row and the pre-fix values kept as the
    // dated record they are"*). The cell below is the OTHER DIRECTION of the same discriminate, executed on
    // this run rather than cited from a probe: on the FAILED save the log carries the failure arm alone, and
    // on a PASSING save the sibling `commit` entry IS present — exactly once — so neither absence nor
    // presence can be read off an empty or truncated log.
    cell('FTS-04.11', 'kernel-surface.md §2.1 item 3 (the two one-shot arms: the failing arm carries NO `commit` entry at all, the passing arm the one appended AFTER the save has stood) read with composition-and-states.md §2.7 (the closed log is the open attempt\'s list plus the ONE one-shot entry of its arm) and surface.md §2.11 clause 3 (ii)',
      'the discriminate is two-directional in one run: on the failed save\'s own log the FAILURE arm\'s entry stands alone with no `commit` entry, while a PASSING `file`-tier save\'s log carries the `commit` entry — so the failing-arm absence of `FTS-04.10` is read beside a passing-arm presence',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'passing.json');
        const st = PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [] });
        K.register(st, ['c'], 'c1', () => true);
        const r = K.commit(st, ['c'], 'file', 7);
        const rep = tryCall(() => K.runAttempt(st, r));
        const lg = tryCall(() => K.log(st, r.attempt));
        const passKinds = lg.ok ? lg.v.map((e) => e.kind) : [];
        const failLog = tryCall(() => K.log(s, rec.attempt));
        const failKinds = failLog.ok ? failLog.v.map((e) => e.kind) : [];
        return C(lg.ok && rep.ok && rep.v.outcome === 'passed'
          && passKinds.filter((k) => k === 'commit').length === 1
          && passKinds[passKinds.length - 1] === 'commit'
          && failKinds.filter((k) => k === 'commit').length === 0
          && failKinds.filter((k) => k === 'outcome').length === 1,
          `the PASSING save: kinds=${JSON.stringify(passKinds)} (commit entries=${passKinds.filter((k) => k === 'commit').length}) ; the FAILED save: kinds=${JSON.stringify(failKinds)} (commit entries=${failKinds.filter((k) => k === 'commit').length}) ; bytes after the passing save=${imgStr(bytes(PP))}`);
      });
    void hPre;
  });

// =============================================================== FTS-05 =====
scenario('FTS-05', 'the save\'s arm table is closed and total (bare write, mem tier, file tier, a closed record)',
  'surface.md §2.11 clause 2; contract.md §7.2 item 5; §2.11 clause 1 (the failing arm unmoved)', () => {
    // (a) a bare caller-made file-tier write, with no kernel pass at all
    const d1 = tmp(); const P1 = path.join(d1, 'a.json');
    const s1 = PKG.storeCreate({ filePath: P1, journalLength: 8, listeners: [] });
    const w1 = tryCall(() => s1.write(['a'], 'file', 1));
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
  'surface.md §2.2 clauses 1-4; parameter-semantics.md §2.20; §2.4 item 9 (g) item 1', () => {
    const d = tmp(); const P = path.join(d, 'arg5.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    cell('FTS-06.1', 'surface.md §2.2 clause 2 (the position is optional; absent it is IN DOMAIN)',
      'a write of four arguments proceeds and returns the store\'s own write result',
      () => {
        const w = tryCall(() => s.write(['a'], 'file', 1));
        return C(w.ok && !!w.v && !!w.v.op && typeof w.v.op.opId === 'string', `write -> ${w.ok ? JSON.stringify(Object.keys(w.v)) : describe(w.v)}`);
      });
    const refused = tryCall(() => s.write(['z'], 'file', 1, undefined));
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
        const r = tryCall(() => s.read(['z']));
        const reg = tryCall(() => s.read([]));
        return C(!r.ok && r.v && r.v.status === 'AddressNotFound' && reg.ok && !('z' in reg.v),
          `read z -> ${describe(r.v)} ; register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)}`);
      });
    observed('FTS-06.5', 'surface.md §2.2 clause 4 (the arity reading is separate from the class test)',
      'the refusal\'s message as the boundary spells it', () => String(refused.v && refused.v.message));
  });

// =============================================================== FTS-07 =====
scenario('FTS-07', 'the fifth position\'s class test: every outside value refused, a plain object carrying `pending` admitted',
  'surface.md §2.4 item 9 (g) items 1-2 (item 2 AS RE-SPELLED 2026-10-16: the wider class CLOSED BY ADMISSION); parameter-semantics.md §2.19, §2.20', () => {
    const d = tmp(); const P = path.join(d, 'class.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const outside = [
      ['null', null], ['a number', 3], ['a string', 'x'], ['a boolean', true],
      ['a function', () => true], ['an Array', []], ['a plain object {}', {}],
      ['a plain object carrying `pending: undefined`', { pending: undefined }],
    ];
    for (const [i, [label, v]] of outside.entries()) {
      const r = tryCall(() => s.write(['q'], 'file', 1, v));
      cell(`FTS-07.${i + 1}`, 'surface.md §2.4 item 9 (g) item 1 (the class test)',
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
        const proxied = tryCall(() => s.write(['q'], 'file', 1, new Proxy({ pending: [] }, {})));
        const plain = tryCall(() => s.write(['q'], 'file', 1, { pending: [] }));
        return C(!proxied.ok && plain.ok, `Proxy -> ${proxied.ok ? 'PROCEEDED' : describe(proxied.v)} ; plain {pending: []} -> ${plain.ok ? 'PROCEEDED' : describe(plain.v)}`);
      });
    cell('FTS-07.10', 'surface.md §2.19 (the class test is what the boundary evaluates, and never an adoption history)',
      'a plain object carrying a present, non-undefined `pending` is IN DOMAIN: the write proceeds with no throw',
      () => {
        const r = tryCall(() => s.write(['q'], 'file', 1, { pending: [] }));
        return C(r.ok && !!r.v.op, `write -> ${r.ok ? JSON.stringify(r.v.op.opId) : describe(r.v)}`);
      });
    // ⟶ THE PARK IS LIFTED 2026-10-16 (this pass), BY THE CLAUSE THAT WAS WRITTEN TO LIFT IT. `surface.md §2.4`
    // item `9` `(g)` item `2` was `OPEN` and is now CLOSED BY ADMISSION — the architect's ruling `A120` (1),
    // re-spelt into the specification at that item's own dated clause (2026-10-16): *"THE FIFTH POSITION
    // ADMITS ANY VALUE CARRYING A `pending` MEMBER"*, the residue a foreign or unresolvable carrier holds
    // being *"THE CALLER'S OWN ERROR SURFACING LATER"* and *"NO STATE OF THIS POSITION"*, with
    // `commitPositionRefusal` UNCHANGED and the sentence *"NO DRIVE MAY ASSERT THIS ROW"* WITHDRAWN BY NAME,
    // which clause names this very park as the greens author's to lift. So the row is asserted here, and only
    // what the clause declares: that the position ADMITS the value and the write PROCEEDS. A cell would be
    // asserting the UNDECLARED (a later layer's law) if it bound the value's later answer, so it does not.
    cell('FTS-07.12', 'surface.md §2.4 item 9 (g) item 2 AS RE-SPELLED 2026-10-16 (the wider class is CLOSED BY ADMISSION; `A: docs/decisions.md` · `A120` (1), 2026-10-16, ACTIVE), read with item 9 (g) item 1 (the class test)',
      'a value carrying `pending` whose entries are ANOTHER INSTANCE\'S HANDLES — a foreign residue the kernel never handed this instance — is IN DOMAIN at the fifth position: the write PROCEEDS and returns the store\'s own result, no refusal being declared for it',
      () => {
        const d2 = tmp(); const P2 = path.join(d2, 'other.json');
        const other = PKG.storeCreate({ filePath: P2, journalLength: 8, listeners: [] });
        const fh = K.register(other, ['f'], 'cf', () => true);
        const foreignRec = K.commit(other, ['f'], 'mem', 1); // another instance's own record identity
        const byHandle = tryCall(() => s.write(['q'], 'file', 1, { pending: [fh] }));
        const byRecord = tryCall(() => s.write(['q'], 'file', 1, foreignRec));
        return C(byHandle.ok && !!byHandle.v.op && byRecord.ok && !!byRecord.v.op,
          `context carrying another instance's handle -> ${byHandle.ok ? `PROCEEDED (op=${JSON.stringify(byHandle.v.op.opId)})` : describe(byHandle.v)} ; the same instance's whole record -> ${byRecord.ok ? `PROCEEDED (op=${JSON.stringify(byRecord.v.op.opId)})` : describe(byRecord.v)}`);
      });
    cell('FTS-07.13', 'surface.md §2.4 item 9 (g) item 2 AS RE-SPELLED 2026-10-16 (the object carrying a member that is NOT a handle at all PROCEEDS; `A: docs/decisions.md` · `A120` (1)), read with item 9 (g) item 1 (the position reads the MEMBER\'S PRESENCE and never its contents)',
      'a value carrying `pending` whose entries are NOT HANDLES AT ALL is IN DOMAIN at the fifth position: the write PROCEEDS and returns the store\'s own result, the member\'s contents being unread there',
      () => {
        const g = tryCall(() => s.write(['q'], 'file', 1, { pending: [42, 'x', null] }));
        const o = tryCall(() => s.write(['q'], 'file', 1, { pending: [{ notAHandle: true }] }));
        return C(g.ok && !!g.v.op && o.ok && !!o.v.op,
          `pending:[42,'x',null] -> ${g.ok ? `PROCEEDED (op=${JSON.stringify(g.v.op.opId)})` : describe(g.v)} ; pending:[{notAHandle:true}] -> ${o.ok ? `PROCEEDED (op=${JSON.stringify(o.v.op.opId)})` : describe(o.v)}`);
      });
  });

// =============================================================== FTS-08 =====
scenario('FTS-08', 'the fourth cfg key at construction: the legal forms make an instance, every outside form answers #16 and leaves nothing behind',
  'surface.md §2.1 (the dated four-key clause); contract.md §7.1 step 4-bis; §8.1 #16; parameter-semantics.md §2.21', () => {
    const legal = [
      ['absent (no list is declared)', 'ABSENT', []],
      ['the empty list', [], []],
      ['one valid pair', [{ address: ['a'], id: 'c1' }], []],
      ['two valid pairs, with an integer segment', [{ address: ['a'], id: 'c1' }, { address: ['b', 0], id: 'c2' }], []],
    ];
    legal.forEach(([label, value], i) => {
      cell(`FTS-08.${i + 1}`, 'surface.md §2.1 (dated) + parameter-semantics.md §2.21 (the legal forms; `constraints` alone is optional)',
        `${label} is IN DOMAIN: the construction returns an instance and the register carries no key of the list`,
        () => {
          const d = tmp(); const P = path.join(d, 'ok.json');
          const cfg = { filePath: P, journalLength: 8, listeners: [] };
          if (value !== 'ABSENT') cfg.constraints = value;
          const r = tryCall(() => PKG.storeCreate(cfg));
          if (!r.ok) return C(false, `THREW ${describe(r.v)}`);
          const reg = tryCall(() => r.v.read([]));
          const keys = reg.ok ? Object.keys(reg.v) : [];
          return C(!keys.includes('constraints'), `instance returned ; register keys=${JSON.stringify(keys)}`);
        });
    });
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
    outsideList.forEach(([label, value], i) => {
      cell(`FTS-08.${legal.length + i + 1}`, 'surface.md §2.1 (dated) + parameter-semantics.md §2.21 (the outside values)',
        `${label} answers the store\'s own #16 with no instance returned`,
        () => {
          const d = tmp(); const P = path.join(d, 'bad.json');
          const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: value }));
          if (r.ok) return C(false, 'an instance was returned for an outside value');
          const e = r.v;
          return C(e && e.status === 'ConstraintListInvalid' && typeof e.message === 'string' && e.message.length > 0,
            `${describe(e)}`);
        });
      });
    // ⟶ THE THREE OBSERVATIONS BELOW ARE ASSERTED FROM 2026-10-16 (this pass), BECAUSE THE LAW THEY OBSERVED
    // IS NOW DECLARED AND THE CLAIM THAT THEY PINNED IT WAS CORRECTED AT ITS OWN HOME. `storeroom-native/
    // contract.md §7.2`, the clause `ADDED 2026-10-16` — *"THE `id` HALF AND THE ENTRY'S OWN SHAPE"*, items
    // (a)/(b)/(c) — declares each observable, and the same document's re-spelling clause says of these three
    // cells that they *"ARE `OBSERVED` CELLS — THE RUN RECORDED THEIR VALUES AND ASSERTED NOTHING — SO NO
    // CLAUSE MAY READ 'pinned at' OF THEM"*, naming the lift as the greens author's. Each cell now asserts the
    // observable the clause prints and NOTHING else; each is read beside FTS-08.5/.8.6 (the two shapes §2.21's
    // own outside-value list prints: an absent id, and a non-string id) so the refusal is shown to be the
    // ENTRY'S domain and not a widening of that list.
    cell('FTS-08.17', 'contract.md §7.2 (a) ADDED 2026-10-16 (an empty-string `id` is OUTSIDE the entry\'s domain and the list is refused with `#16`) read with §8.1 #16 and kernel-surface.md §2.1 item 1 (`KC-2`: the `id` is not a non-empty string)',
      'the pair `[{ address: [\'c\'], id: \'\' }]` answers the store\'s own #16 — `ConstraintListInvalid`, no instance, the file not created — the empty-string id being outside the entry\'s domain although §2.21\'s outside-value list names only "absent or not a string"',
      () => {
        const d = tmp(); const P = path.join(d, 'empty-id.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['c'], id: '' }] }));
        const e = r.ok ? null : r.v;
        return C(!r.ok && e && e.status === 'ConstraintListInvalid' && typeof e.message === 'string' && e.message.length > 0 && !fs.existsSync(P),
          `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(e)} ; path created?=${fs.existsSync(P)} ; message=${JSON.stringify(e && e.message)}`);
      });
    cell('FTS-08.18', 'contract.md §7.2 (b) ADDED 2026-10-16 (the empty address `[]` and `[0]` are INSIDE §1.5\'s segment array and the pair is ADMITTED) read with §1.5 items 1 and 4 and parameter-semantics.md §2.21\'s `domain` cell',
      'the pairs `[{ address: [], id: \'c1\' }]` and `[{ address: [0], id: \'c1\' }]` are LEGAL list elements: the construction returns AN INSTANCE, produces NO code, and holds no register key of the list, the empty address being the address that resolves to the register itself',
      () => {
        const d = tmp();
        const out = [[], [0]].map((a) => {
          const P = path.join(d, `addr-${JSON.stringify(a).replace(/[^0-9a-z]/gi, '')}.json`);
          const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: a, id: 'c1' }] }));
          if (!r.ok) return `address ${JSON.stringify(a)} -> THREW ${describe(r.v)}`;
          const reg = tryCall(() => r.v.read([]));
          const keys = reg.ok ? Object.keys(reg.v) : null;
          return `address ${JSON.stringify(a)} -> ${reg.ok && !keys.includes('constraints') ? `INSTANCE, no code, register without a constraints key (${JSON.stringify(keys)})` : `INSTANCE but register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)}`}`;
        });
        return C(out.every((s) => s.includes('INSTANCE, no code')), out.join(' ; '));
      });
    cell('FTS-08.19', 'contract.md §7.2 (c) ADDED 2026-10-16 (a pair carrying a third member is ADMITTED: the validation reads the two members the `{ address, id }` spelling names and ignores any other) read with §8.1\'s complement block and §7.1\'s third-key row',
      'the pair `[{ address: [\'c\'], id: \'c1\', note: \'x\' }]` returns AN INSTANCE and produces NO code — the extra member lying outside the SPELLING and not outside the domain',
      () => {
        const d = tmp(); const P = path.join(d, 'third-member.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['c'], id: 'c1', note: 'x' }] }));
        if (!r.ok) return C(false, `THREW ${describe(r.v)} — the extra member was read as outside the domain`);
        const reg = tryCall(() => r.v.read([]));
        const keys = reg.ok ? Object.keys(reg.v) : null;
        return C(reg.ok && !keys.includes('constraints') && !keys.includes('note'),
          `INSTANCE (no code) ; register=${reg.ok ? JSON.stringify(keys) : describe(reg.v)}`);
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
      'a cfg carrying a fifth key beside a valid four-key set',
      () => {
        const d = tmp(); const P = path.join(d, 'fifth.json');
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [], extra: 1 }));
        return r.ok ? 'INSTANCE (the extra key is ignored)' : `THREW ${describe(r.v)}`;
      });
  });

// =============================================================== FTS-09 =====
scenario('FTS-09', 'the loaded state validated against the supplied list at load',
  'contract.md §7.2 item 6 as amended read with §7.2 item 1 (ADDED 2026-10-16: the load-side predicate, address-presence) and §7.2 items (a)/(b)/(c) (the entry shapes); surface.md §2.1 (dated: the two instants); §8.1 #16; parameter-semantics.md §2.21; docs/decisions.md · A119', () => {
    const d = tmp(); const P = path.join(d, 'image.json');
    // an existing image with two keys, written by the store's own act
    {
      const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      K.register(s, ['a'], 'ca', () => true);
      const r1 = K.commit(s, ['a'], 'file', 5); K.runAttempt(s, r1);
      const s2 = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      K.register(s2, ['b'], 'cb', () => true);
      const r2 = K.commit(s2, ['b'], 'file', 6); K.runAttempt(s2, r2);
    }
    const image = bytes(P);
    cell('FTS-09.1', 'contract.md §7.2 item 6 as amended + surface.md §2.1 (dated: "the loaded state is validated against the supplied list")',
      'an existing image whose state carries every supplied pair\'s address boots into an instance, and the register reads the loaded keys',
      () => {
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }, { address: ['b'], id: 'c2' }] }));
        if (!r.ok) return C(false, `THREW ${describe(r.v)}`);
        const reg = tryCall(() => r.v.read([]));
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
    // ⟶ RE-EXECUTED AND RE-RECORDED 2026-10-16, AGAINST THE RULED LAW. This cell was filed `CONFLICT` at
    // `20:38:41`: two live clauses named the same input class and the run followed the older, more specific
    // one. THE SUPERVISOR HAS SINCE RULED IT — `docs/decisions.md` · `A119` (2026-10-16, `ACTIVE`), ON THIS
    // VERY FILE AND THIS VERY CELL — *"the exemption is the FILE'S EMPTINESS, never the loaded state's
    // smallness"*: a ZERO-BYTE file boots an INSTANCE (and the file stays `0` bytes), while a PRESENT
    // two-byte `{}` image IS validated and refused. The run reproduces both halves unchanged; the cell is
    // re-derived to the ruled law and asserted, no longer reported as a doc-versus-doc disagreement.
    cell('FTS-09.5', 'docs/decisions.md · A119 (2026-10-16) ruling `contract.md §7.2` item 6\'s zero-length clause against `parameter-semantics.md §2.21` with `§8.1` #16: the load-side validation\'s reach keys on the FILE\'S BYTES and not on the loaded state\'s size',
      'a zero-byte file at cfg.filePath — the image a construction\'s own exclusive create leaves — boots an INSTANCE under a supplied non-empty list (the exemption is the FILE\'s emptiness), carrying ZERO register keys and leaving the file at 0 bytes',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'empty.json');
        PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [] }); // the construction's own create leaves 0 bytes
        const size = fs.statSync(PP).size;
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        const reg = r.ok ? tryCall(() => r.v.read([])) : null;
        return C(r.ok && size === 0 && fs.statSync(PP).size === 0 && reg && reg.ok && Object.keys(reg.v).length === 0,
          `image is ${size} bytes ; the run answers: ${r.ok ? `INSTANCE — read([]) -> ${reg && reg.ok ? JSON.stringify(reg.v) : describe(reg && reg.v)}` : `THREW ${describe(r.v)}`}`);
      });
    cell('FTS-09.6', 'contract.md §7.2 item 6 as amended (the discriminator: the exemption is keyed on the FILE, not on the state)',
      'a NON-zero-length image carrying an empty state (`{}`) against the same supplied list is validated and answers #16',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'zero-state.json');
        fs.writeFileSync(PP, '{}');
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid', `${r.ok ? 'AN INSTANCE WAS RETURNED' : describe(r.v)}`);
      });
    // ⟶ THE PARK THIS CELL CARRIED IS LIFTED 2026-10-16 (THIS PASS, `role_blind_test_writer`) — ON THE CLAUSE
    // AND NOT ON THIS AUTHOR'S READING. The cell read `NOT DRIVABLE BLIND` on the words *"'satisfies' is still
    // spelled nowhere".* THAT GROUND NO LONGER HOLDS AT THESE BYTES: `contract.md §7.2` item 1 (`ADDED
    // 2026-10-16`) SPELLS THE PREDICATE — *"THE LOADED STATE 'SATISFIES' THE SUPPLIED LIST IFF EVERY SUPPLIED
    // PAIR'S OWN `address` RESOLVES IN THE LOADED STATE"* — takes the ADDRESS-PRESENCE reading over the
    // key-coverage one, refuses the second by name, AND DECIDES THE VERY STATE THE TWO READINGS ANSWERED
    // DIFFERENTLY: *"the boot returns an instance … a loaded key no pair names is not a state `#16`'s trigger
    // column reaches"* (`docs/decisions.md` · `A119` settled the predicate's REACH, item 1 its SPELLING).
    // The three cells below are that clause's own three states, each driven FROM THE FILE'S OWN BYTES and the
    // supplied list. The park's ground is kept verbatim HERE, as the record of what drifted, and is asserted
    // nowhere: *"the clause says 'the loaded state no longer SATISFIES the supplied list' without fixing the
    // predicate: an address-presence reading and a key-coverage reading both fit the printed words, and the
    // two differ on an image carrying a key the list does not name. No clause selects between them, so no
    // run's value can be a pass."* WHAT MOVED IS THE DOCUMENTATION; NOT ONE BYTE OF THIS CELL'S SUBJECT DID.
    cell('FTS-09.7', 'contract.md §7.2 item 1, ADDED 2026-10-16 ("THE LOADED STATE SATISFIES THE SUPPLIED LIST IFF EVERY SUPPLIED PAIR\'S OWN `address` RESOLVES IN THE LOADED STATE … THE TWO READINGS DIFFERED EXACTLY ON AN IMAGE CARRYING A KEY THE LIST DOES NOT NAME … and THIS clause decides that state: THE BOOT RETURNS AN INSTANCE") read with the same clause\'s part 2 (the failure arm the predicate produces) and part 3 (the zero-length file), and with docs/decisions.md · A119 (`ACTIVE`, 2026-10-16 — the predicate\'s REACH)',
      'the predicate is ADDRESS-PRESENCE, NOT KEY-COVERAGE: an image carrying a key the supplied list does NOT name still satisfies it (every supplied pair\'s address resolving) — the boot returns AN INSTANCE whose register carries BOTH the named and the UNNAMED key, produces NO code for the unnamed key, and leaves the image byte-identical',
      () => {
        const before = bytes(P);
        const r = tryCall(() => PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        if (!r.ok) return C(false, `THREW ${describe(r.v)} — an image carrying the key 'b', which the supplied list does not name, was REFUSED; that is the KEY-COVERAGE reading, which §7.2 item 1 refuses by name`);
        const reg = tryCall(() => r.v.read([]));
        const v = reg.ok ? reg.v : null;
        return C(reg.ok && v && v.a === 5 && v.b === 6 && bytesEq(bytes(P), before),
          `INSTANCE, no code ; register=${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)} — the loaded state carries 2 keys and the list names 1, so the key-coverage reading would have refused this boot ; the image stands byte-identical=${bytesEq(bytes(P), before)} ; before=${imgStr(before)} after=${imgStr(bytes(P))}`);
      });
    // The two halves of `§7.2` item 1 part 3, DRIVEN FROM THE FILE'S OWN BYTES rather than from a construction's
    // side effect — the clause's own discriminator: *"the exemption is the ZERO-LENGTH FILE'S and NOT the EMPTY
    // STATE'S."* `{}` is written as the file's own two bytes; the zero-byte file is the one a construction's own
    // exclusive create leaves (`§7.1` step 4-bis), and its length is read with `statSync`.
    cell('FTS-09.8', 'contract.md §7.2 item 1 part 3, ADDED 2026-10-16 ("a NON-ZERO-LENGTH image carrying the empty object — a two-byte `{}` — IS a loaded state of 0 keys and IS validated, AND IS REFUSED WITH #16 where the supplied list names any pair; the exemption is the ZERO-LENGTH FILE\'S and NOT the EMPTY STATE\'S") read with §8.1 #16 and docs/decisions.md · A119',
      'a file whose own bytes are the two-byte image `{}` is VALIDATED even though its loaded state carries 0 keys: against a list naming one pair it is REFUSED with `ConstraintListInvalid` (#16), no instance is returned, and the image stands BYTE-IDENTICAL (the boot is a read)',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'present-empty-state.json');
        fs.writeFileSync(PP, '{}');
        const before = bytes(PP);
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        return C(!r.ok && r.v.status === 'ConstraintListInvalid' && bytesEq(bytes(PP), before),
          `image is ${before.length} bytes (a PRESENT image, so no zero-length exemption is available to it) ; ${r.ok ? 'AN INSTANCE WAS RETURNED — the empty STATE was exempted, which §7.2 item 1 part 3 refuses' : `THREW ${describe(r.v)}`} ; image after=${imgStr(bytes(PP))} byte-identical=${bytesEq(bytes(PP), before)}`);
      });
    cell('FTS-09.9', 'contract.md §7.2 item 1 part 3 read with item 6\'s zero-length sentence ("the content is the empty text, `0` register keys load … and NO code is produced") and §7.1 step 4-bis (the construction\'s own exclusive create leaves that zero-length file), and docs/decisions.md · A119',
      'a ZERO-BYTE file at cfg.filePath lies outside the predicate\'s reach: under a supplied non-empty list it boots AN INSTANCE carrying ZERO register keys, NO code is produced (#16 is not produced for it), and the file is left at 0 bytes',
      () => {
        const dd = tmp(); const PP = path.join(dd, 'zero-length.json');
        const c = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [] }));
        const size = fs.existsSync(PP) ? fs.statSync(PP).size : null;
        const r = tryCall(() => PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'c1' }] }));
        if (!r.ok) return C(false, `a zero-byte file (${size} bytes) under a non-empty supplied list THREW ${describe(r.v)} — the exemption is the FILE'S emptiness and the file IS empty`);
        const reg = tryCall(() => r.v.read([]));
        return C(c.ok && size === 0 && reg.ok && Object.keys(reg.v).length === 0 && fs.statSync(PP).size === 0,
          `file=${size} bytes (the construction's own exclusive create) ; INSTANCE, no code ; read([]) = ${reg.ok ? JSON.stringify(reg.v) : describe(reg.v)} ; size after the boot=${fs.statSync(PP).size}`);
      });
  });

// =============================================================== FTS-10 =====
scenario('FTS-10', 'the sixteenth member\'s own clause and its template row; the generator\'s census over the closed set',
  'contract.md §8.1 #16; §8.2 (the generator rule, the template table, completeness); package.md §1.3 item 4 (the addon\'s five exports)', () => {
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
      'a name outside the closed set does NOT render a row but answers the generator\'s outside-the-set sentence, so §FTS-10.3 is discriminating',
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
  'surface.md §2.11 clause 6; kernel-surface.md §2.3 item 2; parameter-semantics.md §2.20', () => {
    const d = tmp(); const P = path.join(d, 'join.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const rcMembers = []; const logKinds = [];
    let repairCalls = 0; let carryAttempt = 'NOT ATTEMPTED'; let carryRoute = 'NOT ATTEMPTED';
    let fired = 0;
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES THE SHIELD MANDATORY: THIS BODY
    // CARRIES A `repair`, so an unshielded registration reaches STATE 3, ATTEMPTS the repair there, and the
    // synthetic attempt's own `repair-run` entry and op are what `FTS-11.1`'s `rcMembers` records first — the
    // members list the cell prints carries the context twice, once from the registration and once from the
    // write (`["address,id,op,pending,tier,value","address,id,op,pending,tier,value"]`). **`FTS-11.1`'s own
    // subject is the context the repair is handed FOR THE WRITE'S OWN ATTEMPT**, and the shield restores
    // exactly that: the registration is answered `true`, the pair is CARRIED, and the repair runs once, at the
    // `K-3` pass the cell drives.
    K.register(s, ['c'], 'c1', atLandingOnly((ctx) => {
      if (ctx.value <= 10) return true;
      return { message: 'too large', repair: (rc) => {
        repairCalls++;
        rcMembers.push(Object.keys(rc).sort().join(','));
        carryAttempt = typeof rc.pending; // the declared "carries the commit it is part of" shape, read at the context itself
        // ⟶ RE-DERIVED 2026-10-16: CLAUSE 6'S OWN ROUTE IS NOW REACHABLE AND IS THE ROUTE THIS DRIVE TAKES —
        // the context the kernel hands the repair CARRIES the commit at the fifth position (`§2.3` item 2's
        // sixth member, `pending: Handle[]`, added 2026-10-15) and the class test of `§2.4` item 9 (g) item 1
        // admits it. The pre-re-spelling route (the position ABSENT) is recorded beside it, not asserted.
        const wCarry = tryCall(() => s.write(['c'], 'file', 10, rc));
        carryRoute = wCarry.ok ? `ACCEPTED (op=${JSON.stringify(wCarry.v.op && wCarry.v.op.opId)})` : `REFUSED: ${describe(wCarry.v)}`;
        const w = wCarry.ok ? wCarry : tryCall(() => s.write(['c'], 'file', 10)); // §2.20's in-domain form
        return { ok: true, op: w.ok ? w.v.op : undefined };
      } };
    }));
    const hListen = s.listen(['c']);
    s.register(hListen, () => { fired++; });
    const rec = K.commit(s, ['c'], 'file', 99);
    const out = tryCall(() => K.runAttempt(s, rec));
    if (out.ok) for (const e of out.v.log) logKinds.push(e.kind);
    // ⟶ RE-EXECUTED AND RE-DERIVED 2026-10-16 (this pass, tree of `20:49:40`): the five-member literal this
    // cell asserted at `20:38:41` is SUPERSEDED BY THE SIXTH MEMBER. `kernel-surface.md §2.3` item 2 added
    // `pending: Handle[]` on 2026-10-15 (its own dated clause, `§1` item 4's count re-derived `5 + 1 = 6`)
    // precisely so that clause 6's route is reachable at the write surface's fifth position. The cell now
    // asserts the DECLARED SIX, and the run produces exactly them.
    cell('FTS-11.1', 'kernel-surface.md §2.3 item 2 (the repair context\'s member set, DECLARED-DEFAULT: six members, `5 + 1 = 6`, the sixth `pending: Handle[]` added 2026-10-15) read with §1 item 4',
      'the repair is invoked with one argument carrying exactly the SIX declared members { op, address, id, value, tier, pending }',
      () => C(rcMembers.length === 1 && rcMembers[0] === 'address,id,op,pending,tier,value', `RepairContext members=${JSON.stringify(rcMembers)}`));
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
    // ⟶ RE-EXECUTED AND RE-DERIVED 2026-10-16 (this pass). The `CONFLICT` filed at `20:38:41` is WITHDRAWN BY
    // NAME: the two clauses no longer disagree, the kernel's declared context having gained its sixth member
    // — and the cell no longer drives a hand-built FIVE-member literal, which the class test refuses for a
    // reason that has nothing to do with the kernel. It drives THE CONTEXT THE KERNEL ACTUALLY HANDED THE
    // REPAIR, at the fifth position, which is clause 6's own route (`§2.3` item 2's dated closure clause:
    // *"WITH THE MEMBER PRESENT THE ROUTE IS WHOLE"*; `§2.4` item 9 (g) item 1).
    cell('FTS-11.5', 'surface.md §2.11 clause 6 ("it carries the commit the constraint passed it, AT THE FIFTH POSITION this section\'s §2.2 fixes") read with kernel-surface.md §2.3 item 2 (the sixth member, dated 2026-10-15) and surface.md §2.4 item 9 (g) item 1 (the position\'s class test)',
      'the RepairContext the kernel hands a repair is itself a LAWFUL value at the fifth position: the repair\'s own write carrying it at that position is ACCEPTED (no refusal), so clause 6\'s route is reachable',
      () => C(carryRoute.startsWith('ACCEPTED'),
        `the context the kernel handed the repair: members=${JSON.stringify(rcMembers)} rc.pending is ${carryAttempt} ; carrying it at the fifth position: ${carryRoute}`));
    observed('FTS-11.6', 'surface.md §2.7 item 7 (a) (the checked-off identity\'s firing, resolved through the registry)',
      'the number of times the delivered body ran on the repair-join arm', () => `listener invocations=${fired}`);
    // ⟶ THE PASSING-ARM HALF OF THE ONE-SHOT ARMS, OWED HERE AND ASSERTED HERE FROM 2026-10-16 (this pass).
    // THE GAP WAS NAMED BY THE WITNESS: the set asserted the `commit` entry's ABSENCE on the failing arm
    // (`FTS-04.10`) and never its PRESENCE on the passing arm, so the discriminate ran one direction only.
    // `kernel-surface.md §2.1` item 3's ordering clause (LANDED 2026-10-16) now reads the passing arm by name:
    // THE `commit` ENTRY IS APPENDED **AFTER THE SAVE HAS STOOD**, AND IT IS APPENDED **EXACTLY ONCE AND LAST**
    // ON THE PASSING ARM — *"the append site, whose own words are 'THE SAVE HAS STOOD … HERE AND ONLY HERE'"* —
    // while *"the failing arm carries the one `outcome` entry and NO `commit` entry at all"* — which is
    // `FTS-04.10` read beside these two cells. The row table's own `commit` row fixes `id` = `null`,
    // `state` = `null` and `opId` = the attempt's LAST op; the ORDER clause fixes `seq` strictly increasing
    // from `1`, assigned at the append. A PASSING `file`-tier save is the arm these two cells drive.
    const armCell = (id, observable, body) => cell(id, 'kernel-surface.md §2.1 item 3 (the LogKind table\'s `commit` row: `id` = null, `opId` = the attempt\'s last op, `state` = null) read with the ORDERING CLAUSE LANDED 2026-10-16 (appended AFTER the save has stood, EXACTLY ONCE AND LAST on the passing arm), composition-and-states.md §2.7 items 5 and 7 (the PASSED arm\'s own sequence) and surface.md §2.11 clause 3 (ii) (no body runs before the save on the passing arm)', observable, body);
    const arm = (() => {
      const dd = tmp(); const PP = path.join(dd, 'passing-arm.json');
      const st = PKG.storeCreate({ filePath: PP, journalLength: 8, listeners: [] });
      K.register(st, ['c'], 'c1', () => true);
      const r = K.commit(st, ['c'], 'file', 42);
      const rep = tryCall(() => K.runAttempt(st, r));
      const lg = tryCall(() => K.log(st, r.attempt));
      return { store: st, rec: r, rep, entries: lg.ok ? lg.v : [], logOk: lg.ok, image: bytes(PP) };
    })();
    armCell('FTS-11.7',
      'the passing `file`-tier save: the log carries the `commit` entry EXACTLY ONCE, and no `outcome` entry stands beside it — the two one-shot arms never standing in one log',
      () => {
        const kinds = arm.entries.map((e) => e.kind);
        const c = kinds.filter((k) => k === 'commit').length;
        const o = kinds.filter((k) => k === 'outcome').length;
        return C(arm.logOk && arm.rep.ok && arm.rep.v.outcome === 'passed' && c === 1 && o === 0,
          `kinds=${JSON.stringify(kinds)} commit entries=${c} outcome entries=${o} report.outcome=${arm.rep.ok ? JSON.stringify(arm.rep.v.outcome) : describe(arm.rep.v)} image=${imgStr(arm.image)}`);
      });
    armCell('FTS-11.8',
      'the same entry is LAST of the log\'s kinds and the log\'s own order is the kernel\'s (`seq` strictly increasing from 1): the append is after the save has stood, and the entry\'s own `id`/`state` are `null` with its `opId` the attempt\'s last op',
      () => {
        const kinds = arm.entries.map((e) => e.kind);
        const last = arm.entries[arm.entries.length - 1];
        const seqOk = arm.entries.every((e, i) => e.seq === i + 1);
        const ops = arm.rep.ok ? arm.rep.v.ops : [];
        const lastOp = ops.length ? ops[ops.length - 1].opId : null;
        return C(arm.logOk && arm.entries.length > 0 && last && last.kind === 'commit' && seqOk
          && last.id === null && last.state === null && last.opId === lastOp,
          `kinds=${JSON.stringify(kinds)} ; last=${JSON.stringify(last && [last.kind, last.id, last.opId, last.state])} ; seq=${JSON.stringify(arm.entries.map((e) => e.seq))} ; the attempt's last op=${JSON.stringify(lastOp)}`);
      });
    void rec;
  });

// =============================================================== FTS-12 =====
scenario('FTS-12', 'the censuses clause 7 leaves unmoved',
  'surface.md §2.11 clause 7 READ THROUGH ITS 2026-10-16 MARK (its two figures re-derived to `§2.4` item 9 (f)\'s and `§2.9` item 1\'s `A127` clauses), with §2.3 item 1 (the product\'s member set) and kernel-surface.md §1 (the kernel\'s extent)', () => {
    const d = tmp(); const P = path.join(d, 'census.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
    // `RCA-8(g)`. `surface.md §2.11` clause 7's two figures carry their own 2026-10-16 mark — *"THE TWO FIGURES
    // THIS SENTENCE PRINTS ARE SUPERSEDED AND ARE READ THROUGH AT THIS CLAUSE'S OWN BYTES"* — and the operative
    // figures are ONE named export, `storeCreate` ALONE, `11 → 1` ✓ (`§2.9` item 1's `A127` clause), and TWELVE
    // own members, `10 + 1 + 1 = 12` ✓ (`§2.4` item 9 (f)'s `A127` clause). EACH CELL KEEPS ITS SUBJECT AND ITS
    // EXACT SET-EQUALITY FORM; only the figures move, and `on`/`off`'s absence stays asserted BY that equality.
    cell('FTS-12.1', 'surface.md §2.11 clause 7 READ THROUGH ITS 2026-10-16 MARK; the operative figure is §2.4 item 9 (f)\'s `A127` clause (`10 + 1 + 1 = 12`)',
      'the instance exposes exactly the TWELVE declared members and no thirteenth — `on` and `off` among the absent',
      () => {
        const members = Object.getOwnPropertyNames(s).sort();
        const want = ['addConstraint', 'constraintOff', 'constraintOn', 'delete', 'listen', 'read', 'readLiteral',
          'register', 'rollback', 'settle', 'unlisten', 'write'];
        return C(JSON.stringify(members) === JSON.stringify(want), `members=${JSON.stringify(members)}`);
      });
    cell('FTS-12.2', 'surface.md §2.11 clause 7 READ THROUGH ITS 2026-10-16 MARK; the operative figure is §2.9 item 1\'s `A127` clause (`11 → 1`)',
      "the package's module namespace carries exactly its one remaining name, `storeCreate`",
      () => {
        const keys = Object.keys(PKG).sort();
        return C(keys.length === 1 && JSON.stringify(keys) === JSON.stringify(['storeCreate']), `namespace=${JSON.stringify(keys)}`);
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
        const h2 = s.listen(['x']);
        return `kernel.register === PKG.listen ? ${h1 === h2}`;
      });
  });

// ----------------------------------------------------------------- tail ---
const fails = CELLS.filter((c) => c.verdict === 'FAIL');
const conflicts = CELLS.filter((c) => c.verdict === 'CONFLICT');
const passes = CELLS.filter((c) => c.verdict === 'PASS');
const obs = CELLS.filter((c) => c.verdict === 'OBSERVED');
const nd = CELLS.filter((c) => c.verdict === 'NOT DRIVABLE BLIND');
console.log(`\nTOTALS cells=${CELLS.length} pass=${passes.length} fail=${fails.length} conflict=${conflicts.length} observed=${obs.length} not-drivable=${nd.length}`);
console.log(`SCENARIOS ${Object.entries(SCENARIO_VERDICT).map(([k, v]) => `${k}=${v}`).join(' ')}`);
if (fails.length || conflicts.length) {
  console.log('\nFAILED / CONFLICTED CELLS');
  for (const c of [...fails, ...conflicts]) console.log(`  ${c.verdict} ${c.id} :: ${c.detail} :: ${c.clause}`);
}
console.log('CLEANUP');
for (const d of dirs) { try { fs.chmodSync(d, 0o755); fs.rmSync(d, { recursive: true, force: true }); } catch (e) { console.log(`  could not remove ${d}: ${e.message}`); } }
process.exit(fails.length || conflicts.length ? 1 : 0);
