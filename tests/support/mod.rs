//! `tests/support/mod.rs` — the red set's ONE scaffolding module for `U-STOREROOM-NATIVE` (gate 3).
//!
//! **WHAT THIS MODULE IS.** Every red-set file under `tests/` includes this module (`mod support;`) and
//! reaches the store's surface through the single `pub use` below, so that the crate's id, the verb
//! spellings and the argument spellings the contract's JS-shaped clauses require in Rust are fixed in
//! **exactly one place**. A later pass that renames any of them edits this file and nothing else.
//!
//! **THE SURFACE SPELLINGS ARE NO LONGER ASSUMPTIONS: THEY ARE DECLARED, AND `contract.md §0.4` IS THEIR
//! AUTHORITY** — *"each of those names needs exactly ONE declared Rust spelling, and the declaration belongs
//! in the CONTRACT and not in a test file — otherwise the implementer invents one spelling and the red set
//! assumes another"* (`§0.4`), and *"every item in the table above is re-exported from the crate root, and
//! the red set reaches them through `tests/support/mod.rs`'s single `pub use`"* (`§0.4`'s closing clause;
//! the layout is `implementation-plan.md §1.1`: the crate at the repository root, the red set at
//! `tests/**`, `use storeroom_native::…`). **This table therefore MIRRORS `§0.4`'s table, row for row**, and
//! the clause column names the clause each spelling's ITEM is declared by:
//!
//! **⟶ RE-DERIVED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT).** **The
//! `watch`/`unwatch`/`WatchHandle` rows are **SUPERSEDED** and their spellings are **NOT** re-exported any
//! more** (`A58`: *"Watch is a stopgap for the listener implementation"*; `write-and-read.md §6.5`'s
//! supersession clause, clause 1: *"the verbs are superseded, not deleted … ONE pass lands the
//! replacement"*), **and the listener surface's spellings and the amended return shapes are reached through
//! this module's `pub use` in their place** (`contract.md §0.4`'s five added rows; `DD-35`).
//!
//! | Rust spelling (per `§0.4`) | The contract thing it spells | Clause |
//! | --- | --- | --- |
//! | crate id `storeroom_native` | `crate/**` (the unit's crate) | `contract.md §0.4`; `implementation-plan.md §1.1` |
//! | `Store`, `storeCreate(&StoreConfig)` | `Store`, `storeCreate(cfg)` | `seams-and-lifecycle.md` §7.1 |
//! | `Store::{write,read,readLiteral,delete,findAddress,rollback}` | the verbs, verbatim in the contract's own spelling | `write-and-read.md` §3.1, §4.1, §4.3, §6.3; `store-model.md` §2.1 |
//! | `Store::{listen,unlisten}` | **⟶ the listener surface's two verbs, which SUPERSEDE `watch`/`unwatch`** | `write-and-read.md` §6.5 (items 8, 10, 12); `contract.md §0.4` |
//! | `StoreConfig::{filePath,journalLength,listeners}` | **⟶ the closed THREE-member construction config, `filePath` OPTIONAL and `listeners[]` ADDED** | `contract.md §0.4`; `seams-and-lifecycle.md §7.1` |
//! | `ListenersArg::{List,Absent,Null,Undefined,NonArray}` · `ListenerEntry::{Entry{address,handle},Other}` | **⟶ the construction's `listeners[]` array and its `{ address, handle }` element shape** | `seams-and-lifecycle.md §7.1`; `parameter-semantics.md §2.12` |
//! | `ListenerHandle` (opaque; the successor of `WatchHandle`) | **⟶ the listener's handle — what a trigger RETURNS and what `unlisten` accepts** | `write-and-read.md` §6.5 (item 12); `parameter-semantics.md §2.13` |
//! | `WriteResult.{op,watched,triggered}` · `DeleteReceipt.{address,tiers,triggered}` | **⟶ the amended return shapes: `watched` KEEPS the addresses and `triggered` carries the HANDLES** | `write-and-read.md` §3.6, §4.4; `DD-35` |
//! | `Tier::{File,Mem,Temp}` with `rank` `2/1/0` | the three ranked tokens | `contract.md` §5.1 `M-1` |
//! | `StoreValue::{Str,Bool,Num,Object,Array}` | §1.4's admitted four classes | `store-model.md` §1.4 |
//! | `StoreValue::{Null,Undefined,Function,Symbol,BigInt,NonFinite,Cyclic,NonPlainCollection}` | §1.4's outside classes, spelled so each is reachable (`P-TP-9`'s "no member is unreachable") | `store-model.md` §1.4; `seams-and-lifecycle.md` §8.1 #13 |
//! | `Segment::{Key,Index}` + the outside-segment variants | §1.5 item 1's closed segment domain and its outside list | `store-model.md` §1.5 |
//! | `TierArg` (absent · single token · array of n · token outside the domain · null/undefined/non-string/object) | §3.1.1's ARITY TABLE, cell by cell — a permissive argument type is REQUIRED or the write's and delete's array/absent fail-states are unreachable | `write-and-read.md` §3.1.1; `parameter-semantics.md` §2.2–§2.4 |
//! | `AddressArg`, `OpIdArg`, `FilePathArg`, `JournalLengthArg` | `PAR-1` / `PAR-10` / `PAR-6` / `PAR-7`'s domain + outside-value lists | `parameter-semantics.md` §2.1, §2.6, §2.7, §2.10 |
//! | `StoreError { status, message }` reached as `Err(StoreError)` | `StoreError`'s closed two-member record, "delivered by THROWING" — Rust's only spelling of a throw at a call boundary | `seams-and-lifecycle.md` §8.3; `contract.md` §0.2 `DD-24(b)` |
//! | `WriteResult.op` / `.watched: Vec<Vec<Segment>>` | `§3.6`'s members; `watched` is the watched **addresses** of `P-TP-8`/§6.5, not the `string[]` spelling §3.6 prints | `write-and-read.md` §3.6; `contract.md` §5.8 |
//! | `NodeRef.anchor.{key,tier}` | `P-SM-4`(a)'s own observable, `findAddress(address, t).anchor.tier === t` | `contract.md` §5.4 (a) |
//! | `JournalOp.{opId,kind,address,tier,before,after,seq,compacted}`, `BaseState.{present,value}` | §6.2's closed record shapes (`BaseState`'s `value | value[]` is spelled as a `StoreValue::Array` in the multi-value case) | `write-and-read.md` §6.2 |
//! | `DeleteReceipt.{address,tiers}`, `RollbackResult.{opId,undoneOps,restoredTo}` | the two receipt/result records (**the delete's receipt gains `triggered` — see the amended row above**) | `write-and-read.md` §4.4, §6.3 |
//! | `tier_token(Tier) -> &'static str` (reached through this module's `pub use`, never re-declared here) | §5.1's token column, **a declared surface item** | `contract.md §0.4` |
//!
//! **WHERE THIS MODULE'S CALL SITES DIVERGE FROM `§0.4`'s DECLARED TYPES, NAMED SO IT IS A FINDING AND NOT A
//! SILENT ASSUMPTION** (reported at gate 3 as `CONTRACT FINDING` `G-1`): **`§0.4` declares
//! `AddressArg::{List(Vec<Segment>), Absent, Null, Undefined, Str(String)}`** — which carries no variant for
//! **`PAR-1`'s non-array classes `number`, `boolean`, `object`, a function** (whose declared answer is
//! `AddressMalformed`, `parameter-semantics.md §2.1`; `§8.1` #1) — **and
//! `TierSetItem::{Token(Tier), Other(String), Null, Undefined, Object}`, which carries no variant for
//! `PAR-2`'s *"a non-string member of the array"* other than `null`/`undefined`/an object**
//! (`parameter-semantics.md §2.2`). **The red set's drives for those declared outside values are therefore
//! authored against the only spellings that reach them, and cannot compile against `§0.4`'s enumerated set
//! until the amendment declares them** — reported, never silently dropped.
//! **Where `§0.4` declares ONE unit variant for a class this red set used to spell per-type —
//! `TierArg::NonString` and `FilePathArg::NonString` — the red set now uses `§0.4`'s single declared
//! spelling, so those drives assert the CLASS's declared answer once per class.**
//!
//! **⟶ RE-DERIVED 2026-10-11 — THE HANDLE'S SPELLING THIS PASS'S DRIVES REACH, NOW DECLARED BY THE
//! CONTRACT AND NOT ASSUMED** (the gate-3 `CONTRACT FINDING` `G-2` is CLOSED by the spec fix): **`§0.4`'s
//! construction-rule clause 1 NOW DECLARES the spelling** — *"THE TYPE IS A NEWTYPE OVER AN OPAQUE TOKEN,
//! PUBLICLY CONSTRUCTIBLE, AND ITS FIELDS ARE PRIVATE … it carries ONE infallible public constructor from a
//! string token — spelled `ListenerHandle::from(token: &str)`"* — **and `write-and-read.md §6.5` item 12 (a)
//! states the same rule beside it** (*"`ListenerHandle` is a NEWTYPE OVER AN OPAQUE TOKEN with PRIVATE
//! fields and ONE infallible public constructor from a string token (`ListenerHandle::from`), and it
//! carries `Clone` + `PartialEq` + `Eq` + `Debug`"*). **The two clauses that make a CALLER-SPELLED handle
//! necessary are the declared ones:** **(a) `seams-and-lifecycle.md §7.1` step 5 with `PAR-12` (`DD-39`)
//! require the construction's `listeners[]` to carry `{ address, handle }` records whose `handle` the
//! construction ADOPTS VERBATIM — the caller supplies a handle before any instance of that store exists, so
//! it cannot have been minted by that instance — `§0.4` clause 2 (b)**); **and (b) `PAR-13`'s outside-value
//! list names *"a value the store never minted at all (fabricated)"*, whose declared answer (a no-op success
//! at `unlisten`) is assertable only because a fabricated handle is SPELLABLE (`§0.4` clause 3).** **The drives
//! below therefore reach those two states through the ONE declared spelling —
//! `ListenerHandle::from("…")` — and through the `Clone` + `PartialEq` the same clause declares** (the
//! shipped `WatchHandle`'s own derives, `§6.5` item 12 calling the listener's handle *"the successor of the
//! shipped `WatchHandle`"*). `tests/construction.rs` and `tests/watched_addresses.rs` name the states they
//! reach this way.**
//!
//! **NO EXPECTATION IN THE RED SET IS DERIVED FROM THIS MODULE.** Every value asserted at a call site comes
//! from the contract's `§`-numbered clause named in that test's own comment. This module supplies only
//! spellings, fixtures and the property-layer `Drive` engine.
#![allow(dead_code, non_snake_case)]

