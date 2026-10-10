//! `tests/walk_and_resolver.rs` — contract `§2` (`store-model.md §2`): `findAddress`, the walk arm by arm,
//! and the tier-selection rule the walk runs on.
//!
//! States enumerated for this concern, each driven below: `L-0` (the empty address); `L-1` (each outside
//! segment class); `L-2`/`L-5` (descent and exhaustion at depth 1 and depth n); `L-INT-REG`; `L-3` (no
//! anchor at the key); `L-TIER` (an anchor at the key, no passed tier matching); `L-4` (a leaf with
//! segments remaining); the zero-tier selection (lowest persistence); a passed any-match set of one and of
//! two; the tier-domain failure that precedes the walk.

mod support;
use support::*;

// §2.1 (P: §13 · A26) — `findAddress(address, tier?) → NodeRef` succeeds at a resolved address, and the
// reference's own anchor carries the tier `P-SM-4` (a) reads (`findAddress(address, t).anchor.tier === t`).
// Drives: §2.1 (P, §13 · A26)
#[test]
fn s2_1_find_address_resolves_a_minted_address_to_a_node_ref() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let r: &NodeRef = ok(
        store.findAddress(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§2.1: the resolver returns a reference to the store's own node",
    );
    assert_eq!(
        r.anchor.key,
        Segment::Key("a".into()),
        "§1.2: a ChildAnchor carries its key"
    );
    assert_eq!(
        r.anchor.tier,
        Tier::Mem,
        "§5.4 (a): the write's own tier is the addressed version's tier"
    );
}

// §2.1 — the ONE shared resolution function: `read`, `write`, `delete` and `watch` reach their target
// through it and through no second resolver. Driven as an agreement drive: the walk's answer and each
// verb's target agree about existence at one address.
// Drives: §2.1
#[test]
fn s2_1_read_and_find_address_agree_at_one_address() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    ok(
        store.findAddress(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§2.1: the shared resolver",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("v"),
        "§2.1: one resolver, one answer"
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§4.3: the delete reaches it through the walk",
    );
    let e = failure(
        store.findAddress(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§2.1: after the delete",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§2.1: the walk's answer is the store's answer",
    );
}

// §2.2 L-0 (P: §13 · A25) — `a.length === 0` terminates the walk immediately and resolves to the REGISTER;
// it is not a sentinel and not a failure.
// Drives: §2.2 L-0 (P, §13 · A25)
#[test]
fn s2_2_l0_the_empty_address_resolves_to_the_register() {
    let store = new_store();
    ok(
        store.findAddress(AddressArg::List(empty_address()), TierArg::Absent),
        "§2.2 L-0: not a failure",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§2.2 L-0: the walk resolves to the REGISTER"
    );
}

// §2.2 L-1 + §1.5 item 1 + PAR-1 — every outside segment class fails AddressMalformed, and no further
// segment is consumed.
// Drives: §2.2 L-1, §1.5 item 1
#[test]
fn s2_2_l1_every_outside_segment_class_fails_address_malformed() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let outside: Vec<(&str, Segment)> = vec![
        ("a negative integer", Segment::Negative(-1)),
        ("a non-integer number", Segment::Fractional(1.5)),
        ("null", Segment::Null),
        ("undefined", Segment::Undefined),
        ("a boolean", Segment::Bool(true)),
        ("an object", Segment::Object),
        ("an array", Segment::Array),
        ("a function", Segment::Function),
    ];
    for (what, segment) in outside {
        let e = failure(
            store.read(AddressArg::List(vec![segment]), TierArg::Absent),
            "§1.5 item 1 / PAR-1",
        );
        // **THE LABEL IS INTERPOLATED, NOT CARRIED AS A LITERAL** (`DEF-17`'s repair): the drive's own
        // `what` names the class under test, so the clause a reader sees must be the message the
        // interpolation produces — a plain literal would print `{what}` and leave the binding unread.
        assert_code(
            &e,
            "AddressMalformed",
            &format!("§2.2 L-1: {what} is outside the segment domain"),
        );
    }
}

// §2.2 L-1 + PAR-1 — an ABSENT address argument answers AddressMalformed as well (a required argument is
// missing) and also a non-array address value.
// Drives: §2.2 L-1
#[test]
fn s2_2_l1_an_absent_or_non_array_address_fails_address_malformed() {
    let store = new_store();
    for arg in [
        AddressArg::Absent,
        AddressArg::Null,
        AddressArg::Undefined,
        AddressArg::Str("a.b".into()),
        AddressArg::Number(1.0),
        AddressArg::Bool(true),
        AddressArg::Object,
        AddressArg::Function,
    ] {
        let e = failure(store.read(arg, TierArg::Absent), "PAR-1's outside list");
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-1: the address is not a segment array",
        );
    }
}

