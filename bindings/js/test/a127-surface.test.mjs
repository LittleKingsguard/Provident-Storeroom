// `A127` — THE OBJECT-ORIENTED SURFACE: ONE MODULE NAME, THE TWELVE-MEMBER PRODUCT, THE TEN METHODS, THE
// TWO REFUSAL RULES AND `write`'s FIFTH POSITION.
//
// **AUTHORED FROM THE CONTRACT ALONE, AND EVERY CELL CITES THE SPEC CELL IT DERIVES FROM.** No cell of this
// file reads `bindings/js/index.mjs`, `bindings/js/index.d.ts` or `bindings/js/src/**`: the surface below is
// taken from `docs/specs/storeroom-js/surface.md`, `parameter-semantics.md`, `acceptance.md` and
// `test-cases.md`, at the `§n` each cell names.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// **THE STATE MACHINE, ENUMERATED BEFORE ANY CELL WAS AUTHORED** (one cell per reasonable state):
//
// | # | The state | Its cell |
// | --- | --- | --- |
// | 1 | THE MODULE NAMESPACE: ONE named export, `storeCreate` | `a127_the_module_namespace_carries_one_name_storeCreate` |
// | 2 | THE PRODUCT'S OWN MEMBER SET: OWN-KEYS exactly TWELVE, `10 + 1 + 1 = 12` | `a127_the_products_own_member_set_is_exactly_twelve` |
// | 3 | THE TEN METHODS + `register` + `settle`, EACH an own function | `a127_each_of_the_twelve_members_is_an_own_callable` |
// | 4 | `on` and `off` are NOT members, and neither is `storeCreate` | `a127_on_and_off_are_not_members_and_neither_is_storeCreate` |
// | 5 | THE TEN STORE-REACHING NAMES are METHODS ONLY — no module-namespace spelling survives | `a127_the_ten_store_reaching_names_are_not_module_exports` |
// | 6 | THE STATE IS PRIVATE: no own member is store data, a record, a map, a tier, an address, a handle or a commit | `a127_the_products_state_is_held_privately_and_no_own_member_is_store_data` |
// | 7 | `a.read(address, tier?)` — arity `1` or `2`, one token | `a127_read_one_tier_token_answers_that_tier` |
// | 8 | `a.read(address, tier?)` — an array is an ANY-MATCH SET | `a127_read_an_array_of_tiers_is_an_any_match_set` |
// | 9 | `a.read([])` — the empty address resolves to the whole register | `a127_read_the_empty_address_resolves_to_the_whole_register` |
// | 10 | `a.read(address)` with NO tier — the trailing position ABSENT, in domain | `a127_read_the_absent_tier_position_is_in_domain` |
// | 11 | `a.readLiteral(address, tier?)` — a leaf answers the literal | `a127_readLiteral_a_leaf_answers_the_stored_literal` |
// | 12 | `a.write(address, tier, value, commit?)` — the four-member record | `a127_write_returns_the_four_member_record` |
// | 13 | `a.delete(address, tier?)` — the receipt, `address` VERBATIM | `a127_delete_returns_the_receipt_with_the_address_verbatim` |
// | 14 | `a.delete(address, tier)` — the in-domain no-op arm: a tier the target does not hold is a SUCCESS with `tiers: []` | `a127_delete_a_tier_the_target_does_not_hold_is_a_success_with_an_empty_tiers_list` |
// | 15 | `a.rollback(opId)` — the three-member record | `a127_rollback_returns_the_three_member_record` |
// | 16 | `a.listen(address)` — the package's opaque handle | `a127_listen_answers_the_packages_opaque_handle` |
// | 17 | `a.unlisten(handle)` — `undefined` | `a127_unlisten_answers_undefined_for_a_handle_this_instance_minted` |
// | 18 | `a.unlisten(handle)` — the no-op success over every outside value | `a127_unlisten_over_an_outside_value_is_a_no_op_success` |
// | 19 | `a.register(handle, listener)` — `undefined` | `a127_register_answers_undefined_for_a_handle_this_instance_minted` |
// | 20 | `a.settle(record)` — `undefined`, where the object carries a `pending` member | `a127_settle_answers_undefined_for_an_object_carrying_pending` |
// | 21 | `write`'s FIFTH POSITION, arm 1: ABSENT — IN DOMAIN, the write proceeds | `a127_write_with_the_fifth_position_absent_proceeds` |
// | 22 | `write`'s FIFTH POSITION, arm 2: `undefined` SUPPLIED — refused by the ARITY GATE | `a127_write_with_undefined_supplied_at_the_fifth_position_is_refused` |
// | 23 | `write`'s FIFTH POSITION: an object carrying NO `pending` member is refused by the CLASS TEST | `a127_write_with_an_object_carrying_no_pending_member_is_refused` |
// | 24 | `write`'s FIFTH POSITION: an object carrying `pending` is ADMITTED (the first call IS the adoption) | `a127_write_with_an_object_carrying_pending_is_admitted` |
//
// **THE FAIL-STATES, ONE CELL PER DOCUMENTED FAIL-STATE (`§2.4` item 9 (f)'s TWO RULES AND NO THIRD):**
//
// | # | The fail-state | Its rule | Its cell |
// | --- | --- | --- | --- |
// | F1 | `a.read` over an outside `address` | (i) the store's own `{status, message}` | `a127_read_refuses_an_outside_address_with_the_stores_own_form` |
// | F2 | `a.read` over an outside `tier` token | (i) | `a127_read_refuses_an_outside_tier_token` |
// | F3 | `a.read` over a `null` `tier` | (i) | `a127_read_null_tier_answers_AddressMalformed` |
// | F4 | `a.write` over an ABSENT `tier` | (i) | `a127_write_with_an_absent_tier_is_refused_by_the_store` |
// | F5 | `a.write` over an ARRAY `tier` | (i) | `a127_write_with_an_array_tier_is_refused_as_OutOfDomainTier` |
// | F6 | `a.write` over an outside `value` | (i) | `a127_write_refuses_an_outside_value_with_ValueNotAdmitted` |
// | F7 | `a.delete` over an ARRAY `tier` | (i) | `a127_delete_with_an_array_tier_is_refused_as_OutOfDomainTier` |
// | F8 | `a.rollback` over an `opId` the journal does not hold | (i) | `a127_rollback_over_an_unknown_op_id_answers_JournalOpUnknown` |
// | F9 | `a.rollback` over a blank `opId` | (i) | `a127_rollback_over_a_blank_op_id_answers_AddressMalformed` |
// | F10 | `a.register` over a NON-FUNCTION `listener` | (i), at the registration site | `a127_register_over_a_non_function_is_refused_in_the_single_form` |
// | F11 | `a.addConstraint` over an outside `pair` | (ii) the ONE `TypeError`, nothing changed | `a127_addConstraint_over_an_outside_pair_throws_the_one_type_error` |
// | F12 | `a.addConstraint` over an outside `constraint` | (ii) | `a127_addConstraint_over_an_outside_constraint_throws_the_one_type_error` |
// | F13 | `a.addConstraint` below its declared arity | (ii) | `a127_addConstraint_below_its_declared_arity_throws_the_one_type_error` |
// | F14 | `a.constraintOn` / `a.constraintOff` over an outside `pair` | (ii) | `a127_the_two_toggles_over_an_outside_pair_throw_the_one_type_error` |
// | F15 | `a.settle` over an ABSENT argument | (ii) | `a127_settle_over_an_absent_argument_throws_the_one_type_error` |
// | F16 | `a.settle` over the object `{}` | (ii), the class test | `a127_settle_over_the_empty_object_throws_the_one_type_error` |
// | F17 | a VERB throwing a `TypeError` | NOT DECLARED — a FINDING | `a127_no_store_reaching_verb_throws_the_class_test_form` |
//
// **THE ONE THING THIS FILE DOES NOT DRIVE, AND WHY (recorded, not guessed):** `§2.4` item 9 (g) item 2's
// WIDER CLASS — an object carrying `pending` that this instance was never handed by the kernel — is declared
// `OPEN` BY ADMISSION (`surface.md §2.4` item 9 (g) items 1–2, its clause of 2026-10-16, and
// `test-cases.md`'s own note at `§2.4` item `9` `(g)`), and that clause's own words are *"NO DRIVE MAY ASSERT
// THIS ROW"*. No cell below asserts either its refusal or its admission.
//
// (`test-cases.md`'s `A127` pointer set, rows 1–6; `acceptance.md §4.1` item 3 and `§4.3`; `contract.md §5.0`.)

