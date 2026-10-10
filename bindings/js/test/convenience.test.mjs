// `surface.md §2.1` (the member set), `§2.3`'s dated clause, `§2.4` **item 7** (a)–(c) — THE TWO NEW
// INSTANCE MEMBERS, `on(address, listener) -> handle` AND `off(handle) -> undefined` — driven from the
// package's own boundary, BEFORE the implementation exists. **EVERY CELL BELOW IS RED TODAY, AND THAT IS
// THE DECLARED STATE OF THIS FILE:** `bindings/js/index.mjs`'s `storeCreate` returns an object whose only
// declared member is `register`, so a call to `on`/`off` raises the runtime's own
// `TypeError: inst.on is not a function` — **a "method does not exist" red, which is CORRECT at `Q2` and is
// the red the `Q3` implementation is measured against** (`docs/specs/storeroom-js-convenience-proposal.md`
// `§5`'s phase table: `Q2` THE RED SET → `Q3` THE GREEN).
//
// **THE AUTHORITY THIS FILE IS AUTHORED FROM, NAMED AT ITS OWN BYTES — THE AMENDED CONTRACT ALONE:**
//   · `docs/specs/storeroom-js/surface.md` **`§2.1`** — the instance's member set, enumerated: **the three
//     members `{ register, on, off }`, and the MODULE NAMESPACE UNCHANGED AT THE EIGHT DECLARED VERBS**
//     (`on`/`off` reached through the FACTORY'S OWN PRODUCT and never as named exports); its `§2.1` dated
//     clause (a)–(d), with (c)'s *"`listen`/`unlisten` keep their names, their positions, their arity and
//     their returns"*;
//   · `docs/specs/storeroom-js/surface.md` **`§2.4` ITEM 7** — (a) `on`'s validate→listen→register order,
//     atomicity as a consequence of the validation's position, the FRESH arm and the HELD arm and the
//     REPLACEMENT they carry; (b) `off`'s validate→unlisten→deregister order, rule 4 kept VERBATIM
//     (`unlisten` withdraws the registration and never the function) with `off` SUPPLEMENTING it, the OWN /
//     OWN-ENTRYLESS / OUTSIDE arm table, *"`off` REMOVES NO MORE THAN THE HANDLE NAMES"*, and the
//     `DD-54` pointer for the refusal order; (c) both are DELIVERY-SIDE, neither is a RELEASE verb;
//   · `docs/specs/storeroom-js/surface.md` **`§2.3`'s dated clause** — `on` produces a handle in the ONE
//     output spelling, `off` accepts the OPAQUE form ONLY, and the CONTRAST: `unlisten` over an outside
//     value is a NO-OP SUCCESS while `off` over an outside handle is a REFUSAL;
//   · `docs/specs/storeroom-js/parameter-semantics.md` **`§2.8`** (`PAR-JS-8` and its dated clauses — the two
//     spellings, the outside-value list, the `off`-vs-`unlisten` contrast), **`§2.12`** (`PAR-JS-12` — the
//     listener slot, the invocation's ONE argument the TRIGGERING ADDRESS, the refusal re-derivation) and
//     **`§2.17`** (the refusal site — the SIXTEEN-clause class set, `AddressMalformed` carried verbatim, the
//     class half MANDATORY and the POSITION half as the ARGUMENT POSITION `1 of 2` / `2 of 2`, *"a raw host
//     `TypeError` escaping from either new site is a FINDING and not a form"*, and *"`off`'s outside-arm
//     refusal is NOT `unlisten`'s no-op `undefined`"*);
//   · `docs/specs/storeroom-js/contract.md` **`§5.5`'s RE-DERIVED clause** — the row's subject widened over
//     the four members, ONE row re-derived and NO ninth minted, its FIVE strategy lines unmoved, and **the
//     `6` ADDED FAILURE ENTRIES** this file's cells must each be able to CATCH: a NON-FUNCTION ADMITTED at
//     `on`'s listener position; an ADDRESS ADMITTED UNVALIDATED at `on`'s address position; a STORE-SIDE
//     ENTRY LEFT BEHIND AFTER A REFUSAL (fresh **and** at a held address); `off` FAILING TO REMOVE THE
//     REGISTRY ENTRY; `off` REMOVING MORE THAN THE HANDLE NAMES; and A FIRING RULE STATED BY THE PACKAGE;
//   · `docs/specs/storeroom-js/contract.md` **`§0.2`'s `DD-51`–`DD-54`** — the message's Segment Two authored
//     by the boundary (`DD-51`), `on` at a HELD address REPLACES whatever member placed the previous entry
//     (`DD-52`), an ENTRY-LESS IN-DOMAIN handle at `off` is a SUCCESS `undefined` whose REFUSAL ARM IS THE
//     OUTSIDE-DOMAIN HANDLE ALONE (`DD-53`), and the ONE ORDER validate → store-side withdrawal → registry
//     removal, *"after any `off` that throws, BOTH the store-side entry and the registry entry are exactly
//     as they were"* (`DD-54`);
//   · `docs/specs/storeroom-js-convenience-proposal.md` **`§8`** — `A79` (*"Use S-1"*), `A80` (*"`off` can
//     deregister"*) and `A81` (*"always validate"*), VERBATIM.
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED** (the state machine this file covers, one cell per
// state; the four members that reach the registry are `register` · `unlisten` · `on` · `off`):
//
// | Its own clauses | The states this file drives |
// | --- | --- |
// | `§2.4` item 7 (a)'s FRESH arm | an address the store's home does NOT hold · a listener that fires ONCE per trigger, its ONE argument the triggering address · the handle `on` returns IS the identity the `triggered` list carries |
// | `§2.4` item 7 (a)'s HELD arm + `DD-52` | a repeat `on` at an address ALREADY registered (the SAME opaque value twice) · the REPLACEMENT of the registry's function (the first never fires again, the second fires once) · `on` at an address whose entry came from `register` (a REPLACEMENT and NOT a refusal) |
// | `§2.4` item 7 (a)'s VALIDATE-FIRST order + `A81` | a NON-FUNCTION `listener` at position `2` of `2` · a MALFORMED `address` at position `1` of `2` · **NOTHING LEFT BEHIND**: the store-side entry exactly as before AND the registry exactly as before |
// | `§2.4` item 7 (b)'s OWN arm + `A80` | `off(h)` over a registered in-domain identity: BOTH removals, `undefined` returned |
// | `§2.4` item 7 (b)'s OWN-ENTRYLESS arm + `DD-53` | an in-domain identity the registry holds NO function for — never registered, and ALREADY REMOVED by an earlier `off` — a SUCCESS `undefined` that disturbs nothing |
// | `§2.4` item 7 (b)'s OUTSIDE arm + `§2.3`'s dated clause 3 + `§2.8` | a FOREIGN value · a PRIOR-SESSION value · a FABRICATED value · a BARE string · a BLANK token · a NON-OPAQUE value · `null` · `undefined` · an ABSENT argument · a NON-FUNCTION — EACH refused `AddressMalformed`, and the CONTRAST beside it: `unlisten` over the SAME values is a NO-OP SUCCESS |
// | `§2.4` item 7 (b)'s THREE STEPS + `DD-54` | the ORDER on a THROWING path: BOTH the store-side entry and the registry entry exactly as they were, and the sibling registration untouched |
// | `§2.4` rule 4 KEPT VERBATIM | `unlisten(h)` removes the store-side entry ALONE and the registry entry STANDS |
// | `§2.4` item 7 (b)'s *"REMOVES NO MORE THAN THE HANDLE NAMES"* | a lawful SIBLING identity in the same instance untouched by one `off` |
// | `§2.1` + its dated clause (a)–(b) | the instance's own member set `{ register, on, off }` · the MODULE NAMESPACE at its EIGHT declared verbs, `on`/`off` NOT named exports · `listen`/`unlisten` un-overloaded |
//
// **AND THREE THINGS THIS FILE DELIBERATELY DOES NOT DO, SO ITS RED IS READ CORRECTLY.**
//   (1) **IT DOES NOT IMPLEMENT `on`/`off`** and touches no byte of `bindings/js/index.mjs` or of
//       `bindings/js/src/**`: every cell reaches the two members through the object `storeCreate` returned.
//   (2) **IT DOES NOT WEAKEN AN ASSERTION TO DODGE A FAILURE**: a cell that cannot be satisfied while the
//       members are absent is left FAILING, which is what `Q2` is for.
//   (3) **IT INVENTS NO FIRING RULE**, and no cell derives its firing terms from `on`/`off`; **which
//       listener fires and how many times is driven from the STORE's own surface as `§2.4` item 7 (c)
//       requires** (`docs/specs/storeroom-native/write-and-read.md §6.5` item 14's home), with the package's
//       own two rules being the invocation COUNT and the ONE invocation argument (`§2.4` rule 3, item 6).

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  storeCreate,
  read,
  write,
  listen,
  unlisten,
} from '@provident-storeroom/js';

