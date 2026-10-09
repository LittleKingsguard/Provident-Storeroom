//! `tests/read_and_delete.rs` — contract `§4` (`write-and-read.md §4`): the read's signature with its
//! OPTIONAL zero-to-many tier and its copy discipline, the read's closed assembly arms `R-1`…`R-5`, the
//! delete's signature and its tier-scoped reading, the delete's closed arms `D-1`…`D-5`, and the
//! `DeleteReceipt` shape.
//!
//! States enumerated for this concern, each driven below: a leaf target (`R-1`); a MAP branch (`R-2`); a
//! VEC branch (`R-3`); two versions of one key (`R-4`, unqualified and with a passed set); the register
//! (`R-5`); the two empty-container forms (`DD-1`); the copy discipline; each delete arm `D-1`…`D-5`; the
//! delete's arity cells; the receipt's two members.

mod support;
use support::*;

// §4.2 R-1 — the resolved node is a leaf: the read answers its value, verbatim.
#[test]
fn s4_2_r1_a_read_of_a_leaf_answers_its_value_verbatim() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    assert_eq!(read_at(&store, &key(&["a"])), v_str("v"), "§4.2 R-1");
}

// §4.2 R-2 — the resolved node is a branch whose container is a MAP: an object using the same keys.
#[test]
fn s4_2_r2_a_read_of_a_map_branch_answers_an_object_with_the_same_keys() {
    let mut store = new_store();
    let v = v_obj(&[("k1", v_num(1.0)), ("k2", v_str("two"))]);
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v.clone()),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v,
        "§4.2 R-2: one member per key"
    );
}

// §4.2 R-3 — the resolved node is a branch whose container is a VEC: an array in index order, dense from
// 0, its length the container's contiguous index count.
// Drives: §4.2 R-3
#[test]
fn s4_2_r3_a_read_of_a_vec_branch_answers_a_dense_array_in_index_order() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_arr(vec![v_num(1.0), v_num(2.0), v_num(3.0)]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["v"])),
        v_arr(vec![v_num(1.0), v_num(2.0), v_num(3.0)]),
        "§4.2 R-3: dense from 0, index order"
    );
    assert_eq!(
        read_at(&store, &vec![Segment::Key("v".into()), idx(2)]),
        v_num(3.0),
        "§4.2 R-3: element i"
    );
}

// §4.2 R-4 — a MAP holds more than one anchor at the SAME key: only the node of the lowest-persistence
// anchor is translated on an unqualified read.
// Drives: §4.2 R-4
#[test]
fn s4_2_r4_two_versions_of_one_key_translate_only_the_lowest_persistence_anchor() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("trial")),
        "§3.4 W-5",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("trial"),
        "§4.2 R-4: the lowest-persistence anchor"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["unwritten"])), TierArg::Absent),
        "§4.1",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§4.1: an unoccupied key fails, and no `null` answers it",
    );
}

// §4.2 R-4 + §2.3 — unless a tier was passed: the passed any-match set decides and the
// lowest-persistence member of that set answers.
// Drives: §4.2 R-4, §2.3
#[test]
fn s4_2_r4_a_passed_set_decides_which_version_is_translated() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("trial")),
        "§3.4 W-5",
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_str("durable"),
        "§4.2 R-4 + §2.3"
    );
    assert_eq!(
        ok(
            store.read(AddressArg::List(key(&["a"])), set(&[Tier::File, Tier::Mem])),
            "§2.3"
        ),
        v_str("trial"),
        "§4.2 R-4: the lowest-persistence member of the passed set answers"
    );
}

// §4.2 R-5 — the resolved node is the REGISTER: an object containing every register key, each produced by
// the same read applied to that key's selected root node.
// Drives: §4.2 R-5
#[test]
fn s4_2_r5_a_read_at_the_register_applies_the_same_selection_per_key() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("trial")),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("a", v_str("trial")), ("b", v_num(1.0))]),
        "§4.2 R-5: `R-2` applied to the register, which is always a MAP"
    );
}

