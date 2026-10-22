//! The admitted value taxonomy (`§1.4`), the address segment domain (`§1.5`) and the JSON image of a
//! `file`-tier state (`§7.2` `M-12`).

use crate::records::Kind;
use serde::Deserialize;
use std::cmp::Ordering;
use std::collections::BTreeMap;
use std::hash::{Hash, Hasher};

/// `§1.4`'s admitted four classes and its OUTSIDE classes.
///
/// Each outside class is a variant so that its trigger is REACHABLE (`§0.4`): a write of one of them fails
/// `ValueNotAdmitted` and mints no node. `Object` is a `BTreeMap` so structural equality is
/// key-order-insensitive by construction (`§5.2` `P-IM-1`'s failure list).
#[derive(Clone, Debug, PartialEq)]
pub enum StoreValue {
    // §1.4's admitted classes.
    Str(String),
    Bool(bool),
    /// A finite JSON number (integral or fractional).
    Num(f64),
    Object(BTreeMap<String, StoreValue>),
    Array(Vec<StoreValue>),
    // §1.4's outside classes — each a write-time `ValueNotAdmitted`.
    Null,
    Undefined,
    Function,
    Symbol,
    BigInt(i64),
    NonFinite(f64),
    Cyclic,
    NonPlainCollection,
}

impl StoreValue {
    /// `§1.4`: is this value inside the admitted set? A structured value is admitted iff every value it
    /// holds is (`null`, a function, a `BigInt` or a non-finite number nested in an object is no more
    /// admitted than it is at the top level).
    pub fn is_admitted(&self) -> bool {
        match self {
            StoreValue::Str(_) | StoreValue::Bool(_) => true,
            StoreValue::Num(n) => n.is_finite(),
            StoreValue::Object(members) => members.values().all(|v| v.is_admitted()),
            StoreValue::Array(items) => items.iter().all(|v| v.is_admitted()),
            _ => false,
        }
    }

    /// The value's own compact JSON spelling, used by `§8.2`'s `ContainerKindConflict` message (example
    /// (3): `[1,2]`).
    pub(crate) fn json_spelling(&self) -> String {
        crate::json::encode(self)
    }

    /// §1.3's container kind a write of this value decides.
    pub(crate) fn container_kind(&self) -> Option<Kind> {
        match self {
            StoreValue::Object(_) => Some(Kind::Map),
            StoreValue::Array(_) => Some(Kind::Vec),
            _ => None,
        }
    }
}

/// **`crossing.md §1.3`'s `AddressArg` row 3 range clause's boundary, spelled ONCE for this crate:**
/// `Number.MAX_SAFE_INTEGER`, `2^53 - 1` — the largest integral `number` a JS consumer can hold, compare
/// and transmit EXACTLY, and the inclusive upper bound of the INDEX class's declared range. **It is a
/// DECLARED bound, deliberately narrower than the carrier's own `u64` range, and it is the one bound
/// `Segment::is_in_domain` tests** (the store cell that owes this clause its own dated home is filed as a
/// contract finding; the bound is taken here because every route reads THIS predicate).
const MAX_SAFE_INTEGER: u64 = 9_007_199_254_740_991;

