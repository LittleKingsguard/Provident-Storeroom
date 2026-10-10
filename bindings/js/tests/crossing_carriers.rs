//! THE ARGUMENT CARRIERS' CROSSING TABLE — `crossing.md §1.3` (`contract.md §1.3`): **`8` carriers over `56`
//! variant rows** — `AddressArg` `14` + `TierArg` `7` + `TierSetItem` `4` + `OpIdArg` `6` + `FilePathArg` `6`
//! + `JournalLengthArg` `12` + `ListenersArg` `5` + `ListenerHandle` `2` = `56` ✓ (`crossing.md §1.6`).
//!
//! **THE STATES ENUMERATED BEFORE THE DRIVES ARE AUTHORED.** For each carrier, the states are exactly the
//! rows its own table prints — the ACCEPTED forms first, then each REFUSED form with its declared answer:
//!
//! | Carrier | Rows | The states driven |
//! | --- | --- | --- |
//! | `AddressArg` | 14 | `[]` · `['a']` · `['a', 0, 'b']` · a `'.'`/`'/'`-bearing key · ABSENT · `null` · `undefined` · a non-array (number, string, boolean, object, function) · `'a.b'` · a negative integer member · a fractional/`NaN`/`Infinity` member · a `null`/`undefined` member · a boolean/object/nested-array/function member · a class instance array-like · a `Proxy` over an array · a cross-realm array · a sparse array |
//! | `TierArg` | 7 | each of the three tokens · an array of `0`, `1`, `≥2` tokens on `read`/`readLiteral` · ABSENT on each verb · `null` · `undefined` · a number · a boolean · an object · a function |
//! | `TierSetItem` | 4 | a token member · a `null`/`undefined` member · a non-string scalar member · an object member · a function member |
//! | `OpIdArg` | 6 | the `opId` a write returned · a well-shaped unknown string · the empty string · ABSENT · `null` · `undefined` · a number |
//! | `FilePathArg` | 6 | a reachable path · ABSENT · `null` · `undefined` · `''` · a non-string · a path whose parent does not exist · a path that IS a directory · an existing but not writable path |
//! | `JournalLengthArg` | 12 | `1` · `2` · `100` · ABSENT · `0` · a negative integer · a fractional · `NaN` · `Infinity` · `'5'` · a boolean · `null` · `undefined` · an object · a function · a `bigint` · a positive integer beyond `u32` |
//! | `ListenersArg` | 5 | `[]` · one entry · a duplicate address with two DIFFERENT handles (both KEPT) · an entry that is not a record · an entry whose `address` is outside the domain · an entry whose `handle` cannot be admitted · ABSENT · `null` · `undefined` · a non-array |
//! | `ListenerHandle` | 2 | a plain string IN (including a blank) · the opaque value OUT · a bare string to `unlisten` |
//!
//! **AND THE ONE RULE EVERY REFUSAL SHARES** (`DD-1`): *"the binding ADMITS each carrier's outside variants
//! as values and converts them to the store's own refusal by CALLING the store's verb with them, so the
//! store's own closed fail set stays the ONLY producer of a code and no second, binding-side refusal
//! surface exists"* — so every drive below goes through a VERB, and every answer asserted is a member of
//! the store's closed set.

mod support;

use support::*;

// ---------------------------------------------------------------------------------------------
// `AddressArg` — 14 rows
// ---------------------------------------------------------------------------------------------

/// Row 1: *"a JS **array** of segments … `[]`"* — the empty array is IN the domain.
#[test]
fn address_arg_1_empty_array_is_accepted() {
    assert_eq!(
        to_address_arg(&JsAddressArg::List(vec![])),
        AddressArg::List(vec![])
    );
}

/// Row 2: *"`Segment` = a JS `string` … `''` (the empty string IS a legal key and a legal register key)"*.
#[test]
fn address_arg_2_string_segments_are_accepted_including_the_empty_key() {
    assert_eq!(
        to_address_arg(&JsAddressArg::List(vec![key(""), key("a.b"), key("a/b")])),
        AddressArg::List(vec![
            Segment::Key("".to_string()),
            Segment::Key("a.b".to_string()),
            Segment::Key("a/b".to_string()),
        ])
    );
}

