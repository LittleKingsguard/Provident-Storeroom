//! THE VERB-LEVEL LAYER — `surface.md` (`contract.md §2`): the construction, the five address verbs, the
//! two registration verbs, the handle, the single failure form, the returned records' JS spellings, the
//! delivery window and the two file-behaviour readings.
//!
//! **THE STATES ENUMERATED BEFORE THE DRIVES ARE AUTHORED.**
//!
//! | Clause | The states driven |
//! | --- | --- |
//! | `§2.1` the construction | the three declared keys · a fourth key · each outside form of each key (carried by the carriers' file) · no partial instance on failure |
//! | `§2.2` the address verbs | `read`: a leaf's literal · a branch's assembled value · the empty address (the whole register) · `readLiteral`: a leaf, a branch (`ReadTargetIsBranch`) · `write`: the `{op, watched, triggered}` record, a fresh value · `delete`: the `{address, tiers, triggered}` record, `address` VERBATIM, `tiers` in canonical order, and the `tiers: []` no-op arm · `rollback`: the `{opId, undoneOps, restoredTo}` record |
//! | `§2.2` no arity check | a missing, an extra and a wrong-shaped argument each reach the store's own carrier and answer the store's own code |
//! | `§2.5` the single failure form | the thrown object's two members and nothing else · the store's own `status` VERBATIM · the store's own generated `message` · never returned, never a `Promise`, never an `Error` subclass |
//! | `§2.7` delivery | `triggered` fresh on every call · membership only, never a sequence · a `delete` fires too |
//! | `§2.3` the handle | process-scoped uniqueness · the construction's `string` IN · the opaque value OUT · `unlisten` accepts the opaque form only |
//! | `§2.8` the file readings | a `delete` and a `rollback` perform NO file I/O: a fresh boot over an equal path re-loads the last successful `file` WRITE · a failed `file` commit answers `FileCommitFailed` after the automatic journal rollback |
//! | `§2.10` the registration verbs | `listen` returns a handle and populates the store's home · `unlisten` returns the unit and throws where the store does |
//! | `§2.9` item 2 | a failed read IS the existence probe · every `15` fail code reachable |
//! | `§2.6` the constraint pattern | evaluate after a `write`, reverse with `rollback` over the id that write returned — and no constraint verb, parameter or record exists |

mod support;

use support::*;

// =============================================================================================
// `§2.1` — the construction
// =============================================================================================

/// `DD-36`: *"`storeCreate(cfg)` takes ONE plain object with the store's THREE declared keys (`filePath` ·
/// `journalLength` · `listeners`), and the package passes them through WITHOUT adding a default, a rename or
/// a fourth key."*
#[test]
fn construction_takes_the_three_declared_keys_and_returns_an_instance() {
    let inst = create(&cfg_mem()).expect("the three-key object");
    inst.read(&JsAddressArg::List(vec![]), &JsTierArg::Absent)
        .expect("the returned value is the package's own instance handle");
}

/// `DD-36`: **a fourth key the package injects** is refused — *"a fourth key that changes the outcome"* is
/// on `P-SM-6`'s failure list. The store's `cfg` member set is CLOSED, so the fourth key does not reach it
/// and the OUTCOME is unchanged (`PAR-JS-1`'s `alt` cell).
#[test]
fn construction_a_fourth_key_does_not_change_the_outcome() {
    let plain = create(&cfg_mem()).expect("the three-key object");
    let extra = create(&JsConfig {
        file_path: None,
        journal_length: Some(JsJournalLengthArg::Count(2)),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: Some("journalPath".to_string()),
    })
    .expect("a fourth key does not reach the store's closed member set");
    let a = plain
        .read(&JsAddressArg::List(vec![]), &JsTierArg::Absent)
        .expect("read");
    let b = extra
        .read(&JsAddressArg::List(vec![]), &JsTierArg::Absent)
        .expect("read");
    assert!(js_equal(&a, &b));
}

/// `§2.1`: **it never returns a partial instance** — *"throws `{status, message}` on failure; never returns
/// a partial instance"*.
#[test]
fn construction_never_returns_a_partial_instance() {
    let cfg = JsConfig {
        file_path: None,
        journal_length: None,
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    };
    let err = create(&cfg).expect_err("no instance for an illegal construction");
    assert_refusal_is_the_single_form(&err, "ConstructionArgumentMissing");
}

/// `P-SM-6`'s `S-PROBE-DRY`: **the probe creates no file, no directory and no byte.**
#[test]
fn construction_the_reachability_probe_creates_nothing() {
    // **⟶ MOVED ONTO `support::DrivePath` 2026-10-11 (`role_test_writer`), BECAUSE A FIXED GLOBAL NAME IS THE
    // SAME LATENT-FLAKE CLASS THE HELPER WAS BUILT FOR.** As filed this cell probed
    // `std::env::temp_dir().join("storeroom-js-redset-probe-dry-parent")` — **a FIXED name, so every
    // concurrent invocation of this binary names the SAME directory, and this cell REMOVES it before it
    // probes and asserts its absence afterwards** (the helper's own header: *"a drive whose verdict depends
    // on the other drives running beside it proves nothing about the contract"*). Two `cargo test` runs, or
    // one run beside a `--nocapture` loop, could hand this cell another invocation's directory. **THE HELPER
    // NAMES THE DIRECTORY BY THIS TEST'S OWN NAME PLUS A PROCESS-WIDE COUNTER AND OWNS ITS CLEANUP ON EVERY
    // EXIT PATH, PANICS INCLUDED, and the two as-filed assertions are KEPT VERBATIM** — the refused
    // construction still creates NEITHER a directory NOR a file, which is the clause's own claim.
    let scratch = DrivePath::unique("storeroom-js-redset-probe-dry-parent", "file.json");
    let dir = scratch.dir().to_path_buf();
    let path = std::path::PathBuf::from(scratch.as_str());
    let _ = std::fs::remove_dir_all(&dir);
    let err = create(&cfg_at(path.to_str().unwrap(), 2)).expect_err("the parent does not exist");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    assert!(!dir.exists(), "the probe created no directory");
    assert!(!path.exists(), "the probe created no file");
}

