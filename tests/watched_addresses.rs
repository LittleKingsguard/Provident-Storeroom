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
//!
//! **⟶ ADDED 2026-10-11 (`A67`, `K7`) — `THREE` CELLS ADDED AT THE FOOT OF THIS FILE, AND THE STATES THEY
//! ADD TO THE LIST ABOVE, EACH NAMED: `a foreign instance's handle` is now driven at its FULL declared
//! answer (a NO-OP SUCCESS that leaves the OTHER instance's home untouched, observed through that instance's
//! own trigger set and watched-address set) · `a second instance over the SAME cfg.filePath` (the same rule
//! across the same path, with the boot's zero registrations, `DD-38`) · `a handle a third instance minted
//! and withdrew` · `TWO instances minting for their OWN addresses, with no cross-naming and no
//! cross-firing` · and `a caller-adopted token the same instance's own mint would otherwise take`
//! (`DD-42`'s mint rule in its per-instance form).** **THE PRIOR-SESSION STATE ITSELF REMAINS A REPORTED
//! SKIP (`session` is the process, `§6.1` item 3; no reload verb exists), and the cells' own comment block
//! names it.** **NO DRIVE ABOVE IS TOUCHED, WEAKENED OR RE-DERIVED BY THIS CLAUSE** (`§0.4` clauses 2 and 3;
//! `parameter-semantics.md §2.13` `PAR-13`; `write-and-read.md §6.5` item 12; `DD-42`; `DD-38`).
//!
//! **⟶ ADDED 2026-10-11 (`role_test_writer`) — `TWO` CELLS AT THE FOOT OF THIS FILE FOR `write-and-read.md
//! §6.5` ITEM 14 (d)–(e), THE `A78`/`CF-DUP-3` CLAUSE, AND THE STATES THEY ADD TO THE LIST ABOVE, EACH
//! NAMED:** **a `listen` that LANDS AFTER a trigger has been computed** (a NEW address, so the home gains an
//! entry) — **whose declared answer is that the EARLIER trigger's returned set stands AS RETURNED and the
//! newcomer is carried by the NEXT trigger** (item 14 (e) (i)); **and its SYMMETRIC `unlisten`** (one home
//! entry removed after the computation) — **whose declared answer is that the earlier set STILL CARRIES the
//! withdrawn handle while a LATER trigger NO LONGER CARRIES it, with the item-4-class NO-OP SUCCESSES beside
//! them leaving the home the next trigger reads UNCHANGED** (item 14 (e) (ii)) — plus **the kept registration
//! the withdrawal does not name** in both cells. **NO ROW OF THE TYPED REGISTER IS MOVED, RE-DERIVED OR
//! RE-NUMBERED BY THIS CLAUSE** (`contract.md §5.8`; `§5.4` (f); item 14 (g): *"it re-decides no clause of
//! items 8–13; it moves no row of the typed register and no row of the defaults table"*). **NO DRIVE ABOVE IS
//! TOUCHED, WEAKENED OR RE-DERIVED, AND NO ASSERTION OF THESE TWO IS AN INFERENCE FROM THE OTHER'S:** the
//! `listen` cell and the `unlisten` cell each assert BOTH of their halves (`§6.5` item 14 (d); item 14 (e)
//! (i)–(ii); `A78`; `DD-37`).

mod support;
use support::*;

