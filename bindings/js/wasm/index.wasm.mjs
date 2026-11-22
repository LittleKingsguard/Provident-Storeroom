// **⟶ THE SECOND REALM'S ENTRY — `provident-storeroom` FOR A WEBASSEMBLY BUILD — 2026-11-17** (`D-154` item 5;
// `D-155` item 3; `D-156` item 1; the loader split's last step, `docs/L3/wasm-realm/design.md` §2 and §5).
//
// **WHAT THIS FILE IS, IN ONE SENTENCE: THE SAME PACKAGE, WITH ITS BINDINGS HANDED IN INSTEAD OF LOOKED FOR.** The
// Node arm's entry (`index.mjs`) is a head — five `node:` imports, the two facts it derives from its own
// `import.meta.url`, the module-context seam and the class instrument — and the body beneath it, which is
// `src/entry/instance.mjs` and is **ONE copy** (`design.md` §5: *"the shared body — the fifteen members, `deliver`,
// the kernel glue — is ONE copy"*). **THIS FILE IS THE SECOND HEAD**: it imports that same body verbatim, supplies
// the class instrument's home and the kernel's reach, and differs from the Node arm in exactly one function — how
// the module of free functions arrives.
//
// **NO `node:` SPECIFIER APPEARS IN THIS FILE, DIRECTLY OR TRANSITIVELY, AND NONE MAY** (`design.md` §2: *"the WASM
// arm is a second module with **no `node:` specifier at all**, importing the same parts and the same shared
// instance-building body"*). The transitive set is the seven realm-neutral parts, the three parts this split added
// (`addon-slot.mjs`, `kernel-loader.mjs`, `instance.mjs`), the five kernel parts, the barrel — and **not
// `artefact-node.mjs`**, which carries `node:fs`, `node:path` and `node:url` and is the Node arm's alone.
//
// **AND IT IS THE ONLY ARM WHOSE BINDINGS ARE INJECTED** (`D-155` item 3: *"the host fetches the bytes and calls
// `initSync`; the entry imports the glue statically and calls functions"*; `design.md` §2's shape **(A)**, priced
// there and drawn there): `storeCreate(bindings, cfg)` takes the initialised module at its FIRST position and the
// caller's config at its second. **THE SPELLING IS THE ARCHITECT'S AND THE SHAPE IS THE DESIGN'S**; the Node arm's
// `storeCreate(cfg)` is byte-unmoved, one position, one export — the two arms are two modules, which is exactly what
// `wasm-realm.md §2` row 2's *"closed at one member per build"* means.
//
// **WHAT HAPPENS AT THE FIRST POSITION IS ONE SETTER AND NOTHING ELSE**: `installAddon(bindings)` fills the slot
// every part reads (`addon-slot.mjs`), and then the shared body runs — `storeCreate(cfg)`'s own first act is
// `withAddon()`, which on this arm answers the dispatch table built over those bindings. **A REFUSED FIRST POSITION
// IS THE DECLARED ABSENT FORM AND NOT A HOST ERROR**: `installAddon` refuses `null`, `undefined`, a primitive, a
// function and an object carrying no callable `storeCreate`, throwing `FilePathUnreachable` in the package's one
// four-member shape, with the subject this arm declares for the state — `'bindings'`, the position that was not
// handed over (`design.md` §8 names the state and leaves its member to the architect; this entry answers the status
// the surface already declares for the absent-artefact form rather than minting one).
//
// **★ AND THE RECEIVER-HANDED SITES IN THE PARTS MOVE ZERO BYTES, WHICH IS THE WHOLE OF THE FORK'S PRICE.** The
// package reaches the addon with `Reflect.apply(entryOf().read, this, args)` and `.call(state.receiver, …)`
// throughout `delivery.mjs`, `constraints.mjs`, `state.mjs` and the body. On this arm the module's entries are
// **FREE FUNCTIONS TAKING THE HANDLE FIRST** (`design.md` §1), and the handle is the SAME row the Node-API frame
// reads off the receiver — `STORE_INDEX` (`Symbol.for('provident-storeroom.storeIndex')`), published on the instance
// by the shared body at its own construction. So `addon-slot.mjs`'s reader answers a table whose members prepend
// **the receiver's own index**, `state.receiver` keeps its name and its value (the instance object, unmoved), and no
// call site learns a handle, a second routing datum or a second spelling of `delete` (`delete → _delete` lives in
// that one table). **`state.handle` IS NOT MINTED.**
//
// **THE CLASS INSTRUMENT IS `NOT CHOSEN` ON THIS ARM AND THIS ENTRY INSTALLS NONE — STATED HERE SO NO READER MISTAKES
// IT FOR A LANDING** (`design.md` §4: *"`util.types.isProxy` has no browser equivalent … Four arms, **priced and
// none chosen**"*; the choice is the architect's). `class-instrument.mjs`'s predicate therefore answers its declared
// default — `false` — for every value here, which is **a SILENT LOSS of `DD-34`'s `Proxy` refusal on this arm and
// nothing else**: the seam is in place, its one setter is one line away, and no byte of any part moves on the day
// the ruling lands.
//
// **AND THE KERNEL'S REACH IS A STATIC IMPORT, WHICH IS WHAT THE DESIGN ASKS FOR ON THIS ARM** (`design.md` §5's
// `constraints.mjs` row: *"a browser build ships the package, so the laziness has no subject — and an
// `await import()` would make the first constraint act asynchronous and break `DD-17`"*): `kernel-loader.mjs`'s one
// slot is filled here with a resolver over the namespace import below, and `constraints.mjs` asks the slot on the
// first constraint act exactly as it asks it on the Node arm.
//
// **TWO THINGS THIS FILE DOES NOT DO, BOTH NAMED BY THE DESIGN RATHER THAN DISCOVERED HERE** (`design.md` §8):
// **it instantiates nothing** — `initSync` is the HOST's act, and this entry imports the initialised module's
// namespace and calls functions — and **it has no `version` read**, because there is no `package.json` on this arm to
// compare against, so the load path's mismatch arm is unreachable here by construction and not by a guard.
import * as KERNEL from '../src/constraint-kernel.mjs';
import { installAddon } from '../src/entry/addon-slot.mjs';
import { installKernelResolver } from '../src/entry/kernel-loader.mjs';
// **⟶ AND THE CLASS-DECISION INSTRUMENT'S SETTER IS THE SECOND HEAD'S TOO, 2026-11-17 — `D-156` ITEM 1, TAKEN.**
// **The Node head installs `types.isProxy`; THIS head installs the `structuredClone` probe the ruling chose**, and the
// seam is the same one-import, one-call shape: `isProxyOf` is the ONE predicate the five parts decide `DD-34`'s
// refusal with, and **without this line the fork would answer its `false` default for every value — a SILENT LOSS of
// the refusal, which is exactly what `D-156` forbids.** A value the probe cannot clone is refused; a `Proxy` cannot be
// cloned at all, so **the refusal fires BEFORE ANY TRAP RUNS**, which is `DD-34`'s whole property.
import { installClassInstrument } from '../src/entry/class-instrument.mjs';
import { storeCreate as storeCreateInstance } from '../src/entry/instance.mjs';

