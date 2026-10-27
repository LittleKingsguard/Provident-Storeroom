//! The record shapes the surface crosses (`§1.2`, `§3.6`, `§4.4`, `§6.2`, `§6.3`, `§6.5`) and the three
//! ranked tier tokens (`§5.1`).
//!
//! **⟶ AMENDED 2026-10-11 — THE LISTENER AMENDMENT'S SHAPES.** The stopgap's opaque `WatchHandle` and its
//! `Registration` are **SUPERSEDED** by `ListenerHandle` and the `Listener` record (`§6.5` item 12, `A57`,
//! `A58`), and the two returned records gain the `triggered` member (`DD-35`).

use crate::value::Segment;
use std::cell::RefCell;
use std::cmp::Ordering;

/// `§5.1`: exactly three tokens, ranked `file > mem > temp` — `M-1`'s total and strict order.
///
/// **`Hash` IS THE KEYED CONTAINER'S INNER KEY** (`P: §13 · A22` · `A34` · `DD-10`): a keyed link's children
/// ARE the hashmap the architect's decision rules (`P: §1` line 42), keyed by the SEGMENT, and **each key's
/// own inner entry is keyed by the TIER** — because *"at most ONE child anchor per key/index and tier"* is
/// the composite key, so two versions of one key are two anchors and each stands under its own tier.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Tier {
    File,
    Mem,
    Temp,
}

impl Tier {
    /// `§5.1` `M-1`: `rank(file) = 2 > rank(mem) = 1 > rank(temp) = 0`.
    pub fn rank(self) -> u8 {
        match self {
            Tier::File => 2,
            Tier::Mem => 1,
            Tier::Temp => 0,
        }
    }
}

/// `§5.1`'s token column.
pub fn tier_token(t: Tier) -> &'static str {
    match t {
        Tier::File => "file",
        Tier::Mem => "mem",
        Tier::Temp => "temp",
    }
}

/// `§5.1` `M-1`: the order IS the rank (lower tier = lower persistence, one predicate).
impl Ord for Tier {
    fn cmp(&self, other: &Tier) -> Ordering {
        self.rank().cmp(&other.rank())
    }
}

