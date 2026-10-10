// `@provident-storeroom/js` — **THE CLAIMED REALM: Node ESM, ALONE** (`package.md §1.1`, `A70`).
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
// listener home and the prefix test, the file image and its boot, the fifteen-member fail set and its
// generated messages are ALL reached through the facade, and NOTHING of them is re-implemented here.
//
// **WHAT STAYS IN JS, AND WHY IT IS NOT STORE LOGIC** (`A75`: *"THE REGISTRY, THE OPAQUE HANDLE AND THE
// SINGLE FAILURE FORM STAY IN JS (they are the PACKAGE's surface, `§2.4`)"*):
//   * **THE PACKAGE'S OWN OPAQUE HANDLE** (`surface.md §2.3` item 2, `DD-14`): a frozen, memberless JS
//     object whose token is private — the store's token crosses OUT of the addon and is wrapped here.
//   * **THE PACKAGE'S OWN REGISTRY** (`surface.md §2.4`): the caller's FUNCTION, held per instance and
//     reached through the ONE member `storeCreate` returns (`register(handle, listener)`). **The store
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
//   3. **THE REJECTION IS VERBOSE AND TRAVELS INSIDE THE ONE `{status, message}`** (`§2.5`, `A76`'s own
//      reach: *"it does NOT license a SECOND failure form"*). Where the STORE produced the refusal, its own
//      generated message crosses VERBATIM. Where the refusal is the BOUNDARY's own — a class the walk
//      rejects before any verb, **at a carrier position or at a VALUE position** — `boundaryReject` renders
//      the failing TARGET with the store's own generator and appends the class that failed, with the
//      POSITION the contract declares for that site (`§2.5` item 6 (a)–(b)); **the
//      status is always a member of the store's closed set and is NEVER minted (`DD-40`).**
//
// **`§18` · `A77`, VERBATIM:** ***"Listener passes an id back to client-side when triggered, JS then has to
// match id to the function it was set with."*** — **THE ID IS THE OPAQUE HANDLE REGISTRATION RETURNED, the
// `triggered` member's own element and the registry's own key; `deliver` matches THAT IDENTITY to the
// caller's function, an id with no registered function fires NOTHING SILENTLY (`§2.4` rule 1 — the silence
// is the declared observable), and the invocation's ONE argument is the triggering ADDRESS (`PAR-JS-12`):
// the matched id and the address are two different data and only the address is passed.**

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname as dirOf, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from 'node:util';

const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