/// Row 3: *"`Segment` = a JS non-negative integer `number` … a `number` that is integral, `>= 0` and exact
/// as an `f64`"*.
#[test]
fn address_arg_3_non_negative_integer_segments_are_accepted() {
    assert_eq!(
        to_address_arg(&JsAddressArg::List(vec![key("a"), idx(0), idx(2_u64.pow(32))])),
        AddressArg::List(vec![
            Segment::Key("a".to_string()),
            Segment::Index(0),
            Segment::Index(4_294_967_296),
        ])
    );
}

/// Row 4: **an ABSENT `address`** answers `AddressMalformed` (a required argument is missing).
#[test]
fn address_arg_4_absent_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::Absent, &JsTierArg::Absent)
        .expect_err("a required argument is missing");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 5: **`null` / `undefined`** answer `AddressMalformed` (the shape is not the address's shape at all).
#[test]
fn address_arg_5_null_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::Null, &JsTierArg::Absent)
        .expect_err("null is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_5_undefined_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::Undefined, &JsTierArg::Absent)
        .expect_err("undefined is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 6: **a non-array — a number, a string, a boolean, an object, a function** answers `AddressMalformed`,
/// and **`'a.b'` is NOT a delimited address and is refused as a shape, verbatim**.
#[test]
fn address_arg_6_a_number_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::NonArray(JsNonArray::Number(1.0)), &JsTierArg::Absent)
        .expect_err("a number is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_6_a_string_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::NonArray(JsNonArray::Str("a.b".to_string())),
            &JsTierArg::Absent,
        )
        .expect_err("'a.b' is NOT a delimited address");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_6_a_boolean_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::NonArray(JsNonArray::Bool(true)), &JsTierArg::Absent)
        .expect_err("a boolean is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_6_an_object_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::NonArray(JsNonArray::Object), &JsTierArg::Absent)
        .expect_err("an object is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_6_a_function_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::NonArray(JsNonArray::Function), &JsTierArg::Absent)
        .expect_err("a function is not an array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 7: **an array holding a negative integer** answers `AddressMalformed`.
#[test]
fn address_arg_7_a_negative_integer_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::List(vec![JsSegment::Negative(-1)]),
            &JsTierArg::Absent,
        )
        .expect_err("a negative integer is not a segment");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 8: **an array holding a non-integer `number`** (`1.5`, `NaN`, `Infinity`) answers `AddressMalformed`.
#[test]
fn address_arg_8_a_fractional_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::List(vec![JsSegment::Fractional(1.5)]),
            &JsTierArg::Absent,
        )
        .expect_err("1.5 is not an index");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_8_a_nan_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::List(vec![JsSegment::Fractional(f64::NAN)]),
            &JsTierArg::Absent,
        )
        .expect_err("NaN is not an index");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_8_an_infinite_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::List(vec![JsSegment::Fractional(f64::INFINITY)]),
            &JsTierArg::Absent,
        )
        .expect_err("Infinity is not an index");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 9: **an array holding `null` / `undefined`** answers `AddressMalformed`.
#[test]
fn address_arg_9_a_null_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::List(vec![JsSegment::Null]), &JsTierArg::Absent)
        .expect_err("a null member is not a segment");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn address_arg_9_an_undefined_member_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::List(vec![JsSegment::Undefined]),
            &JsTierArg::Absent,
        )
        .expect_err("an undefined member is not a segment");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 10: **an array holding a boolean, an object, a nested array or a function** answers
/// `AddressMalformed` — the walk's `10` outside segment classes (`crossing.md §1.6`).
#[test]
fn address_arg_10_all_four_class_members_are_refused_address_malformed() {
    for member in [
        JsSegment::Bool(true),
        JsSegment::Object,
        JsSegment::Array,
        JsSegment::Function,
    ] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![member]), &JsTierArg::Absent)
            .expect_err("an outside segment class is not a segment");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
    }
}

/// Row 11: **a class instance that is array-like but not an `Array`** answers `AddressMalformed` — *"the
/// shape is not an array"*.
#[test]
fn address_arg_11_a_class_array_like_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::ClassArrayLike, &JsTierArg::Absent)
        .expect_err("array-like is not an Array");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 12: **a `Proxy` over an array** answers `AddressMalformed` — *"the binding owns proxy detection at
