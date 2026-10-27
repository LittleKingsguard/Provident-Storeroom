//! `tests/journal_and_rollback.rs` — contract `§6` (`write-and-read.md §6`): what the journal is and what
//! it tracks, its entry-formation rule and its bounded length with the compression trigger, the `JournalOp`
//! and `BaseState` shapes, the `rollback` verb with its reach/scope/floor/direction/residue (`M-5`…`M-11`),
//! and the journal's own closed surface.
//!
//! States enumerated for this concern, each driven below: one successful write; one failed write; a delete
//! that removed a version; a delete that removed nothing; an un-compacted scope; a scope containing a
//! compacted entry; an unknown op id; a foreign instance's op id; a blank/non-string op id; a rollback
//! that is total over its scope; a rollback's own residue; the journal's non-addressability.

// `D-5`'s move (`docs/L1/test-stratification.json`): this target stands one level below
// `tests/integration/`, so the store's one scaffolding module is named by `#[path]` rather than by a
// `mod support;` beside it (2026-10-25).
#[path = "../support/mod.rs"]
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
// writes at ONE address would put NEITHER on the far side of `M-5`'s TEMPORAL floor — an entry at the same
// address whose `seq` is ≥ the named op's is in scope — but this drive's older write is OUT of scope by the
// SPATIAL test alone, which is the half `§6.4` item 1 (a)(i) keeps unmoved, so the two shapes are two halves
// of ONE scope rule (amended 2026-10-16, `M-5` (a)(i)+(a)(ii)) and not two claims about it. `s6_4_m8` drives
// the other half: an entry AT the named op's own `seq` IS in scope, which is item 1 (a)(ii)/(b)'s `≥`.
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

