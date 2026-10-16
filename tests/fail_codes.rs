//! `tests/fail_codes.rs` — contract `§8` (`seams-and-lifecycle.md §8`): the CLOSED **16**-member code set with
//! each member's trigger, the complement block with the two deliberately absent codes, the generated
//! message rule with its clause table and its three worked examples, and the `StoreError` record shape.
//!
//! **⟶ RE-DERIVED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT): the set
//! closes at `15` members.** **`FilePathUnreachable` (`A53`'s *"Add new failure code"*, `A54`'s *"Default
//! name"*) is inserted at rank `13` in the CONSTRUCTION GROUP beside `ConstructionArgumentMissing`, so
//! `ValueNotAdmitted` moves `13 → 14` and `FileCommitFailed` moves `14 → 15` and NO TRIGGER MOVES**
//! (`§8.1`'s arithmetic at that amendment: `11 + 2 + 1 + 1 = 15` ✓; `DD-40`). **The two renumbered drives
//! below carry their new rank in their own names, and the closure drive's `14`-member assertions move to
//! `15`.**
//!
//! **⟶ AND WIDENED TO `16` 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class; `DEF-2026-10-15-X`
//! item 4): THE FIGURE ABOVE IS A SUPERSEDED STEP AND THE SET'S OWN FIGURE IS THE AMENDED HEADING'S.**
//! `§8.1` now reads **`16` members with each member's trigger** and its arithmetic is
//! **`11 + 2 + 1 + 1 + 1 = 16` ✓** — the sixth member of the CONSTRUCTION GROUP's `2` becoming `3` — while
//! **every rank this header names stands where it named it** (`FilePathUnreachable` `13`,
//! `ValueNotAdmitted` `14`, `FileCommitFailed` `15`) **and the new member takes `16` after them** (`§7.1`
//! step 4-bis; `§7.2` item 5 ADDED 2026-10-15; `parameter-semantics.md §2.21`). **NO MEMBER IS RENAMED.**
//!
//! States enumerated for this concern, each driven below: one drive per member of the closed set (16 —
//! `FilePathUnreachable` at rank `13` is the member the listener amendment authored, `A53`/`A54`;
//! `FileCommitFailed` at rank `15` is the member the second bounded amendment authored, `DD-25`;
//! `ConstraintListInvalid` at rank `16` is the member the `constraints` key's amendment authored);
//! the three worked examples' message forms; the generator's determinism, its dependence on the trigger's
//! arguments, its completeness and its no-placeholder property; the error record's two members and the
//! exact spelling of `status`; the eight non-failures of the complement block; the two absent codes.

mod support;
use support::*;

// §8.1 #1 — AddressMalformed: a segment outside §1.5's domain (`L-1`); an absent required argument
// (`write` with no `tier`); a present construction argument outside its domain.
// Drives: §8.1, §1.5
#[test]
fn s8_1_1_address_malformed_has_three_triggers_and_one_code() {
    let mut store = new_store();
    let l1 = failure(
        store.read(
            AddressArg::List(vec![Segment::Negative(-1)]),
            TierArg::Absent,
        ),
        "§2.2 L-1",
    );
    assert_code(
        &l1,
        "AddressMalformed",
        "§8.1 #1: a segment outside §1.5's domain",
    );
    let absent = failure(
        store.write(AddressArg::List(key(&["a"])), none(), v_num(1.0)),
        "§3.4 F-1",
    );
    assert_code(
        &absent,
        "AddressMalformed",
        "§8.1 #1: an absent required argument",
    );
    let construction = failure(storeCreate(&cfg_at("", 4)), "§7.1");
    assert_code(
        &construction,
        "AddressMalformed",
        "§8.1 #1: a present construction argument outside its domain",
    );
}

// §8.1 #2 — AddressNotFound: the walk found no anchor at the segment's key (`L-3`); an integer segment
// aimed at the register (`L-INT-REG`).
// Drives: §8.1
#[test]
fn s8_1_2_address_not_found_has_the_walk_and_register_triggers() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let l3 = failure(
        store.read(AddressArg::List(key(&["nope"])), TierArg::Absent),
        "§2.2 L-3",
    );
    assert_code(
        &l3,
        "AddressNotFound",
        "§8.1 #2: the walk found no anchor at the key",
    );
    let reg = failure(
        store.read(AddressArg::List(vec![idx(0)]), TierArg::Absent),
        "§2.2 L-INT-REG",
    );
    assert_code(
        &reg,
        "AddressNotFound",
        "§8.1 #2: an integer segment aimed at the register",
    );
}

// §8.1 #3 — LeafHasNoDownstream: the walk stood on a leaf with segments remaining (`L-4`).
#[test]
fn s8_1_3_leaf_has_no_downstream_fires_at_a_leaf_with_segments_remaining() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§2.2 L-4",
    );
    assert_code(&e, "LeafHasNoDownstream", "§8.1 #3");
}

// §8.1 #4 — TierNotFound: the walk found an anchor at the key but no passed tier matches its tier
// (`L-TIER`); a read whose passed tier set matches no version at an existing address (`DD-12`).
// Drives: §8.1
#[test]
fn s8_1_4_tier_not_found_has_the_walk_and_read_triggers() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    let l_tier = failure(
        store.read(AddressArg::List(key(&["a"])), set(&[Tier::Mem])),
        "§2.2 L-TIER",
    );
    assert_code(
        &l_tier,
        "TierNotFound",
        "§8.1 #4: an anchor at the key, no passed tier matching",
    );
    let dd12 = failure(
        store.read(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§0.2 DD-12",
    );
    assert_code(
        &dd12,
        "TierNotFound",
        "§8.1 #4: no fall-through to the lowest-persistence version",
    );
}

