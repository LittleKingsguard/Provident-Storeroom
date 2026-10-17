// RED SET — THE `A126` RE-DERIVATION. DRIVEN FROM THE RE-DERIVED SPECS ALONE; NO SOURCE BYTE IS WRITTEN,
// NO STUB IS SUBSTITUTED AND NOTHING UNDER `src/` IS TOUCHED.
//
// AUTHORITY, EACH CLAUSE NAMED BY ITS OWN HOME:
//   · `docs/decisions.md` · `A126` (2026-10-16, ACTIVE), VERBATIM: *"Two means of populating constraints:"* —
//     *"Batch supplied during the store creation"* — *"Added with package surface functions - overwrites if
//     ID already exists. Surface includes on/off to enable/disable, similar to listeners"*. Read with
//     `A122` (the engine is BEHIND the package surface; one `exports` arm), `A123` (the post-creation route
//     EXISTS and is reachable, and it is what makes the release `MINOR`), `A124` (the fifth position of
//     `write` is a commit), `A125` (an externally-supplied `commit` is an UNSUPPORTED anti-pattern).
//   · `docs/specs/storeroom-js/surface.md §2.12` — item 1 (the TWO routes: the BATCH at `storeCreate` and the
//     SURFACE FUNCTIONS after creation, neither substituting for the other), item 2 (the three signatures
//     and the arity `3`: `addConstraint(instance, pair, constraint) -> identity`,
//     `constraintOn(instance, pair, constraint) -> undefined`, `constraintOff(instance, pair, constraint) ->
//     undefined`), item 3 (the OPERATIVE arm table + the two toggle answers: the OVERWRITE, the two
//     IDEMPOTENT same-state toggles, and the toggle at a well-formed pair the entry does not carry), item 4
//     (the ONE refusal), item 5 (the identity and the `cfg.constraints` non-addition), item 6 (the moved
//     figures only).
//   · `surface.md §2.9` item 1's dated clause of 2026-10-16 — the namespace's operative enumeration,
//     `8 + 3 = 11`, with the superseded `+1` of `manageConstraints` NAMED as displaced.
//   · `surface.md §2.4` item 9 (f)'s dated clause of 2026-10-16 — the member set `4 + 3 = 7`.
//   · `surface.md §2.12` item 1's read-through clause of 2026-10-16 — the fail arm's crossing FORM is
//     declared: a thrown plain object of EXACTLY TWO members `{status, message}`, `status` a member of the
//     store's closed `16`, the kernel's `{status, message, log}` NOT crossing.
//   · `surface.md §2.6` (whose operative law is `§2.12` item 1) and `surface.md §2.2` clause 5 — the write
//     path and the fifth-position anti-pattern.
//   · `parameter-semantics.md` — `PAR-JS-21` (`cfg.constraints`, settled: `{ address, id }` is the pair's
//     KEY and the element carries the constraint FUNCTION), `PAR-JS-22` (`constraint`), `PAR-JS-23`
//     (`instance`), `PAR-JS-24` (`pair`) and `PAR-JS-25` (the returned identity, "equal to itself on a
//     SECOND `addConstraint` at the SAME pair (the overwrite arm)").
//   · `docs/specs/storeroom-publish/distribution.md §2.1` item 6 (the `files` allowlist's FOUR entries, the
//     kernel at `src/constraint-kernel.mjs` package-root-relative) and item 5 (the `LICENSE`-row
//     prohibition, still in force).
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE NAMESPACE (`§2.9` item 1's dated clause, `8 + 3 = 11`): the eleven declared names · the eight verbs
//   UNMOVED · the superseded `manageConstraints` ABSENT · `settle` still NOT a named export · `findAddress`
//   still unexposed · neither bare `on` nor bare `off` a module-namespace name.
// THE MEMBER SET (`§2.4` item 9 (f)'s dated clause, `4 + 3 = 7`): the seven own members · the four UNMOVED ·
//   the three own, enumerable and of arity `3` · the superseded `manageConstraints` ABSENT from the
//   instance's own set too.
// ROUTE (i), THE BATCH (`§2.12` item 1 (i); `PAR-JS-21`'s pair clause of this date): a `cfg.constraints`
//   element `{ address, id, constraint }` · the pair's PASSING function → the write proceeds and the body
//   ran INSIDE the call · its REFUSING function → the write is refused.
// ROUTE (ii), THE SURFACE FUNCTIONS (`§2.12` items 2–3): `addConstraint` at a pair NOT held → the identity ·
//   the element the entry then carries IS the supplied function, and its body runs on the next write ·
//   `addConstraint` at a pair HELD → OVERWRITE: nothing thrown, the SAME identity, the element REPLACED ·
//   two pairs → two distinguishable identities · `constraintOff` over an ENABLED pair → `undefined`, the
//   write accepted and the body not run again · `constraintOn` over that DISABLED pair → `undefined`, the
//   same element evaluated again · `constraintOff` at an already-DISABLED pair and `constraintOn` at an
//   already-ENABLED pair → IDEMPOTENT SUCCESS, `undefined`, nothing thrown, state and element unmoved ·
//   the third position at a toggle → REQUIRED, and a NO-OP on every success (the entry never substitutes
//   the caller's argument for its own element).
// THE WRITE PATH (`§2.12` item 1, whose operative law is `§2.6`'s): a four-position `write` enters the
//   kernel's `K-2` and the constraint at that address is evaluated INSIDE the call · the PASSING arm
//   returns the three-member record and delivers the listeners · the FAILING arm reports the refusal and
//   delivers NO listener of the failing write.
// FAIL-STATES (`§2.12` item 4; `PAR-JS-22`/`PAR-JS-23`/`PAR-JS-24`'s outside-value cells): the `instance`
//   position — ABSENT · `null` · `undefined` · a non-object (`number` · `string` · `boolean` · `symbol` ·
//   `bigint` · a function) · an object that is not the one `storeCreate` returned (the plain pair, an empty
//   object and the pair itself included). **AND THE ONE ENTRY THAT CELL ONCE CARRIED IS WITHDRAWN BY THE
//   SUPERVISOR'S DETERMINATION OF 2026-10-16 (`archive/reviews/2026-10-16-constraints-publication-gate1.md
//   §21`): *"an instance another `storeCreate` call returned"* is a CATEGORY ERROR at this position, so the
//   `PAR-JS-23` `domain` cell now reads *"THE OBJECT `storeCreate` RETURNED — ONE PER CALL, AND ANY OF THEM
//   IS IN DOMAIN: the `instance` position is a SELECTOR over this package's own instance handles, not a
//   predicate over one particular call's product, so a call naming a handle ANOTHER `storeCreate` call
//   returned PROCEEDS and its act LANDS IN THAT INSTANCE'S REGISTRY"* — and the SELECTOR's own cell below
//   (`cp_instance_is_a_selector_…`) is the one drive of that positive semantics, never a refusal; the `pair` position — ABSENT · `null` · `undefined` · a non-object · a function ·
//   an array · an object whose `address` is ABSENT or outside `§1.5`'s segment array · an object whose `id`
//   is ABSENT or not a `string`; the `constraint` position — ABSENT · `null` · `undefined` · a number · a
//   string · a boolean · a symbol · a bigint · an object · an array · a `PAR-JS-8` listener handle — each
//   AT EVERY ONE OF THE THREE FUNCTIONS. EVERY ONE OF THEM: ONE `TypeError`, NO `status` member, NO code of
//   the store's closed `16`, and NOTHING CHANGED. AND ONE MORE STATE, defined only after creation: a
//   WELL-FORMED pair the entry does not carry, at either toggle → the same `TypeError`, and the entry is
//   NOT widened.
// THE ANTI-PATTERN (`§2.2` clause 5, unmoved): an external supply carrying a `pending` member → ADOPTED,
//   refused by nothing; one carrying no `pending` member → refused by `§2.4` item 9 (g)'s class test alone.
// THE ALLOWLIST (`distribution.md §2.1` items 5–6, unmoved): `files`' FOUR entries, the kernel at
//   `src/constraint-kernel.mjs` · one `exports` arm and no subpath · no `LICENSE` row.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE SUPERSEDED CELLS OF THE PREVIOUS FILE, EACH WITH ITS SUCCESSOR OR ITS REASON FOR NONE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// S1. `cp_a123_ninth_named_export_…` → RE-DERIVED as cell 1 (`ELEVEN`, `8 + 3 = 11`), whose count is the
//     operative one and whose enumeration names the three re-derived names; the absent
//     `manageConstraints` is asserted rather than left implicit.
// S2. `cp_a123_fifth_own_member_…` → RE-DERIVED as cell 2 (`SEVEN`, `4 + 3 = 7`).
// S3. `cp_a123_the_declared_arity_…` → RE-DERIVED as cell 3: the arity `3` stands, its THIRD position being
//     `constraint` and not `operation`.
// S4. `cp_arm_add_returns_the_pairs_constraint_identity` → RE-DERIVED as cells 6–8, which drive the ADD
//     route's whole observable: the CARRIED function (the gap `G1` named), the identity, and the overwrite's
//     same-identity clause.
// S5. `cp_arm_disable_…` / `cp_arm_enable_…` → RE-DERIVED as cells 9–10, whose subjects are the two NAMED
//     toggle functions and whose third position is supplied.
// S6. The old file's *"violated pre-condition"* rows had NO CELL and no successor is owed for the two the
//     re-derived item 3 answers by name: the `'add'`-at-a-held-pair throw is FALSIFIED by `A126` and its
//     successor is cell 7 (the OVERWRITE); the two same-state throws are WITHDRAWN and their successors are
//     cells 11–12 (IDEMPOTENT SUCCESS).
// S7. `cp_fail_outside_operation_…` → RE-DERIVED as cell 21, the third position's outside values. **THE
//     TWELVE `operation` STRING CELLS THEMSELVES (`'ADD'` · `'remove'` · `'delete'` · `'set'` · `''` and the
//     non-strings) HAVE NO SUCCESSOR: the `operation` position does not exist at the re-derived route, so
//     no value can be outside its domain** (`§2.12` item 2's re-derived clause; `RCA-8(g)`'s move-out).
// S8. `cp_fail_outside_pair_…` → RE-DERIVED as cell 20, driven at ALL THREE functions; the pair row's
//     ONE new state — a well-formed pair the entry does not carry — is cell 13. **AND
//     `cp_fail_outside_instance_…` → RE-DERIVED AS CELL 19, THE SELECTOR'S OWN CELL, POSITIVE AND NOT A
//     REFUSAL**, on the supervisor's determination recorded at
//     `archive/reviews/2026-10-16-constraints-publication-gate1.md §21`: `PAR-JS-23`'s `instance` position
//     is a SELECTOR over this package's own instance handles — *"any object `storeCreate` returned is in
//     its domain, and the act POPULATES THE REGISTRY OF THE INSTANCE NAMED"* — so the outside-value cell's
//     *"an instance another `storeCreate` call returned"* entry is WITHDRAWN AS A CATEGORY ERROR and the
//     cell is re-derived, NEVER DELETED; its ten remaining values still carry the duty at cell 19.
// S9. The write-path cells → RE-DERIVED as cells 15–16 (`§2.12` item 1), the fail arm's crossing form being
//     DECLARED by that item's read-through clause of this date, so the old cell's refusal to assert the
//     form is retired.
// S10. The two anti-pattern cells and the two allowlist cells are UNMOVED (cells 17–18, 22–23).
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// FINDINGS THIS FILE COULD NOT DERIVE FROM THE SPEC — each reported to the supervisor, none invented
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// G1. THE BATCH ROUTE'S FUNCTION AND THE ENTRY'S OWN SET. `§2.12` item 1 (i) settles that a batch element
//     carries its own constraint function; item 3's toggle pre-conditions (and `PAR-JS-24`'s second
//     declared answer) speak of *"the pair the ENTRY carries"* and of a *"THIRD population route"*. **NO
//     CLAUSE DECLARES WHETHER A PAIR POPULATED BY THE BATCH IS A PAIR "THE ENTRY CARRIES"** — so whether
//     the two toggles may name a batch-populated pair, and whether `addConstraint` at a batch pair is the
//     `HELD` arm (an overwrite) or a second population, are both UNDECLARED. NO CELL HERE NAMES A BATCH PAIR
//     AT ANY SURFACE FUNCTION: cells 4–5 read the batch route's own observable alone.
// G2. THE FUNCTIONLESS BATCH ELEMENT. `§2.12` item 1 (i) declares *"THE KEY IS THE ELEMENT'S ADDRESSING AND
//     THE FUNCTION IS THE ELEMENT'S SUBSTANCE; a pair with no function is not an element and is refused at
//     the store's own `ConstraintListInvalid`"*, while `PAR-JS-21`'s `domain` cell — which the same clause
//     declares UNMOVED — admits *"an ARRAY of PAIRS"* with no function. **THE TWO READINGS ARE NOT
//     RECONCILABLE FROM THIS CORPUS AND THE EXISTING PASSING CELLS TAKE THE SECOND:**
//     `bindings/js/test/file-tier-save.test.mjs`'s `fts_S_CONSTRAINTS_KEY_one_well_formed_pair_constructs_
//     and_the_pass_evaluates_it` (and its two-pair sibling) construct a store over `{ address, id }`
//     elements carrying NO function and expect an instance. REPORTED, NOT DRIVEN, AND NOT EDITED.
// G3. THE MEMBER THE FAIL ARM'S `status` CARRIES. `§2.12` item 1's read-through clause declares the failing
//     write's crossing form as *"a member of the store's closed `16`-member set"* and names NO member for a
//     constraint-refused write. Cell 16 therefore asserts the FORM and the MEMBERSHIP, and never the
//     identity of the code.
// G4. THE `message` HALF OF ITEM 4's PROHIBITION. Item 4's own read-through clause of this date disposes of
//     it explicitly: *"NO CELL OF `bindings/js/test/constraints-publication.test.mjs` IS MINTED BY THIS
//     CLAUSE AND NONE IS OWED BY IT"* — the prohibition carries the `status` member's ABSENCE as its whole
//     observable and no assertion over the string is derivable. Nothing of `message` is asserted here.
// G5. THE `JournalOp` OUTSIDE VALUE OF `PAR-JS-22`. The row names *"a `JournalOp` of `PAR-JS-13`'s domain"*
//     among the third position's outside values, and no verb of this surface returns one, so a drive cannot
//     obtain one through the declared route. The same class test is driven by the row's own *"an object"*
//     and *"an array"* cells, and no value is fabricated here.
// G6. THE `PAR-JS` SET'S OWN ARITHMETIC. `parameter-semantics.md §1`'s clause of this date prints
//     `23 + 3 = 26` ✓ at its head while its term-by-term re-count enumerates `15 + 1 × 10 = 25`, and
//     `§2.23`'s closing line points at a `§2.26` *"below"* that no heading of that file carries — the index
//     table's last row being `PAR-JS-25`. NO FIGURE OF THAT SET IS DRIVEN BY THIS FILE, which reads the
//     namespace's `11` and the member set's `7` at their own homes only.
//
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { storeCreate } from 'provident-storeroom';

import {
  makeStore, tag, capture, countingListener, assertStoreRefusal, STORE_CODES, noop, } from './constraint-kernel-helpers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);

// THE CLAIMED ENTRY, REACHED AS A CONSUMER REACHES IT — the self-reference through the package's own
// `exports` map (`package.md §3.1` item 2, `DD-24`).
const api = await import('provident-storeroom');

/**
 * **⟶ RESHAPED 2026-10-16 (`surface.md §2.9` item 1's `A127` CLAUSE and `§2.4` item 9 (f)'s `A127`
 * CLAUSE, both of 2026-10-16; `bindings/js/index.d.ts`).** THE NAMESPACE'S FIGURE IS `11 → 1` ✓ — THE
 * MODULE CARRIES `storeCreate` ALONE — and the OBJECT's member set is the operative TWELVE own members,
 * `10 + 1 + 1 = 12` ✓: the TEN store-reaching METHODS plus `register` and `settle`. The combined
 * `on(address, listener)` is MERGED AWAY — its home entry is minted by `listen` and its function placed by
 * `register` — and the LEADING `instance` POSITION of the three constraint members is DROPPED
 * (`8 → 1` ✓). The figures this file once printed (`ELEVEN`, `EIGHT`, `SEVEN_MEMBERS`, `FOUR_MEMBERS`,
 * the three-position arity) are the `A126` pass's reading and are superseded in place.
 */
const ONE = ['storeCreate'];
/** The TEN store-reaching methods the same clause declares, sorted — the object's own method set. */
const TEN_METHODS = ['addConstraint', 'constraintOff', 'constraintOn', 'delete', 'listen', 'read',
  'readLiteral', 'rollback', 'unlisten', 'write'];
const TWELVE_MEMBERS = ['addConstraint', 'constraintOff', 'constraintOn', 'delete', 'listen', 'read',
  'readLiteral', 'register', 'rollback', 'settle', 'unlisten', 'write'];
/** The ONE name the namespace leaves, read beside the ten methods it no longer carries. */
const EIGHT = ['storeCreate'];
/** The member the `A127` clause leaves UNMOVED beside the ten methods, sorted. */
const FOUR_MEMBERS = ['register', 'settle'];
/** The three constraint members — one subject each, now reached at the OBJECT and at no namespace. */
const THREE = ['addConstraint', 'constraintOn', 'constraintOff'];
/** The name the re-derivation DISPLACES, named once so its absence can be read (`§2.9`'s dated clause). */
const SUPERSEDED = 'manageConstraints';

/**
 * THE ONE REFUSAL `§2.12` item 4 DECLARES, read at the two members it names — and the one member it does
 * NOT declare is read for its ABSENCE only (`G4` above: the clause forbids "a `message` member of this
 * unit's own" and names no observable for it, so no assertion is taken on `message`).
 */
function assertNewRefusal(thrown, where) {
  assert.ok(thrown instanceof TypeError,
    `${where}: the refusal is an instance of \`TypeError\` and of nothing else (\`§2.12\` item 4; `
    + `\`PAR-JS-22\`/\`PAR-JS-23\`/\`PAR-JS-24\`'s declared-answer cells) — read `
    + `${thrown && thrown.constructor && thrown.constructor.name}`);
  assert.equal('status' in thrown, false,
    `${where}: and its \`status\` member is ABSENT — the three functions MINT NO CODE (\`§2.12\` item 4)`);
  assert.equal(STORE_CODES.includes(thrown.status), false,
    `${where}: and no code of the store's closed ${STORE_CODES.length} is carried either — the closed set `
    + 'stands UNTOUCHED by the three functions (`§2.12` item 4; `contract.md §0.1` item 9)');
}

/** The pair `PAR-JS-24` declares at the three functions: `{ address, id }`, `address` inside `§1.5`'s array. */
function pair(label, id) {
  return { address: [tag(label)], id };
}

/** A constraint body that PASSES (`kernel-surface.md §2.3` item 1: `true` is the only pass value). */
function passing(body) {
  return function constraintPass() {
    body.runs += 1;
    body.argc = arguments.length;
    return true;
  };
}

/** A constraint body that REFUSES (`kernel-surface.md §2.3` item 1: `{ message }`, the unrepairable arm). */
function refusing(body) {
  return function constraintRefuse() {
    body.runs += 1;
    body.argc = arguments.length;
    return { message: 'this landing is refused while the constraint stands ENABLED' };
  };
}

const counter = () => ({ runs: 0, argc: null });

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §1  THE ELEVEN NAMED EXPORTS AND THE SEVEN OWN MEMBERS — `§2.9` item 1 and `§2.4` item 9 (f), both dated
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_a126_eleven_named_exports_the_module_namespace_is_the_eleven_declared_names', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.9` item 1's `A127` clause): THE NUMBER THIS CELL'S OWN NAME
  // CARRIES IS THE `A126` PASS'S READING AND IS SUPERSEDED IN PLACE — *"THE MODULE NAMESPACE CARRIES ONE
  // NAME, `storeCreate`"* (`11 → 1` ✓) — while THE CELL'S SUBJECT IS UNMOVED: the enumeration is exactly
  // what the clause declares and nothing else is smuggled in.** The name is kept at its as-filed bytes so
  // the red set's rows still point here.
  const names = Object.keys(api).sort();
  assert.deepEqual(names, ONE,
    '`§2.9` item 1\'s `A127` clause of 2026-10-16: the operative enumeration is `storeCreate` ALONE — '
    + 'the ten store-reaching names are METHODS of the object that call returned and are NOT namespace names '
    + '(`11 → 1`)');
  assert.equal(names.length, 1, 'the count is ONE (`11 → 1`) and the ten methods appear in it NOWHERE');
  for (const name of TEN_METHODS) {
    assert.equal(names.includes(name), false,
      `and \`${name}\` is NOT a name of this namespace — it is an own member of the object the one name `
      + 'returns');
  }
  // THE SUPERSESSION IS READ AS AN ABSENCE, SO THE COUNT CANNOT BE SATISFIED BY KEEPING THE OLD NAME AND
  // ADDING THREE MORE: the `+1` of `manageConstraints` is displaced by that clause and by no other.
  assert.equal(names.includes(SUPERSEDED), false,
    'the superseded `manageConstraints` is NOT a name of this namespace — "the `+1` of `manageConstraints` '
    + 'is displaced by this clause and by no other, so the count does not accumulate two readings of one '
    + 'route" (`§2.9` item 1\'s dated clause; `A126`)');
  // THE THREE ABSENCES THE SAME ITEM CARRIES, READ SO THE COUNT CANNOT BE SATISFIED BY AN EXTRA NAME.
  assert.equal(names.includes('settle'), false, '`settle` is NOT a named export');
  assert.equal(names.includes('findAddress'), false, '`findAddress` is NOT exposed');
  assert.equal(names.includes('on'), false,
    'and neither bare `on` nor bare `off` is a module-namespace name — nor a member of any product at all: '
    + 'the pair is MERGED AWAY by the `A127` clause and its home entry is minted by `listen`, its function '
    + 'placed by `register` (`§2.4` item 9 (f)\'s `A127` clause)');
  assert.equal(names.includes('off'), false, 'the same prohibition, read at `off`');
});

