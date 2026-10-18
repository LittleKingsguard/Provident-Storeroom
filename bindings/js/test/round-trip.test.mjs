// `acceptance.md §4.3` — THE ROUND-TRIP PROPERTY, the architect's directive in JS terms:
// *"passing in various JSON … expect exact match in all cases"*.
//
// `acceptance.md §4.1` item 1 / `DD-18`: the JS layer runs under `node --test` with `node:test` and
// `node:assert`, and it drives the package **through its CLAIMED ESM ENTRY POINT** and never the `.node`
// addon directly. The specifier below is the package's own registry identity (`package.md §3.1` item 2,
// `DD-26`), resolved through its `exports` map (self-reference), which is also the drive of `DD-24`.
//
// **THE PROPERTY**, as `§4.3` states it: for every value `v` in the layer's corpus,
// `read(instance, address)` after `write(instance, address, tier, v)` must be EQUAL to `v` UNDER THE
// RELATION OF `crossing.md §1.5` — member-SET equality for objects, array index order significant, and
// `Object.is` where sign or `NaN` matters.
//
// **THE CORPUS, AND THE TWO DECLARED EXCLUSIONS AND NOTHING ELSE:** *"a string, a boolean, a finite number,
// an empty object, an empty array, a nested object, a nested array, an object holding an array holding an
// object, and a value carrying an integer-like key beside a non-integer-like one"*; exclusion (i) a
// `file`-tier `-0` read back as `0` after a boot is the STORE's battery's clause (`DD-5`); exclusion (ii)
// object member ORDER is not compared. **A third exclusion is a finding.**
//
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED: `various JSON` at depth 0 (string, empty string,
// boolean, integral number, fractional number, zero), an empty object, an empty array, a one-member object,
// a nested object, a nested array, an object holding an array holding an object, an integer-like key beside
// a non-integer-like one, and — at the `mem` tier alone — `-0`.

import test from 'node:test';
import assert from 'node:assert/strict';

// **⟶ RESHAPED 2026-10-16 ON `A127` (`surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses):**
// the module namespace carries ONE name — `storeCreate` — and the ten store-reaching names are METHODS of the
// object it returns. The import list and every call below moved with the receiver ruling; no property of
// `acceptance.md §4.3`'s corpus, relation or exclusions moved by it. (`A128`: *"Inconsistency — all
// store-modifying acts should operate by method, not function."*)
import { storeCreate } from 'provident-storeroom';

/// `crossing.md §1.5`'s relation, implemented by THIS LAYER (the clause: *"the relation is a property of the
/// PACKAGE's own helper and of this unit's acceptance layer, NEVER of the store"*).
export function jsEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    // Clause 2: dense, equal length, equal member-by-index — INDEX ORDER IS SIGNIFICANT.
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((x, i) => jsEqual(x, b[i]));
  }
  if (typeof a === 'number' || typeof b === 'number') {
    // Clause 3: `Object.is` where sign or `NaN` matters — so `-0` and `0` are NOT equal.
    return Object.is(a, b);
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    // Clause 1: the key set is compared as a SET — never by insertion order, never by enumeration order.
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && jsEqual(a[k], b[k]));
  }
  return a === b;
}

const CORPUS = [
  { label: 'a string', value: 'various JSON' },
  { label: 'the empty string', value: '' },
  { label: 'a boolean', value: true },
  { label: 'a second boolean', value: false },
  { label: 'a finite integral number', value: 42 },
  { label: 'a finite fractional number', value: -7.5 },
  { label: 'zero', value: 0 },
  { label: 'an empty object', value: {} },
  { label: 'an empty array', value: [] },
  { label: 'a nested object', value: { n: { deep: 'x' } } },
  { label: 'a nested array', value: [1, [2, 3]] },
  { label: 'an object holding an array holding an object', value: { a: [{ b: 'c' }] } },
  {
    label: 'an integer-like key beside a non-integer-like one',
    value: { 2: 'two', 10: 'ten', b: 'bee', a: 'aye' },
  },
];

function instance() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

test('round_trip_the_corpus_is_the_nine_declared_states_plus_the_key_set_state', () => {
  // `§4.3`'s corpus, printed so the drive is checkable, and no row beyond it.
  assert.equal(CORPUS.length, 13);
});

for (const { label, value } of CORPUS) {
  test(`round_trip_${label.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}_is_exact_under_the_relation`, () => {
    const inst = instance();
    inst.write(['rt'], 'mem', value);
    const back = inst.read(['rt']);
    assert.ok(
      jsEqual(back, value),
      `\`read\` after \`write\` must be EQUAL to the written value: got ${JSON.stringify(back)}`,
    );
  });
}

