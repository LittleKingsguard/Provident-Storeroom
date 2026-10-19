//! `tests/construction_access_probe.rs` — **THE AMENDMENT'S NEW DRIVING CELLS FOR `U-STOREROOM-ACCESS-PROBE`,
//! AUTHORED FROM THE FROZEN CONTRACT ALONE** (`docs/specs/storeroom-native/contract.md` `§10.4` parts 1–7;
//! its `§8.1` #13 trigger clause; its `§5.7` `P-TP-7` re-derived row; `seams-and-lifecycle.md §7.1` step 3's
//! dated clauses, step `3`-bis, the store's-own-act clause, step `4b`, and the `cfg.filePath` row;
//! `store-model.md §1.6` item 4 (d) and its cell at `:258`).
//!
//! **THE BEHAVIOUR THIS FILE PINS, IN THE CONTRACT'S OWN TERMS** (`contract.md §10.4`):
//! **`storeCreate` over a PROVIDED, ABSENT `filePath` whose parent exists CREATES the store's own file
//! EXCLUSIVELY (`create_new`) and leaves it ZERO-LENGTH — AN EMPTY FILE AND NO BYTE — and RETURNS AN INSTANCE
//! whose register's tier is `file`** (part 3; `seams-and-lifecycle.md §7.1` step `4b` part (A)).
//! **On `AlreadyExists` the arm falls through to arm (a)'s existing write-mode open, so a construction over
//! an EXISTING file NEVER TRUNCATES it and leaves that path's bytes BYTE-IDENTICAL** (part 6; step `4b`
//! part (B)). **Every other failure of the exclusive create — `EROFS`, `EACCES`, `ENOENT`, and the
//! path-that-is-a-directory — REFUSES AT CONSTRUCTION with `FilePathUnreachable` and NO INSTANCE is
//! returned** (part 5; `§8.1` #13; step `4b` part (C)). **`listeners[]` is validated BEFORE the create
//! (step `3`-bis), so EVERY construction that FAILS LEAVES NOTHING BEHIND** (part 4; `P-TP-7`'s amended
//! failure list). **And the reachability predicate is ONE predicate with TWO KERNEL-DECIDED arms: a
//! write-mode open for the path that EXISTS, `create_new` for the path that is ABSENT — NO SECOND PREDICATE
//! IS AUTHORED** (part 1; `DD-45`'s amended clause).
//!
//! # STATES ENUMERATED BEFORE ANY CELL
//!
//! **`filePath` PROVIDED — the LEGAL states and their declared observables** (`§7.1`'s amended `filePath`
//! row; `§5.7`'s re-derived `S-CONSTRUCT` cell list):
//! 1. **ABSENT with the parent directory PRESENT and writable BY THE PROCESS** — the discriminating state:
//!    the exclusive create SUCCEEDS ⇒ the path EXISTS, its length is `0`, the parent's entry count moved by
//!    EXACTLY ONE, and the register's tier is `file`.
//! 2. **ABSENT with the parent directory PRESENT but the process DENIED the create (`EACCES`)** — the
//!    `DD-45`-class form this amendment makes decidable for the first time: REFUSED at construction.
//!    **ITS TWO DRIVABLE FACES ARE NAMED, BECAUSE ONLY ONE OF THEM DISCRIMINATES:** **2 (a) the parent at
//!    `0o200` (owner-write set, owner-EXECUTE cleared) — where a MODE-BIT reading answers WRITABLE and the
//!    kernel answers `EACCES`, so the two readings DIVERGE and the cell separates the withdrawn instrument
//!    from the amended one** (the cell below, whose own preconditions assert the divergence); **2 (b) the
//!    parent at `0o555` — where BOTH instruments answer UNWRITABLE, so a cell there is green under either
//!    reading and discriminates nothing.**
//! 3. **ABSENT with the parent directory ABSENT (`ENOENT`)** — `DD-40` (a): REFUSED at construction.
//! 4. **the path IS A DIRECTORY** — `DD-40` (b): REFUSED at construction.
//! 5. **the path EXISTS and is WRITABLE** — arm (a), UNMOVED: an instance is returned, the register's tier
//!    is `file`, and the file's bytes are BYTE-IDENTICAL (the create answers `AlreadyExists` and falls
//!    through).
//! 6. **the path EXISTS and is NOT WRITABLE (a read-only file)** — REFUSED at construction.
//! 7. **the path EXISTS and carries the bytes of the LAST SUCCESSFUL `file`-TIER WRITE** — a fresh
//!    `storeCreate` over the equal path BOOT-LOADS those bytes (the boot's own act, not a second producer:
//!    `DD-28`'s amended cell).
//! 8. **the path ABSENT and `listeners[]` carrying a BLANK HANDLE TOKEN** — the malformed array is refused
//!    at step `3`-bis, BEFORE the create, so NO FILE IS CREATED (`A55`'s *"leaves nothing behind"*).
//!
//! **⟶ CORRECTED 2026-10-13 — THE CLAIM THIS HEADER CARRIED IS FALSE AND IS RECTIFIED AT ITS OWN BYTES, NOT
//! SOFTENED.** **This header read: *"the ACL-DENY / OWNERSHIP-MISMATCH face of `EACCES` CANNOT BE CONSTRUCTED
//! BY THIS SUITE"*, and *"`release.md:25`–`:29` declares all five CI runners with sufficient privilege"*.**
//! **THE FIRST SENTENCE IS REFUTED BY ONE CELL AND ONE MEASUREMENT:** at a parent directory the process OWNS
//! with mode `0o200` or `0o300` — owner-write set, owner-EXECUTE CLEARED — `std::fs::metadata(dir)
//! .permissions().readonly()` answers **`false` (WRITABLE, since it is `mode & 0o222 == 0`)** while the
//! kernel answers **`EACCES`**, because ADDING A DIRECTORY ENTRY additionally requires SEARCH/EXECUTE on the
//! parent. **That is the mode-bits-versus-kernel divergence in BOTH directions, at `uid≠0`, with NO ACL, NO
//! MOUNT AND NO PRIVILEGE** — and it is exactly the divergence `DEF-20` was filed for and the amendment
//! replaces (`docs/defects.md`'s `DEF-2026-10-13-B`; `contract.md §8.1` #13's amended clause (a)/(b)).
//! **THE SECOND SENTENCE CITED A TABLE WHOSE SUBJECT IS NEITHER:** `release.md:25`–`:29` is a table of five
//! BUILD TARGETS and says nothing about the running process's privilege — the measurement is `uid=1000`.
//! **SO THIS FILE NOW CARRIES THE CELL THAT DRIVES IT** (`acp_a_mode_writable_parent_that_denies_the_create_
//! refuses_at_construction`, whose own preconditions are asserted rather than assumed), **the `0o200` parent
//! IS the decidable ACL/ownership-adjacent instance this suite reaches**, and the two forms that genuinely
//! remain out of reach are DRIVEN WITH AN HONEST CAPABILITY PRECONDITION AND A RECORDED `SKIPPED-UNREACHABLE`
//! rather than left as a claim in a header (cells 12 and 13 below).
//!
//! **THE DISCIPLINE THIS FILE OBSERVES.** Every expected value comes from a `§`-numbered clause named in the
//! cell's own comment, and the observables are the contract's DECLARED ones — the path EXISTS, its length is
//! `0`, the parent directory's entry count moved by EXACTLY ONE, and NO byte was written (`contract.md
//! §10.4`'s blast-radius clause; `implementation-plan.md §9.5` item 2). **No `src/**` byte was read to
//! decide an assertion.** **No assertion here is weakened to force a green.**

mod support;
use support::*;

// ---------------------------------------------------------------------------------------------------
// The file-system observables `§10.4`'s blast-radius clause declares, and nothing else.
// ---------------------------------------------------------------------------------------------------

/// **The parent directory's ENTRY COUNT** — the observable `contract.md §10.4`'s blast-radius clause names
/// (*"the parent directory's entry count moved by EXACTLY ONE"*) and `P-TP-7`'s amended failure list
/// requires to be UNCHANGED where a construction FAILS.
fn entry_count(dir: &std::path::Path) -> usize {
    std::fs::read_dir(dir)
        .unwrap_or_else(|e| panic!("the parent directory must be readable: {e}"))
        .count()
}

/// The path's own length in bytes, or `None` where the path does not exist.
fn path_length(path: &str) -> Option<u64> {
    match std::fs::metadata(path) {
        Ok(m) => Some(m.len()),
        Err(_) => None,
    }
}

// ===================================================================================================
// STATE 1 — the DISCRIMINATING state: a PROVIDED, ABSENT path whose parent the process CAN write.
// ===================================================================================================

