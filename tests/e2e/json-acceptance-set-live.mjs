#!/usr/bin/env node
// ============================================================================
// THE LIVE RUN FOR THE BLIND GREENS SET `JAS` — the `file` tier's JSON CODEC
// as a declared contract, driven against the RUNNING PACKAGE.
// artifact: docs/specs/storeroom-json-acceptance-set-greens.md   (the set)
// runner:   tests/e2e/json-acceptance-set-live.mjs       (this file)   ⟶ MOVED 2026-10-25 (`D-5`), FROM `bindings/js/greens/json-acceptance-set-live.mjs`.
// report:   docs/specs/storeroom-json-acceptance-set-live-report.md
//
// WHAT THIS RUNNER IS. An INDEPENDENT live re-drive of the set's twelve
// scenarios, written against the set's cell ids so the two censuses can be
// diffed cell by cell.  It drives the REAL built package — the staged
// `bindings/js/build/Release/storeroom_js_binding.node` reached through the
// package's own ESM entry `bindings/js/index.mjs` — against REAL files on a
// REAL disk.  No implementation file was edited by this pass.
//
// THE RULES THIS RUNNER BINDS ITSELF TO.
//   1. EVERY scenario starts from a REAL USER INPUT OR AN EXTERNAL EVENT — a
//      value written through the public API, a file written BY HAND on disk,
//      or a file left by an earlier run — never from an internal seam.
//   2. EVERY scenario runs to the FINAL RESOLVED STATE: the file's bytes on
//      disk, the register's contents as the caller sees them, the
//      construction's answer.  A scenario that stops before the settled end
//      state is not a pass.
//   3. A LAYER-LIMIT is neither a pass nor a failure: the cell is DRIVEN, the
//      layer's own reach is reported, and the set's own limit wording is kept.
//   4. A live contradiction of the set's declared verdict is a FINDING.  It is
//      reported, never repaired.
//
// House form (the corpus's own):
//   RESULT <id> <verdict> :: <detail> :: <clause>
//   verdicts: PASS | FAIL | LAYER-LIMIT | OBSERVED | GAP | AMENDMENT-PENDING
//             | NONRUN | FINDING
//   PASS               — the clause's own observable was produced by the run.
//   FAIL               — the run answered something the clause does not declare.
//   LAYER-LIMIT        — the clause's expectation is NOT reachable from THIS
//                        layer; the reason is printed; NEVER a pass.
//   OBSERVED           — the run's value is RECORDED and NOT asserted.
//   GAP                — no cell could be derived from the clause.
//   AMENDMENT-PENDING  — the clause is mid-amendment; the cell is not a pass.
//   NONRUN             — the cell was DECLARED and NEVER EXECUTED (a scenario's
//                        early return, or its own throw). Neither a pass nor a
//                        failure, and — per D-21 — not an exit 0 either.
//   FINDING            — the live run CONTRADICTS a declared verdict.
//
// RUN:  node tests/e2e/json-acceptance-set-live.mjs   (from the repo root)   ⟶ MOVED 2026-10-25 (`D-5`): this command read `node bindings/js/greens/json-acceptance-set-live.mjs` until the batteries were stratified.
// EXIT: 0 iff no cell FAILed, none was a FINDING, and NONE WAS NON-EXECUTED.
//       `D-21` (strata/decisions.md, 2026-10-24): *"A runner whose cells are red,
//       or whose cells never ran, may not exit 0."*  So a GAP, an
//       AMENDMENT-PENDING and a NONRUN each force exit 1, and the three are named
//       on the exit line.  A LAYER-LIMIT and an OBSERVED cell EXECUTED and stay
//       non-failing.
// ============================================================================
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG = await import('../../bindings/js/index.mjs');
const K = await import('../../bindings/js/src/constraint-kernel.mjs');

const LAYER = 'ENVELOPE/PURE (the JavaScript package layer, in-process)';
const APP_LAYER = 'NONE';
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// THE CHARACTERS THE CLASSES NAME, BUILT PROGRAMMATICALLY so that no literal
// control byte is ever written into this file.
const CH = {
  LF: String.fromCharCode(0x0A),
  TAB: String.fromCharCode(0x09),
  NUL: String.fromCharCode(0x00),
  BS: String.fromCharCode(0x08),
  FF: String.fromCharCode(0x0C),
  CR: String.fromCharCode(0x0D),
  NBSP: String.fromCharCode(0xA0),
  PAIR: String.fromCharCode(0xD83D, 0xDE00),
};
// THE ESCAPED FORMS, as the JSON TEXT carries them (a backslash then the
// four hex digits) — the form the loader admits.
const ESC = {
  NUL: '\\u0000', BS: '\\b', TAB: '\\t', LF: '\\n', FF: '\\f', CR: '\\r',
  PAIR: '\\uD83D\\uDE00',
};

// ------------------------------------------------------------- harness ---
const CELLS = [];
let SCENARIO = 'JAS-00';
const SCENARIO_VERDICT = {};

const describe = (e) => {
  if (e === null) return 'null';
  if (e === undefined) return 'undefined';
  if (e instanceof Error) return `${e.constructor.name}: ${e.message}`;
  if (typeof e === 'object') {
    const keys = Object.getOwnPropertyNames(e).join(',');
    const inner = ('status' in e || 'message' in e)
      ? ` status=${JSON.stringify(e.status)} message=${JSON.stringify(e.message)}` : '';
    return `thrown object{${keys}}${inner}`;
  }
  return `${typeof e} ${JSON.stringify(e)}`;
};