// §8.1 #5 — OutOfDomainTier: a tier argument outside `{file, mem, temp}`; a write or delete whose tier is
// an array (any length); a non-string tier.
// Drives: §8.1
#[test]
fn s8_1_5_out_of_domain_tier_has_the_tier_argument_triggers() {
    let mut store = new_store();
    let outer = failure(
        store.read(AddressArg::List(key(&["a"])), outside_token("disk")),
        "§8.1 #5",
    );
    assert_code(
        &outer,
        "OutOfDomainTier",
        "§8.1 #5: outside {{file, mem, temp}}",
    );
    let array = failure(
        store.write(AddressArg::List(key(&["a"])), set(&[Tier::Mem]), v_num(1.0)),
        "§8.1 #5",
    );
    assert_code(&array, "OutOfDomainTier", "§8.1 #5: an array, any length");
    let non_string = failure(
        store.write(AddressArg::List(key(&["a"])), TierArg::Object, v_num(1.0)),
        "§8.1 #5",
    );
    assert_code(&non_string, "OutOfDomainTier", "§8.1 #5: a non-string tier");
}

// §8.1 #6 — ParentAnchorMonotonicityViolation: a write whose minted child anchor's tier would outrank its
// parent anchor's (`rank(child) > rank(parent)`; `F-6`). REACHABLE exactly because `§3.2` item 2's parent
// resolution is TIER-AGNOSTIC (`DD-27`): the parent is found BY ADDRESS ALONE, so a child CAN differ in tier
// from its parent, and the inverted pair is the state `§3.2` item 4 evaluates the clause at.
// Drives: §8.1 #6, §3.2 items 2 and 4
#[test]
fn s8_1_6_parent_anchor_monotonicity_violation_fires_at_an_inverted_pair() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    let e = failure(
        store.write(AddressArg::List(key(&["a", "b"])), w_file(), v_num(1.0)),
        "§3.4 F-6",
    );
    assert_code(
        &e,
        "ParentAnchorMonotonicityViolation",
        "§8.1 #6: rank(child) > rank(parent)",
    );
}

// §8.1 #7 — ContainerKindConflict: a write whose value's kind contradicts the target container's kind
// (`F-4`), in both directions, sharing the ONE code.
// Drives: §8.1
#[test]
fn s8_1_7_container_kind_conflict_fires_in_both_directions_with_one_code() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![])),
        "§3.4 W-4",
    );
    let map_target = failure(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_arr(vec![])),
        "§3.4 F-4",
    );
    assert_code(
        &map_target,
        "ContainerKindConflict",
        "§8.1 #7: a map target receiving an array",
    );
    let vec_target = failure(
        store.write(AddressArg::List(key(&["v"])), w_mem(), v_obj(&[])),
        "§3.4 F-4",
    );
    assert_code(
        &vec_target,
        "ContainerKindConflict",
        "§0.2 DD-19: both directions share the one code",
    );
}

// §8.1 #8 — ReadTargetIsBranch: `readLiteral(address, tier?)` — the literal-only read form — resolves its
// target to a branch.
//
// CONTRACT NOTE: `§4.1.1` now DECLARES the literal-only form's success shape ("ON SUCCESS it returns
// EXACTLY what `read` returns at a `leaf` — the leaf's stored value, THE ADMITTED LITERAL ITSELF"), so this
// drive covers the code and the drive below asserts admissibility; the exact-value assertion is recorded in
// the gate-3 report as a carry-over for the next red-set pass (this bounded remand re-derives named cells
// only, and adds no expectation here).
// Drives: §8.1, §4.1.1
#[test]
fn s8_1_8_read_target_is_branch_fires_on_the_literal_only_form_at_a_branch() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let e = failure(
        store.readLiteral(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§8.1 #8",
    );
    assert_code(
        &e,
        "ReadTargetIsBranch",
        "§8.1 #8: the literal-only form demands a leaf",
    );
}

// §8.1 #8 + §4.1.1 item 3 — the literal-only form at a LEAF does not raise ReadTargetIsBranch: the code
// exists because the form "demands a leaf", so a leaf target is admissible and `§4.1.1` item 2 declares its
// success value as the leaf's stored literal itself. (This drive asserts admissibility and no shape — the
// exact-value assertion is a carry-over named in the gate-3 report.)
// Drives: §8.1, §4.1.1
#[test]
fn s8_1_8_the_literal_only_form_admits_a_leaf_target() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let r = store.readLiteral(AddressArg::List(key(&["a"])), TierArg::Absent);
    if let Err(e) = r {
        assert!(
            CLOSED_CODES.contains(&e.status.as_str()),
            "§8.1: a failure outside the closed set is a violation (got {})",
            e.status
        );
        assert_ne!(
            e.status, "ReadTargetIsBranch",
            "§8.1 #8: the form demands a leaf, so a leaf is admissible"
        );
    }
}

// §8.1 #9 — WriteParentNotLink: the resolved parent cannot hold children — the `leaf`-parent state
// (`F-5`); a write whose target is the empty address and therefore has no key to install under.
// Drives: §8.1
#[test]
fn s8_1_9_write_parent_not_link_has_the_leaf_parent_and_empty_address_triggers() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let leaf_parent = failure(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_obj(&[])),
        "§3.4 F-5",
    );
    assert_code(
        &leaf_parent,
        "WriteParentNotLink",
        "§8.1 #9: the leaf-parent state",
    );
    let empty = failure(
        store.write(AddressArg::List(empty_address()), w_mem(), v_num(1.0)),
        "§3.2 item 4",
    );
    assert_code(
        &empty,
        "WriteParentNotLink",
        "§8.1 #9: no key to install under",
    );
}

// §8.1 #10 — JournalOpUnknown: `rollback` called with an `opId` the instance's journal does not hold.
#[test]
fn s8_1_10_journal_op_unknown_fires_on_an_unknown_id() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.rollback(OpIdArg::Id("fabricated".into())),
        "§6.4 M-11",
    );
    assert_code(&e, "JournalOpUnknown", "§8.1 #10");
}

// §8.1 #11 — RollbackCompacted: a rollback whose scope includes at least one `compacted` entry.
#[test]
fn s8_1_11_rollback_compacted_fires_on_a_compacted_scope() {
    let mut store = new_store_with_journal(1);
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1: the oldest is compressed",
    );
    let e = failure(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-6",
    );
    assert_code(&e, "RollbackCompacted", "§8.1 #11");
}