// §4.2's last clause + §0.2 DD-1 — the two empty forms are DISTINCT: a MAP with 0 child anchors reads as
// `{}` and a VEC with 0 child anchors reads as `[]`.
// Drives: §4.2, §0.2 DD-1
#[test]
fn s4_2_the_two_empty_container_forms_are_distinct() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![])),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v_obj(&[]),
        "§0.2 DD-1: the empty map's read value"
    );
    assert_eq!(
        read_at(&store, &key(&["v"])),
        v_arr(vec![]),
        "§0.2 DD-1: the empty array's read value"
    );
    assert_ne!(
        read_at(&store, &key(&["m"])),
        read_at(&store, &key(&["v"])),
        "§4.2: the distinctness"
    );
}

// §4.1 — a read is a VALUE COPY, not a reference: mutating the object a read returned never mutates the
// store. (This is §5.9's second assertion of `S-RT` and `P-IM-1`'s resolver half.)
#[test]
fn s4_1_a_mutated_read_result_never_mutates_the_store() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["m"])),
            w_mem(),
            v_obj(&[("k", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    let mut returned = read_at(&store, &key(&["m"]));
    if let StoreValue::Object(ref mut members) = returned {
        members.insert("injected".into(), v_str("x"));
    }
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v_obj(&[("k", v_num(1.0))]),
        "§4.1: mutating the object a read returned never mutates the store"
    );
}

// §4.1 — a read NEVER THROWS for an unoccupied key, an absent tier or an unresolved address beyond the
// four walk codes and OutOfDomainTier: there is NO `null` answer (`DD-12`).
// Drives: §4.1
#[test]
fn s4_1_a_read_never_answers_null() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), set(&[Tier::Temp])),
        "§0.2 DD-12",
    );
    assert_code(&e, "TierNotFound", "§4.1: no `null` answer");
    let e2 = failure(
        store.read(AddressArg::List(key(&["zz"])), TierArg::Absent),
        "§4.1",
    );
    assert_code(&e2, "AddressNotFound", "§4.1: no `null` answer");
}

// §4.4 D-1 + §4.3 (P: §11 · A12) — a delete at one tier removes that one version and all of its
// downstream, leaving every other tier's version at that key untouched.
// Drives: §4.4 D-1, §4.3 (P, §11 · A12)
#[test]
fn s4_4_d1_a_tiered_delete_removes_one_version_and_leaves_the_others() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_file(),
            v_obj(&[("f", v_num(9.0))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-5",
    );
    let receipt = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§4.4 D-1",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::Mem],
        "§4.4 D-1: the one named tier"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_obj(&[("f", v_num(9.0))]),
        "§4.3 A12: the survivor is unaffected"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§4.4 D-1",
    );
    assert_code(&e, "AddressNotFound", "§4.4 D-1: and all of its downstream");
}

// §4.4 D-2 — `tier` absent and the target holding versions at 1 to 3 tiers: every version and all
// downstream of each, with the receipt's tiers in §5.1's canonical order.
#[test]
fn s4_4_d2_an_unqualified_delete_removes_every_version_in_canonical_order() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(3.0)),
        "§3.4 W-5",
    );
    let receipt = ok(
        store.delete(AddressArg::List(key(&["a"])), none()),
        "§4.4 D-2",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::File, Tier::Mem, Tier::Temp],
        "§4.4 D-2: every tier removed, in §5.1's canonical order"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§4.4 D-2",
    );
    assert_code(&e, "AddressNotFound", "§4.4 D-2: every version is removed");
}

// §4.4 D-2 — a target holding versions at two of the three tiers answers only those two, in canonical
// order.
// Drives: §4.4 D-2
#[test]
fn s4_4_d2_the_receipt_names_only_the_tiers_that_held_a_version() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    let receipt = ok(
        store.delete(AddressArg::List(key(&["a"])), none()),
        "§4.4 D-2",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::File, Tier::Mem],
        "§4.4 D-2: 1 to 3 tiers, canonical order"
    );
}

