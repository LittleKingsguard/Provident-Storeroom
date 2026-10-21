//! `tests/construction.rs` — contract `§7` (`seams-and-lifecycle.md §7`) with its boot/lifetime block:
//! the construction input set `storeCreate(cfg)`, each input's domain and the declared answer for every
//! outside value, the `file` tier's persistence and its failure arm, and the boot's own clauses.
//!
//! **⟶ RE-DERIVED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT).** The
//! surface this file drives has moved, and each cell below names the `§` it is now derived from
//! (`A49`–`A56`; `seams-and-lifecycle.md §7.1`'s amended construction sequence and its amended table;
//! `DD-34`, `DD-38`, `DD-39`, `DD-40`; `PAR-6`, `PAR-12`).
//!
//! **WHAT MOVED, IN ONE PARAGRAPH:** **`cfg` is CLOSED at THREE members and `listeners[]` is the added one**
//! (`§0.4`; `§7.1`); **`filePath` is OPTIONAL** — ABSENT is now **LEGAL** and fixes the register's tier at
//! `mem` (`A49`; *"ABSENT → LEGAL, the register is created at `mem`"*), while `null`/`undefined`/`""`/a
//! non-string still answer `AddressMalformed`; **a PRESENT path is probed by a DRY RUN that requires WRITE
//! ACCESS** (`A52`/`A55`), and a path that fails the two-armed test — **its parent directory absent, itself
//! or its directory unwritable (an existing READ-ONLY file is the canonical case), or itself a DIRECTORY**
//! — **fails the NEW member `FilePathUnreachable` (`§8.1` #13, rank `13`; `A53`/`A54`; `DD-40`), with NOTHING
//! created by the probe**; **the register's tier is FIXED AT CREATION and never moves** (`A50`; `DD-34`);
//! **and the home map is POPULATED FROM `listeners[]` BEFORE THE REGISTRY IS GENERATED** (`A56`; `§7.1`
//! steps 5–6), so the register's carrier node carries the listener references **FROM THE OUTSET**.
//!
//! States enumerated for this concern, each driven below: `filePath` absent (LEGAL, `mem` register) · empty ·
//! `null` · `undefined` · a non-string · a path whose parent directory is absent · an existing but READ-ONLY
//! file · a path that IS a directory · a path that EXISTS and is writable · a path the application CAN write
//! (a fresh path in a writable directory) · `journalLength` absent · `0` · negative · fractional · `NaN` ·
//! `±Infinity` · a non-number; `listeners[]` empty · carrying a duplicate address · `null` · `undefined` · a
//! non-array · carrying an entry whose address is outside `PAR-1`'s domain; two instances built from equal
//! arguments; a boot from an existing file; a boot with no file; a boot that must load NO registration; a
//! `file`-tier commit; a failed `file`-tier commit.

mod support;
use support::*;

fn cfg(filePath: FilePathArg, journalLength: JournalLengthArg) -> StoreConfig {
    cfg_full(filePath, journalLength, ListenersArg::List(Vec::new()))
}

// §5.7 + §7.1 + the boot block items 1 and 5 — the three arguments present and valid: an instance is
// returned that is EMPTY — the register holds 0 keys, the journal holds 0 entries, nothing is watched, no
// listener triggers.
// Drives: §5.7, §7.1
#[test]
fn s5_7_a_valid_construction_returns_an_empty_instance() {
    let path = fresh_path("valid");
    let mut store = ok(storeCreate(&cfg(p_path(&path), n_count(4))), "§5.7 (ii)");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§5.7: the register holds 0 keys"
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w.op.seq, 1,
        "§5.7: the journal holds 0 entries — the first append is ordinal 1"
    );
    assert!(w.watched.is_empty(), "§5.7: nothing is watched");
    assert!(
        w.triggered.is_empty(),
        "§7.1 step 5/§5.8 (a): the home is empty, so no handle is returned"
    );
}