// ⟶ **`D-21` (2026-10-24) IMPLEMENTED HERE, 2026-10-25.** *"A runner whose cells are red, or whose cells never
// ran, may not exit `0`. … the 'cell never ran' case is owed an explicit third state — neither `PASS` nor `FAIL`
// may be printed for a cell that did not execute."*  This runner's own vocabulary already carried two such states
// — `GAP` (*"no cell could be derived"*) and `AMENDMENT-PENDING` (*"the clause is mid-amendment; the cell is not a
// pass"*) — and a third is added now: **`NONRUN`**, for a declared cell that a scenario's early `return` or its
// own throw kept from executing. **`NONRUN` RANKS AS HIGH AS `FAIL` FOR THE EXIT AND IS NEVER A PASS**, and the
// three non-execution states are named on the exit line so a reader of the code alone can tell what it read.
// `LAYER-LIMIT` and `OBSERVED` stay at rank `0` on `D-21`'s own test: both cells EXECUTED — the layer's reach was
// driven and reported, and the observed value was recorded — and neither is a red.
const RANK = { PASS: 0, OBSERVED: 0, 'LAYER-LIMIT': 0, GAP: 2, 'AMENDMENT-PENDING': 2, NONRUN: 2, FAIL: 2, FINDING: 2 };
function record(id, verdict, detail, clause) {
  CELLS.push({ id, verdict, detail, clause });
  console.log(`RESULT ${id} ${verdict} :: ${detail} :: ${clause}`);
  const now = SCENARIO_VERDICT[SCENARIO] || 'PASS';
  if (verdict in RANK && RANK[verdict] > RANK[now]) SCENARIO_VERDICT[SCENARIO] = verdict;
}

// A cell body returns: true | [bool, detail] | { ok, detail }.
function cell(id, clause, observable, body) {
  let verdict; let detail;
  try {
    const r = body();
    if (r === true) { verdict = 'PASS'; detail = observable; }
    else if (Array.isArray(r)) { verdict = r[0] ? 'PASS' : 'FAIL'; detail = `${observable} :: ${r[1]}`; }
    else if (r && typeof r === 'object' && 'ok' in r) { verdict = r.ok ? 'PASS' : 'FAIL'; detail = `${observable} :: ${r.detail}`; }
    else { verdict = 'FAIL'; detail = `${observable} :: cell returned no verdict: ${JSON.stringify(r)}`; }
  } catch (e) {
    verdict = 'FAIL'; detail = `${observable} :: UNDECLARED THROW: ${describe(e)}`;
  }
  record(id, verdict, detail, clause);
}
const C = (ok, detail) => ({ ok: !!ok, detail });
const tryCall = (fn) => { try { return { ok: true, v: fn() }; } catch (e) { return { ok: false, v: e }; } };

function layerLimit(id, clause, reason) { record(id, 'LAYER-LIMIT', reason, clause); }
function observed(id, clause, observable, body) {
  let value;
  try { value = JSON.stringify(body(), (k, v) => (typeof v === 'function' ? '[function]' : v)); }
  catch (e) { value = `THREW ${describe(e)}`; }
  if (value === undefined) value = 'undefined';
  record(id, 'OBSERVED', `${observable} :: ${value}`, clause);
}
function gap(id, clause, reason) { record(id, 'GAP', reason, clause); }
// the third state: a cell this run DECLARED and never executed (`D-21`)
function nonrun(id, clause, reason) { record(id, 'NONRUN', `${reason} :: THE CELL DID NOT EXECUTE — neither PASS nor FAIL is printed for it`, clause); }

function scenario(id, title, start, steps, body) {
  SCENARIO = id;
  SCENARIO_VERDICT[id] = SCENARIO_VERDICT[id] || 'PASS';
  console.log(`\n--- ${id} ${title}`);
  console.log(`START  ${start}`);
  console.log(`STEPS  ${steps}`);
  try { body(); } catch (e) { record(`${id}.x0`, 'FAIL', `the scenario threw outside a cell: ${describe(e)}`, title); }
  console.log(`SCENARIO ${id} ${SCENARIO_VERDICT[id]} :: ${title}`);
}

// ------------------------------------------------------------- utilities ---
const dirs = [];
function tmp() { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'jas-live-')); dirs.push(d); return d; }
const bytesOf = (p) => { try { return fs.readFileSync(p); } catch (e) { return null; } };
const imgStr = (b) => (b === null ? 'NO FILE' : JSON.stringify(b.toString('utf8')));
const canon = (v) => {
  if (Array.isArray(v)) return v.map(canon);
  if (v && typeof v === 'object') {
    const out = {};
    for (const k of Object.keys(v).sort()) out[k] = canon(v[k]);
    return out;
  }
  if (typeof v === 'number' && Object.is(v, -0)) return '-0';
  return v;
};
const same = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
const show = (v) => { try { return JSON.stringify(canon(v)); } catch (e) { return String(v); } };
const depthOf = (v) => { let d = 0; while (Array.isArray(v)) { d += 1; v = v[0]; } return d; };
const innermost = (v) => { while (Array.isArray(v)) v = v[0]; return v; };

// THE BOOT: the caller writes the image's BYTES at a fresh path with its own
// hands (`fs.writeFileSync`) and the package's own `storeCreate` boots over it.
function boot(bytes, cfgExtra) {
  const d = tmp();
  const P = path.join(d, 'store.json');
  fs.writeFileSync(P, bytes);
  const cfg = Object.assign({ filePath: P, journalLength: 8, listeners: [] }, cfgExtra || {});
  const r = tryCall(() => PKG.storeCreate(cfg));
  return { d, P, r, store: r.ok ? r.v : null };
}
const registerOf = (store) => { const r = tryCall(() => store.read([])); return r.ok ? r.v : null; };
const keyOf = (store, key) => tryCall(() => store.read([key]));

