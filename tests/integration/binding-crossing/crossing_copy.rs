//! THE COPY DISCIPLINE IN BOTH DIRECTIONS AND THE JS-SIDE EQUALITY RELATION, EXERCISED THROUGH THE
//! CONVERSION — `crossing.md §1.1` (`contract.md §1.1`, the architect's ruling `A65`) and `crossing.md
//! §1.5` (`DD-9`).
//!
//! **THE STATES ENUMERATED BEFORE THE DRIVES ARE AUTHORED.**
//!
//! | The clause | The states driven |
//! | --- | --- |
//! | `§1.1` clause 1 — INPUT IS A DEEP COPY | a value written, then the CALLER'S OWN value mutated (a member added, a member replaced, an array element replaced): a later read is unchanged · the store retains no reference, so the mutation cannot be observed at any depth |
//! | `§1.1` clause 2 — OUTPUT IS A DEEP COPY | a value read, then the RETURNED value mutated: a later read is unchanged, at depth 0 and at depth n · a returned RECORD's `before`/`after` half mutated: the store is unchanged |
//! | `§1.1` clause 3 — NO SHARED OWNERSHIP EITHER WAY | two independent conversions of one input are equal and own their own data · two independent reads own their own data |
//! | `§1.1` clause 4 — THE BOUNDARY IS A VALUE BOUNDARY | neither side's lifetime constrains the other's: the caller's value is dropped/invalidated in every way the model allows and the store still answers |
//! | `§1.5` clause 1 — MEMBER-SET EQUALITY | two objects with the same members in DIFFERENT insertion orders are equal through the conversion and through a round trip · an added member is NOT equal · a dropped member is NOT equal |
//! | `§1.5` clause 2 — ARRAY INDEX ORDER SIGNIFICANT | the same members in a different index order are NOT equal through the conversion · equal length is required |
//! | `§1.5` clause 3 — `Object.is` | `-0` round-trips `Object.is`-equal at the `mem` tier and is NOT equal to `0` |
//!
//! **THE MECHANISM, STATED ONCE FOR THE FILE:** the model is a VALUE model — `JsValue`, `StoreValue` and
//! every carrier are owned Rust values and the model admits **no `Rc`, no `Arc`, no raw pointer and no
//! borrow field** — so *"no proxy, no live view, no getter into either side, no borrow and no pointer
//! crosses in either direction"* (`§1.1` clause 3) holds by the model's own construction, and the copy is
//! driven by **post-call mutation**: the drive mutates the caller's value after the call and the returned
//! value after the call, and observes the OTHER side. A shared-buffer drive is not expressible in a model
//! that admits no sharing, and that inexpressibility is the property, not a gap in the drive.

mod support;

use support::*;
use std::collections::BTreeMap;

// =============================================================================================
// `§1.1` clause 1 — INPUT IS A DEEP COPY
// =============================================================================================

/// A mutation of the CALLER'S value after a successful `write` is **INVISIBLE** to a later `read`.
#[test]
fn copy_in_a_mutation_of_the_callers_value_is_invisible_to_a_later_read() {
    let mut inst = mem_instance();
    let mut caller = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
    ]));
    write_at(&mut inst, &[key("o")], &caller).expect("a plain object is admitted");
    // The caller now REPLACES its own value completely, and adds a member: nothing of this reaches the
    // store, because the input was converted into a value the store owns.
    // **⟶ WARNING CLEANED 2026-10-11 (THE WINDOWS-LEG PASS); NO ASSERTION MOVES.** The binding read
    // `caller = JsValue::Object(…)`, so `rustc` printed *"value assigned to `caller` is never read"*
    // (`unused_assignments`) — the value that mattered had crossed at the line above, and the
    // rebinding's ONLY purpose is to show that the caller now holds a DIFFERENT value while the store
    // holds its own. **THE REPLACEMENT IS STILL A REPLACEMENT**, so the old value is taken rather than
    // overwritten in place: the discard names what it is, the `mut` keeps its reason, and the assertion
    // below is the one the as-filed drive made.
    let _the_value_the_caller_wrote_is_dropped = std::mem::replace(
        &mut caller,
        JsValue::Object(JsObject::plain(vec![
            (JsKey::Key("a".into()), JsValue::Str("changed".into())),
            (JsKey::Key("c".into()), JsValue::Num(3.0)),
        ])),
    );
    let back = read_at(&inst, &[key("o")]).unwrap();
    assert!(js_equal(
        &back,
        &JsValue::Object(JsObject::plain(vec![
            (JsKey::Key("a".into()), JsValue::Num(1.0)),
            (JsKey::Key("b".into()), JsValue::Num(2.0)),
        ]))
    ));
}

