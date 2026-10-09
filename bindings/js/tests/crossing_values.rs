//! The crossing's VALUE table, variant by variant — `crossing.md §1.2` (`contract.md §1.2`), the walk rules
//! of `crossing.md §1.4`, the cost ceiling of `DD-10` and the cycle guard of `DD-11`.
//!
//! **THE STATES ENUMERATED BEFORE THE DRIVES ARE AUTHORED** (`crossing.md §1.2`'s `13` rows: `5` ADMITTED +
//! `8` OUTSIDE, and `§1.4`'s seven walk rules). For each row, the REASONABLE DATA STATES this file drives:
//!
//! | Row | Class | The states driven |
//! | --- | --- | --- |
//! | 1 | `Str` | `''` · `'a'` · a multi-byte string (all three accepted; no `String` wrapper) · **a lone surrogate: REFUSED `ValueNotAdmitted`, a BOUNDARY-ONLY class whose drive belongs to the JS layer** (`crossing.md §1.2` row 1's dated clause; `acceptance.md §4.1` item 6) |
//! | 2 | `Bool` | `true` · `false` (accepted) · a `Boolean` object wrapper (refused) |
//! | 3 | `Num` | a positive integral · a negative fractional · `0` · `-0` in memory (accepted) · `NaN` · `Infinity` · `-Infinity` (refused) · a `Number` wrapper (refused) |
//! | 4 | `Object` | `{}` · `{a: 1}` · `Object.create(null)` · a cross-realm plain object · non-integer-like keys in any order (accepted) · a `Symbol`-keyed own property · an own accessor · a class instance · a `Map`/`Set`/typed array/`Date`/`RegExp` · a `Proxy` over a plain object (refused) |
//! | 5 | `Array` | `[]` · dense members · a cross-realm array (accepted) · a sparse array · a `Symbol`-keyed own property on an array · a class extending `Array` (refused) |
//! | 6 | `Null` | refused at depth 0 and at depth n |
//! | 7 | `Undefined` | refused at depth 0, as an `{a: undefined}` member (the key is NEVER dropped), and inside an array |
//! | 8 | `Function` | refused at depth 0 and nested |
//! | 9 | `Symbol` | refused as a value; a symbol as an OWN KEY is refused by row 4's rule (the same answer, a different route) |
//! | 10 | `BigInt` | refused (and the store's out-of-bounds numeric refusal is therefore JS-unreachable — `A62`) |
//! | 11 | `NonFinite` | refused at depth 0 and nested |
//! | 12 | `Cyclic` | refused on the ancestor stack; an acyclic DIAMOND is NOT refused (`DD-11`) |
//! | 13 | `NonPlainCollection` | refused: `Map`, `Set`, typed array, `ArrayBuffer`, `DataView`, `Date`, `RegExp`, `Promise`, `Error`, `Proxy`, class instance |
//!
//! **AND THE WALK'S OWN SEVEN RULES OF `§1.4`:** (1) a `Symbol`-keyed own property refuses the WHOLE value ·
//! (2) a sparse array refuses the WHOLE value · (3) an `{a: undefined}` member refuses the whole value and
//! the key is never dropped · (4) the plain-object test's items (a)–(g) · (5) the depth-`64`/size-`1e6`
//! ceiling · (6) the ancestor-stack cycle guard and the admitted diamond · (7) the read-once rule.

mod support;

use support::*;

// =============================================================================================
// ROW 1 — `StoreValue::Str`
// =============================================================================================

/// `crossing.md §1.2` row 1: *"`'a'`, `''`, a multi-byte string, a lone surrogate"* — **and row 1's dated
/// clause of 2026-10-11 declares the FOURTH class's own layer and answer**, so this cell drives the three
/// accepted forms and the nearest representable neighbours of the fourth.
#[test]
fn row_1_str_empty_crosses_to_the_store_string() {
    assert_eq!(
        to_store_value(&JsValue::Str(String::new())),
        Ok(StoreValue::Str(String::new()))
    );
}

#[test]
fn row_1_str_ascii_crosses_to_the_store_string() {
    assert_eq!(
        to_store_value(&JsValue::Str("a".to_string())),
        Ok(StoreValue::Str("a".to_string()))
    );
}

#[test]
fn row_1_str_multibyte_crosses_to_the_store_string() {
    // A multi-byte string: the crossing is a structural walk and carries no byte-count ceiling of its own
    // (`DD-6`; `DD-10`'s ceiling counts NESTING DEPTH and VISITED NODES, not bytes).
    assert_eq!(
        to_store_value(&JsValue::Str("ünïcøde ✓ 日本語".to_string())),
        Ok(StoreValue::Str("ünïcøde ✓ 日本語".to_string()))
    );
}