// THE DOCS AS THEY STAND NOW — the depth class's counting convention is being
// amended, so the EXPECTATION IS READ FROM THE DOCUMENTS, NOT HARD-CODED.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ `D-17` EXECUTED HERE, 2026-10-25 (`D-20`'s pass): THE DOCUMENTARY READS ARE GONE, NOT MADE LOUDER.**
// `D-17` (`strata/decisions.md`, 2026-10-24: *"Rewrite or retire the tests that point at docs. Tests are for
// code."*) names **this very helper** as its most dangerous site: *"`readDoc` with `catch → return ''` … turns an
// `ENOENT` into an EMPTY STRING, so its cells assert against nothing and may be reporting FALSE GREENS on this
// tree right now. **A read that cannot fail cannot be trusted to have passed.**"* Three reads fed `JAS-07`'s two
// boundary cells and `JAS-12`'s gap cell with figures PARSED OUT OF `docs/**` — and because the archival moved
// those paths, all three came out empty and the cells evaporated (`JAS-07.1` recorded `AMENDMENT-PENDING`,
// `JAS-07.2` NEVER RAN, `JAS-12.1` recorded `GAP`, and both scenarios still printed `PASS`).
// **WHAT REPLACES THEM IS BEHAVIOUR, WHICH IS CODE:** `probeDepth` below derives the loader's boundary from the
// artifact under test — the deepest foreign image that LOADS and the shallowest that does not, with monotonicity
// asserted on both sides — and the boundary cells assert that MEASURED bracket. **This file opens no document any
// longer, and nothing in it can pass on a file it could not read.**
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE BRACKET THE PROBE SEARCHES: wide enough that the whole admitted band is inside it, and finite so the run
// terminates. `PROBE_HI` is the first container count this probe will not ask about.
const PROBE_LO = 1;
const PROBE_HI = 140;

// THE IMAGE OF n CONTAINERS (the root object counted as the first level):
// `{"a": [[[ ... 0 ... ]]]}` — the root object plus (n-1) nested arrays.
const imageOfContainers = (n) => `{"a":${'['.repeat(n - 1)}0${']'.repeat(n - 1)}}`;

