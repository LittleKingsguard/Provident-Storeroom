//! `tests/journal_and_rollback.rs` — contract `§6` (`write-and-read.md §6`): what the journal is and what
//! it tracks, its entry-formation rule and its bounded length with the compression trigger, the `JournalOp`
//! and `BaseState` shapes, the `rollback` verb with its reach/scope/floor/direction/residue (`M-5`…`M-11`),
//! and the journal's own closed surface.
//!
//! States enumerated for this concern, each driven below: one successful write; one failed write; a delete
//! that removed a version; a delete that removed nothing; an un-compacted scope; a scope containing a
//! compacted entry; an unknown op id; a foreign instance's op id; a blank/non-string op id; a rollback
//! that is total over its scope; a rollback's own residue; the journal's non-addressability.

mod support;
use support::*;

// §6.1 item 1 + §6.2 — one entry per SUCCESSFUL `write`, and its `seq` is the entry's append ordinal,
// strictly increasing from 1.
// Drives: §6.1 item 1, §6.2
#[test]
fn s6_1_one_entry_per_successful_write() {
    let mut store = new_store();
    let a = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let b = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    let c = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    assert_eq!(
        (a.op.seq, b.op.seq, c.op.seq),
        (1, 2, 3),
        "§6.2: strictly increasing from 1"
    );
}

// §6.1 item 1 — one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE VERSION. A delete returns no
// op, so the entry is observed through the rollback's scope: the delete's entry lies in the subtree of the
// earlier write's address and is undone with it (`M-5`), which restores what the delete removed.
// Drives: §6.1 item 1
#[test]
fn s6_1_a_delete_that_removed_a_version_appends_an_entry_in_the_same_subtree() {
    let mut store = new_store();
    let w = ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.delete(AddressArg::List(key(&["a", "b"])), none()),
        "§6.1 item 1: one entry per successful delete",
    );
    let undone = ok(store.rollback(OpIdArg::Id(w.op.opId.clone())), "§6.4 M-5");
    assert_eq!(
        undone.undoneOps.len(),
        2,
        "§6.1 item 1: the delete's entry is in the write's subtree"
    );
    assert_eq!(
        undone.undoneOps[1], w.op.opId,
        "§6.4 M-7: the walk goes newest-first, so the write's own id is the OLDER of the two"
    );
    assert_ne!(
        undone.undoneOps[0], w.op.opId,
        "§6.1 item 1: the newer entry is the delete's, and a delete returns no op"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§6.4 M-5",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§6.4 M-5: both in-scope operations were undone, newest first",
    );
}

// §6.1 item 1 — a delete that removed nothing (`D-3`) appends NO entry: the rollback's undone set holds
// exactly the write's own entry.
// Drives: §6.1 item 1
#[test]
fn s6_1_a_delete_that_removed_nothing_appends_no_entry() {
    let mut store = new_store();
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-3",
    );
    let undone = ok(store.rollback(OpIdArg::Id(w.op.opId.clone())), "§6.4 M-5");
    assert_eq!(
        undone.undoneOps,
        vec![w.op.opId],
        "§6.1 item 1: a delete that removed nothing appends no entry"
    );
}

// §6.2 — the op's record shape carries every declared member, and `BaseState`'s `present` half records
// whether the pre-state existed at all.
// Drives: §6.2
#[test]
fn s6_2_the_op_carries_every_declared_member_and_both_state_halves() {
    let mut store = new_store();
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    assert!(
        !w.op.opId.is_empty(),
        "§6.2: a non-empty, store-unique string token"
    );
    assert_eq!(
        w.op.kind,
        JournalOpKind::Write,
        "§6.2 property 4: `'write' | 'delete'`"
    );
    assert_eq!(
        w.op.address,
        key(&["a"]),
        "§6.2: the address the verb was called with, VERBATIM"
    );
    assert_eq!(w.op.tier, Some(Tier::Mem), "§6.2: the write's single tier");
    assert!(
        !w.op.before.present,
        "§6.2: `present: false` = the pre-state was absent"
    );
    assert!(w.op.after.present, "§6.2: the current-state half");
    assert_eq!(
        w.op.after.value,
        v_str("v"),
        "§6.2 property 2: `resolve(op.after, currentJournal)`"
    );
    assert_eq!(w.op.seq, 1, "§6.2: strictly increasing from 1");
    assert!(
        !w.op.compacted,
        "§6.2: true once compressed into the base state"
    );
}

