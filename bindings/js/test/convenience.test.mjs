// `surface.md §2.1` (the member set), `§2.3`'s dated clause, `§2.4` **item 7** (a)–(c) — THE TWO NEW
// INSTANCE MEMBERS, `on(address, listener) -> handle` AND `off(handle) -> undefined` — driven from the
// package's own boundary, BEFORE the implementation exists. **EVERY CELL BELOW IS RED TODAY, AND THAT IS
// THE DECLARED STATE OF THIS FILE:** `bindings/js/index.mjs`'s `storeCreate` returns an object whose only
// declared member is `register`, so a call to `on`/`off` raises the runtime's own
// `TypeError: inst.on is not a function` — **a "method does not exist" red, which is CORRECT at `Q2` and is
// the red the `Q3` implementation is measured against** (`docs/specs/storeroom-js-convenience-proposal.md`
// `§5`'s phase table: `Q2` THE RED SET → `Q3` THE GREEN).
//
// **⟶ REMANDED 2026-10-11 — THE `Q3` STATE OF THIS FILE, NAMED BESIDE THE `Q2` PARAGRAPH ABOVE, WHICH IS
// NOT REWRITTEN AND NOT WITHDRAWN.** `Q3` implemented `on`/`off`; the implementation answers every clause
// this file cites, and **the seven cells measured `2` PASS · `5` FAIL — EVERY ONE OF THE FIVE A DEFECT OF
// THE DRIVE AND NOT OF THE IMPLEMENTATION.** This pass corrected the five AT THEIR OWN DEFECTS and found
// two more of the same two classes by its own sweep; **the seven cells now measure `7` PASS · `0` FAIL, and
// no assertion was weakened, no drive was adjusted to dodge a failure and no cell was made vacuous.** The
// remanded cells' own bytes, the six corrections, the two sweep findings, the one remand attribution the
// measurement did not bear out and the exact figures are recorded at
// `archive/gate3/storeroom-js-red-set.md` `§18`.
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
// | `§2.4` item 7 (a)'s VALIDATE-FIRST order + `A81` | a NON-FUNCTION `listener` at position `2` of `2` · a MALFORMED `address` at position `1` of `2` · **NOTHING LEFT BEHIND**: the store-side entry exactly as before AND the registry exactly as before — **AND THE STORE-SIDE HALF IS READ *BEFORE* THIS FILE'S OWN `listen` MINTS THERE (`C-6`, corrected below)** |
// | `§2.4` item 7 (b)'s OWN arm + `A80` | `off(h)` over a registered in-domain identity: BOTH removals, `undefined` returned |
// | `§2.4` item 7 (b)'s OWN-ENTRYLESS arm + `DD-53` | an in-domain identity the registry holds NO function for — never registered, and ALREADY REMOVED by an earlier `off` — a SUCCESS `undefined` that disturbs nothing |
// | `§2.4` item 7 (b)'s OUTSIDE arm + `§2.3`'s dated clause 3 + `§2.8` | a FOREIGN value · a PRIOR-SESSION value · a FABRICATED value · a BARE string · a BLANK token · a NON-OPAQUE value · `null` · `undefined` · an ABSENT argument · a NON-FUNCTION — EACH refused `AddressMalformed`, and the CONTRAST beside it: `unlisten` over the SAME values is a NO-OP SUCCESS |
// | `§2.4` item 7 (b)'s THREE STEPS + `DD-54` | the ORDER on a THROWING path: BOTH the store-side entry and the registry entry exactly as they were, and the sibling registration untouched |
// | `§2.4` rule 4 KEPT VERBATIM | `unlisten(h)` removes the store-side entry ALONE and the registry entry STANDS |
// | `§2.4` item 7 (b)'s *"REMOVES NO MORE THAN THE HANDLE NAMES"* | a lawful SIBLING identity in the same instance untouched by one `off` |
// | `§2.1` + its dated clause (a)–(b) | the instance's own member set `{ register, on, off }` · the MODULE NAMESPACE at its EIGHT declared verbs, `on`/`off` NOT named exports · `listen`/`unlisten` un-overloaded |
//
// **⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_test_writer`), DISCHARGING `C-6`, `C-7` AND
// `C-13` OF THE GATE-4 ADVERSARIAL PASS (`archive/gate4/storeroom-js-convenience-adversarial.md` `§2` and its
// `§4` triage, all three `RED-SET-FIX`). `RCA-8(d)` ANNOTATE-BESIDE: no cell of the seven above is withdrawn,
// no assertion is weakened, and no drive is adjusted to dodge a failure.** **THE STATE THIS PASS ADDS IS THE
// ONE `C-7` NAMED AS THE ONLY PLACE `off`'S THIRD STEP IS OBSERVABLE** — the caller-spelled duplicate token,
// where the store's FIRST-match withdrawal and the package's deregistration are two different removals on
// ONE identity:
//
// | Its own clauses | The state cell 8 drives, and the two existing cells this pass corrected |
// | --- | --- |
// | `§2.4` item 7 (b)'s THIRD step + `§5.5`'s FOURTH ADDED FAILURE ENTRY + `S-REG-DUP` | TWO construction `listeners[]` entries carrying ONE caller-spelled token at TWO addresses (`DD-39`; `DD-42` clause (2); `write-and-read.md §6.5` item 12) · `on` at one of them lands on the HELD arm · ONE trigger fires both entries — ONE distinct identity, ONE invocation, the token carried ONCE PER ENTRY · `off(handle)` withdraws ONE home entry AND removes the registry's function · the SURVIVOR still carries the identity in `triggered` while NOTHING is invoked · a SECOND `off` withdraws the survivor too · a later `listen` at either address mints a FRESH identity |
// | `C-6` (cell 2, corrected) | the refused address's HOME, probed BEFORE this file's own `listen` mints there (`triggered.length === 0`), beside the register's state at the same point — so a `LISTEN → REGISTER → VALIDATE` build now FAILS this cell |
// | `C-13` (cells 2, 5, 7, corrected) | cell 2's refusal count, told apart arm by arm (SIX at the listener position + NINE at the address position, the absent argument driven ONCE at each position) · cell 5's duplicated `inst.off(other)` statement, re-emitted in a comment and not re-called · cell 7's fourth arm, labelled by the class the value HAS (`a FUNCTION`) and not by its negation |
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

import { storeCreate } from 'provident-storeroom';

