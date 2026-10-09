//! `tests/e2e_listener_firing.rs` — **THE END-TO-END LISTENER-FIRING BATTERY** for `U-STOREROOM-NATIVE`.
//!
//! **THE ARCHITECT'S DIRECTIVE THIS BATTERY DISCHARGES, VERBATIM:** *"Add listeners into the e2e and check
//! that they fire to the interface on edits at their address."*
//!
//! # AUTHORITY — read at its own `§`, cited per scenario
//!
//! * the listener surface: `docs/specs/storeroom-native/write-and-read.md` §6.5 items **8**–**13**, and its
//!   `§3.1.1` `listen` row (the verb's arity is `one address, no tier`);
//! * the listener record `{ address, handle }` and **BINDING BY ADDRESS**: §6.5 item 10 (a)/(b) (`A57`:
//!   *"Listener has an address to determine where it binds and a handle that it returns"*);
//! * **the trigger events** — item 10 (c) (`A43`: *"listeners don't fire on read, they fire on write/delete"*);
//! * **the returned members** — §3.6's amended `WriteResult { op, watched, triggered }` and §4.4's amended
//!   `DeleteReceipt { address, tiers, triggered }`, `triggered: Vec<ListenerHandle>`, **with the addresses
//!   staying in `watched`** (`DD-35`, which prices the re-meaning alternative);
//! * the home, the register's carrier node, and the **OPTIONAL** per-node index:
//!   `store-model.md` §1.1 (the member tables and their dated clause) and §1.6 item 4 (`A41`/`A42`/`A49`/
//!   `A50`/`A51`), with `contract.md` §5.8 (d)'s licence and `DD-41` / `§6.5` item 9's clause (a-bis);
//! * the construction surface — `seams-and-lifecycle.md` §7.1's ordered sequence (steps 1–7), the
//!   `listeners[]` adoption at step 5 (`A56`) and the duplicate case (`DD-39`), and §7.2 items 5–7 (the
//!   commit, the boot);
//! * `contract.md` §0.4 — the handle's construction rule (clauses 1–5) and every outside value;
//! * the register's rows — `P-TP-8` (`§5.8`, strategy `S-WATCH`, re-derived to the listener's property) and
//!   `P-SM-4` (f) (`§5.4`: *"no change action LOSES or DUPLICATES a listener's handle"*);
//! * the declared defaults — `DD-35` · `DD-36` (no tier test at any trigger) · `DD-37` (the order is
//!   unobservable) · `DD-38` (the home is out of the file bytes and out of the journal) · `DD-39` (the
//!   construction duplicate) · `DD-41` (the per-node index is optional) · `DD-42` (the mint's own rule);
//! * the fail set `seams-and-lifecycle.md` §8.1 (`15` members) and its generated messages §8.2;
//! * the amendments' rulings `A41`–`A60`, as filed at `docs/specs/storeroom-listeners-proposal.md`.
//!
//! # THE TWO THINGS THIS BATTERY NEVER ASSERTS
//!
//! **1. AN ORDER.** `DD-37`: *"THE ORDER IS UNSPECIFIED AND THE CONTRACT DECLARES ORDER-INSIGNIFICANCE: the
//! returned handle set is a SET, and a caller may rely on its MEMBERSHIP only."* Every comparison below goes
//! through `assert_triggered`/`assert_watched`, which compare **multisets** (cardinality included, so a
//! handle LOST or DUPLICATED fails, and `DD-42`'s lawful caller-spelled duplicate stays observable) and
//! **never** an index-into-index correspondence (`§5.8` (f) (3a)/(3b)/(3c)).
//! **2. ANY INVOCATION.** §6.5 item 10 (d): *"THE STORE NEVER INVOKES ANYTHING: IT RETURNS THE HANDLES"* —
//! so no callback body exists to call and none is asserted; **the returned handle IS the alert**, and the
//! parked `P-1` crossing is neither driven nor read as a closure (`§6.5` item 10 (d) (ii)).
//!
//! # TWO PLACES WHERE THE DIRECTIVE'S OWN WORDING IS NOT THE CONTRACT'S SHAPE, STATED SO NO ASSERTION IS
//! QUIETLY WEAKENED
//!
//! * **"a failed write carries an empty `triggered`" has NO INSTANCE.** §3.6/§4.4/§6.5 item 11: *"a FAILED
//!   write and a FAILED delete return NOTHING (each throws)"* — so there is no receipt and no list to
//!   carry. The category-E fail-arm drives therefore assert the contract's own three observables: the
//!   DECLARED code (§8.1), **zero residue** (§3.5: *"The store's observable state after a failed write is
//!   byte-identical to its state before it"*), and that the registration SURVIVES the refusal unchanged.
//! * **THE DELETE'S DIRECTION IS THE PREFIX RULE'S AND NOT ITS INVERSE.** The contract is explicit
//!   (§6.5 item 10 (d) (iii) + §4.4's dated clause): a listener fires iff **the listener's address is a
//!   PREFIX of the trigger's address**. So, at the delete: a listener bound AT the deleted address fires; a
//!   listener bound at a strict **ANCESTOR** of it fires (the delete resolves *through* it); and a listener
//!   bound at a strict **DESCENDANT** of it does **NOT** — *"the delete resolves to the named node and
//!   removes its subtree; it passes through the named address's ancestors and not through its
//!   descendants"*. Scenarios D2/D3 drive both directions and assert the clause's own words.
//!
//! # THE STATES THIS BATTERY DOES **NOT** DRIVE, EACH WITH ITS REASON (the skip list)
//!
//! * **The superseded `watch`/`unwatch`/`WatchHandle` surface.** `A58` rules the stopgap superseded and
//!   `write-and-read.md §6.5`'s supersession clause 2 declares *"NO DEPRECATION WINDOW: THE REPLACEMENT
//!   LANDS IN ONE PASS"*. The verbs are not reachable through `tests/support`'s `pub use`, so no drive
//!   could call them and none is attempted: the state has no instance on the declared surface.
//! * **A TIER-QUALIFIED registration's effect on the returned list** (`§6.5` item 7, the stopgap's own
//!   clause). `DD-36` strikes the qualifier from the listener surface (`*"NOTHING carries over from the
//!   superseded registration's tier qualifier"*), and `§3.1.1`'s `listen` row carries NO tier slot — `F-4`'s
//!   item 4 states outright that the row's `tier`-column cells are *"NOT REACHABLE STATES OF THIS VERB"*.
//!   A tier-shaped second argument is therefore a COMPILE error at this surface, and not a runtime arm: it
//!   cannot be driven and was not invented into a requirement. The tier-INDEPENDENCE the listener surface
//!   does declare is driven positively at C7 (the same handle fires at `temp`, `mem` and `file`).
//! * **The per-node index's materialization itself** (`DD-32`/`DD-41`). `§6.5` item 9 (a-bis) and `§5.8` (d)
//!   declare the index OPTIONAL and the two sets IDENTICAL in either spelling, so the interface makes the
//!   choice unobservable by declaration. The battery drives the SETS — exactly what the contract makes
//!   observable — and F2 drives the `§5.8` `(iv)` destruction observable (*"NO LOST AND NO DUPLICATED
//!   handle"*) that is failable in BOTH spellings.
//! * **The `P-1` JS crossing.** `§6.5` item 10 (d) (ii): the firing model does not need `P-1`, the store
//!   RETURNS the handles and invokes nothing, and *"the parked JS crossing is only about how a JS client
//!   eventually RECEIVES that list"*. No crossing is driven, no callback is asserted, and `P-1` is not read
//!   as a closure.
//!
//! # THE SCENARIO INVENTORY — id · category · the clause it drives
//!
//! | id | category | the clause |
//! | --- | --- | --- |
//! | `A1`–`A7` | registration both ways, and the array's own fail arms | `§7.1` step 5 and its `cfg.listeners` row; `§6.5` items 8 (d), 10, 12 (b)/(c); `DD-39`; `§0.4` cl. 1–3; `§1.5` item 4; `PAR-12` |
//! | `B1`–`B4` | **the core check** (an edit at the listener's own address) | `§6.5` item 10 (d) (iii); `§5.8` (a); `A33`/`A37`; `DD-18`; `DD-37` |
//! | `C1`–`C8` | every edit shape (`W-1`…`W-6`, the promotion, the purge) | `§3.4`'s arm table; `§3.5`; `§5.4`'s purge chain; `§6.5` item 10 (d) |
//! | `D1`–`D6` | the delete side (`D-1`…`D-4`) | `§4.4`'s arms and its dated firing clause; `DD-9`; `§2.2` `L-3`/`L-4` |
//! | `E1`–`E13` | the negatives (a read never fires; every reachable fail arm; `unlisten`; the rollback) | `§6.5` item 10 (c); `§3.4` `F-1`…`F-6`; `§3.5`; `§8.1`; `§0.4` cl. 3 |
//! | `F1`–`F6` | the two lists and the borrow lifecycle through the interface | `§6.5` item 9 (a)/(a-bis) (`A46`/`A47`); `§5.8` (c)/(d)/(f); `DD-32`; `DD-39`/`DD-42` |
//! | `G1`–`G2` | the full user flow to the final resolved state, and the boot | `§7.1` steps 1–7; `§7.2` items 5–7; `DD-28`; `DD-38`; `P-TP-7` |
//!
//! # THE STATES ENUMERATED PER CONCERN (so no state is silently skipped)
//!
//! **Registration (`§6.5` items 8, 12):** supplied in the construction's `listeners[]` · registered by
//! `listen` afterwards · both side by side at one edit · the same address registered twice by `listen`
//! (address-level idempotence) · a construction duplicate address with two DIFFERENT handles · a
//! construction duplicate carrying ONE caller-spelled token · a listener bound at the empty address · a
//! listener bound at an address that holds no node yet (`§7.1` step 5 precedes the registry) · a listener
//! withdrawn by `unlisten` · an unlisten of an already-removed handle · a foreign instance's handle · a
//! fabricated handle `unlisten` and a prior-session token.
//! **The trigger set (`§5.8` (a), `A33`/`A37`, `DD-18`):** the edit AT the listener's address · an edit at a
//! strict DESCENDANT of it · an edit at a strict ANCESTOR of it · an edit at an unrelated address · an edit
//! at a key that merely starts with the listener's key text · a listener at the empty address.
//! **The write arms (`§3.4`):** `W-1` · `W-2` · `W-3` · `W-4` · `W-5` · `W-6`; the `temp`→`mem`→`file`
//! promotion flow; a purge driven by a higher-tier write.
//! **The delete arms (`§4.4`):** `D-1` · `D-2` · `D-3` · `D-4` (the refusal, in both its `L-3` and its
//! `L-4` spellings).
//! **The fail arms (`§3.4` `F-1`…`F-6`):** absent tier · a value outside `§1.4` · an unreachable parent ·
//! a container-kind conflict in both its value-class and its key-class directions · a `VEC` index above
//! the contiguous range (`DD-43`) · a `leaf` parent · a monotonicity violation.
//! **The construction array's outside values (`§7.1`'s `cfg.listeners` row; `PAR-12`):** ABSENT · `null` ·
//! `undefined` · a non-array · a blank-token handle · an outside `address` segment · an entry that is not
//! the record at all.
//! **The read side (`§6.5` item 10 (c)):** `read` · `findAddress` · `readLiteral` · a read at the empty
//! address (the home is not in the graph's read) · `rollback`.
//! **The two lists (`§5.8` (e)/(f)):** the ordinary one-entry-per-address case (counts equal) · the
//! `DD-39` duplicate case (counts DIFFER BY DECLARATION) · the `DD-42` minted-vs-adopted collision case.
//! **The destroy-and-replace arms (`§6.5` item 9 (a), `A46`):** a `W-2` re-mint · a `W-6` purge · a delete
//! removal — each followed by a LATER edit at the same (re-created) address.
//! **The construction/boot (`§7.1`, `§7.2`):** a path-provided instance · a pathless instance · a fresh
//! instance over an equal path (no registration loaded) · the durable state after a boot.
//!
//! **NO ASSERTION IN THIS FILE IS WEAKENED TO MAKE A SCENARIO PASS, AND NO DRIVE IS ADJUSTED TO AVOID ONE.**

mod support;
use support::*;

// ===================================================================================================
// THE BATTERY'S OWN OBSERVABLES — the two SET comparisons (`DD-37`) and the drive shorthands.
// ===================================================================================================

fn fmt_address(a: &[Segment]) -> String {
    format!("{a:?}")
}

fn fmt_addresses(list: &[Vec<Segment>]) -> String {
    list.iter()
        .map(|a| fmt_address(a))
        .collect::<Vec<_>>()
        .join(" | ")
}

fn fmt_handles(handles: &[ListenerHandle]) -> String {
    let mut out: Vec<String> = handles.iter().map(|h| format!("{h:?}")).collect();
    out.sort();
    out.join(", ")
}

/// **`§5.8` (a) asserted as the contract declares it — SET EQUALITY, NEVER A SEQUENCE** (`DD-37`). The
/// comparison is over multisets, so a handle LOST or DUPLICATED by the drive fails `§5.8`'s failure list
/// (*"a listener's handle LOST or DUPLICATED by a change action"*) while `DD-42`'s lawful caller-spelled
/// duplicate remains observable — and **no index-into-index correspondence is ever asserted**
/// (`§5.8` (f) (3b): *"NEVER as an index-into-index correspondence"*).
fn assert_triggered(what: &str, observed: &[ListenerHandle], expected: &[ListenerHandle], clause: &str) {
    assert!(
        same_handle_set(observed, expected),
        "{what}: {clause} — the DECLARED `triggered` set is {{{}}} ({} member(s)) and the store returned \
         {{{}}} ({} member(s)); no order is asserted (DD-37)",
        fmt_handles(expected),
        expected.len(),
        fmt_handles(observed),
        observed.len()
    );
}

/// **`§5.8` (e) + (f) (3a) — `watched` is the ADDRESS projection of `triggered`**, compared as a set
/// (`§6.5` item 5: *"NO ORDER IS DECLARED FOR THE LIST"*, extended to both lists by `DD-37`).
fn assert_watched(what: &str, observed: &[Vec<Segment>], expected: &[Vec<Segment>], clause: &str) {
    assert!(
        same_address_set(observed, expected),
        "{what}: {clause} — the DECLARED `watched` set is [{}] ({} member(s)) and the store returned [{}] \
         ({} member(s)); no order is asserted (DD-37)",
        fmt_addresses(expected),
        expected.len(),
        fmt_addresses(observed),
        observed.len()
    );
}

/// `§7.1`'s amended construction with all three members: a fresh path (the register's tier is fixed at
/// `file`, `A49`/`A50`), a journal bound of `64`, and the caller's `listeners[]` array.
fn store_with(path: &str, ls: ListenersArg) -> Store {
    ok(
        storeCreate(&cfg_at_with_listeners(path, 64, ls)),
        "§7.1: `filePath` present and reachable, `journalLength` a positive integer, `listeners[]` an \
         array in its domain — an instance IS returned",
    )
}

