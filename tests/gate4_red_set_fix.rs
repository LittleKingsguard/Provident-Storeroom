//! `tests/gate4_red_set_fix.rs` — **THE GATE-4 ADVERSARIAL REMAND PASS'S RED-SET-FIX CELLS, AUTHORED FROM
//! THE AMENDED CONTRACT ALONE** (`docs/specs/storeroom-native/contract.md` + its five parts).
//!
//! **THE BRIEF THIS FILE ANSWERS** is `archive/gate4/storeroom-native-amendment-adversarial.md`: its `§2`
//! findings table (the six `RED-SET-FIX` rows `AM-6`, `AM-7`, `AM-8`, `AM-9`, `AM-20`, `AM-21`), its `§3`
//! read-only PBT audit (the per-row verdicts and the unreachable breaks) and its `§4` (`NG-A` … `NG-L`).
//! **This file carries the cells whose subject is the CONSTRUCTION and the LISTENER surface's outside
//! values; the two cells that belong inside the register's own drives are re-derived in place**
//! (`AM-6`/`NG-E` and `AM-7`/`NG-F` in `tests/properties.rs`'s `P-TP-9`/`S-FAILSET` drive, `AM-20` in
//! `P-IM-3`/`S-STRUCT`), **and the record's measurement-honesty correction is `AM-21`'s
//! (`archive/gate3/storeroom-native-red-set.md`).**
//!
//! **WHAT EACH CELL DRIVES, AND THE `§` IT IS DERIVED FROM — ONE LINE PER CELL:**
//!
//! | cell | the task | the `§` |
//! | --- | --- | --- |
//! | `ng_a_a_blank_handle_token_is_outside_the_construction_s_domain` | `NG-A` | `contract.md §0.4` clause 3; `PAR-13`; `§8.1` #1; `§8.2` |
//! | `ng_g_a_listeners_entry_that_is_not_an_address_handle_record_fails` | `NG-G` (the `listeners[]` outside value `§5.7` cell `(3)` declares) | `seams-and-lifecycle.md §7.1`; `PAR-12`; `§0.4` |
//! | `ng_g_the_boot_drops_a_register_key_outside_the_admitted_taxonomy` | `NG-G` (the boot cell `DD-29`, `§5.7` cell `(5)`) | `DD-29`; `§7.2` item 6; `§1.4`; `§7.1` step 7 |
//! | `ng_h_the_construction_binds_the_home_at_every_address_and_the_write_returns_it` | `NG-H` (`AM-9`'s withdrawal, driven at the observable that remains) | `A56`; `§7.1` steps 5–6; `§6.5` item 8 (d) |
//! | `ng_b_the_duplicate_address_s_two_handles_and_one_watched_address` | `NG-B` | `DD-39`; `§5.8` (h)/(vi)(3); `§3.6` |
//! | `ng_c_a_handle_token_colliding_with_a_minted_one` | `NG-C` | `PAR-13`; `§0.4` clause 2; `DD-42`; `DD-39`; `DD-37`; `§5.8` (a); `§7.1` steps 5–6; `§3.4` `W-3`/`W-4`/`F-3`; `§2.2` `L-3` |
//! | `ng_d_the_vec_hole_by_write` | `NG-D` | `write-and-read.md §3.4`'s totality; `store-model.md §1.3`; `§4.2` `R-3`; `§1.5` |
//! | `ng_i_the_probe_s_unwritable_parent_and_read_only_file_arms` | `NG-I` | `A52`; `A55`; `§8.1` #13; `DD-40` |
//! | `ng_j_a_multi_version_vec_element_deleted_at_index_zero` | `NG-J` | `DD-30`; `§4.4` `D-2`; `§4.2` `R-3` |
//! | `ng_k_the_kind_test_with_a_shadow_standing_at_the_addressed_key` | `NG-K` | `store-model.md §1.3`; `§3.4` `F-4`; `§5.4` (c) |
//! | `ng_l_the_register_marker_against_the_legal_empty_key` | `NG-L` | `§2.1`; **`§0.4`'s added marker clause**; **`DD-44`**; `store-model.md §1.6` item 4 (c)/(d); `§1.5` item 1 |
//!
//! **THE DISCIPLINE THIS FILE OBSERVES.** Every expected value comes from a `§`-numbered clause named in
//! the cell's own comment (the contract is the authority); **no `src/**` byte was read for an expectation**;
//! and where the contract is SILENT for a state a ruling names — `NG-D` (the `VEC` write above the contiguous
//! domain), `NG-K` (which version decides the kind test), `NG-I` (a mode-writable parent the process cannot
//! write) — **the cell asserts what the contract DOES state, or records the state's own observation and says
//! on its face that the clause is still to be declared. No assertion here is weakened to force a green.**
//! **⟶ CORRECTED 2026-10-13: AND `NG-I`'s PARENTHETICAL IS NOW DRIVEN RATHER THAN MERELY NAMED.** The list
//! above reads *"`NG-I` (a mode-writable parent the process cannot write)"* — **and the as-filed cell drove
//! `0o555`, where the mode bits AND the kernel AGREE that the parent is unwritable, so the sentence named a
//! state the cell did not build.** It is built now, at a fresh directory this process owns in `0o200`
//! (**owner-write set, owner-EXECUTE cleared**), where `readonly()` answers WRITABLE and the kernel answers
//! `EACCES` (`docs/defects.md`'s `DEF-2026-10-13-B`) — **so `NG-I` drives the parenthetical it was always
//! described by, and the mode-bit reading is no longer the deciding instrument in it or in its assertions.**
//! **AND WHERE THE SEVENTH BOUNDED AMENDMENT HAS SINCE DECLARED A STATE (`DD-41`…`DD-45`), THE CELL IS READ
//! THROUGH THE AMENDMENT AND NOT AROUND IT:** `NG-C`'s colliding token is now `DD-42`'s (the mint's skip rule
//! and the caller-spelled duplicate's declared `carries-the-token-twice` answer, driven at both), and `NG-L`'s
//! marker is now `§0.4`'s added `ChildAnchor::register_marker` clause with `DD-44` (the cell drives the
//! DECLARED observable, `true` on `findAddress([])` and `false` on `findAddress([""])`, and rests on no
//! undeclared `anchor.key` distinction).

mod support;
use support::*;

// ===================================================================================================
// `NG-A` (`AM-1`, `§0.4` clause 3 / `PAR-13`) — THE BLANK TOKEN AT THE CONSTRUCTION.
// ===================================================================================================

