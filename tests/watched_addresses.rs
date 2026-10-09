//! `tests/watched_addresses.rs` — contract `write-and-read.md §6.5` (and its `contract.md §6.5`
//! relocation): the registration surface keyed by the listener's ADDRESS, the two trigger EVENTS, the
//! returned HANDLE set beside the kept ADDRESS set, and the journal half.
//!
//! **⟶ RE-DERIVED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT).** **The
//! file's `13` drives are re-derived by their author role against the superseding clauses** (`A58`;
//! `write-and-read.md §6.5`'s supersession clause, clause 4: *"the shipped red-set file
//! `tests/watched_addresses.rs` (`13` drives, green) is RE-DERIVED BY ITS AUTHOR ROLE (`role_test_writer`)
//! against these clauses"*; the plan's `§8.3` row `A2`), **the register's row `P-TP-8` is re-derived to the
//! listener's property** (`contract.md §5.8`), **and the six cells that row's strategy `S-WATCH` names are
//! driven here and in `tests/properties.rs`:** `(i)` the PREFIX drive · `(ii)` the SECOND-EVENT drive (the
//! `delete`) · `(iii)` the NO-TIER-TEST drive · `(iv)` the DESTRUCTION drive · `(v)` the
//! HOME-IS-NOT-A-GRAPH-STRUCTURE drive · `(vi)` the `watched`-and-`opId` drive, KEPT.
//!
//! **THE VERBS ARE `listen`/`unlisten` AND NOT `watch`/`unwatch`.** **`A58`: *"Watch is a stopgap for the
//! listener implementation"*, so the stopgap's verbs and its `WatchHandle` are SUPERSEDED — ONE pass, no
//! deprecation window** (`§6.5`'s supersession clauses 1 and 2) — **and no drive below calls them.** **The
//! shipped `§6.5` clauses stay VISIBLE as the record of what the stopgap did, and no shipped row is
//! deleted.**
//!
//! **WHAT THE LISTENER SURFACE BINDS TO, AND WHAT FIRES:** **a listener is `{ address, handle }` and the
//! binding is BY ADDRESS** (`A57`; `§6.5` item 10 (b)); **the trigger events are exactly TWO — `write` and
//! `delete` — and a READ, a `findAddress`, a `rollback` and a boot fire NOTHING** (`A43`; item 10 (c));
//! **the store RETURNS the triggered listeners' handles and INVOKES nothing** (`A57`; item 10 (d)); **no
//! tier test runs at any trigger** (`DD-36`; item 10 (f)); **and the order is UNSPECIFIED — both lists are
//! compared as SETS** (`DD-37`; item 10 (e)).
//!
//! States enumerated for this concern, each driven below: a listener bound at the write's own address; at a
//! strict ancestor; at a strict descendant; at an unrelated address; two listeners at one address; a
//! registration withdrawn by `unlisten`; an unlisten of an already-removed handle; a foreign instance's
//! handle; a fabricated handle; a malformed listened address; a write at each of the three tiers; a
//! `delete` that removes a version; a `delete` that removes nothing; the three change arms that destroy and
//! replace the node carrying a borrow; a read at the empty address and at the listener's own address; a
//! fresh instance over an equal `cfg.filePath`.

mod support;
use support::*;

// §6.5 item 12 (`A57`, `A58`) + `contract.md §0.4` — `listen(address)` MINTS an opaque, store-unique
// `ListenerHandle` and populates the home map; `unlisten(handle)` drops ONE home-map entry, so a later
// write at that address carries `triggered: []`.
// Drives: §6.5 items 8, 10, 12; §0.4
#[test]
fn s6_5_listen_returns_a_handle_and_unlisten_removes_one_registration() {
    let mut store = new_store();
    let handle = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12: `listen` mints the handle",
    );
    ok(
        store.unlisten(&handle),
        "§6.5 item 12: `unlisten` drops one home-map entry",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        w.triggered.is_empty(),
        "§5.8 (a): the listener was withdrawn, so no handle is returned"
    );
}