// ---------------------------------------------------------------------------------------------
// THE RESOLUTION RULE — THREE RUNGS, IN ORDER, AND THE CLOSED KEY SET (`docs/specs/storeroom-publish/
// resolution.md §2` · `§3`; `docs/specs/storeroom-publish/contract.md §1.1` · `§1.3` · `§1.5`).
//
// **RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** The table below is the WHOLE of the
// table the entry carries: it maps the runtime's `process.platform` × `process.arch` pair to ONE of the
// FIVE DECLARED NAMES, and to NO other value. **A name is SELECTED from this table and is NEVER BUILT by
// concatenating a platform token, an architecture token and a toolchain token** (`C-1`, `§1.3` item 1):
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
// **RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** The single failure arm of `§1.4`, its subject the
// artefact paths that WERE TRIED.
//
// **THE CATCH'S DECLARED WIDTH** (`§1.1`; `resolution.md §2.3`): EVERY throw of rung one's `require` is a
// MISS — a `MODULE_NOT_FOUND` for an absent package, an `ERR_DLOPEN_FAILED` for a present-but-unloadable
// artefact, and any other throw alike — so the loader moves to rung two and never answers a second shape.
// ---------------------------------------------------------------------------------------------
const PLATFORM_NAMES = {
  'linux·x64': '@provident-storeroom/js-linux-x64-gnu',
  'linux·arm64': '@provident-storeroom/js-linux-arm64-gnu',
  'darwin·x64': '@provident-storeroom/js-darwin-x64',
  'darwin·arm64': '@provident-storeroom/js-darwin-arm64',
  'win32·x64': '@provident-storeroom/js-win32-x64-msvc',
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

/// **THE PACKAGE'S OWN VERSION, READ FROM THE PACKAGE'S OWN MANIFEST** (`§1.5` item 1: *"never passed in,
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
// ONCE; if the artefact is absent, unreadable or refuses to load, the construction answers `§2.5`'s
// SINGLE FAILURE FORM and NO instance is returned — the package never falls back to a JS store and never
// absorbs the state silently.
//
// **THE DECLARED STATE:** an addon that is absent or fails to load answers
// `{status: 'FilePathUnreachable', message: <the store's own generated string for that code at the
// addon's own path>}`. The status is a member of the store's closed `15`-member set carried VERBATIM
// (`§2.5` item 1, `DD-40`) and is not minted here; the message is the STORE'S generator's string, reached
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
// **THE ARM THE LOAD PATH ANSWERED WITH, WHERE THE STATE IS THE VERSION MISMATCH** (`§1.5` item 2): the
// load path's OWN declared answer, remembered so that the mismatch is TERMINAL — rung two's `require` is
// not reached on the evaluation that meets the mismatch and not on any LATER one either, because the walk
// reads this state before it walks anything. **THE STATE IS THE DECLARED FORM ITSELF AND NEVER A HOST
// `Error`**: `§1.4` item 1 admits ONE failure shape — `{status, message}`, thrown, no third member — so a
// second failure INSTANCE held in the module's own state is not a shape this unit admits (`PUB-R-3`).
let addonArm = null;
// **THE RUNGS THE LOAD PATH ACTUALLY WALKED** (`§1.4` item 2; `resolution.md §5.3`): `tried` collects the
// subjects a candidate was sought at, IN THE ORDER THEY WERE TRIED — rung one's RESOLVED NAME where rung
// one was attempted at all, and rung two's module-relative path. **THE SUBJECT IS ONE PATH WHERE ONE RUNG
// WAS TRIED AND BOTH PATHS WHERE BOTH WERE** (`resolution.md §2.2`), and an uncovered key's rung one is
// never attempted, so its subject is rung two's path ALONE.
let rungOneName = null;
let tried = [];
// **THE RUNG WHOSE LOAD STANDS, WHERE ONE DID** (`§1.5` item 3: the version read applies at rung one
// alone, so the rung is remembered rather than inferred from a path's spelling).
let loadedFrom = null;

/// **THE RUNG-ONE CANDIDATE FOR THIS RUNTIME, COMPUTED ONCE FROM THE CLOSED TABLE** (`C-1`): the pair's
/// own declared name, or `NOT COVERED` — and `NOT COVERED` means rung one is NOT ATTEMPTED, so no name is
/// computed for it and no speculative fallback exists (`§1.3` item 3).
function rungOneCandidate() {
  if (rungOneName === null) rungOneName = platformNameForRuntime();
  return rungOneName;
}

// ---------------------------------------------------------------------------------------------
// **THE RUNG WALK** (`§1.1` items 1–2; `resolution.md §2.1`): RUNG ONE first — a covered key's one declared
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
      // **`§1.5` item 1 — THE VERSION READ, AT RUNG ONE AND NOWHERE ELSE** (`PUB-DD-18`): the addon's own
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
        // **THE MISMATCH ARM — THE SINGLE DECLARED FAILURE ARM** (`§1.5` item 2; `PUB-DD-17`): the subject
        // is RUNG ONE'S OWN PATH, and **NO FALLBACK TO RUNG TWO exists** — the load path stops here, loads
        // nothing from the substituted artefact and returns no instance.
        //
        // **⟶ AND `PUB-R-3`: THE ARM IS MADE TERMINAL BY CONSTRUCTION RATHER THAN BY THE `if`'S SHAPE.**
        // The walk RETURNS at the arm, so rung two's `require` below is not reached on the evaluation that
        // meets the mismatch; **and what keeps a LATER evaluation at the arm is the ARM ITSELF, held in
        // `addonArm` and read by this walk's own entry test** — never a second failure instance beside it.
        // **THE SHIPPED STATE WAS `addonLoadError = new Error('addon-version-mismatch')`, and it was a shape
        // `§1.4` item 1 does not admit: an `Error` minted here for a state whose declared answer is the one
        // form. THAT ASSIGNMENT IS REMOVED** (the `addonLoadError` slot is left to the load path's own
        // cause, rung two's throw) **and its whole duty — halting the walk before rung two — is taken by
        // the declared arm.** **A state in which a caught mismatch could then fall through to
        // `require_(ADDON_PATH)` and load the checkout's own artefact no longer exists at any call.**
        //
        // **AND THE `message` IS THE LOADED ARTEFACT'S OWN GENERATOR'S, NOT THIS FILE'S** (`§1.4` item 6,
        // arm (a); `PUB-DD-25`; `P-PUB-4`'s failure list's last member): the artefact that loaded and
        // answered `version` is the artefact that carries the store's generator, so the string is reached
        // through ITS `errorMessage` at the subject `§1.5` item 2 fixes. **`mismatchArmMessage` below names
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

/// **THE SUBJECT OF THE DECLARED ABSENT FORM** (`§1.4` item 2; `resolution.md §5.3` item 2): the artefact
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
/// HAND-AUTHORED MESSAGE** (`§2.5` item 2): it is the generator's clause, subject slot included, rendered
/// byte-for-byte — see the derivation above this block.
function generatorFilePathUnreachable(subject) {
  return `'${subject}' is not reachable at construction, the path must exist or the application must be able to write it`;
}

/// **THE MISMATCH ARM'S `message`, AND ITS ONE DECLARED FALLBACK** (`§1.4` item 6; `PUB-DD-25`).
/// **ARM (a) FIRST: THE LOADED ARTEFACT'S OWN GENERATOR AUTHORS THE STRING**, reached through the artefact's
/// `errorMessage` — the artefact that loaded and answered `version` is the artefact that carries the
/// generator — at the subject `§1.5` item 2 fixes, RUNG ONE'S OWN PATH. **WHERE THAT ARTEFACT CARRIES NO
/// `errorMessage`, OR ITS OWN GENERATOR THROWS, OR IT ANSWERS A VALUE THAT IS NOT A `string`, THE GENERATOR
/// IS UNREACHABLE AND ARM (b) ANSWERS: THE STORE'S OWN CLAUSE, REPRODUCED BYTE-FOR-BYTE AT THAT SAME
/// SUBJECT.** Arm (b) is the ONE arm `§1.4` item 6 declares for a state in which no generator can be
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
/// at the subject `absentSubject()` fixes (`§1.4` items 1–2). **WHERE AN ARTEFACT LOADED FAR ENOUGH TO
/// CARRY THE GENERATOR, THE GENERATOR AUTHORS THE STRING** (`A75`: *"reached through the addon where it
/// loaded far enough to carry the generator"*) — `addon.errorMessage` at each subject in turn.
/// **WHERE THE GENERATOR IS UNREACHABLE — which is exactly this state, since the artefact that carries it
/// is the thing that failed to load — THE STRING IS THE GENERATOR'S OWN RENDERING OF THAT SUBJECT,
/// REPRODUCED BYTE-FOR-BYTE** (`JS-3`'s fix) and **NOT hand-authored** (`§2.5` item 2).
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
/// `{status, message}` and nothing else. **The status and the message are the store's own and are carried
/// VERBATIM** (`§2.5` items 1–2, `DD-40`): this function constructs the two-member form out of the refusal
/// the addon threw and mints no code of its own, authors no message of its own and adds no third member.
function fail(refusal) {
  throw { status: refusal.status, message: refusal.message };
}

function withAddon() {
  loadAddon();
  // **THE MISMATCH ARM STANDS FIRST, AND IT IS THE ARM THE LOAD PATH ITSELF ANSWERED WITH** (`§1.5` item 2;
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
/// (`§2.5` item 2) — and the clause the ruling requires beside it is the CLASS that failed, plus the
/// POSITION where the carrier declares one. **THE STATUS IS NEVER MINTED** (`DD-40`): it is the member of
/// the store's closed set that the crossing's own table declares for the row the class falls under, and it
/// is passed as an argument at each site rather than chosen here.
/// **AND NO SECOND FORM EXISTS** (`A76`'s reach, verbatim: *"it does NOT license a SECOND failure form"*):
/// the rejection travels inside the one `{status, message}` and never as a raw host error — **which is why
/// NOTHING on this path coerces the value: no `Number(...)`, no `String(...)`, no `valueOf`, no
/// `Symbol.toPrimitive` and no trap is ever invoked, so no host `TypeError` can be raised from this frame
/// in the first place.**
function boundaryReject(status, subject, clause) {
  const addon_ = withAddon();
  if (typeof addon_.errorMessage !== 'function') {
    // An artefact that LOADED but does not carry the generator is not the declared artefact: the state is
    // the declared absent/failed-addon one, and its message is the generator's own rendering reproduced.
    fail({ status: 'FilePathUnreachable', message: generatorFilePathUnreachable(ADDON_PATH) });
  }
  fail({ status, message: `${addon_.errorMessage(status, subject)}, ${clause}` });
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

/// **A PLAIN OBJECT**, in the sense `§2.1` takes `cfg` and `§1.3`'s `ListenersArg` row 2 takes an entry:
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

/// `crossing.md §1.3`'s `AddressArg` table, rows 1–14.
///
/// **⟶ AND ONE OPTIONAL PARAMETER, ADDED 2026-10-11 BY THE `Q3` PASS, SO `on` CAN OBEY `A81` WITHOUT A
/// SECOND REFUSAL FORM AND WITHOUT A SECOND ENCODER.** `addressArgumentPosition` is the ARGUMENT POSITION
/// `parameter-semantics.md §2.17`'s dated clause declares at a site that declares one — `on`'s `address` is
/// `1` of `2` — and it is threaded into the SEGMENT arm alone, which is the one arm of this table that
/// refuses at the BOUNDARY rather than carrying its class to the store. **EVERY OTHER CALLER PASSES
/// NOTHING AND EVERY BYTE OF EVERY OTHER ARM IS UNMOVED**, so no verb's answer and no other site's message
/// changes: the parameter is additive and its absence is the as-filed reading.
function encodeAddress(address, addressArgumentPosition) {
  // `crossing.md §1.3`'s absent-versus-`undefined` rule, rule 1: an argument position the call supplied no
  // value for is ABSENT, and `undefined` at a supplied position folds to that SAME state. `AddressArg` rows
  // 4 and 5 answer the one code, so no declared answer moves by the fold.
  if (address === undefined) return { k: 'A' };
  if (address === null) return { k: 'N' };
  // **`A76`/`JS-2`: THE CLASS DECISION COMES FIRST HERE TOO, ON THE ADDRESS AS IT IS.** A `Proxy` is
  // refused BEFORE the array shape test and before any element is read (row 12, `DD-34`), and a class
  // extending `Array` — for which `Array.isArray` is TRUE — is refused under its own declared class
  // (`AddressArg` row 11's `AddressMalformed`: *"the shape is not an array"*) rather than ADMITTED as an
  // address because a language predicate made it look like one.
  if (types.isProxy(address)) return { k: 'X' }; // row 12 (`DD-34`)
  if (Array.isArray(address)) {
    if (arrayClass(address) === 'class') return { k: 'C' }; // row 11: a class extending `Array`
    for (let i = 0; i < address.length; i += 1) {
      if (!(i in address)) return { k: 'S' }; // row 14 (`DD-8`)
    }
    return {
      k: 'L',
      s: address.map((segment, position) => encodeSegment(segment, position, addressArgumentPosition)),
    }; // rows 1–3, 13
  }
  if (typeof address === 'object') return { k: 'C' }; // rows 6 and 11: the shape is not an array's
  return { k: 'D', o: encodeSegment(address, 0) }; // row 6: a non-array's five named classes
}

/// `crossing.md §1.3`'s `TierArg` table and `TierSetItem` table.
///
/// **THE TWO READERS AND THE TWO WRITERS ARE READ DIFFERENTLY, AND `§1.3` SAYS SO:** rule 1 reads a VERB's
/// trailing argument BY CALL ARITY and folds a supplied `undefined` to the ABSENT row **for `read` ·
/// `readLiteral` and `write`** — which is why `read(i, a, undefined)` answers the value while `read(i, a,
/// null)` answers row 4 — **while `delete`'s `tier` is reached as a VALUE, and its own `null`/`undefined`
/// row is row 4's `AddressMalformed`.**
///
/// **AND `A76`'S CLASS ORDER IS TAKEN HERE FIRST (`JS-2`'s reach at this carrier):** a `Proxy` is refused
/// as an OBJECT before any element is read from it — **so a throwing `get` trap cannot be raised, because
/// nothing reads the proxy** — and a class extending `Array` is refused as an OBJECT (`TierArg` row 6's
/// `OutOfDomainTier`) rather than admitted as the array spelling row 2 declares for the readers.
function encodeTier(tier, supplied, foldsUndefined) {
  if (!supplied) return { k: 'A' };
  if (tier === undefined) return foldsUndefined ? { k: 'A' } : { k: 'U' };
  if (tier === null) return { k: 'N' };
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
/// a RAW HOST `TypeError` out of this frame (outside `§2.5`'s one form), an object with a throwing
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

/// `crossing.md §1.3`'s `ListenerHandle` row 2 and `JsHandleArg`: **the OPAQUE form alone is the site's**,
/// and every outside spelling is carried as its own variant.
function encodeHandle(state, handle) {
  for (const [candidate, token] of state.tokens) {
    if (candidate === handle) return { k: 'O', v: token };
  }
  return typeof handle === 'string' ? { k: 'B', v: handle } : { k: 'X' };
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

/// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth. **Each key's
/// own ABSENCE is the member's own absence** — `crossing.md §1.3`'s absent-versus-`undefined` rule reads a
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
      'AddressMalformed', // `PAR-JS-1`'s declared answer for every outside form of `cfg`, carried
      'cfg',
      `the construction's cfg is ${classSpelling(cfg)}, and cfg is one plain object carrying the store's three declared keys`,
    );
  }
  const out = {};
  if (Object.hasOwn(cfg, 'filePath')) out.filePath = encodeFilePath(cfg.filePath);
  if (Object.hasOwn(cfg, 'journalLength')) out.journalLength = encodeJournalLength(cfg.journalLength);
  if (Object.hasOwn(cfg, 'listeners')) out.listeners = encodeListeners(cfg.listeners);
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
// THE PACKAGE'S OWN SURFACE — the opaque handle (`§2.3` item 2) and the per-instance registry (`§2.4`)
// ---------------------------------------------------------------------------------------------
/// **THE PACKAGE'S OWN INSTANCE HANDLE'S STATE**, keyed by the instance the factory returned. The handle
/// itself carries EXACTLY ONE member, `register` (`surface.md §2.4` item 5 (a)).
const INSTANCES = new WeakMap(); // instance -> {id, tokens: Map(handle -> token)}

function wrapHandles(state, tokens) {
  const out = [];
  for (const token of tokens) {
    let handle = null;
    for (const [candidate, held] of state.tokens) {
      if (held === token) {
        handle = candidate;
        break;
      }
    }
    if (handle === null) {
      handle = Object.freeze({}); // **THE OPAQUE HANDLE**: frozen, memberless, and its token is PRIVATE
      state.tokens.set(handle, token);
    }
    // **THE STORE'S OWN LIST IS CARRIED OUT ELEMENT FOR ELEMENT, AND THE BOUNDARY EDITS NOTHING**
    // (`surface.md` §2.4's dated clause of 2026-10-11, whose twin stands at `contract.md` §2.4: *"`triggered`
    // crosses as a fresh JS array of the handles the store's own list carries … so in CASE B THE
    // JS-OBSERVABLE `triggered` CARRIES THE TOKEN TWICE"*). **ONE element is pushed per entry the store
    // returned, in the store's own order — an order NO clause asserts and none is claimed here** — so a
    // lawful caller-spelled duplicate yields THE SAME identity TWICE (`DD-42`'s clause 3; `DD-39`; `PAR-JS-15`;
    // `crossing.md §1.3`'s returned-record rows; `§2.7` items 1 and 3).
    //
    // **⟶ AND THE COLLAPSE THIS SITE SHIPPED UNTIL 2026-10-11, RE-EMITTED SO THE `git diff` READER MEETS BOTH
    // READINGS INSTEAD OF A DELETED BYTE** — rule 3 read as a rule about the ARRAY rather than about the
    // COUNT: *"`§2.4` rule 3: one DISTINCT handle per token, however many home entries carry it — "the
    // registry fires one invocation per DISTINCT handle — not one per occurrence, and not one per entry""* —
    // `if (!out.includes(handle)) out.push(handle);`. **THE SENTENCE QUOTED THERE IS THE INVOCATION RULE AND
    // IT IS RIGHT; IT IS NOT MOVED, IT IS RELOCATED TO THE ONE SITE THAT OWNS IT.** The invocation count is
    // the PACKAGE's and it is one per DISTINCT identity; the array's multiplicity is the STORE's, and the
    // per-identity deduplication now stands at DELIVERY, in `deliver` below, where §2.4's dated clause (i)
    // puts it (*"so in CASE B the duplicate token's ONE function runs ONCE"*).
    out.push(handle);
  }
  return out;
}

/// **THE STATE A VERB'S FIRST ARGUMENT NAMES** (`surface.md §2.2`'s signatures: every verb takes the
/// package's own instance handle first).
///
/// **⟶ AND THE REFUSAL FOR A VALUE OUTSIDE THAT POSITION'S DOMAIN IS SHIPPED IN THE ONE FORM** — `§2.5`
/// item 5 (e), verbatim: *"a rejection is NEVER A RAW HOST ERROR — a `TypeError`, a `RangeError`, … or any
/// host object escaping from the boundary's own frame is a FINDING at whatever site produced it, not a
/// rejection"*, and `§2.4` item 5 (e): *"a `TypeError` thrown by a VERB remains a FINDING"*. The shipped arm
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

function call(state, verb, args) {
  const addon_ = withAddon();
  try {
    return addon_.call(state.id, verb, args);
  } catch (refusal) {
    fail(refusal);
  }
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
// (`A63`), no `exists` verb exists (`§2.9` item 3) and no release verb is declared (`A74`).
// ---------------------------------------------------------------------------------------------

/// `§2.1`: `storeCreate(cfg)` takes ONE plain object carrying the store's THREE declared keys, passes them
/// through WITHOUT adding a default, a rename or a fourth key (`DD-36`), and **never returns a partial
/// instance** — it throws the single failure form instead. **⟶ `§2.1`'s dated clause (a), LANDED 2026-10-11
/// BY THE `Q1` CONTRACT AMENDMENT, RE-DERIVES THE MEMBER FIGURE THIS SENTENCE CARRIED: *"the object it
/// returns carries EXACTLY the one own member `surface.md §2.4` item 5 (a) declares, and not one member
/// beside it"* STANDS BYTE-FOR-BYTE ABOVE AND IS READ THROUGH THIS CLAUSE — from this date the member set
/// is `{ register, on, off }`, THREE OWN MEMBERS AND NOTHING ELSE, and `§2.4` item 5 (a)'s *"one own
/// member"* is superseded AS A MEMBER-SET FIGURE at its own `§` by the same amendment.** **THE MODULE
/// NAMESPACE IS UNMOVED at the eight declared verbs: neither new member is a named export, because both
/// are reached through THIS factory's own product and through nothing else** (`surface.md §2.1`'s dated
/// clauses (a)–(b); `A79`).
export function storeCreate(cfg) {
  const addon_ = withAddon();
  let id;
  try {
    id = addon_.storeCreate(encodeConfig(cfg));
  } catch (refusal) {
    fail(refusal);
  }
  // **ONE HANDLE PER TOKEN PER INSTANCE**: the map is read in BOTH directions, so a token the store
  // returns twice (a lawful duplicate, `§2.4` rule 3) reaches the caller as the SAME opaque value.
  // **THE PACKAGE'S OWN REGISTRY, ONE PER INSTANCE** (`surface.md §2.4`): the opaque handle -> the
  // caller's FUNCTION. **`unlisten` withdraws the store-side home entry and NEVER the function** (`§2.4`
  // rule 4, `DD-15`), so `unlisten` removes no entry, and a re-registration of a handle REPLACES its entry
  // (rule 2, never a fan-out). **⟶ AND `off` — the ONE declared member that DOES remove an entry —
  // removes THE ONE THE HANDLE NAMES** (`§2.4` item 7 (b); `DD-53`), while the instance's own state is
  // still released with the instance and by nothing else (`DD-17`; `A74`: `off` is not a release verb).
  const state = { id, tokens: new Map(), registry: new Map() };
  const instance = {
    /// `surface.md §2.4` item 7 (a) / `§2.1`'s dated clause (a): **`on(address, listener) -> handle`** — the
    /// combined call `A79` adopts, whose clauses are `§2.4` item 7 (a) and whose order is FIXED there.
    /// **IT IS NOT A NINTH NAMED EXPORT OF THE ENTRY** (`package.md §1.3` item 3): it is reached through the
    /// factory's own product alone.
    on(address, listener) {
      return onAt(state, instance, address, listener);
    },
    /// `surface.md §2.4` item 7 (b) / `§2.1`'s dated clause (a): **`off(handle) -> undefined`** — the
    /// store-side withdrawal AND the PACKAGE'S OWN registry removal, on the one order `DD-54` declares.
    /// **It is NOT a ninth named export of the entry** (`package.md §1.3` item 3).
    off(handle) {
      return offAt(state, instance, handle);
    },
    /// `surface.md §2.4` item 5 (b): `register(handle, listener) -> undefined` — the OPAQUE handle a verb
    /// returned or the construction adopted, and ANY JS function. **It is NOT a ninth named export of the
    /// entry** (`package.md §1.3` item 3): it is reached through the factory's own product alone.
    register(handle, listener) {
      return registerOn(state, handle, listener);
    },
  };
  INSTANCES.set(instance, state);
  return instance;
}

/** `§2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register. */
export function read(instance, address, tier) {
  const state = stateOf(instance);
  // A position the call supplied no value for is handed as the runtime's own `undefined` — NEVER as an
  // absent array slot — so the facade can tell an unsupplied position from a supplied `undefined` and the
  // core is never reached with a null pointer (`crossing.md §1.3`'s absent-versus-`undefined` rule).
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  return decodeValue(call(state, 'read', args));
}

/** `§2.2` / `§2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`. */
export function readLiteral(instance, address, tier) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  return decodeValue(call(state, 'readLiteral', args));
}

/// `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, never a view.
export function write(instance, address, tier, value) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  // THE WALK'S OWN FAULT RECORD — see `refusedValue`: the walk CLASSIFIES and RECORDS, and the record is
  // read at the one site where the store answered `ValueNotAdmitted` for a value the walk refused.
  const fault = { found: null, value: undefined, path: [] };
  args.push(encodeValue(value, [], 0, [], fault));
  const answer = writeCall(state, args, fault);
  const record = {
    op: decodeJournalOp(answer.op),
    watched: answer.watched.map(decodeSegments),
    triggered: wrapHandles(state, answer.triggered),
  };
  // **THE INVOCATION WINDOW** (`§2.7` item 2, `DD-22`): the record above is COMPLETE before the window
  // opens, the invocation is SYNCHRONOUS, it happens AFTER the addon's call returned, and **its ONE
  // argument is the TRIGGERING ADDRESS** (`PAR-JS-12`).
  deliver(state, record.triggered, answer.triggeringAddress);
  return record;
}

/// **THE PACKAGE'S OWN INVOCATION LOOP** (`surface.md §2.4`: *"the invocation is the packages's"*; `A57`:
/// *"the store returns handles and invokes nothing"*). One invocation per DISTINCT handle the addon's
/// record carries, at the address the record carries beside it — **and a THROWING BODY IS NOT CAUGHT, NOT
/// RETRIED AND NOT REPORTED** (`§2.7` item 4, `DD-23`): its own exception propagates out of this loop, and
/// the store's result stands complete and unmoved behind it.
///
/// **⟶ AND THIS IS `A77`'S ID-MATCHING MODEL, SHIPPED EXACTLY AS THE RULING STATES IT** (verbatim: *"the
/// store passes an ID back to the client when a listener is triggered, and the JS side matches that ID to
/// the function the caller registered it with"*, with `A57`'s *"a handle that it returns to alert the
/// client of the trigger"*):
///
/// * **THE ID IS THE `triggered` MEMBER'S OWN ELEMENT — the OPAQUE HANDLE the caller RECEIVED, one
///   identity, and the KEY of the package's own registry** (`§2.4`: *"the package owns a PER-INSTANCE
///   REGISTRY keyed by the opaque handle it returned"*). `triggered` carries `wrapHandles`' list, and
///   `wrapHandles` returns THE SAME opaque value for a token it has already wrapped (`state.tokens` is read
///   in both directions), so the identity that arrives here is the very identity `register` was handed at
///   registration — **the matching is by THAT identity alone, and NO ORDER is asserted** (`§2.7` item 3,
///   `DD-22`: a drive compares sets, never sequences).
/// * **AN ID THE REGISTRY HOLDS NO FUNCTION FOR FIRES NOTHING — SILENTLY.** The `typeof listener ===
///   'function'` test below is the whole of the arm: no invocation, no code, no warning, no log and no
///   throw, which is `§2.4` rule 1 read together with `A77`'s consequence (1) — **and the SILENCE IS THE
///   DECLARED OBSERVABLE, not an assumption** (`JS-11`'s drive asserts the absence of an invocation, of a
///   log and of a throw). Note that the arm is reached for a handle the store returned with no registration
///   AND for a handle the registry once held a non-function for: `register` refuses a non-function at its
///   own site (`§2.4` item 5 (d)), so the only way an entry can be non-functional is to be absent.
/// * **A DUPLICATE ID IN ONE TRIGGER SET MATCHES ONE FUNCTION — AND THAT DEDUPLICATION STANDS HERE, AT
///   DELIVERY, BECAUSE THE ARRAY IS THE STORE'S.** `wrapHandles` now carries the store's list ELEMENT FOR
///   ELEMENT, so a lawful caller-spelled duplicate arrives in this loop TWICE and the loop below invokes ONE
///   registered function per DISTINCT identity of that array — **never one per element and never one per
///   entry** (`§2.4` rule 3; `surface.md §2.4`'s dated clause (i): *"so in CASE B the duplicate token's ONE
///   function runs ONCE"*). **THE CLAUSE'S OWN SENTENCE *"the shipped `deliver` iterates whatever the array
///   carries and the registry holds AT MOST ONE function per identity, so ONE identity invokes ONE function
///   ONCE under BOTH readings"* HOLDS OF THIS LOOP, AND OF THIS LOOP ALONE** — it holds because the loop
///   iterates the array's DISTINCT IDENTITIES and not its elements.
///   **AND THE AS-FILED READING, RE-EMITTED BECAUSE THE `git diff` READER MEETS IT FIRST** — *"A DUPLICATE ID
///   IN ONE TRIGGER SET MATCHES ONE FUNCTION: `wrapHandles` de-duplicates the returned list by identity
///   (`§2.4` rule 3, "once per DISTINCT handle"), so the loop runs once per distinct id."* — **placed that
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
  // NOT — **and which of the two happened depended on the HOME `HashMap`'s iteration order, which `§2.7`
  // item 3 / `DD-22` declare UNOBSERVABLE** (the contradiction the `A78`/`CF-DUP-3` argument refused, and a
  // per-process flake for any drive that took it). **THE FIX IS THE DECLARED RULE SHIPPED AS AN ORDER: the
  // identity→function map is built for the DISTINCT identities of THIS trigger set BEFORE the first
  // invocation, and the loop invokes from that snapshot alone** — so **a registration, a replacement or a
  // withdrawal made during the window TAKES EFFECT AT THE NEXT TRIGGER, and at no element of this one**
  // (`CF-DUP-3`; `off`'s own arm at `offAt` — *"`off` DOES NOT CANCEL A DELIVERY IN FLIGHT"* — is the same
  // sentence read from the withdrawal's side). **THE SNAPSHOT HOLDS THE FUNCTION THE REGISTRY HELD AT THE
  // OPENING**: an identity with no registered function snapshots `undefined` and fires NOTHING SILENTLY
  // (`§2.4` rule 1), and a function REPLACED from inside a body does not stand in for the one snapshotted.
  //
  // **ONE INVOCATION PER DISTINCT IDENTITY** (`§2.4` rule 3 and its dated clause (i); `§2.4` item 6 (b)–(e)):
  // the array is the STORE's and a lawful caller-spelled duplicate makes ONE identity stand in it TWICE, so
  // what is matched is the array's identity SET — each DISTINCT identity ONCE, at its first occurrence and
  // never a second time. **NO ORDER IS ASSERTED BY THIS LOOP OR BY ANY CLAUSE IT ANSWERS TO** (`§2.7` item 3;
  // `DD-22`: a drive compares sets, never sequences), and an identity the registry holds no function for
  // still fires nothing at every one of its occurrences.
  const matched = new Set();
  const recipients = [];
  for (const handle of triggered) {
    if (matched.has(handle)) continue; // ONE invocation per DISTINCT identity — never one per element
    matched.add(handle);
    recipients.push([handle, state.registry.get(handle)]); // THE ID→FUNCTION MATCH, BY THE IDENTITY REGISTRATION RETURNED
  }
  for (const [handle, listener] of recipients) {
    // `§2.4` rule 1: a handle with NO registered function invokes nothing and reports nothing — no code,
    // no warning, no log.
    if (typeof listener === 'function') {
      // `crossing.md §1.1` clause 2's deep copy OUT, at the invocation: **each invocation is handed a FRESH
      // dense address array** (`JS-19`), so one listener's mutation of its own argument cannot be observed
      // by the next — no shared object crosses into the caller's own functions.
      listener(decodeSegments(address));
    }
  }
}

/// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM, `tiers` in the store's canonical order,
/// and the in-domain no-op arm a SUCCESS returning `tiers: []`. **Its declared NAME is `delete`, and it is
/// published under that name ALONE** (`package.md §1.3` item 3): `deleteOp` is a reserved-word workaround
/// for the declaration and never a member of the package's namespace.
function deleteOp(instance, address, tier) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  // `delete`'s tier is read as a VALUE and not by an arity fold: an ABSENT position is the whole-target
  // removal, and a supplied `undefined` answers row 4's `AddressMalformed` (`crossing.md §1.3`).
  args.push(encodeTier(tier, arguments.length >= 3, false));
  const answer = call(state, 'delete', args);
  const receipt = {
    address: decodeSegments(answer.address),
    tiers: answer.tiers,
    triggered: wrapHandles(state, answer.triggered),
  };
  // `A43`: a delete FIRES its own triggered set, on the same window as a write (`§2.7` item 2).
  deliver(state, receipt.triggered, answer.triggeringAddress);
  return receipt;
}

/// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`§2.6`).
export function rollback(instance, opId) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeOpId(opId)] : [];
  const answer = call(state, 'rollback', args);
  return {
    opId: answer.opId,
    undoneOps: answer.undoneOps,
    restoredTo: decodeBaseState(answer.restoredTo),
  };
}

/// `§2.10`: `listen` mints a token, populates the store's home and wraps it for JS — and its `address` is
/// `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
export function listen(instance, address) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  return wrapHandles(state, [call(state, 'listen', args)])[0];
}

/// `§2.3` item 4 / `PAR-JS-8`: **`unlisten` over ANY value outside the domain is a NO-OP SUCCESS** — a
/// foreign instance's value, a prior session's value, a fabricated value, a blank token, a non-opaque value
/// and an absent handle are EACH a no-op success, no code is produced, and NO OTHER REGISTRATION IS REMOVED.
/// **The package's own registry entry STANDS** (`§2.4` rule 4, `DD-15`): only the store-side home entry is
/// withdrawn, so a withdrawn handle's function simply never fires again.
export function unlisten(instance, handle) {
  const state = stateOf(instance);
  if (arguments.length < 2) return undefined;
  const encoded = encodeHandle(state, handle);
  if (encoded.k !== 'O') return undefined; // outside the domain: a no-op success, and the store is not reached
  call(state, 'unlisten', [encoded]);
  // **The package's registry entry STANDS** (`§2.4` rule 4, `DD-15`): only the store-side home entry is
  // withdrawn, so the withdrawn handle's function simply never fires again, and a later re-`listen` at the
  // same address mints a DIFFERENT handle whose registration is a NEW entry.
  return undefined;
}

