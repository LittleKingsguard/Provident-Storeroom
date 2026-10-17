//! The declared parameter types and the per-verb arity/domain classification (`§1.5`, `§3.1.1`, `§7.1`,
//! `PAR-1`–`PAR-10`).
//!
//! Every PERMISSIVE argument type lives here because the arity table and the `PAR` rows' outside-value
//! lists require it: with a strict type the write's and delete's array/absent fail-states would be
//! unreachable (`§0.4`).

use crate::error::{
    malformed_address_argument, malformed_named, malformed_tier_argument, missing_argument,
    missing_construction_key, out_of_domain_tier, StoreError,
};
use crate::records::{ListenerHandle, Tier};
use crate::value::Segment;

/// `PAR-1`: the required path argument — its domain AND its outside-value list.
#[derive(Clone, Debug, PartialEq)]
pub enum AddressArg {
    List(Vec<Segment>),
    Absent,
    Null,
    Undefined,
    Str(String),
    Number(f64),
    Bool(bool),
    Object,
    Function,
}

/// `§3.1.1`'s arity table, cell by cell, per verb.
#[derive(Clone, Debug, PartialEq)]
pub enum TierArg {
    Absent,
    Token(Tier),
    Set(Vec<TierSetItem>),
    OtherToken(String),
    Null,
    Undefined,
    Object,
    /// `§0.4`: the non-string tier's ONE declared Rust spelling.
    NonString,
}

/// A member of a tier ARRAY (`§3.1.1`'s "array of n tokens" column, and its non-string members).
#[derive(Clone, Debug, PartialEq)]
pub enum TierSetItem {
    Token(Tier),
    Other(String),
    Null,
    Undefined,
    Object,
    /// A non-string member of the array (spelled per class so its trigger is reachable).
    Number(f64),
    Bool(bool),
    NonString,
}

/// `PAR-10`: the op's identity argument.
#[derive(Clone, Debug, PartialEq)]
pub enum OpIdArg {
    Id(String),
    Absent,
    Null,
    Undefined,
    NonString(i64),
}

/// `PAR-6`: the `file` tier's external location.
#[derive(Clone, Debug, PartialEq)]
pub enum FilePathArg {
    Path(String),
    Absent,
    Null,
    Undefined,
    Empty,
    /// `§0.4`: the non-string `filePath`'s ONE declared Rust spelling.
    NonString,
}

/// `PAR-7`: the journal's configured length, in ENTRIES.
#[derive(Clone, Debug, PartialEq)]
pub enum JournalLengthArg {
    Count(u32),
    Absent,
    Zero,
    Negative(i64),
    Fractional(f64),
    NaN,
    Infinity,
    NonNumberString,
    NonNumberBool,
    Null,
    Undefined,
    Object,
}

/// `§7.1` step 5 / `PAR-12` (`A56`, `A57`): **one `listeners[]` element — the closed `{ address, handle }`
/// record** — and the shapes outside it. The permissive type is REQUIRED (`§0.4`), or the array's
/// malformed-element answer would be unreachable.
#[derive(Clone, Debug, PartialEq)]
pub enum ListenerEntry {
    Entry {
        address: Vec<Segment>,
        handle: ListenerHandle,
    },
    /// An element that is not an `{ address, handle }` record (`PAR-12`'s outside list) — `AddressMalformed`.
    Other,
}

/// `§7.1` step 5 / `PAR-12` (`A56`): **the construction's `listeners[]` argument** — the array and every
/// shape outside it. **ABSENT is the ONE absence `A56`'s construction does not admit** (`§7.1`'s amended
/// table prints its own answer), and an EMPTY array is the ordinary no-listener store (`DD-39`).
#[derive(Clone, Debug, PartialEq)]
pub enum ListenersArg {
    List(Vec<ListenerEntry>),
    Absent,
    Null,
    Undefined,
    NonArray(String),
}

/// **⟶ ADDED 2026-10-15 BY THE `RCA-9` PASS (`contract.md §0.4`'s own row; `§7.1` step 4-bis; `§8.1`
/// #16):** **the construction's FOURTH declared key `constraints` and its element shape `{ address, id }`**
/// — an ordered list of pairs, with the `Absent` variant for the optional spelling and the permissive
/// variants the list's and the element's own outside values need (`§2.21`'s domain and its outside list).
/// **THIS CARRIER HAS NO BEHAVIOUR OF ITS OWN**: the store validates it at the construction and again over
/// a loaded image, and the code and the message are the store's own (`§8.2`).
#[derive(Clone, Debug, PartialEq)]
pub enum ConstraintsArg {
    /// The list itself, in the caller's own order. **One element outside the pair's shape crosses as
    /// [`ConstraintEntry::Invalid`] and is refused at this same code.**
    List(Vec<ConstraintEntry>),
    Absent,
    Null,
    Undefined,
    NonArray(String),
}

