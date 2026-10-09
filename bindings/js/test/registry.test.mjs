// `surface.md §2.3`–`§2.4`, `§2.7`, `§2.10` — THE HANDLE, THE PACKAGE'S OWN REGISTRY, THE DELIVERY, AND THE
// TWO REGISTRATION VERBS, driven at the package's own boundary.
//
// **A CONTRACT FINDING THIS FILE'S AUTHORING EXPOSED, STATED FIRST BECAUSE IT BOUNDS THESE CELLS.**
// `contract.md §2.4` declares a PER-INSTANCE REGISTRY that holds **the caller's FUNCTION** for a handle and
// invokes it (`DD-15`, `DD-22`), and `parameter-semantics.md §2.12` (`PAR-JS-12`) declares a REGISTRATION
// whose non-function form throws a JS `TypeError`. **No clause of `docs/specs/storeroom-js/**` declares the
// SPELLING of that registration site** — and the two clauses that would frame one close it off:
// `§2.1` says of the instance handle that *"no clause of this directory exposes any member of it"*, and
// `package.md §1.3` item 3 says the named exports are *"exactly the verbs of `surface.md §2` and the
// package's own instance handle factory — and NOTHING ELSE"*. Consequently the cells below drive every half
// of the registry's rules that the DECLARED surface can express, and the halves that need a function to be
// registered are **UN-RUN, and `un-run` IS A FAILURE** (`acceptance.md §4.4`); they are named in the
// `register.test.mjs` runner's own output and reported to the supervisor as CONTRACT FINDING #1. No spelling
// is invented here.
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED:** a minted handle · a caller-spelled token at the
// construction · two different handles at one address · the SAME token twice at one address · a bare string
// at `unlisten` · a foreign instance's handle · a blank token · a non-opaque value · an absent handle · a
// prefix-qualified registration set · a registration outside the write's scope · a `delete`'s triggered set.

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

test('handle_a_mint_is_unique_per_process_and_two_registrations_at_one_address_differ', () => {
  const inst = mem();
  const a = listen(inst, ['a']);
  const b = listen(inst, ['a']);
  assert.ok(a !== b, 'no other token the store mints is equal to it');
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
  // registration is a NEW registry entry. (The function half of the rule is UN-RUN: see FINDING #1.)
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