/// **THE REGISTRY'S OWN SITE AT THE PACKAGE'S BOUNDARY** (`surface.md §2.4` item 5): the caller's FUNCTION
/// for a handle, held by the package (`DD-15`) and invoked after the verb has returned (`§2.7` item 2).
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
  // §2.5 item 5 (b): the ARGUMENT POSITION is the reason's conditional half, and it is named at each arm.
  if (typeof listener !== 'function') {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(listener),
      `register's second argument is ${classSpelling(listener)}, and a registration's listener is a JS function`,
    );
  }
  const encoded = encodeHandle(state, handle);
  if (encoded.k !== 'O') {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(handle),
      `register's first argument is ${classSpelling(handle)}, and a registration's handle is an opaque value THIS INSTANCE minted or adopted`,
    );
  }
  const addon_ = withAddon();
  try {
    addon_.register(state.id, encoded);
  } catch (refusal) {
    // The addon's own refusal — the store's own code and its own generated message, carried VERBATIM.
    fail(refusal);
  }
  // `§2.4` rule 2: ONE handle, ONE function — the previous entry is REPLACED and dropped without notice.
  state.registry.set(handle, listener);
  return undefined;
}

// ---------------------------------------------------------------------------------------------
// THE TWO NEW INSTANCE MEMBERS — `surface.md §2.4` ITEM 7, READ AT ITS OWN BYTES, AND `§2.1`'s DATED
// CLAUSE (a): `on(address, listener) -> handle` AND `off(handle) -> undefined`, BESIDE `register`.
//
// **BOTH ARE DELIVERY-SIDE ONLY AND NEITHER IS A RELEASE VERB** (`§2.4` item 7 (c); `A78`; `A74`): neither
// STATES, ALTERS OR PROMISES ANY FIRING RULE — which listener fires, when it fires, what it is bound to,
// which ids a trigger returns, the home's registration semantics, the address-prefix rule and the
// process-scoped handle are ALL STORE BEHAVIOUR, **and the authority for each of them stands at
// `docs/specs/storeroom-native/write-and-read.md §6.5` item 14**, where a drive derives them. `on`
// PERFORMING the store's `listen` and `off` PERFORMING the store's `unlisten` is a DELIVERY-SIDE ACTION
// upon the store's own verbs and never a statement about what the store's home does when it lands.
// **NO FIRING RULE IS STATED BY THIS PACKAGE** — the invocation COUNT and the ONE invocation argument are,
// and they are `§2.4` rule 3 and item 6, unmoved.
//
// **AND NOTHING OF THE STORE MOVES:** the two members are built over `listen` and `unlisten` EXACTLY as
// `§2.10` declares them — same names, same positions, same arity, same returns, and the store's own crate
// and contract directory untouched (`§2.1`'s dated clause (c); `A68`).
// ---------------------------------------------------------------------------------------------

