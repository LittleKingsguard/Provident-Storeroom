// `D-2` (`docs/L1/entry-subdivision.md` §1 part `7`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { appendOwn, fail } from './refusal.mjs';
import { withAddon, boundaryReject } from './artefact.mjs';
import { arrayClass, classSpelling, hasLoneSurrogate, isPlainObjectValue, targetSpelling } from './class-decision.mjs';
import { encodeAddress, encodeOpId, handleWire, inDomainHandle } from './carrier.mjs';
import { decodeSegments, spellConstraintAddress } from './frame.mjs';
import { addressSpelling } from './kernel-foundations.mjs';
import { entryOf, carryRefusal, commitFile, homeAddressKey, externalCall, commitLogOf, SETTLED_ON_THE_PASSING_ARM, SAVE_FAILED_AT_THE_TERMINAL_ARM } from './state.mjs';

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
export function commitPositionRefusal(commit) {
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
  // **⟶ THE ORDINAL IS CORRECTED 2026-10-26, AND IT IS A SHIPPED DIAGNOSTIC: THIS SENTENCE READ *"the write's
  // fifth argument"* FOR A PARAMETER THAT STANDS AT THE FOURTH POSITION.** The FIVE was the count of the
  // MODULE-era spelling `write(instance, address, tier, value, commit?)`, whose dropped leading `instance`
  // position (`A127`'s receiver rule) made the commit the FOURTH of the method: `write(address, tier, value,
  // commit?)` (`bindings/js/index.d.ts`, the `write` member's own clause: *"the commit, at the FOURTH
  // position of the METHOD, which is the position the `instance`-leading spelling made FIVE (`A124`)"*).
  // **THE CLASS TEST, ITS ANSWER, ITS INSTANT AND ITS FORM ARE UNMOVED — the word is the whole of the
  // change, and a caller who reads the message is now told which position to look at.**
  return new TypeError(
    `the write's fourth argument is ${classSpelling(commit)}, and the commit position takes an object `
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
export function deliver(state, triggered, triggeringAddress) {
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
    appendOwn(matched, item.handle);
    // **THE `off` MEMBER IS READ HERE AND ONLY HERE — the snapshot the architect's A2 ruling fixes**
    // (`P: docs/pending.md · P-5`'s A2 timing, verbatim: *"Check on/off at the time of decision whether to
    // add the function to the recipients list, not at runtime."*; `identity-and-domain.md §4` item 2):
    // **an entry that is absent or `off` is SKIPPED THERE, and the recipients list carries the FUNCTION**,
    // so the invocation loop below performs the call unconditionally and consults the flag no second time.
    const entry = state.registry.get(item.handle);
    // **⟶ AND A CONSTRAINT'S ENTRY IS SKIPPED HERE — `D-69`, 2026-10-29.** The registration now holds the pair's
    // OWN body (`K-1` hands it over, `installRegistrationSeam`), so the test that used to keep an inert entry out
    // of this list — *"a handle the registry holds NO function for fires NOTHING, SILENTLY"* (`docs/specs/
    // storeroom-js/surface.md §2.4` rule 1) — no longer excludes it by ABSENCE. **THE KIND DOES**: *"an element
    // whose handle is a constraint's `id` is asked; a listener's is delivered."* **A PAIR'S BODY IS ASKED BY THE
    // PASS, WITH THE `AttemptContext` ITS SHAPE DECLARES; IT IS NEVER INVOKED HERE, WITH THE TRIGGERING ADDRESS.**
    appendOwn(recipients, [
      item.handle,
      entry === undefined || entry.off === true || entry.kind === 'constraint' ? undefined : entry.fn,
    ]);
  }
  for (let r = 0; r < recipients.length; r += 1) {
    const pair = recipients[r];
    const listener = pair[1];
    // `docs/specs/storeroom-js/surface.md §2.4` rule 1: a reserved entry invokes nothing and reports nothing — no code, no warning, no log.
    if (typeof listener === 'function') {
      // `crossing.md §1.1` clause 2's deep copy OUT, at the invocation: **each invocation is handed a FRESH
      // dense address array** (`JS-19`), so one listener's mutation of its own argument cannot be observed
      // by the next — no shared object crosses into the caller's own functions.
      //
      // **⟶ AND THE INVOCATION NAMES NO COMMIT, 2026-10-27 — THIS IS THE SITE BOTH RULINGS ARE ABOUT.** **THE
      // ARCHITECT, VERBATIM: *"A listener should be operating at the surface and opening a new commit"*** and
      // *"how is a listener supposed to be able to reuse the outer verb's commit? The listener is an
      // externally-passed function and should be making calls at the package surface. It should be opening a new
      // commit by default of entering at the surface"*** (`strata/decisions.md` · `D-46` item `1`; `D-45`).
      // **AND IT IS NOT AN EXCEPTION TO `D-46`'S RULE BUT ITS ABSENT ARM: A LISTENER BODY HAS NO COMMIT TO
      // NAME** — it is handed the triggering address and nothing else (`PAR-JS-12`), so `externalCall` hands the
      // channel no commit and **a verb it calls at this surface OPENS ITS OWN**: its check has a window of its
      // own, the pairs standing over the addresses it writes to are asked by ITS pass, and the count rises by one
      // for it and falls by one when it ends, **the outer verb's count unchanged across the call**
      // (`tests/e2e/external-commit.test.mjs` prints both figures). **NOTHING IS INFERRED FROM THE FRAME ANY
      // MORE**: the name is set here, restored when the body returns or throws, and every internal step of the
      // listener's own write names the commit that write opened.
      externalCall(state.receiver, () => listener(decodeSegments(address)));
    }
  }
}

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): deleteOp is deleted; its doc block and body are now the
// `delete` member's own (P-8; archive/p8-merge/2026-10-18/blocks/deleteOp.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): rollback is deleted; its doc block and body are now the
// `rollback` member's own (P-8; archive/p8-merge/2026-10-18/blocks/rollback.md).



