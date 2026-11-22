//! `tests/unit/store-core/change_detection.rs` — **`P-3`, CHANGE DETECTION ON WRITES: THE SIXTEEN CELLS OF
//! `docs/L3/change-detection/design.md` §6, AT THE SCOPE `D-5` DECLARES FOR THEM.** (`CD-14` and `CD-16` are
//! PACKAGE facts and stand at `tests/unit/js-constraints/change-detection.test.mjs`; so do `CD-12`'s and
//! `CD-13`'s halves that only the kernel and the receipt can observe — each cell below says which half it is.)
//!
//! **THE RULING THESE CELLS DRIVE** — `strata/decisions.md` · `D-193`, the architect, VERBATIM: *"P-3 checks
//! literal equivalence, not reference equality"*, and `D-195`: *"Take the default on the blocker and proceed"*.
//! **The comparison is ONE BOOLEAN on TWO LITERALS**, taken in `Store::write` immediately after `capture`,
//! `anchors` and `selected` are in hand (`src/store.rs`'s own clause): **the before literal is the ASSEMBLED
//! value of the LOWEST-RANK version standing at the pair** — the unqualified read's own answer, read out of the
//! `Vec<Captured>` the write already builds — **and the after literal is the `value` argument the act lands**;
//! **the relation is `StoreValue`'s derived `PartialEq`.** **The term goes INSIDE `registration_triggered` and
//! wraps the PREFIX ARM ALONE**, and both returned lists read it because they read one predicate.
//!
//! **THREE OF THESE CELLS ASSERT THE RULING'S PRICES AS DECLARED STATES, NOT AS DEFECTS** (`CD-2`, `CD-3`,
//! `CD-9`; `D-194` item 3 and `D-195` item 3): *"`file V` then `mem V` fires nothing although `readTiered`
//! moves"* (`D-193` item 3) and *"`0` over a standing `-0` fires nothing"* (`D-193` item 4). **A LATER PASS THAT
//! "FIXES" ONE OF THESE THREE REDDENS IT, AND THAT IS THE POINT OF THE CELL** — `D-193` item 3 says it in as
//! many words: *"a later pass must not 'fix' this as a defect"*.

// `D-5`'s move (`docs/L1/test-stratification.json`): this target stands two levels below `tests/integration/`,
// so the store's one scaffolding module is named by `#[path]` rather than by a `mod support;` beside it.
#[path = "../../integration/support/mod.rs"]
mod support;
use support::*;

use std::time::{Duration, SystemTime};

// ---------------------------------------------------------------------------------------------------
// `CD-1` — THE CANONICAL CASE.
// ---------------------------------------------------------------------------------------------------