// =============================================================== JAS-01 =====
scenario('JAS-01', 'class 1: a raw control character inside a string is refused, and the escaped form is accepted',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory (a file the store did not write), booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register and the keys; settle on the register the caller sees.',
  () => {
    const C1 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (1) ("A RAW CONTROL CHARACTER INSIDE A STRING IS REFUSED — a literal LF, a literal TAB or a literal NUL inside a string — AND THE ESCAPED FORM (\\u0000) IS ACCEPTED"); A143 (1)';

    const rawCase = (id, label, raw) => {
      cell(id, C1,
        `a file carrying a ${label} inside a string is REFUSED: the WHOLE file does not load, the register begins EMPTY, the instance is returned and no error reaches the caller`,
        () => {
          const bytes = `{"a":"x${raw}y","b":7}`;
          const b = boot(bytes);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          const a = keyOf(b.store, 'a');
          const bb = keyOf(b.store, 'b');
          const onDisk = bytesOf(b.P);
          return C(reg !== null && same(reg, {}) && !a.ok && !bb.ok,
            `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : 'AddressNotFound'} read(b)=${bb.ok ? JSON.stringify(bb.v) : 'AddressNotFound'} bytes on disk unchanged=${onDisk !== null && onDisk.equals(Buffer.from(bytes, 'utf8'))}`);
        });
    };
    rawCase('JAS-01.1', 'literal LF', CH.LF);
    rawCase('JAS-01.2', 'literal TAB', CH.TAB);
    rawCase('JAS-01.3', 'literal NUL', CH.NUL);

    cell('JAS-01.4', C1,
      'the ESCAPED form \\u0000 inside a string is ACCEPTED: the key loads and its value is the string carrying the NUL',
      () => {
        const b = boot(`{"a":"x${ESC.NUL}y","b":7}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        const want = `x${CH.NUL}y`;
        return C(reg !== null && same(reg, { a: want, b: 7 }) && a.ok && a.v === want && bb.ok && bb.v === 7,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)} read(b)=${bb.ok ? JSON.stringify(bb.v) : describe(bb.v)}`);
      });

    cell('JAS-01.5', C1,
      'CONTROL: the same file with the control character absent loads BOTH keys, so the drive discriminates the refusal from an ordinary load',
      () => {
        const b = boot('{"a":"xy","b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, { a: 'xy', b: 7 }), `register=${show(reg)}`);
      });

    cell('JAS-01.6', `${C1}; A141 (1) (the FIVE SHORT ESCAPES: \\b \\t \\n \\f \\r) and A141 (3) ("BOTH parsers accept BOTH spellings")`,
      'the FIVE SHORT ESCAPED FORMS are ACCEPTED: each key loads and its value carries the escaped control character',
      () => {
        const forms = [[ESC.BS, CH.BS, 'U+0008'], [ESC.TAB, CH.TAB, 'U+0009'], [ESC.LF, CH.LF, 'U+000A'],
          [ESC.FF, CH.FF, 'U+000C'], [ESC.CR, CH.CR, 'U+000D']];
        const seen = []; let ok = true;
        for (const [esc, ctrl, name] of forms) {
          const b = boot(`{"a":"x${esc}y","b":7}`);
          if (!b.r.ok) { ok = false; seen.push(`${name}: THREW ${describe(b.r.v)}`); continue; }
          const a = keyOf(b.store, 'a');
          const good = a.ok && a.v === `x${ctrl}y`;
          if (!good) ok = false;
          seen.push(`${name}: ${good ? 'ADMITTED' : `NOT ADMITTED (${a.ok ? JSON.stringify(a.v) : describe(a.v)})`}`);
        }
        return C(ok, seen.join('; '));
      });
  });

// =============================================================== JAS-02 =====
scenario('JAS-02', 'class 2, the grammar violation: eleven number spellings the JSON grammar does not admit are refused',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, one per named spelling, booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register; settle on the register the caller sees.',
  () => {
    const C2 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (2) (the grammar-violation arm); A143 (1)';
    const SPELLINGS = [
      ['01', 'JAS-02.1'], ['+1', 'JAS-02.2'], ['.5', 'JAS-02.3'], ['1.', 'JAS-02.4'],
      ['1e', 'JAS-02.5'], ['Infinity', 'JAS-02.6'], ['NaN', 'JAS-02.7'], ['0x1', 'JAS-02.8'],
      ['1_0', 'JAS-02.9'], ['--1', 'JAS-02.10'], ['1.2.3', 'JAS-02.11'],
    ];
    for (const [spelling, id] of SPELLINGS) {
      cell(id, C2,
        `the number spelling \`${spelling}\` is REFUSED: the WHOLE file does not load and the register begins EMPTY`,
        () => {
          const b = boot(`{"a":${spelling},"b":7}`);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          return C(reg !== null && same(reg, {}), `spelling=${spelling} register=${show(reg)}`);
        });
    }
    cell('JAS-02.12', C2,
      'CONTROL: a grammar-admitted number spelling loads, so the drive discriminates the refusal',
      () => {
        const b = boot('{"a":1,"b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, { a: 1, b: 7 }), `register=${show(reg)}`);
      });
  });

// =============================================================== JAS-03 =====
scenario('JAS-03', 'class 2, the overflow: a grammar-admitted number whose value does not fit is refused',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, one per named spelling, booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register; settle on the register the caller sees.',
  () => {
    const C3 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (2) (the overflow arm); A143 (1)';
    for (const [spelling, id] of [['1e400', 'JAS-03.1'], ['1e999999999', 'JAS-03.2'], ['1e309', 'JAS-03.3']]) {
      cell(id, C3,
        `the number spelling \`${spelling}\` is REFUSED as out of range: the WHOLE file does not load and the register begins EMPTY`,
        () => {
          const b = boot(`{"a":${spelling},"b":7}`);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          return C(reg !== null && same(reg, {}), `spelling=${spelling} register=${show(reg)}`);
        });
    }
    cell('JAS-03.4', C3,
      'CONTROL: a grammar-admitted spelling whose value DOES fit loads, so the drive discriminates the overflow refusal',
      () => {
        const b = boot('{"a":1e308,"b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        return C(reg !== null && same(reg, { a: 1e308, b: 7 }) && a.ok && a.v === 1e308,
          `register=${show(reg)} read(a)=${a.ok ? String(a.v) : describe(a.v)}`);
      });
  });

// =============================================================== JAS-04 =====
scenario('JAS-04', 'class 2, the underflow half: a number whose value underflows is ACCEPTED and becomes 0',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, one per named spelling, booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register and the key; settle on the value the caller sees.',
  () => {
    const C4 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (2) (the underflow arm); A143 (1)';
    for (const [spelling, id] of [['1e-400', 'JAS-04.1'], ['1e-324', 'JAS-04.2']]) {
      cell(id, C4,
        `the number spelling \`${spelling}\` is ACCEPTED and its value BECOMES 0: the key loads and reads back 0`,
        () => {
          const b = boot(`{"a":${spelling},"b":7}`);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          const a = keyOf(b.store, 'a');
          const bb = keyOf(b.store, 'b');
          return C(reg !== null && same(reg, { a: 0, b: 7 }) && a.ok && a.v === 0 && bb.ok && bb.v === 7,
            `spelling=${spelling} register=${show(reg)} read(a)=${a.ok ? String(a.v) : describe(a.v)} read(b)=${bb.ok ? String(bb.v) : describe(bb.v)}`);
        });
    }
    cell('JAS-04.3', C4,
      'CONTROL: a small-but-fitting exponent is ACCEPTED and is NOT zeroed, so the drive discriminates the underflow from a blanket zeroing',
      () => {
        const b = boot('{"a":1e-300,"b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        return C(reg !== null && same(reg, { a: 1e-300, b: 7 }) && a.ok && a.v === 1e-300,
          `register=${show(reg)} read(a)=${a.ok ? String(a.v) : describe(a.v)}`);
      });
  });

// =============================================================== JAS-05 =====
scenario('JAS-05', 'class 3: exactly four token separators are admitted and a Unicode whitespace separator is refused',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, one per separator, booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register; settle on the register the caller sees.',
  () => {
    const C5 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (3) ("A UNICODE WHITESPACE CHARACTER AS A TOKEN SEPARATOR IS REFUSED — EXACTLY FOUR SEPARATORS ARE ADMITTED (space, tab, LF, CR), AND U+00A0 IS NOT ONE OF THEM"); A143 (1)';
    const seps = [[' ', 'space', 'JAS-05.1'], [CH.TAB, 'tab', 'JAS-05.2'], [CH.LF, 'LF', 'JAS-05.3'], [CH.CR, 'CR', 'JAS-05.4']];
    for (const [sep, name, id] of seps) {
      cell(id, C5,
        `the ${name} is an ADMITTED token separator: the file loads and both keys are carried`,
        () => {
          const b = boot(`{"a":1,${sep}"b":2}`);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          return C(reg !== null && same(reg, { a: 1, b: 2 }), `separator=${name} register=${show(reg)}`);
        });
    }
    cell('JAS-05.5', C5,
      'U+00A0 as a token separator is REFUSED: the WHOLE file does not load and the register begins EMPTY',
      () => {
        const b = boot(`{"a":1,${CH.NBSP}"b":2}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, {}), `separator=U+00A0 register=${show(reg)}`);
      });
    cell('JAS-05.6', C5,
      "CONTROL: U+00A0 INSIDE a string is not a token separator and is admitted (the acceptance set is the JSON grammar's), so the drive discriminates the separator role from the character",
      () => {
        const b = boot(`{"a":"x${CH.NBSP}y","b":2}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        return C(reg !== null && same(reg, { a: `x${CH.NBSP}y`, b: 2 }),
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)}`);
      });
  });

// =============================================================== JAS-06 =====
scenario('JAS-06', 'the widening class: the loader accepts an escaped surrogate pair',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, carrying the escaped pair, booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the key; settle on the value the caller sees.',
  () => {
    cell('JAS-06.1', 'seams-and-lifecycle.md §7.2 item 7 (f) ("AND ONE WIDENING CLASS STANDS BESIDE THE FOUR: THE LOADER ACCEPTS AN ESCAPED SURROGATE PAIR (\\uD83D\\uDE00), WHICH THE PRE-SWAP CODEC REFUSED OUTRIGHT"); A143 (1)',
      'the escaped surrogate pair \\uD83D\\uDE00 is ACCEPTED: the key loads and its value IS THE PAIR (two code units, 0xD83D and 0xDE00)',
      () => {
        const b = boot(`{"a":"${ESC.PAIR}","b":7}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        const isPair = a.ok && typeof a.v === 'string' && a.v.length === 2
          && a.v.charCodeAt(0) === 0xD83D && a.v.charCodeAt(1) === 0xDE00;
        return C(reg !== null && same(reg, { a: CH.PAIR, b: 7 }) && isPair && bb.ok && bb.v === 7,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)} len=${a.ok && typeof a.v === 'string' ? a.v.length : 'n/a'} read(b)=${bb.ok ? String(bb.v) : describe(bb.v)}`);
      });
  });

// =============================================================== JAS-07 =====
// CLASS 4, THE NESTING DEPTH — RE-DRIVEN 2026-10-25 AGAINST BEHAVIOUR INSTEAD OF A DOCUMENT (`D-17`; the review's
// §3.2 row 33). Two of this file's three documentary reads fed this scenario; with them gone the boundary is
// DERIVED FROM THE ARTIFACT UNDER TEST, which is the only oracle `D-17` leaves a cell: the deepest foreign image
// that LOADS and the shallowest that does not, plus monotonicity on both sides of that boundary.
scenario('JAS-07', 'class 4: the nesting depth — the loader\'s boundary, derived from the run itself',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, carrying N nested containers (the root object counted as the first level), booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register and the key; the probe finds the LAST ADMITTED and the FIRST REFUSED container count and asserts the bracket on both sides.',
  () => {
    const C7 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (4) ("A NESTING DEPTH OF 128 OR MORE IS REFUSED") read as a BEHAVIOURAL boundary, with `docs/decisions.md` · `D-17` (*"Tests are for code"*) for where the expectation comes from';
    // THE PROBE, which IS the oracle: one boot per container count, and the boundary is where the answer turns.
    const probe = (containers) => {
      const b = boot(imageOfContainers(containers));
      if (!b.r.ok) return { containers, loaded: false, threw: describe(b.r.v) };
      const reg = registerOf(b.store);
      const a = keyOf(b.store, 'a');
      return {
        containers,
        loaded: reg !== null && Object.prototype.hasOwnProperty.call(reg, 'a'),
        reg: show(reg),
        depth: a.ok ? depthOf(a.v) : null,
        innermost: a.ok ? innermost(a.v) : null,
      };
    };
    const probes = [];
    for (let n = PROBE_LO; n <= PROBE_HI; n += 1) probes.push(probe(n));
    const firstRefusedProbe = probes.find((p) => !p.loaded) ?? null;
    const admitted = probes.filter((p) => p.loaded);
    const lastAdmitted = admitted.length ? admitted[admitted.length - 1] : null;
    console.log(`  MEASURED over ${PROBE_LO}..${PROBE_HI} containers: ${admitted.length} LOADED, ${probes.length - admitted.length} REFUSED ; last admitted=${lastAdmitted ? lastAdmitted.containers : 'none'} first refused=${firstRefusedProbe ? firstRefusedProbe.containers : 'none'}`);
    observed('JAS-07.x1', C7,
      'MEASURED, NOT ASSERTED: the loader\'s boundary over foreign images of N containers (the root object counted as the first level) — the bracket this run found, and the depth the innermost value carries on each side of it',
      () => ({
        lastAdmitted: lastAdmitted ? lastAdmitted.containers : null,
        firstRefused: firstRefusedProbe ? firstRefusedProbe.containers : null,
        valueDepthAtLastAdmitted: lastAdmitted ? lastAdmitted.depth : null,
        probeBand: [PROBE_LO, PROBE_HI],
      }));

    // JAS-07.1 — THE REFUSED BOUNDARY: the FIRST refused container count the run itself found. No figure is
    // hard-coded and none is parsed out of a document; the cell asserts the BOUNDARY'S EXISTENCE AND ITS REACH,
    // which is what the class declares.
    cell('JAS-07.1', C7,
      'the FIRST container count the run\'s own probe finds REFUSED is refused WHOLE: the file does not load, the register begins EMPTY, the instance is returned, no error reaches the caller, and the refused file is left on disk',
      () => {
        if (firstRefusedProbe === null) return C(false, `no container count in ${PROBE_LO}..${PROBE_HI} was refused: the loader answered LOADED at every probed count, so the class's refusal boundary does not exist inside this probe's bracket`);
        const b = boot(imageOfContainers(firstRefusedProbe.containers));
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const onDisk = bytesOf(b.P);
        return C(reg !== null && same(reg, {}) && !a.ok && onDisk !== null,
          `containers=${firstRefusedProbe.containers} (the first refused by the run's own probe) register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : 'AddressNotFound'} the refused file is left on disk untouched=${onDisk.length} bytes`);
      });

    // JAS-07.2 — THE LAST ADMITTED BOUNDARY: one container fewer, whose value IS the nested array the image
    // carried. Its subject (the admitted side of the same boundary) is unchanged; the figure is the measured one.
    cell('JAS-07.2', C7,
      'the LAST ADMITTED container count the run\'s own probe finds is ACCEPTED: the key loads, the whole register carries it, and its value IS the nested array the image spelled, at that depth and no other',
      () => {
        if (lastAdmitted === null) return C(false, `no container count in ${PROBE_LO}..${PROBE_HI} LOADED, so there is no admitted side to assert`);
        const b = boot(imageOfContainers(lastAdmitted.containers));
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const good = a.ok && Array.isArray(a.v) && depthOf(a.v) === lastAdmitted.containers - 1 && innermost(a.v) === 0;
        return C(reg !== null && Object.prototype.hasOwnProperty.call(reg, 'a') && good,
          `containers=${lastAdmitted.containers} (the last admitted by the run's own probe) register members=${reg ? Object.keys(reg).join(',') : 'n/a'} read(a) is an array=${a.ok ? Array.isArray(a.v) : 'n/a'} its depth=${a.ok ? depthOf(a.v) : 'n/a'} its innermost=${a.ok ? JSON.stringify(innermost(a.v)) : 'n/a'}`);
      });
  });

// =============================================================== JAS-08 =====
scenario('JAS-08', 'the answer for a file the loader refuses, arm (a): the whole file does not load, the register begins empty, the instance is returned',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, carrying a raw control character the loader refuses.",
  "write the bytes at the path; boot the store over them; read the whole register and the keys; settle on the construction's answer and the register the caller sees.",
  () => {
    const C8 = 'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (a)); A143 (2); §7.2 item 6 (the boot; DD-29)';
    const REFUSED = `{"a":"x${CH.LF}y","b":7}`;

    cell('JAS-08.1', C8,
      'over a file the loader REFUSES, `storeCreate` still RETURNS AN INSTANCE and NO ERROR REACHES THE CALLER',
      () => {
        const b = boot(REFUSED);
        return C(b.r.ok && b.store !== null,
          `construction=${b.r.ok ? 'INSTANCE' : `THREW ${describe(b.r.v)}`}`);
      });
    cell('JAS-08.2', C8,
      'over a file the loader REFUSES, the register begins EMPTY',
      () => {
        const b = boot(REFUSED);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        return C(reg !== null && same(reg, {}) && !a.ok,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : `threw ${describe(a.v)}`}`);
      });
    cell('JAS-08.3', C8,
      'over a file the loader REFUSES, THE WHOLE FILE DOES NOT LOAD: the sibling well-formed key is gone too',
      () => {
        const b = boot(REFUSED);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const bb = keyOf(b.store, 'b');
        return C(reg !== null && same(reg, {}) && !bb.ok,
          `register=${show(reg)} read(b)=${bb.ok ? JSON.stringify(bb.v) : `threw ${describe(bb.v)}`}`);
      });
    cell('JAS-08.4', 'seams-and-lifecycle.md §7.2 item 7 (f) ("A PARSEABLE FILE WITH ONE NON-ADMITTED MEMBER LOSES THAT MEMBER, AND A FILE THE LOADER REFUSES LOSES EVERYTHING"); §7.2 item 6 (DD-29); A143 (2)',
      'CONTROL: a PARSEABLE file with ONE non-admitted member loses THAT MEMBER only — the rest of the content loads, the instance IS returned, and NO code is produced for the dropped key',
      () => {
        const b = boot('{"a":null,"b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        return C(reg !== null && same(reg, { b: 7 }) && !a.ok && bb.ok && bb.v === 7,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : `threw ${describe(a.v)}`} read(b)=${bb.ok ? String(bb.v) : describe(bb.v)}`);
      });
  });

// =============================================================== JAS-09 =====
scenario('JAS-09', 'the answer for a file the loader refuses, arm (b): a supplied constraint list answers ConstraintListInvalid and no instance is returned',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, carrying a raw control character the loader refuses, booted with a SUPPLIED CONSTRAINT LIST.",
  "write the bytes at the path; boot the store over them with `cfg.constraints`; settle on the construction's answer (an instance, or the thrown status).",
  () => {
    const C9 = 'seams-and-lifecycle.md §7.2 item 7 (f) (arm (b)); A143 (2); contract.md §8.1 #16 (`ConstraintListInvalid`); surface.md §2.1 (the `cfg` block — the FOURTH declared key `constraints`); parameter-semantics.md §2.21 (PAR-JS-21)';
    const REFUSED = `{"a":"x${CH.LF}y","b":7}`;

    cell('JAS-09.1', C9,
      'over a file the loader REFUSES, with a supplied constraint list that NAMES AT LEAST ONE ADDRESS, the construction answers `ConstraintListInvalid` and NO INSTANCE IS RETURNED',
      () => {
        const b = boot(REFUSED, { constraints: [{ address: ['x'], id: 'c1' }] });
        if (b.r.ok) return C(false, `the construction returned an INSTANCE (register=${show(registerOf(b.store))}) where the clause answers ConstraintListInvalid`);
        const st = b.r.v && b.r.v.status;
        return C(st === 'ConstraintListInvalid', `thrown=${describe(b.r.v)}`);
      });
    cell('JAS-09.2', C9,
      'CONTROL: over the SAME refused file with an EMPTY constraint list the instance IS RETURNED (an empty list has nothing to fail, so the answer stays in arm (a))',
      () => {
        const b = boot(REFUSED, { constraints: [] });
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, {}), `construction=INSTANCE register=${show(reg)}`);
      });
    cell('JAS-09.3', `${C9}; contract.md §7.2 item 1 ("THE LOADED STATE 'SATISFIES' THE SUPPLIED LIST IFF EVERY SUPPLIED PAIR'S OWN 'address' RESOLVES IN THE LOADED STATE")`,
      "CONTROL: the SAME supplied list over a PARSEABLE image that DOES carry the named address yields an INSTANCE — so the pair is a well-formed entry and the refusal at JAS-09.1 is the LOAD-SIDE validation over the empty register, not a refusal of the list's own shape",
      () => {
        // ⟶ 2026-10-25 (`D-26`): the element is THREE-member and its function is REQUIRED. The as-filed drive
        // handed over a functionless element, which `B-1` refuses BEFORE ANY FILESYSTEM ACT — so the refusal it
        // read was the package's list check and not the load-side answer this cell's control is about. **The
        // control's subject is kept whole**: the same supplied list over a parseable image that DOES carry the
        // named address yields an INSTANCE.
        const b = boot('{"x":1}', { constraints: [{ address: ['x'], id: 'c1', constraint: () => true }] });
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, { x: 1 }), `construction=INSTANCE register=${show(reg)}`);
      });
  });