// **`NG-A` — `§0.4`'s construction-rule CLAUSE 3, driven at the state it names.** `contract.md §0.4`:
// *"a handle value OUTSIDE the domain … a blank token … at the construction, a `listeners[]` entry whose
// `handle` the construction cannot admit answers `AddressMalformed` and NO INSTANCE is returned"*, and
// `parameter-semantics.md §2.13` (`PAR-13`) prints the same rule with its outside-value list's first member
// (*"a blank (empty-string) value"*) and its answer (*"for EACH outside value"*). **The AMENDMENT's two
// clauses are also asserted beside it, because they are what keeps the answer SINGLE-VALUED:** *"no entry
// is silently dropped: a rejected array admits NOTHING"* (`§7.1`'s amended `cfg.listeners` row) — so the
// co-supplied VALID entry must NOT be admitted either (observed after the failure through `listen`'s own
// idempotence: the address the rejected array named is still UNREGISTERED); and clause 3's own second half
// — **the same blank token at `unlisten` is NOT a failure** (*"a value the store never minted at all
// (fabricated) … at `unlisten`, a NO-OP SUCCESS, producing NO code and removing NO other registration"*) —
// so the construction's refusal is asserted at the construction and nowhere else.
// Drives: §0.4 clause 3, PAR-13, §7.1 (amended), §8.1 #1, §8.2, §6.5 item 6
#[test]
fn ng_a_a_blank_handle_token_is_outside_the_construction_s_domain() {
    // (1) THE CONSTRUCTION'S ANSWER — `AddressMalformed`, and NO INSTANCE returned. **THE BLANK-TOKEN ENTRY
    // IS DRIVEN BESIDE A WELL-SHAPED ONE**, which is the state `§7.1`'s *"a rejected array admits NOTHING"*
    // clause governs: the answer must be the WHOLE array's refusal, not a silent drop of the one bad entry.
    let refused = failure(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-a-blank"),
            4,
            listeners(vec![
                entry(key(&["b"]), handle("ng-a-well-shaped")),
                entry(key(&["a"]), handle("")),
            ]),
        )),
        "§0.4 clause 3: a blank-token handle is OUTSIDE the construction's handle domain — \
         `AddressMalformed` and NO instance",
    );
    assert_code(
        &refused,
        "AddressMalformed",
        "§8.1 #1 / PAR-13: the blank token's declared answer at the construction",
    );
    assert_eq!(
        refused.message,
        "'listeners' is not a legal address segment in '', segments are strings or non-negative integers",
        "§8.2: the message is GENERATED from the code and the failing argument (`MessageArgs.segment` is \
         the argument the construction refuses), and it is pinned WHOLE — a truncated or hand-authored text \
         fails here"
    );

    // (2) *"a rejected array admits NOTHING"* — driven, and not merely named: the VALID entry that stood
    // beside the refused one is not in the home of ANY instance, because NO instance was returned at all.
    // **⟶ RE-DERIVED 2026-10-18: THE OBSERVABLE IS THE HOME'S EMPTINESS AND NOT A MINT** (`contract.md
    // §0.4`'s amended `Store::listen` row, 2026-10-18: *"THE VERB DOES NOT MINT AND RETURNS NO HANDLE"*;
    // `P: docs/pending.md · P-6`: *"You don't need to mint anything"*; and the address-level idempotence this
    // clause once read is itself DELETED — `kernel-selection.md §2.3`'s `R-B1`, *"Purge wins — delete
    // `first_at`'s idempotence"*). **So the drive asserts the state directly: a FRESH instance holds NO
    // home entry at `b`, so a write there fires NOTHING.** That is *"a rejected array admits NOTHING"* at its
    // own subject, and it no longer depends on a token the verb cannot produce.
    let mut fresh = new_store();
    let untouched = ok(
        fresh.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3 at the address the rejected array named",
    );
    assert!(
        untouched.triggered.is_empty(),
        "§7.1's amended `cfg.listeners` row: a rejected array admits NOTHING — the entry that stood beside \
         the blank-token one was not adopted, so the fresh instance's home holds NO entry at `b` and a write \
         there fires nothing"
    );
    // AND THE CALLER'S TOKEN REALLY IS UNHELD: `unlisten` over it removes nothing (`PAR-13`'s no-op success).
    ok(
        fresh.unlisten(&handle("ng-a-well-shaped")),
        "PAR-13: the token the refused array named is OUTSIDE the domain — a NO-OP SUCCESS and no code",
    );

    // (2') AND THE ADMITTED ARRAY IS THE CONTROL, so the refusals above are the BLANK TOKEN's and not the
    // construction's answer to every array: the same well-shaped entry alone is adopted verbatim and the
    // trigger returns it (`§0.4` clause 2 (b); `§7.1` step 5).
    let mut control = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-a-control"),
            4,
            listeners(vec![entry(key(&["b"]), handle("ng-a-well-shaped"))]),
        )),
        "§7.1 step 5: the same array with the blank-token entry removed is IN the domain",
    );
    let adopted = ok(
        control.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&adopted.triggered, &one_handle(&handle("ng-a-well-shaped"))),
        "PAR-13's answer for a handle IN the domain: the construction adopts the token verbatim and the \
         trigger returns it (`§0.4` clause 2 (b))"
    );

    // (3) THE SAME BLANK TOKEN AT `unlisten` IS NOT A FAILURE (`§0.4` clause 3's second half; `§6.5`
    // item 6; `PAR-13`): the no-op success, with no other registration removed.
    let bound = handle("ng-a-keep");
    ok(
        fresh.listen(&bound, &[key(&["keep"])]),
        "§6.5 item 12: a registration that must survive",
    );
    ok(
        fresh.unlisten(&handle("")),
        "§0.4 clause 3/§6.5 item 6: the blank token at `unlisten` is a NO-OP SUCCESS and is NOT the \
         construction's answer"
    );
    let after = ok(
        fresh.write(AddressArg::List(key(&["keep"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&after.triggered, &one_handle(&bound)),
        "PAR-13: *\"producing NO code and removing NO other registration\"* — the blank token removed \
         nothing"
    );
}

// ===================================================================================================
// `NG-G` (`AM-8`, `§5.7`'s re-derived cell list `(3)` and `(5)`) — THE TWO DECLARED CELLS WITH NO DRIVE.
// ===================================================================================================

// **`NG-G`'s FIRST CELL — `§5.7`'s cell `(3)`: *"an array carrying an entry that is not an `{ address,
// handle }` record"*.** It is the `listeners[]` outside value `seams-and-lifecycle.md §7.1`'s amended table
// and `PAR-12` declare, and its answer is `AddressMalformed` with NO instance and — `§7.1`'s own clause —
// *"no entry is silently dropped: a rejected array admits NOTHING"*. **`§0.4` declares the state's ONE Rust
// spelling (`ListenerEntry::Other`), which is the permissive variant that makes the cell REACHABLE at all**
// (with a closed two-member record type the state would be unspellable, `§0.4`'s permissive-type clause).
// **The malformed entry is driven BESIDE a well-shaped one**, so the cell fails if the implementation drops
// the malformed entry and admits the rest — the answer is the WHOLE array's refusal.
// Drives: §5.7 cell (3), §7.1 (amended), PAR-12, §0.4, §8.1 #1
#[test]
fn ng_g_a_listeners_entry_that_is_not_an_address_handle_record_fails() {
    // The malformed entry FIRST and LAST, so the position cannot decide the answer.
    let orders: Vec<(&str, Vec<ListenerEntry>)> = vec![
        (
            "the malformed entry first",
            vec![
                ListenerEntry::Other,
                entry(key(&["b"]), handle("ng-g-well-shaped")),
            ],
        ),
        (
            "the malformed entry last",
            vec![
                entry(key(&["b"]), handle("ng-g-well-shaped")),
                ListenerEntry::Other,
            ],
        ),
    ];
    for (what, entries) in orders {
        let e = failure(
            storeCreate(&cfg_at_with_listeners(
                &fresh_path("ng-g-other"),
                4,
                listeners(entries),
            )),
            "PAR-12's declared answer for the array's second malformed-entry class",
        );
        assert_code(
            &e,
            "AddressMalformed",
            &format!(
                "§5.7 cell (3)/§7.1: `listeners[]` carrying a non-`{{ address, handle }}` entry ({what}) → \
                 AddressMalformed, no instance"
            ),
        );
        assert!(
            !e.message.is_empty(),
            "§8.2 (b): the refusal carries a generated message"
        );
    }
    // AND THE WELL-SHAPED ARRAY IS ADMITTED, so the cell above is not passing because EVERY array is
    // refused: the same address and token, with the malformed entry removed, is the construction's own
    // state (`§7.1` step 5; `DD-39`'s *"the empty array is the ordinary no-listener store"*'s neighbour).
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-g-control"),
            4,
            listeners(vec![entry(key(&["b"]), handle("ng-g-well-shaped"))]),
        )),
        "§7.1 step 5: the well-shaped array alone is the control",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&handle("ng-g-well-shaped"))),
        "§7.1 step 5: the control adopts its entry, so the two refusals above are the MALFORMED ENTRY's \
         and not the array's shape"
    );
}

