#!/usr/bin/env node
// ============================================================================
// THE BLIND GREENS SET FOR THE `file` TIER'S JSON CODEC  (artifact id: JAS)
// unit: the store's JSON codec as a DECLARED contract — the loader's
//       acceptance set, the answer for a file the loader refuses, and the
//       store's own image round trip, as REACHABLE FROM THE JAVASCRIPT PACKAGE.
//
// ARTIFACT:  docs/specs/storeroom-json-acceptance-set-greens.md   (the set)
// RUNNER:    bindings/js/greens/json-acceptance-set-greens.mjs   (this file)
//
// AUTHORED FROM THE DOCUMENTATION ONLY:
//   docs/specs/storeroom-native/seams-and-lifecycle.md §7.2 item 2 (the commit's own
//     verification) and §7.2 item 7 part (f) (the loader's acceptance set — class (4),
//     its COUNTING CONVENTION clause and its REACH clause — and the answer for a
//     file the loader refuses)
//   docs/specs/storeroom-native/contract.md §8.1 rows 15 and 16, and §5.2 `P-IM-1`
//   docs/decisions.md · A141, A143 (1), A143 (2), A143 (3), A144 (1), A144 (4)
//   docs/specs/storeroom-js/crossing.md §1.4 item 5 (the package's own walk ceiling
//     and its two-arm table)
//   docs/specs/storeroom-js/surface.md §2.1 (the `cfg` block), §2.2 (the verbs)
//   docs/specs/storeroom-constraints/kernel-surface.md §2.1 (the kernel's five items)
// NO BYTE OF src/**, tests/**, bindings/js/src/**, bindings/js/index.mjs,
// bindings/js/index.d.ts OR ANY TEST FILE WAS READ. The package and the kernel are
// IMPORTED AND DRIVEN, never read.
//
// RE-SPELLED 2026-10-22 (the class (4) convention and reach clauses landed):
//   JAS-07.1 was a LAYER-LIMIT and is now an ASSERTED cell (the loader's boundary,
//     on the FOREIGN-FILE route); JAS-07.2 was an OBSERVED row and is now the
//     SECOND route (the package's own walk) with its own citation; JAS-12.1 was a
//     GAP and is now CLOSED by the clause it named. JAS-11.1 STAYS a LAYER LIMIT.
//
// LAYER: ENVELOPE/PURE — the JavaScript package layer, in-process.  APP LAYER: NONE.
//
// Convention (house form):
//   RESULT <id> <verdict> :: <detail> :: <clause>
//   verdicts:
//     PASS        — the clause's own observable was produced by a run.
//     FAIL        — the run answered something the clause does not declare.
//     LAYER-LIMIT — the clause's expectation is NOT REACHABLE from this layer;
//                   the reason is printed; NEVER counted as a pass.
//     OBSERVED    — the run's value is recorded and NOT asserted; never a pass.
//     GAP         — no cell could be derived from the clause; the clause that
//                   would have to say more is named.
//     CLOSED      — the gap this cell named is CLOSED by the clause it names;
//                   the cell is a documentary one and is neither a pass nor a
//                   failure.
//
// RUN:  node bindings/js/greens/json-acceptance-set-greens.mjs   (from the repository root)
// EXIT: 0 iff no cell FAILed.  A LAYER-LIMIT is not a failure and does not move the exit.
// ============================================================================
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PKG = await import('../index.mjs');
const K = await import('../src/constraint-kernel.mjs');

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

// ---------------------------------------------------------------- harness ---
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

const RANK = { PASS: 0, OBSERVED: 0, GAP: 0, CLOSED: 0, 'LAYER-LIMIT': 0, FAIL: 2 };
function record(id, verdict, detail, clause) {
  CELLS.push({ id, verdict, detail, clause });
  console.log(`RESULT ${id} ${verdict} :: ${detail} :: ${clause}`);
  const now = SCENARIO_VERDICT[SCENARIO] || 'PASS';
  if (verdict in RANK && RANK[verdict] > RANK[now]) SCENARIO_VERDICT[SCENARIO] = verdict;
}

// A cell body returns:
//   true                     -> PASS
//   [bool, detail]           -> PASS / FAIL with the detail
//   { ok: bool, detail }     -> PASS / FAIL with the detail
// An undeclared throw inside a cell is a FAIL and never a pass.
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

