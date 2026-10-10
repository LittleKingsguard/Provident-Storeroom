//! The record shapes the surface crosses (`§1.2`, `§3.6`, `§4.4`, `§6.2`, `§6.3`, `§6.5`) and the three
//! ranked tier tokens (`§5.1`).
//!
//! **⟶ AMENDED 2026-10-11 — THE LISTENER AMENDMENT'S SHAPES.** The stopgap's opaque `WatchHandle` and its
//! `Registration` are **SUPERSEDED** by `ListenerHandle` and the `Listener` record (`§6.5` item 12, `A57`,
//! `A58`), and the two returned records gain the `triggered` member (`DD-35`).

use crate::value::Segment;
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

/// `§1.2`: the child side of an anchor — the key it is held at and the TIER PROPERTY it carries.
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
#[derive(Clone, Debug, PartialEq)]
pub struct ChildAnchor {
    pub key: Segment,
    pub tier: Tier,
    /// `DD-44`: TRUE on the register's own reference ALONE — never on a reference a segment reaches, and it
    /// never moves with a tier or with a caller's `t` (`§1.6` item 4 (d); `A42`).
    pub register_marker: bool,
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
#[derive(Clone, Debug, PartialEq)]
pub struct DeleteReceipt {
    pub address: Vec<Segment>,
    pub tiers: Vec<Tier>,
    /// `§4.4`'s amended member: the handles of the TRIGGERED listeners — `[]` where nothing was removed
    /// (`D-3`, `§6.5` item 11).
    pub triggered: Vec<ListenerHandle>,
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

/// `§3.6` (`DD-35`; `write-and-read.md §6.5` item 13's delta): the write's return, **exactly THREE members:
/// `op` · `watched` (the watched ADDRESSES, `§3.6`/`§6.5`) · `triggered`** (the triggered `ListenerHandle`s —
/// the amendment's dated clause) — and it is returned on the success path only: **`watched` keeps
/// the watched ADDRESSES and `triggered` carries the triggering listeners' HANDLES**.
#[derive(Clone, Debug, PartialEq)]
pub struct WriteResult {
    pub op: JournalOp,
    pub watched: Vec<Vec<Segment>>,
    /// `§3.6`'s amended member: the handles of the listeners the trigger fired, as a SET (`DD-37`).
    pub triggered: Vec<ListenerHandle>,
}