pub use storeroom_native::{
    storeCreate, tier_token, AddressArg, BaseState, ChildAnchor, DeleteReceipt, FilePathArg,
    JournalLengthArg, JournalOp, JournalOpKind, Listener, ListenerEntry, ListenerHandle,
    ListenersArg, NodeRef, OpIdArg, RollbackResult, Segment, Store, StoreConfig, StoreError,
    StoreValue, Tier, TierArg, TierSetItem, WriteResult,
};

use std::collections::BTreeMap;

// ---------------------------------------------------------------------------------------------------
// §5.1 `M-1` — the rank is total and strict; the canonical order is `file`, `mem`, `temp`.
// ---------------------------------------------------------------------------------------------------

/// `contract.md` §5.1 `M-1`: `rank(file) = 2 > rank(mem) = 1 > rank(temp) = 0`.
pub fn rank(t: Tier) -> u8 {
    match t {
        Tier::File => 2,
        Tier::Mem => 1,
        Tier::Temp => 0,
    }
}

/// §5.1's canonical order — descending persistence, the order every printed list in the contract uses.
pub fn canonical_tiers() -> [Tier; 3] {
    [Tier::File, Tier::Mem, Tier::Temp]
}

// §5.1's token spelling is `§0.4`'s DECLARED surface item `tier_token(Tier) -> &'static str`, reached
// through this module's `pub use` above — the contract declares the spelling, so the red set no longer
// re-declares it (a rename is one edit at `§0.4`'s table plus this `use` list, `§0.4`'s closing clause).

