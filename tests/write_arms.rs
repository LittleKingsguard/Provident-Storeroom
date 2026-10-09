//! `tests/write_arms.rs` — contract `§3` (`write-and-read.md §3`): the write's signature and its REQUIRED
//! SINGULAR tier, the arity table, the two-stage resolution, the install stage, the closed arm table
//! (`W-1`…`W-6`, `F-1`…`F-6`), the post-conditions and the `WriteResult` return shape.
//!
//! States enumerated for this concern, each driven below: the tier argument's every arity-table cell for
//! `write`; each success arm `W-1`…`W-6`; each fail-closed arm `F-1`…`F-6`; the empty-address write; the
//! descendant anchors' tier; the pair-set change per arm; the journal's append and its `seq`.

mod support;
use support::*;

// §3.1.1 (the `write` row) + §3.4 F-1 — `tier` absent entirely: a required argument is missing, so the
// answer is AddressMalformed, and nothing is installed and no journal entry is appended.
// Drives: §3.1.1 (the, §3.4 F-1
#[test]
fn s3_1_1_a_write_with_an_absent_tier_fails_address_malformed() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), none(), v_num(1.0)),
        "§3.4 F-1",
    );
    assert_code(&e, "AddressMalformed", "§3.1.1: `write`, tier absent");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§3.4 F-1: nothing is installed"
    );
}

// §3.1.1 + §3.4 F-1 — an array of 0 tokens is not the write's arity: OutOfDomainTier.
#[test]
fn s3_1_1_a_write_with_an_array_of_zero_tokens_fails_out_of_domain_tier() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), set_empty(), v_num(1.0)),
        "§3.1.1",
    );
    assert_code(&e, "OutOfDomainTier", "§3.1.1: `write`, array of 0 tokens");
}

// §3.1.1 + §3.1 — "THE ARRAY FORM IS AVAILABLE ON READ AND NOT ON WRITE": an array of ONE token fails,
// because "exactly one" is read as exactly one token and the array spelling is a different arity.
// Drives: §3.1.1, §3.1
#[test]
fn s3_1_1_a_write_with_an_array_of_one_token_fails_out_of_domain_tier() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), set(&[Tier::Mem]), v_num(1.0)),
        "§3.1",
    );
    assert_code(
        &e,
        "OutOfDomainTier",
        "§3.1: even an array of length 1 fails on write",
    );
}

// §3.1.1 — an array of ≥ 2 tokens fails OutOfDomainTier.
#[test]
fn s3_1_1_a_write_with_an_array_of_two_tokens_fails_out_of_domain_tier() {
    let mut store = new_store();
    let e = failure(
        store.write(
            AddressArg::List(key(&["a"])),
            set(&[Tier::Mem, Tier::File]),
            v_num(1.0),
        ),
        "§3.1.1",
    );
    assert_code(
        &e,
        "OutOfDomainTier",
        "§3.1.1: `write`, array of ≥ 2 tokens",
    );
}

// §3.1.1 + §5.1 M-2 — a token outside `{file, mem, temp}` fails OutOfDomainTier (`secure`, `Secure`,
// `FILE`, `disk`, `session`, `""`).
// Drives: §3.1.1, §5.1 M-2
#[test]
fn s3_1_1_a_write_with_a_token_outside_the_domain_fails_out_of_domain_tier() {
    let mut store = new_store();
    for spelling in ["secure", "Secure", "FILE", "disk", "session", ""] {
        let e = failure(
            store.write(
                AddressArg::List(key(&["a"])),
                outside_token(spelling),
                v_num(1.0),
            ),
            "§3.1.1",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "§5.1 M-2: the domain is closed at three",
        );
    }
}

// PAR-3's declared answer — `null` and `undefined` as the write's tier: the shape is not a tier value at
// all, so AddressMalformed.
// Drives: § (no clause found)
#[test]
fn par_3_a_null_or_undefined_write_tier_fails_address_malformed() {
    let mut store = new_store();
    for arg in [TierArg::Null, TierArg::Undefined] {
        let e = failure(
            store.write(AddressArg::List(key(&["a"])), arg, v_num(1.0)),
            "PAR-3's declared answer",
        );
        assert_code(
            &e,
            "AddressMalformed",
            "PAR-3: null/undefined → AddressMalformed",
        );
    }
}

// PAR-3 · §3.1 + §0.4 — a non-string, non-array tier on write is a wrongly-typed value: OutOfDomainTier.
// `§0.4` declares the non-string tier's ONE Rust spelling as the unit variant `TierArg::NonString` (with
// `TierArg::Object` for an object), so this drive asserts the class's answer through that declared spelling.
// Drives: §3.1, §0.4
#[test]
fn par_3_a_non_string_write_tier_fails_out_of_domain_tier() {
    let mut store = new_store();
    for arg in [TierArg::NonString, TierArg::Object] {
        let e = failure(
            store.write(AddressArg::List(key(&["a"])), arg, v_num(1.0)),
            "§3.1: a non-string",
        );
        assert_code(
            &e,
            "OutOfDomainTier",
            "§3.1: an out-of-domain or wrongly-typed value",
        );
    }
}

// §3.4 W-3 — an unoccupied key with a LITERAL value mints a leaf and its child anchor at the write's tier.
#[test]
fn s3_4_w3_an_unoccupied_key_with_a_literal_mints_a_leaf_at_the_write_s_tier() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_str("v")),
        "§3.4 W-3",
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::Temp),
        v_str("v"),
        "§3.4 W-3: the anchor's tier"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Temp],
        "§3.4 W-3: one anchor, one version"
    );
    assert_eq!(
        anchor_tier(&store, &key(&["a"]), Tier::Temp),
        Tier::Temp,
        "§5.4 (a): the write's own tier"
    );
}

