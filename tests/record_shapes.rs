//! `tests/record_shapes.rs` — contract `§1` (`store-model.md §1`): the two node kinds, the anchor, the link
//! and its `MAP`-xor-`VEC` container, the admitted value taxonomy, the address grammar, the register.
//!
//! States enumerated for this concern, each driven below: a literal write (leaf); an object write (branch /
//! `MAP`); an array write (branch / `VEC`); an empty object and an empty array (`DD-1`); a re-minting write
//! over a leaf (`W-2`); a register key at each of the three tiers; a kind-contradicting write in both
//! directions (`F-4`); an occupied `(key, tier)` pair (`W-1`); each outside value class (§1.4); the empty
//! address; the empty-string key; a string segment against a `VEC` and an integer segment against the
//! register (`L-INT-REG`).

mod support;
use support::*;

// §1.1 — a write of an admitted literal mints a leaf whose read returns the value verbatim.
#[test]
fn s1_1_a_literal_write_mints_a_leaf_readable_verbatim() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("s")),
        "§3.4 W-3",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("s"),
        "§4.2 R-1: the leaf's stored value, verbatim"
    );
}

// §1.1 + §0.2 DD-1 — a write of an empty object mints a branch whose container is a MAP with 0 child
// anchors, and a read there returns `{}` — never `[]`.
// Drives: §1.1, §0.2 DD-1
#[test]
fn s1_1_an_empty_object_reads_back_as_an_empty_object() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["empty"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["empty"])),
        v_obj(&[]),
        "§0.2 DD-1: `{{}}` — never `[]`"
    );
}

// §1.3 + §0.2 DD-1 — a write of an empty array mints a VEC with 0 child anchors, read as `[]`.
#[test]
fn s1_3_an_empty_array_reads_back_as_an_empty_array() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["empty"])), w_mem(), v_arr(vec![])),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["empty"])),
        v_arr(vec![]),
        "§0.2 DD-1: `[]` — never `{{}}`"
    );
}

// §1.1 — a leaf refuses any child anchor: the walk cannot continue past it (L-4).
#[test]
fn s1_1_a_leaf_refuses_a_child_anchor_and_the_walk_fails_l4() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("s")),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§2.2 L-4",
    );
    assert_code(
        &e,
        "LeafHasNoDownstream",
        "§1.1: a leaf has no downstream anchors",
    );
}

// §1.1 + §3.4 W-2 (P: §13 · A21) — a write whose target resolves to a leaf and whose value is an object
// destroys that leaf's pointing anchor and places a NEW anchor on the SAME link.
// Drives: §1.1, §3.4 W-2 (P, §13 · A21)
#[test]
fn s1_1_a_re_mint_destroys_the_leaf_and_places_a_new_anchor_on_the_same_link() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("s")),
        "§3.4 W-3",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("k", v_num(1.0))]),
        ),
        "§3.4 W-2",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("k", v_num(1.0))]),
        "§3.4 W-2: the new branch-tree"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§1.1: the old leaf and its anchor are gone"
    );
}

// §1.1 — "the destroyed anchor's tier does not survive onto the new one — the write's tier is the new
// anchor's tier".
// Drives: §1.1
#[test]
fn s1_1_the_destroyed_anchor_s_tier_does_not_survive_the_re_mint() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("s")),
        "§3.4 W-3",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 W-2",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), t(Tier::File)),
        "§1.1's re-mint clause",
    );
    assert_code(
        &e,
        "TierNotFound",
        "§1.1: the destroyed anchor's tier does not survive",
    );
}

// §1.2 + §1.6 — the register has no parent anchor and therefore imposes no upper bound: any of the three
// tiers may stand at a register key.
// Drives: §1.2, §1.6
#[test]
fn s1_2_a_register_key_accepts_any_of_the_three_tiers() {
    for tier in canonical_tiers() {
        let mut store = new_store();
        ok(
            store.write(AddressArg::List(key(&["a"])), t(tier), v_num(1.0)),
            "§1.6: no monotonicity bound",
        );
        assert_eq!(
            read_tier(&store, &key(&["a"]), tier),
            v_num(1.0),
            "§1.2/§1.6: the tier stands"
        );
    }
}