test('cp_a126_seven_own_members_the_storecreate_object_carries_seven_own_members', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): THE NUMBER THIS CELL'S OWN NAME
  // CARRIES IS THE `A126` PASS'S READING AND IS SUPERSEDED IN PLACE — the operative declared member set is
  // THE TWELVE OWN MEMBERS, `10 + 1 + 1 = 12` ✓, the TEN METHODS plus `register` and `settle` — while THE
  // CELL'S SUBJECT IS UNMOVED: the set is exactly what the clause declares and no name is smuggled in.**
  const inst = makeStore();
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    '`§2.4` item 9 (f)\'s `A127` clause of 2026-10-16: the operative declared member set is the TEN '
    + 'store-reaching methods plus `register` and `settle` — TWELVE own members, `10 + 1 + 1 = 12`');
  for (const [label, name] of [['the registration site', 'register'], ['the ordering seam', 'settle']]) {
    assert.equal(typeof inst[name], 'function', `${label} \`${name}\` is UNMOVED in the same set`);
  }
  assert.equal(FOUR_MEMBERS.length, 2, 'and the two the clause leaves unmoved beside the ten are exactly those two');
  for (const name of TEN_METHODS) {
    assert.equal(typeof inst[name], 'function',
      `and \`${name}\` is an own member of the factory's own product`);
  }
  for (const name of ['on', 'off']) {
    assert.equal(Object.getOwnPropertyNames(inst).includes(name), false,
      `and the MERGED-AWAY \`${name}\` is NOT a member of this product at all — the pair's home entry is `
      + 'minted by `listen` and its function placed by `register`, and no third route exists '
      + '(`§2.4` item 9 (f)\'s `A127` clause)');
  }
  assert.equal(Object.getOwnPropertyNames(inst).includes(SUPERSEDED), false,
    'and the superseded `manageConstraints` is NOT a member of this product either — the set is TWELVE and '
    + 'not TWELVE PLUS ONE');
  for (const name of TEN_METHODS) {
    const descriptor = Object.getOwnPropertyDescriptor(inst, [name][0]);
    assert.ok(descriptor !== undefined && descriptor.enumerable === true,
      `and \`${name}\` is an OWN, enumerable property of that product, on the standing the other members have`);
  }
});

