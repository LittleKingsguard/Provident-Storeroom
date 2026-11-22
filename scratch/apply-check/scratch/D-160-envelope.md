# Envelope — `D-160` · COMPACTION DROPS HISTORY · L4 landing pass · 2026-11-17

**THE PATCH:** `scratch/D-160-compaction-drops-history.patch` — 9 files, 2,019 lines, `git apply --check` **exit `0`**
against this tree's pristine working copy (`HEAD` `ec11787` plus the uncommitted `strata/decisions.md` amendment,
which the patch does not touch).

**THE BATTERIES, EACH RUN ONCE AFTER, IN A COPY OF THIS TREE WITH THE PATCH APPLIED**
(`scratch/d160-copy`, a source-only clone; `CARGO_HOME` pointed at this tree's own `.cargo-home`):

| leg | invocation | result |
|---|---|---|
| JS suite | `npm test` | **exit `0`** · `1362` tests · `1361` pass · **`0` fail** · `1` skip (= the `1359 / 1358 / 0 / 1` baseline **plus the three new cells**) |
| typecheck | `npm run typecheck` | **exit `0`** |
| Rust batteries | `CARGO_HOME=.cargo-home cargo test --offline --no-fail-fast` | **exit `0`** · **22** binaries · every `test result: ok` · **0 FAILED** |
| wasm compile | `CARGO_HOME=.cargo-home cargo check --offline --target wasm32-unknown-unknown -p storeroom-js-binding` | **exit `0`**, **0 errors** |
| build | `CARGO_HOME=.cargo-home npm run build` | **exit `0`** (the addon re-staged: `1,467,536` bytes, down from `1,471,384`) |
| wasm package | `CARGO_HOME=.cargo-home node scripts/build-wasm-package.mjs` | **exit `0`** (`@auspicion/provident-storeroom-js-wasm @ 1.13.0` staged) |

**THE OUT-OF-GLOB DRIVERS, ALSO RUN ONCE (their own instruments, not `npm test`'s):**

| driver | result | reading |
|---|---|---|
| `node tests/e2e/greens.mjs` | **`AUTHORED 254 · EXECUTED 254 · PASS 254 · FAIL 0`** | green **after** the one row that turned (`JSG-10.12`) was re-derived (§7) |
| `node tests/e2e/discard-witness.mjs` | `AUTHORED 85 · PASS 82 · FAIL 3` (`DW-09.1`, `DW-09.2`, `DW-16.3`) | **the recorded pre-existing baseline** — the `1.11.0` and `1.12.0` envelopes both record *"discard-witness 82/3, equal to a stashed baseline"*, and all three reds are judgement-HOST cells, no journal subject among them |
| `node tests/e2e/blind-constraints-v2.mjs` | one row red: **`E2E-C-9 — the compaction arm: the reversal returns a record and regenerates from the durable ground truth, and RollbackCompacted has no producer left`** (`E2E-C-9.x0` fails, its nine declared cells NONRUN behind it); every other row `PASS = population, FAIL 0` | **THIS IS THE PASS'S ONE KNOWN RED AND IT IS A BLIND INSTRUMENT'S** (§8 residual 5) |

**The published surface moves no byte**: no `index.d.ts`, no `StoreStatus` member, no `StoreConfig` key, no entry,
no `WriteRecord` field list change. `bindings/js/src/crossing.rs:956` and `codec.rs:959` still carry
`JournalOp.compacted` across unchanged — and it is `false` on every record (see §5).

---

## 1 · EVERY JOURNAL CONSUMER TOUCHED, AND WHAT IT NOW READS

**`src/store.rs` — the eight live `op.compacted` tests, all of them replaced or deleted:**

| site (as filed) | what it read | what reads it now |
|---|---|---|
| `append`'s loop count (`:2319`–`:2323`) | `journal.iter().filter(!op.compacted).count()` | **`self.journal.len()`** — with a drop there is no marked-but-retained entry left, so every entry held IS an uncompacted one (the clause is written at the line) |
| `append`'s mark (`:2327`–`:2329`) | `journal[oldest].op.compacted = true` | **`self.journal.remove(0)`** + `journal_floor = op_id_ordinal(dropped.op.opId)`; the loop's condition is unmoved (`uncompacted ≤ journal_length`) and the `base_state = assemble_all(register_ref)` rebuild is kept per drop |
| `write`'s snapshot (`:2650`–`:2659`) | a `Vec<String>` of every compacted op id, cloned **on every write** | **nothing** — deleted with `append`'s fifth position (the RCA §1 item 1 quadratic) |
| `delete`'s snapshot (`:2995`–`:3000`) | the journal's un-compacted op ids, collected on every delete | **nothing** — deleted with the same position |
| `rollback`'s candidate predicate (`:3160`–`:3170`) | `scope.any(|c| journal[c].op.compacted)` → `regenerate(&scope)` | **nothing** — deleted with the arm; the scope is the named op's subtree at or after its `seq`, and **there is no entry below the floor** |
| `rollback`'s walk mark (`:3215`) | `journal[candidate].op.compacted = true` on what it reverted | **nothing** — the walk's own idempotence holds the fact the mark protected (same pre-states, same order, same `undoneOps`) |
| `regenerate`'s replay filter (`:3494`) | `if journal[index].op.compacted { continue }` | **the whole function is deleted** (`D-160` items 1/5): no candidate can carry a mark, so the arm has no subject |
| `restore_compaction` (`:2212`–`:2219`) | `entry.op.compacted = compacted.contains(&entry.op.opId)` | **the whole function is deleted** with its two callers |

**The two `restore_compaction` call sites, read first and reported:** `commit_file`'s failing arm (`:1714`–`:1721`)
and `save_failed` (`:1766`–`:1772`). **Both guarded the same one thing** — `§6.1` item 5's marks that the failed
entry's own append had set, put back so that *"the failed write's residue may not include a compaction mark an
append caused"* (`§3.5`, `§6.4` `M-6`). **Neither guarded anything else**: the entry removal
(`journal.remove(index)`), the `restore(home, &entry.captured)` pre-state restore and `last_seq -= 1` are kept
byte-for-byte, and the residue guarantee they serve — *"the store's observable state after a failed write is
byte-identical to its state before it"* — is **untouched by a drop**, because a drop removes a journal record and
never a version. **So nothing is kept in their place, and that is the ruling's own reading**: a drop is permanent,
`journal_floor` keeps naming the op it took, and a rollback that names that op answers `RollbackCompacted`.

**Also touched (documentation only, no byte of logic):** `journalMark` (the *"a compacted entry is still a mark"*
bullet is re-said: a dropped entry is no mark at all), `restoreMark` (*"what the mark's window is"* re-said: a
dropped position is `JournalOpUnknown`, the head is always a mark the journal holds), `read_file_image` /
`durable_projection` / `Store::empty`'s neighbourhoods (the three stale `[Store::regenerate]` intra-doc links are
re-pointed at the deletion, so `cargo doc` reports **no broken link**).

**Consumers deliberately NOT touched, each read at its bytes:** `save_owed` (reads `op.tier`, `captured`, `after` —
no compacted test), `replayMark` / `replay_entry` (no compacted test), `journalMark`'s body (the head — never
filtered on the mark), `restoreMark`'s body (a position lookup — never filtered on the mark), `commit_file`'s
`save_owed`/`saved` gates, and `boot_load`/`install_file_image` (one caller fewer, byte-unmoved).

