// **⟶ THE ADDON SLOT — THE MODULE EVERY PART REACHES ITS BINDINGS THROUGH, HELD BY THE REALM AND INSTALLED INTO
// THIS PART — 2026-11-17** (`D-156` item 1; the loader split's step 3, `docs/L3/wasm-realm/design.md` §5's
// `artefact.mjs` row: *"`withAddon()` answers the injected bindings: `loadAddon()` gains one arm at its head and the
// walk is not reached"* — **injected**, *"`adoptModuleContext` is already an injection seam"*).
//
// **WHY IT IS A FILE OF ITS OWN, AT THE BYTE.** `withAddon()` reads the module-level slot that `loadAddon()`'s
// three-rung walk writes, and both of those lived in `artefact.mjs` — whose Node half (`artefact-node.mjs`) carries
// the three static `node:` imports and therefore **cannot even be LOADED on the arm this split is for**. So the
// READER and the FORM moved here, and the WALK stayed there: this file carries **no `node:` specifier and no import
// of `artefact-node.mjs`**, and the host-borne arm reaches it only through the two setters below.
//
// **WHAT MOVED, AND FROM WHERE — BYTE FOR BYTE**: `addonLoadMessage()` · `withAddon()` · `spellDottedContainer()` ·
// `boundaryReject()` from `artefact.mjs`, and `generatorFilePathUnreachable()` from `artefact-node.mjs` (it is the
// generator's own rendering of ONE subject, which is a form and not a host fact — and it is the reason
// `artefact-node.mjs` now imports THIS file rather than the other way round). **THEIR ANSWERS DO NOT MOVE.**
// **ONE TOKEN MOVED AND IT IS NAMED:** `boundaryReject`'s absent-generator arm rendered
// `generatorFilePathUnreachable(ADDON_PATH)`; `ADDON_PATH` is the host-borne arm's own live path, so the arm is read
// through `artefactPath()` below, which answers **that same live path** on the Node arm and the arm's own declared
// absence on the injected one. **THE NODE ARM'S STRING IS BYTE-IDENTICAL**; what changed is that this file no longer
// has to import the half that owns the path to render it.
//
// **THE TWO ARMS, AND THE ONE THING THAT MUST NOT MOVE.**
//
//   * **THE HOST-BORNE ARM (Node)** installs a LOAD PATH, `installAddonPath({ loadAddon, absentSubject,
//     artefactPath })`, from `artefact.mjs` at ITS evaluation. The first `withAddon()` (or `addonLoadMessage()`)
//     runs that path — the three-rung walk — and copies the walk's own answer into the slot: **the walk still
//     happens at the first construction and never at load**, so this entry still reads no file at its evaluation,
//     and the mismatch arm the walk answers with is carried beside the module (`addonArm`).
//   * **THE INJECTED ARM (WebAssembly)** installs the BINDINGS, `installAddon(bindings)`, from the second realm's
//     entry, which takes them from its own caller. **THERE IS NO WALK AND NO HOST THERE** — the bindings are handed
//     in, so `loadAddon()` is a no-op and the slot is filled by the one setter.
//
// **★ AND `withAddon()`'S OBSERVABLE IS THE SAME ON BOTH ARMS, WHICH IS THE WHOLE OF THE CLAUSE**: with no module
// in the slot it answers **the surface's declared absent-artefact form** — `FilePathUnreachable`, thrown in the
// entry's ONE four-member shape (`fail` builds it) — and never a silent store and never a second form. The SUBJECT
// of that message is the ARM's own: on the Node arm it is the attempt list the walk recorded (one path where one
// rung was tried, both where both were — `absentSubject()` in `artefact-node.mjs`, unmoved); **on the injected arm
// there is no path to be absent, so the subject is `'bindings'`** — the name of the one position the injection
// arrives at — **and that is the arm's own DECLARED absence, rendered by the same generator clause byte for byte**
// (`'bindings' is not reachable at construction, …`). The design's §8 puts the *status* this arm should answer to
// the architect and names no ruling; **this file answers the status the surface already declares for the
// absent-artefact state rather than minting a member of the closed set for a state no clause names** (`DD-40`:
// nothing here mints a status).
//
// **⟶ AND THE INJECTED ARM'S MODULE IS A NAMESPACE OF FREE FUNCTIONS, SO THE READER ANSWERS A DISPATCH TABLE AND
// THE TWENTY-TWO-ODD RECEIVER-HANDED CALL SITES MOVE ZERO BYTES** (`design.md` §1: *"FREE FUNCTIONS EACH TAKING A
// HANDLE"*). The parts call `Reflect.apply(entryOf().read, this, args)` and `.call(state.receiver, …)`; on the Node
// arm the module is a Node-API addon whose entries resolve their store from the receiver's own `STORE_INDEX` row
// (`facade.rs`'s `store_index_of`), and on this arm the entries are the wasm module's free functions whose FIRST
// position is that same index. **THE TWO ARE THE SAME DATUM**, so the table is the whole of the difference: each
// wrapped entry reads the receiver's OWN row (`storeIndexOf` below — `[[GetOwnProperty]]`, never the chain) and
// prepends it, and a receiver that names no row reaches the wasm frame's class-miss arm, which answers the ONE
// declared form for a call whose receiver names no live store exactly as the Node arm's does (`design.md` §1 ground
// 2; `C-W10`). **`state.receiver` KEEPS ITS NAME, ITS VALUE AND ITS MEANING, and `state.handle` is not minted**: one
// routing datum, and it is the one the parts already read.
//
// **AND `delete` → `_delete` AT THAT SAME TABLE** (`wasm-realm.md` §15: the toolchain emits the entry as `_delete`
// because the published name is a reserved word), so the parts' `entryOf().delete` is spelled as the module's own
// `_delete` in one place and no site learns a second name. `commitFile` is **ABSENT** from the injected export set
// (`D-155` item 4; eighteen of the Node arm's twenty, which is **⟶ NINETEEN UNTIL 2026-11-19 AND TWENTY FROM THE
// `storeRelease` LANDING** — `facade.rs`'s retirement entry, which has no wasm twin), so the table carries no such
// member and this file mints no stand-in for it: a save that names it on that arm is the design's own declared
// absence, not a table's omission. **AND THE SAME HOLDS OF `storeRelease` ON THIS ARM**: `state.mjs`'s
// `STORE_RETIREMENT` calls it, the injected table carries no such member, and **the registry's own `try`/`catch`
// is what makes that absence SILENT rather than a throwable crossing a finalizer** — the arm's declared state is
// that its table never retires a store (`docs/L1/wasm-realm.md:311`), and nothing here mints a stand-in.
//
// **NO `node:` SPECIFIER APPEARS IN THIS FILE AND NONE MAY** — that is the whole of the seam.