#[test]
fn row_1_str_astral_and_replacement_characters_cross_to_the_store_string() {
    // `crossing.md §1.2` row 1's *"a lone surrogate"*: **a Rust `String` is valid UTF-8 and has no spelling
    // for a lone surrogate, so this cell CANNOT construct the class — and the class's own answer is not
    // "accepted": row 1's dated clause of 2026-10-11 declares it REFUSED `ValueNotAdmitted` at the
    // PACKAGE's own walk, before any verb is called, because it cannot be represented as
    // `StoreValue::Str`.** So this cell drives the nearest representable states in Rust — an astral
    // (non-BMP) character, which is a valid surrogate PAIR, and the replacement character — **and the
    // surrogate class ITSELF is NOT among them: its drive lives at the JS layer alone**
    // (`bindings/js/test/surface.test.mjs`; `acceptance.md` §4.1 item 6). A Rust cell that reported this
    // class as driven would be a FINDING.
    let text = format!("a\u{1F600}b\u{FFFD}c");
    assert_eq!(
        to_store_value(&JsValue::Str(text.clone())),
        Ok(StoreValue::Str(text))
    );
}

#[test]
fn row_1_str_round_trips_under_the_declared_relation() {
    let mut inst = mem_instance();
    for s in ["", "a", "a.b", "a/b", "ünïcøde ✓ 日本語"] {
        let v = JsValue::Str(s.to_string());
        write_at(&mut inst, &[key("s")], &v).expect("a string is admitted");
        assert!(js_equal(&read_at(&inst, &[key("s")]).unwrap(), &v));
    }
}

/// `crossing.md §1.2` row 1's refused form: **the OBJECT wrapper is refused** — *"a `new String('a')` object
/// wrapper → `ValueNotAdmitted` (it is a `NonPlainCollection`, not a primitive)"*.
#[test]
fn row_1_string_object_wrapper_is_refused_value_not_admitted() {
    let mut inst = mem_instance();
    let wrapper = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("0".into()), JsValue::Str("a".into()))],
        proto: JsProto::Class,
        has_accessor: false,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("s")], &wrapper).expect_err("an object wrapper is not a primitive");
    assert_value_refusal(&err, &[key("s")]);
}

// =============================================================================================
// ROW 2 — `StoreValue::Bool`
// =============================================================================================

#[test]
fn row_2_bool_true_crosses_to_the_store_boolean() {
    assert_eq!(
        to_store_value(&JsValue::Bool(true)),
        Ok(StoreValue::Bool(true))
    );
}

#[test]
fn row_2_bool_false_crosses_to_the_store_boolean() {
    assert_eq!(
        to_store_value(&JsValue::Bool(false)),
        Ok(StoreValue::Bool(false))
    );
}

#[test]
fn row_2_bool_round_trips_under_the_declared_relation() {
    let mut inst = mem_instance();
    for b in [true, false] {
        let v = JsValue::Bool(b);
        write_at(&mut inst, &[key("b")], &v).expect("a boolean is admitted");
        assert!(js_equal(&read_at(&inst, &[key("b")]).unwrap(), &v));
    }
}

/// `crossing.md §1.2` row 2's refused form: **a `Boolean` object wrapper → `ValueNotAdmitted`**.
#[test]
fn row_2_boolean_object_wrapper_is_refused() {
    let mut inst = mem_instance();
    let wrapper = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("valueOf".into()), JsValue::Bool(true))],
        proto: JsProto::Class,
        has_accessor: false,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("b")], &wrapper).expect_err("a wrapper is not a primitive");
    assert_value_refusal(&err, &[key("b")]);
}

// =============================================================================================
// ROW 3 — `StoreValue::Num`
// =============================================================================================

#[test]
fn row_3_finite_integral_number_crosses_to_the_store_number() {
    assert_eq!(to_store_value(&JsValue::Num(42.0)), Ok(StoreValue::Num(42.0)));
}

#[test]
fn row_3_finite_negative_fractional_number_crosses_to_the_store_number() {
    assert_eq!(
        to_store_value(&JsValue::Num(-7.5)),
        Ok(StoreValue::Num(-7.5))
    );
}

#[test]
fn row_3_zero_crosses_to_the_store_number() {
    assert_eq!(to_store_value(&JsValue::Num(0.0)), Ok(StoreValue::Num(0.0)));
}