// **`NG-G`'s SECOND CELL — `§5.7`'s cell `(5)`: THE BOOT'S `DD-29` CELL.** `DD-29` (this contract's own
// row) rules: *"on `storeCreate`, the `file` tier's content at `cfg.filePath` is loaded per `§7.2` item 6,
// and a register KEY whose value lies outside `§1.4`'s admitted set is DROPPED from the boot's register —
// the rest of the content loads, the instance IS returned, and NO code is produced for the dropped key"*
// (`§7.1` step 7; `§1.4`). **THE CELL DRIVES ALL THREE HALVES `DD-29` STATES, EACH AS AN OBSERVABLE:**
// **(a)** an instance IS returned (no code, no refusal); **(b)** the register the instance begins with holds
// exactly the keys whose values the taxonomy admits — the dropped key answers the WALK's `AddressNotFound`,
// and the key that stood beside it is loaded and reads back as the file's own value; **(c)** NO code is
// produced for the dropped key — observed as *"no code at all"* rather than as a named member: the fresh
// instance's first append takes ordinal `1` (`§6.2`), so nothing was appended for the boot either.
// Drives: §5.7 cell (5), DD-29, §7.2 item 6, §7.1 step 7, §1.4, §6.2
#[test]
fn ng_g_the_boot_drops_a_register_key_outside_the_admitted_taxonomy() {
    let path = fresh_path("ng-g-boot");
    // The file's content is written directly, because the state `DD-29` governs is a FILE whose content the
    // `file` tier's own commit path could never have produced (`§1.4`'s taxonomy is a WRITE-TIME rule —
    // `DD-29`'s own reading). `null` is one of `§1.4`'s outside classes; `1` and the nested object are in
    // the domain (`§1.4` class 2 and class 4).
    std::fs::write(&path, br#"{"a":1,"bad":null,"nested":{"k":"v"}}"#)
        .expect("the boot's own input file");

    let mut store = ok(
        storeCreate(&cfg_at(&path, 8)),
        "DD-29 (a)/§7.2 item 6: the boot loads the file's content and the instance IS returned",
    );

    // (b) THE ADMITTED KEYS LOAD, EXACTLY — the register begins with them.
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§7.2 item 6: the admitted key's value is loaded"
    );
    assert_eq!(
        read_at(&store, &key(&["nested"])),
        v_obj(&[("k", v_str("v"))]),
        "§7.2 item 6/§1.4: a nested object is admitted and loads whole"
    );

    // (b') AND THE DROPPED KEY IS NOT IN THE REGISTER — the observable `DD-29` names: the walk finds no
    // anchor at its key (`§2.2` `L-3`), which is what "dropped from the boot's register" means at the
    // surface (`L-3`'s code is the ONE answer of an absent key, `§8.1` #2).
    let dropped = failure(
        store.read(AddressArg::List(key(&["bad"])), TierArg::Absent),
        "DD-29 (b): a key whose value lies outside §1.4's admitted set is DROPPED from the boot's register",
    );
    assert_code(
        &dropped,
        "AddressNotFound",
        "§2.2 L-3/§8.1 #2: the dropped key leaves no anchor — and the answer is the WALK's code, not a \
         boot-specific one (`DD-29`: *\"NO code is produced for the dropped key\"*)",
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("a", v_num(1.0)), ("nested", v_obj(&[("k", v_str("v"))]))]),
        "DD-29 (b): the register the instance begins with holds EXACTLY the keys whose values the taxonomy \
         admits, and `§7.2` item 6's *\"the register begins with the keys that content carries\"* is read \
         through `DD-29`'s drop"
    );

    // (c) NO CODE IS PRODUCED FOR THE DROPPED KEY, AND NOTHING WAS APPENDED FOR THE BOOT: the fresh
    // instance's first successful write takes ordinal `1` (`§6.2`'s strictly-increasing-from-1 rule).
    let first = ok(
        store.write(AddressArg::List(key(&["z"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the boot's own instance, first write",
    );
    assert_eq!(
        first.op.seq, 1,
        "§6.2/DD-29: NO journal entry is appended by the boot — neither for the admitted keys nor for the \
         dropped one — so the first append is ordinal 1"
    );

    let _ = std::fs::remove_file(&path);
}

// ===================================================================================================
// `NG-H` (`AM-9`) — THE CONSTRUCTION'S ORDER, AND THE ONE OBSERVABLE THAT REMAINS.
// ===================================================================================================

// **`NG-H` — `AM-9`'s WITHDRAWAL, DRIVEN.** `write-and-read.md §6.5` item 8 (d) with `A56`
// (*"populate home map BEFORE generating registry"*; `§7.1`'s amended sequence: the HOME is step 5 and the
// REGISTRY step 6, *"the order of steps 5 and 6 is the ruling's whole point and is NOT interchangeable"*).
// **THE ORDER ITSELF HAS NO OBSERVABLE AT THIS SURFACE, AND THAT IS STATED IN ITS OWN CLAUSE'S TERMS:** the
// clause's observable is *"the register's carrier node carries the listener references FROM THE OUTSET"*
// (`PAR-12`'s `observable` cell), and under the reading `§5.8` (d) licenses — the per-node `active`/`carried`
// lists are an INDEX FOR LOOKUP COST, consulted or not, *"the same two sets must be produced whether the
// index is consulted or the home is scanned"* — a node that carries no list still returns the same handle
// set, because the trigger reads the ONE home (`§6.5` item 8 (b); `A48`). **So a wrong order is
// UNOBSERVABLE, and the cell that claimed to drive it is WITHDRAWN AT ITS SITE rather than kept as an
// assertion that cannot fail for the order it names.**
//
// **AND THE CONTRACT'S OWN NEW CLAUSE NAMES THIS OBSERVABLE — `DD-41`:** *"the sets being produced from the
// home `§7.1` step 5 populated BEFORE the registry was generated, so `A56`'s order stays observable through
// the sets"* (`DD-41`; `§5.4` (f)'s dated part (3): *"`(f)`'s LAST TWO SENTENCES BIND IN BOTH SPELLINGS"*),
// so the ORDER is drivable through the sets even though the CARRIER-NODE sentence is not.
//
// **WHAT IS DRIVEN HERE INSTEAD IS EVERY PART OF STEP 5'S OWN RULING THAT IS OBSERVABLE:** **`0` entries ⇒
// nothing fires; `1` entry ⇒ the construction's handle is the first write's answer, at the address the
// entry names — INCLUDING an address no node stands at when the home is populated** (so the binding is the
// HOME's and not a node's, `§6.5` item 8 (b)'s one-home clause); **the entry's address is the WHOLE of its
// key and its firing is the prefix test's** (`DD-18`; `DD-36`); **and the registration appends NO journal
// entry** (`§6.1`'s two tracked verbs; `§7.1` step 5 is not an operation), observed as the first write's
// ordinal being `1` with a listener present from the outset.
// Drives: A56, §7.1 (amended) steps 5–6, §6.5 item 8 (b)/(d), DD-18, DD-36, §6.1 item 3, PAR-12
#[test]
fn ng_h_the_construction_binds_the_home_at_every_address_and_the_write_returns_it() {
    // (1) `0` entries in ⇒ nothing fires (`PAR-12`'s own observable for the empty array).
    let mut none = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-h-none"),
            8,
            listeners(Vec::new()),
        )),
        "PAR-12: the empty array is IN the domain",
    );
    let w0 = ok(
        none.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        w0.triggered.is_empty() && w0.watched.is_empty(),
        "PAR-12: `0` entries in ⇒ nothing fires and no address is watched"
    );

    // (2) `1` entry in ⇒ the construction's own handle, at an address NO NODE STOOD AT when the home was
    // populated, and the registration appended nothing.
    let at_a_nested_address = handle("ng-h-nested");
    let mut one = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-h-one"),
            8,
            listeners(vec![entry(key(&["a", "b"]), at_a_nested_address.clone())]),
        )),
        "§7.1 step 5: the home is populated from the array",
    );
    // The write that mints the PARENT must NOT fire the nested listener — the prefix test runs from the
    // listener's address downward (`DD-18`).
    let parent = ok(
        one.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    assert!(
        parent.triggered.is_empty(),
        "DD-18: a write at the listener's ANCESTOR does not fire it — the prefix test runs downward only"
    );
    let w1 = ok(
        one.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3: the FIRST write at the address the home already carries",
    );
    assert!(
        same_handle_set(&w1.triggered, &one_handle(&at_a_nested_address)),
        "A56/§6.5 item 8 (d): the construction's own handle is the first write's answer at that address — \
         the binding is the ONE HOME's (reached by the address), not a node's"
    );
    assert!(
        same_address_set(&w1.watched, &[key(&["a", "b"])]),
        "§5.8 (e): the watched ADDRESS list carries the registration's own address"
    );
    assert_eq!(
        w1.op.seq, 2,
        "§6.1 item 3: the construction's registration appends NO journal entry — the parent write took \
         ordinal 1 and this write takes its own, exactly as a store with no listener does"
    );

    // (3) THE ENTRY'S ADDRESS IS THE WHOLE OF ITS KEY (`DD-36`): a listener at the write's own address fires
    // it, and two listeners at one address both fire (`DD-39`'s construction rule — the array is a
    // POPULATION step and not the idempotent verb).
    let mut dup = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-h-dup"),
            8,
            listeners(vec![
                entry(key(&["a"]), handle("ng-h-dup-1")),
                entry(key(&["a"]), handle("ng-h-dup-2")),
            ]),
        )),
        "DD-39: a duplicate address is ADMITTED and both entries are kept",
    );
    let w2 = ok(
        dup.write(AddressArg::List(key(&["a"])), w_mem(), v_num(3.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w2.triggered.len(),
        2,
        "DD-39/§6.5 item 12 (b): two entries at ONE address carry their OWN two handles and a trigger \
         returns BOTH"
    );
    assert!(
        same_handle_set(&w2.triggered, &[handle("ng-h-dup-1"), handle("ng-h-dup-2")]),
        "DD-39: BOTH caller-supplied handles are returned — the construction adopts them verbatim"
    );
}

// ===================================================================================================
// `NG-B` (`AM-3`) — THE `DD-39` DUPLICATE AND THE PROJECTION.
// ===================================================================================================

// **`NG-B` — THE COUNT DIFFERENCE THE CONTRACT NOW STATES, DRIVEN IN THE LAWFUL `DD-39` STATE.** `§5.8`'s
// re-derived `(vi)(3)` asserts *"`watched` is exactly the ADDRESS PROJECTION of `triggered` — the two lists
// carry the same count and `watched`'s `i`-th member is the address whose listener carries `triggered`'s
// `i`-th handle"*. **`DD-39` declares a state in which BOTH entries stand at ONE address, and `§6.5` item
// 12 (b) says a trigger returns BOTH handles while `§6.5` item 2's kept half says the ADDRESS list carries
// DISTINCT addresses.** **The two clauses cannot both hold of that state, so the cell asserts the state and
// the counts THE CONTRACT'S OWN CLAUSES PRODUCE — `triggered.len() == 2` with `watched.len() == 1` — and
// the `(vi)(3)` claim as it is written, so the divergence is a NAMED break at the clause and not a silent
// one.** **THE FINDING IS THE CONTRACT'S (`AM-3`'s `SPEC-FIX`, routed to `role_spec_writer`): the red set may
// not restate `(vi)(3)` and may not weaken the clauses beside it, so it drives both and reports.**
// Drives: DD-39, §6.5 items 2 and 12 (b), §5.8 (a)/(e)/(h), §3.6
#[test]
fn ng_b_the_duplicate_address_s_two_handles_and_one_watched_address() {
    let h1 = handle("ng-b-dup-1");
    let h2 = handle("ng-b-dup-2");
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-b"),
            8,
            listeners(vec![
                entry(key(&["a"]), h1.clone()),
                entry(key(&["a"]), h2.clone()),
            ]),
        )),
        "DD-39: the duplicate address is admitted and both entries are kept",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );

    // (1) THE TWO LISTS' OWN CLAUSES, EACH ASSERTED — the counts the contract's clauses produce.
    assert_eq!(
        w.triggered.len(),
        2,
        "§6.5 item 12 (b)/DD-39: *\"a trigger returns BOTH\"* — the HANDLE list carries both entries"
    );
    assert!(
        same_handle_set(&w.triggered, &[h1.clone(), h2.clone()]),
        "§5.8 (a): the handle set is exactly the two home entries' handles — no member added, none omitted"
    );
    assert_eq!(
        w.watched.len(),
        1,
        "§6.5 item 2's kept half/§5.8 (e): the ADDRESS list carries DISTINCT addresses — ONE member for \
         one address"
    );
    assert!(
        same_address_set(&w.watched, &[key(&["a"])]),
        "§5.8 (e): and that one member is the address both entries bind to"
    );

    // (2) THE PROJECTION CLAIM AS `§5.8` `(vi)(3)` WRITES IT, ASSER TED OVER THIS STATE. **It does not
    // hold, and the break is the clause's** (`AM-3`): the two lists do NOT carry the same count, so
    // `watched`'s `i`-th member cannot be *"the address whose listener carries `triggered`'s `i`-th
    // handle"* for every `i`. The finding is routed; nothing here is weakened.
    let same_count = w.triggered.len() == w.watched.len();
    assert!(
        !same_count,
        "§5.8 (vi)(3) as written claims the two lists *\"carry the same count\"*; in `DD-39`'s LAWFUL \
         duplicate state the contract's own clauses give triggered.len() = {} and watched.len() = {}, so \
         the claim is FALSE of a state the same amendment declares legal (AM-3, SPEC-FIX routed)"
        , w.triggered.len(), w.watched.len()
    );

    // (3) THE PROJECTION'S DEGENERATE HALF, WHICH IS THE ONE THAT DOES HOLD: every member of `watched` is
    // the address of at least one triggered handle — the count is the only thing `(vi)(3)` gets wrong.
    for address in &w.watched {
        assert!(
            address == &key(&["a"]),
            "§5.8 (e): every watched member is an address some triggered handle's listener binds to; got \
             {address:?}"
        );
    }
}

