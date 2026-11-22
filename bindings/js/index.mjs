// `provident-storeroom` — **THE CLAIMED REALM IS THE ES MODULE ITSELF: one file, one namespace, one declared
// member set, reached by EITHER of Node's two specifiers for that one module** (`package.md §1.1`, `A70`;
// `docs/specs/storeroom-js/contract.md §3.1`'s 2026-11-17 re-derivation — *"`require` IS A SUPPORTED ROUTE INTO THE CLAIMED REALM AND
// IS NOT A SECOND CLAIMED REALM"*; `D-128`, `D-129`).
//
// **THE ONE ARMS-BEARING ENTRY** (`package.md §1.3` item 1, `DD-24`) — the `exports` map publishes it and
// publishes nothing else: `types` names the declaration, and `import` and `require` name the SAME
// `./index.mjs` at their own conditions, so no wildcard, no deep import to the addon and no CJS arm — no
// `.cjs` artefact, no `main` field and no second build — is published beside it (`§1.2`; `HO-1` as
// re-derived 2026-11-17 at `§3.2`; `D-128`). **THE ENTRY'S LOAD-TIME MODULE GRAPH IS SYNCHRONOUS** — no
// module it reaches at load carries a top-level asynchronous module evaluation — because `require(esm)`
// cannot wait (`§3.1`'s foot, the synchronous-graph law; `D-129` item 5).
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

// **⟶ AND THE NODE ARM'S GLUE IS INSTALLED BY ONE SIDE-EFFECT IMPORT, 2026-11-17** (`D-156` item 1; the loader
// split, `docs/L3/wasm-realm/design.md` §5): `artefact.mjs` walks for the artefact through `artefact-node.mjs` —
// the three `node:` imports, the platform table, `packageVersion()` and the three rungs — and hands the walk, the
// attempt list's own subject renderer and this ENTRY's artefact path to `addon-slot.mjs`, which holds the slot
// every part now reads. **THE GLUE INSTALLS A LOAD PATH AND NOT A MODULE**: nothing is looked for until a
// construction asks for it, so this entry still loads and still reads no file at its own evaluation.
import './src/entry/artefact.mjs';
// **⟶ AND THE MODULE-CONTEXT SEAM IS THE NODE HALF'S FROM 2026-11-17** (`D-156` item 1; the loader split's
// extraction, `docs/L3/wasm-realm/design.md` §5). `adoptModuleContext` stores the three facts THIS module derives
// from its own `import.meta.url` — the `createRequire` base, the artefact path and the manifest's directory — and
// the three-rung walk that reads them is `artefact-node.mjs`'s, so the seam and its storage are imported from
// THERE. **THE CALL AT THIS MODULE'S OWN EVALUATION IS UNMOVED BYTE-FOR-BYTE AND SO ARE ITS THREE POSITIONS**
// (`I-29`; `PUB-DD-20`): the entry still adopts its own context, and a part still derives nothing from its own
// URL. **NO OTHER NAME OF THE LINE ABOVE MOVES.**
import { adoptModuleContext } from './src/entry/artefact-node.mjs';
// **⟶ AND THE CLASS-DECISION INSTRUMENT'S SETTER JOINS THIS BLOCK, 2026-11-17** (`D-156` item 1; the loader
// split's row: *"`node:util` in five parts — one import line swapped for a local helper — **neutralised**"*).
// **`installClassInstrument` IS THE ONE SETTER** and it is called once, below, at this module's own evaluation;
// the five parts that decide `DD-34`'s `Proxy` refusal read the predicate from `class-instrument.mjs` and carry
// no `node:` specifier for it.
import { installClassInstrument } from './src/entry/class-instrument.mjs';
// **⟶ AND THE FIFTEEN MEMBERS' BODY HAS ONE COPY, 2026-11-17** (`D-156` item 1; `design.md` §5: *"the shared
// body — the fifteen members, `deliver`, the kernel glue — is ONE copy"*). THIS ENTRY IS NOW THE NODE ARM'S
// HEAD AND ITS ONE EXPORT IS THE SHARED BODY'S: the construction, the instance and the fifteen members stand in
// `src/entry/instance.mjs`, which carries no `node:` specifier and reads no host fact, so the second realm's own
// entry imports the SAME body and differences itself by ONE function — how its bindings arrive. **THE NAMESPACE IS
// UNMOVED** (`surface.md §2.9` item 1: ONE value-level name, `storeCreate`), the arity is the body's (`1`), and no
// byte of any construction, member or refusal moved.
export { storeCreate } from './src/entry/instance.mjs';

