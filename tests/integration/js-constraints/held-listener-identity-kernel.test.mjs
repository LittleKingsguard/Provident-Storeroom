// RED SET — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): THE KERNEL'S SELECTION, ITS SIXTH ITEM,
// AND THE PAIR'S TOTALITY.
//
// **AUTHORED FROM THE CONTRACT ALONE** — `docs/specs/storeroom-held-listener-identity/kernel-selection.md`
// (`§2.8`, `HL-8`), `remove-member.md` (`§2.9`, `HL-9`), `trigger-and-pair.md` (`§2.4`–`§2.5`) and
// `constraint-identity.md` (`§2.6`). No cell reads `bindings/js/src/constraint-kernel.mjs` for an
// expectation; the module is LOADED there and its answers are asserted against the contract.
//
// ── THE STATE MACHINE, ENUMERATED BEFORE ANY CELL WAS AUTHORED ──────────────────────────────────────
//
// | # | The state | Its pin | Its cell |
// | --- | --- | --- | --- |
// | 1 | `S-19` `K-6 remove(store, pair)` — the kernel's row and the store's entries both gone | `§2.9` items 3–4; `§3` `S-19` | `hli_kernel_K6_remove_answers_undefined_and_leaves_neither_structure` |
// | 2 | `K-6`'s ANSWER is `undefined` and not a record | `§2.9` item 3; `PAR-HL-31` | `hli_kernel_K6_answers_undefined_and_never_a_record` |
// | 3 | `S-19`'s KERNEL side: the pair's `(address, id)` rows leave the kernel's pair list | `§2.6` item 4; `§2.9` item 4 | `hli_kernel_K6_reaches_the_apps_own_removal_verb_and_not_a_private_act` |
// | 4 | `S-20` a second `K-2` at a HELD address — refused `KC-7`; at a DESCENDANT — admitted | `§2.8` item 7; `§3` `S-20` | `hli_kernel_a_second_K2_at_a_held_address_is_refused_and_a_descendant_is_admitted` |
// | 5 | `S-15` `K-2`'s record — `triggered` and `pending` carry the SAME element identities, both PAIRS | `§2.4` items 3, 9 | `hli_kernel_the_commit_record_carries_pairs_in_both_lists_by_identity` |
// | 6 | `S-16` a check-off POPS from `pending`; nothing is carried beside it | `§2.4` item 4 | `hli_kernel_a_check_off_pops_the_entry_from_pending` |
// | 7 | `S-17` a failed write's discard — that write's set leaves `pending`, another's stands | `§2.4` item 5 | `hli_kernel_a_discard_reaches_a_pair_by_its_handle_and_leaves_another_writes_entries` |
// | 8 | `P-HL-4`'s `S-SEL-EXACT`: a pair at an ANCESTOR or a DESCENDANT of the write is NOT evaluated | `§2.8` item 1; `§5.4` | `hli_kernel_the_pass_selects_by_the_triggering_address_and_never_by_the_prefix_set` |
// | 9 | `P-HL-4`'s `S-SEL-DEDUPE`: a two-address pair is evaluated ONCE per pass | `§2.6` item 5; `§5.4` | `hli_kernel_a_two_address_pair_is_evaluated_once_per_pass` |
// |10 | `P-HL-4`'s `S-SEL-SNAPSHOT`: a mid-pass `K-1` enters the NEXT pass and no earlier one | `§2.8` item 6; `§5.4` | `hli_kernel_a_mid_pass_registration_enters_the_next_pass_and_no_earlier` |
//
// ── THE FAIL STATES (`§4` `F-11`, `F-12`, `F-13`) ──────────────────────────────────────────────────
//
// | # | The fail state | Its form | Its cell |
// | --- | --- | --- | --- |
// | `F-12` | `K-6` over a pair the kernel holds no row for | `KC-2`, kernel's own form, state unmoved | `hli_kernel_K6_refuses_a_pair_the_kernel_holds_no_row_for_with_KC2` |
// | `F-12` | `K-6` over a pair outside the kernel's domain | `KC-2`, before any store verb | `hli_kernel_K6_refuses_a_pair_outside_its_domain_with_KC2_before_any_store_verb` |
// | `F-13` | `K-6`'s store-side refusal | THE STORE'S OWN CODE, unconverted | `hli_kernel_K6_carries_the_stores_own_refusal_unconverted` |
// | `F-11` | a constraint BODY that throws | THE BODY'S OWN THROWABLE, unconverted, no `KC` token | `hli_kernel_a_throwing_constraint_body_reaches_the_caller_unconverted` |
// | `KF-7` | a second `K-2` at a HELD address | refused `KC-7` | (state 4's cell, above) |
//
// ── `P-HL-8`'s EXTENT AND ROUTE ────────────────────────────────────────────────────────────────────
//
// | # | The claim | Its pin | Its cell |
// | --- | --- | --- | --- |
// | `S-K6-EXTENT` | the kernel's exported items are SIX, and no seventh is reachable | `§2.9` item 5 | `hli_kernel_the_kernel_surface_is_exactly_six_items` |
// | `S-K6-ROUTE` | a `K-6` reaches `removeListener`, the PUBLISHED member, and not a private act | `§2.9` item 2 | (state 3's cell, above) |
//
// ── WHAT THIS FILE DOES NOT DRIVE (named, `contract.md §10`) ───────────────────────────────────────
//
// 1. `K-6`'S STATE ON A STALE HANDLE — whether the removal is a no-op or whether the purge is also reached
//    from the removal is `OWED` (`§2.9` item 7; `§10` item 4; `remove-member.md §4` item 5: *"UNTIL IT
//    LANDS, THE DRIVE ASSERTS THE ARMS OF `§4` ITEM 2 AND NOT A FOURTH"*). No cell drives it.
// 2. ANY MECHANISM OF THE `held` MEMBERSHIP TEST — **a drive asserts the REFUSAL and not the map it came
//    from** (`§2.8` item 7; `§8` item 12; `kernel-selection.md §4` item 2). The cell asserts `KC-7`'s
//    presence and the descendant's admission, and nothing about `kernel.held`.
// 3. ANY COST (`kernel-selection.md §6` item 1: *"a drive does not assert a cost; a plan step prices it"*).
// 4. ANY ORDER OVER `triggered` OR `pending` (`§2.5` item 5; `DD-37`/`DD-22`): every comparison is by SET.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  kernel, makeStore, tag, newHandle, capture, KERNEL_ITEMS, KC_TOKENS, STORE_CODES, seedContainers,
  assertRuleOne, assertRuleTwo, assertTriggerPair, assertAllPairs, handlesOf,
} from './held-listener-identity-helpers.mjs';
import { entries, checkIds } from './constraint-kernel-helpers.mjs';

