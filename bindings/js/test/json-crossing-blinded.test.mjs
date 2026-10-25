// `json-crossing-blinded.test.mjs` — **THE BLIND GREENS SET FOR `U-STOREROOM-JSON-CROSSING`**, authored by
// `role_blind_test_writer` from the DOCUMENTATION ALONE. Its cells are the cells of
// `docs/specs/storeroom-json-crossing-greens.md`, one `test()` per cell, and the id printed at the head of
// each test name is that document's cell id.
//
// **NO BYTE OF THE IMPLEMENTATION WAS READ.** The inputs read for every expectation below were:
//   · `docs/specs/storeroom-json-crossing/contract.md` `§1`–`§9` (the admitted tree, the sixteen class rows,
//     the copy discipline, the refusal form, the typed register, the residue table);
//   · `docs/specs/storeroom-json-crossing/parameter-semantics.md` `§1`–`§6`;
//   · `docs/specs/storeroom-json-crossing/test-cases.md` `§1`–`§6`;
//   · `docs/specs/storeroom-js/crossing.md` — the 2026-10-23 AMENDMENT BLOCK AT ITS HEAD (the bare JSON
//     tree, the sixteen classes answering `ValueRefusedAtBoundary`, the crate's ceilings depth `128` /
//     nodes `1,000,000`, and the READING INSTRUCTION: where the older text prints `64` read `128`, `65` read
//     `129`, `66` read `130`) and its `§1.2` rows `1`–`13`;
//   · `docs/decisions.md` · `A147`, `A148` and `A140` as amended;
//   · `docs/specs/storeroom-native/contract.md` `§8.1` (the widened 17-member closed set, `ValueRefusedAtBoundary`
//     at rank `17`) and `§8.2` (the generator's row for that code and its message's PROVENANCE clause);
//   · `docs/specs/storeroom-js/surface.md` `§2.5` (the one thrown form) — read only for the form's members.
//
// **⟶ AMENDED 2026-10-23 (`A149`, ACTIVE, filed as `DEF-2026-10-23-A`) — THE CEILING EXPECTATIONS OF THIS FILE ARE
// RE-DERIVED BY THE OPERATIVE LAW, AND THE PARAGRAPH ABOVE STANDS BYTE-FOR-BYTE AS THE RECORD OF WHAT WAS READ
// BEFORE IT.** **The architect's two rulings of 2026-10-23 (*"Adopt 126 on both routes"*; *"Re-derive the range to
// `0…999,999`"*) move the CROSSING'S OPERATIVE ADMISSION BOUND to the STORE'S PERSISTENT one, so the three cells
// that stand at the boundary (`JC-B54`, `JC-B55`, `JC-B56`) are driven here at `126` ADMITTED / `127` REFUSED at
// the walk and at `999,999` ADMITTED / `1,000,000` REFUSED.** The authorities read for the re-derivation — and for
// nothing else, no byte of the implementation having been read — are: `docs/decisions.md` · `A149`;
// `docs/specs/storeroom-json-crossing/contract.md` `§4`'s `⟶ AMENDED 2026-10-23 (A149)` clause and its register
// rows `7`/`8` in `§8`; `docs/specs/storeroom-json-crossing/parameter-semantics.md` `§1` rows `7`/`8` with that
// part's `§4` clause of the same date; and `docs/specs/storeroom-json-crossing/test-cases.md` `JC-TC-09` /
// `JC-TC-27` / `JC-TC-42` with that part's `§6` clause of the same date. **The crate's `128` and `1,000,000` are
// read as the CONVERSION's own bounds and are no admission bound from this date** (`contract.md §8`'s clause of
// 2026-10-23). **No other cell's expectation moves, no cell is added and none is removed: the set stays at `67`.**
//
// ⟶ **RECONCILED 2026-10-24 — THE `2026-10-23` MARKER CARRIED BY THIS CLAUSE DENOTES A `2026-10-24` LANDING, AND
// THE CLAUSE STANDS AS FILED.** The marker is one day early: the landing it records is this unit's own of
// 2026-10-24 (the ground — source edit `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`). The
// marker digits are NOT re-pointed in place and no sentence above is rewritten: the clause is cited elsewhere BY
// THAT DATE, so moving it would break the resolving citations rather than repair anything. **NO CELL, EXPECTATION
// OR ASSERTION OF THIS FILE IS TOUCHED BY THIS RECONCILIATION, and the set's census stays at `67`.** The five
// clause sites below (near `:90`, `:705`, `:725`, `:746` and `:775`) each carry the shorter pointer line of the
// same reconciliation.
//
// The package (`bindings/js/index.mjs`, reached through its own registry identity `provident-storeroom`) is
// **IMPORTED AND DRIVEN AS A BLACK BOX** — never read. `bindings/js/test/` was consulted for the driving
// CONVENTIONS only (`node:test` + `node:assert/strict`, `storeCreate` + instance methods), never for any
// expectation.

import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from 'provident-storeroom';

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// 0. THE DECLARED SPELLINGS THIS FILE READS FROM THE DOCUMENTS, EACH WITH ITS CLAUSE
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **PART ONE of every refusal message is the STORE generator's own bytes** — `contract.md §2.1`,
// `parameter-semantics.md §3` item 1, `storeroom-native/contract.md §8.2`'s `ValueRefusedAtBoundary` row and
// its 2026-10-23 provenance clause. The generator supplies the surrounding single quotes for `<subject>`;
// the package adds no second quoting, and no `<CONTAINER>` slot is used by this code's row.
const PART_ONE =
  'is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays';

// **PART TWO is the package's appended clause** — `contract.md §2.1`, `parameter-semantics.md §3` item 2:
// `, the value at <position> is <class>`, where `<class>` is one of the sixteen exact spellings of
// `contract.md §2` and `<position>` is the position spelling of `parameter-semantics.md §2`.
const PART_TWO = (position, cls) => `, the value at ${position} is ${cls}`;

// **THE POSITION MAPPING** — `parameter-semantics.md §2`: the root is `the write's value argument`; below it
// `member <path> of the write's value argument`, the path's segments joined by `/` with each string key
// single-quoted and each array index BARE.
const ROOT_POSITION = "the write's value argument";
const memberPosition = (...segments) =>
  `member ${segments.map((s) => (typeof s === 'number' ? String(s) : `'${s}'`)).join('/')} of ${ROOT_POSITION}`;

// **THE SIXTEEN CLASS SPELLINGS** — `contract.md §2`'s table, verbatim, and no seventeenth spelling exists.
const CLASS = {
  null: 'null',
  undefined: 'undefined',
  function: 'a function',
  symbol: 'a symbol',
  symbolKey: 'a value carrying a Symbol-keyed own member',
  bigint: 'a bigint',
  nonFinite: 'a non-finite number',
  ceiling: 'a value over the walk ceiling',
  loneSurrogate: 'a string carrying a lone surrogate',
  cyclic: 'a value that contains itself',
  proxy: 'a Proxy',
  arraySubclass: 'a class extending Array',
  nonPlain: 'a class instance or another prototype-carrying non-plain object',
  accessor: 'a value carrying an own accessor member',
  sparse: 'a sparse array',
};

