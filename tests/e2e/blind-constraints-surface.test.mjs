// tests/e2e/blind-constraints-surface.test.mjs
//
// BLIND INSTRUMENT — THE CONSTRAINTS SURFACE: the batch element carrying its function, the add route's
// overwrite, the pair's address SET, the toggles' idempotence and their refuse-at-an-uncarried-pair arm,
// `constraints()`'s four exclusions, `removeConstraint` as the one act that deletes an identity, and the
// list's non-persistence.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `bindings/js/index.d.ts` — `StoreConfig.constraints`, `ConstraintPair`, `Constraint`,
//     `ConstraintIdentity`, and the members `addConstraint` · `constraintOn` · `constraintOff` ·
//     `removeConstraint` · `constraints()` (primary input)
//   · `docs/specs/storeroom-js/surface.md` §2.1 (the `cfg` block) · §2.5 (the one failure form) · §2.12
//   · `docs/specs/storeroom-held-listener-identity/contract.md` §2.3 · §2.6 · §2.7 · §4
//   · `docs/specs/storeroom-native/contract.md` §7.1 step 4 · §8.1 #16
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**`, `src/**`, or any existing battery or runner
// under `tests/**` was read to author this file, and NO CELL OPENS A DOCUMENT AT RUNTIME (`D-17`).

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { storeCreate } from '../../bindings/js/index.mjs';

/** A store constructed at the two REQUIRED `cfg` keys alone, plus whatever the cell supplies. */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** Run `fn`, returning the thrown value. A call that RETURNS is a failure of every cell that uses this. */
const catchIt = (fn) => {
  try {
    fn();
  } catch (thrown) {
    return thrown;
  }
  assert.fail('the call returned; the declared surface says it THROWS');
};

/**
 * A pair's address, read AS A SET of addresses and never as a sequence.
 *
 * `index.d.ts`'s `ConstraintPair.address` is `Address | readonly Address[]`: "on the READ and at the
 * REMOVAL it is the pair's own SET". The declaration does not state the ENCODING for a set of ONE
 * (`['a']` and `[['a']]` are both spellings of `Address | readonly Address[]`), so this helper reads both
 * and the cells assert the SET — which is the datum the surface actually declares. See the `OWED` note
 * inside the address-set cell.
 */
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

// ---------------------------------------------------------------------------------------------
// §1 — THE BATCH ELEMENT CARRIES ITS FUNCTION
// ---------------------------------------------------------------------------------------------

test('constraints · surface.md §2.1 (cfg block) and index.d.ts `StoreConfig.constraints` (ruling `D-26`) · the batch element IS three members and the construction ARMS its function', () => {
  // DECLARED: "⟶ AMENDED 2026-10-24 (`D-26`, verbatim: *"The batch in cfg.constraints must supply
  // functions"*): THE ELEMENT IS THREE MEMBERS AND THE FUNCTION IS REQUIRED. The pair is the element's
  // ADDRESSING and the function is its SUBSTANCE … THE STORE NEVER SEES THE FUNCTION … so the crossing
  // carries the pair and THE PACKAGE ARMS THE SUBSTANCE at construction through the same act the add
  // route performs (`D-26` items 3–4)" (index.d.ts, `StoreConfig.constraints`). And the batch populates
  // the registry: "`storeCreate` registers each of `cfg.constraints`' elements that carries its own
  // function at `K-1`, at the instance it is constructing" (`surface.md §2.12` item 2's preamble (b)).
  //
  // `Constraint`'s answer rule is index.d.ts's own: "read for its answer (`kernel-surface.md §2.3`
  // item 1: `true` is the only pass value)".
  let refuse = false;
  const armed = () => !refuse;
  const instance = make({
    constraints: [{ address: ['bt'], id: 'bt-1', constraint: armed }],
  });

  // THE ELEMENT IS A CARRIED PAIR — it comes back out of the registered-pair read.
  assert.deepEqual(
    instance.constraints().map((pair) => pair.id),
    ['bt-1'],
  );

  // AND IT IS ARMED: the batch function — not a stub, not a no-op — decides the write.
  refuse = true;
  const caught = catchIt(() => instance.write(['bt'], 'mem', 1));
  assert.equal(typeof caught.status, 'string');
});