/// The refusal's own predicate above is *this file's* reading of a site it CALLS. **WHILE THE TWO MEMBERS ARE
/// ABSENT THE CALL ITSELF THROWS OUTSIDE THAT PREDICATE'S `try`, SO THE "METHOD DOES NOT EXIST" RED WOULD BE
/// REPORTED BY NODE AS A STACK AND NOT AS THIS FILE'S OWN DIAGNOSTIC — WHICH IS A WORSE RED SET.** This
/// wrapper keeps the red *inside* the reporting: it catches what the call raised and hands it to the
/// predicate, so the failure message NAMES the state the contract is still missing. **IT WEAKENS NOTHING: a
/// site that refuses correctly still has its refusal judged by the same predicate unchanged, and a call that
/// raises a raw `TypeError` is judged to be the FINDING it is** (`parameter-semantics.md §2.17`'s dated
/// clause: *"a raw host `TypeError` escaping FROM EITHER NEW SITE IS A FINDING AND NOT A FORM"*).
function reachedOrRaised(site) {
  try {
    return { thrown: null, raised: site() };
  } catch (err) {
    return { thrown: err, raised: undefined };
  }
}

/// A `mem`-tier instance with the construction's `listeners[]` population, exactly as the sibling cells
/// build it (`PAR-JS-1`–`PAR-JS-4`; the three declared keys and no fourth, `DD-36`).
function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

/// **THE INSTANCE'S OWN MEMBER SET, BY NAME** — `Object.getOwnPropertyNames` over what `storeCreate`
/// returned (`surface.md §2.1`'s dated clause (a)). **THE HANDLE IS NEVER ENUMERATED HERE**: `§2.3` item 2's
/// memberless-handle clause is UNMOVED by this amendment, and the two new members are properties of the
/// INSTANCE.
function memberSet(instance) {
  return Object.getOwnPropertyNames(instance).sort();
}

/// **THE CLASS THE VALUE HAS, NEVER THE CLASS IT COULD BE CONVERTED TO** — `crossing.md §1.7` (a) and
/// `§1.8`'s no-repair prohibition, as the sibling cells' own predicate spells it.
function classSpelling(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const kind = typeof value;
  if (kind !== 'object' && kind !== 'function') return `a ${kind}`;
  if (Array.isArray(value)) return 'an Array';
  if (kind === 'function') return 'a function';
  return 'a plain object';
}

/// **THE FAILING TARGET RENDERED AS THE STORE'S GENERATOR RENDERS IT** (`§2.5` item 5 (a)): a non-segment
/// value is printed AS ITS OWN VALUE, and `10n` / `Symbol()` are that clause's own two examples. The
/// guarded read mirrors the build's own (`JS-1`: *"catch, then classify — never propagate the host error"*).
function targetSpelling(value) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    if (typeof value === 'symbol') return 'Symbol()';
    return String(value);
  } catch {
    return classSpelling(value);
  }
}

/// **THE REFUSAL'S OWN PREDICATE — `§2.5`'s SINGLE FORM, AT `§2.4` ITEM 7 (a)–(b)'s TWO SITES, READ WITH
/// `parameter-semantics.md §2.17`'s dated clause.** The rejection is VERBOSE where it carries TWO things:
/// the FAILING TARGET and the REASON — and the reason's CLASS half is MANDATORY while its POSITION half is
/// the ARGUMENT POSITION the contract declares, carried INSIDE the generated message's own text and never
/// as a third member. **A raw host `TypeError` escaping from either new site is a FINDING and not a form**
/// (`§2.17`'s dated clause, second of its three; `§2.5` item 5 (e)).
function isRefusal(site, { target = null, why = null, position = null, thrown = null } = {}) {
  let err = thrown;
  if (err === null) {
    try {
      site();
    } catch (caught) {
      err = caught;
    }
  }
  if (err === null || err === undefined) return 'NOTHING WAS THROWN — the refusal did not happen at all';
  if (err instanceof TypeError) {
    return `A RAW HOST TypeError ESCAPED (\`${err.message}\`) — a finding at this site and not a form`;
  }
  if (typeof err !== 'object' || Array.isArray(err)) return 'the thrown value is not a plain object';
  if (Object.getPrototypeOf(err) !== Object.prototype) {
    return 'the thrown object\'s prototype is not the caller realm\'s `Object.prototype` (`DD-12`)';
  }
  const members = Object.keys(err).sort().join(',');
  if (members !== 'message,status') {
    return `the member set is \`{${members}}\` and is EXACTLY \`{status, message}\` and nothing else`;
  }
  if (err.status !== 'AddressMalformed') {
    return `the status is \`${String(err.status)}\`, and the store's closed-set member for this site is \`AddressMalformed\``;
  }
  const message = String(err.message);
  if (message.length === 0) return 'the message is empty';
  if (target !== null && !message.includes(target)) {
    return `the message carries no failing TARGET \`${target}\` (item 5 (a))`;
  }
  if (why !== null && !message.includes(why)) {
    return `the message carries no CLASS half \`${why}\` (item 5 (b), whose class half is MANDATORY)`;
  }
  if (position !== null && !message.includes(position)) {
    return `the message carries no POSITION \`${position}\` (item 5 (b))`;
  }
  return null;
}