// §4.4 D-3 + §0.2 DD-9 — the target resolves but holds NO version at the named tier: removes nothing and
// is a SUCCESS, with `tiers: []` — no failure for a no-op delete.
// Drives: §4.4 D-3, §0.2 DD-9
#[test]
fn s4_4_d3_a_delete_naming_a_tier_the_target_does_not_hold_is_a_success() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    let receipt = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-3",
    );
    assert_eq!(receipt.tiers, Vec::<Tier>::new(), "§0.2 DD-9: `tiers: []`");
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§4.4 D-3: removes nothing"
    );
}

// §4.4 D-3 — the target resolves but holds no version at the named tier, whichever tier the caller names.
// (An empty container resolves and is still a branch — `§1.1`/`DD-1` — and the named tier simply holds no
// version there. `D-3`'s parenthetical "or no version at all" describes a state no drive reaches: every
// reachable node is reached through an anchor, and every anchor carries a tier — §1.2.)
#[test]
fn s4_4_d3_a_delete_naming_a_tier_the_empty_container_does_not_hold_is_a_success() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let receipt = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-3",
    );
    assert_eq!(
        receipt.tiers,
        Vec::<Tier>::new(),
        "§4.4 D-3: the target resolves and the named tier is absent"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[]),
        "§4.4 D-3: removes nothing"
    );
}

// §6.1 item 1 — a delete that removed nothing (`D-3`) appends NO entry, so the next write's `seq` is the
// predecessor + 1.
// Drives: §6.1 item 1
#[test]
fn s4_4_d3_a_delete_that_removed_nothing_appends_no_journal_entry() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::File)),
        "§4.4 D-3: a successful no-op",
    );
    let next = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        next.op.seq,
        first.op.seq + 1,
        "§6.1 item 1: a delete that removed nothing appends no entry"
    );
}

// §4.4 D-4 — the address resolves to nothing: the delete fails with the walk's own code.
#[test]
fn s4_4_d4_a_delete_at_an_unresolved_address_fails_with_the_walk_s_code() {
    let mut store = new_store();
    let e = failure(
        store.delete(AddressArg::List(key(&["missing"])), none()),
        "§4.4 D-4",
    );
    assert_code(&e, "AddressNotFound", "§4.4 D-4: the walk's own code");
    let e2 = failure(
        store.delete(AddressArg::List(key(&["missing"])), t(Tier::Mem)),
        "§4.4 D-4",
    );
    assert_code(
        &e2,
        "AddressNotFound",
        "§4.4 D-4: tiered or not, the address must resolve",
    );
}

// §4.3 + §4.4 D-5 — the empty address: the register is emptied, every top-level entry and all its
// downstream removed.
// Drives: §4.3, §4.4 D-5
#[test]
fn s4_4_d5_a_delete_at_the_empty_address_empties_the_register() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    let receipt = ok(
        store.delete(AddressArg::List(empty_address()), none()),
        "§4.4 D-5",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::File, Tier::Mem],
        "§4.4 D-5: the tiers removed"
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§4.3: the register is emptied"
    );
}

// §4.4 D-5 — `tier` present at the empty address: only that tier's top-level entries.
#[test]
fn s4_4_d5_a_tiered_delete_at_the_empty_address_removes_only_that_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    let receipt = ok(
        store.delete(AddressArg::List(empty_address()), t(Tier::Mem)),
        "§4.4 D-5",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::Mem],
        "§4.4 D-5: only that tier's top-level entries"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§4.4 D-5: the other tier stands"
    );
}

// §3.1.1 (the `delete` row) — an array of 0 tokens on delete is not the delete's arity: OutOfDomainTier.
#[test]
fn s3_1_1_a_delete_with_an_array_of_zero_tokens_fails_out_of_domain_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.delete(AddressArg::List(key(&["a"])), set_empty()),
        "§3.1.1",
    );
    assert_code(&e, "OutOfDomainTier", "§3.1.1: `delete`, array of 0 tokens");
}