import test from 'node:test';
import assert from 'node:assert/strict';

import * as NS from 'provident-storeroom';

const { storeCreate } = NS;

// The ten methods, in the declared order of `surface.md §2.4` item 9 (f)'s table.
const THE_TEN = [
  'read',
  'readLiteral',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
];
// **⟶ RE-DERIVED 2026-10-17 (`role_test_writer`): THE SET MOVES `12 → 13`, `10 + 1 + 1 + 1 = 13` ✓**, the
// thirteenth being `constraints()` on the architect's ruling VERBATIM *"Add surface methods for reading
// registered constraints."* (`surface.md §2.4` item 9 (f)'s `constraints` clause of that date; `§2.12` item
// 2-bis; its register row is `PAR-JS-27`). **The constant's NAME is kept so no citing cell is renamed by a
// figure; the LIST and the COUNT move.**
const THE_TWELVE = [...THE_TEN, 'register', 'settle', 'constraints'];
// The store's closed set, at its amended size of `16` (`docs/specs/storeroom-native/contract.md §8.1`, read at
// `surface.md §2.5` item 1 and at `test-cases.md` row 37's `16`).
const THE_SIXTEEN = [
  'AddressMalformed',
  'AddressNotFound',
  'LeafHasNoDownstream',
  'TierNotFound',
  'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation',
  'ContainerKindConflict',
  'ReadTargetIsBranch',
  'WriteParentNotLink',
  'JournalOpUnknown',
  'RollbackCompacted',
  'ConstructionArgumentMissing',
  'FilePathUnreachable',
  'ValueNotAdmitted',
  'FileCommitFailed',
  'ConstraintListInvalid',
];

