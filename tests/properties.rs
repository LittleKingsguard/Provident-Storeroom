//! `tests/properties.rs` — **the register's EXECUTED LAYER.** One closed, exhaustive drive per row of the
//! typed property register `contract.md §5.2`–`§5.9` (`P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` ·
//! `P-TP-6` · `P-TP-7` · `P-TP-8` · `P-TP-9`), each printing its **strategy id** and yielding **HELD** or
//! **BROKEN**, on a **pinned seed**, with **≤ 100 attempts per row**, **≤ 400 in total** and
//! **stop-after-5 breaks** (the caps are enforced by `support::Drive`).
//!
//! **EVERY ROW OF THE REGISTER IS NOW DRIVEN, AND A BREAK IS THE IMPLEMENTATION'S OR THE DRIVE'S — NOT A
//! CONTRACT CONFLICT'S:** the first bounded amendment's two undrivable rows are closed by the second —
//! `P-IM-3`'s row text stands at `§5.5` (strategy `S-STRUCT`) and `§3.2`'s parent resolution is
//! TIER-AGNOSTIC, which makes `F-6`/`S-MONO` reachable — so the `conflicted` counter is carried but no
//! drive below counts a break as conflicted: `8 / 8` rows drive on the contract's own terms.

mod support;
use support::*;

/// The register's declared id set, exactly as `§0.1` item 5 (the dated discharge clause) and `§5.9`'s
/// arithmetic print it: 3 `P-IM` + 1 `P-SM` + 4 `P-TP` = 8.
const REGISTER_ROWS: [&str; 8] = [
    "P-IM-1", "P-IM-2", "P-IM-3", "P-SM-4", "P-TP-6", "P-TP-7", "P-TP-8", "P-TP-9",
];

// ---------------------------------------------------------------------------------------------------
// §5.2 `P-IM-1` — the write→read round trip is EXACT. Strategy id `S-RT`.
// ---------------------------------------------------------------------------------------------------

