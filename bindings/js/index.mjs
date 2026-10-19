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
  const where = container === undefined ? undefined : container.map((segment) => String(segment)).join('.');
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
function hasLoneSurrogate(text) {
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      i += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

/// `Object.prototype`'s own property names — `['constructor', '__proto__']` — **read PER CALL from THIS
/// realm's own prototype. They are the KEY SET the (e)-half of the plain-object test compares against.**
///
/// **⟶ READ PER CALL, NOT ONCE AT LOAD: THE LOAD-TIME CACHE WAS A FAIL-CLOSED DoS.** `C-11` of the gate-4
/// adversarial pass measured it: the sets stood as module-level `const`s taken at load, so a LATER own
/// property change to `Array.prototype` (or to `Object.prototype`) left every array address and every plain
/// `cfg` comparing against a key set the realm no longer has — `arrayClass` and `protoClass` then answered
/// `'class'`, the walk refused `[]` and `{}` alike, and the refusal was reached at `on`'s own step 1. **THE
/// SETS ARE FACTS ABOUT THE PROTOTYPES AS THEY ARE AT THIS CALL**, so they are read where they are used;
/// the comparison is unchanged in every other respect (by NAME and by SYMBOL DESCRIPTION, never by a
/// symbol's identity — `§1.2` row 5, `§1.3` row 13).
function plainProtoNames() {
  return new Set(Object.getOwnPropertyNames(Object.prototype));
}

/// `Array.prototype`'s own property names and its own symbols' descriptions, **read PER CALL from THIS
/// realm's own prototype**. **They are the KEY SET the ARRAY half of the class decision compares against**,
/// and the comparison is by NAME and by SYMBOL DESCRIPTION — never by a symbol's identity, because
/// `Symbol.iterator` in another realm is a DIFFERENT symbol value, and a cross-realm array must be ACCEPTED
/// (`§1.2` row 5, `§1.3` row 13). **See `plainProtoNames` above for why these are not cached (`C-11`).**
function arrayProtoNames() {
  return new Set(Object.getOwnPropertyNames(Array.prototype));
}

function arrayProtoSymbols() {
  return new Set(Object.getOwnPropertySymbols(Array.prototype).map((s) => s.description));
}

/// `crossing.md §1.4` item 4: **THE PLAIN-OBJECT TEST**, items (a)–(g) — **STRUCTURAL AND REALM-AGNOSTIC.**
/// **The prototype half is NOT an identity test against this realm's `Object.prototype`**: the prototype
/// is `null`, or a prototype whose OWN properties are exactly the plain-object prototype's. **A plain
/// object from ANY realm (`vm`, a worker, `structuredClone`) is therefore ACCEPTED** — its prototype is
/// that realm's own `Object.prototype`, whose own names are this realm's own two — **while a CLASS INSTANCE
/// is refused, because a class's prototype carries its own `constructor`** (`DD-7`, `DD-35`).
function protoClass(value) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  let names;
  try {
    names = Object.getOwnPropertyNames(proto);
  } catch {
    return 'class';
  }
  const plain = plainProtoNames(); // `C-11`: the realm's own set, read at THIS call
  if (names.length !== plain.size) return 'class';
  for (const name of names) if (!plain.has(name)) return 'class';
  return proto === Object.prototype ? 'plain' : 'foreign';
}