/// **THE ARGUMENT POSITION, AT THESE TWO SITES** — `parameter-semantics.md §2.17`'s dated clause: *"the
/// POSITION IS CARRIED BESIDE IT AS THE ARGUMENT POSITION: `1` OF `2` for an `address` or a `handle`, `2` OF
/// `2` for a `listener`"*, inside `docs/specs/storeroom-js/surface.md §2.5` item 5 (b)'s generated message
/// and NEVER as a third member. **The spelling is the two positions' own, named as the `register` site
/// already names its pair** (`§2.12`'s re-derived row carries the same two positions).
const ARGUMENT_POSITION_FIRST = 'first argument';
const ARGUMENT_POSITION_SECOND = 'second argument';

/// **`crossing.md §1.3`'s `AddressArg` domain AT ITS OWN ROWS 7–10 AND 14, DECIDED AT THE BOUNDARY FOR `on`
/// ALONE — `A81`'s *"always validate"*, VERBATIM** (`parameter-semantics.md §2.17`'s dated clause: *"An
/// `address` outside `AddressArg`'s domain at `on`'s position `1` of `2` → `AddressMalformed`"*).
///
/// **WHY THIS WALK EXISTS, AND WHY IT IS NOT `DD-46`'s PRE-CHECK:** **`DD-46` is a declaration about the
/// DECLARED VERBS of `§2.2` and `§2.10`, whose arguments are passed through to the store's own carrier
/// so the STORE chooses which refusal answers** — and this walk is not taken on any of their paths.
/// **The listener home is the ONE store surface where that division fails: `listen` keeps the address's
/// segments as the caller spelled them, so an out-of-domain segment reaches the home's key without the
/// `L-1` walk ever running over it — measured, not assumed** (`bindings/js/test/convenience.test.mjs`'s
/// second cell drives the rows below through `on`). **`§2.4` item 7 (a) step 1 makes `on` the site that owns
/// this validation, so `on` decides the four rows the carrier cannot.**
///
/// **THE ROWS DECIDED, EACH NAMED AT ITS OWN `AddressArg` ROW** — row 7: an array holding a NEGATIVE
/// integer · row 8: an array holding a NON-INTEGER number (`1.5`, `NaN`, `Infinity`) · row 9: an array
/// holding `null`/`undefined` · row 10: an array holding an object (and, by the same clause's own reading of
/// `§1.2`'s classes, an array, a `function`, a `symbol` or a `bigint`) · row 14: a sparse array. **AND ROW
/// 6's SHAPE HALF IS DECIDED FIRST AND BESIDE THEM: a non-array IS `AddressMalformed`, and `'a.b'` is not a
/// delimited address** — `classSpelling` names each class the value HAS (`§1.8`'s no-repair prohibition: no
/// value here is converted, defaulted or substituted). **EACH REFUSAL IS THE ONE FORM, with the failing
/// TARGET printed as its own value, the CLASS that failed and the ARGUMENT POSITION** (`§2.5` items 5 (a)
/// and (b); `§2.17`'s dated clause) — **and NOTHING HERE IS A SECOND STATUS, A THIRD MEMBER OR A RAW HOST
/// ERROR.**
///
/// **AND NOTHING IS LEFT BEHIND:** this walk performs NO store call and NO registry write, so it runs at
/// step 1 and leaves no home entry, no registry entry, no node and no journal entry.
///
/// **⟶ AND THE PROXY DECISION IS TAKEN FIRST, IN `encodeAddress`'S OWN ORDER — `C-1` OF THE GATE-4
/// ADVERSARIAL PASS, THE STOP-GRADE FINDING, CLOSED AT THIS SITE (2026-10-11).** The walk's first statement
/// was `isAdmittedArray(address)`, which reads `Array.isArray` and then `arrayClass`'s
/// `Object.getPrototypeOf` — **so a trap-carrying `Proxy` over an array RAN ITS TRAPS BEFORE ANY DECISION
/// WAS TAKEN**: a `getPrototypeOf` trap that throws raised a RAW HOST ERROR out of `on` (against
/// `§2.5` item 5 (e): *"a rejection is NEVER A RAW HOST ERROR"*), a `get` trap's side effects ran, and a
/// re-entrant verb could be invoked from inside the walk — for an argument the contract refuses as
/// `AddressArg` row 12 (`DD-34`) without reading it at all. **`encodeAddress` at `:609` already took this
/// decision first, in its own words** (*"A `Proxy` is refused BEFORE the array shape test and before any
/// element is read"*), **and this function now does the same, in the same order, with the same refusal.**
/// **NO TRAP RUNS ON ANY PATH: the shape test, the prototype read that follows it, the `.length` read, every
/// element read and the listener-position check are each reached only for a value `types.isProxy` has
/// already answered about — and `util.types.isProxy` reads no member and invokes no handler.** The refusal
/// is `AddressArg` row 12's own `AddressMalformed`, carried and never minted (`DD-40`).
function validateOnAddress(address) {
  if (types.isProxy(address)) {
    // `AddressArg` row 12 (`DD-34`): the CLASS decision first, before the shape test and before any read —
    // the order `encodeAddress` takes at the same position.
    boundaryReject(
      'AddressMalformed',
      targetSpelling(address),
      `the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is ${classSpelling(address)}, and an address is an array of segments`,
    );
  }
  if (!isAdmittedArray(address)) {
    // `AddressArg` row 6 (a non-array, its five named classes), row 11 (a class extending `Array`), row 12
    // (a `Proxy`) and rows 4–5 (`undefined`/`null`, whose own class spelling is the target's).
    boundaryReject(
      'AddressMalformed', // `AddressArg` rows 4–6's own declared code, carried and never minted (`DD-40`)
      targetSpelling(address),
      `the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is ${classSpelling(address)}, and an address is an array of segments`,
    );
  }
  for (let i = 0; i < address.length; i += 1) {
    // Row 14 (`DD-8`): a HOLE refuses the WHOLE value — and `isAdmittedArray` has already decided the
    // CLASS, so `in` below reads an element of a genuine array and no chain.
    if (!(i in address)) {
      boundaryReject(
        'AddressMalformed',
        'an array with a hole',
        `the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is a sparse array, and an address is a dense array of segments`,
      );
    }
    const segment = address[i];
    // Rows 2–3: the two IN-DOMAIN classes — a string (the empty string included) and a non-negative
    // integer. **The integer test is taken on the value as it is and nothing is repaired**: `1.5`, `-1`,
    // `NaN` and `Infinity` are each refused as `a number`, which is the class the value HAS.
    //
    // **⟶ AND THE TWO CLASSES THIS PASS ADDED ARE DECIDED HERE TOO, BEFORE THE STORE IS REACHED — `C-4`'s
    // segment half and `C-12` (`2026-10-11`).** They are the same two decisions `encodeSegment` takes for
    // the other verbs' addresses, taken at this site's own position and with this site's own ARGUMENT
    // POSITION spelling, **so `on` and `listen` answer one address the same way and neither reaches the
    // carrier with a value it cannot spell**: a LONE SURROGATE in a string segment (row 1's dated clause —
    // the class has no Rust spelling and is refused *"at the PACKAGE's own edge, BEFORE any verb is
    // called"*, never repaired), and an INTEGRAL segment above the `u64` the carrier's `Index` variant
    // carries (`package.md §4.5` item 2's `JsSegment` row) — **which the facade's `n as u64` used to
    // SATURATE, folding `2**64` and `1e30` onto one store address and one handle (`C-12`).**
    if (typeof segment === 'string') {
      if (hasLoneSurrogate(segment)) {
        boundaryReject(
          'ValueNotAdmitted', // row 1's dated clause's own answer, carried and never minted (`DD-40`)
          // **THE TARGET IS THE SEGMENT POSITION'S OWN NAME AND NOT THE STRING**: a lone surrogate cannot
          // cross into the generator either — its bytes are not a `String` — so the failing TARGET is named
          // as `encodeSegment` names it at the same class (`'address'`), and the failing segment is named by
          // its INDEX beside it. **The class half is mandatory and it is carried; the failing VALUE is not
          // printed, because the only spellings for it are the caller's own unrepresentable code unit or a
          // REPAIR of it, and `§1.8` forbids the repair.**
          'address',
          `the segment at index ${i} of the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is a string carrying a lone surrogate, and a segment is a string or a non-negative integer`,
        );
      }
      continue;
    }
    if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0) {
      if (!Number.isSafeInteger(segment)) {
        boundaryReject(
          'AddressMalformed', // `AddressArg` row 8's own declared code, carried and never minted (`DD-40`)
          targetSpelling(segment),
          `the segment at index ${i} of the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is an integral segment above the carrier's own range, and a segment is a string or a non-negative integer a \`u64\` can carry exactly`,
        );
      }
      continue;
    }
    // Rows 7–10 + `§1.2`'s class set: every other class is refused AT THE BOUNDARY, inside the one form,
    // naming the failing SEGMENT — the target the item's own clause names — its class and the position.
    boundaryReject(
      'AddressMalformed',
      targetSpelling(segment),
      `the segment at index ${i} of the address at the ${ARGUMENT_POSITION_FIRST} of \`on\` is ${classSpelling(segment)}, and a segment is a string or a non-negative integer`,
    );
  }
  return undefined;
}

