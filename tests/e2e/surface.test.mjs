// `surface.md` (`contract.md §2`) — THE JS SURFACE AT ITS OWN BOUNDARY: the construction, the five address
// verbs, the single failure form, the returned records' spellings, the parameter semantics of every verb's
// arguments, the constraint pattern and the two file-behaviour readings.
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED** (one cell per state):
// construction: the three declared keys · an ABSENT `filePath` · a reachable path · a fourth key · an
// ABSENT `journalLength` · `0` · a numeric string · an ABSENT `listeners` · a malformed listeners entry.
// verbs: a leaf read · a branch read · the empty address · a tier-qualified read · an any-match tier array ·
// a write record · a delete receipt with `tiers` in canonical order · the `tiers: []` no-op arm · a rollback
// result · a missing argument · an extra argument · a wrong-shaped argument.
// failure form: the member set, the prototype, the status token, the message, the throw site.
// records: each member of `{op, watched, triggered}` and of `{address, tiers, triggered}` and of
// `{opId, undoneOps, restoredTo}`.
// file readings: a `delete` with no file I/O · a `rollback` with no file I/O · a failed `file` commit.
//
// **AND THE TWO STATES THE 2026-10-11 `V-1` RE-DERIVATION ADDED TO THIS LIST, BECAUSE THE CELL THAT NAMES
// THE ADDRESS SHAPES HAD REACHED NEITHER:** **a `VEC` container and an integer segment resolving against it**
// (the container a JSON ARRAY write decides, `store-model.md §1.3`) and **the key-domain refusal**
// (`ContainerKindConflict` — an integer segment aimed at a `MAP`, or a string segment aimed at a `VEC`,
// `store-model.md §1.3`'s key-domain clause read with `write-and-read.md §3.4`'s `F-4`).

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../bindings/js/index.mjs';

// ── `contract.md §8.1`'s CLOSED SET AT ITS AMENDED SIZE: **`16` MEMBERS**, each with its own trigger
// (`11 + 2 + 1 + 1 + 1 = 16` ✓). **⟶ WIDENED 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class):
// the as-filed `THE_FIFTEEN` printed a figure the amendment had already replaced** — `§8.1`'s amended
// heading, `§7.2` item 5 (ADDED 2026-10-15, the constraint list's two validation instants), and
// `parameter-semantics.md §2.21`. **The figure MOVES; no assertion is weakened, and the sixteenth
// member's own drive joins the reachability cell below.**
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
  // ⟶ APPENDED 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set for both
  // S/N"*): the set's ranks `18` and `19`. The array is a census over the CLOSED SET, so it moves with the
  // ruling — `ConstraintBodyThrew` (a constraint BODY's throw, converted at the crossing) and
  // `ConstraintRefusedAtRegistration` (the REGISTRATION VERDICT) — and no rank of `1`…`17` moves.
  'ConstraintBodyThrew',
  'ConstraintRefusedAtRegistration',
];

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

// **⟶ THE FILE'S OWN GLOBAL RECEIVER, DECLARED 2026-10-16 FOR THE TWO CELLS WHOSE AS-FILED FORM NAMED IT
// WITHOUT BINDING IT** (`construction_a_fourth_key_does_not_change_the_outcome`, whose three calls once read
// a member `inst` off a receiver, and the `verbs_delete_*` trio, whose calls carried the receiver at the
// dropped ADDRESS position — both defects are the same one: *"the receiver is not a position"*,
// `surface.md §2.4` item 9 (f)'s `A127` clause and `§2.9` item 1's `A127` clause, `8 → 1` ✓). A method's
// receiver is the product of ONE `storeCreate` call (`§1` item 1's fixture rule reached through this file's
// own `mem`), so the receiver is bound ONCE here and named at those cells.
const inst = mem();

// **⟶ THE TERMINAL ARM'S OWN ACT, DRIVEN FROM THIS FILE (re-pointed 2026-10-15 by the `RCA-9` pass;
// `contract.md §7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2):** *"`Store::inst.write(…)` RECORDS THE
// WRITE IN THE JOURNAL, INSTALLS THE NODE, APPENDS THE ENTRY AND RETURNS ITS `WriteResult` … AND IT PERFORMS
// NO FILE I/O ON ANY OF ITS ARMS"*, and *"THE `file`-TIER COMMIT IS THE TERMINAL ARM'S OWN ACT … keyed by THE
// SETTLED RECORD'S OWN `op`"*. The package's own declared driver for that act is the constraint kernel —
// `bindings/js/src/constraint-kernel.mjs` (`kernel-surface.md §1` item 1), whose `commit(store, address,
// tier, value)` is the RECORD half and whose `runAttempt(store, record)` is the ATTEMPT half that settles the
// record and reaches the act on the passing arm. **The three cells below that read a `file`-tier durable
// image drive both halves; the three `assert`-only halves of each cell are unmoved.** The home is loaded
// lazily because it is ESM and this file's imports are static (`file-tier-save.test.mjs` and this package's
// properties unit load it the same way).
let KERNEL = null;
async function kernel() {
  if (KERNEL === null) KERNEL = await import('../../bindings/js/src/constraint-kernel.mjs');
  return KERNEL;
}

/** Record a `file`-tier write at `address` and drive THE TERMINAL ARM'S OWN ACT at its own instant. */
async function fileCommit(inst, address, value) {
  const { commit, runAttempt } = await kernel();
  return runAttempt(inst, commit(inst, address, 'file', value));
}