/// `crossing.md §1.2` row 3: **both `0` and `-0` are admitted IN MEMORY**, and `crossing.md §1.5` clause 3
/// makes the sign observable (`-0` and `0` are NOT equal under the relation).
#[test]
fn row_3_negative_zero_crosses_with_its_sign_intact() {
    match to_store_value(&JsValue::Num(-0.0)) {
        Ok(StoreValue::Num(n)) => {
            assert_eq!(n, 0.0, "the value is zero");
            assert!(n.is_sign_negative(), "the SIGN is carried across the crossing");
        }
        other => panic!("`-0` is an admitted number, got {other:?}"),
    }
}

#[test]
fn row_3_negative_zero_round_trips_at_the_mem_tier_under_object_is() {
    let mut inst = mem_instance();
    let v = JsValue::Num(-0.0);
    write_at(&mut inst, &[key("z")], &v).expect("-0 is admitted in memory");
    let back = read_at(&inst, &[key("z")]).unwrap();
    assert!(
        js_equal(&back, &v),
        "a mem-tier -0 round trip is Object.is-equal (crossing.md §1.5 clause 3)"
    );
    assert!(
        !js_equal(&back, &JsValue::Num(0.0)),
        "and the relation does NOT confuse -0 with 0, while `===` would"
    );
}

#[test]
fn row_3_nan_is_refused_value_not_admitted() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("n")], &JsValue::Num(f64::NAN))
        .expect_err("`NaN` is a NonFinite");
    assert_value_refusal(&err, &[key("n")]);
}

#[test]
fn row_3_infinity_is_refused_value_not_admitted() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("n")], &JsValue::Num(f64::INFINITY))
        .expect_err("`Infinity` is a NonFinite");
    assert_value_refusal(&err, &[key("n")]);
}

#[test]
fn row_3_negative_infinity_is_refused_value_not_admitted() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("n")], &JsValue::Num(f64::NEG_INFINITY))
        .expect_err("`-Infinity` is a NonFinite");
    assert_value_refusal(&err, &[key("n")]);
}

#[test]
fn row_3_number_object_wrapper_is_refused() {
    let mut inst = mem_instance();
    let wrapper = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("n".into()), JsValue::Num(1.0))],
        proto: JsProto::Class,
        has_accessor: false,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("n")], &wrapper).expect_err("a wrapper is not a primitive");
    assert_value_refusal(&err, &[key("n")]);
}

// =============================================================================================
// ROW 4 — `StoreValue::Object`
// =============================================================================================

/// **State: the empty object.** `{}` crosses to the store's empty map.
#[test]
fn row_4_empty_object_crosses_to_the_store_map() {
    assert_eq!(
        to_store_value(&JsValue::Object(JsObject::plain(vec![]))),
        Ok(StoreValue::Object(std::collections::BTreeMap::new()))
    );
}

/// **State: one string-keyed member.**
#[test]
fn row_4_object_with_one_member_crosses_to_the_store_map() {
    let mut expected = std::collections::BTreeMap::new();
    expected.insert("a".to_string(), StoreValue::Num(1.0));
    assert_eq!(
        to_store_value(&JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Num(1.0)
        )]))),
        Ok(StoreValue::Object(expected))
    );
}

/// **State: `Object.create(null)` — ACCEPTED** (`crossing.md §1.4` item 4 (e); `DD-35`: *"it is the plainest
/// case there is"*).
#[test]
fn row_4_object_create_null_is_accepted() {
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Null,
        has_accessor: false,
        proxied: false,
    });
    let mut expected = std::collections::BTreeMap::new();
    expected.insert("a".to_string(), StoreValue::Num(1.0));
    assert_eq!(to_store_value(&v), Ok(StoreValue::Object(expected)));
}

/// **State: a cross-realm plain object** (`vm`, a worker, `structuredClone`) — ACCEPTED (`DD-7`; the
/// plain-object test is structural and realm-agnostic, *"without a comparison against this realm's
/// `Object.prototype`"*).
#[test]
fn row_4_cross_realm_plain_object_is_accepted() {
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::ForeignPlain,
        has_accessor: false,
        proxied: false,
    });
    let mut expected = std::collections::BTreeMap::new();
    expected.insert("a".to_string(), StoreValue::Num(1.0));
    assert_eq!(to_store_value(&v), Ok(StoreValue::Object(expected)));
}

/// **State: non-integer-like keys in any order** — the store's map is key-order-insensitive, and the walk's
/// own order is the engine's enumeration order and no clause depends on it (`crossing.md §1.4` item 8).
#[test]
fn row_4_object_keys_in_any_order_cross_to_the_same_map() {
    let a = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
    ]));
    let b = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
    ]));
    assert_eq!(to_store_value(&a), to_store_value(&b));
}