/// **`on`'s STEP 1, WHOLE: VALIDATE THE `address` THEN THE `listener`, CLASS FIRST AND NOTHING REPAIRED**
/// (`surface.md §2.4` item 7 (a); `A81` *"always validate"*, verbatim; `crossing.md §1.7`'s order — class,
/// then shape, then admit-or-refuse). **EACH REFUSAL IS `AddressMalformed` IN `§2.5`'s SINGLE FORM, carrying
/// the failing TARGET, the CLASS the value HAS and the ARGUMENT POSITION** (`§2.17`'s dated clause, whose
/// class set is EXHAUSTIVE AND CLOSED and whose two new arms are a non-function at `2` of `2` and an
/// `address` outside `AddressArg` at `1` of `2`).
///
/// **AND NOTHING IS LEFT BEHIND** (`§2.4` item 7 (a)): this function performs NO store call and no registry
/// write, so a refusal here leaves NO STORE-SIDE HOME ENTRY, NO REGISTRY ENTRY, NO NODE MINTED AND NO
/// JOURNAL ENTRY APPENDED — **atomicity by the validation's POSITION and not by a rollback.**
function validateOnArguments(address, listener) {
  validateOnAddress(address);
  if (typeof listener !== 'function') {
    boundaryReject(
      'AddressMalformed',
      targetSpelling(listener),
      `the listener at the ${ARGUMENT_POSITION_SECOND} of \`on\` is ${classSpelling(listener)}, and a listener is a JS function`,
    );
  }
}

