//! `crossing` — **THE PURE-RUST CONVERSION CORE** of `package.md §4.5`: the module boundary, the JS-value
//! model, the `8` argument carriers, the conversion functions, the record types and the instance's verbs.
//!
//! **IT IS PURE RUST** (`§4.5` item 1, `DD-2`): no `napi` type, no `napi-rs` macro, no `#[napi]` attribute
//! and no Node-API symbol appears here at any depth — which is what makes the crossing's per-class table
//! drivable in Rust with NO Node runtime present (`§4.1` item 3, `§4.5` item 7).
//!
//! **EVERY RULE IS CITED AT ITS OWN CLAUSE**, and the refusal's ONE form is `§4.5` item 4: a `Refusal`
//! carrying EXACTLY `{status, message}` and not one member beside them. **NO CODE IS MINTED HERE**: an
//! outside carrier variant is carried onto the store's own argument type as a VALUE and the STORE produces
//! the code (`DD-1`, `crossing.md §1.3`'s closing clause), so the store's closed `15`-member set stays the
//! only producer of a status (`DD-40`).

use std::collections::BTreeMap;

use storeroom_native::{
    storeCreateWithConstraints, AddressArg, BaseState, ConstraintEntry, ConstraintsArg,
    DeleteReceipt, FilePathArg, JournalLengthArg, ListenerEntry, ListenerHandle, ListenerTrigger,
    ListenersArg, OpIdArg, RollbackResult, Segment, Store, StoreConfig, StoreError, StoreValue, Tier,
    TierArg, TierSetItem, WriteResult,
};

/// `surface.md §2.5` / `DD-12` / `package.md §4.5` item 4: **THE SINGLE FAILURE FORM AT THE CORE LAYER** —
/// `{status, message}` and nothing else. In Rust the contract's "thrown" is the call's `Err` arm.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Refusal {
    pub status: String,
    pub message: String,
}

/// The status the REGISTRATION SITE answers an outside registration with — **A MEMBER OF THE STORE'S
/// CLOSED `15`-MEMBER SET, CARRIED AND NEVER MINTED** (`DD-40`; `crossing.md §1.3`'s closing clause).
/// **⟶ `F-13`: the site is the registration's DOMAIN half (`Instance::register`) — the core holds no
/// listener and the package's registry is the one that holds the function — and the status is unchanged.**
///
/// **⟶ THE SHIPPED CONSTANT WAS `TYPE_ERROR_STATUS = "TypeError"`, AND `A76`'S PASS REPLACED IT.** **The
/// finding, in the contract's own words** (`surface.md §2.5` item 5 (g), `parameter-semantics.md §2.12`'s
/// second dated exception clause): *"a `status` of `TypeError`, reached at the addon's own boundary, is that
/// finding and not a declared form, because the store's closed set holds no such member"* — **the store's set
/// holds no `TypeError`, so the shipped constant minted a status outside it.** **THE OPERATIVE READING IS
/// THE ONE FORM WITH THE STORE'S OWN `AddressMalformed`**, whose declared trigger already covers *"a present
/// argument outside its domain"* and *"an absent required argument"* (`docs/specs/storeroom-native/contract.md
/// §8.1` #1), and whose message is the store's generator's own string at the failing target (`§2.5` item 5
/// (d)) — never hand-authored here.
pub const REGISTRATION_REFUSAL_STATUS: &str = "AddressMalformed";

/// **`surface.md §2.5` item 5 (a)–(b) AND (d): A REGISTRATION REFUSAL, IN THE ONE FORM.** The target is
/// rendered the way the store's generator renders a non-segment target (its own value, single-quoted), the
/// class and the argument position are carried BESIDE it inside the same message text, and **the status is
/// the store's own member, so no code is minted at this layer** — the generator is the same one the facade
/// reaches, and it authors the string's first half.
pub fn registration_refusal(target: &str, position: &str, class: &str) -> Refusal {
    Refusal {
        status: REGISTRATION_REFUSAL_STATUS.to_string(),
        message: format!(
            "{}, {} is {}, and a registration's handle is an opaque value THIS INSTANCE minted or adopted",
            storeroom_native::storeErrorMessage(
                REGISTRATION_REFUSAL_STATUS,
                &storeroom_native::MessageArgs {
                    segment: Some(format!("'{target}'")),
                    ..Default::default()
                },
            ),
            position,
            class,
        ),
    }
}

fn refusal(err: StoreError) -> Refusal {
    Refusal {
        status: err.status,
        message: err.message,
    }
}

// =================================================================================================
// THE JS-VALUE MODEL — `package.md §4.5` item 2. `crossing.md §1.4` items 1–4 refuse on a `Symbol`-keyed
// own property, on a hole, on an own accessor and on a `Proxy`, and the store's `StoreValue` cannot carry
// ANY of those four states — so this model is not a convenience, it is the one thing the walk requires.
// =================================================================================================

/// `crossing.md §1.4` item 1 and item 4 (d): an own key is a string key or a `Symbol` key.
#[derive(Clone, Debug, PartialEq)]
pub enum JsKey {
    Key(String),
    Symbol,
}

/// `crossing.md §1.4` item 4 (e)–(f): the prototype classes the plain-object test distinguishes. **A
/// cross-realm plain object is `ForeignPlain` and is ACCEPTED** (`DD-7`: the test is structural and
/// realm-agnostic, *"without a comparison against this realm's `Object.prototype`"*).
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum JsProto {
    /// This realm's plain-object prototype, or `Object.create(null)` (`DD-35`).
    Plain,
    /// `Object.create(null)` — ACCEPTED (`DD-35`).
    Null,
    /// A plain object from ANOTHER realm (`vm`, a worker, `structuredClone`) — ACCEPTED (`DD-7`).
    ForeignPlain,
    /// A class instance's prototype — REFUSED (`§1.4` item 4 (f)).
    Class,
}

/// `crossing.md §1.4` item 4's plain-object test, carried as data: the members the walk takes, the
/// prototype's class, whether an own accessor is present, and whether the value is a `Proxy`.
#[derive(Clone, Debug, PartialEq)]
pub struct JsObject {
    pub members: Vec<(JsKey, JsValue)>,
    pub proto: JsProto,
    pub has_accessor: bool,
    pub proxied: bool,
}

impl JsObject {
    /// A plain object of the ordinary shape: this realm's prototype, no accessor, not a `Proxy`.
    pub fn plain(members: Vec<(JsKey, JsValue)>) -> JsObject {
        JsObject {
            members,
            proto: JsProto::Plain,
            has_accessor: false,
            proxied: false,
        }
    }
}