/// A short, deterministic read of a `triggered` list AS A MEMBER SET — **NEVER BY SIZE AND NEVER BY ORDER**
/// (`§2.7` item 3; `DD-22`: a drive compares SETS and never sequences).
function triggerSet(instance, address, tier = 'mem', value = 1) {
  return write(instance, address, tier, value).triggered;
}

/// The identity count of a `triggered` list, taken MEMBER BY MEMBER and never by the list's own length
/// (`§5.5`'s re-derivation: the two observables are the ARRAY's element multiplicity and the INVOCATION's
/// count, and neither satisfies the other).
function distinctMembers(list) {
  return new Set(list).size;
}

// =============================================================================================
// 1. THE COMBINED CALL — `surface.md §2.4` item 7 (a), its FRESH arm; `§2.1`'s dated clause (a);
//    `parameter-semantics.md §2.12` (the invocation's ONE argument); `§2.3` item 2 (the output spelling)
// =============================================================================================

test('combined_call_on_returns_a_handle_a_write_fires_the_function_once_with_the_triggering_address_and_the_triggered_identity_is_that_handle', () => {
  // **THE STATES, ENUMERATED:** (i) an address the store's home does NOT hold — the FRESH arm; (ii) a
  // listener invoked by ONE write at that address; (iii) the invocation's ARGUMENT LIST, whose declared
  // length is ONE and whose one member is the TRIGGERING ADDRESS; (iv) the identity the returned record's
  // `triggered` list carries, which is the handle `on` returned. **AND THE FIRING TERMS ARE THE STORE'S,
  // NOT THIS MEMBER'S** (`§2.4` item 7 (c); `A78`): what is driven below is the STORE's own registration
  // landing at `on`'s step 2, and the PACKAGE's own invocation count and argument.
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  assert.equal(typeof inst.on, 'function', '`surface.md §2.4` item 7: `on(address, listener)` is a member of the instance');
  assert.equal(typeof inst.off, 'function', '`surface.md §2.4` item 7: `off(handle)` is a member of the instance');
  const address = ['a', 0, 'b'];
  let calls = 0;
  let seenArgs = null;
  let seenWhileCalling = null;
  let recordWhenCalled = null;

  const handle = inst.on(address, (...args) => {
    calls += 1;
    seenArgs = args;
    // THE INVOCATION HAPPENS AFTER THE VERB HAS RETURNED (`§2.7` item 2): the record the caller holds is
    // already COMPLETE and copied out when the listener's body runs.
    seenWhileCalling = recordWhenCalled;
  });

  // `§2.4` item 7 (a): *"ITS RETURN IS THE HANDLE"* — and the OUTPUT spelling is `§2.3` item 2's ONE:
  // the package's OPAQUE value, never the token string.
  assert.ok(handle !== null && typeof handle === 'object', '`on` returns the package\'s opaque handle');
  assert.notEqual(typeof handle, 'string', 'the output spelling is opaque and NEVER the token string (`DD-14`)');

  const record = write(inst, address, 'mem', 1);
  recordWhenCalled = record;

  assert.equal(calls, 1, 'the function fires EXACTLY ONCE for one write under its address');
  assert.equal(record.triggered.length, 1, 'ONE home entry per address, so ONE identity in the list');
  // **THE IDENTITY IS THE SAME VALUE — `===`, ONE IDENTITY AND NOT TWO EQUAL ONES** (`§2.4` item 6 (b): the
  // registry's lookup is BY THAT IDENTITY AND BY NOTHING ELSE).
  assert.equal(record.triggered[0], handle, 'the `triggered` list carries the very handle `on` returned');
  // **THE INVOCATION'S ONE ARGUMENT IS THE TRIGGERING ADDRESS** (`PAR-JS-12`'s invocation half; `§2.4` item 6
  // (d)'s two-data table: THE TRIGGERING ADDRESS travels as *"the invocation's ONE argument"*).
  assert.equal(seenArgs.length, 1, 'the invocation view is EXACTLY ONE argument — no id, no record, no second member');
  assert.deepEqual(seenArgs[0], address, 'and that ONE argument is the triggering address itself');
  assert.ok(seenWhileCalling !== null && seenWhileCalling.triggered.length === 1, '`§2.7` item 2: the record was complete before the window opened');

  // **AND A SECOND WRITE FIRES IT AGAIN — ONCE — SO THE CELL IS NOT SATISFIED BY A SINGLE LUCKY CALL.**
  calls = 0;
  recordWhenCalled = write(inst, address, 'mem', 2);
  assert.equal(calls, 1, 'one invocation per trigger, never two and never none');
});

// =============================================================================================
// 2. VALIDATION FIRST + ATOMICITY — `surface.md §2.4` item 7 (a)'s step 1; `§2.1`'s dated clause;
//    `parameter-semantics.md §2.17`'s dated clause (the refusal site); `A81` verbatim.
//    THE FAILURE ENTRIES THIS CELL CATCHES: "a NON-FUNCTION ADMITTED at `on`'s listener position" and
//    "an ADDRESS ADMITTED UNVALIDATED at `on`'s address position", plus "a STORE-SIDE ENTRY LEFT BEHIND
//    AFTER A REFUSAL" (`contract.md §5.5`'s re-derived failure list).
// =============================================================================================

