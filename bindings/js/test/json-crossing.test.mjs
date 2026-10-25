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

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

import { storeCreate } from 'provident-storeroom';
import { commit as kernelCommit, runAttempt } from '../src/constraint-kernel.mjs';

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
  const text = readFileSync(new URL('../Cargo.toml', import.meta.url), 'utf8');
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

// ── THE SIXTEEN REFUSALS ────────────────────────────────────────────────────────────────────────────

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
  const dir = new URL('.', import.meta.url);
  const carrierLiterals = [
    "{ k: 's', v: opId }",
    "{ k: 's', v: 'extra' }",
  ];
  const hits = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.test.mjs') || name === 'json-crossing.test.mjs') continue;
    let text = readFileSync(new URL(name, dir), 'utf8');
    for (const literal of carrierLiterals) text = text.split(literal).join('');
    for (const match of text.matchAll(/\{\s*k:\s*['"](?:s|b|n|g|F|z|u|a|o|c|P|H|y)['"]/g)) {
      hits.push(`${name}:${match.index}`);
    }
  }
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
  assert.ok(/napi\s*=.*serde-json/.test(readFileSync(new URL('../Cargo.toml', import.meta.url), 'utf8')),
    'napi carries the serde-json feature');
});

test('JC-TC-47 no fifth dependency entry is admitted', () => {
  assert.ok(cargoDependencies().length <= 4, 'no fifth direct dependency');
});

test('JC-TC-48 the store set is 17 with ValueRefusedAtBoundary at rank 17', () => {
  const text = readFileSync(new URL('../../../src/error.rs', import.meta.url), 'utf8');
  assert.match(text, /CODES:\s*\[&str;\s*17\]/);
  assert.ok(text.includes('ValueRefusedAtBoundary'));
});
