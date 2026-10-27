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

import { appendOwn, fail } from './src/entry/refusal.mjs';
import { withAddon, boundaryReject, adoptModuleContext } from './src/entry/artefact.mjs';
import { VALUE_ARGUMENT_POSITION, accessorOrSymbolArm, arrayClass, classSpelling, extendedPath, hasLoneSurrogate, inDomainAddress, isAdmittedArray, isLawfulListenerElement, isPlainObjectValue, protoClass, shapeArmClass, targetSpelling, valueReject, valueTargetSpelling } from './src/entry/class-decision.mjs';
import { encodeAddress, encodeFilePath, encodeJournalLength, encodeOpId, encodeTier, encodeValue, handleWire, inDomainHandle } from './src/entry/carrier.mjs';
import { admittedConstraintBatch, constraintAddress, decodeBaseState, decodeJournalOp, decodeSegments, decodeValue, encodeConfig, spellConstraintAddress } from './src/entry/frame.mjs';
import { FORGET_PAIR, INSTANCES, STORE_INDEX, STORE_RETIREMENT, TERMINAL_ARM, carryRefusal, closeCommit, crossTriggered, entryOf, homeAddressKey, installAttemptSeam, isStoreReceiver, openCommit, writeRefusal } from './src/entry/state.mjs';
import { commitPositionRefusal, constraintOverwrittenByListen, deliver, listenerStandingAt, registerOn, terminalArm } from './src/entry/delivery.mjs';
import { ARGUMENT_POSITION_FIRST, addressSetKey, carryConstraint, constraintDetached, constraintPairKey, constraintRefuse, constraintSite, constraintUncarried, constraintWrite, constraintsKernel, enumerateConstraints, judgeReversal, registrationCrossing, restoreHeldPair, reversalWatch, unionAddressSets, withEmptyLog, withdrawStanding } from './src/entry/constraints.mjs';
const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

adoptModuleContext(import.meta.url, require_, ADDON_PATH);