/// **`CD-1` · THE CANONICAL CASE: a re-write of the literal already standing, at the same tier, answers
/// `triggered: []` and `watched: []` and leaves the value where it was — while the FIRST write's set carried
/// the handle.**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: make the second write's value `2`.** Then the literal moved, the
/// prefix arm admits the registration, and both lists carry the handle.
#[test]
fn cd_1_a_re_write_of_the_literal_already_standing_fires_nothing_and_keeps_the_value() {
    let mut store = new_store();
    let h = handle("cd-1");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12: a registration at the act's own address");

    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: a first write is a change — `Undefined` is not admitted, so the compare cannot succeed",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&h)),
        "CD-1: the FIRST write is a change and its `triggered` carries the registration's handle; got {:?}",
        triggered_handles(&first.triggered)
    );
    assert!(
        same_address_set(&first.watched, &[key(&["a"])]),
        "CD-1: and `watched` carries its address; got {:?}",
        first.watched
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-1/W-3: the equal-tier replacement is the same write with a narrower answer",
    );
    assert!(
        second.triggered.is_empty(),
        "CD-1: `D-193` item 1 — the second write lands the literal the address already answers, so the prefix \
         arm admits nobody; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        second.watched.is_empty(),
        "CD-1: and `watched` is its ADDRESS PROJECTION, so it is `[]` too (`D-195` item 1); got {:?}",
        second.watched
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "CD-1: the no-change write is still a write — the value stands, and the act is not a no-op"
    );
    assert!(
        !second.op.opId.is_empty(),
        "CD-1: and it still MINTS its op (`Q-3`'s default), so the record names the landing even where no \
         listener was told"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-2`, `CD-3` — `D-193` ITEM 3'S PRICE, IN BOTH DIRECTIONS. DECLARED STATES, NOT DEFECTS.
// ---------------------------------------------------------------------------------------------------

/// **`CD-2` · `D-193` ITEM 3'S PRICE, FIRST DIRECTION — `file 'V'` then `mem 'V'` FIRES NOTHING although
/// `readTiered` moves from `{_tier:'file'}` to `{_tier:'mem'}` and the address stands at TWO versions where it
/// stood at one.**
///
/// **THIS CELL EXISTS TO MAKE THAT RED A DECLARED STATE AND NOT A DEFECT** (`D-194` item 3): *"a literal
/// comparison of two strings cannot see the tier standing move, and the architect's reading accepts that"*
/// (`D-193` item 3). **THE ONE-LINE CHANGE THAT REDDENS IT: make the second write assert a non-empty
/// `triggered`** — which is exactly what a later pass "repairing" the price would write.
#[test]
fn cd_2_file_then_mem_fires_nothing_although_the_read_tier_moves_and_the_versions_grow() {
    let mut store = new_store();
    let h = handle("cd-2");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");

    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("V")),
        "§3.4 W-3 at `file`: the deeper version",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&h)),
        "CD-2: the `file` write is a first write and fires; got {:?}",
        triggered_handles(&first.triggered)
    );
    assert!(
        versions_at(&store, &key(&["a"])) == vec![Tier::File],
        "CD-2: BEFORE — the address stands at ONE version, at `file`; got {:?}",
        versions_at(&store, &key(&["a"]))
    );
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::File,
        "CD-2: BEFORE — `readTiered` answers `{{_tier:'file'}}`: the unqualified read's tier is `file`"
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("V")),
        "§3.4 W-5: `mem` may be added ALONGSIDE a `file` version — rank(`mem`) ≤ rank(`file`), so nothing is purged",
    );

    // ── THE PRICE, ASSERTED AS THE DECLARED STATE ────────────────────────────────────────────────────────
    assert!(
        second.triggered.is_empty(),
        "**CD-2 — `D-193` ITEM 3'S DECLARED PRICE, NOT A DEFECT**: the literal is `V` on both sides, so the \
         write is a no-change write and fires nothing, EVEN THOUGH the per-tier standing moved. A red here is \
         a pass that \"repaired\" the price; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        second.watched.is_empty(),
        "CD-2: and `watched` narrows with it (`D-195` item 1); got {:?}",
        second.watched
    );

    // ── AND WHAT MOVED BESIDE IT, SO THE PRICE IS ON THE RECORD RATHER THAN MERELY ALLOWED ─────────────────
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::Mem,
        "CD-2: AFTER — `readTiered` answers `{{_tier:'mem'}}` where it answered `{{_tier:'file'}}`: the \
         unqualified read now answers the LOWER-rank version"
    );
    assert!(
        versions_at(&store, &key(&["a"])) == vec![Tier::File, Tier::Mem],
        "CD-2: AND THE ADDRESS STANDS AT TWO VERSIONS WHERE IT STOOD AT ONE — the standing moved and no \
         listener was told (`D-193` item 3: *\"a later pass must not 'fix' this as a defect\"*); got {:?}",
        versions_at(&store, &key(&["a"]))
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("V"),
        "CD-2: and the read still answers `V`, which is the whole of why the comparison saw no change"
    );
}

/// **`CD-3` · THE PRICE'S SECOND DIRECTION — `mem 'V'` then `file 'V'` FIRES NOTHING although the `mem`
/// version is PURGED, so the address stands at one version where it stood at one, at another tier.**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert that the purge fires** — a pass reading the tier standing as a
/// change would. **This cell exists for the same reason `CD-2` does** (`D-194` item 3).
#[test]
fn cd_3_mem_then_file_fires_nothing_although_the_mem_version_is_purged() {
    let mut store = new_store();
    let h = handle("cd-3");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");

    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("V")),
        "§3.4 W-3 at `mem`: the shallower version",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&h)),
        "CD-3: the `mem` write is a first write and fires; got {:?}",
        triggered_handles(&first.triggered)
    );
    assert!(
        versions_at(&store, &key(&["a"])) == vec![Tier::Mem],
        "CD-3: BEFORE — ONE version, at `mem`; got {:?}",
        versions_at(&store, &key(&["a"]))
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("V")),
        "§3.4 W-6: the `file` write PURGES the `mem` version (rank ≤ rank(write tier), `:2937`–`:2941`)",
    );

    // ── THE PRICE, ASSERTED AS THE DECLARED STATE ────────────────────────────────────────────────────────
    assert!(
        second.triggered.is_empty(),
        "**CD-3 — `D-193` ITEM 3'S DECLARED PRICE IN THE OTHER DIRECTION**: the `mem` version is DESTROYED and \
         the literal is `V` on both sides, so no listener is told. A red here is a pass that \"repaired\" the \
         price; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        second.watched.is_empty(),
        "CD-3: and `watched` narrows with it (`D-195` item 1); got {:?}",
        second.watched
    );

    // ── AND THE PURGE ITSELF, SO THE PRICE IS MEASURED AND NOT ASSUMED ────────────────────────────────────
    assert!(
        versions_at(&store, &key(&["a"])) == vec![Tier::File],
        "CD-3: AND THE ADDRESS STANDS AT ONE VERSION WHERE IT STOOD AT ONE, AT ANOTHER TIER — the `mem` \
         version is GONE; got {:?}",
        versions_at(&store, &key(&["a"]))
    );
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::File,
        "CD-3: the surviving version is the `file` one"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("V"),
        "CD-3: and the read answers `V` before and after, which is what the comparison saw"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-4` — ABSENCE IS A CHANGE, AND IT NEEDS NO BRANCH.
// ---------------------------------------------------------------------------------------------------

/// **`CD-4` · A FIRST WRITE IS A CHANGE AND `Undefined` IS WHY** — `D-193` item 2: *"`Undefined` is not
/// admitted (`src/value.rs:39`–`:47`), so no admitted literal can compare equal to the absent state"*.
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: bind the listener AFTER the write, or assert `[]` on the first
/// write** — a comparison with a special absent branch would answer `[]` here.
#[test]
fn cd_4_a_first_write_is_a_change_because_undefined_is_not_admitted() {
    let mut store = new_store();
    // **THE PARENT IS A FIXTURE AND NOT THE CELL'S SUBJECT** — a write mints no intermediate node (`§3.2`), so
    // `['a','b']` can be created only under a standing `['a']`. The registration is made AFTER it, so the one
    // write this cell drives is the FIRST write at the address it listens at.
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent container, so `['a','b']` is writable at all",
    );
    let h = handle("cd-4");
    ok(
        store.listen(&h, &[key(&["a", "b"])]),
        "§6.5 item 12: a registration at the address the act will create",
    );
    assert!(
        store
            .read(AddressArg::List(key(&["a", "b"])), TierArg::Absent)
            .is_err(),
        "CD-4: BEFORE — the address does not resolve, so the pre-literal is `Undefined` (`present: false`)"
    );

    let w = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3/W-4: the first write at the address",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "CD-4: a first write is a CHANGE — no admitted literal compares equal to `Undefined`, so the prefix \
         arm admits the registration and `D-66`'s sentence declares the same fact beside the taxonomy; got {:?}",
        triggered_handles(&w.triggered)
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(1.0),
        "CD-4: and the value stands"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-5` — THE ANCESTOR GOES SILENT TOO (`O-3`'s default, taken by `D-195` item 2).
// ---------------------------------------------------------------------------------------------------

/// **`CD-5` · THE ANCESTOR GOES SILENT TOO — the second identical write at `['a','b']` reaches NEITHER the
/// registration at `['a']` nor the one at `['a','b']`, because the ancestor's ASSEMBLED value did not move
/// either.**
///
/// **THE DERIVATION** (`docs/L3/change-detection/design.md` §2.1; `O-3`'s default, taken by `D-195` item 2):
/// **the criterion sentence read whole says yes** — *"a pair is asked when the act CHANGES THE VALUE AT THE
/// PAIR'S ADDRESS"* (`strata/decisions.md:3765`–`:3766`) — **and the ancestor's value contains its subtree, and
/// that did not move.** **THE ONE-LINE CHANGE THAT REDDENS IT: assert that `hA` fires** — which is what a pass
/// that spared ancestors would write.
#[test]
fn cd_5_the_ancestor_goes_silent_too() {
    let mut store = new_store();
    let ancestor = handle("cd-5-a");
    let exact = handle("cd-5-ab");
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent container `['a']`, so `['a','b']` is writable — a fixture and not the subject",
    );
    ok(store.listen(&ancestor, &[key(&["a"])]), "§6.5 item 12: a strict ancestor");
    ok(store.listen(&exact, &[key(&["a", "b"])]), "§6.5 item 12: the act's own address");

    let first = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3/W-4",
    );
    assert!(
        same_handle_set(&first.triggered, &vec![ancestor.clone(), exact.clone()]),
        "CD-5: the FIRST write fires BOTH — the ancestor by the prefix arm and the exact registration by it \
         too (`D-56`, descendant-inclusive); got {:?}",
        triggered_handles(&first.triggered)
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-1: the same literal, at the same tier",
    );
    assert!(
        second.triggered.is_empty(),
        "**CD-5 — THE ANCESTOR GOES SILENT TOO**: `hA` is NOT reached, because `['a']`'s assembled value \
         contains the unchanged subtree and did not move (`O-3`'s default, taken by `D-195` item 2). A red \
         here is a pass that spared ancestors — a different address than the registration's own; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        second.watched.is_empty(),
        "CD-5: and `watched` names no address either; got {:?}",
        second.watched
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-6` — THE TOUCHED ARM STANDS (`Q-6`'s default). THE CELL THAT CATCHES THE RISKIEST LINE.
// ---------------------------------------------------------------------------------------------------

/// **`CD-6` · THE TOUCHED ARM IS NOT NARROWED — a second IDENTICAL STRUCTURED write still fires the
/// registration BELOW it, because those nodes *"exist after the write and did not before"* (`D-66`).**
///
/// **THIS IS THE CELL THAT CATCHES THE DESIGN'S RISKIEST LINE** (`docs/L3/change-detection/design.md` §9;
/// `D-194` item 5): a short-circuit of the two returned lists where `changed` is false — `if !changed {
/// (Vec::new(), Vec::new()) }` — reads as the same optimisation and silently narrows the TOUCHED arm. **THE
/// ONE-LINE CHANGE THAT REDDENS IT: assert `[]` on the second write**, or lift the value term over both arms.
#[test]
fn cd_6_the_touched_arm_is_not_narrowed_by_a_no_change_structured_write() {
    let mut store = new_store();
    let below = handle("cd-6");
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent container `['a']` — a fixture and not the subject, and the registration below is \
         made after it",
    );
    ok(
        store.listen(&below, &[key(&["a", "b", "c"])]),
        "§6.5 item 12: a registration at a node the act CREATES below itself",
    );
    let written = v_obj(&[("c", v_num(1.0)), ("d", v_num(2.0))]);

    let first = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), written.clone()),
        "§3.4 W-4: the structured write that creates `['a','b','c']`",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&below)),
        "CD-6: the first write creates the node and reaches it through the touched arm; got {:?}",
        triggered_handles(&first.triggered)
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), written),
        "§3.4 W-1: the SAME structured literal, at the same tier — a no-change write",
    );
    assert!(
        same_handle_set(&second.triggered, &one_handle(&below)),
        "**CD-6 — THE TOUCHED ARM STANDS (`Q-6`'s default; `D-66`'s own derivation)**: the second identical \
         structured write re-creates `['a','b','c']` and `['a','b','d']`, so the registration below is reached \
         BY THE CRITERION'S SECOND HALF and not by the first. `[]` here is the short-circuit that reads as an \
         optimisation and narrows the touched arm — the design's riskiest line; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        same_address_set(&second.watched, &[key(&["a", "b", "c"])]),
        "CD-6: and `watched` carries the touched registration's own address; got {:?}",
        second.watched
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_obj(&[("c", v_num(1.0)), ("d", v_num(2.0))]),
        "CD-6: and the value stands as written"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-7`, `CD-8` — THE RELATION'S TWO FREE PROPERTIES (`src/value.rs:15`).
// ---------------------------------------------------------------------------------------------------

/// **`CD-7` · CLASS-STRICTNESS — `1` then `'1'` FIRES**, because the variant tag is part of the compare.
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert `[]`** — a relation that coerced or compared by `Debug`
/// spelling would answer equal.
#[test]
fn cd_7_the_relation_is_class_strict_so_a_number_and_a_string_are_a_change() {
    let mut store = new_store();
    let h = handle("cd-7");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("1")),
        "§3.4 W-1: the equal-tier replacement by a value of another CLASS",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "CD-7: `StoreValue`'s derived `PartialEq` is CLASS-STRICT — the variant tag is part of the compare — so \
         `1` and `'1'` are two literals and the act is a change; got {:?}",
        triggered_handles(&w.triggered)
    );
}

/// **`CD-8` · KEY-ORDER BLINDNESS — `{x,y}` then `{y,x}` is SILENT**, because `Object` is a `BTreeMap`.
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert a fire** — or bind the listener at a MEMBER
/// (`['a','x']`), where the touched arm would fire it for the right reason and this cell's subject would be
/// gone.
#[test]
fn cd_8_the_relation_is_key_order_blind_so_a_reordered_object_is_not_a_change() {
    let mut store = new_store();
    let h = handle("cd-8");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("x", v_num(1.0)), ("y", v_num(2.0))]),
        ),
        "§3.4 W-3",
    );
    let w = ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("y", v_num(2.0)), ("x", v_num(1.0))]),
        ),
        "§3.4 W-1: the same members, handed in the other order",
    );
    assert!(
        w.triggered.is_empty(),
        "CD-8: `Object` is a `BTreeMap` (`src/value.rs:22`), so structural equality is key-order-insensitive BY \
         CONSTRUCTION and the reordered object is the same literal; got {:?}",
        triggered_handles(&w.triggered)
    );
    assert!(
        w.watched.is_empty(),
        "CD-8: and `watched` is empty with it; got {:?}",
        w.watched
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-9` — `D-193` ITEM 4'S PRICE: `0` OVER A STANDING `-0`. A DECLARED STATE, NOT A DEFECT.
// ---------------------------------------------------------------------------------------------------

/// **`CD-9` · `D-193` ITEM 4'S PRICE — `0` written over a standing `-0` FIRES NOTHING, and the two relations'
/// DISAGREEMENT is asserted beside it so it is on the record.**
///
/// **THE TWO SHIPPED RELATIONS, NAMED:** the store's `PartialEq` says `-0 == 0` (**inherited through `f64`**),
/// and the package's `sameStanding` (`bindings/js/src/entry/constraints.mjs:3642`–`:3643`) says they DIFFER
/// (**`Object.is`**). **`D-193` item 4 takes the store's, and this cell asserts the other beside it.**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert a fire** — which is what a pass reading `Object.is` into the
/// store would write.
#[test]
fn cd_9_zero_over_a_standing_negative_zero_fires_nothing_while_the_two_relations_disagree() {
    let mut store = new_store();
    let h = handle("cd-9");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(-0.0)),
        "§3.4 W-3: the standing `-0`",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(0.0)),
        "§3.4 W-1: `0` over a standing `-0`",
    );

    // ── THE PRICE, ASSERTED AS THE DECLARED STATE ────────────────────────────────────────────────────────
    assert!(
        w.triggered.is_empty(),
        "**CD-9 — `D-193` ITEM 4'S DECLARED PRICE**: the store's `PartialEq` says `-0 == 0`, so the write is a \
         no-change write and fires nothing. A red here is a pass that \"repaired\" the price; got {:?}",
        triggered_handles(&w.triggered)
    );
    assert!(
        w.watched.is_empty(),
        "CD-9: and `watched` narrows with it (`D-195` item 1); got {:?}",
        w.watched
    );

    // ── AND THE TWO RELATIONS' DISAGREEMENT, ON THE RECORD ────────────────────────────────────────────────
    let store_relation_says_equal = v_num(0.0) == v_num(-0.0);
    let object_is_says_different = 0.0f64.to_bits() != (-0.0f64).to_bits();
    assert!(
        store_relation_says_equal,
        "CD-9: `src/value.rs:15`'s derived `PartialEq` inherits `f64`'s `-0 == 0` — the store's relation"
    );
    assert!(
        object_is_says_different,
        "CD-9: and the reversal's judgement's relation differs at that same value — `sameStanding`'s `Object.is` \
         (`constraints.mjs:3642`–`:3643`), spelled here as the two bit patterns, which are not the same bits"
    );
    assert!(
        store_relation_says_equal && object_is_says_different,
        "**CD-9 — `D-193` ITEM 4'S TWO ANSWERS TO ONE QUESTION, RECORDED AS THE PRICE OF THE READING AND NOT \
         RE-DECIDED**: the store fires nothing and a reversal's judgement would call the same pair moved"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-10` — THE `file` SAVE STANDS (`Q-8`'s default, `O-5` taken by `D-195` item 2).
// ---------------------------------------------------------------------------------------------------

fn modified(path: &str) -> SystemTime {
    std::fs::metadata(path)
        .expect("CD-10: the store's own image must exist")
        .modified()
        .expect("CD-10: the platform reports a modification time")
}

/// **`CD-10` · THE SAVE STANDS — a no-change `file`-tier write still performs the durable act: the file's
/// BYTES are identical and its MTIME MOVES.**
///
/// **THE MECHANISM** (`docs/L3/change-detection/design.md` §3 row 6): `save_owed`'s FIRST DISJUNCT answers
/// `true` before any departure test (`src/store.rs:1951`–`:1953`), so `commit_file` reaches `write_file` — and
/// **the save is reachable BECAUSE the op was minted** (`Q-3`), which is why it is a composition of `Q-3` and
/// `Q-8` and not either one. **`D-106` item 2's rule has a FALSE ANTECEDENT here and is therefore neither
/// obeyed nor broken** (`O-5`'s default: it still saves).
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert the mtime is unmoved**, or skip the save on a no-change arm.
#[test]
fn cd_10_a_no_change_file_write_still_saves_identical_bytes_with_a_moved_mtime() {
    let path = fresh_path("cd-10");

    // **A COARSE-CLOCK GUARD, STATED SO THE CELL IS NOT FLAKY AND NOT WEAKER**: the assertion is that the
    // mtime MOVED, so a filesystem whose timestamp granularity exceeds this drive's own delay would redden a
    // correct tree. The probe measures the granularity on the same directory and widens the delay once if it
    // must — and it asserts nothing about the store.
    let probe = fresh_path("cd-10-probe");
    std::fs::write(&probe, b"probe").expect("CD-10: a writable directory");
    let probe_before = modified(&probe);
    std::thread::sleep(Duration::from_millis(20));
    std::fs::write(&probe, b"probe").expect("CD-10: a writable directory");
    let coarse = modified(&probe) == probe_before;

    let mut store = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.1: a `filePath` register, so a `file`-tier write is in domain",
    );
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3 at `file`",
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &first.op.opId),
        "§2.11 clause 2: the `file`-tier commit is the TERMINAL ARM's own act, and a Rust-side drive performs it",
    );
    let bytes_before = std::fs::read(&path).expect("CD-10: the first save wrote the image");
    let mtime_before = modified(&path);

    if coarse {
        std::thread::sleep(Duration::from_millis(1100));
    } else {
        std::thread::sleep(Duration::from_millis(20));
    }

    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-1: the same literal at the same tier — a no-change write",
    );
    assert!(
        second.triggered.is_empty(),
        "CD-10: the write IS a no-change write; got {:?}",
        triggered_handles(&second.triggered)
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &second.op.opId),
        "**CD-10 — THE SAVE STANDS (`Q-8`'s default)**: the no-change write's op was MINTED, so the terminal \
         arm's gate finds `answer.op` and the save is reachable",
    );

    let bytes_after = std::fs::read(&path).expect("CD-10: the second save rewrote the image");
    let mtime_after = modified(&path);

    assert_eq!(
        bytes_before, bytes_after,
        "CD-10: the bytes are IDENTICAL — the act moved no durable datum"
    );
    assert!(
        mtime_after > mtime_before,
        "**CD-10 — THE FILE WAS REWRITTEN**: the mtime MOVED ({mtime_before:?} → {mtime_after:?}). A red here \
         is a pass that skipped the save on a no-change arm — `O-5`'s default is that it still saves"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-11` — THE OP IS MINTED (`Q-3`'s default), AND `P-TP-8` (g) HOLDS BECAUSE OF IT.
// ---------------------------------------------------------------------------------------------------

/// **`CD-11` · THE JOURNAL OP IS STILL MINTED — the second identical write's `op` is present, its `opId`
/// RESOLVES through `rollback` without `JournalOpUnknown`, and `seq` advanced.**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert `op` is absent**, or make `WriteRecord.op` optional — the
/// published-member break `D-193` item 5's `Q-3` refused.
#[test]
fn cd_11_a_no_change_write_still_mints_its_op_and_the_id_still_resolves() {
    let mut store = new_store_with_journal(8);
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-1: a no-change write",
    );

    assert!(
        second.triggered.is_empty(),
        "CD-11: the act is a no-change write; got {:?}",
        triggered_handles(&second.triggered)
    );
    assert!(
        !second.op.opId.is_empty() && second.op.opId != first.op.opId,
        "CD-11: **AN OP IS STILL MINTED (`Q-3`)** — the no-change write answers its own op id ({} against {}), \
         so `WriteRecord.op` stays non-optional and no published member moves",
        second.op.opId,
        first.op.opId
    );
    assert!(
        second.op.seq > first.op.seq,
        "CD-11: and `seq` STILL BUMPS ({} → {}) — the entry was appended, so the compaction can still drop the \
         oldest one",
        first.op.seq,
        second.op.seq
    );

    let r = ok(
        store.rollback(OpIdArg::Id(second.op.opId.clone())),
        "**CD-11 — `P-TP-8` (g) HOLDS BECAUSE `Q-3` MINTS**: `rollback(opId)` does not fail \
         `JournalOpUnknown` on a no-change write's own op id",
    );
    assert_eq!(
        r.opId, second.op.opId,
        "CD-11: the reversal names the op it was given"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "CD-11: and the state it restores is the state that stood — the value was equal on both sides"
    );
}

// ---------------------------------------------------------------------------------------------------
// `CD-12`, `CD-13`, `CD-15` — the pass's set, the receipt's census, and the projection law.
// ---------------------------------------------------------------------------------------------------

/// **`CD-12` · THE PASS IS SILENCED WITH THE FIRING (`Q-5`'s default) — THIS CELL DRIVES THE STORE-SIDE HALF
/// AND NAMES THE OTHER ONE.**
///
/// **THE STORE'S HALF IS THE WHOLE MECHANISM**: the kernel's pass evaluates **`record.triggered`**
/// (`bindings/js/src/entry/kernel-attempt.mjs:669`–`:670`), which `kernel-commit.mjs:187`–`:188` takes VERBATIM
/// from the store's answer — **so a store-side narrowing IS the pass's narrowing and no package byte moves**
/// (`D-69`: one predicate, in the store). **WHAT THIS CELL THEREFORE ASSERTS:** the no-change write's returned
/// set is `[]` **even with a constraint pair registered at that address and a listener beside it**, and the
/// write still PASSES. **THE RECEIPT'S HALF — `record.log` carrying no `constraint-check` entry and one
/// `commit` entry — is `kernel-attempt.mjs`'s and is driven at
/// `tests/unit/js-constraints/change-detection.test.mjs`'s `CD-12` (the kernel's own scope `D-5` names).**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert the pair was asked** — which is the one consequence `D-193`
/// item 5's `Q-5` names in as many words (*"a write a pair would have refused on must not become admissible
/// because its value was equal"* — the pass cannot ask what the store does not return).
#[test]
fn cd_12_the_store_side_set_is_empty_for_a_no_change_write_beside_a_registered_pair() {
    let pairs = ConstraintsArg::List(vec![ConstraintEntry::Pair {
        address: key(&["a"]),
        id: "cd-12-pair".to_string(),
    }]);
    let mut store = ok(
        storeCreateWithConstraints(&cfg_at(&fresh_path("cd-12"), 8), &pairs),
        "§7.1 step 4-bis: the supplied `constraints` list is valid",
    );
    let h = handle("cd-12");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");

    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "**CD-12 — THE WRITE PASSES**: the pair is not asked, so nothing is refused, nothing is repaired and \
         nothing is credited (`D-117`'s order never starts)",
    );
    assert!(
        w.triggered.is_empty(),
        "**CD-12 — THE PASS'S EVALUATED SET IS THE STORE'S RETURNED SET (`Q-5`'s default)**: the no-change \
         write answers `[]`, so the kernel asks no pair at `['a']`; got {:?}",
        triggered_handles(&w.triggered)
    );
    assert!(
        w.watched.is_empty(),
        "CD-12: and `watched` narrows with it; got {:?}",
        w.watched
    );
    assert!(
        !w.op.opId.is_empty(),
        "CD-12: the act is still an act — it minted its op and it stands"
    );
}