// §2.2 L-2 / L-5 — the walk descends one segment per step and succeeds when the address is exhausted, at
// depth 1 and at depth n.
// Drives: §2.2 L-2
#[test]
fn s2_2_l2_l5_the_walk_descends_and_terminates_when_the_address_is_exhausted() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_obj(&[("c", v_num(7.0))]))]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_obj(&[("c", v_num(7.0))]))]),
        "§2.2 L-5 at depth 1"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_obj(&[("c", v_num(7.0))]),
        "§2.2 L-2/L-5 at depth 2"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b", "c"])),
        v_num(7.0),
        "§2.2 L-5 at depth 3"
    );
}

// §2.2 L-3 — the container holds no anchor matching the key: the walk fails AddressNotFound and the
// remaining segments are consumed by no further step.
// Drives: §2.2 L-3
#[test]
fn s2_2_l3_a_missing_key_fails_address_not_found() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "missing"])), TierArg::Absent),
        "§2.2 L-3",
    );
    assert_code(&e, "AddressNotFound", "§2.2 L-3");
    let deep = failure(
        store.read(
            AddressArg::List(key(&["missing", "x", "y"])),
            TierArg::Absent,
        ),
        "§2.2 L-3's last clause",
    );
    assert_code(
        &deep,
        "AddressNotFound",
        "§2.2 L-3: the remaining segments are consumed by no further step",
    );
}

// §2.2 L-TIER + §0.2 DD-12 — the container holds an anchor at the key but no passed tier matches its tier:
// TierNotFound, distinct from L-3 because the key exists and the tier does not.
// Drives: §2.2 L-TIER, §0.2 DD-12
#[test]
fn s2_2_l_tier_a_key_present_at_another_tier_fails_tier_not_found() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), set(&[Tier::Mem])),
        "§2.2 L-TIER",
    );
    assert_code(
        &e,
        "TierNotFound",
        "§0.2 DD-12: the key exists and the tier does not",
    );
    assert_ne!(
        e.status, "AddressNotFound",
        "§2.2 L-TIER: distinct from L-3"
    );
}

// §2.2 L-4 — a leaf with segments remaining: the walk fails LeafHasNoDownstream ("fails verbosely").
#[test]
fn s2_2_l4_a_leaf_with_segments_remaining_fails_leaf_has_no_downstream() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_bool(true)),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b", "c"])), TierArg::Absent),
        "§2.2 L-4",
    );
    assert_code(
        &e,
        "LeafHasNoDownstream",
        "§1.1: leaf nodes cannot have downstream anchors",
    );
}

// §2.2 — the walk NEVER MUTATES THE STORE: a failing walk leaves the observable state identical.
#[test]
fn s2_2_the_walk_never_mutates_the_store() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let before = read_at(&store, &empty_address());
    let _ = store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent);
    let _ = store.read(
        AddressArg::List(vec![Segment::Bool(false)]),
        TierArg::Absent,
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        before,
        "§2.2: the walk never mutates the store"
    );
}

// §2.2 — the walk INSTALLS NOTHING on its way down (DD-5's "including below the failing segment").
#[test]
fn s2_2_the_walk_installs_nothing_on_its_way_down() {
    let mut store = new_store();
    let e = failure(
        store.read(AddressArg::List(key(&["x", "y", "z"])), TierArg::Absent),
        "§2.2 L-3",
    );
    assert_code(&e, "AddressNotFound", "§2.2 L-3");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§2.2: it never installs anything on its way down"
    );
}

// §2.3 — ZERO tiers passed selects the LOWEST-PERSISTENCE anchor at that key (`temp` before `mem` before
// `file`), and an EMPTY set is read as the zero-tier arm.
// Drives: §2.3
#[test]
fn s2_3_zero_tiers_select_the_lowest_persistence_anchor() {
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
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(3.0),
        "§2.3: rank ascending — temp first"
    );
    assert_eq!(
        ok(
            store.read(AddressArg::List(key(&["a"])), set_empty()),
            "§3.1.1: an empty set is the zero-tier arm"
        ),
        v_num(3.0),
        "§2.3: an empty set is read as the zero-tier arm (lowest persistence)"
    );
}

// §2.3 — ONE OR MORE tiers passed: the walk reads ANY node whose tier is ONE OF THE PASSED TIERS.
#[test]
fn s2_3_a_passed_tier_answers_the_node_at_that_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§2.3: an any-match set of one"
    );
}

// §2.3's declared default over the passed subset — when a key holds more than one passed tier, the SAME
// lowest-persistence rule applies to the passed subset.
// Drives: §2.3
#[test]
fn s2_3_a_passed_set_is_an_any_match_set_and_the_lowest_persistence_member_answers() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    assert_eq!(
        ok(
            store.read(AddressArg::List(key(&["a"])), set(&[Tier::File, Tier::Mem])),
            "§2.3: any-match set"
        ),
        v_num(2.0),
        "§2.3: the lowest-persistence member of the passed set answers"
    );
    assert_eq!(
        ok(
            store.read(AddressArg::List(key(&["a"])), set(&[Tier::File])),
            "§2.3: any-match set"
        ),
        v_num(1.0),
        "§2.3: the set is not a union, not an ordered preference and not a filter"
    );
}