test('cp_a126_the_declared_arity_is_three_positions_instance_pair_constraint', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 2 (a)'s operative signature block; `§2.4` item 9 (f)'s
  // `A127` clause): THE FIGURE THIS CELL'S OWN NAME CARRIES IS THE `A126` PASS'S READING AND IS SUPERSEDED IN
  // PLACE — THE LEADING `instance` POSITION IS DROPPED, so the declared arity of each of the three members is
  // TWO, `(pair, constraint)` — while THE CELL'S SUBJECT IS UNMOVED: each arity is read off the declared
  // signature and neither two-nor-four may drift.** The name is kept at its as-filed bytes so the red set's
  // rows still point here; the third position is `constraint` and NOT an `operation` position, and that
  // prohibition is read at the dropped-position cell below.
  const inst = makeStore();
  for (const name of THREE) {
    assert.equal(typeof inst[name], 'function',
      `the surface member \`${name}\` exists before its arity can be read (\`§2.12\` item 2)`);
    assert.equal(inst[name].length, 2,
      `the declared arity of \`${name}\` is TWO — \`pair\`, \`constraint\` — the LEADING \`instance\` `
      + 'position having been DROPPED (`§2.4` item 9 (f)\'s `A127` clause; `8 → 1`)');
    assert.equal(api[name], undefined,
      `and \`${name}\` is reached at NO position of the module namespace: the namespace carries `
      + '`storeCreate` alone (`§2.9` item 1\'s `A127` clause; `11 → 1`)');
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §2  THE TWO ROUTES — `§2.12` item 1: NEITHER SUBSTITUTES FOR THE OTHER
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_route_batch_a_constraint_the_construction_supplied_is_evaluated_by_the_pass', () => {
  // ROUTE (i), AT ITS OWN WORDS: *"`cfg`'s FOURTH declared key carries a LIST OF ELEMENTS, one element per
  // `{ address, id }` PAIR, and each element carries that pair's constraint FUNCTION alongside its KEY"*
  // (`§2.12` item 1 (i); `PAR-JS-21`'s pair clause of this date) — and `PAR-JS-21`'s `observable` cell: *"a
  // store constructed with a well-formed list, WHICH THE KERNEL'S PASS THEN EVALUATES"*.
  const address = [tag('cp-batch-pass')];
  const body = counter();
  const inst = storeCreate({
    journalLength: 8,
    listeners: [],
    constraints: [{ address, id: 'b1', constraint: passing(body) }],
  });
  assert.equal(typeof inst, 'object', 'a store whose batch element carries its own function constructs');
  const r = capture(() => inst.write(address, 'mem', 1));
  assert.equal(body.runs >= 1, true,
    'THE BATCH ROUTE\'S OWN FUNCTION IS EVALUATED: the element\'s body ran at that pair inside the call '
    + `(\`§2.12\` item 1 (i) and (1); \`PAR-JS-21\`'s observable) — it ran ${body.runs} time(s)`);
  assert.equal(r.threw, false, 'and its PASSING answer lets the write proceed');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'the accepted write is the declared three-member record (`§2.2`\'s signature block)');

  // AND THE SAME ROUTE'S REFUSING ARM, SO THE EVALUATION CANNOT BE SATISFIED BY A BODY THAT IS NEVER
  // ANSWERED: a batch element whose function refuses refuses ITS OWN write.
  const refusingAddress = [tag('cp-batch-refuse')];
  const refusingBody = counter();
  const other = storeCreate({
    journalLength: 8,
    listeners: [],
    constraints: [{ address: refusingAddress, id: 'b2', constraint: refusing(refusingBody) }],
  });
  const refused = capture(() => other.write(refusingAddress, 'mem', 2));
  assert.equal(refusingBody.runs >= 1, true,
    'the batch element at that second pair was evaluated too, so the first cell is not a coincidence of '
    + 'one store');
  assert.equal(refused.threw, true,
    'and the refusal its own function returned refused the write (`§2.12` item 3\'s ADD row reads the same '
    + 'pass: "a write the constraint refuses on its FIRST evaluation is refused")');
});

