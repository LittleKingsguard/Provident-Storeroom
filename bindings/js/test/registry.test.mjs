// `surface.md §2.3`–`§2.4`, `§2.7`, `§2.10` — THE HANDLE, THE PACKAGE'S OWN REGISTRY, THE DELIVERY, AND THE
// TWO REGISTRATION VERBS, driven at the package's own boundary.
//
// **THE CONTRACT FINDING THIS FILE'S AUTHORING EXPOSED IS CLOSED, AND THE CELLS BELOW KEEP THE READING THE
// REMAND MOVED.** `contract.md §2.4` declares a PER-INSTANCE REGISTRY that holds **the caller's FUNCTION**
// for a handle and invokes it (`DD-15`, `DD-22`), and `parameter-semantics.md §2.12` (`PAR-JS-12`) declares
// a REGISTRATION whose non-function form throws a JS `TypeError`. **As this red set was authored, NO clause
// of `docs/specs/storeroom-js/**` declared the SPELLING of that registration site** — `§2.1`'s *"no clause of
// this directory exposes any member of it"* and `package.md §1.3` item 3's *"NOTHING ELSE"* appeared to close
// it off — **so the function halves of the registry's rules were reported `un-run`, and `un-run` IS A
// FAILURE** (`acceptance.md §4.4`). **THE BOUNDED CORRECTION PASS OF 2026-10-11 DECLARED THE SITE**
// (`§2.4` item 5 / `surface.md §2.4` item 5: `register(handle, listener) -> undefined`, the ONE member of
// the object `storeCreate` returned — a member of the PACKAGE's own wrapper and not of the store's
// instance), **and the function halves are now DRIVEN at `register.test.mjs`'s `S-REG` and
// `S-FIRE-WINDOW` lines.** **NOTHING IS DUPLICATED HERE:** the cells below are the ones the DECLARED verbs
// reach — the handle's two spellings, `unlisten`'s no-op set, the prefix test and the withdrawal — and the
// cell at rule 4 that names the function half points at `register.test.mjs` rather than restating it.
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

import { storeCreate, read, write, delete as remove, listen, unlisten } from '@provident-storeroom/js';

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

// ---------------------------------------------------------------------------------------------
// `§2.3` the handle
// ---------------------------------------------------------------------------------------------

test('handle_the_construction_takes_a_plain_string_and_the_return_value_is_opaque', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = write(inst, ['a'], 'mem', 1);
  const returned = record.triggered[0];
  assert.equal(record.triggered.length, 1);
  assert.notEqual(typeof returned, 'string', 'the returned handle is NOT the token string (DD-14)');
});

test('handle_the_returned_token_is_readable_by_no_js_code', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const returned = write(inst, ['a'], 'mem', 1).triggered[0];
  const spellings = [
    String(returned),
    JSON.stringify(returned),
    Object.keys(returned).join(','),
    Object.getOwnPropertyNames(returned).join(','),
    Object.getOwnPropertySymbols(returned).join(','),
    typeof returned.toString === 'function' ? returned.toString() : '',
  ];
  for (const spelling of spellings) {
    assert.ok(
      !String(spelling).includes('l1'),
      `the token is PRIVATE and readable by no JS code; got \`${spelling}\``,
    );
  }
});