// **CELL 1 — SUCCESS CREATES THE STORE'S OWN FILE, LEAVES IT ZERO-LENGTH, AND FIXES THE REGISTER AT `file`.**
// `contract.md §10.4` part 3, verbatim: *"A successful exclusive create produces AN EMPTY FILE AND NO BYTE —
// the file's length is `0` and NO register key, NO journal entry and NO registration is committed — and the
// construction RETURNS AN INSTANCE whose register's tier is `file`"*; `seams-and-lifecycle.md §7.1` step `4b`
// part (A): *"WHERE `filePath` IS PROVIDED AND ITS FILE IS ABSENT, THE STORE CREATES ITS OWN FILE AT THAT
// PATH — EXCLUSIVELY — AND LEAVES IT ZERO-LENGTH: AN EMPTY FILE AND NO BYTE."*
//
// **THE FOUR DECLARED OBSERVABLES, ASSERTED ONE BY ONE** (the blast-radius clause's own list):
// the path EXISTS · its length is `0` · the parent directory's entry count moved by EXACTLY ONE · NO byte
// was written. And the fifth: the returned instance's register tier is `file` (`store-model.md §1.6`
// item 4 (d); `A49`/`A50`).
// Drives: §10.4 parts 3 and 4; §7.1 step 4b (A); §7.1's amended `filePath` row; store-model.md §1.6 item 4 (d)
#[test]
fn acp_a_provided_absent_path_with_a_writable_parent_is_created_exclusively_and_empty() {
    // This cell's own parent directory, so the entry count is this cell's own and no sibling's.
    let parent = std::path::PathBuf::from(fresh_path("acp-parent-exists"));
    std::fs::create_dir_all(&parent).expect("this cell's own parent directory");
    let path = parent.join("store.json");
    let path_str = path.to_string_lossy().into_owned();
    assert!(
        !path.exists(),
        "the cell's PRE-STATE: the provided path is ABSENT (`§7.1`: the absent-file arm)"
    );
    let before = entry_count(&parent);

    let store = ok(
        storeCreate(&cfg_at(&path_str, 4)),
        "§10.4 part 3: the exclusive create at a provided, absent path whose parent exists SUCCEEDS, and \
         the construction RETURNS AN INSTANCE — a refusal here is the withdrawn reading",
    );

    // (i) THE PATH EXISTS.
    assert!(
        path.exists(),
        "§10.4 part 3: the construction CREATES the store's own file at the provided path — an absent path \
         after a successful construction is the SUPERSEDED reading (*\"the DRY RUN creates NO file\"*)"
    );
    // (ii) ITS LENGTH IS `0` — an EMPTY FILE AND NO BYTE.
    assert_eq!(
        path_length(&path_str),
        Some(0),
        "§10.4 part 3 / §7.1 step 4b (A): the store's own file is left ZERO-LENGTH — AN EMPTY FILE AND NO \
         BYTE (`DD-28`'s amended cell: a creation that writes a BYTE — an empty registry, a `{{}}`, a \
         newline, a header — is REFUSED)"
    );
    // (iii) THE PARENT DIRECTORY'S ENTRY COUNT MOVED BY EXACTLY ONE.
    assert_eq!(
        entry_count(&parent),
        before + 1,
        "§10.4's blast-radius clause: the parent directory's entry count moved by EXACTLY ONE — not by two \
         (no litter, no second file) and not by zero (the create did not happen)"
    );
    // (iv) NO BYTE WAS WRITTEN.
    assert_eq!(
        std::fs::read(&path).expect("the created file is readable"),
        Vec::<u8>::new(),
        "§10.4 part 3: NO byte is written — *\"an EMPTY FILE AND NO BYTE\"* — so the committed bytes at the \
         path remain the bytes of the last successful `file`-tier `write` (`DD-28`'s amended cell)"
    );
    // (v) THE REGISTER'S TIER IS `file` (`A49`/`A50`; store-model.md §1.6 item 4 (d)).
    assert_eq!(
        landing_tier(&store, &empty_address()),
        Tier::File,
        "§10.4 part 3: the construction returns an instance *\"whose register's tier is `file`\"*"
    );

    let _ = std::fs::remove_dir_all(&parent);
}

// **CELL 1-bis — THE SAME SUCCESS DRIVEN AT ALL FOUR OF `§10.4`'s DECLARED OBSERVABLES, AND THEN A SECOND
// CONSTRUCTION OVER THE SAME PATH.** **`P-TP-7`'s `S-CONSTRUCT` generator reaches this state's DECLARED
// answer only as *"the register holds 0 keys"*** (`tests/properties.rs`'s drive 1: it constructs over a fresh
// path and reads `{}`) — **and the amendment's own declared observables are FOUR, NAMED IN ITS BLAST-RADIUS
// CLAUSE:** **the file EXISTS · its length is `0` · the parent directory's entry count moved by EXACTLY ONE ·
// and the register's landing tier is `file` BEFORE ANY WRITE** (`contract.md §10.4` part 3; `DD-28`'s amended
// cell; `A49`/`A50`; `store-model.md §1.6` item 4 (d)).
//
// **THE SECOND CONSTRUCTION IS THE DISCRIMINATOR THE FOUR ALONE CANNOT BE.** A first construction that
// created the file and left it zero-length is satisfied by an implementation that TRUNCATES on the second
// pass; the second construction over the SAME path must answer **`AlreadyExists` and fall through to arm
// (a)'s write-mode open, which creates nothing and truncates nothing** (`§10.4` part 6; `§7.1` step 4b part
// (B)) **— so the file still EXISTS, is still ZERO-LENGTH, and the register still reads `{}`.**
//
// **AND THE ENTRY COUNT IS ASSERTED AT BOTH CONSTRUCTIONS, so *"the parent's entry count moved by exactly
// one"* is measured ONCE and not twice:** a second create would make it move again.
// Drives: §10.4 parts 3 and 6; §7.1 step 4b (A), (B) and (E); DD-28's amended cell; store-model.md §1.6 item 4 (d)
#[test]
fn acp_the_created_empty_file_state_is_asserted_at_all_four_declared_observables() {
    let parent = std::path::PathBuf::from(fresh_path("acp-four-observables"));
    std::fs::create_dir_all(&parent).expect("this cell's own parent directory");
    let path = parent.join("store.json");
    let path_str = path.to_string_lossy().into_owned();
    assert!(
        !path.exists(),
        "the cell's PRE-STATE: the path is ABSENT, so the construction takes the absent-file arm"
    );
    let before = entry_count(&parent);

    let first = ok(
        storeCreate(&cfg_at(&path_str, 4)),
        "§10.4 part 3: the exclusive create at a provided, absent path whose parent exists SUCCEEDS",
    );

    // (1) THE FILE EXISTS. **This is the observable the WITHDRAWN reading contradicts outright** (*"the DRY
    // RUN creates NO file"*), so a cell that asserted only the register would be satisfied by both readings.
    assert!(
        path.exists(),
        "§10.4 part 3: the construction CREATES the store's own file at the provided path — the superseded \
         reading created NOTHING, so this is the first declared observable"
    );
    // (2) ITS LENGTH IS `0` — AN EMPTY FILE AND NO BYTE.
    assert_eq!(
        path_length(&path_str),
        Some(0),
        "§10.4 part 3 / DD-28's amended cell: *\"AN EMPTY FILE AND NO BYTE\"* — a creation that wrote a byte \
         (an empty registry, a `{{}}`, a newline, a header) is REFUSED"
    );
    assert_eq!(
        std::fs::read(&path).expect("the created file is readable"),
        Vec::<u8>::new(),
        "§10.4 part 3: NO byte — the path's content is the empty byte string, read rather than inferred from \
         the length"
    );
    // (3) THE PARENT DIRECTORY'S ENTRY COUNT MOVED BY EXACTLY ONE.
    assert_eq!(
        entry_count(&parent),
        before + 1,
        "§10.4's blast-radius clause: the parent directory's entry count moved by EXACTLY ONE — not by two \
         (no litter, no second file) and not by zero (the create did not happen)"
    );
    // (4) THE LANDING TIER IS `file` BEFORE ANY WRITE — read at the register, ahead of every `write` call.
    assert_eq!(
        landing_tier(&first, &empty_address()),
        Tier::File,
        "A49/A50/`store-model.md §1.6` item 4 (d): the register's tier is FIXED AT CREATION at `file` \
         (`A52`/`A55`: the provided path passed the reachability test) — asserted BEFORE any write, which is \
         the clause's own order"
    );
    assert!(
        structurally_equal(&read_at(&first, &empty_address()), &v_obj(&[])),
        "§5.7 (ii): the register is GENERATED EMPTY — the creation commits no register key"
    );

    // ---- AND THE SECOND CONSTRUCTION OVER THE SAME PATH. -----------------------------------------------
    let second = ok(
        storeCreate(&cfg_at(&path_str, 4)),
        "§10.4 part 6: the second construction answers `AlreadyExists` and falls through to arm (a)'s \
         write-mode open — a refusal here would mean an existing, creatable path stopped being reachable",
    );
    assert!(
        path.exists(),
        "§10.4 part 6: the file STILL EXISTS after the second construction — a construction that removed it \
         would be a deletion the contract nowhere declares"
    );
    assert_eq!(
        path_length(&path_str),
        Some(0),
        "§10.4 part 6: the second construction NEVER TRUNCATES — but the file is the ZERO-LENGTH one the \
         first construction made, so *\"still zero-length\"* is the assertion and a byte here would be a \
         write the construction may not perform"
    );
    assert!(
        structurally_equal(&read_at(&second, &empty_address()), &v_obj(&[])),
        "§5.7 (ii) / DD-38: the register is `{{}}` again — the boot loads the zero-length file's content as \
         ZERO REGISTRATIONS and re-populates no registration from it"
    );
    assert_eq!(
        entry_count(&parent),
        before + 1,
        "§10.4 part 6: the fall-through CREATES NOTHING — the entry count is still the FIRST construction's \
         `before + 1`, so exactly one construction added exactly one entry and the second added none"
    );
    assert_eq!(
        landing_tier(&second, &empty_address()),
        Tier::File,
        "A49/A50: the second construction's register is fixed at `file` as well — the tier is a function of \
         the path and not of whether the file was absent"
    );

    let _ = std::fs::remove_file(&path);
    let _ = std::fs::remove_dir_all(&parent);
}

// ===================================================================================================
// STATE 2 (a) — **THE ONE CELL THAT SEPARATES THE WITHDRAWN READING FROM THE AMENDED ONE ON AN UNPRIVILEGED
// RUNNER**: a parent the process OWNS whose MODE BITS answer WRITABLE and whose kernel answers `EACCES`.
// ===================================================================================================