test('cp_route_batch_and_surface_are_two_routes_and_neither_substitutes_for_the_other', () => {
  const batchAddress = [tag('cp-two-routes-batch')];
  const surfaceAddress = [tag('cp-two-routes-surface')];
  const batchBody = counter();
  const surfaceBody = counter();
  const inst = storeCreate({
    journalLength: 8,
    listeners: [],
    constraints: [{ address: batchAddress, id: 'br', constraint: passing(batchBody) }],
  });
  assert.equal(typeof inst.addConstraint, 'function',
    'the surface route exists before the two routes can be read apart (`§2.12` item 2)');
  inst.addConstraint({ address: surfaceAddress, id: 'sr' }, passing(surfaceBody));
  const atBatch = capture(() => inst.write(batchAddress, 'mem', 1));
  assert.equal(atBatch.threw, false, 'PREMISE: the batch pair\'s passing function lets its write proceed');
  assert.equal(batchBody.runs >= 1, true,
    'the BATCH route\'s element is evaluated at its own pair (`§2.12` item 1 (i))');
  assert.equal(surfaceBody.runs, 0,
    'and the SURFACE route\'s element is NOT evaluated at another pair\'s address — the two routes are two '
    + 'elements at two keys and never one set');
  const atSurface = capture(() => inst.write(surfaceAddress, 'mem', 2));
  assert.equal(atSurface.threw, false, 'PREMISE: the surface pair\'s passing function lets its write proceed');
  assert.equal(surfaceBody.runs >= 1, true,
    'and the SURFACE route\'s element is evaluated at ITS own pair (`§2.12` item 1 (ii) and item 2 (b))');
  assert.equal(batchBody.runs, 1,
    'and the add performed after creation did not disturb the batch pair\'s element: "A store whose only '
    + 'constraints came from the batch has, by that fact alone, no post-creation route exercised; a store '
    + 'whose constraints were added after creation has, by that fact alone, no batch element" '
    + '(`§2.12` item 1 (iii) — NEITHER SUBSTITUTES FOR THE OTHER)');
});

test('cp_route_surface_the_add_route_carries_the_function_the_pass_evaluates', () => {
  // THE GAP THE PREVIOUS RED SET REPORTED AS `G1` IS CLOSED BY `A126`: *"AN ADDED CONSTRAINT'S FUNCTION
  // COMES FROM THE ADD ROUTE'S OWN ARGUMENT"* (`§2.12` item 2 (b); `PAR-JS-22`'s `supplier` cell: *"THIS IS
  // THE ONE SUPPLY OF A POST-CREATION CONSTRAINT'S FUNCTION"*). SO THE SUPPLIED BODY IS DRIVEN HERE, and
  // the previous file's refusal to drive it is retired with the gap it named.
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before the function it carries can be driven (`§2.12` item 2)');
  const thePair = pair('cp-add-carries', 'ac1');
  const body = counter();
  const identity = inst.addConstraint(thePair, refusing(body));
  assert.notEqual(identity, undefined,
    '`addConstraint` returns the pair\'s constraint identity (`§2.12` item 3; `PAR-JS-25`)');
  assert.equal(body.runs, 0, 'PREMISE: the body has not run yet — nothing has written at that pair');
  const r = capture(() => inst.write(thePair.address, 'mem', 7));
  assert.equal(body.runs >= 1, true,
    'THE SUPPLIED FUNCTION\'S BODY RUNS AT THAT PAIR ON THE NEXT WRITE — the element the entry carries '
    + `there IS the third argument of the call above (\`§2.12\` item 2 (b); \`PAR-JS-22\`'s observable) — it `
    + `ran ${body.runs} time(s)`);
  assert.equal(body.argc, 1,
    'and it was invoked with ONE argument, the attempt context (`kernel-surface.md §2.3` item 1)');
  assert.equal(r.threw, true,
    'and the refusal it returned refused the write, which `§2.12` item 3\'s ADD row orders "before item 1\'s '
    + 'stage 2\'s store leg is taken"');
  const back = capture(() => inst.read(thePair.address, 'mem'));
  assert.ok(back.threw === true || back.value !== 7,
    'the refused write does not stand: the address does not answer the value the write carried');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE OVERWRITE AND THE IDENTITY — `§2.12` item 3's ADD row; `PAR-JS-25`'s domain and observable
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_add_at_a_held_pair_overwrites_and_throws_nothing', () => {
  // THE CELL `A126` FALSIFIES, RE-DERIVED AND NOT QUIETLY DELETED: *"where the pair was already held, the
  // supplied constraint OVERWRITES the held one ... and the call REFUSES NOTHING AND THROWS NOTHING for the
  // mere fact that the pair was held"* (`§2.12` item 3's ADD row). The superseded row declared this state a
  // THROW of the one `TypeError`; the ruling's own words are *"overwrites if ID already exists"*.
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before its overwrite arm can be driven (`§2.12` item 2)');
  const thePair = pair('cp-overwrite-silent', 'ow1');
  const held = counter();
  inst.addConstraint(thePair, refusing(held));
  assert.equal(held.runs, 0, 'PREMISE: the held element has not been evaluated yet');
  const second = capture(() => inst.addConstraint(thePair, passing(counter())));
  assert.equal(second.threw, false,
    'THE SECOND ADD AT A HELD PAIR THROWS NOTHING — the overwrite is the declared answer and the throw the '
    + 'previous pass landed is FALSIFIED by `A126` (`§2.12` item 3; `PAR-JS-22`\'s `alt` cell names "A '
    + 'REFUSAL OF A HELD PAIR instead of the overwrite" as the cell the ruling falsifies)');
  assert.notEqual(second.value, undefined,
    'and it answers the pair\'s identity rather than `undefined` — every success of the ADD route does '
    + '(`§2.12` item 3; `PAR-JS-25`)');
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and the overwrite added no member to the instance: it replaces the ELEMENT at a key, and the key was '
    + 'already there (`§2.12` item 5; `§2.4` item 9 (f)\'s dated clause)');
});

test('cp_add_at_a_held_pair_overwrites_the_held_element_and_returns_the_same_identity', () => {
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before its overwrite arm can be driven (`§2.12` item 2)');
  const thePair = pair('cp-overwrite-2', 'ow2');
  const held = counter();
  const supplied = counter();
  const first = inst.addConstraint(thePair, refusing(held));
  assert.notEqual(first, undefined, 'PREMISE: the first add answers the pair\'s identity');
  const second = inst.addConstraint(thePair, passing(supplied));
  assert.equal(second, first,
    'THE OVERWRITE MINTS NO SECOND IDENTITY: *"the returned identity is the SAME identity the pair was '
    + 'already added under — the element is REPLACED and the identity is NOT"* (`PAR-JS-25`\'s `domain` cell, '
    + 'whose `observable` reads the same rule: *"equal to itself on a SECOND `addConstraint` at the SAME '
    + 'pair (the overwrite arm)"*)');
  const r = capture(() => inst.write(thePair.address, 'mem', 1));
  assert.equal(supplied.runs >= 1, true,
    'and THE SUPPLIED FUNCTION IS THE ELEMENT FROM THIS CALL ON: its body ran at the next write '
    + `(\`§2.12\` item 3's ADD row) — it ran ${supplied.runs} time(s)`);
  assert.equal(held.runs, 0,
    'and the HELD function is no longer the pair\'s element: its body never ran (the same row: *"the element '
    + 'this entry carries at that key IS the supplied function from this call on"*)');
  assert.equal(r.threw, false,
    'and the supplied PASSING element let the write proceed — a refusal here would mean the HELD element '
    + 'still stood');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'and the accepted write answers the declared three-member record (`§2.2`\'s signature block)');
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and neither call changed the instance\'s own member set (`§2.12` item 5; `§2.4` item 9 (f))');
});

