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

import {
  storeCreate,
  read,
  readLiteral,
  write,
  delete as remove,
  rollback,
  listen,
  unlisten,
} from 'provident-storeroom';

const THE_FIFTEEN = [
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
];

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

/// The one failure form's own predicate — `surface.md §2.5` items 1–3.
function isTheFailureForm(err) {
  return (
    err !== null &&
    typeof err === 'object' &&
    !Array.isArray(err) &&
    Object.getPrototypeOf(err) === Object.prototype &&
    Object.keys(err).sort().join(',') === 'message,status' &&
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
  assert.ok(read(inst, []) !== undefined, 'the empty address resolves to the register');
});

test('construction_an_absent_file_path_is_in_domain_and_creates_the_register_at_mem', () => {
  const inst = mem();
  write(inst, ['a'], 'mem', 1);
  assert.equal(read(inst, ['a'], 'mem'), 1, 'the register is at mem');
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
  const record = write(inst, ['a'], 'mem', 1);
  assert.deepEqual(record.triggered, []);
});

test('construction_a_duplicate_address_is_kept_with_both_handles', () => {
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
  ]);
  const record = write(inst, ['a'], 'mem', 1);
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
  const a = mem();
  const b = storeCreate({ journalLength: 8, listeners: [], journalPath: '/tmp/x' });
  write(a, ['k'], 'mem', 1);
  write(b, ['k'], 'mem', 1);
  assert.deepEqual(read(a, ['k']), read(b, ['k']));
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
  write(inst, ['leaf'], 'mem', 'v');
  assert.equal(read(inst, ['leaf']), 'v');
  write(inst, ['branch'], 'mem', { k: 1 });
  assert.deepEqual(read(inst, ['branch']), { k: 1 }, 'the assembled value');
  assert.deepEqual(Object.keys(read(inst, [])).sort(), ['branch', 'leaf'], 'the whole register');
});

test('verbs_read_accepted_tier_shapes_and_the_any_match_set', () => {
  const inst = mem();
  write(inst, ['a'], 'mem', 1);
  assert.equal(read(inst, ['a'], 'mem'), 1);
  assert.equal(read(inst, ['a'], ['mem']), 1);
  assert.equal(read(inst, ['a'], ['file', 'mem', 'temp']), 1, 'an ANY-MATCH set');
  assert.equal(read(inst, ['a'], []), 1, 'the zero-token set');
  assert.equal(read(inst, ['a']), 1, 'an ABSENT tier');
});