// **THE CEILINGS — `parameter-semantics.md §1` rows 7–8 / `contract.md §8` rows 7–8, RE-DERIVED 2026-10-23 by
// `A149`** (`contract.md §4`'s clause of that date, items (1)–(3); `parameter-semantics.md §4`'s clause of that
// date, items (1)–(2); `test-cases.md JC-TC-09`/`JC-TC-27`/`JC-TC-42` and its `§6` clause of that date).
//
// **THE OPERATIVE ADMISSION BOUND IS THE STORE'S PERSISTENT ONE AND NOT THE CRATE'S CONVERSION BOUND:**
// `ENCODER_CEILING` is `126` on BOTH routes and a value of `1,000,000` nodes is refused, while the crate's `128`
// and `1,000,000` remain the CONVERSION's own bounds and are no admission bound from this date.
// ⟶ **RECONCILED 2026-10-24 — the `2026-10-23` marker above denotes a `2026-10-24` landing (source edit
// `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`) and THE CLAUSE STANDS AS FILED** — the marker
// is cited elsewhere and is not re-pointed, and the four figures below it are unmoved (see the file head).
const ENCODER_CEILING = 126; // the highest ADMITTED walk depth (`A149` (1))
const OVER_DEPTH = ENCODER_CEILING + 1; // `127` — refused at the walk, before any store verb (`A149` (2))
const ADMITTED_NODES = 999999; // the declared admitted range's last value; the root consumes the crate's first node (`A149` (3))
const OVER_NODES = ADMITTED_NODES + 1; // `1,000,000` — refused as the SAME class and status (`A149` (3))

// `parameter-semantics.md §1` row 1 / `contract.md §8` row 1: the admitted tree's own five classes.
const instance = () => storeCreate({ journalLength: 8, listeners: [] });

/** **A STORE PATH OF THIS RUN'S OWN** — the driving vehicle of the two boundary cells that must reach the
 *  PERSISTENT image: `JC-B54` (`A149` (1): a `126`-deep value *"commits and reopens intact"*) and `JC-B55`
 *  (`A149` (2): `127` is refused *"before any store verb"*, so no byte of it stands at the path).
 *  The construction argument is the `cfg` of `docs/specs/storeroom-js/surface.md §2.1` (`filePath` ·
 *  `journalLength` · `listeners`), and the `file` tier is the tier whose write reaches that path —
 *  **but `contract.md §1`'s subject caption places carriers and tiers, the file tier's own JSON included,
 *  OUTSIDE this contract: the tier is HOW this set reaches the settled state, never an expectation it asserts.** */
function freshStorePath() {
  return join(mkdtempSync(join(tmpdir(), 'json-crossing-blinded-')), 'state.json');
}

/** A store over `freshStorePath()` — the instance whose write is meant to settle. */
const pathBackedInstance = (filePath) => storeCreate({ filePath, journalLength: 4, listeners: [] });

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// 1. THE HELPERS — every one of them a restatement of a declared clause, none of them an expectation
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/** Run `fn` and report the refusal it threw, if it threw one (`surface.md §2.5` item 3: the failure is
 *  THROWN and never returned). */
function attempt(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (error) {
    return { threw: true, error };
  }
}

/** The ONE refusal form — `contract.md §2.1` (*"the refusal travels inside the one `{status, message}`
 *  object"*), `surface.md §2.5` items 1–3. The two members asserted here are the two every reading of the
 *  form carries; the form's ARITY is a declared drift this set records at `JC-B66` and asserts nowhere. */
function assertRefusalForm(error, label) {
  assert.ok(error !== null && typeof error === 'object', `${label}: the refusal must be an OBJECT; got ${typeof error}`);
  assert.ok(
    Object.getPrototypeOf(error) === Object.prototype || Object.getPrototypeOf(error) === null,
    `${label}: the refusal's prototype is the caller realm's \`Object.prototype\` (\`surface.md §2.5\` item 3)`,
  );
  assert.equal(typeof error.status, 'string', `${label}: the refusal carries a string \`status\` member`);
  assert.equal(typeof error.message, 'string', `${label}: the refusal carries a string \`message\` member`);
  assert.ok(error.message.length > 0, `${label}: \`message\` is never empty (\`surface.md §2.5\` item 2)`);
}

/** The sixteen-class refusal — `contract.md §2` (status), `§2.1` (the two message parts),
 *  `parameter-semantics.md §2` (the position) and `§3` (the assembly). */
function assertClassRefusal(result, { cls, position }, label) {
  assert.ok(result.threw, `${label}: the value is REFUSED at the package's walk, so the call must throw; it returned ${describe(result.value)}`);
  assertRefusalForm(result.error, label);
  assert.equal(result.error.status, 'ValueRefusedAtBoundary', `${label}: the status is rank \`17\``);
  assert.ok(
    result.error.message.includes(PART_ONE),
    `${label}: PART ONE is the store generator's own bytes — ${JSON.stringify(PART_ONE)}; got ${JSON.stringify(result.error.message)}`,
  );
  const tail = PART_TWO(position, cls);
  assert.ok(
    result.error.message.endsWith(tail),
    `${label}: PART TWO is appended beside PART ONE — expected the message to end with ${JSON.stringify(tail)}; got ${JSON.stringify(result.error.message)}`,
  );
}

// **A VALUE POSITION, as `parameter-semantics.md §2` defines the term** — *"the written value itself, a
// member value reached by the walk, or an array element"* — with its path's segments joined by `/`, each
// string key single-quoted and each array index BARE. A class whose `contract.md §2` position column reads
// `value` is answered at SOME value position; the docs do not demand that it be the root, so a cell that
// derives from that column accepts the root or a member path and refuses nothing else.
function isDeclaredValuePosition(position) {
  if (position === ROOT_POSITION) return true;
  const prefix = 'member ';
  const suffix = ` of ${ROOT_POSITION}`;
  if (!position.startsWith(prefix) || !position.endsWith(suffix)) return false;
  const path = position.slice(prefix.length, position.length - suffix.length);
  if (path.length === 0) return false;
  return path.split('/').every((segment) => segment.length > 0 && segment !== 'undefined');
}

/** The sixteen-class refusal AT SOME DECLARED VALUE POSITION — `contract.md §2`'s position column (`value`)
 *  read with `parameter-semantics.md §2`'s definition of a value position. */
function assertClassRefusalAtValuePosition(result, cls, label) {
  assert.ok(result.threw, `${label}: the value is REFUSED; the call returned ${describe(result.value)}`);
  assertRefusalForm(result.error, label);
  assert.equal(result.error.status, 'ValueRefusedAtBoundary', `${label}: the status is rank \`17\``);
  assert.ok(
    result.error.message.includes(PART_ONE),
    `${label}: PART ONE is the store generator's own bytes; got ${JSON.stringify(result.error.message)}`,
  );
  const marker = ', the value at ';
  const at = result.error.message.lastIndexOf(marker);
  assert.ok(at >= 0, `${label}: PART TWO is appended beside PART ONE; got ${JSON.stringify(result.error.message)}`);
  const tail = result.error.message.slice(at + marker.length);
  const suffix = ` is ${cls}`;
  assert.ok(tail.endsWith(suffix), `${label}: PART TWO names the class \`${cls}\`; got ${JSON.stringify(tail)}`);
  const position = tail.slice(0, tail.length - suffix.length);
  assert.ok(
    isDeclaredValuePosition(position),
    `${label}: PART TWO names a DECLARED value position (\`parameter-semantics.md §2\`); got ${JSON.stringify(position)}`,
  );
}