// ⟶ CARVED UP 2026-10-24 (`D-2`/`D-33`): `inDomainAddress` and `isLawfulListenerElement`, with their doc
// blocks, now live with the class decisions — see that part's marker. Nothing else left this region.
// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): listen is deleted; its doc block and body are now the
// `listen` member's own (P-8; archive/p8-merge/2026-10-18/blocks/listen.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): unlisten is deleted; its doc block and body are now the
// `unlisten` member's own (P-8; archive/p8-merge/2026-10-18/blocks/unlisten.md).

// ⟶ MOVED 2026-10-18 (`RCA-8(g)`): removeListener is deleted; its doc block and body are now the
// `removeListener` member's own (P-8; archive/p8-merge/2026-10-18/blocks/removeListener.md).

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ ADDED 2026-10-29 — THE REGISTRATION'S OTHER SLOT: `D-69`'S HANDLE AND BODY, SPELLED ONCE.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`D-69`'S RULING, VERBATIM: *"It doesn't need to mint an inert listener body, it already should require a
// constraint function with a handle"*** (`strata/decisions.md`). **THE STORE'S REGISTRATION IS A HANDLE AND A
// BODY** — a listener carries `{handle, address, listener}`, a constraint carries `{handle, address, constraint}`
// — **and a pair HAS both**: its `id` is its handle (`D-29`) and its `constraint` is its body (`D-26`). **So
// `K-1` hands the registration what the pair already has, and the entry below admits EITHER body.**
//
// **WHY THE KIND IS A MEMBER OF THE ENTRY AND NOT OF THE STORE'S HOME.** The FUNCTION never crosses the boundary
// (`DD-15`), so the home (`src/store.rs`) holds `{address, handle}` and nothing else; a kind held there would be a
// SECOND COPY of a fact whose home is this registry — the class `D-65` condemned at its smallest scale (*"two places
// that must agree, and only one of them is authoritative"*). **THE ENTRY THEREFORE GROWS THE OTHER SLOT**: one entry
// per handle — the same shape for both kinds — whose `kind` member says whether `fn` is a listener's body or a
// constraint's. **THAT IS THE CHOICE THIS PASS TAKES, AND THE REASON IT BEATS A THIRD REGISTRY: one handle names ONE
// registration** (`D-29`), so a second map would be a second population route for the same identity.
//
// **WHAT THE KIND DECIDES, AT THE TWO PLACES THE TWO KINDS PART COMPANY** — and nowhere else:
//   * **`deliver` skips it** (`D-69`: *"an element whose handle is a constraint's `id` is asked; a listener's is
//     delivered"*), so a pair's own body is never invoked as a listener with the triggering address;
//   * **`listenerStandingAt` does not read it as a listener** (`D-24`'s same-kind overwrite must stay lawful at a
//     held pair, and `D-25`'s cross-kind refusal must stay pointed at a LISTENER's handle).
//
// **THE CHANNEL IS THE SEVENTH-BESIDE DEVICE EVERY KERNEL→ENTRY FACT USES** (`TERMINAL_ARM`, `COMMIT_SCOPE`,
// `EXTERNAL_CALL`, `FORGET_PAIR`): `kernel-registration.mjs` may not import this file (`kernel-surface.md §1` item
// 1's empty import footprint) and this file may not import it, **so both sides spell the same `Symbol.for` key and
// the install is once per instance** (`§4.2` item 4). **IT IS INVISIBLE TO `Object.keys` AND TO
// `Object.getOwnPropertyNames`**, so the product's declared FOURTEEN own members are unmoved and no census moves
// (`A117` (D6)).
const REGISTER_BODY = Symbol.for('provident-storeroom.register-body');

