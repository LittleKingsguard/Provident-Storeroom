// REGRESSION CELLS FOR THE FOUR GATE-4 HOST-FINDINGS
// (`U-STOREROOM-HELD-LISTENER-IDENTITY`, `D-GP-SHLI`).
//
// **AUTHORED BY THE IMPLEMENTER AFTER GATE 4 RETURNED `PASS-WITH-FINDINGS`.** Every cell below pins a
// behaviour the four findings name, and each cites the finding and the contract clause it is read against.
// **NOTHING HERE RESTATES A CONTRACT CLAIM THE CONTRACT DOES NOT CARRY** — the cells assert only what the
// requirement of record (`docs/pending.md`'s `⟶` rulings) and `docs/specs/storeroom-held-listener-identity/`
// declare.
//
// ── THE FOUR FINDINGS, ONE CELL EACH ──────────────────────────────────────────────────────────────
//
// `H-1` [BLOCKING] — `K-6` ENUMERATES ADDRESSES. `constraint-kernel.mjs`'s removal pushed one
//       `noopHandleFor(address)` per address of the pair's row before handing each to `removeListener`,
//       falsifying `§2.9` item 7 / `(Y-1)`'s *"does not enumerate addresses at all"*. **THE FIX ROUTE:
//       THE PAIR'S OWN STORE HANDLE — one handle standing over every address of the pair's set — is read
//       off `kernel.handles` and handed to the published `removeListener` ONCE.** The cells below assert
//       the reach is TOTAL over a multi-address pair from that ONE call, and that no address-by-address
//       walk is reachable.
//
// `H-2` — AN AD-HOC FOURTH `K-6` POSITION. The two constraint-site purges called
//       `remove(instance, pair, false)` — a position `PAR-HL-29`…`PAR-HL-31` never declares. **THE FIX:
//       the position is DROPPED and the read-model row the purge deletes is written back by the re-add.**
//       The cells below assert that `K-6`'s declared arity is TWO and that a purge-then-add cycle leaves
//       the enumeration and the identity standing.
//
// `H-3` — ONE READING PER POSITION. `removeConstraint`'s `pair.address` is read at exactly the two
//       spellings the contract declares for the constraint's pair and at no third
//       (`constraint-identity.md §6`: the pair's own SET, and the REGISTRATION act's single address), and
//       every shape row of `PAR-HL-8`'s outside list is refused.
//
// `H-4` — THE PURGE/WITHDRAW DISAGREEMENT. `withdraw` removes exactly ONE entry, so after a withdrawal
//       that leaves survivors the entry's standing is the SURVIVORS and `register`'s re-arm RESURRECTS
//       NOTHING the caller withdrew; where no survivor remains the entry is the reservation `S-6`
//       declares and its declared set stands whole. The cells below drive the duplicated-token case.
//
// ── WHAT THIS FILE DOES NOT DRIVE ────────────────────────────────────────────────────────────────
//
// 1. `K-6`'s state on a stale handle — `OWED` (`contract.md §2.9` item 7; `remove-member.md §4` item 5).
// 2. A mid-window mutation of another entry — `UNSUPPORTED BEHAVIOUR` (`contract.md §2.2` item 9).
// 3. Any order over `triggered` or `pending` — every comparison here is by SET (`DD-37`/`DD-22`).

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../../bindings/js/index.mjs';

import { capture, tag, kernel } from './held-listener-identity-helpers.mjs';

/** A constraint body that always passes — state 1 at its registration (`§2.3` item 5). */
const passing = () => true;

/** The handles a returned record names, as a SET (`§2.4` item 1; the pair replaces the bare handle). */
function handlesOf(triggered) {
  return triggered.map((element) => element.handle);
}