// **⟶ RE-DERIVED 2026-10-11.** §7.1's amended `filePath` row + `A49` + `A50` + `store-model.md §1.6` item 4
// (d) + `A51`/§5.6 — an ABSENT `filePath` is LEGAL: an instance IS returned, its register's tier is fixed at
// `mem`, and the register's bound is REAL (the shipped exemption is superseded): a `file`-tier write at a
// REGISTER KEY fails `ParentAnchorMonotonicityViolation` while `mem`- and `temp`-tier writes succeed.
// **THE AS-FILED CELL THIS REPLACES** asserted the opposite (absent → `ConstructionArgumentMissing`); it is
// replaced, not weakened, because the clause it drove was SUPERSEDED by the amendment.
// Drives: §7.1 (amended), §1.6 item 4 (d), §5.6, A49, A50, A51, DD-34
#[test]
fn s7_1_an_absent_file_path_is_legal_and_creates_a_mem_register() {
    let mut store = ok(
        storeCreate(&cfg_no_path(4)),
        "§7.1: ABSENT → LEGAL, the register is created at `mem`",
    );
    assert_eq!(
        landing_tier(&store, &empty_address()),
        Tier::Mem,
        "store-model.md §1.6 item 4 (d) + §2.1: the empty-address reference asserts the REGISTER'S OWN \
         conditional tier — `mem` in a path-less store, whatever `t` the caller passed"
    );
    // store-model.md §2.1's four corrections, read at the block's own conclusion: the two empty-address
    // probes answer the SAME reference, and that one reference's `anchor.tier` is THE REGISTER'S OWN TIER —
    // never the caller's `t`.
    //
    // **⟶ RE-CUT 2026-10-21 (role_test_writer) ON THE ARCHITECT'S RULING — THE IDENTITY TUPLE'S KEY LEG IS
    // READ THROUGH `ChildAnchor::key()`.** `§1.2`'s dated clause of 2026-10-21 (`store-model.md:237`) removed
    // `key` from the `ChildAnchor` member set, so the field access `a.anchor.key.clone()` no longer compiles
    // and the leg is re-cut to the derived-key ACCESSOR. **THE LEG'S VALUE IS NEVER ASSERTED — this tuple is
    // an IDENTITY component and the assertion below needs the two probes to AGREE, not to equal any literal**
    // (this file spells no `Segment::Key` literal for the register at all). **Both probes take the empty
    // address and so both resolve to the REGISTER'S OWN REFERENCE, whose `register_marker` is `true` and
    // whose derived key is therefore `None` by construction** (`§1.2`'s clause: the register *"is reached by
    // NO segment"*, and `src/records.rs`'s accessor doc: that is the ONE case where the answer is `None`;
    // `§0.4`'s marker clause: *"a MARKER and not a key"*). **`None == None`, so the identity assertion holds
    // BY DERIVATION AND IS ALSO MEASURED by this test's own run — the assertion below passes only if the two
    // legs agree.** **The tier leg and every assertion below are UNTOUCHED.**
    let (at_file, at_temp) = {
        let a = ok(
            store.findAddress(AddressArg::List(empty_address()), w_file()),
            "§2.1: the empty address resolves without a walk step",
        );
        let b = ok(
            store.findAddress(AddressArg::List(empty_address()), w_temp()),
            "§2.1: the same address, the other `t`",
        );
        (
            (a.anchor.key(), a.anchor.tier),
            (b.anchor.key(), b.anchor.tier),
        )
    };
    assert_eq!(
        at_file, at_temp,
        "§2.1's re-stated consequence: `findAddress([], file)` and `findAddress([], temp)` still answer the \
         SAME reference"
    );
    assert_eq!(
        at_file.1,
        Tier::Mem,
        "store-model.md §1.6 item 4 (d) (i): that one reference's `anchor.tier` is the register's own tier, \
         so a caller's `t` selects nothing"
    );

    let unpermitted = failure(
        store.write(AddressArg::List(key(&["r"])), w_file(), v_num(1.0)),
        "A51/§5.6: fails as usual for an unpermitted write",
    );
    assert_code(
        &unpermitted,
        "ParentAnchorMonotonicityViolation",
        "§5.6/§1.6 item 4 (d) (ii): rank(file) = 2 > rank(mem) = 1 at the register's own anchor",
    );
    ok(
        store.write(AddressArg::List(key(&["r"])), w_mem(), v_num(2.0)),
        "§5.6: `mem` at a register key is permitted by the register's own tier",
    );
    ok(
        store.write(AddressArg::List(key(&["r"])), w_temp(), v_num(3.0)),
        "§5.6: `temp` at a register key is permitted by the register's own tier",
    );
    assert_eq!(
        landing_tier(&store, &key(&["r"])),
        Tier::Temp,
        "§5.4 (c): the lowest-persistence version answers the unqualified read"
    );
}

// §7.1 + §0.2 DD-16/DD-17 + §8.1 #12 — `cfg.journalLength` ABSENT: ConstructionArgumentMissing. **⟶ the
// amendment NARROWS this member's trigger to this ONE argument** (`DD-17`'s operative form; `§8.1` #12).
#[test]
fn s7_1_an_absent_journal_length_fails_construction_argument_missing() {
    let path = fresh_path("no-length");
    let e = failure(
        storeCreate(&cfg(p_path(&path), JournalLengthArg::Absent)),
        "§7.1: absent → ConstructionArgumentMissing",
    );
    assert_code(
        &e,
        "ConstructionArgumentMissing",
        "§8.1 #12: the construction-time failure, and it now names ONE argument",
    );
}

// §7.1 + PAR-6 — a present but INVALID `filePath` (empty or non-string) answers AddressMalformed.
#[test]
fn s7_1_an_empty_file_path_fails_address_malformed() {
    let e = failure(storeCreate(&cfg(FilePathArg::Empty, n_count(4))), "§7.1");
    assert_code(&e, "AddressMalformed", "PAR-6: present but invalid");
}

// §7.1 + PAR-6 — `null` and `undefined` as `filePath` are present but invalid: AddressMalformed. (The
// amendment leaves this cell UNMOVED: the two shape-less values are arguments of the wrong SHAPE and are
// never `ConstructionArgumentMissing`.)
#[test]
fn s7_1_a_null_or_undefined_file_path_fails_address_malformed() {
    for arg in [FilePathArg::Null, FilePathArg::Undefined] {
        let e = failure(
            storeCreate(&cfg(arg, n_count(4))),
            "PAR-6's declared answer",
        );
        assert_code(&e, "AddressMalformed", "PAR-6: present but null/undefined");
    }
}

// §7.1 + PAR-6 + §0.4 — a non-string `filePath` answers AddressMalformed. `§0.4` declares the non-string
// `filePath`'s ONE Rust spelling as the unit variant `FilePathArg::NonString`, so the class's declared
// answer is driven through that spelling.
// Drives: §7.1, PAR-6, §0.4
#[test]
fn s7_1_a_non_string_file_path_fails_address_malformed() {
    for arg in [FilePathArg::NonString] {
        let e = failure(
            storeCreate(&cfg(arg, n_count(4))),
            "PAR-6's declared answer",
        );
        assert_code(&e, "AddressMalformed", "PAR-6: present but a non-string");
    }
}

// §7.1 + §0.2 DD-16 + PAR-7 — a `journalLength` of `0` is out of domain: AddressMalformed, and no
// clamping and no default occur.
// Drives: §7.1, §0.2 DD-16
#[test]
fn s7_1_a_zero_journal_length_fails_address_malformed() {
    let path = fresh_path("zero");
    let e = failure(
        storeCreate(&cfg(p_path(&path), JournalLengthArg::Zero)),
        "§7.1 / DD-16",
    );
    assert_code(&e, "AddressMalformed", "§7.1: present but out of domain");
}