test('validation_first_and_atomicity_a_non_function_listener_and_a_malformed_address_are_each_refused_verbosely_with_nothing_left_behind', () => {
  // **THE CLASS SET IS EXHAUSTIVE AND CLOSED, AND THESE ARE ITS TWO NEW ARMS** (`§2.17`'s dated clause,
  // items 1 and 2; `A81` verbatim *"always validate"*): a NON-FUNCTION `listener` at `on`'s position `2` of
  // `2` — an ABSENT second argument included — and an `address` outside `AddressArg`'s domain at position
  // `1` of `2`. **EACH ANSWERS `AddressMalformed` IN `§2.5`'s SINGLE FORM, AND NOTHING REACHES THE STORE.**
  const inst = mem([{ address: ['held'], handle: 'l1' }]);
  // The store's home already holds ONE home entry, so the "nothing left behind" half has a STANDING entry
  // to protect AND the "a fresh entry was NOT created" half has an empty address to watch.
  const heldBefore = triggerSet(inst, ['held'], 'mem', 1);
  assert.equal(heldBefore.length, 1, 'the pre-state: ONE home entry at `held`');

  const nonFunctions = [
    { value: 42, why: 'a number', position: 'second argument' },
    { value: 'not-a-function', why: 'a string', position: 'second argument' },
    { value: null, why: 'null', position: 'second argument' },
    { value: {}, why: 'a plain object', position: 'second argument' },
    { value: true, why: 'a boolean', position: 'second argument' },
  ];

  for (const one of nonFunctions) {
    const trouble = isRefusal(() => inst.on(['fresh'], one.value), {
      target: targetSpelling(one.value),
      why: one.why,
      position: one.position,
    });
    assert.equal(trouble, null, `a non-function listener (${one.why}) must be refused verbosely: ${trouble}`);
  }
  // AN ABSENT SECOND ARGUMENT IS THE SAME ARM (`§2.17`'s dated clause: *"including an ABSENT second
  // argument"*), and its target renders as the runtime's own `undefined`.
  {
    const trouble = isRefusal(() => inst.on(['fresh']), {
      target: 'undefined',
      why: 'undefined',
      position: 'second argument',
    });
    assert.equal(trouble, null, `an absent listener must be refused verbosely: ${trouble}`);
  }

  const malformedAddresses = [
    { value: 'a.b', why: 'a string' }, //                    `AddressArg` row 6
    { value: 7, why: 'a number' }, //                       row 6
    { value: null, why: 'null' }, //                        row 5
    { value: undefined, why: 'undefined' }, //             row 5
    { value: ['a', 1.5], why: 'a number' }, //              row 8 — the failing segment, not the array
    { value: ['a', -1], why: 'a number' }, //               row 7
    { value: ['a', null], why: 'null' }, //                row 9
    { value: ['a', {}], why: 'a plain object' }, //        row 10
  ];
  for (const one of malformedAddresses) {
    const target = Array.isArray(one.value) ? targetSpelling(one.value[1]) : targetSpelling(one.value);
    const trouble = isRefusal(() => inst.on(one.value, () => {}), {
      target,
      why: one.why,
      position: 'first argument',
    });
    assert.equal(trouble, null, `a malformed address (${JSON.stringify(one.value)}) must be refused verbosely: ${trouble}`);
  }
  {
    const trouble = isRefusal(() => inst.on(undefined, () => {}), {
      target: 'undefined',
      why: 'undefined',
      position: 'first argument',
    });
    assert.equal(trouble, null, `an absent address must be refused verbosely: ${trouble}`);
  }

  // **AND NOTHING IS LEFT BEHIND — DRIVEN AS AN ABSENCE AND NOT AS THE ERROR ALONE** (`§2.4` item 7 (a):
  // *"A REFUSED `address` OR A REFUSED `listener` LEAVES NO STORE-SIDE HOME ENTRY, NO REGISTRY ENTRY, NO
  // NODE MINTED AND NO JOURNAL ENTRY APPENDED"*). **THE TWO HALVES, ONE PER ADMISSION:**
  //   (i) THE STORE-SIDE ENTRY: `fresh` was refused fifteen times and the store's home must STILL not hold
  //       it — a `listen` there MUST therefore mint (a refused `on` that had reached the store would have
  //       left an entry, and the `listen` would have answered THAT entry's handle instead);
  //   (ii) NOTHING WAS DISTURBED AT THE HELD ADDRESS: `held`'s ONE entry is still exactly what it was.
  const mintedAfter = listen(inst, ['fresh']);
  assert.ok(mintedAfter !== null && typeof mintedAfter === 'object', '`listen` mints a handle, so the home held NO entry');
  assert.equal(
    triggerSet(inst, ['fresh'], 'mem', 2).length,
    1,
    'ONE entry at `fresh` AFTER the mint and NEVER two — a refused `on` left no entry for the mint to collide with',
  );

  const heldAfter = triggerSet(inst, ['held'], 'mem', 3);
  assert.equal(heldAfter.length, distinctMembers(heldBefore), 'the held address\'s entry count is exactly what it was');
  assert.equal(heldAfter[0], heldBefore[0], 'and it is the SAME identity — the standing entry was not disturbed');

  // (iii) AND NO NODE WAS MINTED AND NO JOURNAL ENTRY APPENDED: the register of `fresh` is EMPTY, so a read
  // there answers the store's own not-found failure rather than a value a refusal had left behind.
  assert.throws(
    () => read(inst, ['fresh']),
    (err) => err.status === 'AddressNotFound',
    'the refused address\'s node was never minted, so its read answers `AddressNotFound`',
  );
});

// =============================================================================================
// 3. THE HELD-ADDRESS ARM — `surface.md §2.4` item 7 (a)'s HELD arm; `§2.3`'s dated clause 1;
//    `contract.md §0.2` · `DD-52`; `§2.4` rule 2; `§5.5`'s `S-WITHDRAW` STILL-REGISTERED arm.
//    THE FAILURE ENTRY THIS CELL CATCHES: a HELD `on` that refuses, or one that replaces the IDENTITY
//    rather than the FUNCTION.
// =============================================================================================