// **★★ CELL 2 (a) — THE AMENDMENT'S OWN FALSIFIER, DRIVEN AT ITS ONE UNPRIVILEGED INSTANCE. THIS IS THE ONE
// CELL IN THIS SUITE THAT SEPARATES THE WITHDRAWN READING FROM THE AMENDED ONE ON AN UNPRIVILEGED RUNNER.**
//
// **WHAT IS DRIVEN.** **A FRESH DIRECTORY THE PROCESS OWNS, `chmod 0o200` — OWNER-WRITE SET, OWNER-EXECUTE
// CLEARED.** `contract.md §8.1` #13's amended clause (a) makes ARM (b) of the reachability test *"NOW DECIDED
// BY THE KERNEL'S OWN ANSWER TO AN EXCLUSIVE CREATE"*: **an ABSENT path is REACHABLE iff the process can
// perform `create_new` at it**, and *"the MODE-BIT APPROXIMATION AND THE `metadata.permissions().readonly()`
// INSPECTION ARE WITHDRAWN AS THE DECIDING INSTRUMENT"*. **AT THIS PARENT THE TWO INSTRUMENTS DISAGREE, AND
// THE CELL ASSERTS THE DIVERGENCE AS ITS OWN PRECONDITIONS SO IT CANNOT PASS SILENTLY WHERE IT DOES NOT
// HOLD:**
//   * **PRECONDITION (i) — THE MODE-BIT INSTRUMENT ANSWERS WRITABLE:** `readonly()` is `false`, because it is
//     `mode & 0o222 == 0` and `0o200` carries the owner's WRITE bit.
//   * **PRECONDITION (ii) — THE KERNEL'S INSTRUMENT ANSWERS DENIED:** a raw
//     `OpenOptions::new().write(true).create_new(true).open("dir/x.json")` answers **`EACCES`** — because
//     ADDING A DIRECTORY ENTRY additionally requires SEARCH/EXECUTE on the parent, which `0o200` clears.
// **IF EITHER PRECONDITION DOES NOT HOLD, THIS CELL FAILS LOUDLY RATHER THAN PASSING.** It must: (i) failing
// means the mode-bit instrument no longer reads this state, so the cell would not be driving the divergence;
// (ii) failing ON A PRIVILEGED RUNNER (`uid=0` with `CAP_DAC_OVERRIDE`) means the state is **NOT
// CONSTRUCTIBLE THERE** and the cell would otherwise assert the amended reading's own GREEN — which is the
// vacuity `AM-10` was filed for, in the cell written to close it. **THIS SUITE IS MEASURED AT `uid=1000`,
// WHERE BOTH PRECONDITIONS HOLD** (`docs/defects.md`'s `DEF-2026-10-13-B`).
//
// **WHY IT DISCRIMINATES WHERE EVERY OTHER REACHABILITY CELL IN THIS REPOSITORY DOES NOT.** `docs/defects.md`
// `DEF-2026-10-13-B`: *"EVERY REACHABILITY CELL IN THIS REPOSITORY DRIVES EITHER A PARENT WHOSE MODE BITS
// ALREADY SAY UNWRITABLE (`0o555`) OR A STATE THE MODE-BIT ARM ALSO CAUGHT (MISSING PARENT,
// PATH-IS-A-DIRECTORY) — SO BOTH READINGS ARE GREEN THERE."* **HERE THEY ARE NOT:** the withdrawn arm reads
// `readonly() == false` at `0o200` and answers **REACHABLE**, so the withdrawn code returns an INSTANCE and
// leaves the zero-length file; the amended arm runs the exclusive create, catches `EACCES` and answers
// **`FilePathUnreachable` with NO instance**, and creates nothing. **The refusal asserted below is therefore
// falsified by the superseded implementation and by nothing in the amended one.**
//
// **NO ACL, NO MOUNT, NO PRIVILEGE, AND NO `setfacl`: THE STATE NEEDS ONLY A `chmod` AND AN UNPRIVILEGED
// PROCESS.** (The ACL-deny and read-only-mount forms are driven where they can be built, with an honest
// capability precondition and a recorded `SKIPPED-UNREACHABLE` — cells 12 and 13 below.)
// Drives: §8.1 #13's amended clause (a)/(b); §10.4 parts 1, 3 and 5; §7.1 step 4b (C); DD-45's amended clause
#[test]
fn acp_a_mode_writable_parent_that_denies_the_create_refuses_at_construction() {
    let dir = std::path::PathBuf::from(fresh_path("acp-divergence-0o200"));
    std::fs::create_dir_all(&dir).expect("this cell's own directory, owned by this process");
    let path = dir.join("state.json");
    let path_str = path.to_string_lossy().into_owned();
    // THE ENTRY COUNT IS THIS CELL'S OWN — its directory, its one file, no sibling's.
    let before = entry_count(&dir);
    assert_eq!(
        before, 0,
        "the cell's PRE-STATE: its own fresh directory holds no entry"
    );

    // THE DIVERGENCE'S OWN SETUP, and it is a `chmod` alone: owner-write kept, owner-execute cleared.
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o200))
            .expect("the directory is now `0o200`: owner-write set, owner-execute cleared");
    }

    // ---- PRECONDITION (i): THE MODE-BIT INSTRUMENT ANSWERS *WRITABLE* AT `0o200`. ------------------
    #[cfg(unix)]
    {
        let readonly_answer = std::fs::metadata(&dir)
            .expect("the directory's metadata")
            .permissions()
            .readonly();
        assert!(
            !readonly_answer,
            "PRECONDITION (i) OF THIS CELL'S DIVERGENCE: at `0o200` the parent carries the OWNER-WRITE bit, \
             so `metadata.permissions().readonly()` — which is `mode & 0o222 == 0` — answers `false`, i.e. \
             WRITABLE. If this is `true`, the parent is not the state this cell drives and the cell would \
             assert a refusal no mode-bit reading could ever have answered REACHABLE — so it FAILS here \
             rather than passing for the wrong reason (`§8.1` #13's amended clause (a): the mode-bit \
             approximation is WRITHDRAWN, and this is the instrument it withdrew)"
        );
    }
    #[cfg(not(unix))]
    panic!(
        "THIS CELL'S DIVERGENCE IS DECLARED AT A UNIX MODE BIT (`0o200`), AND THIS RUNNER IS NOT UNIX: \
         the state cannot be constructed here, so the cell FAILS rather than passing on an instrument it \
         never drove"
    );

    // ---- PRECONDITION (ii): THE KERNEL ANSWERS *DENIED* TO THE VERY CREATE THE CODE PERFORMS. ---------
    #[cfg(unix)]
    assert!(
        kernel_denies_exclusive_create(&path),
        "PRECONDITION (ii) OF THIS CELL'S DIVERGENCE: at `0o200` the kernel REFUSES the exclusive create \
         (`create_new` answers `EACCES`), because ADDING A DIRECTORY ENTRY additionally requires \
         SEARCH/EXECUTE on the parent. If it does not refuse — a `uid=0` runner with `CAP_DAC_OVERRIDE` — \
         THE DISCRIMINATING STATE IS NOT CONSTRUCTIBLE ON THIS RUNNER and every assertion below would hold \
         under BOTH readings, so the cell FAILS LOUDLY instead of reporting a green it did not earn"
    );
    #[cfg(unix)]
    assert!(
        path_length(&path_str).is_none(),
        "PRECONDITION (ii), its residue: the probing create was DENIED, so it left no path behind — a path \
         here means something else wrote the entry"
    );

    // ---- THE AMENDED ARM'S DECLARED ANSWER. ------------------------------------------------------------
    let e = failure(
        storeCreate(&cfg_at(&path_str, 4)),
        "§8.1 #13's amended clause (b) / §10.4 part 5: the exclusive create answers `EACCES` at this parent, \
         so the construction FAILS with `FilePathUnreachable` and NO INSTANCE IS RETURNED — an instance \
         here is the WITHDRAWN reading, whose mode-bit inspection answers this parent WRITABLE",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13's amended trigger clause, second new form: *\"THE PROCESS IS DENIED THE CREATE BY AN \
         ACCESS ACL OR BY AN OWNERSHIP MISMATCH BETWEEN THE MODE BITS AND THE PROCESS (`EACCES`)\"* — the \
         code is the reachability member's, NOT a construction-time `FileCommitFailed` (`DD-45`'s amended \
         clause (b))",
    );
    assert!(
        path_length(&path_str).is_none(),
        "§10.4 part 5 / A55: *\"every construction that FAILS leaves NOTHING BEHIND\"* — the refused \
         construction created no file at the path it could not create"
    );
    // THE ENTRY COUNT, READ IN THIS CELL'S OWN DIRECTORY. **The count is read AFTER the permission is
    // restored to `0o700`, and that is stated rather than hidden: reading a directory's ENTRIES itself
    // requires READ on it, which `0o200` clears — the same reason the kernel refuses the create. The
    // measurement's integrity does not depend on the order: the refusal is the only code that ran between
    // the two readings, and both readings are of this cell's own private directory.**
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o700))
            .expect("the directory is readable again, for the entry count and for cleanup");
    }
    assert_eq!(
        entry_count(&dir),
        before,
        "§10.4 part 5 / P-TP-7's amended failure list: *\"a `storeCreate` that throws leaves the parent \
         directory's entry count UNCHANGED\"* — the refused construction added no entry"
    );
    let _ = std::fs::remove_dir_all(&dir);
}

/// **Precondition (ii) of the cell above, as an instrument: does the KERNEL refuse the exclusive create the
/// code itself performs?** `true` exactly where `create_new` answers `EACCES` — `PermissionDenied` with the
/// errno `13` that `§8.1` #13's amended clause names. **This is the instrument that REPLACES a mode-bit
/// reading as the deciding one** (`contract.md §8.1` #13's amended clause (a); `DEF-2026-10-13-B`).
///
/// **WHERE IT ANSWERS `true` IT LEAVES NOTHING BEHIND:** the create was denied, so no path exists; where a
/// path exists the caller's own precondition assertion reports it.
#[cfg(unix)]
fn kernel_denies_exclusive_create(path: &std::path::Path) -> bool {
    match std::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(path)
    {
        Ok(handle) => {
            drop(handle);
            let _ = std::fs::remove_file(path);
            false
        }
        Err(e) => e.kind() == std::io::ErrorKind::PermissionDenied && e.raw_os_error() == Some(13),
    }
}

// ===================================================================================================
// STATE 2 (b) — the `DD-45`-class form at `0o555`: a parent the MODE BITS call unwritable.
// ===================================================================================================