// **THE CELL BELOW WAS RE-DERIVED BY THE 2026-10-11 `V-1` PASS, BECAUSE ITS FIRST FORM ASSERTED AN
// EXPECTATION THE DECLARED BEHAVIOUR DOES NOT SUPPORT.** As first authored it called `listen(i, ['a'])` twice
// and required **TWO DIFFERENT handles**. **THE DECLARED ANSWER IS THE OTHER ONE, AND THE STORE'S CONTRACT IS
// ITS AUTHORITY:** **`docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c)** — *"a `listen(address)`
// whose address IS already registered returns the EXISTING entry's handle rather than minting a second one"* —
// **read with `§6.5` item 2's ADDRESS-LEVEL IDEMPOTENCE** (*"registering the same address twice is idempotent
// at the address level: the returned list carries DISTINCT addresses"*) **and with `§6.5` item 8 (a)'s ONE
// home** (*"the store instance owns exactly ONE home map … registrations keyed by the listener's `address`"*,
// `A45`/`A48`). **So a repeat `listen` at a registered address MINTS NOTHING and returns the entry's own
// handle, and `A69`'s per-process uniqueness is NOT weakened by that clause:** it quantifies over **the tokens
// the store MINTS** (`§2.3` item 1 — *"no OTHER token the store mints … is equal to it"*, with the store's
// `parameter-semantics.md §2.13`/`PAR-13` uniqueness domain), and the repeat mints no token at all.
//
// **CONTRACT FINDING, REPORTED AND NOT PAPERED OVER — NO CLAUSE OF `docs/specs/storeroom-js/**` DECLARES THE
// REPEAT-`listen` ANSWER, AS OF THIS RUN.** `surface.md §2.10`/`contract.md §2.10` print *"mints a token,
// populates the store's home"* (the NOT-registered case); `§2.3` item 1 declares the MINTED token's
// per-process uniqueness; and `§2.4` rule 4's *"a later re-`listen` at the same address mints a DIFFERENT
// handle"* is the AFTER-`unlisten` case, where the home entry is already gone. **The declared authority for
// the registered-address state is therefore the store's `§6.5` item 12 (c), cited here rather than a
// unit-side rule invented beside it** — and a unit-side clause stating it outright is a bounded amendment of
// `docs/specs/storeroom-js/`, reported to the supervisor.
test('handle_a_repeat_listen_at_a_registered_address_returns_the_entries_own_handle', () => {
  const inst = mem();
  const minted = listen(inst, ['a']);
  const repeat = listen(inst, ['a']);
  // **NO SECOND ENTRY EXISTS:** `A45`'s one home holds ONE entry per address, so ONE write at that address
  // triggers EXACTLY ONE handle — never two, and never none.
  const first = write(inst, ['a'], 'mem', 1);
  assert.equal(first.triggered.length, 1, '`§6.5` item 8 (a): ONE home entry per address, so ONE handle');
  // **AND THE REPEAT NAMES THAT ENTRY ITSELF:** `unlisten` removes exactly the entry whose handle it is
  // handed (`§6.5` item 12's *"which is why `unlisten` over the returned handle removes exactly one entry"*),
  // so withdrawing the REPEAT's value withdraws the address's registration — which IS NOT what a second,
  // separately-minted entry would leave behind.
  assert.equal(unlisten(inst, repeat), undefined);
  const after = write(inst, ['a'], 'mem', 2);
  assert.deepEqual(after.triggered, [], 'the repeat\'s value names the entry the first `listen` minted');
  // ...and the FIRST call's value names that same, now-withdrawn entry: the two calls name ONE entry, and the
  // withdrawal over an already-removed entry is the ordinary no-op success (`§2.3` item 4).
  assert.equal(unlisten(inst, minted), undefined);
  assert.ok(minted !== undefined && repeat !== undefined, 'both calls returned handles, never a unit');
});

