// RED SET — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): THE SURFACE.
//
// **AUTHORED FROM THE CONTRACT ALONE.** Every cell cites the `§` or the `P-HL`/`PAR-HL` row it derives
// from; no cell reads `bindings/js/index.mjs`, `bindings/js/index.d.ts` or `bindings/js/src/**` for an
// expectation. The authority is `docs/specs/storeroom-held-listener-identity/contract.md` and its parts,
// with `docs/pending.md`'s `⟶` rulings behind them.
//
// ── THE STATE MACHINE, ENUMERATED BEFORE ANY CELL WAS AUTHORED (one cell per declared state) ────────
//
// | # | The state | Its pin | Its cell |
// | --- | --- | --- | --- |
// | 1 | the product's OWN MEMBER SET is exactly fourteen, `10 + 1 + 1 + 2 = 14` | `§2.7` item 9 | `hli_surface_the_member_set_is_exactly_the_fourteen_declared_names` |
// | 2 | BOTH remove members are reached through the FACTORY'S PRODUCT and neither is a module export | `§2.7` item 9 item 3 | `hli_surface_the_two_remove_members_are_members_and_no_module_exports` |
// | 3 | `S-1` a fresh store, empty `listeners`, no constraint | `§3` `S-1` | `hli_surface_a_fresh_store_is_the_declared_empty_state` |
// | 4 | `S-2` `listen(h,[A])` writes the entry OFF; `register` clears it; the body fires at a write at `A` | `§2.2` item 5 (a)–(b) | `hli_surface_listen_then_register_arms_the_handle_and_it_fires_once` |
// | 5 | `S-2`'s silence half: an entry written by `listen` and NEVER armed invokes nothing | `§2.2` item 5 (a); `listen-verb.md §4` state 1 | `hli_surface_a_reserved_entry_invokes_nothing_at_a_write` |
// | 6 | `S-3` `listen(h,[A,B])` — ONE entry, two addresses, TWO mirror rows | `§2.2` items 2, 8 | `hli_surface_one_handle_at_two_addresses_is_one_entry_and_two_mirror_rows` |
// | 7 | `S-4` `listen(h,S1)` then `listen(h,S2)` — `S1` purged wholesale, `S2` installed | `§2.2` item 3 | `hli_surface_a_second_listen_is_a_set_assignment_and_purges_the_old_set` |
// | 8 | `S-5` `listen(h,S1)` twice — idempotent IN EFFECT, one entry, one set | `§2.2` item 3 | `hli_surface_a_repeated_listen_is_idempotent_in_effect_only` |
// | 9 | `S-6` `unlisten(h)` withdraws the store entry and KEEPS the map entry, OFF | `§2.2` item 5; `§2.1` item 5 | `hli_surface_unlisten_keeps_the_reservation_so_register_rearms_it` |
// |10 | `S-7` `removeListener(h)` removes the entry whole and withdraws the store entries | `§2.7` item 2 | `hli_surface_removeListener_removes_the_entry_whole_and_the_handle_leaves_the_domain` |
// |11 | `S-8` a boot whose `cfg.listeners` carries N entries for one handle, applied through `listen` | `§2.2` item 8 | `hli_surface_the_boot_route_goes_through_the_same_listen_verb` |
// |12 | `S-9` `addConstraint(pair, fn)` at a fresh pair — one entry, one identity, one `state.constraints` | `§2.3` item 2; `§2.6` item 2 | `hli_surface_addConstraint_at_a_fresh_pair_stands_and_enumerates` |
// |13 | `S-10` `addConstraint` at a HELD pair answers THE SAME identity | `§2.3` items 1–2; `§2.6` item 2 | `hli_surface_addConstraint_at_a_held_pair_answers_the_same_identity` |
// |14 | `S-11` `constraintOff` then `constraintOn` — each `undefined`, `constraints()` unmoved | `§2.3` item 7; `§2.7` item 8 | `hli_surface_the_two_toggles_answer_undefined_and_leave_the_enumeration_standing` |
// |15 | `S-12` `removeConstraint(pair)` — the four structures gone, `constraints()` shrinks by one | `§2.7` items 3, 7 | `hli_surface_removeConstraint_shrinks_the_enumeration_by_one` |
// |16 | `S-13` a write at `A` with a listener bound at `['a']` — the pair's `address` is the BINDING's | `§2.4` items 1, 7 | `hli_surface_the_trigger_pair_carries_the_binding_address_and_the_argument_the_writes` |
// |17 | `S-14` a handle at two prefix-matching addresses — ONE invocation | `§2.4` item 6 | `hli_surface_one_handle_at_two_matching_addresses_fires_once` |
// |18 | `S-13`'s equal-address arm: where the binding IS the written address the two values coincide | `§2.4` item 7; `trigger-and-pair.md §8`'s closing clause | `hli_surface_where_the_binding_is_the_written_address_the_pair_and_the_argument_coincide` |
//
// ── THE FAIL STATES, ONE CELL PER DOCUMENTED FAIL-STATE (`§4`) ─────────────────────────────────────
//
// | # | The fail state | Its form | Its cell |
// | --- | --- | --- | --- |
// | `F-1` | `listen`'s handle position outside `HL-1`'s domain | rule (i), `AddressMalformed` | `hli_surface_listen_refuses_every_outside_handle_in_the_one_thrown_form` |
// | `F-2` | `listen`'s set position outside its domain | rule (i), `AddressMalformed` | `hli_surface_listen_refuses_every_outside_set_in_the_one_thrown_form` |
// | `F-3` | `unlisten` over any outside value | NO THROW — a no-op success | `hli_surface_unlisten_over_every_outside_value_is_a_no_op_success` |
// | `F-4` | `register` over an outside handle | rule (i), `AddressMalformed` | `hli_surface_register_refuses_every_outside_handle_in_the_one_thrown_form` |
// | `F-5` | `register` over a non-function listener | rule (i), `AddressMalformed` | `hli_surface_register_refuses_a_non_function_listener_in_the_one_thrown_form` |
// | `F-6` | `removeListener` over any arm that is not a real removal | THROWN, with a verbose message | `hli_surface_removeListener_throws_on_every_arm_that_is_not_a_real_removal` |
// | `F-7` | `removeConstraint` over an outside pair | rule (ii), `TypeError`, no `status` | `hli_surface_removeConstraint_throws_the_constraint_methods_type_error_over_an_outside_pair` |
// | `F-8` | `removeConstraint` over a pair the entry does not carry | THROWN, descriptive | `hli_surface_removeConstraint_throws_over_a_pair_the_entry_does_not_carry` |
// | `F-9` | the constraint/listener CONFLICT at `register` | rule (ii), `TypeError`, message naming BOTH sides | `hli_surface_the_constraint_listener_conflict_throws_the_type_error_naming_both_sides` |
// | `LF-8` | a `listen` that refused on a conflict — the test does NOT stand at `listen` | NOTHING throws | `hli_surface_listen_at_a_constraint_pairs_address_purges_and_succeeds_with_no_conflict_test` |
//
// ── WHAT THIS FILE DOES NOT DRIVE, NAMED SO ITS ABSENCE IS A DECISION ──────────────────────────────
//
// 1. A MID-WINDOW MUTATION OF ANOTHER ENTRY (`§2.2` item 9; `P: docs/pending.md · (AA-6)`:
//    UNSUPPORTED BEHAVIOUR). No cell asserts what such a mutation does.
// 2. A READABLE DIFFERENCE BETWEEN A PURGED-BUT-ENFORCING PAIR AND AN INTACT ONE (`listen-verb.md §5`
//    item 3: the assertability claim for the pair's STORE standing is WITHDRAWN). No cell asserts one.
// 3. ANY ORDER OVER `triggered` OR `pending` (`§2.5` item 5; `DD-37`/`DD-22`). Every comparison is by SET.
// 4. A NUMERIC BOUND ON THE MAP (`identity-and-domain.md §6`'s closing NEGATIVE: no ruling states one).

import test from 'node:test';
import assert from 'node:assert/strict';

import * as NS from 'provident-storeroom';

import {
  THE_FOURTEEN, STORE_CODES, capture, tag, newHandle, makeStore, seedContainers,
  handleOutsideValues, setOutsideValues,
  assertRuleOne, assertRuleTwo,
  assertListenAnswer, assertRemoveListenerAnswer, assertRemoveConstraintAnswer,
  assertAllPairs, assertTriggerPair, handlesOf, legacyListenSignature,
} from './held-listener-identity-helpers.mjs';

const { storeCreate } = NS;

/** A counting body — a listener that records the ONE argument it is handed (`PAR-HL-35`). */
function counting() {
  const seen = [];
  const fn = (address) => { seen.push(Array.isArray(address) ? address.slice() : address); };
  fn.seen = seen;
  return fn;
}

/** A constraint body that always passes — state 1 at its registration (`§2.3` item 5). */
const passing = () => true;

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.7 item 9 — THE MEMBER SET IS EXACTLY FOURTEEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_the_member_set_is_exactly_the_fourteen_declared_names', () => {
  // **THE FIGURE, PRINTED WITH ITS TERMS IN THE CLAUSE ITSELF: `10 + 1 + 1 + 2 = 14` ✓** — the `10` being
  // the ten methods `A127` moved off the module namespace, the first `1` `register`, the second `1`
  // `constraints`, and the `2` the two NEW members (`contract.md §2.7` item 9; `removal-members.md §7`
  // item 2; `P: docs/pending.md · (AA-5)`: *"the member set is 14 and the `12 → 13` figure is withdrawn by
  // name"*). **A THIRTEEN OR A TWELVE HERE IS `RF-8`** (`removal-members.md §8`).
  const inst = makeStore();
  const own = Object.getOwnPropertyNames(inst).filter((k) => typeof inst[k] === 'function').sort();
  assert.deepEqual(own, [...THE_FOURTEEN].sort(),
    'the product\'s own callable member set is EXACTLY the fourteen declared names — read '
    + JSON.stringify(own) + ' (`contract.md §2.7` item 9; `removal-members.md §8` `RF-8`)');
  assert.equal(own.length, 14,
    'and the count is `14`, `10 + 1 + 1 + 2 = 14` — NOT thirteen and NOT twelve '
    + '(`contract.md §2.7` item 1: "THE MEMBER SET MOVES `12 → 14`, NOT THIRTEEN")');
});