/** A `mem` store with an empty `listeners` array — `S-1` (`contract.md §3` `S-1`). */
function makeStore(opts = {}) {
  const cfg = { journalLength: 64, listeners: [] };
  if ('listeners' in opts) cfg.listeners = opts.listeners;
  return storeCreate(cfg);
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// H-1 [BLOCKING] — `K-6` DOES NOT ENUMERATE ADDRESSES, AND ITS REACH IS STILL TOTAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('gate4_H1_K6_reaches_the_published_member_once_for_a_multi_address_pair_and_purges_every_entry', async () => {
  // **THE FINDING, AT ITS OWN WORDS: `K-6` ran `for (const address of standing.addresses)
  // handles.push(noopHandleFor(address))` before handing each handle to `removeListener` — IT DOES CONSULT
  // `N`, falsifying `§2.9` item 7 / `(Y-1)`'s *"does not enumerate addresses at all"***
  // (`docs/pending.md`'s `## GATE 4 ADVERSARIAL PASS`, `H-1`; `contract.md §2.9` item 7;
  // `remove-member.md §6` item 4).
  //
  // **THE DECLARED SHAPE: *"the purge takes the OLD HANDLE and removes EVERY entry that handle names,
  // WHEREVER IT STANDS"*** (`P: docs/pending.md · (Y-1)`, verbatim) — so ONE call to the published
  // `removeListener` must take every entry of a multi-address pair, and the cell asserts BOTH halves:
  // the call COUNT is one, and the REACH is total.
  const K = await kernel();
  const store = makeStore();
  const addresses = [tag('h1-x'), tag('h1-y'), tag('h1-z')].map((segment) => [segment]);
  const pair = { address: addresses, id: 'h1-p' };
  store.addConstraint(pair, passing);

  // THE PAIR STANDS AT EVERY ADDRESS OF ITS SET BEFORE THE REMOVAL — one handle, N addresses
  // (`contract.md §2.6` item 4's *"one pair, N registry rows"*).
  for (const address of addresses) {
    const seen = store.write(address, 'mem', 1).triggered;
    assert.ok(handlesOf(seen).length >= 1,
      'the pair stands at ' + JSON.stringify(address) + ' before the removal — read '
      + JSON.stringify(seen));
  }

  let reached = 0;
  const published = store.removeListener;
  assert.equal(typeof published, 'function',
    'the published member exists before it is instrumented (`contract.md §2.7` item 1)');
  Object.defineProperty(store, 'removeListener', {
    configurable: true,
    writable: true,
    value: function instrumented(handle) {
      reached += 1;
      return published.call(this, handle);
    },
  });

  assert.equal(K.remove(store, pair), undefined,
    '`K-6 remove(store, pair) -> undefined` (`contract.md §2.9` item 3; `PAR-HL-31`)');

  // ── (1) THE CALL COUNT IS ONE: no address-by-address walk is reachable (`(Y-1)`).
  assert.equal(reached, 1,
    'AND `K-6` REACHED THE PUBLISHED `removeListener` EXACTLY ONCE for a THREE-address pair — read '
    + reached + ' call(s). `K-6` DOES NOT ENUMERATE ADDRESSES AT ALL and consults no count: the purge takes '
    + 'the pair\'s ONE store handle and removes every entry that handle names (`P: docs/pending.md · (Y-1)`, '
    + 'verbatim; `contract.md §2.9` item 7; `remove-member.md §6` item 4)');

  // ── (2) THE REACH IS TOTAL: every entry the pair stood on is gone (`MF-1`; `S-19`).
  for (const address of addresses) {
    assert.deepEqual(handlesOf(store.write(address, 'mem', 2).triggered), [],
      'and EVERY entry the handle named is withdrawn — a write at ' + JSON.stringify(address)
      + ' returns no handle for the pair (`contract.md §3` `S-19`; `remove-member.md §4` item 1). '
      + '`H-1`\'s failure mode was a silent no-op leaving entries standing');
  }
  assert.deepEqual(store.constraints(), [],
    'and the read model is gone with them (`contract.md §2.7` item 8; `remove-member.md §7` `MF-9`)');
});

