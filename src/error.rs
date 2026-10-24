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

/// `§8.1`: the CLOSED set, ranked `1`…`16`. **⟶ AMENDED 2026-10-11 (`A53`/`A54`): the as-filed set carried
/// `14` members and the amendment's `FilePathUnreachable` is inserted at rank `13` in the CONSTRUCTION
/// GROUP, so `ValueNotAdmitted` and `FileCommitFailed` move by ONE rank each (`14`, `15`) and NO TRIGGER
/// MOVES** (`11 + 2 + 1 + 1 = 15` ✓). A failure whose code is outside this set is a contract violation,
/// not an extension of the set.
/// **⟶ AND AMENDED 2026-10-15 BY THE `RCA-9` PASS (`contract.md`'s eleventh bounded amendment): THE SET'S
/// SIXTEENTH MEMBER `ConstraintListInvalid` IS ADDED AT RANK `16`, AFTER `FileCommitFailed`, and NO RANK OF
/// `1`…`15` MOVES** (`§8.1`'s amended heading; `proposal-review.md §22.2`; `implementation-plan.md §10.9`
/// row 8). `11 + 2 + 1 + 1 + 1 = 16` ✓.
///
/// **⟶ AND THE CENSUS MOVES WITH THE SET, 2026-10-15 (`DEF-2026-10-15-Y`, ruled by the gate-4 adversarial
/// pass as a `stale-by-census` disposition): THE ARRAY BELOW CARRIES THE AMENDMENT'S SIXTEENTH MEMBER, so
/// THE SET IS COMPLETE AT ITS OWN CENSUS AND AT THE GENERATOR ALIKE.** **THE ARRAY IS A CENSUS OVER THE SET
/// AND [`storeErrorMessage`] RESOLVES ITS CLAUSE BY LOOKUP IN IT** (`§8.2`): **while the array stood at `15`
/// the generator's `ConstraintListInvalid` arm was UNREACHABLE FROM ANY ENTRY THAT RESOLVES BY CENSUS** —
/// `errorMessage('ConstraintListInvalid', …)` answered *"a code outside the closed set, no clause is
/// declared here"*, because the addon's `errorMessage` export routes through this function
/// (`bindings/js/src/facade.rs`), **and `§8.2`'s declared completeness over the set was broken for the
/// member at a PUBLIC ENTRY while the store's own minted status stayed correct. THE ARRAY IS THE SET'S OWN
/// CENSUS AND NOT A SECOND STATEMENT OF IT, and `§8.1`'s algebra is unmoved by this widening in its original
/// terms: `11 + 2 + 1 + 1 = 15` still sums the four as-filed groups and the sixteenth is the fifth term
/// appended to that line, `11 + 2 + 1 + 1 + 1 = 16` ✓.** **THE LENGTH IS COUNTED BY DRIVES, AND THOSE ARE
/// RE-DERIVED BY THEIR OWN AUTHOR ROLE FROM THE AMENDED CLAUSE** (`implementation-plan.md §10.9` row 8:
/// *"a set of `15` or `17` FAILS it"*): **the artefact is widened and the superseded census is the losing
/// side, so no drive that counts this array may assert `15`.**
pub const CODES: [&str; 17] = [
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
    "ConstraintListInvalid",
    "ValueRefusedAtBoundary",
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
    ..Default::default()
    })
}

/// The generator's own input, one step closer to the trigger than `MessageArgs`: it carries the container
/// kind where the message needs it and the argument name where the trigger is an absent argument.
///
/// **`Default` IS IMPLEMENTED BELOW SO THE ONE MEMBER THIS PASS ADDS COSTS EVERY PRE-EXISTING `Msg`
/// LITERAL NOTHING:** all twenty-one of them take `construction` from `..Default::default()` — the
/// compiler proves each one, and none of their messages can move by accident — while
/// `missing_construction_key` is the one site that names it, and it names it `true`.
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
    /// **`DEF-2026-10-17-A`'s second shape, 2026-10-17 (`docs/specs/storeroom-native/contract.md` §8.2's
    /// `AddressMalformed` row, whose own `<available clause>` prints *"for a construction argument, `a
    /// <argument-name> is required`"*).** **TRUE exactly at the construction's OWN absent-key call sites,
    /// where the act that supplies the missing key IS the construction; FALSE everywhere else — `write`'s
    /// required tier and `rollback`'s `opId` included — so their whole messages stay byte-for-byte.**
    pub construction: bool,
}