// §3.4 W-4 — an unoccupied key with an OBJECT mints a branch-tree recursively: every key that is a
// literal becomes a leaf and every object/array becomes a branch.
// Drives: §3.4 W-4
#[test]
fn s3_4_w4_an_unoccupied_key_with_an_object_mints_a_branch_tree_recursively() {
    let mut store = new_store();
    let value = v_obj(&[
        ("b", v_obj(&[("c", v_num(1.0))])),
        ("d", v_arr(vec![v_num(2.0), v_bool(true)])),
    ]);
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), value.clone()),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        value,
        "§3.3: the round trip over the whole tree"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "b", "c"])),
        v_num(1.0),
        "§3.4 W-4: a literal became a leaf"
    );
    assert_eq!(
        read_at(&store, &key(&["a", "d"])),
        v_arr(vec![v_num(2.0), v_bool(true)]),
        "§3.4 W-4: an array became a VEC branch"
    );
}

// §3.3 item 4 + §0.2 DD-10 — the write's tier lands on the new child anchor's tier property, and every
// other anchor the write mints (each descendant branch's anchor) carries the SAME tier.
// Drives: §3.3 item 4, §0.2 DD-10
#[test]
fn s3_3_every_anchor_the_write_mints_carries_the_write_s_tier() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_file(),
            v_obj(&[("b", v_obj(&[("c", v_num(1.0))]))]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        anchor_tier(&store, &key(&["a"]), Tier::File),
        Tier::File,
        "§0.2 DD-10"
    );
    // The nested keys are probed UNQUALIFIED (`§2.3`'s zero-tier arm): the write minted every descendant
    // anchor at its own tier, so the landing IS the anchor `§3.3` item 4 / `DD-10` requires — and a
    // tier-qualified probe at a deep address is the one a `L-TIER` step can refuse (`§2.2`, `§3.2`'s
    // closing clause).
    assert_eq!(
        landing_tier(&store, &key(&["a", "b"])),
        Tier::File,
        "§0.2 DD-10"
    );
    assert_eq!(
        landing_tier(&store, &key(&["a", "b", "c"])),
        Tier::File,
        "§3.3 item 4"
    );
}

// §3.4 W-1 + §0.2 DD-8/DD-11 — a write at the pair the SAME tier already occupies is the purge arm: the
// old anchor and its whole downstream subtree are removed and the new node is minted in their place.
// Drives: §3.4 W-1, §0.2 DD-8
#[test]
fn s3_4_w1_an_equal_tier_write_purges_the_pair_and_mints_in_its_place() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("new")),
        "§3.4 W-1",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("new"),
        "§3.4 W-1: the new node in the old pair"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§3.4 W-1: the version count does not grow"
    );
}

// §3.4 W-1 + §3.3 item 3 + §2.2 L-4 — the purge cascades: the removed version's whole downstream subtree
// goes with it, so the walk cannot reach it any more. **THE CODE IS THE WALK'S OWN ARM FOR THIS STATE:**
// the `W-1` re-mint replaces the branch at `["a"]` with the LITERAL `"fresh"`, so a read at `["a","b"]`
// descends through the register's anchor (`§2.2` `L-2`) and then holds a **`leaf` while a segment
// remains** — *"leaf nodes cannot have downstream anchors, thus the walk cannot continue and fails
// verbosely"* — which is `§2.2`'s **`L-4` `LeafHasNoDownstream`** and NOT `L-3`'s `AddressNotFound`
// (there IS no `b` container left to search: the branch that held `b` went with the purged version). The
// `W-6` sibling (`s3_4_w6_the_purged_version_s_downstream_goes_with_it`) drives the same intent with an
// OBJECT re-mint and therefore answers `L-3`, because an object re-mint leaves a `branch` behind — the
// two cells are one intent at the two container kinds the re-mint can leave at the key.
// Drives: §3.4 W-1, §3.3 item 3, §2.2 L-4
#[test]
fn s3_4_w1_the_removed_version_s_downstream_subtree_goes_with_it() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_obj(&[]))]),
        ),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_str("deep")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("fresh")),
        "§3.4 W-1",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("fresh"),
        "§3.4 W-1: the minted version stands at the pair, and it is a LEAF"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§3.4 W-1: the version count at the key does not grow"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§2.2 L-4",
    );
    assert_code(
        &e,
        "LeafHasNoDownstream",
        "§2.2 L-4: `i` advanced and the node now held is a leaf while `a.length - i > 0` — the branch \
         that held `b` went with the purged version",
    );
    // The removed child stood at the write's own tier; the walk stops at the leaf before any tier of the
    // removed version is consulted, so the cascade is observable at every tier argument and not only at
    // the unqualified one (§2.2's arm order: `L-2` descends, then `L-4` fires).
    let tiered = failure(
        store.read(AddressArg::List(key(&["a", "b"])), t(Tier::Mem)),
        "§2.2 L-4",
    );
    assert_code(
        &tiered,
        "LeafHasNoDownstream",
        "§3.3 item 3: no tier argument reaches a downstream node of the removed version",
    );
}

// §3.4 W-5 (P: §11 · A11) — a write at a LESS persistent tier with no anchor at its own tier is added
// ALONGSIDE the more persistent one, which SURVIVES, and the shadow wins the unqualified read.
// Drives: §3.4 W-5 (P, §11 · A11)
#[test]
fn s3_4_w5_a_less_persistent_write_is_added_alongside_and_shadows() {
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
        "§3.4 W-5: the shadow wins the unqualified read"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(1.0),
        "§3.4 W-5: the more persistent survives"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File, Tier::Mem],
        "§3.5 item 2: the pair set grew by one"
    );
}