fn write_at(
    store: &mut Store,
    address: Vec<Segment>,
    tier: TierArg,
    value: StoreValue,
    what: &str,
) -> WriteResult {
    ok(store.write(AddressArg::List(address), tier, value), what)
}

fn delete_at(
    store: &mut Store,
    address: Vec<Segment>,
    tier: TierArg,
    what: &str,
) -> DeleteReceipt {
    ok(store.delete(AddressArg::List(address), tier), what)
}

fn listen_at(store: &mut Store, address: Vec<Segment>, what: &str) -> ListenerHandle {
    ok(store.listen(AddressArg::List(address)), what)
}

/// **The residue observable: a read at the EMPTY address returns the whole register as an object and NEVER
/// the home** (`A43`/`A48`; `§1.5` item 4's second half; `§5.8` (c)) — so the whole graph's read is the
/// observable every fail-closed arm's zero-residue clause (`§3.5`) is asserted over.
fn register(store: &Store) -> StoreValue {
    read_at(store, &empty_address())
}

fn assert_zero_residue(store: &Store, before: &StoreValue, what: &str, clause: &str) {
    assert_eq!(
        &register(store),
        before,
        "{what}: {clause} — §3.5's fail-closed guarantee: *\"The store's observable state after a failed \
         write is byte-identical to its state before it\"* (DD-4, DD-19)"
    );
}

// ===================================================================================================
// A. REGISTRATION BOTH WAYS — the construction's `listeners[]` and the `listen` verb, side by side.
// ===================================================================================================

// SCENARIO A1 — a listener supplied in the CONSTRUCTION's `listeners[]`, with its CALLER-SPELLED handle,
// fires at its own address, and the handle returned is EXACTLY the token the caller passed.
// Clauses: `seams-and-lifecycle.md §7.1` steps 5–6 (`A56`: the home is populated BEFORE the registry is
//   generated, so the carrier node borrows from an already-populated home); `write-and-read.md §6.5`
//   item 8 (d) and item 12 (b) (`ADOPTED VERBATIM`, never re-minted); `contract.md §0.4` clause 1 (the ONE
//   infallible constructor `ListenerHandle::from`) and clause 2 (b) (adoption); `DD-39`.
// Drive: `storeCreate` over a fresh path with `listeners[] = [ {["a"], "adopted-a"} ]`; then
//   `write(["a"], mem, 1)`.
// Expected `triggered`: EXACTLY `{ "adopted-a" }`.
// Observable: `WriteResult.triggered`, compared as a set (`DD-37`).
#[test]
fn lf_a1_construction_listener_fires_with_the_caller_spelled_handle() {
    let adopted = handle("adopted-a");
    let mut store = store_with(
        &fresh_path("lf-a1"),
        listeners(vec![entry(key(&["a"]), adopted.clone())]),
    );
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_num(1.0),
        "§3.4 W-3: an unoccupied key and a literal — the edit lands AT the listener's own address",
    );
    assert_triggered(
        "A1",
        &r.triggered,
        &one_handle(&adopted),
        "§6.5 item 8 (d) + item 12 (b): *\"each accepted `listeners[]` entry's `handle` becomes that home \
         entry's handle, UNCHANGED and NOT re-minted\"*",
    );
}

// SCENARIO A2 — a listener registered by `listen` AFTER the construction MINTS its handle, and fires at
// its own address.
// Clauses: `§6.5` item 12 (c) (the mint), item 12 (a) (the type and its construction rule), `§5.8` (a).
// Drive: `listen(["a"])` on a fresh store; `write(["a"], mem, "v")`.
// Expected `triggered`: EXACTLY `{ h }` where `h` is the handle `listen` returned.
// Observable: `WriteResult.triggered` as a set.
#[test]
fn lf_a2_a_listen_minted_listener_fires_at_its_own_address() {
    let mut store = new_store();
    let h = listen_at(
        &mut store,
        key(&["a"]),
        "§6.5 item 12 (c): `listen` mints a fresh store-unique token where the address is not yet held",
    );
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_str("v"), "§3.4 W-3");
    assert_triggered(
        "A2",
        &r.triggered,
        &one_handle(&h),
        "§6.5 item 12 (c) + §5.8 (a): the minted handle is what a trigger RETURNS — the store invokes \
         nothing (A57)",
    );
}

// SCENARIO A3 — the two kinds of registration firing SIDE BY SIDE at one edit, and the descendant-bound
// listener staying silent when the edit resolves to its ancestor.
// Clauses: `§7.1` step 5 + `§6.5` item 12 (c) (the two ways in); `§6.5` item 10 (d) (iii) (`A33`/`A37`,
//   `DD-18`: descendant-inclusive FROM THE LISTENER'S ADDRESS DOWNWARD).
// Drive: construct with `{["a"], "adopted-a"}`; `listen(["a","b"])` → `minted`; `write(["a"], mem, {})`
//   (the branch at `a`); then `write(["a","b"], mem, 2)`.
// Expected: the first edit → `{adopted}` ALONE (the listener at `["a","b"]` is a DESCENDANT of the write's
//   address, so it is not triggered: `["a","b"]` is not a prefix of `["a"]`); the second edit →
//   `{adopted, minted}` — the write resolves THROUGH `["a"]` and AT `["a","b"]`.
// Observable: the two `triggered` sets.
#[test]
fn lf_a3_the_two_registration_kinds_fire_side_by_side() {
    let adopted = handle("adopted-a");
    let mut store = store_with(
        &fresh_path("lf-a3"),
        listeners(vec![entry(key(&["a"]), adopted.clone())]),
    );
    let minted = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c)");
    let first = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_obj(&[]),
        "§3.4 W-4: the branch at `a`, so the descendant write below has a link to land under",
    );
    assert_triggered(
        "A3 (the edit AT `a`)",
        &first.triggered,
        &one_handle(&adopted),
        "§6.5 item 10 (d) (iii): the selection is `W` is a PREFIX of `X`, so the listener bound at the \
         DESCENDANT `[\"a\",\"b\"]` is not triggered by an edit at `[\"a\"]`",
    );
    let second = write_at(&mut store, key(&["a", "b"]), w_mem(), v_num(2.0), "§3.4 W-3");
    assert_triggered(
        "A3 (the edit THROUGH `a` at `a/b`)",
        &second.triggered,
        &[adopted.clone(), minted.clone()],
        "A33: *\"Alerts if a write resolves to or through the matched address\"* — the adopted ancestor \
         listener and the minted own-address listener fire TOGETHER",
    );
}

// SCENARIO A4 — the same address registered TWICE by `listen` is ONE home entry and ONE fire
// (address-level idempotence carried to the listener surface).
// Clauses: `§6.5` item 12 (c) (*"a `listen(address)` whose address IS already registered returns the
//   EXISTING entry's handle rather than minting a second one"*) + item 2 (kept: the returned list carries
//   DISTINCT addresses).
// Drive: `listen(["a"])` twice; then `write(["a"], mem, 1)`.
// Expected `triggered`: EXACTLY `{ h1 }` with `h1 == h2`; `watched` = `{ ["a"] }` ONCE.
// Observable: handle equality (`§0.4` clause 1's `PartialEq`), the set's CARDINALITY, and `watched`.
#[test]
fn lf_a4_listen_twice_at_one_address_is_one_entry_and_one_fire() {
    let mut store = new_store();
    let h1 = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let h2 = listen_at(
        &mut store,
        key(&["a"]),
        "§6.5 item 12 (c): an already-registered address returns the EXISTING entry's handle",
    );
    assert_eq!(
        h1, h2,
        "§6.5 item 12 (c): address-level idempotence carried to the listener surface — the SAME handle is \
         returned, and no second entry is minted"
    );
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "A4",
        &r.triggered,
        &one_handle(&h1),
        "§6.5 item 12 (c): ONE entry, ONE fire — a second member here would be a duplicated handle",
    );
    assert_eq!(
        r.triggered.len(),
        1,
        "A4: *\"exactly once\"* — the set has ONE member (§5.8 (a): no member added, none omitted)"
    );
    assert_watched(
        "A4",
        &r.watched,
        &[key(&["a"])],
        "§6.5 item 2 (kept): the returned list carries DISTINCT addresses — the address appears ONCE",
    );
}

// SCENARIO A5 — a CONSTRUCTION duplicate address is ADMITTED and BOTH entries are KEPT, and a trigger
// returns BOTH handles.
// Clauses: `seams-and-lifecycle.md §7.1` step 5 + `DD-39` (*"the home then holds two entries at one
//   address with two DIFFERENT handles, and a trigger returns both"*); `P-TP-7` (2 entries in ⇒ 2 entries
//   in the home).
// Drive: `listeners[] = [ {["a"], "dup-1"}, {["a"], "dup-2"} ]`; then `write(["a"], mem, 1)`.
// Expected `triggered`: EXACTLY `{ "dup-1", "dup-2" }` — TWO members; `watched` carries `["a"]` ONCE.
// Observable: the two sets and their cardinalities (the count INEQUALITY here is the contract's own
//   declared answer and is driven again at F5).
#[test]
fn lf_a5_a_construction_duplicate_keeps_both_entries_and_both_fire() {
    let h1 = handle("dup-1");
    let h2 = handle("dup-2");
    let mut store = store_with(
        &fresh_path("lf-a5"),
        listeners(vec![
            entry(key(&["a"]), h1.clone()),
            entry(key(&["a"]), h2.clone()),
        ]),
    );
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "A5",
        &r.triggered,
        &[h1.clone(), h2.clone()],
        "DD-39: *\"a DUPLICATE is ADMITTED AND BOTH ENTRIES ARE KEPT … the home then holds two entries at \
         one address with two DIFFERENT handles, and a trigger returns both\"* — the construction is a \
         POPULATION step and not the `watch` verb's idempotent registration",
    );
    assert_watched(
        "A5",
        &r.watched,
        &[key(&["a"])],
        "§5.8 (e) + (f) (3a): `watched` carries the DISTINCT addresses of the triggered listeners, so ONE \
         address stands beside TWO handles",
    );
}

// SCENARIO A6 — a listener bound at the EMPTY address fires on every edit, because the empty address is a
// PREFIX of every address, and its address is `watched` ONCE.
// Clauses: `store-model.md §1.5` item 4 (the empty address is a VALID address: *"the empty array is a valid
//   address"*); `§6.5` item 9 (b) (the home is populated before the registry, so a binding needs no node);
//   `§6.5` item 10 (b)/(d) (iii); `§6.5` item 3 (the PREFIX relation).
// Drive: `listen([])`; `write(["a"], mem, 1)`; then `write(["z"], mem, {})` and `write(["z","y"], mem, 2)`.
// Expected `triggered`: `{ root }` at EVERY one of the three edits; `watched` = `{ [] }`.
// Observable: the three `triggered` sets.
#[test]
fn lf_a6_a_listener_bound_at_the_empty_address_fires_on_every_edit() {
    let mut store = new_store();
    let root = listen_at(
        &mut store,
        empty_address(),
        "§1.5 item 4: the empty address is a legal address; §6.5 item 10 (b): the binding is BY ADDRESS",
    );
    let first = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "A6 (edit 1)",
        &first.triggered,
        &one_handle(&root),
        "§6.5 item 3: the empty address IS a PREFIX of every address — the write resolves *through* it",
    );
    assert_watched(
        "A6 (edit 1)",
        &first.watched,
        &[empty_address()],
        "§5.8 (f) (3a): the empty address stands ONCE in the address projection",
    );
    let second = write_at(
        &mut store,
        key(&["z"]),
        w_mem(),
        v_obj(&[]),
        "§3.4 W-4: a branch in an unrelated subtree",
    );
    assert_triggered(
        "A6 (edit 2, an unrelated subtree)",
        &second.triggered,
        &one_handle(&root),
        "§6.5 item 3: the empty address is a prefix of `[\"z\"]` too",
    );
    let third = write_at(
        &mut store,
        key(&["z", "y"]),
        w_mem(),
        v_num(2.0),
        "§3.4 W-3",
    );
    assert_triggered(
        "A6 (edit 3, a descendant of the unrelated subtree)",
        &third.triggered,
        &one_handle(&root),
        "§6.5 item 3: every address has the empty address as a prefix",
    );
}

// SCENARIO A7 — the CONSTRUCTION's `listeners[]` FAIL ARMS: every outside value of `§7.1`'s amended row
// answers `AddressMalformed` and returns NO instance — a malformed entry cannot therefore ever reach the
// home and can never fire.
// Clauses: `seams-and-lifecycle.md §7.1` step 5 (*"each entry's `address` is checked against `PAR-1`'s
//   domain (outside → `AddressMalformed`, NO instance returned)"*) and its `cfg.listeners` table row;
//   `parameter-semantics.md §2.12`'s six outside values (3 shape-less + 1 non-array + 2 malformed-entry
//   classes); `contract.md §0.4` clause 3 (a blank token); `§8.1` #1.
// Drive: seven `storeCreate` calls, each carrying ONE outside value for the array (ABSENT · `null` ·
//   `undefined` · a non-array · an entry whose handle is the blank token · an entry whose address carries
//   a segment outside `§1.5` item 1's domain · an entry that is not an `{ address, handle }` record at all).
// Expected: `AddressMalformed` for EVERY one, and NO instance returned — so no listener exists to fire.
// Observable: the `Err` and its `status`.
#[test]
fn lf_a7_the_construction_listener_array_refuses_every_outside_value() {
    let path = fresh_path("lf-a7");
    let cases: Vec<(&str, ListenersArg, &str)> = vec![
        (
            "listeners ABSENT",
            ListenersArg::Absent,
            "§7.1 step 5 + PAR-12: ABSENT is the ONE absence `A56`'s construction does NOT admit",
        ),
        (
            "listeners null",
            ListenersArg::Null,
            "§7.1's `cfg.listeners` row: the shape-less values answer `AddressMalformed` (`PAR-12`)",
        ),
        (
            "listeners undefined",
            ListenersArg::Undefined,
            "§7.1's `cfg.listeners` row: `undefined` is the same SHAPE class as `null`",
        ),
        (
            "listeners a non-array",
            ListenersArg::NonArray("not an array".into()),
            "§7.1's `cfg.listeners` row: a non-array is not the argument's shape at all",
        ),
        (
            "an entry whose handle is the blank token",
            listeners(vec![entry(key(&["a"]), handle(""))]),
            "§0.4 clause 3: *\"a blank token\"* is outside the handle's domain and the construction answers \
             `AddressMalformed` for it with NO instance returned",
        ),
        (
            "an entry whose address carries an outside segment",
            listeners(vec![entry(vec![Segment::Negative(-1)], handle("h"))]),
            "§7.1 step 5 + §1.5 item 1: a segment outside the closed domain (`string` | non-negative \
             integer) is `PAR-1`'s own answer carried into the array",
        ),
        (
            "an entry that is not a `{ address, handle }` record",
            listeners(vec![ListenerEntry::Other]),
            "PAR-12's element-shape class: the entry's shape is not the record's shape",
        ),
    ];
    for (what, ls, clause) in cases {
        let e = failure(
            storeCreate(&cfg_full(
                p_path(&path),
                n_count(64),
                ls,
            )),
            clause,
        );
        assert_code(
            &e,
            "AddressMalformed",
            &format!("A7 ({what}): §7.1's `cfg.listeners` row + §8.1 #1 — the declared answer to every one \
                      of its outside values, with NO instance returned"),
        );
    }
}

