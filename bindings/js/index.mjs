// `provident-storeroom` — **THE CLAIMED REALM: Node ESM, ALONE** (`package.md §1.1`, `A70`).
//
// **THE ONE ARMS-BEARING ENTRY** (`package.md §1.3` item 1, `DD-24`) — the `exports` map publishes it and
// publishes nothing else: no wildcard, no deep import to the addon and no CJS arm (`§1.2`, `HO-1`).
//
// ---------------------------------------------------------------------------------------------
// THE ROUTE, AND THE SHAPE THE ARCHITECT'S RULING `A75` FIXED: `JS -> facade -> core -> store`
// ---------------------------------------------------------------------------------------------
//
// **THIS FILE IS A MAPPING LAYER AND NOTHING ELSE** (`docs/specs/storeroom-js-proposal.md §17` · `A75`,
// verbatim: *"Proceed V-1"*; `package.md §4.4`'s `V1`, `§4.5` item 1). **EVERY VERB OF `surface.md §2`
// CONSTRUCTS THE CROSSING MODEL, HANDS IT TO THE ADDON'S `storeCreate`/`call` DISPATCH, AND MAPS THE
// ADDON'S ANSWER BACK INTO JS VALUES.** **THE STORE'S OWN LOGIC IS THE RUST CORE'S**
// (`bindings/js/src/crossing.rs`): the register tree, the anchors, the journal and its compaction, the
// listener home and the prefix test, the file image and its boot, the SIXTEEN-member fail set and its
// generated messages are ALL reached through the facade, and NOTHING of them is re-implemented here.
//
// **⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: THE FAIL SET'S FIGURE ON THE LINE ABOVE — the
// as-filed *"the fifteen-member fail set"* — IS THE FILING-TIME PRINT AND IS READ THROUGH THIS CLAUSE.
// THE OPERATIVE READING IS *"the SIXTEEN-member fail set"*, with `ConstraintListInvalid` at rank `16` and
// `FileCommitFailed` at `15`, so `FileCommitFailed` is NOT the last member from that date
// (`11 + 2 + 1 + 1 + 1 = 16` ✓).** The set is the store's own and is carried, never minted, here
// (`docs/specs/storeroom-native/contract.md §8.1`'s dated clause of 2026-10-15, the ONE home of the set's
// size; `§8.2` for the appended member's generated row; `src/error.rs`'s `CODES`, `[&'static str; 16]`,
// with `ConstraintListInvalid` last; `bindings/js/index.d.ts`'s `StoreStatus`, the published spelling).
//
// **WHAT STAYS IN JS, AND WHY IT IS NOT STORE LOGIC** (`A75`: *"THE REGISTRY, THE OPAQUE HANDLE AND THE
// SINGLE FAILURE FORM STAY IN JS (they are the PACKAGE's surface, `docs/specs/storeroom-js/surface.md §2.4`)"*):
// **⟶ CITATIONS QUALIFIED 2026-10-18 (clean-up pass): this file cites more than one spec directory, and a bare `§`-number is therefore ambiguous wherever two directories number their sections independently. Where that was measurable the directory is now named; the sites are listed in this pass's record.**
//   * **THE PACKAGE'S OWN OPAQUE HANDLE** (`surface.md §2.3` item 2, `DD-14`): a frozen, memberless JS
//     object whose token is private — the store's token crosses OUT of the addon and is wrapped here.
//   * **THE PACKAGE'S OWN REGISTRY** (`surface.md §2.4`): the caller's FUNCTION, held per instance and
//     reached through the member `storeCreate` returns (`register(handle, listener)`) — **⟶ RE-SPELLED 2026-10-16: the `ONE member` figure this line printed is the AS-FILED `surface.md §2.4` item 5 (a) reading, and the instance's OPERATIVE member set is `{ register, on, off, settle }`, FOUR OWN MEMBERS (`surface.md §2.7` item 8 AS AMENDED; `§2.11` clause 7; `docs/decisions.md` `A116` (D1)) — the registry being reached through each of them**. **The store
//     returns handles and invokes nothing** (`A57`), so the invocation is the package's — performed after
//     the addon's call has returned, with the triggering ADDRESS as its ONE argument (`PAR-JS-12`).
//   * **THE SINGLE FAILURE FORM** (`surface.md §2.5`, `DD-12`): the addon THROWS the store's own
//     `{status, message}` and this file re-throws THAT OBJECT UNCHANGED — **no status is minted here, no
//     message is authored here, and no code outside the store's closed set can be produced by this file.**
//   * **THE FOUR CLASS DECISIONS THE WALK OWES** (`crossing.md §1.4` items 1–4; `DD-8`, `DD-34`): an own
//     `Symbol`-keyed property, a hole, an own accessor and a `Proxy` are decided at the JS boundary — where
//     `DD-34` puts proxy detection — and carried to the core as DATA, beside the DECIDED tree.
//
// **THE COPY DISCIPLINE** (`crossing.md §1.1`, `A65`): every value that crosses IN is read once and
// converted into data the boundary owns, and every value that crosses OUT is fresh data no other side can
// reach — no proxy, no live view, no getter, no borrow and no pointer, in either direction.
//
// ---------------------------------------------------------------------------------------------
// THE BOUNDARY'S OWN DISCIPLINE — `A76` (VALIDATE FIRST, NEVER REPAIR, REJECT VERBOSELY) AND `A77`
// ---------------------------------------------------------------------------------------------
//
// **`docs/specs/storeroom-js-proposal.md §18` · `A76`, VERBATIM:** ***"Test JS data for compliance with
// permitted shape before admitting and do not attempt to fix. reject with verbose error to client"*** —
// **a VALIDATION-FIRST DISCIPLINE IN THREE PARTS, AND THIS FILE SHIPS ALL THREE:**
//   1. **THE CLASS DECISION COMES FIRST, ON THE VALUE AS IT IS** — `arrayClass` / `protoClass` /
//      `isAdmittedArray` / `isPlainObjectValue` / `classSpelling`, taken BEFORE any admission, and never
//      after a conversion. **Nothing on any path coerces: no `Number(...)`, no `String(...)`, no
//      truthiness test, no `||`-default, no truncation and no unsupported class folded into a supported
//      one** — so no `valueOf`, no `Symbol.toPrimitive` and no `Proxy` trap is ever invoked, and no raw
//      host `TypeError` can be raised from this frame (`JS-1`).
//   2. **NOTHING IS REPAIRED** — a non-conforming input is REFUSED and never adjusted: a `bigint` is a
//      `BigInt` (`JS-6`), a `Symbol` is refused by its own class, a class extending `Array` is refused as a
//      class rather than admitted for passing `Array.isArray` (`JS-2`), and a prototype-carrying `cfg` or
//      listener entry is refused rather than read through the chain (`JS-5`).
//   3. **THE REJECTION IS VERBOSE AND TRAVELS INSIDE THE ONE `{status, message}`** (`docs/specs/storeroom-js/surface.md §2.5`, `A76`'s own
//      reach: *"it does NOT license a SECOND failure form"*). Where the STORE produced the refusal, its own
//      generated message crosses VERBATIM. Where the refusal is the BOUNDARY's own — a class the walk
//      rejects before any verb, **at a carrier position or at a VALUE position** — `boundaryReject` renders
//      the failing TARGET with the store's own generator and appends the class that failed, with the
//      POSITION the contract declares for that site (`docs/specs/storeroom-js/surface.md §2.5` item 6 (a)–(b)); **the
//      status is always a member of the store's closed set and is NEVER minted (`DD-40`).**
//
// **`§18` · `A77`, VERBATIM:** ***"Listener passes an id back to client-side when triggered, JS then has to
// match id to the function it was set with."*** — **THE ID IS THE OPAQUE HANDLE REGISTRATION RETURNED, the
// `triggered` member's own element and the registry's own key; `deliver` matches THAT IDENTITY to the
// caller's function, an id with no registered function fires NOTHING SILENTLY (`docs/specs/storeroom-js/surface.md §2.4` rule 1 — the silence
// is the declared observable), and the invocation's ONE argument is the triggering ADDRESS (`PAR-JS-12`):
// the matched id and the address are two different data and only the address is passed.**

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname as dirOf, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from 'node:util';

const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

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
const SETTLED_ON_THE_PASSING_ARM = Symbol.for('provident-storeroom.settled-on-the-passing-arm');

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
const SAVE_FAILED_AT_THE_TERMINAL_ARM = Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm');

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
const TERMINAL_ARM = Symbol.for('provident-storeroom.terminal-arm');

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
const FORGET_PAIR = Symbol.for('provident-storeroom.forget-pair');

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

/** **THE INCREMENT MOMENT** (`PAR-ADA-15`): the opening of a commit. It is taken iff THIS call opens one —
 *  a call that finds the count already above zero has joined an extant commit and opens nothing. */
function openCommit(store) {
  const index = attemptIndex(store);
  if (index.open > 0) return false;
  index.open += 1;
  // **THE OBSERVER SEAM IS READ AT THE INSTANT OF THE OPENING** (`§4.2` item 2), one call per opening — and
  // the iteration is a copy, so an observer that unsubscribes itself mid-notification moves nothing. **The
  // copy and the notification are LOCAL INDEX LOOPS** (item `(1c)(i)`): no spread, no iterator.
  const observers = index.observers;
  const copied = [];
  for (let i = 0; i < observers.length; i += 1) copied[i] = observers[i];
  for (let i = 0; i < copied.length; i += 1) copied[i]();
  return true;
}

/** **THE DECREMENT MOMENT** (`PAR-ADA-16`): the final return to the client, once, and only for the call
 *  that opened. A joining call opened nothing and decrements nothing. */
function closeCommit(store, opened) {
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
function installAttemptSeam(instance) {
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
        if (!known) observers[observers.length] = observer;
        return () => {
          const kept = [];
          for (let i = 0; i < observers.length; i += 1) {
            if (observers[i] !== observer) kept[kept.length] = observers[i];
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
// THE RESOLUTION RULE — THREE RUNGS, IN ORDER, AND THE CLOSED KEY SET (`docs/specs/storeroom-publish/
// resolution.md §2` · `§3`; `docs/specs/storeroom-publish/contract.md §1.1` · `§1.3` · `§1.5`).
//
// **RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** The table below is the WHOLE of the
// table the entry carries: it maps the runtime's `process.platform` × `process.arch` pair to ONE of the
// FIVE DECLARED NAMES, and to NO other value. **A name is SELECTED from this table and is NEVER BUILT by
// concatenating a platform token, an architecture token and a toolchain token** (`C-1`, `docs/specs/storeroom-publish/contract.md §1.3` item 1):
// **an uncovered pair IS NOT A MISS BUT A DECLARED `NOT COVERED`**, so rung one is NOT ATTEMPTED at all
// and no sixth name is computed (`resolution.md §2.2`; `§4.1`'s `NOT COVERED` row).
//
// **AND NO C-LIBRARY IS READ, DETECTED OR MEASURED BY ANY CLAUSE OF THIS UNIT** (`PUB-DD-8`; the two
// names this prohibition is about are spelled at `resolution.md §4.2` and are DELIBERATELY ABSENT FROM
// THIS FILE, so the entry declares no detection mechanism, no value set and no measured domain): the keys
// are the PAIR alone, a host whose C library differs from its artefact's still selects its `-gnu` name
// exactly as any other covered pair does, and that state is a STATE the load path reaches (`§4.2`) rather
// than a sixth key. **THE CONSEQUENCE IS THE DECLARED ONE: the `os`/`cpu` fields cannot express a C
// library, so such a host meets the `-gnu` artefact's own `dlopen` outcome and lands on the same state
// that outcome produces at any other key.**
//
// **RUNG TWO — THE MODULE-RELATIVE ADDON.** `ADDON_PATH` above, constructed from the entry module's own
// location and from no other source — `PUB-DD-20`: no environment variable, no configuration key, no path
// relative to the process's working directory and no search of a parent directory.
//
// **RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** The single failure arm of `docs/specs/storeroom-publish/contract.md §1.4`, its subject the
// artefact paths that WERE TRIED.
//
// **THE CATCH'S DECLARED WIDTH** (`docs/specs/storeroom-publish/contract.md §1.1`; `resolution.md §2.3`): EVERY throw of rung one's `require` is a
// MISS — a `MODULE_NOT_FOUND` for an absent package, an `ERR_DLOPEN_FAILED` for a present-but-unloadable
// artefact, and any other throw alike — so the loader moves to rung two and never answers a second shape.
// ---------------------------------------------------------------------------------------------
const PLATFORM_NAMES = {
  'linux·x64': '@auspicion/provident-storeroom-js-linux-x64-gnu',
  'linux·arm64': '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  'darwin·x64': '@auspicion/provident-storeroom-js-darwin-x64',
  'darwin·arm64': '@auspicion/provident-storeroom-js-darwin-arm64',
  'win32·x64': '@auspicion/provident-storeroom-js-win32-x64-msvc',
};

/// **THE TOTAL PLATFORM TABLE** (`resolution.md §4.1`): the value is one of the five declared names or the
/// token `NOT COVERED`, and NO other value (`C-1`).
function platformNameFor(platform, arch) {
  const pair = `${platform}·${arch}`;
  if (!Object.prototype.hasOwnProperty.call(PLATFORM_NAMES, pair)) return 'NOT COVERED';
  return PLATFORM_NAMES[pair];
}

/// **THE RUNTIME'S KEY, READ ONCE AT THE LOAD PATH** (`resolution.md §4.1`: `process.platform` ×
/// `process.arch`). **IT IS NOT READ AT MODULE EVALUATION, so the pair a drive fixes before the entry is
/// imported is the pair this table answers** — and no clause here reads a C library.
function platformNameForRuntime() {
  return platformNameFor(process.platform, process.arch);
}

/// **THE PACKAGE'S OWN VERSION, READ FROM THE PACKAGE'S OWN MANIFEST** (`docs/specs/storeroom-publish/contract.md §1.5` item 1: *"never passed in,
/// configured or defaulted"*). The manifest stands beside the entry module, as `ADDON_PATH`'s artefact does.
function packageVersion() {
  try {
    return JSON.parse(readFileSync(join(dirOf(fileURLToPath(import.meta.url)), 'package.json'), 'utf8')).version;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------------------------
// THE DECLARED ABSENT/FAILED-ADDON STATE (`A75`: *"an addon that is absent or fails to load is a DECLARED
// FAILURE and never a silent JS store (`V-3` was refused by this choice)"*).
//
// **THERE IS NO FALLBACK, BECAUSE THERE IS NO SECOND IMPLEMENTATION.** `require_(ADDON_PATH)` is called
// ONCE; if the artefact is absent, unreadable or refuses to load, the construction answers `docs/specs/storeroom-js/surface.md §2.5`'s
// SINGLE FAILURE FORM and NO instance is returned — the package never falls back to a JS store and never
// absorbs the state silently.
//
// **THE DECLARED STATE:** an addon that is absent or fails to load answers
// `{status: 'FilePathUnreachable', message: <the store's own generated string for that code at the
// addon's own path>}`. The status is a member of the store's closed `15`-member set carried VERBATIM
// (`docs/specs/storeroom-js/surface.md §2.5` item 1, `DD-40`) and is not minted here; the message is the STORE'S generator's string, reached
// through the addon where it loaded far enough to carry the generator (`errorMessage`), and the ONE string
// stated at its own site where the generator itself is the thing that failed to load.
// **THE ROW THAT PINS THIS STATE IS `P-TP-7`'s `S-LOAD`, and no clause of the contract names a status or a
// message-home for it** — reported as a CONTRACT FINDING rather than repaired here.
//
// **⟶ AND GATE 4'S `JS-3` IS CLOSED AT THIS SITE, WITH ITS DERIVATION MADE EXPLICIT RATHER THAN ACCIDENTAL.**
// **THE FINDING, NAMED: the absent/failed-addon constant was NOT the same bytes as the generator's string —
// the fallback wrote the template directly, so the equality held only for the exact spelling `'<path>'` and
// nothing compared the two arms.** **THE FIX: the generator is reached where it CAN be reached (the artefact
// that loaded far enough to carry `errorMessage`), and where it CANNOT — which is exactly this state, since
// the generator is the thing that failed to load — the fallback IS the generator's own rendering of that
// subject, reproduced BYTE-FOR-BYTE from the generator's own clause and named as the reproduction.** **THE
// EQUALITY OF THE TWO ARMS IS THEREFORE A PROPERTY OF THE SOURCE, asserted by the cell that drives the state
// (`NG-JS-H`'s byte-equality arm): measured against the built addon, `errorMessage('FilePathUnreachable',
// <path>)` and `generatorFilePathUnreachable(<path>)` are byte-identical for the same subject.**
//
// **THE GENERATOR'S OWN ROW, REPRODUCED (`src/error.rs`, the `FilePathUnreachable` arm, read with the
// facade's own subject spelling `format!("'{subject}'")`):**
//   `format!("{} is not reachable at construction, the path must exist or the application must be able to
//    write it", m.subject)`  —  `package.md §1.2` item 4's *"one string for the state on both arms"*.
// ---------------------------------------------------------------------------------------------
let addon = null;
let addonLoadError = null;
// **THE ARM THE LOAD PATH ANSWERED WITH, WHERE THE STATE IS THE VERSION MISMATCH** (`docs/specs/storeroom-publish/contract.md §1.5` item 2): the
// load path's OWN declared answer, remembered so that the mismatch is TERMINAL — rung two's `require` is
// not reached on the evaluation that meets the mismatch and not on any LATER one either, because the walk
// reads this state before it walks anything. **THE STATE IS THE DECLARED FORM ITSELF AND NEVER A HOST
// `Error`**: `docs/specs/storeroom-publish/contract.md §1.4` item 1 admits ONE failure shape — `{status, message}`, thrown, no third member — so a
// second failure INSTANCE held in the module's own state is not a shape this unit admits (`PUB-R-3`).
let addonArm = null;
// **THE RUNGS THE LOAD PATH ACTUALLY WALKED** (`docs/specs/storeroom-publish/contract.md §1.4` item 2; `resolution.md §5.3`): `tried` collects the
// subjects a candidate was sought at, IN THE ORDER THEY WERE TRIED — rung one's RESOLVED NAME where rung
// one was attempted at all, and rung two's module-relative path. **THE SUBJECT IS ONE PATH WHERE ONE RUNG
// WAS TRIED AND BOTH PATHS WHERE BOTH WERE** (`resolution.md §2.2`), and an uncovered key's rung one is
// never attempted, so its subject is rung two's path ALONE.
let rungOneName = null;
let tried = [];
// **THE RUNG WHOSE LOAD STANDS, WHERE ONE DID** (`docs/specs/storeroom-publish/contract.md §1.5` item 3: the version read applies at rung one
// alone, so the rung is remembered rather than inferred from a path's spelling).
let loadedFrom = null;

/// **THE RUNG-ONE CANDIDATE FOR THIS RUNTIME, COMPUTED ONCE FROM THE CLOSED TABLE** (`C-1`): the pair's
/// own declared name, or `NOT COVERED` — and `NOT COVERED` means rung one is NOT ATTEMPTED, so no name is
/// computed for it and no speculative fallback exists (`docs/specs/storeroom-publish/contract.md §1.3` item 3).
function rungOneCandidate() {
  if (rungOneName === null) rungOneName = platformNameForRuntime();
  return rungOneName;
}

// ---------------------------------------------------------------------------------------------
// **THE RUNG WALK** (`docs/specs/storeroom-publish/contract.md §1.1` items 1–2; `resolution.md §2.1`): RUNG ONE first — a covered key's one declared
// name, `require`d at the package root — then, failing it, RUNG TWO — the module-relative `ADDON_PATH`.
// **EVERY THROW AT RUNG ONE IS A MISS** (`resolution.md §2.3`): the catch neither classifies the throw nor
// reports it, so a `MODULE_NOT_FOUND`, an `ERR_DLOPEN_FAILED` and any other throw alike leave the loader
// at rung two, and NO second failure shape is produced anywhere on this path.
// ---------------------------------------------------------------------------------------------
function loadAddon() {
  if (addon !== null || addonArm !== null || addonLoadError !== null) return;
  const name = rungOneCandidate();
  if (name !== 'NOT COVERED') {
    tried.push(name);
    let candidate = null;
    try {
      candidate = require_(name);
    } catch {
      // **A MISS, AND NOTHING MORE** (`resolution.md §2.3`): the throw is not classified, not rethrown and
      // not reported — rung two is where the walk continues.
      candidate = null;
    }
    if (candidate !== null && candidate !== undefined) {
      // **`docs/specs/storeroom-publish/contract.md §1.5` item 1 — THE VERSION READ, AT RUNG ONE AND NOWHERE ELSE** (`PUB-DD-18`): the addon's own
      // exported `version`, called as a function, against the version the package's own manifest declares,
      // compared for EXACT STRING EQUALITY (`PUB-DD-19`: a different string, an empty string, a value that
      // is not a string and a `version` that is not callable are EACH the mismatch arm).
      const declared = packageVersion();
      let answered;
      try {
        answered = typeof candidate.version === 'function' ? candidate.version() : undefined;
      } catch (err) {
        answered = err;
      }
      if (typeof answered !== 'string' || answered !== declared) {
        // **THE MISMATCH ARM — THE SINGLE DECLARED FAILURE ARM** (`docs/specs/storeroom-publish/contract.md §1.5` item 2; `PUB-DD-17`): the subject
        // is RUNG ONE'S OWN PATH, and **NO FALLBACK TO RUNG TWO exists** — the load path stops here, loads
        // nothing from the substituted artefact and returns no instance.
        //
        // **⟶ AND `PUB-R-3`: THE ARM IS MADE TERMINAL BY CONSTRUCTION RATHER THAN BY THE `if`'S SHAPE.**
        // The walk RETURNS at the arm, so rung two's `require` below is not reached on the evaluation that
        // meets the mismatch; **and what keeps a LATER evaluation at the arm is the ARM ITSELF, held in
        // `addonArm` and read by this walk's own entry test** — never a second failure instance beside it.
        // **THE SHIPPED STATE WAS `addonLoadError = new Error('addon-version-mismatch')`, and it was a shape
        // `docs/specs/storeroom-publish/contract.md §1.4` item 1 does not admit: an `Error` minted here for a state whose declared answer is the one
        // form. THAT ASSIGNMENT IS REMOVED** (the `addonLoadError` slot is left to the load path's own
        // cause, rung two's throw) **and its whole duty — halting the walk before rung two — is taken by
        // the declared arm.** **A state in which a caught mismatch could then fall through to
        // `require_(ADDON_PATH)` and load the checkout's own artefact no longer exists at any call.**
        //
        // **AND THE `message` IS THE LOADED ARTEFACT'S OWN GENERATOR'S, NOT THIS FILE'S** (`docs/specs/storeroom-publish/contract.md §1.4` item 6,
        // arm (a); `PUB-DD-25`; `P-PUB-4`'s failure list's last member): the artefact that loaded and
        // answered `version` is the artefact that carries the store's generator, so the string is reached
        // through ITS `errorMessage` at the subject `docs/specs/storeroom-publish/contract.md §1.5` item 2 fixes. **`mismatchArmMessage` below names
        // the fallback where that artefact cannot supply it.**
        addon = null;
        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) };
        return;
      }
      addon = candidate;
      loadedFrom = 'one';
      return;
    }
  }
  tried.push(ADDON_PATH);
  try {
    addon = require_(ADDON_PATH);
    loadedFrom = 'two';
  } catch (err) {
    addon = null;
    addonLoadError = err;
  }
}

/// **THE SUBJECT OF THE DECLARED ABSENT FORM** (`docs/specs/storeroom-publish/contract.md §1.4` item 2; `resolution.md §5.3` item 2): the artefact
/// paths that were TRIED. **ONE PATH WHERE ONE RUNG WAS TRIED; BOTH PATHS WHERE BOTH WERE** — and where
/// both were, they are ordered RUNG ONE FIRST and RUNG TWO SECOND, joined by `', '`.
/// **EACH PATH IS RENDERED INTO THE GENERATOR'S OWN `'<subject>'` SLOT BY THE GENERATOR ITSELF, whose
/// clause already supplies the surrounding apostrophes for a single subject** (`src/error.rs`'s
/// `FilePathUnreachable` arm at the facade's own subject spelling): **so the single-path form is the RAW
/// path, exactly as the store's own generator renders it, and the two-path form is a comma-separated list
/// whose separator sits BETWEEN the generator's own renderings of its two subjects.**
/// **⟶ CONTRACT FINDING (`PUB-CF-7`, reported and NOT patched here):** **no clause of
/// `docs/specs/storeroom-publish/` declares this JOIN** — neither the separator nor the order — while
/// `resolution.md §5.3` item 2 requires BOTH PATHS to be the subject. **This file therefore CHOOSES the
/// separator `', '` and the order rung one then rung two, so a consumer reads both subjects in the order
/// they were tried; the choice is reported to `role_spec_writer` as a contract finding rather than taken
/// as a silent invention.**
function absentSubject() {
  if (tried.length === 1) return tried[0];
  return tried.map((path) => `'${path}'`).join(', ');
}

/// **THE STORE'S GENERATOR'S OWN RENDERING OF `FilePathUnreachable` FOR A SUBJECT** — the ONE row this file
/// reproduces, and it reproduces it because there is exactly ONE state in which the generator cannot be
/// reached at all: the state in which the generator is the thing that failed to load. **IT IS NEVER A
/// HAND-AUTHORED MESSAGE** (`docs/specs/storeroom-js/surface.md §2.5` item 2): it is the generator's clause, subject slot included, rendered
/// byte-for-byte — see the derivation above this block.
function generatorFilePathUnreachable(subject) {
  return `'${subject}' is not reachable at construction, the path must exist or the application must be able to write it`;
}

/// **THE MISMATCH ARM'S `message`, AND ITS ONE DECLARED FALLBACK** (`docs/specs/storeroom-publish/contract.md §1.4` item 6; `PUB-DD-25`).
/// **ARM (a) FIRST: THE LOADED ARTEFACT'S OWN GENERATOR AUTHORS THE STRING**, reached through the artefact's
/// `errorMessage` — the artefact that loaded and answered `version` is the artefact that carries the
/// generator — at the subject `docs/specs/storeroom-publish/contract.md §1.5` item 2 fixes, RUNG ONE'S OWN PATH. **WHERE THAT ARTEFACT CARRIES NO
/// `errorMessage`, OR ITS OWN GENERATOR THROWS, OR IT ANSWERS A VALUE THAT IS NOT A `string`, THE GENERATOR
/// IS UNREACHABLE AND ARM (b) ANSWERS: THE STORE'S OWN CLAUSE, REPRODUCED BYTE-FOR-BYTE AT THAT SAME
/// SUBJECT.** Arm (b) is the ONE arm `docs/specs/storeroom-publish/contract.md §1.4` item 6 declares for a state in which no generator can be
/// reached, so the fallback is named rather than taken silently, and a failure inside the loaded
/// artefact's generator cannot become a second failure shape.
function mismatchArmMessage(candidate, name) {
  if (candidate !== null && candidate !== undefined && typeof candidate.errorMessage === 'function') {
    try {
      const rendered = candidate.errorMessage('FilePathUnreachable', name);
      if (typeof rendered === 'string') return rendered;
    } catch {
      // the loaded artefact's own generator failed in turn: arm (b) below is the declared answer
    }
  }
  return generatorFilePathUnreachable(name);
}

/// **THE DECLARED ABSENT FORM'S MESSAGE** — the store's own generator's string for `FilePathUnreachable`
/// at the subject `absentSubject()` fixes (`docs/specs/storeroom-publish/contract.md §1.4` items 1–2). **WHERE AN ARTEFACT LOADED FAR ENOUGH TO
/// CARRY THE GENERATOR, THE GENERATOR AUTHORS THE STRING** (`A75`: *"reached through the addon where it
/// loaded far enough to carry the generator"*) — `addon.errorMessage` at each subject in turn.
/// **WHERE THE GENERATOR IS UNREACHABLE — which is exactly this state, since the artefact that carries it
/// is the thing that failed to load — THE STRING IS THE GENERATOR'S OWN RENDERING OF THAT SUBJECT,
/// REPRODUCED BYTE-FOR-BYTE** (`JS-3`'s fix) and **NOT hand-authored** (`docs/specs/storeroom-js/surface.md §2.5` item 2).
function addonLoadMessage() {
  loadAddon();
  const subject = absentSubject();
  if (addon !== null && typeof addon.errorMessage === 'function') {
    return addon.errorMessage('FilePathUnreachable', subject);
  }
  // THE GENERATOR'S OWN RENDERING OF THIS SUBJECT, where it could not be reached (`JS-3`'s fix).
  return generatorFilePathUnreachable(subject);
}

/// `surface.md §2.5`: **THE SINGLE FAILURE FORM** — a THROWN plain object carrying EXACTLY
/// `{status, message, log}`. **The status and the message are the store's own and are carried
/// VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` items 1–2, `DD-40`): this function constructs the form out of the refusal the addon
/// threw and mints no code of its own and authors no message of its own.
///
/// **⟶ AND THE FORM CROSSES AT THREE MEMBERS FROM 2026-10-16 — `surface.md §2.5` ITEM 4, THE ARCHITECT'S
/// RULING OF THAT DATE: *"`log` IS PRESENT ON EVERY FAILURE THIS SURFACE THROWS, AND `[]` IS ITS DECLARED
/// VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT ALL."*** **The three-member member set is FLAT ACROSS
/// ARMS and not conditional:** a `read`/`readLiteral`/`delete`/`rollback` store refusal with no attempt
/// live, the construction's own `cfg`-side refusals, `a.register`'s refusal and the constraint methods'
/// `TypeError` all carry `log: []` — **the EMPTY ARRAY, never an absent member, never `null`, and never a
/// placeholder entry** — while every failure whose attempt exists carries that attempt's own entries
/// (`§2.5` items 3–4 and 10 (i)–(iii); `docs/specs/storeroom-js/surface.md §2.12` item 1's mark of the same date). **AND WHERE A STORE ACT
/// PRODUCED IT, THE STORE'S `status` AND `message` ARE PRESERVED BYTE-FOR-BYTE AND `log` IS ATTACHED BESIDE
/// THEM — nothing is converted, a member is added** (`§2.5` item 10 (ii); `fail-surface.md §1.2`'s
/// *"the kernel NEVER CONVERTS ONE CHANNEL'S FAILURE INTO THE OTHER'S FORM"* stands whole).
///
/// **THE `log` MEMBER IS AN ORDINARY OWN ENUMERABLE DATA MEMBER** — written with the object literal below,
/// **not `Object.defineProperty`, not a getter, not on a prototype and not behind a `Symbol`** — so
/// `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on every arm
/// (`docs/specs/storeroom-js/surface.md §2.5` item 9). **IT IS NOT `defineProperty`'D BECAUSE A MEMBER THAT IS NOT ENUMERABLE IS NOT A MEMBER
/// A CANONICAL CENSUS CAN SEE**, and it is not a getter because a client reads a list and not a call.
///
/// **⟶ AND ITS TWO STORE MEMBERS ARE READ OFF THE STORE'S OWN REFUSAL AND OFF NOTHING ELSE — CORRECTED
/// 2026-10-17 (`A64`'s one form read with `surface.md §2.5` item 5 (e)).** **THE CONSTRUCTION BELOW ONCE
/// READ `refusal.status` AND `refusal.message` OF WHATEVER IT WAS HANDED, WITH NO PROVENANCE TEST AT ALL**,
/// and the two failures that cost are named rather than left to be re-derived: **a caller's own throwable
/// reached it by ONE mis-scoped `try`** (see `storeCreate` below, where that throwable now surfaces as
/// itself), **and a value that is not an object at all — most sharply the runtime's own `undefined`, where
/// NO refusal object exists because an exception is already pending — made THIS FRAME fault on
/// `refusal.status`**, so a caller read *"Cannot read properties of undefined (reading 'status')"* where the
/// value its own body threw was the whole of what it was owed.
///
/// **THE TEST IS PROVENANCE'S OWN SHAPE AND NOT A CLASS DECISION OF THIS UNIT'S:** the store's refusal is a
/// plain object whose `status` and `message` are `string`s (`docs/specs/storeroom-native/contract.md §8.3`'s
/// closed two-member form; `docs/specs/storeroom-js/surface.md §2.5` items 1–2), and **a value that is not that object is NOT this form's
/// provenance** — so it is THROWN AS ITSELF, by the one line below, and **NEITHER A STATUS NOR A MESSAGE IS
/// MINTED FOR IT AND NO `log` IS ADDED TO A VALUE THAT IS NOT THE STORE'S FORM.**
///
/// **⟶ THE PROVENANCE TEST IS *"IS THIS THE STORE'S TWO-MEMBER FORM?"* AND NOT *"DOES THIS CARRY A
/// `log`?"*, AND THAT DISTINCTION IS THE WHOLE OF THE CORRECTION THIS MEMBER FORCED.** The two-member
/// presence test **was** the earlier discriminator at the crossing (`constraintCrossing`'s own history: it
/// discriminated on `log`'s PRESENCE) — **and now that EVERY surface failure carries `log`, presence alone
/// can no longer tell a store refusal, a kernel refusal and a CALLER'S FORGED OBJECT apart.** **THE TEST
/// REPLACED IT IS THE STORE'S FORM ITSELF — `status` a `string` AND `message` a `string`, both READ OFF THE
/// HANDED VALUE AND NEITHER MINTED** — and `log` is then **ATTACHED BESIDE THE TWO, NEVER READ AS THE
/// DISCRIMINATOR** (`refusalLog` below). A caller's forged `{status, message}` thrown from a constraint body
/// carries both strings and would pass this test — **which is why this function is never ON the body-throw
/// path at all**: the body's throwable leaves `runAttempt` unconverted and reaches the caller without
/// passing here (`fail-surface.md §1.1` item 5; see `constraintCrossing`'s rethrow). **SO NO BYTE OF THIS
/// FRAME'S PROVENANCE TEST MOVES: every store refusal this package crosses — the eight verbs, the
/// construction, the `16`-code set — keeps its `status` and its `message` member for member and byte for
/// byte, and the ONE member this date adds is `log`.**
function fail(refusal, log) {
  if (refusal === null || typeof refusal !== 'object'
    || typeof refusal.status !== 'string' || typeof refusal.message !== 'string') {
    throw refusal;
  }
  throw { status: refusal.status, message: refusal.message, log: refusalLog(log) };
}

/// **THE ONE PLACE A REFUSAL'S `log` MEMBER IS DECIDED** — `surface.md §2.5` item 4's flat reading, taken
/// once so no arm can spell it differently. **AN ABSENT ARGUMENT IS THE DECLARED `[]`**: the failure's cause
/// has no attempt at all (a store refusal with no attempt live, a `cfg`-side refusal, a `register` refusal,
/// a constraint-method `TypeError`) — *"the EMPTY ARRAY, never an absent member, never `null`, and never a
/// placeholder entry"*. **A LIST HANDED IN IS THE ATTEMPT'S OWN AND CROSSES VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` item 3: *"THE
/// ATTEMPT'S OWN MESSAGE LOG, VERBATIM … CARRIED AND NOT RE-SHAPED"*), and it is **NOT COPIED**: a copy would
/// be a second list and the spec's *"the same list the attempt record held"* is a statement about identity
/// of content, which a copy preserves while costing an allocation on every failure — and **a copy would also
/// silently paper over the timing trap below**, because a copy taken late reads the same bytes as one taken
/// early. The list crosses as it stands, and `[]` is minted fresh at each no-attempt failure so that no two
/// failures alias one array.
///
/// **A `log` THAT IS NOT AN ARRAY IS A FINDING AT THE SITE THAT PRODUCED IT** (`docs/specs/storeroom-js/surface.md §2.5` item 9) — this
/// function declares no arm for it and answers the empty array rather than propagating a shape the spec
/// calls impossible: the alternative is a failure whose `log` is `null` or a non-array, which the same item
/// names as the finding verbatim.
function refusalLog(log) {
  return Array.isArray(log) ? log : [];
}

function withAddon() {
  loadAddon();
  // **THE MISMATCH ARM STANDS FIRST, AND IT IS THE ARM THE LOAD PATH ITSELF ANSWERED WITH** (`docs/specs/storeroom-publish/contract.md §1.5` item 2;
  // `PUB-R-3`): where the version read refused, THE WALK IS OVER — no rung-two attempt is made here and none
  // is made at any later call, and the value re-thrown is the arm's own `{status, message}` and not a state
  // re-derived from a path list.
  if (addonArm !== null) fail(addonArm);
  if (addon === null) fail({ status: 'FilePathUnreachable', message: addonLoadMessage() });
  return addon;
}

/// **`A76`'S VERBOSE REJECTION, AT THE PACKAGE'S OWN EDGE** — used where the refusal is the BOUNDARY's own:
/// a class the walk rejects BEFORE any verb is called, and whose carrier the store's own tables do not
/// declare. **THE MESSAGE NAMES THE FAILING TARGET AND WHY.** The target is rendered by the **STORE'S OWN
/// GENERATOR** — reached through the addon's `errorMessage`, so the message is never hand-authored here
/// (`docs/specs/storeroom-js/surface.md §2.5` item 2) — and the clause the ruling requires beside it is the CLASS that failed, plus the
/// POSITION where the carrier declares one. **THE STATUS IS NEVER MINTED** (`DD-40`): it is the member of
/// the store's closed set that the crossing's own table declares for the row the class falls under, and it
/// is passed as an argument at each site rather than chosen here.
/// **AND NO SECOND FORM EXISTS** (`A76`'s reach, verbatim: *"it does NOT license a SECOND failure form"*):
/// the rejection travels inside the one `{status, message}` and never as a raw host error — **which is why
/// NOTHING on this path coerces the value: no `Number(...)`, no `String(...)`, no `valueOf`, no
/// `Symbol.toPrimitive` and no trap is ever invoked, so no host `TypeError` can be raised from this frame
/// in the first place.**
///
/// **⟶ AND THE FAILING SEGMENT'S CONTAINER IS HANDED TO THE GENERATOR'S OWN `<container>` SLOT, ADDED
/// 2026-10-17 (`§2.5` item 5 (a)–(b) AND ITS `CF-3` AUTHORITY SPLIT; `docs/specs/storeroom-native/contract.md`
/// §8.2's `MessageArgs.container`, *"the container or node the mismatch was found in: `''` for the register,
/// a dotted path otherwise"*).** **THE DEFECT IT CLOSES, NAMED: the two-slot route filled `segment` and
/// `path` ALONE, so `container` took its default and PART ONE READ *"the number 1.5 is not a legal address
/// segment in `''`"* — a FALSE container — while PART TWO appended *"in 'a'"* and the store's own bytes for
/// that same input are `the number 1.5 is not a legal address segment in 'a'` (`src/store.rs`'s `listen`
/// arm, whose container is the prefix `['a']`; `src/error.rs`'s `malformed_segment`).** **TWO CONTAINERS
/// STOOD, ONE OF THEM FALSE; ONE STANDS NOW AND IT IS THE TRUE ONE.** **`container` is the failing
/// segment's OWN PREFIX — the store's own `dotted_address` spelling of it — and `undefined` at every site
/// that declares none, where the slot is left at its default and THE GENERATOR'S OWN BYTES ARE UNMOVED**
/// (the two-argument `errorMessage(code, subject)` call included).
///
/// **⟶ AND THE DOTTED SPELLING TAKES NOTHING FROM A MUTABLE PROTOTYPE FROM 2026-10-24** (`contract.md §2.1`'s
/// clause of this date on `F7-1`, items `(2b)`'s row `40` and `(10d)`): the as-built limb was
/// `container.map((segment) => String(segment)).join('.')` — `Array.prototype.map` and `Array.prototype.join`
/// taken off a MUTABLE PROTOTYPE on a REFUSAL path — so a caller's `map` answering a string made the next
/// `.join` throw a raw host `TypeError` out of a refusal (`§2.5` item 5 (e) allows no second form), and a
/// caller's `join` answering a marker wrote that marker into the store's own `<container>` slot as
/// `in 'OPMARK'`. **`spellDottedContainer` below is item `(1c)(i)`'s local loop**; the separator, the bare
/// spellings and the absent-container default are unmoved.
function spellDottedContainer(container) {
  let spelled = '';
  for (let i = 0; i < container.length; i += 1) {
    spelled += i === 0 ? String(container[i]) : `.${String(container[i])}`;
  }
  return spelled;
}

function boundaryReject(status, subject, clause, container) {
  const addon_ = withAddon();
  if (typeof addon_.errorMessage !== 'function') {
    // An artefact that LOADED but does not carry the generator is not the declared artefact: the state is
    // the declared absent/failed-addon one, and its message is the generator's own rendering reproduced.
    fail({ status: 'FilePathUnreachable', message: generatorFilePathUnreachable(ADDON_PATH) });
  }
  // **THE CONTAINER IS THE PREFIX'S OWN DOTTED SPELLING AND NOTHING ELSE** (`src/error.rs`'s
  // `dotted_address`: a key bare, an index bare, joined by `.`) — the same reading the store's own
  // `malformed_segment` triggers take, where the container is the segment the mismatch was found in.
  const where = container === undefined ? undefined : spellDottedContainer(container);
  const generated = where === undefined
    ? addon_.errorMessage(status, subject)
    : addon_.errorMessage(status, subject, where);
  fail({ status, message: `${generated}, ${clause}` });
}

// ---------------------------------------------------------------------------------------------
// THE CLASS DECISION, TAKEN FIRST — `A76`'S PART (1), VERBATIM: *"EVERY JS VALUE IS TESTED FOR COMPLIANCE
// WITH THE PERMITTED SHAPE BEFORE IT IS ADMITTED — the class decision is made first, on the value as it
// IS, never after a coercion"*. **NO COERCION IS PERFORMED ANYWHERE BELOW: every predicate here READS a
// class and CLASSIFIES it, and the classified value is what crosses.**
// ---------------------------------------------------------------------------------------------

/// `crossing.md §1.2` row 1's dated clause of 2026-10-11 and `§1.4` item 9: **a JS `string` carrying a
/// LONE SURROGATE is REFUSED `ValueNotAdmitted` AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED** —
/// no Rust `String` can carry one, and the value is never silently replaced, dropped or normalized into a
/// replacement character. **The class is BOUNDARY-ONLY and this is its one site.**
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-2`, items `(2a)`–`(2d)`): THE
/// PREDICATE INVOKES NOTHING TAKEN FROM A MUTABLE PROTOTYPE — it reads the string's own code units by a LOCAL
/// INDEX READ.** The block above stands byte-for-byte and is read THROUGH this clause; **the class, its one
/// site, its four other readings and every admission stand unmoved.** **THE DEFECT, AT ITS BYTES:** the shipped
/// read was `text.charCodeAt(i)` and `text.charCodeAt(i + 1)` — A MEMBER READ OFF `String.prototype` AT THE
/// MOMENT OF THE CALL — and this predicate is the SOLE gate on `§2` rows `9` and `10` with NO downstream
/// refuser, so an override answering `0x41` at every index made `a string carrying a lone surrogate`
/// UNREACHABLE at both positions and a lone-surrogate value and key crossed, repaired to U+FFFD on the far
/// side. **THE FORM IS THE CLAUSE'S FIRST LAWFUL ONE AND IT IS TAKEN FOR THE REASON `C-11` GIVES:** `text[i]`
/// is a string's OWN EXOTIC INDEX PROPERTY — answered by the string wrapper and by no link of any prototype
/// chain — and `text.length` is the wrapper's own property, so no method is invoked and no intrinsic is
/// captured at load (a captured `String.prototype.charCodeAt` is the frozen prototype fact `C-11` forbids, so
/// the clause's second form, `String.prototype.charCodeAt.call(...)`, is NAMED THERE AND NOT TAKEN HERE).
/// **AND THE PAIR READ CARRIES ITS OWN BOUND, WHICH IS PART OF THE FORM AND NOT AN OPTIMISATION:**
/// `text[i + 1]` is read ONLY WHERE `i + 1 < text.length`, because an out-of-range canonical index is NOT the
/// wrapper's own property — an unguarded read would reach a caller's `String.prototype[i + 1]` and PAIR a high
/// surrogate the caller never paired. Where that index does not exist the answer is LONE, the same answer the
/// shipped `NaN` comparison gave.
function hasLoneSurrogate(text) {
  for (let i = 0; i < text.length; i += 1) {
    const unit = text[i];
    if (unit >= '\uD800' && unit <= '\uDBFF') {
      // THE PAIR READ IS BOUNDED (item `(2b)`): an out-of-range canonical index is not the wrapper's own
      // property, so it is never asked of the chain.
      if (i + 1 >= text.length) return true;
      const low = text[i + 1];
      if (!(low >= '\uDC00' && low <= '\uDFFF')) return true;
      i += 1;
    } else if (unit >= '\uDC00' && unit <= '\uDFFF') {
      return true;
    }
  }
  return false;
}

/// **THE ECMASCRIPT STANDARD `Object.prototype` MEMBER SET — A FIXED, REALM-INDEPENDENT LIST, SPELLED HERE
/// AND NOT READ FROM ANY PROTOTYPE.**
///
/// **⟶ `contract.md §1`'s clause of 2026-10-24 (`docs/defects.md` · `DEF-2026-10-24-C`), items `(1)(c)`,
/// `(2)` and `(3)`, ARE THIS LIST'S WHOLE AUTHORITY.** Item `(1)(c)` makes the plain-object limb a
/// CARRYING test against the standard `Object.prototype` member set, item `(2)` makes the array limb the
/// same test against the standard `Array.prototype` set with an `Object.prototype`-SHAPED prototype above it,
/// and item `(3)` is why the sets are SPELLED rather than read: **an INJECTED own member on EITHER realm's
/// prototype must leave a lawful value's verdict unchanged, and a set derived from a live prototype would
/// carry the injected name and then DEMAND it of the other realm's values** — the realm-agreement failure
/// `DEF-2026-10-24-C` measured. **THE CENSUS THE TEST READS OFF THE VALUE'S OWN PROTOTYPE IS STILL READ PER
/// CALL (`plainProtoNames`, `arrayProtoNames`, `arrayProtoSymbols` below); what is fixed here is only the
/// STANDARD half of the reference set, which is a fact about ECMAScript and not about any realm's state.**
/// **`Object.prototype` carries no own SYMBOL member**, so item `(1)(c)`'s symbol half is empty for the
/// object limb and no symbol is compared there.
const OBJECT_PROTO_STANDARD_NAMES = [
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString',
];

/// **THE ECMASCRIPT STANDARD `Array.prototype` NAME SET AND SYMBOL-DESCRIPTION SET — a fixed,
/// realm-independent pair of lists, for the reason `OBJECT_PROTO_STANDARD_NAMES` states** (`contract.md §1`'s
/// clause of 2026-10-24, items `(2)` and `(3)`). **The symbols are compared BY DESCRIPTION and never by
/// identity** — `Symbol.iterator` in another realm is a DIFFERENT symbol value, and a cross-realm array must
/// be ADMITTED (`docs/specs/storeroom-js/crossing.md §1.2` row `5`).
const ARRAY_PROTO_STANDARD_NAMES = [
  'length',
  'constructor',
  'at',
  'concat',
  'copyWithin',
  'fill',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'lastIndexOf',
  'pop',
  'push',
  'reverse',
  'shift',
  'unshift',
  'slice',
  'sort',
  'splice',
  'includes',
  'indexOf',
  'join',
  'keys',
  'entries',
  'values',
  'forEach',
  'filter',
  'flat',
  'flatMap',
  'map',
  'every',
  'some',
  'reduce',
  'reduceRight',
  'toReversed',
  'toSorted',
  'toSpliced',
  'with',
  'toLocaleString',
  'toString',
];
const ARRAY_PROTO_STANDARD_SYMBOL_DESCRIPTIONS = ['Symbol.iterator', 'Symbol.unscopables'];

/// `Object.prototype`'s own property names — **read PER CALL from THIS realm's own prototype. They are the
/// LIVE HALF of the reference set the plain-object test compares against.**
///
/// **⟶ READ PER CALL, NOT ONCE AT LOAD: THE LOAD-TIME CACHE WAS A FAIL-CLOSED DoS.** `C-11` of the gate-4
/// adversarial pass measured it: the sets stood as module-level `const`s taken at load, so a LATER own
/// property change to `Array.prototype` (or to `Object.prototype`) left every array address and every plain
/// `cfg` comparing against a key set the realm no longer has — `arrayClass` and `protoClass` then answered
/// `'class'`, the walk refused `[]` and `{}` alike, and the refusal was reached at `on`'s own step 1. **THE
/// SETS ARE FACTS ABOUT THE PROTOTYPES AS THEY ARE AT THIS CALL**, so they are read where they are used;
/// the reading is unchanged in every other respect (by NAME and by SYMBOL DESCRIPTION, never by a symbol's
/// identity — `§1.2` row 5, `§1.3` row 13).
///
/// **⟶ AND `C-11` STANDS UNMOVED BY `contract.md §1`'s CLAUSE OF 2026-10-24: THE PER-CALL READ IS KEPT AND
/// ONLY THE EQUALITY AGAINST IT IS REMOVED** (item `(4)`). The reference set is `referenceSet(...)` below —
/// the standard list INTERSECTED with this per-call reading — so the equality test cannot be reconstructed
/// here, a caller-side mutation leaves no stale set behind, and (item `(3)`) it cannot move a verdict either.
///
/// **⟶ AND NO CENSUS IS HANDED TO `new Set(...)` ANY MORE — `contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-1`, items `(1c)(ii)`, `(2b)`'s rows `1`, `2`, `8` and `11`, and `(10a)` (`S2`).** The static is lawful
/// and its RESULT'S ITERATION is not: `new Set(census)` consumes the census array through
/// `Array.prototype[Symbol.iterator]`, so a FORGED iterator emptied or filled the set and a prototype that
/// owns nothing then passed the carrying test (`Object.create(Object.create(null))` CROSSED as a plain
/// object, item `(1f)(ii)`'s first measured state). **THE FORM IS ITEM `(1c)(i)`'S: THE CENSUS ARRAY ITSELF,
/// KEPT AND READ BY INDEX** — no `Set`, no iterator, no `for … of` over a result.
///
/// **⟶ AND THE READ IS CHARGED ITS OWN LENGTH FROM 2026-10-24** (`contract.md §2.1`'s clause of this date on
/// `F7-2`, item `(4c)(iii)`: *"one own-NAME census read — `1 + the length of the list it returns`"*, and item
/// `(4e)`: the allowance is threaded into this reader and it answers the WITH branch's conservative answer
/// where the spend is refused). `null` is that answer — a census the caller may not pay for is not a census
/// this reader may compare against, so `isStandardObjectPrototype` answers `false` (the class answer) and the
/// guard keeps walking instead of exempting a link on a read it could not charge.
function plainProtoNames(allowance) {
  const names = Object.getOwnPropertyNames(Object.prototype);
  if (!spendGuardRead(allowance, 1 + names.length)) return null;
  return names;
}

/// `Array.prototype`'s own property names and its own symbols' descriptions, **read PER CALL from THIS
/// realm's own prototype**. **They are the LIVE HALF of the reference set the ARRAY half of the class
/// decision compares against**, and the comparison is by NAME and by SYMBOL DESCRIPTION — never by a
/// symbol's identity, because `Symbol.iterator` in another realm is a DIFFERENT symbol value, and a
/// cross-realm array must be ACCEPTED (`§1.2` row 5, `§1.3` row 13). **See `plainProtoNames` above for why
/// these are not cached (`C-11`) and for why the per-call read survives the clause of 2026-10-24.**
/// **And for the reason `plainProtoNames` above spells: the census array is READ BY INDEX and never handed to
/// `new Set(...)` (`F7-1`, items `(2b)` row `2` and `(10a)`).**
function arrayProtoNames(allowance) {
  const names = Object.getOwnPropertyNames(Array.prototype);
  if (!spendGuardRead(allowance, 1 + names.length)) return null;
  return names;
}

/// **⟶ AND THIS READ TAKES NO METHOD FROM A MUTABLE PROTOTYPE: `Array.prototype.map` IS GONE FROM IT.**
/// `contract.md §1`'s clause of 2026-10-24 on `F-RA-3`, item `(3)`, declares a DELETION in the CALLER's realm
/// admission-preserving — the deleted name leaves the reference set's live half and with it the requirement —
/// and the as-built read spelled `Object.getOwnPropertySymbols(Array.prototype).map((s) => s.description)`,
/// **so `delete Array.prototype.map` in this realm made the CENSUS READ ITSELF throw and `arrayClass`'s guarded
/// `try` turned that `TypeError` into `'class'`: a caller's deletion became a REFUSAL of its own array, the
/// one direction item `(3)` forbids.** The read is now a plain indexed loop over an ordinary array
/// (`Object.getOwnPropertySymbols`'s own result, read by index, so no iterator and no method of a live
/// prototype is consulted), and the census is the same census.
///
/// **⟶ AND THE DESCRIPTION READ IS ITSELF MEMBER-FREE FROM 2026-10-24** (`contract.md §2.1`'s clause of this
/// date on `F7-1`, item `(2b)`'s rows `3`, `4` and `12`, and `(10a)`): `symbols[i].description` is
/// `Symbol.prototype.description`'s ACCESSOR taken off a MUTABLE PROTOTYPE, so a caller's getter answered for
/// every symbol and the ARRAY LIMB'S class was decided by it — the measured state `(1f)(ii)` names at row `(e)`,
/// where a genuine array on a one-symbol array-shaped prototype CROSSED. **THE FORM IS A SPEC CONVERSION ON A
/// SYMBOL PRIMITIVE** (`String(sym)`'s `SymbolDescriptiveString`, the same lawful form item `(2b)`'s row `27`
/// records for `String(number)`), **and the description is spelled back by a local index loop** — the string's
/// own exotic index reads (`(1c)(v)`) and `+=` (`(1c)(i)`), never `slice`, never a method of a prototype.
function symbolDescription(symbol) {
  const spelled = String(symbol);
  let description = '';
  for (let i = 7; i < spelled.length - 1; i += 1) description += spelled[i];
  return description;
}

/// **⟶ AND THE RESULT IS AN ARRAY, NOT A `Set`** (`F7-1`, items `(2b)` row `4` and `(10a)`): a `Set`'s
/// membership is `Set.prototype.has` and its construction consumes its argument through an ITERATOR, and both
/// are mutable-prototype members by item `(1d)(iv)`. The census is read by index wherever it is compared.
function arrayProtoSymbols(allowance) {
  const symbols = Object.getOwnPropertySymbols(Array.prototype);
  const descriptions = [];
  for (let i = 0; i < symbols.length; i += 1) descriptions[descriptions.length] = symbolDescription(symbols[i]);
  // THE OWN-SYMBOL CENSUS READ IS `1 + length` TOO (item `(4c)(iv)`); `null` is the conservative answer.
  if (!spendGuardRead(allowance, 1 + symbols.length)) return null;
  return descriptions;
}

/// **THE REFERENCE SET — `contract.md §1`'s clause of 2026-10-24, item `(4)`: THE STANDARD SET INTERSECTED
/// WITH THIS REALM'S LIVE CENSUS READ AT THIS CALL.**
///
/// **THE INTERSECTION IS NOT A CONVENIENCE: IT IS ITEM `(3)`'S DECLARED SAFETY IN THE ONE DIRECTION THAT IS
/// NOT FROZEN.** An ADDED member is not in the standard list, so the intersection cannot see it and the
/// verdict cannot move (item `(3)`); a DELETED standard member is dropped from the live half, so the
/// intersection only ever REMOVES a requirement and a deletion can never turn an admission into a refusal —
/// `C-11`'s fail-closed DoS in the other direction, equally forbidden (item `(4)`'s closing sentence).
///
/// **⟶ AND THE SET IS A LIST — `contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, item `(2b)`'s row `5` and
/// item `(1c)(vi)`, WHICH SPELLS THE REPLACEMENT: *"A MEMBERSHIP TEST WRITTEN AS A LOCAL LOOP"*.** A `Set`'s
/// construction consumes an argument through an iterator and its membership is `Set.prototype.has`; both are
/// mutable-prototype members by item `(1d)(iv)`, and the measured states `(1f)(ii)` names at rows `(c)` and
/// `(d)` are exactly this membership answering a caller's forged `has`/`add`. The intersection is the same
/// intersection: a local loop, a spelled `===`, and an index append.
function referenceSet(standardMembers, liveCensus, allowance) {
  // **⟶ AND THE ALLOWANCE IS THREADED IN HERE TOO** (item `(4e)`): a census the caller could not pay for is
  // not a reference set, so the intersection answers `null` and its caller answers its branch's conservative
  // answer. The memberships themselves are spelled `===` comparisons over lists already charged their length
  // (item `(4c)(viii)`: a spelled relational comparison is `0`).
  if (liveCensus === null) return null;
  const reference = [];
  for (let i = 0; i < standardMembers.length; i += 1) {
    const member = standardMembers[i];
    for (let j = 0; j < liveCensus.length; j += 1) {
      if (liveCensus[j] === member) {
        reference[reference.length] = member;
        break;
      }
    }
  }
  return reference;
}

/// **`§1`'s `(1)(b)` AND `(1)(c)` — A PROTOTYPE THAT IS TERMINAL AND CARRIES THE STANDARD `Object.prototype`
/// MEMBER SET**, which is what `contract.md §1`'s clause of 2026-10-24 calls an *"`Object.prototype`-SHAPED
/// prototype"* in item `(2)`.
///
/// **(b) THAT PROTOTYPE IS TERMINAL: `[[GetPrototypeOf]](proto)` is `null`** — it stands one link from the
/// value and ends the chain. **This condition, and no census comparison, is what refuses a CLASS INSTANCE**
/// (row `14`): a class's prototype's own prototype is an `Object.prototype` and is therefore not `null`.
/// **(c) THAT PROTOTYPE CARRIES THE STANDARD SET**, by `referenceSet` above: every member of the reference set
/// is an own member of the prototype, **and any FURTHER own member it carries is IRRELEVANT — it neither
/// admits nor refuses** (item `(1)(c)`'s own closing words). **No COUNT is compared anywhere here**, which is
/// the two equality tests the clause removed at `:741`–`:742` and `:779`–`:781`.
///
/// The guarded `try` stands where the shipped ones stood: a prototype whose own reads THROW (a `Proxy` used
/// as a prototype, a revoked one) answers `false` — the class answer — and nothing escapes this frame.
/// **⟶ AND EVERY READ IT TAKES IS CHARGED TO THE ONE PER-CALL ALLOWANCE FROM 2026-10-24**
/// (`contract.md §2.1`'s clause of this date on `F7-2`, items `(4a)`, `(4c)` and `(4e)`): the link's
/// `getPrototypeOf` read is `1`, the own-name census read it takes is `1 + its length`, and the live
/// `plainProtoNames` census is the same figure — **the three terms item `(4a)` names as the ones no charge
/// reached.** Where a spend is refused this predicate answers `false`, i.e. **"not a standard shape"**: the
/// conservative direction, since the class answer is `'class'` and the render guard keeps walking instead of
/// exempting a link whose census it could not pay for.
function isStandardObjectPrototype(proto, allowance) {
  if (proto === null) return false;
  // **⟶ `contract.md §2`'s clause of 2026-10-24 on `F-RA-12`, item `(6)(a)`: A PROTOTYPE LINK THAT IS A
  // `Proxy` — INCLUDING A REVOKED ONE — IS `false`, WITH NO TRAP RUN AND BEFORE ANY CENSUS READ OF IT.** A
  // trap that RETURNS a shape is not answered by the `catch` below (a `catch` cannot un-run a trap that
  // returns), so a LYING `ownKeys`/`getPrototypeOf` handler turned a subclass-shaped prototype into an
  // admission: `Object.create(lyingProxy)` crossed as a plain object. `util.types.isProxy` reads no member
  // and invokes no handler, and a shape the package may not read is not a shape the value carries. **THE
  // GROUND IS `§1`'s OWN** — this guard covers `protoClass`'s whole census path, `arrayClass`'s chain link
  // and `isLanguageStandardPrototype`'s `above` read, so no limb and no conversion test reads a proxy link.
  if (types.isProxy(proto)) return false;
  let names;
  try {
    if (!spendGuardRead(allowance, 1)) return false; // ONE `getPrototypeOf` CALL — item `(4c)(ii)`
    if (Object.getPrototypeOf(proto) !== null) return false; // (b) TERMINAL
    // **⟶ AND THE CENSUS IS KEPT AS AN ARRAY AND COMPARED BY INDEX** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(2b)`'s row `6` and `(10a)`): `new Set(...)` consumed the
    // read through `Array.prototype[Symbol.iterator]` and its `has` was `Set.prototype.has`, so a forged
    // iterator or a forged `has` decided the CLASS — `Object.create(Object.create(null))` crossed and
    // `[1]` on a one-symbol array-shaped prototype crossed with it. The read, the reference set and the
    // carrying test below are all local loops on ordinary arrays now.
    names = Object.getOwnPropertyNames(proto); // (c) the value's prototype's own census
  } catch {
    return false;
  }
  // THE OWN-NAME CENSUS READ, CHARGED `1 + the length of the list it returns` (item `(4c)(iii)`).
  if (!spendGuardRead(allowance, 1 + names.length)) return false;
  const reference = referenceSet(OBJECT_PROTO_STANDARD_NAMES, plainProtoNames(allowance), allowance);
  if (reference === null) return false;
  for (let i = 0; i < reference.length; i += 1) {
    const name = reference[i];
    let carried = false;
    for (let j = 0; j < names.length; j += 1) {
      if (names[j] === name) {
        carried = true;
        break;
      }
    }
    if (!carried) return false;
  }
  return true;
}

/// `crossing.md §1.4` item 4: **THE PLAIN-OBJECT TEST**, items (a)–(g) — **STRUCTURAL AND REALM-AGNOSTIC.**
/// **The prototype half is NOT an identity test against this realm's `Object.prototype`**: the prototype
/// is `null`, or a prototype whose OWN properties are exactly the plain-object prototype's. **A plain
/// object from ANY realm (`vm`, a worker, `structuredClone`) is therefore ACCEPTED** — its prototype is
/// that realm's own `Object.prototype`, whose own names are this realm's own two — **while a CLASS INSTANCE
/// is refused, because a class's prototype carries its own `constructor`** (`DD-7`, `DD-35`).
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-C`; `contract.md §1`'s clause of that date, items `(1)`, `(3)`,
/// `(5)`, `(6)`): THE PREDICATE IS `§1`'s OBJECT LIMB, TAKEN STRUCTURALLY — THE VALUE CARRIES A PROTOTYPE,
/// THAT PROTOTYPE IS TERMINAL, AND THAT PROTOTYPE CARRIES THE STANDARD `Object.prototype` MEMBER SET.**
/// The block above stands byte-for-byte and is read THROUGH this clause. **THE TWO EQUALITY TESTS THE CLAUSE
/// REMOVES ARE GONE FROM THIS BODY — `names.length !== plain.size` and `if (!plain.has(name)) return 'class'`
/// — because a COUNT and a NAME-NOT-IN-THE-SET compared the value's prototype's own census against THIS
/// realm's live prototype and so REFUSED a lawful foreign-realm plain object the moment either realm's
/// `Object.prototype` gained one own member.** What stands in their place is `isStandardObjectPrototype`
/// above: terminality (`(1)(b)`, which is what refuses a class instance and needs no census read at all) and
/// a CARRYING test against the standard set (`(1)(c)`, in which an EXTRA own member on either realm's
/// prototype is irrelevant). **A LAWYER'S NOTE ON WHAT DID NOT MOVE: the `'null'` answer and the identity
/// comparison below STAY.** The `'null'` answer is `§3`'s `p` classification for a prototype-less object —
/// admitted, and unmoved by this clause — and `proto === Object.prototype ? 'plain' : 'foreign'` LABELS an
/// admitted value's classification and decides NO admission (`§1`'s item `(5)`); a verdict that turned on it
/// would be the removed test under another name.
function protoClass(value) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  return isStandardObjectPrototype(proto) ? (proto === Object.prototype ? 'plain' : 'foreign') : 'class';
}

/// `crossing.md §1.4` item 4 (c), (d) and item 1: an own ACCESSOR, or an own `Symbol`-keyed property,
/// REFUSES THE WHOLE VALUE — *"any other answer would DROP A MEMBER SILENTLY"* (`DD-8`).
///
/// **⟶ AND THE SCAN IS A LOCAL INDEX LOOP FROM 2026-10-24** (`contract.md §2.1`'s clause of this date on
/// `F7-1`, items `(1c)(i)`, `(2b)`'s rows `7` and `16`, and `(10a)`): the as-built read walked
/// `Object.getOwnPropertyNames(value)` with `for … of`, i.e. through `Array.prototype[Symbol.iterator]`, so a
/// caller's forged iterator **left row `15`'s accessor untested** while the census still had entries to read.
/// The census is the same census and the two descriptors read are the same two; only the consumption form
/// moved.
function accessorOrSymbolArm(value) {
  const names = Object.getOwnPropertyNames(value);
  for (let i = 0; i < names.length; i += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, names[i]);
    if (descriptor.get || descriptor.set) return { k: 'P' };
  }
  return Object.getOwnPropertySymbols(value).length > 0 ? { k: 'y' } : null;
}

/// **THE ARRAY HALF OF THE CLASS DECISION** — `crossing.md §1.2` row 5, whose two halves are BOTH declared:
/// *"a cross-realm array IS accepted (it is an `Array`), **a class extending `Array` is not**"*, with
/// `§1.3`'s `AddressArg` row 13 accepting a cross-realm array and row 11 refusing the array-like class.
/// **THE DECISION IS STRUCTURAL AND REALM-AGNOSTIC, exactly as `§1.4` item 4 (e) makes the plain-object
/// test's**: the value's own prototype is `null`, or a prototype whose OWN property names and OWN symbol
/// descriptions are EXACTLY an array prototype's — **reached without an `instanceof` test and without a
/// comparison against this realm's `Array.prototype`, so a cross-realm array is admitted while a SUBCLASS
/// (`class V extends Array {}`, whose prototype carries its own `constructor` and little else) is refused
/// BY ITS CLASS.** (`JS-2`: `Array.isArray` may not SHORT-CIRCUIT this test — it is a predicate about the
/// exotic array-ness of the object and says NOTHING about which class the object belongs to.)
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-C`; `contract.md §1`'s clause of that date, item `(2)`): THE
/// ARRAY LIMB IS `§1`'s THREE CONDITIONS, AND ITS CHAIN HAS ONE MORE LINK THAN THE OBJECT'S — so the test
/// is stated ON THE CHAIN and never on this realm's `Array.prototype` by identity.** (a) the value carries
/// a prototype; (b) that prototype carries the standard `Array.prototype` NAME set AND the standard
/// `Array.prototype` SYMBOL-DESCRIPTION set — compared by description and never by a symbol's identity; and
/// (c) **that prototype's own prototype is an `Object.prototype`-SHAPED prototype, i.e. one satisfying
/// `§1`'s `(1)(b)` and `(1)(c)` (`isStandardObjectPrototype` above)**. **The standard chain is therefore
/// `value → Array.prototype → Object.prototype → null` in EVERY realm**, which is why a `vm` array, a
/// worker's array and a `structuredClone`d array are admitted by the same rule as this realm's own — and why
/// a class extending `Array` is refused: its prototype's own prototype is an `Array.prototype` and NOT an
/// `Object.prototype`-shaped one, so the chain check alone answers `'class'` before any census is compared.
/// **THE TWO EQUALITY TESTS THE CLAUSE REMOVES ARE GONE — `names.length !== arrayNames.size ||
/// symbols.length !== arraySymbols.size` and the two `if (!set.has(...)) return 'class'` loops — and the
/// per-call census reads and the guarded `try` stand exactly where they stood** (item `(5)`). **`Array.isArray`
/// alone may not stand as the admission test and no `instanceof` test is taken** (`JS-2`, unmoved); the
/// identity comparison in the final `return` LABELS the `p` classification and decides no admission.
/// **⟶ AND ITS READS ARE CHARGED TO THE ONE PER-CALL ALLOWANCE WHERE A CALLER CARRIES ONE** (`contract.md
/// §2.1`'s clause of 2026-10-24 on `F7-2`, item `(4e)`): its `getPrototypeOf` reads, its own-name and
/// own-symbol census reads and the two live reference censuses are the same figures
/// `isStandardObjectPrototype` charges. **A REFUSED SPEND ANSWERS `'class'`** — the limb's own class answer,
/// which is the WITH branch's conservative direction for a class decision — and a caller that carries no
/// allowance (the walk's own admission test, `isAdmittedArray`, `constraintAddress`) is charged nothing.
function arrayClass(value, allowance) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  // **⟶ `contract.md §2`'s clause of 2026-10-24 on `F-RA-12`, item `(6)(b)`: THE ARRAY LIMB ANSWERS
  // `'class'` FOR A `Proxy` PROTOTYPE LINK — INCLUDING A REVOKED ONE — BEFORE ITS GUARDED `try` AND
  // THEREFORE BEFORE EVERY CENSUS READ BELOW.** The limb answers `'class'` and not a boolean, so the guard
  // is spelled here as well as in `isStandardObjectPrototype` above; `util.types.isProxy` reads no member,
  // runs no trap and throws for no revoked link.
  if (types.isProxy(proto)) return 'class';
  let names;
  let symbols;
  let above;
  try {
    // `C-11`: the value's prototype's own census is read at THIS call, never from a load-time constant.
    // **⟶ AND IT IS AN ARRAY, READ BY INDEX, WITH A MEMBERSHIP LOOP AND NOT A `Set`** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(1c)(vi)`, `(2b)`'s rows `8`, `11` and `12`, and
    // `(10a)`): `new Set(...)` consumed each read through `Array.prototype[Symbol.iterator]` and each
    // comparison was `Set.prototype.has`, so a forged iterator or a forged `has` answered the array limb for
    // the caller — the measured state `(1f)(ii)` row `(c)`'s `[1]`, and row `(e)`'s genuine array.
    names = Object.getOwnPropertyNames(proto);
    // **⟶ AND NO METHOD IS TAKEN FROM A MUTABLE PROTOTYPE HERE EITHER** — the as-built read spelled
    // `.map((symbol) => symbol.description)`, so `delete Array.prototype.map` in the CALLER's realm threw inside
    // this guarded frame and the catch below answered `'class'` for the caller's own lawful array
    // (`contract.md §1`'s clause of 2026-10-24 on `F-RA-3`, item `(3)`: a caller-side deletion cannot turn an
    // admission into a refusal). The loop reads the census by index, and the description is a spec conversion
    // on the symbol primitive (`symbolDescription` above), never `Symbol.prototype.description`; the guarded
    // `try` still stands for a prototype whose own reads THROW (a `Proxy` used as a prototype, a revoked one).
    const ownSymbols = Object.getOwnPropertySymbols(proto);
    symbols = [];
    for (let i = 0; i < ownSymbols.length; i += 1) symbols[symbols.length] = symbolDescription(ownSymbols[i]);
    above = Object.getPrototypeOf(proto); // (c) the chain's next link: `Array.prototype → Object.prototype`
  } catch {
    return 'class';
  }
  // THE THREE READS JUST TAKEN, EACH AT ITEM `(4c)`'S OWN FIGURE: two own censuses at `1 + length` and the
  // one `getPrototypeOf` call at `1`. A refused spend answers the limb's own class answer.
  if (!spendGuardRead(allowance, 1 + names.length)) return 'class';
  if (!spendGuardRead(allowance, 1 + symbols.length)) return 'class';
  if (!spendGuardRead(allowance, 1)) return 'class';
  if (!isStandardObjectPrototype(above, allowance)) return 'class';
  const liveNames = arrayProtoNames(allowance);
  if (liveNames === null) return 'class';
  const arrayNames = referenceSet(ARRAY_PROTO_STANDARD_NAMES, liveNames, allowance);
  const liveSymbols = arrayProtoSymbols(allowance);
  if (liveSymbols === null) return 'class';
  const arraySymbols = referenceSet(ARRAY_PROTO_STANDARD_SYMBOL_DESCRIPTIONS, liveSymbols, allowance);
  for (let i = 0; i < arrayNames.length; i += 1) {
    const name = arrayNames[i];
    let carried = false;
    for (let j = 0; j < names.length; j += 1) {
      if (names[j] === name) {
        carried = true;
        break;
      }
    }
    if (!carried) return 'class';
  }
  for (let i = 0; i < arraySymbols.length; i += 1) {
    const description = arraySymbols[i];
    let carried = false;
    for (let j = 0; j < symbols.length; j += 1) {
      if (symbols[j] === description) {
        carried = true;
        break;
      }
    }
    if (!carried) return 'class';
  }
  return proto === Array.prototype ? 'plain' : 'foreign';
}

/// **A GENUINE ARRAY** — `Array.isArray`'s own answer AND the class decision beside it: an exotic
/// array-like object whose class is a class extending `Array` is NOT a genuine array (`JS-2`).
function isAdmittedArray(value) {
  return Array.isArray(value) && arrayClass(value) !== 'class';
}

/// **A PLAIN OBJECT**, in the sense `docs/specs/storeroom-js/surface.md §2.1` takes `cfg` and `§1.3`'s `ListenersArg` row 2 takes an entry:
/// not `null`, `typeof x === 'object'`, not an `Array`, **not a `Proxy`** (`DD-34`) and not a class
/// instance or any other prototype-carrying object (`§1.4` item 4 (e), (f), (g)). **A PLAIN OBJECT FROM
/// ANY REALM IS ACCEPTED** — the (e)-half is structural, never an identity test (`DD-7`, `DD-35`).
function isPlainObjectValue(value) {
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value) || types.isProxy(value)) return false;
  return protoClass(value) !== 'class';
}

/// **THE CLASS THAT FAILED, SPELLED FOR THE VERBOSE REJECTION** (`A76`: *"the rejection names the failing
/// target and the reason"*; `surface.md §2.5` item 5 (b): *"the reason is the CLASS the value HAS — named as
/// `§1.2`'s or `§1.3`'s own class, never as a class the value could be converted to"*). **IT READS NO
/// MEMBER THROUGH ANY CHAIN** — `typeof`, `util.types.isProxy`, `Array.isArray`, `getPrototypeOf` and the
/// two own-key-set predicates alone: no `.constructor`, no `.name`, no `.toString` and no `in`.
function classSpelling(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const kind = typeof value;
  if (kind !== 'object' && kind !== 'function') return `a ${kind}`;
  if (types.isProxy(value)) return 'a Proxy';
  if (Array.isArray(value)) return arrayClass(value) === 'class' ? 'a class extending Array' : 'an Array';
  if (kind === 'function') return 'a function';
  return protoClass(value) === 'class'
    ? 'a class instance or another prototype-carrying non-plain object'
    : 'a plain object';
}

/// **THE FAILING TARGET, RENDERED AS THE STORE'S GENERATOR RENDERS IT** — `surface.md §2.5` item 5 (a),
/// verbatim: *"a non-segment value PRINTED AS ITS OWN VALUE, SINGLE-QUOTED (`10n` for a `bigint`, `Symbol()`
/// for a symbol) where the failure is about a value and not about a segment — because the store's generator's
/// own rule prints a non-segment argument that way, and this unit may not invent a second rendering of a
/// target the store already renders"*. **THE GENERATOR APPLIES THE QUOTING ITSELF** (it spells the subject
/// `'<subject>'`), so the BARE rendering is what is handed to it.
///
/// **AND THE RENDERING IS GUARDED, WHICH IS `A76`'S OWN INSTRUCTION:** *"a throwing `valueOf`/
/// `Symbol.toPrimitive`/`Proxy` trap must be caught and answered as the declared refusal (catch, then
/// classify — never propagate the host error)"*. A rendering that throws answers the CLASS spelling instead
/// — **the class half of the reason is mandatory (`§2.5` item 5 (b)), so the rejection still carries it** —
/// and nothing escapes this frame either way.
function targetSpelling(value) {
  try {
    // **`§2.5` item 5 (a)'s OWN TWO EXAMPLES, RENDERED EXACTLY:** *"`10n` for a `bigint`, `Symbol()` for a
    // symbol"* — a `bigint` is printed with the `n` its own JS spelling carries (which
    // `BigInt.prototype.toString` drops) and a `symbol` is printed `Symbol()`, while every other target class
    // is printed as its own value.
    if (typeof value === 'bigint') return `${value}n`;
    // **⟶ AND A `Proxy` IS NEVER COERCED, BY THIS RENDERER EITHER (`C-1`'s third half, 2026-10-11).** The
    // renderer is reached on the refusal path of a value the walk has ALREADY refused as `AddressArg` row 12
    // — and `String(value)` on a `Proxy` invokes its `get` trap for `Symbol.toPrimitive` and for `toString`,
    // **so the walk's own refusal message RAN THE TRAPS the walk exists to avoid running.** `classSpelling`
    // reads the class with `util.types.isProxy` alone, invoking nothing, so the target half is still the
    // class the value HAS — no trap runs on this path either, and the same refusal is reachable `on` and
    // `read` alike.
    // **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-3`, items `(3a)`–`(3d)`; the owed
    // byte is `implementation-plan.md §2` step `4`'s arm `(ix)`): THE GUARD READS "OR CALLABLE".** The block
    // above stands byte-for-byte and is read THROUGH this clause; its universal is what the one test below now
    // makes true. **THE STATE IT CLOSES:** the shipped test guarded a `Proxy` only when `typeof value ===
    // 'object'`, so a CALLABLE `Proxy` — `typeof 'function'` — fell past it to `String(value)`, whose
    // `ToPrimitive` read `Symbol.toPrimitive` and then `toString` THROUGH THE `get` TRAP at every carrier slot
    // that renders its argument. **THE FORM IS THE SIBLING ARM'S OWN** (`valueTargetSpelling`'s test
    // below): object **or** function, then `types.isProxy`, then the class spelling — the `Proxy` class is ONE
    // class and the renderer's `typeof` split is not a fact about it. Nothing else at this renderer moves: the
    // `bigint` limb, `String(value)`, the `try` and the `catch` all stand, and no identity is compared and no
    // prototype is frozen (`C-11` is untouched).
    if ((typeof value === 'object' || typeof value === 'function') && value !== null && types.isProxy(value)) {
      return classSpelling(value);
    }
    return String(value);
  } catch {
    return classSpelling(value);
  }
}

// ---------------------------------------------------------------------------------------------
// `A76`'S VERBOSE REJECTION AT A **VALUE** POSITION — `surface.md §2.5` item 6 (a)–(d), read with
// the `CF-3` authority split that same section declares
// ---------------------------------------------------------------------------------------------
//
// **THE FINDING THIS BLOCK CLOSES, NAMED AS THE SET MEASURED IT** (`archive/gate5/storeroom-js-greens-run.md`
// §3, FINDING 1; `JSG-04.1.v` · `JSG-04.2.v` · `JSG-04.4.v`): every class the WALK refuses at a VALUE
// position answered ONE byte-identical message — the store's generic `ValueNotAdmitted` clause at the
// WRITE ADDRESS's own spelling — so **the reason's class half was absent at every value position**
// (`§2.5` item 6 (b) makes it MANDATORY), **the position half was absent where the contract declares one**
// (item 6 (b): *"the ARGUMENT POSITION for a verb's arguments, and the MEMBER POSITION for a member inside a
// value the walk reached"*), **and PART ONE's target was the wrong datum**: the failure is about a VALUE,
// and item 6 (a) declares that *"a non-segment value [is] PRINTED AS ITS OWN VALUE, SINGLE-QUOTED (`10n` for a
// `bigint`, `Symbol()` for a symbol) where the failure is about a value and not about a segment"*.
//
// **THE TWO PARTS OF THE COMPOSITE, AND WHOSE BYTES EACH IS** (`CF-3`, the bounded correction pass that
// closed this implementer's own contract finding, `surface.md §2.5` item 6's closing clause):
//   1. **PART ONE IS THE STORE'S GENERATOR'S OWN, VERBATIM** — `boundaryReject` reaches the generator through
//      the addon's `errorMessage` and hands it the failing target in the generator's own `<SEGMENT>` slot, so
//      the target half is the store's bytes and never this file's (item 2; item 6 (d)).
//   2. **PART TWO IS THE BOUNDARY'S OWN AND IS APPENDED** — the class that failed, and the position where the
//      contract declares one. **IT IS APPENDED AND NOT EMBEDDED, because the generator reachable from JS
//      fills two slots and two only** — `errorMessage(code, subject)`'s `segment` and `path`
//      (`bindings/js/src/facade.rs`) — **which is exactly the `CF-3` split this item's own closing clause
//      declares.** The status is a member of the store's closed set and is carried, never minted (`DD-40`).
//
// **AND NOTHING ON THIS PATH COERCES** (`A76`'s second part, verbatim: *"do not attempt to fix"*; `§1.8`): the
// value's own class is READ, the class that failed is NAMED, and the value is REFUSED — never converted,
// substituted, defaulted or truncated. The rendering of the target is the one guarded read `targetSpelling`
// already declares (`JS-1`: catch, then classify — never propagate the host error).

/// **THE POSITION A VALUE OCCUPIES** — `surface.md §2.5` item 6 (b): *"the ARGUMENT POSITION for a verb's
/// arguments, and the MEMBER POSITION for a member inside a value the walk reached"*. `write` is the ONE
/// verb whose argument is a VALUE (`surface.md §2.2`), so the argument position is `write`'s own `value`
/// slot; a member the walk reached is named by its PATH from that argument, spelled with `§2.5` item 6 (a)'s
/// own segment spellings — **a string key SINGLE-QUOTED (`'a'`) and an integer index BARE (`0`), JOINED BY
/// `/`**, which is the spelling the item declares for a whole address.
const VALUE_ARGUMENT_POSITION = "the write's value argument";

/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-4`, items `(4a)`–`(4e)`; the owed
/// byte is `implementation-plan.md §2` step `4`'s arm `(x)`): THE POSITION SPELLING INVOKES NOTHING TAKEN FROM A
/// MUTABLE PROTOTYPE.** The block above stands byte-for-byte and is read THROUGH this clause; **the three
/// segment renderings, the `/` separator, the empty key's `''` and the `member … of …` wrapper are UNMOVED.**
/// **THE STATE THIS CLOSES:** the shipped limb built the segment list with `path.map(...)` and joined it with
/// `.join('/')` — `Array.prototype.map` and `Array.prototype.join` taken from a MUTABLE PROTOTYPE — so a
/// caller's override RAN ON EVERY MEMBER-POSITION REFUSAL and its return value became the POSITION, which is
/// the package's own diagnostic datum and not a rendering of the value at all (`LIVE-F18`'s second count; the
/// file's own prohibition restated at `:1136`–`:1137` for `Object.prototype.hasOwnProperty`).
///
/// **THE FORM IS A LOCAL INDEX LOOP AND A LOCAL JOIN — `+=` INTO A `let` STRING.** No `map`, no `join`, no
/// `forEach`, no `reduce`, and no array or string METHOD taken from a prototype: the same form `Object.hasOwn`
/// already takes over `hasOwnProperty` at the walk.
function valuePosition(path) {
  if (path.length === 0) return VALUE_ARGUMENT_POSITION;
  let spelled = '';
  for (let i = 0; i < path.length; i += 1) {
    const segment = path[i];
    let rendered;
    if (typeof segment === 'number') {
      rendered = String(segment);
    } else if (hasLoneSurrogate(segment)) {
      // **A KEY THE MESSAGE MAY NOT CARRY IS NAMED BY ITS CLASS.** A member KEY holding a lone surrogate is
      // the one position this pass refuses whose own spelling cannot cross into the message at all: the
      // code unit has no `String` form a Rust `String` can carry, so the alternatives are a REPAIR (`§1.8`
      // forbids it, `A76`: *"do not attempt to fix"*) or a message that is not a string. **The position is
      // therefore spelled `'<key: a string carrying a lone surrogate>'`, which names the class the key HAS
      // and no byte of it** — the same reading `boundaryReject`'s target half takes at the segment position.
      rendered = "'<key: a string carrying a lone surrogate>'";
    } else {
      rendered = `'${segment}'`;
    }
    spelled += i === 0 ? rendered : `/${rendered}`;
  }
  return `member ${spelled} of ${VALUE_ARGUMENT_POSITION}`;
}

/// **A CONVERSION MEMBER ON THE REFUSED VALUE** — `Symbol.toPrimitive`, `toString` or `valueOf`, OWN on the
/// value **or reached through a prototype the value supplies** — **read WITHOUT invoking any of them**
/// (`getOwnPropertyDescriptor` reads a descriptor and never calls a getter, so no user code runs here either).
///
/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 (`docs/defects.md` · `DEF-2026-10-24-D`), items `(1)` and
/// `(4)`, ARE ITS AUTHORITY: `String(value)` INVOKES THE REFUSED VALUE'S CONVERSION MEMBER, AND A GUARDED
/// `catch` CANNOT UN-RUN A TRAP THAT RETURNS.** Item `(4)` re-derives **row `3`'s arm and row `8`'s DEPTH
/// arm conditionally**: each keeps the refused value's own spelling *"read WITHOUT invoking an own
/// `Symbol.toPrimitive`, `toString` or `valueOf` member of the refused value"*, and **where the refused value
/// carries such a member the arm answers the CLASS SPELLING — `'a function'` at row `3`, `'a value over the
/// walk ceiling'` at row `8`'s depth arm**. Item `(1)` states the rule generally (*"NO USER CODE RUNS ON A
/// REFUSAL PATH"*) and **says which members it means: *"whether that member is OWN on the value or reached
/// through a prototype the value supplies (a class's own `toString` method is reached exactly that way)"* —
/// so the own-descriptor read this test was filed as is ONE HALF of item `(1)`, and the chain is the
/// other.** A value whose `toString` stands on a custom prototype or on a class's own prototype runs that
/// trap through `String(value)` exactly as an own member does, and a guarded `catch` is as unable to un-run
/// it.
///
/// **THOSE TWO ARE THE ONLY ARMS THIS TEST CAN REACH WITH AN OBJECT OR A FUNCTION.** Every other rendering
/// arm carries a primitive (`null` · `undefined` · a `string` · a `boolean`-free `number` · a `bigint` · a
/// `symbol`) or the class spelling's own string, the `Proxy` arm answers `classSpelling` before this test is
/// consulted (**a `Proxy`'s descriptor read would run its `getOwnPropertyDescriptor` trap, which is why the
/// guard stands ABOVE this call**), and the six arms item `(2)` re-derives answer their row's class spelling
/// without rendering the value at all (`fault.subject`).
///
/// **⟶ AND THE CHAIN WALK STOPS AT THE LANGUAGE'S OWN PROTOTYPES, WHICH IS WHAT KEEPS THE TWO SANCTIONED
/// RENDERINGS OF ITEM `(4)`'s WITHOUT BRANCH.** An ordinary `{}` reaching `Object.prototype.toString`, an
/// array reaching `Array.prototype.toString` and a function reaching the standard `Function.prototype.toString`
/// machinery supply **no member the caller wrote**, so `'[object Object]'`, `'1,2'` and a function's own
/// source text stay the subject at the BASE of both conditional arms — item `(4)`'s own words for row `3` are
/// *"read through the standard `Function.prototype.toString` machinery (`String(fn)`'s answer for a function
/// that carries no conversion member of its own)"*, and a fix that answered the class spelling for an
/// ordinary value would be an OVER-REFUSAL the law does not declare. **The stop is STRUCTURAL, from the link
/// and from nothing else** (`isLanguageStandardPrototype` below), so a foreign realm's `Object.prototype`,
/// `Array.prototype` and `Function.prototype` are recognised on the same terms as this realm's, and a class's
/// own `toString` — one link above a class's prototype, which is not standard-shaped — is still found.
const CONVERSION_MEMBER_KEYS = [Symbol.toPrimitive, 'toString', 'valueOf'];

/// **ONE LINK'S OWN CONVERSION MEMBER, ASKED BY DESCRIPTOR AND NOTHING ELSE.** No getter is invoked (a
/// descriptor read does not call one), no `hasOwnProperty` is taken from a mutable prototype, no `Reflect.get`
/// is spelled on an accessor, and neither `in` nor `for…in` is used (each would reach the CHAIN, which this
/// walk takes itself so that every link can be classified before it is asked).
/// **⟶ AND THE KEY LIST IS CONSUMED BY INDEX, NOT THROUGH THE ITERATOR PROTOCOL** (`contract.md §2.1`'s
/// clause of 2026-10-24 on `F7-1`, items `(1c)(i)`, `(2b)`'s row `33` and `(10b)`): the array of well-known
/// symbol VALUES is lawful (`(1d)(iii)` — a value read off the `Symbol` binding is not a prototype member),
/// but `for … of` over it takes `Array.prototype[Symbol.iterator]`, and a caller's forged iterator could stop
/// the search before the caller's own `toString` was asked.
/// **⟶ AND EACH OF THE THREE DESCRIPTOR READS IS CHARGED `1`** (`contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-2`, item `(4c)(i)`, and item `(4e)`'s threading): where the spend is refused the answer is `true` —
/// "a conversion member stands here" — which is the WITH branch's conservative answer (the class spelling),
/// so an unpayable read never renders a value.
function ownsConversionMember(link, allowance) {
  for (let i = 0; i < CONVERSION_MEMBER_KEYS.length; i += 1) {
    if (!spendGuardRead(allowance, 1)) return true;
    if (Object.getOwnPropertyDescriptor(link, CONVERSION_MEMBER_KEYS[i]) !== undefined) return true;
  }
  return false;
}

/// **A PROTOTYPE THE LANGUAGE ITSELF SUPPLIES**, recognised STRUCTURALLY so that no realm's identity and no
/// prototype census equality is compared: an `Object.prototype`-shaped prototype (`§1`'s `(1)(b)` and
/// `(1)(c)` — `isStandardObjectPrototype` above), an exotic array standing one link above such a prototype
/// (any realm's `Array.prototype` IS an array, and `§1`'s `(2)` states its chain), or a callable standing one
/// link above such a prototype (any realm's `Function.prototype` IS a function). **Its own conversion members
/// are ECMAScript's machinery and not the caller's code**, so the walk above it STOPS there.
/// **⟶ AND BOTH ITS SHAPE JUDGEMENTS AND ITS ONE `getPrototypeOf` READ ARE CHARGED TO THE ONE ALLOWANCE**
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F7-2`, item `(4e)`): every read that decides whether the
/// walk STOPS here is a read of the budget, so no exemption is granted on reads the caller could not pay for.
/// Where the spend is refused the answer is `false` — **NOT exempted** — which keeps the conversion search
/// going (the conservative direction: the WITH branch, the class spelling).
function isLanguageStandardPrototype(link, allowance) {
  if (isStandardObjectPrototype(link, allowance)) return true;
  if (!Array.isArray(link) && typeof link !== 'function') return false;
  if (!spendGuardRead(allowance, 1)) return false; // ONE `getPrototypeOf` CALL — item `(4c)(ii)`
  const above = Object.getPrototypeOf(link);
  return above !== null && isStandardObjectPrototype(above, allowance);
}

/// **THE VALUE'S CONVERSION MEMBER, ANYWHERE THE CALLER SUPPLIED IT** — own on the value, or owned by any
/// prototype its chain reaches before the language's own. **A `Proxy` LINK IS NOT ASKED ANYTHING**: a
/// descriptor read on one runs its `getOwnPropertyDescriptor` trap, so a chain carrying one answers `true`,
/// which costs the arm its class spelling and runs no handler (`C-1`'s form, at this limb).
///
/// **ITS NAME MOVES WITH THE LAW** — the shipped `carriesOwnConversionMember` read own descriptors only, and
/// that read is the first test below, not the whole of it.
///
/// **⟶ AND `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1a)`, ADDS ONE KEY TO THE LINK
/// WALK: AN **ADDED** `Symbol.toPrimitive` ON A SHAPE-STANDARD PROTOTYPE IS A CONVERSION PATH THE ARM MAY NOT
/// TAKE, AND IT IS SEPARATED FROM AN INTRINSIC BY ONE OWN-DESCRIPTOR READ OF THAT KEY PER LINK, TAKEN BEFORE
/// THE EXEMPTION STOPS THE WALK.** The exemption's carrying test asks NAMES only and no realm's
/// `Object.prototype`, `Array.prototype` or `Function.prototype` carries an own `Symbol.toPrimitive`, so an
/// ADDED one left the shape test TRUE, the stop at the language's own prototype exempted the link, and
/// `String(value)` reached it — ToPrimitive's `@@toPrimitive` lookup being a `[[Get]]` that traverses the
/// chain. **THIS IS NOT THE REJECTED THREE-KEY ORDERING SWAP** (that clause's item `(6)`): the swap asks all
/// three keys of every shape-standard link and would withdraw `'[object Object]'`, `'1,2'` and a function's
/// source text; THIS ASKS ONE KEY and answers "does not carry" for every intrinsic prototype, so item `(2)`'s
/// three sanctioned renderings stand. **THE WALK CONTINUES PAST THE STOP FOR THIS KEY ALONE** — the
/// rendering traverses the WHOLE chain for `@@toPrimitive`, so a member added to a link ABOVE a
/// language-standard one is reached by the rendering just the same — while the `toString`/`valueOf` search
/// still ends at the language's own machinery, which is item `(7)`'s reading of *"own"* for the one key.
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-1`, items `(1a)`, `(1c)`, `(1d)`
/// and `(1f)`): EVERY LINK THIS WALK ENTERS IS CHARGED TO THE ONE PER-CALL POSITION BUDGET.** The block above
/// stands byte-for-byte and is read THROUGH this clause; **every descriptor read, the shape test, the
/// exemption's stop, the `Proxy` answer and the guarded `catch` stand unmoved.** The shipped walk was
/// one-argument and walked its chain link by link to `null` WITH NO CHARGE ANYWHERE, so an element set
/// multiplying chain traversals re-scaled the very cost the per-call budget was ruled to close (item `(1b)`).
/// **THE SPEND IS ONE POSITION PER LINK, TAKEN ON ENTRY AND BEFORE THE FIRST READ OF THAT LINK** — through
/// `spendGuardPosition` below, the one figure `NODE_CEILING` and NO SECOND CEILING — and where the spend is
/// refused this reader answers `true`, i.e. **"caller code is reachable"**, so the arm takes its class
/// spelling and nothing is rendered (the WITH branch's conservative answer, un-re-deciding the guard's one
/// conjunction). **THE ALLOWANCE IS THE CALLER'S AND IS NEVER OPENED HERE:** it is the fresh per-call `budget`
/// `renderGuardTrips` creates, threaded in by that entry, so no census, chain length or memo is captured and
/// `C-11` is untouched.
///
/// **⟶ AND EVERY READ THIS WALK TAKES IS CHARGED THE SAME WAY FROM 2026-10-24** (`contract.md §2.1`'s clause
/// of this date on `F7-2`, items `(4c)` and `(4e)`): one link entered is `1` (already charged on entry), its
/// `@@toPrimitive` descriptor read is `1`, each descriptor read of `ownsConversionMember` is `1`, every
/// `getPrototypeOf` call — the value's own and the loop's — is `1`, and the shape judgement's census reads are
/// `1 + length`. Where a spend is refused every branch answers `true`, **"caller code is reachable"**, which
/// is the WITH branch's conservative answer and the arm's class spelling.
function carriesConversionMember(value, allowance) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  try {
    if (types.isProxy(value)) return true;
    if (ownsConversionMember(value, allowance)) return true;
    if (!spendGuardRead(allowance, 1)) return true; // the `getPrototypeOf` read below — item `(4c)(ii)`
    let link = Object.getPrototypeOf(value);
    let aboveTheExemption = false;
    while (link !== null) {
      // ONE POSITION PER LINK ENTERED (item `(1c)`), charged BEFORE the read that reached the link, so no
      // chain can be entered unpaid and exhaustion answers "caller code is reachable".
      if (!spendGuardPosition(allowance, 1)) return true;
      if (types.isProxy(link)) return true;
      // ITEM `(1a)`'S READ — ONE KEY, OWN, BY DESCRIPTOR (so no getter is called), BEFORE THE STOP.
      if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
      if (Object.getOwnPropertyDescriptor(link, Symbol.toPrimitive) !== undefined) return true;
      if (!aboveTheExemption) {
        if (isLanguageStandardPrototype(link, allowance)) {
          // the language's own machinery: the `toString`/`valueOf` search ends here, the `@@toPrimitive`
          // read above does not
          aboveTheExemption = true;
        } else if (ownsConversionMember(link, allowance)) {
          return true;
        }
      }
      if (!spendGuardRead(allowance, 1)) return true; // the loop's `getPrototypeOf` — item `(4c)(ii)`
      link = Object.getPrototypeOf(link);
    }
    return false;
  } catch {
    // **A CHAIN THAT CANNOT BE READ ANSWERS `true`** — the arm takes its class spelling, the rendering is not
    // attempted, and the guarded `catch` that stands beside this call in `valueTargetSpelling` is not needed.
    return true;
  }
}

/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1b)`: AN OWN OR ADDED
/// `Symbol.toStringTag` MEMBER IS THE RENDER GUARD'S SECOND TEST.** `Object.prototype.toString` reads
/// `@@toStringTag` off the refused value — a `[[Get]]` that traverses the chain — so an own `@@toStringTag`
/// ACCESSOR is INVOKED at row `8`'s depth arm (a value the walk refused on ENTRY, above the shape arm that
/// would have refused an own accessor) and an ADDED one on a shape-standard prototype is reached the same
/// way. **THE READ IS TAKEN FOR THE KEY AND NOT MERELY FOR THE ACCESSOR BIT, DELIBERATELY**: a DATA
/// `@@toStringTag` member would move the SUBJECT (`String({ [Symbol.toStringTag]: 'X' })` is `'[object X]'`),
/// and a subject that depends on a caller's data is not the declared form — the accessor case is the no-run
/// case and the data case is the determinism case, and ONE descriptor read answers both. **NO ADMISSION
/// MOVES**: a value carrying an own `Symbol`-keyed member is refused at its own position as row `5` already,
/// and at row `8`'s depth arm it is refused as row `8` regardless. **NO REALM'S INTRINSIC PROTOTYPE CARRIES
/// AN OWN `@@toStringTag`**, so the read answers "absent" for every intrinsic chain and item `(2)`'s
/// renderings stand.
///
/// **⟶ AND THIS WALK IS CHARGED THE SAME WAY** (`contract.md §2.1`'s clause of 2026-10-24 on `F6-1`, items
/// `(1c)`, `(1d)` and `(1f)`): **ONE POSITION PER LINK ENTERED, SPENT ON ENTRY AND BEFORE THE FIRST READ OF
/// THAT LINK**, from the SAME per-call allowance `carriesConversionMember` above spends — so the two walks an
/// element costs are both paid from the one figure, and where a spend is refused this reader answers `true`
/// (the WITH branch, the class spelling). The descriptor reads, the `Proxy` answer and the guarded `catch`
/// stand unmoved.
function carriesTagMember(value, allowance) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  try {
    if (types.isProxy(value)) return true; // a descriptor read on a `Proxy` would run a trap
    // **⟶ AND EVERY READ IS CHARGED, AS THE SIBLING WALK'S ARE** (`contract.md §2.1`'s clause of 2026-10-24 on
    // `F7-2`, items `(4c)` and `(4e)`): each `@@toStringTag` descriptor read is `1` and each `getPrototypeOf`
    // call is `1`; a refused spend answers `true` (the WITH branch, the class spelling).
    if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
    if (Object.getOwnPropertyDescriptor(value, Symbol.toStringTag) !== undefined) return true;
    if (!spendGuardRead(allowance, 1)) return true; // the value's `getPrototypeOf` — item `(4c)(ii)`
    let link = Object.getPrototypeOf(value);
    while (link !== null) {
      // ONE POSITION PER LINK ENTERED (item `(1c)`), before the read that reached the link.
      if (!spendGuardPosition(allowance, 1)) return true;
      if (types.isProxy(link)) return true;
      if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
      if (Object.getOwnPropertyDescriptor(link, Symbol.toStringTag) !== undefined) return true;
      if (!spendGuardRead(allowance, 1)) return true; // the loop's `getPrototypeOf` — item `(4c)(ii)`
      link = Object.getPrototypeOf(link);
    }
    return false;
  } catch {
    return true;
  }
}

/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1c)`: THE ARRAY-ELEMENT LIMB.** At row
/// `8`'s DEPTH arm the refused value may be an ARRAY, and `Array.prototype.toString` calls `join`, which takes
/// each element by `[[Get]]` and CONVERTS it — **so the elements' conversion members run, and the walk never
/// classified those elements, the element loop lying BELOW the arm.** **EVERY OWN INDEX IS READ BY
/// DESCRIPTOR**, so an own ACCESSOR at an index answers the class spelling and ITS GETTER NEVER RUNS, and
/// **EVERY DATA ELEMENT IS SUBJECTED TO THE SAME RENDER GUARD** the refused value itself is put to — an
/// element's `ToString` is a rendering as the value's `String` is, so one guard governs both and a test that
/// asked only `carriesConversionMember` would leave an added `Symbol.toPrimitive` on a standard prototype
/// running for an OBJECT element. **WHERE EVERY ELEMENT IS A PRIMITIVE** — or an object whose conversion and
/// tag members sit only on an intrinsic prototype — no guard is tripped and the sanctioned `'1,2'` renders.
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of that date on `F-RA-20`, items `(b)`, `(c)` and
/// `(d)`): THE REPEAT TEST IS THE CURRENT PATH AND NOT A VISITED SET.** The block above stands byte-for-byte
/// and is read THROUGH this clause; **the descriptor reads, the accessor answer, the element guard and the
/// `try` all stand unmoved.** The second parameter is a PATH — the list of arrays the walk is CURRENTLY
/// reading, extended by `[...path, value]` (the file's own idiom at the ancestor stack's `[...ancestors,
/// value]`) — so `seen.has` becomes a membership test on that path and `seen.add` becomes the append. **A
/// CYCLE STILL TRIPS** — a self-containing array is ON the path when its own element is read, so the
/// membership test answers at the repeat and the arm reaches its class spelling DETERMINISTICALLY rather
/// than through a stack-overflow `catch` — **while an ALIAS DOES NOT**: a sub-value the same parent holds
/// twice is on no path when either occurrence is read, and rendering it twice runs the same code twice and
/// reaches no member the first read did not (item `(b)`: an alias is neither a cycle nor caller code, and
/// `§4`'s clause on `F-RA-4` already declares the walk's *"ancestor stack and never a visited set"*).
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-1` and `F5-2`, items `(1b)`, `(1c)`,
/// `(1d)`, `(1f)` and `(2)`; the owed byte is `implementation-plan.md §2` step `4`'s arm `(viii)`): THE GUARD'S
/// WORK IS BOUNDED PER CALL.** The block above stands byte-for-byte and is read THROUGH this clause; **the
/// descriptor reads, the accessor answer, the `Proxy` answer, the non-array answer, the hole's `continue` and the
/// guarded `catch` all stand unmoved.** **THE COST IT CLOSES, WITH BOTH WITNESSES:** the path test alone walks a
/// shared sub-value ONCE PER POSITION IT OCCUPIES, so `let v = [1]; for (i < 40) v = [v, v];` costs `~2^40`
/// visits (measured at this tree: depth `16` = `174` ms, depth `20` = `2,578` ms, depth `24` = `40,945` ms, and
/// depth `40` did not answer inside `7` seconds); and the element limb scanned the WHOLE `length`, so
/// `new Array(4294967295)` cost `~4.29×10^9` descriptor reads (also killed at `7` seconds). **Neither ceiling of
/// `§4` counted either, because the refused subtree is never walked.**
///
/// **THE THREE LIMBS, EACH AS ITEM `(1b)` STATES IT:**
///   (i) **THE TRIP IS THE PATH TEST, TAKEN FIRST** — an ancestor on the current path trips (a cycle), a value
///       off it does not (an alias).
///   (ii) **THE COST IS A PER-CALL MEMO CONSULTED ONLY AFTER THE PATH TEST** — a repeat answers `false` (the
///       answer its first occurrence gave, which is the only answer a still-scanning frame can have produced)
///       and ITS OWN POSITION COUNT IS CHARGED, so an aliased DAG is counted per position and the memo cannot
///       be used to evade the budget. **The memo is a COST device and never a trip decision** (item `(1b)`).
///   (iii) **A PER-CALL POSITION BUDGET OF `NODE_CEILING` — `1,000,000` — AND THE CLASS SPELLING WHEN IT IS
///       SPENT** (item `(1d)`: the crossing's own figure, no third ceiling minted). Positions are counted `§8`
///       row `8`'s way — one per position the walk would visit, an alias counted per position — and **the
///       element limb's descriptor reads spend the SAME budget**, so no `length` the walk would never have
///       walked is ever scanned (item `(2)(b)`). **ON EXHAUSTION THE GUARD ANSWERS "CALLER CODE IS REACHABLE"**
///       — the WITH branch — so the arm answers its class spelling and renders nothing.
///
/// **A HOLE IS NOT A TRIP AND IS NOT MADE ONE** (item `(1f)`): `'1,,3'`'s declared rendering survives because a
/// missing descriptor still `continue`s; only the budget bounds the sparse limb. **AND THE BUDGET IS FRESH PER
/// CALL** — created at `renderGuardTrips`'s own entry, never per element and never module-level, so no census is
/// cached across calls and `C-11`'s no-frozen-prototype-fact rule is untouched.
///
/// **⟶ AND NOTHING THIS LIMB DOES IS TAKEN FROM A MUTABLE PROTOTYPE** (`contract.md §2.1`'s clause of
/// 2026-10-24 on `F7-1`, items `(1c)`, `(2b)`'s rows `18`, `24` and `26`, and `(10b)`: *"`Array.prototype.includes
/// = () => false` currently misses a **cycle** and the walk dies in a raw host `RangeError`"*). **Three sites,
/// one class:**
///   * **THE PATH TEST IS A LOCAL LOOP** (`(1c)(vi)`'s spelled `===`), not `path.includes(value)` — a forged
///     `includes` answering `false` un-detected the cycle, the recursion re-entered the ancestor and the host
///     stopped the process instead of the arm answering its class spelling;
///   * **THE PATH EXTENSION IS A LOCAL INDEX LOOP**, not `[...path, value]` — an array spread consumes the
///     path through `Array.prototype[Symbol.iterator]`;
///   * **THE MEMO IS A PAIR LIST READ BY INDEX**, not a `Map` — `Map.prototype.get` was the repeat's whole
///     cost decision (item `(2b)`'s rows `23` and `24`; the measured states are the battery's row `(d)`).
function arrayElementsReachCallerCode(value, path, allowance) {
  if (value === null || typeof value !== 'object') return false;
  try {
    if (types.isProxy(value)) return true;
    if (!Array.isArray(value)) return false;
    // AN ANCESTOR ON THE CURRENT PATH IS A CYCLE, NOT AN ALIAS — asked by a local loop over the datum's own
    // indices, never by `Array.prototype.includes`.
    //
    // **⟶ AND THE SCAN IS CHARGED `1` PER ENTRY THE PATH CARRIES, BEFORE IT IS TAKEN** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-3`, items `(3c)`'s term `(ix)` and `(3d)`): the path test performs one spelled
    // `===` per entry and it is CALLER-SCALED — a shared sub-value walks it once per position it occupies — so
    // an uncharged scan was a caller-set price for a sanctioned rendering. **The spend answers "caller code is
    // reachable" where it is refused**, exactly as the limb's other spends do (`:1618` · `:1638`).
    if (!spendGuardRead(allowance, path.length)) return true;
    let onPath = false;
    for (let i = 0; i < path.length; i += 1) {
      if (path[i] === value) {
        onPath = true;
        break;
      }
    }
    if (onPath) return true;
    // (iii) THE ARRAY'S OWN POSITION, SPENT BEFORE ANY READ.
    if (!spendGuardPosition(allowance, 1)) return true;
    // (ii) THE MEMO, CONSULTED ONLY AFTER THE PATH TEST, AND THE REPEAT'S OWN COUNT IS CHARGED.
    //
    // **⟶ AND THE CONSULTATION IS CHARGED `1 + memo.length`, BEFORE ITS SCAN** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F8-3`, items `(3c)`'s term `(viii)` and `(3d)`): the scan performs one spelled `===` per
    // RECORDED ENTRY and `memo` grows by one entry per DISTINCT leaf, so `~125,000` distinct leaves were
    // `1 + 2 + … + 125,000 ≈ 7.8×10⁹` UNCHARGED identity comparisons inside ONE `1,000,000`-unit call — the
    // guard was bounded in positions and unbounded in reads. **CHARGED, the budget exhausts near the `1,400`th
    // distinct leaf and the arm answers its class spelling without taking the scan; `NODE_CEILING` stays the
    // ONE per-call figure, created once per `renderGuardTrips` call, and no second ceiling is minted.**
    const memo = allowance.memo;
    if (!spendGuardRead(allowance, 1 + memo.length)) return true;
    let recorded = null;
    for (let i = 0; i < memo.length; i += 1) {
      if (memo[i].value === value) {
        recorded = memo[i];
        break;
      }
    }
    if (recorded !== null) {
      if (!spendGuardPosition(allowance, recorded.positions)) return true;
      return recorded.answer;
    }
    const positionsBefore = allowance.positions;
    // **⟶ AND THE COPY IS THE PATH'S SECOND CHARGED LIMB: `1` PER ENTRY IT CARRIES** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-3`, items `(3c)`'s term `(ix)` and `(3d)`): `extendedPath` copies one entry per
    // path entry and that loop was charged nothing. **BOTH limbs are charged** — charging only the copy would
    // leave the caller-scaled TEST at `0`, which is the loop the finding measures.
    if (!spendGuardRead(allowance, path.length)) return true;
    const next = extendedPath(path, value);
    const length = value.length; // an exotic array's own data property: no getter is reached here
    for (let i = 0; i < length; i += 1) {
      // THE DESCRIPTOR READ THIS LIMB PERFORMS IS ONE POSITION OF THE ONE BUDGET (item `(2)(b)`), so a
      // `length` no walk would have walked spends itself out instead of being scanned.
      if (!spendGuardPosition(allowance, 1)) return true;
      const descriptor = Object.getOwnPropertyDescriptor(value, i);
      if (descriptor === undefined) continue; // a hole: `join` converts nothing there
      if (descriptor.get !== undefined || descriptor.set !== undefined) return true;
      if (renderGuardTrips(descriptor.value, next, allowance)) return true;
    }
    memo[memo.length] = { value, answer: false, positions: positionsBefore - allowance.positions };
    return false;
  } catch {
    return true;
  }
}

/// **ONE MORE SEGMENT ON A PATH, BUILT BY A LOCAL INDEX LOOP** — items `(1c)(i)` and `(1c)(v)`: the copy reads
/// the path's own indices and writes the extension's own index, so no array spread and no iterator is reached.
function extendedPath(path, segment) {
  const next = [];
  for (let i = 0; i < path.length; i += 1) next[i] = path[i];
  next[path.length] = segment;
  return next;
}

/// **ONE SPEND AGAINST THE PER-CALL POSITION BUDGET** — answers `true` where the spend is covered and `false`
/// where it would overdraw, so the caller that receives `false` answers "caller code is reachable" and the arm
/// takes its class spelling (item `(1d)`). **THE FIGURE IS `NODE_CEILING` AND NO SECOND CONSTANT IS MINTED**
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F5-1`, item `(1d)`); the allowance itself is created once per
/// call of `renderGuardTrips` below.
function spendGuardPosition(allowance, positions) {
  if (positions > allowance.positions) {
    allowance.positions = 0;
    return false;
  }
  allowance.positions -= positions;
  return true;
}

/// **⟶ ONE READ SPENT AGAINST THE SAME ONE PER-CALL ALLOWANCE — `contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-2`, items `(4c)`, `(4e)` and `(10e)`, item `(4c)`'s unit being EXHAUSTIVE**, AND RE-DERIVED TO ITS
/// **ELEVEN** TERMS BY THIS SECTION'S CLAUSE OF `2026-10-24` ON `F8-3`, ITEM `(3c)` (arm `(xvii)` widened,
/// cell `JC-TC-67`), EACH WITH THE SITE THAT TAKES IT: **(i)** one `Object.getOwnPropertyDescriptor` call is
/// `1`; **(ii)** one `Object.getPrototypeOf` call is `1`; **(iii)** an own-NAME census read is
/// `1 + the length of the list it returns`; **(iv)** an own-SYMBOL census read is `1 + the length of the list
/// it returns`; **(v)** an element index read is `1`, charged where it is taken through `spendGuardPosition`;
/// **(vi)** a link entered is `1`, charged by the chain loops' own spends; **(vii)** a memo HIT is the
/// repeat's recorded count; **(viii) a MEMO CONSULTATION is `1 + memo.length`** — charged before its scan at
/// `arrayElementsReachCallerCode`, because the scan performs one spelled `===` per recorded entry and the memo
/// grows by one entry per distinct leaf; **(ix) THE PATH IS `1` PER ENTRY IT CARRIES, CHARGED AT BOTH LIMBS —
/// THE TEST'S SCAN AND THE COPY** (`extendedPath`'s call site), the scan being charged because it is the
/// caller-scaled loop the finding measures; **(x)** an allocation and a `typeof` are `0`; and **(xi) AN
/// IDENTITY COMPARE AND A SPELLED RELATIONAL COMPARISON ARE `0` ONLY WHERE THEY ARE NOT ONE OF TERMS `(viii)`
/// AND `(ix)`.** **NO SECOND FIGURE IS MINTED** — `NODE_CEILING` (`1,000,000`) stays the one per-call
/// budget, created once per `renderGuardTrips` call — and **exhaustion is NOT a trip decision**: a caller that
/// receives `false` answers the WITH branch's conservative answer (item `(1d)`), exactly as
/// `spendGuardPosition` already rules. **A CALLER THAT CARRIES NO ALLOWANCE IS THE WALK, WHICH COUNTS NODES**
/// (`encodeValue`'s own ceiling), so the charge is skipped there and no admission moves.
function spendGuardRead(allowance, reads) {
  if (allowance === null || allowance === undefined) return true;
  return spendGuardPosition(allowance, reads);
}

/// **THE RENDER GUARD'S THREE TESTS, AS `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(6)`,
/// STATES THEM: the WITH branch is taken where they do not all answer "no caller code"** — `(1a)`'s
/// `Symbol.toPrimitive` descriptor read (inside `carriesConversionMember` above), `(1b)`'s
/// `Symbol.toStringTag` descriptor read, and `(1c)`'s element reads. Every one of the three is a READ of a
/// descriptor or a per-call walk, so `C-11`'s no-frozen-prototype-fact rule is untouched: no identity is
/// captured, no census is cached and no intrinsic is compared.
///
/// **⟶ AND ITS ENTRY IS WHERE THE ONE ALLOWANCE IS OPENED** (`contract.md §2.1`'s clause of 2026-10-24 on
/// `F5-1`, item `(1b)(iii)`): a FRESH `NODE_CEILING` position budget and a FRESH empty memo per call — the
/// carrier slot reaches that entry through the guard call below, and the value arm through
/// `valueTargetSpelling` — so no allowance is shared between calls and none stands at module level. **An
/// `allowance` is threaded in only by the recursion inside `arrayElementsReachCallerCode`, which passes its
/// own call's allowance down.**
///
/// **⟶ AND FROM 2026-10-24 THE SAME `budget` IS HANDED TO ALL THREE TEST CALLS, THE TWO CHAIN WALKS
/// INCLUDED** (`contract.md §2.1`'s clause of this date on `F6-1`, items `(1c)` and `(1d)`): every read the
/// guard performs is charged to the one per-call allowance — the array's own position, each index the element
/// limb reads, and every link each chain walk enters, per element and for the refused value itself — so no
/// call site is left uncharged and no chain can be entered unpaid. **THE FIGURE STAYS `NODE_CEILING` AND NO
/// SECOND CEILING IS MINTED**, the allowance stays fresh per call, and exhaustion answers "caller code is
/// reachable" at each limb (the WITH branch, the class spelling).
function renderGuardTrips(value, path = [], allowance = null) {
  // **⟶ AND THE MEMO IS A PAIR LIST, NOT A `Map`** (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`,
  // items `(2b)`'s rows `23` and `24` and `(10c)`): `Map.prototype.get`/`set` are mutable-prototype members
  // by item `(1d)(iv)`, and the battery's row `(d)` measures the two answers they gave — a forged `get`
  // answering a recorded "no caller code" and a no-op `set` — each of which decided a rendered subject.
  const budget = allowance === null ? { positions: NODE_CEILING, memo: [] } : allowance;
  return carriesConversionMember(value, budget)
    || carriesTagMember(value, budget)
    || arrayElementsReachCallerCode(value, path, budget);
}

/// **THE FAILING TARGET AT A VALUE POSITION, RENDERED AS THE STORE'S GENERATOR RENDERS IT** —
/// `surface.md §2.5` item 6 (a). **ITS ONE EXAMPLE THAT DIFFERS FROM A CARRIER'S TARGET IS THE SYMBOL**: a
/// symbol's own value carries the caller's DESCRIPTION, and the item's own example prints the CLASS's
/// canonical token `Symbol()`, which is the spelling this arm carries. Every other target is printed as its
/// own value, guarded exactly as `targetSpelling` guards its read.
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-D`; `contract.md §2.1`'s clause of that date, items `(1)`,
/// `(4)` and `(6)`): `String(value)` IS WITHDRAWN AS A SUBJECT SOURCE AT EVERY ARM WHOSE SUBJECT IS THE
/// REFUSED VALUE'S OWN RENDERING AND THE VALUE CARRIES A CONVERSION MEMBER.** The block above stands
/// byte-for-byte and is read THROUGH this clause; **its four named substitutions are UNMOVED** — a
/// `bigint`'s `` n ``, a `symbol`'s `Symbol()`, a `Proxy`'s class spelling and a lone-surrogate string's class
/// spelling — and item `(6)` reads them byte-identical. **WHAT MOVES IS ONE TEST, INSERTED AFTER THE PROXY
/// GUARD AND BEFORE `String(value)`:** a `Symbol.toPrimitive`/`toString`/`valueOf` member the refused value
/// carries answers the ROW'S OWN CLASS SPELLING, which the walk hands in as `rowClass` (`fault.found`), and no
/// conversion member is invoked. **THE GUARDED `catch` BELOW STANDS AS THE FALLBACK FOR A RENDERING THAT
/// THROWS** (item `(4)`'s closing sentence, and item `(5)` item `(e)`'s list of its answers). **AND THE
/// MEMBER IS SOUGHT WHERE ITEM `(1)` SAYS IT STANDS — *"whether that member is OWN on the value or reached
/// through a prototype the value supplies"* — so `carriesConversionMember` above walks the chain and stops at
/// the language's own prototypes**, which is what keeps this arm's WITHOUT branch (`'[object Object]'`, a
/// function's source text, `'1,2'`) reachable for a value whose only conversion member is
/// `Object.prototype.toString` or the standard `Function.prototype.toString` machinery.
function valueTargetSpelling(value, rowClass) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    if (typeof value === 'symbol') return 'Symbol()';
    // **⟶ AND A PROXY IS NEVER COERCED HERE EITHER — `C-1`'s THIRD HALF, CLOSED AT THIS ARM 2026-10-23 BY
    // THE GATE-4 ADVERSARIAL BATTERY (`json-crossing-gate4-adversarial.test.mjs`'s `ADV-03`/`ADV-05`/`ADV-06`).**
    // The `targetSpelling` guard stood at the CARRIER arm; this VALUE arm lacked it, so a refused `Proxy`
    // reached `String(value)` and its `Symbol.toPrimitive`/`toString` GET TRAP RAN — the very trap the walk's
    // `util.types.isProxy` refusal exists to avoid — even though a throwing trap was caught by the `catch`
    // below. **THE CLASS IS READ WITH `util.types.isProxy` ALONE AND NO TRAP RUNS**, exactly as
    // `targetSpelling` does at its own arm.
    if ((typeof value === 'object' || typeof value === 'function') && value !== null && types.isProxy(value)) {
      return classSpelling(value);
    }
    // **AND A TARGET THE MESSAGE MAY NOT CARRY IS NAMED AS ITS OWN CLASS RATHER THAN AS ITS BYTES**: a string
    // carrying a LONE SURROGATE is the one value this pass refuses whose code unit has no `String` form at
    // all, so printing it would REQUIRE the repair `§1.8` forbids (`A76`: *"do not attempt to fix"*). **The
    // class half is mandatory (item 6 (b)); the byte half is the one datum no clause requires here.**
    if (typeof value === 'string' && hasLoneSurrogate(value)) return 'a string carrying a lone surrogate';
    // **`§2.1`'s clause of 2026-10-24, item `(4)` — NO CONVERSION MEMBER OF THE REFUSED VALUE IS INVOKED.**
    // Where the value carries one — OWN, or reached through a prototype it supplies (item `(1)`'s own
    // parenthesis) — the arm answers the row's own class spelling (`'a function'` at row `3`, `'a value over
    // the walk ceiling'` at row `8`'s depth arm), which is the string the walk recorded as the class — so
    // `String(value)` below never runs for such a value and the trap is not merely caught, it is not reached.
    // **⟶ AND THE TEST IS THE RENDER GUARD'S THREE TESTS, NOT ONE OF THEM** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F-RA-13`, item `(6)`): item `(1a)`'s added-`Symbol.toPrimitive` read, item `(1b)`'s
    // `Symbol.toStringTag` descriptor read and item `(1c)`'s array-element reads each answer "caller code is
    // reachable" here, and where any does, this arm answers the row's class spelling and renders nothing.
    // **⟶ AND WHERE NO ROW CLASS IS SUPPLIED THE ANSWER IS THE VALUE'S OWN CLASS SPELLING**
    // (`contract.md §2.1`'s clause of 2026-10-24 on `F-RA-18`, items `(c)` and `(e)`): **AT A CARRIER POSITION
    // THE SUBJECT IS THAT POSITION'S OWN DECLARED DESCRIPTOR, NEVER `undefined`.** The VALUE arm hands the
    // row's own class in from the walk's record (`:1381`), and the ONE-ARGUMENT carrier call at `:2334`
    // supplies none because a CARRIER refusal declares no row class — `§2`'s seventeen rows are the WALK's —
    // so an address carrying a conversion or tag member rendered the eleven characters `'undefined'` where
    // the caller's own rendering stood. **The fallback is `classSpelling(value)`, exactly the byte the
    // guarded `catch` below already answers for a rendering that throws**, so this arm has ONE fallback rather
    // than two and no call site can print garbage. Nothing else moves: the two substitutions above, the Proxy
    // guard, `String(value)` below, the `catch` and the value arm's two-argument call all stand unmoved.
    if (renderGuardTrips(value)) return rowClass === undefined ? classSpelling(value) : rowClass;
    return String(value);
  } catch {
    // The rendering THREW (a `valueOf`/`Symbol.toPrimitive`/`Proxy` trap): the CLASS spelling is the
    // declared fallback, because the reason's class half is mandatory (item 6 (b)) and nothing escapes.
    return classSpelling(value);
  }
}

/// **A REFUSAL THE WALK PRODUCED AT A VALUE POSITION, ANSWERED IN THE ONE FORM — VERBOSELY.** `§1.8`'s dated
/// clause 1: *"AT A VALUE POSITION — a member of a value the WALK meets, or the written value itself — the
/// class is `NonPlainCollection` and the code is that class's own `ValueNotAdmitted` … PRODUCED AT THE
/// WALK"*. The status is the store's own member token and is never minted here (`DD-40`); PART ONE is the
/// store's generator's bytes at the failing target's own spelling; PART TWO — the class that failed and the
/// position the contract declares for it — is appended (`CF-3`). `write` is this helper's ONE caller, and it
/// calls it at the ONE site where the store answered `ValueNotAdmitted` for a value the walk had refused.
///
/// **⟶ AMENDED 2026-10-23 (THE GATE-3 PROOFREADING PASS, `role_proofreader`; `RCA-8(g)`): THE CODE IS
/// `ValueRefusedAtBoundary` AND IT IS ANSWERED BEFORE ANY STORE VERB IS CALLED.** The block above stands
/// byte-for-byte and is read THROUGH this clause, on exactly two of its terms: *"the code is that class's own
/// `ValueNotAdmitted`"* is read as the boundary refusal's status **`ValueRefusedAtBoundary`** — the store's
/// rank-`17` member, minted by the store's closed set (`docs/specs/storeroom-native/contract.md` `§8.1`, its
/// amendment of 2026-10-23) and SELECTED by the package, which mints neither the status nor its code — and
/// *"it calls it at the ONE site where the store answered `ValueNotAdmitted` for a value the walk had
/// refused"* is read as **the PRE-VERB site**: `write` checks the walk's recorded fault — the statement
/// `if (fault.found !== null) valueReject(fault);` — and this helper throws THERE, ahead of the entry call
/// `entryOf().write.call(this, …)`, so THE STORE ANSWERS NOTHING HERE AND NEVER RECEIVES THE REFUSED TREE.
/// **THE TWO SITES' POSITIONS IN THIS FILE: the fault check at `:2439` and the entry call at `:2454`** —
/// `:2391` and `:2406` are where the gate-4 audit read them, the difference being this pass's own inserted
/// comment lines and nothing else. PART ONE (the store generator's bytes at the failing target's own spelling),
/// PART TWO (class and position appended, `CF-3`) and `DD-40` stand unmoved.
/// `[A2 docs/decisions.md · `A148` (Q3); docs/specs/storeroom-native/contract.md §8.1 — its 2026-10-23
/// amendment, rank `17`, *"the store never receives those values on the JavaScript route"*; A1
/// bindings/js/index.mjs:2439 · :2454 | requirement]`
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-D`; `contract.md §2.1`'s clause of that date, items `(1)`–`(3)`
/// and `(7)`): THE SUBJECT IS THE WALK'S OWN RECORD WHEN THE ARM DECLARED ONE, AND THE REFUSED VALUE IS NOT
/// RENDERED AT THE SIX ARMS THAT CLAUSE RE-DERIVES.** The block above stands byte-for-byte and is read THROUGH
/// this clause; **PART ONE's fixed bytes, the generator's single quoting, PART TWO and the status are
/// unmoved.** **`fault.subject` IS THE WALK'S DECLARED SUBJECT AND IS `null` AT EVERY ARM THAT RENDERS ITS
/// TARGET**: where the walk set it — rows `5`, `11`, `13`, `14`, `15` and `16`, item `(2)` — PART ONE opens on
/// the CLASS SPELLING that row's own row carries, so at those six arms the subject and PART TWO's class are the
/// SAME STRING and the message names the row's class twice (item `(3)`: the declared form, and not a defect).
/// **THE TARGETS THE WALK HANDS (`fault.value`) ARE UNMOVED AT ALL SIX — the containing value at rows `5` and
/// `15`, the repeated ancestor at `11`, the instance at `13` and `14`, the array at `16` — only the RENDERING
/// of them is withdrawn** (item `(2)`), and `valueTargetSpelling` is the rendering for every other arm.
function valueReject(fault) {
  boundaryReject(
    'ValueRefusedAtBoundary', // A148 Q3's rank-17 member, carried and never minted (`DD-40`)
    fault.subject === null ? valueTargetSpelling(fault.value, fault.found) : fault.subject,
    `the value at ${valuePosition(fault.path)} is ${fault.found}`,
  );
}

/// **THE CLASS THE SHAPE ARMS REFUSE** — `§1.4` items 1 and 4 (c): an own `Symbol`-keyed member and an own
/// accessor each refuse the WHOLE value (*"any other answer would DROP A MEMBER SILENTLY"*, `DD-8`), so the
/// value's own class is the admitted one it holds and the reason names the arm's own class instead.
function shapeArmClass(refusal) {
  return refusal.k === 'y'
    ? 'a value carrying a Symbol-keyed own member'
    : 'a value carrying an own accessor member';
}

// ---------------------------------------------------------------------------------------------
// THE CROSSING MODEL, ENCODED FOR THE CORE — `bindings/js/src/facade.rs` states the protocol, and this
// section is its only producer. **The class decisions are TAKEN HERE: an IN-DOMAIN value is carried as
// data and every other rule of `crossing.md §1.4` over it is the core's (`package.md §4.5` item 3 (c)),
// while a value the WALK refuses is ANSWERED HERE, in the one form, verbosely** (`§1.8`'s dated clause 1).
// ---------------------------------------------------------------------------------------------

/// **`A76`'S CLASS ORDER, SHIPPED SO IT IS VISIBLE AS AN ORDER: the CLASS decision, then the SHAPE
/// decision, then admission — and NEVER a coercion between them.** Every arm below CLASSIFIES the value it
/// was handed; not one of them converts it, defaults it or substitutes for it:
///   1. `null` and `undefined` are their own outside classes (`§1.2` rows 6–7);
///   2. the primitives are read by `typeof` — **the `string`, `boolean` and `bigint` classes are decided
///      BEFORE the numeric arm**, so `10n` is a `BigInt` and is NEVER carried through the number arm
///      (`JS-6`): `typeof 10n === 'bigint'`, and no `Number(...)` is spelled anywhere on this path;
///   3. `function` and `symbol` are their own outside classes (rows 8–9);
///   4. a `Proxy` is refused BEFORE any trap can run (`§1.4` item 4 (g), `DD-34`) — **`util.types.isProxy`
///      reads no member and invokes no handler, which is why a throwing trap cannot raise a host error out
///      of this frame** (`JS-1`: *"catch, then classify — never propagate the host error"*; there is
///      nothing to catch because nothing is invoked);
///   5. an ancestor is the cycle class (`§1.4` item 6);
///   6. **the ARRAY CLASS is decided before the array SHAPE**: a genuine array (any realm) is walked, and a
///      class extending `Array` is refused as `NonPlainCollection` (`JS-2` — `Array.isArray` does not
///      short-circuit `arrayClass`, which is what makes `class V extends Array {}` refused as a VALUE);
///   7. otherwise the plain-object test decides, and a prototype-carrying object is refused (§1.4 (f)).
///
/// The `JsValue` model of `crossing.md §1.2`, encoded member for member. **The walk reads each member ONCE
/// and carries its OWN ancestor stack — never a `WeakSet` of visited objects, which would refuse an
/// acyclic DIAMOND** (`§1.4` item 6, `DD-11`).
///
/// **THE DEPTH CEILING IS THE CORE'S DECLARATION AND THE ENCODER IS BOUNDED BESIDE IT** (`§1.4` item 5,
/// `DD-10`): the encoder's own nesting bound is `65` — one PAST the declared `64` — so the value the
/// declared ceiling refuses (`65`) is still encoded, handed to the core, and refused THERE with the store's
/// own `ValueNotAdmitted` and the store's own generated message (`§2.5` item 6 (d): *"for a failure the store
/// itself produces, `message` is the store's generated string verbatim"*), **while the arm `§1.4` item 5's
/// dated table assigns to THIS BOUNDARY — `66` and beyond, *"carrying the store's outside class
/// `Cyclic`"* — is refused HERE, verbosely, with the same code and no second rule.** `ENCODER_CEILING` is
/// therefore `65` and the arm's own site is the first `if` below.
///
/// **⟶ AMENDED 2026-10-23 (`A149`; `RCA-8(g)`): THE OPERATIVE ADMISSION CEILING IS THE STORE'S PERSISTENT
/// `126` — NOT THE CORE'S DECLARATION, AND NEITHER THE `64` NOR THE `65` THIS BLOCK PRINTS.** The block
/// above stands byte-for-byte and is read THROUGH this clause: its `64`/`65`/`66` figures are the retired
/// era's, and its sentence *"`ENCODER_CEILING` is therefore `65`"* is read as **`126`**. **WHAT IS OPERATIVE
/// FROM THIS DATE: depth `126` is the highest ADMITTED value ON BOTH ROUTES, because the root enters at
/// `0`; `127` and beyond is the depth class — refused HERE, at this walk, BEFORE ANY STORE VERB, as `a value
/// over the walk ceiling` with the status `ValueRefusedAtBoundary` and the refused value's own `127`-segment
/// position; and the crate's `128` remains the CRATE-SIDE CONVERSION's OWN bound (`bindings/js/src/
/// crossing.rs`'s `depth > 128`, untouched by this clause), never the crossing's admission bound.** **THE
/// GROUND, AS MEASURED (`A149`): depths `125`/`126` commit and reopen intact, while `127`/`128` were ADMITTED
/// and round-tripped IN MEMORY but their commit threw `FileCommitFailed`, the store file stayed `0` bytes and
/// a fresh boot answered `AddressNotFound` — cause `serde_json::from_str` at `src/json.rs:83` with its
/// recursion limit `128`, plus the register root, plus the commit's re-load of the image it wrote
/// (`src/store.rs:1283`–`:1292`) — so a value the file tier cannot commit is never admitted in the first
/// place.** **`NODE_CEILING` IS UNMOVED AT `1,000,000`** (`A149` (3)): the walk counts its root as its first
/// node, so the admitted node range is `0…999,999` and a dense `1,000,000`-element top-level array is
/// `1,000,001` nodes and is refused as the same class. **THE ARM'S OWN SITE IS STILL THE FIRST `if` BELOW,
/// and no other behaviour of this file moves.**
/// `[A2 docs/decisions.md · `A149`; docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23
/// clause | the operative ceiling and the refusal's place; A1 bindings/js/index.mjs | `ENCODER_CEILING`,
/// cited by symbol | numeric claim]`
///
/// **⟶ RECONCILED 2026-10-24 (`DEF-2026-10-24-A`; `RCA-8(g)`): THE CLAUSE ABOVE CARRIES A `2026-10-23` MARKER
/// FOR A `2026-10-24` LANDING, AND NOTHING ELSE OF IT MOVES.** The clause above stands byte-for-byte and is
/// read THROUGH this one: its `126` on both routes, its `127`-and-beyond refusal with the
/// `ValueRefusedAtBoundary` status, its node range `0…999,999` and every authority tag it carries are unmoved.
/// **THE DATE ALONE IS RECONCILED: the landing that clause records is `2026-10-24`, one day after its
/// marker** — the source edit `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` landed
/// `2026-10-24 19:09:06`, and the native addon the live battery drove was built `19:09:49` and restaged
/// `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`) — **and the marker stands as filed,
/// because `A149`, the `docs/next-steps.md` `N8` delta and the review record already cite it; re-pointing it
/// would break resolving citations rather than repair anything.** No behaviour byte of this file moved.
/// `[A2 docs/decisions.md · `A149`; docs/defects.md · `DEF-2026-10-24-A` | the marker's resolution of record;
/// A2 docs/specs/storeroom-json-crossing-live-report.md §11 | the landing's own timestamps | cross-reference]`
const ENCODER_CEILING = 126;
const NODE_CEILING = 1_000_000;

/// **THE WALK'S FIRST VALUE FAULT, RECORDED — AND THE CORE'S OWN MARKER FOR THAT ARM RETURNED.**
///
/// **WHY THE FAULT IS RECORDED AND NOT ANSWERED HERE, AND IT IS A DECLARED REASON RATHER THAN A
/// CONVENIENCE:** the crossing's own refusal ORDER is the STORE's (`DD-46`: *"the package passes every
/// argument position through as supplied and performs NO arity check of its own"*; `write-and-read.md §3.4`
/// `F-1`), so `write(instance, ['x'])` — the `tier` position ABSENT and the `value` position ABSENT with it —
/// answers the carrier row's own `AddressMalformed` and NOT the value's `ValueNotAdmitted`. **An answer
/// rendered at the walk before the carrier positions had been converted would REORDER two declared answers**,
/// and `JSG-05.7`/`JSG-10.2` drive exactly that state. The walk therefore CLASSIFIES, RECORDS the first fault
/// it meets and hands the core the marker the shipped encoder handed it; **`write` then renders the verbose
/// message from the record at the ONE site where the store answered `ValueNotAdmitted` for a value the walk
/// refused** (`§1.8`'s dated clause 1: the value-position refusal is *"PRODUCED AT THE WALK"*, and `CF-3`
/// clause 1 is its message's route). Nothing here coerces, and nothing here repairs.
///
/// **⟶ AND THE RECORD CARRIES THE ARM'S OWN PART ONE SUBJECT WHERE THE ARM DECLARES ONE —
/// `contract.md §2.1`'s clause of 2026-10-24, item `(2)` (`DEF-2026-10-24-D`).** `subject` is `null` at every
/// arm whose PART ONE is the failing target's own rendering — the walk then leaves the rendering to
/// `valueTargetSpelling` at answer time, exactly as it always did — and it is the ROW'S CLASS SPELLING at the
/// six arms item `(2)` re-derives in place (rows `5`, `11`, `13`, `14`, `15`, `16`), where **the refused value
/// is NOT rendered and no member, element join or empty spelling can reach the message** (item `(3)`). **The
/// TARGET the walk hands in `value` is unmoved at those six too** — the target and its rendering are two
/// different facts and only the second is withdrawn (item `(2)`).
function refusedValue(fault, value, failedClass, path, marker, subject = null) {
  if (fault.found === null) {
    fault.found = failedClass;
    fault.value = value;
    fault.path = path;
    fault.subject = subject;
  }
  return marker;
}

/// **ONE OF THE SIX ARMS WHOSE PART ONE SUBJECT IS THE ROW'S OWN CLASS SPELLING** — the same record as
/// `refusedValue` above with the row's class handed to it as the subject, so the arm states in one word that
/// it renders nothing (`contract.md §2.1`'s clause of 2026-10-24, items `(2)` and `(3)`). **THE CLASS AND THE
/// SUBJECT ARE THE SAME STRING AT THESE SIX, AND THAT IS THE DECLARED FORM** — e.g.
/// `'a sparse array' is not a value …, the value at the write's value argument is a sparse array`.
function refusedAsClass(fault, value, failedClass, path, marker) {
  return refusedValue(fault, value, failedClass, path, marker, failedClass);
}

/// **A CANONICAL ARRAY INDEX, AS `§2` ROW `17`'S PREDICATE SPELLS IT** — `String(i)` for an integer `i` with
/// `0 ≤ i ≤ length − 1`, and nothing else (`contract.md §2`'s clause of 2026-10-24 on `F-RA-5`, item `(3)`).
/// **THE `String(i) === key` HALF IS THE POINT AND NOT A FORMALITY**: `'01'`, `'1.0'`, `'1e0'`, `'-0'`, `' 1'`
/// and `'0x1'` all convert to a number INSIDE the range, and none of them is the canonical spelling of the
/// index it would otherwise be taken for — so the key's own spelling is compared with the index's. No member
/// is read, no user code runs, and `length` is the exotic array's own data property (the value is a genuine
/// array by the time this test is taken).
function isCanonicalArrayIndex(key, length) {
  const index = Number(key);
  if (!Number.isInteger(index) || index < 0 || index > length - 1) return false;
  return String(index) === key;
}

function encodeValue(value, ancestors, depth, path, fault) {
  // **THE WALK STOPS AT ITS FIRST FAULT** — the refusal is recorded once and the remaining members are not
  // read, so a refused tree costs the members already visited and no more.
  if (fault.found !== null) return { k: 'c' };
  // **THE NODE CEILING IS THE CRATE'S `1,000,000`, COUNTED ON THIS ONE WALK** (`contract.md §4`; `A148` Q6).
  // The crate's conversion counts the root as its first node; the `1,000,001`st node is row `8`'s class at
  // the root `value` position.
  // **⟶ AMENDED 2026-10-23 (THE GATE-3 PROOFREADING PASS, `role_proofreader`; `RCA-8(g)`): THE CITE ABOVE IS
  // RE-SPELLED, BECAUSE `A148` CARRIES NO `Q6`.** The comment above stands byte-for-byte and is read THROUGH
  // this clause; the ceiling and both counting conventions are unmoved. **`docs/decisions.md` · `A148` records
  // `Q1`–`Q5` and TWO follow-ups — there is no `Q6`** — so `A148` Q6 is read as the gate-1 record's own THIRD
  // `Follow-up` row: *"Crate `128` governs"* → *"Depth `128` and nodes `1,000,000`"*
  // (`docs/specs/storeroom-json-crossing-proposal-review.md §4`'s answers cell, `§4.1`, the last of its three
  // `Follow-up` rows). The same re-spelling is already carried at `contract.md §4` and
  // `parameter-semantics.md §4`; this site follows their form.
  // `[A2 docs/decisions.md · `A148` (its two follow-ups); docs/specs/storeroom-json-crossing-proposal-review.md
  // §4.1 — its third `Follow-up` row | cross-reference]`
  fault.nodes += 1;
  if (fault.nodes > NODE_CEILING) {
    return refusedValue(fault, 'a value over the walk ceiling', 'a value over the walk ceiling', [], { k: 'c' });
  }
  // **EVERY REFUSAL BELOW IS THE WALK'S OWN** (`§1.8`'s dated clause 1; `A76`: *"Test JS data for compliance
  // with permitted shape before admitting and do not attempt to fix. reject with verbose error to client"*):
  // the failing target's own spelling is PART ONE (the store's generator's bytes), the class that failed and
  // the position it holds are PART TWO, appended — and the status is the store's own `ValueNotAdmitted`
  // (`§1.2`'s outside rows 6–13). **NOTHING IS REPAIRED**: no member is dropped, no class is substituted, no
  // value is converted (`A76`'s second part; `§1.8`).
  // `§1.4` item 5's dated two-arm table: *"`66` and beyond REFUSED by the boundary's own encoder carrying the
  // store's outside class `Cyclic`"* — the encoder's bound is one PAST the declared `64`, so `65` is still
  // encoded and refused by the conversion core's own bound, whose message is the store's own (item 6 (d)).
  // **⟶ AMENDED 2026-10-23 (`A149`; `RCA-8(g)`): THIS NARRATION'S `64`/`65`/`66` TWO-ARM SPLIT IS THE
  // RETIRED ERA'S AND IS READ THROUGH THIS CLAUSE.** The three lines above stand byte-for-byte; their `64`
  // and `65` are read as the operative `126` and the `127` it refuses, and the arm that was "still encoded and
  // refused by the conversion core's own bound" no longer exists on this route. **WHAT IS OPERATIVE: depth
  // `126` is the highest admitted value ON BOTH ROUTES, so `127` and beyond is refused HERE, at the walk,
  // BEFORE ANY STORE VERB, as `a value over the walk ceiling` with the status `ValueRefusedAtBoundary` at the
  // refused value's own `127`-segment position; the crate's `128` is the CRATE-SIDE CONVERSION's bound ONLY
  // (`bindings/js/src/crossing.rs`'s `depth > 128`, untouched).** **THE GROUND, AS MEASURED (`A149`):
  // `125`/`126` commit and reopen; `127`/`128` threw `FileCommitFailed` with a `0`-byte store file and a
  // fresh boot answering `AddressNotFound`, from `serde_json::from_str` at `src/json.rs:83` (recursion limit
  // `128`), the register root and the commit's re-load of the image it wrote (`src/store.rs:1283`–`:1292`).**
  // The node ceiling above (`1,000,000`, root counted) is unmoved.
  // `[A2 docs/decisions.md · `A149`; docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23
  // clause; A1 bindings/js/src/crossing.rs | the conversion's own guard, cited by symbol | numeric claim]`
  // **⟶ RECONCILED 2026-10-24 (`DEF-2026-10-24-A`; `RCA-8(g)`): THIS CLAUSE'S `2026-10-23` MARKER DENOTES A
  // `2026-10-24` LANDING, AND NOTHING ELSE OF IT MOVES.** The clause above stands byte-for-byte and is read
  // THROUGH this one: its reading of the retired figures (`64` read `126`, `65` read `127`), its one-arm
  // re-derivation, the retired core-bound arm it closes and the unmoved node ceiling are all unmoved.
  // **THE DATE ALONE IS RECONCILED: the landing it records is `2026-10-24`, one day after its marker** — the
  // source edit landed `2026-10-24 19:09:06`, and the native addon the live battery drove was built `19:09:49`
  // and restaged `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`) — **and the marker stands
  // as filed, because `A149` and the review record already cite it; re-pointing it would break resolving
  // citations rather than repair anything.** No behaviour byte of this file moved.
  // `[A2 docs/decisions.md · `A149`; docs/defects.md · `DEF-2026-10-24-A` | the marker's resolution of record;
  // A2 docs/specs/storeroom-json-crossing-live-report.md §11 | the landing's own timestamps | cross-reference]`
  if (depth > ENCODER_CEILING) {
    return refusedValue(fault, value, 'a value over the walk ceiling', path, { k: 'c' });
  }
  if (value === null) return refusedValue(fault, value, 'null', path, { k: 'z' }); // `§1.2` row 6, any depth
  const kind = typeof value;
  if (kind === 'undefined') return refusedValue(fault, value, 'undefined', path, { k: 'u' }); // row 7
  if (kind === 'string') {
    // `§1.2` row 1's dated clause: a LONE SURROGATE is refused at the package's own walk — the class has no
    // Rust spelling at all — and it is never silently replaced, dropped or normalized.
    if (hasLoneSurrogate(value)) {
      return refusedValue(fault, value, 'a string carrying a lone surrogate', path, { k: 'c' });
    }
    return value;
  }
  if (kind === 'boolean') return value;
  // THE CLASS TEST PRECEDES THE NUMERIC ARM (`JS-6`): `bigint` is refused here, as its own outside class,
  // and is NEVER converted through the numeric arm (`Number(10n)` is the shipped `JS-6` substitution).
  if (kind === 'bigint') {
    // **⟶ AND THE SPELLING IS A SPEC CONVERSION ON THE PRIMITIVE, NOT `BigInt.prototype.toString`**
    // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, items `(1c)`, `(2b)`'s row `37` and `(10c)`): the
    // as-built `value.toString()` was a method taken off a MUTABLE PROTOTYPE, and the battery's row `(i)`
    // measures the answer it gave — a caller's `BigInt.prototype.toString` returned a marker that crossed as
    // the carrier's own value. `String(10n)` is `'10'` — the language's `ToString` for a BigInt appends NO
    // suffix — and the `'10n'` spelling the contract's row `6` subject carries is `valueTargetSpelling`'s own
    // `` `${value}n` `` substitution and a DIFFERENT BYTE from the conversion named here; the conversion reads
    // no member. No second figure and no second rendering is minted.
    return refusedValue(fault, value, 'a bigint', path, { k: 'g', v: String(value) });
  }
  if (kind === 'number') {
    if (!Number.isFinite(value)) {
      return refusedValue(fault, value, 'a non-finite number', path, { k: 'F', v: value }); // `§1.2` row 11
    }
    // `-0` DOES NOT CROSS AS A SIGN (`A140`; `contract.md §4`).
    return Object.is(value, -0) ? 0 : value;
  }
  if (kind === 'function') return refusedValue(fault, value, 'a function', path, { k: 'f' }); // row 8
  if (kind === 'symbol') return refusedValue(fault, value, 'a symbol', path, { k: 'y' }); // row 9
  // `§1.4` item 4 (g), `DD-34` — and NO trap is invoked: `util.types.isProxy` reads no member.
  if (types.isProxy(value)) return refusedValue(fault, value, 'a Proxy', path, { k: 'P' });
  // `§1.4` item 6: the ancestor stack, never a `WeakSet` — which is what ADMITS an acyclic diamond.
  // **⟶ AND THE STACK IS READ BY INDEX, NOT BY `Array.prototype.includes`** (`contract.md §2.1`'s clause of
  // 2026-10-24 on `F7-1`, items `(1c)(vi)`, `(2b)`'s rows `18` and `29`, and `(10b)`): the as-built membership
  // was a member of a mutable prototype, and the battery's row `(b)` measures both of its forgeries — an
  // `includes` answering `true` refused an ACYCLIC value at the root and one answering `false` missed the
  // CYCLE, so the walk re-entered the ancestor and the host stopped it. **THE MEMBERSHIP IS A LOCAL LOOP AND
  // THE STACK'S EXTENSION IS A LOCAL INDEX LOOP** — no method and no iterator of a mutable prototype decides
  // row `11`.
  let onAncestorPath = false;
  for (let i = 0; i < ancestors.length; i += 1) {
    if (ancestors[i] === value) {
      onAncestorPath = true;
      break;
    }
  }
  if (onAncestorPath) {
    // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `11`'s subject is its own CLASS SPELLING
    // — the repeated ancestor is NOT rendered (`DEF-2026-10-24-D`).
    return refusedAsClass(fault, value, 'a value that contains itself', path, { k: 'c' }); // `§1.2` row 12
  }
  const next = extendedPath(ancestors, value);
  if (Array.isArray(value)) {
    // **THE CLASS DECISION COMES FIRST, ON THE VALUE AS IT IS** (`A76`, `JS-2`): `Array.isArray` is TRUE
    // for a class extending `Array`, so it may not stand alone as the admission test. **A class extending
    // `Array` is refused under ITS OWN declared class — `§1.2` row 5's `ValueNotAdmitted`
    // (`NonPlainCollection`) — and NEVER through the array shape test.**
    if (arrayClass(value) === 'class') {
      // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `13`'s subject is its own CLASS SPELLING
      // — the instance is NOT rendered, so the empty subject this arm once answered is retired.
      return refusedAsClass(fault, value, 'a class extending Array', path, { k: 'P' });
    }
    for (let i = 0; i < value.length; i += 1) {
      // `§1.4` item 2: a hole refuses the WHOLE value (`DD-8`), and its class is the array's own hole arm.
      // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `16`'s subject is its own CLASS SPELLING
      // — the array is NOT rendered, so `'1,,3'` is retired.
      // **⟶ AND `contract.md §2`'s clause of 2026-10-24 on `F-RA-11` RE-DERIVES THE HOLE ITSELF: A HOLE IS AN
      // INDEX BELOW `length` WITH NO **OWN** PROPERTY** (its item `(1)`), so the test is `Object.hasOwn` and
      // NOT `in`. `in` is `[[HasProperty]]`, which walks the prototype chain, so
      // `Array.prototype[0] = 'x'; const a = new Array(2); a[1] = 'y'` passed this scan and the crossing
      // admitted `['x', 'y']` — **an element REPLACED at the boundary, one the caller's array never owned** —
      // while an inherited ACCESSOR at an index was then READ by the element loop's `[[Get]]`, running caller
      // code on an admission path (its items `(3)`, `(4)` and `(5)`). **`Object.hasOwn` and never
      // `Object.prototype.hasOwnProperty`, which is a method taken from a mutable prototype** (item `(6)`,
      // the file's own idiom at `:2144` · `:2179` · `:2261` and the rule stated at `:2240`). **A
      // prototype-carried index is therefore never read** — the element loop below reaches only indices this
      // scan has proved OWN — and an OWN accessor at an index is refused as row `15` three lines below.
      if (!Object.hasOwn(value, i)) return refusedAsClass(fault, value, 'a sparse array', path, { k: 'H' });
    }
    const refusal = accessorOrSymbolArm(value);
    // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: rows `5`/`15`'s subject is the CLASS SPELLING —
    // the containing ARRAY is NOT rendered, so the empty subject an empty array answered is retired.
    if (refusal !== null) return refusedAsClass(fault, value, shapeArmClass(refusal), path, refusal);
    // **⟶ ROW `17` — `an array carrying a non-index own member` — IS DECIDED HERE AND NOWHERE ELSE**
    // (`contract.md §2`'s clause of 2026-10-24 on the gate-11 finding `F-RA-5`, items `(3)`, `(5)`, `(6)` and
    // `(8)`). The as-built walk read an array BY INDEX ALONE, so `const a = [1]; a.foo = 3` crossed as `[1]`
    // and **the member was DROPPED SILENTLY** — the one answer `§2`'s own ground (*"None is coerced, repaired,
    // dropped, or replaced"*) forbids, and the answer rows `15` and `5` had already refused twice for a member
    // with no JSON spelling. **THE PREDICATE IS ITEM `(3)`'S, EXACTLY: every string in `Object.keys(value)` is
    // a canonical index in `0…length − 1`** — own ENUMERABLE string keys only, so `length` itself (an own
    // non-enumerable data member) is not a member of this test and an own NON-ENUMERABLE member other than it
    // is outside the tree by the rule that puts an object's non-enumerable members outside it, while an
    // element whose own index property happens to be non-enumerable is still carried, because the element walk
    // below reads by INDEX. **THE POSITION IS THE ARRAY'S OWN** (item `(5)`) and **THE SUBJECT IS THE ROW'S
    // CLASS SPELLING**, so the message names the class twice and the extra member is never reached.
    // **THE ORDER IS ITEM `(6)`'S**: row `13` above, then row `16`, then rows `15`/`5`, then THIS ROW, then
    // the element walk — so a subclass, a sparse array and a Symbol-carrying array each keep answering their
    // own row, and a refused element costs no visit because this test precedes the loop. **AND A
    // `Proxy`-SHAPED PROTOTYPE IS NO LONGER PART OF THAT LIST**, because `contract.md §2`'s clause of
    // 2026-10-24 on `F-RA-12` item `(4)` declares this comment's old half false for a LYING trap: a `Proxy`
    // prototype link is answered as `'class'` with no trap run, so such a value answers row `13` above and
    // never reaches here. **THE MEMBER IS NEVER CARRIED**: the row refuses its PRESENCE, not its value
    // (item `(3)`'s last sentence).
    // **⟶ AND THE KEY CENSUS IS CONSUMED BY INDEX, NOT THROUGH THE ITERATION PROTOCOL** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(2b)`'s row `17` and `(10b)`: *"`Object.keys`'s
    // iteration is row `17`'s **only** gate"*) — `Object.keys`'s CALL is lawful and its result's `for … of` is
    // not, so a caller's forged iterator decided whether row `17` saw the non-index member at all.
    const indexKeys = Object.keys(value);
    for (let at = 0; at < indexKeys.length; at += 1) {
      if (!isCanonicalArrayIndex(indexKeys[at], value.length)) {
        return refusedAsClass(fault, value, 'an array carrying a non-index own member', path, { k: 'c' });
      }
    }
    const members = [];
    for (let i = 0; i < value.length; i += 1) {
      // **AN ARRAY MEMBER'S INDEX IS A DECLARED POSITION** (`§2.5` item 6 (b): *"the MEMBER POSITION for a
      // member inside a value the walk reached"*), and it is carried BARE, as item 6 (a) spells an integer
      // segment. Every index is present and is a data property by the two rules above, so the read below is
      // the read `for … of` performed.
      members[members.length] = encodeValue(value[i], next, depth + 1, extendedPath(path, i), fault);
      if (fault.found !== null) break;
    }
    return members;
  }
  const proto = protoClass(value);
  // `§1.4` item 4 (f): a prototype-carrying object is REFUSED — never read through its chain (`JS-5`).
  // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `14`'s subject is its own CLASS SPELLING —
  // the value is NOT rendered and its class's own `toString` is not reached.
  if (proto === 'class') return refusedAsClass(fault, value, classSpelling(value), path, { k: 'P' });
  // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: rows `5`/`15`'s subject is the CLASS SPELLING —
  // the containing OBJECT is NOT rendered, so `'[object Object]'` is retired.
  const refusal = accessorOrSymbolArm(value);
  if (refusal !== null) return refusedAsClass(fault, value, shapeArmClass(refusal), path, refusal);
  const members = [];
  // **⟶ AND OBJECT KEYS' ITERATION IS A LOCAL INDEX LOOP** (`contract.md §2.1`'s clause of 2026-10-24 on
  // `F7-1`, items `(1c)(ii)` and `(2b)`'s row `17`): `Object.keys` is an `Object` static and lawful; consuming
  // its result with `for … of` is `Array.prototype[Symbol.iterator]` and is not.
  const memberNames = Object.keys(value);
  for (let at = 0; at < memberNames.length; at += 1) {
    const name = memberNames[at];
    // `§1.2` row 7 / `§1.4` item 3: an `{a: undefined}` member is SEEN and REFUSED, and **the key is NEVER
    // dropped** — the member is walked, its own position is carried, and the walk records the fault THERE.
    // **THE READ IS AN OWN-PROPERTY READ** (`A76`, `JS-5`): `Object.keys` yields the OWN enumerable string
    // keys — the keys the walk takes, `§1.4` item 4 (b) — and the member read is that key's own value.
    //
    // **⟶ AND THE LONE SURROGATE IS APPLIED AT THIS KEY POSITION TOO — `C-4`, THE MEMBER-KEY HALF
    // (2026-10-11).** A KEY of a walked value is a JS `string` exactly as a value is, so `§1.2` row 1's
    // dated clause reaches it: the class has no Rust spelling, **and the facade's string path ended in
    // `String::from_utf8_lossy`, so a key holding `\uD800` was silently REPAIRED to U+FFFD on the way in —
    // a member KEY silently renamed under a write the caller spelled at another name.** The class is
    // refused here as the VALUE position refuses it, and the KEY IS STILL NEVER DROPPED: the whole value is
    // refused, verbosely, at the member's own position (`§1.4` item 3's own answer to a dropped member).
    if (hasLoneSurrogate(name)) {
      // **THE TARGET IS THE MEMBER POSITION'S OWN NAME AND NOT THE KEY**, for the reason `encodeSegment`
      // carries at the same class: the unpaired code unit has no `String` spelling and the only alternative
      // is a REPAIR of it, which `§1.8` forbids — so the failing target is named by the VALUE argument the
      // member was reached under, and the member's own POSITION (the key path, whose spelling
      // `valuePosition` takes from the same key) carries the rest.
      return refusedValue(fault, VALUE_ARGUMENT_POSITION, 'a string carrying a lone surrogate', extendedPath(path, name), { k: 'c' });
    }
    members[members.length] = [name, encodeValue(value[name], next, depth + 1, extendedPath(path, name), fault)];
    if (fault.found !== null) break;
  }
  // **THE BARE PLAIN OBJECT** (`contract.md §3`, `§5`; `A148` Q4): the members are data and the shape is
  // the object's own, so no `k`, no `m`, no `p`, no `acc` and no `proxy` is carried.
  // **⟶ AND THE MEMBERS ARE DEFINED OWN DATA PROPERTIES BY A LOCAL LOOP, NOT BY `Object.fromEntries`**
  // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, items `(1c)(ii)` and `(2b)`'s row `20`): the CALL is
  // lawful and its ARGUMENT'S ITERATION is not — `fromEntries` consumed the members through
  // `Array.prototype[Symbol.iterator]`, so a forged iterator could drop or reorder a crossed member. **The
  // defined form is the one `Object.fromEntries` took all along** — an own data property per member, per the
  // gate-4 `ADV-12` rule that a member genuinely named `__proto__` must stay a member and not become the
  // returned object's prototype (`Object.defineProperty` defines; `[[Set]]` would not).
  const plain = {};
  for (let at = 0; at < members.length; at += 1) {
    Object.defineProperty(plain, members[at][0], {
      value: members[at][1],
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
  return plain;
}

/// `crossing.md §1.3`'s `Segment`: a string or a non-negative integer is admitted, and EVERY outside class
/// is carried as its own variant so the STORE produces the code (`DD-1`) — the package mints none.
///
/// **`A76` AT THIS SITE: THE CLASS IS DECIDED FIRST AND NOTHING IS RESHAPED.** The declared rows (a
/// `null`, an `undefined`, a boolean, an object, a nested array, a function) are carried as their own
/// variants, so the store generates its own `AddressMalformed` at the failing target's address. **A
/// `symbol` and a `bigint` have NO carrier row at all** — and folding either into the `object` marker would
/// report a class that is not the one the caller spelled — so those two are REFUSED AT THE BOUNDARY,
/// verbosely, naming the class and the POSITION the segment holds. **`JS-1`'s demand is met by
/// CONSTRUCTION, not by a `catch`: no `String(segment)`/`Number(segment)` is spelled here, so no `valueOf`,
/// no `Symbol.toPrimitive` and no trap is ever invoked, and the class is read with `typeof` alone.**
///
/// **⟶ AND TWO MORE CLASSES ARE DECIDED AT THIS POSITION, ADDED 2026-10-11 BY THIS HOST-FIX PASS — `C-4`
/// AND `C-12` OF THE GATE-4 ADVERSARIAL PASS:**
/// * **THE LONE SURROGATE (`C-4`).** `crossing.md §1.2` row 1's dated clause and `§1.4` item 9 make the class
///   BOUNDARY-ONLY and refuse it *"AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED"*, *"never silently
///   replaced, never silently dropped and never normalized into a replacement character"* — **and the class
///   is a property of a JS `string`, which a SEGMENT is.** The as-built walk never called
///   `hasLoneSurrogate` here, so `on(['\uD800'], f)` was admitted, `facade.rs`'s string path repaired the
///   code unit to U+FFFD on the way in, and **a listener fired at an address the caller never spelled.**
///   **THE CLASS IS NOW APPLIED HERE EXACTLY AS THE VALUE POSITION APPLIES IT**, with the answer the same
///   dated clause declares.
/// * **AN INTEGRAL SEGMENT ABOVE THE CARRIER'S OWN RANGE (`C-12`).** `AddressArg` row 3 admits *"a `number`
///   that is integral, `>= 0` and exact as an `f64`"* — and the carrier that row's own spelling reaches is
///   `JsSegment::Index(u64)` (`package.md §4.5` item 2's `JsSegment` row; `crossing.rs`'s
///   `JsSegment::Index(i) => Segment::Index(*i)`), **so a JS `number` above `u64::MAX` has NO EXACT SPELLING
///   IN THE CARRIER AT ALL.** The facade read it with `n as u64`, a SATURATING cast in Rust: `2**64` and
///   `1e30` both arrived as `u64::MAX`, so **two distinct admissible addresses became ONE store address and
///   shared one handle.** **THE RANGE IS CHECKED BEFORE THE CAST AND THE OUT-OF-RANGE INTEGRAL SEGMENT IS
///   REFUSED `AddressMalformed` — `AddressArg` row 8's own code for a number outside the segment domain,
///   carried and never minted (`DD-40`) — because a silent saturation is a repair (`A76`: *"do not attempt
///   to fix"*; `§1.8`). `Number.MAX_SAFE_INTEGER` is the boundary carried here: it is the largest integral
///   `number` a JS consumer can hold and compare EXACTLY, and every `number` at or below it is exact in the
///   carrier's `u64` as well.**
function encodeSegment(segment, position, argumentPosition) {
  const kind = typeof segment;
  if (kind === 'string') {
    // `§1.2` row 1's dated clause at the SEGMENT position (`C-4`): the class is refused at the package's
    // own walk and never repaired on the way in.
    if (hasLoneSurrogate(segment)) {
      boundaryReject(
        'ValueNotAdmitted', // row 1's dated clause's own answer, carried and never minted (`DD-40`)
        // **THE TARGET IS THE POSITION'S OWN NAME, NOT THE STRING, FOR THE REASON THIS CLASS EXISTS**: the
        // unpaired code unit cannot cross into the generator's own message either — it has no `String`
        // spelling, and the only alternative is a REPAIR of it, which `§1.8` forbids — so the failing TARGET
        // is named `'address'` (as this file already names it for the other class refused at this position)
        // and the failing segment is named by its INDEX and the ARGUMENT POSITION beside it. **The class is
        // what item 5 (b) makes mandatory; the value that failed is the one datum no clause requires here.**
        'address',
        argumentPosition === undefined
          ? `the address holds a string carrying a lone surrogate at position ${position}, and a segment is a string or a non-negative integer`
          : `the address holds a string carrying a lone surrogate at position ${position} of the ${argumentPosition}, and a segment is a string or a non-negative integer`,
      );
    }
    return segment;
  }
  if (kind === 'number') {
    // `C-12`: the class decision then the RANGE, both before the carrier's cast and never by it.
    if (Number.isInteger(segment) && segment >= 0 && !Number.isSafeInteger(segment)) {
      boundaryReject(
        'AddressMalformed', // `AddressArg` row 8's own declared code, carried and never minted (`DD-40`)
        'address',
        argumentPosition === undefined
          ? `the address holds an integral segment ${segment} at position ${position} above the carrier's own range, and a segment is a string or a non-negative integer a \`u64\` can carry exactly`
          : `the address holds an integral segment ${segment} at position ${position} of the ${argumentPosition} above the carrier's own range, and a segment is a string or a non-negative integer a \`u64\` can carry exactly`,
      );
    }
    return segment;
  }
  if (kind === 'boolean') return segment;
  if (segment === null) return { bad: 'null' };
  if (kind === 'undefined') return { bad: 'undefined' };
  if (kind === 'function') return { bad: 'function' };
  if (kind === 'symbol' || kind === 'bigint') {
    // **THE ARGUMENT POSITION IS APPENDED WHERE THE CALLING SITE DECLARES ONE** (`surface.md §2.5` item 5
    // (b): *"the ARGUMENT POSITION for a verb's arguments"* — `parameter-semantics.md §2.17`'s dated clause,
    // position `1` of `2` at `on`). **WHERE NO SITE IS PASSED, NOTHING MOVES**: the clause this arm already
    // stood on, byte-for-byte, is its default, and no verb but `on` declares a position here.
    boundaryReject(
      'AddressMalformed', // `AddressArg` rows 7–10's own declared code, carried and never minted
      'address',
      argumentPosition === undefined
        ? `the address holds ${classSpelling(segment)} at position ${position}, and a segment is a string or a non-negative integer`
        : `the address holds ${classSpelling(segment)} at position ${position} of the ${argumentPosition}, and a segment is a string or a non-negative integer`,
    );
  }
  if (Array.isArray(segment)) return { bad: 'array' };
  return { bad: 'object' };
}

/// **A SEGMENT'S OWN CLASS OUTSIDE `PAR-JS-5`'s DOMAIN, DECIDED AT THE PACKAGE'S OWN BOUNDARY AND REFUSED
/// `AddressMalformed` — THE OUTSIDE-VALUE CLASSIFICATION, TAKEN **BEFORE** THE STORE IS REACHED AND SO
/// BEFORE ANY ABSENT-KEY LOOKUP** (`parameter-semantics.md §2.5` line `357`: *"**The declared answer for EACH
/// outside value** — **`AddressMalformed` for every one of them, with the store's generated message**"*,
/// the fourteen carrier-variant rows `crossing.md §1.3` names — *"an array holding a negative integer · an
/// array holding a non-integer number · an array holding `null`/`undefined`/a boolean/an object/a nested
/// array/a function"*).
///
/// **WHY THE DECISION STANDS HERE AND NOT AT THE STORE: a well-formed address no node holds is the store's
/// own `AddressNotFound` (`a127-surface.test.mjs`'s F1 arm asserts that code at the ABSENT position), while
/// a node HELD and a segment outside the domain must answer `AddressMalformed` — so the CLASS must be
/// decided before the lookup rather than after it. The store's own walk decides it at `write` · `delete` ·
/// `listen` (`src/args.rs`, `src/store.rs`); at the READER the carrier reaches the walk FIRST, which returns
/// `AddressNotFound` for a held key. **The class is decided ONCE, at `encodeAddress`, for every verb alike**,
/// so no verb's address position can answer a lookup's code for a class the row refuses.
///
/// **THE MESSAGE IS THE STORE'S GENERATED ONE AND NEVER AN AUTHORED ONE** (`boundaryReject` reaches the
/// addon's `errorMessage`, `docs/specs/storeroom-js/surface.md §2.5` item 2): the SUBJECT is the failing segment's own spelling as the store's
/// generator renders it (`src/value.rs`'s `Segment::spelling`), and *"the integer `-1`"*, *"a shapeless
/// value"*, *"a boolean"*, *"an array"* and *"a Proxy"* are that rendering carried here, not invented.
/// **NOTHING IS COERCED** (`A76`/`JS-1`): the class is read with `typeof`, `Number.isInteger` and
/// `Array.isArray` alone — no `String(segment)`, no `Number(segment)`, no `valueOf` and no trap — so a
/// segment that is a `Proxy` is refused by `util.types.isProxy` and NO TRAP RUNS (`surface.md §2.4` item 7
/// (a) item 1; `crossing.md §1.4` item 4; `C-1`).
/// **THE CONTAINER IS NOW A PREFIX ARGUMENT AND NOT A SPELLED STRING, 2026-10-17** (`§2.5` item 5 (a)–(b)):
/// the segments the failing one stood in are handed to `boundaryReject`, which passes the store's own
/// `dotted_address` spelling of them into the generator's `<container>` slot, so **the container is stated
/// ONCE and by the store's generator** — and PART TWO carries the reason's class-and-position half ALONE,
/// which is the half `§2.5` item 5 (b) declares the boundary's own (*"the ARGUMENT POSITION … is carried
/// INSIDE the generated message's own text"*) and is never a second container claim.
function refuseOutsideSegment(segment, position, prefix, addressArgumentPosition) {
  const kind = typeof segment;
  let subject;
  if (segment === null) subject = 'a shapeless value';
  else if (kind === 'undefined') subject = 'an absent value';
  else if (kind === 'boolean') subject = 'a boolean';
  else if (kind === 'number') subject = Number.isInteger(segment) ? `the integer ${segment}` : `the number ${segment}`;
  else if (kind === 'function') subject = 'a function';
  else if (kind === 'symbol' || kind === 'bigint') subject = classSpelling(segment);
  else if (Array.isArray(segment)) subject = 'an array';
  else subject = 'an object'; // a `Proxy` over an array included: its class is `an object` to the carrier
  boundaryReject(
    'AddressMalformed', // `PAR-JS-5`'s own declared answer for every one of the fourteen rows, carried (`DD-40`)
    subject,
    addressArgumentPosition === undefined
      ? `the address holds ${subject} at position ${position}, and a segment is a string or a non-negative integer`
      : `the address holds ${subject} at position ${position} of the ${addressArgumentPosition}, and a segment is a string or a non-negative integer`,
    prefix,
  );
  return { bad: 'object' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// **`AddressArg` ROWS 5–6'S OUTSIDE SHAPE, DECIDED ON THE VALUE AS IT IS AND BEFORE ANY READ** (`A76`'s
/// class-first order; `C-1`): everything that is neither an `Array` nor a `Proxy` is rows 5–6's outside
/// value at the ADDRESS position — **and a `Proxy` is NOT this arm**: its own refusal stands above, where the
/// class decision is taken on `util.types.isProxy` before any `.length` read and before any element
/// (`surface.md §2.4` item 7 (a) item 1; `crossing.md` `AddressArg` row 12; `DD-34`), so no trap is run by
/// THIS predicate either.
function isOutsideAddressValue(value) {
  if (value === undefined || value === null) return true; // row 5's two named classes, on the value as it is
  if (types.isProxy(value)) return false; // row 12's own arm, decided above, with no trap run
  if (Array.isArray(value)) return false; // rows 1–3, 13, 14 — the ordinary array arm and its own tests
  return true; // rows 5–6: a string, a number, a boolean, an object, a function, a symbol, a bigint
}

/// **THE VALUE-SHAPE ARM OF `AddressArg` ROWS 5–6 — A NON-ARRAY OUTSIDE VALUE AT AN ADDRESS POSITION,
/// REFUSED AT THE BOUNDARY WITH ITS OWN RENDERING AND THE ARGUMENT POSITION IT STANDS AT** (`surface.md`
/// §2.5 item 5 (a)–(b); the `CF-3` authority split).
///
/// **THE DEFECT IT CLOSES, NAMED AS THE SUPERVISOR'S OWN RECORD NAMES IT** (`archive/reviews/
/// 2026-10-16-constraints-publication-gate1.md` §57, finding `2`): at EVERY address position — `listen`,
/// `read`, `write`, `delete`, `readLiteral` — a NON-ARRAY outside value (`'a.b'`, `7`, `null`, `undefined`)
/// answered the store's GENERIC line *"the address argument is not a legal address segment in `''` …"*,
/// **carrying the class half and NEITHER the failing TARGET NOR the argument POSITION** — while `§2.5` item 5
/// (a) makes the failing target mandatory and item 5 (b) makes the ARGUMENT POSITION mandatory where the
/// contract declares one (and a verb's argument position is the one place it does). **IT WAS HIDDEN UNTIL
/// NOW because the older `register` subject carried both at a HANDLE position — a VALUE position, where a
/// non-segment value is printed as its own value — and once the subject moved to an ADDRESS position the gap
/// became visible.**
///
/// **WHAT IS DECLARED, AND WHAT THIS SITE THEREFORE DOES:**
///   * **THE TARGET IS THE VALUE'S OWN RENDERING** (item 5 (a): *"a non-segment value PRINTED AS ITS OWN
///     VALUE … where the failure is about a value and not about a segment"*), in the spelling the store's own
///     generator and this package already give that value at every other site: `the number 7` · `the string
///     'a.b'` · `null` · `undefined` — **and a class whose own value cannot be printed (a `bool` · a
///     `function` · an `object` · a `Proxy`) is rendered by the store's own class spelling for it**, exactly
///     as `refuseOutsideSegment` renders the same classes at a SEGMENT position.
///   * **THE POSITION IS THE ARGUMENT POSITION** the verb's own signature declares (item 5 (b): *"the
///     ARGUMENT POSITION for a verb's arguments"*) — `first argument` at all five verbs, whose `address` is
///     the first position of each (`surface.md` §2.4 item 9 (f)'s table).
///   * **AND THE CONTAINER IS THE ARGUMENT ITSELF AND NEVER THE EMPTY REGISTER.** **THE ONE DECISION THE
///     CLAUSE DOES NOT PIN, STATED RATHER THAN GUESSED:** the store's `AddressMalformed` template always
///     prints a container (`src/error.rs`, *"… in '{container}', …"*), and the store's own trigger for this
///     state supplies the empty string (`malformed_address_argument`, whose rendering *"… in '', …"* names
///     THE REGISTER). **THAT CONTAINER IS FALSE HERE** — a whole-address SHAPE failure is found in no
///     container at all, the address argument never having resolved against the register — so the truthfully
///     filled slot is the failing ARGUMENT's own name, `address`, which is the same reading the store's own
///     `ConstraintListInvalid` row takes where the container is a KEY and not an address (`'constraints'`;
///     `docs/specs/storeroom-native/contract.md` §8.2's row and its `<CONTAINERSEGMENT>` degenerate arm).
///     **NO CLAUSE FIXES THIS WORDING: the clause fixes the TARGET, the CLASS and the POSITION, and the
///     container is this site's own truth claim.** **PART TWO then carries the reason's class half and the
///     position, appended after a separator, exactly as `boundaryReject` appends it at every other site.**
function refuseOutsideAddressValue(address, addressArgumentPosition) {
  const kind = typeof address;
  let subject;
  if (address === null) subject = 'null';
  else if (kind === 'undefined') subject = 'undefined';
  else if (kind === 'number') subject = `the number ${address}`;
  else if (kind === 'string') subject = `the string '${address}'`;
  else if (kind === 'boolean') subject = 'a boolean';
  else if (kind === 'function') subject = 'a function';
  else if (kind === 'symbol' || kind === 'bigint') subject = classSpelling(address);
  else subject = 'an object'; // a `Proxy` over a plain object included: its class is `an object` to the carrier
  // **THE CONTAINER SLOT CARRIES THE ARGUMENT'S OWN NAME AND NOT `''`** — see this site's own clause above.
  boundaryReject(
    'AddressMalformed', // `AddressArg` rows 5–6's own declared code, carried and never minted (`DD-40`)
    subject,
    `the address position holds ${subject} at the ${addressArgumentPosition}, and an address is an array of segments`,
    ['address'],
  );
  return { k: 'A' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// `crossing.md §1.3`'s `AddressArg` table, rows 1–14.
///
/// **⟶ AND ONE OPTIONAL PARAMETER, ADDED 2026-10-11 BY THE `Q3` PASS, SO `on` CAN OBEY `A81` WITHOUT A
/// SECOND REFUSAL FORM AND WITHOUT A SECOND ENCODER.** `addressArgumentPosition` is the ARGUMENT POSITION
/// `parameter-semantics.md §2.17`'s dated clause declares at a site that declares one — `on`'s `address` is
/// `1` of `2` — and it is threaded into the SEGMENT arm alone, which is the one arm of this table that
/// refuses at the BOUNDARY rather than carrying its class to the store. **EVERY OTHER CALLER PASSES
/// NOTHING AND EVERY BYTE OF EVERY OTHER ARM IS UNMOVED**, so no verb's answer and no other site's message
/// changes: the parameter is additive and its absence is the as-filed reading.
///
/// **⟶ AND FROM 2026-10-17 A SECOND, SEPARATE POSITION PARAMETER GOVERNS `AddressArg` ROWS 5–6**
/// (`§2.5` item 5 (a)–(b); see `refuseOutsideAddressValue` above): a NON-ARRAY outside value — a supplied
/// `undefined`, a `null`, a string, a number, a boolean, an object, a function — is refused at the boundary
/// at EVERY verb that declares an argument position, verbosely, carrying its own rendering and that position.
///
/// **WHY IT IS A SEPARATE PARAMETER AND NOT THE SAME ONE, STATED SO THE BLAST RADIUS IS EXACTLY ONE ARM:**
/// `addressArgumentPosition` is the SEGMENT arm's (`rows 7–10`, and the `Proxy` and out-of-range arms) and it
/// is passed by `listen` ALONE, so the segment arm's bytes at the other four verbs are UNMOVED — **THE
/// INSTRUCTION IS THAT NO MESSAGE ALREADY CORRECT MOVES, and the supervisor's defect is the NON-ARRAY arm
/// only.** `addressValuePosition` reaches the arms THIS PASS REPAIRS, and nothing else.
/// **WHERE NO VALUE POSITION IS PASSED — the construction's `listeners[]` walk, which calls this encoder with
/// one argument — EVERY BYTE IS UNMOVED and the store answers the construction itself** (`PAR-JS-21`; the
/// construction's own answer is the store's, and no argument position is declared at that site).
function encodeAddress(address, addressArgumentPosition, addressValuePosition) {
  // `crossing.md §1.3`'s absent-versus-`undefined` rule, rule 1: an argument position the call supplied no
  // value for is ABSENT, and `undefined` at a supplied position folds to that SAME state. `AddressArg` rows
  // 4 and 5 answer the one code, so no declared answer moves by the fold.
  //
  // **⟶ AND AT A SITE THAT DECLARES AN ARGUMENT POSITION, ROWS 5 AND 6 ARE ANSWERED HERE AND VERBOSELY**
  // (`§2.5` item 5 (a)–(b); `refuseOutsideAddressValue`): a supplied `undefined`, a `null` and every
  // non-array carry their OWN RENDERING and the POSITION instead of the store's generic argument-shaped line.
  // **THE ARITY-ABSENT CALL IS NOT THIS ARM AND CHANGES NOTHING**: `undefined` reaches this encoder only
  // from a call that SUPPLIED it (every caller passes `[encodeAddress(address)]` under its own `n >= 1`
  // test), while the NO-ARGUMENT call reaches the store as its own carrier and answers there — which is
  // `CF-3`'s part 5 unmoved (*"an absent CARRIER argument … crosses to the store as its own carrier value"*).
  if (addressValuePosition !== undefined && isOutsideAddressValue(address)) {
    refuseOutsideAddressValue(address, addressValuePosition);
  }
  if (address === undefined) return { k: 'A' };
  if (address === null) return { k: 'N' };
  // **`A76`/`JS-2`: THE CLASS DECISION COMES FIRST HERE TOO, ON THE ADDRESS AS IT IS — AND THE `Proxy`
  // REFUSAL IS PART OF THAT DECISION AND NOT BESIDE IT** (`surface.md §2.4` item 7 (a) item 1: *"the `Proxy`
  // refusal is part of that decision, not beside it … BEFORE the shape test, BEFORE `Array.isArray`, BEFORE
  // any `.length` read and BEFORE any element is read"*). **`util.types.isProxy` READS NO MEMBER AND
  // INVOKES NO HANDLER**, which is what makes the class decidable with NO TRAP RUN at both proxies-over-array
  // and proxies-over-object (`crossing.md §1.4` item 4; `DD-34`; `C-1`). **AND `§2.5` item 5 (b) MAKES THE
  // CLASS HALF MANDATORY**: the refusal's message carries `a Proxy` and the POSITION, so the class the value
  // HAS is named rather than the store's own generic object arm; a class extending `Array` — for which
  // `Array.isArray` is TRUE — is refused under its own declared class (`AddressArg` row 11's
  // `AddressMalformed`: *"the shape is not an array"*) rather than ADMITTED because a language predicate made
  // it look like one.
  if (types.isProxy(address)) {
    boundaryReject(
      'AddressMalformed', // row 12's own declared code (`DD-34`), carried and never minted (`DD-40`)
      classSpelling(address), // the class half, mandatory under item 5 (b): `a Proxy`
      addressArgumentPosition === undefined
        ? 'the address position holds a Proxy, and a Proxy over an array is refused as AddressArg row 12\'s own class with no trap run'
        : `the address position of the ${addressArgumentPosition} holds a Proxy, and a Proxy over an array is refused as AddressArg row 12's own class with no trap run`,
    );
  }
  if (Array.isArray(address)) {
    if (arrayClass(address) === 'class') return { k: 'C' }; // row 11: a class extending `Array`
    for (let i = 0; i < address.length; i += 1) {
      if (!(i in address)) return { k: 'S' }; // row 14 (`DD-8`)
    }
    const segments = [];
    for (let i = 0; i < address.length; i += 1) {
      const segment = address[i];
      const encoded = encodeSegment(segment, i, addressArgumentPosition);
      // **`PAR-JS-5`: THE FOURTEEN ROWS' CLASS IS DECIDED HERE, BEFORE THE STORE AND BEFORE ANY LOOKUP**
      // — a `{bad: …}` marker, a negative or non-integer number, a boolean, or a `Proxy` over an array.
      const outsideMarker = encoded !== null && typeof encoded === 'object' && typeof encoded.bad === 'string';
      const outsideNumber = typeof segment === 'number' && !(Number.isInteger(segment) && segment >= 0);
      if (outsideMarker || typeof segment === 'boolean' || outsideNumber) {
        // **AND THE PREFIX IS THE SEGMENTS THIS ONE STOOD IN AND NOTHING ELSE** — the container the
        // store's own `malformed_segment` names at its `L-1` arm (the store's walk pushes each in-domain
        // segment into its own container before it tests the next), so the refusal's container is the
        // SAME datum at both layers and not a second spelling of it.
        refuseOutsideSegment(segment, i, address.slice(0, i), addressArgumentPosition);
      }
      // **⟶ AND THE CARRIER'S SEGMENT LIST IS EXTENDED BY INDEX TOO** (`contract.md §2.1`'s clause of
      // 2026-10-24 on `F7-1`, item `(1b)`, and the battery's row `(g)`): the as-built `segments.push` was
      // `Array.prototype.push` taken off a MUTABLE PROTOTYPE on the ADMISSION path, so a caller's no-op `push`
      // emptied this list and the whole write crossed to the REGISTER instead of the address the caller
      // spelled — an admitted drive whose crossed member moved. The list, its order and the shape it is
      // handed in are unmoved.
      segments[segments.length] = encoded;
    }
    return { k: 'L', s: segments }; // rows 1–3, 13
  }
  if (typeof address === 'object') return { k: 'C' }; // rows 6 and 11: the shape is not an array's
  return { k: 'D', o: encodeSegment(address, 0) }; // row 6: a non-array's five named classes
}

/// `crossing.md §1.3`'s `TierArg` table and `TierSetItem` table.
///
/// **A SUPPLIED `undefined` IS PRESENT AT THIS POSITION AND `delete`'s TIER IS REACHED AS A VALUE — THE ONE
/// CALL THAT FOLDS TO THE ABSENT ROW IS THE CALL THAT SUPPLIED NOTHING THERE.** **⟶ ADJUDICATED 2026-10-16,
/// AND THIS CLAUSE IS THE OPERATIVE READING OF THE BYTES BELOW** (`parameter-semantics.md §2.6`'s
/// `PAR-JS-6` row, its `the declared answer for EACH outside value` cell as reconciled the same date, whose
/// words are *"`a.read(address, undefined)` IS A SUPPLIED VALUE AT THIS POSITION AND TAKES `PAR-JS-6`'s
/// DECLARED ANSWER — the store's own thrown `{status, message}` with `status` `AddressMalformed` — while the
/// ONE CALL THAT FOLDS TO THE ABSENT ROW IS `a.read(address)`, WHICH SUPPLIED NOTHING THERE"*; the same
/// adjudication stands at `acceptance.md §4.1` item `7`, whose *"folds to the ABSENT row"* is read through
/// that row from that date). **SO `foldsUndefined` IS `false` AT EVERY SUPPLYING SITE — `read` ·
/// `readLiteral` · `write` · `delete` — and the arity fold that reaches `{ k: 'A' }` is the NO-ARGUMENT CALL
/// ALONE**, which is exactly what `supplied` carries: `n >= 2` at the readers and the writers, read off the
/// METHOD's own call arity (`docs/specs/storeroom-js/surface.md §2.12` item 3's one-spelling rule). **THE STORE'S OWN `TierArg::Undefined` ARM
/// ANSWERS `AddressMalformed` AT ALL FOUR** (`src/args.rs`'s `read_tier_sel` and `write_tier`), so no code is
/// minted here and the answer is the store's own.
///
/// **AND `A76`'S CLASS ORDER IS TAKEN HERE FIRST (`JS-2`'s reach at this carrier):** a `Proxy` is refused
/// as an OBJECT before any element is read from it — **so a throwing `get` trap cannot be raised, because
/// nothing reads the proxy** — and a class extending `Array` is refused as an OBJECT (`TierArg` row 6's
/// `OutOfDomainTier`) rather than admitted as the array spelling row 2 declares for the readers.
/// **THE SUPPLIED-`undefined`-TIER ARM AT AN ADDRESS POSITION** — `refuseOutsideAddressValue`'s own
/// shape, taken at the one value that reached neither of the boundary's two segment/address arms
/// (`DEF-2026-10-17-A`; `surface.md §2.5` item 5 (a)–(b) and its `CF-3` authority split).
///
/// **THE TARGET IS THE VALUE'S OWN RENDERING AND IT IS THE STORE'S OWN SPELLING FOR THAT VALUE** (item 5
/// (a): *"a non-segment value PRINTED AS ITS OWN VALUE"*) — `undefined`, which is the spelling
/// `refuseOutsideAddressValue` already gives this same value at the whole-address arm, so ONE value has
/// ONE rendering at both arms and neither is authored here. **THE CONTAINER IS THE ARGUMENT'S OWN NAME**
/// (`['address']`, handed to `boundaryReject`, whose third slot fills the generator's own `<container>`),
/// exactly as the whole-address arm does one function above — a WHOLE-ADDRESS refusal is found in no
/// container, so the truthfully filled slot is the failing ARGUMENT's own name. **PART TWO CARRIES THE
/// POSITION AND NOT A SECOND CONTAINER CLAIM:** the ARGUMENT POSITION `§2.5` item 5 (b) requires beside the
/// class, and the class of the value the position refused.
///
/// **⟶ AND THE SECOND VALUE THIS ARM SERVES IS A SUPPLIED `null`, WIDENED 2026-10-17 BY THE SAME ONE SITE
/// (`DEF-2026-10-17-E`).** **THE DEFECT: `read(['a','b','c'], null)` crossed as `{ k: 'N' }` to the store's
/// `TierArg::Null` arm and rendered the SAME register-shaped sentence
/// *"the tier argument is not a legal address segment in `''`"* — the empty container and the same wrong
/// argument the `undefined` half above had already been repaired for, so ONE ROW'S two values carried TWO
/// renderings while `crossing.md §1.3`'s `TierArg` row 4 declares them ONE answer.** **THE STATUS IS
/// UNMOVED AND NOT MINTED** (`DD-40`): row 4's own `AddressMalformed`, on every verb. **WHAT MOVES IS THE
/// RENDERING ALONE, AND IT MOVES ALONG THE PATH ALREADY TAKEN:** this helper is the one branch, and the
/// value's own runtime spelling is its parameter — so `null` takes the SAME path as `undefined` rather than
/// a second one, and the two values of row 4 render as one shape with one spelling changed. **THE STORE'S
/// OWN `TierArg::Null` ARM IS UNTOUCHED** (`src/args.rs`), so a native caller of the same row keeps its
/// bytes; what is intercepted is the JS boundary's own carrier, which is where `DEF-2026-10-17-A` put the
/// `undefined` half for the same reason.
function refuseSuppliedOutsideTier(value, addressArgumentPosition) {
  boundaryReject(
    'AddressMalformed', // `PAR-JS-6`'s and `TierArg` rows 3–4's own declared code for this value, carried (`DD-40`)
    value, // the value's own runtime spelling, as the store renders it and as `refuseOutsideSegment` renders it
    // **THE POSITION HALF IS SPELLED IN THIS SITE'S OWN VOCABULARY because `addressArgumentPosition` is the
    // address's OWN position token (`'first argument'`, the position every one of the five verbs declares
    // for its `address` — `surface.md §2.4` item 9 (f)'s table): the address position was SUPPLIED, and
    // what was supplied BESIDE it is a `tier` position carrying this value. The sentence therefore names
    // the argument that was supplied, the position it stands AT, and the class the supplied value has —
    // which is the whole of what item 5 (b) requires to travel inside the message.**
    addressArgumentPosition === undefined
      ? `the address position was supplied, the tier position holds ${value}, and a tier is a token or a set of tokens`
      : `the address position was supplied at the ${addressArgumentPosition}, the tier position holds ${value}, and a tier is a token or a set of tokens`,
    ['address'],
  );
  return undefined; // `boundaryReject` throws; this is unreachable and is not a second path
}

function encodeTier(tier, supplied, foldsUndefined, addressArgumentPosition) {
  if (!supplied) return { k: 'A' };
  if (tier === undefined) {
    if (foldsUndefined) return { k: 'A' };
    // **⟶ AND THE SUPPLIED-`undefined` ARM IS THE FOURTH BRANCH, REFUSED AT THE BOUNDARY 2026-10-17
    // (`DEF-2026-10-17-A`; `surface.md` §2.5 item 5 (a)–(b) and its `CF-3` authority split).**
    //
    // **THE DEFECT, MEASURED ON INSTALLED BYTES AND REPRODUCED AT THIS TREE: this value crossed to the
    // store as `{ k: 'U' }` and the store answered its OWN `malformed_tier_argument()`
    // (`src/args.rs`'s `read_tier_sel` / `read_literal_tier_sel` / `write_tier`), whose generated text is
    // *"the tier argument is not a legal address segment in `''`, segments are strings or non-negative
    // integers"* — AN EMPTY CONTAINER AND A NAMED ARGUMENT THE OFFENDING VALUE IS NOT.** *"`''` for the
    // register"* (`docs/specs/storeroom-native/contract.md` §8.2's `<CONTAINER>`), so that message answers
    // a failure found INSIDE THE REGISTER, while a `read(['a','b','c'], undefined)` on an EMPTY store has
    // resolved against no register node at all.
    //
    // **WHY THIS IS THE MISMATCH THE OTHER THREE BRANCHES ALREADY REPAIR, AND WHY IT IS THE FOURTH:** rows
    // 1–3 of that classification are whole-ADDRESS shapes refused by `refuseOutsideAddressValue`
    // (container `'address'`, position `at the first argument`), and the array's own outside SEGMENTS are
    // refused by `refuseOutsideSegment` (container = the failing segment's PREFIX). **A SUPPLIED
    // `undefined` TIER BESIDE AN ADDRESS THAT IS ITSELF WHOLLY IN DOMAIN — `['a','b','c']`, `['a.b']`,
    // `['a']`, `[]` — REACHED NEITHER ARM** and fell through to the store's register-shaped sentence.
    //
    // **WHAT IS DECLARED HERE, AT THIS ONE SITE:** the ARGUMENT POSITION the verb's own signature declares
    // (item 5 (b): *"the ARGUMENT POSITION for a verb's arguments"*) and a TRUE container — the same
    // reading the whole-address arm takes one function above and the same one the store's own
    // `ConstraintListInvalid` row takes where its container is a KEY and not an address
    // (`constraints`; native `contract.md` §8.2's row and its `<CONTAINERSEGMENT>` degenerate arm).
    // **THE STATUS IS NOT MINTED** (`DD-40`): it stays the store's own `AddressMalformed`, which is the
    // code this row declares — *"`AddressMalformed` when the argument is `null` or `undefined`"*
    // (`parameter-semantics.md` §2.6's `PAR-JS-6` answer cell, as reconciled 2026-10-16) — carried and not
    // re-minted, exactly as `refuseOutsideSegment` carries it.
    //
    // **WHAT DOES NOT MOVE:** the call still SUPPLIES the value at the position and does not fold it to the
    // ABSENT row (`PAR-JS-6`'s reconciliation, unmoved: the ONE call that folds is `a.read(address)`, which
    // supplied nothing); `write`'s required tier answers the same code; and the store's own
    // `TierArg::Undefined` arm is untouched.
    refuseSuppliedOutsideTier('undefined', addressArgumentPosition);
    return { k: 'U' }; // `refuseSuppliedOutsideTier` throws; this is unreachable and is not a second path
  }
  // **⟶ AND THE OTHER VALUE OF ROW 4 TAKES THE SAME BRANCH, ADDED 2026-10-17 (`DEF-2026-10-17-E`).**
  // `crossing.md §1.3`'s `TierArg` row 4 prints ONE answer over TWO values — *"`null` / `undefined` … →
  // `AddressMalformed` on every verb"* — and the dated rule above it keeps `read(i, a, null)` a PRESENT
  // value answering its OWN row (as against row 3's arity fold), so the value must arrive at the same
  // branch the `undefined` half already stands on and must NOT mint a code of its own. **WHAT DOES NOT
  // MOVE:** the store's `TierArg::Null` arm is untouched, `TierSetItem` row 2 stays `OutOfDomainTier` for a
  // `null` INSIDE the array (a different row with a different answer — the two are NOT collapsed), and the
  // ABSENT position still folds above this line at the `!supplied` guard.
  if (tier === null) {
    refuseSuppliedOutsideTier('null', addressArgumentPosition);
    return { k: 'N' }; // `refuseSuppliedOutsideTier` throws; this is unreachable and is not a second path
  }
  if (typeof tier === 'string') return { k: 'T', v: tier };
  if (types.isProxy(tier)) return { k: 'O' }; // row 6: an object, and no trap is invoked
  if (Array.isArray(tier)) {
    if (arrayClass(tier) === 'class') return { k: 'O' }; // row 6: a class extending `Array` is an object
    // **⟶ AND THE TIER SET IS ENCODED BY A LOCAL INDEX LOOP, NOT BY `Array.prototype.map`** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `61`; arm `(xix)`,
    // cell `JC-TC-65`): `delete Array.prototype.map` threw a RAW HOST `TypeError` out of a LAWFUL store verb, and
    // a forged `map` silently dropped tier items from a verb that then succeeded — a crossed member decided by a
    // prototype. The loop carries one encoded item per item, in the caller's own order.
    const items = [];
    for (let i = 0; i < tier.length; i += 1) items[items.length] = encodeTierSetItem(tier[i]);
    return { k: 'S', i: items };
  }
  if (typeof tier === 'number') return { k: 'D', v: tier };
  if (typeof tier === 'boolean') return { k: 'B', v: tier };
  if (typeof tier === 'function') return { k: 'F' };
  return { k: 'O' };
}

function encodeTierSetItem(item) {
  if (item === null) return { bad: 'null' };
  if (item === undefined) return { bad: 'undefined' };
  if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') return item;
  if (typeof item === 'function') return { bad: 'function' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `OpIdArg` table, `6` rows.
///
/// **⟶ `JS-1` AND `JS-6` ARE CLOSED AT THIS SITE — THE `Number(opId)` COERCION IS GONE.** The shipped arm
/// was `return { k: 'D', v: Number(opId) }`, and it was wrong three ways at once: `Number(Symbol())` threw
/// a RAW HOST `TypeError` out of this frame (outside `docs/specs/storeroom-js/surface.md §2.5`'s one form), an object with a throwing
/// `valueOf`/`Symbol.toPrimitive` or a `Proxy` with a throwing trap did the same, and **a `bigint` crossed
/// the NUMBER ARM and was substituted — `Number(10n)` is `10` — so the caller's `10n` was reported as a
/// number** (`JS-6`). **THE FIX IS THE ORDER, NOT A `catch`: THE CLASS IS DECIDED FIRST AND NOTHING IS
/// CONVERTED, so no `valueOf`, no `Symbol.toPrimitive` and no trap is ever invoked and there is no host
/// error left to catch.**
///
/// **THE DECLARED ROWS CROSS TO THE STORE (`OpIdArg` rows 1, 3–6): a `string`, a supplied `undefined`, a
/// `null`, and a NUMBER — `JS-1`'s *"a number"* row 6 — each carried as its own variant so the store renders
/// its own generated `AddressMalformed` at the failing target.** **EVERY OTHER CLASS — a `symbol`, a
/// `bigint`, a `boolean`, an object, an array, a function, a `Proxy`, a class instance — is refused AT THE
/// BOUNDARY, inside the one form, naming the target and the class** (`A76`: *"an op-id (and every other
/// argument) whose class is outside the declared domain is refused INSIDE the single failure form"*; the
/// status is the one the table's rows 3–6 declare, `AddressMalformed`, and it is carried rather than
/// minted — `DD-40`).
function encodeOpId(opId) {
  if (opId === undefined) return { k: 'U' };
  if (opId === null) return { k: 'N' };
  if (typeof opId === 'string') return { k: 's', v: opId };
  // THE DECLARED NUMBER ROW: the number itself crosses — **never `Number(opId)`, which would COERCE every
  // other class into this arm.**
  if (typeof opId === 'number') return { k: 'D', v: opId };
  boundaryReject(
    'AddressMalformed', // `OpIdArg` rows 3–6's own declared code, carried and never minted (`DD-40`)
    targetSpelling(opId), // item 5 (a): the non-segment target printed as its OWN value
    `the rollback's opId is ${classSpelling(opId)}, and an op id is a non-empty string`,
  );
  return { k: 'U' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// **⟶ `encodeHandle` IS DELETED, NOT REWRITTEN — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).**
/// The three-variant classifier (*"the OPAQUE form alone is the site's, and every outside spelling is
/// carried as its own variant"*) and its `state.tokens` walk **go whole**, on the architect's ruling that
/// settles fork (g), VERBATIM: *"This is also irrelevant because tokens is being eliminated and the function
/// lookup is now a direct map key check."* (`P: docs/pending.md · P-6`; `contract.md §2.8` item 2 item (6);
/// `identity-and-domain.md §1` item 1).
///
/// **WHAT REPLACES IT IS A DIRECT MAP KEY CHECK AT EACH VERB** — `map.has(handle)` / `map.get(handle)` on
/// the ONE function map keyed by the handle string (`identity-and-domain.md §1` item 4). **THE THREE VARIANTS
/// AND THEIR TWO DISPOSITIONS SURVIVE AS CONSEQUENCES AND NOT AS A CLASSIFIER**: a NON-STRING is REFUSED by
/// the class test at `listen`/`register`/`removeListener`; a STRING the map does not carry is `unlisten`'s
/// NO-OP SUCCESS and `register`'s REFUSAL; and a BLANK STRING stays the store's own refused form.
///
/// **THE ONE PREDICATE THE SITES SHARE IS THE DOMAIN TEST ITSELF — A `typeof` READ AND A LENGTH READ AND
/// NOTHING MORE** (`identity-and-domain.md §2` item 1: *"no object inspection, no `Proxy` trap invocation, no
/// property read"*).
function inDomainHandle(handle) {
  return typeof handle === 'string' && handle !== '';
}

/// **THE HANDLE SHAPE THE ADDON IS HANDED FOR A VERB'S HANDLE POSITION** — one spelling, and it is the
/// handle's own value: `{k:'O', v: handle}` is the `JsHandleArg` carrier's opaque arm, which with the token
/// gone carries the handle it always was (`P: docs/pending.md · P-6`, the type ruling: *"`JsHandle { token:
/// String }` collapses to the string it always was"*).
function handleWire(handle) {
  return { k: 'O', v: handle };
}

/// `crossing.md §1.3`'s `FilePathArg` table: ABSENT is IN DOMAIN, and `undefined` at a PRESENT key is row
/// 3's `AddressMalformed`.
function encodeFilePath(filePath) {
  if (filePath === undefined) return undefined;
  if (filePath === null) return null;
  if (typeof filePath === 'string') return filePath;
  return { bad: typeof filePath };
}

/// `crossing.md §1.3`'s `JournalLengthArg` table, `12` rows, with NO coercion (`PAR-JS-4`).
///
/// **`A76`/`JS-6` AT THIS CARRIER: A `bigint` CROSSES AS A `bigint`.** The shipped arm wrote the marker
/// `{ bigint: n.toString() }`, which the facade could only read as an OBJECT — a class folding the caller
/// never spelled. **The value's own class is handed over as the value itself**, the facade reads it as
/// `NAPI_BIGINT` (never through the number read), and the store answers row 11's declared
/// `AddressMalformed` — *"and no coercion of a numeric string, a boolean or a `bigint` is performed"*
/// (`PAR-JS-3`).
function encodeJournalLength(n) {
  if (n === undefined) return undefined;
  if (n === null) return null;
  if (typeof n === 'number' || typeof n === 'string' || typeof n === 'boolean') return n;
  if (typeof n === 'bigint') return n;
  if (typeof n === 'function') return { bad: 'function' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `ListenersArg` table: ABSENT answers `AddressMalformed` — *"the ONE absence the
/// construction does not admit"* — and a rejected array admits NOTHING.
///
/// **`A76`/`JS-5` AT THIS CARRIER — THE TWO DEFECTS THE GATE-4 PASS MEASURED ARE BOTH CLOSED HERE:**
/// **(1) `'address' in entry` WALKED THE PROTOTYPE CHAIN, so an entry carrying an INHERITED `address` or
/// `handle` was read as an entry field** — every member read below is now `Object.hasOwn`'s own-property
/// read and nothing else; **(2) an ENTRY that is a prototype-carrying object or a class instance was read
/// through the chain at all** — **the entry's CLASS is now decided first** (`isPlainObjectValue`, which
/// refuses a `Proxy`, an `Array` and any prototype-carrying object before one member is read) and a
/// non-plain entry is REFUSED AT THE BOUNDARY with the class and the POSITION named, inside the one form
/// (`ListenersArg` row 2's declared `AddressMalformed`, carried and never minted).
function encodeListeners(listeners) {
  if (listeners === undefined) return undefined;
  if (listeners === null) return null;
  if (types.isProxy(listeners)) return { bad: 'non-array' }; // row 3: not the array's shape (`DD-34`)
  if (!Array.isArray(listeners)) return { bad: 'non-array' };
  if (arrayClass(listeners) === 'class') return { bad: 'non-array' }; // `JS-2`: a class extending `Array`
  // **⟶ AND THE LIST IS WALKED BY A LOCAL INDEX LOOP, NOT BY `Array.prototype.map`** (`contract.md §2.1`'s
  // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `62`; arm `(xix)`,
  // cell `JC-TC-65`): a caller-side `delete Array.prototype.map` made EVERY `storeCreate` throw a RAW HOST
  // `TypeError` before it returned — the direction `F-RA-3`'s item `(3)` forbids — and a forged `map` decided
  // which entries the construction's declared seeding saw. The loop answers one encoded entry per element, at
  // that element's own position.
  const encoded = [];
  for (let position = 0; position < listeners.length; position += 1) {
    const entry = listeners[position];
    if (!isPlainObjectValue(entry)) {
      boundaryReject(
        'AddressMalformed',
        'listeners',
        `the listeners entry at position ${position} is ${classSpelling(entry)}, and an entry is a plain { address, handle } record`,
      );
    }
    const keys = Object.keys(entry); // the OWN enumerable string keys, and nothing inherited
    if (keys.length !== 2 || !Object.hasOwn(entry, 'address') || !Object.hasOwn(entry, 'handle')) {
      encoded[encoded.length] = { bad: 'entry' };
      continue;
    }
    const handle = entry.handle;
    if (typeof handle !== 'string' || handle === '') {
      encoded[encoded.length] = { bad: 'handle' };
      continue;
    }
    encoded[encoded.length] = { address: encodeAddress(entry.address), handle };
  }
  return encoded;
}

/// **⟶ ADDED 2026-10-15 (`parameter-semantics.md §2.21`; `surface.md §2.1`'s `cfg` block dated 2026-10-15;
/// `contract.md §8.1` #16) — THE CONSTRUCTION'S FOURTH DECLARED KEY, `constraints`: THE LIST'S OWN WALK.**
///
/// **THE CLASS DECISION IS TAKEN FIRST, ON THE VALUE AS IT IS, AND NO COERCION IS PERFORMED ANYWHERE
/// HERE** (`A76`'s part (1)): a `Proxy`, a class extending `Array` and every non-array is the LIST's own
/// outside form and is carried as one; a plain array is walked element by element; **and ONE ELEMENT
/// OUTSIDE THE `{ address, id }` PAIR'S SHAPE crosses as THE FAILING ENTRY'S OWN `<SEGMENT>` SPELLING**
/// (`§8.2`'s row: *"the failing ENTRY's `address` spelling, joined by `/` … or the element's own position
/// printed bare where the failing element carries no address at all"*). **THE CODE AND THE MESSAGE STAY THE
/// STORE'S** (`§8.1` #16, `DD-40`): nothing here mints a status and nothing here authors a sentence.
function encodeConstraints(constraints) {
  if (constraints === undefined) return undefined;
  if (constraints === null) return null;
  if (types.isProxy(constraints)) return { bad: 'non-array' }; // `DD-34`'s class order, taken first
  if (!Array.isArray(constraints)) return { bad: 'non-array' };
  if (arrayClass(constraints) === 'class') return { bad: 'non-array' };
  // **⟶ AND THE FOURTH KEY'S OWN WALK IS A LOCAL INDEX LOOP, NOT `Array.prototype.map`** (`contract.md §2.1`'s
  // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `63`; arm `(xix)`,
  // cell `JC-TC-65`): a forged `map` registered nothing while the construction returned an instance, and the
  // deletion threw a RAW HOST `TypeError` out of the same construction. Each element is encoded at its own
  // position and the list crosses WHOLE.
  const encoded = [];
  for (let position = 0; position < constraints.length; position += 1) {
    const element = constraintEntry(constraints[position], position);
    // **⟶ AND THE ELEMENT'S THIRD MEMBER IS DROPPED HERE AND ONLY HERE — `D-26` item 3, 2026-10-24.** The
    // element type the declaration now carries is THREE members and `constraint` is REQUIRED; **a JavaScript
    // function cannot cross into Rust at any depth**, so `ConstraintEntry::Pair { address, id }` stays two
    // fields and the crossing carries the PAIR. **THE PACKAGE ARMS THE SUBSTANCE** — `constraintEntry` below
    // FORWARDS it and the construction's own batch walk captures it; the crossing is this one projection.
    encoded[encoded.length] = element.bad === undefined
      ? { address: element.address, id: element.id }
      : element;
  }
  return encoded;
}

/// ONE `constraints[]` ELEMENT: the closed `{ address, id }` pair, or the element's own `<SEGMENT>`
/// spelling (`§8.2`). **AN ELEMENT THAT IS NOT A PLAIN OBJECT — an array, a `Proxy`, a class instance and
/// every non-object included — CARRIES NO ADDRESS AT ALL**, so its slot is the element's own POSITION
/// printed bare.
function constraintEntry(entry, position) {
  const where = `the constraint entry at position ${position}`;
  if (!isPlainObjectValue(entry)) return { bad: 'element', subject: where };
  if (!Object.hasOwn(entry, 'address') || entry.address === undefined) {
    return { bad: 'element', subject: where };
  }
  const address = constraintAddress(entry.address);
  if (typeof address === 'string') return { bad: 'element', subject: address };
  // AN ELEMENT CARRYING NO `id` AT ALL IS THE SAME OUTSIDE FORM AS ONE WHOSE `id` IS NOT A STRING: the
  // `<SEGMENT>` slot prints the entry's own `address` spelling and the `<KEYLIST>`'s members are the
  // entry's own, read by the store's generator and never here.
  if (
    !Object.hasOwn(entry, 'id')
    || entry.id === undefined
    || typeof entry.id !== 'string'
    || entry.id === ''
  ) {
    return { bad: 'element', subject: spellConstraintAddress(address.s) };
  }
  // **⟶ AMENDED 2026-10-24 (`D-26`, verbatim: *"The batch in cfg.constraints must supply functions"*): THE
  // ELEMENT'S THIRD MEMBER IS FORWARDED, NOT DROPPED.** The bytes this return replaced were
  // `return { address, id: entry.id };` — *"nothing else is forwarded, so a `constraint` member a caller
  // attaches to an element is DROPPED at the crossing, silently"* — and **that drop is named a DEFECT by
  // `D-26` item 1, not a design**. The member is CARRIED HERE for the PACKAGE's own use: the construction's
  // batch walk validates it (`B-1`) and the arming loop hands it to `K-1` after the instance exists (`D-27`:
  // *"Functions are armed"*). **IT IS STRIPPED AT THE CROSSING ALONE** (`encodeConstraints` above), because
  // a JS function cannot cross into Rust. **THE FUNCTION'S PRESENCE IS NOT TESTED HERE**: a missing or
  // non-function member is `B-1`'s refusal, decided one layer up in the construction's own walk, in the
  // surface's one thrown form and before any filesystem act (`D-26` item 5).
  return { address, id: entry.id, constraint: entry.constraint };
}

/// `§1.5`'s segment array as the carrier `encodeAddress` declares it — **or, where the value lies outside
/// that domain, the failing ELEMENT's own `address` spelling as a STRING** (`§8.2`'s `<SEGMENT>` slot: a
/// string key single-quoted, an integer index bare, joined by `/`).
function constraintAddress(address) {
  if (types.isProxy(address) || !Array.isArray(address) || arrayClass(address) === 'class') {
    return `'${valueTargetSpelling(address)}'`;
  }
  const segments = [];
  for (let i = 0; i < address.length; i += 1) {
    if (!(i in address)) {
      return `${spellConstraintAddress(segments)} and no segment at position ${i}`;
    }
    const segment = address[i];
    if (typeof segment === 'string' && !hasLoneSurrogate(segment)) {
      segments[segments.length] = segment;
    } else if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0
      && Number.isSafeInteger(segment)) {
      segments[segments.length] = segment;
    } else {
      return `${spellConstraintAddress(segments)} and ${classSpelling(segment)} at position ${i}`;
    }
  }
  return { k: 'L', s: segments };
}

/// `§8.2`'s whole-address spelling: **a string key SINGLE-QUOTED (`'a'`) and an integer index BARE (`0`),
/// JOINED BY `/`** — the same spelling the store's own generator prints at its `<SEGMENT>` slot.
///
/// **⟶ AND NOTHING HERE IS TAKEN FROM A MUTABLE PROTOTYPE FROM 2026-10-24** (`contract.md §2.1`'s clause of
/// this date on `F7-1`, items `(2b)`'s row `39` and `(10d)`): the as-built spelling built an array with
/// `Array.prototype.map` and joined it with `Array.prototype.join`, so a caller's override RAN on every
/// `ConstraintListInvalid` rendering and ITS RETURN VALUE BECAME THE `<SEGMENT>` SLOT of the store's own
/// diagnostic — the battery's row `(k)` measures the marker in the message. **The form is item `(1c)(i)`'s
/// local loop and the same `+=` join `valuePosition` takes**; the bytes, the quoting, the bare integer and the
/// `/` separator are unmoved.
function spellConstraintAddress(segments) {
  let spelled = '';
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    const rendered = typeof segment === 'string' ? `'${segment}'` : String(segment);
    spelled += i === 0 ? rendered : `/${rendered}`;
  }
  return spelled;
}

/// `surface.md §2.1` / `DD-36`: the as-filed *"`cfg` carries the store's THREE declared keys and no
/// fourth"* is read THROUGH this clause and is **the FOUR declared keys and no FIFTH** — `filePath` ·
/// `journalLength` · `listeners` · `constraints` (`surface.md §2.1`'s `cfg` block dated 2026-10-15 and its
/// dated clause of 2026-10-16; `parameter-semantics.md §2.21` = `PAR-JS-21`) — **and a CALLER-SUPPLIED key
/// beyond those four is IGNORED, never refused: no code, no refusal and no member moved** (`docs/specs/storeroom-js/surface.md §2.1`'s dated
/// clause of 2026-10-16, `contract.md §7.1`'s third-key row governing the caller's key; `§8.1`'s
/// complement). **Each key's own ABSENCE is the member's own absence** — `crossing.md §1.3`'s
/// absent-versus-`undefined` rule reads a
/// `cfg` key by MEMBERSHIP and never by arity, and **`A76`/`JS-5` fixes that membership as OWNERSHIP:
/// `Object.hasOwn` and never `in`, which walks the prototype chain.**
///
/// **AND THE CLASS DECISION COMES FIRST, ON `cfg` AS IT IS.** The shipped line
/// `const object = cfg !== null && typeof cfg === 'object' ? cfg : {};` **SUBSTITUTED an empty object for
/// every non-object `cfg`** — a repair, and one that answered the wrong code at that: `storeCreate(null)`,
/// `storeCreate(5)` and `storeCreate([])` all fell through to a missing `journalLength` and answered
/// `ConstructionArgumentMissing`, where `PAR-JS-1` declares **`AddressMalformed` for EVERY outside form of
/// `cfg`** (*"ABSENT · `null` · `undefined` · a non-object (a number, a string, a boolean, a function, an
/// array) — `AddressMalformed` for every one of them, with no instance returned"*). **That substitution is
/// GONE: a `cfg` that is not a PLAIN object is REFUSED, verbosely, naming the class — and so is a
/// prototype-carrying object or a class instance, whose inherited keys the shipped `in`-test read as
/// PRESENT (`JS-5`).**
function encodeConfig(cfg) {
  if (!isPlainObjectValue(cfg)) {
    boundaryReject(
      'AddressMalformed', // `PAR-JS-1`'s declared answer for every outside form of `cfg`, carried — **AND THE MESSAGE BELOW IS RE-SPELLED IN PLACE, 2026-10-16: *"carrying the store's three declared keys"* READS *"carrying the store's four declared keys"*, THE COUNT ALONE MOVING, because the set is `filePath` · `journalLength` · `listeners` · `constraints` (`§2.1`'s `cfg` block and dated clause, both of 2026-10-15), because the sentence's subject is the `cfg` CARRIER CLASS and NEVER a caller obligation (a CALLER-SUPPLIED key BEYOND the four is still IGNORED and never refused, `contract.md §7.1` — no semantics and no refusal path moves with the word), and because NOTHING PINNED THE OLD WORDING: no clause of `docs/specs/**` declares this message's figure and no test reads it — the drives read the TARGET `cfg` and the CLASS that failed (`negative-generators.test.mjs` · `registry.test.mjs`) — so it was ordinary prose written when the count was three and NOT a clause's own byte.**
      'cfg',
      `the construction's cfg is ${classSpelling(cfg)}, and cfg is one plain object carrying the store's four declared keys`,
    );
  }
  const out = {};
  if (Object.hasOwn(cfg, 'filePath')) out.filePath = encodeFilePath(cfg.filePath);
  if (Object.hasOwn(cfg, 'journalLength')) out.journalLength = encodeJournalLength(cfg.journalLength);
  if (Object.hasOwn(cfg, 'listeners')) out.listeners = encodeListeners(cfg.listeners);
  // **⟶ THE FOURTH DECLARED KEY** (`§2.21`; `docs/specs/storeroom-js/surface.md §2.1`'s `cfg` block dated 2026-10-15): `constraints` passes
  // through by the SAME membership rule the three above take, so a key the caller did not supply is
  // ABSENT and a key the caller supplied as `undefined` is the key's own outside form. **A key BEYOND the
  // four is IGNORED and produces no code** (`§8.1`'s complement), and no default, no rename and no fifth
  // key is added here (`DD-36`).
  if (Object.hasOwn(cfg, 'constraints')) out.constraints = encodeConstraints(cfg.constraints);
  return out;
}

// ---------------------------------------------------------------------------------------------
// **⟶ ADDED 2026-10-24 — THE CONSTRUCTION'S STEP `2`: THE BATCH'S MEMBER CHECKS (`D-26`, `D-27`), TAKEN
// BEFORE ANY FILESYSTEM ACT.** (`docs/L1/surface-deltas.md` §3.1 step 2, §3.2.)
// ---------------------------------------------------------------------------------------------
/// **THE BATCH'S THREE CHECKS, PER ELEMENT, ASCENDING POSITION, AND THE ELEMENT IT ANSWERS IS THE ONE THE
/// ARMING LOOP LATER HANDS TO `K-1`.**
///
/// **`D-27`'S TWO WALLS, WHICH ARE NOT THIS PASS'S TO MOVE:** every check **precedes any filesystem act** —
/// and the construction's FIRST filesystem act is inside `addon_.storeCreate(encoded)`, which is why this
/// function is called between `encodeConfig` and that call — and **the function check precedes the uniqueness
/// check that must see the adopted listeners.**
///
/// **THE THREE CHECKS, IN THE DECLARED ORDER, AND THE TWO GROUNDS FOR THAT ORDER:**
///   * **`B-1` — the function check is FIRST among the three, and first for every element before that
///     element's uniqueness checks.** A function fault is decidable **from the element alone** while both
///     uniqueness checks need a second input, so **the first fault to cross is the fault that needs the least
///     information** (`A76`'s part (1)).
///   * **`B-2` — the within-batch uniqueness check precedes `B-3` for the same element.** `2b` is decidable
///     from the list alone; `2c` needs the adopted handles. **A caller whose list is self-contradictory is told
///     the self-contradiction, not a collision with an argument they may not even have supplied.**
///   * **`B-3` — the cross-kind check against the construction's listeners**, `D-25`'s cross-kind rejection
///     *"applied at the one instant it can be checked wholesale"* (`D-27`).
///
/// **THE CHECKS ARE TAKEN OVER THE ELEMENTS THE STORE WOULD ADMIT AND SKIP THE ENCODER'S OWN `{bad: …}` ARMS**
/// (`constraintEntry`'s three refusals): **the package does not shadow a store refusal**, so an element that is
/// both malformed and functionless is refused by the store's own code, at its own instant, with its own
/// generated message. (`D-27`: *"the store's own list validation keeps its subject — shape, address domain,
/// `id` domain — and gains no arm"*.)
///
/// **AND THE ADOPTED-LISTENER SET IS COMPUTED FROM THE SUPPLIED `cfg.listeners`, NOT FROM THE STORE'S ADOPTED
/// ONE, WHICH DOES NOT EXIST YET.** That is not a loophole: **the boot ruling applies every adopted handle
/// through `listen`, i.e. after the create**, and a `cfg.listeners` array that reaches the create is admitted
/// **WHOLE** (*"a REJECTED ARRAY ADMITS NOTHING"*), so on any construction that can succeed the lawful
/// supplied handles and the adopted handles are **the same set** (`docs/L1/surface-deltas.md` §3.2, marked
/// CONCLUDED there). `isLawfulListenerElement` is the one predicate both sides take.
///
/// **THE FORM IS THE SURFACE'S ONE THROWN OBJECT** `{status, message, log: []}` — `boundaryReject` reaches the
/// store's own generator for the message and throws the one form with `log: []`, because **no attempt is open
/// and no instance exists**. `ConstraintListInvalid` is the member: the list's own validation code, the same
/// subject one layer up, and **the package mints no code** (`D-26` item 5; `D-27`; §1.5's clause 5).
function admittedConstraintBatch(cfg) {
  const admitted = [];
  const constraints = cfg.constraints;
  if (constraints === undefined || constraints === null) return admitted;
  if (types.isProxy(constraints) || !isAdmittedArray(constraints)) return admitted;
  // ── THE SUPPLIED LISTENER HANDLES, AND THE ADDRESS EACH IS ADOPTED AT (for `B-3`'s message) ────────────
  const adoptedHandles = [];
  const adoptedAddresses = [];
  if (cfg.listeners !== undefined && cfg.listeners !== null
    && !types.isProxy(cfg.listeners) && isAdmittedArray(cfg.listeners)) {
    for (let i = 0; i < cfg.listeners.length; i += 1) {
      const entry = cfg.listeners[i];
      if (!isLawfulListenerElement(entry)) continue;
      adoptedHandles[adoptedHandles.length] = entry.handle;
      adoptedAddresses[adoptedAddresses.length] = entry.address;
    }
  }
  // ── THE WITHIN-BATCH NAMES, AS TWO PARALLEL LOCAL ARRAYS READ BY INDEX ────────────────────────────────
  // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`/`F8-2`: no `Map`/`Set` member and no iterator is
  // taken off a mutable prototype on this path.)
  const namedHandles = [];
  const namedPositions = [];
  for (let position = 0; position < constraints.length; position += 1) {
    const element = constraintEntry(constraints[position], position);
    // THE STORE'S OWN ARM KEEPS ITS SUBJECT — an element the encoder refused is skipped, never shadowed.
    if (element.bad !== undefined) continue;
    const segment = spellConstraintAddress(element.address.s);
    // ── `B-1` — THE FUNCTION CHECK ──────────────────────────────────────────────────────────────────────
    if (typeof element.constraint !== 'function') {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} carries ${classSpelling(element.constraint)} at its `
          + "constraint member, and a batch element's constraint is a JS function and it is the pair's substance",
        ['constraints'],
      );
    }
    // ── `B-2` — TWO BATCH ELEMENTS NAMING ONE HANDLE: REPORTED AT THE LATER ONE ───────────────────────────
    let namedAt = -1;
    for (let n = 0; n < namedHandles.length; n += 1) {
      if (namedHandles[n] === element.id) {
        namedAt = namedPositions[n];
        break;
      }
    }
    if (namedAt !== -1) {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} names the handle '${element.id}', and the element at `
          + `position ${namedAt} names the same one: a batch element's id is the store-side handle for its `
          + 'pair, and one batch may not name one handle twice',
        ['constraints'],
      );
    }
    // ── `B-3` — A BATCH `id` EQUAL TO AN ADOPTED LISTENER'S `handle`: THE CROSS-KIND COLLISION ───────────
    let adoptedAt = -1;
    for (let n = 0; n < adoptedHandles.length; n += 1) {
      if (adoptedHandles[n] === element.id) {
        adoptedAt = n;
        break;
      }
    }
    if (adoptedAt !== -1) {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} names the handle '${element.id}', and this construction `
          + `adopts a listener under that handle at ${JSON.stringify(adoptedAddresses[adoptedAt])}: a listener `
          + 'and a constraint do not share one',
        ['constraints'],
      );
    }
    namedHandles[namedHandles.length] = element.id;
    namedPositions[namedPositions.length] = position;
    admitted[admitted.length] = {
      addresses: [element.address.s],
      id: element.id,
      constraint: element.constraint,
    };
  }
  return admitted;
}

// ---------------------------------------------------------------------------------------------
// THE COPY OUT — the core's own records and values mapped back into FRESH JS values
// (`crossing.md §1.1` clause 2: no returned value is a view into store memory).
// ---------------------------------------------------------------------------------------------
function decodeValue(encoded) {
  // **THE COPY-OUT IS THE SAME BARE TREE** (`contract.md §5`; `A148` Q4/Q5): the native writer already
  // builds fresh plain objects and dense arrays, so this frame only normalizes `-0` and keeps the tree fresh.
  if (typeof encoded === 'number') return Object.is(encoded, -0) ? 0 : encoded;
  // **⟶ AND THE COPY-OUT'S OWN ARRAY ARM TAKES NO METHOD FROM A MUTABLE PROTOTYPE** (`contract.md §1`'s clause
  // of 2026-10-24 on `F-RA-3`, item `(3)`): the as-built `.map` read `Array.prototype.map` off the array's own
  // chain, so `delete Array.prototype.map` in the caller's realm threw a raw `TypeError` out of a read the
  // crossing had already ADMITTED — an admission converted into a failure by the caller's own deletion. The
  // walk is by INDEX, so the fresh tree is the same fresh tree.
  if (Array.isArray(encoded)) {
    const elements = [];
    for (let i = 0; i < encoded.length; i += 1) elements[elements.length] = decodeValue(encoded[i]);
    return elements;
  }
  if (encoded !== null && typeof encoded === 'object') {
    // **⟶ AN OWN DATA PROPERTY IS DEFINED, NEVER SET — CLOSED 2026-10-23 BY THE GATE-4 ADVERSARIAL BATTERY
    // (`json-crossing-gate4-adversarial.test.mjs`'s `ADV-12`).** `out[name] = member` runs `[[Set]]`, whose
    // `__proto__` step reaches the `Object.prototype` accessor: a stored member genuinely named `__proto__`
    // became the returned object's PROTOTYPE instead of an own member (and an attacker-supplied member could
    // shadow the returned object's methods). **`Object.fromEntries` defines OWN data properties**, so the
    // bare tree the contract declares crosses back member for member (`contract.md §5`; `A76`: *"do not
    // attempt to fix"*). **⟶ AND FROM 2026-10-24 THE MEMBERS ARE DEFINED BY A LOCAL LOOP** (`contract.md
    // §2.1`'s clause of this date on `F7-1`, items `(1c)(ii)` and `(2b)`'s rows `21` and `22`):
    // `Object.entries`'s pair iteration and `fromEntries`'s argument iteration are both
    // `Array.prototype[Symbol.iterator]` — a member of a MUTABLE PROTOTYPE on the COPY-OUT path — so the key
    // census is read by `Object.keys` and consumed by index, the member is read by its own key, and each is
    // defined as `fromEntries` defined it.
    const names = Object.keys(encoded);
    const plain = {};
    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      Object.defineProperty(plain, name, {
        value: decodeValue(encoded[name]),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return plain;
  }
  return encoded;
}

/// `crossing.md §1.3`'s segment spellings, mapped back: a string or a non-negative integer is what the JS
/// side spelled, and every outside class is carried as its own marker rather than silently coerced.
function decodeSegment(segment) {
  if (typeof segment === 'object' && segment !== null) {
    if (segment.bad === 'null') return null;
    if (segment.bad === 'undefined') return undefined;
    if (segment.bad === 'bool') return false;
    if (segment.bad === 'array') return [];
    if (segment.bad === 'function') return () => {};
    return {};
  }
  return segment;
}

/// **⟶ AND NO METHOD IS TAKEN FROM A MUTABLE PROTOTYPE HERE EITHER** (`contract.md §1`'s clause of 2026-10-24
/// on `F-RA-3`, item `(3)`: a caller-side DELETION cannot turn an admission into a refusal). The reply's own
/// segment array is decoded by INDEX: the as-built `.map` read `Array.prototype.map` off the array's chain, so
/// `delete Array.prototype.map` in the caller's realm made THIS read throw a raw `TypeError` out of a write the
/// walk had already ADMITTED — the admission converted into a failure at the package's own frame, which is
/// `§2.5` item 5 (e)'s forbidden raw host error as well as item `(3)`'s forbidden conversion.
function decodeSegments(segments) {
  const decoded = [];
  for (let i = 0; i < segments.length; i += 1) decoded[decoded.length] = decodeSegment(segments[i]);
  return decoded;
}

function decodeBaseState(encoded) {
  return { present: encoded.present, value: decodeValue(encoded.value) };
}

function decodeJournalOp(encoded) {
  return {
    opId: encoded.opId,
    kind: encoded.kind,
    address: decodeSegments(encoded.address),
    tier: encoded.tier === undefined ? null : encoded.tier,
    before: decodeBaseState(encoded.before),
    after: decodeBaseState(encoded.after),
    seq: encoded.seq,
    compacted: encoded.compacted,
  };
}

// ---------------------------------------------------------------------------------------------
// THE PACKAGE'S OWN SURFACE — the opaque handle (`docs/specs/storeroom-js/surface.md §2.3` item 2) and the per-instance registry (`docs/specs/storeroom-js/surface.md §2.4`)
// ---------------------------------------------------------------------------------------------
/// **THE PACKAGE'S OWN INSTANCE HANDLE'S STATE**, keyed by the instance the factory returned. The handle
/// itself carries EXACTLY ONE member, `register` (`surface.md §2.4` item 5 (a)) — **⟶ RE-SPELLED 2026-10-16: THAT ONE-MEMBER FIGURE IS THE AS-FILED READING AND IS SUPERSEDED AS A MEMBER-SET FIGURE — the instance's OPERATIVE member set is `{ register, on, off, settle }`, FOUR OWN MEMBERS AND NOTHING ELSE (`surface.md §2.7` item 8 AS AMENDED, where the as-filed `{register, on, off}` reads `{register, on, off, settle}`; `§2.11` clause 7; `docs/decisions.md` `A116` (D1)) — while the WeakMap below is still keyed by the INSTANCE alone and no member is added to it by this clause.**
const INSTANCES = new WeakMap(); // instance -> the package's own per-instance state

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
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

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
const STORE_RETIREMENT = new FinalizationRegistry((retire) => {
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
/// Both reads are now item `(1c)(i)`'s index loop and item `(1c)(v)`'s index write on this function's own
/// array, and the record's declared bytes, its order and its pair shape are unmoved.
function crossTriggered(state, triggered) {
  if (!Array.isArray(triggered)) return [];
  const out = [];
  for (let i = 0; i < triggered.length; i += 1) {
    const element = triggered[i];
    out[out.length] = { handle: element.handle, address: decodeSegments(element.address) };
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
  for (let i = 0; i < triggered.length; i += 1) handles[handles.length] = triggered[i].handle;
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
function entryOf() {
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
function isStoreReceiver(candidate) {
  if (candidate === null || typeof candidate !== 'object') return false;
  const state = INSTANCES.get(candidate);
  return state !== undefined && state.receiver === candidate;
}

function carryRefusal(call, args) {
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
function commitFile(receiver, opId) {
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
function writeRefusal(refusal, fault) {
  if (fault.found !== null && refusal !== null && typeof refusal === 'object' && refusal.status === 'ValueNotAdmitted') {
    valueReject(fault);
  }
  fail(refusal);
}

// ---------------------------------------------------------------------------------------------
// THE SURFACE — `surface.md §2.9` item 1: the EIGHT verbs, and NOTHING else. `findAddress` is NOT exposed
// (`A63`), no `exists` verb exists (`docs/specs/storeroom-js/surface.md §2.9` item 3) and no release verb is declared (`A74`).
// ---------------------------------------------------------------------------------------------

/// `docs/specs/storeroom-js/surface.md §2.1`: `storeCreate(cfg)` takes ONE plain object carrying the store's FOUR declared keys, passes them
/// through WITHOUT adding a default, a rename or a fifth key (`DD-36`) — **the as-filed *"THREE declared
/// keys … a fourth key"* is read THROUGH this re-spelling, at `docs/specs/storeroom-js/surface.md §2.1`'s `cfg` block dated 2026-10-15 and its
/// dated clause of 2026-10-16, and a CALLER-SUPPLIED key beyond the four is IGNORED, never refused
/// (`contract.md §7.1`; `§8.1`'s complement)** — and **never returns a partial instance** — it throws the
/// single failure form instead. **⟶ `docs/specs/storeroom-js/surface.md §2.1`'s dated clause (a), LANDED 2026-10-11
/// BY THE `Q1` CONTRACT AMENDMENT, RE-DERIVES THE MEMBER FIGURE THIS SENTENCE CARRIED: *"the object it
/// returns carries EXACTLY the one own member `surface.md §2.4` item 5 (a) declares, and not one member
/// beside it"* STANDS BYTE-FOR-BYTE ABOVE AND IS READ THROUGH THIS CLAUSE — from this date the member set
/// is `{ register, on, off }`, THREE OWN MEMBERS AND NOTHING ELSE — **⟶ AND THAT FIGURE IS RE-SPELLED IN PLACE, 2026-10-16 BY THE FILE-TIER-SAVE COMMENT PASS: *"THREE OWN MEMBERS"* IS THE 2026-10-11 FIGURE OF THE CLAUSE ABOVE AND NOT THE OPERATIVE ONE, WHICH IS `{ register, on, off, settle }`, FOUR OWN MEMBERS AND NOTHING ELSE** — the fourth being the `A116` ORDERING SEAM, the ONE member the KERNEL calls and the entry implements (`docs/decisions.md` `A116` (D1): the set *"opens by ONE clause"* to carry it; (D3): the lift is NARROW, so NO FIFTH member; its own home is `surface.md §2.4` item 9, and a CALLER's addressable sub-surface stays the three there declared), the count read at `surface.md §2.7` item 8 AS AMENDED (the as-filed `{register, on, off}` there is *"SUPERSEDED AS FIGURES"* and reads `{register, on, off, settle}`), at `§2.11` clause 7, and by the live battery's `FTS-12.1`, whose members are exactly those four. And `docs/specs/storeroom-js/surface.md §2.4` item 5 (a)'s *"one own
/// member"* is superseded AS A MEMBER-SET FIGURE at its own `§` by the same amendment (`surface.md §2.11` clause 7: *"the instance's member set stays `{ register, on, off, settle }`"*).** **THE MODULE
/// NAMESPACE IS UNMOVED at the eight declared verbs: neither new member is a named export, because both
/// are reached through THIS factory's own product and through nothing else** (`surface.md §2.1`'s dated
/// clauses (a)–(b); `A79`).
export function storeCreate(cfg) {
  const addon_ = withAddon();
  // **⟶ THE CONSTRUCTION'S OWN READ OF THE CALLER'S `cfg` STANDS OUTSIDE THE BOUNDARY'S CATCH — CORRECTED
  // 2026-10-17 (`A64`'s one form read with `surface.md §2.5` item 5 (e); the ruling *"catch a throw from a
  // repair and encapsulate the message to distinguish forgeries"*).**
  //
  // **THE DEFECT IT CLOSES, NAMED AT ITS BYTES: the walk below READS THE CALLER'S OWN PROPERTIES — `cfg`'s
  // four declared keys by `Object.hasOwn` and by the member reads `encodeConfig` performs — so a `cfg`
  // carrying an own ACCESSOR is a caller's own body, and a `get` that THROWS is a CALLER'S OWN THROWABLE.
  // While this read stood INSIDE the `try`, that throwable reached `fail`, which constructs THE STORE'S
  // SINGLE FORM out of whatever it is handed: `storeCreate({ journalLength: 64, listeners: [],
  // get constraints() { throw { status: 'AddressMalformed', message: 'FORGED BY THE CALLER' } } })` answered
  // `{"status":"AddressMalformed","message":"FORGED BY THE CALLER"}` — A CALLER-CHOSEN STATUS CARRIED AS
  // THIS STORE'S OWN REFUSAL — a thrown `TypeError` answered `{status: undefined, message: '…'}`, a thrown
  // bare string lost its message entirely, and a thrown `undefined` or `null` made the read itself fault on
  // `refusal.status`. **THE DEFECT WAS NEVER *"a caller can forge a status"* BUT *"A CALLER'S OWN EXCEPTION
  // IS CAUGHT AND RE-SHAPED BY A PATH THAT ASSUMES IT IS THE STORE'S."**
  //
  // **THE FIX IS THE SCOPE AND NOT A NEW FORM: the walk that READS THE CALLER'S OWN VALUES stands outside
  // the catch, so the caller's own body's throwable PROPAGATES AS ITSELF — the same value, wearing no member
  // this unit minted and no status of the store's closed set — while `fail` is reached on this path by THE
  // ADDON'S OWN REFUSAL ALONE, which is the ONE provenance `docs/specs/storeroom-js/surface.md §2.5`'s two-member form belongs to.** **AND THE
  // CLAUSE THIS IMPLEMENTS IS `surface.md §2.5` ITEM 5 (e)'s OWN RULE CARRIED TO THIS SITE** — *"a rejection
  // is NEVER A RAW HOST ERROR — a `TypeError` … a string thrown, or any host object escaping from the
  // boundary's own frame is a FINDING at whatever site produced it, not a rejection"* — read with
  // `kernel-surface.md §2.3` item 1's body-throw clause, which fixes the SAME disposition for the two
  // caller-side functions this unit registers: **a caller's body's throwable is *"NOT a kernel state and NOT
  // a store state"* and reaches the caller UNCHANGED.** **NO CODE, NO MEMBER AND NO MESSAGE MOVES ON ANY ARM
  // THE CALLER'S `cfg` IS LAWFUL: where `encodeConfig` RETURNS, this function's boundary call, its catch and
  // `fail` are the bytes they were.**
  const encoded = encodeConfig(cfg);
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════
  // **⟶ STEP 2 OF THE CONSTRUCTION'S ACT ORDER — THE BATCH'S MEMBER CHECKS, ADDED 2026-10-24 (`D-26`, `D-27`;
  // `docs/L1/surface-deltas.md` §3.1).** (`B-1` the function check, `B-2` the within-batch uniqueness check,
  // `B-3` the cross-kind check against the construction's adopted listeners, per element and ascending.)
  //
  // **WHERE IT SITS, AND WHY THE POSITION IS THE RULING'S AND NOT A PREFERENCE.** Every check **precedes any
  // filesystem act**, and **the construction's FIRST filesystem act is inside `addon_.storeCreate(encoded)`**
  // — `encodeFilePath` class-tests the value and the path probe is the store's. **So this is the last instant
  // at which a refusal can leave nothing behind**, which §10.4 part 5 requires (*"every construction that
  // fails leaves nothing behind"*), and a check placed in the arming loop below would refuse AFTER the
  // exclusive create had left the store's own zero-length file on disk.
  //
  // **AND IT IS WHY STEPS 5 AND 6 COMMUTE.** Under `D-22`/`D-24` the pair's home entry is created under the
  // caller's own `id`, and `listen`'s purge is total over the entries the handle names — so a batch `id` equal
  // to an adopted listener's `handle` would have made the order of step 5 and step 6 a correctness matter,
  // whichever ran second purging the first. **Step 2 removes the colliding state before either act runs, so
  // that order becomes unobservable and stays as filed** (`D-26`'s open question, answered by `D-27` as *"an
  // information dependency"* rather than as a sequence).
  //
  // **THE VALUE IT ANSWERS IS THE ADMITTED LIST — ONE ENTRY PER ELEMENT THE STORE WOULD ADMIT, CARRYING THE
  // FORWARDED `constraint` MEMBER — AND IT IS WHAT STEP 5 ARMS.** `D-26` item 3: *"the boundary carries the
  // PAIR and the package arms the SUBSTANCE"*; `D-27` item 1: *"Functions are armed"*.
  const batch = admittedConstraintBatch(cfg);
  let id;
  try {
    id = addon_.storeCreate(encoded);
  } catch (refusal) {
    fail(refusal);
  }
  // **ONE HANDLE PER TOKEN PER INSTANCE**: the map is read in BOTH directions, so a token the store
  // returns twice (a lawful duplicate, `docs/specs/storeroom-js/surface.md §2.4` rule 3) reaches the caller as the SAME opaque value.
  // **THE PACKAGE'S OWN REGISTRY, ONE PER INSTANCE** (`surface.md §2.4`): the opaque handle -> the
  // caller's FUNCTION. **`unlisten` withdraws the store-side home entry and NEVER the function** (`docs/specs/storeroom-js/surface.md §2.4`
  // rule 4, `DD-15`), so `unlisten` removes no entry, and a re-registration of a handle REPLACES its entry
  // (rule 2, never a fan-out). **⟶ AND `off` — the ONE declared member that DOES remove an entry —
  // removes THE ONE THE HANDLE NAMES** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (b); `DD-53`), while the instance's own state is
  // still released with the instance and by nothing else (`DD-17`; `A74`: `off` is not a release verb).
  // **⟶ AND `withheld` IS GONE WITH THE ADOPTION MACHINERY, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.4` item 9's
  // adoption-machinery clause, whose item `(i)` disposes of this very name: *"the WITHHOLD as a declared
  // STATE is WITHDRAWN WITH THE MEMBER THAT HELD IT"*). **NO WRITE-IN-FLIGHT SET, NO LEDGER AND NO DELIVERED
  // MARK STANDS ON THIS INSTANCE**: the kernel drives every write and its terminal arm is the delivery's one
  // instant, so the entry has nothing to withhold.
  // **`constraints` IS THE ENTRY'S OWN REGISTRY OF THE PAIRS IT CARRIES** (`surface.md §2.12` item 1's
  // preamble clause (a)–(b)): keyed by `(address, id)`, holding the pair's element and ITS address's own
  // spelling. **⟶ FROM 2026-10-18 IT IS A READ MODEL AND NOTHING MORE** (`docs/specs/storeroom-js/surface.md §2.12` item 1's amended clause
  // (iii)): the write path reads the STORE'S OWN `triggered` set and the KERNEL'S registry, and **NO
  // WRITE-PATH BRANCH OF THIS FILE IS TAKEN ON THIS MAP'S CONTENTS** — its one reader is `a.constraints()`.
  // **IT IS POPULATED BY THE ONE ACT BOTH ROUTES REACH AND BY NOTHING ELSE** (`carryConstraint` below), and
  // **`leg` IS THE SLOT THE NESTED FOUR-POSITION CALL THE KERNEL'S STORE LEG MAKES LEAVES ITS OWN RETURNED
  // RECORD IN**, so that a kernel-driven write answers the record its own write returned rather than a copy
  // of it (`docs/specs/storeroom-js/surface.md §2.12` item 1's stage 2).
  //
  // **⟶ AND THE ADOPTION MACHINERY IS REMOVED WHOLE, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.4` item 9's adoption-machinery
  // clause, the three architect's rulings of that date): **`withheld`, `adopted`, `answered` and `delivered`
  // are GONE WITH `settle`**, because they existed only to marshal ONE delivery BETWEEN TWO ACTORS — a
  // caller who made a bare write and a kernel which drove the other. **RULINGS `(2)` AND `(3)` LEAVE ONE
  // ACTOR**: the kernel drives every write, so there is nothing to marshal and the machinery has no state to
  // hold. **THIS IS WHERE THE DOWNSTREAM `DEF-D` DEFECT LIVED** — an abandoned adoption consumed by the next
  // unrelated write — and its SUBSTRATE, not its symptom, is what this removal takes.
  // **⟶ `state.tokens` IS DELETED AND `state.registry` TAKES THE ONE MAP'S SHAPE — `U-STOREROOM-HELD-LISTENER-IDENTITY`.**
  // **THE ONE MAP IS `Map<handle, {fn, off}>`, KEYED BY THE HANDLE STRING** (`identity-and-domain.md §4` item
  // 5; `P: docs/pending.md · P-6`, fork (d): *"the map becomes `Map<handle, {fn, off}>`, keyed by the identity
  // the addon also holds"*; `P: docs/pending.md · (AD-1)`: the value record is `{ fn, off }` *"and nothing
  // else. There is no `token` property"*). **`state.home` SURVIVES AS THE MIRROR** — its column is now the
  // CALLER'S OWN HANDLE and not a token (`identity-and-domain.md §1` item 2 (ii)) — **and `state.constraints`
  // stays the read model.**
  // **⟶ AND `establishing` IS ADDED 2026-10-24 (`D-29`) — THE `id` OF THE PAIR THE KERNEL IS RIGHT NOW
  // REGISTERING, AND NOTHING ELSE.** `K-1` calls `store.listen(id, set)` BEFORE `carryConstraint` has written
  // the read-model row, so at that instant the handle names no pair the instance yet carries; **this marker is
  // how `B-6`'s cross-kind test still knows the act is a CONSTRAINT's own registration and not a listener's**
  // (`D-25` rejects a CROSS-KIND overwrite, and a constraint registering itself is same-kind). It holds one
  // `id` at a time because a construction and every add are sequential, is cleared in a `finally`, and is not
  // a member of the product.
  const state = {
    home: [], registry: new Map(), constraints: new Map(), leg: null, receiver: null, establishing: null,
  };
  // **⟶ THE RECEIVER IS THE STORE OBJECT ITSELF, AND THE INTEGER THE PACKAGE USED TO HAND ACROSS IS NOT
  // HANDED AT ALL** (`receiver-and-refusal.md §1`; `js-unwrap.md §4`). The addon resolves its store from the
  // receiver, reading the index the package published as the object's own NON-ENUMERABLE row (`STORE_INDEX`
  // below) — so **`state.id` HAS NO SITE LEFT IN THIS FILE**, and the object IS the carrier.
  //
  // **AND THE ARGUMENT THAT USED TO BE THE INTEGER IS NOT REPLACED BY A DIFFERENT ONE ON A DIFFERENT
  // CHANNEL:** the addon's per-verb entries read the store from position `0` of the call array, and position
  // `0` is this object. **NO ENTRY CARRIES A LEADING INSTANCE POSITION** (`export-set-and-dispatch.md §4`).
  const instance = {
    /// **`surface.md §2.4` item 9 (f)'s clause of 2026-10-18 — THE PRODUCT'S DECLARED MEMBER SET IS TWELVE
    /// OWN MEMBERS, `10 + 1 + 1 = 12` ✓: THE TEN METHODS, `register` AND `constraints`.** **`settle` IS
    /// REMOVED WHOLE** (`REMOVED-WHOLE`, item 9's pointer of that date): the member set moved `13 → 12`, and
    /// **THE TWO REMAINING SINGLES ARE NAMED** because *"a lone `+1` would not compute"* — the first `1` is
    /// `register` and the second is `constraints`, the registered-constraint read. Each is reached through
    /// THIS factory's own product alone (`package.md §1.3` item 3): the module namespace carries ONE name,
    /// `storeCreate` (`docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause; `11 → 1` ✓, and *"a deprecation window"* is declared
    /// away at that clause on `A128`'s fiat), so NO member below is a named export and the ten
    /// store-reaching names have no second spelling at any layer.
    /// **THE STATE STAYS PRIVATE** (`docs/specs/storeroom-js/surface.md §2.1` (e) item 1): `state` below is this factory's own closure and is
    /// keyed in `INSTANCES` — NO own member is store data, a record, a Map, a Set, a tier, an address, a
    /// handle or a commit, and the twelve members above are the whole of what a caller sees.
    /// **`on` AND `off` ARE MERGED AWAY AND ARE NOT MEMBERS** (`A127`): the listener registration route is
    /// `listen` + `register` and its withdrawal is `unlisten`, exactly as the seven store-reaching methods
    /// and `register` below spell them.
    // ⟶ MOVED 2026-10-18 (`RCA-8(g)`, gate-4 finding F-1): the `A127` region header stood here, above the free-function list `P-8` deleted, and its second half — the call-arity sentence that named the receiver's argument count `n`, and the arity-fold sentence that read the `n`-as-written folds against that count minus one — is falsified by that merge: no such `n` binding exists on this object and no function stands below. Bytes: archive/p8-merge/2026-10-18/post-gate4/region-header-live.md (pre-move copy: archive/p8-merge/2026-10-18/blocks/region-header.md). The `A127` rule it stated stands at this factory's own member doc above.
    /** `docs/specs/storeroom-js/surface.md §2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register. */
    read(address, tier) {
      // A position the call supplied no value for is handed as the runtime's own `undefined` — NEVER as an
      // absent array slot — so the facade can tell an unsupplied position from a supplied `undefined` and the
      // core is never reached with a null pointer (`crossing.md §1.3`'s absent-versus-`undefined` rule).
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      // `PAR-JS-6`: a SUPPLIED `undefined` at this position is PRESENT and takes the row's own
      // `AddressMalformed`; the NO-ARGUMENT call is the one that folds to the ABSENT row.
      // **⟶ AND THE ARGUMENT LIST IS EXTENDED BY INDEX, NOT BY `Array.prototype.push`** (`contract.md §2.1`'s
      // clause of 2026-10-24 on `F7-1`, item `(1b)`, and the battery's row `(g)`): the as-built `args.push`
      // was a member of a MUTABLE PROTOTYPE read by every verb, and a caller's `push` answering `0` without
      // copying EMPTIED the carrier list before any verb was reached — so an admitted write answered
      // `AddressMalformed: 'tier' requires a tier argument`. `args[args.length] = …` is item `(1c)(v)`'s own
      // index write on a local array.
      args[args.length] = encodeTier(tier, arguments.length >= 2, false, 'first argument');
      // **⟶ AND THE ENTRY IS INVOKED BY `Reflect.apply`, NEVER BY AN ARGUMENT SPREAD** (`contract.md §2.1`'s
      // clause of 2026-10-24 on `F8-1` and `F8-2`, items `(1b)`, `(1c)` and `(1d)`'s boundary; the cells
      // `JC-TC-64`, `JC-TC-65` and `JC-TC-66`): `…args` reads the local list through
      // `Array.prototype[Symbol.iterator]` BEFORE any verb is reached, so a forged iterator handed `undefined`
      // at every position and an admitted `write` was refused `AddressMalformed` (*"'tier' requires a tier
      // argument"*) — the argument list was the caller's answer. **`Reflect.apply` reads the list BY INDEX**
      // (`CreateListFromArrayLike`: the array's own `length` and its own indices), which is item `(1c)(v)`'s own
      // form, and `Reflect` is a GLOBAL BINDING whose `apply` is its own DATA property — not a prototype member,
      // which is exactly where item `(1d)`'s boundary stops a sweep. No position, no arity fold and no
      // absent-versus-`undefined` answer moves: the entry receives the same list it always received.
      return decodeValue(carryRefusal(() => Reflect.apply(entryOf().read, this, args), args));
    },
    /** `docs/specs/storeroom-js/surface.md §2.2` / `docs/specs/storeroom-js/surface.md §2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`. */
    readLiteral(address, tier) {
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      args[args.length] = encodeTier(tier, arguments.length >= 2, false, 'first argument');
      // THE ENTRY IS INVOKED BY `Reflect.apply`, NOT BY A SPREAD — see `read`'s clause of 2026-10-24 above.
      return decodeValue(carryRefusal(() => Reflect.apply(entryOf().readLiteral, this, args), args));
    },
    write(address, tier, value, commit) {
      // **⟶ THE RECEIVER IS CHECKED HERE, BEFORE EITHER ROUTE IS CHOSEN — `write` IS THE ONE MEMBER WITH TWO
      // OF THEM.** Its three-position call reaches the STORE through the KERNEL (`constraintWrite`) rather
      // than through its own entry, so **a receiver check taken only at the entry would leave the kernel route
      // open to a DETACHED call — and a detached `write` that ANSWERS is exactly `receiver-and-refusal.md §7`'s
      // named regression read backwards** (*"`const { read } = layout; read(…)` IS LEGAL TODAY AND THROWS
      // AFTER THIS CHANGE"*), and `P-SAS-4`'s failure list names *"a success"* as its third term. **THE CHECK
      // IS `§3`'s ONE ARM AND ASKS ONLY WHETHER THE CALL SUPPLIED THE STORE OBJECT AS ITS RECEIVER**: the
      // kernel route is the package's own and still needs the same object, so the route is chosen only after
      // the receiver is known to be one. **NO TOKEN IS MINTED AND NO SECOND FORM IS BUILT** — the entry's own
      // refusal is what answers, reached by handing the receiver on.
      if (!isStoreReceiver(this)) return decodeValue(carryRefusal(() => entryOf().write.call(this), []));
      // **⟶ `§4.1`: `write` OPENS ONE — AND A KERNEL-DRIVEN WRITE JOINS THE EXTANT RATHER THAN OPENING A
      // SECOND.** The bracket is taken at this member's OWN opening, so the kernel's four-position leg and a
      // listener body's nested write both find the count above zero and join it (`openCommit`). **THE
      // DECREMENT IS ON THE FINAL RETURN TO THE CLIENT** (`closeCommit`), taken in a `finally` so the bracket
      // is released on every arm — a count left standing after a return is on `§5`'s failure list.
      const opened = openCommit(instance);
      try {
      // **⟶ `docs/specs/storeroom-js/surface.md §2.12` ITEM 1, STAGE 1, AMENDED 2026-10-18 — THE ENTRY→KERNEL EDGE IS UNCONDITIONAL: EVERY
      // FOUR-POSITION WRITE ENTERS THE KERNEL'S `K-2`, AND THE `carriesConstraintAt` GATE THIS VERB ONCE TOOK
      // BEFORE THE CALL IS REMOVED.** The architect's ruling, verbatim: *"Always route to the kernel, because the
      // JS code does not decide whether constraints trigger."* — and its sibling, *"The kernel is always
      // supposed to be in the middle. Any occasion where the write path is not governed by the kernel is a
      // hallucination."* **SO THE JS DECIDES NOTHING ABOUT WHETHER A CONSTRAINT TRIGGERS**: the STORE'S OWN
      // `triggered` SET and the KERNEL'S OWN PAIR-KEYED REGISTRY are the trigger authority (`docs/specs/storeroom-js/surface.md §2.12` item 1's
      // amended clause (iii)), and `state.constraints` is a READ MODEL for `a.constraints()` and for nothing on
      // this path. **AN INSTANCE THAT CARRIES NO PAIR AT THIS ADDRESS STILL ENTERS THE KERNEL**: the pass over an
      // address with no registered pair evaluates NOTHING and PASSES, and the write proceeds to the terminal arm's
      // delivery exactly as `docs/specs/storeroom-js/surface.md §2.7` items 6–7 declare (amended clause (ii)).
      //
      // **AND THE FIVE-POSITION CALL IS THE KERNEL'S OWN STORE LEG AND NEVER ENTERS `K-2`** — item 1's stage `4`
      // no-recursion clause, which this edit leaves UNMOVED: *"a five-position call can never start a second pass
      // — and the call that carries an ADOPTED identity is item 3's own, so there is no recursion and need not be
      // one"*. **THAT EXCLUSION IS THE CLAUSE'S AND NOT THIS TEST'S**: the gate removed above was an
      // ADDRESS-CARRYING test, and the position test below is the one stage `4` declares. `K-2` calls this very
      // `write` with FOUR positions (`src/constraint-kernel.mjs`'s `store.write(address, tier, value, record)` is
      // the method's own four, the `instance` receiver not being a position of it), so the kernel's leg reaches
      // `constraintWrite` NOT AT ALL: it reaches the store verb through the `n <= 3` arm below, and the recursion
      // stage `4` forbids is unreachable BY POSITION and not by a registry's contents.
      //
      // **⟶ AND THE FIFTH POSITION'S CLASS TEST IS TAKEN HERE, BEFORE THE ROUTE IS CHOSEN, BECAUSE IT IS THE
      // POSITION'S AND NOT THE ROUTE'S** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1; `§2.20`'s answer cell): **a SUPPLIED COMMIT
      // THAT IS NOT A RECORD POSITION IS REFUSED ON BOTH PATHS THE SAME WAY** — the routing amendment removed an
      // ADDRESS-CARRYING gate and touches no class test, and a drive that supplied an invalid commit to a
      // no-pair instance asserted the refusal before this date and asserts it after (`a127`'s two
      // fifth-position cells). **THE REFUSAL LEAVES NO LANDING AND NO ADOPTION TO RELEASE**: nothing is opened
      // and nothing is put in flight, which is the whole of what the machinery's release used to secure.
      if (arguments.length >= 4) {
        const refusal = commitPositionRefusal(commit);
        if (refusal !== null) throw refusal;
      }
      // **⟶ AND THE BOUNDARY'S OWN WALK IS TAKEN BEFORE THE ROUTE IS CHOSEN, WHICH IS THE ONE THING THE ROUTING
      // AMENDMENT MOVES OUT OF THE ORDER IT STOOD IN** (`§2.5` item 5 (a)–(c); `docs/specs/storeroom-js/surface.md §2.2` clause 3). **THE ENTRY'S OWN
      // POSITIONS ARE ENCODED HERE, ONCE, FOR BOTH PATHS**: the four-position call enters the kernel with values
      // THIS BOUNDARY HAS ALREADY ADMITTED, so an outside address still answers the store's `AddressMalformed`
      // with the FAILING TARGET and the ARGUMENT POSITION in it (`§2.5` item 5 (a)–(b); `convenience.test.mjs`'s
      // `AddressArg` rows drive exactly this), **and a route to the kernel can never be a route AROUND the
      // boundary's own class tests.** **NOTHING IS DECIDED TWICE: the encoders are total over the positions and
      // their answers are the store's own, so the kernel receives the same values the bare path always built.**
      // ⟶ `subject` is `contract.md §2.1`'s clause of 2026-10-24, item `(2)`'s slot: `null` means "render the
      // failing target" and any string means "the arm declared its own PART ONE subject" (`DEF-2026-10-24-D`).
      const fault = { found: null, value: undefined, path: [], subject: null, nodes: 0 };
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      // `PAR-JS-7`: `write`'s tier is REQUIRED — an ABSENT position and a SUPPLIED `undefined` both answer
      // `AddressMalformed`, and neither folds.
      args[args.length] = encodeTier(tier, arguments.length >= 2, false, 'first argument');
      // THE WALK'S OWN FAULT RECORD — see `refusedValue`: the walk CLASSIFIES and RECORDS, and the record is
      // read at the one site where the store answered `ValueNotAdmitted` for a value the walk refused.
      // **⟶ AND THIS EXTENSION IS THE SAME INDEX WRITE** (`F7-1`, item `(1b)`): a no-op `push` dropped the
      // VALUE position too, so the admitted drive lost its crossed member and not merely its tier.
      args[args.length] = encodeValue(value, [], 0, [], fault);
      // **THE VALUE REFUSAL IS ANSWERED BEFORE ANY VERB** (`parameter-semantics.md §3`): the carrier positions
      // above have already answered in their own order, so this keeps `write(undefined, 'mem', null)` on the
      // carrier row and never lets a refused tree reach the store.
      if (fault.found !== null) valueReject(fault);
      if (arguments.length <= 3) {
        return constraintWrite(state, instance, address, tier, value);
      }
      let answer;
      try {
        // **`write`'S OWN ENTRY, CALLED DIRECTLY BY ITS OWN NAME** (`js-unwrap.md §5`) — the `writeCall`
        // wrapper that stood here is deleted (`§1`), **and its `ValueNotAdmitted` re-render moves into this
        // member's own body** (`§3`), which is where `P-SAS-8` drives it. **THE FIVE POSITIONS ARE THE VERB'S
        // OWN AND THE FIRST ARGUMENT IS THE STORE OBJECT THE PACKAGE RETURNED** (`receiver-and-refusal.md
        // §1`): no instance position stands among them (`export-set-and-dispatch.md §4`).
        // **THE ENTRY'S OWN POSITIONS ARE THE ENCODED ARRAY BUILT ABOVE, APPLIED BY INDEX** — the SAME values
        // both routes carry, so the entry receives exactly what the kernel leg receives and **nothing is
        // decided twice** (`§2.5` item 5 (a)-(c)). **A POSITION THE CALL DID NOT SUPPLY IS HANDED AS THE
        // RUNTIME'S OWN `undefined`**, which is this boundary's declared protocol for a short call. **AND THE
        // LIST IS APPLIED AND NOT SPREAD** (`Reflect.apply` — see the `read` member's clause of 2026-10-24):
        // a spread consumes the encoded array through `Array.prototype[Symbol.iterator]` BEFORE the store is
        // ever reached, so a forged iterator dropped the tier and refused an admitted write.
        answer = Reflect.apply(entryOf().write, this, args);
      } catch (refusal) {
        // **⟶ AND THE RELEASE AN ABANDONED ADOPTION ONCE NEEDED IS GONE WITH THE MACHINERY, 2026-10-18.** The
        // catch this replaces released *"the adoption it was taken for"* — an identity `settle` had put in
        // flight and this write then failed to claim. **WITH `settle` REMOVED THERE IS NO ADOPTION TO RELEASE**
        // (`docs/specs/storeroom-js/surface.md §2.4` item 9's adoption-machinery clause; the three architect's rulings of that date), so the store's
        // own refusal crosses back UNCHANGED AND UNCONVERTED and this frame adds nothing to it.
        // **AND THE ONE DECLARED EXCEPTION IS TAKEN HERE** — the `writeCall` arm, moved not dropped.
        writeRefusal(refusal, fault);
        throw refusal;
      }
      const watched = [];
      // **⟶ AND THE WATCH SET IS DECODED BY INDEX, NOT BY `.map`** (`contract.md §1`'s clause of 2026-10-24 on
      // `F-RA-3`, item `(3)`; and `§2.5` item 5 (e), a rejection is never a raw host error): a caller-side
      // `delete Array.prototype.map` reached this read through the reply array's own chain and threw a raw
      // `TypeError` out of a write the walk had ADMITTED.
      // **⟶ AND THE APPEND IS AN INDEX WRITE, NOT `Array.prototype.push`** (`contract.md §2.1`'s clause of
      // 2026-10-24 on `F8-1`, items `(1c)(i)` and `(2b)`'s row `57`; arm `(xviii)`, cell `JC-TC-64`): the loop
      // enclosing it was already the lawful form and the append was not, so a no-op `push` silently emptied
      // the record's watch set while the write itself stayed admitted and durable.
      for (let i = 0; i < answer.watched.length; i += 1) {
        watched[watched.length] = decodeSegments(answer.watched[i]);
      }
      const record = {
        op: decodeJournalOp(answer.op),
        watched,
        triggered: crossTriggered(state, answer.triggered),
      };
      // **AND THE RECORD IS LEFT IN THE SLOT THE KERNEL'S STORE LEG READS** (`state.leg`; `docs/specs/storeroom-js/surface.md §2.12` item 1's
      // stage 2): a kernel-driven write takes the record THIS VERY WRITE returned and not a copy of it, and the
      // slot is read before the pass that may write again, so a repair's own write can never be mistaken for it.
      state.leg = record;
      // **THE INVOCATION WINDOW** (`docs/specs/storeroom-js/surface.md §2.7` item 2, `DD-22`): the record above is COMPLETE before the window
      // opens, the invocation is SYNCHRONOUS, it happens AFTER the addon's call returned, and **its ONE
      // argument is the TRIGGERING ADDRESS** (`PAR-JS-12`).
      //
      // **⟶ AND THE DELIVERY DOES NOT HAPPEN IN THIS FRAME FOR A KERNEL-DRIVEN WRITE, 2026-10-18 — IT HAPPENS AT
      // THE KERNEL'S TERMINAL ARM, WHICH IS `docs/specs/storeroom-js/surface.md §2.7` ITEM `7`'s ONE HOME** (`§2.4` item 9's adoption-machinery
      // clause; `docs/specs/storeroom-js/surface.md §2.7`'s clause of that date, item `3`: *"so the entry stops DECIDING whether to honour a
      // delivery and SIMPLY PERFORMS THE ONE THE KERNEL TRIGGERS"*).
      //
      // **THE RULE IS THE WINDOW'S AND NOT A FLAG'S:** every write this file performs is now KERNEL-DRIVEN
      // (`docs/specs/storeroom-js/surface.md §2.12` item 1's amended stage `1`), and the kernel reaches this verb as ITS OWN STORE LEG — the
      // `n >= 4` arm above, whose `commit` is the kernel's own record. **SO THIS FRAME IS THE LEG AND ITS DELIVERY
      // IS WITHHELD BY THE DECLARED INSTANT AND NOT BY A WITHHOLD SET**: `docs/specs/storeroom-js/surface.md §2.7` item 7 declares that for a record
      // carrying a kernel evaluation set the package's delivery *"does NOT occur inside the store verb's window:
      // it follows the pass"*. **THE LEG THEREFORE INVOKES NOTHING, AND `terminalArm` PERFORMS THE ONE DELIVERY
      // THE KERNEL TRIGGERS** — `record.pending`'s residue plus the checked-off identities — where the pass has
      // completed and the discard and the check-off have already decided what the set holds.
      //
      // **AND A WRITE WHOSE `commit` THE KERNEL DID NOT SUPPLY IS STILL DELIVERED HERE, AT ITS OWN POST-VERB
      // INSTANT** (`docs/specs/storeroom-js/surface.md §2.7` item 2): that is the `n <= 3` caller path never reaching this frame at all, so THIS
      // frame is reached only as the kernel's leg and its silence is total. **THE ONE INVOCATION PER DISTINCT
      // IDENTITY RULE `deliver` enforces is thus never asked to dedupe two windows, because only one window
      // exists** (`docs/specs/storeroom-js/surface.md §2.4` rule 3; `deliver` below).
      return record;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM, `tiers` in the store's canonical order,
    /// and the in-domain no-op arm a SUCCESS returning `tiers: []`. **Its declared NAME is `delete`, and it is
    /// published under that name ALONE** (`package.md §1.3` item 3): `deleteOp` is a reserved-word workaround
    /// for the declaration and never a member of the package's namespace.
    delete(address, tier) {
      // **⟶ `§4.1`: `delete` OPENS ONE.**
      const opened = openCommit(instance);
      try {
        const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
        // `delete`'s tier is read as a VALUE and not by an arity fold: an ABSENT position is the whole-target
        // removal, and a supplied `undefined` answers row 4's `AddressMalformed` (`crossing.md §1.3`).
        args[args.length] = encodeTier(tier, arguments.length >= 2, false, 'first argument');
        // THE ENTRY IS INVOKED BY `Reflect.apply`, NOT BY A SPREAD — see `read`'s clause of 2026-10-24 above.
        const answer = carryRefusal(() => Reflect.apply(entryOf().delete, this, args), args);
        const receipt = {
          address: decodeSegments(answer.address),
          tiers: answer.tiers,
          triggered: crossTriggered(state, answer.triggered),
        };
        // `A43`: a delete FIRES its own triggered set, on the same window as a write (`docs/specs/storeroom-js/surface.md §2.7` item 2).
        deliver(state, receipt.triggered, answer.triggeringAddress);
        return receipt;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`docs/specs/storeroom-js/contract.md §2.6`).
    rollback(opId) {
      const args = arguments.length >= 1 ? [encodeOpId(opId)] : [];
      // THE ENTRY IS INVOKED BY `Reflect.apply`, NOT BY A SPREAD — see `read`'s clause of 2026-10-24 above.
      const answer = carryRefusal(() => Reflect.apply(entryOf().rollback, this, args), args);
      return {
        opId: answer.opId,
        undoneOps: answer.undoneOps,
        restoredTo: decodeBaseState(answer.restoredTo),
      };
    },
    /// **⟶ `listen(handle, addresses) -> undefined` — arity `2`, position `1` a caller-spelled string and
    /// position `2` a SET of addresses** (`contract.md §2.2`; `listen-verb.md §1` item 1; `PAR-HL-1`,
    /// `PAR-HL-2`, `PAR-HL-3`).
    /// **⟶ `listen(handle, addresses) -> undefined` — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`),
    /// `contract.md §2.2` (`HL-2`).** **THE ARITY FIGURE MOVES `1 → 2`**: position `1` is `handle`, a non-empty
    /// `string` in `HL-1`'s domain; position `2` is `addresses`, a SET of addresses. **THE RETURN IS `undefined`**
    /// — *"the caller supplied the handle, so returning it would be a second spelling of the caller's own
    /// datum"* (`contract.md §2.2` item 10; `PAR-HL-3`).
    ///
    /// **THE TWO CLASS TESTS PRECEDE EVERY STORE ACT** (`listen-verb.md §2.2` item 3: *"a refused `listen`
    /// changes nothing: no entry, no mirror row, no purge"*), and **the order is PURGE THEN INSTALL, inside the
    /// store's own verb** — so no observable instant holds both (`contract.md §2.2` item 4).
    ///
    /// **⟶ AMENDED 2026-10-24 (`D-29`, verbatim: *"Listen cannot overwrite constraint, only other listeners"*):
    /// THE SENTENCE ABOVE IS NARROWED, NOT WITHDRAWN, AND IT IS STILL PRINTED — *"`listen` GAINS NO CONFLICT TEST
    /// AT ALL"* READS **`listen` GAINS NO CONFLICT TEST AGAINST ANOTHER LISTENER, AND GAINS ONE AGAINST A
    /// CONSTRAINT** (`docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 7 stands as text read
    /// THROUGH this clause). **Overwriting a listener with a listener stays LAWFUL** — that is `D-24`'s
    /// same-kind rule — **and overwriting a constraint with a listener is REJECTED** (`B-6`; §2.2 item 7's
    /// *"GAINS NO CONFLICT TEST AT ALL"* was written while a reserved `constraint@` namespace made `listen`'s
    /// reach look anonymous; `D-23` makes the occupancy the caller's own word, so the residual `Q-1` named is
    /// closed here rather than left legible).
    ///
    /// **AND `listen` ANSWERS THE HANDLE IT WATCHES UNDER ON SUCCESS** (`D-22`): the return moves `void →
    /// `Handle`, a success signal that CARRIES the identity, and failure stays the one thrown form.
    listen(handle, addresses) {
      // **⟶ `§4.1`: `listen` OPENS ONE.**
      const opened = openCommit(instance);
      try {
      // ── POSITION 1: THE HANDLE'S CLASS TEST ───────────────────────────────────────────────────────────────
      // **`F-1`: the surface's ONE thrown form with `status` the store's `AddressMalformed`, and NO STATE
      // CHANGED** (`contract.md §4` `F-1`; `§2.1` items 5–6). The predicate is a `typeof` read and a length read
      // and nothing more — no object inspection and no trap (`identity-and-domain.md §2` item 1).
      if (arguments.length < 1 || !inDomainHandle(handle)) {
        boundaryReject(
          'AddressMalformed',
          targetSpelling(handle),
          `listen's first argument is ${classSpelling(handle)}, and a listener's handle is a non-empty string `
            + 'this caller spells',
        );
      }
      // ── POSITION 2: THE SET-POSITION CLASS TEST — A NEW DECLARED FORM ─────────────────────────────────────
      // **`addresses` IS AN ARRAY WHOSE EVERY MEMBER IS AN ADDRESS IN THE STORE'S OWN DOMAIN; THE EMPTY ARRAY IS
      // IN THE DOMAIN** (`listen-verb.md §2.2` item 1; `PAR-HL-2`). **THE DISCRIMINATOR IS THE MEMBER'S CLASS,
      // READ ONCE PER MEMBER — never a length heuristic and never a coercion** (`listen-verb.md §2.2` item 4).
      if (arguments.length < 2 || !isAdmittedArray(addresses)) {
        boundaryReject(
          'AddressMalformed',
          targetSpelling(addresses),
          `listen's second argument is ${classSpelling(addresses)}, and this position is a SET of addresses — `
            + 'an array of addresses, the empty array included',
        );
      }
      for (let i = 0; i < addresses.length; i += 1) {
        // **A BARE SEGMENT LIST IS OUTSIDE THE DOMAIN** — *"the position is a set and a segment list is a
        // different shape"* (`P: docs/pending.md · P-7`'s set ruling, consequence (ii); `listen-verb.md §2.2`
        // item 2, class (vi)). **THE MEMBER'S CLASS IS WHAT DECIDES IT AND NOT ITS LENGTH.**
        if (!isAdmittedArray(addresses[i])) {
          boundaryReject(
            'AddressMalformed',
            targetSpelling(addresses[i]),
            `listen's second argument carries ${classSpelling(addresses[i])} at member ${i}, and a set's member `
              + 'is an address — an array of segments',
          );
        }
        if (!inDomainAddress(addresses[i])) {
          boundaryReject(
            'AddressMalformed',
            targetSpelling(addresses[i]),
            `listen's second argument carries an address outside the store's domain at member ${i}`,
          );
        }
      }
      // ── `B-6` — THE CROSS-KIND REJECTION, AND ITS INSTANT IS THE ONE THAT MATTERS ─────────────────────────
      // **⟶ THE SIXTH REFUSAL ARM, ADDED 2026-10-24 (`D-29`, verbatim: *"Listen cannot overwrite constraint,
      // only other listeners"*).** Its instant is declared and load-bearing: **AFTER the handle's class test
      // and the set's domain test, and BEFORE the purge — the act must not destroy what it may not
      // overwrite.** **Its member follows the principle `docs/L1/surface-deltas.md` already declared — the
      // member follows the ACT'S SUBJECT: `listen` is a SINGLE REGISTRATION, so it takes the handle domain's
      // member `AddressMalformed`, exactly as `B-5` (`register`) does.** **NO STATE MOVES**: no store act, no
      // mirror row, no registry write, and the entries the purge would have reached all still stand.
      //
      // **BOTH DIMENSIONS ARE TESTED** (`D-29`'s stated reading: *"both, because under `D-29` the handle and
      // the `id` are one string and an identity collision names the same entry an address collision does"*):
      // **the handle equalling a standing constraint's `id`**, and **the set naming an address a standing
      // constraint's home entry occupies**. **AND THE ONE ACT BOTH DIMENSIONS MUST ALLOW IS THE KERNEL'S OWN
      // RE-LISTING OF A PAIR** — `K-1` calls `store.listen(id, set)` with exactly that pair's own `id` and its
      // own accumulated set, and `constraintOn`'s enable arm and `restoreHeldPair`'s wake re-list a pair whose
      // registration stood a moment earlier. That act **destroys nothing**: the set covers every address the
      // pair stands at and the handle IS the pair's own, so it is a same-kind re-assignment and not a
      // cross-kind overwrite. The exemption is therefore the PURGE's own test — *would this act destroy an
      // entry it may not overwrite?* — and not a reserved namespace.
      const overwritten = constraintOverwrittenByListen(state, handle, addresses);
      if (overwritten !== null) {
        boundaryReject(
          'AddressMalformed',
          spellConstraintAddress(overwritten.address),
          `the listener '${handle}' cannot be installed at ${JSON.stringify(overwritten.address)}: the constraint `
            + `'${overwritten.id}' stands there, and a listener and a constraint do not share one`,
        );
      }
      // ── THE ONE STORE ACT: PURGE, THEN INSTALL, INSIDE THE STORE'S OWN VERB ───────────────────────────────
      // The set crosses AS ENCODED ADDRESSES, one per member, in the caller's own order (`PAR-HL-2`'s referent:
      // the whole set and never a delta).
      const encoded = [];
      for (let i = 0; i < addresses.length; i += 1) {
        encoded.push(encodeAddress(addresses[i], 'second argument', 'second argument'));
      }
      carryRefusal(() => entryOf().listen.call(this, handleWire(handle), encoded), [handleWire(handle)]);
      // ── THE PACKAGE'S OWN HOME MIRROR ────────────────────────────────────────────────────────────────────
      // **THE MIRROR'S COLUMN IS THE CALLER'S OWN HANDLE AND NOT A TOKEN** (`identity-and-domain.md §1` item 2
      // (ii)), and **THE PURGE REACHES IT**: every row the handle named is dropped before the set's own rows are
      // recorded, which is the same wholesale assignment the store performed (`listen-verb.md §3` item 1's four
      // structures). **THE `some(key)` GUARD IS GONE WITH `first_at`** (`P: docs/pending.md · R-B1`, deletion
      // part (b)): with the idempotence deleted the mirror records one row per address in the act's own set, so
      // N addresses answer N rows for ONE handle (`listen-verb.md §6` item 4 (iv)).
      state.home = state.home.filter((row) => row.handle !== handle);
      for (let i = 0; i < addresses.length; i += 1) {
        state.home.push({ key: homeAddressKey(addresses[i]), address: addresses[i].slice(), handle });
      }
      // ── THE ENTRY'S FIRST STATE: RESERVED ────────────────────────────────────────────────────────────────
      // ***"`listen` WRITES THE ENTRY WITH `off` SET — the reservation"*** (`P: docs/pending.md · P-5`, the
      // entry-shape ruling; `contract.md §2.2` item 5 (a); `identity-and-domain.md §2` item 5). **AN ENTRY WITH
      // NO FUNCTION IS NOT A LAWFUL VALUE, so the state `listen` creates is an entry that EXISTS AND IS OFF** —
      // which is exactly what the ruling provides. **AND A REPEATED `listen` RE-RESERVES THE ENTRY**: it is a
      // purge then a fresh reservation, never a fast path (`P: docs/pending.md · (R1)`, its own closing
      // sentence; `contract.md §2.2` item 3).
      state.registry.set(handle, {
        fn: undefined,
        off: true,
        // **THE SET THE LAST `listen` GAVE THE HANDLE** — the referent `PAR-HL-2` names (*"the set of addresses the
        // handle stands at after this act — the whole set, never a delta"*), and the one datum `register` reads to
        // re-install a reserved entry's store side.
        addresses: addresses.map((address) => address.slice()),
      });
      // **⟶ AND IT ANSWERS THE HANDLE IT WATCHES UNDER — `D-22`'s `void → Handle`, 2026-10-24.** *"Listen should
      // return the handle on success, or error message on fail."* **A SUCCESS SIGNAL THAT CARRIES THE
      // IDENTITY, AND NOT AN ECHO TO BE SUPPRESSED**: the value the caller spelled is the identity the store
      // holds for that entry, and it is what `K-1` ADOPTS (`const adopted = store.listen(id, set)`), which is
      // what `kernel-surface.md` declared all along — *"adopted, never minted by the kernel"*.
      return handle;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `docs/specs/storeroom-js/surface.md §2.3` item 4 / `PAR-JS-8`: **`unlisten` over ANY value outside the domain is a NO-OP SUCCESS** — a
    /// foreign instance's value, a prior session's value, a fabricated value, a blank string, a non-string and
    /// an absent handle are EACH a no-op success, no code is produced, and NO OTHER REGISTRATION IS REMOVED.
    ///
    /// **⟶ AND THE SAME VALUE THAT IS A SILENT SUCCESS HERE IS A THROWN FAILURE AT `removeListener` — TWO
    /// DISPOSITIONS FOR ONE ARGUMENT IN ONE PRODUCT, and that reversal is RULED, not accidental**
    /// (`P: docs/pending.md · P-5`'s `(R2)`, verbatim; `contract.md §2.1` item 5's closing clause).
    ///
    /// **THE WITHDRAWAL'S OWN MODEL, IN THIS CHANGE'S TERMS** (`P: docs/pending.md · P-5`'s A4 ruling, verbatim:
    /// *"`unlisten` sets `off` only when the identity no longer stands anywhere, exactly as `:2320`'s survivor
    /// re-scan decides today"*): **the store's entry is withdrawn and the MAP ENTRY IS KEPT with `off` set — a
    /// reservation, not a deletion** (`identity-and-domain.md §3` item 2 (i); `listen-verb.md §4` state `1`).
    unlisten(handle) {
      // ═════════════════════════════════════════════════════════════════════════════════════════════════════
      // **⟶ THE RECEIVER IS CONSULTED FIRST, BEFORE EITHER DOMAIN DISJUNCT — THIS IS `§3`'s ONE ARM AND IT IS
      // THE ORDER ITS SEVEN SIBLINGS ALREADY KEEP** (`docs/specs/storeroom-addon-surface/receiver-and-refusal.md
      // §3`: *"A CALL WHOSE RECEIVER NAMES NO LIVE STORE REFUSES, IN THE ONE DECLARED FORM."*; `§5`: *"The
      // refusal fires only when the receiver names nothing at all."*).
      //
      // **THE DEFECT THIS ORDER CLOSES, NAMED AT ITS OWN MECHANISM:** the domain short-circuit below answers
      // `undefined` on EITHER disjunct — a non-string/blank handle, or a well-formed string `state.registry`
      // does not carry — and it did so BEFORE `carryRefusal` could hand the receiver to the entry. **SO A CALL
      // WHOSE RECEIVER NAMES NO STORE ANSWERED INSTEAD OF REFUSING** whenever its handle was outside this
      // instance's own map, which is the DETACHED CALL `§7` NAMES AS THIS UNIT'S ONE DECLARED COST (*"`const {
      // read } = layout; read(…)` IS LEGAL TODAY AND THROWS AFTER THIS CHANGE"*) and is `P-SAS-4`'s failure
      // list's third term, *"a success"*. **A CALLER WHO HAS LOST ITS OBJECT HAS NO WAY TO KNOW WHICH STORE'S
      // HANDLE IT IS HOLDING**, so the fabricated-handle row is exactly the value a detached call carries —
      // which is why the two clauses collided here and at no sibling.
      //
      // **AND `§2.3` ITEM 4 IS NOT OVERRIDDEN BY THIS ORDER — IT IS SERVED BY IT** (`docs/specs/storeroom-js/surface.md
      // §2.3` item 4: *"`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS … no code is produced
      // and NO OTHER REGISTRATION IS REMOVED"*). **Its subject is the HANDLE ARGUMENT and its effect clause
      // PRESUPPOSES a live store whose registrations could be removed** — with no receiver there is no store to
      // be a no-op *against*. **SO THE RECEIVER DECIDES THE STORE AND THE HANDLE'S DOMAIN DECIDES THE REST**,
      // which is the one reading that keeps both clauses whole; no amendment is owed and NONE IS MADE HERE.
      //
      // **THE CHECK IS `§3`'s ONE ARM AND MINTS NO TOKEN AND NO SECOND FORM** — it is the same predicate
      // `write` takes at its own first line for the same reason, and a receiver that is not the published one
      // is handed on to the entry, which answers `§3`'s single observable.
      // ═════════════════════════════════════════════════════════════════════════════════════════════════════
      if (!isStoreReceiver(this)) return carryRefusal(() => entryOf().unlisten.call(this, handleWire(handle)), [handleWire(handle)]);
      // **THE DOMAIN TEST IS A DIRECT MAP KEY CHECK** (`P: docs/pending.md · P-6`, fork (g), verbatim: *"the
      // function lookup is now a direct map key check"*): a non-string, a blank string and a string the map does
      // not carry are each the no-op success, and NO OTHER REGISTRATION IS REMOVED (`identity-and-domain.md §6`
      // `O-3`). **IT STANDS BELOW THE RECEIVER CHECK AND NOT ABOVE IT** — a live receiver has established the
      // store by this line, so the no-op success is answered over the HANDLE, exactly as item 4 declares.
      if (!inDomainHandle(handle) || !state.registry.has(handle)) return undefined;
      carryRefusal(() => entryOf().unlisten.call(this, handleWire(handle)), [handleWire(handle)]);
      // THE STORE'S OWN FIRST-MATCH WITHDRAWAL, MIRRORED ENTRY FOR ENTRY (the home holds one row per store
      // entry, so the mirror's own answer is the store's).
      const mirror = state.home.findIndex((row) => row.handle === handle);
      if (mirror === -1) return undefined;
      state.home.splice(mirror, 1);
      // **⟶ AND THE TWO STRUCTURES ARE RECONCILED ON THE MIRROR'S SURVIVORS, WHICH IS THE CLAUSE'S OWN GROUND**
      // (`P: docs/pending.md · P-5`'s A4 ruling, verbatim: *"`unlisten` sets `off` only when the identity no
      // longer stands anywhere, exactly as the survivor re-scan decides today. The flag is per-handle AND
      // per-standing, **which is what the home mirror already computes**"*; `identity-and-domain.md §4` item 4).
      //
      // **THE STORE'S OWN WITHDRAWAL DROPS **ONE** ENTRY AND THE MIRROR DROPS **ONE** ROW** — the two agree
      // entry for entry (`docs/specs/storeroom-native/write-and-read.md §6.5` item 12, cited: *"it drops ONE
      // home-map entry"*; `identity-and-domain.md §6` `O-3`: *"`unlisten`'s no-op success removes no other
      // registration"*). **WHERE SURVIVORS REMAIN, THE ENTRY'S STANDING IS THEREFORE THE SURVIVORS** — so
      // `register`'s re-arm re-installs the addresses the handle STILL stands at and RESURRECTS NONE the caller
      // withdrew. **WHERE NONE SURVIVES, THE ENTRY IS THE RESERVATION `S-6` DECLARES** — *"the entry EXISTS with
      // `off` set; `register(h, fn)` SUCCEEDS and re-arms it"* — so its declared set stands whole and the re-arm
      // re-installs it (`identity-and-domain.md §3` item 2 (i); `contract.md §3` `S-6`; `listen-verb.md §4`'s
      // transition `1 → 2`).
      const survivors = state.home.filter((row) => row.handle === handle);
      // ⟶ REPOINTED 2026-10-18 (`RCA-8(g)`, gate-4 finding F-3): the line anchor `unlisten`'s own doc block carried the pre-merge number the merge left stale — a number that named the survivor re-scan in the pre-`P-8` file and names nothing of the kind after the merge. THE SUPERSEDED NUMBER ITSELF IS NOT RE-EMITTED HERE, and its exact bytes are recorded at archive/p8-merge/2026-10-18/post-gate4/README.md, because a re-emitted stale anchor is a citation a later sweep re-reads as live. It now carries the live line of that site, printed at the last line of this note, and the site is named in prose as well as by number so a future move cannot silently re-break it: THE SURVIVOR RE-SCAN IS THE LINE IMMEDIATELY ABOVE THIS NOTE — `const survivors = state.home.filter((row) => row.handle === handle);`, inside `unlisten`'s own body. Its live line number as this pass leaves the file is `:2320`.
      const entry = state.registry.get(handle);
      if (survivors.length > 0) {
        if (entry !== undefined) entry.addresses = survivors.map((row) => row.address.slice());
        return undefined;
      }
      if (entry !== undefined) entry.off = true;
      return undefined;
    },
    /// `surface.md §2.12` item 2 (a): **`a.addConstraint(pair, constraint) -> constraint identity`** — the
    /// ADD route, which carries the function and OVERWRITES at a pair the entry already holds.
    /**
     * **`docs/specs/storeroom-js/surface.md §2.12` ITEM 2 (a): `addConstraint(pair, constraint) -> constraint identity` — THE ADD ROUTE, WHICH
     * CARRIES THE FUNCTION.**
     *
     * **ITS TARGET STATE AT THE PAIR IS *"the pair's element IS the supplied `constraint`, whether the pair was
     * HELD or NOT"*, AND THE HELD ARM IS AN OVERWRITE AND NOT A THROW**: *"where the pair was already held, the
     * supplied constraint OVERWRITES the held one … and the call REFUSES NOTHING and THROWS NOTHING for the mere
     * fact that the pair was held"* — the SAME identity the pair was already added under is returned, and it is
     * THE IDENTITY AND NOT THE ENTRY RECORD (`PAR-JS-25`'s opacity, `carryConstraint` above).
     */
    addConstraint(pair, constraint) {
      // **⟶ `§4.1`: `addConstraint` OPENS ONE.**
      const opened = openCommit(instance);
      try {
      const site = constraintSite(state, 'addConstraint', arguments.length, pair, constraint);
      // ── `B-4` — `D-25`'S *"VICE VERSA"*: A PAIR WHOSE `id` EQUALS A LIVE LISTENER'S HANDLE ────────────────
      // **⟶ THE FOURTH REFUSAL ARM, ADDED 2026-10-24 — A DIRECTION WITH NO TEST AT ALL UNTIL NOW.** The built
      // surface tested one direction only (`register(handle, listener)` refuses where a constraint stands);
      // `D-25`'s *"or vice versa"* requires the other. **THE INSTANT IS DECLARED AND LOAD-BEARING: AFTER
      // `constraintSite`'s two position class tests have passed and BEFORE the held-pair branch — therefore
      // before `withdrawStanding`'s purge, before `K-1` and before any store call.** **The seam is named
      // because a purge that ran before a cross-kind refusal would destroy a standing registration and then
      // refuse — *"a purge with no add"*, the state `(O-4)`'s ground exists to prevent.**
      //
      // **ITS MEMBER IS `AddressMalformed`**, on this surface's own reading of that member — *"the instance's
      // domain is the domain"* (`R-B4`) — read with `D-24`'s instance-scoped handle: **an `id` that names a live
      // listener is outside this instance's handle domain for a constraint.** It is also the status the
      // register-side sibling answers for the adjacent fact, **so one namespace question does not print two
      // codes.** **NO STATE MOVES.**
      const collided = listenerStandingAt(site.state, site.id);
      if (collided !== null) {
        boundaryReject(
          'AddressMalformed',
          spellConstraintAddress(collided.address),
          `the listener '${site.id}' cannot share its handle with the constraint '${site.id}' at `
            + `${JSON.stringify(collided.address)}: a listener and a constraint do not share one`,
        );
      }
      const held = site.state.constraints.get(constraintPairKey(site.addresses, site.id));
      if (held === undefined) {
        return carryConstraint(site.state, instance, site.addresses, site.id, constraint).identity;
      }
      // ═══════════════════════════════════════════════════════════════════════════════════════════════════
      // **⟶ THE HELD-PAIR ARM IS `CHECK → PURGE → ADD`, AND IT IS THE ONE ORDER THE RULING GIVES**
      // (`P: docs/pending.md · (O-3)`, verbatim: *"Writing a constraint to an existing handle purges everything
      // of the old handle, then adds the new one. Everything, no exceptions, stop inventing ones. Override all
      // conflicting decisions."*; `(O-4)`, verbatim: *"THAT THE ORDER IS CHECK → PURGE → ADD at every site that
      // reaches `K-1` from a held pair"*; `contract.md §2.3` items 1–3).
      //
      // **STEP 1 — CHECK.** **A PURGE THAT RUNS BEFORE THE NEW ELEMENT IS KNOWN-GOOD DESTROYS THE OLD LISTENER AND
      // THEN FAILS TO INSTALL, LEAVING THE ADDRESS BARE — *a purge with no add*** (`(O-4)`, its own ground;
      // `A76`). **THE FOUR PRE-CHECKABLE CLASSES ARE ALREADY PASSED**, because `constraintSite` ran first and
      // refused every outside pair, every out-of-domain address and every non-function (`contract.md §2.3`
      // item 4's four classes; `constraint-sites.md §2` item 1). **THE CHECK'S FAILURE LEAVES THE OLD HANDLE WHOLE,
      // AND THAT IS NOT AN EXCEPTION — it is the ABSENCE of a purge, since nothing was ever purged**
      // (`(O-4)` item (ii), verbatim).
      //
      // **STEP 2 — PURGE.** **EVERYTHING OF THE OLD HANDLE, AT EVERY ADDRESS IT STOOD AT, ACROSS EVERY
      // STRUCTURE.** **THE KERNEL'S OWN ADDRESS ROWS ARE PURGED WITH THE HANDLE** — which is what falsifies
      // `surface.md:872`'s second sentence outright (`(O-3)` item (v): *"AND IT REPLACES NOTHING IN THE KERNEL'S
      // OWN STRUCTURE"* — BOTH SENTENCES GO).
      // **⟶ AND THE CALL CARRIES `K-6`'S DECLARED TWO POSITIONS AND NO THIRD** (`contract.md §2.9` item 3;
      // `remove-member.md §3` item 2's two priced alternatives, both refused): **the former fourth position that
      // suppressed the read-model delete is DROPPED**, because the re-add below writes the same pair identity
      // back through `K-1` and `carryConstraint` (`P: docs/pending.md · (O-3)` item (iv)'s obligation; `(AA-2)`;
      // `contract.md §2.6` item 2).
      // **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling) — `K-6` IS CALLED WHERE A
      // REGISTRATION STANDS, AND A DISABLED PAIR STANDS NONE.** **The disable arm is `remove`-only now, so a pair
      // whose `entry.enabled` is `false` has NO kernel row for `K-6` to find — and `K-6` REFUSES `KC-2` (*"no
      // constraint pair answers to …"*) rather than answering a no-op** (`contract.md §4` `F-12`). **So this
      // overwrite arm purges the pair's OLD registration only where the pair was ENABLED and stands one**
      // (`withdrawStanding` below, which states the rule once for every held-pair purge site). **NOTHING IS LEFT
      // UNPURGED BY THE GUARD:** where the pair is disabled there is nothing to withdraw, and the ADD below lands
      // the supplied element under the same identity either way — `K-1`'s own idempotence arm answers a row that
      // survives a refused registration's wake (`kernel-surface.md §2.1` item 1; `CC-7`). **A DISABLED PAIR IS
      // STILL A HELD PAIR, so this arm is still the overwrite arm and still answers the pair's own identity.**
      withdrawStanding(instance, held);
      // **STEP 3 — ADD.** The supplied element is installed under **THE SAME IDENTITY**, because the identity now
      // lives in the STORE and is returned with the pair, so the mechanism's change does not move the observable
      // (`(O-3)` item (iv)'s obligation; `(AA-2)`; `contract.md §2.6` item 2).
      // **⟶ AND A REFUSAL HERE HAS ALREADY TAKEN THE PAIR'S TWO ROWS WITH THE PURGE** — `constraintSite`'s check
      // cannot reach the registration-time evaluation, so this is `docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 4's own declared split — **and both
      // are put back BEFORE the refusal crosses, because the second of that clause's two facts is the kernel's to
      // keep: the pair still evaluates and `constraints()` is unmoved** (`restoreHeldPair` above;
      // `constraint-sites.md §4` item 2; `§2.1` item 1).
      try {
        for (const address of site.addresses) {
          constraintsKernel().register(instance, address, site.id, constraint);
        }
      } catch (refusal) {
        restoreHeldPair(site.state, instance, held);
        registrationCrossing(refusal);
      }
      held.addresses = site.addresses;
      held.addressKey = addressSetKey(site.addresses);
      held.fn = constraint;
      held.enabled = true;
      // **⟶ AND STEP 3 IS THE RE-ADD: THE SAME PAIR IDENTITY IS WRITTEN BACK UNDER ITS OWN KEY** (`(O-3)`
      // item (iv)'s obligation; `(AA-2)`: *"Move the identity into the store"*). **THE PURGE DELETED THE
      // READ-MODEL ROW AND THE RE-ADD PUTS IT BACK**, so the identity the caller held before the cycle is the
      // identity after it, by VALUE, and the enumeration is unmoved (`contract.md §2.6` items 2–3;
      // `constraint-identity.md §5` `IF-1`).
      site.state.constraints.set(constraintPairKey(held.addresses, held.id), held);
      return held.identity;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `surface.md §2.12` item 2 (a): **`a.constraintOn(pair, constraint) -> undefined`** — the ENABLE half.
    /**
     * **`docs/specs/storeroom-js/surface.md §2.12` ITEM 2 (a): `constraintOn(pair, constraint) -> undefined` / `constraintOff(pair, constraint) ->
     * undefined` — THE TWO HALVES OF THE ONE TOGGLE, AND NEITHER STANDS IN THE KERNEL.**
     *
     * **THEIR THREE ANSWERS, AND THE TWO SHARED CLAUSES:**
     *   * **IDEMPOTENT SUCCESS WHERE THE PAIR ALREADY STANDS IN THE STATE IT ASKS FOR** (item 3's first answered
     *     question): `undefined`, the pair and its element EXACTLY as they stood, and NOTHING THROWN.
     *   * **THE SECOND POSITION IS REQUIRED AND IS A NO-OP ON EVERY SUCCESS** (`item 3`'s `constraintOn` row;
     *     `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s method table: *"the third position is REQUIRED and is a no-op on success"*): a
     *     FUNCTION there is never refused on the pair's ground, the entry NEVER SUBSTITUTES ONE, and it is
     *     `entry.fn` — the element the entry carried — that is evaluated at the next write. **CARRIAGE IS
     *     PAIR-KEYED AND THE TOGGLE'S OWN ARGUMENTS DO NOT DECIDE IT.**
     *   * **AN OUTSIDE `pair` OR A SHORT ARITY TAKES `constraintSite`'s ONE `TypeError`**, and a WELL-FORMED PAIR
     *     THE ENTRY DOES NOT CARRY takes `constraintUncarried`'s (`A126`).
     */
    constraintOn(pair, constraint) {
      // **⟶ `§4.1`: `constraintOn` OPENS ONE — ENABLING.**
      const opened = openCommit(instance);
      try {
      const verb = 'constraintOn';
      const site = constraintSite(state, verb, arguments.length, pair, constraint);
      const entry = site.state.constraints.get(constraintPairKey(site.addresses, site.id));
      if (entry === undefined) constraintUncarried(verb, pair);
      if (entry.enabled !== true) {
        // **⟶ AND THIS ARM ADDS — `entry.fn`, THE ELEMENT THE ENTRY CARRIED, WHICH IS BEING ENABLED.** **THE
        // RULING'S CLAUSE, AT ITS OWN SITE: *"THE PROPOSAL MUST STATE THAT A TOGGLE AT A PAIR PURGES THE PAIR'S
        // OLD STORE ENTRIES, because that is what `no exceptions` means at this site"*** (`P: docs/pending.md ·
        // (O-3)` item (v), verbatim; `contract.md §2.3` item 7; `constraint-sites.md §1` rows 2–3).
        //
        // **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling) — THE QUOTED *"it is the
        // same rule for `constraintOn`/`constraintOff`, which reach the same `K-1`: their re-registration is a
        // purge-then-add too, and `constraintParked` is the new element added"* IS NOT TO BE READ AS A RULE ABOUT
        // BOTH ARMS, AND THIS SITE NO LONGER READS IT AS ONE.** **`(O-3)` item (v)'s SUBJECT is *"a constraint
        // written to an existing handle"* — the OVERWRITE/WRITE path, where a body genuinely REPLACES a body.**
        // **THE ENABLE ARM WRITES A BODY AND THUS LEGITIMATELY ADDS ONE — `entry.fn`, because the pair is
        // ENABLED; THE DISABLE ARM WRITES NOTHING, SO IT PURGES ONLY (`remove`) AND ADDS NOTHING** (ground 4;
        // `constraintOff`'s own amended note below). **Item (v)'s shared-route observation is a fact about
        // REACHABILITY — both arms DO reach `K-1` — and not an instruction to add on both.** **AND THE RULED
        // ASYMMETRY AT `§4.1`: this arm brackets at entry (`:4034`) and is table `1`, while `constraintOff`
        // brackets nowhere and is table `2`, so an identical nested `listen` here JOINS an extant commit and
        // there OPENED one from zero — which is why only the disable arm's copy was the defect.** **`constraintParked`
        // IS NOT ADDED BY EITHER TOGGLE: it remains the element a *disabled* pair's registry record carries for
        // ENUMERATION purposes, at `restoreHeldPair`'s refusal wake (`:5597`).**
        //
        // **⟶ AND THE PURGE THIS ARM USED TO TAKE IS GONE WITH THE DISABLE ARM'S REGISTRATION — A CONSEQUENCE THE
        // RULING DID NOT NAME AND THAT IS RECORDED HERE RATHER THAN DISCOVERED LATER.** The `remove` that stood
        // below was `K-6` against the pair's OWN standing row — **the very row the disable arm's `register` used
        // to leave behind. With the register half removed, a DISABLED pair stands NO kernel row at all** (ground
        // 3: `remove` is already the complete act), **so `K-6` refuses `KC-2` — *"no constraint pair answers to
        // …"* — and a re-enable would throw where `surface.md §2.12` item 3's clause 5 declares a toggle. THE
        // PURGE-THEN-ADD SPANS THE TWO HALVES NOW AND NOT ONE ARM:** `constraintOff` purges (its `remove`), and
        // `constraintOn` adds (`entry.fn` through `K-1`), **which is literally *"the old handle's entries are
        // purged before the new one is added"* (`(O-3)` item (i))**. **NOTHING IS UNPURGED BY ITS ABSENCE:** a
        // pair reaching this arm stands no store-side listener, since the only act that could have left one is
        // the disable, which no longer performs it. **AND WHERE ONE DOES STAND — the declared residue of a
        // REFUSED registration, which `restoreHeldPair` below writes back — `K-1`'s own idempotence arm is what
        // answers it** (`kernel-surface.md §2.1` item 1; `CC-7`: *"a second registration under the SAME pair
        // keeps the replaced registration's PLACE and replaces only its function"*), **so the pair is re-added
        // under its own identity either way.**
        //
        // **THE CHECK PRECEDES ALL OF IT, AS AT EVERY HELD-PAIR SITE** (`constraintSite` has already run: the
        // pair's shape, the id, the addresses' domain and the element's class), **and a refusal therefore
        // changes nothing.** **AND THE IDENTITY STANDS THROUGH THE CYCLE — the toggle is a TOGGLE and not a
        // removal** (`constraint-identity.md §3` item 3; `contract.md §5.6`'s `S-ID` family; `IF-5`).
        // **⟶ AND THE REFUSAL WAKE BELOW IS THIS ARM'S AND STAYS: THIS ARM DOES RE-REGISTER A BODY THROUGH
        // `K-1`, so a registration-time refusal is reachable here and its residue is the declared one**
        // (`docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 7; `constraint-sites.md §1` rows
        // 2–3; `§4` item 2; `§2.1` item 1). **⟶ AND IT IS REACHABLE ON THIS ARM AND ON NO ARM OF `constraintOff`**
        // (`DEF-2026-10-20-F` consequence (i): a `remove`-only arm cannot refuse a re-registration, so the disable
        // arm's `try`/`catch` went with its loop — `:4113` onwards).
        try {
          for (const address of entry.addresses) {
            constraintsKernel().register(instance, address, entry.id, entry.fn);
          }
        } catch (refusal) {
          restoreHeldPair(site.state, instance, entry);
          registrationCrossing(refusal);
        }
        entry.enabled = true;
        // **⟶ AND THE PAIR'S STATE ROW STANDS UNDER THE SAME PAIR IDENTITY** (`P: docs/pending.md · (O-3)`
        // item (iv)'s obligation; `(AA-2)`: *"Move the identity into the store"*, preserved *"equal to itself on
        // a second `addConstraint` at the SAME pair"*). **THE TOGGLE IS NOT A REMOVAL, so the pair is carried
        // UNDER THE SAME IDENTITY and the enumeration is unmoved** (`constraint-identity.md §3` item 3;
        // `§5` `IF-5`; `removal-members.md §3` item 3): *"`constraintOff` is a TOGGLE and not a removal: a
        // disabled pair is STILL CARRIED and STILL ENUMERATED"*.
        // **⟶ AMENDED 2026-10-22 (same ruling): this row is not written back *after a purge* — this arm purges
        // nothing now** (see the note above). The pair's record stands as it stood, which is what ``(AA-2)``'s
        // *"equal to itself"* asks for at a re-enable, and the enumeration it feeds is unmoved either way.
        site.state.constraints.set(constraintPairKey(entry.addresses, entry.id), entry);
      }
      return undefined;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `surface.md §2.12` item 2 (a): **`a.constraintOff(pair, constraint) -> undefined`** — the DISABLE half.
    constraintOff(pair, constraint) {
      const verb = 'constraintOff';
      const site = constraintSite(state, verb, arguments.length, pair, constraint);
      const entry = site.state.constraints.get(constraintPairKey(site.addresses, site.id));
      if (entry === undefined) constraintUncarried(verb, pair);
      if (entry.enabled !== false) {
        // **THE CHECK PRECEDES IT, AS AT EVERY HELD-PAIR SITE** (`constraintSite` has already run: the pair's
        // shape, the id, the addresses' domain and the element's class), **and a refusal therefore purges
        // nothing.** **AND THE IDENTITY STANDS THROUGH THE CYCLE — `constraintOff` is a TOGGLE and not a
        // removal** (`constraint-identity.md §3` item 3; `contract.md §5.6`'s `S-ID` family; `IF-5`).
        //
        // **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling at the store/kernel code
        // review) — THE DISABLE ARM PURGES ONLY (`remove`), AND ADDS NOTHING.** This block read *"THE TOGGLE IS A
        // PURGE-THEN-ADD TOO"*, on the ground that `(O-3)` item (v) applies *"the same rule for
        // `constraintOn`/`constraintOff`, which reach the same `K-1`"*. **THAT READING IS SUPERSEDED BY THE
        // RULING, WHICH IS VERBATIM: *"Remove the register half, `constraintOff` removes the constraint."***
        // **`(O-3)` item (v)'s SUBJECT is *"a constraint written to an existing handle"* — the OVERWRITE/WRITE
        // path, where a body genuinely REPLACES a body — AND THE DISABLE ARM WRITES NOTHING**, so it has nothing
        // to add; item (v)'s shared-route observation is a fact about REACHABILITY and not an instruction to add
        // on both arms (`DEF-2026-10-20-F` ground 4; `docs/defects.md`).
        //
        // **SO THE RULED FORM IS ONE ACT: `remove` (`K-6`), WHICH IS ALREADY THE COMPLETE ACT** (ground 3;
        // `contract.md §2.9` items 2–3). **THE PAIR'S IDENTITY AND ITS ENUMERATION SURVIVE THROUGH
        // `entry.enabled = false` AND THE STATE ROW BELOW — NOT THROUGH A STORE-SIDE LISTENER.** **THE DELETED
        // `register` LOOP WAS A DEFECT AND NOT A MANDATED BEHAVIOUR, ON THE RULING'S OWN MEASUREMENT:**
        // `constraintParked` is a fresh `() => true` (`:5514`), so the arm stood a body that PASSES ALWAYS in
        // the store's address slot for a disabled pair — **the mask is a passing function rather than an absent
        // one** — and `K-1` calls `store.listen(home, set)` UNCONDITIONALLY (`constraint-kernel.mjs:561`), **so a
        // table-`1` BRACKETING act happened inside a table-`2` verb's window**, falsifying
        // `finalizer-and-teardown.md §4.1` table `2`'s *"disabling cannot fire — nothing runs"* at the mechanism
        // level (grounds 1–2). **THE ASYMMETRY THAT MADE IT BITE:** `constraintOn` brackets at entry (`:4034`),
        // so its identical nested `listen` FINDS AN EXTANT COMMIT AND JOINS IT, while `constraintOff` takes none
        // and the same call OPENED FROM ZERO. **THE WITNESS IS `addon-adoption.test.mjs`'s COUNT WALK OVER ALL
        // THIRTEEN VERBS** (`test-cases.md` `F-8`), which is GREEN after this note and was RED before it.
        //
        // **AND `DEF-2026-10-20-F`'S CONSEQUENCE (i) IS SETTLED HERE — THE `try`/`catch` GOES WITH THE LOOP, it
        // is not kept as declared silence.** `restoreHeldPair`'s refusal wake is UNREACHABLE on this arm, because
        // **a `remove`-only arm cannot refuse a re-registration**; a `catch` left standing over an act the arm no
        // longer performs would claim to guard a body nothing can reach. **The one act that remains opens no
        // commit and reaches no `K-1`**, so there is no residue for a wake to put back. **`constraintParked`
        // REMAINS (`:5514`) AS THE ELEMENT A *DISABLED* PAIR'S REGISTRY RECORD CARRIES FOR ENUMERATION PURPOSES
        // — its one remaining registration site is `restoreHeldPair`'s refusal wake (`:5597`) — AND IT IS NO
        // LONGER REGISTERED AS A STORE LISTENER BY THIS ARM, NOR BY ANY SUCCESSFUL DISABLE.**
        constraintsKernel().remove(instance, { address: entry.addresses, id: entry.id });
        entry.enabled = false;
        // **⟶ AND THE PAIR'S STATE ROW IS WRITTEN BACK UNDER THE SAME PAIR IDENTITY** (`P: docs/pending.md ·
        // (O-3)` item (iv)'s obligation; `(AA-2)`: *"Move the identity into the store"*, preserved *"equal to
        // itself on a second `addConstraint` at the SAME pair"*). **THE TOGGLE IS NOT A REMOVAL, so the row
        // `K-6`'s `FORGET_PAIR` took is restored UNDER THE SAME IDENTITY and the enumeration is unmoved**
        // (`constraint-identity.md §3` item 3; `§5` `IF-5`; `removal-members.md §3` item 3): *"`constraintOff` is
        // a TOGGLE and not a removal: a disabled pair is STILL CARRIED and STILL ENUMERATED"*.
        // **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` consequence (ii), same ruling): THIS WRITE-BACK IS THE
        // WHOLE OF WHAT IS RESTORED, AND IT IS A *REGISTRY* RESTORATION AND NOT A RE-ADD OF A BODY.** **What a
        // disabled pair must retain is its IDENTITY and its ENUMERATION — a registry fact — and this row beside
        // `entry.enabled = false` above satisfies exactly that** (ground 3). **`enumerateConstraints` does not
        // consult `enabled` at all**, so the pair keeps appearing in `constraints()` with no store-side listener
        // anywhere (`:5653`; `surface.md §2.12` item 3 clause 5).
        site.state.constraints.set(constraintPairKey(entry.addresses, entry.id), entry);
      }
      return undefined;
    },
    /// **`surface.md §2.4` item 9 (f)'s `constraints` clause of 2026-10-17: `a.constraints() -> Array<{ address,
    /// id }>` — THE REGISTERED-PAIR READ, the thirteenth own member (`10 + 1 + 1 + 1 = 13` ✓; `PAR-JS-27`;
    /// `docs/specs/storeroom-js/surface.md §2.12` item 2-bis).** **THE RECEIVER IS THE STORE, THE CALL TAKES NO ARGUMENT (arity `0`) AND IT
    /// THROWS NOTHING** — there is no outside argument for the class test to refuse, and the call makes no
    /// store call, mints no code, appends no journal entry and changes no node. **It is NOT a named export of
    /// the entry** (`package.md §1.3` item 3; `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause, `11 → 1` ✓): it is reached
    /// through the factory's own product alone.
    constraints() {
      return enumerateConstraints(state);
    },
    // ⟶ MOVED 2026-10-18 (`RCA-8(g)`, gate-4 finding F-2): the wrapper's duplicate `removeListener` header stood here, above the free function's own doc block that `P-8` moved in below. Bytes: archive/p8-merge/2026-10-18/post-gate4/removeListener-wrapper-header.md. `contract.md §2.7` item 9 is the operative member set.
    /// **⟶ `removeListener(handle) -> undefined` — THE FIRST OF THE TWO NEW MEMBERS**
    /// (`contract.md §2.7` items 1–2; `removal-members.md §2`; `P: docs/pending.md · P-5`'s explicit-delete ruling).
    ///
    /// **IT REMOVES THE ENTRY WHOLE AND WITHDRAWS THE STORE'S HOME ENTRIES THE HANDLE NAMED** — *"IT REMOVES THE
    /// ENTRY WHOLE AND WITHDRAWS THE STORE'S HOME ENTRIES THE HANDLE NAMED"* — and **it is the ONLY route that
    /// removes an entry** (`contract.md §2.2` item 5 (c)). **NO `unlisten` IS ISSUED AND NO SEPARATE WITHDRAWAL
    /// VERB IS REACHED: the removal IS the purge, and the map entry's deletion follows it** (`removal-members.md
    /// §2` item 3).
    ///
    /// **SUCCESS IS THE NORMAL RETURN (`undefined`) AND THE FAIL IS THE THROW** (`P: docs/pending.md · P-5`'s
    /// `(R3)`, verbatim) — **and the throw is the DECLARED REVERSAL of `unlisten`'s no-op-success set**: every arm
    /// that is not a real removal FAILS, with a verbose message (`(R2)`, verbatim; `contract.md §2.7` item 5).
    /// **A REFUSAL CHANGES NOTHING**: all four structures stand as they stood (`removal-members.md §5`
    /// obligation (iii)).
    ///
    /// **AND IT IS NOT A PUBLIC MEMBER YET** — the product's own member set is where it is declared
    /// (`contract.md §2.7` item 9); this is its body, and the member is added below with the surface.
    /// **⟶ CORRECTED 2026-10-18 (`P-8` landed): the sentence above is SUPERSEDED — `removeListener` IS a public member of this object as of this date (`bindings/js/index.mjs`'s member list; `contract.md §2.7` item 9: the set is `14`), so *"added below with the surface"* describes a state that no longer holds.** **The dissolved claim is recorded, not silently dropped, because it was theory-of-record when the free function's body was authored.**
    removeListener(handle) {
      // **THE CLASS TEST IS THE SURFACE'S ONE THROWN FORM WITH `status` THE STORE'S `AddressMalformed`**
      // (`removal-members.md §6` item 1; `R-B4`, verbatim: *"`AddressMalformed` — the instance's domain is the
      // domain"*, so *"a present argument outside its domain"* is read as *"outside THIS INSTANCE'S domain"*).
      // **A WELL-FORMED STRING THE MAP DOES NOT CARRY IS THAT SAME ARM — the fabricated row** — and so is an
      // already-deleted handle (`contract.md §2.1` item 5's fourth column).
      if (!inDomainHandle(handle)) {
        boundaryReject(
          'AddressMalformed',
          targetSpelling(handle),
          `removeListener's first argument is ${classSpelling(handle)}, and a listener's handle is a non-empty `
            + 'string this caller spells',
        );
      }
      if (!state.registry.has(handle)) {
        boundaryReject(
          'AddressMalformed',
          targetSpelling(handle),
          `removeListener's first argument is '${handle}', and this instance holds no listener entry for it`,
        );
      }
      // ── THE SUCCESS ARM: THE ENTRY GONE WHOLE AND THE STORE'S ENTRIES WITHDRAWN ────────────────────────────
      // **THE ORDER IS THE FOUR REMOVALS' (`removal-members.md §4` item 2's `HL-DD-4`), read for a listener:**
      // (1) validate — above; (2) withdraw the store's home entries the handle named — through the store's own
      // purge; (3) delete the JS entry; (4) return `undefined`.
      carryRefusal(() => entryOf().removeListener.call(this, handleWire(handle)), [handleWire(handle)]);
      state.registry.delete(handle);
      state.home = state.home.filter((row) => row.handle !== handle);
      return undefined;
    },
    /// **⟶ `removeConstraint(pair) -> undefined` — THE SECOND OF THE TWO NEW MEMBERS**
    /// (`contract.md §2.7` item 3; `removal-members.md §3`; `P: docs/pending.md · P-5`'s `(R4)`, verbatim:
    /// *"removeConstraint REMOVES EVERYTHING — THE PAIR, ALL N ADDRESS ROWS, THE KERNEL'S REGISTRATION, AND THE
    /// STORE-SIDE HOME ENTRY"*).
    ///
    /// **IT IS A THIRD AND STRONGER OPERATION**: neither `constraintOff` (a TOGGLE that PURGES ONLY and keeps the
    /// pair CARRIED and ENUMERATED through its state row and `entry.enabled = false`) nor the kernel's
    /// `withdrawRegistration` (which leaves the store's home entry standing). **AND IT IS THE ONE ACT THAT DELETES
    /// AN IDENTITY** (`contract.md §2.6` item 3; `P: docs/pending.md · (AA-2)`, closing sentence).
    /// **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling): the parenthetical above read
    /// *"a TOGGLE re-registering a parked stub and keeping the pair carried"*. THAT IS SUPERSEDED — the disable
    /// arm registers NOTHING** (a `remove`-only arm; `constraintOff`'s own amended note). **The DISTINCTION this
    /// clause draws is unmoved: `constraintOff` keeps the pair's IDENTITY and its ENUMERATION and `removeConstraint`
    /// DELETES them, and what the disable arm no longer does is stand a `constraintParked` body in the store's
    /// address slot — which was never what made the pair carried.**
    ///
    /// **THE ORDER OF THE FOUR REMOVALS IS THIS CONTRACT'S DECLARED `HL-DD-4`** (`removal-members.md §4` item 2):
    /// **(1) VALIDATE the pair and the call's class; (2) WITHDRAW the store's home entries the pair's addresses
    /// hold, through `K-6`'s route; (3) DELETE the kernel's `pairs` row and its N address rows; (4) DELETE the JS
    /// ENTRY — `state.constraints`'s value, its identity included; (5) RETURN `undefined`.**
    /// **NO INTERMEDIATE STATE IS OBSERVABLE**: after any thrown arm the four structures stand as they stood, and
    /// after the success return all four are gone (`removal-members.md §4` item 4).
    ///
    /// **AND THE TWO REFUSAL FORMS ARE TOLD APART BY `status`'s PRESENCE AND NOTHING ELSE**: a PAIR-SHAPED
    /// outside value takes the constraint methods' `TypeError` with `status` ABSENT (`removal-members.md §6`
    /// item 2; `contract.md §2.7` item 6), while a WELL-FORMED pair this instance holds no row for takes the
    /// remove member's own thrown form with a verbose message (`contract.md §2.7` item 5; `removal-members.md §5`
    /// row 1).
    removeConstraint(pair) {
      // ── STEP 1: VALIDATE. ────────────────────────────────────────────────────────────────────────────────
      // **⟶ THIS BLOCK IS `removeConstraint`'S OWN, AND THE SENTENCE BELOW IS A CONTINUATION OF ITS SUBJECT:
      // ONE POSITION, THE PAIR — ITS `address` READ AT THE TWO DECLARED SPELLINGS AND AT NO THIRD** (`contract.md
      // §2.7` item 3; `PAR-HL-16`; `constraint-identity.md §6`'s pair table).
      // **THE PAIR'S SHAPE TEST IS THE CONSTRAINT METHODS' OWN — ONE THROWN `TypeError`, `status` ABSENT, the
      // call changing nothing** (`surface.md:1063` rule (ii), which governs *"THE THREE CONSTRAINT METHODS' EVERY
      // OUTSIDE VALUE"*; `contract.md §2.7` item 6; `constraint-sites.md §6` item 2). **IT IS TAKEN HERE RATHER
      // THAN THROUGH `constraintSite` BECAUSE THIS MEMBER HAS NO `constraint` POSITION** — its arity is ONE
      // (`removal-members.md §3` item 1; `PAR-HL-16`).
      if (arguments.length < 1 || !isPlainObjectValue(pair) || !Object.hasOwn(pair, 'address') || pair.address === undefined) {
        constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
      }
      // **THE PAIR'S `address` IS READ AT THE TWO SPELLINGS THE CONTRACT DECLARES FOR THE CONSTRAINT'S PAIR AND
      // AT NO THIRD** (`constraint-identity.md §6`'s pair table, verbatim: *"`address`: THE ADDRESS SET the pair
      // was created with (`§4` item 3) — and, at the REGISTRATION act, a single address"*; `PAR-HL-8`;
      // `PAR-HL-16`).
      //
      // **⟶ AND THE OUTSIDE SET THIS POSITION REFUSES IS `PAR-HL-8`'S OWN EIGHT ROWS AND NO NINTH**, because
      // `PAR-HL-16`'s outside cell is *"every shape row of `PAR-HL-8`'s outside list, PLUS a well-formed pair the
      // entry does not carry"*: a non-object · a `null` · an object carrying no `address` · **an `address` outside
      // the store's domain** · an object carrying no `id` · a non-string `id` · an empty-string `id` · an ABSENT
      // pair. **THE DISCRIMINATOR IS THE MEMBER'S CLASS, READ ONCE** — an array whose FIRST member is an array is
      // the pair's SET; an array whose members are segments is the REGISTRATION ACT'S OWN single address. **THE
      // SECOND IS NOT `listen`'S REFUSED SET-POSITION CLASS** (`listen-verb.md §2.2` item 2 (vi)) **BUT THE
      // REGISTRATION FORM THIS PAIR WAS CREATED WITH**: the pair the caller hands to `removeConstraint` is the
      // pair it handed to `addConstraint`, and `addConstraint` admits that spelling (`PAR-HL-8`'s domain read with
      // `constraint-identity.md §6`'s registration clause) — so refusing it here would make a pair the caller
      // added unremovable, which `contract.md §3` `S-12` forbids.
      //
      // **AND AN ADDRESS OUTSIDE THE STORE'S DOMAIN IS THIS POSITION'S OUTSIDE VALUE, ANSWERED BY RULE (ii)'s
      // `TypeError`** (`contract.md §4` `F-7`; `removal-members.md §6` item 2: *"the constraint methods' `TypeError`,
      // `status` ABSENT"* — never the store's form, and never a raw host value), which is the SAME class of answer
      // `constraintSite` gives that value at the three constraint methods.
      const addresses = [];
      if (!isAdmittedArray(pair.address)) {
        constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
      }
      if (pair.address.length > 0 && Array.isArray(pair.address[0])) {
        for (let i = 0; i < pair.address.length; i += 1) {
          const each = isAdmittedArray(pair.address[i]) ? constraintAddress(pair.address[i]) : null;
          if (each === null || typeof each === 'string') {
            constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
          }
          addresses.push(each.s);
        }
      } else {
        const each = constraintAddress(pair.address);
        if (typeof each === 'string') {
          constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
        }
        addresses.push(each.s);
      }
      if (!Object.hasOwn(pair, 'id')
        || pair.id === undefined
        || typeof pair.id !== 'string'
        || pair.id === '') {
        constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
      }
      const entry = state.constraints.get(constraintPairKey(addresses, pair.id));
      if (entry === undefined) {
        // **A WELL-FORMED PAIR THIS INSTANCE HOLDS NO ROW FOR IS A THROW WITH A VERBOSE MESSAGE — and NOT a class
        // refusal**, because the value is inside every class domain and it is the ROW that is absent
        // (`contract.md §4` `F-8`; `removal-members.md §5` row 1: *"names the value and the reason"*).
        throw withEmptyLog(new TypeError(
          `the pair at the ${ARGUMENT_POSITION_FIRST} of \`removeConstraint\` is '${pair.id}' at `
            + `${JSON.stringify(addresses)}, and this instance holds no constraint pair there`,
        ));
      }
      // ── STEP 2–3: THE KERNEL'S ROW, ITS N ADDRESS ROWS, AND THE STORE'S HOME ENTRIES, THROUGH `K-6`. ─────
      // **THE CHAIN IS `removeConstraint → K-6 → removeListener → the store's purge`, AND IT HAS NO CYCLE**
      // (`contract.md §2.9` item 6; `remove-member.md §6` item 1). **`K-6`'S STORE-SIDE REFUSAL CROSSES
      // UNCONVERTED** (`contract.md §4` `F-13`), so this frame converts nothing.
      // **⟶ AMENDED 2026-10-22 (`DEF-2026-10-20-F` landed; the architect's ruling) — THE WITHDRAWAL IS REACHED
      // WHERE A REGISTRATION STANDS, AND IT IS THIS ACT'S OWN TWO FACTS THAT MAKE THAT THE WHOLE OF THE DECLARED
      // ANSWER.** **A DISABLED PAIR IS STILL CARRIED and this member is *"THE ONE ACT THAT DELETES AN
      // IDENTITY"*** (`contract.md §2.6` item 3; `docs/specs/storeroom-js/surface.md §2.12` item 3 clause 5:
      // *"the toggle is NOT a removal"*) — **so it MUST still succeed at a pair the disable left standing, and
      // `K-6` CANNOT BE ITS ROUTE THERE: the disable arm purges only, so no kernel row survives it to be found,
      // and `K-6` refuses `KC-2` for a pair it holds no row for** (`contract.md §4` `F-12`). **THE PURGE IS
      // THEREFORE GUARDED BY THE PAIR'S OWN POLARITY** (`withdrawStanding` below: `enabled === true` is exactly
      // *"a registration stands to be withdrawn"*), **and steps 3–4 — the address rows and the JS entry, its
      // IDENTITY included — are taken exactly as declared**: with no row there is nothing for step 3 to delete,
      // and step 4 deletes the entry and its identity either way. **A DISABLED PAIR'S REMOVAL IS THEREFORE A
      // COMPLETE REMOVAL, and `removeConstraint` keeps its declared answer at every pair it can name.**
      withdrawStanding(instance, entry);
      // ── STEP 4: THE JS ENTRY, ITS IDENTITY INCLUDED. ─────────────────────────────────────────────────────
      state.constraints.delete(constraintPairKey(entry.addresses, entry.id));
      return undefined;
    },
    /// `surface.md §2.4` item 5 (b): `register(handle, listener) -> undefined` — the OPAQUE handle a verb
    /// returned or the construction adopted, and ANY JS function. **It is NOT a named export of the entry**
    /// (`package.md §1.3` item 3): it is reached through the factory's own product alone.
    register(handle, listener) {
      return registerOn(state, handle, listener);
    },
    /// **⟶ `settle` IS REMOVED FROM THIS PRODUCT, 2026-10-18 — THE MEMBER SET IS TWELVE, `10 + 1 + 1 = 12`
    /// ✓** (`surface.md §2.4` item 9's `REMOVED-WHOLE` pointer and item 9 (f)'s clause of that date). **THE
    /// ARCHITECT'S RULING, VERBATIM: *"Settle is redundant because the kernel is always in the loop."*** **NO
    /// DRIVE MAY ASSERT A CALL OF IT FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT**: the member is not a
    /// member of the product, so a call reaches a property no clause of this unit declares. **AND THE DELIVERY
    /// IT ONCE MARSHALLED IS NOT LOST WITH IT**: it was never `settle`'s — it is `docs/specs/storeroom-js/surface.md §2.7` item `7`'s
    /// terminal-arm act, taken inside the kernel's own act, and this entry PERFORMS the one the kernel
    /// triggers. **The one member this factory does NOT expose and the kernel does NOT call from here.**
    ///
    /// **⟶ AND THE CHANNEL THAT MEMBER WAS IS REPLACED BY A SYMBOL-KEYED PROPERTY, NOT BY A NAMED MEMBER**
    /// (`TERMINAL_ARM` above): the kernel still reaches this entry at its terminal arm, and **the product's
    /// declared twelve own members are UNMOVED** because a symbol key is invisible to `Object.keys` and to
    /// `Object.getOwnPropertyNames` — the precedent `A117` (D6) declares and `docs/specs/storeroom-js/surface.md §2.11` clause 9 prints
    /// (*"a symbol-keyed own property is invisible to both"*). **IT IS NOT A MEMBER OF THE PRODUCT IN THE
    /// SENSE `docs/specs/storeroom-js/surface.md §2.4` item 9 (f) COUNTS**, and no cell that counts members can see it.
    [TERMINAL_ARM](record) {
      return terminalArm(state, record);
    },
    /// **`K-6`'s READ-MODEL CHANNEL** (`FORGET_PAIR` above): the kernel's own removal drops the pair's row
    /// from `state.constraints` after its own rows and the store's entries are gone, so the success arm leaves
    /// the enumeration short by one (`contract.md §3` `S-19`; `docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 8). **NO MEMBER IS ADDED** to the
    /// product's declared fourteen — a symbol key is invisible to both enumerations (`A117` (D6)).
    [FORGET_PAIR](id) {
      for (const [key, entry] of state.constraints) {
        if (entry.id === id) state.constraints.delete(key);
      }
      return undefined;
    },
  };
  INSTANCES.set(instance, state);
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════
  // THE RECEIVER'S OWN PUBLICATION — `receiver-and-refusal.md §1` AND THE TABLE'S RETIREMENT (`§6`; `OWED-2`)
  //
  // **THE STRUCTURE CHOSEN, AND WHY** (`contract.md §7` leaves the table's FORM and its RETIREMENT MECHANISM
  // `OWED`; the requirement is decided and `P-SAS-5` drives it). **TWO PIECES, EACH NAMED FOR THE JOB IT DOES:**
  //
  //   1. **`STORE_INDEX` — A NON-ENUMERABLE OWN PROPERTY CARRYING THE INTEGER `storeCreate` MINTED.** It is
  //      the row the addon's own `instance_of` reads: element `0` of the receiver, read as a number. **A
  //      NON-ENUMERABLE OWN PROPERTY IS THE FORM CHOSEN BECAUSE IT IS INVISIBLE TO `Object.keys` AND TO
  //      `Object.getOwnPropertyNames`** — the same precedent `A117` (D6) declares for the symbol-keyed
  //      channels above — **so the product's declared member set is UNMOVED at twelve** (`surface.md §2.4`
  //      item 9 (f)) and no member-counting cell can see it. **AND IT IS THE ROW A CLONED STORE OBJECT
  //      CARRIES TOO**, because `Object.assign`/spread copy own enumerable properties only: a clone carries
  //      NO index and therefore resolves NO store, which is the SAME one observable the detached call gets.
  //
  //   2. **A `FinalizationRegistry` REGISTERED ON THE STORE OBJECT, WHOSE CALLBACK RETIRES EXACTLY THAT
  //      OBJECT'S OWN ROW.** `§6`: *"the retirement removes EXACTLY ONE ENTRY — the freed instance's own —
  //      and NEVER THE TABLE."* The held value is the index ALONE and never the object (a strong reference
  //      would be the collection this mechanism exists to observe), and the callback removes THE ONE ROW THAT
  //      INDEX NAMES — so **a second store's entry cannot be touched**, which is the failure `P-SAS-5` names.
  //      **IT IS `FinalizationRegistry` RATHER THAN A NODE-API FINALIZER** because the store object is the
  //      package's own and the teardown must not race the sibling unit's declared mechanism (`§5`'s
  //      withdrawal of a `WeakMap` is about the RESOLUTION ROUTE and forbids no table).
  //
  // **AND A CALL ON A COLLECTED STORE NEEDS NO SECOND ARM**: once the row is retired the addon's
  // `INSTANCE_IDS` no longer holds the index, so the call refuses in THE ONE DECLARED FORM — the same
  // observable a detached call gets (`§3`: *"There is no second arm and no second observable."*)
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════
  // **THE CARRIER IS A SYMBOL KEY AND NOTHING ELSE, AND THAT IS FORCED RATHER THAN PREFERRED.** The addon
  // reads this row through `Symbol.for('provident-storeroom.storeIndex')` (`receiver-and-refusal.md §1`),
  // and **a symbol key is the only form the clause's carrier may take**: the product's declared member set
  // is asserted at EXACTLY fourteen own members read through `Object.getOwnPropertyNames`
  // (`surface.md §2.4` item 9 (f)), and **that read COUNTS a string key AND a numeric index alike** — so
  // publishing the row at element `0` moved the set `14 → 15`, which is `convenience.test.mjs`'s cell and
  // is not this unit's to change. **A SYMBOL KEY IS INVISIBLE TO `Object.keys` AND TO
  // `Object.getOwnPropertyNames` BOTH**, the precedent `A117` (D6) already declares for this package's own
  // symbol-keyed channels, so the member set is unmoved and the cell is green on a correct landing.
  //
  // **AND IT IS `Symbol.for` RATHER THAN AN IDENTITY SYMBOL BECAUSE THE TWO SIDES NEVER SHARE AN OBJECT**:
  // this file writes the key and the Rust layer reads it, and a registered symbol is the only spelling both
  // can name without one holding the other's reference. **A CLONED STORE OBJECT STILL CARRIES IT** (a
  // symbol-keyed own property survives `Object.assign` and spread), **so a clone resolves the SAME store —
  // which is `receiver-and-refusal.md §5`'s *"a deliberately re-bound receiver is still a receiver"* read at
  // its carrier: the receiver names the store and rebinding is unsupported breaking behaviour the package
  // owes no guard for.**
  Object.defineProperty(instance, STORE_INDEX, { value: id, enumerable: false, writable: false, configurable: false });
  state.receiver = instance;
  // **THE ROW IS REGISTERED FOR RETIREMENT IN THE SAME ACT THAT PUBLISHES IT**, so a store cannot be
  // published without a retirement and the two cannot drift (`§6`: *"retired in the same act that frees the
  // store"*). **THE CALLBACK IS PER-CONSTRUCTION AND CLOSES OVER THIS INSTANCE'S OWN INDEX ALONE** — it takes
  // no scan, names no other row, and cannot reach the table as a whole, which is the requirement `§6` states
  // and the failure `P-SAS-5` catches. **NO REFERENCE TO THE STORE OBJECT IS HELD** (it would be the strong
  // reference that stops the collection this exists to observe): the closure holds the integer and nothing
  // else, and the package's own hold on the instance is released with it.
  STORE_RETIREMENT.register(instance, () => {
    INSTANCES.delete(instance);
  });
  // **⟶ `docs/specs/storeroom-js/surface.md §2.12` ITEM 1 CLAUSE (b): `storeCreate` REGISTERS EACH OF `cfg.constraints`' ELEMENTS THAT CARRIES
  // ITS OWN FUNCTION AT `K-1`, AT THE INSTANCE IT IS CONSTRUCTING** — the SAME call the ADD route makes, so
  // a batch-populated pair is a pair the entry carries on the same footing (`docs/specs/storeroom-js/surface.md §2.12` item 3's preamble clause
  // (a)). **⟶ AMENDED 2026-10-24 (`D-26` item 4; `D-27` item 1): EVERY BATCH ELEMENT IS CARRIED AND ITS
  // FUNCTION IS ARMED — the *"well-formed pair carrying no function"* state this loop once skipped with a
  // silent `continue` HAS NO PRODUCER ON THIS ROUTE, because step 2 refused it before the create.** **THE
  // SILENT DROP IS DELETED, NOT MOVED**: a caller who supplied a function and got an unarmed pair was told
  // nothing, which is the shape this project keeps filing (`D-26` item 1 calls it *"a DEFECT and not a
  // design"*).
  //
  // **AND THE LIST ARMED HERE IS `batch` — THE ONE STEP 2 ALREADY WALKED, CHECKED AND ANSWERED**, so no
  // element is re-read off the caller's array and no second validation decides a second time.
  //
  // **⟶ AND THIS SITE TAKES THE THREE-STATE REGISTRATION TOO** (`docs/specs/storeroom-js/surface.md §2.12` item 3's clause of 2026-10-16
  // at its `A135` (3) mark; `docs/specs/storeroom-native/contract.md §7.3` (b)). **THE BATCH ROUTE AND THE
  // ADD ROUTE REACH THE SAME `K-1`**, so a batch element the current state violates — with no repair
  // standing, or with one that does not resolve it — refuses the CONSTRUCTION in this surface's one
  // failure form, exactly as the ADD route refuses the call. **THE STATE 3 SUCCESS ARM IS THE ONE THAT
  // MOVES THE STORE**: the repair's edit stands, the registration stands, and the construction returns
  // its instance with no log crossing (`3-bis` (c)).
  //
  // **⟶ AND THE FIRST POSITION IS THE DECODED SEGMENT LIST AND NEVER THE ENCODER'S CARRIER — CORRECTED
  // 2026-10-18, AND THIS IS THE WHOLE OF THE DEFECT.** `constraintAddress` answers `{k:'L', s:[…]}` — a
  // CARRIER (`§1.5`'s segment array as `encodeAddress` declares it) — while `carryConstraint` hands its
  // `addresses` to `K-1`'s `inDomainAddress`, which admits A LIST OF SEGMENTS AND NOTHING ELSE. **SO THE
  // CARRIER IS READ BACK TO ITS SEGMENTS HERE** (`batch`'s `addresses` is already that list) and no new
  // position, no new code and no new failure form is minted: the pair is its ONE-member set
  // (`constraint-identity.md §6`'s pair table — a single address at the REGISTRATION act).
  for (let i = 0; i < batch.length; i += 1) {
    try {
      carryConstraint(state, instance, batch[i].addresses, batch[i].id, batch[i].constraint);
    } catch (refusal) {
      registrationCrossing(refusal);
    }
  }
  // **⟶ AND THE CONSTRUCTION'S OWN ADOPTION ENTERS THE PACKAGE'S HOME MIRROR** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (b)'s dated
  // narrowing reads TWO lawful duplicate states, and the ONE-ADDRESS one is `DD-39`'s CONSTRUCTION duplicate;
  // `src/store.rs`'s own `adopt` keeps BOTH entries under one address and pushes the token's index entry for
  // each). **THE MIRROR IS THE HOME'S OWN SHAPE AND NOT A SECOND DECISION**: an accepted entry's handle is
  // adopted VERBATIM, in the caller's own spelling order ACROSS addresses and the bucket's own order WITHIN
  // one — which is the order `DD-42` clause (2)'s *"FIRST match"* is defined by. **A REJECTED ARRAY ADMITS
  // NOTHING** (`src/args.rs`), so a listeners list the store refused never reaches `storeCreate`'s return and
  // no mirror entry is written for it.
  //
  // **⟶ AND ONE ENTRY IS PUSHED PER ADOPTED ELEMENT, WITH NO `some(key)` TEST HERE — CORRECTED 2026-10-17**
  // (`docs/specs/storeroom-js/surface.md §2.4` item 7 (a) item 3; rules 1, 3 and 4 with `DD-39`'s *"both entries are KEPT"*): the store's own
  // population calls `adopt` for EVERY admitted element, and two elements at ONE address stay TWO store
  // entries (`src/store.rs`'s bucket, whose `first_at` answers the bucket's FIRST). **SO A PER-KEY DEDUPE
  // HERE WOULD BE A SECOND DECISION THE STORE NEVER TAKES and the mirror would hold fewer entries than the
  // home** — the `-1` absence route below is what that divergence breaks. **THE PREDICATE IS THE ONE THE
  // STORE'S OWN ADMISSION AGREES WITH** (`isLawfulListenerElement`): a `cfg.listeners` array that reached
  // this line was admitted WHOLE by `encodeListeners`, the facade and `src/args.rs`, so a lawful element is
  // pushed and the two sides' element counts are the same number.
  //
  // **⟶ AND THE BOOT ROUTE GOES THROUGH THE SAME VERB — *"Boot goes through listen()"*** (`P: docs/pending.md ·
  // P-5`, the boot ruling, verbatim; `contract.md §2.2` item 8; `listen-verb.md §6`). **THE CONSTRUCTION'S
  // `listeners[]` ELEMENTS ARE APPLIED BY CALLING THE SAME `listen(handle, addresses)` THE CALLER WOULD CALL**,
  // so every adopted handle gets its map entry with `off` set exactly as a runtime `listen` does. **THAT
  // CLOSES THE REACHABLE STATE `(off=false, fn=—)` this block once produced by pushing into `state.home`
  // directly** (`P: docs/pending.md · P-5`, the boot ruling's own ground), and it REPLACES `DD-39`'s
  // verbatim-adoption rule rather than re-reading it (`(ii)`, verbatim).
  //
  // **WHAT SURVIVES, EACH NAMED SO IT IS NOT READ AS MOVING WITH `DD-39`:** the construction still admits
  // `listeners` WHOLE — a refused element refuses the construction, exactly as today (`encodListeners` and
  // `src/args.rs`, which this route does not reach); `surface.md:2118`'s *"A REJECTED ARRAY ADMITS NOTHING"*
  // survives; and **the mirror holds N rows `{key, handle}` when ONE handle arrives at N addresses** (`(iv)`,
  // verbatim) — which is why this loop calls the verb once per ELEMENT, an element carrying ONE address
  // (`(v)`: *"a `listeners[]` element carries ONE `address` and not a set"*).
  if (isPlainObjectValue(cfg) && isAdmittedArray(cfg.listeners) && arrayClass(cfg.listeners) !== 'class') {
    // **⟶ AND THE SET IS ACCUMULATED PER HANDLE BEFORE THE VERB IS CALLED, WHICH IS WHAT MAKES THE BOOT
    // PRODUCE THE STATE THE RULING REQUIRES: *"the mirror holding N rows `{key, handle}` when one handle
    // arrives at N addresses"*** (`P: docs/pending.md · P-5`, the boot ruling's item (iv), verbatim;
    // `contract.md §2.2` item 8; `PAR-HL-24`'s observable).
    //
    // **THE REASON IT MUST ACCUMULATE AND NOT SIMPLY LOOP IS `(R1)`'S**: a `listen` is a SET ASSIGNMENT and
    // the second act PURGES the first (`P: docs/pending.md · (R1)`, verbatim: *"S1 gets purged wholesale"*),
    // so N successive one-address acts would leave the handle standing at the LAST address alone. **THE BOOT'S
    // ELEMENTS ARE NOT N SUCCESSIVE ACTS — they are the caller's ONE spelling of a handle at N addresses**, and
    // the verb they are applied through is the same verb the caller calls, with the whole set.
    //
    // **AND THE ORDER IS THE CALLER'S OWN**: the handles are taken in the order `listeners[]` first names them,
    // and each handle's addresses in the order the array names them — an order NO clause asserts and none is
    // claimed here (`DD-22`: a drive compares sets, never sequences).
    // **⟶ AND THE ACCUMULATION IS MADE OF LOCAL ARRAYS READ BY INDEX FROM 2026-10-24** (`contract.md §2.1`'s
    // clause of this date on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `64`; arm `(xix)`,
    // cell `JC-TC-65`): the as-built seeding used `new Map()` — lawful to ALLOCATE by item `(1d)(iv)`, and its
    // `get`/`set` were not — `for (const entry of cfg.listeners)` and `for (const [handle, set] of byHandle)`,
    // whose pair destructuring is a third iterator, and `set.push(entry.address)`. **A skipping iterator made the
    // construction's DECLARED SEEDING silently register nothing while `storeCreate` returned an instance whose
    // mirror was empty, and a no-op `get`/`set`/`push` did the same with a success report.** The order is the one
    // the comment above declares and no clause asserts: the handles in the order `listeners[]` first names them,
    // and each handle's addresses in the order the array names them.
    const handles = [];
    const addressSets = [];
    for (let i = 0; i < cfg.listeners.length; i += 1) {
      const entry = cfg.listeners[i];
      if (!isLawfulListenerElement(entry)) continue;
      let at = -1;
      for (let h = 0; h < handles.length; h += 1) {
        if (handles[h] === entry.handle) {
          at = h;
          break;
        }
      }
      if (at === -1) {
        handles[handles.length] = entry.handle;
        addressSets[addressSets.length] = [entry.address];
      } else {
        addressSets[at][addressSets[at].length] = entry.address;
      }
    }
    for (let h = 0; h < handles.length; h += 1) {
      instance.listen(handles[h], addressSets[h]);
    }
  }
  // **⟶ THE SEAM IS INSTALLED ON THE OBJECT THIS FACTORY RETURNS, ONCE** (`finalizer-and-teardown.md
  // `§4.2` item 4). **IT IS INSTALLED AFTER THE BATCH ROUTES ABOVE**, so a `listen` the construction itself
  // performs is not counted as a commit the caller opened and leaves the count at `0` on the return.
  installAttemptSeam(instance);
  return instance;
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): the region header is moved — re-indented and otherwise unchanged —
// to sit above the member list it describes (P-8; archive/p8-merge/2026-10-18/blocks/region-header.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): read is deleted; its doc block and body are now the
// `read` member's own (P-8; archive/p8-merge/2026-10-18/blocks/read.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): readLiteral is deleted; its doc block and body are now the
// `readLiteral` member's own (P-8; archive/p8-merge/2026-10-18/blocks/readLiteral.md).

/// `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, never a view.
///
/// **⟶ AMENDED 2026-10-15 (`surface.md §2.2`'s dated clause of 2026-10-15; `parameter-semantics.md §2.20`):
/// THE DECLARED ORDER IS `write(instance, address, tier, value, commit?)`** — FOUR REQUIRED ARGUMENTS AND
/// THE OPTIONAL ONE AT POSITION FIVE (`proposal-review.md §22.5` item 5). **THE PACKAGE ADDS NO ARITY
/// CHECK, NO DEFAULT AND NO VALIDATION OF ITS OWN AT THIS POSITION** (`docs/specs/storeroom-js/surface.md §2.2` clause 3): an ABSENT `commit` is
/// IN DOMAIN — *"the write opens or joins a commit all the same"* — and **no default record is fabricated
/// for it.**
///
/// **THE FIFTH POSITION'S CLASS TEST IS `docs/specs/storeroom-js/surface.md §2.4` ITEM 9 (g) ITEM 1's OWN** — *"an object position is a record
/// position only where it CARRIES A `pending` MEMBER whose value is present and not `undefined`"* — **and
/// ITS ANSWER IS ONE INSTANCE OF ONE CLASS, `TypeError`, whose `status` MEMBER IS ABSENT and whose string
/// `message` member is required** (`§2.20`'s answer cell; the same refusal `settleOn` takes at the record
/// position). **A REFUSED POSITION STOPS THE WRITE**: no store call is reached, so no version lands and no
/// byte moves. **IT IS A CLASS TEST AND NEVER AN IDENTITY TEST** — no clause reads the caller's history
/// here.
function commitPositionRefusal(commit) {
  if (commit !== null && typeof commit === 'object') {
    // **A `Proxy` IS OUTSIDE THE POSITION'S DOMAIN** (`§2.20`'s outside-value row) and is refused BEFORE a
    // member is read from it, so a `get` trap is never raised — the class order `encodeAddress` and
    // `encodeTier` already take at their own carriers (`A76`/`JS-2`).
    if (!types.isProxy(commit) && !Array.isArray(commit)) {
      let pending;
      try {
        pending = commit.pending;
      } catch {
        pending = undefined; // the guarded read `JS-1` declares: catch, then classify
      }
      if (Object.hasOwn(commit, 'pending') && pending !== undefined) return null;
    }
  }
  return new TypeError(
    `the write's fifth argument is ${classSpelling(commit)}, and the commit position takes an object `
    + 'carrying a `pending` member',
  );
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): write is deleted; its body is now the `write` member's own
// (P-8; archive/p8-merge/2026-10-18/blocks/write.md).

/// **THE PACKAGE'S OWN INVOCATION LOOP** (`surface.md §2.4`: *"the invocation is the packages's"*; `A57`:
/// *"the store returns handles and invokes nothing"*). One invocation per DISTINCT handle the addon's
/// record carries, at the address the record carries beside it — **and a THROWING BODY IS NOT CAUGHT, NOT
/// RETRIED AND NOT REPORTED** (`docs/specs/storeroom-js/surface.md §2.7` item 4, `DD-23`): its own exception propagates out of this loop, and
/// the store's result stands complete and unmoved behind it.
///
/// **⟶ AND THIS IS `A77`'S ID-MATCHING MODEL, SHIPPED EXACTLY AS THE RULING STATES IT** (verbatim: *"the
/// store passes an ID back to the client when a listener is triggered, and the JS side matches that ID to
/// the function the caller registered it with"*, with `A57`'s *"a handle that it returns to alert the
/// client of the trigger"*):
///
/// * **THE ID IS THE `triggered` MEMBER'S OWN ELEMENT — the OPAQUE HANDLE the caller RECEIVED, one
///   identity, and the KEY of the package's own registry** (`docs/specs/storeroom-js/surface.md §2.4`: *"the package owns a PER-INSTANCE
///   REGISTRY keyed by the opaque handle it returned"*). `triggered` carries `wrapHandles`' list, and
///   `wrapHandles` returns THE SAME opaque value for a token it has already wrapped (`state.tokens` is read
///   in both directions), so the identity that arrives here is the very identity `register` was handed at
///   registration — **the matching is by THAT identity alone, and NO ORDER is asserted** (`docs/specs/storeroom-js/surface.md §2.7` item 3,
///   `DD-22`: a drive compares sets, never sequences).
/// * **AN ID THE REGISTRY HOLDS NO FUNCTION FOR FIRES NOTHING — SILENTLY.** The `typeof listener ===
///   'function'` test below is the whole of the arm: no invocation, no code, no warning, no log and no
///   throw, which is `docs/specs/storeroom-js/surface.md §2.4` rule 1 read together with `A77`'s consequence (1) — **and the SILENCE IS THE
///   DECLARED OBSERVABLE, not an assumption** (`JS-11`'s drive asserts the absence of an invocation, of a
///   log and of a throw). Note that the arm is reached for a handle the store returned with no registration
///   AND for a handle the registry once held a non-function for: `register` refuses a non-function at its
///   own site (`docs/specs/storeroom-js/surface.md §2.4` item 5 (d)), so the only way an entry can be non-functional is to be absent.
/// * **A DUPLICATE ID IN ONE TRIGGER SET MATCHES ONE FUNCTION — AND THAT DEDUPLICATION STANDS HERE, AT
///   DELIVERY, BECAUSE THE ARRAY IS THE STORE'S.** `wrapHandles` now carries the store's list ELEMENT FOR
///   ELEMENT, so a lawful caller-spelled duplicate arrives in this loop TWICE and the loop below invokes ONE
///   registered function per DISTINCT identity of that array — **never one per element and never one per
///   entry** (`docs/specs/storeroom-js/surface.md §2.4` rule 3; `surface.md §2.4`'s dated clause (i): *"so in CASE B the duplicate token's ONE
///   function runs ONCE"*). **THE CLAUSE'S OWN SENTENCE *"the shipped `deliver` iterates whatever the array
///   carries and the registry holds AT MOST ONE function per identity, so ONE identity invokes ONE function
///   ONCE under BOTH readings"* HOLDS OF THIS LOOP, AND OF THIS LOOP ALONE** — it holds because the loop
///   iterates the array's DISTINCT IDENTITIES and not its elements.
///   **AND THE AS-FILED READING, RE-EMITTED BECAUSE THE `git diff` READER MEETS IT FIRST** — *"A DUPLICATE ID
///   IN ONE TRIGGER SET MATCHES ONE FUNCTION: `wrapHandles` de-duplicates the returned list by identity
///   (`docs/specs/storeroom-js/surface.md §2.4` rule 3, "once per DISTINCT handle"), so the loop runs once per distinct id."* — **placed that
///   deduplication at the BOUNDARY, where it EDITED a list the store owns; the 2026-10-11 reconciliation moved
///   it here and left the array's multiplicity the store's own** (`DD-42` clause 3; `DD-39`).
/// * **THE INVOCATION RECEIVES TWO DISTINCT DATA, AND THEY ARE NOT THE SAME DATUM** (`A77`'s consequence
///   (4)): **the ID IT WAS MATCHED BY is the loop variable `handle`, the registry KEY — it selects the
///   function and is NOT passed to it**; **what IS passed, as the invocation's ONE argument, is the
///   TRIGGERING ADDRESS** per `parameter-semantics.md §2.12` (*"The package's invocation passes the
///   triggering ADDRESS as its argument; no other argument is declared and no return value is read"*) — the
///   address the addon's own record carries beside the id set. **The two are different data and the cells
///   assert exactly one argument** (`S-FIRE-WINDOW`'s `argCount === 1`).
function deliver(state, triggered, triggeringAddress) {
  const address = typeof triggeringAddress === 'object' && triggeringAddress !== null ? triggeringAddress : [];
  // **⟶ THE RECIPIENT SET IS SNAPSHOTTED WHEN THE WINDOW OPENS, BEFORE THE FIRST INVOCATION — `C-2` OF THE
  // GATE-4 ADVERSARIAL PASS (2026-10-11; `CF-DUP-3`'s re-homing clause, `surface.md §2.4` item 7 (b),
  // `write-and-read.md §6.5` item 14).** The as-built loop called `state.registry.get(handle)` INSIDE the
  // loop, so **the recipient set was read PER ELEMENT, not when the window opened**: a registration made
  // from one listener's body WAS invoked later in the SAME delivery and a withdrawal made from a body was
  // NOT — **and which of the two happened depended on the HOME `HashMap`'s iteration order, which `docs/specs/storeroom-js/surface.md §2.7`
  // item 3 / `DD-22` declare UNOBSERVABLE** (the contradiction the `A78`/`CF-DUP-3` argument refused, and a
  // per-process flake for any drive that took it). **THE FIX IS THE DECLARED RULE SHIPPED AS AN ORDER: the
  // identity→function map is built for the DISTINCT identities of THIS trigger set BEFORE the first
  // invocation, and the loop invokes from that snapshot alone** — so **a registration, a replacement or a
  // withdrawal made during the window TAKES EFFECT AT THE NEXT TRIGGER, and at no element of this one**
  // (`CF-DUP-3`; `off`'s own arm at `offAt` — *"`off` DOES NOT CANCEL A DELIVERY IN FLIGHT"* — is the same
  // sentence read from the withdrawal's side). **THE SNAPSHOT HOLDS THE FUNCTION THE REGISTRY HELD AT THE
  // OPENING**: an identity with no registered function snapshots `undefined` and fires NOTHING SILENTLY
  // (`docs/specs/storeroom-js/surface.md §2.4` rule 1), and a function REPLACED from inside a body does not stand in for the one snapshotted.
  //
  // **ONE INVOCATION PER DISTINCT IDENTITY** (`docs/specs/storeroom-js/surface.md §2.4` rule 3 and its dated clause (i); `docs/specs/storeroom-js/surface.md §2.4` item 6 (b)–(e)):
  // the array is the STORE's and a lawful caller-spelled duplicate makes ONE identity stand in it TWICE, so
  // what is matched is the array's identity SET — each DISTINCT identity ONCE, at its first occurrence and
  // never a second time. **NO ORDER IS ASSERTED BY THIS LOOP OR BY ANY CLAUSE IT ANSWERS TO** (`docs/specs/storeroom-js/surface.md §2.7` item 3;
  // `DD-22`: a drive compares sets, never sequences), and an identity the registry holds no function for
  // still fires nothing at every one of its occurrences.
  //
  // **⟶ AND THE DEDUPE'S KEY IS `entry.handle`, NEVER `entry` — `U-STOREROOM-HELD-LISTENER-IDENTITY`.** **THE
  // RULING, VERBATIM: *"Dedupe on handle — rule 3 stands"*** (`P: docs/pending.md · P-7`'s dedupe ruling;
  // `contract.md §2.4` item 6). **THE DEFECT IT CLOSES, NAMED: the as-built `matched.has(handle)` was keyed on
  // the ELEMENT, and under pairs a handle at `['a']` and `['a','b']` both prefix-match a write at
  // `['a','b','c']` — two pair objects, so the function would fire TWICE, breaching `surface.md:309`'s *"A
  // LAWFUL DUPLICATE FIRES ONCE PER DISTINCT HANDLE"*.** **IT DOES NOT FIRE TWICE; IT FIRES ONCE.**
  //
  // **AND THE FIRST PAIR ENCOUNTERED FOR THAT HANDLE IS THE ONE WHOSE ADDRESS IS CARRIED — a DECLARED
  // READING and not an iteration-order accident**, because `triggered`'s order is UNSPECIFIED (`DD-37`,
  // `DD-22`). **THE CONSEQUENCE, SPELLED: the binding address in `triggered` is INFORMATIONAL DATA about the
  // trigger set and NOT a per-invocation fact; the invocation's ONE argument remains the TRIGGERING address**
  // (`PAR-JS-12`; `AB-3`: *"A body cannot tell which binding matched, and that is declared."*).
  //
  // **⟶ AND THE WHOLE DELIVERY IS MEMBER-FREE FROM 2026-10-24** (`contract.md §2.1`'s clause of this date on
  // `F8-1`, items `(1a)`, `(1b)` and `(1c)`, and item `(2b)`'s rows `58`, `59` and `60`; arm `(xviii)`, cell
  // `JC-TC-64`): the as-built dedupe was a `Set` — lawful to ALLOCATE by item `(1d)(iv)`, and its `has`/`add`
  // and the `for (const item of triggered)` around them were not — the recipients list was appended with
  // `Array.prototype.push`, and the invocation loop read each pair array through
  // `Array.prototype[Symbol.iterator]` by destructuring. **A forged `has`/`add` duplicated or dropped every
  // invocation, a forged iterator yielded no recipient at all, and a no-op `push` emptied the list: the
  // delivery was the caller's answer with no refusal and no counter.** The dedupe is now item `(1c)(vi)`'s
  // membership loop over a local handle list, the append is item `(1c)(v)`'s index write, and the invocation
  // loop is item `(1c)(i)`'s index loop reading each pair by index — the SAME identities, at the SAME first
  // occurrence, in an order no clause asserts (`DD-22`).
  const matched = [];
  const recipients = [];
  for (let i = 0; i < triggered.length; i += 1) {
    const item = triggered[i];
    let seen = false;
    for (let m = 0; m < matched.length; m += 1) {
      if (matched[m] === item.handle) {
        seen = true;
        break;
      }
    }
    if (seen) continue; // ONE invocation per DISTINCT HANDLE — never one per element
    matched[matched.length] = item.handle;
    // **THE `off` MEMBER IS READ HERE AND ONLY HERE — the snapshot the architect's A2 ruling fixes**
    // (`P: docs/pending.md · P-5`'s A2 timing, verbatim: *"Check on/off at the time of decision whether to
    // add the function to the recipients list, not at runtime."*; `identity-and-domain.md §4` item 2):
    // **an entry that is absent or `off` is SKIPPED THERE, and the recipients list carries the FUNCTION**,
    // so the invocation loop below performs the call unconditionally and consults the flag no second time.
    const entry = state.registry.get(item.handle);
    recipients[recipients.length] = [
      item.handle,
      entry === undefined || entry.off === true ? undefined : entry.fn,
    ];
  }
  for (let r = 0; r < recipients.length; r += 1) {
    const pair = recipients[r];
    const listener = pair[1];
    // `docs/specs/storeroom-js/surface.md §2.4` rule 1: a reserved entry invokes nothing and reports nothing — no code, no warning, no log.
    if (typeof listener === 'function') {
      // `crossing.md §1.1` clause 2's deep copy OUT, at the invocation: **each invocation is handed a FRESH
      // dense address array** (`JS-19`), so one listener's mutation of its own argument cannot be observed
      // by the next — no shared object crosses into the caller's own functions.
      listener(decodeSegments(address));
    }
  }
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): deleteOp is deleted; its doc block and body are now the
// `delete` member's own (P-8; archive/p8-merge/2026-10-18/blocks/deleteOp.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): rollback is deleted; its doc block and body are now the
// `rollback` member's own (P-8; archive/p8-merge/2026-10-18/blocks/rollback.md).

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
function homeAddressKey(address) {
  if (!Array.isArray(address)) return `\u0001${typeof address}`;
  const parts = [];
  for (let i = 0; i < address.length; i += 1) {
    const segment = address[i];
    // **THE TWO CLASSES `§1.5`'S DOMAIN HOLDS, AND NOTHING ELSE IS EVER KEYED** (`inDomainAddress` below
    // is the one predicate that admits an address here): a string segment is `s<length>:<bytes>` and an
    // index segment is `n<length>:<digits>` — the length prefix is what makes the join injective.
    if (typeof segment === 'string') {
      parts.push(`s${segment.length}:${segment}`);
    } else {
      const digits = String(segment);
      parts.push(`n${digits.length}:${digits}`);
    }
  }
  return parts.join('\u0000');
}

/// **ONE `listeners[]` ELEMENT IS LAWFUL WHERE THE STORE'S OWN ADMISSION AND THE BOUNDARY'S OWN WALK AGREE
/// ON IT — ADDED 2026-10-17, SO THE SEEDING PREDICATE AND `listen`'S PUSH CONDITION CANNOT DISAGREE ABOUT
/// WHAT A LAWFUL ELEMENT IS** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (a) item 3's *"ADMIT-OR-REFUSE COMES THIRD, and every element
/// read … is reached ONLY for a value the first step has admitted"*, read with `§1.4`'s walk and the store's
/// own `src/args.rs`, which admits exactly the elements whose every segment `Segment::is_in_domain` holds
/// and whose handle token is not blank). **THE FOUR TESTS ARE THE ONES `encodeListeners` AND
/// `constraintAddress` ALREADY TAKE, AND NOT ONE OF THEM IS NEW**: the entry is a plain object (a `Proxy`,
/// an `Array` and a prototype-carrying object refused before a member is read — `§1.4` item 4 (e)–(g),
/// `DD-34`/`DD-35`); `address` and `handle` are OWN members (`Object.hasOwn` and never `in`, `JS-5`); the
/// handle is a non-empty string (`§0.4` clause 3 / `PAR-13`); and the address is an admitted array whose
/// every segment is a string without a lone surrogate or a non-negative SAFE integer — the two classes
/// `encodeSegment` pushes and `Segment::is_in_domain` admits, so the elements the store ADOPTS and the
/// elements this predicate ACCEPTS are one set and the mirror holds one entry per store entry.
function inDomainAddress(address) {
  if (types.isProxy(address) || !Array.isArray(address) || arrayClass(address) === 'class') return false;
  for (let i = 0; i < address.length; i += 1) {
    if (!(i in address)) return false; // a hole is `AddressArg` row 14's own outside shape (`DD-8`)
    const segment = address[i];
    if (typeof segment === 'string') {
      if (hasLoneSurrogate(segment)) return false; // the class the walk refuses before any verb (`C-4`)
    } else if (!(typeof segment === 'number' && Number.isInteger(segment) && segment >= 0
      && Number.isSafeInteger(segment))) {
      return false; // and every other class is `§1.5`'s own outside set
    }
  }
  return true;
}

/// **AND THE SEEDING PREDICATE IS THAT ONE PREDICATE** — the entry's own four tests, taken together.
function isLawfulListenerElement(entry) {
  if (!isPlainObjectValue(entry) || !Object.hasOwn(entry, 'address') || !Object.hasOwn(entry, 'handle')) return false;
  if (typeof entry.handle !== 'string' || entry.handle === '') return false;
  return inDomainAddress(entry.address);
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): listen is deleted; its doc block and body are now the
// `listen` member's own (P-8; archive/p8-merge/2026-10-18/blocks/listen.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): unlisten is deleted; its doc block and body are now the
// `unlisten` member's own (P-8; archive/p8-merge/2026-10-18/blocks/unlisten.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): removeListener is deleted; its doc block and body are now the
// `removeListener` member's own (P-8; archive/p8-merge/2026-10-18/blocks/removeListener.md).

/// **THE REGISTRY'S OWN SITE AT THE PACKAGE'S BOUNDARY** (`surface.md §2.4` item 5): the caller's FUNCTION
/// for a handle, held by the package (`DD-15`) and invoked after the verb has returned (`docs/specs/storeroom-js/surface.md §2.7` item 2).
/// **`register` REPLACES, never fans out** (rule 2); a non-function `listener`, a `handle` THIS INSTANCE
/// never minted or adopted, a bare `string`, a blank token, `null`, `undefined`, a non-opaque value and an
/// ABSENT argument are EACH a refusal — **and NOTHING reaches the store in any of those cases.** **`unlisten`'s
/// NO-OP-SUCCESS reading does NOT extend here**, because a registration's argument is a member of the
/// registry's own key set and has no such arm.
///
/// **⟶ AND THE REFUSAL'S FORM IS THE SINGLE ONE — `surface.md §2.5` item 5 (g), THE OPERATIVE READING, WITH
/// ITS TERMS:** *"the registration site's refusal IS a rejection under `A76` and travels in THIS section's
/// single form, with its `status` drawn from the store's closed set — the store's own `AddressMalformed`,
/// whose declared trigger already covers 'a present argument outside its domain' and 'an absent required
/// argument' — and its `message` generated as clause (d) declares."* **SO THIS SITE NO LONGER THROWS A BARE
/// `TypeError`:** the `TypeError` is *"the SHAPE the site was declared with at the bounded correction pass of
/// 2026-10-11"* (`parameter-semantics.md §2.12`'s second dated exception clause), its declared absence of
/// members *"was never a permission to MINT a status"*, and *"a `status` of `TypeError`, reached at the
/// addon's own boundary, is that finding and not a declared form, because the store's closed set holds no
/// such member"* — **the closed set is neither widened nor re-spelled here (`DD-40`), and this file mints no
/// status of its own.** **THE SITE, ITS DOMAIN, ITS TWO argument POSITIONS, ITS `undefined` RETURN AND ITS
/// REPLACEMENT ARM ARE UNMOVED**; only the refusal's form moved.
function registerOn(state, handle, listener) {
  // docs/specs/storeroom-js/surface.md §2.5 item 5 (b): the ARGUMENT POSITION is the reason's conditional half, and it is named at each arm.
  if (typeof listener !== 'function') {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(listener),
      `register's second argument is ${classSpelling(listener)}, and a registration's listener is a JS function`,
    );
  }
  // **⟶ AND THE HANDLE'S DOMAIN TEST IS A DIRECT MAP KEY CHECK, TAKEN AS A `typeof` READ AND A LENGTH READ
  // AND NOTHING MORE** (`P: docs/pending.md · P-6`, fork (g), verbatim: *"the function lookup is now a direct
  // map key check"*; `identity-and-domain.md §2` item 1). **EVERY ROW OF `§2.1` ITEM 5'S `register` COLUMN IS
  // THIS ONE ARM**: `null`, `undefined`/ABSENT, a non-string, a blank string, a well-formed string the store
  // never held, a FOREIGN instance's handle and a PRIOR SESSION's handle are each `AddressMalformed` — **the
  // `R-B4` reading, verbatim: *"`AddressMalformed` — the instance's domain is the domain"*** — and the
  // message names the argument's POSITION and its CLASS (`surface.md §2.5` item 5 (b); `A134`).
  if (!inDomainHandle(handle)) {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(handle),
      `register's first argument is ${classSpelling(handle)}, and a registration's handle is a non-empty `
        + 'string this caller spells',
    );
  }
  if (!state.registry.has(handle)) {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(handle),
      `register's first argument is '${handle}', and this instance holds no listener entry for it — a `
        + 'registration names a handle `listen` wrote or `cfg.listeners` adopted',
    );
  }
  // ── THE CONSTRAINT/LISTENER CONFLICT — ITS SEAT IS HERE, BEFORE THE REGISTRY IS TOUCHED ────────────────
  // **`B-5` — THE EXISTING REGISTER-SIDE CROSS-KIND REFUSAL, WHOSE *FORM* IS RECONCILED, 2026-10-24**
  // (`D-25`: *"Attempting to overwrite a listener with a constraint or vice versa is rejected"*).
  //
  // **THE TEST'S SEAT IS UNCHANGED AND LOAD-BEARING**: taken AFTER the handle's domain test and AFTER the
  // registry-membership test, and **BEFORE the registry write and BEFORE the re-install `listen`** — a refusal
  // leaves the registry, the home mirror and the store untouched. **NO STATE MOVES.**
  //
  // **WHAT MOVED IS THE FORM, AND THE GROUNDS ARE THE DECLARATION'S (§2.5):** the bytes that stood here threw
  // `withEmptyLog(new TypeError(…))` — **a `TypeError` carrying `log: []`, which is neither the one plain
  // `{status, message, log}` form the surface declares for every refusal nor a bare `TypeError`.** *(i)* **One
  // member function cannot print two failure forms**: the arm sits between two `boundaryReject` calls, and a
  // caller's single `catch` saw an object WITH `status` on nine of `register`'s ten arms and WITHOUT one on the
  // tenth. *(ii)* The surface's own header calls a `TypeError` thrown by any store-reaching verb **a finding**
  // (`index.d.ts:542`–`:552`; the battery cell `a127_no_store_reaching_verb_throws_the_class_test_form`), and
  // `register` **is** a store-reaching member on its re-install arm. *(iii)* **The class-test form belongs to
  // OUTSIDE VALUES of a position**, and a handle that names another kind's registration is **in** its
  // position's domain and outside the instance's domain **for that kind**.
  //
  // **SO: the surface's one plain thrown object, `AddressMalformed`, and the message unchanged in content** —
  // the package's own text naming BOTH SIDES (`contract.md §2.3` item 9 (iii)), rendered through
  // `boundaryReject` exactly as the three arms directly above it already are.
  //
  // **⟶ AND THE PREFIX EXEMPTION IS DELETED, NOT MOVED — `D-22` item 2 and §2.5 item 3.** The six-line comment
  // that stood here declared the kernel's own entry to be the handle it spelled (`constraint@<JSON address>`)
  // and EXEMPTED that whole prefix from this test so the kernel could arm its own `noopListener`. **Under
  // `D-22` the kernel's handle is no longer a reserved spelling — it is the caller's own `id` — and under
  // `D-25` the kernel REGISTERS NOTHING (*"so nothing needs to get past the test"*), so the exemption and its
  // `KERNEL_HANDLE_PREFIX` constant have no subject and `Q2`'s hazard dissolves with its cause.**
  const conflicted = constraintAtAnyAddress(state, handle);
  if (conflicted !== null) {
    boundaryReject(
      'AddressMalformed',
      spellConstraintAddress(conflicted.address),
      `the listener '${handle}' cannot be registered at ${JSON.stringify(conflicted.address)}: the constraint `
        + `'${conflicted.id}' stands at that address, and a listener and a constraint do not share one`,
    );
  }
  // **⟶ AND A RESERVED ENTRY IS RE-ARMED BY RE-INSTALLING ITS STORE SIDE** — *"the entry EXISTS with `off`
  // set; `register(h, fn)` SUCCEEDS and re-arms it"* (`identity-and-domain.md §3` item 2 (i); `contract.md
  // §3` `S-6`; `listen-verb.md §4`'s transition `1 → 2`).
  //
  // **`unlisten` WITHDREW THE STORE'S ENTRY AND KEPT THE MAP ENTRY, so `register` puts the store side back**
  // — at **the addresses THE ACT OF `listen` LAST GAVE THE HANDLE**, which the entry itself carries. **THAT IS
  // THE ONLY PLACE THE SET CAN BE READ FROM ONCE `unlisten` HAS CONSUMED THE MIRROR ROWS** (`identity-and-
  // domain.md §4` item 5's `Map<handle, {fn, off}>` is the one map; the mirror's rows are the store's own and
  // a withdrawal removes them). **THE RE-INSTALL GOES THROUGH `listen`, the ONE creation act** (`P:
  // docs/pending.md · P-5`'s boot ruling read as the one creation path; `listen-verb.md §6` item 1), so no
  // second route installs a store entry.
  //
  // **WHERE THE HANDLE STANDS AT NO ADDRESS — an entry whose set was emptied by `listen(h, [])` — there is
  // nothing to re-install and the act is the map write alone.**
  const standing = state.registry.get(handle).addresses;
  if (standing.length > 0) {
    // **THIS SITE HAS NO CALLER'S `this` AND MUST NOT INVENT ONE**: `registerOn` is the PACKAGE'S OWN
    // internal path, reached from `register` and from the construction's constraint batch, so the store it
    // addresses is the one THIS ENTRY ALREADY HOLDS — `state.receiver` — and not a receiver a caller
    // supplied. **THAT IS THE SAME OBJECT THE PUBLIC MEMBERS HAND WHEN THE CALL IS A MEMBER CALL**, so the
    // re-install reaches the store the caller's object names and no second route installs a store entry.
    // **THIS SITE HAS NO CALLER'S `this` AND MUST NOT INVENT ONE**: `registerOn` is the PACKAGE'S OWN
    // internal path, reached from `register` and from the construction's constraint batch, so the store it
    // addresses is the one THIS ENTRY ALREADY HOLDS — `state.receiver` — and not a receiver a caller
    // supplied. **THAT IS THE SAME OBJECT THE PUBLIC MEMBERS HAND WHEN THE CALL IS A MEMBER CALL**, so the
    // re-install reaches the store the caller's object names and no second route installs a store entry.
    entryOf().listen.call(state.receiver, handleWire(handle), standing.map((address) => encodeAddress(address, 'first argument', 'first argument')));
    state.home = state.home.filter((row) => row.handle !== handle);
    for (const address of standing) {
      state.home.push({ key: homeAddressKey(address), address: address.slice(), handle });
    }
  }
  // **⟶ THE REGISTRATION PATH DOES NOT STOP ADDRESSING A STORE; IT RESOLVES ONE A DIFFERENT WAY**
  // (`js-unwrap.md §4`'s successor sentence). **`register` IS REACHED AS A MEMBER OF THE STORE OBJECT THE
  // PACKAGE RETURNED, so the receiver is the store object itself** — *"the call's own receiver IS the
  // identity"* — **AND THE INTEGER IT USED TO HAND ACROSS IS GONE: `state.id` HAS NO SITE HERE.** The site
  // does not vanish from the code; its operand vanishes from the call. **THE HANDLE IS THE ONE POSITION
  // SUPPLIED, WHICH IS WHAT MAKES THE ENTRY'S DECLARED ARITY `2` READ ON THE CALL** (`export-set-and-dispatch.md
  // §1`; `js-unwrap.md §4`): **the handle and the listener's own slot are the entry's TWO DECLARED
  // POSITIONS**, and the receiver is the store — so the positions are handed POSITIONALLY and not as one
  // array, which is what makes the entry's own arity the arity of this call.
  const addon_ = withAddon();
  try {
    // **THE LISTENER'S POSITION IS NOT SUPPLIED AND IS NOT NEEDED** (`DD-15`): the FUNCTION never crosses —
    // the mapping layer holds it in `state.registry` — so the slot is left to the runtime's own `undefined`
    // and the addon is asked only whether the HANDLE is a member of this instance's domain.
    addon_.register.call(state.receiver, handleWire(handle));
  } catch (refusal) {
    // The addon's own refusal — the store's own code and its own generated message, carried VERBATIM.
    fail(refusal);
  }
  // **`docs/specs/storeroom-js/surface.md §2.4` rule 2: ONE handle, ONE function — the previous entry is REPLACED and dropped without notice,
  // AND `register` CLEARS `off`** (`P: docs/pending.md · P-5`, the entry-shape ruling, part (b):
  // *"`register(handle, listener)` CLEARS `off` AND INSTALLS THE FUNCTION"*; `contract.md §2.2` item 5 (b)).
  // **THE REPLACEMENT ARM IS THE ONE THE ADOPTED HANDLE OF `cfg.listeners` TAKES TOO** (`P-HL-5`'s
  // `S-DEDUPE-WINDOW`).
  const entry = state.registry.get(handle);
  entry.fn = listener;
  entry.off = false;
  return undefined;
}

/// **THE CONSTRAINT A HANDLE'S OWN ADDRESSES STAND AT, WHERE THE ENTRY CARRIES ONE** — the conflict test's one
/// read (`constraint-sites.md §5` items 1–2).
///
/// **IT READS THE PACKAGE'S OWN CACHES AND NOT THE STORE** (`P: docs/pending.md · (Y-2)`, verbatim: *"SO
/// `O-4`'S CHECK — AND C-2'S CONFLICT TEST — READ THE CACHES, NOT THE STORE, AND NEITHER NEEDS A STORE ACT TO
/// ANSWER"*): the mirror's listener rows and `state.constraints`' pairs, both readable before any store act.
///
/// **AND THE TEST IS THE ADDRESS-SET MEMBERSHIP, NOT AN EQUALITY**: a pair standing over N addresses occupies
/// N rows and ONE identity, so the gate answers TRUE where ANY of the pair's addresses matches
/// (`contract.md §2.6` item 4; `P: docs/pending.md · P-7`'s keying ruling, item (iv)).
function constraintAtAnyAddress(state, handle) {
  if (state.constraints.size === 0) return null;
  const standing = state.home.filter((row) => row.handle === handle);
  if (standing.length === 0) return null;
  for (const entry of state.constraints.values()) {
    for (const key of standing) {
      for (const address of entry.addresses) {
        if (homeAddressKey(address) === key.key) return { address, id: entry.id };
      }
    }
  }
  return null;
}

/// **`B-6`'S ONE READ — WHAT INSTALLING `handle` AT `addresses` WOULD DESTROY THAT IT MAY NOT OVERWRITE**
/// (`D-29`, verbatim: *"Listen cannot overwrite constraint, only other listeners"*).
///
/// **THE SUBJECT IS `listen`'S PURGE, STATED AS THE DECLARED INSTANT STATES IT: *"the act must not destroy
/// what it may not overwrite"*.** So the test is taken over the constraint pairs **whose home entry STANDS** —
/// `entry.enabled === true`, the very predicate `withdrawStanding` already reads (*"`enabled === true` ⟺ the
/// pair stands a registration"*), because **a pair the disable left standing none has no entry for the purge
/// to reach and no entry for a refusal to protect.**
///
/// **THE TWO DIMENSIONS, BOTH TESTED** (`D-29`'s stated reading: *"both, because under `D-29` the handle and
/// the `id` are one string"*):
///   1. **IDENTITY** — the handle equals the pair's `id`, so the same string names a listener entry and a
///      constraint pair. Under `D-29` that is one namespace and a cross-kind overwrite.
///   2. **ADDRESS** — the set names an address the pair's home entry occupies, so the caller's act reaches
///      the address the constraint is registered at.
///
/// **AND ONE ACT IS LAWFUL UNDER BOTH: THE KERNEL'S OWN RE-LISTING OF A PAIR.** `K-1` calls
/// `store.listen(id, set)` with **the pair's own `id` and the pair's own accumulated set**; `constraintOn`'s
/// enable arm re-registers a pair whose registration the disable purged; `restoreHeldPair`'s wake re-registers
/// a pair after a refused re-registration. **Each is a SAME-KIND re-assignment that destroys nothing** — the
/// set covers every address the pair stands at and the handle IS the pair's own word for it — so the test
/// exempts exactly `handle === entry.id` **and** a set that covers **all** of `entry.addresses`. **That is not
/// a reserved namespace and not a second rule: it is the purge's own test read literally** (`D-22` discarded
/// the prefix, and `D-29` discards the namespace with it, so what distinguishes the kernel's act is the ACT
/// and not a spelling).
///
/// **NO STORE ACT IS TAKEN HERE**: both dimensions read `state.constraints`, the package's own read model.
/// **`B-4`'S ONE READ — THE ADDRESS AT WHICH A **LIVE LISTENER** STANDS UNDER `handle`, OR `null`.**
///
/// **"LIVE LISTENER" IS THE EXACT PREDICATE AND IT IS NOT A SHORTHAND.** The package's own registry holds an
/// entry for EVERY handle the store knows, **including a constraint pair's** — under `D-22`/`D-29` the kernel's
/// `K-1` reaches `listen(id, set)` and the entry `listen` writes is `{fn: undefined, off: true, addresses}`.
/// So a *listener* stands exactly where `off === false` AND `fn` is a function: that pair of facts is what
/// `register` sets and what nothing else sets, **and it is what keeps a constraint pair's own reservation from
/// reading as a listener at its own `id`** (`D-24`'s same-kind overwrite must stay lawful at a held pair).
///
/// **THE ADDRESS ANSWERED IS THE MIRROR'S** (`state.home`, the package's own copy of the store's entries), and
/// it is read for the MESSAGE alone — the refusal's subject is the identity, not the address.
function listenerStandingAt(state, handle) {
  const entry = state.registry.get(handle);
  if (entry === undefined || entry.off !== false || typeof entry.fn !== 'function') return null;
  for (let i = 0; i < state.home.length; i += 1) {
    if (state.home[i].handle === handle) return { address: state.home[i].address };
  }
  return null;
}

function constraintOverwrittenByListen(state, handle, addresses) {
  if (state.constraints.size === 0) return null;
  const actKeys = [];
  for (let i = 0; i < addresses.length; i += 1) actKeys[i] = homeAddressKey(addresses[i]);
  for (const entry of state.constraints.values()) {
    if (entry.enabled !== true) continue;
    // IS THIS THE PAIR'S OWN RE-LISTING? the handle is its word and the set covers every address it stands at.
    let covers = entry.addresses.length > 0;
    for (let i = 0; i < entry.addresses.length; i += 1) {
      const heldKey = homeAddressKey(entry.addresses[i]);
      let found = false;
      for (let k = 0; k < actKeys.length; k += 1) {
        if (actKeys[k] === heldKey) {
          found = true;
          break;
        }
      }
      if (!found) {
        covers = false;
        break;
      }
    }
    if (covers === true && handle === entry.id) continue;
    // DIMENSION 1 — THE HANDLE EQUALS THE PAIR'S `id`.
    if (handle === entry.id) return { address: entry.addresses[0], id: entry.id };
    // DIMENSION 2 — THE SET NAMES AN ADDRESS THE PAIR'S HOME ENTRY OCCUPIES.
    // **AND THIS DIMENSION'S SUBJECT IS A *LISTENER'S* ACT, WHICH IS WHY IT IS READ LAST AND BEHIND THE
    // CROSS-KIND QUALIFIER.** A handle that names a constraint pair this instance carries — or the one the
    // kernel is establishing this instant — is a CONSTRAINT's word, so the act is same-kind and `D-25`'s
    // overwrite rule governs it, not this refusal. **A LISTENER's handle names no pair, and that is exactly the
    // act `D-29` closes:** `listen('listener-a', [a])` where a constraint stands at `a`.
    if (state.constraints.has(handle) || state.establishing === handle) continue;
    for (let i = 0; i < entry.addresses.length; i += 1) {
      const heldKey = homeAddressKey(entry.addresses[i]);
      for (let k = 0; k < actKeys.length; k += 1) {
        if (actKeys[k] === heldKey) return { address: entry.addresses[i], id: entry.id };
      }
    }
  }
  return null;
}

/// **THE TERMINAL ARM'S OWN ACT, PERFORMED BY THIS ENTRY AT THE KERNEL'S INSTANT — THE ONE THING `settle`'S
/// REMOVAL DOES NOT TAKE** (`surface.md §2.7` item `7` (a)–(d) and that item's clause of 2026-10-18; `§2.11`
/// clauses 2–5 and clause 9's mark of the same date).
///
/// **THE KERNEL REACHES THIS FUNCTION UNDER THE `TERMINAL_ARM` SYMBOL KEY AND NEVER THROUGH A NAMED MEMBER**:
/// the product's declared twelve own members are unmoved (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)), because a symbol-keyed own
/// property is invisible to `Object.keys` and to `Object.getOwnPropertyNames` (`A117` (D6); `docs/specs/storeroom-js/surface.md §2.11` clause 9).
///
/// **AND THE TWO ACTS IT PERFORMS ARE NOT ADOPTION MACHINERY — THEY ARE `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 2'S SAVE AND `docs/specs/storeroom-js/surface.md §2.7`
/// ITEM `7`'S DELIVERY, EACH DECLARED AT ITS OWN HOME AND EACH WHICH THE REMOVAL LEAVES STANDING:**
///
/// * **THE `file`-TIER SAVE, FIRST, BEFORE ANY BODY OF THE DELIVERED SET IS INVOKED** (`docs/specs/storeroom-js/surface.md §2.11` clause 2:
///   *"THE ACT IS THE FIRST THING THAT ARM DOES, before any body of the delivered set is invoked"*). **IT IS
///   GATED BY THE KERNEL'S OWN MARK AND BY NOTHING ELSE** — `record[SETTLED_ON_THE_PASSING_ARM] === true`,
///   which is `A117` (D6)'s fact told under a symbol key and NOT `settle`'s signal (`docs/specs/storeroom-js/surface.md §2.4` item 9's
///   adoption-machinery clause, item `(v)`: *"IT SURVIVES, AND FOR A REASON THAT IS NOT LOYALTY TO A REMOVED
///   MEMBER"*). **A FAILED SAVE SETS `SAVE_FAILED_AT_THE_TERMINAL_ARM` ON THE VERY RECORD AND RETHROWS**
///   (`docs/specs/storeroom-js/surface.md §2.11` clause 9; the kernel's catch reads that mark and nothing else).
/// * **THE RESIDUE'S DELIVERY** (`docs/specs/storeroom-js/surface.md §2.7` item 7 (a)): the handle set standing in `record.pending` at this
///   instant — the whole triggered set MINUS what the pass checked off, MINUS the failing write's own set —
///   **PLUS the checked-off identities the kernel published under `CHECKED_OFF`**, each resolved through THIS
///   instance's registry, each invoked ONCE with the TRIGGERING ADDRESS as its single argument (`PAR-JS-12`).
///   **AN EMPTY RESIDUE IS A NO-OP AND NOT A FAILURE** (item 7 (c)), and a handle with no registered function
///   fires NOTHING SILENTLY (`docs/specs/storeroom-js/surface.md §2.4` rule 1).
///
/// **NO ADOPTION, NO LEDGER, NO WITHHOLD AND NO DELIVERED MARK IS TOUCHED HERE** — those four structures are
/// gone with `settle` — **and `CommitRecord.pending` is READ and never owned** (`docs/specs/storeroom-js/surface.md §2.4` item 9's
/// adoption-machinery clause, item `(vi)`: the record keeps its `FOUR` members).
function terminalArm(state, record) {
  // **THE CLASS TEST COMES FIRST AND IS THE ONE THE FIFTH POSITION ALREADY TAKES** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1
  // read with `§2.20`): a value carrying no `pending` is no record position, and this channel is the kernel's
  // own — a caller never reaches it. Nothing is changed by a refused value.
  if (record === null || typeof record !== 'object' || types.isProxy(record) || record.pending === undefined) {
    return undefined;
  }
  // ── `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 2: THE TERMINAL ARM'S FIRST ACT, ON THE PASSING ARM AND THE `file` TIER ALONE ─────────
  // **THE ARM IS READ OFF THE KERNEL'S MARK AND OFF NOTHING ELSE**: a `file`-tier write whose pass FAILED
  // arrives here with its record in hand and drives NO save and NO store call of its own (`docs/specs/storeroom-js/surface.md §2.11` clause 1).
  const answer = state.leg;
  if (
    record[SETTLED_ON_THE_PASSING_ARM] === true
    && answer !== null
    && answer !== undefined
    && answer.op !== null
    && answer.op !== undefined
    && answer.op.tier === 'file'
  ) {
    try {
      // **THE FILE-TIER SAVE'S OWN ENTRY, REACHED BY ITS OWN NAME** (`js-unwrap.md §5`: *"EACH MEMBER CALLS
      // ITS OWN VERTICAL ENTRY DIRECTLY"*; `§2` row `8` names `commitFile` "the file-tier save"). **IT IS
      // THE ONE ARM OF THE NINE WITH NO PUBLIC MEMBER OF ITS OWN** — the terminal arm of a kernel-driven
      // write is where a `tier: 'file'` record is saved, so the entry is named HERE and no store member
      // stands for it. **THE ENTRY IS DESTRUCTURED FIRST SO THE CALL SPELLS THE ENTRY'S NAME AS A BARE
      // IDENTIFIER**, which is what makes the site a direct call in the clause's own sense rather than a
      // member read off the addon object.
      // **THE ENTRY IS REACHED BY ITS OWN NAME AT THE CALL SITE** (`js-unwrap.md §5`: *"EACH MEMBER CALLS ITS
      // OWN VERTICAL ENTRY DIRECTLY. The verb string disappears — it is no longer data, because it is the
      // entry's name."*). **THE ONE FRAME THIS FILE DECLARES FOR IT IS `commitFile` ITSELF** — see its own
      // declaration below — **and this site calls it by that name and hands it the ONE position the entry
      // declares**, the adopted record's operation identity (`export-set-and-dispatch.md §1`'s arity `2`:
      // the receiver and this one position).
      // **THE RECEIVER IS `state.receiver` AND NOT `this`, AND THAT IS THE ONE PLACE IN THIS FILE WHERE THE
      // TWO DIFFER.** `terminalArm` is reached through the symbol-keyed channel as a PLAIN FUNCTION call
      // (`[TERMINAL_ARM](record) { return terminalArm(state, record); }`), so its own `this` is NOT the store
      // object — while the store the terminal arm addresses is the one THIS ENTRY OWNS, which `state` holds.
      // **`receiver-and-refusal.md §5` IS THE CLAUSE**: *"a Deliberately re-bound receiver is still a
      // receiver … A listener that is itself a store member is NOT supported"* — the package's own internal
      // paths (this one and `registerOn`'s re-install) address the store they hold, and only a CALLER's call
      // takes its receiver from `this` (`§1`).
      carryRefusal(() => commitFile(state.receiver, answer.op.opId), [encodeOpId(answer.op.opId)]);
    } catch (saveFailure) {
      // **THE FAILURE CARRIES THE VERY THROWABLE AND ITS OWN MARK** (`docs/specs/storeroom-js/surface.md §2.11` clause 9): the kernel's catch
      // reads `SAVE_FAILED_AT_THE_TERMINAL_ARM` to tell a failed save from a body of the delivered set that
      // threw, and the store's own two-member form crosses UNCHANGED (`§1.2` item 2).
      record[SAVE_FAILED_AT_THE_TERMINAL_ARM] = saveFailure;
      throw saveFailure;
    }
  }
  // ── `docs/specs/storeroom-js/surface.md §2.7` ITEM 7 (a): THE DELIVERED SET — THE RESIDUE PLUS THE CHECKED-OFF IDENTITIES ──────────────────
  // **THE RESIDUE IS THE MEMBER'S OWN VALUE AT THIS INSTANT** (`docs/specs/storeroom-js/surface.md §2.7` item 7 (a)): the residue's members are
  // THIS instance's own opaque handles, and one it holds no handle for fires nothing silently (`docs/specs/storeroom-js/surface.md §2.4` rule 1).
  const triggered = Array.isArray(record.pending) ? record.pending.slice() : [];
  // **BESIDE IT, THE IDENTITIES THE PASS CHECKED OFF WHOSE OWED FIRING STANDS** (`docs/decisions.md` · `A117`
  // (D5); `docs/specs/storeroom-js/surface.md §2.7` item 7 (a)'s keying of 2026-10-15): **the check-off consumes the EVALUATED PAIR'S OWN
  // delivery of that identity and never that identity's WHOLE owed delivery** — the app's registration at a
  // pair-adopted address is OWED ITS FIRING AFTER THE PASS (`docs/specs/storeroom-js/surface.md §2.4` item 8 (c) as corrected 2026-10-15), so an
  // identity whose pair the pass evaluated is NOT an identity with no owed firing, and where this registry
  // still holds a function for it this arm delivers it ONCE, exactly as the residue's own members are.
  // **NO MEMBER IS ADDED** (`A117` (D6)): the kernel's finding travels under a SYMBOL key and
  // `record.pending` stands exactly as the check-off left it.
  //
  // **⟶ AND THE TERMINAL ARM'S RE-APPEND OF BARE HANDLES IS DELETED — `U-STOREROOM-HELD-LISTENER-IDENTITY`.**
  // **UNDER POP THE ENTRY A CHECK-OFF REMOVES IS REMOVED FROM `pending`, SO NOTHING IS CARRIED BESIDE IT AND
  // THE BARE-HANDLE UNION HAS NO SUBJECT** (`P: docs/pending.md · (AA-7)`, verbatim; `contract.md §2.4`
  // items 4–5; `trigger-and-pair.md §3` item 3: *"the terminal arm's re-append of bare handles … were how a
  // checked-off identity was carried BESIDE `pending`; under POP the entry is REMOVED, so nothing is carried
  // beside"*).
  //
  // **AND THE FORBIDDEN STATE HAS NO PRODUCER**: `pending` must never become heterogeneous — a bare handle
  // appended beside pairs is `TF-7` (`P: docs/pending.md · P-7`'s `pending` ruling, item (3), closing
  // sentence; `contract.md §2.5` item 2), and the deletion of this arm is what discharges the prohibition.
  // **THE OWED FIRING IS UNMOVED**: a popped identity's firing is still reached through THE REGISTRY'S
  // RESOLUTION at the delivery instant (`A117` (D5)/(D6); `contract.md §2.4` item 4).
  // **THE INVOCATION'S ONE ARGUMENT IS THE TRIGGERING ADDRESS** (`docs/specs/storeroom-js/surface.md §2.7` item 5): the OP's OWN address and
  // never the registration's watch address (`kernel-surface.md §2.1` item 2 (ii)).
  const triggeringAddress = answer === null || answer === undefined || answer.op === null || answer.op === undefined
    ? undefined
    : answer.op.address;
  // `deliver` is THE SAME loop the post-verb window uses (`docs/specs/storeroom-js/surface.md §2.4` rules 1–3 read once, at both instants): ONE
  // invocation per DISTINCT handle, and a handle with no registered function fires nothing silently.
  deliver(state, triggered, triggeringAddress);
  return undefined;
}

/// **⟶ THE ORDERING SEAM IS REMOVED WHOLE, 2026-10-18 — `settle(record)` IS NOT A MEMBER OF THIS PRODUCT.
/// THIS SITE CARRIES THE POINTER AND NO BYTES OF THE FUNCTION THAT STOOD HERE** (`surface.md §2.4` item 9
/// (the `REMOVED-WHOLE` pointer of that date, whose own words are *"NO DRIVE MAY ASSERT A CALL OF `settle`
/// FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT"*) read with that item's adoption-machinery clause,
/// which reconciles the machinery this function carried.
///
/// **THE ARCHITECT'S RULINGS, VERBATIM AND DATED 2026-10-18: *"Settle is redundant because the kernel is
/// always in the loop."* · *"Always route to the kernel, because the JS code does not decide whether
/// constraints trigger."* · *"The kernel is always supposed to be in the middle. Any occasion where the
/// write path is not governed by the kernel is a hallucination."***
///
/// **WHAT WENT WITH IT, NAMED SO NOTHING IS DISPOSED OF BY SILENCE:** the ADOPTION (an identity put in
/// flight at instant (a) and withheld from the write that would claim it), the LEDGER (the identity the
/// verb answered with), the DELIVERED MARK (a first-versus-second call discriminator) and the WITHHOLD set —
/// the four structures the three rulings leave with nothing to hold, because ONE ACTOR drives every write and
/// there is nothing to marshal. **THIS IS WHERE THE DOWNSTREAM `DEF-D` DEFECT LIVED** (an abandoned adoption
/// consumed by the next unrelated write), and its SUBSTRATE is what the removal takes rather than its symptom.
///
/// **AND WHAT THE FUNCTION ALSO CARRIED IS NOT LOST WITH IT, WHICH IS THE ONE THING THAT MUST BE SAID HERE
/// RATHER THAN LEFT TO A READER: THE TERMINAL ARM'S `file`-TIER SAVE AND THE RESIDUE'S DELIVERY.** Both are
/// `docs/specs/storeroom-js/surface.md §2.11` clause 2's and `docs/specs/storeroom-js/surface.md §2.7` item `7`'s own acts and both are declared at those homes — **and this entry
/// still performs them, at the one site that owes them:** the kernel's `runAttempt` reaches this instance's
/// own delivery through `deliver` (the same loop the post-verb window uses), and the passing arm's save is
/// gated by `SETTLED_ON_THE_PASSING_ARM`, which SURVIVES this removal on its own fact — it is `A117` (D6)'s
/// kernel-told symbol and `docs/specs/storeroom-js/surface.md §2.11` clause 2's save gate, and it is NOT adoption machinery
/// (`docs/specs/storeroom-js/surface.md §2.4` item 9's adoption-machinery clause, item `(v)`: *"IT SURVIVES, AND FOR A REASON THAT IS NOT
/// LOYALTY TO A REMOVED MEMBER"*). `CommitRecord.pending` ALSO SURVIVES, at `FOUR` members (item `(vi)`):
/// the adoption system CONSUMED it and did not OWN it, and `docs/specs/storeroom-js/surface.md §2.7` item 7 (a) still reads the delivered
/// residue off it.

// ---------------------------------------------------------------------------------------------
// THE TWO NEW INSTANCE MEMBERS — `surface.md §2.4` ITEM 7, READ AT ITS OWN BYTES, AND `§2.1`'s DATED
// CLAUSE (a): `on(address, listener) -> handle` AND `off(handle) -> undefined`, BESIDE `register`.
//
// **BOTH ARE DELIVERY-SIDE ONLY AND NEITHER IS A RELEASE VERB** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (c); `A78`; `A74`): neither
// STATES, ALTERS OR PROMISES ANY FIRING RULE — which listener fires, when it fires, what it is bound to,
// which ids a trigger returns, the home's registration semantics, the address-prefix rule and the
// process-scoped handle are ALL STORE BEHAVIOUR, **and the authority for each of them stands at
// `docs/specs/storeroom-native/write-and-read.md §6.5` item 14**, where a drive derives them. `on`
// PERFORMING the store's `listen` and `off` PERFORMING the store's `unlisten` is a DELIVERY-SIDE ACTION
// upon the store's own verbs and never a statement about what the store's home does when it lands.
// **NO FIRING RULE IS STATED BY THIS PACKAGE** — the invocation COUNT and the ONE invocation argument are,
// and they are `docs/specs/storeroom-js/surface.md §2.4` rule 3 and item 6, unmoved.
//
// **AND NOTHING OF THE STORE MOVES:** the two members are built over `listen` and `unlisten` EXACTLY as
// `docs/specs/storeroom-js/contract.md §2.10` declares them — same names, same positions, same arity, same returns, and the store's own crate
// and contract directory untouched (`docs/specs/storeroom-js/surface.md §2.1`'s dated clause (c); `A68`).
// ---------------------------------------------------------------------------------------------

/// **THE `on`/`off` ROUTE IS MERGED AWAY — `A127` (2026-10-16).** The combined `on(address, listener)`
/// and the package-owned withdrawal `off(handle)`, together with their argument walks
/// (`validateOnAddress`, `validateOnArguments`), their two step lists and `deregister`, are REMOVED FROM
/// THIS FILE at that dated clause: the product's declared member set is the TWELVE `10 + 1 + 1 = 12` ✓.
/// **THE LISTENER REGISTRATION ROUTE IS REACHED AS ITS TWO DECLARED HALVES** — `a.listen(address)` and
/// `a.register(handle, listener)` — and withdrawal as `a.unlisten(handle)`. **NOTHING OF THE STORE'S OWN
/// `listen`/`unlisten` MOVES** (`docs/specs/storeroom-js/contract.md §2.10`: same names, same positions, same arity, same returns, and rule 4
/// verbatim), and the ONE observable the removed route alone owned — `AddressMalformed` for an outside
/// `handle` at `off`'s position — is declared away with it: `unlisten`'s own answer over an outside value
/// stays the NO-OP SUCCESS `docs/specs/storeroom-js/surface.md §2.3` item 4 / `PAR-JS-8` declares.

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
const ARGUMENT_POSITION_FIRST = 'first argument';
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
function constraintsKernel() {
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
function constraintPairKey(addresses, id) {
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
function addressSetKey(addresses) {
  const spells = [];
  for (const address of addresses) {
    spells.push(homeAddressKey(address));
  }
  spells.sort();
  return spells.join('\u0001');
}

/// **THE ONE REFUSAL `docs/specs/storeroom-js/surface.md §2.12` ITEM 4 DECLARES, TAKEN BEFORE ANY ACT AND LEAVING NOTHING CHANGED** — a JS
/// `TypeError`, its `status` member ABSENT, no `message` member of this unit's own, **the store's closed
/// `16`-member set neither minted nor widened, and the store reached by no call this refusal makes.**
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
function constraintRefuse(where, value) {
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
function withEmptyLog(error) {
  Object.defineProperty(error, 'log', {
    value: [],
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return error;
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
function constraintSite(state, verb, supplied, pair, constraint) {
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
      addresses.push(each.s);
    }
  } else {
    const encoded = constraintAddress(pair.address);
    if (typeof encoded === 'string') {
      constraintRefuse(`pair at the ${ARGUMENT_POSITION_FIRST} of \`${verb}\``, pair);
    }
    addresses.push(encoded.s);
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

/// **THE ONE ACT THAT MAKES A PAIR A PAIR THE ENTRY CARRIES** (`docs/specs/storeroom-js/surface.md §2.12` item 1's preamble clause (a)–(b)):
/// `K-1` AT THE INSTANCE — the key at its own positions and the caller's function at the fourth, which is
/// the SAME call `storeCreate`'s batch registration makes — and THE ENTRY'S OWN RECORD BESIDE IT, whose
/// `enabled` member is the pair's state and whose `identity` is THE PAIR'S OWN OPAQUE VALUE (`PAR-JS-25`).
/// **THE IDENTITY IS MINTED ONCE PER PAIR AND IT CARRIES NO READABLE MEMBER**: a second ADD at the same pair
/// overwrites the element and answers THIS SAME VALUE, and two pairs answer two values. **`PAR-JS-25`'s
/// opacity is the observable** — *"it has no own enumerable member at all"* — so it is a null-prototype
/// object and NOT the entry record: every datum above stays the entry's own and never crosses.
function carryConstraint(state, instance, addresses, id, constraint) {
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
  const outerEstablishing = state.establishing;
  state.establishing = id;
  try {
    for (const address of addresses) {
      try {
        constraintsKernel().register(instance, address, id, constraint);
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
function registrationCrossing(refusal) {
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
  // `{status, message, log}`, the `status` the STORE's `ConstraintListInvalid`, the `message` the STORE'S
  // OWN GENERATED SENTENCE, and the `log` the synthetic attempt's log where a repair was attempted and `[]`
  // where none was. **NO `KC` TOKEN CROSSES** (`A120` (2); `docs/specs/storeroom-js/surface.md §2.12` item 3 item 2): the synthetic attempt's
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
function withdrawStanding(instance, held) {
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
function restoreHeldPair(state, instance, held) {
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
function constraintUncarried(verb, pair) {
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
/// `{ address, addressKey, id, fn, enabled, identity }`. So the read is a CARRIAGE READ and no kernel item is
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
function enumerateConstraints(state) {
  const pairs = [];
  for (const entry of state.constraints.values()) {
    // A FRESH PLAIN OBJECT PER CALL AND A FRESH SEGMENT ARRAY WITHIN IT (`slice`): a caller that mutates a
    // returned element, or an element's `address`, changes nothing the next call returns — and nothing of the
    // entry's own record either, the two members being copies of the pair's own data.
    // **THE `address` MEMBER IS THE PAIR'S OWN SET** (`contract.md §2.6` item 5; `PAR-HL-13`): one row per
    // `state.constraints` VALUE, unchanged in count, with its `address` member's type moved
    // (`P: docs/pending.md · P-7`'s answer clause, item (1)) — a FRESH array of FRESH segment arrays.
    pairs.push({ address: entry.addresses.map((address) => address.slice()), id: entry.id });
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
function constraintWrite(state, instance, address, tier, value) {
  const kernel = constraintsKernel();
  let record;
  try {
    record = kernel.commit(instance, address, tier, value);
  } catch (refusal) {
    constraintCrossing(refusal);
  }
  const answer = state.leg;
  try {
    kernel.runAttempt(instance, record);
  } catch (refusal) {
    constraintCrossing(refusal);
  }
  return answer;
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
/// * a `KC`-token value the kernel built → **the kernel's arm**, and `FileCommitFailed` crossings below;
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

function constraintCrossing(refusal) {
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
  // (`docs/specs/storeroom-constraints/fail-surface.md §1.1`), and it crosses with the STORE's
  // `FileCommitFailed` in `status` because no caller-side status can carry a `KC` token and a
  // constraint-refused write is a commit that did not stand: **the kernel token does NOT enter `status`, and
  // the `log` it carries is the attempt's, VERBATIM.**
  throw {
    status: 'FileCommitFailed',
    message: typeof refusal.message === 'string'
      ? refusal.message
      : 'the write was refused by a constraint of this attempt',
    log: refusalLog(log),
  };
}

// **THE MODULE NAMESPACE CARRIES ONE NAME, `storeCreate` ALONE** (`surface.md §2.9` item 1's `A127` clause;
// `11 → 1` ✓): `delete`'s reserved-word spelling, the ten store-reaching names and the three constraint
// functions are the product's own members above and have no export and no second spelling at any layer.