// §3.4 W-6 (P: §12 · A19) + §3.2 item 4 — a write at a MORE persistent tier PURGES every version of the
// addressed node for which `rank(v) ≤ rank(write tier)`, and mints at its own tier. Driven where the arm's
// own clause is live: at a REGISTER key, which `§1.2`/`§1.6` exempt from the bound (the register has no
// parent anchor), and at a NESTED address, whose parent anchor `§3.2` item 2 reaches BY ADDRESS ALONE while
// `§3.2` item 4 evaluates the monotonic clause over the two anchors. The `(temp → file)` and `(mem → file)`
// pairs both SUCCEED under the amended rule, because the parent anchor is the `file` one and
// `rank(file) = 2` is not outranked.
// Drives: §3.4 W-6, §3.2 items 2 and 4, §5.4's purge chain
#[test]
fn s3_4_w6_a_more_persistent_write_purges_every_version_at_rank_le_its_own() {
    // The REGISTER key — no parent anchor, so no upper bound on the child's tier (`§1.2`, `§1.6`).
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(2.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::File],
        "§3.4 W-6: rank ≤ 2 is removed"
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§3.4 W-6",
    );
    assert_code(&e, "TierNotFound", "§3.4 W-6: the purged version is gone");

    // The NESTED address — the parent anchor at `file`, then temp → mem → file beneath the parent's key:
    // each more-persistent write purges the versions at `rank ≤ its own` and mints at its own tier.
    let mut nested = new_store();
    ok(
        nested.write(AddressArg::List(key(&["p"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    ok(
        nested.write(AddressArg::List(key(&["p", "a"])), w_temp(), v_num(1.0)),
        "§3.4 W-3: rank(temp) ≤ rank(file)",
    );
    // **THE PROBE IS THE UNQUALIFIED ONE, BECAUSE THE ADDRESS IS NESTED** (`§2.2` `L-TIER` + `§3.2` item 2):
    // the parent's landing anchor is the `file` one, and a tier-qualified walk at this address answers at
    // the tier a step's key holds — `landing_tier` is `§2.3`'s zero-tier arm, which is exactly the arm the
    // write's own parent search runs, so it names the anchor the write minted here.
    assert_eq!(
        landing_tier(&nested, &key(&["p", "a"])),
        Tier::Temp,
        "§3.4 W-3: one version at temp — the anchor the write minted, read unqualified"
    );
    assert_eq!(
        landing_tier(&nested, &key(&["p"])),
        Tier::File,
        "§3.4 W-3: the parent's own version set is unmoved — the unqualified walk still lands on the \
         `file` anchor the parent write minted"
    );
    ok(
        nested.write(AddressArg::List(key(&["p", "a"])), w_mem(), v_num(2.0)),
        "§3.4 W-6: mem over temp",
    );
    assert_eq!(
        landing_tier(&nested, &key(&["p", "a"])),
        Tier::Mem,
        "§3.4 W-6: rank ≤ 1 is removed — the unqualified walk's anchor is the `mem` one the write minted"
    );
    ok(
        nested.write(AddressArg::List(key(&["p", "a"])), w_file(), v_num(3.0)),
        "§3.4 W-6: file over mem",
    );
    assert_eq!(
        landing_tier(&nested, &key(&["p", "a"])),
        Tier::File,
        "§3.4 W-6: rank ≤ 2 is removed — the unqualified walk's anchor is the `file` one the write minted"
    );
    assert_eq!(
        read_tier(&nested, &key(&["p", "a"]), Tier::File),
        v_num(3.0),
        "§5.4 (a): the minted version"
    );
    let gone = failure(
        nested.read(AddressArg::List(key(&["p", "a"])), t(Tier::Mem)),
        "§3.4 W-6",
    );
    assert_code(&gone, "TierNotFound", "§3.4 W-6: the mem version is gone");
    assert_eq!(
        read_tier(&nested, &key(&["p"]), Tier::File),
        v_obj(&[("a", v_num(3.0))]),
        "§5.4: purge's scope is the addressed node's own versions, not its parent's"
    );
}

// §5.4's cascade (declared default) via `W-6` — a purged version's downstream nodes go with it.
#[test]
fn s3_4_w6_the_purged_version_s_downstream_goes_with_it() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_obj(&[])),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_temp(), v_str("deep")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_obj(&[])),
        "§3.4 W-6",
    );
    let e = failure(
        store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent),
        "§5.4's cascade",
    );
    assert_code(
        &e,
        "AddressNotFound",
        "§5.4: a purged version's downstream nodes go with it",
    );
}

// §5.4's scope clause — purge's scope is THE ADDRESSED NODE'S OWN VERSIONS and not the store: a purge at
// one key leaves a sibling key's versions untouched.
// Drives: §5.4
#[test]
fn s5_4_purge_s_scope_is_the_addressed_node_s_own_versions() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["x"])), w_file(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_temp(), v_num(2.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_num(3.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        read_tier(&store, &key(&["x"]), Tier::File),
        v_num(1.0),
        "§5.4: not the store"
    );
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_num(3.0),
        "§3.4 W-6: the addressed node"
    );
}

// §3.4 W-2 — the re-mint arm: the target resolves to a leaf and the value is structured; a new anchor is
// placed on the SAME link.
// Drives: §3.4 W-2
#[test]
fn s3_4_w2_a_structured_write_over_a_leaf_re_mints_on_the_same_link() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 W-2",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_arr(vec![v_num(1.0)]),
        "§3.4 W-2: the same link, a new anchor"
    );
    assert_eq!(
        versions_at(&store, &key(&["a"])),
        vec![Tier::Mem],
        "§3.4 W-2: the leaf's anchor is destroyed"
    );
}