// ===================================================================================================
// B. **THE CORE CHECK THE DIRECTIVE ASKS FOR** — an edit AT a listener's own address fires that
// listener's handle, exactly once; the ancestor case; and the two non-cases.
// ===================================================================================================

// SCENARIO B1 — THE DIRECTIVE'S OWN CHECK. A listener bound at `["a"]` and a write AT `["a"]`:
// `triggered` is EXACTLY `{ h }` — one member, the listener's own handle, and no other.
// Clauses: `write-and-read.md §6.5` item 10 (d) (iii) (`A33`/`A37`; `DD-18`) — *"a listener bound at address
//   `W` is triggered by a successful `write` … at address `X` iff `W` is a PREFIX of `X`"*; `§5.8` (a)
//   (*"NO MEMBER is added and none omitted"*); `DD-37` (set equality, never a sequence).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)`.
// Expected `triggered`: EXACTLY `{ h }`.
// Observable: the set, and its cardinality — *"exactly once"*.
#[test]
fn lf_b1_an_edit_at_the_listeners_own_address_fires_exactly_that_handle() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_num(1.0),
        "§3.4 W-3: the edit resolves TO the listener's own address",
    );
    assert_triggered(
        "B1",
        &r.triggered,
        &one_handle(&h),
        "§6.5 item 10 (d) (iii) + §5.8 (a): `triggered` is EXACTLY the set of handles whose listener's \
         address is a PREFIX of the write's address",
    );
    assert_eq!(
        r.triggered.len(),
        1,
        "B1: *\"exactly once\"* — a second member would be a DUPLICATED handle (§5.8 (a), DD-42's minted-token \
         half), and no order is asserted (DD-37)"
    );
}

// SCENARIO B2 — THE ANCESTOR CASE: a listener bound at `["a"]`, a write THROUGH it at `["a","b"]`.
// Clauses: `A33` (*"Alerts if a write resolves to or through the matched address"*); `A37` (*"Listener
//   fires if the address or any of its descendants is resolved on write"*); `DD-18`; `§6.5` item 10 (d)
//   (iii); `§5.8` (a).
// Drive: `listen(["a"])`; `write(["a"], mem, {})` (so `["a"]` is a link); `write(["a","b"], mem, 1)`.
// Expected `triggered` at the second edit: EXACTLY `{ h }`; the first edit's set is `{ h }` as well.
// Observable: the two `triggered` sets.
#[test]
fn lf_b2_a_write_through_the_listeners_address_fires_it() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c) at the ancestor");
    let branch = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_obj(&[]),
        "§3.4 W-4: the branch at `a`, so the descendant write has a link to land under",
    );
    assert_triggered(
        "B2 (the edit AT the ancestor's own address)",
        &branch.triggered,
        &one_handle(&h),
        "§6.5 item 10 (d) (iii): the write resolves TO `[\"a\"]`",
    );
    let through = write_at(&mut store, key(&["a", "b"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "B2 (the edit THROUGH the ancestor)",
        &through.triggered,
        &one_handle(&h),
        "A37 + DD-18: *\"a watched address `W` is returned after a successful write at address `X` iff `W` \
         is a PREFIX of `X`\"* — DESCENDANT-INCLUSIVE FROM THE WATCHED ADDRESS DOWNWARD",
    );
}

// SCENARIO B3 — THE FIRST NON-CASE: a listener bound at `["a"]` and a write at the UNRELATED address
// `["z"]` → `triggered` is EMPTY (and so is `watched`).
// Clauses: `§5.8` (a) (*"NO MEMBER is added"*), (e)/(f) (3a); `§6.5` item 3.
// Drive: `listen(["a"])`; `write(["z"], mem, 1)`.
// Expected: `triggered == []`, `watched == []`.
// Observable: both returned sets, plus direct membership of the handle.
#[test]
fn lf_b3_a_write_at_an_unrelated_address_does_not_fire_it() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let r = write_at(&mut store, key(&["z"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "B3",
        &r.triggered,
        &[],
        "§5.8 (a): `[\"a\"]` is NOT a prefix of `[\"z\"]`, so the handle is not returned",
    );
    assert_watched(
        "B3",
        &r.watched,
        &[],
        "§5.8 (f) (3a): the address projection of an empty handle set is empty",
    );
    assert!(
        !r.triggered.contains(&h),
        "B3: the handle bound at [\"a\"] is absent from the returned set"
    );
}

// SCENARIO B4 — THE SECOND NON-CASE: a listener bound at `["a"]` and a write at `["a2"]` — a key whose
// TEXT starts with the listener's key text and whose SEGMENT LIST does not.
// Clauses: `§1.5` item 1 (an address is a SEGMENT LIST); `§6.5` item 3 (the PREFIX relation over segment
//   lists, never over string text); `§5.8` (a).
// Drive: `listen(["a"])`; `write(["a2"], mem, 1)`.
// Expected: `triggered == []`.
// Observable: the set, plus membership of the handle.
#[test]
fn lf_b4_a_key_that_merely_starts_with_the_listeners_key_text_does_not_fire_it() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let r = write_at(&mut store, key(&["a2"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "B4",
        &r.triggered,
        &[],
        "§6.5 item 3: the selection rule is a PREFIX relation over SEGMENT LISTS (`§1.5` item 1) and never \
         a string-prefix test over key text",
    );
    assert!(
        !r.triggered.contains(&h),
        "B4: `key([\"a2\"])` is not a descendant of `key([\"a\"])`"
    );
}

// ===================================================================================================
// C. EVERY EDIT SHAPE — the write's closed arm table `W-1`…`W-6` (`§3.4`), the tier promotion, and the
// purge a higher-tier write drives. **THE EDIT AT THE LISTENER'S ADDRESS FIRES IT IN EVERY ARM, and the
// arm's effects ELSEWHERE never fire a listener.**
// ===================================================================================================

// SCENARIO C1 — `W-3`: an unoccupied key and a LITERAL value mint a leaf at the write's tier.
// Clauses: `§3.4` arm `W-3`; `§6.5` item 10 (d) (iii); `§5.8` (a).
// Drive: `listen(["a"])`; `listen(["a","b"])` (a listener bound at an address that holds NO NODE YET —
//   `§7.1` step 5 populates the home before the registry exists); `write(["a"], mem, 1)`.
// Expected `triggered`: EXACTLY `{ h_a }` — the arm's own address fires; the DESCENDANT-bound listener
//   does NOT, because the trigger address is the write's address `X = ["a"]` and `["a","b"]` is not a
//   prefix of it.
// Observable: the set, and the arm's own effect — `read(["a"]) == 1`.
#[test]
fn lf_c1_w_3_a_fresh_literal_fires_the_listener_bound_there() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c) at the edited address");
    let _descendant = listen_at(
        &mut store,
        key(&["a", "b"]),
        "§6.5 item 12 (c): a binding is BY ADDRESS and needs no node (`§7.1` step 5 precedes the registry)",
    );
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_num(1.0),
        "§3.4 W-3: the parent is the register, the container holds NO anchor at `a`, the value is a literal",
    );
    assert_triggered(
        "C1 (W-3)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): `triggered` is EXACTLY the set of handles bound at a PREFIX of the WRITE'S address — so \
         the descendant-bound listener is not triggered by an edit at its ancestor",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§3.4 W-3: the arm's own effect — a leaf is minted and its value reads back (`§5.2` P-IM-1)"
    );
}

// SCENARIO C2 — `W-4`: an unoccupied key and a STRUCTURE — the branch-tree is minted RECURSIVELY, and the
// listener bound at the edited address fires ONCE.
// Clauses: `§3.4` arm `W-4` (*"turning any key/index that is a literal into a leaf node and turning
//   objects/arrays into branches until all keys have been mapped"*); `§5.8` (a).
// Drive: `listen(["a"])`; `listen(["a","b"])`; `write(["a"], mem, {b: 2})`.
// Expected `triggered`: EXACTLY `{ h_a }` — ONE member, although the arm resolves `["a","b"]` in the
//   course of the install: the trigger address is the WRITE's address.
// Observable: the set, and `read(["a","b"]) == 2` (the recursion landed).
#[test]
fn lf_c2_w_4_a_fresh_structure_fires_the_listener_bound_there_once() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let _deep = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c) at the minted descendant");
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_obj(&[("b", v_num(2.0))]),
        "§3.4 W-4: an unoccupied key and a structure, the register's container empty at that slot",
    );
    assert_triggered(
        "C2 (W-4)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the recursion mints `[\"a\",\"b\"]`, but the TRIGGER ADDRESS is the write's own — so the \
         descendant-bound listener is silent and the edited address fires EXACTLY ONCE",
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(2.0),
        "§3.4 W-4: *\"until all keys have been mapped\"* — the minted branch-tree resolves at the \
         descendant address"
    );
}

// SCENARIO C3 — `W-1`: the parent's container holds an anchor at the key AT THE WRITE'S OWN TIER and none
// at a less persistent tier — PURGE THE PAIR, THEN MINT. The listener bound there fires once, and the
// version count does NOT grow.
// Clauses: `§3.4` arm `W-1`; `§5.4`'s purge chain; `DD-8`/`DD-11`; `§5.8` (a).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)` (a leaf at mem); `write(["a"], mem, 2)`.
// Expected `triggered`: EXACTLY `{ h }` at the SECOND edit; and ONE version at `["a"]`.
// Observable: the set, `read(["a"]) == 2`, and `versions_at(["a"]) == [mem]`.
#[test]
fn lf_c3_w_1_the_same_tier_edit_fires_the_listener_and_the_count_does_not_grow() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_num(2.0),
        "§3.4 W-1: the pair at the write's own tier is purged and re-minted",
    );
    assert_triggered(
        "C3 (W-1)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a) + §6.5 item 9 (a) (A46: *\"The borrow is removed on node change actions because they \
         destroy and replace nodes\"*): the destroying edit fires the listener EXACTLY ONCE — no handle \
         lost, none duplicated",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(2.0),
        "§3.4 W-1: the new node stands in the old pair's place"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§3.4 W-1 + DD-8/DD-11: *\"The version count at that key does not grow\"* — `P-SM-4`'s pair count"
    );
}

// SCENARIO C4 — `W-2`: the TARGET is a `leaf` and the value is a STRUCTURE — RE-MINT, *"WHATEVER TIER THE
// LEAF'S ANCHOR CARRIES"*. The listener bound at the re-minted address fires once.
// Clauses: `§3.4` arm `W-2`; `§6.5` item 9 (a) (`A46`); `§5.8` (a).
// Drive: `listen(["a"])`; `listen(["a","b"])`; `write(["a"], mem, 1)` (the leaf); `write(["a"], mem, {b:2})`.
// Expected `triggered`: EXACTLY `{ h_a }` at the re-mint; the listener bound at the destroyed leaf's
//   descendant address does NOT fire.
// Observable: the set, `read(["a","b"]) == 2`, and one version at `["a"]`.
#[test]
fn lf_c4_w_2_a_structure_over_a_leaf_re_mints_and_fires_once() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let _descendant = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_num(1.0),
        "§3.4 W-3: the leaf at `a` — one anchor, one value, no container",
    );
    let r = write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_obj(&[("b", v_num(2.0))]),
        "§3.4 W-2: the target is a leaf and the value is an object",
    );
    assert_triggered(
        "C4 (W-2)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a) + §6.5 item 9 (a): the re-mint DESTROYS the leaf's pointing anchor and places a new one \
         on the SAME link — the address's listener fires, and the destroyed node's descendant binding is \
         not on the trigger address",
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b"])),
        v_num(2.0),
        "§3.4 W-2: the new branch-tree is minted below the re-minted anchor"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§3.4 W-2: *\"the count does NOT grow\"* — the destroyed pair's removal offsets the new pair"
    );
}

// SCENARIO C5 — `W-5`: the container holds an anchor at a MORE persistent tier, none at the write's tier,
// and the write is not a re-mint — SHADOW: the new version is ADDED ALONGSIDE, the survivor keeps its
// anchor and its pair, and the pair set GROWS BY ONE.
// Clauses: `§3.4` arm `W-5`; `§5.4` (`P-SM-4` (b)'s pair count); `§5.8` (a).
// Drive: `listen(["s"])`; `write(["s"], file, "durable")` (a leaf at `file`); `write(["s"], temp, "shadow")`.
// Expected `triggered`: EXACTLY `{ h }`; and TWO versions at `["s"]`, the `file` one SURVIVING.
// Observable: the set, `read(["s"])` (the shadow wins the unqualified read, `A11`) and `versions_at`.
#[test]
fn lf_c5_w_5_a_shadow_at_a_lower_tier_fires_the_listener() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["s"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["s"]),
        w_file(),
        v_str("durable"),
        "§3.4 W-3 at the file tier: the register's tier is file, so the mint is permitted (§1.2's monotonic \
         clause; A49/A50)",
    );
    let r = write_at(
        &mut store,
        key(&["s"]),
        w_temp(),
        v_str("shadow"),
        "§3.4 W-5: the container holds an anchor at a MORE persistent tier, none at temp, and the target is \
         a leaf whose write is a LITERAL — so this is the shadow arm and not W-2",
    );
    assert_triggered(
        "C5 (W-5)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the shadowed node's address is still the write's address, so its listener fires",
    );
    assert_eq!(
        read_at(&store, &key(&["s"])),
        v_str("shadow"),
        "§3.4 W-5 + A11: *\"the shadow wins the unqualified read\"*"
    );
    assert_eq!(
        versions_at(&store, &key(&["s"])),
        vec![Tier::File, Tier::Temp],
        "§3.4 W-5: *\"The survivor keeps its ANCHOR AND ITS PAIR, and the pair set at that key GROWS BY \
         ONE\"* — `§5.1`'s canonical order"
    );
}

// SCENARIO C6 — `W-6`: the container holds an anchor at a LESS persistent tier — PURGE THE LOWER
// VERSIONS, THEN MINT. The listener at that address fires once.
// Clauses: `§3.4` arm `W-6` (`P: §12 · A19`: *"Purge is the write deleting any versions of the addressed
//   node with the same or less persistence"*); `§5.4`'s purge chain; `§5.8` (a).
// Drive: `listen(["g"])`; `write(["g"], temp, 1)`; `write(["g"], mem, 2)`.
// Expected `triggered`: EXACTLY `{ h }` at the second edit; ONE version at `["g"]` afterwards.
// Observable: the set, `read(["g"]) == 2`, `versions_at(["g"]) == [mem]`.
#[test]
fn lf_c6_w_6_a_lower_version_is_purged_and_the_listener_fires_once() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["g"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["g"]), w_temp(), v_num(1.0), "§3.4 W-3 at temp");
    let r = write_at(
        &mut store,
        key(&["g"]),
        w_mem(),
        v_num(2.0),
        "§3.4 W-6: the container holds an anchor at `temp`, LESS persistent than the write's `mem`",
    );
    assert_triggered(
        "C6 (W-6)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a) + §6.5 item 9 (a): the purge destroys the lower version WITH the node that carried any \
         borrow, and the destroying edit fires the listener EXACTLY ONCE",
    );
    assert_eq!(read_at(&store, &key(&["g"])), v_num(2.0), "§3.4 W-6");
    assert_eq!(
        versions_at(&store, &key(&["g"])),
        vec![Tier::Mem],
        "§3.4 W-6: every version at `rank ≤ rank(write tier)` is removed and one is minted"
    );
}