// ---------------------------------------------------------------------------------------------------
// Addresses — `store-model.md` §1.5's segment grammar.
// ---------------------------------------------------------------------------------------------------

/// A key-only address: `key(&["a","b"])` is `["a","b"]` (§1.5 item 1).
pub fn key(parts: &[&str]) -> Vec<Segment> {
    parts.iter().map(|p| Segment::Key((*p).into())).collect()
}

/// The empty address — a VALID address that resolves to the REGISTER (`§1.5` item 4, `L-0`).
pub fn empty_address() -> Vec<Segment> {
    Vec::new()
}

/// An index segment (`§1.5` item 1: a non-negative integer).
pub fn idx(i: u64) -> Segment {
    Segment::Index(i)
}

// ---------------------------------------------------------------------------------------------------
// Values — `store-model.md` §1.4's admitted taxonomy and its outside classes.
// ---------------------------------------------------------------------------------------------------

pub fn v_str(s: &str) -> StoreValue {
    StoreValue::Str(s.into())
}
pub fn v_bool(b: bool) -> StoreValue {
    StoreValue::Bool(b)
}
pub fn v_num(n: f64) -> StoreValue {
    StoreValue::Num(n)
}
/// A plain JSON object — §1.4 class 4. A `BTreeMap` makes object equality key-order-insensitive by
/// construction, which is what §5.2's `P-IM-1` failure list demands ("an object's key order counted as
/// significant" FAILS the row).
pub fn v_obj(pairs: &[(&str, StoreValue)]) -> StoreValue {
    let mut m = BTreeMap::new();
    for (k, v) in pairs {
        m.insert((*k).to_string(), v.clone());
    }
    StoreValue::Object(m)
}
pub fn v_arr(items: Vec<StoreValue>) -> StoreValue {
    StoreValue::Array(items)
}
/// §1.4's outside classes, each a write-time `ValueNotAdmitted` rather than a silent coercion.
pub fn v_null() -> StoreValue {
    StoreValue::Null
}
pub fn v_undefined() -> StoreValue {
    StoreValue::Undefined
}
pub fn v_function() -> StoreValue {
    StoreValue::Function
}
pub fn v_symbol() -> StoreValue {
    StoreValue::Symbol
}
pub fn v_bigint() -> StoreValue {
    StoreValue::BigInt(9_007_199_254_740_993)
}
pub fn v_nan() -> StoreValue {
    StoreValue::NonFinite(f64::NAN)
}
pub fn v_infinity() -> StoreValue {
    StoreValue::NonFinite(f64::INFINITY)
}
pub fn v_neg_infinity() -> StoreValue {
    StoreValue::NonFinite(f64::NEG_INFINITY)
}
pub fn v_cyclic() -> StoreValue {
    StoreValue::Cyclic
}
pub fn v_non_plain_collection() -> StoreValue {
    StoreValue::NonPlainCollection
}

/// §5.2 `P-IM-1`'s strategy `S-RT`: "compare with a structural-equality predicate". Object key order is
/// not significant (`S-RT`'s failure list), and the assumed object spelling is a sorted map, so equality
/// over the value type IS that predicate.
pub fn structurally_equal(a: &StoreValue, b: &StoreValue) -> bool {
    a == b
}

// ---------------------------------------------------------------------------------------------------
// Tier / address / value arguments — §3.1.1's arity table and `PAR-n`'s outside-value lists.
// ---------------------------------------------------------------------------------------------------