// =============================================================== JAS-10 =====
scenario('JAS-10', "the store's own image round trips: what the store writes, the loader reads back",
  "A VALUE WRITTEN THROUGH THE PUBLIC API at the `file` tier (the kernel's own commit route — the terminal arm's act), committed to a REAL path on a REAL disk.",
  "write the value; let the commit land; read the file's BYTES on disk; boot a FRESH store over the same path; read the register and the key; settle on the bytes and the value the caller sees.",
  () => {
    const C10 = 'contract.md §5.2 `P-IM-1` (the write→read round trip is EXACT) + its 2026-10-22 clause (a); A144 (2) (the quantifier); A141 (1) (the escape image)';

    const roundTrip = (value) => {
      const d = tmp();
      const P = path.join(d, 'store.json');
      const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      K.register(s, ['a'], 'c1', () => true);
      const rec = K.commit(s, ['a'], 'file', value);
      const rep = K.runAttempt(s, rec);
      const image = bytesOf(P);
      const fresh = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
      const reg = registerOf(fresh);
      const a = keyOf(fresh, 'a');
      return { rep, image, reg, a, P };
    };
    const rtCell = (id, clause, observable, value, expect) => {
      cell(id, clause, observable, () => {
        const r = roundTrip(value);
        let parsed = null;
        try { parsed = JSON.parse(r.image.toString('utf8')); } catch (e) { parsed = null; }
        return C(r.rep && r.rep.outcome === 'passed' && r.a.ok && same(r.a.v, expect)
          && r.reg !== null && same(r.reg, { a: expect })
          && parsed !== null && same(parsed.a, expect),
          `outcome=${r.rep ? r.rep.outcome : 'n/a'} bytes on disk=${imgStr(r.image)} fresh register=${show(r.reg)} read(a)=${r.a.ok ? JSON.stringify(r.a.v) : describe(r.a.v)}`);
      });
    };

    rtCell('JAS-10.1', C10, 'a string written at the `file` tier reads back EXACTLY after a fresh boot', 'hello', 'hello');
    rtCell('JAS-10.2', C10, 'a number written at the `file` tier reads back EXACTLY after a fresh boot', 42, 42);
    rtCell('JAS-10.3', C10, 'a boolean written at the `file` tier reads back EXACTLY after a fresh boot', true, true);
    rtCell('JAS-10.4', C10, 'a plain object written at the `file` tier reads back EXACTLY after a fresh boot', { x: 1, y: 'two' }, { x: 1, y: 'two' });
    rtCell('JAS-10.5', C10, 'a plain array written at the `file` tier reads back EXACTLY after a fresh boot', [1, 2, 3], [1, 2, 3]);
    rtCell('JAS-10.6', `${C10}; A141 (1) (the escape image)`,
      'a string carrying a CONTROL CHARACTER reads back EXACTLY after a fresh boot: the image escapes it and the loader admits the ESCAPED form',
      `a${CH.NUL}b`, `a${CH.NUL}b`);
    rtCell('JAS-10.7', `${C10}; A140 (5) ("The binding's conversion core normalizes -0.0 to 0.0 in BOTH directions"); contract.md §5.2 P-IM-1 (b)`,
      'a negative zero written at the `file` tier reads back 0 (the ONE declared normalization; the JS boundary carries no negative zero at all)',
      -0, 0);
  });

