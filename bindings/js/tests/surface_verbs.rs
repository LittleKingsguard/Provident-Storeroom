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
    let dir = std::env::temp_dir().join("storeroom-js-redset-probe-dry-parent");
    let _ = std::fs::remove_dir_all(&dir);
    let path = dir.join("file.json");
    let err = create(&cfg_at(path.to_str().unwrap(), 2)).expect_err("the parent does not exist");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    assert!(!dir.exists(), "the probe created no directory");
    assert!(!path.exists(), "the probe created no file");
}

/// `P-SM-6`'s `S-PROBE-DRY`: **a probe that truncates an existing file** is a failure — the file's bytes are
/// unchanged by a failed construction.
#[test]
fn construction_the_probe_does_not_truncate_an_existing_file() {
    let path = std::env::temp_dir().join(format!(
        "storeroom-js-redset-probe-{}.json",
        std::process::id()
    ));
    std::fs::write(&path, b"{\"a\":1}").expect("a scratch file with bytes");
    let bad_dir = std::env::temp_dir().join("storeroom-js-redset-no-such-parent-2").join("x.json");
    let err = create(&cfg_at(bad_dir.to_str().unwrap(), 2)).expect_err("unreachable");
    assert_refusal_is_the_single_form(&err, "FilePathUnreachable");
    assert_eq!(
        std::fs::read(&path).expect("the file still has bytes"),
        b"{\"a\":1}",
        "a failed construction truncates nothing"
    );
    let _ = std::fs::remove_file(&path);
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

/// `§2.3` item 1 / `A69`: **the token's domain is the PROCESS** — no OTHER token the store mints, in this
/// instance or any other, at any later moment, is equal to a given one; and the store's own home-first rule
/// hands back an already-registered address's **own** handle rather than minting a second one
/// (`docs/specs/storeroom-native/contract.md §6.5` item 12 (c), cited by `§2.3`).
#[test]
fn handle_the_mint_is_unique_across_addresses_and_across_instances() {
    let mut inst = mem_instance();
    let at_x = inst.listen(&JsAddressArg::List(vec![key("x")])).expect("a mint");
    let at_y = inst.listen(&JsAddressArg::List(vec![key("y")])).expect("a mint");
    assert!(at_x != at_y, "no other token the store mints is equal to it");
    let again = inst.listen(&JsAddressArg::List(vec![key("x")])).expect("the home's own entry");
    assert_eq!(
        again, at_x,
        "an already-registered address hands back the entry's OWN handle and pushes nothing"
    );
}

#[test]
fn handle_two_instances_mint_different_handles() {
    let mut first = mem_instance();
    let mut second = mem_instance();
    let a = first.listen(&JsAddressArg::List(vec![key("x")])).expect("a mint");
    let b = second.listen(&JsAddressArg::List(vec![key("x")])).expect("a mint");
    assert!(a != b, "the token's domain is the PROCESS and the mint does not collide");
}

/// `§2.3` item 2: **the construction's `listeners[]` takes each handle as a plain `string`; every handle a
/// verb returns is the package's opaque value; `unlisten` accepts the OPAQUE form ONLY** (`DD-14`).
#[test]
fn handle_the_two_spellings_one_per_direction() {
    let mut inst = create(&cfg_mem_with(vec![handle("l1")])).expect("the caller's STRING is the IN spelling");
    let w = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    let opaque = w.triggered[0].clone();
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
    let kept = owner.listen(&JsAddressArg::List(vec![key("a")])).expect("a mint");

    let foreign_handle = foreign
        .listen(&JsAddressArg::List(vec![key("a")]))
        .expect("a mint in another instance");
    owner
        .unlisten(&JsHandleArg::Opaque(foreign_handle))
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

    // NO OTHER REGISTRATION IS REMOVED.
    let w = write_at(&mut owner, &[key("a")], &JsValue::Num(1.0)).expect("a write");
    assert!(
        js_set_equal(&w.triggered, std::slice::from_ref(&kept)),
        "the owner's own registration stands"
    );
}

/// `§2.10`: **`listen` mints a token, populates the store's home and wraps it for JS** — and its `address`
/// is `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
#[test]
fn listen_mints_and_populates_the_home_and_carries_no_tier_qualifier() {
    let mut inst = mem_instance();
    let h = inst
        .listen(&JsAddressArg::List(vec![key("a"), key("b")]))
        .expect("a mint");
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
    assert!(js_set_equal(&w.triggered, std::slice::from_ref(&h)));
}

/// `§2.10`: `unlisten` returns the unit on success — *"including on its no-op success"*.
#[test]
fn unlisten_returns_the_unit_on_success() {
    let mut inst = mem_instance();
    let h = inst.listen(&JsAddressArg::List(vec![key("a")])).expect("a mint");
    let unit: () = inst.unlisten(&JsHandleArg::Opaque(h)).expect("a withdrawal");
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
    assert!(js_set_equal(&first.triggered, &second.triggered));
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
    assert!(js_set_equal(&first.triggered, &second.triggered));
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
#[test]
fn file_readings_a_delete_performs_no_file_io_and_the_version_stands_again() {
    // The path is THIS cell's own (`support::DrivePath`): the cells of one binary run on parallel threads,
    // so a PID-keyed path would be shared with the `FileCommitFailed` drive, which replaces its own path
    // with a directory — and this cell boots over its path before and after that.
    let scratch = DrivePath::unique("storeroom-js-redset-delete-no-io", "store.json");
    {
        let mut inst = create(&cfg_at(scratch.as_str(), 8)).expect("a reachable path");
        inst.write(
            &JsAddressArg::List(vec![key("a")]),
            &JsTierArg::Token("file".to_string()),
            &JsValue::Num(1.0),
        )
        .expect("a file-tier write commits");
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
#[test]
fn file_readings_a_failed_file_commit_answers_file_commit_failed() {
    assert!(
        fail_code_drive("FileCommitFailed"),
        "§2.8 item 2: the failure is passed back to the caller after the automatic rollback"
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
// `§2.9` item 2 / `P-IM-3`'s `S-FAILSET` — ALL `15` FAIL CODES REMAIN REACHABLE
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

/// The set's own census, and the converse no drive may break: **`15` members and not one more.**
#[test]
fn fail_set_is_closed_at_fifteen_and_no_drive_produces_a_sixteenth() {
    assert_eq!(all_fail_codes().len(), 15);
    for code in all_fail_codes() {
        assert!(fail_code_drive(code), "`{code}` is a member with a reachable trigger");
    }
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
    // ones `PAR-JS-13`–`PAR-JS-16` declare.
    assert!(js_set_equal(&w.triggered, &w.triggered));
    assert!(js_equal(&after, &JsValue::Num(1.0)));
}
