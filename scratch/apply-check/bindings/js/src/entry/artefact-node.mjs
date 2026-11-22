// **⟶ THE NODE-ONLY HALF OF `bindings/js/src/entry/artefact.mjs`, EXTRACTED 2026-11-17** (`D-156` item 1; the
// loader split's step 3, `docs/L3/wasm-realm/design.md` §5's `artefact.mjs` row: *"the three static `node:`
// imports — the module cannot even load without them"*, answered by *"fork by extraction"*). **EVERY BYTE BELOW IS
// THE BYTE IT WAS IN `artefact.mjs`**, whose own `D-2` provenance line still stands at its first line: the three
// `node:` imports, the module-context seam (`adoptModuleContext` and its three slots, `entryUrl` among them),
// `PLATFORM_NAMES` and both of its helpers, `packageVersion()`, the three-rung walk and its mismatch arm and its
// rung-one success site, the recorded attempt list, `absentSubject` and `generatorFilePathUnreachable`. **NOT ONE
// LOGIC BYTE MOVED.**
//
// **WHY THESE BYTES AND NOT OTHERS: THEY ARE THE ONES THAT CANNOT LOAD WITHOUT A HOST.** The three specifiers
// below are STATIC, so a realm that does not carry them cannot evaluate this module AT ALL — while `withAddon`,
// `boundaryReject`, `addonLoadMessage` and `spellDottedContainer` need no host byte and therefore stay where they
// stood, in `artefact.mjs`, which now carries no host specifier of its own and imports this half.
//
// **THE DIRECTION IS ONE WAY AND CLOSES NO CYCLE**: nothing of this file imports `artefact.mjs`. **AND THE NAMES
// THE CUT CROSSES ARE LIVE BINDINGS AND NEVER COPIES** — `addon` · `addonArm` · `ADDON_PATH` · `require_` ·
// `loadAddon` · `absentSubject` · `generatorFilePathUnreachable` are this module's own exported slots and
// functions, so `artefact.mjs`'s `withAddon` reads the very slot `loadAddon` writes, on the evaluation that writes
// it and on every later one: **its answer and `loadAddon`'s body are byte-identical where they now stand.**
//
// **AND `generatorFilePathUnreachable` MOVES WITH THE WALK RATHER THAN STAYING BESIDE THE FORM ITSELF**: its three
// readers are this file's own arm (b) in `mismatchArmMessage`, the absent form's rendering in `artefact.mjs`'s
// `addonLoadMessage` and `boundaryReject`'s absent-generator arm beside it — so leaving it behind would have made
// THIS file import `artefact.mjs` and closed the very two-module cycle the sentence above forbids.
//
// **⟶ AND THAT SENTENCE IS SUPERSEDED AT ITS SUBJECT FROM 2026-11-17, NOT AT ITS GROUND** (`D-156` item 1; the
// loader split's step 3). **THE GENERATOR STRING IS THE FORM'S AND HAS MOVED TO `src/entry/addon-slot.mjs`**, beside
// the two readers that are realm-neutral (`addonLoadMessage` and `boundaryReject` — **both of which left the old
// `artefact.mjs` for the slot on the same day**), and this file imports it from THERE: **the direction is still one
// way and the cycle the clause above forbids is still closed** — `addon-slot.mjs` imports nothing but `refusal.mjs`,
// so the edge runs this file → the slot and never back.
//
// **AND THE KERNEL'S LAZY REACH IS INSTALLED HERE, BESIDE THE ONE LOADER THAT CAN ANSWER IT** (`D-156` item 1;
// `design.md` §5's `constraints.mjs` row). `require_` is THIS half's — it is the HUB's own
// `createRequire(import.meta.url)`, adopted at the entry's evaluation — so `src/entry/kernel-loader.mjs`'s one slot
// is filled here with a thunk over it, and `constraints.mjs` asks the slot instead of importing this half. **THE
// BARREL IS STILL RESOLVED FROM THE HUB'S DIRECTORY AND STILL ONLY ON THE FIRST CONSTRAINT ACT** (`A121`, `A122`;
// `D-14`'s resolution base): the thunk runs nothing at load and resolves nothing until the part asks.
import { readFileSync } from 'node:fs';
import { dirname as dirOf, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appendOwn } from './refusal.mjs';
import { generatorFilePathUnreachable } from './addon-slot.mjs';
import { installKernelResolver } from './kernel-loader.mjs';

// **THE ONE INSTALLATION OF THE KERNEL'S REACH** — see the clause above. It sits at this module's own evaluation
// because the loader it closes over is this module's own live binding, and it performs no act: `require_` is read
// when `constraintsKernel()` first asks, and the barrel is not resolved here.
installKernelResolver(() => require_('./src/constraint-kernel.mjs'));