// §6.5 item 10 (d) (iii) (`A33`/`A37`, `DD-18`) — a listener bound at address `W` is triggered by a
// successful `write` at address `X` iff `W` is a PREFIX of `X`: the write resolves TO the listener's own
// address, and the store RETURNS its handle in `WriteResult.triggered`.
// Drives: §6.5 item 10 (d), §5.8 (a), DD-18
#[test]
fn s6_5_a_listener_bound_at_the_write_s_own_address_is_triggered() {
    let mut store = new_store();
    let h = ok(store.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "§5.8 (a): the handle whose listener's address is a prefix of the write's address is returned"
    );
    assert!(
        same_address_set(&w.watched, &[key(&["a"])]),
        "§5.8 (e): the kept half — the watched ADDRESS list carries the same registration's address"
    );
}

// §6.5 item 10 (d) (iii) + `DD-18` — the selection is DESCENDANT-INCLUSIVE FROM THE LISTENER'S ADDRESS
// DOWNWARD: a write that passes THROUGH the listener's address triggers it.
// Drives: §6.5 item 10 (d), §5.8 (a), DD-18
#[test]
fn s6_5_a_listener_bound_at_an_ancestor_is_triggered_by_a_write_through_it() {
    let mut store = new_store();
    let ancestor = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12 at the ancestor",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the branch at `a`",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&ancestor)),
        "A37/DD-18: *\"Listener fires if the address or any of its descendants is resolved on write\"*"
    );
}

// `§5.8`'s re-derived `S-WATCH` cell **(i) — the PREFIX drive**: bind at the write's own address, at a
// strict ancestor, at a strict descendant and at an unrelated address; assert `triggered` equals
// `{own, ancestor}`'s handles and EXCLUDES the other two.
// Drives: §5.8 (a), §6.5 item 10 (d), DD-18
#[test]
fn s5_8_s_watch_i_the_handle_set_is_exactly_own_and_ancestor() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["root"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the ancestor exists",
    );
    let own = ok(
        store.listen(AddressArg::List(key(&["root", "own"]))),
        "§6.5 item 12: the write's own address",
    );
    let ancestor = ok(
        store.listen(AddressArg::List(key(&["root"]))),
        "§6.5 item 12: a strict ancestor",
    );
    let descendant = ok(
        store.listen(AddressArg::List(key(&["root", "own", "deep"]))),
        "§6.5 item 12: a strict descendant",
    );
    let unrelated = ok(
        store.listen(AddressArg::List(key(&["unrelated"]))),
        "§6.5 item 12: an unrelated address",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["root", "own"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &[own.clone(), ancestor.clone()]),
        "§5.8 (a): EXACTLY the prefix set's handles — no member added and none omitted"
    );
    assert!(
        !w.triggered.iter().any(|h| *h == descendant),
        "§5.8's failure list: a strict DESCENDANT of the write's address is not triggered (the write \
         resolves to the address and passes through its ancestors, not through its descendants)"
    );
    assert!(
        !w.triggered.iter().any(|h| *h == unrelated),
        "§5.8's failure list: *\"a handle returned where no listener's address is a prefix\"*"
    );
}

// `§5.8` (a) + (e) — both lists are `[]` iff nothing satisfies the prefix test, and neither is ever
// `undefined`-shaped (`§3.6`: *"ALWAYS a list, possibly EMPTY, never absent"*).
// Drives: §5.8 (a), §5.8 (e), §3.6, §4.4
#[test]
fn s5_8_both_lists_are_empty_iff_no_listener_s_address_is_a_prefix() {
    let mut store = new_store();
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        w.watched.is_empty() && w.triggered.is_empty(),
        "§5.8: nothing is registered, so both lists are empty"
    );
    ok(
        store.listen(AddressArg::List(key(&["elsewhere"]))),
        "§6.5 item 12",
    );
    let w2 = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    assert!(
        w2.watched.is_empty() && w2.triggered.is_empty(),
        "§5.8: a non-prefix registration satisfies neither list"
    );
}