/// **`on(address, listener) -> handle`** — `surface.md §2.4` item 7 (a), ITS THREE STEPS IN THEIR ONE FIXED
/// ORDER, AND NO FOURTH:
/// ```
///   1. VALIDATE   this file's own step, above: the address, then the listener, class first, never repaired
///   2. LISTEN     the store's own listen(instance, address)   — the SAME declared verb, unchanged
///   3. REGISTER   the package's registry takes the returned handle with this listener (rule 2 = replacement)
/// ```
/// **THE RETURN IS THE HANDLE** in `§2.3` item 2's ONE output spelling — the package's opaque value and
/// never the token string. **AND AT AN ADDRESS THE STORE'S HOME ALREADY HOLDS IT RETURNS THAT ADDRESS'S
/// EXISTING HANDLE**, because the store's own address-level idempotence makes a repeat `listen` mint
/// nothing and answer the entry's own handle (`write-and-read.md §6.5` item 12 (c); `§2.3`'s dated clause).
/// **THE TWO ARMS ARE THEREFORE THESE AND NO OTHERS:** the FRESH arm, where the store minted a token and
/// the package wrapped it, and the HELD arm, where the SAME opaque value is answered again and the
/// registry's function for it becomes THIS listener — **a REPLACEMENT, never a second entry and never a
/// fan-out** (`§2.4` rule 2), and **including over an entry `register` placed, which `DD-52` settles: the
/// registry does not record which member wrote an entry.** **SO A LATER WRITE UNDER THAT ADDRESS INVOKES
/// THIS FUNCTION ONCE AND THE REPLACED ONE NEVER FIRES AGAIN** — and *which* listener fires and *when* is
/// the STORE's rule, derived from `write-and-read.md §6.5` item 14 and never stated here.
function onAt(state, instance, address, listener) {
  // STEP 1 — VALIDATE. Nothing below runs unless BOTH arguments have passed (`A81`; `A76`).
  validateOnArguments(address, listener);
  // STEP 2 — LISTEN. The store's own verb, reached with the address the caller supplied and through this
  // package's ONE declared `listen` spelling (`§2.10`): same name, same position, same arity, same return.
  const handle = listen(instance, address);
  // STEP 3 — REGISTER. `§2.4` rule 2 at the registry that holds the function: ONE identity, ONE function.
  state.registry.set(handle, listener);
  return handle;
}

