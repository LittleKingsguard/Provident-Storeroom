//! The store itself: the construction (`§7.1`), the shared resolver and the walk (`§2`), the write arms
//! (`§3`), the read and delete (`§4`), the tiers, the shadow and the purge chain (`§5`), the journal, the
//! rollback and the watched-address list (`§6`), and the `file` tier's persistence (`§7.2`).
//!
//! Every mutation is all-or-nothing: a failed arm installs nothing, appends nothing and changes no
//! container's kind (`§3.5`, `DD-4`, `DD-19`).

use crate::args::{
    address_segments, construction_listeners, delete_tier, op_id, read_tier_sel, write_tier,
    AddressArg, FilePathArg, JournalLengthArg, OpIdArg, StoreConfig, TierArg, TierSel,
};
use crate::error::{
    address_not_found, container_kind_conflict, container_kind_conflict_for_key,
    file_commit_failed, file_path_unreachable, journal_op_unknown, leaf_has_no_downstream,
    malformed_named, malformed_segment, missing_argument, monotonicity_violation,
    read_target_is_branch, rollback_compacted, tier_not_found, value_not_admitted,
    write_parent_not_link, StoreError,
};
use crate::json;
use crate::records::{
    BaseState, ChildAnchor, DeleteReceipt, JournalOp, JournalOpKind, Kind, ListenerHandle, NodeRef,
    RollbackResult, Tier, WriteResult,
};
use crate::value::{Segment, StoreValue};
use std::collections::{BTreeMap, HashMap};
use std::sync::atomic::{AtomicU64, Ordering};

/// The one query the declared child container asks about an anchor that the container itself does not
/// hold: **its TIER** — the anchor's tier is the composite key's second half (`A34`, `DD-10`) and it lives
/// in the reference arena, so the container is answered by the store's own `refs` table.
type RefTier<'a> = &'a dyn Fn(usize) -> Tier;

/// `§6.2` property 3: an op's id is non-empty and unique — per instance and per session, so the counter is
/// process-wide and two instances never mint the same token (`§5.7`'s independence clause).
static NEXT_OP: AtomicU64 = AtomicU64::new(1);

/// `§6.5` item 12 / `PAR-13`: a store-minted handle is *"unique PER STORE INSTANCE and PER SESSION"*, so the
/// minting counter is process-wide exactly as the op id's is (`§6.1` item 3).
static NEXT_HANDLE: AtomicU64 = AtomicU64::new(1);

/// **`§0.4`'s `ListenerHandle` construction-rule clause 2 (a), ADDED 2026-10-11 (`DD-42`) — THE MINT'S OWN
/// NON-COLLISION RULE:** **`listen` MUST NOT MINT A TOKEN EQUAL TO ANY TOKEN THE HOME ALREADY HOLDS** — **a
/// mint that would collide SKIPS the colliding token and mints the NEXT one**, so the home never holds two
/// entries with ONE token where the store minted it, `unlisten` removes exactly the entry it names, and
/// `triggered` carries no duplicated member (`PAR-13`'s *"unique PER STORE INSTANCE and PER SESSION"*). **The
/// CONSTRUCTION's adopted tokens are untouched by this rule**: a caller-spelled duplicate is the ONE lawful
/// collision, and its mis-targeting (`unlisten` over it removes the FIRST match) is `DD-42`'s DECLARED
/// ANSWER, not a defect — so this function is handed the home and never re-mints an adopted token.
fn next_handle_token(home: &[HomeEntry]) -> String {
    loop {
        let token = format!("listener-{}", NEXT_HANDLE.fetch_add(1, Ordering::SeqCst));
        let held = ListenerHandle::from(token.as_str());
        if !home.iter().any(|entry| entry.handle == held) {
            return token;
        }
    }
}

fn next_op_id() -> String {
    format!("op-{}", NEXT_OP.fetch_add(1, Ordering::SeqCst))
}

/// `§1.3`: a link — exactly one parent anchor and a container of child anchors.
///
/// **⟶ THE DECLARED STRUCTURE, RESTORED 2026-10-11 (`DEF-18`; the architect's decision VERBATIM at
/// `docs/specs/storeroom-native-proposal.md §1` line 42 — *"Links have exactly one parent anchor and a
/// hashmap xor vec of child anchors"* — and line 81 — *"…branch's descendant link in its **hashmap**. If
/// array, populate **vec**"*), which supersedes §5-ter's additive-index recommendation.** **The two kinds
/// carry the two declared structures rather than one positional list each:**
///
/// * **a KEYED link (`Kind::Map`, and the register — `A23`: *"Registry is always hashmap"*) holds its
///   child anchors in the `HashMap` the decision rules, keyed by the child anchor's own KEY, and each
///   key's own entry is keyed by the TIER** — so a key maps to *at most the tiers standing at it*, one
///   anchor per `(key, tier)` pair and never an unbounded list (the directive's *"cannot have more than one
///   child anchor with the same index/key"* bounds anchors per key BY THE TIER: `P: §15 · A34`, `DD-10`);
/// * **an ARRAY link (`Kind::Vec`) holds them in the `Vec`, POSITIONAL and contiguous from `0`**
///   (`store-model.md §1.3`, `§4.2` `R-3`) — the container's index is the position, and each position
///   holds that index's anchors, one per tier, in rank DESCENDING order.
struct Link {
    container: Kind,
    /// The child anchors the container holds, in the structure its own kind declares.
    children: Children,
    /// `§1.6`: the register acts as a link and always is a hashmap. **It HAS a parent anchor** — `§1.6`
    /// item 3's *"NO parent anchor"* is WITHDRAWN for the register-as-a-link by `A41` and is read through
    /// item 4, which is the operative clause: the register's parent anchor's address IS the empty set `[]`
    /// and its `node` is the DISTINCT CARRIER NODE (`§1.6` item 4 (a)/(b)). What carries no parent is that
    /// CARRIER NODE, not the register (`§1.6` item 4 (b), (c)).
    is_register: bool,
}

/// **THE DECLARED CHILD CONTAINER — `hashmap` XOR `vec`** (`P: §1` line 42; `A22`: *"Decided at write,
/// inferred from contents on read"*). **The variant IS the kind**: a link holds one of the two and never
/// both, every entry of the hashmap is a live child anchor reference, and every entry of the vec is a
/// contiguous position. **Both hold REFERENCES INTO THE INSTANCE'S REFERENCE ARENA, and the key a
/// reference stands under is the one the arena's anchor carries** (`§1.2`: the key is a property of the
/// anchor).
///
/// The hashmap's own iteration order is UNSPECIFIED — as a `MAP`'s is (`store-model.md §1.3`:
/// *"`MAP` … **unordered** — the store declares no order over a `MAP`'s children"*), and this store still
/// declares none. Every deterministic consumer sorts the key set by `Segment::spelling()` at the point of
/// iteration (`keys_at`), which is `§8.2` property (a)'s determinism requirement and NOT an order the
/// store declares over the container.
enum Children {
    /// A KEYED container: key → (tier → the one child anchor standing at that pair).
    Map(HashMap<Segment, HashMap<Tier, usize>>),
    /// An ARRAY container: position `i` IS index `i`, and its slots are that index's anchors, one per
    /// tier — the same inner tier key the hashmap's own key holds, so **the pair is the composite key in
    /// both kinds**.
    Vec(Vec<HashMap<Tier, usize>>),
}

impl Children {
    fn map() -> Children {
        Children::Map(HashMap::default())
    }

    fn vec() -> Children {
        Children::Vec(Vec::new())
    }

    fn is_empty(&self) -> bool {
        self.len() == 0
    }

    /// The kind this structure IS — `§1.3`'s `MAP` xor `VEC`. It is asserted against the link's own
    /// `container` marker at the write's own install, so the two can never drift.
    fn kind(&self) -> Kind {
        match self {
            Children::Map(_) => Kind::Map,
            Children::Vec(_) => Kind::Vec,
        }
    }

    /// The container's own key count — **a keyed container's key set's size, an array container's index
    /// count (`§1.3`: *"contiguous from `0`"*, so the count IS the domain's upper bound).**
    fn len(&self) -> usize {
        match self {
            Children::Map(keys) => keys.len(),
            Children::Vec(positions) => positions.len(),
        }
    }

    /// **THE INSTALL** — the one site a child anchor is added, **and the composite key does the work in
    /// BOTH kinds: one anchor per `(key, tier)` pair** (`A34`, `DD-10`). A keyed container files the
    /// anchor under its own key and the pair's tier. An array container files it at its index's POSITION —
    /// the position IS the index (`§1.3`) — where `i = len` is the append the container's own contiguous
    /// domain allows and `i < len` is a pair of an index the container already holds, whose own position
    /// receives the new anchor **beside** the tiers already standing there.
    fn install(&mut self, key: Segment, tier: Tier, reference: usize) {
        match self {
            Children::Map(keys) => {
                keys.entry(key).or_default().insert(tier, reference);
            }
            Children::Vec(positions) => {
                let Segment::Index(index) = key else {
                    unreachable!("a VEC's key domain is index keys (§1.3)")
                };
                let position = index as usize;
                debug_assert!(
                    position <= positions.len(),
                    "§1.3: a VEC's index keys are contiguous from 0"
                );
                if position == positions.len() {
                    positions.push(HashMap::new());
                }
                positions[position].insert(tier, reference);
            }
        }
    }

    /// **THE ONE PER-PAIR ACCESS the declared structure exists for** — the reference standing at
    /// `(key, tier)`, or none. **`O(1)` amortized for a keyed container and `O(1)` for an array one**
    /// (`A34`: at most ONE child anchor per pair), never a scan of the siblings.
    fn pair(&self, key: &Segment, tier: Tier) -> Option<usize> {
        let slots = match self {
            Children::Map(keys) => keys.get(key),
            Children::Vec(positions) => match key {
                Segment::Index(index) => positions.get(*index as usize),
                _ => None,
            },
        };
        slots.and_then(|slots| slots.get(&tier)).copied()
    }

    /// Every anchor standing at one key, in the store's canonical rank DESCENDING order — the same key at
    /// up to the three tiers, one anchor per pair.
    fn at(&self, key: &Segment, rank: impl Fn(usize) -> u8) -> Vec<usize> {
        let slots = match self {
            Children::Map(keys) => keys.get(key),
            Children::Vec(positions) => match key {
                Segment::Index(index) => positions.get(*index as usize),
                _ => None,
            },
        };
        rank_ordered(slots, &rank)
    }