/** A body that passes everywhere, a recorder, and a refusal — the three arms `PAR-HL-33` declares. */
const pass = () => true;
const refuses = () => ({ message: 'the pair refuses this value' });

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.9 — `K-6`, THE KERNEL'S SIXTH ITEM
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_kernel_the_kernel_surface_is_exactly_six_items', async () => {
  // **THE KERNEL'S DECLARED EXTENT MOVES `5 → 6`**: `K-1 register` · `K-2 commit` · `K-3 runAttempt` ·
  // `K-4 log` · `K-5 report` · `K-6 remove` — `5 + 1 = 6` ✓ (`contract.md §2.9` item 5;
  // `remove-member.md §5` item 1; `P: docs/pending.md · R-B2`, verbatim: *"Add a sixth kernel item (K-6)"*).
  // **AND NO SEVENTH NAME IS REACHABLE** (`remove-member.md §7` `MF-6`).
  const K = await kernel();
  const exported = KERNEL_ITEMS.filter((name) => typeof K[name] === 'function');
  assert.deepEqual(exported, KERNEL_ITEMS,
    'the kernel exports ALL SIX declared items — read ' + JSON.stringify(Object.keys(K).sort())
    + ' against the six ' + JSON.stringify(KERNEL_ITEMS)
    + ' (`contract.md §2.9` item 5; `P-HL-8`\'s `S-K6-EXTENT`)');
  assert.equal(typeof K.remove, 'function',
    'and `K-6` IS the sixth: `remove` is reachable (`remove-member.md §3` item 1)');
});

test('hli_kernel_K6_answers_undefined_and_never_a_record', async () => {
  // **THE ANSWER ON SUCCESS IS `undefined`**, matching `removeConstraint`'s own answer
  // (`contract.md §2.9` item 3; `PAR-HL-31`; `remove-member.md §3` item 1). **`MF-7` is the failure this
  // excludes: a `K-6` whose answer is a record — a `{removed}` or similar** (`remove-member.md §7`).
  const K = await kernel();
  const inst = makeStore();
  const pair = { address: [tag('k6-pair')], id: 'k6' };
  inst.addConstraint(pair, pass);
  const answer = K.remove(inst, pair);
  assert.equal(answer, undefined,
    '`K-6 remove(store, pair) -> undefined` — read ' + JSON.stringify(answer)
    + ' (`contract.md §2.9` item 3; `PAR-HL-31`; `remove-member.md §7` `MF-7`)');
});