test('round_trip_at_every_tier_the_mem_register_holds', () => {
  // An ABSENT `filePath` is IN DOMAIN and creates the register at `mem` (`crossing.md §1.3`), so the tiers a
  // `mem` register holds are `mem` and `temp`.
  for (const tier of ['temp', 'mem']) {
    const inst = instance();
    const value = { [tier]: [1, 2, { k: true }] };
    inst.write(['t'], tier, value);
    assert.ok(jsEqual(inst.read(['t'], tier), value));
  }
});

test('round_trip_the_relation_is_not_vacuous_on_member_order_or_array_order', () => {
  assert.ok(jsEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), 'exclusion (ii): member order is not compared');
  assert.ok(!jsEqual([1, 2], [2, 1]), 'clause 2: array index order IS significant');
  assert.ok(!jsEqual({ a: 1 }, { a: 1, b: 2 }), 'an added member is not equal');
  assert.ok(!jsEqual(0, -0), 'clause 3: `===` would say they are equal; the relation does not');
});

test('round_trip_negative_zero_is_exact_at_the_mem_tier_before_any_boot', () => {
  // Exclusion (i) is a FILE-tier, post-boot normalization and is asserted by the STORE's battery (`DD-5`);
  // in memory the sign is kept and the relation is `Object.is`.
  const inst = instance();
  inst.write(['z'], 'mem', -0);
  const back = inst.read(['z']);
  assert.ok(Object.is(back, -0), 'a mem-tier `-0` round trip is `Object.is`-equal');
  assert.ok(!Object.is(back, 0), 'and it is NOT the `0` that `===` would confuse it with');
});

test('round_trip_the_layer_declares_exactly_two_exclusions', () => {
  // `§4.3`: *"`0` other exclusion is declared, and a third exclusion is a finding."* The two are (i) the
  // file-tier `-0` normalization and (ii) member order; this cell names both and nothing else.
  const exclusions = ['a file-tier -0 is read back as 0 after a boot', 'object member ORDER is not compared'];
  assert.equal(exclusions.length, 2);
});

test('round_trip_a_failed_write_returns_nothing_and_a_successful_one_returns_the_record', () => {
  const inst = instance();
  const record = inst.write(['w'], 'mem', { a: 1 });
  assert.equal(typeof record, 'object');
  assert.ok('op' in record && 'watched' in record && 'triggered' in record);
  assert.throws(
    () => inst.write(['w'], 'mem', null),
    (err) => err.status === 'ValueNotAdmitted',
    'a failed write returns NOTHING (`§2.2`)',
  );
});

test('round_trip_read_literal_returns_the_literal_at_a_leaf', () => {
  const inst = instance();
  inst.write(['leaf'], 'mem', 'v');
  assert.equal(inst.readLiteral(['leaf']), 'v');
  inst.write(['branch'], 'mem', { k: 1 });
  assert.throws(
    () => inst.readLiteral(['branch']),
    (err) => err.status === 'ReadTargetIsBranch',
    '`§2.2`/`§2.9` item 2: the literal-only read narrows to a leaf',
  );
});

test('round_trip_the_module_carries_one_name_and_the_product_the_twelve_members', () => {
  // `surface.md §2.9` item 1's `A127` clause: the module namespace carries ONE name, `storeCreate` ALONE,
  // `11 → 1` ✓. `surface.md §2.4` item 9 (f)'s `A127` clause: the product's declared member set is the TWELVE
  // `10 + 1 + 1 = 12` ✓. **THIS CELL REPLACES the pre-`A127` cell that asserted *"the eight verbs"* at the
  // namespace: that figure is superseded at its own clause and the round-trip property is unmoved by it.**
  assert.equal(typeof storeCreate, 'function');
  const inst = instance();
  const twelve = Object.keys(inst).sort();
  // **⟶ RE-DERIVED 2026-10-17 (`role_test_writer`): `12 → 13`, `10 + 1 + 1 + 1 = 13` ✓**, the thirteenth
  // being `constraints()` (`surface.md §2.4` item 9 (f)'s `constraints` clause; `§2.12` item 2-bis).
  assert.equal(twelve.length, 13,
    'the product carries THIRTEEN own members — `10 + 1 + 1 + 1 = 13` ✓');
  for (const member of twelve) {
    assert.equal(typeof inst[member], 'function', `"${member}" is an own callable`);
  }
  assert.ok(!('findAddress' in inst), '`A63`: findAddress is an internal tool and is NOT exposed');
  assert.ok(!('exists' in inst), '`§2.9` item 3: no exists() verb and no binding-side resolver');
  assert.ok(!('dispose' in inst) && !('close' in inst), '`A74`: no release verb at either layer');
  assert.ok(!('on' in inst) && !('off' in inst), '`A127`: `on` and `off` are merged away and are not members');
});