import { appendOwn, fail } from './refusal.mjs';
// **⟶ AND THE CLASS SPELLING IS THE TREE'S OWN, 2026-11-17** (`D-157` item 2): `classSpelling` is
// `class-decision.mjs`'s declared spelling of a value's class, so the class form's message names the class the way
// every other class refusal in this package names it — one spelling, one home, and no `node:` specifier here.
import { classSpelling } from './class-decision.mjs';

// ---------------------------------------------------------------------------------------------
// THE SLOT — and the arm's own facts, where the arm has any
// ---------------------------------------------------------------------------------------------

/// **THE MODULE THE READER ANSWERS** — `null` before anything is installed, the walked module's own object on the
/// host-borne arm, and the dispatch table below on the injected one. **IT IS THE ONE NAME `withAddon` ANSWERS AND
/// THE ONE NAME `boundaryReject` AND `addonLoadMessage` READ**, exactly as it was in `artefact.mjs`.
let addon = null;

/// **THE MODULE THE DISPATCH TABLE WAS BUILT FROM** — the identity test `installAddon` takes and nothing else. **IT
/// IS NOT A SECOND ROUTING DATUM**: the route is the receiver's own `STORE_INDEX` row, so no call reads this.
let installed = null;

/// **THE ARM THE LOAD PATH ANSWERED WITH, WHERE THE STATE IS THE VERSION MISMATCH** (`docs/specs/storeroom-publish/
/// contract.md §1.5` item 2: the arm is TERMINAL and is re-thrown at every later call). **IT IS THE DECLARED FORM ITSELF AND NEVER
/// A HOST `Error`** (`§1.4` item 1 admits one shape), and on the injected arm there is no version read to reach it
/// (`design.md` §8: *"`version`'s mismatch arm is **unreachable** on this arm"*), so it is `null` there by
/// construction and not by an arm test.
let addonArm = null;

