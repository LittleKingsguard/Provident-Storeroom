// GATE-3 RED SET — `U-STOREROOM-JSON-CROSSING`.
//
// Authoring rule: every cell below cites `docs/specs/storeroom-json-crossing/contract.md`, its
// `parameter-semantics.md` or its `test-cases.md`, and asserts the contract's declared answer — never the
// current tagged form. **THE SET IS EXPECTED TO BE RED where the crossing still carries the tagged tree,
// answers `ValueNotAdmitted` for the sixteen classes, refuses depth `66`, or preserves `-0`.**
//
// The package is reached through its declared ESM entry, never the `.node` addon directly.
//
// **⟶ RE-DERIVED 2026-10-23 (`docs/decisions.md` · `A149`; `docs/specs/storeroom-json-crossing/contract.md §4`
// and `§8` rows `7`/`8`, `parameter-semantics.md §1` rows `7`/`8` and `§4`, `test-cases.md` `JC-TC-09`,
// `JC-TC-27`, `JC-TC-42`): THE THREE BOUNDARY CELLS ARE RE-DERIVED TO THE OPERATIVE ADMISSION CEILINGS AND NO
// OTHER CELL MOVES.** The ceilings are the STORE'S PERSISTENT ones and not the crate's conversion bounds: depth
// `126` on both routes and nodes `0…999,999`, with depth `127`+ refused AT THE WALK, BEFORE ANY STORE VERB, with
// the depth class `a value over the walk ceiling` and the status `ValueRefusedAtBoundary`. So `JC-TC-09` moves
// depth `128` → `126` and is driven on the PERSISTENT route (committed, then reopened); `JC-TC-27` moves depth
// `129` → `127` and now asserts the walk's refusal and its ordering, not merely a class; and `JC-TC-42` states
// the node boundary at BOTH sides, `999,999` ADMITTED and `1,000,000` REFUSED. **The cell census is unmoved at
// `48`** (`test-cases.md §6`'s clause of the same date: no cell added, none removed, `JC-TC-10`'s `65`/`66`
// admissions unmoved because those remain admitted depth values under the operative `126`).
//
// **⟶ AND THE CENSUS MOVES `48` → `49` ON 2026-10-24 (`test-cases.md §3`'s clause of that date, items `(1)` and
// `(2)`, for `contract.md §2`'s row `17` and the gate-11 finding `F-RA-5`): ONE CELL IS ADDED, `JC-TC-49`, THE
// SEVENTEENTH CLASS, AND ITS ID IS MINTED AT THE END OF THE RANGE rather than inserted beside `JC-TC-35`, so no
// cited id is renumbered. `§3`'s heading *"THE SIXTEEN REFUSALS"* below is READ AS *"THE SEVENTEEN REFUSALS"*
// from this date, and the `§6` reconciliation reads `§1` `11` + `§2` `8` + `§3` `17` + `§4` `7` + `§5` `6` =
// `49` ✓. THE CELL IS RED AGAINST THE SHIPPED TREE AND ITS GREEN IS OWED: the build drops the member today, as
// the row's own clause of that date states at item `(8)`.**
//
// **⟶ AND THE CENSUS MOVES `49` → `54` ON 2026-10-24 (`test-cases.md §3`'s clause of that date — the GATE-11
// THIRD AUDIT PASS, items `(1)`–`(4)`, with `contract.md §2`'s clauses of the same date on `F-RA-11`, `F-RA-12`
// and `F-RA-14` and `§2.1`'s clause of that date on `F-RA-13`): FIVE CELLS ARE ADDED AT THE END OF `§3`'s TABLE
// — `JC-TC-50` (a prototype-carried index, row `16`), `JC-TC-51` (a `Proxy` standing as a prototype, rows
// `14`/`13`), `JC-TC-52`, `JC-TC-53` and `JC-TC-54` (the three limbs of `F-RA-13` at row `3` and at row `8`'s
// DEPTH arm) — and the census reads `§1` `11` + `§2` `8` + `§3` `22` + `§4` `7` + `§5` `6` = `54` ✓. EVERY ONE
// OF THE FIVE IS RED AT THE SHIPPED TREE AND ITS GREEN IS OWED, each for the reason its clause states: the
// chain-inclusive hole test, the two census reads of a prototype link, the exemption's stop above an added
// `Symbol.toPrimitive`, the tag read `Object.prototype.toString` makes, and the element conversion the array arm
// never guards. NO EXISTING CELL MOVES and no expected answer of this part is reversed.**
//
// **⟶ AND THE CENSUS MOVES `54` → `56` ON 2026-10-24 (`test-cases.md`'s clause of that date — the GATE-11 FOURTH
// AUDIT PASS, its item `(1)` — with `contract.md §2.1`'s clause of that date on `F-RA-18` and on `F-RA-20` and
// `implementation-plan.md §2` step `4`'s clause of that date, arms `(vi)` and `(vii)`): TWO CELLS ARE ADDED AT
// THE END OF THE RANGE — `JC-TC-55` (a CARRIER position's subject, `§4`'s eighth row) and `JC-TC-56` (the element
// limb's path test, `§3`'s twenty-third) — and the census reads `§1` `11` + `§2` `8` + `§3` `23` + `§4` `8` +
// `§5` `6` = `56` ✓. BOTH ARE RED AT THE SHIPPED TREE AND BOTH GREENS ARE OWED, each for the reason its clause
// states: the carrier guard returns a row class that NO carrier call site supplies — so that slot printed the
// eleven characters `'undefined'` — and the element limb's `seen` set never releases, so an ALIASED element
// answered the class spelling where the array's sanctioned `'1,1'` belongs. NO EXISTING CELL MOVES and no
// expected answer of this part is reversed; `JC-TC-56`'s non-red states — a CYCLE and an element whose
// conversion path is reachable — are asserted so the ruling cannot be read as a licence to withdraw a guard.**
//
// **⟶ AND THE CENSUS MOVES `56` → `59` ON 2026-10-24 (`test-cases.md`'s clause of that date — the GATE-11 FIFTH
// AUDIT PASS, its items `(1)`–`(5)` — with `contract.md §2.1`'s clause of that date on `F5-1`/`F5-2`, `F5-3` and
// `F5-4` and `implementation-plan.md §2` step `4`'s clause of that date, arms `(viii)`, `(ix)` and `(x)`): THREE
// CELLS ARE ADDED AT THE END OF THE RANGE — `JC-TC-57` (the guard's per-call position budget and its bound on the
// element limb, `§3`'s twenty-fourth), `JC-TC-58` (a CALLABLE `Proxy` at a carrier slot, `§3`'s twenty-fifth) and
// `JC-TC-59` (the position spelling under a mutated `Array.prototype`, `§4`'s ninth) — and the census reads
// `§1` `11` + `§2` `8` + `§3` `25` + `§4` `9` + `§5` `6` = `59` ✓.** ALL THREE ARE RED AT THE SHIPPED TREE AND
// ALL THREE GREENS ARE OWED, each for the reason its clause states: **no visited set and no ceiling, so an
// aliased DAG costs `2^depth` visits and a `length`-shaped scan reads `0…length-1` unbounded (`F5-1`/`F5-2`);
// `targetSpelling`'s `Proxy` guard is `typeof 'object'`, so a CALLABLE `Proxy` runs its `get` trap at a carrier
// slot (`F5-3`); and `valuePosition` takes `.map` and `.join` from a mutable prototype, so an override spells the
// POSITION (`F5-4`).** **`JC-TC-56` IS COMPLETED IN PLACE ON THE SAME DATE** (`F5-8`: three states its own case
// row declares were undriven — the distinct-sibling control, a cycle of length `2`, and an alias standing higher
// than one link) **and no expected answer of this part is reversed.**
//
// **⟶ AND THE CENSUS MOVES `59` → `61` ON 2026-10-24 (`test-cases.md`'s clause of that date — the GATE-11 SIXTH
// AUDIT PASS, its items `(1)`–`(5)` — with `contract.md §2.1`'s clause of that date on `F6-1` and `F6-2` and
// `implementation-plan.md §2` step `4`'s clause of that date, arms `(xi)` and `(xii)`): TWO CELLS ARE ADDED AT
// THE END OF THE RANGE — `JC-TC-60` (the render guard's PER-ELEMENT CHAIN WALK charged to the one per-call
// budget, `§3`'s twenty-sixth) and `JC-TC-61` (the lone-surrogate predicate under a MUTATED
// `String.prototype`, the same `§3` position) — and this file's acceptance set is `61` `test()` cells,
// `JC-TC-01`…`JC-TC-61`, read at `test-cases.md`'s own printing site as `§1` `11` + `§2` `8` + `§3` `26` +
// `§4` `10` + `§5` `6` = `61` ✓.** BOTH ARE RED AT THE SHIPPED TREE AND BOTH GREENS ARE OWED, each for the
// reason its clause states at the bytes: **the budget spends positions and element-limb descriptor reads and
// NOTHING for a chain link, so an element set that multiplies chain traversals re-scales the very cost `F5-1`
// was ruled to close (`F6-1`); and `hasLoneSurrogate` reads `text.charCodeAt(i)` off a MUTABLE prototype and is
// the SOLE gate on rows `9` and `10`, so an override answering `0x41` at every index admits a lone surrogate at
// BOTH positions (`F6-2`).** NO EXISTING CELL MOVES and no expected answer of this part is reversed.
//
// **⟶ AND THE CENSUS MOVES `61` → `63` ON 2026-10-24 (`test-cases.md`'s clause of that date — the GATE-11
// SEVENTH AUDIT PASS, its items `(1)`–`(6)` — with `contract.md §2.1`'s clause of that date on `F7-1`, `F7-2`
// and `F7-3` and `implementation-plan.md §2` step `4`'s clause of that date, arms `(xiii)`–`(xvii)`): TWO CELLS
// ARE ADDED AT THE END OF THE RANGE — `JC-TC-62` (the RENDER GUARD'S CENSUS-READ COST at row `8`'s depth arm,
// `§3`'s twenty-seventh) and `JC-TC-63` (THE BATTERY: no verdict, class, status, position, subject byte or
// crossed member is decided by anything taken from a mutable prototype, `§4`'s eleventh) — and this file's
// acceptance set is `63` `test()` cells, `JC-TC-01`…`JC-TC-63`, read at `test-cases.md`'s own printing site as
// `§1` `11` + `§2` `8` + `§3` `27` + `§4` `11` + `§5` `6` = `63` ✓. BOTH ARE RED AT THE SHIPPED TREE AND BOTH
// GREENS ARE OWED, each for the reason its clause states at the bytes: **`JC-TC-62` — a census read of a
// CALLER-SCALED prototype costs `N + |reference| + 3` reads and is charged ONE position, so `M × N` reads are
// taken against `M` positions spent and the guard never trips, the caller setting the price of a SANCTIONED
// rendering (`F7-2`, items `(4a)`–`(4e)`); and `JC-TC-63` — built-in members still decide the crossing's
// answers at the sites item `(2b)` marks `OWED`, the audits' own measured witnesses among them (`F7-1`).** NO
// EXISTING CELL MOVES and no expected answer of this part is reversed.
//
// **⟶ AND THE CENSUS MOVES `63` → `67` ON 2026-10-24 (`test-cases.md`'s clause of that date — the GATE-11
// EIGHTH AUDIT PASS, items `(8a)`, `(8b)` and `(9)`, with `contract.md §2.1`'s clause of the same date on
// `F8-1`, `F8-2` and `F8-3` and `implementation-plan.md §2` step `4`'s clause of that date, arms `(xvii)`,
// `(xviii)` and `(xix)`): FOUR CELLS ARE ADDED AT THE END OF THE RANGE — `JC-TC-64` (THE RECORD-COPY AND
// DELIVERY DRIVE, `§4`'s twelfth), `JC-TC-65` (THE ARGUMENT AND CONSTRUCTION DRIVES, `§4`'s thirteenth),
// `JC-TC-66` (row `(a)`'s ADMITTED SIDE, `§3`'s twenty-eighth) and `JC-TC-67` (THE DISTINCT-LEAF COST WITNESS,
// `§3`'s twenty-ninth) — and this file's acceptance set is `67` `test()` cells, `JC-TC-01`…`JC-TC-67`, read at
// `test-cases.md`'s own printing site as `§1` `11` + `§2` `8` + `§3` `29` + `§4` `13` + `§5` `6` = `67` ✓.
// **ALL FOUR ARE RED AT THE SHIPPED TREE AND ALL FOUR GREENS ARE OWED**, each for the reason its clause states
// at the bytes: `JC-TC-64` and `JC-TC-66` — the reply's record copy and the delivery still consume the store's
// own arrays through `Array.prototype` (`F8-1`'s rows `55`–`60`); `JC-TC-65` — the construction's encoders and
// its own seeding do the same (`F8-2`'s rows `61`–`64`); and `JC-TC-67` — the memo consultation and the path
// are charged neither term, so a caller-scaled identity loop runs inside one `1,000,000`-unit call (`F8-3`).
// `JC-TC-62` and `JC-TC-63`, which are named among the six the spec pass owed, have LANDED as cells since its
// census was printed; the six owed are `JC-TC-62`…`JC-TC-67` and this pass writes the last four. NO EXISTING
// CELL MOVES and no expected answer of this part is reversed.**

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

import { storeCreate } from '../../bindings/js/index.mjs';
import { commit as kernelCommit, runAttempt } from '../../bindings/js/src/constraint-kernel.mjs';

const VALUE_POSITION = "the write's value argument";
const STATUS = 'ValueRefusedAtBoundary';
// THE WALK'S NODE CEILING, THE ROOT COUNTED: a top-level dense array of `999,999` elements is ADMITTED and
// `1,000,000` is REFUSED (`contract.md §8` row `8` · `parameter-semantics.md §1` row `8`, both re-derived
// 2026-10-23 by `A149`).
const NODE_CEILING = 1_000_000;

function instance() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

function refused(value, address = ['v']) {
  const inst = instance();
  try {
    inst.write(address, 'mem', value);
  } catch (err) {
    return { err, inst };
  }
  assert.fail(`the contract declares a refusal; ${String(value)} was admitted`);
}

function overCeiling(position = VALUE_POSITION) {
  return `, the value at ${position} is a value over the walk ceiling`;
}

function assertClass(err, cls, position = VALUE_POSITION) {
  assert.equal(err.status, STATUS,
    `the boundary refusal must answer ${STATUS}, got ${JSON.stringify(err.status)}: ${err.message}`);
  assert.ok(err.message.endsWith(`, the value at ${position} is ${cls}`),
    `the message must end with the class and position clause; got ${JSON.stringify(err.message)}`);
}

function nested(depth) {
  let value = 'leaf';
  for (let i = 0; i < depth; i += 1) value = [value];
  return value;
}

function cargoDependencies() {
  const text = readFileSync(new URL('../../bindings/js/Cargo.toml', import.meta.url), 'utf8');
  const section = text.split(/^\[dependencies\]$/m)[1]?.split(/^\[/m)[0] ?? '';
  return section.split('\n').map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
}

// ── COPY-IN, ADMITTED ────────────────────────────────────────────────────────────────────────────────

test('JC-TC-01 a string reaches the store and returns', () => {
  const inst = instance();
  inst.write(['v'], 'mem', 'x');
  assert.equal(inst.read(['v']), 'x');
});

test('JC-TC-02 booleans reach the store and return', () => {
  for (const value of [true, false]) {
    const inst = instance();
    inst.write(['v'], 'mem', value);
    assert.equal(inst.read(['v']), value);
  }
});

test('JC-TC-03 finite numbers reach the store and return', () => {
  for (const value of [0, 1.5, -2]) {
    const inst = instance();
    inst.write(['v'], 'mem', value);
    assert.equal(inst.read(['v']), value);
  }
});

test('JC-TC-04 dense arrays preserve order', () => {
  const inst = instance();
  const value = [1, 'a', false];
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

test('JC-TC-05 plain objects preserve their members', () => {
  const inst = instance();
  const value = { a: 1, b: 'x' };
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

test('JC-TC-06 a nested tree crosses whole', () => {
  const inst = instance();
  const value = { a: [{ b: [1] }] };
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

test('JC-TC-07 a foreign-realm plain object is admitted', () => {
  const value = runInNewContext('({ a: 1 })');
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), { a: 1 });
});

test('JC-TC-08 -0 normalizes to 0 at the binding boundary', () => {
  const inst = instance();
  inst.write(['v'], 'mem', -0);
  const back = inst.read(['v']);
  assert.ok(Object.is(back, 0), `the binding boundary returns 0, not -0; got ${Object.is(back, -0) ? '-0' : back}`);
});

test('JC-TC-09 depth 126 is admitted and commits and reopens intact', async () => {
  // `test-cases.md` `JC-TC-09`, re-derived 2026-10-23 (`A149`): *"depth `126` | admitted; the store's
  // persistent depth ceiling is operative, and the value commits and reopens intact"*. `126` is the highest
  // admitted depth (`contract.md §8` row `7`: integer `0…126`), so the cell is driven on the PERSISTENT route
  // — a real store over a real `cfg.filePath`, committed through the package's own commit route, then
  // reopened — because the ceiling being asserted is the store's persistent one and not the conversion's.
  const dir = mkdtempSync(join(tmpdir(), 'jc-tc-09-'));
  const filePath = join(dir, 'store.json');
  const inst = storeCreate({ filePath, journalLength: 8, listeners: [] });
  const value = nested(126);
  runAttempt(inst, kernelCommit(inst, ['v'], 'file', value));
  assert.deepEqual(inst.read(['v'], 'file'), value,
    'depth 126 is the highest admitted depth: the walk admits it and the read returns the same tree');
  const fresh = storeCreate({ filePath, journalLength: 8, listeners: [] });
  assert.deepEqual(fresh.read(['v'], 'file'), value,
    'the store\'s persistent depth ceiling is operative: the value commits and reopens intact');
});

test('JC-TC-10 depth 65 and 66 are admitted', () => {
  for (const depth of [65, 66]) {
    const inst = instance();
    const value = nested(depth);
    inst.write(['v'], 'mem', value);
    assert.deepEqual(inst.read(['v']), value, `depth ${depth} is below the crate ceiling`);
  }
});

test('JC-TC-11 an acyclic diamond is admitted', () => {
  const shared = { k: 1 };
  const value = { x: shared, y: shared };
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

// ── COPY-OUT, ADMITTED ───────────────────────────────────────────────────────────────────────────────

test('JC-TC-12 a stored primitive reads back as the same primitive', () => {
  const inst = instance();
  inst.write(['v'], 'mem', 'x');
  assert.equal(inst.read(['v']), 'x');
});

test('JC-TC-13 a stored array reads back as a fresh array', () => {
  const inst = instance();
  inst.write(['v'], 'mem', [1, 2]);
  const back = inst.read(['v']);
  assert.deepEqual(back, [1, 2]);
  back.push(3);
  assert.deepEqual(inst.read(['v']), [1, 2], 'the read is a copy, not a shared array');
});

test('JC-TC-14 a stored object reads back as a fresh plain object', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: 1 });
  const back = inst.read(['v']);
  assert.deepEqual(back, { a: 1 });
  back.a = 2;
  assert.deepEqual(inst.read(['v']), { a: 1 }, 'the read is a copy, not a shared object');
});

test('JC-TC-15 a stored nested tree reads back whole', () => {
  const inst = instance();
  const value = { a: [{ b: [1] }] };
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

test('JC-TC-16 a stored -0 reads back as 0', () => {
  const inst = instance();
  inst.write(['v'], 'mem', -0);
  assert.ok(Object.is(inst.read(['v']), 0));
});

test('JC-TC-17 copy-out carries no tag or envelope', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: [1] });
  const back = inst.read(['v']);
  assert.deepEqual(Object.keys(back), ['a']);
  assert.ok(!Object.prototype.hasOwnProperty.call(back, 'k'));
  assert.ok(!Object.prototype.hasOwnProperty.call(back, 'v'));
  assert.ok(!Object.prototype.hasOwnProperty.call(back, 'e'));
});

test('JC-TC-18 decodeValue returns the same bare tree as the writer', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: [1, 'b'] });
  const back = inst.read(['v']);
  assert.equal(JSON.stringify(back), '{"a":[1,"b"]}');
});

test('JC-TC-19 two reads are independent trees', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: [1] });
  const first = inst.read(['v']);
  first.a.push(2);
  assert.deepEqual(inst.read(['v']), { a: [1] });
});

// ── THE SEVENTEEN REFUSALS ──────────────────────────────────────────────────────────────────────────
// (read as *"the seventeen"* from 2026-10-24: `contract.md §2`'s row `17` and its clause of that date, item
// `(7)` item `(b)`, and `test-cases.md §3`'s clause of the same date. The sixteen cells `JC-TC-20`…`JC-TC-35`
// stand byte-for-byte; the seventeenth class's cell is `JC-TC-49`, minted at the end of the range.)

test('JC-TC-20 null is refused', () => {
  const { err } = refused(null);
  assertClass(err, 'null');
});

test('JC-TC-21 undefined is refused', () => {
  const { err } = refused(undefined);
  assertClass(err, 'undefined');
});

test('JC-TC-22 a function is refused', () => {
  const { err } = refused(function sample() {});
  assertClass(err, 'a function');
});

test('JC-TC-23 a symbol is refused', () => {
  const { err } = refused(Symbol('s'));
  assertClass(err, 'a symbol');
});

test('JC-TC-24 an own Symbol-keyed member is refused', () => {
  const { err } = refused({ [Symbol('s')]: 1 });
  assertClass(err, 'a value carrying a Symbol-keyed own member');
});

test('JC-TC-25 a bigint is refused', () => {
  const { err } = refused(10n);
  assertClass(err, 'a bigint');
});

test('JC-TC-26 a non-finite number is refused', () => {
  for (const value of [NaN, Infinity, -Infinity]) {
    const { err } = refused(value);
    assertClass(err, 'a non-finite number');
  }
});

test('JC-TC-27 depth 127 is refused at the walk, before any store verb', async () => {
  // `test-cases.md` `JC-TC-27`, re-derived 2026-10-23 (`A149`): *"nested depth `127` | `a value over the walk
  // ceiling`, at the walk before any store verb, with `ValueRefusedAtBoundary`"*. The value is driven on the
  // PERSISTENT route precisely so the ordering is observable: an implementation that admitted depth `127` and
  // then failed at the store's commit would answer `FileCommitFailed` here, which is the answer `A149` (2)
  // forbids — so the cell reads the status, the class, the file's untouched bytes and the fresh boot.
  const dir = mkdtempSync(join(tmpdir(), 'jc-tc-27-'));
  const filePath = join(dir, 'store.json');
  const inst = storeCreate({ filePath, journalLength: 8, listeners: [] });
  const before = existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
  const position = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  let err = null;
  try {
    runAttempt(inst, kernelCommit(inst, ['v'], 'file', nested(127)));
  } catch (caught) {
    err = caught;
  }
  assert.ok(err, 'the contract refuses depth 127 at the walk; the value was admitted and reached the commit');
  assertClass(err, 'a value over the walk ceiling', position);
  assert.notEqual(err.status, 'FileCommitFailed',
    `the depth class is the walk's answer and never the store's commit; got ${JSON.stringify(err.status)}`);
  const after = existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
  assert.equal(after, before, 'the refusal precedes every store verb: no byte of the store file moved');
  const fresh = storeCreate({ filePath, journalLength: 8, listeners: [] });
  assert.throws(() => fresh.read(['v'], 'file'), (caught) => caught.status === 'AddressNotFound',
    'nothing was admitted: a fresh instance over the same path holds no value at the address');
});

test('JC-TC-28 a lone surrogate at a value position is refused', () => {
  const { err } = refused('\uD800');
  assertClass(err, 'a string carrying a lone surrogate');
});

test('JC-TC-29 a lone surrogate at a member-key position is refused', () => {
  const { err } = refused({ '\uD800': 1 });
  assertClass(err, 'a string carrying a lone surrogate', "member '<key: a string carrying a lone surrogate>' of the write's value argument");
});

test('JC-TC-30 a cyclic value is refused', () => {
  const value = {};
  value.self = value;
  const { err } = refused(value);
  assertClass(err, 'a value that contains itself', "member 'self' of the write's value argument");
});

test('JC-TC-31 a Proxy is refused', () => {
  const { err } = refused(new Proxy({}, {}));
  assertClass(err, 'a Proxy');
});

test('JC-TC-32 a class extending Array is refused', () => {
  const { err } = refused(new (class extends Array {})());
  assertClass(err, 'a class extending Array');
});

test('JC-TC-33 a class instance is refused', () => {
  const { err } = refused(new (class C {})());
  assertClass(err, 'a class instance or another prototype-carrying non-plain object');
});

test('JC-TC-34 an own accessor is refused', () => {
  const value = Object.defineProperty({}, 'a', { get() { return 1; } });
  const { err } = refused(value);
  assertClass(err, 'a value carrying an own accessor member');
});

test('JC-TC-35 a sparse array is refused', () => {
  const { err } = refused([1, , 3]);
  assertClass(err, 'a sparse array');
});

// ── REFUSAL FORM AND ORDER ──────────────────────────────────────────────────────────────────────────

test('JC-TC-36 a refused value writes no store byte', () => {
  const { inst } = refused(10n);
  assert.deepEqual(inst.read([]), {}, 'no node, anchor or journal entry is created by a refused write');
});

test('JC-TC-37 the message is the two declared parts', () => {
  const { err } = refused({ a: 10n });
  const partOne = "'10n' is not a value the JavaScript crossing admits, the crossing carries strings, "
    + 'booleans, finite numbers, plain objects and arrays';
  const partTwo = ", the value at member 'a' of the write's value argument is a bigint";
  assert.equal(err.message, `${partOne}${partTwo}`);
});

test('JC-TC-38 the status is ValueRefusedAtBoundary', () => {
  const { err } = refused(null);
  assert.equal(err.status, STATUS);
});

test('JC-TC-39 a refused member refuses the whole value', () => {
  const { inst } = refused({ a: 10n, b: 1 });
  assert.deepEqual(inst.read([]), {});
});

test('JC-TC-40 a refused member key refuses the whole value', () => {
  const { inst } = refused({ '\uD800': 1, b: 2 });
  assert.deepEqual(inst.read([]), {});
});

test('JC-TC-41 the carrier row precedes the value row', () => {
  const inst = instance();
  assert.throws(
    () => inst.write(undefined, 'mem', null),
    (err) => err.status === 'AddressMalformed',
    'the address carrier is answered before the value is classified',
  );
});

test('JC-TC-42 the node boundary is stated at both sides', () => {
  // `test-cases.md` `JC-TC-42`, re-derived 2026-10-23 (`A149`): *"a dense top-level array of `999,999`
  // elements, and of `1,000,000` elements | `999,999` is admitted (the root consumes the crate's first node);
  // `1,000,000` is `a value over the walk ceiling` at the root `value` position, with
  // `ValueRefusedAtBoundary` — same class and status as depth row 8, not `ValueNotAdmitted`"*. The admitted
  // side is carried INSIDE this cell, not as a separate id (`test-cases.md §6`'s clause of the same date).
  const admitted = instance();
  admitted.write(['v'], 'mem', new Array(NODE_CEILING - 1).fill(0));
  const back = admitted.read(['v']);
  assert.ok(Array.isArray(back), 'the admitted side crosses as a dense array');
  assert.equal(back.length, NODE_CEILING - 1,
    '999,999 nodes are admitted: the root consumes the crate\'s first node');
  assert.equal(back[back.length - 1], 0, 'the last element crosses intact');

  const { err } = refused(new Array(NODE_CEILING).fill(0));
  assertClass(err, 'a value over the walk ceiling');
});

// ── RESIDUE AND SCOPE ───────────────────────────────────────────────────────────────────────────────

test('JC-TC-43 the address carriers are untouched', () => {
  const inst = instance();
  inst.write(['a'], 'mem', { 0: 'x' });
  assert.equal(inst.read(['a', '0']), 'x');
});

test('JC-TC-44 the JS test tree carries no tagged value-tree literal', () => {
  // **⟶ RE-DERIVED 2026-10-25 BY THE BATTERY'S STRATIFICATION MOVE (`D-5`): THE CELL'S SUBJECT IS STILL THE
  // WHOLE JS TEST TREE, SO THE WALK FOLLOWS IT INTO ALL THREE SCOPES.** The tree this cell scanned was ONE
  // directory (`bindings/js/test/`) because the battery WAS one directory; after the stratification the same
  // thirty-seven files stand under `tests/e2e/`, `tests/integration/` and `tests/unit/`. **A walk of this file's
  // own directory would have kept the cell GREEN over twenty files instead of thirty-seven — a narrowing
  // produced by a path and not by a clause — so the walk is widened to the three scopes and the cell's
  // expectation moves not at all.** Nothing else is re-cut: the same two carrier literals are blanked, the same
  // tag pattern is matched, this file excludes itself, and every other `*.test.mjs` under the three scopes is
  // read.
  const scopes = ['e2e', 'integration', 'unit'].map((scope) => fileURLToPath(new URL(`../${scope}`, import.meta.url)));
  const carrierLiterals = [
    "{ k: 's', v: opId }",
    "{ k: 's', v: 'extra' }",
  ];
  const hits = [];
  const walk = (directory, prefix = '') => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`;
      if (entry.isDirectory()) { walk(join(directory, entry.name), relative); continue; }
      if (!entry.name.endsWith('.test.mjs') || entry.name === 'json-crossing.test.mjs') continue;
      let text = readFileSync(join(directory, entry.name), 'utf8');
      for (const literal of carrierLiterals) text = text.split(literal).join('');
      for (const match of text.matchAll(/\{\s*k:\s*['"](?:s|b|n|g|F|z|u|a|o|c|P|H|y)['"]/g)) {
        hits.push(`${relative}:${match.index}`);
      }
    }
  };
  for (const scope of scopes) walk(scope);
  assert.deepEqual(hits, [], 'the four value-tree tag occurrences are re-spelled; the op-id/errorMessage carriers stay');
});

test('JC-TC-45 both copy-out sites are bare', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: 1 });
  const back = inst.read(['v']);
  assert.equal(JSON.stringify(back), '{"a":1}');
  assert.equal(back.k, undefined);
});

test('JC-TC-46 the fourth dependency entry is serde_json', () => {
  const deps = cargoDependencies();
  assert.equal(deps.length, 4, `the binding crate has exactly four direct dependencies; got ${deps.length}`);
  assert.ok(deps.some((line) => line.startsWith('serde_json = "1"')), 'serde_json = "1" is the fourth entry');
  assert.ok(/napi\s*=.*serde-json/.test(readFileSync(new URL('../../bindings/js/Cargo.toml', import.meta.url), 'utf8')),
    'napi carries the serde-json feature');
});

test('JC-TC-47 no fifth dependency entry is admitted', () => {
  assert.ok(cargoDependencies().length <= 4, 'no fifth direct dependency');
});

// **⟶ RE-DERIVED 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set for
// both S/N"*): THE SET IS NINETEEN, AND THE TITLE MOVES WITH IT.** `ValueRefusedAtBoundary` keeps rank `17`
// and is no longer last; the two appended terms are `ConstraintBodyThrew` at rank `18` and
// `ConstraintRefusedAtRegistration` at rank `19`. **THE CELL IS THE SAME READ** — the store's own array, its
// declared length and two named members — and only the figure moves, because a cell that kept `17` would be
// asserting the superseded census and not the ruling's.
//
// **⟶ AND RE-DERIVED AGAIN 2026-10-26 (`DEF-H`/`DEF-W`; the architect, verbatim: *"Expand the returned
// fail-state list to include the refusal"* and *"Assert the constraints on rollback"*): THE SET IS TWENTY, AND
// THE TITLE MOVES WITH IT AGAIN.** The appended term is `ConstraintPassRefused` at rank `20` — the ONE member
// a CONSTRAINT REFUSAL answers with (a write's attempt, and a reversal whose terminal state a registered
// constraint refuses) — and **NO RANK OF `1`…`19` MOVES**, `FileCommitFailed` keeping rank `15` as the SAVE's
// code alone. **THE CELL IS STILL THE SAME READ** and only the figure and one named member move.
test('JC-TC-48 the store set is 20 with ValueRefusedAtBoundary at rank 17, ConstraintBodyThrew at 18, ConstraintRefusedAtRegistration at 19 and ConstraintPassRefused at 20', () => {
  const text = readFileSync(new URL('../../src/error.rs', import.meta.url), 'utf8');
  assert.match(text, /CODES:\s*\[&str;\s*20\]/);
  assert.ok(text.includes('ValueRefusedAtBoundary'));
  assert.ok(text.includes('ConstraintBodyThrew'));
  assert.ok(text.includes('ConstraintRefusedAtRegistration'));
  assert.ok(text.includes('ConstraintPassRefused'));
});

// ── THE SEVENTEENTH CLASS ─────────────────────────────────────────────────────────────────────────────

test('JC-TC-49 an array carrying a non-index own member is refused', async () => {
  // `test-cases.md` `JC-TC-49`, added 2026-10-24 (`test-cases.md §3`'s clause of that date, items `(1)`–`(2)`;
  // `contract.md §2`'s clause of the same date on the gate-11 finding `F-RA-5`, items `(1)`–`(8)`): an array like
  // `const a = [1]; a.foo = 3` must be REFUSED as row `17`, class `an array carrying a non-index own member`, at
  // the ARRAY'S OWN value position, with `ValueRefusedAtBoundary`. **THE ROW IS A DECLARED TARGET LAW AND THE
  // BUILD DOES NOT ANSWER IT YET** — item `(8)` says it in as many words: the walk reads an array by INDEX alone,
  // so the member is DROPPED and the value ADMITTED. **This cell is therefore the owed red, and it asserts the
  // contract's answer and never today's.**
  //
  // THE DISCIPLINE IS THE FILE'S OWN REFUSAL DISCIPLINE, driven on the PERSISTENT route exactly as `JC-TC-27` is,
  // so the ordering is observable: a refusal that admitted the value and then failed at the store's commit would
  // answer a store status here, and the file's bytes, the register and a fresh boot would all show it.
  const dir = mkdtempSync(join(tmpdir(), 'jc-tc-49-'));
  const filePath = join(dir, 'store.json');
  const inst = storeCreate({ filePath, journalLength: 8, listeners: [] });
  // A COMMITTED VALUE FIRST, so "the file is unchanged" is asserted over a NON-EMPTY store rather than over an
  // empty file that a refusal could not have changed either way.
  runAttempt(inst, kernelCommit(inst, ['seed'], 'file', 'kept'));
  const before = readFileSync(filePath, 'utf8');
  const registerBefore = inst.read([]);

  const ROW_17 = 'an array carrying a non-index own member';
  // PART ONE is the store generator's own bytes and PART TWO the package's appended clause
  // (`contract.md §2.1`, `parameter-semantics.md §3`); the generator supplies the single quoting, so the class
  // spelling — which is also the SUBJECT at this row — appears quoted.
  const partOne = `'${ROW_17}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + 'booleans, finite numbers, plain objects and arrays';
  const partTwo = `, the value at ${VALUE_POSITION} is ${ROW_17}`;

  const carryingArray = [1];
  carryingArray.foo = 3;
  let err = null;
  try {
    runAttempt(inst, kernelCommit(inst, ['v'], 'file', carryingArray));
  } catch (caught) {
    err = caught;
  }
  assert.ok(err, 'the contract refuses an array carrying a non-index own member; the value was admitted (the build drops the member)');
  assertClass(err, ROW_17);
  assert.equal(err.status, STATUS);
  assert.equal(err.message, `${partOne}${partTwo}`,
    'the refusal is the declared two-part rendering, with the class spelling as BOTH parts\' subject and class');
  assert.ok(!err.message.includes('foo'),
    `the position is the ARRAY's own value position and never the extra member's; got ${JSON.stringify(err.message)}`);

  // THE STORE'S FILE IS UNCHANGED, THE REGISTER IS UNMOVED, AND A FRESH INSTANCE OVER THE SAME FILE BOOTS TO THE
  // SAME STATE — the refusal precedes every store verb (`contract.md §1`: *"A refusal is answered before any store
  // verb is called"*).
  assert.equal(readFileSync(filePath, 'utf8'), before, 'the refusal precedes every store verb: no byte of the store file moved');
  assert.deepEqual(inst.read([]), registerBefore, 'the refusal creates no node, anchor or journal entry');
  const fresh = storeCreate({ filePath, journalLength: 8, listeners: [] });
  assert.deepEqual(fresh.read([]), registerBefore, 'a fresh instance over the same file boots to the same register');
  assert.equal(fresh.read(['seed'], 'file'), 'kept', 'the value committed before the drive still reads back');
  assert.throws(() => fresh.read(['v'], 'file'), (caught) => caught.status === 'AddressNotFound',
    'nothing was admitted: a fresh instance over the same path holds no value at the address');

  // THE CELL'S OTHER TWO `Case` DRIVES, both from `test-cases.md §3`'s clause of that date, item `(1)`:
  const assigned = Object.assign([1, 2], { note: 'x' });
  const assignedError = (() => {
    try {
      instance().write(['v'], 'mem', assigned);
    } catch (caught) {
      return caught;
    }
    return null;
  })();
  assert.ok(assignedError, '`Object.assign([1, 2], { note: "x" })` is the same shape and must be refused');
  assertClass(assignedError, ROW_17);

  const nonCanonical = [1];
  nonCanonical['01'] = 9;
  const nonCanonicalError = (() => {
    try {
      instance().write(['v'], 'mem', nonCanonical);
    } catch (caught) {
      return caught;
    }
    return null;
  })();
  assert.ok(nonCanonicalError, "an own enumerable key that looks like an index and is not a canonical one (`'01'`) must be refused");
  assertClass(nonCanonicalError, ROW_17);

  // AND AT A MEMBER POSITION the position is the ARRAY's own value position, `member 'x' of the write's value
  // argument`, never the extra member's.
  const nestedError = (() => {
    try {
      instance().write(['v'], 'mem', { x: carryingArray });
    } catch (caught) {
      return caught;
    }
    return null;
  })();
  assert.ok(nestedError, 'the row holds at a member position too');
  assertClass(nestedError, ROW_17, "member 'x' of the write's value argument");
});

// ── THE FIVE STATES THE GATE-11 THIRD AUDIT DECLARED — rows `16`, `14`/`13`, `3`/`8` and `8` ──────────
// (`test-cases.md §3`'s clause of 2026-10-24, items `(1)`–`(4)`, adds `JC-TC-50`…`JC-TC-54` at the END of the
// range; `contract.md §2`'s clauses of the same date on `F-RA-11`, `F-RA-12` and `F-RA-14` and `§2.1`'s clause
// of the same date on `F-RA-13` declare the laws. **EVERY CELL BELOW IS RED AT THE SHIPPED TREE AND EVERY ONE
// ASSERTS THE CONTRACT'S ANSWER AND NEVER TODAY'S.**)
//
// **THE TWO DRIVING DISCIPLINES THESE CELLS TAKE, STATED ONCE AND CITED AT EVERY SITE:**
//   (1) **EVERY TRAP / ACCESSOR COUNTER IS PROVED LIVE BEFORE IT IS ASSERTED `0`** — the instrument that counts
//       is first driven DIRECTLY (a `String(...)`, a `Reflect` read, an index read) on a value the cell built
//       for the proof, and only then is a FRESH instrument built and driven through the crossing, so a `0` is a
//       statement about the refusal path and not about an inert counter (`contract.md §2.1`'s clause of
//       2026-10-24 on `DEF-2026-10-24-D`, item `(1)`; `§2`'s clause of this date on `F-RA-12`, item `(7)`).
//   (2) **EVERY INTRINSIC PROTOTYPE MUTATED BY A DRIVE IS RESTORED IN A `finally` AND THE RESTORE IS PROVED** —
//       `Array.prototype`, `Object.prototype` and `Function.prototype` each read as carrying nothing at the
//       member this cell added, beside a rendering that shows the language's own answer is back.

test('JC-TC-50 an index whose only carrier is the prototype is a hole and is refused', async () => {
  // `test-cases.md` `JC-TC-50`, added 2026-10-24 (`contract.md §2`'s clause of this date on `F-RA-11`, items
  // `(1)`, `(3)`, `(4)`, `(5)` and `(7)`): **A HOLE IS AN INDEX BELOW `length` WITH NO OWN PROPERTY**, so a
  // PROTOTYPE-CARRIED INDEX IS NOT AN ELEMENT and never becomes one at the boundary. The shipped walk tests its
  // holes with `in` — `[[HasProperty]]`, which walks the chain — so today
  // `Array.prototype[0] = 'x'; const a = new Array(2); a[1] = 'y'` is ADMITTED and the tree that crosses is
  // `['x', 'y']`, AN ELEMENT THE CALLER'S ARRAY NEVER OWNED. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2`'s row `16`, its clause of this date on `F-RA-11`
  // and `§2.1`'s per-arm row `16`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | an index whose only carrier is `Array.prototype`, as a DATA member (`Array.prototype[0] = 'x'`) | REFUSED, row `16`'s class `a sparse array`, at the ARRAY'S OWN value position, subject the class spelling, status `ValueRefusedAtBoundary` |
  // | the same shape with the carrier an ACCESSOR (`Object.defineProperty(Array.prototype, '0', { get })`) | the SAME refusal, and the inherited getter RUNS NOWHERE — its counter is `0` |
  // | a genuinely dense array whose every index is OWN, under the same mutated prototype | ADMITTED and round-tripped, carrying the caller's OWN elements and never the prototype's |
  // | an array carrying an OWN hole with no prototype carrier (`[1, , 3]`), under the same mutation | REFUSED as row `16` — unmoved by this cell |
  //
  // **TWO DRIVING ACCOMMODATIONS, NAMED RATHER THAN LEFT TO A READER** (`role_test_writer`; the rule is DRIVE
  // from the implementation, EXPECT from the spec): **(a)** the accessor carrier is installed as a GET/SET
  // PAIR. A getter-only member at `Array.prototype`'s index `0` makes EVERY `push` on an array of length `0`
  // throw inside the package's own carrier encoding (`encodeAddress`'s `segments`, `write`'s `args`), so the
  // value walk is never reached at all — measured, and NOT this clause's subject (`§2`'s clause of this date,
  // item `(8)`, puts the three `in` tests at carrier positions outside it). The setter defines an own property
  // on the receiver, exactly as `push` would, so the carrier path is unaffected while the SHAPE UNDER TEST —
  // an index with NO OWN property whose only carrier is the prototype — is unchanged. **(b)** the accessor
  // drive is taken on the MEMORY route, because the file-tier attempt's own machinery is not what this state
  // is about; the file's bytes and the register are read on the DATA-carrier drive, which takes the persistent
  // route exactly as `JC-TC-49` does.
  const ROW_16 = 'a sparse array';
  const partOne = `'${ROW_16}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + 'booleans, finite numbers, plain objects and arrays';
  const partTwo = `, the value at ${VALUE_POSITION} is ${ROW_16}`;

  // A COMMITTED VALUE FIRST, so "the file is unchanged" and "the register is unmoved" are asserted over a
  // NON-EMPTY store rather than over an empty one a refusal could not have changed either way.
  const dir = mkdtempSync(join(tmpdir(), 'jc-tc-50-'));
  const filePath = join(dir, 'store.json');
  const inst = storeCreate({ filePath, journalLength: 8, listeners: [] });
  runAttempt(inst, kernelCommit(inst, ['seed'], 'file', 'kept'));
  const before = readFileSync(filePath, 'utf8');
  const registerBefore = inst.read([]);

  const refusedSparse = (target) => {
    const value = new Array(2);
    value[1] = 'y';
    let err = null;
    try {
      runAttempt(target, kernelCommit(target, ['v'], 'file', value));
    } catch (caught) {
      err = caught;
    }
    return err;
  };

  // (1) THE INHERITED DATA CARRIER — the clause's own printed counterexample.
  let dataError = null;
  try {
    Array.prototype[0] = 'x';
    dataError = refusedSparse(inst);
  } finally {
    delete Array.prototype[0];
  }
  assert.equal(Object.hasOwn(Array.prototype, '0'), false,
    'the drive must restore Array.prototype: index 0 is no longer an own member of it');
  assert.equal(0 in [], false, 'the restore is proved a second way: the index is no longer carried by the chain');
  assert.ok(dataError,
    'an index carried only by Array.prototype is a HOLE by §2\'s clause of 2026-10-24 on F-RA-11, item (1), '
    + 'so the array is REFUSED as row 16; the build admitted it and crossed an element the caller never owned');
  assertClass(dataError, ROW_16);
  assert.equal(dataError.status, STATUS);
  assert.equal(dataError.message, `${partOne}${partTwo}`,
    'the refusal is the declared two-part rendering, with the class spelling as BOTH parts\' subject and class');
  assert.ok(!dataError.message.includes('\'x\''),
    `the prototype's member never reaches the message: the subject is the class spelling; got ${JSON.stringify(dataError.message)}`);
  assert.equal(readFileSync(filePath, 'utf8'), before,
    'the refusal precedes every store verb: no byte of the store file moved');
  assert.deepEqual(inst.read([]), registerBefore,
    'the refusal creates no node, anchor or journal entry');

  // (2) THE INHERITED ACCESSOR CARRIER — the same law, and the getter runs NOWHERE.
  let accessorReads = 0;
  let accessorError = null;
  try {
    Object.defineProperty(Array.prototype, '0', {
      get() {
        accessorReads += 1;
        return 'x';
      },
      set(value) {
        Object.defineProperty(this, '0', { value, writable: true, enumerable: true, configurable: true });
      },
      enumerable: false,
      configurable: true,
    });
    accessorError = (() => {
      const value = new Array(2);
      value[1] = 'y';
      try {
        instance().write(['v'], 'mem', value);
      } catch (caught) {
        return caught;
      }
      return null;
    })();
  } finally {
    delete Array.prototype[0];
  }
  const accessorReadsOnTheRefusal = accessorReads;
  assert.equal(Object.hasOwn(Array.prototype, '0'), false,
    'the drive must restore Array.prototype after the accessor carrier');
  assert.ok(accessorError,
    'a prototype-carried ACCESSOR at an index is still a hole (§2\'s clause of this date, item (5)): the array '
    + 'is REFUSED as row 16; the build read the inherited getter and admitted the array');
  assertClass(accessorError, ROW_16);
  assert.equal(accessorError.message, `${partOne}${partTwo}`);
  assert.equal(accessorReadsOnTheRefusal, 0,
    '§2\'s clause of this date, item (5)(b): no inherited accessor at an index is read on ANY path — the getter '
    + `RAN on the refusal path (count ${accessorReadsOnTheRefusal})`);

  // (3) THE CONTROL — an array carrying an OWN hole and NO prototype carrier is row `16`'s subject, unmoved.
  let ownHoleError = null;
  try {
    Array.prototype[0] = 'x';
    try {
      instance().write(['v'], 'mem', [1, , 3]);
    } catch (caught) {
      ownHoleError = caught;
    }
  } finally {
    delete Array.prototype[0];
  }
  assert.ok(ownHoleError, 'an array with an OWN hole is row 16\'s subject before and after this clause');
  assertClass(ownHoleError, ROW_16);

  // (4) THE CONTROL — a genuinely dense array (every index OWN) is ADMITTED under the same mutated prototype,
  // and the tree that crosses carries the caller's own elements and never the prototype's member.
  let denseError = null;
  let denseBack = null;
  try {
    Array.prototype[0] = 'x';
    const dense = ['a', 'b'];
    try {
      const denseInst = instance();
      denseInst.write(['v'], 'mem', dense);
      denseBack = denseInst.read(['v']);
    } catch (caught) {
      denseError = caught;
    }
  } finally {
    delete Array.prototype[0];
  }
  assert.equal(denseError, null,
    `a genuinely dense array is ADMITTED under the same mutated prototype; it was refused (${denseError && denseError.message})`);
  assert.deepEqual(denseBack, ['a', 'b'],
    'a dense array round-trips its OWN elements: the prototype\'s member is never an element of the tree');
});

test('JC-TC-51 a Proxy standing as a prototype is refused as its row\'s class with no trap run', () => {
  // `test-cases.md` `JC-TC-51`, added 2026-10-24 (`contract.md §2`'s clause of this date on `F-RA-12`, items
  // `(2)`, `(5)`, `(6)` and `(7)`): **A PROTOTYPE LINK THAT IS A `Proxy` — INCLUDING A REVOKED ONE — IS
  // ANSWERED AS `'class'`, WITH NO TRAP RUN AND BEFORE ANY CENSUS READ OF IT.** The shipped walk reads a link's
  // census (`Object.getPrototypeOf(proto)` · `Object.getOwnPropertyNames(proto)` · the symbol census), so a
  // LYING handler's traps run before the refusal is answered — and can turn a subclass-shaped prototype into an
  // ADMISSION. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2`'s rows `13`/`14`, its clause of this date on
  // `F-RA-12` and `§2.1`'s per-arm rows `13`/`14`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | a `Proxy` over an `Object.create(null)` target standing as a NON-ARRAY value's prototype, with a LYING handler (`ownKeys` reporting the standard `Object.prototype` member set, `getPrototypeOf` reporting `null`) | REFUSED, row `14`'s class `a class instance or another prototype-carrying non-plain object`, at the value's own position, subject the class spelling — and EVERY handler trap counted `0` |
  // | the same shape on an ARRAY value (`getPrototypeOf` reporting an `Object.prototype`-shaped link, `ownKeys` reporting the standard `Array.prototype` name AND symbol sets) | REFUSED, row `13`'s class `a class extending Array`, at the value's own position, subject the class spelling — every trap `0` |
  // | a REVOKED `Proxy` standing as a prototype | REFUSED as its row's class, no trap (none can run), and NO host error escapes |
  // | the CONTROL — a `Proxy` standing as a VALUE (`new Proxy({}, handler)`) | REFUSED as row `12`'s class `a Proxy`, with every handler trap `0` |
  // | the CONTROL — an ordinary `{}`, `{a: 1}` and `[1, 2]` | ADMITTED and round-tripped |
  //
  // **ON THE BRIEF'S *"HONEST-PROXY CONTROL STILL ADMITTED"*, DECLARED RATHER THAN SILENTLY DROPPED: NO
  // ADMISSION EXISTS FOR ANY `Proxy` STANDING AS A PROTOTYPE LINK.** `§2`'s clause of this date, item `(5)`,
  // reads *"a prototype link that is a `Proxy` — including a revoked one — is answered as `'class'`"* with no
  // exception for an honest handler, and `test-cases.md §3`'s clause of this date, item `(6)(b)`, forbids a
  // cell from asserting *"a trap-running prototype state as an admission"*. **The honest handler is therefore
  // driven where the law gives it an answer — as a VALUE, at row `12` — its own counters are proved live and
  // then asserted `0`, and the ADMITTED controls are the ordinary plain values.**
  const ROW_12 = 'a Proxy';
  const ROW_13 = 'a class extending Array';
  const ROW_14 = 'a class instance or another prototype-carrying non-plain object';
  const LIE = 'CALLER_CONTROLLED_PROTOTYPE_JC51';
  const TRAP_KEYS = ['get', 'has', 'ownKeys', 'getOwnPropertyDescriptor', 'getPrototypeOf'];

  // THE INSTRUMENT, BUILT FRESH PER DRIVE: five separately counted traps. `lying` reports the member set the
  // `Proxy` STANDS FOR (the shape an admission needs); an honest build forwards to its target.
  const countedProxy = (limb, { lying }) => {
    const counters = { get: 0, has: 0, ownKeys: 0, getOwnPropertyDescriptor: 0, getPrototypeOf: 0 };
    const target = Object.create(null);
    const standardKeys = limb === 'array'
      ? [...Object.getOwnPropertyNames(Array.prototype), ...Object.getOwnPropertySymbols(Array.prototype)]
      : Object.getOwnPropertyNames(Object.prototype);
    const handler = lying
      ? {
        get() { counters.get += 1; return LIE; },
        has() { counters.has += 1; return false; },
        ownKeys() { counters.ownKeys += 1; return [...standardKeys]; },
        getOwnPropertyDescriptor() {
          counters.getOwnPropertyDescriptor += 1;
          return { value: 1, writable: true, enumerable: false, configurable: true };
        },
        getPrototypeOf() {
          counters.getPrototypeOf += 1;
          return limb === 'array' ? Object.prototype : null;
        },
      }
      : {
        get(t, key, receiver) { counters.get += 1; return Reflect.get(t, key, receiver); },
        has(t, key) { counters.has += 1; return Reflect.has(t, key); },
        ownKeys(t) { counters.ownKeys += 1; return Reflect.ownKeys(t); },
        getOwnPropertyDescriptor(t, key) {
          counters.getOwnPropertyDescriptor += 1;
          return Reflect.getOwnPropertyDescriptor(t, key);
        },
        getPrototypeOf(t) { counters.getPrototypeOf += 1; return Reflect.getPrototypeOf(t); },
      };
    return { proxy: new Proxy(target, handler), counters };
  };

  const trappedValue = (built, limb) => {
    if (limb !== 'array') return Object.create(built.proxy);
    const array = [1, 2];
    Object.setPrototypeOf(array, built.proxy);
    return array;
  };

  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // THE LIVENESS PROOF, TAKEN ONCE AND ON A TWIN: each of the five traps is driven DIRECTLY and its own counter
  // must move, so no `0` asserted below can be an inert counter's.
  const live = countedProxy('object', { lying: true });
  Object.getPrototypeOf(live.proxy);
  Object.getOwnPropertyNames(live.proxy);
  Object.getOwnPropertyDescriptor(live.proxy, 'probe');
  live.proxy.probe;
  'probe' in live.proxy;
  for (const key of TRAP_KEYS) {
    assert.ok(live.counters[key] > 0,
      `the ${key} trap's counter is DEAD: a direct Reflect/Object read of the instrument ran it ${live.counters[key]} times`);
  }

  // (1) THE LYING HANDLER AS A PROTOTYPE — the non-array limb answers row `14`, the array limb row `13`.
  for (const [label, limb, cls] of [
    ['a LYING Proxy as the prototype of a NON-ARRAY value', 'object', ROW_14],
    ['a LYING Proxy as the prototype of an ARRAY value', 'array', ROW_13],
  ]) {
    const built = countedProxy(limb, { lying: true });
    const err = drive(trappedValue(built, limb));
    assert.ok(err,
      `${label}: a Proxy prototype link is answered as 'class' (§2's clause of this date on F-RA-12, item (5)); `
      + 'the build read the link\'s census, believed the lying handler and ADMITTED the value');
    assertClass(err, cls);
    assert.equal(err.status, STATUS);
    for (const key of TRAP_KEYS) {
      assert.equal(built.counters[key], 0,
        `${label}: the ${key} trap RAN on the refusal path (count ${built.counters[key]}) — `
        + 'the class answer is taken with util.types.isProxy alone, before any census read of the link');
    }
    assert.ok(!err.message.includes(LIE) && !JSON.stringify(err).includes(LIE),
      `${label}: the lying handler's MARKER reached the refusal object: ${JSON.stringify(err.message)}`);
  }

  // (2) THE REVOKED PROXY AS A PROTOTYPE — refused as its row's class, and no host error escapes.
  const revocable = Proxy.revocable(Object.create(null), {});
  const revokedValue = Object.create(revocable.proxy);
  revocable.revoke();
  assert.throws(() => Object.getPrototypeOf(revocable.proxy), (caught) => caught instanceof TypeError,
    'the instrument is proved revoked: reading it directly throws');
  const revokedError = drive(revokedValue);
  assert.ok(revokedError, 'a REVOKED Proxy standing as a prototype is refused as its row\'s class');
  assertClass(revokedError, ROW_14);
  assert.deepEqual(Object.keys(revokedError).sort(), ['log', 'message', 'status'],
    'the refusal is the one three-member form: a revoked link costs no second form and no raw host error');
  assert.ok(!(revokedError instanceof Error), 'no host error escapes for the revoked link');

  // (3) THE CONTROLS — a `Proxy` as a VALUE answers row `12` with every trap `0`, and the ordinary values are
  // admitted and round-tripped.
  const honest = countedProxy('object', { lying: false });
  const proxyValueError = drive(honest.proxy);
  assert.ok(proxyValueError, 'a Proxy standing as a VALUE is row 12\'s subject');
  assertClass(proxyValueError, ROW_12);
  for (const key of TRAP_KEYS) {
    assert.equal(honest.counters[key], 0,
      `the Proxy-value arm ran the ${key} trap (count ${honest.counters[key]}): util.types.isProxy reads no member`);
  }
  for (const [label, value] of [['an empty object', {}], ['a plain object', { a: 1 }], ['a dense array', [1, 2]]]) {
    const inst = instance();
    inst.write(['v'], 'mem', value);
    assert.deepEqual(inst.read(['v']), value, `${label} is ADMITTED and round-trips: the control is unmoved`);
  }
});

test('JC-TC-52 an added Symbol.toPrimitive on a shape-standard prototype never renders a refused value', () => {
  // `test-cases.md` `JC-TC-52`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F-RA-13`, item
  // `(1a)`, read with item `(6)`'s branch condition): **THE EXEMPTION SENDS A PROTOTYPE IT JUDGES
  // LANGUAGE-STANDARD BY SHAPE PAST THE CONVERSION TEST — the carrying test asks NAMES only and no realm's
  // intrinsic prototype carries an own `Symbol.toPrimitive` — SO AN ADDED `Symbol.toPrimitive` ON SUCH A
  // PROTOTYPE IS EXEMPT AND `String(value)` REACHES IT.** The remedy is one own-descriptor read of
  // `Symbol.toPrimitive` per link, taken BEFORE the exemption stops the walk; the arm then answers its CLASS
  // SPELLING. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2.1`'s per-arm table's row `3` and row-`8`-depth
  // cells, its clause of this date on `F-RA-13` items `(1a)`, `(4)` and `(6)`, and `test-cases.md`'s row):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | row `8`'s DEPTH ARM, the refused value an object whose only conversion path is a `Symbol.toPrimitive` ADDED to `Object.prototype` | row `8`'s CLASS SPELLING `a value over the walk ceiling` as the subject, the added member's counter `0`, and the marker absent from the whole refusal object |
  // | row `3`, the refused function whose only conversion path is a `Symbol.toPrimitive` ADDED to `Function.prototype` | row `3`'s CLASS SPELLING `a function` as the subject, the counter `0` |
  // | the CONTROL — an ordinary `{}` at row `8`'s depth arm, unmutated chains | the sanctioned rendering `'[object Object]'` survives |
  // | the CONTROL — `[1, 2]` at row `8`'s depth arm | the sanctioned rendering `'1,2'` survives |
  // | the CONTROL — a plain function at row `3` | its own source text survives |
  const ROW_3 = 'a function';
  const ROW_8 = 'a value over the walk ceiling';
  const MARKER = 'CALLER_CONTROLLED_SUBJECT_JC52';
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const declaredMessage = (subject, cls, position = VALUE_POSITION) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (1) ROW `8`'s DEPTH ARM — the added member on `Object.prototype`.
  let depthReads = 0;
  let depthError = null;
  try {
    Object.defineProperty(Object.prototype, Symbol.toPrimitive, {
      value() { depthReads += 1; return MARKER; },
      configurable: true,
      writable: true,
    });
    // THE INSTRUMENT IS LIVE: ToPrimitive reaches the added member on the refused value's own chain.
    const liveRendering = String({});
    assert.ok(depthReads > 0 && liveRendering.includes(MARKER),
      `the row 8 depth-arm instrument is DEAD: String({}) under the added member answered ${JSON.stringify(liveRendering)}`);
    depthReads = 0;
    depthError = drive(arrayChain({}, 127));
  } finally {
    delete Object.prototype[Symbol.toPrimitive];
  }
  const depthReadsOnTheRefusal = depthReads;
  assert.equal(Object.hasOwn(Object.prototype, Symbol.toPrimitive), false,
    'the drive must restore Object.prototype: no own Symbol.toPrimitive remains');
  assert.equal(String({}), '[object Object]',
    'the restore is proved a second way: the language\'s own rendering is back');
  assert.ok(depthError,
    'a Symbol.toPrimitive ADDED to a shape-standard prototype is a conversion path the arm may not take '
    + '(§2.1\'s clause of this date on F-RA-13, item (1a)): the arm answers the CLASS SPELLING');
  assert.equal(depthError.status, STATUS);
  assert.equal(depthError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'PART ONE\'s subject and PART TWO\'s class are the row\'s class spelling, at the depth arm\'s own position');
  assert.equal(depthReadsOnTheRefusal, 0,
    `the added Symbol.toPrimitive RAN on the refusal path (count ${depthReadsOnTheRefusal})`);
  assert.ok(!depthError.message.includes(MARKER) && !JSON.stringify(depthError).includes(MARKER),
    `the added member's MARKER reached the refusal object: ${JSON.stringify(depthError.message)}`);

  // (2) ROW `3` — the added member on `Function.prototype`.
  let functionReads = 0;
  let functionError = null;
  const sample = function crossingSample() {};
  try {
    Object.defineProperty(Function.prototype, Symbol.toPrimitive, {
      value() { functionReads += 1; return MARKER; },
      configurable: true,
      writable: true,
    });
    const liveRendering = String(sample);
    assert.ok(functionReads > 0 && liveRendering.includes(MARKER),
      `the row 3 instrument is DEAD: String(fn) under the added member answered ${JSON.stringify(liveRendering)}`);
    functionReads = 0;
    functionError = drive(sample);
  } finally {
    delete Function.prototype[Symbol.toPrimitive];
  }
  const functionReadsOnTheRefusal = functionReads;
  assert.equal(Object.hasOwn(Function.prototype, Symbol.toPrimitive), false,
    'the drive must restore Function.prototype: no own Symbol.toPrimitive remains');
  assert.ok(functionError, 'row 3 answers its CLASS SPELLING where the function\'s only conversion path is the added member');
  assert.equal(functionError.status, STATUS);
  assert.equal(functionError.message, declaredMessage(ROW_3, ROW_3),
    'row 3\'s subject and class are the same class spelling');
  assert.equal(functionReadsOnTheRefusal, 0,
    `the added Symbol.toPrimitive RAN on row 3's refusal path (count ${functionReadsOnTheRefusal})`);

  // (3) THE CONTROLS — the three sanctioned renderings stand on the unmutated chains.
  const objectSubject = drive(arrayChain({}, 127));
  assert.ok(objectSubject, 'the depth arm still refuses the deep object');
  assert.equal(objectSubject.message, declaredMessage('[object Object]', ROW_8, deepPath),
    'an ordinary {} reaching Object.prototype.toString still renders \'[object Object]\'');
  const arraySubject = drive(arrayChain([1, 2], 127));
  assert.ok(arraySubject, 'the depth arm still refuses the deep array');
  assert.equal(arraySubject.message, declaredMessage('1,2', ROW_8, deepPath),
    'an array reaching Array.prototype.toString still renders \'1,2\'');
  const functionSubject = drive(function crossingSample() {});
  assert.ok(functionSubject, 'row 3 still refuses the function');
  assert.equal(functionSubject.message, declaredMessage('function crossingSample() {}', ROW_3),
    'a plain function still renders its own source text');
});

test('JC-TC-53 an own or added Symbol.toStringTag accessor never renders a refused value', () => {
  // `test-cases.md` `JC-TC-53`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F-RA-13`, item
  // `(1b)`): `Object.prototype.toString` reads `@@toStringTag` off the refused value — a `[[Get]]` that
  // traverses the chain — so an own `Symbol.toStringTag` ACCESSOR is INVOKED at row `8`'s depth arm, a value
  // the walk refused on ENTRY above the shape arm; and an ADDED one on a shape-standard prototype is reached
  // through the chain the same way. **This cell is that red**, and its control is the row-`5` answer the own
  // accessor already has at its OWN position.
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2.1`'s row-`8`-depth cell and its clause of this
  // date on `F-RA-13`, items `(1b)` and `(6)`; `§2`'s row `5` and its clause of this date on `F-RA-17`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | row `8`'s DEPTH ARM, the refused value owning a `Symbol.toStringTag` ACCESSOR | row `8`'s CLASS SPELLING `a value over the walk ceiling`, the getter's counter `0`, and the marker absent from the whole refusal object |
  // | row `8`'s DEPTH ARM, the accessor ADDED to `Object.prototype` and the refused value an ordinary object | the SAME class spelling, the counter `0` |
  // | the SAME own accessor driven at its OWN VALUE POSITION | row `5`'s class spelling `a value carrying a Symbol-keyed own member`, the getter's counter `0` — unmoved by this cell |
  const ROW_5 = 'a value carrying a Symbol-keyed own member';
  const ROW_8 = 'a value over the walk ceiling';
  const MARKER = 'CALLER_CONTROLLED_TAG_JC53';
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const declaredMessage = (subject, cls, position = VALUE_POSITION) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (1) THE OWN ACCESSOR AT ROW `8`'s DEPTH ARM.
  let ownReads = 0;
  const tagged = Object.defineProperty({}, Symbol.toStringTag, {
    get() { ownReads += 1; return MARKER; },
    enumerable: true,
    configurable: true,
  });
  // THE INSTRUMENT IS LIVE: `Object.prototype.toString` reads the tag off the value.
  const liveRendering = String(tagged);
  assert.ok(ownReads > 0 && liveRendering.includes(MARKER),
    `the own-tag instrument is DEAD: String(value) answered ${JSON.stringify(liveRendering)}`);
  ownReads = 0;
  const ownDepthError = drive(arrayChain(tagged, 127));
  const ownReadsOnTheRefusal = ownReads;
  assert.ok(ownDepthError,
    'an own Symbol.toStringTag ACCESSOR is a further read the sanctioned rendering makes '
    + '(§2.1\'s clause of this date on F-RA-13, item (1b)): the arm answers the CLASS SPELLING');
  assert.equal(ownDepthError.status, STATUS);
  assert.equal(ownDepthError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'the own accessor costs the arm its rendering: the subject is the row\'s class spelling');
  assert.equal(ownReadsOnTheRefusal, 0,
    `the own Symbol.toStringTag getter RAN on the refusal path (count ${ownReadsOnTheRefusal})`);
  assert.ok(!ownDepthError.message.includes(MARKER) && !JSON.stringify(ownDepthError).includes(MARKER),
    `the own getter's MARKER reached the refusal object: ${JSON.stringify(ownDepthError.message)}`);

  // (2) THE ADDED ACCESSOR ON A SHAPE-STANDARD PROTOTYPE at the same depth arm.
  let addedReads = 0;
  let addedError = null;
  try {
    Object.defineProperty(Object.prototype, Symbol.toStringTag, {
      get() { addedReads += 1; return MARKER; },
      configurable: true,
    });
    const live = String({});
    assert.ok(addedReads > 0 && live.includes(MARKER),
      `the added-tag instrument is DEAD: String({}) under the added accessor answered ${JSON.stringify(live)}`);
    addedReads = 0;
    addedError = drive(arrayChain({}, 127));
  } finally {
    delete Object.prototype[Symbol.toStringTag];
  }
  const addedReadsOnTheRefusal = addedReads;
  assert.equal(Object.hasOwn(Object.prototype, Symbol.toStringTag), false,
    'the drive must restore Object.prototype: no own Symbol.toStringTag remains');
  assert.equal(String({}), '[object Object]', 'the restore is proved a second way: the language\'s rendering is back');
  assert.ok(addedError, 'an ADDED Symbol.toStringTag accessor on a shape-standard prototype is reached through the chain');
  assert.equal(addedError.message, declaredMessage(ROW_8, ROW_8, deepPath));
  assert.equal(addedReadsOnTheRefusal, 0,
    `the added Symbol.toStringTag getter RAN on the refusal path (count ${addedReadsOnTheRefusal})`);

  // (3) THE OWN ACCESSOR AT ITS OWN VALUE POSITION — row `5`'s spelling, unmoved by this cell.
  let rootReads = 0;
  const taggedAtRoot = Object.defineProperty({}, Symbol.toStringTag, {
    get() { rootReads += 1; return MARKER; },
    enumerable: true,
    configurable: true,
  });
  const rootError = drive(taggedAtRoot);
  assert.ok(rootError, 'an own Symbol-keyed member is row 5\'s subject at its own position');
  assert.equal(rootError.status, STATUS);
  assert.equal(rootError.message, declaredMessage(ROW_5, ROW_5),
    'row 5\'s spelling is the declared answer for an own Symbol-keyed ACCESSOR '
    + '(§2\'s clause of this date on F-RA-17, item (2))');
  assert.equal(rootReads, 0,
    `the own accessor's getter RAN at its own value position (count ${rootReads})`);
});

test('JC-TC-54 an array at the depth arm never converts its elements on the refusal path', () => {
  // `test-cases.md` `JC-TC-54`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F-RA-13`, item
  // `(1c)`): `Array.prototype.toString` calls `join`, which takes each element by `[[Get]]` and converts it —
  // so at row `8`'s DEPTH arm, where the refused value is an ARRAY, the ELEMENTS' conversion members run, and
  // the walk never classified those elements (the element loop lies BELOW the arm). The remedy reads every own
  // index descriptor and subjects every data element to the same render guard. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2.1`'s clause of this date on `F-RA-13`, items
  // `(1c)` and `(6)`; `§2`'s row `8` — the DEPTH arm — and `§2.1`'s row-`8` depth cell):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | row `8`'s DEPTH ARM over an array whose ELEMENT owns `toString` | row `8`'s CLASS SPELLING `a value over the walk ceiling`, the element's counter `0`, the marker absent from the whole refusal object |
  // | the same arm over an array whose ELEMENT's `toString` sits on a CUSTOM prototype | the SAME class spelling, that element's counter `0` |
  // | the same arm over an array carrying an own ACCESSOR at an element index beside it | the SAME class spelling, and NO getter at an index RUNS — every counter `0` |
  // | the CONTROL — the same depth with PRIMITIVE elements | the sanctioned rendering `'1,2'` survives |
  const ROW_8 = 'a value over the walk ceiling';
  const MARKER = 'CALLER_CONTROLLED_ELEMENT_JC54';
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const declaredMessage = (subject, cls, position = VALUE_POSITION) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (1) AN ELEMENT OWNING `toString`.
  let ownElementReads = 0;
  const owningElement = {
    toString() { ownElementReads += 1; return MARKER; },
  };
  const liveOwn = String(owningElement);
  assert.ok(ownElementReads > 0 && liveOwn.includes(MARKER),
    `the element instrument is DEAD: String(element) answered ${JSON.stringify(liveOwn)}`);
  ownElementReads = 0;
  const ownerError = drive(arrayChain([owningElement, { a: 1 }], 127));
  const ownElementReadsOnTheRefusal = ownElementReads;
  assert.ok(ownerError,
    'an element\'s conversion member is a rendering read the depth arm may not make '
    + '(§2.1\'s clause of this date on F-RA-13, item (1c)): the arm answers the CLASS SPELLING');
  assert.equal(ownerError.status, STATUS);
  assert.equal(ownerError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'the refused array\'s elements are never converted: the subject is the row\'s class spelling');
  assert.equal(ownElementReadsOnTheRefusal, 0,
    `the element's toString RAN on the refusal path (count ${ownElementReadsOnTheRefusal})`);

  // (2) AN ELEMENT WHOSE `toString` SITS ON A CUSTOM PROTOTYPE.
  let prototypeElementReads = 0;
  const elementPrototype = Object.create(null);
  elementPrototype.toString = () => {
    prototypeElementReads += 1;
    return MARKER;
  };
  const prototypeElement = Object.create(elementPrototype);
  const livePrototype = String(prototypeElement);
  assert.ok(prototypeElementReads > 0 && livePrototype.includes(MARKER),
    `the custom-prototype element instrument is DEAD: String(element) answered ${JSON.stringify(livePrototype)}`);
  prototypeElementReads = 0;
  const prototypeError = drive(arrayChain([prototypeElement, 1], 127));
  const prototypeElementReadsOnTheRefusal = prototypeElementReads;
  assert.ok(prototypeError, 'a conversion member one link above an element is the same read');
  assert.equal(prototypeError.message, declaredMessage(ROW_8, ROW_8, deepPath));
  assert.equal(prototypeElementReadsOnTheRefusal, 0,
    `the custom prototype's toString RAN on the refusal path (count ${prototypeElementReadsOnTheRefusal})`);

  // (3) AN OWN ACCESSOR AT AN ELEMENT INDEX BESIDE IT.
  let accessorElementReads = 0;
  let indexReads = 0;
  const owningElementBeside = {
    toString() { accessorElementReads += 1; return MARKER; },
  };
  const withAccessorAtIndex = [owningElementBeside, 2];
  Object.defineProperty(withAccessorAtIndex, 2, {
    get() { indexReads += 1; return MARKER; },
    enumerable: true,
    configurable: true,
  });
  const liveJoin = String(withAccessorAtIndex);
  assert.ok(indexReads > 0 && accessorElementReads > 0 && liveJoin.includes(MARKER),
    `the index instrument is DEAD: String(array) answered ${JSON.stringify(liveJoin)}`);
  accessorElementReads = 0;
  indexReads = 0;
  const accessorError = drive(arrayChain(withAccessorAtIndex, 127));
  const indexReadsOnTheRefusal = indexReads;
  const elementReadsOnTheRefusal = accessorElementReads;
  assert.ok(accessorError, 'an own accessor at an element index is refused by descriptor at the depth arm');
  assert.equal(accessorError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'no element is read by [[Get]]: the subject is the row\'s class spelling');
  assert.equal(indexReadsOnTheRefusal, 0,
    `the accessor at element index 2 RAN on the refusal path (count ${indexReadsOnTheRefusal})`);
  assert.equal(elementReadsOnTheRefusal, 0,
    `the element beside it converted on the refusal path (count ${elementReadsOnTheRefusal})`);

  // (4) THE CONTROL — the same depth with PRIMITIVE elements still renders `'1,2'`.
  const primitiveSubject = drive(arrayChain([1, 2], 127));
  assert.ok(primitiveSubject, 'the depth arm still refuses the deep array of primitives');
  assert.equal(primitiveSubject.message, declaredMessage('1,2', ROW_8, deepPath),
    'every element a primitive: the arm renders the sanctioned \'1,2\' and no guard is taken');
});

test('JC-TC-55 a carrier position\'s subject is its own declared descriptor and never undefined', () => {
  // `test-cases.md §4` `JC-TC-55`, added 2026-10-24 (`contract.md §2.1`'s clause of that date on `F-RA-18`,
  // items `(c)`, `(d)(ii)` and `(e)`, read with `(a)`, `(d)(i)`, `(d)(iii)`, `(f)` and `(g)`): **AT A CARRIER
  // POSITION THE SUBJECT IS THAT POSITION'S OWN DECLARED DESCRIPTOR, NEVER `undefined`.** The render guard at
  // `bindings/js/index.mjs:1333` returns the row class it is HANDED, and the ONE-ARGUMENT carrier call at
  // `:2334` (`constraintAddress`) hands none — a carrier position declares no row class, because `§2`'s
  // seventeen rows are the WALK's — so an address carrying an own `toString`, `valueOf`, `@@toPrimitive` or
  // `@@toStringTag` rendered the eleven characters `'undefined'` at that entry's `<SEGMENT>` slot where the
  // declared fallback `classSpelling(value)` (item `(e)`) belongs. **This cell is that red.**
  //
  // **THE CELL ASSERTS THE SUBJECT BYTE AND NO STATUS** (item `(f)`): the carrier refusal's status, code and
  // prose are that route's own and this item re-decides none of them, so the message below is asserted for the
  // subject it carries and the prose it carries is quoted from the store's own `ConstraintListInvalid` row and
  // not re-authored here. **NO TRAP COUNTER IS ASSERTED `0` WITHOUT ITS INSTRUMENT BEING PROVEN LIVE FIRST**,
  // and every drive that touches a value's own member proves liveness by driving that member directly.
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2.1`'s clause of this date on `F-RA-18`, items
  // `(c)`, `(d)(i)`, `(d)(ii)`, `(d)(iii)`, `(e)` and `(g)`; `test-cases.md`'s `JC-TC-55` row):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | the constraint entry's `address` carrying an own `toString` | the carrier slot's subject is the address's CLASS SPELLING `a plain object` — single-quoted by the carrier's own spelling — with the member's counter `0` and its marker in no byte of the refusal |
  // | the same with an own `valueOf` | the SAME class spelling, counter `0` |
  // | the same with an own `Symbol.toPrimitive` | the SAME class spelling, counter `0` |
  // | the same with an own `Symbol.toStringTag` DATA member | the SAME class spelling, and the data value in no byte of the refusal (item `(1b)`'s KEY read, at this slot too) |
  // | the same with an own `Symbol.toStringTag` ACCESSOR | the SAME class spelling, getter `0` |
  // | a `null`-prototype address carrying an own `toString` | the SAME class spelling — `classSpelling`'s own reading of `protoClass`'s `'null'` limb |
  // | the CONTROL — an address of plain `{}` shape | `'[object Object]'`: `String({})`, byte-identical to the pre-guard rendering (item `(g)`) |
  // | the CONTROL — a primitive string address | `'a'`, unmoved |
  // | the CONTROL — a `Proxy` address | `'a Proxy'`: the Proxy arm answers its class spelling BEFORE the guard, with no handler run |
  // | the CONTROL — a `null`-prototype address with no renderer at all | `'a plain object'`: the guarded `catch`'s own fallback, the very byte the guard's fallback now answers |
  // | the CONTROL — an in-domain segment list | ADMITTED, no refusal at all |
  // | every `(d)(i)` carrier slot and the `(d)(iii)` `cfg.listeners` slot | that position's own declared descriptor — the value's own `String` rendering at `(d)(i)`, a literal plus a class spelling at `(d)(iii)` — and the word `undefined` at NO carrier position |
  const PLAIN = 'a plain object';
  const MARKER = 'CALLER_CONTROLLED_CARRIER_JC55';
  const CARRIER_PROSE = ', a constraint entry is an address and an id, and the address is a segment array';
  // THE CARRIER'S OWN SPELLING QUOTES THE SUBJECT ONCE (`JC-TC-55`'s row: "single-quoted by the carrier's own
  // spelling"); the store's `<SEGMENT>` slot adds no second quoting of its own.
  const carrierMessage = (subject) => `'${subject}' is not a valid constraint entry in 'constraints'${CARRIER_PROSE}`;
  const refusedAtCreate = (cfg) => {
    try {
      storeCreate(cfg);
    } catch (caught) {
      return caught;
    }
    return null;
  };
  const withAddress = (address) => refusedAtCreate({
    journalLength: 8,
    listeners: [],
    // **⟶ AMENDED 2026-10-24 (`D-26` item 1): the element carries its own function.** A functionless element
    // is a `B-1` refusal BEFORE ANY FILESYSTEM ACT, whose message is the FUNCTION's fault and not the
    // address-carrier subject this cell drives — so without the member the cell would measure the wrong arm.
    constraints: [{ address, id: 'k', constraint: () => true }],
  });
  // ONE ASSERTION FOR EVERY CARRIER DRIVE: the subject is the declared one, the prose is unmoved, the word
  // `undefined` appears nowhere, and the refusal is the one three-member form.
  const assertCarrierSubject = (label, err, subject) => {
    assert.ok(err, `${label}: the construction declares a carrier refusal at the constraints list; it ADMITTED the entry`);
    assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
      `${label}: the refusal must be the one three-member form (surface.md §2.5 item 9); got ${JSON.stringify(Object.keys(err))}`);
    assert.equal(err.message, carrierMessage(subject),
      `${label}: the carrier slot's subject must be its own declared descriptor (§2.1 F-RA-18 items (c)/(d)(ii)/(e)); `
      + `got ${JSON.stringify(err.message)}`);
    assert.ok(!err.message.includes('undefined') && !JSON.stringify(err).includes('undefined'),
      `${label}: the word 'undefined' appears at a carrier position — item (f): NO CALL SITE CAN PRINT 'undefined'`);
  };

  // (1) THE REGRESSION — an address carrying an own `toString`.
  let toStringReads = 0;
  const ownToStringAddress = { toString() { toStringReads += 1; return MARKER; } };
  assert.equal(String(ownToStringAddress), MARKER,
    `the own-toString instrument is DEAD: String(address) answered ${JSON.stringify(String(ownToStringAddress))}`);
  assert.ok(toStringReads > 0, 'the own-toString counter did not move on a direct String() read');
  toStringReads = 0;
  const ownToStringError = withAddress(ownToStringAddress);
  assertCarrierSubject('an own toString on the address', ownToStringError, PLAIN);
  assert.equal(toStringReads, 0,
    `the address's own toString RAN at the carrier position (count ${toStringReads}) — item (b): no user code runs `
    + 'at that slot\'s subject rendering, and the guard is what answers instead');

  // (2) THE SAME AT THE THREE CONVERSION KEYS AND AT THE TAG KEY. Item (b) names an own
  // `toString`/`valueOf`/`@@toPrimitive`; items (1b)/(6) add the tag key, and the carrier slot takes the SAME
  // three-test guard the value arm takes.
  let valueOfReads = 0;
  const ownValueOfAddress = { valueOf() { valueOfReads += 1; return MARKER; } };
  Number(ownValueOfAddress); // ToPrimitive with hint number reaches `valueOf` first
  assert.ok(valueOfReads > 0, 'the own-valueOf counter did not move on a direct Number() read: the instrument is DEAD');
  valueOfReads = 0;
  const ownValueOfError = withAddress(ownValueOfAddress);
  assertCarrierSubject('an own valueOf on the address', ownValueOfError, PLAIN);
  assert.equal(valueOfReads, 0, `the address's own valueOf RAN at the carrier position (count ${valueOfReads})`);

  let toPrimitiveReads = 0;
  const ownToPrimitiveAddress = { [Symbol.toPrimitive]() { toPrimitiveReads += 1; return MARKER; } };
  assert.equal(String(ownToPrimitiveAddress), MARKER,
    'the own Symbol.toPrimitive instrument is DEAD: String(address) did not reach it');
  assert.ok(toPrimitiveReads > 0, 'the own @@toPrimitive counter did not move on a direct String() read');
  toPrimitiveReads = 0;
  const ownToPrimitiveError = withAddress(ownToPrimitiveAddress);
  assertCarrierSubject('an own Symbol.toPrimitive on the address', ownToPrimitiveError, PLAIN);
  assert.equal(toPrimitiveReads, 0, `the address's own Symbol.toPrimitive RAN at the carrier position (count ${toPrimitiveReads})`);

  // THE DATA `@@toStringTag` MEMBER: its value is READ by `Object.prototype.toString`, so a rendering would
  // carry it (`'[object X]'`) and a KEY-level read answers the class spelling instead.
  const DATA_TAG = 'DATA_TAG_VALUE_JC55';
  const ownDataTagAddress = { [Symbol.toStringTag]: DATA_TAG };
  assert.equal(String(ownDataTagAddress), `[object ${DATA_TAG}]`,
    'the data-tag instrument is DEAD: String(address) did not carry the tag value into its rendering');
  const ownDataTagError = withAddress(ownDataTagAddress);
  assertCarrierSubject('an own Symbol.toStringTag DATA member on the address', ownDataTagError, PLAIN);
  assert.ok(!ownDataTagError.message.includes(DATA_TAG) && !JSON.stringify(ownDataTagError).includes(DATA_TAG),
    `the address's tag VALUE reached the refusal object: ${JSON.stringify(ownDataTagError.message)}`);

  let tagGetterReads = 0;
  const ownTagAccessorAddress = Object.defineProperty({}, Symbol.toStringTag, {
    get() { tagGetterReads += 1; return MARKER; },
    configurable: true,
  });
  assert.equal(String(ownTagAccessorAddress), `[object ${MARKER}]`,
    'the tag-accessor instrument is DEAD: String(address) did not invoke the getter');
  assert.ok(tagGetterReads > 0, 'the own @@toStringTag getter counter did not move on a direct String() read');
  tagGetterReads = 0;
  const ownTagAccessorError = withAddress(ownTagAccessorAddress);
  assertCarrierSubject('an own Symbol.toStringTag ACCESSOR on the address', ownTagAccessorError, PLAIN);
  assert.equal(tagGetterReads, 0, `the address's own @@toStringTag getter RAN at the carrier position (count ${tagGetterReads})`);

  // A `null`-PROTOTYPE address carrying an own `toString`: `classSpelling` reads `protoClass`'s `'null'` limb
  // and answers the PLAIN limb's spelling, so the fallback is the same byte.
  let nullProtoReads = 0;
  const nullProtoAddress = Object.create(null);
  nullProtoAddress.toString = () => { nullProtoReads += 1; return MARKER; };
  assert.equal(String(nullProtoAddress), MARKER, 'the null-prototype address instrument is DEAD');
  nullProtoReads = 0;
  const nullProtoError = withAddress(nullProtoAddress);
  assertCarrierSubject('a null-prototype address carrying an own toString', nullProtoError, PLAIN);
  assert.equal(nullProtoReads, 0, `the null-prototype address's toString RAN at the carrier position (count ${nullProtoReads})`);

  // (3) THE CONTROLS — every renderer the guard does NOT trip is byte-identical (item `(g)`).
  assertCarrierSubject('the plain-{} control', withAddress({}), '[object Object]');
  assertCarrierSubject('the primitive-string-address control', withAddress('a'), 'a');
  const proxyAddress = new Proxy({}, {});
  assertCarrierSubject('the Proxy-address control', withAddress(proxyAddress), 'a Proxy');
  assertCarrierSubject('the null-prototype control (the guarded catch\'s own fallback)',
    withAddress(Object.create(null)), PLAIN);
  const admitted = refusedAtCreate({
    journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'k', constraint: () => true }],
  });
  assert.equal(admitted, null,
    `an in-domain segment list is ADMITTED at this slot; it was refused (${admitted && admitted.message})`);

  // (4) EVERY ADDRESS-BEARING CARRIER SLOT THE CLAUSE NAMES, swept so no position is left to inference. The
  // `(d)(i)` slots take `targetSpelling` and NO row class, so they cannot answer `undefined`: their declared
  // descriptor is the value's OWN `String` rendering, which the generator quotes once. **THE ONE `(d)(i)` SLOT
  // THIS SWEEP CANNOT DRIVE IS NAMED RATHER THAN SKIPPED SILENTLY:** `stateOf`'s instance slot (`:2578`) has NO
  // CALL SITE left in the entry (the receiver refactor removed it), and a foreign receiver is answered by the
  // ADDON's own receiver refusal before that frame — measured — so no route of this surface reaches it.
  const CARRIER_SLOTS = [
    [':2189 — the op-id slot (encodeOpId)', () => instance().rollback({}), '[object Object]'],
    [':3141 — listen\'s handle-class slot', () => instance().listen({}, []), '[object Object]'],
    [':3153 — listen\'s address-set slot', () => instance().listen('h', {}), '[object Object]'],
    [':3165 — listen\'s set-member slot', () => instance().listen('h', [{}]), '[object Object]'],
    [':3173 — listen\'s member-domain slot', () => instance().listen('h', [['a', true]]), 'a,true'],
    [':3514 — removeListener\'s handle-class slot', () => instance().removeListener({}), '[object Object]'],
    [':3522 — removeListener\'s absent-entry slot', () => instance().removeListener('nope'), 'nope'],
    [':4119 — register\'s handle-class slot', () => instance().register({}, () => {}), '[object Object]'],
    [':4127 — register\'s absent-entry slot', () => instance().register('nope', () => {}), 'nope'],
    [':4105 — register\'s listener-argument slot', () => instance().register('nope', {}), '[object Object]'],
  ];
  for (const [slot, run, descriptor] of CARRIER_SLOTS) {
    let thrown = null;
    try {
      run();
    } catch (caught) {
      thrown = caught;
    }
    assert.ok(thrown, `${slot}: the carrier declares a refusal at this slot; it answered none`);
    assert.ok(thrown.message.startsWith(`'${descriptor}' `),
      `${slot}: the subject must be that position's own declared descriptor '${descriptor}' `
      + `(§2.1 F-RA-18 item (d)(i)); got ${JSON.stringify(thrown.message)}`);
    assert.ok(!thrown.message.includes('undefined') && !JSON.stringify(thrown).includes('undefined'),
      `${slot}: the word 'undefined' appears at a carrier position — item (c) forbids it at EVERY one`);
  }

  // THE `(d)(iii)` SLOT — `cfg.listeners`: a LITERAL subject plus the entry's class spelling in its prose, so
  // the regression of item `(a)` is not reachable there; asserted so a future re-spelling is caught.
  const listenersEntryError = refusedAtCreate({ journalLength: 8, listeners: [5] });
  assert.ok(listenersEntryError, 'the listeners entry slot declares a refusal for a non-plain entry');
  assert.ok(listenersEntryError.message.startsWith("'listeners' "),
    `the listeners entry slot's subject is the literal 'listeners' (item (d)(iii)); got ${JSON.stringify(listenersEntryError.message)}`);
  assert.ok(listenersEntryError.message.includes('a number'),
    'the listeners entry slot carries the entry\'s CLASS spelling inside its prose (item (d)(iii))');
  assert.ok(!listenersEntryError.message.includes('undefined'), 'the listeners entry slot answered undefined');
  // AND ITS ADDRESS CROSSING: an address carrying an own `toString` at THAT slot answers the store's own
  // generated line with the literal subject, and the member does not run — asserted as a FAIL-SAFE fact (the
  // absence of the marker and of the word `undefined`), not as a subject byte, because item `(f)` forbids
  // asserting a subject at a carrier position whose address carries a conversion member until the byte lands.
  let listenersAddressReads = 0;
  const listenersAddress = { toString() { listenersAddressReads += 1; return MARKER; } };
  assert.equal(String(listenersAddress), MARKER, 'the listeners-address instrument is DEAD');
  listenersAddressReads = 0;
  const listenersAddressError = refusedAtCreate({
    journalLength: 8,
    listeners: [{ address: listenersAddress, handle: 'h' }],
  });
  assert.ok(listenersAddressError, 'the listeners address crossing declares a refusal for an address outside the domain');
  assert.equal(listenersAddressReads, 0,
    `the listeners address's own toString RAN on the construction (count ${listenersAddressReads})`);
  assert.ok(!listenersAddressError.message.includes('undefined')
    && !JSON.stringify(listenersAddressError).includes('undefined'),
    'the listeners address crossing printed the word undefined at a carrier position');
  assert.ok(!listenersAddressError.message.includes(MARKER)
    && !JSON.stringify(listenersAddressError).includes(MARKER),
    `the listeners address's marker reached the refusal object: ${JSON.stringify(listenersAddressError.message)}`);
});

test('JC-TC-56 the element limb tests the current path, so an aliased element renders and a cycle still trips', () => {
  // `test-cases.md §3` `JC-TC-56`, added 2026-10-24 (`contract.md §2.1`'s clause of that date on `F-RA-20`,
  // items `(b)`, `(c)` and `(e)`): **THE ELEMENT LIMB TESTS THE CURRENT PATH AND NOT A VISITED SET.** The
  // limb's `seen` set never releases, so with `e = [1]` and the refused value `arrayChain([e, e], 127)` the
  // SECOND occurrence of `e` answers "caller code" and row `8`'s depth arm answers its CLASS SPELLING where
  // item `(1c)`'s own ground and the array's sanctioned `'1,1'` say the WITHOUT branch. **An ALIAS is neither
  // a cycle nor caller code** (item `(b)`: rendering it twice runs the same code twice and reaches no member
  // the first read did not), while a SELF-CONTAINING array is still a cycle and must still trip (item `(c)`).
  // **This cell is that red**, and items `(b)`/`(c)` are the two states that must stay as they are. **THE ALIAS
  // RULING IS STATED AT EVERY ELEMENT AND NOT AT ARRAYS ALONE** (item `(b)`'s *"an ALIASED sub-value"*), so the
  // cell drives a non-array alias as a control as well: at this tree the `seen` set records ARRAYS ONLY, and a
  // fix that replaced it with an object-identity visited set which never releases would move that control.
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2.1`'s clause of this date on `F-RA-20`, items
  // `(a)`, `(b)`, `(c)` and `(e)`; `§2.1`'s clause on `F-RA-13`, item `(1c)`; `§2`'s row `8`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | the CONTROL — the same alias shape on a NON-ARRAY element (`[o, o]` with an ordinary `o`) | BOTH occurrences render: `'[object Object],[object Object]'` — already the limb's answer at this tree, fixed here so a fix cannot trade one alias for another |
  // | row `8`'s DEPTH ARM whose refused value is `[e, e]` with a primitive-bearing `e = [1]` | the array's SANCTIONED RENDERING `'1,1'` as the subject — an aliased element does not trip the guard |
  // | the CONTROL — the same array with ONE occurrence (`[e]`) at the same arm | the same family's rendering, `'1'` |
  // | the CYCLE — a refused value holding an element that is an ARRAY CONTAINING ITSELF | row `8`'s CLASS SPELLING `a value over the walk ceiling`, DETERMINISTICALLY and through the path test, with no host error |
  // | the CYCLE as the refused value itself (a self-containing array at depth `127`) | the SAME class spelling |
  // | the CONTROL — an element carrying a conversion member at the same arm | the class spelling, the element's counter `0` (item `(1c)`, unmoved by this cell) |
  // | the CONTROL — DISTINCT SIBLINGS (`arrayChain([[1], [1]], 127)`: two arrays that are NOT the same object) | the same sanctioned rendering `'1,1'` — the byte the alias must reproduce, and the state the limb already answers, so a fix cannot reach `'1,1'` for the alias by a rule that refuses the distinct case |
  // | the CYCLE OF LENGTH `2` (`a = []; b = [a]; a.push(b)` — no array carries ITSELF, the repeat is one link down) | the class spelling: a cycle is not only the self-containing shape, and the path test must reach it too |
  // | an element ALIASING A VALUE THAT STANDS HIGHER THAN ONE LINK (both orders: the shallower occurrence first, then the deeper one, and the deeper one first) | the same rendering `'1,1'` — the memo (the cost budget of `F5-1`) must not turn a cross-level alias into a cycle |
  //
  // **⟶ COMPLETED 2026-10-24 — THE GATE-11 FIFTH AUDIT PASS (the audit's `F5-8`; `contract.md §2.1`'s clause of
  // this date on `F5-1`, item `(1f)`).** The three rows above were DECLARED by this cell's own case row and were
  // NOT DRIVEN: the cell pinned the alias's answer at ONE shape, so a fix could pass it and still (a) refuse a
  // distinct-sibling pair, (b) trip only on a self-containing array and miss a two-link cycle, or (c) let the
  // cost budget's memo — the byte `F5-1` owes — turn a cross-level alias into a class spelling. **Each is now a
  // drive below, and the three expected answers are the contract's, not the build's.**
  const ROW_8 = 'a value over the walk ceiling';
  const MARKER = 'CALLER_CONTROLLED_ALIAS_JC56';
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const declaredMessage = (subject, cls, position = VALUE_POSITION) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (1) THE ALIAS IN ITS ALREADY-RENDERING FORM, DRIVEN FIRST SO IT IS EXERCISED BEFORE THE RED ABORTS THE
  // CELL: two occurrences of the SAME non-array sub-value render their own family today (the `seen` set records
  // ARRAYS alone), so this control fixes the byte a fix must not disturb while it moves the array limb.
  const sharedObject = { a: 1 };
  const objectAliasError = drive(arrayChain([sharedObject, sharedObject], 127));
  assert.ok(objectAliasError, 'the depth arm still refuses the deep array carrying one object twice');
  assert.equal(objectAliasError.message, declaredMessage('[object Object],[object Object]', ROW_8, deepPath),
    'an aliased NON-ARRAY element renders on BOTH occurrences (§2.1 F-RA-20, item (b)): the limb\'s repeat test is '
    + 'the CURRENT PATH at every element, not an array-only visited set');

  // (2) THE ALIASED ARRAY LEAF — the red. `e` holds a primitive, so NOTHING in it is caller code: the limb's own
  // ground (item `(1c)`) says the rendering stands, and the array's sanctioned rendering is `'1,1'`.
  const aliased = [1];
  assert.equal(String([aliased, aliased]), '1,1',
    'the sanctioned rendering this arm withholds must be the array\'s own join: String([e, e]) is not \'1,1\'');
  const aliasError = drive(arrayChain([aliased, aliased], 127));
  assert.ok(aliasError, 'the depth arm still refuses the deep array; the alias is not an admission');
  assert.equal(aliasError.status, STATUS);
  assert.equal(aliasError.message, declaredMessage('1,1', ROW_8, deepPath),
    'an ALIASED element is neither a cycle nor caller code (§2.1 F-RA-20, item (b)): the second occurrence of '
    + 'the same sub-value must not trip the guard, and the arm must render the sanctioned \'1,1\'');

  // (3) THE ONE-OCCURRENCE CONTROL — the same array alone renders at the same arm, so the red's cause is the
  // REPEAT and not the element.
  const singleError = drive(arrayChain([aliased], 127));
  assert.ok(singleError, 'the depth arm still refuses the deep array carrying one occurrence');
  assert.equal(singleError.message, declaredMessage('1', ROW_8, deepPath),
    'one occurrence of the same sub-value renders its own family at the same arm');

  // (4) THE CYCLE — the witness the ruling must survive (item `(c)`): a self-containing array still trips, and
  // it trips DETERMINISTICALLY through the path test rather than through a stack-overflow `catch`.
  const cyclic = [];
  cyclic.push(cyclic);
  const cycleMessages = [];
  for (let i = 0; i < 3; i += 1) {
    const cycleError = drive(arrayChain([cyclic], 127));
    assert.ok(cycleError, 'a self-containing element is refused at the depth arm');
    assert.deepEqual(Object.keys(cycleError).sort(), ['log', 'message', 'status'],
      'the cycle\'s answer is the one failure form: no host error and no second form escapes it');
    assert.ok(!(cycleError instanceof RangeError) && !(cycleError instanceof Error),
      'the cycle must not answer a raw host error (a RangeError from an unbounded recursion is a FINDING)');
    assert.equal(cycleError.status, STATUS);
    assert.equal(cycleError.message, declaredMessage(ROW_8, ROW_8, deepPath),
      'a CYCLE still trips: the path test reaches the class spelling deterministically (item (c))');
    cycleMessages.push(cycleError.message);
  }
  assert.equal(new Set(cycleMessages).size, 1,
    `the cycle's answer must be DETERMINISTIC across drives; got ${cycleMessages.length} draws and `
    + `${new Set(cycleMessages).size} distinct messages`);
  const selfCycleError = drive(arrayChain(cyclic, 127));
  assert.ok(selfCycleError, 'a self-containing array at the refused position is still refused');
  assert.equal(selfCycleError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'the refused value itself a cycle answers the same class spelling at the same position');

  // (5) THE CONTROL — an element carrying a conversion member still trips the guard (item `(1c)`, unmoved).
  let elementReads = 0;
  const conversionElement = { toString() { elementReads += 1; return MARKER; } };
  assert.equal(String(conversionElement), MARKER,
    'the element instrument is DEAD: String(element) did not reach its own toString');
  assert.ok(elementReads > 0, 'the element counter did not move on a direct String() read');
  elementReads = 0;
  const conversionError = drive(arrayChain([conversionElement, 1], 127));
  assert.ok(conversionError, 'an element carrying a conversion member is refused at the depth arm');
  assert.equal(conversionError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'an element whose conversion path is reachable keeps the class spelling — the alias ruling withdraws no guard');
  assert.equal(elementReads, 0, `the element's toString RAN on the refusal path (count ${elementReads})`);

  // (6) THE THREE CASES ARE DISTINGUISHED, ASSERTED AS A DIFFERENCE AND NOT MERELY AS THREE STRINGS: the alias
  // renders, the cycle answers the class spelling, and neither is the other's byte.
  assert.ok(!aliasError.message.startsWith(`'${ROW_8}'`),
    'the ALIASED element must NOT answer the class spelling: it is not a cycle');
  assert.ok(cycleMessages[0].startsWith(`'${ROW_8}'`),
    'the CYCLE must answer the class spelling: the path test still refuses a repeat on the path');
  assert.notEqual(aliasError.message, cycleMessages[0],
    'the alias and the cycle must not answer the same byte: the limb can tell them apart (item (f))');

  // (7) THE DISTINCT-SIBLING CONTROL its own case row declares (`F5-8`): two arrays that are NOT the same
  // object. `[1]` twice is the state the limb already answers, and it is the byte the ALIAS must reproduce —
  // so this drive is what stops a fix from reaching `'1,1'` for the alias through a rule that refuses or
  // collapses the distinct case.
  const distinctSiblings = [[1], [1]];
  assert.notEqual(distinctSiblings[0], distinctSiblings[1],
    'the control is two DISTINCT arrays: the same object twice would be the alias state, not this one');
  assert.equal(String(distinctSiblings), '1,1',
    'the sanctioned rendering of two distinct primitive-bearing siblings is the array\'s own join');
  const siblingError = drive(arrayChain(distinctSiblings, 127));
  assert.ok(siblingError, 'the depth arm refuses the deep array carrying two distinct siblings');
  assert.equal(siblingError.message, declaredMessage('1,1', ROW_8, deepPath),
    'two DISTINCT sibling arrays render at the depth arm: the limb\'s repeat test is the CURRENT PATH, so a '
    + 'sibling never trips it — and the alias must answer this same byte (§2.1 F-RA-20, item (b))');

  // (8) A CYCLE OF LENGTH `2` — the witness the ruling must survive and the shape the cell did not drive: no
  // array carries ITSELF, the repeat stands one link down (`a = []; b = [a]; a.push(b)`), so a fix that tested
  // `value === element` alone would miss it. The answer is the class spelling, through the path test.
  const twoLinkA = [];
  const twoLinkB = [twoLinkA];
  twoLinkA.push(twoLinkB);
  assert.equal(twoLinkA[0], twoLinkB, 'the fixture is a TWO-LINK cycle: a holds b and b holds a');
  const twoLinkError = drive(arrayChain(twoLinkA, 127));
  assert.ok(twoLinkError, 'a cycle of length 2 at the refused position is refused at the depth arm');
  assert.deepEqual(Object.keys(twoLinkError).sort(), ['log', 'message', 'status'],
    'the two-link cycle answers the one failure form: no host error and no second form escapes it');
  assert.ok(!(twoLinkError instanceof Error), 'the two-link cycle answers no raw host error');
  assert.equal(twoLinkError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'a cycle of length 2 still trips: the path test reaches the class spelling, not the array\'s join '
    + '(§2.1 F-RA-20, item (c) — a cycle is a repeat ON THE PATH, at any distance)');

  // (9) AN ELEMENT ALIASING A VALUE THAT STANDS HIGHER THAN ONE LINK — BOTH ORDERS. The two occurrences are at
  // DIFFERENT depths, so the memo the `F5-1` budget owes must record each sub-value and release it on the way
  // out; a memo that held a value for the whole call would answer this alias the class spelling.
  const anchor = [1];
  const anchorHolder = [anchor]; // the same `anchor`, one link down
  for (const [label, shape] of [
    ['the DEEPER occurrence first, then the shallower one', [anchorHolder, anchor]],
    ['the SHALLOWER occurrence first, then the deeper one', [anchor, [anchor]]],
  ]) {
    assert.equal(String(shape), '1,1', `${label}: the sanctioned rendering of the fixture is the array's own join`);
    const crossLevelError = drive(arrayChain(shape, 127));
    assert.ok(crossLevelError, `${label}: the depth arm refuses the deep array carrying the cross-level alias`);
    assert.equal(crossLevelError.message, declaredMessage('1,1', ROW_8, deepPath),
      `${label}: a value that stands at two different depths is an ALIAS and not a cycle — the limb renders it `
      + 'twice, and a fix\'s memo must release each sub-value when its own traversal ends (§2.1 F-RA-20, item (b))');
  }
});

// ── THE THREE STATES THE GATE-11 FIFTH AUDIT DECLARED — `F5-1`/`F5-2`, `F5-3` and `F5-4` ──────────────
// (`test-cases.md`'s clause of 2026-10-24, items `(1)`–`(3)`, adds `JC-TC-57` and `JC-TC-58` at the END of `§3`
// and `JC-TC-59` at the END of `§4`; `contract.md §2.1`'s clause of the same date on `F5-1`, `F5-2`, `F5-3` and
// `F5-4` declares the three laws, and `implementation-plan.md §2` step `4`'s clause of the same date owes the
// bytes at its arms `(viii)`, `(ix)` and `(x)`. **EVERY CELL BELOW IS RED AT THE SHIPPED TREE AND EVERY ONE
// ASSERTS THE CONTRACT'S ANSWER AND NEVER TODAY'S.**)
//
// **THE THREE DRIVING DISCIPLINES THESE CELLS TAKE, STATED ONCE AND CITED AT EVERY SITE:**
//   (0) **A DRIVE WHOSE COST IS UNBOUNDED AT THE SHIPPED TREE IS RUN WHERE A CLOCK CAN STOP IT.** A hanging
//       drive is NOT a red, and `node:test`'s own `timeout` cannot interrupt synchronous code — so the two states
//       whose whole subject IS an unbounded traversal run in a child process that is killed at a declared cap
//       and reports its own elapsed figure. Every other drive below is linear in a length this cell itself chose
//       (a dense array of at most `1,000,001` elements, a tree of at most `41` arrays, or a single `write`), so
//       no other drive can stall the suite.
//   (1) **EVERY TRAP / OVERRIDE COUNTER IS PROVED LIVE BEFORE IT IS ASSERTED `0`** — the instrument that counts
//       is driven DIRECTLY on a twin, and only then is a FRESH instrument driven through the crossing
//       (`§2`'s clause of this date on `F-RA-12`, item `(7)`; the same discipline `JC-TC-50`…`JC-TC-55` take).
//   (2) **EVERY INTRINSIC PROTOTYPE MUTATED BY A DRIVE IS RESTORED IN A `finally` AND THE RESTORE IS PROVED
//       BOTH STRUCTURALLY AND BEHAVIOURALLY** — by the intrinsic's own identity and by a rendering that shows the
//       language's answer is back.

const WALL_CLOCK_CEILING_MS = 5000;
const TEST_DIR = fileURLToPath(new URL('.', import.meta.url));
/// **THE CHILD DRIVERS' REACH, COMPUTED FOR THE CHILD'S OWN FILE** (strata/decisions.md `D-6`'s `O4`
/// route): a child written into this directory can no longer resolve the package by name, so the path to
/// the entry is resolved ONCE here and spelled absolutely in every child template below.
const ENTRY_URL = new URL('../../bindings/js/index.mjs', import.meta.url).href;

/// The child driver behind `JC-TC-57`'s two unbounded states. **It reaches the package through the claimed ESM
/// entry** (`acceptance.md §4.1` item 1): the file stands under this package's own tree, so its bare
/// `provident-storeroom` specifier resolves by the package's own `package.json` to the same entry this file
/// imports. It prints one JSON line: the state's name, the elapsed milliseconds of the `write` call alone, and
/// the refusal's `status` and `message`.
const CHILD_DRIVE_SOURCE = `import { storeCreate } from "${ENTRY_URL}";
const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
const states = {
  'aliased-ladder': () => {
    let value = [1];
    for (let i = 0; i < 40; i += 1) value = [value, value];
    return arrayChain(value, 127);
  },
  'length-ceiling': () => arrayChain(new Array(4294967295), 127),
};
const value = states[process.argv[2]]();
const started = Date.now();
let thrown = null;
try {
  storeCreate({ journalLength: 8, listeners: [] }).write(['v'], 'mem', value);
} catch (caught) {
  thrown = caught;
}
const elapsedMs = Date.now() - started;
process.stdout.write(JSON.stringify({
  state: process.argv[2],
  elapsedMs,
  status: thrown === null ? null : thrown.status,
  message: thrown === null ? null : thrown.message,
}) + '\\n');
`;

/// Run one state of `CHILD_DRIVE_SOURCE` and answer `{timedOut, killedAt, answer}` — `timedOut` where the child
/// was still running at `WALL_CLOCK_CEILING_MS + 2000` ms and was killed. The scratch directory is removed in a
/// `finally` whether or not the drive finished.
function boundedChildDrive(state) {
  const dir = mkdtempSync(join(TEST_DIR, '.jc-tc-57-'));
  const driver = join(dir, 'drive.mjs');
  const killedAt = WALL_CLOCK_CEILING_MS + 2000;
  try {
    writeFileSync(driver, CHILD_DRIVE_SOURCE, 'utf8');
    let out = null;
    let timedOut = false;
    try {
      out = execFileSync(process.execPath, [driver, state], {
        encoding: 'utf8',
        cwd: dir,
        timeout: killedAt,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (caught) {
      if (caught && (caught.code === 'ETIMEDOUT' || caught.signal === 'SIGTERM')) timedOut = true;
      else throw caught;
    }
    return { timedOut, killedAt, answer: out === null ? null : JSON.parse(out.trim().split('\n').pop()) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('JC-TC-57 the guard\'s work is bounded per call: one position budget, and no scan of a length the walk never walked', { timeout: 180000 }, () => {
  // `test-cases.md` `JC-TC-57`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-1` and `F5-2`,
  // items `(1a)`–`(1h)`; the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm
  // `(viii)`): **THE RENDER GUARD'S WORK IS BOUNDED PER CALL OF `renderGuardTrips` BY TWO LIMBS AND ONE FIGURE —
  // `1,000,000` POSITIONS, which IS `NODE_CEILING` and mints no third ceiling — a FRESH allowance per call,
  // positions counted PER POSITION so an aliased DAG cannot evade the budget with a memo, and the element limb's
  // descriptor reads counted against the SAME allowance so one array's `length` is never a spent budget.** On
  // exhaustion the guard answers "caller code is reachable" — the WITH branch — so the arm answers its CLASS
  // SPELLING and renders nothing (item `(1d)`). **At the shipped tree the path test is exponential on an aliased
  // DAG (neither ceiling counts it) and the element limb scans `0…length-1` with no bound, so this cell is red on
  // three of its states.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (item `(1e)`'s two observables and its controls, item
  // `(1d)`'s declared over-refusal, and the position budget of item `(1b)(iii)`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | the ALIASED DEPTH-40 LADDER (`let v = [1]; for (i < 40) v = [v, v]`, refused at row `8`'s depth arm) | row `8`'s CLASS SPELLING at the depth arm's own `127`-segment position, and THE WHOLE REFUSAL COMPLETES WITHIN `5` SECONDS — the shipped guard costs `~2^40` visits (item `(1e)`) |
  // | `arrayChain(new Array(4294967295), 127)` at the same arm | the SAME class spelling at the SAME position inside the SAME ceiling — the shipped limb reads `0…length-1`, `~4.29×10^9` descriptors (item `(1e)`) |
  // | a dense array of `999,000` primitive elements at the arm — INSIDE the declared budget (`999,000` element positions plus the array itself: `999,001` of the `1,000,000`) | the WITHOUT branch: the array's own sanctioned rendering survives, because `1,000,000` is a BUDGET and not a scan limit (item `(1b)(iii)`) |
  // | a dense array of `1,000,001` primitive elements at the arm — OUTSIDE (`1,000,001` element positions plus the array: `1,000,002`) | the class spelling, rendering nothing (item `(1d)`'s DECLARED over-refusal: positions beyond `1,000,000` are refused, in the direction `C-11`'s fail-closed answer permits) |
  // | CONTROL — the ordinary alias `[e, e]` with `e = [1]` (`4` positions) | `'1,1'` — the control `JC-TC-56` owns, unmoved by this budget |
  // | CONTROL — a primitive `[1, 2]` at the arm | `'1,2'` |
  // | CONTROL — the CYCLE (`a = []; a.push(a)`) | the class spelling: a cycle is not a cost and this cell does not un-declare it |
  // | CONTROL — a sparse `[1, , 3]` at the arm | `'1,,3'` — a hole is `continue`d and is NOT a trip (item `(1f)`: only the budget bounds the sparse limb) |
  // | CONTROL — `{}` at the arm | `'[object Object]'` |
  // | CONTROL — a function at row `3` | its own source text, at the root position (item `(1e)`'s last control) |
  const ROW_8 = 'a value over the walk ceiling';
  const ROW_3 = 'a function';
  const POSITION_BUDGET = 1_000_000;
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const declaredMessage = (subject, cls, position = VALUE_POSITION) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };
  assert.equal(POSITION_BUDGET, NODE_CEILING,
    'the figure is `NODE_CEILING` itself (item (1d)): minting a third ceiling would move the boundary this cell pins');

  // THE DRIVES RUN IN THE ORDER THEY MUST: the CONTROLS and the INSIDE-budget state first — so every sanctioned
  // rendering and the one state the budget must NOT touch is exercised before the red aborts the cell — and the
  // two unbounded states LAST, each in a child that is killed rather than allowed to stall the suite.

  // (1) THE CONTROLS, WHICH MUST NOT MOVE (item `(1e)`'s own census plus `JC-TC-56`'s alias and cycle).
  const aliasedLeaf = [1];
  const cyclic = [];
  cyclic.push(cyclic);
  for (const [label, value, rendering] of [
    ['the ordinary ALIAS `[e, e]` with `e = [1]`', [aliasedLeaf, aliasedLeaf], '1,1'],
    ['a primitive `[1, 2]`', [1, 2], '1,2'],
    ['a sparse `[1, , 3]` (a hole is `continue`d, item (1f))', [1, , 3], '1,,3'],
    ['`{}`', {}, '[object Object]'],
  ]) {
    const controlError = drive(arrayChain(value, 127));
    assert.ok(controlError, `${label}: the depth arm still refuses the deep array`);
    assert.equal(controlError.status, STATUS);
    assert.equal(controlError.message, declaredMessage(rendering, ROW_8, deepPath),
      `${label}: this control's answer is UNMOVED by the budget — a rendering the guard still approves`);
  }
  const cycleControlError = drive(arrayChain(cyclic, 127));
  assert.ok(cycleControlError, 'the cycle control is refused at the arm');
  assert.equal(cycleControlError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'the CYCLE control is unmoved: a cycle still trips the path test and answers the class spelling');
  const sampleFunction = function sampleJc57Function() {};
  assert.equal(String(sampleFunction), 'function sampleJc57Function() {}',
    'the row-3 control is a function whose own source text is the rendering this arm declares');
  const functionControlError = drive(sampleFunction);
  assert.ok(functionControlError, 'a function at row 3 is refused before any store verb');
  assert.equal(functionControlError.status, STATUS);
  assert.equal(functionControlError.message, declaredMessage('function sampleJc57Function() {}', ROW_3),
    'row 3\'s own subject — the function\'s source text read through the standard machinery — is unmoved');

  // (2) THE INSIDE-BUDGET STATE: `999,000` element positions plus the array itself is `999,001` of the
  // `1,000,000` — `999` to spare under `§8` row `8`'s own counting convention, so no reading of the convention
  // that does not double-count a position puts it outside. It is the state the budget MUST NOT touch: a rendering
  // the guard still approves, and the drive is linear in `999,000` descriptors so it cannot stall.
  const insideBudget = new Array(999000).fill(0);
  const insideBudgetError = drive(arrayChain(insideBudget, 127));
  assert.ok(insideBudgetError, 'a dense array inside the declared position budget is still refused at the arm');
  assert.equal(insideBudgetError.status, STATUS);
  assert.ok(insideBudgetError.message.startsWith("'0,0,"),
    'a value whose positions stand INSIDE the declared budget answers the WITHOUT branch: the shipped limb\'s '
    + `rendering survives (item (1b)(iii)); got ${JSON.stringify(insideBudgetError.message.slice(0, 40))}`);
  assert.equal(insideBudgetError.message, declaredMessage(insideBudget.join(','), ROW_8, deepPath),
    'the inside-budget state renders the array\'s own sanctioned elements — the budget is not a scan limit');

  // (3) THE OUTSIDE-BUDGET STATE — `1,000,001` element positions plus the array is `1,000,002`, which no reading
  // of the convention keeps inside. **This is the cell's first red**: the limb scans the whole length and renders.
  const outsideBudget = new Array(1000001).fill(0);
  const outsideBudgetError = drive(arrayChain(outsideBudget, 127));
  assert.ok(outsideBudgetError, 'a dense array outside the declared position budget is refused at the arm');
  assert.equal(outsideBudgetError.status, STATUS);
  assert.equal(outsideBudgetError.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'a refused value whose positions EXCEED the declared 1,000,000 answers the class spelling and renders '
    + 'nothing (item (1d)\'s declared over-refusal); at this tree the limb scans the whole length and renders '
    + '2,000,001 characters');

  // (4) THE LENGTH-CEILING SHAPE — `new Array(4294967295)` is `4.29×10^9` indices; the declared answer is the
  // class spelling inside the same `5` seconds, its reads never taken (item `(1e)`'s second state). Run in a
  // child: at this tree the limb reads `0…length-1` and the suite must be told about it, not stalled by it.
  const lengthDrive = boundedChildDrive('length-ceiling');
  assert.ok(!lengthDrive.timedOut,
    `the LENGTH-CEILING SHAPE did not answer inside the ${lengthDrive.killedAt} ms cap it was given, so the `
    + 'whole refusal did NOT complete within the declared 5-second ceiling: the element limb scanned '
    + '`0…length-1` with no bound (contract.md §2.1, items (1b)(iii) and (1e))');
  assert.equal(lengthDrive.answer.state, 'length-ceiling');
  assert.equal(lengthDrive.answer.status, STATUS);
  assert.ok(lengthDrive.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the length-shaped state's refusal took ${lengthDrive.answer.elapsedMs} ms; the declared ceiling is `
    + `${WALL_CLOCK_CEILING_MS} ms`);
  assert.equal(lengthDrive.answer.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'a `length` the walk would never have walked is not a spent allowance (item (1f)) and the element limb may '
    + 'not read it: the answer is the class spelling at the depth arm\'s own position');

  // (5) THE ALIASED DEPTH-40 LADDER — the deepest unbounded state, `~2^40` positions over `41` arrays, driven in
  // a child for the same reason. A memo alone would only move the exponent from the guard to the rendering, which
  // is why the LAW is the POSITION BUDGET and why this cell pins the class spelling and not a rendering (item
  // `(1c)`).
  const ladderDrive = boundedChildDrive('aliased-ladder');
  assert.ok(!ladderDrive.timedOut,
    `the ALIASED DEPTH-40 LADDER did not answer inside the ${ladderDrive.killedAt} ms cap it was given, so the `
    + 'whole refusal did NOT complete within the declared 5-second ceiling (contract.md §2.1, item (1e)): the '
    + 'guard was still walking the DAG, and no ceiling counted it');
  assert.equal(ladderDrive.answer.state, 'aliased-ladder');
  assert.equal(ladderDrive.answer.status, STATUS,
    'the ladder state is a REFUSAL, not an admission: the walk refuses it at the depth arm before any store verb');
  assert.ok(ladderDrive.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the ladder's refusal took ${ladderDrive.answer.elapsedMs} ms; the declared ceiling is `
    + `${WALL_CLOCK_CEILING_MS} ms and the declared work is at most ${POSITION_BUDGET + 1} positions with one `
    + 'descriptor read apiece (item (1e))');
  assert.equal(ladderDrive.answer.message, declaredMessage(ROW_8, ROW_8, deepPath),
    'the ladder answers row 8\'s CLASS SPELLING at the depth arm\'s own position: the budget is spent and the '
    + 'guard answers "caller code is reachable", so the arm renders nothing (items (1d) and (1e))');
});

test('JC-TC-58 a CALLABLE Proxy is never coerced at a carrier slot, so no handler trap runs at one', () => {
  // `test-cases.md` `JC-TC-58`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-3`, items
  // `(3a)`–`(3d)`; the owed byte is `implementation-plan.md §2` step `4`'s arm `(ix)`): **A `Proxy` — CALLABLE OR
  // NOT, REVOKED INCLUDED — IS NEVER COERCED AT ANY CARRIER SLOT; its subject is its CLASS SPELLING `a Proxy`,
  // read with `util.types.isProxy` alone, and NO TRAP RUNS.** `targetSpelling` guards a `Proxy` only where
  // `typeof value === 'object'`, so a CALLABLE `Proxy` falls past its guard to `String(value)`, whose
  // `ToPrimitive` reads `Symbol.toPrimitive` and then `toString` THROUGH THE `get` TRAP — at every carrier slot
  // that renders its argument. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (items `(3a)`, `(3b)` and `(3c)`; `§2`'s clause of
  // 2026-10-24 on the `F7` finding — a callable `Proxy`'s CLASS is row `3`'s `a function`, and its SUBJECT at
  // this renderer is `a Proxy`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | a CALLABLE `Proxy` whose `get` trap returns a marker function for `Symbol.toPrimitive`, at `listen(proxy, [])` | `AddressMalformed`; the subject `'a Proxy'` (the class spelling, single-quoted by the carrier's own spelling); EVERY handler trap `0`; the marker in no byte |
  // | the same instrument at `listen('h', [proxy])` — the set's MEMBER slot | the same subject, every trap `0`, the marker in no byte |
  // | the same instrument at `removeListener(proxy)` | the same subject, every trap `0` |
  // | the same instrument at `register(proxy, fn)` | the same subject, every trap `0` |
  // | the CONTROL — a NON-CALLABLE `Proxy` with the same counting handler at all four slots | BYTE-IDENTICAL messages: the `Proxy` class is ONE class and the renderer's `typeof` split is not a fact about it (item `(3b)`) |
  // | the CONTROL — an ordinary `{}` at the same four slots | unmoved: the subject stays `'[object Object]'` and the class half still names a `plain object` |
  //
  // **THE LISTENER SLOT OF `register` AT `:4126` IS NOT DRIVEN AS ONE** — item `(3a)` rules that `register`'s
  // own `typeof listener !== 'function'` test PASSES for a callable `Proxy`, so that slot never renders one.
  //
  // **THE CLASS HALF IS ASSERTED IN EACH SLOT'S OWN DECLARED DESCRIPTOR FORM — DERIVED PER SLOT, NEVER
  // HAND-TYPED.** `docs/specs/storeroom-js/surface.md §2.5` item 5 (b) says *"the reason's class half is carried
  // by the store's own `<mismatch clause>` for the code the refusal answers"*, so the byte form of the class
  // half is THE SLOT'S OWN DESCRIPTOR PROSE and not one form shared by every carrier slot: **the THREE HANDLE
  // SLOTS declare `… is ${classSpelling(handle)}, and …` — the form `is a <class>`** — while **the SET'S MEMBER
  // SLOT declares `listen's second argument carries ${classSpelling(addresses[i])} at member ${i}, and a set's
  // member is an address — an array of segments` — the form `carries a <class> at member <n>`** (`contract.md
  // §2.1` item `(3a)`'s `(d)(i)` slots, and item `(3b)`, which pins the SUBJECT — the class spelling `a Proxy`,
  // read with `util.types.isProxy` alone — and no trap run, and no byte form beyond that). **`is a <class>` IS
  // NOT ASSERTED AT THE MEMBER SLOT: no clause extends that handle form to it, and `test-cases.md`'s `JC-TC-58`
  // row asks only that the class half NAME THE ARGUMENT'S CLASS.** Item `(3c)`'s one-test change moves the
  // renderer and leaves every other carrier descriptor standing, so a cell asserting the handle form at the
  // member slot would assert a byte the clause does not pin. **The substantive assertions are unmoved: every
  // trap counter `0`, the marker in no byte, and the two CONTROLS byte-asserted as before.**
  const handleForm = (cls) => `is ${cls}`;
  const setMemberForm = (cls) => `carries ${cls} at member 0`;
  const MARKER = 'CALLER_CONTROLLED_TOPRIMITIVE_JC58';
  const TRAP_KEYS = [
    'apply', 'construct', 'defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor',
    'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf',
  ];
  const SLOTS = [
    ['`listen(callableProxy, [])` — the handle slot', (inst, proxy) => inst.listen(proxy, []), handleForm],
    ['`listen(\'h\', [callableProxy])` — the set\'s member slot', (inst, proxy) => inst.listen('h', [proxy]),
      setMemberForm],
    ['`removeListener(callableProxy)` — the handle slot', (inst, proxy) => inst.removeListener(proxy), handleForm],
    ['`register(callableProxy, fn)` — the handle slot', (inst, proxy) => inst.register(proxy, () => {}),
      handleForm],
  ];

  // THE INSTRUMENT, BUILT FRESH PER DRIVE: thirteen separately counted traps, and the marker function the `get`
  // trap hands back is counted on its own, because a coercion that runs is two events — the read and the call.
  const countedProxy = (callable) => {
    const counters = {};
    for (const key of TRAP_KEYS) counters[key] = 0;
    let primitiveCalls = 0;
    const target = callable ? function carrierTarget() {} : {};
    const handler = {
      apply(inner, thisArg, args) { counters.apply += 1; return Reflect.apply(inner, thisArg, args); },
      construct(inner, args, newTarget) { counters.construct += 1; return Reflect.construct(inner, args, newTarget); },
      defineProperty(inner, key, descriptor) {
        counters.defineProperty += 1;
        return Reflect.defineProperty(inner, key, descriptor);
      },
      deleteProperty(inner, key) { counters.deleteProperty += 1; return Reflect.deleteProperty(inner, key); },
      get(inner, key, receiver) {
        counters.get += 1;
        if (key === Symbol.toPrimitive) {
          return () => {
            primitiveCalls += 1;
            return MARKER;
          };
        }
        if (key === 'toString' || key === 'valueOf') return () => MARKER;
        return Reflect.get(inner, key, receiver);
      },
      getOwnPropertyDescriptor(inner, key) {
        counters.getOwnPropertyDescriptor += 1;
        return Reflect.getOwnPropertyDescriptor(inner, key);
      },
      getPrototypeOf(inner) { counters.getPrototypeOf += 1; return Reflect.getPrototypeOf(inner); },
      has(inner, key) { counters.has += 1; return Reflect.has(inner, key); },
      isExtensible(inner) { counters.isExtensible += 1; return Reflect.isExtensible(inner); },
      ownKeys(inner) { counters.ownKeys += 1; return Reflect.ownKeys(inner); },
      preventExtensions(inner) { counters.preventExtensions += 1; return Reflect.preventExtensions(inner); },
      set(inner, key, value, receiver) { counters.set += 1; return Reflect.set(inner, key, value, receiver); },
      setPrototypeOf(inner, proto) { counters.setPrototypeOf += 1; return Reflect.setPrototypeOf(inner, proto); },
    };
    return { proxy: new Proxy(target, handler), counters, primitiveCalls: () => primitiveCalls };
  };

  const refusalAt = (run, value) => {
    try {
      run(instance(), value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // THE LIVENESS PROOF, TAKEN ONCE AND ON A TWIN: every one of the thirteen traps is driven DIRECTLY and its own
  // counter must move, and the marker must actually arrive through a coercion — so no `0` asserted below can be
  // an inert counter's.
  const twin = countedProxy(true);
  assert.equal(String(twin.proxy), MARKER,
    'the twin\'s coercion must reach the `get` trap and the marker function it returns, or this instrument '
    + 'cannot witness a coercion at all');
  Reflect.ownKeys(twin.proxy);
  Object.getPrototypeOf(twin.proxy);
  Object.getOwnPropertyDescriptor(twin.proxy, 'probe');
  'probe' in twin.proxy;
  Reflect.isExtensible(twin.proxy);
  Reflect.set(twin.proxy, 'probe', 1);
  Reflect.defineProperty(twin.proxy, 'probe2', { value: 1, configurable: true, writable: true });
  Reflect.deleteProperty(twin.proxy, 'probe2');
  Reflect.apply(twin.proxy, null, []);
  Reflect.construct(twin.proxy, []);
  Reflect.setPrototypeOf(twin.proxy, Reflect.getPrototypeOf(twin.proxy));
  Reflect.preventExtensions(twin.proxy);
  for (const key of TRAP_KEYS) {
    assert.ok(twin.counters[key] > 0,
      `the ${key} trap's counter is DEAD: a direct Reflect/Object operation on the twin ran it `
      + `${twin.counters[key]} times`);
  }
  assert.ok(twin.primitiveCalls() > 0,
    'the marker function the get trap returns was never called on the twin, so a `0` below would prove nothing');

  // (1)–(4) THE FOUR CARRIER SLOTS THE CLAUSE NAMES, each on its own FRESH instrument at its own FRESH instance.
  const callableMessages = [];
  for (const [label, run, classHalf] of SLOTS) {
    const built = countedProxy(true);
    const err = refusalAt(run, built.proxy);
    assert.ok(err, `${label}: a handle outside the slot's domain declares a refusal`);
    assert.equal(err.status, 'AddressMalformed', `${label}: the carrier slot's declared status`);
    assert.ok(err.message.startsWith("'a Proxy' "),
      `${label}: the subject is the Proxy's CLASS SPELLING, single-quoted by the carrier's own spelling `
      + `(item (3b)); got ${JSON.stringify(err.message.slice(0, 60))}`);
    assert.ok(err.message.includes(classHalf('a Proxy')),
      `${label}: the class half names the argument's class — the Proxy class, CALLABLE OR NOT (item (3b)) — in `
      + `THIS SLOT'S OWN declared descriptor form ${JSON.stringify(classHalf('a Proxy'))}; got `
      + `${JSON.stringify(err.message)}`);
    for (const key of TRAP_KEYS) {
      assert.equal(built.counters[key], 0,
        `${label}: the ${key} trap RAN on the carrier path (count ${built.counters[key]}) — a Proxy is never `
        + 'coerced at a carrier slot, and the class spelling is read with util.types.isProxy alone');
    }
    assert.equal(built.primitiveCalls(), 0,
      `${label}: the marker function the get trap returns was CALLED (count ${built.primitiveCalls()}) — `
      + 'the coercion ran');
    assert.ok(!err.message.includes(MARKER) && !JSON.stringify(err).includes(MARKER),
      `${label}: the trap's MARKER reached a byte of the refusal object: ${JSON.stringify(err.message)}`);
    callableMessages.push(err.message);
  }

  // (5) THE NON-CALLABLE CONTROL — BYTE-IDENTICAL at every slot. The `Proxy` class is ONE class (item (3b)), so
  // the callable and the non-callable proxy must answer the same byte; its counters are proved `0` too, which is
  // the half the shipped renderer already gets right.
  for (let index = 0; index < SLOTS.length; index += 1) {
    const [label, run] = SLOTS[index];
    const built = countedProxy(false);
    const err = refusalAt(run, built.proxy);
    assert.ok(err, `${label}: the non-callable proxy declares the same refusal`);
    assert.equal(err.status, 'AddressMalformed');
    for (const key of TRAP_KEYS) {
      assert.equal(built.counters[key], 0, `${label}: the non-callable control ran the ${key} trap`);
    }
    assert.equal(err.message, callableMessages[index],
      `${label}: the CALLABLE proxy's answer must be BYTE-IDENTICAL to the non-callable control's — one class, `
      + 'one subject, no typeof split (item (3b))');
  }

  // (6) THE ORDINARY-VALUE CONTROL — unmoved. A plain object at the same slots still renders its own family and
  // still names the class it HAS; the Proxy ruling widens no subject and withdraws no rendering. **Its class half
  // is asserted in the SAME PER-SLOT declared form as the Proxy half above — `is a plain object` at the three
  // handle slots, `carries a plain object at member 0` at the set's member slot — so both halves of this cell
  // read each slot's OWN descriptor prose and neither imports the handle form into the member slot.**
  for (const [label, run, classHalf] of SLOTS) {
    const err = refusalAt(run, {});
    assert.ok(err, `${label}: an ordinary object at the slot declares a refusal`);
    assert.equal(err.status, 'AddressMalformed');
    assert.ok(err.message.startsWith("'[object Object]' "),
      `${label}: the ordinary value's subject is its own rendering, unmoved; got `
      + `${JSON.stringify(err.message.slice(0, 60))}`);
    assert.ok(err.message.includes(classHalf('a plain object')),
      `${label}: the ordinary value's class half is unmoved — it names the class `
      + `${JSON.stringify('a plain object')} in this slot's own declared descriptor form `
      + `${JSON.stringify(classHalf('a plain object'))}; got ${JSON.stringify(err.message)}`);
  }
});

test('JC-TC-59 the position spelling invokes nothing taken from a mutable prototype', () => {
  // `test-cases.md` `JC-TC-59`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-4`, items
  // `(4a)`–`(4e)`; the owed byte is `implementation-plan.md §2` step `4`'s arm `(x)`): **THE POSITION SPELLING IS
  // A DIAGNOSTIC-INTEGRITY REQUIREMENT AND MAY INVOKE NOTHING TAKEN FROM A MUTABLE PROTOTYPE.** `valuePosition`
  // builds its segment list with `path.map(...)` and joins it with `.join('/')`, so an override of either member
  // runs on EVERY member-position refusal and ITS RETURN VALUE BECOMES THE POSITION — a caller-controlled byte in
  // the store's own diagnostic. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (items `(4a)`, `(4c)` and `(4d)`; `§2.1`'s position law):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | `Array.prototype.map` AND `Array.prototype.join` each replaced by a counting function returning a marker, driving `write(addr, 'mem', {a: 10n})` — a MEMBER position the walk refuses | the position `member 'a' of the write's value argument`, BYTE-IDENTICAL to the unmutated control's; both counters `0`; the marker in no byte |
  // | the same mutation driving `write(addr, 'mem', {a: {b: 10n}})` — a NESTED position of two segments | `member 'a'/'b' of the write's value argument`: both segments are spelled, and neither counter moved |
  // | the CONTROL — the same two shapes with nothing mutated | the same positions, byte for byte |
  // | the RESTORE — every mutated intrinsic put back in a `finally` | proved STRUCTURALLY (the intrinsic's own identity) and BEHAVIOURALLY (a rendering that shows the language's answer is back) |
  //
  // **A DRIVING ACCOMMODATION, NAMED RATHER THAN LEFT TO A READER** (`role_test_writer`; the rule is DRIVE from
  // the implementation, EXPECT from the spec): **the instance is created BEFORE the mutation.** `storeCreate`
  // reads `Array.prototype.map` over its own `listeners` array while it encodes the caller's configuration, so a
  // mutated `map` makes the CONSTRUCTION answer `AddressMalformed` for the literal `'listeners'` and the value
  // walk is never reached — measured, and NOT this clause's subject. The `write` and the position rendering are
  // driven under the mutation, which is what the law is about.
  const MARKER = 'CALLER_CONTROLLED_POSITION_JC59';
  const MUTATED_KEYS = ['map', 'join'];
  const intrinsic = { map: Array.prototype.map, join: Array.prototype.join };
  const memberPosition = "member 'a' of the write's value argument";
  const nestedPosition = "member 'a'/'b' of the write's value argument";
  const declaredMessage = (subject, cls, position) =>
    `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
  const refuserOf = (inst, value) => {
    try {
      inst.write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // THE MUTATION, THE DRIVE AND THE RESTORE IN ONE FRAME: every replaced member is put back in the `finally` from
  // its OWN saved descriptor, and the answer `body` produced is returned beside the counters it saw.
  const underMutatedPrototype = (body) => {
    const saved = new Map();
    for (const key of MUTATED_KEYS) saved.set(key, Object.getOwnPropertyDescriptor(Array.prototype, key));
    const counters = { map: 0, join: 0 };
    try {
      Object.defineProperty(Array.prototype, 'map', {
        value: function () { counters.map += 1; return [MARKER]; },
        writable: true, enumerable: false, configurable: true,
      });
      Object.defineProperty(Array.prototype, 'join', {
        value: function () { counters.join += 1; return MARKER; },
        writable: true, enumerable: false, configurable: true,
      });
      return { result: body(counters), counters };
    } finally {
      for (const key of MUTATED_KEYS) {
        const descriptor = saved.get(key);
        if (descriptor === undefined) delete Array.prototype[key];
        else Object.defineProperty(Array.prototype, key, descriptor);
      }
    }
  };

  // (1) THE LIVENESS PROOF AND THE MUTATED DRIVE, IN ONE FRAME: the two overrides are driven DIRECTLY first (so a
  // `0` asserted below cannot be an inert counter's), the counters are reset, and only then is the refusal driven.
  let liveMapAnswer = null;
  let liveJoinAnswer = null;
  let memberError = null;
  let memberCounters = null;
  const memberInst = instance();
  const memberDrive = underMutatedPrototype((counters) => {
    const twin = [1, 2];
    liveMapAnswer = twin.map((element) => element);
    liveJoinAnswer = twin.join('/');
    counters.map = 0; // the liveness reads are not the refusal path's counts
    counters.join = 0;
    const err = refuserOf(memberInst, { a: 10n });
    return err;
  });
  memberError = memberDrive.result;
  memberCounters = { map: memberDrive.counters.map, join: memberDrive.counters.join };
  assert.ok(Array.isArray(liveMapAnswer) && liveMapAnswer.includes(MARKER),
    'the map override is DEAD: a direct `[1, 2].map(...)` did not answer the marker');
  assert.equal(liveJoinAnswer, MARKER,
    'the join override is DEAD: a direct `[1, 2].join(\'/\')` did not answer the marker');
  assert.equal(Array.prototype.map, intrinsic.map,
    'the map restore did NOT take: Array.prototype.map is not the intrinsic again');
  assert.equal(Array.prototype.join, intrinsic.join,
    'the join restore did NOT take: Array.prototype.join is not the intrinsic again');
  assert.equal([1, 2].map((element) => element * 2).length, 2,
    'the map restore is proved behaviourally: the intrinsic answers an array of the same length');
  assert.equal([1, 2].join('/'), '1/2',
    'the join restore is proved behaviourally: the intrinsic answers `1/2` again');
  assert.ok(memberError,
    'a value refused at a MEMBER position is still refused: the mutation changes the position byte, never the answer');
  assert.equal(memberError.status, STATUS);
  assert.equal(memberCounters.map, 0,
    `the position spelling invoked Array.prototype.map ${memberCounters.map} time(s) — it may invoke nothing `
    + 'taken from a mutable prototype (§2.1 F5-4, item (4c))');
  assert.equal(memberCounters.join, 0,
    `the position spelling invoked Array.prototype.join ${memberCounters.join} time(s) — item (4a) names that `
    + 'call by its own bytes, and its return value became the position');
  assert.equal(memberError.message, declaredMessage('10n', 'a bigint', memberPosition),
    'the position is the DECLARED spelling — `member \'a\' of the write\'s value argument` — and not whatever a '
    + 'mutable prototype answered (items (4c) and (4d))');
  assert.ok(!memberError.message.includes(MARKER) && !JSON.stringify(memberError).includes(MARKER),
    `the override's marker reached a byte of the refusal: ${JSON.stringify(memberError.message)}`);

  // (2) THE NESTED POSITION — two segments, both spelled, and both counters still `0`. The instrument is proved
  // live in this frame too (the counters are per-frame here), so the nested `0`s are not read through a stale
  // instrument.
  const nestedInst = instance();
  let nestedLive = false;
  const nestedDrive = underMutatedPrototype((counters) => {
    const twin = [1];
    nestedLive = Array.isArray(twin.map((element) => element)) && twin.join(',') === MARKER;
    counters.map = 0; // the liveness reads are not the refusal path's counts
    counters.join = 0;
    return refuserOf(nestedInst, { a: { b: 10n } });
  });
  const nestedError = nestedDrive.result;
  assert.ok(nestedLive, 'the nested drive\'s instrument is DEAD: neither override answered its own marker');
  assert.ok(nestedError, 'the nested member value is refused under the mutation');
  assert.equal(nestedError.status, STATUS);
  assert.equal(nestedDrive.counters.map, 0,
    `the nested position invoked Array.prototype.map ${nestedDrive.counters.map} time(s) (§2.1 F5-4, item (4c))`);
  assert.equal(nestedDrive.counters.join, 0,
    `the nested position invoked Array.prototype.join ${nestedDrive.counters.join} time(s) (§2.1 F5-4, item (4c))`);
  assert.equal(nestedError.message, declaredMessage('10n', 'a bigint', nestedPosition),
    'both segments are spelled, single-quoted, joined by `/`: the nested position is the declared one and the '
    + 'mutation moved no byte of it');
  assert.equal(Array.prototype.map, intrinsic.map, 'the nested drive left the map intrinsic in place');
  assert.equal(Array.prototype.join, intrinsic.join, 'the nested drive left the join intrinsic in place');

  // (3) THE CONTROL — the same two shapes with NOTHING mutated. The positions are the same bytes, so the mutated
  // drives above are compared against the language's own answer and not against a second rendering of the defect.
  const controlMemberError = refuserOf(instance(), { a: 10n });
  assert.ok(controlMemberError, 'the member-position control is refused');
  assert.equal(controlMemberError.message, declaredMessage('10n', 'a bigint', memberPosition),
    'the unmutated control spells the same member position');
  assert.equal(controlMemberError.message, memberError.message,
    'the mutated drive and the control must be BYTE-IDENTICAL: the position is the package\'s own fact, not a '
    + 'prototype\'s answer');
  const controlNestedError = refuserOf(instance(), { a: { b: 10n } });
  assert.ok(controlNestedError, 'the nested-position control is refused');
  assert.equal(controlNestedError.message, declaredMessage('10n', 'a bigint', nestedPosition),
    'the unmutated control spells the same nested position');
  assert.equal(controlNestedError.message, nestedError.message,
    'the nested drive and its control must be BYTE-IDENTICAL');

  // (4) THE RESTORE, PROVED ONE MORE TIME AT THE END OF THE CELL: no state below can be read through a stale
  // override, and the intrinsic's own figures are back beside the renderings above.
  assert.equal(Array.prototype.map, intrinsic.map, 'the cell leaves Array.prototype.map as the language\'s own');
  assert.equal(Array.prototype.join, intrinsic.join, 'the cell leaves Array.prototype.join as the language\'s own');
  assert.equal(Array.prototype.join.length, 1,
    'the join in place is the intrinsic: its own declared arity is `1`');
  assert.equal(String([1, 2]), '1,2',
    'the language\'s own rendering is back, which is what every control above was compared against');
});

// ── THE TWO STATES THE GATE-11 SIXTH AUDIT DECLARED — `F6-1` AND `F6-2` ────────────────────────────────
// (`test-cases.md`'s clause of 2026-10-24 — the GATE-11 SIXTH AUDIT PASS, items `(1)`–`(5)` — adds `JC-TC-60`
// and `JC-TC-61` at the END of `§3`'s table; `contract.md §2.1`'s clause of the same date declares the two laws
// at its items `(1a)`–`(1f)` and `(2a)`–`(2d)`, and `implementation-plan.md §2` step `4`'s clause of the same
// date owes their bytes at arms `(xi)` and `(xii)` — **THE RED FIRST AND THE BYTE SECOND. BOTH CELLS BELOW ARE
// RED AT THE SHIPPED TREE AND BOTH ASSERT THE CONTRACT'S ANSWER AND NEVER TODAY'S.**)
//
// **THE DRIVING DISCIPLINES ARE THE SECTION ABOVE'S OWN AND ARE CITED, NOT RESTATED** (`:1651`–`:1663`): a drive
// whose cost is unbounded at the shipped tree runs where a clock can stop it, every counter is proved LIVE
// before a `0` is asserted against it, and every mutated intrinsic is restored in a `finally` with the restore
// proved — structurally AND behaviourally. **ONE DISCIPLINE IS THIS SECTION'S OWN AND IS STATED HERE ONCE:**
// where ONE mutation makes TWO rows unreachable — `JC-TC-61`'s rows `9` and `10` share `hasLoneSurrogate` as
// their SOLE gate — the drives are CAPTURED INSIDE the mutation frame and asserted only AFTER the restore, so
// every state is exercised and one failure NAMES EVERY ADMITTED STATE instead of hiding the second behind the
// first.

/// The refusal's declared message, byte for byte: `§2.1`'s two declared parts — the subject, single-quoted by
/// the generator, then `, the value at <position> is <class>` — spelled exactly as `test-cases.md`'s rows `9`,
// `10` and row `8`'s depth arm declare them. **The three arguments are exactly the three facts the two clauses
/// leave open per row**: the SUBJECT (the value's own class spelling at row `9`; `'the write's value argument'`
/// at row `10`; the class spelling at row `8`'s depth arm when the guard trips), the POSITION (the root
/// position, the `'<key: …>'` form `valuePosition` spells, or the `127`-segment depth position) and the CLASS.
function declaredRefusal(subject, cls, position = VALUE_POSITION) {
  return `'${subject}' is not a value the JavaScript crossing admits, the crossing carries strings, `
    + `booleans, finite numbers, plain objects and arrays, the value at ${position} is ${cls}`;
}

/// Assert a refusal's message against the DECLARED bytes with the failure output CLIPPED: `JC-TC-60`'s control
/// renders `10,000` `'[object Object]'` spellings, so a bare `assert.equal` on a mismatch would print two ~160 KB
/// strings into the report and bury the finding it exists to carry.
function assertDeclaredMessage(error, expected, label) {
  assert.ok(error !== null && error !== undefined,
    `${label}: the contract declares a REFUSAL; the value was admitted instead`);
  assert.equal(typeof error.message, 'string', `${label}: the refusal carries no message byte`);
  assert.ok(error.message === expected,
    `${label}: the refusal's message must be the DECLARED bytes (${expected.length} chars); got `
    + `${error.message.length} chars, head ${JSON.stringify(error.message.slice(0, 160))} …`);
}

/// The child driver behind `JC-TC-60`'s CHAIN-MULTIPLYING WITNESS. **It reaches the package through the claimed
/// ESM entry** (`acceptance.md §4.1` item 1) for the reason the driver above does: the scratch file stands under
/// this package's own tree, so its bare `provident-storeroom` specifier resolves by the package's own
/// `package.json` to the same entry this file imports. **It is a SEPARATE driver and NOT a state of
/// `CHILD_DRIVE_SOURCE`** — `JC-TC-57`'s driver is that cell's own and this pass leaves its bytes alone.
///
/// It builds the clause's own witness — an element at the head of a `100,000`-link chain, `10,000` times, at the
/// depth arm's `127` — and prints one JSON line: the elapsed milliseconds of the `write` call ALONE, and the
/// refusal's `status` and `message`. The construction stands outside the timed region so the figure is the
/// guard's cost and not the fixture's.
const CHAIN_WALK_CHILD_SOURCE = `import { storeCreate } from "${ENTRY_URL}";
const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
// THE CLAUSE'S OWN WITNESS (contract.md §2.1 F6-1, items (1b) and (1e)): a plain object at the head of a
// 100,000-link chain, carrying NO conversion member and NO Symbol.toStringTag member, multiplied across 10,000
// element positions at row 8's depth arm.
const ELEMENT_LINKS = 100000;
const ELEMENT_COUNT = 10000;
let element = {};
for (let i = 0; i < ELEMENT_LINKS; i += 1) element = Object.create(element);
const value = arrayChain(new Array(ELEMENT_COUNT).fill(element), 127);
const started = Date.now();
let thrown = null;
try {
  storeCreate({ journalLength: 8, listeners: [] }).write(['v'], 'mem', value);
} catch (caught) {
  thrown = caught;
}
const elapsedMs = Date.now() - started;
process.stdout.write(JSON.stringify({
  elapsedMs,
  status: thrown === null ? null : thrown.status,
  message: thrown === null ? null : thrown.message,
}) + '\\n');
`;

/// Run `CHAIN_WALK_CHILD_SOURCE` and answer `{timedOut, killedAt, answer}` — `timedOut` where the child was still
/// running at `WALL_CLOCK_CEILING_MS + 2000` ms and was KILLED, so a regression REPORTS instead of stalling the
/// suite. The scratch directory is removed in a `finally` whether or not the drive finished.
function boundedChainWalkDrive() {
  const dir = mkdtempSync(join(TEST_DIR, '.jc-tc-60-'));
  const driver = join(dir, 'drive.mjs');
  const killedAt = WALL_CLOCK_CEILING_MS + 2000;
  try {
    writeFileSync(driver, CHAIN_WALK_CHILD_SOURCE, 'utf8');
    let out = null;
    let timedOut = false;
    try {
      out = execFileSync(process.execPath, [driver], {
        encoding: 'utf8',
        cwd: dir,
        timeout: killedAt,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (caught) {
      if (caught && (caught.code === 'ETIMEDOUT' || caught.signal === 'SIGTERM')) timedOut = true;
      else throw caught;
    }
    return { timedOut, killedAt, answer: out === null ? null : JSON.parse(out.trim().split('\n').pop()) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('JC-TC-60 every read the render guard performs is charged to the one per-call budget', { timeout: 180000 }, () => {
  // `test-cases.md` `JC-TC-60`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-1`, items
  // `(1a)`–`(1f)`; the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm `(xi)`):
  // **EVERY READ THE RENDER GUARD PERFORMS IS CHARGED TO THE SAME ONE PER-CALL BUDGET — the array's own
  // position, each index it reads, and EVERY LINK EVERY CHAIN WALK REACHES, per element and for the refused
  // value itself — AND EXHAUSTION ANSWERS THE ARM'S CLASS SPELLING (item `(1c)`).** The shipped budget spends
  // positions and element-limb descriptor reads and NOTHING for a link, and each element is walked TWICE (the
  // `@@toPrimitive` search and the tag search), so `arrayChain(new Array(10_000).fill(e), 127)` with `e` on a
  // `100,000`-link chain costs `2·M·K ≈ 2×10^9` link visits against `M+1` positions spent (items `(1a)` and
  // `(1b)`) — caller-scalable in EITHER factor, and payable on a rendering the guard APPROVES, since such a
  // chain carries no conversion member and no tag member. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (items `(1b)`, `(1c)` and `(1e)`; the clause's own
  // witness, its control, the two controls `JC-TC-56` owns, one state INSIDE the budget, and the per-call
  // freshness item `(1d)` states):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | THE CHAIN-MULTIPLYING WITNESS — `e` at the head of a `100,000`-link chain (built by `Object.create` repeated, carrying no conversion member and no `Symbol.toStringTag` member), `arrayChain(new Array(10_000).fill(e), 127)` | row `8`'s class spelling `a value over the walk ceiling` at the depth arm's own `127`-segment position, and THE WHOLE REFUSAL COMPLETING WITHIN A WALL-CLOCK CEILING OF `5` SECONDS — the `~2×10^9` link visits are never taken, because every link is charged to the one per-call budget and exhaustion answers the class spelling |
  // | CONTROL — the same `M` over a `2`-link chain of the same shape (`M = 10,000`, `K = 2`) | the refused array's own join, BYTE-IDENTICALLY: the `10,000` `'[object Object]'` spellings by `,` — the guard approves, so the sanctioned rendering survives |
  // | CONTROL — the ordinary ALIAS `const e = [1]; arrayChain([e, e], 127)` | `'1,1'`, unmoved by this budget (`JC-TC-56`'s alias) |
  // | CONTROL — the CYCLE `const a = []; a.push(a); arrayChain(a, 127)` | the class spelling: a cycle still trips the path test and this cell does not un-declare it |
  // | a witness INSIDE the budget whose rendering is LARGE — `M = 3,000` over a `20`-link chain (`1 + 3,000 × (1 + 2×20) = 123,001` positions by item `(1c)`'s one-position-per-link-per-walk count) | the WITHOUT branch: the array's own join of `3,000` `'[object Object]'` spellings — **`1,000,000` is a BUDGET and not a rendering clamp**, and the declared answer is asserted rather than assumed |
  // | two IDENTICAL calls of the K-FACTOR witness — `M = 2` over a `600,000`-link chain (`1 + 2 × (1 + 2×600,000)` positions, outside the budget at the SECOND element) | the SAME class spelling at the SAME position on BOTH calls, inside the ceiling: the allowance is FRESH PER CALL and nothing is cached between calls (item `(1d)`), so the exhaustion answer is DETERMINISTIC |
  const ROW_8 = 'a value over the walk ceiling';
  const POSITION_BUDGET = NODE_CEILING;
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  // THE ELEMENT THE WITNESS MULTIPLIES: a plain object at the head of `links` `Object.create` links. It carries
  // NO conversion member and NO `Symbol.toStringTag` member, so the guard answers "no caller code" at every link
  // of every element and the state is a SANCTIONED RENDERING whose price the caller used to set (item `(1b)`).
  const chainOf = (links) => {
    let element = {};
    for (let i = 0; i < links; i += 1) element = Object.create(element);
    return element;
  };
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (0) THE ONE FIGURE, PINNED BEFORE ANY DRIVE: the charge is `NODE_CEILING` itself and NO SECOND FIGURE IS
  // MINTED (item `(1c)`), so a passing implementation cannot move the boundary this cell pins by minting one.
  assert.equal(POSITION_BUDGET, 1_000_000, 'the one per-call budget is the declared 1,000,000 positions (item (1c))');
  assert.equal(POSITION_BUDGET, NODE_CEILING,
    'the figure is `NODE_CEILING` itself (item (1c)): minting a second ceiling would move the boundary this cell pins');

  // THE DRIVES RUN IN THE ORDER THEY MUST: every CONTROL and the one state INSIDE the budget first, so each
  // sanctioned rendering this law must NOT disturb is exercised before any red aborts the cell; then the three
  // drives whose declared answer is the class spelling — the ONE drive whose cost is unbounded at the shipped
  // tree in a child that is killed rather than allowed to stall the suite, and the K-FACTOR pair last, which is
  // bounded in-process and carries the per-call-freshness state.

  // (1) THE CONTROL THE CLAUSE ITSELF NAMES (item `(1e)`): the same `M` over a `2`-link chain. The chain is the
  // SAME SHAPE as the witness's — plain objects, no conversion member, no tag member — so the ONLY difference
  // between this control and the witness is the chain's LENGTH, and the ONLY thing a passing implementation may
  // let that length change is the cost, never the answer.
  const CONTROL_M = 10000;
  const controlError = drive(arrayChain(new Array(CONTROL_M).fill(chainOf(2)), 127));
  assert.equal(controlError === null ? null : controlError.status, STATUS,
    'the control array is refused at the depth arm before any store verb');
  assertDeclaredMessage(controlError,
    declaredRefusal(new Array(CONTROL_M).fill('[object Object]').join(','), ROW_8, deepPath),
    'the CONTROL — the same M over a 2-link chain: the refused array\'s own join, byte for byte');

  // (2) THE TWO CONTROLS `JC-TC-56` OWNS, unmoved by this budget: an ALIAS is not a cycle and a CYCLE is not a
  // cost.
  const aliasedLeaf = [1];
  assertDeclaredMessage(drive(arrayChain([aliasedLeaf, aliasedLeaf], 127)),
    declaredRefusal('1,1', ROW_8, deepPath),
    'the ordinary ALIAS `[e, e]` with `e = [1]`: the sanctioned rendering survives the budget');
  const cyclic = [];
  cyclic.push(cyclic);
  assertDeclaredMessage(drive(arrayChain(cyclic, 127)),
    declaredRefusal(ROW_8, ROW_8, deepPath),
    'the CYCLE control: a cycle still trips the path test and answers the class spelling');

  // (3) THE WITNESS INSIDE THE BUDGET WHOSE RENDERING IS LARGE. `1 + 3,000 × (1 + 2×20)` is `123,001` positions
  // by item `(1c)`'s own count, and `~370,000` even if an implementation charges THREE positions for every link
  // visited — so no reading of the law puts this state outside the `1,000,000`. **Its declared answer is the
  // array's own join and NOT the class spelling: the budget is a budget and not a rendering clamp (item
  // `(1b)(iii)`'s reading, kept by item `(1c)`). A pass that turns this into a class spelling has clamped a
  // rendering, which is the one thing this law does not licence.**
  const INSIDE_BUDGET_M = 3000;
  const INSIDE_BUDGET_LINKS = 20;
  assertDeclaredMessage(drive(arrayChain(new Array(INSIDE_BUDGET_M).fill(chainOf(INSIDE_BUDGET_LINKS)), 127)),
    declaredRefusal(new Array(INSIDE_BUDGET_M).fill('[object Object]').join(','), ROW_8, deepPath),
    `the INSIDE-BUDGET witness (M = ${INSIDE_BUDGET_M}, K = ${INSIDE_BUDGET_LINKS}): 123,001 positions of the `
    + 'declared 1,000,000, so the guard still approves and the large rendering is the declared answer');

  // (4) THE CHAIN-MULTIPLYING WITNESS — the clause's own, `2·M·K` link visits against `M+1` positions spent,
  // driven in a child that is KILLED at the ceiling rather than allowed to stall the suite. **This is the
  // cell's primary red**: at the shipped tree the two walks charge nothing, so the refusal is minutes away and
  // reports as an unfinished drive instead of passing.
  const witnessDrive = boundedChainWalkDrive();
  assert.ok(!witnessDrive.timedOut,
    `the CHAIN-MULTIPLYING WITNESS did not answer inside the ${witnessDrive.killedAt} ms cap it was given, so `
    + 'the whole refusal did NOT complete within the declared 5-second ceiling: the per-element chain walk is '
    + 'charged nothing, so a caller-scalable `2·M·K ≈ 2×10^9` link visits are taken against `M+1` positions '
    + 'spent (contract.md §2.1 F6-1, items (1b), (1c) and (1e))');
  assert.equal(witnessDrive.answer.status, STATUS,
    'the witness is a REFUSAL, not an admission: the walk refuses it at the depth arm before any store verb');
  assert.ok(witnessDrive.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the chain-multiplying witness's refusal took ${witnessDrive.answer.elapsedMs} ms; the declared ceiling is `
    + `${WALL_CLOCK_CEILING_MS} ms, and the declared work is at most ${POSITION_BUDGET} positions with one `
    + 'descriptor read or one link charge apiece (items (1c) and (1e))');
  assertDeclaredMessage(witnessDrive.answer,
    declaredRefusal(ROW_8, ROW_8, deepPath),
    'the CHAIN-MULTIPLYING WITNESS: the budget is spent on the chain walks, the guard answers "caller code is '
    + 'reachable", and row 8\'s class spelling is the answer at the depth arm\'s own position');

  // (5) THE SAME LAW AT THE OTHER FACTOR, TWICE (item `(1b)`'s `M = 1` with `K = 10^8` reading, taken at a
  // figure this suite can carry): `M = 2` over a `600,000`-link chain is `1 + 2 × (1 + 2×600,000)` positions —
  // outside the budget at the SECOND element — and it is ALSO the per-call-freshness state item `(1d)` states:
  // two identical calls must answer the SAME bytes, because the allowance is created per call and nothing is
  // captured or cached between calls. It is bounded in-process: at the shipped tree the uncharged walks cost
  // `2·M·K = 2.4×10^6` link visits and report in well under a second.
  const K_FACTOR_LINKS = 600000;
  const kFactorElement = chainOf(K_FACTOR_LINKS);
  const kFactorCalls = [];
  for (const call of [1, 2]) {
    const started = Date.now();
    const error = drive(arrayChain(new Array(2).fill(kFactorElement), 127));
    kFactorCalls.push({ call, error, elapsedMs: Date.now() - started });
  }
  assert.deepEqual(kFactorCalls.map(({ error }) => error === null), [false, false],
    'both identical calls of the K-FACTOR witness must be REFUSED: the chain walk spends the one budget, the '
    + 'guard answers the class spelling, and an admission at either call means a link was entered unpaid (item '
    + '(1c))');
  assertDeclaredMessage(kFactorCalls[0].error, declaredRefusal(ROW_8, ROW_8, deepPath),
    'the K-FACTOR witness, FIRST call');
  assertDeclaredMessage(kFactorCalls[1].error, declaredRefusal(ROW_8, ROW_8, deepPath),
    'the K-FACTOR witness, SECOND call');
  assert.equal(kFactorCalls[1].error.message, kFactorCalls[0].error.message,
    'the budget-exhaustion answer must be DETERMINISTIC across two identical calls: the allowance is created '
    + 'once per call and nothing is captured, memoized or cached between calls (item (1d))');
  for (const { call, elapsedMs } of kFactorCalls) {
    assert.ok(elapsedMs <= WALL_CLOCK_CEILING_MS,
      `the K-FACTOR witness's call ${call} took ${elapsedMs} ms; the declared ceiling is `
      + `${WALL_CLOCK_CEILING_MS} ms (item (1e)'s ceiling, at the other factor)`);
  }
});

test('JC-TC-61 the lone-surrogate predicate invokes nothing taken from a mutable prototype', () => {
  // `test-cases.md` `JC-TC-61`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-2`, items
  // `(2a)`–`(2d)`; the owed byte is `implementation-plan.md §2` step `4`'s clause of this date, arm `(xii)`):
  // **THE PREDICATE READS THE STRING'S OWN CODE UNITS BY A LOCAL INDEX READ AND INVOKES NOTHING TAKEN FROM A
  // PROTOTYPE** (item `(2b)`). `hasLoneSurrogate` reads each unit as `text.charCodeAt(i)` — A MEMBER READ OFF
  // `String.prototype` AT THE MOMENT OF THE CALL — and it is the SOLE gate on rows `9` and `10` with NO
  // downstream refuser (item `(2a)`), so an override answering `0x41` at every index makes the class
  // `a string carrying a lone surrogate` UNREACHABLE at BOTH positions: a lone-surrogate value and a
  // lone-surrogate key both cross, and `facade.rs`'s string path repairs the code unit to U+FFFD on the way in
  // — the one answer `§1`'s string bullet and rows `9`/`10` forbid. **This cell is that red.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (items `(2a)`, `(2b)` and `(2d)`; rows `9` and `10` of
  // `§2` and their per-arm cells; `parameter-semantics.md §2`'s declared `'<key: …>'` segment):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | the VALUE drive under the mutation — `String.prototype.charCodeAt` replaced by a counting function answering `0x41` for EVERY index, beside `String.prototype['1'] = '\uDC00'`, driving `write(addr, 'mem', '\uD800')` | row `9` REFUSED: `a string carrying a lone surrogate` at the root position `the write's value argument`, `ValueRefusedAtBoundary`, **the override's counter `0`**, and no lone surrogate crossing to the store |
  // | the KEY drive under the same mutation — `write(addr, 'mem', {['a\uD800']: 1})`, the shape `JC-TC-40` carries | row `10` REFUSED: the same class at the member position that key path spells, `member '<key: a string carrying a lone surrogate>' of the write's value argument`, the override's counter `0` |
  // | the BOUND'S OWN drive — `String.prototype['1'] = '\uDC00'` beside `write(addr, 'mem', '\uD800')`, the intrinsic `charCodeAt` UNTOUCHED | the same row `9` refusal: a caller-defined out-of-range CANONICAL index would PAIR a high surrogate standing alone at the string's end, and the pair read is bounded to `i + 1 < text.length`, so it pairs nothing |
  // | CONTROL — the pair `'\uD83D\uDE00'` under the mutation | ADMITTED and read back BYTE-IDENTICALLY (the predicate is the only refusal of the class and a lawful pair is not the class) |
  // | CONTROL — the high half `'\uD800'` and the low half `'\uDC00'`, each standing alone | each REFUSED at row `9` with the declared bytes |
  // | CONTROL — the same three drives with NOTHING mutated | the refusals BYTE-IDENTICAL to the mutated ones |
  // | the RESTORE — every mutated member put back in a `finally` | proved STRUCTURALLY (identity and descriptor) and BEHAVIOURALLY (the intrinsic's answer, an absent out-of-range index, the pair admitted and a lone surrogate refused) |
  //
  // **A DRIVING NOTE, NAMED RATHER THAN LEFT TO A READER** (the rule is DRIVE from the implementation, EXPECT
  // from the spec): item `(2a)` fixes the override's ANSWER at `0x41` for every index and not a decorative
  // string, because a string is not a code unit and could not exercise the predicate's surrogate RANGE at all.
  // The MARKER this cell then looks for in the refusal's bytes is that numeric answer `65`: the class spelling
  // is declared to be the caller's code unit's REPLACEMENT, so a `65` standing in the message would be the
  // override's answer where the package's own datum belongs. The byte-exact message assertion is the stronger
  // pin and the marker check stands beside it.
  const CLASS = 'a string carrying a lone surrogate';
  const KEY_POSITION = `member '<key: a string carrying a lone surrogate>' of ${VALUE_POSITION}`;
  const KEY_SUBJECT = "the write's value argument";
  const CODE_UNIT_MARKER = 0x41;
  const intrinsic = String.prototype.charCodeAt;
  const refusalOf = (inst, value) => {
    try {
      inst.write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };
  // INSTALL / DRIVE / RESTORE IN ONE FRAME: every replaced member is put back in the `finally` from its OWN
  // saved descriptor — deleted where it did not exist — and the counters the body saw are returned beside its
  // result. **NOTHING IS ASSERTED INSIDE THE FRAME**, so both rows' drives complete and the restore runs before
  // any expectation is read.
  const underMutatedStringPrototype = (installs, body) => {
    const counters = { codeUnits: 0 };
    const saved = [];
    try {
      for (const install of installs) {
        const resolved = install(counters);
        saved.push([resolved.key, Object.getOwnPropertyDescriptor(String.prototype, resolved.key)]);
        Object.defineProperty(String.prototype, resolved.key, resolved.descriptor);
      }
      return { result: body(counters), counters };
    } finally {
      for (const [key, descriptor] of saved) {
        if (descriptor === undefined) delete String.prototype[key];
        else Object.defineProperty(String.prototype, key, descriptor);
      }
    }
  };
  // THE TWO MUTATIONS, each as its own descriptor so the frame's restore cannot confuse them.
  const codeUnitOverride = (counters) => ({
    key: 'charCodeAt',
    descriptor: {
      // ANSWERS `0x41` FOR EVERY INDEX (item (2a)) and counts every invocation, so a `0` asserted below is the
      // predicate's silence and not an inert instrument's.
      value: function charCodeAtMarker() { counters.codeUnits += 1; return CODE_UNIT_MARKER; },
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });
  const prototypeIndex = () => ({
    // A CALLER-DEFINED CANONICAL INDEX standing on the prototype. `'\uD800'` has ONE code unit, so index `1`
    // is NOT the wrapper's own property and this member is exactly what an unguarded `text[i + 1]` would find.
    key: '1',
    descriptor: { value: '\uDC00', writable: true, enumerable: true, configurable: true },
  });

  // (1) THE BOUND'S OWN DRIVE, with the intrinsic `charCodeAt` UNTOUCHED so the state is the BOUND's and not the
  // override's — the third control item `(2b)` names in its own words: *"AN UNGUARDED `text[i + 1]` WOULD BREAK
  // THE VERY PROPERTY THIS FORM IS TAKEN FOR"*.
  let boundLiveIndex = null;
  let boundError = null;
  let boundNode = null;
  underMutatedStringPrototype([prototypeIndex], () => {
    boundLiveIndex = '\uD800'[1];
    const inst = instance();
    boundError = refusalOf(inst, '\uD800');
    boundNode = inst.read([]);
    return null;
  });
  assert.equal(boundLiveIndex, '\uDC00',
    'the caller-defined prototype index is DEAD: an out-of-range index read did not reach it, so this drive '
    + 'proves nothing about the pair read\'s bound');
  assertDeclaredMessage(boundError, declaredRefusal(CLASS, CLASS, VALUE_POSITION),
    'the BOUND\'s own drive: the pair read is bounded to `i + 1 < text.length`, so the out-of-range prototype '
    + 'index pairs nothing and the high surrogate standing alone is refused');
  assert.equal(boundError.status, STATUS, 'the bound\'s own drive answers ValueRefusedAtBoundary');
  assert.deepEqual(boundNode, {}, 'no lone surrogate crossed to the store on the bound\'s own drive');

  // (2) THE MUTATED FRAME: the liveness read, then BOTH rows' drives, then the admitted control, each with its
  // own counter snapshot and its store's node.
  let liveAnswer = null;
  let liveCount = null;
  let valueError = null;
  let valueNode = null;
  let valueCount = null;
  let keyError = null;
  let keyNode = null;
  let keyCount = null;
  let emojiError = null;
  let emojiRead = null;
  let emojiCount = null;
  const mutated = underMutatedStringPrototype([codeUnitOverride, prototypeIndex], (counters) => {
    // THE INSTRUMENT'S LIVENESS: driven DIRECTLY first, on a twin string, so a `0` asserted below cannot belong
    // to an override that never ran.
    liveAnswer = 'AB'.charCodeAt(0);
    liveCount = counters.codeUnits;
    counters.codeUnits = 0; // the liveness read is not the refusal path's count
    const valueInst = instance();
    valueError = refusalOf(valueInst, '\uD800');
    valueNode = valueInst.read([]);
    valueCount = counters.codeUnits;
    counters.codeUnits = 0;
    const keyInst = instance();
    keyError = refusalOf(keyInst, { 'a\uD800': 1 });
    keyNode = keyInst.read([]);
    keyCount = counters.codeUnits;
    counters.codeUnits = 0;
    const emojiInst = instance();
    try {
      emojiInst.write(['v'], 'mem', '\uD83D\uDE00');
      emojiRead = emojiInst.read(['v'], 'mem');
    } catch (caught) {
      emojiError = caught;
    }
    emojiCount = counters.codeUnits;
    return null;
  });
  assert.equal(mutated.counters.codeUnits, emojiCount,
    'the frame\'s counter must be the last snapshot it took: a counter that moved after the drives belongs to '
    + 'the harness and not to the package');

  // (3) THE LIVENESS, ASSERTED BEFORE ANY `0` (the discipline the section above states at `:1658`).
  assert.equal(liveAnswer, CODE_UNIT_MARKER,
    `the charCodeAt override is DEAD: a direct \`'AB'.charCodeAt(0)\` answered ${JSON.stringify(liveAnswer)} and `
    + 'not the marker, so the `0`s below would prove nothing');
  assert.equal(liveCount, 1,
    `the charCodeAt override's counter is DEAD: it moved ${liveCount} time(s) on one direct read`);

  // (4) BOTH ROWS IN ONE GATE, SO ONE FAILURE NAMES EVERY ADMITTED STATE: at the shipped tree the override makes
  // the class unreachable at BOTH positions and each drive is ADMITTED, the value crossing as U+FFFD.
  const admitted = [];
  if (valueError === null) {
    admitted.push("row 9 — the VALUE drive `write(addr, 'mem', '\\uD800')` was ADMITTED: a string carrying a lone surrogate crossed the boundary");
  }
  if (keyError === null) {
    admitted.push("row 10 — the KEY drive `write(addr, 'mem', {'a\\uD800': 1})` was ADMITTED: a lone-surrogate member key crossed the boundary");
  }
  assert.deepEqual(admitted, [],
    'String.prototype.charCodeAt was overridden to answer 0x41 at EVERY index, and hasLoneSurrogate took that '
    + 'answer from the mutable prototype and so decided both facts: ' + admitted.join(' ; ')
    + ' (contract.md §2.1 F6-2, items (2a), (2b) and (2c))');

  // (5) ROW 9 UNDER THE MUTATION — the declared bytes, the counter at `0`, and no byte of the store touched.
  assert.equal(valueError.status, STATUS,
    'row 9\'s answer is ValueRefusedAtBoundary under the mutation as it is without it');
  assertDeclaredMessage(valueError, declaredRefusal(CLASS, CLASS, VALUE_POSITION),
    'row 9 under the mutated prototype: the class spelling as the SUBJECT and as the CLASS, at the root position');
  assert.equal(valueCount, 0,
    `the predicate invoked String.prototype.charCodeAt ${valueCount} time(s) on row 9's refusal path: it reads the `
    + 'string\'s own code units by a LOCAL index read and invokes nothing taken from a prototype (item (2b))');
  assert.deepEqual(valueNode, {}, 'the refused drive wrote no node, anchor or journal entry');
  assert.ok(!JSON.stringify(valueError).includes(String(CODE_UNIT_MARKER)),
    `the override's answer ${CODE_UNIT_MARKER} reached a byte of the refusal `
    + `(${JSON.stringify(valueError.message.slice(0, 200))}): the class spelling is the declared replacement, `
    + 'never the caller\'s code unit');
  assert.ok(!valueError.message.includes('\uFFFD'),
    'no repair byte (U+FFFD) appears in the refusal: the value was REFUSED and not repaired');

  // (6) ROW 10 UNDER THE MUTATION — the same class at the member position the key path spells.
  assert.equal(keyError.status, STATUS,
    'row 10\'s answer is ValueRefusedAtBoundary under the mutation as it is without it');
  assertDeclaredMessage(keyError, declaredRefusal(KEY_SUBJECT, CLASS, KEY_POSITION),
    'row 10 under the mutated prototype: the VALUE ARGUMENT\'s name as the subject, the class spelling at the '
    + 'member position `valuePosition`\'s lone-surrogate form spells');
  assert.equal(keyCount, 0,
    `the predicate invoked String.prototype.charCodeAt ${keyCount} time(s) on row 10's refusal path (item (2b))`);
  assert.deepEqual(keyNode, {}, 'the refused key drive wrote no byte of the store');

  // (7) THE ADMITTED CONTROL — a lawful pair is not the class, so the predicate's own range test still answers.
  assert.equal(emojiError, null,
    `the CONTROL pair '\\uD83D\\uDE00' must be ADMITTED; it was refused with `
    + `${JSON.stringify(emojiError === null ? null : emojiError.message)}`);
  assert.equal(emojiRead, '\uD83D\uDE00',
    'the admitted pair crossed and read back BYTE-IDENTICALLY: a lawful pair is not repaired either');
  assert.equal(emojiCount, 0,
    `the predicate invoked String.prototype.charCodeAt ${emojiCount} time(s) on the ADMITTED drive: the law is `
    + 'about the READ and not about the refusal path alone (item (2b))');

  // (8) THE UNMUTATED CONTROL OF ALL THREE DRIVES — the same refusals, byte for byte.
  const controlValue = refusalOf(instance(), '\uD800');
  assertDeclaredMessage(controlValue, declaredRefusal(CLASS, CLASS, VALUE_POSITION),
    'the unmutated control of the value drive');
  assert.equal(controlValue.message, valueError.message,
    'the mutated value drive and its control must be BYTE-IDENTICAL: the answer is the package\'s own fact and '
    + 'not a prototype\'s');
  assert.equal(boundError.message, controlValue.message,
    'the BOUND\'s own drive and the same control must be BYTE-IDENTICAL');
  const controlKey = refusalOf(instance(), { 'a\uD800': 1 });
  assertDeclaredMessage(controlKey, declaredRefusal(KEY_SUBJECT, CLASS, KEY_POSITION),
    'the unmutated control of the key drive');
  assert.equal(controlKey.message, keyError.message,
    'the mutated key drive and its control must be BYTE-IDENTICAL');
  // THE HIGH AND THE LOW HALF, EACH STANDING ALONE — the class at both, and neither is a pair.
  const lowHalf = refusalOf(instance(), '\uDC00');
  assertDeclaredMessage(lowHalf, declaredRefusal(CLASS, CLASS, VALUE_POSITION),
    'the LOW half `\\uDC00` standing alone is refused at row 9');
  assert.equal(lowHalf.message, controlValue.message,
    'the two halves standing alone answer the SAME bytes: neither is treated as a part of a pair');
  assert.equal(controlValue.status, STATUS, 'the HIGH half `\\uD800` standing alone is refused at row 9');

  // (9) THE RESTORE, PROVED STRUCTURALLY AND BEHAVIOURALLY — no state above or below can be read through a
  // stale override, and the language's own answers are back.
  assert.equal(String.prototype.charCodeAt, intrinsic,
    'the charCodeAt restore did NOT take: String.prototype.charCodeAt is not the intrinsic again');
  const codeUnitDescriptor = Object.getOwnPropertyDescriptor(String.prototype, 'charCodeAt');
  assert.equal(codeUnitDescriptor.writable, true, 'the restored charCodeAt carries its own declared writability');
  assert.equal(codeUnitDescriptor.enumerable, false, 'the restored charCodeAt carries its own declared enumerability');
  assert.equal(codeUnitDescriptor.configurable, true, 'the restored charCodeAt carries its own declared configurability');
  assert.equal(Object.prototype.hasOwnProperty.call(String.prototype, '1'), false,
    'the caller-defined prototype index was NOT removed: String.prototype carries an own `1` again');
  assert.equal('\uD800'[1], undefined,
    'the restore is proved behaviourally: an out-of-range index is the wrapper\'s own absent property again');
  assert.equal('A'.charCodeAt(0), 0x41,
    'the restore is proved behaviourally: the intrinsic answers `A`\'s code unit again');
  assert.equal('\uD83D\uDE00'.codePointAt(0), 0x1F600,
    'the restore is proved behaviourally: the language reads the pair as one code point again');
  assert.equal(refusalOf(instance(), '\uD800').message, controlValue.message,
    'the restore is proved behaviourally: a lone surrogate is refused with the declared bytes again');
});

// ── THE TWO CELLS THE GATE-11 SEVENTH AUDIT MINTED — `F7-1`'s LAW AND `F7-2`'s COST UNIT ─────────────────
// (`test-cases.md`'s clause of 2026-10-24 — the GATE-11 SEVENTH AUDIT PASS, items `(1)`–`(6)` — adds `JC-TC-62`
// at the END of `§3`'s table and `JC-TC-63` at the END of `§4`'s; `contract.md §2.1`'s clause of the same date on
// `F7-1`, `F7-2` and `F7-3` declares both laws at its items `(1b)`, `(1c)`, `(2a)`–`(2c)`, `(4a)`–`(4e)` and
// `(6a)`–`(6c)`, and `implementation-plan.md §2` step `4`'s clause of the same date owes their bytes at the five
// sweep arms `(xiii)`–`(xvii)`. **THE RED FIRST AND THE BYTE SECOND. BOTH CELLS BELOW ARE RED AT THE SHIPPED
// TREE AND BOTH ASSERT THE CONTRACT'S ANSWER AND NEVER TODAY'S.**)
//
// **THE DRIVING DISCIPLINES THESE CELLS TAKE ARE THE SECTION ABOVE'S OWN AND ARE CITED, NOT RESTATED**
// (`:1680`–`:1693`): a drive whose cost is unbounded at the shipped tree runs where a clock can stop it, every
// counter is PROVED LIVE before a `0` is asserted against it, and every mutated intrinsic is restored in a
// `finally` with the restore proved — structurally AND behaviourally. **ONE DISCIPLINE IS THIS SECTION'S OWN
// AND IS STATED HERE ONCE, because `JC-TC-63` has fourteen members and one `finally`:** every counter is ARMED
// AFTER the cell's fixtures are built (so the fixture's own construction can never be mistaken for the
// crossing's read), its DRIVE WINDOW is opened per drive so one drive's takes are never folded into another's,
// and its figure is CAPTURED INSIDE the mutation frame and asserted only AFTER the restore — so no assertion
// ever runs while an intrinsic is mutated. **⟶ AND THE FIGURE IS THE NARROWED ONE** (`contract.md §2.1`'s clause
// of `2026-10-24` on `F8-8`, items `(2a)` and `(2d)`, and this file's own section on the narrowed counter below):
// every take is still COUNTED — nothing was deleted from the instrumentation — and each is PARTITIONED by its
// immediate invoker's file and symbol, so `0` is asserted against the CROSSING'S OWN GOVERNED SITES alone, the
// kernel's row `66` and the crossing's `ROUTED` rows (rows `49`–`53` and `65`) are excluded and RECORDED, and a
// take the reading cannot attribute FAILS the cell instead of widening the routed set quietly.
//
// **AND ONE FAMILY OF MEMBER IS BARRED FROM `JC-TC-63`'s TABLE, NAMED HERE SO ITS ABSENCE IS A RULE AND NOT AN
// OVERSIGHT:** the PARKED OVERRIDE FAMILY — an overridden `toString`, `valueOf` or (at an array's own
// `toString`) `join` ON A PROTOTYPE JUDGED LANGUAGE-STANDARD BY SHAPE — is residue `R1` of `§2.1`'s clause of
// this date; its answer IS the subject at the two conditional arms, so it is declared law and NOT an owed site,
// and `test-cases.md` `JC-TC-63`'s own closing sentence bars it from the battery. Every member below is outside
// that family.

/// The child driver behind `JC-TC-62`'s CENSUS-COST WITNESS. **It reaches the package through the claimed ESM
/// entry** (`acceptance.md §4.1` item 1) for the reason `JC-TC-60`'s driver does: the scratch file stands under
/// this package's own tree, so its bare `provident-storeroom` specifier resolves by the package's own
/// `package.json` to the same entry this file imports. **It is a SEPARATE driver and NOT a state of either
/// driver above** — `JC-TC-57`'s and `JC-TC-60`'s drivers are those cells' own and this pass leaves their bytes
/// alone.
///
/// It builds the clause's OWN witness, at the clause's OWN figures, with NO figure of this cell's added
/// (`contract.md §2.1` on `F7-2`, item `(4b)`): a terminal `Object.create(null)` carrying the standard
/// `Object.prototype` NAME SET bound to the standard members PLUS `100,000` further own data names, one
/// `Object.create` above it, multiplied across `10,000` element positions at row `8`'s depth arm (`127` links).
/// The construction stands OUTSIDE the timed region, so the figure printed is the crossing's cost and not the
/// fixture's. One JSON line is printed: the elapsed milliseconds of the `write` call ALONE, and the refusal's
/// `status` and `message`.
const CENSUS_COST_CHILD_SOURCE = `import { storeCreate } from "${ENTRY_URL}";
const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
// THE CLAUSE'S OWN WITNESS (contract.md §2.1 F7-2, item (4b)), at its own figures: the standard name set on a
// TERMINAL prototype, so isLanguageStandardPrototype answers TRUE by shape and the exemption stops the chain
// walk at that one link — which is what makes the CENSUS READ the only expensive term of the element.
const STANDARD_OBJECT_PROTO_NAMES = [
  'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__',
  '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__',
  'toLocaleString',
];
const proto = Object.create(null);
for (let i = 0; i < STANDARD_OBJECT_PROTO_NAMES.length; i += 1) {
  proto[STANDARD_OBJECT_PROTO_NAMES[i]] = Object.prototype[STANDARD_OBJECT_PROTO_NAMES[i]];
}
for (let i = 0; i < 100000; i += 1) proto['k' + i] = i;
const e = Object.create(proto);
const value = arrayChain(new Array(10000).fill(e), 127);
const started = Date.now();
let thrown = null;
try {
  storeCreate({ journalLength: 8, listeners: [] }).write(['v'], 'mem', value);
} catch (caught) {
  thrown = caught;
}
const elapsedMs = Date.now() - started;
process.stdout.write(JSON.stringify({
  elapsedMs,
  status: thrown === null ? null : thrown.status,
  message: thrown === null ? null : thrown.message,
}) + '\\n');
`;

/// Run `CENSUS_COST_CHILD_SOURCE` and answer `{timedOut, killedAt, answer}` — `timedOut` where the child was
/// still running at `WALL_CLOCK_CEILING_MS + 2000` ms and was KILLED, so a regression REPORTS instead of
/// stalling the suite. The scratch directory is removed in a `finally` whether or not the drive finished.
function boundedCensusCostDrive() {
  const dir = mkdtempSync(join(TEST_DIR, '.jc-tc-62-'));
  const driver = join(dir, 'drive.mjs');
  const killedAt = WALL_CLOCK_CEILING_MS + 2000;
  try {
    writeFileSync(driver, CENSUS_COST_CHILD_SOURCE, 'utf8');
    let out = null;
    let timedOut = false;
    try {
      out = execFileSync(process.execPath, [driver], {
        encoding: 'utf8',
        cwd: dir,
        timeout: killedAt,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (caught) {
      if (caught && (caught.code === 'ETIMEDOUT' || caught.signal === 'SIGTERM')) timedOut = true;
      else throw caught;
    }
    return { timedOut, killedAt, answer: out === null ? null : JSON.parse(out.trim().split('\n').pop()) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('JC-TC-62 the census read is charged one position per read, so the caller no longer sets the price of a sanctioned rendering', { timeout: 180000 }, () => {
  // `test-cases.md` `JC-TC-62`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F7-2`, items
  // `(4a)`–`(4e)`; the owed byte is `implementation-plan.md §2` step `4`'s clause of this date, arm `(xvii)`):
  // **THE RENDER GUARD'S COST UNIT IS ONE POSITION PER READ, AND A READ OF A CALLER-SCALED LIST IS CHARGED ITS
  // OWN LENGTH** — `(iii)` a census read is `1 + the length of the list it returns`, so a `100,000`-name census
  // costs `100,001` — with the budget kept at `NODE_CEILING` (`1,000,000`, no second figure minted) and
  // EXHAUSTION ANSWERING THE ARM'S CLASS SPELLING rather than rendering (item `(4d)`'s declared fail-closed
  // direction). The clause's arithmetic, printed here so the finding is checkable and NOT asserted: each of the
  // `10,000` elements of the witness costs `~100,012` reads and is charged `4` positions — the array's own
  // position, the index read and one link entry per chain reader — so `M × N ≈ 10^9` reads are taken against
  // `~30,000` positions spent and the guard NEVER TRIPS: only `M` is charged, and the price of a SANCTIONED
  // rendering is the caller's to set. **NO CELL MAY ASSERT A READ COUNT, A CENSUS LENGTH OR ANY OTHER
  // INSTRUMENTED FIGURE** (item `(8a)`): this cell asserts THE ANSWER, THE BOUND and THE CONTROL, and nothing
  // else.
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (item `(4b)`'s witness, its own control, and the two
  // declared answers around them):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | THE WITNESS — `proto = Object.create(null)` carrying the standard `Object.prototype` NAME SET bound to the standard members PLUS `100,000` further own data names, `e = Object.create(proto)`, `arrayChain(new Array(10_000).fill(e), 127)` | row `8`'s class spelling `a value over the walk ceiling` at the depth arm's own `127`-segment position, WITH THE STATUS `ValueRefusedAtBoundary`, and THE WHOLE REFUSAL COMPLETING WITHIN A WALL-CLOCK CEILING OF `5` SECONDS — every read charged to the one per-call budget, the census read at `1 + 100,000`, so the budget exhausts within the first ten elements and exhaustion answers the class spelling (items `(4c)` and `(4d)`) |
  // | CONTROL — the same `M` over the same `127`-link shape, `arrayChain(new Array(10_000).fill({}), 127)` | the refused array's own join, BYTE-IDENTICALLY: `10,000` `'[object Object]'` spellings joined by `,` — the guard approves, so the cost unit changes NO subject it does not have to |
  //
  // **THE ONE FIGURE THIS CELL MAY STATE IS THE BUDGET ITSELF**, and it is stated because a passing
  // implementation could otherwise mint a second ceiling and pass: `1,000,000` positions, `NODE_CEILING` (item
  // `(4c)`).
  const ROW_8 = 'a value over the walk ceiling';
  const POSITION_BUDGET = NODE_CEILING;
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const drive = (value) => {
    try {
      instance().write(['v'], 'mem', value);
    } catch (caught) {
      return caught;
    }
    return null;
  };

  // (0) THE BUDGET IS `NODE_CEILING` ITSELF AND NO SECOND FIGURE IS MINTED (item `(4c)`'s closing sentence).
  assert.equal(POSITION_BUDGET, 1_000_000, 'the one per-call budget is the declared 1,000,000 positions (item (4c))');
  assert.equal(POSITION_BUDGET, NODE_CEILING,
    'the figure is `NODE_CEILING` itself (item (4c)): minting a second ceiling would move the boundary this cell pins');

  // (1) THE CONTROL FIRST, because it is the state this law must NOT disturb: the same `M` over a `127`-link
  // chain carrying the standard `Object.prototype` shape. `{}`'s prototype IS this realm's `Object.prototype`,
  // whose terminal link the exemption stops at, so the guard approves and the refused array's own join is the
  // subject — the SAME rendering the witness's elements would produce where the caller had not made their
  // census expensive. Its bytes are asserted against the declared form, not against a figure.
  const WITNESS_M = 10000;
  const controlError = drive(arrayChain(new Array(WITNESS_M).fill({}), 127));
  assert.equal(controlError === null ? null : controlError.status, STATUS,
    'the control array is refused at the depth arm before any store verb');
  assertDeclaredMessage(controlError,
    declaredRefusal(new Array(WITNESS_M).fill('[object Object]').join(','), ROW_8, deepPath),
    'the CONTROL — the same M over a 127-link chain of `{}` elements: the refused array\'s own join, byte for '
    + 'byte, is the rendering the cost unit must leave alone');

  // (2) THE WITNESS — the clause's own, driven in a child that is KILLED at the ceiling rather than allowed to
  // stall the suite. **This is the cell's primary red**: at the shipped tree a census read is charged nothing,
  // so each of the `10,000` elements costs `~100,012` reads against `4` positions and the refusal is minutes
  // away, reporting as an unfinished drive instead of passing.
  const witnessDrive = boundedCensusCostDrive();
  assert.ok(!witnessDrive.timedOut,
    `the CENSUS-COST WITNESS did not answer inside the ${witnessDrive.killedAt} ms cap it was given, so the `
    + 'whole refusal did NOT complete within the declared 5-second ceiling: a census read of a caller-scaled '
    + 'prototype is charged nothing, so the caller sets the price of a SANCTIONED rendering (`M × N ≈ 10^9` '
    + 'reads against `~30,000` positions spent; contract.md §2.1 F7-2, items (4a), (4b) and (4c))');
  assert.equal(witnessDrive.answer.status, STATUS,
    'the witness is a REFUSAL, not an admission: the walk refuses it at the depth arm before any store verb');
  assert.ok(witnessDrive.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the census-cost witness's refusal took ${witnessDrive.answer.elapsedMs} ms; the declared ceiling is `
    + `${WALL_CLOCK_CEILING_MS} ms, and the declared work is at most ${POSITION_BUDGET} positions with one read `
    + 'apiece, a census read being `1 + its list\'s length` (items (4c) and (4d))');
  assertDeclaredMessage(witnessDrive.answer,
    declaredRefusal(ROW_8, ROW_8, deepPath),
    'the CENSUS-COST WITNESS: the budget is spent on the census reads, the guard answers "caller code is '
    + 'reachable", and row 8\'s class spelling is the answer at the depth arm\'s own position');
});

test('JC-TC-63 no verdict, class, status, position, subject byte or crossed member is decided by a mutable prototype', { timeout: 120000 }, (t) => {
  // `test-cases.md` `JC-TC-63`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F7-1`, items
  // `(1b)`, `(1c)`, `(2a)`–`(2c)`, `(8a)` and `(10a)`–`(10f)`; the owed bytes are `implementation-plan.md §2`
  // step `4`'s clause of this date, the five arms `(xiii)`–`(xvii)`): **THE CROSSING DECLARES ONE SYSTEMATIC
  // LAW — no verdict, class, status, position, subject byte or crossed member is decided by any method,
  // iterator, iteration protocol or coercion taken from a mutable prototype** (item `(1b)`'s operative sentence
  // and `(6b)`'s second sentence) — **and this cell is its battery: ONE MEMBER TABLE, each row overriding a
  // built-in against a value whose verdict it could flip, asserting NO VERDICT CHANGES and EVERY COUNTER `0`.**
  // The audits measured the class five times, one site at a time (`F-RA-3`, `F5-4`, `F6-2`, `F-RA-11`,
  // `F-RA-13`); the clause's inventory is `54` rows, `37` of them `OWED`, and the shipped tree still takes the
  // caller's answer at the ones this cell drives — so this cell is RED, and each red below is attributable to
  // an inventory row.
  //
  // **THE MEMBER TABLE, ONE ROW PER PROTOTYPE MEMBER (the spec's `(a)`–`(h)` first, then `(i)`–`(k)` — the
  // three members the supervisor's brief names and the inventory marks `OWED` beside them: rows `26`, `40` and
  // `39`). "RED" is the declared classification of the row at the shipped tree; "CONTROL" is a member the
  // shipped tree already never takes, recorded as a control WITH ITS REASON and never as a red:**
  //
  // | Row | The member overridden | The drive | Its declared answer | Class |
  // | --- | --- | --- | --- | --- |
  // | `(a)` | `Array.prototype[Symbol.iterator]`, a forged generator yielding EXACTLY the standard `Object.prototype` name set | `Object.create(Object.create(null))`; `Object.create(terminalProto)` for a TERMINAL proto carrying one own member and none of the standard set; `const a = [1]; a.foo = 3` | rows `14` and `14` refused as `a class instance or another prototype-carrying non-plain object`; row `17` refused as `an array carrying a non-index own member` — row `17`'s own gate is the `Object.keys` loop, so a forged iterator must decide nothing | RED (`(xiii)`'s census reads, `(xiv)`'s iteration and spreads) |
  // | `(b)` | `Array.prototype.includes`, once `() => true` and once `() => false` | `{a: 1}` and `const c = {}; c.self = c` under BOTH overrides | `{a: 1}` ADMITTED and read back `{a: 1}`; the cycle REFUSED as `a value that contains itself` (row `11`) at `member 'self'` — the ancestor test's answer is the VALUE's under both overrides | RED (`(xiv)`, both `includes` sites) |
  // | `(c)` | `Set.prototype.has` answering `false`, and `Set.prototype.add` as a no-op | `Object.create(Object.create(null))` (row `14`), `{a: 1}` and `[1]` (admitted) | row `14` REFUSED as its class spelling; both lawful values ADMITTED — the reference set is the standard set ∩ this realm's live census, and neither the guard's memo nor `referenceSet` may take its membership from a prototype | RED (`(xiii)`'s reference set and `(xv)`'s memo) |
  // | `(d)` | `Map.prototype.get` answering a recorded "no caller code", and `Map.prototype.set` as a no-op | row `8`'s DEPTH arm over a leaf holding a clean array and an array whose element carries `toString` | the arm's subject UNCHANGED: row `8`'s class spelling `a value over the walk ceiling` at the depth arm's own `127`-segment position — a forged memo hit must not WITHDRAW the guard and run the caller's conversion on a refusal path | RED (`(xv)`'s memo pair) |
  // | `(e)` | a `Symbol.prototype.description` getter answering `'Symbol.iterator'` | a GENUINE array whose prototype is array-name-shaped and carries ONE symbol, so only the symbol-description comparison separates row `13` from admission; `[1]` | the genuine array REFUSED as `a class extending Array` (row `13`); `[1]` ADMITTED | RED (`(xiii)`'s two symbol censuses) |
  // | `(f)` | `Object.prototype.hasOwnProperty` answering `true` | `const h = new Array(2); h[1] = 'y'` (row `16`); `{a: 1}` | the hole array REFUSED as `a sparse array`; `{a: 1}` ADMITTED | CONTROL — the walk reads `Object.hasOwn` and invokes no prototype member here, so the counter is `0` at the shipped tree already (`§13`'s own reading of the hole test) |
  // | `(g)` | `Array.prototype.push` answering `0` without copying | `[1, undefined]` (row `7`); `[1, 2]` and `{a: 1}` ADMITTED — the crossed-member state | row `7` REFUSED as `undefined` at `member 1`; both lawful values ADMITTED AND READ BACK — a no-op `push` must not silence a crossed member — **and the reply's `triggered`/`watched` BYTE-IDENTICAL to the CONTROL's**, with the GOVERNED counter `0` and the kernel's `attempt.log.push` (row `66`) excluded and recorded | RED (`(xv)`'s `members.push`) |
  // | `(h)` | `String.prototype.charCodeAt` answering `0x41` for every index | `'\uD800'` (row `9`); `'\uD83D\uDE00'` | row `9` REFUSED as `a string carrying a lone surrogate`; the lawful pair ADMITTED — RESTATING `JC-TC-61`'s drive and NOT a second obligation | CONTROL — `hasLoneSurrogate` reads `text[i]`, the wrapper's own exotic index, so the counter is `0` at the shipped tree already (`F6-2`'s byte has landed) |
  // | `(i)` | `BigInt.prototype.toString` answering `'OPMARK'` | `10n` (row `26`) | REFUSED as `a bigint` with the subject `10n` — the subject byte must be the VALUE's rendering and never the caller's | RED (`(xv)`, `value.toString()` at row `26`) |
  // | `(j)` | `Array.prototype.map` answering `'OPMARK'` | `write(5, 'mem', {a: 1})` — row `40`'s container spelling `container.map(String).join('.')` | `AddressMalformed` with the store's generated bytes containing `in 'address'` — the container datum is `address` and no caller's `map` may spell it | RED (`(xvi)`, row `40`) |
  // | `(k)` | `Array.prototype.join` answering `'OPMARK'` | the same `write(5, ...)` drive, and a `storeCreate` whose `constraints[]` entry carries a non-string `id` — row `39`'s `<SEGMENT>` spelling `segments.map(...).join('/')` | `AddressMalformed` with `in 'address'`; `ConstraintListInvalid` with the `'a'/0` spelling — two diagnostic spellings, two caller-decided bytes unless the members are gone | RED (`(xvi)`, rows `40` and `39`) |
  //
  // **TWO DISCIPLINES THIS CELL IS HELD TO AND DISCHARGES AT THE BYTES:**
  //   (i) **EVERY COUNTER IS PROVED LIVE BEFORE A `0` IS ASSERTED AGAINST IT.** The override counts EVERY
  //       invocation of the member, and the arm first drives the member DIRECTLY on a twin — the answer the
  //       override gives is asserted, and the counter's figure at that instant is asserted POSITIVE — and only
  //       then is the drive window opened and the crossing's drives run. A counter that never counted would make
  //       every `0` below vacuous, so the liveness figure is the cell's own guard against its own instrument.
  //   (ii) **EVERY MUTATED INTRINSIC IS RESTORED IN A `finally` AND THE RESTORE IS PROVED BOTH STRUCTURALLY
  //       AND BEHAVIOURALLY** — by the descriptor `Object.getOwnPropertyDescriptor` answered BEFORE the frame
  //       and by the language's own answer afterwards. **And every restore, being the cell's own `Array.prototype`
  //       call, is taken OUTSIDE the drive window, so it is counted on no counter at all.**
  //
  // **⟶ AND THE COUNTER'S SCOPE IS RE-DERIVED (`contract.md §2.1`'s clause of `2026-10-24` on `F8-8`, items
  // `(2a)`, `(2b)`, `(2d)`, `(2e)` and `(7a)`; `test-cases.md`'s clause of the same date, item `(2a)`), because
  // FOUR OF THIS UNIT'S CELLS WERE RED FOR THEIR COUNTERS ALONE AFTER ARMS `(xvii)`–`(xix)` LANDED AND THE
  // KERNEL LINE WAS REVERTED AS RULED: the residual takes were ONE OF EACH PER ADMITTED WRITE, made inside
  // `bindings/js/src/constraint-kernel.mjs` — `append`'s `attempt.log.push` (`:383`), `inDomainAddress`'s
  // `for … of` (`:177`), `evaluate`'s (`:1460`) and `releasePending`'s (`:1729`) — and that file is inventory
  // row `66`, `ROUTED` to `U-STOREROOM-CONSTRAINTS` and NOT this unit's licence. So each wrapper still counts
  // every take and NOTHING was deleted from the instrumentation, but the takes are now PARTITIONED BY THEIR
  // IMMEDIATE INVOKER'S FILE AND SYMBOL (item `(2d)`): the crossing's own governed sites' takes are `0`, a
  // `ROUTED` row's are excluded and recorded on the cell's routed counter and are asserted neither present nor
  // absent, and a take this reading cannot attribute FAILS the cell (item `(4c)`). **This is a counter-scope
  // correction by the cell's author role and not a relaxation of the law: the law's operative sentence is
  // unmoved, and the CONJUNCTION of item `(2e)` — the governed `0` AND the crossed datum intact — is what the
  // cell asserts.**
  //
  // **AND THE FACT THIS BATTERY MEASURED AT THE SHIPPED TREE, NOW ANSWERED BY THE SWEEP:** `openCommit`'s
  // observer fan-out and the verbs' own argument-list `push` were the two rows item `(2b)`'s inventory did not
  // list — arms `(xiii)`–`(xvi)` have since swept them, so `(a)`'s three drives answer their declared refusals
  // and `(g)`'s admitted half reads its value back. **The only takes the instruments still see are the kernel's
  // four of row `66`, one of each per admitted write, and they are routed out of this cell's `0` by attribution.**
  const ROW_11 = 'a value that contains itself';
  const ROW_13 = 'a class extending Array';
  const ROW_14 = 'a class instance or another prototype-carrying non-plain object';
  const ROW_16 = 'a sparse array';
  const ROW_17 = 'an array carrying a non-index own member';
  const ROW_7 = 'undefined';
  const ROW_8 = 'a value over the walk ceiling';
  const ROW_9 = 'a string carrying a lone surrogate';
  const ROW_26 = 'a bigint';
  const DEEP_PATH = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  const SELF_PATH = `member 'self' of ${VALUE_POSITION}`;
  // THE STANDARD `Object.prototype` NAME SET — the package's own list is the authority and this cell spells the
  // same twelve names the forged iterator must yield, so the forge is the caller's BEST forgery and not a
  // half-measure.
  const STANDARD_OBJECT_PROTO_NAMES = [
    'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__',
    '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__',
    'toLocaleString',
  ];
  const CONTAINER_MESSAGE = "'the number 5' is not a legal address segment in 'address', segments are strings "
    + 'or non-negative integers, the address position holds the number 5 at the first argument, and an address '
    + 'is an array of segments';
  const SEGMENT_MESSAGE = "'a'/0 is not a valid constraint entry in 'constraints', a constraint entry is an "
    + 'address and an id, and the address is a segment array';

  const descriptorOf = (value) => ({ value, writable: true, enumerable: false, configurable: true });
  const clip = (text) => (typeof text === 'string' && text.length > 120 ? `${text.slice(0, 120)}…` : text);
  // A DECLARED MESSAGE'S DIFFERING PART MAY STAND ANYWHERE IN IT — the subject leads, the container stands in
  // the store's own generated middle, the class and the position close — so a violation prints the WINDOW AT
  // THE FIRST DIFFERING OFFSET rather than a prefix that two long messages always share.
  const delta = (expected, actual) => {
    const declared = typeof expected === 'string' ? expected : String(expected);
    const answered = typeof actual === 'string' ? actual : String(actual);
    if (declared === answered) return 'identical';
    let at = 0;
    while (at < declared.length && at < answered.length && declared[at] === answered[at]) at += 1;
    const from = Math.max(0, at - 40);
    return `from offset ${at}: declared ${JSON.stringify(declared.slice(from, at + 80))} vs answered `
      + `${JSON.stringify(answered.slice(from, at + 80))}`;
  };

  // ── THE CAPTURES ──────────────────────────────────────────────────────────────────────────────────────
  // A capture is taken INSIDE the mutation frame with NO assertion in scope: `captureWrite` drives one `write`
  // and, where it is admitted, the `read` back; `captureConstruction` drives one `storeCreate`. Both answer a
  // plain record. **NO `Array.prototype` MEMBER IS USED IN EITHER, IN THE FRAME OR THE RUNNER** — a counter that
  // was incremented by the instrument itself would prove nothing, and a `push` under a no-op `push` override
  // would corrupt the capture list.
  const captureWrite = (inst, value, address) => {
    const where = address === undefined ? ['v'] : address;
    let answered;
    try {
      answered = inst.write(where, 'mem', value);
    } catch (caught) {
      return {
        admitted: false,
        hostError: caught instanceof Error,
        status: caught === null || caught === undefined ? undefined : caught.status,
        message: caught === null || caught === undefined ? undefined : caught.message,
      };
    }
    try {
      const read = inst.read(where, 'mem');
      // **THE RECORD'S `triggered` AND `watched` ARE CAPTURED INSIDE THE FRAME AND COMPARED, BYTE-IDENTICALLY,
      // WITH THE CONTROL'S, OUTSIDE IT** — the crossed-member conjunct of `contract.md §2.1` F8-8, item `(2e)`:
      // a `0` with an emptied record is a FAILED cell. The two members are held as REFERENCES here and spelled
      // by `JSON.stringify` after the restore, so no member of a mutable prototype is taken by the capture.
      let record = null;
      if (answered !== null && typeof answered === 'object') {
        record = { watched: answered.watched, triggered: answered.triggered };
      }
      return { admitted: true, read, record };
    } catch (caught) {
      return { admitted: true, read: { readFailed: clip(String(caught)) }, record: null };
    }
  };
  const captureConstruction = (thunk) => {
    try {
      thunk();
    } catch (caught) {
      return {
        admitted: false,
        hostError: caught instanceof Error,
        status: caught === null || caught === undefined ? undefined : caught.status,
        message: caught === null || caught === undefined ? undefined : caught.message,
      };
    }
    return { admitted: true, read: 'constructed' };
  };
  /// The record's `triggered` and `watched` AS BYTES — spelled AFTER the restore, so the capture takes no member
  /// of a mutable prototype and the comparison is the control's bytes against the armed state's
  /// (`contract.md §2.1` F8-8, item `(2e)`). A refused drive carries no record and answers `null` on both sides.
  const recordBytes = (capture) => (capture !== null && capture.admitted === true && capture.record !== null
    ? JSON.stringify(capture.record)
    : null);

  // ── THE DECLARED ANSWERS ─────────────────────────────────────────────────────────────────────────────
  const refusal = (status, message) => ({ kind: 'refuse', status, message });
  const refusedAt = (subject, cls, position) => refusal(STATUS, declaredRefusal(subject, cls, position));
  const refusedClass = (cls) => refusedAt(cls, cls, VALUE_POSITION);
  const admitted = (read) => ({ kind: 'admit', read });

  // ── THE FIXTURES ─────────────────────────────────────────────────────────────────────────────────────
  // Fixtures that are VALUES are shared by the cell and are built once, OUTSIDE every frame: a value is built
  // before any counter is armed, so a read the FIXTURE makes can never be counted against the crossing.
  const terminalProto = Object.create(null);
  terminalProto.only = 1;
  const arrayWithOwnMember = [1];
  arrayWithOwnMember.foo = 3;
  const cyclicValue = {};
  cyclicValue.self = cyclicValue;
  const holeArray = new Array(2);
  holeArray[1] = 'y';
  const undefinedTail = [1, undefined];
  const loneSurrogate = '\uD800';
  const lawfulPair = '\uD83D\uDE00';
  // (e)'s victim: a GENUINE array (`Array.isArray` answers `true`) whose prototype carries the standard
  // `Array.prototype` NAME set above an `Object.prototype`-SHAPED terminal link but only ONE symbol description
  // (`Symbol.iterator`). Without the description getter, `Symbol.unscopables` is MISSING from the value's
  // symbol census and the value is a `class extending Array` (row `13`); a getter answering `'Symbol.iterator'`
  // for every symbol makes the missing name invisible and the value crosses.
  const arrayOnShapeStandardPrototype = () => {
    const objectShaped = Object.create(null);
    for (let i = 0; i < STANDARD_OBJECT_PROTO_NAMES.length; i += 1) {
      objectShaped[STANDARD_OBJECT_PROTO_NAMES[i]] = Object.prototype[STANDARD_OBJECT_PROTO_NAMES[i]];
    }
    const shaped = Object.create(objectShaped);
    const arrayNames = Object.getOwnPropertyNames(Array.prototype);
    for (let i = 0; i < arrayNames.length; i += 1) shaped[arrayNames[i]] = Array.prototype[arrayNames[i]];
    shaped[Symbol.iterator] = Array.prototype[Symbol.iterator];
    const victim = [1];
    Object.setPrototypeOf(victim, shaped);
    return victim;
  };
  // (d)'s value: row `8`'s DEPTH arm over a leaf that holds a CLEAN array and an array whose element carries a
  // conversion member. The clean array is what makes the guard RECORD a memo entry (and so what makes
  // `Map.prototype.set` reachable); the culprit array is what makes the declared subject the class spelling.
  const depthArmValue = () => {
    const clean = [{ n: 1 }];
    const culprit = [{ toString() { return 'OPMARK'; } }];
    let value = [clean, culprit];
    for (let i = 0; i < 127; i += 1) value = [value];
    return value;
  };

  // ── THE MEMBER TABLE ─────────────────────────────────────────────────────────────────────────────────
  // Each entry is ONE member (or ONE pair of members of the same prototype, driven in ONE arm apiece) with its
  // own `install`, its own counter, its own liveness probe and its own drives. `build` is called BEFORE the
  // frame is entered, so every fixture — the store instances included — exists before a counter is armed.
  const TABLE = [
    {
      id: '(a)',
      label: 'Array.prototype[Symbol.iterator]',
      build: () => ({
        i1: instance(),
        i2: instance(),
        i3: instance(),
        v1: Object.create(Object.create(null)),
        v2: Object.create(terminalProto),
        v3: arrayWithOwnMember,
      }),
      arms: [{
        name: 'forged iterator yielding the standard Object.prototype names',
        install: (counter) => ({
          target: Array.prototype,
          key: Symbol.iterator,
          descriptor: descriptorOf(function* forgedIterator() {
            let at = 0;
            while (at < STANDARD_OBJECT_PROTO_NAMES.length) {
              counter.take();
              yield STANDARD_OBJECT_PROTO_NAMES[at];
              at += 1;
            }
          }),
        }),
        live: 'constructor',
        liveness: () => {
          const walk = ['x'][Symbol.iterator]();
          return walk.next().value;
        },
        drives: [
          { label: 'Object.create(Object.create(null))', run: (f) => captureWrite(f.i1, f.v1), expect: refusedClass(ROW_14) },
          { label: 'Object.create(terminal proto)', run: (f) => captureWrite(f.i2, f.v2), expect: refusedClass(ROW_14) },
          { label: 'a = [1]; a.foo = 3', run: (f) => captureWrite(f.i3, f.v3), expect: refusedClass(ROW_17) },
        ],
      }],
    },
    {
      id: '(b)',
      label: 'Array.prototype.includes',
      build: () => ({
        i1: instance(),
        i2: instance(),
        i3: instance(),
        i4: instance(),
        v1: { a: 1 },
        v2: cyclicValue,
      }),
      arms: [
        {
          name: 'includes answering true',
          install: (counter) => ({
            target: Array.prototype,
            key: 'includes',
            descriptor: descriptorOf(function includesTrue() {
              counter.take();
              return true;
            }),
          }),
          live: true,
          liveness: () => [7].includes(7),
          drives: [
            { label: '{a: 1} under includes->true', run: (f) => captureWrite(f.i1, f.v1), expect: admitted({ a: 1 }) },
            { label: 'the cycle under includes->true', run: (f) => captureWrite(f.i2, f.v2), expect: refusedAt(ROW_11, ROW_11, SELF_PATH) },
          ],
        },
        {
          name: 'includes answering false',
          install: (counter) => ({
            target: Array.prototype,
            key: 'includes',
            descriptor: descriptorOf(function includesFalse() {
              counter.take();
              return false;
            }),
          }),
          live: false,
          liveness: () => [7].includes(7),
          drives: [
            { label: 'the cycle under includes->false', run: (f) => captureWrite(f.i3, f.v2), expect: refusedAt(ROW_11, ROW_11, SELF_PATH) },
            { label: '{a: 1} under includes->false', run: (f) => captureWrite(f.i4, f.v1), expect: admitted({ a: 1 }) },
          ],
        },
      ],
    },
    {
      id: '(c)',
      label: 'Set.prototype.has / Set.prototype.add',
      build: () => ({
        i1: instance(),
        i2: instance(),
        i3: instance(),
        i4: instance(),
        i5: instance(),
        i6: instance(),
        v1: Object.create(Object.create(null)),
        v2: { a: 1 },
        v3: [1],
      }),
      arms: [
        {
          name: 'Set.prototype.has answering false',
          install: (counter) => ({
            target: Set.prototype,
            key: 'has',
            descriptor: descriptorOf(function hasFalse() {
              counter.take();
              return false;
            }),
          }),
          live: false,
          liveness: () => new Set([1]).has(1),
          drives: [
            { label: 'Object.create(Object.create(null)) under has->false', run: (f) => captureWrite(f.i1, f.v1), expect: refusedClass(ROW_14) },
            { label: '{a: 1} under has->false', run: (f) => captureWrite(f.i2, f.v2), expect: admitted({ a: 1 }) },
            { label: '[1] under has->false', run: (f) => captureWrite(f.i3, f.v3), expect: admitted([1]) },
          ],
        },
        {
          name: 'Set.prototype.add as a no-op',
          install: (counter) => ({
            target: Set.prototype,
            key: 'add',
            descriptor: descriptorOf(function addNoop() {
              counter.take();
              return this;
            }),
          }),
          live: 0,
          liveness: () => {
            const set = new Set();
            set.add(1);
            return set.size;
          },
          drives: [
            { label: 'Object.create(Object.create(null)) under add->no-op', run: (f) => captureWrite(f.i4, f.v1), expect: refusedClass(ROW_14) },
            { label: '{a: 1} under add->no-op', run: (f) => captureWrite(f.i5, f.v2), expect: admitted({ a: 1 }) },
            { label: '[1] under add->no-op', run: (f) => captureWrite(f.i6, f.v3), expect: admitted([1]) },
          ],
        },
      ],
    },
    {
      id: '(d)',
      label: 'Map.prototype.get / Map.prototype.set',
      build: () => ({
        i1: instance(),
        i2: instance(),
        v1: depthArmValue(),
        v2: depthArmValue(),
      }),
      arms: [
        {
          name: 'Map.prototype.get answering a recorded "no caller code"',
          install: (counter) => ({
            target: Map.prototype,
            key: 'get',
            descriptor: descriptorOf(function getRecorded() {
              counter.take();
              return { answer: false, positions: 0 };
            }),
          }),
          live: true,
          liveness: () => {
            const found = new Map([[1, 2]]).get(1);
            return found !== null && typeof found === 'object' ? found.answer === false : 'not the forged answer';
          },
          drives: [
            { label: 'the depth arm under get->recorded', run: (f) => captureWrite(f.i1, f.v1), expect: refusedAt(ROW_8, ROW_8, DEEP_PATH) },
          ],
        },
        {
          name: 'Map.prototype.set as a no-op',
          install: (counter) => ({
            target: Map.prototype,
            key: 'set',
            descriptor: descriptorOf(function setNoop() {
              counter.take();
              return this;
            }),
          }),
          live: 0,
          liveness: () => {
            const map = new Map();
            map.set(1, 2);
            return map.size;
          },
          drives: [
            { label: 'the depth arm under set->no-op', run: (f) => captureWrite(f.i2, f.v2), expect: refusedAt(ROW_8, ROW_8, DEEP_PATH) },
          ],
        },
      ],
    },
    {
      id: '(e)',
      label: 'Symbol.prototype.description',
      build: () => ({
        i1: instance(),
        i2: instance(),
        v1: arrayOnShapeStandardPrototype(),
        v2: [1],
      }),
      arms: [{
        name: 'a description getter answering Symbol.iterator',
        install: (counter) => ({
          target: Symbol.prototype,
          key: 'description',
          descriptor: {
            get() {
              counter.take();
              return 'Symbol.iterator';
            },
            enumerable: false,
            configurable: true,
          },
        }),
        live: 'Symbol.iterator',
        liveness: () => Symbol('x').description,
        drives: [
          { label: 'a genuine array on a one-symbol array-shaped prototype', run: (f) => captureWrite(f.i1, f.v1), expect: refusedClass(ROW_13) },
          { label: '[1] under the description getter', run: (f) => captureWrite(f.i2, f.v2), expect: admitted([1]) },
        ],
      }],
    },
    {
      id: '(f)',
      label: 'Object.prototype.hasOwnProperty',
      declared: 'CONTROL',
      build: () => ({ i1: instance(), i2: instance(), v1: holeArray, v2: { a: 1 } }),
      arms: [{
        name: 'hasOwnProperty answering true',
        install: (counter) => ({
          target: Object.prototype,
          key: 'hasOwnProperty',
          descriptor: descriptorOf(function ownTrue() {
            counter.take();
            return true;
          }),
        }),
        live: true,
        liveness: () => ({ a: 1 }).hasOwnProperty('b'),
        drives: [
          { label: 'a hole array under hasOwnProperty->true', run: (f) => captureWrite(f.i1, f.v1), expect: refusedClass(ROW_16) },
          { label: '{a: 1} under hasOwnProperty->true', run: (f) => captureWrite(f.i2, f.v2), expect: admitted({ a: 1 }) },
        ],
      }],
    },
    {
      id: '(g)',
      label: 'Array.prototype.push',
      build: () => ({
        i1: instance(),
        i2: instance(),
        i3: instance(),
        v1: undefinedTail,
        v2: [1, 2],
        v3: { a: 1 },
      }),
      arms: [{
        name: 'push answering 0 without copying',
        install: (counter) => ({
          target: Array.prototype,
          key: 'push',
          descriptor: descriptorOf(function pushZero() {
            counter.take();
            return 0;
          }),
        }),
        live: 0,
        liveness: () => {
          const array = [];
          array.push(1);
          return array.length;
        },
        drives: [
          { label: '[1, undefined] under push->0', run: (f) => captureWrite(f.i1, f.v1), expect: refusedAt(ROW_7, ROW_7, `member 1 of ${VALUE_POSITION}`) },
          { label: '[1, 2] under push->0', run: (f) => captureWrite(f.i2, f.v2), expect: admitted([1, 2]) },
          { label: '{a: 1} under push->0', run: (f) => captureWrite(f.i3, f.v3), expect: admitted({ a: 1 }) },
        ],
      }],
    },
    {
      id: '(h)',
      label: 'String.prototype.charCodeAt',
      declared: 'CONTROL',
      build: () => ({ i1: instance(), i2: instance(), v1: loneSurrogate, v2: lawfulPair }),
      arms: [{
        name: 'charCodeAt answering 0x41 for every index',
        install: (counter) => ({
          target: String.prototype,
          key: 'charCodeAt',
          descriptor: descriptorOf(function charCodeAtA() {
            counter.take();
            return 0x41;
          }),
        }),
        live: 0x41,
        liveness: () => 'AB'.charCodeAt(1),
        drives: [
          { label: "row 9's drive, '\\uD800'", run: (f) => captureWrite(f.i1, f.v1), expect: refusedClass(ROW_9) },
          { label: "the lawful pair '\\uD83D\\uDE00'", run: (f) => captureWrite(f.i2, f.v2), expect: admitted(lawfulPair) },
        ],
      }],
    },
    {
      id: '(i)',
      label: 'BigInt.prototype.toString',
      build: () => ({ i1: instance() }),
      arms: [{
        name: 'BigInt.prototype.toString answering OPMARK',
        install: (counter) => ({
          target: BigInt.prototype,
          key: 'toString',
          descriptor: descriptorOf(function bigintMarker() {
            counter.take();
            return 'OPMARK';
          }),
        }),
        live: 'OPMARK',
        liveness: () => (255n).toString(),
        drives: [
          { label: '10n under BigInt.prototype.toString', run: (f) => captureWrite(f.i1, 10n), expect: refusedAt('10n', ROW_26, VALUE_POSITION) },
        ],
      }],
    },
    {
      id: '(j)',
      label: 'Array.prototype.map',
      build: () => ({ i1: instance() }),
      arms: [{
        name: 'map answering OPMARK',
        install: (counter) => ({
          target: Array.prototype,
          key: 'map',
          descriptor: descriptorOf(function mapMarker() {
            counter.take();
            return 'OPMARK';
          }),
        }),
        live: 'OPMARK',
        liveness: () => [1, 2].map((value) => value),
        drives: [
          {
            label: "row 40's container spelling at write(5, 'mem', {a: 1})",
            run: (f) => captureWrite(f.i1, { a: 1 }, 5),
            expect: refusal('AddressMalformed', CONTAINER_MESSAGE),
          },
        ],
      }],
    },
    {
      id: '(k)',
      label: 'Array.prototype.join',
      build: () => ({ i1: instance() }),
      arms: [{
        name: 'join answering OPMARK',
        install: (counter) => ({
          target: Array.prototype,
          key: 'join',
          descriptor: descriptorOf(function joinMarker() {
            counter.take();
            return 'OPMARK';
          }),
        }),
        live: 'OPMARK',
        liveness: () => [1, 2].join('-'),
        drives: [
          {
            label: "row 40's container spelling at write(5, 'mem', {a: 1})",
            run: (f) => captureWrite(f.i1, { a: 1 }, 5),
            expect: refusal('AddressMalformed', CONTAINER_MESSAGE),
          },
          {
            label: "row 39's <SEGMENT> spelling at a constraints[] entry",
            run: () => captureConstruction(() => storeCreate({
              journalLength: 8,
              listeners: [],
              constraints: [{ address: ['a', 0], id: 5 }],
            })),
            expect: refusal('ConstraintListInvalid', SEGMENT_MESSAGE),
          },
        ],
      }],
    },
  ];

  // ── THE RUNNER ───────────────────────────────────────────────────────────────────────────────────────
  // One arm, one frame: install the override (or nothing, for the unmutated control), prove the instrument
  // LIVE, take one capture per drive with a CENSUS apiece, and restore in the `finally`. **NO ASSERTION RUNS
  // INSIDE THE FRAME** — the captures are asserted after the restore, so a failure never leaves an intrinsic
  // mutated, and no `assert` helper of this file can itself be reached through a mutated member.
  //
  // **⟶ THE COUNTER IS THE NARROWED ONE (`contract.md §2.1`'s clause of `2026-10-24` on `F8-8`, items `(2a)`,
  // `(2d)` and `(2e)`; `test-cases.md`'s clause of the same date, item `(2a)`): each wrapper still counts EVERY
  // take — nothing was deleted from the instrumentation — and every take is PARTITIONED BY ATTRIBUTION, so the
  // battery's `0` is a claim about the crossing's OWN GOVERNED SITES and says nothing about the rest of the call.
  // A take attributed to the kernel's file (row `66`) or to a `ROUTED` row of the crossing's file (rows `49`–`53`
  // and `65`) is EXCLUDED and RECORDED on the cell's routed counter and is never asserted present or absent; a
  // take at a GOVERNED site is COUNTED and fails the cell; and a take the read cannot attribute is reported and
  // fails the cell too (item `(2d)(iv)`).**
  const runArm = (arm, fixtures, armed) => {
    const instrument = crossingCounterInstrument();
    const saved = [];
    const captures = [];
    let live = null;
    let liveReads = 0;
    try {
      if (armed) {
        const resolved = arm.install(instrument);
        saved[saved.length] = [resolved.target, resolved.key,
          Object.getOwnPropertyDescriptor(resolved.target, resolved.key)];
        Object.defineProperty(resolved.target, resolved.key, resolved.descriptor);
        live = arm.liveness();
        liveReads = instrument.liveTakes;
      }
      for (let d = 0; d < arm.drives.length; d += 1) {
        if (armed) instrument.beginDrive(d);
        const capture = arm.drives[d].run(fixtures);
        capture.census = armed ? instrument.endDrive() : null;
        captures[captures.length] = capture;
      }
    } finally {
      for (let i = saved.length - 1; i >= 0; i -= 1) {
        const target = saved[i][0];
        const key = saved[i][1];
        const prior = saved[i][2];
        if (prior === undefined) delete target[key];
        else Object.defineProperty(target, key, prior);
      }
    }
    return { live, liveReads, instrument, captures };
  };

  // ── THE RESTORE PROOF'S OWN FIXTURES, TAKEN BEFORE ANY FRAME ────────────────────────────────────────
  const INTRINSICS = [
    [Array.prototype, Symbol.iterator], [Array.prototype, 'includes'], [Array.prototype, 'push'],
    [Array.prototype, 'map'], [Array.prototype, 'join'], [Set.prototype, 'has'], [Set.prototype, 'add'],
    [Map.prototype, 'get'], [Map.prototype, 'set'], [Symbol.prototype, 'description'],
    [Object.prototype, 'hasOwnProperty'], [String.prototype, 'charCodeAt'], [BigInt.prototype, 'toString'],
  ];
  const intrinsicDescriptors = [];
  for (let i = 0; i < INTRINSICS.length; i += 1) {
    intrinsicDescriptors[intrinsicDescriptors.length] = Object.getOwnPropertyDescriptor(INTRINSICS[i][0], INTRINSICS[i][1]);
  }

  // ── THE DRIVES, AND THE VIOLATIONS THEY COLLECT ─────────────────────────────────────────────────────
  const violations = [];
  const note = (message) => violations[violations.length] = message;
  // **THE PER-DRIVE CENSUS RECORDS, REPORTED AND NEVER ASSERTED** (item `(2d)`): every drive whose instrument
  // saw a ROUTED take prints one line naming the file, the line and the symbol, so the exclusion is auditable
  // instead of asserted by its own absence.
  const counterRecords = [];
  for (let m = 0; m < TABLE.length; m += 1) {
    const member = TABLE[m];
    for (let a = 0; a < member.arms.length; a += 1) {
      const arm = member.arms[a];
      const where = `${member.id} ${member.label} / ${arm.name}`;
      // THE FIXTURES ARE BUILT BEFORE THE COUNTER IS ARMED. `member.build()` is evaluated as the argument, so it
      // runs before `runArm` installs anything — the section's own discipline (`:1680`–`:1693`), discharged by
      // call order and by nothing else: a read the FIXTURE makes can never be counted against the crossing.
      const control = runArm(arm, member.build(), false);
      const mutated = runArm(arm, member.build(), true);
      if (mutated.live !== arm.live) {
        note(`${where}: the override was NOT live before the counter was armed — its own answer was `
          + `${JSON.stringify(clip(mutated.live))}, and this arm's instrument must answer ${JSON.stringify(arm.live)}`);
      }
      if (mutated.liveReads < 1) {
        note(`${where}: the counter did not count the override's OWN invocation (${mutated.liveReads}), so every `
          + '`0` below would be vacuous — the instrument is not live');
      }
      // **THE DELIBERATE PROBE, ARM BY ARM** (`contract.md §2.1` F8-8, item `(2d)`): a forged stack naming a
      // GOVERNED site of the crossing's own file classifies GOVERNED and FAILS the cell; the kernel's file and a
      // crossing-file `ROUTED` row classify routed and answer no violation; the liveness take's REAL stack is read
      // and read as unattributable. Nothing is mutated and nothing is reverted by the probe. **A battery whose
      // `0` cannot fail on a governed take would be no witness at all, so this arm's `0` is measured against a
      // classifier this run has just proved answers.**
      crossingProveCounterAttribution(where, mutated.instrument);
      for (let d = 0; d < arm.drives.length; d += 1) {
        const drive = arm.drives[d];
        const want = drive.expect;
        const at = `${where} / ${drive.label}`;
        const seen = mutated.captures[d];
        const base = control.captures[d];
        if (want.kind === 'refuse') {
          if (base.admitted !== false || base.status !== want.status || base.message !== want.message) {
            note(`${at}: the UNMUTATED control does not answer the declared bytes (${delta(want.message, base.message)}), `
              + 'so this drive cannot witness the member');
          }
          if (seen.admitted !== false) {
            note(`${at}: the contract declares a REFUSAL and the override ADMITTED the value `
              + `(${JSON.stringify(clip(seen.read))})`);
          } else if (seen.hostError !== false) {
            note(`${at}: a RAW HOST ERROR escaped the crossing (${JSON.stringify(clip(seen.message))}) — a mutable `
              + 'prototype decided the outcome through a host error, and §2.5 item 5 (e) allows no second form');
          } else if (seen.status !== want.status) {
            note(`${at}: the status moved to ${JSON.stringify(seen.status)}; the declared status is `
              + `${JSON.stringify(want.status)}`);
          } else if (seen.message !== want.message) {
            note(`${at}: the refusal is not the declared bytes — ${delta(want.message, seen.message)}`);
          }
        } else {
          if (base.admitted !== true || JSON.stringify(base.read) !== JSON.stringify(want.read)) {
            note(`${at}: the UNMUTATED control was not admitted as the declared value `
              + `(${JSON.stringify(clip(base.read))}), so this drive cannot witness the member`);
          }
          if (seen.admitted !== true) {
            note(`${at}: the contract declares an ADMISSION and the override refused it `
              + `(${JSON.stringify(clip(seen.message))}, status ${JSON.stringify(seen.status)})`);
          } else if (JSON.stringify(seen.read) !== JSON.stringify(want.read)) {
            note(`${at}: the crossed member moved — expected ${JSON.stringify(clip(want.read))}, read back `
              + `${JSON.stringify(clip(seen.read))}`);
          }
          // **THE RECORD'S `triggered` AND `watched`, BYTE-IDENTICAL TO THE CONTROL'S** — item `(2e)`'s second
          // conjunct: a `0` over an emptied record is a FAILED cell, and this is where the crossed datum is held
          // to the control's bytes.
          if (recordBytes(seen) !== recordBytes(base)) {
            note(`${at}: the RECORD's triggered/watched are not the control's — `
              + `${String(recordBytes(seen)).slice(0, 200)} against ${String(recordBytes(base)).slice(0, 200)}`);
          }
        }
        // **THE NARROWED COUNTER** (`contract.md §2.1` F8-8, items `(2a)`, `(2d)`, `(2e)` and `(7a)`): the
        // battery's `0` is the GOVERNED sites' `0`. The kernel's takes (row `66`, one each per admitted write) and
        // any take at a `ROUTED` row's symbol are EXCLUDED and RECORDED; nothing here asserts them present or
        // absent. An UNATTRIBUTED take fails the cell, because a widening of the routed set must be visible.
        const counterViolations = crossingCounterViolations(at, seen.census);
        for (let v = 0; v < counterViolations.length; v += 1) {
          note(counterViolations[v]);
        }
        if (seen.census !== null && (seen.census.routedKernel !== 0 || seen.census.routedRow !== 0
          || seen.census.unattributed !== 0)) {
          counterRecords[counterRecords.length] = `${at} — ${crossingCensusRecord(seen.census)}`;
        }
      }
    }
  }

  // ── THE RESTORE, PROVED STRUCTURALLY AND BEHAVIOURALLY, BEFORE ANY RED IS REPORTED ──────────────────
  for (let i = 0; i < INTRINSICS.length; i += 1) {
    const target = INTRINSICS[i][0];
    const key = INTRINSICS[i][1];
    assert.equal(Object.getOwnPropertyDescriptor(target, key).value,
      intrinsicDescriptors[i].value === undefined ? undefined : intrinsicDescriptors[i].value,
      `the cell leaves ${String(key)} on its prototype as the language's own: its identity is the descriptor's`);
    assert.deepEqual(Object.getOwnPropertyDescriptor(target, key), intrinsicDescriptors[i],
      `the cell leaves ${String(key)} on its prototype as the language's own: its whole descriptor is back`);
  }
  assert.deepEqual([...([1, 2])], [1, 2], 'the restore is proved behaviourally: array iteration is the language\'s own again');
  assert.equal([1, 2].includes(2), true, 'the restore is proved behaviourally: includes is the intrinsic again');
  assert.deepEqual([1, 2].map((value) => value * 2), [2, 4], 'the restore is proved behaviourally: map is the intrinsic again');
  assert.equal([1, 2].join('-'), '1-2', 'the restore is proved behaviourally: join is the intrinsic again');
  const pushed = [];
  pushed.push(3);
  assert.deepEqual(pushed, [3], 'the restore is proved behaviourally: push copies again');
  assert.equal(new Set([1]).has(1), true, 'the restore is proved behaviourally: Set.prototype.has is the intrinsic again');
  const setAdded = new Set();
  setAdded.add(1);
  assert.equal(setAdded.size, 1, 'the restore is proved behaviourally: Set.prototype.add stores again');
  assert.equal(new Map([[1, 2]]).get(1), 2, 'the restore is proved behaviourally: Map.prototype.get is the intrinsic again');
  const mapSet = new Map();
  mapSet.set(1, 2);
  assert.equal(mapSet.size, 1, 'the restore is proved behaviourally: Map.prototype.set stores again');
  assert.equal(Symbol('x').description, 'x',
    'the restore is proved behaviourally: Symbol.prototype.description is the intrinsic accessor again');
  assert.equal({ a: 1 }.hasOwnProperty('b'), false,
    'the restore is proved behaviourally: Object.prototype.hasOwnProperty is the intrinsic again');
  assert.equal('AB'.charCodeAt(1), 0x42, 'the restore is proved behaviourally: charCodeAt is the intrinsic again');
  assert.equal((255n).toString(), '255', 'the restore is proved behaviourally: BigInt.prototype.toString is the intrinsic again');

  // ── AND THE LAW, REPORTED AS ONE CENSUS OF ITS OWN VIOLATIONS ───────────────────────────────────────
  // The red is stated member by member, drive by drive, so one failure names EVERY site the sweep owes instead
  // of hiding the rest behind the first — the same discipline `JC-TC-61` takes where one mutation makes two
  // rows unreachable.
  //
  // **AND THE ROUTED TAKES ARE PRINTED, NEVER ASSERTED** (`contract.md §2.1` F8-8, items `(2d)` and `(3d)`): the
  // lines below name the file, the line and the symbol of each excluded take, so a reader can audit the
  // partition — and so it is visible that every excluded take is the KERNEL'S row `66` (one per admitted write)
  // and none is the crossing's own.
  t.diagnostic(`JC-TC-63 narrowed counter — ${counterRecords.length} drive(s) saw a routed or unattributed take`);
  for (let r = 0; r < counterRecords.length; r += 1) t.diagnostic(`JC-TC-63 routed — ${counterRecords[r]}`);
  assert.equal(violations.length, 0,
    `${violations.length} of this law's states are decided through a mutable prototype (contract.md §2.1 F7-1, `
    + 'items (1b), (1c), (2b), (8a) and (10)), member by member:\n  ' + violations.join('\n  '));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE FOUR CELLS THE GATE-11 EIGHTH AUDIT DECLARED — `F8-1`, `F8-2` AND `F8-3`
// (`test-cases.md`'s clause of 2026-10-24 — the GATE-11 EIGHTH AUDIT PASS, items `(8a)`, `(8b)` and `(9)` —
// adds `JC-TC-64` and `JC-TC-65` at the END of `§4`'s table and `JC-TC-66` and `JC-TC-67` at the END of `§3`'s;
// `contract.md §2.1`'s clause of the same date declares the laws at items `(1a)`–`(1d)` on `F8-1`, `(2a)`–`(2d)`
// on `F8-2` and `(3a)`–`(3d)` on `F8-3`; `implementation-plan.md §2` step `4`'s clause of the same date owes
// their bytes at arms `(xvii)`, `(xviii)` and `(xix)`. **THE RED FIRST AND THE BYTE SECOND. ALL FOUR CELLS BELOW
// ARE RED AT THE SHIPPED TREE AND ALL FOUR ASSERT THE CONTRACT'S ANSWER AND NEVER TODAY'S.**)
//
// **THE DRIVING DISCIPLINES ARE THE TWO SECTIONS ABOVE'S OWN AND ARE CITED, NOT RESTATED** (`:1680`–`:1693` and
// `:2781`–`:2791`): a drive whose cost is unbounded at the shipped tree runs where a clock can stop it and is
// KILLED rather than stalling; every counter is PROVED LIVE before a `0` is asserted against it; every mutated
// intrinsic is restored in a `finally` and the restore is proved STRUCTURALLY AND BEHAVIOURALLY; and NO
// ASSERTION RUNS INSIDE A MUTATION FRAME, so a failure never leaves an intrinsic mutated and no `assert` helper
// of this file is itself reached through a member the cell has overridden.
//
// **AND TWO DISCIPLINES ARE THESE CELLS' OWN, STATED ONCE HERE:**
//   * **A DRIVER BODY THAT STANDS INSIDE A FRAME TAKES NO MEMBER FROM `Array.prototype`** — no `.map`, no
//     `.push`, no spread, no array destructuring and no `for … of` over an array — because the cells below
//     override exactly those three members and a driver that read one would be measuring itself. Every
//     collection in a frame is built and read by index (`out[out.length] = …`), which is item `(1c)(i)`'s own
//     form spelled in the driver.
//   * **WHERE THE SPEC DECLARES AN ANSWER THE SHIPPED TREE CANNOT YET REACH, THE CELL REPORTS EVERY DRIVE'S
//     VERDICT IN ONE MESSAGE** (`JC-TC-61`'s and `JC-TC-63`'s discipline): the failures are collected inside the
//     frame, captured, and asserted once after the restore, so one failure names EVERY owed site instead of
//     hiding the rest behind the first.

/// ONE ARMED-STATE FRAME. `armed` is `null` for the unarmed CONTROL, or a function of the INSTRUMENT answering
/// either `{target, key, descriptor, liveness}` (an override installed by `Object.defineProperty`) or
/// `{target, key, deleted: true, liveness}` (a DELETION). The frame installs it, **PROVES THE INSTRUMENT LIVE**
/// by driving the member once, OPENS THE DRIVE WINDOW (`beginDrive`, so the liveness take and the restoration's
/// own takes are counted on no drive's census), runs the capture, closes the window with the drive's CENSUS, and
/// RESTORES IN A `finally` — the prior property descriptor when one stood and a `delete` when none did.
///
/// **`live` IS THE LIVENESS ANSWER AND `liveReads` THE INSTRUMENT'S FIGURE AT IT**: a `0` is only admissible
/// against a member the cell has first proved is the one the driver's realm reads (`JC-TC-63`'s `:2781`–`:2791`).
/// **AND `census` IS THE DRIVE'S TAKES PARTITIONED BY ATTRIBUTION** (`contract.md §2.1` F8-8, item `(2d)`): the
/// crossing's own governed sites' figure — the only one a cell asserts as `0` — beside the ROUTED figures it
/// RECORDS and never asserts, and the unattributed figure that fails the cell.
function crossingArmedFrame(armed, capture) {
  const instrument = crossingCounterInstrument();
  const targets = [];
  const keys = [];
  const priors = [];
  let live = null;
  let liveReads = 0;
  let captured = null;
  let census = null;
  try {
    if (armed !== null) {
      const installed = armed(instrument);
      targets[targets.length] = installed.target;
      keys[keys.length] = installed.key;
      priors[priors.length] = Object.getOwnPropertyDescriptor(installed.target, installed.key);
      if (installed.deleted === true) delete installed.target[installed.key];
      else Object.defineProperty(installed.target, installed.key, installed.descriptor);
      live = installed.liveness();
      liveReads = instrument.liveTakes;
      // **THE DRIVE IS OPENED AFTER THE LIVENESS PROBE AND CLOSED BEFORE THE RESTORE**, so no take of the
      // instrument's own probe and no take of the restoration lands in the cell's census.
      instrument.beginDrive(0);
    }
    captured = capture();
  } finally {
    if (armed !== null) census = instrument.endDrive();
    for (let i = targets.length - 1; i >= 0; i -= 1) {
      if (priors[i] === undefined) delete targets[i][keys[i]];
      else Object.defineProperty(targets[i], keys[i], priors[i]);
    }
  }
  return {
    live,
    liveReads,
    census,
    instrument,
    captured,
    prior: priors.length === 0 ? null : priors[0],
  };
}

/// A DATA DESCRIPTOR for an override — the shape the standard members carry (`writable`, NOT enumerable, and
/// `configurable`), so an install is a replacement and not a reshape.
function crossingOwnDescriptor(value) {
  return { value, writable: true, enumerable: false, configurable: true };
}

/// **CLASSIFY ONE THROWN VALUE INTO THE ONLY TWO FORMS THE BOUNDARY DECLARES** (`docs/specs/storeroom-js/surface.md §2.5` item 5 (e)):
/// the package's own refusal carries a `status` STRING, and *"a `TypeError`, a `RangeError`, … or any host object
/// escaping from the boundary's own frame is a FINDING at whatever site produced it, not a rejection"* — which is
/// `HOST ERROR` here, the direction `F-RA-3`'s item `(3)` and item `(1e)(iii)` forbid.
function crossingFailure(caught) {
  if (caught === null || caught === undefined) return null;
  const hostError = caught instanceof Error && typeof caught.status !== 'string';
  return {
    hostError,
    name: typeof caught.name === 'string' ? caught.name : typeof caught,
    status: typeof caught.status === 'string' ? caught.status : null,
    message: typeof caught.message === 'string' ? caught.message : String(caught),
  };
}

/// Run one call and answer `{raised, answer, failure}` — `failure` being `crossingFailure`'s classification. **IT
/// TAKES NO MEMBER FROM ANY PROTOTYPE** (no spread, no iteration), so it may stand inside a frame.
function crossingCall(thunk) {
  try {
    return { raised: false, answer: thunk(), failure: null };
  } catch (caught) {
    return { raised: true, answer: null, failure: crossingFailure(caught) };
  }
}

/// The restoration, PROVED STRUCTURALLY: the member's own descriptor is the intrinsic's again.
function crossingAssertRestoredStructurally(prior, target, key, label) {
  assert.ok(prior !== null && prior !== undefined,
    `${label}: the cell captured no prior descriptor, so its restore was never proved`);
  const now = Object.getOwnPropertyDescriptor(target, key);
  assert.ok(now !== undefined,
    `${label}: ${String(key)} is ABSENT from its prototype after the restore — the mutation was not undone`);
  assert.equal(now.value, prior.value, `${label}: ${String(key)}'s value is not the intrinsic again`);
  assert.equal(now.writable, prior.writable, `${label}: ${String(key)}'s writability moved`);
  assert.equal(now.enumerable, prior.enumerable, `${label}: ${String(key)}'s enumerability moved`);
  assert.equal(now.configurable, prior.configurable, `${label}: ${String(key)}'s configurability moved`);
}

// ── THE NARROWED COUNTER — ONE INSTRUMENT, THE IMMEDIATE INVOKER'S FILE AND ENCLOSING SYMBOL ───────────────
//
// **`contract.md §2.1`'s clause of 2026-10-24 on `F8-8`, item `(2a)`, is the whole of the change: "a cell's
// counter asserts `0` takes AT THE CROSSING'S OWN GOVERNED SITES … and it asserts NOTHING about the rest of the
// call: a take attributed to a `ROUTED` row is EXCLUDED from the counter and is that row's own state."** Item
// `(2d)` then declares the ONE mechanism and forbids inference: *"Each override wrapper records, at the instant
// it is invoked, its IMMEDIATE INVOKER — the frame outside the wrapper — and answers that frame's SOURCE FILE
// and its ENCLOSING SYMBOL"*, and classifies FOUR ways —
//
//   (i)   the kernel's HOME — **its barrel's own path** (`bindings/js/src/constraint-kernel.mjs`, which the
//         subdivision does not move) **or one of its parts** (`bindings/js/src/entry/kernel-<name>.mjs`,
//         `strata/decisions.md` `D-13`) → **row `66`**, EXCLUDED and counted on
//         the cell's routed counter, which is RECORDED and NEVER asserted as `0` (item `(3d)`: this row is no
//         claim that the process takes no member, and no claim that a kernel take is present either);
//   (ii)  the crossing's own file (`bindings/js/index.mjs`) at a `ROUTED` row's symbol — rows `49`–`53` and
//         `65` (item `(2c)`) — EXCLUDED the same way, on the same routed counter;
//   (iii) the crossing's own file at a governed symbol → **GOVERNED, COUNTED, and the cell's assertion is that
//         this count is `0`** — the sites of the inventory's `OWED`, `ALREADY LAWFUL` and `PARKED` rows;
//   (iv)  ANY OTHER ANSWER — another file, or no frame that can be read — is REPORTED and EXCLUDED, never
//         folded into the `0` and never silently dropped (`(2d)(iv)`), and item `(4c)` makes it the cell's own
//         FAILURE: *"a take the read cannot attribute is item `(2d)(iv)`'s and it FAILS the cell … a widening of
//         the routed set that must be VISIBLE."*
//
// **THE INSTRUMENT IS THE `Array.prototype` WRAPPER ITSELF AND NOTHING WAS DELETED FROM IT:** every wrapper
// below still installs over the same descriptor, still answers the same forged value, and still counts every
// take — what changed is WHERE the count lands. A take is COUNTED as before and PARTITIONED by attribution, so
// the cell still fails on a governed take and a routed take is reported rather than silently forgiven.
//
// **AND THE ONE CLASSIFICATION THIS FILE MUST NOT READ AS A LOOPHOLE:** an `index.mjs` symbol that is neither a
// routed-row symbol nor named as governed is classified GOVERNED, not routed — limb `(i)` of item `(4b)` makes
// every `index.mjs` site on the six paths a row of the table, so a non-routed `index.mjs` symbol is a governed
// row's site, and where the table lacks it item `(4c)` makes the absence a FINDING and the cell fails. Nothing
// in this file may route a take simply because the classifier cannot place it.

/// **THE THIS FILE'S OWN PATH**, so the instrument can skip its OWN frames by construction: the recorder and
/// every wrapper it installs are defined in this file, so a take whose immediate invoker is this file is a take
/// the INSTRUMENT made and not the crossing. **It is not routed and not forgiven**: a take attributable to
/// this file anywhere outside the instrument is item `(2d)(iv)`'s and fails the cell.
// **⟶ RE-SPELLED 2026-10-25 BY THE BATTERY'S STRATIFICATION MOVE (`D-5`): THE SITE THIS FILE STANDS AT IS
// `tests/e2e/`, and the suffix is the identity the classifier reads. Only the path moves; the limb's own
// subject — a take this INSTRUMENT made is skipped, and a take this file made anywhere else fails the cell —
// is unmoved.
const CROSSING_TEST_FILE_SUFFIX = '/tests/e2e/json-crossing.test.mjs';
const CROSSING_INDEX_FILE_SUFFIX = '/bindings/js/index.mjs';
const CROSSING_KERNEL_FILE_SUFFIX = '/bindings/js/src/constraint-kernel.mjs';

/// **THE KERNEL'S PARTS' DIRECTORY** (`strata/decisions.md` `D-13` and `D-33`; `docs/L1/kernel-subdivision.md`
/// §1): the kernel is cut into FIVE PARTS the barrel re-exports — `kernel-foundations`, `kernel-registration`,
/// `kernel-commit`, `kernel-attempt`, `kernel-terminal` — and its own path above is reduced to a SIX-NAME
/// RE-EXPORT BARREL that the cut does not move.
///
/// **⟶ SO THE IDENTITY THIS CLASSIFIER READS IS THE MODULE'S HOME AND NOT ONE FILE'S PATH.** Limb `(i)` is row
/// `66`'s, and row `66` is a claim about WHICH MODULE took the member — the kernel — so a take that names a
/// kernel frame is row `66`'s whether the bytes that took it stand in the barrel or in a part the barrel
/// re-exports. **THE PATTERN IS THE DIRECTORY AND THE PREFIX AND NOT AN ENUMERATED NAME**, so a sixth part needs
/// no edit here; and it is ANCHORED at `entry/kernel-` and CLOSED at ONE `.mjs` name segment, so no frame of
/// `index.mjs`, of `src/store.rs`'s crossing or of any test file can match it: `<name>` may carry letters,
/// digits, `_` and `-`, and carries no `/` and no second `.` — which is exactly what keeps a `*.test.mjs` and a
/// nested path out.
const CROSSING_KERNEL_PARTS_PREFIX = '/bindings/js/src/entry/kernel-';
const CROSSING_KERNEL_PART_NAME = /^[A-Za-z0-9_-]+\.mjs$/;

/// **IS THIS FRAME'S FILE THE KERNEL'S?** — its BARREL by the whole suffix the cut leaves unchanged, OR one of
/// its PARTS by the parts' directory. **IT TAKES NO MEMBER OF `Array.prototype`** (this runs inside a drive
/// whose instrument has replaced `push`, `map`, `join` and the iterator), and it reads a `RegExp` with no `g`
/// flag, so no call carries state from one take to the next. A frame whose file is not a string — the parser
/// above never produces one, and this guard answers `false` rather than throwing — is not the kernel's.
function crossingIsKernelFile(file) {
  if (typeof file !== 'string') return false;
  if (file.endsWith(CROSSING_KERNEL_FILE_SUFFIX)) return true; // the barrel: the cut does not move it
  if (file.endsWith('.mjs') !== true) return false; // a `.rs`, a `.ts` and every extensionless frame
  const at = file.lastIndexOf(CROSSING_KERNEL_PARTS_PREFIX);
  if (at < 0) return false; // some other file: the crossing's, this test's, the Rust source's
  return CROSSING_KERNEL_PART_NAME.test(file.slice(at + CROSSING_KERNEL_PARTS_PREFIX.length));
}

/// **THE MODULE'S OWN PARTS' DIRECTORY — EVERY PART, NOT ONLY THE KERNEL'S** (`strata/decisions.md` `D-33` and
/// the entry cut it authorised; `docs/L1/entry-subdivision.md` §1). The kernel's five parts and the entry's
/// eight share `bindings/js/src/entry/`, so a take whose frame names `state.mjs`, `constraints.mjs`,
/// `delivery.mjs` or `carrier.mjs` names **the crossing's own file** just as an `index.mjs` frame does — the
/// file was one file until this cut and the rows did not move with it.
///
/// **⟶ AND THIS IS THE CLASS THE LAST REPAIR DID NOT GENERALISE (`strata/decisions.md`'s FINDING of 2026-10-24,
/// class (2)).** The classifier was widened for the KERNEL cut by naming a PREFIX (`entry/kernel-`), which is a
/// property of the kernel's parts and not of the module's; the entry's cut then put frames at `state.mjs:386`,
/// `state.mjs:593`, `constraints.mjs:95` and `constraints.mjs:96` in front of the same reader and item
/// `(2d)(iv)` classified them `UNATTRIBUTED` — a violation by this cell's own design, so `JC-TC-65` went red for
/// the reason the classifier exists to catch.
///
/// **SO THE IDENTITY IS THE DIRECTORY AND THE HUB, AND THE `kernel-` PREFIX IS ONLY WHAT TELLS ROW 66 FROM THE
/// CROSSING'S OWN ROWS.** The pattern stays ANCHORED at `/bindings/js/src/entry/` and CLOSED at ONE `.mjs` name
/// segment, so nothing else can match it: no test file (they live in `bindings/js/test/`, and `*.test.mjs` is a
/// second `.` besides), no `bindings/js/index.d.ts` (a `.ts`, and it is not under the parts' directory), no
/// `bindings/js/src/store.rs` (a `.rs`), and no nested path (`<name>` carries no `/`).
const CROSSING_ENTRY_PARTS_PREFIX = '/bindings/js/src/entry/';
const CROSSING_ENTRY_PART_NAME = /^[A-Za-z0-9_-]+\.mjs$/;

/// **IS THIS FRAME'S FILE ONE OF THE MODULE'S OWN PARTS?** — any `.mjs` directly under `src/entry/`, the
/// KERNEL'S INCLUDED (the caller tests `crossingIsKernelFile` first, so row `66` keeps its own arm).
function crossingIsEntryPart(file) {
  if (typeof file !== 'string') return false;
  if (file.endsWith('.mjs') !== true) return false;
  const at = file.lastIndexOf(CROSSING_ENTRY_PARTS_PREFIX);
  if (at < 0) return false;
  return CROSSING_ENTRY_PART_NAME.test(file.slice(at + CROSSING_ENTRY_PARTS_PREFIX.length));
}

/// **IS THIS FRAME'S FILE THE CROSSING'S OWN?** — the HUB at its unchanged path, OR any part under `src/entry/`.
/// **The barrel is NOT one of them**: it is the kernel's re-export surface and row `66`'s, and it is tested
/// before this one. A frame this predicate places is then classified BY SYMBOL — `ROUTED_ROW` where the symbol
/// is one of item `(2c)`'s routed rows and `GOVERNED` otherwise, which is exactly the reading `index.mjs`
/// frames got while the crossing was one file.
function crossingIsCrossingFile(file) {
  if (typeof file !== 'string') return false;
  if (file.endsWith(CROSSING_INDEX_FILE_SUFFIX)) return true;
  return crossingIsEntryPart(file);
}

/// **THE `ROUTED` ROWS WHOSE SITES LIVE IN THE CROSSING'S OWN FILE** (item `(2c)`), BY THE SYMBOL THE FRAME
/// NAMES — `bindings/js/index.mjs`'s rows `49` (`inDomainAddress`), `50` (`encodeAddress`, `constraintAddress`),
/// `51` (`absentSubject`), `52` (`notFoundRendering`), `53` (`homeAddressKey`, `addressSetKey`) and `65` (the
/// MIRROR AND REGISTRY MAINTENANCE FAMILY: `listen`, `unlisten`, `removeListener` and the registration routes
/// under them). **ROW `65`'s FAMILY IS NAMED BY SYMBOL AND DELIBERATELY NOT ENUMERATED SITE BY SITE**
/// (`contract.md §2.1`'s clause of this date, item `(9c)`), so this list names the family and no subset of it is
/// printed as coverage. **NO OTHER `index.mjs` SYMBOL IS ROUTED BY THIS FILE.**
const CROSSING_ROUTED_ROW_SYMBOLS = [
  'inDomainAddress', 'encodeAddress', 'constraintAddress', 'absentSubject', 'notFoundRendering',
  'homeAddressKey', 'addressSetKey', 'listen', 'unlisten', 'removeListener',
];

/// The symbol a stack frame names, read down to its last `.` segment: Node prints a method's frame as
/// `Object.write`, `Module.runAttempt` or `forged.next`, and the ENCLOSING SYMBOL item `(2d)` asks for is the
/// last segment (`write`, `runAttempt`, `next`).
function crossingFrameSymbol(symbol) {
  const dot = symbol.lastIndexOf('.');
  return dot < 0 ? symbol : symbol.slice(dot + 1);
}

/// Parse a stack's text into `[{file, line, symbol}]`, IN ORDER, dropping every frame that names no source
/// location (`<anonymous>`, a native builtin frame): **`forged.next (<anonymous>)` stands between a generator's
/// body and the `for … of` that drove it, and the site item `(2d)` asks for is the frame that DID drive it.**
/// **NO MEMBER OF `Array.prototype` IS TAKEN HERE** — the rows are read by index and every string operation is
/// `String.prototype`'s (a frame may be parsed while `Array.prototype.push` is answering `0`).
function crossingStackFrames(stackText) {
  const rows = typeof stackText === 'string' ? stackText.split('\n') : [];
  const frames = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const at = row.indexOf('at ');
    if (at < 0) continue; // the `Error: …` title line names no frame
    let body = row.slice(at + 3).trim();
    let symbol = '';
    const open = body.lastIndexOf('(');
    if (open >= 0 && body[body.length - 1] === ')') {
      symbol = body.slice(0, open).trim();
      body = body.slice(open + 1, body.length - 1).trim();
    }
    const column = body.lastIndexOf(':');
    if (column < 0) continue;
    const line = body.lastIndexOf(':', column - 1);
    if (line < 0) continue;
    const lineNumber = Number(body.slice(line + 1, column));
    if (!Number.isInteger(lineNumber)) continue; // `<anonymous>` and every frame with no site
    frames[frames.length] = { file: body.slice(0, line), line: lineNumber, symbol };
  }
  return frames;
}

/// **CLASSIFY ONE TAKE BY ITS IMMEDIATE INVOKER** (item `(2d)`): skip the instrument's own frames (this file's)
/// by construction, then answer the first frame that names a site:
/// `{kind: 'ROUTED_KERNEL' | 'ROUTED_ROW' | 'GOVERNED' | 'UNATTRIBUTED', file, line, symbol, where}` — `where`
/// being the recorded spelling `'<file tail>:<line> <symbol>'` the cell's routed counter prints.
function crossingAttributeTake(stackText) {
  const frames = crossingStackFrames(stackText);
  for (let i = 0; i < frames.length; i += 1) {
    const frame = frames[i];
    if (frame.file.endsWith(CROSSING_TEST_FILE_SUFFIX)) continue; // the instrument's own frames
    const where = `${frame.file.slice(frame.file.lastIndexOf('/') + 1)}:${frame.line} ${frame.symbol}`;
    if (crossingIsKernelFile(frame.file)) {
      return { kind: 'ROUTED_KERNEL', file: frame.file, line: frame.line, symbol: frame.symbol, where };
    }
    if (crossingIsCrossingFile(frame.file)) {
      const named = crossingFrameSymbol(frame.symbol);
      let routed = false;
      for (let s = 0; s < CROSSING_ROUTED_ROW_SYMBOLS.length; s += 1) {
        if (CROSSING_ROUTED_ROW_SYMBOLS[s] === named) routed = true;
      }
      return {
        kind: routed ? 'ROUTED_ROW' : 'GOVERNED',
        file: frame.file, line: frame.line, symbol: frame.symbol, where,
      };
    }
    return { kind: 'UNATTRIBUTED', file: frame.file, line: frame.line, symbol: frame.symbol, where };
  }
  return { kind: 'UNATTRIBUTED', file: null, line: null, symbol: null, where: 'no readable frame' };
}

/// **ONE INSTRUMENT PER ARM OR PER STATE.** `take()` is what every wrapper body calls in place of the former
/// `counter.value += 1`: it counts, and — while a drive is open — records the take's ATTRIBUTION. **The
/// liveness probe's takes are counted and their attributions kept apart** (`liveTakes`, `liveAttributions`), so a
/// `0` is only ever asserted against the drives, and so the cell can prove its reader reads REAL stacks.
function crossingCounterInstrument() {
  const instrument = {
    liveTakes: 0,
    liveAttributions: [],
    takes: [],
    driving: false,
    drive: -1,
  };
  instrument.take = () => {
    const stackText = new Error('crossing take').stack;
    if (instrument.driving !== true) {
      instrument.liveTakes += 1;
      instrument.liveAttributions[instrument.liveAttributions.length] = crossingAttributeTake(stackText);
      return;
    }
    instrument.takes[instrument.takes.length] = {
      drive: instrument.drive,
      attribution: crossingAttributeTake(stackText),
    };
  };
  instrument.beginDrive = (index) => {
    instrument.drive = index;
    instrument.driving = true;
    instrument.takes = [];
  };
  instrument.endDrive = () => {
    instrument.driving = false;
    const mine = [];
    for (let i = 0; i < instrument.takes.length; i += 1) mine[i] = instrument.takes[i].attribution;
    instrument.takes = [];
    return crossingCensus(mine);
  };
  return instrument;
}

/// **THE CENSUS OF ONE DRIVE'S TAKES, PARTITIONED BY ATTRIBUTION** (item `(2d)`): `governed` is the ONLY figure
/// a cell asserts as `0`; `routedKernel` and `routedRow` are EXCLUDED and RECORDED; `unattributed` is item
/// `(2d)(iv)`'s and fails the cell. `recorded` is the human-readable list of every take this drive saw, routed
/// and governed alike, so a failing run prints WHERE the takes came from instead of a bare figure.
function crossingCensus(attributions) {
  const census = { governed: 0, routedKernel: 0, routedRow: 0, unattributed: 0, recorded: [] };
  for (let i = 0; i < attributions.length; i += 1) {
    const at = attributions[i];
    if (at.kind === 'ROUTED_KERNEL') {
      census.routedKernel += 1;
      census.recorded[census.recorded.length] = `ROUTED row 66 ${at.where}`;
    } else if (at.kind === 'ROUTED_ROW') {
      census.routedRow += 1;
      census.recorded[census.recorded.length] = `ROUTED crossing-file row ${at.where}`;
    } else if (at.kind === 'GOVERNED') {
      census.governed += 1;
      census.recorded[census.recorded.length] = `GOVERNED ${at.where}`;
    } else {
      census.unattributed += 1;
      census.recorded[census.recorded.length] = `UNATTRIBUTED ${at.where}`;
    }
  }
  return census;
}

/// **THE CELL'S COUNTER ASSERTION, IN THE NARROWED FORM** — and the ONLY place the `0` is decided. It answers
/// the violations a census carries: ONE where a GOVERNED site took the member (the conjunction of item `(2e)`:
/// the `0` AND the crossed datum, asserted separately by the cell), and ONE where a take could not be
/// attributed (item `(2d)(iv)` / `(4c)`, a widening of the routed set that must be visible). **A ROUTED TAKE
/// ANSWERS NOTHING HERE**: it is excluded and recorded, and this helper never asserts it present or absent.
function crossingCounterViolations(label, census) {
  const out = [];
  if (census === null || census === undefined) {
    out[out.length] = `${label}: the COUNTER — no census was taken, so the narrowed counter was never read`;
    return out;
  }
  if (census.governed !== 0) {
    out[out.length] = `${label}: the GOVERNED COUNTER — a crossing site took the member ${census.governed} `
      + 'time(s), where the crossing\'s own governed sites may consult no member of a mutable prototype '
      + `(contract.md §2.1 F8-8, items (2a) and (2e)): ${census.recorded.join('; ')}`;
  }
  if (census.unattributed !== 0) {
    out[out.length] = `${label}: the UNATTRIBUTED takes — ${census.unattributed} take(s) name no site this `
      + 'reading can place, and a take the read cannot attribute FAILS the cell rather than widening the routed '
      + `set silently (F8-8, items (2d)(iv) and (4c)): ${census.recorded.join('; ')}`;
  }
  return out;
}

/// The ONE-LINE RECORD of a census, for the cell's own diagnostic: the GOVERNED figure, the ROUTED figures,
/// the unattributed figure and every take that was recorded — reported and never asserted.
function crossingCensusRecord(census) {
  if (census === null || census === undefined) return 'no census';
  return `governed ${census.governed} · routed kernel(row 66) ${census.routedKernel} · routed crossing-file `
    + `${census.routedRow} · unattributed ${census.unattributed}`
    + (census.recorded.length === 0 ? '' : ` · recorded: ${census.recorded.join(', ')}`);
}

/// **THE INSTRUMENT'S OWN FAILURE MODE, PROVED AND NOT ASSUMED** (`contract.md §2.1 F8-8`, items `(2d)` and
/// `(2e)`; the supervisor's own requirement that *"the instrumentation can still fail"*). Every cell that
/// asserts a narrowed `0` calls this FIRST, so the `0` is a measurement of a live instrument and not a vacuum:
///
///   (1) **THE READER READS REAL STACKS.** The liveness probe's take was recorded through the same
///       `crossingAttributeTake` the drives use, from a REAL stack taken inside the armed frame; it is
///       attributable and it is `UNATTRIBUTED` (its immediate invoker is this test file, which is neither the
///       crossing nor the kernel) — so the record is read and a non-crossing take is never silently routed.
///   (2) **A GOVERNED TAKE IS DETECTABLE AND FAILS THE CELL — THIS IS THE DELIBERATE PROBE.** A forged stack
///       naming the crossing's own file at a governed symbol (`encodeValue`, row `22`'s `members.push` site,
///       `bindings/js/index.mjs:1851`) classifies `GOVERNED` and turns `crossingCounterViolations` non-empty;
///       the same forged stack at a routed row's symbol classifies `ROUTED_ROW` and answers NO violation; a
///       stack naming the kernel's BARREL classifies `ROUTED_KERNEL` and answers NO violation; **AND SO DOES A
///       STACK NAMING ONE OF THE KERNEL'S PARTS** (`bindings/js/src/entry/kernel-<name>.mjs`, `D-13`) — forged
///       on a tree whose parts' directory does not exist yet, so the second limb of limb `(i)` is proved before
///       the cut lands and not after. **SO THE `0` THE
///       CELL THEN ASSERTS IS A CLAIM ABOUT THE GOVERNED SITES AND NOT ABOUT THE PROCESS: if one of the
///       crossing's own sites took the member, this helper's own answer would report it.**
///       **NOTHING IS MUTATED AND NOTHING IS REVERTED BY THE PROBE** — the classified stacks are strings, and
///       the governed branch is proved at a symbol the shipped bytes no longer take, which is the state the
///       cell's green consists of.
///   (3) **AN UNATTRIBUTABLE TAKE IS VISIBLE.** A stack naming a file this reading cannot place classifies
///       `UNATTRIBUTED` and fails the cell (item `(4c)`), so the routed set can never be widened quietly.
///
/// It answers a record `{liveKind, liveWhere, probe: {[label]: {kind, violations}}}` and ASSERTS ITS OWN
/// ANSWERS, so no cell can carry a `0` over a classifier that silently stopped classifying.
function crossingProveCounterAttribution(label, instrument) {
  const testFile = fileURLToPath(import.meta.url);
  const indexFile = fileURLToPath(new URL('../../bindings/js/index.mjs', import.meta.url));
  const kernelFile = fileURLToPath(new URL('../../bindings/js/src/constraint-kernel.mjs', import.meta.url));
  // THE PARTS' OWN DIRECTORY, SPELLED RATHER THAN DISCOVERED: `fileURLToPath` reads no filesystem, so this
  // answers on the tree whose bytes have NOT moved as well as on the tree whose bytes have (`D-13`).
  const kernelPartFile = fileURLToPath(new URL('../../bindings/js/src/entry/kernel-foundations.mjs', import.meta.url));
  const forgedStack = (site) => `Error: crossing take\n    at take (${testFile}:1:1)\n`
    + `    at Array.probeWrapper (${testFile}:1:1)\n    at ${site}\n`;
  const probes = [
    // A GOVERNED SITE OF THE CROSSING'S OWN FILE: row `22`'s `members.push`, `bindings/js/index.mjs:1851`.
    { id: 'governed', site: `encodeValue (${indexFile}:1851:7)`, wantKind: 'GOVERNED', wantViolations: 1 },
    // THE KERNEL'S BARREL — `append`'s `attempt.log.push`, row `66`'s `:383` — EXCLUDED, and never asserted
    // present. **THE BARREL'S PATH IS THE ONE FORGED HERE ON PURPOSE**: the subdivision moves `append`'s bytes
    // into `src/entry/kernel-foundations.mjs` and leaves the barrel's PATH alone (`D-13`), so a forged take
    // naming the barrel is the one spelling that is the same site before the cut and after it.
    { id: 'kernel', site: `append (${kernelFile}:383:15)`, wantKind: 'ROUTED_KERNEL', wantViolations: 0 },
    // AND ONE OF THE KERNEL'S PARTS — THE SAME MODULE AND THE SAME ROW, IN A DIFFERENT FILE: before the cut the
    // parts' directory does not exist and nothing in the tree names it; after the cut every kernel take names one
    // of these files, and `kernel-foundations.mjs:179 inDomainAddress` is the first of the four the cut named.
    // **THE LIMB IS FORGED HERE SO IT IS PROVED ON THE TREE WHOSE BYTES HAVE NOT MOVED YET** — an identity read
    // off ONE path would answer UNATTRIBUTED for this take and fail the cell it feeds.
    { id: 'kernel-part', site: `inDomainAddress (${kernelPartFile}:179:7)`, wantKind: 'ROUTED_KERNEL', wantViolations: 0 },
    // A `ROUTED` ROW OF THE CROSSING'S FILE: row `53`'s `homeAddressKey`.
    { id: 'crossing-row', site: `homeAddressKey (${indexFile}:4708:9)`, wantKind: 'ROUTED_ROW', wantViolations: 0 },
    // NO SITE THIS READING CAN PLACE: a file that is neither the crossing's, the kernel's nor this one.
    { id: 'foreign', site: `stranger (${testFile.slice(0, testFile.lastIndexOf('/'))}/elsewhere.mjs:12:3)`, wantKind: 'UNATTRIBUTED', wantViolations: 1 },
  ];
  const probe = {};
  for (let i = 0; i < probes.length; i += 1) {
    const at = crossingAttributeTake(forgedStack(probes[i].site));
    const violations = crossingCounterViolations(`${label} (probe ${probes[i].id})`, crossingCensus([at]));
    probe[probes[i].id] = { kind: at.kind, violations: violations.length, want: probes[i].wantKind };
    assert.equal(at.kind, probes[i].wantKind,
      `${label}: the narrowed counter's classifier answered ${JSON.stringify(at.kind)} for a take whose `
      + `immediate invoker is ${JSON.stringify(probes[i].site)}; the declared attribution is `
      + `${JSON.stringify(probes[i].wantKind)} (contract.md §2.1 F8-8, item (2d)) — an instrument that cannot `
      + 'place a take cannot witness a `0`');
    assert.equal(violations.length, probes[i].wantViolations,
      `${label}: the narrowed counter answered ${violations.length} violation(s) for the `
      + `${JSON.stringify(probes[i].id)} take; the declared figure is ${probes[i].wantViolations} `
      + '(a GOVERNED take fails the cell, a ROUTED take is excluded and recorded, and an UNATTRIBUTED take '
      + 'fails the cell — items (2d), (2e) and (4c))');
  }
  // (1) THE READER READS REAL STACKS: the liveness take's attribution is a real one, and it is not routed.
  assert.ok(instrument.liveAttributions.length >= 1,
    `${label}: the liveness probe's take was never recorded, so the narrowed counter's reader was never `
    + 'exercised on a real stack and every `0` below would be vacuous');
  assert.equal(instrument.liveAttributions[0].kind, 'UNATTRIBUTED',
    `${label}: the liveness take's immediate invoker is this test file — neither the crossing nor the kernel — `
    + 'so the declared attribution is UNATTRIBUTED (item (2d)(iv)); a reader that routed it would be forgiving '
    + 'a site no row names');
  return {
    liveKind: instrument.liveAttributions[0].kind,
    liveWhere: instrument.liveAttributions[0].where,
    probe,
  };
}

// ── `JC-TC-64` — THE RECORD COPY AND THE DELIVERY ARE THE GOVERNED COPY PATH'S ──────────────────────────────

test('JC-TC-64 the record copy and the delivery are the governed copy path\'s, so a caller\'s one-liner decides neither', { timeout: 120000 }, (t) => {
  // `test-cases.md` `JC-TC-64`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F8-1`, items
  // `(1a)`–`(1d)`; the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm
  // `(xviii)`, whose inventory rows are `55`–`60`): **THE REPLY'S RECORD COPY AND THE DELIVERY ARE ON THE
  // GOVERNED COPY PATH, so no verdict, no crossed member and no invocation is decided by `Array.prototype`** —
  // and the cell drives it on the ONE construction that reaches both: a LISTENER-BEARING store whose record is
  // non-empty.
  //
  // **⟶ AND THE COUNTER IS RE-DERIVED IN THE NARROWED FORM (`contract.md §2.1`'s clause of `2026-10-24` on
  // `F8-8`, items `(2a)`, `(2b)`, `(2d)`, `(2e)` and `(7b)`; `test-cases.md`'s clause of the same date, item
  // `(2b)`): the `0` THIS CELL ASSERTS IS THE CROSSING'S OWN GOVERNED SITES' `0` AND NOT A CLAIM ABOUT THE
  // CALL.** The kernel's takes are EXCLUDED and RECORDED on the cell's routed counter — row `66`'s `:177`,
  // `:1460`, `:1729` and, on this write, `:383` — one each per admitted write, and **this cell asserts NOTHING
  // about them: not that they are absent and not that they are present** (item `(3d)`). What is asserted is item
  // `(2e)`'s CONJUNCTION: the GOVERNED counter at `0` AND the record, the crossed sets and the one invocation
  // byte-identical to the control's. **THE FIXTURE IS UNAFFECTED** (item `(7b)`): `storeCreate` and `register`
  // run BEFORE the override is armed, so row `65`'s routed mirror is not entered under an armed state here.
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (the row's two armed states beside its one control, and
  // the three declared members of the record — `{op, watched, triggered}`, `PAR-JS-13`):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | CONTROL — `storeCreate({ journalLength: 8, listeners: [{ handle: 'h', address: ['a'] }] })`, `register('h', fn)`, then `write(['a', 'b'], 'mem', 'x')` | the record's `op`, `watched` and `triggered`; `watched` and `triggered` NON-EMPTY (`[['a']]` and `[{handle: 'h', address: ['a']}]`); the counting listener fires EXACTLY ONCE, with the triggering address `['a', 'b']` and `arguments.length === 1`; the store's bytes settle at `'x'` |
  // | (i) `Array.prototype[Symbol.iterator]` replaced by a generator yielding EXACTLY ONE `undefined` | THE SAME RECORD BYTES and the SAME non-empty sets; the listener fires exactly once with `['a', 'b']`; NO RAW HOST ERROR escapes — not the `element.handle` read at the record copy and not the pair destructuring at the delivery; the GOVERNED COUNTER `0`, the kernel's three iteration takes EXCLUDED and RECORDED |
  // | (ii) `Array.prototype.push` replaced by a function answering `0` that copies nothing | THE SAME RECORD BYTES with `watched` and `triggered` NON-EMPTY and the listener FIRING — a no-op append may not empty the record and silence the delivery; NO RAW HOST ERROR escapes; the GOVERNED COUNTER `0`, the kernel's `attempt.log.push` EXCLUDED and RECORDED |
  // | the FRESHNESS LIMB, on the control alone: a second identical write at the same address | a SECOND invocation, whose ONE argument is a FRESH DENSE array `['a', 'b']` and NOT the first invocation's object (`parameter-semantics.md §2.12`; `surface.md §2.4`'s invocation row) |
  //
  // **WHAT THE SHIPPED TREE NOW ANSWERS, MEASURED RATHER THAN EXPECTED** (items `(1a)` and `(1b)` of the
  // clause: arm `(xviii)`'s bytes stand): the record crosses intact, the listener fires once and no host error
  // escapes in either armed state — **and every residual take this cell's instrument sees is the KERNEL'S, and
  // the battery measured the exact figures: under the forged iterator, THREE inside the kernel's file per
  // admitted write (`inDomainAddress` `:177`, `evaluate` `:1460`, `releasePending` `:1729`), and under the no-op
  // `push`, ONE (`append` `:383`). All four are inventory row `66`'s routed state and another unit's.** So the
  // counter's SCOPE — and not its liveness — is what this cell's former red consisted of, and the mechanism
  // (item `(2d)`) is stated once at the head of this section, taken here rather than inferred, and printed in
  // this cell's own routed census lines with each take's file, line and symbol. **The cell asserts the
  // conjunction of item `(2e)`: the GOVERNED counter `0` AND the record, its `triggered`/`watched` and the one
  // delivery byte-identical to the control's.**
  const drivenAddress = ['a', 'b'];
  // THE OP'S OWN DECLARED MEMBER SET (`addon-surface-properties.test.mjs:450`): eight members, and the ONE datum
  // that is NOT a crossing's is `opId` — the package's own PROCESS-GLOBAL journal sequence, measured as `op-2`
  // and `op-4` for two identically driven instances in one process. So the record is compared byte-identically
  // with THAT ONE DATUM HELD AT A TOKEN, and its declared shape (`op-<digits>`) is asserted on its own.
  const RECORD_OP_MEMBERS = ['address', 'after', 'before', 'compacted', 'kind', 'opId', 'seq', 'tier'];
  const recordBytes = (record) => {
    const op = {};
    for (let i = 0; i < RECORD_OP_MEMBERS.length; i += 1) {
      const member = RECORD_OP_MEMBERS[i];
      op[member] = member === 'opId' ? 'op-*' : record.op[member];
    }
    return JSON.stringify({ op, watched: record.watched, triggered: record.triggered });
  };
  // **THE FIXTURE STANDS OUTSIDE EVERY FRAME AND BEFORE THE COUNTING LISTENER IS REGISTERED**: its one write at
  // `['a']` opens the bucket the drive's address `['a', 'b']` stands under — the store's own `write` requires a
  // link at the parent — and because no function is registered yet, that write can neither be counted nor fire
  // an invocation.
  // THE FIXTURE — a listener-bearing construction whose registered handle stands ONE SEGMENT ABOVE the driven
  // address, and a COUNTING listener registered through the package's own member.
  const fixture = () => {
    const store = storeCreate({ journalLength: 8, listeners: [{ handle: 'h', address: ['a'] }] });
    store.write(['a'], 'mem', {});
    const fired = [];
    store.register('h', function countingListener(address) {
      fired[fired.length] = { argumentCount: arguments.length, address };
    });
    return { store, fired };
  };
  const runState = (armed) => {
    const frameFixture = fixture();
    const frame = crossingArmedFrame(armed, () => {
      const driven = crossingCall(() => frameFixture.store.write(drivenAddress, 'mem', 'x'));
      return { raised: driven.raised, failure: driven.failure, record: driven.answer };
    });
    // THE SETTLED END STATE IS READ OUTSIDE THE FRAME, so a restored intrinsic cannot decide it.
    const settled = crossingCall(() => frameFixture.store.read(drivenAddress, 'mem'));
    return {
      store: frameFixture.store,
      fired: frameFixture.fired,
      live: frame.live,
      liveReads: frame.liveReads,
      // **THE NARROWED COUNTER'S CENSUS, TAKEN INSIDE THE MUTATION FRAME AND ASSERTED AFTER THE RESTORE**
      // (`contract.md §2.1` F8-8, item `(2d)`): `governed` is the only figure asserted as `0`; the kernel's and
      // the crossing's `ROUTED` rows' takes are excluded and recorded; an unattributable take fails the cell.
      census: frame.census,
      instrument: frame.instrument,
      prior: frame.prior,
      raised: frame.captured.raised,
      failure: frame.captured.failure,
      record: frame.captured.record,
      settled: settled.raised ? settled.failure : settled.answer,
    };
  };
  const FORGED_ITERATOR = (counter) => ({
    target: Array.prototype,
    key: Symbol.iterator,
    descriptor: crossingOwnDescriptor(function* forgedIterator() {
      counter.take();
      yield undefined;
    }),
    // LIVE MEANS: the forged iterator is the one this realm's arrays answer, and it yields ONE `undefined`.
    liveness: () => {
      const walk = ['x'][Symbol.iterator]();
      const step = walk.next();
      return step.done === false && step.value === undefined;
    },
  });
  const NO_OP_PUSH = (counter) => ({
    target: Array.prototype,
    key: 'push',
    descriptor: crossingOwnDescriptor(function pushAnsweringZero() {
      counter.take();
      return 0;
    }),
    // LIVE MEANS: an append through the override copies NOTHING (the length is the zero its answer names).
    liveness: () => {
      const twin = [];
      twin.push('copied?');
      return twin.length;
    },
  });
  const control = runState(null);
  const iteratorState = runState(FORGED_ITERATOR);
  const pushState = runState(NO_OP_PUSH);
  const states = [
    { id: '(i) forged Array.prototype[Symbol.iterator] yielding one undefined', seen: iteratorState },
    { id: '(ii) Array.prototype.push answering 0 without copying', seen: pushState },
  ];

  // ── THE RESTORE IS PROVED FIRST, so no red below can leave an intrinsic mutated ─────────────────────────
  crossingAssertRestoredStructurally(iteratorState.prior, Array.prototype, Symbol.iterator, 'JC-TC-64 restore');
  crossingAssertRestoredStructurally(pushState.prior, Array.prototype, 'push', 'JC-TC-64 restore');
  assert.equal(JSON.stringify([...['a', 'b']]), '["a","b"]',
    'the restore is proved behaviourally: the intrinsic array iterator is back');
  const appended = [];
  appended.push('a');
  appended.push('b');
  assert.equal(appended.length, 2, 'the restore is proved behaviourally: Array.prototype.push copies again');
  assert.equal(appended.join(','), 'a,b', 'the restore is proved behaviourally: push copied both members');

  // ── THE NARROWED COUNTER'S INSTRUMENT, PROVED BEFORE ANY `0` IS ASSERTED AGAINST IT ────────────────────
  // **THE DELIBERATE PROBE OF THE SUPERVISOR'S OWN REQUIREMENT** (`contract.md §2.1` F8-8, items `(2d)` and
  // `(2e)`): the classifier is driven with a forged stack naming a GOVERNED site of the crossing's own file and
  // the cell's violation builder answers, so a governed take HERE would FAIL this cell; the kernel's file and a
  // crossing-file `ROUTED` row classify routed and answer NO violation, so the routed takes are excluded and not
  // forgiven; and the liveness take's own REAL stack is read and read as unattributable. Nothing is mutated and
  // nothing is reverted by the probe; the figures it prints with the two censuses are the narrowing's proof.
  const iteratorProof = crossingProveCounterAttribution('JC-TC-64 state (i)', iteratorState.instrument);
  const pushProof = crossingProveCounterAttribution('JC-TC-64 state (ii)', pushState.instrument);
  t.diagnostic(`JC-TC-64 (i) forged iterator — ${crossingCensusRecord(iteratorState.census)}`);
  t.diagnostic(`JC-TC-64 (ii) no-op push — ${crossingCensusRecord(pushState.census)}`);
  t.diagnostic(`JC-TC-64 classifier proof — governed ${iteratorProof.probe.governed.kind}/`
    + `${iteratorProof.probe.governed.violations} violation(s) · kernel ${iteratorProof.probe.kernel.kind}/`
    + `${iteratorProof.probe.kernel.violations} · kernel part ${iteratorProof.probe['kernel-part'].kind}/`
    + `${iteratorProof.probe['kernel-part'].violations} · crossing-file row ${iteratorProof.probe['crossing-row'].kind}/`
    + `${iteratorProof.probe['crossing-row'].violations} · foreign ${iteratorProof.probe.foreign.kind}/`
    + `${iteratorProof.probe.foreign.violations} · liveness take read as ${pushProof.liveKind}`);

  // ── THE INSTRUMENTS, PROVED LIVE BEFORE ANY `0` IS ASSERTED AGAINST THEM ───────────────────────────────
  assert.equal(iteratorState.live, true,
    'the forged iterator was not the one this realm answered: the iterator override never took, so its counter '
    + 'is not an instrument and its 0 is not a measurement');
  assert.ok(iteratorState.liveReads >= 1, 'the forged iterator was never taken, so its counter is not live');
  assert.equal(pushState.live, 0,
    'the push override answered something other than 0 for one append, so its counter is not an instrument');
  assert.ok(pushState.liveReads >= 1, 'the push override was never taken, so its counter is not live');

  // ── THE CONTROL'S DECLARED ANSWER, which every armed state must reproduce ──────────────────────────────
  assert.equal(control.raised, false,
    `the CONTROL: the construction's own drive must be ADMITTED; got ${JSON.stringify(control.failure)}`);
  assert.notEqual(control.record, null, 'the CONTROL: the write answers the three-member record');
  assert.ok(Array.isArray(control.record.watched) && control.record.watched.length > 0,
    'the CONTROL: the record\'s watch set names the registered handle\'s address, so it is NON-EMPTY — this is '
    + 'the state the two armed drives are compared against');
  assert.ok(Array.isArray(control.record.triggered) && control.record.triggered.length > 0,
    'the CONTROL: the store triggered the registered handle, so the record\'s trigger set is NON-EMPTY');
  assert.equal(control.fired.length, 1,
    `the CONTROL: the counting listener fires EXACTLY ONCE per trigger set; it fired ${control.fired.length} time(s)`);
  assert.equal(control.fired[0].argumentCount, 1,
    'the CONTROL: the invocation receives EXACTLY ONE argument — the triggering address (parameter-semantics.md '
    + '§2.12) — and not the matched handle');
  assert.deepEqual(control.fired[0].address, ['a', 'b'],
    'the CONTROL: the invocation\'s one argument is the triggering ADDRESS the store\'s record carries');
  assert.equal(control.settled, 'x', 'the CONTROL: the store\'s bytes settle at the value the write carried');

  // ── THE FRESHNESS LIMB: driven BEFORE the census below, so the red it may carry is not hidden by it ─────
  const second = crossingCall(() => control.store.write(drivenAddress, 'mem', 'x'));
  assert.equal(second.raised, false,
    `the freshness limb: the control's second identical write must be ADMITTED; got ${JSON.stringify(second.failure)}`);
  assert.equal(control.fired.length, 2,
    `the freshness limb: a second trigger set fires the registered listener again; it has fired ${control.fired.length} time(s)`);
  const firstArgument = control.fired[0].address;
  const secondArgument = control.fired[1].address;
  assert.notEqual(firstArgument, secondArgument,
    'the freshness limb: each invocation receives a FRESH array — the two invocations must not share one object');
  for (let f = 0; f < control.fired.length; f += 1) {
    const argument = control.fired[f].address;
    assert.ok(Array.isArray(argument), `the freshness limb: invocation ${f}'s argument is a dense array`);
    assert.equal(argument.length, 2, `the freshness limb: invocation ${f}'s argument carries both segments`);
    assert.ok(Object.hasOwn(argument, 0) && Object.hasOwn(argument, 1),
      `the freshness limb: invocation ${f}'s argument is DENSE — both indices are own properties`);
    assert.deepEqual(argument, ['a', 'b'], `the freshness limb: invocation ${f}'s argument is the triggering address`);
  }

  // ── EACH ARMED STATE, DRIVE BY DRIVE, COLLECTED AND REPORTED AS ONE CENSUS ────────────────────────────
  // One red names EVERY owed site (the discipline stated at this section's head), so a failing state never
  // hides the one behind it.
  const violations = [];
  for (let s = 0; s < states.length; s += 1) {
    const id = states[s].id;
    const seen = states[s].seen;
    if (seen.raised !== false) {
      violations[violations.length] = `${id}: the ADMISSION — the construction's own drive must answer the `
        + `record and not a throwable; it answered ${JSON.stringify(seen.failure)} (contract.md §2.1 F8-1, items `
        + '(1b) and (1c): a caller\'s one-liner may not turn an admitted write into a failure)';
    }
    if (seen.record === null) {
      violations[violations.length] = `${id}: the RECORD — no record crossed at all, so the reply\'s three `
        + 'declared members, the caller\'s answer, were withdrawn (PAR-JS-13)';
    } else {
      if (recordBytes(seen.record) !== recordBytes(control.record)) {
        violations[violations.length] = `${id}: the RECORD BYTES — op, watched and triggered are not the `
          + `control\'s: ${JSON.stringify(recordBytes(seen.record))} against ${JSON.stringify(recordBytes(control.record))}`;
      }
      if (seen.record.watched.length === 0) {
        violations[violations.length] = `${id}: the WATCH SET — emptied, so a no-op append at the write member\'s `
          + 'watch-set copy silently dropped it (F8-1, row 57)';
      }
      if (seen.record.triggered.length === 0) {
        violations[violations.length] = `${id}: the TRIGGER SET — emptied, so a no-op append at the record copy `
          + 'silently dropped it (F8-1, rows 55 and 59)';
      }
    }
    if (seen.fired.length !== 1) {
      violations[violations.length] = `${id}: the DELIVERY — the registered listener fired `
        + `${seen.fired.length} time(s) for one trigger set, and the dedupe set, the recipient append and the `
        + 'invocation loop are the delivery\'s own reads (F8-1, rows 58, 59 and 60)';
    } else if (seen.fired[0].argumentCount !== 1 || JSON.stringify(seen.fired[0].address) !== JSON.stringify(['a', 'b'])) {
      violations[violations.length] = `${id}: the INVOCATION — its one argument must be the triggering address `
        + `['a', 'b']; it received ${JSON.stringify(seen.fired[0].address)} with ${seen.fired[0].argumentCount} argument(s)`;
    }
    if (seen.settled !== 'x') {
      violations[violations.length] = `${id}: THE STORE\'S BYTES — the write must settle at 'x'; the settled `
        + `read answers ${JSON.stringify(seen.settled)}`;
    }
    // **THE NARROWED COUNTER** (`contract.md §2.1` F8-8, items `(2a)`, `(2d)`, `(2e)` and `(7b)`): the cell
    // asserts the GOVERNED sites' `0` and NOT a `0` over the process. The kernel's takes (row `66`) are excluded
    // and recorded on the routed counter, which this cell neither asserts present nor asserts absent.
    const counterViolations = crossingCounterViolations(id, seen.census);
    for (let v = 0; v < counterViolations.length; v += 1) {
      violations[violations.length] = counterViolations[v];
    }
  }
  assert.equal(violations.length, 0,
    `${violations.length} of this cell's armed states fail the law (contract.md §2.1 F8-1, items (1b)–(1e)), `
    + 'state by state:\n  ' + violations.join('\n  '));
});

// ── `JC-TC-65` — THE ARGUMENT AND CONSTRUCTION DRIVES ─────────────────────────────────────────────────────

test('JC-TC-65 the construction\'s arguments and its own seeding are not decided by a mutable prototype', { timeout: 120000 }, (t) => {
  // `test-cases.md` `JC-TC-65`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F8-2`, items
  // `(2a)`–`(2d)`; the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm `(xix)`,
  // whose inventory rows are `61`–`64`): **THE ARGUMENT AND CONSTRUCTION ENCODERS ARE ON THE GOVERNED PATH** —
  // `encodeTier`'s `tier.map` (row `61`), `encodeListeners`' and `encodeConstraints'` `.map` (rows `62`/`63`),
  // and `storeCreate`'s own `byHandle` `Map` with its `for … of` pair list (row `64`) — so a construction is
  // either ADMITTED with the declared state or REFUSED with its DECLARED CLASS, and never a raw host error.
  //
  // **THE DIRECTION IS `F-RA-3`'s ITEM `(3)` AND `contract.md §1`'s SAME CLAUSE**: *"a `TypeError` out of a
  // lawful construction"* is a DELETION IN THE CALLER'S REALM becoming a raw host failure at this package's
  // boundary — the one form `docs/specs/storeroom-js/surface.md §2.5` item 5 (e) declares a FINDING.
  //
  // **⟶ THE DRIVE LIST IS RE-DERIVED (`contract.md §2.1`'s clause of `2026-10-24` on `F8-8`, items `(7c)` and
  // `(2)`; `test-cases.md`'s clause of the same date, item `(2c)`): THIS CELL DRIVES THREE ARMING DRIVES, EACH
  // UNDER EACH OF THE ROW'S THREE OVERRIDES AND EACH BESIDE ITS UNARMED CONTROL AT THE SAME DRIVE —
  //   (D1) `storeCreate({ journalLength: 8, listeners: [] })` — `encodeListeners`' own walk at ZERO entries (where
  //        `[].map` is still a take of `Array.prototype.map` in the deletion state) and `storeCreate`'s own
  //        seeding walk at ZERO handles (where no `instance.listen` is called);
  //   (D2) `storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'k' }] })` —
  //        `encodeConstraints`' own walk at ONE entry and the carrier read under it; the element carries NO
  //        `constraint` function, so `carryConstraint` is not reached and NO `ROUTED` row is entered;
  //   (D3) `write(addr, ['mem', 'top'], 'x')` — an ARRAY tier, so `encodeTier`'s own limb is driven at TWO items
  //        and the crossed tier SET is asserted to carry both of them.
  // **AND THE LISTENER-BEARING CONSTRUCTION `storeCreate({ journalLength: 8, listeners: [{ handle: 'h', address:
  // ['a'] }] })` IS WITHDRAWN FROM THE ARMED STATES BY NAME: it enters inventory row `65`'s `ROUTED` mirror through
  // `storeCreate`'s own `instance.listen` call, so it is DRIVEN IN THE UNARMED CONTROL ONLY, where it is the
  // fixture — and (i) its REGISTRATION STATE IS NOT ASSERTED HERE (the seeded handle's standing and
  // `registerOn`'s reads are row `65`'s routed state and `U-STOREROOM-JS-SURFACE`'s), and (ii) its DELIVERY is
  // `JC-TC-64`'s subject, which registers its own counting listener and asserts it fires exactly once. So NO
  // SEEDED-HANDLE REGISTRATION AND NO CONSTRAINT-ADDRESS REGISTRATION IS ASSERTED BY THIS CELL, and nothing the
  // withdrawn drive would have witnessed is left unwitnessed.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (the row's three armed states beside the unarmed
  // CONTROL, at the three drives above):
  //
  // | The drive | Its declared answer |
  // | --- | --- |
  // | (D1) `storeCreate({ journalLength: 8, listeners: [] })` | an INSTANCE and NO RAW HOST ERROR; and — READ OUTSIDE THE FRAME, once the intrinsic is restored — that instance answers a lawful write (`write(['a'], 'mem', 1)` then `read` → `1`), which is this cell's instance proof |
  // | (D2) `storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'k' }] })` | an INSTANCE and NO RAW HOST ERROR; read OUTSIDE the frame, its read model is the CONTROL's (`constraints()` enumerates the pairs the entry carries, `surface.md §2.12` item 1; a well-formed pair carrying NO function is not registered at `K-1`, so this construction's declared state is the empty one) and its write answers the control's read-back |
  // | (D3) `write(['a'], ['mem', 'top'], 'x')` — an ARRAY tier, so `encodeTier`'s own limb is driven | the store's own `OutOfDomainTier` at the DECLARED bytes `'top' is not a tier, tiers are file, mem, temp`: the crossed tier SET CARRIES BOTH OF ITS ITEMS, and the answer names the OUT-OF-DOMAIN one rather than the set-level spelling `an array of tiers` a dropped item would produce |
  // | CONTROL-ONLY FIXTURE, never an armed drive: the listener-bearing construction, `register('h', fn)`, `write(['a'], 'mem', {})` and `write(['a', 'b'], 'mem', 'x')` | `register` answers `undefined` and the later write triggers the seeded handle exactly once — **ASSERTED HERE AS THE CONTROL'S FIXTURE AND NEVER AS ROW `65`'S REGISTRATION**, which is not this cell's |
  // | CONTROL-ONLY FIXTURE, never an armed drive: `constraints: [{ address: ['a', 0], id: 5 }]` | the store's own `ConstraintListInvalid` at the DECLARED bytes `'a'/0 is not a valid constraint entry in 'constraints', a constraint entry is an address and an id, and the address is a segment array` — the encoder's list reached the store with its element, and NO host error escaped |
  // | (i) `delete Array.prototype.map`, (ii) `Array.prototype[Symbol.iterator]` yielding NOTHING, (iii) `Array.prototype.push` answering `0` without copying — each at the THREE ARMING DRIVES above, each beside the unarmed CONTROL | EVERY construction RETURNS AN INSTANCE AND NO RAW HOST ERROR ESCAPES at any of the three drives; the crossed tier set carries both items; each drive's answer is BYTE-IDENTICAL to its unarmed control's; and the GOVERNED COUNTERS are `0`, the kernel's four takes (row `66`) EXCLUDED AND RECORDED |
  //
  // **TWO POINTS AT THE BYTES, REPORTED SO THEY ARE THE IMPLEMENTER'S AND NOT THE CELL'S:**
  //   * **`write` REFUSES A TIER SET BY ITS OWN ROW** (`src/args.rs`'s `write_tier`: *"exactly one token"* — a
  //     set answers `OutOfDomainTier`), so (D3) is an ARGUMENT-ENCODER drive and NOT an admission: the
  //     observable of *"the set carries both items"* is the store's own item-level spelling of `'top'`, which
  //     no dropped item and no emptied set can produce. **The cell asserts THAT spelling, and nothing about
  //     the tier domain moves here** (`contract.md §2.1`'s item `(2c)`: this clause re-decides no row of
  //     `TierArg`).
  //   * **⟶ AMENDED 2026-10-24 (`D-26` item 1, verbatim: *"The batch in cfg.constraints must supply
  //     functions"*) — THE ROW'S OWN CONSTRUCTION (D2) NOW CARRIES ITS `constraint` FUNCTION.** The bytes above
  //     recorded that it *"CARRIES NO `constraint` FUNCTION … so that construction's declared seeding has NO
  //     observable state of its own"* — and that state **HAS NO PRODUCER ON THIS ROUTE ANY MORE**: a
  //     functionless batch element is refused `ConstraintListInvalid` BEFORE ANY FILESYSTEM ACT (`B-1`), so the
  //    `(D2)` drive answered a refusal where the row's own table declares *"an INSTANCE and NO RAW HOST ERROR"*.
  //     **The function is supplied, `D-27` arms it, and the construction is an instance again** — item `(7c)`
  //     still withdraws the REGISTRATION assertion (the pair's delivery is not this cell's subject), and the
  //     fourth key's list crossing WHOLE stays asserted at the CONTROL'S OWN malformed-pair construction.**
  //
  // **WHAT THE SHIPPED TREE NOW ANSWERS, MEASURED AFTER ARMS `(xvii)`–`(xix)` AND THE KERNEL'S REVERT** (items
  // `(1a)`–`(1c)` of the clause): the three encoders' and the seeding walk's bytes stand, so the three drives
  // answer the control's bytes with no raw host error — **and the only residual takes the instrument sees are
  // the KERNEL'S, and this battery measured WHICH DRIVE MAKES THEM: (D1) and (D2) take NOTHING at all, and (D3)
  // takes exactly one, at `inDomainAddress` (`src/constraint-kernel.mjs:177`) while the drive's ADDRESS limb
  // crosses — before the tier limb refuses. That take is inventory row `66`'s routed state, is excluded from
  // every `0` above by attribution, and is printed in this cell's own routed census line with its file, line and
  // symbol.**
  // **THE LISTENER-BEARING CONSTRUCTION STILL FAILS INSIDE ROW `65` UNDER `delete Array.prototype.map` OR A
  // NO-OP `push` — and that state is `U-STOREROOM-JS-SURFACE`'s, is NOT asserted by this cell, and is NOT this
  // cell's to green** (item `(7c)`).
  const EMPTY_CFG = { journalLength: 8, listeners: [] };
  const LISTENERS_CFG = { journalLength: 8, listeners: [{ handle: 'h', address: ['a'] }] };
  // **⟶ `D-26`: the element carries its own function, because the element is THREE members.**
  //
  // **★ AND THAT MAKES THIS CELL RED ON TWO COUNTS THAT ARE THE CODE'S AND NOT THE CELL'S — REPORTED, NOT
  // DELETED (`D-31`'s OBSERVABLE-BUT-WRONG arm: *"KEEP IT RED and the code owes the fix"*).**
  //   1. **A RAW HOST ERROR ESCAPES A LAWFUL CONSTRUCTION UNDER `delete Array.prototype.map`.** With the
  //      function present, the construction ARMS the batch (`D-27`: *"Functions are armed"*), which reaches
  //      `carryConstraint` → `K-1` → `store.listen(id, set)` and the arming walk's own `.map` sites, so
  //      `storeCreate` throws `TypeError: addresses.map is not a function` — a HOST OBJECT out of a lawful
  //      construction, which `contract.md §2.1` `F8-2` items `(2a)`–`(2d)` and `§2.5` item `5 (e)` forbid.
  //   2. **A GOVERNED CROSSING SITE TAKES A MEMBER OF A MUTABLE PROTOTYPE.** Under a forged
  //      `Array.prototype[Symbol.iterator]` the census reports `GOVERNED index.mjs:5773 carryConstraint` — one
  //      take at a site the crossing's own governed set names, where `F8-8`'s items `(2a)`/`(2e)` allow zero.
  // **THE STATE HAD NO DRIVE BEFORE THIS PASS** because the as-filed `(D2)` fixture carried NO function, so
  // the arming loop never ran. **The latent defect is the batch route's, and `D-27` is what makes it
  // reachable: every `cfg.constraints` element is armed now, so every construction with a constraint list is
  // subject to both.** **NEITHER IS THIS CELL'S TO GREEN AND NEITHER MAY BE REMOVED** — the cell is right and
  // the code owes the fix.
  const CONSTRAINTS_CFG = {
    journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'k', constraint: () => true }],
  };
  const INVALID_PAIR_CFG = { journalLength: 8, listeners: [], constraints: [{ address: ['a', 0], id: 5 }] };
  const TIER_SET_ADDRESS = ['a'];
  const TIER_SET = ['mem', 'top'];
  const CONSTRAINT_LIST_INVALID = "'a'/0 is not a valid constraint entry in 'constraints', a constraint entry is an "
    + 'address and an id, and the address is a segment array';
  const OUT_OF_DOMAIN_TIER = "'top' is not a tier, tiers are file, mem, temp";
  // THE CELL'S OWN FIXTURES — the four `cfg` literals — are built BEFORE EVERY FRAME and are read by the package
  // INSIDE it: the construction IS this cell's subject, so no construction stands outside a frame EXCEPT the
  // instance (D3)'s array-tier write lands on, which is built BEFORE the frame because item `(7c)` makes that
  // drive the ENCODER'S and not a construction's.
  //
  // **THE CAPTURE TAKES NO MEMBER FROM `Array.prototype`** (no `.map`, no `.push`, no spread, no `for … of`):
  // every collection below is written and read by index, and every thrown value is classified by
  // `crossingFailure` rather than asserted inside the frame.
  const captureState = (tierStore, controlFixtures) => {
    const drives = {};
    const failures = [];
    const instances = { d1: null, d2: null };
    // **A DECLARED-CLASS REFUSAL IS DATA AND A RAW HOST ERROR IS A FINDING** (`crossingFailure` splits them): the
    // refusal occupies the drive's own answer, where it is compared byte-for-byte with the control's, and only a
    // HOST ERROR is collected as the finding `F8-2`'s item `(2c)` forbids.
    const refusalOr = (at, failure) => {
      if (failure !== null && failure.hostError === true) failures[failures.length] = { at, failure };
      return failure;
    };
    // (D1) THE EMPTY-LISTENERS CONSTRUCTION — `encodeListeners`' walk at zero entries and the seeding walk at
    // zero handles. The INSTANCE'S OWN PROOF is taken outside the frame, after the intrinsic is restored.
    const emptyMade = crossingCall(() => storeCreate(EMPTY_CFG));
    if (emptyMade.raised) drives.d1 = refusalOr('(D1) storeCreate({ journalLength: 8, listeners: [] })', emptyMade.failure);
    else {
      instances.d1 = emptyMade.answer;
      drives.d1 = 'instance';
    }
    // (D2) THE CONSTRAINTS CONSTRUCTION — `encodeConstraints`' own walk at ONE entry. NO registration is
    // asserted here (item `(7c)` withdraws it); the declared state read below is the CONTROL's.
    const constrainedMade = crossingCall(() => storeCreate(CONSTRAINTS_CFG));
    if (constrainedMade.raised) {
      drives.d2 = refusalOr('(D2) storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: [\'a\'], id: \'k\', constraint: () => true }] })', constrainedMade.failure);
    } else {
      instances.d2 = constrainedMade.answer;
      drives.d2 = 'instance';
    }
    // (D3) THE ARGUMENT ENCODER'S ARRAY-TIER DRIVE, on the instance built BEFORE the frame.
    const driven = crossingCall(() => tierStore.write(TIER_SET_ADDRESS, TIER_SET, 'x'));
    drives.d3 = driven.raised
      ? refusalOr('(D3) write([\'a\'], [\'mem\', \'top\'], \'x\') — encodeTier\'s array limb', driven.failure)
      : 'admitted';
    // ── THE TWO CONTROL-ONLY FIXTURES, DRIVEN IN THE UNARMED CONTROL AND NOWHERE ELSE (item `(7c)`) ──────
    // **THE LISTENER-BEARING CONSTRUCTION IS THE CONTROL'S FIXTURE.** It is NOT an armed drive: it enters row
    // `65`'s `ROUTED` mirror through `storeCreate`'s own `instance.listen` call, so its standing is another
    // owner's state. What is asserted here is the CONTROL's own seeding answer and its one delivery — and
    // **NOTHING about registration**, which this cell withdraws.
    let controlFixture = null;
    if (controlFixtures) {
      const listenersMade = crossingCall(() => storeCreate(LISTENERS_CFG));
      if (listenersMade.raised) {
        controlFixture = { listeners: refusalOr('(the control\'s fixture) the listener-bearing construction', listenersMade.failure) };
      } else {
        const store = listenersMade.answer;
        const fired = [];
        // THE BUCKET IS OPENED **BEFORE** THE FUNCTION IS REGISTERED, so the fixture's own write is silent and
        // the drive's write is the one invocation the fixture declares (`JC-TC-64`'s fixture states the same
        // reason).
        const opened = crossingCall(() => store.write(['a'], 'mem', {}));
        const registered = crossingCall(() => store.register('h', function countingListener(address) {
          fired[fired.length] = address;
        }));
        const one = crossingCall(() => store.write(['a', 'b'], 'mem', 'x'));
        controlFixture = {
          listeners: {
            register: registered.raised
              ? refusalOr('(the control\'s fixture) register(\'h\', fn)', registered.failure)
              : (registered.answer === undefined ? 'undefined' : String(registered.answer)),
            open: opened.raised ? refusalOr('(the control\'s fixture) the write at [\'a\']', opened.failure) : 'admitted',
            drive: one.raised
              ? refusalOr('(the control\'s fixture) the write at [\'a\', \'b\']', one.failure)
              : { fired: fired.length, triggered: one.answer.triggered.length },
          },
        };
      }
      // **THE FOURTH KEY'S LIST CROSSED WHOLE** — asserted at the control, where the encoder's list is
      // observable at the store's own declared bytes. `refusalOr` still collects a host error if one escapes.
      const invalidMade = crossingCall(() => storeCreate(INVALID_PAIR_CFG));
      controlFixture.invalidPair = invalidMade.raised
        ? refusalOr('(the control\'s fixture) constraints: [{ address: [\'a\', 0], id: 5 }]', invalidMade.failure)
        : 'constructed';
    }
    return { drives, failures, instances, controlFixture };
  };
  // **READ OUTSIDE EVERY FRAME, AFTER THE RESTORE** — the instances (D1) and (D2) returned are exercised through
  // the package's own members, so *"every construction RETURNS AN INSTANCE"* is proved by the instance ANSWERING
  // and not by a `typeof` read taken under an armed intrinsic.
  const instanceProof = (store) => {
    if (store === null || store === undefined) return null;
    const wrote = crossingCall(() => {
      store.write(['a'], 'mem', 1);
      return store.read(['a'], 'mem');
    });
    return wrote.raised ? wrote.failure : { write: wrote.answer };
  };
  const constraintsProof = (store) => {
    if (store === null || store === undefined) return null;
    const enumerated = crossingCall(() => store.constraints());
    const wrote = crossingCall(() => {
      store.write(['a'], 'mem', 'x');
      return store.read(['a'], 'mem');
    });
    return {
      enumeration: enumerated.raised ? enumerated.failure : JSON.stringify(enumerated.answer),
      write: wrote.raised ? wrote.failure : wrote.answer,
    };
  };
  const DELETE_MAP = () => ({
    target: Array.prototype,
    key: 'map',
    deleted: true,
    // LIVE MEANS: `Array.prototype.map` is GONE from this realm's arrays, and reading it is the host `TypeError`
    // the deletion is.
    liveness: () => {
      let threw = false;
      try {
        [1].map((value) => value);
      } catch (caught) {
        threw = caught instanceof TypeError;
      }
      return threw;
    },
  });
  const SKIPPING_ITERATOR = (counter) => ({
    target: Array.prototype,
    key: Symbol.iterator,
    descriptor: crossingOwnDescriptor(function* skippingIterator() {
      counter.take();
    }),
    // LIVE MEANS: the forged iterator is the one this realm's arrays answer, and it yields NOTHING.
    liveness: () => {
      const walk = ['x'][Symbol.iterator]();
      return walk.next().done === true;
    },
  });
  const NO_OP_PUSH = (counter) => ({
    target: Array.prototype,
    key: 'push',
    descriptor: crossingOwnDescriptor(function pushAnsweringZero() {
      counter.take();
      return 0;
    }),
    liveness: () => {
      const twin = [];
      twin.push('copied?');
      return twin.length;
    },
  });
  const states = [
    { id: 'CONTROL', armed: null },
    { id: '(i) delete Array.prototype.map', armed: DELETE_MAP },
    { id: '(ii) Array.prototype[Symbol.iterator] yielding nothing', armed: SKIPPING_ITERATOR },
    { id: '(iii) Array.prototype.push answering 0 without copying', armed: NO_OP_PUSH },
  ];
  const runs = [];
  for (let s = 0; s < states.length; s += 1) {
    const controlFixtures = states[s].armed === null;
    // **THE INSTANCE (D3)'S ARRAY-TIER WRITE LANDS ON IS BUILT BEFORE THE FRAME** (item `(7c)`: that drive is
    // `encodeTier`'s own limb, not a construction's), so the armed state drives the ENCODER and no seeding walk.
    const tierStore = storeCreate(EMPTY_CFG);
    const frame = crossingArmedFrame(states[s].armed, () => captureState(tierStore, controlFixtures));
    runs[s] = {
      id: states[s].id,
      live: frame.live,
      liveReads: frame.liveReads,
      // **THE NARROWED COUNTER'S CENSUS** (`contract.md §2.1` F8-8, item `(2d)`): `governed` is the only figure
      // asserted as `0`; the kernel's and the crossing's `ROUTED` rows' takes are excluded and recorded. The
      // DELETION state (`(i)`) has no wrapper and therefore no counter at all — its instrument is its liveness.
      census: frame.census,
      instrument: frame.instrument,
      prior: frame.prior,
      drives: frame.captured.drives,
      failures: frame.captured.failures,
      controlFixture: frame.captured.controlFixture,
      // THE INSTANCES' OWN PROOFS, READ OUTSIDE THE FRAME:
      instanceD1: instanceProof(frame.captured.instances.d1),
      instanceD2: constraintsProof(frame.captured.instances.d2),
    };
  }
  const control = runs[0];

  // ── THE RESTORE IS PROVED FIRST ─────────────────────────────────────────────────────────────────────────
  crossingAssertRestoredStructurally(runs[1].prior, Array.prototype, 'map', 'JC-TC-65 restore');
  crossingAssertRestoredStructurally(runs[2].prior, Array.prototype, Symbol.iterator, 'JC-TC-65 restore');
  crossingAssertRestoredStructurally(runs[3].prior, Array.prototype, 'push', 'JC-TC-65 restore');
  assert.equal(typeof Array.prototype.map, 'function',
    'the restore is proved behaviourally: Array.prototype.map is the intrinsic again');
  const mapped = [1, 2].map((value) => value * 2);
  assert.equal(mapped.length, 2, 'the restore is proved behaviourally: map answers one element per element');
  assert.equal(mapped.join(','), '2,4', 'the restore is proved behaviourally: map answers the doubles');
  assert.equal(JSON.stringify([...[1, 2]]), '[1,2]',
    'the restore is proved behaviourally: the intrinsic array iterator is back');
  const appended = [];
  appended.push(1);
  assert.equal(appended.length, 1, 'the restore is proved behaviourally: Array.prototype.push copies again');

  // ── THE NARROWED COUNTER'S INSTRUMENTS, PROVED BEFORE ANY `0` IS ASSERTED AGAINST THEM ─────────────────
  // **THE DELIBERATE PROBE** (`contract.md §2.1` F8-8, items `(2d)` and `(2e)`), taken for the two states that
  // carry a wrapper: a forged stack naming a GOVERNED site of the crossing's own file classifies GOVERNED and
  // FAILS the cell, the kernel's file and a crossing-file `ROUTED` row classify routed and answer no violation,
  // and the liveness take's REAL stack is read and read as unattributable. **State `(i)` is a DELETION and has no
  // wrapper to count** — its instrument is its liveness, which the restore proof above has already answered.
  const iteratorProof = crossingProveCounterAttribution('JC-TC-65 state (ii)', runs[2].instrument);
  const pushProof = crossingProveCounterAttribution('JC-TC-65 state (iii)', runs[3].instrument);
  // THE STATE-BY-STATE CENSUS, REPORTED AND NEVER ASSERTED: the GOVERNED figure is the only one the cell decides,
  // and the routed figures are recorded so a reader can see WHERE the takes came from.
  t.diagnostic(`JC-TC-65 (i) delete Array.prototype.map — no wrapper, so no census (the liveness is the instrument)`);
  t.diagnostic(`JC-TC-65 (ii) skipping iterator — ${crossingCensusRecord(runs[2].census)}`);
  t.diagnostic(`JC-TC-65 (iii) no-op push — ${crossingCensusRecord(runs[3].census)}`);
  t.diagnostic(`JC-TC-65 classifier proof — governed ${iteratorProof.probe.governed.kind}/`
    + `${iteratorProof.probe.governed.violations} violation(s) · kernel ${iteratorProof.probe.kernel.kind}/`
    + `${iteratorProof.probe.kernel.violations} · kernel part ${iteratorProof.probe['kernel-part'].kind}/`
    + `${iteratorProof.probe['kernel-part'].violations} · crossing-file row ${iteratorProof.probe['crossing-row'].kind}/`
    + `${iteratorProof.probe['crossing-row'].violations} · foreign ${iteratorProof.probe.foreign.kind}/`
    + `${iteratorProof.probe.foreign.violations} · liveness take read as ${pushProof.liveKind}`);

  // ── THE INSTRUMENTS, PROVED LIVE BEFORE ANY `0` IS ASSERTED AGAINST THEM ───────────────────────────────
  // ── THE INSTRUMENTS, PROVED LIVE BEFORE ANY `0` IS ASSERTED AGAINST THEM ───────────────────────────────
  assert.equal(runs[1].live, true, '(i): Array.prototype.map was still callable after the deletion, so the '
    + 'deletion never took and its drive is not a measurement');
  assert.equal(runs[2].live, true, '(ii): the forged iterator did not yield nothing, so the override never took');
  assert.ok(runs[2].liveReads >= 1, '(ii): the forged iterator was never taken, so its counter is not live');
  assert.equal(runs[3].live, 0, '(iii): the push override answered something other than 0 or copied a member');
  assert.ok(runs[3].liveReads >= 1, '(iii): the push override was never taken, so its counter is not live');

  // ── THE CONTROL'S DECLARED ANSWER, drive by drive ─────────────────────────────────────────────────────
  assert.equal(control.failures.length, 0,
    `the CONTROL: no drive may fail at an unmutated tree; ${control.failures.length} did:\n  `
    + JSON.stringify(control.failures));
  assert.equal(control.drives.d1, 'instance',
    'the CONTROL, drive (D1): the empty-listeners construction RETURNS AN INSTANCE');
  assert.deepEqual(control.instanceD1, { write: 1 },
    'the CONTROL, drive (D1): the instance the construction returned answers a lawful write and its read-back '
    + '(read OUTSIDE the frame, so no armed intrinsic decides the proof)');
  assert.equal(control.drives.d2, 'instance',
    'the CONTROL, drive (D2): the constraints construction RETURNS AN INSTANCE');
  assert.equal(typeof control.instanceD2.enumeration, 'string',
    'the CONTROL, drive (D2): the instance\'s read model is enumerable through the package\'s own member');
  assert.equal(control.instanceD2.write, 'x',
    'the CONTROL, drive (D2): the constraints instance\'s write answers its read-back');
  // **THE CONTROL'S OWN FIXTURE, AND NOT THIS CELL'S ASSERTION ABOUT REGISTRATION** (item `(7c)`): the
  // listener-bearing construction is driven ONLY here, so its own declared answer is pinned as the control's
  // — and **NO seeded-handle registration and NO constraint-address registration is asserted by this cell.**
  assert.equal(control.controlFixture.listeners.register, 'undefined',
    'the CONTROL\'S FIXTURE: `register` of the fixture\'s own counting function answers `undefined` '
    + '(surface.md §2.4 item 5 (b)) — the FIXTURE\'s answer, not a registration state this cell asserts');
  assert.equal(control.controlFixture.listeners.open, 'admitted',
    'the CONTROL\'S FIXTURE: the fixture\'s write at [\'a\'] is admitted');
  assert.deepEqual(control.controlFixture.listeners.drive, { fired: 1, triggered: 1 },
    'the CONTROL\'S FIXTURE: the fixture\'s later write at [\'a\', \'b\'] triggers its counting listener EXACTLY '
    + 'ONCE and the record carries it (the delivery itself is JC-TC-64\'s subject)');
  assert.equal(control.controlFixture.invalidPair.hostError, false,
    'the CONTROL\'S FIXTURE, the fourth key: the invalid pair is refused by the package\'s own form and not by a '
    + 'raw host error');
  assert.equal(control.controlFixture.invalidPair.status, 'ConstraintListInvalid',
    'the CONTROL\'S FIXTURE, the fourth key: the list reaches the store WHOLE and the store answers its own '
    + 'declared class — an encoder that dropped the element would construct an instance with nothing to refuse');
  assert.equal(control.controlFixture.invalidPair.message, CONSTRAINT_LIST_INVALID,
    'the CONTROL\'S FIXTURE, the fourth key: the store\'s declared bytes, which name the element the encoder carried');
  assert.notEqual(control.drives.d3, 'admitted',
    'the CONTROL, drive (D3): a tier SET is refused by the write verb\'s own row (exactly one token), so this '
    + 'drive\'s declared answer is a REFUSAL and not an admission');
  assert.equal(control.drives.d3.status, 'OutOfDomainTier',
    'the CONTROL, drive (D3): the array tier crosses as a SET and the store answers its own out-of-domain class');
  assert.equal(control.drives.d3.message, OUT_OF_DOMAIN_TIER,
    'the CONTROL, drive (D3): the crossed tier set CARRIES BOTH OF ITS ITEMS, and the store\'s answer names the '
    + 'OUT-OF-DOMAIN one — a dropped item would answer the set-level spelling `an array of tiers`');

  // ── EACH ARMED STATE, DRIVE BY DRIVE, COLLECTED AND REPORTED AS ONE CENSUS ────────────────────────────
  // One red names EVERY owed site (this section's stated discipline), drive by drive and state by state.
  const violations = [];
  for (let s = 1; s < runs.length; s += 1) {
    const id = runs[s].id;
    const seen = runs[s];
    for (let f = 0; f < seen.failures.length; f += 1) {
      violations[violations.length] = `${id}: a RAW HOST ERROR escaped at ${seen.failures[f].at} — `
        + `${JSON.stringify(seen.failures[f].failure)}. No host object may escape a lawful construction or a `
        + 'lawful verb (contract.md §2.1 F8-2, items (2a)–(2d); §2.5 item 5 (e))';
    }
    if (JSON.stringify(seen.drives) !== JSON.stringify(control.drives)) {
      violations[violations.length] = `${id}: the CONSTRUCTION'S DECLARED STATE is not the control's — got `
        + `${String(JSON.stringify(seen.drives)).slice(0, 400)} against `
        + `${String(JSON.stringify(control.drives)).slice(0, 400)}`;
    }
    // **EVERY CONSTRUCTION RETURNS AN INSTANCE** (item `(2d)` of the re-derived row): the proof is the INSTANCE
    // ANSWERING, read outside the frame, and it must be the control's byte-identically.
    if (seen.instanceD1 !== null && JSON.stringify(seen.instanceD1) !== JSON.stringify(control.instanceD1)) {
      violations[violations.length] = `${id}: the INSTANCE (D1) — the construction's returned instance does not `
        + `answer the control's write and read-back: ${JSON.stringify(seen.instanceD1)} against `
        + `${JSON.stringify(control.instanceD1)}`;
    }
    if (seen.instanceD2 !== null && JSON.stringify(seen.instanceD2) !== JSON.stringify(control.instanceD2)) {
      violations[violations.length] = `${id}: the INSTANCE (D2) — the construction's read model or write is not `
        + `the control's: ${JSON.stringify(seen.instanceD2)} against ${JSON.stringify(control.instanceD2)}`;
    }
    // **THE NARROWED COUNTER** (`contract.md §2.1` F8-8, items `(2a)`, `(2d)`, `(2e)` and `(7c)`): the cell
    // asserts the GOVERNED sites' `0` and NOT a `0` over the process; the kernel's takes (row `66`) are excluded
    // and recorded, and this cell neither asserts them present nor asserts them absent.
    const counterViolations = crossingCounterViolations(id, seen.census);
    for (let v = 0; v < counterViolations.length; v += 1) {
      violations[violations.length] = counterViolations[v];
    }
  }
  assert.equal(violations.length, 0,
    `${violations.length} of this cell's states fail the law (contract.md §2.1 F8-2, items (2a)–(2d)), drive by `
    + 'drive:\n  ' + violations.join('\n  '));
});

// ── `JC-TC-66` — ROW `(a)`'S ADMITTED SIDE ────────────────────────────────────────────────────────────────

test('JC-TC-66 an admitted crossing crosses byte-identically under a forged array iterator', { timeout: 120000 }, (t) => {
  // `test-cases.md` `JC-TC-66`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F8-1` and `F8-2`;
  // the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm `(xviii)`, with
  // `JC-TC-64`'s own): **THE BATTERY'S THREE `(a)` DRIVES ARE ALL REFUSALS — this cell drives the ADMITTED side,
  // where the reply's record copy is reached and the shipped `crossTriggered` throws.** A forged array iterator
  // decides NO CROSSED MEMBER: the tree the caller reads back is the CONTROL's, byte for byte.
  //
  // **⟶ AND THE COUNTER IS RE-DERIVED IN THE NARROWED FORM (`contract.md §2.1`'s clause of `2026-10-24` on
  // `F8-8`, items `(2a)`, `(2d)`, `(2e)` and `(7d)`; `test-cases.md`'s clause of the same date, item `(2d)`): the
  // `0` this cell asserts is the CROSSING'S OWN GOVERNED SITES' `0`, in item `(2e)`'s CONJUNCTION with the two
  // crossed trees. The kernel's three iteration takes (row `66`: `:177`, `:1460`, `:1729`) are EXCLUDED and
  // RECORDED on the cell's routed counter, as are the row `65` sites its own fixture enters — `storeCreate` and
  // `register` stand BEFORE the override is armed (item `(7d)`), so the mirror is not entered under an armed
  // state here either — and **this cell asserts NOTHING about the kernel's takes, present or absent** (item
  // `(3d)`), and nothing about what the process does outside the crossing's own file.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (two admitted values, each on its own listener-bearing
  // construction, each beside the unarmed CONTROL at the same write):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | CONTROL, drive 1 — `write(['a'], 'mem', { a: 1, b: [1, 2] })` on `storeCreate({ journalLength: 8, listeners: [{ handle: 'h', address: ['a'] }] })` with `register('h', fn)` | the write ADMITTED; `read(['a'], 'mem')` answers `{ a: 1, b: [1, 2] }` with MEMBER ORDER preserved; the record's trigger set is NON-EMPTY |
  // | CONTROL, drive 2 — `write(['a'], 'mem', [1, 'x', false])` on the same construction | the write ADMITTED; `read` answers `[1, 'x', false]` with ARRAY ORDER preserved; the record's trigger set is NON-EMPTY |
  // | (i) `Array.prototype[Symbol.iterator]` replaced by the generator that yields EXACTLY the standard `Object.prototype` name set, ARMED AFTER the fixtures are built | BOTH WRITES ADMITTED, BOTH COMPLETING WITH NO RAW HOST ERROR, and each crossed tree BYTE-IDENTICAL to the CONTROL's — so the forged iterator decides no crossed member; the GOVERNED COUNTER `0`, the kernel's iteration takes EXCLUDED and RECORDED |
  //
  // **THE RECORD'S OWN `triggered` AND THE LISTENER'S INVOCATION COUNT ARE `JC-TC-64`'S SUBJECT** and are asserted
  // here only for NON-EMPTINESS (the row's own closing sentence). **WHAT THE SHIPPED TREE NOW ANSWERS, MEASURED:**
  // arm `(xviii)`'s bytes stand, so both writes are admitted, both trees cross byte-identically and no host error
  // escapes — **and every residual take is the KERNEL'S: THREE per admitted write, measured as `inDomainAddress`
  // (`:177`), `evaluate` (`:1460`) and `releasePending` (`:1729`) — six in all for the two writes, which is
  // inventory row `66`'s routed state and another unit's. They are excluded from the governed `0` by attribution
  // and printed by line and symbol in this cell's own routed census line** (items `(1a)`–`(1c)` and `(2d)` of the
  // clause).
  //
  // **AND THE FORGERY IS THE BATTERY'S OWN** (`JC-TC-63`'s row `(a)`): the standard `Object.prototype` name set,
  // so the iterator the crossing would read is a plausible-looking list and not a hostile one — the point is that
  // it decides NOTHING.
  const STANDARD_OBJECT_PROTO_NAMES = [
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    '__proto__',
    'toLocaleString',
  ];
  const VALUES = [{ a: 1, b: [1, 2] }, [1, 'x', false]];
  const DECLARED_TREES = ['{"a":1,"b":[1,2]}', '[1,"x",false]'];
  // THE FIXTURE — one listener-bearing construction per drive, with the counting listener registered BEFORE the
  // frame, so the reply's record is non-empty and the cell is REACHED at all.
  const fixture = () => {
    const store = storeCreate({ journalLength: 8, listeners: [{ handle: 'h', address: ['a'] }] });
    const fired = [];
    store.register('h', function countingListener(address) {
      fired[fired.length] = address;
    });
    return { store, fired };
  };
  const runState = (armed) => {
    const fixtures = [];
    for (let i = 0; i < VALUES.length; i += 1) fixtures[i] = fixture();
    const frame = crossingArmedFrame(armed, () => {
      const driven = [];
      for (let i = 0; i < VALUES.length; i += 1) {
        const call = crossingCall(() => fixtures[i].store.write(['a'], 'mem', VALUES[i]));
        driven[i] = {
          raised: call.raised,
          failure: call.failure,
          triggered: call.raised ? null : call.answer.triggered.length,
          watched: call.raised ? null : call.answer.watched.length,
        };
      }
      return driven;
    });
    const reads = [];
    for (let i = 0; i < VALUES.length; i += 1) {
      const read = crossingCall(() => fixtures[i].store.read(['a'], 'mem'));
      reads[i] = read.raised ? read.failure : JSON.stringify(read.answer);
    }
    return {
      live: frame.live,
      liveReads: frame.liveReads,
      // **THE NARROWED COUNTER'S CENSUS** (`contract.md §2.1` F8-8, item `(2d)`): `governed` is the only
      // figure asserted as `0`; every take the kernel or a `ROUTED` row made is excluded and recorded.
      census: frame.census,
      instrument: frame.instrument,
      prior: frame.prior,
      driven: frame.captured,
      reads,
      fired: fixtures[0].fired.length,
    };
  };
  const FORGED_ITERATOR = (counter) => ({
    target: Array.prototype,
    key: Symbol.iterator,
    descriptor: crossingOwnDescriptor(function* forgedIterator() {
      counter.take();
      for (let i = 0; i < STANDARD_OBJECT_PROTO_NAMES.length; i += 1) yield STANDARD_OBJECT_PROTO_NAMES[i];
    }),
    // LIVE MEANS: the forged iterator is the one this realm's arrays answer, and it yields the standard names.
    liveness: () => {
      const walk = ['x'][Symbol.iterator]();
      const first = walk.next();
      return first.done === false && first.value === STANDARD_OBJECT_PROTO_NAMES[0];
    },
  });
  const control = runState(null);
  const armed = runState(FORGED_ITERATOR);

  // ── THE RESTORE IS PROVED FIRST ─────────────────────────────────────────────────────────────────────────
  crossingAssertRestoredStructurally(armed.prior, Array.prototype, Symbol.iterator, 'JC-TC-66 restore');
  assert.equal(JSON.stringify([...['a', 'b']]), '["a","b"]',
    'the restore is proved behaviourally: the intrinsic array iterator is back');
  assert.equal([1, 2].length, 2, 'the restore is proved behaviourally: arrays still answer their own length');
  assert.equal([...[1, 2]].join(','), '1,2', 'the restore is proved behaviourally: iteration yields both elements');

  // ── THE NARROWED COUNTER'S INSTRUMENT, PROVED BEFORE ANY `0` IS ASSERTED AGAINST IT ────────────────────
  // **THE DELIBERATE PROBE** (`contract.md §2.1` F8-8, items `(2d)` and `(2e)`): a forged stack naming a
  // GOVERNED site of the crossing's own file classifies GOVERNED and FAILS the cell, the kernel's file and a
  // crossing-file `ROUTED` row classify routed and answer no violation, and the liveness take's REAL stack is
  // read and read as unattributable. Nothing is mutated and nothing is reverted by the probe.
  const proof = crossingProveCounterAttribution('JC-TC-66', armed.instrument);
  t.diagnostic(`JC-TC-66 forged iterator — ${crossingCensusRecord(armed.census)}`);
  t.diagnostic(`JC-TC-66 classifier proof — governed ${proof.probe.governed.kind}/`
    + `${proof.probe.governed.violations} violation(s) · kernel ${proof.probe.kernel.kind}/`
    + `${proof.probe.kernel.violations} · kernel part ${proof.probe['kernel-part'].kind}/`
    + `${proof.probe['kernel-part'].violations} · crossing-file row ${proof.probe['crossing-row'].kind}/`
    + `${proof.probe['crossing-row'].violations} · foreign ${proof.probe.foreign.kind}/`
    + `${proof.probe.foreign.violations} · liveness take read as ${proof.liveKind}`);

  // ── THE INSTRUMENT, PROVED LIVE BEFORE ANY `0` IS ASSERTED AGAINST IT ──────────────────────────────────
  assert.equal(armed.live, true,
    'the forged iterator was not the one this realm answered, so its counter is not an instrument and its 0 is '
    + 'not a measurement');
  assert.ok(armed.liveReads >= 1, 'the forged iterator was never taken, so its counter is not live');

  // ── THE CONTROL'S DECLARED ANSWER ──────────────────────────────────────────────────────────────────────
  for (let i = 0; i < VALUES.length; i += 1) {
    assert.equal(control.driven[i].raised, false,
      `the CONTROL, drive ${i + 1}: the write must be ADMITTED; got ${JSON.stringify(control.driven[i].failure)}`);
    assert.equal(control.reads[i], DECLARED_TREES[i],
      `the CONTROL, drive ${i + 1}: read answers the crossed tree with order preserved`);
    assert.ok(control.driven[i].triggered > 0,
      `the CONTROL, drive ${i + 1}: the record's trigger set is NON-EMPTY, so the drive REACHES the record copy`);
  }

  // ── THE ARMED STATE, DRIVE BY DRIVE, COLLECTED AND REPORTED AS ONE CENSUS ──────────────────────────────
  const violations = [];
  for (let i = 0; i < VALUES.length; i += 1) {
    if (armed.driven[i].raised !== false) {
      violations[violations.length] = `drive ${i + 1} (${DECLARED_TREES[i]}): the write the walk ADMITS must `
        + `complete with NO RAW HOST ERROR — it answered ${JSON.stringify(armed.driven[i].failure)}. An array `
        + 'iterator may decide NO crossed member (contract.md §2.1 F8-1, items (1b) and (1c); F8-2)';
      continue;
    }
    if (armed.reads[i] !== control.reads[i]) {
      violations[violations.length] = `drive ${i + 1}: the crossed tree is not BYTE-IDENTICAL to the control's — `
        + `${JSON.stringify(armed.reads[i])} against ${JSON.stringify(control.reads[i])}`;
    }
    if (armed.driven[i].triggered === 0) {
      violations[violations.length] = `drive ${i + 1}: the record's trigger set emptied (its members are `
        + 'JC-TC-64\'s subject and are asserted here only for non-emptiness)';
    }
  }
  // **THE NARROWED COUNTER** (`contract.md §2.1` F8-8, items `(2a)`, `(2d)` and `(2e)`): the cell asserts the
  // GOVERNED sites' `0` and NOT a `0` over the process; the kernel's takes (row `66`) are excluded and recorded
  // and this cell neither asserts them present nor asserts them absent.
  const counterViolations = crossingCounterViolations('row (a)\'s admitted drive', armed.census);
  for (let v = 0; v < counterViolations.length; v += 1) {
    violations[violations.length] = counterViolations[v];
  }
  assert.equal(violations.length, 0,
    `${violations.length} of row (a)\'s admitted drives fail the law (contract.md §2.1 F8-1, items (1b) and `
    + '(1c)), drive by drive:\n  ' + violations.join('\n  '));
});

// ── `JC-TC-67` — THE DISTINCT-LEAF COST WITNESS ──────────────────────────────────────────────────────────

/// The child driver behind `JC-TC-67`'s DISTINCT-LEAF COST WITNESS. **It reaches the package through the claimed
/// ESM entry** (`acceptance.md §4.1` item 1) for the reason `JC-TC-60`'s and `JC-TC-62`'s drivers do: the scratch
/// file stands under this package's own tree, so its bare `provident-storeroom` specifier resolves by the
/// package's own `package.json` to the same entry this file imports. **It is a SEPARATE driver and NOT a state of
/// either driver above** — those cells' drivers are their own and this pass leaves their bytes alone.
///
/// It builds the clause's OWN witness at the clause's OWN figure (`contract.md §2.1` on `F8-3`, items `(3a)`–`(3b)`):
/// `125,000` DISTINCT leaves — a FRESH `Object.setPrototypeOf([], null)` per position, so every element's memo
/// consultation costs its own growing list — at row `8`'s DEPTH arm (`127` links), beside the CONTROL, the same
/// `125,000` positions over ONE repeated PRIMITIVE leaf, which consults no memo at all. The construction stands
/// OUTSIDE the timed region, so the figure printed is the crossing's cost and not the fixture's. One JSON line is
/// printed: the elapsed milliseconds of the `write` call ALONE, and the refusal's `status` and `message`.
const DISTINCT_LEAF_CHILD_SOURCE = `import { storeCreate } from "${ENTRY_URL}";
const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
const LEAF_COUNT = 125000;
let value;
if (process.argv[2] === 'distinct-leaves') {
  const leaves = [];
  for (let i = 0; i < LEAF_COUNT; i += 1) leaves[leaves.length] = Object.setPrototypeOf([], null);
  value = arrayChain(leaves, 127);
} else {
  value = arrayChain(new Array(LEAF_COUNT).fill('k'), 127);
}
const started = Date.now();
let thrown = null;
try {
  storeCreate({ journalLength: 8, listeners: [] }).write(['v'], 'mem', value);
} catch (caught) {
  thrown = caught;
}
const elapsedMs = Date.now() - started;
process.stdout.write(JSON.stringify({
  state: process.argv[2],
  elapsedMs,
  status: thrown === null ? null : thrown.status,
  message: thrown === null ? null : thrown.message,
}) + '\\n');
`;

/// Run one state of `DISTINCT_LEAF_CHILD_SOURCE` and answer `{timedOut, killedAt, answer}` — `timedOut` where the
/// child was still running at `WALL_CLOCK_CEILING_MS + 2000` ms and was KILLED, so a regression REPORTS instead of
/// stalling the suite (`JC-TC-60`'s and `JC-TC-62`'s own discipline). The scratch directory is removed in a
/// `finally` whether or not the drive finished.
function boundedDistinctLeafDrive(state) {
  const dir = mkdtempSync(join(TEST_DIR, '.jc-tc-67-'));
  const driver = join(dir, 'drive.mjs');
  const killedAt = WALL_CLOCK_CEILING_MS + 2000;
  try {
    writeFileSync(driver, DISTINCT_LEAF_CHILD_SOURCE, 'utf8');
    let out = null;
    let timedOut = false;
    try {
      out = execFileSync(process.execPath, [driver, state], {
        encoding: 'utf8',
        cwd: dir,
        timeout: killedAt,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (caught) {
      if (caught && (caught.code === 'ETIMEDOUT' || caught.signal === 'SIGTERM')) timedOut = true;
      else throw caught;
    }
    return { timedOut, killedAt, answer: out === null ? null : JSON.parse(out.trim().split('\n').pop()) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('JC-TC-67 the memo consultation and the path are charged, so a caller no longer sets the price of a refusal', { timeout: 180000 }, () => {
  // `test-cases.md` `JC-TC-67`, added 2026-10-24 (`contract.md §2.1`'s clause of this date on `F8-3`, items
  // `(3a)`–`(3d)`; the owed bytes are `implementation-plan.md §2` step `4`'s clause of this date, arm
  // `(xvii)` widened): **THE COST UNIT CHARGES THE TWO CALLER-SCALED IDENTITY LOOPS IT CHARGED NOTHING — the
  // memo consultation is charged `1 + memo.length` and the path `1` per entry it carries — so the `1 + 2 + … +
  // 125,000 ≈ 7.8×10⁹` identity comparisons the shipped readers perform INSIDE ONE `1,000,000`-unit call are
  // never taken, and the budget exhausts near the `1,400`th leaf.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (the row's witness beside its control, both at row `8`'s
  // DEPTH arm at `127` segments):
  //
  // | The state | Its declared answer |
  // | --- | --- |
  // | THE WITNESS — `125,000` DISTINCT `Object.setPrototypeOf([], null)` leaves, in `arrayChain(leaves, 127)` | row `8`'s class spelling `a value over the walk ceiling` at the depth arm's own `127`-segment position, and THE WHOLE REFUSAL COMPLETING WITHIN A WALL-CLOCK CEILING OF `5` SECONDS |
  // | THE CONTROL — the same `125,000` positions over ONE repeated PRIMITIVE leaf (`new Array(125_000).fill('k')`) | the SAME class spelling at the SAME position inside the SAME ceiling, with the refused array's OWN JOIN rendered byte-identically — so the cell proves the cost was the MEMO and not the fan-out |
  //
  // **NO CELL MAY ASSERT A COUNT OF IDENTITY COMPARISONS, OF MEMO ENTRIES, OF READS OR OF ANYTHING ELSE
  // INSTRUMENTED** (item `(3d)`): the answer and the bound are the two observables this cell has, and `NODE_CEILING`
  // (`1,000,000`) stays the ONE figure. **AND THE FIGURE IS NOT RE-MINTED HERE**: the ceiling is the walk's own, and
  // a second ceiling would be a second law.
  //
  // **THE SHIPPED TREE IS RED BY COST AT THE ROW'S OWN FIGURE** (measured at this pass's read: the witness
  // `~6.5 s` against the `5 s` ceiling, the control `~0.2 s`), and at figures below `125,000` it is red by ANSWER
  // as well — the subject it renders there is `'an Array'` and not the class spelling. **THE GREEN LANDS WHEN THE
  // MEMO CONSULTATION IS CHARGED `1 + memo.length` AND THE PATH `1` PER ENTRY.**
  const ROW_8 = 'a value over the walk ceiling';
  const LEAF_COUNT = 125_000;
  const deepPath = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  // (0) THE ONE FIGURE, PINNED BEFORE ANY DRIVE: the cost unit's budget is `NODE_CEILING` itself and NO SECOND
  // FIGURE IS MINTED (item `(3c)`), so a passing implementation cannot move the boundary this cell pins by
  // minting one.
  assert.equal(NODE_CEILING, 1_000_000,
    'the walk\'s budget is the one declared figure, `1,000,000` (contract.md §8 row 8 / parameter-semantics.md §1 '
    + 'row 8, as re-derived by A149)');
  // THE CONTROL'S OWN RENDERING, built here so the asserted subject is the array's own join and not a summary
  // of it: `125,000` repetitions of `'k'` joined by `','` — `249,999` characters.
  const controlJoin = new Array(LEAF_COUNT).fill('k').join(',');
  assert.equal(controlJoin.length, 2 * LEAF_COUNT - 1,
    'the control\'s declared subject is the refused array\'s own join, one separator per adjacent pair');

  // THE CONTROL FIRST: it is the cheap drive, and it proves the witness's shape is the depth arm and not another
  // refusal — so a red below is the MEMO's cost and not a mis-built fixture.
  const control = boundedDistinctLeafDrive('repeated-primitive-leaf');
  assert.equal(control.timedOut, false,
    `the CONTROL did not complete inside ${control.killedAt} ms and was KILLED — the primitive leaves consult no `
    + 'memo, so this is a stalled fan-out and not the cost unit (item (3a))');
  assert.equal(control.answer.status, STATUS,
    `the CONTROL must answer ${STATUS}; got ${JSON.stringify(control.answer.status)}`);
  assertDeclaredMessage(control.answer, declaredRefusal(controlJoin, ROW_8, deepPath),
    'the CONTROL: the same fan-out over one repeated primitive leaf renders the refused array\'s own join '
    + 'byte-identically at row 8\'s depth arm');
  assert.ok(control.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the CONTROL must complete inside ${WALL_CLOCK_CEILING_MS} ms; it took ${control.answer.elapsedMs} ms`);

  // AND THE WITNESS.
  const witness = boundedDistinctLeafDrive('distinct-leaves');
  assert.equal(witness.timedOut, false,
    `the WITNESS did not complete inside ${witness.killedAt} ms and was KILLED — a caller-scaled identity loop `
    + 'inside ONE 1,000,000-unit call is the defect this cell drives (F8-3, items (3a)–(3c))');
  assert.equal(witness.answer.status, STATUS,
    `the WITNESS must answer ${STATUS}; got ${JSON.stringify(witness.answer.status)}`);
  assertDeclaredMessage(witness.answer, declaredRefusal(ROW_8, ROW_8, deepPath),
    'the WITNESS: the budget is spent on the memo consultations, the guard answers "caller code is reachable", '
    + 'and row 8\'s class spelling is the answer at the depth arm\'s own position');
  assert.ok(witness.answer.elapsedMs <= WALL_CLOCK_CEILING_MS,
    `the WITNESS must complete the WHOLE refusal inside ${WALL_CLOCK_CEILING_MS} ms; it took `
    + `${witness.answer.elapsedMs} ms. The memo consultation is charged \`1 + memo.length\` and the path \`1\` per `
    + 'entry, so the budget exhausts near the 1,400th leaf and the shipped ~7.8×10⁹ identity comparisons are '
    + 'never taken (contract.md §2.1 F8-3, items (3a) and (3b))');
});