/// `TierArg::Token(Mem)` — the write's, the delete's and the read's legal single-token spelling.
pub fn t(t: Tier) -> TierArg {
    TierArg::Token(t)
}
/// The WRITE's own tier (`§3.1`: exactly one token).
pub fn w_mem() -> TierArg {
    TierArg::Token(Tier::Mem)
}
pub fn w_file() -> TierArg {
    TierArg::Token(Tier::File)
}
pub fn w_temp() -> TierArg {
    TierArg::Token(Tier::Temp)
}
/// `§3.1.1`'s "`tier` absent" column.
pub fn none() -> TierArg {
    TierArg::Absent
}
/// An any-match SET of tiers — legal on read/findAddress/watch (§3.1.1).
pub fn set(tiers: &[Tier]) -> TierArg {
    TierArg::Set(tiers.iter().map(|x| TierSetItem::Token(*x)).collect())
}
/// The empty set — `§3.1.1`'s "array of 0 tokens" column.
pub fn set_empty() -> TierArg {
    TierArg::Set(Vec::new())
}

/// The tier-argument spellings whose declared answer each red-set test cites.
pub fn outside_token(spelling: &str) -> TierArg {
    TierArg::OtherToken(spelling.into())
}

// ---------------------------------------------------------------------------------------------------
// Fixtures — a fresh store per test, on a path only that test uses.
// ---------------------------------------------------------------------------------------------------

fn unique_path(tag: &str) -> String {
    use std::sync::atomic::{AtomicUsize, Ordering};
    static N: AtomicUsize = AtomicUsize::new(0);
    let n = N.fetch_add(1, Ordering::SeqCst);
    let mut p = std::env::temp_dir();
    p.push(format!(
        "snst-gate3-{}-{}-{}.json",
        std::process::id(),
        n,
        tag
    ));
    p.to_string_lossy().into_owned()
}

/// A config with the path present and valid and **an EMPTY `listeners[]` array** — `seams-and-lifecycle.md`
/// §7.1's amended construction: the third member is REQUIRED (absent → `AddressMalformed`, `PAR-12`) and the
/// EMPTY array is IN its domain and is *"the ordinary no-listener store"* (`DD-39`). The argument is spelled
/// through `§0.4`'s DECLARED variants (`FilePathArg::Path`, `ListenersArg::List`), not through an assumed
/// `From<&str>` conversion: `§0.4` declares the variants and nothing else.
pub fn cfg_at(path: &str, journal_length: u32) -> StoreConfig {
    cfg_at_with_listeners(path, journal_length, ListenersArg::List(Vec::new()))
}

/// `§7.1`'s amended table, cell by cell — the construction config with all THREE members, each through its
/// own declared spelling. **`§0.4`'s `StoreConfig` is CLOSED at these three** (`§7.1`: *"a third key is
/// UNREPRESENTABLE"*), so every red-set literal names all three.
pub fn cfg_full(
    file_path: FilePathArg,
    journal_length: JournalLengthArg,
    listeners: ListenersArg,
) -> StoreConfig {
    StoreConfig {
        filePath: file_path,
        journalLength: journal_length,
        listeners,
    }
}

/// A path-present config carrying a caller-supplied listener array (`§7.1` step 5; `A56`).
pub fn cfg_at_with_listeners(
    path: &str,
    journal_length: u32,
    listeners: ListenersArg,
) -> StoreConfig {
    cfg_full(
        FilePathArg::Path(path.into()),
        JournalLengthArg::Count(journal_length),
        listeners,
    )
}

/// **`⟶` `filePath` ABSENT — now LEGAL, and the register is created at `mem`** (`A49`; `§7.1`'s amended
/// `filePath` row: *"ABSENT → LEGAL, the register is created at `mem`"*; `store-model.md §1.6` item 4 (d)).
pub fn cfg_no_path(journal_length: u32) -> StoreConfig {
    cfg_no_path_with_listeners(journal_length, ListenersArg::List(Vec::new()))
}

/// The pathless construction carrying a caller-supplied listener array (`DD-39`; `A56`).
pub fn cfg_no_path_with_listeners(journal_length: u32, listeners: ListenersArg) -> StoreConfig {
    cfg_full(
        FilePathArg::Absent,
        JournalLengthArg::Count(journal_length),
        listeners,
    )
}

/// A fresh store whose register stands at `file` (the path is provided and passes the two-armed reachability
/// test, `A52`/`A55`) — the shipped fixture, unchanged in effect.
pub fn new_store() -> Store {
    storeCreate(&cfg_at(&unique_path("s"), 8))
        .expect("§7.1: the three arguments valid — an instance is returned")
}

/// A fresh store whose journal bound the caller pins (`§6.1` item 4, `PAR-7`).
pub fn new_store_with_journal(n: u32) -> Store {
    storeCreate(&cfg_at(&unique_path("j"), n))
        .expect("§7.1: the three arguments valid — an instance is returned")
}