/// **THE HOST-BORNE ARM'S OWN FACTS, OR `null` WHERE THE ARM HAS NONE** — the three the walk needs and the form
/// renders: the walk itself, the absent state's subject from the attempt list, and the artefact path the
/// boundary's absent-generator arm names. **ONE INSTALLATION, AT THAT ARM'S OWN EVALUATION, AND NOT ONE BYTE OF IT
/// IS A HOST IMPORT**: a function slot the realm fills is the pattern `class-instrument.mjs` already carries.
let loadPath = null;

/// **THE SUBJECT THE INJECTED ARM'S ABSENT FORM RENDERS** — the one position the bindings arrive at. **IT IS THE
/// ARM'S OWN DECLARED ABSENCE AND NOT A PATH**: a realm that injects its bindings has no artefact to be absent, and
/// the case the state covered does not vanish — it becomes *"the factory was handed nothing, or something that is not
/// the bindings"* (`design.md` §8) — so the form is the surface's and the subject is the arm's.
const INJECTED_ABSENT_SUBJECT = 'bindings';

/// **THE ROW THE STORE'S OWN INDEX IS PUBLISHED ON, NAMED BY THE REGISTERED SYMBOL AND NOT BY A SHARED OBJECT** —
/// `state.mjs`'s `STORE_INDEX` (`receiver-and-refusal.md` §1) publishes it on the instance and `facade.rs`'s
/// `store_index_of` reads it from the receiver; this file reads the SAME row, so it spells the SAME registered key.
/// **`Symbol.for` IS THE DECLARED MECHANISM AND NOT A SECOND HOME**: the two sides never share an object, and a
/// registered symbol is the only spelling both can name without one holding the other's reference (the clause
/// `state.mjs` already states at its own byte).
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

/// **THE ONE SETTER FOR THE HOST-BORNE ARM'S LOAD PATH**, called at `artefact.mjs`'s own evaluation. **A RECORD
/// MISSING ONE OF ITS THREE FUNCTIONS IS REFUSED** rather than held: the failure would otherwise be a host
/// `TypeError` at the first construction — a second failure form on a path `DD-12` allows none — so it is a
/// load-time programming error and a plain `TypeError` on purpose, exactly as `installClassInstrument` refuses a
/// non-function. **IT MINTS NO STATUS AND CAN REACH NO CALLER** (`DD-40`): its only caller is a module's evaluation.
export function installAddonPath(path) {
  if (path === null || typeof path !== 'object'
      || typeof path.loadAddon !== 'function'
      || typeof path.absentSubject !== 'function'
      || typeof path.artefactPath !== 'function') {
    throw new TypeError('installAddonPath: the load path is an object carrying loadAddon, absentSubject and artefactPath');
  }
  loadPath = path;
}