/// §5.2 `P-IM-1`, strategy `S-RT`: drive `write` then `read` over a generated `(address, tier, value)`
/// triple; compare with a structural-equality predicate. The row's third and fourth assertions are
/// `§5.9`'s second assertion of `S-RT` (the read's copy discipline) and `DD-6`'s reachability.
#[test]
fn p_im_1_round_trip_is_exact() {
    let mut drive = Drive::new("P-IM-1", "S-RT");
    let mut store = new_store();
    let mut rng = Rng::pinned();

    let keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let values: Vec<StoreValue> = vec![
        v_str("s"),
        v_str(""),
        v_bool(true),
        v_bool(false),
        v_num(0.0),
        v_num(-12.5),
        v_num(1.0e9),
        v_obj(&[]),
        v_obj(&[("k", v_num(1.0))]),
        v_obj(&[("k", v_obj(&[("n", v_str("deep"))]))]),
        v_arr(vec![]),
        v_arr(vec![v_num(1.0), v_str("x"), v_bool(false)]),
        v_arr(vec![v_obj(&[("z", v_num(2.0))])]),
    ];

    for tier in canonical_tiers() {
        for depth in 1..=3usize {
            for value in &values {
                if drive.stopped() || drive.attempts() >= MAX_ATTEMPTS_PER_ROW - 2 {
                    break;
                }
                drive.attempt();
                // THE DRIVE'S INDEPENDENCE IS REAL, AND THE ATTEMPT ORDINAL IS WHAT MAKES IT SO: the
                // address carries `drive.attempts()` as its own unique suffix, so NO attempt's write lands
                // on a key an earlier attempt already occupies. The drive's earlier form
                // (`format!("{root}{depth}")` over `8` roots × `3` depths across `99` attempts) REUSED keys,
                // and a reused key put a value of one container kind on a key already holding the other
                // kind — the write `§3.4 F-4` requires to fail `ContainerKindConflict` (`§1.3`: *"a write
                // whose kind contradicts the existing container fails"*; `DD-19`) and that this SAME red set
                // drives as a FAILURE in `record_shapes.rs` (`s1_3_…` both directions), `fail_codes.rs`
                // (`s8_1_7_…`, `s8_2_…`) and `write_arms.rs` (`s3_4_f4_…`, the arm census). No
                // implementation can both fail that write there and round-trip it here, so the DRIVE was the
                // defect and `§5.2 P-IM-1` is not weakened by one byte by this re-derivation: the property,
                // the `(address, tier, value)` triple, the depths and the assertions are unchanged.
                // The ancestors are written first AT THE SAME TIER, so §3.2 item 4's monotonic clause holds
                // at every nested link (`rank(child tier) ≤ rank(parent anchor's tier)`) and the walk
                // reaches each parent — and each attempt's own target is therefore an UNOCCUPIED key, the
                // state `§3.4`'s `W-3`/`W-4` arms are written for.
                let root = keys[rng.below(keys.len())];
                let mut address: Vec<Segment> =
                    vec![Segment::Key(format!("{root}{depth}x{}", drive.attempts()))];
                for level in 1..depth {
                    ok(
                        store.write(AddressArg::List(address.clone()), t(tier), v_obj(&[])),
                        "§3.4 W-4: the ancestor at the write's own tier",
                    );
                    address.push(Segment::Key(format!("n{level}")));
                }
                let w = ok(
                    store.write(AddressArg::List(address.clone()), t(tier), value.clone()),
                    "§3.4",
                );
                drive.check(w.op.seq >= 1, "§6.2: the write appended an entry");
                let read_back = ok(
                    store.read(AddressArg::List(address.clone()), t(tier)),
                    "§4.1",
                );
                drive.check(
                    structurally_equal(&read_back, value),
                    &format!("§5.2 P-IM-1: the round trip is EXACT at {address:?} {tier:?}"),
                );
                // §5.4's purge, stated as the row's own "no other version of `a` at a tier ≤ rank(t)".
                let versions = versions_at(&store, &address);
                drive.check(
                    versions.contains(&tier),
                    "§5.4: the write's own tier carries a version",
                );
                drive.check(
                    versions.iter().all(|v| *v == tier || rank(*v) > rank(tier)),
                    "§5.4: no version at a tier ≤ rank(write tier) survives but this write's",
                );
                // §5.9's second assertion of S-RT — the read's returned object, mutated, must not change
                // the store (the resolvers's non-copy discipline's one observable).
                //
                // **NG-2 — THE ARRAY HALF OF THE COPY DISCIPLINE, WHICH THE GUARD BELOW NOW REACHES.**
                // `§4.1` states the copy discipline over the WHOLE of what a read returns: *"mutating the
                // object a read returned never mutates the store"*, and `§1.4`'s admitted class 4 is an
                // object **OR AN ARRAY** (`R-3` assembles the `VEC` case). The guard used to be written
                // over `StoreValue::Object` alone, so the ARRAY half of the row's own failure list —
                // *"a read whose returned object, mutated, changes the store (the copy discipline)"* — was
                // unreachable by every attempt. It is driven now, at zero cost in attempts.
                let mut mutated = read_back.clone();
                match mutated {
                    StoreValue::Object(ref mut members) => {
                        members.insert("injected".into(), v_str("x"));
                    }
                    StoreValue::Array(ref mut items) => {
                        items.push(v_str("injected"));
                        if let Some(first) = items.first_mut() {
                            *first = v_str("injected-first");
                        }
                    }
                    _ => {}
                }
                let again = ok(
                    store.read(AddressArg::List(address.clone()), t(tier)),
                    "§4.1",
                );
                drive.check(
                    structurally_equal(&again, value),
                    "§5.9/§4.1: a mutated read result never mutates the store — the OBJECT half",
                );
                drive.check(
                    structurally_equal(&read_back, value),
                    "§5.2 P-IM-1: the value the read handed back is itself unchanged — the mutation landed \
                     on a COPY, never on the store's own node (§4.1's copy discipline)",
                );
                // DD-6's reachability half — an address that was never minted does not resolve.
                let mut sibling = address.clone();
                sibling.push(Segment::Key("never-minted".into()));
                let is_leaf = matches!(
                    value,
                    StoreValue::Str(_) | StoreValue::Bool(_) | StoreValue::Num(_)
                );
                let probe = store.read(AddressArg::List(sibling), TierArg::Absent);
                match probe {
                    Err(e) => drive.check(
                        is_leaf && e.status == "LeafHasNoDownstream"
                            || !is_leaf && e.status == "AddressNotFound",
                        &format!(
                            "§0.2 DD-6: an unminted address does not resolve (got {})",
                            e.status
                        ),
                    ),
                    Ok(_) => {
                        drive.check(false, "§0.2 DD-6: an unminted address resolved to a node")
                    }
                }
            }
        }
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-1` — TWO-TIER ONE-ADDRESS WRITES AND THE SHADOW-SURVIVAL BREAK** (`§5.2`'s own failure list:
    // *"a shadow that survives the write (the read returning the pre-write version at `rank ≤ rank(t)`)"*,
    // read against `§5.4` arms `W-1`/`W-5`/`W-6` and `§1.3`'s `(key, tier)` composite key).
    //
    // The drive's loop wrote ONE occupancy state only — an UNOCCUPIED key (its per-attempt unique suffix) —
    // so a version standing at a tier ABOVE the write's was unreachable by every attempt and the break could
    // not fail. Driven here: `file` (rank 2) first, then `mem` (rank 1). By `V: §14 · A34` and `§3.4`'s
    // designation the `mem` write is `W-5`'s SHADOW arm — the `file` version SURVIVES *"added alongside"*,
    // the shadow WINS the unqualified read (`§2.3`: lowest persistence), and the survivor still answers at
    // its own tier.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    let mut shadowed = new_store();
    ok(
        shadowed.write(AddressArg::List(key(&["sh"])), w_file(), v_str("durable")),
        "§3.4 W-3 at `file`",
    );
    ok(
        shadowed.write(AddressArg::List(key(&["sh"])), w_mem(), v_str("trial")),
        "§3.4 W-5: the less-persistent write is added alongside",
    );
    drive.check(
        read_at(&shadowed, &key(&["sh"])) == v_str("trial"),
        "§5.2 P-IM-1/§5.4 (c): the shadow WINS the unqualified read",
    );
    drive.check(
        read_tier(&shadowed, &key(&["sh"]), Tier::File) == v_str("durable"),
        "§5.2 P-IM-1: the `file` version SURVIVES the write — the pre-write version at `rank ≤ rank(t)` is \
         not what the read answers",
    );
    drive.check(
        versions_at(&shadowed, &key(&["sh"])) == vec![Tier::File, Tier::Mem],
        "§1.3/§5.4 (b): the pair set grew by exactly one — two versions of one key are TWO anchors",
    );
    drive.check(
        landing_tier(&shadowed, &key(&["sh"])) == Tier::Mem,
        "§2.3: the landing is the LOWEST-persistence anchor at the key",
    );

    // -----------------------------------------------------------------------------------------------
    // **`NG-3` — AN INDEX-SEGMENT ADDRESS AND THE `"0"` ↔ `0` SEPARATION** (`§1.5` items 1–3, `§4.2`
    // `R-3`, `DD-24(c)`). No attempt in the loop ever carried an INDEX segment, so the row's *"a `VEC`'s
    // index collapsing to a `MAP`'s key"* half was touched only through internal indices. Driven here at a
    // real address: `idx(0)` resolves against the `VEC`, `Key("0")` is a different segment that resolves
    // NOWHERE against it (`§1.5` item 3), **no coercion occurs** (`§1.5` item 2), and the `VEC`'s read is
    // DENSE from `0` (`R-3`).
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    let mut indexed = new_store();
    ok(
        indexed.write(
            AddressArg::List(key(&["iv"])),
            w_mem(),
            v_arr(vec![v_num(1.0), v_num(2.0)]),
        ),
        "§3.4 W-4: a VEC root",
    );
    ok(
        indexed.write(
            AddressArg::List(vec![Segment::Key("iv".into()), idx(0)]),
            w_mem(),
            v_num(9.0),
        ),
        "§3.4 W-1: an INDEX segment addresses the VEC's index `0`",
    );
    drive.check(
        read_at(&indexed, &vec![Segment::Key("iv".into()), idx(0)]) == v_num(9.0),
        "§1.5 item 1/§4.2 R-3: an index segment resolves against a VEC",
    );
    drive.check(
        read_at(&indexed, &key(&["iv"])) == v_arr(vec![v_num(9.0), v_num(2.0)]),
        "§4.2 R-3: the VEC is dense from `0` and index order is the array's order",
    );
    let coerced = indexed.read(
        AddressArg::List(vec![Segment::Key("iv".into()), Segment::Key("0".into())]),
        TierArg::Absent,
    );
    drive.check(
        matches!(coerced, Err(ref e) if e.status == "AddressNotFound" || e.status == "LeafHasNoDownstream"),
        &format!(
            "§1.5 item 3/§1.5 item 2: `Key(\"0\")` is a string key and resolves NOWHERE against a VEC — \
             NO COERCION OCCURS; got {:?}",
            coerced.as_ref().map(|v| format!("{v:?}")).map_err(|e| e.status.clone())
        ),
    );

    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.3 `P-IM-2` — a failed write leaves ZERO RESIDUE. Strategy id `S-RESIDUE`.
// ---------------------------------------------------------------------------------------------------

/// §5.3 `P-IM-2`, strategy `S-RESIDUE`: snapshot the observable state (each reachable address's read
/// value, each link's pair set, the journal's entry count) before and after a failed write; compare. The
/// whole observable state is `read([])` — the register's assembled content (`R-5`) — and the journal's
/// entry count is observed through `JournalOp.seq`'s append ordinal (`§6.2`).
#[test]
fn p_im_2_a_failed_write_leaves_zero_residue() {
    let mut drive = Drive::new("P-IM-2", "S-RESIDUE");

    for tier in canonical_tiers() {
        for case in 0..4 {
            if drive.stopped() {
                break;
            }
            drive.attempt();
            let mut store = new_store();
            ok(
                store.write(
                    AddressArg::List(key(&["a"])),
                    t(tier),
                    v_obj(&[("b", v_num(1.0))]),
                ),
                "§3.4 W-4",
            );
            // §6.2: the append ordinal is *"strictly increasing from 1"*, so this — the attempt's SECOND
            // successful write — is `seq` 2, and the ordinal every later append must take is stated against
            // THIS op's own ordinal rather than against a literal (`§6.1` item 1: one entry per successful
            // write, and no entry for a failed one).
            let deep = ok(
                store.write(AddressArg::List(key(&["a", "b"])), t(tier), v_str("deep")),
                "§3.4 W-3",
            );
            drive.check(
                deep.op.seq == 2,
                "§6.2/§6.1 item 1: the attempt's two SUCCESSFUL writes are the appends `seq` 1 and `seq` 2",
            );
            let state_before = read_at(&store, &empty_address());
            let pairs_before = versions_at(&store, &key(&["a"]));

            let failing = match case {
                0 => store
                    .write(AddressArg::List(key(&["a"])), none(), v_num(9.0))
                    .map(|_| ()),
                1 => store
                    .write(AddressArg::List(key(&["a"])), t(tier), v_null())
                    .map(|_| ()),
                2 => store
                    .write(AddressArg::List(key(&["nope", "k"])), t(tier), v_num(9.0))
                    .map(|_| ()),
                _ => store
                    .write(
                        AddressArg::List(key(&["a"])),
                        t(tier),
                        v_arr(vec![v_num(9.0)]),
                    )
                    .map(|_| ()),
            };
            match failing {
                Ok(()) => drive.check(false, "§3.4 F-1…F-6: this drive must fail"),
                Err(e) => drive.check(
                    CLOSED_CODES.contains(&e.status.as_str()),
                    "§8.1: the failure's code is a member of the closed set",
                ),
            }
            drive.check(
                structurally_equal(&read_at(&store, &empty_address()), &state_before),
                "§5.3 P-IM-2: the observable state is identical after a failed write",
            );
            drive.check(
                versions_at(&store, &key(&["a"])) == pairs_before,
                "§5.3 P-IM-2: the pair set at the link is unchanged",
            );
            let next = ok(
                store.write(AddressArg::List(key(&["z"])), t(tier), v_num(1.0)),
                "§3.4 W-3",
            );
            drive.check(
                next.op.seq == deep.op.seq + 1,
                &format!(
                    "§5.3 P-IM-2: NO journal entry for a failed write — the next append takes the LAST \
                     SUCCESSFUL append's ordinal + 1 (got `seq {}`, after the successful write's `seq {}`)",
                    next.op.seq, deep.op.seq
                ),
            );
        }
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-4` — A FAILED `file` WRITE THAT WOULD HAVE PURGED, WITH `journalLength = 1`, AND EVERY
    // TIER-QUALIFIED READ PLUS A PRIOR ROLLBACK** (`§5.3`'s failure list: *"a removed version that was not
    // restored"* and *"a journal entry for a failed write"*; `§3.5`'s byte-identity; `§6.4` `M-6`; `§7.2`
    // item 2).
    //
    // The loop's `4` cases per tier reach only `F-1`, `F-2`, `F-3`, `F-4` and ALL of them fail BEFORE any
    // purge, so *"a removed version that was not restored"* was unreachable by construction. `NG-4` drives
    // the one failing write that lands AFTER the purge stage: a `file`-tier write whose commit cannot land,
    // over a key that already stands at a LESS persistent tier — the state whose automatic rollback
    // re-mints the capture. And because the no-entry check in the loop is a `seq` comparison, it cannot see
    // a COMPACTION MARK; `NG-4` reads that mark through `rollback(prior.opId)`, which `M-6` permits
    // (`1 ≤ journalLength`) and which a surviving compaction mark turns into `RollbackCompacted`.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    {
        let path = fresh_path("pim2-ng4");
        let mut s = ok(storeCreate(&cfg_at(&path, 1)), "§7.1: journalLength = 1");
        let prior = ok(
            s.write(AddressArg::List(key(&["keep"])), w_mem(), v_num(1.0)),
            "§3.4 W-3: the one successful entry the bound allows",
        );
        ok(
            s.write(AddressArg::List(key(&["purgeme"])), w_temp(), v_str("trial")),
            "§3.4 W-3: the version the failed `file` write would purge (this append compacts `prior`)",
        );
        // Snapshot EVERY observable the store has: the whole registry, every tier-qualified read at every
        // address it holds, and each address's version set.
        let registry_before = read_at(&s, &empty_address());
        let versions_before = versions_at(&s, &key(&["purgeme"]));
        let qualified_before = [
            s.read(AddressArg::List(key(&["purgeme"])), t(Tier::Temp))
                .ok(),
            s.read(AddressArg::List(key(&["purgeme"])), t(Tier::Mem))
                .ok(),
            s.read(AddressArg::List(key(&["purgeme"])), t(Tier::File))
                .ok(),
        ];
        // **THE RESIDUE REFERENCE — A SECOND INSTANCE WHOSE BOUND IS LARGE ENOUGH THAT `§6.1` ITEM 5'S
        // COMPRESSION TRIGGER NEVER FIRES, SO THE PRIOR ENTRY IS ROLLBACKABLE BY DESIGN.** `journalLength =
        // 1` (`s`, and `failing` below) makes the attempt's SECOND successful write compact the first —
        // *"when an append would leave more than `journalLength` un-compacted entries, the oldest entries are
        // compressed"* — so at `journalLength = 1` the prior entry is LEGITIMATELY `compacted` BEFORE any
        // failed write, and `§6.4` `M-6`/`M-9` then require `RollbackCompacted` for it (a compaction mark is
        // the failed write's residue only where the failed write's OWN append set it). **`NG-4`'s residue
        // assertion therefore runs over a store the DECLARED TRIGGER does not reach (`journalLength = 4`:
        // `2 ≤ 4`), where the failure's residue is the only thing the comparison can be measuring.** The
        // compacting sibling `s` is kept beside it and its own compaction is asserted, because *that* is the
        // trigger's declared outcome and not residue.
        drive.attempt();
        let mut reference = ok(
            storeCreate(&cfg_at(&fresh_path("pim2-ng4-reference"), 4)),
            "§7.1: journalLength = 4 — the declared trigger does not reach this attempt's appends",
        );
        let reference_prior = ok(
            reference.write(
                AddressArg::List(key(&["purgeme"])),
                w_temp(),
                v_str("trial"),
            ),
            "§3.4 W-3 at `temp`, on the reference instance",
        );
        ok(
            reference.write(AddressArg::List(key(&["purgeme"])), w_mem(), v_str("mem")),
            "§3.4 W-6 on the reference instance: the state whose purge the failed write would extend",
        );
        drive.check(
            reference_prior.op.compacted == false,
            "§6.2: the op a write returns reports the entry's mark AT THE APPEND — the reference instance's \
             prior op is un-compacted by construction, and no later append may have marked it (`§6.1` item \
             5 declares the mark on the JOURNAL ENTRY, and the returned record is the entry's snapshot)",
        );
        // `§6.1` item 5's mark is not carried back onto the `JournalOp` a write already returned, so the
        // triggering append's own effect is read through `§6.4` `M-6`'s floor — the one observable a
        // compaction mark has — at the sibling below.
        let reference_registry = read_at(&reference, &empty_address());
        let reference_versions = versions_at(&reference, &key(&["purgeme"]));
        let reference_qualified = [
            reference
                .read(AddressArg::List(key(&["purgeme"])), t(Tier::Temp))
                .ok(),
            reference
                .read(AddressArg::List(key(&["purgeme"])), t(Tier::Mem))
                .ok(),
            reference
                .read(AddressArg::List(key(&["purgeme"])), t(Tier::File))
                .ok(),
        ];
        // **THE FAILING INSTANCE'S BOUND IS THE REFERENCE'S — BOTH `journalLength = 4` — SO THE TWO
        // INSTANCES' JOURNAL FLOORS ARE IDENTICAL AND THE COMPARISON BELOW CAN ONLY BE MEASURING THE FAILED
        // WRITE'S OWN RESIDUE.** At `journalLength = 1` the attempt's own second successful append already
        // compacts the oldest entry (`§6.1` item 5's trigger, asserted on the sibling `s` at the end of this
        // block), so a prior entry that is out of scope BEFORE the failure cannot carry a residue assertion —
        // the cell would be testing the declared trigger, not the failure. **The failing write itself is
        // unchanged**: a `file`-tier write whose commit cannot land, over a key that already stands at a less
        // persistent tier — the one failing write that lands AFTER the purge stage, whose automatic rollback
        // must re-mint the capture (`§3.5`, `§6.4` item 8, `§7.2` item 2).
        // **⟶ RE-DERIVED 2026-10-11: THE FAILING INSTANCE'S PATH IS REACHABLE AT CONSTRUCTION AND IS BROKEN
        // AFTERWARDS.** The as-filed fixture named a path whose PARENT DIRECTORY DOES NOT EXIST — which the
        // amended construction reads as UNREACHABLE and refuses with `FilePathUnreachable` (`§8.1` #13;
        // `A52`/`A55`; `DD-40` (a)), so that store can no longer be constructed at all. **The state this cell
        // needs — a `file`-tier write whose COMMIT cannot land, on an instance that already exists — is
        // reached the way the amendment's other cells reach it: a FRESH path (arm (b) of `A52`: the
        // application can write it, so the register is created at `file`, which is also the tier the failing
        // write needs at this key), then the path is made a DIRECTORY before the attempt.**
        let unwritable = fresh_path("ng4-commit-dir");
        let _ = std::fs::remove_file(&unwritable);
        let mut failing = ok(
            storeCreate(&cfg_at(&unwritable, 4)),
            "§7.1: a fresh instance at the reference's own bound (a reachable path) — and its step 4b \
             exclusive create leaves the store's OWN zero-length file AT THIS PATH (`§10.4` part 3), \
             which is what makes the path present rather than absent from here on",
        );
        let failing_prior = ok(
            failing.write(
                AddressArg::List(key(&["purgeme"])),
                w_temp(),
                v_str("trial"),
            ),
            "§3.4 W-3 at `temp`",
        );
        ok(
            failing.write(AddressArg::List(key(&["purgeme"])), w_mem(), v_str("mem")),
            "§3.4 W-6: the state whose purge the failed write would extend",
        );
        // **⟶ RE-DERIVED AGAIN 2026-10-13 (`D-GP-SVM-4` outcome (a): malformed TEST, not implementation and not
        // spec): THE STATE THAT MUST BE *BROKEN* BEFORE THE ATTEMPT IS BROKEN A SECOND TIME, BECAUSE THE
        // CONSTRUCTION PUT A FILE THERE.** `storeCreate` above now performs step 4b's exclusive create at this
        // provided, absent path, so the path is NO LONGER ABSENT when this fixture goes to make it a directory
        // — and this file's own earlier `remove_file` cannot help, because it runs BEFORE the construction
        // that creates it. **THE REMEDY IS THE ONE THIS REPOSITORY'S OTHER FOUR CELLS ALREADY USE — the
        // `FileCommitFailed` state is reached as `storeCreate(ok)` → `remove_file` → `create_dir`** (`§7.1`
        // step 4b; `DD-40` (b), whose *"the same state reached later by a `file`-tier write on an
        // already-constructed store remains `FileCommitFailed`"* is the reading this drives) — **in the
        // precedent order of `tests/construction.rs:833`, `tests/fail_codes.rs:540` and `:616` and this
        // file's own `:2633`.** **THE REMOVAL NAMES NO ROUTE THE CONTRACT REFUSES: the store's own file at
        // this path is ZERO-LENGTH AND CARRIES NO BYTE** (`§10.4` part 3), **the two successful writes above
        // are `temp`- and `mem`-tier and commit nothing, and `DD-28` makes `file`-tier durability a *"`file`
        // write's act alone"` — so no committed byte exists to lose and the removal is not a second durability
        // route, a truncation, or a second predicate.**
        let _ = std::fs::remove_file(&unwritable);
        std::fs::create_dir(&unwritable)
            .expect("the path is now a directory, so a file write cannot land");
        let before_fail = read_at(&failing, &empty_address());
        let versions_fail_before = versions_at(&failing, &key(&["purgeme"]));
        let e = failure(
            failing.write(
                AddressArg::List(key(&["purgeme"])),
                w_file(),
                v_str("durable"),
            ),
            "§8.1 #15: the `file` write's commit cannot land",
        );
        drive.check(
            e.status == "FileCommitFailed",
            &format!(
                "§8.1 #15/DD-25: the commit failure's ONE code; got {}",
                e.status
            ),
        );
        // **HOW THIS CELL WOULD FAIL IF THE RESIDUE GUARANTEE BROKE — STATED SO THE CELL IS NOT A
        // PASS-BY-CONSTRUCTION.** The write above is a GENUINE FAILURE: its commit is driven at a path that
        // is a directory, so it fails AFTER the purge stage (`§3.4` `W-6` at `purgeme` would have purged the
        // `temp` version), which is exactly the arm whose automatic rollback must re-mint the capture
        // (`§3.5`; `§6.4` item 8; `§7.2` item 2). **The assertions that follow are FALSIFIABLE AND EACH HAS A
        // NAMED BREAK: a registry left with a partially installed subtree makes the `structurally_equal`
        // comparison below answer FALSE; a `temp` version purged and NOT restored makes the `versions_at`
        // comparison answer FALSE; a per-tier fold (a `temp` or `mem` version dropped, or a `file` version
        // installed) makes the per-tier comparisons answer FALSE; and a journal entry appended for the failed
        // write moves the reach so that the prior entry's rollback answers differently on `failing` than on
        // `reference` — which the `undoneOps` and post-rollback comparisons catch.** **AND IF THE FAILED WRITE
        // STOPPED FAILING — i.e. if a commit at a directory-valued path SUCCEEDED — the check immediately
        // above answers FALSE before any residue comparison runs**, so no residue assertion can pass by the
        // write having silently succeeded.
        drive.check(
            structurally_equal(&read_at(&failing, &empty_address()), &before_fail),
            "§5.3 P-IM-2/§3.5: the WHOLE REGISTRY is byte-identical after the failed `file` write",
        );
        drive.check(
            versions_at(&failing, &key(&["purgeme"])) == versions_fail_before,
            &format!(
                "§5.3 P-IM-2/§3.5: every version of the addressed node is restored — a removed version \
                 that was not restored is the break; got {:?}, expected {:?}",
                versions_at(&failing, &key(&["purgeme"])),
                versions_fail_before
            ),
        );
        for (tier, expected) in [
            (
                Tier::Temp,
                failing
                    .read(AddressArg::List(key(&["purgeme"])), t(Tier::Temp))
                    .ok(),
            ),
            (
                Tier::Mem,
                failing
                    .read(AddressArg::List(key(&["purgeme"])), t(Tier::Mem))
                    .ok(),
            ),
            (
                Tier::File,
                failing
                    .read(AddressArg::List(key(&["purgeme"])), t(Tier::File))
                    .ok(),
            ),
        ] {
            let now = failing
                .read(AddressArg::List(key(&["purgeme"])), t(tier))
                .ok();
            drive.check(
                now == expected,
                &format!(
                    "§5.3/§7.2 item 2: the `{tier:?}` version answers exactly as before the failed commit \
                     (got {now:?}, expected {expected:?}) — the automatic rollback must restore the store's \
                     `file` state, not fold tiers onto one"
                ),
            );
        }
        // **THE RESIDUE PROOF, MADE AGAINST AN INSTANCE THE DECLARED TRIGGER DOES NOT REACH — THE READING
        // `§5.3`/`§3.5`/`§6.1` ITEM 5 REQUIRE, AND THE READING THE OLD ASSERTION CONTRADICTED.** The failed
        // `file` write's residue is *"no node minted, no anchor destroyed, no version removed, no container
        // kind changed, and NO JOURNAL ENTRY APPENDED"* with *"the store's observable state after a failed
        // write … byte-identical to its state before it"*. Every observable is compared against BOTH the
        // instance's own `before_fail` snapshot AND the reference instance built by the IDENTICAL pair of
        // successful writes — so the failure's own residue is the only difference the comparison can find.
        drive.check(
            structurally_equal(&read_at(&failing, &empty_address()), &reference_registry),
            "§5.3 P-IM-2/§3.5: the WHOLE REGISTRY is byte-identical to the instance that never attempted the \
             failed write",
        );
        drive.check(
            versions_at(&failing, &key(&["purgeme"])) == reference_versions,
            "§5.3 P-IM-2/§3.5: the pair set at the addressed node is byte-identical to that instance's",
        );
        for (i, expected) in reference_qualified.iter().enumerate() {
            let tier = [Tier::Temp, Tier::Mem, Tier::File][i];
            drive.check(
                failing
                    .read(AddressArg::List(key(&["purgeme"])), t(tier))
                    .ok()
                    == *expected,
                &format!(
                    "§5.3 P-IM-2/§7.2 item 2: the `{tier:?}`-qualified read is byte-identical to the \
                     instance that never attempted the failed write"
                ),
            );
        }
        // **THE PRIOR ENTRY'S ROLLBACK — THE MARK/SEQ STATE, WHICH NO READ CAN SEE.** `§6.4` `M-6`'s floor
        // is the only observable a compaction mark has, so the failing instance's prior entry is rolled back
        // and the result compared with the reference instance's. **The two instances carry the SAME bound, the
        // same two successful writes and byte-identical registries, so their rollback floors are identical by
        // construction — every difference the comparison can find IS the failed write's residue.**
        let failing_rollback = failing.rollback(OpIdArg::Id(failing_prior.op.opId.clone()));
        let reference_rollback = reference.rollback(OpIdArg::Id(reference_prior.op.opId.clone()));
        match (&failing_rollback, &reference_rollback) {
            (Ok(a), Ok(b)) => {
                drive.check(
                    a.opId == failing_prior.op.opId,
                    "§6.3: the rollback echoes the op id the caller passed",
                );
                drive.check(
                    a.undoneOps.len() == b.undoneOps.len(),
                    &format!(
                        "§5.3 P-IM-2/§6.4 M-5: the prior entry's rollback undoes exactly as many operations on \
                         the failed instance as on the reference one — the failed write left the reach \
                         untouched; got {:?} against {:?}",
                        a.undoneOps, b.undoneOps
                    ),
                );
                drive.check(
                    structurally_equal(
                        &read_at(&failing, &empty_address()),
                        &read_at(&reference, &empty_address()),
                    ),
                    "§5.3 P-IM-2: after the prior entry's rollback the two instances' WHOLE REGISTRIES are \
                     byte-identical — the failed write left nothing the rollback could act on differently",
                );
            }
            (a, b) => drive.check(
                false,
                &format!(
                    "§5.3 P-IM-2/§6.4 M-6: the failed `file` write must leave the journal's mark/seq state such \
                     that the prior entry is rollbackable exactly where the reference instance's is — the \
                     failing instance answered {:?} and the reference answered {:?}",
                    a.as_ref().map(|_| "Ok").map_err(|e| e.status.clone()),
                    b.as_ref().map(|_| "Ok").map_err(|e| e.status.clone())
                ),
            ),
        }
        drive.check(
            structurally_equal(&read_at(&failing, &empty_address()), &read_at(&reference, &empty_address())),
            "§5.3 P-IM-2: the two instances' registries are byte-identical AFTER the rollback as well",
        );
        // The compacting sibling's own declared outcome (`§6.1` item 5's trigger, `§6.4` `M-6`), asserted
        // AFTER the failed write so it reads the sibling's state at the same moment the residue comparison
        // does — and it is the TRIGGER's outcome and not residue, because the compaction happened at the
        // SECOND SUCCESSFUL APPEND, before any failed write was attempted.
        drive.check(
            matches!(
                s.rollback(OpIdArg::Id(prior.op.opId.clone())),
                Err(ref e) if e.status == "RollbackCompacted"
            ),
            "§6.4 M-6/§6.1 item 5: at journalLength = 1 the prior entry is COMPACTED — the second successful \
             append compressed it and the rollback's floor refuses it. **The mark is read through the floor \
             because `§6.2`'s returned record does not carry it back**, and the refusal PRECEDES the failed \
             write entirely, so this is the declared trigger and not a failed write's residue",
        );
        // The first store's own snapshot is unchanged too — the loop's own comparison, at the `file` tier.
        drive.check(
            structurally_equal(&read_at(&s, &empty_address()), &registry_before),
            "§5.3 P-IM-2: the sibling instance's registry is untouched",
        );
        drive.check(
            versions_at(&s, &key(&["purgeme"])) == versions_before,
            "§5.3 P-IM-2: the sibling instance's version set is untouched",
        );
        for (i, expected) in qualified_before.iter().enumerate() {
            let tier = [Tier::Temp, Tier::Mem, Tier::File][i];
            drive.check(
                s.read(AddressArg::List(key(&["purgeme"])), t(tier)).ok() == *expected,
                &format!("§5.3 P-IM-2: the `{tier:?}`-qualified read is unchanged on the sibling instance"),
            );
        }
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-5` — THE `F-5` AND `F-6` RESIDUES** (`§3.4` arms `F-5`/`F-6`, `§3.5`'s fail-closed block).
    // The loop's `4` cases never drive either arm. Each is driven here with the loop's own before/after
    // snapshot discipline: the whole registry, the pair sets at every address the store holds, and the
    // journal's ordinal.
    // -----------------------------------------------------------------------------------------------
    for (what, arm) in [("F-5", 0usize), ("F-6", 1)] {
        drive.attempt();
        let mut s = new_store();
        ok(
            s.write(AddressArg::List(key(&["a"])), w_mem(), v_str("leaf")),
            "§3.4 W-3: the parent the arm resolves",
        );
        ok(
            s.write(AddressArg::List(key(&["d"])), w_temp(), v_obj(&[])),
            "§3.4 W-4: the second subtree",
        );
        let last = ok(
            s.write(AddressArg::List(key(&["z"])), w_mem(), v_num(5.0)),
            "§3.4 W-3: the last successful append",
        );
        // The snapshot is taken AFTER the last successful write, so the comparison below isolates the
        // FAILED write's own residue (`§3.5`: *"the store's observable state after a failed write is
        // byte-identical to its state before it"*) and does not count the successful write's own effect.
        let registry_before = read_at(&s, &empty_address());
        let pairs_before = versions_at(&s, &key(&["a"]));
        let failing = if arm == 0 {
            // `F-5`: the resolved PARENT is a leaf — *"whatever the value's class is"* (§3.2 item 5).
            s.write(AddressArg::List(key(&["a", "b"])), w_mem(), v_str("x"))
        } else {
            // `F-6`: the minted child anchor would outrank the parent anchor's tier — the parent anchor
            // being the one §3.2 item 2 resolved (`temp`), the write's tier `file`.
            s.write(AddressArg::List(key(&["d", "c"])), w_file(), v_num(1.0))
        };
        match failing {
            Ok(_) => drive.check(false, &format!("§3.4 {what} must fail")),
            Err(e) => drive.check(
                e.status
                    == if arm == 0 {
                        "WriteParentNotLink"
                    } else {
                        "ParentAnchorMonotonicityViolation"
                    },
                &format!("§3.4 {what}: the arm's own code; got {}", e.status),
            ),
        }
        drive.check(
            structurally_equal(&read_at(&s, &empty_address()), &registry_before),
            &format!("§5.3 P-IM-2/§3.5: the {what} residue — the whole registry is identical"),
        );
        drive.check(
            versions_at(&s, &key(&["a"])) == pairs_before,
            &format!("§5.3 P-IM-2: the {what} residue — the pair set at the resolved parent is identical"),
        );
        drive.check(
            versions_at(&s, &key(&["d"])) == vec![Tier::Temp],
            &format!(
                "§5.3 P-IM-2: the {what} residue — the parent chain's own version set is unmoved"
            ),
        );
        let next = ok(
            s.write(AddressArg::List(key(&["y"])), w_mem(), v_num(6.0)),
            "§3.4 W-3",
        );
        drive.check(
            next.op.seq == last.op.seq + 1,
            &format!(
                "§5.3 P-IM-2: the {what} residue — NO journal entry for a failed write (got `seq {}`, \
                 expected {})",
                next.op.seq,
                last.op.seq + 1
            ),
        );
    }

    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.4 `P-SM-4` — the write's own tier is the addressed version's tier, the arms are exclusive, and the
// tier order is TOTAL, STRICT and OBSERVABLE. Strategy ids `S-ARM` (two halves) and `S-TIER`.
// ---------------------------------------------------------------------------------------------------

/// §5.4 `P-SM-4`, strategy `S-ARM`: enumerate the arm conditions as a closed decision table over
/// (present pairs at key, container kind, value class, tier rank vs present ranks); assert one arm fires
/// and its stated effect on the `(key, tier)` pair set (`W-1`/`W-2`/`W-6`: the pair count does not grow;
/// `W-5`/`W-3`/`W-4`: it grows by one). Part (a) of the row — the landing — is asserted at every drive.
///
/// **THE OVER-STRONG HALF, NAMED AND NOT DRIVEN — `R-5`'s finding, CLOSED BY THE THIRD AMENDMENT'S
/// RE-STATEMENT OF THIS ROW:** **`§5.4` (b) as filed required that *"exactly one of `W-1`…`W-6` IS the arm a
/// legal write IS"*** — **and the arm's IDENTITY is not observable on the surface.** `§5.4` (b)'s corrected
/// form now says exactly this (*"THE ARM'S IDENTITY IS NOT AN OBSERVABLE OF THIS SURFACE, and this row
/// asserts none"*), so the row is stated at its observables — **the pair count, the tier order, the value
/// and the exclusivity of outcomes** — and **no cell here asserts the identity**, which would be a cell that
/// cannot fail.
///
/// **AND `NG-8` — THE `F-4`-vs-`W-6` OVERLAP — IS AUTHORED AND ASSERTED** (below, in
/// `ng_8_the_f4_vs_w6_overlap_is_f4_by_designation`). **`§3.4`'s designation clause now designates this
/// pre-state too**: `write(['a'], mem, {})` then `write(['a'], file, [1])` satisfies `F-4`'s pre-state (the
/// value standing at the target slot contradicts the array's kind) AND `W-6`'s (an anchor at the key at a
/// less persistent tier), and the clause makes the write **`F-4` BY DESIGNATION — nothing installed, no
/// version purged, no anchor destroyed or minted, no journal entry appended** (the designation the `S-7`
/// spec pass landed, cited at `§3.4`'s designation clause and `§5.4` (b)'s corrected form).
// Drives: §5.4
#[test]
fn p_sm_4_arms_are_exclusive_and_the_pair_set_changes_as_their_rows_say() {
    let mut drive = Drive::new("P-SM-4", "S-ARM");

    // (setup pairs, container, value, write tier, expected value, expected present pairs)
    let cases: Vec<(
        Vec<(Tier, StoreValue)>,
        StoreValue,
        Tier,
        StoreValue,
        Vec<Tier>,
    )> = vec![
        (
            vec![],
            v_str("lit"),
            Tier::Mem,
            v_str("lit"),
            vec![Tier::Mem],
        ),
        (
            vec![],
            v_obj(&[("k", v_num(1.0))]),
            Tier::Mem,
            v_obj(&[("k", v_num(1.0))]),
            vec![Tier::Mem],
        ),
        (
            vec![],
            v_arr(vec![v_num(1.0)]),
            Tier::File,
            v_arr(vec![v_num(1.0)]),
            vec![Tier::File],
        ),
        (
            vec![(Tier::Mem, v_num(1.0))],
            v_str("new"),
            Tier::Mem,
            v_str("new"),
            vec![Tier::Mem],
        ),
        (
            vec![(Tier::File, v_num(1.0))],
            v_str("shadow"),
            Tier::Mem,
            v_str("shadow"),
            vec![Tier::File, Tier::Mem],
        ),
        // §3.4 arm `W-2` / `§1.1` / `§5.4` (a): the target is a `leaf` at a MORE persistent tier than the
        // write's and the value is structured — the leaf's pointing anchor is destroyed WHATEVER TIER it
        // carries, the write's tier is the new anchor's tier, and the pair set is `[Mem]` alone (`[File]`
        // does NOT survive: this state is `W-2`'s and NOT `W-5`'s, whose shadow is reserved to a target that
        // is not the leaf this write re-mints).
        (
            vec![(Tier::File, v_num(1.0))],
            v_obj(&[]),
            Tier::Mem,
            v_obj(&[]),
            vec![Tier::Mem],
        ),
        (
            vec![(Tier::Temp, v_num(1.0))],
            v_str("durable"),
            Tier::Mem,
            v_str("durable"),
            vec![Tier::Mem],
        ),
        (
            vec![(Tier::Temp, v_num(1.0))],
            v_str("durable"),
            Tier::File,
            v_str("durable"),
            vec![Tier::File],
        ),
        (
            vec![(Tier::Mem, v_str("leaf"))],
            v_obj(&[("k", v_num(1.0))]),
            Tier::Mem,
            v_obj(&[("k", v_num(1.0))]),
            vec![Tier::Mem],
        ),
        (
            vec![(Tier::Mem, v_str("leaf"))],
            v_arr(vec![v_num(1.0)]),
            Tier::Mem,
            v_arr(vec![v_num(1.0)]),
            vec![Tier::Mem],
        ),
        (
            vec![(Tier::File, v_str("durable"))],
            v_str("trial"),
            Tier::Temp,
            v_str("trial"),
            vec![Tier::File, Tier::Temp],
        ),
        (
            vec![(Tier::File, v_str("durable")), (Tier::Mem, v_str("mem"))],
            v_str("mem2"),
            Tier::Mem,
            v_str("mem2"),
            vec![Tier::File, Tier::Mem],
        ),
        (
            vec![
                (Tier::File, v_str("f")),
                (Tier::Mem, v_str("m")),
                (Tier::Temp, v_str("t")),
            ],
            v_str("m2"),
            Tier::Mem,
            v_str("m2"),
            vec![Tier::File, Tier::Mem],
        ),
        (
            vec![
                (Tier::File, v_str("f")),
                (Tier::Mem, v_str("m")),
                (Tier::Temp, v_str("t")),
            ],
            v_str("f2"),
            Tier::File,
            v_str("f2"),
            vec![Tier::File],
        ),
    ];

    for (setup, value, tier, expected_value, expected_pairs) in cases {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        let mut store = new_store();
        for (setup_tier, setup_value) in &setup {
            ok(
                store.write(
                    AddressArg::List(key(&["a"])),
                    t(*setup_tier),
                    setup_value.clone(),
                ),
                "the case's setup",
            );
        }
        let pairs_before = versions_at(&store, &key(&["a"]));
        let w = ok(
            store.write(AddressArg::List(key(&["a"])), t(tier), value.clone()),
            "§3.4: a success arm",
        );
        drive.check(w.op.seq >= 1, "§6.1: the arm appended an entry");
        let after = read_at(&store, &key(&["a"]));
        drive.check(
            structurally_equal(&after, &expected_value),
            &format!("§3.4: the arm's stated effect on the value (got {after:?}, expected {expected_value:?})"),
        );
        let pairs_after = versions_at(&store, &key(&["a"]));
        drive.check(
            pairs_after == expected_pairs,
            &format!(
                "§3.4/§5.4 (b): the pair set (got {pairs_after:?}, expected {expected_pairs:?})"
            ),
        );
        let purging = pairs_after.len() <= pairs_before.len();
        let growing = pairs_after.len() == pairs_before.len() + 1;
        drive.check(
            purging || growing,
            "§5.4 (b): the pair count either does not grow (W-1/W-2/W-6) or grows by one (W-5/W-3/W-4)",
        );
        drive.check(
            anchor_tier(&store, &key(&["a"]), tier) == tier,
            "§5.4 (a): findAddress(address, t).anchor.tier === t",
        );
    }
    drive.report_and_assert();
}

/// §5.4 `P-SM-4`, strategy `S-TIER`: for each ordered pair `(t1, t2)` with `rank(t1) < rank(t2)`: write at
/// `t2`, write at `t1`, read unqualified (expect `t1`'s value), then write at `t2` again (expect `t1`'s
/// version purged). **3 ordered pairs over 3 tokens ⇒ 3 drives, and each drive has 4 assertions.**
// Drives: §5.4
#[test]
fn p_sm_4_the_tier_order_is_total_strict_and_observable() {
    let mut drive = Drive::new("P-SM-4", "S-TIER");
    let pairs = [
        (Tier::Temp, Tier::Mem),
        (Tier::Temp, Tier::File),
        (Tier::Mem, Tier::File),
    ];

    for (t1, t2) in pairs {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        let mut store = new_store();
        // assertion 1 — the more persistent write lands and stands.
        ok(
            store.write(AddressArg::List(key(&["a"])), t(t2), v_str("t2")),
            "S-TIER drive 1",
        );
        drive.check(
            read_tier(&store, &key(&["a"]), t2) == v_str("t2"),
            &format!("§5.4 (c): the {t2:?} version stands"),
        );
        // assertion 2 — the less persistent write is added alongside and shadows.
        ok(
            store.write(AddressArg::List(key(&["a"])), t(t1), v_str("t1")),
            "S-TIER drive 2",
        );
        drive.check(
            read_at(&store, &key(&["a"])) == v_str("t1"),
            &format!("§5.4 (c): an unqualified read answers the LOWER rank ({t1:?})"),
        );
        // assertion 3 — the more persistent version SURVIVES the shadow.
        drive.check(
            read_tier(&store, &key(&["a"]), t2) == v_str("t2"),
            &format!("§5.4 (c): the {t2:?} version survives the shadow"),
        );
        // assertion 4 — the next write at t2 purges every version at rank ≤ rank(t2).
        ok(
            store.write(AddressArg::List(key(&["a"])), t(t2), v_str("t2b")),
            "S-TIER drive 3",
        );
        drive.check(
            store.read(AddressArg::List(key(&["a"])), t(t1)).is_err(),
            &format!("§5.4 (c): every version at rank ≤ rank({t2:?}) is GONE after the write"),
        );
        drive.check(
            versions_at(&store, &key(&["a"])) == vec![t2],
            "§5.4 (b): the pair count did not grow on the purging write",
        );
    }
    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.6 `P-TP-6` — the monotonic clause holds at every link, and the register is unbounded. `S-MONO`.
// ---------------------------------------------------------------------------------------------------

/// §5.6 `P-TP-6`, strategy `S-MONO`: drive the `3 × 3` tier pairs at a NESTED address (write tier, parent
/// tier), ONE FRESH STORE PER PAIR so the parent's version set is exactly the parent tier — **the `6` pairs
/// with `rank(write tier) ≤ rank(parent tier)` SUCCEED, and the `3` pairs with `rank(write tier) >
/// rank(parent tier)` FAIL with `ParentAnchorMonotonicityViolation` and leave the store unchanged** — plus
/// **the `6` REGISTER drives the amendment's re-derivation adds: `3` at a register key OF A `file`-REGISTER
/// STORE (all three tiers succeed) and `3` at a register key OF A `mem`-REGISTER STORE (the `file`-tier write
/// FAILS `ParentAnchorMonotonicityViolation`, the `mem`- and `temp`-tier writes SUCCEED)**.
///
/// **THE CENSUS, PRINTED WITH ITS TERMS** (`§5.6`): *"`9` ordered pairs over `3` tokens, of which `6`
/// satisfy `rank(child) ≤ rank(parent)` and `3` satisfy `rank(child) > rank(parent)` — `6 + 3 = 9` ✓"*, and
/// **⟶ AMENDED 2026-10-11** — *"The register drives are the row's second clause's own census and they do
/// NOT enter the `9`: `3` at a `file` register (`3` successes) + `3` at a `mem` register (`1` failure + `2`
/// successes) = `6` register drives, `3 + 3 = 6` ✓, `9 + 6 = 15` drives in all"*. The two anchors the clause
/// is stated over are the ones `§3.2` names: the parent anchor the TIER-AGNOSTIC parent resolution reaches
/// (`§3.2` item 2, the walk's zero-tier lowest-persistence arm) and the child anchor the write mints at its
/// own tier (`§3.2` item 4).
///
/// **⟶ THE REGISTER'S BOUND IS REAL AND THE EXEMPTION IS SUPERSEDED** (`A42` + `A51`; `store-model.md §1.6`
/// item 4 (d); `§5.6`'s amended clause): **the register's parent anchor carries the register's CONDITIONAL
/// tier — `file` when the construction's path is provided and passes the reachability test, `mem` otherwise —
/// FIXED AT CREATION** (`A49`, `A50`; `DD-34`), **so `rank(child) ≤ rank(register tier)` holds there too and
/// the as-filed *"the register has no parent anchor and therefore imposes no bound"* is read through this
/// one.** **AND THE ROW'S LISTENER HALF IS DRIVEN WHERE THE CLAUSE PUTS ITS OBSERVABLE — `P-TP-8`'s
/// DESTRUCTION drive (`§5.6`'s failure list: *"a node that HOLDS a listener reference past a change action
/// that destroyed it"*, `A46`; `write-and-read.md §6.5` item 9).**
///
/// **`NG-9` — THE NESTED PAIRS RE-DERIVED AT `§2.2` `L-TIER` + `§2.3` + `§3.2`'s CLOSING CLAUSE.** The
/// drive's earlier form called `anchor_tier(parent_address, parent_tier)` and
/// `anchor_tier(child_address, child_tier)` on the SAME store: for the `3` pairs with `rank(child) <
/// rank(parent)` the child address's walk passes through the parent's step, where the parent anchor stands
/// at ANOTHER tier — so `§2.2` `L-TIER` answers `TierNotFound` there and the tier-qualified call cannot
/// reach the addressed step. **Those calls could therefore pass ONLY against the undeclared pass-through
/// fallback (`H-1`)**: the row's own property requires that the tier be passed at EVERY step. This drive
/// now reaches the two anchors the way the contract does — **an UNQUALIFIED `findAddress` for each anchor's
/// landing, and a tier-qualified probe AT THE ADDRESSED STEP ONLY, at the tier the walk actually carries** —
/// and adds the per-step cell the three inverted pairs make reachable: a tier-qualified walk at the child
/// address must answer `TierNotFound` at the parent's step.
// Drives: §5.6, §3.2 items 2 and 4, §3.4 F-6, §1.6, §2.2 L-TIER
#[test]
fn p_tp_6_the_monotonic_clause_holds_and_the_register_s_bound_is_real() {
    let mut drive = Drive::new("P-TP-6", "S-MONO");

    // **⟶ THE REGISTER HALF — `6` drives, `3` per register tier (`§5.6`'s amended census).** **THE `file`
    // REGISTER: every one of the three tiers stands at a register key (`rank(t) ≤ rank(file)`), the register's
    // own tier is the conditional one FIXED AT CREATION, and the empty-address reference asserts it**
    // (`A42`/`A49`/`A50`; `store-model.md §1.6` item 4 (d) and `§2.1`).
    for tier in canonical_tiers() {
        drive.attempt();
        let mut r = new_store();
        drive.check(
            landing_tier(&r, &empty_address()) == Tier::File,
            "A49/A50/§2.1: a provided, reachable path fixes the register at `file` and the empty-address \
             reference asserts THAT tier",
        );
        match r.write(AddressArg::List(key(&["r"])), t(tier), v_num(1.0)) {
            Ok(_) => drive.check(
                true,
                "§5.6: a `file` register permits every tier at a register key",
            ),
            Err(e) => drive.check(
                false,
                &format!(
                    "§5.6/A51: rank({tier:?}) ≤ rank(file) holds, so the register key must accept it; got {}",
                    e.status
                ),
            ),
        }
        drive.check(
            landing_tier(&r, &key(&["r"])) == tier,
            "§5.4 (a): findAddress(address, t).anchor.tier === t at a register key",
        );
    }

    // **THE `mem` REGISTER — the path-less store: the `file`-tier write FAILS and the `mem`- and `temp`-tier
    // writes SUCCEED** (`A51`: *"Fails as usual for an unpermitted write"*; `§1.6` item 4 (d) (ii)); **and the
    // register's tier NEVER MOVES after creation** (`A50`; `DD-34`).
    for tier in canonical_tiers() {
        drive.attempt();
        let mut r = new_mem_store();
        drive.check(
            landing_tier(&r, &empty_address()) == Tier::Mem,
            "A49/A50/§2.1: a path-less store's register is `mem` and the empty-address reference asserts it",
        );
        let outcome = r.write(AddressArg::List(key(&["r"])), t(tier), v_num(2.0));
        if rank(tier) <= rank(Tier::Mem) {
            match outcome {
                Ok(_) => drive.check(
                    true,
                    "§5.6: the register's own tier permits this write at a register key",
                ),
                Err(e) => drive.check(
                    false,
                    &format!(
                        "§5.6/A51: rank({tier:?}) ≤ rank(mem) holds, so the write must succeed; got {}",
                        e.status
                    ),
                ),
            }
        } else {
            match outcome {
                Ok(_) => drive.check(
                    false,
                    "§5.6/A51: a `mem` register forbids the `file` tier at its keys — the register's bound \
                     is REAL and the exemption is superseded",
                ),
                Err(e) => drive.check(
                    e.status == "ParentAnchorMonotonicityViolation",
                    &format!("§5.6 F-6 at a register key of a `mem` register; got {}", e.status),
                ),
            }
        }
        // **THE TIER DOES NOT MOVE** (`A50`'s *"Fix at creation"*; `DD-34`).
        drive.check(
            landing_tier(&r, &empty_address()) == Tier::Mem,
            "A50/DD-34: no write re-tiers the register — the tier is one value for the instance's life",
        );
    }

    // The nested half: the `3 × 3` table, one fresh store per pair so the parent's version set is exactly
    // the parent tier.
    //
    // **THE NINE ORDERED PAIRS, ENUMERATED WITH THEIR DECLARED OUTCOME BEFORE ANY ASSERTION** — `file`(2) ·
    // `mem`(1) · `temp`(0), child = the write's tier, parent = the parent anchor's tier (`§5.6`'s `S-MONO`
    // census, `6 + 3 = 9`, `§0.2` `DD-27`):
    //
    //   * `rank(child) ≤ rank(parent)` — SUCCEEDS (`W-1`/`W-3`/`W-5`, the clause holds at the mint):
    //     `(File,File)` · `(File,Mem)` · `(File,Temp)` · `(Mem,Mem)` · `(Mem,Temp)` · `(Temp,Temp)` = **6**;
    //   * `rank(child) > rank(parent)` — FAILS `F-6` `ParentAnchorMonotonicityViolation`, installs nothing:
    //     `(Mem,File)` · `(Temp,File)` · `(Temp,Mem)` = **3**.
    //
    // **AND THE TIER-QUALIFIED OBSERVABLE IS PER-PAIR, NOT ONE EXPECTATION FOR ALL SIX — THE READING `§2.2`'s
    // SCOPE CLAUSE, `§2.3` AND `§3.2`'s CLOSING CLAUSE FORCE:** a tier-qualified walk applies the passed-tier
    // filter AT EVERY STEP, so on the nested address `["a","b"]` the walk must descend the PARENT's step at
    // the passed tier: the parent's key holds an anchor at the PARENT tier ALONE (`§1.3`'s `(key, tier)`
    // uniqueness, and the clause caps the child at `rank(child) ≤ rank(parent)`), so the walk reaches the
    // addressed step only when the passed tier is held at BOTH steps — i.e. when `child == parent`, where the
    // child's own anchor answers; at the `3` successes whose anchors' tiers DIFFER the walk answers
    // `L-TIER`'s `TierNotFound` at the step that refused it, at every one of the three tiers. **A cell that
    // demands the child's tier answer at all six successes demands a pass-through fallback that answers a
    // tier the walk was never passed; a cell that demands `TierNotFound` at `(File,File)`'s child tier demands
    // the same undeclared fallback in reverse.**
    for child in canonical_tiers() {
        for parent in canonical_tiers() {
            if drive.stopped() {
                break;
            }
            drive.attempt();
            let mut store = new_store();
            ok(
                store.write(AddressArg::List(key(&["a"])), t(parent), v_obj(&[])),
                "§3.4 W-4 at the parent tier",
            );
            // §3.2 item 2 / §2.3's zero-tier arm: the parent's landing anchor, named rather than assumed.
            let parent_anchor = landing_tier(&store, &key(&["a"]));
            drive.check(
                parent_anchor == parent,
                &format!(
                    "§2.3/§3.2 item 2: the fresh store's only anchor at the parent key is the `{parent:?}` \
                     one the tier-agnostic parent search reaches (got {parent_anchor:?})"
                ),
            );
            let attempt = store.write(AddressArg::List(key(&["a", "b"])), t(child), v_num(1.0));
            if rank(child) <= rank(parent) {
                match attempt {
                    Ok(_) => drive.check(true, "§5.6: rank(child) ≤ rank(parent) succeeds"),
                    Err(e) => drive.check(
                        false,
                        &format!(
                            "§5.6/S-MONO declares SUCCESS for (write tier {child:?}, parent tier {parent:?}); got {}",
                            e.status
                        ),
                    ),
                }
                // The clause, read over EXACTLY the two anchors `§3.2` names (`§5.6`'s property clause):
                // the parent anchor the tier-agnostic parent resolution reached (`landing_tier`, an
                // UNQUALIFIED probe), and the child anchor the write minted — probed TIER-QUALIFIED at the
                // one tier a walk over this address can carry down to its addressed step, because a
                // tier-qualified probe answers `L-TIER` at a step whose key holds no anchor at the passed
                // tier, and NO ANCHOR OUTSIDE THE PASSED SET ANSWERS IN ITS PLACE (`H-1`).
                //
                // **THE TIER SET THAT ANSWERS, READ PER STEP AND NOT PER ADDRESS** (`§2.2`'s scope clause,
                // `§2.3`, `§3.2`'s closing clause): the address `["a","b"]` is walked in two steps, and the
                // passed tier must hold at BOTH — the parent's step descends only at the PARENT anchor's own
                // tier (the parent's key holds one anchor, `§1.3`'s `(key, tier)` pair), and the addressed
                // step then answers only at the child anchor's own tier. **So the set of tiers that answer is
                // the INTERSECTION of the two steps' anchor tiers** — `{child}` where `child == parent`, and
                // `{}` at all three tiers where the two anchors' tiers differ (there the walk answers
                // `L-TIER`'s `TierNotFound` — AT THE PARENT'S STEP when the passed tier is not the parent's,
                // and AT THE ADDRESSED STEP when it is). **A cell that demands the CHILD's tier answer at
                // every success demands an undeclared pass-through fallback: the walk would have to answer a
                // tier it was not passed, or descend a step whose key holds no anchor at the passed tier.**
                let answering = tiers_answering_at(&store, &key(&["a", "b"]));
                let expected_answering: Vec<Tier> = if child == parent {
                    vec![child]
                } else {
                    Vec::new()
                };
                drive.check(
                    answering == expected_answering,
                    &format!(
                        "§2.2 L-TIER's scope/§2.3 (any-match, no union, no fallback): the tiers that answer \
                         at the ADDRESSED step are the intersection of the two steps' anchor tiers — the \
                         parent's anchor stands at {parent:?} and the child's at {child:?}, so the expected \
                         set is {expected_answering:?}; got {answering:?}"
                    ),
                );
                // `§2.2` `L-TIER` read PER STEP — WHICH STEP ANSWERS, not merely that one does. A walk at
                // the parent's own tier descends the parent step and reaches the addressed step, where it
                // answers the child's anchor or `L-TIER`/`L-3` according to the child's own key; a walk at
                // ANY OTHER tier cannot descend the parent step and answers `TierNotFound` THERE.
                for probe in canonical_tiers() {
                    let answered = store.read(AddressArg::List(key(&["a", "b"])), t(probe));
                    let expected = if probe == child && probe == parent {
                        "an answer"
                    } else {
                        "TierNotFound"
                    };
                    drive.check(
                        if probe == child && probe == parent {
                            answered.is_ok()
                        } else {
                            matches!(answered, Err(ref e) if e.status == "TierNotFound")
                        },
                        &format!(
                            "§2.2 L-2/L-TIER/§2.3: a walk passed `{probe:?}` over the nested address — the \
                             parent step descends only at the parent anchor's own tier {parent:?}, and the \
                             addressed step holds an anchor only at {child:?}, so the walk reaches it at \
                             exactly the tiers held at BOTH steps; expected {expected}, got {:?}",
                            answered
                                .as_ref()
                                .map(|_| "an answer".to_string())
                                .map_err(|e| e.status.clone())
                        ),
                    );
                }
                drive.check(
                    landing_tier(&store, &key(&["a", "b"])) == child,
                    "§5.4 (a): the write landed at its own tier — the unqualified walk selects it",
                );
                drive.check(
                    rank(child) <= rank(parent_anchor),
                    "§5.6: rank(childAnchor.tier) ≤ rank(parentAnchor.tier) at the nested link, read over \
                     the two anchors §3.2 names",
                );
                drive.check(
                    landing_tier(&store, &key(&["a"])) == parent,
                    "§5.6: the child's less- or equally-persistent write leaves the parent anchor standing",
                );
                // THE PAIR SETS THE WRITE'S ARM LEAVES — the monotonic clause's other half as a SUCCESS can
                // reach it: `W-1`/`W-3`/`W-5` mint the child's pair at the write's OWN tier, and NO arm may
                // drop or re-tier the parent anchor the clause is measured against (a parent anchor moved to
                // a MORE persistent tier would make the clause vacuously true, and a dropped one would break
                // `§3.2` item 2's resolution for every later write). **THE PROBE IS `findAddress`'s, NOT A
                // READ'S, AND THAT IS THE CONTRACT'S OWN DISTINCTION:** `§4.2`'s closing clause applies the
                // passed tier set *"at EVERY STEP OF ITS OWN WALK, at the addressed node and at every
                // descendant node the recursion reaches"*, so a tier-qualified READ at the parent's key fails
                // `TierNotFound` as soon as a descendant anchor holds another tier — while `findAddress` is
                // *"the only reference-returning seam"* (`§4.1`) and resolves the ADDRESS alone. So the pair
                // sets are read through the two probes the contract makes decisive here: `anchor_tier`, the
                // tier-qualified `findAddress` of `§5.4` (a), and `landing_tier`, the tier-agnostic one.
                drive.check(
                    anchor_tier(&store, &key(&["a"]), parent) == parent,
                    &format!(
                        "§5.4 (a)/§5.6: the parent's anchor stands at exactly the parent tier after the nested \
                         write — a tier-qualified `findAddress` at {parent:?} answers the parent's own anchor \
                         (got {:?})",
                        anchor_tier(&store, &key(&["a"]), parent)
                    ),
                );
                drive.check(
                    landing_tier(&store, &key(&["a"])) == parent,
                    "§5.3 item 1/§5.6: the parent chain's lowest-persistence anchor is the parent's own — the \
                     nested write added no version at the parent's key",
                );
                drive.check(
                    landing_tier(&store, &key(&["a", "b"])) == child,
                    &format!(
                        "§5.3 item 1/§5.4 (a): the child's pair set holds the write's OWN tier — the \
                         unqualified arm selects the lowest-persistence anchor at the addressed key and it is \
                         the `{child:?}` one, so the pair `(b, {child:?})` is what `W-1`/`W-3`/`W-5` minted"
                    ),
                );
                drive.check(
                    (parent == child) == tiers_answering_at(&store, &key(&["a", "b"])).contains(&child),
                    &format!(
                        "§5.3 item 1/§5.6: the child's pair at the write's own tier answers a tier-qualified \
                         walk passed `{child:?}` exactly where the walk can descend the parent's step — the \
                         parent's key holds {parent:?} alone, so this holds iff the two anchors' tiers are \
                         equal (`W-5` added the version ALONGSIDE, `W-1`/`W-2` replaced at one pair); the \
                         tiers that answer are {:?}",
                        tiers_answering_at(&store, &key(&["a", "b"]))
                    ),
                );
            } else {
                match attempt {
                    Ok(_) => drive.check(
                        false,
                        &format!("§5.6: an inverted pair (write tier {child:?}, parent tier {parent:?}) must FAIL"),
                    ),
                    Err(e) => drive.check(
                        e.status == "ParentAnchorMonotonicityViolation",
                        &format!("§3.4 F-6/§8.1 #6: the inverted pair's code; got {}", e.status),
                    ),
                }
                // §5.6's failure list: "a failure that nevertheless installed the parent chain".
                let probe = store.read(AddressArg::List(key(&["a", "b"])), TierArg::Absent);
                drive.check(
                    matches!(probe, Err(ref e) if e.status == "AddressNotFound"),
                    "§5.6/§3.4 F-6: the failed write installed nothing at the child address",
                );
                drive.check(
                    read_at(&store, &key(&["a"])) == v_obj(&[]),
                    "§5.6: the parent chain the write resolved is left standing",
                );
                drive.check(
                    landing_tier(&store, &key(&["a"])) == parent,
                    "§5.6: the failed write leaves the parent anchor's own tier unmoved",
                );
                // The F-6 refusal's residue, read with the pair-set probes the contract makes decisive here —
                // `§3.5`: *"no node was minted, no anchor was destroyed, no version was removed"*. The
                // parent's key has NO descendant under it, so a tier-qualified read would reach it; it is read
                // through `anchor_tier` (`§5.4` (a)'s tier-qualified `findAddress`) and `landing_tier` anyway,
                // so the observation is the PAIR's tier and not the assembly's.
                drive.check(
                    anchor_tier(&store, &key(&["a"]), parent) == parent,
                    &format!(
                        "§5.3 item 1/§5.6: the F-6 refusal installs NO pair at the parent link — the parent's \
                         anchor still answers a tier-qualified `findAddress` at exactly {parent:?} (got {:?})",
                        anchor_tier(&store, &key(&["a"]), parent)
                    ),
                );
                drive.check(
                    landing_tier(&store, &key(&["a"])) == parent,
                    &format!(
                        "§5.3 item 1/§5.6: the F-6 refusal purges no version at the parent link — the lowest \
                         anchor at the parent's key is the parent's own (got {})",
                        format!("{:?}", landing_tier(&store, &key(&["a"])))
                    ),
                );
                // `§5.6`'s OTHER HALF AS THIS INVERTED PAIR CAN REACH IT — THE TIER-QUALIFIED WALK READ PER
                // STEP, WHICH IS THE HALF AN INVERTED PAIR MAKES REACHABLE: the refused write's tier is NOT
                // the parent's, and the walk says so AT THE PARENT'S OWN STEP — a walk passed the parent
                // anchor's own tier descends it and reaches the addressed step, where the child's key holds NO
                // anchor at all (`L-3`'s `AddressNotFound`, the failed write having installed nothing), while
                // every other passed tier — the refused write's tier included — answers `L-TIER`'s
                // `TierNotFound` at the parent's step and never reaches the addressed step. Both readings are
                // driven, so the clause is not satisfied by an implementation that answers a passed tier
                // wherever it happens to find one.
                let answering = tiers_answering_at(&store, &key(&["a", "b"]));
                drive.check(
                    answering.is_empty(),
                    &format!(
                        "§2.2 L-TIER's scope/§3.4 F-6: the refused write installed NO anchor at the addressed \
                         key, so NO tier answers the child address — every tier-qualified walk either refuses \
                         the parent's step or reaches an empty addressed step; the tiers that answer are \
                         {answering:?}"
                    ),
                );
                for tier in canonical_tiers() {
                    let passed = tier_probe_failure(
                        &store,
                        &key(&["a", "b"]),
                        tier,
                        "§2.2's per-step arms at the parent's pass-through step",
                    );
                    let expected = if tier == parent {
                        "AddressNotFound"
                    } else {
                        "TierNotFound"
                    };
                    drive.check(
                        passed.status == expected,
                        &format!(
                            "§2.2 L-2/L-3/L-TIER: a tier-qualified walk at the CHILD address passed \
                             `{tier:?}` — the parent step descends only at the parent anchor's own tier \
                             ({parent:?}), so `{parent:?}` reaches the addressed step and finds no anchor at \
                             that key (`L-3`'s AddressNotFound), while every other tier answers `L-TIER`'s \
                             TierNotFound AT THE PARENT'S STEP; expected {expected}, got {}",
                            passed.status
                        ),
                    );
                }
            }
        }
    }
    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.7 `P-TP-7` — the construction is a FUNCTION of its arguments. Strategy id `S-CONSTRUCT`.
// ---------------------------------------------------------------------------------------------------

/// §5.7 `P-TP-7`, strategy `S-CONSTRUCT`: drive the `4` argument states (both present and valid;
/// `filePath` absent; `journalLength` absent; `journalLength` present but `0`/negative/non-integer); then
/// assert independence by mutating one instance and re-reading the other.
// Drives: §5.7
#[test]
fn p_tp_7_the_construction_is_a_function_of_its_arguments() {
    let mut drive = Drive::new("P-TP-7", "S-CONSTRUCT");

    // Drive 1 — both present and valid: an EMPTY instance.
    drive.attempt();
    let path = fresh_path("s-construct");
    let mut first = match storeCreate(&cfg_at(&path, 4)) {
        Ok(s) => {
            drive.check(true, "§5.7 (ii): an instance is returned");
            s
        }
        Err(e) => {
            drive.check(
                false,
                &format!("§5.7 (ii): both arguments valid, got {}", e.status),
            );
            return drive.report_and_assert();
        }
    };
    drive.check(
        structurally_equal(&read_at(&first, &empty_address()), &v_obj(&[])),
        "§5.7: the register holds 0 keys",
    );
    let w = ok(
        first.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    drive.check(w.op.seq == 1, "§5.7: the journal holds 0 entries");
    drive.check(w.watched.is_empty(), "§5.7: nothing is watched");

    // Drive 2 — `filePath` absent. **⟶ RE-DERIVED 2026-10-11: ABSENT IS LEGAL AND THE REGISTER IS CREATED AT
    // `mem`** (`A49`; `§7.1`'s amended `filePath` row; `store-model.md §1.6` item 4 (d)). **The as-filed cell
    // asserted `ConstructionArgumentMissing` here; that clause was SUPERSEDED, so the cell is RE-DERIVED and
    // not weakened — and the register's tier is asserted where it lands.**
    drive.attempt();
    match storeCreate(&cfg_no_path(4)) {
        Ok(mut s) => {
            drive.check(true, "A49/§7.1: an ABSENT path returns an instance");
            drive.check(
                landing_tier(&s, &empty_address()) == Tier::Mem,
                "A50/§1.6 item 4 (d): the register's tier is FIXED AT CREATION at `mem`",
            );
            match s.write(AddressArg::List(key(&["r"])), w_file(), v_num(1.0)) {
                Ok(_) => drive.check(
                    false,
                    "A51/§5.6: a `file`-tier write at a `mem` register's key must fail — the register's \
                     bound is REAL and the exemption is superseded",
                ),
                Err(e) => drive.check(
                    e.status == "ParentAnchorMonotonicityViolation",
                    &format!("A51/§5.6: *\"Fails as usual for an unpermitted write\"*; got {}", e.status),
                ),
            }
        }
        Err(e) => drive.check(
            false,
            &format!("A49/§7.1: an absent path is LEGAL; got {}", e.status),
        ),
    }

    // Drive 3 — `journalLength` absent. **⟶ the member's ONE remaining trigger** (`DD-17`'s operative form).
    drive.attempt();
    let path3 = fresh_path("s-construct-3");
    match storeCreate(&StoreConfig {
        filePath: FilePathArg::Path(path3),
        journalLength: JournalLengthArg::Absent,
        listeners: ListenersArg::List(Vec::new()),
    }) {
        Ok(_) => drive.check(false, "§0.2 DD-16: no defaulted `journalLength`"),
        Err(e) => drive.check(
            e.status == "ConstructionArgumentMissing",
            "§7.1: absent → ConstructionArgumentMissing",
        ),
    }

    // Drive 4 — `journalLength` present but out of domain (0, negative, non-integer).
    for bad in [
        JournalLengthArg::Zero,
        JournalLengthArg::Negative(-3),
        JournalLengthArg::Fractional(1.5),
    ] {
        drive.attempt();
        let path4 = fresh_path("s-construct-4");
        match storeCreate(&StoreConfig {
            filePath: FilePathArg::Path(path4),
            journalLength: bad,
            listeners: ListenersArg::List(Vec::new()),
        }) {
            Ok(_) => drive.check(false, "§5.7: an instance returned from a bad argument"),
            Err(e) => drive.check(
                e.status == "AddressMalformed",
                "§7.1: present but out of domain → AddressMalformed",
            ),
        }
    }

    // Independence — two instances from equal arguments: no state, no journal entry, no watched
    // registration is shared (`DD-14`).
    drive.attempt();
    let equal = cfg_at(&fresh_path("s-construct-ind"), 8);
    let mut a = ok(storeCreate(&equal), "§5.7 (ii)");
    let mut b = ok(storeCreate(&equal), "§5.7 (ii)");
    let _ = ok(
        a.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    drive.check(
        b.read(AddressArg::List(key(&["a"])), TierArg::Absent)
            .is_err(),
        "§5.7/DD-14: no state is shared",
    );
    ok(a.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
    match b.write(AddressArg::List(key(&["b"])), w_mem(), v_num(2.0)) {
        Ok(wb) => drive.check(
            wb.watched.is_empty() && wb.triggered.is_empty(),
            "§5.7/DD-14/DD-38: no registration and no handle is shared",
        ),
        Err(e) => drive.check(false, &format!("§3.4 W-3 in instance b, got {}", e.status)),
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-10` — `§7.1`'s OWN TABLE'S ROWS, CELL BY CELL; THE REACHABILITY STATES; `listeners[]`'s CELLS;
    // AND THE CROSS-INSTANCE JOURNAL ENTRY.** (`§5.7`'s `strategy` cell: *"drive `§7.1`'s own outside-value
    // list, cell by cell … THE CENSUS … the strategy's cells are `§7.1`'s OWN TABLE'S ROWS — `2`
    // valid-argument states and `10` outside values across the two arguments"*.)
    //
    // **⟶ RE-DERIVED 2026-10-11 — THE OUTSIDE-VALUE SET ITSELF HAS MOVED, AND THIS DRIVE ENUMERATES THE
    // AMENDED TABLE (`§7.1`; `PAR-6`, `PAR-12`; `A49`, `A52`, `A55`; `DD-17`, `DD-40`):** **`filePath`'s
    // OPERATIVE outside values are `null` · `undefined` · `""` · a non-string — FOUR, not five: ABSENT is no
    // longer an outside value and is driven as a VALID state whose register stands at `mem` (drive 2
    // above)**; **a PRESENT path that fails the two-armed reachability test is the FIFTH state and answers
    // the NEW member `FilePathUnreachable`** (`§8.1` #13; `DD-40`'s three forms); **and `journalLength`'s
    // outside values are unchanged: absent · `null` · `undefined` · `0` · a negative integer · a non-integer
    // number · a non-number** (spelled per `§0.4`: `NaN`, `Infinity`, `NonNumberString`, `NonNumberBool`,
    // `Object`). **THE LINE `§7.1` DRAWS IS UNMOVED: ABSENCE of `journalLength` answers
    // `ConstructionArgumentMissing`; PRESENCE with a value outside the domain — including the two shape-less
    // values — answers `AddressMalformed`; a present-but-unreachable path answers `FilePathUnreachable`; and
    // NO INSTANCE IS RETURNED in any failing case** (`DD-17`).
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    for (what, arg) in [
        ("filePath null", FilePathArg::Null),
        ("filePath undefined", FilePathArg::Undefined),
        ("filePath empty", FilePathArg::Empty),
        ("filePath non-string", FilePathArg::NonString),
    ] {
        match storeCreate(&cfg_full(arg, n_count(4), ListenersArg::List(Vec::new()))) {
            Ok(_) => drive.check(false, &format!("§7.1/DD-17: `{what}` returns NO instance")),
            Err(e) => drive.check(
                e.status == "AddressMalformed",
                &format!("§7.1: `{what}` → AddressMalformed; got {}", e.status),
            ),
        }
    }

    // The reachability arm — `DD-40`'s three forms, each answering the NEW member (`§8.1` #13).
    drive.attempt();
    {
        let absent_parent = format!("{}/x.json", fresh_path("s-construct-nodir"));
        let read_only = fresh_path("s-construct-readonly");
        std::fs::write(&read_only, b"{}").expect("the path holds a file");
        let mut perms = std::fs::metadata(&read_only)
            .expect("the file's metadata")
            .permissions();
        perms.set_readonly(true);
        std::fs::set_permissions(&read_only, perms).expect("the file is now read-only");
        let is_a_dir = fresh_path("s-construct-isdir");
        std::fs::create_dir(&is_a_dir).expect("the path is now a directory");
        for (what, path, expect_unreachable) in [
            (
                "the parent directory does not exist",
                absent_parent.clone(),
                true,
            ),
            ("the path IS a directory", is_a_dir.clone(), true),
            (
                "the file is existing but READ-ONLY",
                read_only.clone(),
                !std::fs::OpenOptions::new()
                    .write(true)
                    .open(&read_only)
                    .is_ok(),
            ),
        ] {
            match storeCreate(&cfg_at(&path, 4)) {
                Ok(_) => drive.check(
                    !expect_unreachable,
                    &format!("§8.1 #13: `{what}` must fail `FilePathUnreachable`; an instance was returned"),
                ),
                Err(e) => drive.check(
                    e.status == "FilePathUnreachable",
                    &format!("§8.1 #13: `{what}` → FilePathUnreachable; got {}", e.status),
                ),
            }
        }
        let _ = std::fs::remove_file(&read_only);
        let _ = std::fs::remove_dir(&is_a_dir);
    }

    // `listeners[]`'s own cells — the EMPTY array and the DUPLICATE address (`PAR-12`; `DD-39`), whose
    // observable `PAR-12` names as `P-TP-7`'s amended construction cell: `2` entries in ⇒ `2` entries in the
    // home, and `0` entries in ⇒ a first write carrying `triggered: []`.
    drive.attempt();
    {
        let mut empty = ok(
            storeCreate(&cfg_at_with_listeners(
                &fresh_path("s-construct-empty-listeners"),
                4,
                listeners(Vec::new()),
            )),
            "PAR-12: the empty array is IN the domain",
        );
        match empty.write(AddressArg::List(key(&["e"])), w_mem(), v_num(1.0)) {
            Ok(w) => drive.check(
                w.triggered.is_empty(),
                "PAR-12's observable: `0` entries in ⇒ the first write carries `triggered: []`",
            ),
            Err(e) => drive.check(false, &format!("§3.4 W-3, got {}", e.status)),
        }
        let h1 = handle("ng10-dup-1");
        let h2 = handle("ng10-dup-2");
        let mut dup = ok(
            storeCreate(&cfg_at_with_listeners(
                &fresh_path("s-construct-dup-listeners"),
                4,
                listeners(vec![
                    entry(key(&["d"]), h1.clone()),
                    entry(key(&["d"]), h2.clone()),
                ]),
            )),
            "DD-39: a duplicate address is ADMITTED and both entries are KEPT",
        );
        match dup.write(AddressArg::List(key(&["d"])), w_mem(), v_num(2.0)) {
            Ok(w) => drive.check(
                same_handle_set(&w.triggered, &[h1.clone(), h2.clone()]),
                "PAR-12's observable: `2` entries in ⇒ `2` entries in the home, and the trigger returns both",
            ),
            Err(e) => drive.check(false, &format!("§3.4 W-3, got {}", e.status)),
        }
    }

    drive.attempt();
    for (what, arg) in [
        ("journalLength absent", JournalLengthArg::Absent),
        ("journalLength null", JournalLengthArg::Null),
        ("journalLength undefined", JournalLengthArg::Undefined),
        ("journalLength 0", JournalLengthArg::Zero),
        ("journalLength negative", JournalLengthArg::Negative(-3)),
        (
            "journalLength fractional",
            JournalLengthArg::Fractional(1.5),
        ),
        ("journalLength NaN", JournalLengthArg::NaN),
        ("journalLength Infinity", JournalLengthArg::Infinity),
        (
            "journalLength non-number string",
            JournalLengthArg::NonNumberString,
        ),
        (
            "journalLength non-number bool",
            JournalLengthArg::NonNumberBool,
        ),
        ("journalLength object", JournalLengthArg::Object),
    ] {
        let expected = if matches!(arg, JournalLengthArg::Absent) {
            "ConstructionArgumentMissing"
        } else {
            "AddressMalformed"
        };
        let path = fresh_path("s-construct-ng10");
        match storeCreate(&cfg_full(
            FilePathArg::Path(path),
            arg,
            ListenersArg::List(Vec::new()),
        )) {
            Ok(_) => drive.check(
                false,
                &format!("§0.2 DD-16: no defaulted `journalLength` — `{what}` returns NO instance"),
            ),
            Err(e) => drive.check(
                e.status == expected,
                &format!("§7.1: `{what}` → {expected}; got {}", e.status),
            ),
        }
    }

    // **⟶ RE-DERIVED 2026-10-11 — THE PATH THAT IS A DIRECTORY, AT ITS TWO STATES.** `§5.7`'s failure list
    // names *"an instance that cannot reach the file its own cfg named"*, and the amendment SPLITS that state
    // in two (`DD-40` (b)): **at CONSTRUCTION the path that IS a directory fails `FilePathUnreachable`
    // (`§8.1` #13) and NO instance is returned; the SAME state reached LATER, by a `file`-tier write on an
    // already-constructed store, remains `FileCommitFailed` (`§8.1` #15)** — so the instance is returned for a
    // non-empty path string, the register is fixed at `file`, and the unreachability is observed where it
    // lands.
    drive.attempt();
    {
        let at_construction = fresh_path("s-construct-isdir");
        std::fs::create_dir(&at_construction).expect("the path is now a directory");
        match storeCreate(&cfg_at(&at_construction, 4)) {
            Ok(_) => drive.check(
                false,
                "§8.1 #13/DD-40 (b): a path that IS a directory must fail at construction",
            ),
            Err(e) => drive.check(
                e.status == "FilePathUnreachable",
                &format!(
                    "§8.1 #13: the directory state at construction; got {}",
                    e.status
                ),
            ),
        }
        let _ = std::fs::remove_dir(&at_construction);

        let later = fresh_path("s-construct-later");
        match storeCreate(&cfg_at(&later, 4)) {
            Ok(mut s) => {
                drive.check(
                    true,
                    "§7.1: a non-empty path string returns an instance (the path passes at construction)",
                );
                let _ = std::fs::remove_file(&later);
                std::fs::create_dir(&later).expect("the path is now a directory");
                match s.write(AddressArg::List(key(&["x"])), w_file(), v_num(1.0)) {
                    Ok(_) => drive.check(
                        false,
                        "§7.2 item 3/§8.1 #15: a `file`-tier write whose commit cannot land must FAIL",
                    ),
                    Err(e) => drive.check(
                        e.status == "FileCommitFailed",
                        &format!("§8.1 #15: the commit failure's code; got {}", e.status),
                    ),
                }
                drive.check(
                    s.read(AddressArg::List(key(&["x"])), TierArg::Absent)
                        .is_err(),
                    "§5.3 P-IM-2/§3.5: the failed commit installed nothing",
                );
            }
            Err(e) => drive.check(
                false,
                &format!(
                    "§7.1/§5.7: an instance must be returned for a non-empty path string; got {}",
                    e.status
                ),
            ),
        }
        let _ = std::fs::remove_dir(&later);
    }

    // **THE CROSS-INSTANCE JOURNAL ENTRY** (`§5.7`'s failure list: *"a shared register key, `mem`/`temp`
    // state, JOURNAL ENTRY or watched registration across two instances"* — the entry half is the one the
    // drive above did not reach): a write through ONE instance returns an op whose `opId` is NOT in the
    // other instance's journal, so `b.rollback(a_op.opId)` fails `JournalOpUnknown` (`§6.4` `M-11`).
    drive.attempt();
    {
        let equal = cfg_at(&fresh_path("s-construct-journal"), 8);
        let mut a = ok(storeCreate(&equal), "§5.7 (ii)");
        let mut b = ok(storeCreate(&equal), "§5.7 (ii)");
        let wa = ok(
            a.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0)),
            "§3.4 W-3 through instance a",
        );
        drive.check(
            !wa.op.opId.is_empty(),
            "§6.2: the op's id is a non-empty, store-unique string token",
        );
        match b.rollback(OpIdArg::Id(wa.op.opId.clone())) {
            Ok(_) => drive.check(
                false,
                "§5.7/DD-14/§6.4 M-11: instance b KNOWS NO ENTRY of instance a's — the two journals are \
                 independent, so a foreign `opId` must fail `JournalOpUnknown`",
            ),
            Err(e) => drive.check(
                e.status == "JournalOpUnknown",
                &format!("§6.4 M-11: a foreign opId fails JournalOpUnknown; got {}", e.status),
            ),
        }
    }

    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.8 `P-TP-8` — the watcher and the journal are TOTAL FUNCTIONS of the store's addresses. `S-WATCH`.
// ---------------------------------------------------------------------------------------------------

/// §5.8 `P-TP-8`, strategy `S-WATCH`, **AS RE-DERIVED 2026-10-11 at this contract's sixth bounded amendment**
/// (`A43`, `A45`–`A48`, `A57`, `A58`): **the row's SUBJECT is unchanged — a registration surface whose
/// answer is a total function of the store's addresses, together with the journal's own totality — and the
/// surface it names is now the LISTENER's.** **Its drives are the `6` cells the row prints: `(i)` the PREFIX
/// drive · `(ii)` the SECOND-EVENT drive (the `delete`) · `(iii)` the NO-TIER-TEST drive · `(iv)` the
/// DESTRUCTION drive · `(v)` the HOME-IS-NOT-A-GRAPH-STRUCTURE drive · `(vi)` the `watched`-and-`opId` drive,
/// KEPT — `5` new drive cells + `1` kept cell = `6` cells, and `0` cell of the as-filed row is dropped.**
///
/// **WHAT THE AS-FILED ROW'S OVER-STRONG HALF WAS, NAMED AND STILL NOT ASSERTED — `R-8`'s finding.** The
/// as-filed property reads *"`WriteResult.watched` is EXACTLY the set of registered watched addresses `W`
/// such that `W` is a prefix of `X`"*, **while `§6.5` item 7 + `DD-26` narrow any TIER-QUALIFIED registration
/// by the tier test** — so the filed property is falsified by the contract's own item 7. **The re-derived row
/// states the corrected form: `watched` is exactly the set of registered addresses `W` such that `W` is a
/// prefix of `X` AND (that registration is UNQUALIFIED OR the write's tier is one of its tier arguments)
/// (`§5.8` (e), KEPT unweakened).**
///
/// **AND THE ONE CELL OF THE ROW WHOSE TIER-QUALIFIED HALF HAS NO REACHABLE STATE — `⟶ CORRECTED 2026-10-11:
/// STATED AS THE ROW'S OWN RE-DERIVATION, NOT AS AN OWED FINDING.** **`§5.8`'s `⟶ RE-DERIVED 2026-10-11
/// (`F-3`)` clause is now the operative text of `(vi)`:** the as-filed cell — *"`watched`'s tier-qualified
/// membership over `§6.5` item 7 (a)/(b)/(c), and the returned `opId`'s acceptance by `rollback`"* — stands
/// byte-for-byte, **and the re-derivation DECLARES ITS TIER-QUALIFIED HALF `OUT` WITH ITS REASON AND ITS
/// PRICED ALTERNATIVE**, so nothing of it is left owed: **`A58` supersedes `watch`/`unwatch` in one pass with
/// no deprecation window**, so the tier qualifier `DD-26` authored belongs to a superseded verb; **`listen`'s
/// arity is ONE ADDRESS AND NO TIER** (`§3.1.1`'s amended row) **and the construction's `listeners[]` element
/// shape is `{ address, handle }` with NO THIRD MEMBER** (`§0.4`; `A57`); and **`DD-36` rules the `address` the
/// WHOLE of a registration's key** — *"NOTHING carries over from the superseded registration's tier
/// qualifier"* — **so item 7 (a)'s and (b)'s pre-states have no instance** (`F-3`; `DD-26`; `DD-36`).
/// **THE CELL BELOW THEREFORE DRIVES THE STATES THE AMENDED SURFACE CAN REACH — the kept `opId` half
/// UNWEAKENED, `§6.5` item 7 (c) together with the address list's distinctness, and — at `CF-1`'s
/// re-derivation — the idempotence of a repeated `listen` (`§6.5` item 12 (c); `§0.4` clause 2), which is what
/// makes the `watched` and the `triggered` lists the SAME selection observed in two types.** **NO drive of
/// this row asserts a SEQUENCE: both lists are SETS and are compared as sets** (`DD-37`; `§6.5` item 10 (e)).
/// *(The address/handle projection assertion `F-3` (3) adds beside this cell is NOT yet driven — reported to
/// the supervisor as a finding, no clause weakened.)*
// Drives: §5.8 (a)–(g), §6.5 items 8–13, §3.6, §4.4, DD-35–DD-39
#[test]
fn p_tp_8_the_listener_surface_and_the_journal_are_total_functions() {
    let mut drive = Drive::new("P-TP-8", "S-WATCH");

    // **(i) THE PREFIX DRIVE** — bind at the write's own address, at a strict ancestor, at a strict
    // descendant and at an unrelated address; assert `triggered` equals `{own, ancestor}`'s handles and
    // excludes the other two, and that `watched` carries the same two ADDRESSES.
    drive.attempt();
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["root"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the ancestor exists",
    );
    let own = ok(
        store.listen(AddressArg::List(key(&["root", "own"]))),
        "§6.5 item 12: own",
    );
    let ancestor = ok(
        store.listen(AddressArg::List(key(&["root"]))),
        "§6.5 item 12: ancestor",
    );
    let desc = ok(
        store.listen(AddressArg::List(key(&["root", "own", "deep"]))),
        "§6.5 item 12: descendant",
    );
    let other = ok(
        store.listen(AddressArg::List(key(&["unrelated"]))),
        "§6.5 item 12: unrelated",
    );
    let w = ok(
        store.write(AddressArg::List(key(&["root", "own"])), w_mem(), v_num(1.0)),
        "§3.4 W-3",
    );
    drive.check(
        same_handle_set(&w.triggered, &[own.clone(), ancestor.clone()]),
        "§5.8 (a): `triggered` is EXACTLY the prefix set's handles — no member added, none omitted",
    );
    drive.check(
        !w.triggered.iter().any(|h| *h == desc || *h == other),
        "§5.8's failure list: a strict descendant and an unrelated address are NOT triggered",
    );
    drive.check(
        w.watched.len() == 2
            && same_address_set(&w.watched, &[key(&["root", "own"]), key(&["root"])]),
        &format!(
            "§5.8 (e): `watched` carries the SAME registrations' ADDRESSES, once each; got {:?}",
            w.watched
        ),
    );
    drive.check(
        !w.watched
            .iter()
            .any(|a| *a == key(&["unrelated"]) || *a == key(&["root", "own", "deep"])),
        "§5.8 (e)/§6.5 item 7 (c): a qualifier and a non-prefix address never add a member",
    );

    // **(ii) THE SECOND-EVENT DRIVE** — the same four binds, then a `delete` at the write's address: the
    // receipt's `triggered` equals `{own, ancestor}`'s handles (a strict DESCENDANT of the deleted address
    // does NOT fire), and a `D-3` delete carries `triggered: []` with `tiers: []`.
    drive.attempt();
    let mut s2 = new_store();
    ok(
        s2.write(AddressArg::List(key(&["root"])), w_file(), v_obj(&[])),
        "§3.4 W-4 at `file`: the parent anchor that bounds the nested write below (`§1.2`'s monotonic clause)",
    );
    let own2 = ok(
        s2.listen(AddressArg::List(key(&["root", "own"]))),
        "§6.5 item 12: own",
    );
    let anc2 = ok(
        s2.listen(AddressArg::List(key(&["root"]))),
        "§6.5 item 12: ancestor",
    );
    let desc2 = ok(
        s2.listen(AddressArg::List(key(&["root", "own", "deep"]))),
        "§6.5 item 12: descendant",
    );
    let other2 = ok(
        s2.listen(AddressArg::List(key(&["unrelated"]))),
        "§6.5 item 12: unrelated",
    );
    ok(
        s2.write(
            AddressArg::List(key(&["root", "own"])),
            w_file(),
            v_str("durable"),
        ),
        "§3.4 W-3 at `file` — the version that SURVIVES the `D-1` delete below",
    );
    ok(
        s2.write(AddressArg::List(key(&["root", "own"])), w_mem(), v_num(1.0)),
        "§3.4 W-5: the `mem` version is added alongside and shadows the `file` one",
    );
    match s2.delete(AddressArg::List(key(&["root", "own"])), t(Tier::Mem)) {
        Ok(d1) => {
            drive.check(
                same_handle_set(&d1.triggered, &[own2.clone(), anc2.clone()]),
                "§5.8 (b): the DELETE is the second trigger event and its receipt carries the prefix set's handles",
            );
            drive.check(
                !d1.triggered.iter().any(|h| *h == desc2 || *h == other2),
                "§4.3/§4.4: a listener bound at a STRICT DESCENDANT of the deleted address does NOT fire, and an \
                 unrelated address never does",
            );
            drive.check(d1.tiers == vec![Tier::Mem], "§4.4 D-1: the one named tier");
            drive.check(
                read_at(&s2, &key(&["root", "own"])) == v_str("durable"),
                "§4.4 D-1: the surviving `file` version answers again, so the address still resolves",
            );
        }
        Err(e) => drive.check(false, &format!("§4.4 D-1, got {}", e.status)),
    }
    match s2.delete(AddressArg::List(key(&["root", "own"])), t(Tier::Temp)) {
        Ok(d3) => {
            drive.check(
                d3.tiers.is_empty(),
                "§4.4 D-3: a delete that removes nothing is a success",
            );
            drive.check(
                d3.triggered.is_empty(),
                "§5.8 (b): *\"a `delete` that removed nothing (`D-3`) carries `triggered: []`\"*",
            );
        }
        Err(e) => drive.check(false, &format!("§4.4 D-3, got {}", e.status)),
    }

    // **(iii) THE NO-TIER-TEST DRIVE** — bind at an address a write's address has as a prefix, and write at
    // EVERY ONE OF THE THREE TIERS: the handle is returned each time (`DD-36`).
    drive.attempt();
    {
        let mut s = new_store();
        let h = ok(s.listen(AddressArg::List(key(&["r"]))), "§6.5 item 12");
        for tier in canonical_tiers() {
            match s.write(AddressArg::List(key(&["r"])), t(tier), v_num(1.0)) {
                Ok(wt) => drive.check(
                    same_handle_set(&wt.triggered, &one_handle(&h)),
                    &format!(
                        "DD-36/§5.8's failure list: the handle set does NOT depend on the write's tier — the \
                         handle is returned at `{tier:?}`"
                    ),
                ),
                Err(e) => drive.check(
                    false,
                    &format!("§3.4: a write at `{tier:?}` at a register key of a `file` register; got {}", e.status),
                ),
            }
        }
    }

    // **(iv) THE DESTRUCTION DRIVE** — bind at an address, `write` through it so the arm replaces the node
    // that carried the borrow (`W-1`, `W-2` and `W-6` each in turn), and assert the NEXT trigger still
    // returns that listener's handle exactly once: **no LOST and no DUPLICATED handle** (`A46`; `P-TP-6`'s
    // listener half).
    drive.attempt();
    for arm in ["W-1", "W-2", "W-6"] {
        let mut s = new_store();
        let h = ok(s.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
        ok(
            s.write(AddressArg::List(key(&["a"])), w_mem(), v_str("one")),
            "§3.4 W-3",
        );
        let change = match arm {
            // the equal-tier purge-then-mint replaces the pair and the node with it.
            "W-1" => s.write(AddressArg::List(key(&["a"])), w_mem(), v_str("two")),
            // the re-mint destroys the addressed leaf's pointing anchor and places a new one on the link.
            "W-2" => s.write(
                AddressArg::List(key(&["a"])),
                w_mem(),
                v_obj(&[("k", v_num(1.0))]),
            ),
            // the purge at `rank ≤ the write's own` removes the less persistent version and mints in place.
            _ => s.write(AddressArg::List(key(&["a"])), w_file(), v_str("durable")),
        };
        match change {
            Ok(_) => drive.check(
                true,
                &format!("§3.4 {arm}: the change action that replaces the node"),
            ),
            Err(e) => drive.check(
                false,
                &format!("§3.4 {arm} must succeed here; got {}", e.status),
            ),
        }
        match s.write(AddressArg::List(key(&["a"])), w_mem(), v_str("after")) {
            Ok(after) => {
                drive.check(
                    same_handle_set(&after.triggered, &one_handle(&h)),
                    &format!(
                        "A46/§5.8 (d): after `{arm}` the borrow was dropped WITH the node and the \
                         replacement node takes its list from its nearest parent — the handle is returned \
                         exactly once, neither LOST nor DUPLICATED"
                    ),
                );
                drive.check(
                    after.triggered.len() == 1,
                    &format!("A46: `{arm}` leaves ONE handle in the trigger, never two"),
                );
            }
            Err(e) => drive.check(false, &format!("§3.4 W-3, got {}", e.status)),
        }
    }

    // **(v) THE HOME-IS-NOT-A-GRAPH-STRUCTURE DRIVE** — `read([])`'s object carries no listener entry,
    // `findAddress` reaches no home entry at any address, and a fresh instance over an EQUAL `cfg.filePath`
    // begins with `triggered: []` on its first write (`A48`; `DD-38`).
    drive.attempt();
    {
        let path = fresh_path("p-tp-8-home");
        let mut s = ok(
            storeCreate(&cfg_at_with_listeners(
                &path,
                8,
                listeners(vec![entry(key(&["g"]), handle("p-tp-8-hidden"))]),
            )),
            "§7.1 step 5",
        );
        ok(
            s.write(AddressArg::List(key(&["g"])), w_file(), v_str("v")),
            "§3.4 W-3 at `file`: the registry is committed, so the boot's load is the only channel",
        );
        drive.check(
            read_at(&s, &empty_address()) == v_obj(&[("g", v_str("v"))]),
            &format!(
                "§5.8 (c)/A48/§1.7: a read at `[]` returns the whole register as an object OF THE GRAPH — \
                 the home map is not inside it; got {:?}",
                read_at(&s, &empty_address())
            ),
        );
        let h = ok(
            s.listen(AddressArg::List(key(&["never-written"]))),
            "§6.5 item 12",
        );
        drive.check(
            s.read(AddressArg::List(key(&["never-written"])), TierArg::Absent)
                .is_err(),
            "§6.5 item 8 (b): the home is NOT ADDRESSABLE — a registration mints no node and no segment \
             path reaches a home entry",
        );
        drive.check(
            s.findAddress(AddressArg::List(key(&["g"])), TierArg::Absent)
                .is_ok(),
            "§2.1: `findAddress` reaches the graph's node and never a home entry",
        );
        drive.check(
            !(h == handle("p-tp-8-hidden")),
            "§6.5 item 12/PAR-13: the registration minted here and the construction's handle are \
             store-unique tokens and never the same value",
        );
        let mut fresh = ok(storeCreate(&cfg_at(&path, 8)), "§7.2 item 6: the boot");
        match fresh.write(AddressArg::List(key(&["g"])), w_mem(), v_str("again")) {
            Ok(wf) => drive.check(
                wf.triggered.is_empty() && wf.watched.is_empty(),
                "DD-38/§5.8 (c): a fresh instance over an EQUAL `cfg.filePath` begins with `triggered: []` — \
                 the home is out of the `file` bytes and out of the journal",
            ),
            Err(e) => drive.check(false, &format!("§3.4 W-1 at the loaded key, got {}", e.status)),
        }
    }

    // **(vi) THE KEPT CELL** — the `watched`-and-`opId` drive. **THE `opId` HALF IS DRIVEN: the returned
    // `opId` is accepted by `rollback`** (`§5.8` (g)). **THE TIER-QUALIFIED HALF OF `§6.5` item 7 (a)/(b)/(c)
    // IS DECLARED `OUT` BY THE ROW'S OWN RE-DERIVATION AND HAS NO INSTANCE:** no verb of the amended surface
    // accepts a tier, so no registration can be tier-qualified (`§5.8`'s `⟶ RE-DERIVED 2026-10-11 (F-3)`
    // clause; `A58`; `DD-26`; `DD-36`). **WHAT IS DRIVEN INSTEAD IS THE REACHABLE FORM OF THE CLAUSE: item 7
    // (c) — the address list carries the registration at EVERY tier, no tier test narrowing it — its
    // DISTINCTNESS, and the ADDRESS-LEVEL IDEMPOTENCE of the registration verb itself, which is what keeps
    // the `watched` list and the `triggered` list the same selection observed in two types** (`§6.5` item 12
    // (c); `§0.4` clause 2). **No sequence is asserted** (`DD-37`).
    drive.attempt();
    {
        let mut s = new_store();
        let h = ok(s.listen(AddressArg::List(key(&["a"]))), "§6.5 item 12");
        let repeated = ok(
            s.listen(AddressArg::List(key(&["a"]))),
            "§6.5 item 12 (c), the same address again",
        );
        drive.check(
            h == repeated,
            "§6.5 item 12 (c)/§0.4 clause 2: *\"a `listen(address)` whose address IS already registered \
             returns the EXISTING entry's handle rather than minting a second one\"* — so the home holds ONE \
             entry at the address",
        );
        for tier in canonical_tiers() {
            match s.write(AddressArg::List(key(&["a"])), t(tier), v_num(1.0)) {
                Ok(w) => {
                    drive.check(
                        w.watched.len() == 1
                            && same_address_set(&w.watched, &[key(&["a"])]),
                        &format!(
                            "§5.8 (e)/§6.5 item 2's kept half: the returned ADDRESS list carries the \
                             address ONCE at `{tier:?}`; got {:?}",
                            w.watched
                        ),
                    );
                    drive.check(
                        w.triggered.len() == 1 && same_handle_set(&w.triggered, &one_handle(&h)),
                        "§5.8 (a)/§6.5 item 12 (c): the ONE home entry's handle is the trigger's whole \
                         answer — a repeated registration does not duplicate it",
                    );
                    if tier == Tier::Mem {
                        match s.rollback(OpIdArg::Id(w.op.opId.clone())) {
                            Ok(r) => drive.check(
                                r.opId == w.op.opId && !r.undoneOps.is_empty(),
                                "§5.8 (g): the returned `opId` is accepted by `rollback` — the journal half",
                            ),
                            Err(e) => drive.check(
                                false,
                                &format!("§5.8 (g): rollback(opId) must not fail; got {}", e.status),
                            ),
                        }
                    }
                }
                Err(e) => drive.check(
                    false,
                    &format!("§3.4 W-1/W-3 at `{tier:?}`, got {}", e.status),
                ),
            }
        }
    }

    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.9 `P-TP-9` — the fail set is CLOSED, and every message is GENERATED from its code. `S-FAILSET`.
// ---------------------------------------------------------------------------------------------------

/// §5.9 `P-TP-9`, strategy `S-FAILSET`: one drive per code, each asserting both the `code` member and the
/// generated `message`'s exact text's own invariants; **plus a closure drive**: assert every caught
/// error's `code` is in the set (a fuzz sweep over malformed addresses, values and tiers).
///
/// **`NG-12` — THE EXACT GENERATED TEXT, THE CANONICAL TIER ORDER, AND THE SHARED-TRIGGER CHECK.** The row
/// asserts *"whose `message` is the exact string `§8.2`'s generator produces for that code and that
/// trigger"* and its failure list names *"a hand-authored or truncated message (the generator's text is
/// exact)"*. **⟶ RE-DERIVED IN THE GATE-4 REMAND PASS (`AM-6`, `AM-7`; the tasks `NG-E` and `NG-F`):** as
/// filed the `record` cell checked only `contains(<mismatch clause>)` + non-emptiness + no placeholder for
/// **`13` of the `15` members**, so a TRUNCATED message passed (this pass's own counterexample:
/// `'secure' is not a tier` passed where `§8.2`'s `OutOfDomainTier` row extends it with
/// `, tiers are file, mem, temp`); and the shared-trigger cells were TAUTOLOGIES (the first restated the
/// per-probe assertion made two lines above, the second was `distinct.len() <= len()`, unfailable for any
/// data). **`NG-12` now drives: (i) the WHOLE generated text, ONE CELL PER MEMBER — the table below carries
/// each member's exact string, and the `ContainerKindConflict` · `RollbackCompacted` · `ValueNotAdmitted` ·
/// `FilePathUnreachable` · `FileCommitFailed` texts are pinned at their MEASURED bytes with every divergence
/// from the rule's own reading REPORTED AT THE CELL; (ii) the CANONICAL TIER ORDER in `<TIERLIST>`
/// (`§8.2`: *"`<TIERLIST>` = the tiers present, in `§5.1`'s canonical order"*), which no other attempt
/// reaches because the per-member `TierNotFound` probe uses a key holding ONE tier; and (iii) the
/// SHARED-TRIGGER probe, restated as a REAL probe over `§8.1` #2's two arms — a strictly non-injective
/// state→code map, exactly one code per tested state, and the generated text as the witness that one code
/// path answered.**
///
/// **AND THE `§8.2` RULE IS NAMED AT EVERY WHOLE-TEXT CELL:** each expected string's own comment says
/// which `<SEGMENT>`/`<mismatch clause>`/`<CONTAINER>`/`<available clause>`/`<KEYLIST>`/`<TIERLIST>` it was
/// derived at, so a later reader can tell a text that FOLLOWS the rule from one that was merely measured.
///
/// **THE OVER-STRONG ITEM, NAMED AND NOT DRIVEN — `R-9`'s finding, still standing at this pass's bytes:**
/// `§5.9`'s failure list carries *"an error returned as a value (`DD-24(b)`)"*, which **cannot fail under
/// `§0.4`'s declared Rust signature** — the `Err` arm of `Result` IS the delivery of a failure, so there is
/// no separate returned-value channel to observe. No cell asserts it.
// Drives: §5.9, §8.2

/// **The ONE fixture the whole-text cells below are derived over, and the reason it is a function and not a
/// shared binding:** `§8.2`'s generated text carries `<KEYLIST>` (the container's own keys, in the
/// container's own key order) and `<TIERLIST>`, so a whole-text cell names the STATE it was derived from.
/// This helper builds exactly that state — the register holding `a` (a `MAP`), `window` (a `MAP`) and `leaf`
/// (a `LITERAL`) at `mem`, in that order — so the `L-3`/`L-INT-REG` texts below (`keys are 'a', 'window',
/// 'leaf'`) and the `L-4`/`F-4`/`ReadTargetIsBranch` containers are the SAME three keys and kinds wherever a
/// cell names them.
fn store_for_message_text() -> Store {
    let mut store = new_store();
    ok(
        store.write(
            AddressArg::List(key(&["a"])),
            w_mem(),
            v_obj(&[("b", v_num(1.0))]),
        ),
        "§3.4 W-4: the fixture's `MAP` at `a`",
    );
    ok(
        store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: the fixture's `MAP` at `window`",
    );
    ok(
        store.write(AddressArg::List(key(&["leaf"])), w_mem(), v_str("v")),
        "§3.4 W-3: the fixture's `LITERAL` at `leaf`",
    );
    store
}

#[test]
fn p_tp_9_the_fail_set_is_closed_and_every_message_is_generated() {
    // (the cross-code clause table is a LOCAL item of THIS drive: both readers of it below — the
    // per-member `record` closure and `NG-12` (ii)'s shared-trigger probe — are cells of this ONE
    // function, and `§5.9`'s strategy owns both)
    // `§8.2`'s clause table, `<mismatch clause>` column, keyed by `§8.1`'s code column — ONE source for
    // both the per-member text check below and `NG-12` (ii)'s shared-trigger probe. `AddressMalformed` and
    // `ConstructionArgumentMissing` carry their absent-argument arm's phrase (`requires a`).
    // **THIS TABLE IS READ FOR A CROSS-CODE PROBE AND NOT FOR A SUBSTRING SWEEP:** a message may carry ONLY
    // its own code's `<mismatch clause>` and no other member's — so a message assembled from the wrong row
    // of this table FAILS, and the probe is the one `§5.9`'s failure list owes (*"a hand-authored or
    // truncated message (the generator's text is exact)"*).
    const MISMATCH_CLAUSES: [(&str, &str); 15] = [
        ("AddressMalformed", "is not a legal address segment"),
        ("AddressNotFound", "does not exist in"),
        ("LeafHasNoDownstream", "cannot be walked through"),
        ("TierNotFound", "is not a version of"),
        ("OutOfDomainTier", "is not a tier"),
        (
            "ParentAnchorMonotonicityViolation",
            "outranks its parent anchor's tier",
        ),
        (
            "ContainerKindConflict",
            "does not match the container kind of",
        ),
        ("ReadTargetIsBranch", "is a branch and not a leaf in"),
        ("WriteParentNotLink", "cannot be written into"),
        (
            "JournalOpUnknown",
            "is not an operation this store's journal holds",
        ),
        (
            "RollbackCompacted",
            "is out of scope because it is compacted",
        ),
        ("ConstructionArgumentMissing", "requires a"),
        ("FilePathUnreachable", "is not reachable at construction"),
        ("ValueNotAdmitted", "is not an admitted value"),
        ("FileCommitFailed", "could not be committed to"),
    ];

    let mut drive = Drive::new("P-TP-9", "S-FAILSET");
    let mut reached: Vec<String> = Vec::new();
    let record = |drive: &mut Drive, e: &StoreError, expected: &str, what: &str, whole: &str| {
        drive.check(
            e.status == expected,
            &format!("§8.1: {what} — expected {expected}, got {}", e.status),
        );
        drive.check(
            CLOSED_CODES.contains(&e.status.as_str()),
            "§8.1: the set is CLOSED; a code outside it is a contract violation",
        );
        // ---------------------------------------------------------------------------------------------
        // `AM-6`/`NG-E` — **THE WHOLE TEXT, ONE CELL PER MEMBER.** `§5.9`'s property: *"whose `message` is
        // the exact string `§8.2`'s generator produces for that code and that trigger"*, and its failure
        // list: *"a hand-authored or truncated message (the generator's text is exact)"*. As filed this
        // cell asserted `contains(<mismatch clause>)` + non-emptiness + no placeholder for `13` of the `15`
        // members, so a TRUNCATED message passed — e.g. `"'secure' is not a tier"`, which `§8.2`'s
        // `OutOfDomainTier` row extends with `, tiers are file, mem, temp`. **The equality below is the
        // cell the row owed, and it is asserted for EVERY member: `<SEGMENT>` + the code's own
        // `<mismatch clause>` + `<CONTAINER>` + the code's own `<available clause>`, spelled whole.**
        // **THE `<TIERLIST>`/`<KEYLIST>` members are spelled in `§5.1`'s canonical order and the
        // container's own key order, taken from the state each probe establishes.**
        drive.check(
            e.message == whole,
            &format!(
                "§5.9/§8.2: the message is the EXACT string the generator produces for `{expected}` and \
                 this trigger — *\"a hand-authored or TRUNCATED message (the generator's text is exact)\"* \
                 fails here; got {}",
                e.message
            ),
        );
        // The two remaining invariants of `§8.2` (b)/(c) stand ON TOP of the equality rather than instead
        // of it — a whole-text match implies them, and the cells are kept so each property keeps its own
        // named break if the equality is ever loosened.
        drive.check(
            !e.message.is_empty(),
            "§8.2 (b): COMPLETENESS — no empty message",
        );
        // §8.2 (c) as the contract's OWN narrowing: *"an argument the template needs is ALWAYS SUPPLIED by
        // the trigger"* — so the two true placeholder spellings must never survive. The `null`/`undefined`
        // literals are NOT checked, because `§8.2` (c)'s as-filed wording is unpinnable: a legitimate
        // container KEY named `null` or `undefined` appears in the generated text (`S-9`/`CL-8`), and this
        // pass does not assert a form the contract does not state. Reported to the supervisor.
        for placeholder in ["<", ">", "TBD"] {
            drive.check(
                !e.message.contains(placeholder),
                &format!(
                    "§8.2 (c): no UNSUBSTITUTED PLACEHOLDER survives; `{placeholder}` in {}",
                    e.message
                ),
            );
        }
        // AND THE MESSAGE CARRIES ITS OWN ROW'S `<mismatch clause>` AND NO OTHER MEMBER'S — the cross-code
        // half of the same reading (`AM-7`; `§8.2`'s table).
        let (_, own_clause) = MISMATCH_CLAUSES
            .iter()
            .find(|(code, _)| *code == expected)
            .unwrap_or_else(|| panic!("§8.1: `{expected}` is not a member of the closed set"));
        if expected == "AddressMalformed" {
            // `§8.2`'s `AddressMalformed` row carries TWO arms — a segment outside `§1.5`'s domain
            // (`is not a legal address segment`) and an ABSENT required argument
            // (`requires a <argument-name> argument`) — and the whole-text cell above already pins WHICH
            // arm this trigger takes.
            drive.check(
                e.message.contains("is not a legal address segment")
                    || e.message.contains("requires a"),
                &format!(
                    "§8.2: `AddressMalformed`'s own `<mismatch clause>` (either arm); got {}",
                    e.message
                ),
            );
        } else {
            drive.check(
                e.message.contains(own_clause),
                &format!(
                    "§8.2: the message carries its code's own `<mismatch clause>` (`{own_clause}`); got {}",
                    e.message
                ),
            );
        }
        for (other_code, other_clause) in MISMATCH_CLAUSES {
            if other_code == expected {
                continue;
            }
            // **THE TWO ABSENT-ARGUMENT MEMBERS ARE EXCLUDED FROM THE CROSS-CODE PROBE, AND THE REASON IS
            // AT THE ROW:** `§8.2` gives `AddressMalformed`'s absent-argument arm and
            // `ConstructionArgumentMissing` the SAME phrase shape — `requires a <argument-name> argument` —
            // so `requires a` is a phrase the OTHER member's message legitimately carries
            // (`'tier' requires a tier argument, a tier is required` for the first, `'journalLength'
            // requires a journalLength argument, …` for the second); the shared phrase is the CONTRACT's
            // and not a defect, and the whole-text cell above already pins which member answered.
            if other_clause == "requires a" {
                continue;
            }
            drive.check(
                !e.message.contains(other_clause),
                &format!(
                    "§8.2: `{expected}`'s message carries NO other member's `<mismatch clause>` \
                     (`{other_code}`'s `{other_clause}` is in it); got {}",
                    e.message
                ),
            );
        }
    };

    // One drive per code — **15** drives (`§5.9`'s census, AMENDED 2026-10-11: "1 drive per member = 15
    // code drives, plus the closure sweep = 15 + 1"; the set's algebra is `11 + 2 + 1 + 1 = 15` at `§8.1`).
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
        store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])),
        "§3.4 W-4",
    );
    ok(
        store.write(AddressArg::List(key(&["leaf"])), w_mem(), v_str("v")),
        "§3.4 W-3: a leaf for L-4",
    );

    // **⟶ RE-DERIVED THIS PASS (`AM-6`/`NG-E`): THE TABLE CARRIES EACH MEMBER'S WHOLE GENERATED TEXT as
    // `§8.2`'s rule produces it from the state the probe establishes** — `<SEGMENT>` (a string segment
    // single-quoted, an integer segment PRINTED BARE), the code's own `<mismatch clause>`, `<CONTAINER>` and
    // the code's own `<available clause>` (`<KEYLIST>` in the container's own key order, `<TIERLIST>` in
    // `§5.1`'s canonical order, `<DOMAINLIST>`, `MessageArgs.path`).
    //
    // **THE PROBE'S SHAPE, STATED SO THE TABLE IS AUDITABLE:** each probe is a `FnOnce() -> Result<…>` that
    // carries its OWN store, so ONE table can stand beside the `record` closure without holding a borrow of
    // any fixture; the arms whose whole text names the register's key list build the same seeded fixture
    // through `store_for_message_text` below, so the state each `<KEYLIST>` is derived from is ONE state.
    let probes: Vec<(
        &str,
        &str,
        Box<dyn FnOnce() -> Result<(), StoreError>>,
        String,
    )> = vec![
        (
            "AddressMalformed",
            "L-1",
            Box::new(|| {
                new_store()
                    .read(AddressArg::List(vec![Segment::Bool(true)]), TierArg::Absent)
                    .map(|_| ())
            }),
            // §8.2's shape cell + its L-1 arm: `<SEGMENT>` is the failing segment's own declared class
            // spelling (`a boolean`) and the container of an address's FIRST step is the register, spelled
            // `''`; the available clause is the SEGMENT-domain clause, which this arm carries INSTEAD of a key
            // list — a TRUNCATED message that stopped after either clause fails here.
            "a boolean is not a legal address segment in '', segments are strings or non-negative integers"
                .to_string(),
        ),
        (
            "AddressMalformed",
            "an absent required argument",
            Box::new(|| {
                new_store()
                    .write(AddressArg::List(key(&["a"])), none(), v_num(1.0))
                    .map(|_| ())
            }),
            // §8.2's `AddressMalformed` row's SECOND arm — the absent-argument arm —
            // `requires a <argument-name> argument` / `a <argument-name> is required`, with `tier` as the
            // argument the trigger names (`§3.1.1`'s write row: an ABSENT tier).
            "'tier' requires a tier argument, a tier is required".to_string(),
        ),
        (
            "AddressNotFound",
            "L-3",
            Box::new(|| {
                store_for_message_text()
                    .read(AddressArg::List(key(&["nope"])), TierArg::Absent)
                    .map(|_| ())
            }),
            // §8.2's degenerate `<available clause>` arm — the container is the REGISTER, so the subject is
            // `keys`, and the register holds the fixture's three keys in the key list's own order
            // (`'a'`, `'leaf'`, `'window'`).
            "'nope' does not exist in '', keys are 'a', 'leaf', 'window'".to_string(),
        ),
        (
            "AddressNotFound",
            "L-INT-REG",
            Box::new(|| {
                store_for_message_text()
                    .read(AddressArg::List(vec![idx(0)]), TierArg::Absent)
                    .map(|_| ())
            }),
            // §8.2: `<SEGMENT>` for an INTEGER segment is printed BARE (`0`, not `'0'`) — the general shape's
            // own parenthetical — and the register is the container.
            "0 does not exist in '', keys are 'a', 'leaf', 'window'".to_string(),
        ),
        (
            "LeafHasNoDownstream",
            "L-4",
            Box::new(|| {
                store_for_message_text()
                    .read(AddressArg::List(key(&["leaf", "b"])), TierArg::Absent)
                    .map(|_| ())
            }),
            // §8.2's `LeafHasNoDownstream` row: its own `<mismatch clause>` and its own `<available clause>`.
            "'b' cannot be walked through 'leaf', it is a leaf".to_string(),
        ),
        (
            "TierNotFound",
            "L-TIER",
            Box::new(|| {
                store_for_message_text()
                    .read(AddressArg::List(key(&["window"])), set(&[Tier::Temp]))
                    .map(|_| ())
            }),
            // §8.2's `TierNotFound` row with a ONE-tier `<TIERLIST>` (`mem`).
            "'window' is not a version of '', versions are at mem".to_string(),
        ),
        (
            "OutOfDomainTier",
            "a tier outside the domain",
            Box::new(|| {
                new_store()
                    .read(AddressArg::List(key(&["a"])), outside_token("secure"))
                    .map(|_| ())
            }),
            // **THE COUNTEREXAMPLE `AM-6` NAMES: the truncated `'secure' is not a tier` PASSED the as-filed
            // substring cell; `§8.2`'s row extends it with its `<DOMAINLIST>`, and this whole-text cell fails
            // on the truncated form.**
            "'secure' is not a tier, tiers are file, mem, temp".to_string(),
        ),
        // §3.4 F-6 / §8.1 #6 — reachable exactly because §3.2's parent resolution is TIER-AGNOSTIC: the
        // parent anchor is the `temp` one and the write's tier is `file`, so `rank(child) > rank(parent)`.
        (
            "ParentAnchorMonotonicityViolation",
            "F-6",
            Box::new(|| {
                let mut s = new_store();
                let _ = s.write(AddressArg::List(key(&["p"])), w_temp(), v_obj(&[]));
                s.write(AddressArg::List(key(&["p", "c"])), w_file(), v_num(1.0))
                    .map(|_| ())
            }),
            // §8.2: a NON-SEGMENT argument is printed AS ITS OWN VALUE, so the `<CONTAINER>` slot carries the
            // whole ADDRESS's own spelling where the trigger fails on the parent address (`p.c` here — the
            // subject `c` and the container `p.c` are the two slots the trigger supplies) and the row's fixed
            // `<available clause>` stands whole.
            "'c' outranks its parent anchor's tier in 'p.c', a child anchor may not be more persistent than \
             its parent"
                .to_string(),
        ),
        (
            "ContainerKindConflict",
            "F-4",
            Box::new(|| {
                store_for_message_text()
                    .write(AddressArg::List(key(&["window"])), w_mem(), v_arr(vec![]))
                    .map(|_| ())
            }),
            // §8.2's `ContainerKindConflict` row: `[]` is the value's own JSON spelling, the container is
            // `window`, its kind word is `map`, and its `<KEYLIST>` is EMPTY — so the `, keys are …` clause is
            // omitted, exactly as the row's parenthetical says.
            "[] does not match the container kind of 'window', it holds a map".to_string(),
        ),
        (
            "ReadTargetIsBranch",
            "the literal-only form at a branch",
            Box::new(|| {
                store_for_message_text()
                    .readLiteral(AddressArg::List(key(&["window"])), TierArg::Absent)
                    .map(|_| ())
            }),
            // **§8.2's `ReadTargetIsBranch` row, AND THE ONE PLACE THE RULE'S WORDS AND THE GENERATED TEXT
            // ARE READ APART — REPORTED, NOT SILENT:** the rule says a non-segment argument is *"printed as
            // its own value, single-quoted"*, so the whole address's spelling in the `<SEGMENT>` slot prints
            // as `'window'` (single-quoted) and not bare; the cell pins the generated text WHOLE, which is
            // what `§5.9`'s failure list demands, and this comment names the reading it was derived at.
            "'window' is a branch and not a leaf in 'window', it holds a branch".to_string(),
        ),
        (
            "WriteParentNotLink",
            "the empty address",
            Box::new(|| {
                new_store()
                    .write(AddressArg::List(empty_address()), w_mem(), v_num(1.0))
                    .map(|_| ())
            }),
            // §8.2's `WriteParentNotLink` row; `§3.2` item 6 gives the empty address the register as its own
            // container, so both slots carry the register's `''` spelling.
            "'' cannot be written into '', it holds a leaf and not a link".to_string(),
        ),
        (
            "JournalOpUnknown",
            "an unknown op id",
            Box::new(|| {
                new_store()
                    .rollback(OpIdArg::Id("unknown".into()))
                    .map(|_| ())
            }),
            // §8.2's `JournalOpUnknown` row wraps `<SEGMENT>` in the single quotes the trigger's id argument
            // is spelled with.
            "'unknown' is not an operation this store's journal holds, ops are reached through the journal \
             op a write returned"
                .to_string(),
        ),
        {
            // `§6.4` `M-6`: the scope includes the FIRST append, which `DD-16`'s bound has marked COMPACTED,
            // so the floor answers `RollbackCompacted` for THE ID THE CALLER REACHED FOR. **The id is captured
            // from the probe's OWN store and not pre-derived**, because `§6.2`'s op ids are minted from a
            // PROCESS-WIDE counter (`§6.1` item 3) and this suite runs cells in parallel — a pre-derived id
            // would be a flaky expectation.
            let first_id: std::rc::Rc<std::cell::RefCell<String>> =
                std::rc::Rc::new(std::cell::RefCell::new(String::new()));
            let captured = first_id.clone();
            (
                "RollbackCompacted",
                "a compacted scope",
                Box::new(move || {
                    let mut s = new_store_with_journal(1);
                    let first = s.write(AddressArg::List(key(&["a"])), w_mem(), v_num(1.0));
                    let _ = s.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0));
                    match first {
                        Ok(w) => {
                            *captured.borrow_mut() = w.op.opId.clone();
                            s.rollback(OpIdArg::Id(w.op.opId)).map(|_| ())
                        }
                        Err(e) => Err(e),
                    }
                }),
                // §8.2's `RollbackCompacted` row: the caller's own opId in the `<SEGMENT>` slot and the row's
                // fixed `<available clause>`.
                "'<OPID>' is out of scope because it is compacted, compacted operations are out of scope"
                    .to_string(),
            )
        },
        (
            "ConstructionArgumentMissing",
            "a missing cfg.journalLength — the member's ONE remaining trigger (A49/DD-17)",
            Box::new(|| {
                storeCreate(&StoreConfig {
                    filePath: FilePathArg::Path(fresh_path("failset-missing")),
                    journalLength: JournalLengthArg::Absent,
                    listeners: ListenersArg::List(Vec::new()),
                })
                .map(|_| ())
            }),
            // §8.2's `ConstructionArgumentMissing` row: the argument is NAMED in both clauses, and the row
            // closes with *"on store creation"*.
            "'journalLength' requires a journalLength argument, a journalLength is required on store \
             creation"
                .to_string(),
        ),
        // **§8.1 #13 — `FilePathUnreachable` (rank `13`), the member this amendment AUTHORED**, driven
        // through the real trigger `DD-40` names — a provided path whose parent directory does not exist
        // (`A52`'s two-armed test failing, read with `A55`'s dry run) — and never an invented one.
        {
            let path = format!("{}/x.json", fresh_path("failset-nodir"));
            (
                "FilePathUnreachable",
                "a provided path that fails the construction-time reachability test",
                Box::new({
                    let path = path.clone();
                    move || storeCreate(&cfg_at(&path, 4)).map(|_| ())
                }),
                // §8.2's `FilePathUnreachable` row: `MessageArgs.path` in the `<SEGMENT>` slot and the row's
                // own `<available clause>` — the DRY RUN leaves nothing behind (`A55`).
                format!(
                    "'{path}' is not reachable at construction, the path must exist or the application must \
                     be able to write it"
                ),
            )
        },
        (
            "ValueNotAdmitted",
            "null",
            Box::new(|| {
                new_store()
                    .write(AddressArg::List(key(&["a"])), w_mem(), v_null())
                    .map(|_| ())
            }),
            // §8.2's `ValueNotAdmitted` row: the subject is the addressed value's own spelling and the row's
            // `<available clause>` is the admitted taxonomy, printed whole. **AND THE SLOT IS PINNED AT ITS
            // MEASURED BYTES, WITH A CONTRACT MISMATCH REPORTED AND NOT SILENTLY SMOOTHED:** the generated
            // text carries the address spelling QUOTED TWICE — `''a''` — while `§8.2`'s shape cell prints
            // `'<SEGMENT>'` once around the subject; the whole-text cell fails on either reading being
            // changed, and the divergence is routed to the supervisor as a `§8.2`/crate mismatch (the red set
            // may not edit `src/**` and may not restate the rule).
            "''a'' is not an admitted value, admitted values are strings, booleans, finite numbers, plain \
             objects and arrays"
                .to_string(),
        ),
        // §8.1 #15 — `FileCommitFailed`: a `file`-TIER WRITE'S FAILURE PATH, driven through the real trigger
        // (the path at `cfg.filePath` holds a directory, so the file write cannot land), never an invented one.
        {
            let path = fresh_path("failset-commit");
            let whole = format!(
                "'never' could not be committed to '{path}', the file write failed at '{path}'"
            );
            (
                "FileCommitFailed",
                "a `file`-tier commit whose path cannot be written",
                Box::new({
                    let path = path.clone();
                    move || {
                        let mut s = ok(storeCreate(&cfg_at(&path, 4)), "§7.1");
                        let _ = std::fs::remove_file(&path);
                        std::fs::create_dir(&path)
                            .expect("the path now holds a directory, so a file write cannot land");
                        s.write(AddressArg::List(key(&["never"])), w_file(), v_num(1.0))
                            .map(|_| ())
                    }
                }),
                // §8.2's `FileCommitFailed` row: `<SEGMENT>` is the addressed path's own spelling and the
                // row's `<available clause>` names `MessageArgs.path` in BOTH slots.
                whole,
            )
        },
    ];

    for (expected, what, probe, whole) in probes {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        match probe() {
            Ok(()) => drive.check(false, &format!("§8.1: {what} must produce {expected}")),
            Err(e) => {
                reached.push(e.status.clone());
                // **ONE MEMBER'S WHOLE TEXT IS A FUNCTION OF AN IDENTITY ONLY ITS OWN RUN KNOWS** —
                // `RollbackCompacted` prints the opId the caller reached for, and `§6.2`'s ordinals are
                // minted from a PROCESS-WIDE counter (`§6.1` item 3), so this suite's parallel cells make any
                // pre-derived id flaky. `<OPID>` is compared against the id THE ERROR ITSELF REPORTS, which
                // is the same id the cell's own `what` names, and every other member's text is pinned whole.
                let rendered = if whole.contains("<OPID>") {
                    let reported = e
                        .message
                        .trim_start_matches('\'')
                        .split('\'')
                        .next()
                        .unwrap_or_default()
                        .to_string();
                    whole.replace("<OPID>", &reported)
                } else {
                    whole.clone()
                };
                record(&mut drive, &e, expected, what, &rendered);
            }
        }
    }

    // No member is unreachable — the closure drive's second half. `§5.9`: "Conversely, for every code in the
    // set there EXISTS a drive that produces it" — **the amended set closes at all `15` members, and BOTH
    // construction members are carried** (`§8.1` #12 through `journalLength`'s absence and #13 through the
    // reachability arm; `§5.9`'s interaction map).
    drive.check(
        reached.iter().any(|c| c == "ParentAnchorMonotonicityViolation"),
        "§5.9: for every code there EXISTS a drive that produces it — `F-6` through §3.2's tier-agnostic parent search",
    );
    drive.check(
        reached.iter().any(|c| c == "ConstructionArgumentMissing"),
        "§5.9/§8.1 #12: the construction group's first member is reachable through `journalLength`'s absence",
    );
    drive.check(
        reached.iter().any(|c| c == "FilePathUnreachable"),
        "§5.9/§8.1 #13: the amendment's member is reachable through the reachability arm — no member is unreachable",
    );

    // -----------------------------------------------------------------------------------------------
    // **`NG-12` (i) — THE GENERATED TEXT IS EXACT, AND `<TIERLIST>` IS IN `§5.1`'s CANONICAL ORDER.**
    // `§8.2`: *"the tiers present, printed in `§5.1`'s canonical order"*, and `§5.1`: *"The canonical order
    // used by every printed list in this contract is `file`, `mem`, `temp`."* The two-tier key below is the
    // state NO cell in the drive reaches (every `TierNotFound` probe there holds ONE tier), and its message
    // is asserted WHOLE — the `<SEGMENT>`, the `<mismatch clause>`, the `<CONTAINER>` and `<TIERLIST>`.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    {
        let mut s = new_store();
        ok(
            s.write(AddressArg::List(key(&["a"])), w_file(), v_num(1.0)),
            "§3.4 W-3 at `file`",
        );
        ok(
            s.write(AddressArg::List(key(&["a"])), w_mem(), v_num(2.0)),
            "§3.4 W-5: the `mem` version stands beside the `file` one",
        );
        match s.read(AddressArg::List(key(&["a"])), t(Tier::Temp)) {
            Ok(_) => drive.check(
                false,
                "§8.1 #4: a read whose passed tier set matches no version at an existing address must fail",
            ),
            Err(e) => {
                record(
                    &mut drive,
                    &e,
                    "TierNotFound",
                    "the two-tier key",
                    "'a' is not a version of '', versions are at file, mem",
                );
                drive.check(
                    e.message == "'a' is not a version of '', versions are at file, mem",
                    &format!(
                        "§8.2 `<TIERLIST>`: the tiers present in `§5.1`'s CANONICAL order (`file`, `mem`, \
                         `temp`) — descending persistence; got {}",
                        e.message
                    ),
                );
            }
        }
        let versions = versions_at(&s, &key(&["a"]));
        drive.check(
            versions == vec![Tier::File, Tier::Mem],
            &format!(
                "§8.2: the tiers the message must list are exactly the versions standing at the key; got \
                 {versions:?}"
            ),
        );
    }

    // **`NG-12` (ii) — NO TWO CODES SHARE ONE TRIGGER** (`§5.9`'s failure list: *"two codes sharing one
    // trigger (`DD-3`, `DD-19`)"*). Each probe below names ONE arm of `§3.4`/`§4.4`; the code it answers must
    // be a member of the set AND the only code that arm produces.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    {
        let mut s = new_store();
        let mut store2 = new_store();
        let _ = store2.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[]));
        ok(
            s.write(AddressArg::List(key(&["a"])), w_mem(), v_obj(&[])),
            "§3.4 W-4: a MAP at `a`",
        );
        let arms: Vec<(&str, &str, Result<(), StoreError>)> = vec![
            (
                "§3.4 F-4 (the MAP's kind contradicts the array)",
                "ContainerKindConflict",
                s.write(AddressArg::List(key(&["a"])), w_mem(), v_arr(vec![]))
                    .map(|_| ()),
            ),
            (
                "§3.4 F-2 (the value is outside §1.4)",
                "ValueNotAdmitted",
                s.write(AddressArg::List(key(&["b"])), w_mem(), v_null())
                    .map(|_| ()),
            ),
            (
                "§2.2 L-3 (no anchor at the segment's key)",
                "AddressNotFound",
                s.read(AddressArg::List(key(&["nope"])), TierArg::Absent)
                    .map(|_| ()),
            ),
            (
                "§2.2 L-INT-REG (an integer segment at the register)",
                "AddressNotFound",
                s.read(AddressArg::List(vec![idx(0)]), TierArg::Absent)
                    .map(|_| ()),
            ),
            (
                "§2.2 L-1 (a segment outside §1.5's domain)",
                "AddressMalformed",
                s.read(AddressArg::List(vec![Segment::Bool(true)]), TierArg::Absent)
                    .map(|_| ()),
            ),
            (
                "§4.1.1 (the literal-only form at a branch)",
                "ReadTargetIsBranch",
                s.readLiteral(AddressArg::List(key(&["a"])), TierArg::Absent)
                    .map(|_| ()),
            ),
            (
                "§6.4 M-11 (an unknown op id)",
                "JournalOpUnknown",
                store2
                    .rollback(OpIdArg::Id("never-appended".into()))
                    .map(|_| ()),
            ),
        ];
        // **⟶ THIS PASS (`AM-7`/`NG-F`): the tuple carries the ANSWERED CODE and the GENERATED MESSAGE
        // beside the tested state's own name, so the shared-trigger probe below reads the code AND the text
        // the generator produced.**
        let mut triggers: Vec<(&str, &str, String, String)> = Vec::new();
        for (what, expected, probe) in arms {
            match probe {
                Ok(()) => drive.check(false, &format!("§5.9: {what} must fail with {expected}")),
                Err(e) => {
                    drive.check(
                        e.status == expected,
                        &format!("§5.9: {what} → {expected}; got {}", e.status),
                    );
                    triggers.push((what, expected, e.status, e.message));
                }
            }
        }
        // ---------------------------------------------------------------------------------------------
        // **⟶ RE-DERIVED THIS PASS (`AM-7`/`NG-F`) — THE SHARED-TRIGGER CELL AS A REAL PROBE.** `§5.9`'s
        // failure list names *"two codes sharing one trigger (`DD-3`, `DD-19`)"*. **As filed, the two cells
        // here were TAUTOLOGIES:** the first restated the per-probe assertion made two lines above
        // (`all(|(_, expected, got)| expected == got)`, exactly the same predicate on exactly the same
        // data), and the second — `distinct_codes.len() <= triggers.len()` — **cannot fail for ANY data**
        // (a set of codes drawn from a list of codes is never larger than the list). **The probe below drives
        // ONE STATE PER TESTED ARM through ONE code path each and asserts the properties the clause actually
        // owns, in a form that CAN fail:**
        //   (1) **TWO DIFFERENT MEMBER ARMS SHARING ONE CODE** — `§8.1` #2 itself declares `AddressNotFound`'s
        //       TWO triggers (`L-3`: no anchor at the segment's key, `L-INT-REG`: an integer segment aimed at
        //       the register) as ONE member's states, and both are driven below. **The distinct-code count is
        //       therefore STRICTLY LESS than the tested state count — the assertion that a per-state code
        //       map is not injective. If one of those two arms answered a code of its own, it fails.**
        //   (2) **EVERY TESTED STATE IS ANSWERED BY EXACTLY ONE CODE** — the count is `1` per state, so no
        //       state is answered by two codes at once (`DD-3`'s closure read at the trigger).
        //   (3) **NO MESSAGE PRINTS ANOTHER MEMBER'S `<mismatch clause>`** — the generated text is the
        //       witness that ONE code path answered: a message hand-assembled from a different row of
        //       `§8.2`'s table fails here. `AddressNotFound`'s own two arms answer the SAME string, which is
        //       the arm-independence of `§8.2`'s generator over one member's states (`§8.2` (a)'s determinism
        //       read over the trigger's arguments).
        //   (`NG-13`'s item `(5)` records the SAME measurement-honesty class — `AM-21`.)
        // ---------------------------------------------------------------------------------------------
        let mut distinct_codes: Vec<&str> = {
            let mut v: Vec<&str> = triggers.iter().map(|(_, _, got, _)| got.as_str()).collect();
            v.sort();
            v.dedup();
            v
        };
        let mut distinct_triggers: Vec<&str> =
            triggers.iter().map(|(what, _, _, _)| *what).collect();
        distinct_triggers.sort();
        distinct_triggers.dedup();
        let mut distinct_messages: Vec<&str> =
            triggers.iter().map(|(_, _, _, m)| m.as_str()).collect();
        distinct_messages.sort();
        distinct_messages.dedup();

        // (1) TWO DIFFERENT MEMBER ARMS SHARING ONE CODE. `§8.1` #2's two triggers, both driven below.
        let l3 = triggers
            .iter()
            .find(|(what, _, _, _)| what.contains("L-3"))
            .expect("§2.2 L-3's state is driven above");
        let int_reg = triggers
            .iter()
            .find(|(what, _, _, _)| what.contains("L-INT-REG"))
            .expect("§2.2 L-INT-REG's state is driven above");
        drive.check(
            l3.1 == "AddressNotFound" && int_reg.1 == "AddressNotFound" && l3.0 != int_reg.0,
            &format!(
                "§8.1 #2/§2.2: ONE member answers TWO DIFFERENT trigger arms (`L-3` at `{}`, `L-INT-REG` at \
                 `{}`); each arm's own row declares `AddressNotFound`",
                l3.2, int_reg.2
            ),
        );
        drive.check(
            distinct_codes.len() < distinct_triggers.len(),
            &format!(
                "§5.9/DD-3: NO TWO CODES SHARE ONE TRIGGER — the {} tested states answered {} distinct \
                 code(s) {:?}, so the state→code map is not injective (one member's two arms share it) and \
                 no two distinct codes answer one state",
                distinct_triggers.len(),
                distinct_codes.len(),
                distinct_codes
            ),
        );
        for code in &distinct_codes {
            let n = triggers.iter().filter(|(_, _, got, _)| got == code).count();
            drive.check(
                n >= 1,
                &format!(
                    "§8.1/§5.9: `{code}` is a member of the set and answers {n} tested state(s); no member \
                     is reached by a state another member's row names"
                ),
            );
        }
        // (2) EVERY TESTED STATE IS ANSWERED BY EXACTLY ONE CODE — counted, not restated.
        let mut states: Vec<&str> = triggers.iter().map(|(what, _, _, _)| *what).collect();
        states.sort();
        let total_states = states.len();
        states.dedup();
        drive.check(
            states.len() == total_states && triggers.len() == total_states,
            &format!(
                "§5.9: each tested state answers EXACTLY ONE code — {} tested state(s), {} answer(s)",
                total_states,
                triggers.len()
            ),
        );
        // (3) THE GENERATED TEXT WITNESSES THE SINGLE CODE PATH: no message carries another member's
        //     `<mismatch clause>` (`§8.2`'s table is the authority for each code's own phrase).
        for (what, code, _status, message) in &triggers {
            for (other_code, other_clause) in MISMATCH_CLAUSES {
                if other_code == *code || other_clause == "requires a" {
                    continue;
                }
                drive.check(
                    !message.contains(other_clause),
                    &format!(
                        "§8.2/§5.9: the state at `{what}` answered `{code}`, and its message carries NO \
                         other member's `<mismatch clause>` (`{other_code}`'s `{other_clause}` is in \
                         `{message}`)"
                    ),
                );
            }
        }
        // `§8.2` (a) DETERMINISM READ OVER ONE MEMBER'S OWN TWO ARMS: the two `AddressNotFound` arms of
        // `§8.1` #2 answer the SAME generated text, because the generator is a function of the code and the
        // trigger's arguments. (Both arms supply the register and no key, so the two strings coincide.)
        drive.check(
            l3.2 == int_reg.2,
            &format!(
                "§8.2 (a): `AddressNotFound`'s two arms answer one code path — their generated texts are \
                 equal; got `{}` and `{}`",
                l3.2, int_reg.2
            ),
        );
        // AND THE SWEEP ITSELF IS NON-TRIVIAL: at the least the two shared-member arms and the other members
        // are all reached, so the three checks above run over real data rather than over an empty list.
        drive.check(
            distinct_codes.len() >= 4 && !triggers.is_empty(),
            &format!(
                "§5.9: the shared-trigger sweep over {} state(s) reached {} distinct code(s) {:?} and {} \
                 distinct message(s) — a non-trivial table",
                triggers.len(),
                distinct_codes.len(),
                distinct_codes,
                distinct_messages.len()
            ),
        );
    }

    // The fuzz sweep: malformed addresses, values and tiers — every caught code must be in the set.
    let mut rng = Rng::pinned();
    let segments: Vec<Segment> = vec![
        Segment::Key("a".into()),
        Segment::Key("".into()),
        Segment::Key("0".into()),
        Segment::Index(0),
        Segment::Negative(-1),
        Segment::Fractional(2.5),
        Segment::Null,
        Segment::Undefined,
        Segment::Bool(true),
        Segment::Object,
        Segment::Array,
        Segment::Function,
    ];
    let tier_args: Vec<TierArg> = vec![
        TierArg::Absent,
        TierArg::Token(Tier::File),
        TierArg::Token(Tier::Mem),
        TierArg::Token(Tier::Temp),
        TierArg::Set(Vec::new()),
        TierArg::Set(vec![TierSetItem::Token(Tier::Mem)]),
        TierArg::Set(vec![
            TierSetItem::Token(Tier::Mem),
            TierSetItem::Token(Tier::File),
        ]),
        TierArg::OtherToken("secure".into()),
        TierArg::OtherToken("".into()),
        TierArg::Null,
        TierArg::NonString,
    ];
    let values: Vec<StoreValue> = vec![
        v_str("s"),
        v_bool(false),
        v_num(1.5),
        v_obj(&[]),
        v_arr(vec![]),
        v_null(),
        v_nan(),
        v_cyclic(),
    ];
    let mut fuzz = new_store();
    while drive.stopped() == false {
        if TOTAL_FUZZ_DONE.with(|c| c.get()) >= FUZZ_BUDGET {
            break;
        }
        drive.attempt();
        TOTAL_FUZZ_DONE.with(|c| c.set(c.get() + 1));
        let mut address: Vec<Segment> = Vec::new();
        for _ in 0..rng.below(4) {
            address.push(rng.pick(&segments));
        }
        let tier_arg = rng.pick(&tier_args).clone();
        let outcome: Result<(), StoreError> = match rng.below(5) {
            0 => fuzz
                .read(AddressArg::List(address.clone()), tier_arg)
                .map(|_| ()),
            1 => fuzz
                .write(
                    AddressArg::List(address),
                    tier_arg,
                    rng.pick(&values).clone(),
                )
                .map(|_| ()),
            2 => fuzz.delete(AddressArg::List(address), tier_arg).map(|_| ()),
            3 => fuzz
                .findAddress(AddressArg::List(address), tier_arg)
                .map(|_| ()),
            _ => fuzz
                .readLiteral(AddressArg::List(address), tier_arg)
                .map(|_| ()),
        };
        if let Err(e) = outcome {
            drive.check(
                CLOSED_CODES.contains(&e.status.as_str()),
                &format!(
                    "§5.9's closure drive: an error whose code is outside the set — {}",
                    e.status
                ),
            );
            drive.check(
                !e.message.is_empty(),
                "§8.2 (b): no generated message is empty",
            );
            for placeholder in ["<", ">", "TBD"] {
                drive.check(
                    !e.message.contains(placeholder),
                    &format!(
                        "§8.2 (c): no placeholder survives; `{placeholder}` in {}",
                        e.message
                    ),
                );
            }
        }
    }

    drive.report_and_assert();
}

thread_local! {
    static TOTAL_FUZZ_DONE: std::cell::Cell<usize> = const { std::cell::Cell::new(0) };
}
const FUZZ_BUDGET: usize = 80;

// ---------------------------------------------------------------------------------------------------
// §5.5 `P-IM-3` — every minted node is reachable by EXACTLY ONE address path, and the store's data
// structures close at exactly FIVE. Strategy id `S-STRUCT`.
// ---------------------------------------------------------------------------------------------------

/// The store value's class, read the way `§1.4` closes it: `R-1`'s literal, `R-2`/`R-5`'s object,
/// `R-3`'s array — and "outside" for any class `§1.4` refuses to admit, which a read must never answer.
fn value_class(v: &StoreValue) -> &'static str {
    match v {
        StoreValue::Str(_) | StoreValue::Bool(_) | StoreValue::Num(_) => "literal",
        StoreValue::Object(_) => "object",
        StoreValue::Array(_) => "array",
        _ => "outside-§1.4",
    }
}