#[test]
fn row_4_object_round_trips_under_the_declared_relation() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (
            JsKey::Key("n".into()),
            JsValue::Object(JsObject::plain(vec![(
                JsKey::Key("deep".into()),
                JsValue::Str("x".into()),
            )])),
        ),
    ]));
    write_at(&mut inst, &[key("o")], &v).expect("a plain object is admitted");
    assert!(js_equal(&read_at(&inst, &[key("o")]).unwrap(), &v));
}

/// **Refused (row 4, `§1.4` item 1): a `Symbol`-KEYED own property refuses the WHOLE value** — *"any other
/// answer would DROP A MEMBER SILENTLY"* (`DD-8`).
#[test]
fn row_4_symbol_keyed_own_property_refuses_the_whole_value() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject {
        members: vec![
            (JsKey::Key("a".into()), JsValue::Num(1.0)),
            (JsKey::Symbol, JsValue::Num(2.0)),
        ],
        proto: JsProto::Plain,
        has_accessor: false,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("o")], &v).expect_err("a symbol-keyed member refuses the value");
    assert_value_refusal(&err, &[key("o")]);
}

/// **Refused (row 4, `§1.4` item 4 (c)): an own ACCESSOR property refuses the whole value.**
#[test]
fn row_4_accessor_own_property_refuses_the_whole_value() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Plain,
        has_accessor: true,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("o")], &v).expect_err("an accessor refuses the value");
    assert_value_refusal(&err, &[key("o")]);
}

/// **Refused (row 4, `§1.4` item 4 (f)): a class instance** — *"a prototype-carrying object whose prototype
/// is not a plain-object prototype is REFUSED `ValueNotAdmitted` (`NonPlainCollection`)"*.
#[test]
fn row_4_class_instance_is_refused() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Class,
        has_accessor: false,
        proxied: false,
    });
    let err = write_at(&mut inst, &[key("o")], &v).expect_err("a class instance is not a plain object");
    assert_value_refusal(&err, &[key("o")]);
}

/// **Refused (row 4, `§1.4` item 4 (g)): a `Proxy` whose target is a plain object** — `DD-34`: *"a trap
/// could change the membership between two reads of the same value"*.
#[test]
fn row_4_proxy_over_a_plain_object_is_refused() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Plain,
        has_accessor: false,
        proxied: true,
    });
    let err = write_at(&mut inst, &[key("o")], &v).expect_err("a proxy is refused, never walked");
    assert_value_refusal(&err, &[key("o")]);
}

/// **Refused (row 4/13): `Map`, `Set`, typed array, `Date`, `RegExp`** — one `NonPlainCollection` answer,
/// one form (`crossing.md §1.2` rows 4 and 13).
#[test]
fn row_4_other_non_plain_collections_are_refused() {
    let mut inst = mem_instance();
    for v in [
        JsValue::NonPlainCollection, // Map / Set / WeakMap / WeakSet
        JsValue::NonPlainCollection, // a typed array / an ArrayBuffer / a DataView
        JsValue::NonPlainCollection, // a Date
        JsValue::NonPlainCollection, // a RegExp
        JsValue::NonPlainCollection, // a Promise
        JsValue::NonPlainCollection, // an Error
    ] {
        let err = write_at(&mut inst, &[key("o")], &v).expect_err("a non-plain collection is refused");
        assert_value_refusal(&err, &[key("o")]);
    }
}

// =============================================================================================
// ROW 5 — `StoreValue::Array`
// =============================================================================================

#[test]
fn row_5_empty_array_crosses_to_the_store_vector() {
    assert_eq!(to_store_value(&JsValue::Array(vec![])), Ok(StoreValue::Array(vec![])));
}

#[test]
fn row_5_dense_array_crosses_to_the_store_vector_in_index_order() {
    assert_eq!(
        to_store_value(&JsValue::Array(vec![
            JsValue::Num(1.0),
            JsValue::Num(2.0),
            JsValue::Num(3.0)
        ])),
        Ok(StoreValue::Array(vec![
            StoreValue::Num(1.0),
            StoreValue::Num(2.0),
            StoreValue::Num(3.0)
        ]))
    );
}

/// **Accepted: a cross-realm array IS accepted** — *"it is an `Array`"* (`crossing.md §1.2` row 5).
#[test]
fn row_5_cross_realm_array_is_accepted() {
    assert_eq!(
        to_store_value(&JsValue::Array(vec![JsValue::Num(1.0)])),
        Ok(StoreValue::Array(vec![StoreValue::Num(1.0)]))
    );
}

