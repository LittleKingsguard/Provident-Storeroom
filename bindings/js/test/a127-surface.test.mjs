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
// | 3 | THE TEN METHODS + the TWO remaining singles `register` and `constraints`, EACH an own function | `a127_each_of_the_twelve_members_is_an_own_callable` |
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
// | 20 | `settle` is NOT a member from 2026-10-18, and the TWELVE stand whole without it | `a127_settle_is_not_a_member_and_the_twelve_stand_without_it` |
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
// | F15 | `write`'s FIFTH POSITION over an object carrying NO `pending` member — the class test, re-derived from `a.settle` | (ii) | `a127_the_class_test_stands_at_the_writes_fifth_position_for_an_object_carrying_no_pending_member` |
// | F16 | the SAME position over an object that DOES carry `pending` — ADMITTED, so the refusal above is the class test's | not a fail-state | `a127_the_class_test_at_the_writes_fifth_position_refuses_an_object_carrying_no_pending_member_only` |
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
// **⟶ RE-DERIVED 2026-10-18 (gate-4 close, legacy re-derivation): THE SET MOVES `12 → 14`, `10 + 1 + 1 + 2 = 14` ✓**,
// on `U-STOREROOM-HELD-LISTENER-IDENTITY`'s ruling *"the member set is 14 and the `12 → 13` figure is withdrawn by
// name"* (`P: docs/pending.md · (AA-5)`; `contract.md §2.7` item 1 and item 9, whose operative set is
// `{ read, readLiteral, write, delete, rollback, listen, unlisten, addConstraint, constraintOn, constraintOff,
// register, constraints, removeListener, removeConstraint }` — *"`10 + 1 + 1 + 2 = 14` ✓, the `10` being the ten
// methods, the first `1` `register`, the second `1` `constraints`, and the `2` the two new members"*).
// **THE TWO NEW MEMBERS ARE `removeListener` AND `removeConstraint`, AND NEITHER IS A MODULE EXPORT** — the module
// namespace stays at ONE name, `11 → 1` ✓ (`contract.md §2.7` item 9 item 3). **THE EARLIER `12 → 13` FIGURE IS
// WITHDRAWN BY NAME** (`§2.7` item 1). **The constant's NAME is kept so no citing cell is renamed by a figure; the
// LIST and the COUNT move** — as they moved `13 → 12` for `settle` and `12 → 13` before that.
const THE_FOURTEEN = [...THE_TEN, 'register', 'constraints', 'removeListener', 'removeConstraint'];
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
  'ValueRefusedAtBoundary',
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
  for (const name of ['register', 'constraints', 'on', 'off']) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(NS, name),
      false,
      `"${name}" is reached through the product and never through the module namespace`,
    );
  }
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `contract.md §2.7` item 9 (`P: docs/pending.md · (AA-5)`) — THE PRODUCT'S DECLARED MEMBER SET IS
// **FOURTEEN** OWN MEMBERS AND NOTHING ELSE, `10 + 1 + 1 + 2 = 14` ✓, with the two new members NAMED:
// `removeListener` and `removeConstraint`. `surface.md §2.1` (e) item 1 — the state held PRIVATELY.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a127_the_products_own_member_set_is_exactly_fourteen', () => {
  const a = mem();
  const own = Object.keys(a).sort();
  assert.equal(own.length, 14,
    'the product carries FOURTEEN own members — `10 + 1 + 1 + 2 = 14` ✓ (`contract.md §2.7` item 9; '
    + '`P: docs/pending.md · (AA-5)`, the `12 → 13` figure withdrawn by name)');
  assert.deepEqual(own, [...THE_FOURTEEN].sort(),
    'and they are the ten methods, `register`, `constraints` and the TWO NEW members `removeListener` and '
    + '`removeConstraint` — no fourth figure and no member the set does not name');
});