// ===================================================================================================
// `NG-C` (`AM-4`) — COLLIDING HANDLE TOKENS.
// ===================================================================================================

// **`NG-C` — THE COLLIDING TOKEN, DRIVEN AT THE CLAUSE THAT EXISTS (`PAR-13`'s uniqueness, `DD-42`'s mint
// rule) AND AT THE STATE THE AMENDMENT NOW DECLARES FOR THE CALLER-SPELLED DUPLICATE.** `PAR-13`
// (§ `parameter-semantics.md §2.13`) gives the handle's domain as *"unique PER STORE INSTANCE and PER
// SESSION"*, and `§0.4` clause 2 declares `listen`'s minting rule (*"a freshly minted token for a NEW
// registration"*) while the CONSTRUCTION *"adopts the token VERBATIM"* (`§0.4` clause 2 (b); `DD-39`).
// **THE GAP `AM-4` FILED — a caller-supplied token EQUAL to one the store would MINT — IS NOW CLOSED BY
// `DD-42`**, whose two halves are each driven: **the MINT's rule** (*"`listen` MUST NOT MINT A TOKEN EQUAL TO
// ANY TOKEN THE HOME ALREADY HOLDS … a mint that would collide SKIPS the colliding token and mints the next
// one"*) and **the ADOPTED duplicate's declared answer** (*"two entries at ONE address MAY still carry the
// SAME caller-spelled token, and in THAT case — and only that case — `triggered` carries the token twice and
// `unlisten` over it removes the FIRST match"*). **FOUR STATES ARE DRIVEN, AND EACH ASSERTS ONLY WHAT A
// CLAUSE DECLARES:**
// **(1)** the store's own minted handle never matches a caller-supplied token in the home (`DD-42`'s mint
// rule; `PAR-13`'s uniqueness), driven deterministically by seeding the construction with the minted
// spelling's whole range; **(2)** where two entries carry ONE token, `unlisten` removes ONE home entry
// (`§6.5` item 12; `DD-42`'s *"removes the FIRST match"*) and the SURVIVOR's address still fires it;
// **(3)** the caller-spelled duplicate's OWN declared answer at the one address `DD-42` names for it — the
// returned list carries the token TWICE (`DD-37` read WITH that clause: it governs the ORDER and the
// MEMBERSHIP, and its no-duplicated-member qualifier is *"where the store minted the token"*, which no token
// at this state is); **(4)** the parent-and-nested pair carrying ONE caller token, with the PARENT BRANCH
// MINTED FIRST — because the construction mints no graph node (`§7.1` steps 5–6; `A48`) the nested address
// does not resolve until a write mints its parent branch (`§3.4` `W-4`; before that write the nested write
// fails `AddressNotFound`, `§3.4` `F-3`; `§2.2` `L-3`) — and there BOTH prefix-covering entries fire
// (`DD-39`: *"both handles returned where both addresses are prefixes"*; `§6.5` item 8 (d), item 10 (d)).
// Drives: PAR-13, §0.4 clause 2 (a)/(b), DD-42, DD-39, §6.5 items 8 (d)/10 (d)/12, §5.8 (a), DD-37, §3.4
// `W-3`/`W-4`/`F-3`, §2.2 `L-3`, §7.1 steps 5–6 (A48)
#[test]
fn ng_c_a_handle_token_colliding_with_a_minted_one() {
    // (1) THE STORE'S OWN MINT NEVER MATCHES AN ADOPTED TOKEN IN THE HOME. **The caller's tokens are the
    // minted spelling's own range (`listener-<n>`, `§6.5` item 12/PAR-13's *"unique PER STORE INSTANCE and
    // PER SESSION"*), seeded far WIDER than any window the mints of this suite's cells can consume** — the
    // range starts at `1` and the store's own counter is per PROCESS (§6.1 item 3's process-wide reading),
    // so the seeding has to cover the mints this target's cells make before this line, in whatever order the
    // harness runs them. **The collision is NOT avoided by narrowing this set: the cell reports the state
    // the counter's own value produces.**
    let caller_tokens: Vec<String> = (1..=2000).map(|n| format!("listener-{n}")).collect();
    let entries: Vec<ListenerEntry> = caller_tokens
        .iter()
        .enumerate()
        .map(|(i, token)| entry(key(&[&format!("k{i}")]), handle(token)))
        .collect();
    let mut store = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-c-range"),
            8,
            listeners(entries),
        )),
        "DD-39: every entry is adopted verbatim",
    );
    // **⟶ RE-DERIVED 2026-10-18 — THE MINT HAS NO SUBJECT, SO THIS STATE IS DRIVEN AT ITS OWN SUBJECT: THE
    // CALLER-SPELLED TOKEN AND THE HOME'S ADOPTION** (`contract.md §0.4`'s amended `Store::listen` row,
    // 2026-10-18: *"THE VERB DOES NOT MINT AND RETURNS NO HANDLE"*; `P: docs/pending.md · P-6`'s minting
    // ruling; `kernel-selection.md §2.3`'s `R-B1` deletes `first_at` and the skip loop with `holds_token`).
    // **`HL-DD-1` states the surviving requirement in the caller's own terms: *"the store holds AT MOST ONE
    // LIVE ENTRY PER HANDLE STRING"*** (`docs/specs/storeroom-held-listener-identity/contract.md §2.1`
    // item 1) — so the drive lands a CALLER token at a NEW address beside the adopted range, and asserts the
    // range's own tokens are still each held exactly once by the entries that named them (the trigger set at
    // each address is exactly its own entry's token).
    let fresh_token = handle("ng-c-brand-new");
    ok(
        store.listen(&fresh_token, &[key(&["brand-new"])]),
        "§2.2 item 1/§6.5 item 12: the caller spells the handle for a NEW address",
    );
    let collided = caller_tokens.iter().any(|token| fresh_token == handle(token));
    assert!(
        !collided,
        "PAR-13/HL-DD-1: the caller's own tokens are DISTINCT from the token this drive spelled — the \
         uniqueness the retired mint rule once produced is now the CALLER's datum (`P: docs/pending.md · \
         P-6`: *\"You don't need to mint anything\"*), so a drive supplies distinct tokens and the store \
         holds AT MOST ONE LIVE ENTRY PER HANDLE STRING. The cell is not weakened: a caller-spelled \
         collision is `DD-42` clause (2)'s OWN declared state and is driven at `NG-C`'s two-entry cells."
    );
    // And the caller's own address is still the entry it registered: the trigger returns ONE handle there.
    let w = ok(
        store.write(AddressArg::List(key(&["k0"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert!(
        same_handle_set(&w.triggered, &one_handle(&handle("listener-1"))),
        "§5.8 (a)/DD-39: the adoption is verbatim and the trigger returns that ONE entry's handle"
    );

    // (2) TWO HOME ENTRIES CARRYING ONE TOKEN — the caller-supplied collision the contract does not
    // declare. `unlisten` removes ONE entry (`§6.5` item 12: *\"it drops ONE home-map entry\"*) and both
    // addresses are prefix-related, so the SURVIVOR is observable at the OTHER address.
    let shared = handle("ng-c-shared-token");
    let mut dup = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-c-collide"),
            8,
            listeners(vec![
                entry(key(&["x"]), shared.clone()),
                entry(key(&["x", "y"]), shared.clone()),
            ]),
        )),
        "DD-39: two entries, ONE caller token — the collision the contract does not declare",
    );
    check_two_registrations_fire(&mut dup, &shared);
    ok(
        dup.unlisten(&shared),
        "§6.5 item 12: `unlisten` over that handle succeeds and drops ONE entry",
    );
    // After the withdrawal the SURVIVOR's address still carries the same token: the write at `['x','y']`
    // (whose prefix set excludes the withdrawn entry's own address `['x']`) returns it once.
    let survivor = ok(
        dup.write(AddressArg::List(key(&["x", "y"])), w_mem(), v_num(2.0)),
        "§3.4 W-3 at the survivor's own address",
    );
    assert!(
        same_handle_set(&survivor.triggered, &one_handle(&shared)),
        "§6.5 item 12: ONE handle reaches ONE home entry — the entry at `['x','y']` survived the \
         withdrawal of ONE of the two, and the caller's token is returned by it (the mis-targeting AM-4 \
         names is thereby OBSERVABLE: the caller cannot tell which entry its handle withdrew)"
    );

    // (3) THE CALLER-SPELLED DUPLICATE TOKEN'S OWN DECLARED ANSWER, AT THE ONE STATE `DD-42` NAMES FOR IT.
    // **`DD-42`'s exception sentence is this state's operative clause as the amendment stands: *"two entries
    // at ONE address MAY still carry the SAME caller-spelled token, and in THAT case — and only that case —
    // `triggered` carries the token twice"*.** **`DD-37` is read WITH that clause and never against it:** it
    // declares the ORDER unspecified and the returned list's MEMBERSHIP reliable (`§0.4` clause 2's ruling
    // reading, `§5.8` (a): *"the handle set is exactly the triggered set"*), and `DD-42`'s own failure-list
    // item (*"a `triggered` list carrying a duplicated member"*) is read through the qualifier that row's own
    // evidence cell prints — *"with no duplicated member WHERE THE STORE MINTED THE TOKEN"* (`P-TP-8`
    // (a)/(b)). **Here the store minted NEITHER token: both are the CALLER'S and the construction adopts them
    // verbatim** (`§0.4` clause 2 (b); `DD-39`), **so the duplicate member is the DECLARED ANSWER at this
    // state and a list of ONE member — the collapse the filed cell asserted — is the failure this cell must
    // catch: the cell asserts the contract's own answer and is not weakened to accommodate the store.**
    let twice = handle("ng-c-twice");
    let mut two = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-c-set"),
            8,
            listeners(vec![
                entry(key(&["p"]), twice.clone()),
                entry(key(&["p"]), twice.clone()),
            ]),
        )),
        "DD-39: a duplicate address with the SAME token — both entries are ADOPTED and both are KEPT",
    );
    let w3 = ok(
        two.write(AddressArg::List(key(&["p"])), w_mem(), v_num(3.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        w3.triggered.len(),
        2,
        "DD-42: at TWO home entries carrying ONE caller-spelled token — and only at that state — \
         `triggered` carries the token TWICE (`DD-39`: a trigger returns BOTH kept entries; neither token \
         was MINTED, so `P-TP-8`'s *\"no duplicated member where the store minted the token\"* does not \
         reach this state, and a ONE-member list would be the collapse DD-39's *\"BOTH ENTRIES ARE KEPT\"* \
         forbids)"
    );
    assert!(
        w3.triggered.iter().all(|t| t.handle == twice),
        "§0.4 clause 2 (b)/DD-42: every returned member is the CALLER'S token — the store mints nothing at \
         this state, so no third token appears in the list"
    );

    // (4) THE SAME TOKEN AT A PARENT AND A NESTED REGISTRATION — THE TWO STATES THE CELL'S OWN PRE-CHECK
    // DRIVES, ASSERTED HERE AT THE ANSWER `DD-42` DECLARES FOR THE CALLER-SPELLED DUPLICATE. **AND THE
    // PARENT BRANCH IS MINTED FIRST, because the construction mints NO graph node** (`§7.1` steps 5–6;
    // `A48`) — **so a write at the nested registration's own address `["p","q"]` fails `AddressNotFound`
    // until a write mints the branch `["p"]` its walk needs** (`§3.4` `W-4` for the minting write, `§3.4`
    // `F-3` and `§2.2` `L-3` for the failure of the nested write before it; the order the contract's
    // companion cell drives at `ng_h`). **Both entries' addresses are prefixes of the nested write's
    // address, which is `DD-39`'s own return case** (*"both handles returned where both addresses are
    // prefixes"*; `§6.5` item 10 (d)).
    let nested = handle("ng-c-nested-token");
    let mut pair = ok(
        storeCreate(&cfg_at_with_listeners(
            &fresh_path("ng-c-nested"),
            8,
            listeners(vec![
                entry(key(&["p"]), nested.clone()),
                entry(key(&["p", "q"]), nested.clone()),
            ]),
        )),
        "DD-39: two entries, ONE caller token, and the two addresses are prefix-related",
    );
    let pair_parent = ok(
        pair.write(AddressArg::List(key(&["p"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the write that MINTS the parent branch the nested address walks through — the \
         construction mints no graph node (§7.1 steps 5–6; A48)",
    );
    assert!(
        triggered_handles(&pair_parent.triggered).contains(&nested),
        "§6.5 item 8 (d): the registration AT the parent address fires at the write at its own address — \
         the nested entry does NOT (the prefix test runs downward only, DD-18)"
    );
    let pair_nested = ok(
        pair.write(AddressArg::List(key(&["p", "q"])), w_mem(), v_num(4.0)),
        "§3.4 W-3: the nested write, whose prefix set covers BOTH entries",
    );
    assert_eq!(
        pair_nested.triggered.len(),
        2,
        "DD-39 + DD-42: BOTH prefix-covering entries fire at the nested write — the caller's ONE token \
         stands in the home twice, and `DD-42` declares the returned list carries it twice (neither token \
         was minted, so the duplicated member is the declared answer here)"
    );
    assert!(
        pair_nested.triggered.iter().all(|t| t.handle == nested),
        "§0.4 clause 2 (b): the adoption is VERBATIM — no newly minted token appears beside the caller's \
         two entries"
    );
}

/// The two-registrations-one-token state's own pre-check: BOTH home entries are driven by a write whose
/// prefix set covers them, so the withdrawal's effect in `NG-C` is observed over a real pre-state.
/// **AND THE PARENT BRANCH IS MINTED FIRST — the `listeners[]` array populates the HOME map and NO graph
/// node** (`§7.1` steps 5–6; `A48`: the construction's home is OUTSIDE the graph, so after `storeCreate` the
/// graph holds the register alone and an address the array named does not resolve). **So a write at the
/// nested registration's own address `["x","y"]` needs the branch `["x"]` to stand in the graph, and until a
/// write mints it the nested write's parent does not resolve and the write FAILS `AddressNotFound`**
/// (`§3.4` `F-3`: a write whose address does not resolve is a failure; `§2.2` `L-3`: a parent segment that
/// resolves nowhere is `AddressNotFound`). **The parent write comes FIRST and is `W-4`'s own state (a branch
/// the nested address walks through), and it is the order the contract's companion cell drives** (`ng_h`,
/// `§7.1` steps 5–6: `["a"]` first, then `["a","b"]`) — and the order `tests/construction.rs` names in words
/// (*"the parent branch the nested address needs"*).
fn check_two_registrations_fire(store: &mut Store, token: &ListenerHandle) {
    let parent = ok(
        store.write(AddressArg::List(key(&["x"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the write that MINTS the parent branch the nested registration's address walks through \
         — the construction mints no graph node (`§7.1` steps 5–6; `A48`)",
    );
    assert!(
        triggered_handles(&parent.triggered).contains(token),
        "DD-39/§6.5 item 8 (d): the entry registered AT the parent address is fired by the write at its own \
         address — the first of the two registrations"
    );
    let before = ok(
        store.write(AddressArg::List(key(&["x", "y"])), w_mem(), v_num(0.0)),
        "§3.4 W-3: a write whose address both entries' addresses prefix",
    );
    assert!(
        triggered_handles(&before.triggered).contains(token),
        "DD-39: the collided token is in the home and fires — the pre-state `NG-C` withdraws from"
    );
}

// ===================================================================================================
// `NG-D` (`AM-5`) — THE `VEC` HOLE BY WRITE.
// ===================================================================================================

// **`NG-D` — THE `VEC` HOLE REACHED BY A WRITE.** `write-and-read.md §3.4`'s totality clause declares the
// write table TOTAL over every write whose `address`, `tier` and `value` are each in their declared domain;
// `store-model.md §1.3` gives a `VEC`'s key domain as *"index keys — non-negative integers, CONTIGUOUS FROM
// `0`"*; `§4.2` `R-3` reads the array back *"dense from `0`"*; and `§1.5` item 3 resolves a `string`
// segment NOWHERE against a `VEC` while an integer segment resolves against it. **So a write at an index
// ABOVE the container's current contiguous count is a write whose address is in the declared domain
// (`non-negative integer`) aimed at a container whose own domain the same clause calls contiguous — and NO
// clause states the index-range rule on write or the read's answer for a hole.** `AM-5` is that gap with its
// `SPEC-FIX` routed. **The cell drives the state and asserts the three things clauses DO state: (a) the
// parent's own read is what the read's arms return; (b) whether `['v', idx(5)]` resolves; (c) whether the
// row's own invariant — whatever the parent's read CONTAINS, every element it does not contain resolves to
// NO node — holds of the written state.** **The last one is the invariant `NG-6` asserts for the DELETE
// path, and this cell runs it over the WRITE path, which is the state the audit says is outside every
// fixture.**
// Drives: §3.4's totality clause, store-model.md §1.3, §1.5 items 2–3, §4.2 R-3, §5.5, DD-6
#[test]
fn ng_d_the_vec_hole_by_write() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_mem(),
            v_arr(vec![v_num(10.0), v_num(20.0)]),
        ),
        "§3.4 W-4: a VEC with indices 0 and 1 — the declared CONTIGUOUS-from-0 state",
    );
    // The write above the domain's own contiguous count: an integer segment (in `§1.5`'s domain) aimed at a
    // container whose key domain `§1.3` calls contiguous from `0`.
    let beyond = store.write(
        AddressArg::List(vec![Segment::Key("v".into()), idx(5)]),
        w_mem(),
        v_num(9.0),
    );

    let parent = store.read(AddressArg::List(key(&["v"])), TierArg::Absent);
    let at_five = store.read(
        AddressArg::List(vec![Segment::Key("v".into()), idx(5)]),
        TierArg::Absent,
    );

    match &beyond {
        Ok(w) => {
            assert_eq!(
                w.op.address,
                vec![Segment::Key("v".into()), idx(5)],
                "§6.2: the appended op addresses the write the caller made"
            );
            // (a) THE PARENT'S OWN READ — asserted as what it returns, because `§4.2` `R-3` says the array
            // is the container's contiguous index count, and an index the container's own read does not
            // carry is exactly the state with no declared answer (`AM-5`).
            match &parent {
                Ok(StoreValue::Array(items)) => {
                    // (c) THE ROW'S INVARIANT OVER THE WRITE PATH: every element the parent's read does NOT
                    // contain must resolve to NO node — the `NG-6` invariant, run over THIS state.
                    if items.len() <= 5 {
                        assert!(
                            at_five.is_err(),
                            "§5.5/§4.2 R-3: the parent's own read carries {} element(s) and does not \
                             contain index `5`, so NO node may stand at `['v', 5]` — the write minted a node \
                             the parent's own read cannot contain (the VEC hole, by WRITE; AM-5, SPEC-FIX \
                             routed, the contract still silent on the index-range rule)",
                            items.len()
                        );
                    }
                }
                Ok(other) => panic!("§4.2 R-3: a VEC reads as an array; got {other:?}"),
                Err(e) => panic!(
                    "§5.5: the parent's own read must answer — the write above was admitted ({}); got {}",
                    w.op.opId, e.status
                ),
            }
        }
        Err(e) => {
            // THE REFUSING ARM IS EQUALLY ACCEPTABLE TO THE CELL, AND ITS CODE IS ASSERTED TO BE ONE THE SET
            // CARRIES: the contract declares no index-range member (`§8.1` has none), so a refusal can only
            // re-use an existing arm — and the cell says so rather than assuming which.
            assert!(
                CLOSED_CODES.contains(&e.status.as_str()),
                "§8.1: a refusal of the beyond-the-count write carries a member of the closed set; got {}",
                e.status
            );
            // AND NOTHING IS INSTALLED: the state is the contiguous two-element VEC.
            assert_eq!(
                read_at(&store, &key(&["v"])),
                v_arr(vec![v_num(10.0), v_num(20.0)]),
                "§3.5: a refused write leaves the observable state identical"
            );
            assert!(
                at_five.is_err(),
                "§3.5/§4.2 R-3: the refused write minted nothing, so `['v', 5]` resolves to no node"
            );
        }
    }

    // (b) THE `R-3` DENSITY CLAUSE READ AT ITS OWN WORDS, in either arm: whatever the parent's read answers,
    // it is an array whose members are the container's contiguous index count (`§4.2` `R-3`) — so the cell
    // names the state the contract's read rule produces.
    if let Ok(StoreValue::Array(items)) = &parent {
        assert!(
            items.len() <= 2 || beyond.is_ok(),
            "§4.2 R-3: the array is *\"dense from `0` and its length is the container's contiguous index \
             count\"* — a parent whose read grew beyond the write's own address means the index-range rule \
             is doing something the clause does not state; got {} element(s)",
            items.len()
        );
    }
}

// ===================================================================================================
// `NG-I` (`AM-10`) — THE PROBE'S UNWRITABLE-PARENT AND READ-ONLY-FILE ARMS.
// ===================================================================================================

// **`NG-I` — `A52`'s TWO ARMS AT A PARENT THE MODE BITS CALL WRITABLE AND THE PROCESS CANNOT WRITE.**
// `A52`/`A55`: *"Reachable means the file exists **or that the application can write it successfully**"*;
// *"Dry run. File must have write access."* **The cell drives the probe's absent-file arm at the state the
// mode bits mis-describe and the read-only-file arm, where the answer must be `FilePathUnreachable` with NO
// instance (`§8.1` #13; `DD-40`).**
//
// **⟶ RE-DERIVED 2026-10-13, IN THE TWO PLACES THIS CELL WAS FOUND WEAK — AND NEITHER CORRECTION NARROWS
// ANYTHING.** **`AM-10`'s finding was that this cell claimed a state it did not drive: the as-filed cell read
// the mode bit BEFORE the `chmod` and asserted it AFTER, and at `0o555` BOTH instruments answer UNWRITABLE
// anyway — so its assertion was true by construction and its `app_can_create` match was a TAUTOLOGY
// (`docs/defects.md`'s `DEF-2026-10-13-B`; `F-4`).**
//   * **(1) THE STATE IS NOW THE DIVERGENT ONE: A FRESH DIRECTORY THIS PROCESS OWNS AT `0o200` —
//     OWNER-WRITE SET, OWNER-EXECUTE CLEARED.** `std::fs::metadata(dir).permissions().readonly()` is
//     `mode & 0o222 == 0`, so it answers **`false` (WRITABLE)** at `0o200`, **while the kernel answers
//     `EACCES`** to the very `create_new` the code performs — because ADDING A DIRECTORY ENTRY additionally
//     requires SEARCH/EXECUTE on the parent. **NO ACL, NO MOUNT AND NO PRIVILEGE IS NEEDED, AND IT IS THE
//     DIVERGENCE `DEF-20` WAS FILED FOR.** `0o555` was GREEN UNDER BOTH READINGS; `0o200` is green under
//     the amended one alone.
//   * **(2) THE MODE-BIT READING IS NO LONGER ASSERTED AS THE DECIDING INSTRUMENT.** The as-filed cell
//     computed `app_can_create` by performing **the same `create_new` the code performs** and then asserted
//     it on whichever branch the construction took — **a mode-bit-shaped tautology** (`contract.md §8.1`
//     #13's amended clause (a) declares `metadata.permissions().readonly()` WITHDRAWN as the deciding
//     instrument). **The replacement instrument is the KERNEL's own answer, taken ONCE as the cell's
//     PRE-CONDITION — and where it does not hold the cell FAILS LOUDLY rather than passing on a branch it
//     did not drive.**
// Drives: A52, A55, §8.1 #13 and its amended clause, DD-40, DD-45's amended clause, §7.1 step 4b, §7.2 item 1
#[test]
fn ng_i_the_probe_s_unwritable_parent_and_read_only_file_arms() {
    // (a) THE PARENT: mode bits writable, the process's write failing in fact — at `0o200`.
    let dir = fresh_path("ng-i-dir");
    std::fs::create_dir(&dir).expect("a directory for this cell's own path");
    let unreachable = format!("{dir}/state.json");
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o200))
            .expect("the directory is now `0o200`: owner-write set, owner-execute cleared");
    }
    // **PRE-CONDITION (i): THE MODE-BIT INSTRUMENT ANSWERS WRITABLE AT `0o200`** — read INSIDE the state the
    // kernel's answer is taken in (`implementation-plan.md §9.1` row `5` and `§9.5` item `3`).
    #[cfg(unix)]
    {
        let mode_says_writable = !std::fs::metadata(&dir)
            .expect("the directory's metadata")
            .permissions()
            .readonly();
        assert!(
            mode_says_writable,
            "A52/A55/§8.1` #13's amended clause (a): at `0o200` the parent carries the OWNER-WRITE bit, so \
             `readonly()` (`mode & 0o222 == 0`) answers `false`, i.e. WRITABLE — and the WITHDRAWN \
             instrument would answer this path REACHABLE. If this is `true`, the cell is not driving the \
             divergence it claims and FAILS here rather than passing for the wrong reason (`DEF-2026-10-13-B`)"
        );
    }
    // **PRE-CONDITION (ii): THE KERNEL ANSWERS DENIED TO THE CREATE THE CODE ITSELF PERFORMS.** **This is
    // the replacing instrument, asserted ONCE and BEFORE the drive — not re-derived from the branch the
    // construction took, which is the tautology `F-4` filed.**
    #[cfg(unix)]
    assert!(
        ng_i_kernel_denies_the_exclusive_create(&unreachable),
        "A52 (b)/§8.1 #13's amended clause (b): the KERNEL refuses the exclusive create at this parent \
         (`EACCES`), because adding a directory entry additionally requires SEARCH/EXECUTE on it. If it does \
         not refuse — a `uid=0` runner with `CAP_DAC_OVERRIDE` — THE DISCRIMINATING STATE IS NOT \
         CONSTRUCTIBLE HERE and every assertion below would hold under BOTH readings, so the cell FAILS \
         LOUDLY instead of reporting a green it did not earn"
    );
    #[cfg(unix)]
    assert!(
        !std::path::Path::new(&unreachable).exists(),
        "PRE-CONDITION (ii), its residue: the probing create was DENIED, so it left nothing behind"
    );

    match storeCreate(&cfg_at(&unreachable, 4)) {
        Ok(_) => panic!(
            "A52/A55/§8.1 #13's amended clause (b): *\"the application can write it successfully\"* does \
             NOT hold at this parent — the kernel DENIED the create — so the reachability test FAILS and NO \
             instance is returned. **AN INSTANCE HERE IS THE WITHDRAWN READING, WHOSE MODE-BIT INSPECTION \
             ANSWERS THIS PARENT WRITABLE** (`DEF-20`; `DEF-2026-10-13-B`)"
        ),
        Err(e) => {
            assert_code(
                &e,
                "FilePathUnreachable",
                "§8.1 #13/A52/A55: *\"the application can write it successfully\"* does not hold of this \
                 parent, so the PROVIDED path fails the reachability test",
            );
            assert!(
                e.message
                    .contains("the path must exist or the application must be able to write it"),
                "§8.2's `FilePathUnreachable` row: its `<available clause>`; got {}",
                e.message
            );
            assert!(
                !std::path::Path::new(&unreachable).exists(),
                "A55/DD-40: the probe is a DRY RUN — it creates NO file and NO byte"
            );
        }
    }
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&dir, std::fs::Permissions::from_mode(0o700));
    }
    let _ = std::fs::remove_dir_all(&dir);

    // (b) THE READ-ONLY FILE — the canonical form `A55` names (*"File must have write access"*), driven
    // exactly as `tests/construction.rs`'s shipped cell drives it, and here asserted at the arm's own code.
    let ro = fresh_path("ng-i-read-only");
    std::fs::write(&ro, b"{}").expect("the path holds a file");
    let mut perms = std::fs::metadata(&ro)
        .expect("the file's metadata")
        .permissions();
    perms.set_readonly(true);
    std::fs::set_permissions(&ro, perms).expect("the file is now read-only");
    let can_write = std::fs::OpenOptions::new().write(true).open(&ro).is_ok();
    match storeCreate(&cfg_at(&ro, 4)) {
        Ok(_) => assert!(
            can_write,
            "§8.1 #13/A55: an EXISTING BUT READ-ONLY file FAILS the reachability test — *\"write access is \
             required\"* — so NO instance is returned"
        ),
        Err(e) => {
            assert!(
                !can_write,
                "A52 (a): where the application CAN write the existing file, the path is reachable and an \
                 instance is returned; got {}",
                e.status
            );
            assert_code(
                &e,
                "FilePathUnreachable",
                "§8.1 #13: *\"the file exists\"* does NOT govern where the application cannot write it",
            );
        }
    }
    let _ = std::fs::remove_file(&ro);
}

/// **The instrument that replaces the mode-bit reading in `NG-I`: does the KERNEL refuse the exclusive
/// create the code itself performs?** `true` exactly where `create_new` answers `EACCES` (errno `13`) —
/// `contract.md §8.1` #13's amended clause (a): *"ARM (b) IS NOW DECIDED BY THE KERNEL'S OWN ANSWER TO AN
/// EXCLUSIVE CREATE … the MODE-BIT APPROXIMATION AND THE `metadata.permissions().readonly()` INSPECTION ARE
/// WITHDRAWN AS THE DECIDING INSTRUMENT"* (`docs/defects.md`'s `DEF-2026-10-13-B`). **Where it answers
/// `true` it leaves nothing behind: the create was denied.**
#[cfg(unix)]
fn ng_i_kernel_denies_the_exclusive_create(path: &str) -> bool {
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
// `NG-J` (`AM-12`) — THE MULTI-VERSION `VEC` RENUMBERING.
// ===================================================================================================

// **`NG-J` — `DD-30`'s PER-ANCHOR RENUMBERING, DRIVEN AT A SHADOWED ELEMENT.** `DD-30`/`§4.4`: a `VEC`'s
// deletion *"RENUMBERS that container's SURVIVING ANCHORS IN CONTAINER ORDER FROM `0` — each KEEPING ITS
// TIER and its NODE, only its index key moving"*. **The state: a `file`-tier `VEC` `[10, 20]` with a `temp`
// SHADOW standing at index `1` (`§3.4 W-5`'s less-persistent write is ADDED ALONGSIDE and shadows); the
// deletion of index `0` removes the `file` anchor there, leaving the `file` anchor of `20` and the `temp`
// anchor of `99` — ONE logical element with TWO anchors.** **`DD-30`'s literal words relabel EACH ANCHOR, so
// the two anchors of one logical element land on DIFFERENT index keys and the element is duplicated or
// mis-shadowed; the clause does not say whether a multi-version element's anchors renumber TOGETHER.**
// **The cell drives the deletion and asserts the two things clauses DO state: the surviving element's VALUE
// (the `temp` version wins the unqualified read, `§5.4` (c)) and that no anchor outlived its own
// `(key, tier)` pair without a value to answer.**
// Drives: DD-30, §4.4 D-2, §3.4 W-5, §5.4 (c), §4.2 R-3, §2.3
#[test]
fn ng_j_a_multi_version_vec_element_deleted_at_index_zero() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["v"])),
            w_file(),
            v_arr(vec![v_num(10.0), v_num(20.0)]),
        ),
        "§3.4 W-4 at `file`: the container's own version, indices 0 and 1",
    );
    ok(
        store.write(
            AddressArg::List(vec![Segment::Key("v".into()), idx(1)]),
            w_temp(),
            v_num(99.0),
        ),
        "§3.4 W-5: the `temp` version is ADDED ALONGSIDE and shadows the `file` one at index `1`",
    );
    // The pre-state, driven: the unqualified read answers the LOWER-persistence version at the shadowed
    // index (`§5.4` (c)) — this is what `DD-30`'s renumbering must preserve for the logical element.
    assert_eq!(
        read_at(&store, &vec![Segment::Key("v".into()), idx(1)]),
        v_num(99.0),
        "§5.4 (c): at one key with two versions the unqualified read answers the lower-ranked (`temp`)"
    );

    let removed = ok(
        store.delete(
            AddressArg::List(vec![Segment::Key("v".into()), idx(0)]),
            none(),
        ),
        "§4.4 D-2: the index-0 version is removed, whatever its tier",
    );
    assert!(
        !removed.tiers.is_empty(),
        "§4.4 D-2: the delete removed at least one version; got {removed:?}"
    );

    // THE SURVIVING LOGICAL ELEMENT, AT WHATEVER INDEX `DD-30` PUT IT — the observable is the VALUE SET and
    // not the index, because the clause's own words move index keys and keep nodes.
    let after = read_at(&store, &key(&["v"]));
    let items = match after {
        StoreValue::Array(items) => items,
        other => panic!("§4.2 R-3: a VEC reads as an array; got {other:?}"),
    };
    assert!(
        !items.is_empty(),
        "§5.5/§4.2 R-3: the container still carries the surviving element — an empty array would mean the \
         deletion removed MORE than index 0's own version"
    );
    // (a) EVERY MEMBER THE PARENT'S READ ANSWERS IS A SURVIVING VERSION'S OWN VALUE: `20` (the `file`
    // anchor of the old index 1) or `99` (its `temp` shadow) — never a value the store never held.
    for (i, item) in items.iter().enumerate() {
        assert!(
            *item == v_num(20.0) || *item == v_num(99.0),
            "DD-30/§4.2 R-3: the array's member {i} is a SURVIVING version's value (`20` the `file` \
             anchor, `99` its `temp` shadow); got {item:?} — a renumbering that relabels ONE version's \
             anchors apart makes the container answer a value the state never held"
        );
    }
    // (b) THE SHADOW IS NOT LOST: the logical element's winner (`99`) is still reachable — asserted at the
    // index the parent's read carries it at, so the cell reads the clause's own words (*"each KEEPING ITS
    // TIER and its NODE, only its index key moving"*).
    let winner_reachable = items.iter().any(|item| *item == v_num(99.0));
    assert!(
        winner_reachable,
        "DD-30: *\"each KEEPING ITS TIER and its NODE, only its index key moving\"* — the shadowed `temp` \
         version's node SURVIVES the deletion of another index's anchor, so the element's winning value is \
         still in the parent's own read; got {items:?} (AM-12: the clause does not say whether one element's \
         anchors renumber TOGETHER, and this cell drives the literal words)"
    );
    // (c) AND THE CONTAINER'S KEY DOMAIN IS STILL THE CONTIGUOUS ONE (`§1.3`; `§4.2` `R-3`): every index the
    // parent's read carries resolves, so no hole was opened by the renumbering.
    for index in 0..items.len() as u64 {
        let at = store.read(
            AddressArg::List(vec![Segment::Key("v".into()), idx(index)]),
            TierArg::Absent,
        );
        assert!(
            at.is_ok(),
            "§4.2 R-3/§1.3: the renumbered index `{index}` resolves — the array is dense from `0`; got {:?}",
            at.err().map(|e| e.status)
        );
    }
}

