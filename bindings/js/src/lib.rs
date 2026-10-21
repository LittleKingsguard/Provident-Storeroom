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
pub mod facade;

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
// =================================================================================================
pub(crate) mod codec;

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
// **Measured after the deletion, not assumed: the rebuilt artefact still exports exactly the five, and a
// live `require` of it still answers all of them** (`binding-crate-and-abi.md §4`).
//
// **THE FIVE ENTRY FUNCTIONS KEEP THEIR NAMES AND ARITIES** — `version` · `errorMessage` · `storeCreate` ·
// `call` · `register` — and their annotations stand at their own declarations in `facade.rs`. **A name no
// annotation registers is not exported**, which is what makes `P-ADA-6`'s symbol read a check of the
// artefact rather than of a list.
//
// **`napi_register_module_v1` REMAINS, AND IT IS THE LIBRARY'S** (`binding-crate-and-abi.md §4` item 1):
// it is the unavoidable runtime registration symbol, now emitted by `napi-derive` in place of the
// hand-declared one this module's deleted block used to reach through its hook.
// =================================================================================================