test('cp_add_at_a_second_pair_returns_an_identity_distinguishable_from_the_first', () => {
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before two pairs can be added (`§2.12` item 2)');
  const one = inst.addConstraint(pair('cp-add-1', 'a1'), passing(counter()));
  const two = inst.addConstraint(pair('cp-add-2', 'a2'), passing(counter()));
  assert.notEqual(one, undefined, 'the first pair\'s arm returns its own identity (`PAR-JS-25`)');
  assert.notEqual(two, undefined, 'and the second pair\'s arm returns its own');
  // `PAR-JS-25`'s `domain` cell: ONE OPAQUE VALUE the package owns, "equal to and distinguishable from no
  // other identity by any rule this unit declares beyond the PAIR it was minted at". TWO PAIRS ARE TWO
  // RULES' WORTH OF DISTINCTION, so the two values are not one value. **NOTHING ELSE OF THE IDENTITY IS
  // READ**: `§2.12` item 5 declares no spelling for it, no accessor reaching a member of it, and "a drive
  // compares identities and never contents".
  assert.notEqual(one, two,
    'two identities minted at two pairs are distinguishable (`PAR-JS-25`\'s `domain` cell)');
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and the two arms changed no member of the instance (`§2.12` item 5: the identity is not `cfg.constraints`)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §4  THE TOGGLE PAIR — `§2.12` item 3, ITS TWO ANSWERS AND ITS TWO IDEMPOTENT CELLS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_toggle_off_returns_undefined_and_a_write_it_would_have_refused_is_accepted', () => {
  const inst = makeStore();
  assert.equal(typeof inst.constraintOff, 'function',
    'the DISABLE half exists before it can be driven (`§2.12` item 2)');
  const thePair = pair('cp-off', 'd1');
  const body = counter();
  inst.addConstraint(thePair, refusing(body));
  const before = capture(() => inst.write(thePair.address, 'mem', 1));
  assert.equal(before.threw, true, 'PREMISE: the added element stands ENABLED and refuses the write');
  const at = body.runs;
  assert.equal(inst.constraintOff(thePair, refusing(body)), undefined,
    '`constraintOff` returns `undefined` (`§2.12` item 3, the `constraintOff` row\'s observable cell)');
  const after = capture(() => inst.write(thePair.address, 'mem', 2));
  assert.equal(after.threw, false,
    'AND A WRITE THE DISABLED CONSTRAINT WOULD HAVE REFUSED IS ACCEPTED — the same landing, the same '
    + 'address, the element standing in the set and NOT evaluated (`§2.12` item 3)');
  assert.deepEqual(Object.keys(after.value ?? {}).sort(), ['op', 'triggered', 'watched'],
    'and the accepted write is the declared three-member record (`§2.2`\'s signature block)');
  assert.equal(body.runs, at,
    'and the element is NOT evaluated on that subsequent write — the body did not run again');
});

test('cp_toggle_on_returns_undefined_and_the_same_element_is_evaluated_again', () => {
  const inst = makeStore();
  assert.equal(typeof inst.constraintOn, 'function',
    'the ENABLE half exists before it can be driven (`§2.12` item 2)');
  const thePair = pair('cp-on', 'e1');
  const body = counter();
  const element = refusing(body);
  inst.addConstraint(thePair, element);
  inst.constraintOff(thePair, element);
  const parked = capture(() => inst.write(thePair.address, 'mem', 1));
  assert.equal(parked.threw, false, 'PREMISE: the disabled element does not refuse the write');
  const at = body.runs;
  assert.equal(inst.constraintOn(thePair, element), undefined,
    '`constraintOn` returns `undefined` (`§2.12` item 3, the `constraintOn` row\'s observable cell)');
  const again = capture(() => inst.write(thePair.address, 'mem', 2));
  assert.equal(again.threw, true, 'AND THE ELEMENT IS EVALUATED AGAIN ON THE NEXT WRITE (`§2.12` item 3)');
  assert.equal(body.runs, at + 1,
    'and IT IS THE ELEMENT THAT WAS DISABLED AND NOT A SECOND CONSTRAINT: ONE body runs, the one the entry '
    + 'carried at that pair (`§2.12` item 3)');
});

test('cp_toggle_off_at_an_already_disabled_pair_is_idempotent_success', () => {
  // `§2.12` item 3's first answered question: *"A TOGGLE REACHED WHERE THE PAIR ALREADY STANDS IN THE STATE
  // THE TOGGLE ASKS FOR IS IDEMPOTENT SUCCESS: `constraintOn` at an ENABLED pair and `constraintOff` at a
  // DISABLED pair each return `undefined`, LEAVE THE PAIR'S STATE AND ITS ELEMENT EXACTLY AS THEY STOOD,
  // AND THROW NOTHING."* — the successor of a row the same clause WITHDRAWS.
  const inst = makeStore();
  assert.equal(typeof inst.constraintOff, 'function',
    'the DISABLE half exists before its idempotent cell can be driven (`§2.12` item 2)');
  const thePair = pair('cp-off-twice', 'i1');
  const body = counter();
  const element = refusing(body);
  inst.addConstraint(thePair, element);
  assert.equal(inst.constraintOff(thePair, element), undefined, 'PREMISE: the first DISABLE succeeds');
  const at = body.runs;
  const second = capture(() => inst.constraintOff(thePair, element));
  assert.equal(second.threw, false,
    'a second `constraintOff` at a pair that is already DISABLED THROWS NOTHING (`§2.12` item 3\'s first '
    + 'answered question: "the route WRITES THE STATES IT IS ASKED FOR rather than refusing to reach them")');
  assert.equal(second.value, undefined,
    'and it returns `undefined` like every success of the toggle (the same clause)');
  assert.equal(body.runs, at,
    'and the pair\'s state and its element stand EXACTLY as they stood: the disabled element was not '
    + 'evaluated on any write since');
  // THE ELEMENT'S OWN READ-BACK: the pair is still DISABLED and still carries THE SAME element, so the
  // enable half reaches it and that same body runs once more.
  const reEnabled = capture(() => inst.constraintOn(thePair, element));
  assert.equal(reEnabled.threw, false, 'and the pair is still a pair the entry carries, in its DISABLED state');
  const after = capture(() => inst.write(thePair.address, 'mem', 3));
  assert.equal(after.threw, true, 'and the SAME element refuses again once enabled');
  assert.equal(body.runs, at + 1, 'and it is the ONE element the entry carried that ran (`§2.12` item 3)');
});

test('cp_toggle_on_at_an_already_enabled_pair_is_idempotent_success', () => {
  const inst = makeStore();
  assert.equal(typeof inst.constraintOn, 'function',
    'the ENABLE half exists before its idempotent cell can be driven (`§2.12` item 2)');
  const thePair = pair('cp-on-twice', 'i2');
  const body = counter();
  const element = refusing(body);
  inst.addConstraint(thePair, element);
  const at = body.runs;
  const again = capture(() => inst.constraintOn(thePair, element));
  assert.equal(again.threw, false,
    '`constraintOn` at a pair that already stands ENABLED THROWS NOTHING (`§2.12` item 3\'s first answered '
    + 'question: "a caller that asks for a state the pair already carries gets that state, and the observable '
    + 'it asserts is the pair\'s state and never a throw")');
  assert.equal(again.value, undefined, 'and it returns `undefined` like every success of the toggle');
  assert.equal(body.runs, at, 'and no write has run the body in the meantime');
  const r = capture(() => inst.write(thePair.address, 'mem', 4));
  assert.equal(r.threw, true, 'and the pair\'s state and its element stand EXACTLY as they stood');
  assert.equal(body.runs, at + 1,
    'and ONE body runs — the element the entry carried — and never a second constraint (' + '`§2.12` item 3)');
});

