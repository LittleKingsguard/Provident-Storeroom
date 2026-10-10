//! The admitted value taxonomy (`§1.4`), the address segment domain (`§1.5`) and the JSON image of a
//! `file`-tier state (`§7.2` `M-12`).

use crate::records::Kind;
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
    pub fn is_in_domain(&self) -> bool {
        matches!(self, Segment::Key(_) | Segment::Index(_))
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