/// `§7.1` step 4-bis: **one `constraints[]` element** — the closed `{ address, id }` pair, and the element
/// outside it, carried as the failing ENTRY's own `<SEGMENT>` spelling (`§8.2`'s own slot: *"the failing
/// ENTRY's `address` spelling, joined by `/` … or the element's own position printed bare where the failing
/// element carries no address at all"*).
#[derive(Clone, Debug, PartialEq)]
pub enum ConstraintEntry {
    Pair {
        address: Vec<Segment>,
        id: String,
    },
    /// An element outside the pair's shape, **pre-spelled at the boundary** — where the value's class is
    /// read first (`crossing.md §1.4` item 9) — **and answered at the store's own code** (`§8.1` #16).
    Invalid(String),
}

/// `§7.1`: `cfg`'s CLOSED three-member set — `filePath`, `journalLength`, `listeners` and nothing else
/// (`§0.4`; a third-declared key is UNREPRESENTABLE).
#[derive(Clone, Debug, PartialEq)]
pub struct StoreConfig {
    pub filePath: FilePathArg,
    pub journalLength: JournalLengthArg,
    /// **⟶ ADDED 2026-10-11** — the array whose home map is populated BEFORE the registry is generated
    /// (`A56`; `§7.1` step 5).
    pub listeners: ListenersArg,
}

/// The walk's selection rule (`§2.3`): the zero-tier arm (lowest persistence) or an any-match set.
#[derive(Clone, Debug, PartialEq)]
pub(crate) enum TierSel {
    All,
    Any(Vec<Tier>),
}

impl TierSel {
    pub(crate) fn matches(&self, tier: Tier) -> bool {
        match self {
            TierSel::All => true,
            TierSel::Any(tiers) => tiers.contains(&tier),
        }
    }
}

/// `§3.1.1`'s non-string spelling: never a placeholder and never a fabricated tier.
fn not_a_tier() -> String {
    "a value that is not a tier".to_string()
}

fn set_item_subject(items: &[TierSetItem]) -> String {
    for item in items {
        match item {
            TierSetItem::Token(_) => {}
            TierSetItem::Other(s) => return format!("'{s}'"),
            _ => return not_a_tier(),
        }
    }
    "an array of tiers".to_string()
}

/// `§3.1.1`'s `read` / `findAddress` / `readLiteral` row: `tier` optional, accepting zero to many.
pub(crate) fn read_tier_sel(arg: &TierArg) -> Result<TierSel, StoreError> {
    match arg {
        TierArg::Absent => Ok(TierSel::All),
        TierArg::Token(tier) => Ok(TierSel::Any(vec![*tier])),
        TierArg::Set(items) => {
            let mut tiers = Vec::new();
            for item in items {
                match item {
                    TierSetItem::Token(tier) => tiers.push(*tier),
                    TierSetItem::Other(s) => return Err(out_of_domain_tier(format!("'{s}'"))),
                    _ => return Err(out_of_domain_tier(not_a_tier())),
                }
            }
            // An array of 0 tokens is read as the ZERO-TIER arm (`§3.1.1`).
            if tiers.is_empty() {
                Ok(TierSel::All)
            } else {
                Ok(TierSel::Any(tiers))
            }
        }
        TierArg::Null | TierArg::Undefined => Err(malformed_tier_argument()),
        TierArg::OtherToken(s) => Err(out_of_domain_tier(format!("'{s}'"))),
        _ => Err(out_of_domain_tier(not_a_tier())),
    }
}

/// `§3.1.1`'s `write` row: EXACTLY ONE token — absent is `AddressMalformed`, any array is
/// `OutOfDomainTier`.
pub(crate) fn write_tier(arg: &TierArg) -> Result<Tier, StoreError> {
    match arg {
        TierArg::Token(tier) => Ok(*tier),
        TierArg::Absent => Err(missing_argument("AddressMalformed", "tier")),
        TierArg::Set(items) => Err(out_of_domain_tier(set_item_subject(items))),
        TierArg::Null | TierArg::Undefined => Err(malformed_tier_argument()),
        TierArg::OtherToken(s) => Err(out_of_domain_tier(format!("'{s}'"))),
        _ => Err(out_of_domain_tier(not_a_tier())),
    }
}

/// `§3.1.1`'s `delete` row: `tier` optional and, when present, EXACTLY ONE token — `None` is "every tier
/// at the target" (`§4.3`).
pub(crate) fn delete_tier(arg: &TierArg) -> Result<Option<Tier>, StoreError> {
    match arg {
        TierArg::Absent => Ok(None),
        TierArg::Token(tier) => Ok(Some(*tier)),
        TierArg::Set(items) => Err(out_of_domain_tier(set_item_subject(items))),
        TierArg::Null | TierArg::Undefined => Err(malformed_tier_argument()),
        TierArg::OtherToken(s) => Err(out_of_domain_tier(format!("'{s}'"))),
        _ => Err(out_of_domain_tier(not_a_tier())),
    }
}

// `§3.1.1`'s superseded `watch` row lived here. **⟶ SUPERSEDED 2026-10-11** (`A58`; `§6.5`'s supersession
// clause 1: *"the verbs are superseded, not deleted … ONE pass lands the replacement"*): the listener
// surface's two verbs are `listen(address)` and `unlisten(handle)`, and `listen`'s arity is **ONE ADDRESS
// AND NO TIER** (`§3.1.1`'s amended `listen` row), so no tier qualifier exists to classify. The
// superseded table row stands in the contract as record; no byte of it is reached from this crate.