impl PartialOrd for Tier {
    fn partial_cmp(&self, other: &Tier) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

/// `§1.2`: the child side of an anchor — **the TIER PROPERTY it carries and the register's identity marker,
/// and NOTHING ELSE.** **⟶ AMENDED 2026-10-21 (`store-model.md §1.2`'s dated clause, on the architect's
/// ruling): `key` LEAVES THE `ChildAnchor` MEMBER SET AND THE COUNT MOVES `4 → 3` — `tier` · `node` ·
/// `register_marker`, `key` NOT AMONG THEM.** **The ruling's two directives, verbatim: *"Remove key and
/// derive it during read while compiling vec --> JS array"* and *"Key isn't needed locally on the node. The
/// use case for it is in assembling arrays during the JS conversion, but the codec can infer the key from
/// the vec index directly"*.** **The member was a CACHE of something derivable — the container's POSITION —
/// kept in sync by ONE write and read by NOTHING; the derivation is EXACT because `key_fits` (`src/store.rs`)
/// lets a `Vec` container admit ONLY `Segment::Index` and a `Map` container ONLY `Segment::Key`, so the key
/// a container holds is a FUNCTION OF THE CONTAINER KIND AND THE POSITION.** **The derivation's HOME is
/// `Store::derived_key`, and the reference's key stays ANSWERABLE at `findAddress`'s boundary through
/// [`ChildAnchor::key`] — the member below is NOT a stored key: it is the cell the read fills with the
/// value the store derived for the reference it is about to hand back, and `None` off that path.**
///
/// **⟶ AMENDED 2026-10-11 (`DD-44`; `store-model.md §1.6` item 4 (c)/(d); `contract.md §0.4`'s `NodeRef`
/// spelling row and its added marker clause): `ChildAnchor` ALSO CARRIES `register_marker: bool`** — **TRUE on
/// EXACTLY ONE reference in a store, the register's own (whose address is the empty set, `§1.6` item 4
/// (a)/(b)), and FALSE on every reference a segment reaches.** **It is a property of the ANCHOR and NOT a
/// `Segment` variant, so `§1.5` item 1's closed segment domain (`string` · non-negative integer) is
/// UNWIDENED and `§1.7`'s five-component closure is UNMOVED.** **Its observable is the register-reference
/// cell's second member: `findAddress([], t).anchor.register_marker == true` and
/// `findAddress([""], t).anchor.register_marker == false` in a store whose register holds a `""` key — so
/// the two references are DISTINGUISHED by a DECLARED observable and the *"EMPTY segment marker"* is a
/// MARKER and not a key** (`§2.1`'s amended empty-address clause is unmoved).
#[derive(Clone, Debug)]
pub struct ChildAnchor {
    pub tier: Tier,
    /// `DD-44`: TRUE on the register's own reference ALONE — never on a reference a segment reaches, and it
    /// never moves with a tier or with a caller's `t` (`§1.6` item 4 (d); `A42`).
    pub register_marker: bool,
    /// **THE DERIVED KEY'S ANSWER CELL — NOT A STORED MEMBER OF THE ANCHOR'S DECLARED SET.** `§1.2`'s dated
    /// clause of 2026-10-21 removed `key` from the member set, so this field is **NOT** a `ChildAnchor`
    /// member and carries no value the store maintains: **it is written ONLY by `Store::findAddress` at its
    /// own boundary, with the key `Store::derived_key` computes for the reference being returned, and it
    /// stays `None` everywhere else.** It answers the same question the withdrawn member did — *the segment
    /// this reference is held at* (`§2.1`) — from a value DERIVED AT THE READ rather than a value STORED on
    /// the node. `RefCell` rather than `Cell` because `Segment` is not `Copy`; the interior mutability is
    /// what lets `findAddress` keep its `&NodeRef` return type while filling the answer.
    pub(crate) derived_key: RefCell<Option<Segment>>,
}

impl ChildAnchor {
    /// `§2.1`: **the segment this reference is held at, as the store derived it — `Option` because the
    /// REGISTER'S OWN REFERENCE has no key at all.** **The register is the walk's start and is reached by NO
    /// segment** (`§1.6` item 4; `§2.1`'s empty-address reference clause), **so its reference stands at no
    /// key and THIS IS THE ONE CASE WHERE THE ANSWER IS `None`** — and `records.rs`'s own `§0.4` marker
    /// clause already declared the marker's spelling *"a MARKER and not a key"*, which is exactly why the
    /// register's identity is carried by `register_marker` and by nothing this accessor returns. A reference
    /// a segment reaches answers `Some`: `Segment::Index(position)` for a `Vec` container and the `HashMap`'s
    /// own key for a `Map` one.
    pub fn key(&self) -> Option<Segment> {
        self.derived_key.borrow().clone()
    }
}

/// **`Clone` and `PartialEq` for the anchor's DECLARED members ALONE (`§1.2`'s `3`-member set).** The cell
/// above is not a declared member, so it must not enter either: a clone carries no answer across, and two
/// anchors are equal exactly when their `tier` and `register_marker` are — which is the pair `§0.4`'s marker
/// clause and `DD-44` declare the register's reference and the legal `""` key's reference DISTINCT at.
impl PartialEq for ChildAnchor {
    fn eq(&self, other: &Self) -> bool {
        self.tier == other.tier && self.register_marker == other.register_marker
    }
}

/// `§2.1`: the resolver's RETURNED REFERENCE — the store's own handle to a node, not a copy of it.
///
/// Its drivable observable is its own anchor (`§0.4`): `findAddress(address, t).anchor.tier` is `t` in
/// exactly the states `§5.4` (a) declares.
#[derive(Clone, Debug, PartialEq)]
pub struct NodeRef {
    pub anchor: ChildAnchor,
    /// The node the reference points at: an index into the instance's own node arena. The reference is
    /// NOT addressable, NOT enumerable and NOT serializable (`§2.1`).
    pub(crate) node: usize,
}

/// `§1.3`: the link's container — `MAP` xor `VEC`, decided at write and inferred from contents on read.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(crate) enum Kind {
    Map,
    Vec,
}