/** A printable spelling of a value the crossing may be handed, for failure messages only. */
function describe(value) {
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'symbol') return String(value);
  if (typeof value === 'function') return 'a function';
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/** The value tree's own equality — `contract.md §1`: an object's member SET is what matters (member order is
 *  not significant, array order IS), and a number is compared with `Object.is` so a sign of zero is a
 *  difference (`§4`'s `-0` clause). Prototypes are not part of the tree. */
function sameTree(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a === 'number' || typeof b === 'number') return Object.is(a, b);
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;
  if (aIsArray) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(a, i) || !Object.prototype.hasOwnProperty.call(b, i)) return false;
      if (!sameTree(a[i], b[i])) return false;
    }
    return true;
  }
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  for (let i = 0; i < aKeys.length; i += 1) {
    if (aKeys[i] !== bKeys[i]) return false;
    if (!sameTree(a[aKeys[i]], b[bKeys[i]])) return false;
  }
  return true;
}

function assertSameTree(actual, expected, label) {
  assert.ok(
    sameTree(actual, expected),
    `${label}: the crossing must return the SAME tree (\`contract.md §1\`, \`§4\`); got ${describe(actual)}, expected ${describe(expected)}`,
  );
}

/** A nesting of `n` arrays around a scalar — the value whose deepest member stands at walk-depth `n`. */
function nest(n) {
  let value = 0;
  for (let i = 0; i < n; i += 1) value = [value];
  return value;
}

const LONE_SURROGATE = '\uD800';

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §A — BOTH DIRECTIONS OF THE ADMITTED TREE, WITH NESTING  (contract.md §1, §4, §5; test-cases.md §1–§2)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B01 — a string crosses in and out as itself (contract.md §1 · test-cases.md JC-TC-01)', () => {
  const store = instance();
  store.write(['a'], 'mem', 'x');
  assert.equal(store.read(['a']), 'x');
});

test('JC-B02 — a multi-byte and an astral string cross (contract.md §1: "a sequence of Unicode scalar values")', () => {
  const store = instance();
  const corpus = { 's-one': 'héllo — ☃ — 𝄞', 's-two': 'a\u00e9\u4e2d\ud834\udd1e' };
  for (const [key, value] of Object.entries(corpus)) {
    store.write([key], 'mem', value);
    assert.equal(store.read([key]), value, `the string ${JSON.stringify(value)} must cross unchanged`);
  }
});

test('JC-B03 — the empty string crosses (contract.md §1)', () => {
  const store = instance();
  store.write(['empty'], 'mem', '');
  assert.equal(store.read(['empty']), '');
});

test('JC-B04 — a boolean crosses in and out as a boolean (contract.md §1 · test-cases.md JC-TC-02)', () => {
  const store = instance();
  store.write(['t'], 'mem', true);
  store.write(['f'], 'mem', false);
  assert.equal(store.read(['t']), true);
  assert.equal(store.read(['f']), false);
});

test('JC-B05 — finite numbers cross and stay finite (contract.md §1 · test-cases.md JC-TC-03)', () => {
  const store = instance();
  const corpus = [0, 1.5, -2, 9007199254740991, -0.125, 1e300];
  for (const [index, value] of corpus.entries()) {
    const address = [`n-${['zero', 'fraction', 'negative', 'max-safe', 'small-fraction', 'large'][index]}`];
    store.write(address, 'mem', value);
    const back = store.read(address);
    assert.equal(typeof back, 'number', `a finite number crosses as a number: ${value}`);
    assert.ok(Number.isFinite(back), `a finite number crosses as a FINITE number: ${value}`);
    assert.ok(Object.is(back, value), `the number crosses as itself: got ${back} for ${value}`);
  }
});

test('JC-B06 — the empty array crosses as a dense array (contract.md §1 · test-cases.md JC-TC-04)', () => {
  const store = instance();
  store.write(['a'], 'mem', []);
  const back = store.read(['a']);
  assert.ok(Array.isArray(back), 'the empty array crosses as an array');
  assert.equal(back.length, 0);
});

test('JC-B07 — a dense mixed array crosses with its INDEX ORDER preserved (contract.md §1 · JC-TC-04)', () => {
  const store = instance();
  const value = [1, 'a', false, [2, [3]], { k: 'v' }];
  store.write(['a'], 'mem', value);
  assertSameTree(store.read(['a']), value, 'a dense array');
});

test('JC-B08 — the empty object crosses as a plain object (contract.md §1 · test-cases.md JC-TC-05)', () => {
  const store = instance();
  store.write(['o'], 'mem', {});
  const back = store.read(['o']);
  assert.equal(typeof back, 'object');
  assert.ok(back !== null && !Array.isArray(back));
  assert.deepEqual(Object.keys(back), []);
});

test('JC-B09 — a plain object crosses with its own enumerable string-keyed members (contract.md §1 · JC-TC-05)', () => {
  const store = instance();
  const value = { a: 1, b: 'x', c: true, d: [1, 2] };
  store.write(['o'], 'mem', value);
  assertSameTree(store.read(['o']), value, 'a plain object');
});

test('JC-B10 — a nested tree crosses whole (contract.md §1 · test-cases.md JC-TC-06)', () => {
  const store = instance();
  const value = { a: [{ b: [1, 's', false, { c: 'deep' }] }] };
  store.write(['t'], 'mem', value);
  assertSameTree(store.read(['t']), value, 'a nested tree');
});

test('JC-B11 — a foreign-realm plain object is admitted (contract.md §1 · test-cases.md JC-TC-07)', () => {
  const store = instance();
  const foreign = runInNewContext('({ a: 1, b: [2, { c: "x" }] })');
  assert.notEqual(Object.getPrototypeOf(foreign), Object.prototype, 'the fixture really is from another realm');
  const result = attempt(() => store.write(['f'], 'mem', foreign));
  assert.ok(!result.threw, `a foreign-realm plain object is admitted (the plain-object test is structural, not identity-based); refused with ${describe(result.error && result.error.status)} / ${describe(result.error && result.error.message)}`);
  assertSameTree(store.read(['f']), { a: 1, b: [2, { c: 'x' }] }, 'a foreign-realm plain object');
});

test('JC-B12 — a null-prototype plain object is admitted (contract.md §3 · docs/specs/storeroom-js/crossing.md §1.2 row 4)', () => {
  const store = instance();
  const value = Object.create(null);
  value.a = 1;
  value.b = [true];
  // `contract.md §3`: `p` is the prototype classification and `null` is one of its admitted arms; `§1` refuses
  // "a class instance, any OTHER PROTOTYPE-CARRYING object" — a null-prototype object carries none.
  const result = attempt(() => store.write(['np'], 'mem', value));
  assert.ok(!result.threw, `a null-prototype plain object is admitted; refused with ${describe(result.error && result.error.status)}`);
  assertSameTree(store.read(['np']), { a: 1, b: [true] }, 'a null-prototype plain object');
});

