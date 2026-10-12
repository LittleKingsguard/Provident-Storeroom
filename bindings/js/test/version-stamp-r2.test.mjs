// `bindings/js/test/version-stamp-r2.test.mjs` — **THE `R2` SOURCE-ASSERTION SET FOR
// `U-STOREROOM-CONSUMER-FIX`, AUTHORED AFTER THE ARCHITECT RULED `R2` ON FINDING `M1`.**
//
// THE RULING THIS FILE IS AUTHORED UNDER, IN THE ARCHITECT'S OWN TERMS: **`R2` — THE CLAUSE STANDS AS
// FILED, AND THE CARRIER MUST BE CHANGED SO THAT A NON-STRING `version` REACHES THE DIRECTIVE AND
// `version()`.** So the CLAUSE is the source of truth and the CARRIER's own bytes are the thing that
// must move. **NO EXPECTATION BELOW WAS FORMED BY READING THE CARRIER'S BEHAVIOUR**: the carrier's
// bytes are read HERE FOR ONE PURPOSE ONLY — to LOCATE the declarations and the shapes the assertions
// must cite, and to show that today's bytes do not carry the clause's answer.
//
// ---------------------------------------------------------------------------------------------
// THE CLAUSE THAT GOVERNS, READ WHOLE AND RE-STATED AS THE FOUR STEPS A CELL MUST DERIVE FROM
// ---------------------------------------------------------------------------------------------
// `docs/specs/storeroom-publish/parameter-semantics.md §5.1`, outside value `(vii)` — *"A MANIFEST THAT
// IS READABLE BUT WHOSE `version` KEY IS ABSENT OR NON-STRING"* — together with every `RCA-8(d)` clause
// standing beside it in that row. Its operative-answer clause prints the answer ONCE, in four steps:
//   (1) **THE DIRECTIVE *IS* EMITTED AT THIS STATE** — *"the carrier emits the directive for whatever
//       it read, so THE BUILD SCRIPT'S OWN EMISSION IS A FACT OF THE BUILD SCRIPT AND NOT OF THE
//       MANIFEST'S SHAPE"* (`docs/specs/storeroom-js/package.md §6.1`, its read-mechanism clause, state
//       `(iii)`);
//   (2) **THE `None` ARM IS *NOT* TAKEN AND THE CRATE'S `Cargo.toml` VERSION IS *NOT* THE STAMPED
//       VALUE AT THIS STATE** — *"this is the whole of what the limb `(i)` above got wrong"*;
//   (3) **THE LOAD PATH'S ANSWER IS THE SINGLE DECLARED FAILURE ARM: `version()` REFUSES** — and the
//       row's clause `(C)` fixes what the stamped value then IS: *"IT IS WHATEVER THE CARRIER'S
//       DECLARED READ PRODUCED FOR A `version` SLOT THAT HOLDS NO STRING ... SO ANY NON-STRING-FOR-
//       STRING SUBSTITUTION IS A MISMATCH: THE `version()` READ REFUSES AND THE GUARD `P-PUB-10` FAILS
//       THE RUN"* — with *"THE VALUE `(vii)` DECLARES IS NEVER THE NON-STRING"* as its own words, and
//       *"ONLY A DIRECTIVE-BEARING WRITE STANDS — an empty string or any other non-string-for-string
//       substitution"* as the consequence the row names beside it;
//   (4) **AND THE RUN FAILS AT THE GUARD** (`contract.md §5.0b`; `release.md §1.4a`).
// **AND CLAUSE `(D)` CLOSES THE FALLBACK'S LIST AT *"absent, unparseable, or unreadable"*, WHILE `(E)`
// NAMES THE DISTINCTION THE ROW RESTS ON: a READABLE `""` IS A VALUE THAT WAS READ WITH NO FALLBACK,
// and this state *"is not that one — it is a read that produced no value at all"*.**
//
// SECOND AUTHORITY, READ AT ITS OWN CLAUSES: `docs/specs/storeroom-js/package.md §6.1` — its
// read-mechanism clause (the three states the two macros divide, printed one by one) and its items `2`,
// `3`, `4` and `6`; and `docs/specs/storeroom-publish/release.md §6.10` items `2`–`5` and its
// parser-domain clause; and `docs/specs/storeroom-publish/contract.md §5.0a` (`P-PUB-9`, whose failure
// list carries *"a `version()` answering an empty string"*, *"a `version()` answering a value that is
// not a `string`"* and *"a carrier that falls back from an EMPTY string"*) with `§5.0b` (`P-PUB-10`,
// the guard the run fails at).
//
// ---------------------------------------------------------------------------------------------
// WHY EVERY CELL HERE EXCEPT THE CONTROL IS A SOURCE-ASSERTION CELL — `A95`, BY THE ROW'S OWN WORDS
// ---------------------------------------------------------------------------------------------
// `A95`: **a refusal need not be failed by a run, PROVIDED IT NAMES THE LAYER AT WHICH IT CAN FAIL, and
// NO CELL MAY CLAIM TO FAIL SUCH A MEMBER BY DRIVING THE RUN.** The row itself says of THIS state:
// **"NO CELL DRIVES THIS ROW'S OUTSIDE VALUE `(vii)`, BECAUSE A CELL CLAIMING TO FAIL A SOURCE-LEVEL
// REFUSAL BY DRIVING THE RUN IS FORBIDDEN BY `A95`'S OWN FORM ... SO THE ROW'S FIRABILITY IS SATISFIED
// BY A SOURCE-ASSERTION CELL READING THE CARRIER'S OWN BYTES."**
// **SO: EVERY CELL BELOW EXCEPT `R2-05` READS `bindings/js/build.rs` AS TEXT AND ASSERTS ON ITS
// DECLARATIONS AND ITS SHAPE. NONE OF THEM BUILDS ANYTHING. NONE OF THEM DRIVES A RELEASE LEG.**
// `R2-05` is the CONTROL the brief demands — *"a red set that cannot show the correct path intact is a
// red set that a wrong fix would satisfy"* — and it drives the DECLARED observable of `PAR-PUB-35`
// (*"the artefact's own `version()`, returned through the facade"*) on the HAPPY path only, which is
// not a source-level refusal and is therefore not reached by `A95`'s prohibition.
//
// ---------------------------------------------------------------------------------------------
// THE STATES ENUMERATED BEFORE THE CELLS, EACH WITH THE CELL THAT CARRIES IT
// ---------------------------------------------------------------------------------------------
// `PAR-PUB-35`'s domain is *"the string `bindings/js/package.json`'s `version` field holds at BUILD
// TIME, character for character"*. Its states, and this set's coverage of each:
//   (i)    the directive was emitted and carries a value — THE REAL MANIFEST, whose single occurrence
//          of the byte-sequence `"version"` stands at `package.json:3`, reading `0.1.1`
//          → `R2-03` (step `(1)`), `R2-04` (step `(2)`) and `R2-05` (THE CONTROL, DRIVEN);
//   (ii)   the directive was NEVER EMITTED AT ALL — `(vi)`, a DIFFERENT state whose answer is the
//          crate's version → NOT this row's subject, and NO cell here;
//   (v)    the manifest reads `""` — A VALUE THAT WAS READ, NO FALLBACK RUNS
//          → `R2-07` (the emptiness fail-state of `P-PUB-9`'s list, a SOURCE assertion);
//   (vii-a) the manifest IS READABLE and its `version` KEY IS ABSENT
//          → `R2-01` (the key half) and `R2-06` (the value half);
//   (vii-b) the manifest IS READABLE and its `version` value is NON-STRING
//          → `R2-02` (the value half: no abort, and a substitution) and `R2-06` (the locator half);
//   and every cell states, in its own comment, WHICH OF THE FOUR STEPS IT READS.
//
// ---------------------------------------------------------------------------------------------
// INSTRUMENT DISCIPLINE
// ---------------------------------------------------------------------------------------------
// Every cell reads the carrier's bytes ONCE, through one reader (`analyse` → a comment-stripped,
// string-blanked view `CODE` for structural tokens and a comment-stripped, string-intact view `TEXT`
// for literals). Comments are removed before anything is searched, because a form NAMED IN A REMARK
// is not a declaration and not a read — `build.rs` comments the whole of its own reasoning, and an
// unstripped search would find the clause's own vocabulary and report a false green. Each span-based
// cell carries a READER SANITY control (`assertReaderIsSane`) so a reader that found nothing cannot
// report an absence it manufactured. **The SPAN each cell asserts over is the carrier's own
// value-derivation region: from the statement that searches the manifest for the `version` key to the
// statement that emits the directive.** The span's mode is printed in every failure message, so a
// reader that had to fall back to a wider region says so rather than silently widening.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ---------------------------------------------------------------------------------------------
// the declared constants, read at their own bytes
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const BUILD_RS = join(PKG_DIR, 'build.rs');
const MANIFEST_PATH = join(PKG_DIR, 'package.json');
const CRATE_MANIFEST = join(PKG_DIR, 'Cargo.toml');
const BUILT_ARTEFACT = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/** `docs/specs/storeroom-publish/release.md §6.10` item `1` / `docs/specs/storeroom-js/package.md`
 *  §6.1 item `2` — **THE DIRECTIVE'S EXACT NAME**, and the manifest the carrier reads. */