/// **⟶ A fresh store with NO path — its register's tier is FIXED AT CREATION at `mem`** (`A49`/`A50`;
/// `store-model.md §1.6` item 4 (d)), **so the `file` tier is UNREACHABLE at register keys and, through the
/// monotonic chain, at every address below them** (`A51`; `§5.6`'s `P-TP-6` row).
pub fn new_mem_store() -> Store {
    storeCreate(&cfg_no_path(8)).expect("§7.1: an ABSENT path is legal — no instance is refused")
}

/// The same, with the journal bound pinned (`PAR-7`).
pub fn new_mem_store_with_journal(n: u32) -> Store {
    storeCreate(&cfg_no_path(n)).expect("§7.1: an ABSENT path is legal")
}

// ---------------------------------------------------------------------------------------------------
// The listener amendment's own fixtures — §7.1's `listeners[]` array, the listener record and the handle.
// ---------------------------------------------------------------------------------------------------

/// `PAR-12`/`§7.1` step 5: one `listeners[]` entry — the closed `{ address, handle }` record (`A57`).
pub fn entry(address: Vec<Segment>, handle: ListenerHandle) -> ListenerEntry {
    ListenerEntry::Entry { address, handle }
}

/// **The caller-supplied `ListenerHandle` spelling this red set reaches — `contract.md §0.4`'s
/// construction-rule clause 1**: `ListenerHandle::from(token: &str)`, the ONE infallible public constructor
/// of an otherwise OPAQUE type with private fields, declared there and re-stated at `write-and-read.md §6.5`
/// item 12 (a). (The gate-3 `CONTRACT FINDING` `G-2` is CLOSED by that declaration.)
pub fn handle(tag: &str) -> ListenerHandle {
    ListenerHandle::from(tag)
}

/// The construction's `listeners[]` argument, through `§0.4`'s declared variant (`ListenersArg::List`).
pub fn listeners(entries: Vec<ListenerEntry>) -> ListenersArg {
    ListenersArg::List(entries)
}

/// A fresh path for a test that must observe the `file` bytes or the boot load.
pub fn fresh_path(tag: &str) -> String {
    unique_path(tag)
}

/// A valid `filePath` argument (`§7.1`: a non-empty string, required).
pub fn p_path(s: &str) -> FilePathArg {
    FilePathArg::Path(s.into())
}

/// A valid `journalLength` argument (`§7.1`: a positive integer, required).
pub fn n_count(n: u32) -> JournalLengthArg {
    JournalLengthArg::Count(n)
}

// ---------------------------------------------------------------------------------------------------
// Result plumbing.
// ---------------------------------------------------------------------------------------------------

/// The failure, or a panic naming the clause that was being driven.
pub fn failure<T>(r: Result<T, StoreError>, clause: &str) -> StoreError {
    match r {
        Ok(_) => panic!("{clause}: the contract declares a failure here; the call succeeded"),
        Err(e) => e,
    }
}

pub fn ok<T>(r: Result<T, StoreError>, clause: &str) -> T {
    match r {
        Ok(v) => v,
        Err(e) => panic!(
            "{clause}: the contract declares success here; got status {}",
            e.status
        ),
    }
}

/// `seams-and-lifecycle.md` §8.3: `status` is the member's EXACT spelling from §8.1's `code` column.
pub fn assert_code(e: &StoreError, expected: &str, clause: &str) {
    assert_eq!(e.status, expected, "{clause}: §8.3's exact status spelling");
}

/// The **`15`** members of `§8.1`'s CLOSED code set, in its own rank order (`contract.md`/`seams-and-lifecycle.md`
/// §8.1 — **⟶ AMENDED 2026-10-11: the as-filed array carried `14` members and the listener amendment's
/// `FilePathUnreachable` (`A53`/`A54`) is inserted at rank `13` in the CONSTRUCTION GROUP, so
/// `ValueNotAdmitted` and `FileCommitFailed` move by ONE rank each (`14`, `15`) and no trigger moves**
/// (`11 + 2 + 1 + 1 = 15` ✓; `DD-40`)).
pub const CLOSED_CODES: [&str; 15] = [
    "AddressMalformed",
    "AddressNotFound",
    "LeafHasNoDownstream",
    "TierNotFound",
    "OutOfDomainTier",
    "ParentAnchorMonotonicityViolation",
    "ContainerKindConflict",
    "ReadTargetIsBranch",
    "WriteParentNotLink",
    "JournalOpUnknown",
    "RollbackCompacted",
    "ConstructionArgumentMissing",
    "FilePathUnreachable",
    "ValueNotAdmitted",
    "FileCommitFailed",
];

/// The read's convenience form: an unqualified read (`§2.3`'s zero-tier arm).
pub fn read_at(store: &Store, address: &[Segment]) -> StoreValue {
    ok(
        store.read(AddressArg::List(address.to_vec()), TierArg::Absent),
        "§4.1: a read at a resolved address",
    )
}