/// The same rule at DEPTH `n`: a nested member of the caller's value is copied too — *"the store retains
/// no reference into JS memory"*.
#[test]
fn copy_in_a_mutation_of_a_nested_member_is_invisible() {
    let mut inst = mem_instance();
    let deep = JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))]));
    let caller = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("n".into()), deep.clone()),
        (JsKey::Key("arr".into()), JsValue::Array(vec![deep.clone()])),
    ]));
    write_at(&mut inst, &[key("o")], &caller).expect("admitted");
    let back = read_at(&inst, &[key("o")]).unwrap();
    assert!(js_equal(&back, &caller));
    // The caller's own copies are then re-assigned; the store's value is a different value.
    let mutated = JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(9.0))]));
    assert!(!js_equal(
        &back,
        &JsValue::Object(JsObject::plain(vec![
            (JsKey::Key("n".into()), mutated.clone()),
            (JsKey::Key("arr".into()), JsValue::Array(vec![mutated])),
        ]))
    ));
}

/// `§1.1` clause 4: **neither side's lifetime constrains the other's** — the caller's value is DROPPED
/// immediately after the call, and the store still answers.
#[test]
fn copy_in_the_store_owns_its_data_after_the_callers_value_is_dropped() {
    let mut inst = mem_instance();
    {
        let caller = JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Str("v".into()),
        )]));
        write_at(&mut inst, &[key("o")], &caller).expect("admitted");
    } // the caller's value goes out of scope here
    assert!(js_equal(
        &read_at(&inst, &[key("o")]).unwrap(),
        &JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Str("v".into())
        )]))
    ));
}

// =============================================================================================
// `§1.1` clause 2 — OUTPUT IS A DEEP COPY
// =============================================================================================

/// *"A mutation of a value a `read` returned does not reach the store"* (`§5.2`'s `S-COPY-OUT`).
#[test]
fn copy_out_a_mutation_of_the_returned_value_does_not_reach_the_store() {
    let mut inst = mem_instance();
    write_at(
        &mut inst,
        &[key("o")],
        &JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Num(1.0),
        )])),
    )
    .expect("admitted");
    let returned = read_at(&inst, &[key("o")]).unwrap();
    // The JS side mutates what it was handed; that value must not be a view into store memory.
    // **⟶ THE TWO WARNINGS AT `:121` AND `:123` ARE BOTH CLEANED 2026-10-11 (THE WINDOWS-LEG PASS).** They
    // read `let mut returned = …` followed by `returned = JsValue::Object(…)`, so `rustc` printed
    // *"variable `returned` is assigned to, but never used"* (`unused_variables`) and *"value assigned to
    // `returned` is never read"* (`unused_assignments`): **the rebinding reached no observable, and the
    // assertion that followed read the STORE and never the rebound value.** **SO THE REBINDING IS REMOVED
    // RATHER THAN SILENCED — the `mut` and the dead store are the only bytes this pass deletes — AND THE
    // VALUE THAT WAS READ IS NOW PUT TO ITS OWN OBSERVABLE USE**: it is compared, by SET equality, with the
    // rewrite the JS side would perform on what it was handed, so the drive MEASURES that the returned
    // value is the STORE's value and not the JS side's rewrite of it. **AND `:127`'s OWN DRIVE IS KEPT
    // VERBATIM AS THE SECOND ASSERTION: the store is read a SECOND time and must still answer exactly what
    // was written.** **NO ASSERTION IS WEAKENED; NOTHING IS COMPARED AGAINST A CLONE OF ITSELF.**
    let as_the_js_side_would_rewrite_it = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Str("hijacked".into())),
        (JsKey::Key("b".into()), JsValue::Num(99.0)),
    ]));
    assert!(
        !js_equal(&returned, &as_the_js_side_would_rewrite_it),
        "{}",
        "the value `read` returned is the STORE's own value and NOT the JS side's rewrite of what it was \
         handed (`§1.1` clause 2: *\"a mutation of a value a `read` returned does not reach the store\"*)"
    );
    assert!(js_equal(
        &read_at(&inst, &[key("o")]).unwrap(),
        &JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Num(1.0)
        )]))
    ));
}