/// `crossing.md §1.2`'s `13` rows plus the hole's own carrier: the `5` admitted classes (rows 1–5) and
/// the `8` outside classes (rows 6–13), with `SparseArray` the carrier `§1.4` item 2 refuses.
#[derive(Clone, Debug, PartialEq)]
pub enum JsValue {
    Str(String),
    Bool(bool),
    /// A JS `number`. `-0.0` is carried with its sign: `crossing.md §1.5` clause 3 makes it observable.
    Num(f64),
    Object(JsObject),
    Array(Vec<JsValue>),
    /// `crossing.md §1.4` item 2: an array with a hole. REFUSED (`DD-8`) — *"`Array.from` reads the hole as
    /// `undefined` and `JSON.stringify` reads it as `null`, so the two readings disagree"*.
    SparseArray,
    Null,
    Undefined,
    Function,
    Symbol,
    BigInt(i64),
    NonFinite(f64),
    /// `crossing.md §1.2` row 12: a value that contains itself, detected on the walk's own ancestor stack.
    Cyclic,
    /// `crossing.md §1.2` row 13: any other non-plain collection.
    NonPlainCollection,
}

// =================================================================================================
// THE `8` CARRIERS — `crossing.md §1.3`, `56` variant rows (`§1.6`), one variant per row.
// =================================================================================================

/// `crossing.md §1.3`'s segment table: rows 2–3 admitted, the `10` outside segment classes.
#[derive(Clone, Debug, PartialEq)]
pub enum JsSegment {
    Key(String),
    Index(u64),
    Negative(i64),
    Fractional(f64),
    Null,
    Undefined,
    Bool(bool),
    Object,
    Array,
    Function,
}

/// `crossing.md §1.3`'s `AddressArg` row 6: a non-array's five named classes.
#[derive(Clone, Debug, PartialEq)]
pub enum JsNonArray {
    Str(String),
    Number(f64),
    Bool(bool),
    Object,
    Function,
}

/// `crossing.md §1.3`'s `AddressArg` table, `14` rows.
#[derive(Clone, Debug, PartialEq)]
pub enum JsAddressArg {
    List(Vec<JsSegment>),
    /// Row 13: **a cross-realm array IS an `Array`** — ACCEPTED.
    CrossRealmList(Vec<JsSegment>),
    /// Row 14 (`DD-8`): a sparse array as the address itself.
    Sparse,
    /// Row 12 (`DD-34`): a `Proxy` over an array.
    Proxy,
    /// Row 11: a class instance that is array-like but not an `Array`.
    ClassArrayLike,
    /// Row 4: an ABSENT `address`.
    Absent,
    /// Row 5: `null`.
    Null,
    /// Row 5: `undefined`.
    Undefined,
    /// Row 6: a number, a string, a boolean, an object or a function.
    NonArray(JsNonArray),
}

/// `crossing.md §1.3`'s `TierSetItem` table, `4` rows.
#[derive(Clone, Debug, PartialEq)]
pub enum JsTierSetItem {
    Token(String),
    Null,
    Undefined,
    Number(f64),
    Bool(bool),
    Object,
    Function,
}

/// `crossing.md §1.3`'s `TierArg` table, `7` rows; its arity is the verb's own (`DD-37`, `DD-46`).
#[derive(Clone, Debug, PartialEq)]
pub enum JsTierArg {
    Absent,
    Token(String),
    Set(Vec<JsTierSetItem>),
    Null,
    Undefined,
    Number(f64),
    Bool(bool),
    Object,
    Function,
}

/// `crossing.md §1.3`'s `OpIdArg` table, `6` rows.
#[derive(Clone, Debug, PartialEq)]
pub enum JsOpIdArg {
    Str(String),
    Absent,
    Null,
    Undefined,
    Number(f64),
}

/// `crossing.md §1.3`'s `FilePathArg` table, `6` rows.
#[derive(Clone, Debug, PartialEq)]
pub enum JsFilePathArg {
    Str(String),
    Absent,
    Null,
    Undefined,
    Empty,
    NonString,
}

/// `crossing.md §1.3`'s `JournalLengthArg` table, `12` rows, with NO coercion of a numeric string, a
/// boolean or a `bigint` (`parameter-semantics.md`'s `PAR-JS-4` rows).
#[derive(Clone, Debug, PartialEq)]
pub enum JsJournalLengthArg {
    Count(u32),
    Absent,
    Zero,
    Negative(i64),
    Fractional(f64),
    NaN,
    Infinity,
    NumericString(String),
    Bool(bool),
    Object,
    Function,
    BigInt(i64),
    TooLarge(u64),
    Null,
    Undefined,
}

/// `crossing.md §1.3`'s `ListenersArg` rows 1–2: one `listeners[]` element.
#[derive(Clone, Debug, PartialEq)]
pub enum JsListenerEntry {
    Entry {
        address: JsAddressArg,
        handle: String,
    },
    Other,
}

/// `crossing.md §1.3`'s `ListenersArg` table, `5` rows.
#[derive(Clone, Debug, PartialEq)]
pub enum JsListenersArg {
    List(Vec<JsListenerEntry>),
    Absent,
    Null,
    Undefined,
    NonArray,
}

/// **⟶ ADDED 2026-10-15 (`parameter-semantics.md §2.21`; `surface.md §2.1`'s `cfg` block dated 2026-10-15;
/// `contract.md §0.4`'s `ConstraintsArg` row): THE CONSTRUCTION'S FOURTH DECLARED KEY, `constraints`** —
/// the list and every shape outside it, **with the element's own outside forms carried as the failing
/// ENTRY's `<SEGMENT>` spelling** (`§8.2`'s row, whose `<SEGMENT>` slot is *"the failing ENTRY's `address`
/// spelling, joined by `/` … or the element's own position printed bare where the failing element carries
/// no address at all"*). **The class is decided at the boundary and the CODE and the MESSAGE stay the
/// store's** (`DD-40`; the same split `ListenersArg` takes).
#[derive(Clone, Debug, PartialEq)]
pub enum JsConstraintsArg {
    List(Vec<JsConstraintEntry>),
    Absent,
    Null,
    Undefined,
    NonArray,
}

/// One `constraints[]` element: the closed `{ address, id }` pair, or the element outside it.
#[derive(Clone, Debug, PartialEq)]
pub enum JsConstraintEntry {
    Pair {
        address: JsAddressArg,
        id: String,
    },
    /// An element outside the pair's shape: its own `<SEGMENT>` spelling, pre-spelled at the boundary.
    Invalid(String),
}

/// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth.
/// **`None` IS the key's ABSENCE** (`§4.5` item 2's `Option` row), which is how `crossing.md §1.3`'s
/// absent-versus-`undefined` rule reaches the construction.
///
/// **⟶ THE STRUCT'S OWN MEMBER COUNT IS UNMOVED BY `§2.21`'s FOURTH KEY, AND THE CARRIER IS NOT A FIELD OF
/// IT**: the key crosses **beside** the three, as [`create_with_constraints`]'s second argument, because
/// this struct is constructed as a literal in the crate's own `crossing_carriers` drives and **a field
/// added here would refuse them at the compiler** — the same one-literal-site bound `contract.md §0.4`'s
/// `StoreConfig` row meets on the store's side.
#[derive(Clone, Debug, PartialEq)]
pub struct JsConfig {
    pub file_path: Option<JsFilePathArg>,
    pub journal_length: Option<JsJournalLengthArg>,
    pub listeners: Option<JsListenersArg>,
    /// The fourth key the package may not inject (`DD-36`): read, never passed through.
    pub fourth_key: Option<String>,
}