// §7.1 + PAR-7 — a negative integer `journalLength` is out of domain: AddressMalformed.
#[test]
fn s7_1_a_negative_journal_length_fails_address_malformed() {
    let path = fresh_path("negative");
    let e = failure(
        storeCreate(&cfg(p_path(&path), JournalLengthArg::Negative(-1))),
        "PAR-7",
    );
    assert_code(&e, "AddressMalformed", "PAR-7: a negative integer");
}

// §7.1 + PAR-7 — a non-integer number (`1.5`, `NaN`, `±Infinity`) is out of domain: AddressMalformed.
#[test]
fn s7_1_a_non_integer_journal_length_fails_address_malformed() {
    let path = fresh_path("fractional");
    for arg in [
        JournalLengthArg::Fractional(1.5),
        JournalLengthArg::NaN,
        JournalLengthArg::Infinity,
    ] {
        let e = failure(storeCreate(&cfg(p_path(&path), arg)), "PAR-7");
        assert_code(&e, "AddressMalformed", "PAR-7: a non-integer number");
    }
}

// §7.1 + PAR-7 + §0.4 — a non-number `journalLength` (a non-number string, a non-number boolean, `null`,
// `undefined`, an object) is out of domain: AddressMalformed. `§0.4` declares this argument's outside
// classes as the unit variants `JournalLengthArg::NonNumberString` / `NonNumberBool`, so both are driven
// through the declared spellings.
// Drives: §7.1, §0.4
#[test]
fn s7_1_a_non_number_journal_length_fails_address_malformed() {
    let path = fresh_path("non-number");
    for arg in [
        JournalLengthArg::NonNumberString,
        JournalLengthArg::NonNumberBool,
        JournalLengthArg::Null,
        JournalLengthArg::Undefined,
        JournalLengthArg::Object,
    ] {
        let e = failure(
            storeCreate(&cfg(p_path(&path), arg)),
            "PAR-7's declared answer",
        );
        assert_code(&e, "AddressMalformed", "PAR-7: a non-number");
    }
}

// **⟶ ADDED 2026-10-11 — §8.1 #13 (`FilePathUnreachable`, rank `13`), the construction group's SECOND
// member, driven at each of the THREE unreachable forms `DD-40` names:** **the path's PARENT DIRECTORY does
// not exist** (`DD-40` (a): the probe is a dry run and creates no directory, so a creatable path whose
// parent is absent is UNREACHABLE); **the file is EXISTING BUT READ-ONLY** (`A55`: *"File must have write
// access"*; `A52`'s disjunction read as *"the application can write it successfully"* governing over *"the
// file exists"*); and **the path IS a DIRECTORY** (`DD-40` (b)). **NO INSTANCE is returned in any of the
// three, and NO byte is created by the probe** (`§8.1` #13's own trigger column).
// Drives: §8.1 #13, §7.1 (amended), A52, A53, A54, A55, DD-40
#[test]
fn s7_1_a_provided_but_unreachable_path_fails_file_path_unreachable() {
    // (a) the parent directory does not exist.
    let missing_parent = fresh_path("nodir");
    let path = format!("{missing_parent}/x.json");
    let e = failure(
        storeCreate(&cfg_at(&path, 4)),
        "§8.1 #13/DD-40 (a): the parent directory does not exist",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13: a PROVIDED path that FAILS the reachability test",
    );
    assert!(
        !std::path::Path::new(&missing_parent).exists(),
        "A55/DD-40 (a): the probe is a DRY RUN — it creates NO directory and NO byte"
    );
    assert!(
        e.message.contains(&path),
        "§8.2's `FilePathUnreachable` row: the message carries `MessageArgs.path`; got {}",
        e.message
    );
    assert!(
        e.message.contains("is not reachable at construction"),
        "§8.2's `FilePathUnreachable` row: its own `<mismatch clause>`; got {}",
        e.message
    );
    assert!(
        e.message
            .contains("the path must exist or the application must be able to write it"),
        "§8.2's `FilePathUnreachable` row: its own `<available clause>`; got {}",
        e.message
    );

    // (b) an EXISTING BUT READ-ONLY file.
    let ro_path = fresh_path("read-only");
    std::fs::write(&ro_path, b"{}").expect("the path holds a file");
    let mut perms = std::fs::metadata(&ro_path)
        .expect("the file's metadata")
        .permissions();
    perms.set_readonly(true);
    std::fs::set_permissions(&ro_path, perms).expect("the file is now read-only");
    let app_can_write = std::fs::OpenOptions::new()
        .write(true)
        .open(&ro_path)
        .is_ok();
    match storeCreate(&cfg_at(&ro_path, 4)) {
        Ok(_) => assert!(
            app_can_write,
            "A52/A55: an EXISTING BUT READ-ONLY file FAILS the reachability test — *\"write access is \
             required\"* — so no instance is returned. An instance was returned although the application \
             cannot write the path."
        ),
        Err(e) => {
            assert!(
                !app_can_write,
                "A52: where the application CAN write the path, arm (b) governs and the store is created \
                 at `file`; got {}",
                e.status
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§8.1 #13/A55: *\"the file exists\"* does NOT govern where it is not writable",
            );
        }
    }
    let _ = std::fs::remove_file(&ro_path);

    // (c) the path IS a directory. **THE PAIRED HALF IS UNMOVED AND IS DRIVEN BY
    // `s7_2_a_failed_file_tier_commit_passes_the_failure_back_and_leaves_state_unchanged`: the SAME state
    // reached later by a `file`-tier write on an already-constructed store remains `FileCommitFailed`**
    // (`DD-40` (b)).
    let dir_path = fresh_path("isdir");
    std::fs::create_dir(&dir_path).expect("the path is now a directory");
    let e = failure(
        storeCreate(&cfg_at(&dir_path, 4)),
        "§8.1 #13/DD-40 (b): the path IS a directory",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13: *\"the application can write it successfully\"* cannot hold of a directory",
    );
    let _ = std::fs::remove_dir(&dir_path);
}