impl Kind {
    pub(crate) fn word(self) -> &'static str {
        match self {
            Kind::Map => "map",
            Kind::Vec => "vector",
        }
    }
}

/// `§6.2`: which tracked verb produced the op.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum JournalOpKind {
    Write,
    Delete,
}

/// `§6.2`: the two-member state half of a journal op.
#[derive(Clone, Debug, PartialEq)]
pub struct BaseState {
    pub present: bool,
    pub value: crate::value::StoreValue,
}

/// `§6.2` (`DD-22`): the op's closed record shape, carrying enough to reconstruct the original tree and
/// resolve the current state with an id.
#[derive(Clone, Debug, PartialEq)]
pub struct JournalOp {
    pub opId: String,
    pub kind: JournalOpKind,
    pub address: Vec<Segment>,
    pub tier: Option<Tier>,
    pub before: BaseState,
    pub after: BaseState,
    pub seq: u64,
    pub compacted: bool,
}

/// `§4.4`'s receipt, **⟶ AMENDED 2026-10-11 (`DD-35`) with the `triggered` member — exactly THREE members:
/// `address` · `tiers` · `triggered`**: the addresses the delete named (`address` VERBATIM, `tiers` the
/// tiers whose versions were removed) **beside the HANDLES
/// of the listeners the trigger fired** (`write-and-read.md §6.5` item 11; `A43`).
///
/// **⟶ AMENDED 2026-10-27 BY THE ARCHITECT'S RULING `D-43` ITEM 3 (`strata/decisions.md`): THE RECEIPT
/// CARRIES THE DELETE'S OWN JOURNAL OP, AND THAT IS WHAT MAKES A DELETE NAMEABLE AND THEREFORE
/// REVERSIBLE.** The ruling verbatim: *"Delete should be journaled and reversible"*. **MEASURED BEFORE THIS
/// MEMBER WAS ADDED: the delete WAS already appended to the journal, with its address, its per-tier
/// BEFORE-state and an op id, and `rollback` accepted that id and restored every removed version at its own
/// tier — so what was missing was the IDENTITY alone. `delete` answered `{address, tiers, triggered}` and a
/// caller could not name the op it had just caused** (the measured obstacle `D-43` item 3 states). **So
/// `op` is the FOURTH member and it is the store's own `journal op`, spelled exactly as `WriteResult.op`
/// is** — one spelling for *"the op this act landed"*, on both records.
///
/// **AND IT IS `Option` BECAUSE ONE ARM GENUINELY HAS NO OP.** A delete that removes nothing (`D-3`: a
/// SUCCESS carrying `tiers: []`, `§6.5` item 11's `triggered: []`) **appends NO journal entry** — the
/// journal holds one entry per operation **that changed the register** — so there is no op for the store to
/// name: `None` is that arm, and it is the truth rather than a minted id for an op no reversal could find.
/// **Every arm that removed a version carries `Some(op)`, and that op is the one the journal holds.**
#[derive(Clone, Debug, PartialEq)]
pub struct DeleteReceipt {
    pub address: Vec<Segment>,
    pub tiers: Vec<Tier>,
    /// `§4.4`'s amended member: the pairs of the TRIGGERED listeners — `[]` where nothing was removed
    /// (`D-3`, `§6.5` item 11). **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY`: the element is the PAIR
    /// `{handle, address}` (`contract.md §2.4` item 1; `PAR-HL-38`), and `A43` is what makes a delete's
    /// receipt carry the same member a write's record does.**
    pub triggered: Vec<ListenerTrigger>,
    /// **⟶ ADDED 2026-10-27 (`D-43` item 3): THE DELETE'S IDENTITY — the store's own journal op, the value
    /// `rollback` accepts and reverses.** `Some` exactly when the delete removed at least one version and
    /// its entry was appended; `None` on the `D-3` arm that removed nothing and journaled nothing. **Named
    /// `op` because `WriteResult.op` is that name** (`write-and-read.md §3.6`), so a caller has ONE spelling
    /// for *"the op this act landed"*.
    pub op: Option<JournalOp>,
}