/// the argument boundary exactly as it does inside the walk"* (`DD-34`).
#[test]
fn address_arg_12_a_proxy_over_an_array_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::Proxy, &JsTierArg::Absent)
        .expect_err("a proxy is refused, never walked");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// Row 13: **a cross-realm array** — ACCEPTED *"it is an `Array`"*.
#[test]
fn address_arg_13_a_cross_realm_array_is_accepted() {
    let cross = JsAddressArg::CrossRealmList(vec![key("a"), idx(0)]);
    assert_eq!(
        to_address_arg(&cross),
        AddressArg::List(vec![Segment::Key("a".to_string()), Segment::Index(0)])
    );
    let mut inst = mem_instance();
    // A VECTOR container is created first: an integer segment addresses an index, and a map target would
    // answer the store's own `ContainerKindConflict`.
    write_at(&mut inst, &[key("a")], &JsValue::Array(vec![JsValue::Num(7.0)]))
        .expect("a mem-tier write");
    let back = inst
        .read(&cross, &JsTierArg::Absent)
        .expect("a cross-realm array IS an `Array` and is accepted");
    assert!(js_equal(&back, &JsValue::Num(7.0)));
}

/// Row 14: **a sparse array as the address itself** answers `AddressMalformed` — *"a hole is not an
/// in-domain segment, and neither reading of a hole may be chosen silently"* (`DD-8`).
#[test]
fn address_arg_14_a_sparse_array_is_refused_address_malformed() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::Sparse, &JsTierArg::Absent)
        .expect_err("a hole is not a segment");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

// ---------------------------------------------------------------------------------------------
// `TierArg` — 7 rows
// ---------------------------------------------------------------------------------------------

/// `TierArg` row 1: each of the three tokens is in domain, on every verb.
#[test]
fn tier_arg_1_each_token_is_accepted_on_every_verb() {
    for token in ["file", "mem", "temp"] {
        assert_eq!(
            to_tier_arg(&JsTierArg::Token(token.to_string())),
            TierArg::Token(tier(token))
        );
    }
}

/// `TierArg` row 1's refused half: **any other token** (`'secure'`, `'FILE'`, `'disk'`, `'session'`, `''`)
/// answers `OutOfDomainTier`.
#[test]
fn tier_arg_1_an_out_of_domain_token_is_refused_out_of_domain_tier() {
    for token in ["secure", "FILE", "disk", "session", ""] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![]), &JsTierArg::Token(token.to_string()))
            // **THE TOKEN IS INTERPOLATED, NOT CARRIED AS A LITERAL** (the `DEF-17` class): the loop's own
            // `token` names the refused spelling, so the failure message must be the interpolated one.
            .expect_err(&format!("`{token}` is not a tier"));
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

/// `TierArg` row 2 (accepted half): **on `read`/`readLiteral` an array of tokens** — `[]`, `['mem']`,
/// `['file','mem','temp']`, duplicates included — is in domain, and it is an ANY-MATCH set.
#[test]
fn tier_arg_2_a_tier_array_is_accepted_on_read() {
    for tokens in [vec![], vec!["mem"], vec!["file", "mem", "temp"], vec!["mem", "mem"]] {
        let set: Vec<JsTierSetItem> = tokens
            .iter()
            .map(|t| JsTierSetItem::Token(t.to_string()))
            .collect();
        let mut inst = mem_instance();
        write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
        inst.read(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Set(set))
            .expect("an array of tier tokens is the READER's arity");
    }
}