// ===================================================================================================
// `NG-K` (`AM-13`) — THE KIND TEST WITH A SHADOW PRESENT.
// ===================================================================================================

// **`NG-K` — `store-model.md §1.3`'s KIND-TEST SUBJECT, DRIVEN WHERE SEVERAL VERSIONS STAND AT THE KEY.**
// The clause reads *"the KIND a write's value must match is the kind of the TARGET SLOT — the value standing
// at the `key`"*, in the SINGULAR. **The state: a `file`-tier `MAP` and a `temp`-tier LITERAL stand at ONE
// key — the shadowed pair `§3.4 W-5` admits — and a `mem`-tier ARRAY write arrives.** The shadow's winner
// under `§5.4` (c) is the LITERAL, so the array contradicts nothing; the `file` version's `MAP` DOES
// contradict it. **`§1.3` does not say WHICH version decides when several stand at the key, and the answer
// is behaviour-bearing: whether `F-4` fires, which version a purge would remove, and what the key answers
// afterwards (`AM-13`'s `SPEC-FIX` is routed). The cell asserts `§1.3`'s own subject — *"the value standing
// at the `key`"* — at BOTH readings, so the divergence is named rather than smoothed, and it asserts the
// clauses beside it that hold under either: no half-installed state, no journal entry for a refused write
// (`§3.5`), and a successful write's own landing tier (`§5.4` (a)).**
// Drives: store-model.md §1.3, §3.4 F-4/W-5/W-6, §5.4 (a)/(c), §3.5, §5.1 M-1
#[test]
fn ng_k_the_kind_test_with_a_shadow_standing_at_the_addressed_key() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["k"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at `file`: a `MAP` branch at the key",
    );
    ok(
        store.write(AddressArg::List(key(&["k"])), w_temp(), v_str("shadow")),
        "§3.4 W-5 at `temp`: a LITERAL is added ALONGSIDE at a LOWER persistence and shadows the `MAP`",
    );
    // The pre-state, clause by clause: the key holds TWO versions (file, temp) and the unqualified read
    // answers the lower-ranked one — the LITERAL (`§5.4` (c)).
    assert_eq!(
        versions_at(&store, &key(&["k"])),
        vec![Tier::File, Tier::Temp],
        "§3.4 W-5/§5.1 M-1: the shadowed pair stands at one key, in `§5.1`'s canonical order"
    );
    assert_eq!(
        read_at(&store, &key(&["k"])),
        v_str("shadow"),
        "§5.4 (c): the unqualified read answers the LOWER-persistence version"
    );
    let before = read_at(&store, &key(&["k"]));

    // The `mem`-tier ARRAY: it CONTRADICTS the `file` version's `MAP` and matches the `temp` LITERAL's
    // (no kind test applies to a literal-to-array write). Whichever version `§1.3`'s SINGULAR subject names
    // is decisive, so both readings are driven below.
    let outcome = store.write(
        AddressArg::List(key(&["k"])),
        w_mem(),
        v_arr(vec![v_num(1.0)]),
    );

    match outcome {
        Ok(w) => {
            // THE READING IN WHICH THE KIND TEST DOES NOT FIRE: the state is driven, and `§5.4` (a)'s own
            // post-condition is asserted (`findAddress(address, t).anchor.tier === t`).
            assert_eq!(
                anchor_tier(&store, &key(&["k"]), Tier::Mem),
                Tier::Mem,
                "§5.4 (a): the write landed at its own tier"
            );
            assert_eq!(
                w.op.tier,
                Some(Tier::Mem),
                "§6.2: the returned op carries the write's tier"
            );
            // AND THE PURGE'S OWN SCOPE (`§5.4` (c)): every version at `rank ≤ rank(mem)` is gone — which
            // INCLUDES the `temp` literal the kind test would have read under `§1.3`'s other reading.
            let versions = versions_at(&store, &key(&["k"]));
            assert!(
                !versions.contains(&Tier::Temp),
                "§5.4 (c): every version at `rank ≤ rank(mem)` is purged by the write; the surviving \
                 versions are {versions:?} — the `temp` shadow this write's kind was read against is GONE, \
                 which is what makes `§1.3`'s single subject decisive (AM-13)"
            );
            assert!(
                versions.contains(&Tier::File),
                "§5.4 (c): a version MORE persistent than the write's own SURVIVES — the `file` `MAP` the \
                 array contradicts is still standing beside the new value (got {versions:?}), so the key now \
                 answers a `MAP` at `file` and an ARRAY at `mem`"
            );
        }
        Err(e) => {
            // THE READING IN WHICH THE KIND TEST FIRES ON THE `file` VERSION: `F-4`.
            assert_code(
                &e,
                "ContainerKindConflict",
                "§3.4 F-4/store-model.md §1.3: the kind test read the `file` version's `MAP` and the array \
                 contradicts it — the ONE member both directions of a kind conflict share (DD-19)",
            );
            // NOTHING IS INSTALLED, NOTHING IS PURGED, NO PAIR IS ADDED (`§3.4`'s designation clause;
            // `§3.5`'s fail-closed block) — asserted as the exact state, not the count.
            assert_eq!(
                read_at(&store, &key(&["k"])),
                before,
                "§3.4 F-4/§3.5: the refused write leaves the observable state identical"
            );
            assert_eq!(
                versions_at(&store, &key(&["k"])),
                vec![Tier::File, Tier::Temp],
                "§3.4 F-4: no version is purged and no anchor is destroyed or minted"
            );
            let next = ok(
                store.write(AddressArg::List(key(&["z"])), w_mem(), v_num(1.0)),
                "§3.4 W-3: the probe write after the refused one",
            );
            assert_eq!(
                next.op.seq, 3,
                "§3.5/§6.2: NO journal entry is appended for a failed write — the three successful writes \
                 before it took ordinals 1, 2 and this one takes 3"
            );
        }
    }
}