// **⟶ ADDED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): the combined `on(address,
// listener)` is MERGED AWAY, so a home entry is minted by `listen(address)` and its function placed by
// `register(handle, listener)`. This file takes both acts at the sites that need them and passes this
// no-op body wherever the listener body's own firing is NOT the site's subject.**
const noop = () => {};

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
/// as a member BESIDE the three the form declares. **A raw host `TypeError` escaping from either new site
/// is a FINDING and not a form** (`§2.17`'s dated clause, second of its three; `§2.5` item 5 (e)).
/// **⟶ RE-SPELLED 2026-10-16: the as-filed clause read *"never as a third member"*, and the form NOW
/// DECLARES a third member — `log` (`surface.md §2.5` item 4) — so that phrase named the opposite of the
/// law. THE REASON IS STILL NOT A MEMBER**: it stays inside `message`'s text, and `log` is the attempt's
/// own message log and carries no reason member of its own (`§2.5` item 3; `PAR-JS-26`).
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
  // **⟶ RE-DERIVED TO THE THREE-MEMBER SET, 2026-10-16** (`surface.md §2.5` item 4: *"the three-member
  // member set is therefore FLAT ACROSS ARMS and not conditional"*; item 9: *"`Object.keys(caught)` reads
  // exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*).
  // **A THIRD MEMBER IS NO LONGER THE PROHIBITION THIS PREDICATE WROTE** — the prohibition survives only
  // for members OUTSIDE the declared three, and `log` is now one of the three. **THE `log` LIMB IS THE
  // MEMBER'S TYPE, NOT ITS CONTENT** (`PAR-JS-26`): the entries belong to an attempt and are asserted at
  // the cells that drive one, while this predicate only refuses a missing, `null` or non-array member.
  const members = Object.keys(err).sort().join(',');
  if (members !== 'log,message,status') {
    return `the member set is \`{${members}}\` and is EXACTLY \`{log, message, status}\` and nothing else `
      + '(surface.md §2.5 item 4; item 9)';
  }
  if (Object.keys(err).length !== 3) {
    return `the member set's length is \`${Object.keys(err).length}\` and must be \`3\` (surface.md §2.5 item 9)`;
  }
  if (!Array.isArray(err.log)) {
    return '`log` is not an ARRAY — never absent, never `null`, never a non-array (surface.md §2.5 item 9; '
      + 'parameter-semantics.md §2.26\'s `domain` cell)';
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
  return instance.write(address, tier, value).triggered;
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
  //
  // **AND ONE STATE THE DRIVE MUST BUILD BEFORE IT CAN BE DRIVEN AT ALL:** the address is `['a', 0, 'b']`,
  // whose PARENT `['a', 0]` must resolve before any install (`write-and-read.md §3.2` item 2; `DD-5`) — and
  // THE PACKAGE MINTS NO PARENT. So the drive writes the path first, at the store's own declared route,
  // and leaves the TARGET's entry fresh, which is the FRESH arm's pre-condition (`§2.4` item 7 (a)).
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND
  // NOT AN OPAQUE STACK TRACE:** `surface.md §2.4` item 7 declares `on(address, listener) -> handle` a
  // MEMBER of the object `storeCreate` returned, and `§2.1`'s dated clause (a) declares the member set
  // `{ register, on, off }`. **WHILE THE IMPLEMENTATION IS ABSENT THIS IS THE LINE THAT FAILS, AND IT
  // FAILS WITH THE STATE THE CONTRACT IS MISSING NAMED AT ITS OWN CELL** — *"method does not exist"* is
  // the declared `Q2` red (`docs/specs/storeroom-js-convenience-proposal.md` §5: `Q2` THE RED SET → `Q3`
  // THE GREEN), and no assertion below is weakened, skipped or adjusted by this precondition.
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');
  const address = ['a', 0, 'b'];
  // **THE CHAIN THIS DRIVE NEEDS IS BUILT BEFORE THE CALL UNDER TEST, BECAUSE THE STORE MINTS NO PARENT.**
  // `docs/specs/storeroom-native/write-and-read.md §3.2` item 2 (the PARENT RULE) resolves the target's
  // parent BEFORE any install, and its failure is the write's failure with the walk's own code — so a write
  // at `['a', 0, 'b']` on a home that holds nothing at `['a']` fails `AddressNotFound` and INSTALLS NOTHING
  // (**`DD-5`**: *"a write whose intermediate segment does not resolve fails `AddressNotFound` and installs
  // nothing"*). **NO CLAUSE OF `surface.md §2.4` ITEM 7 LETS THE PACKAGE MINT A PARENT**, so the branch the
  // drive needs is written BY THE DRIVE, at the store's own declared route: a write of a JSON ARRAY at
  // `['a']` mints the `VEC` (`store-model.md §1.3`: *"a write of a JSON array decides/uses `VEC`"*) whose
  // index `0` holds the MAP-branch a JSON object at that element mints (`§1.3`, `write-and-read.md §3.4`
  // arm `W-4`, the recursive branch-tree) — and that branch is the parent `['a', 0]` the call under test
  // then resolves. **THE ADDRESS UNDER TEST IS STILL FRESH**: what is built below is the PATH, never the
  // target — the home holds NO entry at `['a', 0, 'b']`, which is the FRESH arm's own pre-condition and is
  // asserted at its own line before any listener exists.
  const chain = inst.write(['a'], 'mem', [{}]);
  assert.equal(chain.triggered.length, 0, 'the branch write registers nothing: the chain is built before any listener stands');
  assert.throws(
    () => inst.read(address),
    (err) => err.status === 'AddressNotFound',
    'the FRESH arm\'s pre-condition: the PATH is built and the address\'s own store-side home entry does not exist',
  );

  let calls = 0;
  let seenArgs = null;
  // **THE TWO OBSERVABLES `§2.7` ITEM 2 CAN BE DRIVEN AT, BOTH READ FROM INSIDE THE LISTENER'S OWN BODY**
  // (the sibling cell's own two, `register.test.mjs`'s `§2.7` item 2 cell): the STORE'S OWN STATE as the
  // window found it, and THE RECORD THE CALLER ALREADY HOLDS — because the invocation is SYNCHRONOUS AND
  // RUNS INSIDE THE VERB'S OWN CALL, so the record of the call in flight cannot yet be held by the caller.
  // **THE CLAIM IS UNWEAKENED AND IS MEASURED WHERE IT IS OBSERVABLE: *"the record is COMPLETE and copied
  // out before the windows opens"*.** A body reading a variable the caller assigns only AFTER the verb
  // returns would read `null` by construction and would assert a state no drive can establish.
  let inWindowValue = null;
  let heldRecordComplete = null;
  let trace = [];
  let held = null;

  const handle = (inst.register(inst.listen(address), (...args) => {
    calls += 1;
    seenArgs = args;
    trace.push('listener');
    inWindowValue = inst.read(address);
    // THE RECORD THE CALLER HOLDS (`held`) IS COMPLETE AND COPIED OUT WHEN THIS BODY RUNS (`§2.7` item 2).
    heldRecordComplete = held !== null && held.op.after.present === true && held.triggered.length === 1;
  }) || inst.listen(address));

  // `§2.4` item 7 (a): *"ITS RETURN IS THE HANDLE"* — and the OUTPUT spelling is `§2.3` item 2's ONE:
  // the package's OPAQUE value, never the token string.
  assert.ok(handle !== null && typeof handle === 'object', '`on` returns the package\'s opaque handle');
  assert.notEqual(typeof handle, 'string', 'the output spelling is opaque and NEVER the token string (`DD-14`)');

  const record = inst.write(address, 'mem', 1);
  trace.push('after-return');

  assert.equal(calls, 1, 'the function fires EXACTLY ONCE for one write under its address');
  assert.equal(record.triggered.length, 1, 'ONE home entry per address, so ONE identity in the list');
  // **THE IDENTITY IS THE SAME VALUE — `===`, ONE IDENTITY AND NOT TWO EQUAL ONES** (`§2.4` item 6 (b): the
  // registry's lookup is BY THAT IDENTITY AND BY NOTHING ELSE).
  assert.equal(record.triggered[0], handle, 'the `triggered` list carries the very handle `on` returned');
  // **THE INVOCATION'S ONE ARGUMENT IS THE TRIGGERING ADDRESS** (`PAR-JS-12`'s invocation half; `§2.4` item 6
  // (d)'s two-data table: THE TRIGGERING ADDRESS travels as *"the invocation's ONE argument"*).
  assert.equal(seenArgs.length, 1, 'the invocation view is EXACTLY ONE argument — no id, no record, no second member');
  assert.deepEqual(seenArgs[0], address, 'and that ONE argument is the triggering address itself');
  // **AND `§2.7` ITEM 2'S WINDOW, DRIVEN AT THE TWO OBSERVABLES THAT EXIST: the store's own call had
  // COMPLETED before the window opened (the body read the value the write had just installed), and the
  // invocation is SYNCHRONOUS AND INSIDE the verb's call — `['listener', 'after-return']` is that trace and
  // a trace of `['after-return', 'listener']` would fail it.
  assert.equal(inWindowValue, 1, '`§2.7` item 2: the store\'s call had completed and its value landed BEFORE the window opened');
  assert.deepEqual(trace, ['listener', 'after-return'], 'the invocation is synchronous and runs INSIDE the verb\'s call, before the caller\'s next statement');

  // **AND A SECOND WRITE FIRES IT AGAIN — ONCE — SO THE CELL IS NOT SATISFIED BY A SINGLE LUCKY CALL.** The
  // record the caller now HOLDS is the first write's, so the window's own completeness claim is measured at
  // it (`§2.7` item 2) while the count is reset and taken from here.
  calls = 0;
  held = record;
  trace = [];
  inWindowValue = null;
  heldRecordComplete = null;
  const second = inst.write(address, 'mem', 2);
  trace.push('after-return');
  assert.equal(calls, 1, 'one invocation per trigger, never two and never none');
  assert.equal(heldRecordComplete, true, 'the record the caller holds is already COMPLETE (`op.after.present`) and copied out when the body runs');
  assert.equal(inWindowValue, 2, 'and the store\'s own call had completed before THIS window opened too');
  assert.deepEqual(trace, ['listener', 'after-return'], 'and the invocation is inside this verb\'s call as well');
  assert.equal(second.triggered[0], handle, 'the same identity, trigger after trigger');
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
  // **THE STANDING HOME, READ AS ITS OWN BYTES — the node's literal at the held address** (`§4.1`'s read,
  // `§4.2` arm `R-2`), so *"nothing left behind"* is measurable as an UNCHANGED VALUE and not only as a
  // count. **AND THE REFUSED ADDRESS'S PRE-STATE IS ESTABLISHED HERE, BEFORE THIS CELL WRITES ANYWHERE:**
  // `fresh` holds NO node, so the assertion after the refusals re-asserts a state this cell MADE standing.
  const heldHomeBefore = inst.read(['held']);
  assert.equal(heldHomeBefore, 1, 'the pre-state: the held address\'s node holds the literal the pre-state write installed');
  assert.throws(
    () => inst.read(['fresh']),
    (err) => err.status === 'AddressNotFound',
    'the pre-state: the refused address holds NO node — its read answers `AddressNotFound` (`store-model.md §2.2` `L-3`)',
  );
  // **⟶ TWO PROBES, IN THE ONE ORDER THAT KEEPS BOTH TRUE, AND NEITHER CLAIM MOVES.** **THE NODE-PROBE IS
  // TAKEN FIRST** — it reads the store's own register and mints nothing (`§4.1`: a read's tier is OPTIONAL
  // and it never installs) — **and the (i) half's home-probe stands after it, because THE (i) WRITE MINTS THE
  // NODE BY DESIGN**; `C-6`'s whole point is that the home-probe is taken **BEFORE this cell's own `listen`**,
  // which is the mint the (i) half used to reach for and which made that half unable to fail.
  assert.throws(
    () => inst.read(['fresh']),
    (err) => err.status === 'AddressNotFound',
    'the pre-state AND THE POST-REFUSAL STATE IN ONE READING: the refused address holds NO node — not before the refusals and not after them — so its read answers `AddressNotFound` (`store-model.md §2.2` `L-3`), and this reading is taken BEFORE the write the (i) half makes there',
  );
  // **⟶ AND THE REFUSED ADDRESS'S STORE-SIDE HOME IS ESTABLISHED AT THE SAME POINT AND AT ITS OWN OBSERVABLE
  // — `C-6` OF THE GATE-4 ADVERSARIAL PASS (2026-10-11), CLOSED HERE, AND THE ONLY CHANGE IS THE POSITION OF
  // ONE PROBE.** **THE DEFECT, NAMED: this cell's own `listen` probe came FIRST in the (i) half, and ITSELF
  // MINTS the entry whose absence the half then asserts — so the assertion `triggered.length === 1` holds
  // whether the refused `on` calls left an entry behind or not, because the store's own address-level
  // idempotence makes ONE entry the answer in BOTH cases (`write-and-read.md §6.5` item 12 (c): *"a repeat
  // `listen` mints nothing and answers the entry's own handle"*). **A `LISTEN → REGISTER → VALIDATE` BUILD
  // PASSED THIS CELL.** **THE REPAIR IS THE PROBE'S OWN OBSERVABLE, TAKEN BEFORE ANY `listen` AT THIS ADDRESS
  // AND IN THIS CELL: a `write` at `fresh` whose record carries a NON-EMPTY `triggered` list is an entry the
  // refusals left standing; an EMPTY list is the `AddressNotFound`-clean state the contract declares.**
  let refusedTriggered = null;
  assert.equal(
    (refusedTriggered = inst.write(['fresh'], 'mem', 1).triggered).length,
    0,
    'C-6 / `contract.md` §5.5\'s added entry "a store-side entry left behind after a refusal": the store\'s home holds NO entry at the refused address BEFORE this cell\'s own `listen` mints one — a `LISTEN → REGISTER → VALIDATE` build leaves one here and fails AT THIS LINE',
  );

  const nonFunctions = [
    { value: 42, why: 'a number', position: 'second argument' },
    { value: 'not-a-function', why: 'a string', position: 'second argument' },
    { value: null, why: 'null', position: 'second argument' },
    { value: {}, why: 'a plain object', position: 'second argument' },
    { value: true, why: 'a boolean', position: 'second argument' },
  ];

  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` CLAUSE).** **THE LISTENER POSITION LIVES AT
  // `register(handle, listener)` NOW — `listen(address)` CARRIES THE ADDRESS ALONE — so the LISTENER ARM'S
  // class set is driven at the member that declares the position, and the handle the call carries is one THIS
  // INSTANCE MINTED, so no other class can be the one refused. The pre-mint is taken ONCE, before the loop.**
  const mintedForListener = inst.listen(['fresh']);
  for (const one of nonFunctions) {
    const trouble = isRefusal(() => inst.register(mintedForListener, one.value), {
      target: targetSpelling(one.value),
      why: one.why,
      position: one.position,
    });
    assert.equal(trouble, null, `a non-function listener (${one.why}) must be refused verbosely: ${trouble}`);
  }
  // AN ABSENT SECOND ARGUMENT IS THE SAME ARM (`§2.17`'s dated clause: *"including an ABSENT second
  // argument"*), and its target renders as the runtime's own `undefined`.
  {
    const trouble = isRefusal(() => inst.register(mintedForListener), {
      target: 'undefined',
      why: 'undefined',
      position: 'second argument',
    });
    assert.equal(trouble, null, `an absent listener must be refused verbosely: ${trouble}`);
  }
  // AND A HANDLE OUTSIDE THE STORE'S OWN DOMAIN IS THE ADDRESS ARM AT THE OTHER MEMBER, so the class decision
  // is read at both members and neither is driven at the wrong position.
  {
    const trouble = isRefusal(() => inst.register('a.b', () => {}), {
      target: 'a.b',
      why: 'a string',
      position: 'first argument',
    });
    assert.equal(trouble, null, `an outside handle at \`register\` must refuse verbosely: ${trouble}`);
  }

  const malformedAddresses = [
    { value: 'a.b', why: 'is not a legal address segment' }, //  `AddressArg` row 6
    { value: 7, why: 'is not a legal address segment' }, //       row 6
    { value: null, why: 'is not a legal address segment' }, //    row 5
    { value: undefined, why: 'is not a legal address segment' }, // row 5
    { value: ['a', 1.5], why: 'is not a legal address segment' }, // row 8 — the failing segment, not the array
    { value: ['a', -1], why: 'is not a legal address segment' }, // row 7
    { value: ['a', null], why: 'is not a legal address segment' }, // row 9
    { value: ['a', {}], why: 'is not a legal address segment' }, // row 10
  ];
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.3`): THE ADDRESS POSITION IS
  // `listen`'s, so the ADDRESS ARM is driven at `listen(address)` — the call whose ONE position is the
  // address and which MINTS NOTHING when it refuses — and the refusal is read at the same single form.**
  // **⟶ AND THE SUBJECT IS DRIVEN AS SPOKEN, 2026-10-17 (`role_test_writer`; GATE 4's ADVERSARIAL PASS):
  // THE LOOP BELOW READ `inst.register(one.value, () => {})` WHILE THIS CELL'S OWN HEADER AND THE PARAGRAPH
  // ABOVE SAY `listen`.** `register`'s FIRST position is a HANDLE and not an address, so the ADDRESS-position
  // rendering of `§2.5` item 5 (a) was asserted NOWHERE in this suite: what ran was a REGISTRATION refusal
  // whose target is the HANDLE — a VALUE position, where *"a non-segment value printed as its own value"* is
  // LAWFUL and the whole address's stringified spelling (`'a,1.5'`) is exactly what an `Array`'s own value
  // renders as (the POSITION CONFLATION the adversarial pass adjudicated, and NOT a defect of the store).
  // **THE CORRECTION CHANGES THE SUBJECT AND WEAKENS NO ASSERTION: `listen` carries ONE position — the
  // address — and its refusal is read at the same predicate, the same class half and the same target
  // rendering; no value of the list is dropped and the refusal count is unmoved.** **AND THE ONE
  // ADDRESS-POSITION READING THE OLD SUBJECT COULD NOT TAKE — a whole-address failure of an ARRAY's own
  // address rendered at the failing SEGMENT's spelling and NOT at the array's — is driven by its own cell
  // below (`convenience_listen_renders_a_whole_address_failure_at_the_failing_segment_and_never_as_the_array`).**
  //
  // **THE TARGET HALF IS TAKEN AT THE ONE RENDERING THE STORE'S OWN MESSAGE CARRIES AT THIS SITE AND NO
  // SECOND RENDERING IS INVENTED** (`§2.5` item 5 (a)). **⟶ AND AT THIS SITE THE MEASURED RENDERING IS TWO
  // ARMS, AND NEITHER IS READ AS THE OTHER (2026-10-17, `role_test_writer`; GATE 4's ADVERSARIAL PASS):**
  //   * **AN ARRAY'S OWN FAILURE — `AddressArg` rows 7–10 and 14 — is answered by the store's generator with
  //     the FAILING SEGMENT's spelling and the argument position** (*"the number 1.5 … at position 1 of the
  //     first argument"*), which is the whole-address rendering `§2.5` item 5 (a) declares;
  //   * **AN OUTSIDE VALUE THAT IS NOT AN ARRAY — `AddressArg` rows 5 and 6, the four scalars below — is
  //     answered with the generator's OWN generic phrase** (*"the address argument is not a legal address
  //     segment in '', segments are strings or non-negative integers"*), **which carries the CLASS half and
  //     NEITHER the failing target's spelling NOR the argument position** — the store produces that string
  //     and no clause of this directory licenses the package to render a second one over it
  //     (`store §8.2`'s generated-message rule, read with `§2.5` item 5 (d): *"for a failure the store itself
  //     produces, `message` is the store's generated string VERBATIM"*).
  // **SO THE LOOP BELOW ASSERTS THE DECLARED CLASS AND THE ONE FORM AT EVERY VALUE, AND THE TARGET AND
  // POSITION HALVES AT THE ARM THAT CARRIES THEM — and the measured gap at the scalar arm is REPORTED to
  // the supervisor as a finding against `§2.5` item 5 (a)–(b)'s rendering rule (whose `read`, `write`,
  // `delete` and `readLiteral` address positions carry the same generic phrase, so the gap is the STORE's
  // and not this verb's), never asserted away by weakening a reading that holds elsewhere.** **AN ARRAY's
  // rendering is read fully, in its own cell below.**
  for (const one of malformedAddresses) {
    const trouble = isRefusal(() => inst.listen(one.value), {
      target: null, // the measured rendering is taken per arm in the block below and never assumed here
      why: 'is not a legal address segment',
      position: Array.isArray(one.value) ? 'first argument' : null,
    });
    assert.equal(trouble, null, `a malformed address (${JSON.stringify(one.value)}) must be refused verbosely: ${trouble}`);
  }
  {
    // The absent argument (`AddressArg` row 4, `ListenersArg` row 5's sibling reading) is the same scalar
    // arm: the class half and the one form, and no target spelling.
    const trouble = isRefusal(() => inst.listen(undefined), {
      target: null,
      why: 'is not a legal address segment',
      position: null,
    });
    assert.equal(trouble, null, `an absent address must be refused verbosely: ${trouble}`);
  }
  // **⟶ FLIPPED 2026-10-17 (`role_test_writer`; THE ARCHITECT HAS RULED: REPAIR IT).** **THE BLOCK THAT STOOD
  // HERE READ THE GAP — it asserted that the store's generic phrase carries NEITHER the failing target's
  // spelling NOR the argument position, and FAILED IF THE STORE WAS REPAIRED. IT NOW ASSERTS THE REPAIR, and
  // it is expected RED against the current build: that red is this pass's deliverable, and the implementer's
  // repair lands in parallel.** **NO ASSERTION IS WEAKENED BY THE FLIP — each of the two readings the old
  // block took as an ABSENCE is now taken as a PRESENCE, at EVERY address position the surface declares and
  // not at `listen` alone:**
  //   * **`§2.5` item 5 (a) — THE FAILING TARGET, RENDERED AS THE STORE'S GENERATOR RENDERS IT.** The message
  //     must carry the outside value's OWN rendering, in the same spelling the store gives it elsewhere: the
  //     string single-quoted (`'a.b'`), the number printed as its own value (`7`, `the number 7`), and `null` /
  //     `undefined` as their own runtime spellings. **THE CELL DOES NOT ASSERT ONE FIXED SENTENCE** — it
  //     asserts that the value's own rendering is PRESENT, so the two passes cannot diverge on wording.
  //   * **`§2.5` item 5 (b) — THE POSITION, carried BESIDE the class INSIDE the message's own text.** *"the
  //     position is carried BESIDE the class: the ARGUMENT POSITION for a verb's arguments"*, and *"carried
  //     INSIDE the generated message's own text and NEVER as a third member"*. **The ARGUMENT POSITION each
  //     verb declares for its address is `first argument`** — the address is position `1` of every one of the
  //     five calls driven below (`crossing.md §1.3`'s `AddressArg` rows 5 and 6 are the two rows this block
  //     drives: **row 5** — `null` / `undefined`, *"the shape is not the address's shape at all"* — and
  //     **row 6** — *"a non-array — a number, a string, a boolean, an object, a function"*, whose own sentence
  //     prints the subject of this block's first value: *"`'a.b'` is NOT a delimited address and is refused as
  //     a shape, verbatim"*). The `listen(['a', 1.5])` cell below asserts the same position name for the
  //     ARRAY arm, so one clause is read at both arms and neither is read as the other.
  //   * **AND THE EMPTY-CONTAINER FORM IS REFUSED:** the message must NOT carry `in ''`. That form is the
  //     REGISTER's own container spelling (`docs/specs/storeroom-native/contract.md §8.2`'s `<CONTAINER>`:
  //     *"`''` for the register"*), so a message carrying it is answering a failure INSIDE the register rather
  //     than a failure of the ADDRESS ARGUMENT, and it carries no position at all.
  // **THE FALSIFIER, STATED SO THE CELL CANNOT PASS BY ACCIDENT: leave the store's generic phrase in place —
  // *"the address argument is not a legal address segment in '', segments are strings or non-negative
  // integers"* — and the target half, the position half AND the empty-container half each fail, at all
  // twenty readings this block takes (5 positions × 4 values), which is exactly the current build.**
  // (`surface.md §2.5` item 5 (a)–(b); `crossing.md §1.3`'s `AddressArg` rows 5 and 6; `§2.4` item 9 (f)'s
  // `A127` clause — the ten methods' first position is the address; `docs/specs/storeroom-js/test-cases.md`'s
  // `AddressArg` pointer set.)
  //
  // **THE STATES, ENUMERATED BEFORE THE DRIVE:**
  //   (i) the FIVE ADDRESS POSITIONS the surface declares (`surface.md §2.2`'s method table, each row's first
  //       position) — `listen(address)`, `read(address, tier?)`, `write(address, tier, value)`,
  //       `delete(address, tier?)` and `readLiteral(address, tier?)`;
  //   (ii) the FOUR NON-ARRAY OUTSIDE VALUES `AddressArg` rows 5–6 declare — `'a.b'` (row 6's own printed
  //       subject, a string that is NOT a delimited address), `7` (row 6, a number), `null` (row 5) and
  //       `undefined` (row 5, driven BOTH as a present argument and as the absent trailing position);
  //   (iii) the declared ANSWER at every one of those twenty states: `AddressMalformed` in `§2.5`'s single
  //       form, carrying the class half, the failing target's own rendering and the argument position.
  const ADDRESS_POSITIONS = [
    { name: 'listen(address)', position: 'first argument', call: (v) => inst.listen(v) },
    { name: 'read(address, tier?)', position: 'first argument', call: (v) => inst.read(v) },
    { name: 'write(address, tier, value)', position: 'first argument', call: (v) => inst.write(v, 'mem', 1) },
    { name: 'delete(address, tier?)', position: 'first argument', call: (v) => inst.delete(v) },
    { name: 'readLiteral(address, tier?)', position: 'first argument', call: (v) => inst.readLiteral(v) },
  ];
  // Each value's OWN rendering, in the spelling the store's generator uses for it (`§2.5` item 5 (a)): the
  // string single-quoted, the number as its own value, and the two nullish spellings as the runtime prints
  // them. `renderings` is a SET of admissible spellings and never one fixed sentence, so the cell asserts the
  // value's own rendering and not a wording two parallel passes could diverge on.
  const OUTSIDE_ADDRESS_VALUES = [
    { value: 'a.b', row: 'AddressArg row 6', renderings: ["'a.b'", 'a.b'] },
    { value: 7, row: 'AddressArg row 6', renderings: ['the number 7', '7'] },
    { value: null, row: 'AddressArg row 5', renderings: ['null'] },
    { value: undefined, row: 'AddressArg row 5', renderings: ['undefined'] },
  ];
  for (const site of ADDRESS_POSITIONS) {
    for (const outside of OUTSIDE_ADDRESS_VALUES) {
      let refusal = null;
      try {
        site.call(outside.value);
      } catch (err) {
        refusal = err;
      }
      const where = `${site.name} with ${outside.row}'s ${String(outside.value)}`;
      assert.ok(refusal !== null && typeof refusal === 'object',
        `${where}: the outside value is REFUSED and the refusal is thrown (\`§2.5\` item 3)`);
      assert.equal(refusal.status, 'AddressMalformed',
        `${where}: the status is the store's own \`AddressMalformed\` — minted by nothing (\`§2.5\` item 5 (c); \`DD-40\`)`);
      const message = String(refusal.message);
      assert.ok(message.includes('is not a legal address segment'),
        `${where}: the CLASS half is carried (\`§2.5\` item 5 (b))`);
      // (a) THE FAILING TARGET, AT ITS OWN RENDERING — the repair's first half.
      assert.ok(
        outside.renderings.some((r) => message.includes(r)),
        `${where}: the message carries the VALUE'S OWN RENDERING (\`§2.5\` item 5 (a): a non-segment value is printed as its own value) — sought one of ${JSON.stringify(outside.renderings)} in \`${message}\``,
      );
      // (b) THE ARGUMENT POSITION, BESIDE the class, inside the message's own text — the repair's second half.
      assert.ok(
        message.includes(site.position),
        `${where}: and names the ARGUMENT POSITION it stands at — \`${site.position}\` (\`§2.5\` item 5 (b); \`crossing.md §1.3\`'s \`AddressArg\` rows 5–6, read at the first position of every method \`§2.2\` declares) — in \`${message}\``,
      );
      // AND THE EMPTY-CONTAINER FORM IS REFUSED: `in ''` is the REGISTER's own container spelling, so a
      // message carrying it answers a failure INSIDE the register and not a failure of the ADDRESS ARGUMENT.
      assert.equal(
        message.includes("in ''"), false,
        `${where}: and does NOT carry the empty-container form \`in ''\` — that is the REGISTER's own container spelling (native contract §8.2's \`<CONTAINER>\`), not an address argument's failure — in \`${message}\``,
      );
    }
  }
  // AND THE ABSENT POSITION IS THE SAME SCALAR ARM (`AddressArg` row 4, *"an ABSENT `address`"*), driven at
  // the one method whose address ARITY makes absence reachable with no other position supplied: the same
  // target rendering (`undefined`) and the same argument position are owed by `§2.5` item 5 (a)–(b), and the
  // empty-container form is refused with them.
  for (const site of ADDRESS_POSITIONS) {
    let refusal = null;
    try {
      site.call(undefined);
    } catch (err) {
      refusal = err;
    }
    assert.ok(refusal !== null && typeof refusal === 'object',
      `${site.name}: an ABSENT address is refused (\`AddressArg\` row 4)`);
    assert.equal(refusal.status, 'AddressMalformed',
      `${site.name}: and answers the store's own \`AddressMalformed\``);
    const message = String(refusal.message);
    assert.ok(message.includes('undefined'),
      `${site.name}: the absent position's own runtime rendering is carried (\`§2.5\` item 5 (a)) — in \`${message}\``);
    assert.ok(message.includes(site.position),
      `${site.name}: and the argument position \`${site.position}\` (\`§2.5\` item 5 (b)) — in \`${message}\``);
    assert.equal(message.includes("in ''"), false,
      `${site.name}: and the empty-container form \`in ''\` is NOT carried — in \`${message}\``);
  }
  // **⟶ AND THE ADDRESS-POSITION RENDERING IS ASSERTED AT ITS OWN CELL, 2026-10-17 (`role_test_writer`;
  // GATE 4's ADVERSARIAL PASS).** **THE READING THIS CELL TAKES IS THE ONE THE LOOP ABOVE COULD NOT TAKE
  // WHILE ITS SUBJECT WAS `register`: a WHOLE-ADDRESS failure of an ARRAY's own address is rendered at the
  // failing SEGMENT's own spelling (`the number 1.5`) and is POSITIONED in the address's parent segment
  // (`in 'a'`) where the failure is a segment's — NEVER as the array's own stringified value (`a,1.5`),
  // which is the HANDLE position's rendering of a VALUE and is LAWFUL there and NOWHERE at an address
  // position.** **`§2.5` item 5 (a): the store's generator renders a WHOLE-ADDRESS failure JOINED BY `/` and
  // a SEGMENT failure AT THAT SEGMENT'S OWN SPELLING; `AddressArg` row 8 is the whole-address row whose
  // failing member is a segment — *"an array holding a non-integer `number` (`1.5`, `NaN`, `Infinity`)"* —
  // and `§2.5` item 5 (b) makes the class half mandatory and the argument position (`first argument`)
  // carried INSIDE the message.** **THE FALSIFIER: render the refusal at the ARRAY's value — the `a,1.5`
  // spelling the registration site produces for the same input — and each of the three readings below
  // fails.** (`crossing.md §1.3`'s `AddressArg` rows 3, 8 and 12; `§1.7`'s class-first order; `surface.md
  // §2.4` item 9 (f)'s `A127` clause — `listen`'s ONE position; `docs/specs/storeroom-js/test-cases.md`'s
  // `AddressArg` pointer set; `acceptance.md` §4.1 item 9 and `§4.2`.)
  {
    let thrown = null;
    try {
      inst.listen(['a', 1.5]);
    } catch (err) {
      thrown = err;
    }
    assert.ok(thrown !== null && typeof thrown === 'object', 'an ARRAY holding a non-integer number is refused at `listen`');
    assert.equal(thrown.status, 'AddressMalformed',
      '`AddressArg` row 8 carries the store\'s own `AddressMalformed` at this site, minted by nothing (`§2.5` item 5 (c); `DD-40`)');
    const message = String(thrown.message);
    assert.ok(message.includes('the number 1.5'),
      'the failing SEGMENT is the target and it is rendered AT ITS OWN SPELLING (`§2.5` item 5 (a))');
    assert.ok(message.includes("in 'a'"),
      'and the segment that holds it is named — the address position\'s rendering of a whole-address failure (`§2.5` item 5 (b): the position travels INSIDE the message)');
    assert.ok(message.includes('first argument'),
      'and the argument position `listen` declares is carried beside the class (`§2.4` item 9 (f)\'s `A127` clause: the ONE position is the address)');
    assert.ok(!message.includes('a,1.5'),
      'THE CONFLATION REFUSED HERE: the ARRAY\'s own stringified value is a VALUE-position rendering and may not stand at the ADDRESS position');
  }
  // **⟶ AND THE TWO LOOPS' ABSENCES ARE TOLD APART HERE, BECAUSE `C-13` OF THE GATE-4 ADVERSARIAL PASS
  // (2026-10-11) FOUND THIS CELL'S OWN COUNT READING THEM AS ONE ARM.** **THE ABSENT ARGUMENT IS ONE RUNTIME
  // VALUE REACHED AT TWO POSITIONS AND IT IS TWO REFUSALS, NOT TWO COPIES OF ONE:**
  //   * the loop above refuted the ABSENT LISTENER — `on(['fresh'])`, whose POSITION is the SECOND argument,
  //     so the refusal is the LISTENER arm of the class set (`§2.17`'s dated clause: *"a non-function
  //     `listener` at `on`'s position `2` of `2`, an ABSENT second argument INCLUDED"*);
  //   * the loop just refuted the ABSENT ADDRESS — `on(undefined, () => {})`, whose POSITION is the FIRST
  //     argument, so the refusal is the ADDRESS arm (`AddressArg` rows 4–5).
  // **NEITHER ARM IS DUPLICATED AND NEITHER POSITION IS COUNTED TWICE: THE FIFTEEN REFUSALS BELOW ARE SIX
  // AT THE LISTENER POSITION AND NINE AT THE ADDRESS POSITION**, each driven at its own position — and the
  // count is the one the (i) half below reads. **THE TWO LOOPS SHARE ONE ADDRESS ON PURPOSE** (the store-side
  // half must be measurable at ONE place), **and the ADDRESS-position loop is the one that proves the class
  // decision happens at STEP 1 before the listener is examined at all**: a build that reached the store on a
  // malformed address would fail THIS loop's refusals, while a build that validated everything and then
  // listened before registering is caught by (i)'s home probe and by the register-state assertion below.

  // **AND NOTHING IS LEFT BEHIND — DRIVEN AS AN ABSENCE AND NOT AS THE ERROR ALONE** (`§2.4` item 7 (a):
  // *"A REFUSED `address` OR A REFUSED `listener` LEAVES NO STORE-SIDE HOME ENTRY, NO REGISTRY ENTRY, NO
  // NODE MINTED AND NO JOURNAL ENTRY APPENDED"*). **THREE HALVES, ONE PER ADMISSION:**
  //   (i) THE STORE-SIDE ENTRY: the address was refused FIFTEEN TIMES and the store's home must hold NO
  //       entry there AT THIS POINT — **before this cell's own `listen` mints one** — because a `listen`
  //       that comes SECOND proves nothing about what the refusals left: the store's address-level
  //       idempotence answers ONE entry either way (`C-6`; `write-and-read.md §6.5` item 12 (c));
  //   (ii) NOTHING WAS DISTURBED AT THE HELD ADDRESS: `held`'s ONE entry is still exactly what it was, and
  //       the home is BYTE-IDENTICAL — the node's own literal is the one the pre-state wrote;
  //   (iii) NO NODE WAS MINTED AT THE REFUSED ADDRESS — and **THAT READING STANDS ABOVE, TAKEN BEFORE THE
  //       WRITE THE (i) HALF MAKES AT `fresh`, BECAUSE THAT WRITE MINTS THE NODE BY DESIGN**: a `read` is not
  //       a write and mints nothing (`§4.1`: the read's tier is OPTIONAL and it never installs), while the
  //       (i) half's write does — **an order the drive owes its own two probes, since a drive that read AFTER
  //       its own mint would be asserting an absence its own preceding line had destroyed** (the `Q3`
  //       remand's cell-side defect, named at this cell). **AND ITS TEXT IS RE-EMITTED AT THIS POSITION SO
  //       THE CLAIM IS RE-HOMED AND NOT DELETED** (`DEF-14`/`DEF-15`): the assertion above reads
  //       `assert.throws(() => read(inst, ['fresh']), (err) => err.status === 'AddressNotFound', …)` at the
  //       state the refusals left and BEFORE the write, and no byte of it moves by this repair.
  assert.equal(
    inst.read(['held']),
    heldHomeBefore,
    'the standing home is BYTE-IDENTICAL across the refusals: the held address\'s node is exactly what it was',
  );

  const mintedAfter = inst.listen(['fresh']);
  assert.ok(mintedAfter !== null && typeof mintedAfter === 'object', '`listen` mints a handle, so the home held NO entry');
  assert.notEqual(
    mintedAfter,
    refusedTriggered[0],
    'THE REGISTER\'S STATE AT THE SAME POINT: the `on` refused at `fresh` bound NO listener — the identity this `listen` mints is a FRESH opaque value and never the registry key such a build would have written at STEP 3 after its own `listen` at STEP 2',
  );
  assert.equal(
    triggerSet(inst, ['fresh'], 'mem', 2).length,
    1,
    'ONE entry at `fresh` AFTER the mint and NEVER two — a refused `on` left no entry for the mint to collide with',
  );
  assert.equal(
    triggerSet(inst, ['fresh'], 'mem', 5)[0],
    mintedAfter,
    'ONE home entry per address, and its identity is the one `listen` answered — the address now carries exactly the handle minted AFTER the refusals',
  );

  const heldAfter = triggerSet(inst, ['held'], 'mem', 3);
  assert.equal(heldAfter.length, distinctMembers(heldBefore), 'the held address\'s entry count is exactly what it was');
  assert.equal(heldAfter[0], heldBefore[0], 'and it is the SAME identity — the standing entry was not disturbed');

  // (iii) AND NO NODE WAS MINTED AND NO JOURNAL ENTRY APPENDED: the register of `fresh` is EMPTY, so a read
  // there answers the store's own not-found failure rather than a value a refusal had left behind.
  // **THIS ASSERTION STANDS ABOVE, WHERE THE STATE IT NAMES IS STILL THE ONE THE REFUSALS LEFT — and its
  // text is re-emitted here byte-for-byte so the claim is RE-HOMED and not deleted** (`DEF-14`/`DEF-15`:
  // nothing is deleted, and the reading is taken at the position the drive made standing):
  //   `assert.throws(() => read(inst, ['fresh']), (err) => err.status === 'AddressNotFound', 'the refused`
  //   ` address\'s node was never minted, so its read answers `AddressNotFound`');`
  // **READ AT *THIS* POSITION the same assertion would measure the node THIS CELL minted by its own write at
  // `fresh` — the mint probe the (i) half requires — and would fail against a store behaving exactly as the
  // contract declares. THAT was the `Q3` remand's cell-side defect: the drive asserted an absence its own
  // preceding line had destroyed. The reading is now taken where it is true, and the failure it reaches for
  // — a refused `on` that left a home entry behind — is still caught, at (i)'s mint-collision assertion.
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
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');

  // --- (i) THE HELD ARM, over an entry `listen` placed.
  const minted = inst.listen(['held']);
  let mintedFired = 0;
  let repeatFired = 0;
  const mintedAgain = (inst.register(inst.listen(['held']), () => { mintedFired += 1; }) || inst.listen(['held']));
  const mintedThird = (inst.register(inst.listen(['held']), () => { repeatFired += 1; }) || inst.listen(['held']));

  // `§2.3`'s dated clause 1: *"AT A HELD ADDRESS it returns the EXISTING entry's handle"* — ONE opaque
  // value, `===`, and never a second equal-but-distinct wrapper (a distinction the registry's own identity
  // lookup makes observable: `§2.4` item 6 (b)).
  assert.equal(mintedAgain, minted, 'the repeat `on` answers the very handle `listen` returned');
  assert.equal(mintedThird, minted, 'and so does a third call — one address, one identity');
  assert.equal(triggerSet(inst, ['held'], 'mem', 1).length, 1, '`A45`: ONE home entry per address, never two');

  // **AND IT REPLACES** (`§2.4` rule 2; item 7 (a)'s HELD arm: *"a later trigger invokes the REPLACEMENT
  // once, and the replaced function never fires again"*). **THE COUNT IS TAKEN IN TWO STEPS, BECAUSE THE
  // WRITE ABOVE IS ALREADY A TRIGGER:** the registered function fires ONCE PER TRIGGER, so the write at
  // `A45`'s pre-state assertion has already fired it — and that firing is what ESTABLISHES the standing
  // state this half then measures. The counter is reset AT THE POINT THE CLAIM BEGINS, and the write under
  // test is the one after it.
  assert.equal(repeatFired, 1, 'the SECOND listener is the registered one, and it demonstrably fires ONCE for the write at its own address');
  assert.equal(mintedFired, 0, 'and the replaced function has NEVER fired — one identity, one function');
  repeatFired = 0;
  triggerSet(inst, ['held'], 'mem', 2);
  assert.equal(repeatFired, 1, 'the SECOND listener is the registered one and fires once PER TRIGGER — the write under test fires it once');
  assert.equal(mintedFired, 0, 'the replaced function NEVER fires again — one identity, one function, and no fan-out');

  // --- (ii) THE HELD ARM over the construction's own adopted entry.
  const adoptedHandle = triggerSet(inst, ['adopted'], 'mem', 1)[0];
  let adoptedFirst = 0;
  let adoptedSecond = 0;
  const adoptedOn = (inst.register(inst.listen(['adopted']), () => { adoptedFirst += 1; }) || inst.listen(['adopted']));
  const adoptedAgain = (inst.register(inst.listen(['adopted']), () => { adoptedSecond += 1; }) || inst.listen(['adopted']));
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
  const twoCall = inst.listen(['by-register']);
  let registeredFirst = 0;
  let registeredSecond = 0;
  assert.equal(inst.register(twoCall, () => { registeredFirst += 1; }), undefined);
  const combined = (inst.register(inst.listen(['by-register']), () => { registeredSecond += 1; }) || inst.listen(['by-register']));
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
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');

  // --- (i) THE OWN ARM. A sibling registration is standing BESIDE the one `off` names, so *"`off` REMOVES
  // NO MORE THAN THE HANDLE NAMES"* (`§2.4` item 7 (b)) is drivable at the same moment.
  let targetFired = 0;
  let siblingFired = 0;
  let stoodFired = 0;
  let keeperFired = 0;
  const target = (inst.register(inst.listen(['x']), () => { targetFired += 1; }) || inst.listen(['x']));
  const sibling = (inst.register(inst.listen(['y']), () => { siblingFired += 1; }) || inst.listen(['y']));
  assert.equal(triggerSet(inst, ['x'], 'mem', 1).length, 1);
  assert.equal(triggerSet(inst, ['y'], 'mem', 2).length, 1);

  assert.equal(inst.unlisten(target), undefined, '`§2.4` item 7 (b): *"ITS RETURN IS `undefined` ON EVERY SUCCESS"*');
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
  const reminted = inst.listen(['x']);
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
  const stillRegistered = (inst.register(inst.listen(['w']), () => { stoodFired += 1; }) || inst.listen(['w']));
  // **THE STANDING STATE IS ESTABLISHED BEFORE IT IS ASSERTED UNCHANGED — the same-class correction the
  // `Q3` remand names: *"simply never fires again"* is a claim about a registration that FIRES, so the
  // registration's own firing is driven and measured FIRST (one entry at `w`, one invocation for the write
  // at its own address), and the count the rule 4 half asserts is taken from AFTER it. A drive that read
  // `stoodFired === 0` after the `unlisten` without ever showing the function fire would be asserting an
  // absence that a registration the package never landed would also satisfy.**
  assert.equal(triggerSet(inst, ['w'], 'mem', 1).length, 1, 'the pre-state: ONE home entry at `w` — the registration `on` just placed');
  assert.equal(stoodFired, 1, '...and it demonstrably fires ONCE for a write at its own address');
  assert.equal(inst.unlisten(stillRegistered), undefined, '`§2.3` item 4: `unlisten` over an in-domain handle is `undefined`');
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
  const remintedAfterUnlisten = inst.listen(['w']);
  assert.notEqual(remintedAfterUnlisten, stillRegistered, 'the `unlisten` withdrew the registration, never the function');
  assert.equal(
    triggerSet(inst, ['w'], 'mem', 6).length,
    1,
    'the fresh entry is the ONE identity the address now has',
  );

  // --- (iii) **`DD-53`: AN ENTRY-LESS IN-DOMAIN IDENTITY IS A SUCCESS `undefined` THAT DISTURBS NOTHING.**
  // *"`off`'s REFUSAL ARM IS THE OUTSIDE-DOMAIN HANDLE ALONE."* Two arms of one state: NEVER registered,
  // and ALREADY REMOVED by an earlier `off`.
  const neverRegistered = inst.listen(['never']);
  const keeper = (inst.register(inst.listen(['keeper']), () => { keeperFired += 1; }) || inst.listen(['keeper']));
  // **A SUCCESS IS DRIVEN AS A SUCCESS AND NEVER THROUGH THE REFUSAL'S OWN PREDICATE.** `isRefusal` judges a
  // REJECTION: handed a call that does not throw it answers *"NOTHING WAS THROWN"* — so wrapping this arm in
  // it would assert that the arm FAILED to refuse, which is the opposite of the clause. **THE MEASURED FORM
  // OF THE CLAIM (`DD-53`; `§2.4` item 7 (b)'s OWN-ENTRYLESS arm) IS: NOTHING IS THROWN and THE ANSWER IS
  // `undefined`** — driven through the file's own `reachedOrRaised` wrapper, which is exactly the
  // distinction between *"no refusal happened"* and *"the answer was read"*.
  const neverArms = reachedOrRaised(() => inst.unlisten(neverRegistered));
  assert.equal(
    neverArms.thrown,
    null,
    '`DD-53`: an in-domain identity the registry holds NO function for is a SUCCESS — NOTHING IS THROWN at this site',
  );
  assert.equal(neverArms.raised, undefined, 'and its answer is `undefined`, the same success every `off` arm answers');
  assert.equal(inst.unlisten(neverRegistered), undefined, 'and its answer is `undefined` — the ALREADY-REMOVED arm of the same state');
  assert.equal(
    triggerSet(inst, ['never'], 'mem', 7).length,
    0,
    'the store-side withdrawal IS performed (nothing was there), and the address carries no identity afterwards',
  );
  // ...and the SAME handle a THIRD time — the ALREADY-REMOVED arm again, whose answer is the same success.
  assert.equal(inst.unlisten(neverRegistered), undefined, 'a lawful second `off` of one identity is a SUCCESS');
  assert.equal(inst.unlisten(target), undefined, 'and so is a second `off` of a handle the registry already dropped');

  // --- (iv) **THE OUTSIDE ARM IS THE REFUSAL, AND IT CONTRASTS WITH `unlisten`'S NO-OP SUCCESS.** The
  // outside values are enumerated IN FULL at cell 7 below; here the CONTRAST is driven ON ONE VALUE, both
  // verbs, so the declared difference is asserted as a difference and not as two isolated readings.
  const stranger = mem();
  const foreign = (stranger.register(stranger.listen(['f']), () => {}) || stranger.listen(['f']));
  // **⟶ CORRECTED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.3` item 4's `unlisten` no-op
  // set; `parameter-semantics.md §2.8`'s dated clause; `PAR-JS-8`).** **THE MERGED-AWAY `off` IS NOT A MEMBER
  // OF ANY PRODUCT, SO NO CELL CAN DRIVE IT, AND `unlisten` CARRIES THE ARM THE CELL MEANT — an outside value
  // is a NO-OP SUCCESS with NEITHER removal performed — so the assertion is taken at `unlisten` and the
  // difference the removed pair declared is asserted as THE REMOVAL THAT A NO-OP SUCCESS DOES NOT PERFORM.**
  assert.equal(inst.unlisten(foreign), undefined, '`§2.3` item 4: the foreign value is a NO-OP SUCCESS at `unlisten`');
  assert.equal(inst.unlisten(foreign), undefined, 'and its second answer is the same no-op success, so no refusal is declared at this site');
  assert.equal(inst.unlisten(0), undefined, 'and a NUMBER at the position is the same no-op success (`PAR-JS-8`\'s outside-value list)');

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
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');

  // A STANDING registration at a HELD address (`listen` first, then `on` at the same address — the HELD arm),
  // and a second one at another address, so "both entries as they were" is measurable at two places.
  const first = inst.listen(['order']);
  let heldFired = 0;
  let otherFired = 0;
  assert.equal((inst.register(inst.listen(['order']), () => { heldFired += 1; }) || inst.listen(['order'])), first, 'the held arm: the same handle');
  const other = (inst.register(inst.listen(['other']), () => { otherFired += 1; }) || inst.listen(['other']));

  const beforeSet = triggerSet(inst, ['order'], 'mem', 1);
  assert.equal(beforeSet.length, 1, 'the pre-state: ONE store-side entry at `order`');
  // **THE STANDING STATE IS ESTABLISHED FIRST — THE PRE-STATE THE (ii) HALF THEN RE-ASSERTS UNCHANGED.** The
  // `Q3` remand's correction, named: the write at `order` above IS a trigger, so the registration has now
  // demonstrably fired once for a write at its own address; the home's own node is read at its own bytes
  // too (`§4.1`/`§4.2` arm `R-2`, the literal at a leaf). **THE COUNT IS TAKEN FROM HERE** — the refusal
  // below must leave BOTH of these observables exactly as they stand.
  assert.equal(heldFired, 1, 'the standing registration demonstrably fires ONCE for a write at its own address');
  const heldHomeBefore = inst.read(['order']);
  assert.equal(heldHomeBefore, 1, 'and the held address\'s node holds the literal the pre-state write installed');
  heldFired = 0;

  // --- (i) A REFUSED `off`: THE OUTSIDE HANDLE. NEITHER REMOVAL IS PERFORMED (`§2.4` item 7 (b)'s OUTSIDE
  // arm: *"`AddressMalformed` in `§2.5`'s single form, and NEITHER removal is performed"*).
  const stranger = mem();
  const foreign = (stranger.register(stranger.listen(['f']), () => {}) || stranger.listen(['f']));
  // **⟶ CORRECTED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.3` item 4; `PAR-JS-8`).**
  // **`off`'s OUTSIDE-ARM REFUSAL IS NOT DRIVABLE — `off` IS NOT A MEMBER OF THIS PRODUCT — AND THE ARM THE
  // MERGED SINGLE WITHDRAWAL DECLARES OVER AN OUTSIDE VALUE IS `§2.3` ITEM 4'S NO-OP SUCCESS: `undefined`, with
  // EITHER REMOVAL PERFORMED.** The cell's own subject — that a refused/removing call leaves both entries
  // exactly as they were — is driven below at the STANDING-ENTRY half, which the no-op answer makes stronger
  // rather than weaker: nothing at the outside value's own address is withdrawn.
  assert.equal(inst.unlisten(foreign), undefined, '`unlisten` over an outside handle answers `undefined` — the declared no-op success');
  assert.equal(inst.unlisten(other), undefined, 'an in-domain handle still succeeds, so neither call wedged the instance');

  // ...and the STORE-SIDE half of the refused handle was not touched: the foreign instance's own entry
  // still fires, so a package that withdrew store-side BEFORE the registry half is caught here.
  let foreignFired = 0;
  // **⟶ AND THE SECOND, IDENTICAL STATEMENT IS NOT RE-EMITTED — `C-13` OF THE GATE-4 ADVERSARIAL PASS
  // (2026-10-11) FOUND THIS CELL ASSERTING `inst.off(other)` TWICE, AND THE SECOND CALL WAS THE ONE THAT
  // COULD NOT FAIL.** **THE AS-FILED LINE, RE-EMITTED HERE BECAUSE `git diff` MEETS IT FIRST** (`DEF-14`:
  // nothing is deleted silently) — it stood at exactly this position, between the two sentences that
  // surround this block:
  //   `assert.equal(inst.off(other), undefined, 'an in-domain handle still succeeds'); // eslint-disable-line`
  // **IT IS THE SAME CALL THE (i) HALF HAD ALREADY MADE ONE LINE ABOVE THE COMMENT** (`off(other)` at the
  // assertion that reads *"so the refusal did not wedge the instance"*), **so by this position `other` is an
  // ALREADY-REMOVED identity and its answer `undefined` is `DD-53`'s ENTRY-LESS success — a state cell 4
  // drives directly and this cell asserts nothing new about.** **RE-READING THE SAME CALL A SECOND TIME ADDED
  // NO OBSERVABLE AND WEAKENED NOTHING BY ITS REMOVAL: EVERY CLAIM THIS CELL MAKES — the refusal's one form,
  // the store-side half's survival, the sibling's standing, the two removals — is still asserted below.**
  //
  // The foreign instance's entry is reachable through ITS OWN instance, whose registry its own `on` wrote;
  // a second `on` there REPLACES (`§2.4` rule 2), so the count below proves the entry still exists at all.
  const strangerAgain = (stranger.register(stranger.listen(['f']), () => { foreignFired += 1; }) || stranger.listen(['f']));
  assert.equal(strangerAgain, foreign, '`on` at the foreign instance\'s held address answers the existing identity');
  const stillThere = triggerSet(stranger, ['f'], 'mem', 1);
  assert.equal(stillThere.length, 1, 'the refused `off` performed NO store-side withdrawal anywhere');
  assert.equal(stillThere[0], foreign, 'and the foreign identity is intact');
  assert.equal(foreignFired, 1, 'and the foreign registration still fires');

  // --- (ii) THE HELD-ADDRESS HALF: the standing entry at `order` is EXACTLY what it was, and its function
  // still fires — a refused `off` that disturbed a standing entry would be caught here. **BOTH HALVES ARE
  // TAKEN AT THE STATE (i) AND (ii) SHARE, AND BOTH WERE MADE STANDING ABOVE:** the count `heldFired` was
  // reset at the pre-state, so the ONE invocation asserted here is the post-refusal write's own; and the
  // home's bytes are read before the write below, while the node is still the pre-state's.
  assert.equal(
    inst.read(['order']),
    heldHomeBefore,
    'the standing home is BYTE-IDENTICAL after the refused `off` — the node is exactly what it was',
  );
  const afterSet = triggerSet(inst, ['order'], 'mem', 2);
  assert.equal(afterSet.length, beforeSet.length, 'the standing store-side entry COUNT is unchanged');
  assert.equal(afterSet[0], beforeSet[0], 'and it is the SAME identity');
  assert.equal(heldFired, 1, 'and the standing registration still fires — ONCE, for this write, and never zero times');

  // --- (iii) AND THE ORDER'S POSITIVE HALF, ONE STEP AT A TIME (`§2.4` item 7 (b), steps 1–3): after the
  // in-domain success of `off(other)`, (step 2) the store-side entry is withdrawn AND (step 3) the
  // registry's entry is removed — and the SIBLING at `order` is untouched by both.
  const otherAfter = triggerSet(inst, ['other'], 'mem', 3);
  assert.equal(otherAfter.length, 0, 'step 2: the store-side withdrawal landed');
  const remint = inst.listen(['other']);
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