// **⟶ RE-DERIVED 2026-10-11 (SECOND RE-DERIVATION, `CF-1`) — THE SHIPPED ADDRESS-LEVEL IDEMPOTENCE IS
// CARRIED TO THE LISTENER SURFACE** (`§6.5` item 2's *"registering the same address twice is idempotent"*).
// **THE OPERATIVE RULE FOR A SECOND `listen` AT AN ALREADY-REGISTERED ADDRESS IS THE CONTRACT'S OWN, IN ITS
// TWO HOMES:** **`contract.md §0.4`'s construction-rule clause 2** — *"by `listen(address)`, which returns a
// freshly minted token for a NEW registration and the EXISTING entry's handle where the address is ALREADY
// registered (the shipped address-level idempotence, `§6.5` item 2, carried to the listener surface by
// `A45`'s one home)"* — **and `write-and-read.md §6.5` item 12 (c)**, which states the same rule with its
// consequence: *"a `listen(address)` whose address IS already registered returns the EXISTING entry's handle
// rather than minting a second one — … which is why `unlisten` over the returned handle removes exactly one
// entry."* **SO THE SECOND CALL RETURNS THE HANDLE THE HOME ALREADY HOLDS: the home holds ONE entry, the
// trigger fires that ONE handle ONCE, and the ADDRESS list keeps its distinctness, which IS carried
// unchanged** (`§6.5` item 2's KEPT half; item 13). **`DD-39`'s `alt` prices the OPPOSITE carry-over** (*"the
// shipped idempotence rule belonged to a surface `A58` supersedes"*), **but that cell governs the
// CONSTRUCTION's `listeners[]` population and not this verb** (`§6.5` item 12 (b) states the construction's
// own rule; `tests/construction.rs`'s duplicate-address cell drives it): **the contract's operative clause 2
// governs here, and this cell follows it.**
// Drives: §6.5 items 2, 8 (a), 12 (b)/(c), 13; §5.8 (a), (e); §0.4 clause 2; PAR-13
#[test]
fn s6_5_listening_twice_at_one_address_is_idempotent_and_returns_the_existing_handle() {
    let mut store = new_store();
    let h1 = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12: the first registration mints the home's handle",
    );
    let h2 = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12 (c): the same address again — the EXISTING entry's handle comes back",
    );
    assert!(
        h1 == h2,
        "§6.5 item 12 (c)/§0.4 clause 2: *\"a `listen(address)` whose address IS already registered returns \
         the EXISTING entry's handle rather than minting a second one\"*"
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w.triggered.len(),
        1,
        "§6.5 item 12 (c): the home holds ONE entry at the address, so the trigger fires ONE handle"
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h1)),
        "§5.8 (a): the trigger's whole answer is that ONE home entry's handle — no member added, no member \
         omitted"
    );
    assert_eq!(
        w.watched.len(),
        1,
        "§5.8 (e)/§6.5 item 2's KEPT half: the returned ADDRESS list carries the address ONCE"
    );
    assert!(
        same_address_set(&w.watched, &[key(&["a"])]),
        "§6.5 item 13: *\"the distinctness of the returned address set\"* is carried unchanged"
    );
    // AND the ONE home entry is the ONE the returned handle removes — item 12 (c)'s own stated consequence.
    ok(
        store.unlisten(&h2),
        "§6.5 item 12 (c): ONE handle reaches ONE home entry",
    );
    let after = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert!(
        after.triggered.is_empty(),
        "§6.5 item 12 (c): *\"`unlisten` over the returned handle removes exactly one entry\"* — the home \
         held ONE entry, so nothing is left at the address to fire"
    );
}

// `§5.8`'s failure list — **`a read`, a `findAddress`, a `rollback` and a boot produce NO handle list, and a
// FAILED write returns nothing at all** (`§6.5` item 10 (c): *"No read, no `findAddress`, no `rollback`, no
// boot and no read-driven traversal fires a listener"*; `A43`). **The observable: the failing write throws
// (so no `WriteResult` and no handle list cross), the read path leaves the registration intact, and the
// NEXT write's trigger is unchanged — nothing was fired, consumed or lost by the read path.**
// Drives: §6.5 item 10 (c), §6.5 item 4, §3.5, A43, DD-24(b)
#[test]
fn s6_5_a_read_never_fires_and_a_failed_write_returns_nothing() {
    let mut store = new_store();
    let h = ok(store.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&h)),
        "§5.8 (a): the write fires"
    );

    // A failed write returns NOTHING — it throws, and no handle list crosses.
    let failed = failure(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_null()),
        "§3.4 F-2",
    );
    assert_code(
        &failed,
        "ValueNotAdmitted",
        "§6.5 item 4's FIRST half (unmoved): a failed write returns nothing, because it throws",
    );

    // The read path: an unqualified read, a tier-qualified read, a `findAddress`, a `rollback` and a fresh
    // READ-driven traversal — none of them produces a handle list, and none of them disturbs the state.
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("v"),
        "§6.5 item 10 (c): a read answers the value and NOTHING of the listener surface"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Mem),
        v_str("v"),
        "§4.1: a tier-qualified read answers the same value"
    );
    assert!(
        store
            .findAddress(AddressArg::List(key(&["a"])), TierArg::Absent)
            .is_ok(),
        "§2.1: `findAddress` reaches the node and no home entry"
    );
    let r = ok(
        store.rollback(OpIdArg::Id(first.op.opId.clone())),
        "§6.3: a rollback runs on the journal",
    );
    assert!(
        r.undoneOps.contains(&first.op.opId),
        "§6.4: the rollback undid the write"
    );
    let again = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("w")),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&again.triggered, &one_handle(&h)),
        "§6.5 item 10 (c): the read path and the rollback fired nothing and dropped nothing — the \
         registration is intact and fires exactly once"
    );
}