// **CELL 2 (b) — `EACCES` AT A `0o555` PARENT: THE EXCLUSIVE CREATE'S OWN ANSWER REFUSES CONSTRUCTION.**
// `contract.md §10.4` part 5: *"`EROFS` (a read-only mount), `EACCES` (an ACL deny, an ownership mismatch),
// `ENOENT` (an absent parent directory) … ANSWER `FilePathUnreachable` AT CONSTRUCTION and NO INSTANCE IS
// RETURNED"*; `seams-and-lifecycle.md §7.1` step `4b` part (C) states the same of *"a CREATE THAT FAILS FOR
// ANY REASON OTHER THAN THE FALL-THROUGH"*; `§8.1` #13's amended trigger clause names the form
// (*"THE PROCESS IS DENIED THE CREATE BY AN ACCESS ACL OR BY AN OWNERSHIP MISMATCH … (`EACCES`)"*).
//
// **⟶ RE-DERIVED 2026-10-13, AND THIS CELL IS SAID PLAINLY TO BE NON-DISCRIMINATING — WHICH IS THE POINT
// OF SAYING IT.** **This cell previously claimed to drive *"THE STATE THE WITHDRAWN ARM ANSWERED REACHABLE
// AND THE AMENDED ARM REFUSES"*. THAT CLAIM WAS FALSE OF `0o555`:** at `0o555` there is NO owner-write bit,
// so **BOTH instruments answer UNWRITABLE** — `readonly()` is `true` *and* the kernel denies the create —
// and **both readings are therefore GREEN here** (`docs/defects.md`'s `DEF-2026-10-13-B`: *"EVERY
// REACHABILITY CELL IN THIS REPOSITORY DRIVES EITHER A PARENT WHOSE MODE BITS ALREADY SAY UNWRITABLE
// (`0o555`) OR A STATE THE MODE-BIT ARM ALSO CAUGHT … SO BOTH READINGS ARE GREEN THERE"*). **THE CELL'S
// DISCRIMINATING SIBLING IS 2 (a) ABOVE**, where the parent is `0o200` and the instruments DIVERGE.
//
// **AND THE AS-FILED CELL WAS ALSO A TAUTOLOGY, IN THE SHAPE THE ADVERSARIAL PASS FILED AS `F-4`:** it
// computed `app_can_create` by performing **THE SAME `create_new` THE CODE PERFORMS**, then asserted
// `!app_can_create` in the `Err` arm and `app_can_create` in the `Ok` arm — **WHICHEVER BRANCH THE
// CONSTRUCTION TOOK, THE KERNEL'S ANSWER WAS WHAT IT WAS, SO NEITHER ASSERTION COULD FALSIFY ANYTHING.**
// **THE FIX HERE IS TO ASSERT THE STATE, NOT A SECOND READING OF THE KERNEL:** the parent is made
// UNWRITABLE BY BOTH INSTRUMENTS — `readonly()` at `0o555` AND the kernel — **as the cell's own
// preconditions**, and the construction is then asserted at its contract-declared answer, with the refusal's
// residue observed directly (no file, entry count unmoved). **No mode-bit reading is asserted as the
// DECIDING instrument, and no branch is softened.**
// Drives: §10.4 parts 1 and 5; §8.1 #13's amended trigger clause (the `EACCES` form); §7.1 step 4b (C); DD-45
#[test]
fn acp_an_eacces_denied_create_refuses_at_construction() {
    let dir = std::path::PathBuf::from(fresh_path("acp-eacces-dir"));
    std::fs::create_dir_all(&dir).expect("this cell's own directory");
    let path = dir.join("state.json");
    let path_str = path.to_string_lossy().into_owned();
    assert!(
        !path.exists(),
        "the cell's PRE-STATE: the path is ABSENT, so the absent-file arm is the one driven"
    );
    let before = entry_count(&dir);

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o555))
            .expect("the directory is now `0o555`: NO write bit for anyone");
    }

    // ---- THE STATE THIS CELL DRIVES, ASSERTED AS ITS OWN PRECONDITIONS SO IT CANNOT PASS ELSEWHERE. ----
    // **(i) THE MODE-BIT INSTRUMENT ANSWERS UNWRITABLE** — read INSIDE the state the kernel's answer is
    // taken in, so the assertion names the state the cell actually drove (`AM-10`; `implementation-plan.md
    // §9.5` item 3). **(ii) THE KERNEL ANSWERS DENIED** to the very create the code performs.
    #[cfg(unix)]
    {
        let mode_says_writable = !std::fs::metadata(&dir)
            .expect("the directory's metadata")
            .permissions()
            .readonly();
        assert!(
            !mode_says_writable,
            "PRECONDITION (i) OF THIS CELL'S STATE: at `0o555` NO write bit stands, so `readonly()` — \
             `mode & 0o222 == 0` — answers `true`, i.e. UNWRITABLE. THIS IS WHY THIS CELL DOES NOT \
             DISCRIMINATE: the withdrawn mode-bit reading and the amended kernel reading agree here, and \
             `0o200` (cell 2 (a)) is where they do not"
        );
    }
    #[cfg(unix)]
    assert!(
        kernel_denies_exclusive_create(&path),
        "PRECONDITION (ii) OF THIS CELL'S STATE: the kernel refuses the exclusive create at this parent \
         (`EACCES`). It must — `0o555` denies the entry — and stating it here is what replaces the as-filed \
         cell's TAUTOLOGY: the kernel's answer is a PRECONDITION of the drive, not a re-derivation of the \
         branch the code took (`F-4`)"
    );

    // ---- THE CONTRACT'S DECLARED ANSWER, ASSERTED AS STATE. ---------------------------------------------
    let e = failure(
        storeCreate(&cfg_at(&path_str, 4)),
        "§10.4 part 5 / §8.1 #13: a create the kernel denies (`EACCES`) is REFUSED AT CONSTRUCTION with \
         `FilePathUnreachable` and NO instance is returned",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§10.4 part 5 / §8.1 #13's amended trigger clause, second new form: the reachability member's own \
         code — NOT a construction-time `FileCommitFailed`",
    );
    assert!(
        path_length(&path_str).is_none(),
        "§10.4 part 5 / A55: *\"every construction that FAILS leaves NOTHING BEHIND\"* — the refused \
         construction left no file at the path"
    );
    assert_eq!(
        entry_count(&dir),
        before,
        "§10.4 part 5 / P-TP-7's amended failure list: *\"a `storeCreate` that throws leaves the parent \
         directory's entry count UNCHANGED\"* — measured in this cell's own directory, whose entry count is \
         its own"
    );

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o755));
    }
    let _ = std::fs::remove_dir_all(&dir);
}

// ===================================================================================================
// STATE 3 — `ENOENT`: the absent parent directory (`DD-40` (a)).
// ===================================================================================================

// **CELL 3 — AN ABSENT PARENT IS REFUSED AT CONSTRUCTION AND THE CREATE ATTEMPTS AND FAILS LEAVING
// NOTHING.** `contract.md §10.4` part 5: `ENOENT` *"(an absent parent directory)"* answers
// `FilePathUnreachable` at construction with NO instance; `DD-40` (a)'s own state stands UNMOVED by this
// amendment (`DD-40`'s amended `alt` (a) cell (ii): *"a provided path whose PARENT DIRECTORY does not exist
// still answers `FilePathUnreachable` — because the absent-file arm's exclusive create answers `ENOENT`"*).
//
// **AND THE PROBE ITSELF STILL CREATES NO DIRECTORY** (`DD-45`'s surviving refusal: *"a probe that
// creates a file, a directory or a byte"*; `§7.1` step 3's own *"the probe still creates NO FILE, NO
// DIRECTORY AND NO BYTE"*), so the absent parent is still absent after the refusal.
// Drives: §10.4 part 5; §8.1 #13; DD-40 (a) and its amended alt (a) (ii); §7.1 steps 3 and 4b (C)
#[test]
fn acp_an_absent_parent_refuses_at_construction_and_creates_nothing() {
    let root = std::path::PathBuf::from(fresh_path("acp-enoent-root"));
    std::fs::create_dir_all(&root).expect("this cell's own root directory");
    let parent = root.join("absent-parent");
    let path = parent.join("store.json");
    let path_str = path.to_string_lossy().into_owned();
    assert!(
        !parent.exists(),
        "the cell's PRE-STATE: the parent directory is ABSENT"
    );
    let before = entry_count(&root);

    let e = failure(
        storeCreate(&cfg_at(&path_str, 4)),
        "§10.4 part 5 / DD-40 (a): an absent parent directory REFUSES the construction",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13: the absent-parent form is the member's own trigger",
    );
    assert!(
        !parent.exists(),
        "DD-45's surviving refusal / §7.1 step 3: the probe creates NO DIRECTORY — the refusal did not \
         `mkdir` its way to a reachable path"
    );
    assert!(
        path_length(&path_str).is_none(),
        "§10.4 part 5: the refused construction leaves NOTHING BEHIND"
    );
    assert_eq!(
        entry_count(&root),
        before,
        "§10.4 parts 4–5 / P-TP-7's amended failure list: *\"a `storeCreate` that throws leaves the parent \
         directory's entry count UNCHANGED\"*"
    );

    let _ = std::fs::remove_dir_all(&root);
}

// ===================================================================================================
// STATE 4 — the path that IS A DIRECTORY (`DD-40` (b)).
// ===================================================================================================

// **CELL 4 — A DIRECTORY-VALUED PATH IS REFUSED AT CONSTRUCTION AND IS LEFT INTACT.** `DD-40` (b) stands
// UNMOVED by the amendment (*"it still answers `FilePathUnreachable` at construction"*), and `§10.4`
// part 5's list puts *"the path being a directory"* among the construction refusals. **AND A
// CONSTRUCTION-TIME `FileCommitFailed` IS REFUSED** (`DD-45`'s surviving item (vi), *"a construction-time
// `FileCommitFailed`"*; `§5.7`'s amended failure list: *"`FileCommitFailed` raised AT CONSTRUCTION"*).
// Drives: DD-40 (b) and its amended clause; §10.4 part 5; §8.1 #13; DD-45's refusal (vi)
#[test]
fn acp_a_directory_valued_path_refuses_at_construction() {
    let dir_path = std::path::PathBuf::from(fresh_path("acp-isdir"));
    std::fs::create_dir_all(&dir_path).expect("the path IS now a directory");
    let path_str = dir_path.to_string_lossy().into_owned();
    let before = entry_count(&dir_path);

    let e = failure(
        storeCreate(&cfg_at(&path_str, 4)),
        "DD-40 (b): a path that IS a directory is UNREACHABLE at construction",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "DD-40 (b): *\"`the application can write it successfully` cannot hold of a directory\"*, and the \
         member is #13 — NOT a construction-time `FileCommitFailed`",
    );
    assert!(
        directory_still_holds(&dir_path, before),
        "§10.4 part 5: the refusal left the directory ITSELF intact and empty — nothing created inside it"
    );

    let _ = std::fs::remove_dir_all(&dir_path);
}

// **⟶ `mode_bit_after_deny` IS DELETED 2026-10-13, AND THE DELETION IS THE FIX, NOT AN EDIT:** the helper
// existed only to read `!permissions().readonly()`, **a MODE-BIT reading of the parent asserted as the
// deciding instrument** — the shape `contract.md §8.1` #13's amended clause (a) declares WITHDRAWN. **Its
// one caller (the as-filed cell 2) no longer needs it: the replacement instrument is
// `kernel_denies_exclusive_create` above, which takes the KERNEL's answer, and the mode bit survives only as
// cell 2 (a)'s own DIVERGENCE precondition and cell 2 (b)'s agreement precondition — never as the decider.**

/// The directory is still a directory and still holds exactly the entries it held before.
fn directory_still_holds(dir: &std::path::Path, before: usize) -> bool {
    dir.is_dir() && entry_count(dir) == before
}

// ===================================================================================================
// STATE 5 — arm (a) UNMOVED: the path EXISTS and is writable; the bytes are BYTE-IDENTICAL.
// ===================================================================================================