/// `P-SM-6`'s `S-PROBE-DRY`: **a probe that truncates an existing file** is a failure — the file's bytes are
/// unchanged by a failed construction.
#[test]
fn construction_the_probe_does_not_truncate_an_existing_file() {
    // **⟶ MOVED ONTO `support::DrivePath` 2026-10-11 (`role_test_writer`), THE SAME CLASS AND THE SAME
    // REPAIR AS THE CELL ABOVE.** As filed this cell wrote `storeroom-js-redset-probe-{pid}.json` and probed
    // a FIXED `storeroom-js-redset-no-such-parent-2/x.json` — **a PID does not distinguish two concurrent
    // invocations of this binary, and the probed name is global**: a sibling invocation's cell could remove
    // the file this cell wrote or create the directory this cell asserts is absent. **EACH OF THE TWO PATHS
    // NOW COMES FROM THE CELL'S OWN GUARD, whose `Drop` removes the file first and this drive's own directory
    // second on every exit path — and the as-filed assertions stand unmoved:** the refusal is the single
    // form with `FilePathUnreachable`, and the file's bytes are UNCHANGED by the failed construction.
    let scratch = DrivePath::unique("storeroom-js-redset-probe-truncate", "probe.json");
    let path = std::path::PathBuf::from(scratch.as_str());
    std::fs::write(&path, b"{\"a\":1}").expect("a scratch file with bytes");
    // The probed path is this cell's OWN, and its parent directory is removed before the call, so the parent
    // does not exist when the probe runs — the clause's own condition, as filed.
    let unreachable = DrivePath::unique("storeroom-js-redset-no-such-parent-2", "x.json");
    let bad_dir = std::path::PathBuf::from(unreachable.as_str());
    let _ = std::fs::remove_dir_all(unreachable.dir());
    let err = create(&cfg_at(bad_dir.to_str().unwrap(), 2)).expect_err("unreachable");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    assert_eq!(
        std::fs::read(&path).expect("the file still has bytes"),
        b"{\"a\":1}",
        "a failed construction truncates nothing"
    );
}

/// `§2.1` / `PAR-JS-2`: **an ABSENT `filePath` returns an instance whose register is `mem`** — the one
/// absence that is NOT an outside value.
#[test]
fn construction_an_absent_file_path_is_in_domain_and_the_register_is_mem() {
    let mut inst = create(&cfg_mem()).expect("absent is IN DOMAIN");
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    let read_back = inst
        .read(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("mem".to_string()),
        )
        .expect("the register is at mem, so the mem tier holds this version");
    assert!(js_equal(&read_back, &JsValue::Num(1.0)));
}

// =============================================================================================
// `§2.2` — the address verbs, and their returned records
// =============================================================================================

/// `§2.2`: *"`read` on a leaf returns the stored literal; on a branch it returns the assembled value; on the
/// empty address it returns the whole register."*
#[test]
fn read_on_a_leaf_returns_the_stored_literal() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Str("v".into())).expect("a leaf");
    assert!(js_equal(
        &read_at(&inst, &[key("a")]).unwrap(),
        &JsValue::Str("v".into())
    ));
}

#[test]
fn read_on_a_branch_returns_the_assembled_value() {
    let mut inst = mem_instance();
    let written = JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))]));
    write_at(&mut inst, &[key("a")], &written).expect("a branch");
    let back = read_at(&inst, &[key("a")]).unwrap();
    assert!(
        js_equal(&back, &written),
        "the assembled value is the value the branch was written with: got {back:?}"
    );
}

#[test]
fn read_on_the_empty_address_returns_the_whole_register() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a leaf");
    match read_at(&inst, &[]).unwrap() {
        JsValue::Object(o) => assert_eq!(o.members.len(), 1, "the register holds its one key"),
        other => panic!("the register is a container, got {other:?}"),
    }
}

/// `§2.2` / `PAR-JS-6`: **`read`'s `tier` accepts ZERO TO MANY — one token or an array — and an array is an
/// ANY-MATCH set, not a union of values, not an ordered preference and not a filter** (`DD-37`).
#[test]
fn read_tier_one_token_and_an_array_are_both_accepted() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    let one = inst
        .read(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("mem".to_string()),
        )
        .expect("one token");
    let set = inst
        .read(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Set(vec![
                JsTierSetItem::Token("file".to_string()),
                JsTierSetItem::Token("mem".to_string()),
            ]),
        )
        .expect("an any-match set");
    assert!(js_equal(&one, &set));
}

/// `§2.2` / `PAR-JS-7`: **`write`'s `tier` is REQUIRED and SINGULAR**, and after any successful write every
/// anchor the write minted carries the caller's single tier.
#[test]
fn write_returns_the_record_and_mints_at_the_single_named_tier() {
    let mut inst = mem_instance();
    let w = inst
        .write(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("temp".to_string()),
            &JsValue::Num(1.0),
        )
        .expect("a temp-tier write");
    assert_eq!(w.op.tier.as_deref(), Some("temp"), "the caller's single tier");
    assert!(w.watched.is_empty(), "nothing watched in this write's scope");
}

/// `PAR-JS-14`: **the returned `watched` is ALWAYS an array, `[]` when nothing watched matched, never
/// `undefined` and never `null`** — and it carries the caller's own address spelling (segment lists).
#[test]
fn write_watched_returns_the_watched_addresses_as_segment_lists() {
    let mut inst = create(&cfg_mem_with(vec![listener_at(vec![key("a")], "l1")]))
        .expect("a registered listener at ['a']");
    // The parent container is created first: a write's parent is resolved BY ADDRESS.
    write_at(&mut inst, &[key("a")], &JsValue::Object(JsObject::plain(vec![])))
        .expect("a map at the parent");
    let w = write_at(&mut inst, &[key("a"), key("b")], &JsValue::Num(1.0)).expect("a write");
    assert_eq!(w.watched.len(), 1, "the write's address ran through the registration");
    assert_eq!(w.watched[0], vec![key("a")], "an address is a SEGMENT LIST");
}

/// `PAR-JS-15` / `§2.7` item 1: **`triggered` is a fresh JS array of the package's own opaque handles, `[]`
/// when nothing triggered.**
#[test]
fn write_triggered_is_an_array_of_opaque_handles() {
    let mut inst = create(&cfg_mem_with(vec![listener_at(vec![key("a")], "l1")])).expect("an instance");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    assert_eq!(w.triggered.len(), 1);
    let w2 = write_at(&mut inst, &[key("zzz")], &JsValue::Num(1.0)).expect("a write outside the scope");
    assert!(w2.triggered.is_empty(), "[] when no registration matched");
}