test('JC-B13 — an acyclic diamond is admitted: the ancestor stack refuses CYCLES, not shared ancestry (test-cases.md JC-TC-11 · contract.md §4)', () => {
  const store = instance();
  const shared = { leaf: 1 };
  const value = { x: shared, y: shared };
  const result = attempt(() => store.write(['d'], 'mem', value));
  assert.ok(!result.threw, `a diamond is admitted; refused with ${describe(result.error && result.error.status)}`);
  assertSameTree(store.read(['d']), { x: { leaf: 1 }, y: { leaf: 1 } }, 'an acyclic diamond');
});

test('JC-B14 — the copy-out is a FRESH tree, not a reference into store-owned data (contract.md §4)', () => {
  const store = instance();
  store.write(['c'], 'mem', { k: [1] });
  const first = store.read(['c']);
  first.k.push(2);
  first.added = true;
  const second = store.read(['c']);
  assertSameTree(second, { k: [1] }, 'a second read after mutating the first result');
  assert.equal(second.added, undefined, 'the mutation of a read result does not reach the store');
});

test('JC-B15 — no member is ALIASED into two positions on the way out (contract.md §4)', () => {
  const store = instance();
  const shared = { leaf: 1 };
  store.write(['d'], 'mem', { x: shared, y: shared });
  const back = store.read(['d']);
  assert.notEqual(back.x, back.y, 'each position holds its OWN copy: no member is aliased into two positions');
});

test('JC-B16 — the copy-in is DEEP: a caller mutation after the call is not observed (contract.md §4)', () => {
  const store = instance();
  const inner = { deep: [1] };
  const value = { a: inner };
  store.write(['m'], 'mem', value);
  inner.deep.push(2);
  value.b = 'added';
  assertSameTree(store.read(['m']), { a: { deep: [1] } }, 'the stored value after the caller mutated its argument');
});

test('JC-B17 — two reads of one stored value are two INDEPENDENT trees (test-cases.md JC-TC-19 · contract.md §4)', () => {
  const store = instance();
  store.write(['t'], 'mem', { a: [1], b: { c: 2 } });
  const one = store.read(['t']);
  const two = store.read(['t']);
  assert.notEqual(one, two, 'the two reads are distinct objects');
  assert.notEqual(one.a, two.a, 'their nested arrays are distinct objects');
  assert.notEqual(one.b, two.b, 'their nested objects are distinct objects');
  assertSameTree(one, two, 'and they are the same tree');
});

test('JC-B18 — a nested array inside an object is COPIED, not referenced (contract.md §4)', () => {
  const store = instance();
  const nested = [1, [2]];
  store.write(['n'], 'mem', { a: nested });
  const back = store.read(['n']);
  assert.notEqual(back.a, nested, 'the nested array is not the caller\'s array');
  assert.notEqual(back.a[1], nested[1], 'the depth is copied too: a nested array inside it is not the caller\'s');
});

test('JC-B19 — the copy-in does not adopt the caller\'s tree at any depth (contract.md §4)', () => {
  const store = instance();
  const leaf = { l: 1 };
  const value = { a: [{ b: leaf }] };
  store.write(['x'], 'mem', value);
  leaf.l = 99;
  value.a[0].b = 'replaced';
  assertSameTree(store.read(['x']), { a: [{ b: { l: 1 } }] }, 'the stored tree after deep mutation of the argument');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §B — THE `-0` PIN, BOTH DIRECTIONS  (contract.md §4 · parameter-semantics.md §5 · test-cases.md JC-TC-08/16)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B20 — `-0` is normalized to `0` at the boundary (parameter-semantics.md §5 · JC-TC-08)', () => {
  const store = instance();
  store.write(['z'], 'mem', -0);
  const back = store.read(['z']);
  assert.ok(Object.is(back, 0), `the crossing normalizes \`-0\` to \`0\`; got ${Object.is(back, -0) ? '-0' : String(back)}`);
  assert.ok(!Object.is(back, -0), 'no negative zero crosses in either direction');
});

test('JC-B21 — a nested `-0` is normalized to `0` in a member and in an element (parameter-semantics.md §5)', () => {
  const store = instance();
  store.write(['zn'], 'mem', { a: -0, b: [-0, 1] });
  const back = store.read(['zn']);
  assert.ok(Object.is(back.a, 0) && !Object.is(back.a, -0), 'a member `-0` reads back `0`');
  assert.ok(Object.is(back.b[0], 0) && !Object.is(back.b[0], -0), 'an element `-0` reads back `0`');
  assert.ok(Object.is(back.b[1], 1), 'the sibling value is unmoved');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §C — THE SIXTEEN CLASSES AT THEIR DECLARED POSITIONS  (contract.md §2, §2.1; parameter-semantics.md §2)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B22 — class row 1: `null` at the value position (contract.md §2 · test-cases.md JC-TC-20)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r1'], 'mem', null)), { cls: CLASS.null, position: ROOT_POSITION }, 'null');
});

test('JC-B23 — class row 2: `undefined` at the value position (contract.md §2 · JC-TC-21)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r2'], 'mem', undefined)), { cls: CLASS.undefined, position: ROOT_POSITION }, 'undefined');
});

test('JC-B24 — class row 3: a function at the value position (contract.md §2 · JC-TC-22)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r3'], 'mem', function fn() {})), { cls: CLASS.function, position: ROOT_POSITION }, 'a function');
});

test('JC-B25 — class row 4: a symbol at the value position (contract.md §2 · JC-TC-23)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r4'], 'mem', Symbol('s'))), { cls: CLASS.symbol, position: ROOT_POSITION }, 'a symbol');
});

test('JC-B26 — class row 5: a Symbol-keyed own member refuses the CONTAINING value (contract.md §2 · JC-TC-24)', () => {
  const store = instance();
  const value = { [Symbol('s')]: 1 };
  assertClassRefusal(
    attempt(() => store.write(['r5'], 'mem', value)),
    { cls: CLASS.symbolKey, position: ROOT_POSITION },
    'a Symbol-keyed own member',
  );
});

test('JC-B27 — class row 6: a bigint, with the ONE message the docs print verbatim (contract.md §2.1 · parameter-semantics.md §3 worked example)', () => {
  const store = instance();
  const result = attempt(() => store.write(['a'], 'mem', { a: 10n }));
  // **`parameter-semantics.md §3`'s worked example, character for character: PART ONE carries the store
  // generator's own subject spelling `'10n'`, PART TWO is the package's appended clause.**
  const expected =
    "'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 'a' of the write's value argument is a bigint";
  assert.ok(result.threw, 'a bigint is refused');
  assertRefusalForm(result.error, 'a bigint');
  assert.equal(result.error.status, 'ValueRefusedAtBoundary', 'the status is `ValueRefusedAtBoundary`');
  assert.equal(result.error.message, expected, `\`parameter-semantics.md §3\`'s worked example is reproduced character for character; got ${JSON.stringify(result.error.message)}`);
});

test('JC-B28 — class row 7: `NaN` at the value position (contract.md §2 · JC-TC-26)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r7'], 'mem', NaN)), { cls: CLASS.nonFinite, position: ROOT_POSITION }, 'NaN');
});

