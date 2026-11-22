//! `storeroom_js_binding` — `U-STOREROOM-JS`: the sibling crate of `package.md §4.1` (`A68`).
//!
//! **TWO HALVES, ONE CRATE** (`package.md §4.5` item 1):
//!
//! * **`crossing`** (`bindings/js/src/crossing.rs`) — **THE PURE-RUST CONVERSION CORE**, the `rlib` half's
//!   own surface, declared at `package.md §4.5`. **It is pure Rust: no `napi` type, no `napi-rs` macro, no
//!   `#[napi]` attribute and no Node-API symbol appears in it, at any depth** (`DD-2`).
//! * **`facade`** (`bindings/js/src/facade.rs`) — **THE NODE-API EXPORT FACADE**, the `cdylib` half: the
//!   internal artefact `package.md §1.2` reaches through the package's own `createRequire`-style step.
//!   Its methods are thin (`§4.5` item 6): each converts a Node-API value into the core's model, calls the
//!   core and translates the core's answer back.
//!
//! **THE STORE'S PUBLIC SURFACE IS CITED AND NEVER AMENDED** (`package.md §4.1` item 4): this crate reaches
//! the store only through the single path dependency of `§4.2` item 3.

// =================================================================================================
// ⟶ THE TARGET SPLIT — ADDED 2026-11-17, AND IT IS `docs/L3/wasm-realm/design.md` §2's OWN CLAUSE,
// VERBATIM: *"`lib.rs` gains a target split the plan did not name: `crossing` stays `pub` and realm-pure;
// `facade`/`codec` are `#[cfg(not(target_arch = "wasm32"))]`; `wasm` is `#[cfg(target_arch = "wasm32")]`."*
//
// **THE DECLARATIONS BELOW ARE THAT SENTENCE READ AT ITS BYTES, AND EACH ONE MOVES NO ITEM**:
// `crossing` keeps the visibility and the bytes it always had — **the wire model is realm-pure and it is
// what makes the second claimed realm tractable at all** (`design.md` §1: the instance's fifteen members and
// `cfg`'s six keys are the package's, so *"the crossing may be shaped freely beneath them"*); `facade` and
// `codec` keep theirs and gain the `not(wasm32)` predicate, because every byte of both names a Node-API
// symbol (`facade.rs`'s `#[napi]` entries and `Env`, `codec.rs`'s `napi::bindgen_prelude` imports and its
// `cast::<…>` sites) and no one of them can compile on an arm that has no Node-API at all.
//
// **AND THE PAIR STANDS BESIDE THEM RATHER THAN INSIDE EITHER**: `wasm` is the second realm's `cdylib`
// half — the six entries of `bindings/js/src/wasm.rs` — and `wasm_codec` is ITS conversion layer, the twin
// `codec.rs` is the specification of. **`codec`'s visibility ruling CROSSES UNMOVED AND IS RE-STATED RATHER
// THAN RE-DERIVED**: the conversion layer is an implementation detail of the boundary's own thin frames, so
// it is `pub(crate)` on both arms and the crate's declared surface is `pub` on exactly the two modules the
// first paragraph names plus the wasm arm's own entries. **NO RE-EXPORT NAMES A FACADE OR A CODEC SYMBOL**,
// so the predicate moves no second declaration: this module declares modules and nothing else.
//
// **THE NATIVE BUILD IS BYTE-IDENTICAL IN BEHAVIOUR, AND THAT IS THE PREDICATE'S WHOLE CLAIM**: for every
// target the host compiles, `cfg(not(target_arch = "wasm32"))` is true, so the module set, the item set,
// the export table and every declared arity are exactly what they were before this clause existed.
// =================================================================================================