// SCENARIO C7 — **THE TIER-PROMOTION FLOW**: `temp` → `mem` → `file` at the SAME address, each step
// firing the listener bound there, and each step's `watched` carrying that one address.
// Clauses: `§3.4` arms `W-3` then `W-6` twice; `§5.1`'s rank; `§6.5` item 10 (f) (`DD-36`: NO TIER TEST
//   runs at any trigger — the listener's `address` is the WHOLE of its key).
// Drive: `listen(["p"])` on a path-provided store (the register is at `file`, `A49`/`A50`); then
//   `write(["p"], temp, 1)`, `write(["p"], mem, 2)`, `write(["p"], file, 3)`.
// Expected `triggered`: EXACTLY `{ h }` at EVERY step — the same handle, three times.
// Observable: the three sets, the three `watched` sets, and `versions_at` after each step.
#[test]
fn lf_c7_the_tier_promotion_flow_fires_at_every_step() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["p"]), "§6.5 item 12 (c)");
    let t1 = write_at(&mut store, key(&["p"]), w_temp(), v_num(1.0), "§3.4 W-3: the fresh `temp` version");
    assert_triggered(
        "C7 step 1 (temp)",
        &t1.triggered,
        &one_handle(&h),
        "DD-36: nothing carries over from the superseded tier qualifier — the trigger is selected by the \
         PREFIX test alone, so a `temp`-tier write fires the same handle a `file`-tier write does",
    );
    assert_watched("C7 step 1 (temp)", &t1.watched, &[key(&["p"])], "§5.8 (e)");
    assert_eq!(versions_at(&store, &key(&["p"])), vec![Tier::Temp], "§3.4 W-3");

    let t2 = write_at(&mut store, key(&["p"]), w_mem(), v_num(2.0), "§3.4 W-6: purge the lower `temp`");
    assert_triggered("C7 step 2 (mem)", &t2.triggered, &one_handle(&h), "§5.8 (a)");
    assert_watched("C7 step 2 (mem)", &t2.watched, &[key(&["p"])], "§5.8 (e)");
    assert_eq!(versions_at(&store, &key(&["p"])), vec![Tier::Mem], "§3.4 W-6");

    let t3 = write_at(&mut store, key(&["p"]), w_file(), v_num(3.0), "§3.4 W-6: purge the lower `mem`");
    assert_triggered("C7 step 3 (file)", &t3.triggered, &one_handle(&h), "§5.8 (a)");
    assert_watched("C7 step 3 (file)", &t3.watched, &[key(&["p"])], "§5.8 (e)");
    assert_eq!(versions_at(&store, &key(&["p"])), vec![Tier::File], "§3.4 W-6");
    assert_eq!(
        read_at(&store, &key(&["p"])),
        v_num(3.0),
        "§5.2 P-IM-1: the promoted version reads back at its own tier"
    );
}

// SCENARIO C8 — **THE PURGE A HIGHER-TIER WRITE DRIVES**, with TWO lower versions standing at the
// address: every version at `rank ≤ rank(write tier)` is removed — and the listener fires ONCE, not once
// per destroyed version.
// Clauses: `§3.4` arm `W-6`; `P: §12 · A19`; `§5.4`'s purge chain; `§5.8` (a) + `P-SM-4` (f) (*"no change
//   action LOSES or DUPLICATES a listener's handle"*).
// Drive: `listen(["g2"])`; `write(["g2"], mem, 1)`; `write(["g2"], temp, 2)` (the `W-5` shadow: two
//   versions stand); `write(["g2"], file, 3)`.
// Expected `triggered` at the `file` write: EXACTLY `{ h }` — ONE member although TWO versions are
//   destroyed.
// Observable: the set's cardinality, and `versions_at(["g2"]) == [file]`.
#[test]
fn lf_c8_the_purge_a_higher_tier_write_drives_fires_the_listener_once() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["g2"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["g2"]), w_mem(), v_num(1.0), "§3.4 W-3 at mem");
    write_at(
        &mut store,
        key(&["g2"]),
        w_temp(),
        v_num(2.0),
        "§3.4 W-5: the `temp` shadow is added alongside the surviving `mem` version",
    );
    assert_eq!(
        versions_at(&store, &key(&["g2"])),
        vec![Tier::Mem, Tier::Temp],
        "§3.4 W-5: two versions stand before the purge"
    );
    let r = write_at(
        &mut store,
        key(&["g2"]),
        w_file(),
        v_num(3.0),
        "§3.4 W-6: *\"every version of the addressed node for which `rank(v) ≤ rank(write tier)` is \
         removed\"* — both lower versions go",
    );
    assert_triggered(
        "C8 (the purge)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): ONE listener at that address yields ONE member — the purge removes nodes, never \
         registrations, and a duplicated member would fail P-SM-4's (f)",
    );
    assert_eq!(
        r.triggered.len(),
        1,
        "C8: TWO versions destroyed, ONE fire — a count of two here would be the DUPLICATED handle \
         §5.8's failure list forbids"
    );
    assert_eq!(
        versions_at(&store, &key(&["g2"])),
        vec![Tier::File],
        "§3.4 W-6: the purge is total over `rank ≤ rank(write tier)`"
    );
}

// ===================================================================================================
// D. THE DELETE SIDE — `§4.4`'s arms and its amended firing clause.
// ===================================================================================================

// SCENARIO D1 — `D-1`: the delete names ONE tier the target holds — it removes that version, and the
// listener bound AT the deleted address fires.
// Clauses: `§4.4` arm `D-1` and its dated firing clause (`A43`); `DD-35`; `§6.5` item 11; `§5.8` (b).
// Drive: `listen(["a"])`; `write(["a"], file, 1)`; `delete(["a"], file)`.
// Expected `triggered`: EXACTLY `{ h }`; `tiers == [file]`; `address == ["a"]` VERBATIM.
// Observable: the receipt's three members.
#[test]
fn lf_d1_a_d_1_delete_at_the_listeners_address_fires_it() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["d"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["d"]), w_file(), v_num(1.0), "§3.4 W-3 at file");
    let receipt = delete_at(
        &mut store,
        key(&["d"]),
        t(Tier::File),
        "§4.4 D-1: the target holds a version at the named tier",
    );
    assert_triggered(
        "D1 (D-1)",
        &receipt.triggered,
        &one_handle(&h),
        "§4.4's dated clause: *\"the delete's trigger event reaches exactly the listeners whose address is \
         a PREFIX of the DELETED address — so a listener bound AT the deleted address fires\"*",
    );
    assert_eq!(receipt.tiers, vec![Tier::File], "§4.4 D-1: the one named tier");
    assert_eq!(
        receipt.address,
        key(&["d"]),
        "§4.4: *\"`address` is the caller's array VERBATIM\"*"
    );
}

// SCENARIO D2 — the delete at a STRICT DESCENDANT of the listener's address fires the ANCESTOR-bound
// listener: the selection rule is descendant-inclusive FROM THE LISTENER'S ADDRESS DOWNWARD, for the
// delete exactly as for the write.
// Clauses: `§6.5` item 10 (d) (iii) (`A33`/`A37`; `DD-18`); `§4.4`'s dated firing clause; `§5.8` (b).
// Drive: `listen(["a"])` and `listen(["a","b"])`; `write(["a"], mem, {})`; `write(["a","b"], mem, 1)`;
//   `delete(["a","b"], absent)`.
// Expected `triggered`: EXACTLY `{ h_a, h_ab }` — the ancestor-bound handle AND the own-address handle.
// Observable: the receipt's `triggered` set.
#[test]
fn lf_d2_a_delete_at_a_descendant_fires_the_ancestor_bound_listener() {
    let mut store = new_store();
    let ancestor = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c) at the ancestor");
    let own = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c) at the descendant");
    write_at(&mut store, key(&["a"]), w_mem(), v_obj(&[]), "§3.4 W-4");
    write_at(&mut store, key(&["a", "b"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let receipt = delete_at(
        &mut store,
        key(&["a", "b"]),
        none(),
        "§4.4 D-2: `tier` absent and the target holds a version",
    );
    assert_triggered(
        "D2 (a delete at a descendant)",
        &receipt.triggered,
        &[ancestor.clone(), own.clone()],
        "§6.5 item 10 (d) (iii) + §5.8 (b): the delete's trigger event is the PREFIX test over the DELETED \
         address — the ancestor's address is a prefix of it, so the ancestor-bound listener fires",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::Mem],
        "§4.4 D-2: the one tier whose version was removed"
    );
}

// SCENARIO D3 — **the other direction, asserted from the clause's own words:** a delete at a strict
// ANCESTOR of a listener's address does NOT fire that listener.
// Clauses: `§4.4`'s dated firing clause, VERBATIM: *"a listener bound at a STRICT DESCENDANT of it does
//   NOT (the delete resolves to the named node and removes its subtree; it passes through the named
//   address's ancestors and not through its descendants)"*; `§6.5` item 10 (d) (iii).
// Drive: `listen(["a"])` and `listen(["a","b"])`; `write(["a"], mem, {})`; `write(["a","b"], mem, 1)`;
//   then `delete(["a"], absent)`.
// Expected `triggered`: EXACTLY `{ h_a }` — the ancestor-bound listener fires (the delete resolves TO its
//   address) and the DESCENDANT-bound listener does NOT, even though its node is destroyed by the
//   cascade.
// Observable: the receipt's `triggered` set, and `read(["a"])` failing afterwards.
#[test]
fn lf_d3_a_delete_at_an_ancestor_does_not_fire_the_descendant_bound_listener() {
    let mut store = new_store();
    let ancestor = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let _descendant = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c) at the descendant");
    write_at(&mut store, key(&["a"]), w_mem(), v_obj(&[]), "§3.4 W-4");
    write_at(&mut store, key(&["a", "b"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let receipt = delete_at(
        &mut store,
        key(&["a"]),
        none(),
        "§4.4 D-2 at the ancestor: *\"removes every version and all downstream of each\"*",
    );
    assert_triggered(
        "D3 (a delete at an ancestor, with a descendant-bound listener standing)",
        &receipt.triggered,
        &one_handle(&ancestor),
        "§4.4's dated clause: *\"a listener bound at a STRICT DESCENDANT of it does NOT [fire] — the delete \
         resolves to the named node and removes its subtree; it passes through the named address's \
         ancestors and not through its descendants\"*",
    );
    assert!(
        register(&store) == v_obj(&[]),
        "§4.4 D-2: the cascade removed the whole subtree — the register is empty again"
    );
}

// SCENARIO D4 — `D-3`: the target resolves but holds NO version at the NAMED tier — a SUCCESS that
// removes nothing and fires NOTHING.
// Clauses: `§4.4` arm `D-3` and its dated firing clause (*"A DELETE THAT REMOVES NOTHING (`D-3`, `DD-9`)
//   FIRES NOTHING: it is a SUCCESS carrying `tiers: []` and `triggered: []`"*); `§6.5` item 11.
// Drive: `listen(["a"])`; `write(["a"], mem, 1)`; `delete(["a"], temp)` — the target resolves at `mem` and
//   holds no version at `temp`.
// Expected receipt: `tiers == []` and `triggered == []`.
// Observable: both members of the receipt, and that the `mem` version still stands afterwards.
#[test]
fn lf_d4_a_d_3_no_op_delete_carries_an_empty_triggered() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let receipt = delete_at(
        &mut store,
        key(&["a"]),
        t(Tier::Temp),
        "§4.4 D-3: the target resolves and the NAMED tier holds no version",
    );
    assert!(
        receipt.tiers.is_empty(),
        "§4.4 D-3 + DD-9: a delete that removes nothing is a SUCCESS with `tiers: []`"
    );
    assert_triggered(
        "D4 (D-3)",
        &receipt.triggered,
        &[],
        "§4.4's dated clause: *\"no version was removed, so no node was destroyed and no trigger \
         occurred\"* — the `D-3` arm DOES NOT fire",
    );
    assert!(
        !receipt.triggered.contains(&h),
        "D4: the handle bound at [\"a\"] is absent from a no-op delete's receipt"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§4.4 D-3: the version the delete did not name is UNTOUCHED (`A12`)"
    );
}

// SCENARIO D5 — `D-2`: `tier` absent and the target holds versions at MORE THAN ONE tier — every version
// and all downstream of each is removed, in `§5.1`'s canonical order, and the listener fires ONCE.
// Clauses: `§4.4` arm `D-2` and its dated firing clause; `§5.1` (the canonical order); `§5.8` (b).
// Drive: `listen(["d"])`; `write(["d"], mem, 1)`; `write(["d"], temp, 2)` (the shadow — two versions
//   stand); `delete(["d"], absent)`.
// Expected: `tiers == [mem, temp]` in the canonical order, `triggered == { h }` — ONE fire for the two
//   removed versions.
// Observable: the receipt's two members and the emptied address afterwards.
#[test]
fn lf_d5_a_d_2_delete_removes_every_version_and_fires_the_listener_once() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["d"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["d"]), w_mem(), v_num(1.0), "§3.4 W-3 at mem");
    write_at(&mut store, key(&["d"]), w_temp(), v_num(2.0), "§3.4 W-5: the temp shadow");
    assert_eq!(
        versions_at(&store, &key(&["d"])),
        vec![Tier::Mem, Tier::Temp],
        "§3.4 W-5: two versions stand"
    );
    let receipt = delete_at(
        &mut store,
        key(&["d"]),
        none(),
        "§4.4 D-2: `tier` absent and the target holds versions at two tiers",
    );
    assert_eq!(
        receipt.tiers,
        vec![Tier::Mem, Tier::Temp],
        "§4.4 D-2: *\"every tier removed, in the canonical order of §5.1 (file, mem, temp)\"*"
    );
    assert_triggered(
        "D5 (D-2)",
        &receipt.triggered,
        &one_handle(&h),
        "§5.8 (b): *\"After any successful `delete` THAT REMOVED AT LEAST ONE VERSION …`triggered` is \
         EXACTLY the set of `handle`s whose listener binds at a PREFIX of the deleted address\"* — ONE \
         member for ONE listener, however many versions were removed",
    );
    assert!(
        store.findAddress(AddressArg::List(key(&["d"])), none()).is_err(),
        "§4.4 D-2: every version and all downstream is removed, so the address no longer resolves"
    );
}