// **⟶ ADDED 2026-10-11 — THE TWO ARMS OF `A52`'s DISJUNCTION, EACH CREATING A `file` REGISTER** (`A52`;
// `§7.1` step 3). **Each fixes the register's tier at `file`** (`A49`, `A50`; `store-model.md §1.6`
// item 4 (d)).
//
// **⟶ RE-DERIVED 2026-10-13, AT THIS CONTRACT'S TENTH BOUNDED AMENDMENT (`contract.md §10.4`; the row
// `U-STOREROOM-ACCESS-PROBE`): ARM (b)'s CELL IS CORRECTED TO THE DECLARED OBSERVABLES, AND ITS `A55` HALF
// IS NARROWED TO ITS OWN SUBJECT.** **THE AS-FILED ASSERTION READ** *"`A55`: the DRY RUN creates NO file —
// the first boot of a fresh path leaves the file system untouched until the first `file`-tier write
// commits"*, **WHICH IS THE SUPERSEDED READING**: **under `§10.4` part 3 a PROVIDED, ABSENT `filePath` whose
// parent exists IS CREATED EXCLUSIVELY BY THE CONSTRUCTION ITSELF (`create_new`), LEFT ZERO-LENGTH — AN
// EMPTY FILE AND NO BYTE — and the construction returns an instance whose register is fixed at `file`**
// (`§10.4` parts 2–3; `seams-and-lifecycle.md §7.1` step `4b` parts (A) and (B); `DD-28`'s amended cell).
// **AND `A55`'S WORD *"Dry run"* SURVIVES WHOLE, GOVERNING THE PROBE AND NOT THE STORE'S OWN ACT** (`§10.4`
// part 1; `seams-and-lifecycle.md §7.1` step 3's own *"the probe still creates NO FILE, NO DIRECTORY AND NO
// BYTE"*; the `docs/decisions.md` row of `2026-10-13` whose decision marker is *"Yes, creating the store
// with a file path can cause a test write to that file path."*), **so this cell's `A55` claim is kept for
// the PROBE — whose one observable here is that it truncates and rewrites nothing — and the CREATE is
// asserted as the declared act it now is.**
//
// **THE DECLARED OBSERVABLES NOW ASSERTED AT ARM (b)** (`§10.4`'s blast-radius clause; `implementation-plan.md
// §9.5` item 2): **the path EXISTS · its length is `0` · NO byte was written · and the register's tier is
// `file` before any write.** **THE PARENT DIRECTORY'S ENTRY COUNT MOVED BY EXACTLY ONE IS NOT ASSERTED
// HERE**, because this cell's path stands in the SHARED temp directory whose count every sibling cell's own
// file moves: that observable is driven where the count is the cell's own
// (`tests/construction_access_probe.rs`'s `acp_a_provided_absent_path_...` cell). **AND THE ARM (a) HALF IS
// UNMOVED** — an EXISTING path's bytes are byte-identical after the construction, which is `§10.4` part 6's
// `AlreadyExists` fall-through and NOT the probe's dry run alone.
// Drives: §7.1 (amended), §10.4 parts 2, 3 and 6, §7.1 step 4b (A)/(B), §1.6 item 4 (d), A49, A50, A52, A55
#[test]
fn s7_1_the_two_arms_of_the_reachability_test_each_create_a_file_register_by_a_dry_run() {
    // Arm (a): the file EXISTS — its bytes are the probe's own untouched input.
    let existing = fresh_path("exists");
    std::fs::write(&existing, b"prior bytes").expect("the path holds a file");
    let mut a = ok(
        storeCreate(&cfg_at(&existing, 4)),
        "A52 (a): the file exists, so the path is reachable",
    );
    assert_eq!(
        landing_tier(&a, &empty_address()),
        Tier::File,
        "A49/A50: a provided path that passes fixes the register's tier at `file`"
    );
    assert_eq!(
        std::fs::read(&existing).expect("the file is still there"),
        b"prior bytes".to_vec(),
        "A55: the probe is a DRY RUN — it writes nothing, not even an empty registry"
    );
    ok(
        a.write(AddressArg::List(key(&["r"])), w_file(), v_num(1.0)),
        "§5.6: with a `file` register all three tiers stand at a register key",
    );
    assert_eq!(
        landing_tier(&a, &empty_address()),
        Tier::File,
        "store-model.md §1.6 item 4 (d) (i): `findAddress([], mem).anchor.tier` IS the register's own tier — \
         `file` here, the caller's `t` selecting nothing"
    );

    // Arm (b): the application CAN WRITE IT — a fresh path in an existent writable directory.
    let creatable = fresh_path("creatable");
    // The cell's own PRE-STATE, stated so the create below is an observation and not an assumption.
    assert!(
        !std::path::Path::new(&creatable).exists(),
        "the PRE-STATE: the provided path is ABSENT, so the exclusive create's arm is the one this cell drives"
    );
    let mut b = ok(
        storeCreate(&cfg_at(&creatable, 4)),
        "A52 (b): the application can write the path, so it is reachable",
    );
    assert_eq!(
        landing_tier(&b, &empty_address()),
        Tier::File,
        "A49/A50: a provided path that passes fixes the register's tier at `file`"
    );
    // **§10.4 PART 3 — THE CONSTRUCTION'S OWN EXCLUSIVE CREATE, IN ITS FOUR DECLARED OBSERVABLES.**
    assert!(
        std::path::Path::new(&creatable).exists(),
        "§10.4 part 3 / §7.1 step 4b (A): the construction CREATES the store's OWN FILE at the provided, \
         absent path — *\"AN EMPTY FILE AND NO BYTE\"*. The superseded reading (*\"the DRY RUN creates NO \
         file — the first boot of a fresh path leaves the file system untouched until the first `file`-tier \
         write commits\"*) is what this assertion replaced"
    );
    assert_eq!(
        std::fs::metadata(&creatable)
            .expect("the store's own file")
            .len(),
        0,
        "§10.4 part 3: the file is left ZERO-LENGTH — a creation that writes a BYTE (an empty registry, a \
         `{{}}`, a newline, a header) is REFUSED (`DD-28`'s amended cell)"
    );
    assert_eq!(
        std::fs::read(&creatable).expect("the store's own file is readable"),
        Vec::<u8>::new(),
        "§10.4 part 3: NO byte was written — an EMPTY FILE AND NO BYTE"
    );
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` item 1 AS AMENDED, `surface.md §2.11` clause 2): the verb
    // RECORDS the write, installs the node, appends the entry and returns its `WriteResult` — *"AND IT
    // PERFORMS NO FILE I/O ON ANY OF ITS ARMS"* — and THE TERMINAL ARM'S OWN ACT is what puts bytes at
    // `cfg.filePath`. The drive therefore takes the op the verb returned and DRIVES THAT ACT AT ITS OWN
    // INSTANT, keyed by that op's identity and nothing else.**
    let landed = ok(
        b.write(AddressArg::List(key(&["r"])), w_file(), v_num(2.0)),
        "§7.2 item 1 as amended: the `file`-tier write RECORDS the write and returns its `WriteResult` — \
         the verb's `file`-tier arm is indistinguishable at its own return from its `mem`-tier arm but for \
         the tier the anchor carries",
    );
    ok(
        commit_at_the_terminal_arm(&mut b, &landed.op.opId),
        "§7.2 item 2 as amended / §2.11 clause 2: THE TERMINAL ARM'S OWN ACT — the `file`-tier commit, \
         keyed by the settled record's own `op` — is what commits at the path",
    );
    // **AND THE WRITE HALF THAT REMAINS TRUE AND IS KEPT: a `file`-tier write is the ONE durability route**
    // — the construction's create commits NO register key, NO journal entry and NO registration
    // (`§10.4` part 6; `DD-28`'s amended cell), so the bytes at the path are the WRITE's act's and it has
    // put SOME at a path the construction left empty.
    assert!(
        std::fs::metadata(&creatable)
            .expect("the committed file")
            .len()
            > 0,
        "§7.2 item 2 / §10.4 part 6: the `file`-tier write's own act is the durability route — the path \
         held 0 bytes before it and holds the committed bytes after it"
    );
    assert_eq!(
        landing_tier(&b, &empty_address()),
        Tier::File,
        "store-model.md §1.6 item 4 (d) (i): the register's tier is FIXED AT CREATION and the write did not \
         move it"
    );
    let _ = std::fs::remove_file(&creatable);
}

// **⟶ ADDED 2026-10-11 — `PAR-12`/`§7.1` step 5: the EMPTY `listeners[]` ARRAY IS IN THE DOMAIN** (`DD-39`:
// *"the empty array is the ordinary no-listener store"*), **and its observable is `PAR-12`'s own:**
// **`0` entries in ⇒ a store whose FIRST successful write carries `triggered: []`**.
// Drives: §7.1 (amended) step 5, PAR-12, DD-39, §6.5 item 8 (d)
#[test]
fn s7_1_an_empty_listener_array_is_the_ordinary_no_listener_store() {
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("empty-listeners"),
            4,
            listeners(Vec::new()),
        )),
        "PAR-12: the empty array is IN the domain and no instance is refused",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        w.triggered.is_empty(),
        "PAR-12's observable: `0` entries in ⇒ the first successful write carries `triggered: []`"
    );
    assert!(
        w.watched.is_empty(),
        "§5.8 (e): and no watched address is produced either"
    );
}

// **⟶ ADDED 2026-10-11 — `DD-39`: A DUPLICATE ADDRESS IN `listeners[]` IS ADMITTED AND BOTH ENTRIES ARE
// KEPT, EACH WITH ITS OWN HANDLE** — the construction is a POPULATION step and not a registration verb, so
// **`§6.5` item 12 (c)'s `listen`-idempotence does NOT reach it**: item 12 (b) states the construction's own
// rule (*"two entries at ONE address carry their OWN two handles and a trigger returns BOTH"*), and `§0.4`'s
// construction-rule clause 2 (b) reads the same (*"ADOPTED AT CONSTRUCTION, i.e. a token the caller spelled
// and passed in a `listeners[]` entry, which the construction adopts VERBATIM as that entry's handle"*) —
// **so `CF-1`'s resolution re-derived this subject's `listen` cell and leaves THIS one standing: two entries
// at one address, each keeping the caller's own handle, and a trigger returns BOTH.** Its observable is
// `PAR-12`'s own: *"`2` entries in ⇒ `2` entries in the home"*.
// **The caller-spelled handles this drive uses are `§0.4` clause 1's DECLARED spelling
// (`ListenerHandle::from`) — the `CONTRACT FINDING` `G-2` this comment used to name is CLOSED.**
// Drives: §7.1 (amended) step 5, PAR-12, PAR-13, DD-39, §5.8 (a), §6.5 items 12 (b)/(c)
#[test]
fn s7_1_a_duplicate_listener_address_is_admitted_and_both_handles_are_kept() {
    let h1 = handle("dup-a");
    let h2 = handle("dup-b");
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("duplicate"),
            4,
            listeners(vec![
                entry(key(&["a"]), h1.clone()),
                entry(key(&["a"]), h2.clone()),
            ]),
        )),
        "DD-39: a duplicate address is ADMITTED — both entries are kept",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w.triggered.len(),
        2,
        "PAR-12's observable: `2` entries in ⇒ `2` entries in the home, and the trigger returns BOTH"
    );
    assert!(
        same_handle_set(&w.triggered, &[h1.clone(), h2.clone()]),
        "DD-39: *\"the home then holds two entries at one address with two DIFFERENT handles, and a trigger \
         returns both\"*"
    );
    assert!(
        !(h1 == h2),
        "PAR-13: the store's handles are store-unique, so the two entries never share one"
    );
    assert_eq!(
        w.watched.len(),
        1,
        "§5.8 (e)/§6.5 item 2's KEPT half: the ADDRESS list carries DISTINCT addresses — one member"
    );
}

// **⟶ ADDED 2026-10-11 — `PAR-12`'s OUTSIDE VALUES, EACH WITH ITS DECLARED ANSWER** (`seams-and-lifecycle.md
// §7.1`'s amended `cfg.listeners` row): **ABSENT from `cfg` · `null` · `undefined` · a non-array · an array
// carrying an entry whose `address` is outside `PAR-1`'s domain** — **`AddressMalformed` for every one of
// them, with NO instance returned**, and *"no entry is silently dropped: a rejected array admits NOTHING"*.
// Drives: PAR-12, §7.1 (amended), §8.1 #1, PAR-1
#[test]
fn s7_1_a_listeners_argument_outside_its_domain_fails_address_malformed() {
    let path = fresh_path("bad-listeners");
    let bad: Vec<(&str, ListenersArg)> = vec![
        ("absent", ListenersArg::Absent),
        ("null", ListenersArg::Null),
        ("undefined", ListenersArg::Undefined),
        ("a non-array", ListenersArg::NonArray("number".into())),
        (
            "an entry whose address is outside PAR-1's domain",
            listeners(vec![entry(vec![Segment::Bool(true)], handle("bad-addr"))]),
        ),
    ];
    for (what, arg) in bad {
        let e = failure(
            storeCreate(&cfg_at_with_listeners(&path, 4, arg)),
            "PAR-12's declared answer",
        );
        assert_code(
            &e,
            "AddressMalformed",
            &format!("PAR-12/§7.1: `listeners[]` {what} → AddressMalformed, no instance"),
        );
    }
}

// **⟶ AM-9 — THE ORDER CELL IS WITHDRAWN AT ITS SITE, WITH ITS `§` AND ITS REASON; THE OBSERVABLE THAT
// REMAINS IS DRIVEN IN ITS PLACE.** `write-and-read.md §6.5` item 8 (d) with `A56` (*"populate home map
// BEFORE generating registry"*; `§7.1`'s amended sequence, the HOME at step 5 and the REGISTRY at step 6,
// *"the order of steps 5 and 6 is the ruling's whole point and is NOT interchangeable"*). **THE WITHDRAWAL,
// IN THE CLAUSE'S OWN TERMS:** the sentence this cell asserted is that *"the register's carrier node carries
// the listener references FROM THE OUTSET"*, and under the reading `§5.8` (d) licenses — the per-node lists
// are *"an INDEX FOR LOOKUP COST only … the same two sets must be produced whether the index is consulted or
// the home is scanned"* — a node carrying no list still yields the SAME handle set, because the trigger reads
// the ONE home (`§6.5` item 8 (b); `A48`). **So the CARRIER-NODE sentence is unobservable at this surface,
// and the cell that asserted a write's returned handle could not fail for a wrong order** (any order that
// populates the home before the FIRST WRITE returns the same handle). **The withdrawn assertion is named so
// it is not re-authored.** **WHAT IS DRIVEN INSTEAD IS THE PART OF STEP 5'S RULING THAT IS OBSERVABLE, AND
// THE CONTRACT'S OWN NEW CLAUSE NAMES EXACTLY THIS OBSERVABLE:** **`DD-41`** (*"the sets being produced from
// the home `§7.1` step 5 populated BEFORE the registry was generated, so `A56`'s order stays observable
// through the sets"*) **and `§5.4` (f)'s dated part (3)** — **so the same drive stands, no assertion
// weakened, its heading corrected to what it observes:** the construction's binding is the HOME's (an address
// no node stood at when the home was populated still returns the construction's handle, and the registration
// appends no journal entry, `§6.1` item 3), the registry is generated EMPTY (`§7.1` step 6), and the prefix
// test runs downward only (`DD-18`).
// Drives: §7.1 (amended) steps 5–6, §6.5 item 8 (b)/(d), A41, A56, DD-18, DD-41, §5.4 (f) part (3), §6.1 item 3, store-model.md §1.6 item 4 (b)
#[test]
fn s7_1_the_construction_binds_the_home_at_every_address_the_array_names() {
    let h = handle("from-the-outset");
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("home-first"),
            4,
            listeners(vec![entry(key(&["a", "b"]), h.clone())]),
        )),
        "§7.1 step 5: the home is populated from the array",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§7.1 step 6: the registry is generated EMPTY — the home is not a graph entry"
    );
    // The listener binds at a NESTED address no node stands at when the home is populated, and the branch
    // its parent needs is minted by a write that does NOT resolve to it (the prefix test of `DD-18`).
    let parent = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the parent branch the nested address needs",
    );
    assert!(
        parent.triggered.is_empty(),
        "DD-18: the listener's address is a prefix of the write's address ONLY downward — a write at the \
         parent does not trigger it"
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: the first write AT the address the home already carries",
    );
    assert!(
        same_handle_set(&w.triggered, &[h.clone()]),
        "A56/§6.5 item 8 (d) READ AT ITS OBSERVABLE HALF (AM-9's withdrawal: the carrier-node half is \
         unobservable under §5.8 (d)'s index-for-lookup-cost reading): the FIRST write's trigger returns the \
         handle the construction supplied, at an address no node stood at when the home was populated — so \
         the binding is the ONE HOME's and the registry step did not drop it"
    );
}