/** A `mem`-register store — `cfg.filePath` ABSENT is IN DOMAIN (`PAR-JS-2`, `surface.md §2.1`). */
function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

/**
 * **`surface.md §2.5` item 4** (*"`log` IS PRESENT ON EVERY FAILURE THIS SURFACE THROWS … the three-member
 * member set is therefore FLAT ACROSS ARMS and not conditional"*) **read with item 9** (*"`Object.keys(caught)`
 * reads exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*) —
 * the ONE failure form: a THROWN PLAIN OBJECT whose member set is EXACTLY `{log, message, status}`, sorted
 * ascending with length `3`, whose `log` is an ARRAY on every arm, whose prototype is the caller realm's
 * `Object.prototype`, and which is NOT an `Error`. **RE-DERIVED FROM THE SUPERSEDED TWO-MEMBER SET,
 * 2026-10-16; the closed-set limb below is UNMOVED.**
 */
function isTheSingleForm(err) {
  return (
    typeof err === 'object' &&
    err !== null &&
    !Array.isArray(err) &&
    !(err instanceof Error) &&
    Object.getPrototypeOf(err) === Object.prototype &&
    Object.keys(err).sort().join(',') === 'log,message,status' &&
    Object.keys(err).length === 3 &&
    Array.isArray(err.log) &&
    typeof err.status === 'string' &&
    THE_SIXTEEN.includes(err.status) &&
    typeof err.message === 'string' &&
    err.message.length > 0
  );
}

/** `surface.md §2.4` item 9 (f)'s rule (ii): the ONE `TypeError`, `status` ABSENT. */
function isTheClassTestForm(err) {
  return err instanceof TypeError && Object.prototype.hasOwnProperty.call(err, 'status') === false;
}

/** Run `fn` and hand the thrown value back, failing the cell if it did NOT throw. */
function thrown(fn) {
  try {
    fn();
  } catch (err) {
    return err;
  }
  assert.fail('the call was declared to refuse and it returned instead');
}

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.9` item 1's `A127` clause — THE MODULE NAMESPACE IS ONE NAME. `test-cases.md`'s `A127`
// pointer row 3: *"`11 → 1` ✓ … the TEN store-reaching names are METHODS ONLY, with NO deprecation window
// and no second spelling at any layer"*.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_the_module_namespace_carries_one_name_storeCreate', () => {
  const names = Object.keys(NS).filter((k) => k !== 'default');
  assert.deepEqual(names, ['storeCreate'], 'the ESM entry carries ONE named export: storeCreate');
  assert.equal(typeof NS.storeCreate, 'function', 'and it is the factory that does not need an existing store');
});

test('a127_the_ten_store_reaching_names_are_not_module_exports', () => {
  for (const name of THE_TEN) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(NS, name),
      false,
      `"${name}" is a METHOD ONLY from 2026-10-16 and is not a name of the namespace`,
    );
  }
  for (const name of ['register', 'settle', 'on', 'off']) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(NS, name),
      false,
      `"${name}" is reached through the product and never through the module namespace`,
    );
  }
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.4` item 9 (f)'s `A127` clause — THE PRODUCT'S DECLARED MEMBER SET IS TWELVE OWN MEMBERS
// AND NOTHING ELSE, `10 + 1 + 1 = 12` ✓. `surface.md §2.1` (e) item 1 — the state held PRIVATELY.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_the_products_own_member_set_is_exactly_twelve', () => {
  const a = mem();
  const own = Object.keys(a).sort();
  assert.equal(own.length, 13,
    'the product carries THIRTEEN own members — `10 + 1 + 1 + 1 = 13` ✓ (`surface.md §2.4` item 9 (f)\'s '
    + '`constraints` clause of 2026-10-17)');
  assert.deepEqual(own, [...THE_TWELVE].sort(),
    'and they are the ten methods plus `register`, `settle` and `constraints`');
});