---

## 2 · ★ THE TWO REFUSALS, DRIVEN

**`rollback`'s lookup arm (`src/store.rs:3142`'s `let Some(index) = … else {` ) now decides them by ONE NUMBER**,
`journal_floor: Option<u64>` — the ordinal of the last op the compaction dropped, kept in the ids' own numbering:

* **a DROPPED op answers `RollbackCompacted`** — the named id's ordinal is at or below the floor;
* **an id that never named a store op answers `JournalOpUnknown`** — its ordinal is above the floor, **or the id
  does not parse at all** (an unparseable token never named a store op, so nothing can have dropped it);
* **an op the window still holds** is looked up and the walk runs, exactly as before.

**Driven** (`tests/e2e/journal-compaction.test.mjs`'s `JC-REFUSALS`, `journalLength: 8`, `10` writes): the first
write's id — dropped — answers **`RollbackCompacted`**; `op-9007199254740991` answers **`JournalOpUnknown`**; the
two codes are asserted **not equal**; neither call moved the address (`["a"]` still reads `10`) and the head mark
still names the newest op. Also driven at the crate's scope (`fail_codes.rs`'s
`s8_1_11_rollback_compacted_fires_at_the_dropped_floor_and_not_on_a_held_scope`: dropped → `RollbackCompacted`,
never-minted → `JournalOpUnknown`, held → returns and reports its `undoneOps`) and through the crossing
(`binding-crossing/support/mod.rs`'s `fail_code_drive("RollbackCompacted")` arm, which is now the POSITIVE drive
and requires all three answers plus the fixture-stands control).

