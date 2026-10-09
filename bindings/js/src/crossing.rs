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
    storeCreate, AddressArg, BaseState, DeleteReceipt, FilePathArg, JournalLengthArg, ListenerEntry,
    ListenerHandle, ListenersArg, OpIdArg, RollbackResult, Segment, Store, StoreConfig, StoreError,
    StoreValue, Tier, TierArg, TierSetItem, WriteResult,
};

/// `surface.md §2.5` / `DD-12` / `package.md §4.5` item 4: **THE SINGLE FAILURE FORM AT THE CORE LAYER** —
/// `{status, message}` and nothing else. In Rust the contract's "thrown" is the call's `Err` arm.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Refusal {
    pub status: String,
    pub message: String,
}

/// The status `§4.5` item 5 (a) declares for the registry's non-function registration: **NOT a store
/// code**, because `parameter-semantics.md §2.12` (`PAR-JS-12`) declares a JS `TypeError` at that one site
/// and the facade translates it.
pub const TYPE_ERROR_STATUS: &str = "TypeError";

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

/// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth.
/// **`None` IS the key's ABSENCE** (`§4.5` item 2's `Option` row), which is how `crossing.md §1.3`'s
/// absent-versus-`undefined` rule reaches the construction.
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
        JsAddressArg::Sparse | JsAddressArg::Proxy | JsAddressArg::ClassArrayLike => AddressArg::Object,
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
        JsJournalLengthArg::Object | JsJournalLengthArg::Function | JsJournalLengthArg::BigInt(_) => {
            JournalLengthArg::Object
        }
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
pub fn to_listeners_arg(l: &JsListenersArg) -> ListenersArg {
    match l {
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
fn measure(v: &JsValue) -> (usize, usize) {
    fn walk(v: &JsValue, depth: usize, visited: &mut usize, max_depth: &mut usize) {
        *visited += 1;
        if depth > *max_depth {
            *max_depth = depth;
        }
        match v {
            JsValue::Object(o) => {
                for (_, member) in &o.members {
                    walk(member, depth + 1, visited, max_depth);
                }
            }
            JsValue::Array(items) => {
                for item in items {
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
/// appended** (`§1.2`'s closing clause). The refusal is delivered by the store's OWN taxonomy check, so
/// both the code and the generated message are the store's.
pub fn to_store_value(v: &JsValue) -> Result<StoreValue, Refusal> {
    let (depth, visited) = measure(v);
    if depth > 64 || visited > 1_000_000 {
        // `DD-10`: *"the walk refuses a value whose nesting depth exceeds `64` or whose visited-node count
        // exceeds `1,000,000`"* — and the package ships NO configuration knob for either bound.
        return Ok(StoreValue::NonPlainCollection);
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

/// `surface.md §2.3` / `DD-14`: the package's own OPAQUE handle around the store's token. **The token has
/// no public accessor**: it is reachable only through the store's own declared `Display` spelling inside
/// this crate, and its `PartialEq` is token equality — which is exactly the "no other token the store
/// mints is equal to it" rule read as an equality.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct JsHandle {
    token: String,
}

impl JsHandle {
    /// Wrap a token the store returned (`§2.3` item 2: *"the package's opaque JS value wrapping a token the
    /// store returned"*).
    pub fn wrap(handle: &ListenerHandle) -> JsHandle {
        JsHandle {
            token: handle.to_string(),
        }
    }

    /// The token, for this crate's own facade — never for a `Js*` type a consumer may read.
    pub(crate) fn token(&self) -> &str {
        &self.token
    }

    /// A handle spelled by a token, for the facade's own registry lookups (`§2.4` rule 2's "one entry per
    /// handle" needs an identity, and the identity is the token).
    pub(crate) fn from_token(token: &str) -> JsHandle {
        JsHandle {
            token: token.to_string(),
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
    pub triggered: Vec<JsHandle>,
}

/// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM and `tiers` in the store's canonical
/// order (`file` · `mem` · `temp`).
#[derive(Clone, Debug, PartialEq)]
pub struct JsDeleteReceipt {
    pub address: Vec<JsSegment>,
    pub tiers: Vec<String>,
    pub triggered: Vec<JsHandle>,
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

fn handles(list: &[ListenerHandle]) -> Vec<JsHandle> {
    list.iter().map(JsHandle::wrap).collect()
}

// =================================================================================================
// THE INSTANCE — `package.md §4.5` item 5: ONE store instance and the PACKAGE-OWNED registry of §2.4.
// =================================================================================================

/// `contract.md §2.4` / `package.md §4.5` item 5 (a): the registry's entry. **The listener is a JS
/// FUNCTION**, which has no Rust spelling; the core carries the slot the facade fills.
pub enum JsListener {
    /// The caller's function, as the facade holds it.
    Function(Box<dyn FnMut(&JsWriteResult)>),
    /// A registration that is not a function (`PAR-JS-12`): a REFUSAL whose status is NOT a store code.
    NonFunction,
}

/// `package.md §4.5` item 5: **the core's own instance type**, holding ONE store instance and the
/// package-owned registry of `§2.4`. **The core never invokes a listener of its own accord**: the facade
/// reads the registry's answer (`listener_for`) and performs the invocation after the verb returns.
pub struct Instance {
    store: Store,
    /// The registry: ONE entry per handle (`§2.4` rule 2 — `register` REPLACES, never fans out).
    registry: Vec<(String, JsListener)>,
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
    match storeCreate(&to_config(cfg)) {
        Ok(store) => Ok(Instance {
            store,
            registry: Vec::new(),
        }),
        Err(err) => Err(refusal(err)),
    }
}

impl Instance {
    /// `§2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register.
    pub fn read(&self, address: &JsAddressArg, tier: &JsTierArg) -> Result<JsValue, Refusal> {
        self.store
            .read(to_address_arg(address), to_tier_arg(tier))
            .map(|v| from_store_value(&v))
            .map_err(refusal)
    }

    /// `§2.2` / `§2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`
    /// on a branch — the store's own answer.
    pub fn read_literal(&self, address: &JsAddressArg, tier: &JsTierArg) -> Result<JsValue, Refusal> {
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
            triggered: handles(&result.triggered),
        })
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
            triggered: handles(&receipt.triggered),
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

    /// `§2.10`: `listen` mints a token, populates the store's home and wraps it for JS.
    pub fn listen(&mut self, address: &JsAddressArg) -> Result<JsHandle, Refusal> {
        self.store
            .listen(to_address_arg(address))
            .map(|handle| JsHandle::wrap(&handle))
            .map_err(refusal)
    }

    /// `§2.3` item 4: **`unlisten` over any value outside the domain is a NO-OP SUCCESS** — and a
    /// withdrawal throws exactly where the store does, which is nowhere but a malformed shape.
    pub fn unlisten(&mut self, handle: &JsHandleArg) -> Result<(), Refusal> {
        match handle {
            JsHandleArg::Opaque(opaque) => self
                .store
                .unlisten(&ListenerHandle::from(opaque.token.as_str()))
                .map_err(refusal),
            JsHandleArg::Bare(_) | JsHandleArg::NonOpaque | JsHandleArg::Absent => Ok(()),
        }
    }

    /// `contract.md §2.4` item 5 / `package.md §4.5` item 5 (a), (b): **the registry's own site.** An
    /// outside `handle` or a non-function `listener` is a REFUSAL whose `status` is NOT a store code; and
    /// otherwise the registration REPLACES the handle's entry and never fans out.
    pub fn register(&mut self, handle: &JsHandleArg, listener: JsListener) -> Result<(), Refusal> {
        let token = match handle {
            JsHandleArg::Opaque(opaque) => opaque.token.clone(),
            JsHandleArg::Bare(_) | JsHandleArg::NonOpaque | JsHandleArg::Absent => {
                return Err(Refusal {
                    status: TYPE_ERROR_STATUS.to_string(),
                    message: "the registration's handle is not one this package minted".to_string(),
                })
            }
        };
        if let JsListener::NonFunction = listener {
            return Err(Refusal {
                status: TYPE_ERROR_STATUS.to_string(),
                message: "the registration's listener is not a function".to_string(),
            });
        }
        match self.registry.iter_mut().find(|(t, _)| *t == token) {
            Some(entry) => entry.1 = listener,
            None => self.registry.push((token, listener)),
        }
        Ok(())
    }

    /// `§4.5` item 5 (c): **THE SET, AS A SET** — the triggered handles whose registration STANDS, each
    /// ONCE, and *"an unregistered handle's `triggered_set` membership fires nothing silently"* (rule 1).
    /// **Its order is NOT a declared order** (`§2.7` item 3, `DD-22`).
    pub fn triggered_set(&self, r: &JsWriteResult) -> Vec<JsHandle> {
        let mut out: Vec<JsHandle> = Vec::new();
        for handle in &r.triggered {
            let registered = self
                .registry
                .iter()
                .any(|(token, _)| token == handle.token());
            if registered && !out.iter().any(|h| h == handle) {
                out.push(handle.clone());
            }
        }
        out
    }

    /// The facade's read of the registry's answer (`§4.5` item 5: *"the facade reads the registry's answer
    /// and performs the invocation after the verb returns"*) — the core itself invokes nothing.
    pub fn listener_for(&mut self, handle: &JsHandle) -> Option<&mut JsListener> {
        self.registry
            .iter_mut()
            .find(|(token, _)| token == handle.token())
            .map(|(_, listener)| listener)
    }
}
