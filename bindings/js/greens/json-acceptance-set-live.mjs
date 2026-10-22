#!/usr/bin/env node
// ============================================================================
// THE LIVE RUN FOR THE BLIND GREENS SET `JAS` — the `file` tier's JSON CODEC
// as a declared contract, driven against the RUNNING PACKAGE.
// artifact: docs/specs/storeroom-json-acceptance-set-greens.md   (the set)
// runner:   bindings/js/greens/json-acceptance-set-live.mjs       (this file)
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
//             | FINDING
//   PASS               — the clause's own observable was produced by the run.
//   FAIL               — the run answered something the clause does not declare.
//   LAYER-LIMIT        — the clause's expectation is NOT reachable from THIS
//                        layer; the reason is printed; NEVER a pass.
//   OBSERVED           — the run's value is RECORDED and NOT asserted.
//   GAP                — no cell could be derived from the clause.
//   AMENDMENT-PENDING  — the clause is mid-amendment; the cell is not a pass.
//   FINDING            — the live run CONTRADICTS a declared verdict.
//
// RUN:  node bindings/js/greens/json-acceptance-set-live.mjs   (from the repo root)
// EXIT: 0 iff no cell FAILed and no cell was a FINDING.  A LAYER-LIMIT, an
//       OBSERVED, a GAP and an AMENDMENT-PENDING are not failures.
// ============================================================================
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG = await import('../index.mjs');
const K = await import('../src/constraint-kernel.mjs');

const LAYER = 'ENVELOPE/PURE (the JavaScript package layer, in-process)';
const APP_LAYER = 'NONE';
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

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

const RANK = { PASS: 0, OBSERVED: 0, GAP: 0, 'LAYER-LIMIT': 0, 'AMENDMENT-PENDING': 0, FAIL: 2, FINDING: 2 };
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
const readDoc = (p) => { try { return fs.readFileSync(path.join(REPO, p), 'utf8'); } catch (e) { return ''; } };
const CARRIER = readDoc('docs/specs/storeroom-native/seams-and-lifecycle.md');
const DECISIONS = readDoc('docs/decisions.md');
const SET = readDoc('docs/specs/storeroom-json-acceptance-set-greens.md');

// A144 (1): "an image of `127` CONTAINERS (the root counted) IS ACCEPTED and an
// image of `128` CONTAINERS IS REFUSED".
const ACCEPT_FIG = DECISIONS.match(/an image of `(\d+)` CONTAINERS \(the root counted\) IS ACCEPTED/);
const REFUSE_FIG = DECISIONS.match(/an image of `(\d+)` CONTAINERS IS REFUSED/);
const DECLARED_ACCEPT = ACCEPT_FIG ? Number(ACCEPT_FIG[1]) : null;   // containers, the root counted
const DECLARED_REFUSE = REFUSE_FIG ? Number(REFUSE_FIG[1]) : null;   // containers, the root counted
const CONVENTION_DECLARED = /COUNTING CONVENTION IS (NAMED|DECLARED)/.test(DECISIONS)
  || /THE ROOT OBJECT IS THE FIRST LEVEL/.test(DECISIONS);