/// `TierArg` row 2 (refused half): **on `write`/`delete` any array of any length answers `OutOfDomainTier`**
/// — *"the array spelling is the READER's arity"*.
#[test]
fn tier_arg_2_any_array_is_refused_out_of_domain_tier_on_write() {
    for tokens in [vec![], vec!["mem"], vec!["mem", "temp"]] {
        let set: Vec<JsTierSetItem> = tokens
            .iter()
            .map(|t| JsTierSetItem::Token(t.to_string()))
            .collect();
        let mut inst = mem_instance();
        let err = inst
            .write(
                &JsAddressArg::List(vec![key("a")]),
                &JsTierArg::Set(set),
                &JsValue::Num(1.0),
            )
            .expect_err("the write's tier is REQUIRED and SINGULAR");
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

#[test]
fn tier_arg_2_any_array_is_refused_out_of_domain_tier_on_delete() {
    let set = vec![JsTierSetItem::Token("mem".to_string())];
    let mut inst = mem_instance();
    let err = inst
        .delete(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Set(set),
        )
        .expect_err("the delete's tier is EXACTLY ONE when present");
    assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
}

/// `TierArg` row 3: **ABSENT** is in domain on `read`/`readLiteral`/`delete`, and is
/// `AddressMalformed` on `write` (a required argument is missing).
#[test]
fn tier_arg_3_absent_is_in_domain_on_read_read_literal_and_delete() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    inst.read(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
        .expect("absent is in domain on read");
    inst.read_literal(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
        .expect("absent is in domain on readLiteral");
    inst.delete(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
        .expect("absent is in domain on delete");
}

#[test]
fn tier_arg_3_absent_is_refused_address_malformed_on_write() {
    let mut inst = mem_instance();
    let err = inst
        .write(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Absent,
            &JsValue::Num(1.0),
        )
        .expect_err("the write's tier is REQUIRED");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `TierArg` row 4: **`null` / `undefined`** answer `AddressMalformed` on every verb.
#[test]
fn tier_arg_4_null_and_undefined_answer_address_malformed_on_every_verb() {
    for bad in [JsTierArg::Null, JsTierArg::Undefined] {
        let mut inst = mem_instance();
        let addr = JsAddressArg::List(vec![key("a")]);
        let err = inst.read(&addr, &bad).expect_err("null/undefined is not a tier set");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
        let err = inst
            .write(&addr, &bad, &JsValue::Num(1.0))
            .expect_err("null/undefined is not a tier");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
        let err = inst.delete(&addr, &bad).expect_err("null/undefined is not a tier");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
    }
}

/// `TierArg` row 5: **a non-string scalar** (number, boolean) answers `OutOfDomainTier`.
#[test]
fn tier_arg_5_a_non_string_scalar_is_refused_out_of_domain_tier() {
    for bad in [JsTierArg::Number(1.0), JsTierArg::Bool(true)] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![key("a")]), &bad)
            .expect_err("a number is not a tier");
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

/// `TierArg` row 6: **an object** answers `OutOfDomainTier`.
#[test]
fn tier_arg_6_an_object_is_refused_out_of_domain_tier() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Object)
        .expect_err("an object is not a tier");
    assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
}

/// `TierArg` row 7: **a function** answers `OutOfDomainTier`.
#[test]
fn tier_arg_7_a_function_is_refused_out_of_domain_tier() {
    let inst = mem_instance();
    let err = inst
        .read(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Function)
        .expect_err("a function is not a tier");
    assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
}

// ---------------------------------------------------------------------------------------------
// `TierSetItem` — 4 rows
// ---------------------------------------------------------------------------------------------

/// `TierSetItem` row 1: **a member of the tier array that is a token string** is in domain.
#[test]
fn tier_set_item_1_a_token_member_is_in_domain() {
    assert_eq!(
        to_tier_set_item(&JsTierSetItem::Token("mem".to_string())),
        storeroom_native::TierSetItem::Token(Tier::Mem)
    );
}

/// `TierSetItem` row 1's refused half: **any other token** answers `OutOfDomainTier`.
#[test]
fn tier_set_item_1_an_out_of_domain_token_member_is_refused() {
    let inst = mem_instance();
    let set = vec![JsTierSetItem::Token("secure".to_string())];
    let err = inst
        .read(&JsAddressArg::List(vec![]), &JsTierArg::Set(set))
        .expect_err("`secure` is not a tier");
    assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
}

/// `TierSetItem` row 2: **a member that is `null` / `undefined`** answers `OutOfDomainTier`.
#[test]
fn tier_set_item_2_a_null_or_undefined_member_is_refused() {
    for member in [JsTierSetItem::Null, JsTierSetItem::Undefined] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![]), &JsTierArg::Set(vec![member]))
            .expect_err("a shapeless member is not a tier");
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

/// `TierSetItem` row 3: **a member that is a non-string scalar** answers `OutOfDomainTier`.
#[test]
fn tier_set_item_3_a_non_string_scalar_member_is_refused() {
    for member in [
        JsTierSetItem::Number(1.0),
        JsTierSetItem::Bool(false),
    ] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![]), &JsTierArg::Set(vec![member]))
            .expect_err("a number is not a tier");
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