// ---------------------------------------------------------------------------------------------------
// §2.2 `L-TIER` + §2.3 + `§3.2`'s closing clause — THE PER-STEP TIER RULE, AND WHAT A TIER-QUALIFIED PROBE
// CAN AND CANNOT REACH. **READ AT ITS OWN BYTES, BECAUSE THIS IS THE RULE `R-1`'s CELLS ARE DERIVED AT.**
//
// **`§2.2`'s arms are evaluated PER STEP, at `a[i]`, from the register; `L-3`'s *"the address's remaining
// segments are consumed by no further step"* fixes the order.** **`§2.3`'s selection rule is the ONE
// predicate every step runs**: zero tiers passed ⇒ the LOWEST-persistence anchor at that key; one or more
// tiers passed ⇒ the same lowest-persistence rule over the PASSED SUBSET. **And the arms' two failure
// answers are the per-step pair `L-3`/`L-TIER`:**
//
//   * **`L-3`'s `AddressNotFound` — `c` holds NO anchor matching the key AND the passed tier.**
//   * **`L-TIER`'s `TierNotFound` — `c` holds an anchor at key `a[i]` but NO passed tier matches its
//     tier.** `§3.2`'s closing clause makes this the answer *"where the key exists but no passed tier
//     matches"*, and it is the ONLY tier-specific failure: *"`TierNotFound` remains reachable through every
//     tier-qualified caller and through `L-TIER`'s own arm, and the write's parent stage is the one stage
//     that no longer reaches it"*.
//
// **SO A TIER-QUALIFIED PROBE IS A PROBE OF THE ADDRESSED KEY'S ANCHOR SET — the last segment's anchor
// set at the link the earlier segments reach — at EVERY step and AT EVERY DEPTH**, because a PASS-THROUGH
// step's `L-2`/`L-3`/`L-TIER` arms are read over the same predicate: the walk descends through a pass-through
// step by the passed tier when the container holds an anchor at that key and tier, and otherwise answers
// `L-TIER`/`L-3` THERE. **What a tier-qualified probe therefore CANNOT do is reach the addressed step's key
// when the ancestors cannot be descended at the passed tier** — and **what the addressed step CAN answer is
// `TierNotFound` whenever the addressed KEY EXISTS but holds no anchor at the passed tier, WHATEVER its
// ancestors carry.** **The write's own parent search is the ONE stage that is tier-agnostic** (`§3.2` item 2,
// `DD-27`): it reaches the parent *"by address alone"* and the monotonic clause is then evaluated over the
// two anchors.
//
// **A CELL THAT ASSUMES AN ANCESTOR'S TIER FROM THE TIER IT WAS WRITTEN AT IS THE `R-1` DEFECT.** A nested
// address's ancestors carry the tier THEY carry — the LOWEST-persistence anchor at their own key when the
// write that put them there did not purge it — so a cell that must reach a deeply nested anchor names the
// landing with `landing_tier` (an UNQUALIFIED probe) or reads the ancestor UNQUALIFIED, and qualifies a
// TIER only where the contract makes that tier decisive (the addressed step, a purge's survival, a
// shadow's winner).
// ---------------------------------------------------------------------------------------------------

/// The tier an address LANDS at, read **UNQUALIFIED** — `§2.3`'s zero-tier arm, which is also exactly what
/// `§3.2` item 2's parent search runs. The probe's selection rule gives the LOWEST-persistence anchor at the
/// address's last key, so a cell can NAME the tier an anchor carries instead of assuming it from the tier a
/// write was called with.
pub fn landing_tier(store: &Store, address: &[Segment]) -> Tier {
    let r: &NodeRef = ok(
        store.findAddress(AddressArg::List(address.to_vec()), TierArg::Absent),
        "§2.3: the zero-tier arm resolves the address to its lowest-persistence anchor",
    );
    r.anchor.tier
}

/// The tiers at which a TIER-QUALIFIED walk over `address` ANSWERS — the probe of `§2.3`'s selection rule
/// at the ADDRESSED key. `§2.3`'s any-match set is *"not a union of values, not an ordered preference and
/// not a filter"*, so a tier is in this set exactly when the walk descends every step at that tier and the
/// addressed key holds an anchor at it. **A cell that must reach the addressed step asserts that this set
/// CONTAINS the tier `§3.2`/`§5.4` (a) require** — and a set that does not is the `L-TIER` failure the
/// contract states, not something to be worked around.
pub fn tiers_answering_at(store: &Store, address: &[Segment]) -> Vec<Tier> {
    canonical_tiers()
        .into_iter()
        .filter(|tier| {
            store
                .read(AddressArg::List(address.to_vec()), t(*tier))
                .is_ok()
        })
        .collect()
}

/// A tier-qualified read (`§2.3`'s one-or-more arm) — `§4.1`'s own call, with no expectation beyond the
/// caller's clause.
pub fn read_tier(store: &Store, address: &[Segment], tier: Tier) -> StoreValue {
    ok(
        store.read(AddressArg::List(address.to_vec()), t(tier)),
        "§4.1/§2.3: a tier-qualified read",
    )
}

/// The versions standing at one address, in `§5.1`'s canonical order — derived by probing the three tiers
/// (`§2.2` `L-TIER` answers `TierNotFound` where a tier holds no version, `DD-12`). **The tier-qualified
/// probe answers exactly where `§2.3`'s selection rule finds the ADDRESSED KEY's own anchor at that tier**,
/// which is the anchor set this returns; a probe that cannot descend an earlier step answers `L-TIER`/`L-3`
/// and contributes no version, exactly as the walk's own arms say.
pub fn versions_at(store: &Store, address: &[Segment]) -> Vec<Tier> {
    let mut out = Vec::new();
    for tier in canonical_tiers() {
        match store.read(AddressArg::List(address.to_vec()), t(tier)) {
            Ok(_) => out.push(tier),
            Err(e) => {
                let allowed = ["TierNotFound", "AddressNotFound", "LeafHasNoDownstream"];
                assert!(
                    allowed.contains(&e.status.as_str()),
                    "§5.1/§2.3: probing an existing address at one tier answers a version or one of \
                     TierNotFound/AddressNotFound/LeafHasNoDownstream; got {}",
                    e.status
                );
            }
        }
    }
    out
}

