//! `§8` — the closed code set, the generated-message rule and the error's shape.
//!
//! A failure is delivered by THROWING a `StoreError` (`DD-24(b)`); in Rust that is a `Result`'s `Err` arm
//! at a call boundary. No failure is delivered as a returned value and no success path returns `Err`.

use crate::records::{tier_token, Kind, Tier};
use crate::value::{Segment, StoreValue};

/// `§8.3`: the error's closed two-member record — `status` and `message` and nothing else.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct StoreError {
    /// `§8.1`'s `code` column, EXACTLY: `AddressNotFound`, never a lowercased or prefixed variant.
    pub status: String,
    /// `§8.2`'s generated string, never empty and never carrying a placeholder.
    pub message: String,
}

/// `§8.1`: the CLOSED set, ranked `1`…`15`. **⟶ AMENDED 2026-10-11 (`A53`/`A54`): the as-filed set carried
/// `14` members and the amendment's `FilePathUnreachable` is inserted at rank `13` in the CONSTRUCTION
/// GROUP, so `ValueNotAdmitted` and `FileCommitFailed` move by ONE rank each (`14`, `15`) and NO TRIGGER
/// MOVES** (`11 + 2 + 1 + 1 = 15` ✓). A failure whose code is outside this set is a contract violation,
/// not an extension of the set.
pub const CODES: [&str; 15] = [
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

/// `§8.2`: the generator's `args` record — five OPTIONAL members, each present only when the trigger
/// supplies it.
#[derive(Clone, Debug, Default, PartialEq)]
pub struct MessageArgs {
    /// The failing segment's spelling: a string segment prints single-quoted, an integer segment bare; the
    /// address's own spelling (joined by `/`) where the trigger fails on a whole address.
    pub segment: Option<String>,
    /// The container or node the mismatch was found in: `''` for the register, a dotted path otherwise.
    pub container: Option<String>,
    /// The container's keys, each already printed single-quoted.
    pub keys: Vec<String>,
    /// The tiers present, in `§5.1`'s canonical order.
    pub tiers: Vec<Tier>,
    /// The `file` tier's path, where the trigger is a `file`-tier commit.
    pub path: Option<String>,
}

/// `§8.2`'s generator: `storeErrorMessage(code, args) → string`. Deterministic, complete over the set, and
/// placeholder-free for every code.
pub fn storeErrorMessage(code: &str, args: &MessageArgs) -> String {
    // The generator's clause table is keyed by the set's own members; a code outside the set is a contract
    // violation, and the generator says so rather than borrowing another member's clause.
    let code: &'static str = CODES
        .iter()
        .find(|member| **member == code)
        .copied()
        .unwrap_or("a code outside the closed set");
    let container_segment = args
        .container
        .as_deref()
        .and_then(|c| c.rsplit('.').next())
        .filter(|s| !s.is_empty() && !s.contains(' '))
        .map(|s| s.to_string());
    build(&Msg {
        code,
        subject: args.segment.clone().unwrap_or_else(|| "''".to_string()),
        container: args.container.clone(),
        container_segment,
        keys: args.keys.clone(),
        tiers: args.tiers.clone(),
        path: args.path.clone(),
        kind: Kind::Map,
        argument: None,
    })
}

/// The generator's own input, one step closer to the trigger than `MessageArgs`: it carries the container
/// kind where the message needs it and the argument name where the trigger is an absent argument.
pub(crate) struct Msg {
    pub code: &'static str,
    /// The pre-spelled subject (a segment's spelling, or the address's own spelling).
    pub subject: String,
    pub container: Option<String>,
    pub container_segment: Option<String>,
    pub keys: Vec<String>,
    pub tiers: Vec<Tier>,
    pub path: Option<String>,
    pub kind: Kind,
    pub argument: Option<String>,
}

/// `§8.2`'s clause table, taken code by code.
pub(crate) fn build(m: &Msg) -> String {
    let container = m.container.clone().unwrap_or_default();
    let keylist = m.keys.join(", ");
    let tierlist = m
        .tiers
        .iter()
        .map(|t| tier_token(*t).to_string())
        .collect::<Vec<_>>()
        .join(", ");
    match m.code {
        "AddressMalformed" => match &m.argument {
            Some(name) => format!("'{name}' requires a {name} argument, a {name} is required"),
            None => format!(
                "{} is not a legal address segment in '{container}', segments are strings or non-negative integers",
                m.subject
            ),
        },
        "AddressNotFound" => {
            let available = if m.keys.is_empty() {
                "it holds no keys".to_string()
            } else {
                let subject_of_available = m
                    .container_segment
                    .clone()
                    .unwrap_or_else(|| "keys".to_string());
                format!("{subject_of_available} are {keylist}")
            };
            format!("{} does not exist in '{container}', {available}", m.subject)
        }
        "LeafHasNoDownstream" => format!(
            "{} cannot be walked through '{container}', it is a leaf",
            m.subject
        ),
        "TierNotFound" => format!(
            "{} is not a version of '{container}', versions are at {tierlist}",
            m.subject
        ),
        "OutOfDomainTier" => format!("{} is not a tier, tiers are file, mem, temp", m.subject),
        "ParentAnchorMonotonicityViolation" => format!(
            "{} outranks its parent anchor's tier in '{container}', a child anchor may not be more persistent than its parent",
            m.subject
        ),
        "ContainerKindConflict" => {
            let keys_clause = match m.kind {
                Kind::Map if !m.keys.is_empty() => format!(", keys are {keylist}"),
                _ => String::new(),
            };
            format!(
                "{} does not match the container kind of '{container}', it holds a {}{keys_clause}",
                m.subject,
                m.kind.word()
            )
        }
        "ReadTargetIsBranch" => format!(
            "{} is a branch and not a leaf in '{container}', it holds a branch",
            m.subject
        ),
        "WriteParentNotLink" => format!(
            "{} cannot be written into '{container}', it holds a leaf and not a link",
            m.subject
        ),
        "JournalOpUnknown" => format!(
            "'{}' is not an operation this store's journal holds, ops are reached through the journal op a write returned",
            m.subject
        ),
        "RollbackCompacted" => format!(
            "'{}' is out of scope because it is compacted, compacted operations are out of scope",
            m.subject
        ),
        "ConstructionArgumentMissing" => {
            let name = m.argument.clone().unwrap_or_else(|| m.subject.clone());
            format!("'{name}' requires a {name} argument, a {name} is required on store creation")
        }
        "FilePathUnreachable" => {
            // `§8.2`'s own row: `<mismatch clause>` = `is not reachable at construction`, `<available
            // clause>` = `the path must exist or the application must be able to write it`, and the
            // trigger supplies `MessageArgs.path` (the subject the shape's `<SEGMENT>` slot prints).
            format!(
                "{} is not reachable at construction, the path must exist or the application must be able to write it",
                m.subject
            )
        }
        "ValueNotAdmitted" => format!(
            "{} is not an admitted value, admitted values are strings, booleans, finite numbers, plain objects and arrays",
            m.subject
        ),
        "FileCommitFailed" => {
            let path = m.path.clone().unwrap_or_default();
            format!(
                "{} could not be committed to '{path}', the file write failed at '{path}'",
                m.subject
            )
        }
        other => format!("{} is a failure of the code {other}, no clause is declared here", m.subject),
    }
}

// ---------------------------------------------------------------------------------------------------
// The spelling helpers `§8.2`'s rule uses.
// ---------------------------------------------------------------------------------------------------

/// The container's own address spelling: `''` for the register, a dotted path such as `window.tabs`
/// otherwise (`§8.2`).
pub(crate) fn dotted_address(address: &[Segment]) -> String {
    address
        .iter()
        .map(|s| match s {
            Segment::Key(k) => k.clone(),
            Segment::Index(i) => i.to_string(),
            other => other.spelling(),
        })
        .collect::<Vec<_>>()
        .join(".")
}

/// The address's own spelling joined by `/` (`§8.2`'s whole-address form).
pub(crate) fn slashed_address(address: &[Segment]) -> String {
    address
        .iter()
        .map(|s| s.spelling())
        .collect::<Vec<_>>()
        .join("/")
}

fn spelled_keys(keys: &[Segment]) -> Vec<String> {
    keys.iter().map(|k| k.spelling()).collect()
}

fn error(code: &'static str, message: String) -> StoreError {
    StoreError {
        status: code.to_string(),
        message,
    }
}

// ---------------------------------------------------------------------------------------------------
// The trigger constructors — one per §8.1 member, each supplying exactly what its template needs.
// ---------------------------------------------------------------------------------------------------

/// `§8.1` #1 at `L-1`: a segment outside `§1.5`'s domain.
pub(crate) fn malformed_segment(segment: &Segment, container: &[Segment]) -> StoreError {
    error(
        "AddressMalformed",
        build(&Msg {
            code: "AddressMalformed",
            subject: segment.spelling(),
            container: Some(dotted_address(container)),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #1: an `address` argument whose SHAPE is not the address's shape at all (`PAR-1`).
pub(crate) fn malformed_address_argument() -> StoreError {
    error(
        "AddressMalformed",
        build(&Msg {
            code: "AddressMalformed",
            subject: "the address argument".to_string(),
            container: Some(String::new()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #1: a present argument outside its domain, named (`§7.1`'s construction table).
pub(crate) fn malformed_named(name: &str) -> StoreError {
    error(
        "AddressMalformed",
        build(&Msg {
            code: "AddressMalformed",
            subject: format!("'{name}'"),
            container: Some(String::new()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #1: `null`/`undefined` for a `tier` argument — *"the shape is not a tier value at all"*
/// (`PAR-2`/`PAR-3`/`PAR-4`).
pub(crate) fn malformed_tier_argument() -> StoreError {
    error(
        "AddressMalformed",
        build(&Msg {
            code: "AddressMalformed",
            subject: "the tier argument".to_string(),
            container: Some(String::new()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #12 / `§8.1` #1: an ABSENT required argument (`storeCreate`'s two keys, `write`'s tier,
/// `rollback`'s `opId`).
pub(crate) fn missing_argument(code: &'static str, name: &str) -> StoreError {
    error(
        code,
        build(&Msg {
            code,
            subject: format!("'{name}'"),
            container: Some(String::new()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: Some(name.to_string()),
        }),
    )
}

/// `§8.1` #13 (`A53`/`A54`; `DD-40`): **the PROVIDED path that FAILS the construction-time reachability
/// test** — the member this amendment authored, ranked `13` in the construction group. Its message
/// carries `MessageArgs.path` and the `§8.2` row's two clauses (`§7.1` step 3–4).
pub(crate) fn file_path_unreachable(path: &str) -> StoreError {
    error(
        "FilePathUnreachable",
        build(&Msg {
            code: "FilePathUnreachable",
            subject: format!("'{path}'"),
            container: Some(String::new()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: Some(path.to_string()),
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #5: a tier argument outside `{file, mem, temp}`.
pub(crate) fn out_of_domain_tier(subject: String) -> StoreError {
    error(
        "OutOfDomainTier",
        build(&Msg {
            code: "OutOfDomainTier",
            subject,
            container: None,
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #2 at `L-3`/`L-INT-REG`.
pub(crate) fn address_not_found(
    segment: &Segment,
    container: &[Segment],
    keys: &[Segment],
    register: bool,
) -> StoreError {
    error(
        "AddressNotFound",
        build(&Msg {
            code: "AddressNotFound",
            subject: segment.spelling(),
            container: Some(dotted_address(container)),
            container_segment: if register {
                None
            } else {
                container.iter().rev().find_map(|s| match s {
                    Segment::Key(k) => Some(k.clone()),
                    _ => None,
                })
            },
            keys: spelled_keys(keys),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #4 at `L-TIER` (`DD-12`).
pub(crate) fn tier_not_found(
    segment: &Segment,
    container: &[Segment],
    present: &[Tier],
) -> StoreError {
    error(
        "TierNotFound",
        build(&Msg {
            code: "TierNotFound",
            subject: segment.spelling(),
            container: Some(dotted_address(container)),
            container_segment: None,
            keys: Vec::new(),
            tiers: present.to_vec(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #3 at `L-4`.
pub(crate) fn leaf_has_no_downstream(segment: &Segment, leaf: &[Segment]) -> StoreError {
    error(
        "LeafHasNoDownstream",
        build(&Msg {
            code: "LeafHasNoDownstream",
            subject: segment.spelling(),
            container: Some(dotted_address(leaf)),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #6 at `F-6`.
pub(crate) fn monotonicity_violation(segment: &Segment, address: &[Segment]) -> StoreError {
    error(
        "ParentAnchorMonotonicityViolation",
        build(&Msg {
            code: "ParentAnchorMonotonicityViolation",
            subject: segment.spelling(),
            container: Some(dotted_address(address)),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #7 at `F-4` (`DD-19`: both directions share the ONE code).
pub(crate) fn container_kind_conflict(
    value: &StoreValue,
    address: &[Segment],
    kind: Kind,
    keys: &[Segment],
) -> StoreError {
    error(
        "ContainerKindConflict",
        build(&Msg {
            code: "ContainerKindConflict",
            subject: value.json_spelling(),
            container: Some(dotted_address(address)),
            container_segment: None,
            keys: spelled_keys(keys),
            tiers: Vec::new(),
            path: None,
            kind,
            argument: None,
        }),
    )
}

/// `§8.1` #7 at `F-4`'s KEY-DOMAIN arm (`§1.3`, `§1.5` items 2–3): the write's LAST SEGMENT class
/// contradicts the resolved parent container's own key domain — a `string` segment aimed at a `VEC`, or an
/// integer segment aimed at a `MAP`. It answers the SAME member the value's kind contradiction answers.
pub(crate) fn container_kind_conflict_for_key(
    key: &Segment,
    container_address: &[Segment],
    kind: Kind,
    keys: &[Segment],
) -> StoreError {
    error(
        "ContainerKindConflict",
        build(&Msg {
            code: "ContainerKindConflict",
            subject: key.spelling(),
            container: Some(dotted_address(container_address)),
            container_segment: None,
            keys: spelled_keys(keys),
            tiers: Vec::new(),
            path: None,
            kind,
            argument: None,
        }),
    )
}

/// `§8.1` #8: `readLiteral`'s target resolves to a branch (including the register, whose read assembles).
pub(crate) fn read_target_is_branch(address: &[Segment]) -> StoreError {
    error(
        "ReadTargetIsBranch",
        build(&Msg {
            code: "ReadTargetIsBranch",
            subject: slashed_address(address),
            container: Some(dotted_address(address)),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #9 at `F-5` and at the empty-address write (`§3.2` item 6).
pub(crate) fn write_parent_not_link(subject: String, address: &[Segment]) -> StoreError {
    error(
        "WriteParentNotLink",
        build(&Msg {
            code: "WriteParentNotLink",
            subject,
            container: Some(dotted_address(address)),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #10 (`§6.4` `M-11`).
pub(crate) fn journal_op_unknown(op_id: &str) -> StoreError {
    error(
        "JournalOpUnknown",
        build(&Msg {
            code: "JournalOpUnknown",
            subject: op_id.to_string(),
            container: None,
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #11 (`§6.4` `M-6`): the floor, all-or-nothing.
pub(crate) fn rollback_compacted(op_id: &str) -> StoreError {
    error(
        "RollbackCompacted",
        build(&Msg {
            code: "RollbackCompacted",
            subject: op_id.to_string(),
            container: None,
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #13 at `F-2`.
pub(crate) fn value_not_admitted(address: &[Segment]) -> StoreError {
    error(
        "ValueNotAdmitted",
        build(&Msg {
            code: "ValueNotAdmitted",
            subject: format!("'{}'", slashed_address(address)),
            container: None,
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
        }),
    )
}

/// `§8.1` #14 (`§7.2` items 3–4, `DD-25`): the `file` tier's commit failure — ONE code for the
/// serialization, the file write and the journal append.
pub(crate) fn file_commit_failed(address: &[Segment], path: &str) -> StoreError {
    error(
        "FileCommitFailed",
        build(&Msg {
            code: "FileCommitFailed",
            subject: format!("'{}'", dotted_address(address)),
            container: Some(path.to_string()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: Some(path.to_string()),
            kind: Kind::Map,
            argument: None,
        }),
    )
}