// §8.1 #12 — ConstructionArgumentMissing: **⟶ AMENDED 2026-10-11: the member's trigger is NARROWED, not
// deleted — the missing-argument arm now has ONE argument, `cfg.journalLength`** (`DD-17`'s operative form;
// `§7.1`'s amended construction sequence, step 2: *"CHECK `journalLength` FIRST, BECAUSE IT IS THE ONLY
// ARGUMENT WHOSE ABSENCE IS STILL AN ERROR"*). **AND THE NEGATIVE HALF IS DRIVEN WITH IT: an ABSENT
// `filePath` no longer produces this member at all — it is LEGAL and the register is created at `mem`**
// (`A49`; `§8.1` #13's own column: *"ABSENCE answers #12, PRESENCE with an unreachable path answers #13"*).
// Drives: §8.1 #12, §7.1 (amended), A49, DD-17
#[test]
fn s8_1_12_construction_argument_missing_fires_on_the_absent_journal_length() {
    let path = fresh_path("missing");
    let no_length = failure(
        storeCreate(&StoreConfig {
            filePath: FilePathArg::Path(path),
            journalLength: JournalLengthArg::Absent,
            listeners: ListenersArg::List(Vec::new()),
        }),
        "§8.1 #12",
    );
    assert_code(
        &no_length,
        "ConstructionArgumentMissing",
        "§8.1 #12: `cfg.journalLength` absent — the member's ONE remaining trigger",
    );
    ok(
        storeCreate(&StoreConfig {
            filePath: FilePathArg::Absent,
            journalLength: n_count(4),
            listeners: ListenersArg::List(Vec::new()),
        }),
        "A49/§7.1: an ABSENT `filePath` is LEGAL — this member's trigger does not reach it",
    );
}

// **⟶ ADDED 2026-10-11 — §8.1 #13 `FilePathUnreachable` (rank `13`, the CONSTRUCTION GROUP's second
// member), THE MEMBER THE AMENDMENT AUTHORED** (`A53`: *"Add new failure code"*; `A54`'s *"Default name"*
// fixes the spelling): **a `cfg.filePath` that was PROVIDED AND FAILS THE CONSTRUCTION-TIME REACHABILITY
// TEST** — `A52`'s two-armed disjunction (*"the file exists or the application can write it
// successfully"*) read with `A55`'s DRY RUN and WRITE-ACCESS requirement: **the path's parent directory does
// not exist; the path's directory or the file itself is not writable; the path IS a directory** (`DD-40`) —
// **delivered at construction, before any instance exists, with NO file, directory or byte created by the
// probe.** **AND THE MEMBER IS EXACTLY ONE: its trigger overlaps neither `ConstructionArgumentMissing`'s
// (ABSENCE, `#12`) nor `AddressMalformed`'s (PRESENCE with a shape outside the domain, `#1`)** (`§8.1` #13's
// own column; `§5.9`'s interaction map: *"the construction's reachability arm → `P-TP-9`"*).
// Drives: §8.1 #13, §7.1 (amended), §8.2's `FilePathUnreachable` row, A52, A53, A54, A55, DD-40, §5.9
#[test]
fn s8_1_13_file_path_unreachable_fires_on_the_construction_reachability_test() {
    // The three unreachable forms `DD-40` and `A55` name, each with its own path shape.
    let absent_parent = format!("{}/x.json", fresh_path("fc-nodir"));
    let read_only = fresh_path("fc-readonly");
    std::fs::write(&read_only, b"{}").expect("the path holds a file");
    let mut perms = std::fs::metadata(&read_only)
        .expect("the file's metadata")
        .permissions();
    perms.set_readonly(true);
    std::fs::set_permissions(&read_only, perms).expect("the file is now read-only");
    let is_a_directory = fresh_path("fc-dir");
    std::fs::create_dir(&is_a_directory).expect("the path is now a directory");

    let mut reached = 0;
    for (what, path) in [
        ("the parent directory does not exist", absent_parent.clone()),
        ("the file is existing but READ-ONLY", read_only.clone()),
        ("the path IS a directory", is_a_directory.clone()),
    ] {
        // `A55`: write access is REQUIRED, so an existing but read-only file fails where the process cannot
        // write it; where the process CAN write it (a privileged process), `A52`'s arm (b) governs.
        let app_can_write = std::fs::OpenOptions::new().write(true).open(&path).is_ok();
        match storeCreate(&cfg_at(&path, 4)) {
            Ok(_) => assert!(
                what == "the file is existing but READ-ONLY" && app_can_write,
                "§8.1 #13: `{what}` must fail `FilePathUnreachable` and return NO instance"
            ),
            Err(e) => {
                reached += 1;
                assert_code(
                    &e,
                    "FilePathUnreachable",
                    &format!("§8.1 #13: `{what}` — the PROVIDED path fails the reachability test"),
                );
                assert!(
                    e.message.contains(&path),
                    "§8.2's `FilePathUnreachable` row: the generated message carries `MessageArgs.path`; \
                     got {}",
                    e.message
                );
            }
        }
    }
    assert!(
        reached >= 2,
        "§5.9's converse half/§8.1 #13: the member is REACHABLE — *\"no member is unreachable\"* — through \
         the parent-directory and the directory-valued forms at the least; got {reached}"
    );
    // **AND THE MEMBER IS NOT PRODUCED WHERE IT MUST NOT BE — BOTH ARMS OF `A52`'s DISJUNCTION RETURN AN
    // INSTANCE AND PRODUCE NO CODE:** **arm (a), the file EXISTS and is writable, and arm (b), the
    // application CAN WRITE the path** (`A52`; `§8.1` #13's trigger column is *"PROVIDED AND FAILS"*).
    let exists_path = fresh_path("fc-exists");
    std::fs::write(&exists_path, b"{}").expect("the path holds a writable file");
    ok(
        storeCreate(&cfg_at(&exists_path, 4)),
        "A52 (a): the file exists and is writable → the path is reachable and NO code is produced",
    );
    // **⟶ RE-DERIVED 2026-10-13, AT THIS CONTRACT'S TENTH BOUNDED AMENDMENT (`contract.md §10.4`; the row
    // `U-STOREROOM-ACCESS-PROBE`): ARM (b)'s CELL IS CORRECTED TO THE DECLARED OBSERVABLES.** **THE AS-FILED
    // ASSERTION READ** *"`A55`: *\"Dry run\"* — the probe leaves the file system untouched"*, **WHICH IS THE
    // SUPERSEDED READING**: **a PROVIDED, ABSENT `filePath` whose parent exists IS CREATED EXCLUSIVELY BY THE
    // CONSTRUCTION ITSELF (`create_new`), LEFT ZERO-LENGTH — AN EMPTY FILE AND NO BYTE** (`§10.4` parts 2–3;
    // `seams-and-lifecycle.md §7.1` step `4b` part (A); `DD-28`'s amended cell). **AND `A55`'s *"Dry run"*
    // SURVIVES WHOLE — it governs THE PROBE, which still creates nothing, and NOT the STORE'S OWN ACT**
    // (`§10.4` part 1; step `4b` part (E)). **THE DECLARED OBSERVABLES NOW ASSERTED: the path EXISTS · its
    // length is `0` · NO byte was written** (`§10.4`'s blast-radius clause; `implementation-plan.md §9.5`
    // item 2). **THE PARENT DIRECTORY'S ENTRY COUNT MOVED BY EXACTLY ONE IS NOT ASSERTED HERE**, because this
    // path stands in the SHARED temp directory whose count every sibling cell's own file moves; that
    // observable is driven where the count is the cell's own (`tests/construction_access_probe.rs`).
    let creatable = fresh_path("fc-creatable");
    assert!(
        !std::path::Path::new(&creatable).exists(),
        "the PRE-STATE: the path is ABSENT, so this is the exclusive create's own arm"
    );
    ok(
        storeCreate(&cfg_at(&creatable, 4)),
        "A52 (b): the application can write the path → reachable, no code, and the construction CREATES the \
         store's own ZERO-LENGTH file",
    );
    assert!(
        std::path::Path::new(&creatable).exists(),
        "§10.4 part 3 / §7.1 step 4b (A): the construction CREATES the store's own file — *\"AN EMPTY FILE \
         AND NO BYTE\"* — where the superseded reading asserted the file system was left untouched"
    );
    assert_eq!(
        std::fs::metadata(&creatable)
            .expect("the store's own file")
            .len(),
        0,
        "§10.4 part 3: the file is left ZERO-LENGTH, and a creation that writes a BYTE is REFUSED \
         (`DD-28`'s amended cell)"
    );
    assert_eq!(
        std::fs::read(&creatable).expect("the store's own file is readable"),
        Vec::<u8>::new(),
        "§10.4 part 3: NO byte was written — *\"AN EMPTY FILE AND NO BYTE\"*"
    );
    let _ = std::fs::remove_file(&creatable);
    let _ = std::fs::remove_file(&exists_path);
    // **AND THIS ASSERTION IS UNMOVED, BYTE FOR BYTE** (`implementation-plan.md §9.1` row `4`): it drives
    // the ABSENT-PARENT state, where the exclusive create ATTEMPTS AND FAILS leaving nothing — so the probe's
    // own creates-nothing claim still holds there and no word of it moves.
    assert!(
        !std::path::Path::new(&absent_parent).exists(),
        "A55/DD-40 (a): the DRY RUN creates NO directory and NO byte — the probe left nothing behind"
    );
    let _ = std::fs::remove_file(&read_only);
    let _ = std::fs::remove_dir(&is_a_directory);
}