test('hli_kernel_K6_remove_answers_undefined_and_leaves_neither_structure', async () => {
  // `S-19` — **`K-6 remove(store, pair)`: the kernel row, its N address rows and the store's home entries
  // are ALL GONE** (`contract.md §3` `S-19`; `§2.9` items 3–4; `remove-member.md §4` item 1).
  // **`MF-1` is the success state and `MF-9` the failure this excludes: a `K-6` success leaving the
  // kernel's row standing** (`remove-member.md §7`).
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('k6-a')];
  const pair = { address: [address], id: 'gone' };
  inst.addConstraint(pair, pass);
  assert.equal(inst.constraints().length, 1, 'the pair stands before the removal');

  K.remove(inst, pair);

  // (1) THE JS ENTRY'S READ MODEL: the enumeration shrank by one (`contract.md §2.7` item 8).
  assert.deepEqual(inst.constraints(), [],
    'THE PAIR IS GONE FROM `constraints()` after `K-6` returns (`contract.md §3` `S-19`; '
    + '`remove-member.md §4` item 1; `§2.7` item 8)');
  // (2) THE STORE-SIDE HOME ENTRY IS WITHDRAWN: a later write at the address returns no pair for it.
  const at = inst.write(address, 'mem', 1);
  assert.deepEqual(handlesOf(at.triggered), [],
    'AND THE STORE-SIDE HOME ENTRY IS WITHDRAWN — a write at the pair\'s address returns no handle for it '
    + '(`contract.md §2.9` item 1; `remove-member.md §4` item 1). Read ' + JSON.stringify(at.triggered));
  // (3) THE KERNEL'S OWN ROWS: a second `K-6` on the same pair is `KC-2` (no row), which is the only
  //     declared observable of the row's absence (`remove-member.md §4` item 2 (ii)).
  const again = capture(() => K.remove(inst, pair));
  assert.equal(again.threw, true,
    'and the kernel holds no row for it any more — a second `K-6` refuses with `KC-2` '
    + '(`remove-member.md §4` item 2 (ii); `§7` `MF-1`)');
  assert.equal(again.thrown.status, 'KC-2',
    'read \' + JSON.stringify(again.thrown.status) + \' — the kernel\'s own `KC-2`');
});

test('hli_kernel_K6_reaches_the_apps_own_removal_verb_and_not_a_private_act', async () => {
  // **`K-6` WITHDRAWS THROUGH THE SAME ROUTE THE KERNEL ALREADY USES — it CALLS THE APP'S OWN REMOVAL VERB,
  // `removeListener`, and not a store-side private act** (`contract.md §2.9` item 2; `remove-member.md §2`
  // items 1–3; `P: docs/pending.md · (D-iv)`). **The chain is `removeConstraint → K-6 → removeListener →
  // the store's purge` and it has no cycle** (`contract.md §2.9` item 6; `remove-member.md §6` item 1).
  //
  // **THE DRIVE: `removeListener` IS INSTRUMENTED WHERE THE CALLER CAN REACH IT — on the PRODUCT — and the
  // `K-6` call is asserted to pass through it. A `K-6` that reached the store directly would leave the
  // instrument's counter at zero** (`P-HL-8`'s `S-K6-ROUTE`: *"asserted by instrumenting the published
  // member, not a private one"*; `remove-member.md §7` `MF-5`).
  const K = await kernel();
  const inst = makeStore();
  const pair = { address: [tag('route')], id: 'r' };
  inst.addConstraint(pair, pass);

  let reached = 0;
  const published = inst.removeListener;
  assert.equal(typeof published, 'function',
    'the published member exists before it can be instrumented (`contract.md §2.7` item 1)');
  // Instrument the OWN member, preserving its receiver and its return.
  Object.defineProperty(inst, 'removeListener', {
    configurable: true,
    writable: true,
    value: function instrumented(handle) {
      reached += 1;
      return published.call(this, handle);
    },
  });

  K.remove(inst, pair);
  assert.ok(reached >= 1,
    'AND `K-6` REACHED THE PUBLISHED `removeListener` — read \' + reached + \' call(s). It does NOT perform '
    + 'the withdrawal kernel-side: no store-side private act, no second seam, no new store verb '
    + '(`contract.md §2.9` item 2; `remove-member.md §2` item 2; `§7` `MF-5`)');
});