const DIRECTIVE = 'STOREROOM_JS_PACKAGE_VERSION';
const EMIT_PREFIX = `cargo:rustc-env=${DIRECTIVE}`;

/** `parameter-semantics.md §5.1` — `PAR-PUB-35`'s **domain** names *"the `version` FIELD"* of
 *  `bindings/js/package.json`. The key's own name is the clause's, not the carrier's. **THE QUOTES
 *  AROUND IT MAY BE ESCAPED**: inside a Rust string that carries a JSON fragment the key is spelled
 *  `\"version\"`, so the pattern admits either spelling and a BARE `version` (an identifier or the
 *  interior of a longer name) is never taken for the key. */
const VERSION_KEY_PATTERN = /\\?"version\\?"/;
const VERSION_KEY_SPELLED = '"version"';

const MANIFEST = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const MANIFEST_VERSION = MANIFEST.version;

/** `release.md §1.4a` item `3` / `contract.md §5.0a` — the crate's own version is the ONE value the
 *  stamp must never answer: it is the value the `None` arm takes (`package.md §6.1` item `3`). */
const CRATE_VERSION = (() => {
  const cargo = readFileSync(CRATE_MANIFEST, 'utf8');
  const m = /^version\s*=\s*"([^"]*)"/m.exec(cargo);
  assert.ok(m !== null, 'the sibling crate\'s manifest must declare a `version` — the `None` arm\'s value');
  return m[1];
})();

// ---------------------------------------------------------------------------------------------
// `analyse` — comments removed, and a string-blanked twin of the same length
// ---------------------------------------------------------------------------------------------
/**
 * **TWO VIEWS OF ONE FILE, AND WHY BOTH ARE NEEDED.** `CODE` has every comment removed AND every
 * string/char literal's BODY blanked to spaces — so a structural token (`let`, `match`, `unwrap_or`,
 * `is_empty`, a brace depth count) is found where it is CODE and never inside a message or a JSON
 * name. `TEXT` has the comments removed and the string bodies INTACT — because the `version` KEY and
 * the directive's NAME ARE string literals, and a search for them in `CODE` would find the searcher's
 * own instrument and never the file. Both views are the SAME LENGTH, so an offset found in one is the
 * same offset in the other, and either can be turned into a line number.
 */
function analyse(source) {
  const code = source.split(''); // comments blanked AND every string/char literal's BODY blanked
  const text = source.split(''); // comments blanked ONLY — literals INTACT (the key and the names live in them)
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (c === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') { code[i] = ' '; text[i] = ' '; i += 1; }
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      let depth = 1;
      code[i] = ' '; text[i] = ' '; code[i + 1] = ' '; text[i + 1] = ' '; i += 2;
      while (i < source.length && depth > 0) {
        if (source[i] === '/' && source[i + 1] === '*') { depth += 1; }
        else if (source[i] === '*' && source[i + 1] === '/') {
          depth -= 1;
          if (depth === 0) { code[i] = ' '; text[i] = ' '; code[i + 1] = ' '; text[i + 1] = ' '; i += 2; break; }
        }
        code[i] = ' '; text[i] = ' '; i += 1;
      }
      continue;
    }
    if (c === '"') {
      i += 1;
      while (i < source.length) {
        if (source[i] === '\\') { code[i] = ' '; i += 1; if (i < source.length) { code[i] = ' '; i += 1; } continue; }
        if (source[i] === '"') { i += 1; break; }
        code[i] = ' '; i += 1;
      }
      continue;
    }
    if (c === "'") {
      // a CHAR LITERAL (`'x'`, `'\n'`) or a LIFETIME (`'a`); only the former has a body to blank.
      const escaped = source[i + 1] === '\\';
      const simple = source[i + 2] === "'" && source[i + 1] !== "'";
      if (escaped || simple) {
        let j = i + 1;
        while (j < source.length && source[j] !== "'") { code[j] = ' '; j += 1; }
        if (j < source.length) { code[j] = ' '; j += 1; }
        i = j + 1;
        continue;
      }
      i += 1;
      continue;
    }
    i += 1;
  }
  return { code: code.join(''), text: text.join('') };
}

// ---------------------------------------------------------------------------------------------
// THE INSTRUMENTS, NAMED ONCE — a cell and its NEGATIVE CONTROL must run THE SAME predicate,
// or the control would certify an instrument the cell does not use. `R2-08` drives each of these
// against a LAWFUL synthetic carrier and against MUTATED copies of this one.
// ---------------------------------------------------------------------------------------------
/** `R2-01`(A) — a TOTAL consumption of a split iterator (`rsplit(..).next()` / `split(..).next()`):
 *  total by construction, so it cannot report the key's absence. */