// §8.1 #14 — ValueNotAdmitted: a write whose value is outside §1.4's admitted set — every outside class.
// **⟶ RENUMBERED 2026-10-11: this member stood at rank `13` and its TRIGGER IS UNCHANGED** (`§8.1`'s own
// renumbering clause).
// Drives: §8.1 #14, §3.4 F-2, §1.4
#[test]
fn s8_1_14_value_not_admitted_fires_for_every_outside_value_class() {
    let mut store = new_store();
    for value in [
        v_null(),
        v_undefined(),
        v_function(),
        v_symbol(),
        v_bigint(),
        v_nan(),
        v_infinity(),
        v_neg_infinity(),
        v_cyclic(),
        v_non_plain_collection(),
    ] {
        let e = failure(
            store.write(AddressArg::List(key(&["a"])), w_mem(), value),
            "§3.4 F-2",
        );
        assert_code(
            &e,
            "ValueNotAdmitted",
            "§8.1 #14: each outside class answers the SAME code",
        );
    }
}

// §8.1 #15 (rank `15`; `§0.2` `DD-25`; `§7.2` items 2–4) — FileCommitFailed: "a `file`-TIER WRITE'S FAILURE
// PATH — whichever of its three parts fails: the serialization of the `file` state, the file write at
// `cfg.filePath`, or the journal's own append", delivered to the caller AFTER `A16`'s automatic journal
// rollback has run, with the generated message of `§8.2`'s own `FileCommitFailed` row. **THE DRIVE USES THE
// REAL TRIGGER THE AMENDMENT NAMES — the path at `cfg.filePath` made un-writable — and no invented one.**
// **⟶ RENUMBERED 2026-10-11: this member stood at rank `14` and its TRIGGER IS UNCHANGED; it is the LAST
// member of the set and its `§8.2` template row moves with it** (`§8.1`'s own renumbering clause).
// **⟶ AND RE-POINTED 2026-10-15 BY THE `RCA-9` PASS (`§7.2` items 1–3 AS AMENDED; `surface.md §2.11`
// clauses 2 and 5): THE TRIGGER IS UNCHANGED — a `file`-tier commit whose path cannot be written — AND THE
// INSTANT IS NOT. The verb RECORDS the write and *"PERFORMS NO FILE I/O ON ANY OF ITS ARMS"*, so its own
// return is asserted `Ok` beside the act; THE FAILURE IS THE TERMINAL ARM'S ACT'S, *"the store rolls the
// write back FIRST and the call answers with a message SECOND"*, and the caller receives the failure and
// never the rolled-back state. `DD-25`'s ONE code for all three parts of the failure is unmoved.**
// Drives: §8.1 #15, §7.2 items 2–4 as amended, §8.2
#[test]
fn s8_1_15_file_commit_failed_fires_on_the_file_tier_commit_path() {
    let path = fresh_path("s8-1-15");
    let mut store = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.1: the three arguments valid",
    );
    let landed = ok(
        store.write(AddressArg::List(key(&["durable"])), w_file(), v_num(1.0)),
        "§7.2 item 1 as amended: the verb records the write",
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &landed.op.opId),
        "§7.2 item 2 as amended: the terminal arm's own act lands a commit at the path",
    );
    let before = read_at(&store, &empty_address());
    let _ = std::fs::remove_file(&path);
    std::fs::create_dir(&path)
        .expect("the path now holds a directory, so a file write cannot land");
    // THE VERB'S OWN ARM FIRST, AND IT IS `Ok`: *"it performs NO FILE I/O ON ANY OF ITS ARMS"* (`§7.2`
    // item 1 as amended) — the directory at the path decides nothing at the verb.
    let never = ok(
        store.write(AddressArg::List(key(&["never"])), w_file(), v_num(2.0)),
        "§7.2 item 1 as amended: the verb's `file`-tier arm returns as it does today",
    );
    let e = failure(
        commit_at_the_terminal_arm(&mut store, &never.op.opId),
        "§7.2 item 3 as amended: THE TERMINAL ARM'S OWN ACT is where the commit failure is passed back",
    );
    assert_code(
        &e,
        "FileCommitFailed",
        "§8.1 #15: the `file` tier's commit failure has ONE code",
    );
    assert!(
        CLOSED_CODES.contains(&"FileCommitFailed"),
        "§8.1: the member is IN the closed set"
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        before,
        "§7.2 item 2/§3.5: the failure leaves state unchanged — the rollback ran FIRST"
    );
    assert!(
        e.message.contains(&path),
        "§8.2's `FileCommitFailed` row: the message carries `MessageArgs.path`; got {}",
        e.message
    );
    let _ = std::fs::remove_dir(&path);
}