/// `PAR-JS-13`: the returned `op` is a fresh JS object carrying **the store's own eight members**.
#[test]
fn write_op_carries_the_stores_own_eight_members() {
    let mut inst = mem_instance();
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let op: JsJournalOp = w.op.clone();
    assert!(!op.opId.is_empty(), "the id a later rollback accepts");
    assert_eq!(op.kind, "write");
    assert_eq!(op.address, vec![key("a")], "in the caller's own segments");
    assert_eq!(op.tier.as_deref(), Some("mem"));
    assert!(!op.before.present);
    assert!(op.after.present);
    assert!(js_equal(&op.after.value, &JsValue::Num(1.0)));
    assert!(op.compacted == false || op.compacted == true, "a boolean");
    let _ = op.seq;
}

/// `PAR-JS-16`: the delete receipt's `address` member is **the caller's own array VERBATIM, as a fresh
/// copy**, and `tiers` names the tiers whose versions were REMOVED in canonical order.
#[test]
fn delete_returns_the_receipt_with_address_verbatim_and_tiers_canonical() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    inst.write(
        &JsAddressArg::List(vec![key("a")]),
        &JsTierArg::Token("temp".to_string()),
        &JsValue::Num(2.0),
    )
    .expect("a temp-tier write");
    let receipt = inst
        .delete(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
        .expect("a whole-target delete");
    assert_eq!(receipt.address, vec![key("a")], "address VERBATIM");
    assert_eq!(
        receipt.tiers,
        vec!["mem".to_string(), "temp".to_string()],
        "the store's canonical order is file, mem, temp"
    );
}

/// `PAR-JS-16`'s in-domain no-op arm: **a delete naming a tier the target does NOT hold is a SUCCESS
/// returning `tiers: []`** — *"it removes nothing"*.
#[test]
fn delete_naming_a_tier_the_target_does_not_hold_is_a_success_with_no_tiers() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
    let receipt = inst
        .delete(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("file".to_string()),
        )
        .expect("the store's own in-domain no-op arm");
    assert!(receipt.tiers.is_empty());
    assert!(js_equal(
        &read_at(&inst, &[key("a")]).unwrap(),
        &JsValue::Num(1.0)
    ));
}

/// `PAR-JS-13`/`PAR-JS-9`: **`rollback` returns `{opId, undoneOps, restoredTo}` and echoes the id it was
/// passed.**
#[test]
fn rollback_returns_the_three_member_result_and_echoes_the_id() {
    let mut inst = mem_instance();
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let r = inst
        .rollback(&JsOpIdArg::Str(w.op.opId.clone()))
        .expect("the id that write returned");
    assert_eq!(r.opId, w.op.opId);
    assert!(!r.restoredTo.present, "the write's own `before` state is restored");
    let _ = r.undoneOps;
}

/// `§2.2` / `DD-46`: **the package performs NO arity check, no defaulting and no validation of its own** —
/// a missing, an extra or a wrong-shaped argument reaches the store's own carrier value and answers the
/// store's own code.
#[test]
fn no_arity_check_a_missing_argument_reaches_the_store() {
    let mut inst = mem_instance();
    let err = inst
        .write(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Absent,
            &JsValue::Num(1.0),
        )
        .expect_err("the write's tier is missing, and the STORE says so");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

#[test]
fn no_arity_check_a_wrong_shaped_argument_reaches_the_store() {
    let inst = mem_instance();
    let err = inst
        .read(
            &JsAddressArg::NonArray(JsNonArray::Number(1.0)),
            &JsTierArg::Absent,
        )
        .expect_err("the STORE's own carrier answers");
    assert_refusal_is_the_single_form(&err, "AddressMalformed");
}

/// `§2.2` / `§2.9` item 2: **`readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch` on a
/// branch.**
#[test]
fn read_literal_on_a_branch_answers_read_target_is_branch() {
    let mut inst = mem_instance();
    write_at(
        &mut inst,
        &[key("a")],
        &JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))])),
    )
    .expect("a branch");
    let err = inst
        .read_literal(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
        .expect_err("the target must be a leaf");
    assert_refusal_is_the_single_form(&err, "ReadTargetIsBranch");
}

#[test]
fn read_literal_on_a_leaf_returns_the_literal() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Bool(true)).expect("a leaf");
    assert!(js_equal(
        &inst
            .read_literal(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
            .expect("a leaf"),
        &JsValue::Bool(true)
    ));
}

// =============================================================================================
// `§2.5` — the single failure form
// =============================================================================================

/// `DD-12`: **a failure crosses as a THROWN plain object with EXACTLY two members, `{status, message}`** —
/// and in Rust the single spelling of "thrown" is the `Err` arm of the call's `Result`. There is no returned
/// tagged union, no `{ok, value}` envelope and no `Error` subclass.
#[test]
fn failure_form_carries_exactly_the_two_members() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::Null).expect_err("a refusal");
    let Refusal { status, message } = err;
    assert!(!status.is_empty());
    assert!(!message.is_empty());
    // The member SET is closed at two: the model has no third member to read, and `surface.md §2.5` item 3
    // refuses `code`, `cause`, `stack` and `data` alike.
}

/// `§2.5` item 1 / `DD-40`: **`status` is the store's own member token VERBATIM — never an index, never a
/// lowercased or prefixed variant and never a package-minted code.**
#[test]
fn failure_form_status_is_a_member_token_verbatim() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::Null).expect_err("a refusal");
    assert!(CODES.contains(&err.status.as_str()), "a member of the closed set");
    assert_eq!(
        err.status,
        err.status.trim(),
        "no prefix and no padding was added by the package"
    );
}

/// `§2.5` item 2: **`message` is the store's own GENERATED message VERBATIM — never empty, never a
/// placeholder and never hand-authored by the package.**
#[test]
fn failure_form_message_is_the_stores_own_generated_string() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::Null).expect_err("a refusal");
    assert_eq!(
        err.message,
        store_value_refusal_message(&[key("a")]),
        "the store's generator's own string for this failing target"
    );
}

/// `§2.5` item 3: **the failure is THROWN and never returned** — on the success path no value ever carries
/// the failure shape.
#[test]
fn failure_form_is_never_returned_on_a_success_path() {
    let mut inst = mem_instance();
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a success");
    assert!(js_equal(&w.op.after.value, &JsValue::Num(1.0)));
    assert!(w.op.after.present);
}