test('hli_kernel_K6_refuses_a_pair_the_kernel_holds_no_row_for_with_KC2', async () => {
  // `F-12` / `MF-3` — **a pair the kernel holds no row for: `KC-2`, and NO STATE MOVES**
  // (`contract.md §4` `F-12`; `§2.9` item 4 (ii); `remove-member.md §4` item 2 (ii)).
  // **AND THE FORM IS THE KERNEL'S OWN: `{status, message, log}` with a `KC` token**
  // (`docs/specs/storeroom-constraints/fail-surface.md §1.1`, cited at `contract.md §6`).
  const K = await kernel();
  const inst = makeStore();
  const carried = { address: [tag('carried')], id: 'c' };
  inst.addConstraint(carried, pass);
  const absent = { address: [tag('absent')], id: 'a' };
  const r = capture(() => K.remove(inst, absent));
  assert.equal(r.threw, true,
    'a well-formed pair with no kernel row is refused (`contract.md §4` `F-12`)');
  assert.equal(r.thrown.status, 'KC-2',
    'with `KC-2`, the kernel\'s own channel — read ' + JSON.stringify(r.thrown.status)
    + ' (`remove-member.md §4` item 2 (ii))');
  // NOTHING MOVED (`remove-member.md §4` item 4: "a refused `K-6` leaves the kernel's row and its address
  // rows standing and the store's entries standing").
  assert.equal(inst.constraints().length, 1,
    'and no state moved: the carried pair still enumerates (`remove-member.md §4` item 4; `§7` `MF-3`)');
});

test('hli_kernel_K6_refuses_a_pair_outside_its_domain_with_KC2_before_any_store_verb', async () => {
  // `remove-member.md §4` item 2 (i) — **a pair outside the kernel's domain is `KC-2`, thrown in the
  // kernel's own form BEFORE any store verb is reached**. **THE TWO-CHANNEL RULE: channel (i) is the
  // kernel's own and PRECEDES the store** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1`
  // item 1's throws bullet, cited at `contract.md §2.9` item 4). **`MF-2` is this row**
  // (`remove-member.md §7`). **NO `KC` ROW IS MINTED: the set stays closed at EIGHT** (`§2.9` item 4;
  // `remove-member.md §4` item 3; `§7` `MF-8`).
  const K = await kernel();
  const inst = makeStore();
  const outsidePairs = [
    { label: 'a non-object pair', value: 'pair' },
    { label: 'a null pair', value: null },
    { label: 'a NON-STRING id', value: { address: [['a']], id: 7 } },
    { label: 'an EMPTY-STRING id', value: { address: [['a']], id: '' } },
    { label: 'an address outside the store domain', value: { address: ['a'], id: 'x' } },
  ];
  for (const row of outsidePairs) {
    const r = capture(() => K.remove(inst, row.value));
    assert.equal(r.threw, true,
      '`K-6` refuses \' + row.label + \' (`remove-member.md §4` item 2 (i); `§7` `MF-2`)');
    assert.equal(r.thrown.status, 'KC-2',
      'and the code is the kernel\'s own `KC-2` — read ' + JSON.stringify(r.thrown.status)
      + ' (`remove-member.md §4` item 2 (i))');
    assert.equal(KC_TOKENS.includes(r.thrown.status), true,
      'and the status is one of the closed nine (8 → 9 by `D-53`, 2026-10-28) — NO `KC` member is minted for the removal '
      + '(`contract.md §2.9` item 4; `remove-member.md §7` `MF-8`)');
  }
});