// =================================================================================================
// THE CONVERSIONS — `package.md §4.5` item 3. Every converter is TOTAL where the table says so and
// carries each outside class onto the store's own argument type AS A VALUE (`DD-1`), so the store's own
// closed fail set stays the only producer of a code and no second, binding-side refusal surface exists.
// =================================================================================================

/// `§4.5` item 3 (a): `Key`/`Index` onto the store's own `Segment`, every outside class onto the store's
/// own outside variant — it does NOT refuse and it mints no code.
pub fn to_segment(s: &JsSegment) -> Segment {
    match s {
        JsSegment::Key(k) => Segment::Key(k.clone()),
        JsSegment::Index(i) => Segment::Index(*i),
        JsSegment::Negative(i) => Segment::Negative(*i),
        JsSegment::Fractional(f) => Segment::Fractional(*f),
        JsSegment::Null => Segment::Null,
        JsSegment::Undefined => Segment::Undefined,
        JsSegment::Bool(b) => Segment::Bool(*b),
        JsSegment::Object => Segment::Object,
        JsSegment::Array => Segment::Array,
        JsSegment::Function => Segment::Function,
    }
}

/// THE COPY OUT of a segment (`§1.1` clause 2): the store's own spelling translated to the JS side's.
pub fn from_segment(s: &Segment) -> JsSegment {
    match s {
        Segment::Key(k) => JsSegment::Key(k.clone()),
        Segment::Index(i) => JsSegment::Index(*i),
        Segment::Negative(i) => JsSegment::Negative(*i),
        Segment::Fractional(f) => JsSegment::Fractional(*f),
        Segment::Null => JsSegment::Null,
        Segment::Undefined => JsSegment::Undefined,
        Segment::Bool(b) => JsSegment::Bool(*b),
        Segment::Object => JsSegment::Object,
        Segment::Array => JsSegment::Array,
        Segment::Function => JsSegment::Function,
    }
}

/// `crossing.md §1.3`'s `AddressArg` table: rows 1–3 and 13 admitted, rows 4–6 and 11–12 and 14 carried.
pub fn to_address_arg(a: &JsAddressArg) -> AddressArg {
    match a {
        JsAddressArg::List(segs) | JsAddressArg::CrossRealmList(segs) => {
            AddressArg::List(segs.iter().map(to_segment).collect())
        }
        // A sparse array, a `Proxy` over an array and a class array-like are all *"not the address's shape
        // at all"* — the store's own `Object` spelling of a shapeless value, which is what its `PAR-1`
        // outside list prints.
        JsAddressArg::Sparse | JsAddressArg::Proxy | JsAddressArg::ClassArrayLike => {
            AddressArg::Object
        }
        JsAddressArg::Absent => AddressArg::Absent,
        JsAddressArg::Null => AddressArg::Null,
        JsAddressArg::Undefined => AddressArg::Undefined,
        JsAddressArg::NonArray(JsNonArray::Str(s)) => AddressArg::Str(s.clone()),
        JsAddressArg::NonArray(JsNonArray::Number(n)) => AddressArg::Number(*n),
        JsAddressArg::NonArray(JsNonArray::Bool(b)) => AddressArg::Bool(*b),
        JsAddressArg::NonArray(JsNonArray::Object) => AddressArg::Object,
        JsAddressArg::NonArray(JsNonArray::Function) => AddressArg::Function,
    }
}

/// **THE SEGMENTS AN ALREADY-ADMITTED ADDRESS SET MEMBER CARRIES** — the second position of
/// `listen(handle, addresses)` is a SET, and the package's own set-position class test has already refused
/// every member outside the store's address domain (`listen-verb.md §2.2` items 2–3). **THE STORE'S OWN
/// `address_segments` IS THE ONE RESOLVER AND THIS FRAME DOES NOT RE-SPELL IT**: a member that is not a list
/// is answered by the store's own `AddressMalformed` at that call, unconverted (`fail-surface.md §1.2`).
fn address_segments_of(a: &JsAddressArg) -> Result<Vec<Segment>, Refusal> {
    match to_address_arg(a) {
        AddressArg::List(segs) => Ok(segs),
        other => storeroom_native::address_segments(&other).map_err(refusal),
    }
}

/// The three tier tokens and no fourth (`docs/specs/storeroom-native/contract.md §5.1`'s closed set).
pub fn tier_of(tok: &str) -> Option<Tier> {
    match tok {
        "file" => Some(Tier::File),
        "mem" => Some(Tier::Mem),
        "temp" => Some(Tier::Temp),
        _ => None,
    }
}

/// `crossing.md §1.3`'s `TierSetItem` table.
pub fn to_tier_set_item(item: &JsTierSetItem) -> TierSetItem {
    match item {
        JsTierSetItem::Token(t) => match tier_of(t) {
            Some(tier) => TierSetItem::Token(tier),
            None => TierSetItem::Other(t.clone()),
        },
        JsTierSetItem::Null => TierSetItem::Null,
        JsTierSetItem::Undefined => TierSetItem::Undefined,
        JsTierSetItem::Number(n) => TierSetItem::Number(*n),
        JsTierSetItem::Bool(b) => TierSetItem::Bool(*b),
        JsTierSetItem::Object => TierSetItem::Object,
        JsTierSetItem::Function => TierSetItem::NonString,
    }
}

/// `crossing.md §1.3`'s `TierArg` table. **The array spelling is the READER's arity** (`DD-37`): it is
/// carried as a set, and the store's own verb answers what a non-reader does with it.
pub fn to_tier_arg(t: &JsTierArg) -> TierArg {
    match t {
        JsTierArg::Absent => TierArg::Absent,
        JsTierArg::Token(tok) => match tier_of(tok) {
            Some(tier) => TierArg::Token(tier),
            None => TierArg::OtherToken(tok.clone()),
        },
        JsTierArg::Set(items) => TierArg::Set(items.iter().map(to_tier_set_item).collect()),
        JsTierArg::Null => TierArg::Null,
        JsTierArg::Undefined => TierArg::Undefined,
        JsTierArg::Number(_) | JsTierArg::Bool(_) | JsTierArg::Object | JsTierArg::Function => {
            TierArg::NonString
        }
    }
}

/// `crossing.md §1.3`'s `OpIdArg` table.
pub fn to_op_id_arg(o: &JsOpIdArg) -> OpIdArg {
    match o {
        JsOpIdArg::Str(s) => OpIdArg::Id(s.clone()),
        JsOpIdArg::Absent => OpIdArg::Absent,
        JsOpIdArg::Null => OpIdArg::Null,
        JsOpIdArg::Undefined => OpIdArg::Undefined,
        JsOpIdArg::Number(n) => OpIdArg::NonString(*n as i64),
    }
}