// =================================================================================================
// THE CRATE'S TWO `allow` ATTRIBUTES, RULED ONE BY ONE AT THE DEAD-SURFACE SWEEP
// (`docs/open-items-review.md` `§2` row 4's class, swept wide).
//
// **`#![allow(dead_code)]` IS DELETED, AND WITH IT THE MASK OVER THIS CRATE'S OWN TREE.** It stood here with
// nothing left to silence: the dead surface it had been covering is GONE, each item named at its own
// deletion site in `facade.rs` — **`napi_is_exception_pending`**, the review's own row 4 subject, declared
// and named by no live path; **`napi_has_named_property`**, declared and named only by the `Codec::member`
// sentence recording that it had ceased to be the gate; **`js_undefined`** and **`handle_token`**, two
// helpers with no caller. **The deletion is the point: with the `allow` gone, a declaration that no live
// path names FAILS THE BUILD instead of passing it** (measured: this crate's `cargo build` prints ZERO
// `dead_code` warnings, which is what licenses the removal).
//
// **`#![allow(non_snake_case)]` STAYS, AND IT CANNOT BE DELETED — IT IS LOAD-BEARING.** It silences FOUR live
// warnings on the copy-OUT records' own member spelling: `JsJournalOp::opId` (`crossing.rs`), and
// `JsRollbackResult::opId` / `::undoneOps` / `::restoredTo` — **and those are the WIRE'S member names, not
// this crate's private ones.** They are the `crossing.md`/`surface.md`-declared record members the package
// reads by that exact spelling (`README.md`'s table: `rollback` answers `{opId, undoneOps, restoredTo}`), so
// renaming them to `op_id`/`undone_ops`/`restored_to` would break the wire to satisfy a lint. **Declared
// rather than hidden: the `allow` is the one attribute this crate cannot do without, and this is why.**
// =================================================================================================
#![allow(non_snake_case)]

pub mod crossing;

#[cfg(not(target_arch = "wasm32"))]
pub mod facade;

#[cfg(target_arch = "wasm32")]
pub mod wasm;

// =================================================================================================
// `codec` — THE FACADE'S CONVERSION CORE, DECLARED `pub(crate)` AND NOT `pub`
// (`U-STOREROOM-ADDON-ADOPTION`'s facade split).
//
// **THE TWO HALVES ABOVE KEEP THE VISIBILITY THEY WERE DECLARED WITH AND THIS DECLARATION DOES NOT TOUCH
// THEM**: `crossing` is the crate's pure-Rust surface (`package.md §4.5` item 1) and `facade` is the `cdylib`
// half, and both are reached as such. **THE THIRD MODULE IS NEITHER.** `codec` holds the wire's decided tree
// and the `Codec` that converts it in both directions — an implementation detail of the facade's own thin
// methods (`§4.5` item 6) — so its declaration is `pub(crate)`: **it is visible to the sibling that uses it
// and to no consumer of the crate.**
//
// **THE SPLIT IS A PURE MOVE AND THIS LINE IS THE WHOLE OF ITS DECLARATION** (`bindings/js/src/codec.rs`):
// the `Codec`, both `impl` blocks and their own documentation blocks crossed byte-for-byte; **the four
// conversion helpers and the `JsVal` alias crossed with them, so `facade.rs` imports the primitives from
// `codec` and `codec` imports NOTHING from `facade`** — `NapiRet` alone stayed behind, because the codec
// never named it; and `crossing.rs` was not touched at all — it is still the pure half, and this crate's
// dependency on it runs one way.
//
// **⟶ AND IT IS NODE-API-BOUND, SO IT IS THE FIRST OF THE TWO MODULES THE `not(wasm32)` PREDICATE NAMES**:
// its imports are `::napi::bindgen_prelude`'s, its casts are `cast::<…>` at twelve audited `unsafe` sites,
// and its `Codec` holds an `Env`. The second realm's conversion layer is `wasm_codec`, declared below on the
// opposite predicate, and **neither arm names the other**.
// =================================================================================================
#[cfg(not(target_arch = "wasm32"))]
pub(crate) mod codec;

// =================================================================================================
// ⟶ `wasm` AND `wasm_codec` — ADDED 2026-11-17, THE SECOND CLAIMED REALM'S TWO MODULES
// (`D-154` item 1; `D-155` items 1–3; `docs/L3/wasm-realm/design.md` §§1–4).
//
// **`wasm` IS THE ENTRY LAYER, AND ITS FORM IS THE DESIGN'S OWN: FREE FUNCTIONS, EACH TAKING THE HANDLE
// FIRST** (`design.md` §1's ruling and its three grounds: the receiver is DATA here, a `#[wasm_bindgen]`
// method called detached raises a raw host `TypeError` where `store_index_of` answers one declared form, and
// `withAddon()` hands out a module object of free functions). They are `pub` because `#[wasm_bindgen]`'s
// exports are the artefact's surface, exactly as `facade`'s `pub #[napi]` frames are the first arm's.
//
// **`wasm_codec` IS THE CONVERSION LAYER AND ITS VISIBILITY IS `codec`'s OWN RULING, RE-APPLIED**: an
// implementation detail of the entries' thin frames, reached by them and by no consumer of the crate. **IT
// IS NOT `pub`, AND THAT IS THE SAME SENTENCE `codec` CARRIES ABOVE** — a `pub(crate)` module crosses the
// module seam and stops at the crate's edge, so the artefact's export set is the six entries and no item
// beside them.
//
// **THE PAIR SITS ON THE OPPOSITE SIDE OF ONE PREDICATE FROM THE OTHER TWO, AND THE PREDICATE IS THE WHOLE
// OF THE SPLIT**: `crossing` is on neither side because it is on both.
// =================================================================================================
#[cfg(target_arch = "wasm32")]
pub(crate) mod wasm_codec;