### ★★ THE BRIEF'S PREMISE, REFUTED AT THE BYTES — `op-<seq>` IS FALSE

**The brief said *"op ids are the store's own sequence (`op-<seq>`), so the comparison is `seq ≤ journal_floor_seq`
— updated to the dropped entry's `op.seq`"*, and said a helper already derives a seq from an op id at `:3274`'s
neighbourhood. Both are refuted by this tree:**

* `op.seq` is **`self.last_seq`, the JOURNAL's per-instance append ordinal** (`Store::append`: `self.last_seq += 1;
  op.seq = self.last_seq`);
* the op id is minted by `next_op_id` from **`NEXT_OP`, a PROCESS-WIDE atomic** (`:38`, `:60`–`:62`); two
  instances created in one process each begin their own `seq` at `1` and take different ids;
* there is **no helper at `:3274`** (that neighbourhood is `journalMark`) and **no op-id parser anywhere in
  `src/`** — `grep` for `parse::<`/`strip_prefix` over `src/` returns one unrelated site in `error.rs`.

**The consequence is structural: a named id carries only its minted number, and the map from an id to its `seq`
lived in the entries the drop removed** — so a floor compared against `op.seq` could not be evaluated for a single
id it exists to refuse. **So the floor is kept in the ids' own numbering** (`fn op_id_ordinal`, `src/store.rs`,
documented at its own line with these citations) **and the comparison is `ordinal(named) ≤ journal_floor`.** One
number, one parser, `D-160` item 3's discriminator intact.

**The price of one number rather than a list is declared, not papered** (at the field and in §7 `R-1`): an id
**another instance minted inside this store's span** — numerically at or below the floor — also answers
`RollbackCompacted` rather than `JournalOpUnknown`, because an id carries no instance. No act of this store mints
such a token for its own journal, and `D-160` item 3 prices exactly this trade (*"the ids need not be retained to
keep a refusal honest"*).

---

## 3 · THE REVERSE WALK AND THE FLOOR

`rollback`'s candidate set is unmoved (`is_prefix(&address, &entry.address) && entry.seq >= floor`, `floor` the
named op's own `seq`). **What moved is the refusal's spelling**: `:3162`'s *"refuse to cross a compacted entry"*
had no subject once entries are dropped — there is no entry below the floor — **so the same refusal is spelled at
the lookup arm above** ("no entry exists below the floor" ⇒ `RollbackCompacted`), and the walk itself is the plain
backward walk, newest-first. **The mark `:3215` set on what it reverted is deleted with no replacement mechanism**,
and the reason is written at the line: its two grounds were *"the window took it"* (now a drop) and *"a reversal
spent it"* (whose readers — the candidate predicate and `regenerate` — are gone), and **the fact it protected is
now held by the walk's own idempotence**.

**`Store::regenerate` is deleted whole** (102 lines), with its docblock replaced by a dated tombstone clause:
`D-108`'s fourth arm had three subjects — a marked candidate, a durable ground truth to re-derive, and a base that
could be rebuilt — and the ruling removes all three. The file it read (`read_file_image`) and the install it used
(`install_file_image`) are byte-unmoved and keep the boot and the seed.

---

## 4 · THE RCA'S OWN DRIVE, RE-TAKEN — THE TWO FIGURES BESIDE THE OLD ONES

**The drive** (`scratch/d160-copy/scratch/rca-drive.mjs`, the RCA §2 shape: one instance, one unchanged address
(`["a"] = {a:1}`, `mem`), `journalLength: 64`, `N` writes; `rss` and `heapUsed` read as `process.memoryUsage()`
deltas from before the construction). **Every run also re-answers a `read`, a `write`, the journal's mark and a
`rollback` of the newest op after its `N` writes** — the store is intact at every point.

| `N` writes | `rss` — **before** (RCA §2) | `rss` — **now** | `heapUsed` — now | `heapUsed` KB/write | wall time now |
|---|---|---|---|---|---|
| 1,000 | 47 MB | **19.0 MB** | 4.9 MB | 5.02 | 68 ms |
| 2,000 | 125 MB | **27.9 MB** | 5.6 MB | 2.87 | 121 ms |
| 4,000 | 472 MB | **43.4 MB** | 14.3 MB | 3.65 | 227 ms |
| 8,000 | 1,850 MB | **56.5 MB** | 22.8 MB | 2.92 | 454 ms |
| 16,000 | 7,277 MB | **110.1 MB** | 36.7 MB | 2.35 | 872 ms |

**`rss` at 16,000 writes: 7,277 MB → 110.1 MB (66x smaller), and the curve is no longer quadratic** — the
doubling ratio is `1.47 · 1.56 · 1.30 · 1.95` where the old tree read `2.7 · 3.8 · 3.9 · 3.9`. **The per-write cost
falls with `N`** (5.02 → 2.35 KB) instead of rising with it, which is the signature of a bounded journal. **The
second realm's OOM between 12,000 and 16,000 writes was the same curve meeting the wasm heap; the wasm module
compiles clean (`cargo check --target wasm32`, 0 errors) and the package stages (`build-wasm-package`, exit `0`),
and this pass did NOT re-drive the wasm arm at 16,000 — that arm's own live drive is a separate instrument and is
owed.**

---

## 5 · WHAT ANSWERS `compacted: true` ON A `WriteRecord` NOW

**NOTHING.** `JournalOp.compacted` **stays a member of the published shape** (the task's one allowed exception:
`WriteRecord.compacted` is part of the published surface, `greens.mjs`'s `JSG-11.2`/`JSG-11.8` census it and a
fresh op answers `false`), **and no act of this tree assigns it again**: both `JournalOp` constructions
(`write`'s `:2817`, `delete`'s `:2993`) spell `compacted: false`, the mark in `append` is gone, and the mark in
`rollback` is gone. So `compacted` is `false` on every record the store has ever answered — the member is retained
for the published shape's sake and carries no state. **The suite's own cells that assert the member exists and is
`false` stay green** (`surface.test.mjs:320`, `addon-surface.test.mjs:707`, `greens.mjs`'s `JSG-11.8`), and
`fail_codes.rs`'s `reference_prior.op.compacted == false` check is unmoved.

---

## 6 · THE MEMORY CELL — THE DECLARED CEILING AND WHY THAT NUMBER

**`JC-MEMORY`** (`tests/e2e/journal-compaction.test.mjs`): `journalLength: 64`, **`N = 4,000`** writes at one
address, a `200`-write warm-up before the base reading, and

> **declared ceiling: `16 KB` per write** (`heapUsed`, not `rss`), **measured on this tree: `4.66`–`4.74 KB` per
> write over ten consecutive runs** (18.2–18.5 MB per run).

**Why `16`:** it is **3.4x the highest of the ten readings**. `heapUsed` is an instrument with an allocator's own
noise in it, so a ceiling set AT the measurement would redden on a different Node patch for a reason that is not the
store's. **What the margin does not excuse is a quadratic**: the old per-entry list cost `(N − journal_length)/2`
op-id clones per write, measured and predicted at **~115 KB per write** at this exact shape (RCA §2's table) — **24x
this ceiling and rising with `N`** — so any run of this cell would catch the mechanism this unit removes. **The
cell's message states both figures** (declared and measured) and the RCA's old figure beside them, as `D-160`'s
unsettled item 5 required.

**The other owed cells:** `JC-REFUSALS` (§2) and `JC-BOUNDED` — `10 x journalLength = 80` writes at distinct
addresses, after which a `read` at the oldest and newest addresses answers, a `write` lands and reports `seq 81`, the
store's own mark (`journalMark`, reached through `withAddon()` as the package reaches it) names that op, and a
`rollback` of it returns the three-member record and leaves the address absent. **No cell in the file asserts an
internal length** — the bound is measured by memory and by the store's own answers.

---

## 7 · THE CELLS RE-CUT, EACH WITH ITS REASON AT ITS BYTES

**The drop necessarily turns cells that asserted the MARK's retention; every one of them is re-cut in place (counts
unchanged) with a dated `⟶` clause naming `D-160` at the bytes it moves.**

* **Rust — `tests/integration/store-core/journal_and_rollback.rs` (3 cells):**
  `s6_4_m6_a_rollback_over_a_compacted_scope_regenerates_the_last_valid_state` →
  **`s6_4_m6_a_rollback_over_a_dropped_op_refuses_at_the_floor`** (drove a regeneration, now drives
  `RollbackCompacted` + `M-10`'s unchanged state); `s6_1_item5_the_compression_trigger_marks_the_oldest_entries` →
  **`…_drops_the_oldest_entries`** (same figure, the trigger's verb re-derived); `s6_6_a_mark_outside_the_window_is_still_replayable`
  → **`s6_6_a_mark_the_compaction_took_is_no_mark_at_all`** (the head still replays; the dropped mark answers
  `JournalOpUnknown` and moves nothing).
* **Rust — `tests/integration/store-core/properties.rs` (1 check):** `NG-4`'s sibling read of `prior_rollback`
  asserted a RETURN from the regeneration; it now asserts **`RollbackCompacted`**, and the three registry/per-tier
  checks after it are unmoved (a refusal moves nothing).
* **Rust — `tests/integration/binding-crossing/support/mod.rs` (the fail-set apparatus):** `fail_code_drive`'s
  `"RollbackCompacted"` arm is re-derived from its NEGATIVE form to the **POSITIVE** one (dropped id → the token,
  held id → returns, never-minted id → `JournalOpUnknown`, corrupt fixture stands); `RollbackCompacted` rejoins
  `crossing_reachable_fail_codes()`; `declared_unreachable_fail_codes()` is **empty and stays named**.
* **Rust — `tests/integration/binding-crossing/surface_verbs.rs` (the census):** figures move
  `16 + 5 + 1 = 22` → **`18 + 5 + 0 = 23`** (the set's own array is `23` members; the title's stale
  `twenty_two_and_sixteen` is re-worded with it), the sum still asserted so no fourth class appears silently.
* **Rust — `tests/integration/store-fail-set/fail_codes.rs` (2 cells):** `s8_1_11_…_is_declared_and_unreachable_…`
  → **`s8_1_11_rollback_compacted_does_not_fire_on_an_unreadable_image_over_a_narrowed_scope`** (subject unmoved:
  both its arms return; the *"no act produces the token"* sentence is read through a dated mark), and the control
  beside it becomes **`s8_1_11_rollback_compacted_fires_at_the_dropped_floor_and_not_on_a_held_scope`** — the
  rank's producer, its neighbour and its control at one window.
* **JS — `tests/e2e/file-save-coverage-properties.test.mjs` (4 cells in the one file):** `P-FSC-2`'s
  `regenerating-reversal` class gains a **`dropped-floor`** arm (the two refusals, driven) beside the marking one;
  `P-FSC-3`'s generated envelope is re-cut to the windows the compensation can reach (`journalLength 2–5`, landings
  `≤ journalLength − 1`) with the reason stated at its head, and its beta block's narrow arm is re-derived to the
  floor the composition now meets (`outcome` entry appended, landings stand, **no save**, fresh boot answers
  `FileImageRefused`); `P-FSC-4` is re-worded (**`the_dropped_record_and_the_walk_s_floor`**), its generator's
  arithmetic corrected (`journalLength 2–5`, `journalLength − 2` disjoint keys — the exact condition under which
  the reversed op stays inside the window), the *"the swallowed version is LOST"* limb **flipped to the truth the
  drop gives** (the record is gone, the state stands, and a reversal that names it answers `RollbackCompacted`),
  and limb (ii)'s window moved `2 → 3` for the same reason; the register census cell follows the four rows.
* **JS — `tests/e2e/file-save-coverage.test.mjs` (1 cell):** `FSC-ARM4-LOST` → **`FSC-ARM4-DROPPED-RECORD`**
  (the window takes the entry and NOT the state it described).
* **JS — `tests/e2e/greens.mjs` (1 row, `JSG-10.12`):** the row was *"REBUILDS FROM THE CREATION STATE AND
  RETURNS … and NO state of that path answers `RollbackCompacted`"*; **it is re-derived to the ruling's own two-way
  reading** — the DROPPED id answers the token, the HELD op reverses and returns, the dropped entry's version
  STANDS, the save still makes the bytes readable, and the seven-image-state class answers **both ways** on every
  state. Its diagnostic is re-said with it. **`AUTHORED 254 · PASS 254 · FAIL 0`.**

---

## 8 · THE RESIDUALS THIS PASS DECLARES AND DOES NOT PAPER

1. **`journalLength` is now the width of the COMPENSATION window, and that is the ruling's own price.** The kernel
   compensates a refusal through `rollback(opId)` and its floor branch already knows `RollbackCompacted`
   (`STORE_FLOOR_CODES`, `bindings/js/src/entry/kernel-foundations.mjs:80`). **Where the window has taken an op the
   composition must reverse, the store now refuses (item 3) instead of regenerating**, and the landed edits stand:
   driven at `P-FSC-3`'s beta arm (`journalLength: 1`: the floor's `outcome` entry is appended, the landings stand,
   no save runs and a fresh boot answers `FileImageRefused`). **`D-108` item 2's *"no landed edit survives a
   refusal, on any arm, and that is now unconditional"* is therefore conditional again on the window's width** —
   the architect's to rule on, not this pass's to hide. **At the windows a repair actually fits (`m ≤
   journalLength − 1`) the predicate holds unconditionally**, which is what `P-FSC-3`'s envelope now covers.
2. **`restoreMark`'s replay base is `born`, and a dropped entry's effects are no longer replayable.** The floor the
   code already carries (`base_state`) is a `StoreValue` — a READ view — so it cannot re-mint per-version/per-tier
   state; `replayMark` therefore replays `born` + the entries the journal holds, and a position the window took
   answers `JournalOpUnknown` (M-11). **A faithful "floor read through the base state" would need a per-version
   capture at each drop (`capture_register()`) plus the position it names** — a design `D-160` does not settle
   (item 3 of its "does not settle" list) and this pass does not invent. No shipped cell drives it.
3. **The foreign-id collision class** (§2, above): one number cannot tell another instance's id from a dropped one.
4. **The wasm arm's own live drive at 16,000 writes is not re-taken here** (§4): it compiles and stages clean, and
   its live drive is a separate instrument.
5. **ONE OUT-OF-GLOB BLIND INSTRUMENT ROW IS RED AND THIS PASS DID NOT RE-CUT IT.** `tests/e2e/blind-constraints-v2.mjs`'s
   row **`E2E-C-9 — the compaction arm: the reversal returns a record and regenerates from the durable ground truth,
   and RollbackCompacted has no producer left`** is written *blind* against the mark-era premise (its own ten cells
   declare the regeneration and the token's absence). **`D-160` reverses that premise by ruling**, so the row's drive
   throws at its first step (`E2E-C-9.x0`) and its nine declared cells are `NONRUN` behind it; **every other row of
   that driver reads `PASS = population · FAIL 0`.** **A blind instrument is re-cut by its owning test pass and never
   quietly by the implementer**, which is the corpus's own practice (`SROM-B1` was *"written red, now green"* by the
   pass that owned it, `D-16`), so this row is named here rather than edited: **its re-derivation is a `P-FSC-4`-class
   re-cut with `D-160` items 1 and 3 as the authority, and it is the first thing the test pass should take.**

---

## 9 · THE ONE EDIT MOST LIKELY TO REDDEN A SHIPPED CELL

**`src/store.rs`'s `rollback` lookup arm — the `RollbackCompacted` answer itself.** Every other change is either a
deletion with no reader or a doc clause; that one line **mints a producer for a rank the tree has spent five
decisions (`D-108`, `D-109`, `D-118` and their cells) asserting has none**, so any cell anywhere that rolls back an
op the window took, or that censuses the fail set's populations, turns on it. **Nine cells turned under it in this
tree** (§7) and **the next most likely is anything that reverses a repair at a small `journalLength`** — a
composition cell, not a store cell — because a refusal's compensation is the one path that names an op the store's
own window may have dropped.

**The runner-up is `append`'s `remove(0)`**: any consumer that ever assumed the journal keeps a position is answered
by `JournalOpUnknown` now, and the `JC-BOUNDED` cell is the tripwire.

**And the red this pass KNOWS it leaves standing is a blind instrument's**: `blind-constraints-v2.mjs`'s
`E2E-C-9` row (§8 residual 5) — a blind row cannot be re-derived from inside the pass that falsifies it without
becoming a non-blind cell, and its owning pass is the one that may do it.