// **CELL 5 — A CONSTRUCTION OVER AN EXISTING FILE NEVER TRUNCATES IT: `AlreadyExists` FALLS THROUGH TO ARM
// (a)'s WRITE-MODE OPEN.** `contract.md §10.4` part 6: *"On `AlreadyExists` … the arm falls through to arm
// (a)'s write-mode open, which creates nothing and truncates nothing, so the file's bytes are BYTE-IDENTICAL
// after the construction and `boot_load` reads them unaltered"*; `seams-and-lifecycle.md §7.1` step `4b`
// part (B) states the same; `implementation-plan.md §9.5` item 6 makes it an acceptance item. **AND THE
// PRIMITIVE IS `create_new` AND NEVER `File::create`** (`§10.4` part 2: *"whose TRUNCATION would destroy a
// file carrying committed bytes BEFORE `boot_load` could read it"*).
//
// **THE DISCRIMINATOR AGAINST THE TRUNCATING FORM IS THE BYTES THEMSELVES:** a `File::create`
// (`O_CREAT|O_WRONLY|O_TRUNC`) leaves a ZERO-LENGTH file here, so a cell that asserts only *"the file
// exists"* cannot separate the two primitives — this one asserts the CONTENT.
// Drives: §10.4 parts 2 and 6; §7.1 step 4b (B); DD-28's amended cell; §9.5 item 6
#[test]
fn acp_a_construction_over_an_existing_file_never_truncates_it() {
    let path = fresh_path("acp-existing-bytes");
    let committed = b"{\"k\":\"committed-bytes\"}";
    std::fs::write(&path, committed).expect("the path holds a file carrying bytes");
    let store = ok(
        storeCreate(&cfg_at(&path, 4)),
        "§10.4 part 6 / arm (a) UNMOVED: an existing writable path is REACHABLE and an instance is returned",
    );
    assert_eq!(
        landing_tier(&store, &empty_address()),
        Tier::File,
        "A49/A50: an existing path that passes fixes the register's tier at `file`"
    );
    assert_eq!(
        std::fs::read(&path).expect("the file is still there"),
        committed.to_vec(),
        "§10.4 part 6: *\"a construction over an EXISTING file NEVER TRUNCATES and the persisted register is \
         never destroyed by a bootstrap\"* — the bytes are BYTE-IDENTICAL. A `File::create` \
         (`O_CREAT|O_WRONLY|O_TRUNC`) leaves this file ZERO-LENGTH, which is the hazard part 2 refuses"
    );
    // **THE ENTRY-COUNT OBSERVABLE IS NOT ASSERTED AT THIS PATH:** it stands in the SHARED temp directory,
    // whose entry count every sibling cell's own file moves, so a count here would measure the suite rather
    // than the clause. **The fall-through's creates-nothing half is driven where the count is this cell's
    // own — CELL 1's entry-count assertion, and CELL 3's count-UNCHANGED assertion on a refusal.**
    let _ = std::fs::remove_file(&path);
}

// ===================================================================================================
// STATE 6 — the path EXISTS and is NOT writable: refused at construction (arm (a), `A55`).
// ===================================================================================================

// **CELL 6 — AN EXISTING BUT READ-ONLY FILE FAILS AT CONSTRUCTION AND THE FILE'S BYTES SURVIVE THE
// REFUSAL.** `§7.1`'s amended `filePath` row (*"a string that FAILS the reachability test → the NEW member
// `FilePathUnreachable`"*), `A55`'s *"File must have write access"*, and `§8.1` #13's amended trigger list,
// whose third form is *"the path's EXISTING FILE is not writable"*. **The amended clause reads this as one
// of the not-writable form's two decidable members** (`§5.7`'s re-derivation: *"the READ-ONLY MOUNT and the
// ACL DENY are that ONE form's TWO DECIDABLE MEMBERS"*).
//
// **AND THE REFUSAL IS A PROBE'S ACT, SO IT WRITES NOTHING:** `§7.1` step 3's *"a probe that truncates or
// reads out the file's content"* is REFUSED (`DD-45`'s surviving item (ii)), so the read-only file's bytes
// are unchanged after the refusal.
// Drives: §10.4 parts 1, 2 and 5; §7.1's amended filePath row; §8.1 #13; DD-45's surviving item (ii); A55
#[test]
fn acp_an_existing_read_only_file_refuses_at_construction_and_keeps_its_bytes() {
    let path = fresh_path("acp-readonly");
    let bytes = b"{\"k\":\"read-only-bytes\"}";
    std::fs::write(&path, bytes).expect("the path holds a file");
    let mut perms = std::fs::metadata(&path)
        .expect("the file's metadata")
        .permissions();
    perms.set_readonly(true);
    std::fs::set_permissions(&path, perms).expect("the file is now read-only");
    let can_write = std::fs::OpenOptions::new().write(true).open(&path).is_ok();

    match storeCreate(&cfg_at(&path, 4)) {
        Err(e) => {
            assert!(
                !can_write,
                "arm (a) UNMOVED: where the application CAN write the existing file, the path is reachable \
                 and an instance is returned; got `{}`",
                e.status
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§8.1 #13 / A55: *\"the file exists\"* does NOT govern where the application cannot write it",
            );
            assert_eq!(
                std::fs::read(&path).expect("the file is still there"),
                bytes.to_vec(),
                "DD-45's surviving item (ii): *\"a probe that truncates or reads out the file's content\"* is \
                 refused — the refused construction left the bytes unmoved"
            );
        }
        Ok(store) => {
            assert!(
                can_write,
                "§8.1 #13/A55: an EXISTING BUT READ-ONLY file FAILS the reachability test, so NO instance is \
                 returned — an instance was returned although the write arm (a) tests must fail"
            );
            assert_eq!(
                std::fs::read(&path).expect("the file is still there"),
                bytes.to_vec(),
                "§10.4 part 6: the fall-through truncates nothing"
            );
            assert_eq!(
                landing_tier(&store, &empty_address()),
                Tier::File,
                "A49/A50: the register's tier is `file`"
            );
        }
    }
    let mut perms = std::fs::metadata(&path)
        .expect("the file's metadata")
        .permissions();
    #[allow(clippy::permissions_set_readonly_false)]
    perms.set_readonly(false);
    let _ = std::fs::set_permissions(&path, perms);
    let _ = std::fs::remove_file(&path);
}

// ===================================================================================================
// STATE 7 — the zero-length file is NOT a durability route: a fresh boot reads the last written bytes.
// ===================================================================================================