test('JC-B29 — class row 7: `Infinity` and `-Infinity` at the value position (contract.md §2 · JC-TC-26)', () => {
  const store = instance();
  for (const value of [Infinity, -Infinity]) {
    assertClassRefusal(
      attempt(() => store.write(['r7b'], 'mem', value)),
      { cls: CLASS.nonFinite, position: ROOT_POSITION },
      String(value),
    );
  }
});

test('JC-B30 — class row 8: a value over the walk ceiling, at a value position (contract.md §2 · JC-TC-27 · parameter-semantics.md §2)', () => {
  const store = instance();
  // **`129`** — this cell's standing figure, kept: `A149` (2) refuses `127` **and beyond**, so `129` is a lawful
  // over-ceiling value and the cell's expectation is unmoved by the re-derivation. The boundary itself is
  // driven at `JC-B54`/`JC-B55`, which are the two cells `A149` moves.
  const overTheDepthCeiling = nest(129);
  // `contract.md §2` row 8's position column reads `value`; `parameter-semantics.md §2` defines a value
  // position as the root OR a member value reached by the walk, so this cell asserts the CLASS and a
  // DECLARED VALUE POSITION and does not choose the root for the walk's own stopping point.
  assertClassRefusalAtValuePosition(
    attempt(() => store.write(['r8'], 'mem', overTheDepthCeiling)),
    CLASS.ceiling,
    'a nesting of 129',
  );
});

test('JC-B31 — class row 9: a lone surrogate at the VALUE position (contract.md §2 · JC-TC-28)', () => {
  const store = instance();
  assertClassRefusal(
    attempt(() => store.write(['r9'], 'mem', LONE_SURROGATE)),
    { cls: CLASS.loneSurrogate, position: ROOT_POSITION },
    'a lone surrogate at a value position',
  );
});

test('JC-B32 — class row 10: a lone surrogate at the KEY position, and the key is never dropped (contract.md §2 · JC-TC-29 · parameter-semantics.md §2)', () => {
  const store = instance();
  const value = { [LONE_SURROGATE]: 1 };
  const result = attempt(() => store.write(['r10'], 'mem', value));
  assertClassRefusal(result, { cls: CLASS.loneSurrogate, position: memberPosition('<key: a string carrying a lone surrogate>') }, 'a lone surrogate at a key position');
  // `parameter-semantics.md §2`: the key holds a lone surrogate and "cannot be spelled"; its path segment is
  // `'<key: a string carrying a lone surrogate>'`. The KEY IS NEVER DROPPED and the whole value is refused.
  assert.ok(
    result.error.message.includes('key: a string carrying a lone surrogate'),
    `the key position is the declared \`<key: a string carrying a lone surrogate>\` spelling; got ${JSON.stringify(result.error.message)}`,
  );
  const after = attempt(() => store.read(['r10']));
  assert.ok(after.threw && after.error.status === 'AddressNotFound', 'the whole value was refused: nothing stands at the address');
});

test('JC-B33 — class row 11: a value that contains itself (contract.md §2 · JC-TC-30)', () => {
  const store = instance();
  const cyclic = {};
  cyclic.self = cyclic;
  // The walk meets the cycle at the member it revisits, so the answer stands at a value position: a member
  // path is a declared value position and the class is row 11's (`parameter-semantics.md §2`).
  assertClassRefusalAtValuePosition(attempt(() => store.write(['r11'], 'mem', cyclic)), CLASS.cyclic, 'a cyclic value');
});

test('JC-B34 — class row 12: a `Proxy` at the value position (contract.md §2 · JC-TC-31)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r12'], 'mem', new Proxy({}, {}))), { cls: CLASS.proxy, position: ROOT_POSITION }, 'a Proxy');
});

test('JC-B35 — class row 13: a class extending `Array` (contract.md §2 · JC-TC-32)', () => {
  const store = instance();
  const subclass = new (class extends Array {})();
  assertClassRefusal(attempt(() => store.write(['r13'], 'mem', subclass)), { cls: CLASS.arraySubclass, position: ROOT_POSITION }, 'a class extending Array');
});

test('JC-B36 — class row 14: a class instance (contract.md §2 · JC-TC-33)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r14'], 'mem', new (class C {})())), { cls: CLASS.nonPlain, position: ROOT_POSITION }, 'a class instance');
});

test('JC-B37 — class row 15: an own accessor member refuses the CONTAINING value (contract.md §2 · JC-TC-34)', () => {
  const store = instance();
  const value = Object.defineProperty({}, 'a', { get() { return 1; }, enumerable: true });
  assertClassRefusal(attempt(() => store.write(['r15'], 'mem', value)), { cls: CLASS.accessor, position: ROOT_POSITION }, 'an own accessor member');
});

test('JC-B38 — class row 16: a sparse array (contract.md §2 · JC-TC-35)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['r16'], 'mem', [1, , 3])), { cls: CLASS.sparse, position: ROOT_POSITION }, 'a sparse array');
});

test('JC-B39 — class row 14: a `Map` is an outside non-plain collection (contract.md §2 row 14 · docs/specs/storeroom-js/crossing.md §1.2 row 13)', () => {
  const store = instance();
  assertClassRefusal(
    attempt(() => store.write(['r14b'], 'mem', new Map([['a', 1]]))),
    { cls: CLASS.nonPlain, position: ROOT_POSITION },
    'a Map',
  );
});

test('JC-B40 — class row 14: an object WRAPPER is not a primitive (contract.md §2 row 14 · crossing.md §1.2 row 1)', () => {
  const store = instance();
  assertClassRefusal(
    attempt(() => store.write(['r14c'], 'mem', new String('a'))),
    { cls: CLASS.nonPlain, position: ROOT_POSITION },
    'a String object wrapper',
  );
});

// ── the MEMBER positions, and the refusal of one member refusing the whole ──────────────────────────

test('JC-B41 — a bigint at a MEMBER position is reported at `member \'a\'` (parameter-semantics.md §2 · §3 worked example)', () => {
  const store = instance();
  const result = attempt(() => store.write(['m1'], 'mem', { a: 10n }));
  assertClassRefusal(result, { cls: CLASS.bigint, position: memberPosition('a') }, 'a bigint at a member');
});

test('JC-B42 — `null` at a member position is refused at `member \'b\'` (contract.md §2 · parameter-semantics.md §2)', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['m2'], 'mem', { a: 1, b: null })), { cls: CLASS.null, position: memberPosition('b') }, 'null at a member');
});

test('JC-B43 — an array ELEMENT position prints its index BARE (parameter-semantics.md §2: "the index is a declared member position, not a key position")', () => {
  const store = instance();
  assertClassRefusal(attempt(() => store.write(['m3'], 'mem', [1, null])), { cls: CLASS.null, position: memberPosition(1) }, 'null as the second element');
});

test('JC-B44 — a deep path is spelled with `/` and each string key single-quoted (parameter-semantics.md §2)', () => {
  const store = instance();
  const value = { a: { b: [0, 10n] } };
  const result = attempt(() => store.write(['m4'], 'mem', value));
  assertClassRefusal(result, { cls: CLASS.bigint, position: memberPosition('a', 'b', 1) }, 'a bigint at a deep path');
});