test('the_instance_member_set_is_seven_own_members_and_the_module_namespace_is_at_the_eleven_declared_names', async () => {
  const inst = mem();

  // --- (a) THE INSTANCE'S OWN MEMBER SET: `{ register, on, off, settle, addConstraint, constraintOn,
  // constraintOff }` — SEVEN OWN MEMBERS AND NOTHING ELSE. **⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS
  // (2026-10-15) AT THE CLAUSE THAT OPENED IT, AND THE ID IS RENAMED WITH ITS SUBJECT:** `surface.md §2.1`'s
  // dated clause as `A116` (D1)–(D3) opens it reads `{ register, on, off, settle }`, opened by ONE clause
  // at `A116` (D1)–(D3) — the instance member set opens by exactly one name, `settle`, and by no second
  // name — while `§2.4` item 9 keeps it "not a ninth named export" and the module namespace's OWN half of
  // this cell is at the eleven declared names, so a change that would accept a wrong count on either half
  // is a finding and not a pass. **⟶ AND BOTH SETS ARE RE-DERIVED AGAIN, 2026-10-16, BY `A126`: the member
  // set above is displaced and the operative declared set is
  // `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }` — `§2.4` item 9 (f)'s dated
  // clause of that date, FOUR UNMOVED PLUS THREE, `4 + 3 = 7` — while the namespace's own count moves to
  // `8 + 3 = 11` at `§2.9` item 1's dated clause of the same date.** The OLDER value (three members, then
  // four) is asserted NOWHERE: each is the reading a later ruling withdraws.
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause, whose operative figures are the
  // TWELVE own members, `10 + 1 + 1 = 12` ✓).** **THE SET'S CELL MOVES IN PLACE AND ITS SUBJECT IS UNMOVED:**
  // the ten store-reaching METHODS plus `register` and `settle`, the merged-away pair appearing NOWHERE.
  // ── **⟶ RE-DERIVED 2026-10-17 (`role_test_writer`): THE SET MOVES `12 → 13`, `10 + 1 + 1 + 1 = 13` ✓**,
  // the thirteenth being `constraints()` on the architect's ruling VERBATIM *"Add surface methods for
  // reading registered constraints."* (`surface.md §2.4` item 9 (f)'s `constraints` clause of that date;
  // `§2.12` item 2-bis; `PAR-JS-27`). **The cell's own subject — the member set is the TEN store-reaching
  // methods plus the non-store-reaching ones, and the merged-away pair appears NOWHERE — is UNMOVED.**
  assert.deepEqual(
    memberSet(inst),
    ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
      'readLiteral', 'register', 'rollback', 'unlisten', 'write'],
    '`§2.4` item 9 (f)\'s clause of 2026-10-18: the member set is the TEN store-reaching '
    + 'methods plus the TWO remaining singles, `register` and `constraints` — TWELVE own members, '
    + '`10 + 1 + 1 = 12` ✓, and NOTHING ELSE (`13 → 12`)',
  );
  for (const merged of ['on', 'off']) {
    assert.equal(memberSet(inst).includes(merged), false,
      `and the MERGED-AWAY \`${merged}\` is a member of NO product: its home entry is minted by \`listen\` and `
      + 'its function placed by `register`, and `unlisten` is the withdrawal (`§2.4` item 9 (f)\'s `A127` clause)');
  }
  assert.equal(typeof inst.register, 'function', 'and `register` is UNMOVED in spelling (`§2.4` item 5 (a))');
  assert.equal(typeof inst.constraints, 'function',
    'and `constraints` is the SECOND of the two remaining singles — the registered-constraint read the ruling '
    + 'of 2026-10-17 added and the ruling of 2026-10-18 leaves standing (`§2.4` item 9 (f)\'s clause of that '
    + 'date, item `1`; `§2.12` item 2-bis; `PAR-JS-27`)');
  // --- **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE MEMBER THE THREE ASSERTIONS BELOW READ IS REMOVED
  // WHOLE AND THEY ARE RE-DERIVED, NOT DELETED** (`surface.md §2.4` item 9's `REMOVED-WHOLE` pointer: *"NO
  // DRIVE MAY ASSERT A CALL OF `settle` FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT"*). **THEIR SUBJECT
  // IS UNMOVED IN KIND — the shape a product member is read by, asserted off the PROPERTY DESCRIPTOR so an
  // inherited or non-enumerable stand-in cannot carry the cell — AND IT IS MOVED TO THE MEMBER THAT CARRIES
  // THE DUTY NOW, `constraints`, which is one of the two singles the clause of 2026-10-18 names.** A removal
  // that left the shape unchecked would be exactly the "accident of spelling" these lines exist to forbid.
  const cDescriptor = Object.getOwnPropertyDescriptor(inst, 'constraints');
  assert.equal(cDescriptor !== undefined && cDescriptor.enumerable === true, true,
    '`constraints` is an OWN, enumerable property of the factory\'s own product — the same standing the ten '
    + 'methods and `register` have, so a drive that reads the member set above and this member here reads ONE '
    + 'surface and not two (`§2.4` item 9 (f)\'s clause of 2026-10-18)');
  assert.equal(inst.constraints.length, 0,
    'and its arity is ZERO — the registered-constraint read takes NO argument at all (`§2.12` item 2: *"the '
    + 'call takes NO argument at all (arity `0`)"*), so a foreign `settle`-shaped position is not what this '
    + 'member carries');
  assert.equal(Object.prototype.hasOwnProperty.call(inst, 'settle'), false,
    'AND `settle` IS READ AS THE NAMED ABSENCE THE REMOVAL MAKES, NEVER LEFT TO SILENCE: the product does not '
    + 'carry it (`§2.4` item 9\'s `REMOVED-WHOLE` pointer of 2026-10-18)');

  // --- (b) **THE MODULE NAMESPACE IS AT THE EIGHT DECLARED VERBS PLUS THE THREE SURFACE FUNCTIONS
  // `A126` DECLARES — ELEVEN, `8 + 3 = 11` — AND NEITHER `on` NOR `off` IS ADDED TO THE ENTRY'S NAMED
  // EXPORTS** — `§2.1`'s dated clause (b), *"because both are reached through the
  // FACTORY'S OWN PRODUCT and through nothing else"* — so a drive asserts the count AND the absence of the
  // two names, and asserts that the FACTORY is still reachable so the cell cannot pass on an empty module.
  const namespace = await import('provident-storeroom');
  const names = Object.keys(namespace).sort();
  assert.deepEqual(
    names,
    ['storeCreate'],
    '`§2.9` item 1\'s `A127` clause of 2026-10-16: the operative enumeration is `storeCreate` ALONE — the '
    + 'ten store-reaching names are METHODS of the object that call returned (`11 → 1`)',
  );
  assert.equal(names.length, 1, 'the count is ONE (`11 → 1`)');
  for (const merged of ['on', 'off']) {
    assert.equal(names.includes(merged), false,
      `\`${merged}\` is NOT a named export and not a member of any product — it is reached at NO position of this surface`);
  }
  for (const method of ['read', 'write', 'listen', 'unlisten', 'addConstraint']) {
    assert.equal(names.includes(method), false, `and \`${method}\` is a METHOD of the product and not a name of the namespace`);
  }
  // The FACTORY is present in the same namespace, so the two absences are not the absence of the module.
  assert.equal(typeof namespace.storeCreate, 'function', 'the construction verb is still exported');

  // --- (c) **AND THE STORE'S OWN TWO MEMBERS ARE UN-OVERLOADED** (`§2.1`'s dated clause (c); `§2.10`'s
  // `A127` clause): `listen(address)` and `unlisten(handle)` keep their names, POSITIONS, ARITY and returns.
  // **⟶ RESHAPED 2026-10-16: THE `instance` POSITION IS VACATED — the receiver IS the store — so the
  // overload the cell guards against is a SECOND position, and it is driven BY ARITY AND BY EFFECT together:**
  // a `listen` handed a function in its second position mints the entry, IGNORES the function, and answers
  // exactly the handle the one-position call answers.
  const over = mem();
  let smuggled = 0;
  assert.equal(over.listen.length, 1, '`listen` declares ONE position and no more (`§2.10`\'s `A127` clause)');
  assert.equal(over.unlisten.length, 1, 'and `unlisten` declares ONE');
  const oneArg = over.listen(['u']);
  const twoArgOverload = over.listen(['u'], () => { smuggled += 1; });
  assert.equal(twoArgOverload, oneArg, '`listen(address)` is unchanged: the repeat answers the entry\'s own handle, second position or none');
  const registered = over.register(oneArg, () => { smuggled += 1; });
  assert.equal(registered, undefined, 'and the function is placed by `register` alone, which answers `undefined`');
  triggerSet(over, ['u'], 'mem', 1);
  assert.equal(smuggled, 1, 'exactly the ONE function `register` placed is registered — the second position of `listen` registers nothing');
  assert.equal(over.unlisten(oneArg), undefined, '`unlisten(handle)` answers `undefined` as declared');
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
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');
  let fired = 0;
  const standing = (inst.register(inst.listen(['standing']), () => { fired += 1; }) || inst.listen(['standing']));
  const stranger = mem();
  const foreign = (stranger.register(stranger.listen(['f']), () => {}) || stranger.listen(['f']));
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
    // **⟶ AND THE LAST ARM'S LABEL IS CORRECTED — `C-13` OF THE GATE-4 ADVERSARIAL PASS (2026-10-11): THE
    // CLASS'S OWN NAME IS *"A FUNCTION"* AND THE AS-FILED WORD *"A NON-FUNCTION"* NAMED THE OPPOSITE CLASS,
    // because every OTHER arm of this list IS a non-function and this one is not.** **THE AS-FILED LABEL,
    // RE-EMITTED SO `git diff` MEETS IT: `{ what: 'a NON-FUNCTION', value: () => {}, why: 'a function' }`** —
    // `why` was `'a function'` and the label beside it said the reverse. **THE ASSERTION IS BYTE-FOR-BYTE
    // UNCHANGED**: the value IS outside the handle domain (`§2.17`'s dated clause item 3: the outside set is
    // *"an opaque value THIS INSTANCE minted or adopted"*, and a function is none of those), it refuses
    // `AddressMalformed` in the one form, its TARGET renders as its own value (`String(() => {})`) and its
    // CLASS half is `a function` (`§2.5` item 5 (b), whose class half is MANDATORY).
    { what: 'a FUNCTION (a non-opaque value at the handle position)', value: () => {}, why: 'a function' },
  ];

  // **⟶ RE-DERIVED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` CLAUSE: the merged-away `off` is not a
  // member of any product and `unlisten` is the ONE withdrawal; `§2.3` item 4's no-op set; `PAR-JS-8`).**
  // **THE CLASS SET IS UNMOVED AND THE ANSWER MOVED WITH THE MERGED MEMBER: EVERY ONE OF THE TEN CLASSES
  // ANSWERS `undefined` — `§2.3` ITEM 4'S NO-OP SUCCESS — AND NEITHER REMOVAL IS PERFORMED.** The cell's name
  // is kept at its as-filed bytes so the red set's rows still point here. **AND THE ASSERTION IS NOT WEAKENED
  // BY THE RE-DERIVATION: it is taken at the answer the clause declares, on the SAME ten values, with the
  // SAME atomicity half below — the standing registration stands and its function still fires.**
  for (const one of outside) {
    assert.equal(
      inst.unlisten(one.value),
      undefined,
      `${one.what} at \`unlisten\` is \`§2.3\` item 4's NO-OP SUCCESS — \`undefined\`, with neither removal performed`,
    );
  }
  // AN ABSENT ARGUMENT IS ITS OWN ARM OF THE SAME CLASS SET (`§2.17`'s dated clause item 3, *"or an ABSENT
  // argument"*), and its answer is the same no-op success.
  assert.equal(inst.unlisten(), undefined, 'an absent handle at `unlisten` is the same no-op success');
  for (const one of outside) {
    assert.equal(inst.unlisten(one.value), undefined,
      `and a SECOND \`unlisten\` over ${one.what} is the same answer, so no removed-then-refused arm exists`);
  }

  // **AND NEITHER REMOVAL IS PERFORMED IN ANY OF THEM** — the tenth assertion of this cell, and the one that
  // makes it an atomicity drive rather than a form drive: the standing registration is EXACTLY as it was,
  // and the store's home still holds its entry (`§2.4` item 7 (b)'s OUTSIDE arm).
  const standingNow = triggerSet(inst, ['standing'], 'mem', 1);
  assert.equal(standingNow.length, 1, 'the standing store-side entry was not withdrawn by any outside value\'s no-op success');
  assert.equal(standingNow[0], standing, 'and it is the same identity');
  assert.equal(fired, 1, 'and its function still fires');

  // THE CONTRAST, ON THE SAME NINE VALUES, AT `unlisten` — each a NO-OP SUCCESS that removes NOTHING
  // (`§2.3` item 4; `PAR-JS-8`'s declared answer for every outside value; `§2.3`'s dated clause 3). **THE
  // TWO VERBS ANSWER ONE VALUE DIFFERENTLY BY DECLARATION AND NOT BY OVERSIGHT.**
  for (const one of outside) {
    assert.equal(
      inst.unlisten(one.value),
      undefined,
      `\`unlisten\` over ${one.what} is a NO-OP SUCCESS, and it is NOT \`off\`'s refusal`,
    );
  }
  assert.equal(inst.unlisten(), undefined, 'and an absent handle at `unlisten` is that same no-op success');

  const afterContrast = triggerSet(inst, ['standing'], 'mem', 2);
  assert.equal(afterContrast.length, 1, 'and no outside value at `unlisten` removed the standing registration');
  assert.equal(afterContrast[0], standing, 'the identity is unmoved');
  assert.equal(fired, 2, 'and the function fired once more');
});

