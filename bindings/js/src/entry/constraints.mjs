// `D-2` (`docs/L1/entry-subdivision.md` §1 part `8`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { appendOwn, fail, refusalLog } from './refusal.mjs';
import { withAddon, require_ } from './artefact.mjs';
import { classSpelling, isAdmittedArray, isPlainObjectValue } from './class-decision.mjs';
import { constraintAddress } from './frame.mjs';
import { homeAddressKey, isStoreReceiver, openCommits } from './state.mjs';
// **THE KERNEL'S OWN RECORD, FOR ONE FIELD AND ONE ONLY** (`D-46`/`D-30`): `kernelFor(store)` answers the
// instance's kernel record — the same accessor every kernel act takes the instance through — and
// `reversalAtRest` below reads that record's own `live` map for the count of OPEN ATTEMPTS. `kernel-foundations`
// carries NO import of its own (`kernel-surface.md §1` item 1's empty-footprint clause), so this reach adds no
// load path, no addon call and no store act; it is a FIELD READ of state the instance already owns, taken the
// way the kernel's four part modules take it.
import { kernelFor } from './kernel-foundations.mjs';
// **⟶ AND THE CARRIERS, ADDED 2026-10-26 FOR THE REFUSAL'S OWN UNDOING (`DEF-W`'s `(a)`).** The
// compensating act below reaches the store's own verb at its entry, with the SAME carrier forms every member
// hands it (`carrier.mjs` is the boundary's one encoder for the three positions and imports nothing of this
// file, so this reach adds no cycle and no second conversion rule).

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE POST-CREATION CONSTRAINT SET — `surface.md §2.12` items 1–5, `A126` (2026-10-16), AND ITS TWO ROUTES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **TWO ROUTES POPULATE THE SET AND NEITHER SUBSTITUTES FOR THE OTHER**: the BATCH, which `storeCreate`
// registers at `K-1` as it constructs (clause (b) above), and the ADD route's own argument. **THE ENTRY
// CARRIES A PAIR IF AND ONLY IF A FUNCTION STANDS REGISTERED AT THAT PAIR IN THE KERNEL'S OWN PAIR-KEYED
// REGISTRY** — so `state.constraints` is that registry's record and the ONE act both routes reach is
// `carryConstraint` below. **NOTHING OF `docs/specs/storeroom-js/contract.md §2.6` SURVIVES THE MOVEOUT**: the engine is behind this surface,
// the constraint and repair limbs are the kernel's, and this file owns only the form of what crosses.

/// `parameter-semantics.md §2.17`'s dated clause, at this section's own sites: the two positions' own
/// spelling, **read at the method's own arity — `pair` at `1` of `2` and `constraint` at `2` of `2`**, since
/// the LEADING `instance` POSITION IS DROPPED by `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause (the receiver is not a
/// position of any declared signature; `docs/specs/storeroom-js/surface.md §2.12` item 3's one-spelling rule).
export const ARGUMENT_POSITION_FIRST = 'first argument';
const ARGUMENT_POSITION_SECOND = 'second argument';

/// **⟶ DELETED 2026-10-24 (`D-22`, verbatim: *"Discard the noop prefix"*) — `KERNEL_HANDLE_PREFIX` HAS NO
/// SUBJECT, AND ITS ONE CONSUMPTION SITE IS DELETED WITH IT.**
///
/// **THE BYTES THAT STOOD HERE, PRESERVED AS THE READING THEY CARRIED** (they declared the prefix the kernel's
/// own `noopListener` entry is registered under, `constraint@<JSON address>`, declared once at its one consumer
/// because *"a predicate is not an item"* and `isKernelHandle` was off the kernel's surface): **they stand as
/// text read THROUGH this clause** (`DEF-2026-10-02`: no whole-file rewrite).
///
/// **WHY THEY NO LONGER BIND.** Under `D-23`/`D-24` **the caller's own `id` IS the handle**, so **the kernel
/// neither mints a spelling nor derives one from the address — there is no kernel-authored identity left to
/// reserve, and the prefix has nothing left to name.** Under `D-22` the entry's blanket exemption of
/// kernel-prefixed handles (§2.5 item 3, `registerOn`) is deleted with it, **so no name crosses the module
/// boundary and no reserved namespace exists for an application caller to walk into.** **THE KERNEL'S OWN
/// `KERNEL_HANDLE_PREFIX` IS DELETED AT THE SAME PASS** (`bindings/js/src/constraint-kernel.mjs`): both copies
/// of the spelling go, and with them `noopHandleFor` and `noopListener`.

/// **THE KERNEL, RESOLVED ON THE FIRST CONSTRAINT ACT AND NEVER AT LOAD** (`kernel-surface.md §1` item 1;
/// `A121`, `A122`). **IT IS NOT AN EXPORT AND NOT A SUBPATH**: the module is reached as a FILE, at the path
/// the allowlist publishes it at. **AND THE RESOLUTION IS LAZY ON PURPOSE**: the entry must still LOAD where
/// nothing is staged beside it — the publish and negative drives assemble trees carrying `index.mjs` alone
/// — and a load-time import of `./src/` would make every one of those trees unable to reach the artefact
/// they were built to drive. A drive that never carries and never asks for a constraint reaches no byte of
/// the kernel.
let KERNEL = null;
export function constraintsKernel() {
  if (KERNEL === null) KERNEL = require_('./src/constraint-kernel.mjs');
  return KERNEL;
}

/// `fail-surface.md §2` / `kernel-surface.md §2.2`'s `KC-1`…`KC-8`, read HERE for their ONE use: to tell a
/// refusal the KERNEL raised from one a STORE VERB raised, so that `A120` (2) can be applied to the first
/// and not to the second. **NO `KC` SPELLING CROSSES THIS SURFACE** (`docs/specs/storeroom-js/surface.md §2.12` item 1's read-through clause:
/// printed here it would be a second, unowned home for the kernel's own vocabulary).
const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];

/// **⟶ THE PAIR'S OWN KEY IS `(id, address-set)` — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).**
/// **ONE PAIR OVER N ADDRESSES IS ONE PAIR: ONE `id`, N ADDRESSES, ONE row of `constraints()`** (`P:
/// docs/pending.md · P-7`'s answer clause, verbatim: *"1. (one id, N addresses)"*; `contract.md §2.6` item 4)
/// — **and the pair's key is the pair**, because the constraint methods' own domain is `(address, id)` and
/// **two pairs at two addresses are TWO pairs** (`constraint-identity.md §5` `IF-2`: *"two `addConstraint`
/// calls at two DIFFERENT pairs → TWO identities, not equal"*).
///
/// **THE ADDRESS HALF IS THE SET'S CANONICAL, ORDER-INSENSITIVE SPELLING** (`contract.md §2.6` item 6's
/// `HL-DD-3`; `AB-6`: *"A canonical order-insensitive set spelling is declared once"*), so two calls spelling
/// the same set in different member orders name ONE pair (`IF-8`) and two different sets name two.
export function constraintPairKey(addresses, id) {
  // **⟶ AMENDED 2026-10-24 (`D-29`, verbatim: *"Handle becomes the internal ID"*): THE KEY IS THE `id` ALONE.**
  // The bytes this return replaced were ``return `${addressSetKey(addresses)}\u0000${id}`;`` — the
  // `(id, address-set)` keying — and **`D-29` item 2 supersedes exactly them**: *"the `(id, address-set)`
  // keying (`index.mjs:5237`, `contract.md §2.6` item 4's 'one id, N addresses') is now simply 'one id, ONE
  // PAIR'"*. **So a repeated `id` is one row, `constraints()` answers one row per `id`, and a second
  // `addConstraint` at a new address for a held `id` is the HELD-PAIR ARM — an extension plus an overwrite —
  // rather than a second pair.** **THE ADDRESS HALF IS STILL READ, AND IT IS STILL THE DECLARED SPELLING**: the
  // parameter stands because every caller hands it, and `addressSetKey` keeps its own callers (the pair's
  // declared set spelling) — it is simply no longer part of the KEY.
  return id;
}

/// **THE SET'S CANONICAL, ORDER-INSENSITIVE SPELLING** (`contract.md §2.6` item 6's `HL-DD-3`; `AB-6`: *"A
/// canonical order-insensitive set spelling is declared once, used by `carriesConstraintAt` and by the
/// kernel's pair rows, so the set-valued address has one key form and not two."*). **TWO ADDRESS SETS ARE
/// EQUAL EXACTLY WHEN THEY CONTAIN THE SAME ADDRESSES — SET EQUALITY, NOT SEQUENCE EQUALITY** — and the
/// canonical key is the SORTED, INJECTIVELY-SPELLED member list. **The injective spelling is the one the
/// address domain already admits**: each segment length-prefixed, with `string` and `number` distinguished —
/// the same distinction `addressToken`'s `k:`/`i:` prefixes carried, preserved HERE as a spelling rule and
/// **not** as a map key (`P: docs/pending.md · M-3` item (iv)).
export function addressSetKey(addresses) {
  const spells = [];
  for (const address of addresses) {
    appendOwn(spells, homeAddressKey(address));
  }
  spells.sort();
  return spells.join('\u0001');
}

/// **⟶ ADDED 2026-10-24 — THE PAIR'S EXTENDED ADDRESS SET: `oldSet ∪ newSet`, MEMBERSHIP DECIDED BY THE
/// INJECTIVE SPELLING AND BY NOTHING ELSE** (`docs/L1/surface-deltas.md` `Q-2`'s repair `(i)`, which `D-29`'s
/// pair-key ruling lands: *"it makes a second `addConstraint` at a new address an **extension plus an
/// overwrite**"*; `docs/specs/storeroom-held-listener-identity/contract.md §2.6` item 4, *"one pair, N registry
/// rows, removal clears all N"*).
///
/// **THIS FUNCTION IS THE *EXTENSION* HALF AND IT EXISTS BECAUSE THE STORE'S OWN SET POSITION IS AN ASSIGNMENT
/// AND NOT A UNION** (`docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 3: `listen(h, S2)`
/// after `listen(h, S1)` *"destroys `S1` wholly and installs `S2`"*). **So the kernel cannot get an extension by
/// passing only the new set — what reaches `store.listen(id, ·)` must be the UNION, and the store's assignment
/// then installs exactly that.** The *overwrite* half is unmoved: the pair's FUNCTION is replaced at its own site
/// in `addConstraint` and is never a member here (`D-24`).
///
/// **THE ORDER IS THE OLD SET'S, THEN THE MEMBERS OF THE NEW ONE IT DOES NOT ALREADY CARRY**, so a repeated
/// spelling answers the set that stood (an extension by nothing is no extension) and two new addresses answer
/// both. **MEMBERSHIP IS `homeAddressKey`'S INJECTIVE SPELLING** — the key `addressSetKey` and the mirror already
/// decide set equality with, so `['a', 1]` and `['a', '1']` are two addresses here exactly as they are there
/// (`contract.md §2.6` item 6's `HL-DD-3`; `AB-6`). **NO MEMBER OF A MUTABLE PROTOTYPE IS TAKEN**: the loop is by
/// index, the list is built by an own-property append (`appendOwn`) and nothing is `map`ped, `pushed`, spread or iterated
/// (`contract.md §2.1` `F8-2`; the same shape `encodeConstraints`' walk and `carryConstraint`'s own loop take).
export function unionAddressSets(standing, supplied) {
  const merged = [];
  const keys = [];
  for (let pass = 0; pass < 2; pass += 1) {
    const source = pass === 0 ? standing : supplied;
    for (let i = 0; i < source.length; i += 1) {
      const address = source[i];
      const key = homeAddressKey(address);
      let carried = false;
      for (let k = 0; k < keys.length; k += 1) {
        if (keys[k] === key) carried = true;
      }
      if (carried === false) {
        appendOwn(merged, address);
        appendOwn(keys, key);
      }
    }
  }
  return merged;
}

/// **THE ONE REFUSAL `docs/specs/storeroom-js/surface.md §2.12` ITEM 4 DECLARES, TAKEN BEFORE ANY ACT AND LEAVING NOTHING CHANGED** — a JS
/// `TypeError`, its `status` member ABSENT, no `message` member of this unit's own, **the store's closed
/// set neither minted nor widened, and the store reached by no call this refusal makes.** **⟶ AND THE SET'S
/// FIGURE IS `19` FROM 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set
/// for both S/N"*): the `16` this clause printed is the figure of its own date, and THIS REFUSAL STILL MINTS
/// NOTHING — a `TypeError` carries no `status` at all.**
///
/// **⟶ AND THE `TypeError` CARRIES `log: []` FROM 2026-10-16, AND THIS IS THE ONE PLACE THE FLAT RULING AND
/// `A127`'S TWO REFUSAL RULES MEET — SO THE RECONCILIATION IS STATED RATHER THAN LEFT TO THE READER**
/// (`surface.md §2.5` item 4, which names *"the three constraint methods' `TypeError`"* among the arms that
/// *"all carry `log: []`"*; `docs/specs/storeroom-js/surface.md §2.12` item 4's replacement clause and `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s rule (ii), which fix
/// the class, the absent `status` and the change-nothing atomicity).
///
/// **THE TWO RULES ARE NOT IN TENSION AND NEITHER MOVES:** rule (ii) declares the refusal is **a `TypeError`
/// CARRYING NO `status` MEMBER** — and it still carries none: the member below is written on the *error
/// object* and is `log`, not `status`, and **`'status' in err` is still `false` on every call of this
/// method.** The ruling does not re-class the refusal as a store refusal, does not mint a `status`, does not
/// reach the store and does not change the call's effects — *"no store call is made, no pair is added,
/// enabled or disabled, no journal entry is appended and no code is minted"* stands whole. **THE ONE THING
/// THE RULING ADDS IS A MEMBER, AND A `TypeError` IS AN ORDINARY OBJECT: an own enumerable data member can
/// be set on it without making it any less an instance of `TypeError` and of nothing else** — which is the
/// single question that had to be answered before this could be written, and it is answered by the class,
/// not by a judgement here (`Object.keys(new TypeError('x'))` is `[]` and the object is EXTENSIBLE).
///
/// **SO THE DECLARED FORM DOES CARRY A THIRD MEMBER, AND THIS IS *NOT* A SPEC CONFLICT: the collision the
/// task warned of would be a form that had to become *"a different form"* to hold `log`, and it does not —
/// the class (`TypeError`, and of nothing else), the ABSENT `status`, the change-nothing atomicity, the
/// caller's own `message` text and the one-`TypeError`-for-both-refusals rule all cross this frame
/// untouched. What changes is `Object.keys` on the thrown error, from `[]` to `["log"]`.**
///
/// **THE MEMBER IS SET WITH `Object.defineProperty` RATHER THAN BY ASSIGNMENT, AND THE REASON IS THE ONE
/// `§2.5` ITEM 9 DECLARES: THE DESCRIPTOR MUST BE ORDINARY — own, enumerable, a data member, writable and
/// configurable.** A plain `err.log = []` on an error object achieves exactly that descriptor on V8 and every
/// engine this package supports, **but it is written with `defineProperty` HERE because an error's own
/// members are not universally ordinary across realms and a runtime that made `Error.prototype.log` an
/// accessor would silently divert the write**, and the declaration is cheap where the alternative is a
/// silent miss on a member the census reads. **THE PROHIBITION IN `§2.5` ITEM 9 (*"written with an object
/// literal, not `Object.defineProperty`"*) BINDS THE STORE'S PLAIN-OBJECT FORM AND ITS `log`, WHICH THIS
/// PACKAGE WRITES WITH AN OBJECT LITERAL IN `fail` ABOVE AND IN `constraintCrossing` BELOW; it cannot bind a
/// `TypeError`, because a `TypeError` has no object literal and its class is what rule (ii) declares. The
/// ITEM'S PURPOSE — that a canonical census sees the member — is the property both routes preserve, and the
/// descriptor is asserted explicitly below so the purpose is met member for member.**
export function constraintRefuse(where, value) {
  const error = new TypeError(
    `the ${where} of this call is ${classSpelling(value)}, and it is not a value this position's domain `
    + 'admits',
  );
  throw withEmptyLog(error);
}