// §3.4 F-2 + §1.4 — the value is outside the admitted set: nothing is installed.
#[test]
fn s3_4_f2_a_value_outside_the_taxonomy_fails_value_not_admitted() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_null()),
        "§3.4 F-2",
    );
    assert_code(&e, "ValueNotAdmitted", "§3.4 F-2");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§3.4 F-2: nothing is installed"
    );
}

// §3.4 F-3 + §0.2 DD-5 — the target's parent resolution fails: the write fails with the walk's own code,
// and nothing is installed including below the failing segment.
// Drives: §3.4 F-3, §0.2 DD-5
#[test]
fn s3_4_f3_a_write_whose_parent_does_not_resolve_fails_with_the_walk_s_code() {
    let mut store = new_store();
    let e = failure(
        store.write(
            AddressArg::List(key(&["missing", "k"])),
            w_mem(),
            v_num(1.0),
        ),
        "§3.4 F-3",
    );
    assert_code(&e, "AddressNotFound", "§2.2 L-3 through §3.4 F-3");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§0.2 DD-5: nothing below the failing segment"
    );
}

// §3.2 item 2 + §3.2 item 4 + §3.4 F-3 — THE PARENT RESOLUTION IS TIER-AGNOSTIC: `findAddress(parent)`
// runs with NO TIER ARGUMENT (the walk's zero-tier, LOWEST-PERSISTENCE arm of §2.3), so a parent that
// stands at ANY tier is found BY ADDRESS ALONE and the write's parent stage never answers `TierNotFound` —
// §3.4 F-3's own parenthetical says `L-TIER`'s code is reached "only where a passed tier qualifies the
// walk, which the write's parent stage does NOT do". The `(file parent, mem write)` pair this cell used to
// expect to fail is §5.6's SUCCEEDING half: rank(write tier) = rank(mem) = 1 ≤ rank(parent anchor's tier)
// = rank(file) = 2, so the clause holds and the write installs at its own tier.
// Drives: §3.2 item 2, §3.2 item 4, §3.4 F-3
#[test]
fn s3_4_f3_a_write_whose_parent_stands_at_another_tier_resolves_the_parent_by_address_alone() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.2 item 2",
    );
    assert_eq!(
        w.op.tier,
        Some(Tier::Mem),
        "§6.2: the write's single tier is the op's tier"
    );
    assert_eq!(
        landing_tier(&store, &key(&["a", "b"])),
        Tier::Mem,
        "§5.4 (a): the landing, read unqualified (§2.3's zero-tier arm)"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_num(1.0))]),
        "§3.2 item 2: the resolved parent anchor is the file one — the tier is not a search qualifier, and \
         the child was installed INTO it (an UNQUALIFIED read: §2.3's zero-tier arm lands on the parent's \
         lowest-persistence anchor, which is the `file` one)"
    );
    // THE PARENT'S OWN VERSION SET IS PROBED UNQUALIFIED (`§2.3`'s zero-tier arm), because a
    // TIER-QUALIFIED read at the parent's address applies the passed set to its DESCENDANTS at the ASSEMBLY
    // as well (`§4.2` `R-4`; `§4.2`'s RECONCILED block, `DD-31` (b)) — and the child this write installed
    // stands at `mem`, so `read(['a'], t(File))` answers the assembled object with THAT member OMITTED, the
    // child contributing NO member and NO code. The two observables below are the parent key's own anchor
    // set: the unqualified walk's landing is still the `file` anchor, and the unqualified read still
    // assembles the one child under it.
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::File,
        "§3.2 item 2/§2.3: the parent key's own version set is unmoved — the unqualified walk still lands \
         on the `file` anchor the write resolved"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_num(1.0))]),
        "§3.2 item 2: the parent's subtree holds exactly the child this write installed"
    );
    // §3.2's closing paragraph, driven so the code's reachability is not lost with the parent stage's:
    // "`TierNotFound` remains reachable through every tier-qualified caller and through `L-TIER`'s own arm,
    // and the write's parent stage is the one stage that no longer reaches it."
    let e = failure(
        store.read(AddressArg::List(key(&["a"])), t(Tier::Temp)),
        "§2.2 L-TIER",
    );
    assert_code(
        &e,
        "TierNotFound",
        "§3.2: a TIER-QUALIFIED walk still answers L-TIER's own code",
    );
    // AND THE PER-STEP RULE OVER THE NESTED ADDRESS ITSELF (§2.2 `L-TIER` + §2.3 + §3.2's closing clause):
    // a tier-qualified walk answers `L-TIER`'s `TierNotFound` at EVERY step whose key holds an anchor but
    // no passed tier — and the write's own parent search is the ONE stage that is tier-agnostic (§3.2 item
    // 2, `DD-27`), so no anchor outside the passed set answers in its place.
    assert_tier_not_found(
        &store,
        &key(&["a", "b"]),
        Tier::Temp,
        "§2.2 L-TIER at the walk's FIRST step: `a` holds a `file` anchor and no passed tier matches it, \
         so the walk never reaches `b`'s step",
    );
    assert_tier_not_found(
        &store,
        &key(&["a", "b"]),
        Tier::File,
        "§2.2 L-TIER at the ADDRESSED step: the walk descends through the `file` parent (that step's key \
         and tier match), reaches `b`'s step, and there the key exists while its anchor is `mem`",
    );
}