// §6.5 item 12 — `unlistening` an ALREADY-REMOVED handle is a no-op SUCCESS (the superseded `unwatch`'s own
// clause, carried forward): no code is produced and no other registration is removed.
// Drives: §6.5 item 12; PAR-13
#[test]
fn s6_5_unlistening_an_already_removed_handle_is_a_no_op_success() {
    let mut store = new_store();
    let handle = ok(store.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    ok(store.unlisten(&handle), "§6.5 item 12");
    ok(
        store.unlisten(&handle),
        "§6.5 item 12: an unknown handle is a no-op success",
    );
    let other = ok(
        store.listen(AddressArg::List(key(&["b"]))),
        "§6.5 item 12: a registration that must survive",
    );
    ok(
        store.unlisten(&handle),
        "PAR-13: a second withdrawal of the same handle removes nothing else",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&other)),
        "§6.5 item 12: no OTHER registration is removed by an unknown handle"
    );
}

// PAR-13's outside-value list — **a handle a FOREIGN instance minted** — is not a failure: `unlisten` over it
// is a no-op SUCCESS, no code is produced, and no other registration is removed. **⟶ the drive is
// re-derived from the superseded `PAR-8` to the listener surface's own row** (`§6.5` item 12's carried
// clause; `PAR-13`).
// Drives: PAR-13, §6.5 item 12
#[test]
fn par_13_a_foreign_handle_is_a_no_op_success() {
    let mut a = new_store();
    let mut b = new_store();
    let foreign = ok(
        b.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12 in another instance",
    );
    ok(
        a.unlisten(&foreign),
        "PAR-13: an unknown or foreign handle → NOT a failure",
    );
    let w = ok(
        a.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        w.triggered.is_empty(),
        "PAR-13: the foreign handle registered nothing in this instance"
    );
}

// PAR-1 (`§1.5`) + PAR-13 — a listened address outside `PAR-1`'s domain fails `AddressMalformed`, and the
// store mints no handle. **⟶ the drive is re-derived from the superseded `PAR-8` to `PAR-1`/PAR-13.**
// Drives: PAR-1, PAR-13, §1.5, §8.1 #1
#[test]
fn par_13_a_malformed_listen_address_fails_address_malformed() {
    let mut store = new_store();
    for arg in [
        AddressArg::Absent,
        AddressArg::Null,
        AddressArg::Undefined,
        AddressArg::Str("a.b".into()),
    ] {
        let e = failure(store.listen(arg), "PAR-1's declared answer");
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-1: an address outside its domain → AddressMalformed",
        );
    }
}

// PAR-13's outside-value list — **a value the store NEVER MINTED AT ALL (fabricated)** — answers the SAME
// way as the foreign and the prior-session value: **a NO-OP SUCCESS, not a failure; no code is produced and
// no other registration is removed.** **THIS DRIVE'S HANDLE IS SPELLED BY THE CALLER, AND THAT SPELLING IS
// NOW `§0.4`'s OWN DECLARATION:** the construction-rule's clause 1 declares `ListenerHandle` *"a NEWTYPE
// OVER AN OPAQUE TOKEN with PRIVATE fields and ONE infallible public constructor from a string token (spelled
// `ListenerHandle::from(token: &str)`)"*, and clause 3 declares exactly this state — *"a value the store never
// minted at all (fabricated) … is answered EXACTLY as `PAR-13` declares: at `unlisten`, a NO-OP SUCCESS,
// producing NO code and removing NO other registration"* — so the gate-3 `CONTRACT FINDING` `G-2` is CLOSED
// and the fabricated handle is SPELLABLE by declaration (`write-and-read.md §6.5` item 12 (a)).
// **THE PRIOR-SESSION VALUE IS NOT DRIVEN: `session` is the PROCESS (`§6.1` item 3), so no in-process drive
// can mint one — a skip, reported rather than hidden.**
// Drives: PAR-13, §6.5 item 12 (a)/(c), §0.4 clauses 1/3
#[test]
fn par_13_a_fabricated_handle_is_a_no_op_success() {
    let mut store = new_store();
    let fabricated = handle("never-minted-by-this-store");
    ok(
        store.unlisten(&fabricated),
        "PAR-13: *\"the foreign, the prior-session and the fabricated alike — is a NO-OP SUCCESS\"*",
    );
    let bound = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12: a registration that must survive",
    );
    ok(
        store.unlisten(&fabricated),
        "PAR-13: and no other registration is removed",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&bound)),
        "PAR-13: the fabricated handle removed nothing"
    );
}

