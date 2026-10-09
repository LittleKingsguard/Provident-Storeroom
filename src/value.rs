//! The admitted value taxonomy (`§1.4`), the address segment domain (`§1.5`) and the JSON image of a
//! `file`-tier state (`§7.2` `M-12`).

use crate::records::Kind;
use std::collections::BTreeMap;

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

impl Segment {
    /// `§1.5` item 1: inside the domain iff a string or a non-negative integer.
    pub fn is_in_domain(&self) -> bool {
        matches!(self, Segment::Key(_) | Segment::Index(_))
    }

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