impl Default for Msg {
    /// `kind: Kind::Map` is the reading the generator's own default already carries — `storeErrorMessage`
    /// builds its `Msg` with `Kind::Map` — so a literal that leaves both members off takes what it took.
    fn default() -> Self {
        Msg {
            code: "",
            subject: String::new(),
            container: None,
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
            construction: false,
        }
    }
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
            // **⟶ AND THIS ARM IS CONSTRUCTION-AWARE, ADDED 2026-10-17 (`DEF-2026-10-17-A`'s second shape).
            // `docs/specs/storeroom-native/contract.md` §8.2's `AddressMalformed` row PRINTS THE QUALIFIER
            // FOR THIS ARM: its `<mismatch clause>` is *"`is not a legal address segment` (or, for an absent
            // argument, `requires a <argument-name> argument`)"* and its `<available clause>` is
            // *"`segments are strings or non-negative integers` (or, for a construction argument, `a
            // <argument-name> is required`)"* — while the CONSTRUCTION member's own available clause reads
            // *"a `<argument-name>` is required ON STORE CREATION"*. An absent-argument arm of this row that
            // governs a CONSTRUCTION KEY therefore takes the qualified clause; `Msg.construction` is set at
            // exactly those call sites and nowhere else, so `write`'s required tier and `rollback`'s `opId`
            // — this code's two other absent-argument call sites — keep the unqualified sentence
            // byte-for-byte (`tests/properties.rs`'s whole-text cells pin the first of them).**
            Some(name) if m.construction => format!(
                "'{name}' requires a {name} argument, a {name} is required on store creation"
            ),
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
        // `§8.2`'s eleventh-amendment row (`contract.md`'s `ConstraintListInvalid` row and the dated clause
        // that adds it): `<mismatch clause>` = `is not a valid constraint entry in`, `<available clause>` =
        // `a constraint entry is an address and an id, and the address is a segment array`, and the trigger
        // supplies `MessageArgs.segment` (the failing entry's `address` spelling, or the element's own
        // position printed bare) and `MessageArgs.container` (`constraints`). **THE ROW'S OWN WORKED
        // EXAMPLE, reproduced from this rule: `storeCreate({ filePath: 'p.json', journalLength: 4,
        // listeners: [], constraints: [{ address: ['a'], id: 'c1' }, { address: 'a', id: 'c2' }] })`
        // answers `'a' is not a valid constraint entry in 'constraints', a constraint entry is an address
        // and an id, and the address is a segment array`.**
        "ConstraintListInvalid" => format!(
            "{} is not a valid constraint entry in '{container}', a constraint entry is an address and an id, and the address is a segment array",
            m.subject
        ),
        // `§8.1` #17 and `§8.2`'s seventeenth row (`A148` Q3, 2026-10-23): the package's own boundary
        // refusal for the sixteen classes outside the crossing's admitted value tree. The store never
        // receives those values on the JavaScript route; the package passes this member and the failing
        // target's spelling, and appends its own class-and-position clause beside the generated text.
        "ValueRefusedAtBoundary" => format!(
            "{} is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays",
            m.subject
        ),
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
        }),
    )
}

/// **`§8.1` #1'S ABSENT-ARGUMENT ARM AT A CONSTRUCTION KEY — `DEF-2026-10-17-A`'s second shape, added
/// 2026-10-17.**
///
/// **THE DEFECT, MEASURED ON INSTALLED BYTES: `storeCreate({ journalLength: 64 })` — the `listeners` key
/// OMITTED — answered `'listeners' is not a legal address segment in '', segments are strings or
/// non-negative integers` (`malformed_named`'s rendering): A CONFIG KEY DESCRIBED AS AN ADDRESS SEGMENT,
/// IN THE EMPTY CONTAINER, while its sibling `journalLength`'s own omission answered `'journalLength'
/// requires a journalLength argument, a journalLength is required on store creation`. TWO
/// REQUIRED-IN-EFFECT `cfg` KEYS FAILED IN TWO DIFFERENT SHAPES.**
///
/// **THE CLAUSE IMPLEMENTED, AND IT IS THE CONTRACT'S OWN:** §8.2's `AddressMalformed` row carries TWO
/// ARMS — the segment arm and *"for an absent argument, `requires a <argument-name> argument`"*, whose
/// `<available clause>` is *"for a construction argument, `a <argument-name> is required`"* — and `DD-52`
/// names `Msg.argument` as *"the argument name where the trigger is an absent argument"*. **THE CODE IS
/// UNMOVED AND IS THE ONE THE CLAUSES PIN:** an absent `listeners` key stays the `AddressMalformed` of
/// `ListenersArg` row 5 and of `parameter-semantics.md` §2.4's `PAR-JS-4` answer cell (*"`AddressMalformed`
/// for every one of them"*), read verbatim by `crossing.md` §1.3's absent-versus-`undefined` rule, rule 2.
/// **ONLY THE ARM MOVES: absent-argument at a construction key, instead of present-but-malformed.**
pub(crate) fn missing_construction_key(name: &str) -> StoreError {
    // THE SAME BUILDER `missing_argument` USES, WITH `construction` THE ONE MEMBER THAT FLAGS THE ACT —
    // so the two shapes cannot drift into two hand-written sentences, and the qualifier is read off the
    // row's own template in `build` rather than appended here.
    error(
        "AddressMalformed",
        build(&Msg {
            code: "AddressMalformed",
            subject: format!("'{name}'"),
            container: Some(String::new()),
            argument: Some(name.to_string()),
            construction: true,
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
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
            ..Default::default()
        }),
    )
}

/// `§8.1` #16 (`§7.1` step 4-bis; `§7.2` item 3 as amended 2026-10-15): **the construction's
/// `constraints` list validation at its TWO instants** — the CREATE-side shape test and the LOAD-side
/// state test — **at the store's own code and through the store's own generator** (`§8.2`'s row: the
/// `<SEGMENT>` slot is the failing entry's own `address` spelling, or the element's own position printed
/// bare where it carries no address, and the `<CONTAINER>` is the list's own key, `constraints`).
pub(crate) fn constraint_list_invalid(subject: String) -> StoreError {
    error(
        "ConstraintListInvalid",
        build(&Msg {
            code: "ConstraintListInvalid",
            subject,
            container: Some("constraints".to_string()),
            container_segment: None,
            keys: Vec::new(),
            tiers: Vec::new(),
            path: None,
            kind: Kind::Map,
            argument: None,
            ..Default::default()
        }),
    )
}