// **THE KERNEL'S REACH, INSTALLED AT THIS ENTRY'S OWN EVALUATION** — the barrel is in this module's graph from the
// start (a browser build ships the package), so the resolver answers the namespace and mints nothing.
installKernelResolver(() => KERNEL);
// **⟶ AND THE INSTRUMENT IS INSTALLED AT THIS HEAD'S OWN EVALUATION, BEFORE ANY VERB AND BEFORE ANY PART
// CLASSIFIES A VALUE** (`D-156` item 1; `docs/L3/wasm-realm/design.md` §4's arm (iv), taken). **A `Proxy` is not
// serializable — the structured-serialisation algorithm throws `DataCloneError` — so the probe is a detector that
// RUNS NO TRAP BEFORE THE REFUSAL**, which is the property `DD-34` states and the Node arm keeps with
// `util.types.isProxy`. **IT DOES DOUBLE DUTY AND THAT IS WHY IT IS THE RIGHT INSTRUMENT HERE**: it is the `Proxy`
// detector AND the test that a value is clone-compatible at all — `invariant 2`'s domain (*"if it cannot cross IPC
// it cannot be stored"*) landing one layer earlier. **THE PRICE IS THE DESIGN'S OWN AND IS ACCEPTED: one clone per
// value on this arm's crossing** (`D-156` item 3 of its unsettled — priced, NOT MEASURED).
//
// **AND IT IS A PROBE AND NOT A CARRIER**: the clone's result is DISCARDED, because the crossing's own readers build
// the store's value from the value itself and `D-156`'s deep-clone law is about what the store HOLDS, not about this
// call. Nothing here hands a cloned value to any reader.
installClassInstrument((value) => {
  try {
    structuredClone(value);
    return false;
  } catch {
    return true;
  }
});

// ---------------------------------------------------------------------------------------------
// THE SURFACE — `surface.md §2.9` item 1: the ONE value-level name, `storeCreate`, and NOTHING else.
// ---------------------------------------------------------------------------------------------

/// **THE FACTORY, AT TWO POSITIONS — THE BINDINGS FIRST AND THE CONFIG SECOND** (`design.md` §2 shape (A): *"a
/// factory `storeCreate(bindings, cfg)` in the WASM arm's own module"*; `D-155` item 3's injected instance).
///
/// **THE ORDER OF THE TWO ACTS IS THE CLAUSE**: the bindings are installed FIRST, through the one setter, so a first
/// position that is not the bindings is refused in the declared absent form **before any byte of the caller's `cfg`
/// is read** — and where it IS the bindings, the shared body runs and `withAddon()` at its head answers the dispatch
/// table. **NOTHING IS DECIDED HERE THAT THE SHARED BODY DOES NOT DECIDE**: no `cfg` key is read, no constraint is
/// walked, no store is constructed and no refusal is minted in this file.
///
/// **AND `installAddon` IS CALLED ONCE PER CONSTRUCTION AND IS IDEMPOTENT FOR ONE MODULE** (`addon-slot.mjs`'s
/// clause): a host that hands the same initialised module to two constructions builds the table once, and a host
/// that hands a second module replaces it — the row a receiver carries is its own, so the route is never the table's
/// identity.
export function storeCreate(bindings, cfg) {
  installAddon(bindings);
  return storeCreateInstance(cfg);
}