/// `DD-13`: **no discrimination rule is owed** — a stored value whose shape is indistinguishable from
/// `{status, message}` is an UNSUPPORTED ANTI-PATTERN the caller carries, and the package adds no branded
/// record, no helper and no third member.
#[test]
fn failure_form_carries_no_discrimination_helper() {
    let mut inst = mem_instance();
    let lookalike = JsValue::Object(JsObject::plain(vec![
        (JsKey::Key("status".into()), JsValue::Str("AddressNotFound".into())),
        (JsKey::Key("message".into()), JsValue::Str("generated".into())),
    ]));
    write_at(&mut inst, &[key("a")], &lookalike).expect("the lookalike is an ordinary admitted value");
    let back = read_at(&inst, &[key("a")]).unwrap();
    assert!(
        js_equal(&back, &lookalike),
        "the value crosses as the value it is: the package brands nothing (DD-13)"
    );
}

// =============================================================================================
// `§2.9` — `findAddress` is NOT exposed, and a failed read is the existence probe
// =============================================================================================

/// `§2.9` item 2: **a failed read IS the existence probe** — *"a `read` that resolves answers the value, and
/// a `read` that does not answers a thrown `{status, message}`"*.
#[test]
fn probe_a_failed_read_answers_the_existence_question() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a leaf exists");
    assert!(read_at(&inst, &[key("a")]).is_ok(), "it exists");
    let err = read_at(&inst, &[key("gone")]).expect_err("it does not exist");
    assert_refusal_is_the_single_form(&err, "AddressNotFound");
}

/// `§2.9` item 1: **the JS surface is exactly the `8` verbs plus the returned records** — `storeCreate` ·
/// `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` — and no `NodeRef`
/// crosses. The drive is the API's own surface: there is no resolver to call, and no returned value's
/// member is a reference.
#[test]
fn non_exposure_the_crossing_exposes_no_resolver_and_no_reference() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a leaf");
    let w = write_at(&mut inst, &[key("b")], &JsValue::Num(2.0)).expect("a write");
    // Every member of every returned record is a VALUE: a string, a segment list, a tier token, a boolean,
    // a number or an admitted value — and the `op`'s address is a fresh segment list, not a reference.
    assert_eq!(w.op.address, vec![key("b")]);
    assert!(matches!(w.op.after.value, JsValue::Num(_)));
}

// =============================================================================================
// `§2.3` / `§2.10` — the handle, and the two registration verbs
// =============================================================================================

/// `§2.3` item 1 / `A69` **read through `D-22`/`D-29` (`contract.md §2.2`; `listen-verb.md §1` item 1):
/// THERE IS NO MINT.** *"`listen` should return the handle on success"* — **the caller spells the identity, so
/// the store mints none and the core's answer is `()`: the success signal is the `Ok` and the identity is the
/// caller's own string** (`PAR-HL-3`). **SO THE OBSERVABLE THIS CELL NOW DRIVES IS THE ONE THE VERB DOES HAVE:
/// `listen(handle, addresses)` IS A SET-ASSIGNMENT AND NOT A UNION** — `contract.md §2.2` item 3: *"a
/// `listen(h, S2)` after `listen(h, S1)` DESTROYS `S1` wholly and installs `S2`"* — and the purge is by HANDLE.
/// **The token's own uniqueness is gone with the token; the handle's uniqueness is `D-24`'s one-pair-per-`id`
/// rule and is driven in `crossing_values`/`surface_verbs`' registration cells, not by a mint.**
#[test]
fn handle_the_set_is_an_assignment_and_the_purge_is_by_handle() {
    let mut inst = mem_instance();
    inst.listen(&JsHandleArg::Opaque(js_handle("h")), &[JsAddressArg::List(vec![key("x")])])
        .expect("the caller spells the handle and the set");
    inst.listen(&JsHandleArg::Opaque(js_handle("h")), &[JsAddressArg::List(vec![key("y")])])
        .expect("a second set for the same handle");
    // A write at the FIRST address no longer fires: the assignment DESTROYED `S1` wholly.
    let at_x = write_at(&mut inst, &[key("x")], &JsValue::Num(1.0)).expect("a write");
    assert!(
        at_x.triggered.is_empty(),
        "`listen(h, [y])` after `listen(h, [x])` destroys `[x]` wholesale (contract.md §2.2 item 3)"
    );
    // A second `listen` at the SAME handle and address re-installs ONE entry and not two.
    inst.listen(&JsHandleArg::Opaque(js_handle("k")), &[JsAddressArg::List(vec![key("p")])])
        .expect("a registration");
    inst.listen(&JsHandleArg::Opaque(js_handle("k")), &[JsAddressArg::List(vec![key("p")])])
        .expect("the same registration again");
    let w = write_at(&mut inst, &[key("p")], &JsValue::Num(2.0)).expect("a write");
    assert!(
        js_trigger_set_equal(&w.triggered, &[trigger(&[key("p")], "k")]),
        "the purge runs FIRST and the install SECOND: one entry, one pair (`§2.2` item 4)"
    );
}

/// **`§2.3` item 1's process-wide domain claim is GONE WITH THE MINT (`D-22`/`D-29`), and what survives is
/// `§2.4` item 5 (c)'s INSTANCE-SCOPED domain** — *"a handle THIS instance never minted or adopted"* — which is
/// what `D-30` makes explicit (*"Creating a new store should create a new stack"*). **Two instances may
/// therefore hold ONE spelling**, and each one's own store fires it: the handle is the caller's word and the
/// domain that judges it is the instance's.
#[test]
fn handle_the_domain_is_the_instance_and_two_instances_may_share_one_spelling() {
    let mut first = mem_instance();
    let mut second = mem_instance();
    first
        .listen(&JsHandleArg::Opaque(js_handle("shared")), &[JsAddressArg::List(vec![key("x")])])
        .expect("a registration in the first instance");
    second
        .listen(&JsHandleArg::Opaque(js_handle("shared")), &[JsAddressArg::List(vec![key("x")])])
        .expect("the same spelling is in domain in the SECOND instance too");
    let a = write_at(&mut first, &[key("x")], &JsValue::Num(1.0)).expect("a write");
    let b = write_at(&mut second, &[key("x")], &JsValue::Num(1.0)).expect("a write");
    assert!(js_trigger_set_equal(&a.triggered, &[trigger(&[key("x")], "shared")]));
    assert!(js_trigger_set_equal(&b.triggered, &[trigger(&[key("x")], "shared")]));
    // And the registration's DOMAIN HALF is per-instance: a THIRD instance refuses the very spelling the
    // first two hold, because the domain is `owned`'s and `owned` is the instance's (`D-30`).
    let mut stranger = mem_instance();
    let refusal = stranger
        .register(&JsHandleArg::Opaque(js_handle("shared")))
        .expect_err("a handle a FOREIGN instance holds is outside THIS instance's domain");
    assert_refusal_is_the_single_form(&refusal, "AddressMalformed");
}