// **THE PART THE CELL WAS REALLY REACHING FOR, DRIVEN BESIDE IT — BECAUSE THE CONTRACT DECLARES IT AND NO
// CELL REACHED IT** (`§2.3` item 1's per-process mint; `§6.5` item 10 (b)'s binding BY ADDRESS; `§2.3` item 4
// and `§2.4` item 5 (d)'s two declared answers for a value ANOTHER instance minted; the unit's `§2.3` item 2
// wrapper identity and `PAR-JS-8`'s *"a value a FOREIGN instance minted"*).
test('handle_a_mint_is_unique_per_process_and_two_addresses_on_one_instance_differ', () => {
  const owner = mem();
  const other = mem();
  const atA = listen(owner, ['a']);
  const atB = listen(owner, ['b']);
  assert.ok(atA !== atB, '`§2.3` item 1: two mints are two tokens, and no mint repeats another');
  // BINDING IS BY ADDRESS AND BY NOTHING ELSE (`§6.5` item 10 (b)): each registration fires for its own
  // address alone — and a write at an address no registration is a prefix of fires nothing (`§6.5` item 3).
  assert.equal(write(owner, ['a'], 'mem', 1).triggered.length, 1);
  assert.equal(write(owner, ['b'], 'mem', 1).triggered.length, 1);
  assert.deepEqual(write(owner, ['c'], 'mem', 1).triggered, []);
  // THE SAME ADDRESS ON A SECOND INSTANCE IS A SECOND MINT, and the two are DISTINGUISHABLE — which is what
  // `A69`'s per-process domain means across instances (`§2.3` item 1: *"in ANY other instance of THIS
  // process"*): the foreign value names NO entry of this one.
  const foreign = listen(other, ['a']);
  assert.ok(foreign !== atA, 'the same address on another instance is another mint');
  // `unlisten` over the foreign value is the declared NO-OP SUCCESS and removes NOTHING here (`§2.3` item 4;
  // `PAR-JS-8`'s *"a value a FOREIGN instance minted"*), so the owner's own registration still fires.
  assert.equal(unlisten(owner, foreign), undefined);
  assert.equal(write(owner, ['a'], 'mem', 2).triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  // AND AT THE REGISTRATION SITE the SAME class answers the bare JS `TypeError` (`§2.4` item 5 (d): *"a value
  // a FOREIGN instance minted … → the SAME JS `TypeError`"*, carrying NO `status` and NO `message`) —
  // driven here as the IDENTITY half (a foreign handle names no registry key of this instance), while
  // `register.test.mjs`'s `S-REG` drives the same class inside its whole outside-value list.
  assert.throws(
    () => owner.register(foreign, () => {}),
    (err) =>
      err instanceof TypeError &&
      !('status' in err) &&
      !Object.prototype.hasOwnProperty.call(err, 'message'),
  );
  assert.equal(write(owner, ['a'], 'mem', 3).triggered.length, 1, 'nothing reached the store on that case');
});

test('handle_a_caller_spelled_token_is_adopted_verbatim_and_is_lawful', () => {
  const inst = mem([{ address: ['a'], handle: 'listener-1' }]);
  const record = write(inst, ['a'], 'mem', 1);
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
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  listen(inst, ['b']);
  assert.equal(unlisten(inst, 'l1'), undefined, 'a bare string is an UNKNOWN handle');
  assert.equal(unlisten(inst, 'listener-1'), undefined);
  assert.equal(unlisten(inst, ''), undefined, 'a blank token is the same no-op success');
  // NO OTHER REGISTRATION IS REMOVED: the `b` mint still fires.
  const record = write(inst, ['b'], 'mem', 2);
  assert.equal(record.triggered.length, 1);
});

test('registry_rule_4_unlisten_over_a_foreign_handle_fabricated_or_non_opaque_is_a_no_op_success', () => {
  const owner = mem();
  const foreign = mem();
  const kept = listen(owner, ['a']);
  const foreignHandle = listen(foreign, ['a']);
  assert.equal(unlisten(owner, foreignHandle), undefined, 'a foreign instance\'s value is a no-op success');
  assert.equal(unlisten(owner, 42), undefined, 'a non-opaque value is a no-op success');
  assert.equal(unlisten(owner, {}), undefined);
  assert.equal(unlisten(owner, undefined), undefined, 'an absent handle is a no-op success');
  const record = write(owner, ['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  assert.ok(kept !== undefined && kept !== foreignHandle);
});

test('registry_the_withdrawal_removes_the_store_side_home_entry_and_never_the_function', () => {
  const inst = mem();
  const handle = listen(inst, ['a']);
  unlisten(inst, handle);
  const record = write(inst, ['a'], 'mem', 1);
  assert.deepEqual(
    record.triggered,
    [],
    '§2.4 rule 4: `unlisten` withdraws the store-side home entry, so the handle does not appear again',
  );
  // `DD-15`: the package's own registry entry stands — a later re-`listen` mints a DIFFERENT handle whose
  // registration is a NEW registry entry. (The function half of the rule — that a WITHDRAWN handle's
  // function "simply never fires again" — is driven at `register.test.mjs`'s `S-REG` line, which reaches the
  // registration site `§2.4` item 5 declared; this cell keeps the STORE-side half it can reach.)
  const again = listen(inst, ['a']);
  assert.ok(again !== handle, 'a re-`listen` at the same address mints a DIFFERENT handle');
  const second = write(inst, ['a'], 'mem', 2);
  assert.equal(second.triggered.length, 1);
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
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', {});
  const record = write(inst, ['a', 'b', 'c'], 'mem', 1);
  assert.equal(record.triggered.length, 2, 'the prefix set, descendant-inclusive, on a WRITE');
  const outside = write(inst, ['q'], 'mem', 1);
  assert.deepEqual(outside.triggered, [], 'a write outside every registration\'s scope fires nothing');
});

test('registry_a_delete_fires_its_own_triggered_set_on_the_same_prefix_test', () => {
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['zzz'], handle: 'at-zzz' },
  ]);
  write(inst, ['a'], 'mem', 1);
  const receipt = remove(inst, ['a'], 'mem');
  assert.equal(receipt.triggered.length, 1, 'A43: a delete FIRES');
  assert.deepEqual(receipt.tiers, ['mem']);
});