/// `§1.5`'s segment domain, closed at exactly two classes, plus its OUTSIDE classes (each `AddressMalformed`).
#[derive(Clone, Debug, PartialEq)]
pub enum Segment {
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

/// The marker the keyed container's key must satisfy. **The two classes the container's key domain ADMITS
/// (`Key`/`Index`) are reflexive under `PartialEq`, which is every key a container ever holds** — a segment
/// outside the domain is `AddressMalformed` at the write (`§1.5` items 2–3) and `L-1` at the walk (`§2.2`),
/// so it reaches no container and is stored under no key.
impl Eq for Segment {}

impl Segment {
    /// `§1.5` item 1: inside the domain iff a string or a non-negative integer.
    ///
    /// **⟶ AMENDED 2026-10-11 — THE INTEGRAL SEGMENT'S RANGE CLAUSE, TAKEN ONCE HERE BECAUSE THIS IS THE
    /// ONE PREDICATE EVERY ROUTE ASKS** (`crossing.md §1.3`'s `AddressArg` row 3 dated range clause — *"an
    /// integral segment `n` is IN DOMAIN iff `0 <= n <= Number.MAX_SAFE_INTEGER`"*; `A76`'s second part and
    /// `§1.8`'s no-repair prohibition; the bounded one-rule pass on `listen`'s route).
    /// **THE DOMAIN, WITH ITS RANGE:** an integral segment `n` is IN DOMAIN iff `0 <= n <=
    /// Number.MAX_SAFE_INTEGER` (`2^53 - 1`) — **`2^53 - 1` and below are ADMITTED, `2^53` and above are
    /// REFUSED** — and **the out-of-range integral segment answers `AddressMalformed`, row 8's own code,
    /// carried and never minted** (`DD-40`). **`Number.MAX_SAFE_INTEGER` is a DECLARED bound and NOT the
    /// carrier's full range:** it is the largest integral `number` a JS consumer can hold, compare and
    /// transmit EXACTLY, and every `number` at or below it is exact in the carrier's `u64` as well, while
    /// no JS `number` above it can spell its value exactly at all.
    ///
    /// **WHY THE BOUND STANDS HERE AND NOT AT `listen` ALONE:** this predicate is the ONE place the shared
    /// question is asked, and EVERY route asks it here — `write`'s target-segment arm and `delete`'s (each
    /// testing the address's last segment), the walk's `L-1` arm (`§2.2`, which every read, every parent
    /// resolution and `listen` reach), **`listen`'s own per-segment loop**, and the construction's
    /// `listeners[]` classification (`PAR-12`/`§7.1` step 5) — so ONE bound stated here is the bound every
    /// route agrees on, and a second copy at any one verb would give one rule two homes that drift the
    /// moment either moves.
    ///
    /// **AND WHAT IT CLOSES, NAMED WITH ITS TERMS:** a JS `number` above the bound reached this store
    /// through the carrier's `n as u64` — a SATURATING cast in Rust — so `2**64` and `1e30` both arrived as
    /// `u64::MAX` and **two distinct spellings became ONE store address and shared ONE handle**: a silent
    /// fold, and therefore a repair, which `A76` and `§1.8` forbid (`C-12`'s class). **No segment above the
    /// bound is admitted on any route now, so the two spellings answer the SAME refusal instead of one
    /// shared address, and the cast's saturation is no longer observable as an admitted address.**
    /// **EVERY CLASS RULE OF `§1.5` ITEM 1 IS UNMOVED:** a string key — the empty key included — is
    /// admitted as it was, a non-negative integer AT OR BELOW the bound is admitted as it was, the outside
    /// classes (`Negative`, `Fractional`, `Null`, `Undefined`, `Bool`, `Object`, `Array`, `Function`)
    /// answer exactly as they did, and the `VEC`'s contiguous-from-`0` key domain (`§1.3`) is untouched:
    /// this is ONE range clause about the INDEX class and not a second walk.
    pub fn is_in_domain(&self) -> bool {
        match self {
            Segment::Key(_) => true,
            // The declared bound, INCLUSIVE at `2^53 - 1` (`Number.MAX_SAFE_INTEGER`). `Segment::Index`
            // carries a `u64`, so the clause's lower half (`0 <= n`) holds by construction and only the
            // upper half is a test.
            Segment::Index(n) => *n <= MAX_SAFE_INTEGER,
            _ => false,
        }
    }