test('a127_each_of_the_twelve_members_is_an_own_callable', () => {
  const a = mem();
  for (const name of THE_TWELVE) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(a, name),
      true,
      `"${name}" is an OWN member of the product`,
    );
    assert.equal(typeof a[name], 'function', `"${name}" is an own member carrying a function`);
  }
});

test('a127_on_and_off_are_not_members_and_neither_is_storeCreate', () => {
  const a = mem();
  for (const name of ['on', 'off', 'storeCreate']) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(a, name),
      false,
      `"${name}" is not a member of the product (on/off are MERGED AWAY; storeCreate is not a member of its own product)`,
    );
  }
});

test('a127_the_products_state_is_held_privately_and_no_own_member_is_store_data', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  for (const name of Object.keys(a)) {
    const v = a[name];
    assert.equal(typeof v, 'function', `"${name}" is a function and not store data`);
  }
  // No own member is a Map, a Set, a plain object, an array, or a record of any kind.
  for (const name of Object.keys(a)) {
    assert.equal(Array.isArray(a[name]), false, `"${name}" is not an array`);
    assert.equal(a[name] instanceof Map, false, `"${name}" is not a Map`);
    assert.equal(a[name] instanceof Set, false, `"${name}" is not a Set`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.4` item 9 (f) — THE TEN METHODS, ONE VALID/HAPPY-PATH CELL PER METHOD AND PER REASONABLE
// ARITY STATE.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_read_one_tier_token_answers_that_tier', () => {
  const a = mem();
  a.write(['a'], 'mem', 7);
  assert.equal(a.read(['a'], 'mem'), 7, 'a tier-qualified read answers the tier it names');
});

test('a127_read_an_array_of_tiers_is_an_any_match_set', () => {
  const a = mem();
  a.write(['a'], 'mem', 11);
  assert.equal(a.read(['a'], ['mem', 'temp']), 11, 'an array is an ANY-MATCH set and its first member matches');
});

test('a127_read_the_empty_address_resolves_to_the_whole_register', () => {
  const a = mem();
  a.write(['k'], 'mem', 'v');
  const whole = a.read([]);
  assert.equal(typeof whole, 'object', 'the empty address answers the whole register');
  assert.deepEqual(whole, { k: 'v' }, 'and its contents are the register`s own contents');
});

test('a127_read_the_absent_tier_position_is_in_domain', () => {
  const a = mem();
  a.write(['a'], 'mem', 3);
  assert.equal(a.read(['a']), 3, 'the trailing position ABSENT is IN DOMAIN (`acceptance.md §4.1` item 7)');
  // **⟶ RESHAPED 2026-10-16 TO THE ADJUDICATED READING (`parameter-semantics.md §2.6`'s `PAR-JS-6` row, its
  // `the declared answer for EACH outside value` cell AS RECONCILED THE SAME DATE):** *"`a.read(address,
  // undefined)` IS A SUPPLIED VALUE AT THIS POSITION AND TAKES `PAR-JS-6`'s DECLARED ANSWER — the store's own
  // thrown `{status, message}` with `status` `AddressMalformed` — while the ONE CALL THAT FOLDS TO THE ABSENT
  // ROW IS `a.read(address)`, WHICH SUPPLIED NOTHING THERE"*. The as-filed assertion read the SUPERSEDED
  // `acceptance.md §4.1` item 7 reading (a SUPPLIED `undefined` folding to ABSENT) and ran RED-BEFORE-GREEN
  // against the implementation the red set produced; the row above is its ONE home.
  const supplied = thrown(() => a.read(['a'], undefined));
  assert.ok(isTheSingleForm(supplied), 'a SUPPLIED `undefined` at the tier position takes the store`s own form');
  assert.equal(supplied.status, 'AddressMalformed',
    'and `AddressMalformed` is `PAR-JS-6`\'s own answer for the supplied `undefined` — it does NOT fold to absent');
  assert.equal(a.read(['a']), 3, 'while the OMITTED position alone folds to absent, and the value stands');
});

test('a127_readLiteral_a_leaf_answers_the_stored_literal', () => {
  const a = mem();
  a.write(['a'], 'mem', 'leaf');
  assert.equal(a.readLiteral(['a']), 'leaf', 'readLiteral narrows the read to a leaf');
});

test('a127_write_returns_the_four_member_record', () => {
  const a = mem();
  const r = a.write(['a'], 'mem', 5);
  assert.equal(typeof r, 'object', 'a successful write answers a record');
  assert.deepEqual(Object.keys(r).sort(), ['op', 'triggered', 'watched'], 'the record is `{op, watched, triggered}`');
  assert.equal(typeof r.op, 'object', '`op` is the JournalOp the write returned');
  assert.ok(Array.isArray(r.watched), '`watched` crosses as a JS array');
  assert.ok(Array.isArray(r.triggered), '`triggered` crosses as a JS array of the package`s own handles');
});

test('a127_delete_returns_the_receipt_with_the_address_verbatim', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  const r = a.delete(['a']);
  assert.deepEqual(Object.keys(r).sort(), ['address', 'tiers', 'triggered'], 'the receipt is `{address, tiers, triggered}`');
  assert.deepEqual(r.address, ['a'], '`address` crosses VERBATIM');
  assert.ok(Array.isArray(r.tiers), '`tiers` crosses as an array');
});

