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
