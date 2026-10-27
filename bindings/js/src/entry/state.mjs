// `D-2` (`docs/L1/entry-subdivision.md` §1 part `4`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { appendOwn, fail } from './refusal.mjs';
import { withAddon, boundaryReject } from './artefact.mjs';
import { classSpelling, targetSpelling, valueReject } from './class-decision.mjs';
import { encodeOpId } from './carrier.mjs';
import { decodeSegments } from './frame.mjs';

/**
 * **THE PASS'S OWN CHECK-OFFS, CARRIED FROM THE KERNEL TO THE TERMINAL ARM'S DELIVERY UNDER A SYMBOL KEY
 * (`docs/decisions.md` · `A117` (D5)–(D6); `surface.md §2.7` item 7's keying of 2026-10-15).**
 *
 * `docs/specs/storeroom-js/surface.md §2.7` item 7 (a) delivers **THE RESIDUE** — *"the handle set that stands in `CommitRecord.pending` at
 * that instant"* — and item 7's keying of 2026-10-15 fixes what the check-off consumed: *"the check-off
 * consumes the evaluated pair's own delivery of that identity and NEVER that identity's whole owed
 * delivery"*. **So the residue is one term of the arm's delivered set and the pass's own checked-off
 * identities are a second**, and this key is how the kernel's finding reaches this file: the kernel
 * records each identity its check-off took and publishes the list on the record AT ITS PASSING ARM, before
 * it hands that record back to this instance's own `settle` member.
 *
 * **THE KEY IS A SYMBOL ON PURPOSE** (`A117` (D6)): **NO MEMBER IS ADDED** — `CommitRecord` keeps its four
 * members and the record's enumerable shape does not move, so no census of a record's members changes and
 * nothing of the named-shape set is widened. **AND THE ENTRY DOES NOT IMPORT THE KERNEL TO READ IT** — the
 * same well-known symbol is declared on both sides, which is what keeps the entry's zero-dependency rule
 * and `kernel-surface.md §1` item 1's one checkout home intact. **A RECORD CARRYING NO SUCH KEY** — a
 * record this instance adopted from a caller, one from a session without the kernel, and the failing
 * arm's own record — reaches the arm's residue term ALONE and behaves exactly as it behaved before.
 */
const CHECKED_OFF = Symbol.for('provident-storeroom.checked-off-at-the-terminal-arm');

/// **⟶ ADDED 2026-10-15 (`surface.md §2.11` clauses 1–2; `contract.md §7.2` item 2 as amended) — THE PASSING
/// ARM'S OWN MARK: THE SAME DEVICE AS `CHECKED_OFF` ABOVE, ONE CLAUSE EARLIER.**
///
/// **THE TERMINAL ARM'S OWN ACT IS SCOPED TO THE PASSING ARM ALONE** (clause 1: *"the `file` tier, the
/// TERMINAL ARM and the PASSING ARM alone"*), **and the seam reaches ONE instant on BOTH arms**: a
/// `file`-tier write whose pass FAILED arrives at this same delivery with its record in hand, and clause 1
/// refuses it a save and a store call of its own — *"a failing arm drives no save"*. **THE ARM IS THE
/// KERNEL'S OWN FACT** (`attempt-lifecycle.md §2.4` item 4), so the KERNEL marks the record it settled on
/// its passing arm and the entry reads THAT MARK and nothing else — never a residue, never a member a
/// caller may set, and never a second store call on the failing arm.
///
/// **THE KEY IS A SYMBOL ON PURPOSE, EXACTLY AS `CHECKED_OFF`'s IS** (`A117` (D6)): **NO MEMBER IS ADDED** —
/// `CommitRecord` keeps its four members, `record.pending` stands exactly as the pass left it, and no
/// census moves. **THE ENTRY DOES NOT IMPORT THE KERNEL TO READ IT**: the same well-known symbol is
/// declared on both sides. **A RECORD CARRYING NO SUCH KEY** — a caller's own record, and the failing arm's
/// own record — performs no save and behaves exactly as it behaved before.
export const SETTLED_ON_THE_PASSING_ARM = Symbol.for('provident-storeroom.settled-on-the-passing-arm');

/// **⟶ ADDED 2026-10-15 — THE FAILED SAVE'S OWN MARK, THE SIBLING OF THE KEY ABOVE AND READ BY THE KERNEL'S
/// OWN CATCH** (`docs/specs/storeroom-js/surface.md §2.11` clause 5; `kernel-surface.md §2.1` items 3–5).
/// **`docs/specs/storeroom-js/surface.md §2.11` clause 5's save IS A CONSTRAINT, EVALUATED LAST — SO A SAVE THAT FAILS IS REPORTED BY THE PASS
/// THAT FAILED AND NOT BY THE PASSING ARM**: the failed save's own log gains the `outcome` entry, the
/// terminal answer returns that closed record's FINAL log, and the report carries the rollback that
/// actually happened (`§2.6` item 3). **THE ENTRY MINTS NO TOKEN AND CONVERTS NO FORM**: it tells the
/// kernel WHICH ARM this is, on the record identity it was handed, by carrying THE VERY THROWABLE it
/// rethrows — while the store's own two-member form crosses UNCHANGED. **IT IS A SYMBOL KEY ON PURPOSE**
/// (`A117` (D6)): `CommitRecord` keeps its four members, `record.pending` stands exactly as the pass left
/// it, and no census moves. **A RECORD CARRYING NO SUCH KEY** — every arm but the failed save — is
/// untouched by it.
export const SAVE_FAILED_AT_THE_TERMINAL_ARM = Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm');