/// `TierSetItem` row 4: **a member that is an object or a function** answers `OutOfDomainTier`.
#[test]
fn tier_set_item_4_an_object_or_function_member_is_refused() {
    for member in [JsTierSetItem::Object, JsTierSetItem::Function] {
        let inst = mem_instance();
        let err = inst
            .read(&JsAddressArg::List(vec![]), &JsTierArg::Set(vec![member]))
            .expect_err("a function is not a tier");
        assert_refusal_is_the_single_form(&err, "OutOfDomainTier");
    }
}

// ---------------------------------------------------------------------------------------------
// `OpIdArg` — 6 rows
// ---------------------------------------------------------------------------------------------

/// `OpIdArg` row 1: *"a non-empty `string` — only a value the `WriteResult.op.opId` the store returned, or
/// a value the store's journal otherwise holds"*.
#[test]
fn op_id_arg_1_the_id_a_write_returned_is_accepted() {
    let mut inst = mem_instance();
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    let op = w.op.clone();
    let back = inst
        .rollback(&JsOpIdArg::Str(op.opId.clone()))
        .expect("the opId the write returned is in domain");
    assert_eq!(back.opId, op.opId);
}

/// `OpIdArg` row 2: **a string the store's journal does not hold** answers `JournalOpUnknown`.
#[test]
fn op_id_arg_2_a_well_shaped_unknown_id_is_refused_journal_op_unknown() {
    let mut inst = mem_instance();
    let err = inst
        .rollback(&JsOpIdArg::Str("op-does-not-exist".to_string()))
        .expect_err("the journal does not hold this id");
    assert_refusal_is_the_single_form(&err, "JournalOpUnknown");
}