/// **THE ONE PLACE `log: []` IS SET ON A REFUSAL THAT IS NOT AN OBJECT LITERAL** — the three constraint
/// methods' `TypeError` and nothing else. **`surface.md §2.5` item 4 calls for the EMPTY ARRAY on exactly
/// these arms** — *"the EMPTY ARRAY, never an absent member, never `null`, and never a placeholder entry"* —
/// and item 9 calls for an **own enumerable data member**, which is the descriptor written here BY HAND so
/// that no default, no engine and no realm decides it. **THE ERROR'S PROTOYPE IS NOT TOUCHED**, so
/// `err instanceof TypeError` stays `true` and `Object.getPrototypeOf(err)` stays `TypeError.prototype`:
/// the member is the error's own and the class is the error's own.
///
/// **THE ARRAY IS A FRESH `[]` AT EACH THROW**, so two refusals never alias one list — a shared frozen
/// constant would be a value a caller could observe as the *same* array across calls, and `docs/specs/storeroom-js/surface.md §2.5` item 4
/// declares a VALUE (`[]`), not a shared identity.
export function withEmptyLog(error) {
  Object.defineProperty(error, 'log', {
    value: [],
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return error;
}

/// **THE ONE MESSAGE THE RECEIVER ARM CARRIES, SPELLED HERE ONCE** — the addon's `not_a_receiver`
/// (`bindings/js/src/facade.rs`), whose bytes the seven store-reaching verbs' detached calls already answer
/// with, and which the four constraint members now answer with BYTE FOR BYTE.
///
/// **IT IS A SECOND SPELLING OF A SENTENCE THE RUST HALF ALREADY CARRIES, AND THE REASON IS NAMED RATHER
/// THAN LEFT TO THE READER:** the seven verbs get this refusal for free — they hand the call's own `this` to
/// their own entry and the facade answers `not_a_receiver` before any store act — while **the four
/// constraint members reach NO addon entry at all** (the artefact's export set is the nine verbs and no
/// constraint verb exists, `export-set-and-dispatch.md §1`), so there is no entry to hand a receiver to. **A
/// call on a bad receiver cannot be answered by the facade without reaching a store verb the member does not
/// own**, and no store act may be reached on a refused call, so the form is built on this side by the one
/// function every other refusal on this surface is built by (`fail`).
const RECEIVER_POSITION_MESSAGE = 'the receiver position is not the store object this addon\'s storeCreate returned';

/// **⟶ ADDED 2026-10-26 ON THE ARCHITECT'S RULING (*"Run the fix by rejecting the detached functions."*): THE
/// RECEIVER GUARD THE SEVEN STORE-REACHING VERBS ALREADY TAKE, TAKEN BY THE FOUR CONSTRAINT MEMBERS — FIRST,
/// BEFORE ANY READ OR EDIT.**
///
/// **THE DEFECT IT CLOSES, MEASURED BEFORE IT EXISTED** (`docs/guides/package-use.md §12.2`): **one
/// lawful-but-detached call was answered THREE DIFFERENT WAYS ACROSS THIS PACKAGE'S OWN SURFACE.** The seven
/// store-reaching verbs answered the one receiver refusal; **detached `addConstraint` ANSWERED and edited
/// this instance's real pair registry** — which `constraints()` then read — **detached `removeConstraint`
/// deleted a standing pair**; and **the detached toggles threw the constraint methods' `TypeError`** — an
/// `Error`, `status` absent, which is neither the surface's one form nor a store code. **So the arm that was
/// missing was not a style question: a call with no receiver moved STATE.**
///
/// **WHICH FORM, AND WHY IT IS THE SEVEN'S AND NOT A CONSTRAINT CLAUSE'S.** No constraint clause names a
/// receiver arm to take: `docs/specs/storeroom-constraints/contract.md` carries no receiver clause at all
/// (its failure channel is the `KC` channel, `§5.3`, whose subject is a PASS's refusal and never a call's
/// shape), `docs/specs/storeroom-js/surface.md §2.6` is MOVED OUT with a one-line pointer, and `§2.7` is
/// listener delivery. **SO THE SEVEN'S FORM GOVERNS ITSELF**: `status` the store's `AddressMalformed`, the
/// one message above, and `log: []` — the third member `§2.5` item 4 declares on every arm whose cause has no
/// attempt at all.
///
/// **THE INSTANT IS THE WHOLE OF THE ATOMICITY**: this test is taken as the member's FIRST act, **before its
/// position tests, before `openCommit`, before any read of `state.constraints` and before any `K-1`/`K-6`**, so
/// a refused call cannot carry, overwrite, toggle, purge or delete anything and `constraints()` reads exactly
/// what it read before. **THE TEST ITSELF TOUCHES NO STORE**: `isStoreReceiver` is an identity read against
/// this package's own `INSTANCES` row and the published `state.receiver` (`receiver-and-refusal.md §3`'s one
/// arm), and it mints no token, appends no journal entry and reaches no kernel.
///
/// **AND THE ONE READING IT DOES NOT TAKE IS DECLARED WITH IT** (`D-35`/`D-36` stand): a REBOUND member —
/// `store.addConstraint = fn` — is the client's own function and is not detected here or anywhere else; this
/// guard refuses a call whose receiver names no live store, and the object model is not hardened by it.
export function constraintDetached(receiver) {
  if (isStoreReceiver(receiver)) return;
  fail({ status: 'AddressMalformed', message: RECEIVER_POSITION_MESSAGE });
}

/// **A POSITION BELOW THE DECLARED ONE — `docs/specs/storeroom-js/surface.md §2.12` item 4 AND `§2.4` item 9 (f)'s RULE (ii): a SHORT ARITY
/// TAKES THE SAME ONE `TypeError` AND CHANGES NOTHING.** *"No assertion is made over `message`, and its
/// absence is the declared reading"* — the member is not one of the three this form is observed by.
/// **AND IT IS THE SAME ONE `TypeError` IN THE RULING'S OWN SENSE TOO: the SHORT-ARITY refusal and the
/// OUTSIDE-VALUE refusal are ONE form, so `log: []` is set by the same `withEmptyLog` and neither refusal
/// gains a `status`** (`surface.md §2.5` item 4's *"the three constraint methods' `TypeError`"*).
function constraintArity(verb) {
  throw withEmptyLog(new TypeError(`\`${verb}\` declares two positions, and this call supplied fewer`));
}

/// **`docs/specs/storeroom-js/surface.md §2.12` ITEM 4'S TWO CALLER POSITIONS, CLASS FIRST AND IN THEIR DECLARED ORDER** (`PAR-JS-22`–`PAR-JS-24`)
/// — **the receiver, which was item 4's first position, is DROPPED and is judged by the CALL and no longer by
/// a walk** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause): a member reached through the product IS a product of this
/// factory, so no instance-domain arm stands here. **NOTHING BELOW RUNS UNLESS BOTH POSITIONS HAVE PASSED**
/// (`A81`), so a refused call performs no store call, no registry write and no `K-1` — atomicity by the
/// validation's POSITION.
export function constraintSite(state, verb, supplied, pair, constraint) {
  if (supplied < 2) constraintArity(verb);
  if (!isPlainObjectValue(pair)
    || !Object.hasOwn(pair, 'address')
    || pair.address === undefined) {
    constraintRefuse(`pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\``, pair);
  }
  // **⟶ THE `address` MEMBER'S TYPE: *"at the REGISTRATION act, a single address"*** (`constraint-identity.md
  // §6`'s pair table, verbatim: *"`address`: THE ADDRESS SET the pair was created with — and, at the
  // REGISTRATION act, a single address"*; `contract.md §2.6` item 5; `PAR-HL-8`).
  //
  // **SO THIS POSITION TAKES THE SEGMENT LIST THE CONSTRAINT METHODS HAVE ALWAYS TAKEN** (`§1.5`'s segment
  // array, `constraintAddress`'s own reader), **and the pair the entry CARRIES is its ONE-member SET** — one
  // `id`, N addresses, where N is `1` at every creation this directory reaches (`P: docs/pending.md · P-7`'s
  // answer clause: *"1. (one id, N addresses)"*). **THE SET-VALUED FORM IS THE READ'S AND THE REMOVAL'S**
  // (`PAR-HL-13`; `PAR-HL-16`), and it is satisfied by the one-member set a registration produces.
  // **THE DISCRIMINATOR IS THE MEMBER'S CLASS, READ ONCE (the same rule `listen`'s set position takes)**:
  // an array whose FIRST member is an array is a SET; an array whose members are segments is ONE ADDRESS.
  // **BOTH SPELLINGS ARE DECLARED** — the registration act's single address (`constraint-identity.md §6`'s
  // pair table) and the set the pair is created with when the caller spells N of them (`P: docs/pending.md ·
  // P-7`'s set ruling; `PAR-HL-8`).
  const addresses = [];
  if (isAdmittedArray(pair.address) && pair.address.length > 0 && Array.isArray(pair.address[0])) {
    for (let i = 0; i < pair.address.length; i += 1) {
      const each = isAdmittedArray(pair.address) && Array.isArray(pair.address[i])
        ? constraintAddress(pair.address[i])
        : null;
      if (each === null || typeof each === 'string') {
        constraintRefuse(`pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\``, pair);
      }
      appendOwn(addresses, each.s);
    }
  } else {
    const encoded = constraintAddress(pair.address);
    if (typeof encoded === 'string') {
      constraintRefuse(`pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\``, pair);
    }
    appendOwn(addresses, encoded.s);
  }
  if (!Object.hasOwn(pair, 'id')
    || pair.id === undefined
    || typeof pair.id !== 'string'
    || pair.id === '') {
    constraintRefuse(`pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\``, pair);
  }
  if (typeof constraint !== 'function') {
    constraintRefuse(`constraint at the ${ARGUMENT_POSITION_SECOND} of \`${verb}\``, constraint);
  }
  return { state, addresses, id: pair.id };
}

/// **⟶ ADDED 2026-10-26 — THE PAIR'S REGISTRATION SEQUENCE, THE ONE KEY `constraints()` EMITS BY
/// (`strata/decisions.md` · `D-39`, 2026-10-26, verbatim: *"add deterministic ordering"*, and the same row's
/// operative sentence: *"`constraints()` must emit in a DECLARED, deterministic order — registration
/// sequence, which is the order the pairs were registered and the one a consumer can reason about … the
/// order becomes part of what the method promises"*).**
///
/// **THE COLLECTION AND THE INSTABILITY, MEASURED.** `enumerateConstraints` rebuilds its answer from
/// `state.constraints`, a `Map` keyed by the pair's `id`; **`Map` iteration is INSERTION order, and an
/// insertion order is not a registration order once a row is deleted and put back** (`Map.prototype.set`
/// on a standing key keeps its place — `set` on a key the map no longer holds appends). **AND ONE DECLARED
/// ACT DOES EXACTLY THAT**: `constraintOff` calls the kernel's `remove`, whose `FORGET_PAIR` channel deletes
/// the pair's read-model row (`index.mjs`'s `[FORGET_PAIR]`; `docs/specs/storeroom-held-listener-identity/
/// contract.md §2.7` item 8), and the disable arm then writes THE SAME ENTRY RECORD back — so a toggled
/// pair moved to the END of the enumeration while its membership was unmoved. **Measured before this
/// change: `b#c-b, a#c-a, c#c-c, a#c-r` became `a#c-a, c#c-c, a#c-r, b#c-b` after one
/// `constraintOff`/`constraintOn` pair, and no `constraints()` call in between saw a different set.**
///
/// **THE KEY IS MINTED ONCE, WHEN THE PAIR IS FIRST REGISTERED, AND IT NEVER MOVES AFTERWARDS.** Each entry
/// record carries `registrationSeq`, written by `carryConstraint` at the one act that makes a pair a pair;
/// **every later write to the same record — the overwrite arm's extension, the toggle, `restoreHeldPair`'s
/// wake — writes OTHER members and leaves this one exactly as it stood**, so a pair that did not move
/// re-registers nowhere. **IT IS A MONOTONE ORDINAL, NOT AN INDEX INTO THE LIVE MAP** (`max + 1`, so a
/// removal followed by a fresh registration still lands after every standing pair), **and it is NOT an
/// address sort and NOT an id sort** — both of which `D-39` does not say and a consumer cannot predict.
/// **NO MEMBER CROSSES**: the ordinal is the entry record's own, `PAR-JS-25`'s opaque identity is untouched,
/// and `enumerateConstraints` still answers exactly `{ address, id }` per row.
export function registrationSequence(state) {
  let highest = 0;
  for (const entry of state.constraints.values()) {
    if (entry.registrationSeq > highest) highest = entry.registrationSeq;
  }
  return highest + 1;
}

/// **THE ONE ACT THAT MAKES A PAIR A PAIR THE ENTRY CARRIES** (`docs/specs/storeroom-js/surface.md §2.12` item 1's preamble clause (a)–(b)):
/// `K-1` AT THE INSTANCE — the key at its own positions and the caller's function at the fourth, which is
/// the SAME call `storeCreate`'s batch registration makes — and THE ENTRY'S OWN RECORD BESIDE IT, whose
/// `enabled` member is the pair's state and whose `identity` is THE PAIR'S OWN OPAQUE VALUE (`PAR-JS-25`).
/// **THE IDENTITY IS MINTED ONCE PER PAIR AND IT CARRIES NO READABLE MEMBER**: a second ADD at the same pair
/// overwrites the element and answers THIS SAME VALUE, and two pairs answer two values. **`PAR-JS-25`'s
/// opacity is the observable** — *"it has no own enumerable member at all"* — so it is a null-prototype
/// object and NOT the entry record: every datum above stays the entry's own and never crosses.
export function carryConstraint(state, instance, addresses, id, constraint) {
  // **⟶ AND THE REGISTRATION IS NOW A THREE-STATE ACT, WHOSE THIRD STATE LANDS AN EDIT** (`docs/specs/storeroom-js/surface.md §2.12` item 3's
  // 2026-10-16 clause, read through its `A135` (3) mark; `docs/specs/storeroom-native/contract.md §7.3` (b)
  // states 1–3 and `3-bis`). `K-1` evaluates the constraint at registration: on states 1 and 3-success it
  // RETURNS the handle and no log crosses; on states 2 and 3-failure it THROWS a refusal this entry renders
  // and re-throws in the surface's own single form (`registrationCrossing` below). **THE ENTRY'S OWN
  // RECORD IS WRITTEN ONLY WHERE THE REGISTRATION STOOD**, so a refused registration leaves this state
  // exactly as it stood (`docs/specs/storeroom-js/surface.md §2.12` item 3: *"NO identity is returned and NO element is carried"*).
  // **⟶ AND THE REGISTRATION IS ONE CALL PER ADDRESS OF THE PAIR'S SET, UNDER ONE IDENTITY**
  // (`contract.md §2.6` item 4; `P: docs/pending.md · P-7`'s answer clause: *"One pair, N registry rows,
  // removal clears all N"*). **THE KERNEL'S OWN REGISTRY KEEPS ITS `(address, id)` KEY SHAPE** — one pair over
  // N addresses IS N `(address, id)` rows sharing one id (`P: docs/pending.md · P-7`'s keying ruling, item (v);
  // `AB-6`) — so N registrations stand behind the ONE element this entry carries.
  // **⟶ `B-6`'S ONE EXEMPTION, DECLARED HERE AT ITS PRODUCER:** while this loop runs, `listen` is being
  // called by the KERNEL for the pair whose `id` is `id`, so the act is a CONSTRAINT's own registration and
  // the cross-kind test has no subject. It is cleared on every arm, so a caller's later `listen` at a
  // constraint's address is tested with no marker standing.
  // **⟶ AND THE PAIR'S N REGISTRATIONS ARE A LOCAL INDEX LOOP, NOT `for … of` — 2026-10-24**
  // (`contract.md §2.1`'s clause of that date on `F8-2`, items `(2a)`–`(2c)`, arm `(xix)`, cell `JC-TC-65`;
  // `F8-8`'s items `(2a)`/`(2e)`, which count a GOVERNED site's take of `Array.prototype[Symbol.iterator]` as
  // one the crossing's own file may not make). **THE BYTES THIS LOOP REPLACED WERE `for (const address of
  // addresses)`, AND THE CENSUS NAMED THEM: *"GOVERNED index.mjs:5773 carryConstraint"*, one take per arming
  // construction under a forged iterator — a caller's override deciding how many registrations the batch
  // performs.** **IT IS THE SAME PRECEDENT `encodeConstraints` ALREADY FOLLOWS** (the fourth key's own walk:
  // *"a LOCAL INDEX LOOP, NOT `Array.prototype.map`"*, arm `(xix)`), and it is the same shape `storeCreate`'s own
  // batch-arming walk takes. **ONE MEMBER PER ITERATION, IN THE SET'S OWN ORDER, AND NOTHING ELSE MOVES**: the
  // three-state act, the one refusal crossing per arm, and the `B-6` marker's bracket are unchanged.
  const outerEstablishing = state.establishing;
  state.establishing = id;
  try {
    for (let position = 0; position < addresses.length; position += 1) {
      try {
        constraintsKernel().register(instance, addresses[position], id, constraint);
      } catch (refusal) {
        registrationCrossing(refusal);
      }
    }
  } finally {
    state.establishing = outerEstablishing;
  }
  // **THE STORE'S PAIR RECORD CARRIES THE IDENTITY, AND `addConstraint` AT A HELD PAIR ANSWERS THE STORE'S
  // IDENTITY FOR THAT PAIR** (`P: docs/pending.md · (AA-2)`, its own obligation; `contract.md §2.6` item 2;
  // `AB-2`: *"`{addresses, id, identity}`"*). **THE IDENTITY IS A STORE-SIDE FACT AND NOT A PACKAGE-MINTED
  // VALUE**: it is the STORE'S identity for the pair, so it is created ONCE per pair row and **reused** on
  // every later write to the same pair — which is exactly how `PAR-JS-25`'s *"equal to itself on a second
  // `addConstraint` at the SAME pair"* survives the carrier's move (`constraint-identity.md §2` item 2;
  // `contract.md §5.6`'s `S-ID-STORE`).
  const entry = {
    addresses,
    addressKey: addressSetKey(addresses),
    id,
    fn: constraint,
    enabled: true,
    identity: Object.create(null),
    // **⟶ THE PAIR'S REGISTRATION SEQUENCE, MINTED HERE AND NOWHERE ELSE** (`D-39`; `registrationSequence`
    // above, which states the rule and the measured instability it closes).
    registrationSeq: registrationSequence(state),
  };
  state.constraints.set(constraintPairKey(addresses, id), entry);
  return entry;
}

/// **THE REGISTRATION REFUSAL'S CROSSING — THE KERNEL HANDS BACK A CODE AND ITS SLOTS, AND THIS ENTRY
/// RENDERS THE TEXT THROUGH THE GENERATOR IT ALREADY HOLDS** (`docs/specs/storeroom-native/contract.md
/// §8.2`'s 2026-10-16 clause, items 1–5; `surface.md §2.12` item 3's clause of the same date).
///
/// **NO MESSAGE IS AUTHORED HERE AND NONE IS AUTHORED IN THE KERNEL.** `DD-52` forbids a code's message
/// from a second source, so the sentence is produced by the store's own generator — reached through
/// `addon_.errorMessage(code, subject[, container])`, the very path `boundaryReject` already takes — from
/// the `§8.2` row's own SLOTS: `<CONTAINER>` the pair's own list name `constraints`, and `<SEGMENT>` the
/// added pair's `address` spelling joined by `/`. **THE FIXED PHRASE IS THE ROW'S AND IS RENDERED VERBATIM**
/// (`§8.2` clause 3), and no per-instant template stands.
///
/// **⟶ AND THE 2026-10-17 FORGERY FIX SURVIVES INTACT, WHICH IS THIS FRAME'S HIGHEST-RISK OBLIGATION.** The
/// classification is **IDENTITY, NOT SHAPE** — the kernel's own mark under the `Symbol.for` key both sides
/// spell (`KERNEL_REFUSAL` above) and nothing a caller can spell — so:
///   * **A KERNEL-BUILT REFUSAL** (its `status` a string, its slot members present) is rendered and
///     re-thrown in the surface's single two-member-plus-`log` form below;
///   * **EVERYTHING ELSE IS THE CALLER'S AND CROSSES AS ITSELF** — a forged two-member object, a forged
///     three-member object, a `TypeError`, a bare string and `undefined` all reach the caller as the very
///     value that was thrown, `caught === thrown`, and none of them reaches the generator.
///
/// **AND A BODY'S OWN THROW IS THAT SECOND ARM AND NOT A THIRD**: `fail-surface.md §1.1` item 5 leaves a
/// throwing constraint or repair body *"untouched and unconverted"*, and it carries no mark, so it is
/// re-thrown by the one line above the render.
export function registrationCrossing(refusal) {
  // **⟶ AND THE MARKED BODY-THROW ARM STANDS FIRST, 2026-10-26 (`DEF-S`; the architect's ruling, verbatim:
  // *"Expand the returned error set for both S/N"*).** **THE CONVERSION IS THE WHOLE POINT AND THE
  // DISCRIMINATOR IS THE MARK:** the kernel sets [`CONSTRAINT_BODY_THREW_ENTRY`] on a value IT caught from a
  // caller's CONSTRAINT body (`kernel-foundations.mjs`'s `markBodyThrow`), and this frame converts ONLY a
  // marked value — into this surface's one failure form, carrying a `status`, a `message` and a `log`.
  // **AN UNMARKED THROW STILL CROSSES AS ITSELF, two lines below, and that is `DEF-A`'s protection standing
  // whole**: a caller's shaped `{status, message}` forged by any means other than a body the kernel caught
  // is the caller's own value and is answered as it was thrown.
  const carried = bodyThrowCarried(refusal);
  if (carried !== null) {
    const converted = bodyThrowRefusal(carried);
    if (converted !== null) throw converted;
  }
  if (isKernelBuiltRefusal(refusal) === false) throw refusal;
  const addon_ = withAddon();
  // THE SLOTS THE KERNEL HANDS BACK ARE THE `§8.2` ROW'S OWN, and the generator's own three-argument call
  // fills `<CONTAINER>` beside `<SEGMENT>`. Where an artefact loaded but does not carry the generator, the
  // declared absent/failed-addon state is the answer, exactly as `boundaryReject` takes it — and where a
  // marked value carries no usable slots the handler below answers it, so no unsubstituted placeholder can
  // reach a caller from this frame.
  const usable = typeof addon_.errorMessage === 'function'
    && typeof refusal.status === 'string'
    && typeof refusal.segment === 'string';
  if (usable === false) throw refusal;
  const generated = addon_.errorMessage(refusal.status, refusal.segment, refusal.container);
  // **THE FORM IS THIS SURFACE'S ONE FORM** (`docs/specs/storeroom-js/surface.md §2.5` items 3–4, whose `log` is PRESENT and never absent):
  // `{status, message, log}`, the `status` the STORE's own member the kernel composed — `ConstraintRefusedAtRegistration`
  // from 2026-10-26 (`DEF-N`: the REGISTRATION VERDICT, and NOT the shape code `ConstraintListInvalid`, which
  // keeps its own trigger and its own sentence) — the `message` the STORE'S OWN GENERATED SENTENCE, and the
  // `log` the synthetic attempt's log where a repair was attempted and `[]` where none was. **NO `KC` TOKEN CROSSES** (`A120` (2); `docs/specs/storeroom-js/surface.md §2.12` item 3 item 2): the synthetic attempt's
  // terminal token stays in the kernel and reaches no caller.
  throw {
    status: refusal.status,
    message: generated,
    log: refusalLog(refusal.log),
  };
}

/// **THE DISABLED PAIR'S STANDING ELEMENT** — a function that PASSES (`kernel-surface.md §2.3` item 1:
/// `true` is the only pass value). **THE ELEMENT IS PARKED AND NEVER WITHDRAWN**: `constraintOn` re-registers
/// `entry.fn`, so *"it is the element the entry carried at that pair — never a second constraint and never a
/// re-registration"* (`docs/specs/storeroom-js/surface.md §2.12` item 3's `constraintOn` row).
///
/// **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling): THIS FUNCTION'S ONE REMAINING
/// REGISTRATION SITE IS `restoreHeldPair`'S REFUSAL WAKE (below), AND `constraintOff` NO LONGER REGISTERS IT.**
/// **The disable arm is `remove`-only** (`remove` is `K-6`, which is already the complete act), because standing a
/// passing body in the store's address slot for a DISABLED pair falsifies `finalizer-and-teardown.md §4.1`
/// table `2`'s *"disabling cannot fire — nothing runs"* at the mechanism level **and reaches `K-1`'s unconditional
/// `store.listen` — a table-`1` bracketing act inside a table-`2` verb's window.** **IT REMAINS THE ELEMENT A
/// *DISABLED* PAIR'S REGISTRY RECORD CARRIES FOR ENUMERATION PURPOSES** (`docs/specs/storeroom-js/surface.md
/// §2.12` item 3 clause 5: *"the toggle is NOT a removal"*), **which is why the wake below still needs it: a
/// refused re-registration must put the pair's registry standing back exactly as it stood, and for a disabled
/// pair that standing's element IS this one** — **it is simply no longer a store listener any successful
/// `constraintOff` installs.**
function constraintParked() {
  return true;
}

/// **⟶ ADDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling) — THE HELD PAIR'S PURGE, TAKEN
/// WHERE A REGISTRATION STANDS TO BE PURGED, AND THE RULE STATED ONCE FOR EVERY SITE THAT TAKES IT.**
///
/// **THE RULING'S CONSEQUENCE, WHICH IT DID NOT NAME AND WHICH THIS FUNCTION IS WHAT RECORDS: `constraintOff`'s
/// disable arm PURGES ONLY (`remove`) and registers NOTHING, so after it a pair stands NO KERNEL ROW AT ALL.**
/// **`K-6` is not a no-op at such a pair — it REFUSES `KC-2`, *"no constraint pair answers to …"*** (`contract.md
/// §4` `F-12`), **so every held-pair site that purges unconditionally would now THROW where a clause declares a
/// success:** `addConstraint`'s overwrite arm at a DISABLED pair (a held pair, and the arm is the OVERWRITE arm
/// either way) and `removeConstraint` at a DISABLED pair (*"THE ONE ACT THAT DELETES AN IDENTITY"*, which must
/// still delete one). **MEASURED BOTH WAYS, not assumed: both threw `KC-2` with the purge left unconditional,
/// and both answer as declared with this guard.**
///
/// **THE PREDICATE IS THE ENTRY'S OWN `enabled` MEMBER AND IT IS EXACT:** `carryConstraint` writes `enabled:
/// true` only where the registration STOOD (its own clause: *"THE ENTRY'S OWN RECORD IS WRITTEN ONLY WHERE THE
/// REGISTRATION STOOD"*), the enable arm sets it `true` after its own `K-1`, and the disable arm sets it `false`
/// precisely where it has purged the row away. **So `enabled === true` ⟺ the pair stands a registration, and
/// `enabled === false` ⟺ there is nothing for `K-6` to withdraw.** **NOTHING IS LEFT UNPURGED:** where a row does
/// survive a disable — the declared residue of a REFUSED registration, which `restoreHeldPair` writes back —
/// `K-1`'s own idempotence arm replaces its function and keeps its place (`kernel-surface.md §2.1` item 1;
/// `CC-7`), so the ADD lands as declared whether or not a row stands. **THE OTHER TWO SITES ARE SAID AT THEIR OWN
/// BYTES:** `addConstraint`'s overwrite arm and `removeConstraint` above, and `constraintOn`'s enable arm, which
/// purges nothing because the arm is reached only at a pair that already stands none.
export function withdrawStanding(instance, held) {
  if (held.enabled !== true) return;
  constraintsKernel().remove(instance, { address: held.addresses, id: held.id });
}

/// **⟶ ADDED — THE PAIR'S REGISTRY STANDING, PUT BACK AFTER A REFUSED RE-REGISTRATION.** **THIS IS THE WAKE
/// OF THE PURGE ORDER, AND IT IS THE ONE THING `validate-first` CANNOT SUPPLY BY ITSELF.**
///
/// **THE ORDER IS `CHECK → PURGE → ADD`, AND THE PURGE IS `K-6`** (`contract.md §2.3` items 2–4; `(O-4)`
/// item (iii)): **so by the time the ADD can refuse, the kernel's row AND the read model's row have already
/// gone with the old handle** — `K-6`'s `FORGET_PAIR` is UNCONDITIONAL and takes the entry the pair was
/// enumerated by (`contract.md §2.9` item 3; `docs/specs/storeroom-js/surface.md §2.7` item 7). **AND `constraintSite`'s CHECK CANNOT REACH
/// THE REGISTRATION-TIME EVALUATION** — `contract.md §2.3` item 4's own split: the four pre-checkable
/// classes are static, while *"registration-time EVALUATION … state 3's attempted repair, the store's own
/// refusal of `listen` … and `register` on a purge-emptied bucket"* are NOT pre-checkable, **so a state-2
/// or state-3 failure at a held pair still purges first and refuses after** (same item, its own conclusion).
///
/// **WHAT THE CONTRACT DECLARES ABOUT THAT RESIDUE IS TWO FACTS AND NOT ONE, AND THE SECOND IS WHAT THIS
/// FUNCTION KEEPS** (`constraint-sites.md §4` item 2, verbatim: *"the pair's REGISTRY standing and its STORE
/// standing are two facts, and only the registry one is the kernel's to keep; the pair STILL EVALUATES, and
/// its delivery resolves to `undefined` and fires NOTHING SILENTLY"*): the STORE-side loss is the DECLARED
/// residue, and **the REGISTRY standing is the kernel's to keep — the pair still evaluates, `constraints()`
/// is unmoved, and the refused call changed nothing** (`docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 1, verbatim: *"a refused registration
/// leaves the registry exactly as it stood"*; `docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 3's four observables; `P: docs/pending.md · P-5`'s
/// `(F-2b)`: *"a pair is never left without a valid constraint, and a refused add changes nothing"*).
/// **ALL THREE OF THOSE ARE FUNCTIONS OF THESE TWO ROWS**, so both are written back here.
///
/// **THE ELEMENT PUT BACK IS THE ONE THE PAIR ACTUALLY STOOD UNDER AND NO OTHER** — `entry.fn` where the pair
/// was enabled and `constraintParked` where it was disabled (`docs/specs/storeroom-js/surface.md §2.12` item 3;
/// `constraint-sites.md §1` row 2: *"`entry.fn` (the element the entry
/// carried)"*). **AND ITS OWN `K-1` CANNOT REFUSE**: the element is the one the pair was ADMITTED under, and
/// every kernel write re-evaluates a standing pair and refuses on violation without landing it, so a state
/// the pair's own element rejects is not a state a standing pair is ever left in (`kernel-surface.md §2.3`
/// item 1; `docs/specs/storeroom-native/contract.md §7.3` (b) state 1).
///
/// **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling): THE SENTENCE THAT STOOD HERE —
/// *"which is exactly the element the toggle itself re-registers"* — IS SUPERSEDED AND IS NOT RESTATED.**
/// **The disable arm PURGES ONLY (`remove`) and re-registers NOTHING**, so `constraintParked` is NOT what
/// `constraintOff` installs; **it is what THIS WAKE installs, and only here.** **The ground is unchanged and is
/// why the distinction still matters at this site: a pair's REGISTRY standing and its STORE standing are two
/// facts, and a refused re-registration must put the registry one back for a pair of EITHER polarity** — for a
/// disabled pair that standing's element is this parked body, **carried for ENUMERATION, not as a store listener
/// any successful disable installs** (`docs/specs/storeroom-js/surface.md §2.12` item 3 clause 5).
/// **AND THIS WAKE'S REACH IS NOW NARROWER BY ONE CALLER:** it is reached from `addConstraint`'s overwrite arm and
/// from `constraintOn`'s enable arm and from NO arm of `constraintOff`, whose `try`/`catch` went with its loop
/// (`DEF-2026-10-20-F` consequence (i)).
export function restoreHeldPair(state, instance, held) {
  // THE READ-MODEL ROW FIRST: it is the one `K-6`'s `FORGET_PAIR` deleted, and it is unobtainable from the
  // kernel (`docs/specs/storeroom-held-listener-identity/contract.md §2.9` item 3).
  state.constraints.set(constraintPairKey(held.addresses, held.id), held);
  // AND THE KERNEL'S OWN ROW BESIDE IT, AT EVERY ADDRESS THE PAIR STOOD AT, UNDER ITS OWN IDENTITY — the
  // same act `constraintOn` performs, so the pair is carried and enumerated exactly as it was (`docs/specs/storeroom-held-listener-identity/contract.md §2.6`
  // item 4; `constraint-identity.md §3` item 3).
  // **⟶ AMENDED 2026-10-22 (same ruling): this ternary's DISABLED branch is this function's alone now.** It is the
  // one place `constraintParked` is registered; `constraintOff`'s arm no longer reaches a `register` at all, so a
  // disable's own residue never travels through this wake and `restoreHeldPair` is called with a pair whose
  // polarity the CALLER's refusal left as it stood (`entry.fn` enabled, `constraintParked` disabled).
  const standing = held.enabled === true ? held.fn : constraintParked;
  for (const address of held.addresses) {
    constraintsKernel().register(instance, address, held.id, standing);
  }
}

/// **A WELL-FORMED PAIR THE ENTRY DOES NOT CARRY — `docs/specs/storeroom-js/surface.md §2.12` item 3's second answered question and
/// `PAR-JS-24`'s second declared answer: at EITHER toggle, in EITHER direction, an OUTSIDE VALUE taking
/// item 4's refusal, ONE THROWN `TypeError`, THE ENTRY NOT WIDENED.** It is NOT a third population route:
/// were the entry widened with the function the refused call carried, a pair would stand ENABLED WITH NO
/// FUNCTION — a state no clause of that directory declares. **AND IT IS THAT SAME ONE `TypeError`, carrying
/// `log: []` on the ruling's flat reading and no `status` on rule (ii)'s** (`surface.md §2.5` item 4).
export function constraintUncarried(verb, pair) {
  throw withEmptyLog(new TypeError(
    `the pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\` carries no constraint in this instance, and `
    + 'a toggle names a pair the entry carries',
  ));
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): addConstraint is deleted; its doc block and body are now the
// `addConstraint` member's own (P-8; archive/p8-merge/2026-10-18/blocks/addConstraint.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): constraintToggle is deleted; its doc block is now the
// `constraintOn` member's own and its two arms are the `constraintOn`/`constraintOff` members' own
// (P-8; archive/p8-merge/2026-10-18/blocks/constraintToggle.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): removeConstraint is deleted; its doc block and body are now the
// `removeConstraint` member's own (P-8; archive/p8-merge/2026-10-18/blocks/removeConstraint.md).

/// **THE REGISTERED-PAIR READ — `surface.md §2.4` item 9 (f)'s `constraints` clause of 2026-10-17, items 2–8,
/// AND ITS REGISTER ROW `PAR-JS-27` (`parameter-semantics.md §2.27`).** `a.constraints() -> Array<{ address,
/// id }>`: **a FRESH JS ARRAY on every call, whose every element is a FRESH PLAIN OBJECT carrying EXACTLY
/// TWO MEMBERS** — `address`, a FRESH JS array of the store's own segments, and `id`, the constraint's own
/// BARE `id`, a `string` — the same two data the kernel's own registry is keyed by.
///
/// **THE SOURCE IS THE ENTRY'S OWN `state.constraints`, AND ITS SHAPE IS ALREADY THE ANSWER'S**: a per-instance
/// `Map` keyed by `constraintPairKey(address, id)` whose every value is the record `carryConstraint` writes —
/// `{ addresses, addressKey, id, fn, enabled, identity, registrationSeq }` (`registrationSeq` added 2026-10-26
/// for `D-39`'s declared order). So the read is a CARRIAGE READ and no kernel item is
/// touched or minted: `K-1`–`K-5` stand exactly as printed, the kernel's extent stays FIVE and no `K-6` is
/// proposed (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f), item 8). **NO KERNEL MODULE IS EVEN LOADED HERE** — `constraintsKernel()` is
/// not called, so a product that never carried and never asked for a constraint still reads `[]` on a tree
/// that stages nothing beside it (`kernel-surface.md §1` item 1's lazy resolution).
///
/// **THE FOUR DECLARED EXCLUSIONS, EACH HONOURED AT THIS SITE AND NAMED HERE SO THE CODE CAN BE READ AGAINST
/// THEM:**
/// * **(1) NO CONSTRAINT FUNCTION IS RETURNED** (item 3, four grounds, the operative one for this frame being
///   the anti-pattern rulings: *do not hand out a value whose later use the contract cannot bound*). The
///   element is BUILT FRESH from `entry.address` and `entry.id`, so `entry.fn` is never read, referenced or
///   copied — and a disabled pair's parked stub is not reachable either, because a function is never touched
///   at all.
/// * **(2) NO OPAQUE IDENTITY IS EXPOSED** (item 4; `PAR-JS-25`'s opacity would break the moment a consumer
///   read one out of the array). `entry.identity` is not read and no element carries it.
/// * **(3) NO ORDER IS PROMISED, AND NONE IS MANUFACTURED** (item 6): the enumeration is `Map` iteration order
///   and nothing else — **this function does NOT sort, and deliberately does not** — so a drive compares the
///   pairs as a SET and never as a sequence (`DD-22`; `docs/specs/storeroom-js/surface.md §2.7` item 3). No registration order, address order or
///   `seq`-like ordinal is minted here, and none is asserted of it.
///   **⟶ SUPERSEDED 2026-10-26 BY `strata/decisions.md` · `D-39` (the architect, verbatim: *"add deterministic
///   ordering"*), AND THE BYTES ABOVE STAND AS THE READING THEY CARRIED** (`DEF-2026-10-02`: no whole-file
///   rewrite). **The declared order is REGISTRATION SEQUENCE** — *"the order the pairs were registered and the
///   one a consumer can reason about"* — **so this function DOES order, by the one key the entry record mints
///   at registration (`registrationSeq` above), and it sorts by neither address nor id.** The `surface.md §2.4`
///   item 6 exclusion this bullet quotes is the clause `D-39` supersedes; **the exclusion it supersedes is the
///   ORDER one alone — exclusion (1) (no function crosses), (2) (no identity crosses) and (4) (a disabled pair
///   appears) stand exactly as printed.**
/// * **(4) A DISABLED PAIR DOES APPEAR** (item 5): `constraintOff` is a TOGGLE and NOT A REMOVAL, so a pair
///   whose `entry.enabled` is `false` is STILL CARRIED and is enumerated — **the read does not consult
///   `enabled` at all**, and it returns no `enabled` member either (a third member is a value no clause
///   declares).
///   **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling): THIS EXCLUSION IS NOW THE WHOLE
///   OF WHAT A DISABLE LEAVES BEHIND, AND IT IS SATISFIED BY THE STATE ROW AND `entry.enabled = false` ALONE.**
///   **The disable arm purges only (`remove`) and registers nothing, so NO STORE-SIDE LISTENER carries a disabled
///   pair** — its CARRIAGE and its ENUMERATION are a REGISTRY fact, read off `state.constraints`, exactly as this
///   exclusion says. **This member is the cell of the ruling's consequence (ii), and it is unmoved by the fix:
///   `a126-constraint-methods.test.mjs`'s toggle cells assert precisely this appearance.**
///
/// **AND THE TWO EXCLUSIONS ITEM 7 DECLARES ARE STRUCTURES AND NOT TESTS TAKEN HERE**: (i) a well-formed
/// `cfg.constraints` element that carried no function never reached `carryConstraint` (`storeCreate`'s batch
/// loop skips it), so it is no entry and cannot appear; and (ii) a refused registration wrote no entry
/// (`carryConstraint`: *"THE ENTRY'S OWN RECORD IS WRITTEN ONLY WHERE THE REGISTRATION STOOD"*), so it
/// cannot appear either. **THE SAME TWO MEMBERS ON EVERY ELEMENT AND NO THIRD**, and the `[]` arm is this
/// member's declared value where the entry carries no pair at all (`PAR-JS-27`'s `domain` cell).
export function enumerateConstraints(state) {
  // **⟶ THE ORDER IS THE PAIR'S REGISTRATION SEQUENCE — `D-39` (2026-10-26)** (`registrationSequence` above
  // states the rule, its ground and the measured instability it closes). **THE RECORDS ARE COLLECTED FIRST
  // AND ORDERED BY THE KEY THEY CARRY**, because the `Map`'s own insertion order is not the registration
  // order once a declared act has deleted a row and written the same record back (`constraintOff`'s
  // `FORGET_PAIR` purge and its re-`set`): **a toggle therefore re-orders NO pair, and a sort by address or
  // by id — neither of which `D-39` says — is not taken.** No record's key is written here; the read only
  // reads it.
  const carried = [];
  for (const entry of state.constraints.values()) {
    appendOwn(carried, entry);
  }
  carried.sort((left, right) => left.registrationSeq - right.registrationSeq);
  const pairs = [];
  for (let index = 0; index < carried.length; index += 1) {
    const entry = carried[index];
    // A FRESH PLAIN OBJECT PER CALL AND A FRESH SEGMENT ARRAY WITHIN IT (`slice`): a caller that mutates a
    // returned element, or an element's `address`, changes nothing the next call returns — and nothing of the
    // entry's own record either, the two members being copies of the pair's own data.
    // **THE `address` MEMBER IS THE PAIR'S OWN SET** (`contract.md §2.6` item 5; `PAR-HL-13`): one row per
    // `state.constraints` VALUE, unchanged in count, with its `address` member's type moved
    // (`P: docs/pending.md · P-7`'s answer clause, item (1)) — a FRESH array of FRESH segment arrays.
    appendOwn(pairs, { address: entry.addresses.map((address) => address.slice()), id: entry.id });
  }
  return pairs;
}

/// **WHETHER THIS INSTANCE CARRIES A PAIR AT THIS WRITE'S ADDRESS** (`docs/specs/storeroom-js/surface.md §2.12` item 1's preamble clause (a)) —
/// the gate stage 1 takes before the kernel is reached at all. **THE CLASS DECISION COMES FIRST AND NO TRAP
/// IS RUN ON ANY PATH** (`DD-34`): a `Proxy` address, a class extending `Array` and every non-array lies
/// outside every pair's own address domain, so no pair of this entry can stand at one.
function carriesConstraintAt(state, address) {
  if (state.constraints.size === 0) return false;
  if (types.isProxy(address) || !isAdmittedArray(address)) return false;
  // **⟶ THE PER-WRITE GATE IS A SET-MEMBERSHIP TEST, NOT AN EQUALITY TEST** (`P: docs/pending.md · P-7`'s
  // keying ruling, item (iv), verbatim: *"`carriesConstraintAt`'s `JSON.stringify(address)` key and
  // `entry.addressKey` must answer TRUE where ANY of the pair's N addresses matches — the per-write gate is a
  // SET-MEMBERSHIP test, not an equality test"*). **ONE PAIR OVER N ADDRESSES OCCUPIES N ROWS AND ONE
  // IDENTITY**, so a write at ANY of them reaches it (`contract.md §2.6` item 4).
  const key = homeAddressKey(address);
  for (const entry of state.constraints.values()) {
    for (const standing of entry.addresses) {
      if (homeAddressKey(standing) === key) return true;
    }
  }
  return false;
}

/**
 * **THE KERNEL-DRIVEN WRITE — `docs/specs/storeroom-js/surface.md §2.12` ITEM 1'S FIVE STAGES, TAKEN IN THEIR ONE ORDER.**
 * ```
 *   1. K-2      the attempt is opened at this address, or the address's own live attempt is JOINED
 *   2. the store leg     the kernel's own call on this entry's `write`, FIVE POSITIONS, the record
 *                        identity its fifth position carries — so the delivery of that write's handles
 *                        is WITHHELD here and owed to stage 5
 *   3. K-3      the pass: every pair registered at this address, each against this op's own value
 *   4. K-3      the attempt's terminal arm — the pass's, or the floor's where a save failed
 *   5. settle   the residue the record's `pending` carries, delivered at instant (b), failing arm alone
 * ```
 * **THE CALLER MEETS A THROW INSTEAD OF A RETURN ON THE FAILING ARM, AND THE STORE'S OWN VERB PRODUCED
 * NEITHER FORM** (`§1.2` item 2): see `constraintCrossing` for what crosses.
 */
export function constraintWrite(state, instance, address, tier, value) {
  const kernel = constraintsKernel();
  let record;
  try {
    record = kernel.commit(instance, address, tier, value);
  } catch (refusal) {
    constraintCrossing(refusal);
  }
  const answer = state.leg;
  let report;
  try {
    report = kernel.runAttempt(instance, record);
  } catch (refusal) {
    constraintCrossing(refusal);
  }
  // **⟶ THE PASSING ARM RETURNS THE REPORT THE ATTEMPT ITSELF BUILT — `D-40`'S SECOND HALF (`DEF-M` (2)),
  // 2026-10-26.** **WHAT IT WAS:** `return answer` returned the **STORE LEG'S** record — the one `index.mjs`
  // builds from the store's first reply at this verb — and DISCARDED the report `runAttempt` had just
  // answered with. On a write whose value a constraint REFUSED and whose repair then landed, the store's
  // reply at the leg describes the op that landed the REFUSED value, while the store afterwards holds the
  // REPAIRED one: measured, `op.after.value` read `9` against a `read` of `1`. **WHAT IT IS:** the returned
  // record's `op` is the attempt report's OWN LAST OP — the store's journal op whose landing left the state
  // the store stands at when this verb returns — so the record DESCRIBES THE STORE and is never overwritten
  // to match it. **A write with no repair is unchanged: the report's last op IS the store leg's own op.**
  // **NO MEMBER IS FORGED, NO MEMBER IS ADDED, AND THE RECORD KEEPS ITS DECLARED THREE**
  // (`docs/specs/storeroom-js/surface.md §2.2`): `op` from the report, `watched` and `triggered` from the
  // store leg's own answer, unchanged.
  const landed = report !== null && typeof report === 'object' && Array.isArray(report.ops)
    && report.ops.length > 0
    ? report.ops[report.ops.length - 1]
    : answer.op;
  return {
    op: landed,
    watched: answer.watched,
    triggered: answer.triggered,
  };
}

/// **THE FAIL ARM'S CROSSING — `A120` (2): THE ENTRY CARRIES THE KERNEL'S TOKEN, THE THROW KEEPS THE
/// STORE'S — AND THE FORM CROSSES AT THREE MEMBERS FROM 2026-10-16** (`surface.md §2.5`'s clause of that
/// date, items 3–4 and 10 (i)–(iii); `docs/specs/storeroom-js/surface.md §2.12` item 1's mark of the same date).
///
/// **WHAT MOVES IS THE REACHABILITY OF `log` AND NOTHING ELSE.** The member `status` carries is still the
/// store's `FileCommitFailed`, because no caller-side status can carry a `KC` token and a
/// constraint-refused write is a commit that did not stand; **the kernel token does NOT enter `status`**
/// (`A120` (2)'s rule survives whole). **A STORE VERB'S OWN REFUSAL CROSSES VERBATIM AND UNCONVERTED**
/// (`fail-surface.md §1.2`): its `status` and its `message` are carried BYTE-FOR-BYTE, never re-mapped and
/// never re-spelled, and `log` is ATTACHED BESIDE them as an own member — *"nothing is converted, and a
/// member is added"* (`docs/specs/storeroom-js/surface.md §2.5` item 10 (ii)).
///
/// **THE TWO ARMS, EACH AT ITS OWN FORM:**
/// * **A `KC`-TOKEN REFUSAL — THE KERNEL'S OWN PASS PRODUCED IT.** Its `{status, message, log}` is the
///   KERNEL'S OWN three-member form (`docs/specs/storeroom-constraints/fail-surface.md §1.1`, whose member
///   set is the same three), and it would cross UNCHANGED were it not that `status` must carry the store's
///   `FileCommitFailed` on this surface: **the `log` it carries is the attempt's, VERBATIM, and it crosses
///   with the store-side `status` in its place.**
/// * **A STORE VERB'S OWN REFUSAL.** Its `status` and `message` cross verbatim and `log` is attached beside
///   them — the attempt's log where this write's own attempt holds one, and `[]` where it does not (a `K-2`
///   the store refused opened no attempt, so there is no attempt at all — `docs/specs/storeroom-js/surface.md §2.5` item 4).
///
/// **⟶ AMENDED 2026-10-26 — `DEF-H`: THE `KC`-TOKEN ARM'S `status` IS THE SET'S RANK-`20` MEMBER
/// `ConstraintPassRefused`, NOT THE STORE'S SAVE CODE.** **THE RULING IS THE ARCHITECT'S, VERBATIM: *"Expand
/// the returned fail-state list to include the refusal"*** (`strata/decisions.md` · `D-38`), **and it
/// falsifies the reason this block has given since 2026-10-16:** *"no caller-side status can carry a `KC`
/// token"* was TRUE while the set's last member was a store trigger; it is FALSE now that the set carries
/// members the PACKAGE selects (rank `17`'s boundary refusal, ranks `18`/`19`'s, and this one). **THE TOKEN
/// STILL DOES NOT ENTER `status`** — it continues to ride the attempt's own `outcome` entry's `state` in the
/// `log`, which is `D-38`'s own reading: *"the token continues to ride `log[].state` where it already does,
/// and the status stops lying about which layer failed"*. **`FileCommitFailed` STAYS THE SAVE'S CODE AND IS
/// PRODUCED BY SAVE FAILURES ONLY** (`D-38`'s `DEF-H` reading of its own `(g)`), **and ONE member serves every
/// `KC` token rather than one member per token** — *"ONE status for the refusal, not one per `KC` token"*.
/// **THE CLAUSES ABOVE STAND BYTE-FOR-BYTE AND ARE READ THROUGH THIS ONE; the store verb's own arm below is
/// UNMOVED, the message the kernel composed is UNMOVED, and the `log` is UNMOVED.** **NO OTHER ARM OF THIS
/// FILE CHANGES ITS STATUS, MESSAGE OR LOG ON THIS DATE.**
///
/// **AND THE TIMING TRAP IS HONOURED, WHICH IS THE WHOLE OF ITEM 10 (iii): `log` IS TAKEN BEFORE THE
/// ATTEMPT IS DISPOSED OF, NOT AFTER.** The kernel's terminal act has already run when this frame is
/// reached (its `refuse` was thrown WITH the log in hand, `constraint-kernel.mjs`'s `refuse`), so the list
/// read here is the list AS IT STOOD WHEN THE REFUSAL WAS BUILT — the failure arm's `outcome` entry
/// included — and it is read OFF THE THROWN VALUE AND NEVER OFF A LATER READ: the registry entry is gone
/// and a reader that reached for the attempt afterwards would reach nothing.
///
/// **⟶ THE FORGERY DISCRIMINATOR, RE-EXAMINED AND REPLACED 2026-10-16, BECAUSE THE RULING MADE THE OLD ONE
/// UNSAFE — THIS IS THE HIGH-RISK EDIT AND IT IS NAMED WITH WHAT IT WAS AND WHAT IT IS.**
///
/// **WHAT IT WAS.** The previous pass fixed a broken forgery guard by discriminating on **`log`'s
/// PRESENCE**: *a value carrying a `log` was the kernel's, and a value carrying none was the caller's.*
/// That was sound only while the KERNEL'S OWN form was the only three-member form in the system.
///
/// **WHY IT NO LONGER SUFFICES.** `surface.md §2.5` item 4 now declares **`log` flat on EVERY failure this
/// surface throws** — so every surface-produced failure carries one, **and so does a CALLER'S forged object
/// that happens to carry a `log` member.** A caller's constraint body may throw
/// `{status: 'ValueNotAdmitted', message: 'FORGED BY THE CALLER', log: []}` — a plain object it authored,
/// carrying the member the old test looked for — **and under the old test that object was RE-WRAPPED into a
/// fresh three-member object, so `caught === thrown` was `false` for a value the caller threw.** Measured on
/// the tree before this edit: `forged {status,message,log} => caught===thrown: false`. **A caller's own
/// throwable must surface AS ITSELF** (`fail-surface.md §1.1` item 5 — the body's exception *"propagates out
/// of the kernel's own invocation, untouched and unconverted"*; `kernel-surface.md §2.3` item 1 — a body's
/// throwable *"is NOT a kernel state and NOT a store state"*), **so the test had to stop reading a member
/// the caller can forge.**
///
/// **WHAT REPLACED IT — IDENTITY, NOT SHAPE.** The kernel's own refusals are **built by the kernel**, and
/// every one of them is thrown from `constraint-kernel.mjs`'s single `refuse` frame. The entry therefore
/// **MARKS WHAT THE KERNEL BUILT**, at the one place the kernel's values enter this entry, **with a
/// module-private `WeakSet`** — `kernelRefusals` above — **and this frame asks whether the handed value IS
/// ONE OF THOSE VALUES, never whether it LOOKS LIKE one.** A caller cannot forge membership of a set it
/// cannot reach, so:
/// * a `KC`-token value the kernel built → **the kernel's arm**, and the rank-`20` crossing below;
/// * a store verb's own refusal (built by the addon, carrying the store's code) → the store's arm below;
/// * **EVERYTHING ELSE IS THE CALLER'S AND CROSSES AS ITSELF** — a forged three-member object, a forged
///   two-member object, a `TypeError`, a bare string, `undefined` — `caught === thrown` on all of them.
///
/// **THE MARK IS SET WHERE THE KERNEL'S FAILURE IS FIRST SEEN** — at the two `catch` frames in
/// `constraintWrite` above, which are the only places a kernel-thrown value reaches this entry — and **NOT
/// by a test over members, which is the whole defect being repaired.** **IT IS A `WeakSet` AND NOT A MEMBER
/// ON THE VALUE**: no member is added to the kernel's own form (`fail-surface.md §1.1`'s member set stays the
/// three), nothing is mutated, nothing is frozen, and the mark is invisible to every census — while a value
/// that is not an object (a string, `undefined`) is simply never in the set and needs no special case, since
/// `WeakSet.has` on a primitive is `false` rather than a throw.
/// **THE KERNEL'S OWN REFUSAL-CLASS QUESTION, AND WHY THE ENTRY ASKS THE KERNEL IT RATHER THAN READING A
/// MEMBER** — the discriminator that replaced `log`'s presence, and the reason a `WeakSet` local to this
/// entry will not do.
///
/// **THE MARK CANNOT LIVE HERE, AND THAT WAS MEASURED RATHER THAN REASONED:** a `WeakSet` populated from the
/// two `catch` frames in `constraintWrite` marks **EVERY** value leaving the kernel's frames — **a caller's
/// constraint BODY throws from inside `runAttempt` too**, so the body's own throwable passes the same frame
/// and is marked alongside the kernel's. On the tree with the `WeakSet` in place, all three of
/// `forged {status,message}`, `forged {status,message,log}` and `TypeError` answered `caught === thrown:
/// false`: **the mark was set by the frame and not by the author of the value.** A mark is only worth
/// anything if the thing that SETS it is the thing that BUILT the value, and for a kernel refusal that thing
/// is `constraint-kernel.mjs`'s own `refuse`.
///
/// **SO THE KERNEL DECLARES IT, AT ITS ONE THROW SITE, UNDER A `Symbol.for` KEY BOTH SIDES SPELL** — exactly
/// the pattern `SETTLED_ON_THE_PASSING_ARM` and `SAVE_FAILED_AT_THE_TERMINAL_ARM` already use across this
/// same boundary (`constraint-kernel.mjs`'s `KERNEL_REFUSAL`): the entry imports no kernel at load and the
/// kernel imports no entry, and **a symbol key is invisible to `Object.keys`**, so the thrown form's readable
/// member set stays the three `docs/specs/storeroom-js/surface.md §2.5` items 3–4 declare (`docs/specs/storeroom-js/surface.md §2.5` item 9's census reads `["log","message",
/// "status"]` and no fourth). **A CALLER'S BODY CANNOT SET IT**: the mark is written in a frame no caller
/// reaches, and it is not a member a caller would think to spell.
///
/// **AND A KERNEL THAT DID NOT CARRY THE DECLARATION ANSWERS `false`** — every value is then the caller's and
/// surfaces as itself, which is the safe direction: a refusal crossed unconverted is the declared form once
/// the surface stops re-wrapping it, while a caller's value crossed converted is the FINDING this whole
/// discriminator exists to prevent.

/// **THE SAME `Symbol.for` KEY THE KERNEL WRITES, SPELLED HERE SO THE ENTRY IMPORTS NO KERNEL AND THE KERNEL
/// IMPORTS NO ENTRY** — the pattern `SETTLED_ON_THE_PASSING_ARM` and `SAVE_FAILED_AT_THE_TERMINAL_ARM`
/// already cross this boundary by (`constraint-kernel.mjs`'s `KERNEL_REFUSAL`).
///
/// **IT IS A SYMBOL AND NOT A KERNEL FUNCTION, AND THE REASON IS A SPEC COUNT: `kernel-surface.md §1` item 2
/// declares that module's export set as EXACTLY the five `K-1`–`K-5` items — *"no sixth name"* — so a
/// predicate exported from the kernel to serve this entry would be a FINDING.** The fact travels on the
/// VALUE, under a key both sides spell, and the kernel's namespace is untouched.
///
/// **THE QUESTION IS ANSWERED WITHOUT REACHING THE KERNEL AT ALL**, which is the shape `WeakSet.has` gave
/// for free and is what lets this entry keep loading where nothing is staged beside it: no `require` of
/// `./src/` is triggered by a failure's own classification.
const KERNEL_REFUSAL = Symbol.for('provident-storeroom.kernel-refusal');

/// **WHETHER THE HANDED VALUE IS A REFUSAL THE KERNEL ITSELF BUILT** — the discriminator that replaced
/// `log`'s presence, answered by the mark the kernel's one `refuse` frame sets and by nothing a caller can
/// spell. **A NON-OBJECT IS `false`** without a member read, and **a value the kernel never built is
/// `false`** whatever members it carries.
function isKernelBuiltRefusal(value) {
  return value !== null && typeof value === 'object' && value[KERNEL_REFUSAL] === true;
}

/// **⟶ ADDED 2026-10-26 — THE BODY-THROW MARK, SPELLED ON THIS SIDE TOO (`DEF-S`; the architect's ruling,
/// verbatim: *"Expand the returned error set for both S/N"*).**
///
/// **THE SAME `Symbol.for` KEY THE KERNEL WRITES, AND WHY A MARK IS THE WHOLE OF THE FIX.** `DEF-A` closed the
/// hole where a caller's shaped `{status, message}` was answered as the package's refusal, and it closed it by
/// IDENTITY and not by shape. **A constraint BODY is the caller's own code, so its throw is the caller's own
/// value — and converting it must not become a laundering route for a forged refusal.** The kernel therefore
/// marks what IT caught from a body (`kernel-foundations.mjs`'s `markBodyThrow`) and this entry converts a
/// marked value only; **everything unmarked is still thrown as itself, `caught === thrown` included.**
///
/// **IT IS A SYMBOL, NOT A KERNEL FUNCTION**, for the reason `KERNEL_REFUSAL` above states: `kernel-surface.md
/// §1` item 2 closes the kernel's export set at the five `K-1`–`K-5` items — *"no sixth name"* — so the fact
/// travels on the VALUE under a key both sides spell. **AND NOTHING OF THE CALLER'S OWN FORM IS READ THROUGH
/// IT:** the mark carries the pair's address spelling and the attempt's log, and the form below is BUILT here
/// out of the generator's own sentence.
const CONSTRAINT_BODY_THREW_ENTRY = Symbol.for('provident-storeroom.constraint-body-threw');

/// **THE SET'S EIGHTEENTH MEMBER, SPELLED ONCE** (`src/error.rs`'s `CODES`, `[&str; 20]`, rank `18`; `§8.1`
/// #18 and `§8.2`'s row of 2026-10-26). **THE STATUS IS A MEMBER OF THE STORE'S CLOSED SET AND IS NEVER
/// MINTED HERE** (`DD-40`).
const BODY_THREW_STATUS = 'ConstraintBodyThrew';

/// **THE SET'S TWENTIETH MEMBER, SPELLED ONCE** (`src/error.rs`'s `CODES`, `[&str; 20]`, rank `20`; `§8.1` #20
/// and `§8.2`'s row of 2026-10-26). **THE ONE STATUS A CONSTRAINT REFUSAL ANSWERS WITH, AT BOTH OF ITS ARMS** —
/// a `KC`-tokened refusal of a write's attempt (`DEF-H`) and a reversal whose terminal state a registered
/// constraint refuses (`DEF-W`) — **and it is ONE member for all eight tokens** (`D-38`: *"ONE status for the
/// refusal, not one per `KC` token"*). **IT IS SELECTED HERE AND MINTED NOWHERE** (`DD-40`): the token
/// continues to ride the attempt's `outcome` entry's `state`, and `FileCommitFailed` is the SAVE's code, minted
/// by save failures only.
const CONSTRAINT_PASS_REFUSED = 'ConstraintPassRefused';

/// **WHETHER THE HANDED VALUE CARRIES THE KERNEL'S BODY-THROW MARK, AND WHAT THE MARK CARRIES** — the mark's
/// presence is the identity and the record under it is the two slots the generator's sentence needs. **A
/// NON-OBJECT IS `null`** without a member read, and **a value the kernel never caught from a body is `null`**
/// whatever members it carries.
function bodyThrowCarried(value) {
  if (value === null || typeof value !== 'object') return null;
  const carried = value[CONSTRAINT_BODY_THREW_ENTRY];
  if (carried === null || typeof carried !== 'object') return null;
  return carried;
}

/// **THE ONE FAILURE FORM FOR A BODY'S THROW** — `{status, message, log}`, `§2.5` items 3–4's form at this arm
/// too: the `status` the set's rank-`18` member, the `message` the STORE'S OWN GENERATED sentence (reached
/// through the generator this package already holds, `addon_.errorMessage` — `DD-52` forbids a second source),
/// and the `log` the attempt's own list where the mark carries one and `[]` where it carries none.
///
/// **A TREE THAT CARRIES NO USABLE GENERATOR ANSWERS `null`**, and both crossings then re-throw the marked
/// value AS ITSELF — the same safe direction `registrationCrossing` takes for a kernel refusal, and no
/// sentence is authored here.
function bodyThrowRefusal(carried) {
  const addon_ = withAddon();
  if (typeof addon_.errorMessage !== 'function') return null;
  const subject = typeof carried.address === 'string' ? carried.address : '';
  const generated = addon_.errorMessage(BODY_THREW_STATUS, subject);
  if (typeof generated !== 'string' || generated.length === 0) return null;
  return {
    status: BODY_THREW_STATUS,
    message: generated,
    log: refusalLog(carried.log),
  };
}

function constraintCrossing(refusal) {
  // **⟶ AND THE MARKED BODY-THROW ARM STANDS FIRST HERE TOO, 2026-10-26 (`DEF-S`), for the reason
  // `registrationCrossing` states at its own bytes.** A body that threw at a LANDING reaches this frame
  // through `constraintWrite`'s catch around `kernel.runAttempt`; the mark carries the attempt's own log,
  // taken by the frame that caught it BEFORE the attempt was disposed of (`§2.5` item 10 (iii)'s timing
  // trap), so the converted form's `log` is that attempt's list VERBATIM. **A FORGED OBJECT CARRYING
  // `{status, message}` AND NO MARK STILL CROSSES AS ITSELF, BELOW.**
  const carried = bodyThrowCarried(refusal);
  if (carried !== null) {
    const converted = bodyThrowRefusal(carried);
    if (converted !== null) throw converted;
  }
  const isObject = refusal !== null && typeof refusal === 'object';
  const status = isObject ? refusal.status : undefined;
  // **THE CALLER'S OWN VALUE CROSSES AS ITSELF, FIRST AND UNCONDITIONALLY.** The test is IDENTITY against
  // the kernel's marked set (above) and NOT any member's presence: a caller's forged `log`, a forged
  // `status` spelling and a forged two-member object are all its own, and `caught === thrown` holds for
  // each (`fail-surface.md §1.1` item 5). A value that is not an object at all is never the kernel's either.
  if (!isObject || isKernelBuiltRefusal(refusal) === false) throw refusal;
  // THE LOG IS THE THROWN VALUE'S OWN `log` MEMBER — the same list either arm carries — and `[]` where the
  // value carries none (`docs/specs/storeroom-js/surface.md §2.5` item 4: never absent, never `null`, never a non-array; a non-array here is a
  // finding at the site that produced it and is answered with the empty array rather than a shape).
  // **AND IT IS TAKEN HERE, BEFORE THE ATTEMPT IS DISPOSED OF** — item 10 (iii)'s timing trap: the list is
  // READ OFF THE THROWN VALUE, which the kernel built with the log in hand, and never off a later read.
  const log = Array.isArray(refusal.log) ? refusal.log : [];
  // **A MARKED VALUE WHOSE `status` IS NOT A `KC` TOKEN IS THE STORE VERB'S OWN REFUSAL CROSSING BACK
  // THROUGH THE KERNEL'S OWN LEG** (`constraint-kernel.mjs`'s `attempt.throwState` carries the store's code
  // at the repair arm): its `status` and `message` cross VERBATIM and `log` is attached BESIDE them —
  // *"nothing is converted, and a member is added"* (`docs/specs/storeroom-js/surface.md §2.5` item 10 (ii)).
  // **⟶ AND THE TOKEN MEMBERSHIP IS A LOCAL LOOP** (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`,
  // item `(2b)`'s row `54` and item `(3d)`'s ownership split): `KC_TOKENS.includes` is
  // `Array.prototype.includes` on a REFUSAL path, so a caller's override could decide which arm a kernel
  // refusal crosses by. The token list is a local array of strings and the membership is item `(1c)(vi)`'s
  // spelled comparison.
  let kernelToken = false;
  for (let i = 0; i < KC_TOKENS.length; i += 1) {
    if (KC_TOKENS[i] === status) {
      kernelToken = true;
      break;
    }
  }
  if (typeof status !== 'string' || kernelToken === false) {
    throw {
      status: refusal.status,
      message: refusal.message,
      log: refusalLog(log),
    };
  }
  // **THE KERNEL'S OWN `KC` REFUSAL.** Its `{status, message, log}` is the KERNEL'S OWN three-member form
  // (`docs/specs/storeroom-constraints/fail-surface.md §1.1`), and **⟶ FROM 2026-10-26 IT CROSSES WITH THE
  // SET'S RANK-`20` MEMBER IN `status`, NOT WITH THE STORE'S `FileCommitFailed`** (`DEF-H`; the architect,
  // verbatim: *"Expand the returned fail-state list to include the refusal"*; `strata/decisions.md` · `D-38`).
  // **THE TOKEN STILL DOES NOT ENTER `status`** — it is on the attempt's own `outcome` entry's `state` in the
  // `log`, which is `D-38`'s reading — **AND `FileCommitFailed` IS NOW THE SAVE'S CODE ALONE, minted by save
  // failures only.** The message is the kernel's own, UNMOVED; the `log` is the attempt's, VERBATIM.
  throw {
    status: CONSTRAINT_PASS_REFUSED,
    message: typeof refusal.message === 'string'
      ? refusal.message
      : 'the write was refused by a constraint of this attempt',
    log: refusalLog(log),
  };
}


// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ ADDED 2026-10-26 — THE REVERSAL'S JUDGEMENT: `DEF-W` OF `strata/decisions.md` · `D-38`, THE
// ARCHITECT, VERBATIM: *"Assert the constraints on rollback"*.**
//
// **THE SEAM THIS FILE LANDS, AND WHY IT IS HERE RATHER THAN IN `index.mjs`.** `index.mjs`'s `rollback`
// member passes the reversal straight to the addon entry; **the pairs, their functions and the read model
// live here** (`state.constraints`, `carryConstraint`'s own record), so the judgement's two halves are this
// file's and that member gains two calls: the WATCH taken before the reversal and the JUDGEMENT taken after
// it. **NO OTHER MEMBER OF `index.mjs` MOVES AND NO OTHER FILE IS TOUCHED.**
//
// **THE LAW, AT THE INSTANT IT IS JUDGED AT: after the reversal, every registered pair whose address the
// reversal TOUCHED must hold at the state the reversal LEFT.** `docs/specs/storeroom-js/contract.md §2.6`'s
// clause of this date: *"A REVERSAL IS JUDGED AT THE TERMINAL STATE IT LEAVES, AND NEVER PER UNWINDING
// STEP"* — **a per-step check is unsound because an unwinding composition passes through intermediate states
// no constraint would approve** — and item 2 of the same clause forbids the other direction too: **this is ONE
// judgement of ONE state, it adds no walk, and `D-40`'s floor law (`composeRollback`'s one call at the
// attempt's first op) is not re-walked by it.**
//
// **AND THE SHAPE CHOSEN IS `(a)` OF THE PASS'S OWN TWO, MEASURED AND NOT ASSUMED: THE REFUSAL COMES AFTER
// THE REVERSAL — **⟶ AND THE SECOND HALF OF THAT NAME, *"AND THE REVERSAL'S EFFECT STANDS"*, IS SUPERSEDED
// 2026-10-26 (`DEF-W`'s `(a)` discharged, `contract.md §2.6`'s second annotate-beside of that date): `(a)`'s
// MEASUREMENT stands — the refusal is still answered after the reversal, because `(b)` is not computable — but
// the effect is now UNDONE before the refusal is thrown (`judgeReversal`'s `restoreReversal`), because a refusal
// that reports the violation while leaving it is not a discharge. The bytes below stand and are read through
// this clause.** Shape `(b)` — computing the terminal state WITHOUT
// applying it — was measured against the artefact's own export set and is **NOT COMPUTABLE**: the addon
// publishes thirteen names (`read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`,
// `removeListener`, `commitFile`, `register`, `storeCreate`, `errorMessage`, `version`) and **no journal read,
// no op listing and no candidate-set query among them**, while the store's rollback scope is TEMPORALLY
// FLOORED at the named op's own `seq` and ALL-OR-NOTHING at the compacted mark (`src/store.rs:2374–2430`,
// `D-40`'s implementation finding, item 2). **So which ops the floor call would undo, and what their
// `before` values are, is not derivable from what the addon and the store expose** — a JS guess at that
// candidate set would be a second implementation of the store's own rule, and a guessed terminal state that
// DISAGREES with the store is worse than a late refusal. **THE JUDGEMENT THEREFORE READS THE STORE IT IS
// STANDING ON.**
//
// **THE WATCH IS WHAT MAKES "TOUCHED" MEASURED RATHER THAN GUESSED.** Before the addon is called, this file
// reads the store's standing at EVERY enabled pair's every address; after it, it reads the same addresses
// again and **an address the reversal did not move is not judged** — which is what keeps a pair the reversal
// never reached (a disabled pair, a pair at an untouched address, a pair whose constraint the store is
// already standing outside) from refusing a reversal that has nothing to do with it. **A PAIR WHOSE ELEMENT
// DOES NOT STAND A REGISTRATION IS NOT EVALUATED** (`enabled !== true`): the disable arm PURGES the store's
// row and registers nothing (`DEF-2026-10-20-F`; `withdrawStanding` above), and the declaration that governs
// it says *"disabling cannot fire — nothing runs"* — so a reversal is not the act that wakes it.
//
// **THE EVALUATION'S CONTEXT IS THE REGISTRATION INSTANT'S OWN FIVE MEMBERS** (`kernel-surface.md §2.3` item
// 1's clause of 2026-10-17, `registrationContext` in `kernel-registration.mjs`): `address` the pair's own,
// `tier` ABSENT spelled `null`, `value` THE STORE'S CURRENT VALUE **READ AND NOT LANDED**, `attempt` `null`
// (no attempt stands at a reversal's judgement) and `op` `null` (the reversal is not a landing). **The
// `value` is taken by the store's own `read` at the pair's address with the tier argument OMITTED — the very
// `readCurrent` route the registration instant takes — and an `AddressNotFound` answers `undefined`**, that
// clause's own absence arm, rather than a code in a `Value` slot.
//
// **THE OUTCOME ARMS ARE `PAR-C-5`'S CLOSED THREE, read as the pass reads them**: `true` is the pass arm; any
// other return is the violation arm (`a body that answers a value outside the three arms is READ AS the
// `{message}` arm and never as an arm of its own`). **AND THE FIRST VIOLATING PAIR DECIDES AND THE SECOND IS
// NOT EVALUATED** (`attempt-lifecycle.md §2.4` item 5 (ii)–(iii)): the pairs are walked in `D-39`'s
// REGISTRATION SEQUENCE — the order `constraints()` promises — so which pair is "first" is a declared order
// and not a `Map`'s insertion accident.
//
// **THE REFUSAL'S FORM IS THE SURFACE'S ONE, AND ITS `status` IS THE SET'S RANK-`20` MEMBER** — the same
// `CONSTRAINT_PASS_REFUSED` this file's `constraintCrossing` selects for a `KC`-tokened write refusal
// (`DEF-H`), because `D-38` says ONE member serves both arms: *"a refused reversal is a refusal"*. **THE
// MESSAGE IS THE STORE'S OWN GENERATED SENTENCE** (`addon_.errorMessage`, whose `§8.2` clause for this code of
// 2026-10-26 is *"… was refused by a constraint pass, the state this act would leave is not one the
// registered constraints admit"*) — `DD-52` forbids a code's message from a second source, so none is
// authored here — **and the `log` is ONE `constraint-check` entry of the kernel's own six members**
// (`kernel-surface.md §2.5` item 1: `seq` · `kind` · `id` · `message` · `opId` · `state`) **naming the
// constraint that refused and the state it refused.** **NO `KC` TOKEN CROSSES** (`A120` (2);
// `docs/specs/storeroom-js/surface.md §2.12` item 3 item 2): `state` is `null` and the sentence is where the
// state is named.
//
// **A LAWFUL REVERSAL IS UNCHANGED, MEMBER FOR MEMBER** — same `{opId, undoneOps, restoredTo}`, no throw, no
// log and no new member — and **a tree carrying no pair at all reaches no read and no body** (`constraints()`
// answering `[]` is the same fact read the other way).

/// **WHETHER THE STORE IS AT REST — NO OPEN COMMIT AND NO OPEN ATTEMPT — THE ONE INSTANT A REVERSAL'S
/// TERMINAL STATE IS THE STATE THAT WILL STAND.**
///
/// **⟶ SUPERSEDED IN PART 2026-10-26 (`ANNOTATE-BESIDE`): THE CLAUSE BELOW NAMED *ONE* MEASUREMENT AND THE
/// DISCRIMINATOR NOW TAKES TWO — see *"THE CONJUNCTION"* at the foot of this clause, which is where the
/// correction stands. EVERY BYTE BETWEEN HERE AND THERE STANDS AS THE READING OF ITS OWN DATE and is read
/// THROUGH that paragraph: no sentence below is withdrawn, and the paragraph it is corrected by is the one
/// added.**
///
/// **THIS GATE IS `D-38`'S OWN REASONING AND NOT A CONVENIENCE.** The ruling judges a reversal AT THE STATE IT
/// LEAVES and refuses a per-step check because *"an unwinding composition passes through intermediate states no
/// constraint would approve"*. **A reversal performed INSIDE an open commit is exactly such a step**: the
/// window that is open will move the state again before the client sees anything — the kernel's own failing
/// attempt reverses at its floor (`kernel-terminal.mjs`'s `composeRollback`, `D-40`'s ONE call), a repair's
/// landing writes again, a pass continues — so the state such a reversal leaves is NOT the state that stands,
/// and judging it would (i) judge an intermediate state, (ii) invoke a caller's constraint body a second time
/// in the middle of the attempt that is already evaluating it, and (iii) break the arm `D-40` declares, whose
/// failing attempt is DEFINED to leave *"the store exactly as it found it"* — a state a registered constraint
/// has already approved, or the attempt would not have started from it.
///
/// **SO THE JUDGEMENT IS THE AT-REST REVERSAL'S**: a caller's `rollback` at the surface, where the store owns
/// no open attempt and the state the reversal leaves is the state the caller then reads. **THE COUNT IS SPENT
/// WITHOUT TOUCHING ANYTHING** (`finalizer-and-teardown.md §4.2` item 1's *"a pure READ"*: no state, no code,
/// no journal entry, no file), and it is READ OFF A FIELD THIS FILE ALREADY HOLDS rather than called out to a
/// product member that may be absent, forged or throwing.
///
/// **⟶ AND THE MEASUREMENT MOVED 2026-10-26: THE KERNEL'S OWN RECORD ANSWERS IT.** The bytes that stood here
/// read the declared seam on the instance —
/// `instance[Symbol.for('provident-storeroom.attempt-count')]()` (`finalizer-and-teardown.md §4.2` item 1,
/// installed by `state.mjs`'s `installAttemptSeam`) — through a `typeof` guard and a `try`/`catch` that
/// answered `false` (a STEP, unjudged) where the channel was absent or the read threw. **THAT IS A MEASUREMENT
/// THAT CAN FAIL, ON A DISCRIMINATOR THAT MUST NOT FAIL**: its conservative fallback buys a MISSED judgement,
/// and a TERMINAL reversal going unjudged is `DEF-W`'s promise silently not delivered — the silent skip is
/// exactly the shape `D-21` forbids, and nothing said so. **THE PACKAGE HOLDS A BETTER SOURCE FOR THE SAME
/// FACT, AND IT IS THE JUDGEMENT'S OWN AUTHORITY**: `D-46` makes the kernel the instance's own, `D-30` puts
/// the attempt records in the record `kernelFor(store)` creates, and **`kernel.live` — that record's map of
/// OPEN attempts, the hold `K-2` places an attempt in and the terminal act's `release` removes it from
/// (`kernel-foundations.mjs`'s `kernelFor`, `kernel-terminal.mjs`'s `release`; `KC-7`'s hold) — IS the count of
/// open attempts.** So the discriminator reads a FIELD, not a call: **no channel, no `typeof` guard and no
/// `catch` remain**, and there is no branch that can quietly answer "a step" for a reversal that stands at
/// rest.
///
/// **THE SEMANTICS ARE UNCHANGED, MEMBER FOR MEMBER**: `0` open attempts ⇒ AT REST ⇒ the watch is taken and the
/// reversal is judged; ANY OTHER COUNT ⇒ a step ⇒ `reversalWatch` answers `[]`, no read is taken and no body
/// is invoked. **AND NO LAWFUL CALL REACHES THIS POINT WITH NO KERNEL AT ALL**: `state.constraints` is
/// populated by `carryConstraint` alone, whose one act is `kernel.register` — which calls `kernelFor` — so a
/// tree that carries a pair carries the record the count is read off; and `kernelFor`'s create-on-miss arm
/// answers the default empty record on any store the slot is not yet defined on.
///
/// **⟶ THE CONJUNCTION, 2026-10-26 — *"AT REST" = NO OPEN COMMIT AND NO LIVE ATTEMPT, AND THIS PARAGRAPH IS
/// THE CORRECTION THE ONE ABOVE IS READ THROUGH.** The paragraph above re-sourced the count onto
/// `kernelFor(instance).live.size` and called that map *"THE count of open attempts"* — which it is — and
/// then read it as *the* at-rest test, **WHICH LOOSENED THE CLAUSE WHILE MAKING THE DISCRIMINATOR
/// UNFAILABLE.** The two structures it could have read measure DIFFERENT THINGS, and the clause's own words
/// name the first of them:
///   * **AN OPEN COMMIT IS A SCOPE** — `state.mjs`'s channel answers `attemptIndex(instance).open`, a DEPTH
///     COUNTER over the store's in-flight verb windows: a verb that finds an extant commit JOINS it rather
///     than opening a second, which is what keeps the count exact under nesting, and an observer fires once
///     per commit that OPENS. It is the structure `§2.6` item 1 means by *"where the store owns no open
///     commit"*, and the surface's own acts hold it open while they run (`listener delivery` inside a
///     `write`'s window is the measured instance).
///   * **A LIVE ATTEMPT IS A RECORD** — `kernel.live`, `live.set` at `K-2`, `live.delete` at `release`,
///     carrying the pair evaluations, the log, the ops and the `KC` tokens. It is the structure the kernel's
///     own `K-2`/`K-3` route leaves live.
/// **THEY DIVERGE IN BOTH DIRECTIONS, AND EACH DIRECTION IS A WINDOW THIS FILE MUST NOT JUDGE IN**: a
/// listener body inside the caller's `write` sees **open commit `1`, live `0`**; a kernel-driven `K-2`/`K-3`
/// pass sees **open commit `0`, live `1`**. **So reading `live` alone JUDGED INSIDE THE CALLER'S OWN VERB
/// WINDOW — the very thing `§2.6` item 1 forbids** — and the ground is the CLAUSE'S REASON and not a
/// measurement of convenience: judging a step *"would invoke bodies mid-attempt and break `D-40`'s 'leaves
/// the store exactly as it found it'"* (`§2.6` item 1). A verb window is in flight whatever its attempt map
/// says, and its state is not the state that stands.
/// **SO THE DISCRIMINATOR ANSWERS *AT REST* IFF BOTH ARE ZERO**, which matches the clause's words and its
/// reason at once, **AND IT STILL CANNOT FAIL**: the open-commit count is taken through `state.mjs`'s
/// exported `openCommits(store)` — a PLAIN ACCESSOR over the same index the channel reads, NOT the channel
/// itself — so there is no callable on the product to lose, and it creates its index on miss exactly as
/// `kernelFor` creates its record, so it cannot answer `undefined`. **NO `typeof` GUARD, NO `try`/`catch` AND
/// NO FALLBACK BRANCH STANDS IN THIS DISCRIMINATOR**: both readings below are numbers on every path, and a
/// lawful call cannot quietly answer "a step" for a reversal that stands at rest. **THE SEMANTICS ARE
/// UNCHANGED**: at rest ⇒ judge; otherwise ⇒ the watch answers `[]`, no address is read and no body is
/// invoked.
function reversalAtRest(instance) {
  // **TWO MEASUREMENTS, BOTH MUST BE ZERO, AND EITHER ONE IN FLIGHT IS A STEP.** `openCommits` is the
  // store's own in-flight verb windows (`state.mjs`, create-on-miss — never `undefined`) and
  // `kernelFor(instance).live.size` is the record's own map of open attempts (`D-30`, own `size`). No
  // failure mode exists on either read, so there is nothing to guard and no branch that can skip a
  // judgement.
  return openCommits(instance) === 0 && kernelFor(instance).live.size === 0;
}

/// **THE WATCH — THE PRE-REVERSAL STANDING OF EVERY ENABLED PAIR'S EVERY ADDRESS**, taken before the addon's
/// `rollback` entry is called. **IT IS A LIST OF `{entry, address, before, beforeTier, beforeTiers}` AND
/// NOTHING ELSE**: the entry is the pair's own record (so the judgement needs no second lookup and no registry
/// read after the reversal), the address is the pair's own segment array (never a copy, never mutated here)
/// and the standing is what the store held when the reversal was asked for.
///
/// **⟶ AND THE WATCH CAPTURES THE TIER AND NOT ONLY THE VALUE, 2026-10-27 — `D-41` ITEM `2`, MEASURED.** The
/// list this clause declares was `{entry, address, before}` and `before` was the CROSS-TIER read alone, so the
/// restore could not know **where** the value stood and put everything back at `mem` (`restoreReversal` below
/// states what that cost). **THE TIERS ARE THREE AND RANKED `file` > `mem` > `temp`** (`src/records.rs`'s
/// `Tier`), **the zero-tier `read` answers the LOWEST-tier version present at each key** (`src/store.rs`'s
/// `select_member`), **and the tier argument narrows that same read to one tier** (`src/args.rs`'s
/// `read_tier_sel`) — so the watch takes the standing the judgement reads
/// AND one narrowed read per tier:
///   * **`before`** is the same cross-tier standing it always was (the judgement's subject and the "touched"
///     test are unchanged, `sameStanding`);
///   * **`beforeTiers`** is every tier at which the address STOOD, captured in the store's canonical
///     `file` · `mem` · `temp` order, each with the value that tier answers — **the exact state a restore has
///     to put back**, one write per tier, and the only way a value at `file` survives;
///   * **`beforeTier`** is the tier the cross-tier read drew from (the lowest-rank standing tier), or `null`
///     where the address stood at no tier at all — *"where the value stood"*, spelled once for the message.
/// **THE ABSENT ARM IS THE ZERO-READ'S OWN**: where the cross-tier read refuses, the address stands at no
/// tier, so `before` is `undefined`, `beforeTiers` is `[]` and `beforeTier` is `null` — the state the restore
/// must return the address to by REMOVING what the reversal left there.
///
/// **IT IS EMPTY WHERE THE ENTRY CARRIES NO PAIR**, so the whole judgement — and every read it would take —
/// is skipped for the overwhelming majority of `rollback` calls, and a store that never registered a
/// constraint answers exactly what it answered before `DEF-W` landed.
export function reversalWatch(state, instance) {
  const watched = [];
  if (state.constraints.size === 0) return watched;
  // A REVERSAL INSIDE AN OPEN COMMIT **OR** AN OPEN ATTEMPT IS A STEP AND NOT A TERMINAL STATE — see
  // `reversalAtRest` above (the conjunction of 2026-10-26), which states the ground. The watch answers `[]`
  // there, so no read is taken and no body is invoked.
  if (reversalAtRest(instance) === false) return watched;
  // **THE WALK IS `D-39`'S DECLARED ORDER** — the record's own `registrationSeq`, collected and ordered
  // exactly as `enumerateConstraints` collects and orders its answer — so the pair the judgement reaches
  // FIRST is the pair `constraints()` names first, and not whichever pair a toggle happened to move.
  const carried = [];
  for (const entry of state.constraints.values()) {
    appendOwn(carried, entry);
  }
  carried.sort((left, right) => left.registrationSeq - right.registrationSeq);
  for (let index = 0; index < carried.length; index += 1) {
    const entry = carried[index];
    // THE PAIR'S ELEMENT MUST STAND A REGISTRATION FOR IT TO BE ASKED ANYTHING (`withdrawStanding`'s own
    // predicate, and its own ground: a disabled pair's registry standing is a CARRIAGE fact, not a listener).
    if (entry.enabled !== true) continue;
    for (let position = 0; position < entry.addresses.length; position += 1) {
      const address = entry.addresses[position];
      const captured = captureStanding(instance, address);
      appendOwn(watched, {
        entry,
        address,
        before: captured.before,
        beforeTier: captured.beforeTier,
        beforeTiers: captured.tiers,
      });
    }
  }
  return watched;
}

/// **THE THREE TIER TOKENS, IN THE CANONICAL ORDER A RESTORE MUST WRITE THEM** — `file` · `mem` · `temp`
/// (`src/records.rs`'s `canonical_tiers`, rank DESCENDING). **THE ORDER IS NOT COSMETIC: a write purges every
/// version at `rank ≤ rank(write tier)` at the addressed key** (`src/store.rs`'s `W-6`, the `doomed` filter),
/// **so writing the captured tiers from the most persistent to the least reconstructs a shadow exactly** —
/// `file`, then `mem`, then `temp`: each write purges only what it outranks and therefore cannot destroy a tier
/// already put back.
const STANDING_TIERS = ['file', 'mem', 'temp'];

/// **WHAT STOOD AT ONE ADDRESS, CAPTURED BEFORE THE REVERSAL** — the cross-tier standing the judgement reads
/// (and the "touched" test compares), the tier that standing was drawn from, and every tier at which the
/// address stood with the value that tier answers. **AN ADDRESS THAT STANDS AT NO TIER IS THE ZERO-READ'S OWN
/// ABSENCE**: the cross-tier `read` refuses, no narrowed read is taken, and `tiers` is `[]` — the ONE state the
/// restore returns the address to by removal rather than by a write.
function captureStanding(instance, address) {
  const before = standingAt(instance, address);
  const tiers = [];
  // THE NARROWED READS ARE TAKEN ONLY WHERE SOMETHING STANDS: the zero-tier read cannot succeed at an address
  // that holds an anchor at no tier, so absence is decided once and costs no further read.
  if (before !== undefined) {
    for (let index = 0; index < STANDING_TIERS.length; index += 1) {
      const tier = STANDING_TIERS[index];
      const stood = standingAtTier(instance, address, tier);
      if (stood.stood === true) appendOwn(tiers, { tier, value: stood.value });
    }
  }
  return {
    before,
    // THE TIER THE CROSS-TIER READ DREW FROM — the lowest-rank standing tier, which is the LAST entry of
    // `tiers` because `STANDING_TIERS` is rank-descending — and `null` where the address stood at no tier.
    beforeTier: tiers.length === 0 ? null : tiers[tiers.length - 1].tier,
    tiers,
  };
}

/// **THE JUDGEMENT — THE TERMINAL STATE, ASKED OF EVERY PAIR THE REVERSAL TOUCHED, ONCE.** It answers
/// `undefined` on the lawful arm (**and the caller's record then crosses unchanged**) and THROWS the surface's
/// one plain form on the refusing arm. `reversalId` is the store's own echo of the id the reversal named
/// (`answer.opId` at the member), carried as the refusal's log entry's `opId` so the record names the act.
///
/// **⟶ AND A REFUSAL RESTORES WHAT IT REFUSED, 2026-10-26 — `DEF-W`'s `(a)` CLOSED.** **WHAT WAS MEASURED:**
/// the refusal was thrown AFTER the reversal and the reversal's effect STOOD, so the store ended in a state NO
/// constraint approved — the very state `DEF-W` was filed about. **A refusal that reports the violation while
/// leaving it is not a discharge.** The watch has already taken `{entry, address, before}` for every enabled
/// pair's every address BEFORE the addon's reversal (`reversalWatch`), so the pre-reversal standing is in hand:
/// **every address this reversal MOVED is restored to the standing it held before the reversal, THEN the refusal
/// is thrown and its log says the reversal was undone** — so a consumer learns the store is back where it
/// started and not left holding the state the judgement refused.
///
/// **AND THE RESTORE IS NOT JUDGED AND RECURSES INTO NOTHING** (`restoreReversal` below states both): it is a
/// COMPENSATING ACT and not a consumer write, it reaches the store verb at its entry — no `K-2`, no pass, no
/// listener delivery and no second `rollback` — and every address it touches is one the watch already read.
///
/// **⟶ AND A JUDGEMENT THAT CANNOT COMPLETE FAILS CLOSED, 2026-10-27 — `D-41` ITEM `4`, MEASURED.** A pair body
/// that THREW at this judgement used to propagate out of this function **with the reversal's effect STANDING and
/// the refusal's `log` `[]`**: the reversal had already happened, so the store was left at the very state nobody
/// could judge and the consumer was told nothing about it. **A reversal nobody could judge is a reversal nobody
/// could approve**, so the throwing arm is treated as the violating arm: **every address the reversal moved is
/// restored, and the call refuses with a log that NAMES THE THROWING PAIR** — the same treatment a violation
/// gets. The crossed code stays the body's own rank-`18` member (`ConstraintBodyThrew`, the code that says what
/// actually happened: a body threw), while the treatment — restore, one log entry naming the pair, one plain
/// form — is the violation's.
export function judgeReversal(instance, watched, reversalId) {
  // THE MOVED SET IS TAKEN FIRST, ONCE: the judgement's subject is the CHANGE the reversal made and nothing
  // wider, and the same list is what a refusal has to put back — with the tier capture the watch took, so a
  // restore knows WHERE each value stood and not merely what it was.
  const moved = [];
  for (let index = 0; index < watched.length; index += 1) {
    const one = watched[index];
    // THE ADDRESS IS READ AGAIN, AT THE STATE THE REVERSAL LEFT. **A STANDING THIS REVERSAL DID NOT MOVE IS
    // NOT A STANDING IT LEFT**, so the pair is not asked and cannot refuse the reversal for a state the
    // reversal found.
    const after = standingAt(instance, one.address);
    if (sameStanding(one.before, after) === true) continue;
    appendOwn(moved, {
      entry: one.entry,
      address: one.address,
      before: one.before,
      beforeTier: one.beforeTier,
      beforeTiers: one.beforeTiers,
      after,
    });
  }
  for (let index = 0; index < moved.length; index += 1) {
    const one = moved[index];
    // **THE BODY'S THROW IS THE JUDGEMENT'S OWN CATCH AND NOT A PROPAGATING VALUE** — `reversalOutcome` converts
    // a body's throwable to the surface's rank-`18` form and re-throws anything unmarked as itself, and BOTH
    // arrive here: the reversal has run, so a judgement that cannot complete restores and refuses (below).
    let outcome;
    try {
      outcome = reversalOutcome(one.entry, one.address, one.after);
    } catch (thrown) {
      const undo = restoreReversal(instance, moved);
      throw reversalRefusal(one, one.after, null, reversalId, undo, thrown);
    }
    if (outcome === true) continue;
    // **THE FIRST VIOLATING PAIR DECIDES AND THE SECOND IS NOT EVALUATED** (`attempt-lifecycle.md §2.4` item 5
    // (ii)–(iii), at the reversal's own instant) — and BEFORE the refusal is built, EVERY address the reversal
    // moved is put back, so the store the consumer meets holds no state this refusal refused.
    const undo = restoreReversal(instance, moved);
    throw reversalRefusal(one, one.after, reversalSaid(outcome), reversalId, undo, null);
  }
  return undefined;
}

/// **THE REFUSAL'S OWN UNDOING — THE STORE RETURNS ITS OWN STATE TO ITS JOURNAL MARK, AND THE WATCH SAYS WHAT
/// STOOD AGAIN.** **⟶ REWRITTEN 2026-10-27 (THE ARCHITECT'S RULING): `restoreReversal` NO LONGER WRITES
/// ANYTHING.** It calls ONE store verb — `restoreMark`, the journal's second consumer beside `rollback`, reached
/// at the boundary's own entry exactly as `rollback` is — and the STORE decides what the pre-reversal state was,
/// from ITS OWN RECORD.
///
/// **WHY THE CAPTURE-AND-WRITE IS GONE, STATED AS THE MEASUREMENT THAT RETIRED IT.** The restore used to
/// reconstruct the state ADDRESS BY ADDRESS and TIER BY TIER from what a READ draws: the watch's per-tier
/// readings of each enabled pair's address. That cannot rebuild a shadow INSIDE a subtree (a version standing
/// one level BELOW the pair is captured only inside its parent's assembled value, so writing that value back at
/// the parent's tier moves the descendant's tier with it), and it cannot cross the store's monotonicity clause
/// (a `file` version cannot be written back under a parent the reversal left at `mem`). **And it rewrote BY HAND
/// what the store can REPLAY EXACTLY**: the journal records every operation's address, its before AND its after,
/// per version and per tier, and `restoreMark` re-states that record (`src/store.rs`'s `§6.6` is the primitive's
/// declaration). The two shapes the capture could not reach are the two cells added to
/// `tests/e2e/refused-reversal-restore.test.mjs` — the MIXED-DEPTH SHADOW and the HIGHER-TIER/PARENT case —
/// and both were RED under the capture-and-write.
///
/// **THE MARK IS THE JOURNAL'S HEAD, AND IT IS NAMED BY SUPPLYING NO POSITION.** A reversal appends no entry
/// (`src/store.rs`'s `rollback`), so after the reversal ran the journal's head still describes the state that
/// stood BEFORE it — the state this act owes back. The call therefore passes NO position at all, which the
/// boundary's own codec folds to the carrier's ABSENT arm (`crossing.md §1.3`): the store's own spelling for
/// *"the head"*.
///
/// **WHAT THE CAPTURE SURVIVES AS, AND WHY IT IS NOT A FALLBACK.** `reversalWatch`'s per-tier capture is still
/// taken, and it is the ONLY record of **what was owed** — it is the DEBT'S RECORD and the VERIFICATION
/// BASELINE, not a write plan. Every address the reversal moved is read again after the store's act
/// (`standingVerdict`), and the count and the failures below are read from THAT — so `UNDONE` is claimed only
/// where each moved address demonstrably stands again with the values and the tiers it held, which is the
/// honesty `D-41` item `2` measured at `200` of `200`. **NO WRITE AND NO DELETE IS ISSUED BY THIS FUNCTION ON
/// ANY ARM**; the store's own verb is the whole act.
///
/// **AND WHY IT CANNOT RECURSE INTO THE MEMBER.** `judgeReversal` is reached from `index.mjs`'s `rollback`
/// member; the restore never calls that member, the addon's `rollback`, or any package member — only the store's
/// `restoreMark` at its entry — so the judgement's ONE pass over the pairs stays one pass and `D-40`'s floor law
/// is not re-walked. **NO `K-2` OPENS, NO PASS RUNS, NO LISTENER IS DELIVERED AND NO PAIR BODY IS ASKED A SECOND
/// TIME**: the store's primitive appends no entry, fires no trigger and reads no constraint.
///
/// **WHERE THE STORE ITSELF REFUSES, THIS SAYS SO AND WRITES NOTHING.** `restoreMark` refuses in the store's own
/// declared form (`JournalOpUnknown`) for a mark its journal no longer holds, and the state it holds at that
/// instant is the state it keeps. The refusal is carried into the message `undoSpelling` builds, so a consumer
/// is told the store refused and is never told a restoration happened that did not.
function restoreReversal(instance, moved) {
  const addon_ = withAddon();
  // THE ONE ACT: the store returns its own state to the state its journal's head describes. NO POSITION IS
  // SUPPLIED — the boundary's codec folds an unsupplied position to the carrier's ABSENT arm, which is the
  // store's own spelling for the head (`rollback`'s own absent-position rule, `crossing.md §1.3`).
  let refused = null;
  try {
    Reflect.apply(addon_.restoreMark, instance, []);
  } catch (why) {
    refused = why;
  }
  let restored = 0;
  const failed = [];
  // ONE VERIFICATION PER ADDRESS: two pairs over one address (or one pair naming it twice) must not be counted
  // twice, so the addresses already measured are remembered — by a local loop, never by `Array.prototype.includes`
  // on a refusal path (`contract.md §2.1`'s clause on `F8-2` and item `(2b)`'s row `54`).
  const measured = [];
  for (let index = 0; index < moved.length; index += 1) {
    const one = moved[index];
    const key = homeAddressKey(one.address);
    if (hasOwnSpelling(measured, key) === true) continue;
    appendOwn(measured, key);
    // **THE ADDRESS IS READ AGAIN, AGAINST THE CAPTURE** — the cross-tier standing and every tier with its own
    // value — and it counts as restored ONLY where both equal what the watch took before the reversal.
    const verdict = standingVerdict(instance, one);
    if (refused === null && verdict.exact === true) {
      restored += 1;
      continue;
    }
    // AN ADDRESS THAT DOES NOT STAND AGAIN IS NAMED, WITH WHAT STANDS THERE INSTEAD AND WHAT IT WAS OWED, so the
    // consumer is never told the store was put back when it was not.
    appendOwn(failed, {
      address: one.address,
      before: one.before,
      beforeTier: one.beforeTier,
      beforeTiers: one.beforeTiers,
      standing: verdict.value,
      tiers: verdict.tiers,
    });
  }
  return { restored, total: measured.length, failed, refused };
}

/// **WHETHER A LOCAL LIST OF SPELLINGS ALREADY HOLDS ONE** — a local index loop and not `Array.prototype.includes`.
function hasOwnSpelling(spellings, spelling) {
  for (let index = 0; index < spellings.length; index += 1) {
    if (spellings[index] === spelling) return true;
  }
  return false;
}

/// **THE ADDRESS AS IT STANDS NOW, MEASURED AGAINST WHAT THE WATCH CAPTURED** — the check that turns "the
/// restore ran" into "the restore LOOKED": the cross-tier standing, every tier that stands with its value, and
/// `exact` only where the standing equals the captured one AND the tier set with its per-tier values equals the
/// captured set. **A capture of no tier requires ABSENCE** (`value === undefined`), which is the state an
/// address that stood at no tier is owed.
function standingVerdict(instance, one) {
  const value = standingAt(instance, one.address);
  const tiers = [];
  for (let index = 0; index < STANDING_TIERS.length; index += 1) {
    const tier = STANDING_TIERS[index];
    const stood = standingAtTier(instance, one.address, tier);
    if (stood.stood === true) appendOwn(tiers, { tier, value: stood.value });
  }
  if (one.beforeTiers.length === 0) {
    return { exact: value === undefined && tiers.length === 0, value, tiers };
  }
  if (sameStanding(value, one.before) === false) return { exact: false, value, tiers };
  if (tiers.length !== one.beforeTiers.length) return { exact: false, value, tiers };
  for (let index = 0; index < tiers.length; index += 1) {
    if (tiers[index].tier !== one.beforeTiers[index].tier) return { exact: false, value, tiers };
    if (sameStanding(tiers[index].value, one.beforeTiers[index].value) === false) {
      return { exact: false, value, tiers };
    }
  }
  return { exact: true, value, tiers };
}

/// **THE SENTENCE THE LOG CARRIES ABOUT THE UNDOING** — the refusal's own record of the compensating act, read
/// at the ONE site that builds the log entry. **IT MAY CLAIM *"THE REVERSAL WAS UNDONE"* ONLY WHERE EVERY ADDRESS
/// IT MOVED STANDS AGAIN EXACTLY AS IT STOOD** (`restoreReversal`'s verdict); where it cannot, **it names each
/// address that could not be restored and says what stands there INSTEAD and what it was owed** (`D-41` item `2`:
/// *"a message must not claim a restoration that did not happen"*). `DEF-Q`: no column prints `undefined`.
function undoSpelling(undo) {
  // **⟶ AND WHERE THE STORE ITSELF REFUSED THE MARK, THE SENTENCE OPENS WITH THAT** (2026-10-27): the act is the
  // store's own (`restoreReversal`), so a refusal it answered is the FIRST thing a consumer must hear — its
  // status and its own generated message (`DD-52`) — and it is never spoken for by a claim about the state.
  let refusal = '';
  if (undo.refused !== null && undo.refused !== undefined) {
    // READ AS OWN DATA MEMBERS AND OFF NO CHAIN (`D-35`'s read half): the store's own plain refusal carries
    // `{status, message}` and nothing else, and a thrown value that is not an object is named as itself.
    const carried = typeof undo.refused === 'object';
    const status = carried === true ? ownDataMember(undo.refused, 'status') : undefined;
    const said = carried === true ? ownDataMember(undo.refused, 'message') : undefined;
    refusal = `the store REFUSED the journal mark (${JSON.stringify(typeof status === 'string' ? status : 'a refusal')}`
      + `: ${typeof said === 'string' ? said : ''}) and holds the state it held; `;
  }
  if (undo.failed.length === 0) {
    return `${refusal}the reversal was UNDONE: every address it moved stands again exactly as it stood before `
      + 'the reversal — the same value at the same tier, or absent where it was absent';
  }
  let named = '';
  for (let index = 0; index < undo.failed.length; index += 1) {
    const one = undo.failed[index];
    named += index === 0 ? '' : '; ';
    named += `${JSON.stringify(one.address)} could not be restored and stands `
      + `${standingDescription(one.standing, one.tiers)} where it stood `
      + `${capturedDescription(one)} before the reversal`;
  }
  const moved = undo.total === 1 ? 'address' : 'addresses';
  const still = undo.restored === 1 ? 'stands' : 'stand';
  return `${refusal}the reversal was NOT undone at every address it moved (${undo.restored} of the `
    + `${undo.total} ${moved} it moved ${still} again): ${named}`;
}

/// **A STANDING AS A SENTENCE — WHAT VALUE, AT WHICH TIER, OR ABSENCE** (`DEF-Q`: no column prints `undefined`).
function standingDescription(value, tiers) {
  if (tiers.length === 0) {
    return value === undefined
      ? 'at no value and no tier (absent)'
      : `at the value ${standingSpelling(value)} and at no tier this act can name`;
  }
  let spelled = 'at ';
  for (let index = 0; index < tiers.length; index += 1) {
    spelled += index === 0 ? '' : ' and ';
    spelled += `tier \`${tiers[index].tier}\` holding ${standingSpelling(tiers[index].value)}`;
  }
  return spelled;
}

/// **THE CAPTURED STANDING AS THE SAME SENTENCE — what the address was owed**, tier by tier with each tier's own
/// value (so a shadow's two versions are both named and neither is spoken for the other). **AND WHERE IT STOOD
/// AT MORE THAN ONE TIER, THE TIER THE CROSS-TIER READ DREW FROM IS NAMED BESIDE THEM** — the watch's
/// `beforeTier`, which is what the consumer's own `read` would have answered at that instant.
function capturedDescription(one) {
  const tiers = one.beforeTiers;
  if (tiers.length === 0) return 'at no value and no tier (absent)';
  let spelled = 'at ';
  for (let index = 0; index < tiers.length; index += 1) {
    spelled += index === 0 ? '' : ' and ';
    spelled += `tier \`${tiers[index].tier}\` holding ${standingSpelling(tiers[index].value)}`;
  }
  if (tiers.length > 1) {
    spelled += ` (the cross-tier read answered tier \`${one.beforeTier}\`)`;
  }
  return spelled;
}


/// **THE STORE'S STANDING AT ONE ADDRESS, READ AND NOT LANDED** — the kernel's own `readCurrent`
/// (`kernel-registration.mjs`), member for member: **the zero-tier call on the product's own `read` member**
/// (the ONE route rule `contract.md §2.9` item 2 declares: a package-side reader reaches a store verb the way
/// a caller does), and **`undefined` where that read refuses** — `AddressNotFound` being the state a fresh
/// pair is registered at and no code being put in a value slot (`DD-12`).
function standingAt(instance, address) {
  try {
    return instance.read(address);
  } catch (refused) {
    return undefined;
  }
}

/// **THE STORE'S STANDING AT ONE ADDRESS NARROWED TO ONE TIER — THE SAME ROUTE, ONE ARGUMENT FURTHER** (the
/// `read` member's declared tier position, `a.read(address, tier?)`; `src/args.rs`'s `read_tier_sel` admits ONE
/// token and answers that tier's version). **`stood: false` is the tier's own absence** — `TierNotFound` where
/// the key holds no version at that tier, `AddressNotFound` where it holds none at all — and **`stood: true` with
/// the value is what that tier answers**, which is the capture a tier-exact restore writes back.
///
/// **AND THE REFUSAL'S OWN CODE IS NOT READ HERE**: a tier probe asks one question — does this tier stand? — and
/// every refusal to it answers the same thing, so no code is put in a value slot on this path (`DD-12`).
function standingAtTier(instance, address, tier) {
  try {
    return { stood: true, value: instance.read(address, tier) };
  } catch (refused) {
    return { stood: false, value: undefined };
  }
}

/// **WHETHER TWO STANDINGS ARE THE SAME STATE** — the comparison the word "touched" is decided by. **IT IS
/// STRUCTURAL AND IT IS TAKEN ON THE STORE'S OWN DECODED VALUES**, which the crossing admits as JSON values
/// (`docs/specs/storeroom-json-crossing/`): `Object.is` for the primitives, then `length` and index for the
/// arrays and **own keys, by `[[GetOwnProperty]]` and never by a chain read** (`D-35`'s read half) for the
/// objects. A state that differs only in key ORDER is the SAME state, which is what the store's own JSON
/// values mean; a value at a DIFFERENT DEPTH is a different state.
function sameStanding(left, right) {
  if (Object.is(left, right) === true) return true;
  if (left === null || right === null) return false;
  if (typeof left !== 'object' || typeof right !== 'object') return false;
  const leftIsArray = Array.isArray(left);
  if (leftIsArray !== Array.isArray(right)) return false;
  if (leftIsArray === true) {
    if (left.length !== right.length) return false;
    for (let index = 0; index < left.length; index += 1) {
      if (sameStanding(left[index], right[index]) === false) return false;
    }
    return true;
  }
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    if (Object.hasOwn(right, key) === false) return false;
    if (sameStanding(ownDataMember(left, key), ownDataMember(right, key)) === false) return false;
  }
  return true;
}

/// **ONE MEMBER OF A VALUE, READ AS AN OWN DATA PROPERTY OR NOT AT ALL** — `[[GetOwnProperty]]`'s answer, the
/// same read `refusal.mjs`'s `ownMember` takes and for the same reason (`D-35`'s read half): a `[[Get]]` walks
/// the chain, and this package builds no verdict out of a prototype it does not own.
function ownDataMember(value, name) {
  const descriptor = Object.getOwnPropertyDescriptor(value, name);
  if (descriptor === undefined || !Object.hasOwn(descriptor, 'value')) return undefined;
  return descriptor.value;
}

/// **THE ONE EVALUATION A REVERSAL TAKES OF ONE PAIR** — the five-member `AttemptContext` at its registration
/// instant's spellings (`kernel-surface.md §2.3` item 1's clause of 2026-10-17), built at one site:
/// `address` the pair's own FRESH copy (`slice`, the registration context's own form), `tier` and `op` `null`,
/// `attempt` `null` and `value` THE STATE THE REVERSAL LEFT.
///
/// **A BODY THAT THROWS IS THE SURFACE'S RANK-`18` `ConstraintBodyThrew`, NOT A RAW HOST ERROR** (`DEF-S`'s
/// ruling, `D-38`; `src/error.rs`'s `[&str; 20]` rank `18`): the mark the kernel sets at its own three frames
/// (`markBodyThrow`) is spelled on this side under the same `Symbol.for` key — so the value crosses through
/// `bodyThrowRefusal` and this surface's ONE form. **WHERE THE TREE CARRIES NO USABLE GENERATOR THE BODY'S OWN
/// VALUE CROSSES AS ITSELF**, which is the safe direction `registrationCrossing` already takes and the one
/// `fail-surface.md §1.1` item 5 declares for a body's throwable.
///
/// **⟶ AND THE THROWN VALUE NO LONGER ESCAPES THE JUDGEMENT UNCOMPENSATED, 2026-10-27 (`D-41` item `4`;
/// ANNOTATE-BESIDE).** The clause above read *"with `log: []` (no attempt stands at a reversal's judgement)"*,
/// and the throw then propagated out of `judgeReversal` **with the reversal's effect standing and `log` `[]`** —
/// measured: the store held the state nobody could judge and the consumer was told nothing had been undone. **The
/// conversion here is unchanged and is the CATCHER'S**: `judgeReversal` catches what this function throws (the
/// converted rank-`18` form, or the body's own value where no generator stands), restores, and refuses with a log
/// that names this pair — so the empty log this clause named as the arm's fact is superseded by the judgement's
/// own arm, and no byte of the conversion moves.
function reversalOutcome(entry, address, value) {
  const context = {
    address: address.slice(),
    tier: null,
    value,
    attempt: null,
    op: null,
  };
  try {
    return entry.fn(context);
  } catch (body) {
    const carried = Object.create(null);
    // THE TWO SLOTS THE KERNEL'S OWN MARK CARRIES (`kernel-foundations.mjs`'s `markBodyThrow`): the pair's
    // address spelling joined by `/`, and the log as it stood when the body threw — `[]` here, because no
    // attempt stands at a reversal's judgement.
    carried.address = addressSpelling(address);
    carried.log = [];
    const converted = bodyThrowRefusal(carried);
    throw converted === null ? body : converted;
  }
}

/// **THE VIOLATION'S OWN SENTENCE WHERE THE BODY SUPPLIED ONE** — the `{message}` arm's text, read as the
/// pass reads it (own member, `D-35`), and `null` for every return outside the three arms, whose own sentence
/// this arm does not invent (`the constraint that refused` is named by the log entry's `id` regardless).
function reversalSaid(outcome) {
  if (outcome === null || typeof outcome !== 'object') return null;
  const said = ownDataMember(outcome, 'message');
  return typeof said === 'string' && said.length > 0 ? said : null;
}

/// **THE REFUSAL ITSELF — THE SURFACE'S ONE PLAIN FORM** (`surface.md §2.5` items 1–4 and item 9: a THROWN
/// plain object literal of exactly `{status, message, log}`). **THE `status` IS THE SET'S RANK-`20` MEMBER**
/// (`CONSTRAINT_PASS_REFUSED` above; `src/error.rs`'s `[&str; 20]`), **THE `message` IS THE STORE'S OWN
/// GENERATED SENTENCE** at the pair's own `<SEGMENT>` slot (`addon_.errorMessage` — `DD-52` forbids a second
/// source, so nothing is authored here; the fixed sentence below is reached only on a tree whose generator is
/// unusable, which is the same arm `constraintCrossing` answers with a fixed sentence), **and THE `log` IS ONE
/// `constraint-check` ENTRY NAMING THE CONSTRAINT AND THE STATE IT REFUSED.**
///
/// **THE ENTRY IS BUILT HERE AND NOT BY THE KERNEL, AND THE ODD MEMBER IS SAID PLAINLY: no attempt stands at
/// a reversal's judgement**, so there is no attempt log to carry verbatim (`§2.5` item 3's `log` is *"the
/// attempt's own message log"*).
///
/// **⟶ AND THE ENTRY CARRIES FIVE MEMBERS AND NOT SIX, 2026-10-27 — `D-41` ITEM `4`, ANNOTATE-BESIDE.** The
/// clause above read *"The six members, their `constraint-check` kind and their `seq` ordinal are the kernel's
/// own shape"* and the entry minted `seq: 1`; **THAT `1` WAS FABRICATED AND HAS NO RECORD BEHIND IT.** The
/// kernel's `seq` is the ORDINAL WITHIN AN ATTEMPT'S OWN LOG (`kernel-foundations.mjs`'s `append`:
/// `attempt.log.length + 1`, withdrawn entries renumbered) — **and no attempt stands at a reversal's judgement,
/// so there is no log whose ordinal this is and no member of any record here that it could be read from.**
/// `contract.md §2.6` item 4's clause of 2026-10-26 declared the `1`; **this pass does not mint it.** The entry
/// therefore carries the other five members — `kind` · `id` · `message` · `opId` · `state` — and **no `seq` at
/// all**: the honest form of a record whose ordinal is unknown is an absent member, never a number invented for
/// it (`D-21`: a member that did not stand says so).
///
/// **AND IT HAS A SECOND ARM — THE JUDGEMENT THAT COULD NOT COMPLETE (`D-41` item `4`).** Where `thrown` is the
/// value a pair's body threw at this judgement, the entry is the same five-member `constraint-check` naming the
/// same pair, the state the reversal left and the undoing, **and the crossed `status` is the set's rank-`18`
/// member `ConstraintBodyThrew` with the store's own sentence for it** — the code says what happened (a body
/// threw), while the treatment is the violation arm's: the reversal was restored and the pair is named.
/// **WHERE THE THROWN VALUE IS NOT THE KERNEL'S MARKED FORM** (a body's raw throwable on a tree with no usable
/// generator), the same rank-`18` refusal is built here — the restoration and the pair's name cross regardless
/// of the body's own value's class, which is the difference between a compensating act and a conversion.
function reversalRefusal(one, after, said, reversalId, undo, thrown) {
  const addon_ = withAddon();
  // **THE `<SEGMENT>` SLOT IS THE ADDRESS SPELLING THE KERNEL'S OWN REGISTRATION REFUSAL HANDS THE SAME
  // GENERATOR** (`kernel-registration.mjs`'s `registrationRefusal`: the segments joined by `/`, BARE — the
  // generator's own `build` is what prints a string segment single-quoted, so a pre-quoted spelling here
  // would print `''a''`). One spelling, one home, and no second quoting rule.
  const subject = addressSpelling(one.address);
  const status = thrown === null ? CONSTRAINT_PASS_REFUSED : BODY_THREW_STATUS;
  let message = '';
  if (typeof addon_.errorMessage === 'function') {
    const generated = addon_.errorMessage(status, subject, 'constraints');
    if (typeof generated === 'string' && generated.length > 0) message = generated;
  }
  if (message === '') {
    message = thrown === null
      ? 'the reversal was refused by a constraint pass, the state it would leave is not one the registered '
        + 'constraints admit'
      : 'the reversal was refused by a constraint body that threw, the state it would leave could not be judged';
  }
  const entry = {
    kind: 'constraint-check',
    id: one.entry.id,
    // **⟶ AND THE ENTRY SAYS WHAT THE ACT DID, 2026-10-26 (`DEF-W`'s `(a)`) and 2026-10-27 (`D-41` item `2`)** —
    // the refusal's own record, beside the state it refused, so a consumer that catches it knows whether the
    // store stands again where the reversal found it (and is told plainly, and by address, where it does not).
    // ONE ENTRY, FIVE MEMBERS: the sentence is this entry's, and no second log entry and no sixth member is
    // minted.
    message: thrown === null
      ? `the constraint ${one.entry.id} refused the state the reversal left at `
        + `${JSON.stringify(one.address)}: the value there is ${standingSpelling(after)}`
        + (said === null ? '' : ` — ${said}`)
        + ` — ${undoSpelling(undo)}`
      : `the constraint ${one.entry.id} THREW at the judgement of the state the reversal left at `
        + `${JSON.stringify(one.address)}: the value there is ${standingSpelling(after)}`
        + ` — ${undoSpelling(undo)}`,
    // **THE STORE'S OWN ECHO OF THE ID THE REVERSAL NAMED, OR `null`** — the entry's fifth member is always
    // present and of the kernel's own domain (`kernel-surface.md §2.5` item 1: a `string | null`), never absent.
    opId: typeof reversalId === 'string' ? reversalId : null,
    state: null,
  };
  const log = [];
  appendOwn(log, entry);
  // **THE CROSSED `status` IS THE ARM'S OWN AND IS NEVER MINTED** (`DD-40`): rank `20` where a pair refused the
  // state the reversal left, rank `18` where a pair's body threw at the judgement of it (`D-41` item `4`). The
  // sentence beside it was generated for that same code — one source for each (`DD-52`).
  return { status, message, log: refusalLog(log) };
}

/// **THE ADDRESS'S OWN `<SEGMENT>` SPELLING, JOINED BY `/` AND BARE** — the kernel's own
/// (`kernel-registration.mjs`'s `registrationRefusal`, `markBodyThrow`'s `carried.address`), taken by a local
/// index loop so no `Array.prototype.map`/`join` is read off a mutable prototype on a refusal path
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`). A string segment is printed as itself: the
/// generator's `build` is the one place a segment is single-quoted.
function addressSpelling(address) {
  let spelled = '';
  for (let position = 0; position < address.length; position += 1) {
    spelled += position === 0 ? `${String(address[position])}` : `/${String(address[position])}`;
  }
  return spelled;
}

/// **THE STATE A LOG ENTRY PRINTS, SPELLED SO NO `undefined` REACHES A SENTENCE** (`DEF-Q`'s general rule:
/// a message may not print `undefined` for a column the entry carries). A value the crossing admits is a JSON
/// value and spells as itself; an address holding nothing says so; and a value this judgement cannot spell at
/// all says THAT rather than throwing out of a refusal path.
function standingSpelling(value) {
  if (value === undefined) return 'no value (the reversal left nothing at that address)';
  try {
    const spelled = JSON.stringify(value);
    return typeof spelled === 'string' ? spelled : 'a value this judgement cannot spell';
  } catch {
    return 'a value this judgement cannot spell';
  }
}