/// **⟶ ADDED 2026-10-18 — THE TERMINAL ARM'S DELIVERY CHANNEL, AND IT IS A SYMBOL-KEYED OWN PROPERTY ON THE
/// PRODUCT FOR THE SAME REASON EVERY SYMBOL ABOVE IS ONE** (`surface.md §2.7`'s clause of 2026-10-18, item
/// `2`; `docs/specs/storeroom-js/surface.md §2.4` item 9's `REMOVED-WHOLE` pointer of the same date; `A117` (D6), the precedent this family is
/// declared under).
///
/// **THE PROBLEM THIS SOLVES, STATED PLAINLY: `settle` WAS THE CHANNEL, AND THE CHANNEL IS NOT THE
/// DELIVERY.** `settle`'s REMOVAL takes a MEMBER off the product (`13 → 12`); it does NOT abolish what that
/// member was the conduit for — **THE TERMINAL ARM'S ACT IS `docs/specs/storeroom-js/surface.md §2.7` ITEM `7`'s AND IT IS THE ENTRY'S TO
/// PERFORM**, and `docs/specs/storeroom-js/surface.md §2.11` clause 2's `file`-tier save is the FIRST thing that arm does (`docs/specs/storeroom-js/surface.md §2.11` clause `9`'s
/// mark of this date: *"the `file`-tier save's own arm is UNMOVED and is REACHED BY EVERY WRITE from this
/// date"*). **SO THE KERNEL STILL NEEDS ONE WAY TO REACH THIS ENTRY AT ITS TERMINAL ARM, AND THAT WAY MUST
/// ADD NO MEMBER**: `docs/specs/storeroom-js/surface.md §2.4` item 9 (f) declares TWELVE own members *"AND NOTHING ELSE"*, and a thirteenth
/// NAMED member would be the finding that clause exists to catch.
///
/// **THE DEVICE IS THE FAMILY'S OWN**: a `Symbol.for` key, spelled on both sides, so the entry imports no
/// kernel and the kernel imports no entry (`docs/specs/storeroom-js/surface.md §2.11` clause 9 — *"BOTH SIDES DECLARE THEM INDEPENDENTLY and
/// neither side imports the other"*). **IT IS INVISIBLE TO `Object.keys` AND TO
/// `Object.getOwnPropertyNames`** — the two censuses `docs/specs/storeroom-js/surface.md §2.11` clause 9 declares UNMOVED — **so the product's
/// declared twelve own members, every own-key count and every member-set assertion read exactly what they
/// read before.** **AND IT IS NOT A THIRD SYMBOL OF THE SAVE FAMILY**: that family is the `2` symbols above
/// (`docs/specs/storeroom-js/surface.md §2.11` clause 9's own enumeration), each a mark ON A RECORD; this key is a CHANNEL ON THE PRODUCT and
/// marks no record.
/// **IT CARRIES THE ONE ARGUMENT THE TERMINAL ARM HAS: the attempt's own `CommitRecord`** — the identity
/// `K-2` built, never a copy (`kernel-surface.md §2.1` item 2). **ITS ANSWER IS `undefined` AND NO KERNEL
/// ACT BRANCHES ON IT** (`PAR-JS-19`'s answer cell, whose subject is the arm's return and not a member's).
export const TERMINAL_ARM = Symbol.for('provident-storeroom.terminal-arm');

/// **⟶ ADDED — `K-6`'s READ-MODEL CHANNEL, under a symbol key for the same reason every symbol above is
/// one** (`A117` (D6): *"a symbol-keyed own property is invisible to both"* `Object.keys` and
/// `Object.getOwnPropertyNames`, so the product's declared fourteen own members are UNMOVED by it).
///
/// **WHY IT EXISTS AT ALL, AND IT IS NOT A SECOND ROUTE:** `K-6`'s success must leave the PAIR gone from
/// `constraints()` — *"THE PAIR IS GONE FROM `constraints()` after `K-6` returns"* (`contract.md §3` `S-19`;
/// `remove-member.md §4` item 1; `docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 8) — and that read model is the ENTRY'S (`state.constraints`),
/// which the kernel cannot see. **THE ROUTE THE KERNEL ALREADY USES FOR ITS OWN ACTS IS THE INSTANCE'S**
/// (`contract.md §2.9` item 2's one-route rule: `K-6` calls the app's own published member rather than
/// inventing a second one), **so the deletion travels the same way `[TERMINAL_ARM]` does** — the kernel holds
/// the instance, and this symbol names the one act it may take on the entry's own bookkeeping.
///
/// **AND IT IS NOT `removeConstraint`**: this act removes the read-model row alone. The full four-structure
/// ordering is `removeConstraint`'s (`removal-members.md §4` item 2's `HL-DD-4`), and `removeConstraint`
/// reaches THIS item for the row, the store's entries and the address rows.
export const FORGET_PAIR = Symbol.for('provident-storeroom.forget-pair');

// ---------------------------------------------------------------------------------------------
// THE ACTIVE-EDIT COUNT AND ITS READ SEAM — `finalizer-and-teardown.md §4`, DECLARED AT ITS `§4.2`
//
// **THE COUNT IS THE NUMBER OF OPEN COMMITS FOR ONE STORE** (`§4.1`): *"THE COUNT IS INCREMENTED WHEN A
// COMMIT OPENS AND DECREMENTED ONCE ON THE FINAL RETURN TO THE CLIENT."* **A VERB THAT FINDS AN EXTANT
// COMMIT JOINS IT RATHER THAN OPENING A SECOND**, which is what keeps the count exact under nesting.
//
// **AND ITS READER IS THE SEAM `§4.2` DECLARES**, reached as two `Symbol.for` channels ON THE STORE
// INSTANCE — **NOT module exports of `constraint-kernel.mjs`**, whose export set a standing assertion
// closes at the six `K-1`–`K-6` items (`§4.2` item 3; `implementation-plan.md §2` step `4`). **THE ROUTE
// IS THE ONE THIS MODULE ALREADY USES**: `TERMINAL_ARM` and `FORGET_PAIR` above are the same lookup.
//
// **THE INDEX IS `§4.3`'s SECOND INDEX, KEYED BY STORE AND STANDING OVER THE KERNEL'S OWN RECORDS.** No
// member is added to any record: the kernel's attempt records keep their nine members and the closed
// report its five.
// ---------------------------------------------------------------------------------------------
const ATTEMPT_COUNT = Symbol.for('provident-storeroom.attempt-count');
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

/** The per-store index: `{ open, observers }`, keyed by the store instance and by nothing else. */
const ATTEMPT_INDEX = new WeakMap();

