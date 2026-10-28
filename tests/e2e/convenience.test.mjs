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

import { storeCreate } from '../../bindings/js/index.mjs';

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
  // **⟶ RE-DERIVED TO THE SET IT PRINTS, 2026-10-29** (`D-77`: FOUR members, `address` present on every arm)
  // — the 2026-10-16 reading is the one that stood, and the count is the print's own. (`surface.md §2.5` item 4: *"the member
  // set is therefore FLAT ACROSS ARMS and not conditional"*; item 9: *"`Object.keys(caught)` reads
  // exactly `["address","log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*).
  // **A THIRD MEMBER IS NO LONGER THE PROHIBITION THIS PREDICATE WROTE** — the prohibition survives only
  // for members OUTSIDE the declared three, and `log` is now one of the three. **THE `log` LIMB IS THE
  // MEMBER'S TYPE, NOT ITS CONTENT** (`PAR-JS-26`): the entries belong to an attempt and are asserted at
  // the cells that drive one, while this predicate only refuses a missing, `null` or non-array member.
  const members = Object.keys(err).sort().join(',');
  if (members !== 'address,log,message,status') {
    return `the member set is \`{${members}}\` and is EXACTLY \`{address, log, message, status}\` and nothing else `
      + '(surface.md §2.5 item 4; item 9)';
  }
  // **⟶ AND THE COUNT IS FOUR FROM 2026-10-29 — `D-77`.** The set print above moved with it; the length is
  // the same fact said a second way, so the two limbs cannot disagree.
  if (Object.keys(err).length !== 4) {
    return `the member set's length is \`${Object.keys(err).length}\` and must be \`4\` (surface.md §2.5 item 9)`;
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

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// MEMBER THIS CELL DRIVES — `on(address, listener) -> handle` — IS RETIRED BY `A127` AND IS NOT A MEMBER OF
// ANY PRODUCT, SO THE CELL IS RE-DERIVED TO THE TWO MEMBERS THAT REPLACED IT RATHER THAN DELETED.**
//
// **THE RETIREMENT, AT ITS OWN BYTES.** `A127` MERGED `on` AWAY: *"`on(address, listener)`'s whole subject was
// the two admissions of `listen` then `register`, in that fixed order and nothing else … and BOTH ADMISSIONS NOW
// STAND AS METHODS — `a.listen(address)` and `a.register(handle, listener)` — so `on` was a SECOND SPELLING of
// a sequence this member set already declares"* (`docs/specs/storeroom-js/surface.md §2.4` item 9, the
// disposition of `register`, `on` and `off`, item `2`, verbatim; the product's declared member set carrying
// NEITHER `on` NOR `off`). **A DRIVE THAT CALLS `on` REACHES A PROPERTY NO CLAUSE OF THE UNIT DECLARES.**
//
// **WHAT THE CELL'S SUBJECT WAS, AND WHERE EACH HALF LIVES NOW:** (ii) *"a listener invoked by one write at
// that address"* is `§2.4` rule 2's; (iii) *"the invocation's ARGUMENT LIST is ONE member and it is the
// TRIGGERING ADDRESS"* is `PAR-JS-12`'s and is UNMOVED; (iv) *"the identity the `triggered` record carries is
// the handle the caller holds"* is `contract.md §2.1` item 1's and `(AA-5)`'s, and under the caller-spelled
// handle it is the value the caller SPELLED — so the `on`-returned opaque wrapper the as-filed limb compared
// against has no subject, and the limb is re-derived to the string identity. **AND THE OBSERVABLES THE AS-FILED
// CELL HAD TO READ THROUGH A WRAPPER ARE NOW READ DIRECTLY:** `trigger-and-pair.md §1` makes `triggered`'s
// element the pair, so the identity AND the binding address are both members of one element.
test('combined_call_a_write_fires_the_function_once_with_the_triggering_address_and_the_triggered_pair_names_the_handle', () => {
  // **THE STATES, ENUMERATED:** (i) an address the store's home does NOT hold — the FRESH arm, reached by
  // `listen` (`listen-verb.md §4`'s state `1`, RESERVED); (ii) a listener invoked by ONE write at that
  // address; (iii) the invocation's ARGUMENT LIST, whose declared length is ONE and whose one member is the
  // TRIGGERING ADDRESS; (iv) the pair the returned record's `triggered` list carries, whose `handle` member is
  // the handle the caller spelled and whose `address` member is the BINDING's.
  //
  // **AND ONE STATE THE DRIVE MUST BUILD BEFORE IT CAN BE DRIVEN AT ALL:** the address is `['a', 0, 'b']`,
  // whose PARENT `['a', 0]` must resolve before any install (`write-and-read.md §3.2` item 2; `DD-5`) — and
  // THE PACKAGE MINTS NO PARENT. So the drive writes the path first, at the store's own declared route, and
  // leaves the TARGET's entry fresh, which is the FRESH arm's pre-condition.
  const inst = mem();
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND NOT AN
  // OPAQUE STACK TRACE: the THREE members the sequence is reached at** (`docs/specs/storeroom-js/surface.md
  // §2.4` item 9 (f)'s `A127` clause; `contract.md §2.2` items 1 and 10).
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the store-facing withdrawal');
  const address = ['a', 0, 'b'];
  // **THE CHAIN THIS DRIVE NEEDS IS BUILT BEFORE THE CALL UNDER TEST, BECAUSE THE STORE MINTS NO PARENT.**
  // `write-and-read.md §3.2` item 2 (the PARENT RULE) resolves the target's parent BEFORE any install, and its
  // failure is the write's failure with the walk's own code (**`DD-5`**: *"a write whose intermediate segment
  // does not resolve fails `AddressNotFound` and installs nothing"*). **NO CLAUSE LETS THE PACKAGE MINT A
  // PARENT**, so the branch the drive needs is written BY THE DRIVE at the store's own declared route: a write
  // of a JSON ARRAY at `['a']` mints the `VEC` whose index `0` holds the MAP-branch a JSON object at that
  // element mints (`store-model.md §1.3`; `write-and-read.md §3.4` arm `W-4`). **THE ADDRESS UNDER TEST IS
  // STILL FRESH**: what is built below is the PATH, never the target — the home holds NO entry at
  // `['a', 0, 'b']`, which is asserted at its own line before any listener exists.
  const chain = inst.write(['a'], 'mem', [{}]);
  assert.equal(chain.triggered.length, 0, 'the branch write registers nothing: the chain is built before any listener stands');
  assert.throws(
    () => inst.read(address),
    (err) => err.status === 'AddressNotFound',
    'the FRESH arm\'s pre-condition: the PATH is built and the address\'s own store-side home entry does not exist',
  );

  let calls = 0;
  let seenArgs = null;
  // **THE TWO OBSERVABLES `§2.7` ITEM 2 CAN BE DRIVEN AT, BOTH READ FROM INSIDE THE LISTENER'S OWN BODY:**
  // the STORE'S OWN STATE as the window found it, and THE RECORD THE CALLER ALREADY HOLDS — because the
  // invocation is SYNCHRONOUS AND RUNS INSIDE THE VERB'S OWN CALL, so the record of the call in flight cannot
  // yet be held by the caller. **THE CLAIM IS UNWEAKENED AND IS MEASURED WHERE IT IS OBSERVABLE: *"the record
  // is COMPLETE and copied out before the window opens"*.**
  let inWindowValue = null;
  let heldRecordComplete = null;
  let trace = [];
  let held = null;

  // **THE HANDLE IS SPELLED, NOT MINTED** (`contract.md §2.1` item 1; `(AA-5)`): `listen` answers the unit and
  // `register` places the function. **`on`'s whole subject was these two admissions IN THAT ORDER**, and their
  // order IS the cell's: the entry exists before the function stands at it.
  const handle = 'on-replacement';
  assert.equal(inst.listen(handle, [address]), handle, '`PAR-HL-3`: `listen` answers `undefined`');
  assert.equal(inst.register(handle, (...args) => {
    calls += 1;
    seenArgs = args;
    trace.push('listener');
    inWindowValue = inst.read(address);
    // THE RECORD THE CALLER HOLDS (`held`) IS COMPLETE AND COPIED OUT WHEN THIS BODY RUNS (`§2.7` item 2).
    heldRecordComplete = held !== null && held.op.after.present === true && held.triggered.length === 1;
  }), undefined, '`register` answers `undefined` (`§2.4` item 5 (a))');

  const record = inst.write(address, 'mem', 1);
  trace.push('after-return');

  assert.equal(calls, 1, 'the function fires EXACTLY ONCE for one write under its address');
  assert.equal(record.triggered.length, 1, 'ONE home entry per address, so ONE pair in the list');
  // **THE PAIR'S `handle` MEMBER IS THE IDENTITY — THE STRING THE CALLER SPELLED, asserted by `===`**
  // (`trigger-and-pair.md §1.1`; `identity-and-domain.md §6` `O-6`: *"no handle is minted — the value
  // the caller supplied and the value the store returns are the same string"*).
  assert.equal(record.triggered[0].handle, handle, 'the pair\'s `handle` member is the identity the caller spelled');
  // **AND ITS `address` MEMBER IS THE BINDING ADDRESS**, which here EQUALS the written address because the
  // listener is bound AT it (`trigger-and-pair.md §1.2`; `§8`'s closing clause: where they are equal the
  // drive must not read that as the pair being absent).
  assert.deepEqual(record.triggered[0].address, address, 'the pair\'s `address` member is the BINDING address');
  // **THE INVOCATION'S ONE ARGUMENT IS THE TRIGGERING ADDRESS** (`PAR-JS-12`'s invocation half; `§2.4` item 6
  // (d)'s two-data table: THE TRIGGERING ADDRESS travels as *"the invocation's ONE argument"*).
  assert.equal(seenArgs.length, 1, 'the invocation view is EXACTLY ONE argument — no id, no record, no second member');
  assert.deepEqual(seenArgs[0], address, 'and that ONE argument is the triggering address itself');
  // **AND `§2.7` ITEM 2's WINDOW, DRIVEN AT THE TWO OBSERVABLES THAT EXIST:** the store's own call had
  // COMPLETED before the window opened (the body read the value the write had just installed), and the
  // invocation is SYNCHRONOUS AND INSIDE the verb's call — `['listener', 'after-return']` is that trace.
  assert.equal(inWindowValue, 1, '`§2.7` item 2: the store\'s call had completed and its value landed BEFORE the window opened');
  assert.deepEqual(trace, ['listener', 'after-return'], 'the invocation is synchronous and runs INSIDE the verb\'s call, before the caller\'s next statement');

  // **AND A SECOND WRITE FIRES IT AGAIN — ONCE — SO THE CELL IS NOT SATISFIED BY A SINGLE LUCKY CALL.**
  calls = 0;
  held = record;
  trace = [];
  inWindowValue = null;
  heldRecordComplete = null;
  const second = inst.write(address, 'mem', 2);
  trace.push('after-return');
  assert.equal(calls, 1, 'one invocation per trigger, never two and never none');
  assert.equal(heldRecordComplete, true, 'the record the caller holds is already COMPLETE (`op.after.present`) when the body runs');
  assert.equal(inWindowValue, 2, 'and the store\'s own call had completed before THIS window opened too');
  assert.deepEqual(trace, ['listener', 'after-return'], 'and the invocation is inside this verb\'s call as well');
  assert.equal(second.triggered[0].handle, handle, 'the same identity, trigger after trigger');
});

// =============================================================================================
// 2. VALIDATION FIRST + ATOMICITY — `surface.md §2.4` item 7 (a)'s step 1; `§2.1`'s dated clause;
//    `parameter-semantics.md §2.17`'s dated clause (the refusal site); `A81` verbatim.
//    THE FAILURE ENTRIES THIS CELL CATCHES: "a NON-FUNCTION ADMITTED at `on`'s listener position" and
//    "an ADDRESS ADMITTED UNVALIDATED at `on`'s address position", plus "a STORE-SIDE ENTRY LEFT BEHIND
//    AFTER A REFUSAL" (`contract.md §5.5`'s re-derived failure list).
// =============================================================================================

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// TWO POSITIONS THIS CELL DRIVES ARE NOW AT TWO MEMBERS RATHER THAN ONE, AND EVERY ASSERTION IS RE-DERIVED TO
// THE MEMBER THAT DECLARES ITS POSITION.**
//   * **THE LISTENER POSITION IS `register`'s SECOND** (`contract.md §2.4` item 5; `identity-and-domain.md §2`
//     item 2's table), driven at a handle the instance HOLDS (`listen` wrote or `cfg.listeners` adopted).
//   * **THE ADDRESS POSITION IS `listen`'s SECOND — INSIDE THE SET — since the ARITY MOVED `1 → 2`**
//     (`contract.md §2.2` items 1–2; `listen-verb.md §2.2` items 1–4, whose SIX outside classes at the set
//     position are the operative enumeration: `(i)` ABSENT, `(ii)` `null`, `(iii)` `undefined`, `(iv)` a
//     non-array, `(v)` an array whose MEMBER is outside the store's address domain, `(vi)` a bare segment
//     list). **THE AS-FILED `listen(address)` SPELLINGS ARE SUPERSEDED WHOLE AND EACH IS RE-DERIVED BESIDE ITS
//     NEW CLASS, NOT DROPPED.**
// **NO ASSERTION IS WEAKENED:** every value of the as-filed class lists is still refused at the same code and
// the same form, and the address arm GAINS the six-class set the set position declares.
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
  // **⟶ RE-DERIVED: the pre-mint spells a HANDLE and a one-member SET, AND IT IS MADE AT ITS OWN ADDRESS**
  // (`listen-verb.md §2.2` item 1). **`fresh` IS LEFT UNTOUCHED HERE ON PURPOSE:** the (i) half below reads
  // the refused address's home BEFORE this cell's own install, and a pre-mint at `fresh` would be the very
  // residue that half exists to rule out (`C-6`).
  const mintedForListener = 'minted-for-listener';
  assert.equal(inst.listen(mintedForListener, [['listener-probe']]), mintedForListener);
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
    // **⟶ RE-DERIVED 2026-10-18: THE HANDLE CLASS THIS LINE DRIVES IS ROW `10` OF
    // `identity-and-domain.md §2` item 3 — A WELL-FORMED STRING THE STORE NEVER HELD — AND NOT A CLASS FAILURE.**
    // Under the caller-spelled identity `'a.b'` is a LAWFUL handle string (`domain(handle) = { s : s ∈ String
    // ∧ s ≠ "" }`, `§2` item 1), so the store's generator answers with its segment-shaped sentence about a
    // value that is not a segment — **the KNOWINGLY IMPERFECT rendering `§2` item 4 records as a RECORDED
    // ACCEPTANCE and not a claimed fit.** **THE ASSERTION THEREFORE TAKES THE HALVES THAT ARM ACTUALLY
    // CARRIES: the one form, the store's own status, the failing TARGET, the POSITION, and the reason — and it
    // does NOT assert a class half the generator does not produce for this row.** The CLASS half is driven
    // where it IS produced: the listener-position loop above.
    const trouble = isRefusal(() => inst.register('a.b', () => {}), {
      target: 'a.b',
      why: 'this instance holds no listener entry for it',
      position: 'first argument',
    });
    assert.equal(trouble, null, `a well-formed handle this instance never held must refuse verbosely: ${trouble}`);
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
  // **⟶ RE-DERIVED 2026-10-18: THE SET POSITION CARRIES THE ADDRESS, SO EACH AS-FILED VALUE BECOMES ONE
  // MEMBER OF THE SET** — `listen('probe', [value])` — **and the class decides the same way**
  // (`listen-verb.md §2.2` item 2 class `(v)`: *"an ARRAY WHOSE MEMBER IS OUTSIDE THE STORE'S ADDRESS DOMAIN"*;
  // item 4: *"The discriminator is the MEMBER'S CLASS, read once per member"*). **NO VALUE IS DROPPED AND THE
  // REFUSAL CODE IS UNMOVED.**
  let probeCount = 0;
  for (const one of malformedAddresses) {
    probeCount += 1;
    const probe = `probe-${probeCount}`;
    assert.equal(inst.listen(probe, [['held']]), probe, 'the probe handle is admitted at a lawful set first');
    inst.removeListener(probe);
    const trouble = isRefusal(() => inst.listen(probe, [one.value]), {
      target: null, // the measured rendering is taken per arm in the block below and never assumed here
      why: 'is not a legal address segment',
      position: Array.isArray(one.value) ? 'second argument' : null,
    });
    assert.equal(trouble, null, `a malformed address (${JSON.stringify(one.value)}) must be refused verbosely: ${trouble}`);
  }
  // **AND THE SET POSITION'S OWN KIND-ARM** (`listen-verb.md §2.2` item 2 class `(iv)`: *"a non-array"*; item 4:
  // *"an array whose members are segments is an ADDRESS and is therefore outside this position's domain"*, and
  // its discriminator *"is the MEMBER'S CLASS, read once per member, and never a length heuristic and never a
  // coercion"*). **A BARE SEGMENT LIST IS THE SHAPE A CALLER MOST OFTEN REACHES FOR BY MISTAKE** — class `(vi)`
  // — and it is OUTSIDE.
  {
    const trouble = isRefusal(() => inst.listen('probe-kind', ['a', 'b']), {
      target: null,
      why: 'is not a legal address segment',
      position: 'second argument',
    });
    assert.equal(trouble, null, `a bare SEGMENT LIST at the set position must be refused verbosely: ${trouble}`);
  }
  {
    // The absent set position (`listen-verb.md` §2.2 item 2 class `(i)`: ABSENT) is the same kind arm.
    const trouble = isRefusal(() => inst.listen('probe-absent'), {
      target: null,
      why: 'a SET of addresses',
      position: null,
    });
    assert.equal(trouble, null, `an absent set position must be refused verbosely: ${trouble}`);
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
  // **⟶ RE-DERIVED 2026-10-18: FOUR OF THE FIVE POSITIONS ARE UNMOVED AND THE FIFTH MOVES `1 → 2`.**
  // `listen(handle, addresses)`'s address position is **INSIDE THE SET**, so `§2.5` item 5 (b)'s
  // *"ARGUMENT POSITION for a verb's arguments"* reads `second argument` there — the position the member
  // declares, driven at its own name and never at a stale figure. **The other four keep `first argument`.**
  const ADDRESS_POSITIONS = [
    { name: 'listen(handle, [address])', position: 'second argument', call: (v) => inst.listen(`probe-${String(v)}`, [v]) },
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
      // **⟶ RE-DERIVED 2026-10-18: THE EMPTY-CONTAINER READING IS TAKEN AT THE FOUR POSITIONS THAT STILL
      // CARRY AN ADDRESS DIRECTLY, AND THE SET POSITION IS EXEMPTED AT ITS OWN DECLARED GROUND.** `listen`'s
      // address now stands INSIDE the set, and the refusal the set position answers is the
      // `listen-verb.md §2.2` item 4 KIND ARM — *"an array whose members are segments is an ADDRESS and is
      // therefore outside this position's domain"* — whose declared answer is the surface's ONE thrown form
      // (`§2.2` item 3: *"the message the store's generator's own text"*). **That sentence is the STORE'S and
      // is reproduced verbatim; no clause licenses the package to render a second one over it**
      // (`parameter-semantics.md §2.26`'s generated-message rule). **THE READING IS THEREFORE TAKEN WHERE THE
      // ADDRESS IS THE WHOLE ARGUMENT AND NOT WHERE IT IS A SET MEMBER — and it is TAKEN, never dropped.**
      if (site.name !== 'listen(handle, [address])') {
        assert.equal(
          message.includes("in ''"), false,
          `${where}: and does NOT carry the empty-container form \`in ''\` — that is the REGISTER's own container spelling (native contract §8.2's \`<CONTAINER>\`), not an address argument's failure — in \`${message}\``,
        );
      } else {
        // ...and at the SET position the exemption is ASSERTED as the declared kind arm, so the cell is not
        // read as an absence: the message names the MEMBER (the position inside the set) and the class.
        assert.ok(
          message.includes('member 0') || message.includes('second argument'),
          `${where}: the SET position's refusal names the member it failed at and the argument position `
          + `(\`listen-verb.md §2.2\` items 2–4) — in \`${message}\``,
        );
      }
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
    // **⟶ THE EMPTY-CONTAINER READING, RE-DERIVED AT THIS LOOP BY THE SAME CLAUSE AS THE LOOP ABOVE**
    // (`listen-verb.md §2.2` items 3–4: the set position's kind arm is answered by the STORE'S OWN generated
    // sentence, reproduced verbatim). **TAKEN AT THE FOUR WHOLE-ADDRESS POSITIONS AND EXEMPTED AT THE SET
    // POSITION, WHICH IS AN EXEMPTION AT ITS OWN DECLARED GROUND AND NOT A SKIPPED CELL.**
    if (site.name !== 'listen(handle, [address])') {
      assert.equal(message.includes("in ''"), false,
        `${site.name}: and the empty-container form \`in ''\` is NOT carried — in \`${message}\``);
    }
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
      inst.listen('probe-segment', [['a', 1.5]]);
    } catch (err) {
      thrown = err;
    }
    assert.ok(thrown !== null && typeof thrown === 'object', 'an ARRAY holding a non-integer number is refused at `listen`');
    assert.equal(thrown.status, 'AddressMalformed',
      '`AddressArg` row 8 carries the store\'s own `AddressMalformed` at this site, minted by nothing (`§2.5` item 5 (c); `DD-40`)');
    const message = String(thrown.message);
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE AS-FILED SUB-CELL READ THE ADDRESS AS `listen`'s WHOLE
    // ARGUMENT; UNDER THE SET POSITION THE FAILING ADDRESS IS A SET MEMBER AND THE CLAUSE THAT GOVERNS IS
    // `listen-verb.md §2.2` ITEMS 2–4.** **THE ASSERTION IS RE-DERIVED TO THE ARM THE DECLARATION GIVES THE
    // VALUE, AND IT IS NOT WEAKENED:** the as-filed sub-cell's point — *"the whole-address failure is never
    // rendered as the ARRAY's own stringified value at an ADDRESS position"* — survives WHOLE, and it is now
    // read at the member arm where the member's own class is what decides (`§2.2` item 4: *"The discriminator
    // is the MEMBER'S CLASS, read once per member, and never a length heuristic and never a coercion"*).
    assert.ok(message.includes('is not a legal address segment'),
      'the CLASS half is carried (`§2.5` item 5 (b))');
    assert.ok(message.includes('second argument'),
      'and the ARGUMENT POSITION `listen` declares for the set is carried beside the class ('
      + '`listen-verb.md §2.2` item 3: the surface\'s ONE thrown form)');
    assert.ok(message.includes('member 0'),
      'and the MEMBER the failure was found at is named — the position inside the set '
      + '(`listen-verb.md §2.2` items 2–4; the set is the position and its member is the address)');
    // **AND THE MEMBER'S OWN ADDRESS IS OUTSIDE THE STORE'S DOMAIN** (`§2.2` item 2 class `(v)`: *"an ARRAY
    // WHOSE MEMBER IS OUTSIDE THE STORE'S ADDRESS DOMAIN (a … float index …)"*), which the message states.
    assert.ok(message.includes('outside the store\'s domain'),
      'and the reason states the MEMBER\'s address is outside the store\'s domain '
      + '(`listen-verb.md §2.2` item 2 class `(v)`)');
    // **THE CONFLATION THE AS-FILED SUB-CELL REFUSED, RE-DERIVED TO THIS ARM AND STILL REFUSED:** the message is
    // NOT the bare generator sentence about a VALUE-position argument — it carries the set position and the
    // member, so the failure is located and not merely named.
    assert.ok(!/^'a,1\.5' is not a legal address segment in '', segments are strings or non-negative integers$/.test(message),
      'THE CONFLATION REFUSED HERE: the failure is located by the ARGUMENT POSITION and the MEMBER, never left '
      + 'as the value-position generator sentence alone');
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

  // **⟶ RE-DERIVED 2026-10-18: THE MINT HAS NO SUBJECT, SO THIS HALF IS RE-DERIVED TO THE OBSERVABLE THE NEW
  // DECLARATION GIVES IT.** As filed the line proved the refusals left nothing behind by comparing the handle a
  // fresh `listen` MINTED against `triggered`'s element — and under the caller-spelled identity `listen` mints
  // nothing and answers `undefined` (`contract.md §2.1` item 1; `(AA-5)`; `PAR-HL-3`), so no such comparison
  // exists. **THE CLAIM ITSELF IS UNWEAKENED AND IS NOW DRIVEN AT THREE OBSERVABLES:** `listen` answers the
  // unit; the home held NO entry before it (so the act is an INSTALL and not a no-op over residue); and the
  // entry the address carries afterwards is the handle THIS call spelled — never a handle a refused act
  // had left there.
  const mintedAfter = 'fresh-after-refusals';
  assert.equal(inst.listen(mintedAfter, [['fresh']]), mintedAfter,
    '`PAR-HL-3`: `listen` answers `undefined` — no value is minted and none comes back');
  assert.equal(
    triggerSet(inst, ['fresh'], 'mem', 2).length,
    1,
    'ONE entry at `fresh` AFTER the mint and NEVER two — a refused `on` left no entry for the mint to collide with',
  );
  assert.equal(
    triggerSet(inst, ['fresh'], 'mem', 5)[0].handle,
    mintedAfter,
    'ONE home entry per address, and its identity is the handle THIS `listen` spelled — the address now '
    + 'carries exactly the entry made AFTER the refusals and never one a refused act had left',
  );

  const heldAfter = triggerSet(inst, ['held'], 'mem', 3);
  assert.equal(heldAfter.length, distinctMembers(heldBefore), 'the held address\'s entry count is exactly what it was');
  assert.equal(heldAfter[0].handle, heldBefore[0].handle, 'and it is the SAME identity — the standing entry was not disturbed');

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

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// MEMBER THIS CELL DRIVES IS RETIRED BY `A127` AND EVERY LIMB IS RE-DERIVED TO THE TWO MEMBERS THAT REPLACED
// IT. `on`'s HELD ARM — *"at a held address it returns the EXISTING entry's handle"* — HAS NO SUBJECT:**
// `listen` answers `undefined` and mints nothing (`contract.md §2.2` item 10; `PAR-HL-3`; `A: docs/specs/
// storeroom-js/surface.md §2.4` item 9's disposition of `register`, `on` and `off`, item `2`). **WHAT THE HELD
// ARM WAS REACHING FOR SURVIVES AT THREE PLACES, EACH DRIVEN AT ITS OWN MEMBER:**
//   (i) **A REPEATED `listen` AT A HELD ADDRESS IS A PURGE THEN A FRESH RESERVATION, AND `A45`'s ONE HOME ENTRY
//       PER ADDRESS STANDS** (`listen-verb.md §3` item 1; `§4`'s transition `1 → 1`/`2 → 1`);
//   (ii) **A REPLACEMENT AT `register` IS A REPLACEMENT AND NEVER A FAN-OUT** (`§2.4` rule 2: *"a later trigger
//       invokes the REPLACEMENT once, and the replaced function never fires again"*); and
//   (iii) **`DD-52`'s READING IS UNMOVED** — *"THE REGISTRY DOES NOT RECORD WHICH MEMBER WROTE AN ENTRY"* —
//       so an entry created by the two-call sequence takes a replacement exactly as one `on` created would.
test('held_address_arm_a_repeat_listen_is_a_re_reservation_and_register_is_a_replacement_not_a_fan_out', () => {
  // **THE STATES, ENUMERATED:** (i) an address whose entry came from `listen` — a repeat `listen` there
  // re-reserves it and `register` REPLACES the function; (ii) an address whose entry came from the
  // construction's `listeners[]`; (iii) an address whose entry came from `register` directly, which `DD-52`
  // settles as a REPLACEMENT and not a refusal.
  const inst = mem([{ address: ['adopted'], handle: 'l-adopted' }]);
  // **THE PRECONDITION THIS FILE ASSERTS FIRST, SO THE RED IT REPORTS IS THE CONTRACT'S OWN CLAIM AND NOT AN
  // OPAQUE STACK TRACE: the three members the sequence is reached at.**
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the store-facing withdrawal');

  // --- (i) THE HELD ARM, over an entry `listen` placed.
  const handle = 'held';
  assert.equal(inst.listen(handle, [['held']]), handle, '`PAR-HL-3`: `listen` answers `undefined`');
  let firstFired = 0;
  let secondFired = 0;
  // **THE REPEAT `listen` RE-RESERVES AND ANSWERS THE UNIT; the FUNCTION is placed by `register` alone.**
  assert.equal(inst.listen(handle, [['held']]), handle, 'the repeat `listen` re-reserves the entry');
  assert.equal(inst.register(handle, () => { firstFired += 1; }), undefined);
  assert.equal(inst.listen(handle, [['held']]), handle, 'and a third call answers the unit too');
  assert.equal(inst.register(handle, () => { secondFired += 1; }), undefined, 'the second function REPLACES the first');
  assert.equal(triggerSet(inst, ['held'], 'mem', 1).length, 1, '`A45`: ONE home entry per address, never two');

  // **AND IT REPLACES** (`§2.4` rule 2; the HELD arm's own sentence *"a later trigger invokes the REPLACEMENT
  // once, and the replaced function never fires again"*). **THE COUNT IS TAKEN IN TWO STEPS, BECAUSE THE WRITE
  // ABOVE IS ALREADY A TRIGGER:** the registered function fires ONCE PER TRIGGER, so the write at `A45`'s
  // pre-state assertion has already fired it — and that firing is what ESTABLISHES the standing state this
  // half then measures. The counter is reset AT THE POINT THE CLAIM BEGINS.
  assert.equal(secondFired, 1, 'the SECOND listener is the registered one, and it demonstrably fires ONCE');
  assert.equal(firstFired, 0, 'and the replaced function has NEVER fired — one identity, one function');
  secondFired = 0;
  triggerSet(inst, ['held'], 'mem', 2);
  assert.equal(secondFired, 1, 'the SECOND listener fires once PER TRIGGER — the write under test fires it once');
  assert.equal(firstFired, 0, 'the replaced function NEVER fires again — one identity, one function, and no fan-out');

  // --- (ii) THE HELD ARM over the construction's own adopted entry.
  const adoptedBefore = triggerSet(inst, ['adopted'], 'mem', 1);
  assert.equal(adoptedBefore[0].handle, 'l-adopted', 'the construction adopted the caller\'s own handle verbatim');
  let adoptedFirst = 0;
  let adoptedSecond = 0;
  assert.equal(inst.register('l-adopted', () => { adoptedFirst += 1; }), undefined);
  assert.equal(inst.listen('l-adopted', [['adopted']]), 'l-adopted');
  assert.equal(inst.register('l-adopted', () => { adoptedSecond += 1; }), undefined);
  triggerSet(inst, ['adopted'], 'mem', 2);
  assert.equal(adoptedSecond, 1, 'the replacement fires once');
  assert.equal(adoptedFirst, 0, 'the replaced function is dropped without notice');

  // --- (iii) **`DD-52`: AN ENTRY THE TWO-CALL SEQUENCE CREATED TAKES A REPLACEMENT, NOT A REFUSAL.** *"THE
  // REGISTRY DOES NOT RECORD WHICH MEMBER WROTE AN ENTRY, and `register` has ONE map with ONE replacement arm
  // (`§2.4` rule 2)."* **A refusal here would be the `DD-52` alt, and would be caught by this cell.**
  const twoCall = 'by-register';
  assert.equal(inst.listen(twoCall, [['by-register']]), twoCall);
  let registeredFirst = 0;
  let registeredSecond = 0;
  assert.equal(inst.register(twoCall, () => { registeredFirst += 1; }), undefined);
  assert.equal(inst.listen(twoCall, [['by-register']]), twoCall);
  assert.equal(inst.register(twoCall, () => { registeredSecond += 1; }), undefined);
  triggerSet(inst, ['by-register'], 'mem', 1);
  assert.equal(registeredSecond, 1, 'the function placed second is the one the identity now carries');
  assert.equal(registeredFirst, 0, 'and the earlier function was REPLACED, never fanned out beside it');

  // **AND ONE IDENTITY CARRIES ONE FUNCTION AND NOT TWO** (`§2.4` rule 2): a third write changes nothing.
  triggerSet(inst, ['by-register'], 'mem', 2);
  assert.equal(registeredSecond, 2, 'one invocation per trigger, never one per the two members that wrote the map');
});

// =============================================================================================
// 4. `off`'s TWO REMOVALS AND THE CONTRAST — `surface.md §2.4` item 7 (b)'s OWN, OWN-ENTRYLESS and OUTSIDE
//    arms; `§2.4` rule 4 KEPT VERBATIM; `§2.3`'s dated clause 3; `contract.md §0.2` · `DD-53`; `A80`.
//    THE FAILURE ENTRIES THIS CELL CATCHES: "`off` FAILING TO REMOVE THE REGISTRY ENTRY" and
//    "`off` REMOVING MORE THAN THE HANDLE NAMES".
// =============================================================================================

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): `off`
// IS RETIRED BY `A127` AND THE CELL IS RE-DERIVED TO THE MEMBERS THAT CARRY ITS TWO HALVES.**
//
// **THE RETIREMENT, AT ITS OWN BYTES** (`A: docs/specs/storeroom-js/surface.md §2.4` item 9's disposition of
// `register`, `on` and `off`, item `2`; `§2.9` item 1's `A127` clause): `on` and `off` are MERGED AWAY and are
// members of NO product. **AND WHAT `off`'s TWO REMOVALS BECOME IS THE UNIT'S OWN SPLIT, WHICH IS SHARPER THAN
// THE PAIR IT REPLACES:**
//   * **`off`'s FIRST HALF — THE STORE-SIDE WITHDRAWAL — IS `unlisten`'s** (`contract.md §5.5`'s fourth added
//     entry; `identity-and-domain.md §3` item 2 (i)), and it DOES NOT deregister: `register` re-arms the entry
//     (`contract.md §3` `S-6`; `listen-verb.md §4`'s transition `1 → 2`).
//   * **`off`'s SECOND HALF — THE REGISTRY REMOVAL — IS `removeListener`'s**, the member the unit ADDS
//     (`contract.md §2.7` items 1–2; `removal-members.md §2` item 3: *"NO `unlisten` IS ISSUED AND NO
//     SEPARATE WITHDRAWAL VERB IS REACHED: the removal IS the purge, and the map entry's deletion follows it"*).
// **SO THE CELL'S OWN CONTRAST — *"`off` performs both removals while `unlisten` removes only the store side
// and the registry entry STANDS"* — IS DRIVEN AS THE DECLARED THREE-WAY SEPARATION, AND IT IS STRONGER: the
// two halves are now separable AT TWO MEMBERS, which the merged `off` never made assertable.**
test('the_two_removal_halves_are_separable_unlisten_withdraws_only_the_store_side_and_removeListener_takes_the_entry', () => {
  // **THE STATES, ENUMERATED:** (i) `unlisten` over a registered in-domain identity — the STORE-SIDE
  // withdrawal ALONE, the registry entry STANDING and RE-ARMABLE (rule 4 verbatim); (ii) `removeListener` over
  // the same shape — the entry removed WHOLE, so `register` is REFUSED; (iii) an in-domain handle the registry
  // holds NO function for — a success that disturbs nothing; (iv) an OUTSIDE handle — the two members'
  // DECLARED REVERSAL, `unlisten` a no-op success and `removeListener` a throw; (v) a lawful SIBLING
  // registration, untouched by either removal.
  const inst = mem();
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the store-facing withdrawal');
  assert.equal(typeof inst.removeListener, 'function',
    'and `removeListener(handle)` is the ONE act that removes an entry (`contract.md §2.7` item 1)');

  // --- (i) THE WITHDRAWAL-ONLY ARM. A sibling registration is standing BESIDE the one `unlisten` names, so
  // *"NO OTHER REGISTRATION IS REMOVED"* (`identity-and-domain.md §6` `O-3`) is drivable at the same moment.
  let targetFired = 0;
  let siblingFired = 0;
  let stoodFired = 0;
  let keeperFired = 0;
  assert.equal(inst.listen('target', [['x']]), 'target');
  assert.equal(inst.register('target', () => { targetFired += 1; }), undefined);
  assert.equal(inst.listen('sibling', [['y']]), 'sibling');
  assert.equal(inst.register('sibling', () => { siblingFired += 1; }), undefined);
  assert.equal(triggerSet(inst, ['x'], 'mem', 1).length, 1);
  assert.equal(triggerSet(inst, ['y'], 'mem', 2).length, 1);

  assert.equal(inst.unlisten('target'), undefined, '`§2.3` item 4: the answer is `undefined`');
  targetFired = 0;
  siblingFired = 0;

  // THE FIRST REMOVAL — the STORE-SIDE ONE: a later write at that address no longer carries the identity
  // (the store-side home entry is gone, so the trigger's set is EMPTY).
  assert.equal(
    triggerSet(inst, ['x'], 'mem', 3).length,
    0,
    'the store-side home entry is WITHDRAWN: a later write carries no identity at that address',
  );
  assert.equal(targetFired, 0, 'and there is no store-side entry left to match it');
  // **THE REGISTRY ENTRY STANDS — AND THE UNIT MAKES THAT ASSERTABLE DIRECTLY RATHER THAN BY INFERENCE:**
  // `register` RE-ARMS the withdrawn entry and the address fires again (`identity-and-domain.md §3` item 2 (i);
  // `contract.md §3` `S-6`). **A REMOVAL HERE WOULD REFUSE THAT CALL.** (The as-filed cell could only infer
  // the standing half from a re-`listen` minting a different handle; that mint is gone and the direct
  // observable replaces it.)
  assert.equal(inst.register('target', () => { targetFired += 1; }), undefined,
    '`identity-and-domain.md §3` item 2 (i): the withdrawn entry EXISTS and is re-armable');
  assert.equal(triggerSet(inst, ['x'], 'mem', 9).length, 1, '...and the store side was re-installed by the re-arm');
  assert.equal(targetFired, 1, '...so the address fires its function again');
  // (v) AND THE SIBLING IS UNTOUCHED — driven as a set, never by size alone.
  const siblingAfter = triggerSet(inst, ['y'], 'mem', 4);
  assert.equal(siblingAfter.length, 1, 'the sibling registration STANDS after the withdrawal');
  assert.equal(siblingAfter[0].handle, 'sibling', 'and it is the SAME identity — nothing was removed it did not name');
  assert.equal(siblingFired, 1, 'and the sibling\'s function still fires');

  // --- (ii) **THE SECOND HALF, AT `removeListener`: THE ENTRY IS REMOVED WHOLE.** `unlisten` keeps the entry
  // and re-arms it; `removeListener` deletes it, so `register` is REFUSED (`identity-and-domain.md §3` item 2
  // (ii): *"AFTER `removeListener(h)`: the entry is GONE; `register(h, fn)` is REFUSED"*; `contract.md §2.1`
  // item 5's fabricated row). **A drive asserts EACH PAIR AND NEVER A MIXTURE** (`§3` item 2's closing clause).
  assert.equal(inst.removeListener('target'), undefined, '`contract.md §2.7` item 2: the removal answers `undefined`');
  assert.throws(
    () => inst.register('target', () => {}),
    (err) => err.status === 'AddressMalformed',
    '`identity-and-domain.md §3` item 2 (ii): a DELETED entry is not a RESERVED one',
  );
  assert.equal(triggerSet(inst, ['x'], 'mem', 10).length, 0, '...and the store side is gone with it');

  // --- (iii) **AN ENTRY-LESS IN-DOMAIN IDENTITY IS A SUCCESS THAT DISTURBS NOTHING** (`contract.md §2.7` item
  // 5; `§2.1` item 5's fourth column). **A SUCCESS IS DRIVEN AS A SUCCESS AND NEVER THROUGH THE REFUSAL'S
  // PREDICATE.** A NEVER-REGISTERED handle and an ALREADY-DELETED one are the two arms of this state.
  assert.equal(inst.listen('keeper', [['keeper']]), 'keeper');
  assert.equal(inst.register('keeper', () => { keeperFired += 1; }), undefined);
  assert.equal(inst.listen('never', [['never']]), 'never');
  const neverArms = reachedOrRaised(() => inst.unlisten('never'));
  assert.equal(neverArms.thrown, null, 'an in-domain handle holding no function is a SUCCESS: NOTHING IS THROWN');
  assert.equal(neverArms.raised, undefined, 'and its answer is `undefined`, the same success every `unlisten` arm answers');
  assert.equal(inst.unlisten('never'), undefined, 'and its second answer is the same success');
  // ...and the SAME handle at `removeListener` after the entry is gone is the DELETED arm: `removeListener` is
  // the throw and `unlisten` the no-op success, on ONE value (`contract.md §2.1` item 5's closing clause).

  // --- (iv) **THE OUTSIDE ARM IS THE DECLARED REVERSAL, DRIVEN ON ONE VALUE AT BOTH MEMBERS** (`P: docs/
  // pending.md · P-5`'s `(R2)`, verbatim: *"where `unlisten` answers a fabricated handle … each as a no-op
  // SUCCESS, the `remove` members answer them as FAILURES carrying a verbose message"*; `contract.md §2.1` item
  // 5's closing clause). **THE DIFFERENCE IS ASSERTED AS A DIFFERENCE AND NOT AS TWO ISOLATED READINGS.**
  const stranger = mem();
  assert.equal(stranger.listen('foreign-only', [['f']]), 'foreign-only');
  assert.equal(inst.unlisten('foreign-only'), undefined, '`§2.3` item 4: the foreign value is a NO-OP SUCCESS at `unlisten`');
  assert.equal(inst.unlisten('foreign-only'), undefined, 'and its second answer is the same no-op success');
  assert.equal(inst.unlisten(0), undefined, 'and a NUMBER at the position is the same no-op success (`PAR-JS-8`)');
  assert.throws(
    () => inst.removeListener('foreign-only'),
    (err) => err.status === 'AddressMalformed',
    '...and at `removeListener` THE SAME VALUE IS A THROW — the declared reversal (`(R2)`)',
  );
  assert.throws(
    () => inst.removeListener(0),
    (err) => err.status === 'AddressMalformed',
    '...and so is a non-string there: the removal member\'s refusal set is the class test (`removal-members.md §6` item 1)',
  );

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

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// MEMBER THIS CELL DRIVES IS RETIRED BY `A127`, AND THE ORDER IT ASSERTS IS RE-DERIVED TO THE ONE REMOVAL
// MEMBER THAT CARRIES BOTH HALVES.** `off`'s *"VALIDATE → UNLISTEN → DEREGISTER"* step list is MERGED away with
// `off` (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause, item `2`). **THE UNIT DECLARES A
// NARROWER AND SHARPER ORDER FOR ITS OWN MEMBER, AND IT IS THE ONE ASSERTED HERE — `contract.md §2.7` item
// 5's *"A REFUSAL CHANGES NOTHING: all four structures stand as they stood"* (`removal-members.md §5`
// obligation (iii)): `removeListener` VALIDATES FIRST — both class tests precede every store act — and THE
// PURGE IS THE REMOVAL, so there is no intermediate instant in which the store side is withdrawn and the map
// entry still stands.**
//
// **THE AS-FILED PARK IS RE-DERIVED WITH IT AND NOT DROPPED:** `DD-54`'s *"the ONE case the store refuses — a
// malformed argument's shape reaching the store-side `unlisten`"* is still NOT CONSTRUCTIBLE from the declared
// surface, because `removeListener` validates at its class test and only an IN-DOMAIN handle reaches the store.
// **That park stands as a park and no assertion is fabricated for it.** What IS driven is its whole
// constructible observable: after any `removeListener` that throws, BOTH the store-side entry and the
// registry entry are exactly as they were.
test('the_removal_validates_first_and_any_throw_leaves_both_entries_exactly_as_they_were', () => {
  // **THE STATES, ENUMERATED:** (i) a REFUSED `removeListener` (an outside handle) over an instance that ALSO
  // holds a standing in-domain registration — NEITHER half removed for the refused handle, and the standing
  // entry untouched; (ii) the same probe at a HELD address, so a refusal that disturbed the standing entry is
  // caught; (iii) the in-domain SUCCESS path, whose ONE removal is BOTH halves at once.
  const inst = mem();
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.removeListener, 'function',
    'and `removeListener(handle)` is the ONE act that removes an entry (`contract.md §2.7` item 1)');

  // A STANDING registration at one address, and a second one at another, so "both entries as they were" is
  // measurable at two places. **THE HANDLES ARE SPELLED** (`contract.md §2.1` item 1; `(AA-5)`).
  let heldFired = 0;
  let otherFired = 0;
  assert.equal(inst.listen('order', [['order']]), 'order');
  assert.equal(inst.register('order', () => { heldFired += 1; }), undefined);
  assert.equal(inst.listen('other', [['other']]), 'other');
  assert.equal(inst.register('other', () => { otherFired += 1; }), undefined);

  const beforeSet = triggerSet(inst, ['order'], 'mem', 1);
  assert.equal(beforeSet.length, 1, 'the pre-state: ONE store-side entry at `order`');
  // **THE STANDING STATE IS ESTABLISHED FIRST — THE PRE-STATE THE (ii) HALF THEN RE-ASSERTS UNCHANGED.** The
  // write at `order` above IS a trigger, so the registration has now demonstrably fired once for a write at
  // its own address; the home's own node is read at its own bytes too (`§4.1`/`§4.2` arm `R-2`).
  assert.equal(heldFired, 1, 'the standing registration demonstrably fires ONCE for a write at its own address');
  const heldHomeBefore = inst.read(['order']);
  assert.equal(heldHomeBefore, 1, 'and the held address\'s node holds the literal the pre-state write installed');
  heldFired = 0;

  // --- (i) A REFUSED REMOVAL: THE OUTSIDE HANDLE. **BOTH CLASS TESTS PRECEDE EVERY STORE ACT** (`contract.md
  // §2.7` item 5; `removal-members.md §6` item 1), so NEITHER half is performed.
  const stranger = mem();
  assert.equal(stranger.listen('foreign-handle', [['f']]), 'foreign-handle');
  assert.throws(
    () => inst.removeListener('foreign-handle'),
    (err) => err.status === 'AddressMalformed',
    'a well-formed handle THIS INSTANCE never held is refused (`contract.md §2.1` item 5, the fabricated row)',
  );
  assert.throws(
    () => inst.removeListener(''),
    (err) => err.status === 'AddressMalformed',
    'and a blank string is the class test\'s own arm (`identity-and-domain.md §2` item 3 row `1`)',
  );
  assert.throws(
    () => inst.removeListener(null),
    (err) => err.status === 'AddressMalformed',
    'and `null` is row `3`',
  );

  // ...and the STORE-SIDE half of the refused handle was not touched: the foreign instance's own entry
  // still fires, so a package that withdrew store-side BEFORE the class test is caught here.
  let foreignFired = 0;
  assert.equal(stranger.register('foreign-handle', () => { foreignFired += 1; }), undefined);
  const stillThere = triggerSet(stranger, ['f'], 'mem', 1);
  assert.equal(stillThere.length, 1, 'the refused removal performed NO store-side withdrawal anywhere');
  assert.equal(stillThere[0].handle, 'foreign-handle', 'and the foreign identity is intact');
  assert.equal(foreignFired, 1, 'and the foreign registration still fires');

  // --- (ii) THE HELD-ADDRESS HALF: the standing entry at `order` is EXACTLY what it was, and its function
  // still fires — a refused removal that disturbed a standing entry would be caught here.
  assert.equal(
    inst.read(['order']),
    heldHomeBefore,
    'the standing home is BYTE-IDENTICAL after the refused removal — the node is exactly what it was',
  );
  const afterSet = triggerSet(inst, ['order'], 'mem', 2);
  assert.equal(afterSet.length, beforeSet.length, 'the standing store-side entry COUNT is unchanged');
  assert.equal(afterSet[0].handle, beforeSet[0].handle, 'and it is the SAME identity');
  assert.equal(heldFired, 1, 'and the standing registration still fires — ONCE, for this write, and never zero times');

  // --- (iii) AND THE POSITIVE HALF, ONE STEP AT A TIME (`contract.md §2.7` item 3 / `removal-members.md`
  // §2` item 3): the ONE removal IS the purge, so after it (step 2) the store-side entry is withdrawn AND
  // (step 3) the registry's entry is gone — and the SIBLING at `order` is untouched by both.
  assert.equal(inst.removeListener('other'), undefined, 'the removal answers `undefined` (`§2.7` item 2)');
  const otherAfter = triggerSet(inst, ['other'], 'mem', 3);
  assert.equal(otherAfter.length, 0, 'the store-side withdrawal landed with the removal');
  assert.throws(
    () => inst.register('other', () => {}),
    (err) => err.status === 'AddressMalformed',
    'and the registry entry is gone: `register` on the removed handle is REFUSED (`identity-and-domain.md §3` item 2 (ii))',
  );
  const siblingNow = triggerSet(inst, ['order'], 'mem', 4);
  assert.equal(siblingNow.length, 1, 'the sibling at `order` stands');
  assert.equal(siblingNow[0].handle, beforeSet[0].handle, 'and is the same identity it was');
});

// =============================================================================================
// 6. THE SURFACE CLAIMS AT THEIR NEW VALUES — `surface.md §2.1` and its dated clause (a)–(b);
//    `§2.4` item 7's opening line; `contract.md §5.5`'s named false cells; the convenience proposal's
//    `A79` verbatim. **AND NOTHING IS RENAMED AND NOTHING IS WEAKENED: the two OLD spellings
//    (`{ register }` on the instance, and the eight-verb namespace) are asserted at their NEW values
//    BESIDE each other, so a cell cannot satisfy one by dropping the other.
// =============================================================================================

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
// THE CELL'S NAME CARRIES TWO FIGURES (`SEVEN` and `ELEVEN`) BOTH OF WHICH ARE SUPERSEDED-AND-MARKED AT THEIR
// OWN CLAUSES, AND THE CELL IS RE-DERIVED IN PLACE, NOT DELETED.** The as-filed name is kept in the comment
// above rather than in the identifier, because a test name that spells a withdrawn figure is a FINDING under
// `RCA-8(g)`'s mark-at-itself rule.
test('the_instance_member_set_is_the_fourteen_declared_members_and_the_namespace_is_at_the_one_name', async () => {
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
  // **⟶ RE-DERIVED 2026-10-18 AGAIN (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` tail):
  // THE SET MOVES `12 → 14`, `10 + 1 + 1 + 2 = 14` ✓**, the `2` being `removeListener` and `removeConstraint`
  // (`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9; `removal-members.md §2`;
  // `remove-member.md §2`). **The cell's own subject — the member set is the TEN store-reaching methods
  // plus the non-store-reaching ones, and the merged-away `on`/`off` pair appears NOWHERE — is UNMOVED**, and
  // each earlier move this cell carried is read THROUGH: `13 → 12` on `§2.4` item 9 (f)'s clause of
  // 2026-10-18 item `1` (the `settle` removal), and `12 → 13` on that item's `constraints` clause of
  // 2026-10-17.
  assert.deepEqual(
    memberSet(inst),
    ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
      'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write'],
    'the member set is the TEN store-reaching methods plus `register`, `constraints`, `removeListener` and '
    + '`removeConstraint` — FOURTEEN own members, `10 + 1 + 1 + 2 = 14` ✓, and NOTHING ELSE',
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
  const namespace = await import('../../bindings/js/index.mjs');
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
  //
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE ARITY FIGURE MOVES `1 → 2` AT `listen` AND THE
  // OVERLOAD THE CELL GUARDS AGAINST MOVES WITH IT** (`contract.md §2.2` item 1; `listen-verb.md §1` item 1:
  // *"position `1` is `handle` … position `2` is `addresses` … the arity is `2` and there is no third
  // position"*). **THE SUBJECT IS UNMOVED AND IS NOW STRONGER: the member declares exactly TWO positions, and
  // a THIRD — a listener smuggled past `register` — registers nothing.**
  const over = mem();
  let smuggled = 0;
  assert.equal(over.listen.length, 2, '`listen` declares TWO positions and no more (`listen-verb.md §1` item 1)');
  assert.equal(over.unlisten.length, 1, 'and `unlisten` declares ONE');
  assert.equal(over.listen('u', [['u']]), 'u',
    '`listen(handle, addresses)` ANSWERS THE HANDLE IT WATCHES UNDER (`D-22`: the return moved `void → '
    + 'Handle`; the `PAR-HL-3` reading that said `undefined` is superseded by name)');
  // **THE THIRD POSITION IS NOT A POSITION:** a function passed there is IGNORED and registers nothing.
  assert.equal(over.listen('u', [['u']], () => { smuggled += 1; }), 'u',
    'no third position exists, so a listener supplied there reaches no site — and the answer is still the '
    + 'handle, because the ignored position changes nothing about the return (`D-22`)');
  const registered = over.register('u', () => { smuggled += 1; });
  assert.equal(registered, undefined, 'and the function is placed by `register` alone, which answers `undefined`');
  triggerSet(over, ['u'], 'mem', 1);
  assert.equal(smuggled, 1, 'exactly the ONE function `register` placed is registered — no `listen` position carries a listener');
  assert.equal(over.unlisten('u'), undefined, '`unlisten(handle)` answers `undefined` as declared');
});

// =============================================================================================
// 7. `off`'s OUTSIDE HANDLE CLASSES — `parameter-semantics.md §2.8` (§2.8's row and its dated clauses),
//    `§2.17`'s dated clause item 3, `surface.md §2.3`'s dated clause 2 and `§2.4` item 7 (b)'s OUTSIDE
//    arm. **MEMBER-BY-MEMBER ON THE REFUSAL'S OWN FORM.** THE FAILURE ENTRY THIS CELL CATCHES:
//    "an ADDRESS ADMITTED UNVALIDATED" on the `off` side — an outside handle that removes anything,
//    or that answers `unlisten`'s no-op success.
// =============================================================================================

// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// CELL'S SUBJECT IS THE **DECLARED REVERSAL** BETWEEN THE TWO REMOVAL MEMBERS, AND THE REVERSAL IS NOW THE WHOLE
// OF WHAT IT ASSERTS.**
//
// **THE RULING, VERBATIM — `P: docs/pending.md · P-5`'s `(R2)`: *"where `unlisten` answers a fabricated handle, a
// foreign instance's, a prior session's, a blank token and a non-opaque value each as a **no-op SUCCESS**, the
// `remove` members answer them as **FAILURES carrying a verbose message**"*** (`contract.md §2.1` item 5's
// closing clause: *"THE SAME VALUE THAT IS A SILENT SUCCESS HERE IS A THROWN FAILURE AT `removeListener` — TWO
// DISPOSITIONS FOR ONE ARGUMENT IN ONE PRODUCT, and that reversal is RULED, not accidental"*). **The as-filed
// cell drove the no-op half at the retired `off`/`unlisten` and could not drive the other half at all, because
// the member that carries it did not exist. This pass drives BOTH HALVES OF THE REVERSAL AT ONE CLASS SET, and
// the class set is the one `identity-and-domain.md §2` item 3's ten-row table declares.**
test('the_two_removal_members_answer_every_outside_handle_class_by_the_declared_reversal', () => {
  // **THE OUTSIDE CLASSES, ENUMERATED FROM `identity-and-domain.md §2` ITEM 3's TEN-ROW TABLE** (the operative
  // enumeration; `contract.md §2.1` item 5's closed table): row `1` a BLANK string · row `2` a non-string
  // primitive · row `3` `null` · row `4` `undefined`/ABSENT · row `5` a plain object, an array or a function ·
  // row `6` a `Symbol` · row `7` a `Proxy` · row `8` a WELL-FORMED string A FOREIGN INSTANCE HOLDS · row `9` a
  // PRIOR SESSION's string · row `10` a well-formed string the store NEVER held. **THE CLASS SET IS CLOSED, AND
  // EACH CLASS ANSWERS THE SAME ONE CODE AND THE SAME ONE FORM AT `removeListener`.**
  const inst = mem();
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the store-facing withdrawal');
  assert.equal(typeof inst.removeListener, 'function', 'and `removeListener(handle)` is the removal');
  let fired = 0;
  assert.equal(inst.listen('standing', [['standing']]), 'standing');
  assert.equal(inst.register('standing', () => { fired += 1; }), undefined);
  const stranger = mem();
  assert.equal(stranger.listen('foreign-handle', [['f']]), 'foreign-handle');
  // **A `Proxy` IS DRIVEN WITH ITS TRAP COUNTED, so the class test is PROVED not to invoke one**
  // (`identity-and-domain.md §2` item 1: *"THE TEST IS A `typeof` READ AND A LENGTH READ AND NOTHING MORE — no
  // object inspection, no `Proxy` trap invocation, no property read"*; row `7`).
  let traps = 0;
  const proxied = new Proxy({}, {
    get() { traps += 1; return undefined; },
    has() { traps += 1; return false; },
    getPrototypeOf() { traps += 1; return null; },
    ownKeys() { traps += 1; return []; },
  });

  const outside = [
    { what: 'row `1` \u2014 a BLANK string', value: '', why: 'a string' },
    { what: 'row `2` \u2014 a non-string primitive', value: 42, why: 'the number' },
    { what: 'row `3` \u2014 `null`', value: null, why: 'null' },
    { what: 'row `4` \u2014 `undefined`', value: undefined, why: 'undefined' },
    { what: 'row `5` \u2014 a plain object', value: {}, why: 'a plain object' },
    { what: 'row `5` \u2014 an array', value: [], why: 'an array' },
    { what: 'row `5` \u2014 a function', value: () => {}, why: 'a function' },
    { what: 'row `6` \u2014 a `Symbol`', value: Symbol('s'), why: 'a symbol' },
    { what: 'row `7` \u2014 a `Proxy`', value: proxied, why: 'a plain object' },
    { what: 'row `8` \u2014 a FOREIGN instance\'s well-formed string', value: 'foreign-handle', why: 'a string' },
    { what: 'row `9` \u2014 a PRIOR SESSION\'s string', value: 'listener-1', why: 'a string' },
    { what: 'row `10` \u2014 a well-formed string the store never held', value: 'l1', why: 'a string' },
  ];

  // **HALF ONE — `unlisten`'s NO-OP SUCCESS.** `§2.3` item 4 / `PAR-JS-8`: EVERY outside value answers
  // `undefined`, removes NOTHING, and NO OTHER REGISTRATION IS REMOVED (`identity-and-domain.md §6` `O-3`).
  for (const one of outside) {
    assert.equal(
      inst.unlisten(one.value),
      undefined,
      `${one.what} at \`unlisten\` is §2.3 item 4's NO-OP SUCCESS — \`undefined\`, with nothing removed`,
    );
  }
  assert.equal(inst.unlisten(), undefined, 'and an ABSENT handle at `unlisten` is the same no-op success');

  // **HALF TWO — `removeListener`'s THROWN FAILURE, THE DECLARED REVERSAL (`P-5`'s `(R2)`; `contract.md §2.7`
  // item 5).** Each class answers `AddressMalformed` in the ONE form (`surface.md §2.5` item 4/5), so the
  // reversal is asserted as a reversal on ONE value class at ONE moment.
  for (const one of outside) {
    assert.throws(
      () => inst.removeListener(one.value),
      (err) =>
        !(err instanceof TypeError)
        && err.status === 'AddressMalformed'
        && Array.isArray(err.log) && err.log.length === 0
        && String(err.message).includes('first argument'),
      `${one.what} at \`removeListener\` is a THROWN FAILURE — the DECLARED REVERSAL of \`unlisten\`'s no-op `
      + 'success on the SAME value (`P-5`\'s `(R2)`; `contract.md §2.7` item 5)',
    );
  }
  // ...and the ABSENT argument is its own arm of the same set, and it throws there too.
  assert.throws(
    () => inst.removeListener(),
    (err) => err.status === 'AddressMalformed',
    'an ABSENT handle at `removeListener` is the same thrown failure (`§2` item 3 row `4`)',
  );

  // **AND THE CLASS TEST INVOKES NO TRAP**, asserted AFTER both loops so neither a get nor a prototype read
  // could have been performed by either member (`identity-and-domain.md §2` item 1; row `7`).
  assert.equal(traps, 0, 'row `7`: the class test reads `typeof` and a length and invokes NO trap, at either member');

  // **AND NEITHER MEMBER REMOVED ANYTHING IT DID NOT NAME** — the atomicity half, driven as an absence
  // (`contract.md §2.7` item 5: *"A REFUSAL CHANGES NOTHING: all four structures stand as they stood"*;
  // `removal-members.md §5` obligation (iii)).
  const standingNow = triggerSet(inst, ['standing'], 'mem', 1);
  assert.equal(standingNow.length, 1, 'the standing store-side entry was not withdrawn by any outside value');
  assert.equal(standingNow[0].handle, 'standing', 'and it is the same identity');
  assert.equal(fired, 1, 'and its function still fires');
  // ...and the foreign instance's own entry is untouched, so a boundary that withdrew store-side before the
  // class test is caught here.
  assert.equal(stranger.register('foreign-handle', () => {}), undefined, 'the foreign entry is still re-armable');
  assert.equal(triggerSet(stranger, ['f'], 'mem', 1).length, 1, 'and it still stands');
});

// **⟶ RETIRED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail), AND THE
// RETIREMENT IS RECORDED WITH ITS RULING RATHER THAN PERFORMED SILENTLY.**
//
// **THE CELL: `off_deregisters_the_identity_in_the_duplicate_token_state_so_the_surviving_entry_still_fires_for_its_own_address_while_the_package_invokes_nothing_it_removed`.**
// **IT HAS NO SUBJECT, AT TWO OF ITS OWN PREMISES:**
//   1. **THE MEMBER IT DRIVES — `off` — IS RETIRED BY `A127`** (`docs/specs/storeroom-js/surface.md §2.4` item 9
//      (f)'s `A127` clause, the disposition of `register`, `on` and `off`, item `2`; `§2.9` item 1's `A127`
//      clause). **The same retirement is already recorded for the file's other `off` cells above.**
//   2. **THE STATE IT DRIVES — THE CALLER-SPELLED DUPLICATE TOKEN, `DD-39`'s two construction entries carrying
//      ONE token at two addresses — DOES NOT SURVIVE EITHER.** The ruling, verbatim at `docs/specs/
//      storeroom-held-listener-identity/contract.md §2.1` item 3: *"The CALLER-SPELLED DUPLICATE STATE —
//      `cfg.listeners` "duplicates KEPT" (`docs/specs/storeroom-js/surface.md:161`), the `DD-39` adoption rule
//      and `surface.md:798-812`'s two duplicate cases — DOES NOT SURVIVE IN THAT FORM: a handle names ONE
//      listener, standing at the addresses ONE `listen` gave it"* (`P: docs/pending.md · P-6`'s rule 3). **The boot
//      route now sends `cfg.listeners` through `listen(handle, addresses)` (§2.2` item 8; `listen-verb.md §6`
//      item 1) and ACCUMULATES one handle's N elements into ONE set (`bindings/js/index.mjs:2226-2232`), so a
//      repeated handle is ONE entry at N addresses and never two entries at one address (`contract.md §5`
//      `S-8`).**
//
// **AND WHAT SURVIVES OF THIS CELL IS DRIVEN, NOT DROPPED — IT IS THE `S-8` STATE ITSELF, WHICH IS THE STATE
// THE UNIT PUTS IN THE DUPLICATE'S PLACE:** one handle at N addresses is ONE entry, and `unlisten` over it
// withdraws it as ONE entry while the registry's function STANDS and re-arms (`identity-and-domain.md §3`
// item 2 (i)). **That is the same two-half observable the retired cell drove, at the state the new
// declaration gives it, and it is asserted at every limb: the pair elements carry ONE distinct handle; ONE
// invocation follows; the withdrawal reaches it; and the re-arm restores the store side.**
test('boot_accumulates_one_handle_at_n_addresses_into_one_entry_and_the_withdrawal_reaches_it_whole', () => {
  // **THE STATES, ENUMERATED:** (i) `cfg.listeners` carrying ONE handle at TWO addresses — `contract.md §5`
  // `S-8`'s state; (ii) ONE trigger firing it — ONE distinct handle, so ONE invocation, while `triggered`
  // carries ONE pair per matched BINDING (`trigger-and-pair.md §5` item 4); (iii) `unlisten(handle)`: the
  // store's ONE-entry withdrawal, with the registry's entry STANDING and re-armable; (iv) the re-arm: the
  // store side comes back at the addresses the `listen` act gave the handle (`identity-and-domain.md §3`
  // item 2 (i); `contract.md §3` `S-6`).
  const shared = 'l-c7-boot'; // THE CALLER'S OWN HANDLE — `contract.md §2.1` item 1: it is never minted
  const inst = mem([
    { address: ['a'], handle: shared },
    { address: ['b'], handle: shared },
  ]);
  assert.equal(typeof inst.listen, 'function', '`listen(handle, addresses)` is a member of the instance');
  assert.equal(typeof inst.register, 'function', 'and `register(handle, listener)` places a function at a handle');
  assert.equal(typeof inst.unlisten, 'function', 'and `unlisten(handle)` is the store-facing withdrawal');

  // --- (i) **`S-8`, AT ITS OWN CLAUSE:** *"a boot whose `cfg.listeners` carries two entries for one handle at N
  // addresses — applied through the same `listen` verb, ONE entry, N mirror rows"* (`contract.md §5`). **THE
  // OBSERVABLE: ONE distinct handle stands at BOTH addresses, and ONE registry entry covers it.**
  const atA = triggerSet(inst, ['a'], 'mem', 1);
  const atB = triggerSet(inst, ['b'], 'mem', 2);
  assert.equal(atA.length, 1, 'ONE entry at `a`');
  assert.equal(atB.length, 1, 'ONE entry at `b`');
  assert.equal(atA[0].handle, shared, 'and at `a` it is the caller\'s own handle, adopted verbatim');
  assert.equal(atB[0].handle, shared, 'and at `b` it is the SAME handle — ONE entry at N addresses (§5 `S-8`)');

  // --- (ii) THE PRE-STATE: one trigger fires the ONE handle, with ONE invocation, while the array carries one
  // pair per matched BINDING (`trigger-and-pair.md §5` item 4: the binding address is *"informational data
  // about the trigger set and not a per-invocation fact"*).
  let fired = 0;
  const seen = [];
  assert.equal(inst.register(shared, (address) => { fired += 1; seen.push(address); }), undefined);
  const both = inst.write(['a'], 'mem', 3);
  assert.equal(
    distinctMembers(both.triggered.map((pair) => pair.handle)),
    1,
    'the trigger\'s set carries ONE distinct handle — the caller\'s, standing at both addresses',
  );
  assert.ok(
    both.triggered.every((pair) => pair.handle === shared),
    'and every element\'s `handle` member is that ONE identity (`TF-1`: never a bare handle)',
  );
  assert.equal(fired, 1, 'and the ONE distinct handle invokes the ONE registered function ONCE (`§2.4` rule 3)');
  assert.deepEqual(seen[0], ['a'], 'the invocation\'s ONE argument is the TRIGGERING address (`PAR-JS-12`)');

  // --- (iii) **THE WITHDRAWAL REACHES THE ENTRY WHOLE, AND THE REGISTRY ENTRY STANDS.** The `unlisten` withdraws
  // the store side at the addresses the handle stood at; `register` re-arms it (`identity-and-domain.md §3`
  // item 2 (i): *"the entry EXISTS with `off` set; `register(h, fn)` SUCCEEDS and re-arms it"*).
  assert.equal(inst.unlisten(shared), undefined, '`§2.3` item 4: the withdrawal answers `undefined`');
  fired = 0;
  seen.length = 0;
  // **THE SURVIVOR READING IS NOT TAKEN AS A CLAIM**: `unlisten` drops ONE home entry per call, so at a
  // TWO-address handle a later write at each address reads the store's own answer and the cell asserts the
  // DECLARED correspondence rather than an order (`DD-22`; `write-and-read.md §6.5` item 12).
  const afterOffA = triggerSet(inst, ['a'], 'mem', 4);
  const afterOffB = triggerSet(inst, ['b'], 'mem', 5);
  assert.ok(
    afterOffA.length + afterOffB.length <= 1,
    `the withdrawal drops ONE home entry per call, so at most one address still carries the handle — got ${afterOffA.length} at \`a\` and ${afterOffB.length} at \`b\``,
  );
  // **THE PACKAGE'S HALF, AT THE OBSERVABLE THE UNIT GIVES IT:** where the store still carries the handle, the
  // registry still holds its function — `unlisten` never deregisters (`§2.3` item 4; `contract.md §5.5`'s
  // fourth added entry). **THE ENTRY IS RE-ARMABLE, WHICH IS THE DIRECT PROOF THE REMOVAL DID NOT REACH IT.**
  assert.equal(inst.register(shared, () => { fired += 1; }), undefined,
    '`identity-and-domain.md §3` item 2 (i): the withdrawn entry EXISTS and is re-armable — the removal never reached it');

  // --- (iv) **THE RE-ARM RESTORES THE STORE SIDE AT THE ADDRESSES THE HANDLE STILL STANDS AT — AND AT NONE THE
  // WITHDRAWAL TOOK** (`identity-and-domain.md §4` item 4, the ruling's own words: *"`unlisten` sets `off` only
  // when the identity no longer stands anywhere … The flag is per-handle AND per-standing, **which is what the
  // home mirror already computes**"*; `contract.md §3` `S-6`; `listen-verb.md §4`'s transition `1 → 2`).
  // **THE SURVIVOR SCAN IS THE OBSERVABLE, NOT A COUNT:** the address the `unlisten` did NOT reach still
  // carries the handle and fires; the address it DID reach does NOT come back, because the re-arm resurrects
  // nothing the caller withdrew. **WHICH address survives is the home's own iteration order and is never
  // asserted as a claim** (`DD-22`; `§2.7` item 3) — the two readings below are indexed by the observed
  // survivor and by nothing else.
  const survivorAddress = afterOffA.length === 1 ? 'a' : 'b';
  fired = 0;
  const reArmed = triggerSet(inst, [survivorAddress], 'mem', 6);
  assert.equal(reArmed.length, 1, 'the SURVIVING address carries the handle after the re-arm');
  assert.equal(reArmed[0].handle, shared, '...under the caller\'s own handle, never a fresh one');
  assert.equal(fired, 1, '...and its function fires');
  // ...and the address the withdrawal DID reach is not resurrected by the re-arm.
  const withdrawnAddress = survivorAddress === 'a' ? 'b' : 'a';
  assert.equal(
    triggerSet(inst, [withdrawnAddress], 'mem', 6).length,
    0,
    '`identity-and-domain.md §4` item 4: the re-arm RESURRECTS NONE the caller withdrew',
  );

  // --- (v) **AND THE ONE ACT THAT DOES REMOVE IT IS `removeListener`, AND IT REMOVES THE ENTRY WHOLE** — so
  // `register` is REFUSED afterwards (`identity-and-domain.md §3` item 2 (ii); `contract.md §2.7` item 2).
  // **THIS IS THE SEPARATION THE RETIRED CELL'S TWO HALVES WERE REACHING FOR, ASSERTED AT THE TWO MEMBERS THE
  // UNIT DECLARES.**
  assert.equal(inst.removeListener(shared), undefined, 'the removal answers `undefined`');
  assert.throws(
    () => inst.register(shared, () => {}),
    (err) => err.status === 'AddressMalformed',
    'a DELETED entry is not a RESERVED one: `register` is REFUSED (`identity-and-domain.md §3` item 2 (ii))',
  );
  assert.equal(triggerSet(inst, ['a'], 'mem', 7).length, 0, 'and the store side is gone with it at `a`');
  assert.equal(triggerSet(inst, ['b'], 'mem', 8).length, 0, '...and at `b` — the removal is the PURGE and reaches the handle whole');
});