/// `crossing.md §1.3`'s `FilePathArg` table — and `''` is a KEY's legal spelling and NOT a path's.
pub fn to_file_path_arg(p: &JsFilePathArg) -> FilePathArg {
    match p {
        JsFilePathArg::Str(s) if s.is_empty() => FilePathArg::Empty,
        JsFilePathArg::Str(s) => FilePathArg::Path(s.clone()),
        JsFilePathArg::Absent => FilePathArg::Absent,
        JsFilePathArg::Null => FilePathArg::Null,
        JsFilePathArg::Undefined => FilePathArg::Undefined,
        JsFilePathArg::Empty => FilePathArg::Empty,
        JsFilePathArg::NonString => FilePathArg::NonString,
    }
}

/// `crossing.md §1.3`'s `JournalLengthArg` table, with NO coercion of a numeric string, a boolean or a
/// `bigint` (`PAR-JS-4`'s rows 7/8/11).
pub fn to_journal_length_arg(l: &JsJournalLengthArg) -> JournalLengthArg {
    match l {
        JsJournalLengthArg::Count(n) => JournalLengthArg::Count(*n),
        JsJournalLengthArg::Absent => JournalLengthArg::Absent,
        JsJournalLengthArg::Zero => JournalLengthArg::Zero,
        JsJournalLengthArg::Negative(i) => JournalLengthArg::Negative(*i),
        JsJournalLengthArg::Fractional(f) => JournalLengthArg::Fractional(*f),
        JsJournalLengthArg::NaN => JournalLengthArg::NaN,
        JsJournalLengthArg::Infinity => JournalLengthArg::Infinity,
        JsJournalLengthArg::NumericString(_) => JournalLengthArg::NonNumberString,
        JsJournalLengthArg::Bool(_) => JournalLengthArg::NonNumberBool,
        JsJournalLengthArg::Object
        | JsJournalLengthArg::Function
        | JsJournalLengthArg::BigInt(_) => JournalLengthArg::Object,
        // The too-large row is a NON-INTEGER as far as the store's own domain is concerned, and the store's
        // `Fractional` arm is where its `AddressMalformed` answer is generated.
        JsJournalLengthArg::TooLarge(n) => JournalLengthArg::Fractional(*n as f64),
        JsJournalLengthArg::Null => JournalLengthArg::Null,
        JsJournalLengthArg::Undefined => JournalLengthArg::Undefined,
    }
}

fn entry_segments(address: &JsAddressArg) -> Vec<Segment> {
    match address {
        JsAddressArg::List(segs) | JsAddressArg::CrossRealmList(segs) => {
            segs.iter().map(to_segment).collect()
        }
        // `ListenersArg` row 3: an entry whose `address` lies outside `AddressArg`'s domain — the outside
        // SEGMENT is what the store's own construction test reads, so `AddressArg`'s answer is carried.
        _ => vec![Segment::Object],
    }
}

/// `crossing.md §1.3`'s `ListenersArg` table and `ListenerHandle` row 1.
pub fn to_listeners_arg(l: &JsListenersArg) -> ListenersArg {    match l {
        JsListenersArg::List(entries) => ListenersArg::List(
            entries
                .iter()
                .map(|e| match e {
                    JsListenerEntry::Entry { address, handle } => {
                        if handle.is_empty() {
                            // `ListenerHandle` row 1's refused form: a blank token.
                            ListenerEntry::Other
                        } else {
                            ListenerEntry::Entry {
                                address: entry_segments(address),
                                handle: ListenerHandle::from(handle.as_str()),
                            }
                        }
                    }
                    JsListenerEntry::Other => ListenerEntry::Other,
                })
                .collect(),
        ),
        JsListenersArg::Absent => ListenersArg::Absent,
        JsListenersArg::Null => ListenersArg::Null,
        JsListenersArg::Undefined => ListenersArg::Undefined,
        JsListenersArg::NonArray => ListenersArg::NonArray(String::new()),
    }
}

/// **⟶ ADDED 2026-10-15 (`§7.1` step 4-bis): the FOURTH key crosses as its declared carrier and is
/// validated by the store** — the boundary decides the list's and each element's CLASS (`crossing.md
/// §1.4` item 9) and the store answers `§8.1` #16 with its own generated message (`§8.2`).
pub fn to_constraints_arg(c: &JsConstraintsArg) -> ConstraintsArg {
    match c {
        JsConstraintsArg::List(entries) => ConstraintsArg::List(
            entries
                .iter()
                .map(|entry| match entry {
                    JsConstraintEntry::Pair { address, id } => ConstraintEntry::Pair {
                        address: entry_segments(address),
                        id: id.clone(),
                    },
                    JsConstraintEntry::Invalid(subject) => {
                        ConstraintEntry::Invalid(subject.clone())
                    }
                })
                .collect(),
        ),
        JsConstraintsArg::Absent => ConstraintsArg::Absent,
        JsConstraintsArg::Null => ConstraintsArg::Null,
        JsConstraintsArg::Undefined => ConstraintsArg::Undefined,
        JsConstraintsArg::NonArray => ConstraintsArg::NonArray(String::new()),
    }
}

/// `surface.md §2.1` / `DD-36`: the three keys pass THROUGH — no default, no rename, no fourth key.
pub fn to_config(cfg: &JsConfig) -> StoreConfig {
    StoreConfig {
        filePath: cfg
            .file_path
            .as_ref()
            .map(to_file_path_arg)
            .unwrap_or(FilePathArg::Absent),
        journalLength: cfg
            .journal_length
            .as_ref()
            .map(to_journal_length_arg)
            .unwrap_or(JournalLengthArg::Absent),
        listeners: cfg
            .listeners
            .as_ref()
            .map(to_listeners_arg)
            .unwrap_or(ListenersArg::Absent),
    }
}

// =================================================================================================
// THE WALK AND THE COPY — `crossing.md §1.4` items 1–7, `§1.1` clauses 1–4.
// =================================================================================================

/// `crossing.md §1.4` item 5 / `DD-10`: the depth-`64` / node-`1,000,000` ceiling, measured over the walk's
/// own VISITED NODES and nesting depth.
///
/// **⟶ THE VISITED COUNT AND THE ROOT, RECONCILED 2026-10-11 (`DEF-18`'s second defect; the RCA
/// `docs/specs/storeroom-js-rca-scaling.md §1`/`§6` item 2 measured it):** the clause's own words — *"whose
/// **visited-node count** exceeds `1,000,000`"*, and its dated clause's own arm, *"admits a value whose
/// visited-node count is **`1,000,000`** and REFUSES one of **`1,000,001`**"* (`crossing.md §1.4` item 5,
/// the 2026-10-11 boundary clause that declares **THE CONVERSION CORE'S OWN BOUND** the arm that asserts
/// the property — `bindings/js/src/crossing.rs`'s `to_store_value`, which `NG-JS-D` drives through
/// `bindings/js/index.mjs`'s entry) — **count the value's OWN NODES: its members, each once.** **The ROOT is
/// the value being walked and is not one of its visited nodes** — a walk of an `n`-member array visits
/// exactly `n` nodes, and `visited` was incremented for the root as well, so an `n`-member array measured
/// `n + 1` and **the declared ADMIT figure `1,000,000` was REFUSED at `n = 1,000,000`.** The count now
/// starts at the root's own members, so **an `n`-member array is admitted at `n ≤ 1,000,000` and refused at
/// `n = 1,000,001`** — the clause's figures, at the arm the clause names.
///
/// **THE DEPTH HALF IS UNTOUCHED AND IS NOT THE OFF-BY-ONE:** `depth` is the number of levels the walk
/// DESCENDED, so the root is depth `0` and an `n`-deep chain `{a:{a:…}}` is depth `n` — which is the
/// figure the clause's *"admits a value of depth `64` and REFUSES a value of depth `65`"* is measured
/// against, and which the sibling crate's own `ceiling_depth_64_is_admitted` /
/// `ceiling_depth_65_is_refused_value_not_admitted` cells pin.
fn measure(v: &JsValue) -> (usize, usize) {
    fn walk(v: &JsValue, depth: usize, visited: &mut usize, max_depth: &mut usize) {
        if depth > *max_depth {
            *max_depth = depth;
        }
        match v {
            JsValue::Object(o) => {
                for (_, member) in &o.members {
                    *visited += 1;
                    walk(member, depth + 1, visited, max_depth);
                }
            }
            JsValue::Array(items) => {
                for item in items {
                    *visited += 1;
                    walk(item, depth + 1, visited, max_depth);
                }
            }
            _ => {}
        }
    }
    let mut visited = 0usize;
    let mut max_depth = 0usize;
    walk(v, 0, &mut visited, &mut max_depth);
    (max_depth, visited)
}