// ---------------------------------------------------------------------------------------------
// **THE ONE COPY OF A CALLER-SUPPLIED ADDRESS'S SEGMENTS — `D-35`'s READ HALF, CLOSED 2026-10-26.**
// `listen(handle, addresses)` hands the SET, and each member of it is THE CALLER'S OWN ARRAY, so the two
// `addresses[i].slice()` sites below took `Array.prototype.slice` OFF A MUTABLE PROTOTYPE at the moment of
// the call: a caller who deleted `slice` turned a LAWFUL `listen` into the raw host `TypeError`
// *"addresses[i].slice is not a function"* — a raw host object out of a lawful call, which `surface.md §2.5`
// item 5 (e) files as a FINDING — and one who forged it made the package's own home mirror record an address
// the store never received, MEASURED as a wrong value out of a lawful `addConstraint` + `constraints()`.
// **THE FORM IS THE CONTRACT'S OWN** (`docs/specs/storeroom-json-crossing/contract.md §2.1` item `(1c)(i)` and
// item `(1)`(c)): a local index loop over the array's own exotic `length` and its own indices, appending by
// `appendOwn` — the same helper every other append on this file's paths already takes. **NO ANSWER MOVES**: the
// same segments in the same order, in a FRESH array, exactly as the `slice` produced.
function copySegments(address) {
  const copy = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(copy, address[i]);
  return copy;
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
      // `AddressMalformed: 'tier' requires a tier argument`. **⟶ AND THE APPEND IS AN OWN-PROPERTY DEFINE AND
      // NOT AN INDEX WRITE, 2026-10-25:** `args[args.length] = …` performs `[[Set]]`, which WALKS THE CHAIN, so
      // a caller's getter-only accessor at `Array.prototype[0]` turned this lawful verb's first append into a raw
      // host `TypeError` (`F8-2`'s write vector). `appendOwn` (`src/entry/refusal.mjs`) defines the own property.
      appendOwn(args, encodeTier(tier, arguments.length >= 2, false, 'first argument'));
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
      appendOwn(args, encodeTier(tier, arguments.length >= 2, false, 'first argument'));
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
      // **⟶ `§4.1`: `write` OPENS ONE — UNLESS THE CALL NAMES A COMMIT AT THIS METHOD'S FOURTH POSITION, WHICH
      // IS THE DISCRIMINATOR `D-46` SETS: A CALL THAT SUPPLIES IT JOINS THE COMMIT IT NAMES, AND A CALL THAT
      // SUPPLIES NONE OPENS A NEW ONE** (`strata/decisions.md` · `D-46`). **THE POSITION IS READ HERE AND
      // NOWHERE ELSE**, because this member is the one place a call's own entry names a commit: the kernel's
      // store leg is a FOUR-position call (`store.write(address, tier, value, record)`, `kernel-commit.mjs`) and
      // therefore JOINS the commit the caller's three-position write opened, while a caller's plain write, a
      // listener body's write and a constraint body's write all supply three positions and OPEN — the listener's
      // being `D-43` item `1`'s *"its own commit"*, reached by declaration rather than by an authorship the
      // package used to infer. **A SUPPLIED POSITION NAMES A COMMIT WHETHER OR NOT IT IS IN THE POSITION'S CLASS
      // DOMAIN**: the class test below refuses an outside value before any store act, and a refused write
      // releases the bracket in the `finally` below like every other arm.
      // **THE DECREMENT IS ON THE FINAL RETURN TO THE CLIENT** (`closeCommit`), taken in a `finally` so the
      // bracket is released on every arm — a count left standing after a return is on `§5`'s failure list.
      const opened = openCommit(instance, arguments.length >= 4 ? commit : undefined);
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
      appendOwn(args, encodeTier(tier, arguments.length >= 2, false, 'first argument'));
      // THE WALK'S OWN FAULT RECORD — see `refusedValue`: the walk CLASSIFIES and RECORDS, and the record is
      // read at the one site where the store answered `ValueNotAdmitted` for a value the walk refused.
      // **⟶ AND THIS EXTENSION IS THE SAME INDEX WRITE** (`F7-1`, item `(1b)`): a no-op `push` dropped the
      // VALUE position too, so the admitted drive lost its crossed member and not merely its tier.
      appendOwn(args, encodeValue(value, [], 0, [], fault));
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
        appendOwn(watched, decodeSegments(answer.watched[i]));
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
    ///
    /// **⟶ AND IT CARRIES THE DELETE'S OWN `op` FROM 2026-10-27** (`D-43` item 3; `index.d.ts`
    /// `DeleteRecord.op`): the member `write`'s record carries, at the same name, so `rollback(record.op.opId)`
    /// reverses the delete. `null` is the `D-3` arm that removed nothing — it appended no entry, so it names
    /// no op — and it crosses unchanged rather than folding to `undefined` (`crossing.md §1.3`).
    delete(address, tier) {
      // **⟶ `§4.1`: `delete` OPENS ONE.**
      const opened = openCommit(instance);
      try {
        const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
        // `delete`'s tier is read as a VALUE and not by an arity fold: an ABSENT position is the whole-target
        // removal, and a supplied `undefined` answers row 4's `AddressMalformed` (`crossing.md §1.3`).
        appendOwn(args, encodeTier(tier, arguments.length >= 2, false, 'first argument'));
        // THE ENTRY IS INVOKED BY `Reflect.apply`, NOT BY A SPREAD — see `read`'s clause of 2026-10-24 above.
        const answer = carryRefusal(() => Reflect.apply(entryOf().delete, this, args), args);
        const receipt = {
          address: decodeSegments(answer.address),
          tiers: answer.tiers,
          triggered: crossTriggered(state, answer.triggered),
          op: answer.op === null ? null : decodeJournalOp(answer.op),
        };
        // `A43`: a delete FIRES its own triggered set, on the same window as a write (`docs/specs/storeroom-js/surface.md §2.7` item 2).
        deliver(state, receipt.triggered, answer.triggeringAddress);
        return receipt;
      } finally {
        closeCommit(instance, opened);
      }
    },
    /// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`docs/specs/storeroom-js/contract.md §2.6`).
    ///
    /// **⟶ AND THE REVERSAL IS JUDGED FROM 2026-10-26 — `DEF-W` OF `strata/decisions.md` · `D-38`, THE
    /// ARCHITECT, VERBATIM: *"Assert the constraints on rollback"*** (`docs/specs/storeroom-js/contract.md §2.6`'s
    /// clause of this date is the declaration; `surface.md §2.12`'s clause (D) and `package-use.md §5.4` name
    /// the same member). **THE TWO CALLS BELOW ARE THE WHOLE OF IT AND NEITHER IS A WALK:**
    ///   * **`reversalWatch` TAKES THE PRE-REVERSAL STANDING** of every enabled pair's every address BEFORE
    ///     the addon's entry is reached, and it answers `[]` where the entry carries no pair — so a store that
    ///     registered no constraint reaches no read at all and this member is byte-for-byte what it was;
    ///   * **`judgeReversal` ASKS THE STATE THE REVERSAL LEFT** (`D-38`: the TERMINAL state, never a per-step
    ///     check — an unwinding composition passes through intermediate states no constraint would approve)
    ///     and throws the surface's one plain form, `{status: 'ConstraintPassRefused', message, log}` at the
    ///     set's rank `20`, where a pair the reversal TOUCHED refuses that state.
    /// **A LAWFUL REVERSAL IS UNCHANGED — same record, same three members, no throw** — **and `D-40`'s floor
    /// law is not re-walked: this member still performs the store's own calls, and the judgement is a judgement
    /// of the state those calls left and not a sequence of per-op approvals.** **THE SHAPE IS `(a)` AND IT WAS
    /// MEASURED: the refusal comes AFTER the reversal**, because `(b)` — computing the terminal state without
    /// applying it — is not computable from the thirteen names the artefact publishes (there is no journal read
    /// and no candidate-set query among them) and a JS guess at the store's temporally floored, all-or-nothing
    /// rollback scope (`src/store.rs:2374–2430`) is the one thing this pass refused to write. **⟶ AND ITS SECOND
    /// HALF — *"the reversal's effect STANDS"* — IS SUPERSEDED 2026-10-26 (`DEF-W`'s `(a)` discharged;
    /// `contract.md §2.6`'s second annotate-beside of that date): a refusal that reports the violation while
    /// leaving it is not a discharge, so `judgeReversal` RESTORES the pre-reversal standing of every address the
    /// reversal moved before it throws the one plain form, and the log says the reversal was undone.** **THE
    /// RESTORE IS NOT A JUDGED WRITE AND RECURSES INTO NOTHING**: it is the refusal's own compensating act,
    /// taken at the store's entry with no `K-2`, no pass, no listener delivery and no second judgement
    /// (`constraints.mjs`'s `restoreReversal`).
    rollback(opId) {
      const args = arguments.length >= 1 ? [encodeOpId(opId)] : [];
      // THE WATCH COMES FIRST, ON THIS SIDE OF THE STORE CALL: the standing it takes is the one the reversal
      // is about to move, and it is what makes "the address the reversal touched" MEASURED.
      const watched = reversalWatch(state, instance);
      // THE ENTRY IS INVOKED BY `Reflect.apply`, NOT BY A SPREAD — see `read`'s clause of 2026-10-24 above.
      const answer = carryRefusal(() => Reflect.apply(entryOf().rollback, this, args), args);
      // AND THE JUDGEMENT AFTER IT, keyed to the store's own echo of the id the reversal named.
      judgeReversal(instance, watched, answer.opId);
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
        appendOwn(encoded, encodeAddress(addresses[i], 'second argument', 'second argument'));
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
      // one `store.listen(id, set)` reaches from `carryConstraint`'s arming walk, so the `.map` that stood here
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
      // ═════════════════════════════════════════════════════════════════════════════════════════════════
      // **⟶ THE RECEIVER IS CONSULTED FIRST — BEFORE ANY READ, BEFORE ANY EDIT, AND BEFORE THE COMMIT
      // BRACKET.** This member reached every one of its arms off this factory's closure and never asked
      // whether the CALL had a receiver, so a detached `addConstraint` ANSWERED and edited the real pair
      // registry (measured 2026-10-26; `docs/guides/package-use.md §12.2`). **THE GUARD IS THE SEVEN
      // STORE-REACHING VERBS' OWN, ITS FORM IS THEIRS BYTE FOR BYTE, and `constraintDetached` states both
      // and why no constraint clause names a different arm** (`src/entry/constraints.mjs`; the architect's
      // ruling: *"Run the fix by rejecting the detached functions."*). **NO STATE MOVES ON A REFUSED CALL:
      // no `openCommit`, no `constraintSite`, no registry read, no `K-1`, no store act.**
      // ═════════════════════════════════════════════════════════════════════════════════════════════════
      constraintDetached(this);
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
      // ═══════════════════════════════════════════════════════════════════════════════════════════════════
      // **⟶ STEP 3 IS AN *EXTENSION PLUS AN OVERWRITE*, 2026-10-24 — AND THE EXTENSION HALF IS THE DEFECT
      // THIS ARM SHIPPED WITHOUT.** The declaration is `docs/L1/surface-deltas.md` `Q-2`'s repair `(i)`, landed
      // by `D-29`'s pair-key ruling (*"the pair's identity key becomes the `id` alone … it makes a second
      // `addConstraint` at a new address an **extension plus an overwrite**"*), over
      // `docs/specs/storeroom-held-listener-identity/contract.md §2.6` item 4 (*"one pair, N registry rows,
      // removal clears all N"*). **ONLY THE OVERWRITE SHIPPED**: the bytes below replaced the pair's address set
      // with the CALL's set (`held.addresses = site.addresses`), so a pair extended from `['a']` to `['b']`
      // stopped existing at `['a']` — **its function was replaced, as `D-24` declares, and its ADDRESSES WERE
      // DESTROYED, which no clause declares.** **AND THE TWO SIDES OF THAT ONE BUG ARE NAMED HERE BECAUSE THEY
      // ARE ONE CHANGE:** the kernel's row and the store's home entry lost `['a']` (the pair no longer evaluated
      // there), **and `constraints()` answered `address: [["b"]]` because it reads this very entry's
      // `addresses`** — the read and the behaviour disagreed, and the read is the surface's own enumeration.
      //
      // **THE MECHANISM IS THE UNION, AND IT IS FORCED BY THE STORE'S OWN SET POSITION.**
      // `docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 3 makes `listen(h, S2)` after
      // `listen(h, S1)` an ASSIGNMENT that *"destroys `S1` wholly and installs `S2`"*, **so the kernel cannot
      // get an extension by passing only the new set — the set that must reach `store.listen(id, ·)` is
      // `oldSet ∪ newSet`, and the store's assignment then installs exactly that** (`unionAddressSets` above,
      // which states the rule once). **THE PURGE, ITS ORDER AND ITS GUARD ARE UNMOVED** — `CHECK → PURGE → ADD`
      // stands, the purge is still `K-6` at every address the old pair stood at, and the pair's FUNCTION is
      // still OVERWRITTEN and not merged (`D-24`). **WHAT MOVES IS WHICH MEMBERS THE ADD WALKS: the merged set,
      // at the old set's order first**, so `K-1`'s own accumulated-set answer at its last call is the union and
      // the store's assignment installs it whole.
      const extended = unionAddressSets(held.addresses, site.addresses);
      // **STEP 3 — ADD.** The supplied element is installed under **THE SAME IDENTITY**, because the identity now
      // lives in the STORE and is returned with the pair, so the mechanism's change does not move the observable
      // (`(O-3)` item (iv)'s obligation; `(AA-2)`; `contract.md §2.6` item 2).
      // **⟶ AND A REFUSAL HERE HAS ALREADY TAKEN THE PAIR'S TWO ROWS WITH THE PURGE** — `constraintSite`'s check
      // cannot reach the registration-time evaluation, so this is `docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 4's own declared split — **and both
      // are put back BEFORE the refusal crosses, because the second of that clause's two facts is the kernel's to
      // keep: the pair still evaluates and `constraints()` is unmoved** (`restoreHeldPair` above;
      // `constraint-sites.md §4` item 2; `§2.1` item 1). **`restoreHeldPair` READS `held`, WHICH IS UNMOVED ON
      // EVERY REFUSING ARM**: the extension below is written to the entry only after this loop has passed.
      try {
        for (let position = 0; position < extended.length; position += 1) {
          constraintsKernel().register(instance, extended[position], site.id, constraint);
        }
      } catch (refusal) {
        restoreHeldPair(site.state, instance, held);
        registrationCrossing(refusal);
      }
      // **AND THE READ MODEL CARRIES THE UNION, NOT THE CALL'S SET** — this is defect 2's whole fix and it is
      // the other side of the same change: `enumerateConstraints` answers one row per carried pair with this
      // entry's `addresses`, so a pair that evaluates at N addresses must be *reported* at N addresses
      // (`contract.md §2.6` item 5; `PAR-HL-13`). **NO ROW IS ADDED AND NONE IS REMOVED**: the count is still
      // one row per `id` (`D-29` item 2), and the member's type is unmoved.
      held.addresses = extended;
      held.addressKey = addressSetKey(extended);
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
      // **⟶ THE RECEIVER, FIRST AND BEFORE ANY READ OR EDIT** — the guard `addConstraint` now takes, taken
      // here for the same reason and in the same form (`constraintDetached`, `src/entry/constraints.mjs`).
      // **A DETACHED TOGGLE THREW THE CONSTRAINT METHODS' `TypeError` BEFORE THIS LINE EXISTED**, which is
      // neither the surface's one form nor a store code; it now refuses in the seven's one plain form and
      // moves nothing — no `openCommit`, no pair read, no `K-1`.
      constraintDetached(this);
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
      // **⟶ THE RECEIVER, FIRST AND BEFORE ANY READ OR EDIT** — `constraintOn`'s guard beside it, and the
      // reason is the same one: this member reached `K-6` off this factory's closure, so a detached call
      // would purge the pair's store-side entry. **IT REFUSES IN THE SEVEN'S ONE PLAIN FORM AND MOVES
      // NOTHING** (`constraintDetached`, `src/entry/constraints.mjs`).
      constraintDetached(this);
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
      // ═════════════════════════════════════════════════════════════════════════════════════════════════
      // **⟶ THE RECEIVER IS CONSULTED FIRST — A DETACHED `removeConstraint` DELETED A STANDING PAIR BEFORE
      // THIS LINE EXISTED** (measured 2026-10-26; `docs/guides/package-use.md §12.2): the pair's row left
      // `state.constraints`, its store-side entry was purged through `K-6`, and the call answered
      // `undefined`. **THE GUARD IS THE SEVEN STORE-REACHING VERBS' OWN AND ITS FORM IS THEIRS BYTE FOR BYTE**
      // (`constraintDetached`, `src/entry/constraints.mjs`) — **and it is taken BEFORE step 1's position
      // tests, which is what makes the atomicity of a refused call its POSITION and not its care.**
      // ═════════════════════════════════════════════════════════════════════════════════════════════════
      constraintDetached(this);
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
          appendOwn(addresses, each.s);
        }
      } else {
        const each = constraintAddress(pair.address);
        if (typeof each === 'string') {
          constraintRefuse(`${ARGUMENT_POSITION_FIRST} of \`removeConstraint\``, pair);
        }
        appendOwn(addresses, each.s);
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
    /// declared fourteen own members are UNMOVED** (`⟶ CORRECTED 2026-10-26`: this line printed `twelve`, the
    /// figure the `12 → 14` move of the held-listener-identity unit superseded on 2026-10-19; the operative
    /// figure is `index.d.ts`'s `StoreInstance` and `surface.md §2.4` item 9 (f)) because a symbol key is
    /// invisible to `Object.keys` and to `Object.getOwnPropertyNames` — the precedent `A117` (D6) declares and `docs/specs/storeroom-js/surface.md §2.11` clause 9 prints
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
  //      channels above — **so the product's declared member set is UNMOVED at fourteen** (`surface.md §2.4`
  //      item 9 (f); `⟶ CORRECTED 2026-10-26`: this line printed `twelve`, superseded by the held-listener-
  //      identity unit's `12 → 14` move of 2026-10-19) and no member-counting cell can see it. **AND A CLONED
  //      STORE OBJECT DOES NOT CARRY THE ROW** (`⟶ CORRECTED 2026-10-26`: this clause opened *"AND IT IS THE
  //      ROW A CLONED STORE OBJECT CARRIES TOO"*, which contradicted its own ground and its own conclusion),
  //      because `Object.assign`/spread copy own ENUMERABLE properties only and this row is published at
  //      `enumerable: false`: **a clone carries NO index and therefore resolves NO store**, which is the SAME
  //      one observable the detached call gets.
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
  // can name without one holding the other's reference. **⟶ CORRECTED 2026-10-25 (`strata` L1 e2e pass,
  // `role_test_writer`): this sentence read *"a cloned store object STILL CARRIES IT (a symbol-keyed own
  // property survives `Object.assign` and spread), so a clone resolves the SAME store"* — AND IT IS FALSE OF
  // BOTH HALVES. The row is published by the `Object.defineProperty` below at `enumerable: false`, and
  // `Object.assign` and object spread copy OWN ENUMERABLE properties ONLY: SO A CLONE CARRIES NO INDEX AND
  // NO SLOT, AND A CLONE RESOLVES NO STORE.** **That is the SAME one observable a detached call gets, which
  // is what item 1 of this block already declares above (`:1233`).** **The reading this sentence cited
  // (`receiver-and-refusal.md §5` — *"a deliberately re-bound receiver is still a receiver"*) governs a
  // RE-BOUND receiver that still carries the row, and it never governed a CLONE, which carries nothing to
  // re-bind: the receiver names the store and rebinding is unsupported breaking behaviour the package owes
  // no guard for.**
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
        appendOwn(handles, entry.handle);
        appendOwn(addressSets, [entry.address]);
      } else {
        appendOwn(addressSets[at], entry.address);
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

// **THE MODULE NAMESPACE CARRIES ONE NAME, `storeCreate` ALONE** (`surface.md §2.9` item 1's `A127` clause;
// `11 → 1` ✓): `delete`'s reserved-word spelling, the ten store-reaching names and the three constraint
// functions are the product's own members above and have no export and no second spelling at any layer.