/// **`CD-13` · THE RECEIPT'S CENSUS, THE STORE'S HALF — a no-change write's record is the SAME THREE MEMBERS
/// with the SAME shapes, and the delete's receipt is the same four.**
///
/// **NO MEMBER IS MINTED BY THIS UNIT** (`O-4`'s default (i): the `changed` flag was priced and declined), so
/// **the write's record is still `{op, watched, triggered}`** — destructured below, which is a compile-time
/// census in Rust — **and the no-change arm differs from the ordinary arm in the two LISTS' contents and in
/// nothing else.** **THE PACKAGE-SIDE HALF — `Object.keys` reading `["op","watched","triggered"]`,
/// `Object.getOwnPropertyNames` reading SEVEN, `log[0].kind === 'commit'`, `discarded` `[]` and the two frozen
/// `{}`s — is driven at `tests/unit/js-constraints/change-detection.test.mjs`'s `CD-13`, where those members
/// exist.**
///
/// **THE ONE-LINE CHANGE THAT REDDENS IT: assert `log` is `[]`, or assert `bodyFailures` is absent, or mint a
/// fourth member on the record.**
#[test]
fn cd_13_the_receipt_census_is_unmoved_on_the_no_change_arm() {
    let mut store = new_store();
    let h = handle("cd-13");
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");

    // THE ORDINARY WRITE — three members, both lists populated.
    let ordinary = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let WriteResult {
        op: ordinary_op,
        watched: ordinary_watched,
        triggered: ordinary_triggered,
    } = ordinary;
    assert!(
        !ordinary_op.opId.is_empty() && !ordinary_watched.is_empty() && !ordinary_triggered.is_empty(),
        "CD-13: the ordinary write's record carries its three members with both lists populated"
    );

    // THE NO-CHANGE WRITE — the SAME three members, the two lists empty.
    let no_change = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-1",
    );
    let WriteResult {
        op: no_change_op,
        watched: no_change_watched,
        triggered: no_change_triggered,
    } = no_change;
    assert!(
        !no_change_op.opId.is_empty(),
        "CD-13: `op` is PRESENT on the no-change arm — the member is non-optional (`Q-3`)"
    );
    assert!(
        no_change_watched.is_empty() && no_change_triggered.is_empty(),
        "CD-13: and the only difference is the two LISTS' contents — no member is added, renamed or removed by \
         this unit; got watched {:?} / triggered {:?}",
        no_change_watched,
        triggered_handles(&no_change_triggered)
    );

    // THE DELETE'S RECEIPT — four members, and the D-3 arm's `[]` is unmoved by this unit.
    let d = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§4.3: the delete is the second trigger event",
    );
    let DeleteReceipt {
        address,
        tiers,
        triggered: deleted_triggered,
        op: deleted_op,
    } = d;
    assert!(
        address == key(&["a"]) && tiers == vec![Tier::Mem] && deleted_op.is_some(),
        "CD-13: the delete's receipt is the same four members, and the removal is journalled"
    );
    assert!(
        same_handle_set(&deleted_triggered, &one_handle(&h)),
        "CD-13: and the delete's `triggered` is UNMOVED by `P-3` — it answers the act's value position `true`, \
         because a delete that reaches it removed at least one version; got {:?}",
        triggered_handles(&deleted_triggered)
    );
}