test('cp_toggle_at_a_well_formed_pair_the_entry_does_not_carry_throws_and_widens_nothing', () => {
  // `§2.12` item 3's second answered question and `PAR-JS-24`'s second declared answer: *"A TOGGLE NAMING A
  // PAIR THE ENTRY DOES NOT CARRY — at either function, in either direction — IS AN OUTSIDE VALUE AND TAKES
  // `item 4`'s REFUSAL: ONE THROWN `TypeError`, the `status` member ABSENT, AND THE ENTRY IS NOT WIDENED."*
  const inst = makeStore();
  for (const [name, toggle] of [['constraintOn', 'constraintOn'], ['constraintOff', 'constraintOff']]) {
    assert.equal(typeof inst[toggle], 'function',
      `the \`${name}\` half exists before its no-implicit-add cell can be driven (\`§2.12\` item 2)`);
    const thePair = pair(`cp-not-carried-${toggle}`, 'n1');
    const body = counter();
    const element = refusing(body);
    const r = capture(() => inst[toggle](thePair, element));
    assert.equal(r.threw, true,
      `${name}: a well-formed pair the entry does not carry is OUTSIDE the domain and is refused — it is not `
      + 'a THIRD population route (`§2.12` item 3\'s second answered question)');
    assertNewRefusal(r.thrown, `${name} at a pair the entry does not carry`);
    // THE NON-WIDENING, DRIVEN AT ITS OWN OBSERVABLE: the SAME function was supplied to the refused toggle,
    // so had the entry been widened with it, an ENABLED pair would stand at that key and this write would
    // be refused by it. It must not be.
    const after = capture(() => inst.write(thePair.address, 'mem', 1));
    assert.equal(body.runs, 0,
      `${name}: and the entry was NOT WIDENED — the function the refused call carried never became an `
      + 'element, so its body never ran (the same clause: "it would leave a pair ENABLED WITH NO FUNCTION — '
      + 'a state no clause of this directory declares")');
    assert.equal(after.threw, false,
      `${name}: and the write at that address is accepted, so no enabled element stands at that key`);
    assert.deepEqual(Object.keys(after.value).sort(), ['op', 'triggered', 'watched'],
      `${name}: and the accepted write answers the declared three-member record`);
  }
});

test('cp_toggle_the_third_position_is_required_and_is_a_no_op_on_success', () => {
  // `§2.12` item 3's `constraintOn` row, clause: *"the third position is REQUIRED and is a NO-OP on every
  // success: the caller supplies as a FUNCTION the identity it holds at that pair; the entry NEVER
  // SUBSTITUTES ONE, and no identity the caller holds at a pair it carries is ever refused here — a value
  // that is not a function takes item 4's refusal on the ARGUMENT's ground and not on the pair's"*.
  const inst = makeStore();
  for (const name of THREE) {
    assert.equal(typeof inst[name], 'function',
      `the surface function \`${name}\` exists before its carrying rule can be driven (\`§2.12\` item 2)`);
  }
  const thePair = pair('cp-no-op', 'x1');
  const held = counter();
  const other = counter();
  const element = refusing(held);
  inst.addConstraint(thePair, element);
  const substitute = passing(other);
  assert.equal(inst.constraintOff(thePair, substitute), undefined,
    'a FUNCTION at the third position is never refused on the pair\'s ground, whatever function it is: '
    + '`constraintOff` answers `undefined`');
  const off = capture(() => inst.write(thePair.address, 'mem', 1));
  assert.equal(off.threw, false,
    'and the toggle took effect, so the pair stands DISABLED (`§2.12` item 3)');
  assert.equal(other.runs, 0,
    'and THE ENTRY NEVER SUBSTITUTED ONE: the caller\'s argument did not become the pair\'s element');
  assert.equal(inst.constraintOn(thePair, substitute), undefined,
    'and the ENABLE half answers `undefined` at the same pair with the same non-element argument');
  const on = capture(() => inst.write(thePair.address, 'mem', 2));
  assert.equal(on.threw, true, 'PREMISE: the pair stands ENABLED again');
  assert.equal(held.runs, 1,
    'and it is the ELEMENT THE ENTRY CARRIED that ran — never the argument the caller handed the toggle '
    + '(`§2.12` item 3: "it is the element the entry carried at that pair — never a second constraint and '
    + 'never a re-registration")');
  assert.equal(other.runs, 0, 'and the caller\'s argument never ran at any point');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §5  THE WRITE PATH — `§2.12` item 1, the operative law of `§2.6`: THE ENGINE IS BEHIND THE SURFACE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_write_path_a_four_position_write_enters_the_kernel_and_the_passing_arm_returns_the_three_member_record', () => {
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before the write path it feeds can be driven (`§2.12` item 2)');
  const thePair = pair('cp-write-pass', 'p1');
  const body = counter();
  inst.addConstraint(thePair, passing(body));
  const listener = countingListener();
  (inst.register(inst.listen(thePair.address), listener) || inst.listen(thePair.address));
  // `§2.12` item 1, STAGE 1: *"A `write` CALLED WITH FOUR POSITIONS — `write(instance, address, tier, value)`
  // — ENTERS THE KERNEL'S `K-2`"*, and stage 3: the kernel evaluates the constraint set against the store's
  // own result. **THE EVALUATION IS INSIDE THE CALL** — the superseded sentence *"evaluate constraints AFTER
  // a `write` returns"* is FALSIFIED BY ITEM 1 BY NAME.
  const r = capture(() => inst.write(thePair.address, 'mem', 5));
  assert.equal(body.runs >= 1, true,
    'the four-position write ENTERS the kernel: the element at this write\'s pair was EVALUATED INSIDE THE '
    + `CALL (\`§2.12\` item 1; \`§2.6\`'s operative law) — it ran ${body.runs} time(s)`);
  assert.equal(r.threw, false, 'so the write proceeds on the passing arm');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'and the caller receives the write\'s three-member record (`§2.2`\'s signature block)');
  assert.equal(listener.seen.length, 1,
    'and `Kernel → listeners → report success to the caller` is the declared ORDER of the passing arm: the '
    + 'listener of the write\'s own address was delivered (`§2.12` item 1; `§2.7` item 2)');
});

test('cp_write_path_the_failing_arm_reports_the_declared_two_member_form_and_delivers_no_listener', async () => {
  const inst = makeStore();
  assert.equal(typeof inst.addConstraint, 'function',
    'the ADD route exists before the failing arm can be driven (`§2.12` item 2)');
  const thePair = pair('cp-write-fail', 'r1');
  const body = counter();
  inst.addConstraint(thePair, refusing(body));
  const listener = countingListener();
  (inst.register(inst.listen(thePair.address), listener) || inst.listen(thePair.address));
  const r = capture(() => inst.write(thePair.address, 'mem', 7));
  assert.equal(body.runs >= 1, true, 'PREMISE: the element was evaluated inside the call and refused');
  assert.equal(r.threw, true,
    'the failing arm reports the failure to the package surface\'s caller (`§2.12` item 1\'s fail arm)');
  // **THE CROSSING FORM IS DECLARED BY THAT ITEM'S READ-THROUGH CLAUSE OF THIS DATE** — the previous red
  // set\'s `G3` (which asserted only *"the failure IS reported"*) is retired with it: *"WHAT CROSSES IS THE
  // SURFACE'S OWN TWO-MEMBER FORM — `{status, message}`, a THROWN PLAIN OBJECT OF EXACTLY THOSE TWO MEMBERS,
  // `status` a member of the store's closed `16`-member set and `message` the store's own text — AND WHAT
  // DOES NOT CROSS IS THE KERNEL'S THREE-MEMBER `{status, message, log}`"*. WHICH member the `status` carries
  // is NOT declared (`G3` above), so the membership alone is asserted.
  assert.deepEqual(Object.keys(r.thrown).sort(), ['message', 'status'],
    'the refusal is a thrown plain object of EXACTLY the surface\'s two members — no `log`, no third member '
    + '(`§2.12` item 1\'s read-through clause; `§2.5`\'s single form)');
  assertStoreRefusal(r.thrown, 'the failing arm\'s refusal');
  assert.equal('log' in r.thrown, false,
    'and the kernel\'s `log` member is the attempt\'s own record and reaches NO JS caller on this arm (the '
    + 'same clause, ground (1): the two members and the one log entry are ON TWO SIDES of the boundary)');
  assert.equal(listener.seen.length, 0,
    'and the failing write\'s listeners are NOT delivered (`§2.7` item 7 (d); `§2.12` item 1)');
  const back = capture(() => inst.read(thePair.address, 'mem'));
  assert.ok(back.threw === true || back.value !== 7,
    'and the rollback is the kernel\'s own act over the attempt\'s ops: the refused write does not stand');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §6  THE FIFTH-POSITION ANTI-PATTERN — `§2.2` clause 5, landed 2026-10-16 on `A125` (UNMOVED)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_anti_pattern_an_external_supply_carrying_no_pending_is_refused_by_the_class_test', () => {
  const inst = makeStore();
  const address = [tag('cp-ap-refused')];
  // THE CLASS TEST, AT ITS OWN WORDS: "an object position is a record position only where it CARRIES A
  // `pending` MEMBER whose value is present and not `undefined`" (`§2.4` item 9 (g) item 1).
  for (const [where, supply] of [
    ['the empty object', {}],
    ['an object whose `pending` member is ABSENT', { op: 1 }],
    ['an object whose `pending` member is `undefined`', { pending: undefined }],
    ['a non-object scalar', 7],
    ['an array', []],
    ['a function', () => {}],
  ]) {
    const r = capture(() => inst.write(address, 'mem', 1, supply));
    assert.equal(r.threw, true, `${where} is refused: it is not a record position (\`§2.20\`'s outside row)`);
    assert.ok(r.thrown instanceof TypeError,
      `${where}: refused by the position's OWN class test — ONE class, \`TypeError\` (\`§2.4\` item 9 (b); `
      + '`§2.2` clause 5 item 3)');
    assert.equal('status' in r.thrown, false,
      `${where}: and \`status\` is ABSENT — the position mints no code, being a CLASS TEST and not an `
      + 'identity test (`§2.2` clause 5: "IS NOT REFUSED BY A NAMED CODE")');
  }
  // AND THE REFUSED SHAPES LEFT NO LANDING — the write does not proceed (`§2.20`'s answer cell).
  const back = capture(() => inst.read(address, 'mem'));
  assert.ok(back.threw === true || back.value !== 1,
    'a refused position stops the write: no store call was reached and no value landed');
});