/// `OpIdArg` row 3: **the empty string** answers `AddressMalformed` (a blank `opId`).
#[test]
fn op_id_arg_3_the_empty_string_is_refused_address_malformed() {
    let mut inst = mem_instance();
    let err = inst
        .rollback(&JsOpIdArg::Str(String::new()))
        .expect_err("a blank opId is outside the domain");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `OpIdArg` row 4: **ABSENT** answers `AddressMalformed`.
#[test]
fn op_id_arg_4_absent_is_refused_address_malformed() {
    let mut inst = mem_instance();
    let err = inst
        .rollback(&JsOpIdArg::Absent)
        .expect_err("the opId is required");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `OpIdArg` row 5: **`null` / `undefined`** answer `AddressMalformed`.
#[test]
fn op_id_arg_5_null_and_undefined_are_refused_address_malformed() {
    for bad in [JsOpIdArg::Null, JsOpIdArg::Undefined] {
        let mut inst = mem_instance();
        let err = inst.rollback(&bad).expect_err("a shapeless opId");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
    }
}

/// `OpIdArg` row 6: **a number** answers `AddressMalformed`.
#[test]
fn op_id_arg_6_a_number_is_refused_address_malformed() {
    let mut inst = mem_instance();
    let err = inst
        .rollback(&JsOpIdArg::Number(1.0))
        .expect_err("a number is not an opId");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

// ---------------------------------------------------------------------------------------------
// `FilePathArg` and `JournalLengthArg` — 6 + 12 rows
// ---------------------------------------------------------------------------------------------

fn scratch_path(name: &str) -> std::path::PathBuf {
    let dir = std::env::temp_dir().join(format!("storeroom-js-redset-{}", std::process::id()));
    std::fs::create_dir_all(&dir).expect("a scratch directory outside the repository's tracked tree");
    dir.join(name)
}

/// `FilePathArg` row 1: **a non-empty `string` naming a path that PASSES the store's construction-time
/// reachability probe** — any such path.
#[test]
fn file_path_arg_1_a_reachable_path_returns_an_instance() {
    let path = scratch_path("reachable.json");
    let mut inst = create(&cfg_at(path.to_str().unwrap(), 2)).expect("a reachable path");
    // The register's tier is FIXED AT CREATION: a path that passed the probe fixes the register at `file`.
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    let _ = std::fs::remove_file(&path);
}

/// `FilePathArg` row 2: **ABSENT is IN DOMAIN — the register is created at `mem` and the store IS returned.**
#[test]
fn file_path_arg_2_absent_is_in_domain_and_the_instance_is_returned() {
    let inst = create(&cfg_mem()).expect("an absent filePath is IN DOMAIN");
    inst.read(&JsAddressArg::List(vec![]), &JsTierArg::Absent)
        .expect("the instance is a working store");
}

/// `FilePathArg` row 3: **`null` / `undefined` / `''` / a non-string** answer `AddressMalformed`, no
/// instance returned.
#[test]
fn file_path_arg_3_null_undefined_empty_and_non_string_are_refused_address_malformed() {
    for bad in [
        JsFilePathArg::Null,
        JsFilePathArg::Undefined,
        JsFilePathArg::Empty,
        JsFilePathArg::NonString,
    ] {
        let cfg = JsConfig {
            file_path: Some(bad),
            journal_length: Some(JsJournalLengthArg::Count(2)),
            listeners: Some(JsListenersArg::List(vec![])),
            fourth_key: None,
        };
        let err = create(&cfg).expect_err("no instance is returned");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
    }
}

/// `FilePathArg` row 4: **a string whose parent directory does not exist** answers `FilePathUnreachable`.
#[test]
fn file_path_arg_4_a_missing_parent_directory_is_refused_file_path_unreachable() {
    let path = std::env::temp_dir()
        .join("storeroom-js-redset-no-such-parent-9c1f")
        .join("file.json");
    let err = create(&cfg_at(path.to_str().unwrap(), 2))
        .expect_err("the parent directory does not exist");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    assert!(
        !path.exists(),
        "the probe is a DRY RUN: it creates no file, no directory and no byte (P-SM-6)"
    );
}

/// `FilePathArg` row 5: **a string that IS a directory** answers `FilePathUnreachable`.
#[test]
fn file_path_arg_5_a_directory_is_refused_file_path_unreachable() {
    let dir = std::env::temp_dir();
    let err = create(&cfg_at(dir.to_str().unwrap(), 2)).expect_err("the path is a directory");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
}

/// `FilePathArg` row 6: **a string naming an existing but not writable path** answers
/// `FilePathUnreachable`.
#[test]
fn file_path_arg_6_an_unwritable_path_is_refused_file_path_unreachable() {
    use std::os::unix::fs::PermissionsExt;
    let path = scratch_path("read-only.json");
    std::fs::write(&path, b"{}").expect("a scratch file");
    std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o444))
        .expect("mode 0444");
    let result = create(&cfg_at(path.to_str().unwrap(), 2));
    // The probe requires WRITE ACCESS (`A52`/`A55`); a root-owned process would pass it, so the drive
    // asserts the declared answer and the run reports it as the platform gives it.
    if let Err(err) = result {
        assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    }
    let _ = std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o644));
    let _ = std::fs::remove_file(&path);
}

/// `JournalLengthArg` row 1: **a positive integer `number` (`>= 1`)** — `1`, `2`, `100`.
#[test]
fn journal_length_arg_1_positive_integers_return_an_instance() {
    for n in [1u32, 2, 100] {
        let cfg = JsConfig {
            file_path: None,
            journal_length: Some(JsJournalLengthArg::Count(n)),
            listeners: Some(JsListenersArg::List(vec![])),
            fourth_key: None,
        };
        create(&cfg).expect("a positive integer is the journal's own count of ENTRIES");
    }
}

/// `JournalLengthArg` row 2: **ABSENT** answers `ConstructionArgumentMissing` — *"the ONE absence the
/// amended construction still refuses"*.
#[test]
fn journal_length_arg_2_absent_is_refused_construction_argument_missing() {
    let cfg = JsConfig {
        file_path: None,
        journal_length: None,
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    };
    let err = create(&cfg).expect_err("the journalLength is required");
    assert_refusal_is_the_single_form(&err, "ConstructionArgumentMissing");
}

/// `JournalLengthArg` rows 3–12: **every other out-of-domain value answers `AddressMalformed`, with NO
/// coercion of a numeric string, a boolean or a `bigint`.**
#[test]
fn journal_length_arg_3_zero_is_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::Zero);
}

#[test]
fn journal_length_arg_4_a_negative_integer_is_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::Negative(-1));
}