test('JC-B45 — a refused member refuses the WHOLE containing value, and nothing is stored (contract.md §2.1 · test-cases.md JC-TC-39)', () => {
  const store = instance();
  const result = attempt(() => store.write(['m5'], 'mem', { ok: 1, bad: 10n }));
  assert.ok(result.threw, 'the whole containing value is refused');
  assert.equal(result.error.status, 'ValueRefusedAtBoundary');
  const after = attempt(() => store.read(['m5']));
  assert.ok(after.threw, 'no value stands at the address: the refused member did not land as data');
  assert.equal(after.error.status, 'AddressNotFound', `no store verb was called and no node was minted (\`§2\`); the read answered ${describe(after.error.status)}`);
});

test('JC-B46 — a refused member KEY refuses the whole value and the key is not dropped or renamed (contract.md §2 · JC-TC-40)', () => {
  const store = instance();
  const result = attempt(() => store.write(['m6'], 'mem', { [LONE_SURROGATE]: 1, ok: 2 }));
  assertClassRefusal(result, { cls: CLASS.loneSurrogate, position: memberPosition('<key: a string carrying a lone surrogate>') }, 'a refused member key');
  const after = attempt(() => store.read(['m6']));
  assert.ok(after.threw && after.error.status === 'AddressNotFound', 'the whole value is refused; the surviving `ok` member is not stored alone');
});

test('JC-B47 — a Symbol-keyed member at a MEMBER position reports the CONTAINING object\'s position (contract.md §2 rows 5/15)', () => {
  const store = instance();
  const value = { a: { [Symbol('s')]: 1 } };
  assertClassRefusal(
    attempt(() => store.write(['m7'], 'mem', value)),
    { cls: CLASS.symbolKey, position: memberPosition('a') },
    'a Symbol-keyed member inside a member',
  );
});

test('JC-B48 — an own accessor at a MEMBER position reports the CONTAINING object\'s position (contract.md §2 rows 5/15)', () => {
  const store = instance();
  const inner = Object.defineProperty({ k: 1 }, 'g', { get() { return 2; }, enumerable: true });
  assertClassRefusal(
    attempt(() => store.write(['m8'], 'mem', { a: inner })),
    { cls: CLASS.accessor, position: memberPosition('a') },
    'an own accessor inside a member',
  );
});

test('JC-B49 — a `Proxy` as an array ELEMENT is refused at that bare index (contract.md §2 row 12 · parameter-semantics.md §2)', () => {
  const store = instance();
  assertClassRefusal(
    attempt(() => store.write(['m9'], 'mem', [1, new Proxy({}, {})])),
    { cls: CLASS.proxy, position: memberPosition(1) },
    'a Proxy as an element',
  );
});

test('JC-B50 — the status is `ValueRefusedAtBoundary` and NOT `ValueNotAdmitted` (contract.md §2 · §7 · test-cases.md JC-TC-38)', () => {
  const store = instance();
  const result = attempt(() => store.write(['s1'], 'mem', null));
  assert.ok(result.threw, '`null` is refused');
  assert.equal(result.error.status, 'ValueRefusedAtBoundary', 'rank 17 of the store\'s widened closed set answers this route');
  assert.notEqual(result.error.status, 'ValueNotAdmitted', '`ValueNotAdmitted` keeps rank 14 for the native route and is NOT the answer on the JavaScript route');
});

test('JC-B51 — the message is exactly two parts, with no unsubstituted placeholder (contract.md §2.1 · parameter-semantics.md §3)', () => {
  const store = instance();
  const result = attempt(() => store.write(['s2'], 'mem', { a: 10n }));
  assert.ok(result.threw);
  const message = result.error.message;
  assert.ok(message.includes(PART_ONE), 'PART ONE is the store generator\'s own bytes');
  assert.ok(message.endsWith(PART_TWO(memberPosition('a'), CLASS.bigint)), 'PART TWO is the package\'s appended clause');
  assert.ok(!/[<>]/.test(message), `no unsubstituted placeholder stands in the message (\`§8.2\` property (c)); got ${JSON.stringify(message)}`);
  assert.ok(
    message.indexOf(PART_ONE) + PART_ONE.length === message.indexOf(PART_TWO(memberPosition('a'), CLASS.bigint)),
    'PART TWO is appended BESIDE PART ONE and no other slot stands between them',
  );
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §D — THE CEILINGS  (contract.md §4, §8 rows 7–8 · parameter-semantics.md §4 · test-cases.md JC-TC-09/10/42)
//   ⟶ AMENDED 2026-10-23 (`A149`): `JC-B54`, `JC-B55` and `JC-B56` are re-derived to the OPERATIVE admission
//   bound — depth `126` ADMITTED and settled, `127` REFUSED at the walk before any store verb, nodes
//   `999,999` ADMITTED and `1,000,000` REFUSED as the same class and status. `JC-B52`/`JC-B53` (`65`/`66`) and
//   `JC-B57` (the control) stand unmoved: `65`/`66` remain admitted depth values under the operative `126`.
//   ⟶ **RECONCILED 2026-10-24 — the `2026-10-23` marker above denotes a `2026-10-24` landing (source edit
//   `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`) and THE CLAUSE STANDS AS FILED** — the
//   marker is cited elsewhere and is not re-pointed; the census and every cell id below are unmoved (see the head).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B52 — depth `65` is ADMITTED: the former package bound is not a refusal (test-cases.md JC-TC-10 · the amendment\'s reading instruction)', () => {
  const store = instance();
  const result = attempt(() => store.write(['d65'], 'mem', nest(65)));
  assert.ok(!result.threw, `depth 65 is admitted under the crate's ceiling; refused with ${describe(result.error && result.error.status)}`);
  assertSameTree(store.read(['d65']), nest(65), 'depth 65 round-trips');
});

test('JC-B53 — depth `66` is ADMITTED (test-cases.md JC-TC-10 · the amendment\'s reading instruction)', () => {
  const store = instance();
  const result = attempt(() => store.write(['d66'], 'mem', nest(66)));
  assert.ok(!result.threw, `depth 66 is admitted; refused with ${describe(result.error && result.error.status)}`);
  assertSameTree(store.read(['d66']), nest(66), 'depth 66 round-trips');
});

// **⟶ RE-DERIVED 2026-10-23 (`A149`) — this cell's standing claim was *"depth `128` is ADMITTED"*, and its
// `128` is the crate's CONVERSION bound, not the crossing's admission bound from this date.** The cell now
// drives the operative law: `126` is the highest ADMITTED depth (`A149` (1); `contract.md §4`'s clause of
// 2026-10-23, item (1): *"`ENCODER_CEILING` is `126` on BOTH routes"*; `§8` row 7; `parameter-semantics.md §1`
// row 7: `0…126`; `test-cases.md JC-TC-09`: *"the value commits and reopens intact"*). **Because `A149` (1)'s
// ground is that a value the file tier cannot commit must never be admitted, the cell does not stop at the
// in-memory round trip: the write crosses the `file` tier and the value is read back through a FRESH instance
// over the SAME store path.**
// ⟶ **RECONCILED 2026-10-24 — the `2026-10-23` marker above denotes a `2026-10-24` landing (source edit
// `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`) and THE CLAUSE STANDS AS FILED** — the marker
// is cited elsewhere and is not re-pointed; this cell's expectation and assertions are unmoved (see the head).
test('JC-B54 — depth `126` is ADMITTED, committed and REOPENED through a fresh instance (⟶ AMENDED 2026-10-23 `A149` · test-cases.md JC-TC-09 · contract.md §4 clause (1) · §8 row 7)', () => {
  const filePath = freshStorePath();
  const store = pathBackedInstance(filePath);
  const result = attempt(() => store.write(['d126'], 'file', nest(ENCODER_CEILING)));
  assert.ok(
    !result.threw,
    `walk-depth ${ENCODER_CEILING} is the highest ADMITTED depth (\`A149\` (1)); refused with ${describe(result.error && result.error.status)} / ${describe(result.error && result.error.message)}`,
  );
  assert.ok(statSync(filePath).size > 0, 'the admitted value COMMITTED: the store path carries the settled image');
  const fresh = pathBackedInstance(filePath); // the boot — a FRESH instance over the same store path
  assertSameTree(fresh.read(['d126']), nest(ENCODER_CEILING), `depth ${ENCODER_CEILING} reopens intact from the settled image`);
});