// §6.3 + §6.4 item 3 (ii) — `restoredTo` IS THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE
// ROLLBACK — PRESENT OR ABSENT, NEVER AN UNDONE ENTRY'S PRE-STATE.
//
// **⟶ RE-DERIVED 2026-10-16 (THE TEMPORAL STOP; `M-5`'s amended scope). THE SUPERSEDED PREMISE, NAMED SO IT
// CANNOT BE RE-READ: this cell's own comment read *"after undoing every version ever written at that address,
// the address holds nothing"* — the ADDRESS-WIDE reach `write-and-read.md §6.4` item 1's `⟶ AMENDED
// 2026-10-16` clause WITHDREW.** **BOTH ARCHITECT'S RULINGS, VERBATIM: *"Add temporal stop to the rollback."*
// AND *"Overshoot is a defect."*** **The operative scope is item 1's amendment (a): an entry `E` is in scope
// IFF the SPATIAL test holds (`op.address` is a prefix of `E.address`; `DD-21`) **AND** the TEMPORAL test
// holds — `E.seq` ≥ the named op's own `seq` — *"AN ENTRY AT OR AFTER THE NAMED OP, WITHIN ITS SUBTREE, AND
// NOTHING OLDER"* (`≥` NOT `>`).** **So the earlier value at the SAME address STANDS: THE ADDRESS DOES NOT
// HOLD NOTHING, and this cell now asserts what the clause says it holds.**
//
// **THE DECIDING CLAUSE IS §6.4 ITEM 3 (ii) (`write-and-read.md`, and `contract.md §6.4` item 3 (ii) at the
// same bytes): `restoredTo` *"REPORTS THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE ROLLBACK —
// PRESENT OR ABSENT, NEVER AN UNDONE ENTRY'S PRE-STATE"*.** **The window this cell drives is a
// **pre-existing address**, not a fresh one, so §6.4 item 1A (B) — `{present: false}` for a FRESH-ADDRESS
// window — does not decide it; what decides it is that the seed's entry is OUT of the rollback's temporal
// scope (`seq` 1 < the named op's `seq` 2) and is therefore standing when the walk finishes.**
// **`restoredTo` is read here as the record of `read` that item 1A refuses AS THE PROPERTY'S TEST** — on THIS
// window the two readings agree, because the seed's entry was never reached, so no compression and no
// overshoot can be confused with each other.**
//
// **THE OBSERVABLE IS ITEM 1A'S, NOT A PLAIN `read`:** **(A1) `undoneOps` CONTAINS NO `opId` WHOSE ENTRY LIES
// AT OR UNDER THE ROLLED-BACK ADDRESS WITH `seq` < THE NAMED OP'S** — read on EVERY window, floor-met or not;
// **AND (A2) WHERE CALLS RETURNED AND AT LEAST ONE UNDID AN ENTRY AT OR UNDER THAT ADDRESS, THE SEED'S OWN
// `opId` IS ABSENT FROM THE UNION OF THE RETURNED `undoneOps`** — a MEMBERSHIP test over the id the seeding
// write itself returned, never an absence inferred from a value. **The plain `read` below is DRIVEN and
// asserted, exactly as item 1's amendment prints it (*"has found the property when the seed still reads"*),
// but it is (A2)'s SUPPORTING evidence and NOT the discriminating one** (`§6.4` item 1A's own retained-but-
// demoted note): a store that OVERSHOT the temporal floor also leaves the seed reading by compression, so no
// cell may rest on that observation alone.
//
// Drives: §6.3, §6.4 item 1 (M-5, as amended (a)(i)+(a)(ii)), §6.4 item 1A (A1) and (A2), §6.4 item 3 (ii),
//         §6.4 M-7 (the walk stops at the named op), §6.2 property 3 (the id the caller holds)
#[test]
fn s6_3_restored_to_is_the_state_the_addressed_subtree_now_stands_at() {
    let mut store = new_store();
    let seed = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: the seed stands BEFORE the named op, so it is outside the temporal scope",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    // The two `seq`s the scope is measured in, asserted rather than assumed (`§6.2`: strictly increasing
    // from 1) — the temporal test is `E.seq ≥ the named op's seq`, and this cell's whole window is that
    // the seed is strictly older.
    assert_eq!(
        (seed.op.seq, second.op.seq),
        (1, 2),
        "§6.2: the seed's `seq` is the named op's - 1, so `M-5` (a)(ii)'s `E.seq >= floor` excludes it"
    );
    let r = ok(store.rollback(OpIdArg::Id(second.op.opId.clone())), "§6.3");
    // **(A1)** — the performed set names nothing older than the named op, on this window and every window.
    assert_eq!(
        r.undoneOps,
        vec![second.op.opId.clone()],
        "§6.4 item 1A (A1) + M-7: the scope is the named op AT OR AFTER its `seq` (>=, item 1 (a)(ii)/(b)), \
         so the walk stops at the named op and the seed's entry — `seq` 1, older than the floor — is in NO \
         walk; a second member here would be the OVERSHOOT the second ruling names a defect"
    );
    // **(A2)** — a membership test over the id the seeding write itself returned, never an absence inferred
    // from a value.
    assert!(
        !r.undoneOps.contains(&seed.op.opId),
        "§6.4 item 1A (A2): the seed's own `opId` is ABSENT from `undoneOps` — the seed's entry lies at the \
         rolled-back address and its `seq` is below the floor"
    );
    // **§6.4 item 3 (ii)** — `restoredTo` is the state the address ACTUALLY stands at: the seed PRESENT, not
    // the undone entry's pre-state (which was ABSENT).
    assert!(
        r.restoredTo.present,
        "§6.4 item 3 (ii): the addressed subtree STANDS with the seed still there; the undone entry's \
         pre-state was absent and the clause forbids reporting THAT"
    );
    // The plain `read` — item 1's amendment's own words, and (A2)'s supporting evidence only.
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§6.4 item 1 (M-5, as amended): *\"a pre-existing value at the rolled-back op's own address survives \
         the rollback that reverses that op, and the caller finds it where it stood\"* — the seed value, \
         read back"
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




// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// §6.6 — THE JOURNAL MARK RESTORE (`Store::restoreMark`)
//
// **WHAT THIS GROUP PINS, AND THE MEASUREMENT IT WAS WRITTEN FROM.** `restoreMark(mark?)` returns the store
// to the state a JOURNAL MARK describes by REPLAYING THE JOURNAL, and every cell below reads the state back
// through the store's own `read` — per address and PER TIER — because the cross-tier read answers one value
// and cannot tell a `file` version shadowed beneath a `mem` one from a `mem` version alone.
//
// **THE MEASUREMENT THAT DECIDED THE RECORD (`§6.6`'s `Entry::after`).** Before this pass the journal held
// each operation's full BEFORE (`Entry::captured`) and only a READ VIEW of its after (`JournalOp::after` is
// a `BaseState` — `present` plus the value one read answers). The cells below are the ones that could not
// pass on that record: a mixed-depth shadow and a version standing ABOVE its parent's tier both need the
// AFTER as a per-version snapshot, and `restoreMark` reproduces both, so the entry records both halves.
//
// **AND THE REVERSAL DOES NOT ERASE ITS ENTRIES.** `rollback` MARKS the entries it reverses `compacted` and
// does not remove them, so a mark a reversal passes through is still a mark the journal can replay — which
// is why the head mark after a reversal is the PRE-REVERSAL state, and why a mark outside the
// `journalLength` window is still inside the RECORD (`s6_6_a_mark_outside_the_window_is_still_replayable`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/// **THE HEAD MARK AFTER A REVERSAL IS THE PRE-REVERSAL STATE — AND IT IS EXACT AT EVERY TIER.**
///
/// `rollback` appends no entry (`M-9`), so the journal's head still describes the state that stood BEFORE the
/// reversal. A `file`-tier value shadowed beneath a `mem` one is the state the old compensating restore
/// destroyed, and this cell stands it back up at ITS OWN tier and at no other.
#[test]
fn s6_6_the_head_mark_after_a_reversal_is_the_pre_reversal_state() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("base")),
        "§3.4 W-5",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("second")),
        "§3.4 W-1",
    );
    // THE PRE-REVERSAL STANDING, READ PER TIER: `file` `"durable"` shadowed beneath `mem` `"second"`.
    assert_eq!(
        tiers_answering_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Mem],
        "§5.1: the drive must stand the two-tier shadow this cell restores"
    );
    assert_eq!(read_tier(&store, &key(&["a"]), Tier::File), v_str("durable"));
    assert_eq!(read_tier(&store, &key(&["a"]), Tier::Mem), v_str("second"));
    // THE REVERSAL, which leaves the journal's head where it was.
    ok(store.rollback(OpIdArg::Id(second.op.opId.clone())), "§6.3");
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("base"),
        "§6.3: the reversal restores the `mem` version that stood before the second write"
    );
    // THE MARK.
    ok(store.restoreMark(OpIdArg::Absent), "§6.6: the head mark");
    assert_eq!(
        tiers_answering_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Mem],
        "§6.6: BOTH versions stand again — the `file` one the reversal found and the `mem` one it restored \
         over"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_str("durable"),
        "§6.6: the `file` version is restored at `file` and not moved to `mem`"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Mem),
        v_str("second"),
        "§6.6: and the `mem` version is the PRE-REVERSAL one"
    );
    assert_eq!(read_at(&store, &key(&["a"])), v_str("second"));
    // AND THE JOURNAL IS UNMOVED BY THE RESTORE: the reversal that follows still answers its compacted floor.
    let again = failure(store.rollback(OpIdArg::Id(second.op.opId.clone())), "§6.4 M-6");
    assert_code(&again, "RollbackCompacted", "§6.6: the restore appends no entry and compacts nothing");
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Mem),
        v_str("second"),
        "§6.4 M-10: a failed rollback leaves the store unchanged, so the restored state still stands"
    );
}