// §3.1.1 + §4.3 — an array of 1 token and an array of ≥ 2 tokens on delete both fail: "delete only that
// tier(s)" is read as ONE tier per call.
// Drives: §3.1.1, §4.3
#[test]
fn s3_1_1_a_delete_with_an_array_of_tokens_fails_out_of_domain_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e1 = failure(
        store.delete(AddressArg::List(key(&["a"])), set(&[Tier::Mem])),
        "§4.3",
    );
    assert_code(&e1, "OutOfDomainTier", "§4.3: one tier per call");
    let e2 = failure(
        store.delete(AddressArg::List(key(&["a"])), set(&[Tier::Mem, Tier::File])),
        "§4.3",
    );
    assert_code(&e2, "OutOfDomainTier", "§4.3: an array of ≥ 2 tokens");
}

// §3.1.1 + §5.1 M-2 — a token outside the domain on delete fails OutOfDomainTier.
#[test]
fn s3_1_1_a_delete_with_a_token_outside_the_domain_fails_out_of_domain_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.delete(AddressArg::List(key(&["a"])), outside_token("secure")),
        "§5.1 M-2",
    );
    assert_code(&e, "OutOfDomainTier", "§5.1 M-2: no fourth tier");
}

// PAR-4's declared answer — `null` and `undefined` as the delete's tier are "not a tier value at all":
// AddressMalformed.
// Drives: § (no clause found)
#[test]
fn par_4_a_null_or_undefined_delete_tier_fails_address_malformed() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    for arg in [TierArg::Null, TierArg::Undefined] {
        let e = failure(
            store.delete(AddressArg::List(key(&["a"])), arg),
            "PAR-4's declared answer",
        );
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-4: null/undefined → AddressMalformed",
        );
    }
}

// PAR-4's declared answer + §0.4 — a non-string tier on delete answers OutOfDomainTier; `§0.4` declares the
// non-string tier's ONE Rust spelling as the unit variant `TierArg::NonString`.
// Drives: §0.4, PAR-4
#[test]
fn par_4_a_non_string_delete_tier_fails_out_of_domain_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    for arg in [TierArg::NonString, TierArg::Object] {
        let e = failure(
            store.delete(AddressArg::List(key(&["a"])), arg),
            "PAR-4's declared answer",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "PAR-4: a non-string → OutOfDomainTier",
        );
    }
}

// §4.3's NEGATIVE — delete is NOT purge: a delete removes only what it names, and the surviving
// higher-tier instance at the same key is unaffected.
// Drives: §4.3
#[test]
fn s4_3_delete_removes_only_what_it_names() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-1",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§4.3: purge is a WRITE's act, not delete's"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§4.3 A12: the surviving instance stands"
    );
}

// §4.4's receipt shape — `address` is the address the caller passed, VERBATIM, in order.
#[test]
fn s4_4_the_receipt_carries_the_caller_s_address_verbatim() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    let passed = key(&["a", "b"]);
    let receipt = ok(
        store.delete(AddressArg::List(passed.clone()), none()),
        "§4.4",
    );
    assert_eq!(
        receipt.address, passed,
        "§4.4: the same array's segments, in order"
    );
}

// §4.4's census — the delete's closed arm table is 4 success arms + 1 fail-closed arm, and `D-3` is a
// success arm that removes nothing.
// Drives: §4.4
#[test]
fn s4_4_the_delete_arm_table_s_success_and_fail_rows_are_both_reachable() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§4.4 D-1",
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-3",
    );
    assert!(
        store
            .delete(AddressArg::List(key(&["nope"])), none())
            .is_err(),
        "§4.4 D-4"
    );
    let mut other = new_store();
    ok(
        other.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        other.delete(AddressArg::List(key(&["b"])), none()),
        "§4.4 D-2",
    );
    assert_eq!(read_at(&other, &empty_address()), v_obj(&[]), "§4.4 D-2");
    ok(
        other.write(AddressArg::List(key(&["c"])), w_temp(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        other.delete(AddressArg::List(empty_address()), none()),
        "§4.4 D-5",
    );
}