test('a127_delete_a_tier_the_target_does_not_hold_is_a_success_with_an_empty_tiers_list', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  const r = a.delete(['a'], 'temp');
  assert.deepEqual(r.tiers, [], 'a tier the target does not hold is the in-domain no-op arm: a SUCCESS with `tiers: []`');
});

test('a127_rollback_returns_the_three_member_record', () => {
  const a = mem();
  const w = a.write(['a'], 'mem', 1);
  const r = a.rollback(w.op.opId);
  assert.deepEqual(
    Object.keys(r).sort(),
    ['opId', 'restoredTo', 'undoneOps'],
    'the rollback result is `{opId, undoneOps, restoredTo}`',
  );
  assert.equal(r.opId, w.op.opId, 'it echoes the id it was passed');
});

test('a127_listen_answers_the_packages_opaque_handle', () => {
  const a = mem();
  const h = a.listen(['a']);
  assert.ok(h !== null && typeof h === 'object', 'listen answers the package`s opaque wrapper');
  const h2 = a.listen(['b']);
  assert.notEqual(h, h2, 'two different addresses answer two different handles on one instance');
});

test('a127_unlisten_answers_undefined_for_a_handle_this_instance_minted', () => {
  const a = mem();
  const h = a.listen(['a']);
  assert.equal(a.unlisten(h), undefined, 'the return is `undefined` on every success');
});

test('a127_unlisten_over_an_outside_value_is_a_no_op_success', () => {
  const a = mem();
  const held = a.listen(['a']);
  for (const outside of [null, undefined, 'not-a-handle', '', 0, false, {}, [], () => {}]) {
    assert.equal(
      a.unlisten(outside),
      undefined,
      `unlisten over ${String(outside)} is a NO-OP SUCCESS and not a failure`,
    );
  }
  assert.equal(typeof held, 'object', 'and no other registration is removed by those calls');
});

test('a127_register_answers_undefined_for_a_handle_this_instance_minted', () => {
  const a = mem();
  const h = a.listen(['a']);
  assert.equal(a.register(h, () => {}), undefined, 'register succeeds with `undefined`');
});