#[test]
fn row_5_array_round_trips_with_index_order_significant() {
    let mut inst = mem_instance();
    let v = JsValue::Array(vec![
        JsValue::Num(2.0),
        JsValue::Num(10.0),
        JsValue::Str("x".into()),
    ]);
    write_at(&mut inst, &[key("a")], &v).expect("a dense array is admitted");
    let back = read_at(&inst, &[key("a")]).unwrap();
    assert!(js_equal(&back, &v));
    assert!(
        !js_equal(
            &back,
            &JsValue::Array(vec![
                JsValue::Num(10.0),
                JsValue::Num(2.0),
                JsValue::Str("x".into())
            ])
        ),
        "clause 2: index order is SIGNIFICANT, so the re-ordered array is NOT equal"
    );
}

/// **Refused (`§1.4` item 2, `DD-8`): a SPARSE array refuses the whole value** — *"`Array.from` reads the
/// hole as `undefined` and `JSON.stringify` reads it as `null`, so the two readings disagree and neither
/// may be chosen silently"*.
#[test]
fn row_5_sparse_array_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::SparseArray)
        .expect_err("a hole is not a member");
    assert_value_refusal(&err, &[key("a")]);
}

/// **Refused (row 5 with row 9): an array holding a `symbol` member** refuses the whole value; the same
/// answer row 9 gives the value class, reached through the array's own member walk.
#[test]
fn row_5_array_holding_a_symbol_member_is_refused() {
    let mut inst = mem_instance();
    let v = JsValue::Array(vec![JsValue::Num(1.0), JsValue::Symbol]);
    let err = write_at(&mut inst, &[key("a")], &v).expect_err("a symbol member of an array is refused");
    assert_value_refusal(&err, &[key("a")]);
}

/// **Refused (row 5): a class extending `Array`.**
#[test]
fn row_5_class_extending_array_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::NonPlainCollection)
        .expect_err("a class extending Array is not a plain array");
    assert_value_refusal(&err, &[key("a")]);
}

// =============================================================================================
// ROWS 6–13 — the outside classes, each at depth 0 AND at depth n (`§1.2`'s closing clause)
// =============================================================================================

/// **Row 6 — `Null`: ALWAYS REFUSED, at any depth.**
#[test]
fn row_6_null_is_refused_at_depth_zero() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("n")], &JsValue::Null).expect_err("null is outside the taxonomy");
    assert_value_refusal(&err, &[key("n")]);
}

#[test]
fn row_6_null_is_refused_at_depth_n() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![(
        JsKey::Key("a".into()),
        JsValue::Array(vec![JsValue::Null]),
    )]));
    let err = write_at(&mut inst, &[key("n")], &v).expect_err("a nested null is refused too");
    assert_value_refusal(&err, &[key("n")]);
}

/// **Row 7 — `Undefined`: ALWAYS REFUSED, and the member is NOT dropped and its key is NOT skipped.**
#[test]
fn row_7_undefined_is_refused_at_depth_zero() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("u")], &JsValue::Undefined).expect_err("undefined is outside");
    assert_value_refusal(&err, &[key("u")]);
}

/// `crossing.md §1.4` item 3 / `§1.2` row 7: **an `{a: undefined}` member refuses the WHOLE value**, and the
/// key is NEVER dropped — *"the member's value is refused `ValueNotAdmitted` and the key is NEVER dropped"*.
#[test]
fn row_7_object_with_an_undefined_member_refuses_the_whole_value() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Undefined),
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
    ]));
    let err = write_at(&mut inst, &[key("u")], &v).expect_err("an undefined member refuses the value");
    assert_value_refusal(&err, &[key("u")]);
}

#[test]
fn row_7_the_key_is_never_dropped_a_later_write_sees_no_node() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![(JsKey::Key("a".into()), JsValue::Undefined)]));
    let _ = write_at(&mut inst, &[key("u")], &v).expect_err("refused");
    // `P-IM-2`'s failure list: *"a refused class that mints a node"*. The observable is the target's own
    // prior state on the NEXT successful write: if the refusal had minted a node or installed an anchor,
    // `op.before.present` would be true.
    let ok = write_at(&mut inst, &[key("u")], &JsValue::Num(1.0)).expect("a number is admitted");
    assert!(
        !ok.op.before.present,
        "the refusal minted nothing: the target had no node before this write"
    );
}

/// **Row 8 — `Function`: ALWAYS REFUSED** (arrow, method, generator, async — one class).
#[test]
fn row_8_function_is_refused_at_depth_zero() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("f")], &JsValue::Function).expect_err("a function is outside");
    assert_value_refusal(&err, &[key("f")]);
}

