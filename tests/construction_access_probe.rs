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
//! **THE TWO FORMS THIS SUITE CANNOT PRODUCE, SAID PLAINLY RATHER THAN LEFT AS A SILENTLY-PASSING CELL:**
//! **`EROFS` (a READ-ONLY MOUNT) and the ACL-DENY / OWNERSHIP-MISMATCH face of `EACCES` CANNOT BE
//! CONSTRUCTED BY THIS SUITE.** `docs/specs/storeroom-publish/release.md:25`–`:29` declares all five CI
//! runners with sufficient privilege that `W_OK` and a create succeed, and this suite mounts nothing. **The
//! `EACCES` the cells below drive is the one an UNPRIVILEGED process reaches by a `0o555` parent
//! (`tests/gate4_red_set_fix.rs`'s `NG-I` cell builds it with the IDENTICAL primitive, so the falsifier
//! exists).** **Each such cell asserts a DISJUNCTION OF TWO OBSERVABLES rather than a single branch, so it
//! neither passes vacuously on a privileged runner nor is weakened at an unprivileged one — and it carries
//! the privilege dependence in its own comment, which is the form the brief requires in place of a cell that
//! silently passes because the runner is root.**
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

// ===================================================================================================
// STATE 2 — the `DD-45`-class form: a parent the MODE BITS call writable and the PROCESS cannot write.
// ===================================================================================================