// §2.3 — an anchor at the key but no passed tier matching answers TierNotFound; no anchor at the key at
// all answers AddressNotFound.
// Drives: §2.3
#[test]
fn s2_3_no_matching_tier_answers_tier_not_found_and_no_key_answers_address_not_found() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), set(&[Tier::Temp])),
        "§2.3",
    );
    assert_code(
        &e,
        "TierNotFound",
        "§2.3: the key exists and the tier does not",
    );
    let e2 = failure(
        store.read(AddressArg::List(key(&["zz"])), set(&[Tier::Temp])),
        "§2.3",
    );
    assert_code(&e2, "AddressNotFound", "§2.3: no anchor at the key at all");
}

// §3.1.1 (`read`/`findAddress` rows) — a token outside the domain fails OutOfDomainTier; the spellings
// `secure`, `Secure`, `FILE`, `disk`, `session` and `""` are each outside the domain.
// Drives: §3.1.1 (
#[test]
fn s2_3_a_token_outside_the_domain_fails_out_of_domain_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    for spelling in ["secure", "Secure", "FILE", "disk", "session", ""] {
        let e = failure(
            store.read(AddressArg::List(key(&["a"])), outside_token(spelling)),
            "§3.1.1",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "§5.1 M-2: the domain is closed at three",
        );
    }
}

// §2.1 + PAR-2 — the tier-domain failure fails BEFORE the walk begins, so a malformed address and an
// out-of-domain tier are answered by the tier check when the tier is outside the domain.
// Drives: §2.1
#[test]
fn s2_1_the_tier_domain_failure_precedes_the_walk() {
    let store = new_store();
    let e = failure(
        store.findAddress(AddressArg::List(key(&["a"])), outside_token("secure")),
        "§2.1: fails before the walk begins",
    );
    assert_code(
        &e,
        "OutOfDomainTier",
        "§2.1: the tier-domain failure precedes the walk",
    );
}

// PAR-2 — `null` and `undefined` as the reader's tier are not a tier value at all: AddressMalformed.
// Drives: § (no clause found)
#[test]
fn par_2_a_null_or_undefined_reader_tier_fails_address_malformed() {
    let store = new_store();
    for arg in [TierArg::Null, TierArg::Undefined] {
        let e = failure(
            store.read(AddressArg::List(key(&["a"])), arg),
            "PAR-2's declared answer",
        );
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-2: the shape is not a tier value at all",
        );
    }
}

// PAR-2 + §0.4 — a non-string, non-array scalar of another type and an array holding a non-string member
// are outside the domain and answer OutOfDomainTier. `§0.4` declares the non-string scalar's ONE Rust
// spelling as the unit variant `TierArg::NonString`; `TierSetItem::Number` is the spelling this drive needs
// for PAR-2's *"a non-string member of the array"* and is NOT among `§0.4`'s declared `TierSetItem` variants
// — reported at gate 3 as `CONTRACT FINDING G-1` (see `tests/support/mod.rs`).
// Drives: §0.4, §3.1.1
#[test]
fn par_2_a_non_string_reader_tier_fails_out_of_domain_tier() {
    let store = new_store();
    for arg in [
        TierArg::NonString,
        TierArg::Object,
        TierArg::Set(vec![TierSetItem::Number(1.0)]),
        TierArg::Set(vec![TierSetItem::Null]),
    ] {
        let e = failure(
            store.read(AddressArg::List(key(&["a"])), arg),
            "PAR-2's declared answer",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "PAR-2: a non-string member of the array is outside the domain",
        );
    }
}

// §2.3 — the walk's selection applies at EVERY step, not only at the register: a nested key holding two
// versions of the SAME key at two tiers answers the lowest-persistence one on an unqualified read. (The
// two versions stand under the parent's own version at each tier, `§3.2` item 2.)
#[test]
fn s2_3_the_selection_rule_holds_at_a_nested_step() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4 at mem",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 under the mem version",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_obj(&[])),
        "§3.4 W-5: the temp version",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_temp(), v_num(2.0)),
        "§3.4 W-3 under the temp version",
    );
    assert_eq!(
        read_tier(&store, &key(&["a", "b"]), Tier::Mem),
        v_num(1.0),
        "§2.3: the passed tier decides"
    );
    assert_eq!(
        read_tier(&store, &key(&["a", "b"]), Tier::Temp),
        v_num(2.0),
        "§2.3: the passed tier decides"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(2.0),
        "§2.3: the same rule at every step"
    );
}