/// **A MARK OUTSIDE THE `journalLength` WINDOW IS STILL REPLAYABLE, AND THAT IS THE MEASURED ANSWER.**
///
/// `journalLength` bounds the ROLLBACK by MARKING the oldest entries `compacted` (`§6.1` item 5); it removes
/// none of them, and the replay reads every entry the journal holds. So the compacted floor that refuses a
/// rollback (`s6_4_m6_…`) does NOT refuse a mark restore — compaction is a MARK and not an erasure.
#[test]
fn s6_6_a_mark_outside_the_window_is_still_replayable() {
    let mut store = new_store_with_journal(1);
    let first = ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    // THE FLOOR IS REAL FOR THE ROLLBACK AND THIS IS THE ARM THE CONTRAST IS READ AT.
    let refused = failure(store.rollback(OpIdArg::Id(first.op.opId.clone())), "§6.4 M-6");
    assert_code(&refused, "RollbackCompacted", "§6.4 M-6: the compacted floor");
    // THE MARK IS BEHIND THE SAME FLOOR AND STILL REPLAYS: the state the FIRST write left.
    ok(
        store.restoreMark(OpIdArg::Id(first.op.opId.clone())),
        "§6.6: a compacted mark replays",
    );
    assert_eq!(
        read_at(&store, &key(&["x"])),
        v_num(1.0),
        "§6.6: the state immediately AFTER the first write is what the mark names"
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["x"])),
        vec![Tier::Mem],
        "§6.6: and it is one version, at the one tier the write used"
    );
}