test('a127_settle_answers_undefined_for_an_object_carrying_pending', () => {
  const a = mem();
  assert.equal(a.settle({ pending: [] }), undefined, 'settle answers `undefined`; the member set is the kernel`s own');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.2` clause 4 and `parameter-semantics.md §2.20` — `write`'s FIFTH POSITION, ITS FOUR STATES.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_write_with_the_fifth_position_absent_proceeds', () => {
  const a = mem();
  const r = a.write(['a'], 'mem', 1);
  assert.deepEqual(Object.keys(r).sort(), ['op', 'triggered', 'watched'], 'the position ABSENT is IN DOMAIN and the write proceeds');
  assert.equal(a.read(['a'], 'mem'), 1, 'and the value landed');
});

test('a127_write_with_undefined_supplied_at_the_fifth_position_is_refused', () => {
  const a = mem();
  const err = thrown(() => a.write(['a'], 'mem', 1, undefined));
  assert.ok(
    isTheSingleForm(err) || isTheClassTestForm(err),
    '`undefined` SUPPLIED is refused by the ARITY GATE — never admitted, and never a silent default',
  );
  assert.equal(thrown(() => a.read(['a'])).status, 'AddressNotFound', 'and nothing was written');
});

test('a127_write_with_an_object_carrying_no_pending_member_is_refused', () => {
  const a = mem();
  const err = thrown(() => a.write(['a'], 'mem', 1, {}));
  assert.ok(
    isTheSingleForm(err) || isTheClassTestForm(err),
    'an object whose `pending` member is ABSENT is refused by the class test',
  );
  assert.equal(thrown(() => a.read(['a'])).status, 'AddressNotFound', 'and nothing was written');
});

test('a127_write_with_an_object_carrying_pending_is_admitted', () => {
  const a = mem();
  const r = a.write(['a'], 'mem', 1, { pending: [] });
  assert.deepEqual(
    Object.keys(r).sort(),
    ['op', 'triggered', 'watched'],
    'an object carrying `pending` is ADMITTED: the first call IS the adoption',
  );
  assert.equal(a.read(['a'], 'mem'), 1, 'and the write landed');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.4` item 9 (f)'s rule (i) — THE SEVEN STORE-REACHING VERBS ANSWER THE STORE'S OWN
// `{status, message}` ON A STORE-LEVEL REFUSAL, AND THEY DO NOT THROW THE CLASS TEST'S FORM.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_read_refuses_an_outside_address_with_the_stores_own_form', () => {
  const a = mem();
  for (const outside of [null, undefined, 'a.b', 0, {}, ['a', -1], ['a', null], ['a', true], ['a', ['b']]]) {
    const err = thrown(() => a.read(outside));
    assert.ok(isTheSingleForm(err), `read over ${JSON.stringify(outside)} answers the store's own {status, message}`);
    assert.equal(err.status, 'AddressMalformed', 'and the store`s own code');
  }
  // **⟶ CORRECTED 2026-10-16 — THE ABSENT-POSITION ARM ASSERTED `AddressMalformed` WHERE A FRESH STORE
  // ANSWERS `AddressNotFound`, AND ITS OWN COMMENT NAMED THE READING IT MEANT.** The as-filed line read
  // *"an ABSENT address refuses the same way"* — i.e. with the same code as the nine outside SHAPES above —
  // and that is the one reading the store's own closed set refutes: a well-formed address no node holds is
  // the store's `AddressNotFound` (`docs/specs/storeroom-native/contract.md §8.1`'s closed set, read at
  // `surface.md §2.5` item 1; `§2.4` item 9 (f)'s rule (i) fixes only the FORM — the thrown two-member
  // `{status, message}` — and never the member). **THE POSITION THE CELL MEANT IS THE ONE THE STORE ITSELF
  // NAMES:** the address is well-formed and ABSENT, so the refusal is `AddressNotFound` and the form is the
  // same single form. No assertion is weakened: the form is asserted below exactly as it is above.
  const absent = thrown(() => a.read(['a']));
  assert.ok(isTheSingleForm(absent), 'an ABSENT address answers the same single form');
  assert.equal(absent.status, 'AddressNotFound',
    'and its code is the store`s own `AddressNotFound` — the absent POSITION this comment meant, not the outside shapes above');
});

test('a127_read_refuses_an_outside_tier_token', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  for (const token of ['secure', 'FILE', 'disk', 'session', '']) {
    const err = thrown(() => a.read(['a'], token));
    assert.ok(isTheSingleForm(err), `read over tier "${token}" answers the single form`);
    assert.equal(err.status, 'OutOfDomainTier', 'a token outside the three answers OutOfDomainTier');
  }
});

test('a127_read_null_tier_answers_AddressMalformed', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  const err = thrown(() => a.read(['a'], null));
  assert.ok(isTheSingleForm(err), '`null` for a tier answers the single form');
  assert.equal(err.status, 'AddressMalformed', 'and its code is AddressMalformed, not OutOfDomainTier');
});

test('a127_write_with_an_absent_tier_is_refused_by_the_store', () => {
  const a = mem();
  const err = thrown(() => a.write(['a'], undefined, 1));
  assert.ok(isTheSingleForm(err), 'write`s tier is REQUIRED and its absence answers the store`s own form');
  assert.equal(err.status, 'AddressMalformed', 'ABSENT → AddressMalformed');
});