/// `crossing.md §1.4` item 4 (c), (d) and item 1: an own ACCESSOR, or an own `Symbol`-keyed property,
/// REFUSES THE WHOLE VALUE — *"any other answer would DROP A MEMBER SILENTLY"* (`DD-8`).
function accessorOrSymbolArm(value) {
  for (const name of Object.getOwnPropertyNames(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, name);
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
function arrayClass(value) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  let names;
  let symbols;
  try {
    names = Object.getOwnPropertyNames(proto);
    symbols = Object.getOwnPropertySymbols(proto);
  } catch {
    return 'class';
  }
  const arrayNames = arrayProtoNames(); // `C-11`: the realm's own sets, read at THIS call
  const arraySymbols = arrayProtoSymbols();
  if (names.length !== arrayNames.size || symbols.length !== arraySymbols.size) return 'class';
  for (const name of names) if (!arrayNames.has(name)) return 'class';
  for (const symbol of symbols) if (!arraySymbols.has(symbol.description)) return 'class';
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
    if (typeof value === 'object' && value !== null && types.isProxy(value)) return classSpelling(value);
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

function valuePosition(path) {
  if (path.length === 0) return VALUE_ARGUMENT_POSITION;
  const spelled = path
    .map((segment) => {
      if (typeof segment === 'number') return String(segment);
      // **A KEY THE MESSAGE MAY NOT CARRY IS NAMED BY ITS CLASS.** A member KEY holding a lone surrogate is
      // the one position this pass refuses whose own spelling cannot cross into the message at all: the
      // code unit has no `String` form a Rust `String` can carry, so the alternatives are a REPAIR (`§1.8`
      // forbids it, `A76`: *"do not attempt to fix"*) or a message that is not a string. **The position is
      // therefore spelled `'<key: a string carrying a lone surrogate>'`, which names the class the key HAS
      // and no byte of it** — the same reading `boundaryReject`'s target half takes at the segment position.
      if (hasLoneSurrogate(segment)) return "'<key: a string carrying a lone surrogate>'";
      return `'${segment}'`;
    })
    .join('/');
  return `member ${spelled} of ${VALUE_ARGUMENT_POSITION}`;
}

/// **THE FAILING TARGET AT A VALUE POSITION, RENDERED AS THE STORE'S GENERATOR RENDERS IT** —
/// `surface.md §2.5` item 6 (a). **ITS ONE EXAMPLE THAT DIFFERS FROM A CARRIER'S TARGET IS THE SYMBOL**: a
/// symbol's own value carries the caller's DESCRIPTION, and the item's own example prints the CLASS's
/// canonical token `Symbol()`, which is the spelling this arm carries. Every other target is printed as its
/// own value, guarded exactly as `targetSpelling` guards its read.
function valueTargetSpelling(value) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    if (typeof value === 'symbol') return 'Symbol()';
    // **AND A TARGET THE MESSAGE MAY NOT CARRY IS NAMED AS ITS OWN CLASS RATHER THAN AS ITS BYTES**: a string
    // carrying a LONE SURROGATE is the one value this pass refuses whose code unit has no `String` form at
    // all, so printing it would REQUIRE the repair `§1.8` forbids (`A76`: *"do not attempt to fix"*). **The
    // class half is mandatory (item 6 (b)); the byte half is the one datum no clause requires here.**
    if (typeof value === 'string' && hasLoneSurrogate(value)) return 'a string carrying a lone surrogate';
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
function valueReject(fault) {
  boundaryReject(
    'ValueNotAdmitted', // `§1.2`'s outside rows 6–13's ONE code, carried and never minted (`DD-40`)
    valueTargetSpelling(fault.value),
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
const ENCODER_CEILING = 65;

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
function refusedValue(fault, value, failedClass, path, marker) {
  if (fault.found === null) {
    fault.found = failedClass;
    fault.value = value;
    fault.path = path;
  }
  return marker;
}

function encodeValue(value, ancestors, depth, path, fault) {
  // **EVERY REFUSAL BELOW IS THE WALK'S OWN** (`§1.8`'s dated clause 1; `A76`: *"Test JS data for compliance
  // with permitted shape before admitting and do not attempt to fix. reject with verbose error to client"*):
  // the failing target's own spelling is PART ONE (the store's generator's bytes), the class that failed and
  // the position it holds are PART TWO, appended — and the status is the store's own `ValueNotAdmitted`
  // (`§1.2`'s outside rows 6–13). **NOTHING IS REPAIRED**: no member is dropped, no class is substituted, no
  // value is converted (`A76`'s second part; `§1.8`).
  // `§1.4` item 5's dated two-arm table: *"`66` and beyond REFUSED by the boundary's own encoder carrying the
  // store's outside class `Cyclic`"* — the encoder's bound is one PAST the declared `64`, so `65` is still
  // encoded and refused by the conversion core's own bound, whose message is the store's own (item 6 (d)).
  if (depth > ENCODER_CEILING) {
    return refusedValue(fault, value, 'a value nested deeper than the walk admits', path, { k: 'c' });
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
    return { k: 's', v: value };
  }
  if (kind === 'boolean') return { k: 'b', v: value };
  // THE CLASS TEST PRECEDES THE NUMERIC ARM (`JS-6`): `bigint` is refused here, as its own outside class,
  // and is NEVER converted through the numeric arm (`Number(10n)` is the shipped `JS-6` substitution).
  if (kind === 'bigint') return refusedValue(fault, value, 'a bigint', path, { k: 'g', v: value.toString() });
  if (kind === 'number') {
    if (!Number.isFinite(value)) {
      return refusedValue(fault, value, 'a non-finite number', path, { k: 'F', v: value }); // `§1.2` row 11
    }
    return { k: 'n', v: value };
  }
  if (kind === 'function') return refusedValue(fault, value, 'a function', path, { k: 'f' }); // row 8
  if (kind === 'symbol') return refusedValue(fault, value, 'a symbol', path, { k: 'y' }); // row 9
  // `§1.4` item 4 (g), `DD-34` — and NO trap is invoked: `util.types.isProxy` reads no member.
  if (types.isProxy(value)) return refusedValue(fault, value, 'a Proxy', path, { k: 'P' });
  // `§1.4` item 6: the ancestor stack, never a `WeakSet` — which is what ADMITS an acyclic diamond.
  if (ancestors.includes(value)) {
    return refusedValue(fault, value, 'a value that contains itself', path, { k: 'c' }); // `§1.2` row 12
  }
  const next = [...ancestors, value];
  if (Array.isArray(value)) {
    // **THE CLASS DECISION COMES FIRST, ON THE VALUE AS IT IS** (`A76`, `JS-2`): `Array.isArray` is TRUE
    // for a class extending `Array`, so it may not stand alone as the admission test. **A class extending
    // `Array` is refused under ITS OWN declared class — `§1.2` row 5's `ValueNotAdmitted`
    // (`NonPlainCollection`) — and NEVER through the array shape test.**
    if (arrayClass(value) === 'class') {
      return refusedValue(fault, value, 'a class extending Array', path, { k: 'P' });
    }
    for (let i = 0; i < value.length; i += 1) {
      // `§1.4` item 2: a hole refuses the WHOLE value (`DD-8`), and its class is the array's own hole arm.
      if (!(i in value)) return refusedValue(fault, value, 'a sparse array', path, { k: 'H' });
    }
    const refusal = accessorOrSymbolArm(value);
    if (refusal !== null) return refusedValue(fault, value, shapeArmClass(refusal), path, refusal);
    const members = [];
    for (let i = 0; i < value.length; i += 1) {
      // **AN ARRAY MEMBER'S INDEX IS A DECLARED POSITION** (`§2.5` item 6 (b): *"the MEMBER POSITION for a
      // member inside a value the walk reached"*), and it is carried BARE, as item 6 (a) spells an integer
      // segment. Every index is present and is a data property by the two rules above, so the read below is
      // the read `for … of` performed.
      members.push(encodeValue(value[i], next, depth + 1, [...path, i], fault));
    }
    return { k: 'a', i: members };
  }
  const proto = protoClass(value);
  // `§1.4` item 4 (f): a prototype-carrying object is REFUSED — never read through its chain (`JS-5`).
  if (proto === 'class') return refusedValue(fault, value, classSpelling(value), path, { k: 'P' });
  const refusal = accessorOrSymbolArm(value);
  if (refusal !== null) return refusedValue(fault, value, shapeArmClass(refusal), path, refusal);
  const members = [];
  for (const name of Object.keys(value)) {
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
      return refusedValue(fault, VALUE_ARGUMENT_POSITION, 'a string carrying a lone surrogate', [...path, name], { k: 'c' });
    }
    members.push([name, encodeValue(value[name], next, depth + 1, [...path, name], fault)]);
  }
  return { k: 'o', m: members, p: proto, acc: false, proxy: false };
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
      segments.push(encoded);
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
    return { k: 'S', i: tier.map(encodeTierSetItem) };
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
  return listeners.map((entry, position) => {
    if (!isPlainObjectValue(entry)) {
      boundaryReject(
        'AddressMalformed',
        'listeners',
        `the listeners entry at position ${position} is ${classSpelling(entry)}, and an entry is a plain { address, handle } record`,
      );
    }
    const keys = Object.keys(entry); // the OWN enumerable string keys, and nothing inherited
    if (keys.length !== 2 || !Object.hasOwn(entry, 'address') || !Object.hasOwn(entry, 'handle')) {
      return { bad: 'entry' };
    }
    const handle = entry.handle;
    if (typeof handle !== 'string' || handle === '') return { bad: 'handle' };
    return { address: encodeAddress(entry.address), handle };
  });
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
  return constraints.map((entry, position) => constraintEntry(entry, position));
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
  return { address, id: entry.id };
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
      segments.push(segment);
    } else if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0
      && Number.isSafeInteger(segment)) {
      segments.push(segment);
    } else {
      return `${spellConstraintAddress(segments)} and ${classSpelling(segment)} at position ${i}`;
    }
  }
  return { k: 'L', s: segments };
}