// SCENARIO D6 — `D-4`: the address resolves to NOTHING — the delete fails with the WALK'S OWN CODE and
// returns NO receipt at all, so nothing fires.
// Clauses: `§4.4` arm `D-4` (*"removes nothing; the delete **fails with the walk's own code**"*) and its
//   dated clause (*"the `D-4` ARM THROWS the walk's own code and returns no receipt at all"*);
//   `§2.2`'s walk codes `L-3` (`AddressNotFound`) and `L-4` (`LeafHasNoDownstream`); `§8.1` #2/#3.
// Drive: `listen(["a"])`; `write(["a"], mem, 1)` (a LEAF at `a`); then (i) `delete(["z"], absent)` — no
//   anchor at the key; and (ii) `delete(["a","b"], absent)` — the walk stands on a leaf with a segment
//   remaining.
// Expected: `AddressNotFound` then `LeafHasNoDownstream` for the two drives; NO receipt exists; the
//   registration SURVIVES and still fires at its own address.
// Observable: the two codes, the store's state, and the following edit's set.
#[test]
fn lf_d6_a_d_4_delete_throws_the_walks_code_and_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3: the leaf at `a`");
    let before = register(&store);

    let e1 = failure(
        store.delete(AddressArg::List(key(&["z"])), none()),
        "§4.4 D-4: the address resolves to nothing",
    );
    assert_code(
        &e1,
        "AddressNotFound",
        "§4.4 D-4 + §2.2 `L-3`: *\"the container holds no anchor at that key\"* — the walk's own code",
    );
    let e2 = failure(
        store.delete(AddressArg::List(key(&["a", "b"])), none()),
        "§4.4 D-4: the walk stands on a `leaf` with a segment remaining",
    );
    assert_code(
        &e2,
        "LeafHasNoDownstream",
        "§4.4 D-4 + §2.2 `L-4`: the walk's own code for a leaf with remaining segments",
    );
    assert_zero_residue(&store, &before, "D6", "§4.4 D-4: *\"removes nothing\"*");
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "D6 (the registration after the two refused deletes)",
        &r.triggered,
        &one_handle(&h),
        "§4.4's dated clause: *\"a FAILED delete returns no receipt at all (`D-4` throws)\"* — so no list \
         exists to carry a fire, and the registration is untouched",
    );
}

// ===================================================================================================
// E. THE NEGATIVES — a read never fires; every reachable fail arm; `unlisten`; the rollback.
// **A FAILED WRITE RETURNS NOTHING** (§6.5 item 11: *"a FAILED write and a FAILED delete return NOTHING"*),
// so each fail-arm drive asserts the DECLARED code (§8.1), ZERO RESIDUE (§3.5) and that the registration
// SURVIVES the refusal — there is no receipt and therefore no list to carry.
// ===================================================================================================

// SCENARIO E1 — a READ at the listener's address fires NOTHING, and its answer carries no handle.
// Clauses: `§6.5` item 10 (c) (`A43`: *"listeners don't fire on read, they fire on write/delete"*;
//   *"No read, no `findAddress`, no `rollback`, no boot and no read-driven traversal fires a listener"*);
//   `§4.1`'s leaf row; `§0.4`'s `StoreValue` spelling (five carriers, none of them a handle).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)`; `read(["a"])` TWICE; then `write(["a"], mem, 2)`.
// Expected: the read answers `1` and carries no handle member; the NEXT edit's `triggered` is EXACTLY
//   `{ h }` — one member, so the two reads neither consumed nor added a registration.
// Observable: the read's answer (matched over its whole declared variant set) and the following edit's set.
#[test]
fn lf_e1_a_read_at_the_listeners_address_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let v = read_at(&store, &key(&["a"]));
    match &v {
        StoreValue::Str(_)
        | StoreValue::Bool(_)
        | StoreValue::Num(_)
        | StoreValue::Object(_)
        | StoreValue::Array(_) => {}
        other => panic!(
            "E1: §0.4's `StoreValue` carries §1.4's four admitted classes and nothing else — a read's \
             answer can hold no handle, no listener record and no address list; got {other:?}"
        ),
    }
    assert_eq!(v, v_num(1.0), "§4.1's leaf row");
    let _again = read_at(&store, &key(&["a"]));
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "E1 (the edit after two reads)",
        &r.triggered,
        &one_handle(&h),
        "§6.5 item 10 (c): a read is NOT a trigger event — the registration is neither consumed nor \
         duplicated by it, and the store RETURNS handles on the two tracked verbs alone",
    );
}

// SCENARIO E2 — `findAddress`, `readLiteral` and a read at the EMPTY address fire nothing, and the whole
// register's read does not surface the home.
// Clauses: `§6.5` item 10 (c); `§6.5` item 8 (b) (*"It is NOT addressable: no segment path reaches it,
//   `findAddress` never returns it, and a read at the empty address DOES NOT INCLUDE IT"*); `A43`/`A48`;
//   `§5.8` (v).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)`; `findAddress(["a"], mem)`; `readLiteral(["a"])`;
//   `read([])`; then `write(["a"], mem, 2)`.
// Expected: the register's read is EXACTLY `{ "a": 1 }` — no listener entry, no handle, no address list —
//   and the following edit's set is EXACTLY `{ h }`.
// Observable: the register object and the following edit's set.
#[test]
fn lf_e2_find_address_read_literal_and_the_register_read_fire_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    {
        let r: &NodeRef = ok(
            store.findAddress(AddressArg::List(key(&["a"])), t(Tier::Mem)),
            "§2.1: the resolver returns a reference",
        );
        assert_eq!(
            r.anchor.tier,
            Tier::Mem,
            "§5.4 (a)'s own observable: `findAddress(address, t).anchor.tier == t` — the reference carries \
             the anchor and NOTHING of the home"
        );
    }
    let literal = ok(
        store.readLiteral(AddressArg::List(key(&["a"])), none()),
        "§4.1's literal-only form on a leaf",
    );
    assert_eq!(literal, v_num(1.0), "§4.1's literal-only row");
    assert_eq!(
        register(&store),
        v_obj(&[("a", v_num(1.0))]),
        "§6.5 item 8 (b) + A48: the home is a PEER STRUCTURE OUTSIDE THE GRAPH — a read at the empty \
         address returns the whole register and does NOT include it (`§5.8` (v))"
    );
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "E2 (the edit after `findAddress`, `readLiteral` and the register read)",
        &r.triggered,
        &one_handle(&h),
        "§6.5 item 10 (c): neither `findAddress` nor `readLiteral` nor a whole-register read is a trigger \
         event",
    );
}

// SCENARIO E3 — `F-3`: the target's PARENT resolution fails — nothing is installed, the walk's own code
// is the failure, and no trigger occurs.
// Clauses: `§3.4` arm `F-3` (*"nothing is installed, including below the failing segment"*, `DD-5`);
//   `§2.2` `L-3`; `§3.5`; `§8.1` #2; `§6.5` item 11.
// Drive: `listen(["x"])`; `write(["x"], mem, {})`; then `write(["x","y","z"], mem, 1)` — the parent
//   `["x","y"]` holds no anchor.
// Expected: `AddressNotFound`; the register byte-identical to its pre-attempt state; and the registration
//   SURVIVING — the next edit at `["x"]` returns EXACTLY `{ h }`.
// Observable: the code, the register, and the following edit's set.
#[test]
fn lf_e3_f_3_an_unreachable_parent_fires_nothing_and_installs_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["x"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["x"]),
        w_mem(),
        v_obj(&[]),
        "§3.4 W-4: the branch at `x`, so the failing write's address lies BELOW a bound listener's address",
    );
    let before = register(&store);
    let e = failure(
        store.write(
            AddressArg::List(key(&["x", "y", "z"])),
            w_mem(),
            v_num(1.0),
        ),
        "§3.4 F-3: the target's parent `[\"x\",\"y\"]` does not resolve",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§3.4 F-3: *\"the walk's own code\"* — `§2.2` `L-3`: the container holds no anchor at that key",
    );
    assert_zero_residue(&store, &before, "E3", "§3.5");
    let r = write_at(&mut store, key(&["x"]), w_mem(), v_num(9.0), "§3.4 W-1");
    assert_triggered(
        "E3 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§6.5 item 11: a failed write returns NOTHING, so no receipt carries a list — and the home is not \
         touched by the refusal",
    );
}

// SCENARIO E4 — `F-1`: `tier` is ABSENT — the write's REQUIRED-SINGULAR tier is missing.
// Clauses: `§3.4` arm `F-1`; `§3.1` (*"EXACTLY ONE of the three tokens"*); `§3.1.1`'s write row's
//   `tier` absent cell; `§8.1` #1 (an absent required argument); `§3.5`.
// Drive: `listen(["a"])`; `write(["a"], ABSENT, 1)`.
// Expected: `AddressMalformed`; nothing installed; the registration surviving — the next edit at `["a"]`
//   returns EXACTLY `{ h }`.
// Observable: the code, the register, and the following edit's set.
#[test]
fn lf_e4_f_1_an_absent_write_tier_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let before = register(&store);
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), none(), v_num(1.0)),
        "§3.4 F-1: `TierArg::Absent` — the write's tier is REQUIRED",
    );
    assert_code(
        &e,
        "AddressMalformed",
        "§3.1.1's write row: `tier` absent → *\"a required argument is missing\"* → `AddressMalformed`",
    );
    assert_zero_residue(&store, &before, "E4", "§3.5");
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "E4 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusal neither fired nor dropped the listener",
    );
}

// SCENARIO E5 — a tier argument OUTSIDE the domain, and the ARRAY spelling of the write's tier: both are
// `OutOfDomainTier`, and neither fires.
// Clauses: `§3.1` (*"THE ARRAY FORM IS AVAILABLE ON READ AND NOT ON WRITE"*); `§3.1.1`'s write row's
//   *"a token outside the domain"* and *"an array of `1` token"* cells; `§8.1` #5; `§3.5`.
// Drive: `listen(["a"])`; `write(["a"], "secure", 1)`; `write(["a"], [mem], 1)`.
// Expected: `OutOfDomainTier` for both; nothing installed; the registration surviving.
// Observable: the two codes, the register, and the following edit's set.
#[test]
fn lf_e5_an_out_of_domain_write_tier_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let before = register(&store);
    let e1 = failure(
        store.write(
            AddressArg::List(key(&["a"])),
            outside_token("secure"),
            v_num(1.0),
        ),
        "§3.1.1's write row: a token outside `{file, mem, temp}`",
    );
    assert_code(
        &e1,
        "OutOfDomainTier",
        "§8.1` #5 + `P: §14 · A29`: *\"Fail on out-of-domain\"* — `secure` is not an inbuilt tier",
    );
    let e2 = failure(
        store.write(
            AddressArg::List(key(&["a"])),
            set(&[Tier::Mem]),
            v_num(1.0),
        ),
        "§3.1.1's write row: `tier` an array of `1` token",
    );
    assert_code(
        &e2,
        "OutOfDomainTier",
        "§3.1: *\"a write whose tier argument is an array fails, even an array of length `1`\"* — the \
         array spelling is not the write's arity",
    );
    assert_zero_residue(&store, &before, "E5", "§3.5");
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "E5 (the registration after the refusals)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusals neither fired nor dropped the listener",
    );
}

// SCENARIO E6 — a `VEC` index ABOVE the container's contiguous range: `F-4`'s key-domain arm, one member
// shared with the value-class direction, and NOTHING installed (no gap is mintable).
// Clauses: `DD-43` (*"a write whose LAST segment is an INDEX … is OUT OF DOMAIN iff `i > n`, which fails
//   `ContainerKindConflict` and INSTALLS NOTHING"*); `§3.4` `F-4`; `store-model.md §1.3`'s `VEC` key
//   domain; `§8.1` #7; `§3.5`.
// Drive: `listen(["v"])`; `write(["v"], mem, [1, 2])` (a two-element `VEC`); then
//   `write(["v", index(5)], mem, 9)`.
// Expected: `ContainerKindConflict`; the `VEC` unchanged at two elements; the registration surviving.
// Observable: the code, `read(["v"])`, and the following edit's set.
#[test]
fn lf_e6_a_vec_index_above_the_contiguous_range_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["v"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["v"]),
        w_mem(),
        v_arr(vec![v_num(1.0), v_num(2.0)]),
        "§3.4 W-4: a two-element `VEC` at `v` (`n = 2`)",
    );
    let before = register(&store);
    let mut out_of_range = key(&["v"]);
    out_of_range.push(idx(5));
    let e = failure(
        store.write(AddressArg::List(out_of_range), w_mem(), v_num(9.0)),
        "DD-43: the index `5 > n = 2`",
    );
    assert_code(
        &e,
        "ContainerKindConflict",
        "DD-43: *\"A write whose last segment is an index `i > n` fails `ContainerKindConflict` and INSTALLS \
         NOTHING … because an index outside the container's declared index domain contradicts that \
         container's KEY DOMAIN\"*",
    );
    assert_zero_residue(&store, &before, "E6", "§3.5");
    assert_eq!(
        read_at(&store, &key(&["v"])),
        v_arr(vec![v_num(1.0), v_num(2.0)]),
        "DD-43 + §4.2 `R-3`: *\"NO GAP IS MINTABLE\"* — the container is dense from `0` and unchanged"
    );
    let r = write_at(&mut store, key(&["v"]), w_mem(), v_num(3.0), "§3.4 W-1");
    assert_triggered(
        "E6 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusal neither fired nor dropped the listener",
    );
}

// SCENARIO E7 — `F-2`: a value OUTSIDE `§1.4`'s admitted set — `ValueNotAdmitted`, nothing installed, no
// fire.
// Clauses: `§3.4` arm `F-2`; `store-model.md §1.4`'s outside classes; `§8.1` #14; `§3.5`.
// Drive: `listen(["a"])`; `write(["a"], mem, null)`.
// Expected: `ValueNotAdmitted`; the key absent afterwards; the registration surviving.
// Observable: the code, the register, and the following edit's set.
#[test]
fn lf_e7_a_value_outside_the_taxonomy_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let before = register(&store);
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_null()),
        "§3.4 F-2: `null` is outside `§1.4`'s admitted set",
    );
    assert_code(
        &e,
        "ValueNotAdmitted",
        "§8.1` #14 + `§1.4`'s outside classes: *\"a write whose `value` is outside `§1.4`'s admitted set\"*",
    );
    assert_zero_residue(&store, &before, "E7", "§3.5");
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "E7 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusal neither fired nor dropped the listener",
    );
}