// §5.7 (P-TP-7) — two instances built from EQUAL arguments are INDEPENDENT: no state, no journal entry,
// no registration is shared. **⟶ RE-DERIVED: the shared-registration half is now driven through the
// listener surface, and `DD-38` gives the clause its listener half** (*"a registration is dropped at PROCESS
// EXIT"*, the home is instance- and session-scoped, and a fresh instance over an equal `filePath` loads NO
// registration).
// Drives: §5.7 (P-TP-7), §7.1, DD-14, DD-38
#[test]
fn s5_7_two_instances_from_equal_arguments_are_independent() {
    let path = fresh_path("independent");
    let equal = cfg(p_path(&path), n_count(8));
    let mut a = ok(storeCreate(&equal), "§5.7 (ii)");
    let mut b = ok(storeCreate(&equal), "§5.7 (ii)");
    let w = ok(
        a.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        b.read(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§5.7: no state is shared",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§5.7: no state is shared between two instances",
    );
    let foreign = failure(
        b.rollback(OpIdArg::Id(w.op.opId.clone())),
        "§5.7: no journal entry is shared",
    );
    assert_code(
        &foreign,
        "JournalOpUnknown",
        "§5.7: no journal entry is shared",
    );
    let a_handle = handle("con-a-1");
    ok(
        a.listen(&a_handle, &[key(&["a"])]),
        "§6.5 item 12: a registration in instance a",
    );
    let wb = ok(
        b.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3 in instance b",
    );
    assert!(
        wb.watched.is_empty() && wb.triggered.is_empty(),
        "§5.7/DD-38: no registration and no handle is shared"
    );
}

// §7.2 item 6 (declared default) + the boot block item 4 — on `storeCreate`, the `file` tier's content at
// `cfg.filePath` is loaded if the file exists, and the register begins with the keys that content carries.
// Drives: §7.2 item 6 (declared def
#[test]
fn s7_2_the_file_tier_s_content_is_loaded_at_creation() {
    let path = fresh_path("boot");
    let config = cfg_at(&path, 8);
    let mut first = ok(storeCreate(&config), "§7.1");
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` item 1 AS AMENDED): the verb records the write and performs
    // NO file I/O on any of its arms, so the boot below would load nothing from the verb's return alone.
    // The terminal arm's own act — driven here at its own instant, keyed by the settled record's own `op` —
    // is what puts the content at `cfg.filePath` that item 6's boot reads.**
    let landed = ok(
        first.write(AddressArg::List(key(&["durable"])), w_file(), v_str("kept")),
        "§3.4 W-3 at file / §7.2 item 1 as amended: the write is RECORDED and its `WriteResult` returned",
    );
    ok(
        commit_at_the_terminal_arm(&mut first, &landed.op.opId),
        "§7.2 item 2 as amended / §2.11 clause 2: the terminal arm's own act commits the `file` state at \
         `cfg.filePath`",
    );
    let second = ok(storeCreate(&config), "§7.2 item 6: the boot");
    assert_eq!(
        read_at(&second, &key(&["durable"])),
        v_str("kept"),
        "§7.2 item 6: the register begins with it"
    );
}

// The boot block item 5 (P-TP-7) — nothing else is restored at boot: `mem` and `temp` begin EMPTY, the
// journal begins with 0 entries and nothing is watched.
// Drives: § (no clause found)
#[test]
fn s7_2_the_boot_restores_nothing_but_the_file_tier() {
    let path = fresh_path("boot-empty");
    let config = cfg_at(&path, 8);
    let mut first = ok(storeCreate(&config), "§7.1");
    ok(
        first.write(AddressArg::List(key(&["m"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at mem",
    );
    ok(
        first.write(AddressArg::List(key(&["t"])), w_temp(), v_num(2.0)),
        "§3.4 W-3 at temp",
    );
    let mut second = ok(storeCreate(&config), "§7.1");
    for name in ["m", "t"] {
        let e = failure(
            second.read(AddressArg::List(key(&[name])), TierArg::Absent),
            "boot block item 5",
        );
        assert_code(
            &e,
            "AddressNotFound",
            "boot block item 5: `mem` and `temp` begin EMPTY",
        );
    }
    let w = ok(
        second.write(AddressArg::List(key(&["z"])), w_mem(), v_num(3.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w.op.seq, 1,
        "boot block item 5: the journal begins with 0 entries"
    );
    assert!(
        w.watched.is_empty(),
        "boot block item 5: nothing is watched"
    );
}

// **⟶ ADDED 2026-10-11 — THE BOOT LOADS NO REGISTRATION** (`§7.1`'s amended step 7 with `DD-38`): **the home
// is INSTANCE-SCOPED AND SESSION-SCOPED and is OUT OF THE `file` BYTES and OUT OF THE JOURNAL, so a fresh
// `storeCreate` over an EQUAL path begins with no registration — the boot's shipped answer (*"nothing is
// watched"*) stands for the listener surface too, and `P-TP-7`'s independence clause is its register row.**
// Drives: §7.1 (amended) step 7, §7.2 item 6, DD-38, §6.5 item 8 (e)
#[test]
fn s7_2_a_boot_loads_no_registration() {
    let path = fresh_path("boot-no-listener");
    let config = cfg_at_with_listeners(
        &path,
        8,
        listeners(vec![entry(key(&["durable"]), handle("boot-lost"))]),
    );
    let mut first = ok(storeCreate(&config), "§7.1 step 5");
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`): the verb performs NO FILE I/O on any of its arms (`§7.2` item 1
    // as amended), so the content item 6's boot loads is put there by THE TERMINAL ARM'S OWN ACT, keyed by
    // the settled record's own `op` (`§2.11` clause 2).**
    let landed = ok(
        first.write(AddressArg::List(key(&["durable"])), w_file(), v_str("kept")),
        "§7.2 item 1 as amended: the write is RECORDED; the verb performs no file I/O",
    );
    ok(
        commit_at_the_terminal_arm(&mut first, &landed.op.opId),
        "§7.2 item 2 as amended: the terminal arm's own act commits the `file` tier's state at the path",
    );
    // **THE FRESH INSTANCE IS CONSTRUCTED OVER AN EQUAL PATH WITH ITS OWN (EMPTY) LISTENER ARRAY** — the
    // clause's own state: *"a fresh instance over an equal `cfg.filePath` begins with `triggered: []` on its
    // first write"* — so what the boot loads is the `file` tier's content and NOT the first instance's home.
    let mut second = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.2 item 6: the boot over an equal path",
    );
    assert_eq!(
        read_at(&second, &key(&["durable"])),
        v_str("kept"),
        "§7.2 item 6: the register's own keys are loaded"
    );
    let w = ok(
        second.write(AddressArg::List(key(&["durable"])), w_mem(), v_str("again")),
        "§3.4 W-1: a write at the loaded key",
    );
    assert!(
        w.triggered.is_empty(),
        "DD-38/§7.1 step 7: the boot loads NO registration — the home is out of the `file` bytes"
    );
    assert!(
        w.watched.is_empty(),
        "DD-38: and it produces no watched address either"
    );
}