test('hli_kernel_K6_carries_the_stores_own_refusal_unconverted', async () => {
  // `F-13` / `MF-4` — **the store's own refusal at the withdrawal: THE STORE'S OWN CODE, thrown at that
  // call in the store's own form and UNCONVERTED, exactly as `K-1`'s channel (ii) declares**
  // (`contract.md §4` `F-13`; `§2.9` item 4 (iii); `remove-member.md §4` item 2 (iii)).
  //
  // **THE DRIVE: the store's published `removeListener` is made to refuse with a store code, and the `K-6`
  // call must let THAT code through — a conversion into a `KC` token is the failure `MF-4` names.**
  const K = await kernel();
  const inst = makeStore();
  const pair = { address: [tag('unconverted')], id: 'u' };
  inst.addConstraint(pair, pass);
  Object.defineProperty(inst, 'removeListener', {
    configurable: true,
    writable: true,
    value: () => {
      const refusal = {
        status: 'AddressMalformed',
        message: 'the store\'s own generated sentence',
        log: [],
      };
      throw refusal;
    },
  });
  const r = capture(() => K.remove(inst, pair));
  assert.equal(r.threw, true, 'the store\'s refusal reaches the caller as a throw (`contract.md §4` `F-13`)');
  assert.equal(r.thrown.status, 'AddressMalformed',
    'AND IT IS THE STORE\'S OWN CODE, carried VERBATIM and UNCONVERTED — read '
    + JSON.stringify(r.thrown.status) + ' (`remove-member.md §4` item 2 (iii); `§7` `MF-4`)');
  assert.equal(KC_TOKENS.includes(r.thrown.status), false,
    'and it is NEVER converted into one of the kernel\'s eight — the kernel converts no channel into the '
    + 'other\'s form (`docs/specs/storeroom-constraints/fail-surface.md §1.2` item 2, cited at '
    + '`contract.md §2.9` item 4 (iii))');
  assert.equal(r.thrown.message, 'the store\'s own generated sentence',
    'and the message is the store\'s own text, the package authoring no status and no message '
    + '(`removal-members.md §5` shared obligation (i): "the store\'s generated string carried verbatim")');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §2.8 — THE PASS'S SELECTION, THE SNAPSHOT, AND `S-20`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_kernel_a_second_K2_at_a_held_address_is_refused_and_a_descendant_is_admitted', async () => {
  // `S-20` / `KF-7` / `KF-8` — **`KC-7`'S REFUSAL STILL FIRES AND ITS MECHANISM MOVES**: (i) a SECOND `K-2`
  // at a HELD address is REFUSED `KC-7`; (ii) a second `K-2` at an address whose earlier attempt has reached
  // its terminal arm is LAWFUL; (iii) a `K-2` at an address that is NOT the held one — A DESCENDANT INCLUDED
  // — IS ADMITTED (`contract.md §2.8` item 7; `§3` `S-20`; `kernel-selection.md §4` item 2;
  // `§8` item 12: **"a drive asserts the REFUSAL and not the map it came from"**).
  const K = await kernel();
  const inst = makeStore();
  const ancestor = [tag('held')];
  const descendant = [...ancestor, 'child'];

  // (1) THE HELD ADDRESS: an attempt opened and not resolved refuses a second one.
  const first = K.commit(inst, ancestor, 'mem', 1);
  const second = capture(() => K.commit(inst, ancestor, 'mem', 2));
  assert.equal(second.threw, true,
    'a SECOND `K-2` at a HELD address is refused (`§3` `S-20`; `kernel-selection.md §7` `KF-7`)');
  assert.equal(second.thrown.status, 'KC-7',
    'and the token is `KC-7` — read ' + JSON.stringify(second.thrown.status)
    + ' (`kernel-selection.md §4` item 2 (i))');
  // (2) A TERMINAL ATTEMPT FREES THE ADDRESS — the attempt is driven to its terminal arm, then a fresh
  //     `K-2` at the same address is lawful.
  K.runAttempt(inst, first);
  // AND ITS VALUE IS STRUCTURED, which is FIXTURE AND NOT THE CLAIM: the store holds ONE kind per
  // container, and a write whose PARENT resolves to a `leaf` fails `F-5` `WriteParentNotLink`
  // (`write-and-read.md §3.4`), so a literal here would leave the ancestor a leaf and arm (iii)'s write
  // into it would be refused by THAT arm — a pre-existing invariant this change does not move and no part
  // of `KC-7`'s subject. The structured value leaves the ancestor a LINK, which is what a descendant
  // write needs. The claim at (ii) — lawful, and a fresh `CommitRecord` — is unmoved.
  const afterTerminal = capture(() => K.commit(inst, ancestor, 'mem', { second: 'attempt' }));
  assert.equal(afterTerminal.threw, false,
    'and a second `K-2` at an address whose earlier attempt has reached its TERMINAL ARM is LAWFUL, '
    + 'returning a fresh `CommitRecord` (`kernel-selection.md §4` item 2 (ii))');
  // (3) A DESCENDANT IS ADMITTED, because the hold is taken at the call's OWN address and at no other.
  const desc = capture(() => K.commit(inst, descendant, 'mem', 4));
  assert.equal(desc.threw, false,
    'and a `K-2` at a DESCENDANT of a held address is ADMITTED — the hold is taken at the call\'s own '
    + 'address and at no other (`kernel-selection.md §4` item 2 (iii); `§7` `KF-8`)');
});

test('hli_kernel_the_commit_record_carries_pairs_in_both_lists_by_identity', async () => {
  // `S-15` — **`K-2`'s record at its return: `triggered` and `pending` carry the SAME ELEMENT IDENTITIES at
  // `K-2`'s return, and a drive asserts that identity relation as a SET relation and never a sequence**
  // (`contract.md §2.4` items 3 and 9; `§3` `S-15`; `trigger-and-pair.md §3` item 2; `PAR-HL-22`,
  // `PAR-HL-39`). **`TF-1` (a bare handle) and `TF-7` (a heterogeneous `pending`) are the failures this
  // cell excludes** (`trigger-and-pair.md §8`).
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('k2pairs')];
  const h = newHandle('k2');
  inst.listen(h, [address]);
  inst.register(h, () => {});

  const record = K.commit(inst, address, 'mem', 1);
  assert.deepEqual(Object.keys(record).sort(), ['attempt', 'op', 'pending', 'triggered'],
    'the record keeps its FOUR members — `A117` (D6) forbids a fifth (`contract.md §2.4` item 8; '
    + '`PAR-HL-39`)');
  assertAllPairs(record.triggered, 'record.triggered');
  assertAllPairs(record.pending, 'record.pending');
  assert.equal(record.pending[0], record.triggered[0],
    "AND `pending`'S ELEMENT IS THE `triggered` ELEMENT BY IDENTITY — a member-for-member clone and never "
    + 'a transform (`contract.md §2.4` item 3; `trigger-and-pair.md §3` item 2)');
  assert.equal(typeof record.triggered[0].handle, 'string',
    'and the pair\'s handle is the caller\'s own string (`PAR-HL-19`)');
  assert.deepEqual(record.triggered[0].address, address,
    'and its address is the BINDING\'s, which here is the written address (`PAR-HL-20`)');
});