/// `crossing.md §1.4` item 4: **THE PLAIN-OBJECT TEST**, items (a)–(g), returning whether the value is a
/// plain object at all.
fn is_plain(o: &JsObject) -> bool {
    match o.proto {
        // Item (e): the prototype is `null` or a plain-object prototype reached WITHOUT an `instanceof`
        // test and WITHOUT a comparison against this realm's `Object.prototype` (`DD-7`, `DD-35`).
        JsProto::Plain | JsProto::Null | JsProto::ForeignPlain => true,
        // Item (f): *"this is the ONE place where a rule resembling an identity test is right"*.
        JsProto::Class => false,
    }
}

/// **THE COPY IN** of `crossing.md §1.1` clause 1 and the walk of `§1.4`: **a value that is admitted is
/// converted into a value the STORE owns; every value outside the taxonomy's admitted set is refused
/// `ValueNotAdmitted` with no node minted, no anchor installed, no container changed and no journal entry
/// appended** (`§1.2`'s closing clause).
///
/// **THE CEILING'S OWN ARM IS `ValueNotAdmitted` AND NOTHING ELSE** (`crossing.md §1.4` item 5, `DD-10`:
/// *"The walk refuses a value whose nesting depth exceeds `64` or whose visited-node count exceeds
/// `1,000,000`, with `ValueNotAdmitted`"*). **The refusal is reached the STORE's way and never by a code
/// minted here**: the ceiling returns the value as an OUTSIDE class, and the store's own taxonomy check
/// then answers with its own `ValueNotAdmitted` and its own generated message at the failing target's
/// address (`§2.5` items 1–2, `DD-40`) — exactly the refusal the same value would draw one class deeper.
pub fn to_store_value(v: &JsValue) -> Result<StoreValue, Refusal> {
    let (depth, visited) = measure(v);
    if depth > 64 || visited > 1_000_000 {
        // The walk reads no further: the two bounds are what the package ships and there is NO
        // configuration knob for either (`DD-10`).
        return Ok(StoreValue::Cyclic);
    }
    Ok(convert(v))
}

fn convert(v: &JsValue) -> StoreValue {
    match v {
        JsValue::Str(s) => StoreValue::Str(s.clone()),
        JsValue::Bool(b) => StoreValue::Bool(*b),
        JsValue::Num(n) => {
            if n.is_finite() {
                StoreValue::Num(*n)
            } else {
                StoreValue::NonFinite(*n)
            }
        }
        JsValue::Object(o) => {
            // `§1.4` items 1 and 4 (c), (d), (f), (g): a `Proxy`, an own accessor, a non-plain prototype and
            // a `Symbol`-keyed own property each refuse the WHOLE value — *"any other answer would DROP A
            // MEMBER SILENTLY"* (`DD-8`).
            if o.members.iter().any(|(k, _)| *k == JsKey::Symbol) {
                return StoreValue::Symbol;
            }
            if o.proxied {
                return StoreValue::NonPlainCollection;
            }
            if o.has_accessor || !is_plain(o) {
                return StoreValue::NonPlainCollection;
            }
            let mut map = BTreeMap::new();
            for (key, member) in &o.members {
                if let JsKey::Key(name) = key {
                    map.insert(name.clone(), convert(member));
                }
            }
            StoreValue::Object(map)
        }
        JsValue::Array(items) => StoreValue::Array(items.iter().map(convert).collect()),
        JsValue::SparseArray => StoreValue::NonPlainCollection,
        JsValue::Null => StoreValue::Null,
        JsValue::Undefined => StoreValue::Undefined,
        JsValue::Function => StoreValue::Function,
        JsValue::Symbol => StoreValue::Symbol,
        JsValue::BigInt(n) => StoreValue::BigInt(*n),
        JsValue::NonFinite(f) => StoreValue::NonFinite(*f),
        JsValue::Cyclic => StoreValue::Cyclic,
        JsValue::NonPlainCollection => StoreValue::NonPlainCollection,
    }
}

/// **THE COPY OUT** of `crossing.md §1.1` clause 2: *"a value the store returns is CONVERTED into fresh
/// JS-owned data"* — the JS side holds no reference into store-owned data, at any depth.
pub fn from_store_value(v: &StoreValue) -> JsValue {
    match v {
        StoreValue::Str(s) => JsValue::Str(s.clone()),
        StoreValue::Bool(b) => JsValue::Bool(*b),
        StoreValue::Num(n) => JsValue::Num(*n),
        StoreValue::Object(m) => JsValue::Object(JsObject::plain(
            m.iter()
                .map(|(k, v)| (JsKey::Key(k.clone()), from_store_value(v)))
                .collect(),
        )),
        StoreValue::Array(items) => JsValue::Array(items.iter().map(from_store_value).collect()),
        StoreValue::Null => JsValue::Null,
        StoreValue::Undefined => JsValue::Undefined,
        StoreValue::Function => JsValue::Function,
        StoreValue::Symbol => JsValue::Symbol,
        StoreValue::BigInt(n) => JsValue::BigInt(*n),
        StoreValue::NonFinite(f) => JsValue::NonFinite(*f),
        StoreValue::Cyclic => JsValue::Cyclic,
        StoreValue::NonPlainCollection => JsValue::NonPlainCollection,
    }
}

// =================================================================================================
// THE RETURNED RECORDS — `package.md §4.5` item 4, member for member (`DD-39`).
// =================================================================================================