// §8.1's closure — every code a drive produces is a member of the set, and the set carries **16** distinct
// members with the contract's own spellings, `FilePathUnreachable` included at rank `13` and
// `FileCommitFailed` at rank `15`. **⟶ AMENDED 2026-10-11: the `14`-member assertions move to `15`, and the
// new member's own probe joins the closure sweep** (`§5.9`'s census: *"`1` drive per member = `15` code
// drives, plus the closure sweep = `15 + 1`"*).
//
// **⟶ WIDENED TO `16` 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class; `DEF-2026-10-15-X`
// item 4).** **THE FIGURE THIS DRIVE PRINTED WAS SUPERSEDED AND THE DRIVE IS CORRECTED, NOT RETIRED:** the
// superseding clauses are named one by one — `contract.md §8.1`'s own amended **heading**, which reads
// **`16` members, each with its trigger**, its arithmetic `11 + 2 + 1 + 1 + 1 = 16` ✓; **`§7.2` item 5
// (ADDED 2026-10-15)**, which declares the constraint list's TWO validation instants and names the
// load-side failure; and `docs/specs/storeroom-js/parameter-semantics.md §2.21`, the key's own declared
// semantics — **while the sentence this comment supersedes asserted that `FileCommitFailed` *"still closes
// at the member"*, which was TRUE of the `15`-member set and is FALSE of the `16`-member one it now
// stands in.** **NO MEMBER IS RENAMED AND NO RANK MOVES: `FilePathUnreachable` stays at `13`,
// `ValueNotAdmitted` at `14`, `FileCommitFailed` at `15`, and the new member takes `16` after them.** The
// sixteenth member's own probe joins the sweep below, **reached through a REAL trigger at the
// CONSTRUCTION's own instant** (`storeCreateWithConstraints`; `§7.1` step 4-bis) — the load-side instant's
// trigger is driven at this project's JS leg (`bindings/js/tests/surface_verbs.rs`).
// Drives: §8.1, §5.9, §7.1 step 4-bis, §7.2 item 5
#[test]
fn s8_1_every_driven_code_is_a_member_of_the_closed_set() {
    let mut store = new_store();
    let mut seen: Vec<String> = Vec::new();
    let probes: Vec<Result<(), StoreError>> = vec![
        store
            .read(AddressArg::List(vec![Segment::Bool(true)]), TierArg::Absent)
            .map(|_| ()),
        store
            .read(AddressArg::List(key(&["nope"])), TierArg::Absent)
            .map(|_| ()),
        store
            .read(AddressArg::List(vec![idx(0)]), TierArg::Absent)
            .map(|_| ()),
        store
            .write(
                AddressArg::List(key(&["a"])),
                outside_token("secure"),
                v_num(1.0),
            )
            .map(|_| ()),
        store
            .write(AddressArg::List(key(&["a"])), w_mem(), v_null())
            .map(|_| ()),
        store
            .write(AddressArg::List(key(&["a"])), none(), v_num(1.0))
            .map(|_| ()),
        store
            .write(AddressArg::List(empty_address()), w_mem(), v_num(1.0))
            .map(|_| ()),
        store.rollback(OpIdArg::Id("unknown".into())).map(|_| ()),
        storeCreate(&cfg_at("", 4)).map(|_| ()),
        // **§8.1 #13's own probe — the construction's reachability arm** (`DD-40` (a)).
        storeCreate(&cfg_at(
            &format!("{}/x.json", fresh_path("closure-nodir")),
            4,
        ))
        .map(|_| ()),
        {
            // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2):
            // this probe's member is reached at the terminal arm's own act and not at the verb — the verb
            // records the write and performs NO file I/O on any of its arms, so the closure sweep drives the
            // act, keyed by the op that write returned, and reads ITS `Err`. The probe's answer is a
            // `Result<(), StoreError>` either way, so the sweep's own shape is unchanged.**
            let path = fresh_path("closure-commit");
            let mut s = ok(storeCreate(&cfg_at(&path, 4)), "§7.1");
            let _ = std::fs::remove_file(&path);
            std::fs::create_dir(&path).expect("the path now holds a directory");
            let recorded = s.write(AddressArg::List(key(&["never"])), w_file(), v_num(1.0));
            match recorded {
                Err(_) => recorded.map(|_| ()),
                Ok(w) => commit_at_the_terminal_arm(&mut s, &w.op.opId),
            }
        },
        // **§8.1 #16's own probe — the CONSTRUCTION's instant, and the member the as-filed sweep had no
        // probe for** (`DEF-2026-10-15-Y`; `§7.1` step 4-bis; `parameter-semantics.md §2.21`). The list is
        // WELL-FORMED AS A LIST and its own element lies outside `{ address, id }`, so the answer is the
        // key's own member and never `§8.1` #1. **`filePath` IS ABSENT**, because `§7.1`'s amended table
        // makes an absent path LEGAL (`A49`) and the probe must reach the FOURTH key's own arm and no
        // other.
        storeCreateWithConstraints(
            &cfg_no_path(4),
            &ConstraintsArg::List(vec![ConstraintEntry::Invalid("'a'".to_string())]),
        )
        .map(|_| ()),
    ];
    for probe in probes {
        match probe {
            Err(e) => {
                assert!(
                    CLOSED_CODES.contains(&e.status.as_str()),
                    "§8.1: a failure outside the set is a violation"
                );
                seen.push(e.status);
            }
            Ok(()) => panic!("§8.1: this probe must fail"),
        }
    }
    assert!(!seen.is_empty(), "§8.1: the closure drive caught failures");
    assert!(
        seen.iter().any(|c| c == "FilePathUnreachable"),
        "§5.9's converse half: the rank-`13` member is reachable through a real trigger"
    );
    assert!(
        seen.iter().any(|c| c == "FileCommitFailed"),
        "§5.9's converse half: the rank-`15` member is reachable through a real trigger"
    );
    assert!(
        seen.iter().any(|c| c == "ConstraintListInvalid"),
        "§5.9's converse half, ADDED 2026-10-15: THE RANK-`16` MEMBER IS REACHABLE THROUGH A REAL TRIGGER \
         at the construction's own instant — the as-filed sweep carried no probe for it at all, so its own \
         closure was asserted over a set it never drove the last member of (`DEF-2026-10-15-Y`)"
    );
    let mut distinct = CLOSED_CODES.to_vec();
    distinct.sort();
    distinct.dedup();
    assert_eq!(
        distinct.len(),
        16,
        "§8.1: the set carries 16 members, ranked 1…16 (`11 + 2 + 1 + 1 + 1 = 16` ✓ — the as-filed \
         `11 + 2 + 1 + 1 = 15` counted the amended heading's own members one short; AMENDED 2026-10-15, \
         `DEF-2026-10-15-Y`)"
    );
    assert!(
        distinct.contains(&"FilePathUnreachable"),
        "§8.1 #13: the amendment's member is IN the closed set, in the construction group"
    );
    assert!(
        distinct.contains(&"FileCommitFailed"),
        "§8.1 #15: the `file`-commit member is IN the closed set"
    );
    assert!(
        distinct.contains(&"ConstraintListInvalid"),
        "§8.1 #16: THE SIXTEENTH MEMBER IS IN THE CLOSED SET — the as-filed sweep asserted the set *\"still \
         closes at the `file`-commit member\"*, and that sentence described the `15`-member set the \
         amendment's own heading had already superseded (`§8.1`'s amended heading; `§7.1` step 4-bis; \
         `parameter-semantics.md §2.21`; AMENDED 2026-10-15, `DEF-2026-10-15-Y`)"
    );
    let expected_ranks = [
        "AddressMalformed",
        "AddressNotFound",
        "LeafHasNoDownstream",
        "TierNotFound",
        "OutOfDomainTier",
        "ParentAnchorMonotonicityViolation",
        "ContainerKindConflict",
        "ReadTargetIsBranch",
        "WriteParentNotLink",
        "JournalOpUnknown",
        "RollbackCompacted",
        "ConstructionArgumentMissing",
        "FilePathUnreachable",
        "ValueNotAdmitted",
        "FileCommitFailed",
        "ConstraintListInvalid",
    ];
    assert_eq!(
        CLOSED_CODES.to_vec(),
        expected_ranks.to_vec(),
        "§8.1's own rank order: `FilePathUnreachable` at `13`, `ValueNotAdmitted` at `14`, \
         `FileCommitFailed` at `15`, and the SIXTEENTH member LAST at `16` — no existing rank moves \
         (AMENDED 2026-10-15, `DEF-2026-10-15-Y`)"
    );
}