/// **THE INSTALL, CALLED ONCE BY `storeCreate`** — the channel `K-1` reaches with the pair's own body. **IT TAKES
/// THREE POSITIONS AND MINTS NOTHING**: the handle `listen` just wrote, the caller's function, and the kind the
/// entry is to carry.
///
/// **AN ENTRY THE HANDLE NAMES NOTHING FOR IS LEFT UNTOUCHED** — a store this package did not build, or a handle a
/// caller has withdrawn between the two acts, has no slot to fill, and a registration that installed a body into a
/// map nobody reads would be the seam this channel exists to avoid. **IT RE-TAKES THE ENTRY'S `off`** (`register`'s
/// own rule: *"`register(handle, listener)` CLEARS `off` AND INSTALLS THE FUNCTION"*, `P: docs/pending.md · P-5`,
/// part (b)), because a body that is present is a body that fires.
export function installRegistrationSeam(instance, state) {
  if (typeof instance[REGISTER_BODY] === 'function') return;
  Object.defineProperty(instance, REGISTER_BODY, {
    value: (handle, body, kind) => {
      const entry = state.registry.get(handle);
      if (entry === undefined) return undefined;
      entry.fn = body;
      entry.off = false;
      entry.kind = kind;
      return undefined;
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ ADDED 2026-11-01 — THE INTERNAL ROUTE: THE MEMBER'S POST-TEST BODY, ITS ONE SYMBOL-KEYED CHANNEL, AND
// THE `D-99` ANSWERED CLAUSE'S *"THE KERNEL'S ACT IS ITS OWN"* SPELLED AT THE BYTES (`C-17`, §9.2).**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`D-99`'S ANSWERED CLAUSE, VERBATIM: *"Route reading — the kernel's act is its own (Recommended)"*.** So
// **the kernel's own store-side registration DOES NOT PASS THROUGH THE CALLER-FACING TEST AT ALL**: the
// cross-kind test (`B-6`) lives on the CALLER's member `listen` and on the caller's member `register` (`B-5`),
// and what the kernel reaches is the member's POST-TEST body, extracted here by name and called by both sides.
// **THE STORE'S ONE VERB IS UNMOVED AND IS REACHED ONCE, BY BOTH CALLERS** (`entryOf().listen`, the same entry
// call at the same two positions with the same encoded set and the same `carryRefusal` wrapper), so **the store
// gains no verb, no arm, no kind and no test** (`D-99` item 1, honoured by construction rather than by
// restraint), and **what the route SKIPS is the CALLER's tests over the CALLER's arguments** — the handle's
// class test and the set's member/domain walk, which `K-1` has already taken at its own channel (i)
// (`inDomainAddress`, `inDomainId`, `typeof constraint === 'function'`). **The tree already contains this exact
// shape and declares it lawful at a neighbouring site** (`registerOn`'s re-install reaches `entryOf().listen.call`
// directly, and its own clause states *"no second route installs a store entry"*); **the internal route is that
// sentence generalised from one act to the kernel's.**

const LISTEN_ROUTE = Symbol.for('provident-storeroom.listen-route');

/// **⟶ AND THE REGISTRATION'S OWN SAVE CHANNEL, 2026-11-02 — `D-106` ITEM 3'S FIRST ARM.**
/// **THE REGISTRATION'S CLOSE OWES A SAVE THAT THE TERMINAL ARM'S GATE NEVER REACHES** (`kernel-registration.mjs`
/// passes neither the terminal arm nor `deliver`), so the close names the last `file`-tier op its route landed to
/// this channel **and the channel performs THE SAME `commitFile` FRAME THE TERMINAL ARM PERFORMS** — one save
/// path in the tree, two callers of it. **A `Symbol.for`-keyed own property, `enumerable: false`, invisible to
/// `Object.keys` and to `Object.getOwnPropertyNames`**, so the product's declared FOURTEEN own members are
/// unmoved (`A117` (D6)) — the device `REGISTER_BODY` and `LISTEN_ROUTE` above already use, and neither the
/// kernel nor this file imports the other.
const REGISTRATION_SAVE = Symbol.for('provident-storeroom.registration-save');

/// **THE ONE COPY OF A CALLER-SUPPLIED ADDRESS'S SEGMENTS — `D-35`'s READ HALF, MOVED HERE 2026-11-01 WITH THE
/// BODY THAT IS ITS ONLY READER.** `listen(handle, addresses)` hands the SET, and each member of it is THE
/// CALLER'S OWN ARRAY, so the two `addresses[i].slice()` sites the extracted body carries took
/// `Array.prototype.slice` OFF A MUTABLE PROTOTYPE at the moment of the call: a caller who deleted `slice`
/// turned a LAWFUL `listen` into the raw host `TypeError` *"addresses[i].slice is not a function"* — a raw host
/// object out of a lawful call, which `surface.md §2.5` item 5 (e) files as a FINDING — and one who forged it
/// made the package's own home mirror record an address the store never received, MEASURED as a wrong value out
/// of a lawful `addConstraint` + `constraints()`. **THE FORM IS THE CONTRACT'S OWN**
/// (`docs/specs/storeroom-json-crossing/contract.md §2.1` item `(1c)(i)` and item `(1)`(c)): a local index loop
/// over the array's own exotic `length` and its own indices, appending by `appendOwn` — the same helper every
/// other append on these paths already takes. **NO ANSWER MOVES**: the same segments in the same order, in a
/// FRESH array, exactly as the `slice` produced.
function copySegments(address) {
  const copy = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(copy, address[i]);
  return copy;
}

/// **THE MEMBER'S POST-TEST BODY, EXTRACTED BY NAME — `index.mjs:806`–`:863`'s bytes, moved here with no logic
/// changed** (`C-17` (i)). **THE CALLER'S `listen` AND THE KERNEL'S REGISTRATION BOTH CALL THIS FUNCTION, AND
/// THE TWO DIFFER BY EXACTLY THE TESTS THE CALLER OWES.**
///
/// **EACH OF ITS FIVE STEPS IS A FACT ANOTHER MEMBER READS, WHICH IS WHY "BESIDES THE STORE CALL" IS NOT
/// DECORATION** (§9.2 (iii)):
///   1. **THE ADDRESS ENCODE**, in the caller's own order — one encoded address per set member, the whole set
///      and never a delta (`PAR-HL-2`).
///   2. **THE ONE STORE ACT**, through the SAME `carryRefusal` wrapper, so the store's own refusal crosses
///      unconverted exactly as it does today.
///   3. **THE PACKAGE'S HOME MIRROR** — the purge by handle and the N-row install. `unlisten` reads these rows
///      to find the row it withdraws, `removeListener` likewise.
///   4. **THE ENTRY'S REGISTRY RESERVATION** — `{fn: undefined, off: true, addresses}`, each address copied by
///      `copySegments`. **IT IS LOAD-BEARING THREE TIMES**: `installRegistrationSeam` leaves an entry the handle
///      names nothing for UNTOUCHED, so a route that skipped the reservation would STRAND every pair's body;
///      `register`'s entry-membership test is what makes `register('<pair id>', fn)` reach `B-5`'s cross-kind arm
///      rather than the *"this instance holds no listener entry"* arm; and `unlisten('<pair id>')` would answer
///      the no-op success instead of withdrawing.
///   5. **THE ANSWER** — `return handle`, which `D-22` makes `listen` answer and which `K-1` ADOPTS, so the
///      adoption point (`store.listen(addr) === K-1` by reference equality) is byte-unmoved.
///
/// **THE RECEIVER IS PASSED AND IS NEVER INVENTED**: for a member call `receiver === this`; for the kernel's
/// route `receiver === instance === state.receiver`, the one object `isStoreReceiver` compares against — so the
/// store act reaches the store the caller names and no second store is addressed. **A DETACHED `listen` IS
/// UNMOVED**: it passes its own `undefined` receiver through exactly as today, because this extraction adds
/// **no class test** (`listen` is not one of the members that takes the receiver arm).
///
/// **AND THE ROUTE TAKES NO COMMIT** (`C-17` (v), DECIDED): the member's `openCommit`/`closeCommit` bracket
/// stays with the MEMBER, and every path the kernel's route runs is inside a surface act whose window is
/// already open — `addConstraint`, `constraintOn` and the construction's own `storeCreate` — where a nested
/// `openCommit` today JOINS and takes no observable action. **The kernel's act is not a surface act and the
/// window belongs to the caller's act.**
export function listenOn(receiver, state, handle, addresses) {
  // ── THE ONE STORE ACT: PURGE, THEN INSTALL, INSIDE THE STORE'S OWN VERB ───────────────────────────────
  // The set crosses AS ENCODED ADDRESSES, one per member, in the caller's own order (`PAR-HL-2`'s referent:
  // the whole set and never a delta).
  const encoded = [];
  for (let i = 0; i < addresses.length; i += 1) {
    appendOwn(encoded, encodeAddress(addresses[i], 'second argument', 'second argument'));
  }
  carryRefusal(() => entryOf().listen.call(receiver, handleWire(handle), encoded), [handleWire(handle)]);
  // ── THE PACKAGE'S OWN HOME MIRROR ────────────────────────────────────────────────────────────────────
  // **THE MIRROR'S COLUMN IS THE CALLER'S OWN HANDLE AND NOT A TOKEN** (`identity-and-domain.md §1` item 2
  // (ii)), and **THE PURGE REACHES IT**: every row the handle named is dropped before the set's own rows are
  // recorded, which is the same wholesale assignment the store performed (`listen-verb.md §3` item 1's four
  // structures). **THE `some(key)` GUARD IS GONE WITH `first_at`** (`P: docs/pending.md · R-B1`, deletion
  // part (b)): with the idempotence deleted the mirror records one row per address in the act's own set, so
  // N addresses answer N rows for ONE handle (`listen-verb.md §6` item 4 (iv)).
  state.home = state.home.filter((row) => row.handle !== handle);
  for (let i = 0; i < addresses.length; i += 1) {
    // **⟶ AND THE MIRROR'S COPY IS `copySegments`, NOT `addresses[i].slice()`** (`D-35`'s read half,
    // 2026-10-26 — see the function's own clause above; the caller's array is the receiver either way and
    // the answer is the same fresh segment list).
    appendOwn(state.home, { key: homeAddressKey(addresses[i]), address: copySegments(addresses[i]), handle });
  }
  // ── THE ENTRY'S FIRST STATE: RESERVED ────────────────────────────────────────────────────────────────
  // ***"`listen` WRITES THE ENTRY WITH `off` SET — the reservation"*** (`P: docs/pending.md · P-5`, the
  // entry-shape ruling; `contract.md §2.2` item 5 (a); `identity-and-domain.md §2` item 5). **AN ENTRY WITH
  // NO FUNCTION IS NOT A LAWFUL VALUE, so the state `listen` creates is an entry that EXISTS AND IS OFF** —
  // which is exactly what the ruling provides. **AND A REPEATED `listen` RE-RESERVES THE ENTRY**: it is a
  // purge then a fresh reservation, never a fast path (`P: docs/pending.md · (R1)`, its own closing
  // sentence; `contract.md §2.2` item 3).
  // **⟶ AND THE SET'S COPY IS A LOCAL INDEX LOOP, NOT `Array.prototype.map` — 2026-10-24 (`contract.md §2.1`'s
  // clause of that date on `F8-2`, items `(2a)`–`(2c)`, arm `(xix)`, cell `JC-TC-65`).** This position is the
  // one the kernel's registration reaches, so the `.map` that stood here
  // threw `TypeError: addresses.map is not a function` OUT OF A LAWFUL `storeCreate` under a caller's
  // `delete Array.prototype.map` — a raw host object crossing the boundary, which `§2.5` item `5 (e)` files as
  // a FINDING. **IT IS THE SAME PRECEDENT `encodeConstraints` ALREADY FOLLOWS** (the fourth key's own walk:
  // *"a LOCAL INDEX LOOP, NOT `Array.prototype.map`"*), and the bytes, the order and the fresh-array-per-member
  // copy are unmoved. **THE `slice` IS THE ELEMENT'S AND NOT THE SET'S**: it copies one ADDRESS's segments, so
  // the registry row's set is the fresh list this loop builds.
  const standingSet = [];
  for (let i = 0; i < addresses.length; i += 1) {
    // **⟶ THE REGISTRY ROW'S SET TAKES THE SAME `copySegments`** (`D-35`'s read half, 2026-10-26): the
    // element is the caller's address array, so its `slice` was a mutable prototype's member.
    appendOwn(standingSet, copySegments(addresses[i]));
  }
  state.registry.set(handle, {
    fn: undefined,
    off: true,
    // **THE SET THE LAST `listen` GAVE THE HANDLE** — the referent `PAR-HL-2` names (*"the set of addresses the
    // handle stands at after this act — the whole set, never a delta"*), and the one datum `register` reads to
    // re-install a reserved entry's store side.
    addresses: standingSet,
  });
  // **⟶ AND IT ANSWERS THE HANDLE IT WATCHES UNDER — `D-22`'s `void → Handle`, 2026-10-24.** *"Listen should
  // return the handle on success, or error message on fail."* **A SUCCESS SIGNAL THAT CARRIES THE
  // IDENTITY, AND NOT AN ECHO TO BE SUPPRESSED**: the value the caller spelled is the identity the store
  // holds for that entry, and it is what `K-1` ADOPTS (`store[LISTEN_ROUTE](id, set)`), which is
  // what `kernel-surface.md` declared all along — *"adopted, never minted by the kernel"*.
  return handle;
}

/// **THE INSTALL, CALLED ONCE BY `storeCreate`** — the channel `K-1` reaches instead of the caller's member.
/// **IT TAKES THE `Symbol.for` KEY AND THE INSTANCE'S OWN STATE, AND IT MINTS NOTHING**: no member of the
/// product (`Object.defineProperty` at `enumerable: false` is invisible to `Object.keys` and to
/// `Object.getOwnPropertyNames` — `A117` (D6)), no kernel item, no record member.
///
/// **WHERE IT IS INSTALLED IS DECLARED AND IT IS NOT WHERE THE OTHER CHANNEL IS** (`C-17` (iv)): at
/// `index.mjs`'s `state.receiver = instance` neighbourhood, **BEFORE the construction's batch arming walk**, so
/// a pair armed by `cfg.constraints` is not the one kernel registration still passing through the caller's
/// wrapper. **An instance that carries no such channel answers nothing and is told nothing** (the family's own
/// absent arm, printed at `kernel-registration.mjs` for the body channel): **`storeCreate` installs it on every
/// instance it returns and installs it before the batch walk, so no drive in this tree reaches that arm.**
export function installListenRoute(instance, state) {
  if (typeof instance[LISTEN_ROUTE] === 'function') return;
  Object.defineProperty(instance, LISTEN_ROUTE, {
    value: (handle, addresses) => listenOn(instance, state, handle, addresses),
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/// **THE REGISTRATION'S SAVE, INSTALLED ONCE BY `storeCreate` — `D-106` ARM 1, 2026-11-02.** **IT TAKES ONE
/// POSITION, THE OP ID THE CLOSE NAMES, AND IT MINTS NOTHING**: no member of the product, no kernel item, no
/// record member, no op, no verb — `Object.defineProperty` at `enumerable: false` is invisible to `Object.keys`
/// and to `Object.getOwnPropertyNames` (`A117` (D6)), exactly as the channels beside it.
///
/// **ITS BODY IS THE STORE'S ONE SAVE FRAME AND NOTHING ELSE** — `commitFile(state.receiver, opId)`, the frame
/// `delivery.mjs:826` already calls for a write's save (`state.mjs`'s `commitFile`, which the tree's own reason
/// for existing is that there is ONE save path and not two). **IT ANSWERS `undefined` ON EVERY ARM**: a call
/// with no position, or with a position that is not a non-empty string, does nothing and throws nothing, and a
/// store's own refusal crosses from `commitFile` unconverted.
///
/// **WHERE IT IS INSTALLED IS `index.mjs`'s `installListenRoute` NEIGHBOURHOOD AND NOT THE TWO LATER SEAMS**
/// (`PIN-3` (ii)(d)): the construction's batch arming walk runs BEFORE both of them, so a channel installed
/// there would leave a `storeCreate` carrying `cfg.constraints` — and a boot carrying them — with no route to
/// the save.
export function installRegistrationSave(instance, state) {
  if (typeof instance[REGISTRATION_SAVE] === 'function') return;
  Object.defineProperty(instance, REGISTRATION_SAVE, {
    value: (opId) => {
      if (typeof opId !== 'string' || opId.length === 0) return undefined;
      commitFile(state.receiver, opId);
      return undefined;
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
}

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
export function registerOn(state, handle, listener) {
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
  //
  // **⟶ AND TWO SENTENCES OF THIS BLOCK ARE RE-DERIVED 2026-11-01 (`D-98`; `D-99`'s ANSWERED clause), in the
  // project's annotate-beside spelling — they stand above and are read THROUGH this clause.** ***"the message
  // unchanged in content"* IS WITHDRAWN:** the generated half is now the store's own QUALIFIED
  // `AddressMalformed` arm, selected by the closed `'handle'` token (§3.3, §3.6), and the clause half names the
  // pair's `id` and the rule's re-spelt sentence — *"a listener and a constraint do not share one handle"*
  // (§3.4) — with **no address anywhere in it**. ***"under `D-25` the kernel REGISTERS NOTHING"* IS WITHDRAWN
  // TOO:** the kernel does register, and it registers through its OWN ROUTE (`LISTEN_ROUTE`, §9.2), which never
  // reaches this test — so the paragraph's point (the prefix was a seam and it is DELETED rather than moved)
  // stands, and what replaced the exemption is a route and not a narrower exemption.
  //
  // **⟶ RE-DERIVED 2026-11-01 (`D-98`, verbatim: *"A constraint and a listener can share an address, as can
  // multiple constraints/listeners. The restriction is that a listener and a constraint cannot have the same
  // *handle*."*).** **THE ADDRESS ARM IS DELETED, AND `constraintAtAnyAddress` IS DELETED WITH IT** (§1.1): its
  // subject was the ADDRESS-SET MEMBERSHIP, which `D-98` (i) declares LAWFUL, and its only caller was this one
  // line. **WHAT STANDS IS THE HANDLE**, read by the SAME helper `B-6` reads so the two arms cannot disagree
  // again (`C-1`, `C-16`): a carried pair whose `id` equals the handle, and nothing else. **NO EXEMPTION IS
  // REACHABLE HERE** (`C-2` is deleted with `D-99`'s ANSWERED clause): `B-5` is a caller's act, and the kernel's
  // own re-listing does not pass this test at all because it does not come through this member (§9.2).
  const conflicted = constraintOverwrittenByListen(state, handle);
  if (conflicted !== null) {
    boundaryReject(
      'AddressMalformed',
      conflicted.id,
      `register refuses: the constraint pair '${conflicted.id}' keeps that handle, and a listener and a `
        + 'constraint do not share one handle',
      undefined,
      'handle',
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
      appendOwn(state.home, { key: homeAddressKey(address), address: address.slice(), handle });
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

/// **`B-4`'S ONE READ — WHETHER A **LIVE LISTENER** STANDS UNDER `handle`.**
///
/// **⟶ RE-DERIVED 2026-11-01 (`D-98` §3.4): THE FUNCTION ANSWERS `true`/`false` AND THE ADDRESS LOOP IS
/// DELETED.** That loop existed for **the MESSAGE alone** — its own clause below said so — and it answered the
/// LISTENER's mirror address (`state.home[i].address`, one of that handle's N rows) and never the pair's.
/// **`B-4`'s corrected clause names NO address at all** (§3.4: the refusal's subject is the identity, and
/// `D-98` makes the address lawful), so the loop has no reader and goes with it; the refusal's `address` member
/// stays `null` at `boundaryReject`'s own call (`refusal.mjs`), which is now correct rather than incidental.
///
/// **"LIVE LISTENER" IS THE EXACT PREDICATE AND IT IS NOT A SHORTHAND.** The package's own registry holds an
/// entry for EVERY handle the store knows, **including a constraint pair's** — under `D-22`/`D-29` the kernel's
/// `K-1` reaches `listen(id, set)` and the entry `listen` writes is `{fn: undefined, off: true, addresses}`.
/// So a *listener* stands exactly where `off === false` AND `fn` is a function: that pair of facts is what
/// `register` sets and what nothing else sets, **and it is what keeps a constraint pair's own reservation from
/// reading as a listener at its own `id`** (`D-24`'s same-kind overwrite must stay lawful at a held pair).
///
/// **THE ANSWER IS A BOOLEAN AND NOT AN ADDRESS** (re-derived above, 2026-11-01): `true` where a live
/// listener's registration stands under the handle, `false` everywhere else. **NO MIRROR ROW IS READ AT ALL**,
/// so `B-4`'s refusal carries `address: null` by construction and not by an omission.
export function listenerStandingAt(state, handle) {
  const entry = state.registry.get(handle);
  if (entry === undefined || entry.off !== false || typeof entry.fn !== 'function') return false;
  // **⟶ AND A CONSTRAINT'S OWN ENTRY IS NOT A LISTENER'S — `D-69`, 2026-10-29.** The clause above reads
  // *"a LISTENER stands exactly where `off === false` AND `fn` is a function"* and that pair of facts now also
  // holds of a pair's registration, because `K-1` installs the pair's own constraint function in that slot. **THE
  // KIND IS THE THIRD FACT AND IT IS WHAT KEEPS `D-25`'s CROSS-KIND REFUSAL POINTED AT A LISTENER**: a pair's `id`
  // is its own handle, and a re-add at a held pair must stay LAWFUL (`D-24`) while a listener claiming a pair's
  // `id`, or a pair claiming a listener's, must still be refused.
  if (entry.kind === 'constraint') return false;
  return true;
}

/// **`B-6`'S AND `B-5`'S ONE READ — THE CARRIED CONSTRAINT PAIR WHOSE `id` IS `handle`, OR `null`.**
///
/// **⟶ RE-DERIVED 2026-11-01 (`D-98`, `D-99` and its ANSWERED clause; `C-1`/`C-16`): ONE HELPER, ONE RULE, AND
/// THE RULE IS THE HANDLE.** **`constraintAtAnyAddress` IS DELETED, NOT RE-POINTED** (§1.1's precedent: *"a
/// helper whose one caller is deleted has no subject"*): its subject was ADDRESS-SET MEMBERSHIP, which `D-98`
/// (i) declares **LAWFUL** — a pair and a listener MAY stand at one address, as may multiple pairs and multiple
/// listeners — and its ground, `D-29`'s *"the address dimension is NECESSARY, because the purge is
/// address-reaching"*, is **FALSE at this build**: the purge is BY HANDLE and unconditional
/// (`src/store.rs:476`–`:494`, `:2594`) and this package's mirror purge is by handle too (`index.mjs:821`), so
/// an act under a different handle cannot reach a pair's rows (`D-98` item 3). **What the dimension admitted
/// was the defect.**
///
/// **THE ONE PREDICATE THIS FUNCTION NOW TAKES IS `handle === entry.id`**, over the instance's carried pairs, in
/// ONE pass — and **it answers the pair row itself** (`{ addresses, addressKey, id, fn, enabled, identity,
/// registrationSeq }`, the record `carryConstraint` writes, `constraints.mjs`), or `null`. The `id` is read for
/// the message and nothing else is read at all.
///
/// **WHAT IT LOSES, ONE BY ONE, SO ITS NEW SHAPE IS NOT AN ACCIDENT OF EDITING** (§9.1): the third parameter
/// (`addresses`) and with it every use of the act's set; the `covers` computation; the `covers && handle ===
/// entry.id` continue; **the `entry.enabled !== true` skip** — `C-3`/`C-19` decide that **a DISABLED pair's
/// handle blocks a listener's claim exactly as an enabled one's**, because the loss the skip permitted is
/// FORWARD and not instant: the next `constraintOn` re-lists the pair at the same handle, `K-1`'s store act
/// purges by handle, and `installRegistrationSeam` overwrites the entry — the listener stops being delivered
/// with no observable at the instant of the loss (`D-25`, `D-98` (iii), `D-29`'s *"the act must not destroy
/// what it may not overwrite"*); and **the dimension-2 arm with its guard**, `state.establishing`'s read
/// included — **there is no marker any more** (`D-99`'s ANSWERED clause deletes it, and its readers with it).
///
/// **THE SOURCE IS `state.constraints` AND NOT THE KERNEL'S ROWS, WHICH IS `D-99` ITEM (b) TAKEN (§9.1): the
/// map is the one the kernel's own rows are keyed with, one row per pair, written by exactly the four places a
/// pair's standing is written and enumerated by `constraints()`, so *"this handle is a pair's"* and *"this
/// instance carries that pair"* are ONE fact here. `kernel.pairs`/`kernel.handles` are unreachable from the
/// entry (no export answers *"is this handle a pair's"*), and they are EMPTIED when a pair is disabled (`K-6`'s
/// `FORGET_PAIR`) while the pair stays carried — the one state where the two sources disagree, decided at
/// `C-19` in favour of the carried pair.**
///
/// **AND NO EXEMPTION IS REACHABLE FROM EITHER OF ITS TWO CALLERS** (`C-2` is deleted with `D-99`'s ANSWERED
/// clause): `B-6` (`listen`) and `B-5` (`register`) are CALLERS' acts, and the kernel's own re-listing does not
/// pass this test at all — its store-side act is its own route (`LISTEN_ROUTE`, `§9.2`), and the test lives on
/// the caller's members and nowhere else. **THE ONE ACT THE OLD TEST ALLOWED — THE KERNEL'S RE-LISTING, TOLD BY
/// ITS MARKER — HAS NO SUBJECT LEFT: there is no marker, nothing is bracketed, and a constraint body that calls
/// `listen('<its own pair id>', …)` during its own registration is REFUSED here like any caller's act.**
///
/// **NO STORE ACT IS TAKEN HERE**: the read is `state.constraints`, the package's own model of the pairs it
/// carries.

export function constraintOverwrittenByListen(state, handle) {
  if (state.constraints.size === 0) return null;
  // ONE PASS, ONE COMPARISON, AND THE PAIR ROW ITSELF IS THE ANSWER — see this helper's own clause above for
  // every computation `D-98`, `C-1`, `C-3`/`C-19` and `C-16` took out of this loop and why.
  for (const entry of state.constraints.values()) {
    if (handle === entry.id) return entry;
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
export function terminalArm(state, record) {
  // **THE CLASS TEST COMES FIRST AND IS THE ONE THE FIFTH POSITION ALREADY TAKES** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1
  // read with `§2.20`): a value carrying no `pending` is no record position, and this channel is the kernel's
  // own — a caller never reaches it. Nothing is changed by a refused value.
  if (record === null || typeof record !== 'object' || types.isProxy(record) || record.pending === undefined) {
    return undefined;
  }
  // ── `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 2: THE TERMINAL ARM'S FIRST ACT, ON THE PASSING ARM ────
  // **THE ARM IS READ OFF THE KERNEL'S MARK AND OFF NOTHING ELSE**: a write's or a delete's pass that FAILED
  // arrives here with its record in hand and drives NO save and NO store call of its own (`docs/specs/storeroom-js/surface.md §2.11` clause 1).
  // **AND THE OP'S OWN TIER WORD IS NOT READ AT THIS GATE FROM 2026-11-02**: the eligibility question is the
  // store's (`PIN-4` (i)), and the conjunct that pre-answered it here is below, withdrawn with its reason.
  const answer = state.leg;
  if (
    record[SETTLED_ON_THE_PASSING_ARM] === true
    && answer !== null
    && answer !== undefined
    && answer.op !== null
    && answer.op !== undefined
    // **⟶ AND THE TIER CONJUNCT LEAVES THE GATE WHOLE, 2026-11-02 — `D-106` item 2, `arms.md §C.3`, `PIN-17`.**
    // **THE PRE-FILTER'S LAST CLASS IS GONE AND WHAT REMAINS IS NOT A PREDICATE BUT THE GROUND ITSELF, ASKED
    // DIRECTLY.** The conjunct that stood here read *"the op's tier is `'file'`, or the op names no tier"* and
    // its own clause justified the exclusion with *"a `mem`- or `temp`-tier op cannot have moved a `file`-tier
    // version"* — **WHICH IS FALSE: a lower-persistence write of a CONTAINER value PURGES the `file`-tier
    // version standing above it as a leaf (`src/store.rs`'s re-mint arm), and that purge owes a save.** So the
    // gate asks the store, whose `commit_file` answers with its one eligibility ground — what the act moved —
    // and returns `Ok(())` before `write_file` where the act moved nothing at `Tier::File`. **THE COST IS ONE
    // ADDON CALL PER PASSING WRITE'S AND DELETE'S OP THE OLD GATE WOULD HAVE SKIPPED, AND IT IS A CALL AND NOT A
    // BYTE**: `save_owed` is a predicate over the entry's own two records and the store performs no I/O until
    // it answers `true`. **NOTHING ELSE ON THIS GATE MOVES** — the arm test above it, the two presence tests,
    // and the carry and the catch below.
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
      // **⟶ AND THE COMMIT'S OWN LIST GOES WITH THE CALL — `D-53`, 2026-10-28.** A save that fails is a constraint
      // violated at the write's LAST position, so its refusal must cross carrying the COMMIT's entries (the pass's
      // `constraint-check` entries and, by the time the caller reads it, the kernel's one `outcome` entry with the
      // save arm's own `KC-9` in `state`). **THE LIST IS READ OFF THE RECORD THE KERNEL BUILT** (`commitLogOf(record)` — `record[COMMIT_LOG]`,
      // a symbol key on `CommitRecord`'s own identity — no member is added, `A117` (D6)), and a record carrying none
      // is a record this package did not build, whose failure keeps the declared `[]`.
      // **⟶ AND THE SAVE'S OWN ADDRESS GOES WITH THE CALL — `D-77`.** The failed save's act is the write's
      // act at the commit's own op address, and that address is read off the leg the store's verb left
      // (`state.leg.op.address`, decoded by `index.mjs` at the verb's return) — the carrier this call hands
      // spells an OP ID and never an address, so the member would be `null` if it were derived here.
      carryRefusal(() => commitFile(state.receiver, answer.op.opId), [encodeOpId(answer.op.opId)], commitLogOf(record), answer.op.address);
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
  // **⟶ AND THE ARM PERFORMS THE DELIVERY FOR A KERNEL-DRIVEN WRITE AND FOR NO OTHER ACT — 2026-10-29.** A
  // `delete`'s delivery is its OWN MEMBER's (`D-49` declares that window the one whose check never ran, and a
  // request raised there is the witness's and not a pass's); the record is the delete's, so this arm is
  // reached for it — the `file`-tier save above is the arm's act on BOTH — and the residue's delivery is the
  // member's. **THE FACT IS THE PACKAGE'S OWN STATE AND NEVER A MEMBER OF ANY RECORD**, and it is `'arm'` on
  // every path that does not name another, so a write's delivery is exactly where it was.
  if (state.legDelivery !== 'member') {
    // `deliver` is THE SAME loop the post-verb window uses (`docs/specs/storeroom-js/surface.md §2.4` rules 1–3 read once, at both instants): ONE
    // invocation per DISTINCT handle, and a handle with no registered function fires nothing silently.
    deliver(state, triggered, triggeringAddress);
  }
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