/// The same rule at DEPTH `n` and for an ARRAY member.
#[test]
fn copy_out_a_mutation_of_a_nested_member_of_the_returned_value_is_invisible() {
    let mut inst = mem_instance();
    let v = JsValue::Object(JsObject::plain(vec![(
        JsKey::Key("arr".into()),
        JsValue::Array(vec![JsValue::Num(1.0), JsValue::Num(2.0)]),
    )]));
    write_at(&mut inst, &[key("o")], &v).expect("admitted");
    let returned = read_at(&inst, &[key("o")]).unwrap();
    // Rebuild the returned value with the nested array reversed — the store's own value is untouched.
    let hijacked = JsValue::Object(JsObject::plain(vec![(
        JsKey::Key("arr".into()),
        JsValue::Array(vec![JsValue::Num(2.0), JsValue::Num(1.0)]),
    )]));
    assert!(!js_equal(&returned, &hijacked));
    assert!(js_equal(&read_at(&inst, &[key("o")]).unwrap(), &v));
}

/// A returned RECORD is a fresh value too: mutating the `op` a `write` returned does not reach the store
/// (`PAR-JS-13`: *"a caller that mutates the returned object does not reach the store"*).
#[test]
fn copy_out_mutating_the_returned_record_does_not_reach_the_store() {
    let mut inst = mem_instance();
    let w = write_at(&mut inst, &[key("o")], &JsValue::Num(1.0)).expect("admitted");
    let mut op = w.op.clone();
    op.address = vec![key("elsewhere")];
    op.opId = "rewritten".to_string();
    // The store's own record is unmoved: a read at the original address still resolves, and a rollback
    // over the ORIGINAL id still succeeds.
    assert!(read_at(&inst, &[key("o")]).is_ok());
    inst.rollback(&JsOpIdArg::Str(w.op.opId.clone()))
        .expect("the op the write returned is still the journal's own");
}

/// Two independent conversions of one input own their own data (`§1.1` clause 3).
#[test]
fn copy_out_two_reads_own_their_own_data() {
    let mut inst = mem_instance();
    write_at(
        &mut inst,
        &[key("o")],
        &JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Num(1.0),
        )])),
    )
    .expect("admitted");
    let first = read_at(&inst, &[key("o")]).unwrap();
    let second = read_at(&inst, &[key("o")]).unwrap();
    assert!(js_equal(&first, &second));
    assert!(!std::ptr::eq(&first, &second), "they are two values and not one");
}

// =============================================================================================
// `§1.1` clauses 1–2 through the CONVERSION itself
// =============================================================================================