/// **`off(handle) -> undefined`** — `surface.md §2.4` item 7 (b), ITS THREE STEPS IN THEIR ONE FIXED ORDER,
/// AND `DD-54`'s ONE OBSERVABLE: **after any `off` that throws, BOTH the store-side entry and the registry
/// entry are exactly as they were.**
/// ```
///   1. VALIDATE    the handle against THIS INSTANCE's own handle domain, class first, never repaired
///   2. UNLISTEN    the store's own unlisten(instance, handle)   — the same declared verb, unchanged
///   3. DEREGISTER  the package's own registry entry for that identity, and NOTHING ELSE
/// ```
/// **AND ITS THREE ARMS, EACH WITH ITS OBSERVABLE** (item 7 (b)'s own table):
///   * **THE OWN ARM** — an in-domain identity the registry holds a function for: the store-side home entry
///     is withdrawn, the registry's entry for that identity is REMOVED, and `undefined` is returned.
///   * **THE OWN-ENTRYLESS ARM** — an in-domain identity the registry holds NO function for (registered
///     never, or already withdrawn): `undefined`, the store-side withdrawal IS performed, nothing is
///     removed that was not there and NO OTHER REGISTRATION IS DISTURBED (`DD-53`: `off`'s refusal arm is
///     the OUTSIDE-DOMAIN handle ALONE).
///   * **THE OUTSIDE ARM** — a foreign instance's value, a prior session's value, a fabricated value, a bare
///     `string`, a blank token, a non-opaque value, `null`, `undefined` or an ABSENT argument: **a REFUSAL**
///     — `AddressMalformed` in `§2.5`'s single form, with the failing target, the class and the position —
///     **and NEITHER removal is performed.** **THIS is the arm that makes `off` differ from `unlisten` over
///     one value, and the difference is DECLARED and not incidental** (`§2.3`'s dated clause 3; `§2.8`).
///
/// **`unlisten` ITSELF IS UNTOUCHED AND KEEPS RULE 4 VERBATIM**: it withdraws the registration and NEVER the
/// function, with the registry's entry STANDING. `off` is the PACKAGE-OWNED verb that removes one, and a
/// reader who takes it as an exception to rule 4 has read a second withdrawal into the store's surface —
/// there is none. **AND `off` REMOVES NO MORE THAN THE HANDLE NAMES**: a lawful sibling registration —
/// another address's entry, another identity in the same instance — STANDS. **AND NEITHER IT NOR `on` IS A
/// RELEASE VERB** (`A74`): no `dispose()`, no `close()`, no finalizer and no teardown is declared here, and
/// the instance's state is still released with the instance and by nothing else.
///
/// **AND `off` DOES NOT CANCEL A DELIVERY IN FLIGHT**, because the delivery's recipient set is read when the
/// window opens (item 7 (b); `§2.4`'s `CF-DUP-3` re-homing clause; `write-and-read.md §6.5` item 14).
function offAt(state, instance, handle) {
  // STEP 1 — VALIDATE. An outside value is refused HERE, and steps 2 and 3 never run (`DD-54`).
  const encoded = encodeHandle(state, handle);
  if (encoded.k !== 'O') {
    // The ONE form, with the failing TARGET printed as its own value (item 5 (a)), the CLASS the value HAS
    // (item 5 (b), mandatory) and the ARGUMENT POSITION (`§2.17`'s dated clause, `1` of `2`) — **and NOT
    // `unlisten`'s no-op `undefined`, which is that verb's own declared answer and not this one's.**
    boundaryReject(
      'AddressMalformed', // `§2.8`'s own declared code at this site, carried and never minted (`DD-40`)
      targetSpelling(handle),
      `the handle at the ${ARGUMENT_POSITION_FIRST} of \`off\` is ${classSpelling(handle)}, and it is not an opaque value THIS INSTANCE minted or adopted`,
    );
  }
  // STEP 2 — UNLISTEN. The store's own verb through the ONE declared `unlisten` spelling (`§2.10`), reached
  // with the handle this instance already owns. **A THROWING PATH LEAVES THE REGISTRY ENTRY STANDING**
  // (`DD-54`): there is no `finally` here and none may be added.
  unlisten(instance, handle);
  // STEP 3 — DEREGISTER, the PACKAGE'S OWN state and nothing of the store's.
  deregister(state, handle);
  return undefined;
}

/// **THE DEREGISTRATION OF ONE IDENTITY — `§2.4` item 7 (b)'s THIRD STEP.** The registry's entry for THIS
/// identity is removed, and NOTHING ELSE OF THE PACKAGE'S STATE: **the identity's own token-to-handle
/// binding STANDS**, because it is not the withdrawal's to move and three declared answers rest on it —
/// `register(h, …)` over a handle this instance adopted or minted is judged by the INSTANCE's own domain
/// (`§2.4` item 5 (c)) and not by which verbs have run since, `unlisten`'s OPAQUE-only acceptance is the
/// same domain (`§2.3` item 2), and `off`'s own ENTRY-LESS arm is declared over an identity that has
/// ALREADY been removed by an earlier `off` (`DD-53`). **AND NO LATER `listen` CAN BE HANDED THIS BINDING
/// BY ACCIDENT**, because the store MINTS A FRESH TOKEN after its home entry is withdrawn
/// (`write-and-read.md §6.5` item 12; `A69`'s uniqueness is over the tokens the store MINTS), so a re-`listen`
/// at the same address reaches `wrapHandles` with a token no map entry holds and is wrapped as a NEW
/// identity — which is exactly `§2.4` rule 4's *"a later re-`listen` … mints a DIFFERENT handle"*. **A drive
/// that finds the withdrawn identity's function reachable after one `off` has found a failure of this step
/// and not of this sentence.**
function deregister(state, handle) {
  state.registry.delete(handle);
}

// `delete` is a reserved word and the declared spelling is preserved on the way out.
export { deleteOp as delete };