/// **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): THE HANDLE IS THE CALLER-SPELLED STRING, AND THE
/// TOKEN BEHIND IT IS DELETED** (`P: docs/pending.md · P-6`, the type ruling, verbatim: *"Refuse handles
/// that aren't strings."*; its wire-form ruling: *"Not needed — the handle is a string, so there is nothing
/// to carry"*). **`JsHandle { token: String }` COLLAPSES TO THE STRING IT ALWAYS WAS** — the value the store
/// reports and the value the caller holds ARE ONE VALUE, compared by STRING EQUALITY throughout
/// (`contract.md §2.1` item 1). **NOTHING IS MINTED, NOTHING IS WRAPPED, AND NO LAYER TRANSLATES:** the
/// facade's `string_value(handle.token())` becomes `string_value(handle)` and the two halves meet in the
/// middle.
///
/// **WHAT THIS RETIRES, EACH NAMED AT ITS OWN BYTES** (`P: docs/pending.md · P-6`, consequences (i)–(vi)):
/// the mint (`src/store.rs`'s `NEXT_HANDLE` and its skip loop), `Home::holds_token`, `Instance::owned`'s
/// second bookkeeping of one fact, and the JS-side `{}` wrapper. **THE DOMAIN TEST THAT SURVIVES IS A DIRECT
/// MAP KEY CHECK** (`identity-and-domain.md §1` item 4).
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct JsHandle {
    handle: String,
}

impl JsHandle {
    /// **THE ONE CONSTRUCTION: the handle the STORE returned, carried as it stands** — no wrap, no token, no
    /// translation (`contract.md §2.4` item 1: the pair's `handle` member *"is the caller own STRING, never a
    /// wrapper, a token or an encoding"*).
    pub fn wrap(handle: &ListenerHandle) -> JsHandle {
        JsHandle {
            handle: handle.to_string(),
        }
    }

    /// The handle, for this crate's own facade — the string itself, and never a token behind it.
    pub(crate) fn handle(&self) -> &str {
        &self.handle
    }

    /// A handle spelled by the caller — **which is now the ordinary case and not a special route**: the
    /// caller spells it, holds it and passes it back (`contract.md §2.1` item 1).
    pub(crate) fn from_handle(handle: &str) -> JsHandle {
        JsHandle {
            handle: handle.to_string(),
        }
    }
}

/// **⟶ THE TRIGGER'S PAIR ACROSS THE BOUNDARY — `{handle, address}` (`contract.md §2.4` item 1;
/// `trigger-and-pair.md §2` item 2).** **The element type of `triggered` on BOTH returned records, and it
/// REPLACES the bare handle list rather than supplementing it**: the two `Vec<JsHandle>` members this crate
/// declared at `JsWriteResult`/`JsDeleteReceipt` are the old shape, and this carrier moves with `PAR-HL-38`.
///
/// **THE TWO MEMBERS ARE THE DECLARED TWO AND NO THIRD** (`PAR-HL-19`, `PAR-HL-20`): `handle` is the
/// caller's own string and `address` is **THE BINDING's** address — a segment list — never the written
/// address the record's `triggeringAddress` carries beside it.
#[derive(Clone, Debug, PartialEq)]
pub struct JsListenerTrigger {
    pub handle: JsHandle,
    pub address: Vec<JsSegment>,
}

impl JsListenerTrigger {
    /// The pair the store selected, crossed member for member and with nothing re-derived.
    pub fn wrap(trigger: &ListenerTrigger) -> JsListenerTrigger {
        JsListenerTrigger {
            handle: JsHandle::wrap(&trigger.handle),
            address: trigger.address.iter().map(from_segment).collect(),
        }
    }
}

/// `crossing.md §1.3`'s `ListenerHandle` row 2: **the opaque form alone is `unlisten`'s own**, and every
/// other spelling is a NO-OP SUCCESS (`§2.3` item 4).
#[derive(Clone, Debug, PartialEq)]
pub enum JsHandleArg {
    Opaque(JsHandle),
    Bare(String),
    NonOpaque,
    Absent,
}

/// `DD-39`'s state half: `{present, value}` — the value being a fresh JS-owned copy.
#[derive(Clone, Debug, PartialEq)]
pub struct JsBaseState {
    pub present: bool,
    pub value: JsValue,
}

fn base_state(s: &BaseState) -> JsBaseState {
    JsBaseState {
        present: s.present,
        value: from_store_value(&s.value),
    }
}

/// `PAR-JS-13`: the journal op's own eight members, at the package's own spellings.
#[derive(Clone, Debug, PartialEq)]
pub struct JsJournalOp {
    pub opId: String,
    /// The store's own kind token: `"write"` or `"delete"`.
    pub kind: String,
    pub address: Vec<JsSegment>,
    pub tier: Option<String>,
    pub before: JsBaseState,
    pub after: JsBaseState,
    pub seq: u64,
    pub compacted: bool,
}

/// `PAR-JS-13`–`PAR-JS-15`: `{op, watched, triggered}` — a fresh record on every call.
#[derive(Clone, Debug, PartialEq)]
pub struct JsWriteResult {
    pub op: JsJournalOp,
    pub watched: Vec<Vec<JsSegment>>,
    /// **⟶ THE PAIRS, NOT A BARE HANDLE LIST** (`contract.md §2.4` item 1; `PAR-HL-38`): the element is
    /// `{handle, address}` and the pair REPLACES what stood here rather than supplementing it.
    pub triggered: Vec<JsListenerTrigger>,
}

/// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM and `tiers` in the store's canonical
/// order (`file` · `mem` · `temp`).
#[derive(Clone, Debug, PartialEq)]
pub struct JsDeleteReceipt {
    pub address: Vec<JsSegment>,
    pub tiers: Vec<String>,
    /// **⟶ THE PAIRS** (`contract.md §2.4` item 1; `PAR-HL-38`; `A43` — a delete fires its own set).
    pub triggered: Vec<JsListenerTrigger>,
}

/// `PAR-JS-13` / `PAR-JS-9`: `{opId, undoneOps, restoredTo}`.
#[derive(Clone, Debug, PartialEq)]
pub struct JsRollbackResult {
    pub opId: String,
    pub undoneOps: Vec<String>,
    pub restoredTo: JsBaseState,
}

fn journal_op(op: &storeroom_native::JournalOp) -> JsJournalOp {
    JsJournalOp {
        opId: op.opId.clone(),
        kind: match op.kind {
            storeroom_native::JournalOpKind::Write => "write".to_string(),
            storeroom_native::JournalOpKind::Delete => "delete".to_string(),
        },
        address: op.address.iter().map(from_segment).collect(),
        tier: op.tier.map(|t| storeroom_native::tier_token(t).to_string()),
        before: base_state(&op.before),
        after: base_state(&op.after),
        seq: op.seq,
        compacted: op.compacted,
    }
}

fn addresses(list: &[Vec<Segment>]) -> Vec<Vec<JsSegment>> {
    list.iter()
        .map(|a| a.iter().map(from_segment).collect())
        .collect()
}

/// **⟶ THE PAIR CARRIER — `{handle, address}`, member for member** (`contract.md §2.4` item 1). The
/// function that stood here mapped a bare `ListenerHandle` list to a bare `JsHandle` list, and the pair
/// REPLACES it (`trigger-and-pair.md §2` item 2).
fn triggers(list: &[ListenerTrigger]) -> Vec<JsListenerTrigger> {
    list.iter().map(JsListenerTrigger::wrap).collect()
}