// §1.3 (P: §13 · A22) + §3.4 F-4 — a write whose value's kind contradicts the target container's kind
// fails ContainerKindConflict: a MAP target receiving an array.
// Drives: §1.3 (P, §13 · A22), §3.4 F-4
#[test]
fn s1_3_a_map_target_receiving_an_array_fails_container_kind_conflict() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["m"])),
            w_mem(),
            v_obj(&[("k", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    let e = failure(
        store.write(
            AddressArg::List(key(&["m"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 F-4",
    );
    assert_code(
        &e,
        "ContainerKindConflict",
        "§1.3: the kind is a property of the link",
    );
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v_obj(&[("k", v_num(1.0))]),
        "§0.2 DD-19: the container, the node and the journal are untouched"
    );
}

// §1.3 + §3.4 F-4 — the other direction: a VEC target receiving an object.
#[test]
fn s1_3_a_vec_target_receiving_an_object_fails_container_kind_conflict() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 W-4",
    );
    let e = failure(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_obj(&[("k", v_num(1.0))]),
        ),
        "§3.4 F-4",
    );
    assert_code(
        &e,
        "ContainerKindConflict",
        "§1.3: both directions share the ONE code (DD-19)",
    );
}

// §1.3 (P: §15 · A34) + §0.2 DD-8 — at most ONE child anchor per `(key, tier)`: an equal-tier write is
// the purge arm, so two versions of one key never share a pair.
// Drives: §1.3 (P, §15 · A34), §0.2 DD-8
#[test]
fn s1_3_at_most_one_child_anchor_per_key_and_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§0.2 DD-8: the version count does not grow"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(2.0),
        "§3.4 W-1: the pair is purged and re-minted"
    );
}

// §1.4 — `null` is OUTSIDE the admitted set: a write of it fails ValueNotAdmitted and mints no node.
#[test]
fn s1_4_a_write_of_null_fails_value_not_admitted() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_null()),
        "§3.4 F-2",
    );
    assert_code(&e, "ValueNotAdmitted", "§1.4: null is outside the taxonomy");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§1.4: no node is minted"
    );
}

// §1.4 — every other outside class answers the SAME code: undefined, a function, a symbol, a BigInt, a
// non-finite number, a cyclic object, a non-plain collection.
// Drives: §1.4
#[test]
fn s1_4_every_outside_value_class_fails_value_not_admitted() {
    let mut store = new_store();
    let outside: Vec<(&str, StoreValue)> = vec![
        ("undefined", v_undefined()),
        ("a function", v_function()),
        ("a symbol", v_symbol()),
        ("a BigInt", v_bigint()),
        ("NaN", v_nan()),
        ("+Infinity", v_infinity()),
        ("-Infinity", v_neg_infinity()),
        ("a cyclic object", v_cyclic()),
        ("a non-plain collection", v_non_plain_collection()),
    ];
    for (what, value) in outside {
        let e = failure(
            store.write(AddressArg::List(key(&["a"])), w_mem(), value),
            "§3.4 F-2",
        );
        assert_code(
            &e,
            "ValueNotAdmitted",
            "§1.4: the answer for each outside value is the SAME",
        );
        assert_eq!(
            read_at(&store, &empty_address()),
            v_obj(&[]),
            "§1.4: no node is minted for {what}"
        );
    }
}

// §1.4 — a finite number, integral or fractional, IS admitted and mints a leaf.
#[test]
fn s1_4_a_finite_number_integral_or_fractional_is_admitted() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["i"])), w_mem(), v_num(3.0)),
        "§1.4 class 3",
    );
    ok(
        store.write(AddressArg::List(key(&["f"])), w_mem(), v_num(3.5)),
        "§1.4 class 3",
    );
    assert_eq!(
        read_at(&store, &key(&["i"])),
        v_num(3.0),
        "§1.4: an integral number round-trips"
    );
    assert_eq!(
        read_at(&store, &key(&["f"])),
        v_num(3.5),
        "§1.4: a fractional number round-trips"
    );
}