/// **A MARK THE JOURNAL DOES NOT HOLD REFUSES IN THE STORE'S OWN DECLARED FORM AND CHANGES NOTHING**
/// (`M-11`'s `JournalOpUnknown`, the code the rollback already answers). The mark is resolved BEFORE the
/// replay begins, so nothing is half-replayed.
#[test]
fn s6_6_an_unknown_mark_refuses_journal_op_unknown_and_changes_nothing() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(7.0)),
        "§3.4 W-3",
    );
    let refused = failure(store.restoreMark(OpIdArg::Id("op-absent".to_string())), "§6.4 M-11");
    assert_code(&refused, "JournalOpUnknown", "§6.4 M-11");
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(7.0),
        "§6.6: a refused mark leaves the store exactly as it found it"
    );
    // AND THE TWO MALFORMED ARMS ARE THE CARRIER'S OWN, NOT A SECOND DOMAIN.
    let blank = failure(store.restoreMark(OpIdArg::Id(String::new())), "PAR-10");
    assert_code(&blank, "AddressMalformed", "PAR-10");
    let null = failure(store.restoreMark(OpIdArg::Null), "PAR-10");
    assert_code(&null, "AddressMalformed", "PAR-10");
    assert_eq!(read_at(&store, &key(&["a"])), v_num(7.0));
}