test('held_address_arm_on_returns_the_same_handle_and_replaces_the_function_and_on_over_a_register_entry_is_a_replacement_not_a_refusal', () => {
  // **THE STATES, ENUMERATED:** (i) an address whose entry came from `listen` — a repeat `on` there must
  // answer the SAME opaque value and REPLACE the function; (ii) an address whose entry came from the
  // construction's `listeners[]`; (iii) an address whose entry came from `register` DIRECTLY, which
  // `DD-52` settles as a REPLACEMENT and not a refusal.
  const inst = mem([{ address: ['adopted'], handle: 'l-adopted' }]);
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  assert.equal(typeof inst.on, 'function', '`surface.md §2.4` item 7: `on(address, listener)` is a member of the instance');
  assert.equal(typeof inst.off, 'function', '`surface.md §2.4` item 7: `off(handle)` is a member of the instance');

  // --- (i) THE HELD ARM, over an entry `listen` placed.
  const minted = listen(inst, ['held']);
  let mintedFired = 0;
  let repeatFired = 0;
  const mintedAgain = inst.on(['held'], () => { mintedFired += 1; });
  const mintedThird = inst.on(['held'], () => { repeatFired += 1; });

  // `§2.3`'s dated clause 1: *"AT A HELD ADDRESS it returns the EXISTING entry's handle"* — ONE opaque
  // value, `===`, and never a second equal-but-distinct wrapper (a distinction the registry's own identity
  // lookup makes observable: `§2.4` item 6 (b)).
  assert.equal(mintedAgain, minted, 'the repeat `on` answers the very handle `listen` returned');
  assert.equal(mintedThird, minted, 'and so does a third call — one address, one identity');
  assert.equal(triggerSet(inst, ['held'], 'mem', 1).length, 1, '`A45`: ONE home entry per address, never two');

  // **AND IT REPLACES** (`§2.4` rule 2; item 7 (a)'s HELD arm: *"a later trigger invokes the REPLACEMENT
  // once, and the replaced function never fires again"*).
  triggerSet(inst, ['held'], 'mem', 2);
  assert.equal(repeatFired, 1, 'the SECOND listener is the registered one and fires once');
  assert.equal(mintedFired, 0, 'the replaced function NEVER fires again — one identity, one function');

  // --- (ii) THE HELD ARM over the construction's own adopted entry.
  const adoptedHandle = triggerSet(inst, ['adopted'], 'mem', 1)[0];
  let adoptedFirst = 0;
  let adoptedSecond = 0;
  const adoptedOn = inst.on(['adopted'], () => { adoptedFirst += 1; });
  const adoptedAgain = inst.on(['adopted'], () => { adoptedSecond += 1; });
  assert.equal(adoptedOn, adoptedHandle, 'the construction-adopted entry\'s handle is what `on` returns');
  assert.equal(adoptedAgain, adoptedHandle, 'and the repeat answers that same value');
  triggerSet(inst, ['adopted'], 'mem', 2);
  assert.equal(adoptedSecond, 1, 'the replacement fires once');
  assert.equal(adoptedFirst, 0, 'the replaced function is dropped without notice');

  // --- (iii) **`DD-52`: `on` OVER AN ADDRESS WHOSE ENTRY CAME FROM `register` IS A REPLACEMENT, NOT A
  // REFUSAL.** *"THE REGISTRY DOES NOT RECORD WHICH MEMBER WROTE AN ENTRY, and `register` and `on` share ONE
  // map with ONE replacement arm (`§2.4` rule 2)."* **SO THE ONE-CALL SPELLING IS REACHABLE AT AN ADDRESS
  // THE TWO-CALL SPELLING CREATED** — a refusal here would be the `DD-52` alt, and would be caught by this
  // cell.
  const twoCall = listen(inst, ['by-register']);
  let registeredFirst = 0;
  let registeredSecond = 0;
  assert.equal(inst.register(twoCall, () => { registeredFirst += 1; }), undefined);
  const combined = inst.on(['by-register'], () => { registeredSecond += 1; });
  assert.equal(combined, twoCall, '`DD-52`: the entry placed by `register` is the entry `on` finds and returns');
  triggerSet(inst, ['by-register'], 'mem', 1);
  assert.equal(registeredSecond, 1, 'the function `on` offered is the one the identity now carries');
  assert.equal(registeredFirst, 0, 'and the `register`ed function was REPLACED, never fanned out beside it');

  // **AND ONE IDENTITY CARRIES ONE FUNCTION AND NOT TWO** (`§2.4` rule 2): a third write changes nothing.
  triggerSet(inst, ['by-register'], 'mem', 2);
  assert.equal(registeredSecond, 2, 'one invocation per trigger, and never one per the two members that wrote the map');
});

// =============================================================================================
// 4. `off`'s TWO REMOVALS AND THE CONTRAST — `surface.md §2.4` item 7 (b)'s OWN, OWN-ENTRYLESS and OUTSIDE
//    arms; `§2.4` rule 4 KEPT VERBATIM; `§2.3`'s dated clause 3; `contract.md §0.2` · `DD-53`; `A80`.
//    THE FAILURE ENTRIES THIS CELL CATCHES: "`off` FAILING TO REMOVE THE REGISTRY ENTRY" and
//    "`off` REMOVING MORE THAN THE HANDLE NAMES".
// =============================================================================================