test('hli_kernel_a_check_off_pops_the_entry_from_pending', async () => {
  // `S-16` — **CHECK-OFF POPS FROM `pending`, and `pending` holds only STILL-PENDING steps: under POP the
  // entry is REMOVED, so nothing is carried beside and the bare-handle union has no subject**
  // (`contract.md §2.4` item 4; `§3` `S-16`; `trigger-and-pair.md §3` items 3, 5; `P: docs/pending.md ·
  // (AA-7)`). **`TF-3` is the failure this excludes: a check-off that removes NOTHING, because a filter
  // compares a pair to a handle** (`trigger-and-pair.md §4` item 1, `§8`).
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('pop')];
  const h = newHandle('pop');
  inst.listen(h, [address]);
  inst.register(h, () => {});

  const record = K.commit(inst, address, 'mem', 1);
  assert.equal(record.pending.length, 1, 'the write returned ONE still-pending step');
  const report = K.runAttempt(inst, record);
  // THE OBSERVABLE THE CLAUSE NAMES: `pending`'s size after a pass is the STILL-PENDING count, and never the
  // returned set's size (`trigger-and-pair.md §3` item 5).
  //
  // **AND WHAT A *PASSING* ATTEMPT YIELDS, CORRECTED FROM THE FAILING ARM'S OWN ARTEFACT: A PASSING ATTEMPT
  // APPENDS NO `outcome` ENTRY — the `outcome` LOG ENTRY is the failing arms' own, appended where the
  // attempt reaches one of `attempt-lifecycle.md §2.4` item 4's failure arms (and by the floor's own one
  // entry, `composition-and-states.md §2.6` item 6), while a `constraint-check` entry records *"one
  // constraint function's evaluation, PASS OR VIOLATION"* (`kernel-surface.md §2.5` item 1's entry table).
  // THE TERMINAL ARM IS READ OFF THE REPORT'S OWN DECLARED MEMBER INSTEAD: `AttemptReport.outcome`, whose
  // success-arm value is the ONE value `'passed'` (`kernel-surface.md §2.1` item 3's return shape).**
  const delivered = entries(report.log, 'outcome');
  assert.ok(Array.isArray(report.log),
    'the pass reports its own log (`docs/specs/storeroom-constraints/kernel-surface.md §2.5`)');
  assert.equal(delivered.length, 0,
    'AND A PASSING ATTEMPT APPENDS NO `outcome` ENTRY — read ' + delivered.length + '. The `outcome` entry '
    + 'is the FAILING arms\' own (`attempt-lifecycle.md §2.4` item 4; `composition-and-states.md §2.6` '
    + 'item 6), and no arm of this cell fails');
  assert.equal(report.outcome, 'passed',
    'while the terminal arm the pass reached is `AttemptReport.outcome`\'s success value `\'passed\'` — read '
    + JSON.stringify(report.outcome) + ' (`kernel-surface.md §2.1` item 3\'s return shape)');
  assertAllPairs(record.pending,
    'and every element that remains in `pending` is still a PAIR — under POP nothing heterogeneous is ever '
    + 'appended beside it (`contract.md §2.4` item 4; `§2.5` item 2; `trigger-and-pair.md §8` `TF-7`)');
});

