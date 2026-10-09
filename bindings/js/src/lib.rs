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

#![allow(dead_code)]
#![allow(non_snake_case)]

pub mod crossing;
pub mod facade;