// ---------------------------------------------------------------------------------------------
// `§5.5`'s `S-REG-DUP` and `§5.8`'s `S-SET` — a set, never a sequence
// ---------------------------------------------------------------------------------------------

test('registry_a_lawful_duplicate_token_fires_once_for_the_distinct_handle', () => {
  // `§2.4` rule 3: where two construction entries at one address carry the caller's SAME token, the store
  // returns that token ONCE where the store minted it, and the registry fires ONE invocation per DISTINCT
  // handle — not one per occurrence and not one per entry.
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l1' },
  ]);
  const record = write(inst, ['a'], 'mem', 1);
  assert.equal(
    record.triggered.length,
    1,
    'one DISTINCT handle, not one per occurrence and not one per entry',
  );
});

test('registry_the_triggered_set_is_compared_as_a_set_and_no_order_is_asserted', () => {
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
    { address: ['a'], handle: 'l3' },
  ]);
  const first = write(inst, ['a'], 'mem', 1);
  const second = write(inst, ['a'], 'mem', 2);
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
  const record = write(inst, ['a'], 'mem', 1);
  // Everything the window could need is already in the returned value: the handle set, the watched
  // addresses, the op and the state halves — no member is filled in later.
  assert.equal(record.triggered.length, 1);
  assert.deepEqual(record.watched, [['a']]);
  assert.equal(record.op.after.present, true);
  assert.equal(read(inst, ['a']), 1, 'the store\'s result is COMPLETE and copied out');
});

test('delivery_unlisten_returns_the_unit_on_success_including_its_no_op_success', () => {
  const inst = mem();
  const handle = listen(inst, ['a']);
  assert.equal(unlisten(inst, handle), undefined);
  assert.equal(unlisten(inst, 'not-a-handle'), undefined, 'its no-op success returns the same unit');
  assert.equal(unlisten(inst, 'not-a-handle'), undefined, 'and it is idempotent');
});

test('delivery_listen_carries_no_tier_qualifier_its_address_is_the_whole_of_its_key', () => {
  const inst = mem();
  const handle = listen(inst, ['a', 'b']);
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', {});
  const atDepth = write(inst, ['a', 'b', 'c'], 'mem', 1);
  assert.equal(atDepth.triggered.length, 1, 'the listener binds by ADDRESS alone');
  const sibling = write(inst, ['a'], 'mem', 1);
  assert.deepEqual(sibling.triggered, [], 'a write ABOVE the registration does not fire it');
  assert.ok(handle !== undefined);
});

test('delivery_the_watched_member_is_a_list_of_addresses_and_never_a_list_of_handles', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  write(inst, ['a'], 'mem', {});
  const record = write(inst, ['a', 'b'], 'mem', 1);
  assert.deepEqual(record.watched, [['a']], 'PAR-JS-14: an address is a SEGMENT LIST');
  for (const address of record.watched) assert.ok(Array.isArray(address));
});