test('constraints · index.d.ts `StoreConfig.constraints` (rulings `D-26` item 4 and `D-27` item 1) · an element that carries NO function is REFUSED under `ConstraintListInvalid`, before any filesystem act', () => {
  // DECLARED: "so *"a well-formed `cfg.constraints` element that carried no function"* is an element the
  // construction now REFUSES under `ConstraintListInvalid` **before any filesystem act**" (index.d.ts,
  // `StoreConfig.constraints`'s 2026-10-24 clause); the code is the store's own: "under the store's
  // existing `ConstraintListInvalid` — the package mints no code" (`D-27`), `native contract.md §8.1` #16.
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-batch-'));
  const filePath = join(directory, 'never-written.json');

  const caught = catchIt(() =>
    storeCreate({
      journalLength: 8,
      listeners: [],
      filePath,
      constraints: [{ address: ['nf'], id: 'nf-1' }], // the pair, and no function: NOT a batch element
    }),
  );

  assert.equal(caught.status, 'ConstraintListInvalid');
  // "BEFORE ANY FILESYSTEM ACT" — the refusal precedes the file tier's own reachability probe and commit.
  assert.equal(existsSync(filePath), false, 'the refused construction touched the filesystem');
});

test('constraints · index.d.ts `StoreConfig.constraints` (ruling `D-27`) · two elements of ONE `cfg.constraints` naming one `id` are REJECTED under `ConstraintListInvalid` — "regardless of listener/constraint type"', () => {
  // DECLARED: "SO, AT CONSTRUCTION, TWO REFUSALS THAT THE STORE CANNOT TAKE AND THE PACKAGE OWNS
  // (`D-27`): no two elements of one `cfg.constraints` may name one `id`; and no element's `id` may equal
  // a `handle` this construction's `listeners` adopts — a cross-KIND collision, rejected regardless of
  // kind (`D-27`: *"Reject duplicate handles in batch - regardless of listener/constraint type"*). …
  // Both are refused before any filesystem act, in the surface's one thrown form `{status, message, log}`,
  // under the store's existing `ConstraintListInvalid` — the package mints no code."
  //
  // AND THE TABLE THAT MAKES THIS AN OVERWRITE'S OPPOSITE, AT ITS OWN WORDS: "| this key, `cfg.constraints`
  // | REJECTED — the list is ONE supplied act, so an internal ambiguity is malformed input and not a
  // second write |". A repeated handle at the add route is an OVERWRITE (the next cell); in one batch it
  // is a refusal. The two rules are different rules for different acts.
  const caught = catchIt(() =>
    storeCreate({
      journalLength: 8,
      listeners: [],
      constraints: [
        { address: ['dup'], id: 'one-id', constraint: () => true },
        { address: ['dup2'], id: 'one-id', constraint: () => true },
      ],
    }),
  );
  assert.equal(caught.status, 'ConstraintListInvalid');
});

test("constraints · index.d.ts `StoreConfig.constraints` (ruling `D-27`) · an element's `id` equal to a `handle` this construction's `listeners` adopts is REJECTED — the cross-KIND collision", () => {
  // DECLARED: "no element's `id` may equal a `handle` this construction's `listeners` adopts — a
  // cross-KIND collision, rejected regardless of kind … The second is not an overwrite and the first is
  // not a second registration" (index.d.ts, `StoreConfig.constraints`).
  const caught = catchIt(() =>
    storeCreate({
      journalLength: 8,
      listeners: [{ address: ['lk'], handle: 'shared-handle' }],
      constraints: [{ address: ['ck'], id: 'shared-handle', constraint: () => true }],
    }),
  );
  assert.equal(caught.status, 'ConstraintListInvalid');
});

// ---------------------------------------------------------------------------------------------
// §2 — THE ADD ROUTE'S OVERWRITE
// ---------------------------------------------------------------------------------------------