/// The one failure form's own predicate — **`surface.md §2.5` item 4** (*"the three-member member set is
/// therefore FLAT ACROSS ARMS and not conditional"*) **read with item 9** (*"`Object.keys(caught)` reads
/// exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*):
/// exactly `{log, message, status}`, a plain object of the caller's realm, `log` an ARRAY on every arm, and
/// no `Error` subclass. **RE-DERIVED FROM THE SUPERSEDED TWO-MEMBER SET, 2026-10-16** — the `status` and
/// `message` limbs are unmoved.
function isTheFailureForm(err) {
  return (
    err !== null &&
    typeof err === 'object' &&
    !Array.isArray(err) &&
    Object.getPrototypeOf(err) === Object.prototype &&
    Object.keys(err).sort().join(',') === 'log,message,status' &&
    Object.keys(err).length === 3 &&
    Array.isArray(err.log) &&
    typeof err.status === 'string' &&
    typeof err.message === 'string' &&
    err.message.length > 0 &&
    !(err instanceof Error)
  );
}

// ---------------------------------------------------------------------------------------------
// `§2.1` the construction
// ---------------------------------------------------------------------------------------------

test('construction_takes_one_plain_object_with_the_stores_three_keys', () => {
  const inst = mem();
  assert.ok(inst !== null && typeof inst === 'object', 'the package\'s own instance handle');
  assert.ok(inst.read([]) !== undefined, 'the empty address resolves to the register');
});

test('construction_an_absent_file_path_is_in_domain_and_creates_the_register_at_mem', () => {
  const inst = mem();
  inst.write(['a'], 'mem', 1);
  assert.equal(inst.read(['a'], 'mem'), 1, 'the register is at mem');
});

test('construction_an_absent_journal_length_is_the_one_absence_the_construction_refuses', () => {
  assert.throws(
    () => storeCreate({ listeners: [] }),
    (err) => isTheFailureForm(err) && err.status === 'ConstructionArgumentMissing',
  );
});

test('construction_a_zero_or_non_integer_journal_length_answers_address_malformed', () => {
  for (const bad of [0, -1, 1.5, '5', true, null, undefined]) {
    assert.throws(
      () => storeCreate({ journalLength: bad, listeners: [] }),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
      `journalLength ${String(bad)} is outside the domain`,
    );
  }
});

test('construction_an_absent_listeners_is_refused_and_no_instance_is_returned', () => {
  assert.throws(
    () => storeCreate({ journalLength: 8 }),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
  );
});

test('construction_an_empty_listeners_array_is_the_ordinary_no_listener_store', () => {
  const inst = mem([]);
  const record = inst.write(['a'], 'mem', 1);
  assert.deepEqual(record.triggered, []);
});

test('construction_a_duplicate_address_is_kept_with_both_handles', () => {
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
  ]);
  const record = inst.write(['a'], 'mem', 1);
  assert.equal(record.triggered.length, 2, 'both entries are KEPT, each with its OWN handle');
});

test('construction_a_malformed_listener_entry_is_refused_and_admits_nothing', () => {
  for (const listeners of [
    [{ address: ['a'] }],
    [{ handle: 'l1' }],
    [{ address: 'a', handle: 'l1' }],
    [{ address: ['a'], handle: '' }],
    [{ address: [-1], handle: 'l1' }],
    ['not-a-record'],
    null,
    'nope',
  ]) {
    assert.throws(
      () => storeCreate({ journalLength: 8, listeners }),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
      `listeners ${JSON.stringify(listeners)} is outside the domain`,
    );
  }
});

test('construction_a_fourth_key_does_not_change_the_outcome', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause;
  // `§2.12` item 3's ONE-SPELLING rule): THE RECEIVER IS BOUND ONCE AT THIS FILE'S OWN FIXTURE — `inst`
  // below — because a method's receiver is the product of ONE `storeCreate` call and is NEVER A POSITION.**
  // The as-filed cell spelled `inst.inst.write(a, ['k'], 'mem', 1)` / `inst.inst.read(a, ['k'])`: it read a
  // member `inst` off a receiver whose twelve declared members are `10 + 1 + 1 = 12` (`read` ·
  // `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` ·
  // `constraintOn` · `constraintOff`, plus `register` and `settle`) — **`inst.inst` is not one of them and
  // no clause declares it** — while the receiver `inst` itself stood UNBOUND (`ReferenceError`). Both
  // defects are the same one: the receiver's own position. The comparison is therefore driven ON the two
  // stores this cell builds — `write(address, tier, value)` at `4` positions and no fifth, `PAR-JS-7` —
  // and the global `inst` below is the second, fourth-key-free RECEIVER the same comparison is run at.
  const a = mem();
  const b = storeCreate({ journalLength: 8, listeners: [], fourthKey: 'ignored' });
  inst.write(['fourth-key'], 'mem', 1);
  a.write(['fourth-key'], 'mem', 1);
  b.write(['fourth-key'], 'mem', 1);
  assert.deepEqual(inst.read(['fourth-key']), a.read(['fourth-key']),
    'the ordinary store holds the value the comparison is run at');
  assert.deepEqual(inst.read(['fourth-key']), b.read(['fourth-key']),
    'a fourth construction key changes nothing the store answers');
  assert.equal(inst.read(['fourth-key']), 1, 'and the fourth key is not an ADDRESS the register holds');
});