const TOTAL_SEARCH = /\.\s*(?:rsplit|split)\s*\([\s\S]{0,300}?\)\s*\.\s*next\s*\(\s*\)/;
/** `R2-01`(B) — the slot's absence HELD AS A STATE. */
const ABSENCE_HELD = /\bNone\b|\bif\s+let\b|\belse\b|\bmatch\b|\bunwrap_or\b|\bok_or\b/;
/** `R2-02`(A) — an aborting call standing on the value-derivation path. */
const ABORT_ANYWHERE = /\.\s*(?:expect|unwrap)\s*\(|\bpanic!\s*\(|\bunreachable!\s*\(|\btodo!\s*\(|\bunimplemented!\s*\(|\bassert(?:_eq|_ne)?!\s*\(/;
/** `R2-02`(B) — a consultation of the slot value's OWN SHAPE. **THE SET IS DECLARED AND NOT EXHAUSTIVE**:
 *  it names the forms a Rust carrier is expected to reach for, and every one of them is a shape test a
 *  lawful carrier may use. A lawful carrier using a form outside this set would be refused by this
 *  cell, and that LIMIT IS STATED RATHER THAN HIDDEN. */
const SHAPE_CONSULTED = /\bstarts_with\b|\bends_with\b|\bstrip_prefix\b|\bstrip_suffix\b|\bas_str\b|\bis_string\b|\bas_string\b|\bas_bytes\b|\bchars\s*\(\s*\)|\bfirst\s*\(\s*\)|\bmatches!\b|\bValue::String\b|\bserde_json\b|\.get\s*\(/;
/** `R2-06` — a step that LOCATES the value (a colon split or a quote scan) TOGETHER WITH ITS RECEIVER.
 *  **THE RECEIVER IS THE SUBJECT, NOT THE STATEMENT**: in a lawful carrier the colon split stands in the
 *  same statement as the key search, so a statement-level test would refuse a lawful shape. */
const LOCATOR = /([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*split(?:_once)?\s*\(\s*':'|([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*find\s*\(\s*'"/g;
/** `R2-06` — evidence that a piece of text is SCOPED to the slot: a search that can answer `None`
 *  whose absence is handled. */
const SCOPE_EVIDENCE = /\bsplit_once\s*\(|\bfind\s*\(|\.nth\s*\(|\bstrip_prefix\s*\(|\bunwrap_or\b|\bok_or\b|\bmatch\b|\bif\s+let\b|\belse\b/;
/** `R2-07` — a test of the VALUE's EMPTINESS, which is the test a fallback from a PRESENT value
 *  would be hung on (the widening `(b)` the row refused). */
const EMPTINESS_TEST = /\bis_empty\s*\(|\.len\s*\(\s*\)\s*==\s*0|==\s*""|!=\s*""/;

const snippet = (s, n = 150) => s.replace(/\s+/g, ' ').trim().slice(0, n);

/** `R2-06` — the whole-text taint, run over ONE carrier's own statements: a binding is
 *  WHOLE-TEXT-POSSIBLE if it holds the manifest read, or if it is derived from a whole-text-possible
 *  binding WITHOUT a step that can answer `None` and handle it. A LOCATOR whose RECEIVER is
 *  whole-text-possible is the defect. */
function locatorViolations(c) {
  const tainted = new Set();
  for (const b of (c.READ_STMT.lhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [])) tainted.add(b);
  const violations = [];
  for (const stmt of c.STATEMENTS) {
    LOCATOR.lastIndex = 0;
    let m;
    while ((m = LOCATOR.exec(stmt.text)) !== null) {
      const receiver = m[1] ?? m[2];
      if (tainted.has(receiver)) violations.push({ line: stmt.line, receiver, text: snippet(stmt.text, 190) });
    }
    const idents = (stmt.rhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []);
    if (idents.some((n) => tainted.has(n)) && !SCOPE_EVIDENCE.test(stmt.rhs)) {
      for (const n of (stmt.lhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [])) {
        if (!['mut', 'Some', 'Ok', 'Err', 'None', 'ref'].includes(n)) tainted.add(n);
      }
    }
  }
  return violations;
}

/** `R2-03` — the emit site stands INSIDE a conditional, so a path can skip the directive. */
const emitIsGuarded = (c) => c.EMIT !== null && c.READ_STMT !== null && c.EMIT.depth !== c.depthAt(c.READ_STMT.start);
const emitSiteCount = (c) => c.EMIT_SITES.length;

/** `R2-04` — the emit's provenance reaching the crate's `Cargo.toml` version (the `None` arm's value). */
const fallbackRowsInProvenance = (c) => c.provenanceOf(c.EMIT_BINDING).filter((r) => /CARGO_PKG_VERSION|Cargo\.toml/.test(r.rhs));
const ambientReadOfDirective = (c) => new RegExp(`env::var(?:_os)?\\s*\\(\\s*"${DIRECTIVE}"`).test(c.TEXT);

// ---------------------------------------------------------------------------------------------
// THE READER — ONE CARRIER AT A TIME, so a control can read a MUTATED COPY of this one through the
// very same instruments. `CARRIER` is `bindings/js/build.rs` itself.
// ---------------------------------------------------------------------------------------------
function readCarrier(source) {
  const { code: CODE, text: TEXT } = analyse(source);

  const lineOf = (index) => CODE.slice(0, index).split('\n').length;
  const depthAt = (index) => {
    let d = 0;
    for (let i = 0; i < index; i += 1) { if (CODE[i] === '{') d += 1; else if (CODE[i] === '}') d -= 1; }
    return d;
  };

  const statementEnd = (from) => {
    let depth = 0;
    for (let i = from; i < CODE.length; i += 1) {
      const ch = CODE[i];
      if ('([{'.includes(ch)) depth += 1;
      else if (')]}'.includes(ch)) depth -= 1;
      else if (ch === ';' && depth <= 0) return i;
    }
    return -1;
  };

  const STATEMENTS = (() => {
    const out = [];
    const re = /\blet\b/g;
    let m;
    while ((m = re.exec(CODE)) !== null) {
      let j = m.index + 3;
      let depth = 0;
      let eq = -1;
      while (j < CODE.length) {
        const ch = CODE[j];
        if ('([{'.includes(ch)) depth += 1;
        else if (')]}'.includes(ch)) depth -= 1;
        else if (ch === ';' && depth === 0) break;
        else if (ch === '=' && depth === 0 && CODE[j + 1] !== '=' && CODE[j - 1] !== '=' && CODE[j - 1] !== '!'
          && CODE[j - 1] !== '<' && CODE[j - 1] !== '>') { eq = j; break; }
        j += 1;
      }
      if (eq === -1) continue;
      const end = statementEnd(eq);
      if (end === -1) continue;
      out.push({
        start: m.index,
        end,
        lhs: CODE.slice(m.index + 3, eq),
        rhs: CODE.slice(eq + 1, end),
        text: TEXT.slice(m.index, end + 1),
        line: lineOf(m.index),
      });
      re.lastIndex = end + 1;
    }
    return out;
  })();

  const READ_STMT = STATEMENTS.find((st) => /read_to_string\s*\(/.test(st.rhs)) ?? null;
  const SEARCH_STMT = STATEMENTS.find((st) => VERSION_KEY_PATTERN.test(st.text)) ?? null;

  const EMIT_SITES = (() => {
    const sites = [];
    const re = new RegExp(`cargo:rustc-env=${DIRECTIVE}`, 'g');
    let m;
    while ((m = re.exec(TEXT)) !== null) {
      const call = TEXT.lastIndexOf('println!', m.index);
      if (call === -1) continue;
      const open = CODE.indexOf('(', call);
      let depth = 0;
      let end = -1;
      for (let i = open; i < CODE.length; i += 1) {
        if (CODE[i] === '(') depth += 1;
        else if (CODE[i] === ')') { depth -= 1; if (depth === 0) { end = i; break; } }
      }
      sites.push({ start: call, end: end === -1 ? m.index + 80 : end, depth: depthAt(call), line: lineOf(call) });
    }
    return sites;
  })();
  const EMIT = EMIT_SITES[0] ?? null;

  const EMIT_BINDING = (() => {
    if (EMIT === null) return null;
    const m = /\{\s*([A-Za-z_][A-Za-z0-9_]*)/.exec(TEXT.slice(EMIT.start, EMIT.end + 1));
    return m ? m[1] : null;
  })();

  const SPAN_START = SEARCH_STMT !== null ? SEARCH_STMT.start : (READ_STMT !== null ? READ_STMT.end + 1 : 0);
  const SPAN_MODE = SEARCH_STMT !== null
    ? `from the statement that names the key ${VERSION_KEY_SPELLED} (build.rs:${SEARCH_STMT.line})`
    : `POST-READ FALLBACK: no statement names the key ${VERSION_KEY_SPELLED}, so the span opens after the manifest read (build.rs:${READ_STMT ? READ_STMT.line : '?'})`;
  const SPAN = CODE.slice(SPAN_START, EMIT !== null ? EMIT.end + 1 : CODE.length);
  const SPAN_TEXT = TEXT.slice(SPAN_START, EMIT !== null ? EMIT.end + 1 : TEXT.length);

  /** **THE REGION THE ABORT CHECK READS.** Where the span opened at the version-key search, that region
   *  is THE WHOLE SPAN, and the manifest read's own panicking call — *"A MANIFEST THAT CANNOT BE READ
   *  PANICS AT `:70`–`:71`"*, declared and NOT re-cut (`package.md §6.1`'s tail clause) — stands OUTSIDE
   *  it, because it stands BEFORE it. Where the reader had to fall back to a POST-READ span (no
   *  statement carries the key's own name), the region DROPS THE SPAN'S FIRST STATEMENT, because a
   *  read/parse panic standing there is the same sanctioned panic and NOT state `(vii)`'s subject —
   *  **AND THE CELL SAYS WHICH REGION IT READ, SO A WIDER SPAN IS NEVER A SILENT WIDENING.** */
  const firstInSpan = STATEMENTS.find((st) => st.start >= SPAN_START) ?? null;
  const ABORT_FROM = (SEARCH_STMT === null && firstInSpan !== null) ? firstInSpan.end + 1 : SPAN_START;
  const SPAN_ABORT = CODE.slice(ABORT_FROM, EMIT !== null ? EMIT.end + 1 : CODE.length);
  const ABORT_REGION_NOTE = ABORT_FROM === SPAN_START
    ? 'the whole span'
    : `the span MINUS its first statement (build.rs:${firstInSpan.line}), which the POST-READ FALLBACK span opens on`;

  /** The span as a READER OF THE EVIDENCE must see it: `TEXT`, so the key, the directive and every
   *  message stand as the file spells them. `CODE` is the instrument's own view and is never printed. */
  const spanReport = () => `[span: ${SPAN_MODE}; ${SPAN.trim().length} characters from build.rs:${lineOf(SPAN_START)} `
    + `to build.rs:${EMIT ? EMIT.line : '?'}]\n  span: ${snippet(SPAN_TEXT, 420)}`;

  /** The transitive provenance of one binding, over THIS carrier's own statements. */
  const provenanceOf = (name) => {
    const seen = new Set();
    const rows = [];
    const queue = [name];
    let guard = 0;
    while (queue.length > 0 && guard < 60) {
      guard += 1;
      const n = queue.shift();
      if (seen.has(n)) continue;
      seen.add(n);
      const stmt = [...STATEMENTS].reverse().find((st) => st.end < (EMIT ? EMIT.start : CODE.length)
        && new RegExp(`\\b${n}\\b`).test(st.lhs));
      if (stmt === undefined) continue;
      rows.push({ name: n, line: stmt.line, rhs: stmt.text });
      for (const ident of stmt.rhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []) queue.push(ident);
    }
    return rows;
  };

  return {
    CODE, TEXT, STATEMENTS, READ_STMT, SEARCH_STMT, EMIT_SITES, EMIT, EMIT_BINDING,
    SPAN_START, SPAN_MODE, SPAN, SPAN_TEXT, SPAN_ABORT, ABORT_REGION_NOTE, ABORT_FROM,
    lineOf, depthAt, spanReport, provenanceOf,
  };
}

const CARRIER = readCarrier(readFileSync(BUILD_RS, 'utf8'));
const {
  CODE, TEXT, STATEMENTS, READ_STMT, SEARCH_STMT, EMIT_SITES, EMIT, EMIT_BINDING,
  SPAN, SPAN_TEXT, SPAN_START, SPAN_MODE, SPAN_ABORT, ABORT_REGION_NOTE, ABORT_FROM,
} = CARRIER;
const lineOf = CARRIER.lineOf;
const depthAt = CARRIER.depthAt;
const spanReport = CARRIER.spanReport;
const provenanceOf = CARRIER.provenanceOf;

/** **A READER THAT FOUND NOTHING MUST NEVER REPORT AN ABSENCE IT MANUFACTURED.** */
function assertReaderIsSaneOf(c) {
  assert.ok(c.READ_STMT !== null,
    'READER SANITY: the carrier must READ the manifest itself — no statement calling `read_to_string` was found in '
    + '`bindings/js/build.rs` (`release.md §2.4` item 1: the build script *"READS `bindings/js/package.json`\'s '
    + '`version` ITSELF"*). Observed: 0 statements whose right-hand side calls `read_to_string`.');
  assert.ok(c.EMIT !== null,
    `READER SANITY: no EMIT SITE of the directive \`${EMIT_PREFIX}\` was found in \`bindings/js/build.rs\` — ` +
    '`docs/specs/storeroom-js/package.md §6.1` item 2 / `release.md §6.10` item 1: the carrier EMITS that directive. '
    + 'Observed: 0 sites.');
  assert.ok(c.SPAN.trim().length > 40,
    `READER SANITY: the value-derivation span is degenerate (${c.SPAN.trim().length} characters), so an absence inside it `
    + `would be the instrument's and not the carrier's. Span: [${c.SPAN_MODE}]`);
}
const assertReaderIsSane = () => assertReaderIsSaneOf(CARRIER);

// =============================================================================================
// THE CELLS
// =============================================================================================

// ---------------------------------------------------------------------------------------------
// `R2-01` — `(vii-a)`: the `version` SLOT IS IDENTIFIED BY ITS OWN KEY — RED
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii)-a SOURCE :: R2-01 — the `version` SLOT is identified by its own key: the search can answer ABSENT, and the absent state is a STATE', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` — `PAR-PUB-35`'s **domain** (*"the string
  // `bindings/js/package.json`'s `version` field holds at BUILD TIME"*), its outside value `(vii)`
  // clause `(E)` (*"it is a read that produced no value at all"*) and its four-step operative clause,
  // step `(1)` (**THE DIRECTIVE *IS* EMITTED AT THIS STATE**); with `docs/specs/storeroom-js/package.md
  // §6.1`'s read-mechanism clause state `(iii)` and `release.md §6.10` item `2`'s parser-domain clause.
  // WHICH STEP IT READS: step `(1)`, at the state `(vii-a)`.
  //
  // **WHAT THE CLAUSE FIXES.** The stamped value must be THE `version` FIELD'S VALUE or a substitution
  // made FOR THAT SLOT, and the slot's absence must be a DISTINGUISHABLE STATE — otherwise a manifest
  // whose `version` key is absent cannot be told from a manifest that declares one, and the value
  // stamped is whatever the search happened to land on. **AND THE ROW'S OWN PARSER-DOMAIN CLAUSE PRINTS
  // THE SEARCH ITSELF**: `release.md §6.10` item `2` declares the carrier's read as *"the value after
  // the RIGHTMOST literal occurrence of the byte-sequence `"version"`"*, and its own words state what
  // that search does where the key is ABSENT: **a split iterator cannot answer `None`**, so the search
  // returns THE WHOLE TEXT and the following colon-split takes THE FIRST COLON OF THE FILE.
  //
  // **WHAT IS ASSERTED, AND WHY EACH HALF IS A CLAUSE AND NOT A PREFERENCE.**
  //   (A) the search must NOT be a TOTAL consumption of a split iterator (`rsplit(..).next()` /
  //       `split(..).next()`): such a construct is total BY CONSTRUCTION — with the key absent the
  //       splitter yields one item, the whole text — so NO ABSENT STATE EXISTS for the carrier to hold,
  //       and step `(1)`'s state cannot be reached as a state at all;
  //   (B) the absent state must be HELD AS A STATE inside the derivation: at least one branch in which
  //       the slot's absence is a value (`None`, `if let`, `else`, `match`, `unwrap_or`, `ok_or`).
  //       A carrier that asserts an absence away with `.expect(...)` standing on a search that can
  //       never fail has not held it.
  assertReaderIsSane();
  const observedSpan = spanReport();
  const failures = [];

  const TOTAL = TOTAL_SEARCH; // THE INSTRUMENT, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`)
  const total = TOTAL.exec(SPAN);
  if (total !== null) {
    const at = lineOf(SPAN_START + total.index);
    failures.push(`(A) THE SEARCH CANNOT ANSWER "ABSENT": the value derivation consumes a split iterator with \`.next()\`, which is `
      + `TOTAL BY CONSTRUCTION — with the key absent the splitter yields ONE item, THE WHOLE FILE TEXT, so no absent state `
      + `exists for the carrier to hold. observed at build.rs:${at}: \`${snippet(SPAN_TEXT.slice(total.index, total.index + total[0].length), 120)}\``);
  }

  const ABSENCE = ABSENCE_HELD; // THE INSTRUMENT, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`)
  if (!ABSENCE.test(SPAN)) {
    failures.push('(B) THE ABSENT STATE IS NOT HELD: the value-derivation span declares NO branch in which the slot\'s absence is a '
      + 'value — no `None`, no `if let`, no `else`, no `match`, no `unwrap_or`, no `ok_or`. The absent case is ASSERTED AWAY by a '
      + 'panicking call standing on a search that can never fail.');
  }

  assert.ok(failures.length === 0,
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` step `(1)` / `(E)` read with `PAR-PUB-35`\'s domain (*"the `version` FIELD"*) and '
    + '`release.md §6.10` item 2\'s parser-domain clause. DECLARED: the version SLOT IS IDENTIFIED BY ITS OWN KEY, and the slot\'s '
    + 'absence is a STATE the carrier can hold — `(vii)`\'s answer presupposes it (*"it is a read that produced no value at all"*), '
    + 'and `package.md §6.1`\'s read-mechanism clause state `(iii)` has the carrier emitting *"for whatever it read"*. '
    + `OBSERVED: ${failures.length} of this cell's 2 assertions fail.\n  ` + failures.join('\n  ') + '\n  ' + observedSpan);
});

// ---------------------------------------------------------------------------------------------
// `R2-02` — `(vii-b)`: a NON-STRING `version` neither aborts the build nor is stamped — RED
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii)-b SOURCE :: R2-02 — a NON-STRING `version` does not abort the build and is not stamped: the derivation consults the slot value\'s own shape', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` outside value `(vii)`, step `(1)` (**THE DIRECTIVE *IS*
  // EMITTED AT THIS STATE**) and step `(3)` read with clause `(C)` (*"ANY NON-STRING-FOR-STRING
  // SUBSTITUTION IS A MISMATCH: THE `version()` READ REFUSES AND THE GUARD `P-PUB-10` FAILS THE RUN"*,
  // with *"THE VALUE `(vii)` DECLARES IS NEVER THE NON-STRING"*), the row's own consequence sentence
  // (*"ONLY A DIRECTIVE-BEARING WRITE STANDS — an empty string or any other non-string-for-string
  // substitution"*), and the `R2` ruling: THE THIRD ANSWER — the build failure the reconciliation
  // clause named and left to the architect — **IS REFUSED**, so a panic is not this state's answer.
  // `docs/specs/storeroom-js/package.md §6.1` item `4`'s own words are the same shape: *"no error, no
  // warning, no directive omitted, no build failure"*.
  // WHICH STEP IT READS: steps `(1)` and `(3)`.
  //
  // **WHAT IS ASSERTED, AND WHY EACH HALF IS A CLAUSE.**
  //   (A) NO ABORTING CALL stands on the derivation path: a `.expect(..)`/`.unwrap()`/`panic!` aborts
  //       the build script, so NO DIRECTIVE IS EMITTED and NO ARTEFACT IS BUILT — which contradicts
  //       step `(1)` outright and leaves `version()` nothing to refuse, i.e. `(3)` unreachable. The
  //       clause's answer is a SUBSTITUTION, and a substitution is written where the read produced no
  //       string — never where the build died. **(THE MANIFEST-READ PANIC IS NOT THIS CELL'S SUBJECT:
  //       `package.md §6.1`'s tail clause declares that a manifest which cannot be read panics at the
  //       read, and that state is NOT `(vii)`, which is *"A MANIFEST THAT IS READABLE"*. The span opens
  //       AT the version-key search, so the read's own panicking call stands OUTSIDE it.)**
  //   (B) the derivation must CONSULT THE SLOT VALUE'S OWN SHAPE — some test of whether that value is a
  //       string — because `(C)`'s substitution exists only for a slot that holds no string: without
  //       such a consultation the carrier either extracts a non-string as if it were a string or skips
  //       to the next quoted token, and the stamped value is then a NEIGHBOURING KEY'S, not a
  //       substitution for this one.
  assertReaderIsSane();
  const observedSpan = spanReport();
  const failures = [];

  const ABORT = ABORT_ANYWHERE; // THE INSTRUMENT, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`)
  const abortFrom = ABORT_FROM;
  const hits = [...SPAN_ABORT.matchAll(new RegExp(ABORT.source, 'g'))].map((m) => ({ text: snippet(TEXT.slice(abortFrom + m.index, abortFrom + m.index + m[0].length), 40), line: lineOf(abortFrom + m.index) }));
  if (hits.length !== 0) {
    failures.push(`(A) THE BUILD IS ABORTED BEFORE THE DIRECTIVE: ${hits.length} aborting call(s) stand on the value-derivation path, `
      + `at build.rs:${hits.map((h) => h.line).join(', :')} (${hits.map((h) => `\`${h.text}\``).join(' ')}). A panic emits NO directive, `
      + 'so step `(1)` fails at this state and step `(3)` is unreachable — there is no stamped value for `version()` to refuse, which is '
      + 'the THIRD answer the architect\'s `R2` ruling refuses. [region read: ' + ABORT_REGION_NOTE + ']');
  }

  const SHAPE = SHAPE_CONSULTED; // THE INSTRUMENT, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`)
  if (!SHAPE.test(SPAN)) {
    failures.push('(B) THE SLOT\'S OWN VALUE IS NEVER CONSULTED FOR ITS SHAPE: the derivation holds no `starts_with`, no `as_str`, no '
      + '`is_string`, no `as_string`, no `as_bytes`, no `Value::String`, no JSON reader and no `get(..)`, so no substitution exists for a '
      + 'slot that holds no string — the value is taken by a QUOTE SCAN over text that runs PAST the slot, so a NON-STRING value stamps '
      + 'THE NEXT QUOTED TOKEN IN THE FILE (a neighbouring key\'s name).');
  }

  assert.ok(failures.length === 0,
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` step `(1)` (*"THE DIRECTIVE IS EMITTED AT THIS STATE"*) read with step `(3)`, its '
    + 'clause `(C)` (*"ANY NON-STRING-FOR-STRING SUBSTITUTION IS A MISMATCH: THE `version()` READ REFUSES AND THE GUARD `P-PUB-10` FAILS '
    + 'THE RUN"*, with *"THE VALUE `(vii)` DECLARES IS NEVER THE NON-STRING"*), the consequence sentence beside it (*"ONLY A '
    + 'DIRECTIVE-BEARING WRITE STANDS — an empty string or any other non-string-for-string substitution"*) and the architect\'s `R2` '
    + 'ruling. DECLARED: a NON-STRING `version` REACHES the directive — the carrier SUBSTITUTES for the slot, `version()` refuses, and '
    + 'the run fails at the guard; the build is NOT aborted and NO NEIGHBOURING KEY\'S VALUE IS STAMPED. '
    + `OBSERVED: ${failures.length} of this cell's 2 assertions fail.\n  ` + failures.join('\n  ') + '\n  ' + observedSpan);
});

// ---------------------------------------------------------------------------------------------
// `R2-06` — the VALUE LOCATOR reads only absence-scoped text — RED
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) SOURCE :: R2-06 — the value LOCATOR reads only ABSENCE-SCOPED text: no OTHER key\'s value is stamped where the slot holds no string', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` outside value `(vii)` clause `(C)` (*"THE STAMPED VALUE
  // ... IS WHATEVER THE CARRIER'S DECLARED READ PRODUCED FOR A `version` SLOT THAT HOLDS NO STRING"*)
  // read with `PAR-PUB-35`'s **domain** (*"the `version` FIELD"*) and `release.md §6.10` item `2`'s
  // parser-domain clause, whose own words are the measured defect: *"WHERE THAT PIN STILL HOLDS A
  // PREVIOUS VERSION THE ARTEFACT ANSWERS THAT STALE VALUE"* — a value that is NOT this field's.
  // WHICH STEP IT READS: step `(1)`/`(3)` at BOTH halves of the state, `(vii-a)` and `(vii-b)`.
  //
  // **WHAT IS ASSERTED.** Every step that LOCATES the value — a colon split and a quote scan — must be
  // fed text that the version-key search SCOPED, never text that may be THE WHOLE MANIFEST. The
  // property is stated as a data-flow fact over the carrier's own statements: a binding is
  // WHOLE-TEXT-POSSIBLE if it holds the manifest read, or if it is derived from a whole-text-possible
  // binding WITHOUT any step that answers `None` (an absence-scoped search whose absence is handled).
  // A locating step applied to a whole-text-possible binding is the defect: with the key absent the
  // colon taken is THE FIRST COLON IN THE FILE, so the value stamped is another key's.
  assertReaderIsSane();
  const observedSpan = spanReport();

  // **THE INSTRUMENT IS `locatorViolations`, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`).** The
  // locator is looked for in `TEXT` and not in `CODE`, because a COLON or a QUOTE is a CHAR LITERAL in
  // Rust (`':'`, `'"'`) and `CODE` blanks a char literal's body.
  const violations = locatorViolations(CARRIER);
  assert.ok(violations.length === 0,
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` clause `(C)` read with `PAR-PUB-35`\'s domain (*"the `version` FIELD"*) and '
    + '`release.md §6.10` item 2\'s parser-domain clause. DECLARED: at a slot that holds no string the carrier substitutes FOR '
    + 'THAT SLOT — *"NEVER THE NON-STRING"* and never another key\'s value; the value may not be located in text that may be '
    + `THE WHOLE MANIFEST. OBSERVED: ${violations.length} locating step(s) read WHOLE-TEXT-POSSIBLE text`
    + `${violations.length === 0 ? '' : `, at build.rs:${violations.map((v) => v.line).join(', :')}`} — with the \`version\` key `
    + 'ABSENT the unreachable-absence search returns THE WHOLE FILE, so the colon taken is THE FIRST COLON IN THE FILE and the '
    + 'value stamped is ANOTHER KEY\'S (the package NAME); with the value NON-STRING the same step stamps THE NEXT QUOTED '
    + 'TOKEN (a neighbouring key\'s NAME).\n'
    + `  observed: ${violations.map((v) => `build.rs:${v.line} [receiver \`${v.receiver}\` is WHOLE-TEXT-POSSIBLE] \`${v.text}\``).join('\n            ')}\n`
    + `  ${observedSpan}`);
});

// ---------------------------------------------------------------------------------------------
// `R2-03` — step `(1)`: the directive IS emitted at both states
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) step (1) SOURCE :: R2-03 — the directive IS EMITTED at both states: ONE emit site, standing UNCONDITIONAL', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` `(vii)` step `(1)` — *"THE DIRECTIVE **IS** EMITTED AT
  // THIS STATE — the carrier emits the directive for whatever it read, so THE BUILD SCRIPT'S OWN
  // EMISSION IS A FACT OF THE BUILD SCRIPT AND NOT OF THE MANIFEST'S SHAPE"* — read with clause `(A)`'s
  // supersession of the *"THE EMITTING ARM EMITS **NOTHING**"* limb and with the consequence sentence
  // beside it (*"ONLY A DIRECTIVE-BEARING WRITE STANDS"*); `package.md §6.1` read-mechanism clause state
  // `(iii)`; `release.md §6.10` item `3`'s supersession clause.
  // WHICH STEP IT READS: step `(1)`, at BOTH halves of the state.
  //
  // **THIS CELL HOLDS TODAY AND MUST KEEP HOLDING**: it is the cell that a fix which "solves" `(vii-b)`
  // by writing NOTHING for a non-string slot — leaving `option_env!` on `None` and handing the answer
  // to `(vi)` — would falsify. Its subject is the EMISSION ITSELF, and its instrument is the emitted
  // directive's own presence: the emit site must exist, it must be the ONLY one (so no second, silent
  // path answers the state), and it must stand at the derivation's own statement depth, i.e. OUTSIDE
  // any conditional that could skip it.
  assertReaderIsSane();

  assert.equal(EMIT_SITES.length, 1,
    `CLAUSE \`parameter-semantics.md §5.1\` \`(vii)\` step \`(1)\`. DECLARED: THE DIRECTIVE IS EMITTED AT THIS STATE. OBSERVED: `
    + `${EMIT_SITES.length} emit site(s) of \`${EMIT_PREFIX}\` in \`bindings/js/build.rs\` — the superseded reading the row`
    + ` refuses ("DIRECTIVE NOT EMITTED · \`None\` TAKEN · ANSWER \`(vi)\` GOVERNS") is the reading of a carrier whose state `
    + `\`(vii)\` write is not directive-bearing. Sites: ${EMIT_SITES.map((s) => `build.rs:${s.line}`).join(', ') || 'none'}`);

  assert.equal(EMIT.depth, depthAt(READ_STMT.start),
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` step `(1)` read with clause `(A)` and its consequence sentence. DECLARED: the '
    + 'directive is emitted at this state, i.e. NO PATH THROUGH THE DERIVATION REACHES THE END WITHOUT IT — the emission is not '
    + `guarded. OBSERVED: the emit site stands INSIDE a conditional (brace depth ${EMIT.depth} at build.rs:${EMIT.line}) while the `
    + `manifest read stands at depth ${depthAt(READ_STMT.start)} (build.rs:${READ_STMT.line}) — a branch exists that can skip the `
    + 'directive, which is the superseded "writes nothing" shape the row refuses by name.');
});

// ---------------------------------------------------------------------------------------------
// `R2-04` — step `(2)`: the `None` arm is NOT taken at either state
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) step (2) SOURCE :: R2-04 — the `None` arm is NOT taken at either state: the stamped value\'s provenance is the MANIFEST, never the crate version', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` `(vii)` step `(2)` — *"THE `None` ARM IS **NOT** TAKEN
  // AND THE CRATE'S `Cargo.toml` VERSION IS **NOT** THE STAMPED VALUE AT THIS STATE"* — read with
  // `package.md §6.1` item `3` (the precedence: the manifest wins wherever it can be read, and the
  // crate version *"reproduces this unit's defect exactly"*) and its read-mechanism clause (`None` is
  // taken ONLY where the directive was not emitted at all), with `release.md §6.10` item `2` and with
  // `docs/specs/storeroom-publish/contract.md §5.0a`'s first failure member (*"a released artefact whose
  // `version()` answers the crate's `Cargo.toml` version"*).
  // WHICH STEP IT READS: step `(2)`, at BOTH halves of the state.
  //
  // **THIS CELL HOLDS TODAY AND MUST KEEP HOLDING.** It is asserted by THE EMITTED DIRECTIVE'S OWN
  // PRESENCE and by the provenance of the binding it carries — NOT by reasoning about `option_env!`
  // and not by driving anything. Its teeth face the one wrong fix that would green `R2-02`: a carrier
  // that answers a non-string slot with the crate's version, which is precisely the answer `(vi)`
  // governs and which `(2)` refuses at this state.
  assertReaderIsSane();

  const chain = provenanceOf(EMIT_BINDING);
  const fallbackRows = chain.filter((r) => /CARGO_PKG_VERSION|Cargo\.toml/.test(r.rhs));
  assert.equal(fallbackRows.length, 0,
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` step `(2)` read with `package.md §6.1` item `3`. DECLARED: at this state the '
    + 'crate\'s `Cargo.toml` version is NOT the stamped value — the directive was emitted, so `None` is not taken and `(vi)` does '
    + `not govern. OBSERVED: the emit interpolates \`${EMIT_BINDING}\`, whose provenance reaches \`CARGO_PKG_VERSION\`/\`Cargo.toml\` `
    + `at build.rs:${fallbackRows.map((r) => r.line).join(', :')}.\n  chain: `
    + chain.map((r) => `build.rs:${r.line} [${r.name}]`).join(' ← '));

  assert.equal(/env::var(?:_os)?\s*\(\s*"STOREROOM_JS_PACKAGE_VERSION"/.test(TEXT), false,
    'CLAUSE `parameter-semantics.md §5.1` `(vii)` step `(2)` read with `release.md §2.4` item `1` and `package.md §6.1` item `2`. '
    + 'DECLARED: the value the directive carries is the one THIS BUILD read from the manifest; the directive is a TRANSPORT and '
    + 'never a source set from outside the build. OBSERVED: the carrier CONSULTS THE AMBIENT ENVIRONMENT for the directive\'s own '
    + `name (\`${DIRECTIVE}\`), so the stamped value could be supplied from outside this build — the refused workflow-env form.`);
});

// ---------------------------------------------------------------------------------------------
// `R2-07` — state `(v)`: the EMPTY string is a value that was read
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (v) SOURCE :: R2-07 — the EMPTY string is a VALUE THAT WAS READ: no fallback and no emptiness test stands in the derivation', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1`'s outside value `""` → **REFUSED: *"it is a member of
  // the version read\'s own mismatch set ... the STAMP MUST NOT FALL BACK FROM IT — an empty string is
  // a value that WAS READ, not a manifest that could not be read"***; `package.md §6.1` item `5` (the
  // empty case); `release.md §6.10` item `3`; and `contract.md §5.0a`'s failure member *"a carrier that
  // falls back from an EMPTY string"*.
  // WHICH STEP IT READS: none of the four — this is the OTHER state the row distinguishes, and it is
  // carried here because `(vii)`'s DERIVATION TURNS ON THE DISTINCTION (`(E)`: *"A READABLE `""` IS
  // STILL A VALUE THAT WAS READ WITH NO FALLBACK, and this state is not that one"*). A carrier that
  // treats an empty value as absent breaks the distinction the `(vii)` answer is derived from.
  //
  // **THIS CELL HOLDS TODAY AND MUST KEEP HOLDING.** It is a SOURCE assertion: no emptiness test and
  // no fallback stands in the value derivation.
  assertReaderIsSane();

  const EMPTINESS = EMPTINESS_TEST; // THE INSTRUMENT, SHARED WITH ITS NEGATIVE CONTROL (`R2-08`)
  const hit = EMPTINESS.exec(SPAN);
  assert.ok(hit === null,
    'CLAUSE `parameter-semantics.md §5.1` (outside value `""`) read with `package.md §6.1` item `5` / `release.md §6.10` item `3`. '
    + 'DECLARED: where the manifest reads `""` the stamped value IS the empty string and NO fallback runs — the empty string is '
    + 'a value that WAS read, so it is not the absent case. OBSERVED: the value derivation tests the value for EMPTINESS'
    + `${hit === null ? '' : ` at build.rs:${lineOf(SPAN_START + hit.index)} (\`${snippet(hit[0], 60)}\`)`}, which is the test a `
    + 'fallback from a PRESENT value would be hung on — the widening `(b)` was refused for.\n  ' + spanReport());
});

// ---------------------------------------------------------------------------------------------
// `R2-05` — THE CONTROL: the real manifest still stamps its own `version`, character for character
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (i) DRIVEN :: R2-05 — THE CONTROL: the real manifest still stamps its OWN `version`, character for character', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` — the row's **observable**, *"the artefact's own
  // `version()`, returned through the facade"*, and its **domain**, *"the string
  // `bindings/js/package.json`'s `version` field holds at BUILD TIME — character for character"* — read
  // with `contract.md §5.0a` (`P-PUB-9`: *"every released native artefact's `version()` answers the
  // main package manifest's `version` CHARACTER FOR CHARACTER"*) and `package.md §6.1` item `1`.
  // WHICH STEP IT READS: none — it is the HAPPY PATH, state `(i)`, and it is the control the red set
  // owes: **a red set that cannot show the correct path intact is a red set that a wrong fix would
  // satisfy.** It is a DRIVEN cell because state `(i)` is not a source-level refusal: `A95`'s
  // prohibition reaches refusals whose falsifier is the source, and this cell asserts the answer of the
  // artefact's own read instead.
  //
  // **IT DRIVES NO RELEASE LEG AND BUILDS NOTHING**: it loads the host target's own build product
  // (`distribution.md §3.1`: *"NO BINARY IS EVER COMMITTED"*, so the file is a gitignored build
  // product) and calls the declared observable. **ITS ABSENCE IS REPORTED AS A NAMED SKIP WITH ITS
  // REASON AND NEVER AS A PASS.**
  const occurrences = (readFileSync(MANIFEST_PATH, 'utf8').match(/"version"/g) ?? []).length;
  assert.equal(occurrences, 1,
    'CLAUSE `release.md §6.10` item `2`\'s parser-domain clause, whose own instrument this control re-runs: *"THE BYTE-SEQUENCE '
    + '`"version"` OCCURS EXACTLY ONCE IN THIS MANIFEST — `grep -c \'"version"\' bindings/js/package.json` returns `1`, at line '
    + `\`3\`"*. OBSERVED: ${occurrences} occurrence(s) — the correct path this control certifies is then not the path the clause `
    + 'declared, so the control reports the divergence instead of certifying a shape the clause does not carry.');

  if (!existsSync(BUILT_ARTEFACT)) {
    console.log('[version-stamp-r2] SKIP R2-05 the control — no artefact at ' + BUILT_ARTEFACT
      + ': the tracked tree carries no binary (`distribution.md §3.1`) and this pass runs no `cargo`. '
      + 'REBUILD TO MAKE THIS CONTROL ACTIVE.');
    return;
  }
  const require_ = createRequire(import.meta.url);
  const native = require_(BUILT_ARTEFACT);
  assert.equal(typeof native.version, 'function',
    '`contract.md §5.0a`: a `version` that is not callable at all is a member of the failure list, so the artefact\'s own read '
    + 'must be callable. OBSERVED: the loaded artefact exposes no callable `version`.');
  const answer = native.version();
  assert.equal(typeof answer, 'string',
    '`parameter-semantics.md §5.1` (outside value: *"a stamped value that is not a `string` at the artefact\'s own export"* → '
    + `REFUSED) / \`contract.md §5.0a\`. DECLARED: a semantic version string, the exact string the manifest carries. OBSERVED: `
    + `\`typeof version() === '${typeof answer}'\` (${JSON.stringify(answer)}).`);
  assert.equal(answer, MANIFEST_VERSION,
    'CLAUSE `parameter-semantics.md §5.1` domain + `contract.md §5.0a`. DECLARED: the artefact\'s `version()` answers the package '
    + `manifest\'s \`version\` CHARACTER FOR CHARACTER. OBSERVED: artefact=${JSON.stringify(answer)} `
    + `(${[...answer].length} characters), manifest=${JSON.stringify(MANIFEST_VERSION)} (${[...MANIFEST_VERSION].length} characters).`);
  assert.notEqual(answer, CRATE_VERSION,
    'CLAUSE step `(2)` at state `(i)` read with `release.md §6.10` item `2`: the crate\'s `Cargo.toml` version is the `None` arm\'s '
    + `value and is NOT the stamped value wherever the manifest could be read. OBSERVED: the artefact answers the crate's own `
    + `version (${JSON.stringify(CRATE_VERSION)}), which is \`DEF-19\` reproduced — a fallback-sourced artefact.`);
  console.log(`[version-stamp-r2] R2-05 DRIVEN (the control): artefact version()=${JSON.stringify(answer)} `
    + `(${[...answer].length} chars), manifest=${JSON.stringify(MANIFEST_VERSION)} (${[...MANIFEST_VERSION].length} chars), `
    + `crate=${JSON.stringify(CRATE_VERSION)} — the correct path is intact.`);
});

// ---------------------------------------------------------------------------------------------
// `R2-08` — THE INSTRUMENTS' OWN TEETH: the CORRECT PATH is ADMITTED, and every guard FIRES on the
// mutation it exists to catch
// ---------------------------------------------------------------------------------------------
/** **A SYNTHETIC CARRIER THAT CARRIES THE CLAUSE'S OWN ANSWER** — the shape `(vii)`'s four steps and
 *  clause `(C)` require, written the way a build script would write it: it reads the manifest itself,
 *  identifies the slot by its own key, CONSULTS THE SLOT VALUE'S OWN SHAPE, holds the absence as a
 *  state, substitutes for a slot that holds no string, and emits ONE UNCONDITIONAL directive.
 *  **THE SUBSTITUTION'S SPELLING IS THE TEMPLATE'S AND IS ASSERTED NOWHERE**: the clause fixes THAT a
 *  substitution is stamped and does NOT fix its spelling, so no cell of this set reads it. */
function syntheticCarrier({ shapeTest = true, emptinessTest = false, emitGuard = false, totalSearch = false } = {}) {
  const inner = shapeTest
    ? ['                match text.strip_prefix(\'"\') {',
       '                    Some(body) => match body.find(\'"\') {',
       '                        Some(end) => body[..end].to_string(),',
       '                        None => String::new(),',
       '                    },',
       '                    None => String::new(),',
       '                }']
    : ['                match text.find(\'"\') {',
       '                    Some(end) => text[..end].to_string(),',
       '                    None => String::new(),',
       '                }'];
  const emit = '    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");';
  return [
    'fn main() {',
    '    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set by cargo for every build script");',
    '    let declared = fs::read_to_string(format!("{manifest}/package.json"))',
    '        .expect("the sibling manifest is readable");',
    ...(totalSearch
      ? ['    let tail = declared.rsplit("\\"version\\"").next().expect("the manifest declares a `version` field");',
         '    let rest = tail.split_once(\':\').expect("the `version` field is a key with a value").1;',
         '    let version = rest.trim_start();']
      : ['    let version = match declared.split_once("\\"version\\"") {',
         "        Some((_, rest)) => match rest.split_once(':') {",
         '            Some((_, value)) => {',
         '                let text = value.trim_start();',
         ...inner,
         '            }',
         '            None => String::new(),',
         '        },',
         '        None => String::new(),',
         '    };']),
    ...(emptinessTest ? ['    let version = if version.is_empty() { String::new() } else { version };'] : []),
    ...(emitGuard ? ['    if declared.len() > 0 {', `    ${emit}`, '    }'] : [emit]),
    '}',
    '',
  ].join('\n');
}

test('THE R2 INSTRUMENTS\' OWN TEETH :: R2-08 — a LAWFUL carrier is ADMITTED by every guard, and each guard FIRES on the mutation it exists to catch', () => {
  // **WHY THIS CELL EXISTS, IN `A95`'S OWN TERMS.** `A95` allows a SOURCE-LEVEL refusal to stand on the
  // source rather than on a run, PROVIDED it names that layer — and a guard that cannot fail is worth
  // nothing as firability. **SO THIS CELL DRIVES EACH OF THE INSTRUMENTS — the SAME NAMED PREDICATES THE
  // CLAUSE CELLS RUN — AGAINST (a) A SYNTHETIC CARRIER THAT CARRIES THE CLAUSE'S OWN ANSWER, and (b)
  // MUTATED COPIES OF THE REAL CARRIER, ONE MUTATION PER GUARD.** No clause is decided here; the
  // instruments are, and the cell is green today because a correct instrument admits the correct path
  // and refuses the wrong ones.
  //
  // **EVERY MUTATION IS A CARRIER OF THIS CELL'S OWN MAKING, AND NONE OF THEM IS THE REAL CARRIER**: a
  // battery that took the real carrier as its red mutation would turn RED ITSELF the moment the
  // correction lands, and would then be a control that punishes the fix. `M1` and `M2` are spliced into
  // the real carrier's own bytes at the offsets THIS FILE'S READER found — so they are anchored to
  // whatever the carrier BECOMES and not to the spelling it has today — while `M3`–`M6` are knobs of the
  // synthetic.
  const REAL = readFileSync(BUILD_RS, 'utf8');

  const LAWFUL = syntheticCarrier({});
  const lawful = readCarrier(LAWFUL);
  assertReaderIsSaneOf(lawful); // the synthetic is read by the SAME reader, or nothing below means anything

  const admissions = [
    ['R2-01(A) no TOTAL rightmost-occurrence search', !TOTAL_SEARCH.test(lawful.SPAN)],
    ['R2-01(B) the absence is HELD AS A STATE', ABSENCE_HELD.test(lawful.SPAN)],
    ['R2-02(A) NO aborting call on the derivation path', !ABORT_ANYWHERE.test(lawful.SPAN)],
    ['R2-02(B) the slot value\'s OWN SHAPE is consulted', SHAPE_CONSULTED.test(lawful.SPAN)],
    ['R2-03 ONE emit site, standing UNGUARDED', emitSiteCount(lawful) === 1 && !emitIsGuarded(lawful)],
    ['R2-04 the provenance is the MANIFEST (no crate version, no ambient read)',
      fallbackRowsInProvenance(lawful).length === 0 && !ambientReadOfDirective(lawful)],
    ['R2-06 every value LOCATOR reads ABSENCE-SCOPED text', locatorViolations(lawful).length === 0],
    ['R2-07 NO emptiness test on the value', !EMPTINESS_TEST.test(lawful.SPAN)],
  ];

  // **EACH MUTATION DIFFERS FROM THE ADMITTED SHAPE IN ONE RESPECT**, and names the guard it must trip.
  const mutations = [
    ['M1 → R2-03', syntheticCarrier({ emitGuard: true }),
      (c) => emitIsGuarded(c), 'the directive stands INSIDE a conditional — the "writes NOTHING" path'],
    ['M2 → R2-04', REAL.slice(0, EMIT.start)
      + `    let ${EMIT_BINDING} = env!("CARGO_PKG_VERSION").to_string();\n` + REAL.slice(EMIT.start),
      (c) => fallbackRowsInProvenance(c).length > 0, 'the stamped value is taken from the crate version — the `None` arm'],
    ['M3 → R2-07', syntheticCarrier({ emptinessTest: true }),
      (c) => EMPTINESS_TEST.test(c.SPAN), 'a fallback from an EMPTY string — the widening `(b)` the row refused'],
    ['M4 → R2-02(B)', syntheticCarrier({ shapeTest: false }),
      (c) => !SHAPE_CONSULTED.test(c.SPAN), 'no consultation of the slot value\'s own shape'],
    ['M5 → R2-01(A)', syntheticCarrier({ totalSearch: true }),
      (c) => TOTAL_SEARCH.test(c.SPAN), 'the TOTAL rightmost-occurrence search — the shape `release.md §6.10` item 2 declares, and the one today\'s carrier carries'],
    ['M6 → R2-06', syntheticCarrier({ totalSearch: true }),
      (c) => locatorViolations(c).length > 0, 'a value LOCATOR reading WHOLE-TEXT-POSSIBLE text — THE SAME ONE-RESPECT MUTATION as `M5`: the total search is what makes the locator whole-text-possible, and the two guards divide that one defect between them'],
  ];

  const failed = [];
  for (const [id, what] of admissions) if (!what) failed.push(`THE LAWFUL CARRIER IS REFUSED BY ${id}: a guard that refuses the clause's own answer would block the correction it exists to serve.`);
  const fired = [];
  for (const [id, source, fires, what] of mutations) {
    const carried = readCarrier(source);
    if (!fires(carried)) failed.push(`${id} DID NOT FIRE ON ITS OWN MUTATION: ${what}. A guard that cannot fail is not firability.`);
    else fired.push(id);
  }

  console.log(`[version-stamp-r2] R2-08 THE INSTRUMENTS: ${admissions.length - failed.length}/${admissions.length} `
    + `guards ADMIT the lawful carrier; ${fired.length}/${mutations.length} guards FIRE on their mutation (${fired.join(', ')}).`);

  assert.ok(failed.length === 0,
    'THE R2 INSTRUMENTS\' OWN TEETH — `A95` read with `parameter-semantics.md §5.1` `(vii)`: firability is satisfied by '
    + 'source-assertion cells, and a source-assertion cell is worth only what its instrument can separate. Declared: every '
    + 'guard above ADMITS a carrier that carries the clause\'s own answer and FIRES on the mutation it exists to catch. '
    + `OBSERVED: ${failed.length} of ${admissions.length + mutations.length} instrument checks fail.\n  ` + failed.join('\n  '));
});