// `§5.8`'s re-derived `S-WATCH` cell **(vi), the KEPT half** — *"the returned `opId`'s acceptance by
// `rollback` (`P-TP-8`'s journal half)"*: `WriteResult.op.opId` subsequently resolves in the journal, so
// `rollback(opId)` does not fail `JournalOpUnknown`.
// Drives: §5.8 (g), §6.2, §6.4 M-11
#[test]
fn s5_8_s_watch_vi_the_returned_op_id_is_accepted_by_rollback() {
    let mut store = new_store();
    let h = ok(store.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "§5.8 (a): own-address membership"
    );
    let r = ok(
        store.rollback(OpIdArg::Id(w.op.opId.clone())),
        "§5.8 (g): the opId is accepted by rollback",
    );
    assert_eq!(r.opId, w.op.opId, "§6.3: the id the caller passed, echoed");
    assert!(
        r.undoneOps.contains(&w.op.opId),
        "§5.8 (g): the op is in the journal — a registration appends no entry (`§6.1`'s two tracked verbs)"
    );
}

// **`§5.8`'s re-derived `S-WATCH` cell `(ii)` — THE SECOND TRIGGER EVENT** (`A43`: *"listeners don't fire on
// read, they fire on write/delete"*; `§4.3`/`§4.4`'s amended receipt): **after a successful `delete` THAT
// REMOVED AT LEAST ONE VERSION, `DeleteReceipt.triggered` is EXACTLY the set of handles whose listener binds
// at a PREFIX of the deleted address; a listener bound at a STRICT DESCENDANT of it does NOT fire; and a
// `D-3` delete carries `triggered: []` WITH `tiers: []`.**
// Drives: §5.8 (b), §4.4's amended receipt, §4.3's firing clause, A43, DD-9, DD-35
#[test]
fn s5_8_s_watch_ii_the_delete_is_the_second_trigger_event() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at `file`: the branch that SURVIVES the `D-1` delete below (so the address still resolves \
         and the `D-3` arm is reachable)",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("trial")),
        "§3.4 W-5: the `mem` literal is added alongside and shadows the `file` branch",
    );
    let own = ok(
        store.listen(AddressArg::List(key(&["a"]))),
        "§6.5 item 12: the deleted address's own listener",
    );
    let ancestor = ok(
        store.listen(AddressArg::List(key(&["a", "b"]))),
        "§6.5 item 12: a strict DESCENDANT of the deleted address",
    );
    let mut store2 = new_store();
    let top = ok(
        store2.listen(AddressArg::List(key(&[]))),
        "§6.5 item 12: a listener at the empty address — a prefix of every address",
    );
    ok(
        store2.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")),
        "§3.4 W-3 at `file` — the version that SURVIVES the `D-1` delete below",
    );
    ok(
        store2.write(AddressArg::List(key(&["k"])), w_mem(), v_str("trial")),
        "§3.4 W-5: the `mem` version stands beside the `file` one and shadows it",
    );

    let d1 = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Mem)),
        "§4.4 D-1",
    );
    assert_eq!(d1.tiers, vec![Tier::Mem], "§4.4 D-1: the one named tier");
    assert!(
        same_handle_set(&d1.triggered, &one_handle(&own)),
        "§4.4's amended member: the `delete` fires the listener bound AT the deleted address"
    );
    assert!(
        !d1.triggered.iter().any(|h| *h == ancestor),
        "§4.3/§4.4: *\"a listener bound at a STRICT DESCENDANT of the deleted address does NOT fire\"*"
    );

    let d1b = ok(
        store2.delete(AddressArg::List(key(&["k"])), t(Tier::Mem)),
        "§4.4 D-1 at a register-scoped key",
    );
    assert!(
        same_handle_set(&d1b.triggered, &one_handle(&top)),
        "§5.8 (b): the empty-address listener is a prefix of every address, so it fires on the delete"
    );

    let d3 = ok(
        store.delete(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§4.4 D-3: the target resolves and holds no version at the named tier",
    );
    assert_eq!(
        d3.tiers,
        Vec::<Tier>::new(),
        "§4.4 D-3: a delete that removes nothing is a success"
    );
    assert!(
        d3.triggered.is_empty(),
        "§5.8 (b)/§4.4: *\"a delete that removed nothing (`D-3`) carries `triggered: []`\"*"
    );
}