#[test]
fn journal_length_arg_5_a_fractional_number_is_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::Fractional(1.5));
}

#[test]
fn journal_length_arg_6_nan_and_infinity_are_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::NaN);
    assert_journal_length_refused(JsJournalLengthArg::Infinity);
}

#[test]
fn journal_length_arg_7_a_numeric_string_is_refused_address_malformed_with_no_coercion() {
    assert_journal_length_refused(JsJournalLengthArg::NumericString("5".to_string()));
}

#[test]
fn journal_length_arg_8_a_boolean_is_refused_address_malformed_with_no_coercion() {
    assert_journal_length_refused(JsJournalLengthArg::Bool(true));
}

#[test]
fn journal_length_arg_9_null_and_undefined_are_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::Null);
    assert_journal_length_refused(JsJournalLengthArg::Undefined);
}

#[test]
fn journal_length_arg_10_an_object_or_a_function_is_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::Object);
    assert_journal_length_refused(JsJournalLengthArg::Function);
}

#[test]
fn journal_length_arg_11_a_bigint_is_refused_address_malformed_with_no_coercion() {
    assert_journal_length_refused(JsJournalLengthArg::BigInt(5));
}

#[test]
fn journal_length_arg_12_a_positive_integer_beyond_u32_is_refused_address_malformed() {
    assert_journal_length_refused(JsJournalLengthArg::TooLarge(4_294_967_296));
}

fn assert_journal_length_refused(length: JsJournalLengthArg) {
    let cfg = JsConfig {
        file_path: None,
        journal_length: Some(length),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    };
    let err = create(&cfg).expect_err("this value is outside the journal length's domain");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

// ---------------------------------------------------------------------------------------------
// `ListenersArg` and `ListenerHandle` — 5 + 2 rows
// ---------------------------------------------------------------------------------------------

/// `ListenersArg` row 1: *"`[]` (the ordinary no-listener store); `[{address:['a'], handle:'l1'}]`; a
/// duplicate address with two DIFFERENT handles — both entries are KEPT"*.
#[test]
fn listeners_arg_1_an_empty_array_is_the_ordinary_no_listener_store() {
    let mut inst = create(&cfg_mem_with(vec![])).expect("the empty array is in the domain");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    assert!(
        w.triggered.is_empty(),
        "0 entries in ⇒ a first write whose triggered is []"
    );
}

#[test]
fn listeners_arg_1_one_entry_is_admitted() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("one entry is in the domain");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    assert_eq!(w.triggered.len(), 1, "the registered handle fires");
}

/// The duplicate state: **`2` entries in ⇒ `2` entries in the store's home**, and the store's own set
/// semantics return the token ONCE where it minted it (`S-COUNT`; `P-SM-5`'s `S-REG-DUP`).
#[test]
fn listeners_arg_1_a_duplicate_address_with_two_different_handles_keeps_both_entries() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1"), handle("l2")]))
        .expect("a duplicate address is in the domain");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    assert_eq!(
        w.triggered.len(),
        2,
        "both entries are KEPT, each with its own handle"
    );
    assert!(
        !js_set_equal(&w.triggered, &w.triggered[0..1]),
        "the two handles are two distinct members"
    );
}