// §3.4 F-4 + §0.2 DD-19 — the container kind contradicts the value's kind: nothing is installed and the
// container, the node and the journal are untouched.
// Drives: §3.4 F-4, §0.2 DD-19
#[test]
fn s3_4_f4_a_kind_contradicting_write_fails_container_kind_conflict_and_appends_no_entry() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    let first = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let e = failure(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_arr(vec![])),
        "§3.4 F-4",
    );
    assert_code(&e, "ContainerKindConflict", "§3.4 F-4");
    let after = ok(
        store.write(AddressArg::List(key(&["c"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        after.op.seq,
        first.op.seq + 1,
        "§0.2 DD-19: no journal entry is appended for a failed write"
    );
}

// §3.4 F-5 + §3.2 item 5 — the resolved PARENT is a leaf, WHATEVER THE VALUE IS: a leaf holds a value and
// not a link, so no child anchor can be installed there. This is F-5's structured-value half; the literal
// half stands in the drive below, and the two together are why §3.4's table is TOTAL.
// Drives: §3.4 F-5, §3.2 item 5
#[test]
fn s3_4_f5_a_structured_write_whose_parent_is_a_leaf_fails_write_parent_not_link() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let e = failure(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_obj(&[])),
        "§3.4 F-5",
    );
    assert_code(
        &e,
        "WriteParentNotLink",
        "§3.4 F-5: the parent cannot hold children",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("v"),
        "§3.4 F-5: nothing is installed"
    );
}

// §3.2 item 6 + §8.1 #9 — a write whose target IS the empty address resolves the address one level lower,
// and there is no level lower than the register: it has no `key` to install under, so it fails
// WriteParentNotLink (the register is a link and can hold children).
// Drives: §3.2 item 6, §8.1 #9
#[test]
fn s3_2_a_write_at_the_empty_address_fails_write_parent_not_link() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(empty_address()), w_mem(), v_num(1.0)),
        "§3.2 item 6",
    );
    assert_code(&e, "WriteParentNotLink", "§8.1 #9: no key to install under");
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "§3.2 item 6: nothing is installed"
    );
}

// §3.4 F-5 + §3.2 item 5 + §8.1 #9 — the leaf-parent state is `WriteParentNotLink` for ANY value class
// (the second bounded amendment's extension of F-5's pre-state), so a LITERAL write whose resolved parent
// is a leaf is F-5 and NOT armless: §3.4's table is TOTAL over every write in its arguments' declared
// domains, and this pair with the drive above covers both value classes of the arm.
// Drives: §3.4 F-5, §3.2 item 5, §8.1 #9
#[test]
fn s3_2_a_literal_write_whose_parent_is_a_leaf_fails_write_parent_not_link() {
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_str("v")),
        "§3.4 W-3",
    );
    let e = failure(
        store.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_num(1.0)),
        "§3.4 F-5",
    );
    assert_code(
        &e,
        "WriteParentNotLink",
        "§8.1 #9: the leaf-parent state, whatever the value's class",
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_str("v"),
        "§3.4 F-5: nothing is installed"
    );
}

