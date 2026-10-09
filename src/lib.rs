//! `storeroom_native` — the native Rust store for `Provident-Storeroom` (`U-STOREROOM-NATIVE`).
//!
//! The crate's surface is the contract's declared Rust spelling (`docs/specs/storeroom-native/contract.md`
//! `§0.4`): the five record kinds (leaf, branch, anchor, link, registry), the shared resolver and the walk
//! (`§2`), the three verbs (`§3`–`§4`), the tiers and the purge chain (`§5`), the journal, the returned op,
//! the rollback and **the listener surface** (`§6`), the store's own persistence (`§7`) and the closed
//! fail-code set with its generated messages (`§8`).
//!
//! Every failure crosses as `Err(StoreError)` — Rust's spelling of `DD-24(b)`'s throw — and every message
//! is generated from its code and the failing trigger's arguments (`§8.2`).
//!
//! **⟶ AMENDED 2026-10-11 (THE LISTENER AMENDMENT, `A43`–`A58`).** The store's surface carries **one home
//! map** owning the listener data (`ListenersArg`/`Listener`/`ListenerHandle`), **`listen`/`unlisten`**
//! superseding the shipped `watch`/`unwatch` in ONE pass, and the two returned records' **`triggered`**
//! member. The listener's ORDER, its CALLBACK INVOCATION and a throwing body are still not this unit's:
//! **the store RETURNS the triggered listeners' handles and INVOKES NOTHING** — the CLIENT invokes
//! (`A57`), which is why `P-3`'s four subjects have no remaining subject here.
//!
//! `P-1` (the JS integration set: realm, builder/ABI path, packaging, host handoff, every value's crossing
//! into JS) is NOT implemented and no clause of this crate reaches it.

#![allow(non_snake_case)]

mod args;
mod error;
mod json;
mod records;
mod store;
mod value;

pub use args::{
    AddressArg, FilePathArg, JournalLengthArg, ListenerEntry, ListenersArg, OpIdArg, StoreConfig,
    TierArg, TierSetItem,
};
pub use error::{storeErrorMessage, MessageArgs, StoreError, CODES};
pub use records::{
    tier_token, BaseState, ChildAnchor, DeleteReceipt, JournalOp, JournalOpKind, Listener,
    ListenerHandle, NodeRef, RollbackResult, Tier, WriteResult,
};
pub use store::{storeCreate, Store};
pub use value::{Segment, StoreValue};
