// `D-2` (`docs/L1/entry-subdivision.md` §1 part `8`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { appendOwn, fail, refusalLog } from './refusal.mjs';
import { withAddon, require_ } from './artefact.mjs';
import { classSpelling, isAdmittedArray, isPlainObjectValue } from './class-decision.mjs';
import { constraintAddress } from './frame.mjs';
import { currentWindow, homeAddressKey, installRestartConsumer, isStoreReceiver, openCommits, closeCommit, openCommit, windowMark } from './state.mjs';
// **THE KERNEL'S OWN RECORD, FOR ONE FIELD AND ONE ONLY** (`D-46`/`D-30`): `kernelFor(store)` answers the
// instance's kernel record — the same accessor every kernel act takes the instance through — and
// `reversalAtRest` below reads that record's own `live` map for the count of OPEN ATTEMPTS. `kernel-foundations`
// carries NO import of its own (`kernel-surface.md §1` item 1's empty-footprint clause), so this reach adds no
// load path, no addon call and no store act; it is a FIELD READ of state the instance already owns, taken the
// way the kernel's four part modules take it.
//
// **⟶ AND `append` FROM 2026-10-27 — THE ONE ORDINAL MINTING SITE, TAKEN FOR THE REPORT'S OWN COPY OF THE
// RESTARTED CHECK'S ENTRY (`carryRestartRefusal`).** The entry that reaches a driver through the closed
// report is IN THE ATTEMPT'S LOG, whose entries carry `seq` ascending from `1` (`kernel-surface.md §2.5` item
// 1; `assertLogEntry`'s own member set). The copy is therefore minted by the kernel's own append — the same
// function the pass appends with — rather than pushed here with a member set of its own; the REFUSAL's own
// list keeps its five members and no `seq`, because no attempt stands at the judgement that built it
// (`D-41` item 4). Two records, two honest forms, one append.
import { append, externalCall, kernelFor, throwableForm } from './kernel-foundations.mjs';
// **⟶ AND THE TWO KERNEL ACTS THE DELETE'S PATH OWES — `D-55` ITEM 3, 2026-10-29.** The kernel's public
// barrel (`src/constraint-kernel.mjs`) is untouched and keeps its five names; **these are two PART modules' own
// acts, reached here the way `append` and `kernelFor` above are** (`kernel-surface.md §1` item 1's empty import
// footprint is the kernel's side of this edge and it is unmoved: neither module imports this file or any entry
// module). `commitRemoval` is the commit part's remove-shaped act — a delete-shaped attempt that lands no write
// — and `runAttempt` is the ONE pass, taken verbatim so no second pass loop is minted for a delete.
import { commitRemoval } from './kernel-commit.mjs';
import { runAttempt } from './kernel-attempt.mjs';
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