/// **A MIXED-DEPTH SHADOW IS RESTORED VERSION BY VERSION** — a subtree whose nodes stand at DIFFERENT tiers
/// at DIFFERENT depths. **THIS IS THE SHAPE THE PER-ADDRESS, PER-TIER CAPTURE COULD NOT REACH**: the capture
/// reads the PAIR's own tiers, so a version standing one level BELOW the pair is recorded only inside its
/// parent's assembled value — and writing that value back at the parent's tier moves the descendant's tier
/// with it. The journal's per-version `after` snapshot does not: `a.b` stands at `mem` while `a.b.c` stands
/// at `mem` AND `temp`, and every one of them is read back at its own tier.
#[test]
fn s6_6_a_mixed_depth_shadow_is_restored_version_by_version() {
    let mut store = new_mem_store();
    let root = ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_obj(&[("c", v_num(1.0))]))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a", "b", "c"])),
            w_temp(),
            v_num(5.0),
        ),
        "§3.4 W-5: a version one level below the pair, at a LOWER tier than the version that holds it",
    );
    // THE PRE-REVERSAL STANDING, AND THE TWO READINGS THAT PROVE IT. **A TIER-NARROWED READ NARROWS EVERY
    // SEGMENT OF THE WALK** (`read_tier_sel`), so at a DEEP address it only answers at a tier the whole path
    // stands at: `a` and `a.b` stand at `mem` and at no other tier, so `mem` is the one narrowing that reaches
    // `a.b.c`. **THE PAIR OF READINGS IS THE PROOF OF THE MIX**: the `mem`-narrowed read answers the `mem`
    // VERSION (1) while the cross-tier read answers 5 — and a cross-tier read answers the LOWEST-rank version
    // present, so a `temp` version MUST be standing beside the `mem` one for the two to differ (`§4.2` `R-4`).
    assert_eq!(
        read_tier(&store, &key(&["a", "b", "c"]), Tier::Mem),
        v_num(1.0),
        "§5.1: the `mem` version of the deep node"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b", "c"])),
        v_num(5.0),
        "§4.2 R-4: and the cross-tier read answers the `temp` version beside it"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_obj(&[("c", v_num(5.0))]),
        "§4.2 R-2: `a.b` assembles to the deep read"
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["a", "b"])),
        vec![Tier::Mem],
        "§5.1: and `a.b` itself stands at ONE tier, so the mix is DEPTH and not a shadow at every level"
    );
    // THE REVERSAL THAT MOVES IT: naming the root write undoes the `temp` version and the whole subtree.
    ok(
        store.rollback(OpIdArg::Id(root.op.opId.clone())),
        "§6.3",
    );
    assert_eq!(
        store
            .read(AddressArg::List(key(&["a"])), TierArg::Absent)
            .is_err(),
        true,
        "§6.3: the reversal removes the subtree the root write created"
    );
    // THE MARK.
    ok(store.restoreMark(OpIdArg::Absent), "§6.6: the head mark");
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_obj(&[("c", v_num(5.0))]))]),
        "§4.2 R-2: `a` assembles one member per child key"
    );
    assert_eq!(
        read_tier(&store, &key(&["a", "b", "c"]), Tier::Mem),
        v_num(1.0),
        "§6.6: THE FINDING — the deep `mem` version is the PRE-REVERSAL one (1), not the assembled value an \
         address-by-address restore writes back at the parent's tier (5)"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b", "c"])),
        v_num(5.0),
        "§4.2 R-4: and the `temp` version beside it still wins the cross-tier read, at `temp`, where it stood"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_obj(&[("c", v_num(5.0))])
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§6.6: the branch above the mix stands at the one tier it stood at"
    );
}

/// **A VERSION STANDING ABOVE ITS PARENT'S TIER IS RESTORED, AND THAT IS A DELIBERATE BYPASS.** `§3.4`'s
/// monotonic clause refuses to WRITE a version whose tier outranks its parent's, and a compensating restore
/// that writes address by address hits exactly that refusal when the reversal moved the parent BELOW the
/// child: an address whose parent stands at `mem` cannot have a `file` version written back onto it. A mark
/// restore does not write — it RE-STATES what the journal recorded — and `restore`/`rebuild` have always
/// minted each version at its own tier with no monotonicity test and no purge (`§6.6`).
#[test]
fn s6_6_a_version_above_its_parent_s_tier_is_restored_from_the_record() {
    let mut store = new_store();
    // The pre-reversal standing: `a` at `file`, and `a.b` at `file` beneath it.
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_str("second"))]),
        ),
        "§3.4 W-3",
    );
    let top = ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_file(),
            v_obj(&[("b", v_str("durable"))]),
        ),
        "§3.4 W-6: a `file` write purges every version it outranks",
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["a", "b"])),
        vec![Tier::File],
        "§5.1: the drive must stand `a.b` at `file` ALONE before the reversal"
    );
    // THE REVERSAL MOVES THE PARENT DOWN: undoing the `file` write restores `a` at `mem`, and `a.b` with it.
    ok(store.rollback(OpIdArg::Id(top.op.opId.clone())), "§6.3");
    assert_eq!(
        tiers_answering_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§6.3: the reversal leaves the parent at `mem`"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_str("second"),
        "§6.3: and the child with it"
    );
    // THE WRITE THE COMPENSATING RESTORE WOULD HAVE TO TAKE IS REFUSED BY THE STORE ITSELF.
    let outranked = failure(
        store.write(
            AddressArg::List(key(&["a", "b"])),
            w_file(),
            v_str("durable"),
        ),
        "§3.4",
    );
    assert_code(
        &outranked,
        "ParentAnchorMonotonicityViolation",
        "§3.4: a `file` version cannot be written under a parent standing at `mem`",
    );
    // AND THE MARK PUTS IT BACK ANYWAY, because it re-states a recorded state rather than writing one.
    ok(store.restoreMark(OpIdArg::Absent), "§6.6: the head mark");
    assert_eq!(
        tiers_answering_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§6.6: the parent is back at `file`"
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["a", "b"])),
        vec![Tier::File],
        "§6.6: THE FINDING — and the child above it is back at `file`, exactly where the record put it"
    );
    assert_eq!(
        read_tier(&store, &key(&["a", "b"]), Tier::File),
        v_str("durable")
    );
    assert_eq!(read_at(&store, &key(&["a"])), v_obj(&[("b", v_str("durable"))]));
}