test('constraints · index.d.ts `addConstraint` (ruling `D-24`) · at a pair ALREADY HELD the supplied constraint OVERWRITES the held one under THE SAME IDENTITY, and the displaced function never runs again', () => {
  // DECLARED: "the pair's element IS the supplied `constraint` from this call on, whether the pair was
  // HELD or NOT, and at a pair already held the supplied constraint OVERWRITES the held one under **THE
  // SAME IDENTITY** the pair was already added under, so the call throws nothing for the mere fact that
  // the pair was held" (index.d.ts, `addConstraint`); `ConstraintIdentity`'s own observable: "equal to
  // itself on a second `addConstraint` at the SAME pair (the overwrite arm) and distinguishable from
  // every other pair's. No spelling for it is declared … a consumer compares identities and never
  // contents". And `constraints()`: "An overwrite changes no membership: … the pair is carried ONCE
  // before and after."
  const instance = make();
  const pair = { address: ['ow'], id: 'ow-1' };
  let firstRefuses = false;
  const firstIdentity = instance.addConstraint(pair, () => !firstRefuses);
  assert.equal(instance.constraints().length, 1);

  // THE HELD PAIR IS ARMED: the first element refuses the write, so the overwrite's arm below is not
  // vacuous.
  firstRefuses = true;
  assert.equal(typeof catchIt(() => instance.write(['ow'], 'mem', 1)).status, 'string');

  const secondIdentity = instance.addConstraint(pair, () => true);
  assert.equal(secondIdentity, firstIdentity, 'the identity moved on an overwrite');
  assert.equal(instance.constraints().length, 1, 'the overwrite changed the membership');

  // THE DISPLACED FUNCTION NEVER RUNS AGAIN: the write the first element refused now SUCCEEDS, because
  // the second element is the pair's substance from this call on.
  assert.doesNotThrow(() => instance.write(['ow'], 'mem', 2));
});

// ---------------------------------------------------------------------------------------------
// §3 — THE PAIR'S ADDRESS **SET**
// ---------------------------------------------------------------------------------------------

test("constraints · index.d.ts `ConstraintPair.address` · on the READ the address is the pair's own SET, and that same shape is the REMOVAL's domain — \"THE TWO ROLES ARE ONE SHAPE AND NOT TWO\"", () => {
  // DECLARED: "**THE ADDRESS MEMBER'S TYPE MOVES.** At the CREATION act it is a single address …; on the
  // READ and at the REMOVAL it is the pair's own SET (`P: docs/pending.md · P-7`'s answer clause:
  // *"1. (one id, N addresses)"*; `contract.md §2.6` item 5)"; and, of the read's element, "THE TWO ROLES
  // ARE ONE SHAPE AND NOT TWO: this is the caller's own datum entering at `addConstraint` … and coming
  // back out at the read."
  const instance = make();
  instance.addConstraint({ address: ['ad'], id: 'ad-1' }, () => true);

  const carried = instance.constraints();
  assert.equal(carried.length, 1);
  assert.deepEqual(addressSet(carried[0].address), ['ad']);

  // THE ROUND TRIP IS THE DECLARED CONSEQUENCE: what the read answers is lawful at the removal.
  assert.equal(
    instance.removeConstraint({ address: carried[0].address, id: carried[0].id }),
    undefined,
  );
  assert.deepEqual(instance.constraints(), []);
  // OWED (recorded, not guessed): the declaration states the SET on the read and at the removal but says
  // of the CREATION act "a single address", while `docs/specs/storeroom-held-listener-identity/
  // contract.md §2.6` item 4 speaks of "a pair standing over N addresses" occupying "N registry rows and
  // ONE identity". WHICH ACT GIVES A PAIR ITS SECOND ADDRESS IS NOT SETTLED BY EITHER DOCUMENT, so no
  // cell here constructs an N>1 pair, and NONE ASSERTS an N=1 ENCODING (`['a']` against `[['a']]`) —
  // the cells compare the address AS A SET, which is the datum both clauses declare.
});