    /// The variant's own declared rank — the order the two in-domain classes stand in, and the order
    /// every outside class stands after them in.
    ///
    /// **THIS IS THE ORDER THE DECLARED KEYED CONTAINER IS BUILT ON.** A `MAP` is *"keyed by names"*
    /// (`store-model.md §1.6`, `P: §13 · A23`) and the declared keyed container's key is the SEGMENT
    /// itself, because the container's key domain is what decides which keys may stand in it: string keys
    /// from position `0`, index keys from position `1` (`store-model.md §1.3`), and every class outside
    /// the domain is rejected before a key is ever installed (`§1.5` items 2–3, `NO COERCION OCCURS`).
    fn class_rank(&self) -> u8 {
        match self {
            Segment::Key(_) => 0,
            Segment::Index(_) => 1,
            Segment::Negative(_) => 2,
            Segment::Fractional(_) => 3,
            Segment::Bool(_) => 4,
            Segment::Null => 5,
            Segment::Undefined => 6,
            Segment::Object => 7,
            Segment::Array => 8,
            Segment::Function => 9,
        }
    }
}

/// **THE DECODER'S HALF OF `§1.4`'s WIRE IMAGE** — the exact inverse of the `Serialize` impl in
/// `crate::json`, kept beside the type for the same reason that impl is: the mapping IS the taxonomy's.
///
/// **A HAND-WRITTEN `Visitor` RATHER THAN A DERIVE, AND THE REASON IS THE `Object` ARM.** A derive would
/// deserialize `Object` into a `BTreeMap` by way of the same map access this visitor performs, but it would
/// also give the SEPARATE variants `Null`, `Undefined`, `Function`, `Symbol`, `BigInt`, `NonFinite`,
/// `Cyclic` and `NonPlainCollection` an ACCEPTING arm each — so the JSON text `{"a":null}` could decode into
/// a `StoreValue::Null` member where the boot's `DD-29` clause expects the value to be UNREPRESENTABLE and
/// only ever dropped by `is_admitted`. **Writing the visitor keeps the outside classes UNREACHABLE FROM
/// TEXT, which is their whole point: they are write-time triggers, never decoded states.** The single
/// exception is JSON's own `null`, which decodes to `StoreValue::Null` so that `§7.2` item 6's drop and
/// `DD-29` remain reachable exactly as before.
///
/// **THE NUMBER ARM IS `visit_f64` AND THE INTEGRAL SPELLING IS PRESERVED BY THE DECODER'S OWN PARSE:** a
/// text carrying `1` and a text carrying `1.0` both arrive as `Num(1.0)`, which is what `§1.4`'s carrier
/// declares (the exponent form is a SPELLING and not a value, `A59` (c) (b)).
impl<'de> serde::Deserialize<'de> for StoreValue {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        struct ValueVisitor;

        impl<'de> serde::de::Visitor<'de> for ValueVisitor {
            type Value = StoreValue;

            fn expecting(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
                f.write_str("a JSON value the admitted taxonomy can carry")
            }

            fn visit_bool<E: serde::de::Error>(self, v: bool) -> Result<StoreValue, E> {
                Ok(StoreValue::Bool(v))
            }

            fn visit_i64<E: serde::de::Error>(self, v: i64) -> Result<StoreValue, E> {
                Ok(StoreValue::Num(v as f64))
            }

            fn visit_u64<E: serde::de::Error>(self, v: u64) -> Result<StoreValue, E> {
                Ok(StoreValue::Num(v as f64))
            }

            fn visit_f64<E: serde::de::Error>(self, v: f64) -> Result<StoreValue, E> {
                Ok(StoreValue::Num(v))
            }

            fn visit_str<E: serde::de::Error>(self, v: &str) -> Result<StoreValue, E> {
                Ok(StoreValue::Str(v.to_string()))
            }

            fn visit_string<E: serde::de::Error>(self, v: String) -> Result<StoreValue, E> {
                Ok(StoreValue::Str(v))
            }

            /// JSON's own `null` — the ONE outside class a text can carry.
            fn visit_unit<E: serde::de::Error>(self) -> Result<StoreValue, E> {
                Ok(StoreValue::Null)
            }

            /// `serde_json` reaches this for JSON `null` on the default (non-`Option`) route.
            fn visit_none<E: serde::de::Error>(self) -> Result<StoreValue, E> {
                Ok(StoreValue::Null)
            }

            fn visit_some<D: serde::Deserializer<'de>>(
                self,
                deserializer: D,
            ) -> Result<StoreValue, D::Error> {
                StoreValue::deserialize(deserializer)
            }