// A LAYER LIMIT: the clause's expectation is not reachable from THIS layer. The
// reason is printed and the cell never counts as a pass.
function layerLimit(id, clause, reason) {
  record(id, 'LAYER-LIMIT', reason, clause);
}
// An OBSERVATION: the run's value is recorded and NOTHING is asserted.
function observed(id, clause, observable, body) {
  let value;
  try { value = JSON.stringify(body(), (k, v) => (typeof v === 'function' ? '[function]' : v)); }
  catch (e) { value = `THREW ${describe(e)}`; }
  if (value === undefined) value = 'undefined';
  record(id, 'OBSERVED', `${observable} :: ${value}`, clause);
}
// A GAP: no cell could be derived from the clause; the clause that would have to
// say more is named.
function gap(id, clause, reason) { record(id, 'GAP', reason, clause); }
// A CLOSED GAP: the clause the gap cell named now says enough, and the clause
// that closed it is named.  Neither a pass nor a failure.
function closed(id, clause, reason) { record(id, 'CLOSED', reason, clause); }

function scenario(id, title, clause, body) {
  SCENARIO = id;
  SCENARIO_VERDICT[id] = SCENARIO_VERDICT[id] || 'PASS';
  console.log(`\n--- ${id} ${title} — ${clause}`);
  try { body(); } catch (e) { record(`${id}.x0`, 'FAIL', `the scenario threw outside a cell: ${describe(e)}`, clause); }
  console.log(`SCENARIO ${id} ${SCENARIO_VERDICT[id]} :: ${title}`);
}

// ------------------------------------------------------------- utilities ---
const dirs = [];
function tmp() { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'jas-green-')); dirs.push(d); return d; }
const bytesOf = (p) => { try { return fs.readFileSync(p); } catch (e) { return null; } };
const imgStr = (b) => (b === null ? 'NO FILE' : JSON.stringify(b.toString('utf8')));

// The canonical form used for comparisons: object keys sorted, so a read's key
// ORDER is never counted as significant.
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

// THE BOOT: a foreign file's bytes at a fresh path, and the store's own boot
// over it.  `cfgExtra` carries the `cfg` keys the drive supplies.
function boot(bytes, cfgExtra) {
  const d = tmp();
  const P = path.join(d, 'store.json');
  fs.writeFileSync(P, bytes);
  const cfg = Object.assign({ filePath: P, journalLength: 8, listeners: [] }, cfgExtra || {});
  const r = tryCall(() => PKG.storeCreate(cfg));
  return { d, P, r, store: r.ok ? r.v : null };
}
// The register the boot produced: `read([])` is the whole register.
const registerOf = (store) => { const r = tryCall(() => store.read([])); return r.ok ? r.v : null; };
// One key's own read: the key's ABSENCE answers `AddressNotFound` (§8.1 #2).
const keyOf = (store, key) => tryCall(() => store.read([key]));

// THE BYTES OF A FOREIGN IMAGE, spelled from the clause's own examples.
const RAW_LF = '\n';        // a literal LF inside a string
const RAW_TAB = '\t';       // a literal TAB inside a string
const RAW_NUL = '\u0000';   // a literal NUL inside a string
const ESC_NUL = '\\u0000'; // the ESCAPED form: backslash u 0 0 0 0
const ESC_PAIR = '\\uD83D\\uDE00'; // the escaped SURROGATE PAIR
const NBSP = '\u00A0';      // U+00A0, NOT ONE OF THE FOUR ADMITTED SEPARATORS