/// `fail-surface.md §2` / `kernel-surface.md §2.2`'s `KC-1`…`KC-9`, read HERE for their ONE use: to tell a
/// refusal the KERNEL raised from one a STORE VERB raised, so that `A120` (2) can be applied to the first
/// and not to the second. **NO `KC` SPELLING CROSSES THIS SURFACE** (`docs/specs/storeroom-js/surface.md §2.12` item 1's read-through clause:
/// printed here it would be a second, unowned home for the kernel's own vocabulary).
///
/// **⟶ AND THE LIST MOVES `8 → 9` WITH THE SET ITSELF, 2026-10-28 (`D-53`: *"Open the token set"*).** The ninth
/// member is the SAVE ARM's (`KC-9`, `kernel-foundations.mjs`'s `KC.saveFailed`); **this list must carry it or a
/// kernel refusal carrying `KC-9` in `state` would be read here as a STORE code** and cross converted, which is the
/// one thing this predicate exists to prevent.
const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8', 'KC-9'];

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
    // **`false` — THE REGISTRATION INSTANT RECORDS NOTHING, AND THE CLAUSE SAYS SO.** No attempt stands at
    // this evaluation, so the crossing's `log` is `surface.md §2.5` item 4's declared `[]` (`DEF-S`'s own cell
    // reads it) and no terminal entry exists to carry the throwable's form: the crossed sentence must not
    // point at a log that does not hold it (`DEF-AK`, 2026-10-28).
    const converted = bodyThrowRefusal(carried, refusal, false);
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
  throw packageRefusal({
    status: refusal.status,
    message: generated,
    log: refusalLog(refusal.log),
  });
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
  // **⟶ THE EPOCH RULE'S FRAME IS GONE WITH THE CONSUMER IT GUARDED, 2026-10-27 — `D-42`'s REQUEST NOW NAMES
  // THE WINDOW THAT RAISED IT (`state.mjs`'s `currentWindow`), AND `runAttempt`'s drain COMPARES THE TWO
  // IDENTITIES.** The bytes that stood here were `if (CHECK_DEPTH === 0) clearStaleRestart(instance);` and
  // `CHECK_DEPTH += 1;`, with a matching clear at the failing arm and a decrement in the `finally`: a stack
  // depth in THIS frame standing in for *"a request belongs to the act that raised it"* (`D-42` item `3`).
  // **THEY ARE DELETED, NOT MOVED** — the fact they approximated is now the store's own (a commit identity,
  // minted with the opening and answered by every joining call), so there is no counting frame to be found in
  // the wrong place and none to be bypassed by a driver that never reaches this member. **ONE MECHANISM, NOT
  // TWO.**
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
    // **A FAILING ATTEMPT IS THE TERMINAL CALL'S OWN REFUSAL, AND ITS FLOOR HAS ALREADY PUT THE STORE BACK
    // TO THE STATE IT FOUND** (`D-40`) — and the restart does not run over a floor-restored state, **NOW BY
    // CONSTRUCTION RATHER THAN BY THIS FRAME'S CARE**: `runAttempt`'s drain is reached only where its pass
    // answered a report, and a failing pass throws before the drain (the passing arm alone, `D-42` item
    // `2`'s own reading, taken structurally). A request the failing pass's bodies raised stands with that
    // pass's window identity and dies at the next pass's drain — **A FAILING NESTED WRITE's request is in the
    // ENCLOSING window, so the delivery's outer pass still consumes it, exactly as the old outer-frame clear
    // left it in hand.**
    constraintCrossing(refusal);
  }
  // **⟶ AND THE RESTART'S REFUSAL, WHERE THE RESTARTED CHECK REFUSED — `D-42` (2026-10-27), REACHED THROUGH
  // THE REPORT SINCE 2026-10-27.** The attempt's own terminal arm returned (its pass, its save and its
  // delivery all ran, so a listener body's `rollback` and a constraint body's `rollback` have both been
  // taken), and `runAttempt` — INSIDE ITS OWN COMMIT SCOPE — drained the request and re-ran the check from
  // its beginning (`drainRestartRequests`). **WHAT THIS FRAME DOES NOW IS REFUSE, AND IT REFUSES WITH THE
  // VERY VALUE THE RESTARTED CHECK BUILT** — carried on the report under the symbol both sides spell, and
  // thrown here as itself: the same plain `{status, message, log}`, the same rank-`20` status, one log entry,
  // and the store already restored by that refusal's own compensating act. **NOTHING IS RE-RENDERED AND NO
  // SENTENCE IS AUTHORED HERE** (`DD-52`). **A WRITE WHOSE WINDOW HELD ONLY LAWFUL ACTIONS FINDS NO CARRIED
  // REFUSAL AND RETURNS ITS RECORD UNCHANGED.**
  const restarted = report !== null && typeof report === 'object' ? report[RESTART_REFUSAL] : undefined;
  if (restarted !== undefined) {
    constraintCrossing(restarted);
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

/**
 * **⟶ ADDED 2026-10-29 — THE DELETE'S OWN KERNEL-DRIVEN PATH: A DELETE-SHAPED ATTEMPT, A PASS, AND THE
 * TERMINAL ENTRY. `D-55` ITEM 3, `DEF-X`, THE ARCHITECT, VERBATIM: *"A delete is an editing verb and must pass
 * constraints. This includes all of the relevant commit and message logic."***
 *
 * **WHAT WAS MEASURED AT `1.3.0`, AND IT IS WHY THIS FUNCTION EXISTS.** `delete` opened its own commit window
 * and called the addon's `delete` directly: **no `K-2`, no `K-3`, no log, no terminal entry** — so a delete
 * consulted no constraint at all, and **the only pass shape the artefact had LANDS A WRITE FIRST** (`K-2`'s
 * store leg called `write`, so the pass it ran judged a state the delete was not in; measured `storeAfter =
 * {"c":2}`). **A delete therefore needed an attempt of its OWN KIND rather than a re-used `K-2`.**
 *
 * **THE THREE STAGES, IN THE ONE ORDER `constraintWrite` TAKES ITS OWN** (`surface.md §2.12` item 1):
 * ```
 *   1. the delete-shaped attempt   `kernel.commitRemoval` — the hold, the commit's log, the delete's op
 *                                  named as the attempt's landing; NO WRITE IS LANDED
 *   2. the store's own leg        the thunk the entry hands: the addon's `delete`, crossed by `index.mjs`
 *   3. the pass                   `kernel.runAttempt` — every pair standing at THE DELETE'S OWN ADDRESS is
 *                                  asked against THE STATE THE DELETE LEFT (its after-state is absence)
 *   4. the terminal act           the attempt's ONE `outcome` entry on the refusing arm, its `commit` entry
 *                                  on the passing arm, and on a refusal the composition that undoes the
 *                                  delete (`D-55` item 5's safe state)
 * ```
 * **THE PASS IS THE WRITE'S PASS, MEMBER FOR MEMBER** — `runAttempt`, the same evaluated set, the same `D-39`
 * registration order, the same repair and re-run arms, the same restart drain — and **the ONLY difference is the
 * landing it judges**: a delete's journal op, whose `after` is absence, instead of a write's op whose `after` is
 * the value it landed. **NO SECOND PASS LOOP IS MINTED**, and a repair landed under a delete's pass re-runs the
 * same evaluation against ITS op (`D-53`: repairs use the same commit).
 *
 * **⟶ AND "THE SAME EVALUATED SET" IS NOW A PREFIX SET, 2026-10-29 — `D-56`, WHICH SUPERSEDES THE CLAUSE THIS
 * PARAGRAPH PRINTED.** `RCA-8(g)` ANNOTATE-BESIDE: **the bytes that stood here read** *"the same evaluated set
 * (the pairs whose own address IS the attempt's, `pairsAtAddress`'s exact-address rule and never the trigger set's
 * prefix widening)"*, **and they are read THROUGH the architect's sentence**: *"A listener/constraint should fire
 * when the descendants of its targeted address node change, because the descendants become part of the object
 * that is read from that address"*. **SO THE DELETE'S PASS ASKS THE PAIRS AT OR ABOVE THE DELETE'S ADDRESS** —
 * the pairs whose own address is a PREFIX of it — **and a pair at `['tabs']` is asked for a delete at
 * `['tabs','landingPage']`** (`strata/decisions.md` · `D-56`). **THE SET IS STILL `pairsAtAddress`'s ONE
 * FUNCTION AND STILL ONE SNAPSHOT** (`CX-12`): `D-56` moves WHICH rows are members and nothing about WHEN the
 * list is materialised, HOW it is ordered (`HL-8` item 6: first-registration order, ancestors interleaved into
 * that one order) or how many times a row is asked.
 *
 * **A REFUSAL IS THE ORDINARY REFUSAL** (`constraintCrossing` below): the surface's one plain form
 * `{status, message, log}`, its `status` the set's rank-`20` member `ConstraintPassRefused`, and its `log` the
 * COMMIT'S OWN LIST — `constraint-check` for the pair that refused, then the terminal `outcome` entry whose
 * `state` is the kernel's token — each with its `seq`. **AND THE SAFE STATE IS `D-55` ITEM 5's**: the
 * composition the terminal act runs (`composeRollback`, one floor call per address at that address's first owed
 * op) undoes **the delete and every edit the commit made under it**, so the caller meets a store back at the
 * state the commit opened at. Where the refusal is a RESTARTED check's (`D-42`, a reversal raised by a body
 * inside this pass), the compensation is the reversal's own and it restores the journal mark the commit cached
 * at ITS OPENING (`state.mjs`'s `windowMark`) — the same safe state by the other route.
 *
 * **`D-3`'S NO-OP ARM IS NOT AN EDIT**: where the delete removed nothing there is no journal op, so
 * `commitRemoval` answers `null`, **no attempt is opened, no pass runs and no entry is appended** — there is no
 * state for a pair to refuse and nothing for the safe-state rule to undo. The record crosses as it always did.
 *
 * **THE DELIVERY IS THE TERMINAL ARM'S FROM 2026-10-29, AND IT IS WHY THE PASS IS HANDED THE `CommitRecord`
 * (`D-55` item 3's third demand: a listener fired by a delete sees the JUDGED state, and a refused delete
 * delivers nothing, its commit having been undone).** `commitRemoval` now mints the record the pass's terminal
 * arm is keyed by, and `runAttempt` reaches that arm with it (`settleArm` → the entry's `TERMINAL_ARM`), so the
 * residue `record.pending` — the delete's returned set MINUS the handles its own pass checked off — is
 * delivered at the arm, after the judgement, exactly as a write's is. **A REFUSED DELETE STILL DELIVERS
 * NOTHING**: the failing arm reaches the same seam with the residue the discard emptied (`terminal`).
 *
 * **AND THE RECORD IS HANDED TO THE CONSUMER ON THE RECEIPT, UNDER THE `D-49` DEVICE.** `DeleteRecord` keeps
 * its enumerable members; `commit` is a NON-ENUMERABLE own `data` property, visible by its name and declared in
 * `index.d.ts`, exactly as `discarded` is — so the record a delete minted can be held (`receipt.commit`) and
 * handed back (`K-4`/`K-5` take its `attempt`; a nested `write` takes the record itself at its fourth
 * position). **`null` IS THE `D-3` ARM'S VALUE**: no attempt was opened there, so there is no record to carry.
 */
export function constraintDelete(instance, address, tier, remove) {
  // THE DELETE-SHAPED ATTEMPT, OPENED AROUND THE STORE'S OWN LEG: `remove` is the addon's `delete`, already
  // crossed by the entry, and it is invoked with the hold taken and the commit's list in hand. `null` is the
  // `D-3` arm (nothing removed) — the receipt the thunk answered stands and nothing is judged.
  let receipt = null;
  let attempt;
  try {
    attempt = commitRemoval(instance, address, tier, () => {
      receipt = remove();
      return receipt;
    });
  } catch (refusal) {
    // THE KERNEL'S OWN `KC-7` (a held address, before the store is reached) or the store's own refusal: the
    // ONE crossing every kernel-driven path takes, so a nested delete at a live attempt's address answers the
    // same rank-`20` form a write does and a store refusal crosses verbatim (`§2.5` item 10 (ii)).
    constraintCrossing(refusal);
  }
  // **THE `D-3` ARM CARRIES ITS `null`** — no attempt, so no record, and the member is present rather than
  // absent (`D-21`: a member whose act did not run says so).
  if (attempt === null) {
    exposeCommit(receipt, null);
    return receipt;
  }
  // THE PASS, INSIDE THE COMMIT THE MEMBER OPENED (`D-44`): `runAttempt` names THE RECORD `commitRemoval`
  // minted (`attempt.record` — the same object `K-2` hands `K-3`), so its scope JOINS — the delete's window is
  // the pass's window, and the pairs standing at THIS address are asked against the delete's own op. **THE
  // TERMINAL ARM IS REACHED WITH THAT RECORD AND NOTHING ELSE** (`settleArm`), so the delivery and the
  // `file`-tier save are the record's own facts. A failing pass throws the kernel's own refusal with its log
  // and its compensating act already taken.
  let report;
  try {
    report = runAttempt(instance, attempt.record);
  } catch (refusal) {
    constraintCrossing(refusal);
  }
  // **AND THE RESTART'S REFUSAL, WHERE THE PASS ITSELF PASSED** (`D-42`; `D-54` (b)): a reversal raised by a
  // body inside this pass is drained at the pass's terminal state, and where the restarted check refused, the
  // refusal the report carries is the one that crosses — the delete is refused with the store already restored
  // to the mark the commit cached at its opening. THE PASSING DELETE FINDS NO CARRIED REFUSAL AND RETURNS ITS
  // RECEIPT UNCHANGED.
  const restarted = report !== null && typeof report === 'object' ? report[RESTART_REFUSAL] : undefined;
  if (restarted !== undefined) {
    constraintCrossing(restarted);
  }
  exposeCommit(receipt, attempt.record);
  return receipt;
}

/// **THE RECORD ON THE RECEIPT — A NON-ENUMERABLE OWN `data` PROPERTY, THE DEVICE `D-49` DECLARED.**
///
/// `Object.keys(receipt)`, every deep-equality over a receipt and every census of its ENUMERABLE members read
/// exactly what they read before, while a caller reads the commit **by its name** (`receipt.commit`) and
/// `index.d.ts` declares it. **IT IS A `data` PROPERTY AND NOT AN ACCESSOR**: a getter would run caller-side
/// code on a read, which is the read half `D-35` closes everywhere else. **A RECEIPT THAT ALREADY CARRIES ONE**
/// — the thunk answers the store's own object and this entry owns it — takes the value it was handed, and the
/// member is defined on every arm so its presence never depends on the arm.
function exposeCommit(receipt, record) {
  if (receipt === null || typeof receipt !== 'object') return;
  Object.defineProperty(receipt, 'commit', {
    value: record === undefined ? null : record,
    enumerable: false,
    writable: false,
    configurable: true,
  });
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

/// **THE SET'S FIFTEENTH MEMBER, SPELLED ONCE — AND THE ONE THING THE RESTORE'S SAVE CAN ANSWER** (`src/error.rs`'s
/// `CODES`, `[&str; 20]`, rank `15`; `§8.1` #15 and `§8.2`'s row). **IT IS READ HERE TO CLASSIFY THE STORE'S ANSWER
/// AND IS NEVER MINTED HERE** (`DD-40`): `restoreMark` answers it when the restore's own save cannot land, and
/// **that arm is NOT a refused mark** — the store's replay has already run, so the in-memory state IS the restored
/// state and only the bytes at the path were not updated (`src/store.rs`'s `restoreMark`, 2026-10-27).
const FILE_COMMIT_FAILED = 'FileCommitFailed';

/// **WHETHER THE STORE'S ANSWER TO THE MARK IS ITS SAVE'S FAILURE RATHER THAN A REFUSED MARK** — the two arms
/// `restoreMark` can answer with an error, told apart by the status they carry and by nothing else. **A REFUSED
/// MARK** (`JournalOpUnknown`, `AddressMalformed`) leaves the store at the state it held, so nothing may be
/// counted as restored; **A FAILED SAVE** (`FileCommitFailed`) leaves the restore's state STANDING in memory and
/// only the file behind it stale. The answer is the refusal record itself on the save arm and `null` otherwise.
function saveRefused(refused) {
  if (refused === null || typeof refused !== 'object') return null;
  const status = ownDataMember(refused, 'status');
  return status === FILE_COMMIT_FAILED ? refused : null;
}

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

/// **⟶ ADDED 2026-10-28 — `DEF-AK`: THE INNER REFUSAL A CONSTRAINT BODY SWALLOWED AND THE CARRIER THAT PUTS
/// IT BESIDE THE CROSSED ONE.**
///
/// **THE MEASUREMENT, STATED AS MEASURED.** A LISTENER body propagates an inner refusal VERBATIM — same
/// `status`, same `message`, same two-entry `log`, same op — because no kernel frame catches a listener's body
/// and nothing marks it. **A CONSTRAINT body making the IDENTICAL write had it REPLACED by the generated
/// `ConstraintBodyThrew` form** (the set's rank `18`), whose single log entry was the OUTER attempt's and in
/// which **the inner refusal's distinctive literal occurred ZERO TIMES**. **So the host you were inside decided
/// what you were told**, and the crossed sentence's own *"a constraint body's throwable crosses as this
/// refusal"* promised a carriage the crossing did not make.
///
/// **WHAT MOVES, AND WHAT DOES NOT.** `ConstraintBodyThrew` STAYS THE STATUS THAT CROSSES (the body did
/// throw, and `DEF-S`'s ruling is unmoved); **the inner refusal — its `status`, its `message` and its own `log`
/// — is carried BESIDE the crossed one** under this `Symbol.for` key, which both sides can spell and which
/// `Object.keys` and `Object.getOwnPropertyNames` do not see. **The crossed `message` names the inner status,
/// quotes the inner message and says in its own words that the value the body threw does NOT cross as the
/// crossed refusal** — so the crossed sentence no longer claims more than it delivers, and the literal is in
/// the text a consumer reads first. **NO MEMBER OF THE CROSSED FORM MOVES** (`{status, message, log}`, three
/// own enumerable members), **the rank-`18` member is not renamed, no status is minted** (`DD-40`) and **an
/// UNMARKED value still crosses as itself** (`DEF-A`'s protection, unmoved).
const INNER_REFUSAL = Symbol.for('provident-storeroom.inner-refusal');

/// **⟶ AND THE PROVENANCE MARK THAT MAKES AN INNER REFUSAL AN INNER REFUSAL, 2026-10-28 — `DEF-AK`, AND IT IS
/// THE WHOLE REASON A SHAPE TEST CANNOT DO.**
///
/// **A CALLER'S BODY IS THE CALLER'S CODE, so a value it throws may carry `{status, message, log}` and be a
/// FORGERY.** `DEF-A`'s protection — a forged refusal must never be answered as the package's own — has a
/// second consequence here: **a forged shape must not have its text quoted back inside the package's crossed
/// sentence either.** Measured on this pass's first cut: a constraint body throwing
/// `{status: 'ValueNotAdmitted', message: 'the caller forged this refusal', log: []}` had the forged text
/// printed in the crossed message as though the package had found a refusal there, which is the same
/// laundering `DEF-A` closed one layer out.
///
/// **SO AN INNER REFUSAL IS IDENTIFIED BY A MARK THIS PACKAGE SETS ON THE FORMS IT BUILDS**, spelled here
/// under a `Symbol.for` key exactly as `KERNEL_REFUSAL` and `CONSTRAINT_BODY_THREW_ENTRY` are, and never by a
/// member a caller can spell. The kernel's own refusals (`isKernelBuiltRefusal`) count too: both are the
/// store's forms, and a caller's value is neither.
const PACKAGE_REFUSAL = Symbol.for('provident-storeroom.package-refusal');

/// **THE ONE PLACE THIS FILE'S OWN REFUSAL FORMS ARE MARKED** — the three crossing arms and the judgement's
/// own form reach it, so a refusal built here and then caught from a body is recognisable as the store's and
/// never as a caller's. **NO MEMBER MOVES**: the mark is a symbol-keyed, non-enumerable own data member, so
/// `Object.keys` still reads `["log","message","status"]` and no census of the three sees it.
function packageRefusal(form) {
  Object.defineProperty(form, PACKAGE_REFUSAL, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: true,
  });
  return form;
}

/// **THE INNER REFUSAL A BODY'S THROWABLE CARRIES, OR `null`** — asked of the value the frame that CAUGHT it
/// from the body has in hand, so the identity question is already answered: this reads the value's OWN data
/// members (`D-35`'s read half) and answers the value only where it carries the surface's own refusal form —
/// a non-empty `status` string, a `message` string and a `log` array. **A BODY THAT THREW SOMETHING ELSE IS
/// `null`** (a `TypeError`, a string, a bare object with no `log`), and the crossed sentence then stands as
/// the generated one: the throwable is not a refusal, there is no inner refusal to carry beside the crossed
/// one, and nothing is invented for it.
function innerRefusalThrown(thrown) {
  if (thrown === null || typeof thrown !== 'object') return null;
  // **THE PROVENANCE TEST COMES FIRST AND IS THE MARK, NOT THE SHAPE** (`PACKAGE_REFUSAL` above): a refusal
  // this package built, or one the kernel built, is the store's; anything else — including a caller's forged
  // three-member object — is not, and the crossed sentence never quotes a value it cannot attribute.
  if (thrown[PACKAGE_REFUSAL] !== true && isKernelBuiltRefusal(thrown) === false) return null;
  const status = ownDataMember(thrown, 'status');
  const message = ownDataMember(thrown, 'message');
  const log = ownDataMember(thrown, 'log');
  if (typeof status !== 'string' || status.length === 0) return null;
  if (typeof message !== 'string' || message.length === 0) return null;
  if (Array.isArray(log) === false) return null;
  return thrown;
}

/// **THE INNER REFUSAL A CROSSED REFUSAL CARRIES BESIDE IT, OR `null`** — the mark's read half, taken off
/// the value this package BUILT and never off a caller's shape: the fact travels under the `Symbol.for` key
/// above, so no member a caller can spell decides it.
function innerRefusalCarried(value) {
  if (value === null || typeof value !== 'object') return null;
  const carried = value[INNER_REFUSAL];
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
function bodyThrowRefusal(carried, thrown, recorded) {
  const addon_ = withAddon();
  if (typeof addon_.errorMessage !== 'function') return null;
  const subject = typeof carried.address === 'string' ? carried.address : '';
  let generated = addon_.errorMessage(BODY_THREW_STATUS, subject);
  if (typeof generated !== 'string' || generated.length === 0) return null;
  // **⟶ `DEF-AK`, 2026-10-28: THE INNER REFUSAL IS CARRIED BESIDE THE CROSSED ONE AND THE SENTENCE SAYS SO.**
  // The value this frame was handed is the very value the body threw (the frame above caught it and marked it),
  // so the inner refusal is in hand: where it carries the surface's own form, the generated sentence — whose
  // own words are *"a constraint body's throwable crosses as this refusal"* — is followed by the clause that
  // stops it claiming more than the crossing delivers, and the value itself travels under `INNER_REFUSAL`.
  const inner = innerRefusalThrown(thrown);
  if (inner !== null) {
    const innerStatus = ownDataMember(inner, 'status');
    const innerSaid = ownDataMember(inner, 'message');
    generated = `${generated} — the value the constraint body threw does NOT cross as this refusal: it was `
      + `ITSELF a refusal, ${JSON.stringify(innerStatus)} with the message ${JSON.stringify(innerSaid)}, and it `
      + `crosses BESIDE this one under Symbol.for('provident-storeroom.inner-refusal') with its own log — the `
      + `generated sentence above names the CODE for a body that threw and not the value the body threw`;
  } else {
    // **⟶ AND THE PLAIN THROWABLE'S SENTENCE STOPS CLAIMING A CROSSING IT DOES NOT MAKE — `D-55` ITEM 1,
    // `DEF-AK`, 2026-10-28.** The generated sentence's own bytes are *"a constraint body's throwable crosses
    // as this refusal"*, and the throwable DOES NOT: it is not carried, its members are not merged and its
    // identity is not handed on. **WHAT DOES CROSS IS ITS MESSAGE, IN THE COMMIT'S LOG** — the terminal arm of
    // the attempt that caught it put the form the value took (the string's own text, the object's own
    // `message` member, or the kind of value it was) in the ONE entry the arm appends. **`recorded` IS THAT
    // FACT, SAID BY THE CROSSING THAT CALLED THIS FRAME** (`constraintCrossing` reads the arm that records it;
    // `registrationCrossing` and the judgement do not), **so no arm points at a `log` that does not carry it**:
    // where the arm records nothing the clause says so and names the declared `[]` (`surface.md §2.5` item 4).
    const where = recorded === true
      ? `the form the throwable took stands in the \`outcome\` entry of this refusal's \`log\`, which is where `
        + `a throwable's own message crosses`
      : `no entry of this failure's \`log\` records it — \`log\` is the declared empty list where no attempt `
        + `stands (surface.md §2.5 item 4) — so nothing of the value crosses`;
    generated = `${generated} — the value the constraint body threw does NOT cross as this refusal: ${where}`;
  }
  const crossed = {
    status: BODY_THREW_STATUS,
    message: generated,
    log: refusalLog(carried.log),
  };
  packageRefusal(crossed);
  if (inner !== null) {
    // A SYMBOL-KEYED, NON-ENUMERABLE OWN MEMBER: `Object.keys` and `Object.getOwnPropertyNames` read the
    // crossed form's three members exactly as they did, and the inner refusal is reachable by its name.
    Object.defineProperty(crossed, INNER_REFUSAL, {
      value: inner,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
  return crossed;
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
    // **`true` — THIS IS THE LANDING'S OWN CROSSING, AND ITS TERMINAL ARM RECORDS THE THROWABLE'S FORM**
    // (`kernel-attempt.mjs`'s `evaluate`: the attempt closes with ONE `outcome` entry whose sentence carries
    // `throwableForm(body)`), so the crossed sentence may point at it and `DEF-AK`'s log entry exists.
    const converted = bodyThrowRefusal(carried, refusal, true);
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
    throw packageRefusal({
      status: refusal.status,
      message: refusal.message,
      log: refusalLog(log),
    });
  }
  // **THE KERNEL'S OWN `KC` REFUSAL.** Its `{status, message, log}` is the KERNEL'S OWN three-member form
  // (`docs/specs/storeroom-constraints/fail-surface.md §1.1`), and **⟶ FROM 2026-10-26 IT CROSSES WITH THE
  // SET'S RANK-`20` MEMBER IN `status`, NOT WITH THE STORE'S `FileCommitFailed`** (`DEF-H`; the architect,
  // verbatim: *"Expand the returned fail-state list to include the refusal"*; `strata/decisions.md` · `D-38`).
  // **THE TOKEN STILL DOES NOT ENTER `status`** — it is on the attempt's own `outcome` entry's `state` in the
  // `log`, which is `D-38`'s reading — **AND `FileCommitFailed` IS NOW THE SAVE'S CODE ALONE, minted by save
  // failures only.** The message is the kernel's own, UNMOVED; the `log` is the attempt's, VERBATIM.
  throw packageRefusal({
    status: CONSTRAINT_PASS_REFUSED,
    message: typeof refusal.message === 'string'
      ? refusal.message
      : 'the write was refused by a constraint of this attempt',
    log: refusalLog(log),
  });
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
///
/// **⟶ AND THE SECOND DIRECTION IS CLOSED BY `D-44`, 2026-10-27 — THE PARAGRAPH ABOVE IS READ THROUGH THIS
/// ONE AND NOTHING BELOW IT MOVES.** *"There should be no state where a constraint is being checked without an
/// open commit. Any action that would cause a constraint check should open a commit before beginning"*
/// (`strata/decisions.md` · `D-44`), and the state it names by hand is exactly the one printed above: *"`D-42`'s
/// window `4` (a pass driven by hand, `open=0`/`live=1`): **that state must not exist**."* **SO A PASS DRIVEN
/// STRAIGHT THROUGH `K-2`/`K-3` NOW SEES `open` `1`, `live` `1`** — the pass opens its own scope
/// (`kernel-attempt.mjs`'s `runAttempt`, through the `commit-scope` channel `state.mjs` installs) — **and
/// `reversalAtRest` IS UNMOVED**: both conjuncts stand, the restart is not a third conjunct, and a reversal
/// inside a directly driven pass is still a STEP (the `live` conjunct decides it now, where before either
/// conjunct would have).
///
/// **⟶ AND THE PARAGRAPH JUST ABOVE IS SUPERSEDED ON ONE SENTENCE, 2026-10-27 — THIS FILE DOES NOW CONSUME THAT
/// PASS'S REQUEST, AND IT DOES SO WHERE THE SCOPE IS OWNED.** The bytes that stood here read *"WHAT THIS FILE
/// STILL DOES NOT DO FOR THAT PASS IS CONSUME ITS REQUEST: the restart's only consumer is `constraintWrite`'s
/// `restartInvalidatedCheck`, and a directly driven pass has no such frame above it, so a body's request dies
/// with its window through the epoch rule (`clearStaleRestart`)"*, and **`clearStaleRestart` and the
/// `CHECK_DEPTH` frame that guarded it are DELETED with that sentence** (`drainRestartRequests` below; the
/// request now names the window that raised it, `currentWindow` in `state.mjs`). **`D-44`'s declared consequence
/// is delivered rather than restated** — *"If every check has a commit, every request has a consumer, and the
/// consumer stops being a property of one call site"* — **and `reversalAtRest` is STILL UNMOVED**: the
/// conjunction keeps both conjuncts, the restart is not a third conjunct, and the invariant stays the
/// PRECONDITION of the check (`open` `≥` `1`), enforced at the check.
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

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ ADDED 2026-10-27 — `D-42`: AN ACTION INSIDE AN OPEN COMMIT RESTARTS THE CONSTRAINT CHECK**
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE RULING IS THE ARCHITECT'S, VERBATIM: *"Actions inside of an open commit start the constraint check
// over again."*** (`strata/decisions.md` · `D-42`). **THE WINDOW IT CLOSES, AS THE DOWNSTREAM MEASURED IT:** a
// reversal issued INSIDE an open commit — from a listener body, from a constraint body — was UNJUDGED (the
// conjunction above), **so its violating effect STOOD** — *"zero judgement invocations inside a body, while
// the identical call one frame out is refused and restored"* (`D-41` item `3`), **the conservative direction
// turned out to be the permissive one.**
//
// **THE ANSWER IS NEITHER TO JUDGE THE STEP NOR TO LEAVE IT.** **Judging the reversal at its own instant is
// what the conjunction refuses and `D-38` refuses by name** (a per-step check of an intermediate state,
// invoking bodies mid-attempt). **So the action is RECORDED and the check it invalidated IS RESTARTED — from
// its beginning — at the one place the check runs and once the window that held it has finished:**
//   * **NOT A PER-STEP JUDGEMENT**: the `rollback` call itself still answers its declared record
//     (`{opId, undoneOps, restoredTo}`, `PAR-JS-9`), no body is invoked at its instant, and the reversal is
//     never judged *as a step*;
//   * **NOT A RE-ENTRY INTO THE ATTEMPT**: the attempt's own pass is untouched; what restarts is the check
//     the action invalidated — the reversal's judgement — and it runs as a FRESH pass over EVERY enabled pair
//     from the first, against the state the action left (`judgeReversal` over the watch below);
//   * **NOT MID-UNWIND**: the kernel's own unwinding (`kernel-terminal.mjs`'s `composeRollback`) reaches the
//     addon's `rollback` entry DIRECTLY and never this member, so it raises no restart and invokes no body
//     inside the composition. **A RESTART IS ONLY EVER RAISED BY A CONSUMER'S OWN `rollback` MEMBER CALL.**
//
// **THE CHECK'S OWN BEGINNING IS THE WATCH'S WALK** (`watchStanding` below): every enabled pair's every
// address, in `D-39`'s registration order — the same first address and the same first pair the at-rest
// judgement begins at. **THE RESTART THEREFORE ASKS THE SAME CHECK THE AT-REST CONTROL ASKS, at the state
// the action left**, which is why its outcome is the declared one member for member: the one plain form
// (`{status, message, log}`), the set's rank-`20` member `ConstraintPassRefused`, and **the store restored by
// the refusal's own compensating act** (`restoreReversal` → the store's `restoreMark`, the journal's head —
// and a reversal appends no journal entry, so that head describes the state that stood BEFORE the action).
//
// **TERMINATION, AND WHAT BOUNDS IT.** A restart asks pair bodies, and a pair body MAY ACT (it is the
// caller's code): an action raised while a restart is running raises a NEW request, which the same loop
// consumes — so a body that acts on every ask would otherwise restart the check for ever. **THE LOOP IS
// BOUNDED AT `RESTART_LIMIT` RESTARTS PER PASS SCOPE** (`drainRestartRequests`; the frame moved from the
// terminal call to the check's own scope on 2026-10-27, and the figure and the never-reset rule did not), and the budget is
// SPENT, not reset, by a request raised inside a restart. **A CHECK THAT WILL NOT SETTLE IS A CHECK THAT DOES
// NOT PASS** (`D-41` item `4`'s own direction: *"a reversal nobody could judge is a reversal nobody could
// approve"*), so the arm past the budget refuses — the same plain form, the same rank-`20` status, the same
// compensating restore — and its one log entry says the budget was spent. **THE MEASURED COUNT IS THE
// CELL'S**: `tests/e2e/in-commit-restart.test.mjs` drives a pair that acts on every ask and reads the ask
// count the bound produces.

/// **THE PER-INSTANCE RESTART RECORD, AND IT IS THE INSTANCE'S OWN** (`D-30`; `D-46`): a `WeakMap` keyed by
/// the store object, so a second store is a second record, the record dies with its store, and **NO MEMBER IS
/// ADDED TO THE PRODUCT, TO A RECORD OR TO THE KERNEL** (`A117` (D6)'s four-member guardrail is untouched).
///
/// **`pending` IS THE REQUEST** — `{ watched, reversalId, window, asked }`:
///   * `watched` the check's own beginning captured BEFORE the action ran (`reversalWatch`);
///   * `reversalId` the store's own echo of the id the reversal named (attached by `judgeReversal` in the same
///     frame, one line after the action);
///   * **⟶ `asked` THE PAIR THAT WAS BEING ASKED WHEN THE ACTION WAS RAISED, OR `null`, ADDED 2026-10-28 —
///     `DEF-AL`, THE MISATTRIBUTION.** The budget's refusal used to name `watched[0]` — the FIRST WATCHED
///     ADDRESS — so **registration order decided the accusation**: measured, the pair it named had answered
///     `true` on every ask it received. **The ask in flight is known at the instant the request is raised**
///     (`ASKING` below, set by `judgeReversal` around the one body invocation and read here), so the request
///     records the pair and the address the check was actually at, and the arm past the budget names THOSE.
///   * **⟶ `window` the IDENTITY OF THE COMMIT THE ACTION WAS TAKEN IN** (`state.mjs`'s `currentWindow`, minted
///     with the opening and answered by every joining call), **ADDED 2026-10-27 — AND IT IS WHAT RETIRES THE
///     COUNTING FRAME.** `D-42`'s own sentence is *"a request belongs to the act that raised it"*; while the
///     only consumer was `constraintWrite` that fact had to be approximated by a stack depth in that frame
///     (`CHECK_DEPTH`, whose one read cleared a request at the outermost write). **The store already knows
///     which commit is open** — it opened it — so the request now NAMES that commit and the consumer compares
///     the two identities. A request raised in a window whose check never ran (a `delete`'s delivery is the one
///     the declaration names) therefore dies at the next pass's drain **by identity and not by inference**, and
///     a request raised earlier in the SAME window (a listener body's, consumed by a nested write's own drain or
///     by the enclosing pass's) still belongs to that window and is still consumed.
const RESTARTS = new WeakMap();

/// **⟶ `D-54` (b)'s ONE FLAG, SPELLED HERE AND IN `kernel-attempt.mjs`** — the `Symbol.for` key the kernel's
/// terminal act stands on its own record while its compensating composition runs, so `reversalWatch` can tell
/// the package's own undo from a consumer's `rollback` member call (`D-42`: *"a restart is only ever raised by a
/// consumer's own `rollback` member call"*). **A SYMBOL ON THE KERNEL RECORD AND NOT A MEMBER OF THE PRODUCT OR
/// OF ANY RECORD** (`A117` (D6)), no kernel item is minted (`kernel-surface.md §1` item 2), and the flag stands
/// only for the duration of that one call.
const COMPENSATING = Symbol.for('provident-storeroom.compensating-rollback');

/// **⟶ THE ASK IN FLIGHT, 2026-10-28 — `DEF-AL`'s ONE NEW READ, AND IT IS A `WeakMap` FOR THE SAME REASONS
/// THE RESTART RECORD IS ONE** (`D-30`; `D-46`): keyed by the store, so a second store is a second record, the
/// record dies with its store, and no member is added to the product, to a record or to the kernel.
///
/// **WHAT IT CARRIES, AND WHY IT CANNOT LIVE ON THE REQUEST ALONE.** `{ entry, address }` — the pair
/// `judgeReversal` is asking and the address it is asking at — set immediately BEFORE the one body invocation
/// and cleared immediately after it, on every arm including the throwing one. **A body that raises a reversal
/// does it INSIDE that invocation**, so `reversalWatch`'s in-flight arm reads the entry standing here and
/// stamps it on the request it raises. Without it the arm past the budget has nothing to name but the watch's
/// first address, which is a fact about registration order and not about the check.
const ASKING = new WeakMap();

/// **⟶ THE VALUE A BODY THREW, CARRIED FROM THE FRAME THAT CAUGHT IT TO THE ENTRY THAT MUST PRINT IT, ADDED
/// 2026-10-28 — `D-55` ITEM 1, `DEF-AK`, MEASURED.**
///
/// **THE WINDOW IT CLOSES.** A pair body that throws at a reversal's judgement is caught by `reversalOutcome`,
/// which converts it to the surface's rank-`18` form; `judgeReversal` then catches that and builds the refusal
/// whose ONE log entry names the throwing pair. **NOTHING OF THE THROWABLE REACHED ANY RECORD**: the crossed
/// sentence said *"a constraint body's throwable crosses as this refusal"* and the log carried only the pair's
/// name. **D-55's clarification (the architect, verbatim: *"Include a thrown message in the message log.
/// Obviously."*) makes the message a log entry's own business**, and no attempt log stands at this judgement —
/// so the form travels here, from the catch frame to `reversalRefusal`'s entry sentence.
///
/// **A `WeakMap` KEYED BY THE CONVERTED FORM AND NOTHING ELSE** (`D-30`'s device, `D-46`): the form's three
/// declared members are unmoved, no symbol is spelled on a value a caller holds, and the record dies with the
/// value. **A TREE WITH NO USABLE GENERATOR IS NOT CONVERTED**, so its raw value reaches `reversalRefusal` and
/// that frame spells the form itself (`throwableForm`) — the map answers nothing and nothing is invented.
const THROWN_FORM = new WeakMap();

/// **HOW MANY RESTARTS ONE PASS'S COMMIT SCOPE MAY TAKE** — the bound `drainRestartRequests` spends. Three is
/// the declared figure: two fewer than any arm of this package's own batteries drives, and enough that a lawful
/// in-commit action's single restart never meets it.
///
/// **⟶ AND WHAT IT NOW COUNTS IS *RESTARTS PER SCOPE*, NOT PER WRITE, 2026-10-27.** The figure and the
/// spend-and-never-reset rule are unmoved (`D-42` item `3`); **what moved with the consumer is the frame the
/// count belongs to**: one drain is one pass's scope — the pass the kernel ran, direct or production — and a
/// request raised INSIDE a restart is consumed by that same drain and spends that same budget. **A NESTED
/// pass (a listener body's own write) is a scope of its own and has its own budget**, exactly as the nested
/// `constraintWrite` frame had its own before the move; the count was never shared across nesting levels and is
/// not now.
export const RESTART_LIMIT = 3;

/// **THE RESTART RECORD, CREATED ON THE FIRST ACTION AND NEVER ON A LAWFUL WRITE'S PATH**: the read is a
/// `WeakMap.get` and the creation happens only in `reversalWatch`'s in-flight arm.
function restartRecord(instance) {
  let record = RESTARTS.get(instance);
  if (record === undefined) {
    record = { pending: null };
    RESTARTS.set(instance, record);
  }
  return record;
}

/// **⟶ THE RESTART ITSELF, MOVED 2026-10-27 TO WHERE THE COMMIT SCOPE IS OWNED — `runAttempt`'s drain.**
///
/// **WHAT IT WAS, AND THE FINDING THAT MOVED IT.** It was `restartInvalidatedCheck(instance)`, called by
/// `constraintWrite` after the write's terminal call, and its own header said so: *"it is reached at the ONE
/// place the check runs after the window that held the action has finished: `constraintWrite`."* **`D-44` then
/// made every check run inside a commit scope and named the consequence it could not yet deliver** — *"If every
/// check has a commit, every request has a consumer, and the consumer stops being a property of one call
/// site"* — **and the window it left is measured at `tests/e2e/direct-pass-commit-invariant.test.mjs`: a pass
/// driven straight through `K-2`/`K-3` has no `constraintWrite` frame above it**, so a constraint body's
/// violating `rollback` inside it was neither judged at its instant nor restarted, and the pair was never asked
/// at the state the action left.
///
/// **SO THE CONSUMER IS NOW THE PASS'S OWN SCOPE.** `kernel-attempt.mjs`'s `runAttempt` runs its pass inside
/// `state.mjs`'s commit scope and then calls the store's `restart-drain` channel **inside that same scope**,
/// handing the report the pass answered with; this function is the implementation that channel is given
/// (`installRestartConsumer` below). **ONE MECHANISM, NOT TWO**: there is no second consumer, no counting frame
/// and no call site to be bypassed — the pass that asks the pairs is the frame that consumes what its own
/// bodies raised, whichever driver called it.
///
/// **EACH ROUND CONSUMES ONE REQUEST OF THIS WINDOW AND ASKS EVERY ENABLED PAIR THE WATCH CARRIED, IN ORDER,
/// AT THE STATE THE ACTION LEFT** (`judgeReversal`: the `moved` test, the first-violating-pair rule and the
/// refusal's restoring compensation are that function's own and are not re-implemented here). **THE ROUND IS
/// THE RE-RUN**: the attempt's own pass is untouched and not re-entered (`D-42`: *"NOT A RE-ENTRY INTO THE
/// ATTEMPT"*); what restarts is the check the action invalidated, from its first pair, at the state the action
/// left.
///
/// **A VIOLATION IS CARRIED INTO THE REPORT AND NOT THROWN OUT OF THE KERNEL** (`carryRestartRefusal` below):
/// `runAttempt` answers a report whose `outcome` is `'failed'` and whose log holds the refusal's entry, and
/// `constraintWrite` — the entry — is the frame that refuses on the write's path. **THAT IS THE ONE FORM BOTH
/// DRIVERS CAN READ**: a write meets the same plain `{status, message, log}` it met before (the carried refusal,
/// byte for byte), and a bare `K-3` meets a REPORT that says the restarted pass refused — it never throws,
/// because the pass it was asked to run passed and the refusal is a later check's.
///
/// **A LAWFUL STATE REFUSES NOTHING**: the round asks and passes, the request is consumed, and the report
/// stands exactly as the pass built it (`outcome` `'passed'`), so a write whose window held only lawful actions
/// returns its own record unchanged.
///
/// **THE BOUND, IN ONE SENTENCE: rounds are counted per pass scope and not reset, so the loop runs at most
/// `RESTART_LIMIT` restarted rounds however many actions a body raises inside it; the arm past the budget
/// carries the same form and the same status and restores what the request's own watch recorded as owed.**
/// A request whose watch is empty is a check with no pair to ask: it consumes its request and returns, so an
/// empty watch can neither loop nor exhaust the budget.
export function drainRestartRequests(instance, report) {
  const record = RESTARTS.get(instance);
  if (record === undefined) return report;
  // THE WINDOW THE DRAINING PASS RUNS IN — the pass's own scope is open above this call (`D-44`), so a request
  // raised by a body of that pass carries this same identity and one raised in an earlier window does not.
  const window = currentWindow(instance);
  let rounds = 0;
  for (;;) {
    const request = record.pending;
    if (request === null) return report;
    // **A PASS DOES NOT CONSUME A REQUEST IT DID NOT RAISE — `D-54`, 2026-10-28, MEASURED.**
    // `RCA-8(g)` ANNOTATE-BESIDE: the bytes that stood here read *"a request standing from a window this pass
    // did not open has no consumer HERE, and it is dropped"*, and **the drop was a CONSUMPTION**: a nested
    // pass — a listener body's own write, a reentrant write inside an open commit — cleared a request the
    // ENCLOSING window had raised, so the enclosing pass's own drain found nothing to judge and the reversal's
    // effect stood. **THE REQUEST IS THEREFORE LEFT WHERE IT STANDS**: this pass asks nothing at it and takes
    // nothing from it, and the consumer that matches its window is still free to reach it. **A REQUEST NOBODY
    // CONSUMES STILL DIES WITH ITS WINDOW** (`D-42` item `3`; `D-43` item `2`): windows are never reused, so a
    // stale stamp can be consumed by no later pass, it is overwritten by the next action's own request, and the
    // two declared passless windows have their own answers — the `delete`'s witness reports (and clears) its
    // own, the registration's is read by no surface. **A MISMATCHED REQUEST IS NOT CONSUMED, AND THAT IS THE
    // WHOLE OF HALF (a).**
    if (request.window !== window) return report;
    record.pending = null;
    if (request.watched.length === 0) continue;
    rounds += 1;
    if (rounds > RESTART_LIMIT) {
      // THE CHECK DID NOT SETTLE: THE SAME FORM, THE SAME STATUS, THE SAME COMPENSATION (`D-41` item `4`'s
      // direction), and the log entry says the budget was spent rather than that a pair refused.
      //
      // **⟶ AND IT NAMES THE ADDRESS THE BUDGET WAS SPENT AT AND THE PAIR THAT WAS BEING ASKED, 2026-10-28 —
      // `DEF-AL`, MEASURED.** This arm named `request.watched[0]` — the FIRST WATCHED ADDRESS — so
      // REGISTRATION ORDER DECIDED THE ACCUSATION, and the pair it named had answered `true` on every ask it
      // received: `log[0]` named the true cause while naming a passing pair by id. **THE REQUEST'S OWN
      // `asked` IS THAT PAIR** (`reversalWatch`'s clause above), and it is the one the check was at when it
      // ran out. Where no ask stood, the entry says so and names no pair it cannot know.
      const asked = request.asked !== null && request.asked !== undefined ? request.asked : null;
      const one = asked === null ? request.watched[0] : { entry: asked.entry, address: asked.address };
      const after = standingAt(instance, one.address);
      const undo = restoreReversal(instance, request.watched);
      return carryRestartRefusal(report,
        reversalRefusal(one, after, null, request.reversalId, undo, null, true, asked !== null));
    }
    try {
      judgeReversal(instance, request.watched, request.reversalId);
    } catch (refused) {
      // THE REFUSAL IS THE OUTCOME: the store was restored by its own compensation inside `judgeReversal`, and
      // a request raised by the refusal's own bodies stands for nobody — the restarted check is over, so the
      // drain neither asks again nor spends a further round.
      record.pending = null;
      return carryRestartRefusal(report, refused);
    }
  }
}

/// **⟶ ADDED 2026-10-28 — `D-49`: THE DISCARD'S WITNESS, AND IT IS READ BY THE ACT WHOSE WINDOW DISCARDED THE
/// REQUEST.**
///
/// **THE RULING, THE ARCHITECT, VERBATIM: *"Make discard observable"*** (`strata/decisions.md` · `D-49`), and
/// **`DEF-AH` is the defect it answers**: a restart request raised inside one of the two windows that run **no
/// pass** — a `delete`'s listener delivery, and a registration's own evaluation — **died with its window and the
/// caller could not learn that it did.** **The fail-state stands** (`D-43` item 2, both exits) — **what was
/// missing was the WITNESS.**
///
/// **WHAT THIS FUNCTION IS, AND WHAT IT IS NOT.**
///   * **IT RUNS NO PASS, NO BODY AND NO JUDGEMENT.** It reads the instance's own restart record — the record
///     `reversalWatch` raised the request in — and answers a fresh copy of the two facts a consumer needs: the
///     id the reversal named (`reversalId`, the store's own echo) and **the addresses the refused act MOVED**
///     (`request.moved`, measured by `judgeReversal` at the reversal's own instant and deduplicated by spelling,
///     segment for segment). **THE WATCH'S FULL ADDRESS LIST IS THE DEBT RECORD AND IS NOT THE WITNESS**: naming
///     every watched address would say nothing about what the act did (`DEF-AM`, 2026-10-28). **THE STORE IS NOT
///     TOUCHED, NO CODE IS MINTED, NO LOG ENTRY IS APPENDED AND NO MEMBER OF ANY RECORD IS MOVED** — the `D-49`
///     bar: *"a witness is not a refusal: the act still answers what it answered, the discard is reported beside
///     it, and nothing new is minted in the closed status set."*
///   * **IT CONSUMES THE REQUEST IT REPORTS.** A request whose window is the caller's has no consumer that could
///     ever run it (the window's act ran no pass, and a later pass compares the identity and drops it — the
///     drain's own arm), so clearing the slot here moves no behaviour: it is the same clearing the drain would
///     perform on a mismatched window and the at-rest watch performs on a new reversal. **IT ONLY EVER CLEARS A
///     REQUEST OF THE WINDOW HANDED IN** — a request raised in another window is left exactly where it stands,
///     so an enclosing act's own consumer is never robbed of it.
///   * **IT IS NOT THE DRAIN.** `drainRestartRequests` is the consumer of a pass's own window and RUNS the
///     restarted check; this function is the consumer of a window that has none and only REPORTS it. **Two
///     consumers, two windows, and neither takes the other's request** (`D-44`: *"every request has a
///     consumer"* — for the two passless windows the consumer is the caller's own record).
///
/// **THE BOUND, STATED SO THE WITNESS IS NOT READ AS MORE THAN IT IS.** The restart record holds **ONE** pending
/// request (a second in-flight action overwrites the first — the record's own declared shape, UNMOVED by this
/// pass), so the witness reports the LAST request the window raised and no list of earlier ones exists to report.
/// **The registration window is the other named window and it has no such reader**: its answer is an identity, and
/// the identity is opaque by declaration, so nothing this function could answer would reach it without a new
/// surface — `D-49`'s own instruction is to say so rather than to invent one.
export function witnessDiscardedReversal(instance, window) {
  const record = RESTARTS.get(instance);
  // NO ACTION WAS EVER TAKEN ON THIS INSTANCE, OR THE LAST ONE WAS ALREADY CONSUMED: nothing stands to report.
  if (record === undefined || record.pending === null) return null;
  const request = record.pending;
  // **A REQUEST BELONGS TO THE ACT THAT RAISED IT** (`D-42` item 3, measured by the `window` stamp of
  // 2026-10-27): a request standing from another window is that window's and is left where it stands.
  if (request.window !== window) return null;
  record.pending = null;
  // **⟶ AND THE ADDRESSES ARE THE ONES THE REFUSED ACT MOVED, NOT THE WHOLE WATCHED REGISTRY — `DEF-AM`,
  // 2026-10-28.** The request's `watched` is the DEBT record and names every enabled pair's every address;
  // `moved` is what `judgeReversal` measured at the reversal's own instant (`movedStanding`) and is the only
  // answer a witness owes. **A WITNESS THAT NAMES EVERY ADDRESS THE REGISTRY WATCHES NAME NOTHING**: the
  // discarded check's subject is the state the reversal changed.
  const subject = Array.isArray(request.moved) ? request.moved : [];
  const addresses = [];
  const spellings = [];
  for (let index = 0; index < subject.length; index += 1) {
    const address = subject[index].address;
    const spelling = homeAddressKey(address);
    let seen = false;
    for (let known = 0; known < spellings.length; known += 1) {
      if (spellings[known] === spelling) {
        seen = true;
        break;
      }
    }
    // ONE ADDRESS ONCE: two pairs over one address (or one pair naming it twice) are one address the check owed,
    // and the witness reports the subject and not the walk.
    if (seen) continue;
    appendOwn(spellings, spelling);
    // **A FRESH SEGMENT LIST PER ADDRESS** (`crossing.md §1.1`'s copy-out discipline): the pair's own array is
    // the registry's and is never handed to a caller.
    const copy = [];
    for (let segment = 0; segment < address.length; segment += 1) appendOwn(copy, address[segment]);
    appendOwn(addresses, copy);
  }
  // THE STORE'S OWN ECHO OF THE ID THE REVERSAL NAMED — `null` where the reversal's call answered no id (the
  // request stands and the act's answer did not reach the echo, which is a real arm a caller can see).
  //
  // **⟶ AND AN ENTRY IS NEVER SHIPPED WITH AN EMPTY ADDRESS LIST — `D-55` ITEM 2, `DEF-AH`, 2026-10-28.**
  // The architect, verbatim: *"A witness address of [] corresponds to the register itself. This is not a legal
  // response for any other watched address."* **SO `[]` IS THE REGISTER (THE ROOT) AND IS AN ADDRESS, NEVER A
  // LIST**: a request whose reversal moved NOTHING has no discard to report — there is no legal response to
  // give it — so **the entry is ABSENT (`null`) rather than empty**, and the caller reads `discarded: []`
  // because nothing was discarded *observably*. **AND THE ROOT STAYS DISTINGUISHABLE**: an address that IS
  // `[]` is one element of `addresses` — `[[]]` — which is length `1` and therefore survives this test; the
  // distinction the ruling draws is between an ADDRESS of `[]` and a LIST of `[]`, and this is the one line
  // where it is measured.
  if (addresses.length === 0) return null;
  return {
    opId: typeof request.reversalId === 'string' ? request.reversalId : null,
    addresses,
  };
}

/// **⟶ THE REFUSAL'S ONE CARRIER TO WHICHEVER DRIVER ASKED — ADDED 2026-10-27.**
///
/// **THE REPORT IS AMENDED IN TWO PLAIN MEMBERS AND CARRIES THE REFUSAL WHOLE UNDER A THIRD, SYMBOL-KEYED
/// ONE:**
///   * **`report.outcome` BECOMES `'failed'`** — the attempt's answer is the restarted check's. The pass it
///     ran DID pass, and the state that pass approved does not stand: the action taken inside its window was
///     reversed and the check that state was re-judged by refused it, so the store is back at the journal's
///     head and not at the pass's own op. **THE TWO-ARM MEMBER KEEPS ITS TWO ARMS** (`'passed'`/`'failed'`,
///     `attempt-lifecycle.md §2.4` item 3's terminal-arm clause): no third value is minted;
///   * **THE REFUSAL'S OWN LOG ENTRY IS APPENDED TO THE ATTEMPT'S LOG** — one `constraint-check` entry naming
///     the pair that refused the state the action left and saying what the refusal's compensating act did
///     (`undoSpelling`). **IT ENTERS THROUGH THE KERNEL'S OWN `append`**, so it carries the log's six declared
///     members and the log's own ordinal: the entry the driver reads in `report.log` is a log entry of the
///     attempt's log and not a record of another kind. **THE REFUSAL'S OWN LIST KEEPS ITS FIVE MEMBERS AND NO
///     `seq`** — that list is the judgement's and no attempt log stands at its own instant (`D-41` item `4`) —
///     so the copy is the report's and the original is the refusal's, each honest in its own record;
///   * **AND THE REFUSAL ITSELF TRAVELS UNDER `RESTART_REFUSAL`** so that `constraintWrite` re-throws THE VERY
///     VALUE the restarted check built — same `status`, same `message`, same `log` — with nothing re-rendered
///     and no second spelling of the store's sentence (`DD-52`).
///
/// **NO MEMBER IS ADDED TO THE REPORT'S READABLE SHAPE**: it keeps its five (`attempt`, `outcome`, `ops`,
/// `log`, `rollback`), the symbol key is invisible to `Object.keys` and to `Object.getOwnPropertyNames`
/// (`A117` (D6)), and `K-5` answers the same list a `K-3` answered because it is the same object.
const RESTART_REFUSAL = Symbol.for('provident-storeroom.restart-refusal');

/// **THE AMENDMENT ITSELF — the one site that writes the report a restarted check refused.**
function carryRestartRefusal(report, refusal) {
  report.outcome = 'failed';
  const carried = refusal !== null && typeof refusal === 'object' && Array.isArray(refusal.log)
    ? refusal.log
    : [];
  // THE APPEND IS THE KERNEL'S OWN (`append`): a local holder carrying the report's own list, so the ordinal
  // is `log.length + 1` exactly as every other entry of this log was minted, and no `Array.prototype.push` is
  // read on this path (`contract.md §2.1`'s clause of 2026-10-24 on `F8-2`).
  const log = { log: report.log };
  for (let index = 0; index < carried.length; index += 1) {
    const entry = carried[index];
    // **⟶ AND THE REPLAY NAMES THE ITERATION AS THE ENTRY IT IS CARRYING NAMES IT — `D-53`'s first ruling.** This is
    // the ONE `append` site whose two identities come from a CARRIED ENTRY and not from an acted-upon pair and op
    // (`D-52` counted it as rule 1's fourth kind), so the iteration is rebuilt from the two identities the entry
    // itself carries: **the pair stands by its `id`, and the op by the `opId` the judgement's reversal answered —
    // and the pair's own row is not in hand here, which is why the identity alone is spelled.** Nothing is
    // renumbered and nothing is re-authored: the entry minted here is the report's own, by the report's own
    // ordinal, and its two identity columns read exactly what the entry it carries read.
    append(log, entry.kind, { pair: { id: entry.id }, op: { opId: entry.opId } }, entry.message, entry.state);
  }
  Object.defineProperty(report, RESTART_REFUSAL, {
    value: refusal,
    writable: false,
    enumerable: false,
    configurable: true,
  });
  return report;
}

// **⟶ AND THE CHANNEL IS GIVEN ITS IMPLEMENTATION HERE, AT THIS FILE'S OWN MODULE SCOPE.** `state.mjs` owns
// the seam and may not import this file (`constraints.mjs` imports IT, and the kernel imports neither), so the
// consumer is injected rather than imported: one registration, one consumer, and the kernel reaches it by the
// `Symbol.for('provident-storeroom.restart-drain')` channel `installAttemptSeam` installs on every store.
installRestartConsumer(drainRestartRequests);

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
  // **⟶ AND A REVERSAL INSIDE AN OPEN COMMIT IS NO LONGER LEFT UNJUDGED — `D-42`, 2026-10-27.** The bytes
  // below stood as *"the watch answers `[]` there, so no read is taken and no body is invoked"*, and the
  // SECOND HALF of that sentence is now WITHDRAWN BY NAME: **no body is invoked here (the action is not judged
  // at its instant — the step is still not judged as a step), while the WATCH IS TAKEN and the check is
  // RESTARTED where the check runs** (`drainRestartRequests`). **THE READS ARE THE SAME READS THE AT-REST
  // JUDGEMENT TAKES AND THEY ARE THE RESTART'S DEBT RECORD**: what stood at each enabled pair's address before
  // the action ran — the state the refusal's compensating act owes back, and the baseline its verification
  // reads. **A REVERSAL INSIDE AN OPEN COMMIT OR AN OPEN ATTEMPT IS STILL NOT A TERMINAL STATE** and
  // `reversalAtRest` is UNCHANGED (the conjunction keeps both conjuncts; the restart is not a third conjunct):
  // what moves is only what happens to the request after the window closes.
  //
  // **⟶ AND FROM 2026-10-27 THE REQUEST NAMES THE WINDOW IT WAS RAISED IN** (`currentWindow`, `state.mjs`): the
  // identity of the commit open at this instant, minted with the opening. **THAT STAMP IS THE WHOLE OF THE
  // EPOCH RULE NOW** — the consumer (`drainRestartRequests`) compares it against the window the draining pass
  // runs in, so *"a request belongs to the act that raised it"* (`D-42` item `3`) is MEASURED at this line and
  // checked at that one, and the `CHECK_DEPTH` frame that once approximated it is deleted with its clears.
  if (reversalAtRest(instance) === false) {
    // **⟶ AND THE KERNEL'S OWN COMPENSATING ROLLBACK IS NOT A CONSUMER'S ACTION — `D-54`, 2026-10-28,
    // MEASURED.** `D-42` declares it: *"A RESTART IS ONLY EVER RAISED BY A CONSUMER'S OWN `rollback` MEMBER
    // CALL."* **THE KERNEL'S TERMINAL COMPOSITION REACHES THAT MEMBER** (`kernel-terminal.mjs`'s
    // `composeRollback` calls `attempt.store.rollback`, the app's published member), so with the failing pass's
    // drain now reached (`D-54` (b)) the composition's own reversal was raising a request in the pass's window
    // — **A PHANTOM THE DRAIN THEN JUDGED**, asking a pair at the state the compensation had restored to and
    // re-shaping a refusal no consumer wrote. **THE FLAG IS THE KERNEL'S, TAKEN AROUND ITS OWN TERMINAL ACT**
    // (`kernel-attempt.mjs`'s `terminalComposed`), **and it is a `Symbol.for` key on the kernel record that both
    // modules spell** — no member of any record and none of the product moves (`A117` (D6)). With it, the
    // composition takes no watch, raises no request and judges no step: the request the pass's own bodies
    // raised is the one the drain carries to the terminal judgement, and no other.
    if (kernelFor(instance)[COMPENSATING] === true) return watched;
    // **⟶ AND THE REQUEST NAMES THE ASK IT WAS RAISED UNDER, 2026-10-28 (`DEF-AL`).** A body acts INSIDE the
    // one invocation `judgeReversal` wrapped in `ASKING`, so the pair and the address the check was actually
    // asking are in hand at this instant. `null` where no ask stands (an action raised by a body outside a
    // judgement — a listener's own window is the measured arm), and the arm past the budget then says so
    // rather than naming a pair it cannot know.
    const asking = ASKING.get(instance);
    const window = currentWindow(instance);
    // **⟶ AND A SECOND RAISE IN THE SAME COMMIT MERGES INTO THE REQUEST RATHER THAN REPLACING IT — `D-55`
    // ITEM 6's SECOND HALF, `DEF-AP`, 2026-10-28, MEASURED.** **WHAT WAS MEASURED:** two listeners each
    // reversing inside ONE commit — two raises in one window — left only the LAST raise judged; the earlier
    // listener's own violation was asked **zero** times, registration order decided which raise was lost, and
    // when the survivor's judgement passed the write returned normally **with the violation standing**. **THE
    // ROW'S OWN ESCAPE — declare that an overwritten raise may leave a violation unjudged — IS UNAVAILABLE**,
    // because `DEF-AN`'s safe-state rule is the promise: a refused edit undoes the WHOLE commit.
    // **SO THE DRAIN JUDGES THE STATE THE COMMIT STANDS AT, NOT THE REQUEST THAT HAPPENED TO SURVIVE**: the
    // request's captures are merged to the EARLIEST reading of each address — the state the commit opened at —
    // so `movedStanding` at the drain sees every address the WHOLE commit moved, whichever raise named it.
    // **THE WALK'S ORDER AND MEMBERSHIP STAY THE REGISTRY'S** (`watchStanding`'s `D-39` order, re-read now):
    // an address this raise's walk carries takes the earlier capture where one exists, and an address the
    // earlier watch carried but the registry no longer does leaves the debt record (it is not the check's
    // subject now). **THE LATEST RAISE KEEPS ITS OWN ASK AND ITS `moved` IS RE-MEASURED**; the `reversalId`
    // stays the first echo it recorded (`judgeReversal`'s in-flight arm sets it once), so the entry a refusal
    // names is never re-spelled.
    const next = watchStanding(state, instance);
    const record = restartRecord(instance);
    const prior = record.pending;
    if (prior !== null && prior.window === window) {
      const merged = [];
      for (let index = 0; index < next.length; index += 1) {
        const one = next[index];
        const spelling = homeAddressKey(one.address);
        let earlier = null;
        for (let known = 0; known < prior.watched.length; known += 1) {
          if (homeAddressKey(prior.watched[known].address) === spelling) {
            earlier = prior.watched[known];
            break;
          }
        }
        appendOwn(merged, earlier === null ? one : earlier);
      }
      prior.watched = merged;
      // THE MOVED SET IS RE-MEASURED AGAINST THE MERGED CAPTURES (`judgeReversal`'s in-flight arm does it at
      // the reversal's own instant, one frame below this call) — a set measured against the later watch would
      // hide the earlier raise's movement, which is the defect this merge closes.
      prior.moved = null;
      prior.asked = asking === undefined ? prior.asked : asking;
      return watched;
    }
    record.pending = {
      watched: next,
      // **AND THE MOVED SET IS MEASURED BY THE JUDGEMENT, NOT BY THE WATCH** (`judgeReversal`'s in-flight arm;
      // `DEF-AM`): the watch is taken BEFORE the reversal runs, so what moved is not knowable here.
      moved: null,
      reversalId: null,
      window,
      asked: asking === undefined ? null : asking,
    };
    return watched;
  }
  // **AND AN AT-REST CALL PROVES THE PREVIOUS WINDOW HAS ENDED**: a request still standing there belongs to a
  // window whose check never ran (a `delete`'s delivery is the one the declaration names), and the act that
  // raised it is over — so it dies here rather than being attributed to this reversal.
  const record = RESTARTS.get(instance);
  if (record !== undefined) record.pending = null;
  return watchStanding(state, instance);
}

/// **THE CHECK'S OWN BEGINNING — THE WATCH'S WALK, TAKEN AS ONE FUNCTION SO THE AT-REST JUDGEMENT AND THE
/// RESTART BEGIN AT THE SAME FIRST PAIR.**
///
/// **THE WALK IS `D-39`'S DECLARED ORDER** — the record's own `registrationSeq`, collected and ordered exactly
/// as `enumerateConstraints` collects and orders its answer — so the pair the judgement reaches FIRST is the
/// pair `constraints()` names first, and not whichever pair a toggle happened to move. **A PAIR WHOSE ELEMENT
/// DOES NOT STAND A REGISTRATION IS NOT EVEN CAPTURED** (`withdrawStanding`'s own predicate, and its own
/// ground: a disabled pair's registry standing is a CARRIAGE fact, not a listener) — so the restart asks
/// nothing on a disabled pair's address and the budget cannot be spent on one.
function watchStanding(state, instance) {
  const watched = [];
  const carried = [];
  for (const entry of state.constraints.values()) {
    appendOwn(carried, entry);
  }
  carried.sort((left, right) => left.registrationSeq - right.registrationSeq);
  for (let index = 0; index < carried.length; index += 1) {
    const entry = carried[index];
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

/// **THE ADDRESSES THE REVERSAL ACTUALLY MOVED, MEASURED ONCE** — the watch's capture against the standing the
/// store holds now, with each entry's `after` beside its `before`. **A STANDING THIS REVERSAL DID NOT MOVE IS NOT
/// A STANDING IT LEFT**, so the pair is not asked at it and cannot refuse the reversal for a state the reversal
/// found. **IT IS THE JUDGEMENT'S SUBJECT AND THE RESTORE'S DEBT** (`judgeReversal`), and from 2026-10-28 it is
/// also **THE WITNESS'S SUBJECT** (`DEF-AM`: the discarded request reports the addresses that MOVED, not every
/// address the registry watches).
function movedStanding(instance, watched) {
  const moved = [];
  for (let index = 0; index < watched.length; index += 1) {
    const one = watched[index];
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
  return moved;
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
  // **A COMPENSATING ROLLBACK IS NOT JUDGED AS A STEP EITHER — `D-54` (b)**: the member is reached by the
  // kernel's own terminal act with the flag standing, and this act must not touch a pending request or ask a
  // pair. The consumer's own judgement is the drain's, at the pass's terminal state.
  if (kernelFor(instance)[COMPENSATING] === true) return undefined;
  // **⟶ AND THE IN-FLIGHT ARM IS THE REQUEST'S OTHER HALF, `D-42` (2026-10-27).** `reversalWatch` answers
  // `[]` for an action taken inside an open window — no body is invoked at the reversal's instant and the step
  // is still not judged as a step — **and this frame is where the store's own echo of the id the reversal
  // named reaches the request the watch raised**: the id is the refusal's `opId` when the restart refuses, so
  // the declared log entry names the act, exactly as the at-rest control's does. **NO ASK AND NO READ IS TAKEN
  // HERE** — the restart is not this frame's, and an empty watch with no request standing (the at-rest arm of a
  // store whose every pair is disabled) is a judgement over nothing and answers `undefined` as it always did.
  if (watched.length === 0) {
    const record = RESTARTS.get(instance);
    if (record !== undefined && record.pending !== null && record.pending.reversalId === null) {
      record.pending.reversalId = typeof reversalId === 'string' ? reversalId : null;
      // **⟶ AND THE WITNESS NAMES WHAT MOVED, NOT THE WHOLE WATCHED REGISTRY — `DEF-AM`, 2026-10-28.** The
      // request the watch raised carries every enabled pair's every address as the DEBT record, which is what
      // the restarted check must ask; the WITNESS is a different question — *"what did the refused act move?"* —
      // and the moved set is measured here, at the reversal's own instant, by the same `before`/`after`
      // comparison the at-rest judgement takes. **THE STORE IS READ ONCE PER WATCHED ADDRESS AND NOTHING IS
      // INVOKED**: this is the same walk `movedStanding` performs for the at-rest arm.
      record.pending.moved = movedStanding(instance, record.pending.watched);
    }
    return undefined;
  }
  // **⟶ AND THE AT-REST JUDGEMENT RUNS INSIDE A COMMIT, 2026-10-27 — `D-44`'s INVARIANT AND `DEF-AE`'S CACHE.**
  // `D-44`: *"There should be no state where a constraint is being checked without an open commit. Any action that
  // would cause a constraint check should open a commit before beginning."* **THE AT-REST JUDGEMENT WAS THE ONE
  // CHECK THAT RAN OUTSIDE ONE** — `reversalWatch` had already decided `reversalAtRest` on the count this call
  // found (`open` `0`, `live` `0`), so the discriminator's reading is unmoved by the opening that follows it —
  // **and the window it opens is what carries the mark the restore owes back** (`state.mjs`'s `openCommit` caches
  // the journal's last valid position at the opening; `windowMark` answers it). **A REVERSAL APPENDS NO ENTRY**, so
  // the mark taken here is still the PRE-REVERSAL state — which is why the at-rest control restores exactly what
  // it restored before. **ON THE RESTART ARM THIS CALL JOINS** the pass's window (the drain runs inside the pass's
  // own scope, `kernel-attempt.mjs`) and re-caches nothing, so the mark in flight stays the OUTERMOST opening's:
  // the position the attempt found. **THE `finally` RELEASES THE WINDOW ON EVERY ARM, INCLUDING THE THROWING ONE**,
  // because a refusal that leaves a commit standing is the count this package's own cells measure.
  const opened = openCommit(instance);
  try {
    // THE MOVED SET IS TAKEN FIRST, ONCE: the judgement's subject is the CHANGE the reversal made and nothing
    // wider, and the same list is what a refusal has to put back — with the tier capture the watch took, so a
    // restore knows WHERE each value stood and not merely what it was.
    const moved = movedStanding(instance, watched);
    for (let index = 0; index < moved.length; index += 1) {
      const one = moved[index];
      // **THE BODY'S THROW IS THE JUDGEMENT'S OWN CATCH AND NOT A PROPAGATING VALUE** — `reversalOutcome` converts
      // a body's throwable to the surface's rank-`18` form and re-throws anything unmarked as itself, and BOTH
      // arrive here: the reversal has run, so a judgement that cannot complete restores and refuses (below).
      let outcome;
      // **⟶ AND THE ASK IS NAMED BEFORE THE BODY RUNS, 2026-10-28 (`DEF-AL`).** A body that acts does it
      // inside this one invocation, and the request it raises must name the pair the check was ASKING — not
      // the watch's first address. The mark is cleared on every arm, the throwing one included, so no later
      // act inherits an ask that has ended.
      ASKING.set(instance, { entry: one.entry, address: one.address });
      try {
        outcome = reversalOutcome(instance, one.entry, one.address, one.after);
      } catch (thrown) {
        const undo = restoreReversal(instance, moved);
        throw reversalRefusal(one, one.after, null, reversalId, undo, thrown);
      } finally {
        ASKING.delete(instance);
      }
      if (outcome === true) continue;
      // **THE FIRST VIOLATING PAIR DECIDES AND THE SECOND IS NOT EVALUATED** (`attempt-lifecycle.md §2.4` item 5
      // (ii)–(iii), at the reversal's own instant) — and BEFORE the refusal is built, EVERY address the reversal
      // moved is put back, so the store the consumer meets holds no state this refusal refused.
      const undo = restoreReversal(instance, moved);
      throw reversalRefusal(one, one.after, reversalSaid(outcome), reversalId, undo, null);
    }
    return undefined;
  } finally {
    closeCommit(instance, opened);
  }
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
/// **⟶ AND THE TWO PARAGRAPHS ABOVE ARE READ THROUGH THEIR MARK, 2026-10-27 — THE ARCHITECT'S RULING, VERBATIM:
/// *"Cache the restoreMark when opening a commit, based on the last valid state/op of the journal."*** `RCA-8(g)`
/// ANNOTATE-BESIDE: **every byte above stands and this clause is the operative statement of WHICH mark the act
/// names.** **THE HEAD IS NO LONGER TRUSTED, AND THE REASON IS THE MEASUREMENT `DEF-AE` FILED:** *"a reversal
/// appends no journal entry, so the head describes the state that stood before the action"* is TRUE OF A REVERSAL
/// TAKEN AT REST and FALSE OF ONE TAKEN INSIDE A WRITE'S COMMIT — **in the restart arm the enclosing write's own op
/// stands at the head when the listener's reversal runs**, so the head described the WRITE'S LANDING and the
/// compensation restored the refusal's own value: **the store stood at `7` where the attempt found `9`, and the
/// write that reported the refusal had landed its value.** **SO THE ACT NAMES THE MARK ITS COMMIT CACHED AT ITS
/// OPENING** — `state.mjs`'s `openCommit` reads the store's own `journalMark` (`src/store.rs`: the last VALID
/// mark, which is the head at that instant and is named as a VALUE) and stands it on the window; `windowMark`
/// answers it here, and the store's `restoreMark` replays to it. **THE INSTANT IS THE WHOLE FIX**: the opening
/// precedes anything the commit lands, so the cached position is the state the attempt FOUND — the pre-attempt
/// state, which is what a failed attempt owes back. **A JOIN RE-CACHES NOTHING** (`D-45`/`D-46` decide which
/// openings are outermost: a repair's write and a pass's scope join, so they take the outermost mark and not a
/// later one), and **a callback's own commit is its own opening with its own cache** (a listener body's call names
/// nothing and opens, so the mark it restores to is where ITS window opened). **THE MARK IS OPAQUE HERE**: the
/// store answered a carrier — `{k:'s', v:<op id>}`, or `{k:'F'}` for the FLOOR, the state the store was born with
/// when the journal held no entry at the opening — and this act hands the very same carrier back. **NEITHER THE
/// PACKAGE NOR THIS FUNCTION COMPOSES A POSITION.**
///
/// **AND A WINDOW WITH NO CACHE IS A WINDOW THAT NEVER OPENED: THIS ACT REFUSES RATHER THAN FALLING BACK TO THE
/// HEAD** — the head is the value this ruling exists to stop trusting, and a silent fall-back would restore it
/// while a consumer was told the reversal was undone. **THE REFUSAL IS THE ACT'S, NOT THE CALL'S**: no store verb
/// is invoked, no status is minted (`DD-40`), every address the reversal moved is reported as NOT restored with
/// what stands there instead, and the log entry says the window carried no cached mark — so the crossed form, its
/// `status` and its member set are unmoved and the consumer is never told a restoration happened that did not.
///
/// **WHAT THE CAPTURE SURVIVES AS, AND WHY IT IS NOT A FALLBACK.** `reversalWatch`'s per-tier capture is still
/// taken, and it is the ONLY record of **what was owed** — it is the DEBT'S RECORD and the VERIFICATION
/// BASELINE, not a write plan. Every address the reversal moved is read again after the store's act
/// (`standingVerdict`), and the count and the failures below are read from THAT — so `UNDONE` is claimed only
/// where each moved address demonstrably stands again with the values and the tiers it held, which is the
/// honesty `D-41` item `2` measured at `200` of `200`. **NO WRITE AND NO DELETE IS ISSUED BY THIS FUNCTION ON
/// ANY ARM**; the store's own verb is the whole act.
///
/// **⟶ AND FROM 2026-10-28 THE BASELINE THE VERDICT MEASURES IS NAMED, AND THE TWO SUCCESSES ARE TOLD APART —
/// `DEF-AJ`, MEASURED.** **A restore that fully succeeded was reported as one that failed**: the store's act
/// returns the store to the journal mark its commit cached at its OPENING (the 2026-10-27 ruling above), and in
/// the restart arm the commit has already landed writes when the reversal is asked for, so **the mark's state is
/// not the pre-reversal standing the watch captured** — every moved address then failed an `exact` test the act
/// had already satisfied, and the sentence said *"0 of the 1 address it moved stand again"* beside a store that
/// stood exactly where the whole commit had opened. **SO THE SENTENCE HAS TWO SUCCESS ARMS AND ONE FAILURE ARM,
/// AND THE BASELINE OF EACH IS SAID IN IT:** a successful act with every address equal to the pre-reversal
/// capture is *"UNDONE … (the baseline this verdict measured is the pre-reversal standing, which is the state the
/// journal mark the commit cached at its opening holds)"*; a successful act with any address PAST the capture is
/// *"UNDONE — as a WHOLE-COMMIT UNDO"*, and each such address is named with what stands there and what stood
/// there immediately before the reversal; and a REFUSED mark, a CACHELESS window and a store that did not
/// restore are *"NOT undone"*, naming every address that does not stand again (the arm unchanged).
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
///
/// **⟶ AND A FAILED SAVE IS A SECOND, DIFFERENT ANSWER — 2026-10-27, THE FILE-SAVE RULING.** `restoreMark` now
/// answers `FileCommitFailed` when the restore's own save cannot land, **and that answer does not mean the mark
/// was refused**: the store's replay already ran, so the in-memory state IS the restored state and only the
/// bytes at the store's file path were not updated. **So the two are classified apart (`saveRefused`) and the
/// save's arm does NOT narrow the address verification**: every address the restore moved is counted exactly as
/// on the passing arm, **and the file's own half is counted beside them** (`unsaved`), which is the one datum
/// `undoSpelling` needs to say *"the memory was restored and the bytes were not"*. **NO BYTE IS WRITTEN HERE AND
/// NO SECOND SAVE IS ATTEMPTED** — the store's answer is the whole report.
function restoreReversal(instance, moved) {
  const addon_ = withAddon();
  // **THE ONE ACT: THE STORE RETURNS ITS OWN STATE TO THE MARK ITS COMMIT CACHED AT ITS OPENING** (`windowMark`,
  // `state.mjs`) — NOT to the journal's head, which is the write's own landing on the restart arm. **THE CARRIER
  // IS THE STORE'S OWN ANSWER, HANDED BACK VERBATIM**: `{k:'s', v:<op id>}` names an entry and `{k:'F'}` names the
  // FLOOR (the state the store was born with, where the journal held no entry when the commit opened). **NOTHING
  // IS COMPOSED HERE**, so the mark has one spelling and it lives at the store's edge.
  let refused = null;
  let cacheless = false;
  const mark = windowMark(instance);
  if (mark === undefined) {
    // **A WINDOW WITH NO CACHE IS A WINDOW THAT NEVER OPENED, AND THIS REFUSES RATHER THAN FALLING BACK TO THE
    // HEAD.** No store verb is invoked, so the store holds the state it held — and the count below claims NO
    // address restored, so the sentence that reaches the consumer says the reversal was not undone.
    cacheless = true;
  } else {
    try {
      Reflect.apply(addon_.restoreMark, instance, [mark]);
    } catch (why) {
      refused = why;
    }
  }
  // **THE STORE'S ANSWER IS CLASSIFIED BEFORE ANY ADDRESS IS COUNTED — 2026-10-27, THE FILE-SAVE RULING.** A
  // REFUSED MARK leaves the store as it was, so no address may be claimed restored. **A FAILED SAVE does not**:
  // the store's replay already ran and the restored state STANDS, so every address is verified and counted
  // exactly as it is on the passing arm, and the file's own half is recorded beside the count (`unsaved`) for
  // the ONE sentence that names it. **THIS IS THE VERIFICATION EXTENDED TO THE FILE**: the restore already
  // counts the addresses it put back; the count is not narrowed by a failure that did not affect them, and the
  // bytes are reported as the thing that did fail. **AND THE CACHELESS ARM IS A THIRD, WHICH NEVER RESTORES**:
  // no mark was supplied, so no address may be counted.
  const unsaved = saveRefused(refused);
  const stateRestored = cacheless === false && (refused === null || unsaved !== null);
  let restored = 0;
  const failed = [];
  // **⟶ AND THE VERDICT'S BASELINE IS NAMED FROM 2026-10-28 — `DEF-AJ`, MEASURED.** A restore that SUCCEEDED
  // (`stateRestored`) has returned the store to the journal mark the commit cached at its OPENING, and that is a
  // WHOLE-COMMIT undo: where the commit had already moved an address before the reversal was asked for, the
  // address stands at the mark's state and NOT at the pre-reversal standing the watch captured. The old count
  // read every such address as a FAILED restore — a restore that fully succeeded reported as one that did not —
  // because the baseline it compared against was the pre-reversal capture and never the mark. **SO THE TWO ARE
  // TOLD APART HERE**: `failed` is the list an UNRESTORED store is reported by (the refused mark, the cacheless
  // window), and `wholeCommit` is the list of addresses the store's successful act returned PAST the pre-reversal
  // standing — each named with what stands there now and what stood there immediately before the reversal.
  const wholeCommit = [];
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
    // value — and `exact` says whether it equals what the watch took before the reversal.
    const verdict = standingVerdict(instance, one);
    if (stateRestored) {
      // THE STORE'S ACT SUCCEEDED, so every measured address was returned to the mark — that is the claim the
      // store's own answer supports, and it is counted as restored. Where the mark's state is not the
      // pre-reversal standing, the address belongs to `wholeCommit`, which the sentence reports as the commit's
      // own earlier work undone with the reversal rather than as a failed restore.
      restored += 1;
      if (verdict.exact !== true) {
        appendOwn(wholeCommit, {
          address: one.address,
          before: one.before,
          beforeTier: one.beforeTier,
          beforeTiers: one.beforeTiers,
          standing: verdict.value,
          tiers: verdict.tiers,
        });
      }
      continue;
    }
    if (verdict.exact === true) {
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
  return { restored, total: measured.length, failed, wholeCommit, refused, unsaved, cacheless };
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
/// at the ONE site that builds the log entry. **IT MAY CLAIM *"THE REVERSAL WAS UNDONE"* ONLY WHERE THE STORE'S
/// OWN ACT SUCCEEDED AND EVERY ADDRESS IT MOVED STANDS AGAIN AS THE MARK SAYS** (`restoreReversal`'s verdict);
/// where it cannot, **it names each address that could not be restored and says what stands there INSTEAD and
/// what it was owed** (`D-41` item `2`: *"a message must not claim a restoration that did not happen"*).
/// `DEF-Q`: no column prints `undefined`.
///
/// **⟶ AND A SUCCESSFUL RESTORE'S BASELINE IS NAMED, 2026-10-28 — `DEF-AJ`, MEASURED.** The act restores the
/// journal mark the commit cached at its OPENING; where that mark stands before the reversal (the restart arm),
/// the addresses the commit had already moved come back to the MET MARK and not to the watch's pre-reversal
/// capture. **THE SENTENCE THEREFORE SAYS WHICH BASELINE IT MEASURED, AND A WHOLE-COMMIT UNDO IS SPOKEN AS A
/// SUCCESS** — *"UNDONE — as a WHOLE-COMMIT UNDO"* — with each address that stands at the mark's state named
/// beside what stood there immediately before the reversal. **ONLY THE ARMS THAT DID NOT RESTORE SAY *"NOT
/// undone"*: the refused mark, the cacheless window, and any address left standing at what the reversal left.**
///
/// **⟶ AND THE TWO ARMS THE STORE CAN ANSWER WITH ARE NAMED SEPARATELY, 2026-10-27 (THE FILE-SAVE RULING).**
/// **A REFUSED MARK** means the store holds what it held, and the sentence says exactly that. **A FAILED SAVE
/// does not mean that**: the store's replay ran, every address the restore moved IS restored in memory, and the
/// one thing that failed is the write of the bytes at the store's file path. **So the sentence opens by saying
/// BOTH — the in-memory state was restored and the bytes were not updated — carries the store's own
/// `FileCommitFailed` and its generated message (`DD-52`: never a second source), and then makes the ordinary
/// claim the verification supports.** A consumer that reads only the first clause of this sentence therefore
/// learns the two facts the failure owes it, in the order that matters.
function undoSpelling(undo) {
  // **⟶ AND WHERE THE STORE ITSELF REFUSED THE MARK, THE SENTENCE OPENS WITH THAT** (2026-10-27): the act is the
  // store's own (`restoreReversal`), so a refusal it answered is the FIRST thing a consumer must hear — its
  // status and its own generated message (`DD-52`) — and it is never spoken for by a claim about the state.
  let refusal = '';
  if (undo.cacheless === true) {
    // **⟶ AND THE CACHELESS ARM OPENS THE SENTENCE, 2026-10-27** (`restoreReversal` above): **a window with no
    // cached journal mark is a window that never opened, and the act refused rather than falling back to the
    // head.** No status is named — no store verb was reached and none refused — and the one fact a consumer must
    // hear is that nothing was restored, which is what the count below then spells address by address.
    refusal = 'the commit window this reversal ran in carries NO CACHED JOURNAL MARK, so the store was NOT asked '
      + 'to restore it and holds the state the reversal left; ';
  } else if (undo.unsaved !== null && undo.unsaved !== undefined) {
    // THE SAVE'S ARM: read as own data members and off no chain (`D-35`'s read half), exactly as the refused
    // mark's status and sentence are read below.
    const carried = typeof undo.unsaved === 'object';
    const status = carried === true ? ownDataMember(undo.unsaved, 'status') : undefined;
    const said = carried === true ? ownDataMember(undo.unsaved, 'message') : undefined;
    refusal = 'the store restored its own state to the journal mark IN MEMORY and its FILE WAS NOT UPDATED ('
      + `${JSON.stringify(typeof status === 'string' ? status : 'a refusal')}: `
      + `${typeof said === 'string' ? said : ''}) — the bytes at the store's file path still describe the state `
      + 'that stood before the reversal; ';
  } else if (undo.refused !== null && undo.refused !== undefined) {
    // READ AS OWN DATA MEMBERS AND OFF NO CHAIN (`D-35`'s read half): the store's own plain refusal carries
    // `{status, message}` and nothing else, and a thrown value that is not an object is named as itself.
    const carried = typeof undo.refused === 'object';
    const status = carried === true ? ownDataMember(undo.refused, 'status') : undefined;
    const said = carried === true ? ownDataMember(undo.refused, 'message') : undefined;
    refusal = `the store REFUSED the journal mark (${JSON.stringify(typeof status === 'string' ? status : 'a refusal')}`
      + `: ${typeof said === 'string' ? said : ''}) and holds the state it held; `;
  }
  if (undo.failed.length === 0 && undo.wholeCommit.length === 0) {
    return `${refusal}the reversal was UNDONE: every address it moved stands again exactly as it stood before `
      + 'the reversal — the same value at the same tier, or absent where it was absent (the baseline this '
      + 'verdict measured is the pre-reversal standing, which is the state the journal mark the commit cached '
      + 'at its opening holds)';
  }
  // **⟶ AND A SUCCESSFUL RESTORE WHOSE MARK STANDS BEFORE THE REVERSAL IS NAMED AS WHAT IT IS — `DEF-AJ`.**
  // The store's act succeeded (`failed` is empty), so nothing here is a failure; what differs from the watch's
  // capture is the commit's own earlier work, which the same mark undoes. **THE SENTENCE SAYS *UNDONE* AND SAYS
  // ITS BASELINE**, because a restore that succeeded must say so.
  if (undo.failed.length === 0) {
    let named = '';
    for (let index = 0; index < undo.wholeCommit.length; index += 1) {
      const one = undo.wholeCommit[index];
      named += index === 0 ? '' : '; ';
      named += `${addressSpelling(one.address)} stands ${standingDescription(one.standing, one.tiers)} where it `
        + `stood ${capturedDescription(one)} immediately before the reversal`;
    }
    const movedCount = undo.total === 1 ? 'address' : 'addresses';
    const stands = undo.restored === 1 ? 'stands' : 'stand';
    return `${refusal}the store was restored to the journal mark its commit cached at its opening, so the `
      + `reversal was UNDONE — as a WHOLE-COMMIT UNDO (the baseline this verdict measured is the pre-reversal `
      + `standing): all ${undo.total} ${movedCount} it moved ${stands} where that mark leaves them, and the `
      + `difference from the pre-reversal standing is the commit's own earlier work, undone with it — ${named}`;
  }
  let named = '';
  for (let index = 0; index < undo.failed.length; index += 1) {
    const one = undo.failed[index];
    named += index === 0 ? '' : '; ';
    named += `${addressSpelling(one.address)} could not be restored and stands `
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
///
/// **⟶ AND THE BODY IS INVOKED WITH NOTHING NAMED, 2026-10-27 (`D-45`, `D-46` item `1`).** A pair's constraint
/// body is EXTERNALLY-SUPPLIED FUNCTION code entering the surface **and it has no commit to name** — its
/// five-member context carries none (`kernel-surface.md §2.3` item 1) — so **a verb the body calls OPENS ITS OWN
/// COMMIT** rather than joining the commit the reversal is being judged inside. **THE CONTEXT IS BUILT ABOVE THE
/// INVOCATION**, so the store read the context owes is this frame's act and not the body's, and the conversion
/// below is unchanged.
function reversalOutcome(instance, entry, address, value) {
  const context = {
    address: address.slice(),
    tier: null,
    value,
    attempt: null,
    op: null,
  };
  try {
    return externalCall(instance, () => entry.fn(context));
  } catch (body) {
    const carried = Object.create(null);
    // THE TWO SLOTS THE KERNEL'S OWN MARK CARRIES (`kernel-foundations.mjs`'s `markBodyThrow`): the pair's
    // address spelling joined by `/`, and the log as it stood when the body threw — `[]` here, because no
    // attempt stands at a reversal's judgement.
    carried.address = addressSpelling(address);
    carried.log = [];
    // **⟶ AND THE BODY'S OWN VALUE IS HANDED IN, 2026-10-28 (`DEF-AK`)**: `bodyThrowRefusal` carries an inner
    // refusal beside the crossed one and names it in the crossed sentence, and the value the body threw is
    // the only place that refusal stands.
    //
    // **⟶ AND ITS FORM IS TAKEN HERE, 2026-10-28 — `D-55` ITEM 1, `DEF-AK`.** No attempt stands at a reversal's
    // judgement, so there is no terminal entry for the kernel to record it in: **the judgement's own refusal
    // list is the log this failure crosses with**, and its ONE entry carries the form the body threw
    // (`reversalRefusal` reads it off this `WeakMap`). **A `WeakMap` AND NOT A MEMBER**: the converted form's
    // three members are unmoved and nothing is added to any record (`A117` (D6)).
    const form = throwableForm(body);
    // **`false` — NO ATTEMPT LOG STANDS AT A JUDGEMENT, AND THIS FRAME'S OWN LIST KEEPS ITS ONE ENTRY**: the
    // form the body threw is carried through `THROWN_FORM` and printed in that entry's sentence by
    // `reversalRefusal`, so the crossed sentence points at the `log` it actually carries (`DEF-AK`).
    const converted = bodyThrowRefusal(carried, body, false);
    if (converted !== null && typeof converted === 'object') THROWN_FORM.set(converted, form);
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
function reversalRefusal(one, after, said, reversalId, undo, thrown, unsettled = false, spentAtAsked = true) {
  const addon_ = withAddon();
  // **THE `<SEGMENT>` SLOT IS THE ADDRESS SPELLING THE KERNEL'S OWN REGISTRATION REFUSAL HANDS THE SAME
  // GENERATOR** (`kernel-registration.mjs`'s `registrationRefusal`: the segments joined by `/`, BARE — the
  // generator's own `build` is what prints a string segment single-quoted, so a pre-quoted spelling here
  // would print `''a''`). One spelling, one home, and no second quoting rule.
  const subject = addressSpelling(one.address);
  // **⟶ AND THE UNQUIET ARM KEEPS THE SAME CROSSED STATUS, `D-42` (2026-10-27).** A restart that spends its
  // budget has not been JUDGED — it could not settle — and **a check that will not settle is a check that does
  // not pass** (`D-41` item `4`'s own direction), so the status is the set's rank-`20` member for a refused
  // pass, exactly the one the at-rest control crosses with. **ONLY THE LOG ENTRY'S SENTENCE DIFFERS**, so that
  // no consumer is told a pair refused a state it never got to judge.
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
  // **⟶ AND A SPENT BUDGET IS NOT A PAIR REFUSING, IN ITS OWN WORDS — 2026-10-28, `DEF-AL`, MEASURED.** The
  // budget's crossed `message` used to be BYTE-IDENTICAL to a genuine refusal's (the same rank-`20` member and
  // the same generated sentence at the same subject), so a consumer reading only the message could not tell a
  // real refusal from an exhausted budget. **The store's generated sentence still stands first (`DD-52`: one
  // source for the code), and this arm appends the fact the code cannot carry** — the check did not settle and
  // NO PAIR REFUSED ANYTHING; a pair body acted at every restart. A genuine refusal's message never carries
  // this clause, which is what makes the two distinguishable.
  if (unsettled === true) {
    message = `${message} — this refusal is a RESTART BUDGET EXHAUSTION and NOT a constraint pair refusing a `
      + `state: no pair refused the state the check was asking it for, a pair body acted inside the check at `
      + `every restart, the budget of ${RESTART_LIMIT} restarts is spent and the check could not settle`;
  }
  // **⟶ AND AN INNER REFUSAL THE BODY THREW IS CARRIED BESIDE THE CROSSED ONE, 2026-10-28 (`DEF-AK`).** The
  // body that threw at this judgement threw through `reversalOutcome`, whose conversion is `bodyThrowRefusal`'s
  // — so the converted form carries the inner refusal under the same symbol, and it travels on from here.
  const inner = thrown === null ? null : innerRefusalCarried(thrown);
  if (inner !== null) {
    const innerStatus = ownDataMember(inner, 'status');
    const innerSaid = ownDataMember(inner, 'message');
    message = `${message} — the value the constraint body threw does NOT cross as this refusal: it was ITSELF a `
      + `refusal, ${JSON.stringify(innerStatus)} with the message ${JSON.stringify(innerSaid)}, and it crosses `
      + `BESIDE this one under Symbol.for('provident-storeroom.inner-refusal') with its own log`;
  }
  // **THE LOG ENTRY'S SENTENCE, AT ITS THREE ARMS** — a pair that refused the state the reversal (or the
  // in-commit action) left, a body that threw at the judgement of it, and — from `D-42` — **the restart's own
  // budget spent**. The third arm is the one the restart's exhaustion reaches and it names no refusing pair.
  let spelled;
  if (unsettled === true) {
    // **⟶ AND THE ENTRY NAMES THE PAIR THE CHECK WAS ASKING AND THE ADDRESS IT WAS ASKING AT, 2026-10-28
    // (`DEF-AL`).** It used to name the FIRST WATCHED pair — a passing one, by id — because registration order
    // decided it. The `spentAtAsked` arm says plainly WHEN THE BUDGET RAN OUT WITH NO ASK IN FLIGHT, so the
    // entry never claims to name a pair it cannot know.
    spelled = spentAtAsked === true
      ? `the constraint ${one.entry.id} could not be asked a state that would settle at `
        + `${addressSpelling(one.address)}: the value there is ${standingSpelling(after)} — this pair was being `
        + `asked when the restart budget ran out, it did not refuse anything, a pair body acted inside the `
        + `check at every restart, the check was restarted ${RESTART_LIMIT} times and the budget is spent, so `
        + `the check does not pass — ${undoSpelling(undo)}`
      : `no pair was being asked when the restart budget ran out at ${addressSpelling(one.address)}: the value `
        + `there is ${standingSpelling(after)} — a pair body acted inside the check without an ask in flight, `
        + `the check was restarted ${RESTART_LIMIT} times and the budget is spent, so the check does not pass `
        + `— ${undoSpelling(undo)}`;
  } else if (thrown === null) {
    spelled = `the constraint ${one.entry.id} refused the state the reversal left at `
      + `${addressSpelling(one.address)}: the value there is ${standingSpelling(after)}`
      + (said === null ? '' : ` — ${said}`)
      + ` — ${undoSpelling(undo)}`;
  } else {
    // **⟶ AND THE THROWABLE'S OWN FORM IS PRINTED IN THIS ENTRY — `D-55` ITEM 1, `DEF-AK`, 2026-10-28.** No
    // attempt stands at a reversal's judgement, so no commit log exists for the kernel to append to: **this
    // refusal's ONE entry is the log the failure crosses with**, so the value the body threw is named HERE —
    // the form the catch frame took (`THROWN_FORM`) where the value was converted, and the value's own form
    // where the tree carried no generator to convert it. **THE ENTRY'S SHAPE, KIND, `seq` AND MEMBER COUNT DO
    // NOT MOVE**: the form is in the sentence, not in a seventh member and not in a second entry (`D-41` item
    // `4`'s one-entry arm, which the restoration's cell asserts).
    const took = THROWN_FORM.get(thrown);
    const form = typeof took === 'string' ? took : throwableForm(thrown);
    spelled = `the constraint ${one.entry.id} THREW at the judgement of the state the reversal left at `
      + `${addressSpelling(one.address)}: the value there is ${standingSpelling(after)}`
      + ` — the value it threw was ${form}`
      + ` — ${undoSpelling(undo)}`;
  }
  const entry = {
    // **⟶ AND THE `seq` STANDS, 2026-10-28 — `DEF-AI`: THE ENTRY'S DECLARED SHAPE IS THE KERNEL'S CLOSED SIX
    // AND THIS ONE CARRIED FIVE.** The 2026-10-27 clause below withdrew the `1` as FABRICATED, on the reading
    // that `seq` is *"the ordinal within an ATTEMPT's own log"* and that no attempt stands at a reversal's
    // judgement. **THE READING IS RIGHT ABOUT THE ATTEMPT AND WRONG ABOUT THE MEMBER.** `seq`'s DECLARED
    // DOMAIN is *"the append ordinal, strictly increasing from `1` in array order"*
    // (`docs/specs/storeroom-constraints/kernel-surface.md §2.5` item 1), and the array this entry stands in is
    // THIS REFUSAL'S OWN ONE-ENTRY LIST: its first element's ordinal is `1` BY THAT RULE, not by invention —
    // the same arithmetic the kernel's own `append` performs (`log.length + 1`, read off the list the entry
    // stands in). **AND THE TWO COPIES OF THIS VERY ENTRY ALREADY DISAGREED**: `carryRestartRefusal` re-appends
    // it into the attempt's log through `append`, where it carries `seq` `1`, while the list that crosses to
    // the caller carried none — one entry, two shapes, which is this branch's `DEF-AI` class exactly. **`log`
    // IS DECLARED `LogEntry[]`** (`bindings/js/index.d.ts`), so a consumer typing it read `undefined` where
    // `number` is declared. **THE DECLARATION IS NOT WEAKENED TO MATCH THE ENTRY: THE ENTRY CARRIES THE
    // MEMBER.** No other member, no second entry and no sentence moves.
    kind: 'constraint-check',
    seq: 1,
    id: one.entry.id,
    // **⟶ AND THE ENTRY SAYS WHAT THE ACT DID, 2026-10-26 (`DEF-W`'s `(a)`) and 2026-10-27 (`D-41` item `2`)** —
    // the refusal's own record, beside the state it refused, so a consumer that catches it knows whether the
    // store stands again where the reversal found it (and is told plainly, and by address, where it does not).
    // ONE ENTRY, FIVE MEMBERS: the sentence is this entry's, and no second log entry and no sixth member is
    // minted.
    message: spelled,
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
  const crossed = packageRefusal({ status, message, log: refusalLog(log) });
  if (inner !== null) {
    // THE INNER REFUSAL TRAVELS ON THE REFUSAL THE CALLER CATCHES, under the same symbol and the same
    // non-enumerable discipline `bodyThrowRefusal` uses: the crossed form's three members are unmoved.
    Object.defineProperty(crossed, INNER_REFUSAL, {
      value: inner,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
  return crossed;
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