test('construction_a_failed_construction_returns_no_partial_instance', () => {
  let handed = null;
  try {
    handed = storeCreate({ journalLength: 0, listeners: [] });
  } catch {
    /* the declared failure */
  }
  assert.equal(handed, null, 'never a partial instance');
});

// ---------------------------------------------------------------------------------------------
// `§2.2` the five address verbs, and the parameter semantics of their arguments
// ---------------------------------------------------------------------------------------------

test('verbs_read_on_a_leaf_a_branch_and_the_empty_address', () => {
  const inst = mem();
  inst.write(['leaf'], 'mem', 'v');
  assert.equal(inst.read(['leaf']), 'v');
  inst.write(['branch'], 'mem', { k: 1 });
  assert.deepEqual(inst.read(['branch']), { k: 1 }, 'the assembled value');
  assert.deepEqual(Object.keys(inst.read([])).sort(), ['branch', 'leaf'], 'the whole register');
});

test('verbs_read_accepted_tier_shapes_and_the_any_match_set', () => {
  const inst = mem();
  inst.write(['a'], 'mem', 1);
  assert.equal(inst.read(['a'], 'mem'), 1);
  assert.equal(inst.read(['a'], ['mem']), 1);
  assert.equal(inst.read(['a'], ['file', 'mem', 'temp']), 1, 'an ANY-MATCH set');
  assert.equal(inst.read(['a'], []), 1, 'the zero-token set');
  assert.equal(inst.read(['a']), 1, 'an ABSENT tier');
});