// SCENARIO E8 — `F-4`'s KEY-CLASS arm in BOTH directions: a `string` segment aimed at a `VEC`, and an
// integer segment aimed at a `MAP` — ONE member, and nothing installed.
// Clauses: `§3.4` `F-4` (*"OR the write's LAST segment's CLASS contradicts the parent container's KEY
//   DOMAIN (a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP`)"*);
//   `store-model.md §1.5` items 2–3 (NO COERCION); `§8.1` #7.
// Drive: `listen(["v"])`; `listen(["m"])`; `write(["v"], mem, [1])`; `write(["m"], mem, {})`; then
//   `write(["v","k"], mem, 1)` and `write(["m", index(0)], mem, 1)`.
// Expected: `ContainerKindConflict` for both; both containers unchanged; both registrations surviving.
// Observable: the two codes, the register, and the following edits' sets.
#[test]
fn lf_e8_a_key_class_that_contradicts_the_container_fires_nothing() {
    let mut store = new_store();
    let h_v = listen_at(&mut store, key(&["v"]), "§6.5 item 12 (c)");
    let h_m = listen_at(&mut store, key(&["m"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["v"]), w_mem(), v_arr(vec![v_num(1.0)]), "§3.4 W-4: a `VEC`");
    write_at(&mut store, key(&["m"]), w_mem(), v_obj(&[]), "§3.4 W-4: a `MAP`");
    let before = register(&store);

    let e1 = failure(
        store.write(
            AddressArg::List(key(&["v", "k"])),
            w_mem(),
            v_num(1.0),
        ),
        "§3.4 F-4: a string segment aimed at a `VEC`",
    );
    assert_code(
        &e1,
        "ContainerKindConflict",
        "§8.1` #7 + `store-model.md §1.5` item 2 (NO COERCION): *\"a string segment aimed at a `VEC`\"* — a \
         class-level contradiction of the container's key domain",
    );

    let mut into_map = key(&["m"]);
    into_map.push(idx(0));
    let e2 = failure(
        store.write(AddressArg::List(into_map), w_mem(), v_num(1.0)),
        "§3.4 F-4: an integer segment aimed at a `MAP`",
    );
    assert_code(
        &e2,
        "ContainerKindConflict",
        "§8.1` #7: *\"an integer segment aimed at a `MAP`\"* — both directions share the ONE member \
         (`DD-19`'s precedent)",
    );

    assert_zero_residue(&store, &before, "E8", "§3.5");
    let r = write_at(&mut store, key(&["v"]), w_mem(), v_num(3.0), "§3.4 W-1");
    assert_triggered(
        "E8 (the registrations after the refusals)",
        &r.triggered,
        &one_handle(&h_v),
        "§5.8 (a): the edit at `[\"v\"]` fires the listener bound there and NO other",
    );
    let r2 = write_at(&mut store, key(&["m"]), w_mem(), v_num(4.0), "§3.4 W-1");
    assert_triggered(
        "E8 (the second registration)",
        &r2.triggered,
        &one_handle(&h_m),
        "§5.8 (a): the refusals neither fired nor dropped either registration",
    );
}

// SCENARIO E9 — `F-5`: the resolved PARENT is a `leaf` — no child anchor can be installed there.
// Clauses: `§3.4` arm `F-5` (*"a leaf holds a value and not a link"*); `§8.1` #9; `§3.5`.
// Drive: `listen(["p"])`; `write(["p"], mem, 1)` (the leaf); then `write(["p","q"], mem, 2)`.
// Expected: `WriteParentNotLink`; nothing installed; the registration surviving.
// Observable: the code, the register, and the following edit's set.
#[test]
fn lf_e9_f_5_a_leaf_parent_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["p"]), "§6.5 item 12 (c)");
    write_at(&mut store, key(&["p"]), w_mem(), v_num(1.0), "§3.4 W-3: the leaf at `p`");
    let before = register(&store);
    let e = failure(
        store.write(AddressArg::List(key(&["p", "q"])), w_mem(), v_num(2.0)),
        "§3.4 F-5: the parent resolved by `§3.2` is a leaf",
    );
    assert_code(
        &e,
        "WriteParentNotLink",
        "§8.1` #9: *\"the resolved parent cannot hold children — the `leaf`-parent state (`F-5`)\"*",
    );
    assert_zero_residue(&store, &before, "E9", "§3.5");
    let r = write_at(&mut store, key(&["p"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "E9 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusal neither fired nor dropped the listener",
    );
}

// SCENARIO E10 — `F-6`: the write's tier would make the minted child anchor OUTRANK the parent anchor's
// tier (`§1.2`'s monotonic clause over the two anchors `§3.2` item 2 resolved).
// Clauses: `§3.4` arm `F-6`; `§1.2`; `§8.1` #6; `§3.5`.
// Drive: `listen(["n"])`; `write(["n"], temp, {})` (the branch at `temp`); then
//   `write(["n","m"], mem, 1)` — `rank(mem) = 1 > rank(temp) = 0`.
// Expected: `ParentAnchorMonotonicityViolation`; nothing installed; the registration surviving.
// Observable: the code, the register, and the following edit's set.
#[test]
fn lf_e10_f_6_a_monotonicity_violation_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["n"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["n"]),
        w_temp(),
        v_obj(&[]),
        "§3.4 W-4: the branch at `n`, whose anchor carries `temp`",
    );
    assert_eq!(
        landing_tier(&store, &key(&["n"])),
        Tier::Temp,
        "§2.3's zero-tier arm: the parent search is TIER-AGNOSTIC (`§3.2` item 2) and reaches this anchor"
    );
    let before = register(&store);
    let e = failure(
        store.write(AddressArg::List(key(&["n", "m"])), w_mem(), v_num(1.0)),
        "§3.4 F-6: `rank(mem) = 1 > rank(temp) = 0`",
    );
    assert_code(
        &e,
        "ParentAnchorMonotonicityViolation",
        "§8.1` #6 + `§1.2`: *\"a write whose minted child anchor's tier would outrank its parent anchor's\"*",
    );
    assert_zero_residue(&store, &before, "E10", "§3.5");
    let r = write_at(&mut store, key(&["n"]), w_temp(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "E10 (the registration after the refusal)",
        &r.triggered,
        &one_handle(&h),
        "§5.8 (a): the refusal neither fired nor dropped the listener",
    );
}

// SCENARIO E11 — an `unlisten`ed listener no longer fires, and its address leaves the returned sets.
// Clauses: `§6.5` item 12 (*"`unlisten(handle)` … drops ONE home-map entry"*); `§5.8` (a)/(e).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)` → fires; `unlisten(h)`; `write(["a"], mem, 2)`.
// Expected: the first edit's set is `{ h }`; the second's is EMPTY, and its `watched` is EMPTY.
// Observable: the two sets.
#[test]
fn lf_e11_an_unlistened_listener_no_longer_fires() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let first = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered("E11 (before the withdrawal)", &first.triggered, &one_handle(&h), "§5.8 (a)");
    ok(
        store.unlisten(&h),
        "§6.5 item 12: `unlisten` drops one home-map entry and answers `Ok`",
    );
    let second = write_at(&mut store, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "E11 (after the withdrawal)",
        &second.triggered,
        &[],
        "§5.8 (a): the withdrawn registration is gone from the ONE home, so no handle is returned",
    );
    assert_watched(
        "E11 (after the withdrawal)",
        &second.watched,
        &[],
        "§5.8 (e)/(f) (3a): the address projection of an empty handle set is empty",
    );
}

// SCENARIO E12 — a FABRICATED handle's and a FOREIGN instance's handle's `unlisten` are NO-OP SUCCESSES:
// no code is produced and NO other registration is removed.
// Clauses: `contract.md §0.4` clause 3 (every outside value answered; *"a value the store never minted at
//   all (fabricated)"*); `§6.5` item 12 (*"a handle a foreign instance minted … is OUTSIDE its domain and
//   `unlisten` over it is a no-op success"*); `PAR-13`.
// Drive: `listen(["a"])` → `real`; `unlisten(fabricated)`; `unlisten(foreign_handle)` where the handle was
//   minted by a SECOND instance; then `write(["a"], mem, 1)`.
// Expected: both withdrawals answer `Ok`; `triggered` is EXACTLY `{ real }`.
// Observable: the two `Result`s and the following edit's set.
#[test]
fn lf_e12_a_fabricated_and_a_foreign_handle_unlisten_remove_nothing() {
    let mut store = new_store();
    let real = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let fabricated = handle("no-such-token-this-store-ever-minted");
    ok(
        store.unlisten(&fabricated),
        "§0.4 clause 3: a fabricated handle is SPELLABLE (clause 1) and its withdrawal is a NO-OP SUCCESS \
         — *\"producing NO code and removing NO other registration\"*",
    );
    let mut foreign = new_store();
    let foreign_handle = listen_at(&mut foreign, key(&["a"]), "§6.5 item 12 (c) in ANOTHER instance");
    ok(
        store.unlisten(&foreign_handle),
        "§6.5 item 12 (a): a handle a FOREIGN instance minted is outside this instance's domain and \
         `unlisten` over it is a no-op success (`PAR-13`)",
    );
    let r = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "E12 (the surviving registration)",
        &r.triggered,
        &one_handle(&real),
        "§5.8 (a): neither no-op removed the store's own registration — `P-TP-7`'s independence clause and \
         `§6.5` item 12's one-entry removal",
    );
}

// SCENARIO E13 — a `rollback` is NOT a trigger event: its result carries NO handle list, it fires
// NOTHING, and it leaves the home untouched.
// Clauses: `§6.5` item 10 (c) (*"no `rollback` … fires a listener"*); `§6.3`'s closed three-member
//   `RollbackResult`; `§6.4` `M-5`/`M-7`/`M-9`; `§5.8` (b)'s closing words (*"a `read`, a `findAddress`, a
//   `rollback` and the boot fire NOTHING and carry no handle list"*).
// Drive: `listen(["a"])`; `write(["a"], mem, 1)` → `opId`; `rollback(opId)`; then `write(["a"], mem, 2)`.
// Expected: the rollback answers a result whose member set is EXACTLY `{ opId, undoneOps, restoredTo }` —
//   asserted by an exhaustively-patterned destructure, which is a COMPILE-TIME closure of that set, so a
//   fourth member (a `triggered` list included) could not compile; `undoneOps == [opId]`; `restoredTo`
//   reports the subtree's ACTUAL state (`present: false`, the pre-write state); and the following edit's
//   set is EXACTLY `{ h }` — the registration survived the rollback.
// Observable: the destructurable member set, the three members' values, the emptied address afterwards,
//   and the following edit's set.
#[test]
fn lf_e13_a_rollback_returns_no_triggered_and_fires_nothing() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["a"]), "§6.5 item 12 (c)");
    let w = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    let op_id = w.op.opId.clone();
    let result = ok(
        store.rollback(OpIdArg::Id(op_id.clone())),
        "§6.3: `rollback(op)` — the op id the write returned resolves in this instance's journal (`§5.8` (g))",
    );
    let RollbackResult {
        opId,
        undoneOps,
        restoredTo,
    } = result;
    assert_eq!(
        opId, op_id,
        "§6.3: `opId` is *\"the id the caller passed, echoed\"*"
    );
    assert_eq!(
        undoneOps,
        vec![op_id.clone()],
        "§6.4 M-5 + M-8: the scope is every op touching the written address's own subtree — here the ONE \
         write — and the rollback is TOTAL over it (no partial rollback exists, `DD-20`)"
    );
    assert!(
        !restoredTo.present,
        "§6.4 M-7 (ii): `restoredTo` reports the state the addressed subtree ACTUALLY stands at after the \
         rollback — the pre-write state, which for a `W-3` mint is ABSENT"
    );
    assert!(
        store
            .read(AddressArg::List(key(&["a"])), none())
            .is_err(),
        "§6.4 M-5/M-7: the minted key is undone"
    );
    assert_eq!(
        register(&store),
        v_obj(&[]),
        "§6.4 M-9: the rollback itself appends NO journal entry and leaves no graph residue"
    );
    let after = write_at(&mut store, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-3");
    assert_triggered(
        "E13 (the registration after the rollback)",
        &after.triggered,
        &one_handle(&h),
        "§5.8 (b): *\"a `read`, a `findAddress`, a `rollback` and the boot fire NOTHING and carry no handle \
         list\"* — the home is not a journaled structure (`DD-38`), so the rollback neither fired nor \
         dropped the listener; the fire below is the WRITE's, one of the two tracked verbs",
    );
}

// ===================================================================================================
// F. THE TWO LISTS AND THE BORROW LIFECYCLE THROUGH THE INTERFACE.
// ===================================================================================================

// SCENARIO F1 — a `W-2` RE-MINT destroys the node at the listener's address: the destroying edit fires it,
// and a LATER edit at the re-created address still fires it — the binding is the ADDRESS's.
// Clauses: `§6.5` item 10 (b) (*"a re-mint, a purge, a shadow … does not move, drop or redirect the
//   listener: the binding is the address's"*); `§6.5` item 9 (a) (`A46`); `§5.8` (a).
// Drive: `listen(["m"])`; `write(["m"], mem, 1)`; `write(["m"], mem, {k:1})` (the re-mint); then
//   `write(["m","k"], mem, 2)`; then a second re-mint at `["m"]`.
// Expected `triggered`: EXACTLY `{ h }` at EVERY one of the four edits.
// Observable: the four sets.
#[test]
fn lf_f1_a_re_mint_destroys_the_node_and_a_later_edit_still_fires_the_listener() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["m"]), "§6.5 item 12 (c)");
    let w1 = write_at(
        &mut store,
        key(&["m"]),
        w_mem(),
        v_num(1.0),
        "§3.4 W-3: the leaf whose pointing anchor the re-mint destroys",
    );
    assert_triggered("F1 (the mint)", &w1.triggered, &one_handle(&h), "§5.8 (a)");
    let w2 = write_at(
        &mut store,
        key(&["m"]),
        w_mem(),
        v_obj(&[("k", v_num(1.0))]),
        "§3.4 W-2: the leaf's anchor is DESTROYED and a new one is placed on the SAME link",
    );
    assert_triggered(
        "F1 (the destroying edit)",
        &w2.triggered,
        &one_handle(&h),
        "§6.5 item 9 (a) (A46) + item 10 (b): the node that held the borrow is destroyed WITH its borrows, \
         and the destroying edit fires the listener bound at that ADDRESS exactly once",
    );
    let w3 = write_at(
        &mut store,
        key(&["m", "k"]),
        w_mem(),
        v_num(2.0),
        "§3.4 W-3 under the re-created branch",
    );
    assert_triggered(
        "F1 (a later edit under the re-created address)",
        &w3.triggered,
        &one_handle(&h),
        "§6.5 item 9 (a-bis) + `P-TP-8` (d): *\"the same two sets must be produced whether the index is \
         consulted or the home is scanned\"* — no handle is lost or duplicated by the destruction",
    );
    let w4 = write_at(
        &mut store,
        key(&["m"]),
        w_mem(),
        v_obj(&[("k", v_num(3.0))]),
        "§3.4 W-2 again: a second re-mint at the listener's own address",
    );
    assert_triggered(
        "F1 (a second re-mint)",
        &w4.triggered,
        &one_handle(&h),
        "§6.5 item 10 (b): *\"the binding is the address's\"* — it survives every re-mint",
    );
}