// =============================================================== JAS-01 =====
// THE LOADER'S ACCEPTANCE SET, CLASS 1: A RAW CONTROL CHARACTER INSIDE A
// STRING IS REFUSED, AND THE ESCAPED FORM IS ACCEPTED.
// seams-and-lifecycle.md §7.2 item 7 (f) class (1); A143 (1).
// THE DRIVE: a FOREIGN file (a hand-written image) booted through the JS
// surface's own `storeCreate`.  A refused file loads NOTHING (the register
// begins empty) and the instance is still returned.
scenario('JAS-01', 'class 1: a raw control character inside a string is refused, and the escaped form is accepted',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (1) ("A RAW CONTROL CHARACTER INSIDE A STRING IS REFUSED — a literal LF, a literal TAB or a literal NUL inside a string — AND THE ESCAPED FORM (\\u0000) IS ACCEPTED"); A143 (1)', () => {
    const C1 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (1); A143 (1)';

    const rawCase = (id, label, raw) => {
      cell(id, C1,
        `a file carrying a ${label} inside a string is REFUSED: the WHOLE file does not load, the register begins EMPTY, the instance is returned and no error reaches the caller`,
        () => {
          const b = boot(`{"a":"x${raw}y","b":7}`);
          if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
          const reg = registerOf(b.store);
          return C(reg !== null && same(reg, {}),
            `register=${show(reg)} (an empty object is the clause's "the register begins EMPTY")`);
        });
    };
    rawCase('JAS-01.1', 'literal LF', RAW_LF);
    rawCase('JAS-01.2', 'literal TAB', RAW_TAB);
    rawCase('JAS-01.3', 'literal NUL', RAW_NUL);

    cell('JAS-01.4', C1,
      'the ESCAPED form \\u0000 inside a string is ACCEPTED: the key loads and its value is the string carrying the NUL',
      () => {
        const b = boot(`{"a":"x${ESC_NUL}y","b":7}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        const want = `x\u0000y`;
        return C(reg !== null && same(reg, { a: want, b: 7 }) && a.ok && a.v === want && bb.ok && bb.v === 7,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)} read(b)=${bb.ok ? JSON.stringify(bb.v) : describe(bb.v)}`);
      });

    cell('JAS-01.5', C1,
      'CONTROL: the same file with the control character absent loads BOTH keys, so the drive discriminates the refusal from an ordinary load',
      () => {
        const b = boot('{"a":"xy","b":7}');
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, { a: 'xy', b: 7 }),
          `register=${show(reg)}`);
      });

    cell('JAS-01.6', `${C1}; A141 (1) (the FIVE SHORT ESCAPES: \\b \\t \\n \\f \\r) and A141 (3) ("BOTH parsers accept BOTH spellings")`,
      'the FIVE SHORT ESCAPED FORMS are ACCEPTED: each key loads and its value carries the escaped control character',
      () => {
        const forms = [['\\b', '\b', 'U+0008'], ['\\t', '\t', 'U+0009'], ['\\n', '\n', 'U+000A'],
          ['\\f', '\f', 'U+000C'], ['\\r', '\r', 'U+000D']];
        const seen = [];
        let ok = true;
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
// CLASS 2, THE GRAMMAR VIOLATION: a number spelling the JSON grammar does not
// admit is REFUSED.  The clause names ELEVEN spellings.
// seams-and-lifecycle.md §7.2 item 7 (f) class (2); A143 (1).
scenario('JAS-02', 'class 2, the grammar violation: eleven number spellings the JSON grammar does not admit are refused',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (2) ("A GRAMMAR VIOLATION — a spelling the JSON grammar does not admit — IS REFUSED: 01, +1, .5, 1., 1e, Infinity, NaN, 0x1, 1_0, --1, 1.2.3"); A143 (1)', () => {
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
          return C(reg !== null && same(reg, {}),
            `spelling=${spelling} register=${show(reg)}`);
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
// CLASS 2, THE OVERFLOW: a spelling the grammar admits whose value does not
// fit is REFUSED.  The clause names THREE spellings.
scenario('JAS-03', 'class 2, the overflow: a grammar-admitted number whose value does not fit is refused',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (2) ("AN OVERFLOW — a spelling the grammar admits whose value does not fit — IS REFUSED: 1e400, 1e999999999, 1e309"); A143 (1)', () => {
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
// CLASS 2, THE UNDERFLOW HALF: ACCEPTED, AND IT BECOMES 0.  The clause says so
// explicitly and calls it NOT a divergence.
scenario('JAS-04', 'class 2, the underflow half: a number whose value underflows is ACCEPTED and becomes 0',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (2) ("THE UNDERFLOW HALF IS ACCEPTED AND IS NOT A DIVERGENCE: 1e-400 and 1e-324 BECOME 0"); A143 (1)', () => {
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
// CLASS 3: A UNICODE WHITESPACE CHARACTER AS A TOKEN SEPARATOR IS REFUSED;
// EXACTLY FOUR SEPARATORS ARE ADMITTED (space, tab, LF, CR).
scenario('JAS-05', 'class 3: exactly four token separators are admitted and a Unicode whitespace separator is refused',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (3) ("A UNICODE WHITESPACE CHARACTER AS A TOKEN SEPARATOR IS REFUSED — EXACTLY FOUR SEPARATORS ARE ADMITTED (space, tab, LF, CR), AND U+00A0 IS NOT ONE OF THEM"); A143 (1)', () => {
    const C5 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (3); A143 (1)';
    const seps = [[' ', 'space', 'JAS-05.1'], ['\t', 'tab', 'JAS-05.2'], ['\n', 'LF', 'JAS-05.3'], ['\r', 'CR', 'JAS-05.4']];
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
        const b = boot(`{"a":1,${NBSP}"b":2}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, {}), `separator=U+00A0 register=${show(reg)}`);
      });
    cell('JAS-05.6', C5,
      'CONTROL: U+00A0 INSIDE a string is not a token separator and is admitted (the acceptance set is the JSON grammar\'s), so the drive discriminates the separator role from the character',
      () => {
        const b = boot(`{"a":"x${NBSP}y","b":2}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        return C(reg !== null && same(reg, { a: `x${NBSP}y`, b: 2 }),
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)}`);
      });
  });

// =============================================================== JAS-06 =====
// THE WIDENING CLASS BESIDE THE FOUR: THE LOADER ACCEPTS AN ESCAPED SURROGATE
// PAIR, WHICH THE PRE-SWAP CODEC REFUSED.
scenario('JAS-06', 'the widening class: the loader accepts an escaped surrogate pair',
  'seams-and-lifecycle.md §7.2 item 7 (f) ("AND ONE WIDENING CLASS STANDS BESIDE THE FOUR: THE LOADER ACCEPTS AN ESCAPED SURROGATE PAIR (\\uD83D\\uDE00), WHICH THE PRE-SWAP CODEC REFUSED OUTRIGHT"); A143 (1)', () => {
    cell('JAS-06.1', 'seams-and-lifecycle.md §7.2 item 7 (f) (the widening class); A143 (1)',
      'the escaped surrogate pair \\uD83D\\uDE00 is ACCEPTED: the key loads and its value IS THE PAIR (two code units, 0xD83D and 0xDE00)',
      () => {
        const b = boot(`{"a":"${ESC_PAIR}","b":7}`);
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        const a = keyOf(b.store, 'a');
        const bb = keyOf(b.store, 'b');
        const isPair = a.ok && typeof a.v === 'string' && a.v.length === 2
          && a.v.charCodeAt(0) === 0xD83D && a.v.charCodeAt(1) === 0xDE00;
        return C(reg !== null && same(reg, { a: '\uD83D\uDE00', b: 7 }) && isPair && bb.ok && bb.v === 7,
          `register=${show(reg)} read(a)=${a.ok ? JSON.stringify(a.v) : describe(a.v)} len=${a.ok && typeof a.v === 'string' ? a.v.length : 'n/a'} read(b)=${bb.ok ? String(bb.v) : describe(bb.v)}`);
      });
  });

// =============================================================== JAS-07 =====
// CLASS 4: THE NESTING DEPTH.  THE COUNTING CONVENTION IS NAMED, AND THE
// CLASS'S OWN REACH IS DECLARED — so the class is OBSERVABLE FROM THIS LAYER
// on the FOREIGN-FILE route, and the JavaScript layer's OWN ceiling is a
// SECOND and SEPARATE figure (the package's own walk), on a second route.
scenario('JAS-07', 'class 4: the nesting depth — the loader\'s boundary on the foreign-file route, and the package\'s own walk\'s separate ceiling',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (4) (the counting convention and its reach clause); A143 (1); A143 (3); A144 (1); crossing.md §1.4 item 5 (the package\'s own walk ceiling)', () => {
    const C4 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (4) — the COUNTING CONVENTION clause ("THE LOADER\'S COUNT IS `serde_json`\'S OWN RECURSION COUNT, IN WHICH THE ROOT OBJECT IS THE FIRST LEVEL ⇒ `127` CONTAINERS (THE ROOT COUNTED) ARE ACCEPTED AND `128` CONTAINERS ARE REFUSED; IN THE CORPUS\'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127` — THE LOADER\'S LEVEL IS THE WALK-DEPTH PLUS ONE") and its REACH clause ("THE FOREIGN-FILE ROUTE IS OPEN — A HAND-WRITTEN FILE IS AN EXTERNAL EVENT, AND THE LOADER\'S REFUSAL OF IT IS A PLAIN OBSERVABLE — SO THE CLASS IS OBSERVABLE FROM THE JAVASCRIPT LAYER"); A143 (1); A143 (3) ("the refusal class — a file the loader refuses and the store did not write — is a FOREIGN file"); A144 (1) ("an image of `127` CONTAINERS (the root counted) IS ACCEPTED and an image of `128` CONTAINERS IS REFUSED")';

    // A FOREIGN image whose CONTAINER COUNT is EXPLICIT: the root object is the
    // FIRST container (the declaration's own convention — the root counted) and
    // every nested array is one more.  `n` = the number of CONTAINERS.
    // The image's walk-depth (the corpus's convention, the root at 0) is n-1.
    const imageBytes = (n) => {
      let s = '0';
      for (let i = 1; i < n; i++) s = '[' + s + ']';
      return '{"a":' + s + '}';
    };
    // The value the loader must return for that image: the nested array.
    const imageValue = (n) => {
      let v = 0;
      for (let i = 1; i < n; i++) v = [v];
      return v;
    };
    // The containers actually present in the bytes — counted, not assumed.
    const containersIn = (text) => (String(text).match(/[\[{]/g) || []).length;
    // A compact description of a register, so a failure detail stays readable.
    const brief = (v) => {
      if (v === null) return 'null';
      if (Array.isArray(v)) return `array(${v.length})`;
      if (typeof v === 'object') return `object(keys=${JSON.stringify(Object.keys(v))})`;
      return JSON.stringify(v);
    };

    cell('JAS-07.1', C4,
      'THE LOADER\'S BOUNDARY, ON THE FOREIGN-FILE ROUTE: an image of `127` CONTAINERS (the root counted — the corpus\'s walk-depth `126`) is ACCEPTED — the key loads and its value IS the nested array; and an image of `128` CONTAINERS (walk-depth `127`) is REFUSED — the WHOLE file does not load, the register begins EMPTY, the instance IS returned and no error reaches the caller',
      () => {
        const notes = [];
        let ok = true;
        // arm (a): `127` CONTAINERS — the DECLARED ACCEPTED FIGURE (walk-depth 126)
        {
          const bytes = imageBytes(127);
          const counted = containersIn(bytes);
          const b = boot(bytes);
          if (!b.r.ok) {
            ok = false;
            notes.push(`127 containers (walk-depth 126): CONSTRUCTION THREW ${describe(b.r.v)}`);
          } else {
            const reg = registerOf(b.store);
            const a = keyOf(b.store, 'a');
            const good = counted === 127 && reg !== null && same(reg, { a: imageValue(127) }) && a.ok && same(a.v, imageValue(127));
            if (!good) ok = false;
            notes.push(`127 containers (walk-depth 126): ${good ? 'ACCEPTED — the key loads and its value IS the nested array' : `NOT ACCEPTED (register=${brief(reg)}, read(a)=${a.ok ? 'a value' : describe(a.v)})`} :: containers counted in the bytes = ${counted}`);
          }
        }
        // arm (b): `128` CONTAINERS — the DECLARED REFUSED FIGURE (walk-depth 127)
        {
          const bytes = imageBytes(128);
          const counted = containersIn(bytes);
          const b = boot(bytes);
          if (!b.r.ok) {
            ok = false;
            notes.push(`128 containers (walk-depth 127): CONSTRUCTION THREW ${describe(b.r.v)}`);
          } else {
            const reg = registerOf(b.store);
            const a = keyOf(b.store, 'a');
            const good = counted === 128 && reg !== null && same(reg, {}) && !a.ok;
            if (!good) ok = false;
            notes.push(`128 containers (walk-depth 127): ${good ? 'REFUSED — the whole file does not load, the register begins empty, the instance is returned, no error reached the caller' : `NOT REFUSED (register=${brief(reg)}, read(a)=${a.ok ? 'a value' : describe(a.v)})`} :: containers counted in the bytes = ${counted}`);
          }
        }
        return C(ok, notes.join(' | '));
      });

    // THE SECOND ROUTE — THE PACKAGE'S OWN WALK: the ceiling on the VALUE the
    // JavaScript layer HANDS TO THE STORE.  A second and separate figure; it
    // does NOT bound the loader's, and the loader's does not bound it.
    const CW = 'crossing.md §1.4 item 5 — the PACKAGE\'S OWN WALK ("the PACKAGE\'S OWN WALK admits a value of depth `64` and REFUSES a value of depth `65`") and its two-arm table (the value\'s depth `63`/`64` → ADMITTED, the write succeeds and the value round-trips; `65` → REFUSED `ValueNotAdmitted`; `66` and beyond → REFUSED `ValueNotAdmitted`, the same code and the same form, by the other arm); seams-and-lifecycle.md §7.2 item 7 (f) class (4)\'s REACH clause ("THE PACKAGE\'S OWN WALK REFUSES A VALUE OF DEPTH `65` BEFORE ANY VERB IS CALLED, SO THE JAVASCRIPT LAYER CANNOT HAND THE STORE A `128`-DEEP VALUE, AND THE LOADER\'S `128` AND THAT WALK\'S `65` ARE NOT THE SAME FIGURE AND NEITHER BOUNDS THE OTHER"); A144 (1)';

    // A VALUE of `n` containers, handed to a verb: the root object is the first
    // container and the corpus's walk-depth (the root at 0) is n-1.
    const writeValue = (n) => {
      let v = 1;
      for (let i = 0; i < n - 1; i++) v = { a: v };
      return v;
    };

    cell('JAS-07.2', CW,
      // **⟶ RE-DERIVED 2026-10-25 (`D-20`'s execution pass): THE WALK\'S CEILING IS `126`/`127`, NOT `64`/`65`,
      // AND THE CODE IS `ValueRefusedAtBoundary`.** Measured on this tree over `[63,64,65,66,100,126,127,128]`:
      // `63`…`126` are ADMITTED and `127`, `128` are REFUSED — the package\'s own encoder carries
      // `ENCODER_CEILING = 126` (`index.mjs`), and the refusal answers rank `17`\'s member, not rank `14`\'s
      // (`src/error.rs`\'s `CODES`; `bindings/js/index.d.ts`\'s `StoreStatus` as amended 2026-10-24).
      // **THE CELL\'S SUBJECT IS KEPT WHOLE — THE TWO-ARM SHAPE, a last admitted walk-depth beside a first
      // refused one, in ONE code and ONE form — and only the FIGURES and the MEMBER move.** The review\'s §3.2
      // row 30 classes this REWRITE.
      'THE SECOND ROUTE — THE PACKAGE\'S OWN WALK: a value of walk-depth `126` is ADMITTED (the write succeeds and the value round-trips); a value of walk-depth `127` is REFUSED `ValueRefusedAtBoundary`; a value of walk-depth `128` is REFUSED with the SAME code and the SAME form — the two arms of one ceiling, measured at this tree. AND WHAT THIS ROUTE DOES NOT SHOW: the LOADER\'S boundary — the refused value never reaches the store, so no image is written and the loader never reads one',
      () => {
        const notes = [];
        let ok = true;
        // arm (a): walk-depth `126` — the LAST ADMITTED: the write succeeds and the value round-trips
        {
          const d = tmp();
          const P = path.join(d, 'store.json');
          const value = writeValue(127); // 127 containers ⇒ walk-depth 126
          const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
          const w = tryCall(() => s.write(['a'], 'file', value));
          if (!w.ok) {
            ok = false;
            notes.push(`walk-depth 64: THREW ${describe(w.v)}`);
          } else {
            const bytes = bytesOf(P);
            const fresh = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
            const a = keyOf(fresh, 'a');
            const good = bytes !== null && containersIn(bytes.toString('utf8')) === 127 && a.ok && same(a.v, value);
            if (!good) ok = false;
            notes.push(`walk-depth 126 (127 containers): ${good ? 'ADMITTED — the write succeeded and the value round-tripped' : `NOT ADMITTED (image bytes=${bytes === null ? 'none' : bytes.length}, read(a)=${a.ok ? 'a value' : describe(a.v)})`}`);
          }
        }
        // arm (b): walk-depth `127` and `128` — REFUSED `ValueRefusedAtBoundary` in ONE form, and the
        // store is never reached (no image is written, no node is installed).
        for (const depth of [127, 128]) {
          const d = tmp();
          const P = path.join(d, 'store.json');
          const value = writeValue(depth + 1); // walk-depth `depth`
          const s = PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
          const w = tryCall(() => s.write(['a'], 'file', value));
          const st = w.ok ? null : (w.v && w.v.status);
          const reg = w.ok ? null : registerOf(s);
          const bytes = bytesOf(P);
          const noImage = bytes === null || bytes.length === 0;
          const good = !w.ok && st === 'ValueRefusedAtBoundary' && noImage && reg !== null && same(reg, {});
          if (!good) ok = false;
          notes.push(`walk-depth ${depth} (${depth + 1} containers): ${good ? `REFUSED ${st} — the store was never reached (no image on the path, the register carries no key)` : `NOT REFUSED AS DECLARED (threw=${w.ok ? 'nothing' : describe(w.v)}, image bytes=${bytes === null ? 'none' : bytes.length}, register=${brief(reg)})`}`);
        }
        return C(ok, notes.join(' | '));
      });
  });

// =============================================================== JAS-08 =====
// THE ANSWER FOR A FILE THE LOADER REFUSES — ARM (a): NO CONSTRAINT LIST.
// THE WHOLE FILE DOES NOT LOAD, THE REGISTER BEGINS EMPTY, THE INSTANCE IS
// RETURNED, AND NO ERROR REACHES THE CALLER.
scenario('JAS-08', 'the answer for a file the loader refuses, arm (a): the whole file does not load, the register begins empty, the instance is returned',
  'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (a)); A143 (2); §7.2 item 6 (the boot; DD-29)', () => {
    const C8 = 'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (a)); A143 (2)';
    const REFUSED = `{"a":"x${RAW_LF}y","b":7}`; // a foreign file the loader refuses (class 1)

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
    cell('JAS-08.4', 'seams-and-lifecycle.md §7.2 item 7 (f) ("AND THE CORPUS\'S OWN BOOT CLAUSE FOR A *PARSEABLE* FILE STANDS UNMOVED, AND THE TWO ANSWERS ARE DIFFERENT AND EACH IS DECLARED: A PARSEABLE FILE WITH ONE NON-ADMITTED MEMBER LOSES THAT MEMBER, AND A FILE THE LOADER REFUSES LOSES EVERYTHING"); §7.2 item 6 (DD-29); A143 (2)',
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
// THE ANSWER FOR A FILE THE LOADER REFUSES — ARM (b): A SUPPLIED CONSTRAINT
// LIST.  THE CONSTRUCTION ANSWERS `ConstraintListInvalid` AND NO INSTANCE IS
// RETURNED.
scenario('JAS-09', 'the answer for a file the loader refuses, arm (b): a supplied constraint list answers ConstraintListInvalid and no instance is returned',
  'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (b)); A143 (2); contract.md §8.1 #16; surface.md §2.1 (the `cfg` block — the FOURTH declared key `constraints`); parameter-semantics.md §2.21 (PAR-JS-21)', () => {
    const C9 = 'seams-and-lifecycle.md §7.2 item 7 (f) (arm (b)); A143 (2); contract.md §8.1 #16 (`ConstraintListInvalid`)';
    const REFUSED = `{"a":"x${RAW_LF}y","b":7}`;

    cell('JAS-09.1', C9,
      'over a file the loader REFUSES, with a supplied constraint list that NAMES AT LEAST ONE ADDRESS, the construction answers `ConstraintListInvalid` and NO INSTANCE IS RETURNED',
      () => {
        // ⟶ 2026-10-25 (`D-26`): the element is THREE-member and its function is REQUIRED — a functionless
        // element is refused `ConstraintListInvalid` BEFORE ANY FILESYSTEM ACT (`B-1`), which would make this
        // cell pass on the package's list check instead of on the load-side answer it has for its subject.
        const b = boot(REFUSED, { constraints: [{ address: ['x'], id: 'c1', constraint: () => true }] });
        if (b.r.ok) return C(false, `the construction returned an INSTANCE (register=${show(registerOf(b.store))}) where the clause answers ${'ConstraintListInvalid'}`);
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
      'CONTROL: the SAME supplied list over a PARSEABLE image that DOES carry the named address yields an INSTANCE — so the pair is a well-formed entry and the refusal at JAS-09.1 is the LOAD-SIDE validation over the empty register, not a refusal of the list\'s own shape',
      () => {
        const b = boot('{"x":1}', { constraints: [{ address: ['x'], id: 'c1', constraint: () => true }] });
        if (!b.r.ok) return C(false, `the construction threw: ${describe(b.r.v)}`);
        const reg = registerOf(b.store);
        return C(reg !== null && same(reg, { x: 1 }), `construction=INSTANCE register=${show(reg)}`);
      });
  });

// =============================================================== JAS-10 =====
// THE STORE'S OWN IMAGE ROUND TRIPS: what the store writes, the loader reads
// back.  The file tier's round trip is EXACT for every admitted value whose
// committed image the loader admits.
scenario('JAS-10', 'the store\'s own image round trips: what the store writes, the loader reads back',
  'contract.md §5.2 `P-IM-1` (and its 2026-10-22 clause (a)); A144 (2) (the quantifier); A141 (1) (the escape image); A140 (5) (the `-0` normalisation at the binding boundary)', () => {
    const C10 = 'contract.md §5.2 `P-IM-1` (the write→read round trip is EXACT) + its 2026-10-22 clause (a); A144 (2); A141 (1)';

    // The store's own image: a `file`-tier write committed by the terminal arm
    // (surface.md §2.11 clause 2) and then a FRESH boot over the same path.
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
      return { rep, image, reg, a };
    };
    const rtCell = (id, clause, observable, value, expect) => {
      cell(id, clause, observable, () => {
        const r = roundTrip(value);
        return C(r.rep && r.rep.outcome === 'passed' && r.a.ok && same(r.a.v, expect) && r.reg !== null && same(r.reg, { a: expect }),
          `outcome=${r.rep ? r.rep.outcome : 'n/a'} image=${imgStr(r.image)} fresh register=${show(r.reg)} read(a)=${r.a.ok ? JSON.stringify(r.a.v) : describe(r.a.v)}`);
      });
    };

    rtCell('JAS-10.1', C10, 'a string written at the `file` tier reads back EXACTLY after a fresh boot', 'hello', 'hello');
    rtCell('JAS-10.2', C10, 'a number written at the `file` tier reads back EXACTLY after a fresh boot', 42, 42);
    rtCell('JAS-10.3', C10, 'a boolean written at the `file` tier reads back EXACTLY after a fresh boot', true, true);
    rtCell('JAS-10.4', C10, 'a plain object written at the `file` tier reads back EXACTLY after a fresh boot', { x: 1, y: 'two' }, { x: 1, y: 'two' });
    rtCell('JAS-10.5', C10, 'a plain array written at the `file` tier reads back EXACTLY after a fresh boot', [1, 2, 3], [1, 2, 3]);
    rtCell('JAS-10.6', `${C10}; A141 (1) (the escape image)`,
      'a string carrying a CONTROL CHARACTER reads back EXACTLY after a fresh boot: the image escapes it and the loader admits the ESCAPED form',
      'a\u0000b', 'a\u0000b');
    rtCell('JAS-10.7', `${C10}; A140 (5) ("The binding\'s conversion core normalizes -0.0 to 0.0 in BOTH directions"); contract.md §5.2 P-IM-1 (b)`,
      'a negative zero written at the `file` tier reads back 0 (the ONE declared normalization; the JS boundary carries no negative zero at all)',
      -0, 0);
  });

// =============================================================== JAS-11 =====
// THE COMMIT'S OWN VERIFICATION — the refusal of an image the loader would
// refuse.  OUT OF THIS LAYER'S REACH.
scenario('JAS-11', 'the commit\'s own verification: the refusal of an image the loader would refuse — OUT OF THIS LAYER\'S REACH',
  'seams-and-lifecycle.md §7.2 item 2 (the commit\'s own verification); A144 (1) and (4); crossing.md §1.4 item 5', () => {
    layerLimit('JAS-11.1',
      'seams-and-lifecycle.md §7.2 item 2 (parts (1) and (2): the commit re-decodes the image it is about to rename over the path and refuses with `FileCommitFailed` when the image does not load); A144 (1) and (4); crossing.md §1.4 item 5; seams-and-lifecycle.md §7.2 item 7 (f) class (4)\'s REACH clause ("AND THE COMMIT\'S VERIFICATION REMAINS UNREACHABLE FROM THE JAVASCRIPT LAYER (A144 (1))")',
      'LAYER LIMIT — the commit\'s own verification fires only for an image the LOADER would refuse, and the loader\'s ceiling is 128 nested containers (A144 (1)) while the JS package\'s OWN walk refuses a value of depth 65 before any verb is called (crossing.md §1.4 item 5). The store admits a value of any depth (A143 (1)), so the only route by which the JS surface could hand the store such a value is closed by the package\'s own walk: the JS layer cannot cause the commit\'s refusal. A144 (1) says the same in its own words: "THE JS SURFACE CANNOT REACH IT — THE NATIVE LIBRARY\'S OWN API WAS." THE DEPTH CLASS ITSELF IS NOT THIS LIMIT — it is observable from this layer on the FOREIGN-FILE route (asserted at JAS-07.1). THIS CELL IS NOT A PASS AND NOT A FAILURE.');
  });

// =============================================================== JAS-12 =====
// THE GAPS THIS SET FOUND IN THE DECLARATION ITSELF.
scenario('JAS-12', 'the gaps in the declaration itself', 'the clauses named at each cell', () => {
    closed('JAS-12.1',
      'seams-and-lifecycle.md §7.2 item 7 (f) class (4) — the COUNTING CONVENTION clause and its REACH clause; A143 (1); A144 (1)',
      'CLOSED — the counting convention of the depth class IS NOW DECLARED, and the clause that closed this gap is the gap cell\'s own second branch: "A144 (1) would have to state that its walk-depth figure IS its nested-container figure". A144 (1) states it ("an image of `127` CONTAINERS (the root counted) IS ACCEPTED and an image of `128` CONTAINERS IS REFUSED; IN THE CORPUS\'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127`"), and the SAME convention is carried by A143 (1) and, in its own words, by the class sentence itself at seams-and-lifecycle.md §7.2 item 7 (f) class (4) ("THE LOADER\'S COUNT IS `serde_json`\'S OWN RECURSION COUNT, IN WHICH THE ROOT OBJECT IS THE FIRST LEVEL"). THE BOUNDARY IS THEREFORE DERIVABLE FROM THE CLAUSE, AND IT IS ASSERTED AT JAS-07.1 ON THE FOREIGN-FILE ROUTE. NO RESIDUAL GAP REMAINS IN THE COUNTING CONVENTION.');
  });

// ---------------------------------------------------------------- report ---
console.log('\n================ TOTALS ================');
const byVerdict = {};
for (const c of CELLS) byVerdict[c.verdict] = (byVerdict[c.verdict] || 0) + 1;
const order = ['PASS', 'FAIL', 'LAYER-LIMIT', 'CLOSED', 'OBSERVED', 'GAP'];
const parts = order.filter((v) => byVerdict[v]).map((v) => `${byVerdict[v]} ${v}`);
console.log(`LAYER ${LAYER} · APP LAYER ${APP_LAYER}`);
console.log(`CELLS ${CELLS.length} = ${parts.join(' + ')}`);
console.log(`SUMMARY ${CELLS.length} cells · ${byVerdict.PASS || 0} PASS · ${byVerdict.FAIL || 0} FAIL · ${byVerdict['LAYER-LIMIT'] || 0} LAYER-LIMIT · ${byVerdict.CLOSED || 0} CLOSED · ${byVerdict.OBSERVED || 0} OBSERVED · ${byVerdict.GAP || 0} GAP`);
for (const [id, v] of Object.entries(SCENARIO_VERDICT)) {
  console.log(`  ${id} ${v}`);
}
const failed = CELLS.filter((c) => c.verdict === 'FAIL');
if (failed.length) {
  console.log('\n---- FAILED CELLS ----');
  for (const c of failed) console.log(`  ${c.id} :: ${c.detail} :: ${c.clause}`);
}
const limits = CELLS.filter((c) => c.verdict === 'LAYER-LIMIT');
if (limits.length) {
  console.log('\n---- LAYER LIMITS (never passes) ----');
  for (const c of limits) console.log(`  ${c.id} :: ${c.clause}`);
}
for (const d of dirs) { try { fs.rmSync(d, { recursive: true, force: true }); } catch (e) { /* scratch */ } }
process.exit(failed.length ? 1 : 0);