/// **THE ONE SETTER FOR THE MODULE, CALLED ONCE BY THE INJECTED ARM'S ENTRY** (`storeCreate(bindings, cfg)`).
///
/// **THE DOMAIN IS AN OBJECT CARRYING A CALLABLE OWN `storeCreate`, AND EVERYTHING ELSE IS REFUSED IN THE DECLARED
/// FORM** — `null`, `undefined`, a primitive, a function, and an object that carries no such member. The class test
/// is an OWN DATA read (`getOwnPropertyDescriptor`), so a caller's own accessor is never invoked and no trap runs on
/// this path (`A76`; `DD-34`'s discipline one layer over). **THE REFUSAL IS THE SAME ONE `withAddon()` ANSWERS WITH
/// AN EMPTY SLOT** — `FilePathUnreachable` in the four-member form, the subject the arm declares — because *"the
/// factory was handed nothing, or something that is not the bindings"* is the state `design.md` §8 names and no
/// ruling gives it a member of its own; **the slot is left EMPTY by the refusal**, so every later call answers the
/// same form rather than a half-installed table.
///
/// **A REPEATED INSTALL OF THE SAME MODULE REBUILDS NOTHING**: the table is built once per module object, so the
/// answer a part takes at `entryOf()` is stable for the life of the construction. (A host that hands a SECOND
/// module to a second `storeCreate` replaces the table; the two arms' stores are the crate's `INSTANCES` rows and
/// the row a receiver carries is its own, so the table's identity is not what routes a call.)
export function installAddon(module) {
  if (isBindings(module) !== true) {
    addon = null;
    installed = null;
    // **⟶ AND A HOST THAT HANDS THE FACTORY NOTHING IS REFUSED IN THE PACKAGE'S OWN CLASS FORM — `D-157` ITEM 2, THE
    // ARCHITECT'S *"2 - d"*.** **THE FORM IS `PAR-JS-12`'S ONE `TypeError`: its `status` MEMBER IS ABSENT and its string
    // `message` is required** — the shape the commit position's own class refusal takes, and the shape this file's
    // `installAddonPath` already throws two functions above.
    //
    // **WHY NOT A STORE STATUS, SAID AT THE BYTE INSTEAD OF LEFT TO A READER.** The state is *"the injected arm's factory
    // was called without its bindings, or with an object that is not them"*, and **NOTHING OF THE STORE IS IN IT**: no
    // instance exists, no verb is reached, no op is minted and no journal is touched. **A member of the closed set would
    // name a state the STORE cannot be in**, and the corpus keeps the store's set for the store's states — the one
    // package-produced member it carries (rank `23` `ListenerBodyRejected`) is a failure of a delivery the STORE's own
    // pass asked for, which is not this. **It is a CALL-SHAPE error and `PAR-JS-12` is the corpus's form for exactly that**,
    // read with `D-154`'s second realm and `D-155` item 3's injected instance (the factory's first position is the
    // architect's own spelling, so its misuse is the host's and not a store state).
    //
    // **AND THE SLOT IS STILL LEFT EMPTY BY THE REFUSAL**, so every later call answers the same class form rather than a
    // half-installed table.
    throw new TypeError(
      `storeCreate: the injected bindings are ${classSpelling(module)}, and the first position is the WebAssembly module's own namespace object`,
    );
  }
  if (installed === module) return;
  installed = module;
  addon = dispatchTable(module);
}

// ---------------------------------------------------------------------------------------------
// THE ARM'S OWN FACTS, READ THROUGH THE SLOT — the three names the moved functions spell
// ---------------------------------------------------------------------------------------------

/// **THE ARM'S WALK, WHERE IT HAS ONE.** Both moved readers call this at their head, so the walk still happens at
/// the first construction and `loadAddon()`'s body — and its three-rung order, its mismatch arm and its idempotence —
/// is unmoved in `artefact-node.mjs`. **THE WALK'S OWN ANSWER IS COPIED INTO THE SLOT HERE AND NOWHERE ELSE**: the
/// host-borne arm hands `{ addon, arm }` back (its own two module-level slots, read as live bindings), so the reader
/// below never imports the half that walks.
function loadAddon() {
  if (loadPath === null) return;
  const answered = loadPath.loadAddon();
  addon = answered.addon;
  addonArm = answered.arm;
}