// **THE ENTRY'S OWN MODULE CONTEXT, HANDED IN AND NOT RE-DERIVED HERE** (`docs/L1/module-map.md` `I-29`):
// `require_`, `ADDON_PATH` and the manifest path are all derived from `index.mjs`'s own `import.meta.url`, because
// rung two must find the artefact beside the ENTRY and rung one's version read must find `package.json` beside it. A
// part deriving either from its own URL would search `src/entry/` for both. `adoptModuleContext` is called once, by the
// entry, at its own evaluation; every reader below sits inside a function body and reads the adopted value.
let entryUrl = null;
export let require_ = null;
export let ADDON_PATH = null;
export function adoptModuleContext(url, requireBase, addonPath) {
  entryUrl = url;
  require_ = requireBase;
  ADDON_PATH = addonPath;
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
    return JSON.parse(readFileSync(join(dirOf(fileURLToPath(entryUrl)), 'package.json'), 'utf8')).version;
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
export let addon = null;
let addonLoadError = null;
// **THE ARM THE LOAD PATH ANSWERED WITH, WHERE THE STATE IS THE VERSION MISMATCH** (`docs/specs/storeroom-publish/contract.md §1.5` item 2): the
// load path's OWN declared answer, remembered so that the mismatch is TERMINAL — rung two's `require` is
// not reached on the evaluation that meets the mismatch and not on any LATER one either, because the walk
// reads this state before it walks anything. **THE STATE IS THE DECLARED FORM ITSELF AND NEVER A HOST
// `Error`**: `docs/specs/storeroom-publish/contract.md §1.4` item 1 admits ONE failure shape — `{status, message}`, thrown, no third member — so a
// second failure INSTANCE held in the module's own state is not a shape this unit admits (`PUB-R-3`).
export let addonArm = null;
// **THE RUNGS THE LOAD PATH ACTUALLY WALKED** (`docs/specs/storeroom-publish/contract.md §1.4` item 2; `resolution.md §5.3`): `tried` collects the
// subjects a candidate was sought at, IN THE ORDER THEY WERE TRIED — rung one's RESOLVED NAME where rung
// one was attempted at all, and rung two's module-relative path. **THE SUBJECT IS ONE PATH WHERE ONE RUNG
// WAS TRIED AND BOTH PATHS WHERE BOTH WERE** (`resolution.md §2.2`), and an uncovered key's rung one is
// never attempted, so its subject is rung two's path ALONE.
let rungOneName = null;
let tried = [];
// **⟶ AND THIS LIST'S APPEND IS ITS OWN MEMBER — ADDED 2026-10-25 ON THE `F8-2` CLASS'S WRITE VECTOR, AND ITS
// TWO CALL SITES ARE UNMOVED BYTE-FOR-BYTE ON PURPOSE.**
// **THE DEFECT:** `tried.push(path)` was `Array.prototype.push`, which performs `[[Set]]` and WALKS THE
// PROTOTYPE CHAIN. With a caller's own getter-only accessor at `Array.prototype[0]` — a mutation a caller owns
// and `C-11` forbids this package to freeze away — the first append threw the raw host `TypeError` *"Cannot
// set property 0 of [object Array] which has only a getter"* out of a LAWFUL `storeCreate`, before the artefact
// was even looked for, with `reads === 0`: no verdict, no user code and no declared form. **THE FIX:** the
// append is given to THIS list as an OWN data member that DEFINES the own property (`appendOwn`), so the append
// takes no member from a mutable prototype and consults no chain; the member is `push` because that is what the
// call sites spell.
// **AND WHY THE CALL SITES KEEP THEIR BYTES RATHER THAN READING `appendOwn(tried, path)` DIRECTLY:**
// `tests/e2e/staged-install/publish-generators.test.mjs`'s `NG-PUB-A` control anchors the rung-one success arm
// by those very bytes (`:734`) and its own message declares that a moved site must be RE-CUT — an act that
// belongs to the test writer and that this pass may not take. So the form is moved to the member, and the two
// sites stand where they stood.
Object.defineProperty(tried, 'push', {
  value: (path) => appendOwn(tried, path),
  writable: true,
  enumerable: false,
  configurable: true,
});
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
export function loadAddon() {
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
export function absentSubject() {
  if (tried.length === 1) return tried[0];
  return tried.map((path) => `'${path}'`).join(', ');
}

/// ⟶ **AND ITS BODY IS `src/entry/addon-slot.mjs`'S FROM 2026-11-17** (`D-156` item 1; the loader split's step 3):
/// the generator's own rendering of this one row is a FORM and not a host fact, two of its three readers are
/// realm-neutral, and this file imports it back from there — the direction the clause at the head of this file
/// states, and the cycle it forbids is still closed. **NOT ONE CHARACTER OF ITS OUTPUT MOVES.**

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