/// **A MIXED-DEPTH SHADOW INSIDE A REVERSAL'S OWN RESTORE — the shape the rebuild's child lookup is keyed on.**
///
/// A node holding TWO versions (`mem` and `temp`) may hold a DIFFERENT child version under EACH of them: here
/// `a`'s `mem` version assembles `{b:5}` because the `temp` version of `a.b` wins the cross-tier read BENEATH
/// it, so writing that ASSEMBLED value back at `mem` — which is what a lookup that reads the enclosing
/// container's own pairs produces — moves the deep version's tier and destroys the `temp` one. **The capture
/// records which version of the parent each child hangs under (`Captured::under`), and the rebuild writes it
/// there.** This is the `rollback`'s own restore and not the mark restore's act, which is why it is driven
/// separately.
#[test]
fn s6_6_a_reversal_restores_a_child_version_under_the_parent_version_that_held_it() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_temp(), v_num(5.0)),
        "§3.4 W-5: `a.b` stands at `mem` (1) BESIDE `temp` (5), under `a`'s `mem` version",
    );
    let replaced = ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(100.0))]),
        ),
        "§3.4 W-6: a `mem` write purges `mem` and `temp` and re-mints the subtree",
    );
    assert_eq!(
        read_tier(&store, &key(&["a", "b"]), Tier::Mem),
        v_num(100.0),
        "§3.4: the drive's state after the third write — one version of `a.b`, at `mem`"
    );
    assert_eq!(
        store
            .read(AddressArg::List(key(&["a", "b"])), t(Tier::Temp))
            .is_err(),
        true,
        "§3.4: and the `temp` version of `a.b` is purged with the subtree, so the reversal has a state to \
         restore"
    );
    // THE REVERSAL RESTORES WHAT STOOD: `a`'s `mem` version, with `a.b` at `mem` 1 and at `temp` 5 beneath it.
    ok(store.rollback(OpIdArg::Id(replaced.op.opId.clone())), "§6.3");
    assert_eq!(
        read_tier(&store, &key(&["a", "b"]), Tier::Mem),
        v_num(1.0),
        "§6.4: THE FINDING — the `mem` version of the child is the one that stood (1), not the parent's \
         assembled value (5)"
    );
    // **AND THE `temp` VERSION BENEATH THE SAME PARENT VERSION STANDS AGAIN, READ AS THE PAIR OF READINGS THAT
    // CANNOT BOTH HOLD WITHOUT IT**: a tier-narrowed read narrows EVERY segment of the walk, so a `temp`
    // narrowing stops at `a` and finds nothing; the `mem` narrowing reaches the child and answers the `mem`
    // version (1), while the CROSS-TIER read at that same address answers the LOWEST-rank version present (5) —
    // which is a `temp` version standing beside the `mem` one, written there by the recursion the child-level
    // lookup used to miss.
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(5.0),
        "§6.4: the cross-tier read answers the `temp` version, so it stands again under its own parent version"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_num(5.0))])
    );
}