/// `§1.2`'s monotonic clause, asserted over the pair. **`§3.2` item 4's rule, which is what `F-6` checks:**
/// `rank(child tier) ≤ rank(parent anchor's tier)`.
pub fn assert_monotonic(child_tier: Tier, parent_anchor_tier: Tier, what: &str) {
    assert!(
        rank(child_tier) <= rank(parent_anchor_tier),
        "{what}: §1.2/§3.2 item 4 — rank({child_tier:?}) > rank({parent_anchor_tier:?}) is an F-6 \
         ParentAnchorMonotonicityViolation, so no success is declared here"
    );
}

/// `contract.md` §5.4 (a)'s own observable: `findAddress(address, t).anchor.tier === t`.
pub fn anchor_tier(store: &Store, address: &[Segment], tier: Tier) -> Tier {
    let r: &NodeRef = ok(
        store.findAddress(AddressArg::List(address.to_vec()), t(tier)),
        "§5.4 (a): the address resolves at the tier the write used",
    );
    r.anchor.tier
}

/// The tier-qualified walk's failure, returned rather than asserted, so a property-layer cell can count it.
pub fn tier_probe_failure(
    store: &Store,
    address: &[Segment],
    tier: Tier,
    what: &str,
) -> StoreError {
    failure(
        store.read(AddressArg::List(address.to_vec()), t(tier)),
        what,
    )
}

/// Asserts a tier-qualified walk over `address` at `tier` answers `L-TIER`'s `TierNotFound`: **the key
/// exists at the step and no passed tier matches its anchor** (`§2.2` `L-TIER`, `§2.3`, `§3.2`'s closing
/// clause) — and **no anchor outside the passed set answers instead** (`§2.3`'s any-match set is *"not a
/// union of values, not an ordered preference and not a filter"*, `R: §15.2`'s `O-5` row). The caller's
/// `what` names WHICH step the clause is being driven at.
///
/// **THIS HELPER ASSERTS A WALK STEP'S FAILURE AND NEVER AN ASSEMBLY'S OMISSION** (`§4.1`'s reconciliation,
/// `§4.2`'s RECONCILED block and its priced home `§0.2 · DD-31`): `TierNotFound` leaves the read's failure
/// set **at a WALK step alone**, and a DESCENDANT whose anchors lie at no passed tier is **OMITTED** by the
/// assembly — no member, and **no code at all**. So a caller may reach for this helper only where the walk
/// cannot descend or cannot resolve at the addressed step; **a read that must observe a key excluded by the
/// passed set inside a resolved branch asserts the OMITTED MEMBER, not this code.** (The helper's own bytes
/// are unmoved: its three call sites all drive a WALK step — `tests/write_arms.rs` at the walk's first step
/// and at the addressed step of a nested address, and `tests/properties.rs` at a refused write's parent
/// pass-through step.)
pub fn assert_tier_not_found(store: &Store, address: &[Segment], tier: Tier, what: &str) {
    let e = tier_probe_failure(store, address, tier, what);
    assert_eq!(
        e.status, "TierNotFound",
        "{what}: §2.2 L-TIER — the key exists at the step and no passed tier matches its anchor; the walk \
         answers TierNotFound there (§2.3, §3.2's closing clause). Got {}",
        e.status
    );
}

/// §6.5 item 5: **NO ORDER IS DECLARED FOR THE LIST** — so membership is compared as a set of addresses.
pub fn same_address_set(a: &[Vec<Segment>], b: &[Vec<Segment>]) -> bool {
    let sorted = |v: &[Vec<Segment>]| {
        let mut out: Vec<String> = v
            .iter()
            .map(|addr| {
                addr.iter()
                    .map(|s| match s {
                        Segment::Key(k) => format!("k:{k}"),
                        Segment::Index(i) => format!("i:{i}"),
                        other => format!("o:{other:?}"),
                    })
                    .collect::<Vec<_>>()
                    .join("/")
            })
            .collect();
        out.sort();
        out
    };
    sorted(a) == sorted(b)
}

/// §6.5 item 5 **EXTENDED to the handle lists by `DD-37`**: *"the order is unspecified for BOTH lists, and
/// the drive compares SETS"* — so membership is compared as a set of handles, **with no sequence asserted
/// and a DUPLICATED handle observed as a failure** (`§5.8`'s failure list: *"a listener's handle LOST or
/// DUPLICATED by a change action"*). Written over `PartialEq` alone, so **the red set assumes no `Ord` on the
/// handle — `§0.4`'s construction-rule clause 1 declares `Clone` + `PartialEq` + `Eq` + `Debug` and no
/// ordering**, and the type stays opaque (`§0.4`; `write-and-read.md §6.5` item 12 (a)).
pub fn same_handle_set(a: &[ListenerHandle], b: &[ListenerHandle]) -> bool {
    if a.len() != b.len() {
        return false;
    }
    let mut used = vec![false; b.len()];
    for x in a {
        let mut found = false;
        for (i, y) in b.iter().enumerate() {
            if !used[i] && x == y {
                used[i] = true;
                found = true;
                break;
            }
        }
        if !found {
            return false;
        }
    }
    true
}