// §6.2 property 2 — `resolve(op.after, currentJournal)` yields the state the store is in NOW at
// `op.address`: the read at that address agrees with `op.after.value`.
// Drives: §6.2 property 2
#[test]
fn s6_2_the_after_half_agrees_with_the_current_read() {
    let mut store = new_store();
    let value = v_obj(&[("k", v_arr(vec![v_num(1.0), v_bool(false)]))]);
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), value.clone()),
        "§3.4 W-4",
    );
    assert_eq!(w.op.after.value, value, "§6.2 property 2");
    assert_eq!(
        read_at(&store, &key(&["a"])),
        w.op.after.value,
        "§6.2 property 2: the current state agrees"
    );
}

// §6.2 property 1 — `reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach, and the
// rollback is the instrument that produces it. **THE SCOPE IS THE CONTRACT'S, AND IT IS TOTAL OVER IT:**
// `§6.4` `M-5`/`M-8` (`DD-20`) undo EVERY operation touching the SAME subtree and offer no partial
// rollback, and `§6.4` item 1 / `DD-21` measure that subtree against the WRITTEN ADDRESS's own subtree —
// an entry is in scope iff `op.address` is a PREFIX of its address (itself or a descendant), at any tier.
// So this drive rolls back an operation at a DESCENDANT address and the prefix test does NOT reach
// upward: the older write at `["a"]` is OUT of scope (`§6.4` item 1, `A35`, `DD-21`), the named op is the
// only entry undone, and its `before` half is what stands at the addressed node afterwards. Driving two
// writes at ONE address instead would put both entries in scope and make the rollback total over them —
// the state `s6_3_restored_to_is_the_state_the_addressed_subtree_now_stands_at` and `s6_4_m8` drive — so
// the two shapes are the two halves of the one scope rule, not two claims about it.
// Drives: §6.2 property 1, §6.4 M-5, §6.4 item 1 / DD-21, §6.4 M-8 / DD-20
#[test]
fn s6_2_the_before_half_reconstructs_the_original_tree() {
    let mut store = new_store();
    let original = v_obj(&[("b", v_num(1.0))]);
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), original.clone()),
        "§3.4 W-4",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    assert!(
        second.op.before.present,
        "§6.2: the pre-operation value of the addressed node's own version — the ORIGINAL-STATE half"
    );
    assert_eq!(
        second.op.before.value,
        v_num(1.0),
        "§6.2: `before` carries the value the operation replaced at the addressed node"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(2.0),
        "§3.4 W-1: the second write landed at the addressed node"
    );
    let r = ok(
        store.rollback(OpIdArg::Id(second.op.opId.clone())),
        "§6.4 M-5",
    );
    assert_eq!(
        r.undoneOps,
        vec![second.op.opId.clone()],
        "§6.4 item 1 / DD-21: the scope is the written address's OWN subtree — the prefix test reaches \
         the addressed entry and its descendants, and NOT the older entry at [\"a\"] above it"
    );
    assert!(
        r.restoredTo.present,
        "§6.3: the state the addressed subtree now stands at is the one the undo restored"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(1.0),
        "§6.2 property 1: `reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        original,
        "§6.2 property 1: the original tree stands again, and the out-of-scope write above it survives"
    );
}

// §6.2 property 3 — `op.opId` is a non-empty string, unique within the instance.
#[test]
fn s6_2_op_ids_are_unique_within_the_instance() {
    let mut store = new_store();
    let mut ids: Vec<String> = Vec::new();
    for i in 0..12 {
        let w = ok(
            store.write(AddressArg::List(key(&["k"])), w_mem(), v_num(i as f64)),
            "§3.4 W-1",
        );
        assert!(!w.op.opId.is_empty(), "§6.2 property 3: a non-empty string");
        assert!(
            !ids.contains(&w.op.opId),
            "§6.2 property 3: unique within the instance"
        );
        ids.push(w.op.opId);
    }
}

// §6.3 — `rollback(op: string)` echoes the id the caller passed and reports the op ids it undid in
// REVERSE append order (newest first).
// Drives: §6.3
#[test]
fn s6_3_rollback_echoes_the_op_id_and_orders_undone_ops_newest_first() {
    let mut store = new_store();
    let a = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let b = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    let c = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    let r: RollbackResult = ok(store.rollback(OpIdArg::Id(a.op.opId.clone())), "§6.3");
    assert_eq!(r.opId, a.op.opId, "§6.3: the id the caller passed, echoed");
    assert_eq!(
        r.undoneOps,
        vec![c.op.opId.clone(), b.op.opId.clone(), a.op.opId.clone()],
        "§6.3: in REVERSE append order (newest first)"
    );
}