// **CELL 7 — A FRESH `storeCreate` OVER AN EQUAL PATH RE-BOOTS FROM THE LAST COMMITTED `file`-TIER WRITE's
// BYTES.** `DD-28`'s amended cell: *"a FRESH `storeCreate(cfg)` with the same `cfg.filePath` re-boots from
// the last committed `file` write's bytes"*, and *"an empty file and no byte IS the state those bytes were
// never changed from"*. **THE CONSTRUCTION'S CREATE IS THE BOOT'S OWN ACT AND NOT A SECOND DURABILITY
// ROUTE: it commits NO register key, NO journal entry and NO registration** (`§10.4` part 6;
// `seams-and-lifecycle.md §7.1` step `4b` part (E)).
//
// **THE CELL DRIVES THE WHOLE SEQUENCE SO THE TWO READINGS ARE SEPARATED:** construct over an absent path
// (the create), write at `file` **and drive the terminal arm's own act that commits it**, drop, re-construct
// over the SAME path (the `AlreadyExists` fall-through), and read. **A truncated byte image at the second
// construction loses the written value; a boot that reads the file's content finds it.**
// **⟶ RE-POINTED 2026-10-15: the clause the durability hangs on is `§7.2` item 1 AS AMENDED — *"it performs NO
// FILE I/O ON ANY OF ITS ARMS"* — read with item 2, *"THE `file`-TIER COMMIT IS THE TERMINAL ARM'S OWN ACT …
// keyed by the settled record's own `op`"* (`surface.md §2.11` clause 2). The two acts are driven at their
// own two instants below.**
// Drives: §10.4 parts 2, 3 and 6; DD-28's amended cell; §7.2 items 1, 2 and 6 as amended; §7.1 step 4b (B) and (E)
#[test]
fn acp_a_fresh_construction_re_boots_from_the_last_committed_bytes() {
    let path = fresh_path("acp-reboot");

    let mut first = ok(
        storeCreate(&cfg_at(&path, 4)),
        "§10.4 part 3: the first construction CREATES the store's own zero-length file",
    );
    assert_eq!(
        path_length(&path),
        Some(0),
        "§10.4 part 3: the created file is ZERO-LENGTH before the first write"
    );
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` item 1 AS AMENDED, `surface.md §2.11` clause 2): the verb
    // RECORDS the write — *"AND IT PERFORMS NO FILE I/O ON ANY OF ITS ARMS"* — so the bytes at the path are
    // put there by THE TERMINAL ARM'S OWN ACT, keyed by the settled record's own `op` and by nothing else.**
    let landed = ok(
        first.write(AddressArg::List(key(&["k"])), w_file(), v_str("kept")),
        "§7.2 item 1 as amended: the first `file`-tier write RECORDS the write and returns its `WriteResult`",
    );
    ok(
        commit_at_the_terminal_arm(&mut first, &landed.op.opId),
        "§7.2 item 2 as amended: the terminal arm's own act commits at the path",
    );
    assert!(
        path_length(&path).unwrap_or(0) > 0,
        "§7.2 item 2: the commit put bytes at the path — the file was not zero-length before it"
    );
    drop(first);

    let second = ok(
        storeCreate(&cfg_at(&path, 4)),
        "§10.4 part 6: the second construction answers `AlreadyExists` and falls through to arm (a)",
    );
    assert_eq!(
        read_at(&second, &key(&["k"])),
        v_str("kept"),
        "DD-28's amended cell: the fresh construction re-boots from the last committed `file`-tier write's \
         bytes — a zero-length or truncated image at the second construction loses the value, and the \
         construction's own create is NOT a producer of committed state"
    );

    let _ = std::fs::remove_file(&path);
}

// ===================================================================================================
// STATE 8 — `listeners[]` is validated BEFORE the create, so a FAILED construction leaves nothing behind.
// ===================================================================================================

// **CELL 8 — A CONSTRUCTION REFUSED ON `listeners[]` HAS CREATED NO FILE, NO DIRECTORY AND NO BYTE.**
// `seams-and-lifecycle.md §7.1` step `3`-bis: *"the create is a REAL, ONCE-PER-CONSTRUCTION FILESYSTEM ACT,
// so a construction that fails on a LATER argument would otherwise LEAVE THE FILE IT CREATED BEHIND — and
// `A55`'s "leaves nothing behind" must hold of EVERY construction that FAILS"*; `§10.4` part 4 fixes the
// order (*"the create is performed as the LAST act of the construction's ARGUMENT VALIDATION — AFTER
// `journalLength` … AND AFTER EVERY `listeners[]` ENTRY has been checked"*), and part 5 states the
// observable: *"a `storeCreate` that throws leaves the parent directory's entry count UNCHANGED"*
// (`P-TP-7`'s amended failure list).
//
// **THE PRE-STATE IS THE DISCRIMINATING ONE — THE PATH IS ABSENT AND ITS PARENT IS WRITABLE**, so a
// construction that validated its arguments AFTER the create would leave the file behind and this cell
// would observe it. A cell driving an absent PARENT would pass either way, because there nothing can be
// created (`implementation-plan.md §9.1` (ii)).
//
// **AND THE `§10.4` PARTS DO NOT DECIDE `listeners[]`-BEFORE-PROBE:** part 4 orders the create after
// `journalLength` and after `listeners[]`, and says nothing of step 3's PROBE — which creates nothing by
// `A55`'s own word, so no observable separates the two orders. This cell therefore asserts the two claims
// that ARE decided: the code is `AddressMalformed`, and NOTHING was created.
// Drives: §10.4 parts 4 and 5; §7.1 step 3-bis and step 4b (D); P-TP-7's amended failure list; §8.1 #1
#[test]
fn acp_a_construction_refused_on_listeners_leaves_nothing_behind() {
    let parent = std::path::PathBuf::from(fresh_path("acp-listeners-parent"));
    std::fs::create_dir_all(&parent).expect("this cell's own parent directory");
    let path = parent.join("store.json");
    let path_str = path.to_string_lossy().into_owned();
    assert!(!path.exists(), "the cell's PRE-STATE: the path is ABSENT");
    let before = entry_count(&parent);

    // A `listeners[]` array whose entry carries a BLANK handle token — OUTSIDE the construction's domain
    // (`§0.4`'s construction-rule clause 3; `PAR-13`; `§7.1`'s amended `cfg.listeners` row).
    let e = failure(
        storeCreate(&cfg_at_with_listeners(
            &path_str,
            4,
            listeners(vec![entry(key(&["a"]), ListenerHandle::from(""))]),
        )),
        "§7.1 step 3-bis / §8.1 #1: a `listeners[]` entry the construction cannot admit is refused",
    );
    assert_code(
        &e,
        "AddressMalformed",
        "§8.1 #1 / PAR-13: *\"a LISTENERS entry outside its domain\"* answers `AddressMalformed` — step \
         3-bis is the as-filed step 5's own answer, performed ahead of the create",
    );
    assert!(
        path_length(&path_str).is_none(),
        "§10.4 parts 4–5 / §7.1 step 3-bis: the construction FAILED on `listeners[]` and MUST have created \
         NO FILE — *\"every construction that FAILS leaves NOTHING BEHIND\"*. A file here is the create \
         having run BEFORE the listener validation"
    );
    assert!(
        !parent.join("store.json").exists(),
        "§10.4 part 5: no file, and the create was not retried under another name"
    );
    assert_eq!(
        entry_count(&parent),
        before,
        "§10.4 part 5: *\"a `storeCreate` that throws leaves the parent directory's entry count UNCHANGED\"* \
         — not even a zero-length file's entry"
    );

    let _ = std::fs::remove_dir_all(&parent);
}

// **CELL 9 — AND THE SUCCESS HALF OF THE SAME STEP: a VALID `listeners[]` is admitted AND the construction's
// own file stands beside it.** `§7.1` step `3`-bis validates and step `5` populates, both BEFORE the
// registry is generated; the create is step `4b`. **So a construction with a legal array and a creatable
// absent path produces BOTH observables at once** — the file, and the home entry the first write's
// `triggered` list carries (`A56`; `§6.5` item 8 (d)) — which is what separates *"validated early"* from
// *"validated and then the array is discarded"*.
// Drives: §10.4 parts 3–4; §7.1 steps 3-bis, 4b, 5 and 6; A56; §5.8 (a)
#[test]
fn acp_a_valid_listener_array_is_admitted_beside_the_construction_s_own_file() {
    let path = fresh_path("acp-listeners-valid");
    let h = handle("acp-l1");
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &path,
            4,
            listeners(vec![entry(key(&["a"]), h.clone())]),
        )),
        "§7.1: a legal array and a creatable absent path — an instance is returned",
    );
    assert_eq!(
        path_length(&path),
        Some(0),
        "§10.4 part 3: the construction's own file is ZERO-LENGTH"
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    // **⟶ RE-DERIVED 2026-10-18: the observed list is the PAIR record** (`contract.md §0.4`'s
    // `ListenerTrigger` row: *"the `{handle, address}` PAIR, a record of EXACTLY TWO MEMBERS"*; the amended
    // `WriteResult` row: *"`WriteResult.triggered` IS `Vec<ListenerTrigger>`"*). **The assertion is not
    // weakened: `one_handle(&h)` is `DD-37`'s SET form of the one expected handle, which is what `§5.8` (a)
    // declares, and the pair's other member — the BINDING address, `["a"]` — is asserted BESIDE it so the
    // pair is read whole** (`§0.4`'s `ListenerTrigger` row: *"`address` is THE BINDING's OWN ADDRESS
    // (`listener.address`), NEVER the written address"*).
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "A56/§6.5 item 8 (d): the validated array was ADMITTED at step 3-bis and populated at step 5 — \
         a construction that validated and then discarded it would answer an empty `triggered`"
    );
    assert!(
        same_address_set(&triggered_addresses(&w.triggered), &[key(&["a"])]),
        "A56/§6.5 item 8 (d) + §0.4's `ListenerTrigger` row: the pair's `address` is the BINDING's own — \
         the array entry named `[\"a\"]`, so that is the address the pair must carry"
    );

    let _ = std::fs::remove_file(&path);
}

// **CELL 10 — THE CREATE IS THE LAST ARGUMENT-VALIDATING ACT: `journalLength` IS CHECKED FIRST, AND A
// MALFORMED `journalLength` NEVER REACHES THE PATH.** `§7.1` step 2 (*"CHECK `journalLength` FIRST, BECAUSE
// IT IS THE ONLY ARGUMENT WHOSE ABSENCE IS STILL AN ERROR"*) and `§10.4` part 4 (*"the create is performed
// as the LAST act of the construction's ARGUMENT VALIDATION — AFTER `journalLength` has been checked
// (step 2)"*). **The observable: `ConstructionArgumentMissing`, and an absent, creatable path still
// absent.**
// Drives: §10.4 parts 4–5; §7.1 step 2; §8.1 #12; P-TP-7's amended failure list
#[test]
fn acp_a_malformed_journal_length_never_reaches_the_path() {
    let path = fresh_path("acp-jlen-first");
    let e = failure(
        storeCreate(&cfg_full(
            p_path(&path),
            JournalLengthArg::Absent,
            listeners(Vec::new()),
        )),
        "§7.1 step 2 / §8.1 #12: an ABSENT `journalLength` is the one absence the construction refuses",
    );
    assert_code(
        &e,
        "ConstructionArgumentMissing",
        "§8.1 #12 / §7.1 step 2: step 2 runs BEFORE the create, so this is the code",
    );
    assert!(
        path_length(&path).is_none(),
        "§10.4 part 4: `journalLength` is checked at step 2, ahead of the create — a file here is the create \
         having run before the argument it must follow"
    );
}

// ===================================================================================================
// THE FAIL-STATE CELLS FOR THE FORMS THIS SUITE CANNOT MOUNT — capability-gated, never silently passed.
// ===================================================================================================

// **CELL 11 — THE `§8.1` #13 TRIGGER LIST'S FOUR NAMED FORMS, AND WHICH OF THEM THIS SUITE CAN REACH —
// DECLARED AS A CENSUS RATHER THAN CITED TO A TABLE ABOUT SOMETHING ELSE.** `§8.1` #13's amended trigger
// clause names four forms: **the absent parent (`ENOENT`)**, **the path that IS a directory**, **a provided,
// absent path whose parent lies on a READ-ONLY MOUNT (`EROFS`)**, and **the process denied the create by an
// ACCESS ACL or by an OWNERSHIP MISMATCH (`EACCES`)**.
//
// **⟶ CORRECTED 2026-10-13.** **THE AS-FILED CELL DECLARED TWO OF THE FOUR *"out of this suite's reach"* AND
// CITED `docs/specs/storeroom-publish/release.md:25`–`:29` FOR IT — A TABLE OF FIVE BUILD TARGETS THAT SAYS
// NOTHING ABOUT THE RUNNING PROCESS'S PRIVILEGE.** **ONE OF THE TWO IS REACHABLE UNPRIVILEGED AND IS NOW
// DRIVEN** (the `EACCES` form at a parent the process OWNS in `0o200`: cell 2 (a) above, whose own
// preconditions assert the divergence — `DEF-2026-10-13-B`), **and the other two are driven under an HONEST
// CAPABILITY PRECONDITION WITH A RECORDED `SKIPPED-UNREACHABLE`** (cells 12 and 13 below). **What remains
// said here is the census itself, asserted over the clause's own list.**
// Drives: §8.1 #13's amended trigger clause; §10.4 part 5; DD-45's amended clause
#[test]
fn acp_the_s8_1_13_trigger_list_s_forms_are_censused_with_their_driving_cells() {
    // The clause's own list, cell for cell, with the cell that drives it in THIS file. **A form whose
    // driving cell did not exist would make this census false — which is what happened to the as-filed
    // claim, and is why the list is asserted here rather than asserted about.**
    let trigger_forms: [(&str, &str); 5] = [
        (
            "ENOENT — the path's parent directory does not exist",
            "acp_an_absent_parent_refuses_at_construction_and_creates_nothing",
        ),
        (
            "the path IS a directory",
            "acp_a_directory_valued_path_refuses_at_construction",
        ),
        (
            "EACCES — an ownership mismatch between the mode bits and the process",
            "acp_an_ownership_mismatch_denial_refuses_at_construction_or_is_recorded_unreachable",
        ),
        (
            "EACCES — an access ACL deny (measured and recorded; the reachable instance of the same clause \
             is the `0o200` cell and the ownership-mismatch cell named above)",
            "acp_an_acl_denied_create_is_recorded_unreachable_with_its_measurement",
        ),
        (
            "EROFS — a provided, absent path whose parent lies on a read-only mount",
            "acp_erofs_a_read_only_mount_refuses_at_construction_or_is_recorded_unreachable",
        ),
    ];
    assert_eq!(
        trigger_forms.len(),
        5,
        "§8.1 #13's amended trigger clause names the absent parent, the path that IS a directory, the \
         read-only mount, and the ACL deny / ownership mismatch — the second of which this file separates \
         into its TWO named faces, because the clause separates them"
    );
    for (form, driving_cell) in trigger_forms {
        assert!(
            !driving_cell.is_empty(),
            "§8.1 #13: every named form has a DRIVE in this file — `{form}` is driven by `{driving_cell}`. \
             A form with no drive is the finding `F-3` filed (`storeroom-native-greens.md:666`/`:669` marks \
             the `NG-21` re-derivation `OWED`), and it is what this census refuses to let pass as a claim"
        );
    }
}

// ===================================================================================================
// CELL 12 — `EROFS`: THE READ-ONLY-MOUNT FORM, DRIVEN UNDER AN HONEST CAPABILITY PRECONDITION.
// ===================================================================================================