/// **A REVERSAL AFTER A MARK RESTORE STILL FINDS THE PAIR IT MUST REBUILD.** An entry's recorded `home` is an
/// ARENA INDEX, and the replay REBUILDS the arena — so every index recorded before a `restoreMark` is stale.
/// The pair is therefore re-derived from the entry's ADDRESS at the instant of the reversal (`home_of_address`),
/// which is the derivation the write itself used, and the entry's own record is left as the fallback for an
/// address whose parent no longer resolves. **Without it a later rollback would rebuild into whichever link the
/// stale index now happens to name.**
#[test]
fn s6_6_a_reversal_after_a_mark_restore_still_finds_the_pair_it_must_rebuild() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    ok(
        store.write(
            AddressArg::List(key(&["z"])),
            w_mem(),
            v_obj(&[("y", v_num(1.0))]),
        ),
        "§3.4 W-4: a structured write, so the entry's home is a link the mark's state does not hold",
    );
    let deep = ok(
        store.write(AddressArg::List(key(&["z", "y"])), w_mem(), v_num(3.0)),
        "§3.4 W-1",
    );
    // **THE REPLAY REBUILDS THE ARENAS**: `['z']`'s value link — the home the fourth entry recorded — does not
    // exist in the state the mark describes.
    ok(
        store.restoreMark(OpIdArg::Id(first.op.opId.clone())),
        "§6.6: the state immediately after the FIRST write",
    );
    assert_eq!(read_at(&store, &key(&["x"])), v_num(1.0));
    assert_eq!(
        store
            .read(AddressArg::List(key(&["z"])), TierArg::Absent)
            .is_err(),
        true,
        "§6.6: the mark's state holds no `['z']`, so the fourth entry's recorded home names nothing"
    );
    // **THE REVERSAL ANSWERS AND DOES NOT REACH INTO AN ARENA THAT NO LONGER HOLDS THAT LINK.** `[`z`,`y`]` does
    // not resolve in this state either, so there is no derivable pair and the entry is reported as a residue.
    let undone = ok(
        store.rollback(OpIdArg::Id(deep.op.opId.clone())),
        "§6.3",
    );
    assert_eq!(
        undone.undoneOps.len(),
        0,
        "§6.3: an entry whose pre-state cannot be put back is NOT reported as undone"
    );
    assert_eq!(
        read_at(&store, &key(&["x"])),
        v_num(1.0),
        "§6.3 M-10: and the store's state is the state the mark left"
    );
}

/// **A BOOT-LOADED STORE'S IMAGE IS THE REPLAY'S FLOOR AND IS NOT DROPPED.** A store constructed over an
/// EXISTING FILE loads that image into the `file` tier and journals NO entry for it (`§7.2` item 6), so a
/// replay that assumed an EMPTY register at position `0` would delete every key the boot loaded. `Store::born`
/// is that floor, captured at construction.
#[test]
fn s6_6_a_boot_loaded_image_survives_a_mark_restore() {
    let path = fresh_path("s6_6-born");
    {
        let mut first = ok(
            storeCreate(&cfg_at(&path, 8)),
            "§7.1: the first construction creates the file",
        );
        let kept = ok(
            first.write(AddressArg::List(key(&["durable"])), w_file(), v_str("kept")),
            "§3.2 W-1",
        );
        ok(
            commit_at_the_terminal_arm(&mut first, &kept.op.opId),
            "§7.2 item 5: the file-tier save",
        );
    }
    // THE SECOND CONSTRUCTION BOOTS THE IMAGE: `['durable']` stands at `file` and NO journal entry records it.
    let mut second = ok(storeCreate(&cfg_at(&path, 8)), "§7.1 step 7");
    assert_eq!(
        read_tier(&second, &key(&["durable"]), Tier::File),
        v_str("kept"),
        "§7.2 item 6: the boot loads the image"
    );
    ok(
        second.write(AddressArg::List(key(&["fresh"])), w_file(), v_str("later")),
        "§3.2 W-1",
    );
    // THE MARK AT THE HEAD IS THE STATE AFTER THAT WRITE — WITH THE BOOTED KEY STILL UNDER IT.
    ok(second.restoreMark(OpIdArg::Absent), "§6.6: the head mark");
    assert_eq!(
        read_tier(&second, &key(&["durable"]), Tier::File),
        v_str("kept"),
        "§6.6: THE FINDING — the boot-loaded key stands: the floor is the image the store was born with and          not an empty register"
    );
    assert_eq!(
        read_tier(&second, &key(&["fresh"]), Tier::File),
        v_str("later"),
        "§6.6: and the journaled operation above it stands"
    );
}