// §6.3 — `restoredTo` is the state the addressed subtree now stands at: after undoing every version ever
// written at that address, the address holds nothing.
// Drives: §6.3
#[test]
fn s6_3_restored_to_is_the_state_the_addressed_subtree_now_stands_at() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    let r = ok(store.rollback(OpIdArg::Id(second.op.opId.clone())), "§6.3");
    assert!(
        !r.restoredTo.present,
        "§6.3: the state the addressed subtree now stands at is ABSENT"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§6.4 M-5",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§6.3: both versions were undone, so the address holds nothing",
    );
}

// §6.4 M-5 (P: §15 · A35) — a rollback undoes EVERY operation touching the SAME subtree: not the last op
// alone, and not the failing op's own ops alone; and the scope is measured against the written address's
// own subtree, so an unrelated address is untouched.
// Drives: §6.4 M-5 (P, §15 · A35)
#[test]
fn s6_4_m5_a_rollback_undoes_every_operation_touching_the_same_subtree() {
    let mut store = new_store();
    let root = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let child = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_str("unrelated")),
        "§3.4 W-3",
    );
    let r = ok(
        store.rollback(OpIdArg::Id(root.op.opId.clone())),
        "§6.4 M-5",
    );
    assert_eq!(
        r.undoneOps,
        vec![child.op.opId, root.op.opId],
        "§6.4 M-5: every operation in the subtree"
    );
    assert_eq!(
        read_at(&store, &key(&["x"])),
        v_str("unrelated"),
        "§0.2 DD-21: not a store-wide rollback"
    );
}

// §6.4 M-5 + §0.2 DD-21 — the scope is measured at ANY tier: two operations at one address at two
// different tiers are both in scope.
// Drives: §6.4 M-5, §0.2 DD-21
#[test]
fn s6_4_m5_the_scope_reaches_every_tier_at_the_address() {
    let mut store = new_store();
    let durable = ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3 at file",
    );
    let trial = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5 at mem",
    );
    let r = ok(
        store.rollback(OpIdArg::Id(durable.op.opId.clone())),
        "§6.4 M-5 / DD-21",
    );
    assert_eq!(
        r.undoneOps,
        vec![trial.op.opId, durable.op.opId],
        "§0.2 DD-21: at ANY tier"
    );
}

// §6.4 M-8 — a rollback is TOTAL over its scope: no partial or subset rollback is available, so undoing
// the oldest operation undoes every later in-scope operation with it.
// Drives: §6.4 M-8
#[test]
fn s6_4_m8_a_rollback_is_total_over_its_scope() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    let r = ok(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-8",
    );
    assert_eq!(
        r.undoneOps.len(),
        3,
        "§0.2 DD-20: it undoes EVERY un-compacted operation in scope"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§6.4 M-8",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§6.4 M-8: no partial rollback is available",
    );
}

// §6.4 M-6 + §6.1 item 5 (`M-4`) — an entry old enough to be COMPACTED is OUT OF SCOPE: a rollback whose
// scope includes a compacted entry fails RollbackCompacted and undoes NOTHING.
// Drives: §6.4 M-6, §6.1 item 5 (
#[test]
fn s6_4_m6_a_rollback_over_a_compacted_scope_fails_and_undoes_nothing() {
    let mut store = new_store_with_journal(1);
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1: the append compresses the oldest",
    );
    let e = failure(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-6",
    );
    assert_code(
        &e,
        "RollbackCompacted",
        "§6.1 item 5 `M-4`: a rollback may NOT walk past a compressed base",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(2.0),
        "§6.4 M-6: it undoes NOTHING"
    );
}

// §6.1 item 5 (`PAR-7`'s observable) + §6.4 M-6 — with `journalLength = n`, after `n + 1` appends the
// OLDEST entries are compacted and at most `n` remain un-compacted: an operation outside the compacted
// entry's subtree still rolls back.
// Drives: §6.1 item 5 (, §6.4 M-6
#[test]
fn s6_1_item5_the_compression_trigger_marks_the_oldest_entries() {
    let mut store = new_store_with_journal(2);
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["c"])), w_mem(), v_num(3.0)),
        "§3.4 W-3: the third append triggers it",
    );
    let e = failure(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.1 item 5: the OLDEST is compacted",
    );
    assert_code(
        &e,
        "RollbackCompacted",
        "§6.1 item 5: the oldest entries are compressed",
    );
    ok(
        store.rollback(OpIdArg::Id(second.op.opId.clone())),
        "§6.1 item 5: at most `n` entries remain un-compacted",
    );
}