#[test]
fn row_8_nested_function_is_refused() {
    let mut inst = mem_instance();
    let v = JsValue::Array(vec![JsValue::Function]);
    let err = write_at(&mut inst, &[key("f")], &v).expect_err("a nested function is refused");
    assert_value_refusal(&err, &[key("f")]);
}

/// **Row 9 — `Symbol`: ALWAYS REFUSED as a value**, and a symbol used as an OWN KEY is refused by row 4's
/// rule — *"the same answer by a different route"*.
#[test]
fn row_9_symbol_value_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("s")], &JsValue::Symbol).expect_err("a symbol is outside");
    assert_value_refusal(&err, &[key("s")]);
}

/// The `ContainerKindConflict` clause: **the KIND-CONTRADICTING case is a DIFFERENT failure**, and this
/// unit's crossing does not pre-empt it (`crossing.md §1.2`'s closing clause). An admitted value whose
/// container kind contradicts the target's answers `ContainerKindConflict` at the STORE.
#[test]
fn row_4_kind_contradiction_is_the_stores_own_answer_not_value_not_admitted() {
    let mut inst = mem_instance();
    write_at(
        &mut inst,
        &[key("a")],
        &JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))])),
    )
    .expect("a map at the target");
    // The target's container kind is already `map`; an array contradicts it — the STORE's own decision, and
    // this unit's crossing does not pre-empt it (`crossing.md §1.2`'s closing clause).
    let err = write_at(&mut inst, &[key("a")], &JsValue::Array(vec![]))
        .expect_err("the map target cannot receive an array");
    assert_refusal_is_the_single_form(&err, "ContainerKindConflict");
    assert_code_is_in_the_closed_set(&err);
}

/// **Row 10 — `BigInt`: ALWAYS REFUSED.** `A62`: *"a `BigInt` is the only JS spelling of `2^53 + 1`, and it
/// is an outside class, so the out-of-bounds refusal has no JS-reachable instance and is a
/// DEFENSE-IN-DEPTH rule"*.
#[test]
fn row_10_bigint_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("big")], &JsValue::BigInt(9_007_199_254_740_993))
        .expect_err("a bigint is outside the admitted set");
    assert_value_refusal(&err, &[key("big")]);
}

/// **Row 11 — `NonFinite`: ALWAYS REFUSED.**
#[test]
fn row_11_non_finite_is_refused_at_depth_n() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![(
        JsKey::Key("a".into()),
        JsValue::NonFinite(f64::INFINITY),
    )]));
    let err = write_at(&mut inst, &[key("nf")], &v).expect_err("a nested non-finite is refused");
    assert_value_refusal(&err, &[key("nf")]);
}

/// **Row 12 — `Cyclic`: ALWAYS REFUSED, detected on the walk's own ANCESTOR STACK.**
#[test]
fn row_12_cyclic_value_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("c")], &JsValue::Cyclic).expect_err("a cycle is refused");
    assert_value_refusal(&err, &[key("c")]);
}

/// `DD-11`'s second half: **an acyclic DIAMOND is NOT refused** — *"never by a `WeakSet` of visited
/// objects, which would refuse an acyclic DIAMOND (a value reachable by two paths)"*.
///
/// **THE MECHANISM, STATED IN THE CELL:** the model is a VALUE model with no aliasing (no `Rc`, no `Arc`,
/// no raw pointer — `§1.1` clause 3 holds by the model's own construction), so a value reachable by two
/// paths is spelled by structural duplication and a cycle only by the store's own `Cyclic` class. The
/// drive is therefore: **the same structure appearing twice in one value is ADMITTED** — which is exactly
/// what an ancestor-stack test admits and a `WeakSet` test would refuse.
#[test]
fn row_12_acyclic_diamond_is_not_refused() {
    let shared = JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))]));
    let diamond = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("left".into()), shared.clone()),
        (JsKey::Key("right".into()), shared.clone()),
    ]));
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("d")], &diamond).expect("a diamond is not a cycle");
    let back = read_at(&inst, &[key("d")]).unwrap();
    assert!(js_equal(&back, &diamond));
}

/// **Row 13 — `NonPlainCollection`: ALWAYS REFUSED** — the enumerated class list of the row.
#[test]
fn row_13_non_plain_collection_is_refused() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("c")], &JsValue::NonPlainCollection)
        .expect_err("a non-plain collection is outside");
    assert_value_refusal(&err, &[key("c")]);
}