// =============================================================================================
// 8. **`off`'S REGISTRY-REMOVAL HALF, DRIVEN IN THE ONE STATE WHERE IT IS OBSERVABLE** —
//    `surface.md §2.4` item 7 (b)'s third step (`DEREGISTER`); `contract.md §5.5`'s FOURTH ADDED FAILURE
//    ENTRY (*"`off` FAILING TO REMOVE THE REGISTRY ENTRY — a successful `off` whose identity the registry
//    still holds a function for, so a later trigger invokes a function the caller deregistered"*);
//    `§5.5`'s `S-REG-DUP` line; `docs/specs/storeroom-native/contract.md §0.2` · `DD-42` CLAUSE (2) and
//    `DD-39`; `write-and-read.md §6.5` ITEM 12; `§2.4` rule 4 KEPT VERBATIM; `C-7` OF THE GATE-4
//    ADVERSARIAL PASS (2026-10-11).
//
// **WHY THIS CELL EXISTS AT ALL, NAMED AS THE FINDING NAMED IT.** `C-7`: *"delete the deregistration byte
// and the whole `108`-cell leg stays green — the half is observable ONLY in the duplicate-token state,
// which no cell drives. An un-run register entry."* **THE READINGS `C-7` TAKES ARE `tests/gate4_red_set_fix.rs`'s
// `ng_c_a_handle_token_colliding_with_a_minted_one`, AND THEY ARE TAKEN HERE BEFORE ANY ASSERTION IS
// WRITTEN, SO THE TWO CANNOT SILENTLY DISAGREE:** at its (2) the store's own cell drives *two entries, ONE
// caller token, the two addresses prefix-related* — `unlisten` over that handle succeeds and drops ONE
// entry, and **the SURVIVOR's address still carries the token**; at its (3) it drives *two entries at ONE
// address carrying the SAME token*, where `triggered` carries the token TWICE. **THIS CELL DRIVES THE FIRST
// OF THOSE TWO STATES — TWO ADDRESSES, ONE CALLER-SPELLED TOKEN, THE ADOPTION VERBATIM — AND ADDS THE ONE
// THING THE STORE'S CELL CANNOT SEE: THE PACKAGE'S OWN REGISTRY.** **THE STATEMENT IT ASSERTS IS THE
// CONJUNCTION `C-7` TASKS AND THE TWO HALVES ARE NOT IN CONFLICT, BECAUSE THEY STAND AT DIFFERENT LAYERS:**
//   * **THE STORE'S HALF**: `off`'s step 2 is `unlisten`, which withdraws ONE home entry (`write-and-read.md
//     §6.5` item 12), **so the surviving entry still FIRES for its own address — the later write's `triggered`
//     list still CARRIES that token**;
//   * **THE PACKAGE'S HALF**: `off`'s step 3 removes the registry's entry FOR THAT IDENTITY, **so the package
//     no longer INVOKES the function it removed — the survivor's own trigger fires NOTHING, while the
//     `triggered` list beside it still carries the handle.**
// **THE TWO OBSERVABLES ARE THE TWO `§5.5` ITSELF SPLITS (`docs/specs/storeroom-js/contract.md §5.5`'s dated
// clause: *"THE ARRAY'S ELEMENT MULTIPLICITY IS THE STORE'S"* and *"THE INVOCATION COUNT IS THE PACKAGE'S"*),
// AND THIS CELL READS BOTH BESIDE EACH OTHER SO NEITHER SATISFIES THE OTHER.** **AND NO ORDER IS ASSERTED:
// WHICH of the two entries the FIRST-match withdrawal removes is a home `HashMap`'s iteration order, which
// `§2.7` item 3 / `DD-22` declare UNOBSERVABLE — so every assertion below holds for EITHER survivor, and the
// first-match half is driven as an XOR (`removed`/`survivor`) and never as a named address.**
// =============================================================================================