const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

adoptModuleContext(import.meta.url, require_, ADDON_PATH);
// ---------------------------------------------------------------------------------------------
// **⟶ AND THE CLASS-DECISION INSTRUMENT IS INSTALLED HERE, AT THE HEAD OF THE MODULE AND BEFORE ANY PART CAN
// CLASSIFY A SINGLE VALUE — 2026-11-17** (`D-156` item 1; `docs/L3/wasm-realm/design.md` §5). **THE NODE ARM'S
// INSTRUMENT IS `types.isProxy` ITSELF**, handed over as an arrow that reads it at call time, and the five parts
// that decide `DD-34`'s refusal (25 sites) reach it through `class-instrument.mjs`'s one predicate — **so every
// answer those sites take is the answer they took when each imported `node:util` directly: the instrument's HOME
// moved and the decision, its order and its answer did not.**
//
// **★ AND THIS LINE IS WHAT MAKES `isProxyOf`'S DEFAULT UNREACHABLE, WHICH IS THE WHOLE OF ITS DUTY.** Before an
// instrument is installed that predicate answers `false` — "not a `Proxy`" — for every value, which is a SILENT
// LOSS of the `DD-34` refusal and can let a trap run on a path that promises no trap does. **The default is `false`
// deliberately**: the other arm, refusing everything, refuses every value's prototype link, so no value crosses and
// no store can be constructed at all. **The entry's installation is therefore the thing that closes the gap, and it
// happens at the module's own evaluation, before any verb and before any part classifies anything.**
//
// **⟶ AND THE SETTER TAKES BOTH PREDICATES FROM 2026-11-17 — `D-167`.** The seam holds two questions now — the DATA
// one (`isProxyOf`: *does this value enter the Rust store?*) and the CARRIER one (`isProxyOfCarrier`: *is this the
// package's own `cfg`/listeners/constraints/commit carrier?*) — and **THE NODE ARM'S ANSWER TO BOTH IS
// `types.isProxy`, WHICH IS WHY THIS LINE CHANGES BY ONE ARGUMENT AND NOTHING ON THIS ARM MOVES BY A BYTE**: that
// predicate is precise here (it reads the exotic object's own internal slot, invokes no handler and throws for
// nothing), so every `Proxy` a carrier gate refused before this line changed is still refused, in the same form
// with the same message. **WHAT THE SECOND ARGUMENT BUYS IS NOTHING ON THIS ARM AND EVERYTHING ON THE OTHER**: it
// is the arm whose probe cannot answer the carrier question that must be able to answer it differently, and **an
// entry that installed only the data instrument would leave `isProxyOfCarrier` at its `false` default HERE, which is
// a silent loss of `DD-34` at every carrier gate** — so the setter requires both and this line passes both.
// ---------------------------------------------------------------------------------------------
installClassInstrument((value) => types.isProxy(value), (value) => types.isProxy(value));


// ---------------------------------------------------------------------------------------------
// **⟶ `copySegments` MOVED WITH ITS ONLY READER, 2026-11-01 (`D-99`'s ANSWERED clause; `C-17`, §9.2).**
// `D-35`'s READ HALF — the one copy of a caller-supplied address's segments, which replaced the two
// `addresses[i].slice()` sites a mutable prototype could answer — lived here because `listen`'s body lived
// here. **THE BODY IS `delivery.mjs`'s `listenOn` NOW, AND THE HELPER MOVED WITH IT, BYTE-FOR-BYTE, INTO THE
// SAME FILE**: one copy, one home, and no second implementation of one reach. **NOTHING IT DOES MOVES** — the
// same local index loop over the caller's own exotic `length` and its own indices, appending by `appendOwn`,
// answering a FRESH segment list — and no member of this module's namespace was ever this function.
// ---------------------------------------------------------------------------------------------