test('cp_anti_pattern_an_external_supply_carrying_pending_is_adopted_and_refused_by_nothing', () => {
  const inst = makeStore();
  const address = [tag('cp-ap-adopted')];
  // `§2.2` clause 5, ITEM 3: "AN EXTERNAL SUPPLY IS NOT REFUSED BY ARITY, IS NOT REFUSED BY A NAMED CODE,
  // AND IS NOT DETECTED BY A TEST THIS UNIT DECLARES ... WHILE ONE THAT DOES CARRY a `pending` member is
  // ADOPTED at its first call by `§2.4` item 9 (g)'s own admission". **THIS IS THE ANTI-PATTERN'S DECLARED
  // CONSEQUENCE, DRIVEN AS THE NON-REFUSAL IT IS: the position is legal, the write proceeds, and no code
  // is minted for the case.** The clause declares no third arm and mints no code for it.
  const r = capture(() => inst.write(address, 'mem', 3, { pending: [] }));
  assert.equal(r.threw, false,
    'a caller-authored object carrying a `pending` member is NOT refused — by no arity reading, by no '
    + 'provenance and by no named code (`§2.2` clause 5 item 3; `A125`)');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'and the write answers the declared three-member record, so the anti-pattern is a SUPPORTED SHAPE of '
    + 'the call and an UNSUPPORTED use of it — never a throw and never a silent degradation');
  assert.equal(STORE_CODES.includes(r.value?.op?.status), false,
    'and no store code is minted for the anti-pattern\'s own case (`§2.2` clause 5 item 3)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §7  THE THREE POSITIONS' OUTSIDE VALUES — `§2.12` item 4; `PAR-JS-22`, `PAR-JS-23` and `PAR-JS-24`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_fail_outside_instance_is_one_typeerror_at_every_value_that_remains_outside', () => {
  // **⟶ RE-DERIVED 2026-10-16 (`parameter-semantics.md §2.23`'s VACATED row of 2026-10-16; `A127`;
  // `surface.md §2.12` item 4's `A127` clause; `§2.4` item 9 (f)'s `A127` clause).** **THE POSITION THIS
  // CELL'S NAME NAMES NO LONGER EXISTS AT ANY CALL OF THIS SURFACE — *"THE `instance` POSITION CEASES TO
  // EXIST AT EVERY CALL OF THIS SURFACE, because THE RECEIVER IS THE STORE"* — so the cell's subject moves
  // to the reading the clause leaves and its name is kept at its as-filed bytes.** The two positions that
  // DO exist at each of the three methods are `pair` and `constraint`, and NO CALL SHAPE carries an
  // instance at any position: a call whose first argument is an INSTANCE object lands that object at the
  // `pair` position, where it is an outside value and takes item 4's one thrown `TypeError`.
  const inst = makeStore();
  const other = makeStore();
  const thePair = pair('cp-inst', 'i1');
  const otherPair = pair('cp-inst', 'i2');
  other.addConstraint(otherPair, passing(counter()));
  // THE CALLER'S OWN MEMBER SET AND THE MODULE NAMESPACE STAND BEFORE THE REFUSALS, so a refusal that
  // minted a member or a name would be read at the same cell.
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'PREMISE: the product carries its TWELVE declared own members (`10 + 1 + 1 = 12`)');
  assert.equal(Object.keys(api).length, 1, 'PREMISE: the module namespace carries its ONE name (`11 → 1`)');
  const OUTSIDE = [
    ['`null`', null], ['`undefined`', undefined], ['a number', 1], ['a string', 'instance'],
    ['a boolean', true], ['a symbol', Symbol('instance')], ['a bigint', 1n], ['a function', () => {}],
    ['a pair whose `id` is outside its domain', { address: thePair.address, id: 1 }],
    ['a pair whose `address` is outside the domain', { address: 'a.b', id: 'i1' }],
    ['an object that is not the one `storeCreate` returned', {}],
    // AND THE ONE VALUE THE VACATED POSITION WOULD HAVE CARRIED: an instance object stands at the `pair`
    // position now, and THAT is why it is refused here — as an outside `pair`, never as a foreign instance.
    ['another instance object, now standing at the `pair` position', other],
  ];
  for (const name of THREE) {
    for (const [where, value] of OUTSIDE) {
      const r = capture(() => inst[name](value, passing(counter())));
      assert.equal(r.threw, true,
        `\`${name}\`: \`pair\` = ${where} is OUTSIDE the position's domain and the call carries no `
        + 'instance position at which it could have been read otherwise (`PAR-JS-24`; `§2.12` item 4)');
      assertNewRefusal(r.thrown, `\`${name}\` \`pair\` = ${where}`);
    }
    // THE ABSENT POSITION: TWO positions declared and fewer supplied — the declared answer is item 4's
    // refusal, because neither position is optional, and there is no third position to shift into.
    assertNewRefusal(capture(() => inst[name](thePair)).thrown,
      `\`${name}\`: the \`constraint\` position ABSENT`);
    assertNewRefusal(capture(() => inst[name]()).thrown, `\`${name}\`: BOTH declared positions ABSENT`);
    assert.equal(inst[name].length, 2,
      `and the declared arity of \`${name}\` is TWO, so no position of it can be read as an instance `
      + '(`§2.12` item 2 (a)\'s operative signature; `8 → 1`)');
  }
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and the refusals on a value outside the domain changed nothing of this instance');
  assert.equal(Object.keys(api).length, 1,
    'and the module namespace stands at its ONE declared name (`11 → 1`), so no refusal minted a name');
});

test('cp_instance_is_a_selector_the_act_lands_in_the_registry_of_the_instance_named', () => {
  // **⟶ RE-DERIVED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause and `§2.12` item 4's clause of
  // that date; `parameter-semantics.md §2.23`'s VACATED row).** **THE CELL'S SUBJECT IS UNMOVED — THE ACT
  // LANDS IN THE REGISTRY OF THE INSTANCE NAMED AND IN NO OTHER — AND WHAT MOVED IS HOW THE INSTANCE IS
  // NAMED: *"the receiver IS the store"*, so the instance is named BY THE RECEIVER and no position carries
  // it.** The `PAR-JS-23` selector determination is therefore read here as an UNSATISFIABLE-SHAPE cell that
  // is DRIVEN as its own falsification: a call that tries to name one instance and act on another has no
  // position in which to do it, and the act stays on the receiver. The name is kept at its as-filed bytes.
  const inst = makeStore();
  const other = makeStore();
  const thePair = pair('cp-sel', 's1');
  const body = counter();
  const element = refusing(body);
  // (1) THE RECEIVER IS THE SELECTOR: the call on `other` carries TWO positions and no third.
  const added = capture(() => other.addConstraint(thePair, element));
  assert.equal(added.threw, false, 'the ADD call on `other` proceeds — it carries pair and constraint and nothing else');
  assert.notEqual(added.value, undefined,
    'and it returns the pair\'s constraint identity like every success of the ADD route (`§2.12` item 3; `PAR-JS-25`)');
  // (2) NO CALL SHAPE CAN CARRY AN INSTANCE, AND THAT IS DRIVEN: a call whose FIRST position is an instance
  // object lands it at `pair`, where it is refused — so `inst` cannot be smuggled into `other`'s registry.
  for (const name of THREE) {
    const smuggled = capture(() => other[name](inst, thePair, element));
    assert.equal(smuggled.threw, true,
      `\`${name}\`: a call naming an instance at its first position carries it at the \`pair\` position `
      + 'and is REFUSED there — the receiver ruling leaves no position at which an instance could be named '
      + '(`§2.4` item 9 (f)\'s `A127` clause; `§2.12` item 4)');
    assertNewRefusal(smuggled.thrown, `\`${name}\` with an instance object at the \`pair\` position`);
  }
  // (3) THE ACT LANDED IN THE RECEIVER'S REGISTRY ALONE — the drivable observable is a write through each
  // instance, driven independently so neither reading alone is the ground.
  assert.equal(body.runs, 0, 'PREMISE: the element has not been evaluated yet');
  const atOther = capture(() => other.write(thePair.address, 'mem', 1));
  assert.equal(atOther.threw, true,
    'the element stands in the RECEIVER\'S registry: a write through `other` is refused by it');
  assert.ok(body.runs >= 1, `and it is THAT element\'s body that ran at that write — it ran ${body.runs} time(s)`);
  const atMine = capture(() => inst.write(thePair.address, 'mem', 2));
  assert.equal(atMine.threw, false,
    'and THE OTHER INSTANCE CARRIES NOTHING AT THAT PAIR: a write at the same address through `inst` is not '
    + 'gated by the element the call carried (`§2.12` item 1\'s preamble clause (a): the entry carries a pair '
    + 'if and only if a function stands registered at it)');
  assert.equal(body.runs, 1, 'and that element was not evaluated at the other instance\'s write: nothing reached it');
  // (a) THE TOGGLE AT THE OTHER INSTANCE REFUSES — the second, independent reading of the same non-carriage.
  for (const name of ['constraintOff', 'constraintOn']) {
    const reached = capture(() => inst[name](thePair, element));
    assert.equal(reached.threw, true,
      `\`${name}\` on \`inst\` names a pair its own entry does not carry and is refused — so the element `
      + 'did not land there (`§2.12` item 3\'s second answered question)');
    assertNewRefusal(reached.thrown, `\`${name}\` on the instance that does not carry the pair`);
  }
  const still = capture(() => other.write(thePair.address, 'mem', 3));
  assert.equal(still.threw, true, 'and the receiver\'s carriage is unmoved by the refused toggles on the other instance');
});