/// **THE SUBJECT THE DECLARED ABSENT FORM RENDERS** — the attempt list on the host-borne arm (the paths that were
/// tried, in the order they were tried) and the arm's own declared absence on the injected one.
function absentSubject() {
  return loadPath === null ? INJECTED_ABSENT_SUBJECT : loadPath.absentSubject();
}

/// **THE PATH THE BOUNDARY'S ABSENT-GENERATOR ARM NAMES** — the host-borne arm's own artefact path, live, and the
/// injected arm's declared absence where no path exists. **IT REPLACES THE SINGLE TOKEN `ADDON_PATH` THE MOVED
/// `boundaryReject` CARRIED AND IT ANSWERS THE SAME BYTES ON THE ARM THAT HAS A PATH.**
function artefactPath() {
  return loadPath === null ? INJECTED_ABSENT_SUBJECT : loadPath.artefactPath();
}

// ---------------------------------------------------------------------------------------------
// **THE DECLARED ABSENT FORM'S MESSAGE** — moved BYTE FOR BYTE from `artefact.mjs`, whose own clause stands above it
// there; the four lines of its body are unmoved and the two names it reads (`loadAddon`, `absentSubject`) are this
// file's own. **THE ONE THING ADDED HERE IS THE ARM'S SUBJECT, STATED AT ITS BYTE ABOVE**: `absentSubject()`
// answers the attempt list on the host-borne arm and `'bindings'` on the injected one.
// ---------------------------------------------------------------------------------------------
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

/// **THE STORE'S GENERATOR'S OWN RENDERING OF `FilePathUnreachable` FOR A SUBJECT** — the ONE row this file
/// reproduces, and it reproduces it because there is exactly ONE state in which the generator cannot be
/// reached at all: the state in which the generator is the thing that failed to load. **IT IS NEVER A
/// HAND-AUTHORED MESSAGE** (`docs/specs/storeroom-js/surface.md §2.5` item 2): it is the generator's clause, subject slot included, rendered
/// byte-for-byte — see the derivation above this block.
///
/// **⟶ AND ITS HOME IS THIS FILE FROM 2026-11-17, NOT THE NODE HALF'S**: its three readers were `mismatchArmMessage`
/// (which stays in `artefact-node.mjs` and imports it from HERE), `addonLoadMessage` below and `boundaryReject`'s
/// absent-generator arm beside it — **two of the three are realm-neutral, and a form is the surface's and not the
/// host's.** `artefact-node.mjs` importing this file closes no cycle: nothing here imports that half.
export function generatorFilePathUnreachable(subject) {
  return `'${subject}' is not reachable at construction, the path must exist or the application must be able to write it`;
}