// =============================================================== JAS-11 =====
scenario('JAS-11', "the commit's own verification: the refusal of an image the loader would refuse — OUT OF THIS LAYER'S REACH",
  "A VALUE WRITTEN THROUGH THE PUBLIC API at the `file` tier, at the depths the package's own walk guards (the write route is the only route by which this layer produces an image at all).",
  "write the value at the `file` tier; read the caller's answer; read the file's bytes on disk; settle on the answer the caller receives.",
  () => {
    const C11 = 'seams-and-lifecycle.md §7.2 item 2 (parts (1) and (2): the commit re-decodes the image it is about to rename over the path and refuses with `FileCommitFailed` when it does not load); A144 (1) and (4); crossing.md §1.4 item 5';
    const nest = (k) => { let v = [0]; for (let n = 1; n < k; n += 1) v = [v]; return v; };
    const d = tmp(); const P = path.join(d, 'store.json');
    const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
    const w64 = tryCall(() => s.write(['d64'], 'file', nest(64)));
    const w65 = tryCall(() => s.write(['d65'], 'file', nest(65)));
    const w127 = tryCall(() => s.write(['d127'], 'file', nest(127)));
    const bytes = bytesOf(P);
    const statusOf = (r) => (r.ok ? 'NO THROW' : (r.v && r.v.status));
    observed('JAS-11.x1', 'crossing.md §1.4 item 5 (the PACKAGE\'s own walk ceiling: "the walk refuses a value whose nesting depth exceeds 64 ... with `ValueNotAdmitted`")',
      "WHAT THE LAYER CAN DO: the answers the caller receives for a `file`-tier write at depths 64, 65 and 127, and the bytes on disk after them",
      () => ({
        depth64: statusOf(w64), depth65: statusOf(w65), depth127: statusOf(w127),
        bytesOnDisk: bytes === null ? 'NO FILE' : `${bytes.length} bytes`,
      }));

    layerLimit('JAS-11.1', C11,
      "LAYER LIMIT — the commit's own verification fires only for an image the LOADER would refuse, and the loader's ceiling is 128 nested containers (A144 (1)) while the JS package's OWN walk refuses a value of depth 65 before any verb is called (crossing.md §1.4 item 5). The store admits a value of any depth (A143 (1)), so the only route by which the JS surface could hand the store such a value is closed by the package's own walk: the JS layer cannot cause the commit's refusal. A144 (1) says the same in its own words: \"THE JS SURFACE CANNOT REACH IT — THE NATIVE LIBRARY'S OWN API WAS.\" THE DRIVE CONFIRMS THE CLOSING: a `file`-tier write at depth 64 is admitted by the walk, and the writes at depths 65 and 127 are refused by the PACKAGE'S OWN WALK (ValueNotAdmitted) before the commit route is reached, so no image the loader would refuse is ever produced by this layer. THIS CELL IS NOT A PASS AND NOT A FAILURE.");
  });