    /// The container's distinct keys — **the hashmap's own key set** for a keyed container (the keys are
    /// distinct BY CONSTRUCTION, so no `contains` dedup scan runs) and index `0..len` for an array one.
    fn key_set(&self) -> Vec<Segment> {
        match self {
            Children::Map(keys) => keys.keys().cloned().collect(),
            Children::Vec(positions) => (0..positions.len() as u64).map(Segment::Index).collect(),
        }
    }

    /// **THE ONE REMOVAL** — the one site a child anchor is dropped, **by the pair it stands at**. A keyed
    /// container drops the reference from its own key's tier slot and drops the key itself when its last
    /// anchor goes; an array container drops the reference from its index's position's tier slot, and then
    /// applies `close_up` to the position itself: **a DELETE closes the gap and renumbers (`§1.3`/`R-3`),
    /// while a REPLACEMENT keeps the position, because the index is still occupied by the anchor the write
    /// is about to install there.**
    fn remove(&mut self, reference: usize, tier_of: RefTier<'_>, close_up: bool) {
        let tier = tier_of(reference);
        match self {
            Children::Map(keys) => {
                let mut emptied: Option<Segment> = None;
                for (key, slots) in keys.iter_mut() {
                    if slots.get(&tier) == Some(&reference) {
                        slots.remove(&tier);
                        if slots.is_empty() {
                            emptied = Some(key.clone());
                        }
                        break;
                    }
                }
                if let Some(key) = emptied {
                    keys.remove(&key);
                }
            }
            Children::Vec(positions) => {
                if let Some(position) = positions
                    .iter()
                    .position(|slots| slots.get(&tier) == Some(&reference))
                {
                    if close_up {
                        positions.remove(position);
                    } else {
                        positions[position].remove(&tier);
                    }
                }
            }
        }
    }

    /// `§1.3`/`§4.2` `R-3`: **a `VEC`'s index keys are *"non-negative integers, contiguous from `0`"`** —
    /// **the positions ARE the indices**, so the structure is renumbered by re-keying each surviving
    /// anchor to the position it now stands at. Each anchor keeps its own tier and points to the same
    /// node; only the index it stands at moves, so no node is minted, none is dropped and every surviving
    /// node stays reachable from the container's own (dense, from `0`) read (`§5.5`).
    fn renumber(&self) -> Vec<(usize, u64)> {
        match self {
            Children::Map(_) => Vec::new(),
            Children::Vec(positions) => positions
                .iter()
                .enumerate()
                .flat_map(|(position, slots)| {
                    slots
                        .values()
                        .copied()
                        .map(move |reference| (reference, position as u64))
                })
                .collect(),
        }
    }
}

/// One key's own anchors, rank DESCENDING — so the store's canonical order (`§5.1`: `file`, `mem`, `temp`)
/// is a property of the structure rather than of the order a hash table happened to walk in.
fn rank_ordered(slots: Option<&HashMap<Tier, usize>>, rank: &impl Fn(usize) -> u8) -> Vec<usize> {
    let Some(slots) = slots else {
        return Vec::new();
    };
    let mut ordered: Vec<usize> = slots.values().copied().collect();
    ordered.sort_by_key(|reference| std::cmp::Reverse(rank(*reference)));
    ordered
}

/// `§1.1`: the two node kinds.
#[derive(Debug)]
enum Node {
    Leaf(StoreValue),
    Branch(usize),
}

/// **⟶ ADDED 2026-10-11 — `§6.5` ITEM 8's HOME MAP'S OWN ENTRY** (`A45`, `A48`; `PAR-12`, `PAR-13`; the
/// superseded stopgap's `Registration` — keyed by the watched address with its tier qualifier — is
/// replaced in ONE pass, `A58`, with no deprecation window). **ONE authoritative home map, owning the
/// listener data and nothing else: an accepted `listeners[]` entry's `handle` (adopted VERBATIM, `DD-39`)
/// or a handle `listen` minted, keyed by the listener's `address`.** **The node-side lists of `§6.5`
/// item 9 are REFERENCES INTO IT and never a second copy**, and the home is NOT addressable, NOT a graph
/// record and NOT inside a read at `[]` (`A48`).
struct HomeEntry {
    address: Vec<Segment>,
    handle: ListenerHandle,
}

/// The pre-state an operation must be able to restore: every version that stood at one address path,
/// transitively, with its tier. `path` is relative to the operation's own address.
#[derive(Clone)]
struct Captured {
    path: Vec<Segment>,
    tier: Tier,
    value: StoreValue,
}

/// The addressed pair an operation's pre-state is measured from: the LINK its key stands on, and the key.
/// It is recorded AT CAPTURE, because the operation's own write may re-mint the anchor the walk would
/// otherwise find (`§3.4` arms `W-2`/`W-6`).
#[derive(Clone)]
struct PairHome {
    link: usize,
    key: Segment,
}

/// One journal entry (`§6.1` item 1): the declared op the caller may see, plus the pre-state the walk-back
/// reconstructs it from (`§6.2` property 1). The journal is CARRIER-INTERNAL (`§6.1` item 2).
struct Entry {
    op: JournalOp,
    captured: Vec<Captured>,
    /// The pair the entry's pre-state is measured from, recorded at append time.
    home: Option<PairHome>,
    /// The opIds the journal held COMPACTED at the moment this entry was appended: the marks the entry's
    /// own append may have set are undone from this list when the entry is popped (`§3.5`).
    compacted: Vec<String>,
}

/// The store instance.
pub struct Store {
    nodes: Vec<Node>,
    links: Vec<Link>,
    refs: Vec<NodeRef>,
    register: usize,
    register_ref: usize,
    journal: Vec<Entry>,
    last_seq: u64,
    /// **§6.5 item 8 (a): THE ONE HOME MAP** — the instance's authoritative registration state, separate
    /// from the register and from the graph, holding listeners and nothing else.
    home: Vec<HomeEntry>,
    file_path: String,
    journal_length: usize,
    /// `§6.1` item 5: **the compression's BASE STATE — a SNAPSHOT of the store's own observable state at
    /// the moment of compression, replacing every compressed entry as the walk's floor.** It begins as the
    /// empty register's read (`{}`) and is re-taken whenever an append compresses an entry.
    base_state: StoreValue,
}

/// `§7.1` — **THE CONSTRUCTION, IN THE AMENDMENT'S OWN ORDERED SEQUENCE** (`A49`–`A56`; `§7.1`'s amended
/// block and table; `DD-34`, `DD-39`, `DD-40`): **(2) `journalLength` FIRST, because it is the only
/// argument whose absence is still an error; (3) the `filePath` DRY RUN — writes nothing, WRITE ACCESS
/// REQUIRED, reachable iff the file exists or the application can write it; (4) `FilePathUnreachable`, or
/// the register's tier FIXED AT CREATION (`file` when the path passes, `mem` otherwise); (5) the HOME MAP
/// POPULATED FROM `listeners[]`; (6) the REGISTRY GENERATED over the already-populated home; (7) the `file`
/// tier's content boot-loaded, which produces `0` registrations (`DD-38`).**
pub fn storeCreate(cfg: &StoreConfig) -> Result<Store, StoreError> {
    // Step 2 — `journalLength`: ABSENT → `ConstructionArgumentMissing`; present but outside `{≥ 1 integer}`
    // → `AddressMalformed` (`DD-16`, `DD-17`'s operative form).
    let journal_length = match cfg.journalLength {
        JournalLengthArg::Count(n) if n >= 1 => n as usize,
        JournalLengthArg::Absent => {
            return Err(missing_argument(
                "ConstructionArgumentMissing",
                "journalLength",
            ))
        }
        _ => return Err(malformed_named("journalLength")),
    };
    // Steps 3–4 — `filePath`: ABSENT is LEGAL and fixes the register at `mem`; a non-empty string is PROBED
    // by a dry run that writes nothing and requires write access; the three shape-less/non-string forms
    // answer the as-filed `AddressMalformed` and are NOT probed (`§7.1`'s amended `filePath` row).
    let (file_path, register_tier) = match &cfg.filePath {
        FilePathArg::Absent => (String::new(), Tier::Mem),
        FilePathArg::Path(p) if !p.is_empty() => {
            if !path_is_reachable(p) {
                return Err(file_path_unreachable(p));
            }
            (p.clone(), Tier::File)
        }
        _ => return Err(malformed_named("filePath")),
    };
    // Step 5 — the home is POPULATED FROM `listeners[]`, and a rejected array admits NOTHING.
    let admitted = construction_listeners(&cfg.listeners)?;
    let home: Vec<HomeEntry> = admitted
        .into_iter()
        .map(|(address, handle)| HomeEntry { address, handle })
        .collect();
    // Step 6 — the registry is generated over the ALREADY-POPULATED home (`A56`: *"populate home map before
    // generating registry"*; the order of these two steps is the ruling's whole point).
    let mut store = Store::empty(file_path, journal_length, register_tier, home);
    // Step 7 — `§7.2` item 6: the `file` tier's content at `cfg.filePath` is loaded if the file exists; `mem`
    // and `temp` begin EMPTY, the journal begins with 0 entries, and the home is NOT re-populated from the
    // file, so a fresh instance over an equal path loads NO registration (`DD-38`).
    store.boot_load();
    Ok(store)
}

/// `§7.1` step 3 (`A52`, `A55`; `DD-40`): **the DRY-RUN reachability probe.** **The path is REACHABLE iff
/// the file exists OR the application can write it successfully**, read with `A55`'s two requirements: **the
/// probe creates NO file, NO directory and NO byte, and WRITE ACCESS IS REQUIRED** (so an EXISTING BUT
/// READ-ONLY file fails, and `A52`'s *"the application can write it successfully"* arm governs wherever it
/// and *"the file exists"* disagree). **A path that IS a directory is UNREACHABLE** (`DD-40` (b)), and a path
/// whose parent directory does not exist is UNREACHABLE (`DD-40` (a)).
///
/// The probe opens the path for writing (which creates nothing and truncates nothing) where it exists, and
/// reads its parent directory's own permissions where it does not.
fn path_is_reachable(path: &str) -> bool {
    let candidate = std::path::Path::new(path);
    match std::fs::metadata(candidate) {
        Ok(metadata) if metadata.is_dir() => false,
        Ok(_) => std::fs::OpenOptions::new()
            .write(true)
            .open(candidate)
            .is_ok(),
        Err(_) => {
            let parent = match candidate.parent() {
                Some(parent) if !parent.as_os_str().is_empty() => parent,
                _ => std::path::Path::new("."),
            };
            match std::fs::metadata(parent) {
                Ok(metadata) => metadata.is_dir() && !metadata.permissions().readonly(),
                Err(_) => false,
            }
        }
    }
}