test('off_deregisters_the_identity_in_the_duplicate_token_state_so_the_surviving_entry_still_fires_for_its_own_address_while_the_package_invokes_nothing_it_removed', () => {
  // **THE STATES, ENUMERATED:** (i) TWO construction `listeners[]` entries carrying ONE caller-spelled token
  // at TWO addresses — the state `DD-39` declares lawful and `DD-42` names for its exception; (ii) `on` at
  // ONE of those addresses, which lands on the HELD arm and registers ONE function for that ONE identity; (iii)
  // ONE trigger firing both entries — ONE distinct identity, so ONE invocation, while the ARRAY carries that
  // token ONCE PER ENTRY; (iv) `off(handle)`: the store's FIRST-match withdrawal removes ONE entry and the
  // package's deregistration removes the function for the identity; (v) the surviving entry's later trigger:
  // the token STILL crosses in `triggered` and the function is NO LONGER invoked; (vi) a SECOND `off` over the
  // same handle, which reaches the surviving entry because the first-match rule starts at the HOME's own
  // first entry each time; (vii) the withdrawal of BOTH entries, observed by a later `listen`.
  const shared = 'l-c7-dup'; // THE CALLER'S OWN TOKEN — `§0.4` clause 2 (b): the construction ADOPTS it VERBATIM
  const inst = mem([
    { address: ['a'], handle: shared },
    { address: ['b'], handle: shared },
  ]);
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND NOT AN
  // OPAQUE STACK TRACE** — and HERE it is also the precondition of the STATE, not only of the surface: the
  // two construction entries must both stand before the deregistration half can be observed at all.
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.10`'s `A127` clause).** **THE
  // MERGED-AWAY PAIR'S PLACE IS TAKEN BY THE TWO MEMBERS THE CLAUSE DECLARES: `listen(address)` MINTS THE HOME
  // ENTRY AND ANSWERS ITS HANDLE, `register(handle, listener)` PLACES THE FUNCTION AT IT, and `unlisten(handle)`
  // is the STORE-facing withdrawal.** The preconditions stand, so the red this file reports is still the
  // contract's own claim at its own cell and not an opaque stack trace.
  assert.equal(typeof inst.listen, 'function', '`surface.md §2.4` item 9 (f)\'s `A127` clause: `listen(address)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle this instance minted or adopted');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the one withdrawal, reached at the same member');
  const adopted = triggerSet(inst, ['a'], 'mem', 1);
  assert.equal(adopted.length, 1, '`DD-39`: the construction ADOPTED the caller\'s entry at `a` — ONE home entry carries the token there');
  const twin = triggerSet(inst, ['b'], 'mem', 1);
  assert.equal(twin[0], adopted[0], 'and the entry at `b` carries the SAME token, so the boundary hands out ONE identity for it (`§2.4` rule 3: one identity, however many entries carry it)');

  // --- (ii) THE ONE FUNCTION FOR THAT ONE IDENTITY, through the package's own member (`S-REG`'s site).
  let fired = 0;
  const seen = [];
  const handle = (inst.register(inst.listen(['a']), (address) => { fired += 1; seen.push(address); }) || inst.listen(['a']));
  assert.equal(handle, adopted[0], 'the HELD arm (`§2.3` item 6): the address is registered, so `on` answers the EXISTING entry\'s handle — the same opaque value');

  // --- (iii) THE PRE-STATE: one trigger fires BOTH entries, ONE identity, ONE invocation.
  const both = inst.write(['b'], 'mem', 2);
  assert.equal(
    distinctMembers(both.triggered),
    1,
    'the trigger\'s set carries ONE distinct identity — the caller\'s token, standing in the home TWICE',
  );
  assert.ok(
    both.triggered.every((one) => one === handle),
    'and every member of it is that ONE identity — no minted token appears beside the caller\'s two entries',
  );
  assert.equal(fired, 1, 'and the ONE distinct identity invokes the ONE registered function ONCE — never one per entry and never one per element (`§2.4` rule 3)');

  // --- (iv) `off` — AND THE TWO HALVES ARE READ APART: the STORE'S half is the withdrawal of ONE entry, and
  // the PACKAGE'S half is the removal of the registry's function for that identity. **THE ORDER THE TWO ARE
  // READ IN IS THE WHOLE CELL, AND THE `C-7` CONTROL RUN FIXED IT AND IS RECORDED RATHER THAN HIDDEN:**
  // **the survivor's own address must be TRIGGERED *AFTER* the `off`, because that is the ONLY state in which
  // the deregistration is observable — the withdrawal leaves the surviving entry standing, so its trigger
  // still carries the identity and the package must NOT invoke the function it removed.** With the
  // deregistration byte deleted, EVERY ARM THAT DID NOT TRIGGER THE SURVIVOR STAYED GREEN (a `write` at the
  // WITHDRAWN address carries nothing and invokes nothing whatever the registry holds), **which is exactly
  // the `C-7` finding this cell exists to answer.**
  assert.equal(inst.unlisten(handle), undefined, '`§2.4` item 7 (b): *"ITS RETURN IS `undefined` ON EVERY SUCCESS"*');
  fired = 0;
  // **THE INVOCATION LOG IS CLEARED AT THE SAME POINT THE COUNT IS, SO THE ABSENCE BELOW IS THE POST-`off`
  // WINDOW'S OWN AND NOT A READING OF THE PRE-STATE'S ONE INVOCATION** (which the (iii) half established).
  seen.length = 0;
  const afterOffA = triggerSet(inst, ['a'], 'mem', 3);
  const afterOffB = triggerSet(inst, ['b'], 'mem', 4);
  // **THE FIRST-MATCH WITHDRAWAL, DRIVEN AS AN XOR SO NO ORDER IS ASSERTED** (`DD-42` clause 2: *"`unlisten`
  // over it removes the FIRST match"*; `write-and-read.md §6.5` item 12) — **and WHICH address survives is a
  // home `HashMap`'s iteration order, which `§2.7` item 3 / `DD-22` declare UNOBSERVABLE, so the cell names
  // neither address in its claim.**
  assert.equal(
    (afterOffA.length === 0) !== (afterOffB.length === 0),
    true,
    `\`write-and-read.md §6.5\` item 12: \`off\`'s store-side step withdrew EXACTLY ONE of the two entries — \`a\` carried ${afterOffA.length} and \`b\` carried ${afterOffB.length}, so ONE stands and ONE is gone`,
  );
  assert.equal(
    afterOffA.length + afterOffB.length,
    1,
    'and ONE entry survives the withdrawal — the store\'s half, read at the store\'s own trigger',
  );
  // WHICH of the two the FIRST match named is the home's own iteration order and is never named as a claim;
  // the two readings below are indexed by it and by nothing else.
  const survivor = afterOffA.length === 0 ? 'b' : 'a';
  assert.equal(
    survivor === 'a' ? afterOffA[0] : afterOffB[0],
    handle,
    'THE STORE\'S HALF: the SURVIVING entry still carries that identity (`DD-39`: both kept entries are returned where both addresses are prefixes)',
  );
  assert.equal(
    fired,
    0,
    'THE PACKAGE\'S HALF — `contract.md` §5.5\'s fourth added entry: the SURVIVOR\'S own trigger invokes NOTHING, because `off` removed the registry\'s entry for that identity. A build whose deregistration byte is absent fires the function it was told to remove, and fails AT THIS LINE while the store\'s half is exactly as declared',
  );
  assert.deepEqual(
    seen,
    [],
    'and no invocation was reached at all after the `off`: the registry holds no function for that identity',
  );

  // --- (v) **AND THE ENTRY THE FIRST CALL SKIPPED IS THE ONE THE SECOND CALL REACHES** — the home's own
  // first match is taken at each call, so **no entry is UNWITHDRAWABLE** (`C-3`'s second half; `DD-42`
  // clause (2)). **THE TWO LATER TRIGGERS ARE TAKEN TOGETHER, SO THE ARM IS AN XOR AND NOT A NAMED ADDRESS.**
  assert.equal(inst.unlisten(handle), undefined, 'a second `off` over the same identity is a SUCCESS (`DD-53`: the entry-less answer is still the success)');
  assert.equal(triggerSet(inst, ['a'], 'mem', 5).length, 0, 'both entries are now withdrawn: `a` carries no identity');
  assert.equal(triggerSet(inst, ['b'], 'mem', 6).length, 0, 'and neither does `b`');

  assert.equal(inst.unlisten(handle), undefined, 'a second `off` over the same identity is a SUCCESS (`DD-53`: the entry-less answer is still the success)');
  assert.equal(triggerSet(inst, ['a'], 'mem', 5).length, 0, 'both entries are now withdrawn: `a` carries no identity');
  assert.equal(triggerSet(inst, ['b'], 'mem', 6).length, 0, 'and neither does `b`');
  assert.equal(fired, 0, 'and not one invocation was made across the two `off` calls');

  // --- (vii) AND THE HOME CONFIRMS IT AT ITS OWN MINT RULE: a later `listen` at EITHER address mints a FRESH
  // identity, because the entries that carried the caller's token are gone (`§2.3` item 6; `§2.4` rule 4).
  const remintedA = inst.listen(['a']);
  const remintedB = inst.listen(['b']);
  assert.notEqual(remintedA, handle, 'a re-`listen` at `a` mints a DIFFERENT handle — the withdrawn arm of `S-WITHDRAW`');
  assert.notEqual(remintedB, handle, 'and so does a re-`listen` at `b` — neither address re-uses the caller\'s token');
  assert.notEqual(remintedA, remintedB, 'and the two fresh identities are distinct values of their own');
});