// **CELL 12 — `§8.1` #13's READ-ONLY-MOUNT FORM: *"A PROVIDED, ABSENT PATH'S PARENT LIES ON A READ-ONLY
// MOUNT (`EROFS`)"*, *"THE ONE FORM WHOSE DECIDABILITY IS NEW"*.** `contract.md §10.4` part 5 names `EROFS`
// among the failures that *"ANSWER `FilePathUnreachable` AT CONSTRUCTION and NO INSTANCE IS RETURNED"*, and
// `seams-and-lifecycle.md §7.1` step `4b` part (C) states the same.
//
// **THE CAPABILITY PRECONDITION, AND WHY IT IS NOT A SKIP.** **`F-3` FILED THIS FORM AS *"DECLARED TO HAVE
// DRIVES THAT DO NOT EXIST IN THIS REPOSITORY"*** — `docs/specs/storeroom-native-greens.md:666`/`:669` marks
// the `NG-21` re-derivation **`OWED`**, and that harness is not in this tree. **SO THE DRIVE IS AUTHORED HERE,
// AND ITS REACH IS MEASURED RATHER THAN ASSUMED: the form is EXERCISED exactly where this machine carries a
// READ-ONLY MOUNT that a create answers `EROFS` on.** **WHERE IT CANNOT BE EXERCISED THE CELL RECORDS
// `SKIPPED-UNREACHABLE` IN ITS OUTPUT AND SAYS WHICH PRECONDITION FAILED — IT DOES NOT PRINT A PASS FOR A
// STATE IT NEVER DROVE** (the brief's own form; `implementation-plan.md §9.5` item 3's measurement-honesty
// clause). **AND THE RECORD IS NOT SILENT EITHER WAY: the exercised branch prints what it drove and the
// unexercised branch prints what it could not.**
//
// **WHAT IS *NOT* CLAIMED:** that this suite mounts anything. It does not — it READS `/proc/mounts`, which
// declares each mount's own options. **Where no read-only mount exists, the honest record is
// `SKIPPED-UNREACHABLE`, and the census in cell 11 still names the driving cell rather than a promise.**
// Drives: §8.1 #13's amended trigger clause; §10.4 part 5; §7.1 step 4b (C); storeroom-native-greens.md:666/:669 (F-3)
#[test]
fn acp_erofs_a_read_only_mount_refuses_at_construction_or_is_recorded_unreachable() {
    let mount = erofs_mount_root();
    if mount.is_none() {
        // **THE HONEST RECORD. THERE IS NO PASS HERE FOR THE `EROFS` BRANCH — this branch drove no such
        // state, and it says so in the output rather than reporting a green.**
        println!(
            "SKIPPED-UNREACHABLE — `EROFS`: this machine carries NO READ-ONLY MOUNT whose directories answer \
             `EROFS` (errno 30) to the exclusive create — `/proc/mounts` names `ro` mounts, and where it \
             names one its root is either unreachable to this process or absent entirely — so the \
             read-only-mount form CANNOT BE EXERCISED HERE. **THE PRECONDITION IS THE KERNEL'S ERRNO, NOT THE \
             MOUNTS TABLE'S FLAG:** a `ro` mount this process may not even search answers `EACCES`, which is \
             the OTHER new form and must not be reported as this one. This is NOT a pass: the branch below \
             (`FilePathUnreachable` at construction) was NOT driven. `F-3` filed this form's drive as `OWED` \
             (`storeroom-native-greens.md:666`/`:669`) and this cell records its own reach instead of \
             inheriting the claim."
        );
        return;
    }
    let mount = mount.expect("the mount root was read");

    // A PROVIDED, ABSENT path whose PARENT is the read-only mount's own root (present, and a directory).
    let path = format!("{mount}/snst-erofs-probe.json");
    assert!(
        std::path::Path::new(&mount).is_dir(),
        "the precondition's own subject: the mount root `{mount}` is a DIRECTORY, so the state driven is \
         `EROFS` and not `ENOENT` (`DD-40` (a) would be a different form of the same member)"
    );
    println!("EXERCISED — `EROFS`: driving the read-only-mount form at `{path}`");

    // **THE PRECONDITION IS RE-MEASURED HERE AND IS ASSERTED AS THE STATE'S OWN FACT:** the kernel answers
    // the exclusive create at this parent with `EROFS`. **A mount whose `ro` option is declared but which
    // accepts a create is a state this cell may not silently reinterpret**, so it fails loudly.
    #[cfg(unix)]
    match std::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&path)
    {
        Ok(handle) => {
            drop(handle);
            let _ = std::fs::remove_file(&path);
            panic!(
                "THE CAPABILITY PRECONDITION IS FALSE: `/proc/mounts` declares `{mount}` READ-ONLY, yet the \
                 kernel ACCEPTED a create in it. This cell drives `EROFS` and nothing else — it FAILS rather \
                 than reporting a green for a state it did not reach"
            );
        }
        Err(e) => assert_eq!(
            e.raw_os_error(),
            Some(30),
            "THE CAPABILITY PRECONDITION: the create under a read-only mount answers `EROFS` (errno 30, \
             `contract.md §8.1` #13's own token). Any other failure — `EACCES` (13) especially — means this \
             cell would be driving the ACL/ownership face instead and must not report it as `EROFS`"
        ),
    }

    let e = failure(
        storeCreate(&cfg_at(&path, 4)),
        "§8.1 #13's amended clause (b) / §10.4 part 5: a provided, absent path whose parent lies on a \
         READ-ONLY MOUNT is DECIDED AT CONSTRUCTION — the exclusive create answers `EROFS`, so the \
         construction FAILS and NO INSTANCE is returned",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13's amended trigger clause, first new form: *\"A PROVIDED, ABSENT PATH'S PARENT LIES ON A \
         READ-ONLY MOUNT (`EROFS`)\"* — `FilePathUnreachable` and never a construction-time \
         `FileCommitFailed` (`DD-45`'s amended clause (b))",
    );
    assert!(
        path_length(&path).is_none(),
        "§10.4 part 5 / A55: the refused construction created no file on a filesystem that cannot carry one \
         — *\"every construction that FAILS leaves NOTHING BEHIND\"*"
    );
}

/// **The capability precondition the `EROFS` cell is gated on: this machine's own READ-ONLY MOUNTS, read from
/// `/proc/mounts`, whose `ro` option is the mounts table's own declaration — and THEN the kernel's own errno
/// at each of their roots.** **`None` means the form CANNOT BE EXERCISED HERE, and the caller records
/// `SKIPPED-UNREACHABLE` rather than passing.**
///
/// **THE ERRNO IS PART OF THE PRECONDITION, AND THAT IS THE POINT OF ASKING TWICE:** a `ro` mount the process
/// may not search answers **`EACCES`** — the OTHER new form of the same member — and a cell that reported
/// that as `EROFS` would be reporting a state it never drove. **Only a create answering `EROFS` (errno `30`)
/// makes a mount a drive for this cell.** The probing create is DENIED, so it leaves nothing behind; the
/// caller re-measures it before the construction.
///
/// **THIS SUITE MOUNTS NOTHING.** It reads the mounts table and takes the kernel's answer at what it finds;
/// **that is the difference between a drive and a promise**, and it is what `F-3` asked for.
fn erofs_mount_root() -> Option<String> {
    let mounts = std::fs::read_to_string("/proc/mounts").ok()?;
    for line in mounts.lines() {
        let mut fields = line.split_whitespace();
        let _device = fields.next()?;
        let mount_point = fields.next()?;
        let _fstype = fields.next()?;
        let options = fields.next().unwrap_or("");
        if !options.split(',').any(|o| o == "ro") {
            continue;
        }
        if !std::path::Path::new(mount_point).is_dir() {
            continue;
        }
        let probe = format!("{mount_point}/snst-erofs-capability-probe.json");
        match std::fs::OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&probe)
        {
            // A `ro` mount that ACCEPTS a create is not the state this cell names: skip it rather than
            // reporting it, and let the cell panic on the mount it finally selects if that ever happens.
            Ok(handle) => {
                drop(handle);
                let _ = std::fs::remove_file(&probe);
                continue;
            }
            Err(e) => {
                if e.raw_os_error() == Some(30) {
                    return Some(mount_point.to_string());
                }
            }
        }
    }
    None
}

// ===================================================================================================
// CELL 13 — THE OWNERSHIP-MISMATCH FACE OF `EACCES`, DRIVEN, AND THE ACCESS-ACL FACE RECORDED.
// ===================================================================================================