impl Store {
    fn empty(
        file_path: String,
        journal_length: usize,
        register_tier: Tier,
        home: Vec<HomeEntry>,
    ) -> Store {
        Store {
            nodes: vec![Node::Branch(0)],
            links: vec![Link {
                container: Kind::Map,
                children: Children::map(),
                is_register: true,
            }],
            refs: vec![NodeRef {
                // `§1.6` item 4 (a)/(c)/(d): the register's parent anchor's address IS the empty set and its
                // own reference carries the register's OWN identity marker (the EMPTY segment marker) and THE
                // REGISTER'S OWN CONDITIONAL TIER — `file` where the path was provided and passed, `mem`
                // otherwise — and never a caller-passed tier (`§2.1`'s empty-address reference clause, `A42`).
                anchor: ChildAnchor {
                    key: Segment::Key(String::new()),
                    tier: register_tier,
                    // **`DD-44` (`§1.6` item 4 (c)): `register_marker` is TRUE on THIS reference and on no
                    // other — the register's own, whose address is the empty set. Every reference a segment
                    // reaches is minted through `Store::mint`, which carries `false`.**
                    register_marker: true,
                },
                node: 0,
            }],
            register: 0,
            register_ref: 0,
            journal: Vec::new(),
            last_seq: 0,
            home,
            file_path,
            journal_length,
            base_state: StoreValue::Object(BTreeMap::new()),
        }
    }

    // -----------------------------------------------------------------------------------------------
    // The arenas.
    // -----------------------------------------------------------------------------------------------

    fn new_node(&mut self, node: Node) -> usize {
        self.nodes.push(node);
        self.nodes.len() - 1
    }

    fn new_link(&mut self, container: Kind) -> usize {
        let children = match container {
            Kind::Map => Children::map(),
            Kind::Vec => Children::vec(),
        };
        self.links.push(Link {
            container,
            children,
            is_register: false,
        });
        self.links.len() - 1
    }

    fn new_ref(&mut self, anchor: ChildAnchor, node: usize) -> usize {
        self.refs.push(NodeRef { anchor, node });
        self.refs.len() - 1
    }

    fn node(&self, reference: usize) -> &Node {
        &self.nodes[self.refs[reference].node]
    }

    fn link_of(&self, reference: usize) -> Option<usize> {
        match self.node(reference) {
            Node::Branch(link) => Some(*link),
            Node::Leaf(_) => None,
        }
    }

    /// The tier an anchor stands at. **It is the composite key's second half and it lives in the anchor**
    /// (`§1.2`, `A34`), so the declared child container asks the arena for it rather than holding a copy.
    fn tier_of(&self, reference: usize) -> Tier {
        self.refs[reference].anchor.tier
    }