// ---------------------------------------------------------------------------------------------
// §4 — THE TOGGLES
// ---------------------------------------------------------------------------------------------

test('constraints · surface.md §2.12 item 3 (1) · a toggle reached where the pair ALREADY STANDS in the state it asks for is IDEMPOTENT SUCCESS — `undefined`, no throw, and the pair\'s state does not move', () => {
  // DECLARED: "A TOGGLE REACHED WHERE THE PAIR ALREADY STANDS IN THE STATE THE TOGGLE ASKS FOR IS
  // IDEMPOTENT SUCCESS: `constraintOn` at an ENABLED pair and `constraintOff` at a DISABLED pair each
  // return `undefined`, leave the pair's state and its element EXACTLY as they stood, and THROW NOTHING";
  // index.d.ts repeats it at each member: "Idempotent success where the pair already stands ENABLED" /
  // "… stands DISABLED".
  const instance = make();
  const pair = { address: ['tg'], id: 'tg-1' };
  let refuse = false;
  const constraint = () => !refuse;
  instance.addConstraint(pair, constraint); // the pair stands ENABLED

  // `constraintOn` at an ENABLED pair, twice.
  assert.equal(instance.constraintOn(pair, constraint), undefined);
  assert.equal(instance.constraintOn(pair, constraint), undefined);

  // AND THE STATE DID NOT MOVE — the element is still ENABLED and still armed.
  refuse = true;
  assert.equal(typeof catchIt(() => instance.write(['tg'], 'mem', 1)).status, 'string');
  assert.equal(instance.constraints().length, 1);

  // `constraintOff` at an ENABLED pair, then again at the DISABLED pair.
  refuse = false;
  assert.equal(instance.constraintOff(pair, constraint), undefined);
  assert.equal(instance.constraintOff(pair, constraint), undefined);

  // AND THE STATE DID NOT MOVE — the element is DISABLED: "a write the disabled constraint would have
  // refused is ACCEPTED" (index.d.ts's `constraintOff`) — and the pair is STILL REGISTERED.
  refuse = true;
  assert.doesNotThrow(() => instance.write(['tg'], 'mem', 2));
  assert.equal(instance.constraints().length, 1);
});

test('constraints · surface.md §2.12 item 3 (2) and index.d.ts `ConstraintPair` · a toggle naming a pair the entry does NOT carry THROWS the three methods\' one `TypeError`, with the `status` member ABSENT and `log: []` — a toggle is NOT a third population route', () => {
  // DECLARED: "A TOGGLE NAMING A PAIR THE ENTRY DOES NOT CARRY — at either function, in either direction
  // — IS AN OUTSIDE VALUE AND TAKES `item 4`'s REFUSAL: ONE THROWN `TypeError`, the `status` member ABSENT,
  // AND THE ENTRY IS NOT WIDENED … a toggle that added an element while carrying nothing to put in it
  // would be a THIRD route, and it would leave a pair ENABLED WITH NO FUNCTION — a state no clause of
  // this directory declares" (§2.12 item 3 (2)); "Every outside form of the pair throws the three
  // methods' one `TypeError`, and a well-formed pair the entry does not carry is outside the two
  // toggles' domain: it is NOT a third population route" (index.d.ts, `ConstraintPair`). And `log`'s
  // declared `[]` arms include "the three constraint methods' `TypeError`" (`surface.md` §2.5 item 4).
  const instance = make();
  const pair = { address: ['uc'], id: 'never-carried' };
  const constraint = () => true;

  for (const call of [
    () => instance.constraintOn(pair, constraint),
    () => instance.constraintOff(pair, constraint),
  ]) {
    const caught = catchIt(call);
    assert.ok(caught instanceof TypeError, 'the refusal is not the declared `TypeError`');
    assert.equal('status' in caught, false, 'the class test form carries a `status` member');
    assert.deepEqual(caught.log, []);
  }

  // THE ENTRY IS NOT WIDENED.
  assert.deepEqual(instance.constraints(), []);
});

// ---------------------------------------------------------------------------------------------
// §5 — `constraints()`'S FOUR DECLARED EXCLUSIONS
// ---------------------------------------------------------------------------------------------