// =================================================================================================
// THE EXPORT TABLE IS THE LIBRARY'S OWN AND THIS MODULE BUILDS NONE —
// `U-STOREROOM-ADDON-ADOPTION`, `binding-crate-and-abi.md §2`'s deletion table, rows 4–5
//
// **WHAT STOOD HERE AND IS GONE: the hand-built `entry_table()` naming the five callbacks, the
// `declare_exports(env, exports)` frame that ran the manual registration inside the library's hook, the
// `#[no_mangle] pub extern "C" fn storeroom_js_binding_declare_exports()` loader, the extern-linkage
// `STOREROOM_JS_BINDING_DECLARE_EXPORTS` static, and the `.init_array` / `__DATA,__mod_init_func` /
// `.CRT$XCU` initialiser-array slot that carried it — together with every `::napi::sys` mention this
// module made. THE LIBRARY'S OWN REGISTRATION TAKES THEIR PLACE** (`contract.md §2` items 2–3).
//
// **AND THE MECHANISM WAS THERE ONLY BECAUSE THE ANNOTATION WAS ABSENT, WHICH IS THE WHOLE OF WHY IT WAS
// DELETABLE.** The initialiser array existed to run a *user-supplied* registration hook BEFORE the
// runtime's registration symbol fired, because a table built by hand has to be declared into the hook by
// hand. `#[napi]` does not work that way: the derive emits its own `ctor`-registered collector and its own
// `napi_register_module_v1`, so the five names are collected from the annotated functions themselves and
// the ordering the initialiser array was engineering is the library's business rather than this crate's.
// **⟶ RE-MEASURED AND RE-STATED 2026-10-26: THE REBUILT ARTEFACT EXPORTS THIRTEEN, AND `call` IS NOT ONE
// OF THEM.** A live `require` of it answers all thirteen (`binding-crate-and-abi.md §4`), and the set is
// **the `4` STANDING ENTRIES PLUS THE `9` PER-VERB ENTRIES** — `storeCreate` · `register` · `version` ·
// `errorMessage` · `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` ·
// `removeListener` · `commitFile` (`4 + 9 = 13` ✓). **`call` IS ABSENT**: the package's `addon.call(...)`
// dispatcher was DELETED at `export-set-and-dispatch.md §2` — *"`call` IS DELETED … the split is precisely
// its replacement"* — and the nine per-verb entries are what replaced it. **THE `5` THIS PARAGRAPH AND THE
// ONE ABOVE IT PRINTED WAS TRUE WHEN EACH WAS WRITTEN** (`A145`'s adoption, 2026-10-21, landed `#[napi]` over
// a hand-built table of five) **AND WAS NEVER RE-DERIVED WHEN THE ADDON-SURFACE SPLIT RE-CUT THE BOUNDARY
// `5 → 13`**; the kept row of record is `docs/specs/storeroom-addon-surface/contract.md`'s `P-SAS-1`
// (*"the addon's export set is exactly the thirteen declared names — `4` standing plus `9` per-verb — and
// `call` is absent"*), and the addon's own battery asserts the retired entry absent by its exact symbol.
//
// **THE THIRTEEN KEEP THEIR NAMES AND ARITIES**, and their annotations stand at their own declarations in
// `facade.rs`. **A name no annotation registers is not exported**, which is what makes `P-ADA-6`'s symbol
// read a check of the artefact rather than of a list.
//
// **`napi_register_module_v1` REMAINS, AND IT IS THE LIBRARY'S** (`binding-crate-and-abi.md §4` item 1):
// it is the unavoidable runtime registration symbol, now emitted by `napi-derive` in place of the
// hand-declared one this module's deleted block used to reach through its hook.
//
// **⟶ AND ON THE WASM ARM THE PARAGRAPH ABOVE IS NOT REACHED AT ALL**: `facade` is absent there, so the
// `#[napi]` collector and `napi_register_module_v1` are absent with it, and the artefact's export set is
// `#[wasm_bindgen]`'s — **the six entries `wasm.rs` declares and the glue's own `initSync`, and nothing
// beside them** (`design.md` §6's `18`-name set is the arm's later cut; this slice declares the six the
// `saveCall` path needs).
// =================================================================================================