/// **⟶ `withAddon()` — THE NAMED MODULE, OR THE DECLARED FORM** — moved BYTE FOR BYTE from `artefact.mjs`.
///
/// **ITS BODY IS UNMOVED AND THAT IS THE POINT**: `loadAddon()` at its head (a no-op on the arm that injects), the
/// mismatch arm FIRST (the load path's own declared answer, terminal by construction), then the absent arm, then the
/// module. **ON THE INJECTED ARM THE FIRST LINE DOES NOTHING AND THE SECOND IS UNREACHABLE** (`design.md` §8), so
/// what a part receives there is the slot's dispatch table; on the host-borne arm it is the walked module itself
/// and the twenty-odd receiver-handed sites reach a Node-API entry exactly as they did.
export function withAddon() {
  loadAddon();
  // **THE MISMATCH ARM STANDS FIRST, AND IT IS THE ARM THE LOAD PATH ITSELF ANSWERED WITH** (`docs/specs/storeroom-publish/contract.md §1.5` item 2;
  // `PUB-R-3`): where the version read refused, THE WALK IS OVER — no rung-two attempt is made here and none
  // is made at any later call, and the value re-thrown is the arm's own `{status, message}` and not a state
  // re-derived from a path list.
  if (addonArm !== null) fail(addonArm);
  if (addon === null) {
    // **⟶ AND THE EMPTY SLOT IS TWO STATES AND NOT ONE — `D-157` ITEM 2, THE ARCHITECT'S *"2 - d"*, AT ITS BYTE.**
    // **A LOAD PATH STANDS ONLY ON THE HOST-BORNE ARM** (`installAddonPath`, called once by `index.mjs`), **so the two
    // cases are told apart by this file's own fact and by no flag**: where a path stands and the walk still answered
    // nothing, **the artefact is absent and the surface's declared absent form is the answer** (`FilePathUnreachable`,
    // rendered by the store's generator, with the attempt list as its subject — `PUB-R-3`'s own arm, UNMOVED). **Where
    // NO path stands, this is the injected arm and no bindings were ever installed**: *"the factory was handed nothing"*,
    // which is a CALL-SHAPE error and **not a store state** — **`PAR-JS-12`'s one `TypeError`, its `status` member
    // ABSENT and a string `message` required**, the same form `installAddon` throws one screen above and the same form
    // the commit position's class refusal takes. **IT IS THE CORRECT ANSWER FOR THE STATE AND NOT A NARROWING OF THE
    // DECLARED ONE**: nothing of the store exists to be absent, so `FilePathUnreachable` *"would name a file path that was
    // never sought"* (`D-157` item 2's ground).
    if (loadPath === null) {
      throw new TypeError(
        'storeCreate: no bindings are installed, and the first position is the WebAssembly module\'s own namespace object',
      );
    }
    fail({ status: 'FilePathUnreachable', message: addonLoadMessage() });
  }
  return addon;
}

// ---------------------------------------------------------------------------------------------
// THE DISPATCH TABLE — **THE ONE PLACE THE TWO ARMS' CALLING CONVENTIONS DIFFER**, built once per installed module
// ---------------------------------------------------------------------------------------------

/// **THE FIFTEEN ENTRIES THAT TAKE THE HANDLE FIRST** (`design.md` §1's table, read at the crate's own export set:
/// the instance's fifteen members are the fifteen entries, `wasm-realm.md` §15). **THE NAMES ARE THE PACKAGE'S OWN
/// MEMBER NAMES**, because the parts spell them: `entryOf().read`, `addon_.listen`, `addon_.register` and the rest.
const HANDLE_FIRST_ENTRIES = [
  'read', 'readLiteral', 'readTiered', 'write', 'delete', 'rollback', 'listen', 'unlisten', 'removeListener',
  'exportImage', 'saveSucceeded', 'saveFailed', 'restoreMark', 'journalMark', 'register',
];

/// **THE MODULE'S OWN SPELLING WHERE IT DIFFERS FROM THE MEMBER'S** — `delete` is a reserved word, so the toolchain
/// publishes that entry as `_delete` (`wasm-realm.md` §15's measured line). **ONE ROW, ONE PLACE, AND NO CALL SITE
/// LEARNS A SECOND NAME.**
const MODULE_SPELLING = { delete: '_delete' };

/// **THE THREE ENTRIES THAT TAKE NO HANDLE AND CROSS AS THEY ARE** — the construction (`storeCreate`, whose one
/// position is the encoded config and whose answer is the handle), the version read and the store's generator.
const PASSED_THROUGH_ENTRIES = ['storeCreate', 'version', 'errorMessage'];

