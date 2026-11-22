#!/usr/bin/env node

// **⟶ AND TWO PARTS THE CELLS BELOW CITE ARE **NOT ON THIS TREE**, 2026-11-17 — DECLARED HERE RATHER THAN REPOINTED
// (`D-85` item 2's class; the architect's *"an archived part is CITED and never rewritten"*, `contract.md:700`).**
// `seams-and-lifecycle.md` and `crossing.md` are cited by **36 cells in this file and its sibling** (`§7.2 item 7 (f)`
// and `§1.4 item 5`), and **`git ls-files` carries neither**: they are archived parts, so **no byte of the citations
// moves here** and **no pass may re-point them without knowing where the law now stands.** **WHAT THE CELLS ASSERT IS
// THEREFORE MEASURED AND NOT QUOTED**: the walk's ceiling is **127 ADMITTED / 128 REFUSED, answering
// `ValueRefusedAtBoundary`** (measured on this tree; the archived `§1.4 item 5` prints *"exceeds 64 … `ValueNotAdmitted`"*,
// which is the SUPERSEDED reading), and the loader's container ceiling is **128**. **A reader who needs the law's current
// home must find it: these files can say what the tree DOES and cannot say what the spec now SAYS.**

// ============================================================================
// THE BLIND GREENS SET FOR THE `file` TIER'S JSON CODEC  (artifact id: JAS)
// unit: the store's JSON codec as a DECLARED contract — the loader's
//       acceptance set, the answer for a file the loader refuses, and the
//       store's own image round trip, as REACHABLE FROM THE JAVASCRIPT PACKAGE.
//
// ARTIFACT:  docs/specs/storeroom-json-acceptance-set-greens.md   (the set)
// RUNNER:    tests/e2e/json-acceptance-set-greens.mjs   (this file)   ⟶ MOVED 2026-10-25 (`D-5`), FROM `bindings/js/greens/json-acceptance-set-greens.mjs`.
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
// RUN:  node tests/e2e/json-acceptance-set-greens.mjs   (from the repository root)   ⟶ MOVED 2026-10-25 (`D-5`): this command read `node bindings/js/greens/json-acceptance-set-greens.mjs` until the batteries were stratified.
// EXIT: 0 iff no cell FAILed.  A LAYER-LIMIT is not a failure and does not move the exit.
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **⟶ RE-DERIVED 2026-11-22 (`D-126` ITEM 2) — AND THIS RUNNER'S PROVENANCE IS WEAKER THAN A BLIND ONE'S, SAID
// FIRST, BEFORE IT SAYS WHAT IT MEASURES.** Twenty-four cells of this set were authored over the answer the corpus
// then gave a file the loader refuses, and that answer is superseded by **`strata/decisions.md` · `D-126` item `2`**
// (2026-11-06), the architect verbatim: ***"Mint/revive a code: a corrupt image refuses the construction"*** — the
// member pinned at rank `22` **`FileImageRefused`** (`docs/L1/creation-sweep.md §3` `PIN-11`;
// `docs/specs/storeroom-native/contract.md §8.1`'s row `22`), minted by the store itself at its construction's
// step `7` (`src/store.rs`'s `read_file_image`, the third class `FileImage::Refused`). **A runner rewritten by the
// pass whose ruling broke it is WEAKER EVIDENCE THAN A FRESH ONE: what follows is evidence that THIS TREE is
// consistent with `D-126` item `2`, never that a blind author could have predicted it** (the `E2E-C-9`/`D-163`
// provenance discipline; `tests/e2e/blind-constraints-v2.mjs`'s own head, read with `D-163` item `1`).
//
// **THE RULING THAT WAS SUPERSEDED, NAMED SO NO LATER PASS CHASES IT.** **`D-118` item `1`** read *"a present image
// the store's own loader cannot read is TREATED AS NO IMAGE AT ALL, and the regeneration falls back to the creation
// state … exactly as where no `filePath`, no file, or a zero-length file stands"* — **so a construction over a
// corrupt file RETURNED AN INSTANCE WITH AN EMPTY REGISTER, and `D-118` item `1`'s own EQUALITY (the corrupt window
// equals the zero-length window) is the reading every cell below stood on.** `D-126` item `2` **WITHDRAWS THE
// EQUALITY**: the two classes now answer DIFFERENTLY — a `NoImage` path (an absent file, a zero-length file) still
// constructs an instance with `0` register keys and crosses NO code, while a present, NON-EMPTY image the loader
// REFUSES refuses the construction and **no instance exists** (`contract.md §7.2`'s three-class clause of
// 2026-11-06; `§8.1` row `22`; `§10.4` part `5`'s clause read at the corrupt arm; `DD-38`). **The refusal carries
// the surface's one form** — `status`, the store's own generated `message`, `log: []` and `address: null`
// (`docs/specs/storeroom-js/surface.md §2.5` items `4` and `4-bis`, and the arm table at `:1373`/`:1377`) — **and
// the corrupt bytes STAND, UN-WRITTEN-TO AND UN-REPAIRED**, because the refusal precedes every save (`D-126`
// residual `2` answered the bytes stand; `PIN-12`'s spirit; `contract.md §8.1` row `22`).
//
// **WHAT MOVED, CELL BY CELL, AND WHICH OF THREE THINGS EACH CELL IS NOW.** Every cell keeps its id, **no cell is
// retired and no id is re-used**, so the census is UNMOVED at `50` and the exit rule is unmoved (`0` iff no cell
// FAILed, a LAYER-LIMIT never moving it):
//   (1) **ITS SUBJECT IS THE PARSER'S STRICTNESS — `JAS-01.1`–`01.3`, `JAS-02.1`–`02.11`, `JAS-03.1`–`03.3`,
//       `JAS-05.5`, and `JAS-07.1`'s refused arm.** The strictness is STILL OBSERVABLE, and it is observable AS THE
//       REFUSAL: the construction answers `FileImageRefused` for a file the loader will not read. **A refusal loads
//       NOTHING, so the "sibling key" limb is no longer a key absent from an empty register — there is NO REGISTER:
//       nothing was built, and that is STRONGER than what these cells used to assert.**
//   (2) **ITS SUBJECT WAS THE `D-118` EQUALITY ITSELF — `JAS-08.1`, `JAS-08.2`, `JAS-08.3`, and `JAS-09.1`/`09.2`'s
//       refused-class limbs.** Re-cut to the DIFFERENCE the pair now marks, because this runner has cells that can
//       carry it: `JAS-08.1` is the refused half (the refusal's whole shape), `JAS-08.2` is the SEPARATION
//       (absent and zero-length construct, the corrupt image refuses), `JAS-08.3` is the whole-file limb read at
//       the only route a refused file leaves open, and `JAS-09.1`'s list-walk measurement is moved to the class the
//       ruling LEAVES CONSTRUCTING.
//   (3) **ITS SUBJECT IS A CONTROL THAT NEEDS A NON-CORRUPT FILE — `JAS-09.2`.** Given a file the loader reads (the
//       zero-length path, whose register the control needs), so the control goes on controlling.
// **NO CELL IS WEAKENED AND NONE PASSES VACUOUSLY**: each re-cut cell asserts the refusal's own members and the
// store's own sentence, so a tree that answered an instance, a different member, a non-empty log or a named
// address FAILs at the byte where it used to pass. **THE CELLS THIS PASS COULD NOT RE-DERIVE HONESTLY: NONE.**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PKG = await import('../../bindings/js/index.mjs');
const K = await import('../../bindings/js/src/constraint-kernel.mjs');

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

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE ONE ANSWER A REFUSED FILE LEAVES OPEN** (`D-126` item `2`; `§8.1` row `22`): the construction is REFUSED
// at the store's own rank `22` `FileImageRefused` and NO INSTANCE EXISTS. The refusal is read at EVERY member the
// surface declares — `status`, the store's own generated `message` (the `filePath` quoted), `log: []` and
// `address: null` (`docs/specs/storeroom-js/surface.md §2.5` items `4`/`4-bis` and `:1373`/`:1377`; `contract.md
// §9`'s `FileImageRefused` rule) — so a tree that answered an instance, another member, a non-empty log or a named
// address FAILs here rather than slipping past. **`own` is asserted as well**: the form's one spelling is
// `status,message,log,address`, in that order (`surface.md §2.5` item `9`), so a fourth-member drift is a red too.
const REFUSAL_SENTENCE = (p) => `'${p}' is not an image this store reads, the file at this path must hold this store's image or be empty`;
function refusedShape(b) {
  if (b.r.ok) {
    return {
      ok: false,
      detail: `construction=INSTANCE register=${show(registerOf(b.store))} where \`D-126\` item 2 REFUSES it (\`FileImageRefused\`)`,
    };
  }
  const e = b.r.v || {};
  const sentence = REFUSAL_SENTENCE(b.P);
  const own = Object.keys(e).join(',');
  const ok = e.status === 'FileImageRefused'
    && e.address === null
    && Array.isArray(e.log) && e.log.length === 0
    && e.message === sentence
    && own === 'status,message,log,address';
  return {
    ok,
    detail: `construction=REFUSED status=${JSON.stringify(e.status)} address=${JSON.stringify(e.address)} `
      + `log=${show(e.log)} own=${own} message=${JSON.stringify(e.message)} verbatim=${e.message === sentence}`,
  };
}
// A cell whose subject is the refusal itself: the file's bytes at a fresh path, the boot, and the refusal's shape.
// **AND WHAT A REFUSAL LOADS, SAID ONCE BECAUSE EVERY RE-CUT CELL BELOW DEPENDS ON IT:** **NOTHING** — no instance,
// no register and no key — so a cell that also names a well-formed sibling says at its own byte that there is no
// register for that sibling to be absent from (`D-126` item `2`; `contract.md §7.2`'s three-class clause).
function refusedCell(id, clause, observable, bytes) {
  cell(id, clause, observable, () => refusedShape(boot(bytes)));
}

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
// surface's own `storeCreate`.  **⟶ AND A REFUSED FILE NOW LOADS NOTHING AT ALL: the construction is REFUSED at
// rank `22` `FileImageRefused` and no instance exists** (`D-126` item 2). The clause's as-filed reading — *"a
// refusal loads NOTHING (the register begins empty) and the instance is still returned"* — is `D-118` item 1's and
// is WITHDRAWN for this class; what it said in a weaker form ("nothing loads") stands, and what it added ("an
// instance with an empty register") does not.
scenario('JAS-01', 'class 1: a raw control character inside a string is refused, and the escaped form is accepted',
  'seams-and-lifecycle.md §7.2 item 7 (f) class (1) ("A RAW CONTROL CHARACTER INSIDE A STRING IS REFUSED — a literal LF, a literal TAB or a literal NUL inside a string — AND THE ESCAPED FORM (\\u0000) IS ACCEPTED"); A143 (1)',
  () => {
    const C1 = 'seams-and-lifecycle.md §7.2 item 7 (f) class (1); A143 (1)';

    const rawCase = (id, label, raw) => {
      // ⟶ **RE-DERIVED 2026-11-22 (`D-126` item 2; `D-118` item 1 SUPERSEDED).** The as-filed cell read *"the
      // WHOLE file does not load, the register begins EMPTY, the instance is returned and no error reaches the
      // caller"* — `D-118` item 1's reading, under which a corrupt image was *"treated as NO image at all"*. **The
      // strictness is UNMOVED and is now observable AS THE REFUSAL**: a present, non-empty image the loader will not
      // read refuses the construction, so the well-formed sibling `b` is not a key missing from an empty register —
      // **there is NO REGISTER, because nothing was built.**
      refusedCell(id, C1,
        `a file carrying a ${label} inside a string is REFUSED: the construction answers rank \`22\` \`FileImageRefused\` — the store's own sentence naming the path, \`address: null\`, \`log: []\` — and NO instance is returned, so the well-formed sibling \`b\` has no register to be absent from`,
        `{"a":"x${raw}y","b":7}`);
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
      // ⟶ **RE-DERIVED 2026-11-22 (`D-126` item 2).** The spelling is STILL REFUSED — the whole file does not load —
      // and the refusal is now the CONSTRUCTION's own answer instead of an empty register the caller could read:
      // the as-filed *"the register begins EMPTY"* is `D-118` item 1's reading and is withdrawn for this class.
      refusedCell(id, C2,
        `the number spelling \`${spelling}\` is REFUSED: the construction answers \`FileImageRefused\` and NO instance is returned — the whole file does not load because NOTHING IS BUILT, so the well-formed sibling \`b\` has no register to be absent from`,
        `{"a":${spelling},"b":7}`);
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
      // ⟶ **RE-DERIVED 2026-11-22 (`D-126` item 2): the overflow is still REFUSED, and it is observable AS THE
      // REFUSAL** — the construction answers `FileImageRefused` and no instance exists (`D-118` item 1's empty
      // register is withdrawn for this class).
      refusedCell(id, C3,
        `the number spelling \`${spelling}\` is REFUSED as out of range: the construction answers \`FileImageRefused\` and NO instance is returned — the whole file does not load because nothing is built`,
        `{"a":${spelling},"b":7}`);
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
    // ⟶ **RE-DERIVED 2026-11-22 (`D-126` item 2): U+00A0 in the SEPARATOR role is still REFUSED, and the refusal is
    // the construction's own** — `FileImageRefused`, no instance (`D-118` item 1's empty register is withdrawn).
    // **AND THE CHARACTER-VERSUS-ROLE DISCRIMINATION IS CARRIED BY `JAS-05.6` BELOW**, where the same U+00A0 inside
    // a string is ADMITTED: a separator the grammar does not admit refuses the whole file; the character in a
    // string is not a separator and loads.
    refusedCell('JAS-05.5', C5,
      'U+00A0 as a token separator is REFUSED: the construction answers `FileImageRefused` and NO instance is returned — the whole file does not load because nothing is built',
      `{"a":1,${NBSP}"b":2}`);
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
      'THE LOADER\'S BOUNDARY, ON THE FOREIGN-FILE ROUTE: an image of `127` CONTAINERS (the root counted — the corpus\'s walk-depth `126`) is ACCEPTED — the key loads and its value IS the nested array; and an image of `128` CONTAINERS (walk-depth `127`) is REFUSED — the construction answers `FileImageRefused` (`address: null`, `log: []`, the store\'s own sentence), NO instance is returned, and nothing loads',
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
        // ⟶ **RE-DERIVED 2026-11-22 (`D-126` item 2): the depth ceiling is still observable — the file does not
        // load — and it is observable AS THE REFUSAL.** The as-filed arm read *"the register begins empty, the
        // instance is returned and no error reaches the caller"*: `D-118` item 1's reading, withdrawn here. **What it
        // said in the stronger form stands: the loader's boundary is exactly where a `127`-container image loads and
        // a `128`-container image does not — and the second now refuses the CONSTRUCTION.**
        {
          const bytes = imageBytes(128);
          const counted = containersIn(bytes);
          const b = boot(bytes);
          const r = refusedShape(b);
          const good = counted === 128 && r.ok;
          if (!good) ok = false;
          notes.push(`128 containers (walk-depth 127): ${good ? 'REFUSED — the construction answers `FileImageRefused`, no instance is returned, nothing loads' : `NOT REFUSED AS DECLARED (${r.detail})`} :: containers counted in the bytes = ${counted}`);
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
// THE ANSWER FOR A FILE THE LOADER REFUSES — `D-126` ITEM 2'S: THE CONSTRUCTION IS REFUSED AT RANK `22`
// `FileImageRefused` AND NO INSTANCE EXISTS.
// **⟶ THE AS-FILED READING IS SUPERSEDED AND IS NAMED SO NO LATER PASS CHASES IT.** This scenario stood on arm (a)
// of the refused-file answer — *"the whole file does not load, the register begins EMPTY, the instance is returned,
// and no error reaches the caller"* — which is `D-118` item 1's reading, the one that made a corrupt image *"treated
// as NO image at all"* and therefore EQUAL to the zero-length path. **`D-126` item 2 WITHDRAWS the equality and the
// class now refuses the construction** (`contract.md §7.2`'s three-class clause of 2026-11-06: *"ARM (a) IS RETIRED
// FOR THIS CLASS"*), **so the cells below are re-cut to the DIFFERENCE the withdrawn equality no longer marks, and
// the answer for a `NoImage` path — an instance, `0` register keys, NO code — is what it is told apart from.**
scenario('JAS-08', 'the answer for a file the loader refuses: the construction is REFUSED at rank `22` `FileImageRefused`, no instance exists, and the class SEPARATES from the zero-length/absent path `D-118` item 1 made it equal to',
  'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (a)); A143 (2); §7.2 item 6 (the boot; DD-29); strata/decisions.md `D-126` item 2 (`FileImageRefused`, rank `22`; `D-118` item 1 superseded); contract.md §8.1 row `22` and §7.2\'s three-class clause of 2026-11-06; surface.md §2.5 items `4`/`4-bis`; §10.4 part `5` read at the corrupt arm', () => {
    const C8 = 'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (a)); A143 (2); strata/decisions.md `D-126` item 2; contract.md §8.1 row `22`';
    const REFUSED = `{"a":"x${RAW_LF}y","b":7}`; // a foreign file the loader refuses (class 1)

    // **⟶ RE-CUT 2026-11-22 (`D-126` item 2), FROM *"STORE-CREATE STILL RETURNS AN INSTANCE"* TO THE REFUSED HALF OF
    // THE DIFFERENCE.** The as-filed wording was `D-118` item 1's verbatim expectation; the cell now asserts the
    // store's own answer at every member it declares, so an instance coming back is a RED and not a green.
    cell('JAS-08.1', C8,
      'over a file the loader REFUSES, the construction is REFUSED at rank `22` `FileImageRefused`: `address: null`, `log: []`, the store\'s own sentence naming the path, and NO INSTANCE is returned',
      () => refusedShape(boot(REFUSED)));
    // **⟶ RE-CUT 2026-11-22 (`D-126` item 2): THIS CELL IS THE SEPARATION ITSELF.** `D-118` item 1 asserted the
    // corrupt image and the zero-length file were the SAME window; `D-126` item 2 makes them answer differently, and
    // the pair is still a measurement — it measures that the classes SEPARATE. An absent path is included because
    // `NoImage` is both (an absent file and a zero-length file) and both still construct (`§10.4` part 3; `DD-38`).
    cell('JAS-08.2', C8,
      'THE DIFFERENCE THE WITHDRAWN EQUALITY NOW MARKS: a ZERO-LENGTH file and an ABSENT path still CONSTRUCT — an instance, a register of `0` keys, NO code — while the SAME construction over the present, non-empty REFUSED image answers `FileImageRefused` and returns NO instance',
      () => {
        const zero = boot('');
        const zeroReg = zero.r.ok ? registerOf(zero.store) : null;
        const absent = tryCall(() => {
          const d = tmp();
          const P = path.join(d, 'store.json');
          return PKG.storeCreate({ filePath: P, journalLength: 8, listeners: [] });
        });
        const absentReg = absent.ok ? registerOf(absent.v) : null;
        const r = refusedShape(boot(REFUSED));
        const ok = zero.r.ok && zeroReg !== null && same(zeroReg, {})
          && absent.ok && absentReg !== null && same(absentReg, {})
          && r.ok;
        return C(ok,
          `zero-length: ${zero.r.ok ? `INSTANCE register=${show(zeroReg)}` : `THREW ${describe(zero.r.v)}`} · `
          + `absent: ${absent.ok ? `INSTANCE register=${show(absentReg)}` : `THREW ${describe(absent.v)}`} · `
          + `refused image: ${r.detail}`);
      });
    // **⟶ RE-CUT 2026-11-22 (`D-126` item 2): "THE WHOLE FILE DOES NOT LOAD" IS TRUE IN A STRONGER SENSE THAN THE
    // CELL COULD ASSERT BEFORE.** The as-filed limb read *"the sibling well-formed key is gone too"* — a key missing
    // from an EMPTY REGISTER. **A refusal loads NOTHING, so there is no register at all for the sibling to be absent
    // from**: no instance exists, so `b` has no reader. **AND WHAT THE REFUSAL LEAVES IS ASSERTED BESIDE IT**: the
    // corrupt bytes STAND, un-written-to and un-repaired (`D-126` residual 2; `contract.md §8.1` row `22`).
    cell('JAS-08.3', C8,
      'over a file the loader REFUSES, THE WHOLE FILE DOES NOT LOAD — in the sense the ruling gives the sentence: NOTHING IS BUILT, so the well-formed sibling `b` has no register to be read from at all (the only route a refused file leaves open is the refusal itself) — AND the corrupt bytes STAND, un-written-to and un-repaired',
      () => {
        const bytes = Buffer.from(REFUSED, 'utf8');
        const b = boot(REFUSED);
        const r = refusedShape(b);
        const onDisk = bytesOf(b.P);
        const unmoved = onDisk !== null && onDisk.equals(bytes);
        const ok = r.ok && b.store === null && unmoved;
        return C(ok,
          `${r.detail} · instance=${b.store === null ? 'NONE (so neither `a` nor `b` has a reader)' : 'RETURNED'} · `
          + `bytes unmoved=${unmoved} (${imgStr(onDisk)})`);
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
// LIST.  RE-DERIVED 2026-11-02: THE INSTANCE IS RETURNED, THE PAIRS ARE CARRIED
// AND SKIPPED, AND WHAT REMAINS OF `ConstraintListInvalid` IS THE MALFORMED LIST.
//
// **THE CLAUSE THIS SCENARIO STOOD ON IS SUPERSEDED, AND IT IS NAMED SO NO LATER PASS CHASES IT.** The scenario
// read *"the construction answers `ConstraintListInvalid` and no instance is returned"* over a file the loader
// refuses plus a supplied list. **`strata/decisions.md` · `D-90` (5) DELETES the boot's list-wide refusal** —
// *"under this rule an unresolvable parent SKIPS the pair and no list-wide refusal stands for it"* — and the
// unit's `PIN-5` (i) names the deleted bytes and (ii) names what remains: *"the malformed LIST and nothing
// else"*. **`D-90` (1)–(3)** decide which pairs are asked (the discriminator is the pair's PARENT; a skipped pair
// is CARRIED); **`D-96` (1)** keeps the skip threshold at ABSENCE alone; and **`PIN-4` (i)/(iii)** carry the two
// consequences measured below. **`CONSTRAINTLISTINVALID` KEEPS ITS RANK, ITS SENTENCE AND ITS OWN TRIGGERS**
// (`PIN-5` (iii)) — the cell below keeps that arm alive on a MALFORMED element.
//
// **REPORTED AND NOT FIXED HERE (a `D-85` item 2 class finding, for the pass that owns the corpus):** this
// scenario's cited clause names `seams-and-lifecycle.md §7.2 item 7 (f)` — and `git ls-files | grep -i seams`
// answers NOTHING: `docs/specs/storeroom-native/` holds `contract.md` alone on the tracked tree, and the only
// copies of `seams-and-lifecycle.md` stand under the two GITIGNORED trees (`archive/pre-strata-docs-2026-10-24/`
// at `.gitignore:180` and `.reflow-backup/` at `.gitignore:185`). **`D-85` item 2: an archived part is NOT
// citable; where a citation must resolve, the cited section is REGENERATED.** The citation is left byte-unmoved
// here on purpose — this pass is not authorised to edit `docs/**` — and is reported in the envelope instead.
// **⟶ AND THE WHOLE OF ARM (b)'s ANSWER FOR THE REFUSED CLASS IS SUPERSEDED, 2026-11-22 — `D-126` ITEM `2`.** The
// revision above (2026-11-02) re-derived this scenario over the reading that a construction over a corrupt file
// RETURNS AN INSTANCE with an empty register — `D-118` item 1's — and measured `D-90`'s carried-and-skipped walk on
// it. **A present, non-empty image the loader REFUSES now REFUSES THE CONSTRUCTION at rank `22`
// `FileImageRefused`, and the refusal PRECEDES THE PACKAGE'S FIRST ASK**, so `cfg.constraints` *"is never
// reached"* and arm (b) does not speak for this class at all (`contract.md §7.2`'s three-class clause of
// 2026-11-06: *"ARM (a) IS RETIRED FOR THIS CLASS, AND ARM (b) NO LONGER SPEAKS FOR IT EITHER"*). **SO THE CELLS
// BELOW ARE RE-CUT THREE WAYS AND NONE IS WEAKENED:**
//   (i) **`JAS-09.1` keeps BOTH of its subjects by re-cutting each to a class that still carries it** — over the
//       REFUSED class the list is NEVER REACHED (the refusal, ZERO asks, and no instance to name a pair); the
//       carried-and-skipped walk is measured over the NO-IMAGE class, the ZERO-LENGTH file, which the ruling LEAVES
//       CONSTRUCTING and whose register is empty in the same way, so `D-90`'s parent discriminator bites exactly as
//       before; and the SHAPE ARM survives verbatim, because the package's own list check (`B-1`) refuses a
//       malformed element BEFORE ANY FILESYSTEM ACT — the ordering the live runner's `JAS-09.3` records at its own
//       2026-10-25 `D-26` note.
//   (ii) **`JAS-09.2` is a CONTROL and gets a file the loader reads**: an empty list changes nothing on the refused
//       side (`FileImageRefused` again) while it constructs on the `NoImage` side, so the refusal is the FILE's
//       class and not the list's.
//   (iii) **`JAS-09.3` is UNMOVED**: a readable image carrying the named address yields an INSTANCE, which is the
//       control that the pair is a well-formed entry.
scenario('JAS-09', 'the answer for a file the loader refuses, arm (b): the supplied list is NEVER REACHED over a refused image (zero asks, no instance) — and the carried-and-skipped walk is measured where a register still exists, over the zero-length file `D-126` item 2 leaves constructing',
  'seams-and-lifecycle.md §7.2 item 7 (f) (the refused-file answer, arm (b)) — **the live tree carries no such path: see the `D-85` item 2 note above**; A143 (2); strata/decisions.md `D-126` item 2 (`arm (b) no longer speaks for this class`) and `D-90` (1)–(5), `D-96` (1); the unit\'s `PIN-4` (i)/(iii) and `PIN-5` (i)–(iii); contract.md §7.2\'s three-class clause of 2026-11-06 and §8.1 #16; surface.md §2.1 (the `cfg` block — the FOURTH declared key `constraints`); parameter-semantics.md §2.21 (PAR-JS-21)', () => {
    const C9 = 'seams-and-lifecycle.md §7.2 item 7 (f) (arm (b)); A143 (2); strata/decisions.md `D-126` item 2 (the refusal precedes the package\'s first ask) and `D-90` (5)/`PIN-5` (i)/(ii) (`ConstraintListInvalid` answers the MALFORMED list alone); contract.md §7.2\'s three-class clause of 2026-11-06; §8.1 #16 (`ConstraintListInvalid`)';
    const REFUSED = `{"a":"x${RAW_LF}y","b":7}`;

    cell('JAS-09.1', C9,
      'over a file the loader REFUSES, a supplied constraint list is NEVER REACHED: the construction answers `FileImageRefused`, ZERO pairs are asked (the refusal precedes the package\'s first ask), and no instance exists to name a pair — AND the SAME two-pair list over the NO-IMAGE class (the ZERO-LENGTH file, which still constructs) is CARRIED AND SKIPPED as `D-90` declares: the instance IS returned, both pairs are named by `constraints()`, the pair whose PARENT does not resolve is asked ZERO times while the CONTROL pair at `[\'x\']` — whose parent is the register that always resolves — is asked once, the register reads empty and the file stays `0` bytes; AND the shape arm is alive: a MALFORMED element still answers `ConstraintListInvalid` with its verbatim sentence and `log: []`, the package\'s own list check running before any filesystem act',
      () => {
        // ⟶ RE-DERIVED 2026-11-02 over `D-90` (1)–(5)/`D-96` (1)/`PIN-4`/`PIN-5`, AND RE-CUT AGAIN 2026-11-22 BY
        // `D-126` ITEM `2`. **WHAT THE 2026-11-02 BYTES MEASURED WAS THE WALK OVER A CORRUPT FILE'S EMPTY REGISTER —
        // a state the ruling removes**, because the construction no longer RETURNS over a corrupt image at all. The
        // subject is kept WHOLE and SPLIT BY CLASS: the refusal's own answer over the refused image, the walk's own
        // answer over the zero-length file.
        //
        // **THE DISCRIMINATOR IS THE PAIR'S PARENT, SO THE DRIVE SUPPLIES ONE PAIR OF EACH ARM.** `['x','deep']`
        // has an ABSENT parent `['x']` in an empty register ⇒ **SKIPPED** (`D-90` (1), the ruling's own first
        // example) ⇒ asked ZERO times and CARRIED (`PIN-4` (i)). `['x']` has the EMPTY REGISTER for a parent,
        // which always resolves ⇒ **APPLIED**, *"with the absence of its own key as the state it judges"*
        // (`D-90` (1), the ruling's own second example) ⇒ asked once. **THE SECOND IS THE CONTROL THAT MAKES THE
        // ZERO A MEASUREMENT**: without it a dead counter and a skip would read the same. **AND THE REGISTER IS
        // EMPTY IN THE SAME WAY** (`contra` the refused class): a zero-length file is `FileImage::NoImage` and
        // carries `0` keys with NO code (`contract.md §7.2` item 6 part 3; `§10.4` part 3; `DD-38`).
        const makePair = (sink) => (address, id) => ({
          address,
          id,
          constraint: (context) => {
            sink.push({ id, at: context.attempt === null ? 'registration' : 'pass' });
            return true;
          },
        });
        // (i) THE REFUSED CLASS: the list is never reached, so no pair is asked and no pair is nameable.
        const refusedAsks = [];
        const refused = boot(REFUSED, {
          constraints: [makePair(refusedAsks)(['x', 'deep'], 'skipped-pair'), makePair(refusedAsks)(['x'], 'control-pair')],
        });
        const refusal = refusedShape(refused);
        // (ii) THE NO-IMAGE CLASS: the zero-length file, which the ruling leaves constructing.
        const noImageAsks = [];
        const noImage = boot('', {
          constraints: [makePair(noImageAsks)(['x', 'deep'], 'skipped-pair'), makePair(noImageAsks)(['x'], 'control-pair')],
        });
        const reg = noImage.r.ok ? registerOf(noImage.store) : null;
        const carried = noImage.r.ok ? tryCall(() => noImage.store.constraints().map((one) => one.id)) : { ok: false, v: null };
        const skippedAsks = noImageAsks.filter((one) => one.id === 'skipped-pair');
        const controlAsks = noImageAsks.filter((one) => one.id === 'control-pair');
        const deep = noImage.r.ok ? tryCall(() => noImage.store.read(['x', 'deep'])) : { ok: false, v: new Error('no instance') };
        const noImageBytes = bytesOf(noImage.P);
        const noImageUnmoved = noImageBytes !== null && noImageBytes.length === 0;
        // **AND THE SHAPE ARM, KEPT ALIVE ON ITS OWN ELEMENT** — a malformed one (its `address` is not a segment
        // array), which `PIN-5` (ii) leaves as `ConstraintListInvalid`'s surviving trigger. Its sentence is asserted
        // VERBATIM and its log's emptiness is the construction's own (`PIN-5` (iii): the status keeps its rank and its
        // sentence). **⟶ READ AT THE REFUSED FILE ON PURPOSE, 2026-11-22**: the malformed element is refused
        // `ConstraintListInvalid` BEFORE the file is read — the package's list check (`B-1`) runs before any
        // filesystem act, as the live runner's `JAS-09.3` records at its own 2026-10-25 `D-26` note — so `D-126` item 2's
        // refusal does not pre-empt rank `16`'s own trigger and this arm is still alive over a corrupt path.
        const SHAPE_SENTENCE = `'a' is not a valid constraint entry in 'constraints', a constraint entry is an address and an id, and the address is a segment array`;
        const shape = boot(REFUSED, { constraints: [{ address: 'a', id: 'c2', constraint: () => true }] });
        const shapeStatus = shape.r.ok ? '<INSTANCE>' : (shape.r.v && shape.r.v.status);
        const shapeMessage = shape.r.ok ? '<no refusal>' : String(shape.r.v && shape.r.v.message);
        const shapeLog = shape.r.ok ? null : (shape.r.v && shape.r.v.log);
        const shapeOk = shape.r.ok === false
          && shapeStatus === 'ConstraintListInvalid'
          && shapeMessage === SHAPE_SENTENCE
          && Array.isArray(shapeLog) && shapeLog.length === 0;
        const ok = refusal.ok && refusedAsks.length === 0 && refused.store === null
          && reg !== null && same(reg, {})
          && carried.ok && Array.isArray(carried.v)
          && carried.v.includes('skipped-pair') && carried.v.includes('control-pair')
          && skippedAsks.length === 0
          && controlAsks.length === 1 && controlAsks[0].at === 'registration'
          && deep.ok === false && deep.v && deep.v.status === 'AddressNotFound'
          && noImageUnmoved
          && shapeOk;
        return C(ok,
          `REFUSED CLASS: ${refusal.detail} · pairs asked ${refusedAsks.length} time(s) (the refusal precedes the first ask) · `
          + `NO-IMAGE CLASS (zero-length): construction=INSTANCE register=${show(reg)} constraints()=${show(carried.ok ? carried.v : describe(carried.v))} · `
          + `skipped-pair asked ${skippedAsks.length} time(s) · control-pair asked ${JSON.stringify(controlAsks)} · `
          + `read(x.deep)=${deep.ok ? JSON.stringify(deep.v) : `threw ${describe(deep.v)}`} · `
          + `the zero-length file stays 0 bytes=${noImageUnmoved} (${imgStr(noImageBytes)}) · `
          + `SHAPE ARM: threw=${shapeStatus} message=${JSON.stringify(shapeMessage)} log=${show(shapeLog)} verbatim=${shapeMessage === SHAPE_SENTENCE}`);
      });
    // **⟶ RE-CUT 2026-11-22 (`D-126` item 2): THIS IS THE CONTROL THAT NEEDS A NON-CORRUPT FILE.** Its as-filed
    // subject — *"over the SAME refused file with an EMPTY constraint list the instance IS RETURNED"* — was arm (a)'s
    // answer, which the ruling retires for this class outright. **What the control is FOR is kept and given the file
    // it needs:** an EMPTY list changes NOTHING on the refused side (the refusal is the image's, not the list's), and
    // the same empty list over the `NoImage` class constructs an instance with `0` keys — **so the discriminator this
    // cell owns is the FILE's class and not the list's contents**, and the zero-length file stays `0` bytes.
    cell('JAS-09.2', C9,
      'CONTROL: the constraint LIST is not what the refusal answers — over the SAME refused file an EMPTY list answers `FileImageRefused` exactly as a two-pair list does (zero asks), while over the NO-IMAGE class (the zero-length file, which the ruling leaves constructing) the same EMPTY list returns an INSTANCE with a register of `0` keys — so the refusal is the FILE\'s class and not the list\'s, and the zero-length file stays `0` bytes',
      () => {
        const refusedEmpty = boot(REFUSED, { constraints: [] });
        const refusal = refusedShape(refusedEmpty);
        const noImage = boot('', { constraints: [] });
        const reg = noImage.r.ok ? registerOf(noImage.store) : null;
        const noImageBytes = bytesOf(noImage.P);
        const unmoved = noImageBytes !== null && noImageBytes.length === 0;
        const ok = refusal.ok && refusedEmpty.store === null
          && noImage.r.ok && reg !== null && same(reg, {}) && unmoved;
        return C(ok,
          `refused + EMPTY list: ${refusal.detail} · `
          + `zero-length + EMPTY list: ${noImage.r.ok ? `INSTANCE register=${show(reg)}` : `THREW ${describe(noImage.r.v)}`} · `
          + `the zero-length file stays 0 bytes=${unmoved} (${imgStr(noImageBytes)})`);
      });
    cell('JAS-09.3', `${C9}; contract.md §7.2 item 1 ("THE LOADED STATE 'SATISFIES' THE SUPPLIED LIST IFF EVERY SUPPLIED PAIR'S OWN 'address' RESOLVES IN THE LOADED STATE")`,
      'CONTROL: the SAME supplied list over a PARSEABLE image that DOES carry the named address yields an INSTANCE — so the pair is a well-formed entry, its asking at `JAS-09.1`\'s control is the REGISTER-PARENT arm of `D-90` (1) and not a refusal of the list\'s own shape, and the loaded state it stands over is the state it judges',
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
      'LAYER LIMIT — the commit\'s own verification fires only for an image the LOADER would refuse, and the loader\'s ceiling is 128 nested containers (A144 (1)) while the JS package\'s OWN walk refuses a value of depth 128 before any verb is called (and admits 127 — measured) (crossing.md §1.4 item 5). The store admits a value of any depth (A143 (1)), so the only route by which the JS surface could hand the store such a value is closed by the package\'s own walk: the JS layer cannot cause the commit\'s refusal. A144 (1) says the same in its own words: "THE JS SURFACE CANNOT REACH IT — THE NATIVE LIBRARY\'S OWN API WAS." THE DEPTH CLASS ITSELF IS NOT THIS LIMIT — it is observable from this layer on the FOREIGN-FILE route (asserted at JAS-07.1). THIS CELL IS NOT A PASS AND NOT A FAILURE.');
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