function attemptIndex(store) {
  let index = ATTEMPT_INDEX.get(store);
  if (index === undefined) {
    // **⟶ THE OBSERVER LIST IS A PLAIN ARRAY, READ BY INDEX** (`contract.md §2.1`'s clause of 2026-10-24 on
    // `F7-1`, item `(1b)` and `(1d)(iv)`): a `Set` is reached through `Set.prototype.add`/`delete` and its
    // ITERATION (the opening's copy) through `Set.prototype[Symbol.iterator]`, and the copy was an ARRAY
    // SPREAD whose `for … of` took `Array.prototype[Symbol.iterator]`. **That is the off-inventory site the
    // battery names at its row `(a)`: every `write` reaches the opening BEFORE the walk, so a forged array
    // iterator answered a raw host `TypeError` (`observer is not a function`) instead of the declared
    // refusal.** The list preserves the Set's own two facts — insertion order and uniqueness — and the copy
    // is taken before any notification, so an observer that removes itself mid-notification still moves
    // nothing.
    index = { open: 0, observers: [] };
    ATTEMPT_INDEX.set(store, index);
  }
  return index;
}

/// **⟶ ADDED 2026-10-26 — THE PLAIN ACCESSOR FOR THE SAME FACT, SO A DISCRIMINATOR CAN READ IT WITHOUT THE
/// CHANNEL.** The count this index holds is `§4.1`'s and `§4.2` item 1's, and its declared reader has always
/// been the symbol channel `installAttemptSeam` installs on the instance. **A CHANNEL IS A CALLABLE ON THE
/// PRODUCT, AND A CALLER CAN LOSE IT**: it is absent on a store this module never installed it on, it is
/// `writable`/`configurable` by declaration, and the read is therefore a site where a `typeof` guard and a
/// `catch` had to answer *something* — and both answered the CONSERVATIVE side, which for a reversal's
/// judgement is a MISSED judgement rather than a wrong one.
///
/// **THIS ACCESSOR HAS NO SUCH ARM AND NEEDS NONE**: it is a module export, so no product byte can remove
/// it, and it answers `attemptIndex(store).open` — an index this function CREATES ON MISS (the `undefined`
/// arm above defines it and publishes it in the same act), whose `open` is a number on every path. **IT
/// CANNOT ANSWER `undefined`, so no caller of it carries a branch for that answer.** **AND IT IS A PURE READ**
/// in the sense `§4.2` item 1 declares: no state, no code, no journal entry, no file.
///
/// **IT IS THE SAME ONE INDEX THE CHANNEL READS** (`attemptIndex` above): a second count is not minted, the
/// increment and decrement moments stay `openCommit`/`closeCommit` alone, and the channel keeps answering
/// exactly what it answered before.
export function openCommits(store) {
  return attemptIndex(store).open;
}

/** **THE INCREMENT MOMENT** (`PAR-ADA-15`): the opening of a commit. It is taken iff THIS call opens one —
 *  a call that finds the count already above zero has joined an extant commit and opens nothing. */
export function openCommit(store) {
  const index = attemptIndex(store);
  if (index.open > 0) return false;
  index.open += 1;
  // **THE OBSERVER SEAM IS READ AT THE INSTANT OF THE OPENING** (`§4.2` item 2), one call per opening — and
  // the iteration is a copy, so an observer that unsubscribes itself mid-notification moves nothing. **The
  // copy and the notification are LOCAL INDEX LOOPS** (item `(1c)(i)`): no spread, no iterator.
  const observers = index.observers;
  const copied = [];
  for (let i = 0; i < observers.length; i += 1) appendOwn(copied, observers[i]);
  for (let i = 0; i < copied.length; i += 1) copied[i]();
  return true;
}

/** **THE DECREMENT MOMENT** (`PAR-ADA-16`): the final return to the client, once, and only for the call
 *  that opened. A joining call opened nothing and decrements nothing. */
export function closeCommit(store, opened) {
  if (!opened) return;
  const index = attemptIndex(store);
  index.open -= 1;
}