/// **THE TABLE AN INSTALLED MODULE IS READ THROUGH.** Each handle-first member becomes a function that takes the
/// positions the PARTS hand it (`(address, tier)` and so on) and calls the module's free function with the
/// receiver's own index prepended; each passed-through member becomes a plain forwarder. **A MEMBER THE MODULE DOES
/// NOT CARRY IS NOT MINTED** — the table is the module's own reachable set, so an entry the injected arm does not
/// export (today: `commitFile`, `D-155` item 4) has no stand-in here and a call naming it is that entry's declared
/// absence rather than this file's invention.
function dispatchTable(bindings) {
  const table = {};
  for (let i = 0; i < HANDLE_FIRST_ENTRIES.length; i += 1) {
    const name = HANDLE_FIRST_ENTRIES[i];
    const spelled = MODULE_SPELLING[name] === undefined ? name : MODULE_SPELLING[name];
    const member = ownMember(bindings, spelled);
    if (typeof member !== 'function') continue;
    defineEntry(table, name, handleFirstEntry(member));
  }
  for (let i = 0; i < PASSED_THROUGH_ENTRIES.length; i += 1) {
    const name = PASSED_THROUGH_ENTRIES[i];
    const member = ownMember(bindings, name);
    if (typeof member !== 'function') continue;
    defineEntry(table, name, passedThroughEntry(member));
  }
  return table;
}

/// **ONE HANDLE-FIRST ENTRY, WRAPPED** — the receiver's own index at the FIRST position, then the caller's positions
/// in their own order. **THE LIST IS FRESH AND DENSE AND BUILT BY `appendOwn`** (the design's `withHandle` idiom,
/// `design.md` §1): no caller's array is mutated, no `Array.prototype` member is taken, and `Reflect.apply`'s
/// by-index guarantee is kept. **`this` IS DELIBERATELY NOT PASSED ON**: the module's entries are free functions that
/// ignore a receiver, and the handle they read is the FIRST POSITION.
function handleFirstEntry(member) {
  return function handleFirstCall() {
    const args = [];
    appendOwn(args, storeIndexOf(this));
    for (let i = 0; i < arguments.length; i += 1) appendOwn(args, arguments[i]);
    return Reflect.apply(member, undefined, args);
  };
}

/// **ONE PASSED-THROUGH ENTRY, FORWARDED** — the positions as the caller supplied them and nothing added, on the
/// same fresh dense list. `addon_.storeCreate(encoded)` reaches the module's own construction and answers the handle
/// the instance publishes; `addon_.errorMessage(status, subject)` reaches the store's generator and answers a string.
function passedThroughEntry(member) {
  return function passedThroughCall() {
    const args = [];
    for (let i = 0; i < arguments.length; i += 1) appendOwn(args, arguments[i]);
    return Reflect.apply(member, undefined, args);
  };
}

/// **THE RECEIVER'S OWN STORE INDEX** — the SAME row the Node-API frame reads, taken here by
/// `[[GetOwnProperty]]` and never through the chain (`D-35`'s read half), so a caller's prototype cannot answer a
/// handle this package did not publish. **EVERY VALUE THAT IS NOT AN OBJECT NAMING THAT ROW ANSWERS `undefined`** —
/// a detached call, a clone (which carries no row, the row being non-enumerable), a foreign object and a primitive
/// alike — and the wasm frame's class-miss arm answers those with the ONE declared form, exactly as the Node arm's
/// does (`design.md` §1 ground 2; `no_instance_at`).
function storeIndexOf(receiver) {
  if (receiver === null || receiver === undefined) return undefined;
  if (typeof receiver !== 'object' && typeof receiver !== 'function') return undefined;
  return ownMember(receiver, STORE_INDEX);
}

/// **AN OWN DATA MEMBER OF A HANDED VALUE, READ OR NOT AT ALL** — `[[GetOwnProperty]]`'s answer with no chain and no
/// conversion (`D-35`; the reading `refusal.mjs`, `state.mjs` and the kernel take). It is this file's own copy of the
/// one three-line read it needs, taken rather than imported so that the slot imports no part and closes no cycle.
function ownMember(value, name) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(value, name);
  if (descriptor === undefined || !Object.hasOwn(descriptor, 'value')) return undefined;
  return descriptor.value;
}

/// **ONE TABLE MEMBER, DEFINED AND NEVER SET** — `[[Set]]` walks the chain and an own accessor at this name on a
/// caller's `Object.prototype` would turn a lawful construction into a raw host `TypeError` (`D-35`; the device the
/// entry's own `durable_without_path` member takes).
function defineEntry(table, name, entry) {
  Object.defineProperty(table, name, { value: entry, writable: true, enumerable: true, configurable: true });
}