// SCENARIO F2 — **`§5.8`'s `(iv)` DESTRUCTION DRIVE**: bind at an address, write through it so the arm
// REPLACES the node that carried the borrow — `W-6`, then `W-2`, then `W-1` in turn — and assert the NEXT
// trigger still returns that listener's handle EXACTLY ONCE (`A46`: *"the borrow's drop is observed as NO
// LOST AND NO DUPLICATED handle"*).
// Clauses: `§5.8` (a)/(d) and its `(iv)` strategy cell; `§6.5` item 9 (a); `P-SM-4` (f); `DD-32`/`DD-41`.
// Drive: `listen(["n"])`; then `write(["n"], temp, 1)`; `write(["n"], mem, 2)` (the `W-6` purge);
//   `write(["n"], mem, {x:1})` (the `W-2` re-mint); `write(["n"], mem, {x:2})` (the `W-1` purge-then-mint);
//   `write(["n","x"], mem, 7)`.
// Expected `triggered`: EXACTLY `{ h }`, ONE member, at EVERY step — five times.
// Observable: the five sets, each asserted for cardinality ONE.
#[test]
fn lf_f2_the_destruction_drive_fires_once_per_arm_and_never_loses_a_handle() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["n"]), "§6.5 item 12 (c)");
    let arms: [(TierArg, StoreValue, &str); 5] = [
        (w_temp(), v_num(1.0), "§3.4 W-3: the leaf at `temp`"),
        (
            w_mem(),
            v_num(2.0),
            "§3.4 W-6: the lower `temp` version is PURGED and the node carrying the borrow is replaced",
        ),
        (
            w_mem(),
            v_obj(&[("x", v_num(1.0))]),
            "§3.4 W-2: the leaf's anchor is destroyed and re-minted",
        ),
        (
            w_mem(),
            v_obj(&[("x", v_num(2.0))]),
            "§3.4 W-1: the pair is purged and re-minted",
        ),
        (
            w_mem(),
            v_obj(&[]),
            "§3.4 W-1 again, over a branch",
        ),
    ];
    for (i, (tier, value, clause)) in arms.into_iter().enumerate() {
        let r = write_at(&mut store, key(&["n"]), tier, value, clause);
        assert_triggered(
            &format!("F2 step {} ({})", i + 1, clause),
            &r.triggered,
            &one_handle(&h),
            "§5.8 (iv) + A46: the arm destroys and replaces the node that carried the borrow, and the NEXT \
             trigger still returns that listener's handle EXACTLY ONCE",
        );
        assert_eq!(
            r.triggered.len(),
            1,
            "F2 step {}: NO LOST and NO DUPLICATED handle — `P-SM-4`'s (f) and `DD-41`'s both spellings",
            i + 1
        );
    }
    let deep = write_at(
        &mut store,
        key(&["n", "x"]),
        w_mem(),
        v_num(7.0),
        "§3.4 W-1 at a descendant of the replaced node",
    );
    assert_triggered(
        "F2 (a descendant edit under the replaced branch)",
        &deep.triggered,
        &one_handle(&h),
        "A37/DD-18: the edit passes THROUGH the ancestor's address, whose binding the change actions could \
         not move, drop or redirect",
    );
}

