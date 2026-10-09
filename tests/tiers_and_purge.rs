//! `tests/tiers_and_purge.rs` — contract `§5` (`contract.md §5.1`, `§5.3`, `§5.4`): the tier domain, its
//! total and strict rank, its lifetimes, the composite key with the shadow, and the purge chain.
//!
//! States enumerated for this concern, each driven below: each of the three tokens as the only version at
//! a key; a token outside the domain; two versions of one key at every ordered tier pair; all three
//! versions at one key; the purge chain's three rows (`temp` → `mem` → `file`); purge's scope; the
//! cascade; `A15`'s special case (`temp` purged on a write to `mem`).

mod support;
use support::*;

// §5.1 M-2 — the domain is closed at three: `file`, `mem`, `temp` are legal and every other spelling is
// OutOfDomainTier (`secure` is not a fourth tier).
// Drives: §5.1 M-2
#[test]
fn s5_1_m2_the_tier_domain_is_closed_at_three() {
    let mut store = new_store();
    for tier in canonical_tiers() {
        ok(
            store.write(AddressArg::List(key(&["a"])), t(tier), v_num(1.0)),
            "§5.1 M-2: a legal token",
        );
    }
    for spelling in ["secure", "Secure", "FILE", "disk", "session", ""] {
        let e = failure(
            store.write(
                AddressArg::List(key(&["b"])),
                outside_token(spelling),
                v_num(1.0),
            ),
            "§5.1 M-2",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "§5.1 M-2: an argument outside {{file, mem, temp}}",
        );
    }
}

// §5.1 M-1 — the rank is TOTAL and STRICT: `file > mem > temp`. The observable is the unqualified read,
// which selects by rank ascending.
// Drives: §5.1 M-1
#[test]
fn s5_1_m1_the_rank_is_total_and_strict() {
    for (lower, higher) in [(Tier::Temp, Tier::Mem), (Tier::Mem, Tier::File)] {
        let mut store = new_store();
        ok(
            store.write(AddressArg::List(key(&["a"])), t(higher), v_str("higher")),
            "§3.4 W-3",
        );
        ok(
            store.write(AddressArg::List(key(&["a"])), t(lower), v_str("lower")),
            "§3.4 W-5",
        );
        assert_eq!(
            read_at(&store, &key(&["a"])),
            v_str("lower"),
            "§5.1 M-1: {} is selected before {}",
            tier_token(lower),
            tier_token(higher)
        );
        assert!(
            rank(lower) < rank(higher),
            "§5.1 M-1: rank({}) > rank({})",
            tier_token(higher),
            tier_token(lower)
        );
    }
}

// §5.1 + §11 · A11 — "lower tier" and "lower persistence" are ONE predicate: the lower-tier anchor IS the
// shadowing one, at every pair.
// Drives: §5.1, §11 · A11
#[test]
fn s5_1_lower_tier_is_lower_persistence_one_predicate() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("file")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_str("temp")),
        "§3.4 W-5",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("temp"),
        "§5.1: temp is the lowest persistence"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Temp],
        "§5.3 item 1: two anchors"
    );
}

// §5.3 item 1 + §1.3 (P: §15 · A34) — `(key, tier)` is the composite key: two versions of one key are
// TWO ANCHORS, one per tier, and at most one anchor stands at one pair.
// Drives: §5.3 item 1, §1.3 (P, §15 · A34)
#[test]
fn s5_3_the_composite_key_is_the_pair_key_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(3.0)),
        "§3.4 W-5",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        canonical_tiers().to_vec(),
        "§5.3 item 1: three anchors"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§5.3 item 1: one per tier"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Mem),
        v_num(2.0),
        "§5.3 item 1: one per tier"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Temp),
        v_num(3.0),
        "§5.3 item 1: one per tier"
    );
}

// §5.3 item 2 — the lower-persistence anchor is the shadowing one and an unqualified read selects it.
#[test]
fn s5_3_the_lower_persistence_anchor_shadows_and_the_unqualified_read_selects_it() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(2.0),
        "§5.3 item 2: the shadow wins"
    );
}

// §5.3 item 3 — a write at a more persistent tier removes every version at `rank ≤ its own`.
#[test]
fn s5_3_a_write_at_a_more_persistent_tier_removes_every_version_at_rank_le_its_own() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-6",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(3.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§5.3 item 3: rank ≤ 2 is removed"
    );
}

// §5.3 item 4 — a write at a less persistent tier is ADDED ALONGSIDE and the more persistent version
// SURVIVES.
// Drives: §5.3 item 4
#[test]
fn s5_3_a_write_at_a_less_persistent_tier_leaves_the_more_persistent_version_standing() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(2.0)),
        "§3.4 W-5",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Temp],
        "§5.3 item 4: added alongside"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§5.3 item 4: the more persistent one"
    );
}

// §5.4's purge chain, row by row, computed from `M-1`: a `temp` write purges `temp` alone and leaves
// `mem` and `file`; a `mem` write purges `mem` and `temp` and leaves `file`; a `file` write purges all
// three and leaves none.
// Drives: §5.4
#[test]
fn s5_4_the_purge_chain_table_row_by_row() {
    // A `temp` write: leaves mem and file standing.
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(3.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(4.0)),
        "§3.4 W-1",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        canonical_tiers().to_vec(),
        "§5.4: temp purges temp alone"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Temp),
        v_num(4.0),
        "§5.4: the new temp version"
    );

    // A `mem` write: leaves `file` standing and removes `mem` and `temp`.
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(3.0)),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Mem],
        "§5.4: rank ≤ 1 is removed"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§5.4: `file` is left standing"
    );

    // A `file` write: removes all three and leaves none.
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(3.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§5.4: rank ≤ 2 is removed; none survives"
    );
}