/// **WHETHER A HANDED VALUE IS THE BINDINGS** — an object carrying a callable OWN data `storeCreate`, read by
/// descriptor so no caller's accessor runs and no trap is invoked (`A76`'s class-first discipline, one layer over).
function isBindings(module) {
  return module !== null && typeof module === 'object' && typeof ownMember(module, 'storeCreate') === 'function';
}

// ---------------------------------------------------------------------------------------------
// THE BOUNDARY'S OWN REFUSAL — moved from `artefact.mjs`, its bytes unmoved but for the one token named at the head
// of this file
// ---------------------------------------------------------------------------------------------

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

/// **⟶ AND ONE APPENDED FIFTH PARAMETER IS THE ARM TOKEN, ADDED 2026-11-01 (`D-98` item 4; `C-7`/`C-12`;
/// §3.2, §3.7).** `boundaryReject(status, subject, clause, container, token)` — **POSITIONS 1–4 ARE UNMOVED, so
/// every one of the `27` existing call sites is BYTE-IDENTICAL**, and the token is supplied by the four
/// cross-kind arms alone.
///
/// **WHAT IT IS, EXACTLY: A CLOSED ARM TOKEN AND NEVER TEXT.** The one token this correction requires is
/// `'handle'`. It is **not** a message, a clause, a spelling or a member name the store will print: the store
/// renders ITS OWN WORDS from the flag the token sets (`src/error.rs`'s two qualified branches, §3.3), and **an
/// unknown token leaves the slot absent, so the ordinary rendering stands — which is the two-argument call's
/// bytes.** **NO CALLER-SUPPLIED TEXT CAN ENTER A GENERATED SENTENCE** (`surface.md §2.5` item 2, `DD-52`).
///
/// **WHY A TOKEN AND NOT A BETTER CONTAINER** (§3.2 (e)–(f), refused there on two measured grounds): no container
/// repairs a DOMAIN claim, `Some('')` is already occupied by genuine register-level refusals, and a sentinel
/// spelling would be **an identity carried by a spelling** — exactly the seam `D-22` deleted by name. **The
/// qualified arm prints NO `<CONTAINER>` slot at all**, which is why the fourth position is passed `undefined`
/// ON PURPOSE at those four sites: it is a DECLARATION and not an omission (§3.4).
export function boundaryReject(status, subject, clause, container, token) {
  const addon_ = withAddon();
  if (typeof addon_.errorMessage !== 'function') {
    // An artefact that LOADED but does not carry the generator is not the declared artefact: the state is
    // the declared absent/failed-addon one, and its message is the generator's own rendering reproduced.
    fail({ status: 'FilePathUnreachable', message: generatorFilePathUnreachable(artefactPath()) });
  }
  // **THE CONTAINER IS THE PREFIX'S OWN DOTTED SPELLING AND NOTHING ELSE** (`src/error.rs`'s
  // `dotted_address`: a key bare, an index bare, joined by `.`) — the same reading the store's own
  // `malformed_segment` triggers take, where the container is the segment the mismatch was found in.
  const where = container === undefined ? undefined : spellDottedContainer(container);
  // **THE TOKEN REACHES THE GENERATOR'S APPENDED FOURTH POSITION, AND THE THREE-POSITION AND TWO-POSITION CALLS
  // ARE THE BYTES THEY WERE**: a call that supplies no token takes the branch it always took, so **not one byte
  // of the generator's output moves where no token is supplied** (`facade.rs`'s own `..Default::default()`
  // device, reused at this site).
  const generated = token === undefined
    ? (where === undefined ? addon_.errorMessage(status, subject) : addon_.errorMessage(status, subject, where))
    : addon_.errorMessage(status, subject, where, token);
  fail({ status, message: `${generated}, ${clause}` });
}
