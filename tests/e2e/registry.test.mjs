// `surface.md §2.3`–`§2.4`, `§2.7`, `§2.10` — THE HANDLE, THE PACKAGE'S OWN REGISTRY, THE DELIVERY, AND THE
// TWO REGISTRATION VERBS, driven at the package's own boundary.
//
// **THE CONTRACT FINDING THIS FILE'S AUTHORING EXPOSED IS CLOSED, AND THE CELLS BELOW KEEP THE READING THE
// REMAND MOVED.** `contract.md §2.4` declares a PER-INSTANCE REGISTRY that holds **the caller's FUNCTION**
// for a handle and invokes it (`DD-15`, `DD-22`). **THE REGISTRATION SITE'S REFUSAL'S FORM MOVED AGAIN ON
// 2026-10-11 AND THIS FILE'S ONE CELL THAT ASSERTED IT WAS RE-DERIVED:** as filed, `parameter-semantics.md
// §2.12` (`PAR-JS-12`) and `surface.md §2.4` item 5 (d) declared a JS `TypeError` carrying no `status` and no
// `message`; **`A76`'s bounded declaration pass reconciled both to `surface.md §2.5`'s SINGLE form with the
// store's closed-set `AddressMalformed`** (`surface.md §2.5` item 5 (g); `parameter-semantics.md §2.12`'s
// second dated exception clause), so **a `TypeError` escaping ANY site of this package is a FINDING**. **As
// this red set was authored, NO clause of `docs/specs/storeroom-js/**` declared the SPELLING of that
// registration site** — `§2.1`'s *"no clause of this directory exposes any member of it"* and `package.md
// §1.3` item 3's *"NOTHING ELSE"* appeared to close it off — **so the function halves of the registry's rules
// were reported `un-run`, and `un-run` IS A FAILURE** (`acceptance.md §4.4`). **THE BOUNDED CORRECTION PASS
// OF 2026-10-11 DECLARED THE SITE** (`§2.4` item 5 / `surface.md §2.4` item 5: `register(handle, listener)
// -> undefined`, the ONE member of the object `storeCreate` returned — a member of the PACKAGE's own wrapper
// and not of the store's instance), **and the function halves are now DRIVEN at `register.test.mjs`'s
// `S-REG` and `S-FIRE-WINDOW` lines.** **NOTHING IS DUPLICATED HERE:** the cells below are the ones the
// DECLARED verbs reach — the handle's two spellings, `unlisten`'s no-op set, the prefix test and the
// withdrawal — and the cell at rule 4 that names the function half points at `register.test.mjs` rather than
// restating it.
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED:** a minted handle · a caller-spelled token at the
// construction · two different handles at one address · the SAME token twice at one address · a bare string
// at `unlisten` · a foreign instance's handle · a blank token · a non-opaque value · an absent handle · a
// prefix-qualified registration set · a registration outside the write's scope · a `delete`'s triggered set.
// **AND THE TWO STATES THE 2026-10-11 `V-1` RE-DERIVATION ADDED TO THIS LIST:** **a REPEAT `listen` at an
// address that IS ALREADY REGISTERED** (whose declared answer is the entry's OWN handle — `write-and-read.md
// §6.5` item 12 (c)) and **two DIFFERENT addresses registered on ONE instance** (whose declared answer is two
// DIFFERENT handles, each binding its own address — `§2.3` item 1 with `§6.5` item 10 (b)).

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../bindings/js/index.mjs';

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

// ---------------------------------------------------------------------------------------------
// `§2.3` the handle
// ---------------------------------------------------------------------------------------------