    /// The rank `Children`'s own queries sort by, bound to this instance's arena.
    fn rank_of(&self) -> impl Fn(usize) -> u8 + '_ {
        move |reference| self.refs[reference].anchor.tier.rank()
    }

    /// **`§4.2` `R-1`/`R-2` — THE CONTAINER'S KEYS.** **A keyed container answers with the HASHMAP'S OWN
    /// KEY SET** (`P: §1` line 96: *"hashmap, convert to an object, using the same keys"*), which is
    /// distinct by construction — **the `contains` dedup scan is gone with the scan**. **The keys are then
    /// put in spelling order, and that sort is the ONLY thing that orders them:** a `MAP`'s own iteration
    /// is *"unordered — the store declares no order over a `MAP`'s children"* (`store-model.md §1.3`), and
    /// the spelling sort exists so the GENERATED MESSAGES and a `MAP`'s assembled member list are
    /// DETERMINISTIC, which `§8.2` property (a) requires. An ARRAY container answers its index keys
    /// `0..len`, which ARE both its order and its contiguity (`§1.3`, `R-3`).
    fn keys_at(&self, link: usize) -> Vec<Segment> {
        let mut keys = self.links[link].children.key_set();
        keys.sort_by_key(|key| key.spelling());
        keys
    }

    /// **THE KEYED ACCESS — `O(1)`, BY CONSTRUCTION.** It is a lookup in the declared structure, not a
    /// scan of the siblings, and it allocates only when a key holds more than one anchor (at most the
    /// three tiers, `A34`).
    fn refs_at(&self, link: usize, key: &Segment) -> Vec<usize> {
        let rank = self.rank_of();
        self.links[link].children.at(key, rank)
    }

    /// The one reference standing at `(key, tier)`, or none — **the answer `A34` bounds to `0` or `1`**.
    fn pair_at(&self, link: usize, key: &Segment, tier: Tier) -> Option<usize> {
        self.links[link].children.pair(key, tier)
    }

    fn canonical(&self, mut references: Vec<usize>) -> Vec<usize> {
        references.sort_by_key(|reference| self.refs[*reference].anchor.tier.rank());
        references
    }

    /// Drop every anchor in `doomed` from the container, **by the pair each one stands at** — so the
    /// removal costs what the doomed set costs and never a scan of the surviving siblings.
    ///
    /// `close_up` is the CALLER'S own distinction between the two states a removal serves, and it is the
    /// store's, not this helper's: **the WRITE arms (`W-1`'s replacement, `W-6`'s purge, the re-mint) and
    /// every rebuild clear a pair whose INDEX stays occupied, so no gap is opened and no renumbering is
    /// owed; a DELETE removes the index itself, so its position closes up and `renumber_vec` re-keys the
    /// survivors (`§1.3`/`R-3`).**
    fn remove_refs(&mut self, link: usize, doomed: &[usize], close_up: bool) {
        if doomed.is_empty() {
            return;
        }
        for reference in doomed {
            let tier = self.tier_of(*reference);
            self.links[link]
                .children
                .remove(*reference, &|_held| tier, close_up);
        }
    }

    /// `§1.3`/`§4.2` `R-3`: **a `VEC`'s index keys are *"non-negative integers, contiguous from `0`"`** —
    /// **the positions ARE the indices, so a removal closes the gap by construction and this pass only
    /// re-keys each surviving anchor to the position it now stands at.** Each anchor keeps its own tier and
    /// points to the same node; only the index it stands at moves, so no node is minted, none is dropped
    /// and every surviving node stays reachable from the container's own (dense, from `0`) read (`§5.5`).
    fn renumber_vec(&mut self, link: usize) {
        if self.links[link].container != Kind::Vec {
            return;
        }
        for (reference, index) in self.links[link].children.renumber() {
            self.refs[reference].anchor.key = Segment::Index(index);
        }
    }

    // -----------------------------------------------------------------------------------------------
    // §2 — the shared resolver and the walk.
    // -----------------------------------------------------------------------------------------------

    /// `§2.3`'s selection rule, run at EVERY step of the walk — a pass-through step is no exception, so the
    /// passed tier set governs the whole walk. `L-3`/`L-TIER` are the two states a key can be in:
    ///
    /// * **no anchor at the key at all** (or a key whose CLASS the container's own key domain cannot hold —
    ///   `§1.5` item 3: *"NO COERCION OCCURS"*, a `string` segment resolves nowhere against a `VEC`) →
    ///   `L-3`'s `AddressNotFound`;
    /// * **an anchor at the key but no passed tier matching** → `L-TIER`'s `TierNotFound`.
    fn select(
        &self,
        link: usize,
        key: &Segment,
        sel: &TierSel,
        container_address: &[Segment],
    ) -> Result<usize, StoreError> {
        let anchors = self.refs_at(link, key);
        if anchors.is_empty() || !key_fits(self.links[link].container, key) {
            return Err(address_not_found(
                key,
                container_address,
                &self.keys_at(link),
                self.links[link].is_register,
            ));
        }
        let matched: Vec<usize> = anchors
            .iter()
            .copied()
            .filter(|reference| sel.matches(self.refs[*reference].anchor.tier))
            .collect();
        if matched.is_empty() {
            let mut present: Vec<Tier> = anchors
                .iter()
                .map(|reference| self.refs[*reference].anchor.tier)
                .collect();
            present.sort_by_key(|tier| std::cmp::Reverse(tier.rank()));
            return Err(tier_not_found(key, container_address, &present));
        }
        Ok(self.lowest(&matched))
    }

    /// `§2.3`: the selection is by `rank` ASCENDING — the lowest-persistence anchor answers.
    fn lowest(&self, references: &[usize]) -> usize {
        *references
            .iter()
            .min_by_key(|reference| self.refs[**reference].anchor.tier.rank())
            .expect("the candidate set is non-empty")
    }

    /// `§2.2`: the walk, arm by arm. It starts at the register, consumes exactly one segment per step and
    /// never mutates the store and never installs anything on its way down. Its second member is the
    /// register's own anchor tier, present only for `L-0`'s empty address.
    fn walk(
        &self,
        address: &[Segment],
        sel: &TierSel,
    ) -> Result<(usize, Option<Tier>), StoreError> {
        if address.is_empty() {
            // `L-0`: the empty address terminates immediately and resolves to the REGISTER, whose own
            // reference carries the register's OWN identity marker and NEVER a caller-passed tier
            // (`§2.1`'s empty-address reference clause, `§1.6` item 3).
            return Ok((self.register_ref, None));
        }
        let mut current = self.register_ref;
        let mut container_address: Vec<Segment> = Vec::new();
        for (step, segment) in address.iter().enumerate() {
            if !segment.is_in_domain() {
                // `L-1`: outside the segment domain — and NO FURTHER SEGMENT IS CONSUMED, so the container
                // the mismatch is found in is the one this step stands in (`§2.2`'s arm order, `§8.2`).
                return Err(malformed_segment(segment, &container_address));
            }
            let link = self
                .link_of(current)
                .expect("the walk holds an anchored node before each step");
            if self.links[link].is_register && matches!(segment, Segment::Index(_)) {
                // `L-INT-REG`: the register carries no index semantics.
                return Err(address_not_found(
                    segment,
                    &container_address,
                    &self.keys_at(link),
                    true,
                ));
            }
            let reached = self.select(link, segment, sel, &container_address)?;
            container_address.push(segment.clone());
            current = reached;
            if self.link_of(current).is_none() && step + 1 < address.len() {
                // `L-4`: a leaf with segments remaining fails verbosely.
                return Err(leaf_has_no_downstream(
                    &address[step + 1],
                    &container_address,
                ));
            }
        }
        // `L-5`: the address is exhausted and the held node is the addressed target.
        Ok((current, None))
    }

    /// `§4.2`'s assembly step, run at every key of the read's recursive walk — **and it is NOT `§2.2`'s
    /// walk**: the passed set is applied to each address EXACTLY as `§2.3` applies it at a walk step (the
    /// lowest-persistence anchor WITHIN THE PASSED SET answers, `A11`'s one predicate being its ground), but
    /// **a key whose anchors lie at NO passed tier contributes NO MEMBER — it is OMITTED** (`§4.2`'s
    /// reconciliation (a)/(b); `§2.2`'s scope clause (ii); `DD-31`). The omission **produces NO code**: this
    /// step answers no `L-TIER`'s `TierNotFound` for a key the caller never addressed, assembles no
    /// out-of-set anchor and never falls back to the lowest-persistence arm `A28` reserves to a `0`-token set.
    ///
    /// `None` has exactly ONE meaning here: **no passed version is selectable at this key**, so the member is
    /// omitted. The zero-tier arm (`TierSel::All`) matches every anchor, so `A28`'s lowest-persistence
    /// selection runs at every address and **nothing is omitted**.
    fn select_member(&self, link: usize, key: &Segment, sel: &TierSel) -> Option<usize> {
        let anchors = self.refs_at(link, key);
        if anchors.is_empty() {
            return None;
        }
        let matched: Vec<usize> = anchors
            .iter()
            .copied()
            .filter(|reference| sel.matches(self.refs[*reference].anchor.tier))
            .collect();
        if matched.is_empty() {
            return None;
        }
        Some(self.lowest(&matched))
    }

    /// `§4.2`: the read's assembly, recursively, with the selection rule applied at every key. Its fail set
    /// is EMPTY: the only state a read cannot reach is the ADDRESS it was named (`§2.2`'s scope clause, the
    /// `L-TIER` at a WALK step) — a descendant the caller did not name is an omitted member, never a failure.
    fn assemble(
        &self,
        reference: usize,
        sel: &TierSel,
        address: &mut Vec<Segment>,
    ) -> Result<StoreValue, StoreError> {
        match self.node(reference) {
            Node::Leaf(value) => Ok(value.clone()),
            Node::Branch(link) => {
                let link = *link;
                match self.links[link].container {
                    Kind::Map => {
                        let mut members = BTreeMap::new();
                        // **`P: §1` line 96 — *"hashmap, convert to an object, using the same keys"*: the
                        // walk iterates THE KEYED STRUCTURE'S OWN KEYS**, so the `contains` dedup scan and
                        // the per-key `refs_at` scan are gone and each member costs its own pair lookup.
                        let mut keys = self.links[link].children.key_set();
                        keys.sort_by_key(|key| key.spelling());
                        for key in keys {
                            let child = match self.select_member(link, &key, sel) {
                                Some(child) => child,
                                // `§4.2` (b): the key's anchors lie at no passed tier, so the member is
                                // OMITTED — no entry to the assembled `MAP`, and no code at all.
                                None => continue,
                            };
                            let name = match &key {
                                Segment::Key(name) => name.clone(),
                                other => other.spelling(),
                            };
                            address.push(key);
                            let value = self.assemble(child, sel, address)?;
                            address.pop();
                            members.insert(name, value);
                        }
                        Ok(StoreValue::Object(members))
                    }
                    Kind::Vec => {
                        let mut items = Vec::new();
                        // **`P: §1` line 95 — *"If the downstream link is a vec, convert to array"*: the
                        // container's positions ARE its contiguous indices (`§1.3`, `R-3`), so the walk
                        // takes each position in index order and needs no key test to know it holds one.**
                        for index in 0..self.links[link].children.len() {
                            let key = Segment::Index(index as u64);
                            // `§4.2` (b) + `R-3`: an omitted element contributes no entry, so the
                            // assembled array stays DENSE FROM `0` — its length is the count of the
                            // container's index keys the passed set selects.
                            let child = match self.select_member(link, &key, sel) {
                                Some(child) => child,
                                None => continue,
                            };
                            address.push(key);
                            let value = self.assemble(child, sel, address)?;
                            address.pop();
                            items.push(value);
                        }
                        Ok(StoreValue::Array(items))
                    }
                }
            }
        }
    }

    /// The infallible assembly the journal's state halves and the `file` snapshot use (`§2.3`'s zero-tier
    /// arm cannot miss: every key it visits holds at least one anchor).
    fn assemble_all(&self, reference: usize) -> StoreValue {
        self.assemble(reference, &TierSel::All, &mut Vec::new())
            .unwrap_or(StoreValue::Null)
    }

    // -----------------------------------------------------------------------------------------------
    // §7.2 — the `file` tier.
    // -----------------------------------------------------------------------------------------------

    fn assemble_at_tier(&self, reference: usize, tier: Tier) -> StoreValue {
        match self.node(reference) {
            Node::Leaf(value) => value.clone(),
            Node::Branch(link) => {
                let link = *link;
                match self.links[link].container {
                    Kind::Map => {
                        let mut members = BTreeMap::new();
                        // The keyed structure's OWN keys, and the pair's OWN entry (`A34`'s `0`-or-`1`),
                        // rather than a per-key scan of the key's anchors.
                        let mut keys = self.links[link].children.key_set();
                        keys.sort_by_key(|key| key.spelling());
                        for key in keys {
                            let name = match &key {
                                Segment::Key(name) => name.clone(),
                                other => other.spelling(),
                            };
                            if let Some(child) = self.pair_at(link, &key, tier) {
                                members.insert(name, self.assemble_at_tier(child, tier));
                            }
                        }
                        StoreValue::Object(members)
                    }
                    Kind::Vec => {
                        let mut items = Vec::new();
                        for index in 0..self.links[link].children.len() {
                            let key = Segment::Index(index as u64);
                            match self.pair_at(link, &key, tier) {
                                Some(child) => items.push(self.assemble_at_tier(child, tier)),
                                None => break,
                            }
                        }
                        StoreValue::Array(items)
                    }
                }
            }
        }
    }

    /// `§7.2` `M-12`: the `file` tier's state — every REGISTER key's `file`-tier version, whole.
    fn file_snapshot(&self) -> StoreValue {
        let mut members = BTreeMap::new();
        for key in self.keys_at(self.register) {
            let Segment::Key(name) = &key else { continue };
            let file_anchor = self.pair_at(self.register, &key, Tier::File);
            if let Some(reference) = file_anchor {
                members.insert(name.clone(), self.assemble_at_tier(reference, Tier::File));
            }
        }
        StoreValue::Object(members)
    }

    /// `§7.2` `M-12` + `DD-2`: the commit is atomic at the file — the whole serialized state is written to
    /// a sibling and renamed over the path, so a failure leaves the prior bytes intact.
    fn commit_file(&self, address: &[Segment]) -> Result<(), StoreError> {
        let text = json::encode(&self.file_snapshot());
        let temp = format!("{}.snst-commit-{}", self.file_path, std::process::id());
        let committed = std::fs::write(&temp, text.as_bytes())
            .and_then(|_| std::fs::rename(&temp, &self.file_path));
        if committed.is_err() {
            let _ = std::fs::remove_file(&temp);
            return Err(file_commit_failed(address, &self.file_path));
        }
        Ok(())
    }

    /// `§7.2` item 6: the boot loads the `file` tier's content if the file exists — **step 7 of `§7.1`'s
    /// amended sequence, which produces `0` registrations (`DD-38`).** A path-less instance (`filePath`
    /// ABSENT) has no `file` tier at all, so nothing is loaded and the register keeps its `mem` tier.
    fn boot_load(&mut self) {
        if self.file_path.is_empty() {
            return;
        }
        let Ok(text) = std::fs::read_to_string(&self.file_path) else {
            return;
        };
        let Ok(StoreValue::Object(members)) = json::decode(&text) else {
            return;
        };
        for (name, value) in members {
            if value.is_admitted() {
                let link = self.register;
                self.mint(link, Segment::Key(name), Tier::File, &value);
            }
        }
    }

    // -----------------------------------------------------------------------------------------------
    // §3 — the write's install stage, the purge and the mint.
    // -----------------------------------------------------------------------------------------------

    /// `§3.3`: mint a node (or a whole branch-tree, recursively) and its child anchor at `tier`. Every
    /// anchor the write mints carries the write's tier (`DD-10`), and `(key, tier)` is the composite key —
    /// at most one child anchor per pair (`P: §15 · A34`).
    fn mint(&mut self, link: usize, key: Segment, tier: Tier, value: &StoreValue) -> usize {
        self.install(link, key, tier, value, false)
    }

    /// **⟶ STEP (a) OF THE REPAIR, 2026-10-11 (`DEF-18`; the architect's own observation at
    /// `docs/specs/storeroom-js-rca-scaling.md §5-bis` — *"The write doesn't have to look up the written
    /// siblings, it only has to check the index/tier the write occurs at, which is O(1)"*) — THE VACUOUS
    /// SAME-PAIR LOOKUP IS REMOVED, and the GENUINE one is kept exactly where it is owed:**
    ///
    /// * **`fresh` is TRUE at the two recursion sites below and nowhere else** — each of them calls
    ///   `new_link` first, whose `Children` begins EMPTY, and then installs into it **once per member of
    ///   the value being written (its object's distinct names, its array's contiguous indices)**. **No
    ///   `(key, tier)` pair can stand there**, so the same-pair access is provably empty and the lookup
    ///   and its removal are skipped: **the `Σ k ≈ n²/2` the RCA measured is gone from a container write,
    ///   and this holds whatever structure the container uses.**
    /// * **`fresh` is FALSE at every write site — `mint` from `write` (`W-1`'s replacement, `W-6`'s purge
    ///   and the re-mint arm), from `rebuild`'s two levels, and from the boot's `boot_load`** — so **the
    ///   GENUINE same-pair lookup still runs there and still removes the anchor standing at the pair**,
    ///   which is `A34`'s one-anchor-per-pair rule and the write arms' own replacement semantics. The
    ///   removal at those sites is bounded by the tier count, exactly as `§5-bis` (2) states.
    ///
    /// The pair is resolved through the declared structure's own `O(1)` access, so the lookup that IS owed
    /// costs one pair's own answer rather than a scan of the siblings.
    fn install(
        &mut self,
        link: usize,
        key: Segment,
        tier: Tier,
        value: &StoreValue,
        fresh: bool,
    ) -> usize {
        if !fresh {
            if let Some(doomed) = self.pair_at(link, &key, tier) {
                debug_assert_eq!(
                    self.links[link].container,
                    self.links[link].children.kind(),
                    "the kind marker and the declared structure agree"
                );
                // A REPLACEMENT: the index the pair stands at stays occupied by the anchor installed
                // below, so no position closes up and no renumbering runs.
                self.remove_refs(link, &[doomed], false);
            }
        }
        let node = match value {
            StoreValue::Object(members) => {
                let child_link = self.new_link(Kind::Map);
                for (name, member) in members {
                    self.install(child_link, Segment::Key(name.clone()), tier, member, true);
                }
                self.new_node(Node::Branch(child_link))
            }
            StoreValue::Array(items) => {
                let child_link = self.new_link(Kind::Vec);
                for (index, item) in items.iter().enumerate() {
                    self.install(child_link, Segment::Index(index as u64), tier, item, true);
                }
                self.new_node(Node::Branch(child_link))
            }
            leaf => self.new_node(Node::Leaf(leaf.clone())),
        };
        // **`DD-44`: a reference a SEGMENT reaches carries `register_marker: false`** — the marker is TRUE on
        // the register's own reference ALONE (`§1.6` item 4 (c)), and this is the one mint every other
        // reference in the store passes through.
        let reference = self.new_ref(
            ChildAnchor {
                key: key.clone(),
                tier,
                register_marker: false,
            },
            node,
        );
        // The one install: a keyed container files the anchor under its own key and tier, an array
        // container places it at its own contiguous index (`§1.3`).
        self.links[link].children.install(key, tier, reference);
        reference
    }

    /// The parent link and the last key an address names, when the address resolves.
    fn locate(&self, address: &[Segment]) -> Option<(usize, Segment)> {
        let (last, parents) = address.split_last()?;
        // An EMPTY parent chain is `L-0`: the parent IS the register, whose link is the register's own —
        // `walk`'s `L-0` reference names no child of it, so it must not be resolved as one.
        let link = if parents.is_empty() {
            self.register
        } else {
            self.link_of(self.walk(parents, &TierSel::All).ok()?.0)?
        };
        Some((link, last.clone()))
    }

    /// The pre-state of an operation, transitively (`§6.2` property 1): the version set of the addressed
    /// node's OWN pair, AND the version set of every key/index beneath it — because destroying or
    /// replacing a version CASCADES to its whole downstream subtree (`§3.3` item 3, `§3.4` arms
    /// `W-1`/`W-2`/`W-6`), and a re-mint at one tier would otherwise fold every descendant version into
    /// that tier. Each entry's `path` is relative to the operation's own address.
    fn capture(&self, home: &PairHome) -> Vec<Captured> {
        let mut captured = Vec::new();
        for reference in self.refs_at(home.link, &home.key) {
            captured.push(Captured {
                path: Vec::new(),
                tier: self.refs[reference].anchor.tier,
                value: self.assemble_all(reference),
            });
            self.capture_below(reference, Vec::new(), &mut captured);
        }
        captured
    }

    /// The pair an operation's address names, where it names one. The EMPTY address names no single pair:
    /// its pre-state is the whole register, whose pairs the capture walks from the register itself.
    fn pair_home(&self, address: &[Segment]) -> Option<PairHome> {
        let (last, parents) = address.split_last()?;
        // The link the keyed pair stands on: the PARENT link and the key, whether or not the key holds an
        // anchor — a rollback restores into the state the entry stood in, so an absent pair still has a home.
        let parent_link = if parents.is_empty() {
            self.register
        } else {
            self.link_of(self.walk(parents, &TierSel::All).ok()?.0)?
        };
        let link = self
            .refs_at(parent_link, last)
            .into_iter()
            .next()
            .and_then(|reference| self.link_of(reference))
            .unwrap_or(parent_link);
        Some(PairHome {
            link,
            key: last.clone(),
        })
    }

    /// Every version standing BELOW one anchor, at every key/index path, with the value that version's
    /// own subtree reads as at that moment.
    fn capture_below(&self, reference: usize, path: Vec<Segment>, captured: &mut Vec<Captured>) {
        let Some(link) = self.link_of(reference) else {
            return;
        };
        for key in self.keys_at(link) {
            let mut child_path = path.clone();
            child_path.push(key.clone());
            for child in self.refs_at(link, &key) {
                captured.push(Captured {
                    path: child_path.clone(),
                    tier: self.refs[child].anchor.tier,
                    value: self.assemble_all(child),
                });
                self.capture_below(child, child_path.clone(), captured);
            }
        }
    }

    /// The restore the rollback and the `file` tier's automatic rollback run (`§6.4`, `§7.2` item 3). It
    /// re-mints EVERY captured version at its OWN tier — the addressed node's own version set AND every
    /// version beneath it — so the subtree comes back whole and `§3.5`'s *"byte-identical to its state
    /// before it"* holds for the failed commit.
    fn restore(&mut self, home: &PairHome, captured: &[Captured]) -> bool {
        let own: Vec<Captured> = captured
            .iter()
            .filter(|entry| entry.path.is_empty())
            .cloned()
            .collect();
        if self.refs_at(home.link, &home.key).is_empty() && captured.is_empty() {
            // The pair's own node is gone and no version of it stood before the operation: nothing stood
            // there to put back.
            return true;
        }
        self.rebuild(home.link, Vec::new(), home.key.clone(), &own, captured);
        true
    }

    /// Rebuild the pair a level walks, and — beneath it — every captured path, each at its OWN tier. Each
    /// level clears every pair it walks and its own pair, THEN writes its version set and recurses into the
    /// child pair the write just created — so each descendant version is written on the link its own
    /// ancestor version actually holds, never on a link the rebuilt tree has left behind.
    fn rebuild(
        &mut self,
        base: usize,
        walked: Vec<Segment>,
        key: Segment,
        own: &[Captured],
        captured: &[Captured],
    ) {
        let children: Vec<Vec<Segment>> = child_paths(captured, &walked);
        // Clear the pair before writing it: every version's node is minted fresh, so no version from the
        // operation's own attempt may stand beside them.
        let doomed = self.refs_at(base, &key);
        self.remove_refs(base, &doomed, false);
        for entry in ordered_one_anchor(own) {
            self.mint(base, key.clone(), entry.tier, &entry.value);
        }
        // The child pairs THIS level's own version set has just created: each path's own key, on the link
        // the version that holds it stands for.
        let mut levels: Vec<(Vec<Segment>, Segment, usize)> = Vec::new();
        for path in &children {
            let last = path.last().cloned().expect("a child path is not empty");
            let Some(anchor) = self
                .refs_at(base, &last)
                .into_iter()
                .min_by_key(|reference| self.refs[*reference].anchor.tier.rank())
            else {
                continue;
            };
            if self.link_of(anchor).is_none() && path.len() > walked.len() {
                // A literal version whose own descendants still stand below it: its children hang from the
                // link its own anchor stands on, so the anchor is replaced by a link the recursion can use
                // (`§3.3` item 1: the new node is added UNLESS the resolved node was a leaf).
                let tier = self.refs[anchor].anchor.tier;
                let doomed = vec![anchor];
                self.remove_refs(base, &doomed, false);
                let replacement = self.mint(
                    base,
                    last.clone(),
                    tier,
                    &StoreValue::Object(BTreeMap::new()),
                );
                levels.push((path.clone(), last, replacement));
                continue;
            }
            levels.push((path.clone(), last, anchor));
        }
        // Then each child path's own version set, on the link its own version stands for.
        for (path, last, anchor) in levels {
            let own: Vec<Captured> = captured
                .iter()
                .filter(|entry| entry.path == path)
                .cloned()
                .collect();
            let Some(link) = self.link_of(anchor) else {
                continue;
            };
            let doomed = self.refs_at(link, &last);
            self.remove_refs(link, &doomed, false);
            for entry in ordered_one_anchor(&own) {
                self.mint(link, last.clone(), entry.tier, &entry.value);
            }
            self.rebuild(link, path, last, &own, captured);
        }
    }

    /// `§6.1` item 5's marks, undone with a popped entry: the failed write's residue may not include a
    /// compaction mark an append caused (`§3.5`, `§6.4` `M-6`).
    fn restore_compaction(&mut self, compacted: &[String]) {
        for entry in self.journal.iter_mut() {
            // Every mark the journal stood at when the popped entry was appended is put back whole: an
            // entry the popped append compacted is un-marked, and no entry that stood compacted then is
            // un-marked by the failure (`§3.5`: the failed write leaves a byte-identical state).
            entry.op.compacted = compacted.contains(&entry.op.opId);
        }
    }

    /// The declared `before`/`restoredTo` view of an address: `present` and the value a read answers there.
    /// Where the operation touched MORE THAN ONE version at the addressed node, the value is the ordered
    /// list of the values it touched, in `§5.1`'s canonical tier order (`§6.2`'s `BaseState.value`).
    ///
    /// An ABSENT state is spelt `StoreValue::Undefined` — `§0.4`'s own `StoreValue` member and `§1.4`'s
    /// outside class, *"each spelled so its trigger is REACHABLE"* — and never `Null`, which is the OTHER
    /// outside class and a value the taxonomy refuses; `present` carries the absent state's semantics
    /// (`§6.2`'s `BaseState` clause, `§1.4`).
    fn absent_state() -> BaseState {
        BaseState {
            present: false,
            value: StoreValue::Undefined,
        }
    }

    fn state_from_captured(&self, address: &[Segment], captured: &[Captured]) -> BaseState {
        if captured.is_empty() {
            return Store::absent_state();
        }
        if address.is_empty() {
            return BaseState {
                present: true,
                value: self.assemble_all(self.register_ref),
            };
        }
        let touched: Vec<&Captured> = captured
            .iter()
            .filter(|entry| entry.path.is_empty())
            .collect();
        if touched.len() > 1 {
            let mut ordered = touched;
            ordered.sort_by_key(|entry| std::cmp::Reverse(entry.tier.rank()));
            return BaseState {
                present: true,
                value: StoreValue::Array(ordered.iter().map(|entry| entry.value.clone()).collect()),
            };
        }
        let lowest = touched
            .first()
            .copied()
            .or_else(|| captured.iter().min_by_key(|entry| entry.tier.rank()))
            .expect("the captured set is non-empty");
        BaseState {
            present: true,
            value: lowest.value.clone(),
        }
    }

    /// The state an address stands at NOW — the current-state half (`§6.2` property 2).
    fn state_now(&self, address: &[Segment]) -> BaseState {
        if address.is_empty() {
            if self.links[self.register].children.is_empty() {
                return Store::absent_state();
            }
            return BaseState {
                present: true,
                value: self.assemble_all(self.register_ref),
            };
        }
        match self.locate(address) {
            Some((link, key)) => {
                let anchors = self.canonical(self.refs_at(link, &key));
                match anchors.first() {
                    Some(reference) => BaseState {
                        present: true,
                        value: self.assemble_all(*reference),
                    },
                    None => Store::absent_state(),
                }
            }
            None => Store::absent_state(),
        }
    }

    // -----------------------------------------------------------------------------------------------
    // §6.1 item 5 — the journal's bound and its compression trigger.
    // -----------------------------------------------------------------------------------------------

    fn append(
        &mut self,
        mut op: JournalOp,
        captured: Vec<Captured>,
        home: Option<PairHome>,
        compacted: Vec<String>,
    ) -> JournalOp {
        self.last_seq += 1;
        op.seq = self.last_seq;
        let stored = op.clone();
        self.journal.push(Entry {
            op,
            captured,
            home,
            compacted,
        });
        loop {
            let uncompacted = self
                .journal
                .iter()
                .filter(|entry| !entry.op.compacted)
                .count();
            if uncompacted <= self.journal_length {
                break;
            }
            match self.journal.iter().position(|entry| !entry.op.compacted) {
                Some(oldest) => {
                    self.journal[oldest].op.compacted = true;
                    // `§6.1` item 5: **the base state is a SNAPSHOT of the store's own observable state at
                    // the moment of compression** — the value every reachable address reads at that moment,
                    // i.e. the register's whole readable content — and it replaces every compressed entry as
                    // the walk's floor.
                    self.base_state = self.assemble_all(self.register_ref);
                }
                None => break,
            }
        }
        stored
    }

    // -----------------------------------------------------------------------------------------------
    // §6.5 — the listener surface: the home's lookup, the trigger's selection and the two returned lists.
    // -----------------------------------------------------------------------------------------------

    /// **`§6.5` item 10 (d) (iii) — THE TRIGGER'S SELECTION RULE, RE-STATED AS THE LISTENER'S OWN**:
    /// **a listener bound at address `W` is triggered by a successful `write` or `delete` at address `X`
    /// iff `W` is a PREFIX of `X`** — descendant-inclusive from `W` downward (`A33`, `A37`; `DD-18`) — **and
    /// `DD-36` adds that NOTHING CARRIES OVER from the superseded tier qualifier: `address` is the WHOLE of
    /// the listener's key, so NO TIER TEST RUNS AT ANY TRIGGER.** **The store RETURNS these handles and
    /// INVOKES NOTHING** (`A57`); **the order is unspecified and the list is a SET** (`DD-37`).
    ///
    /// **THE ONE HOME IS THE SOURCE OF THE SET** (`A45`/`A48`; `§5.8` (c)/(d)): a node's `active`/`carried`
    /// lists are *"an INDEX FOR LOOKUP COST only"*, and *"the same two sets must be produced whether the
    /// index is consulted or the home is scanned"* — so the selection below reads the home directly and no
    /// membership depends on a node's lifetime (`A46`) or on the `active`/`carried` split (`A47`).
    fn triggered_for(&self, address: &[Segment]) -> Vec<ListenerHandle> {
        self.home
            .iter()
            .filter(|entry| is_prefix(&entry.address, address))
            .map(|entry| entry.handle.clone())
            .collect()
    }

    /// `§5.8` (e) — the KEPT half: **`watched` keeps carrying the watched ADDRESSES** (`DD-35`), as a SET of
    /// DISTINCT addresses (`§6.5` item 2's kept half, item 5: *"NO ORDER IS DECLARED FOR THE LIST"*), so ONE
    /// address yields ONE member however many home entries carry it. **The only surface that can leave TWO
    /// entries at ONE address is the CONSTRUCTION's `listeners[]`** — `DD-39`'s *"both entries are KEPT, each
    /// with its OWN handle"*, adopted VERBATIM and never re-minted (`§0.4` clause 2 (b)) — **and there the
    /// address is one member while both handles fire; `listen` itself never adds a second entry at an
    /// address the home already holds** (`§6.5` item 12 (c)).
    fn watched_for(&self, address: &[Segment]) -> Vec<Vec<Segment>> {
        let mut watched: Vec<Vec<Segment>> = Vec::new();
        for entry in &self.home {
            if is_prefix(&entry.address, address) && !watched.contains(&entry.address) {
                watched.push(entry.address.clone());
            }
        }
        watched
    }

    // -----------------------------------------------------------------------------------------------
    // The verbs.
    // -----------------------------------------------------------------------------------------------

    /// `§2.1`: the ONE shared resolution function — **the AMENDED consumer set, `read` · `write` · `delete` ·
    /// `listen` · `unlisten`, each reaching its target through it and through no second resolver.** The
    /// as-filed sentence named `watch`, which `A58` SUPERSEDES as a stopgap for the listener surface
    /// (`write-and-read.md §6.5`), so `§2.1`'s restatement of this consumer set replaces it.
    pub fn findAddress(&self, address: AddressArg, tier: TierArg) -> Result<&NodeRef, StoreError> {
        let sel = read_tier_sel(&tier)?;
        let segments = address_segments(&address)?;
        let reference = if segments.is_empty() {
            self.register_ref_for(&sel)
        } else {
            self.walk(&segments, &sel)?.0
        };
        Ok(&self.refs[reference])
    }

    /// The REGISTER's own reference — the one state `L-0` answers, where no anchor stands on any link.
    /// **⟶ AMENDED 2026-10-11: the register IS a link and therefore CARRIES its own parent anchor, whose
    /// address is the empty set `[]` and whose `node` is the DISTINCT CARRIER NODE** (`§1.6` item 4 (a)/(b);
    /// as-filed item 3's *"it has NO parent anchor"* is WITHDRAWN and read through item 4, and it is the
    /// CARRIER NODE — not the register — that has no parent of its own). `§2.1`'s empty-address reference
    /// clause, re-read through `§1.6` item 4: **NO ANCHOR OF A CALLER-NAMED KEY AND NO CALLER-PASSED TIER IS
    /// READ INTO THE RETURNED REFERENCE** — the register's reference carries the EMPTY SEGMENT MARKER and
    /// **the register's OWN CONDITIONAL TIER, `file` where the construction's path is provided and passes the
    /// reachability test and `mem` otherwise, FIXED AT CREATION and never moved** (`§1.6` item 4 (d); `A42`,
    /// `A49`, `A50`; that is the `register_tier` this `Store::empty` recorded and the field the code stores —
    /// **not a fixed spelling of `mem`**) — so `findAddress([], file)` and `findAddress([], temp)` answer the
    /// SAME reference, that reference's `anchor.tier` is the register's own tier in every case, and neither
    /// answer asserts the caller's `t`.
    fn register_ref_for(&self, _sel: &TierSel) -> usize {
        self.register_ref
    }

    /// `§4.1`: the read — the tier argument is OPTIONAL and accepts zero to many tiers.
    pub fn read(&self, address: AddressArg, tier: TierArg) -> Result<StoreValue, StoreError> {
        let sel = read_tier_sel(&tier)?;
        let segments = address_segments(&address)?;
        let reference = if segments.is_empty() {
            self.register_ref_for(&sel)
        } else {
            self.walk(&segments, &sel)?.0
        };
        let mut path = segments.clone();
        // R-5 falls out of R-2: the register is always a MAP (`P: §13 · A23`).
        self.assemble(reference, &sel, &mut path)
    }

    /// `§4.1.1`: the literal-only form — the same read with ONE narrowing, its target must be a `leaf`.
    pub fn readLiteral(
        &self,
        address: AddressArg,
        tier: TierArg,
    ) -> Result<StoreValue, StoreError> {
        let sel = read_tier_sel(&tier)?;
        let segments = address_segments(&address)?;
        let reference = if segments.is_empty() {
            self.register_ref_for(&sel)
        } else {
            self.walk(&segments, &sel)?.0
        };
        match self.node(reference) {
            Node::Leaf(value) => Ok(value.clone()),
            Node::Branch(_) => Err(read_target_is_branch(&segments)),
        }
    }

    /// `§3.1`: `write(address, tier, value) → WriteResult`, with `§3.2`'s two-stage resolution and
    /// `§3.4`'s closed arm table.
    pub fn write(
        &mut self,
        address: AddressArg,
        tier: TierArg,
        value: StoreValue,
    ) -> Result<WriteResult, StoreError> {
        // `F-1` and `§3.1.1`'s arity row: the write's tier is REQUIRED and SINGULAR.
        let write_tier = write_tier(&tier)?;
        let segments = address_segments(&address)?;
        // `F-2`: the value taxonomy (`§1.4`); no node is minted.
        if !value.is_admitted() {
            return Err(value_not_admitted(&segments));
        }
        // `§6.1` item 5's compression marks THIS write's own append may set. The entries the journal held
        // at ENTRY are marked here, and the mark is carried into the journal once the append lands — because
        // the failed append's pop shifts the indices the mark would otherwise be restored through (`§3.5`,
        // `DD-16`).
        let compacted_before: Vec<String> = self
            .journal
            .iter()
            .filter(|entry| entry.op.compacted)
            .map(|entry| entry.op.opId.clone())
            .collect();
        // `§3.2` item 6: a target that IS the register has no key to install under.
        if segments.is_empty() {
            return Err(write_parent_not_link("''".to_string(), &segments));
        }
        let key = segments[segments.len() - 1].clone();
        // `L-1` at the target's OWN segment, fired in the walk's own arm order (`§2.2`): the segment the
        // write is addressed by is consumed last, so an earlier segment's failure is the write's failure.
        if !key.is_in_domain() {
            let parents: Vec<Segment> = segments[..segments.len() - 1].to_vec();
            return Err(malformed_segment(&key, &parents));
        }
        let parents: Vec<Segment> = segments[..segments.len() - 1].to_vec();
        // `§3.2` item 2 (DD-27): the PARENT resolution is TIER-AGNOSTIC — the walk's zero-tier arm.
        let parent = self.walk(&parents, &TierSel::All)?.0;
        if self.link_of(parent).is_none() {
            // `F-5`: the resolved parent is a leaf, whatever the value's class is.
            return Err(write_parent_not_link(key.spelling(), &parents));
        }
        let parent_link = self.link_of(parent).expect("checked above");
        if self.links[parent_link].is_register && matches!(key, Segment::Index(_)) {
            return Err(address_not_found(
                &key,
                &parents,
                &self.keys_at(parent_link),
                true,
            ));
        }
        if !key_fits(self.links[parent_link].container, &key) {
            // `§1.3`'s KEY-DOMAIN ARM (`§1.5` items 2–3): the write is the ONE verb whose answer at a segment
            // whose class the parent container's key domain cannot hold differs from the walk's answer — it
            // would MINT at the key, so the state is a KIND CONTRADICTION and it answers the same member the
            // value's own kind contradiction answers: `ContainerKindConflict`, with NOTHING INSTALLED (no
            // anchor, no coercion, no container-kind change, and no journal entry) (`§3.4` arm `F-4`).
            let kind = self.links[parent_link].container;
            return Err(container_kind_conflict_for_key(
                &key,
                &parents,
                kind,
                &self.keys_at(parent_link),
            ));
        }
        // **⟶ ADDED 2026-10-11 (`DD-43`; `write-and-read.md §3.4`'s totality clause, read with
        // `store-model.md §1.3`'s `VEC` key domain and `§4.2` `R-3`) — THE `VEC` INDEX-RANGE RULE:** **a
        // write whose LAST segment is an INDEX and whose resolved parent container is a `VEC` holding `n`
        // anchors is IN DOMAIN iff `0 ≤ i ≤ n` — `i = n` APPENDS (`W-3`/`W-4`) and `i < n` is the pair's own
        // arm — and is OUT OF DOMAIN iff `i > n`, which fails `ContainerKindConflict` and INSTALLS NOTHING:
        // no anchor, no coercion, no container-kind change and no journal entry.** The integer segment is an
        // INDEX that contradicts the container's own key domain by falling outside the contiguous domain the
        // same clause declares (`§1.3`'s key-domain arm; `F-4`), so **no node the parent's own read cannot
        // contain can be minted by a write** — `read(['v'])` stays DENSE from `0` with its length the
        // container's contiguous index count (`R-3`) and `read(['v', idx(5)])` over a `2`-element `VEC`
        // fails `AddressNotFound` (`L-3`), because the hole has NO INSTANCE (`§8.1` #7, UNCHANGED and no new
        // member minted).
        if let Segment::Index(index) = key {
            let container = self.links[parent_link].container;
            if container == Kind::Vec {
                // The container's contiguous index count: its DISTINCT index keys (`§1.3`'s *"contiguous
                // from `0`"*, read with `§4.2` `R-3`'s *"the container's contiguous index count"*). No
                // renumbering is owed here — a refused write mints no key and removes none, so no gap can
                // stand: the delete path's `renumber_vec` (`DD-30`) is the only state that closes one.
                let contiguous = self.keys_at(parent_link).len() as u64;
                if index > contiguous {
                    return Err(container_kind_conflict_for_key(
                        &key,
                        &parents,
                        container,
                        &self.keys_at(parent_link),
                    ));
                }
            }
        }
        // `§3.2` item 4: the monotonic clause over the parent anchor and the child the write mints.
        // **⟶ AMENDED 2026-10-11 (`A51`; `§1.6` item 4 (d) (ii)): THE REGISTER'S BOUND IS REAL — the shipped
        // exemption is superseded, so a write whose tier outranks the REGISTER's own tier fails exactly as at
        // any other link, and in a `mem`-register store the `file` tier is unreachable at register keys and,
        // through this clause, at every address below them.**
        let parent_tier = self.refs[parent].anchor.tier;
        if write_tier.rank() > parent_tier.rank() {
            return Err(monotonicity_violation(&key, &segments));
        }
        let home = PairHome {
            link: parent_link,
            key: key.clone(),
        };
        let captured = self.capture(&home);
        let anchors = self.refs_at(parent_link, &key);
        let selected = anchors
            .iter()
            .copied()
            .min_by_key(|reference| self.refs[*reference].anchor.tier.rank());
        // `F-4`: the value's kind contradicts the TARGET's container kind (`DD-19`: one code, both
        // directions, and the container, the node and the journal stay untouched).
        if let Some(reference) = selected {
            if let (Some(value_kind), Some(target_link)) =
                (value.container_kind(), self.link_of(reference))
            {
                if self.links[target_link].container != value_kind {
                    let keys = self.keys_at(target_link);
                    return Err(container_kind_conflict(
                        &value,
                        &segments,
                        self.links[target_link].container,
                        &keys,
                    ));
                }
            }
        }
        // `W-6`'s purge (the designated arm where `W-1`'s and `W-6`'s pre-states hold at once):
        // every version of the addressed node at `rank ≤ rank(write tier)` is removed, whole subtree with
        // it; `W-1`'s equal-tier replacement is that same removal.
        let mut doomed: Vec<usize> = anchors
            .iter()
            .copied()
            .filter(|reference| self.refs[*reference].anchor.tier.rank() <= write_tier.rank())
            .collect();
        // `§1.1`'s re-mint arm: a structured write whose target resolves to a leaf destroys that leaf's
        // pointing anchor and places a new anchor on the same link — the destroyed anchor's tier does not
        // survive onto the new one.
        if value.container_kind().is_some() {
            if let Some(reference) = selected {
                if self.link_of(reference).is_none()
                    && self.refs[reference].anchor.tier.rank() > write_tier.rank()
                {
                    doomed.push(reference);
                }
            }
        }
        self.remove_refs(parent_link, &doomed, false);
        self.mint(parent_link, key, write_tier, &value);
        let before = self.state_from_captured(&segments, &captured);
        let op = JournalOp {
            opId: next_op_id(),
            kind: JournalOpKind::Write,
            address: segments.clone(),
            tier: Some(write_tier),
            before,
            after: BaseState {
                present: true,
                value: value.clone(),
            },
            seq: 0,
            compacted: false,
        };
        let op = self.append(
            op,
            captured.clone(),
            Some(home.clone()),
            compacted_before.clone(),
        );
        let watched = self.watched_for(&segments);
        let triggered = self.triggered_for(&segments);
        // `§7.2` items 3–4: a `file`-tier write's failure path rolls the change back in the journal
        // automatically and THEN passes the failure back to the caller (`A16`).
        if write_tier == Tier::File {
            if let Err(failure) = self.commit_file(&segments) {
                self.restore(&home, &captured);
                if let Some(entry) = self.journal.pop() {
                    // `§3.5`: *"NO JOURNAL ENTRY WAS APPENDED"* — and the marks the popped entry's own
                    // append set are part of the state the failed write must leave untouched (`§6.1` item 5,
                    // `§6.4` `M-6`).
                    self.restore_compaction(&entry.compacted);
                }
                self.last_seq -= 1;
                return Err(failure);
            }
        }
        Ok(WriteResult {
            op,
            watched,
            triggered,
        })
    }

    /// `§4.3`: `delete(address, tier?) → DeleteReceipt`. Its scope is the tier it names — or every tier
    /// when it names none — and a delete that removes nothing is a SUCCESS (`DD-9`).
    pub fn delete(
        &mut self,
        address: AddressArg,
        tier: TierArg,
    ) -> Result<DeleteReceipt, StoreError> {
        let named = delete_tier(&tier)?;
        let segments = address_segments(&address)?;
        let (link, key) = match segments.split_last() {
            None => (self.register, None),
            Some((last, parents)) => {
                // `L-1` at the target's own segment, fired in the walk's own arm order (`§2.2`).
                if !last.is_in_domain() {
                    return Err(malformed_segment(last, parents));
                }
                // `D-4`: the address must resolve, and the walk's own code is the failure.
                let parent = self.walk(parents, &TierSel::All)?.0;
                match self.link_of(parent) {
                    Some(parent_link) => (parent_link, Some(last.clone())),
                    None => return Err(leaf_has_no_downstream(last, parents)),
                }
            }
        };
        if let Some(key) = &key {
            // `§1.5` item 3: a segment whose class the container's key domain cannot hold is a key the
            // container does not hold — `L-3`'s `AddressNotFound`, never a coerced lookup.
            if self.refs_at(link, key).is_empty() || !key_fits(self.links[link].container, key) {
                return Err(address_not_found(
                    key,
                    &segments[..segments.len() - 1],
                    &self.keys_at(link),
                    self.links[link].is_register,
                ));
            }
        }
        let home = self.pair_home(&segments);
        let captured = match &home {
            Some(home) => self.capture(home),
            None => Vec::new(),
        };
        let before = self.state_from_captured(&segments, &captured);
        let mut removed: Vec<usize> = Vec::new();
        match &key {
            Some(key) => {
                removed.extend(self.refs_at(link, key).into_iter().filter(|reference| {
                    named.is_none_or(|tier| self.refs[*reference].anchor.tier == tier)
                }));
            }
            None => {
                for key in self.keys_at(self.register) {
                    removed.extend(self.refs_at(self.register, &key).into_iter().filter(
                        |reference| {
                            named.is_none_or(|tier| self.refs[*reference].anchor.tier == tier)
                        },
                    ));
                }
            }
        }
        if removed.is_empty() {
            // `D-3`: nothing was removed and that is a success with `tiers: []` — **and `§6.5` item 11 adds
            // that it carries `triggered: []` as well, *"because nothing was destroyed and no trigger
            // occurred"*.**
            return Ok(DeleteReceipt {
                address: segments,
                tiers: Vec::new(),
                triggered: Vec::new(),
            });
        }
        let mut tiers: Vec<Tier> = Vec::new();
        for tier in canonical_tiers() {
            if removed
                .iter()
                .any(|reference| self.refs[*reference].anchor.tier == tier)
            {
                tiers.push(tier);
            }
        }
        // **A DELETE removes the index itself**: an array container's position closes up and the
        // survivors are renumbered (`§1.3`/`R-3`, `renumber_vec` below).
        match &key {
            Some(_) => self.remove_refs(link, &removed, true),
            None => self.remove_refs(self.register, &removed, true),
        }
        if matches!(key, Some(Segment::Index(_))) {
            // `§1.3`: a `VEC`'s key domain is *"index keys — non-negative integers, contiguous from
            // `0`"*, and `§4.2` `R-3` reads the container's *"contiguous index count"* from `0`. A removal
            // that left a gap would leave the surviving anchor at index `i` reachable by an address the
            // `VEC`'s own read — whose loop stops at the first absent index — cannot contain it, and `§5.5`'s
            // reachability (*"a minted node no address resolves to"*) forbids exactly that. The surviving
            // anchors are therefore renumbered so the indices stay contiguous from `0`, and the surviving
            // nodes are DENSE from `0` in the container's own read.
            self.renumber_vec(link);
        }
        let after = self.state_now(&segments);
        let op = JournalOp {
            opId: next_op_id(),
            kind: JournalOpKind::Delete,
            address: segments.clone(),
            tier: named,
            before,
            after,
            seq: 0,
            compacted: false,
        };
        let uncompacted = self
            .journal
            .iter()
            .filter(|entry| !entry.op.compacted)
            .map(|entry| entry.op.opId.clone())
            .collect();
        self.append(op, captured, home, uncompacted);
        // **`§6.5` item 11 / `§5.8` (b): THE DELETE IS THE SECOND TRIGGER EVENT** (`A43`) — the receipt
        // carries the handles of the listeners the trigger fired, selected by the SAME prefix rule.
        let triggered = self.triggered_for(&segments);
        Ok(DeleteReceipt {
            address: segments,
            tiers,
            triggered,
        })
    }

    /// **`§6.5` item 12 — `listen(address) → ListenerHandle`** (`A57`, `A58`; `contract.md §0.4`): **the
    /// listener surface's registration verb.** It takes the listener's `address` — **ONE argument and NO
    /// tier slot** (`§3.1.1`'s amended `listen` row) — **populates the home map**, and the handle it returns
    /// is OPAQUE, store-minted and store-unique per instance and per session (`PAR-13`). **A malformed
    /// address is `PAR-1`'s own answer — `AddressMalformed` — and the store mints no handle** (`PAR-13`'s own
    /// outside-value list).
    ///
    /// **THE DUPLICATE-ADDRESS RULE OF THIS VERB, AND IT IS THE CONTRACT'S — `§6.5` ITEM 12 (c) WITH
    /// `contract.md §0.4`'s CONSTRUCTION RULE, CLAUSE 2:** **a `listen(address)` whose address IS already
    /// registered returns the EXISTING entry's handle rather than minting a second one** — *"which is the
    /// shipped address-level idempotence (`§6.5` item 2) carried to the listener surface by `A45`'s ONE home,
    /// and which is why `unlisten` over the returned handle removes exactly one entry."* **ONLY an address the
    /// home does NOT hold mints a fresh store-unique token.** **One home entry per address, therefore, and
    /// the ONE handle that entry carries is what the trigger fires — exactly once** (`§5.8` (a), (e)).
    /// **`DD-39`'s two kept entries with their OWN two handles are the CONSTRUCTION's case, not this verb's:**
    /// the construction's `listeners[]` adopts the caller's tokens VERBATIM and re-mints nothing (`§0.4`
    /// clause 2, arms (a)/(b); `seams-and-lifecycle.md §7.1` step 5), so two construction entries at ONE
    /// address stay two entries with two handles. **This verb never adds a second entry at an address the
    /// home already holds.**
    pub fn listen(&mut self, address: AddressArg) -> Result<ListenerHandle, StoreError> {
        let segments = address_segments(&address)?;
        // `§6.5` item 12 (c) / `§0.4` clause 2: the home is CONSULTED FIRST — an already-registered address
        // hands back the entry's own handle and pushes NOTHING, so a repeated `listen` leaves the home
        // unchanged and the trigger fires that ONE handle.
        if let Some(entry) = self.home.iter().find(|entry| entry.address == segments) {
            return Ok(entry.handle.clone());
        }
        let handle = ListenerHandle::from(next_handle_token(&self.home).as_str());
        self.home.push(HomeEntry {
            address: segments,
            handle: handle.clone(),
        });
        Ok(handle)
    }

    /// **`§6.5` item 12 — `unlisten(handle) → void`**: it drops ONE home-map entry, and **a handle the
    /// store did not mint — an unknown handle, a FOREIGN instance's, a PRIOR SESSION's, a FABRICATED one —
    /// is a NO-OP SUCCESS: no code is produced and no other registration is removed** (the superseded
    /// `unwatch`'s own clause, item 6, carried forward; `PAR-13`).
    pub fn unlisten(&mut self, handle: &ListenerHandle) -> Result<(), StoreError> {
        // ONE entry and no more (`§6.5` item 12: *"it drops ONE home-map entry"*); an unknown, foreign,
        // prior-session or fabricated handle matches nothing at all — the same no-op success.
        if let Some(index) = self.home.iter().position(|entry| entry.handle == *handle) {
            self.home.remove(index);
        }
        Ok(())
    }

    /// `§6.3`/`§6.4`: `rollback(opId)` — the journal's only consumer, addressed by op id, TOTAL over its
    /// scope and ALL-OR-NOTHING at its floor.
    pub fn rollback(&mut self, op: OpIdArg) -> Result<RollbackResult, StoreError> {
        let op_id = op_id(&op)?;
        let Some(index) = self.journal.iter().position(|entry| entry.op.opId == op_id) else {
            // `M-11`: an op id the instance's journal does not hold.
            return Err(journal_op_unknown(&op_id));
        };
        let address = self.journal[index].op.address.clone();
        // `M-5`/`DD-21`: the candidate set is EVERY entry the addressed subtree contains, compacted
        // entries included — the walk's floor is then the predicate that decides.
        let scope: Vec<usize> = (0..self.journal.len())
            .filter(|candidate| is_prefix(&address, &self.journal[*candidate].op.address))
            .collect();
        if scope
            .iter()
            .any(|candidate| self.journal[*candidate].op.compacted)
        {
            // `M-6`: the floor is all-or-nothing and undoes NOTHING.
            return Err(rollback_compacted(&op_id));
        }
        let mut undone = Vec::new();
        for candidate in scope.iter().rev() {
            let (captured, entry_id, entry_home) = {
                let entry = &self.journal[*candidate];
                (
                    entry.captured.clone(),
                    entry.op.opId.clone(),
                    entry.home.clone(),
                )
            };
            let restored = match entry_home {
                Some(home) => self.restore(&home, &captured),
                None => false,
            };
            // `§6.3`: `undoneOps` is *"the opIds the rollback undid"* — so an entry whose pre-state could
            // not be put back is NOT reported as undone, and it is not marked out of a later walk either.
            if restored {
                self.journal[*candidate].op.compacted = true;
                undone.push(entry_id);
            }
        }
        Ok(RollbackResult {
            opId: op_id,
            undoneOps: undone,
            restoredTo: self.state_now(&address),
        })
    }
}