// §7.2 items 1–2 (`M-12`, DD-2) — the `file` tier is saved to a JSON file at `cfg.filePath`, and a
// successful commit's bytes land whole.
// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2): THE
// `file`-TIER DURABLE COMMIT IS THE TERMINAL ARM'S OWN ACT AND NOT THE VERB'S. The drive therefore keeps
// the verb's own return beside the act — the write RECORDS the write and performs NO FILE I/O on any of
// its arms — and drives the commit keyed by the settled record's own `op`, which is the one key the act
// reads.**
// Drives: §7.2 items 1–2 as amended
#[test]
fn s7_2_a_file_tier_write_commits_to_the_json_file_at_the_path() {
    let path = fresh_path("commit");
    let mut store = ok(storeCreate(&cfg_at(&path, 8)), "§7.1");
    let landed = ok(
        store.write(AddressArg::List(key(&["durable"])), w_file(), v_str("kept")),
        "§3.4 W-3 at file / §7.2 item 1 as amended: the verb records the write, installs the node, appends \
         the entry and returns its `WriteResult`",
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &landed.op.opId),
        "§7.2 item 2 as amended / §2.11 clause 2: the terminal arm's own act — keyed by the settled \
         record's own `op` — writes the whole serialized `file` state",
    );
    let bytes = std::fs::read_to_string(&path).expect("§7.2 item 2: a JSON file at cfg.filePath");
    assert!(
        !bytes.is_empty(),
        "§0.2 DD-2: a successful commit writes the whole serialized file state"
    );
    assert!(
        bytes.contains("durable"),
        "§7.2 item 2: the committed state carries the store's keys"
    );
}