// §3.4 F-6 + §3.2 items 2 and 4 + §1.2 + §8.1 #6 — THE MONOTONIC CLAUSE IS EVALUATED OVER THE TWO ANCHORS
// `§3.2` NAMES: the parent anchor the TIER-AGNOSTIC parent resolution reached, and the child anchor the
// write mints at its own tier. A write at tier `t` therefore SUCCEEDS at a nested address exactly when
// `rank(t) ≤ rank(parent anchor's tier)` — so this cell's `(file parent, temp write)` pair, which the
// pre-amendment reading expected to fail the walk's `TierNotFound`, now SUCCEEDS — and it FAILS
// `ParentAnchorMonotonicityViolation` iff `rank(t) > rank(parent anchor's tier)`, installing nothing and
// appending nothing.
// Drives: §3.4 F-6, §3.2 item 4, §8.1 #6, §5.6, §2.2 L-TIER (the WALK's half), §4.2 `R-2`/`R-4` at the
// ASSEMBLY (the omission half — `§4.2`'s RECONCILED block, priced at `§0.2 · DD-31`)
#[test]
fn s3_4_f6_the_clause_holds_at_rank_child_le_parent_and_fails_the_inverted_pair() {
    // The clause HOLDS on the pair the tier-agnostic resolution makes reachable: parent `file` (rank 2),
    // child `temp` (rank 0) — §5.6's `6` succeeding ordered pairs.
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["a"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    ok(
        store.write(AddressArg::List(key(&["a", "b"])), w_temp(), v_num(1.0)),
        "§5.6: rank(child) ≤ rank(parent)",
    );
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::File,
        "§2.3's zero-tier arm: the parent's landing anchor is the `file` one — the tier the write's own \
         parent search reached by ADDRESS ALONE (§3.2 item 2)"
    );
    assert_eq!(
        landing_tier(&store, &key(&["a", "b"])),
        Tier::Temp,
        "§5.4 (a): the child's landing — the anchor the write minted at its own tier, read unqualified \
         (§2.3's zero-tier arm, the arm `§3.2` item 2's parent search runs)"
    );
    assert_eq!(
        landing_tier(&store, &key(&["a"])),
        Tier::File,
        "§5.6: the parent anchor SURVIVES the child's less-persistent write — the unqualified walk still \
         lands on it (a tier-qualified read at the parent's address would assemble the `temp` child under \
         the `file` selection, so it is the UNQUALIFIED probe that observes the parent's own anchor)"
    );
    assert_eq!(
        read_at(&store, &key(&["a"])),
        v_obj(&[("b", v_num(1.0))]),
        "§3.3: the child stands below the parent anchor — the UNQUALIFIED read assembles it (`§2.3`'s \
         zero-tier arm; the write installed it INTO the `file` parent)"
    );
    // AND THE PASSED SET'S OWN SCOPE — **AND HERE THE WALK'S HALF AND THE READ'S HALF ARE ASSERTED AS THE
    // TWO DIFFERENT ANSWERS THE CONTRACT NOW GIVES THEM, because this is exactly the state that tells them
    // apart.** `§2.2`'s scope clause and `§2.3` fix the WALK per step: the step at `a`'s OWN key runs
    // `§2.3`'s selection over the PASSED SUBSET, the `file` anchor IS a member of it, so the walk RESOLVES
    // and `L-TIER`'s `TierNotFound` is NOT answered here (the walk still answers that code wherever a
    // step's key holds an anchor at no passed tier — `H-1`'s half, driven below at the inverted pair).
    // `§4.2`'s assembly clause (its AS-FILED closing sentence, *"where a descendant key holds an anchor but
    // NO passed tier matches it, the read answers `L-TIER`'s `TierNotFound` for that step and assembles
    // NOTHING for it"*) is WITHDRAWN BY NAME at `§4.2`'s RECONCILED block, restated at `write-and-read.md
    // §4.2` and priced at `§0.2 · DD-31`, and `§4.1`'s reconciliation states what it is replaced by: **the
    // read OMITS that member and SUCCEEDS, "because the set selects which version each address answers and
    // never whether the read answers", the omission producing NO code at all.** So the `temp` child `b` is
    // no member of a `file`-only request, and the read at the parent's address answers the assembled object
    // with `b` OMITTED — the empty object, `DD-1`'s own form, where nothing is left to assemble.
    assert_eq!(
        read_tier(&store, &key(&["a"]), Tier::File),
        v_obj(&[]),
        "§4.2 `R-2`/`R-4` + `DD-31` (b) at the parent's address: the step at the ADDRESSED key applies the \
         passed set as `§2.3` applies it — the `file` anchor is the lowest-persistence member OF THE PASSED \
         SET, so the walk resolves — and the `temp` child, whose anchors lie at no passed tier, CONTRIBUTES \
         NO MEMBER (`L-3`'s `L-TIER` is NOT answered for it and NO code is produced, §4.1's reconciliation); \
         nothing is left to assemble, so the answer is `DD-1`'s empty object"
    );
    assert!(
        tiers_answering_at(&store, &key(&["a"])).contains(&Tier::File),
        "§2.2's scope clause + §2.3 + §4.2's omitted-member rule: the passed `file` set ANSWERS at the \
         parent's own address — the walk's step at `a` resolves at `file`, and the read's answer is a value \
         and not `L-TIER`'s code (the tiers that answer are {:?})",
        tiers_answering_at(&store, &key(&["a"]))
    );

    // An EQUAL pair holds too (`rank(child) = rank(parent) = 1`).
    ok(
        store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[])),
        "§3.4 W-4 at the parent tier",
    );
    ok(
        store.write(AddressArg::List(key(&["m", "c"])), w_mem(), v_num(2.0)),
        "§5.6: the equal pair",
    );
    assert_eq!(
        landing_tier(&store, &key(&["m"])),
        Tier::Mem,
        "§2.3: the equal pair's parent lands at `mem`"
    );
    assert_eq!(
        landing_tier(&store, &key(&["m", "c"])),
        Tier::Mem,
        "§5.4 (a): the equal pair's child landed at the write's own tier"
    );
    assert_eq!(
        read_at(&store, &key(&["m"])),
        v_obj(&[("c", v_num(2.0))]),
        "§3.3: the child stands under the equal-tier parent"
    );

    // The clause FAILS on the INVERTED pair: parent anchor at `temp` (rank 0), write at `file` (rank 2).
    let mut inverted = new_store();
    let anchor_op = ok(
        inverted.write(AddressArg::List(key(&["p"])), w_temp(), v_obj(&[])),
        "§3.4 W-4 at temp",
    );
    let e = failure(
        inverted.write(AddressArg::List(key(&["p", "c"])), w_file(), v_num(1.0)),
        "§3.4 F-6",
    );
    assert_code(
        &e,
        "ParentAnchorMonotonicityViolation",
        "§1.2: rank(child) > rank(parent)",
    );
    assert_eq!(
        landing_tier(&inverted, &key(&["p"])),
        Tier::Temp,
        "§2.3: the parent's landing anchor is the `temp` one the write's parent search reached"
    );
    // §2.2 `L-TIER` + §2.3 + §3.2's closing clause, at the nested address: a tier-qualified walk at the
    // CHILD's address passes through the parent's step first, where the anchor stands at `temp` — so a walk
    // passed any other tier answers `TierNotFound` AT THAT STEP. **THIS IS THE `H-1` HALF AND IT STANDS:**
    // `§4.2`'s RECONCILED block withdraws only the assembly's `TierNotFound`-for-a-descendant reading and
    // leaves `TierNotFound` at a WALK step in the read's failure set — and here the walk never reaches the
    // assembly at all, so the omitted-member rule (`DD-31` (b)) has nothing to act on.
    assert_tier_not_found(
        &inverted,
        &key(&["p", "c"]),
        Tier::File,
        "§2.2 L-TIER at the parent's step",
    );
    let e2 = failure(
        inverted.read(AddressArg::List(key(&["p", "c"])), TierArg::Absent),
        "§3.4 F-6",
    );
    assert_code(&e2, "AddressNotFound", "§3.4 F-6: nothing is installed");
    let next = ok(
        inverted.write(AddressArg::List(key(&["q"])), w_temp(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        next.op.seq,
        anchor_op.op.seq + 1,
        "§3.4 F-6: no journal entry is appended"
    );
}

// §3.5's fail-closed residue, driven over every reachable fail arm at once: the store's observable state
// after a failed write is byte-identical to its state before it, and no journal entry is appended.
// Drives: §3.5
#[test]
fn s3_5_every_failed_write_leaves_the_observable_state_identical() {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    let anchor_op = ok(
        store.write(AddressArg::List(key(&["z"])), w_mem(), v_num(9.0)),
        "§3.4 W-3",
    );
    let before = read_at(&store, &empty_address());
    let failures = vec![
        store.write(AddressArg::List(key(&["a"])), none(), v_num(2.0)),
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_null()),
        store.write(AddressArg::List(key(&["nope", "k"])), w_mem(), v_num(2.0)),
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_arr(vec![v_num(2.0)]),
        ),
        store.write(AddressArg::List(key(&["a", "b", "c"])), w_mem(), v_obj(&[])),
        store.write(AddressArg::List(empty_address()), w_mem(), v_num(2.0)),
    ];
    for (i, r) in failures.into_iter().enumerate() {
        assert!(r.is_err(), "§3.4 F-1…F-6: failure {i} must fail");
    }
    assert_eq!(
        read_at(&store, &empty_address()),
        before,
        "§3.5: byte-identical after a failed write"
    );
    let next = ok(
        store.write(AddressArg::List(key(&["y"])), w_mem(), v_num(3.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        next.op.seq,
        anchor_op.op.seq + 1,
        "§3.5: NO JOURNAL ENTRY WAS APPENDED for a failed write"
    );
}

// §3.6 — **⟶ CORRECTED 2026-10-11 (`CF-3`): `WriteResult` is a record with THREE members, not two** — `op`
// ALWAYS present on success, `watched` ALWAYS an array (possibly empty), and the listener amendment's added
// `triggered`, ALWAYS an array of the triggered listeners' handles (possibly empty) — the row carries three
// because a trigger's answer is a handle set (`DD-35`; `contract.md §0.4`'s amended `WriteResult` row;
// `write-and-read.md §6.5` item 11).
// Drives: §3.6, §6.5 item 11, DD-35
#[test]
fn s3_6_a_successful_write_returns_an_op_and_a_watched_array() {
    let mut store = new_store();
    let r: WriteResult = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.6",
    );
    assert!(
        !r.op.opId.is_empty(),
        "§6.2: a non-empty, store-unique string token"
    );
    assert!(
        r.watched.is_empty(),
        "§3.6: `[]` when nothing is watched in the write's scope"
    );
}