/// **`CD-15` · THE PROJECTION LAW SURVIVES — `watched` equals the ADDRESSES of `triggered` AS SETS, and on a
/// no-change write with three registrations at three prefixes BOTH ARE `[]`.**
///
/// **THE LAW** (`src/store.rs:2567`–`:2570`, `DD-22`): *"the two lists must be produced by ONE predicate or the
/// projection is false"* — and `D-195` item 1 moved `P-TP-8` (e) with (a) **in the same bounded amendment for
/// exactly that reason**. **THE ONE-LINE CHANGE THAT REDDENS IT: assert a non-empty `watched` beside an empty
/// `triggered`** — the incoherence `P-3`'s own §7 item 2 refuses by name.
#[test]
fn cd_15_watched_is_the_address_projection_of_triggered_on_a_no_change_write() {
    let mut store = new_store();
    // **THE TWO PARENTS ARE FIXTURES AND NOT THE SUBJECT** — `['a','b','c']` is writable only under standing
    // `['a']` and `['a','b']` containers (`§3.2`: a write mints no intermediate node).
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent container `['a']`",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent container `['a','b']`",
    );
    for (tag, address) in [
        ("cd-15-a", key(&["a"])),
        ("cd-15-b", key(&["a", "b"])),
        ("cd-15-c", key(&["a", "b", "c"])),
    ] {
        ok(
            store.listen(&handle(tag), &[address]),
            "§6.5 item 12: three registrations at three prefixes of the act's address",
        );
    }

    let first = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(1.0)),
        "§3.4 W-3/W-4",
    );
    assert!(
        first.triggered.len() == 3 && first.watched.len() == 3,
        "CD-15: the FIRST write fires all three and `watched` names all three addresses ({} / {})",
        first.triggered.len(),
        first.watched.len()
    );
    assert!(
        same_address_set(&first.watched, &triggered_addresses(&first.triggered)),
        "CD-15: and `watched` IS the address projection of `triggered` on the moving arm too; got {:?} against {:?}",
        first.watched,
        triggered_addresses(&first.triggered)
    );

    let second = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(1.0)),
        "§3.4 W-1: the same literal at the same tier",
    );
    assert!(
        second.triggered.is_empty() && second.watched.is_empty(),
        "**CD-15 — THE PROJECTION LAW SURVIVES (`D-195` item 1)**: both lists are `[]`, so no member is added \
         to one and omitted from the other; got {} / {:?}",
        second.triggered.len(),
        second.watched
    );
    assert!(
        same_address_set(&second.watched, &triggered_addresses(&second.triggered)),
        "CD-15: the projection holds at both ends — empty equals empty"
    );
}