// **`§5.8`'s re-derived `S-WATCH` cell `(iii)` — THE NO-TIER-TEST DRIVE** (`DD-36`: *"nothing carries over
// from the superseded qualifier"*; `§6.5` item 10 (f)): **bind at an address a write's address has as a
// prefix and write at EVERY ONE OF THE THREE TIERS — the handle is returned EACH time.** **A tier-qualified
// listener whose firing is suppressed by the write's tier is the row's own named failure.** **AND THE
// SUPERSEDED `watch` ROW'S TIER COLUMN IS NOT DRIVEN: `§3.1.1` strikes it for `watch`, and the listener
// surface's arity is `listen(address)` with NO tier slot (see this pass's report for the row's tier-shaped
// cell).**
// Drives: §5.8 (a), §6.5 item 10 (f), DD-36, §3.1.1's `listen` row
#[test]
fn s5_8_s_watch_iii_no_tier_test_runs_at_any_trigger() {
    let path = fresh_path("no-tier-test");
    let mut store = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.1: a `file` register, so all three tiers stand at a register key (§5.6)",
    );
    let h = ok(
        store.listen(AddressArg::List(key(&["r"]))),
        "§6.5 item 12: an address-keyed registration carrying no tier",
    );
    for tier in canonical_tiers() {
        let w = ok(
            store.write(AddressArg::List(key(&["r"])), t(tier), v_num(1.0)),
            "§3.4: a write at one of the three tiers",
        );
        assert!(
            same_handle_set(&w.triggered, &one_handle(&h)),
            "DD-36/§5.8's failure list: *\"a handle set that depends on the write's TIER\"* — the handle is \
             returned at every one of the three tiers"
        );
    }
}

// **`§5.8`'s re-derived `S-WATCH` cell `(iv)` — THE DESTRUCTION DRIVE** (`A46`: *"The borrow is removed on
// node change actions because they destroy and replace nodes"*; `§6.5` item 9 (a)): **bind at an address;
// `write` through it so the arm replaces the node that carried the borrow (`W-1`'s purge-then-mint, `W-2`'s
// re-mint and `W-6`'s purge-then-mint, each in turn); assert the NEXT trigger still returns that listener's
// handle EXACTLY ONCE — the borrow's drop is observed as NO LOST AND NO DUPLICATED handle** (`P-TP-6`'s
// listener half; `P-TP-8`'s failure list).
// Drives: §5.8 (d), §6.5 item 9 (a), A46, §5.6's failure list, §3.4 W-1/W-2/W-6
#[test]
fn s5_8_s_watch_iv_the_borrows_are_dropped_with_the_node() {
    // W-1 — the equal-tier purge-then-mint replaces the node the borrow was taken through.
    let mut w1 = new_store();
    let h1 = ok(w1.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    ok(
        w1.write(AddressArg::List(key(&["a"])), w_mem(), v_str("one")),
        "§3.4 W-3",
    );
    ok(
        w1.write(AddressArg::List(key(&["a"])), w_mem(), v_str("two")),
        "§3.4 W-1: the pair is purged and re-minted, so the node that carried the borrow is gone",
    );
    let after_w1 = ok(
        w1.write(AddressArg::List(key(&["a"])), w_mem(), v_str("three")),
        "§3.4 W-1",
    );
    assert_eq!(
        after_w1.triggered.len(),
        1,
        "A46/§5.8 (d): the handle survives the change action ONCE — no lost and no duplicated handle"
    );
    assert!(
        same_handle_set(&after_w1.triggered, &one_handle(&h1)),
        "A46: the borrow's lifetime is the node's, and the binding is the ADDRESS's — the replacement node \
         takes the list from its nearest parent, so the same handle fires again"
    );

    // W-2 — the re-mint destroys the addressed leaf's pointing anchor and node.
    let mut w2 = new_store();
    let h2 = ok(w2.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    ok(
        w2.write(AddressArg::List(key(&["a"])), w_mem(), v_str("leaf")),
        "§3.4 W-3",
    );
    ok(
        w2.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("k", v_num(1.0))]),
        ),
        "§3.4 W-2: destroy and replace with a new anchor on the same link",
    );
    let after_w2 = ok(
        w2.write(AddressArg::List(key(&["a"])), w_mem(), v_str("again")),
        "§3.4 W-2",
    );
    assert!(
        same_handle_set(&after_w2.triggered, &one_handle(&h2)),
        "A46: the re-mint's replacement node inherits the list, so the handle is neither lost nor doubled"
    );

    // W-6 — the purge at `rank ≤ the write's own` removes the less persistent version and mints in its place.
    let mut w6 = new_store();
    let h6 = ok(w6.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    ok(
        w6.write(AddressArg::List(key(&["a"])), w_temp(), v_str("trial")),
        "§3.4 W-3 at `temp`",
    );
    ok(
        w6.write(AddressArg::List(key(&["a"])), w_mem(), v_str("durable")),
        "§3.4 W-6: every version at `rank ≤ mem` is purged",
    );
    let after_w6 = ok(
        w6.write(AddressArg::List(key(&["a"])), w_temp(), v_str("trial-2")),
        "§3.4 W-5: added alongside",
    );
    assert!(
        same_handle_set(&after_w6.triggered, &one_handle(&h6)),
        "A46: the handle is returned exactly once after the purge arm replaced the node"
    );
}