/// **THE HEAD MARK AT REST IS A NO-OP** — the property that makes the replay trustworthy: when nothing has
/// been reversed, the state the journal's record describes IS the state the store stands at, at every
/// address and at every tier. A replay that drifted anywhere would move one of these readings.
#[test]
fn s6_6_the_head_mark_at_rest_leaves_every_reading_where_it_stood() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0)), ("c", v_obj(&[("d", v_num(2.0))]))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_temp(), v_num(8.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["v"])), w_file(), v_arr(vec![v_num(1.0), v_num(2.0)])),
        "§3.4 W-4",
    );
    ok(
        store.delete(AddressArg::List(key(&["a", "c", "d"])), none()),
        "§4.3: a delete empties the key it names",
    );
    let addresses = [
        key(&["a"]),
        key(&["a", "b"]),
        key(&["a", "c"]),
        key(&["v"]),
        key(&["v", "0"]),
        key(&["v", "1"]),
    ];
    let before: Vec<(Vec<Tier>, Option<StoreValue>, Option<StoreValue>, Option<StoreValue>)> = addresses
        .iter()
        .map(|address| {
            (
                tiers_answering_at(&store, address),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::File))
                    .ok(),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::Mem))
                    .ok(),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::Temp))
                    .ok(),
            )
        })
        .collect();
    ok(store.restoreMark(OpIdArg::Absent), "§6.6: the head mark");
    let after: Vec<(Vec<Tier>, Option<StoreValue>, Option<StoreValue>, Option<StoreValue>)> = addresses
        .iter()
        .map(|address| {
            (
                tiers_answering_at(&store, address),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::File))
                    .ok(),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::Mem))
                    .ok(),
                store
                    .read(AddressArg::List(address.clone()), t(Tier::Temp))
                    .ok(),
            )
        })
        .collect();
    assert_eq!(
        after, before,
        "§6.6: the state the journal's head describes IS the state the store stood at — every address, every \
         tier, both sides of the replay"
    );
}

/// **AN OPERATION AT THE EMPTY ADDRESS IS REPLAYED TOO.** `delete([])` names the register itself, whose state
/// has no pair home (`pair_home` answers `None` for the empty address), so the entry records the WHOLE
/// REGISTER's after-state and the replay re-states the root from it (`§6.6`'s `capture_register`).
#[test]
fn s6_6_the_register_s_own_operation_is_replayed() {
    let mut store = new_mem_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let zed = ok(
        store.write(AddressArg::List(key(&["z"])), w_temp(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.delete(AddressArg::List(empty_address()), t(Tier::Temp)),
        "§4.3: one tier at the register's every key",
    );
    assert_eq!(
        tiers_answering_at(&store, &key(&["z"])),
        Vec::<Tier>::new(),
        "§4.3: the `temp` version is gone and the key holds nothing"
    );
    // THE MARK NAMES THE STATE THE LAST WRITE LEFT — the `temp` version standing beside `a`.
    ok(store.restoreMark(OpIdArg::Id(zed.op.opId.clone())), "§6.6");
    assert_eq!(
        tiers_answering_at(&store, &key(&["z"])),
        vec![Tier::Temp],
        "§6.6: the register-level capture is replayed, key by key and tier by tier"
    );
    assert_eq!(read_tier(&store, &key(&["z"]), Tier::Temp), v_num(2.0));
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§6.6: and the key the delete did not name stands where it stood"
    );
}