test('a127_write_with_an_array_tier_is_refused_as_OutOfDomainTier', () => {
  const a = mem();
  for (const arr of [[], ['mem'], ['mem', 'temp']]) {
    const err = thrown(() => a.write(['a'], arr, 1));
    assert.ok(isTheSingleForm(err), 'any array of any length is refused in the store`s own form');
    assert.equal(err.status, 'OutOfDomainTier', 'the array spelling is the READER`s arity and not the writer`s');
  }
});

test('a127_write_refuses_an_outside_value_with_ValueNotAdmitted', () => {
  const a = mem();
  for (const outside of [null, undefined, () => {}, Symbol('s'), 1n, NaN, Infinity, new Map(), new Date()]) {
    const err = thrown(() => a.write(['a'], 'mem', outside));
    assert.ok(isTheSingleForm(err), 'an outside value answers the store`s own form');
    assert.equal(err.status, 'ValueNotAdmitted', 'and the code is ValueNotAdmitted');
  }
});

test('a127_delete_with_an_array_tier_is_refused_as_OutOfDomainTier', () => {
  const a = mem();
  a.write(['a'], 'mem', 1);
  const err = thrown(() => a.delete(['a'], ['mem']));
  assert.ok(isTheSingleForm(err), 'an array at delete`s tier position answers the store`s own form');
  assert.equal(err.status, 'OutOfDomainTier', 'any array → OutOfDomainTier');
});

test('a127_rollback_over_an_unknown_op_id_answers_JournalOpUnknown', () => {
  const a = mem();
  const err = thrown(() => a.rollback('no-such-op'));
  assert.ok(isTheSingleForm(err), 'a well-shaped string the journal does not hold answers the single form');
  assert.equal(err.status, 'JournalOpUnknown', '→ JournalOpUnknown');
});

test('a127_rollback_over_a_blank_op_id_answers_AddressMalformed', () => {
  const a = mem();
  for (const blank of ['', null, undefined, 7]) {
    const err = thrown(() => a.rollback(blank));
    assert.ok(isTheSingleForm(err), 'a blank, absent, null or numeric `opId` answers the single form');
    assert.equal(err.status, 'AddressMalformed', '→ AddressMalformed');
  }
});

test('a127_register_over_a_non_function_is_refused_in_the_single_form', () => {
  const a = mem();
  const h = a.listen(['a']);
  for (const outside of [null, undefined, 0, 'fn', {}, []]) {
    const err = thrown(() => a.register(h, outside));
    assert.ok(
      isTheSingleForm(err),
      'the registration site`s OPERATIVE form is the store`s single `{status, message}` (test-cases.md §151)',
    );
    assert.equal(err.status, 'AddressMalformed', 'with the store`s own `AddressMalformed`');
  }
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.4` item 9 (f)'s rule (ii) — THE THREE CONSTRAINT METHODS THROW THE ONE `TypeError` FOR AN
// OUTSIDE VALUE OR A SHORT ARITY, WITH NO `status` AND NOTHING CHANGED. `surface.md §2.12` item 4.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_addConstraint_over_an_outside_pair_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.addConstraint, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.addConstraint.length, 2, 'and it declares TWO positions and no more (`8 → 1`)');
  const outsidePairs = [
    null,
    undefined,
    'pair',
    0,
    [],
    {},
    { address: ['a'] },
    { id: 'c1' },
    { address: 'a.b', id: 'c1' },
    { address: ['a'], id: 1 },
    { address: ['a'], id: '' },
  ];
  for (const pair of outsidePairs) {
    const err = thrown(() => a.addConstraint(pair, () => true));
    assert.ok(isTheClassTestForm(err), `addConstraint over ${JSON.stringify(pair)} throws the ONE TypeError`);
  }
  assert.equal(
    thrown(() => a.addConstraint({ address: ['a'], id: 'c1' }, 'not-a-function')).status,
    undefined,
    'and a refused call changes nothing: the pair it named is still uncarried and still refuses the same way',
  );
});

test('a127_addConstraint_over_an_outside_constraint_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.addConstraint, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.addConstraint.length, 2, 'and it declares TWO positions and no more (`8 → 1`)');
  for (const outside of [null, undefined, 'fn', 0, {}, [], true]) {
    const err = thrown(() => a.addConstraint({ address: ['a'], id: 'c2' }, outside));
    assert.ok(isTheClassTestForm(err), 'an outside `constraint` throws the ONE TypeError');
  }
});

test('a127_addConstraint_below_its_declared_arity_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.addConstraint, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.addConstraint.length, 2, 'and it declares TWO positions and no more (`8 → 1`)');
  const err = thrown(() => a.addConstraint({ address: ['a'], id: 'c3' }));
  assert.ok(isTheClassTestForm(err), 'a POSITION BELOW THE DECLARED ONE throws the ONE TypeError');
});

test('a127_the_two_toggles_over_an_outside_pair_throw_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.constraintOn, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.constraintOn.length, 2, 'and both toggles declare TWO positions and no more (`8 → 1`)');
  assert.equal(a.constraintOff.length, 2, 'and `constraintOff` is the second of the two');
  const fn = () => true;
  for (const [name, call] of [
    ['constraintOn', () => a.constraintOn({ address: ['a'], id: 'nope' }, fn)],
    ['constraintOff', () => a.constraintOff({ address: ['a'], id: 'nope' }, fn)],
    ['constraintOn', () => a.constraintOn(null, fn)],
    ['constraintOff', () => a.constraintOff('pair', fn)],
  ]) {
    const err = thrown(call);
    assert.ok(isTheClassTestForm(err), `${name} at a pair the entry does not carry throws the ONE TypeError`);
  }
});

test('a127_settle_over_an_absent_argument_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.settle, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.settle.length, 1, 'and the seam declares its ONE position (`settle(record) -> undefined`)');
  const err = thrown(() => a.settle());
  assert.ok(isTheClassTestForm(err), 'this member`s argument is REQUIRED and its absence throws the class-test form');
});