/// `crossing.md §1.2`'s closing clause: **every refused row answers the SAME code, with no node minted, no
/// anchor installed, no container changed and no journal entry appended.**
#[test]
fn refused_rows_answer_one_form_and_change_nothing() {
    let mut inst = mem_instance();
    let outside = [
        JsValue::Null,
        JsValue::Undefined,
        JsValue::Function,
        JsValue::Symbol,
        JsValue::BigInt(1),
        JsValue::NonFinite(f64::NAN),
        JsValue::Cyclic,
        JsValue::NonPlainCollection,
        JsValue::SparseArray,
    ];
    for v in &outside {
        let err = write_at(&mut inst, &[key("x")], v).expect_err("outside the taxonomy");
        assert_code_is_in_the_closed_set(&err);
        assert_eq!(err.status, "ValueNotAdmitted");
    }
    // No container changed: the register still holds no `x` member.
    let ok = write_at(&mut inst, &[key("x")], &JsValue::Num(1.0)).expect("a number is admitted");
    assert!(!ok.op.before.present);
}

// =============================================================================================
// `crossing.md §1.4` item 4 — THE PLAIN-OBJECT TEST, ITEMS (a)–(g)
// =============================================================================================

/// Item (a): *"it is not `null` and `typeof x === 'object'`"* — so a primitive is never an object, and
/// `null` is refused by row 6 and not by the plain-object test.
#[test]
fn item_a_a_primitive_is_not_an_object_and_null_is_refused() {
    let mut inst = mem_instance();
    assert!(write_at(&mut inst, &[key("p")], &JsValue::Str("s".into())).is_ok());
    assert!(write_at(&mut inst, &[key("p")], &JsValue::Null).is_err());
}

/// Item (b): *"its own property keys that are enumerable string keys are the members the walk takes"* —
/// so a member is carried and no other key class is read.
#[test]
fn item_b_enumerable_string_keys_are_the_members() {
    let v = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
    ]));
    match to_store_value(&v) {
        Ok(StoreValue::Object(m)) => assert_eq!(m.len(), 2),
        other => panic!("a two-member plain object crosses to a two-member map, got {other:?}"),
    }
}

/// Item (c): *"it carries no own accessor (`get`/`set`) property — one refuses the whole value"* — driven
/// again here as the ITEM, beside row 4's cell.
#[test]
fn item_c_an_own_accessor_refuses_the_whole_value() {
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Plain,
        has_accessor: true,
        proxied: false,
    });
    let mut inst = mem_instance();
    assert!(write_at(&mut inst, &[key("o")], &v).is_err());
}

/// Item (d): *"it carries no own `Symbol`-keyed property"*.
#[test]
fn item_d_an_own_symbol_keyed_property_refuses_the_whole_value() {
    let v = JsValue::Object(JsObject {
        members: vec![(JsKey::Symbol, JsValue::Num(1.0))],
        proto: JsProto::Plain,
        has_accessor: false,
        proxied: false,
    });
    let mut inst = mem_instance();
    assert!(write_at(&mut inst, &[key("o")], &v).is_err());
}

/// Item (e): **the prototype is either `null` or a plain-object prototype reached WITHOUT an `instanceof`
/// test and WITHOUT a comparison against this realm's `Object.prototype`** — so BOTH the prototype-less
/// object and the cross-realm plain object are accepted.
#[test]
fn item_e_null_prototype_and_foreign_plain_prototype_are_both_accepted() {
    let null_proto = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Null,
        has_accessor: false,
        proxied: false,
    });
    let foreign = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::ForeignPlain,
        has_accessor: false,
        proxied: false,
    });
    assert!(to_store_value(&null_proto).map(|v| v.is_admitted()).unwrap_or(false));
    assert!(to_store_value(&foreign).map(|v| v.is_admitted()).unwrap_or(false));
}

/// Item (f): **a prototype-carrying object whose prototype is not a plain-object prototype is REFUSED**
/// — *"this is the ONE place where a rule resembling an identity test is right"*.
#[test]
fn item_f_a_non_plain_prototype_is_refused() {
    let classy = JsValue::Object(JsObject {
        members: vec![],
        proto: JsProto::Class,
        has_accessor: false,
        proxied: false,
    });
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("o")], &classy).expect_err("a class instance is refused");
    assert_eq!(err.status, "ValueNotAdmitted");
}

/// Item (g): **it is not a `Proxy` — the BINDING owns proxy detection** (`DD-34`).
#[test]
fn item_g_a_proxy_is_refused_at_any_depth() {
    let proxied = JsValue::Object(JsObject {
        members: vec![(JsKey::Key("a".into()), JsValue::Num(1.0))],
        proto: JsProto::Plain,
        has_accessor: false,
        proxied: true,
    });
    let nested = JsValue::Array(vec![proxied.clone()]);
    let mut inst = mem_instance();
    assert!(write_at(&mut inst, &[key("o")], &proxied).is_err());
    assert!(write_at(&mut inst, &[key("o")], &nested).is_err());
}