// §8.2 example (2) — the degenerate arm at an EMPTY container is exact: `it holds no keys`.
#[test]
fn s8_2_the_empty_container_message_is_exact() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["window", "empty"])), TierArg::Absent),
        "§8.2 example (2)",
    );
    assert_code(&e, "AddressNotFound", "§8.2 example (2)");
    assert_eq!(
        e.message, "'empty' does not exist in 'window', it holds no keys",
        "§8.2 example (2): the <available clause>'s degenerate arm, exactly"
    );
}

// §8.2 example (3) — the container-kind arm is exact, including the value's own spelling and the map's
// key list.
// Drives: §8.2 example (3)
#[test]
fn s8_2_the_container_kind_message_is_exact() {
    let mut store = new_store();
    let tree = v_obj(&[(
        "tabs",
        v_obj(&[("doc1", v_num(1.0)), ("searchbar", v_num(2.0))]),
    )]);
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), tree),
        "§3.4 W-4",
    );
    let e = failure(
        store.write(
            AddressArg::List(key(&["window", "tabs"])),
            w_mem(),
            v_arr(vec![v_num(1.0), v_num(2.0)]),
        ),
        "§8.2 example (3)",
    );
    assert_code(&e, "ContainerKindConflict", "§8.2 example (3)");
    assert_eq!(
        e.message, "[1,2] does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'",
        "§8.2 example (3): reproduced from the rule above"
    );
}