/// `§1.5` item 3: **a container's key domain decides which segment CLASS resolves against it — and
/// *"NO COERCION OCCURS"*.** A `string` segment resolves against a `MAP`; it resolves NOWHERE against a
/// `VEC`. An integer segment resolves against a `VEC`, and against a `MAP` only at an index-shaped key,
/// which no `MAP` write can install (`§1.3`: a `MAP`'s key domain is string keys). So a segment whose class
/// the container cannot hold is `L-3`'s `AddressNotFound` — the key does not exist there — and never a
/// coerced lookup and never a minted anchor outside the container's domain.
fn key_fits(container: Kind, key: &Segment) -> bool {
    match container {
        Kind::Map => matches!(key, Segment::Key(_)),
        Kind::Vec => matches!(key, Segment::Index(_)),
    }
}

/// `§5.1`'s canonical order: **the order used by every printed list in this contract is `file`, `mem`,
/// `temp`** — which is rank DESCENDING, not ascending.
fn canonical_tiers() -> [Tier; 3] {
    [Tier::File, Tier::Mem, Tier::Temp]
}

/// The captured versions of ONE pair, in rank ascending order (so a `MAP`'s per-pair count stays at one
/// anchor per `(key, tier)` after a re-mint).
fn ordered_one_anchor(captured: &[Captured]) -> Vec<Captured> {
    let mut ordered = captured.to_vec();
    ordered.sort_by_key(|entry| entry.tier.rank());
    ordered
}

/// Every captured path strictly BELOW the given path, deduplicated and outermost first.
fn child_paths(captured: &[Captured], walked: &[Segment]) -> Vec<Vec<Segment>> {
    let mut paths: Vec<Vec<Segment>> = captured
        .iter()
        .map(|entry| entry.path.clone())
        .filter(|path| path.len() > walked.len() && path.starts_with(walked))
        .collect();
    paths.sort_by_key(|path| path.len());
    paths.dedup();
    paths
}

/// The rollback's scope relation (`§6.4` `M-5`, `DD-21`): `op.address` is a prefix of the entry's address.
fn is_prefix(prefix: &[Segment], address: &[Segment]) -> bool {
    prefix.len() <= address.len() && prefix.iter().zip(address.iter()).all(|(a, b)| a == b)
}