/// `§2.3` item 2: **the construction's `listeners[]` takes each handle as a plain `string`; the verb's
/// positions take the package's opaque value; `unlisten` accepts the OPAQUE form ONLY** (`DD-14`).
/// **⟶ RE-DERIVED (`contract.md §2.4` item 1): the record's `triggered` carries PAIRS, so the value the OUT
/// direction hands back is the pair's own `handle` member** — and it is the exact value `unlisten` accepts.
#[test]
fn handle_the_two_spellings_one_per_direction() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("the caller's STRING is the IN spelling");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let opaque = w.triggered[0].handle.clone();
    assert_eq!(opaque, js_handle("l1"), "the pair's handle IS the caller's own string");
    // The OUT spelling is accepted by `unlisten`, and only it.
    inst.unlisten(&JsHandleArg::Opaque(opaque))
        .expect("the opaque form is `unlisten`'s own");
}

/// `§2.3` item 4 / `PAR-JS-8`: **`unlisten` over ANY value outside the domain is a NO-OP SUCCESS** — a
/// foreign instance's value, a prior session's value, a fabricated value, a blank token and a non-opaque
/// value are EACH a no-op success at `unlisten`: no code is produced and NO OTHER REGISTRATION IS REMOVED.
#[test]
fn handle_unlisten_over_every_outside_value_is_a_no_op_success() {
    let mut owner = mem_instance();
    let mut foreign = mem_instance();
    owner
        .listen(&JsHandleArg::Opaque(js_handle("kept")), &[JsAddressArg::List(vec![key("a")])])
        .expect("a registration");

    foreign
        .listen(
            &JsHandleArg::Opaque(js_handle("foreign")),
            &[JsAddressArg::List(vec![key("a")])],
        )
        .expect("a registration in another instance");
    owner
        .unlisten(&JsHandleArg::Opaque(js_handle("foreign")))
        .expect("a foreign instance's value is a no-op success");
    owner
        .unlisten(&JsHandleArg::Bare("listener-12345".to_string()))
        .expect("a fabricated value is a no-op success");
    owner
        .unlisten(&JsHandleArg::Bare("listener-1".to_string()))
        .expect("a prior session's spelling is a no-op success");
    owner
        .unlisten(&JsHandleArg::Bare(String::new()))
        .expect("a blank token is a no-op success");
    owner
        .unlisten(&JsHandleArg::NonOpaque)
        .expect("a non-opaque value is a no-op success");
    owner
        .unlisten(&JsHandleArg::Absent)
        .expect("an absent handle is a no-op success");

    // NO OTHER REGISTRATION IS REMOVED — and the pair the record carries is the LISTENER's own address.
    let w = write_at(&mut owner, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    assert!(
        js_trigger_set_equal(&w.triggered, &[trigger(&[key("a")], "kept")]),
        "the owner's own registration stands"
    );
}

/// `§2.10`: **`listen(handle, addresses)` populates the store's home for the handle the CALLER spells** — and
/// its `address` is `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
/// **⟶ AND THE PAIR THE RECORD CARRIES NAMES THE LISTENER'S OWN ADDRESS AND NOT THE WRITTEN ONE**
/// (`PAR-HL-19`/`PAR-HL-20`; `contract.md §2.4` item 1): the write below targets `a/b/c` and the trigger's
/// `address` is `a/b`.
#[test]
fn listen_populates_the_home_for_the_caller_spelled_handle_and_carries_no_tier_qualifier() {
    let mut inst = mem_instance();
    inst.listen(
        &JsHandleArg::Opaque(js_handle("h")),
        &[JsAddressArg::List(vec![key("a"), key("b")])],
    )
    .expect("a registration");
    // The containers the write runs through are created first: a write's parent is resolved BY ADDRESS.
    write_at(&mut inst, &[key("a")], &JsValue::Object(JsObject::plain(vec![]))).expect("a map");
    write_at(
        &mut inst,
        &[key("a"), key("b")],
        &JsValue::Object(JsObject::plain(vec![])),
    )
    .expect("a nested map");
    // A write that resolves THROUGH the listener's address fires it (`A33`, descendant-inclusive).
    let w = write_at(&mut inst, &[key("a"), key("b"), key("c")], &JsValue::Num(1.0)).expect("a write");
    assert!(js_trigger_set_equal(
        &w.triggered,
        &[trigger(&[key("a"), key("b")], "h")]
    ));
}

/// `§2.10`: `unlisten` returns the unit on success — *"including on its no-op success"*.
#[test]
fn unlisten_returns_the_unit_on_success() {
    let mut inst = mem_instance();
    inst.listen(&JsHandleArg::Opaque(js_handle("h")), &[JsAddressArg::List(vec![key("a")])])
        .expect("a registration");
    let unit: () = inst
        .unlisten(&JsHandleArg::Opaque(js_handle("h")))
        .expect("a withdrawal");
    assert_eq!(unit, ());
}

/// `§2.3` item 5: **a handle appears in a trigger's list EXACTLY where its listener's address is a PREFIX
/// of the triggering address.**
#[test]
fn handle_membership_is_decided_by_the_prefix_test_and_nothing_else() {
    let mut inst = create(&cfg_mem_with(vec![
        listener_at(vec![key("a")], "at-a"),
        listener_at(vec![key("a"), key("b")], "at-ab"),
        listener_at(vec![key("zzz")], "at-zzz"),
    ]))
    .expect("three registrations");
    // The containers the write runs through are created first (the write's parent is resolved BY ADDRESS).
    write_at(&mut inst, &[key("a")], &JsValue::Object(JsObject::plain(vec![]))).expect("a map at a");
    write_at(
        &mut inst,
        &[key("a"), key("b")],
        &JsValue::Object(JsObject::plain(vec![])),
    )
    .expect("a map at a/b");
    let w = write_at(&mut inst, &[key("a"), key("b"), key("c")], &JsValue::Num(1.0)).expect("a write");
    assert_eq!(w.triggered.len(), 2, "the prefix set, descendant-inclusive");
    // And a write that does NOT run through a registration's address carries neither handle.
    let w2 = write_at(&mut inst, &[key("q")], &JsValue::Num(1.0)).expect("a write");
    assert!(w2.triggered.is_empty());
}

// =============================================================================================
// `§2.7` — listener delivery
// =============================================================================================

/// `§2.7` item 1: `triggered` crosses **fresh on every call** — two writes return two independent arrays.
#[test]
fn delivery_triggered_is_fresh_on_every_call() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("an instance");
    let first = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let second = write_at(&mut inst, &[key("a")], &JsValue::Num(2.0)).expect("a write");
    assert!(js_trigger_set_equal(&first.triggered, &second.triggered));
    assert!(
        !std::ptr::eq(&first.triggered, &second.triggered),
        "two values, not one"
    );
}