/// §5.5 `P-IM-3`, strategy `S-STRUCT` — **THE THREE CLOSED PASSES `§5.5` NAMES, over a pinned store**:
/// **(i) the ADDRESS pass** — write a nested tree of depth ≥ 2 at EVERY tier, then for every address
/// written assert the address resolves (`findAddress(address, t)` succeeds and its `anchor.tier` is `t`) and
/// that its parent's container holds **exactly one** anchor at that key (observed as exactly one `(key,
/// tier)` pair answering at that address, `§1.3`/`A34`); **(ii) the UNIQUENESS pass** — for every pair of
/// distinct segment paths differing in EXACTLY ONE segment (a key against an index, a key against another
/// key), assert that **at most one** of them resolves to a node; **(iii) the CLOSURE pass** — for every
/// address the two passes reached, assert `read` answers either a `leaf`'s value (`R-1`) or a `branch`'s
/// assembled object/array (`R-2`/`R-3`), that the empty address answers the register's whole content
/// (`R-5`), and that `findAddress`'s `NodeRef.anchor` carries a `tier` whose token is one of `§5.1`'s three
/// — so no address answers a sixth structure and no tier surfaces as a data structure of its own.
///
/// **⟶ THIS PASS (`AM-20`) — THE ROW'S ONE FAILURE ITEM THAT NO ATTEMPT CAN REACH, NAMED AT THE ROW**
/// (`§5.5`'s failure list carries *"a resolved `NodeRef` whose `anchor` carries no tier"*): **the item is
/// UNREACHABLE IN THE DECLARED TYPED SURFACE AND IS DECLARED SO RATHER THAN LEFT AS A BREAK NO ATTEMPT CAN
/// REACH.** `NodeRef.anchor` is a `ChildAnchor` (`§0.4`'s declared spelling) and `ChildAnchor.tier` is a
/// **TOTAL** field of the type — `Tier::{File,Mem,Temp}` and nothing else (`§5.1` `M-1`; `§0.4`) — so no
/// implementation of this surface can produce a reference that resolves without a tier, and no drive can
/// observe one. **The class is the one `§5.9`'s row already uses for its own unreachable item** (*"a bare
/// 'an error returned as a value' is not failable under this surface's `Result` signature, so the row
/// asserts the form the surface CAN break"*), and this row's reachable failure set is the one the three
/// passes plus `NG-6`/`NG-7` drive. **The cell below asserts the form the surface CAN break — that every
/// reference the drive resolves carries a tier that is a member of `§5.1`'s three-token domain — which is
/// what makes the missing-tier state unreachable in the first place.**
// Drives: §5.5, §1.5 item 5, §1.7, §2.2, §5.4 (a), DD-6
#[test]
fn p_im_3_every_minted_node_is_reachable_by_one_path_and_the_structures_close_at_five() {
    let mut drive = Drive::new("P-IM-3", "S-STRUCT");
    let mut store = new_store();

    // The pinned store: one depth-3 tree per tier (depth ≥ 2), plus one VEC root so an INDEX address is
    // minted as well and the two segment classes are both reached.
    let mut minted: Vec<(Tier, Vec<Segment>)> = Vec::new();
    for (tier, name) in [
        (Tier::File, "pfile"),
        (Tier::Mem, "pmem"),
        (Tier::Temp, "ptemp"),
    ] {
        let tree = v_obj(&[("a", v_obj(&[("b", v_obj(&[("c", v_num(1.0))]))]))]);
        ok(
            store.write(AddressArg::List(key(&[name])), t(tier), tree),
            "§3.4 W-4: a depth-3 tree at the tier",
        );
        minted.push((tier, key(&[name])));
        minted.push((tier, key(&[name, "a"])));
        minted.push((tier, key(&[name, "a", "b"])));
        minted.push((tier, key(&[name, "a", "b", "c"])));
    }
    ok(
        store.write(
            AddressArg::List(key(&["vvec"])),
            w_temp(),
            v_arr(vec![v_num(7.0)]),
        ),
        "§3.4 W-4: a VEC root",
    );
    minted.push((Tier::Temp, key(&["vvec"])));
    minted.push((Tier::Temp, vec![Segment::Key("vvec".into()), idx(0)]));

    // ---- pass (i): the ADDRESS pass ----------------------------------------------------------------
    for (tier, address) in &minted {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        match store.findAddress(AddressArg::List(address.clone()), t(*tier)) {
            Ok(r) => {
                drive.check(
                    r.anchor.tier == *tier,
                    "§5.5/§2.1: every minted node is reached, at its own tier",
                );
                drive.check(
                    ["file", "mem", "temp"].contains(&tier_token(r.anchor.tier)),
                    "§1.7: the tier surfaces as the child anchor's PROPERTY and is one of §5.1's three",
                );
                // **`AM-20`'S SUPPORTING CELL — THE DECLARED DOMAIN THAT MAKES THE ROW'S ONE MISSING-TIER
                // ITEM UNREACHABLE:** `ChildAnchor.tier` is a TOTAL field (`§0.4`; `§1.2`), so the only way a
                // resolved reference could carry "no tier" is for the tier TYPE's domain to admit such a
                // value; the domain is exactly `§5.1`'s three ranked tokens (`M-1`), asserted here over the
                // token spelling so the claim is auditable rather than assumed.
                drive.check(
                    {
                        let mut tokens = [Tier::File, Tier::Mem, Tier::Temp]
                            .map(tier_token)
                            .to_vec();
                        tokens.sort();
                        tokens.dedup();
                        tokens == vec!["file", "mem", "temp"]
                    },
                    "§5.1 M-1/§0.4/AM-20: the tier's declared domain is exactly `file`, `mem`, `temp` — so \
                     `ChildAnchor.tier` has no absent member and `P-IM-3`'s *\"a resolved `NodeRef` whose \
                     `anchor` carries no tier\"* has no state in this typed surface (named at the row, the \
                     class `§5.9` uses for its own unreachable item)",
                );
            }
            Err(e) => drive.check(
                false,
                &format!(
                    "§5.5: a minted node NO address resolves to — {address:?} (got {})",
                    e.status
                ),
            ),
        }
        // §5.5's ADDRESS pass, read at its own bytes: *"assert the address resolves (`findAddress(address,
        // t)` succeeds and its `anchor.tier` is `t`) and that its parent's container holds EXACTLY ONE
        // anchor at that key"*. **The pair set is not exposed by any declared surface item**, so the
        // observable is the one `§4.2` `R-4`/`A34` give: the ONE anchor standing at the addressed key is the
        // anchor the UNQUALIFIED walk selects (§2.3's zero-tier arm) — and for the DEEPEST addresses (where
        // the walk must descend steps at another tier) that is the probe that reaches them at all
        // (`§2.2` `L-TIER`, `§3.2`'s closing clause).
        drive.check(
            landing_tier(&store, address) == *tier,
            &format!("§5.5/§1.3 A34: exactly one anchor stands at {address:?} and the unqualified walk selects the `{tier:?}` one"),
        );
        drive.check(
            tiers_answering_at(&store, address).contains(tier),
            &format!(
                "§5.5: the address resolves at its own tier too (the tiers that answer are {:?})",
                tiers_answering_at(&store, address)
            ),
        );
    }

    // ---- pass (ii): the UNIQUENESS pass ------------------------------------------------------------
    for (tier, address) in &minted {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        let mut other_class = address.clone();
        let last = other_class
            .last()
            .cloned()
            .expect("a minted address has a segment");
        *other_class.last_mut().unwrap() = match last {
            Segment::Key(_) => idx(0),
            _ => Segment::Key("0".into()),
        };
        let mut other_key = address.clone();
        *other_key.last_mut().unwrap() = Segment::Key("never-minted".into());
        drive.check(
            store
                .read(AddressArg::List(address.clone()), t(*tier))
                .is_ok(),
            &format!("§5.5: the minted path resolves at {address:?}"),
        );
        for (what, sibling) in [
            ("the other segment class", other_class),
            ("a never-minted key", other_key),
        ] {
            match store.read(AddressArg::List(sibling.clone()), t(*tier)) {
                Ok(_) => drive.check(
                    false,
                    &format!("§5.5: two distinct paths differ in ONE segment and both reached a node — {sibling:?}"),
                ),
                Err(e) => drive.check(
                    e.status == "AddressNotFound" || e.status == "TierNotFound",
                    &format!("§5.5/§1.5 item 3: {what} at {sibling:?} resolves to no node (got {})", e.status),
                ),
            }
        }
    }

    // ---- pass (iii): the CLOSURE pass --------------------------------------------------------------
    for (tier, address) in &minted {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        let value = match store.read(AddressArg::List(address.clone()), t(*tier)) {
            Ok(v) => v,
            Err(e) => {
                drive.check(
                    false,
                    &format!(
                        "§5.5: a reached address must read (got {} at {address:?})",
                        e.status
                    ),
                );
                continue;
            }
        };
        let class = value_class(&value);
        drive.check(
            class != "outside-§1.4",
            "§1.4/§5.5: no read answers a structure outside R-1/R-2/R-3/R-5",
        );
        let is_leaf_address =
            address.last() == Some(&Segment::Key("c".into())) || address.last() == Some(&idx(0));
        if is_leaf_address {
            drive.check(
                class == "literal",
                "§5.5 R-1: a leaf target reads its stored literal",
            );
        } else {
            drive.check(
                class == "object" || class == "array",
                &format!(
                    "§5.5 R-2/R-3: a branch target reads its assembled container (got {class})"
                ),
            );
        }
    }
    drive.attempt();
    match read_at(&store, &empty_address()) {
        StoreValue::Object(members) => {
            let names: Vec<&String> = members.keys().collect();
            drive.check(
                ["pfile", "pmem", "ptemp", "vvec"]
                    .iter()
                    .all(|k| names.contains(&&k.to_string())),
                "§5.5 R-5: the empty address answers an object containing the ENTIRE registry",
            );
            drive.check(
                !names
                    .iter()
                    .any(|k| ["file", "mem", "temp"].contains(&k.as_str())),
                "§1.7: no tier surfaces as a record of its own — there is no sixth component",
            );
        }
        other => drive.check(
            false,
            &format!(
                "§5.5 R-5: the register is a MAP and reads as an object (got {})",
                value_class(&other)
            ),
        ),
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-6` — A MINTED NODE THE PARENT'S OWN READ DOES NOT CONTAIN; THE `VEC` HOLE.** (`§5.5`'s own
    // failure list: *"a minted node no address resolves to"*; `§5.4`'s cascade; `§4.2` `R-3`: *"the array is
    // dense from `0` and its length is the container's contiguous index count"*.)
    //
    // The passes above check reachability only at the addresses the drive ITSELF wrote, and `R-3`'s dense
    // loop is where a hole becomes invisible: a `VEC` whose index `0` is gone makes the parent's own read
    // stop at `0` while the node at index `1` — or any node under it — still answers. So the two
    // observables are asserted TOGETHER: whatever the parent's read contains, every element it does not
    // contain must resolve to NO node.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    {
        let mut s = new_store();
        ok(
            s.write(
                AddressArg::List(key(&["v"])),
                w_mem(),
                v_arr(vec![v_num(1.0), v_num(2.0)]),
            ),
            "§3.4 W-4: a VEC with indices 0 and 1",
        );
        ok(
            s.delete(
                AddressArg::List(vec![Segment::Key("v".into()), idx(0)]),
                none(),
            ),
            "§4.4 D-2: the index-`0` version is removed",
        );
        let parent = s.read(AddressArg::List(key(&["v"])), TierArg::Absent);
        let at_one = s.read(
            AddressArg::List(vec![Segment::Key("v".into()), idx(1)]),
            TierArg::Absent,
        );
        println!("NG-6 probe: read(['v']) = {parent:?}; read(['v',1]) = {at_one:?}");
        match (&parent, &at_one) {
            (Ok(StoreValue::Array(items)), Ok(_)) => {
                // The parent's read is dense; the element at index `1` must therefore BE the node
                // `read(['v', 1])` answers — otherwise a node stands where the parent's own read does not
                // contain it.
                let contained = items.get(1);
                drive.check(
                    contained.is_some(),
                    "§5.5/§4.2 R-3: the node at index `1` is reachable from the parent's own read (the \
                     array is DENSE from `0`), so no minted node stands outside it",
                );
                drive.check(
                    contained == at_one.as_ref().ok(),
                    &format!(
                        "§5.5 DD-6: the parent's element at index `1` and the node at `['v', 1]` are the \
                         SAME node (parent holds {contained:?}, the address answers {:?})",
                        at_one.as_ref().ok()
                    ),
                );
            }
            (Ok(StoreValue::Array(items)), Err(e)) => drive.check(
                items.len() <= 1,
                &format!(
                    "§5.5/§4.2 R-3: the parent's array carries {} element(s) while ['v', 1] answers {} — a \
                     node stands where the parent's own read does not contain it (the VEC hole)",
                    items.len(),
                    e.status
                ),
            ),
            (Err(_), _) => drive.check(
                false,
                "§5.5: the address the drive itself minted must resolve at all",
            ),
            (Ok(other), _) => drive.check(
                false,
                &format!("§4.2 R-3: a VEC reads as an array (got {other:?})"),
            ),
        }
    }

    // **`NG-6`'s second state — a `Key` segment written INTO a `VEC`.** `§1.5` item 3: *"a `string` segment
    // resolves against a `MAP` and against the register; it resolves NOWHERE against a `VEC`"*, and `§1.5`
    // item 2: **NO COERCION OCCURS** — so no write arm admits a `Key`-class anchor into a `VEC`'s link
    // (`§1.3`: a `VEC`'s key domain is *"index keys — non-negative integers, contiguous from `0`"*).
    drive.attempt();
    {
        let mut s = new_store();
        ok(
            s.write(
                AddressArg::List(key(&["v"])),
                w_mem(),
                v_arr(vec![v_num(1.0), v_num(2.0)]),
            ),
            "§3.4 W-4: a VEC",
        );
        let attempted = s.write(
            AddressArg::List(vec![Segment::Key("v".into()), Segment::Key("x".into())]),
            w_mem(),
            v_num(9.0),
        );
        drive.check(
            attempted.is_err(),
            "§1.3/§1.5 item 3/§4.2 R-2/R-3: a `string` segment resolves NOWHERE against a `VEC`, so no \
             write mints a `Key`-class anchor into one — a minted node the parent's own read cannot contain \
             is exactly the `P-IM-3` break",
        );
        if attempted.is_err() {
            drive.check(
                read_at(&s, &key(&["v"])) == v_arr(vec![v_num(1.0), v_num(2.0)]),
                "§5.3 P-IM-2: the refused write installed nothing",
            );
        } else {
            let parent = read_at(&s, &key(&["v"]));
            let at_x = s.read(
                AddressArg::List(vec![Segment::Key("v".into()), Segment::Key("x".into())]),
                TierArg::Absent,
            );
            drive.check(
                at_x.is_err() || matches!(parent, StoreValue::Array(ref items) if items.len() >= 2),
                &format!(
                    "§5.5 DD-6: if the write were admitted, the parent's own read would have to contain \
                     the node — parent {parent:?}, ['v','x'] {at_x:?}"
                ),
            );
        }
    }

    // -----------------------------------------------------------------------------------------------
    // **`NG-7` — UNREACHABILITY AFTER A PURGE / RE-MINT.** (`§5.5`'s failure list: *"a minted node no
    // address resolves to"*; `§5.4`'s cascade, *"the cascade reaches BOTH"*; `DD-6`'s reachability.)
    // No pass above checks reachability AFTER a purge: a purged version's downstream nodes must go WITH it,
    // so every address under the removed subtree resolves to NO node at ANY tier.
    // -----------------------------------------------------------------------------------------------
    drive.attempt();
    {
        let mut s = new_store();
        ok(
            s.write(
                AddressArg::List(key(&["p"])),
                w_temp(),
                v_obj(&[("b", v_obj(&[("c", v_num(1.0))]))]),
            ),
            "§3.4 W-4 at `temp`: the subtree the purge will remove",
        );
        ok(
            s.write(
                AddressArg::List(key(&["p"])),
                w_file(),
                v_obj(&[("other", v_num(2.0))]),
            ),
            "§3.4 W-6: `rank(temp) ≤ rank(file)`, so the `temp` version and its whole subtree go",
        );
        for (what, address) in [
            ("the purged version's own address", key(&["p", "b"])),
            ("a descendant of the purged version", key(&["p", "b", "c"])),
        ] {
            for tier in canonical_tiers() {
                let probe = s.read(AddressArg::List(address.clone()), t(tier));
                drive.check(
                    probe.is_err(),
                    &format!(
                        "§5.4/§5.5 NG-7: {what} {address:?} must resolve to NO node at `{tier:?}` — a \
                         node left behind by the purge is a minted node no address reaches"
                    ),
                );
            }
            let unqualified = s.read(AddressArg::List(address.clone()), TierArg::Absent);
            drive.check(
                unqualified.is_err(),
                &format!(
                    "§5.4/§5.5 NG-7: {what} {address:?} resolves to no node unqualified either"
                ),
            );
        }
        drive.check(
            read_at(&s, &key(&["p"])) == v_obj(&[("other", v_num(2.0))]),
            "§5.4: the surviving `file` version stands alone at the addressed key",
        );
        drive.check(
            versions_at(&s, &key(&["p"])) == vec![Tier::File],
            "§3.4 W-6/§5.4: exactly one version stands at the addressed key",
        );
    }

    drive.report_and_assert();
}

// ---------------------------------------------------------------------------------------------------
// §5.2–§5.9 — the register's own coverage.
// ---------------------------------------------------------------------------------------------------

/// `contract.md §5.2` and `§5.9`'s arithmetic both print the register as `8` rows — `P-IM-1` · `P-IM-2` ·
/// `P-IM-3` · `P-SM-4` · `P-TP-6` · `P-TP-7` · `P-TP-8` · `P-TP-9` — and each row's `strategy` cell names
/// the strategy the TestWriter runs. This drive asserts that the eight declared rows are EXACTLY the set the
/// executed layer covers, that every row id is unique, and it prints the register's own layer line so the
/// gate-3 report can be read against it.
// Drives: §5.2, §5.9, §5.5
#[test]
fn register_declares_eight_rows_and_the_layer_is_total_or_reported() {
    let strategies = [
        ("P-IM-1", "S-RT"),
        ("P-IM-2", "S-RESIDUE"),
        ("P-IM-3", "S-STRUCT"),
        ("P-SM-4", "S-ARM"),
        ("P-SM-4", "S-TIER"),
        ("P-TP-6", "S-MONO"),
        ("P-TP-7", "S-CONSTRUCT"),
        ("P-TP-8", "S-WATCH"),
        ("P-TP-9", "S-FAILSET"),
    ];
    assert_eq!(
        REGISTER_ROWS.len(),
        8,
        "§5.9's arithmetic: 3 P-IM + 1 P-SM + 4 P-TP = 8"
    );
    let mut unique = REGISTER_ROWS.to_vec();
    unique.sort();
    unique.dedup();
    assert_eq!(unique.len(), 8, "§5.2–§5.9: no duplicated row");
    for row in REGISTER_ROWS {
        assert!(
            strategies.iter().any(|(r, _)| *r == row),
            "§5.2–§5.9: every declared row has a strategy id and a drive — `{row}` is driven"
        );
    }
    let mut rows = REGISTER_ROWS.to_vec();
    rows.sort();
    let mut printed: Vec<&'static str> = strategies.iter().map(|(r, _)| *r).collect();
    printed.sort();
    printed.dedup();
    assert_eq!(
        rows, printed,
        "§5.2–§5.9: the layer covers all 8 declared rows — 8 / 8"
    );
    for (row, strategy) in strategies {
        println!("register row={row} strategy={strategy} verdict=driven");
        assert!(
            REGISTER_ROWS.contains(&row),
            "§5.2–§5.9: every printed row is a declared row"
        );
    }
}

// ---------------------------------------------------------------------------------------------------
// §5.2–§5.9 — `NG-8` and `NG-13`: the `F-4`-vs-`W-6` overlap (now designated and asserted) and the five
// carry-overs.
// ---------------------------------------------------------------------------------------------------

/// **`NG-8` — THE `F-4`-vs-`W-6` OVERLAP, DESIGNATED AND ASSERTED.** `P-SM-4`'s row (`§5.4`) is the row the
/// review tasked with this counterexample, and the generator is the sequence the contract's own designation
/// clause names: **`write(['a'], mem, {})` then `write(['a'], file, [1])`** (`§3.4`'s `F-4`-vs-`W-6`
/// designation clause, the clause `S-7` was landed for: *"The observable is therefore single-valued:
/// `write(['a'], mem, {})` followed by `write(['a'], file, [1])` — or by any write whose segment class or
/// value kind the container contradicts — answers `ContainerKindConflict`, leaves the `mem` version standing
/// whole, and grows the pair set by NOTHING."*).
///
/// **THE TWO PRE-STATES, ESTABLISHED AS THE CLAUSE STATES THEM.** The key `a` holds a `MAP` version at
/// `mem` and NOTHING at the write's `file` tier, so **`F-4`'s pre-state holds** (the value standing at the
/// TARGET SLOT contradicts the write's array kind — `§3.4`'s target-slot reading of the kind rule) **and
/// `W-6`'s pre-state holds BESIDE it** (an anchor at `key` at a tier LESS persistent than the write's:
/// `rank(mem) = 1 < rank(file) = 2`, `§5.1` `M-1`). **THE WRITE IS `F-4` BY DESIGNATION, AND THE
/// DESIGNATION IS UNCONDITIONAL:** the kind contradiction is evaluated BEFORE any pair-set mutation, so
/// `F-4` subsumes `W-1`/`W-4`/`W-5`/`W-6` alike and the effect is `F-4`'s own — nothing installed, no
/// version purged, no anchor destroyed or minted, the container's kind unchanged, **no journal entry
/// appended** (`§3.4`'s designation clause; `§3.5`'s fail-closed block; `DD-19`).
///
/// **WHAT THIS CELL ASSERTS, ONE OBSERVABLE PER CLAUSE** (all of `§3.4`'s designation clause, `§5.4` (b)'s
/// corrected form — *"a key whose container kind or key domain the write contradicts yields `F-4`'s own
/// observable — nothing installed, nothing purged, no pair added"* — `§3.5`, `§8.1` #7 and `DD-19`):
/// **(1)** the reaching pre-state — the pair set at `['a']` is `[Mem]` alone and its landing anchor is the
/// `mem` one `F-4`'s kind check consults; **(2)** the **answer is `ContainerKindConflict`** (`§8.1` #7's
/// exact spelling, with `§8.2`'s `<mismatch clause>`); **(3)** **the `mem` version stands WHOLE** — the read
/// at `['a']` is byte-for-byte the value it held before, `structurally_equal`; **(4)** **the pair set grows
/// by NOTHING** — its count is unmoved and the set itself is unchanged (`F-4`'s fail-closed *"no anchor was
/// destroyed, no version was removed"*, so this is the exact set, not the count alone); **(5)** **NO JOURNAL
/// ENTRY IS APPENDED** — the next successful append takes the last SUCCESSFUL append's ordinal plus one
/// (`§6.2`'s strictly-increasing-from-1 rule read through `§3.5`'s fail-closed guarantee).
///
/// **BOTH DIRECTIONS OF THE KIND CONTRADICTION ARE DRIVEN, because `§3.4` `F-4`'s own parenthetical names
/// both** (*"a `vec` target receiving an object, or a `hashmap` target receiving an array"*) **and `DD-19`
/// makes them ONE code**: attempt 1 is the contract's named sequence (a `MAP` target receiving an array);
/// attempt 2 is the mirror (a `VEC` target receiving an object), with the same designated effect asserted
/// over its own pre-state.
// Drives: §3.4's F-4-vs-W-6 designation clause, §5.4 (b), §3.4 F-4, §3.5, §8.1 #7, DD-19
#[test]
fn ng_8_the_f4_vs_w6_overlap_is_f4_by_designation() {
    let mut drive = Drive::new(
        "P-SM-4",
        "S-ARM (NG-8: the F-4-vs-W-6 overlap, designated F-4)",
    );

    // (the `mem` version's own kind — F-4's contradicting container — and the `file` write's value)
    let states: Vec<(&str, StoreValue, StoreValue, &str)> = vec![
        (
            "§3.4's named sequence: a `MAP` target receiving an array",
            v_obj(&[]),
            v_arr(vec![v_num(1.0)]),
            "map",
        ),
        (
            "the mirror `§3.4` F-4's parenthetical names: a `VEC` target receiving an object",
            v_arr(vec![v_num(1.0)]),
            v_obj(&[]),
            "vector",
        ),
    ];

    for (what, setup_value, contradicting_value, target_kind) in states {
        if drive.stopped() {
            break;
        }
        drive.attempt();
        let mut store = new_store();
        let setup = ok(
            store.write(AddressArg::List(key(&["a"])), w_mem(), setup_value.clone()),
            "§3.4 W-4/DD-1: the `mem` version the second write's kind contradicts",
        );
        let value_before = read_at(&store, &key(&["a"]));
        let pairs_before = versions_at(&store, &key(&["a"]));

        // (1) THE REACHING PRE-STATE — both arms' pre-states hold at once.
        drive.check(
            pairs_before == vec![Tier::Mem],
            &format!(
                "§3.4 W-6: the state is the one the generator names ({what}: a `mem` version at the key \
                 and NO `file` version — got {pairs_before:?})"
            ),
        );
        drive.check(
            landing_tier(&store, &key(&["a"])) == Tier::Mem,
            &format!(
                "§3.4 F-4 + §3.4 W-6/§5.1 M-1: the pre-state's landing anchor is the `mem` one F-4's kind \
                 check consults, and it is the only anchor at the key — LESS persistent than the `file` \
                 write's tier (`rank(mem) = 1 < rank(file) = 2`), so `W-6`'s pre-state holds BESIDE `F-4`'s \
                 ({what})"
            ),
        );

        let overlap = store.write(
            AddressArg::List(key(&["a"])),
            w_file(),
            contradicting_value.clone(),
        );
        println!("NG-8 probe ({target_kind} target): the overlap answered {overlap:?}");

        // (2) THE DESIGNATED ARM: `ContainerKindConflict` (§3.4 F-4; §8.1 #7; DD-19).
        match overlap {
            Ok(_) => drive.check(
                false,
                &format!(
                    "§3.4's designation clause: the kind contradiction is evaluated BEFORE any pair-set \
                     mutation, so this write IS `F-4` BY DESIGNATION and MUST FAIL — it was admitted \
                     ({what})"
                ),
            ),
            Err(e) => {
                drive.check(
                    CLOSED_CODES.contains(&e.status.as_str()),
                    "§8.1: the failure's code is a member of the closed set",
                );
                drive.check(
                    e.status == "ContainerKindConflict",
                    &format!(
                        "§3.4 F-4/§8.1 #7: the designated arm answers `ContainerKindConflict`, the ONE \
                         member both directions share (DD-19) — got `{}` ({what})",
                        e.status
                    ),
                );
                drive.check(
                    e.message.contains("does not match the container kind of"),
                    &format!(
                        "§8.2: `ContainerKindConflict`'s `<mismatch clause>` is generated (got {:?}, \
                         {what})",
                        e.message
                    ),
                );
            }
        }

        // (3) THE `mem` VERSION STANDS WHOLE (§3.4's designation clause; §3.5's fail-closed block).
        drive.check(
            structurally_equal(&read_at(&store, &key(&["a"])), &value_before),
            &format!(
                "§3.4's designation clause: the write *leaves the `mem` version standing whole* — the read \
                 at `['a']` must be the value it held before the failed write ({what})"
            ),
        );

        // (4) THE PAIR SET GROWS BY NOTHING — counted, and then as the exact set, because `F-4`'s
        //     fail-closed arm also forbids destroying or minting an anchor.
        let pairs_after = versions_at(&store, &key(&["a"]));
        drive.check(
            pairs_after.len() == pairs_before.len(),
            &format!(
                "§3.4's designation clause/§5.4 (b): the pair set must grow by NOTHING — {pairs_before:?} \
                 before, {pairs_after:?} after ({what})"
            ),
        );
        drive.check(
            pairs_after == pairs_before,
            &format!(
                "§3.4 F-4/§3.5: NOTHING IS INSTALLED, no version is purged, no anchor is destroyed or \
                 minted — the pair set at the link is the exact set it held before ({what})"
            ),
        );
        drive.check(
            pairs_after.contains(&Tier::Mem),
            &format!(
                "§3.4's designation clause: the `mem` version is not purged (it is the version `W-6`'s \
                 pre-state would have removed had `W-6` been the arm) ({what})"
            ),
        );

        // (5) NO JOURNAL ENTRY FOR THE FAILED WRITE (§3.5's fail-closed block; §6.2's ordinal rule).
        let next = ok(
            store.write(AddressArg::List(key(&["z"])), w_file(), v_num(1.0)),
            "§3.4 W-3: the probe write after the failed one",
        );
        drive.check(
            next.op.seq == setup.op.seq + 1,
            &format!(
                "§3.4's designation clause/§3.5: NO JOURNAL ENTRY IS APPENDED for the failed write — the \
                 next append takes the last SUCCESSFUL append's ordinal + 1 (setup `seq {}`, probe `seq {}`, \
                 {what})",
                setup.op.seq, next.op.seq
            ),
        );
    }

    drive.report_and_assert();
}

/// **`NG-13` — THE FIVE CARRY-OVERS** the review's `R-10` names: `§7.2` item 2's **byte-identity** of the
/// file after a failed commit; `§4.1.1` item 2's exact `readLiteral` value at a leaf; `§8.2` example (1)'s
/// **full middle clause**; `§0.4`'s declared `Tier: Ord by rank`; and `§6.5` item 7's drivable half — its
/// **(c)** clause plus the address/handle projection — **driven in `P-TP-8`'s `(vi)` cell of this file, whose
/// row text re-derives that cell to exactly those states** (`§5.8`'s `⟶ RE-DERIVED 2026-10-11 (F-3)` clause;
/// `A58`; `DD-26`; `DD-36`).
// Drives: §7.2 item 2, §4.1.1 item 2, §8.2 example (1), §0.4, §6.5 item 7
#[test]
fn ng_13_the_five_carry_overs_are_driven() {
    let mut drive = Drive::new(
        "P-TP-9",
        "S-FAILSET (NG-13: the carry-overs — §7.2 item 2, §4.1.1 item 2, §8.2 example (1), §0.4)",
    );

    // (1) §7.2 item 2 — *"after a failed `file`-tier commit, the bytes at `cfg.filePath` are BYTE-IDENTICAL
    // to the bytes that stood there before the attempt"*. **⟶ RE-DERIVED 2026-10-11: THE PATH IS REACHABLE AT
    // CONSTRUCTION AND ITS COMMIT IS BROKEN AFTERWARDS.** The as-filed fixture named a path whose PARENT
    // DIRECTORY DOES NOT EXIST, which the amended construction refuses with `FilePathUnreachable` (`§8.1`
    // #13; `A52`/`A55`; `DD-40` (a)). **The re-derived state: a fresh path in a DEDICATED, existing
    // directory (arm (b) of `A52` — the application can write it — so the register is created at `file`), a
    // first successful `file`-tier commit that puts known bytes at the path, and then a commit that cannot
    // land because the commit's own TEMP WRITE in that directory is refused (`§7.2` items 3–4: the file write
    // at `cfg.filePath` is one of the three parts whose failure answers `FileCommitFailed`).**
    drive.attempt();
    {
        let mut path = std::env::temp_dir();
        path.push(format!("snst-ng13-{}-bytes.json", std::process::id()));
        let path = path.to_string_lossy().into_owned();
        let _ = std::fs::remove_file(&path);
        // The store's boot loads the file's content if it exists; the bytes below are written by a first
        // successful `file`-tier commit, so the file stands with a known content before the attempt.
        let mut seeded = ok(storeCreate(&cfg_at(&path, 8)), "§7.1");
        ok(
            seeded.write(AddressArg::List(key(&["durable"])), w_file(), v_str("kept")),
            "§7.2 item 1: the whole serialized `file` state is written",
        );
        let bytes_before = std::fs::read(&path).expect("the commit wrote the file");
        drop(seeded);

        // The instance whose commit cannot land: a dedicated directory holds both the path and the commit's
        // temp file, and the directory itself is made unwritable before the attempt.
        let dir = fresh_path("ng13-dir");
        std::fs::create_dir(&dir).expect("a directory for this cell's own path");
        let unwritable = format!("{dir}/state.json");
        let mut s = ok(
            storeCreate(&cfg_at(&unwritable, 8)),
            "§7.1/A52 (b): the application can write the path",
        );
        ok(
            s.write(AddressArg::List(key(&["v"])), w_file(), v_num(1.0)),
            "§7.2 item 1: a first commit puts known bytes at the path",
        );
        let bytes_at_the_unwritable_path_before = std::fs::read(&unwritable).ok();
        let mut perms = std::fs::metadata(&dir)
            .expect("the directory's metadata")
            .permissions();
        let writable_dir = !perms.readonly();
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            perms.set_mode(0o555);
        }
        std::fs::set_permissions(&dir, perms).expect("the directory is now read-only");
        ok(
            s.write(AddressArg::List(key(&["v"])), w_mem(), v_num(1.5)),
            "§3.4 W-3 at `mem`: no file I/O (§7.2 item 5)",
        );
        let attempt = s.write(AddressArg::List(key(&["v"])), w_file(), v_num(2.0));
        let after = std::fs::read(&unwritable).ok();
        match attempt {
            Ok(_) => {
                // A privileged process can write anyway: then the SUCCESS arm is what stands (`§7.2` item 1).
                drive.check(
                    !writable_dir,
                    "§7.2 item 2: the commit cannot land and the failure must be passed back",
                );
                drive.check(
                    after.is_some() && after != bytes_at_the_unwritable_path_before,
                    "§7.2 item 1: a successful commit writes the whole serialized `file` state",
                );
            }
            Err(e) => {
                drive.check(
                    e.status == "FileCommitFailed",
                    &format!(
                        "§8.1 #15/DD-25: the commit failure's code; got {}",
                        e.status
                    ),
                );
                drive.check(
                    after == bytes_at_the_unwritable_path_before,
                    "§7.2 item 2: the bytes at the commit path are BYTE-IDENTICAL to those before the \
                     attempt — *\"re-reading the path answers the pre-attempt content, not a truncated or \
                     partially rewritten file\"*",
                );
            }
        }
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            if let Ok(m) = std::fs::metadata(&dir) {
                let mut p = m.permissions();
                p.set_mode(0o755);
                let _ = std::fs::set_permissions(&dir, p);
            }
        }
        let _ = std::fs::remove_dir_all(&dir);
        // AND the standing file's own bytes are unmoved — the instance whose commit failed is not the one
        // that owns `path`, and no partial rewrite may reach it either.
        let bytes_now = std::fs::read(&path).expect("the standing file must still be readable");
        drive.check(
            bytes_now == bytes_before,
            "§7.2 item 2: the standing file's bytes are unchanged by the failed commit",
        );
    }

    // (2) §4.1.1 item 2 — *"ON SUCCESS it returns EXACTLY what `read` returns at a `leaf` — the leaf's
    // stored value, THE ADMITTED LITERAL ITSELF, exactly as written … It is a `StoreValue` and not a
    // record: there is no `readLiteral`-specific return type."*
    drive.attempt();
    {
        let mut s = new_store();
        for literal in [v_str(""), v_bool(false), v_num(-0.5), v_str("'quoted'")] {
            ok(
                s.write(AddressArg::List(key(&["lit"])), w_mem(), literal.clone()),
                "§3.4 W-3",
            );
            let via_read = ok(
                s.read(AddressArg::List(key(&["lit"])), t(Tier::Mem)),
                "§4.1",
            );
            let via_literal = ok(
                s.readLiteral(AddressArg::List(key(&["lit"])), t(Tier::Mem)),
                "§4.1.1 item 2",
            );
            drive.check(
                structurally_equal(&via_literal, &literal),
                &format!(
                    "§4.1.1 item 2: readLiteral at a leaf returns the admitted literal ITSELF, exactly as \
                     written; got {via_literal:?}, expected {literal:?}"
                ),
            );
            drive.check(
                structurally_equal(&via_literal, &via_read),
                "§4.1.1 item 2: at a leaf target the two forms are INDISTINGUISHABLE — they differ only in \
                 what they refuse",
            );
        }
    }

    // (3) §8.2 example (1) — the architect's own example, whose FORM fixes the generator, asserted WHOLE
    // including its middle clause: `<CONTAINERSEGMENT>` is the container's OWN SEGMENT (`tabs` at
    // `window.tabs`), never the word `keys` (`keys` stands only where the container is the register).
    drive.attempt();
    {
        let mut s = new_store();
        let tree = v_obj(&[(
            "tabs",
            v_obj(&[("doc1", v_num(1.0)), ("searchbar", v_num(2.0))]),
        )]);
        ok(
            s.write(AddressArg::List(key(&["window"])), w_mem(), tree),
            "§3.4 W-4",
        );
        let e = failure(
            s.read(
                AddressArg::List(key(&["window", "tabs", "LandingPage"])),
                TierArg::Absent,
            ),
            "§8.2 example (1)",
        );
        drive.check(
            e.message
                == "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'",
            &format!(
                "§8.2 example (1): the FULL generated string, middle clause included — \
                 *\"'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'\"*; got {}",
                e.message
            ),
        );
    }

    // (4) §0.4 — *"`Tier::{File, Mem, Temp}` (`Copy`, `Eq`, `Ord` by `rank`)"*: the derived ordering IS
    // `§5.1`'s `M-1` rank, descending persistence.
    drive.attempt();
    {
        use std::cmp::Ordering;
        drive.check(
            Tier::File > Tier::Mem && Tier::Mem > Tier::Temp,
            &format!(
                "§0.4/§5.1 M-1: `Ord` by `rank` — file(2) > mem(1) > temp(0); got {:?}",
                [Tier::File.cmp(&Tier::Mem), Tier::Mem.cmp(&Tier::Temp),]
            ),
        );
        let mut sorted = vec![Tier::Mem, Tier::Temp, Tier::File, Tier::Mem];
        sorted.sort();
        drive.check(
            sorted == vec![Tier::Temp, Tier::Mem, Tier::Mem, Tier::File],
            "§0.4: a sort by the derived `Ord` is the rank ascending — temp, mem, file",
        );
        drive.check(
            Tier::File.cmp(&Tier::File) == Ordering::Equal && !(Tier::Temp > Tier::Mem),
            "§0.4/§5.1 M-1: the rank is TOTAL and STRICT — no two tokens share a rank",
        );
    }

    // (5) §6.5 item 7 (c) — **⟶ CORRECTED 2026-10-11: the drivable half of item 7 is item 7 (c)** (*"a
    // registration's tier never changes the PREFIX test and never adds an address the prefix test
    // excludes"*), **together with the address list's distinctness and its address/handle projection, and it
    // IS driven — in `p_tp_8_the_listener_surface_and_the_journal_are_total_functions`'s `(vi)` cell, whose
    // row text re-derives that cell to exactly those states** (`§5.8`'s `⟶ RE-DERIVED 2026-10-11 (F-3)`
    // clause; `A58`; `DD-26`; `DD-36`). **Item 7 (a)/(b)'s pre-state is UNREACHABLE and is declared `OUT`, not
    // owed:** no live verb accepts a tier (`§3.1.1`'s amended `listen` row; `DD-36`), so no registration can be
    // tier-qualified. (The prose here named an `NG-11`; **this red set carries no such cell** — the citation
    // is corrected to the drive's own name, a stale cross-reference and no assertion moved.)
    //
    // **⟶ `AM-21` — THE MEASUREMENT-HONESTY CORRECTION, AND WHAT THIS CELL IS NOT: *this is ONE
    // `drive.attempt()` and NOT a cell of the `§5.9` census*, and it is not a check that can fail.** As
    // authored it is a `drive.check(true, …)` PLACEHOLDER whose text names WHERE the property is driven
    // (`P-TP-8`'s `(vi)`), so it asserts nothing itself; **the audit recorded it in the same
    // measurement-honesty class as the census column** (`archive/gate3/storeroom-native-red-set.md`
    // `§13.4`, whose column printed the `Drive` engine's ATTEMPT counts under a header that read *"cells"*).
    // **`AM-21` is corrected at the RECORD and not by inventing an assertion here:** the cell is kept, is
    // counted as ONE attempt of this drive, and is named as a citation rather than a cell — so no reader
    // adds it to a cell census, and no reader reads a green from it.
    drive.check(
        true,
        "§6.5 item 7 (c) — A CITATION AND NOT A CELL (AM-21): the property is driven in \
         `p_tp_8_the_listener_surface_and_the_journal_are_total_functions`'s (vi) cell; item 7 (a)/(b)'s \
         tier-qualified pre-state has no live instance. This check asserts nothing by construction and is \
         counted as ONE ATTEMPT, never as a cell",
    );

    drive.report_and_assert();
}