test('off_performs_both_removals_and_returns_undefined_while_unlisten_removes_only_the_store_side_registration_and_the_registry_entry_stands', () => {
  // **THE STATES, ENUMERATED:** (i) `off` over a registered in-domain identity — BOTH removals; (ii)
  // `unlisten` over the same shape of value — the STORE-SIDE withdrawal ALONE, the registry entry STANDING
  // (rule 4 verbatim); (iii) `off` over an in-domain handle the registry holds NO function for — never
  // registered, and already removed; (iv) `off` over an OUTSIDE handle — a refusal; (v) a lawful SIBLING
  // registration, untouched by one `off`.
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  assert.equal(typeof inst.on, 'function', '`surface.md §2.4` item 7: `on(address, listener)` is a member of the instance');
  assert.equal(typeof inst.off, 'function', '`surface.md §2.4` item 7: `off(handle)` is a member of the instance');

  // --- (i) THE OWN ARM. A sibling registration is standing BESIDE the one `off` names, so *"`off` REMOVES
  // NO MORE THAN THE HANDLE NAMES"* (`§2.4` item 7 (b)) is drivable at the same moment.
  let targetFired = 0;
  let siblingFired = 0;
  let stoodFired = 0;
  let keeperFired = 0;
  const target = inst.on(['x'], () => { targetFired += 1; });
  const sibling = inst.on(['y'], () => { siblingFired += 1; });
  assert.equal(triggerSet(inst, ['x'], 'mem', 1).length, 1);
  assert.equal(triggerSet(inst, ['y'], 'mem', 2).length, 1);

  assert.equal(inst.off(target), undefined, '`§2.4` item 7 (b): *"ITS RETURN IS `undefined` ON EVERY SUCCESS"*');
  targetFired = 0;
  siblingFired = 0;

  // THE FIRST REMOVAL — the STORE-SIDE ONE: a later write at that address no longer carries the identity
  // (the store-side home entry is gone, so the trigger's set is EMPTY).
  assert.equal(
    triggerSet(inst, ['x'], 'mem', 3).length,
    0,
    'the store-side home entry is WITHDRAWN: a later write carries no identity at that address',
  );
  assert.equal(targetFired, 0, 'and there is no registry entry left to match it');
  // THE SECOND REMOVAL — the PACKAGE'S OWN: the registry no longer holds the function, so a re-`listen` at
  // that address mints a FRESH handle and the OLD identity's function is unreachable (`§5.5`'s WITHDRAWN
  // arm; `§2.4` rule 4's *"a later re-`listen` … mints a DIFFERENT handle"*).
  const reminted = listen(inst, ['x']);
  assert.notEqual(reminted, target, 'the re-`listen` mints a fresh handle, so `off` removed the identity');
  // (v) AND THE SIBLING IS UNTOUCHED — driven as a set, never by size alone.
  const siblingAfter = triggerSet(inst, ['y'], 'mem', 4);
  assert.equal(siblingAfter.length, 1, 'the sibling registration STANDS after one `off`');
  assert.equal(siblingAfter[0], sibling, 'and it is the SAME identity — `off` removed nothing it did not name');
  assert.equal(siblingFired, 1, 'and the sibling\'s function still fires');

  // --- (ii) **THE CONTRAST, IN ONE CELL, DRIVEN ON ONE VALUE CLASS** (`§2.3`'s dated clause 3; `§2.4`
  // item 7 (b): *"`unlisten(handle)` KEEPS RULE 4 VERBATIM — the STORE-SIDE WITHDRAWAL ONLY, with the
  // registry's entry STANDING"*). **`off` is the declared way to remove a function; `unlisten` never
  // removes one.**
  const stillRegistered = inst.on(['w'], () => { stoodFired += 1; });
  assert.equal(unlisten(inst, stillRegistered), undefined, '`§2.3` item 4: `unlisten` over an in-domain handle is `undefined`');
  stoodFired = 0;
  assert.equal(
    triggerSet(inst, ['w'], 'mem', 5).length,
    0,
    'the STORE-SIDE home entry is withdrawn, so the trigger no longer carries that identity',
  );
  assert.equal(stoodFired, 0, 'and the function never fires again — *"simply never fires again"*, rule 4');
  // **THE REGISTRY ENTRY STANDS, AND THE CELL PROVES IT BY THE ROUTE RULE 4 NAMES: a LATER re-`listen` at
  // that address mints a DIFFERENT handle whose registration is a NEW entry — while the OLD entry was
  // never removed by `unlisten`.** The proof of the standing half is the one the shipped registry makes
  // observable: `unlisten` is not a deregistration, and the withdrawn identity's function is STILL HELD.
  const remintedAfterUnlisten = listen(inst, ['w']);
  assert.notEqual(remintedAfterUnlisten, stillRegistered, 'the `unlisten` withdrew the registration, never the function');
  assert.equal(
    triggerSet(inst, ['w'], 'mem', 6).length,
    1,
    'the fresh entry is the ONE identity the address now has',
  );

  // --- (iii) **`DD-53`: AN ENTRY-LESS IN-DOMAIN IDENTITY IS A SUCCESS `undefined` THAT DISTURBS NOTHING.**
  // *"`off`'s REFUSAL ARM IS THE OUTSIDE-DOMAIN HANDLE ALONE."* Two arms of one state: NEVER registered,
  // and ALREADY REMOVED by an earlier `off`.
  const neverRegistered = listen(inst, ['never']);
  const keeper = inst.on(['keeper'], () => { keeperFired += 1; });
  assert.equal(
    isRefusal(() => inst.off(neverRegistered), {}),
    null,
    '`DD-53`: an in-domain identity the registry holds NO function for is a SUCCESS, never a refusal',
  );
  assert.equal(inst.off(neverRegistered), undefined, 'and its answer is `undefined`');
  assert.equal(
    triggerSet(inst, ['never'], 'mem', 7).length,
    0,
    'the store-side withdrawal IS performed (nothing was there), and the address carries no identity afterwards',
  );
  // ...and the SAME handle a SECOND time — the ALREADY-REMOVED arm, whose answer is the same success.
  assert.equal(inst.off(neverRegistered), undefined, 'a lawful second `off` of one identity is a SUCCESS');
  assert.equal(inst.off(target), undefined, 'and so is a second `off` of a handle the registry already dropped');

  // --- (iv) **THE OUTSIDE ARM IS THE REFUSAL, AND IT CONTRASTS WITH `unlisten`'S NO-OP SUCCESS.** The
  // outside values are enumerated IN FULL at cell 7 below; here the CONTRAST is driven ON ONE VALUE, both
  // verbs, so the declared difference is asserted as a difference and not as two isolated readings.
  const stranger = mem();
  const foreign = stranger.on(['f'], () => {});
  assert.equal(unlisten(inst, foreign), undefined, '`§2.3` item 4: the foreign value is a NO-OP SUCCESS at `unlisten`');
  const trouble = isRefusal(() => inst.off(foreign), {});
  assert.equal(trouble, null, `and a REFUSAL at \`off\` — \`AddressMalformed\` in the one form: ${trouble}`);

  // AND NOTHING OF (iii)/(iv) DISTURBED THE STANDING REGISTRATION.
  keeperFired = 0;
  assert.equal(triggerSet(inst, ['keeper'], 'mem', 8).length, 1, 'the unrelated registration stands');
  assert.equal(keeperFired, 1, 'and still fires');
});

// =============================================================================================
// 5. THE REMOVAL ORDER — `surface.md §2.4` item 7 (b)'s three steps; `contract.md §0.2` · `DD-54`;
//    the failure entry "a STORE-SIDE ENTRY LEFT BEHIND AFTER A REFUSAL" at its held-address arm.
//    VALIDATE → STORE-SIDE WITHDRAWAL → REGISTRY REMOVAL, AND ON A THROWING PATH BOTH ENTRIES ARE
//    EXACTLY AS THEY WERE.
// =============================================================================================