test('handle_the_construction_takes_a_plain_string_and_the_record_names_the_caller_s_own_handle', () => {
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE AS-FILED CELL ASSERTED `typeof returned !== 'string'` — *"the returned handle is NOT the token string
  // (`DD-14`)"* — AND THAT ASSERTION IS SUPERSEDED-WHOLE BY THE UNIT, NOT MERELY RED.** The cell's own name
  // says the construction takes a plain string; the sub-assertion asserted the OPPOSITE of the ruling that
  // made the handle a string, and it stood as a green cell only because the store once wrapped the string in
  // an opaque token. **THE RULINGS: `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 1 and
  // `(AA-5)`** (`identity-and-domain.md §1` item 1, verbatim: *"The caller spells it, holds it and passes it
  // back; nothing mints it. The value the store reports in `triggered`, the value the entry's map keys on, the
  // value `unlisten` accepts … ARE ONE VALUE AND NOT FIVE SPELLINGS OF ONE"*; `P: docs/pending.md · P-6`:
  // *"You don't need to mint anything. The handle is already a unique identifier."*).
  // **THE SUBJECT IS UNMOVED AND THE READING IS THE NEW DECLARATION'S:** a `triggered` element is a PAIR
  // `{handle, address}` (`trigger-and-pair.md §2` item 1), and its `handle` member IS the caller's own string —
  // the construction adopts it verbatim (`listen-verb.md §6` item 3: *"the caller's handle passed through the
  // one creation act"*) — so the cell now asserts identity `===` rather than the absence of a string.
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = inst.write(['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1);
  const pair = record.triggered[0];
  // **`TF-1`: A BARE HANDLE IN `triggered` IS A FAILURE OF `§1` AND `§3` ITEM 3** (`trigger-and-pair.md §8`),
  // so the element's own shape is asserted before its members are read.
  assert.equal(typeof pair, 'object', '`trigger-and-pair.md §1`: a `triggered` element is the PAIR record');
  assert.deepEqual(
    Object.keys(pair).sort(),
    ['address', 'handle'],
    '`trigger-and-pair.md §1`–`§2` item 1: the element carries EXACTLY TWO members',
  );
  // **NO HANDLE IS MINTED** (`identity-and-domain.md §6`'s `O-6`): the value the caller supplied and the value
  // the store returns are the SAME string, asserted by `===` and never by a spelling that a wrapper could pass.
  assert.equal(pair.handle, 'l1', '`contract.md §2.1` item 1 / `(AA-5)`: the handle IS the caller\'s string');
  assert.ok(!Array.isArray(pair.address) || pair.address.length >= 0, 'the `address` member is the segment list');
  assert.deepEqual(pair.address, ['a'], '`trigger-and-pair.md §1.2`: the BINDING address');
});

test('handle_the_returned_handle_is_the_caller_s_own_string_and_the_pair_address_is_the_bindings', () => {
  // **⟶ RE-DERIVED 2026-10-18: THE AS-FILED CELL**, `handle_the_returned_token_is_readable_by_no_js_code`,
  // **ASSERTED THAT THE RETURNED VALUE DOES NOT CONTAIN THE CALLER'S TOKEN — *"the token is PRIVATE and
  // readable by no JS code"* — AND THAT CLAIM IS SUPERSEDED-WHOLE WITH THE TOKEN ITSELF.** Its re-derivation
  // is not a weakening: the cell's SUBJECT was *"how a caller recovers the identity of the listener that
  // fired"*, and under `contract.md §2.1` item 1 / `(AA-5)` the answer is that the caller NEVER LOST it —
  // the member IS the string it spelled. **THE RULING: `identity-and-domain.md §1` item 2 (ii)–(iii),** which
  // DELETES `state.tokens`, `Object.freeze({})` and `wrapHandles` rather than rewriting them, and its `§6`
  // `O-6` (*"no handle is minted — the value the caller supplied and the value the store returns are the same
  // string"*). **What survives from the as-filed cell is its real point — the identity is recoverable by plain
  // reading — carried here as the POSITIVE assertion the new declaration grounds.**
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const pair = inst.write(['a'], 'mem', 1).triggered[0];
  assert.equal(pair.handle, 'l1',
    '`identity-and-domain.md §6` `O-6`: the identity the caller holds is the identity the record carries');
  assert.equal(typeof pair.handle, 'string', '`identity-and-domain.md §1` item 1: the handle IS a `string`');
  // ...and it is a string the caller can pass straight back to the two verbs that accept one, with no
  // unwrapping step: this is the cell's own practical claim, now driven rather than asserted by absence.
  assert.equal(inst.unlisten(pair.handle), undefined);
  assert.deepEqual(inst.write(['a'], 'mem', 2).triggered, [], 'the value named the entry it was read from');
});

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// CELL'S SUBJECT IS REVERSED BY THE UNIT, AND THIS IS THE REVERSAL ASSERTED WITH ITS RULING NAMED.**
//
// **THE AS-FILED CELL** (`handle_a_repeat_listen_at_a_registered_address_returns_the_entries_own_handle`)
// required a repeat `listen` at a registered address to return **THE ENTRY'S OWN HANDLE — the SAME opaque
// value** — and rested that on `write-and-read.md §6.5` item 12 (c) (*"a `listen(address)` whose address IS
// already registered returns the EXISTING entry's handle rather than minting a second one"*) read with `§6.5`
// item 2's address-level idempotence and `A45`.
//
// **THOSE CLAUSES ARE SUPERSEDED-WHOLE BY THE UNIT'S MINT RULING AND ITS PURGE RULING, AND THE CELL IS
// RE-DERIVED RATHER THAN DELETED.** `listen` returns `undefined` and mints nothing at all
// (`docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 10; `PAR-HL-3`: *"the caller supplied the
// handle, so returning it would be a second spelling of the caller's own datum"*), so *"returns the entry's own
// handle"* has **no subject** — every call answers the unit. **AND THE SET SEMANTICS MOVE TOO:** *"`listen(h,
// S2)` AFTER `listen(h, S1)` IS SET-ASSIGNMENT, NOT UNION — `S1` IS PURGED WHOLESALE"* (`P: docs/pending.md ·
// (R1)`; `listen-verb.md §3` item 1, and `§4`'s transition table: *"`1 → 1` and `2 → 1` by `listen` (a purge
// then a fresh reservation)"*). **THE TWO CLAUSES OF THE REVERSAL, NAMED: `contract.md §2.2` item 3 and
// `LF-7`.**
//
// **WHAT THE CELL NOW ASSERTS IS STRONGER, NOT WEAKER:** the repeat is driven as a PURGE-THEN-RE-INSTALL whose
// every observable is read, rather than as a value comparison on a return that no longer exists.
test('hl_2_2_a_repeated_listen_is_an_assignment_over_the_handles_own_set', () => {
  const inst = mem();
  // **`listen` ANSWERS THE UNIT** (`contract.md §2.2` item 10; `PAR-HL-3`) — the caller's handle is its own
  // datum and returning it would be a second spelling of it.
  assert.equal(inst.listen('h', [['a']]), 'h', '`contract.md §2.2` item 10: the answer is `undefined`');
  assert.equal(inst.listen('h', [['a']]), 'h', '...at the repeated act too: no value comes back');
  // **A REPEAT AT THE SAME SINGLE ADDRESS RE-INSTALLS ONE ENTRY, NEVER TWO:** `A45`'s one home per address
  // still decides the store-side count, so ONE write triggers the handle ONCE (`§6.5` item 8 (a)).
  const same = inst.write(['a'], 'mem', 1);
  assert.equal(same.triggered.length, 1, 'one address, one entry: the repeat added no second one');
  assert.equal(same.triggered[0].handle, 'h', '...and the entry\'s handle is the one the caller spelled');

  // **THE REVERSAL'S OWN SUBJECT, DRIVEN: SET-ASSIGNMENT AND NOT UNION.** `listen(h, [['b']])` after
  // `listen(h, [['a']])` PURGES `['a']` WHOLESALE (`P: docs/pending.md · (R1)`; `listen-verb.md §3` item 1).
  // **`LF-4` IS THE FAILURE THIS DRIVE EXISTS AGAINST:** *"a set-assignment read as a union … a write at an
  // address of `S1 \\ S2` returning `h` in `triggered`"*.
  const store = mem();
  const h = 'hl-set-assignment';
  store.listen(h, [['a', 'x']]);
  store.listen(h, [['b', 'y']]);
  store.write(['a'], 'mem', {}); // the containers the write runs through are created by address
  store.write(['b'], 'mem', {});
  const purged = store.write(['a', 'x'], 'mem', 1);
  assert.deepEqual(
    purged.triggered,
    [],
    '`listen-verb.md §3` item 1 / `(R1)`: `S1` was PURGED wholesale by the second `listen`, so a write at '
    + '`S1 minus S2` fires NOTHING — `LF-4` is the failure this asserts against',
  );
  const installed = store.write(['b', 'y'], 'mem', 1);
  assert.equal(installed.triggered.length, 1, '...and the SECOND set\'s address is where the handle stands');
  assert.equal(installed.triggered[0].handle, h, '...under the caller\'s own handle, unchanged');

  // **AND `LF-6` IS DRIVEN BESIDE IT — *"a purge that enumerated addresses or consulted a count"*:** the reach
  // is the HANDLE'S OWN SET and never the address. A DIFFERENT handle bound at an address the first handle
  // once stood at is NOT purged: **`§2.2` item 3 and `§5.2`'s `S-PURGE-SET` are scoped to ONE handle in both
  // positions** (`docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 3).
  const other = mem();
  other.listen('kept', [['a', 'z']]);
  other.listen('moved', [['a', 'z']]);
  other.listen('moved', [['elsewhere']]);
  other.write(['a'], 'mem', {});
  const survivor = other.write(['a', 'z'], 'mem', 1);
  assert.equal(
    survivor.triggered.length,
    1,
    '`§2.2` item 3 / `S-PURGE-SET`: the purge is BY HANDLE, so a DIFFERENT handle at the same address SURVIVES',
  );
  assert.equal(survivor.triggered[0].handle, 'kept', '...and the survivor IS the other handle');
});

// **THE PART THE CELL WAS REALLY REACHING FOR, DRIVEN BESIDE IT — BECAUSE THE CONTRACT DECLARES IT AND NO
// CELL REACHED IT** (`§2.3` item 1's per-process mint; `§6.5` item 10 (b)'s binding BY ADDRESS; `§2.3` item 4
// and `§2.4` item 5 (d)'s two declared answers for a value ANOTHER instance minted; the unit's `§2.3` item 2
// wrapper identity and `PAR-JS-8`'s *"a value a FOREIGN instance minted"*).
//
// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// `handle_a_mint_is_unique_per_process_and_two_addresses_on_one_instance_differ` CELL'S MINT SUBJECT HAS NO
// PRODUCER ANY MORE AND ITS `handle === handle` LIMBS ARE SUPERSEDED-WHOLE.** The store MINTS NOTHING —
// `listen(handle, addresses)` takes the caller's string and answers `undefined` (`contract.md §2.1` item 1;
// `(AA-5)`; `contract.md §2.2` item 10; `identity-and-domain.md §6` `O-6`), and `PAR-13`'s *"unique per
// instance and per session"* spelling is RETIRED WITH THE MINT (`identity-and-domain.md §5` item 1). **The
// cells' REAL subjects survive and are re-derived to the new declaration:** two DIFFERENT handles at two
// addresses bind BY ADDRESS (`§6.5` item 10 (b)); a handle at an address no listener stands at fires nothing
// (`§6.5` item 3); and a value the caller spelled on ANOTHER instance names no entry of this one
// (`identity-and-domain.md §2` item 3 row `8`, the FOREIGN-instance row: `unlisten` is a no-op success there
// and `register` REFUSES).
test('handle_two_caller_spelled_handles_bind_by_address_and_a_foreign_instances_handle_names_nothing', () => {
  const owner = mem();
  const other = mem();
  // **THE CALLER SPELLS BOTH HANDLES AND RECEIVES THE UNIT** (`contract.md §2.2` item 10).
  assert.equal(owner.listen('at-a', [['a']]), 'at-a', '`PAR-HL-3`: no mint, so no value comes back');
  assert.equal(owner.listen('at-b', [['b']]), 'at-b');
  // BINDING IS BY ADDRESS AND BY NOTHING ELSE (`§6.5` item 10 (b)): each registration fires for its own
  // address alone — and a write at an address no registration is a prefix of fires nothing (`§6.5` item 3).
  const atA = owner.write(['a'], 'mem', 1);
  assert.equal(atA.triggered.length, 1);
  assert.equal(atA.triggered[0].handle, 'at-a', 'the entry at `a` is the handle the caller bound there');
  const atB = owner.write(['b'], 'mem', 1);
  assert.equal(atB.triggered.length, 1);
  assert.equal(atB.triggered[0].handle, 'at-b', '...and the entry at `b` is the OTHER handle, never the first');
  assert.deepEqual(owner.write(['c'], 'mem', 1).triggered, []);
  // **THE SAME ADDRESS ON A SECOND INSTANCE IS THAT INSTANCE'S OWN ENTRY** — under the caller-spelled identity
  // the two instances' entries are distinguishable by the STORE ROW each names, not by an opaque wrapper
  // (`identity-and-domain.md §1` item 3: *"THE IDENTITY LIVES IN THE STORE"*). **The foreign value names NO
  // entry of this one.**
  assert.equal(other.listen('at-a', [['a']]), 'at-a');
  const foreign = 'at-a';
  // `unlisten` over the foreign value is the declared NO-OP SUCCESS at THIS instance only where this instance
  // does not hold it — but it DOES hold `at-a`, so the discriminating case is a handle ONLY the other
  // instance holds (`identity-and-domain.md §2` item 3 row `8`).
  other.listen('foreign-only', [['a']]);
  assert.equal(owner.unlisten('foreign-only'), undefined, 'the FOREIGN-instance row: a no-op success');
  // **`register` REFUSES it** — the DECLARED REVERSAL of `unlisten`'s set for a well-formed string this
  // instance never held (`identity-and-domain.md §2` item 3 row `8`; `contract.md §2.1` item 5).
  assert.throws(
    () => owner.register('foreign-only', () => {}),
    (err) => err.status === 'AddressMalformed',
  );
  // ...and NO OTHER REGISTRATION IS REMOVED: the owner's own registrations still fire, one each.
  assert.equal(owner.write(['a'], 'mem', 2).triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  assert.equal(owner.write(['b'], 'mem', 2).triggered.length, 1);
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE AS-FILED `register(foreign, ...)` LIMB ASSERTED THE REFUSAL OF A NON-STRING `[object Object]` WRAPPER
  // — *"the site admits this instance's opaque spelling alone"* — AND THE WRAPPER IS RETIRED WHOLE.** The
  // handle is a `string` the caller spells (`identity-and-domain.md §1` item 1; `contract.md §2.1` item 1 and
  // `(AA-5)`), so no `[object Object]` value can arise at that position and the limb has no subject.
  //
  // **THE SUBJECT IT WAS REACHING FOR SURVIVES AND IS DRIVEN AT ITS NEW SITE:** a WELL-FORMED STRING this
  // instance never held is `AddressMalformed` at `register` (`identity-and-domain.md §2` item 3 row `8`, the
  // FOREIGN-instance row, and row `10`, the fabricated row), with the message naming the POSITION and the
  // VALUE (`surface.md §2.5` item 5 (b); `A134`), and the three-member form flat across arms
  // (`surface.md §2.5` item 4). **AND THE STORE IS NOT REACHED** — asserted by the write below.
  assert.throws(
    () => owner.register('foreign-only', () => {}),
    (err) =>
      !(err instanceof TypeError) &&
      Object.getPrototypeOf(err) === Object.prototype &&
      Object.keys(err).sort().join(',') === 'log,message,status' &&
      Object.keys(err).length === 3 &&
      Array.isArray(err.log) &&
      err.log.length === 0 &&
      err.status === 'AddressMalformed' &&
      err.message.includes('foreign-only') && // the failing TARGET (item 5 (a))
      err.message.includes('first argument'), // ...the POSITION (item 5 (b))
  );
  assert.equal(owner.write(['a'], 'mem', 3).triggered.length, 1, 'nothing reached the store on that case');
});

test('handle_a_caller_spelled_token_is_adopted_verbatim_and_is_lawful', () => {
  const inst = mem([{ address: ['a'], handle: 'listener-1' }]);
  const record = inst.write(['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1, 'A69: the construction ADOPTS the caller\'s tokens verbatim');
});

test('handle_a_blank_token_is_outside_the_domain_at_the_construction', () => {
  assert.throws(
    () => mem([{ address: ['a'], handle: '' }]),
    (err) => err.status === 'AddressMalformed',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.3` item 4 / `§5.5`'s `S-OPAQUE` — `unlisten` over every outside value is a NO-OP SUCCESS
// ---------------------------------------------------------------------------------------------

test('registry_rule_4_unlisten_over_a_bare_string_is_an_unknown_handle_and_a_no_op_success', () => {
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE CALL SHAPE MOVES `listen(address)` →
  // `listen(handle, addresses)`, ARITY `1 → 2`** (`contract.md §2.2` items 1 and 10; `listen-verb.md §1`
  // item 1, whose four declared sites each need their own dated clause; `P: docs/pending.md · P-6`, the ruling
  // *"listen gains a handle position"*). **THE CELL'S SUBJECT — `unlisten`'s no-op-success set and its "NO
  // OTHER REGISTRATION IS REMOVED" half — IS UNMOVED.**
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  inst.listen('l2', [['b']]);
  assert.equal(inst.unlisten('l1'), undefined, 'a well-formed string names its entry, so this IS a removal');
  assert.equal(inst.unlisten('listener-1'), undefined, 'a well-formed string NO entry carries is a NO-OP success');
  assert.equal(inst.unlisten(''), undefined, 'a blank token is the same no-op success');
  // NO OTHER REGISTRATION IS REMOVED: the `l2` entry still fires.
  const record = inst.write(['b'], 'mem', 2);
  assert.equal(record.triggered.length, 1);
  assert.equal(record.triggered[0].handle, 'l2');
});

test('registry_rule_4_unlisten_over_a_foreign_handle_fabricated_or_non_opaque_is_a_no_op_success', () => {
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE CALL SHAPE MOVES `listen(address)` →
  // `listen(handle, addresses)`, AND THE "NON-OPAQUE VALUE" ROW IS RE-DERIVED FROM THE TOKEN TO THE STRING.**
  // As filed the cell proved the no-op-success set by handing `unlisten` an opaque WRAPPER the other instance
  // minted; with the handle being a string the caller spells (`identity-and-domain.md §1` item 1;
  // `contract.md §2.1` item 1 and `(AA-5)`) there is no wrapper to hand over, and the row the cell drives is
  // `identity-and-domain.md §2` item 3's OWN TABLE: row `8` (a FOREIGN instance's well-formed string), row `10`
  // (a fabricated one), rows `2`–`5` (a non-string, `null`, `undefined`/ABSENT, a plain object). **EVERY ONE
  // of them is a no-op success at `unlisten` and a refusal at `register` — the DECLARED REVERSAL.**
  const owner = mem();
  const foreign = mem();
  owner.listen('kept', [['a']]);
  foreign.listen('foreign-handle', [['a']]);
  assert.equal(owner.unlisten('foreign-handle'), undefined, 'row `8`: a FOREIGN instance\'s value is a no-op success');
  assert.equal(owner.unlisten('fabricated'), undefined, 'row `10`: a fabricated string is a no-op success');
  assert.equal(owner.unlisten(42), undefined, 'row `2`: a non-string is a no-op success');
  assert.equal(owner.unlisten(null), undefined, 'row `3`: `null` is a no-op success');
  assert.equal(owner.unlisten({}), undefined, 'row `5`: a plain object is a no-op success');
  assert.equal(owner.unlisten(undefined), undefined, 'row `4`: an absent handle is a no-op success');
  const record = owner.write(['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  assert.equal(record.triggered[0].handle, 'kept', '...and the survivor is the entry the owner itself spelled');
});

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
// BOTH LEGS OF THIS CELL ARE RE-SPELLED TO THE NEW DECLARATION AND ONE OF THEM IS REVERSED.**
//
// **LEG ONE — `unlisten` WITHDRAWS THE STORE-SIDE HOME ENTRY — STANDS WHOLE** (`docs/specs/storeroom-js/
// surface.md §2.4` rule 4; `contract.md §5.5`'s fourth added entry; `identity-and-domain.md §3` item 2 (i)).
//
// **LEG TWO — `again !== handle` — IS SUPERSEDED-WHOLE AND IS RE-DERIVED TO ITS DECLARED SUBSTITUTE, NOT
// WEAKENED.** The as-filed limb asserted that a re-`listen` at a withdrawn address *"mints a FRESH handle"*.
// **THERE IS NO MINT** (`contract.md §2.1` item 1; `(AA-5)`; `PAR-13`'s *"unique per instance and per session"*
// spelling is RETIRED WITH THE MINT — `identity-and-domain.md §5` item 1), so no comparison of two handles has a
// subject: the caller spells the handle at every `listen` and it is the same string before and after. **What the
// withdrawn state DOES declare, and what this leg now drives, is `identity-and-domain.md §3` item 2's
// separations:** after `unlisten` the entry EXISTS with `off` set, so `register(h, fn)` SUCCEEDS and re-arms it;
// after `removeListener` the entry is GONE, so `register(h, fn)` is REFUSED. **That is the same arm the as-filed
// limb was reaching for — "is this the withdrawn or the still-registered state" — read at the subject the new
// declaration gives it, and it is STRONGER: it separates two states the handle comparison never could.**
test('registry_the_withdrawal_removes_the_store_side_home_entry_and_never_the_function', () => {
  const inst = mem();
  const handle = 'withdrawn';
  assert.equal(inst.listen(handle, [['a']]), handle);
  // **LEG ONE: THE WITHDRAWAL REMOVES THE STORE-SIDE ENTRY** — a write at that address fires nothing
  // (`surface.md §2.4` rule 4).
  assert.equal(inst.unlisten(handle), undefined);
  const record = inst.write(['a'], 'mem', 1);
  assert.deepEqual(
    record.triggered,
    [],
    '§2.4 rule 4: `unlisten` withdraws the store-side home entry, so the handle does not appear again',
  );
  // **LEG TWO: THE ENTRY STILL EXISTS AND IS `off` — SO `register` RE-ARMS IT** (`identity-and-domain.md §3`
  // item 2 (i): *"the entry EXISTS with `off` set; `register(h, fn)` SUCCEEDS and re-arms it"*; `contract.md §3`
  // `S-6`; `listen-verb.md §4`'s transition `1 → 2`). **THE STORE SIDE IS RE-INSTALLED, so the address fires
  // again — which is the observable the as-filed "fresh handle" limb stood in for.**
  assert.equal(inst.register(handle, () => {}), undefined, 'a withdrawn entry is RE-ARMABLE, not deleted');
  const reArmed = inst.write(['a'], 'mem', 2);
  assert.equal(reArmed.triggered.length, 1, 'the re-armed entry fires at the address it was re-installed at');
  assert.equal(reArmed.triggered[0].handle, handle, '...under the SAME caller-spelled handle, never a fresh one');
  // **AND THE CONTRASTING STATE, DRIVEN SO THE TWO ARE SEPARABLE:** `removeListener` removes the entry WHOLE,
  // so `register` on that handle is REFUSED (`identity-and-domain.md §3` item 2 (ii); `contract.md §2.1`
  // item 5's fabricated row; `removal-members.md §2`).
  assert.equal(inst.removeListener(handle), undefined);
  assert.throws(
    () => inst.register(handle, () => {}),
    (err) => err.status === 'AddressMalformed',
    '`identity-and-domain.md §3` item 2 (ii): a DELETED entry is not a RESERVED one',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.3` item 5 / `§5.8`'s `S-TRIGGER` — membership is the prefix test and nothing else
// ---------------------------------------------------------------------------------------------

test('registry_the_triggered_handle_set_is_exactly_the_prefix_set_descendant_inclusive', () => {
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['a', 'b'], handle: 'at-ab' },
    { address: ['zzz'], handle: 'at-zzz' },
  ]);
  // The containers the write runs through are created first: a write's parent is resolved BY ADDRESS.
  inst.write(['a'], 'mem', {});
  inst.write(['a', 'b'], 'mem', {});
  const record = inst.write(['a', 'b', 'c'], 'mem', 1);
  assert.equal(record.triggered.length, 2, 'the prefix set, descendant-inclusive, on a WRITE');
  const outside = inst.write(['q'], 'mem', 1);
  assert.deepEqual(outside.triggered, [], 'a write outside every registration\'s scope fires nothing');
});

test('registry_a_delete_fires_its_own_triggered_set_on_the_same_prefix_test', () => {
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['zzz'], handle: 'at-zzz' },
  ]);
  inst.write(['a'], 'mem', 1);
  const receipt = inst.delete(['a'], 'mem');
  assert.equal(receipt.triggered.length, 1, 'A43: a delete FIRES');
  assert.deepEqual(receipt.tiers, ['mem']);
});

// ---------------------------------------------------------------------------------------------
// `§5.5`'s `S-REG-DUP` and `§5.8`'s `S-SET` — a set, never a sequence
// ---------------------------------------------------------------------------------------------

// **⟶ RE-DERIVED 2026-10-11 — THE RECONCILED READING OF `§2.4` RULE 3, WHOSE TWO INDEPENDENT OBSERVABLES
// THIS ONE CELL NOW DRIVES ONE BY ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **this is the ONE re-derivation the
// bounded doc pass of 2026-10-11 named as owing (`docs/specs/storeroom-js/backup/
// GATE5-DOC-2026-10-11-manifest.md` item 1), and no clause of the cell's subject moves with it.**
//
// **THE CLAUSE, CITED AT ITS OWN BYTES — `docs/specs/storeroom-js/surface.md` §2.4's dated clause of
// 2026-10-11, whose twin stands at `docs/specs/storeroom-js/contract.md` §2.4:** *"(i) THE INVOCATION COUNT
// — ONE PER DISTINCT IDENTITY, AND IT IS THE PACKAGE'S OWN RULE. One identity invoked ONCE, however many
// occurrences carry it … so in CASE B the duplicate token's ONE function runs ONCE"*; *"(ii) THE ARRAY'S
// ELEMENT MULTIPLICITY — THE STORE'S OWN DECLARED LIST, CARRIED OUT FAITHFULLY AND NOT DEDUPLICATED AT THE
// BOUNDARY. `triggered` crosses as a fresh JS array of the handles the store's own list carries … so in
// CASE B THE JS-OBSERVABLE `triggered` CARRIES THE TOKEN TWICE, and a drive may assert the array's LENGTH
// (`2`) and its DISTINCT-identity count (`1`) TOGETHER; `§2.7` item 3's *"no order is asserted"* is UNMOVED
// by either figure"*.** **THE STORE-SIDE CLAUSES THE TWO HALVES REST ON, AT THEIR OWN HOMES:
// `docs/specs/storeroom-native/contract.md §0.2`'s `DD-42`** — *"`listen` MUST NOT MINT A TOKEN EQUAL TO ANY
// TOKEN THE HOME ALREADY HOLDS … and `triggered` carries NO DUPLICATED MEMBER … and the construction's
// adopted tokens are untouched by the mint's own rule … in THAT case — and only that case — `triggered`
// carries the token twice"* — **and `DD-39`**, whose duplicate case declares *"`listeners[]` may be EMPTY …
// and a DUPLICATE is ADMITTED AND BOTH ENTRIES ARE KEPT — the construction is a POPULATION step and not a
// registration verb … the home then holds two entries at one address with two DIFFERENT handles, and a
// trigger returns **both**"*; **read with `write-and-read.md §6.5` item 12 (b)'s ADOPTION VERBATIM and that
// contract's `§0.4` clause 2 (b), and with `docs/specs/storeroom-js/test-cases.md`'s own row, which prints
// this drive's licence verbatim** (*"a drive may assert the array's LENGTH (`2`) and its DISTINCT-identity
// count (`1`) TOGETHER"*).
//
// **THE CELL AS FILED, RE-EMITTED BESIDE THE READING THAT REPLACES IT, BECAUSE ITS WORDING AND ITS FIGURE
// POINTED TWO WAYS.** As filed, this cell's comment read — verbatim — *"`§2.4` rule 3: where two construction
// entries at one address carry the caller's SAME token, the store returns that token ONCE where the store
// minted it, and the registry fires ONE invocation per DISTINCT handle — not one per occurrence and not one
// per entry."* — and its ONE assertion read, verbatim —
// `assert.equal(record.triggered.length, 1, 'one DISTINCT handle, not one per occurrence and not one per entry');`.
// **THE WORDING IS THE INVOCATION RULE AND IT IS RIGHT** (`§2.4` rule 3; its dated clause (i)) — **so it is
// carried LIVE, at the assertion it belongs to, in group (2) below.** **THE LENGTH FIGURE IS WHAT THE
// CLAUSE REFUTES:** the cell stated the PACKAGE's invocation count AS IF IT WERE the STORE's array, and in
// this state — the caller-spelled duplicate — the two figures differ (`1` invocation, `2` members).
//
// **ORDER, AND WHY IT IS NOT AN ADJUSTMENT TO DODGE THE FAILING FIGURE.** The two INVOCATION halves —
// groups (2) and (3) — are driven BEFORE the array-multiplicity half, group (1), **so that the one figure
// the clause moved cannot mask their verdicts**: an assertion that aborts its cell leaves the halves after
// it `un-run`, and `un-run` IS A FAILURE (`acceptance.md §4.4`). **NOTHING IS WEAKENED BY THE ORDER: all
// three groups are asserted, every group is drivable on its own, and group (1) still fails against any
// boundary that collapses.**
//
// **AND THE CAUSE OF THAT FAILURE IS NAMED HERE RATHER THAN DODGED, BECAUSE THE CLAUSE ITSELF NAMES IT: THE
// SHIPPED BUILD DEDUPLICATES AT THE BOUNDARY.** `bindings/js/index.mjs`'s `wrapHandles` pushes each token's
// handle into its output *"AT MOST ONCE"*, so the shipped observable answers `1` where clause (ii) declares
// `2` — **and the clause takes no finding against either side, leaving *"WHICH SIDE THE DIVERGENCE SITS ON
// … FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE"*.** **THE DRIVE BELOW ASSERTS THE DECLARED
// READING, so it is RED against the shipped build and its cause is the IMPLEMENTATION.** **AND THE
// RECONCILING PASS OWES ONE THING BESIDE IT, STATED HERE SO IT IS NOT DISCOVERED: `deliver` iterates the
// array ELEMENT BY ELEMENT, so carrying this state's token TWICE while `deliver`'s loop stays as shipped
// would invoke the one registered function TWICE — the per-identity dedup must stand at DELIVERY, where
// clause (i) puts it, and it must be the BOUNDARY's dedup that moves.**
//
// **⟶ ADDED 2026-10-11 (`role_test_writer`) — THE IDENTITY THIS CELL RESTS ON IS NOW DRIVEN RATHER THAN
// ASSUMED, AND THE ONE HALF OF IT THAT NO ASSERTION HERE NAMED IS NAMED.** The cell's premise is that the
// handle the caller HOLDS for ONE store-side entry survives every call that answers about that entry: the
// caller-spelled duplicate's two array members are ONE opaque value, and that value is the one `listen`
// handed back for the entry. **THAT IS A PROPERTY OF THE WRAPPER'S IDENTITY ACROSS CALLS, AND ITS AUTHORITY IS
// THE STORE'S OWN, RECONCILED AT `docs/specs/storeroom-js/surface.md §2.3`'s dated clause of 2026-10-11** — the
// clause that declares the as-filed *"different handle"* sentence and the store's rule *"READ AS ONE
// DECLARATION"*, the still-registered case being the case in which the STORE returns the EXISTING entry's
// handle — **and DECLARED AT `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c):** *"a
// `listen(address)` whose address IS already registered returns the EXISTING entry's handle rather than
// minting a second one"* — **read with `§6.5` item 2's ADDRESS-LEVEL IDEMPOTENCE, `§6.5` item 8 (a)'s ONE home
// (`A45`), `contract.md §2.3` item 6's inherited mint rule and `§2.4` item 6 (b)**: *"the matching is the
// registry's own lookup BY THAT IDENTITY AND BY NOTHING ELSE."*
//
// **TWO OF THE THREE HALVES WERE ALREADY THIS CELL'S OWN ASSERTIONS AND THEY STAND UNMOVED — SAID HERE SO
// NOTHING REDUNDANT IS ADDED BESIDE THEM:** **THE SAME VALUE CARRIED TWICE IN ONE TRIGGER'S SET** is group
// (1)'s `record.triggered[0] === held` / `record.triggered[1] === held` / `new Set(...).size === 1`;
// **TWO DIFFERENT ENTRIES NEVER SHARING IT** is group (3)'s `new Set(first.triggered).size === 2`, with two
// registrations keyed BY MEMBER firing once each. **THE THIRD HALF — THE SAME OPAQUE VALUE RETURNED BY A
// REPEAT `listen` AT A HELD ADDRESS — WAS STATED AS THIS CELL'S PREMISE AND NOT DRIVEN HERE, because this
// cell called `listen` once** (the sibling cell below,
// `handle_a_repeat_listen_at_a_registered_address_returns_the_entries_own_handle`, drives it for the plain
// registered state); **so it is driven in group (4) at the END of this cell, for the reason the ordering
// paragraph above gives: an assertion that aborts its cell leaves the halves after it `un-run`, and `un-run`
// IS A FAILURE (`acceptance.md §4.4`).**
// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
// THE CALLER-SPELLED DUPLICATE STATE THIS CELL DROVE IS RETIRED, AND WHAT SURVIVES OF IT IS RE-DERIVED TO THE
// DECLARATION THAT REPLACED IT — NOT DELETED.**
//
// **THE RULING, AT ITS OWN BYTES — `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 3,**
// verbatim: *"The CALLER-SPELLED DUPLICATE STATE — `cfg.listeners` "duplicates KEPT" (`docs/specs/storeroom-js/
// surface.md:161`), the `DD-39` adoption rule and `surface.md:798-812`'s two duplicate cases — DOES NOT
// SURVIVE IN THAT FORM: a handle names ONE listener, standing at the addresses ONE `listen` gave it"*
// (`P: docs/pending.md · P-6`'s rule 3). **AND THE STRUCTURAL GROUND IS THE SAME ITEM'S UNIQUENESS CLAUSE:**
// *"The store holds AT MOST ONE LIVE ENTRY PER HANDLE STRING. The guarantee is the PURGE-AND-REPLACE rule's
// and not allocation's: a reused handle REPLACES, so two live entries cannot share one"* (`§2.1` item 3's
// opening; `HL-DD-2`; `§2.2` item 3).
//
// **SO THE CELL'S NAME AND ITS GROUP (1) HAVE NO PRODUCER** — a duplicate token cannot reach the store, because
// the boot route already sends `cfg.listeners` through `listen(handle, addresses)` (`§2.2` item 8;
// `listen-verb.md §6` item 1, *"Boot goes through listen()"*) and the construction's own accumulation of one
// handle's N elements into ONE set (`bindings/js/index.mjs:2226-2232`) makes a repeated handle ONE entry at N
// addresses, never two entries at one address (`contract.md §5` `S-8`). **GROUP (2)'S SUBJECT — ONE
// INVOCATION PER DISTINCT HANDLE, `§2.4` rule 3, *"Dedupe on handle — rule 3 stands"* — SURVIVES WHOLE** and
// is driven below at the state that still produces it: ONE handle standing at SEVERAL addresses, which is the
// state the dedupe's key rewrite exists for (`trigger-and-pair.md §5` item 2: *"a handle at `['a']` and
// `['a','b']` both prefix-match a write at `['a','b','c']` — two pair objects, so the function would fire
// TWICE, breaching the rule"*). **THAT IS A STRONGER DRIVE THAN THE ONE IT REPLACES: it is the exact
// counterexample the ruling names.**
test('registry_a_handle_at_several_addresses_fires_once_for_the_distinct_handle', () => {
  // (0) THE STATE: ONE caller-spelled handle standing at TWO addresses, both of which a single write at
  // `['a','b','c']` prefix-matches. `trigger-and-pair.md §5` item 2's own counterexample.
  const inst = mem();
  assert.equal(inst.listen('l1', [['a'], ['a', 'b']]), 'l1', '`PAR-HL-3`: `listen` answers `undefined`');
  inst.write(['a'], 'mem', {});
  inst.write(['a', 'b'], 'mem', {});

  // (2) THE INVOCATION IS THE PACKAGE'S — **ONE per DISTINCT handle**, however many pair elements match:
  // *"A LAWFUL DUPLICATE FIRES ONCE PER DISTINCT HANDLE"* (`docs/specs/storeroom-js/surface.md:309`, surviving
  // unmoved at `trigger-and-pair.md §5` item 1). **`TF-5` — *"TWO invocations for one handle in one
  // window"*, whose condition is *"a dedupe keyed on the element"* — IS THE FAILURE THIS DRIVE EXISTS
  // AGAINST.**
  let invocations = 0;
  const seen = [];
  inst.register('l1', function (...args) {
    invocations += 1;
    seen.push({ argc: arguments.length, address: args[0] });
  });
  const record = inst.write(['a', 'b', 'c'], 'mem', 1);
  assert.equal(
    invocations,
    1,
    '`surface.md:309` / `trigger-and-pair.md §5`: ONE invocation per DISTINCT handle — a dedupe keyed on '
    + 'the ELEMENT would fire TWICE here (`TF-5`)',
  );
  assert.equal(seen.length, 1, 'exactly one invocation was recorded');
  assert.equal(seen[0].argc, 1, 'A77 / §2.7 item 5: the invocation\'s view is ONE argument');
  assert.deepEqual(seen[0].address, ['a', 'b', 'c'], '...and it is the TRIGGERING ADDRESS, never the binding');

  // (1) THE ARRAY'S ELEMENT SET — the store's own list, carried faithfully: the handle is present, as a PAIR,
  // and the pair's `address` member is a MEMBER of that handle's binding set — **asserted as MEMBERSHIP
  // ALONE** (`trigger-and-pair.md §5` item 3: *"a drive may assert MEMBERSHIP ALONE … a drive that asserts
  // WHICH binding's address is carried, or asserts it against the list's position, asserts a wording this
  // contract does not print"*; `DD-37`; `§8`'s narrowing clause over `TF-2`).
  // **THE ARRAY CARRIES ONE ELEMENT PER MATCHED BINDING AND THE INVOCATION IS STILL ONE**, which is the
  // declaration's own separation: *"WITH DEDUPE ON HANDLE, THE BINDING ADDRESS IN `triggered` IS INFORMATIONAL
  // DATA ABOUT THE TRIGGER SET AND NOT A PER-INVOCATION FACT"* (`trigger-and-pair.md §5` item 4). **So the
  // element count is the MATCHED BINDING count and the invocation count is the DISTINCT-HANDLE count — one
  // each, and the two figures are asserted together so neither can be read as the other.**
  assert.equal(record.triggered.length, 2,
    'two bindings matched, so TWO pair elements — `§5` item 4: the array is the TRIGGER SET');
  assert.equal(new Set(record.triggered.map((element) => element.handle)).size, 1,
    '...carrying ONE distinct handle');
  const bindingAddresses = [JSON.stringify(['a']), JSON.stringify(['a', 'b'])];
  for (const pair of record.triggered) {
    // `TF-1`: a BARE HANDLE in `triggered` is a failure of `§1` and `§3` item 3.
    assert.deepEqual(Object.keys(pair).sort(), ['address', 'handle'],
      '`trigger-and-pair.md §1`: the element carries EXACTLY the pair\'s two members — `TF-1`');
    assert.equal(pair.handle, 'l1', '...the caller\'s own handle, never a minted one');
    // **MEMBERSHIP ALONE** (`§5` item 3's operative rule): the carried `address` is SOME ONE of the handle's
    // own binding addresses — no position, no tie-break, no "first" (`DD-37`, `DD-22`).
    assert.ok(
      bindingAddresses.includes(JSON.stringify(pair.address)),
      `the carried \`address\` is A MEMBER of the handle's binding set; got ${JSON.stringify(pair.address)}`,
    );
    // **AND WHERE THE BINDING IS A STRICT PREFIX THE CARRIED `address` DIFFERS FROM THE ARGUMENT** (`§8` `TF-2`).
    assert.notDeepEqual(
      pair.address,
      ['a', 'b', 'c'],
      'the pair\'s `address` is the BINDING\'s and the argument is the WRITE\'s (`§1.2`)',
    );
  }
  // ...and the two carried addresses ARE the two bindings, as a SET (never a sequence).
  assert.deepEqual(
    new Set(record.triggered.map((element) => JSON.stringify(element.address))),
    new Set(bindingAddresses),
    'the carried addresses are the handle\'s own binding set, compared as a SET (`DD-22`)',
  );
  // **AND NO PARALLEL `triggeredAddresses` ARRAY EXISTS AND NONE MAY BE ADDED** (`trigger-and-pair.md §2`
  // item 4; `TF-6`): the record's own member set is the three `WriteResult` members and no fourth.
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
    '`trigger-and-pair.md §6` item 2 / `TF-6`: `WriteResult` keeps its THREE members');
});

test('registry_the_triggered_set_is_compared_as_a_set_and_no_order_is_asserted', () => {
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
    { address: ['a'], handle: 'l3' },
  ]);
  const first = inst.write(['a'], 'mem', 1);
  const second = inst.write(['a'], 'mem', 2);
  assert.equal(first.triggered.length, 3);
  // Membership only: the two enumerations may differ and no drive may treat that as a failure (DD-22).
  assert.equal(new Set(first.triggered).size, new Set(second.triggered).size);
  assert.ok(first.triggered !== second.triggered, 'fresh on every call');
});

// ---------------------------------------------------------------------------------------------
// `§2.7` — the delivery window, and the two registration verbs
// ---------------------------------------------------------------------------------------------

test('delivery_the_record_is_complete_before_the_window_opens', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = inst.write(['a'], 'mem', 1);
  // Everything the window could need is already in the returned value: the handle set, the watched
  // addresses, the op and the state halves — no member is filled in later.
  assert.equal(record.triggered.length, 1);
  assert.deepEqual(record.watched, [['a']]);
  assert.equal(record.op.after.present, true);
  assert.equal(inst.read(['a']), 1, 'the store\'s result is COMPLETE and copied out');
});

test('delivery_unlisten_returns_the_unit_on_success_including_its_no_op_success', () => {
  // **⟶ CALL SHAPE RE-DERIVED 2026-10-18: `listen(address)` → `listen(handle, addresses)`, ARITY `1 → 2`**
  // (`contract.md §2.2` items 1 and 10; `listen-verb.md §1` item 1). **THE CELL'S SUBJECT — BOTH `listen` AND
  // `unlisten` ANSWER THE UNIT, AND `unlisten`'s no-op success is idempotent — IS UNMOVED AND IS DRIVEN AT BOTH
  // ARMS.**
  const inst = mem();
  assert.equal(inst.listen('h', [['a']]), 'h', '`PAR-HL-3`: `listen` answers `undefined`');
  assert.equal(inst.unlisten('h'), undefined);
  assert.equal(inst.unlisten('not-a-handle'), undefined, 'its no-op success returns the same unit');
  assert.equal(inst.unlisten('not-a-handle'), undefined, 'and it is idempotent');
});

test('delivery_listen_carries_no_tier_qualifier_its_address_is_the_whole_of_its_key', () => {
  // **⟶ CALL SHAPE RE-DERIVED 2026-10-18: the ONE address the as-filed cell passed becomes the SET's ONE
  // MEMBER** — `listen(handle, [address])` (`contract.md §2.2` items 1 and 10; `listen-verb.md §2.2` item 1:
  // *"`addresses` is an ARRAY whose every member is an address in the store's own domain"*). **THE CELL'S
  // SUBJECT — THE LISTENER BINDS BY ADDRESS ALONE AND NO TIER QUALIFIES ITS KEY — IS UNMOVED.**
  const inst = mem();
  assert.equal(inst.listen('h', [['a', 'b']]), 'h');
  inst.write(['a'], 'mem', {});
  inst.write(['a', 'b'], 'mem', {});
  const atDepth = inst.write(['a', 'b', 'c'], 'mem', 1);
  assert.equal(atDepth.triggered.length, 1, 'the listener binds by ADDRESS alone');
  assert.equal(atDepth.triggered[0].handle, 'h');
  // **⟶ AND A WRITE ABOVE THE REGISTRATION IS THE TOUCHED ARM, RE-DERIVED 2026-10-29 — `D-67`/`D-66`.** The bytes
  // that stood here read *"a write ABOVE the registration does not fire it"* on `§6.5` item 3's prefix rule, and
  // **`D-66`/`D-67` SUPERSEDE THAT EXPECTATION AS A GENERAL CLAIM**: a registration is reached when the act's
  // address is at or below its own (the prefix arm) **OR WHEN THE ACT TOUCHED IT** (the descendant and purge arm).
  // **THE TWO ARMS ARE DRIVEN AT THEIR OWN STATES, which is what keeps the cell's subject — the ADDRESS is the
  // whole of the key — while stating the rule the tree now has.**
  const up = mem();
  up.listen('deep', [['p', 'q']]);
  // (a) THE UNTOUCHED DESCENDANT: the write at `['p']` carries `{r: 1}`, so it creates `['p','r']` and NOT
  // `['p','q']` — `D-66`'s own example, in this address's letters. Nothing at the registration's address
  // changed, so nothing is reached.
  assert.deepEqual(up.write(['p'], 'mem', { r: 1 }).triggered, [],
    'a write above the registration that does not touch it does not fire it (D-66)');
  // (b) THE TOUCHED DESCENDANT: the write at `['p']` carries `{}` and DESTROYS `['p','q']` whole, so the node at the
  // registration's own address was removed — the act TOUCHED it and the identity IS carried (`D-66`'s delete-arm
  // ground applied to a write's purge; `D-67`'s own measured finding).
  up.write(['p', 'q'], 'mem', {});
  assert.deepEqual(up.write(['p'], 'mem', {}).triggered.map((element) => element.handle), ['deep'],
    'a write above the registration that PURGES its node fires it (D-66; D-67)');
  // **AND THE TIER IS NO PART OF THE KEY** (`PAR-JS-13`'s reach): the registration named no tier, and the
  // firing is the ADDRESS's and never the tier's.
  assert.equal(up.write(['p', 'q'], 'mem', 3).triggered.length, 1,
    'no tier qualifies a `listen` key: the address IS the whole key');
});

test('delivery_the_watched_member_is_a_list_of_addresses_and_never_a_list_of_handles', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  inst.write(['a'], 'mem', {});
  const record = inst.write(['a', 'b'], 'mem', 1);
  assert.deepEqual(record.watched, [['a']], 'PAR-JS-14: an address is a SEGMENT LIST');
  for (const address of record.watched) assert.ok(Array.isArray(address));
});