// §8.2 example (1) — the architect's own example, whose FORM fixes the generator.
//
// CONTRACT NOTE (the amendment closed the finding this comment used to name): `§8.2`'s
// *"THE `<available clause>`'s SUBJECT, SETTLED SO EXAMPLE (1) IS REPRODUCIBLE FROM THE RULE — the directory
// defect the amendment closes"* clause makes `<CONTAINERSEGMENT>` — the container's OWN segment, `tabs` for
// the container at `window.tabs` — the subject of the available-keys clause, so example (1) is now produced
// BY the rule and `keys` stands only for the register. This drive keeps its pinned prefix and suffix
// (unchanged in this bounded pass); pinning the full middle clause is a carry-over named in the gate-3
// report.
// Drives: §8.2 example (1), §8.2
#[test]
fn s8_2_the_absent_key_message_keeps_the_example_s_invariant_form() {
    let mut store = new_store();
    let tree = v_obj(&[(
        "tabs",
        v_obj(&[("doc1", v_num(1.0)), ("searchbar", v_num(2.0))]),
    )]);
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), tree),
        "§3.4 W-4",
    );
    let e = failure(
        store.read(
            AddressArg::List(key(&["window", "tabs", "LandingPage"])),
            TierArg::Absent,
        ),
        "§8.2 example (1)",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§8.2 example (1): the architect's own example",
    );
    assert!(
        e.message
            .starts_with("'LandingPage' does not exist in 'window.tabs'"),
        "§8.2 example (1): <SEGMENT> <mismatch clause> '<CONTAINER>'; got {}",
        e.message
    );
    assert!(
        e.message.ends_with("'doc1', 'searchbar'"),
        "§8.2: <KEYLIST> — the container's keys as single-quoted strings joined by ', '; got {}",
        e.message
    );
}

// §8.2 property (a) DETERMINISM — the same `(code, args)` yields the same string, always.
#[test]
fn s8_2_the_generator_is_deterministic() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let first = failure(
        store.read(AddressArg::List(key(&["window", "gone"])), TierArg::Absent),
        "§8.2 (a)",
    );
    let second = failure(
        store.read(AddressArg::List(key(&["window", "gone"])), TierArg::Absent),
        "§8.2 (a)",
    );
    assert_eq!(first.message, second.message, "§8.2 (a): DETERMINISM");
    assert_eq!(first.status, second.status, "§8.2 (a): DETERMINISM");
}

// §8.2 — a message is GENERATED from its code and the failing trigger's arguments, never a hand-authored
// constant: two different failing arguments of one code yield two different messages.
// Drives: §8.2
#[test]
fn s8_2_the_message_varies_with_the_failing_arguments() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let one = failure(
        store.read(AddressArg::List(key(&["window", "alpha"])), TierArg::Absent),
        "§8.2",
    );
    let two = failure(
        store.read(AddressArg::List(key(&["window", "beta"])), TierArg::Absent),
        "§8.2",
    );
    assert_eq!(one.status, two.status, "§8.2: one code");
    assert_ne!(
        one.message, two.message,
        "§8.2: generated from the failing trigger's arguments"
    );
    assert!(
        one.message.contains("alpha"),
        "§8.2: the <SEGMENT> is the failing segment's spelling"
    );
    assert!(
        two.message.contains("beta"),
        "§8.2: the <SEGMENT> is the failing segment's spelling"
    );
}

// §8.2 properties (b) and (c) — COMPLETENESS and NO PLACEHOLDERS SURVIVE: no generated message is empty,
// and no `<`, `>`, `TBD`, `undefined` or `null` appears in one.
// Drives: §8.2 properties (b) and (
#[test]
fn s8_2_no_generated_message_is_empty_and_no_placeholder_survives() {
    let mut store = new_store();
    let mut messages: Vec<String> = Vec::new();
    let probes: Vec<Result<(), StoreError>> = vec![
        store
            .read(AddressArg::List(vec![Segment::Null]), TierArg::Absent)
            .map(|_| ()),
        store
            .read(AddressArg::List(key(&["nope"])), TierArg::Absent)
            .map(|_| ()),
        store
            .read(AddressArg::List(vec![idx(0)]), TierArg::Absent)
            .map(|_| ()),
        store
            .write(
                AddressArg::List(key(&["a"])),
                outside_token("secure"),
                v_num(1.0),
            )
            .map(|_| ()),
        store
            .write(AddressArg::List(key(&["a"])), w_mem(), v_null())
            .map(|_| ()),
        store
            .write(AddressArg::List(key(&["a"])), w_mem(), v_str("v"))
            .map(|_| ()),
        store
            .read(AddressArg::List(key(&["a", "b"])), TierArg::Absent)
            .map(|_| ()),
        store
            .delete(AddressArg::List(key(&["gone"])), none())
            .map(|_| ()),
        store.rollback(OpIdArg::Id("unknown".into())).map(|_| ()),
        storeCreate(&cfg_at("", 4)).map(|_| ()),
    ];
    for probe in probes {
        if let Err(e) = probe {
            assert!(
                !e.message.is_empty(),
                "§8.2 (b): no code can generate an empty message"
            );
            for placeholder in ["<", ">", "TBD", "undefined", "null"] {
                assert!(
                    !e.message.contains(placeholder),
                    "§8.2 (c): no placeholder survives; `{placeholder}` appeared in {}",
                    e.message
                );
            }
            messages.push(e.message);
        }
    }
    assert!(!messages.is_empty(), "§8.2: the sweep caught messages");
}

// §8.3 — `StoreError` carries `status` and `message`, its ONLY TWO members.
#[test]
fn s8_3_the_error_record_carries_its_two_members() {
    let mut store = new_store();
    let e = failure(
        store.read(AddressArg::List(key(&["nope"])), TierArg::Absent),
        "§8.3",
    );
    let StoreError { status, message } = &e;
    assert_eq!(
        status, "AddressNotFound",
        "§8.3: the member's EXACT spelling from §8.1's code column"
    );
    assert!(
        !message.is_empty(),
        "§8.3: `message` is the generated string, never empty"
    );
}