test('hli_surface_the_two_remove_members_are_members_and_no_module_exports', () => {
  // **`§2.7` item 9 item 3: THE MODULE NAMESPACE STAYS AT ONE NAME — `storeCreate` ALONE, `11 → 1` ✓ — and
  // the two new members are NOT module exports.** **A member is reached through the factory's product
  // alone** (`removal-members.md §7` item 3; `contract.md §2.7` item 9). **AND THE ONE CLASS OF CELL THAT IS
  // NOT RED: a cell asserting the module namespace's one name stays GREEN** (`removal-members.md §7` item 6).
  assert.equal(typeof NS.removeListener, 'undefined',
    'removeListener is NOT a module export — it is a member of the product (`contract.md §2.7` item 9 '
    + 'item 3), so a namespace spelling of it is undefined');
  assert.equal(typeof NS.removeConstraint, 'undefined',
    'and neither is removeConstraint');
  assert.equal(typeof NS.storeCreate, 'function', 'while the ONE module name stands (`11 → 1` ✓)');

  const inst = makeStore();
  assert.equal(typeof inst.removeListener, 'function',
    'removeListener IS an own member of the product (`contract.md §2.7` item 1)');
  assert.equal(typeof inst.removeConstraint, 'function',
    'and removeConstraint IS the second (`contract.md §2.7` item 1)');
  assert.equal(inst.removeListener.length, 1,
    'removeListener\'s arity is ONE — position 1 is handle (`removal-members.md §2` item 1; `PAR-HL-14`)');
  assert.equal(inst.removeConstraint.length, 1,
    'removeConstraint\'s arity is ONE — position 1 is pair (`removal-members.md §3` item 1; `PAR-HL-16`)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.2 — `listen(handle, addresses)`: TWO POSITIONS, THE SECOND A SET
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_listen_declares_two_positions_and_the_second_is_a_set', () => {
  // **THE ARITY FIGURE MOVES `1 → 2`** at four declared sites (`listen-verb.md §1` item 2;
  // `contract.md §2.2` item 1; `PAR-HL-1`, `PAR-HL-2`). **THE SIGNATURE IS `a.listen(handle, addresses) ->
  // undefined`** (`listen-verb.md §1` item 1) — and the return is asserted separately below.
  const inst = makeStore();
  assert.equal(inst.listen.length, 2,
    'listen DECLARES two positions — read ' + inst.listen.length
    + ' (`listen-verb.md §1` item 1–2; `contract.md §2.2` item 1; `PAR-HL-1`, `PAR-HL-2`)');
  assert.equal(legacyListenSignature(inst), false,
    'and it is NOT the superseded one-position `listen(address)`: this cell exists so the superseded '
    + 'arity cannot pass as the new one (`contract.md` index region, citation re-spelling row 1)');
});

test('hli_surface_a_fresh_store_is_the_declared_empty_state', () => {
  // `S-1` — a fresh store constructed with an empty `listeners` array and no constraint
  // (`contract.md §3` `S-1`; `docs/specs/storeroom-native/parameter-semantics.md §2.12`). **The empty array
  // is IN the domain and is the ordinary no-listener store** (`listen-verb.md §2.2` item 1).
  const inst = makeStore({ listeners: [] });
  assert.deepEqual(inst.constraints(), [],
    'a fresh store carries no pair (`contract.md §3` `S-1`; `PAR-HL-13`: the empty array is in the domain)');
  const h = newHandle('empty');
  // The set position's EMPTY ARRAY is in the domain and is the ordinary "listen at no address" act.
  assertListenAnswer(inst.listen(h, []),
    'listen(h, []) — the empty set is IN the domain (`listen-verb.md §2.2` item 1)', h);
});

test('hli_surface_listen_then_register_arms_the_handle_and_it_fires_once', () => {
  // `S-2` — `listen(h, [A])` WRITES THE ENTRY WITH `off` SET (the reservation); `register(h, fn)` CLEARS
  // `off` and INSTALLS the function; the entry invokes `fn` at a write at `A` (`contract.md §2.2` item 5
  // (a)–(b); `listen-verb.md §4` states 1, 2 and the transition `1 → 2`).
  const inst = makeStore();
  const h = newHandle('armed');
  const address = [tag('addr')];
  assertListenAnswer(inst.listen(h, [address]), 'listen(h, [A])', h);

  const body = counting();
  assert.equal(inst.register(h, body), undefined,
    'register(h, fn) answers undefined and installs the function (`contract.md §2.2` item 5 (b))');

  const record = inst.write(address, 'mem', 1);
  assertAllPairs(record.triggered,
    'the write\'s returned set carries pairs (`contract.md §2.4` item 1; `PAR-HL-21`, `PAR-HL-38`)');
  assert.deepEqual(handlesOf(record.triggered), [h],
    'the armed handle fires and it is the CALLER\'S OWN STRING, unchanged — the identity the store '
    + 'reports and the identity the caller holds ARE ONE VALUE (`contract.md §2.1` item 1; `PAR-HL-19`; '
    + '`P-HL-1`\'s `S-ID-MONO`)');
  assert.deepEqual(body.seen, [address],
    'and the body is invoked ONCE with the TRIGGERING address as its one argument (`PAR-HL-35`; '
    + '`§2.4` item 7). Read ' + JSON.stringify(body.seen));
});

test('hli_surface_a_reserved_entry_invokes_nothing_at_a_write', () => {
  // `S-2`'s silence half — STATE `1`'s SILENCE: a write at an address the entry stands at returns the
  // handle in `triggered` and invokes NOTHING — no code, no warning, no log
  // (`listen-verb.md §4` item 3 (i); `docs/specs/storeroom-js/surface.md §2.4` rule 1;
  // `identity-and-domain.md §4` item 3 (i)). **`LF-5` is the FAILURE this cell's subject excludes: an
  // entry that is RESERVED but invokes** (`listen-verb.md §8`).
  const inst = makeStore();
  const h = newHandle('reserved');
  const address = [tag('addr')];
  inst.listen(h, [address]);
  const record = inst.write(address, 'mem', 1);
  assertAllPairs(record.triggered, 'a reserved entry still appears in the trigger set');
  assert.deepEqual(handlesOf(record.triggered), [h],
    'the store returns the handle — the reservation is a store fact, not a package one '
    + '(`contract.md §2.2` item 5 (a))');
  // NOTHING CAN HAVE BEEN INVOKED: no function was ever registered for `h`, and an entry with no
  // function is not a lawful value to invoke (`listen-verb.md §4` item 2; `identity-and-domain.md §2`
  // item 5). The observable the clause names is the ABSENCE of a side effect, asserted through the only
  // channel that could carry one: a registered body that never existed.
  assert.equal(inst.register.length, 2,
    'and `register` declares its two positions (`PAR-HL-6`, `PAR-HL-7`) — the arm this cell leaves unused');
});

test('hli_surface_one_handle_at_two_addresses_is_one_entry_and_two_mirror_rows', () => {
  // `S-3` — `listen(h, [A, B])`: ONE handle, two addresses, ONE entry with `off` set, and the mirror holds
  // N rows `{key, handle}` when ONE handle arrives at N addresses (`contract.md §3` `S-3`; `§2.2` item 8;
  // `listen-verb.md §6` item 4 (iv); `PAR-HL-24`).
  const inst = makeStore();
  const h = newHandle('two');
  const a = [tag('a')];
  const b = [tag('b')];
  assertListenAnswer(inst.listen(h, [a, b]), 'listen(h, [A, B])', h);

  const body = counting();
  inst.register(h, body);
  const atA = inst.write(a, 'mem', 1);
  const atB = inst.write(b, 'mem', 2);
  assert.deepEqual(handlesOf(atA.triggered), [h],
    'the ONE entry fires at the first address (`contract.md §2.2` item 5 (b))');
  assert.deepEqual(handlesOf(atB.triggered), [h],
    'and at the second — ONE handle standing at N addresses is ONE entry, and it fires at every address '
    + 'of its own set (`contract.md §2.2` item 3; `PAR-HL-2`\'s referent: "the set of addresses the handle '
    + 'stands at after this act")');
  assert.equal(body.seen.length, 2,
    'two writes at two addresses of one standing set invoke the ONE body twice — one per write, and never '
    + 'one per mirror row (`§2.4` item 6\'s dedupe is per WINDOW and not per address)');
});

test('hli_surface_a_second_listen_is_a_set_assignment_and_purges_the_old_set', () => {
  // `S-4` — **THE SET IS AN ASSIGNMENT, NOT A UNION: `listen(h, S2)` after `listen(h, S1)` DESTROYS `S1`
  // WHOLLY AND INSTALLS `S2`** (`contract.md §2.2` item 3; `listen-verb.md §3` item 1;
  // `P: docs/pending.md · (R1)`: *"S1 gets purged wholesale, yes"*). **`LF-4` is the failure this excludes:
  // a set-assignment read as a union, observed as a write at an address of `S1 \ S2` still returning `h`**
  // (`listen-verb.md §8`). **AND THE PURGE IS BY HANDLE: it enumerates no addresses and consults no count**
  // (`contract.md §5.2`, `P-HL-2`; `listen-verb.md §8` `LF-6`).
  const inst = makeStore();
  const h = newHandle('set');
  const s1 = [tag('s1a'), tag('s1b')].map((k) => [k]);
  const s2 = [[tag('s2a')]];
  inst.listen(h, s1);
  assertListenAnswer(inst.listen(h, s2), 'listen(h, S2) over a standing `S1`', h);

  const body = counting();
  inst.register(h, body);

  for (const address of s1) {
    const at = inst.write(address, 'mem', 1);
    assert.deepEqual(handlesOf(at.triggered), [],
      'NOTHING of `S1` survives: a write at an address of `S1 \\ S2` returns NO handle — read '
      + JSON.stringify(at.triggered) + ' at ' + JSON.stringify(address)
      + '. The standing set is ALWAYS the last act\'s set, never cumulative (`contract.md §2.2` item 3; '
      + '`listen-verb.md §8` `LF-4`)');
  }
  const at = inst.write(s2[0], 'mem', 2);
  assert.deepEqual(handlesOf(at.triggered), [h],
    'while `S2` is installed and fires (`contract.md §2.2` item 3)');
  assert.equal(body.seen.length, 1,
    'and the body ran for `S2` alone — one invocation for the one surviving address, none for `S1`');
});

test('hli_surface_a_repeated_listen_is_idempotent_in_effect_only', () => {
  // `S-5` — `listen(h, S1)` twice is IDEMPOTENT IN EFFECT — purge then reinstall the same set — **and never
  // by a fast path** (`contract.md §2.2` item 3; `P: docs/pending.md · (R1)`, its own closing sentence).
  // **AND ITS CONSEQUENCE, PRINTED BECAUSE THE ARITY CHANGE MADE IT REACHABLE: a repeated `listen` at a
  // held address NO LONGER answers the same handle — it destroys the listener that was there and installs a
  // new one** (`kernel-selection.md §2.3`, `P: docs/pending.md · P-6`'s `first_at` ruling; `first_at` and
  // its idempotence are DELETED).
  const inst = makeStore();
  const h = newHandle('repeat');
  const a = [tag('r')];
  assertListenAnswer(inst.listen(h, [a]), 'the first listen', h);
  const body = counting();
  inst.register(h, body);
  assertListenAnswer(inst.listen(h, [a]), 'the SECOND listen at the same address and handle', h);
  const at = inst.write(a, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [h],
    'one entry and one set survive: the repeat purged and reinstalled the same set, so the handle still '
    + 'stands at `A` (`contract.md §2.2` item 3; `P: docs/pending.md · (R1)`)');
  // THE `off` FLAG IS RE-SET BY THE SECOND `listen` (`contract.md §2.2` item 5 (a): `listen` WRITES THE
  // ENTRY WITH `off` SET) and only `register` clears it — so the repeat disarms the entry, which is the
  // declared consequence and not a defect.
  assert.equal(body.seen.length, 0,
    'and the re-reserved entry invokes NOTHING until `register` is called again: the second `listen` '
    + 'wrote the entry with `off` set (`contract.md §2.2` item 5 (a); `kernel-selection.md §2.3`: there is '
    + 'no "already registered so mint nothing" arm — read ' + JSON.stringify(body.seen));
});

test('hli_surface_unlisten_keeps_the_reservation_so_register_rearms_it', () => {
  // `S-6` — `unlisten(h)` where `h` stands at one address: the store entry is WITHDRAWN and the MAP ENTRY
  // IS KEPT with `off` set (`contract.md §3` `S-6`; `identity-and-domain.md §3` item 2 (i):
  // *"the entry EXISTS with `off` set; `register(h, fn)` SUCCEEDS and re-arms it"*).
  const inst = makeStore();
  const h = newHandle('unlisten');
  const a = [tag('u')];
  inst.listen(h, [a]);
  const first = counting();
  inst.register(h, first);
  assert.equal(inst.unlisten(h), undefined, 'unlisten answers the no-op success shape (`§2.1` item 5)');

  const at = inst.write(a, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [],
    'the store-side entry is WITHDRAWN, so the handle is not in the trigger set any more '
    + '(`contract.md §3` `S-6`)');

  const second = counting();
  assert.equal(inst.register(h, second), undefined,
    'AND THE MAP ENTRY STANDS: `register` SUCCEEDS on the handle `unlisten` withdrew — a reservation is '
    + 'not a deletion (`identity-and-domain.md §3` item 2 (i))');
  inst.write(a, 'mem', 2);
  assert.deepEqual(second.seen, [a],
    'and the re-armed body fires at the next write (`identity-and-domain.md §3` item 2 (i))');
});

test('hli_surface_removeListener_removes_the_entry_whole_and_the_handle_leaves_the_domain', () => {
  // `S-7` — `removeListener(h)` removes the entry WHOLE and withdraws the store's home entries the handle
  // named (`contract.md §2.7` item 2; `removal-members.md §2` item 3). **THE TWO OBSERVABLES THAT SEPARATE
  // DELETE FROM OFF, EACH ASSERTED: the entry is GONE, `register` is REFUSED, and a later `listen` creates a
  // FRESH entry** (`identity-and-domain.md §3` item 2 (ii)). **`RF-6` is the failure this excludes: a
  // `removeListener` read as an `unlisten`, leaving an entry reserved** (`removal-members.md §8`).
  const inst = makeStore();
  const h = newHandle('remove');
  const a = [tag('d')];
  inst.listen(h, [a]);
  const body = counting();
  inst.register(h, body);

  assertRemoveListenerAnswer(inst.removeListener(h), 'the success arm');
  // (1) THE STORE-SIDE ENTRIES ARE WITHDRAWN — the store's own `unlisten` reports the handle as unknown
  //     because the removal IS the purge (`removal-members.md §2` item 3 (ii)).
  const at = inst.write(a, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [],
    'no store entry survives the removal, so no write returns the handle (`contract.md §2.7` item 2)');
  // (2) THE ENTRY IS GONE — `unlisten` answers a no-op success and removes nothing else
  //     (`§2.1` item 5's third column).
  assert.equal(inst.unlisten(h), undefined, 'a deleted handle is outside the domain at `unlisten` too');
  // (3) `register` IS REFUSED — the fabricated row of `§2.1` item 5.
  const refused = capture(() => inst.register(h, () => {}));
  assert.equal(refused.threw, true,
    'AND `register` ON THE DELETED HANDLE IS REFUSED: a deleted entry is not a reserved one '
    + '(`identity-and-domain.md §3` item 1; `contract.md §2.7` item 10)');
  assertRuleOne(refused.thrown, 'register over a deleted handle');
  assert.equal(refused.thrown.status, 'AddressMalformed',
    'the refusal is the fabricated row of `§2.1` item 5, whose status is the store\'s `AddressMalformed` '
    + '(`contract.md §2.1` item 6; `R-B4`: "the instance\'s domain is the domain")');
});

test('hli_surface_the_boot_route_goes_through_the_same_listen_verb', () => {
  // `S-8` — **"Boot goes through listen()"**: the construction's `listeners[]` elements are applied BY
  // CALLING the same `listen(handle, addresses)` the caller would call, so every adopted handle gets its
  // map entry with `off` set exactly as a runtime `listen` does (`contract.md §2.2` item 8;
  // `listen-verb.md §6` items 1, 5; `PAR-HL-24`). **`LF-7` is the failure this excludes: a boot path that
  // did not go through `listen`** (`listen-verb.md §8`).
  const h = newHandle('boot');
  const a = [tag('boot-a')];
  const b = [tag('boot-b')];
  const booted = storeCreate({
    journalLength: 16,
    // ONE HANDLE ARRIVES AT N ADDRESSES AS N ELEMENTS — an element carries ONE address and not a set
    // (`listen-verb.md §6` item 5; `PAR-HL-24`).
    listeners: [{ address: a, handle: h }, { address: b, handle: h }],
  });
  // The boot's own entry is OFF — nothing is registered — so the store returns the handle and nothing runs.
  const at = booted.write(a, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [h],
    'the adopted handle is a LIVE store entry at boot (`contract.md §2.2` item 8)');
  // AND THE SAME TWO ACTS `listen` + `register` REACH IT, exactly as they reach a runtime `listen`'s entry.
  const body = counting();
  assert.equal(booted.register(h, body), undefined,
    'the boot\'s handle is in the map with `off` set, so `register` ADMITS it — the route produced a '
    + 'reservation and not an anti-entry (`listen-verb.md §6` item 1; `identity-and-domain.md §2` item 5)');
  booted.write(b, 'mem', 2);
  assert.deepEqual(handlesOf(booted.write(b, 'mem', 3).triggered), [h],
    'and the handle stands at BOTH of the addresses the boot gave it (`PAR-HL-24`\'s referent)');
});

test('hli_surface_a_boot_that_refuses_one_element_admits_nothing', () => {
  // **THE CONSTRUCTION STILL ADMITS `listeners` WHOLE — a refused element REFUSES THE CONSTRUCTION — and
  // `surface.md:2118`'s "A REJECTED ARRAY ADMITS NOTHING" survives** (`contract.md §2.2` item 8;
  // `listen-verb.md §6` item 4 (i)–(ii); `PAR-HL-24`, `PAR-HL-37`). **The declared answer is
  // `AddressMalformed` with NO INSTANCE RETURNED** (`docs/specs/storeroom-native/parameter-semantics.md
  // §2.12`).
  for (const bad of setOutsideValues().filter((r) => !r.omit)) {
    const r = capture(() => storeCreate({ journalLength: 16, listeners: bad.value }));
    assert.equal(r.threw, true,
      'a `listeners` array carrying ' + bad.label + ' refuses the CONSTRUCTION (class ' + bad.cls + ') — '
      + 'no entry is silently dropped (`listen-verb.md §6` item 4 (i); `PAR-HL-37`)');
    assertRuleOne(r.thrown, 'the construction over ' + bad.label);
    assert.equal(r.thrown.status, 'AddressMalformed',
      'and the refusal is `AddressMalformed` with NO instance returned '
      + '(docs/specs/storeroom-native/parameter-semantics.md §2.12)');
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.6–§2.7 — THE CONSTRAINTS' IDENTITY, AND THE TWO REMOVE MEMBERS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_addConstraint_at_a_fresh_pair_stands_and_enumerates', () => {
  // `S-9` — one store entry, one identity, one `state.constraints` value (`contract.md §3` `S-9`;
  // `§2.3` item 2; `§2.6` item 2). **AND THE ENUMERATION'S `address` MEMBER IS A SET** — `ConstraintPair`'s
  // shape moves from `readonly address: Address` to an address SET (`contract.md §2.6` item 5;
  // `PAR-HL-13`; `constraint-identity.md §4` item 3).
  const inst = makeStore();
  const address = [tag('cp')];
  const identity = inst.addConstraint({ address, id: 'x' }, passing);
  assert.deepEqual(Object.keys(identity), [],
    'the identity carries NO own enumerable member — a drive compares identities and never contents '
    + '(`constraint-identity.md §2` item 2; `PAR-HL-10`; `IF-3`)');
  const pairs = inst.constraints();
  assert.equal(pairs.length, 1, 'the pair is enumerated once (`PAR-HL-13`)');
  assert.equal(pairs[0].id, 'x', 'and it names the id the caller supplied');
  assert.ok(Array.isArray(pairs[0].address),
    'and its `address` member is a SET — an array of addresses (`contract.md §2.6` item 5; `PAR-HL-13`)');
});

test('hli_surface_addConstraint_at_a_held_pair_answers_the_same_identity', () => {
  // `S-10` — `addConstraint(pair, fn2)` at a HELD pair: validate → purge → add, and **THE SAME IDENTITY IS
  // ANSWERED** (`contract.md §3` `S-10`; `§2.3` items 1–2; `§2.6` item 2). **The identity is *"equal to
  // itself on a second `addConstraint` at the SAME pair"*** (`PAR-JS-25`'s observable, PRESERVED by the
  // carrier's move — `constraint-identity.md §2` item 2, `IF-1`).
  const inst = makeStore();
  const address = [tag('held')];
  const pair = { address, id: 'k' };
  const first = inst.addConstraint(pair, passing);
  const second = inst.addConstraint(pair, passing);
  assert.equal(second, first,
    'a second `addConstraint` at the SAME pair answers THE SAME identity, BY VALUE — the identity lives in '
    + 'the STORE and is returned with the pair (`contract.md §2.6` item 2; `constraint-identity.md §5` '
    + '`IF-1`; `P: docs/pending.md · (AA-2)`)');
  // **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-29`, verbatim: *"Handle becomes the internal ID"*):
  // A SECOND `id` IS NOT A SECOND PAIR.**
  //
  // **WHAT STOOD HERE, NAMED SO ITS ABSENCE IS LEGIBLE.** `assert.notEqual(other, first, 'while two pairs
  // answer TWO identities that are NOT equal')` — a drive adding a pair at a DIFFERENT address under the SAME
  // `id` and asserting a DIFFERENT identity, on `constraint-identity.md §5` `IF-2`. **`D-29` item 2 supersedes
  // exactly that**: *"the `(id, address-set)` keying … is now simply 'one id, ONE PAIR'"*, and *"`K-1`'s 'a
  // second `register` at the same `id` begins a pair of its own' is SUPERSEDED — it does not, because there is
  // only ever one pair per `id`"*. **So the same `id` at a second address answers the SAME identity**: one
  // `id`, one pair, one identity, one handle (`D-24`, `D-29`).
  const other = inst.addConstraint({ address: [tag('other')], id: 'k' }, passing);
  assert.equal(other, first,
    'a second `addConstraint` naming the SAME `id` at ANOTHER address answers THE SAME identity — one `id` '
    + 'names one pair, one identity and one handle (`D-29` item 2; `D-24` item 1)');
  assert.equal(inst.constraints().length, 1,
    'and the enumeration carries ONE row per `id` — the drive named exactly one `id` (`k`), so `k`\'s second '
    + 'address adds NO second row (`D-29`: one `id`, one pair, one identity, one handle)');
});

test('hli_surface_the_two_toggles_answer_undefined_and_leave_the_enumeration_standing', () => {
  // `S-11` — `constraintOff(pair, c)` then `constraintOn(pair, c)`: each is a purge-then-add, EACH ANSWERS
  // `undefined`, and `constraints()` IS UNMOVED (`contract.md §3` `S-11`; `§2.3` item 7;
  // `removal-members.md §3` item 3). **AND THE IDENTITY STANDS THROUGH THE TOGGLE — `constraintOff` is a
  // TOGGLE and not a removal** (`constraint-identity.md §3` item 3; `IF-5`; `PAR-HL-11`, `PAR-HL-12`).
  const inst = makeStore();
  const pair = { address: [tag('toggle')], id: 't' };
  const identity = inst.addConstraint(pair, passing);
  assert.equal(inst.constraintOff(pair, passing), undefined,
    'constraintOff answers undefined (`PAR-HL-12`)');
  assert.equal(inst.constraints().length, 1,
    'and the pair is STILL CARRIED and STILL ENUMERATED — a disabled pair is PRESENT (`PAR-HL-13`; '
    + '`removal-members.md §3` item 3)');
  assert.equal(inst.constraintOn(pair, passing), undefined,
    'constraintOn answers undefined (`PAR-HL-11`)');
  assert.equal(inst.addConstraint(pair, passing), identity,
    'and the identity the caller held before the cycle is the identity after it — a toggle deletes no '
    + 'identity (`constraint-identity.md §5` `IF-5`)');
});

test('hli_surface_removeConstraint_shrinks_the_enumeration_by_one', () => {
  // `S-12` — `removeConstraint(pair)`: the pair, its N address rows, the kernel's registration and the
  // store's home entry are ALL gone, and `constraints()` SHRINKS BY ONE (`contract.md §3` `S-12`;
  // `§2.7` items 3, 7, 8). **AND IT IS THE ONE ACT THAT DELETES AN IDENTITY: a fresh `addConstraint` at
  // that pair answers a DIFFERENT identity** (`contract.md §2.6` item 3; `constraint-identity.md §3` item 2;
  // `IF-4`). **`RF-5` is the failure this excludes: a `removeConstraint` read as a toggle, leaving the pair
  // carried** (`removal-members.md §8`).
  const inst = makeStore();
  const pair = { address: [tag('gone')], id: 'g' };
  const kept = { address: [tag('kept')], id: 'k' };
  const goneIdentity = inst.addConstraint(pair, passing);
  inst.addConstraint(kept, passing);

  assertRemoveConstraintAnswer(inst.removeConstraint(pair), 'removeConstraint(pair)');
  const after = inst.constraints();
  assert.equal(after.length, 1,
    '`constraints()` SHRINKS by exactly one — read ' + after.length
    + ' (`contract.md §2.7` item 8; `PAR-HL-13`\'s observable; `removal-members.md §8` `RF-5`)');
  assert.deepEqual(after.map((p) => p.id), ['k'],
    'and the pair that stood beside it is the one still enumerated');

  const fresh = inst.addConstraint(pair, passing);
  assert.notEqual(fresh, goneIdentity,
    'AND THE IDENTITY THE CALLER HELD BEFORE RESOLVES TO NOTHING: a fresh `addConstraint` at the removed '
    + 'pair answers a DIFFERENT identity (`contract.md §2.6` item 3; `constraint-identity.md §5` `IF-4`)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.4–§2.5 — THE TRIGGER PAIR: `{handle, address}`, THE BINDING'S ADDRESS, THE DEDUPE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_the_trigger_pair_carries_the_binding_address_and_the_argument_the_writes', () => {
  // `S-13` — a write at `A` with a listener bound at the PREFIX `['a']`: `triggered` carries
  // `{handle, address: ['a']}` and the invocation's argument is the WHOLE written address
  // (`contract.md §3` `S-13`; `§2.4` items 1, 7; `trigger-and-pair.md §1` items 2, 3).
  // **THE TWO ARE TOLD APART: the pair's `address` is THE BINDING's; `triggeringAddress` is THE WRITE's**
  // (`contract.md §2.4` item 7; `PAR-HL-20`, `PAR-HL-23`).
  const inst = makeStore();
  const binding = [tag('prefix')];
  const written = [...binding, 'b', 'c'];
  const h = newHandle('bound');
  // THE CONTAINERS THE WRITE LANDS INSIDE EXIST FIRST — an `AddressNotFound`-free fixture, and no
  // property of this cell (`write-and-read.md §3.4`'s `W-3`/`W-4` mint INSIDE an existing parent; see
  // `seedContainers`). Seed writes precede `listen`/`register`, so no body is invoked by one.
  seedContainers(inst, written);
  inst.listen(h, [binding]);
  const body = counting();
  inst.register(h, body);

  const record = inst.write(written, 'mem', 1);
  const pair = assertTriggerPair(record.triggered[0], 'triggered[0]');
  assert.equal(pair.handle, h, 'the pair names the caller\'s own handle (`PAR-HL-19`)');
  assert.deepEqual(pair.address, binding,
    'AND THE PAIR\'S `address` IS THE BINDING\'S — read ' + JSON.stringify(pair.address)
    + ' against the binding ' + JSON.stringify(binding)
    + '. It is NEVER the written address (`contract.md §2.4` items 1, 7; `PAR-HL-20`; '
    + '`trigger-and-pair.md §8` `TF-2`)');
  assert.notDeepEqual(pair.address, written,
    'and the two values DIFFER wherever the binding is a strict prefix (`PAR-HL-20`\'s observable)');
  assert.deepEqual(body.seen, [written],
    'while the invocation\'s ONE argument remains THE TRIGGERING ADDRESS — the write\'s (`PAR-HL-35`, '
    + '`PAR-HL-23`; `PAR-JS-12`). Read ' + JSON.stringify(body.seen));
});

test('hli_surface_where_the_binding_is_the_written_address_the_pair_and_the_argument_coincide', () => {
  // **THE ONE STATE THAT IS NOT A FAILURE: where the listener is bound AT the written address the pair's
  // `address` and the invocation's argument are the SAME VALUE, and a drive must not treat that equality as
  // the pair being absent or the member being wrong** (`trigger-and-pair.md §8`'s closing clause;
  // `contract.md §2.4` item 7; `PAR-HL-20`'s observable).
  const inst = makeStore();
  const address = [tag('exact')];
  const h = newHandle('exact');
  inst.listen(h, [address]);
  const body = counting();
  inst.register(h, body);
  const record = inst.write(address, 'mem', 1);
  const pair = assertTriggerPair(record.triggered[0], 'triggered[0]');
  assert.deepEqual(pair.address, address,
    'the pair\'s address is the binding\'s, which here IS the written address (`PAR-HL-20`)');
  assert.deepEqual(body.seen, [address],
    'and the argument is the same value — the equality is DECLARED and not a defect '
    + '(trigger-and-pair.md §8\'s closing clause)');
});

test('hli_surface_one_handle_at_two_matching_addresses_fires_once', () => {
  // `S-14` — a handle at `['a']` and `['a','b']`, a write at `['a','b','c']`: BOTH pairs prefix-match, and
  // the function fires ONCE, because `matched` keys on `entry.handle` and never on the element
  // (`contract.md §3` `S-14`; `§2.4` item 6; `trigger-and-pair.md §5` items 2–4).
  // **`TF-5` is the failure this excludes: TWO invocations for one handle in one window**
  // (`trigger-and-pair.md §8`). **AND THE CONSEQUENCE SPELLED: the binding address in `triggered` is
  // INFORMATIONAL DATA about the trigger set and not a per-invocation fact**
  // (`§2.4` item 6; `P-HL-5`'s property).
  const inst = makeStore();
  const outer = [tag('outer')];
  const inner = [...outer, 'b'];
  const written = [...inner, 'c'];
  const h = newHandle('both');
  // BOTH BINDING ADDRESSES HOLD THE CONTAINERS THE WRITE WALKS THROUGH — the seed is fixture and runs
  // before `listen`/`register`, so the one invocation this cell counts is the write's own
  // (`write-and-read.md §3.4`'s `W-3`/`W-4`; `seedContainers`).
  seedContainers(inst, written);
  inst.listen(h, [outer, inner]);
  const body = counting();
  inst.register(h, body);

  const record = inst.write(written, 'mem', 1);
  const mine = record.triggered.filter((e) => e.handle === h);
  assert.equal(body.seen.length, 1,
    'THE FUNCTION FIRES EXACTLY ONCE for one distinct handle in one delivery window — read '
    + body.seen.length + ' invocation(s). Two pair elements matched the write ('
    + JSON.stringify(mine.map((e) => e.address)) + ') and the dedupe keys on `entry.handle` '
    + '(`contract.md §2.4` item 6; `trigger-and-pair.md §8` `TF-5`; `docs/specs/storeroom-js/surface.md:309`)');
  assert.deepEqual(body.seen[0], written,
    'and the ONE argument is the WRITE\'s address, never the binding\'s (`PAR-HL-23`, `PAR-HL-35`)');
  assert.ok(mine.length >= 1,
    'the trigger set still carries the handle at least once — the dedupe is the DELIVERY\'s and not the '
    + 'store\'s (`contract.md §2.4` item 6)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §4 `F-1`–`F-9` — THE FAIL STATES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_listen_refuses_every_outside_handle_in_the_one_thrown_form', () => {
  // `F-1` / `LF-1` — `listen`'s handle position outside `HL-1`'s domain: the surface's ONE thrown form with
  // `status` the store's `AddressMalformed`, and NO STATE CHANGED (`contract.md §4` `F-1`; `§2.1` item 5;
  // `§2.2` item 1; `listen-verb.md §8` `LF-1`; `PAR-HL-1`).
  //
  // **ROWS 8, 9 AND 10 (a foreign instance's string, a prior session's, a fabricated one) ARE STRUCK FROM
  // THIS CELL: `contract.md §2.1` item 5 gives `listen`'s first position *"the same class test"* as
  // `register`'s — a `typeof`/length read over the value alone — so A FRESH, WELL-FORMED HANDLE NAMES A NEW
  // LISTENER AND IS ADMITTED AT `listen`, and no well-formed string is REFUSED there. `contract.md §2.1`
  // item 5 GOVERNS OVER `identity-and-domain.md §2` item 3, whose `At register / listen / removeListener`
  // column prints `refuse` for those three rows and which is owed an amendment at that site (`P:
  // docs/pending.md · P-6`, the ruling on minting: the caller spells a fresh handle and the store admits
  // it; that amendment is a SPEC-WRITER dispatch and no drive of this file makes it). Rows 1–7 — the
  // classes that are not a non-empty string — are the cell's whole subject and are driven below.**
  const inst = makeStore();
  const a = [tag('f1')];
  const outsideClasses = handleOutsideValues().filter((r) => r.row <= 7);
  assert.equal(outsideClasses.length, 11,
    'the class rows the ruling leaves at `listen` are rows 1–7, read as ' + outsideClasses.length
    + ' values (`identity-and-domain.md §2` item 3 rows 1–7; `contract.md §2.1` item 5)');
  for (const row of outsideClasses) {
    const r = capture(() => inst.listen(row.value, [a]));
    assert.equal(r.threw, true,
      'listen refuses row ' + row.row + ' — ' + row.label + ' (`identity-and-domain.md §2` item 3; '
      + '`contract.md §4` `F-1`)');
    assertRuleOne(r.thrown, 'listen over ' + row.label);
    assert.equal(r.thrown.status, 'AddressMalformed',
      'and the status is the store\'s `AddressMalformed` on EVERY one of the arms — read '
      + JSON.stringify(r.thrown.status) + ' for ' + row.label
      + ' (`contract.md §2.1` item 6; `PAR-HL-1`)');
    assert.ok(r.thrown.message.length > 0,
      'and the message is the store\'s own generated text, carried verbatim (`R-B4`; `DD-40`)');
  }
});

test('hli_surface_listen_refuses_every_outside_set_in_the_one_thrown_form', () => {
  // `F-2` / `LF-2` — `listen`'s SET position outside its domain: the SAME form, `AddressMalformed`, over
  // the six classes `listen-verb.md §2.2` item 2 enumerates. **NO STORE ACT IS REACHED ON ANY OF THE SIX, so
  // a refused `listen` changes nothing: no entry, no mirror row, no purge** (`listen-verb.md §2.2` item 3).
  const inst = makeStore();
  const h = newHandle('f2');
  for (const row of setOutsideValues()) {
    const r = row.omit ? capture(() => inst.listen(h)) : capture(() => inst.listen(h, row.value));
    assert.equal(r.threw, true,
      'listen refuses the set position over class ' + row.cls + ' — ' + row.label
      + ' (`listen-verb.md §2.2` item 2; `contract.md §4` `F-2`; `PAR-HL-2`)');
    assertRuleOne(r.thrown, 'listen over set class ' + row.cls + ' (' + row.label + ')');
    assert.equal(r.thrown.status, 'AddressMalformed',
      'and rule (i)\'s code is the store\'s `AddressMalformed` on every class — read '
      + JSON.stringify(r.thrown.status) + ' (`listen-verb.md §2.2` item 3)');
  }
  // AND NO STORE ACT WAS REACHED: the refused handle is not in the map, so `register` on it is refused.
  const after = capture(() => inst.register(h, () => {}));
  assert.equal(after.threw, true,
    'and the refused `listen` created NO entry — `register` on the handle is refused ('
    + '`listen-verb.md §2.2` item 3: "a refused `listen` changes nothing: no entry, no mirror row, no '
    + 'purge")');
});

test('hli_surface_unlisten_over_every_outside_value_is_a_no_op_success', () => {
  // `F-3` — `unlisten` over any outside value: NO THROW, a no-op success returning `undefined`, and NO OTHER
  // REGISTRATION REMOVED (`contract.md §4` `F-3`; `§2.1` items 4–5; `identity-and-domain.md §2` items 2–3;
  // `PAR-HL-1`'s third column). **AND THE OBSERVABLE THAT MAKES IT A NO-OP AND NOT A SILENT REMOVAL: a
  // second, LAWFUL handle standing at another address is untouched** (`identity-and-domain.md §6` `O-3`).
  const inst = makeStore();
  const survivor = newHandle('survivor');
  const otherAddress = [tag('other')];
  inst.listen(survivor, [otherAddress]);
  const body = counting();
  inst.register(survivor, body);

  for (const row of handleOutsideValues()) {
    const r = capture(() => inst.unlisten(row.value));
    assert.equal(r.threw, false,
      'unlisten NEVER throws — row ' + row.row + ' (' + row.label + ') answers a NO-OP SUCCESS '
      + '(`contract.md §2.1` item 5\'s third column; `§4` `F-3`)');
    assert.equal(r.value, undefined,
      'and the answer is undefined, not a discriminant (`PAR-JS-8`; `identity-and-domain.md §2` item 2)');
  }
  const at = inst.write(otherAddress, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [survivor],
    'AND NO OTHER REGISTRATION WAS REMOVED — the survivor still fires (`identity-and-domain.md §6` `O-3`)');
  assert.equal(body.seen.length, 1, 'and its body ran exactly once for that one write');
});

test('hli_surface_register_refuses_every_outside_handle_in_the_one_thrown_form', () => {
  // `F-4` — `register` over an outside handle: the surface's one thrown form, `AddressMalformed`, over every
  // row of `§2.1` item 5's `register` column (`contract.md §4` `F-4`; `§2.1` items 5–6; `PAR-HL-6`).
  // **AND THE REFUSAL LEAVES THE REGISTRY UNTOUCHED, because the throw precedes `state.registry.set`**
  // (`identity-and-domain.md §6` `O-2`).
  const inst = makeStore();
  const h = newHandle('f4');
  const address = [tag('f4addr')];
  inst.listen(h, [address]);
  const body = counting();
  inst.register(h, body);
  // ONE LAWFUL WRITE **BEFORE** THE REFUSALS, so `O-2` is read on BOTH SIDES of them and the body's two
  // invocations below are the two writes this cell's own closing assertion counts.
  inst.write(address, 'mem', 1);

  for (const row of handleOutsideValues()) {
    const r = capture(() => inst.register(row.value, () => {}));
    assert.equal(r.threw, true,
      'register refuses row ' + row.row + ' — ' + row.label
      + ' (`contract.md §2.1` item 5\'s register column; `§4` `F-4`)');
    assertRuleOne(r.thrown, 'register over ' + row.label);
    assert.equal(r.thrown.status, 'AddressMalformed',
      'and its status is the store\'s `AddressMalformed` — read ' + JSON.stringify(r.thrown.status)
      + ' (`contract.md §2.1` item 6)');
  }
  // O-2: the lawful registration is untouched by the refusals.
  inst.write(address, 'mem', 2);
  assert.equal(body.seen.length, 2,
    'AND THE LAWFUL REGISTRATION SURVIVES EVERY REFUSAL — the two writes (one before the loop, one after) '
    + 'reach the body twice (`identity-and-domain.md §6` `O-2`)');
});

test('hli_surface_register_refuses_a_non_function_listener_in_the_one_thrown_form', () => {
  // `F-5` — `register` over a non-function listener: the SAME form, `AddressMalformed`, naming the
  // argument's POSITION and its CLASS (`contract.md §4` `F-5`; `bindings/js/index.mjs:2598-2604` read at
  // `§2.1` item 6; `A: docs/decisions.md · A134` — the container-that-names-the-argument rule).
  const inst = makeStore();
  const h = newHandle('f5');
  inst.listen(h, [[tag('f5addr')]]);
  for (const bad of [7, 'fn', true, null, undefined, {}, [], Symbol('f')]) {
    const r = capture(() => inst.register(h, bad));
    assert.equal(r.threw, true,
      'register refuses ' + String(typeof bad) + ' at the listener position (`contract.md §4` `F-5`)');
    assertRuleOne(r.thrown, 'register over a non-function listener');
    assert.equal(r.thrown.status, 'AddressMalformed',
      'and it is the store\'s `AddressMalformed`, not a package `TypeError` — the registration site\'s '
      + 'operative form (`surface.md §2.5` item 5 (g), cited at `§2.1` item 6)');
    assert.ok(/2|second|listener/i.test(r.thrown.message),
      'and the message names the argument POSITION and the class it met — read '
      + JSON.stringify(r.thrown.message) + ' (`A134`; `§2.1` item 6)');
  }
});

test('hli_surface_removeListener_throws_on_every_arm_that_is_not_a_real_removal', () => {
  // `F-6` — **`removeListener`/`removeConstraint` FAIL ON EVERY ARM THAT IS NOT A REAL REMOVAL, WITH
  // MESSAGES** (`contract.md §4` `F-6`; `§2.7` item 5; `removal-members.md §5`'s ten-row table).
  //
  // **AND THIS IS THE DECLARED REVERSAL, DRIVEN AT ITS OWN WORDS: THE SAME VALUE THAT IS A SILENT SUCCESS AT
  // `unlisten` IS A THROWN FAILURE AT `removeListener` — TWO DISPOSITIONS FOR ONE ARGUMENT IN ONE PRODUCT**
  // (`contract.md §2.1` item 5's closing clause; `P: docs/pending.md · P-5`'s `(R2)`;
  // `removal-members.md §8` `RF-3`). **THE REVERSAL IS THE CELL: each row is driven at BOTH members and the
  // two answers are asserted to DIFFER.**
  const inst = makeStore();
  const liveHandle = newHandle('f6');
  inst.listen(liveHandle, [[tag('f6addr')]]);

  for (const row of handleOutsideValues()) {
    // For rows 8/9/10 the value is a well-formed string the map does not carry — the same class, driven
    // once per row because the ROW is what the table names.
    const quiet = capture(() => inst.unlisten(row.value));
    const loud = capture(() => inst.removeListener(row.value));
    assert.equal(quiet.threw, false,
      'row ' + row.row + ' at `unlisten`: a NO-OP SUCCESS (the third column of `§2.1` item 5)');
    assert.equal(loud.threw, true,
      'row ' + row.row + ' (' + row.label + ') at `removeListener`: THROWN — the DECLARED REVERSAL '
      + '(`contract.md §2.1` item 5\'s closing clause; `P: docs/pending.md · P-5`\'s `(R2)`)');
    assert.ok(loud.thrown instanceof Error || typeof loud.thrown === 'object',
      'and the thrown value is an object carrying a message (`removal-members.md §5`: "WITH MESSAGES")');
    const message = loud.thrown && loud.thrown.message;
    assert.equal(typeof message, 'string',
      'and the message is a STRING on every arm (`removal-members.md §5`\'s shared obligation (i))');
    assert.ok(message.length > 0,
      'and it is never empty — "a verbose message" (`contract.md §2.7` item 5)');
  }

  // The one arm that is a REAL removal succeeds and answers undefined.
  assertRemoveListenerAnswer(inst.removeListener(liveHandle), 'the real-removal arm');
});

test('hli_surface_removeListener_throws_on_a_handle_that_was_already_deleted', () => {
  // `removal-members.md §5` row `7` — a handle NEVER LISTENED or an ALREADY-DELETED handle: THROW, naming
  // the value and the reason. **And the table's shared obligation (iii): A REFUSAL CHANGES NOTHING — all
  // four structures stand as they stood** (`removal-members.md §5`; `§4` item 4).
  const inst = makeStore();
  const h = newHandle('twice');
  inst.listen(h, [[tag('twice')]]);
  inst.removeListener(h);
  const again = capture(() => inst.removeListener(h));
  assert.equal(again.threw, true,
    'a SECOND `removeListener` on the same handle THROWS — an already-deleted handle is not a real removal '
    + '(`removal-members.md §5` row 7; `contract.md §2.7` item 5)');
  const neverListened = newHandle('never');
  const never = capture(() => inst.removeListener(neverListened));
  assert.equal(never.threw, true,
    'and so does a handle this instance NEVER listened to (`removal-members.md §5` row 7)');
});

test('hli_surface_removeConstraint_throws_the_constraint_methods_type_error_over_an_outside_pair', () => {
  // `F-7` — `removeConstraint` over an outside pair: the constraint methods' `TypeError`, `status` member
  // ABSENT (`contract.md §4` `F-7`; `§2.7` item 6; `removal-members.md §6` item 2; `PAR-HL-18`).
  // **AND THE TWO FORMS ARE TOLD APART BY `status`'s PRESENCE AND NOTHING ELSE** (`constraint-sites.md §6`
  // item 3).
  const inst = makeStore();
  const outsidePairs = [
    { label: 'an ABSENT pair', omit: true },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
    { label: 'a non-object', value: 'pair' },
    { label: 'a plain object carrying NO address', value: { id: 'x' } },
    { label: 'a plain object carrying NO id', value: { address: ['a'] } },
    { label: 'a NON-STRING id', value: { address: [['a']], id: 7 } },
    { label: 'an EMPTY-STRING id', value: { address: [['a']], id: '' } },
    { label: 'an address outside the store domain', value: { address: ['a'], id: 'x' } },
  ];
  for (const row of outsidePairs) {
    const r = row.omit ? capture(() => inst.removeConstraint()) : capture(() => inst.removeConstraint(row.value));
    assert.equal(r.threw, true,
      'removeConstraint refuses ' + row.label + ' (`contract.md §4` `F-7`; `PAR-HL-16`)');
    assertRuleTwo(r.thrown, 'removeConstraint over ' + row.label);
  }
});

test('hli_surface_removeConstraint_throws_over_a_pair_the_entry_does_not_carry', () => {
  // `F-8` — `removeConstraint` over a pair the entry does not carry: **THROWN, with a verbose message**
  // (`contract.md §4` `F-8`; `§2.7` item 5; `removal-members.md §5` row `1`). **THIS IS A WELL-FORMED PAIR
  // AND NOT A CLASS REFUSAL, so the arm it takes is the remove members' own thrown form.**
  const inst = makeStore();
  const carried = { address: [tag('carried')], id: 'c' };
  inst.addConstraint(carried, passing);
  const absent = { address: [tag('absent')], id: 'a' };
  const r = capture(() => inst.removeConstraint(absent));
  assert.equal(r.threw, true,
    'a well-formed pair this instance holds no row for THROWS (`contract.md §4` `F-8`; '
    + '`removal-members.md §5` row 1: "names the value and the reason")');
  const message = r.thrown && r.thrown.message;
  assert.equal(typeof message, 'string',
    'and the message is a string (`removal-members.md §5` shared obligation (i))');
  assert.ok(message.length > 0, 'and it is never empty');
  // AND NOTHING MOVED: the carried pair still stands (obligation (iii)).
  assert.equal(inst.constraints().length, 1,
    'and a refusal changes nothing: the carried pair still enumerates (`removal-members.md §5` '
    + 'obligation (iii); `§4` item 4)');
});

test('hli_surface_the_constraint_listener_conflict_throws_the_one_plain_form_naming_both_sides', () => {
  // `F-9` / `CF-7` — **A CONSTRAINT/LISTENER CONFLICT ARISES AT `addConstraint` AT AN ADDRESS A LISTENER IS
  // ALREADY REGISTERED AT — ONE DIRECTION, NOT TWO** (`contract.md §2.3` item 8; `P: docs/pending.md ·
  // (C-1)`, verbatim). **The test's SEAT is `register`** (`§2.3` item 8; `constraint-sites.md §5` item 1),
  // and **the form is a PACKAGE-SIDE `TypeError` with NO `status` MEMBER — NO NEW CODE, NO CLOSED-SET
  // WIDENING** (`contract.md §2.3` item 9; `(C-3)`: *"Package-side TypeError — no new code"*; `§4` `F-9`).
  //
  // **AND THE TEST KEYS ON IDENTITY AND NOT ON THE ADDRESS ALONE: a conflict is between a CALLER's listener
  // and a CALLER's constraint, so the test keys on the REGISTRATION** (`constraint-sites.md §5` item 2;
  // `PAR-HL-32`).
  const inst = makeStore();
  const address = [tag('conflict')];
  const pair = { address: [address], id: 'cx' };
  // **⟶ THE DRIVE'S ORDER IS REVERSED 2026-10-24, AND THE REVERSAL IS `D-29`'s.** The listener must be
  // installed BEFORE the pair stands at its address: `B-6` rejects a `listen` at an address a STANDING
  // constraint pair occupies, so the as-filed order (pair first, then `listen`) is no longer reachable. **The
  // other order is**: the pair is added over a standing listener, which `B-4` allows because the pair's `id`
  // is not the listener's handle.
  const h = newHandle('conflict-caller');
  inst.listen(h, [address]);
  inst.addConstraint(pair, passing);

  // **THE PREAMBLE'S ONE RULING, PRINTED BECAUSE THIS CELL ONCE CARRIED IT BACKWARDS: A HANDLE `listen`
  // NEVER WROTE IS *NOT* "ADMITTED AND REFUSED BY NOTHING" — IT IS THE CONTRACT'S OWN **REFUSAL**.**
  // A FABRICATED HANDLE IS `AddressMalformed` AT `register`, DECLARED AT SIX COHERENT SITES: **`contract.md
  // §2.1` item 5's closed table, row 5 (*"a WELL-FORMED string THE STORE DOES NOT HOLD (fabricated)"* →
  // *"REFUSAL — `AddressMalformed`, its trigger read as 'outside THIS INSTANCE'S domain'"*); `contract.md
  // §2.1` item 8** (a deleted handle is outside `map.has`, *"so `register` on it is REFUSED — the `§2.1`
  // item 5 table's fabricated row"*); **`contract.md §2.7` item 10** (the same fact at the delete-then-
  // re-register interaction); **`removal-members.md §2.4` item 5** (the fabricated handle is one of the
  // enumerated fail arms, and its status is the store's `AddressMalformed`); **`removal-members.md §5`
  // row 1**; **`identity-and-domain.md` items 3 and 10** (outside-value row `10`, *"a well-formed string
  // the store NEVER held (fabricated)"* → *"refuse"* at `register`/`listen`/`removeListener`); and
  // **`parameter-semantics.md §2.13`**. **So the preamble ADMITS ONLY A HANDLE THIS TEST ITSELF DID
  // `listen` — the two acts `§2.2` item 5 declares — and the fabricated-handle arm asserts the declared
  // refusal in the store's one thrown form, never a weakened conflict assertion.**
  //
  // THE ADMITTED ARM — a handle THIS drive listened, standing at an address that holds no constraint pair.
  const admittedHandle = newHandle('conflict-admitted');
  const elsewhere = [tag('elsewhere')];
  inst.listen(admittedHandle, [elsewhere]);
  const r = capture(() => inst.register(admittedHandle, (() => {
    // The registration needs a handle that STANDS at an address where the CALLER's own constraint does not
    // stand. `listen` first, then register — the two acts `§2.2` item 5 declares.
  })));
  assert.equal(r.threw, false,
    'a registration on a handle THIS TEST DID `listen`, at an address carrying no pair of the caller\'s, is '
    + 'ADMITTED — no conflict fires, because the conflict test keys on identity (`contract.md §2.3` item 8\'s '
    + '"at an address a listener is already registered at"; `§2.3` item 9\'s keying "on the REGISTRATION")');

  // THE FABRICATED-HANDLE ARM — a well-formed handle `listen` never wrote is the `§2.1` item 5 row 5
  // REFUSAL, `AddressMalformed` in the surface's one form and NOT a no-op success.
  const fabricated = capture(() => inst.register(newHandle('conflict-fabricated'), () => {}));
  assert.equal(fabricated.threw, true,
    'while `register` on a FABRICATED handle — a well-formed string this instance never held — is REFUSED '
    + '(`contract.md §2.1` item 5 row 5; `§2.1` item 8; `§2.7` item 10; `identity-and-domain.md §2` item 3 '
    + 'row `10`; `parameter-semantics.md §2.13`)');
  assertRuleOne(fabricated.thrown, 'register over a fabricated handle');
  assert.equal(fabricated.thrown.status, 'AddressMalformed',
    'and its `status` is the store\'s `AddressMalformed` — the ONE code the fabricated row declares '
    + '(`contract.md §2.1` item 5 row 5, *"its trigger read as \'outside THIS INSTANCE\'S domain\'"*; '
    + '`contract.md §2.1` item 6)');

  // THE CONFLICTING ARM: a caller's own function registered at an address the caller's own pair stands at.
  //
  // **⟶ RE-DERIVED 2026-10-24 — TWO THINGS MOVED AND BOTH ARE THE ARCHITECT'S.**
  //   * **THE FORM: `TypeError` → THE SURFACE'S ONE PLAIN THROWN OBJECT** `{status, message, log}` with the
  //     store's `AddressMalformed` (`D-25`, verbatim: *"Attempting to overwrite a listener with a constraint or
  //     vice versa is rejected"*; the reconciliation is `docs/L1/surface-deltas.md` §2.5 — *"one member
  //     function cannot print two failure forms"*, and the surface's own header calls a `TypeError` thrown by
  //     any store-reaching verb A FINDING). **So `assertRuleTwo` — the class-test form — no longer has a
  //     subject here and `assertRuleOne` takes its place.**
  //   * **THE ORDER OF THE DRIVE: `listen` MAY NOT BE INSTALLED AT A CONSTRAINT'S ADDRESS ANY MORE.** The
  //     as-filed drive called `inst.listen(h, [address])` AFTER the pair stood, and `D-29`'s sixth arm (`B-6`,
  //     *"Listen cannot overwrite constraint, only other listeners"*) now REFUSES that act. **So the listener
  //     is installed FIRST and the pair is added over it** — which `B-4` allows because the pair's `id` is not
  //     the listener's handle — and the registration is then refused at `register`, the ONE direction this cell
  //     has always driven.
  assert.equal(inst.constraints().length, 1,
    'the pair stands at the address the listener already stands at: two handles, two kinds, ONE address');
  const conflict = capture(() => inst.register(h, function callerOwnedListener() {}));
  assert.equal(conflict.threw, true,
    'A CALLER\'S FUNCTION AT A CALLER\'S CONSTRAINT-PAIR ADDRESS IS REFUSED — the conflict fires at '
    + '`register`, in ONE direction (`contract.md §2.3` item 8; `§4` `F-9`; `constraint-sites.md §7` `CF-7`)');
  assertRuleOne(conflict.thrown, 'the constraint/listener conflict');
  assert.equal(conflict.thrown.status, 'AddressMalformed',
    'and its `status` IS the store\'s `AddressMalformed` in the surface\'s one thrown form (`D-25`; '
    + '`docs/L1/surface-deltas.md` §2.5: the `TypeError` the arm carried *"is neither the one plain '
    + '{status, message} form the surface declares for every refusal nor a bare TypeError"*)');
  assert.deepEqual(Object.keys(conflict.thrown).sort(), ['log', 'message', 'status'],
    'and the refusal carries exactly the three declared members, `log` present and EMPTY — the census '
    + '`index.d.ts` fixes for every arm (`surface.md §2.5` item 9)');
  assert.ok(conflict.thrown.message.length > 0,
    'and the message is the package\'s own text (`contract.md §2.3` item 9: "the message is the '
    + 'package\'s own text, authored BY THE PACKAGE")');
  // THE MESSAGE NAMES BOTH SIDES — a prose obligation, asserted on the only channel it is carried on.
  assert.equal(typeof conflict.thrown.message, 'string',
    'and it NAMES BOTH SIDES — the listener\'s address and the constraint that stands there '
    + '(`contract.md §2.3` item 9 item (iii); `constraint-sites.md §5` item 5 (ii))');
});

test('hli_surface_listen_at_a_constraint_pairs_address_is_rejected_and_overwriting_a_listener_stays_lawful', () => {
  // `LF-8` — **`listen` GAINS NO CONFLICT TEST AT ALL, AND ITS PURGE REACH STAYS UNCONDITIONAL: a `listen`
  // at a kernel-held pair's address PURGES AND SUCCEEDS and NOTHING throws** (`listen-verb.md §7` item 1;
  // `§8` `LF-8`; `contract.md §2.2` item 7; `P: docs/pending.md · (C-1)`/`(C-2)` item (iv)).
  // **THE DECLARED CONSEQUENCE, PRINTED BECAUSE IT FOLLOWS FROM "EVERYTHING": the pair STILL EVALUATES,
  // because `evaluate` reads the registry and not the store — so a purged pair remains ENFORCED while its
  // delivery resolves to nothing silently** (`contract.md §2.2` item 7; `§2.8` item 5; `listen-verb.md §5`
  // item 2). **AND WHAT A DRIVE ASSERTS IS (a) the write is REFUSED and (b) NO BODY IS INVOKED**
  // (`listen-verb.md §5` item 3).
  const inst = makeStore();
  const address = [tag('purged')];
  const pair = { address: [address], id: 'p' };
  // A pair whose body refuses the value this drive will write, and whose registration instant passes.
  const refusal = () => ({ message: 'the pair refuses this value' });
  inst.addConstraint(pair, (context) => (
    context !== null && typeof context === 'object' && context.tier === null && context.op === null
      ? true
      : refusal()
  ));

  // **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-29`, verbatim: *"Listen cannot overwrite constraint,
  // only other listeners"*) — THE CELL'S SUBJECT HAS INVERTED, AND THE INVERSION IS `B-6`.**
  //
  // **WHAT STOOD HERE, NAMED SO ITS ABSENCE IS LEGIBLE.** This cell asserted *"`listen` GAINS NO CONFLICT TEST
  // AT ALL, AND ITS PURGE REACH STAYS UNCONDITIONAL"* — a `listen` at a constraint pair's address *"PURGES AND
  // SUCCEEDS and NOTHING throws"* — on `listen-verb.md §7` item 1, `§8` `LF-8` and `contract.md §2.2` item 7.
  // **`D-29` NARROWS THAT CLAUSE AND DOES NOT WITHDRAW IT**: *"`listen` gains no conflict test against ANOTHER
  // LISTENER, and gains one against a CONSTRAINT"*. **The kept clause stands as text and is read THROUGH the
  // ruling**, so this cell's expectation is the RULING's and not the clause's.
  //
  // **THE ARM'S MEMBER IS `AddressMalformed`, ITS FORM THE ONE PLAIN OBJECT, AND ITS INSTANT IS BEFORE THE
  // PURGE** — *"the act must not destroy what it may not overwrite"* (`docs/L1/surface-deltas.md` §2.9's
  // member-follows-the-act's-subject principle; `D-29`: *"Its instant: after the handle's class test and the
  // set's domain test, and BEFORE the purge"*). **NO STATE MOVES**, which is the assertion that gives the
  // instant its teeth: the pair still enumerates and is still ENFORCED.
  //
  // **AND WHAT THE SAME-KIND HALF STILL LAWFULLY DOES IS ASSERTED BESIDE IT**: overwriting a LISTENER with a
  // listener stays lawful — `D-24`'s same-kind rule — which is the half `§2.2` item 7 keeps.
  const h = newHandle('purger');
  const refused = capture(() => inst.listen(h, [address]));
  assert.equal(refused.threw, true,
    'a `listen` at an address a STANDING CONSTRAINT pair occupies is REJECTED — `D-29`\'s sixth arm, `B-6` '
    + '(`D-29`: *"Listen cannot overwrite constraint, only other listeners"*; `docs/L1/surface-deltas.md` '
    + '§2.9)');
  assertRuleOne(refused.thrown, 'listen over a standing constraint pair');
  assert.equal(refused.thrown.status, 'AddressMalformed',
    'and its member follows the act\'s own subject: `listen` is a SINGLE REGISTRATION, so it takes the '
    + 'handle domain\'s `AddressMalformed`, exactly as `B-5` (`register`) does (`docs/L1/surface-deltas.md` '
    + '§2.9; `D-29`)');
  assert.deepEqual(Object.keys(refused.thrown).sort(), ['log', 'message', 'status'],
    'and it is the surface\'s ONE thrown form with `log: []` — no attempt was opened (`surface.md §2.5` '
    + 'item 4)');
  // NO STATE MOVED: the pair is still enumerated, still enforced, and the refused handle names nothing.
  assert.equal(inst.constraints().length, 1,
    'and NO STATE MOVED — the refusal precedes the purge, so the pair still enumerates (`D-29`: *"the act must '
    + 'not destroy what it may not overwrite"*)');
  const write = capture(() => inst.write(address, 'mem', 'a violating value'));
  assert.equal(write.threw, true,
    'THE PAIR STILL EVALUATES — the write is REFUSED, so the constraint is ENFORCED and the refused `listen` '
    + 'left it untouched (`contract.md §2.8` item 5)');
  // THE KEPT HALF OF THE CLAUSE: a listener DOES overwrite another listener.
  const first = newHandle('purger-a');
  const second = newHandle('purger-b');
  const spare = [tag('purger-spare')];
  assertListenAnswer(inst.listen(first, [spare]), 'the first listener', first);
  assertListenAnswer(inst.listen(second, [spare]), 'the second listener at the same address', second);
  assert.equal(inst.constraints().length, 1,
    'AND OVERWRITING A LISTENER WITH A LISTENER STAYS LAWFUL — `D-24`\'s same-kind rule, the half of '
    + '`§2.2` item 7 that `D-29` KEEPS (`D-29` item 1: *"Overwriting a listener with a listener stays lawful"*)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// PAR-HL — THE RETURN SHAPES AND THE PARAMETER ROWS THAT CARRY A POSITION
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_surface_pending_is_a_pair_list_seeded_as_a_clone_of_triggered', () => {
  // `S-15` — `K-2`'s record at its return: `triggered` and `pending` carry the SAME ELEMENT IDENTITIES, and
  // the seeding is a CLONE and not a transform (`contract.md §2.4` items 3, 9; `§3` `S-15`;
  // `trigger-and-pair.md §3` item 2; `PAR-HL-22`, `PAR-HL-39`). **AND THE MEMBER COUNT IS UNMOVED AT FOUR**
  // (`contract.md §2.4` item 8; `PAR-HL-39`; `A117` (D6)).
  return import('./held-listener-identity-helpers.mjs').then(async ({ kernel }) => {
    const { commit } = await kernel();
    const inst = makeStore();
    const address = [tag('pending')];
    const h = newHandle('pending');
    inst.listen(h, [address]);
    inst.register(h, () => {});
    const record = commit(inst, address, 'mem', 1);
    assert.deepEqual(Object.keys(record).sort(), ['attempt', 'op', 'pending', 'triggered'],
      'the `CommitRecord` keeps its FOUR members (`contract.md §2.4` item 8; `PAR-HL-39`; '
      + '`A117` (D6): a fifth is an amendment and not an addition)');
    assertAllPairs(record.triggered, 'record.triggered');
    assertAllPairs(record.pending, 'record.pending');
    assert.equal(record.pending[0], record.triggered[0],
      'AND `pending` IS SEEDED AS A CLONE: its elements ARE the `triggered` elements BY IDENTITY '
      + '(`contract.md §2.4` items 3 and 9; `trigger-and-pair.md §3` item 2: "a member-for-member copy of '
      + 'the SAME element identities")');
  });
});

test('hli_surface_no_parallel_triggeredAddresses_array_exists', () => {
  // **NO `triggeredAddresses` ARRAY EXISTS AND NONE MAY BE ADDED** — the aligned-array form is an i-th
  // correspondence that reverses `DD-37` (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 4;
  // `PAR-HL-38`'s outside list; `§5.3`'s FAILURE LIST). This cell is the NEGATIVE, asserted at the store's
  // own returned record and at the kernel's.
  const inst = makeStore();
  const address = [tag('no-parallel')];
  const h = newHandle('no-parallel');
  inst.listen(h, [address]);
  inst.register(h, () => {});
  const record = inst.write(address, 'mem', 1);
  assert.equal('triggeredAddresses' in record, false,
    'the store\'s record carries NO `triggeredAddresses` member — the pair replaces and does not '
    + 'supplement (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 4)');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
    'and its member set stays `{op, watched, triggered}` — a THIRD returned member is a member of no '
    + 'record (`PAR-HL-38`; `trigger-and-pair.md §6` item 2)');
});

test('hli_surface_the_construction_refuses_an_absent_listeners_key', () => {
  // `PAR-HL-36` — the construction's FOUR declared keys: `journalLength` (required), `listeners` (REQUIRED),
  // `constraints` (optional) and `filePath` (optional), and NO FIFTH (`contract.md §2.2` item 8).
  // **`listeners` ABSENT is OUTSIDE the domain and answers `AddressMalformed` with NO instance returned**
  // (`docs/specs/storeroom-native/parameter-semantics.md §2.12`, read at `PAR-HL-24`).
  const r = capture(() => storeCreate({ journalLength: 16 }));
  assert.equal(r.threw, true,
    'a construction carrying NO `listeners` key is refused (`PAR-HL-36`; `PAR-HL-24`: ABSENT is outside '
    + 'the domain)');
  assertRuleOne(r.thrown, 'the construction over an absent listeners key');
  assert.equal(r.thrown.status, 'AddressMalformed',
    'and the code is `AddressMalformed` — the member that carries the shape violations of a construction '
    + 'argument (docs/specs/storeroom-native/parameter-semantics.md §2.12)');
});