test('verbs_read_refused_tier_shapes_answer_their_own_codes', () => {
  const inst = mem();
  inst.write(['a'], 'mem', 1);
  for (const bad of ['secure', 'FILE', 'disk', 'session', '']) {
    assert.throws(
      () => inst.read(['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  for (const bad of [1, true, {}, () => {}]) {
    assert.throws(
      () => inst.read(['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  // **⟶ RESHAPED 2026-10-16 TO THE ADJUDICATED READING (`parameter-semantics.md §2.6`'s `PAR-JS-6` row, its
  // `the declared answer for EACH outside value` cell AS RECONCILED THE SAME DATE):** *"`a.read(address,
  // undefined)` IS A SUPPLIED VALUE AT THIS POSITION AND TAKES `PAR-JS-6`'s DECLARED ANSWER — the store's own
  // thrown `{status, message}` with `status` `AddressMalformed` — while the ONE CALL THAT FOLDS TO THE ABSENT
  // ROW IS `a.read(address)`, WHICH SUPPLIED NOTHING THERE; `acceptance.md §4.1` item `7`'s "folds to the
  // ABSENT row" is READ THROUGH THIS ROW FROM 2026-10-16"*. **THE PRE-CHANGE READING PRINTED HERE ONCE —
  // "a SUPPLIED `undefined` and an OMITTED position are the SAME state" — IS THE SUPERSEDED ONE, IS
  // WITHDRAWN, AND IS NOT RESTORED** (`crossing.md §1.3`'s absent-versus-`undefined` clause, rule 1, read
  // through the row above): the two positions are NOT the same state, and `undefined` joins `null` here.
  assert.equal(inst.read(['a']), 1, 'an OMITTED tier: the one call that folds to the absent row');
  assert.throws(
    () => inst.read(['a'], undefined),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'a SUPPLIED `undefined` is PRESENT at this position and takes `PAR-JS-6`\'s own `AddressMalformed`',
  );
  assert.throws(
    () => inst.read(['a'], null),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'row 4: `null` is PRESENT and is not a tier — the same answer, on the same ground',
  );
  for (const member of [null, 1, true, {}, () => {}]) {
    assert.throws(
      () => inst.read(['a'], ['mem', member]),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
});

test('verbs_write_requires_a_singular_tier_and_refuses_every_array', () => {
  const inst = mem();
  assert.throws(
    () => inst.write(['a'], undefined, 1),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
  );
  for (const bad of [[], ['mem'], ['mem', 'temp']]) {
    assert.throws(
      () => inst.write(['a'], bad, 1),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
      'the array spelling is the READER\'s arity',
    );
  }
});

test('verbs_write_returns_its_three_member_record_and_burns_nothing_on_failure', () => {
  const inst = mem();
  const record = inst.write(['a'], 'mem', { v: 1 });
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched']);
  assert.equal(record.op.kind, 'write');
  assert.equal(record.op.tier, 'mem');
  assert.deepEqual(record.op.address, ['a']);
  assert.equal(record.op.before.present, false);
  assert.equal(record.op.after.present, true);
  assert.equal(typeof record.op.seq, 'number');
  assert.equal(typeof record.op.compacted, 'boolean');
  assert.throws(() => inst.write(['b'], 'mem', () => {}));
  assert.throws(() => inst.read(['b']), 'a refused write installs nothing');
});

test('verbs_delete_returns_the_receipt_with_address_verbatim_and_canonical_tiers', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause;
  // `§2.12` item 3's ONE-SPELLING rule): the declared signature is `delete(address, tier?)` — `2` positions,
  // NO leading `instance` — so the as-filed `inst.delete(inst, ['a'])` landed `inst` at the ADDRESS position
  // and the cell answered `OutOfDomainTier` on `'a'`'s own account instead of reading the receipt. The
  // leading receiver is DROPPED (`8 → 1` ✓) and the two positions this cell declares are the two it passes.**
  const inst = mem();
  inst.write(['a'], 'mem', 1);
  inst.write(['a'], 'temp', 2);
  const receipt = inst.delete(['a']);
  assert.deepEqual(receipt.address, ['a'], 'address VERBATIM');
  assert.deepEqual(receipt.tiers, ['mem', 'temp'], 'the store\'s canonical order');
  assert.deepEqual(receipt.triggered, [], 'no registration matched');
});

test('verbs_delete_naming_a_tier_the_target_does_not_hold_is_a_success_with_no_tiers', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): DROPPED LEADING RECEIVER, the
  // declared `delete(address, tier?)` reading. The as-filed form `inst.delete(inst, ['a'], 'temp')` put
  // `inst` at the ADDRESS position — the cell's own comment says the tier was the position meant.**
  const inst = mem();
  inst.write(['a'], 'mem', 1);
  const receipt = inst.delete(['a'], 'temp');
  assert.deepEqual(receipt.tiers, [], 'the in-domain no-op arm');
  assert.equal(inst.read(['a'], 'mem'), 1, 'it removes nothing');
});

test('verbs_delete_refuses_an_array_or_out_of_domain_tier', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): DROPPED LEADING RECEIVER — the
  // bad value belongs at the TIER position, not at an address position `inst` occupied.** And the `null`/
  // `undefined` arm below is a SUPPLIED position, outside `PAR-JS-7`'s domain.
  const inst = mem();
  for (const bad of [[], ['mem'], 'secure', 1, true]) {
    assert.throws(
      () => inst.delete(['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  for (const bad of [null, undefined]) {
    assert.throws(
      () => inst.delete(['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    );
  }
});

test('verbs_rollback_returns_its_three_member_result_and_refuses_every_outside_op_id', () => {
  const inst = mem();
  inst.write(['safe'], 'mem', 1);
  const record = inst.write(['risky'], 'mem', -1);
  const result = inst.rollback(record.op.opId);
  assert.deepEqual(Object.keys(result).sort(), ['opId', 'restoredTo', 'undoneOps']);
  assert.equal(result.opId, record.op.opId, 'it echoes the id it was passed');
  assert.equal(result.restoredTo.present, false);
  assert.throws(() => inst.read(['risky']), 'the rollback reversed the op\'s scope');

  for (const bad of ['', 1, null, undefined]) {
    assert.throws(
      () => inst.rollback(bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    );
  }
  assert.throws(
    () => inst.rollback('op-never-minted'),
    (err) => isTheFailureForm(err) && err.status === 'JournalOpUnknown',
  );
});

test('verbs_read_literal_narrows_to_a_leaf', () => {
  const inst = mem();
  inst.write(['leaf'], 'mem', 7);
  assert.equal(inst.readLiteral(['leaf']), 7);
  assert.throws(
    () => inst.readLiteral(['leaf', 'child']),
    (err) => isTheFailureForm(err) && err.status === 'LeafHasNoDownstream',
  );
});

// ---------------------------------------------------------------------------------------------
// `§1.2` row 1's lone surrogate — THE ONE CLASS THAT BELONGS TO THIS LAYER AND TO NO OTHER
// ---------------------------------------------------------------------------------------------

test('crossing_a_lone_surrogate_is_refused_at_the_packages_own_walk', () => {
  // `crossing.md §1.2` row 1's dated clause of 2026-10-11 and `acceptance.md §4.1` item 6: **a JS `string`
  // carrying a LONE SURROGATE (an unpaired surrogate code unit) is REFUSED `ValueNotAdmitted` AT THE
  // PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED** — the class cannot be represented as the store's
  // `StoreValue::Str`, and it is never silently replaced, dropped or normalized. **THE DRIVE BELONGS TO
  // THIS LAYER ALONE:** no Rust `String` can carry the input, so the Rust cells drive only the nearest
  // representable neighbours (`bindings/js/tests/crossing_values.rs`).
  const lone = ['\uD800', 'a\uD800b', '\uDC00', 'x\uDC00'];
  const inst = mem();
  for (const bad of lone) {
    assert.throws(
      () => inst.write(['s'], 'mem', bad),
      (err) => isTheFailureForm(err) && err.status === 'ValueRefusedAtBoundary',
      `a lone surrogate as a VALUE is refused: ${JSON.stringify(bad)}`,
    );
  }
  // NOTHING WAS MINTED AND NOTHING WAS DROPPED (`§1.2`'s refusal clause; `§1.4` item 3's "the key is NEVER
  // dropped" is the same answer at another site).
  assert.throws(() => inst.read(['s']), 'a refused write installs nothing');
  // And the nearest representable neighbours stand as ACCEPTED: a valid surrogate PAIR (an astral
  // character) and the replacement character.
  for (const good of ['\uD83D\uDE00', 'a\uD83D\uDE00b', '\uFFFD']) {
    inst.write(['ok'], 'mem', good);
    assert.equal(inst.read(['ok']), good, `an astral character is an ordinary string: ${good}`);
  }
});

// ---------------------------------------------------------------------------------------------
// `§2.2` address shapes, and `DD-46`'s no-arity-check rule
// ---------------------------------------------------------------------------------------------

test('address_the_declared_shapes_and_every_outside_shape', () => {
  const inst = mem();
  // THE MAP SIDE. A string segment resolves against a `MAP` and against the register, and a `MAP` is what a
  // JSON **object** write decides (`store-model.md §1.3`). The containers the write runs through are created
  // first: a write's parent is resolved BY ADDRESS (`write-and-read.md §3.2`).
  inst.write(['a'], 'mem', {});
  inst.write(['a', 'b'], 'mem', 1);
  assert.equal(inst.read(['a', 'b']), 1, 'a string segment addresses a map');
  // **THE VEC SIDE — THE INTEGER SEGMENT'S OWN DECLARED ROUTE, FOUND BEFORE ANY DRIVE WAS WRITTEN**
  // (`crossing.md §1.3`'s `AddressArg` rows admit a non-negative integer segment; `store-model.md §1.3`
  // declares the container that segment resolves against): **`MAP` xor `VEC`, *"write-decided and
  // read-inferred"* — *"a write of a JSON object decides/uses `MAP`; a write of a JSON ARRAY decides/uses
  // `VEC`"*, and a `VEC`'s key domain is *"index keys — non-negative integers, CONTIGUOUS FROM `0`"*.**
  // **So the declared JS spelling that MINTS a `VEC` is an ARRAY write, and there is no second spelling**:
  // the index then lands at the container's own contiguous end (`write-and-read.md §3.4`'s `VEC`
  // index-range clause: `i = n` APPENDS; an index outside `0 ≤ i ≤ n` is `F-4`'s `ContainerKindConflict`).
  inst.write(['v'], 'mem', []);
  assert.deepEqual(inst.read(['v']), [], 'the array write MINTS the `VEC`, and its read is the dense array');
  inst.write(['v', 0], 'mem', {});
  inst.write(['v', 0, 'b'], 'mem', 1);
  assert.equal(inst.read(['v', 0, 'b']), 1, 'a non-negative integer segment addresses a `VEC` index');
  assert.deepEqual(
    inst.read(['v']),
    [{ b: 1 }],
    '`R-3`: the `VEC` answers a DENSE array, and `crossing.md §1.5` item 2 makes its index order significant',
  );
  inst.write([''], 'mem', 2);
  assert.equal(inst.read(['']), 2, 'the empty string IS a legal key and a legal register key');
  inst.write(['a.b'], 'mem', 3);
  assert.equal(inst.read(['a.b']), 3, 'a key containing a dot is a key, not a delimiter');
  for (const bad of [undefined, null, 'a.b', 1, true, {}, () => {}, ['a', -1], ['a', 1.5], ['a', null], ['a', true], [['nested']]]) {
    assert.throws(
      () => inst.read(bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
      `address ${JSON.stringify(bad)} is outside the domain`,
    );
  }
  const sparse = [1, , 3]; // eslint-disable-line no-sparse-arrays
  assert.throws(
    () => inst.read(sparse),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'DD-8: neither reading of a hole may be chosen silently',
  );
  assert.throws(
    () => inst.read(new Proxy(['a'], {})),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'DD-34: the binding owns proxy detection at the argument boundary',
  );
});

// **THE REFUSAL THE `VEC` ROUTE ABOVE EXPOSED, GIVEN ITS OWN HONEST DRIVE** (the 2026-10-11 `V-1` pass):
// **the cell's first form wrote an INTEGER segment into a container a JSON OBJECT write had made a `MAP`,
// and it was green only while the pre-`V-1` JS tree was KIND-PERMISSIVE — the very divergence the rewire
// removed.** **The declared behaviour is a REFUSAL and it has its own member:** `store-model.md §1.3`'s
// KEY-DOMAIN clause — *"the container's key domain is part of the container's kind (`MAP` = string keys;
// `VEC` = index keys, contiguous from `0`), so a write whose LAST segment's CLASS contradicts the resolved
// parent container's key domain — a string segment aimed at a `VEC`, or an integer segment aimed at a `MAP`
// — is a KIND CONTRADICTION, and its answer is the SAME member the value's kind contradiction answers:
// `ContainerKindConflict`, with NOTHING INSTALLED (no anchor, no coercion, no container-kind change, and no
// journal entry)"* (`write-and-read.md §3.4` arm `F-4`; `§8.1` #7) — **and the message is the GENERATED one,
// whose form `seams-and-lifecycle.md`'s (and `contract.md`'s) message table prints as
// `"<value> does not match the container kind of '<address>', it holds a <map|vector>"`, plus
// `", keys are <KEYLIST>"` where the container is a map that HOLDS keys.**
test('address_an_integer_segment_aimed_at_a_map_is_refused_with_its_own_code_and_generated_message', () => {
  const inst = mem();
  inst.write(['a'], 'mem', {});
  assert.throws(
    () => inst.write(['a', 0], 'mem', 1),
    (err) =>
      isTheFailureForm(err) &&
      err.status === 'ContainerKindConflict' &&
      /^0 does not match the container kind of 'a', it holds a map(, keys are .*)?$/.test(err.message),
    '`store-model.md §1.3`\'s key-domain arm; `write-and-read.md §3.4` `F-4`',
  );
  // NOTHING WAS INSTALLED: no anchor, no coercion, no container-kind change — the empty `MAP` is what it was.
  assert.deepEqual(inst.read(['a']), {}, 'the map stands untouched');
  // AND THE SYMMETRIC DIRECTION OF THE SAME ARM — a STRING segment aimed at a `VEC` — IS THE SAME MEMBER.
  inst.write(['v'], 'mem', [1]);
  assert.throws(
    () => inst.write(['v', 'b'], 'mem', 1),
    (err) =>
      isTheFailureForm(err) &&
      err.status === 'ContainerKindConflict' &&
      /^'b' does not match the container kind of 'v', it holds a vector(, keys are .*)?$/.test(err.message),
    'no coercion: `"0"` is never `0` and `0` is never `"0"` (`store-model.md §1.5` items 2–3)',
  );
  assert.deepEqual(inst.read(['v']), [1], 'the vector stands untouched');
});

test('address_the_package_performs_no_arity_check_of_its_own', () => {
  const inst = mem();
  // A missing argument reaches the store's own carrier value and answers the store's own code — never a
  // package `TypeError` (`DD-46`).
  assert.throws(
    () => inst.read(inst),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
  );
  assert.throws(
    () => inst.write(['a'], 'mem'),
    (err) => isTheFailureForm(err) && err.status === 'ValueRefusedAtBoundary',
    'an absent value is the boundary\'s own answer',
  );
  assert.throws(
    () => inst.read(['a'], 'mem', 'an extra argument'),
    (err) => err === undefined || isTheFailureForm(err) || typeof err.status === 'string',
    'an extra argument is not the package\'s business either way: it must not be a TypeError of its own',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.5` the single failure form, at its own throw site
// ---------------------------------------------------------------------------------------------

// **⟶ RE-DERIVED 2026-10-16 — THE CELL'S WHOLE SUBJECT WAS THE THROWN RECORD'S MEMBER SET, AND THAT SET
// IS NOW THREE MEMBERS AND NOT TWO** (`surface.md §2.5` item 4: *"the three-member member set is therefore
// FLAT ACROSS ARMS and not conditional"*; item 9: *"`Object.keys(caught)` reads exactly
// `["log","message","status"]` and `Object.keys(caught).length` is `3` on EVERY arm"*). **THE CELL IS
// RE-DERIVED RATHER THAN DELETED: its subject is the same one — the thrown record's plain shape at its own
// throw site — and the `AddressNotFound` status it pinned is UNMOVED.** The member-set limb now reads the
// three declared members, and the arm is a `[]` arm: a `read` whose address is absent opens no attempt
// (`§2.5` item 4's own enumeration), so the empty array is the DECLARED value.
test('failure_form_the_thrown_object_is_a_plain_three_member_record', () => {
  const inst = mem();
  assert.throws(
    () => inst.read(['gone']),
    (err) => isTheFailureForm(err) && err.status === 'AddressNotFound',
  );
  // AND THE MEMBER SET READ DIRECTLY OFF THE CAUGHT VALUE, so the census does not rest on the predicate
  // alone (`surface.md §2.5` item 9).
  let caught = null;
  try {
    inst.read(['gone']);
  } catch (err) {
    caught = err;
  }
  assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status'],
    'the thrown record carries EXACTLY the three declared members, sorted ascending — FLAT across every '
    + 'arm of this surface (`surface.md §2.5` item 4; item 9)');
  assert.equal(Object.keys(caught).length, 3,
    '`Object.keys(caught).length` is `3` on this arm (`surface.md §2.5` item 9)');
  assert.ok(Array.isArray(caught.log),
    '`log` is an ARRAY — never absent, never `null`, never a non-array (`surface.md §2.5` item 9; '
    + '`parameter-semantics.md §2.26`\'s `domain` cell)');
  assert.deepEqual(caught.log, [],
    'and a `read` with no attempt live carries `log: []` — the empty array and never a placeholder entry '
    + '(`surface.md §2.5` item 4)');
});

test('failure_form_the_prototype_is_the_caller_realms_object_prototype', () => {
  const inst = mem();
  try {
    inst.read(['gone']);
    assert.fail('the read must throw');
  } catch (err) {
    assert.equal(Object.getPrototypeOf(err), Object.prototype);
    assert.ok(!(err instanceof Error), 'no Error subclass (DD-12)');
    // **⟶ RE-SPELLED 2026-10-16**: the as-filed label read *"no third member, and no `stack`"*, and the
    // form NOW DECLARES a third member (`log`, `surface.md §2.5` item 4), so the label would name the
    // opposite of the law. **THE ASSERTIONS THEMSELVES ARE UNMOVED AND NOTHING IS WEAKENED**: these four
    // members are absent exactly as they were, and they are absent because they are NOT members the form
    // declares — **the descriptor clause (`§2.5` item 9) puts `log` ON THE OBJECT AS AN ORDINARY OWN
    // ENUMERABLE DATA MEMBER, which is precisely why an `Error`-shaped apparatus stays off it.** A `stack`
    // or a `code` member appearing here would be a FINDING at the site that produced it.
    assert.equal(err.stack, undefined,
      'no `stack` — the form declares `log`, `message` and `status` and no `Error` apparatus '
      + '(`surface.md §2.5` item 9: ordinary own enumerable data members, no prototype entry and no getter)');
    assert.equal(err.code, undefined);
    assert.equal(err.cause, undefined);
    assert.equal(err.name, undefined);
  }
});

test('failure_form_the_status_is_a_member_token_verbatim_and_the_message_is_generated', () => {
  const inst = mem();
  try {
    inst.read(['gone']);
    assert.fail('the read must throw');
  } catch (err) {
    assert.ok(THE_SIXTEEN.includes(err.status), 'the store\'s own member token VERBATIM');
    assert.equal(err.status, err.status.trim(), 'never prefixed or padded');
    assert.ok(err.message.length > 0 && !/TBD|placeholder/i.test(err.message));
  }
});

test('failure_form_is_thrown_and_never_returned', async () => {
  const inst = mem();
  // No returned tagged union and no `{ok, value}` envelope: the success path returns the value itself.
  const value = inst.read([]);
  assert.ok(!(value && typeof value === 'object' && 'ok' in value));
  // And no `Promise` rejection: every verb is synchronous.
  let returned;
  try {
    returned = inst.read(['gone']);
  } catch {
    returned = 'threw';
  }
  assert.equal(returned, 'threw');
  assert.ok(!(inst.read([]) instanceof Promise));
});

test('failure_form_the_crossing_reaches_its_own_codes_and_a_failed_read_is_the_probe', () => {
  const inst = mem();
  const seen = new Set();
  const drive = (fn) => {
    try {
      fn();
    } catch (err) {
      assert.ok(isTheFailureForm(err), 'every failure that crosses is the one form');
      seen.add(err.status);
    }
  };
  drive(() => inst.read(undefined)); //                                    AddressMalformed
  drive(() => inst.read(['gone'])); //                                     AddressNotFound
  inst.write(['leaf'], 'mem', 'v');
  drive(() => inst.read(['leaf', 'child'])); //                           LeafHasNoDownstream
  drive(() => inst.read(['leaf'], 'file')); //                            TierNotFound
  drive(() => inst.read([], 'secure')); //                                OutOfDomainTier
  drive(() => inst.write(['b'], 'mem', () => {})); //                     ValueNotAdmitted
  drive(() => inst.write([], 'mem', 1)); //                               WriteParentNotLink
  drive(() => inst.rollback('no-such-op')); //                            JournalOpUnknown
  drive(() => storeCreate({ listeners: [] })); //                          ConstructionArgumentMissing
  drive(() =>
    storeCreate({ journalLength: 8, filePath: '/nonexistent/dir/x.json', listeners: [] }),
  ); //                                                                     FilePathUnreachable
  // **⟶ ADDED 2026-10-15 (`DEF-2026-10-15-Y`): THE SIXTEENTH MEMBER'S OWN JS-REACHABLE TRIGGER.** The
  // `constraints` key's own arm, driven at the construction's instant with a list whose element lies
  // outside `{ address, id }` (`§7.1` step 4-bis; `parameter-semantics.md §2.21`). `surface.md §2.9`
  // item 2 leaves NO code without a JS-reachable trigger, and this was the code that had none here.
  drive(() => storeCreate({ journalLength: 8, listeners: [], constraints: [['a']] }));
  //                                                                        ConstraintListInvalid
  const required = [
    'AddressMalformed',
    'AddressNotFound',
    'LeafHasNoDownstream',
    'TierNotFound',
    'OutOfDomainTier',
    'ValueRefusedAtBoundary',
    'WriteParentNotLink',
    'JournalOpUnknown',
    'ConstructionArgumentMissing',
    'FilePathUnreachable',
    'ConstraintListInvalid',
  ];
  for (const code of required) {
    assert.ok(seen.has(code), `\`${code}\` remains reachable from JS (surface.md §2.9 item 2)`);
  }
  for (const code of seen) assert.ok(THE_SIXTEEN.includes(code), `\`${code}\` is outside the closed set`);
  // The existence probe: a read that resolves answers the value, and one that does not throws.
  assert.equal(inst.read(['leaf']), 'v');
});

test('failure_form_carries_no_discrimination_rule_between_a_value_and_a_failure', () => {
  const inst = mem();
  const lookalike = { status: 'AddressNotFound', message: 'generated' };
  inst.write(['a'], 'mem', lookalike);
  assert.deepEqual(inst.read(['a']), lookalike, 'the caller carries the anti-pattern (A64)');
});

// ---------------------------------------------------------------------------------------------
// `§2.6` the constraint/repair pattern — a USAGE PATTERN over declared verbs
// ---------------------------------------------------------------------------------------------

test('constraint_pattern_evaluate_after_write_and_reverse_with_rollback', () => {
  const inst = mem();
  inst.write(['safe'], 'mem', 1);
  const record = inst.write(['risky'], 'mem', -1);
  // Client-side evaluation, after the write returned.
  const violated = inst.read(['risky']) < 0;
  assert.ok(violated);
  inst.rollback(record.op.opId);
  assert.throws(() => inst.read(['risky']));
  assert.equal(inst.read(['safe']), 1, 'the sibling state stands');
});

test('constraint_pattern_no_constraint_verb_parameter_or_record_exists', () => {
  // **RESHAPED 2026-10-16 ON `A127`/`A126`.** The pre-`A127` cell asserted the five names against the MODULE
  // NAMESPACE's eight verbs; the namespace is now ONE name and the product carries the constraint route, so
  // the cell asserts the same prohibition at the surface that now exists. **`surface.md §2.6`'s *"NO constraint
  // verb … is declared"* is FALSIFIED FOR THE ADD ROUTE by `A123`/`A126` — whose route is the three METHODS
  // `§2.12` item 2 declares — and the prohibition that SURVIVES is `constrain`, the BANNED VERB
  // (`docs/specs/storeroom-constraints/adoption-dossier.md §3` row 2), plus every other name never declared.**
  const api = { storeCreate };
  for (const name of ['constrain', 'repair', 'validate', 'onViolation', 'manageConstraints']) {
    assert.ok(!(name in api), `\`${name}\` is not declared: no banned verb and no second route`);
  }
  const inst = mem();
  for (const name of ['constrain', 'repair', 'validate', 'onViolation', 'manageConstraints']) {
    assert.ok(!(name in inst), `\`${name}\` is not a member of the product either`);
  }
  // And no function crosses at any position: the store's own surface takes no function (`A73`).
  assert.throws(
    () => inst.write(['a'], 'mem', () => {}),
    (err) => isTheFailureForm(err) && err.status === 'ValueRefusedAtBoundary',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.8` the two file-behaviour readings a JS caller will meet
// ---------------------------------------------------------------------------------------------

test('file_readings_a_delete_and_a_rollback_perform_no_file_io', async () => {
  const { mkdtemp, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = await mkdtemp(join(tmpdir(), 'storeroom-js-redset-'));
  const path = join(dir, 'store.json');
  try {
    const inst = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `contract.md §7.2` items 1–2 AS AMENDED, `surface.md §2.11`
    // clause 2): the last successful `file` WRITE's bytes are put at the path by THE TERMINAL ARM'S OWN ACT,
    // which this cell now drives after the verb returned its `WriteResult`.** The two readings this cell
    // asserts — the delete is not durable, and the fresh boot re-loads the WRITE's image — are unmoved.
    const held = await fileCommit(inst, ['a'], 1);
    assert.equal(
      held.outcome,
      'passed',
      `P-TP-8: the attempt HELD — the terminal arm's own act landed at the path (rollback: ${JSON.stringify(held.rollback)})`,
    );
    inst.delete(['a'], 'file');
    assert.throws(() => inst.read(['a'], 'file'), 'removed in the live store');
    const fresh = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    assert.equal(
      fresh.read(['a'], 'file'),
      1,
      'DD-45: a fresh boot over an equal path re-loads the last successful `file` WRITE, and the removed version STANDS AGAIN'
      // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127`
      // clause): the as-filed `inst.inst.read(fresh, …)` read a member `inst` off a receiver whose twelve
      // declared members are `10 + 1 + 1 = 12` — `inst.inst` is not one of them — and carried the fresh
      // instance at the dropped leading position. The reading is a method on the FRESH receiver, which is
      // the store whose boot re-loads the image `DD-45` names, and no position other than `address`/`tier`
      // is declared for it.**
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('file_readings_a_failed_file_commit_answers_file_commit_failed', async () => {
  const { mkdtemp, rm, mkdir, writeFile, unlink } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = await mkdtemp(join(tmpdir(), 'storeroom-js-redset-commit-'));
  const path = join(dir, 'store.json');
  try {
    const inst = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    await writeFile(path, '{}');
    inst.write(['ok'], 'mem', 1);
    // The trigger is the REAL one: the path is replaced by a directory after the instance exists.
    await unlink(path);
    await mkdir(path);
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` item 1 AS AMENDED, `surface.md §2.11` clause 5): the VERB
    // takes no byte of the path — *"it performs NO FILE I/O ON ANY OF ITS ARMS"* — so it does NOT refuse here;
    // THE FAILURE IS THE TERMINAL ARM'S ACT'S, *"the store rolls the write back FIRST and the call answers
    // with a message SECOND"*, and this cell reads the refusal off the attempt that reaches that act.** The
    // code, the failure form and the automatic rollback the reading names are unmoved.
    const { commit, runAttempt } = await kernel();
    assert.throws(
      () => runAttempt(inst, commit(inst, ['never'], 'file', 2)),
      (err) => isTheFailureForm(err) && err.status === 'FileCommitFailed',
      'the failure is passed back AFTER the store\'s own automatic journal rollback',
    );
    assert.throws(
      () => inst.read(['never'], 'file'),
      'P-IM-2: the failed commit installed nothing — the rollback ran before the caller was answered',
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('file_readings_a_path_that_fails_the_probe_answers_file_path_unreachable_and_creates_nothing', async () => {
  const { mkdtemp, rm, stat } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = await mkdtemp(join(tmpdir(), 'storeroom-js-redset-probe-'));
  const missing = join(dir, 'no-such-parent', 'file.json');
  try {
    assert.throws(
      () => storeCreate({ filePath: missing, journalLength: 8, listeners: [] }),
      (err) => isTheFailureForm(err) && err.status === 'FilePathUnreachable',
    );
    await assert.rejects(() => stat(join(dir, 'no-such-parent')), 'the probe is a DRY RUN');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('file_readings_two_instances_over_one_path_are_the_callers_own_declared_hazard', async () => {
  const { mkdtemp, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = await mkdtemp(join(tmpdir(), 'storeroom-js-redset-two-'));
  const path = join(dir, 'store.json');
  try {
    const first = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    const second = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `contract.md §7.2` items 1–2 AS AMENDED, `surface.md §2.11`
    // clause 2): neither instance's VERB puts a byte at the path — the `file`-tier durable commit is THE
    // TERMINAL ARM'S OWN ACT on each side — so this cell drives both acts, in the order the as-filed line
    // declared: the first instance's image, then the second instance's own snapshot over it.** The reading
    // this cell asserts — the last commit's image is the caller's own declared hazard — is unmoved.
    const firstHeld = await fileCommit(first, ['first'], 1);
    const secondHeld = await fileCommit(second, ['second'], 2);
    assert.equal(firstHeld.outcome, 'passed', "the first instance's own act HELD");
    assert.equal(secondHeld.outcome, 'passed', "the second instance's own act HELD");
    const fresh = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    assert.equal(fresh.read(['second'], 'file'), 2, 'the second instance\'s write clobbered the first\'s bytes');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