// =================================================================================================
// THE INSTANCE — `package.md §4.5` item 5: ONE store instance and the handle DOMAIN of §2.4.
// =================================================================================================

/// **⟶ THE CORE-SIDE LISTENER CARRIER IS DELETED (`F-13`; `U-11`): `JsListener` AND ITS IN-CRATE REGISTRY
/// (`Instance::registry`), `Instance::listener_for` AND `Instance::triggered_set` ARE GONE.** **THE ROUTE IS
/// `A75`'s AND THE INVOCATION IS THE MAPPING LAYER'S** (`JS → facade → core → store`; `A77`: *"the store
/// passes an ID back to the client when a listener is triggered, and the JS side matches that ID to the
/// function the caller registered it with"*), so the FUNCTION never crosses this boundary (`DD-15`): the
/// package holds it in its own per-instance registry, keyed by the opaque handle it returned (`§2.4`;
/// `index.mjs`'s `state.registry`), and this core keeps the handle DOMAIN that decides whether a
/// registration is in domain (`§2.4` item 5 (c)) and nothing else. **The deleted registry was WRITE-ONLY in
/// every reachable state: `triggered_set` had no caller on either side of the boundary, `listener_for` had
/// none anywhere (`V-5`), and the slot the facade filled held `Box::new(|_| ())` — a closure nothing could
/// invoke.**
///
/// `package.md §4.5` item 5: **the core's own instance type**, holding ONE store instance and **the handle
/// domain this instance minted or adopted**; **the core invokes no listener of its own accord and holds no
/// listener at all.**
pub struct Instance {
    store: Store,
    /// **THE HANDLE'S PER-INSTANCE DOMAIN** (`§2.4` item 5 (c)): every token THIS instance minted
    /// (`listen`) or ADOPTED at its own construction. **The domain is this instance's and never a token
    /// equality across instances**, so a value a FOREIGN instance minted answers the same `TypeError`
    /// every other outside value does.
    owned: Vec<String>,
}

/// A drive reads a construction's failure with `Result::expect_err`, so the instance's own type carries
/// `Debug` — and NOTHING of the store's internals is printed by it.
impl std::fmt::Debug for Instance {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Instance")
    }
}

/// `surface.md §2.1`: `storeCreate(cfg)` crosses as ONE function taking ONE plain object, and every
/// outside form of `cfg` and of its three keys answers the store's own code with NO instance returned
/// (`§2.1`: *"never returns a partial instance"*).
pub fn create(cfg: &JsConfig) -> Result<Instance, Refusal> {
    create_with_constraints(cfg, None)
}

/// **⟶ ADDED 2026-10-15 (`§7.1` step 4-bis; `parameter-semantics.md §2.21`): THE CONSTRUCTION WITH THE
/// FOURTH DECLARED KEY SUPPLIED BESIDE THE THREE.** The construction is ONE and its sequence unmoved; only
/// the `constraints` carrier arrives through this argument (`storeCreateWithConstraints`), **because
/// `contract.md §0.4`'s three-member `StoreConfig` literal is spelled in six unmodifiable places of the
/// Rust red set and this crate's own `JsConfig` literal in eleven more** — so neither struct gains a field
/// and no existing drive is refused at the compiler.
pub fn create_with_constraints(
    cfg: &JsConfig,
    constraints: Option<&JsConstraintsArg>,
) -> Result<Instance, Refusal> {
    let constraints = match constraints {
        Some(c) => to_constraints_arg(c),
        None => ConstraintsArg::Absent,
    };
    match storeCreateWithConstraints(&to_config(cfg), &constraints) {
        Ok(store) => Ok(Instance {
            store,
            owned: adopted_tokens(cfg),
        }),
        Err(err) => Err(refusal(err)),
    }
}

/// The construction's ADOPTED handles (`§2.3` item 2: *"the construction ADOPTS the caller's tokens
/// verbatim"*), read from the construction's own `listeners[]` — the second half of the instance's
/// handle domain beside the tokens `listen` mints.
fn adopted_tokens(cfg: &JsConfig) -> Vec<String> {
    let mut out = Vec::new();
    if let Some(JsListenersArg::List(entries)) = &cfg.listeners {
        for entry in entries {
            if let JsListenerEntry::Entry { handle, .. } = entry {
                if !handle.is_empty() && !out.contains(handle) {
                    out.push(handle.clone());
                }
            }
        }
    }
    out
}

impl Instance {
    /// `§2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register.
    pub fn read(&self, address: &JsAddressArg, tier: &JsTierArg) -> Result<JsValue, Refusal> {        self.store
            .read(to_address_arg(address), to_tier_arg(tier))
            .map(|v| from_store_value(&v))
            .map_err(refusal)
    }

    /// `§2.2` / `§2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`
    /// on a branch — the store's own answer.
    pub fn read_literal(
        &self,
        address: &JsAddressArg,
        tier: &JsTierArg,
    ) -> Result<JsValue, Refusal> {
        self.store
            .readLiteral(to_address_arg(address), to_tier_arg(tier))
            .map(|v| from_store_value(&v))
            .map_err(refusal)
    }

    /// `§2.2`: `write` — the value crosses IN first (`§1.1` clause 1) and the record crosses OUT.
    pub fn write(
        &mut self,
        address: &JsAddressArg,
        tier: &JsTierArg,
        value: &JsValue,
    ) -> Result<JsWriteResult, Refusal> {
        let stored = to_store_value(value)?;
        let result: WriteResult = self
            .store
            .write(to_address_arg(address), to_tier_arg(tier), stored)
            .map_err(refusal)?;
        Ok(JsWriteResult {
            op: journal_op(&result.op),
            watched: addresses(&result.watched),
            triggered: triggers(&result.triggered),
        })
    }

    /// **`surface.md §2.11` CLAUSE 2 / `contract.md §7.2` item 2 as amended 2026-10-15 — THE TERMINAL ARM'S
    /// OWN ACT, CROSSED AS THE SEAM'S OWN STEP AND NOT AS A VERB.** The op id is the SETTLED RECORD's own
    /// `op` identity, and the act's whole answer is the store's own `Result` (`§8.1` #15 on its failure arm;
    /// the store rolls the write back FIRST and the message is answered SECOND).
    pub fn commit_file(&mut self, op_id: &str) -> Result<(), Refusal> {
        self.store.commit_file(op_id).map_err(refusal)
    }

    /// `§2.2` / `PAR-JS-16`: `delete` — the receipt's `address` VERBATIM and its `tiers` canonical.
    pub fn delete(
        &mut self,
        address: &JsAddressArg,
        tier: &JsTierArg,
    ) -> Result<JsDeleteReceipt, Refusal> {
        let receipt: DeleteReceipt = self
            .store
            .delete(to_address_arg(address), to_tier_arg(tier))
            .map_err(refusal)?;
        Ok(JsDeleteReceipt {
            address: receipt.address.iter().map(from_segment).collect(),
            tiers: receipt
                .tiers
                .iter()
                .map(|t| storeroom_native::tier_token(*t).to_string())
                .collect(),
            triggered: triggers(&receipt.triggered),
        })
    }