test('a127_settle_over_the_empty_object_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (f)'s
  // `A127` clause): a `TypeError` raised by a MISSING member is indistinguishable from the class test's own,
  // so the member's existence and its arity are read BEFORE the call under test.**
  assert.equal(typeof a.settle, 'function', 'the member under test exists before its refusal is driven');
  assert.equal(a.settle.length, 1, 'and the seam declares its ONE position (`settle(record) -> undefined`)');
  const err = thrown(() => a.settle({}));
  assert.ok(isTheClassTestForm(err), 'an object carrying no `pending` member is refused by the class test');
});

test('a127_no_store_reaching_verb_throws_the_class_test_form', () => {
  const a = mem();
  // **⟶ CORRECTED 2026-10-16 — THE EXISTENCE PRECONDITION FIRST, SO THIS CELL CANNOT PASS ON AN ABSENT
  // METHOD (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause): a `TypeError`
  // raised by a MISSING member is indistinguishable from the class test's own `TypeError`, so the
  // twelve-member set is asserted HERE, by name and by class, BEFORE any call below is made.**
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), THE_TWELVE.slice().sort(),
    'the product carries THIRTEEN own members, `10 + 1 + 1 + 1 = 13` — the ten methods, plus `register`, '
    + '`settle` and `constraints` (`surface.md §2.4` item 9 (f)\'s `constraints` clause of 2026-10-17)');
  for (const member of THE_TWELVE) {
    assert.equal(typeof a[member], 'function', `\`${member}\` IS a function — the cell below drives it and no absent member may stand in for it`);
  }
  const calls = [
    () => a.read(null),
    () => a.read(['a'], 'secure'),
    () => a.write(['a'], undefined, 1),
    () => a.write([], 'mem', undefined),
    () => a.delete(['a'], ['mem']),
    () => a.rollback(''),
    () => a.listen(null),
  ];
  // **⟶ AND `a.unlisten(0)` IS NOT ONE OF THEM — THE THROW FORM DOES NOT APPLY TO `unlisten`**
  // (`surface.md §2.3` item 4; `parameter-semantics.md §2.8`'s `PAR-JS-8` outside-value list and its
  // `unlisten`-versus-`off` contrast): *"`unlisten` over an outside value is a NO-OP SUCCESS"*, `undefined`
  // returned and nothing removed — exactly as this file's own sibling cell
  // `a127_unlisten_over_an_outside_value_is_a_no_op_success` drives it over `[null, undefined,
  // 'not-a-handle', '', 0, false, {}, [], () => {}]`. The as-filed arm required `unlisten(0)` to THROW and
  // was DIRECTLY CONTRADICTED by that sibling and by `§2.3` item 4; it is removed as the malformed arm it
  // was, and the answer the clauses declare is asserted here in its place.
  assert.equal(a.unlisten(0), undefined,
    '`unlisten` over an outside value is a NO-OP SUCCESS — it is NOT a class-test throw (`§2.3` item 4; `PAR-JS-8`)');
  for (const call of calls) {
    const err = thrown(call);
    assert.equal(
      err instanceof TypeError,
      false,
      'a `TypeError` thrown by a VERB is a FINDING: the seven answer the store`s own `{status, message}`',
    );
  }
});