// §5.4 (P: §11 · A15, its own special case) — "temp has same behavior as mem, except that is shadows mem
// and is purged on writes to mem, like mem is to file."
// Drives: §5.4 (P, §11 · A15
#[test]
fn s5_4_temp_shadows_mem_and_is_purged_on_writes_to_mem_like_mem_is_to_file() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("mem")),
        "§3.4 W-5",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_str("trial")),
        "§3.4 W-5",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("trial"),
        "§5.4 A15: temp shadows mem"
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("mem2")),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Mem],
        "§5.4 A15: temp purged on a mem write"
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable2")),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§5.4 A15: mem purged on a file write"
    );
}

// §5.4 (P: §12 · A19) — purge's scope is THE ADDRESSED NODE'S OWN VERSIONS: not a subtree and not the
// store. A purge at a key leaves that key's SIBLINGS and unrelated subtrees untouched.
// Drives: §5.4 (P, §12 · A19)
#[test]
fn s5_4_purge_does_not_reach_a_subtree_or_the_store() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["sibling"])), w_file(), v_str("s")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_str("t")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_str("f")),
        "§3.4 W-6",
    );
    assert_eq!(
        read_tier(&store, &key(&["sibling"]), Tier::File),
        v_str("s"),
        "§5.4: not the store"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("f"),
        "§5.4: the addressed node's own versions"
    );
}

// §5.4's cascade, read with P-IM-3's reachability (`§5.5`) — a PURGED version's DOWNSTREAM nodes go with
// it: *"THIS CONTRACT DECLARES THE CASCADE REACHES BOTH"* (`§5.4`: the overwrite sentence's *"cascades to
// all downstream nodes"* reaches a same-tier replacement AND a purge, `P: §12 · A19`'s printed silence
// being read by `DD-6`'s reachability property, whose alternative — *"a purge that removes the version's
// anchor but leaves its downstream nodes unreachable"* — would mint unreachable nodes and fail `P-IM-3`).
// Re-derived at a NESTED address, where `§3.2` item 2's TIER-AGNOSTIC parent resolution reaches the parent
// and `§3.2` item 4's monotonic clause is live: the parent anchor stands at `file`, the child writes go
// `temp → mem → file` beneath it (`rank(child tier) ≤ 2` at every step), and the `file` write purges
// `rank ≤ 2` — the `mem` version AND its whole downstream subtree.
// Drives: §5.4's cascade, §5.5 P-IM-3 (reachability), §3.2 items 2 and 4
#[test]
fn s5_4_a_purged_version_s_downstream_goes_with_it() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["root"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    ok(
        store.write(AddressArg::List(key(&["root", "a"])), w_temp(), v_obj(&[])),
        "§3.4 W-4, rank(temp) ≤ rank(file)",
    );
    ok(
        store.write(
            AddressArg::List(key(&["root", "a", "b"])),
            w_temp(),
            v_obj(&[("c", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["root", "a"])), w_file(), v_obj(&[])),
        "§3.4 W-6: the purge",
    );
    let e = failure(
        store.read(
            AddressArg::List(key(&["root", "a", "b", "c"])),
            TierArg::Absent,
        ),
        "§5.4's cascade",
    );
    assert_code(&e, "AddressNotFound", "§5.4: the cascade reaches a purge");
    let deeper = failure(
        store.read(AddressArg::List(key(&["root", "a", "b"])), TierArg::Absent),
        "§5.4's cascade",
    );
    assert_code(
        &deeper,
        "AddressNotFound",
        "§5.5: no unreachable node is left behind by the purge",
    );
    assert_eq!(
        read_at(&store, &key(&["root", "a"])),
        v_obj(&[]),
        "§5.4: the new version stands alone"
    );
    assert_eq!(
        versions_at(&store, &key(&["root", "a"])),
        vec![Tier::File],
        "§3.4 W-6: rank ≤ 2 removed"
    );
    assert_eq!(
        read_tier(&store, &key(&["root"]), Tier::File),
        v_obj(&[("a", v_obj(&[]))]),
        "§5.4: the parent's own version survives, holding the newly minted child"
    );
}

// §5.1's lifetime clause, at the one point a single process can observe it — the boot: `mem` and `temp`
// begin empty while `file` is loaded (§7.2 item 6). Driven in `construction.rs`'s boot tests; the
// "lost on process exit" half has no in-process observable (reported at gate 3).
// Drives: §5.1, §7.2 item 6). Driven in
#[test]
fn s5_1_the_three_tokens_have_the_declared_lifetimes_over_a_single_process() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(1.0)),
        "§5.1: temp is UNAPPLIED/TRIAL data",
    );
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_num(2.0)),
        "§5.1: mem lives for the process's life",
    );
    ok(
        store.write(AddressArg::List(key(&["f"])), w_file(), v_num(3.0)),
        "§5.1: file is durable state",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_num(1.0),
        "§5.1: all three stand in one process"
    );
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v_num(2.0),
        "§5.1: all three stand in one process"
    );
    assert_eq!(
        read_at(&store, &key(&["f"])),
        v_num(3.0),
        "§5.1: all three stand in one process"
    );
}