// =============================================================== JAS-12 =====
// **⟶ RETIRED 2026-10-25 (`D-17` EXECUTED; `D-20`'s execution pass).** `JAS-12` was titled *"the gaps in the
// declaration itself"* and its one cell asked whether `docs/specs/storeroom-native/seams-and-lifecycle.md §7.2`
// item 7 (f) class (4) *"says enough to derive a boundary cell"*. **Its subject is A DOCUMENT, so `D-17` reaches it
// first: a cell whose expectation is produced by opening a document is rewritten to a code fact or retired.** It
// is RETIRED, and the reason it is not rewritten is that its question has been ANSWERED IN CODE instead: `JAS-07`
// now derives the boundary from the artifact with no document read at all, so there is no gap left for a
// documentary cell to report. **The id is not re-used**, and the retirement is printed in the report's own
// `RETIRED` line so it is visible at its own id rather than silently absent.
const RETIRED = [
  'JAS-12.1 :: RETIRED 2026-10-25 (D-17, DISCARD with no replacement) — its subject is the DECLARATION\'s own adequacy (whether a document clause "says enough to derive a boundary cell"), which is a documentary question and not a code fact. Its question is answered in CODE by the re-derived JAS-07, which derives the loader\'s boundary from the artifact under test with no document read at all. Id not re-used.',
];