    /// `§2.2` / `§2.6`: `rollback` — the constraint pattern's own reverse step, over the id a `write`
    /// returned.
    pub fn rollback(&mut self, op_id: &JsOpIdArg) -> Result<JsRollbackResult, Refusal> {
        let result: RollbackResult = self.store.rollback(to_op_id_arg(op_id)).map_err(refusal)?;
        Ok(JsRollbackResult {
            opId: result.opId,
            undoneOps: result.undoneOps,
            restoredTo: base_state(&result.restoredTo),
        })
    }

    /// **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): `listen(handle, addresses)` — THE CALLER
    /// SUPPLIES THE IDENTITY AND THE SET** (`contract.md §2.2`; `listen-verb.md §1` item 1).
    /// **NOTHING IS MINTED, NOTHING IS WRAPPED AND THE ANSWER IS `()`**: the caller supplied the identity, so
    /// there is no datum to return (`contract.md §2.2` item 10; `PAR-HL-3`).
    ///
    /// **AND `listen` POPULATES EVERYTHING THE MINTED TOKEN USED TO**: the store's home entry (through the
    /// store's own verb), the home mirror, the function map's key and the instance's domain — which is why
    /// the handle is recorded in `owned` here exactly as an adopted one is at construction
    /// (`P: docs/pending.md · P-5`, ruling (4)).
    pub fn listen(&mut self, handle: &JsHandleArg, addresses: &[JsAddressArg]) -> Result<(), Refusal> {
        // **THE HANDLE POSITION'S CLASS TEST IS THE CALLER'S AND THIS SITE IS REACHED ONLY WITH A STRING**
        // (`identity-and-domain.md §2` item 1): the package's own verb refuses every outside value before the
        // addon is called, so an out-of-domain `JsHandleArg` cannot arrive here — and if one did, it is an
        // absent argument and the core refuses it in the registration site's one form.
        let spelled = match handle {
            JsHandleArg::Opaque(opaque) => opaque.handle.clone(),
            JsHandleArg::Bare(_) | JsHandleArg::NonOpaque | JsHandleArg::Absent => {
                return Err(registration_refusal(
                    "",
                    "listen's first argument",
                    "an absent argument",
                ))
            }
        };
        let mut set: Vec<Vec<Segment>> = Vec::with_capacity(addresses.len());
        for address in addresses {
            set.push(address_segments_of(address)?);
        }
        self.store
            .listen(&ListenerHandle::from(spelled.as_str()), &set)
            .map_err(refusal)?;
        if !self.owned.contains(&spelled) {
            self.owned.push(spelled);
        }
        Ok(())
    }

    /// **⟶ `removeListener(handle)`'s STORE HALF — THE PURGE, AND IT IS WHOLESALE**
    /// (`contract.md §2.7` item 2; `removal-members.md §2` item 3: *"the removal IS the purge"*).
    ///
    /// **IT REMOVES EVERY ENTRY THE HANDLE NAMES, AT EVERY ADDRESS IT STOOD AT** (`P: docs/pending.md ·
    /// (M-1)`; `(Y-1)`: *"the purge is by HANDLE — it never enumerates addresses or consults a count"*) — and
    /// **it does NOT reach `unlisten`**, whose first-match withdrawal is a different act (`listen-verb.md §3`
    /// item 2: *"the purge is NEITHER `withdraw` … NOR `adopt`"*). **The one handle position is the caller's
    /// own string and nothing else** (`contract.md §2.1` item 1).
    pub fn remove_listener(&mut self, handle: &JsHandleArg) -> Result<(), Refusal> {
        match handle {
            JsHandleArg::Opaque(named) => self
                .store
                .remove_listener(&ListenerHandle::from(named.handle.as_str()))
                .map_err(refusal),
            // A non-string cannot name an entry: the package's own class test refuses it before this frame
            // (`removal-members.md §6` item 1), so an arrival here is an absent argument and answers the
            // store's own no-op (`PAR-HL-4`'s outside-value cell: a purge of nothing is a lawful act).
            JsHandleArg::Bare(_) | JsHandleArg::NonOpaque | JsHandleArg::Absent => Ok(()),
        }
    }

    /// `§2.3` item 4: **`unlisten` over any value outside the domain is a NO-OP SUCCESS** — and a
    /// withdrawal throws exactly where the store does, which is nowhere but a malformed shape.
    pub fn unlisten(&mut self, handle: &JsHandleArg) -> Result<(), Refusal> {
        match handle {
            JsHandleArg::Opaque(opaque) => self
                .store
                .unlisten(&ListenerHandle::from(opaque.handle.as_str()))
                .map_err(refusal),
            JsHandleArg::Bare(_) | JsHandleArg::NonOpaque | JsHandleArg::Absent => Ok(()),
        }
    }

    /// `contract.md §2.4` item 5 / `package.md §4.5` item 5 (a), (b): **the registration site's DOMAIN
    /// HALF.** An outside `handle` — **a value THIS INSTANCE never minted or adopted, which is what item 5
    /// (c)'s per-instance domain means** — is a REFUSAL whose `status` **is the store's own
    /// `AddressMalformed`, drawn from the closed set and never minted** (`surface.md §2.5` item 5 (g),
    /// `DD-40`); an in-domain handle is the success with the domain's own answer.
    ///
    /// **⟶ AND THIS IS THE WHOLE OF WHAT THE CORE ANSWERS AT THAT SITE (`F-13`): THE LISTENER ARGUMENT AND
    /// THE CORE-SIDE REGISTRY ARE GONE.** **The FUNCTION never crosses (`DD-15`) and the core holds no
    /// slot for one**: the package's own `register` judges the second argument (a non-function is
    /// `index.mjs`'s refusal, before the addon is reached at all — `§2.4` item 5 (d)), the package's own
    /// per-instance registry keeps the function keyed by the handle, and this boundary is asked only whether
    /// the handle belongs to THIS instance's domain (`§2.4` item 5 (c)). **`register` REPLACES rather than
    /// fans out (rule 2) at the registry that holds the function, which is the package's.**
    pub fn register(&mut self, handle: &JsHandleArg) -> Result<(), Refusal> {
        match handle {
            JsHandleArg::Opaque(opaque) if self.owned.contains(&opaque.handle) => Ok(()),
            JsHandleArg::Opaque(_)
            | JsHandleArg::Bare(_)
            | JsHandleArg::NonOpaque
            | JsHandleArg::Absent => {
                // The target is rendered as its own value where the handle carries one, and as the class
                // otherwise (`surface.md §2.5` item 5 (a)), with the argument position beside it (item 5 (b)).
                let (target, class) = match handle {
                    JsHandleArg::Opaque(opaque) => (
                        opaque.handle.clone(),
                        "a handle a FOREIGN instance holds",
                    ),
                    JsHandleArg::Bare(bare) => (bare.clone(), "a bare string"),
                    _ => (String::from(""), "an absent argument"),
                };
                Err(registration_refusal(
                    &target,
                    "register's first argument",
                    class,
                ))
            }
        }
    }
}