test('verbs_read_refused_tier_shapes_answer_their_own_codes', () => {
  const inst = mem();
  write(inst, ['a'], 'mem', 1);
  for (const bad of ['secure', 'FILE', 'disk', 'session', '']) {
    assert.throws(
      () => read(inst, ['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  for (const bad of [1, true, {}, () => {}]) {
    assert.throws(
      () => read(inst, ['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  // **THE THREE STATES, SEPARATED BY THE REMANDED RULE** (`crossing.md §1.3`'s absent-versus-`undefined`
  // clause, rule 1; `acceptance.md` §4.1 item 7): `read(i, a)` and `read(i, a, undefined)` are the SAME
  // state — `TierArg` row 3's ABSENT, IN DOMAIN on a reader — while `read(i, a, null)` is PRESENT and
  // answers row 4's `AddressMalformed`. **THE PRE-REMAND READING** — that a caller could distinguish the
  // two by the call's own arity — **is superseded**, so `undefined` no longer joins `null` here.
  assert.equal(read(inst, ['a']), 1, 'an ABSENT tier');
  assert.equal(read(inst, ['a'], undefined), 1, 'a tier position spelled `undefined` folds to the ABSENT row');
  assert.throws(
    () => read(inst, ['a'], null),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'row 4: `null` is PRESENT and is not a tier',
  );
  for (const member of [null, 1, true, {}, () => {}]) {
    assert.throws(
      () => read(inst, ['a'], ['mem', member]),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
});

test('verbs_write_requires_a_singular_tier_and_refuses_every_array', () => {
  const inst = mem();
  assert.throws(
    () => write(inst, ['a'], undefined, 1),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
  );
  for (const bad of [[], ['mem'], ['mem', 'temp']]) {
    assert.throws(
      () => write(inst, ['a'], bad, 1),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
      'the array spelling is the READER\'s arity',
    );
  }
});

test('verbs_write_returns_its_three_member_record_and_burns_nothing_on_failure', () => {
  const inst = mem();
  const record = write(inst, ['a'], 'mem', { v: 1 });
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched']);
  assert.equal(record.op.kind, 'write');
  assert.equal(record.op.tier, 'mem');
  assert.deepEqual(record.op.address, ['a']);
  assert.equal(record.op.before.present, false);
  assert.equal(record.op.after.present, true);
  assert.equal(typeof record.op.seq, 'number');
  assert.equal(typeof record.op.compacted, 'boolean');
  assert.throws(() => write(inst, ['b'], 'mem', () => {}));
  assert.throws(() => read(inst, ['b']), 'a refused write installs nothing');
});

test('verbs_delete_returns_the_receipt_with_address_verbatim_and_canonical_tiers', () => {
  const inst = mem();
  write(inst, ['a'], 'mem', 1);
  write(inst, ['a'], 'temp', 2);
  const receipt = remove(inst, ['a']);
  assert.deepEqual(receipt.address, ['a'], 'address VERBATIM');
  assert.deepEqual(receipt.tiers, ['mem', 'temp'], 'the store\'s canonical order');
  assert.deepEqual(receipt.triggered, [], 'no registration matched');
});

test('verbs_delete_naming_a_tier_the_target_does_not_hold_is_a_success_with_no_tiers', () => {
  const inst = mem();
  write(inst, ['a'], 'mem', 1);
  const receipt = remove(inst, ['a'], 'temp');
  assert.deepEqual(receipt.tiers, [], 'the in-domain no-op arm');
  assert.equal(read(inst, ['a'], 'mem'), 1, 'it removes nothing');
});

test('verbs_delete_refuses_an_array_or_out_of_domain_tier', () => {
  const inst = mem();
  for (const bad of [[], ['mem'], 'secure', 1, true]) {
    assert.throws(
      () => remove(inst, ['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'OutOfDomainTier',
    );
  }
  for (const bad of [null, undefined]) {
    assert.throws(
      () => remove(inst, ['a'], bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    );
  }
});

test('verbs_rollback_returns_its_three_member_result_and_refuses_every_outside_op_id', () => {
  const inst = mem();
  write(inst, ['safe'], 'mem', 1);
  const record = write(inst, ['risky'], 'mem', -1);
  const result = rollback(inst, record.op.opId);
  assert.deepEqual(Object.keys(result).sort(), ['opId', 'restoredTo', 'undoneOps']);
  assert.equal(result.opId, record.op.opId, 'it echoes the id it was passed');
  assert.equal(result.restoredTo.present, false);
  assert.throws(() => read(inst, ['risky']), 'the rollback reversed the op\'s scope');

  for (const bad of ['', 1, null, undefined]) {
    assert.throws(
      () => rollback(inst, bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    );
  }
  assert.throws(
    () => rollback(inst, 'op-never-minted'),
    (err) => isTheFailureForm(err) && err.status === 'JournalOpUnknown',
  );
});

test('verbs_read_literal_narrows_to_a_leaf', () => {
  const inst = mem();
  write(inst, ['leaf'], 'mem', 7);
  assert.equal(readLiteral(inst, ['leaf']), 7);
  assert.throws(
    () => readLiteral(inst, ['leaf', 'child']),
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
      () => write(inst, ['s'], 'mem', bad),
      (err) => isTheFailureForm(err) && err.status === 'ValueNotAdmitted',
      `a lone surrogate as a VALUE is refused: ${JSON.stringify(bad)}`,
    );
  }
  // NOTHING WAS MINTED AND NOTHING WAS DROPPED (`§1.2`'s refusal clause; `§1.4` item 3's "the key is NEVER
  // dropped" is the same answer at another site).
  assert.throws(() => read(inst, ['s']), 'a refused write installs nothing');
  // And the nearest representable neighbours stand as ACCEPTED: a valid surrogate PAIR (an astral
  // character) and the replacement character.
  for (const good of ['\uD83D\uDE00', 'a\uD83D\uDE00b', '\uFFFD']) {
    write(inst, ['ok'], 'mem', good);
    assert.equal(read(inst, ['ok']), good, `an astral character is an ordinary string: ${good}`);
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
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', 1);
  assert.equal(read(inst, ['a', 'b']), 1, 'a string segment addresses a map');
  // **THE VEC SIDE — THE INTEGER SEGMENT'S OWN DECLARED ROUTE, FOUND BEFORE ANY DRIVE WAS WRITTEN**
  // (`crossing.md §1.3`'s `AddressArg` rows admit a non-negative integer segment; `store-model.md §1.3`
  // declares the container that segment resolves against): **`MAP` xor `VEC`, *"write-decided and
  // read-inferred"* — *"a write of a JSON object decides/uses `MAP`; a write of a JSON ARRAY decides/uses
  // `VEC`"*, and a `VEC`'s key domain is *"index keys — non-negative integers, CONTIGUOUS FROM `0`"*.**
  // **So the declared JS spelling that MINTS a `VEC` is an ARRAY write, and there is no second spelling**:
  // the index then lands at the container's own contiguous end (`write-and-read.md §3.4`'s `VEC`
  // index-range clause: `i = n` APPENDS; an index outside `0 ≤ i ≤ n` is `F-4`'s `ContainerKindConflict`).
  write(inst, ['v'], 'mem', []);
  assert.deepEqual(read(inst, ['v']), [], 'the array write MINTS the `VEC`, and its read is the dense array');
  write(inst, ['v', 0], 'mem', {});
  write(inst, ['v', 0, 'b'], 'mem', 1);
  assert.equal(read(inst, ['v', 0, 'b']), 1, 'a non-negative integer segment addresses a `VEC` index');
  assert.deepEqual(
    read(inst, ['v']),
    [{ b: 1 }],
    '`R-3`: the `VEC` answers a DENSE array, and `crossing.md §1.5` item 2 makes its index order significant',
  );
  write(inst, [''], 'mem', 2);
  assert.equal(read(inst, ['']), 2, 'the empty string IS a legal key and a legal register key');
  write(inst, ['a.b'], 'mem', 3);
  assert.equal(read(inst, ['a.b']), 3, 'a key containing a dot is a key, not a delimiter');
  for (const bad of [undefined, null, 'a.b', 1, true, {}, () => {}, ['a', -1], ['a', 1.5], ['a', null], ['a', true], [['nested']]]) {
    assert.throws(
      () => read(inst, bad),
      (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
      `address ${JSON.stringify(bad)} is outside the domain`,
    );
  }
  const sparse = [1, , 3]; // eslint-disable-line no-sparse-arrays
  assert.throws(
    () => read(inst, sparse),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
    'DD-8: neither reading of a hole may be chosen silently',
  );
  assert.throws(
    () => read(inst, new Proxy(['a'], {})),
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
  write(inst, ['a'], 'mem', {});
  assert.throws(
    () => write(inst, ['a', 0], 'mem', 1),
    (err) =>
      isTheFailureForm(err) &&
      err.status === 'ContainerKindConflict' &&
      /^0 does not match the container kind of 'a', it holds a map(, keys are .*)?$/.test(err.message),
    '`store-model.md §1.3`\'s key-domain arm; `write-and-read.md §3.4` `F-4`',
  );
  // NOTHING WAS INSTALLED: no anchor, no coercion, no container-kind change — the empty `MAP` is what it was.
  assert.deepEqual(read(inst, ['a']), {}, 'the map stands untouched');
  // AND THE SYMMETRIC DIRECTION OF THE SAME ARM — a STRING segment aimed at a `VEC` — IS THE SAME MEMBER.
  write(inst, ['v'], 'mem', [1]);
  assert.throws(
    () => write(inst, ['v', 'b'], 'mem', 1),
    (err) =>
      isTheFailureForm(err) &&
      err.status === 'ContainerKindConflict' &&
      /^'b' does not match the container kind of 'v', it holds a vector(, keys are .*)?$/.test(err.message),
    'no coercion: `"0"` is never `0` and `0` is never `"0"` (`store-model.md §1.5` items 2–3)',
  );
  assert.deepEqual(read(inst, ['v']), [1], 'the vector stands untouched');
});

test('address_the_package_performs_no_arity_check_of_its_own', () => {
  const inst = mem();
  // A missing argument reaches the store's own carrier value and answers the store's own code — never a
  // package `TypeError` (`DD-46`).
  assert.throws(
    () => read(inst),
    (err) => isTheFailureForm(err) && err.status === 'AddressMalformed',
  );
  assert.throws(
    () => write(inst, ['a'], 'mem'),
    (err) => isTheFailureForm(err) && err.status === 'ValueNotAdmitted',
    'an absent value is the store\'s own answer',
  );
  assert.throws(
    () => read(inst, ['a'], 'mem', 'an extra argument'),
    (err) => err === undefined || isTheFailureForm(err) || typeof err.status === 'string',
    'an extra argument is not the package\'s business either way: it must not be a TypeError of its own',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.5` the single failure form, at its own throw site
// ---------------------------------------------------------------------------------------------

test('failure_form_the_thrown_object_is_a_plain_two_member_record', () => {
  const inst = mem();
  assert.throws(
    () => read(inst, ['gone']),
    (err) => isTheFailureForm(err) && err.status === 'AddressNotFound',
  );
});

test('failure_form_the_prototype_is_the_caller_realms_object_prototype', () => {
  const inst = mem();
  try {
    read(inst, ['gone']);
    assert.fail('the read must throw');
  } catch (err) {
    assert.equal(Object.getPrototypeOf(err), Object.prototype);
    assert.ok(!(err instanceof Error), 'no Error subclass (DD-12)');
    assert.equal(err.stack, undefined, 'no third member, and no `stack`');
    assert.equal(err.code, undefined);
    assert.equal(err.cause, undefined);
    assert.equal(err.name, undefined);
  }
});

test('failure_form_the_status_is_a_member_token_verbatim_and_the_message_is_generated', () => {
  const inst = mem();
  try {
    read(inst, ['gone']);
    assert.fail('the read must throw');
  } catch (err) {
    assert.ok(THE_FIFTEEN.includes(err.status), 'the store\'s own member token VERBATIM');
    assert.equal(err.status, err.status.trim(), 'never prefixed or padded');
    assert.ok(err.message.length > 0 && !/TBD|placeholder/i.test(err.message));
  }
});

test('failure_form_is_thrown_and_never_returned', async () => {
  const inst = mem();
  // No returned tagged union and no `{ok, value}` envelope: the success path returns the value itself.
  const value = read(inst, []);
  assert.ok(!(value && typeof value === 'object' && 'ok' in value));
  // And no `Promise` rejection: every verb is synchronous.
  let returned;
  try {
    returned = read(inst, ['gone']);
  } catch {
    returned = 'threw';
  }
  assert.equal(returned, 'threw');
  assert.ok(!(read(inst, []) instanceof Promise));
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
  drive(() => read(inst, undefined)); //                                    AddressMalformed
  drive(() => read(inst, ['gone'])); //                                     AddressNotFound
  write(inst, ['leaf'], 'mem', 'v');
  drive(() => read(inst, ['leaf', 'child'])); //                           LeafHasNoDownstream
  drive(() => read(inst, ['leaf'], 'file')); //                            TierNotFound
  drive(() => read(inst, [], 'secure')); //                                OutOfDomainTier
  drive(() => write(inst, ['b'], 'mem', () => {})); //                     ValueNotAdmitted
  drive(() => write(inst, [], 'mem', 1)); //                               WriteParentNotLink
  drive(() => rollback(inst, 'no-such-op')); //                            JournalOpUnknown
  drive(() => storeCreate({ listeners: [] })); //                          ConstructionArgumentMissing
  drive(() =>
    storeCreate({ journalLength: 8, filePath: '/nonexistent/dir/x.json', listeners: [] }),
  ); //                                                                     FilePathUnreachable
  const required = [
    'AddressMalformed',
    'AddressNotFound',
    'LeafHasNoDownstream',
    'TierNotFound',
    'OutOfDomainTier',
    'ValueNotAdmitted',
    'WriteParentNotLink',
    'JournalOpUnknown',
    'ConstructionArgumentMissing',
    'FilePathUnreachable',
  ];
  for (const code of required) {
    assert.ok(seen.has(code), `\`${code}\` remains reachable from JS (surface.md §2.9 item 2)`);
  }
  for (const code of seen) assert.ok(THE_FIFTEEN.includes(code), `\`${code}\` is outside the closed set`);
  // The existence probe: a read that resolves answers the value, and one that does not throws.
  assert.equal(read(inst, ['leaf']), 'v');
});

test('failure_form_carries_no_discrimination_rule_between_a_value_and_a_failure', () => {
  const inst = mem();
  const lookalike = { status: 'AddressNotFound', message: 'generated' };
  write(inst, ['a'], 'mem', lookalike);
  assert.deepEqual(read(inst, ['a']), lookalike, 'the caller carries the anti-pattern (A64)');
});

// ---------------------------------------------------------------------------------------------
// `§2.6` the constraint/repair pattern — a USAGE PATTERN over declared verbs
// ---------------------------------------------------------------------------------------------

test('constraint_pattern_evaluate_after_write_and_reverse_with_rollback', () => {
  const inst = mem();
  write(inst, ['safe'], 'mem', 1);
  const record = write(inst, ['risky'], 'mem', -1);
  // Client-side evaluation, after the write returned.
  const violated = read(inst, ['risky']) < 0;
  assert.ok(violated);
  rollback(inst, record.op.opId);
  assert.throws(() => read(inst, ['risky']));
  assert.equal(read(inst, ['safe']), 1, 'the sibling state stands');
});

test('constraint_pattern_no_constraint_verb_parameter_or_record_exists', () => {
  const api = { storeCreate, read, readLiteral, write, delete: remove, rollback, listen, unlisten };
  for (const name of ['constrain', 'constraint', 'repair', 'validate', 'onViolation']) {
    assert.ok(!(name in api), `\`${name}\` is not declared: no constraint verb and no repair route`);
  }
  // And no function crosses at any position: the store's own surface takes no function (`A73`).
  const inst = mem();
  assert.throws(
    () => write(inst, ['a'], 'mem', () => {}),
    (err) => isTheFailureForm(err) && err.status === 'ValueNotAdmitted',
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
    write(inst, ['a'], 'file', 1);
    remove(inst, ['a'], 'file');
    assert.throws(() => read(inst, ['a'], 'file'), 'removed in the live store');
    const fresh = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    assert.equal(
      read(fresh, ['a'], 'file'),
      1,
      'DD-45: a fresh boot over an equal path re-loads the last successful `file` WRITE, and the removed version STANDS AGAIN',
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
    write(inst, ['ok'], 'mem', 1);
    // The trigger is the REAL one: the path is replaced by a directory after the instance exists.
    await unlink(path);
    await mkdir(path);
    assert.throws(
      () => write(inst, ['never'], 'file', 2),
      (err) => isTheFailureForm(err) && err.status === 'FileCommitFailed',
      'the failure is passed back AFTER the store\'s own automatic journal rollback',
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
    write(first, ['first'], 'file', 1);
    write(second, ['second'], 'file', 2);
    const fresh = storeCreate({ filePath: path, journalLength: 8, listeners: [] });
    assert.equal(read(fresh, ['second'], 'file'), 2, 'the second instance\'s write clobbered the first\'s bytes');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