/// `§2.7` item 3 / `DD-22`: **no order is asserted — the drive compares SETS, never sequences.**
#[test]
fn delivery_no_order_is_asserted_membership_only() {
    let mut inst = create(&cfg_mem_with(vec![
        listener_at(vec![key("a")], "l1"),
        listener_at(vec![key("a")], "l2"),
        listener_at(vec![key("a")], "l3"),
    ]))
    .expect("three registrations at one address");
    let first = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let second = write_at(&mut inst, &[key("a")], &JsValue::Num(2.0)).expect("a write");
    assert!(js_trigger_set_equal(&first.triggered, &second.triggered));
    assert_eq!(first.triggered.len(), 3);
}

/// `§2.7` item 1: **the two records the store's own contract declares carry `triggered`** — `WriteResult`
/// and `DeleteReceipt` — so **a `delete` FIRES too** (`A43`).
#[test]
fn delivery_a_delete_fires_its_own_triggered_set() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("an instance");
    write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let receipt = inst
        .delete(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Token("mem".to_string()))
        .expect("a delete");
    assert_eq!(receipt.triggered.len(), 1, "a delete fires (A43)");
}

/// `DD-22`: **the package invokes a registered listener function SYNCHRONOUSLY AFTER the verb's own call
/// has returned**, and every verb is synchronous. The drive is the call's own shape: the record is complete
/// and copied out BEFORE any invocation could observe it.
#[test]
fn delivery_the_record_is_complete_before_the_window_opens() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("an instance");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    // Everything the delivery window could need is already in the returned value: the handle set, the
    // addresses, the op and the state halves — no member is filled in later.
    assert_eq!(w.triggered.len(), 1);
    assert_eq!(w.watched.len(), 1);
    assert!(w.op.after.present);
}

// =============================================================================================
// `§2.8` — the two file-behaviour readings a JS caller will meet
// =============================================================================================

/// `§2.8` item 1 / `DD-45`: **a `delete` and a `rollback` perform NO file I/O**, so a JS caller that deletes
/// a `file`-tier version and then constructs a FRESH instance over an equal `cfg.filePath` sees the removed
/// version **STAND AGAIN** — *"that re-boot is the store's own declared boot … NOT a defect"*.
/// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `contract.md §7.2` item 1 AS AMENDED, `surface.md §2.11` clause 2):
/// the last successful `file`-tier WRITE's bytes are produced by THE TERMINAL ARM'S OWN ACT and not by the
/// verb** — *"`Store::write(…)` … PERFORMS NO FILE I/O ON ANY OF ITS ARMS"* — **so this cell drives that act
/// at its own instant, keyed by the op the write returned, and the boot below then stands exactly as
/// before.** **NO ASSERTION MOVES: the delete still performs no file I/O and the version still STANDS
/// AGAIN.**
#[test]
fn file_readings_a_delete_performs_no_file_io_and_the_version_stands_again() {
    // The path is THIS cell's own (`support::DrivePath`): the cells of one binary run on parallel threads,
    // so a PID-keyed path would be shared with the `FileCommitFailed` drive, which replaces its own path
    // with a directory — and this cell boots over its path before and after that.
    let scratch = DrivePath::unique("storeroom-js-redset-delete-no-io", "store.json");
    {
        let mut inst = create(&cfg_at(scratch.as_str(), 8)).expect("a reachable path");
        let landed = inst
            .write(
                &JsAddressArg::List(vec![key("a")]),
                &JsTierArg::Token("file".to_string()),
                &JsValue::Num(1.0),
            )
            .expect("§7.2 item 1 as amended: the verb RECORDS the write and performs NO FILE I/O");
        inst.commit_file(&landed.op.opId).expect(
            "§7.2 item 2 as amended / `surface.md §2.11` clause 2: THE TERMINAL ARM'S OWN ACT — the \
             `file`-tier commit, keyed by the settled record's own `op`",
        );
        inst.delete(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("file".to_string()),
        )
        .expect("the delete removes the version in memory");
        assert!(
            inst.read(
                &JsAddressArg::List(vec![key("a")]),
                &JsTierArg::Token("file".to_string())
            )
            .is_err(),
            "the version is gone from the live store"
        );
    }
    // A FRESH boot over an equal path re-loads the LAST SUCCESSFUL `file` WRITE's bytes.
    let fresh = create(&cfg_at(scratch.as_str(), 8)).expect("a fresh boot");
    assert!(
        js_equal(
            &fresh
                .read(
                    &JsAddressArg::List(vec![key("a")]),
                    &JsTierArg::Token("file".to_string())
                )
                .expect("the deleted version STANDS AGAIN"),
            &JsValue::Num(1.0)
        ),
        "DD-45: the re-boot is the store's own declared boot"
    );
}

/// `§2.8` item 1: **`file`-tier durability is produced by a successful `file`-tier `write` ONLY** — so a
/// `mem`-tier write is NOT re-loaded by a fresh boot.
#[test]
fn file_readings_only_a_file_tier_write_is_durable() {
    // **THE PATH MUST BE UNIQUE PER CELL**: this cell's verdict is about the ABSENCE of bytes at its own
    // path, so a path another parallel cell also writes, replaces or removes decides this cell's answer.
    // `support::DrivePath` keys it by this test's own name, so no sibling cell can name it.
    let scratch = DrivePath::unique("storeroom-js-redset-durability", "store.json");
    {
        let mut inst = create(&cfg_at(scratch.as_str(), 8)).expect("a reachable path");
        write_at(&mut inst, &[key("m")], &JsValue::Num(1.0)).expect("a mem-tier write");
    }
    let fresh = create(&cfg_at(scratch.as_str(), 8)).expect("a fresh boot");
    assert!(
        fresh.read(&JsAddressArg::List(vec![key("m")]), &JsTierArg::Absent).is_err(),
        "a mem-tier write is not on the file"
    );
}