// SCENARIO F3 — a DELETE removes the node at the listener's address: the delete fires it, and a LATER
// write at the RE-CREATED address fires it again.
// Clauses: `§6.5` item 10 (b) (*"a purge … does not move, drop or redirect the listener"*); `§4.4`'s
//   dated firing clause; `A46` (the delete arms' removals destroy the node with its borrows).
// Drive: `listen(["q"])`; `write(["q"], mem, 1)`; `delete(["q"], mem)`; `write(["q"], mem, 2)`.
// Expected: `{ h }` at all three edits.
// Observable: the three sets and the address's resolution between them.
#[test]
fn lf_f3_a_delete_destroys_the_node_and_a_later_write_at_the_re_created_address_fires_it() {
    let mut store = new_store();
    let h = listen_at(&mut store, key(&["q"]), "§6.5 item 12 (c)");
    let minted = write_at(&mut store, key(&["q"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered("F3 (the mint)", &minted.triggered, &one_handle(&h), "§5.8 (a)");
    let receipt = delete_at(
        &mut store,
        key(&["q"]),
        t(Tier::Mem),
        "§4.4 D-1: the one version at the named tier is removed with its node and its borrows",
    );
    assert_triggered(
        "F3 (the destroying delete)",
        &receipt.triggered,
        &one_handle(&h),
        "§4.4's dated clause + A46: the removal destroys the node, and the destroying edit fires the \
         listener bound at that address",
    );
    assert!(
        store
            .findAddress(AddressArg::List(key(&["q"])), none())
            .is_err(),
        "§4.4 D-1: the version is gone, so the address does not resolve"
    );
    let again = write_at(
        &mut store,
        key(&["q"]),
        w_mem(),
        v_num(2.0),
        "§3.4 W-3: the address is RE-CREATED by a later edit",
    );
    assert_triggered(
        "F3 (a later edit at the re-created address)",
        &again.triggered,
        &one_handle(&h),
        "§6.5 item 10 (b): *\"a re-mint, a purge, a shadow, a `VEC` renumbering (`DD-30`) or a rollback \
         that changes the NODE at an address does not move, drop or redirect the listener: the binding is \
         the address's\"*",
    );
}

// SCENARIO F4 — **`watched` BESIDE `triggered`, the ORDINARY case**: `watched` is EXACTLY the DISTINCT
// addresses of the listeners `triggered` names; the counts are EQUAL here, and that equality is asserted
// ONLY with its precondition written into the drive (one home entry per triggered address); the
// correspondence is asserted as SET MEMBERSHIP over the (handle, address) pairs, never index-into-index.
// Clauses: `§5.8` (e) (the kept half) and `(f)` (3a)/(3b)/(3c); `DD-35`; `§6.5` item 12 (c).
// Drive: construct with `{["a"], "a-adopted"}`; `listen(["a","b"])`; `write(["a"], mem, {})`;
//   `write(["a","b"], mem, 1)`.
// Expected: `triggered == { a-adopted, minted }`; `watched == { ["a"], ["a","b"] }`; two members each.
// Observable: both sets, their counts, and the membership correspondence in BOTH directions.
#[test]
fn lf_f4_watched_beside_triggered_the_ordinary_one_entry_per_address_case() {
    let ha = handle("a-adopted");
    let mut store = store_with(
        &fresh_path("lf-f4"),
        listeners(vec![entry(key(&["a"]), ha.clone())]),
    );
    let hab = listen_at(&mut store, key(&["a", "b"]), "§6.5 item 12 (c)");
    write_at(
        &mut store,
        key(&["a"]),
        w_mem(),
        v_obj(&[]),
        "§3.4 W-4: the branch at `a`",
    );
    let w = write_at(&mut store, key(&["a", "b"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "F4",
        &w.triggered,
        &[ha.clone(), hab.clone()],
        "§5.8 (a): both addresses are prefixes of the write's address, so both handles are returned",
    );
    assert_watched(
        "F4",
        &w.watched,
        &[key(&["a"]), key(&["a", "b"])],
        "§5.8 (f) (3a): *\"`watched`'s members are EXACTLY the DISTINCT addresses of the listeners \
         `triggered` names\"*",
    );
    assert_eq!(
        w.triggered.len(),
        w.watched.len(),
        "§5.8 (f) (3c): the counts are asserted EQUAL only under the drive's own precondition — each \
         triggered address carries exactly ONE home entry (the construction's one at `[\"a\"]`, and \
         `listen`'s one at `[\"a\",\"b\"]`, which `§6.5` item 12 (c) never doubles)"
    );
    let pairs: Vec<(ListenerHandle, Vec<Segment>)> = vec![
        (ha.clone(), key(&["a"])),
        (hab.clone(), key(&["a", "b"])),
    ];
    for h in &w.triggered {
        let addr = pairs
            .iter()
            .find(|(ph, _)| ph == h)
            .map(|(_, a)| a.clone())
            .unwrap_or_else(|| panic!("F4: `triggered` carries a handle the home does not hold"));
        assert!(
            w.watched.iter().any(|x| x == &addr),
            "§5.8 (f) (3b): for EVERY member `h` of `triggered`, the home entry carrying `h` has an address \
             that IS a member of `watched`"
        );
    }
    for addr in &w.watched {
        assert!(
            w.triggered
                .iter()
                .any(|h| pairs.iter().any(|(ph, pa)| ph == h && pa == addr)),
            "§5.8 (f) (3b): for EVERY member `W` of `watched` there EXISTS at least one member of \
             `triggered` whose home entry is keyed at `W`"
        );
    }
    let mut seen: Vec<Vec<Segment>> = Vec::new();
    for addr in &w.watched {
        assert!(
            !seen.contains(addr),
            "§5.8's failure list: *\"a duplicated watched address\"* — one address appearing TWICE in a list \
             declared a SET"
        );
        seen.push(addr.clone());
    }
}

// SCENARIO F5 — **the `DD-39` DUPLICATE case, where the counts DIFFER BY DECLARATION**: two construction
// entries at ONE address with two DIFFERENT handles give `watched.len() == 1` against
// `triggered.len() == 2` — *"that INEQUALITY IS NOT A FAILURE"* — while the (3a)/(3b) correspondence holds
// in both directions.
// Clauses: `DD-39`; `§5.8` (e), (f) (3a)/(3b)/(3c) and the reconciliation of its failure list's first two
//   items; `seams-and-lifecycle.md §7.1` step 5.
// Drive: `listeners[] = [ {["a"], "dup-1"}, {["a"], "dup-2"} ]`; `write(["a"], mem, 1)`.
// Expected: `triggered` has TWO members; `watched` has ONE; the counts are UNEQUAL.
// Observable: the two sets' cardinalities and their membership correspondence.
#[test]
fn lf_f5_the_dd_39_duplicate_makes_the_counts_differ_by_declaration() {
    let h1 = handle("dup-1");
    let h2 = handle("dup-2");
    let mut store = store_with(
        &fresh_path("lf-f5"),
        listeners(vec![
            entry(key(&["a"]), h1.clone()),
            entry(key(&["a"]), h2.clone()),
        ]),
    );
    let w = write_at(&mut store, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "F5",
        &w.triggered,
        &[h1.clone(), h2.clone()],
        "DD-39: *\"the home then holds two entries at one address with two DIFFERENT handles, and a trigger \
         returns both\"*",
    );
    assert_watched(
        "F5",
        &w.watched,
        &[key(&["a"])],
        "§5.8 (f) (3a): the address projection carries the one DISTINCT address",
    );
    assert_eq!(w.triggered.len(), 2, "F5: TWO handles (DD-39)");
    assert_eq!(w.watched.len(), 1, "F5: ONE address (§5.8 (e))");
    assert_ne!(
        w.triggered.len(),
        w.watched.len(),
        "§5.8 (f) (3c) + DD-39: *\"the `DD-39` duplicate state gives `watched.len() == 1` against \
         `triggered.len() == 2` BY THE CONTRACT'S OWN DECLARATION, and that INEQUALITY IS NOT A FAILURE\"*"
    );
    for h in &w.triggered {
        assert!(
            w.watched.iter().any(|x| x == &key(&["a"])),
            "§5.8 (f) (3b): both handles' home entries are keyed at `[\"a\"]`, which IS a member of \
             `watched` — the first failure-list item (*\"a duplicated watched address\"*) is read in its \
             EXACT SCOPE and never as this lawful state"
        );
        assert!(
            h == &h1 || h == &h2,
            "F5: every member of `triggered` is one of the two ADOPTED tokens — no re-minting (§0.4 \
             clause 2 (b): `ADOPTED VERBATIM`)"
        );
    }
}

// SCENARIO F6 — **`DD-42`'s mint rule and the ONE LAWFUL COLLISION.** **(a)** `listen` NEVER mints a token
// the home already holds: after a registration mint, the caller-spelled tokens are untouched and the
// withdrawal of the MINTED handle removes nothing the caller did not name. **(b)** Two CALLER-SPELLED
// entries at one address carrying ONE token MAY carry that token twice in `triggered`, and `unlisten` over
// it removes the FIRST match — *"the CALLER'S OWN CONSTRUCTION CHOICE"*, declared and not a defect.
// Clauses: `contract.md §0.4`'s handle-construction rule (clauses 1–3) and its dated collision clause;
//   `DD-42` clauses (1)–(3); `§6.5` item 12 (b)/(c); `PAR-13`.
// Drive (a): construct with three caller-spelled tokens `listener-1`/`-2`/`-3`; `listen(["b"])`;
//   `unlisten(minted)`; `write(["a1"], mem, 1)`.
// Drive (b): construct with TWO entries at `["a"]` carrying ONE token `same-token`; `write(["a"], mem, 1)`;
//   `unlisten(same-token)`; `write(["a"], mem, 2)`.
// Expected (a): the minted token is UNEQUAL to every held token, and the write at `["a1"]` returns EXACTLY
//   `{ listener-1 }`. Expected (b): TWO members before the withdrawal, ONE after it.
// Observable: handle inequality, and the two `triggered` sets with their cardinalities.
#[test]
fn lf_f6_the_mint_never_collides_and_the_caller_spelled_collision_is_lawful() {
    // (a) THE MINT'S OWN RULE.
    let adopted = [handle("listener-1"), handle("listener-2"), handle("listener-3")];
    let mut store = store_with(
        &fresh_path("lf-f6a"),
        listeners(vec![
            entry(key(&["a1"]), adopted[0].clone()),
            entry(key(&["a2"]), adopted[1].clone()),
            entry(key(&["a3"]), adopted[2].clone()),
        ]),
    );
    let minted = listen_at(&mut store, key(&["b"]), "§6.5 item 12 (c)");
    for held in &adopted {
        assert_ne!(
            &minted, held,
            "DD-42 clause (1) + §0.4's dated collision clause: *\"`listen` mints a store-unique token that is \
             UNEQUAL to EVERY token the home already holds: a mint whose candidate token is already held \
             SKIPS that candidate and mints the NEXT one\"*"
        );
    }
    ok(
        store.unlisten(&minted),
        "§6.5 item 12: the minted handle's withdrawal",
    );
    let after = write_at(&mut store, key(&["a1"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "F6 (a): the adopted token after the mint's withdrawal",
        &after.triggered,
        &one_handle(&adopted[0]),
        "DD-42: *\"the home never holds two entries with one token …, `unlisten` removes exactly the entry \
         it names, and `triggered` carries NO DUPLICATED MEMBER\"* — an unlisten that removed an entry the \
         caller did not name would be the defect this rule exists to prevent",
    );

    // (b) THE ONE LAWFUL COLLISION — two CALLER-SPELLED entries carrying ONE token.
    let same = handle("same-token");
    let mut dup = store_with(
        &fresh_path("lf-f6b"),
        listeners(vec![
            entry(key(&["a"]), same.clone()),
            entry(key(&["a"]), same.clone()),
        ]),
    );
    let before = write_at(&mut dup, key(&["a"]), w_mem(), v_num(1.0), "§3.4 W-3");
    assert_triggered(
        "F6 (b): two caller-spelled entries carrying ONE token",
        &before.triggered,
        &[same.clone(), same.clone()],
        "§0.4's dated collision clause + DD-42 clause (2): *\"TWO CALLER-SPELLED entries at ONE address … \
         MAY carry the SAME token … and in THAT state, and only that state: `triggered` MAY carry that \
         token twice, and `unlisten` over it removes the FIRST match\"* — the mis-targeting is the \
         CALLER'S OWN CONSTRUCTION CHOICE and is DECLARED, not a defect",
    );
    assert_eq!(
        before.triggered.len(),
        2,
        "F6 (b): the token stands TWICE — `DD-39`'s *\"each with its OWN handle\"* read with `DD-42` clause \
         (2)'s one lawful collision"
    );
    ok(
        dup.unlisten(&same),
        "§6.5 item 12: `unlisten` removes ONE home-map entry — the FIRST match",
    );
    let after_dup = write_at(&mut dup, key(&["a"]), w_mem(), v_num(2.0), "§3.4 W-1");
    assert_triggered(
        "F6 (b): after the one-entry withdrawal",
        &after_dup.triggered,
        &one_handle(&same),
        "DD-42 clause (2): *\"a one-entry removal for a known one\"* — ONE entry is left, so the trigger \
         carries the token ONCE",
    );
    assert_eq!(
        after_dup.triggered.len(),
        1,
        "F6 (b): the withdrawal removed exactly ONE of the two entries"
    );
}

// ===================================================================================================
// G. **ONE FULL USER FLOW TO THE FINAL RESOLVED STATE** — construction with a path and a listener array,
// two more registrations, a script of edits whose EXACT `triggered` set is asserted after each, a restart
// (boot), and the accumulated firing log compared against the expected SEQUENCE OF SETS.
// ===================================================================================================

// SCENARIO G1 — THE END-TO-END FLOW. **This is the directive's own check — *"listeners fire to the
// interface on edits at their address"* — carried through a whole session and a boot.**
// Clauses: `seams-and-lifecycle.md §7.1` steps 1–7 (the construction order, the `listeners[]` adoption);
//   `§7.2` items 1, 5, 6 (`M-12`, `DD-28`, the boot); `§3.4`'s arms; `§4.4`'s arms and its firing clause;
//   `§5.8` (a)/(b)/(e)/(f); `§6.5` items 8–12; `DD-28`, `DD-35`, `DD-37`, `DD-38`, `DD-39`; `P-TP-7`.
// Drive:
//   `storeCreate(path, 64, [ {["a"], "adopted-a"}, {["a","b"], "adopted-ab"} ])`; `listen(["c"])`;
//   `listen(["a","c"])`; then
//   (1) `write(["a"], file, {})` · (2) `write(["a","b"], mem, 1)` · (3) `write(["a","b"], temp, 2)` ·
//   (4) `write(["a","b"], file, 3)` [commits] · (5) `write(["c"], file, "C")` [commits] ·
//   (6) `write(["a","c"], temp, "AC")` · (7) `delete(["a","b"], file)` · (8) `delete(["a"], temp)` [the
//   `D-3` no-op]; then the boot: `storeCreate(path, 64, [])`, the durable read, and a first post-boot edit.
// Expected `triggered`, edit by edit, ON THE CONTRACT ALONE (the prefix test over each edit's OWN address):
//   {a} · {a,ab} · {a,ab} · {a,ab} · {c} · {a,ac} · {a,ab} · {} — and `watched` its address projection each
//   time. After the boot: the register `{ a: { b: 3 }, c: "C" }` (the LAST successful `file`-tier write's
//   bytes, item 5's — `DD-28`: neither delete commits)`; `["a","c"]` does NOT resolve (its `temp` version
//   never reached the file); the home holds NOTHING (`DD-38`), so the first post-boot edit's `triggered`
//   is `[]`.
// Observable: the eight sets, the eight `watched` sets, the booted register object, the post-boot sets, and
//   the accumulated log against the expected sequence.
#[test]
fn lf_g1_the_full_user_flow_to_the_final_resolved_state() {
    let path = fresh_path("lf-g1");
    let ha = handle("adopted-a");
    let hab = handle("adopted-ab");
    let mut store = store_with(
        &path,
        listeners(vec![
            entry(key(&["a"]), ha.clone()),
            entry(key(&["a", "b"]), hab.clone()),
        ]),
    );
    let hc = listen_at(
        &mut store,
        key(&["c"]),
        "§6.5 item 12 (c): a third registration, minted AFTER the construction",
    );
    let hac = listen_at(
        &mut store,
        key(&["a", "c"]),
        "§6.5 item 12 (c): a fourth registration, at an address that holds no node yet",
    );

    let expected: Vec<(Vec<Segment>, TierArg, StoreValue, Vec<ListenerHandle>, Vec<Vec<Segment>>, &str)> = vec![
        (
            key(&["a"]),
            w_file(),
            v_obj(&[]),
            vec![ha.clone()],
            vec![key(&["a"])],
            "§3.4 W-4: the register's container holds no anchor at `a`; the register's own anchor carries \
             `file` (A49/A50), so the branch is minted there. Prefixes of `[\"a\"]` that are bound: `[\"a\"]`",
        ),
        (
            key(&["a", "b"]),
            w_mem(),
            v_num(1.0),
            vec![ha.clone(), hab.clone()],
            vec![key(&["a"]), key(&["a", "b"])],
            "§3.4 W-3: a leaf under the branch; prefixes of `[\"a\",\"b\"]`: `[\"a\"]` and `[\"a\",\"b\"]`",
        ),
        (
            key(&["a", "b"]),
            w_temp(),
            v_num(2.0),
            vec![ha.clone(), hab.clone()],
            vec![key(&["a"]), key(&["a", "b"])],
            "§3.4 W-5: the `temp` shadow of the surviving `mem` leaf",
        ),
        (
            key(&["a", "b"]),
            w_file(),
            v_num(3.0),
            vec![ha.clone(), hab.clone()],
            vec![key(&["a"]), key(&["a", "b"])],
            "§3.4 W-6: both lower versions are purged and the version is minted at `file` — this write \
             COMMITS the file's bytes (§7.2 item 1, M-12)",
        ),
        (
            key(&["c"]),
            w_file(),
            v_str("C"),
            vec![hc.clone()],
            vec![key(&["c"])],
            "§3.4 W-3 at a register key; prefixes of `[\"c\"]`: `[\"c\"]` alone — `[\"a\",\"c\"]` is not one",
        ),
        (
            key(&["a", "c"]),
            w_temp(),
            v_str("AC"),
            vec![ha.clone(), hac.clone()],
            vec![key(&["a"]), key(&["a", "c"])],
            "§3.4 W-3: prefixes of `[\"a\",\"c\"]`: `[\"a\"]` and `[\"a\",\"c\"]`",
        ),
    ];

    let mut log: Vec<Vec<ListenerHandle>> = Vec::new();
    for (i, (address, tier, value, want_handles, want_addresses, clause)) in
        expected.into_iter().enumerate()
    {
        let r = write_at(&mut store, address, tier, value, clause);
        assert_triggered(
            &format!("G1 step {} (a write)", i + 1),
            &r.triggered,
            &want_handles,
            clause,
        );
        assert_watched(
            &format!("G1 step {} (a write)", i + 1),
            &r.watched,
            &want_addresses,
            "§5.8 (f) (3a): the address projection of `triggered`",
        );
        log.push(r.triggered);
    }

    // (7) `delete(["a","b"], file)` — `D-1`: the one version at the named tier is removed, and the delete
    // FIRES (`A43`; `§4.4`'s dated clause). Prefixes of `["a","b"]`: `["a"]` and `["a","b"]`.
    let d1 = delete_at(
        &mut store,
        key(&["a", "b"]),
        t(Tier::File),
        "§4.4 D-1: the `file` version at `[\"a\",\"b\"]`",
    );
    assert_triggered(
        "G1 step 7 (the delete)",
        &d1.triggered,
        &[ha.clone(), hab.clone()],
        "§4.4's dated clause: the delete's trigger event is the PREFIX test over the deleted address",
    );
    assert_eq!(d1.tiers, vec![Tier::File], "§4.4 D-1: the one named tier");
    log.push(d1.triggered);

    // (8) `delete(["a"], temp)` — `D-3`: `["a"]` resolves and holds NO `temp` version, so nothing is
    // removed and NOTHING fires (`tiers: []` and `triggered: []`).
    let d3 = delete_at(
        &mut store,
        key(&["a"]),
        t(Tier::Temp),
        "§4.4 D-3: the target resolves and the named tier holds no version",
    );
    assert!(d3.tiers.is_empty(), "§4.4 D-3 + DD-9: `tiers: []`");
    assert_triggered(
        "G1 step 8 (the no-op delete)",
        &d3.triggered,
        &[],
        "§4.4's dated clause: *\"no version was removed, so no node was destroyed and no trigger occurred\"*",
    );
    log.push(d3.triggered);

    // THE ACCUMULATED FIRING LOG — the sequence of SETS the session produced, each entry compared as a set
    // (`DD-37`): any extra fire, any missing fire and any duplicated handle fails here.
    let want_log: Vec<Vec<ListenerHandle>> = vec![
        vec![ha.clone()],
        vec![ha.clone(), hab.clone()],
        vec![ha.clone(), hab.clone()],
        vec![ha.clone(), hab.clone()],
        vec![hc.clone()],
        vec![ha.clone(), hac.clone()],
        vec![ha.clone(), hab.clone()],
        vec![],
    ];
    assert_eq!(
        log.len(),
        want_log.len(),
        "G1: the session's firing log carries exactly {} entries — the eight edits below, two of them \
         deletes and one of them the `D-3` no-op",
        want_log.len()
    );
    for (i, (observed, want)) in log.iter().zip(want_log.iter()).enumerate() {
        assert_triggered(
            &format!("G1 accumulated log, entry {}", i + 1),
            observed,
            want,
            "§5.8 (a)/(b) + A43: the accumulated firing log is the expected SEQUENCE OF SETS — each entry \
             asserted as a set, never as a sequence (DD-37)",
        );
    }

    // ------------------------------------------------------------------------------------------------
    // THE RESTART: a fresh `storeCreate` at the same path — the DECLARED boot (`§7.2` item 6).
    // ------------------------------------------------------------------------------------------------
    drop(store);
    let mut booted = store_with(&path, listeners(vec![]));
    assert_eq!(
        register(&booted),
        v_obj(&[
            ("a", v_obj(&[("b", v_num(3.0))])),
            ("c", v_str("C")),
        ]),
        "§7.2 item 5 + DD-28 + M-12: the bytes at `cfg.filePath` are those of the LAST SUCCESSFUL `file`-TIER \
         WRITE (step 5's; neither delete commits), so the booted register carries `a` — whose `file`-tier \
         `b` stands at 3 — and `c`, and the boot produced no code and no registration"
    );
    assert!(
        booted
            .read(AddressArg::List(key(&["a", "c"])), none())
            .is_err(),
        "§7.2 item 6: `mem` is lost and `temp` with it — the `temp` version step 6 wrote never reached the \
         file's bytes, so `[\"a\",\"c\"]` does not resolve after the boot"
    );
    assert_eq!(
        read_at(&booted, &key(&["a", "b"])),
        v_num(3.0),
        "§7.2 item 6: the `file`-tier version step 4 minted is the durable one"
    );

    // THE HOME AFTER THE BOOT: NOTHING is watched (`DD-38`; `§7.2` item 6's *"nothing is watched"*;
    // `§5.8` (v)'s HOME-IS-NOT-A-GRAPH-STRUCTURE drive).
    let first = write_at(
        &mut booted,
        key(&["a", "b"]),
        w_temp(),
        v_num(9.0),
        "§3.4 W-5: the `temp` shadow of the booted `file` leaf",
    );
    assert_triggered(
        "G1 (the first edit after the boot)",
        &first.triggered,
        &[],
        "DD-38: *\"the home is not serialized into `cfg.filePath`, so a fresh `storeCreate` over an equal \
         path loads NO registration\"* — the booted instance's home is EMPTY",
    );
    assert_watched(
        "G1 (the first edit after the boot)",
        &first.watched,
        &[],
        "§5.8 (e): no address either",
    );

    // AND THE NEW INSTANCE'S OWN HOME WORKS: a registration made after the boot fires at its address.
    let fresh = listen_at(
        &mut booted,
        key(&["a", "b"]),
        "§6.5 item 12 (c) in the booted instance",
    );
    let second = write_at(
        &mut booted,
        key(&["a", "b"]),
        w_temp(),
        v_num(10.0),
        "§3.4 W-5 again",
    );
    assert_triggered(
        "G1 (a registration made after the boot)",
        &second.triggered,
        &one_handle(&fresh),
        "§6.5 item 12 (c) + §5.8 (a): the booted instance's home is its OWN, and its registration fires at \
         its own address",
    );
}

// SCENARIO G2 — a fresh instance over an EQUAL `cfg.filePath` loads the durable GRAPH state and NO
// registration, and the two instances share no registration (`P-TP-7`'s independence clause; `DD-38`).
// Clauses: `§7.2` item 6; `DD-38`; `§6.5` item 8 (e) (*"the shipped `P-TP-7` independence clause is thereby
//   the row's own: no watched registration is shared between two instances"*); `§5.8` (a)/(e).
// Drive: instance 1 constructed over a fresh path with `{["a"], "adopted"}` and a `file` write at `["a"]`;
//   instance 2 constructed over the SAME path with an EMPTY array; a `file` write in instance 2; then a
//   `mem` write in instance 1.
// Expected: instance 2's boot loads `["a"] == 1` (the durable state) but its first edit's `triggered` is
//   EMPTY and its `watched` is EMPTY; instance 1's own edit still fires EXACTLY `{ adopted }`.
// Observable: the booted read, the two instances' sets.
#[test]
fn lf_g2_a_fresh_instance_over_an_equal_path_shares_no_registration() {
    let path = fresh_path("lf-g2");
    let adopted = handle("adopted");
    let mut first = store_with(
        &path,
        listeners(vec![entry(key(&["a"]), adopted.clone())]),
    );
    let r1 = write_at(
        &mut first,
        key(&["a"]),
        w_file(),
        v_num(1.0),
        "§3.4 W-3 at `file`: this commit IS the durable state (§7.2 item 1)",
    );
    assert_triggered(
        "G2 (the first instance)",
        &r1.triggered,
        &one_handle(&adopted),
        "§5.8 (a): the construction's adopted handle fires at its own address",
    );

    let mut second = store_with(&path, listeners(vec![]));
    assert_eq!(
        read_at(&second, &key(&["a"])),
        v_num(1.0),
        "§7.2 item 6: the boot loads the `file` tier's content at `cfg.filePath` — the durable state is \
         SHARED, and only it"
    );
    let r2 = write_at(
        &mut second,
        key(&["a"]),
        w_file(),
        v_num(2.0),
        "§3.4 W-1 in the second instance",
    );
    assert_triggered(
        "G2 (the second instance)",
        &r2.triggered,
        &[],
        "DD-38: *\"a fresh `storeCreate` over an equal path loads NO registration\"* — and `P-TP-7`: no \
         watched registration is shared between two instances",
    );
    assert_watched(
        "G2 (the second instance)",
        &r2.watched,
        &[],
        "§5.8 (e): the address projection is empty in the instance that registered nothing",
    );

    let r3 = write_at(
        &mut first,
        key(&["a"]),
        w_mem(),
        v_num(3.0),
        "§3.4 W-5: the shadow of the first instance's own `file` leaf",
    );
    assert_triggered(
        "G2 (the first instance, after the second instance's edit)",
        &r3.triggered,
        &one_handle(&adopted),
        "§6.5 item 8 (e) + `P-TP-7`: the registration is THIS instance's own, and the second instance's \
         edit neither fires it nor removes it",
    );
}