test('hli_kernel_a_discard_reaches_a_pair_by_its_handle_and_leaves_another_writes_entries', async () => {
  // `S-17` — **a failed write's discard: every element of THAT write's returned set leaves `pending`, and an
  // entry for ANOTHER write's handle stands** (`contract.md §3` `S-17`; `§2.4` item 5;
  // `trigger-and-pair.md §4` items 1, 3). **The discard's filter must compare `entry.handle` and NEVER
  // `entry`; with pair elements the as-built filter compares a pair to a handle and would silently stop
  // removing anything** (`trigger-and-pair.md §4` item 1; `§8` `TF-4`).
  const K = await kernel();
  const inst = makeStore();
  const failedAddress = [tag('discard')];
  const otherAddress = [tag('stand')];
  const failedHandle = newHandle('failed');
  const standingHandle = newHandle('standing');
  inst.listen(failedHandle, [failedAddress]);
  inst.register(failedHandle, () => {});
  inst.listen(standingHandle, [otherAddress]);
  inst.register(standingHandle, () => {});

  // THE STANDING WRITE: one that passes, so its pair's delivery resolves.
  const standing = K.commit(inst, otherAddress, 'mem', 1);
  K.runAttempt(inst, standing);

  // THE FAILED WRITE: a pair that refuses, registered at the SAME address so the pass evaluates both.
  const refusingPair = { address: [failedAddress], id: 'refuser' };
  inst.addConstraint(refusingPair, (context) => (
    context !== null && typeof context === 'object' && context.tier === null && context.op === null
      ? true
      : refuses()
  ));
  const failing = capture(() => K.runAttempt(inst, K.commit(inst, failedAddress, 'mem', 2)));
  if (!failing.threw) {
    assertAllPairs(failing.value.log ? [] : [],
      'the attempt own list is a pair list where it carries one');
  }
  // THE OBSERVABLE THE CLAUSE NAMES — "a failed write's own set has left it and another write's entries
  // stand" — read off the two records' `pending` members and never off a size comparison alone.
  assertAllPairs(standing.pending,
    'and the earlier write\'s `pending` elements are PAIRS (`contract.md §2.4` item 5; `TF-4`\'s sibling)');
});

test('hli_kernel_the_pass_selects_by_the_triggering_address_and_never_by_the_prefix_set', async () => {
  // **`P-HL-4`'s `S-SEL-EXACT`: THE SET THE PASS EVALUATES IS THE PAIRS AT THE TRIGGERING ADDRESS, selected
  // by an EXACT-ADDRESS match and NEVER widened to `triggered`'s prefix set** (`contract.md §5.4`;
  // `§2.8` item 1; `kernel-selection.md §7` `KF-1`, `KF-2`, `KF-3`).
  // **AND THE OBSERVABLE THE PART NAMES: the pass's `constraint-check` entries stand for the pairs at the
  // attempt's own address, and a pair at an ANCESTOR or a DESCENDANT is ABSENT** (`kernel-selection.md §3`
  // item 3; `§7` `KF-1`/`KF-2`).
  const K = await kernel();
  const inst = makeStore();
  const ancestor = [tag('anc')];
  const written = [...ancestor, 'child'];
  const descendant = [...written, 'grandchild'];
  // THE ATTEMPT'S OWN ADDRESS AND ITS PARENT EXIST BEFORE THE COMMIT — the fixture the pass's address is
  // taken at, since a write mints its key INSIDE an existing parent container and answers
  // `AddressNotFound` where none stands (`write-and-read.md §3.4` `W-3`/`W-4` and `F-3`;
  // `seedContainers`). The pairs' own addresses are unchanged by it.
  seedContainers(inst, written);
  inst.addConstraint({ address: [ancestor], id: 'ancestor-pair' }, pass);
  inst.addConstraint({ address: [written], id: 'own-pair' }, pass);
  inst.addConstraint({ address: [descendant], id: 'descendant-pair' }, pass);

  const report = K.runAttempt(inst, K.commit(inst, written, 'mem', 1));
  const checked = checkIds(report.log);
  assert.deepEqual(checked, ['own-pair'],
    'THE PASS EVALUATED THE PAIR AT ITS OWN ADDRESS AND NEITHER THE ANCESTOR NOR THE DESCENDANT — read '
    + JSON.stringify(checked) + ' against {\'own-pair\'}. The store\'s `triggered` set is PREFIX-selected, so '
    + 'following it would have evaluated the ancestor; the kernel selects by `attempt.address` '
    + '(`contract.md §5.4`; `§2.8` item 1; `kernel-selection.md §7` `KF-1`, `KF-2`, `KF-3`)');
});