// §8.3 — `status` is the member's EXACT spelling: not an enum index, not a numeric id, and not a
// lowercased or prefixed variant.
//
// CONTRACT NOTE (the amendment closed the finding this comment used to name): `§0.2` `DD-3` now reads
// "the code is a **UPPER-camel** string token (`AddressNotFound`, exactly the architect's own example's
// spelling — `§8.3`; **this cell's earlier *"lowercase-camel"* spelling is CORRECTED here**)", so `DD-3`,
// `§8.1`'s `code` column and `§8.3` agree on the spelling this drive asserts.
#[test]
fn s8_3_the_status_is_the_exact_upper_camel_spelling() {
    let mut store = new_store();
    for (probe, expected) in [
        (
            store
                .read(AddressArg::List(key(&["nope"])), TierArg::Absent)
                .map(|_| ()),
            "AddressNotFound",
        ),
        (
            store
                .read(AddressArg::List(vec![idx(0)]), TierArg::Absent)
                .map(|_| ()),
            "AddressNotFound",
        ),
        (
            store
                .write(
                    AddressArg::List(key(&["a"])),
                    outside_token("disk"),
                    v_num(1.0),
                )
                .map(|_| ()),
            "OutOfDomainTier",
        ),
        (
            store
                .write(AddressArg::List(key(&["a"])), w_mem(), v_null())
                .map(|_| ()),
            "ValueNotAdmitted",
        ),
        (storeCreate(&cfg_at("", 1)).map(|_| ()), "AddressMalformed"),
    ] {
        match probe {
            Err(e) => {
                assert_eq!(e.status, expected, "§8.3: the member's own spelling");
                assert_ne!(
                    e.status,
                    e.status.to_lowercase(),
                    "§8.3: not a lowercased variant"
                );
                assert!(
                    !e.status.starts_with("StoreError"),
                    "§8.3: not a prefixed variant"
                );
            }
            Ok(()) => panic!("this probe must fail"),
        }
    }
}

// §8.1's COMPLEMENT — the following are NOT failures and produce NO code: an unoccupied key on a write; an
// empty address; a delete that removes nothing; an unlisten of an unknown handle; a read of an empty
// container; a read at the address of a branch through the ordinary `read`; a write at an occupied
// `(key, tier)` pair. (`§7.1`'s unknown third key on the construction config has no Rust spelling under a
// typed config — reported at gate 3, asserted by nothing.)
// Drives: §8.1, §7.1
#[test]
fn s8_1_the_complement_produces_no_code() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["fresh"])), w_mem(), v_num(1.0)),
        "§8.1: an unoccupied key mints",
    );
    ok(
        store.read(AddressArg::List(empty_address()), TierArg::Absent),
        "§8.1: an empty address is valid",
    );
    ok(
        store.delete(AddressArg::List(key(&["fresh"])), t(Tier::Temp)),
        "§8.1: a delete that removes nothing",
    );
    let handle = ok(store.listen(AddressArg::List(key(&["x"]))), "§6.5 item 12");
    ok(store.unlisten(&handle), "§6.5 item 12");
    ok(
        store.unlisten(&handle),
        "§8.1: an unlisten of an unknown handle",
    );
    ok(
        store.write(AddressArg::List(key(&["empty_map"])), w_mem(), v_obj(&[])),
        "§8.1: an empty container",
    );
    assert_eq!(
        read_at(&store, &key(&["empty_map"])),
        v_obj(&[]),
        "§8.1: a read of an empty container answers"
    );
    ok(
        store.read(AddressArg::List(key(&["empty_map"])), TierArg::Absent),
        "§8.1: a read at a branch assembles",
    );
    ok(
        store.write(AddressArg::List(key(&["fresh"])), w_mem(), v_num(2.0)),
        "§8.1: a write at an occupied pair",
    );
}

// §8.1's absent codes — there is NO `BelowSecureFloor` and NO `PairOccupied`: a write at an occupied pair
// is purged and re-minted (`W-1`), and neither name is a member of the set.
// Drives: §8.1
#[test]
fn s8_1_the_two_absent_codes_are_absent() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§0.2 DD-11: no PairOccupied refusal",
    );
    for absent in ["BelowSecureFloor", "PairOccupied"] {
        assert!(
            !CLOSED_CODES.contains(&absent),
            "§8.1: `{absent}` is deliberately absent from the closed set"
        );
    }
}

// §8.1 #2's third trigger, driven at the only place a plain instance can reach its SHAPE — a sub-floor
// address is NOT SEEN, so the resolver answers AddressNotFound "exactly as for an address that does not
// exist", with no distinguishing record and no distinct code (`DD-13`, §8.3's blindness clause).
//
// CONTRACT FINDING (reported at gate 3): the `secure` INSTANCE's mechanism is `docs/pending.md` `P-1`'s
// (parked), and the contract declares no way to construct a floored instance, so the sub-floor trigger
// itself is park-bounded and no red-set test constructs one. This drive asserts the declared SHAPE of the
// answer — the same status, the same template — for the addresses a plain instance cannot see.
// Drives: §8.1, §8.3
#[test]
fn par_11_a_sub_floor_address_is_indistinguishable_from_an_absent_one() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let absent = failure(
        store.read(AddressArg::List(key(&["unheld"])), TierArg::Absent),
        "§0.2 DD-13",
    );
    let below = failure(
        store.read(AddressArg::List(key(&["below_the_floor"])), t(Tier::File)),
        "§0.2 DD-13",
    );
    assert_eq!(
        absent.status, below.status,
        "§0.2 DD-13: the record does not distinguish invisibility from absence"
    );
    assert!(
        absent.message.contains("does not exist in") && below.message.contains("does not exist in"),
        "§0.2 DD-13: a message generated by the SAME template; got {} / {}",
        absent.message,
        below.message
    );
    assert_ne!(
        below.status, "BelowSecureFloor",
        "§8.1: no distinct floor code exists and none is authored"
    );
}