/// One handle returned by a trigger, as a one-member set — the common shape of `P-TP-8`'s drives.
pub fn one_handle(h: &ListenerHandle) -> Vec<ListenerHandle> {
    vec![h.clone()]
}

// ---------------------------------------------------------------------------------------------------
// The property layer's engine — one closed drive per register row (`contract.md` §5.2–§5.9).
// ---------------------------------------------------------------------------------------------------

use std::sync::atomic::{AtomicUsize, Ordering};

static TOTAL_ATTEMPTS: AtomicUsize = AtomicUsize::new(0);

/// The pinned seed the property layer runs on (§ "deterministic, pinned seed").
pub const SEED: u64 = 0x5EED_5EED_5EED_5EED;
/// ≤ 100 attempts per register row.
pub const MAX_ATTEMPTS_PER_ROW: usize = 100;
/// ≤ 400 attempts in total.
pub const MAX_ATTEMPTS_TOTAL: usize = 400;
/// stop-after-5 breaks.
pub const STOP_AFTER_BREAKS: usize = 5;

/// A deterministic splitmix64 — pinned seed, no dependency, identical attempts on every run.
pub struct Rng(u64);

impl Rng {
    pub fn pinned() -> Rng {
        Rng(SEED)
    }
    pub fn next_u64(&mut self) -> u64 {
        self.0 = self.0.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.0;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }
    pub fn below(&mut self, n: usize) -> usize {
        (self.next_u64() % (n as u64)) as usize
    }
    /// A deterministic pick for the fuzz drives. **`Clone` and not `Copy`:** `§0.4` declares `Copy` for
    /// `Tier` alone, so a bound on `Copy` would demand an undeclared impl of a value type that *cannot*
    /// have one (`StoreValue::Object` holds a `BTreeMap`).
    pub fn pick<T: Clone>(&mut self, xs: &[T]) -> T {
        xs[self.below(xs.len())].clone()
    }
}

/// One register row's drive: its strategy id, its attempts, its breaks and its verdict.
pub struct Drive {
    pub row: &'static str,
    pub strategy: &'static str,
    attempts: usize,
    pub breaks: usize,
    pub conflicted: usize,
    notes: Vec<String>,
}

impl Drive {
    pub fn new(row: &'static str, strategy: &'static str) -> Drive {
        Drive {
            row,
            strategy,
            attempts: 0,
            breaks: 0,
            conflicted: 0,
            notes: Vec::new(),
        }
    }

    /// Counts one attempt and enforces the caps before the attempt's assertions are made.
    pub fn attempt(&mut self) {
        self.attempts += 1;
        assert!(
            self.attempts <= MAX_ATTEMPTS_PER_ROW,
            "{}: ≤ {MAX_ATTEMPTS_PER_ROW} attempts per row",
            self.row
        );
        let total = TOTAL_ATTEMPTS.fetch_add(1, Ordering::SeqCst) + 1;
        assert!(
            total <= MAX_ATTEMPTS_TOTAL,
            "the register's drives: ≤ {MAX_ATTEMPTS_TOTAL} attempts in total"
        );
    }

    /// The attempts made so far — a loop reads this to stay inside the per-row cap.
    pub fn attempts(&self) -> usize {
        self.attempts
    }

    /// stop-after-5 breaks: once five breaks are recorded the drive stops attempting.
    pub fn stopped(&self) -> bool {
        self.breaks >= STOP_AFTER_BREAKS
    }

    /// A held/broken check against a clause's declared observable.
    pub fn check(&mut self, held: bool, what: &str) {
        if !held {
            self.breaks += 1;
            self.notes.push(format!("BREAK: {what}"));
        }
    }

    /// A check whose expectation two clauses of the contract contradict — counted as a break AND as a
    /// conflict, so the report can name the contract, not the implementation, as the cause.
    pub fn check_conflicted(&mut self, held: bool, what: &str) {
        if !held {
            self.breaks += 1;
            self.conflicted += 1;
            self.notes.push(format!("BREAK(conflict): {what}"));
        }
    }

    pub fn verdict(&self) -> &'static str {
        if self.breaks == 0 {
            "HELD"
        } else {
            "BROKEN"
        }
    }

    /// Prints the row in the register's own vocabulary and asserts the verdict.
    pub fn report_and_assert(&self) {
        println!(
            "row={} strategy={} attempts={} breaks={} conflicted={} verdict={}",
            self.row,
            self.strategy,
            self.attempts,
            self.breaks,
            self.conflicted,
            self.verdict()
        );
        for n in &self.notes {
            println!("  {n}");
        }
        assert_eq!(
            self.verdict(),
            "HELD",
            "{}: BROKEN — {} break(s), {} of them caused by a named contract conflict (see the gate-3 report)",
            self.row,
            self.breaks,
            self.conflicted
        );
    }
}