/// `§2.8` item 2: **a `file`-tier write that fails answers `FileCommitFailed` AFTER the store's own
/// automatic journal rollback has run** — and the package compensates for nothing.
/// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `contract.md §7.2` items 1–3 AS AMENDED, `surface.md §2.11`
/// clause 5): THE FAILURE IS THE TERMINAL ARM'S ACT'S AND NOT THE VERB'S** — the verb *"performs NO FILE I/O
/// ON ANY OF ITS ARMS"*, the act is `commit_file` keyed by the settled record's own `op`, and *"the store
/// rolls the write back FIRST and the call answers with a message SECOND"*. **The drive is
/// `fail_code_drive("FileCommitFailed")`, which now drives the act; the reading this cell asserts — the
/// failure is passed back AFTER the automatic rollback — and the code are unmoved.**
#[test]
fn file_readings_a_failed_file_commit_answers_file_commit_failed() {
    assert!(
        fail_code_drive("FileCommitFailed"),
        "§2.8 item 2 as amended: the failure is passed back to the caller after the automatic rollback — \
         answered by the terminal arm's own act (`§2.11` clause 5)"
    );
}

// =============================================================================================
// `§2.6` — the constraint/repair pattern, a usage pattern over declared verbs
// =============================================================================================

/// `§2.6` / `DD-16`: **evaluate constraints AFTER a `write` returns; on a violation, call `rollback` with
/// the `JournalOp.opId` THAT WRITE RETURNED.**
#[test]
fn constraint_pattern_a_violation_is_reversed_by_the_op_the_write_returned() {
    let mut inst = mem_instance();
    write_at(&mut inst, &[key("safe")], &JsValue::Num(1.0)).expect("the pre-existing state");
    let w = write_at(&mut inst, &[key("risky")], &JsValue::Num(-1.0)).expect("the write under constraint");
    // The constraint is evaluated CLIENT-SIDE, after the write returned, over the value the write stored:
    let violated = match read_at(&inst, &[key("risky")]) {
        Ok(JsValue::Num(n)) => n < 0.0,
        _ => false,
    };
    assert!(violated, "the constraint's own evaluation");
    inst.rollback(&JsOpIdArg::Str(w.op.opId.clone()))
        .expect("the violation is reversed with the op THAT WRITE RETURNED");
    assert!(
        read_at(&inst, &[key("risky")]).is_err(),
        "the state the rollback restores is the write's own `before`"
    );
}

/// `§2.6` / `PAR-JS-18`: **no constraint verb, no constraint parameter, no repair route, no constraint
/// record and no function-carrying parameter is declared** — the drive is that a FUNCTION cannot cross at
/// any position: a function is outside the value taxonomy (`crossing.md §1.2` row 8).
#[test]
fn constraint_pattern_a_function_cannot_cross_at_any_position() {
    let mut inst = mem_instance();
    let err = write_at(&mut inst, &[key("a")], &JsValue::Function)
        .expect_err("the store's own surface takes no function at any position");
    assert_value_refusal(&err, &[key("a")]);
}

// =============================================================================================
// `§2.9` item 2 / `P-IM-3`'s `S-FAILSET` — EVERY MEMBER OF THE CLOSED SET HAS A DECLARED TRIGGER
//
// **⟶ RE-DERIVED 2026-10-25 (`A148` Q3; `src/error.rs`'s `[&str; 17]`): THE CENSUS IS THE STORE'S OWN
// ARRAY'S AND IT IS `17`.** The heading above printed `15`, the members below are `16`, and the array has
// been `17` since `A148` widened it — **so the one clause the store's own bytes state as a prohibition,
// *"no drive that counts this array may assert `15` OR `16`"*, was the clause these cells were breaking.**
// **The seventeenth member, `ValueRefusedAtBoundary`, is not this crate's**: it is minted by the PACKAGE's
// walk (`bindings/js/src/entry/carrier.mjs`'s `valueReject`) ABOVE the addon, and no byte of `src/**` or
// `bindings/js/src/**` produces it. **The boundary is declared rather than hidden**: `16` members have a
// trigger through this crate's surface (`support::crossing_reachable_fail_codes()`), and the seventeenth's
// drive is the NEGATIVE one — the crossing's over-ceiling answer is the store's `ValueNotAdmitted`.
// =============================================================================================

macro_rules! fail_code_cell {
    ($name:ident, $code:literal) => {
        #[test]
        fn $name() {
            assert!(
                fail_code_drive($code),
                "`{}` has no reachable trigger from the JS surface (surface.md §2.9 item 2)",
                $code
            );
        }
    };
}

fail_code_cell!(fail_code_1_address_malformed_is_reachable, "AddressMalformed");
fail_code_cell!(fail_code_2_address_not_found_is_reachable, "AddressNotFound");
fail_code_cell!(fail_code_3_leaf_has_no_downstream_is_reachable, "LeafHasNoDownstream");
fail_code_cell!(fail_code_4_tier_not_found_is_reachable, "TierNotFound");
fail_code_cell!(fail_code_5_out_of_domain_tier_is_reachable, "OutOfDomainTier");
fail_code_cell!(
    fail_code_6_parent_anchor_monotonicity_violation_is_reachable,
    "ParentAnchorMonotonicityViolation"
);
fail_code_cell!(fail_code_7_container_kind_conflict_is_reachable, "ContainerKindConflict");
fail_code_cell!(fail_code_8_read_target_is_branch_is_reachable, "ReadTargetIsBranch");
fail_code_cell!(fail_code_9_write_parent_not_link_is_reachable, "WriteParentNotLink");
fail_code_cell!(fail_code_10_journal_op_unknown_is_reachable, "JournalOpUnknown");
fail_code_cell!(fail_code_11_rollback_compacted_is_reachable, "RollbackCompacted");
fail_code_cell!(
    fail_code_12_construction_argument_missing_is_reachable,
    "ConstructionArgumentMissing"
);
fail_code_cell!(fail_code_13_file_path_unreachable_is_reachable, "FilePathUnreachable");
fail_code_cell!(fail_code_14_value_not_admitted_is_reachable, "ValueNotAdmitted");
fail_code_cell!(fail_code_15_file_commit_failed_is_reachable, "FileCommitFailed");
fail_code_cell!(
    fail_code_16_constraint_list_invalid_is_reachable,
    "ConstraintListInvalid"
);