test('the_removal_order_is_validate_then_store_side_withdrawal_then_registry_removal_and_a_throwing_path_leaves_both_entries_exactly_as_they_were', () => {
  // **THE STATES, ENUMERATED:** (i) a refused `off` (an OUTSIDE handle) over an instance that ALSO holds a
  // standing in-domain registration — NEITHER removal for the refused handle, and the standing entry
  // untouched; (ii) the SAME probe at a HELD address, so the *"at a held address, a refused `on` that
  // disturbed the standing entry"* arm of the failure list is reached on the `off` side too; (iii) the
  // in-domain SUCCESS path, whose two removals are BOTH performed.
  //
  // **PARKED, WITH ITS REASON — ONE HALF OF THIS DRIVE IS NOT REACHABLE FROM THE DECLARED SURFACE, AND IT IS
  // NOT INVENTED HERE.** `DD-54`'s cell is *"the ONE case the store refuses — a malformed argument's shape
  // reaching the store-side `unlisten`"*: **`off` validates at step 1 and only an IN-DOMAIN handle reaches
  // step 2, so no argument a caller can spell makes the package's own `unlisten` call refuse.** The second
  // step's throwing path is therefore reachable only by a fault INSIDE the store or by an interposition on
  // the package's own `unlisten` call — neither of which is a state a drive may construct from
  // `docs/specs/storeroom-js/**` as written. **WHAT IS DRIVEN INSTEAD, AND IT IS THE WHOLE OF `DD-54`'s
  // OBSERVABLE THAT IS CONSTRUCTIBLE: *"ONE ORDER, ONE OBSERVABLE: after any `off` that throws, BOTH the
  // store-side entry and the registry entry are exactly as they were."*** Every throwing `off` this surface
  // can produce is driven at its two observable halves below, and no assertion about the unreachable half is
  // fabricated to fill the gap.
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  assert.equal(typeof inst.on, 'function', '`surface.md §2.4` item 7: `on(address, listener)` is a member of the instance');
  assert.equal(typeof inst.off, 'function', '`surface.md §2.4` item 7: `off(handle)` is a member of the instance');

  // A STANDING registration at a HELD address (`listen` first, then `on` at the same address — the HELD arm),
  // and a second one at another address, so "both entries as they were" is measurable at two places.
  const first = listen(inst, ['order']);
  let heldFired = 0;
  let otherFired = 0;
  assert.equal(inst.on(['order'], () => { heldFired += 1; }), first, 'the held arm: the same handle');
  const other = inst.on(['other'], () => { otherFired += 1; });

  const beforeSet = triggerSet(inst, ['order'], 'mem', 1);
  assert.equal(beforeSet.length, 1, 'the pre-state: ONE store-side entry at `order`');

  // --- (i) A REFUSED `off`: THE OUTSIDE HANDLE. NEITHER REMOVAL IS PERFORMED (`§2.4` item 7 (b)'s OUTSIDE
  // arm: *"`AddressMalformed` in `§2.5`'s single form, and NEITHER removal is performed"*).
  const stranger = mem();
  const foreign = stranger.on(['f'], () => {});
  const trouble = isRefusal(() => inst.off(foreign), {});
  assert.equal(trouble, null, `\`off\` over an outside handle refuses in the one form: ${trouble}`);
  assert.equal(inst.off(other), undefined, 'an in-domain handle still succeeds, so the refusal did not wedge the instance');

  // ...and the STORE-SIDE half of the refused handle was not touched: the foreign instance's own entry
  // still fires, so a package that withdrew store-side BEFORE the registry half is caught here.
  let foreignFired = 0;
  // The foreign instance's entry is reachable through ITS OWN instance, whose registry its own `on` wrote;
  // a second `on` there REPLACES (`§2.4` rule 2), so the count below proves the entry still exists at all.
  assert.equal(inst.off(other), undefined, 'an in-domain handle still succeeds'); // eslint-disable-line
  const strangerAgain = stranger.on(['f'], () => { foreignFired += 1; });
  assert.equal(strangerAgain, foreign, '`on` at the foreign instance\'s held address answers the existing identity');
  const stillThere = triggerSet(stranger, ['f'], 'mem', 1);
  assert.equal(stillThere.length, 1, 'the refused `off` performed NO store-side withdrawal anywhere');
  assert.equal(stillThere[0], foreign, 'and the foreign identity is intact');
  assert.equal(foreignFired, 1, 'and the foreign registration still fires');

  // --- (ii) THE HELD-ADDRESS HALF: the standing entry at `order` is EXACTLY what it was, and its function
  // still fires — a refused `off` that disturbed a standing entry would be caught here.
  const afterSet = triggerSet(inst, ['order'], 'mem', 2);
  assert.equal(afterSet.length, beforeSet.length, 'the standing store-side entry COUNT is unchanged');
  assert.equal(afterSet[0], beforeSet[0], 'and it is the SAME identity');
  assert.equal(heldFired, 1, 'and the standing registration still fires');

  // --- (iii) AND THE ORDER'S POSITIVE HALF, ONE STEP AT A TIME (`§2.4` item 7 (b), steps 1–3): after the
  // in-domain success of `off(other)`, (step 2) the store-side entry is withdrawn AND (step 3) the
  // registry's entry is removed — and the SIBLING at `order` is untouched by both.
  const otherAfter = triggerSet(inst, ['other'], 'mem', 3);
  assert.equal(otherAfter.length, 0, 'step 2: the store-side withdrawal landed');
  const remint = listen(inst, ['other']);
  assert.notEqual(remint, other, 'step 3: the registry entry is gone, so a re-`listen` mints a FRESH identity');
  const siblingNow = triggerSet(inst, ['order'], 'mem', 4);
  assert.equal(siblingNow.length, 1, 'the sibling at `order` stands');
  assert.equal(siblingNow[0], beforeSet[0], 'and is the same identity it was');
});

// =============================================================================================
// 6. THE SURFACE CLAIMS AT THEIR NEW VALUES — `surface.md §2.1` and its dated clause (a)–(b);
//    `§2.4` item 7's opening line; `contract.md §5.5`'s named false cells; the convenience proposal's
//    `A79` verbatim. **AND NOTHING IS RENAMED AND NOTHING IS WEAKENED: the two OLD spellings
//    (`{ register }` on the instance, and the eight-verb namespace) are asserted at their NEW values
//    BESIDE each other, so a cell cannot satisfy one by dropping the other.
// =============================================================================================

test('the_instance_member_set_is_register_on_off_and_the_module_namespace_is_unchanged_at_the_eight_declared_verbs', async () => {
  const inst = mem();

  // --- (a) THE INSTANCE'S OWN MEMBER SET: `{ register, on, off }` — THREE OWN MEMBERS AND NOTHING ELSE.
  assert.deepEqual(
    memberSet(inst),
    ['off', 'on', 'register'],
    '`§2.1`\'s dated clause (a): the member set is `{ register, on, off }` and NOTHING ELSE',
  );
  assert.equal(typeof inst.on, 'function', '`on(address, listener)` is a member of the factory\'s own product');
  assert.equal(typeof inst.off, 'function', '`off(handle)` is a member of the factory\'s own product');
  assert.equal(typeof inst.register, 'function', 'and `register` is UNMOVED in spelling (`§2.4` item 5 (a))');

  // --- (b) **THE MODULE NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS, AND NEITHER `on` NOR `off` IS
  // ADDED TO THE ENTRY'S NAMED EXPORTS** — `§2.1`'s dated clause (b), *"because both are reached through the
  // FACTORY'S OWN PRODUCT and through nothing else"* — so a drive asserts the count AND the absence of the
  // two names, and asserts that the FACTORY is still reachable so the cell cannot pass on an empty module.
  const namespace = await import('@provident-storeroom/js');
  const names = Object.keys(namespace).sort();
  assert.deepEqual(
    names,
    ['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write'],
    '`§2.9` item 1\'s `8`-name count, UNMOVED: no ninth name and no name removed',
  );
  assert.equal(names.length, 8, 'the count is EIGHT');
  assert.equal(names.includes('on'), false, '`on` is NOT a named export — it is reached through the instance');
  assert.equal(names.includes('off'), false, '`off` is NOT a named export — it is reached through the instance');
  // The FACTORY is present in the same namespace, so the two absences are not the absence of the module.
  assert.equal(typeof namespace.storeCreate, 'function', 'the construction verb is still exported');

  // --- (c) **AND THE STORE'S OWN TWO VERBS ARE UN-OVERLOADED** (`§2.1`'s dated clause (c); `§2.10`):
  // `listen(instance, address)` and `unlisten(instance, handle)` keep their names, positions, arity and
  // returns. **THE ARITY AND RETURN HALVES ARE DRIVEN AT A HELD ADDRESS, WHERE A THIRD-ARGUMENT OVERLOAD
  // WOULD BE MOST TEMPTING:** a `listen` handed a listener in the third position mints and IGNORES it —
  // the function is never invoked, and the store's own `listen` answers exactly as it does with two
  // arguments — and `unlisten`'s answer stays `undefined`.
  const over = mem();
  let smuggled = 0;
  const twoArg = listen(over, ['u']);
  const threeArg = listen(over, ['u'], () => { smuggled += 1; });
  assert.equal(threeArg, twoArg, '`listen(instance, address)` is unchanged: the repeat answers the entry\'s own handle');
  triggerSet(over, ['u'], 'mem', 1);
  assert.equal(smuggled, 0, 'no third-argument listener is registered by `listen` — the arity is NOT widened');
  assert.equal(unlisten(over, threeArg), undefined, '`unlisten(instance, handle)` answers `undefined` as declared');
});