// §3.3 item 5 + §6.2 — the write's journal entry is appended and its `seq` is the append ordinal,
// strictly increasing from 1.
// Drives: §3.3 item 5, §6.2
#[test]
fn s3_3_the_write_appends_a_journal_entry_with_a_strictly_increasing_seq() {
    let mut store = new_store();
    let first = ok(
        store.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    let second = ok(
        store.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)),
        "§3.4 W-3",
    );
    assert_eq!(first.op.seq, 1, "§6.2: strictly increasing from 1");
    assert_eq!(second.op.seq, 2, "§6.2: the next append ordinal");
    assert_ne!(
        first.op.opId, second.op.opId,
        "§6.2: unique within the instance"
    );
}

// §3.4's census — THE TABLE IS TOTAL: "`F-1`…`F-6` ARE EXHAUSTIVE OVER THE FAIL-CLOSED STATES: there is no
// `F-7`, and the table below is TOTAL over every write whose `address`, `tier` and `value` are each in its
// declared domain." This drive reaches ALL `12` rows: one drive per arm, asserting the arm's own stated
// effect (the `6` success arms) or its own code (the `6` fail-closed arms) — including the `W-2`/`W-5`
// TARGET-leaf arms, `F-5`'s ANY-value-class leaf-parent arm, `F-6`'s inverted pair, and `§3.4`'s
// designated `W-1`+`W-6` overlap (which IS `W-6`).
// Drives: §3.4 (the whole table), §3.4's designation clause
#[test]
fn s3_4_the_arm_table_s_twelve_rows_are_each_reachable() {
    // --- the `6` success arms -----------------------------------------------------------------------
    let mut store = new_store();

    // W-3: the parent (the register) holds no anchor at the key, and the value is a literal.
    ok(
        store.write(AddressArg::List(key(&["w3"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    assert_eq!(
        versions_at(&store, &key(&["w3"])),
        vec![Tier::Mem],
        "§3.4 W-3: a leaf minted at the write's tier"
    );

    // W-4: no anchor at the key, an object value, an empty container — mint the branch-tree recursively.
    ok(
        store.write(
            AddressArg::List(key(&["w4"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    assert_eq!(
        read_at(&store, &key(&["w4", "b"])),
        v_num(1.0),
        "§3.4 W-4: the tree was minted recursively"
    );

    // W-1: an anchor at the key at the write's OWN tier, and none at a less persistent tier — purge the
    // pair, then mint; the version count at that key does not grow.
    ok(
        store.write(AddressArg::List(key(&["w1"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["w1"])), w_mem(), v_num(2.0)),
        "§3.4 W-1",
    );
    assert_eq!(
        versions_at(&store, &key(&["w1"])),
        vec![Tier::Mem],
        "§3.4 W-1: the pair count does not grow"
    );
    assert_eq!(
        read_at(&store, &key(&["w1"])),
        v_num(2.0),
        "§3.4 W-1: the new node in the old pair"
    );

    // W-2: the TARGET (`parent ++ [key]`) resolves to a leaf whose anchor's tier IS the write's own tier,
    // and the value is structured — DESTROY the leaf's pointing anchor, place a new anchor on the SAME link.
    ok(
        store.write(AddressArg::List(key(&["w2"])), w_mem(), v_str("leaf")),
        "§3.4 W-3",
    );
    ok(
        store.write(
            AddressArg::List(key(&["w2"])),
            w_mem(),
            v_arr(vec![v_num(1.0)]),
        ),
        "§3.4 W-2",
    );
    assert_eq!(
        read_at(&store, &key(&["w2"])),
        v_arr(vec![v_num(1.0)]),
        "§3.4 W-2: the same link, a new anchor"
    );
    assert_eq!(
        versions_at(&store, &key(&["w2"])),
        vec![Tier::Mem],
        "§3.4 W-2: one pair, one anchor"
    );

    // W-5: an anchor at the key at a tier MORE persistent than the write's, and none at the write's tier —
    // the new version is ADDED ALONGSIDE and the more persistent one SURVIVES.
    ok(
        store.write(AddressArg::List(key(&["w5"])), w_file(), v_str("durable")),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["w5"])), w_mem(), v_str("trial")),
        "§3.4 W-5",
    );
    assert_eq!(
        versions_at(&store, &key(&["w5"])),
        vec![Tier::File, Tier::Mem],
        "§3.4 W-5: added alongside"
    );
    assert_eq!(
        read_at(&store, &key(&["w5"])),
        v_str("trial"),
        "§3.4 W-5: the shadow wins the unqualified read"
    );
    assert_eq!(
        read_tier(&store, &key(&["w5"]), Tier::File),
        v_str("durable"),
        "§3.4 W-5: the survivor"
    );

    // W-6: an anchor at the key at a tier LESS persistent than the write's — purge every version at
    // `rank ≤ rank(write tier)`, then mint.
    ok(
        store.write(AddressArg::List(key(&["w6"])), w_temp(), v_num(5.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["w6"])), w_file(), v_num(6.0)),
        "§3.4 W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["w6"])),
        vec![Tier::File],
        "§3.4 W-6: the lower versions are gone"
    );

    // W-6 BY DESIGNATION — the ONE pre-state where two success arms' conditions hold at once: the key holds
    // a version at the write's own tier (`mem`) AND one at a LESS persistent tier (`temp`), so both `W-1`'s
    // and `W-6`'s pre-states hold; `§3.4` designates `W-6`, whose purge subsumes `W-1`'s replacement.
    ok(
        store.write(AddressArg::List(key(&["w6d"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    ok(
        store.write(AddressArg::List(key(&["w6d"])), w_temp(), v_num(2.0)),
        "§3.4 W-5: the less persistent version",
    );
    assert_eq!(
        versions_at(&store, &key(&["w6d"])),
        vec![Tier::Mem, Tier::Temp],
        "§3.4: both pre-states now hold"
    );
    ok(
        store.write(AddressArg::List(key(&["w6d"])), w_mem(), v_num(3.0)),
        "§3.4's designation: the arm is W-6",
    );
    assert_eq!(
        versions_at(&store, &key(&["w6d"])),
        vec![Tier::Mem],
        "§3.4: `rank ≤ 1` removed, W-1 subsumed"
    );
    assert_eq!(
        read_at(&store, &key(&["w6d"])),
        v_num(3.0),
        "§3.4: the designated arm's single-valued effect"
    );

    // --- the `6` fail-closed arms, each installing nothing -------------------------------------------
    let mut fails = new_store();
    let before = read_at(&fails, &empty_address());
    let f1 = failure(
        fails.write(AddressArg::List(key(&["f1"])), none(), v_num(1.0)),
        "§3.4 F-1",
    );
    assert_code(&f1, "AddressMalformed", "§3.4 F-1: the tier is ABSENT");
    let f2 = failure(
        fails.write(AddressArg::List(key(&["f2"])), w_mem(), v_null()),
        "§3.4 F-2",
    );
    assert_code(
        &f2,
        "ValueNotAdmitted",
        "§3.4 F-2: the value is outside §1.4's admitted set",
    );
    assert_eq!(
        read_at(&fails, &empty_address()),
        before,
        "§3.5: `F-1`/`F-2` install nothing"
    );
    let f3 = failure(
        fails.write(AddressArg::List(key(&["nope", "k"])), w_mem(), v_num(1.0)),
        "§3.4 F-3",
    );
    assert_code(
        &f3,
        "AddressNotFound",
        "§3.4 F-3: the parent resolution fails with the walk's own code",
    );
    ok(
        fails.write(AddressArg::List(key(&["w4"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: a MAP container",
    );
    let f4 = failure(
        fails.write(AddressArg::List(key(&["w4"])), w_mem(), v_arr(vec![])),
        "§3.4 F-4",
    );
    assert_code(
        &f4,
        "ContainerKindConflict",
        "§3.4 F-4: the value's kind contradicts the container's",
    );
    ok(
        fails.write(
            AddressArg::List(key(&["f5"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4",
    );
    let f5_structured = failure(
        fails.write(
            AddressArg::List(key(&["f5", "b", "c"])),
            w_mem(),
            v_obj(&[]),
        ),
        "§3.4 F-5",
    );
    assert_code(
        &f5_structured,
        "WriteParentNotLink",
        "§3.4 F-5: the resolved PARENT is a leaf (structured)",
    );
    let f5_literal = failure(
        fails.write(
            AddressArg::List(key(&["f5", "b", "c"])),
            w_mem(),
            v_num(1.0),
        ),
        "§3.4 F-5",
    );
    assert_code(
        &f5_literal,
        "WriteParentNotLink",
        "§3.4 F-5: the SAME arm for a LITERAL value — the table is total",
    );
    ok(
        fails.write(AddressArg::List(key(&["f6"])), w_temp(), v_obj(&[])),
        "§3.4 W-4 at temp",
    );
    let f6 = failure(
        fails.write(AddressArg::List(key(&["f6", "b"])), w_file(), v_num(1.0)),
        "§3.4 F-6",
    );
    assert_code(
        &f6,
        "ParentAnchorMonotonicityViolation",
        "§3.4 F-6: rank(child) > rank(parent anchor's tier)",
    );
}