// §6.4 M-9 — a rollback ITSELF appends NO journal entry: the next write's `seq` continues the append
// ordinal as though the rollback had not happened.
// Drives: §6.4 M-9
#[test]
fn s6_4_m9_a_rollback_appends_no_journal_entry() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    ok(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-9",
    );
    let next = ok(
        store.write(AddressArg::List(key(&["z"])), w_mem(), v_num(9.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        next.op.seq, 4,
        "§6.4 M-9: the journal records store changes, and a rollback is not one"
    );
}

// §6.4 M-9 — the undone entries are marked `compacted: true` and are no longer in any later walk's scope:
// a second rollback of the same op id fails RollbackCompacted.
// Drives: §6.4 M-9
#[test]
fn s6_4_m9_the_undone_entries_are_out_of_any_later_walk_s_scope() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-9: the entry is undone",
    );
    let e = failure(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-9 + M-6",
    );
    assert_code(
        &e,
        "RollbackCompacted",
        "§6.4 M-9: an undone entry is out of scope for a later walk",
    );
}

// §6.4 M-10 — a rollback is ATOMIC: if it fails, the store is unchanged.
#[test]
fn s6_4_m10_a_failed_rollback_leaves_the_store_unchanged() {
    let mut store = new_store_with_journal(1);
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(2.0))]),
        ),
        "§3.4 W-1",
    );
    let before = read_at(&store, &empty_address());
    failure(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.4 M-10",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        before,
        "§6.4 M-10: if it fails, the store is unchanged"
    );
}

// §6.4 M-11 — an unknown op id fails JournalOpUnknown: a well-formed string the instance's journal does
// not hold.
// Drives: §6.4 M-11
#[test]
fn s6_4_m11_an_unknown_op_id_fails_journal_op_unknown() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.rollback(OpIdArg::Id("no-such-op".into())),
        "§6.4 M-11",
    );
    assert_code(&e, "JournalOpUnknown", "§8.1 #10");
}

// PAR-10's outside list — a FOREIGN instance's op id is a well-formed string this instance's journal does
// not hold: JournalOpUnknown (uniqueness is per instance and per session).
// Drives: § (no clause found)
#[test]
fn par_10_a_foreign_instance_s_op_id_fails_journal_op_unknown() {
    let mut a = new_store();
    let mut b = new_store();
    let w = ok(
        a.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        b.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    let e = failure(
        b.rollback(OpIdArg::Id(w.op.opId.clone())),
        "PAR-10: a foreign instance's id",
    );
    assert_code(
        &e,
        "JournalOpUnknown",
        "PAR-10: the id is not one this instance's journal holds",
    );
    ok(
        a.rollback(OpIdArg::Id(w.op.opId)),
        "PAR-10: the id belongs to its own instance",
    );
}

// PAR-10's outside list — a blank string, a non-string, `null`, `undefined` or an ABSENT op id is a
// malformed identity argument: AddressMalformed.
// Drives: § (no clause found)
#[test]
fn par_10_a_malformed_op_id_fails_address_malformed() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    for arg in [
        OpIdArg::Id(String::new()),
        OpIdArg::Null,
        OpIdArg::Undefined,
        OpIdArg::Absent,
        OpIdArg::NonString(1),
    ] {
        let e = failure(store.rollback(arg), "PAR-10's declared answer");
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-10: a malformed identity argument",
        );
    }
}

// §6.3's NEGATIVE — the journal is not readable, enumerable, addressable or deletable by any other call:
// no `findAddress` path reaches an entry.
// Drives: §6.3
#[test]
fn s6_3_the_journal_is_not_addressable() {
    let mut store = new_store();
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.findAddress(
            AddressArg::List(key(&[w.op.opId.as_str()])),
            TierArg::Absent,
        ),
        "§6.3: no `findAddress` path reaches an entry",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§6.3: the journal is CARRIER-INTERNAL",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("a", v_num(1.0))]),
        "§6.3: the register holds the store's keys and no journal entry"
    );
}

// §7.2 items 3–5 driven at the journal's seam — a `mem`-tier write performs NO file I/O, so a second
// instance booting from the same path does not see it.
// Drives: §7.2 items 3
#[test]
fn s7_2_a_mem_tier_write_never_touches_the_file() {
    let path = fresh_path("mem-no-io");
    let cfg = cfg_at(&path, 8);
    let mut first = ok(storeCreate(&cfg), "§7.1");
    ok(
        first.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let second = ok(
        storeCreate(&cfg),
        "§7.2 item 6: the boot reads the file if it exists",
    );
    let e = failure(
        second.read(AddressArg::List(key(&["a"])), TierArg::Absent),
        "§7.2 item 5",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§7.2 item 5: a `mem`-tier write performs no file I/O",
    );
}