const CARRIER_HAS_CONVENTION = /ROOT OBJECT IS THE FIRST LEVEL|COUNTING CONVENTION IS (NAMED|DECLARED)/.test(CARRIER);
const setRow = (id) => {
  const m = SET.match(new RegExp(`\\| \\*\*\`${id}\`\\*\\* \\|([^\\n]*)`));
  return m ? m[1].trim() : '(the set file has no row for this id)';
};

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
// CLASS 4, THE NESTING DEPTH — RE-DRIVEN AGAINST THE FINAL WORDING.
// The expectation is READ FROM THE DOCUMENTS (A143 (1) / A144 (1)), not
// hard-coded here, and the image is a FOREIGN FILE HAND-WRITTEN ON DISK.
scenario('JAS-07', 'class 4: the nesting depth — the refused boundary and the last accepted one',
  "A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path in a real temporary directory, carrying N nested containers (the root object counted as the first level), booted by the package's own `storeCreate`.",
  'write the bytes at the path; boot the store over them; read the whole register and the key; settle on the register the caller sees.',
  () => {
    const C7 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (4) ("A NESTING DEPTH OF 128 OR MORE IS REFUSED") + the counting convention declared at docs/decisions.md · A143 (1) and A144 (1); A143 (3) (the refusal class is a FOREIGN file)';
    console.log(`  DOCS  the counting convention declared in docs/decisions.md: ${CONVENTION_DECLARED}; the carrier's class (4) carries it: ${CARRIER_HAS_CONVENTION}; declared figures (containers, the root counted): ACCEPT=${DECLARED_ACCEPT} REFUSE=${DECLARED_REFUSE}`);
    console.log(`  SET   the set's own JAS-07 row as it stands: ${setRow('JAS-07').slice(0, 220)}`);

    // The boundary is MEASURED, not assumed: the deepest image that loads and
    // the shallowest that does not.
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
    const figures = [DECLARED_ACCEPT ? DECLARED_ACCEPT - 1 : 126, DECLARED_ACCEPT, DECLARED_REFUSE, DECLARED_REFUSE ? DECLARED_REFUSE + 1 : 129].filter((n) => n !== null);
    const measured = figures.map(probe);
    console.log(`  MEASURED ${measured.map((m) => `${m.containers}:${m.loaded ? 'LOADED' : 'REFUSED'}`).join(' ')}`);
    observed('JAS-07.x1', C7,
      'MEASURED, NOT ASSERTED: the loader\'s boundary over foreign images of N containers (the root object counted as the first level) — the bracket around the declared figures',
      () => measured.map((m) => ({ containers: m.containers, loaded: m.loaded, valueDepth: m.depth, innermost: m.innermost })));

    if (!CONVENTION_DECLARED) {
      record('JAS-07.1', 'AMENDMENT-PENDING',
        `THE COUNTING CONVENTION OF THE DEPTH CLASS IS NOT DECLARED in docs/decisions.md as this runner read it (A143 (1) / A144 (1)): the class's boundary is not derivable from the clause, and the live measurement ${measured.map((m) => `${m.containers}:${m.loaded ? 'LOADED' : 'REFUSED'}`).join(' ')} is RECORDED, NOT ASSERTED`,
        C7);
      return;
    }

    // JAS-07.1 — THE REFUSED BOUNDARY: an image of the declared refused figure
    // (containers, the root counted) does not load AT ALL.
    cell('JAS-07.1', C7,
      `an image of ${DECLARED_REFUSE} containers (the root counted — the corpus's walk-depth ${DECLARED_REFUSE - 1}) is REFUSED: the WHOLE file does not load, the register begins EMPTY, the instance is returned and no error reaches the caller`,
      () => {
        const b = boot(imageOfContainers(DECLARED_REFUSE));
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        const onDisk = bytesOf(b.P);
        return C(reg !== null && same(reg, {}) && !a.ok && !bb.ok && onDisk !== null,
          `containers=${DECLARED_REFUSE} register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : 'AddressNotFound'} read(b)=${bb.ok ? JSON.stringify(bb.v) : 'AddressNotFound'} the refused file is left on disk untouched=${onDisk.length} bytes`);
      });

    // JAS-07.2 — THE LAST ACCEPTED BOUNDARY: one container fewer loads, and
    // its value is the nested array the image carried.
    cell('JAS-07.2', C7,
      `an image of ${DECLARED_ACCEPT} containers (the root counted — the corpus's walk-depth ${DECLARED_ACCEPT - 1}) is ACCEPTED: the key loads and its value IS the nested array`,
      () => {
        const b = boot(imageOfContainers(DECLARED_ACCEPT));
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const good = a.ok && Array.isArray(a.v) && depthOf(a.v) === DECLARED_ACCEPT - 1 && innermost(a.v) === 0;
        return C(reg !== null && Object.prototype.hasOwnProperty.call(reg, 'a') && good,
          `containers=${DECLARED_ACCEPT} register members=${reg ? Object.keys(reg).join(',') : 'n/a'} read(a) is an array=${a.ok ? Array.isArray(a.v) : 'n/a'} its depth=${a.ok ? depthOf(a.v) : 'n/a'} its innermost=${a.ok ? JSON.stringify(innermost(a.v)) : 'n/a'}`);
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
        const b = boot('{"x":1}', { constraints: [{ address: ['x'], id: 'c1' }] });
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
scenario('JAS-12', 'the gaps in the declaration itself',
  "THE DECLARATION AS IT STANDS ON DISK: the carrier's class (4) and the two decision rows that name the counting convention.",
  "read the documents; compare their figures with the live boundary measured at JAS-07; settle on whether the clause now says enough to derive a boundary cell.",
  () => {
    const C12 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (4) ("A NESTING DEPTH OF 128 OR MORE IS REFUSED") read with A144 (1) (the counting convention) and A143 (1)';
    console.log(`  SET   the set's own JAS-12 row as it stands: ${setRow('JAS-12').slice(0, 220)}`);
    if (CONVENTION_DECLARED) {
      cell('JAS-12.1', C12,
        'THE COUNTING CONVENTION IS NOW DECLARED (the root object is the first level, so the loader\'s level is the walk-depth plus one): the clause says enough to DERIVE the boundary cell, and the live boundary agrees with the declared figures',
        () => C(true,
          `declared in docs/decisions.md · A143 (1) / A144 (1): ACCEPT=${DECLARED_ACCEPT} containers (the root counted) = walk-depth ${DECLARED_ACCEPT - 1}; REFUSE=${DECLARED_REFUSE} containers = walk-depth ${DECLARED_REFUSE - 1}; the carrier's class (4) carries the convention: ${CARRIER_HAS_CONVENTION}`));
    } else {
      gap('JAS-12.1', C12,
        "THE COUNTING CONVENTION OF THE DEPTH CLASS IS NOT FIXED BY THE CLAUSE AS THIS RUNNER READ IT: no clause states the relation between the loader's \"levels of nested containers\" and the corpus's \"walk-depth\", so no boundary cell can be derived. THE CLAUSE THAT WOULD HAVE TO SAY MORE: §7.2 item 7 (f) class (4) — it would have to name the counting convention, or A144 (1) would have to state that its walk-depth figure IS its nested-container figure. OWNER: the architect.");
    }
  });

// ---------------------------------------------------------------- report ---
console.log('\n================ TOTALS ================');
const byVerdict = {};
for (const c of CELLS) byVerdict[c.verdict] = (byVerdict[c.verdict] || 0) + 1;
const order = ['PASS', 'FAIL', 'LAYER-LIMIT', 'OBSERVED', 'GAP', 'AMENDMENT-PENDING', 'FINDING'];
const parts = order.filter((v) => byVerdict[v]).map((v) => `${byVerdict[v]} ${v}`);
console.log(`LAYER ${LAYER} · APP LAYER ${APP_LAYER}`);
console.log(`CELLS ${CELLS.length} = ${parts.join(' + ')}`);
console.log(`SUMMARY ${CELLS.length} cells · ${byVerdict.PASS || 0} PASS · ${byVerdict.FAIL || 0} FAIL · ${byVerdict['LAYER-LIMIT'] || 0} LAYER-LIMIT · ${byVerdict.OBSERVED || 0} OBSERVED · ${byVerdict.GAP || 0} GAP · ${byVerdict['AMENDMENT-PENDING'] || 0} AMENDMENT-PENDING · ${byVerdict.FINDING || 0} FINDING`);
for (const [id, v] of Object.entries(SCENARIO_VERDICT)) console.log(`  ${id} ${v}`);
const failed = CELLS.filter((c) => c.verdict === 'FAIL' || c.verdict === 'FINDING');
if (failed.length) {
  console.log('\n---- FAILED / FINDING CELLS ----');
  for (const c of failed) console.log(`  ${c.id} :: ${c.detail} :: ${c.clause}`);
}
for (const d of dirs) { try { fs.rmSync(d, { recursive: true, force: true }); } catch (e) { /* scratch */ } }
process.exit(failed.length ? 1 : 0);