// §1.4's last clause — a value that IS admitted but whose container kind contradicts the target's is a
// DIFFERENT failure: ContainerKindConflict, not ValueNotAdmitted.
// Drives: §1.4
#[test]
fn s1_4_a_kind_contradicting_admitted_value_is_not_value_not_admitted() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let e = failure(
        store.write(
            AddressArg::List(key(&["m"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 F-4",
    );
    assert_code(
        &e,
        "ContainerKindConflict",
        "§1.4: the kind rule decides whether it fits here",
    );
    assert_ne!(
        e.status, "ValueNotAdmitted",
        "§1.4: the taxonomy decides what may be stored at all"
    );
}

// §1.5 item 2 — NO COERCION: `"0"` is a string key and `0` is an index; they are never the same segment.
#[test]
fn s1_5_no_coercion_a_string_key_and_an_index_are_different_segments() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_arr(vec![v_str("zero")]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &vec![Segment::Key("v".into()), idx(0)]),
        v_str("zero"),
        "§1.5 item 3: an integer segment resolves against a VEC"
    );
    let e = failure(
        store.read(
            AddressArg::List(vec![Segment::Key("v".into()), Segment::Key("0".into())]),
            TierArg::Absent,
        ),
        "§1.5 item 3",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§1.5 item 3: a string segment resolves NOWHERE against a VEC",
    );
}

// §1.5 item 1 — the empty string `""` is a legal string segment and a legal key.
#[test]
fn s1_5_the_empty_string_is_a_legal_key() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&[""])), w_mem(), v_str("e")),
        "§1.5 item 1 (declared default)",
    );
    assert_eq!(
        read_at(&store, &key(&[""])),
        v_str("e"),
        "§1.5 item 1: `\"\"` is a legal key"
    );
}

// §1.5 item 4 + §4.2 R-5 — the empty address is VALID and resolves to the register; a read there returns
// an object containing the ENTIRE registry.
// Drives: §1.5 item 4, §4.2 R-5
#[test]
fn s1_5_a_read_at_the_empty_address_returns_the_entire_registry() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["b"])), w_file(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("a", v_num(1.0)), ("b", v_num(2.0))]),
        "§4.2 R-5: an object containing every register key"
    );
}

// §1.5 item 3 + §2.2 L-INT-REG — an integer segment aimed at the register fails AddressNotFound: the
// register carries no index semantics.
// Drives: §1.5 item 3, §2.2 L-INT-REG
#[test]
fn s1_5_an_integer_segment_aimed_at_the_register_fails_address_not_found() {
    let store = new_store();
    let e = failure(
        store.read(AddressArg::List(vec![idx(0)]), TierArg::Absent),
        "§2.2 L-INT-REG",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§1.6: the register is ALWAYS a hashmap",
    );
    assert_ne!(
        e.status, "ContainerKindConflict",
        "§1.5 item 3: not a contradicted container"
    );
}

// §1.3's key domain + §2.2 L-3 — an integer segment against a MAP matches no key: a MAP's key domain is
// string keys.
// Drives: §1.3, §2.2 L-3
#[test]
fn s1_3_an_integer_segment_against_a_map_fails_address_not_found() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["m"])),
            w_mem(),
            v_obj(&[("0", v_str("zero"))]),
        ),
        "§3.4 W-4",
    );
    let e = failure(
        store.read(
            AddressArg::List(vec![Segment::Key("m".into()), idx(0)]),
            TierArg::Absent,
        ),
        "§1.3 key domain + §2.2 L-3",
    );
    assert_code(&e, "AddressNotFound", "§1.3: a MAP holds string keys");
}

// §1.4 class 4 + §4.2 R-3 — a write of an array mints a branch whose container is a VEC, read back as a
// dense array in index order.
// Drives: §1.4 class 4, §4.2 R-3
#[test]
fn s1_4_an_array_write_mints_a_vec_branch() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_arr(vec![v_num(10.0), v_num(20.0)]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["v"])),
        v_arr(vec![v_num(10.0), v_num(20.0)]),
        "§4.2 R-3: index order, dense from 0"
    );
}