/// `§6.3`: the rollback's result — **exactly THREE members: `opId` · `undoneOps` · `restoredTo`** (**⟶
/// CORRECTED by the `AM-18`-class doc pass: this comment read *"the rollback's two-member result"* and was
/// the stale side — the struct below declares three fields and no member moved; `§6.3`'s head and
/// `contract.md §0.4`'s spelling row are reconciled to three**, `§4.3.1`).
#[derive(Clone, Debug, PartialEq)]
pub struct RollbackResult {
    pub opId: String,
    pub undoneOps: Vec<String>,
    pub restoredTo: BaseState,
}

/// `§6.5` item 12 (`A57`, `A58`; `contract.md §0.4`): **the listener's handle** — an **OPAQUE,
/// store-minted, store-unique token** and the ONE handle of the listener surface. **No public field, no
/// public member and no declared variant**: a caller CAN spell a handle and can never read out or mutate
/// the token it holds. The ONE infallible public constructor is `ListenerHandle::from(token: &str)`, and
/// the type carries `Clone` + `PartialEq` + `Eq` + `Debug` — *"the returned handle and the handle the
/// caller supplied are equal EXACTLY when their tokens are equal"* (`§0.4`'s construction rule, clause 1).
#[derive(Clone, PartialEq, Eq, Debug)]
pub struct ListenerHandle {
    token: String,
}

impl From<&str> for ListenerHandle {
    fn from(token: &str) -> ListenerHandle {
        ListenerHandle {
            token: token.to_string(),
        }
    }
}

impl std::fmt::Display for ListenerHandle {
    /// `§0.4`: *"`Display`/`Debug` may print it; no accessor is declared"*.
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.token)
    }
}

/// `§6.5` item 10 (a) (`A57`): **the listener RECORD, CLOSED at `{ address, handle }`** — `address`
/// determines WHERE the listener binds (by ADDRESS, never by a node's identity) and `handle` is the value
/// the store RETURNS when the listener triggers.
#[derive(Clone, Debug, PartialEq)]
pub struct Listener {
    pub address: Vec<Segment>,
    pub handle: ListenerHandle,
}

/// **`U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`) — THE TRIGGER'S PAIR, `{handle, address}`
/// (`contract.md §2.4` item 1; `trigger-and-pair.md §1`).** **`handle` is the store's own listener identity
/// and `address` is THE BINDING's OWN ADDRESS — `listener.address`, available at the selection site inside
/// the filter and formerly DISCARDED by the `.map(|listener| listener.handle.clone())` beside it.** **THE
/// PAIR REPLACES AND DOES NOT SUPPLEMENT: there is NO parallel `triggeredAddresses` array, because an i-th
/// correspondence reverses `DD-37` (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 4).**
///
/// **AND THE TWO MEMBERS ARE TOLD APART AT THEIR OWN SITES: the pair's `address` is the BINDING's, and
/// `triggeringAddress` — the member the facade attaches beside the record — is THE WRITE's**
/// (`contract.md §2.4` item 7; `PAR-HL-20`, `PAR-HL-23`).
#[derive(Clone, Debug, PartialEq)]
pub struct ListenerTrigger {
    pub handle: ListenerHandle,
    pub address: Vec<Segment>,
}

/// `§3.6` (`DD-35`; `write-and-read.md §6.5` item 13's delta): the write's return, **exactly THREE members:
/// `op` · `watched` (the watched ADDRESSES, `§3.6`/`§6.5`) · `triggered`** (the triggered `ListenerHandle`s —
/// the amendment's dated clause) — and it is returned on the success path only: **`watched` keeps
/// the watched ADDRESSES and `triggered` carries the triggering listeners' HANDLES**.
#[derive(Clone, Debug, PartialEq)]
pub struct WriteResult {
    pub op: JournalOp,
    pub watched: Vec<Vec<Segment>>,
    /// `§3.6`'s amended member: the pairs of the listeners the trigger fired, as a SET (`DD-37`).
    /// **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY`: the element is the PAIR `{handle, address}`
    /// (`contract.md §2.4` item 1; `PAR-HL-38`), replacing — never supplementing — a bare handle list.**
    pub triggered: Vec<ListenerTrigger>,
}