// §6.5 item 12 (`A57`, `A58`) + `contract.md §0.4` — `listen(address)` MINTS an opaque, store-unique
// `ListenerHandle` and populates the home map; `unlisten(handle)` drops ONE home-map entry, so a later
// write at that address carries `triggered: []`.
// Drives: §6.5 items 8, 10, 12; §0.4
#[test]
fn s6_5_listen_returns_a_handle_and_unlisten_removes_one_registration() {
    let mut store = new_store();
    let handle_tag = handle("wa-h1");
    let handle = handle_tag.clone();
    ok(store.listen(&handle, &[key(&["a"])]),
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
    let h_tag = handle("wa-h2");
    let h = h_tag.clone();
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
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
    let ancestor_tag = handle("wa-h3");
    let ancestor = ancestor_tag.clone();
    ok(store.listen(&ancestor, &[key(&["a"])]),
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
    let own_tag = handle("wa-h4");
    let own = own_tag.clone();
    ok(store.listen(&own, &[key(&["root", "own"])]),
        "§6.5 item 12: the write's own address",
    );
    let ancestor_tag = handle("wa-h5");
    let ancestor = ancestor_tag.clone();
    ok(store.listen(&ancestor, &[key(&["root"])]),
        "§6.5 item 12: a strict ancestor",
    );
    let descendant_tag = handle("wa-h6");
    let descendant = descendant_tag.clone();
    ok(store.listen(&descendant, &[key(&["root", "own", "deep"])]),
        "§6.5 item 12: a strict descendant",
    );
    let unrelated_tag = handle("wa-h7");
    let unrelated = unrelated_tag.clone();
    ok(store.listen(&unrelated, &[key(&["unrelated"])]),
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
        !triggered_handles(&w.triggered).contains(&descendant),
        "§5.8's failure list: a strict DESCENDANT of the write's address is not triggered (the write \
         resolves to the address and passes through its ancestors, not through its descendants)"
    );
    assert!(
        !triggered_handles(&w.triggered).contains(&unrelated),
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
    let wa_h8 = handle("wa-h8");
    ok(
        store.listen(&wa_h8, &[key(&["elsewhere"])]),
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

// **⟶ RE-DERIVED 2026-10-18 (THIRD RE-DERIVATION) — THE ADDRESS-LEVEL IDEMPOTENCE IS DELETED, AND THIS CELL
// MOVES TO ITS CLAUSE'S REAL SUBJECT: ONE HANDLE ACTED ON TWICE.** **THE CELL WAS NAMED
// `s6_5_listening_twice_at_one_address_is_idempotent_and_returns_the_existing_handle` AND IT ASSERTED
// `h1 == h2`; BOTH THAT NAME AND THAT ASSERTION ARE RETIRED HERE AND NOT SILENTLY DROPPED.**
//
// **WHY THE OLD FORM CANNOT SURVIVE, STATED PRECISELY: the old cell's two calls were `listen(address)`, which
// MINTED, so its `h1` and `h2` named the SAME registration observed twice and `h1 == h2` was the idempotent
// return's claim. With the mint gone (`contract.md §0.4`'s amended `Store::listen` row, 2026-10-18: *"POSITION
// `1` IS THE CALLER-SPELLED HANDLE, ADOPTED AND NOT MINTED … THE VERB DOES NOT MINT AND RETURNS NO HANDLE"*;
// `P: docs/pending.md · P-6`: *"You don't need to mint anything"*), two `listen` calls carry two CALLER-CHOSEN
// handles, and their equality is the CALLER's datum — a store cannot and need not assert it.**
//
// **THE OPERATIVE CLAUSES, EACH AT ITS OWN SUBJECT — AND EACH SCOPED TO ONE HANDLE IN BOTH POSITIONS:**
// **`docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 3** — *"THE SET IS AN ASSIGNMENT, NOT A
// UNION. **`listen(h, S2)` after `listen(h, S1)`** DESTROYS `S1` WHOLLY AND INSTALLS `S2` … **`listen(h, S1)`
// then `listen(h, S1)`** IS IDEMPOTENT ONLY IN EFFECT — purge then reinstall the same set — and never by a fast
// path"*; **`§5.2` `P-HL-2`** — *"THE PURGE IS BY HANDLE and it never enumerates and never consults a count"*,
// whose strategy `S-PURGE-SET` reads *"`listen(h, S1)` then `listen(h, S2)`: the standing set is `S2` alone and
// never `S1 ∪ S2`"* and whose `test-cases.md` `V-4`/`V-5` rows carry the same single `h`; **and `LF-7`**
// (`listen-verb.md §8`), the fail row about a boot path that did not go through `listen`. **THE RULING THAT
// DELETED THE IDEMPOTENCE NAMES THE SAME SCOPE: `kernel-selection.md §2.3`'s `R-B1` — *"Purge wins — delete
// `first_at`'s idempotence"*** — removes the *"already registered, so mint nothing"* arm and leaves the
// per-handle assignment standing.
//
// **THE STATES THIS MODEL ENUMERATES, EACH WITH ITS DECLARED ANSWER:**
//   (1) `listen(h, S1)` then `listen(h, S2)`, disjoint — **the standing set is `S2` ALONE: `S1`'s addresses
//       fire NOTHING and `S2`'s fire `h`** (§2.2 item 3; `§5.2`'s `S-PURGE-SET`, the union refused);
//   (2) `listen(h, S1)` then `listen(h, S1)` — **idempotent IN EFFECT: ONE entry and ONE fire, by purge then
//       reinstall and never a fast path** (§2.2 item 3's closing sentence);
//   (3) the address set's distinctness — **ONE distinct address per act, unmoved** (§6.5 item 2's kept half;
//       item 13);
//   (4) `unlisten(h)` after (1) — **removes ONE entry and no other registration** (§6.5 item 12).
// Drives: held-listener `contract.md §2.2` item 3; `§5.2` `P-HL-2`'s `S-PURGE-SET`; `LF-7`; §5.8 (a), (e);
// §6.5 items 2, 12, 13
#[test]
fn hl_2_2_a_repeated_listen_is_an_assignment_over_the_handles_own_set() {
    // (1) THE SAME HANDLE AT A DIFFERENT SET: `S1` DESTROYED WHOLLY, `S2` INSTALLED — THE UNION IS REFUSED.
    let mut store = new_store();
    let h = handle("wa-h9-assigned");
    ok(
        store.listen(&h, &[key(&["a"])]),
        "§2.2 item 3 / §5.2's `S-PURGE-SET`: `listen(h, S1)` — one handle at one address",
    );
    ok(
        store.listen(&h, &[key(&["b"])]),
        "§2.2 item 3: `listen(h, S2)` — `S1` DESTROYED WHOLLY and `S2` installed; the standing set is `S2` \
         ALONE and never `S1` ∪ `S2`",
    );
    let at_a = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at the RETIRED address",
    );
    assert!(
        at_a.triggered.is_empty() && at_a.watched.is_empty(),
        "§5.2's `S-PURGE-SET`: *\"the standing set is `S2` alone and never `S1` ∪ `S2`\"* — the address the \
         earlier act named fires NOTHING, because the second act purged it rather than uniting with it. \
         (`R-B1`'s *\"Purge wins\"* is this assertion, and the retired `first_at` arm is what it deletes.)"
    );
    let at_b = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at the installed address",
    );
    assert!(
        same_handle_set(&at_b.triggered, &one_handle(&h)),
        "§2.2 item 3/§5.8 (a): the installed set `S2` fires the ONE handle, and no member is added or omitted"
    );

    // (2) THE SAME HANDLE AT THE SAME SET AGAIN: idempotent IN EFFECT, never by a fast path.
    ok(
        store.listen(&h, &[key(&["b"])]),
        "§2.2 item 3's closing sentence: *\"`listen(h, S1)` then `listen(h, S1)` IS IDEMPOTENT ONLY IN \
         EFFECT — purge then reinstall the same set — and never by a fast path\"*",
    );
    let again = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&again.triggered, &one_handle(&h)),
        "§2.2 item 3: the purge ran and the reinstall restored ONE entry — so the trigger fires `h` ONCE \
         and a DUPLICATED member (§5.8's failure list) is exactly what this act must not produce"
    );

    // (3) THE ADDRESS SET'S DISTINCTNESS IS UNMOVED BY EITHER ACT (§6.5 item 2 kept; item 13).
    assert!(
        same_address_set(&again.watched, &[key(&["b"])]),
        "§6.5 item 2's KEPT half/item 13: *\"the distinctness of the returned address set\"* is carried \
         unchanged — ONE distinct address per act"
    );

    // (4) `unlisten` DROPS ONE ENTRY AND NO OTHER REGISTRATION (§6.5 item 12).
    ok(
        store.unlisten(&h),
        "§6.5 item 12: *\"it drops ONE home-map entry\"* — the entry this handle names",
    );
    let after = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(3.0)),
        "§3.4 W-3",
    );
    assert!(
        after.triggered.is_empty(),
        "§6.5 item 12: the withdrawn handle's entry is gone, so nothing fires at the address"
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
    let h_tag = handle("wa-h11");
    let h = h_tag.clone();
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
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
    let handle_tag = handle("wa-h12");
    let bound = handle_tag.clone();
    ok(store.listen(&bound, &[key(&["a"])]), "§6.5 item 12");
    ok(store.unlisten(&bound), "§6.5 item 12");
    ok(
        store.unlisten(&bound),
        "§6.5 item 12: an unknown handle is a no-op success",
    );
    let other_tag = handle("wa-h13");
    let other = other_tag.clone();
    ok(store.listen(&other, &[key(&["b"])]),
        "§6.5 item 12: a registration that must survive",
    );
    ok(
        store.unlisten(&bound),
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
    let foreign_tag = handle("wa-h14");
    let foreign = foreign_tag.clone();
    ok(b.listen(&foreign, &[key(&["a"])]),
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

// **⟶ RE-DERIVED 2026-10-18 — `LF-2`, THE SET POSITION'S OUTSIDE VALUES** (`listen-verb.md §8`'s `LF-2`
// row: *"`listen`'s set position outside the domain | one of `§2.2` item 2's six classes | the same form,
// `AddressMalformed` | the thrown object; the HOME's entry count unmoved"*; `§2.2` item 2's six classes:
// *"ABSENT · `null` · `undefined` · a non-array · an array carrying a member outside the store's address
// domain · an array carrying a nested array-of-arrays that is not itself an address"*).
//
// **THE SIGNATURE MOVED AND THE DRIVE'S SUBJECT MOVED WITH IT** (`contract.md §0.4`'s amended
// `Store::listen` row, 2026-10-18: position `2` is `addresses: &[Vec<Segment>]` — THE SET). So the outside
// values are the domain's OUTSIDE SEGMENTS carried INSIDE the set — the class this drive can spell — each
// answered `AddressMalformed` with the generator's own message. **THE RUST SPELLING CANNOT EXPRESS the four
// NON-ARRAY classes (`Absent`/`null`/`undefined`/a non-array) at this position**, because the parameter's
// type admits only a slice of segment lists: **that is a TYPE-REPRESENTABILITY SKIP, reported and not
// hidden** — those four classes are declared UNREPRESENTABLE at the Rust signature exactly as `§0.4`'s
// permissive argument types make the equivalent classes REACHABLE at the permissive positions (`AddressArg`,
// `ListenersArg`), and `listen`'s second position is declared as a plain `&[Vec<Segment>]` with no
// permissive carrier of its own.
//
// **AND THE REFUSAL REACHES NO STORE ACT** (`listen-verb.md §2.2` item 3; the verb's own body validates the
// whole set FIRST, so a malformed member refuses before the purge runs): the home's entry count is asserted
// UNMOVED, which is `LF-2`'s declared observable.
// Drives: `LF-2`, §2.2 item 2, §1.5, §8.1 #1
#[test]
fn lf_2_a_malformed_listen_address_set_member_fails_address_malformed() {
    // THE FOUR STATES THIS DRIVE ENUMERATES, each an OUTSIDE SEGMENT CLASS (`§1.5` item 1's outside list,
    // spelled as `Segment`'s variants by `§0.4`): a negative index · a fractional index · `null` ·
    // `undefined`. Every one is carried INSIDE the set's one address, so the refusal is the SET POSITION's.
    let mut store = new_store();
    let bound = handle("wa-lf2-live");
    ok(
        store.listen(&bound, &[key(&["kept"])]),
        "a lawful registration whose entry must SURVIVE the refusals",
    );
    for (class, segment) in [
        ("a negative index", Segment::Negative(-1)),
        ("a fractional index", Segment::Fractional(1.5)),
        ("`null`", Segment::Null),
        ("`undefined`", Segment::Undefined),
    ] {
        let h = handle(&format!("wa-lf2-{}", class.replace([' ', '`'], "-")));
        let e = failure(
            store.listen(&h, &[vec![Segment::Key("a".into()), segment.clone()]]),
            "§2.2 item 2 / LF-2: an array carrying a member outside the store's address domain",
        );
        assert_code(
            &e,
            "AddressMalformed",
            &format!("LF-2 ({class}): the set position's outside member → AddressMalformed"),
        );
    }
    // LF-2's declared observable: **the HOME's entry count unmoved** — the surviving registration still
    // fires, and no refused call installed or purged anything.
    let w = ok(
        store.write(AddressArg::List(key(&["kept"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&bound)),
        "LF-2: the home's entry count is UNMOVED by every refusal"
    );
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
    let bound_tag = handle("wa-h16");
    let bound = bound_tag.clone();
    ok(store.listen(&bound, &[key(&["a"])]),
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
    let h_tag = handle("wa-h17");
    let h = h_tag.clone();
    ok(store.listen(&h, &[key(&["a"])]), "§6.5 item 12");
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
    let own_tag = handle("wa-h18");
    let own = own_tag.clone();
    ok(store.listen(&own, &[key(&["a"])]),
        "§6.5 item 12: the deleted address's own listener",
    );
    let ancestor_tag = handle("wa-h19");
    let ancestor = ancestor_tag.clone();
    ok(store.listen(&ancestor, &[key(&["a", "b"])]),
        "§6.5 item 12: a strict DESCENDANT of the deleted address",
    );
    let mut store2 = new_store();
    let top_tag = handle("wa-h20");
    let top = top_tag.clone();
    ok(store2.listen(&top, &[key(&[])]),
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
        !triggered_handles(&d1.triggered).contains(&ancestor),
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
    let h_tag = handle("wa-h21");
    let h = h_tag.clone();
    ok(store.listen(&h, &[key(&["r"])]),
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
    let h1_tag = handle("wa-h22");
    let h1 = h1_tag.clone();
    ok(w1.listen(&h1, &[key(&["a"])]), "§6.5 item 12");
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
    let h2_tag = handle("wa-h23");
    let h2 = h2_tag.clone();
    ok(w2.listen(&h2, &[key(&["a"])]), "§6.5 item 12");
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
    let h6_tag = handle("wa-h24");
    let h6 = h6_tag.clone();
    ok(w6.listen(&h6, &[key(&["a"])]), "§6.5 item 12");
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
    let h_tag = handle("wa-h25");
    let h = h_tag.clone();
    ok(store.listen(&h, &[key(&["never-written"])]),
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

// ===================================================================================================
// **⟶ ADDED 2026-10-11 — THE `K7`/`A67` SET: THE HANDLE'S PER-INSTANCE UNIQUENESS DOMAIN, DRIVEN AT ITS
// REACHABLE HALF.** **THE AUTHORITY, NAMED: `contract.md §0.4`'s `ListenerHandle` construction-rule clause 2
// (**a store-minted handle is unique per instance and per session**) and clause 3 (EVERY outside value — *"a
// value a FOREIGN instance minted · a value THIS instance minted in a PRIOR SESSION · a value the store never
// minted at all (fabricated)"* — is *"answered EXACTLY as `PAR-13` declares: at `unlisten`, a NO-OP SUCCESS,
// producing NO code and removing NO other registration"*); `parameter-semantics.md`'s `PAR-13` (§2.13, the
// same three outside values with the same answer); `write-and-read.md §6.5` item 12; and `DD-42` (a mint must
// not collide with a token the home already holds).** **`K7` IS THE MEASURED DEFECT THESE CELLS DRIVE, and
// `A67` (*"use recommended"*) is the ruling that makes the declared scoping the mint's own duty.**
//
// **THE STATES, ENUMERATED BEFORE THEY ARE DRIVEN, EACH WITH THE ANSWER A CLAUSE DECLARES:**
// **(1a)** instance A's handle at instance B's `unlisten`, where B holds its own registration — NO-OP SUCCESS,
// no code, and B's home UNCHANGED (its trigger set and its watched-address set exactly as before);
// **(1b)** the same over a SECOND INSTANCE built on the SAME `cfg.filePath` (`DD-38`/`§7.2` item 6: the boot
// loads NO registration, so the second instance's home begins empty);
// **(1c)** a FABRICATED handle (spelled by the caller, `§0.4` clause 1) — the same answer;
// **(1d)** a handle a THIRD instance minted and then withdrew in its own home — a value the fourth instance
// never minted at all — the same answer;
// **(2)** two instances each minting for their OWN address: each instance's `triggered` carries only its own
// handle and no cross-firing occurs, and NEITHER instance's `unlisten` removes the OTHER's registration;
// **(3)** `DD-42`'s mint rule in its PER-INSTANCE form: a caller-adopted token that the instance's own mint
// would otherwise produce is NOT re-produced by a later mint in the SAME instance.
// **THE ONE SKIP, REPORTED AND NOT HIDDEN: the PRIOR-SESSION state ITSELF (a value minted by a process that
// no longer exists) has NO in-process drive** — `session` IS the process (`§6.1` item 3) and this crate
// declares NO reload verb — **so (1a)/(1b) drive the reachable half of the same declared rule: two instances
// in one process share exactly the namespace a reload shares, which is how `K7` measured the defect.**
// ===================================================================================================

// `PAR-13` + `§0.4` clause 3 + `§6.5` item 12 — **a FOREIGN instance's handle, a FABRICATED handle and a
// handle no home of the instance holds are each a NO-OP SUCCESS at `unlisten`, producing NO code and removing
// NO other registration.** **THE DRIVES BELOW REACH THE RULE `K7` MEASURED AS UNREACHABLE**: the declared
// per-instance/per-session scoping is TRUE exactly when a value one instance minted is not a value another
// instance minted, so the foreign value lies OUTSIDE the other instance's domain and `unlisten` over it
// cannot name that instance's entry.
// Drives: PAR-13 (§2.13), §0.4 clause 2, §0.4 clause 3, §6.5 items 8 (d)/12, §5.8 (a), §6.1 item 3, DD-38,
// §7.2 item 6, §3.4 W-3, A67/K7
#[test]
fn par_13_a_foreign_instance_s_handle_is_a_no_op_success_and_the_other_instance_is_untouched() {
    // (1a) TWO INDEPENDENT INSTANCES IN ONE PROCESS, EACH HOLDING ITS OWN REGISTRATION.
    let mut a = new_store();
    let mut b = new_store();
    let ha_tag = handle("wa-h26");
    let ha = ha_tag.clone();
    ok(a.listen(&ha, &[key(&["ax"])]),
        "§6.5 item 12: instance A mints its own handle",
    );
    let hb_tag = handle("wa-h27");
    let hb = hb_tag.clone();
    ok(b.listen(&hb, &[key(&["by"])]),
        "§6.5 item 12: instance B mints its own handle",
    );
    let b_before = ok(
        b.write(AddressArg::List(key(&["by"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: B's own registration fires before the foreign withdrawal",
    );
    assert!(
        same_handle_set(&b_before.triggered, &one_handle(&hb)),
        "§5.8 (a): B's home holds exactly B's own registration before the foreign withdrawal"
    );
    ok(
        b.unlisten(&ha),
        "PAR-13: *\"the foreign, the prior-session and the fabricated alike — is a NO-OP SUCCESS, and NOT a \
         failure: no code is produced\"* — §0.4 clause 3's answer for *\"a value a FOREIGN instance \
         minted\"*",
    );
    let b_after = ok(
        b.write(AddressArg::List(key(&["by"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: B's own registration after the foreign withdrawal",
    );
    assert!(
        same_trigger_set(&b_after.triggered, &b_before.triggered),
        "PAR-13: *\"removing NO other registration\"* — B's trigger set is EXACTLY what it was. A mint whose \
         tokens COINCIDE across two instances makes A's handle name B's OWN entry, so §0.4 clause 2's *\"a \
         store-minted handle is unique per instance and per session\"* would be FALSE of the mint (K7, A67) \
         and this declared answer unreachable; the assertion is not weakened for that state."
    );
    assert!(
        same_address_set(&b_after.watched, &b_before.watched),
        "PAR-13/§6.5 item 8 (d): B's HOME is unchanged — the watched-address set it carries is the same set"
    );
    // A's own registration is not in B's home at all: a write at A's address in B fires nothing...
    let crossed = ok(
        b.write(AddressArg::List(key(&["ax"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at the other instance's own address",
    );
    assert!(
        crossed.triggered.is_empty(),
        "§6.5 item 8 (d)/§5.8 (a): A's registration is A's home's — B holds no listener there, so no handle \
         is returned (*\"a handle returned where no listener's address is a prefix\"* is the row's failure)"
    );
    // ...and A's own registration is untouched by B's withdrawal.
    let a_after = ok(
        a.write(AddressArg::List(key(&["ax"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: A's own registration",
    );
    assert!(
        same_handle_set(&a_after.triggered, &one_handle(&ha)),
        "§6.5 item 12: A's registration stands — B's call removed nothing of A's"
    );

    // (1b) THE SAME RULE ACROSS A SECOND INSTANCE BUILT ON THE SAME `cfg.filePath`. **`DD-38`/`§7.2` item 6
    // make the boot load NO registration**, so the second instance's home begins EMPTY while the first
    // instance's own registration stands — and the second instance's `unlisten` over the FIRST's handle is
    // still the declared NO-OP SUCCESS.
    let path = fresh_path("par-13-same-path");
    let mut p = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.1: the first instance over the path",
    );
    let hp_tag = handle("wa-h28");
    let hp = hp_tag.clone();
    ok(p.listen(&hp, &[key(&["p1"])]),
        "§6.5 item 12: the first instance's registration",
    );
    let mut q = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.1: a SECOND instance over the SAME `cfg.filePath`",
    );
    let q_seed = ok(
        q.write(AddressArg::List(key(&["q1"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: the second instance's first write",
    );
    assert!(
        q_seed.triggered.is_empty(),
        "DD-38/§7.2 item 6: *\"a fresh instance over an equal `cfg.filePath` loads NO registration\"* — the \
         home is instance- and session-scoped and out of the `file` bytes"
    );
    let hq_tag = handle("wa-h29");
    let hq = hq_tag.clone();
    ok(q.listen(&hq, &[key(&["q1"])]),
        "§6.5 item 12: the second instance's OWN registration",
    );
    ok(
        q.unlisten(&hp),
        "PAR-13: the OTHER instance's handle — the same `cfg.filePath`, a different instance — is still a \
         NO-OP SUCCESS",
    );
    let q_after = ok(
        q.write(AddressArg::List(key(&["q1"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the second instance's own registration",
    );
    assert!(
        same_handle_set(&q_after.triggered, &one_handle(&hq)),
        "PAR-13: the second instance's own registration survives the other instance's handle — *\"removing NO \
         other registration\"*"
    );
    let p_after = ok(
        p.write(AddressArg::List(key(&["p1"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the first instance's own registration",
    );
    assert!(
        same_handle_set(&p_after.triggered, &one_handle(&hp)),
        "§6.5 item 12: and the first instance's registration is untouched — the two homes are separate"
    );

    // (1c) A FABRICATED HANDLE — *\"a value the store never minted at all\"*, spelled by the caller through
    // §0.4 clause 1's ONE public constructor.
    let fabricated = handle("par-13-fabricated-never-minted");
    ok(
        b.unlisten(&fabricated),
        "PAR-13: *\"a value the store never minted at all (fabricated)\"* → a NO-OP SUCCESS, no code",
    );
    let b_fab = ok(
        b.write(AddressArg::List(key(&["by"])), w_mem(), v_num(3.0)),
        "§3.4 W-3: B's own registration after the fabricated withdrawal",
    );
    assert!(
        same_trigger_set(&b_fab.triggered, &b_before.triggered),
        "PAR-13: and NO other registration is removed by the fabricated value"
    );

    // (1d) A HANDLE A THIRD INSTANCE MINTED AND WITHDREW IN ITS OWN HOME — a value a fourth instance never
    // minted and never held, which is the same outside case reached from the other side.
    let mut c = new_store();
    let hc_tag = handle("wa-h30");
    let hc = hc_tag.clone();
    ok(c.listen(&hc, &[key(&["cx"])]),
        "§6.5 item 12 in a third instance",
    );
    ok(
        c.unlisten(&hc),
        "§6.5 item 12: withdrawn in its OWN instance — its home now holds no such value",
    );
    let mut d = new_store();
    let hd_tag = handle("wa-h31");
    let hd = hd_tag.clone();
    ok(d.listen(&hd, &[key(&["dy"])]),
        "§6.5 item 12 in a fourth instance",
    );
    ok(
        d.unlisten(&hc),
        "PAR-13: a value no home of this instance holds → a NO-OP SUCCESS, no code",
    );
    let d_after = ok(
        d.write(AddressArg::List(key(&["dy"])), w_mem(), v_num(1.0)),
        "§3.4 W-3: the fourth instance's own registration",
    );
    assert!(
        same_handle_set(&d_after.triggered, &one_handle(&hd)),
        "PAR-13: no other registration is removed — the fourth instance's own entry stands"
    );
}

// `PAR-13` + `§0.4` clauses 2 and 3 — **THE PER-INSTANCE UNIQUENESS CELL: A's handle never names B's entry
// and B's handle never names A's entry.** **WHAT THE TWO TOKENS' TEXT IS, IS NOT THIS CELL'S SUBJECT AND IS
// NOT ASSERTED:** **whether the two instances' minted tokens COINCIDE is exactly the state the mint must
// make irrelevant — *\"unique per instance and per session\"* is a claim about the BEHAVIOUR the declared
// domain produces, not about how the token reads** — so the cell asserts the four behaviours the clauses
// declare and nothing about the tokens' spelling: **(a)** each instance's `triggered` returns only its OWN
// handle for its OWN address; **(b)** no CROSS-FIRING occurs at either instance's address; **(c)** neither
// instance's `unlisten` removes the OTHER's registration (`§0.4` clause 3's *"removing NO other
// registration"*); **(d)** each instance's OWN withdrawal still removes its own entry (`§6.5` item 12:
// *\"it drops ONE home-map entry\"*), so the no-op half costs the withdrawal nothing.
// Drives: PAR-13 (§2.13), §0.4 clause 2, §0.4 clause 3, §6.5 items 8 (d)/10 (d)/12, §5.8 (a), §3.4 W-3, A67
#[test]
fn par_13_two_instances_never_cross_name_each_other_s_registrations() {
    let mut a = new_store();
    let mut b = new_store();
    let x = key(&["ax"]);
    let y = key(&["by"]);
    let ha_tag = handle("wa-h32");
    let ha = ha_tag.clone();
    ok(a.listen(&ha, &[x.clone()]),
        "§6.5 item 12: A mints for its OWN address X",
    );
    let hb_tag = handle("wa-h33");
    let hb = hb_tag.clone();
    ok(b.listen(&hb, &[y.clone()]),
        "§6.5 item 12: B mints for its OWN address Y",
    );

    // (a) EACH INSTANCE'S `triggered` CARRIES ONLY ITS OWN HANDLE, FOR ITS OWN ADDRESS.
    let a_at_x = ok(
        a.write(AddressArg::List(x.clone()), w_mem(), v_num(1.0)),
        "§3.4 W-3 at A's own address",
    );
    assert!(
        same_handle_set(&a_at_x.triggered, &one_handle(&ha)),
        "§5.8 (a)/§6.5 item 10 (d): A's write at its own address returns exactly A's own handle — B's \
         registration is not in A's home"
    );
    let b_at_y = ok(
        b.write(AddressArg::List(y.clone()), w_mem(), v_num(1.0)),
        "§3.4 W-3 at B's own address",
    );
    assert!(
        same_handle_set(&b_at_y.triggered, &one_handle(&hb)),
        "§5.8 (a): B's write at its own address returns exactly B's own handle"
    );

    // (b) NO CROSS-FIRING: each instance's write at the OTHER's address fires nothing of the other's home.
    let a_at_y = ok(
        a.write(AddressArg::List(y.clone()), w_mem(), v_num(2.0)),
        "§3.4 W-3 at B's address, in A",
    );
    assert!(
        a_at_y.triggered.is_empty(),
        "§6.5 item 8 (d)/§5.8 (a): A holds no listener at B's address — B's registration does not live in \
         A's home"
    );
    let b_at_x = ok(
        b.write(AddressArg::List(x.clone()), w_mem(), v_num(2.0)),
        "§3.4 W-3 at A's address, in B",
    );
    assert!(
        b_at_x.triggered.is_empty(),
        "§6.5 item 8 (d)/§5.8 (a): and B holds no listener at A's address"
    );

    // (c) NEITHER INSTANCE'S `unlisten` REMOVES THE OTHER'S REGISTRATION.
    ok(
        b.unlisten(&ha),
        "PAR-13: A's handle at B's `unlisten` → a NO-OP SUCCESS, no code",
    );
    let b_after = ok(
        b.write(AddressArg::List(y.clone()), w_mem(), v_num(3.0)),
        "§3.4 W-3 at B's own address after A's handle",
    );
    assert!(
        same_handle_set(&b_after.triggered, &one_handle(&hb)),
        "§0.4 clause 2/clause 3 + PAR-13: B's OWN registration survives A's handle. Where the two instances' \
         minted tokens coincide, `unlisten` over the foreign value names B's OWN entry — the per-instance \
         uniqueness domain §0.4 clause 2 declares is then not realized by the mint (K7, A67), and the cell \
         reports that state rather than accommodating it."
    );
    ok(
        a.unlisten(&hb),
        "PAR-13: B's handle at A's `unlisten` → a NO-OP SUCCESS, no code",
    );
    let a_after = ok(
        a.write(AddressArg::List(x.clone()), w_mem(), v_num(3.0)),
        "§3.4 W-3 at A's own address after B's handle",
    );
    assert!(
        same_handle_set(&a_after.triggered, &one_handle(&ha)),
        "§0.4 clause 2/clause 3 + PAR-13: and A's OWN registration survives B's handle"
    );

    // (d) THE NO-OP HALF COSTS THE WITHDRAWAL NOTHING: A's OWN `unlisten` still removes A's OWN entry.
    ok(
        a.unlisten(&ha),
        "§6.5 item 12: A withdraws its OWN registration",
    );
    let a_gone = ok(
        a.write(AddressArg::List(x.clone()), w_mem(), v_num(4.0)),
        "§3.4 W-3 at A's own address after A's own withdrawal",
    );
    assert!(
        a_gone.triggered.is_empty(),
        "§6.5 item 12: *\"it drops ONE home-map entry\"* — A's own withdrawal removed A's own registration"
    );
}

// **⟶ RETIRED 2026-10-18 — THIS CELL HAS NO SUBJECT, AND ITS RETIREMENT IS RECORDED RATHER THAN SILENTLY
// DELETED. THE CELL WAS `dd_42_the_mint_never_takes_a_token_the_instance_s_home_already_holds`.**
//
// **WHAT IT DROVE AND WHY EACH PIECE IS GONE:**
//   (1) **THE MINT** — the cell's first act observed *"the token a fresh instance's FIRST mint yields"* from
//       a sibling instance and asserted the instance's own later mint SKIPPED it. **`listen` DOES NOT MINT**
//       (`contract.md §0.4`'s amended `Store::listen` row, 2026-10-18: *"POSITION `1` IS THE CALLER-SPELLED
//       HANDLE, ADOPTED AND NOT MINTED … THE VERB DOES NOT MINT AND RETURNS NO HANDLE"*; `listen-verb.md §1`
//       item 2; `P: docs/pending.md · P-6`, verbatim: *"You don't need to mint anything. The handle is
//       already a unique identifier."*), so there is no token to observe and no candidate to collide with.
//   (2) **THE SKIP LOOP** — the cell's assertion text quoted **`DD-42`: *"`listen` MUST NOT MINT A TOKEN EQUAL
//       TO ANY TOKEN THE HOME ALREADY HOLDS — the mint that would collide SKIPS the colliding token and mints
//       the next one"***. **THE SKIP LOOP IS DELETED WITH THE MINT:** `kernel-selection.md §2.3`'s `R-B1`
//       ruling (*"Purge wins — delete `first_at`'s idempotence"*), its item (iii): *"`src/store.rs:406-411`'s
//       mint skip loop already has no subject (nothing mints) and the `holds_token` guard goes with it"*;
//       `held-listener contract.md §2.8` item 2 (3) names the same two spans for deletion.
//   (3) **`holds_token`** — the guard the skip loop read (`src/store.rs:397-401`). **DELETED at the same
//       ruling and the same spans** (`kernel-selection.md §2.3`, item (iii)); no surface name, no record and
//       no observable ever carried it, so nothing in a red set can reach it.
//
// **THE RULINGS THAT RETIRE IT, NAMED AS THE FINDING REQUIRES: `P: docs/pending.md · P-6`'s minting ruling
// (`HL-DD-1` at `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 1, whose `what it pins`
// cell reads *"nothing mints — no counter, no UUID, no scalar, no skip loop"*) READ WITH `P: docs/pending.md ·
// R-B1` (`kernel-selection.md §2.3`), `DD-42`'s own row at `contract.md §7` and `DD-51`'s — both of which
// stand as dated history and are read THROUGH their `RCA-8(g)` pointers.**
//
// **AND WHAT IS *NOT* RETIRED, SO THE RETIREMENT IS NOT READ AS A GAP: `DD-42`'s CLAUSE (2) STATES A CLAIM
// THAT SURVIVES AND IT IS DRIVEN ELSEWHERE IN THIS FILE** — *"the construction's ADOPTION is UNTOUCHED … TWO
// CALLER-SPELLED entries … MAY carry the SAME token, and in THAT state `triggered` MAY carry that token twice
// and `unlisten` over it removes the FIRST match"* (`contract.md §7`'s amended `DD-42` clause (2)–(3)).
// **`s6_5_item_14_*` and the `DD-39` duplicate-token cell below drive the adopted-token states, the
// duplicated-`triggered` member and the first-match `unlisten`**; the unique-token requirement itself is now
// **the CALLER's datum, not a mint's product** (`HL-DD-1`: *"the store holds AT MOST ONE LIVE ENTRY PER
// HANDLE STRING"*), which is `PAR-13`'s domain and is asserted at `par_13_a_fabricated_handle_is_a_no_op_success`
// and its siblings.
// Retired by: P-6 (minting) · R-B1 (first_at's idempotence); HL-DD-1; §0.4's amended `Store::listen` row;
// kernel-selection.md §2.3 item (iii); held-listener contract.md §2.8 item 2 (3)
#[test]
fn dd_42_retired_the_handle_mint_does_not_exist_so_its_collision_rule_has_no_subject() {
    // **THE RETIREMENT'S ONE REMAINING, LAWFUL OBSERVABLE: a pathless construction adopts a caller-spelled
    // token VERBATIM, and the verb installs an entry under it** — `§0.4` construction-rule clause 2 (adopted
    // VERBATIM, `DD-39`), which is what survives of the retired cell's ADOPTION half. `DD-42`'s mint half has
    // no subject and no drive: nothing mints (`HL-DD-1`), so no cell may assert a skip.
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("dd-42-retired"),
            8,
            listeners(vec![entry(key(&["adopted"]), handle("dd42-adopted"))]),
        )),
        "§0.4 clause 2 (b)/DD-39: the construction ADOPTS the caller's token VERBATIM",
    );
    let at_adopted = ok(
        store.write(AddressArg::List(key(&["adopted"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at the construction's own address",
    );
    assert!(
        same_handle_set(&at_adopted.triggered, &one_handle(&handle("dd42-adopted"))),
        "§6.5 item 8 (d)/§0.4 clause 2 (b): the ADOPTED entry fires the CALLER'S token — the surviving half \
         of DD-42's rule, which needs no mint to hold"
    );
}

// **⟶ ADDED 2026-10-11 (`role_test_writer`) — THE DRIVE FOR `write-and-read.md §6.5` ITEM 14 (d)–(e), THE
// `A78`/`CF-DUP-3` CLAUSE: WHAT A TRIGGER'S RETURNED SET CONTAINS, AND WHEN A LATER `listen` TAKES EFFECT.**
// **NO CELL OF ANY RED SET DROVE THIS RULE — it is authored here, in the STORE's own red set, at the surface
// the clause declares it a property of** (`§6.5` item 14 (d): *"AND THIS IS A PROPERTY OF THE STORE'S LISTENER
// SURFACE AND NOT OF ANY CONSUMER'S DELIVERY"*).
//
// **THE CLAUSE, AT ITS OWN BYTES — `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d):** **"WHAT
// A TRIGGER'S RETURNED SET CONTAINS IS WHAT THE HOME HELD WHEN THE TRIGGER WAS COMPUTED. A `listen` OR AN
// `unlisten` THAT LANDS AFTER A TRIGGER HAS BEEN COMPUTED CANNOT ALTER THAT TRIGGER'S RETURNED SET: IT TAKES
// EFFECT AT THE NEXT ONE."** **AND ITEM 14 (e) (i), the arm this cell drives:** *"WHERE ITS ADDRESS WAS NOT IN
// THE HOME AT THE TRIGGER'S OWN COMPUTATION, THE TRIGGER'S RETURNED SET DOES NOT CARRY IT — the new
// registration's handle is returned by THE NEXT trigger whose prefix test it satisfies, and by nothing
// earlier"*, **with the clause's own licence for the drive's form** (`§6.5` item 14 (f)): *"a drive asserts
// WHICH handles a trigger returned and at WHICH trigger, never where in a list they stood"* (`§6.5` item 10
// (e); `DD-37`).
//
// **BOTH HALVES ARE ASSERTED, AND NEITHER IS AN INFERENCE FROM THE OTHER:** **(1) THE EARLIER SET STANDS AS
// RETURNED** — the caller's own `WriteResult` keeps exactly the handle the home held at its computation, and
// the newcomer's handle is NOT in it; **(2) THE NEXT TRIGGER REFLECTS THE CHANGE** — the second write at an
// address the newcomer's own address is a prefix of carries BOTH handles, and the newcomer's registration is
// therefore not lost, deferred past its own trigger, or folded into a set the earlier computation returned.
// **The two observables are read off the RETURNED RECORDS themselves, never off the home, which no declared
// verb exposes** (`§6.5` item 8 (b)/(c)/(e); the home is outside the graph and outside every read).
// Drives: §6.5 item 14 (d); §6.5 item 14 (e) (i), its first arm; §6.5 item 10 (d) (iii); §6.5 items 8 (a)/10
// (e)/11/12; §5.8 (a); §3.4 W-3/W-4; A78; DD-37
#[test]
fn s6_5_item_14_d_a_listen_landing_after_a_trigger_takes_effect_at_the_next_trigger_only() {
    let mut store = new_store();
    let early_tag = handle("wa-h36");
    let early = early_tag.clone();
    ok(store.listen(&early, &[key(&["a"])]),
        "§6.5 item 12: the ONE entry the home holds at the FIRST trigger's computation",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the branch at `a`",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the branch at `a.b`, so the SECOND write's address resolves through it — the container \
         chain is created BEFORE the newcomer's address is registered, so nothing but the newcomer's \
         `listen` moves the home between the two triggers",
    );
    // (0) THE FIRST TRIGGER, RETURNED AND HELD BY THE CALLER.
    let first = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&first.triggered, &one_handle(&early)),
        "§6.5 item 14 (d) pre-condition: the home held EXACTLY this one entry when the FIRST trigger was \
         computed"
    );
    let first_triggered = first.triggered.clone();
    // (1) THE `listen` THAT LANDS AFTER THAT COMPUTATION — a NEW address, so the home GAINS an entry.
    let newcomer_tag = handle("wa-h37");
    let newcomer = newcomer_tag.clone();
    ok(store.listen(&newcomer, &[key(&["a", "b", "c"])]),
        "§6.5 item 12: the newcomer's address was NOT in the home at the first trigger's computation",
    );
    assert!(
        newcomer != early,
        "§6.5 item 12: a NEW address is a MINT — the newcomer is not the entry the first trigger returned"
    );
    // (2) THE EARLIER SET STANDS AS RETURNED AND IS NOT RE-DERIVED, RE-READ OR AMENDED.
    assert!(
        !triggered_handles(&first_triggered).contains(&newcomer),
        "§6.5 item 14 (d): *\"a `listen` … that lands after a trigger has been computed CANNOT ALTER THAT \
         TRIGGER'S RETURNED SET\"* — the newcomer's handle is not in the set the first trigger returned"
    );
    assert!(
        same_handle_set(&first_triggered, &one_handle(&early)),
        "§6.5 item 14 (d): *\"the set a computed trigger carries is FIXED AT THE MOMENT OF ITS COMPUTATION and \
         is not re-read, re-derived or amended afterwards\"* — the returned set still answers the ONE entry \
         the home held then, and its membership has not moved"
    );
    // (3) THE NEXT TRIGGER CARRIES THE NEWCOMER — the change took effect at the NEXT one, and by nothing
    //     earlier.
    let second = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the SECOND trigger, computed over the home as it now stands",
    );
    assert_eq!(
        second.triggered.len(),
        2,
        "§6.5 item 14 (e) (i): the newcomer's handle *\"is returned by THE NEXT trigger whose prefix test it \
         satisfies\"* — the home now holds two entries whose addresses are prefixes of this write's"
    );
    assert!(
        triggered_handles(&second.triggered).contains(&newcomer),
        "§6.5 item 14 (e) (i): the newcomer's handle IS returned by the next trigger"
    );
    assert!(
        same_handle_set(&second.triggered, &[early.clone(), newcomer.clone()]),
        "§6.5 item 10 (d) (iii)/§5.8 (a): the SECOND trigger's set is EXACTLY the two home entries — the early \
         one is not lost by the newcomer's landing, and the newcomer is not carried twice"
    );
    // AND THE EARLIER RECORD IS STILL THE EARLIER ANSWER — read again AFTER the second trigger computed, so a
    // store that re-derived it would be caught here as well as at (2).
    assert!(
        same_handle_set(&first.triggered, &one_handle(&early)),
        "§6.5 item 14 (d): the FIRST record's returned set is unchanged after every later trigger too"
    );
}

// **⟶ ADDED 2026-10-11 (`role_test_writer`) — THE SYMMETRIC ARM: AN `unlisten` THAT LANDS AFTER A TRIGGER HAS
// BEEN COMPUTED** (`write-and-read.md §6.5` item 14 (e) (ii), the `A78`/`CF-DUP-3` clause's second case).
//
// **THE CLAUSE, AT ITS OWN BYTES — item 14 (e) (ii):** **"IT REMOVES ONE HOME ENTRY AND IT DOES NOT REWRITE
// THE SET THE EARLIER TRIGGER RETURNED: that set still carries the handle, because it is what the home held
// when the trigger was computed; the withdrawal's effect is that A LATER TRIGGER at an address the withdrawn
// listener's own address is a prefix of NO LONGER CARRIES THAT HANDLE."** **BOTH HALVES ARE ASSERTED HERE TOO:
// (1) THE EARLIER SET STILL CARRIES THE WITHDRAWN HANDLE — the withdrawal cannot reach back into a computed
// trigger — and (2) THE NEXT TRIGGER NO LONGER CARRIES IT, while a registration the withdrawal did NOT name
// still does.** **AND THE CLAUSE'S OWN NO-OP CLAUSE IS DRIVEN BESIDE THEM:** *"WHERE THE `unlisten` WAS ONE OF
// THE ITEM-4-CLASS NO-OP SUCCESSES — an unknown, a foreign, a prior-session, a fabricated or a non-handle
// value — IT REMOVED NOTHING AT ALL, so the home it leaves is the home the next trigger reads, unchanged"*
// (item 14 (e) (ii); `§6.5` item 12; `PAR-13`). **The order of the returned members is read by no assertion
// of this cell: every comparison is a SET comparison** (item 14 (e) (ii)'s closing sentence; item 10 (e);
// `DD-37`).
// Drives: §6.5 item 14 (d); §6.5 item 14 (e) (ii), both halves and its no-op clause; §6.5 item 10 (d) (iii);
// §6.5 items 8 (a)/10 (e)/11/12; §5.8 (a); §0.4 clause 3; PAR-13; §3.4 W-3/W-4; A78; DD-37
#[test]
fn s6_5_item_14_d_an_unlisten_landing_after_a_trigger_never_rewrites_the_set_it_returned() {
    let mut store = new_store();
    let doomed_tag = handle("wa-h38");
    let doomed = doomed_tag.clone();
    ok(store.listen(&doomed, &[key(&["a"])]),
        "§6.5 item 12: the entry this drive WITHDRAWS after the first trigger",
    );
    let standing_tag = handle("wa-h39");
    let standing = standing_tag.clone();
    ok(store.listen(&standing, &[key(&["a", "b"])]),
        "§6.5 item 12: the entry the withdrawal does NOT name — the kept half's control",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the branch at `a`",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the branch at `a.b`, so the SECOND and THIRD writes' address resolves through it — the \
         container chain is created BEFORE the withdrawal lands, so nothing but the withdrawal itself moves \
         the home between the first trigger and the next one",
    );
    // (0) THE FIRST TRIGGER, RETURNED AND HELD BY THE CALLER — BOTH entries are prefixes of this write.
    let first = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        first.triggered.len(),
        2,
        "§6.5 item 10 (d) (iii) pre-condition: both registrations' addresses are prefixes of this write"
    );
    assert!(
        same_handle_set(&first.triggered, &[doomed.clone(), standing.clone()]),
        "§6.5 item 14 (d) pre-condition: the home held EXACTLY these two entries when the FIRST trigger was \
         computed"
    );
    let first_triggered = first.triggered.clone();
    // (1) THE `unlisten` THAT LANDS AFTER THAT COMPUTATION — one home entry removed, and one entry only.
    ok(
        store.unlisten(&doomed),
        "§6.5 item 12: *\"it drops ONE home-map entry\"* — the entry this handle names",
    );
    // (2) THE EARLIER SET STILL CARRIES THE WITHDRAWN HANDLE: the withdrawal did not rewrite it.
    assert!(
        triggered_handles(&first_triggered).contains(&doomed),
        "§6.5 item 14 (e) (ii): *\"that set STILL CARRIES THE HANDLE, because it is what the home held when the \
         trigger was computed\"* — the withdrawal cannot reach back into a computed trigger"
    );
    assert!(
        same_handle_set(&first_triggered, &[doomed.clone(), standing.clone()]),
        "§6.5 item 14 (d): the returned set is not re-read, re-derived or amended afterwards — it still \
         answers the TWO home entries the home held then"
    );
    // (3) THE NEXT TRIGGER NO LONGER CARRIES IT, AND THE UNNAMED REGISTRATION STILL DOES.
    let second = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the SECOND trigger, computed over the home as it now stands",
    );
    assert!(
        !triggered_handles(&second.triggered).contains(&doomed),
        "§6.5 item 14 (e) (ii): *\"a LATER trigger at an address the withdrawn listener's own address is a \
         prefix of NO LONGER CARRIES THAT HANDLE\"*"
    );
    assert!(
        same_handle_set(&second.triggered, &one_handle(&standing)),
        "§6.5 item 12: *\"it drops ONE home-map entry\"* — the OTHER registration is untouched, and the next \
         trigger's set is exactly it"
    );
    // (4) THE NO-OP CLAUSE BESIDE THE TWO HALVES: an `unlisten` over the item-4-class values removes NOTHING,
    //     so the home the next trigger reads is UNCHANGED (`§6.5` item 12; PAR-13; `§0.4` clause 3). **THE
    //     OUTSIDE VALUES ARE SPELLED SO THE DRIVE CANNOT BE SATISFIED BY A COLLISION:** a FABRICATED token
    //     (a value this store never minted, spelled so no generator of this surface produces it) and a
    //     `string` that no verb returned — both are `§0.4` clause 3's own class, answered *"at `unlisten`, a
    //     NO-OP SUCCESS, producing NO code and removing NO other registration"*.
    ok(
        store.unlisten(&ListenerHandle::from("a-token-this-store-never-minted")),
        "PAR-13/§0.4 clause 3: a FABRICATED value → the same no-op success",
    );
    ok(
        store.unlisten(&ListenerHandle::from("")),
        "PAR-13: a BLANK token → the same no-op success",
    );
    let third = ok(
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_num(3.0)),
        "§3.4 W-3 after the two no-op successes",
    );
    assert_eq!(
        third.triggered.len(),
        1,
        "§6.5 item 14 (e) (ii): the no-op successes *\"removed NOTHING AT ALL, so the home it leaves is the \
         home the next trigger reads, unchanged\"* — ONE entry still stands"
    );
    assert!(
        same_handle_set(&third.triggered, &one_handle(&standing)),
        "§6.5 item 12/PAR-13: and the entry that stands is the registration the withdrawal did not name — the \
         WITHDRAWN handle is STILL absent (that is what the earlier withdrawal did), while nothing else moved"
    );
    // AND THE FIRST RECORD IS STILL THE FIRST ANSWER, read after the later triggers too.
    assert!(
        same_handle_set(&first.triggered, &[doomed.clone(), standing.clone()]),
        "§6.5 item 14 (d): the FIRST record's returned set is unchanged by the withdrawal and by every later \
         trigger"
    );
}