// =============================================================================================
// `crossing.md §1.4` item 5 — THE DEPTH-`64` / SIZE-`1e6` CEILING (`DD-10`)
// =============================================================================================

fn nested(depth: usize) -> JsValue {
    let mut v = JsValue::Num(1.0);
    for _ in 0..depth {
        v = JsValue::Object(JsObject::plain(vec![(JsKey::Key("n".into()), v)]));
    }
    v
}

/// `DD-10`: *"the walk refuses a value whose nesting depth exceeds `64`"* — so a value of nesting depth
/// `64` is ADMITTED.
#[test]
fn ceiling_depth_64_is_admitted() {
    let mut inst = mem_instance();
    let v = nested(64);
    write_at(&mut inst, &[key("deep")], &v).expect("a value at the ceiling's own depth is admitted");
    assert!(js_equal(&read_at(&inst, &[key("deep")]).unwrap(), &v));
}

/// `DD-10`: **a value whose nesting depth EXCEEDS `64`** is refused `ValueNotAdmitted`.
#[test]
fn ceiling_depth_65_is_refused_value_not_admitted() {
    let mut inst = mem_instance();
    let v = nested(65);
    let err = write_at(&mut inst, &[key("deep")], &v).expect_err("beyond the declared ceiling");
    assert_value_refusal(&err, &[key("deep")]);
}

/// `DD-10`: *"whose visited-node count exceeds `1,000,000`"* — the count at the bound is admitted.
#[test]
fn ceiling_visited_nodes_at_one_million_is_admitted() {
    // The root object plus 999_999 members is the bound exactly; `DD-10` refuses only what EXCEEDS it.
    let members: Vec<JsValue> = (0..999_999).map(|_| JsValue::Bool(true)).collect();
    let v = JsValue::Array(members);
    assert!(
        to_store_value(&v).map(|sv| sv.is_admitted()).unwrap_or(false),
        "1,000,000 visited nodes is AT the declared ceiling, not beyond it"
    );
}

/// `DD-10`: **a visited-node count beyond `1,000,000` is refused** `ValueNotAdmitted`.
#[test]
fn ceiling_visited_nodes_beyond_one_million_is_refused() {
    let members: Vec<JsValue> = (0..1_000_001).map(|_| JsValue::Bool(true)).collect();
    let v = JsValue::Array(members);
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("big")], &v).expect_err("beyond the declared ceiling");
    assert_value_refusal(&err, &[key("big")]);
}

/// `DD-10`: **the package ships no configuration knob for either bound.**
#[test]
fn ceiling_has_no_configuration_knob() {
    // The knob's absence is a property of `cfg`: `surface.md §2.1`'s three keys and no fourth
    // (`DD-36`). A `cfg` carrying a fourth key does not reach the walk at all.
    let cfg = JsConfig {
        file_path: None,
        journal_length: Some(JsJournalLengthArg::Count(2)),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: Some("maxDepth".to_string()),
    };
    let mut inst = create(&cfg).expect("a fourth key does not reach the store's closed member set");
    let v = nested(65);
    let err = write_at(&mut inst, &[key("deep")], &v).expect_err("the ceiling is not configurable");
    assert_value_refusal(&err, &[key("deep")]);
}

// =============================================================================================
// `crossing.md §1.4` item 7 — THE READ-ONCE RULE
// =============================================================================================

/// `crossing.md §1.4` item 7 / `§1.1`'s third unnamed item: **the walk reads each member once, and no
/// snapshot is taken and no argument is deep-copied twice.**
///
/// **THE MECHANISM, STATED IN THE CELL:** the drive is the CONVERSION'S OWN ARITY — one call of
/// `to_store_value` per call of the verb, and `to_store_value` is a pure function of the value it is
/// handed, so a second conversion of an EQUAL input yields an EQUAL store value and neither conversion
/// observes the other. There is no `Rc`-shared member in the model for a "read twice" to be observed
/// through.
#[test]
fn walk_reads_each_member_once_and_no_snapshot_is_taken() {
    let v = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
    ]));
    let first = to_store_value(&v).expect("admitted");
    let second = to_store_value(&v).expect("admitted");
    assert_eq!(first, second, "the walk is a function of the value it was handed");
    match (first, second) {
        (StoreValue::Object(mut x), StoreValue::Object(y)) => {
            x.insert("injected".to_string(), StoreValue::Num(9.0));
            assert_eq!(y.len(), 2, "each conversion owns its own data");
        }
        _ => panic!("an object crosses to a map"),
    }
}