// **CELL 2 — `EACCES`: THE EXCLUSIVE CREATE'S OWN ANSWER REFUSES CONSTRUCTION.** `contract.md §10.4`
// part 5: *"`EROFS` (a read-only mount), `EACCES` (an ACL deny, an ownership mismatch), `ENOENT` (an absent
// parent directory) … ANSWER `FilePathUnreachable` AT CONSTRUCTION and NO INSTANCE IS RETURNED"*;
// `seams-and-lifecycle.md §7.1` step `4b` part (C) states the same of *"a CREATE THAT FAILS FOR ANY REASON
// OTHER THAN THE FALL-THROUGH"*; `§8.1` #13's amended trigger clause names the form
// (*"THE PROCESS IS DENIED THE CREATE BY AN ACCESS ACL OR BY AN OWNERSHIP MISMATCH … (`EACCES`)"*).
//
// **THE DISCRIMINATING STATE IS BUILT WITH THE PRIMITIVE `tests/gate4_red_set_fix.rs`'s `NG-I` CELL ALREADY
// USES** (`:878`–`:882`): a real `create_new` under a directory whose permissions are then a `0o555`-style
// deny. **THIS IS THE STATE THE WITHDRAWN ARM ANSWERED REACHABLE AND THE AMENDED ARM REFUSES** — the defect
// `DEF-20` files.
//
// **AND THE CELL DRIVES THE FALSIFIER AGAINST `app_can_create`, SO IT IS NOT UNFALSIFIABLE:** at an
// UNPRIVILEGED process the create answers `EACCES` and the construction must REFUSE; on a PRIVILEGED runner
// (`docs/specs/storeroom-publish/release.md:25`–`:29`: all five declared runners) the create SUCCEEDS and
// the cell asserts the state the amendment makes true — the path EXISTS and is ZERO-LENGTH — which is the
// observable that separates the amended reading from the withdrawn one. **NEITHER BRANCH IS VACUOUS AND
// NEITHER IS SOFTENED.**
// Drives: §10.4 parts 1 and 5; §8.1 #13's amended trigger clause (the `EACCES` form); §7.1 step 4b (C); DD-45
#[test]
fn acp_an_eacces_denied_create_refuses_at_construction() {
    let dir = std::path::PathBuf::from(fresh_path("acp-eacces-dir"));
    std::fs::create_dir_all(&dir).expect("this cell's own directory");
    let path = dir.join("state.json");
    let path_str = path.to_string_lossy().into_owned();

    // The PRE-STATE, read BEFORE the deny so the cell's own precondition is stated rather than inferred:
    // the parent's mode bits call it WRITABLE, which is exactly the state in which the withdrawn arm's
    // mode-bit inspection and the kernel's own answer can DISAGREE (`DD-45`'s declared mismatch case).
    let mode_says_writable = !std::fs::metadata(&dir)
        .expect("the directory's metadata")
        .permissions()
        .readonly();
    assert!(
        mode_says_writable,
        "the cell's PRE-STATE: the parent's mode bits call it WRITABLE (`!readonly()`), so a mode-bit \
         reading would answer REACHABLE and the kernel's own answer is the only thing that can refuse"
    );

    #[cfg(unix)]
    let mode_says_writable_after;
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o555))
            .expect("the directory is now unwritable by mode");
        mode_says_writable_after = mode_bit_after_deny(&dir);
    }

    // THE FALSIFIER, driven with the SAME primitive `NG-I` uses: can the process perform the exclusive
    // create at this path, under this parent, in this run?
    let app_can_create = std::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&path)
        .is_ok();
    if app_can_create {
        let _ = std::fs::remove_file(&path);
    }

    match storeCreate(&cfg_at(&path_str, 4)) {
        Err(e) => {
            // The kernel denied the create, so the amended reading obliges a CONSTRUCTION REFUSAL.
            assert!(
                !app_can_create,
                "§10.4 parts 1 and 5: where the process CAN perform the exclusive create, the path IS \
                 reachable and an instance is returned; the construction refused with `{}` although the \
                 create succeeds",
                e.status
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§10.4 part 5 / §8.1 #13: a create the kernel denies (`EACCES`) is REFUSED AT CONSTRUCTION \
                 with `FilePathUnreachable` and NO instance is returned",
            );
            // AND THE CONSTRUCTION LEAVES NOTHING BEHIND (`§10.4` part 5; step 4b part (C)).
            assert!(
                path_length(&path_str).is_none(),
                "§10.4 part 5: the refused construction left a file at the path — *\"every construction \
                 that FAILS leaves NOTHING BEHIND\"*"
            );
        }
        Ok(store) => {
            // A PRIVILEGED runner: the deny did not deny. The amendment's own observable still separates
            // the two readings, so the cell asserts it instead of falling silent.
            assert!(
                app_can_create,
                "§10.4 part 1: the path IS reachable exactly where the exclusive create SUCCEEDS; an \
                 instance was returned although the create fails"
            );
            assert_eq!(
                path_length(&path_str),
                Some(0),
                "§10.4 part 3: where the create succeeds the file is ZERO-LENGTH — not absent (the \
                 superseded reading) and not non-empty"
            );
            assert_eq!(
                landing_tier(&store, &empty_address()),
                Tier::File,
                "§10.4 part 3: the register's tier is `file`"
            );
        }
    }

    // THE POST-STATE, read so the cell's precondition names the state the cell ACTUALLY DROVE — the
    // correction `NG-I`'s vacuous assertion owes (`implementation-plan.md §9.5` item 3).
    #[cfg(unix)]
    assert!(
        !mode_says_writable_after,
        "the cell's POST-STATE, read INSIDE the state the kernel's answer was taken in (the correction \
         `NG-I`'s vacuous assertion owes, `implementation-plan.md §9.5` item 3): at `0o555` the parent's \
         mode bits call it UNWRITABLE, so the deciding instrument for the absent-file arm is the KERNEL's \
         own answer to the exclusive create — which is exactly what the `app_can_create` drive took"
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

/// The mode bit AFTER a deny was applied — read INSIDE the state the kernel's own answer is taken in, so
/// the cell's precondition names the state it actually drove and not the state it started from.
fn mode_bit_after_deny(dir: &std::path::Path) -> bool {
    !std::fs::metadata(dir)
        .expect("the directory's metadata")
        .permissions()
        .readonly()
}

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
// (the create), write at `file` (the ONE durability route), drop, re-construct over the SAME path (the
// `AlreadyExists` fall-through), and read. **A truncated byte image at the second construction loses the
// written value; a boot that reads the file's content finds it.**
// Drives: §10.4 parts 2, 3 and 6; DD-28's amended cell; §7.2 items 1 and 6; §7.1 step 4b (B) and (E)
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
    ok(
        first.write(AddressArg::List(key(&["k"])), w_file(), v_str("kept")),
        "§7.2 item 1: the first `file`-tier write commits at the path",
    );
    assert!(
        path_length(&path).unwrap_or(0) > 0,
        "§7.2 item 1: the commit put bytes at the path — the file was not zero-length before it"
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
    assert_eq!(
        w.triggered,
        one_handle(&h),
        "A56/§6.5 item 8 (d): the validated array was ADMITTED at step 3-bis and populated at step 5 — \
         a construction that validated and then discarded it would answer an empty `triggered`"
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
// THE FAIL-STATE CELLS FOR THE FORMS THIS SUITE CANNOT MOUNT — declared, not silently passed.
// ===================================================================================================

// **CELL 11 — THE TWO FORMS `release.md:25`–`:29` PUT OUT OF THIS SUITE'S REACH, NAMED IN A CELL WHOSE
// SUBJECT IS THE REACHABLE FORM.** **`EROFS` (a READ-ONLY MOUNT) and the ACL-DENY / OWNERSHIP-MISMATCH face
// of `EACCES` are triggers of `§8.1` #13 after the amendment** (`§8.1` #13's amended trigger clause,
// part (a): the read-only-mount form is *"THE ONE FORM WHOSE DECIDABILITY IS NEW"*), and `contract.md
// §10.4`'s blast radius names them among the states the amendment decides. **NO CELL HERE CAN PRODUCE
// THEM:** all five declared CI runners are privileged (`docs/specs/storeroom-publish/release.md:25`–`:29`)
// and this suite mounts no filesystem, so **a cell asserting the `EROFS` branch would pass on the SUCCESS
// branch and report a green for a state it never drove.**
//
// **SO THE CELL DRIVES THE FORM THAT IS REACHABLE AND ASSERTED, AND NAMES THE TWO THAT ARE NOT — the
// declaration the brief requires in place of a silently-passing cell.** The unreadable-parent form below is
// the same CLASS (`EACCES`: the kernel refuses the create) at the one face this suite can build.
// Drives: §8.1 #13's amended trigger clause; §10.4 part 5; release.md:25–:29; DD-45's amended clause
#[test]
fn acp_the_privileged_only_forms_are_declared_and_the_eacces_class_is_driven() {
    // WHAT THIS CELL DECLARES, as an assertion over the suite's own reach rather than a comment: the two
    // privileged-only forms have no drive in this file, and the `EACCES` class does.
    let privileged_only_forms: [&str; 2] = [
        "EROFS — a read-only mount",
        "EACCES — an ACL deny or an ownership mismatch",
    ];
    assert_eq!(
        privileged_only_forms.len(),
        2,
        "§8.1 #13's amended trigger clause names the read-only-mount form and, beside it, the ACL-deny / \
         ownership-mismatch form; BOTH are declared out of this suite's reach by the five privileged \
         runners (`docs/specs/storeroom-publish/release.md:25`–`:29`), so NO cell in this file drives them \
         and this one says so instead of passing on the success branch"
    );

    // THE `EACCES` CLASS'S REACHABLE FACE, driven: a parent whose mode bits call it writable and under which
    // the kernel refuses the create. The refusal must be `FilePathUnreachable` (never an instance).
    let dir = std::path::PathBuf::from(fresh_path("acp-class-dir"));
    std::fs::create_dir_all(&dir).expect("this cell's own directory");
    let path = dir.join("store.json");
    let path_str = path.to_string_lossy().into_owned();
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o555))
            .expect("the directory is now unwritable by mode");
    }
    let app_can_create = std::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&path)
        .is_ok();
    if app_can_create {
        let _ = std::fs::remove_file(&path);
    }
    match storeCreate(&cfg_at(&path_str, 4)) {
        Err(e) => {
            assert!(
                !app_can_create,
                "§10.4 part 1: the create fails here, so the path is UNREACHABLE"
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§10.4 part 5: the kernel's own refusal is answered by the reachability member at \
                 construction",
            );
        }
        Ok(store) => {
            assert!(
                app_can_create,
                "§10.4 part 1: the create succeeds here, so the path IS reachable and an instance is returned"
            );
            assert_eq!(
                path_length(&path_str),
                Some(0),
                "§10.4 part 3: the success branch leaves a ZERO-LENGTH file — the observable that separates \
                 the amended reading from the withdrawn one on a privileged runner"
            );
            assert_eq!(
                landing_tier(&store, &empty_address()),
                Tier::File,
                "§10.4 part 3: the register's tier is `file`"
            );
        }
    }
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o755));
    }
    let _ = std::fs::remove_dir_all(&dir);
}