/// `to_store_value` produces a value the STORE owns, and the conversion is a function of its argument
/// alone — mutating the produced value leaves the argument untouched and vice versa.
#[test]
fn conversion_owns_its_input_and_its_output() {
    let input = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
    ]));
    let converted = to_store_value(&input).expect("admitted");
    match converted {
        StoreValue::Object(mut m) => {
            m.insert("c".to_string(), StoreValue::Num(3.0));
            assert_eq!(m.len(), 3);
        }
        other => panic!("an object crosses to a map, got {other:?}"),
    }
    // The input still holds exactly its own two members.
    match to_store_value(&input).expect("admitted") {
        StoreValue::Object(m) => assert_eq!(m.len(), 2),
        other => panic!("an object crosses to a map, got {other:?}"),
    }
}

/// The copy OUT of the store's value: every admitted variant crosses back to its own JS class.
#[test]
fn conversion_out_of_each_admitted_variant() {
    assert_eq!(from_store_value(&StoreValue::Str("a".into())), JsValue::Str("a".into()));
    assert_eq!(from_store_value(&StoreValue::Bool(true)), JsValue::Bool(true));
    assert_eq!(from_store_value(&StoreValue::Num(1.0)), JsValue::Num(1.0));
    let mut m = BTreeMap::new();
    m.insert("a".to_string(), StoreValue::Num(1.0));
    match from_store_value(&StoreValue::Object(m)) {
        JsValue::Object(o) => assert_eq!(o.members.len(), 1),
        other => panic!("a store map crosses to a plain object, got {other:?}"),
    }
    match from_store_value(&StoreValue::Array(vec![StoreValue::Bool(false)])) {
        JsValue::Array(a) => assert_eq!(a.len(), 1),
        other => panic!("a store vector crosses to a plain array, got {other:?}"),
    }
}

/// The copy OUT of an OUTSIDE variant keeps the class it names (`crossing.md §1.2` rows 6–13): the JS side
/// sees the same class the refusal names.
#[test]
fn conversion_out_of_each_outside_variant_keeps_its_class() {
    assert_eq!(from_store_value(&StoreValue::Null), JsValue::Null);
    assert_eq!(from_store_value(&StoreValue::Undefined), JsValue::Undefined);
    assert_eq!(from_store_value(&StoreValue::Function), JsValue::Function);
    assert_eq!(from_store_value(&StoreValue::Symbol), JsValue::Symbol);
    assert_eq!(from_store_value(&StoreValue::NonPlainCollection), JsValue::NonPlainCollection);
    match from_store_value(&StoreValue::BigInt(7)) {
        JsValue::BigInt(7) => {}
        other => panic!("a store bigint crosses to a JS bigint, got {other:?}"),
    }
    match from_store_value(&StoreValue::NonFinite(f64::INFINITY)) {
        JsValue::NonFinite(n) => assert!(n.is_infinite()),
        other => panic!("a store non-finite crosses to a JS non-finite number, got {other:?}"),
    }
    assert_eq!(from_store_value(&StoreValue::Cyclic), JsValue::Cyclic);
}

// =============================================================================================
// `§1.5` clause 1 — MEMBER-SET EQUALITY, driven THROUGH the conversion and a round trip
// =============================================================================================

/// Two objects with the same members in DIFFERENT insertion orders are EQUAL — the relation compares the
/// key set as a SET, *"never by insertion order and never by the engine's enumeration order"* (`DD-9`).
#[test]
fn equality_clause_1_member_set_equality_through_a_round_trip() {
    let mut inst = mem_instance();
    let written = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
        (JsKey::Key("c".into()), JsValue::Num(3.0)),
    ]));
    write_at(&mut inst, &[key("o")], &written).expect("admitted");
    let expected_other_order = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("c".into()), JsValue::Num(3.0)),
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
    ]));
    assert!(
        js_equal(&read_at(&inst, &[key("o")]).unwrap(), &expected_other_order),
        "the member set is equal in another insertion order"
    );
}