// ---------------------------------------------------------------- report ---
console.log('\n================ TOTALS ================');
const byVerdict = {};
for (const c of CELLS) byVerdict[c.verdict] = (byVerdict[c.verdict] || 0) + 1;
const order = ['PASS', 'FAIL', 'LAYER-LIMIT', 'OBSERVED', 'GAP', 'AMENDMENT-PENDING', 'NONRUN', 'FINDING'];
const parts = order.filter((v) => byVerdict[v]).map((v) => `${byVerdict[v]} ${v}`);
console.log(`LAYER ${LAYER} · APP LAYER ${APP_LAYER}`);
console.log(`CELLS ${CELLS.length} = ${parts.join(' + ')}`);
console.log(`SUMMARY ${CELLS.length} cells · ${byVerdict.PASS || 0} PASS · ${byVerdict.FAIL || 0} FAIL · ${byVerdict['LAYER-LIMIT'] || 0} LAYER-LIMIT · ${byVerdict.OBSERVED || 0} OBSERVED · ${byVerdict.GAP || 0} GAP · ${byVerdict['AMENDMENT-PENDING'] || 0} AMENDMENT-PENDING · ${byVerdict.NONRUN || 0} NONRUN · ${byVerdict.FINDING || 0} FINDING`);
console.log('RETIRED (D-17 / D-20, executed 2026-10-25 — each kept out of the census and its id not re-used):');
for (const r of RETIRED) console.log(`  ${r}`);
for (const [id, v] of Object.entries(SCENARIO_VERDICT)) console.log(`  ${id} ${v}`);
const failed = CELLS.filter((c) => c.verdict === 'FAIL' || c.verdict === 'FINDING');
if (failed.length) {
  console.log('\n---- FAILED / FINDING CELLS ----');
  for (const c of failed) console.log(`  ${c.id} :: ${c.detail} :: ${c.clause}`);
}
// ⟶ `D-21`'s exit: the red AND the non-executed population.
const unexecuted = CELLS.filter((c) => c.verdict === 'GAP' || c.verdict === 'AMENDMENT-PENDING' || c.verdict === 'NONRUN');
if (unexecuted.length) {
  console.log('\n---- CELLS THAT DID NOT EXECUTE (D-21: neither PASS nor FAIL) ----');
  for (const c of unexecuted) console.log(`  ${c.id} ${c.verdict} :: ${String(c.detail).slice(0, 200)} :: ${c.clause}`);
}
for (const d of dirs) { try { fs.rmSync(d, { recursive: true, force: true }); } catch (e) { /* scratch */ } }
const red = failed.length;
const unrun = unexecuted.length;
console.log(`EXIT ${red > 0 || unrun > 0 ? 1 : 0} (exit 0 iff no cell FAILed, none was a FINDING and NONE DID NOT EXECUTE) :: FAIL=${red} NON-EXECUTED=${unrun} (GAP=${byVerdict.GAP || 0} AMENDMENT-PENDING=${byVerdict['AMENDMENT-PENDING'] || 0} NONRUN=${byVerdict.NONRUN || 0})`);
process.exit(red > 0 || unrun > 0 ? 1 : 0);