test('constraints · index.d.ts `constraints()` items 1 and 2 · every element carries EXACTLY the two members `address` and `id`: NO constraint function and NO opaque identity is reachable through the return', () => {
  // DECLARED: "**WHAT IS RETURNED, EXACTLY — THE PAIRS AND NOT THE FUNCTIONS:** a **FRESH JS ARRAY on every
  // call**, whose **every element is a FRESH plain object carrying EXACTLY TWO MEMBERS** — `address` … and
  // `id` …". Exclusion 1: "**NO CONSTRAINT FUNCTION IS RETURNED** … `Constraint` … and NO MEMBER OF THIS
  // RETURN CARRIES ONE". Exclusion 2: "**NO OPAQUE IDENTITY IS EXPOSED**: `ConstraintIdentity` is NOT
  // reachable through this return — `PAR-JS-25`'s opacity would break the moment a consumer read one out
  // of the array."
  const instance = make();
  const identity = instance.addConstraint({ address: ['el'], id: 'el-1' }, () => true);

  const first = instance.constraints();
  assert.equal(first.length, 1);
  assert.deepEqual(Object.keys(first[0]).sort(), ['address', 'id']);
  assert.equal(typeof first[0].id, 'string');

  // NO FUNCTION STANDS IN THE RETURN.
  for (const value of Object.values(first[0])) {
    assert.notEqual(typeof value, 'function', 'a constraint function crossed in the read');
  }

  // NO IDENTITY IS REACHABLE — neither as an element nor as a member of one.
  assert.equal(first.includes(identity), false);
  for (const value of Object.values(first[0])) {
    assert.notEqual(value, identity);
  }

  // AND EVERY CALL ANSWERS A FRESH ARRAY WITH FRESH ELEMENTS.
  const second = instance.constraints();
  assert.notEqual(second, first);
  assert.notEqual(second[0], first[0]);
});

test('constraints · index.d.ts `constraints()` item 4 · a DISABLED pair still appears, and there is NO `enabled` member on an element — "the state is read at the toggles\' own clauses"', () => {
  // DECLARED: "**A DISABLED PAIR DOES APPEAR** (item 5): `constraintOff` is a TOGGLE and NOT A REMOVAL, so
  // a pair it disabled is STILL REGISTERED and still enumerated — **and therefore there is NO `enabled`
  // member on an element and NO way to read a pair's state off this return**"; and "`Row 27`'s `alt` cell
  // refuses an `enabled` member on the element, so no third member is declared here".
  const instance = make();
  const pair = { address: ['dis'], id: 'dis-1' };
  const constraint = () => true;
  instance.addConstraint(pair, constraint);
  assert.equal(instance.constraintOff(pair, constraint), undefined);

  const carried = instance.constraints();
  assert.equal(carried.length, 1, 'the disabled pair left the enumeration');
  assert.equal(Object.prototype.hasOwnProperty.call(carried[0], 'enabled'), false);
  assert.deepEqual(Object.keys(carried[0]).sort(), ['address', 'id']);
});

test('constraints · index.d.ts `constraints()` item 3 (`DD-22`) · the returned order is UNDECLARED: the pairs are compared as a SET and never as a sequence, and nothing may be read as a registration, address or `seq`-like ordinal', () => {
  // DECLARED: "**NO ORDER IS PROMISED** (item 6): the returned array's order is **UNDECLARED** and a
  // consumer compares the pairs **as a SET and never as a sequence** (`DD-22`; `§2.7` item 3). **Nothing in
  // this declaration may be read as a registration order, an address order or a `seq`-like ordinal.**"
  //
  // SO THIS CELL ASSERTS THE SORTED MEMBERSHIP ALONE. An assertion on the array's own order would be the
  // very claim the clause refuses, and a cell that made one would be asserting a behaviour the surface
  // does not declare.
  const instance = make();
  for (const id of ['o-1', 'o-2', 'o-3']) {
    instance.addConstraint({ address: [id], id }, () => true);
  }
  assert.deepEqual(
    instance.constraints().map((pair) => pair.id).sort(),
    ['o-1', 'o-2', 'o-3'],
  );
});