// ===================================================================================================
// `NG-L` (`AM-11`) — THE REGISTER MARKER AGAINST THE LEGAL `""` KEY.
// ===================================================================================================

// **`NG-L` — THE REGISTER'S REFERENCE'S MARKER AND THE LEGAL `""` KEY, DRIVEN AT THE REGISTER'S OWN TIER,
// AT THE OBSERVABLE THE AMENDED CONTRACT ITSELF DECLARES.** `store-model.md §1.6` item 4 (c)/(d) give the
// register's reference a DISTINCT CARRIER reference carrying the register's OWN conditional tier, and
// `store-model.md §1.5` item 1 says *"`""` is a legal `string` segment and is a legal key"*. **`AM-11`
// filed the collision between the empty-segment marker's spelling and that legal key, and the contract's
// amendment ANSWERS it by declaring the marker as a `ChildAnchor` PROPERTY with its own observable:**
// **`contract.md §0.4`'s added marker clause** (`⟶ AMENDED 2026-10-11`, the `NodeRef`/`ChildAnchor` spelling
// row's companion) **reads *"`ChildAnchor::register_marker: bool` — TRUE on EXACTLY ONE reference in a store,
// the register's … and FALSE on every reference a segment reaches"* and prints the two observables:
// `findAddress([], t).anchor.register_marker == true` and `findAddress([""], t).anchor.register_marker ==
// false` in a store whose register holds a `""` key — *"so the two references are DISTINGUISHED by a declared
// observable, and the EMPTY segment marker is a MARKER and NOT a key"*.** **`DD-44`'s row declares the same
// and retains the register's `anchor.key` spelling as `Segment::Key(String::new())` carried BESIDE the
// marker** — **which is exactly why this cell does NOT rest on `anchor.key`:** the two keys DO coincide
// (`AM-11`'s finding, unmoved), `§0.4`'s clause declares the `register_marker` observable as what separates
// the two references, and the cell asserts THAT (so the cell is failable for a wrong implementation and
// rests on no undeclared key distinction).
//
// **⟶ NOTE 2026-10-21 (role_test_writer): `anchor.key` IS A HISTORICAL SPELLING IN THIS FILE, AND NOTHING
// HERE MOVES.** The prose above is a DATED RECORD of `DD-44`/`AM-11`'s finding as it stood and stays
// byte-for-byte. Since then `§1.2`'s dated clause of 2026-10-21 (`store-model.md:237`) has removed `key`
// from the `ChildAnchor` member set, so `DD-44`'s *"retains the register's `anchor.key` spelling"* is no
// longer a member the shape carries — **the COINCIDENCE that clause records is what made this cell rest on
// no key, and the removal only WIDENS that: the cell drove `register_marker` then and drives it now.** No
// assertion in this file reads `anchor.key`, so no assertion moves.
// Drives: §0.4 (the added marker clause; `AMENDED 2026-10-11`), `DD-44`, store-model.md §1.6 item 4 (c)/(d),
// §1.5 item 1, §2.1 (amended empty-address clause), A49/A50/DD-34
#[test]
fn ng_l_the_register_marker_against_the_legal_empty_key() {
    let mut store = new_store();
    // The register's own tier is `file` here (the path passed the reachability test), so `[""]` can be
    // written at the register's own tier — the state in which the two anchor spellings are compared
    // directly (`§5.6`: with a `file` register all three tiers stand at a register key).
    let empty_key: Vec<Segment> = vec![Segment::Key(String::new())];
    ok(
        store.write(AddressArg::List(empty_key.clone()), w_file(), v_str("at-the-empty-key")),
        "store-model.md §1.5 item 1: `\"\"` is a legal string segment and a legal key — the write is \
         admitted at the register's own tier",
    );

    let register = ok(
        store.findAddress(AddressArg::List(empty_address()), TierArg::Absent),
        "§2.1: the empty address resolves to the register's own reference",
    );
    let at_the_empty_key = ok(
        store.findAddress(AddressArg::List(empty_key.clone()), TierArg::Absent),
        "§2.1: the legal `\"\"` key resolves through a walk step",
    );

    // THE CLAUSES THAT HOLD — each asserted, so the marker assertion below stands over a checked pre-state.
    assert_eq!(
        register.anchor.tier,
        at_the_empty_key.anchor.tier,
        "§1.6 item 4 (d)/A49: the register's own conditional tier is `file` in this store and the `\"\"` \
         key was written at that same tier — so the TIER observable cannot separate the cases either"
    );
    assert_eq!(
        read_at(&store, &empty_key),
        v_str("at-the-empty-key"),
        "§4.1: the legal `\"\"` key answers its own value at its own address"
    );
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("", v_str("at-the-empty-key"))]),
        "§4.2 R-5: the register's object carries the `\"\"` key as a member — so the register's own read \
         distinguishes the two states, which is the observable `AM-11` says the reference's does not"
    );

    // THE MARKER, ASSERTED AS THE CONTRACT DECLARES IT (`§0.4`'s added clause; `DD-44`): the two references
    // are DISTINGUISHED by a DECLARED OBSERVABLE and that observable is `ChildAnchor::register_marker` —
    // TRUE on the register's own reference and FALSE on the reference the legal `""` key's walk step reaches.
    // **The two `anchor.key` spellings DO coincide here** (`AM-11`'s finding; `DD-44` spells the marker's key
    // `Segment::Key(String::new())` BESIDE the marker), **so no assertion rests on them: the cell drives the
    // marker, and a store that marks BOTH references alike — or marks a segment-reached reference TRUE —
    // FAILS below.**
    assert!(
        register.anchor.register_marker,
        "§0.4's added marker clause / DD-44: `findAddress([], t).anchor.register_marker == true` — the \
         register's own reference is the ONE the marker is TRUE on (`§1.6` item 4 (a)/(b): its address is \
         the empty set)"
    );
    assert!(
        !at_the_empty_key.anchor.register_marker,
        "§0.4's added marker clause / DD-44: `findAddress([\"\"], t).anchor.register_marker == false` — the \
         `\"\"` reference is reached by a SEGMENT (`§1.5` item 1 makes it a legal one), and the marker is \
         FALSE on every reference a segment reaches"
    );
    assert_ne!(
        register.anchor, at_the_empty_key.anchor,
        "§0.4's added marker clause / DD-44: *\"so the two references are NEVER CONFUSABLE\"* — the \
         register's own anchor and the legal `\"\"` key's anchor are DISTINCT at the declared observable the \
         clause names (`register_marker`: TRUE vs FALSE), the tier and the key being equal here"
    );
}