test('a127_each_of_the_fourteen_members_is_an_own_callable', () => {
  const a = mem();
  for (const name of THE_FOURTEEN) {
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

// **⟶ RE-DERIVED 2026-10-18 (gate-4 close): `listen` MOVED `listen(address) -> Handle` TO
// `listen(handle, addresses) -> undefined`.** The arity figure moves `1 → 2` (`contract.md §2.2` item 1;
// `P: docs/pending.md · P-6`), the second position is a SET of addresses (`§2.2` item 2), and the answer is
// `undefined` because THE CALLER SUPPLIED THE IDENTITY and there is no datum to give back (`§2.2` item 10;
// `listen-verb.md §2.4`). **THE OLD CELL'S SUBJECT — "the package's opaque handle" — IS RETIRED WITH THE
// MINT**: nothing mints, and the handle is the caller's own non-empty string (`§2.1` item 1).
// **⟶ RE-DERIVED AGAIN 2026-10-24 (`strata/decisions.md` `D-22`, verbatim: *"Listen should return the handle on
// success, or error message on fail. Discard the noop prefix"*): `listen` ANSWERS THE HANDLE, NOT `undefined`.**
//
// **WHAT THE 2026-10-18 BYTES ABOVE RECORDED IS SUPERSEDED BY NAME, NOT WITHDRAWN.** They read *"the answer is
// `undefined` because THE CALLER SUPPLIED THE IDENTITY and there is no datum to give back (`§2.2` item 10;
// `listen-verb.md §2.4`)"* — and `D-22` overrules exactly that ground (`docs/L1/surface-deltas.md` §1.1: *"the
// ground this block states above … is OVERRULED BY NAME"*). **The return is a SUCCESS SIGNAL THAT CARRIES THE
// IDENTITY**, the caller's own spelling returned as the identity the store holds for that entry; its one
// declared consumer is `K-1`'s adoption (*"adopted, never minted by the kernel"*), and failure remains the
// surface's one thrown form. **THE ARITY FIGURE AND THE SET POSITION ARE UNTOUCHED** — `D-22` moves the return
// and nothing else.
test('a127_listen_takes_a_handle_and_a_set_of_addresses_and_answers_the_handle', () => {
  const a = mem();
  const answer = a.listen('h-a', [['a']]);
  assert.equal(answer, 'h-a',
    '`listen(handle, addresses)` ANSWERS THE HANDLE IT WATCHES UNDER — the caller`s own spelling, returned as '
    + 'the identity the store holds for that entry (`D-22`; `docs/L1/surface-deltas.md` §1.1)');
  assert.equal(typeof answer, 'string',
    'and the declared return type is `Handle` — the declaration moved `void → Handle` (`index.d.ts:685`), so '
    + 'the value is a `Handle` and not an opaque object');
  assert.equal(a.listen.length, 2,
    'and the declared arity is TWO, the second position a SET (`contract.md §2.2` item 1: the arity figure '
    + 'moves `1 → 2` at four declared sites and at the shipped signature; `D-22` moves the RETURN only)');
  assert.equal(a.listen('h-b', [['b']]), 'h-b',
    'a different handle at a different address is a second lawful call, and its answer is THAT handle');
  // AND THE RETURN IS NOT AN ECHO THE STORE COULD DISAGREE WITH: a repeated call at a held handle answers the
  // SAME value, because the identity is the string the caller spelled and the store holds it by that string.
  assert.equal(a.listen('h-a', [['a']]), 'h-a',
    'a repeated `listen` answers the same handle — the identity is the caller`s datum and the store holds the '
    + 'entry under it (`D-22`; `identity-and-domain.md §2` item 1)');
});

test('a127_unlisten_answers_undefined_for_a_handle_the_caller_spelled', () => {
  const a = mem();
  a.listen('h-a', [['a']]);
  assert.equal(a.unlisten('h-a'), undefined, 'the return is `undefined` on every success');
});

test('a127_unlisten_over_an_outside_value_is_a_no_op_success', () => {
  const a = mem();
  a.listen('h-a', [['a']]);
  // EVERY outside value is a NO-OP SUCCESS at `unlisten` (`contract.md §2.1` item 5's third column) — the
  // row-for-row table `identity-and-domain.md §2` item 3 prints, and the DECLARED REVERSAL whose other half
  // is `removeListener`'s throw (`P: docs/pending.md · P-5`'s `(R2)`).
  for (const outside of [null, undefined, 'not-a-handle', '', 0, false, {}, [], () => {}]) {
    assert.equal(
      a.unlisten(outside),
      undefined,
      `unlisten over ${String(outside)} is a NO-OP SUCCESS and not a failure`,
    );
  }
  assert.equal(a.register('h-a', () => {}), undefined,
    'and no other registration is removed by those calls: the handle the drive listened is still in the '
    + 'instance\'s map, so `register` over it succeeds');
});

test('a127_register_answers_undefined_for_a_handle_the_caller_spelled', () => {
  const a = mem();
  a.listen('h-a', [['a']]);
  assert.equal(a.register('h-a', () => {}), undefined, 'register succeeds with `undefined`');
});

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE SUBJECT OF THE CELL THIS LINE HELD — `a.settle(record)`
// — IS `REMOVED-WHOLE` FROM THE DECLARED SURFACE (`surface.md §2.4` item 9's pointer of that date: *"NO DRIVE
// MAY ASSERT A CALL OF `settle` FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT: the member is not a member
// of the product, so a call reaches a property that no clause of this unit declares"*). **THE CELL IS NOT
// DELETED AND NOT WEAKENED: its own remaining subject is the SET the removed member left — the twelve own
// members, with `settle`'s absent half now read as a NAMED ABSENCE rather than left to silence.** This is the
// reading `§2.4` item 9 (f)'s clause of 2026-10-18 declares (*"a declaration file that … declares a
// `settle(record) -> undefined` member at any position, after this date is a FINDING"*) brought to the product's
// own observable.
// **⟶ RE-DERIVED 2026-10-18 (gate-4 close), IN TWO STEPS.**
// **STEP 1 (`settle`, 2026-10-18):** the subject this cell first held — a call of `a.settle(record)` — is
// `REMOVED-WHOLE` from the declared surface (`surface.md §2.4` item 9's pointer of that date: *"NO DRIVE MAY
// ASSERT A CALL OF `settle` FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT"*); the cell was NOT deleted and
// NOT weakened, its remaining subject being the SET the removed member left, with `settle`'s absent half read
// as a NAMED ABSENCE. **STEP 2 (THIS PASS): the set that remains is re-derived `12 → 14`.**
// `contract.md §2.7` item 9 moves the product's own member set to FOURTEEN — `10 + 1 + 1 + 2 = 14` ✓, the two
// new members `removeListener` and `removeConstraint` (`P: docs/pending.md · (AA-5)`, which WITHDRAWS the
// `12 → 13` figure BY NAME). **THE `settle` ABSENCE IS UNMOVED by that ruling**: the retirement is `settle`'s
// own and no remove member re-opens it, so the cell keeps BOTH its halves — the absent term AND the whole set.
test('a127_settle_is_absent_and_the_fourteen_stand_without_it', () => {
  const a = mem();
  assert.equal(Object.prototype.hasOwnProperty.call(a, 'settle'), false,
    '`settle` is NOT an own member of the product — `§2.4` item 9\'s `REMOVED-WHOLE` pointer, and `§2.4` '
    + 'item 9 (f)\'s clause of 2026-10-18: the term leaves and no other member moves with it');
  assert.equal(typeof a.settle, 'undefined',
    'and a READ of the property answers `undefined` on every instance — so no caller reaches a seam by the '
    + 'old spelling and no drive can pass by finding one');
  assert.deepEqual(Object.keys(a).sort(), [...THE_FOURTEEN].sort(),
    'while the FOURTEEN declared members stand whole: the `settle` removal takes ONE term, and this unit\'s '
    + '`12 → 14` adds TWO (`contract.md §2.7` item 9) — no method, no refusal, no arity, no position and no '
    + 'return moves with either figure');
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

test('a127_write_refuses_an_outside_value_with_ValueRefusedAtBoundary', () => {
  const a = mem();
  for (const outside of [null, undefined, () => {}, Symbol('s'), 1n, NaN, Infinity, new Map(), new Date()]) {
    const err = thrown(() => a.write(['a'], 'mem', outside));
    assert.ok(isTheSingleForm(err), 'an outside value answers the store`s own form');
    assert.equal(err.status, 'ValueRefusedAtBoundary', 'and the code is ValueRefusedAtBoundary');
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
  // **⟶ RE-DERIVED 2026-10-18 (gate-4 close): `register`'s FIRST position is now the CALLER-SPELLED HANDLE**
  // (`contract.md §2.1` item 5's table, second column; `§2.2` item 5 (b)) — the old cell listened at `['a']`
  // and passed the minted object it was answered, both retired. The handle is listened FIRST so the refusal
  // driven below is the LISTENER position's and never the handle's (`§2.4` item 5 (d)).
  a.listen('h-register', [['a']]);
  for (const outside of [null, undefined, 0, 'fn', {}, []]) {
    const err = thrown(() => a.register('h-register', outside));
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

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): BOTH CELLS BELOW ASSERTED `a.settle(…)`'s REFUSAL AND THE
// MEMBER THEY CALL IS `REMOVED-WHOLE` (`surface.md §2.4` item 9's pointer of that date; *"NO DRIVE MAY ASSERT A
// CALL OF `settle`"*). **THEIR SUBJECT IS RE-DERIVED AND NOT DROPPED, ON THE SPEC'S OWN DISPOSITION OF THE ROW
// THEY READ:** `parameter-semantics.md §2.19`'s clause of 2026-10-18 states what survives — *"the CLASS TEST the
// `domain` and outside-value cells declare is `surface.md §2.4` item 9 (g) item 1's and STANDS AT THE WRITE'S
// FIFTH POSITION (`PAR-JS-20`), where it is the record-position test and not a route into an adoption."* **SO
// THE ONE CLASS TEST IS DRIVEN AT THE ONE POSITION THAT STILL CARRIES IT**, and the two states the old cells
// drove — an ABSENT required position and an object carrying no `pending` member — are driven there, each
// asserted in the ONE form item 9 (b)'s re-spelling declares. **NOTHING IS WEAKENED: the refusal's class, its
// absent `status` member and its required STRING `message` are asserted exactly as before, at the site the row's
// own disposition names.**
test('a127_the_class_test_stands_at_the_writes_fifth_position_for_an_object_carrying_no_pending_member', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION, AT THE SAME GROUND AS THE SIBLING CELL (`surface.md §2.4` item 9 (g) item 1's
  // record-position test, read at `§2.2` clause 4): a `TypeError` raised by a MISSING member is indistinguishable
  // from the class test's own, so the members under test are read BEFORE any call below is made.**
  assert.deepEqual(Object.keys(a).sort(), [...THE_FOURTEEN].sort(),
    'the twelve declared members stand whole, so neither the member nor the position below is absent');
  const err = thrown(() => a.write(['a'], 'mem', 1, {}));
  assert.ok(isTheClassTestForm(err),
    '`write`\'s fifth position takes a record identity and an object carrying NO `pending` member is refused '
    + 'by the ONE class test (`§2.4` item 9 (g) item 1; `PAR-JS-20`), in the one form item 9 (b) re-spells');
  // **AND NO NODE STANDS AT THE ADDRESS, WHICH IS THE REFUSAL'S OWN CONSEQUENCE**: the class test is taken
  // BEFORE the walk and BEFORE the verb (`§2.4` item 9 (g) item 1), so the refused position leaves no landing.
  // **THE READ IS ASSERTED BY ITS OWN ANSWER AND NOT BY `!== undefined`**: a `mem`-tier miss is the STORE's
  // own `AddressNotFound` (`§2.5`'s single form), so the absence is read as that refusal and not as a value.
  const absent = thrown(() => a.read(['a'], 'mem'));
  assert.equal(absent.status, 'AddressNotFound',
    'and the refusal is taken BEFORE the store leg, so no node stands at the address — the read answers the '
    + `STORE's own \`AddressNotFound\` and not a value (read ${JSON.stringify(absent.status)})`);
});

test('a127_the_class_test_at_the_writes_fifth_position_refuses_an_object_carrying_no_pending_member_only', () => {
  const a = mem();
  assert.deepEqual(Object.keys(a).sort(), [...THE_FOURTEEN].sort(),
    'the twelve declared members stand whole before the pair of readings below is taken');
  // **THE ADMITTED ARM IS DRIVEN WITHOUT THE REFUSAL HELPER**, because `thrown()` ASSERTS that the call
  // refuses and a lawful write is not a refusal: the two arms are read side by side, so the class test's
  // refusal in the sibling cell cannot be a blanket refusal of the position.
  let carrying = null;
  try {
    carrying = a.write(['b'], 'mem', 1, { pending: [] });
  } catch (err) {
    assert.fail(`the fifth position ADMITTED an object carrying \`pending\` in the sibling cell, so this arm `
      + `must not refuse — it threw ${JSON.stringify(err && err.status)}`);
  }
  assert.deepEqual(Object.keys(carrying).sort(), ['op', 'triggered', 'watched'],
    'the SAME position ADMITS an object that DOES carry a `pending` member — the record identity this instance '
    + 'has not yet adopted — because the first call on an identity IS the adoption (`§2.4` item 9 (a) as '
    + 'amended 2026-10-15, read with `PAR-JS-19`\'s domain cell: *"A FIRST CALL IS NEVER REFUSED"*), and the '
    + 'write proceeds to its own three-member record; so the refusal in the sibling cell is the CLASS TEST\'s '
    + 'and not a blanket refusal of the position');
});

test('a127_no_store_reaching_verb_throws_the_class_test_form', () => {
  const a = mem();
  // **⟶ CORRECTED 2026-10-16 — THE EXISTENCE PRECONDITION FIRST, SO THIS CELL CANNOT PASS ON AN ABSENT
  // METHOD (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause): a `TypeError`
  // raised by a MISSING member is indistinguishable from the class test's own `TypeError`, so the
  // twelve-member set is asserted HERE, by name and by class, BEFORE any call below is made.**
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), THE_FOURTEEN.slice().sort(),
    'the product carries TWELVE own members, `10 + 1 + 1 = 12` — the ten methods, plus the two remaining '
    + 'singles `register` and `constraints` (`surface.md §2.4` item 9 (f)\'s clause of 2026-10-18, `13 → 12`); '
    + '`settle` is the term that left and it is NOT substituted by an absent member read as one');
  for (const member of THE_FOURTEEN) {
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