// **⟶ RE-DERIVED 2026-10-23 (`A149`) — this cell's standing claim was *"depth `130` is REFUSED"*; `130` is
// *"`127` and beyond"* and remains refused, but the BOUNDARY cell must drive the boundary.** The cell now
// drives `127`, the row above the ceiling, and asserts the four things `A149` (2) and `contract.md §4`'s clause
// of 2026-10-23 declare: the class `a value over the walk ceiling`, the status `ValueRefusedAtBoundary`, a
// DECLARED VALUE POSITION at which the walk counts past the ceiling (item (4)), and — because the refusal is
// answered AT THE WALK — **no store verb and no commit**: the status is explicitly NOT `FileCommitFailed`,
// nothing stands at the address, the store path gains no byte, and a fresh instance over that path boots without
// the value (`A149` (2): *"never admitted and then failed at commit"*; `test-cases.md JC-TC-27` as re-derived
// 2026-10-23, and `JC-TC-36`'s *"no store verb is called; no node/anchor/journal byte is written"*).
// ⟶ **RECONCILED 2026-10-24 — the `2026-10-23` marker above denotes a `2026-10-24` landing (source edit
// `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`) and THE CLAUSE STANDS AS FILED** — the marker
// is cited elsewhere and is not re-pointed; this cell's expectation and assertions are unmoved (see the head).
test('JC-B55 — depth `127` is REFUSED at the walk, BEFORE any store verb, and never as `FileCommitFailed` (⟶ AMENDED 2026-10-23 `A149` · test-cases.md JC-TC-27 · contract.md §4 clause (2) · §8 row 7)', () => {
  const filePath = freshStorePath();
  const store = pathBackedInstance(filePath);
  const bytesBefore = statSync(filePath).size;
  const result = attempt(() => store.write(['d127'], 'file', nest(OVER_DEPTH)));
  assertClassRefusalAtValuePosition(result, CLASS.ceiling, `depth ${OVER_DEPTH}`);
  assert.notEqual(
    result.error.status,
    'FileCommitFailed',
    'the refusal is answered at the package\'s walk and NOT at the commit (`A149` (2): never admitted and then failed at commit)',
  );
  const after = attempt(() => store.read(['d127']));
  assert.ok(after.threw, 'no value stands at the address: the refused value minted no node');
  assert.equal(after.error.status, 'AddressNotFound', `no store verb was called; the read answered ${describe(after.error.status)}`);
  assert.equal(statSync(filePath).size, bytesBefore, 'no byte was written: the refusal stands before the commit, so the settled image is unmoved');
  const fresh = pathBackedInstance(filePath); // the boot
  const reopened = attempt(() => fresh.read(['d127']));
  assert.ok(reopened.threw && reopened.error.status === 'AddressNotFound', 'a fresh instance over the same store path boots WITHOUT the refused value');
});

// **⟶ RE-DERIVED 2026-10-23 (`A149`) — this cell's standing fixture stood at `1,000,001` elements *"so the
// cell does not depend on the convention's off-by-one"*; the declared range now PINS both sides, so the cell
// drives them.** `999,999` elements is ADMITTED — *"the root consumes the crate's first node"* — and
// `1,000,000` elements is refused as the SAME class and status as depth row 8, at the ROOT value position
// (`A149` (3); `parameter-semantics.md §1` row 8; `§8` row 8; `test-cases.md JC-TC-42`, whose own cell carries
// both sides and whose `§6` clause of 2026-10-23 adds NO cell for the admitted side — **so this cell carries
// both sides inside itself and the set's census is unmoved**).
// ⟶ **RECONCILED 2026-10-24 — the `2026-10-23` marker above denotes a `2026-10-24` landing (source edit
// `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`) and THE CLAUSE STANDS AS FILED** — the marker
// is cited elsewhere and is not re-pointed; this cell's two sides and the census are unmoved (see the head).
test('JC-B56 — the NODE boundary: `999,999` ADMITTED and `1,000,000` REFUSED as the same class (⟶ AMENDED 2026-10-23 `A149` (3) · parameter-semantics.md §1 row 8 · contract.md §8 row 8 · test-cases.md JC-TC-42)', () => {
  const store = instance();
  // THE ADMITTED SIDE — the declared range's last value, the root consuming the crate's first node.
  const atTheCeiling = new Array(ADMITTED_NODES).fill(0);
  assert.equal(atTheCeiling.length, ADMITTED_NODES, 'the admitted fixture really stands at `999,999`');
  const admitted = attempt(() => store.write(['nodes-ok'], 'mem', atTheCeiling));
  assert.ok(!admitted.threw, `\`${ADMITTED_NODES}\` nodes is the declared admitted range's last value (\`A149\` (3)); refused with ${describe(admitted.error && admitted.error.status)}`);
  const back = store.read(['nodes-ok']);
  assert.equal(back.length, ADMITTED_NODES, 'the admitted boundary value crosses whole');
  assert.equal(back[ADMITTED_NODES - 1], 0, 'its last element is intact');

  // THE REFUSED SIDE — one node past the range, at the ROOT value position, as row 8's own family.
  const overTheCeiling = new Array(OVER_NODES).fill(0);
  assert.equal(overTheCeiling.length, OVER_NODES, 'the refused fixture really stands at `1,000,000`');
  const refused = attempt(() => store.write(['nodes'], 'mem', overTheCeiling));
  assertClassRefusal(refused, { cls: CLASS.ceiling, position: ROOT_POSITION }, 'a value of `1,000,000` nodes');
  assert.notEqual(refused.error.status, 'ValueNotAdmitted', 'the node ceiling answers row 8\'s class and rank `17`, never the native route\'s `ValueNotAdmitted`');
  const nothingStored = attempt(() => store.read(['nodes']));
  assert.ok(nothingStored.threw && nothingStored.error.status === 'AddressNotFound', 'the refused value landed nothing at the address');
});