test('gate4_H1_the_kernel_records_one_store_handle_per_pair_and_never_one_per_address', async () => {
  // **THE STRUCTURE THE FIX RESTS ON: `kernel.handles` HOLDS ONE HANDLE PER PAIR** — the value
  // `K-6` reads and hands to the published verb (`contract.md §2.8` item 4's *"it is what the
  // `pending`/check-off machinery keys on"*; `§2.9` item 7).
  //
  // **THE OBSERVABLE, READ AT THE STORE'S OWN RETURNED SET**: a three-address pair's registration yields
  // ONE handle in `triggered` at EVERY address of the set — never one handle per address — which is what
  // makes a single `removeListener` call total (`P: docs/pending.md · (Y-1)`).
  const store = makeStore();
  const addresses = [tag('h1b-x'), tag('h1b-y'), tag('h1b-z')].map((segment) => [segment]);
  store.addConstraint({ address: addresses, id: 'h1b-p' }, passing);

  const handles = new Set();
  for (const address of addresses) {
    const seen = handlesOf(store.write(address, 'mem', 1).triggered);
    assert.equal(seen.length, 1,
      'exactly ONE kernel handle stands at ' + JSON.stringify(address) + ' — read '
      + JSON.stringify(seen) + ' (`contract.md §2.6` item 4)');
    handles.add(seen[0]);
  }
  assert.equal(handles.size, 1,
    'AND IT IS THE SAME HANDLE AT EVERY ADDRESS OF THE PAIR\'S SET — one pair, one handle, N addresses. '
    + 'Read ' + JSON.stringify([...handles]) + '. **A HANDLE PER ADDRESS IS THE STATE `H-1` NAMED**: its '
    + 'purge cannot be total from one call (`P: docs/pending.md · (Y-1)`; `contract.md §2.9` item 7)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// H-2 — NO AD-HOC FOURTH POSITION, AND A PURGE-THEN-ADD LEAVES THE IDENTITY STANDING
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('gate4_H2_K6_declares_exactly_two_positions_and_no_third', async () => {
  // **THE FINDING: `index.mjs` called `remove(instance, pair, false)` with `purged === false` to suppress
  // the read-model delete — A POSITION `PAR-HL-29`…`PAR-HL-31` NEVER DECLARES**
  // (`docs/pending.md`'s `## GATE 4 ADVERSARIAL PASS`, `H-2`; `contract.md §2.9` item 3;
  // `remove-member.md §3` item 2's two priced alternatives, both REFUSED — *"a `K-6 remove(store, pair,
  // handle)` … hands the caller a position whose value the kernel already holds"*).
  //
  // **THE DECLARED SIGNATURE IS `K-6 remove(store, pair) -> undefined`** (`remove-member.md §3` item 1),
  // and this cell asserts the ARITY the declaration pins: TWO positions and no third.
  const K = await kernel();
  assert.equal(K.remove.length, 2,
    '`K-6` DECLARES TWO POSITIONS — `store` and `pair` — read ' + K.remove.length + '. **A THIRD POSITION '
    + 'IS THE STATE `H-2` NAMED**: the former `purged` flag is DROPPED and not kept as a kernel parameter '
    + '(`contract.md §2.9` item 3; `PAR-HL-29`, `PAR-HL-30`; `remove-member.md §3` items 1–2)');
});

test('gate4_H2_a_toggle_cycle_and_a_held_pair_write_leave_the_identity_and_the_enumeration_standing', () => {
  // **THE INSTRUMENT `H-2` CALLED WRONG, REPLACED BY THE MECHANISM THE RULING NAMES: `(O-3)`'s
  // purge-then-add RE-ADDS THE SAME PAIR IDENTITY**, so the read-model row a purge deletes is written back
  // by the re-add and the former `purged === false` suppression has no subject
  // (`P: docs/pending.md · (O-3)` item (iv)'s obligation; `(AA-2)`; `contract.md §2.6` item 2).
  //
  // **THE CELL DRIVES BOTH SITES THAT TAKES THE PURGE**: `addConstraint`'s overwrite arm and the
  // `constraintOff`/`constraintOn` toggle (`contract.md §2.3` items 2 and 7; `constraint-sites.md §1`
  // rows 1–3). **`IF-1` AND `IF-5` ARE THE OBSERVABLES**: the identity is EQUAL TO ITSELF across the
  // cycle, and the pair is STILL CARRIED and STILL ENUMERATED (`constraint-identity.md §5`).
  const store = makeStore();
  const pair = { address: [[tag('h2')]], id: 'h2' };
  const first = store.addConstraint(pair, passing);
  assert.equal(store.constraints().length, 1, 'the pair stands after the add (`PAR-HL-13`)');

  // ── THE OVERWRITE ARM: a second `addConstraint` at the SAME pair (`§2.3` item 2; `S-10`).
  assert.equal(store.addConstraint(pair, passing), first,
    'A SECOND `addConstraint` AT THE SAME PAIR ANSWERS THE SAME IDENTITY BY VALUE — the read-model row the '
    + 'purge deleted was written back by the re-add (`S-10`; `constraint-identity.md §5` `IF-1`; '
    + '`P: docs/pending.md · (AA-2)`)');
  assert.equal(store.constraints().length, 1,
    'and the pair is STILL ENUMERATED — a purge-then-add deletes no identity (`PAR-HL-13`)');

  // ── THE TOGGLE CYCLE: each half is a purge-then-add too (`§2.3` item 7; `S-11`).
  assert.equal(store.constraintOff(pair, passing), undefined,
    '`constraintOff` answers `undefined` (`§2.3` item 7; `PAR-HL-11`)');
  assert.equal(store.constraints().length, 1,
    'AND THE PAIR IS STILL CARRIED AND STILL ENUMERATED WHILE DISABLED — `constraintOff` is a TOGGLE and '
    + 'not a removal (`removal-members.md §3` item 3; `contract-identity.md §3` item 3; `§5` `IF-5`)');
  assert.equal(store.constraintOn(pair, passing), undefined,
    '`constraintOn` answers `undefined` (`§2.3` item 7; `PAR-HL-12`)');
  assert.equal(store.addConstraint(pair, passing), first,
    'AND THE IDENTITY STANDS THROUGH THE WHOLE CYCLE — a toggle deletes no identity (`IF-5`; '
    + '`constraint-identity.md §3` item 3)');
  assert.equal(store.constraints().length, 1,
    'and the enumeration never moved (`PAR-HL-13`; `§2.7` item 8)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// H-3 — ONE READING PER POSITION: THE DECLARED DOMAIN AND `PAR-HL-8`'S OUTSIDE ROWS AND NO OTHER
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('gate4_H3_removeConstraint_admits_exactly_the_two_declared_spellings_and_no_third', () => {
  // **THE FINDING: *"`removeConstraint` accepts the set form OR a bare segment list … Declared in a
  // comment, not in any contract clause; an extension"*** (`docs/pending.md`'s `## GATE 4 ADVERSARIAL
  // PASS`, `H-3`).
  //
  // **THE CONTRACT'S OWN DECLARATION, AT ITS BYTES**: the constraint's pair carries *"THE ADDRESS SET the
  // pair was created with (`§4` item 3) — and, at the REGISTRATION act, a single address"*
  // (`constraint-identity.md §6`'s pair table, verbatim; `PAR-HL-8`'s domain read with it; `PAR-HL-16`).
  // **SO THERE ARE EXACTLY TWO LAWFUL SPELLINGS AND THIS CELL DRIVES BOTH**, and asserts that the
  // REGISTRATION spelling is admitted only because `addConstraint` admitted it — a pair the caller added
  // must be removable (`contract.md §3` `S-12`).
  const store = makeStore();

  // ── SPELLING ONE: the pair's own SET (`PAR-HL-13`; `constraint-identity.md §4` item 3).
  const setPair = { address: [[tag('h3-set')]], id: 'h3-set' };
  setPair.identity = store.addConstraint(setPair, passing);
  assert.equal(store.removeConstraint(setPair), undefined,
    'a pair spelled as the pair\'s OWN ADDRESS SET is removed — the set form is the declared one '
    + '(`contract.md §2.7` item 3; `PAR-HL-16`)');
  assert.deepEqual(store.constraints(), [],
    'and the enumeration shrinks by one (`PAR-HL-13`\'s observable; `§2.7` item 8)');

  // ── SPELLING TWO: the REGISTRATION act's own single address, carried on the SAME pair object.
  const registrationPair = { address: [tag('h3-reg')], id: 'h3-reg' };
  store.addConstraint(registrationPair, passing);
  assert.equal(store.removeConstraint(registrationPair), undefined,
    'AND A PAIR SPELLED AT THE REGISTRATION ACT\'S OWN SINGLE ADDRESS IS REMOVED TOO — it is the form '
    + '`addConstraint` admitted, and refusing it would make a pair the caller added unremovable '
    + '(`constraint-identity.md §6`\'s registration clause; `contract.md §3` `S-12`)');

  // ── AND NO THIRD READING: every shape row `PAR-HL-8` refuses is refused here (`PAR-HL-16`'s outside
  //    cell is *"every shape row of `PAR-HL-8`'s outside list"*), INCLUDING a shape spelled inside a BARE
  //    SEGMENT LIST — a bare list is the registration form of a pair this instance CARRIES, and nothing
  //    else is admitted there (`constraint-identity.md §6`; `PAR-HL-8`'s `the values OUTSIDE it` cell).
  const outside = [
    { label: 'an ABSENT pair', omit: true },
    { label: 'a non-object', value: 'pair' },
    { label: 'null', value: null },
    { label: 'a plain object carrying no address', value: { id: 'x' } },
    { label: 'a set carrying a null segment', value: { address: [['a', null]], id: 'x' } },
    { label: 'a set carrying a float index', value: { address: [['a', 1.5]], id: 'x' } },
    { label: 'a set carrying a negative index', value: { address: [['a', -1]], id: 'x' } },
    { label: 'a set carrying a nested array where a segment belongs', value: { address: [[['a']]], id: 'x' } },
    { label: 'a bare segment list carrying an object where a segment belongs', value: { address: [{ a: 1 }], id: 'x' } },
    { label: 'a bare segment list carrying a null segment', value: { address: [null], id: 'x' } },
    { label: 'a bare segment list carrying a float index', value: { address: [1.5], id: 'x' } },
    { label: 'a bare segment list carrying a negative index', value: { address: [-1], id: 'x' } },
    { label: 'an address member that is not an array at all', value: { address: 4, id: 'x' } },
    { label: 'a non-string id', value: { address: [[tag('h3')]], id: 7 } },
    { label: 'an empty-string id', value: { address: [[tag('h3')]], id: '' } },
  ];
  for (const row of outside) {
    const r = row.omit
      ? capture(() => store.removeConstraint())
      : capture(() => store.removeConstraint(row.value));
    assert.equal(r.threw, true,
      '`removeConstraint` REFUSES ' + row.label + ' — the outside set is `PAR-HL-8`\'s and no ninth row is '
      + 'admitted (`contract.md §4` `F-7`; `PAR-HL-16`; `removal-members.md §6` item 2)');
    assert.equal('status' in r.thrown, false,
      'and the form is the constraint methods\' own `TypeError` with `status` ABSENT — the two forms are '
      + 'told apart by `status`\'s presence and nothing else (`constraint-sites.md §6` item 3)');
    assert.ok(r.thrown instanceof TypeError,
      'read ' + Object.prototype.toString.call(r.thrown) + ' — rule (ii) is a `TypeError`');
    // **AND THE REFUSAL IS THE CLASS REFUSAL AND NOT THE ABSENT-ROW THROW.** `F-7` governs *"an outside
    // pair"* and `F-8` governs *"a pair the entry does not carry"* (`contract.md §4`); a shape outside the
    // domain must take `F-7`'s answer, because `F-8`'s arm is reserved for a WELL-FORMED pair
    // (`removal-members.md §5` row `1`: *"the value and the reason"*). **A SHAPE THE POSITION SILENTLY
    // ADMITS BY COERCION TAKES THE `F-8` ARM INSTEAD — which is exactly the second reading `H-3` names.**
    assert.equal(/holds no constraint pair there/.test(r.thrown.message), false,
      row.label + ': the refusal is the CLASS refusal of `F-7` and NOT the absent-row throw of `F-8` — a '
      + 'shape this position does not declare must not be COERCED into a well-formed pair and then refused '
      + 'for an absent row. Read ' + JSON.stringify(r.thrown.message)
      + ' (`contract.md §4` `F-7`/`F-8`; `removal-members.md §6` item 2; `PAR-HL-16`)');
  }

  // ── AND THE POSITION'S TWO ARMS ARE NOT MERGED: A WELL-FORMED SET THE ENTRY DOES NOT CARRY TAKES
  //    `F-8`'S ABSENT-ROW THROW, while a SHAPE outside the domain takes `F-7`'s class refusal. **A POSITION
  //    THAT ACCEPTED A THIRD READING WOULD ANSWER ONE OF THESE TWO WITH THE OTHER'S FORM**, which is what
  //    the two asserts below separate (`contract.md §4` `F-7`/`F-8`).
  const carried = { address: [[tag('h3-arms')]], id: 'h3-arms' };
  store.addConstraint(carried, passing);
  const absentSet = capture(() => store.removeConstraint({ address: [[tag('h3-absent')]], id: 'h3-absent' }));
  assert.equal(absentSet.threw, true, 'a well-formed set the entry does not carry THROWS (`F-8`)');
  assert.equal(/holds no constraint pair there/.test(absentSet.thrown.message), true,
    'AND IT TAKES THE ABSENT-ROW FORM — the marker sentence is `F-8`\'s own (`contract.md §4` `F-8`; '
    + '`removal-members.md §5` row 1)');
  assert.equal(store.constraints().length, 1,
    'and a refusal changes nothing: the carried pair still enumerates (`removal-members.md §5` '
    + 'obligation (iii))');
  assert.equal(store.removeConstraint(carried), undefined,
    'while the CARRIED pair is removed through the set spelling (`§2.7` item 3)');
  assert.deepEqual(store.constraints(), [], 'and the last one is gone (`PAR-HL-13`)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// H-4 — THE PURGE/WITHDRAW AGREEMENT, DRIVEN ON THE DUPLICATED TOKEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('gate4_H4_a_duplicated_token_is_withdrawn_entry_by_entry_and_the_store_agrees_with_the_mirror', () => {
  // **THE FINDING: *"`withdraw` still removes exactly ONE entry while `§2.2` item 5 (b) makes `unlisten`
  // the re-arm of the entry's whole set — the two structures disagree after a duplicated token. No drive
  // caught it."*** (`docs/pending.md`'s `## GATE 4 ADVERSARIAL PASS`, `H-4`).
  //
  // **THE CONTRACT'S DECLARATION OF `withdraw` IS ONE ENTRY AND NOT THE SET** — *"it drops ONE home-map
  // entry"*, and `O-3` reads *"`unlisten`'s no-op success removes no other registration"*
  // (`docs/specs/storeroom-native/write-and-read.md §6.5` item 12, cited; `identity-and-domain.md §6`
  // `O-3`). **THE CONSTRUCTION'S ONE-ADDRESS DUPLICATE IS THE STATE THAT MAKES THIS OBSERVABLE**: the
  // store keeps BOTH adopted entries under one address for one handle (`DD-39`'s *"both entries are
  // KEPT"*; `surface.md`'s duplicate cases), so the handle stands at TWO store rows that the ONE mirror
  // handle names.
  //
  // **SO THE CELL DRIVES THE DUPLICATED TOKEN ENTRY BY ENTRY AND ASSERTS THE STORE'S OWN RETURNED SET
  // AFTER EACH WITHDRAWAL** — one entry per call and never the whole set, and the set empty after the
  // second (`O-3`; `write-and-read.md §6.5` item 12).
  const a = [tag('h4-dup')];
  const store = makeStore({
    listeners: [
      { address: a, handle: 'h4-dup' },
      { address: a, handle: 'h4-dup' },
    ],
  });
  store.register('h4-dup', () => {});

  assert.equal(handlesOf(store.write(a, 'mem', 1).triggered).length, 2,
    'THE DUPLICATED TOKEN STANDS AT TWO STORE ENTRIES AT ONE ADDRESS — read '
    + JSON.stringify(store.write(a, 'mem', 1).triggered) + ' (`DD-39`: both entries are KEPT)');

  assert.equal(store.unlisten('h4-dup'), undefined, '`unlisten` answers `undefined` (`§2.1` item 5)');
  assert.equal(handlesOf(store.write(a, 'mem', 2).triggered).length, 1,
    'AND ONE WITHDRAWAL DROPS EXACTLY ONE ENTRY — never the entry\'s whole set. **`withdraw` is'
    + ' `§6.5` item 12\'s ONE-entry withdrawal and `O-3`\'s *"no other registration"* rule** '
    + '(`identity-and-domain.md §6` `O-3`; `write-and-read.md §6.5` item 12)');

  assert.equal(store.unlisten('h4-dup'), undefined, 'the second withdrawal answers `undefined` too');
  assert.deepEqual(handlesOf(store.write(a, 'mem', 3).triggered), [],
    'and the SECOND drops the last one — the two structures agree entry for entry, which is the '
    + 'disagreement `H-4` named (`identity-and-domain.md §6` `O-3`)');
});

test('gate4_H4_a_withdrawal_leaving_survivors_sets_the_entry_standing_and_the_re_arm_resurrects_nothing', () => {
  // **THE STATE THE FINDING NAMES, DRIVEN AT THE PACKAGE'S OWN MEMBERS.** **THE STORE'S WITHDRAWAL DROPS
  // ONE ENTRY AND THE MIRROR DROPS ONE ROW — the two agree entry for entry** (`write-and-read.md §6.5`
  // item 12; `identity-and-domain.md §6` `O-3`). **WHERE SURVIVORS REMAIN, THE ENTRY'S STANDING IS THE
  // SURVIVORS**, which is the clause's own ground: *"The flag is per-handle AND per-standing, which is
  // what the home mirror already computes"* (`P: docs/pending.md · P-5`'s A4 ruling, verbatim;
  // `identity-and-domain.md §4` item 4).
  //
  // **THE OBSERVABLE**: after ONE withdrawal from a two-address handle, a re-arm INSTALLS THE SURVIVING
  // ADDRESS AND NOT THE WITHDRAWN ONE — the withdrawn address is not silently resurrected by the re-arm.
  const store = makeStore();
  const handle = 'h4-handle';
  const a = [tag('h4-surv-a')];
  const b = [tag('h4-surv-b')];
  store.listen(handle, [a, b]);
  store.register(handle, () => {});

  // BEFORE THE WITHDRAWAL: the handle stands at both addresses.
  assert.equal(handlesOf(store.write(a, 'mem', 1).triggered).includes(handle), true,
    'the handle stands at the first address before the withdrawal');
  assert.equal(handlesOf(store.write(b, 'mem', 1).triggered).includes(handle), true,
    'and at the second');

  // ONE WITHDRAWAL: exactly one store entry goes, and one address survives (`§6.5` item 12; `O-3`).
  assert.equal(store.unlisten(handle), undefined,
    '`unlisten` answers the no-op success shape (`§2.1` item 5)');

  const surviving = [];
  if (handlesOf(store.write(a, 'mem', 2).triggered).includes(handle)) surviving.push(a);
  if (handlesOf(store.write(b, 'mem', 2).triggered).includes(handle)) surviving.push(b);
  assert.equal(surviving.length, 1,
    'EXACTLY ONE ADDRESS SURVIVES ONE WITHDRAWAL — `withdraw` drops ONE home-map entry and no other '
    + 'registration is removed (`write-and-read.md §6.5` item 12; `identity-and-domain.md §6` `O-3`). '
    + 'Read ' + JSON.stringify(surviving) + ' surviving of ' + JSON.stringify([a, b]));
  const withdrawn = surviving[0] === a ? b : a;

  // THE RE-ARM: the surviving address is re-installed and the withdrawn one is NOT resurrected.
  assert.equal(store.register(handle, () => {}), undefined,
    '`register` re-arms the reservation (`identity-and-domain.md §3` item 2 (i); `contract.md §3` `S-6`)');
  assert.equal(handlesOf(store.write(surviving[0], 'mem', 3).triggered).includes(handle), true,
    'AND THE SURVIVING ADDRESS FIRES AGAIN after the re-arm (`identity-and-domain.md §3` item 2 (i))');
  assert.deepEqual(handlesOf(store.write(withdrawn, 'mem', 3).triggered), [],
    'WHILE THE WITHDRAWN ADDRESS STAYS WITHDRAWN — the re-arm resurrects nothing the caller withdrew. '
    + '**A RE-ARM THAT RE-INSTALLS THE WITHDRAWN ADDRESS IS THE DISAGREEMENT `H-4` NAMED**: the entry\'s '
    + 'standing is the mirror\'s survivors (`P: docs/pending.md · P-5`\'s A4 ruling; '
    + '`identity-and-domain.md §4` item 4)');
});

test('gate4_H4_a_withdrawal_with_no_survivor_keeps_the_reservation_the_S_6_clause_declares', () => {
  // **THE OTHER HALF, SO THE RECONCILIATION IS NOT READ AS A DELETION: WHERE NO SURVIVOR REMAINS THE
  // ENTRY IS THE RESERVATION `S-6` DECLARES** — *"the entry EXISTS with `off` set; `register(h, fn)`
  // SUCCEEDS and re-arms it"* (`identity-and-domain.md §3` item 2 (i); `contract.md §3` `S-6`;
  // `listen-verb.md §4`'s transition `1 → 2`). **A DELETED ENTRY IS NOT A RESERVED ONE, and this cell
  // asserts the reserved one.**
  const store = makeStore();
  const handle = 'h4-single';
  const a = [tag('h4-single-a')];
  store.listen(handle, [a]);
  const seen = [];
  store.register(handle, (argument) => { seen.push(argument); });

  assert.equal(store.unlisten(handle), undefined, '`unlisten` answers `undefined`');
  assert.deepEqual(handlesOf(store.write(a, 'mem', 1).triggered), [],
    'the store-side entry is withdrawn (`contract.md §3` `S-6`)');

  assert.equal(store.register(handle, () => {}), undefined,
    'AND THE MAP ENTRY STANDS: `register` SUCCEEDS on the handle `unlisten` withdrew — a reservation is '
    + 'not a deletion (`identity-and-domain.md §3` items 1–2)');
  assert.equal(handlesOf(store.write(a, 'mem', 2).triggered).includes(handle), true,
    'and the re-armed entry fires at the next write (`identity-and-domain.md §3` item 2 (i))');
});