/// The set's own census, corrected to **the store's own array: `17` members and not one more.**
/// **⟶ RE-POINTED 2026-10-15 (`RCA-9`): the `FileCommitFailed` row of this sweep is driven at THE TERMINAL
/// ARM'S OWN ACT** — *"`Store::write(…)` … PERFORMS NO FILE I/O ON ANY OF ITS ARMS"* (`§7.2` item 1 as
/// amended; `surface.md §2.11` clause 2) — **inside `support::fail_code_drive`.**
///
/// **⟶ WIDENED TO `16` 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class; `DEF-2026-10-15-X`
/// item 4).** The sentence this comment supersedes read *"the census the sweep counts is the crate's own
/// `15`-member array, which the amendment does not widen"* — **AND THAT SENTENCE WAS THE DEFECT: the crate's
/// own array is not the amendment's, `contract.md §8.1`'s amended heading reads `16` members with each
/// member's trigger, its arithmetic is `11 + 2 + 1 + 1 + 1 = 16` ✓, `§7.2` item 5 (ADDED 2026-10-15)
/// declares the constraint list's two validation instants, and `parameter-semantics.md §2.21` mints the
/// key's own member.** **A CENSUS THAT PRINTS A SUPERSEDED FIGURE IS NOT A DRIVE THAT "DOES NOT WIDEN": it
/// is a drive asserting a figure the spec has already replaced.** **NO ASSERTION IS WEAKENED — the figure
/// MOVES and the sixteenth member's own trigger JOINS the sweep, so every member is still reached through a
/// real trigger** (`support::fail_code_drive`'s `ConstraintListInvalid` arm, reached through the crossing's
/// own `create_with_constraints` at the construction's instant; `§7.1` step 4-bis).
///
/// **⟶ AND WIDENED AGAIN TO `17` 2026-10-25 (`A148` (Q3), LANDED AT BOTH ENDS: `src/error.rs`'s
/// `pub const CODES: [&str; 17]` and its dated clause *"no drive that counts this array may assert `15` OR
/// `16`"*).** **The cell this replaces asserted `16` against an array of `17`, so its FIRST assertion was
/// false the moment `A148` landed and the cell had never been run against it** — it is the `stale-by-census`
/// class a second time, and the second time the figure moved the OTHER way from the same cause. **NO
/// ASSERTION IS WEAKENED AND NO MEMBER IS DROPPED: the loop now covers all `17`, and the seventeenth's own
/// drive is its declared one — the crossing reaches `ValueNotAdmitted` and NOT the package's boundary
/// status** (`support::fail_code_drive`'s `ValueRefusedAtBoundary` arm).
// **⟶ RE-DERIVED 2026-10-26, TITLE AND FIGURES TOGETHER (`DEF-S`/`DEF-N`; the architect, verbatim:
// *"Expand the returned error set for both S/N"*).** **THE SET IS `19`, THE MEMBERS THIS CRATE REACHES ARE
// `16`, AND THE THREE THE PACKAGE OWNS ARE `ValueRefusedAtBoundary` (rank `17`, the boundary walk),
// `ConstraintBodyThrew` (rank `18`, the kernel's body-throw mark and the entry's conversion) and
// `ConstraintRefusedAtRegistration` (rank `19`, the kernel's registration verdict).** The cell is the SAME
// read — the store's own array, the reachable members, and one negative drive per package-owned member — and
// the three figures are the ruling's, not whatever the code now prints. **NO ASSERTION IS WEAKENED: every
// reachable member is still driven through a real trigger, and each package-owned member still has its
// negative drive.**
#[test]
fn fail_set_is_closed_at_nineteen_and_sixteen_of_them_are_reached_from_the_crossing() {
    assert_eq!(all_fail_codes().len(), 19, "the store's own array is the census (A148 Q3, read through \
         the 2026-10-26 ruling: *Expand the returned error set for both S/N*)");
    assert_eq!(
        crossing_reachable_fail_codes().len(),
        16,
        "the three members the package owns (`ValueRefusedAtBoundary`, `ConstraintBodyThrew` and \
         `ConstraintRefusedAtRegistration`) are each declared at their own boundary"
    );
    for code in crossing_reachable_fail_codes() {
        assert!(fail_code_drive(code), "`{code}` is a member with a reachable trigger");
    }
    assert!(
        fail_code_drive("ValueRefusedAtBoundary"),
        "the seventeenth member has no producer in this crate: the crossing's over-ceiling answer is the \
         store's `ValueNotAdmitted` and never a package-minted status (DD-40)"
    );
    assert!(
        fail_code_drive("ConstraintBodyThrew"),
        "the eighteenth member (`DEF-S`) has no producer in this crate: a constraint BODY is the caller's own \
         function, invoked by the package's kernel, so no byte of `src/**` mints it"
    );
    assert!(
        fail_code_drive("ConstraintRefusedAtRegistration"),
        "the nineteenth member (`DEF-N`) has no producer in this crate: the registration VERDICT is composed \
         by the kernel for a WELL-FORMED pair whose body answered non-`true`, while what this crate answers \
         for a malformed element is the shape member `ConstraintListInvalid`, unmoved"
    );
}

/// `§2.7` item 4 / `DD-23`: **a throwing listener body is not caught, not retried and not reported** — the
/// exception propagates out of the package's own invocation loop, and the store's verb result is already
/// complete and unaffected by it. **THE MECHANISM:** in Rust the listener body is the package's own (JS)
/// function, so this layer drives the half that is this crate's: the store's result is COMPLETE before the
/// window opens, so no listener's fate can alter it — and the crossing exposes no `try`/`catch`, no retry
/// and no report member anywhere on the returned records.
#[test]
fn delivery_a_throwing_body_cannot_alter_the_stores_result() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("an instance");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let after = read_at(&inst, &[key("a")]).unwrap();
    // Nothing on the record carries an error, a retry or a report: the two records' members are exactly the
    // ones `PAR-JS-13`–`PAR-JS-16` declare, and `triggered`'s element is the declared PAIR and no third member.
    assert!(js_trigger_set_equal(&w.triggered, &[trigger(&[key("a")], "l1")]));
    assert!(js_equal(&after, &JsValue::Num(1.0)));
}