test('JC-B57 — a value comfortably INSIDE the node ceiling is admitted (parameter-semantics.md §1 row 8, control)', () => {
  const store = instance();
  const value = new Array(10000).fill(0).map((_, i) => i);
  const result = attempt(() => store.write(['nodes-ok'], 'mem', value));
  assert.ok(!result.threw, `a 10,000-element dense array is admitted; refused with ${describe(result.error && result.error.status)}`);
  const back = store.read(['nodes-ok']);
  assert.equal(back.length, 10000);
  assert.equal(back[9999], 9999);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §E — THE RETIRED FORMS, AND `null`  (contract.md §1, §5 · A140 as amended · A148 Q4 · test-cases.md §2)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B58 — no `{"v":…}` envelope on the copy-out: a read returns the bare value (contract.md §5 · JC-TC-17)', () => {
  const store = instance();
  store.write(['e1'], 'mem', 'x');
  const back = store.read(['e1']);
  assert.equal(back, 'x', 'the bare value crosses, never a `{"v":…}` envelope');
  assert.ok(!(back !== null && typeof back === 'object' && 'v' in back), 'no `v` slot wraps the value');
});

test('JC-B59 — no `{"e":…}` side-channel on the copy-in: a refusal is THROWN, never returned as a token record (contract.md §2.1 · §5 · A148 Q4)', () => {
  const store = instance();
  const result = attempt(() => store.write(['e2'], 'mem', 10n));
  assert.ok(result.threw, 'the refusal is thrown; a returned `{"e":…}` record would not throw');
  assertRefusalForm(result.error, 'the refusal of a bigint');
  assert.ok(!('e' in result.error && typeof result.error.e === 'string'), 'the thrown form carries no `e` class token');
  assert.equal(result.error.status, 'ValueRefusedAtBoundary', 'the class crosses in the message, not in a side-channel');
});

test('JC-B60 — a value whose own members are the retired forms\' spellings crosses as DATA (contract.md §1 · §5: no tag, no envelope, no side-channel)', () => {
  const store = instance();
  const value = { v: 'x', e: 'a bigint', k: 's', L: 'a', T: 'mem' };
  store.write(['e3'], 'mem', value);
  assertSameTree(store.read(['e3']), value, 'a plain object carrying those keys is plain data and is not interpreted as a tag or an envelope');
});

test('JC-B61 — `null` is NOT admitted, although JSON can spell it (contract.md §1 · A140 (2) · test-cases.md JC-TC-20)', () => {
  assert.equal(JSON.stringify(null), 'null', 'the premise: JSON can spell `null`');
  assert.equal(JSON.parse('null'), null, 'the premise: JSON can read `null`');
  const store = instance();
  const result = attempt(() => store.write(['n1'], 'mem', JSON.parse('null')));
  assertClassRefusal(result, { cls: CLASS.null, position: ROOT_POSITION }, 'a JSON-spelled null');
  const after = attempt(() => store.read(['n1']));
  assert.ok(after.threw && after.error.status === 'AddressNotFound', 'and it is not stored');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §F — THE CARRIERS ARE NOT GOVERNED BY THIS CONTRACT  (contract.md §1 subject caption · §6 row 1 · A147 (3))
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B62 — an ADDRESS carrier and a TIER carrier still cross in their own existing forms (contract.md §6 row 1 · A147 (3))', () => {
  const store = instance();
  // The address carrier: a segment array, two segments deep. The parent anchor is minted first — a write
  // whose parent anchor is absent is the store's own `AddressNotFound` (measured at the first run of this
  // set), and the address CARRIER, not the parent rule, is this cell's subject.
  store.write(['car'], 'mem', {});
  store.write(['car', 'rier'], 'mem', { a: 1 });
  assertSameTree(store.read(['car', 'rier']), { a: 1 }, 'a two-segment address carrier');
  // The tier carrier: one token, then the declared array form (`surface.md`'s `read` row: ZERO TO MANY, one
  // token or an array).
  assertSameTree(store.read(['car', 'rier'], 'mem'), { a: 1 }, 'a single tier token');
  assertSameTree(store.read(['car', 'rier'], ['mem']), { a: 1 }, 'a tier array');
});

test('JC-B63 — the TIER carrier keeps its OWN protocol: an out-of-domain tier answers the store\'s own code (contract.md §1: tiers are outside this contract · storeroom-native/contract.md §8.1 #5)', () => {
  const store = instance();
  const result = attempt(() => store.write(['tier'], 'disk', 1));
  assert.ok(result.threw, 'an out-of-domain tier is refused');
  assert.equal(result.error.status, 'OutOfDomainTier', `the tier carrier's own answer wins; got ${describe(result.error.status)} / ${describe(result.error.message)}`);
});

test('JC-B64 — the ADDRESS carrier keeps its OWN protocol: a negative segment answers the store\'s own code (contract.md §1 · storeroom-native/contract.md §8.1 #1)', () => {
  const store = instance();
  const result = attempt(() => store.write([-1], 'mem', 1));
  assert.ok(result.threw, 'an out-of-domain segment is refused');
  assert.equal(result.error.status, 'AddressMalformed', `the address carrier's own answer wins; got ${describe(result.error.status)} / ${describe(result.error.message)}`);
});

test('JC-B65 — a value tree containing no carrier carries NO tag at all (contract.md §1 · §5 · A148 Q4)', () => {
  const store = instance();
  const value = { a: [1, 'x', true], b: { c: [] } };
  store.write(['tagless'], 'mem', value);
  const back = store.read(['tagless']);
  assertSameTree(back, value, 'the tree crosses as itself');
  const keys = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node !== null && typeof node === 'object') {
      for (const key of Object.keys(node)) { keys.add(key); walk(node[key]); }
    }
  };
  walk(back);
  assert.deepEqual([...keys].sort(), ['a', 'b', 'c'], `no tag member (\`k\`, \`v\`, \`e\`, \`L\`, \`T\`) is introduced into the tree; the member keys read ${[...keys].sort().join(', ')}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §G — THE ONE REFUSAL FORM, AND THE FORM'S ARITY AS AN OBSERVATION  (contract.md §2.1 · surface.md §2.5)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('JC-B66 — the refusal travels inside the ONE form: a plain object carrying `status` and `message` (contract.md §2.1 · surface.md §2.5 items 1–3)', () => {
  const store = instance();
  const result = attempt(() => store.write(['form'], 'mem', [1, , 3]));
  assert.ok(result.threw, 'a sparse array is refused');
  assertRefusalForm(result.error, 'the one form');
  assert.ok(!(result.error instanceof Error), 'the thrown value is NOT an `Error` subclass (`surface.md §2.5` item 3)');
});

test('JC-B67 — OBSERVED: the refusal form\'s own member census (a declared drift between contract.md §2.1\'s `{status, message}` and surface.md §2.5\'s `{status, message, log}`)', () => {
  const store = instance();
  const result = attempt(() => store.write(['census'], 'mem', null));
  assert.ok(result.threw, '`null` is refused');
  const keys = Object.keys(result.error).sort();
  // **NEITHER ARITY IS ASSERTED HERE.** `contract.md §2.1` declares the one `{status, message}` object and
  // `surface.md §2.5`'s 2026-10-16 mark declares `{status, message, log}`; the two readings disagree about the
  // THIRD member and this set does not choose between them. What IS asserted is the part both carry.
  assert.ok(keys.includes('message') && keys.includes('status'), `the form carries \`status\` and \`message\`; its member census is ${JSON.stringify(keys)}`);
  // eslint-disable-next-line no-console
  console.log(`OBSERVED JC-B67 the refusal's member census: ${JSON.stringify(keys)}`);
});