/// `PAR-1` / `PAR-8`: an address is a JS/JSON array of segments — any other shape is `AddressMalformed`.
pub(crate) fn address_segments(arg: &AddressArg) -> Result<Vec<Segment>, StoreError> {
    match arg {
        AddressArg::List(segments) => Ok(segments.clone()),
        _ => Err(malformed_address_argument()),
    }
}

/// `§7.1` step 5 / `PAR-12`: **the construction's `listeners[]`, classified** — the accepted entries as
/// `(address, handle)` pairs, **and every shape outside the domain answering `AddressMalformed` with NO
/// instance returned**: ABSENT · `null` · `undefined` · a non-array · an entry that is not an
/// `{ address, handle }` record · **an entry whose `address` lies outside `PAR-1`'s domain** (the walk's
/// own `L-1` test, per segment) · **an entry whose `handle` is a BLANK (empty-string) token** —
/// *"no entry is silently dropped: a rejected array admits NOTHING"*.
///
/// **A BLANK TOKEN IS OUTSIDE `handle`'s DOMAIN AT THE CONSTRUCTION, AND THIS IS THE CONSTRUCTION'S OWN
/// ANSWER — NOT `unlisten`'s** (`contract.md §0.4`'s construction rule, clause 3: *"at the construction, a
/// `listeners[]` entry whose `handle` the construction cannot admit answers `AddressMalformed` and no
/// instance is returned"*; `parameter-semantics.md §2.13` (`PAR-13`), whose outside-value list names *"a
/// blank (empty-string) value"* first among the token shapes and whose answer cell reads *"a `listeners[]`
/// entry whose `handle` the construction cannot admit is `AddressMalformed` and NO instance is returned"*).
/// **The rule is read at THIS site only:** the same blank token handed to `unlisten` matches no home entry
/// and is the declared NO-OP SUCCESS (`§0.4` clause 3; `write-and-read.md §6.5` item 6) — so the blank is
/// refused HERE, where the contract refuses it, and nowhere else.
pub(crate) fn construction_listeners(
    arg: &ListenersArg,
) -> Result<Vec<(Vec<Segment>, ListenerHandle)>, StoreError> {
    let entries = match arg {
        ListenersArg::List(entries) => entries,
        // **⟶ `DEF-2026-10-17-A`'s SECOND SHAPE, REPAIRED HERE 2026-10-17: THESE THREE ABSENCE STATES TAKE
        // THE `AddressMalformed` ROW'S ABSENT-ARGUMENT ARM.** Their CODE is unmoved (`ListenersArg` row 5;
        // `PAR-JS-4`'s answer cell; `crossing.md` §1.3 rule 2), and what moves is the SENTENCE: an omitted
        // (or `null`/`undefined`) config KEY is answered in the shape its sibling `journalLength`'s own
        // omission already takes — *"'listeners' requires a listeners argument, a listeners is required on
        // store creation"* — instead of the PRESENT-BUT-MALFORMED arm's *"'listeners' is not a legal address
        // segment in '' …"*, which described a CONFIG KEY as an address segment. **THE THREE PRESENT-BUT-
        // MALFORMED ARMS BELOW KEEP THAT SENTENCE BYTE-FOR-BYTE** (`NonArray`, a bad entry, a blank token):
        // those are the states the row's segment arm is for, and the pinning Rust cell sits at one of them.
        ListenersArg::Absent => return Err(missing_construction_key("listeners")),
        ListenersArg::Null | ListenersArg::Undefined => {
            return Err(missing_construction_key("listeners"))
        }
        ListenersArg::NonArray(_) => return Err(malformed_named("listeners")),
    };
    let mut admitted = Vec::new();
    for entry in entries {
        match entry {
            ListenerEntry::Entry { address, handle } => {
                if address.iter().any(|segment| !segment.is_in_domain()) {
                    return Err(malformed_named("listeners"));
                }
                // `§0.4` clause 3 / `PAR-13`: the blank token is OUTSIDE the domain, and the construction
                // answers `AddressMalformed` for it with NO instance returned. The handle is OPAQUE — its
                // token has no accessor (`§0.4` clause 1) — so the domain test reads the handle's own
                // declared `Display` spelling, which is the token itself.
                if handle.to_string().is_empty() {
                    return Err(malformed_named("listeners"));
                }
                admitted.push((address.clone(), handle.clone()));
            }
            ListenerEntry::Other => return Err(malformed_named("listeners")),
        }
    }
    Ok(admitted)
}

/// `PAR-10`: the op's identity — a non-empty string, and nothing else.
pub(crate) fn op_id(arg: &OpIdArg) -> Result<String, StoreError> {
    match arg {
        OpIdArg::Id(id) if !id.is_empty() => Ok(id.clone()),
        OpIdArg::Id(_) => Err(malformed_named("opId")),
        OpIdArg::Absent => Err(missing_argument("AddressMalformed", "opId")),
        _ => Err(malformed_named("opId")),
    }
}