// **`§5.8`'s re-derived `S-WATCH` cell `(v)` — THE HOME-IS-NOT-A-GRAPH-STRUCTURE drive** (`A48`: the home
// *"only contains listeners, it is separate from the register and the graph"*; `§6.5` item 8 (b)/(c)):
// **`read([])`'s object carries NO listener entry; `findAddress` reaches no home entry at any address — the
// home is NOT ADDRESSABLE; and a fresh instance over an equal `cfg.filePath` begins with `triggered: []` on
// its first write** (`DD-38`).
// Drives: §5.8 (c), §6.5 item 8 (b)/(c)/(e), §1.7, A48, DD-38
#[test]
fn s5_8_s_watch_v_the_home_is_not_a_graph_structure() {
    let path = fresh_path("home-structure");
    let config = cfg_at_with_listeners(
        &path,
        8,
        listeners(vec![entry(key(&["a"]), handle("home-hidden"))]),
    );
    let mut store = ok(storeCreate(&config), "§7.1 step 5");
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("a", v_str("v"))]),
        "§6.5 item 8 (b)/A43: a read at `[]` returns the whole register as an object OF THE GRAPH — the \
         home map is not inside it and no listener entry is a member of it"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("v"),
        "§6.5 item 10 (c): and a read at the listener's own address answers the graph's value alone"
    );
    // The home is NOT ADDRESSABLE: binding a listener at an address mints no node, so no address reaches a
    // home entry — the listener's own address resolves to nothing until a write puts a node there.
    let h = ok(
        store.listen(AddressArg::List(key(&["never-written"]))),
        "§6.5 item 12: a listener at an address no node stands at",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["never-written"])), TierArg::Absent),
        "§6.5 item 8 (b): the home is not addressable",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "A48/§5.8 (c): the home is a peer structure OUTSIDE the graph — a registration mints no node and \
         no segment path reaches the home",
    );
    let w = ok(
        store.write(
            AddressArg::List(key(&["never-written"])),
            w_mem(),
            v_num(1.0),
        ),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&h)),
        "§5.8 (a): the registration is still the home's own entry, reached by the address that now exists"
    );

    // A FRESH INSTANCE over an EQUAL `cfg.filePath` begins with `triggered: []` on its first write
    // (`DD-38`: the home is instance- and session-scoped and out of the `file` bytes).
    let mut fresh = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.2 item 6: the boot over the same path",
    );
    let wf = ok(
        fresh.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-3 in the fresh instance",
    );
    assert!(
        wf.triggered.is_empty() && wf.watched.is_empty(),
        "DD-38/§5.8 (c): a fresh instance over an equal `cfg.filePath` loads NO registration — the home is \
         out of the `file` bytes and out of the journal, and this instance's own home is empty"
    );
}