// =============================================================================================
// 7. `off`'s OUTSIDE HANDLE CLASSES — `parameter-semantics.md §2.8` (§2.8's row and its dated clauses),
//    `§2.17`'s dated clause item 3, `surface.md §2.3`'s dated clause 2 and `§2.4` item 7 (b)'s OUTSIDE
//    arm. **MEMBER-BY-MEMBER ON THE REFUSAL'S OWN FORM.** THE FAILURE ENTRY THIS CELL CATCHES:
//    "an ADDRESS ADMITTED UNVALIDATED" on the `off` side — an outside handle that removes anything,
//    or that answers `unlisten`'s no-op success.
// =============================================================================================

test('off_over_every_outside_handle_class_is_refused_address_malformed_in_the_one_form_and_removes_neither_half', () => {
  // **THE OUTSIDE CLASSES, ENUMERATED EXHAUSTIVELY FROM `§2.17`'s DATED CLAUSE ITEM 3 AND `§2.8`'s
  // OUTSIDE-VALUE LIST:** a FOREIGN instance's value · a PRIOR SESSION's value · a FABRICATED value · a
  // BARE `string` · a BLANK token · a NON-OPAQUE value · `null` · `undefined` · an ABSENT argument · a
  // NON-FUNCTION. **THE CLASS SET IS CLOSED, AND EACH CLASS ANSWERS THE SAME ONE CODE AND THE SAME ONE
  // FORM.** The prior-session value is spelled for this process exactly as `DD-28`'s hazard declares it:
  // the store's own `listener-<n>` namespace is guessable, and a token this process never minted is what a
  // prior session's value IS at this boundary.
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  assert.equal(typeof inst.on, 'function', '`surface.md §2.4` item 7: `on(address, listener)` is a member of the instance');
  assert.equal(typeof inst.off, 'function', '`surface.md §2.4` item 7: `off(handle)` is a member of the instance');
  let fired = 0;
  const standing = inst.on(['standing'], () => { fired += 1; });
  const stranger = mem();
  const foreign = stranger.on(['f'], () => {});
  const fabricated = { token: 'listener-999999' };

  const outside = [
    { what: 'a FOREIGN instance\'s value', value: foreign, why: 'a plain object' },
    { what: 'a PRIOR SESSION\'s value', value: 'listener-1', why: 'a string' },
    { what: 'a FABRICATED value', value: fabricated, why: 'a plain object' },
    { what: 'a BARE string', value: 'l1', why: 'a string' },
    { what: 'a BLANK token', value: '', why: 'a string' },
    { what: 'a NON-OPAQUE value', value: {}, why: 'a plain object' },
    { what: '`null`', value: null, why: 'null' },
    { what: '`undefined`', value: undefined, why: 'undefined' },
    { what: 'a NON-FUNCTION', value: () => {}, why: 'a function' },
  ];

  for (const one of outside) {
    const trouble = isRefusal(() => inst.off(one.value), {
      target: targetSpelling(one.value),
      why: one.why,
      position: 'first argument',
    });
    assert.equal(trouble, null, `${one.what} at \`off\` must refuse \`AddressMalformed\` in the one form: ${trouble}`);
    // AND THE CLASS THAT IS REFUSED IS THE CLASS THE VALUE HAS, NEVER A SUBSTITUTE (`§1.8`'s no-repair
    // prohibition): `String(fabricated)` is `[object Object]` and the message names THAT, so a package that
    // rendered a class token of its own would fail beside the assertion above.
  }
  // AN ABSENT ARGUMENT IS ITS OWN ARM OF THE SAME CLASS SET (`§2.17`'s dated clause item 3, *"or an ABSENT
  // argument"*), and its target renders as the runtime's own `undefined`.
  {
    const trouble = isRefusal(() => inst.off(), { target: 'undefined', why: 'undefined', position: 'first argument' });
    assert.equal(trouble, null, `an absent handle at \`off\` must refuse verbosely: ${trouble}`);
  }

  // **AND NEITHER REMOVAL IS PERFORMED IN ANY OF THEM** — the tenth assertion of this cell, and the one that
  // makes it an atomicity drive rather than a form drive: the standing registration is EXACTLY as it was,
  // and the store's home still holds its entry (`§2.4` item 7 (b)'s OUTSIDE arm).
  const standingNow = triggerSet(inst, ['standing'], 'mem', 1);
  assert.equal(standingNow.length, 1, 'the standing store-side entry was not withdrawn by any refused `off`');
  assert.equal(standingNow[0], standing, 'and it is the same identity');
  assert.equal(fired, 1, 'and its function still fires');

  // THE CONTRAST, ON THE SAME NINE VALUES, AT `unlisten` — each a NO-OP SUCCESS that removes NOTHING
  // (`§2.3` item 4; `PAR-JS-8`'s declared answer for every outside value; `§2.3`'s dated clause 3). **THE
  // TWO VERBS ANSWER ONE VALUE DIFFERENTLY BY DECLARATION AND NOT BY OVERSIGHT.**
  for (const one of outside) {
    assert.equal(
      unlisten(inst, one.value),
      undefined,
      `\`unlisten\` over ${one.what} is a NO-OP SUCCESS, and it is NOT \`off\`'s refusal`,
    );
  }
  assert.equal(unlisten(inst), undefined, 'and an absent handle at `unlisten` is that same no-op success');

  const afterContrast = triggerSet(inst, ['standing'], 'mem', 2);
  assert.equal(afterContrast.length, 1, 'and no outside value at `unlisten` removed the standing registration');
  assert.equal(afterContrast[0], standing, 'the identity is unmoved');
  assert.equal(fired, 2, 'and the function fired once more');
});