/// `§8.2`'s whole-address spelling: **a string key SINGLE-QUOTED (`'a'`) and an integer index BARE (`0`),
/// JOINED BY `/`** — the same spelling the store's own generator prints at its `<SEGMENT>` slot.
function spellConstraintAddress(segments) {
  return segments
    .map((segment) => (typeof segment === 'string' ? `'${segment}'` : String(segment)))
    .join('/');
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
// THE COPY OUT — the core's own records and values mapped back into FRESH JS values
// (`crossing.md §1.1` clause 2: no returned value is a view into store memory).
// ---------------------------------------------------------------------------------------------
function decodeValue(encoded) {
  switch (encoded.k) {
    case 's':
      return encoded.v;
    case 'b':
      return encoded.v;
    case 'n':
      return encoded.v;
    case 'g':
      return BigInt(encoded.v);
    case 'F':
      return encoded.v;
    case 'z':
      return null;
    case 'u':
      return undefined;
    case 'a':
      return encoded.i.map(decodeValue);
    case 'o': {
      const out = {};
      for (const [name, member] of encoded.m) out[name] = decodeValue(member);
      return out;
    }
    default:
      return undefined;
  }
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

function decodeSegments(segments) {
  return segments.map(decodeSegment);
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
function crossTriggered(state, triggered) {
  if (!Array.isArray(triggered)) return [];
  const out = [];
  for (const element of triggered) {
    out.push({ handle: element.handle, address: decodeSegments(element.address) });
  }
  return out;
}

/// **THE HANDLES A TRIGGER SET NAMES, in its own order** — how a caller-side read of the set as a SET is
/// spelled, and how the delivery's dedupe key is read (`contract.md §2.4` item 6).
function handlesOf(triggered) {
  return triggered.map((element) => element.handle);
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

function call(state, verb, args) {
  const addon_ = withAddon();
  try {
    return addon_.call(state.id, verb, args);
  } catch (refusal) {
    fail(notFoundRendering(refusal, listedSegments(args[0])));
  }
}

/// The segments an already-encoded address argument carries — the declared list shape's own member, and
/// `undefined` for every outside shape (which carries no address and therefore no container claim).
function listedSegments(arg) {
  if (arg === null || typeof arg !== 'object' || !Array.isArray(arg.s)) return undefined;
  return arg.s;
}

/// **`write`'S OWN CALL, AND THE ONE PLACE A VALUE-POSITION REFUSAL IS RENDERED** (`§2.5` item 6 (d) and its
/// `CF-3` clause 1). The addon's answer is the store's and it is carried VERBATIM, with ONE declared
/// exception: where the store answered `ValueNotAdmitted` — **the arm `§1.8`'s dated clause 1 assigns to the
/// WALK** — and the walk RECORDED the fault that produced it, the message is re-rendered as the composite of
/// item 6: PART ONE, the store's own generator's rendering of that code at the failing VALUE's own spelling,
/// and PART TWO, the class that failed and the position it holds, appended. **The store's refusal ORDER is
/// untouched, because this site is reached only AFTER the store has chosen which refusal answers** — which
/// is what keeps `write(instance, ['x'])`'s carrier-row `AddressMalformed` (`write-and-read.md §3.4` `F-1`)
/// ahead of the value's own code. Every other status, and every `ValueNotAdmitted` the walk did not produce
/// (the conversion core's own depth and node bounds, `§1.4` item 5), crosses VERBATIM (item 2).
function writeCall(state, args, fault) {
  const addon_ = withAddon();
  try {
    return addon_.call(state.id, 'write', args);
  } catch (refusal) {
    if (fault.found !== null && refusal !== null && typeof refusal === 'object' && refusal.status === 'ValueNotAdmitted') {
      valueReject(fault);
    }
    fail(refusal);
  }
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
  const state = { id, home: [], registry: new Map(), constraints: new Map(), leg: null };
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
      args.push(encodeTier(tier, arguments.length >= 2, false, 'first argument'));
      return decodeValue(call(state, 'read', args));
    },
    /** `docs/specs/storeroom-js/surface.md §2.2` / `docs/specs/storeroom-js/surface.md §2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`. */
    readLiteral(address, tier) {
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      args.push(encodeTier(tier, arguments.length >= 2, false, 'first argument'));
      return decodeValue(call(state, 'readLiteral', args));
    },
    write(address, tier, value, commit) {
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
      const fault = { found: null, value: undefined, path: [] };
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      // `PAR-JS-7`: `write`'s tier is REQUIRED — an ABSENT position and a SUPPLIED `undefined` both answer
      // `AddressMalformed`, and neither folds.
      args.push(encodeTier(tier, arguments.length >= 2, false, 'first argument'));
      // THE WALK'S OWN FAULT RECORD — see `refusedValue`: the walk CLASSIFIES and RECORDS, and the record is
      // read at the one site where the store answered `ValueNotAdmitted` for a value the walk refused.
      args.push(encodeValue(value, [], 0, [], fault));
      if (arguments.length <= 3) {
        return constraintWrite(state, instance, address, tier, value);
      }
      let answer;
      try {
        answer = writeCall(state, args, fault);
      } catch (refusal) {
        // **⟶ AND THE RELEASE AN ABANDONED ADOPTION ONCE NEEDED IS GONE WITH THE MACHINERY, 2026-10-18.** The
        // catch this replaces released *"the adoption it was taken for"* — an identity `settle` had put in
        // flight and this write then failed to claim. **WITH `settle` REMOVED THERE IS NO ADOPTION TO RELEASE**
        // (`docs/specs/storeroom-js/surface.md §2.4` item 9's adoption-machinery clause; the three architect's rulings of that date), so the store's
        // own refusal crosses back UNCHANGED AND UNCONVERTED and this frame adds nothing to it.
        throw refusal;
      }
      const record = {
        op: decodeJournalOp(answer.op),
        watched: answer.watched.map(decodeSegments),
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
    },
    /// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM, `tiers` in the store's canonical order,
    /// and the in-domain no-op arm a SUCCESS returning `tiers: []`. **Its declared NAME is `delete`, and it is
    /// published under that name ALONE** (`package.md §1.3` item 3): `deleteOp` is a reserved-word workaround
    /// for the declaration and never a member of the package's namespace.
    delete(address, tier) {
      const args = arguments.length >= 1 ? [encodeAddress(address, undefined, 'first argument')] : [];
      // `delete`'s tier is read as a VALUE and not by an arity fold: an ABSENT position is the whole-target
      // removal, and a supplied `undefined` answers row 4's `AddressMalformed` (`crossing.md §1.3`).
      args.push(encodeTier(tier, arguments.length >= 2, false, 'first argument'));
      const answer = call(state, 'delete', args);
      const receipt = {
        address: decodeSegments(answer.address),
        tiers: answer.tiers,
        triggered: crossTriggered(state, answer.triggered),
      };
      // `A43`: a delete FIRES its own triggered set, on the same window as a write (`docs/specs/storeroom-js/surface.md §2.7` item 2).
      deliver(state, receipt.triggered, answer.triggeringAddress);
      return receipt;
    },
    /// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`docs/specs/storeroom-js/contract.md §2.6`).
    rollback(opId) {
      const args = arguments.length >= 1 ? [encodeOpId(opId)] : [];
      const answer = call(state, 'rollback', args);
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
    /// **AND `listen` GAINS NO CONFLICT TEST AT ALL**: it does not test whether the entry it destroys belongs to
    /// another actor, and no clause exempts a kernel-held entry (`P: docs/pending.md · (C-1)`, verbatim; `(C-2)`
    /// item (iv)).
    listen(handle, addresses) {
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
      // ── THE ONE STORE ACT: PURGE, THEN INSTALL, INSIDE THE STORE'S OWN VERB ───────────────────────────────
      // The set crosses AS ENCODED ADDRESSES, one per member, in the caller's own order (`PAR-HL-2`'s referent:
      // the whole set and never a delta).
      const encoded = [];
      for (let i = 0; i < addresses.length; i += 1) {
        encoded.push(encodeAddress(addresses[i], 'second argument', 'second argument'));
      }
      call(state, 'listen', [handleWire(handle), encoded]);
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
      return undefined;
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
      // **THE DOMAIN TEST IS A DIRECT MAP KEY CHECK** (`P: docs/pending.md · P-6`, fork (g), verbatim: *"the
      // function lookup is now a direct map key check"*): a non-string, a blank string and a string the map does
      // not carry are each the no-op success, and NO OTHER REGISTRATION IS REMOVED (`identity-and-domain.md §6`
      // `O-3`).
      if (!inDomainHandle(handle) || !state.registry.has(handle)) return undefined;
      call(state, 'unlisten', [handleWire(handle)]);
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
      const site = constraintSite(state, 'addConstraint', arguments.length, pair, constraint);
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
      constraintsKernel().remove(instance, { address: held.addresses, id: held.id });
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
      const verb = 'constraintOn';
      const site = constraintSite(state, verb, arguments.length, pair, constraint);
      const entry = site.state.constraints.get(constraintPairKey(site.addresses, site.id));
      if (entry === undefined) constraintUncarried(verb, pair);
      if (entry.enabled !== true) {
        // **⟶ AND THE TOGGLE IS A PURGE-THEN-ADD TOO, BECAUSE IT REACHES THE SAME `K-1`.** **THE RULING, AT ITS
        // OWN SITE: *"it is the same rule for `constraintOn`/`constraintOff`, which reach the same `K-1`: their
        // re-registration is a purge-then-add too, and `constraintParked` is the new element added"*** —
        // *"THE PROPOSAL MUST STATE THAT A TOGGLE AT A PAIR PURGES THE PAIR'S OLD STORE ENTRIES, because that is
        // what `no exceptions` means at this site"* (`P: docs/pending.md · (O-3)` item (v), verbatim;
        // `contract.md §2.3` item 7; `constraint-sites.md §1` rows 2–3).
        //
        // **THE CHECK PRECEDES IT, AS AT EVERY HELD-PAIR SITE** (`constraintSite` has already run: the pair's
        // shape, the id, the addresses' domain and the element's class), **and a refusal therefore purges
        // nothing.** **AND THE IDENTITY STANDS THROUGH THE CYCLE — `constraintOff` is a TOGGLE and not a
        // removal** (`constraint-identity.md §3` item 3; `contract.md §5.6`'s `S-ID` family; `IF-5`).
        constraintsKernel().remove(instance, { address: entry.addresses, id: entry.id });
        // **⟶ AND THE TOGGLE'S REFUSAL HAS THE SAME WAKE AS THE OVERWRITE ARM'S, FOR THE SAME REASON: IT REACHES
        // THE SAME `K-6` AND THE SAME `K-1`** (`docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 7; `constraint-sites.md §1` rows 2–3), **so a refused
        // re-registration has already purged the pair's own row and its read model, and both are put back before
        // the refusal crosses** (`restoreHeldPair` above; `constraint-sites.md §4` item 2; `§2.1` item 1).
        try {
          for (const address of entry.addresses) {
            constraintsKernel().register(instance, address, entry.id, entry.fn);
          }
        } catch (refusal) {
          restoreHeldPair(site.state, instance, entry);
          registrationCrossing(refusal);
        }
        entry.enabled = true;
        // **⟶ AND STEP 3 IS THE RE-ADD: THE SAME PAIR IDENTITY IS WRITTEN BACK** (`P: docs/pending.md · (O-3)`
        // item (iv)'s obligation; `(AA-2)`: *"Move the identity into the store"*, preserved *"equal to itself on
        // a second `addConstraint` at the SAME pair"*). **THE TOGGLE IS NOT A REMOVAL, so the row it purged is
        // restored UNDER THE SAME IDENTITY and the enumeration is unmoved** (`constraint-identity.md §3` item 3;
        // `§5` `IF-5`; `removal-members.md §3` item 3): *"`constraintOff` is a TOGGLE and not a removal: a
        // disabled pair is STILL CARRIED and STILL ENUMERATED"*.
        site.state.constraints.set(constraintPairKey(entry.addresses, entry.id), entry);
      }
      return undefined;
    },
    /// `surface.md §2.12` item 2 (a): **`a.constraintOff(pair, constraint) -> undefined`** — the DISABLE half.
    constraintOff(pair, constraint) {
      const verb = 'constraintOff';
      const site = constraintSite(state, verb, arguments.length, pair, constraint);
      const entry = site.state.constraints.get(constraintPairKey(site.addresses, site.id));
      if (entry === undefined) constraintUncarried(verb, pair);
      if (entry.enabled !== false) {
        // **⟶ AND THE TOGGLE IS A PURGE-THEN-ADD TOO, BECAUSE IT REACHES THE SAME `K-1`.** **THE RULING, AT ITS
        // OWN SITE: *"it is the same rule for `constraintOn`/`constraintOff`, which reach the same `K-1`: their
        // re-registration is a purge-then-add too, and `constraintParked` is the new element added"*** —
        // *"THE PROPOSAL MUST STATE THAT A TOGGLE AT A PAIR PURGES THE PAIR'S OLD STORE ENTRIES, because that is
        // what `no exceptions` means at this site"* (`P: docs/pending.md · (O-3)` item (v), verbatim;
        // `contract.md §2.3` item 7; `constraint-sites.md §1` rows 2–3).
        //
        // **THE CHECK PRECEDES IT, AS AT EVERY HELD-PAIR SITE** (`constraintSite` has already run: the pair's
        // shape, the id, the addresses' domain and the element's class), **and a refusal therefore purges
        // nothing.** **AND THE IDENTITY STANDS THROUGH THE CYCLE — `constraintOff` is a TOGGLE and not a
        // removal** (`constraint-identity.md §3` item 3; `contract.md §5.6`'s `S-ID` family; `IF-5`).
        constraintsKernel().remove(instance, { address: entry.addresses, id: entry.id });
        // **⟶ AND THE TOGGLE'S REFUSAL HAS THE SAME WAKE AS THE OVERWRITE ARM'S, FOR THE SAME REASON: IT REACHES
        // THE SAME `K-6` AND THE SAME `K-1`** (`docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 7; `constraint-sites.md §1` rows 2–3), **so a refused
        // re-registration has already purged the pair's own row and its read model, and both are put back before
        // the refusal crosses** (`restoreHeldPair` above; `constraint-sites.md §4` item 2; `§2.1` item 1).
        try {
          for (const address of entry.addresses) {
            constraintsKernel().register(instance, address, entry.id, constraintParked);
          }
        } catch (refusal) {
          restoreHeldPair(site.state, instance, entry);
          registrationCrossing(refusal);
        }
        entry.enabled = false;
        // **⟶ AND STEP 3 IS THE RE-ADD: THE SAME PAIR IDENTITY IS WRITTEN BACK** (`P: docs/pending.md · (O-3)`
        // item (iv)'s obligation; `(AA-2)`: *"Move the identity into the store"*, preserved *"equal to itself on
        // a second `addConstraint` at the SAME pair"*). **THE TOGGLE IS NOT A REMOVAL, so the row it purged is
        // restored UNDER THE SAME IDENTITY and the enumeration is unmoved** (`constraint-identity.md §3` item 3;
        // `§5` `IF-5`; `removal-members.md §3` item 3): *"`constraintOff` is a TOGGLE and not a removal: a
        // disabled pair is STILL CARRIED and STILL ENUMERATED"*.
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
      call(state, 'removeListener', [handleWire(handle)]);
      state.registry.delete(handle);
      state.home = state.home.filter((row) => row.handle !== handle);
      return undefined;
    },
    /// **⟶ `removeConstraint(pair) -> undefined` — THE SECOND OF THE TWO NEW MEMBERS**
    /// (`contract.md §2.7` item 3; `removal-members.md §3`; `P: docs/pending.md · P-5`'s `(R4)`, verbatim:
    /// *"removeConstraint REMOVES EVERYTHING — THE PAIR, ALL N ADDRESS ROWS, THE KERNEL'S REGISTRATION, AND THE
    /// STORE-SIDE HOME ENTRY"*).
    ///
    /// **IT IS A THIRD AND STRONGER OPERATION**: neither `constraintOff` (a TOGGLE re-registering a parked stub
    /// and keeping the pair carried) nor the kernel's `withdrawRegistration` (which leaves the store's home entry
    /// standing). **AND IT IS THE ONE ACT THAT DELETES AN IDENTITY** (`contract.md §2.6` item 3; `P: docs/pending.md
    /// · (AA-2)`, closing sentence).
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
      constraintsKernel().remove(instance, { address: entry.addresses, id: entry.id });
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
  // **⟶ `docs/specs/storeroom-js/surface.md §2.12` ITEM 1 CLAUSE (b): `storeCreate` REGISTERS EACH OF `cfg.constraints`' ELEMENTS THAT CARRIES
  // ITS OWN FUNCTION AT `K-1`, AT THE INSTANCE IT IS CONSTRUCTING** — the SAME call the ADD route makes, so
  // a batch-populated pair is a pair the entry carries on the same footing (`docs/specs/storeroom-js/surface.md §2.12` item 3's preamble clause
  // (a)). **A WELL-FORMED PAIR CARRYING NO FUNCTION IS NOT AN ELEMENT AND IS NOT REGISTERED**: it is read at
  // the store's two validation instants (`PAR-JS-21`) and by nothing here.
  if (isPlainObjectValue(cfg) && isAdmittedArray(cfg.constraints)) {
    const list = cfg.constraints;
    for (let i = 0; i < list.length; i += 1) {
      const element = list[i];
      const encoded = constraintEntry(element, i);
      if (encoded.bad !== undefined) continue;
      if (typeof element.constraint !== 'function') continue;
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
      // `addresses` to `K-1`'s `inDomainAddress`, which admits A LIST OF SEGMENTS AND NOTHING ELSE. **SO
      // `encoded.address.s` DELIVERED `['a']`'s ENCODING INTO A POSITION THAT ASKS FOR `['a']` ITSELF**: an
      // in-domain pair was refused `KC-1` through the batch route alone, `addConstraint` — which passes
      // `constraintSite`'s decoded `addresses` — succeeding at the identical pair. **THE TWO ROUTES REACH ONE
      // `K-1` WITH ONE SHAPE** (`docs/specs/storeroom-js/surface.md §2.12` item 3's preamble clause (a): *"the SAME call the ADD route makes"*),
      // so the carrier is read back to its segments here and no new position, no new code and no new failure
      // form is minted: `s` IS the decoded list `constraintAddress` built, and the pair is its ONE-member set
      // (`constraint-identity.md §6`'s pair table — a single address at the REGISTRATION act).
      try {
        carryConstraint(state, instance, [encoded.address.s], encoded.id, element.constraint);
      } catch (refusal) {
        registrationCrossing(refusal);
      }
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
    const byHandle = new Map();
    for (const entry of cfg.listeners) {
      if (!isLawfulListenerElement(entry)) continue;
      const set = byHandle.get(entry.handle);
      if (set === undefined) byHandle.set(entry.handle, [entry.address]);
      else set.push(entry.address);
    }
    for (const [handle, set] of byHandle) {
      instance.listen(handle, set);
    }
  }
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
  const matched = new Set();
  const recipients = [];
  for (const item of triggered) {
    if (matched.has(item.handle)) continue; // ONE invocation per DISTINCT HANDLE — never one per element
    matched.add(item.handle);
    // **THE `off` MEMBER IS READ HERE AND ONLY HERE — the snapshot the architect's A2 ruling fixes**
    // (`P: docs/pending.md · P-5`'s A2 timing, verbatim: *"Check on/off at the time of decision whether to
    // add the function to the recipients list, not at runtime."*; `identity-and-domain.md §4` item 2):
    // **an entry that is absent or `off` is SKIPPED THERE, and the recipients list carries the FUNCTION**,
    // so the invocation loop below performs the call unconditionally and consults the flag no second time.
    const entry = state.registry.get(item.handle);
    recipients.push([item.handle, entry === undefined || entry.off === true ? undefined : entry.fn]);
  }
  for (const [handle, listener] of recipients) {
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
  // **A CONSTRAINT/LISTENER CONFLICT ARISES AT `addConstraint` AT AN ADDRESS A LISTENER IS ALREADY REGISTERED
  // AT — ONE DIRECTION, NOT TWO** (`P: docs/pending.md · (C-1)`, verbatim). **THE TEST'S SEAT IS `registerOn`,
  // and it is taken BEFORE the registry is written, so a refusal leaves the registry untouched**
  // (`P: docs/pending.md · (C-2)` item (i), verbatim; `constraint-sites.md §5` item 1).
  //
  // **AND IT KEYS ON IDENTITY AND NOT ON THE ADDRESS ALONE**: the kernel registers `noopListener`, and a
  // conflict is between a CALLER's listener and a CALLER's constraint — so the test keys on the REGISTRATION,
  // which only a caller performs with its own function (`P: docs/pending.md · (C-2)` item (ii); `PAR-HL-32`).
  // **THE FORM IS A PACKAGE-SIDE `TypeError` WITH NO `status` MEMBER — NO NEW CODE, NO CLOSED-SET WIDENING**
  // (`P: docs/pending.md · (C-3)`, verbatim); **its message is the package's own text naming BOTH SIDES — the
  // listener's address and the constraint that stands there** (`contract.md §2.3` item 9 item (iii)).
  // **AND THE TEST IS TAKEN WHERE THE REGISTRATION IS A CALLER'S OWN**: the kernel's own `noopListener`
  // registration is EXCLUDED BY IDENTITY (`P: docs/pending.md · (C-2)` item (ii); `PAR-HL-32`), which is what
  // keeps `K-1`'s own overwrite arm and every `constraintOn` reachable at a pair-conflicted address.
  //
  // **⟶ THE EXCLUSION IS INLINED HERE, AND A PREDICATE IS NOT AN ITEM (`2026-10-18`)** — the kernel's surface
  // is exactly the six `K-1`–`K-6` items (`remove-member.md §5` item 1; `§7`'s `MF-6` row), so the kernel no
  // longer exports `isKernelHandle`. **THE PREDICATE DETERMINED NO BEHAVIOUR OF ITS OWN**, and the one
  // behaviour its consumer wanted is the structural comparison below, stated AT THIS CALL SITE: the kernel's
  // own entry is the handle it spelled (`constraint@<JSON address>`), and the identity the two layers can both
  // read is that spelling (`contract.md §2.1` item 3 — one identity per string). The prefix is declared once,
  // here, beside its one use, so no name crosses the module boundary on the predicate's account and the
  // spelling is not duplicated across distances.
  const conflicted = typeof handle === 'string' && handle.startsWith(KERNEL_HANDLE_PREFIX)
    ? null
    : constraintAtAnyAddress(state, handle);
  if (conflicted !== null) {
    throw withEmptyLog(new TypeError(
      `the listener '${handle}' cannot be registered at ${JSON.stringify(conflicted.address)}: the constraint `
        + `'${conflicted.id}' stands at that address, and a listener and a constraint do not share one`,
    ));
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
    call(state, 'listen', [
      handleWire(handle),
      standing.map((address) => encodeAddress(address, 'first argument', 'first argument')),
    ]);
    state.home = state.home.filter((row) => row.handle !== handle);
    for (const address of standing) {
      state.home.push({ key: homeAddressKey(address), address: address.slice(), handle });
    }
  }
  const addon_ = withAddon();
  try {
    addon_.register(state.id, handleWire(handle));
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
      call(state, 'commitFile', [encodeOpId(answer.op.opId)]);
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

/// **THE KERNEL'S OWN HANDLE SPELLING, DECLARED ONCE AT ITS ONE CONSUMER** — the prefix the kernel's own
/// `noopListener` entry is registered under (`constraint@<JSON address>`; `P: docs/pending.md · (C-2)` item
/// (ii); `PAR-HL-32`'s domain cell: *"the kernel's own `noopListener` is EXCLUDED BY IDENTITY"*).
/// **⟶ IT IS SPELLED HERE BECAUSE A PREDICATE IS NOT AN ITEM (`2026-10-18`)**: the conflict test's exclusion
/// was reached through the kernel's exported `isKernelHandle`, and that name is off the kernel's surface
/// (`remove-member.md §5` item 1's six items; `§7`'s `MF-6` row, expected `NONE`). **THE COMPARISON IS
/// STRUCTURAL AND NOT A COMPARISON OF FUNCTIONS** — `noopListener` is module-private and unseeable here, so the
/// identity both layers can read is the HANDLE the kernel spelled, and a caller that spells that exact text
/// names the kernel's own entry (one identity per string, `contract.md §2.1` item 3). **NO NAME CROSSES THE
/// MODULE BOUNDARY ON ITS ACCOUNT** — the spelling is a declared constant here, and `constraintsKernel()` is
/// not reached at all for this test.
const KERNEL_HANDLE_PREFIX = 'constraint@';

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
  return `${addressSetKey(addresses)}\u0000${id}`;
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
  for (const address of addresses) {
    try {
      constraintsKernel().register(instance, address, id, constraint);
    } catch (refusal) {
      registrationCrossing(refusal);
    }
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
function constraintParked() {
  return true;
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
/// was enabled and `constraintParked` where it was disabled, which is exactly the element the toggle itself
/// re-registers (`docs/specs/storeroom-js/surface.md §2.12` item 3; `constraint-sites.md §1` row 2: *"`entry.fn` (the element the entry
/// carried)"*). **AND ITS OWN `K-1` CANNOT REFUSE**: the element is the one the pair was ADMITTED under, and
/// every kernel write re-evaluates a standing pair and refuses on violation without landing it, so a state
/// the pair's own element rejects is not a state a standing pair is ever left in (`kernel-surface.md §2.3`
/// item 1; `docs/specs/storeroom-native/contract.md §7.3` (b) state 1).
function restoreHeldPair(state, instance, held) {
  // THE READ-MODEL ROW FIRST: it is the one `K-6`'s `FORGET_PAIR` deleted, and it is unobtainable from the
  // kernel (`docs/specs/storeroom-held-listener-identity/contract.md §2.9` item 3).
  state.constraints.set(constraintPairKey(held.addresses, held.id), held);
  // AND THE KERNEL'S OWN ROW BESIDE IT, AT EVERY ADDRESS THE PAIR STOOD AT, UNDER ITS OWN IDENTITY — the
  // same act `constraintOn` performs, so the pair is carried and enumerated exactly as it was (`docs/specs/storeroom-held-listener-identity/contract.md §2.6`
  // item 4; `constraint-identity.md §3` item 3).
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
  if (typeof status !== 'string' || KC_TOKENS.includes(status) === false) {
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