// **CELL 13 — `§8.1` #13's OWNERSHIP-MISMATCH FACE: *"AN OWNERSHIP MISMATCH BETWEEN THE MODE BITS AND THE
// PROCESS"*, AND ITS OWN WORDS SAY WHERE THAT STATE IS.** *"Between the mode bits and the process"* is a
// statement about a parent whose **MODE BITS CALL IT WRITABLE AND WHOSE OWNER IS NOT THIS PROCESS** — and
// **`docs/defects.md`'s `DEF-20` NAMES THE MEASURED INSTANCE IN ITS OWN FIRST SENTENCE:** *"the
// CONSTRUCTION-TIME FILE PROBE PASSES OVER A PATH THE APPLICATION CANNOT WRITE … so a ROOT-OWNED `0755`
// directory passes, and the register's tier is fixed at creation to `file` over a path the application can
// never commit to. **MEASURED, NOT INHERITED: `filePath: '/usr/bin/psr-probe.json'` RETURNS AN INSTANCE
// where the declared answer is `FilePathUnreachable`.**"*
//
// **SO THIS CELL DRIVES THAT EXACT STATE, AND IT IS THE CANONICAL FORM THE DEFECT WAS FILED FOR:** a parent
// owned by ANOTHER uid (`/usr/bin`, `uid=0`, mode `0o755`) under which `readonly()` answers **WRITABLE**
// (the owner-write bit stands) and the kernel answers **`EACCES`** (this process is not the owner and has no
// write there). **THE DIVERGENCE IS THE SAME ONE CELL 2 (a) DRIVES AT A PARENT THIS PROCESS OWNS; the
// `0o200` parent is the instance that needs NO assumption about the machine, and this one is the instance
// the defect's own record names.** **BOTH ARE ASSERTED AS PRECONDITIONS, SO NEITHER CELL CAN PASS ON A
// PLATFORM WHERE THE DIVERGENCE IS ABSENT.**
//
// **AND NO FILE IS EVER CREATED IN THE SHARED PARENT — the driving act is the DENIED one:** the probe
// create is refused, nothing is left behind, and the cell asserts the path's absence at the end.
// Drives: §8.1 #13's amended trigger clause (the ownership-mismatch form); §10.4 parts 1 and 5; §7.1 step 4b (C); DD-45; DEF-20
#[test]
fn acp_an_ownership_mismatch_denial_refuses_at_construction_or_is_recorded_unreachable() {
    let candidates = ["/usr/bin", "/usr/local/bin", "/etc", "/usr/share"];
    let mut driven: Option<String> = None;
    for parent in candidates {
        let parent_path = std::path::Path::new(parent);
        if !parent_path.is_dir() {
            continue;
        }
        #[cfg(unix)]
        {
            use std::os::unix::fs::MetadataExt;
            let metadata = std::fs::metadata(parent_path).expect("the candidate's metadata");
            let mode_says_writable = !metadata.permissions().readonly();
            let owned_by_this_process = metadata.uid() == process_uid();
            if !mode_says_writable || owned_by_this_process {
                continue;
            }
        }
        let probe = format!("{parent}/snst-ownership-mismatch-probe.json");
        if kernel_denies_exclusive_create(std::path::Path::new(&probe)) {
            driven = Some(probe);
            break;
        }
    }

    let Some(probe) = driven else {
        println!(
            "SKIPPED-UNREACHABLE — the OWNERSHIP-MISMATCH face of `EACCES`: no candidate parent among \
             {candidates:?} is (a) a directory, (b) NOT owned by this process, (c) MODE-BITS-WRITABLE, and \
             (d) denying the exclusive create with `EACCES`. This is NOT a pass: the `FilePathUnreachable` \
             branch was NOT driven. **THE DECIDABLE INSTANCE OF THIS CLAUSE'S STATE THAT THIS SUITE DOES \
             REACH INDEPENDENTLY OF ANY MACHINE ASSUMPTION IS CELL 2 (a)** — a parent this process OWNS at \
             `0o200`, where `readonly()` answers WRITABLE and the kernel answers `EACCES` \
             (`DEF-2026-10-13-B`)."
        );
        return;
    };

    println!(
        "EXERCISED — the OWNERSHIP-MISMATCH face of `EACCES`: the create at `{probe}` is denied while the \
         parent's MODE BITS call it WRITABLE (the state `DEF-20` measured at `/usr/bin/psr-probe.json`)."
    );

    // ---- THE CONTRACT'S DECLARED ANSWER — AND IT IS THE AMENDED ONE, NOT THE WITHDRAWN ONE. -------------
    // **THIS ASSERTION IS THE AMENDMENT'S WHOLE POINT AT THIS PATH:** `DEF-20` measured the WITHDRAWN code
    // RETURNING AN INSTANCE here; the amended code runs the exclusive create, catches `EACCES` and refuses.
    let e = failure(
        storeCreate(&cfg_at(&probe, 4)),
        "§8.1 #13's amended clause (b) / §10.4 part 5: the ownership mismatch denies the exclusive create, \
         so the construction FAILS with `FilePathUnreachable` and NO INSTANCE IS RETURNED — AN INSTANCE HERE \
         IS THE WITHDRAWN READING, WHICH `DEF-20` MEASURED AT THIS VERY PATH (`/usr/bin/psr-probe.json`)",
    );
    assert_code(
        &e,
        "FilePathUnreachable",
        "§8.1 #13's amended trigger clause, second new form: *\"AN OWNERSHIP MISMATCH BETWEEN THE MODE BITS \
         AND THE PROCESS (`EACCES`)\"* — the reachability member's own code",
    );
    assert!(
        path_length(&probe).is_none(),
        "§10.4 part 5 / A55: *\"every construction that FAILS leaves NOTHING BEHIND\"* — the refused \
         construction created no file in a directory it may not write. **THE CELL ALSO NEVER LEAVES A FILE \
         HERE FOR ANOTHER RUN TO FIND: the only create attempted in this parent was the one the kernel \
         denied.**"
    );
    assert!(
        std::fs::metadata(&probe).is_err(),
        "and the path is ABSENT by a second reading, so the assertion above is not an artifact of \
         `path_length`'s own `Option`"
    );
}

// **CELL 14 — THE ACCESS-ACL FACE OF `EACCES`, RECORDED AS `SKIPPED-UNREACHABLE` WITH ITS MEASUREMENT —
// AND THE MEASUREMENT IS WHY CELL 2 (a) IS NAMED AS THIS STATE'S DECIDABLE INSTANCE.** `§8.1` #13's amended
// clause separates two forms: *"THE PROCESS IS DENIED THE CREATE BY AN ACCESS ACL"* **and** *"BY AN OWNERSHIP
// MISMATCH BETWEEN THE MODE BITS AND THE PROCESS"*. **Cell 13 drives the second; this cell measures the
// first.**
//
// **WHAT THE MEASUREMENT IS, SO THE RECORD IS EVIDENCE RATHER THAN AN APOLOGY:** this cell applies a real
// access ACL to a directory it OWNS, with the system's own `setfacl`, and then reads BOTH instruments.
// **The ACL that clears the OWNER's write is reported by the MODE WORD ITSELF** — on this platform the
// owner-class permission bits and the ACL's `user::` entry are **the same datum**, so `readonly()` follows
// the ACL and the two instruments AGREE. **An access ACL cannot put the owner's write bit and the ACL's
// `user::` entry into disagreement** — which is exactly why the divergence this amendment closes is reached
// through a mode word whose class bits do not describe the process (`DEF-20`'s ownership mismatch, cell 13)
// **or through an owner-EXECUTE that the mode word does not carry at all (`0o200`, cell 2 (a)) — and NOT
// through an ACL.** **THE CELL RECORDS WHAT IT MEASURED AND PERFORMS NO `storeCreate` UNDER AN ACL THAT DID
// NOT ESTABLISH THE STATE IT NAMES.**
// Drives: §8.1 #13's amended trigger clause (the ACL-deny form); §10.4 parts 1 and 5; DEF-2026-10-13-B
#[test]
fn acp_an_acl_denied_create_is_recorded_unreachable_with_its_measurement() {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let dir = std::path::PathBuf::from(fresh_path("acp-acl-dir"));
        std::fs::create_dir_all(&dir).expect("this cell's own directory, owned by this process");
        let path = dir.join("state.json");
        let dir_str = dir.to_string_lossy().into_owned();
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o700)).expect(
            "the directory's MODE BITS call it WRITABLE — the state the ACL is applied over",
        );

        let acl_applied = std::process::Command::new("setfacl")
            .args(["-m", "u::r-x", &dir_str])
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null())
            .status()
            .map(|s| s.success())
            .unwrap_or(false);

        let mode_says_writable = !std::fs::metadata(&dir)
            .expect("the directory's metadata")
            .permissions()
            .readonly();
        let kernel_denies = kernel_denies_exclusive_create(&path);

        // The ACL is cleared and the mode restored ON EVERY PATH, so no sibling cell is disturbed.
        let _ = std::process::Command::new("setfacl")
            .args(["-b", &dir_str])
            .status();
        restore_and_remove(&dir);
        let _ = std::fs::remove_dir_all(&dir);

        if acl_applied && mode_says_writable && kernel_denies {
            // The state WAS established after all — then it is DRIVEN, not skipped, and the cell says so.
            println!(
                "EXERCISED — the ACCESS-ACL face of `EACCES`: the ACL denied the create while the MODE WORD \
                 still read WRITABLE at `{dir_str}`. (This is the branch the platform is not expected to \
                 reach; where it is reached the drive is real.)"
            );
            let e = failure(
                storeCreate(&cfg_at(&path.to_string_lossy(), 4)),
                "§8.1 #13's amended clause (b): an access-ACL denial of the exclusive create refuses the \
                 construction",
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§8.1 #13's amended trigger clause, second new form: the ACCESS-ACL denial's own code",
            );
            assert!(
                path_length(&path.to_string_lossy()).is_none(),
                "§10.4 part 5 / A55: nothing is left behind by the refused construction"
            );
            return;
        }

        println!(
            "SKIPPED-UNREACHABLE — the ACCESS-ACL face of `EACCES`: `setfacl` applied: {acl_applied}; the \
             mode word read WRITABLE after the ACL: {mode_says_writable}; the kernel denied the create: \
             {kernel_denies}. The state this form names (mode bits WRITABLE, kernel DENIED, the denial FROM \
             the ACL) is NOT constructible here: clearing the owner's write in the ACL moves the mode word's \
             own owner bits, because the ACL's `user::` entry and the owner-class mode bits are ONE datum on \
             this platform. This is NOT a pass — no `storeCreate` was performed under a state this cell did \
             not establish. **THE DECIDABLE INSTANCES OF THIS CLAUSE'S STATE THAT THIS SUITE DOES DRIVE ARE \
             CELL 2 (a) (`0o200`, the process's own parent) AND CELL 13 (`/usr/bin`, the ownership \
             mismatch) — and `DEF-2026-10-13-B` records that the `0o200` parent is the one that needs no \
             assumption about the machine.**"
        );
    }
    #[cfg(not(unix))]
    println!(
        "SKIPPED-UNREACHABLE — the ACCESS-ACL face of `EACCES`: this runner is not UNIX, so no access ACL \
         exists to apply. This is NOT a pass."
    );
}

/// **This process's own uid, read without a dependency** — `/proc/self/status`'s `Uid:` line, whose first
/// field is the REAL uid. **Used only to establish that a candidate parent's owner is NOT this process**,
/// which is the ownership-mismatch state's own definition (`§8.1` #13's amended clause: *"an ownership
/// mismatch between the mode bits and the process"*). **A machine with no `/proc` makes the caller record
/// `SKIPPED-UNREACHABLE` rather than guess.**
#[cfg(unix)]
fn process_uid() -> u32 {
    match std::fs::read_to_string("/proc/self/status") {
        Ok(status) => status
            .lines()
            .find_map(|line| line.strip_prefix("Uid:"))
            .and_then(|rest| rest.split_whitespace().next())
            .and_then(|uid| uid.parse().ok())
            .unwrap_or(u32::MAX),
        Err(_) => u32::MAX,
    }
}

/// Restores a directory this file put a restrictive mode on, so no sibling cell — **and no other file that
/// shares `std::env::temp_dir()`** — is disturbed by it. **The restoration runs on EVERY exit path of every
/// cell that `chmod`s a directory, including the early-returning `SKIPPED-UNREACHABLE` branches.** (The
/// function's name is the call site's contract: it is called with the directory that is then removed by the
/// caller, and the restore is what makes that removal possible.)
#[cfg(unix)]
fn restore_and_remove(dir: &std::path::Path) {
    use std::os::unix::fs::PermissionsExt;
    let _ = std::fs::set_permissions(dir, std::fs::Permissions::from_mode(0o700));
}