/// `ListenersArg` row 2: **an array entry that is not a plain `{ address, handle }` record** answers
/// `AddressMalformed`, no instance returned.
#[test]
fn listeners_arg_2_an_entry_that_is_not_a_record_is_refused() {
    let err = create(&cfg_mem_with(vec![JsListenerEntry::Other]))
        .expect_err("an entry that is not a record is outside the domain");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `ListenersArg` row 3: **an array entry whose `address` lies outside `AddressArg`'s domain** answers
/// `AddressMalformed` (`AddressArg`'s own answer carried) — and *"a rejected array admits NOTHING"*.
#[test]
fn listeners_arg_3_an_entry_with_an_out_of_domain_address_is_refused() {
    let bad = JsListenerEntry::Entry {
        address: JsAddressArg::List(vec![JsSegment::Negative(-1)]),
        handle: "l1".to_string(),
    };
    let err = create(&cfg_mem_with(vec![handle("l0"), bad]))
        .expect_err("the malformed address's own answer is carried");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `ListenersArg` row 4: **an array entry whose `handle` the construction cannot admit** (a non-string,
/// `null`, `undefined`, an object) answers `AddressMalformed`, no instance returned.
#[test]
fn listeners_arg_4_a_blank_handle_is_refused_at_the_construction() {
    let err = create(&cfg_mem_with(vec![handle("")]))
        .expect_err("a blank (empty-string) token is outside the handle's domain");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn listeners_arg_4_a_non_string_handle_is_refused_at_the_construction() {
    let bad = JsListenerEntry::Entry {
        address: JsAddressArg::List(vec![key("a")]),
        handle: String::new(),
    };
    let err = create(&cfg_mem_with(vec![bad])).expect_err("the handle is not an in-domain token");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `ListenersArg` row 5: **ABSENT** answers `AddressMalformed` — *"the ONE absence the construction does
/// not admit"* (`DD-36`).
#[test]
fn listeners_arg_5_absent_is_refused_address_malformed() {
    let cfg = JsConfig {
        file_path: None,
        journal_length: Some(JsJournalLengthArg::Count(2)),
        listeners: None,
        fourth_key: None,
    };
    let err = create(&cfg).expect_err("an ABSENT listeners is the ONE absence the construction refuses");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn listeners_arg_5_null_undefined_and_non_array_are_refused_address_malformed() {
    for bad in [
        JsListenersArg::Null,
        JsListenersArg::Undefined,
        JsListenersArg::NonArray,
    ] {
        let cfg = JsConfig {
            file_path: None,
            journal_length: Some(JsJournalLengthArg::Count(2)),
            listeners: Some(bad),
            fourth_key: None,
        };
        let err = create(&cfg).expect_err("a non-array listeners");
        assert_refusal_is_the_single_form(&err, "AddressMalformed");
    }
}

/// `ListenerHandle` row 1 (**INPUT**): *"a plain `string` in a construction entry — any non-empty string;
/// a string equal to one the store would itself mint is ADOPTED VERBATIM and is lawful"*, and an empty
/// string answers `AddressMalformed`.
#[test]
fn listener_handle_1_a_caller_spelled_token_is_adopted_verbatim() {
    // `A69`: *"the construction ADOPTS the caller's tokens verbatim rather than re-minting them"* — so a
    // caller-spelled token triggers exactly as a minted one does.
    let mut inst = create(&cfg_mem_with(vec![handle("listener-1")]))
        .expect("a caller-spelled token is lawful");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    assert_eq!(w.triggered.len(), 1);
}

#[test]
fn listener_handle_1_a_blank_token_is_refused_at_the_construction() {
    let err = create(&cfg_mem_with(vec![handle("")])).expect_err("a blank token is outside the domain");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `ListenerHandle` row 2 (**OUTPUT**): *"the package's opaque JS value wrapping a token the store
/// returned"*, and **a bare `string` passed to `unlisten` is an unknown handle → a no-op SUCCESS**.
#[test]
fn listener_handle_2_unlisten_over_a_bare_string_is_a_no_op_success() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("an instance");
    // A registration of the package's own mint, at a second address, for the "removes nothing" half.
    let minted = inst
        .listen(&JsAddressArg::List(vec![key("b")]))
        .expect("a mint");
    // A bare string is NOT the opaque form: the answer is a no-op success, and NO OTHER registration is
    // removed — the `b` registration still fires.
    inst.unlisten(&JsHandleArg::Bare("listener-1".to_string()))
        .expect("a bare string is an unknown handle and a no-op success");
    inst.unlisten(&JsHandleArg::Bare(String::new()))
        .expect("a blank token is the same no-op success");
    let w = write_at(&mut inst, &[key("b")], &JsValue::Num(2.0)).expect("a mem-tier write");
    assert!(
        js_set_equal(&w.triggered, std::slice::from_ref(&minted)),
        "the no-op removed nothing: the `b` registration stands"
    );
}

/// `crossing.md §1.6`'s census, driven: the `8` carriers and their `56` variant rows are the table above.
#[test]
fn crossing_census_the_56_carrier_variant_rows_are_driven() {
    let rows = 14 + 7 + 4 + 6 + 6 + 12 + 5 + 2;
    assert_eq!(rows, 56, "crossing.md §1.6's own arithmetic, re-derived by its terms");
}