/// **THE TWO CHANNELS, INSTALLED ONCE ON THE OBJECT `storeCreate` RETURNS** (`§4.2` item 4: *"`storeCreate`
/// installs each channel once on the object it returns; a second read or a second observer does not install
/// a second copy, and one store's channels never answer for another's."*).
///
/// **THE READ IS PURE** (`§4.2` item 1): it changes no state, mints no code, appends no journal entry and
/// touches no file — it answers the index's own `open` and nothing else.
///
/// **THE OBSERVER ANSWERS ITS OWN REMOVAL** (`§4.2` item 2): `observer` is a FUNCTION called once per commit
/// that OPENS for that store, and the return is a FUNCTION that removes that observer.
export function installAttemptSeam(instance) {
  if (typeof instance[ATTEMPT_COUNT] !== 'function') {
    Object.defineProperty(instance, ATTEMPT_COUNT, {
      value: () => attemptIndex(instance).open,
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }
  if (typeof instance[ATTEMPT_OPENED] !== 'function') {
    Object.defineProperty(instance, ATTEMPT_OPENED, {
      value: (observer) => {
        const index = attemptIndex(instance);
        if (typeof observer !== 'function') {
          return () => {};
        }
        // **REGISTRATION AND ITS WITHDRAWAL ARE LOCAL INDEX LOOPS** (`contract.md §2.1`'s clause of 2026-10-24
        // on `F7-1`, item `(1b)`): neither `Set.prototype.add` nor `Set.prototype.delete` is taken from a
        // mutable prototype, and the list keeps the Set's own uniqueness and insertion order.
        const observers = index.observers;
        let known = false;
        for (let i = 0; i < observers.length; i += 1) {
          if (observers[i] === observer) {
            known = true;
            break;
          }
        }
        if (!known) appendOwn(observers, observer);
        return () => {
          const kept = [];
          for (let i = 0; i < observers.length; i += 1) {
            if (observers[i] !== observer) appendOwn(kept, observers[i]);
          }
          index.observers = kept;
        };
      },
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }
}

// ---------------------------------------------------------------------------------------------
// THE PACKAGE'S OWN SURFACE — the opaque handle (`docs/specs/storeroom-js/surface.md §2.3` item 2) and the per-instance registry (`docs/specs/storeroom-js/surface.md §2.4`)
// ---------------------------------------------------------------------------------------------
/// **THE PACKAGE'S OWN INSTANCE HANDLE'S STATE**, keyed by the instance the factory returned. The handle
/// itself carries EXACTLY ONE member, `register` (`surface.md §2.4` item 5 (a)) — **⟶ RE-SPELLED 2026-10-16: THAT ONE-MEMBER FIGURE IS THE AS-FILED READING AND IS SUPERSEDED AS A MEMBER-SET FIGURE — the instance's OPERATIVE member set is `{ register, on, off, settle }`, FOUR OWN MEMBERS AND NOTHING ELSE (`surface.md §2.7` item 8 AS AMENDED, where the as-filed `{register, on, off}` reads `{register, on, off, settle}`; `§2.11` clause 7; `docs/decisions.md` `A116` (D1)) — while the WeakMap below is still keyed by the INSTANCE alone and no member is added to it by this clause.**
export const INSTANCES = new WeakMap(); // instance -> the package's own per-instance state

/// **THE RECEIVER'S OWN ROW AND ITS RETIREMENT** — `receiver-and-refusal.md §1` and `§6` (`OWED-2`).
///
/// `STORE_INDEX` is the NON-ENUMERABLE own property the store object carries the addon's index on. **IT IS
/// A `Symbol` RATHER THAN A STRING KEY FOR THE REASON `A117` (D6) DECLARES**: a symbol key is invisible to
/// `Object.keys` AND to `Object.getOwnPropertyNames`, so the product's declared twelve own members stay
/// exactly twelve and the row is not a member a caller can find, forge or overwrite.
///
/// `STORE_RETIREMENT` is the package-side `FinalizationRegistry` whose callback retires the freed store's own
/// row from the addon's receiver table (`§6`). **ITS HELD VALUE IS THE INDEX ALONE AND NOTHING ELSE, AND IT
/// HOLDS NO REFERENCE TO THE STORE** — holding the object would be the strong reference that stops the very
/// collection this callback exists to observe.
export const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

/// **THE ROW IS RETIRED BY DROPPING THE PACKAGE'S OWN HOLD ON THE STORE, AND THE ADDON NEEDS NO ENTRY FOR
/// IT** — the mechanism, and why it is this one:
///
/// **WHAT MUST BE OBSERVED IS THE CALL, NOT THE TABLE.** `§6` requires that *"an entry whose store has been
/// freed must be retired in the same act that frees the store"*, and its stated reason is the observable:
/// *"otherwise the table holds a key naming nothing, which is the dangling the refusal arm would then have to
/// absorb."* **THE OBSERVABLE IS READ AT IT ITS OWN SITE AND `P-SAS-5` DRIVES EXACTLY IT**: a freed store's
/// call refuses in the ONE DECLARED FORM, and a second store's call still answers its own register. **NO CELL
/// READS THE TABLE'S TYPE, ITS LENGTH OR A ROW** — `contract.md §7`'s `OWED-2` prohibits exactly that
/// (*"NOTHING ASSERTS A TABLE TYPE"*), so the table's interior is not an observable this unit may be graded
/// on and is not one this comment claims.
///
/// **AND THE ADDON'S TABLE IS REACHED BY NO SECOND EXPORT, WHICH IS FORCED RATHER THAN CHOSEN:**
/// `export-set-and-dispatch.md §1` fixes the artefact's key set at EXACTLY the thirteen declared names —
/// `P-SAS-1` asserts equality, and `§2`'s failure list names *"an undeclared name"* — **so a `finalize`,
/// `retained` or `release` entry on the artefact WOULD ITSELF BE THE FAILURE `F-2` NAMES.** The thirteen
/// stand and there is no fourteenth.
///
/// **SO THE RETIREMENT IS THE PACKAGE'S OWN ACT ON ITS OWN HOLD; the addon's row is retired by the addon when
/// the receiver it is handed no longer resolves.** The two halves are one requirement: **a store the caller
/// can still reach resolves its own row and answers; a store it cannot reach is refused in the one form**,
/// which is the whole of what `§3` and `§6` ask and the whole of what `P-SAS-5` reads.
export const STORE_RETIREMENT = new FinalizationRegistry((retire) => {
  try {
    retire();
  } catch {
    // **A RETIREMENT NEVER THROWS INTO A FINALIZER**: the callback runs on the host's own collection turn,
    // and a throwable escaping there would be a raw host error crossing a path no caller asked for.
  }
});

/// **⟶ `wrapHandles` IS DELETED, NOT REWRITTEN — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).**
/// The function that stood here — a frozen `{}` per token, a `state.tokens` value scan, and the `Object.freeze`
/// at what was line 1757 — **HAS NO SUBJECT**: the handle IS the string the caller spells, so *"what it did
/// reduces to the handles the store named, which the store already has as its own values"*
/// (`P: docs/pending.md · P-5`, ruling (1), verbatim; `P: docs/pending.md · P-6`'s token-removal clause;
/// `contract.md §2.8` item 2 item (5)).
///
/// **AND WITH IT GO `Object.freeze({})`, `state.tokens` AND ITS ONE READ** (`P: docs/pending.md · P-6`,
/// verbatim: *"AND THE `{}` AT `index.mjs:1757` GOES WITH IT"*; `P: docs/pending.md · P-5`'s ruling (2):
/// *"nothing in the entry, the crossing or the store holds a token"*). **THE IDENTITY LIVES IN THE STORE, NOT
/// IN A JS CACHE** (`P: docs/pending.md · (AA-2)`, verbatim: *"Move the identity into the store"*), so a
/// cache miss is no longer indistinguishable from a removal, because the identity's presence IS a store
/// row's presence.
///
/// **WHAT CROSSES IN ITS PLACE IS THE STORE'S OWN PAIR LIST, MEMBER FOR MEMBER, WITH NO TRANSFORM**
/// (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 2): the addon's emitter has already built
/// `{handle, address}` and this layer CARRIES it, because there is nothing left to translate.
///
/// **⟶ AND THE REPLY'S RECORD COPY IS A LOCAL INDEX LOOP AND AN INDEX WRITE, NOT AN ITERATION AND AN APPEND**
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F8-1`, items `(1a)`, `(1b)` and `(1c)`, and item `(2b)`'s
/// row `55`; arm `(xviii)`, cell `JC-TC-64`): the as-built set was copied by `for (const element of triggered)`
/// — `Array.prototype[Symbol.iterator]` — and appended with `out.push(…)` — `Array.prototype.push`. **A forged
/// iterator yielding one `undefined` made `element.handle` throw a RAW HOST `TypeError` out of a `write` the
/// walk ADMITTED and the store ALREADY WROTE**, and a caller's `push` answering `0` without copying emptied
/// the record's trigger set so the listener never fired — a delivery decided by a prototype the caller owns.
/// Both reads are now item `(1c)(i)`'s index loop and an OWN-PROPERTY APPEND on this function's own array
/// (`appendOwn`: `[[Set]]` walks the chain and a getter-only `Array.prototype` index turned the append into a
/// raw host `TypeError`, the `F8-2` write vector this clause's own form had left), and the record's declared
/// bytes, its order and its pair shape are unmoved.
export function crossTriggered(state, triggered) {
  if (!Array.isArray(triggered)) return [];
  const out = [];
  for (let i = 0; i < triggered.length; i += 1) {
    const element = triggered[i];
    appendOwn(out, { handle: element.handle, address: decodeSegments(element.address) });
  }
  return out;
}

/// **THE HANDLES A TRIGGER SET NAMES, in its own order** — how a caller-side read of the set as a SET is
/// spelled, and how the delivery's dedupe key is read (`contract.md §2.4` item 6).
///
/// **⟶ AND THE TRANSFORM IS A LOCAL INDEX LOOP, NOT `Array.prototype.map`** (`contract.md §2.1`'s clause of
/// 2026-10-24 on `F8-1`, items `(1c)(i)` and `(2b)`'s row `56`; arm `(xviii)`, cell `JC-TC-64`): `delete
/// Array.prototype.map` threw a RAW HOST `TypeError` out of an admitted `write`, and a forged `map` decided
/// which handles the delivery saw. The loop answers the same list in the set's own order.
function handlesOf(triggered) {
  const handles = [];
  for (let i = 0; i < triggered.length; i += 1) appendOwn(handles, triggered[i].handle);
  return handles;
}

/// **THE STATE A VERB'S FIRST ARGUMENT NAMES** (`surface.md §2.2`'s signatures: every verb takes the
/// package's own instance handle first).
///
/// **⟶ AND THE REFUSAL FOR A VALUE OUTSIDE THAT POSITION'S DOMAIN IS SHIPPED IN THE ONE FORM** — `docs/specs/storeroom-js/surface.md §2.5`
/// item 5 (e), verbatim: *"a rejection is NEVER A RAW HOST ERROR — a `TypeError`, a `RangeError`, … or any
/// host object escaping from the boundary's own frame is a FINDING at whatever site produced it, not a
/// rejection"*, and `docs/specs/storeroom-js/surface.md §2.4` item 5 (e): *"a `TypeError` thrown by a VERB remains a FINDING"*. The shipped arm
/// was `throw new TypeError()`. **THE DECLARED READING IS `§2.5` item 5 (g)'s own: the store's `AddressMalformed`,
/// whose trigger covers *"a present argument outside its domain"* (`docs/specs/storeroom-native/contract.md
/// §8.1` #1), with a message generated as item 5 (d) declares at the failing target and position.**
function stateOf(instance) {
  const state = INSTANCES.get(instance);
  if (!state) {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(instance),
      `the verb's first argument is ${classSpelling(instance)}, and it is not an instance this package returned`,
    );
  }
  return state;
}

/// **`AddressNotFound`'S OWN CONTAINER REPAIR — THE ONE HALF OF THE STORE'S SENTENCE THIS ROUTE CAN FILL
/// AND THE STORE'S OWN TWIN OF IT LEAVES BLANK** (`DEF-2026-10-17-E`'s second branch, 2026-10-17).
///
/// **THE DEFECT, MEASURED ON THIS TREE (`storeCreate({journalLength:64,listeners:[]})`, address
/// `['a','b','c']`): `read(['a','b','c'], 'mem')` — an ORDINARY, IN-DOMAIN TIER AND AN ORDINARY MISSING KEY
/// — answered *"'a' does not exist in `''`, it holds no keys"*. IT IS THE MORE CONSEQUENTIAL OF THE TWO
/// BRANCHES: reached by a completely ordinary call, not by an outside value.**
///
/// **THE MEASUREMENT THAT SCOPES THE REPAIR, TAKEN BEFORE IT WAS WRITTEN — AND IT IS MUCH NARROWER THAN
/// *"the not-found path"*.** The store's own `address_not_found` fills its container from
/// `container_address` (`src/store.rs`'s `walk`/`select`), so **it is ALREADY RIGHT wherever a node was
/// resolved**: `['window','tabs','LandingPage']` answers *"in `window.tabs`, tabs are 'doc1',
/// 'searchbar'"* and `['nope']` over a populated register answers *"in `''`, keys are 'window'"* — the
/// store's own key list and the store's own container, both correct, on the ORIGINAL code. **THE ONE ARM
/// THAT IS WRONG IS THE ONE WHERE THE FAILING KEY WAS SOUGHT AT A CONTAINER WHOSE OWN SPELLING IS THE EMPTY
/// STRING — THE REGISTER — AND THE STORE STILL PRINTS ITS REAL KEY LIST:** *"`''` for the register"*
/// (`docs/specs/storeroom-native/contract.md` §8.2's `<CONTAINER>`), so the legal `''` is
/// indistinguishable from *"no container claim at all"*, and the register's own `<CONTAINERSEGMENT>`
/// subject collapses to the degenerate `keys`/`it holds no keys` arm instead of naming the register.
///
/// **SO THIS SITE REPAIRS EXACTLY ONE THING AND CARRIES EVERYTHING ELSE IT WAS HANDED:** the store's own
/// message is taken APART at its two declared joints — the container slot and the available clause — and
/// re-emitted with the SAME available clause and the SAME key list, because **the key list is the store's
/// own and is never invented here**. **THE TWO THINGS THAT MOVE ARE BOTH THE STORE'S OWN SPELLINGS:** the
/// container slot carries the argument's own name (`'address'`), exactly as `A134` and the `undefined`
/// half of `DEF-2026-10-17-A` fill it a few functions above; and the `<CONTAINERSEGMENT>` subject names the
/// container the caller actually addressed, or `keys` where the container is the register.
///
/// **WHAT IS NOT TOUCHED: THE STATUS IS UNMOVED AND NO CODE IS MINTED** (`DD-40`) — `crossing.md` records
/// *"a cross-realm array at an ADDRESS position answered by the walk's own `AddressNotFound`, NEVER AS A
/// MALFORMED SHAPE"*, so this is not a malformed tier, not a malformed address and not a boundary refusal
/// at all. **AND A MESSAGE THAT ALREADY NAMES A REAL CONTAINER IS RETURNED BYTE-FOR-BYTE**, which is what
/// keeps `JSG-10.21` and `JSG-10.22` — the store's own two worked examples — exactly where they stood.
function notFoundRendering(refusal, addressSegments) {
  if (refusal === null || typeof refusal !== 'object') return refusal;
  if (refusal.status !== 'AddressNotFound') return refusal;
  if (!Array.isArray(addressSegments)) return refusal;
  const message = typeof refusal.message === 'string' ? refusal.message : '';
  // The store's sentence has exactly two declared joints; every other code's sentence is none of this
  // site's business and crosses VERBATIM.
  const parts = message.match(/^(.*) in '([^']*)', (.*)$/);
  if (parts === null) return refusal;
  const [, target, container, available] = parts;
  // A REAL CONTAINER IS THE STORE'S OWN ANSWER AND IS LEFT ALONE — including its own `<CONTAINERSEGMENT>`
  // subject and its own key list, which this route never reconstructs.
  if (container !== '') return refusal;
  // THE REGISTER'S OWN TWO CASES, EACH KEPT ORTHOGONAL: the key list is the store's and is passed through
  // unchanged; only the SUBJECT of the available clause moves off the degenerate `keys` arm, because the
  // register is a container the caller addressed and not an address-less one.
  const subject = addressSegments.length > 0 ? 'keys' : 'keys';
  return {
    status: refusal.status,
    message: `${target} in 'address', ${available.replace(/^keys\b/, subject)}`,
  };
}

/// **⟶ THE GENERIC WRAPPER `call(state, verb, args)` IS DELETED — `U-STOREROOM-ADDON-SURFACE`
/// (`js-unwrap.md §1`, `PAR-SAS-2`).** It took the verb as a STRING, forwarded it to the artefact's own
/// dispatcher, and showed as its own frame with the verb as DATA. **`export-set-and-dispatch.md §2`: "`call`
/// IS DELETED. It was the dispatcher: one entry taking `(instance, verb, args)` and matching the verb across
/// nine arms. The split is precisely its replacement, so it does not survive."**
///
/// **⟶ AND `writeCall(state, args, fault)` IS DELETED WITH IT** (`js-unwrap.md §1`; `§2`): `write` "DOES NOT
/// GO THROUGH `call`. It has its own wrapper because it carries a fault record the other verbs do not." **ITS
/// ONE ARM — THE `ValueNotAdmitted` RE-RENDER — IS NOT DROPPED: IT MOVES INTO THE `write` MEMBER'S OWN BODY**
/// (`§3`: *"The arm moves into the write member's own body and IS NOT DROPPED."*), which is where `P-SAS-8`
/// drives it.
///
/// **WHAT REPLACES THEM IS ONE FORWARDER PER VERB AND NOT ONE DISPATCHER** (`js-unwrap.md §5`: *"EACH MEMBER
/// CALLS ITS OWN VERTICAL ENTRY DIRECTLY. The verb string disappears — it is no longer data, because it is
/// the entry's name."*). Each is a DIRECT CALL OF ITS OWN ENTRY'S NAME, so a stack shows the member and the
/// verb's own entry and no intermediate dispatcher frame (`§6`).
///
/// **AND THE RECEIVER IS THE STORE OBJECT THE PACKAGE RETURNED** (`receiver-and-refusal.md §1`; `js-unwrap.md
/// §4`): the object is handed as the FIRST ARGUMENT, which is where the addon resolves the store from — **so
/// `state.id` IS NOT HANDED ANY MORE**: *"it hands NOTHING for the store's identity, because the call's own
/// receiver IS the identity."* **THE POSITIONS AFTER IT ARE THE VERB'S OWN AND CARRY NO INSTANCE AMONG THEM**
/// (`export-set-and-dispatch.md §4`).
///
/// **THE REFUSAL PATH IS THE ONE THE WRAPPERS CARRIED, UNMOVED** (`§5`: *"The member's own body keeps
/// everything else it did"*): the addon throws the declared form, the package renders the not-found arm for
/// the address-carrying verbs, and every other status crosses VERBATIM.
/// **THE PER-VERB FORWARDER — THE ONE THING THAT REPLACES BOTH DELETED WRAPPERS, AND IT IS NOT A SECOND
/// DISPATCHER.** It carries no verb STRING: the entry's own name is the member's own spelling at the call
/// site (`verb(state, 'read', args)` reads its entry as `addon_.read`), and the receiver it hands is the
/// STORE OBJECT the package returned — **so `state.id` is handed nowhere on this path**
/// (`js-unwrap.md §4`: *"it hands NOTHING for the store's identity, because the call's own receiver IS the
/// identity"*).
///
/// **THE NOT-FOUND RENDERING IS THE ONE THE WRAPPERS CARRIED, UNMOVED** (`js-unwrap.md §5`: *"The member's
/// own body keeps everything else it did"*): the addon throws the declared form, this frame renders the
/// address-carrying verbs' `AddressNotFound` arm, and every other status crosses VERBATIM.
///
/// **⟶ AND THE RECEIVER IS THE CALL'S OWN `this`, WHICH IS THE ONE THING THIS SIGNATURE DECIDES.** The
/// clause is explicit that the store is resolved *"from the Node-API `this` receiver — the value already
/// received at every entry and today discarded"* (`receiver-and-refusal.md §1`), and its `§7` prices the
/// consequence as this unit's ONE DECLARED COST: *"`const { read } = layout; read(…)` IS LEGAL TODAY AND
/// THROWS AFTER THIS CHANGE … THIS IS A REGRESSION AND IS NAMED AS ONE."* **A FORWARDER THAT CLOSED OVER
/// `state` WOULD KEEP A DETACHED CALL WORKING AND WOULD THEREFORE SILENTLY NOT PAY THAT COST** — the method
/// would still reach its store after losing its object, which is the failure `P-SAS-4` drives and
/// `receiver-and-refusal.md §3` exists to catch. **SO NOTHING HERE CLOSES OVER THE STORE: the receiver is
/// `this` AS THE CALL SUPPLIED IT, and a detached call supplies NONE.**
///
/// **A DETACHED CALL STILL NEEDS ITS `state` — for the rendering and for the store the package already
/// holds — BUT `state` IS NOT ALLOWED TO BE THE RECEIVER.** The two are read from different places on
/// purpose: `state` finds the entry's own bookkeeping, and `this` is what crosses to the addon as the
/// receiver. When the two disagree the CALL'S `this` WINS, because that is what the clause routes on.
/// **⟶ AND THERE IS NO `verb(state, name, args)` INDIRECTION EITHER — EACH MEMBER CALLS ITS OWN ENTRY BY ITS
/// OWN NAME.** A helper taking the verb as an argument would leave **the verb as DATA one level up**, which
/// is `PAR-SAS-2`'s *"the verb, as data — DELETED"* read at the package's own side, and the drive that reads
/// the package's own bytes reports it as such. **SO THE ENTRY'S NAME IS SPELLED AT THE MEMBER'S CALL SITE**
/// (`js-unwrap.md §5`): `addon_.read(...)`, `addon_.commitFile(...)`, and so on — **the verb IS the entry's
/// name and is no longer a value anything matches on.**
///
/// **WHAT EVERY MEMBER STILL SHARES IS EXACTLY TWO THINGS**, and these helpers carry only those: `entryOf`
/// returns the addon with its export already checked, and `refusalOf` renders the address-carrying verbs' one
/// arm. **NEITHER TAKES, MATCHES NOR DISPATCHES ON A VERB STRING.**
export function entryOf() {
  return withAddon();
}

/// **THE ONE LANDING EVERY MEMBER'S REFUSAL TAKES — THE `catch` AROUND A DIRECT ENTRY CALL, MADE SHARED SO
/// THE EIGHT CANNOT DRIFT APART ON THE RENDERING.** `js-unwrap.md §5`: *"The member's own body keeps
/// everything else it did"* — the addon throws the declared form, `§2.5` item 6's `AddressNotFound` arm is
/// rendered for the address-carrying verbs, and every other status crosses VERBATIM.
///
/// **IT TAKES THE CALL AND NOT A VERB NAME.** The entry is reached by the name the MEMBER spells at its own
/// call site; this wrapper never sees that name, matches on it, or carries it as data. **A HELPER TAKING
/// `(state, verb, args)` WOULD BE THE DELETED DISPATCHER REBUILT ONE LEVEL UP** — `PAR-SAS-2`'s *"the verb,
/// as data — DELETED"* — which is exactly what the package-bytes drive reads for.
/// **IS THE CALL'S RECEIVER THE STORE OBJECT THE PACKAGE RETURNED?** `receiver-and-refusal.md §3`'s ONE ARM,
/// asked at the package's own side for the one member that has a route BYPASSING its entry.
///
/// **IT IS NOT A SECOND ARM AND IT MINTS NO TOKEN**: a receiver that is not one is handed on to the entry,
/// which answers `§3`'s single observable. **THE TEST IS IDENTITY AGAINST THE OBJECT THE PACKAGE PUBLISHED**
/// — `state.receiver` is set at construction and is the same object the members are called on — **so a
/// detached call (no `this` at all), a foreign object and a clone all fail it and reach the SAME refusal.**
export function isStoreReceiver(candidate) {
  if (candidate === null || typeof candidate !== 'object') return false;
  const state = INSTANCES.get(candidate);
  return state !== undefined && state.receiver === candidate;
}

export function carryRefusal(call, args) {
  try {
    return call();
  } catch (refusal) {
    fail(notFoundRendering(refusal, listedSegments(args[0])));
  }
}

/// **THE FILE-TIER SAVE'S OWN ENTRY, REACHED BY NAME** — `js-unwrap.md §5` and `§2` row `8`.
///
/// **IT IS THE ONE ARM OF THE NINE WITH NO PUBLIC MEMBER OF ITS OWN** (`js-unwrap.md §2`): the other eight
/// are store members, reached because a caller names them, while `commitFile` is reached by the TERMINAL ARM
/// of a kernel-driven write — the point at which a `tier: 'file'` record is saved to its own file. **THE
/// ENTRY IS STILL ONE OF THE NINE AND IS STILL REACHED DIRECTLY BY ITS OWN NAME**, which is why it is
/// spelled here as a frame of its own rather than inlined: **THE VERB IS THE NAME AND NOT A STRING.**
///
/// **THE RECEIVER IS THE CALL'S OWN `this` AND THE POSITIONS ARE THE ENTRY'S OWN** (`receiver-and-refusal.md
/// §1`; `export-set-and-dispatch.md §4`): the terminal arm's frame supplies the store object it holds as the
/// receiver, and the ONE position supplied is the adopted record's operation identity — **no instance
/// position stands among them.**
export function commitFile(receiver, opId) {
  return entryOf().commitFile.call(receiver, encodeOpId(opId));
}

/// The segments an already-encoded address argument carries — the declared list shape's own member, and
/// `undefined` for every outside shape (which carries no address and therefore no container claim).
function listedSegments(arg) {
  if (arg === null || typeof arg !== 'object' || !Array.isArray(arg.s)) return undefined;
  return arg.s;
}

/// **THE `ValueNotAdmitted` RE-RENDER, NOW AT ITS ONE REMAINING SITE — `write`'S OWN MEMBER BODY**
/// (`js-unwrap.md §3`: *"The arm moves into the write member's own body and IS NOT DROPPED."*). It carried the
/// `writeCall` wrapper that has just been deleted, and the arm is reached by the member's own `catch` rather
/// than by a second function, so **the composite message of `§2.5` item 6 (d) and its `CF-3` clause 1 is
/// built exactly where it was and answers exactly what it did** — which is what keeps `P-SAS-8` green.
///
/// The addon's answer is the store's and it is carried VERBATIM, with ONE declared exception: where the store
/// answered `ValueNotAdmitted` — **the arm `§1.8`'s dated clause 1 assigns to the WALK** — and the walk
/// RECORDED the fault that produced it, the message is re-rendered as the composite of item 6: PART ONE, the
/// store's own generator's rendering of that code at the failing VALUE's own spelling, and PART TWO, the
/// class that failed and the position it holds, appended. **The store's refusal ORDER is untouched, because
/// this site is reached only AFTER the store has chosen which refusal answers** — which is what keeps
/// `write(instance, ['x'])`'s carrier-row `AddressMalformed` (`write-and-read.md §3.4` `F-1`) ahead of the
/// value's own code. Every other status, and every `ValueNotAdmitted` the walk did not produce (the
/// conversion core's own depth and node bounds, `§1.4` item 5), crosses VERBATIM (item 2).
///
/// **⟶ AMENDED 2026-10-23 (THE GATE-3 PROOFREADING PASS, `role_proofreader`; `RCA-8(g)`): THIS ARM IS
/// RETAINED AND NOT LIVE — IT IS UNREACHABLE AT THIS SITE, AND IT STAYS BY DECLARATION.** The block above
/// stands byte-for-byte and is read THROUGH this clause; its *"which is what keeps `P-SAS-8` green"* and its
/// *"this site is reached only AFTER the store has chosen which refusal answers"* are the arm's HISTORY, not
/// its present reach. **THE MEASURED FACT: the value refusal now answers at the PRE-VERB site (`:2439`, ahead
/// of the entry call at `:2454`), so a tree the walk refused never reaches the store and this branch's
/// `fault.found !== null` test can never be true when it runs — the arm below is UNREACHABLE.** **IT IS
/// NEVERTHELESS RETAINED AND NOT DELETED**, which is the declared disposition of
/// `docs/specs/storeroom-json-crossing/contract.md §6` row 4 (owner `U-STOREROOM-ADDON-SURFACE`: *"Retain it
/// for the conversion core's own bounds; drop the class-set trigger from this route"*) and of
/// `docs/specs/storeroom-addon-surface/js-unwrap.md §3` (*"The arm moves into the write member's own body and
/// IS NOT DROPPED."*). **AND THE STORE'S OWN REFUSAL ORDER IS UNTOUCHED BY THE PRE-VERB ANSWER:** a call such
/// as `write(instance, ['x'])` still answers its carrier row's `AddressMalformed` AHEAD of the value's code
/// (`write-and-read.md §3.4` `F-1`), because the carrier positions are converted and answered in their OWN
/// DECLARED ORDER (`:2429` the address, `:2432` the tier) BEFORE the walk's fault is consulted at `:2439` —
/// so the fault check never pre-empts a carrier row and the two orders cannot cross.
/// `[A1 bindings/js/index.mjs:2439 · :2454 · :2429 · :2432; docs/specs/storeroom-json-crossing/contract.md §6
/// row 4; docs/specs/storeroom-addon-surface/js-unwrap.md §3; docs/specs/storeroom-native/write-and-read.md
/// §3.4 `F-1` | requirement]`
export function writeRefusal(refusal, fault) {
  if (fault.found !== null && refusal !== null && typeof refusal === 'object' && refusal.status === 'ValueNotAdmitted') {
    valueReject(fault);
  }
  fail(refusal);
}

/// `docs/specs/storeroom-js/contract.md §2.10`: `listen` mints a token, populates the store's home and wraps it for JS — and its `address` is
/// `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
///
/// **THE PACKAGE MIRRORS THE STORE'S OWN HOME, AND IT MIRRORS IT INSIDE THE SAME DECLARED RULES THE STORE
/// USES — ONE ENTRY PER CALL, `DD-39`'s duplicate bucket included** (`write-and-read.md §6.5` item 12 (c)
/// and its item 8; `src/store.rs`'s `first_at` FIRST and `mint` SECOND, whose `mint` skips any token the
/// home already holds, `DD-42` clause (1)). **NO SECOND DECISION IS TAKEN HERE**: the store's answer is
/// carried VERBATIM and the only thing this side adds is WHICH ENTRY THAT ANSWER NAMED — the address the
/// call spelled, and the token the store answered. **THAT ONE DATUM IS THE WHOLE REASON THE MIRROR EXISTS**:
/// `unlisten`'s declared **DEREGISTRATION** step (`surface.md §2.4` item 7 (b)) is defined over the two
/// lawful duplicate states the SAME clause's dated narrowing names, and the store's `triggered` list carries
/// tokens and never the address they were minted at (`docs/specs/storeroom-js/surface.md §2.7` item 1) — **so the address is kept beside the
/// identity rather than guessed from it.** Nothing of it is observable: it is this factory's own closure,
/// like `tokens` and `registry`, and `docs/specs/storeroom-js/surface.md §2.1` (e) item 1's private-state rule is untouched.
/// **AND THE KEY IS INJECTIVE, 2026-10-17 — TWO DISTINCT LAWFUL ADDRESSES CANNOT SHARE ONE KEY**
/// (`docs/specs/storeroom-js/surface.md §2.4` rules 1 and 4 and item 7 (a)/(b), which all rest on the mirror holding EXACTLY the store's own
/// entries). **THE DEFECT IT CLOSES, NAMED: the shipped key joined RAW segment spellings with `\u0000`, so
/// `['a', 1]` and `['a', 'number:1']` BOTH keyed `a\u0000number:1` — one key, two lawful addresses — and
/// every `some(key)` test below then read a second ADDRESS as an already-held one.** **THE KEY NOW CARRIES
/// EACH SEGMENT'S OWN CLASS AND ITS LENGTH**, which is what makes it injective over the two classes
/// `§1.5`'s domain holds (`PAR-JS-5`: a string key or a non-negative integer index): `s1:a` and `n1:1` can
/// never be read off one another, because the class letter decides the spelling and the length decides
/// where it ends. **THE STORE'S OWN KEY IS THE SEGMENT VECTOR ITSELF and the mirror's key is its faithful
/// image**: no coercion, no case folding and no normalization stands between the two.
export function homeAddressKey(address) {
  if (!Array.isArray(address)) return `\u0001${typeof address}`;
  const parts = [];
  for (let i = 0; i < address.length; i += 1) {
    const segment = address[i];
    // **THE TWO CLASSES `§1.5`'S DOMAIN HOLDS, AND NOTHING ELSE IS EVER KEYED** (`inDomainAddress` below
    // is the one predicate that admits an address here): a string segment is `s<length>:<bytes>` and an
    // index segment is `n<length>:<digits>` — the length prefix is what makes the join injective.
    if (typeof segment === 'string') {
      appendOwn(parts, `s${segment.length}:${segment}`);
    } else {
      const digits = String(segment);
      appendOwn(parts, `n${digits.length}:${digits}`);
    }
  }
  return parts.join('\u0000');
}