// §7.2 items 2–4 + §0.2 DD-2/DD-25 — a failed `file`-tier commit: the file rolls back the change in the
// journal automatically and THEN the failure is passed back to the caller, so the caller receives the
// failure — whose CODE is `FileCommitFailed` (**⟶ AMENDED 2026-10-11: `§8.1` #15, the member's rank moving
// from `14` to `15` because the construction group gained `FilePathUnreachable` at rank `13`; its TRIGGER is
// UNCHANGED**) — and the store's observable state is unchanged. **THE TRIGGER IS THE REAL ONE**: the path at
// `cfg.filePath` is replaced by a directory so the file write cannot land. **AND IT IS `DD-40` (b)'s PAIRED
// HALF: the SAME state at CONSTRUCTION is `FilePathUnreachable` (`§8.1` #13, driven in
// `s7_1_a_provided_but_unreachable_path_fails_file_path_unreachable`), while here — after the instance
// exists — it remains `FileCommitFailed`.**
// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 2–3 AS AMENDED, `surface.md §2.11` clause 5): THE
// FAILURE IS THE TERMINAL ARM'S ACT'S AND NOT THE VERB'S.** **The drive separates the two instants at its
// own bytes: the verb's return is asserted `Ok` — *"it performs NO FILE I/O ON ANY OF ITS ARMS"* — and the
// refusal is taken from the act, where *"the store rolls the write back FIRST and the call answers with a
// message SECOND"*, so the caller receives the failure and never the rolled-back state.**
// Drives: §7.2 items 2–4 as amended, §8.1 #15, §8.2, DD-40 (b)
#[test]
fn s7_2_a_failed_file_tier_commit_passes_the_failure_back_and_leaves_state_unchanged() {
    let path = fresh_path("commit-fails");
    let mut store = ok(storeCreate(&cfg_at(&path, 8)), "§7.1");
    let kept = ok(
        store.write(AddressArg::List(key(&["ok"])), w_file(), v_num(1.0)),
        "§3.4 W-3 / §7.2 item 1 as amended: the verb records the write",
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &kept.op.opId),
        "§7.2 item 2 as amended: the passing write's last image is committed at the path",
    );
    let before = read_at(&store, &empty_address());
    let _ = std::fs::remove_file(&path);
    std::fs::create_dir(&path)
        .expect("the path now holds a directory, so a file write cannot land");
    // **THE VERB'S OWN ARM FIRST — AND IT IS `Ok`.** `§7.2` item 1 as amended: the `file`-tier write records
    // the write, installs the node, appends the entry and returns its `WriteResult`; NO byte of the path is
    // touched by the verb, so the directory beside it decides nothing at this instant.
    let never = ok(
        store.write(AddressArg::List(key(&["never"])), w_file(), v_num(2.0)),
        "§7.2 item 1 as amended: the verb's `file`-tier arm returns as it does today — it records the write \
         and performs NO FILE I/O on any of its arms",
    );
    // **THE ACT'S OWN FAILURE ARM — WHERE `FileCommitFailed` LIVES NOW.**
    match commit_at_the_terminal_arm(&mut store, &never.op.opId) {
        Ok(()) => panic!("§7.2 item 3: the failure is passed back to the caller"),
        Err(e) => assert_code(
            &e,
            "FileCommitFailed",
            "§8.1 #15: the `file`-tier commit failure's ONE code",
        ),
    }
    assert_eq!(
        read_at(&store, &empty_address()),
        before,
        "§3.5 + DD-2: the failed commit leaves state unchanged"
    );
    let _ = std::fs::remove_dir(&path);
}