            fn visit_seq<A: serde::de::SeqAccess<'de>>(
                self,
                mut seq: A,
            ) -> Result<StoreValue, A::Error> {
                let mut items = Vec::with_capacity(seq.size_hint().unwrap_or(0));
                while let Some(v) = seq.next_element()? {
                    items.push(v);
                }
                Ok(StoreValue::Array(items))
            }

            fn visit_map<A: serde::de::MapAccess<'de>>(
                self,
                mut map: A,
            ) -> Result<StoreValue, A::Error> {
                // A `BTreeMap` INSERTS LAST-WINS ON A REPEATED KEY, which is the rule the hand-rolled
                // decoder's `members.insert` carried (`§7.2` item 6 reads whatever content stands at the
                // path, and a duplicate key is not itself an error there).
                let mut members = BTreeMap::new();
                while let Some((k, v)) = map.next_entry::<String, StoreValue>()? {
                    members.insert(k, v);
                }
                Ok(StoreValue::Object(members))
            }
        }

        deserializer.deserialize_any(ValueVisitor)
    }
}

/// `store-model.md §1.6`'s *"keyed by names"* container needs its key to be orderable and hashable: the
/// keyed container this store keeps is keyed by the SEGMENT. The order is CLASS FIRST (a string key before
/// an index key, each outside class after both) and then the variant's own value — the two in-domain
/// classes compare by their own bytes, and the outside classes compare deterministically among themselves
/// so that nothing in the store's own iteration is left to chance. It is TOTAL and CONSISTENT with
/// `PartialEq` on every segment the container's key domain admits (`Key`/`Index`); the outside classes
/// never reach the container at all, because a write whose segment is outside the domain fails before it
/// mints (`§1.5` items 2–3) and the walk's `L-1` arm answers the same way on the read side (`§2.2`).
impl Ord for Segment {
    fn cmp(&self, other: &Segment) -> Ordering {
        match self.class_rank().cmp(&other.class_rank()) {
            Ordering::Equal => {}
            unequal => return unequal,
        }
        match (self, other) {
            (Segment::Key(a), Segment::Key(b)) => a.cmp(b),
            (Segment::Index(a), Segment::Index(b)) => a.cmp(b),
            (Segment::Negative(a), Segment::Negative(b)) => a.cmp(b),
            // A total order over the floats, so the ordering is a law over every input rather than only
            // over the values the key domain admits.
            (Segment::Fractional(a), Segment::Fractional(b)) => a.total_cmp(b),
            (Segment::Bool(a), Segment::Bool(b)) => a.cmp(b),
            // Every remaining pair is two spellings of ONE outside class, or the same class twice: the
            // class rank above already decided every pair that differs by class.
            _ => Ordering::Equal,
        }
    }
}

impl PartialOrd for Segment {
    fn partial_cmp(&self, other: &Segment) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

/// The hash a keyed container buckets its keys by: the declared class rank, then the variant's own value.
/// `Key`/`Index` — the whole of the key domain the container admits — hash by their own bytes, so equal
/// in-domain segments are one bucket and one key.
impl Hash for Segment {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.class_rank().hash(state);
        match self {
            Segment::Key(key) => key.hash(state),
            Segment::Index(index) => index.hash(state),
            Segment::Negative(int) => int.hash(state),
            Segment::Fractional(number) => number.to_bits().hash(state),
            Segment::Bool(flag) => flag.hash(state),
            _ => {}
        }
    }
}

impl Segment {
    /// The segment's own spelling, `§8.2`'s convention: a string segment prints single-quoted; an integer
    /// segment prints bare. An outside class prints its class (never a placeholder).
    pub(crate) fn spelling(&self) -> String {
        match self {
            Segment::Key(k) => format!("'{k}'"),
            Segment::Index(i) => i.to_string(),
            Segment::Negative(i) => format!("the integer {i}"),
            Segment::Fractional(f) => format!("the number {f}"),
            Segment::Null => "a shapeless value".to_string(),
            Segment::Undefined => "an absent value".to_string(),
            Segment::Bool(_) => "a boolean".to_string(),
            Segment::Object => "an object".to_string(),
            Segment::Array => "an array".to_string(),
            Segment::Function => "a function".to_string(),
        }
    }
}