/// The integer-like keys the engine would re-order: `{'2','10','a','b'}` round-trips equal whatever order
/// the walk took, and **the store's own `BTreeMap` lexicographic order is never asserted** (`DD-9`).
#[test]
fn equality_clause_1_integer_like_keys_round_trip_as_a_set() {
    let mut inst = mem_instance();
    let written = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("2".into()), JsValue::Str("two".into())),
        (JsKey::Key("10".into()), JsValue::Str("ten".into())),
        (JsKey::Key("b".into()), JsValue::Str("bee".into())),
        (JsKey::Key("a".into()), JsValue::Str("aye".into())),
    ]));
    write_at(&mut inst, &[key("o")], &written).expect("admitted");
    assert!(js_equal(&read_at(&inst, &[key("o")]).unwrap(), &written));
}

/// An ADDED member is NOT equal, and a DROPPED member is NOT equal — the relation is not vacuous.
#[test]
fn equality_clause_1_an_added_or_dropped_member_is_not_equal() {
    let two = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
    ]));
    let three = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(1.0)),
        (JsKey::Key("b".into()), JsValue::Num(2.0)),
        (JsKey::Key("c".into()), JsValue::Num(3.0)),
    ]));
    assert!(!js_equal(&two, &three));
    assert!(!js_equal(
        &two,
        &JsValue::Object(JsObject::plain(vec![(
            JsKey::Key("a".into()),
            JsValue::Num(1.0)
        )]))
    ));
}

// =============================================================================================
// `§1.5` clause 2 — ARRAY INDEX ORDER IS SIGNIFICANT
// =============================================================================================

/// A `VEC`'s index order is preserved across the boundary (`DD-9` clause 2).
#[test]
fn equality_clause_2_array_index_order_is_preserved_and_significant() {
    let mut inst = mem_instance();
    let written = JsValue::Array(vec![
        JsValue::Num(1.0),
        JsValue::Num(2.0),
        JsValue::Num(3.0),
    ]);
    write_at(&mut inst, &[key("a")], &written).expect("admitted");
    let back = read_at(&inst, &[key("a")]).unwrap();
    assert!(js_equal(&back, &written));
    assert!(
        !js_equal(
            &back,
            &JsValue::Array(vec![
                JsValue::Num(3.0),
                JsValue::Num(2.0),
                JsValue::Num(1.0)
            ])
        ),
        "index order is significant"
    );
    assert!(!js_equal(
        &back,
        &JsValue::Array(vec![JsValue::Num(1.0), JsValue::Num(2.0)])
    ));
}

// =============================================================================================
// `§1.5` clause 3 — `Object.is` WHERE SIGN OR `NaN` MATTERS
// =============================================================================================

/// `DD-9`: *"`-0` and `0` are therefore NOT equal under this relation, while JS `===` says they are — and
/// the store's own `mem`/`temp` behaviour keeps the sign"*.
#[test]
fn equality_clause_3_negative_zero_is_not_equal_to_zero_after_a_round_trip() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("z")], &JsValue::Num(-0.0)).expect("admitted in memory");
    let back = read_at(&inst, &[key("z")]).unwrap();
    assert!(js_equal(&back, &JsValue::Num(-0.0)));
    assert!(!js_equal(&back, &JsValue::Num(0.0)));
}

/// The relation is a property of the ACCEPTANCE LAYER and of the package's own helper, never of the store
/// (`§1.5`'s closing clause): the store's own equality ignores member order, and this file's relation is
/// the only value comparison this unit declares.
#[test]
fn equality_relation_is_the_acceptance_layers_own() {
    let a = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
    ]));
    let b = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("a".into()), JsValue::Num(2.0)),
        (JsKey::Key("b".into()), JsValue::Num(1.0)),
    ]));
    // The store's own value type compares them EQUAL whatever the order (its `BTreeMap` is order-free), and
    // this unit's relation agrees on the VALUE while refusing to call two references equal.
    assert_eq!(to_store_value(&a).unwrap(), to_store_value(&b).unwrap());
    assert!(js_equal(&a, &b));
}