// ---------------------------------------------------------------------------------------------
// §6 — `removeConstraint`: THE ONE ACT THAT DELETES AN IDENTITY
// ---------------------------------------------------------------------------------------------

test('constraints · held-listener contract.md §2.6 item 3 and §2.7 item 8 · `removeConstraint` is THE ONE ACT that deletes an identity: a fresh `addConstraint` at that pair answers a DIFFERENT identity, and a toggle leaves the pair standing', () => {
  // DECLARED: "**`removeConstraint` REMOVES THE ROW AND THE IDENTITY WITH IT — THE ONE ACT THAT DELETES AN
  // IDENTITY.** … The observable: after `removeConstraint(pair)`, a fresh `addConstraint` at that pair
  // answers a NEW identity, and the identity the caller held before resolves to nothing"
  // (`docs/specs/storeroom-held-listener-identity/contract.md §2.6` item 3); "`removeConstraint` IS NOT
  // `constraintOff` … the observable distinction: `constraints()`'s return SHRINKS by one element per
  // `removeConstraint`, where `constraintOff` leaves it standing" (`§2.7` item 8).
  const instance = make();
  const pair = { address: ['del'], id: 'del-1' };
  const constraint = () => true;

  const identity = instance.addConstraint(pair, constraint);

  // A TOGGLE CYCLE DELETES NOTHING.
  instance.constraintOff(pair, constraint);
  assert.equal(instance.constraints().length, 1);
  instance.constraintOn(pair, constraint);
  assert.equal(instance.constraints().length, 1);

  // THE REMOVAL TAKES THE PAIR AND THE IDENTITY.
  assert.equal(instance.removeConstraint(pair), undefined);
  assert.deepEqual(instance.constraints(), []);

  const fresh = instance.addConstraint(pair, constraint);
  assert.notEqual(fresh, identity, 'the deleted identity was answered again');
});

// ---------------------------------------------------------------------------------------------
// §7 — THE LIST'S NON-PERSISTENCE
// ---------------------------------------------------------------------------------------------

test('constraints · native contract.md §8.1 #16 (its 2026-10-15 trigger clause) · THE LIST IS NOT PERSISTED — "the importing application will provide the constraints on startup from its own information" — so a fresh instance over the same file carries NO pair', () => {
  // DECLARED: the store's `ConstraintListInvalid` row, in the architect's own words, *"The list is not
  // persisted, the importing application will provide the constraints on startup from its own
  // information."* (`docs/specs/storeroom-native/contract.md §8.1` #16, whose row reads *"`cfg.constraints`
  // is PRESENT — A CONSTRUCTION-TIME PARAMETER THE IMPORTING APPLICATION SUPPLIES AT STARTUP, NEVER A BYTE
  // OF THE FILE AND NEVER A REGISTER KEY"*); and index.d.ts's `constraints()`: "**The empty array `[]` is
  // the declared value where the instance carries no pair at all**".
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-nonpersist-'));
  const filePath = join(directory, 'store.json');
  const pair = { address: ['np'], id: 'np-1' };
  let refuse = false;
  const constraint = () => !refuse;

  const first = make({ filePath, constraints: [{ ...pair, constraint }] });
  assert.equal(first.constraints().length, 1);
  assert.doesNotThrow(() => first.write(['np'], 'file', 1)); // the element passes, and the state reaches the file

  // THE ELEMENT IS ARMED ON THE INSTANCE THAT CARRIES IT.
  refuse = true;
  assert.equal(typeof catchIt(() => first.write(['np'], 'file', 2)).status, 'string');

  // AND THE SECOND INSTANCE OVER THE SAME FILE CARRIES NO PAIR: the list did not travel in the file.
  const second = make({ filePath });
  assert.deepEqual(second.constraints(), []);
  assert.doesNotThrow(() => second.write(['np'], 'file', 3)); // nothing refuses it: no element stands
});