test('cp_fail_outside_pair_is_one_typeerror_and_changes_nothing', () => {
  const inst = makeStore();
  for (const name of THREE) {
    assert.equal(typeof inst[name], 'function',
      `the surface function \`${name}\` exists before its refusals can be read (\`§2.12\` item 2)`);
  }
  const segment = [tag('cp-pair-domain')];
  const OUTSIDE = [
    ['`null`', null], ['`undefined`', undefined], ['a number', 42], ['a string', 'pair'],
    ['a boolean', false], ['a function', () => {}], ['an array', [segment, 'p1']],
    ['an object with no `address`', { id: 'p1' }],
    ['an object whose `address` is not a segment array', { address: 'cp-pair-domain', id: 'p1' }],
    ['an object whose `id` is absent', { address: segment }],
    ['an object whose `id` is not a string', { address: segment, id: 7 }],
  ];
  for (const name of THREE) {
    for (const [where, value] of OUTSIDE) {
      const r = capture(() => inst[name](value, passing(counter())));
      assert.equal(r.threw, true, `\`${name}\`: \`pair\` = ${where} is OUTSIDE the key's domain (\`PAR-JS-24\`)`);
      assertNewRefusal(r.thrown, `\`${name}\` \`pair\` = ${where}`);
    }
    assertNewRefusal(capture(() => inst[name]()).thrown,
      `\`${name}\`: \`pair\` and \`constraint\` both ABSENT — one answer, the same for every one of them`);
  }
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and nothing was added, enabled, disabled or otherwise changed');
});

test('cp_fail_outside_constraint_is_one_typeerror_at_every_one_of_the_three_functions', () => {
  const inst = makeStore();
  for (const name of THREE) {
    assert.equal(typeof inst[name], 'function',
      `the surface function \`${name}\` exists before its refusals can be read (\`§2.12\` item 2)`);
  }
  const thePair = pair('cp-constraint-domain', 'c1');
  // `PAR-JS-22`'s outside-value cell names a `PAR-JS-8` LISTENER HANDLE among them; the handle is obtained
  // through the declared route alone (`§2.4` item 9: `on(address, listener) -> handle`). The row's own
  // "an object" and "an array" cells carry the class test a `JournalOp` would take (`G5` above).
  const handle = (inst.register(inst.listen([tag('cp-constraint-handle')]), () => {}) || inst.listen([tag('cp-constraint-handle')]));
  const OUTSIDE = [
    ['`null`', null], ['`undefined`', undefined], ['a number', 1], ['a string', 'constraint'],
    ['a boolean', true], ['a symbol', Symbol('constraint')], ['a bigint', 1n],
    ['an object', {}], ['an array', []], ['a listener handle', handle],
  ];
  for (const name of THREE) {
    for (const [where, value] of OUTSIDE) {
      const r = capture(() => inst[name](thePair, value));
      assert.equal(r.threw, true,
        `\`${name}\`: \`constraint\` = ${where} is OUTSIDE the position's domain (\`PAR-JS-22\`: "EVERY `
        + 'NON-FUNCTION ... each of them outside AT EVERY ONE OF THE THREE POSITIONS")');
      assertNewRefusal(r.thrown, `\`${name}\` \`constraint\` = ${where}`);
    }
    const absent = capture(() => inst[name](thePair));
    assert.equal(absent.threw, true, `\`${name}\`: \`constraint\` ABSENT is outside it too — the position is REQUIRED`);
    assertNewRefusal(absent.thrown, `\`${name}\` \`constraint\` ABSENT`);
  }
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), TWELVE_MEMBERS,
    'and NOTHING WAS ADDED, ENABLED, DISABLED OR OTHERWISE CHANGED — the pair the refusals named is still '
    + 'not a pair the entry carries, and the instance stands at its seven declared members');
  const back = capture(() => inst.write(thePair.address, 'mem', 1));
  assert.equal(back.threw, false,
    'and the refused third positions left no element at that key: a write there is accepted, so no '
    + 'constraint stands at the pair every one of those refusals named');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §8  THE ALLOWLIST — `distribution.md §2.1` item 6 (landed 2026-10-16) and item 5 (in force), UNMOVED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_allowlist_the_main_packages_files_array_is_the_four_declared_entries', () => {
  const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
  // `§2.1` item 6: "THE CONSTRAINT KERNEL'S OWN MODULE IS THE MAIN PACKAGE'S `files` ALLOWLIST's FOURTH
  // ENTRY, AND THE SAME FOUR ENTRIES ARE THE WHOLE OF WHAT THE TARBALL SHIPS" — the entry STATED BY PATH as
  // `src/constraint-kernel.mjs` RELATIVE TO THE MAIN PACKAGE'S ROOT, which is `bindings/js/`.
  assert.deepEqual([...(manifest.files ?? [])].sort(),
    ['README.md', 'index.d.ts', 'index.mjs', 'src/constraint-kernel.mjs'],
    '`§2.1` item 6: the allowlist is FOUR entries — `index.mjs` · `README.md` · `index.d.ts` · the kernel\'s '
    + 'own module — and the fourth is the kernel\'s, so the kernel\'s FILE TRAVELS with the surface that '
    + 'drives it (`A122`). Read ' + JSON.stringify(manifest.files));
  assert.equal((manifest.files ?? []).includes('LICENSE'), false,
    '`§2.1` item 5, STILL IN FORCE: a `LICENSE` row added to this array is a FINDING, the copy being the '
    + 'release assembly step\'s and not the allowlist\'s');
  assert.ok(!(manifest.files ?? []).some((f) => f.endsWith('.node')),
    '`§2.1` item 2 stands UNMOVED: no binary ships at any key on any target');
});

test('cp_allowlist_the_kernel_travels_in_files_and_is_no_second_exports_arm', () => {
  const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
  // THE ONE PATH, SPELLED THE TWO WAYS THE TWO HOMES SPELL IT (`§2.1` item 6's first bullet;
  // `kernel-surface.md §1` item 1's one checkout home).
  assert.ok(existsSync(join(PACKAGE_DIR, 'src', 'constraint-kernel.mjs')),
    'the entry the allowlist names resolves, package-root-relative, to `bindings/js/src/constraint-kernel.mjs` '
    + '— the constraints unit\'s own module and no other path');
  // `A122`: "IT IS NOT A SEPARATELY REACHABLE EXPORT: the `exports` arm set is UNMOVED, the subpath shape is
  // REFUSED BY NAME, and the kernel\'s five items stay INTERNAL ORCHESTRATION STAGES that no consumer verb
  // exposes" (`§2.1` item 6's second bullet).
  const exports_ = manifest.exports ?? {};
  assert.deepEqual(Object.keys(exports_), ['.'],
    'the `exports` map publishes EXACTLY ONE entry and `A122` adds NO second arm');
  for (const spelling of ['./src/constraint-kernel.mjs', './kernel', './constraint-kernel']) {
    assert.equal(exports_[spelling], undefined,
      `the subpath shape \`${spelling}\` is REFUSED BY NAME — the kernel is BEHIND the surface, not beside it`);
  }
  assert.deepEqual(Object.keys(exports_['.'] ?? {}), ['import'],
    'and the one arms-bearing arm is the ESM one, unmoved (`DD-24`)');
});