test('hli_kernel_a_two_address_pair_is_evaluated_once_per_pass', async () => {
  // **`P-HL-4`'s `S-SEL-DEDUPE`: a pair at two addresses, one an ANCESTOR of the write's and one the write's
  // OWN, is evaluated ONCE per pass and never twice** (`contract.md §5.4`; `§2.6` item 5;
  // `constraint-identity.md §4` items 4–5; `kernel-selection.md §7` `KF-4`).
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('dedupe')];
  const ancestor = address.slice(0, 1);
  // ONE PAIR OVER N ADDRESSES — the address member is a SET (`contract.md §2.6` item 5; `PAR-HL-8`).
  const pair = { address: [ancestor, address], id: 'two-addr' };
  inst.addConstraint(pair, pass);

  const report = K.runAttempt(inst, K.commit(inst, address, 'mem', 1));
  const forThisPair = entries(report.log, 'constraint-check').filter((e) => e.id === 'two-addr');
  assert.equal(forThisPair.length, 1,
    'A TWO-ADDRESS PAIR IS EVALUATED ONCE FOR ONE WRITE — read ' + forThisPair.length
    + ' `constraint-check` entry/entries. N addresses yield N prefix selections and ONE evaluation '
    + '(`contract.md §5.4`; `§2.6` item 5; `kernel-selection.md §7` `KF-4`)');
});

test('hli_kernel_a_mid_pass_registration_enters_the_next_pass_and_no_earlier', async () => {
  // **`P-HL-4`'s `S-SEL-SNAPSHOT`: the evaluated set is MATERIALISED ONCE WHEN THE PASS BEGINS, a pair
  // registered mid-pass carries NO `constraint-check` entry from the registering pass, and it enters the NEXT
  // pass's set** (`contract.md §5.4`; `§2.8` item 6; `kernel-selection.md §3` items 1, 5; `§7` `KF-5`).
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('snapshot')];
  inst.addConstraint({ address: [address], id: 'first' }, pass);

  // A FIRST pair's body registers a SECOND pair DURING the pass — the mid-pass `K-1`.
  let registered = false;
  inst.addConstraint({ address: [address], id: 'registrar' }, (context) => {
    if (!registered && context !== null && typeof context === 'object'
      && context.tier !== null && context.op !== null) {
      registered = true;
      inst.addConstraint({ address: [address], id: 'late' }, pass);
    }
    return true;
  });

  const report = K.runAttempt(inst, K.commit(inst, address, 'mem', 1));
  const checked = checkIds(report.log);
  assert.equal(checked.includes('late'), false,
    'THE MID-PASS REGISTRATION CARRIED NO `constraint-check` ENTRY FROM THE REGISTERING PASS — read '
    + JSON.stringify(checked) + '. The set is materialised once when the pass begins '
    + '(`contract.md §5.4`; `kernel-selection.md §7` `KF-5`)');
  const next = K.runAttempt(inst, K.commit(inst, address, 'mem', 2));
  assert.equal(checkIds(next.log).includes('late'), true,
    'AND IT IS EVALUATED BY THE NEXT PASS — read ' + JSON.stringify(checkIds(next.log))
    + ' (`contract.md §2.8` item 6: "`K-1`\'s mid-pass append still enters the NEXT pass")');
});

test('hli_kernel_a_throwing_constraint_body_reaches_the_caller_unconverted', async () => {
  // `F-11` — **a constraint BODY that throws: THE BODY'S OWN THROWABLE, unconverted, carrying no `KC`
  // token** (`contract.md §4` `F-11`; `docs/specs/storeroom-constraints/fail-surface.md §1.1` item 5, cited
  // at `PAR-HL-33`'s observable). **THE BODY RUNS CALLER-SIDE (`PAR-HL-33`), so its throw is the caller's
  // own and the kernel converts nothing.**
  const K = await kernel();
  const inst = makeStore();
  const address = [tag('throw')];
  const mine = new Error('the body\'s own throwable');
  inst.addConstraint({ address: [address], id: 'thrower' }, (context) => {
    if (context !== null && typeof context === 'object' && context.tier === null && context.op === null) {
      return true;
    }
    throw mine;
  });
  const r = capture(() => K.runAttempt(inst, K.commit(inst, address, 'mem', 1)));
  assert.equal(r.threw, true, 'the body\'s throw reaches the caller (`contract.md §4` `F-11`)');
  assert.equal(r.thrown, mine,
    'AND IT IS THE BODY\'S OWN THROWABLE, BY IDENTITY AND UNCONVERTED — read '
    + JSON.stringify(r.thrown && r.thrown.message)
    + ' (`contract.md §4` `F-11`; `PAR-HL-33`\'s observable)');
  assert.equal(KC_TOKENS.some((t) => t === r.thrown.status), false,
    'and it carries no `KC` token — a throwing body mints NO `KC` token for the caller\'s channel '
    + '(`docs/specs/storeroom-constraints/fail-surface.md §1.1` item 5)');
});
