# L1 test stratification — `Provident-Storeroom`

**WHAT THIS FILE IS.** The declaration of the **test-layer stratification**: an assignment of **every existing
test artifact** to one of the strata preset's three test scopes — `tests/e2e/`, `tests/integration/<module>/`,
`tests/unit/<module>/` — with the module each file drives and the layer it reports. **It moves no file and
edits no test.** It is a declaration for the architect's review, made under `strata/decisions.md` **`D-5`**
(*"Keep the preset's choice"*): the preset's three write scopes stand as configured, **the tree adapts**, and no
scope is bent to a path this project already uses.

**⟶ AMENDED IN PLACE, SAME BRANCH, BY THE ROUTE PASS THE ARCHITECT ORDERED.** The blocker this declaration
raised — *the bare specifier does not resolve from outside `bindings/js/`, and a relative re-pointing destroys
the claim the battery rests on* (§5's *self-reference* bullet) — **is closed by `strata/decisions.md` `D-6`**:
*"Use O3 for e2e publish-readiness, O4 for earlier tests."* This pass **adds a route to every one of the 33
e2e cells** (§2.1's new `route` column; the declaration at **§2.6**), **states what the integration and unit
scopes' route is** (§2.6.3 — *none, by design*, with three named exceptions), **declares what `O3`'s staged
tree contains** (§2.6.2), **states the re-spellings by route** (§2.6.4), and **carries the two-cell migration
consequence of `D-3`'s correction** (§5). **Everything else stands as committed**: the 75 files and their three
scopes, the two cross-scope helpers, the layer column, the five files that span two layers, and every finding
and question. **No route tag implies a label** — **`F3` and `F4` are NOT answered here** (§2.6.7, §3). **This
pass moved no file, edited no test and started no L2**: `D-6` orders no file move.

**⟶ AMENDED IN PLACE, SAME BRANCH, AT `D-8`, `D-9` AND `D-10` — THE THREE DECLARATIONS, AND WHAT EACH
REPLACED.** This pass answers three rulings and moves nothing. **`D-9`'s `F3` relabel** — *the `O3` cells
labelled `assembled`, the `O4` cells kept at `ENVELOPE/PURE`* — is **declared at §2.7**, with the structural
move chosen **on evidence read at the five sites the ruling names**, not on preference. **`D-10`'s installed-layer
battery** is **declared at §2.8**: its **15** cells and their subjects, its scope and target path, **its own
label string**, its command, its own helpers, and the two prohibitions it must not break. **`D-8`'s disposal of
`JSG-12.18`'s `LICENSE` limb** is **declared at §2.9**. **What this pass replaced, named rather than absorbed:**
§2.1's four `O3` rows carried `layer: envelope` and a flat `tests/e2e/` target (**now `assembled` and
`tests/e2e/staged-install/`**, §2.1 rows 18, 20, 22, 23); §3's `tests/e2e/` census read **envelope 29 ·
assembled 4** (**now 25 · 8**, §3); **F3 read as an open label question** (**closed by `D-9` here**), **F4 read
as "the `installed` layer has no battery at all"** (**now: a battery is declared and runs nothing yet**, §2.8,
F4 amended at §3); **`JSG-12.18`'s two edits stood unnamed** (**now named, §2.9**). **`Q13` — the `LICENSE` row —
is CLOSED by `D-8`** and keeps its wording so a reader sees what was asked. **The vocabulary is CITED, never
re-labelled and never minted:** the labels §2.7 and §2.8 assign are existing members of the sibling unit's set
(`ENVELOPE/PURE` · `LIVE / ASSEMBLED PACKAGE` · `LIVE/INSTALL` · `APP`), whose definitional home is
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/acceptance.md §4.2` — **the ARCHIVED path, because
the keep-set took one `contract.md` per module and the citing clause
(`docs/specs/storeroom-publish/contract.md §4.2` item `3`) still writes `docs/specs/storeroom-js/acceptance.md`,
a path the kept corpus does not carry.** **This pass moved no file, edited no test, ran nothing and started no
L2.**

**INPUTS, AND HOW EACH WAS USED.** `strata/decisions.md` read whole (`D-1`…`D-10`; `D-5` orders the
stratification, **`D-6` orders the route pass and `D-5`, `D-4` and `D-3`'s correction are its context**,
`D-7` narrows `O3`'s membership and gives it its own helpers, **`D-8`, `D-9` and `D-10` order the three
declarations of this pass** and `D-3`'s correction, `D-4` and `D-7` are theirs,
`D-4` makes the scenarios' placement upstream of the manifest decision, `D-1` and `D-3` are why the kernel's
cells have one module and no declared export set to test against); `strata/brief.md` read whole (§5 item 8 — *a green
is always reported with its layer* — and §6's open limits are the layer-preservation clause's ground); the
existing map `docs/L1/module-map.md` and `docs/L1/modules.json` (§2.4 owns the four batteries and states their
paths are present-state; the 19 module ids are the only ids used below); and the **75 files themselves**,
surveyed on this branch by glob, by `grep` for their imports and cell names, and by reading each file's header
and doc comments — **not by reading 75 files end to end**, and **no test was run** (this pass had no shell).

**THE DENOMINATOR, MEASURED ON THIS BRANCH.** `tests/` **15** files (14 `.rs` + `support/mod.rs`) ·
`bindings/js/tests/` **7** (6 `.rs` + `support/mod.rs`) · `bindings/js/test/` **42** (37 `*.test.mjs` +
4 shared helpers + `REMEASURE-2026-10-18.md`) · `bindings/js/greens/` **11** (10 runners + 1 `.md`).
**15 + 7 + 42 + 11 = 75 ✓** — the same denominator the map's FIGURES print for those four directories, and the
same 75 `D-5` calls *"a redistribution of 75 files across three layers"*.

---

**⟶ ★ THE MOVE IS DONE. IT WAS EXECUTED ON 2026-10-25, AND EVERY `present path` COLUMN IN THIS FILE IS NOW A PATH
THAT DOES NOT EXIST.** **This block is the one thing a reader must take from this file before any table in it, and
it is placed here because the sections that follow were written before the move and their captions still read as
though it had not happened.** **`bindings/js/test/`, `bindings/js/greens/`, `bindings/js/tests/` and `tests/`'s own
top level are EMPTY OR GONE** — measured on this tree, a glob of each returns nothing — and **the `target` column of
§2.1, §2.2, §2.3 and §2.5 is the tree**:

| what the tables call it | what is on disk today |
|---|---|
| `tests/e2e/` | **44 files** — the 33 assignments of §2.1, plus the installed battery's three (`installed/live-install.mjs`, `installed/install-support.mjs`, `installed/license-row-evidence.json`), the cut's three helpers (`staged-install/staged-install-support.mjs`, `module-set.mjs`, `pack-reachability.mjs`), and `REVIEW-2026-10-24.md` — **⟶ RE-MEASURED 2026-10-28: `79` files** (`find tests/e2e -type f`), re-counted in the five classes this section's own rows use: **`55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents** (`REMEASURE-2026-10-18.md`, `REVIEW-2026-10-24.md`, `file-tier-save/file-tier-save-greens.md`); **`55 + 12 + 8 + 1 + 3 = 79` ✓** |
| `tests/integration/` | **33 files** — the 29 assignments of §2.2, the two helpers of §2.5 (`constraint-kernel-helpers.mjs`, `held-listener-identity-helpers.mjs`) and `support/mod.rs` (the store crate's) and `binding-crossing/support/mod.rs` (the binding crate's) |
| `tests/unit/` | **5 files**, exactly §2.3's five |
| `tests/Cargo.toml` | **1 file** — the manifest of the third workspace member (`storeroom-tests`) that hosts the Rust targets; it was not in the 75 because it did not exist |

**THE COMMANDS MOVED WITH THE FILES, AND THIS IS THE OTHER THING THE TABLES CANNOT SAY.** `npm test` is **`node
--test "tests/**/*.test.mjs"`**, taken at the repository root — it reaches all 37 `*.test.mjs` files in one run
across the three scopes; the three Rust legs are `cargo test --offline -p storeroom-native` (**415**), `cargo test
-p storeroom-tests` (**235**) and a plain `cargo test` (**650**); and `npm run greens` is the three runners **at
their new paths** (`tests/e2e/greens.mjs`, `tests/e2e/live-drive.mjs`, `tests/e2e/file-tier-save/scenarios.mjs`).
**`D-11`'s owner for the leg is unchanged — the battery/greens modules own the command, the tracker leg and the
layer statement — and only the strings moved.**

**⟶ AND THE PARAGRAPH ABOVE'S THREE FIGURES ARE RE-MEASURED AT THIS TREE 2026-10-28 — ITS `37` `*.test.mjs`, ITS `415` AND ITS `650` ARE THE READINGS OF THEIR OWN DATE.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause.** **THE FILE COUNT: `69` `*.test.mjs` under `tests/`** — `55` under `tests/e2e/`, `11` under `tests/integration/js-constraints/`, `3` under `tests/unit/js-surface/` and `tests/unit/js-constraints/` — **and `npm test` reaches all of them in one run: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`, the one skip being the dispatcher-shape cell.** **THE THREE RUST LEGS:** `cargo test --offline -p storeroom-native` **434** (415) · `cargo test -p storeroom-tests` **235** ✓ · a plain `cargo test` **669** (650), and `434 + 235 = 669` ✓. **AND `npm run greens` IS NO LONGER THREE RUNNERS AT THREE PATHS: it is `scripts/greens-chain.mjs`, the chain DISCOVERED from the tree — `11` runners at this date, `0` rejected for a missing exit arm among them, every one exit `0`, and the report's own line reads *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"*** (`D-21`'s discovery rule; the three the paragraph names are among the eleven). **THE FOUR-DIRECTORY POPULATION IS UNMOVED FROM THE RE-MEASURE ABOVE IT: `tests/e2e/` `79` · `tests/integration/` `33` · `tests/unit/` `5` · `tests/Cargo.toml` `1` `= 118`, in the same five classes (`55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents `= 79` ✓).** **No classification moves with any of it: the `O3` five, the `O4` thirty-three, the `none-by-design` thirty-seven and §2.4's `33 · 29 · 5 · 8 = 75` close over the 75 artifacts they always did.**

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED AGAIN AT THIS TREE 2026-10-28, BECAUSE THE CLAUSE ABOVE IS ITSELF PAST STATE — `D-57`'s ACT, AND THE SEVEN COMMITS IT READS.** `RCA-8(g)` ANNOTATE-BESIDE: **the two clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, including `1121` / `1120` / `1` and the `118`.** **THE FILE COUNT: `69` `*.test.mjs` under `tests/` ✓** — `55` under `tests/e2e/`, `11` under `tests/integration/`, `3` under `tests/unit/` — **and `npm test` reaches all of them in one run: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`, the one skip being the dispatcher-shape cell ✓.** **THE COUNT DID NOT MOVE ACROSS THE SEVEN COMMITS PAST `v1.3.0`, AND THE REASON IS WORTH PRINTING: those commits added CELLS to existing files rather than files** — `tests/e2e/discard-witness.mjs`, `held-listener-identity-greens.mjs` and the delete's own cells moved, and no path was added or removed under `tests/`. **THE THREE RUST LEGS, RE-RUN THIS DATE: `cargo test --offline -p storeroom-native` `434` ✓ · `cargo test -p storeroom-tests` `235` ✓ · a plain `cargo test` `669` ✓, and `434 + 235 = 669` ✓.** **`npm run greens` is still the chain DISCOVERED from the tree: `11` runners at this date, every one exit `0`, and the report's own line reads *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"* ✓.** **`npm run test:e2e` exit `0` ✓** (`15` cells declared: `14` PASS · `1` LAYER-LIMIT · `0` FAIL) **and `npm run typecheck` exit `0` ✓.** **THE FOUR-DIRECTORY POPULATION IS UNMOVED FROM THE RE-MEASURE ABOVE IT: `tests/e2e/` `79` ✓ · `tests/integration/` `33` ✓ · `tests/unit/` `5` ✓ · `tests/Cargo.toml` `1` ✓ `= 118` ✓, in the same five classes (`55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents `= 79` ✓).** **AND THE ONE THING THE SEVEN COMMITS COULD HAVE MOVED AND DID NOT: NO CELL WAS RETIRED AND NO SCOPE, DRIVER, LAYER OR ROUTE CHANGED** — the `D-56` ancestor widening and the delete's own pass reddened six existing cells and each was re-derived at its own home, which is a movement of assertions and not of the population. (`D-57`; `D-56`; the matching key is `test-stratification.json`'s `present_population_reconfirmed_2026_10_28_at_the_tree_eight_commits_past_v1_3_0`.)

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED A THIRD TIME AT THIS TREE 2026-10-28, BECAUSE THE CLAUSE ABOVE IS ITSELF PAST STATE — THE ELEVEN COMMITS PAST `v1.4.0`, OF WHICH THE THREE THAT MOVE THE PACKAGE ALL TOUCH THIS FILE'S SUBJECT.** `RCA-8(g)` ANNOTATE-BESIDE: **the two clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, including `1121` / `1120` / `1`, the `118`, the `69` and the `11` runners.** **THE FILE COUNT IS UNMOVED: `69` `*.test.mjs` under `tests/` ✓** — `55` under `tests/e2e/`, `11` under `tests/integration/`, `3` under `tests/unit/` — **and `npm test` reaches all of them in one run this date: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`**, the one skip being the same dispatcher-shape cell ✓. **THE COUNT DID NOT MOVE ACROSS THE ELEVEN, AND THE REASON IS THE SAME ONE THE CLAUSE ABOVE GIVES:** those commits added CELLS to existing files — `tests/e2e/discard-witness.mjs`'s `W11`/`W12` arms, the re-derived readings in `tests/e2e/in-commit-restart.test.mjs`, `direct-pass-restart.test.mjs`, `downstream-claims.test.mjs` and `def-ae-restore-mark.test.mjs`, and every cell that censused `LogEntry`'s six members before `D-65` — **and no path was added or removed under `tests/`.** **THE THREE RUST LEGS, RE-RUN THIS DATE: `cargo test --offline -p storeroom-native` `434` ✓ · `cargo test --offline -p storeroom-tests` `235` ✓ · a plain `cargo test --offline` `669` ✓, and `434 + 235 = 669` ✓.** **`npm run greens` is still the chain DISCOVERED from the tree: `11` runners at this date, every one exit `0`, and the report's own line reads *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"* ✓.** **`npm run test:e2e` exit `0` ✓** (`15` cells declared: `14` PASS · `1` LAYER-LIMIT · `0` FAIL) **and `npm run typecheck` exit `0` ✓.** **THE FOUR-DIRECTORY POPULATION IS UNMOVED: `tests/e2e/` `79` ✓ · `tests/integration/` `33` ✓ · `tests/unit/` `5` ✓ · `tests/Cargo.toml` `1` ✓ `= 118` ✓, in the same five classes (`55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents `= 79` ✓), and the DENOMINATOR `198` ✓ is unmoved with it.** **AND THE ONE THING THAT MOVED IS AN ASSERTION SHAPE, NOT A COUNT: `D-65` retired `LogEntry`'s `seq` member, so the cells whose PURPOSE was the position were re-derived to assert it BY INDEX** — `log[0]` is the entry, `indexOf` answers zero, and a second entry stands at one — **so the property outlives the member and no cell was retired.** **THE CLASSIFICATION ITSELF IS UNMOVED:** the `O3` five, the `O4` thirty-three, the `none-by-design` thirty-seven, the `assembled` eight and the `envelope` twenty-five are the same censuses at the same cells. (`D-57`; `D-58`; `D-63`; `D-65`; the matching key is `test-stratification.json`'s `present_population_reconfirmed_2026_10_28_at_the_tree_eleven_past_v1_4_0`.)

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED A FOURTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-ONE COMMITS PAST `v1.4.0`, OF WHICH THE SIX THAT CARRY `D-66`…`D-70` TOUCH THIS FILE'S SUBJECT IN CELLS AND IN NO PATH.** `RCA-8(g)` ANNOTATE-BESIDE: **the three clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, including `1121` / `1120` / `1`, the `118`, the `69` and the `11` runners.** **THE FILE COUNT IS UNMOVED: `69` `*.test.mjs` under `tests/` ✓** — `55` under `tests/e2e/`, `11` under `tests/integration/`, `3` under `tests/unit/` — **and `npm test` reaches all of them in one run this date: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`**, the one skip being the same dispatcher-shape cell ✓. **THE COUNT DID NOT MOVE ACROSS THESE SIX EITHER, AND FOR THE REASON EVERY CLAUSE ABOVE GIVES:** `D-66`'s touched set, `D-67`'s per-tier computation, `D-69`'s filter and `D-70`'s two declarations added CELLS to existing files — `tests/e2e/discard-witness.mjs`'s `DW-13`/`DW-14`/`DW-15` arms and the re-derived readings beside them — **and no path was added or removed under `tests/`.** **THE THREE RUST LEGS, RE-RUN THIS DATE: `cargo test --offline -p storeroom-native` `434` ✓ · `cargo test --offline -p storeroom-tests` `235` ✓ · a plain `cargo test --offline` `669` ✓, and `434 + 235 = 669` ✓.** **`npm run greens` is still the chain DISCOVERED from the tree: `11` runners at this date, every one exit `0`, and the report's own line reads *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"* ✓**, with `AUTHORED 103 · EXECUTED 103 · PASS 103 · FAIL 0`. **`npm run test:e2e` exit `0` ✓** (`15` cells declared: `14` PASS · `1` LAYER-LIMIT · `0` FAIL) **and `npm run typecheck` exit `0` ✓.** **THE FOUR-DIRECTORY POPULATION IS UNMOVED: `tests/e2e/` `79` ✓ · `tests/integration/` `33` ✓ · `tests/unit/` `5` ✓ · `tests/Cargo.toml` `1` ✓ `= 118` ✓, in the same five classes (`55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents `= 79` ✓), and the DENOMINATOR `198` ✓ is unmoved with it.** **THE CLASSIFICATION ITSELF IS UNMOVED:** the `O3` five, the `O4` thirty-three, the `none-by-design` thirty-seven, the `assembled` eight and the `envelope` twenty-five are the same censuses at the same cells — **the route census's subject remains the 75 pre-move artifacts, which is why 79 present e2e paths add no route row.** (`D-66`; `D-67`; `D-69`; `D-70`; the matching key is `test-stratification.json`'s `remeasured_2026_10_29`.)

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED A FIFTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-FOUR COMMITS PAST `v1.4.0` (`git describe`: `v1.4.0-24-g5331993`), AND NOT ONE OF THE THREE SINCE THE LAST READING REACHES `tests/`.** `RCA-8(g)` ANNOTATE-BESIDE: **the four clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, `1121` / `1120` / `1`, the `118`, the `69` and the `11` runners included.** **THE FILE COUNT IS UNMOVED: `69` `*.test.mjs` under `tests/`** ✓ — `55` e2e · `11` integration · `3` unit — **and `npm test` reaches all of them in one run this date: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`** ✓ (the one skip is the same dispatcher-shape cell). **THE THREE RUST LEGS: `cargo test --offline -p storeroom-native` `434` · `cargo test --offline -p storeroom-tests` `235` · a plain `cargo test --offline` `669`, `0` failed, exit `0`, and `434 + 235 = 669`** ✓. **`npm run greens` exit `0` — *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"*, `AUTHORED 103 · EXECUTED 103 · PASS 103 · FAIL 0`** ✓. **`npm run test:e2e` exit `0`: `15` declared / `15` recorded, `14` PASS · `1` LAYER-LIMIT · `0` FAIL** ✓, **and `npm run typecheck` exit `0`** ✓. **THE FOUR-DIRECTORY POPULATION IS UNMOVED: `tests/e2e/` `79` · `tests/integration/` `33` · `tests/unit/` `5` · `tests/Cargo.toml` `1` `= 118`** ✓, in the same five classes (`55 + 12 + 8 + 1 + 3 = 79` ✓), **and the denominator `198`** ✓. **THE REASON NO COUNT MOVED IS THE SAME ONE EVERY CLAUSE ABOVE GIVES AND IT IS MEASURED RATHER THAN ASSUMED: the three commits since the last reading write `docs/` and `strata/` alone, so no path under `tests/` was added, removed or renamed.** (`D-71`; `D-72`; the matching key is `test-stratification.json`'s `remeasured_2026_10_29_twenty_four_past_v1_4_0` and the matching re-reads are `docs/L1/entry-subdivision.md`'s, `kernel-subdivision.md`'s, `module-map.md`'s and `surface-deltas.md`'s clauses of the same date.)

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED A SIXTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-SIX COMMITS PAST `v1.4.0` (`git describe`: `v1.4.0-26-g92d2ec6`), AND NOT ONE OF THE TWO SINCE THE LAST READING REACHES `tests/`.** `RCA-8(g)` ANNOTATE-BESIDE: **the five clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, `1121` / `1120` / `1`, the `118`, the `69` and the `11` runners included.** **THE FILE COUNT IS UNMOVED: `69` `*.test.mjs` under `tests/`** ✓ — `55` e2e · `11` integration · `3` unit — **and `npm test` reaches all of them in one run this date: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`** ✓ (the one skip is the same dispatcher-shape cell). **THE THREE RUST LEGS: `cargo test --offline -p storeroom-native` `434` · `cargo test --offline -p storeroom-tests` `235` · a plain `cargo test --offline` `669`, `0` failed, exit `0`, and `434 + 235 = 669`** ✓. **`npm run greens` exit `0` — *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"*, `AUTHORED 103 · EXECUTED 103 · PASS 103 · FAIL 0`** ✓. **`npm run test:e2e` exit `0`: `15` declared / `15` recorded, `14` PASS · `1` LAYER-LIMIT · `0` FAIL** ✓, **and `npm run typecheck` exit `0`** ✓. **THE FOUR-DIRECTORY POPULATION IS UNMOVED: `tests/e2e/` `79` · `tests/integration/` `33` · `tests/unit/` `5` · `tests/Cargo.toml` `1` `= 118`** ✓, in the same five classes (`55 + 12 + 8 + 1 + 3 = 79` ✓), **and the denominator `198`** ✓. **THE REASON NO COUNT MOVED IS THE SAME ONE EVERY CLAUSE ABOVE GIVES AND IT IS MEASURED RATHER THAN ASSUMED: the two commits since the last reading write `docs/` and `strata/` alone — a declaration pass and the `D-73` record — so no path under `tests/` was added, removed or renamed, and the throw D-73 keeps had no cell to change because its propagation was already measured at `fc81fd3`.** (`D-73`; the matching key is `test-stratification.json`'s `remeasured_2026_10_29_twenty_six_past_v1_4_0` and the matching re-reads are `docs/L1/entry-subdivision.md`'s, `kernel-subdivision.md`'s, `module-map.md`'s and `surface-deltas.md`'s clauses of the same date.)

**⟶ AND EVERY COUNT ABOVE IS RE-MEASURED A SEVENTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-SEVEN COMMITS PAST `v1.4.0` (`git describe`: `v1.4.0-27-ga3312b7`), WHICH IS THE `1.5.0` PREPARATION, AND NOT ONE OF THEM REACHES `tests/`.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed.** **SO DO THE `1121` / `1120` / `1`, THE `118`, THE `69` AND THE `11` RUNNERS.** **THE FILE COUNT IS UNMOVED: `69` `*.test.mjs` under `tests/`** ✓ — `55` e2e · `11` integration · `3` unit — **and `npm test` reaches all of them in one run at this tree: `1121` tests · `1120` pass · `0` fail · `1` skip, exit `0`** ✓ (the one skip is the same dispatcher-shape cell). **THE THREE RUST LEGS: `cargo test --offline -p storeroom-native` `434` · `cargo test --offline -p storeroom-tests` `235` · a plain `cargo test --offline` `669`, `0` failed, exit `0`, and `434 + 235 = 669`** ✓. **`npm run greens` exit `0` — *"CHAIN COMPLETE — 11 discovered runner(s), every one exit 0"*, `AUTHORED 103 · EXECUTED 103 · PASS 103 · FAIL 0`** ✓. **`npm run test:e2e` exit `0`: `15` declared / `15` recorded, `14` PASS · `1` LAYER-LIMIT · `0` FAIL, and its `INSTALL-01` reads `members=21` at `provident-storeroom-1.5.0.tgz`** ✓, **and `npm run typecheck` exit `0`** ✓. **THE FOUR-DIRECTORY POPULATION IS UNMOVED: `tests/e2e/` `79` · `tests/integration/` `33` · `tests/unit/` `5` · `tests/Cargo.toml` `1` `= 118`** ✓, in the same five classes (`55 + 12 + 8 + 1 + 3 = 79` ✓), **and the denominator `198`** ✓. **THE REASON NO COUNT MOVED IS MEASURED RATHER THAN ASSUMED: the twenty-seven commits past `v1.4.0` add no path under `tests/` — the six that move the package change lines inside existing test files, and the `1.5.0` preparation adds none.** (`D-73`; the `1.5.0` preparation of this date; the matching key is `test-stratification.json`'s `remeasured_2026_10_29_twenty_seven_past_v1_4_0` and the matching re-reads are `docs/L1/entry-subdivision.md`'s, `kernel-subdivision.md`'s, `module-map.md`'s and `surface-deltas.md`'s clauses of the same date.)

**⟶ AND THE COUNTS ARE RE-MEASURED AN EIGHTH TIME AT THIS TREE, 2026-10-29 — THE ELEVEN COMMITS PAST `v1.5.0` (`git describe`: `v1.5.0-11-g8f5454f`), WHICH IS THE `1.6.0` PREPARATION, AND THIS TIME SIX OF THEM MOVE.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed, and the ones that moved are named with both readings.** **THE POPULATION IS UNMOVED: `tests/e2e/` 79 · `tests/integration/` 33 · `tests/unit/` 5 · `tests/Cargo.toml` 1 `= 118` ✓, the e2e breakdown still `55` `*.test.mjs` · `12` runners · `8` support modules · `1` evidence JSON · `3` documents `= 79` ✓, and `69` `*.test.mjs` stand under `tests/` ✓ — the eleven added cells live inside existing files and never added a file.** **THE LEGS, EACH RUN THIS DATE, `0` failed:** `npm test` **1121 · 1120 pass · `0` fail · 1 skip**, exit `0` ✓ · `cargo test --offline -p storeroom-native` **434** ✓ · `cargo test --offline -p storeroom-tests` **235** ✓ · `cargo test --offline` **669** ✓ (`434 + 235 = 669`) · `npm run greens` exit `0`, every discovered runner exit `0` ✓ · `npm run test:e2e` exit `0` (`15` cells declared: `14` PASS · `1` LAYER-LIMIT · `0` FAIL) ✓ · `npm run typecheck` exit `0` ✓ · `scripts/publish.sh --figures` exit `0`, three documents agreeing on `1.6.0` ✓. **AND THE ONE THING THAT DID NOT MOVE WITH THE COUNT IS THE SKIP: `1` skipped, the same single declared layer-limit the battery has carried.** (`D-74`; `D-75`; `D-77`; `D-78`; the manifest's own `test` script, and one run of each leg.)

**WHAT DID NOT MOVE, AND IT IS THE ASSERTION THIS FILE EXISTS TO MAKE:** the classification itself. **No file's
`scope`, `driver`, `layer` or `route` changed with its path**; the `O3` five, the `O4` thirty-three, the
`none-by-design` thirty-seven, the `assembled` eight and the `envelope` twenty-five are the same censuses at the
same cells, and §2.4's arithmetic (`33 · 29 · 5 · 8 = 75`) still closes over the 75 artifacts the four retired
directories carried. **The move was a redistribution of paths, not a re-cut of assignments, and a reader who wants
the present state of a row should replace its `present path` cell with its `target` cell and read on.**

---

## §1 · The rule applied, in one paragraph

**A file's scope is decided by what its assertions are evidence about, not by the wave, unit or directory it was
authored in.** **(1) e2e** — the assertions are about behaviour that exists only once **the shipped artifact
stands**: the drive reaches the system through the package's **declared entry point** (`import { storeCreate }
from 'provident-storeroom'`, the registry identity resolved through the `exports` map), or it needs the built
`storeroom_js_binding.node` behind that entry, or it assembles/installs a tree or a tarball, or it reads the
artifact's own identity across homes (the version stamp, the `files` allowlist, the workflow, the layer label);
its red tells you *the assembled package is red* and cannot tell you which module is. **(2) integration** — the
file reaches **one module by that module's own declared path** and drives **that module's declared endpoints**,
with the rest of the system either absent (the Rust crates: no Node runtime) or present only as fixture
scaffolding: the kernel at its checkout home `../src/constraint-kernel.mjs`, the store crate at
`storeroom_native`, the conversion core at the binding crate's `rlib` half; its red names the module. **(3) unit**
— the file's subject is **one declared signature and its guardrails**, asserted as a per-signature or per-class
domain table (a member set and its arity, a fifth argument position, the carrier folds' 56 variant rows, the
value table's 13 class rows) rather than as a state machine driven across the module's surface; it exists so that
an invention at L4 fails loudly. **Applied to this project's artifacts specifically:** a `*.test.mjs` that calls
`storeCreate({…})` and then exercises members is **e2e**, because the object it holds is the entry's product over
the built addon and every assertion it makes is an assertion about the assembled package — while a `*.rs` under
`tests/` that calls `storeroom_native::storeCreate(&StoreConfig{…})` is **integration**, because the crate is the
only boundary it crosses and no `.node`, no entry and no package exists in its process. A file whose header
states it drives *"the package's own boundary"*, *"the claimed ESM entry"*, *"the built/shipped artefact"*, the
`LIVE / ASSEMBLED PACKAGE` layer, or that it is **blind**, is e2e for that stated reason — the project's own
headers are the evidence, not my reading of their bodies.

**THE BLIND INSTANCES, AND WHERE THEY LAND.** The preset's e2e battery is *"the battery that drives the built
artifact through its declared entry points, **plus one blind instance per general-purpose surface**"*. This tree
already carries **seven** self-declared blind instances (⟶ RE-COUNTED 2026-10-27 AT THE TREE: **THIRTEEN** — the twelve surface instances plus `blind-defect-cases.test.mjs`, the defect-cases instance. Measured: `tests/e2e/blind-*.test.mjs` = `address-verbs`, `cjs-interop`, `constraints-surface`, `constraints-unit`, `defect-cases`, `entry-module`, `entry-surface`, `installed-surface`, `kernel-surface`, `listener-surface`, `package-surface`, `removal-surface`, `value-crossing`; `blind-constraints-v2.mjs` is a shared instance module and not a `node --test` file, and `json-crossing-blinded.test.mjs` states its blindness in its name), and all seven go to `tests/e2e/` — one per
general-purpose surface, each authored from `docs/specs/**` alone: **`greens.mjs`** (the package entry's member
surface, `JSG`), **`blind-constraints-v2.mjs`** (the constraint kernel's caller-side surface, `E2E-C-*`),
**`held-listener-identity-greens.mjs`** (the held-listener-identity surface), **`json-crossing-blinded.test.mjs`**
(the JSON crossing, one `test()` per cell of `storeroom-json-crossing-greens.md`), **`file-tier-save/scenarios.mjs`**
(the `file`-tier save, `FTS`), **`json-acceptance-set-greens.mjs`** (the `file` tier's JSON codec as a declared
acceptance set, `JAS`), and **`consumer-fix/scenarios.mjs`** (the publish/version-stamp surface). The two **live**
runners are the same surfaces at the assembled layer, not further instances: `live-drive.mjs`,
`json-acceptance-set-live.mjs`, `json-crossing-live.mjs`, `json-crossing-live-s17.mjs`.

---

## §2 · The assignment table — 75 paths, each exactly once

**Legend.** *scope* is the preset's three; *driver* is one of the 19 ids in `modules.json` (never a battery id —
the four battery modules are the present-state owners, not the model's homes); *layer* is what the file reports,
in the preset's vocabulary, mapped from this project's own labels: `ENVELOPE/PURE` → **envelope**,
`LIVE / ASSEMBLED PACKAGE` (and *loaded in dev*) → **assembled**, `LIVE/INSTALL` (an installed-from-the-registry
reach) → **installed**, and the `APP` layer → **app**. **No file in the inventory reports `installed` or `app`;
that is a finding, not an omission (§4).** **⟶ RE-READ AT `D-9`:** **four rows' `layer` moved from `envelope` to
`assembled`** (rows 18, 20, 22, 23 — the `O3` set) **and no other row's label moved**; the four now target
`tests/e2e/staged-install/` so that their run can carry its own label (§2.7). **The denominator and the route
tags are unmoved — 33 e2e rows, `O3` 5 · `O4` 28.**

### §2.1 `tests/e2e/` — 33 files

**⟶ MOVED, 2026-10-25: every `present path` cell below is a path that no longer exists and every `target` cell is
a file on disk.** The 33 rows are read by their `target` column; the `tests/e2e/` directory itself carries **44** — **⟶ RE-MEASURED 2026-10-28: `79`** (the `44` is the reading of 2026-10-25 and is read THROUGH this clause; the thirty-three rows below are still the assignments and the directory's growth is in the same five classes the table at §2 counts) —
files, the extra eleven being the installed battery's three, the cut's three staging/measurement helpers,
`REVIEW-2026-10-24.md`, and the four files §2.7/§2.8 declare. **No row's scope, driver, layer or route changed with
its path.**

**The ten `bindings/js/greens/` entries below are declared `is_test: false` in the JSON, and they still take a
scope**: they *report* rather than assert (§4 Q6), and the preset's e2e scope is the one that holds a battery
plus its blind and live instances. A scope assignment does not turn an instrument into a test.

**`route`** is **`O3`** (publish-readiness: a staged tree, and the package reached by its **name** through
`exports`) or **`O4`** (earlier: the entry reached **by path**, which bypasses `exports`) — assigned per `D-6`'s
criterion of **purpose**, and declared at **§2.6**, whose calls this column is read with. **No row is blank.**

| # | present path | target | driver | layer | route | note |
|---|---|---|---|---|---|---|
| 1 | `bindings/js/test/surface.test.mjs` | `tests/e2e/surface.test.mjs` | `js-surface` | envelope | `O4` | the entry's construction, five verbs, failure form, records — *"at its own boundary"* |
| 2 | `bindings/js/test/registry.test.mjs` | `tests/e2e/registry.test.mjs` | `js-registry-delivery` | envelope | `O4` | handle, registry, delivery, the two registration verbs; also asserts the layer label read off `greens.mjs` |
| 3 | `bindings/js/test/convenience.test.mjs` | `tests/e2e/convenience.test.mjs` | `js-surface` | envelope | `O4` | **drives `on`/`off`, which are merged away and no longer members** (brief §3) — stale subject, see §4 Q3 |
| 4 | `bindings/js/test/ordering.test.mjs` | `tests/e2e/ordering.test.mjs` | `js-surface` | envelope | `O4` | the `A112`/`A115` ordering law *at the JS surface's own boundary*; spells no specifier — its reach is `constraint-kernel-helpers.mjs`'s (§2.6.6) |
| 5 | `bindings/js/test/round-trip.test.mjs` | `tests/e2e/round-trip.test.mjs` | `js-crossing` | envelope | `O4` | write→read equality through the entry; needs the addon |
| 6 | `bindings/js/test/addon-surface.test.mjs` | `tests/e2e/addon-surface.test.mjs` | `binding-facade` | envelope | `O4` | the artefact's export set, receiver, unwrap — *"reaches the artefact"* |
| 7 | `bindings/js/test/addon-surface-properties.test.mjs` | `tests/e2e/addon-surface-properties.test.mjs` | `binding-facade` | envelope | `O4` | the artefact's typed property layer (8 rows) |
| 8 | `bindings/js/test/addon-adoption.test.mjs` | `tests/e2e/addon-adoption.test.mjs` | `binding-facade` | envelope | `O4` | ABI adoption, build fetch, teardown; stages trees and reads hashes — **a substitute *build*, not a package tree** (§2.6.1) |
| 9 | `bindings/js/test/json-crossing.test.mjs` | `tests/e2e/json-crossing.test.mjs` | `js-crossing` | envelope | `O4` | the `JC-TC-*` acceptance set through the entry; **also imports the kernel by path** (`:124`); **four embedded child-drive specifiers** (§2.6.4) |
| 10 | `bindings/js/test/json-crossing-blinded.test.mjs` | `tests/e2e/json-crossing-blinded.test.mjs` | `js-crossing` | envelope | `O4` | **BLIND** — one `test()` per cell of the json-crossing greens set |
| 11 | `bindings/js/test/json-crossing-gate4-adversarial.test.mjs` | `tests/e2e/json-crossing-gate4-adversarial.test.mjs` | `js-crossing` | envelope | `O4` | adversarial/malformed battery *over the shipped package entry* |
| 12 | `bindings/js/test/negative-generators.test.mjs` | `tests/e2e/negative-generators.test.mjs` | `js-crossing` | envelope | `O4` | the tasked negative generators `NG-JS-*`, driven through the entry alone; **one arm assembles a copy of the package (`:1536-1572`) and its name reach is that arm's SUBJECT, so it is not the file's route** (§2.6.1 call 3) |
| 13 | `bindings/js/test/file-tier-save.test.mjs` | `tests/e2e/file-tier-save.test.mjs` | `js-registry-delivery` | envelope | `O4` | terminal arm, save order, durability boundary; boots real files; imports the kernel for `commit`/`runAttempt` |
| 14 | `bindings/js/test/file-tier-save-properties.test.mjs` | `tests/e2e/file-tier-save-properties.test.mjs` | `js-registry-delivery` | envelope | `O4` | the same amendment's typed property layer (8 rows) |
| 15 | `bindings/js/test/held-listener-identity-surface.test.mjs` | `tests/e2e/held-listener-identity-surface.test.mjs` | `js-surface` | envelope | `O4` | the 14-member set and the listener surface's states |
| 16 | `bindings/js/test/held-listener-identity-properties.test.mjs` | `tests/e2e/held-listener-identity-properties.test.mjs` | `js-surface` | envelope | `O4` | **spans surface and kernel (`P-HL-*`)** — assigned by dominant; split owed (§4 Q1); its name reach is **dynamic-only** (`:1096`), §2.6.5 |
| 17 | `bindings/js/test/constraints-publication.test.mjs` | `tests/e2e/constraints-publication.test.mjs` | `js-constraints` | envelope | `O4` | the two population routes at the surface; **also asserts `delivery`'s `files` allowlist** — split owed; that limb is **`O3`-shaped inside an `O4` file** (§2.6.1 call 6) |
| 18 | `bindings/js/test/package-entry.test.mjs` | `tests/e2e/staged-install/package-entry.test.mjs` | `delivery` | assembled | **`O3`** | the package at its boundary: `exports` map, engines, licence, `HO-*` realms, `.node` load count — **its subject IS the packaged resolution; it stages nothing today and adopts the tree's manifest** (§2.6.1 call 1) |
| 19 | `bindings/js/test/register.test.mjs` | `tests/e2e/register.test.mjs` | `js-registry-delivery` | envelope | `O4` | the register layer's JS half; **`S-LAYER` reads its label off `greens/greens.mjs`** (§3 F1); name reach **dynamic-only** (`:91`), §2.6.5 |
| 20 | `bindings/js/test/version-stamp.test.mjs` | `tests/e2e/staged-install/version-stamp.test.mjs` | `delivery` | assembled | **`O3`** | the stamp's homes, the pre-publish guard, `P-PUB-9`/`P-PUB-10`; **assembles a full scratch tree** (manifest + entry copy + `node_modules/<platform name>` + a `build/Release` candidate) — §2.6.1 call 2 |
| 21 | `bindings/js/test/version-stamp-r2.test.mjs` | `tests/e2e/version-stamp-r2.test.mjs` | `delivery` | envelope | `O4` | the `R2` source-assertion set under the architect's `(a)`; **no entry reach at all — byte assertions of the stamp's source sites** (§2.6.1 call 4) |
| 22 | `bindings/js/test/publish.test.mjs` | `tests/e2e/staged-install/publish.test.mjs` | `delivery` | assembled | **`O3`** | the 62-cell publish red set; **declares its own home (`PUB-DD-24`)** — see §4 Q5; **`makeScratch`/`coveredEnv` is the precedent `D-6` cites** |
| 23 | `bindings/js/test/publish-generators.test.mjs` | `tests/e2e/staged-install/publish-generators.test.mjs` | `delivery` | assembled | **`O3`** | `NG-PUB-A`…`J`, each with a staged control copy outside the repo |
| 24 | `bindings/js/greens/greens.mjs` | `tests/e2e/greens.mjs` | `js-surface` | envelope | `O4` | **BLIND** (`JSG`), 16 scenarios; reaches by path (`:196`); **its `JSG-12.18` allowlist cell is `O3`-shaped inside an `O4` file** (§2.6.1 call 6) |
| 25 | `bindings/js/greens/live-drive.mjs` | `tests/e2e/live-drive.mjs` | `js-surface` | assembled | `O4` | `LIVE / ASSEMBLED PACKAGE`, real process, real file I/O; `ENTRY = path.resolve(HERE,'..','index.mjs')` (`:35`) |
| 26 | `bindings/js/greens/blind-constraints-v2.mjs` | `tests/e2e/blind-constraints-v2.mjs` | `js-constraints` | envelope | `O4` | **BLIND** (`E2E-C-*`), reached through the kernel's declared caller-side path; `new URL('../index.mjs', …)` (`:28`) |
| 27 | `bindings/js/greens/held-listener-identity-greens.mjs` | `tests/e2e/held-listener-identity-greens.mjs` | `js-surface` | envelope | `O4` | **BLIND**; imports the entry and the kernel's checkout home (`:110`, `:117`) |
| 28 | `bindings/js/greens/json-acceptance-set-greens.mjs` | `tests/e2e/json-acceptance-set-greens.mjs` | `store-value` | envelope | `O4` | **BLIND** (`JAS`): the `file` tier's JSON codec as a declared acceptance set (`:55`) |
| 29 | `bindings/js/greens/json-acceptance-set-live.mjs` | `tests/e2e/json-acceptance-set-live.mjs` | `store-value` | assembled | `O4` | the same set re-driven against the real built package (`:51`) |
| 30 | `bindings/js/greens/json-crossing-live.mjs` | `tests/e2e/json-crossing-live.mjs` | `js-crossing` | assembled | `O4` | the 144-cell live battery; `JC_ENTRY` also reaches **installed** (a published tarball) — **a path from the environment, not a staged tree, so it stays `O4`** |
| 31 | `bindings/js/greens/json-crossing-live-s17.mjs` | `tests/e2e/json-crossing-live-s17.mjs` | `js-crossing` | assembled | `O4` | the six `§17` boundary laws, kept out of the 144-cell census deliberately; `JC_ENTRY ?? HERE/../index.mjs` (`:50`) |
| 32 | `bindings/js/greens/consumer-fix/scenarios.mjs` | `tests/e2e/consumer-fix/scenarios.mjs` | `delivery` | envelope | **`O3`** | **BLIND** (gate 5); reports `SOURCE-PINNED` verdicts off repo bytes as well as the artifact — **publish-readiness by purpose with NO entry reach today** (§2.6.1 call 5) |
| 33 | `bindings/js/greens/file-tier-save/scenarios.mjs` | `tests/e2e/file-tier-save/scenarios.mjs` | `js-registry-delivery` | envelope | `O4` | **BLIND** (`FTS`), 96 cells, its own exit rule (FAIL **and** CONFLICT); `await import('../../index.mjs')` (`:32`) |

*(**33 rows, 33 files**: 23 from `bindings/js/test/` + 10 from `bindings/js/greens/`; the arithmetic is §2.4.
**Routes: `O3` 5 · `O4` 28 ✓** — by battery, `bindings/js/test/` 23 → **4 `O3` + 19 `O4`** and
`bindings/js/greens/` 10 → **1 `O3` + 9 `O4`**. **Layers at `D-9`: `assembled` 8 · `envelope` 25 ✓** — the four
`O3` node rows moved to `assembled` and joined the four `assembled` `O4` runners; **the four `O3` rows are the
only rows whose `target` changed at this pass** (`tests/e2e/staged-install/`), and no other `target` moved.)*

### §2.2 `tests/integration/<module>/` — 29 files

**⟶ MOVED, 2026-10-25: every `present path` cell below is a path that no longer exists and every `target` cell is
a file on disk.** `tests/integration/` carries **33** files — these 29, the two §2.5 helpers and the two
`support/mod.rs` modules. **The Rust half's move needed a THIRD CARGO PACKAGE**: `crossing_copy.rs`,
`addon_adoption.rs`, `surface_verbs.rs`, `register_layer.rs`, `crossing_carriers.rs` and `crossing_values.rs` were
`bindings/js/tests/`'s, and a Cargo package's integration tests must live inside it, so `tests/Cargo.toml` hosts
them as the `storeroom-tests` package's own targets (`D-34`). **The store crate's fifteen stayed inside the root
package and are named as `[[test]]` entries in the root manifest.**

**`route`: `none, by design` for 28 of these**, and `O4` for one — **they reach a module by that module's own
declared path** (the store crate, the binding crate's `rlib`, the kernel at `../src/constraint-kernel.mjs`) with
no `.node`, no entry and no package in the process. **The exception is `held-listener-identity-gate4-regressions`**,
which spells the package name at its own `:45`; §2.6.3 states both counts and the helper-inherited reach that a
per-scope answer would hide.

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `tests/construction.rs` | `tests/integration/store-core/construction.rs` | `store-core` | envelope | contract §7: construction, probe, boot |
| 2 | `tests/construction_access_probe.rs` | `tests/integration/store-core/construction_access_probe.rs` | `store-core` | envelope | `U-STOREROOM-ACCESS-PROBE`'s driving cells |
| 3 | `tests/write_arms.rs` | `tests/integration/store-core/write_arms.rs` | `store-core` | envelope | contract §3, the closed arm table |
| 4 | `tests/read_and_delete.rs` | `tests/integration/store-core/read_and_delete.rs` | `store-core` | envelope | contract §4 |
| 5 | `tests/tiers_and_purge.rs` | `tests/integration/store-core/tiers_and_purge.rs` | `store-core` | envelope | contract §5 |
| 6 | `tests/journal_and_rollback.rs` | `tests/integration/store-core/journal_and_rollback.rs` | `store-core` | envelope | contract §6 |
| 7 | `tests/walk_and_resolver.rs` | `tests/integration/store-core/walk_and_resolver.rs` | `store-core` | envelope | contract §2 |
| 8 | `tests/watched_addresses.rs` | `tests/integration/store-core/watched_addresses.rs` | `store-core` | envelope | §6.5: the registration surface and the journal half |
| 9 | `tests/record_shapes.rs` | `tests/integration/store-core/record_shapes.rs` | `store-core` | envelope | §1: node kinds, anchor, link, register (the value taxonomy is `store-value`'s) |
| 10 | `tests/e2e_json_round_trip.rs` | `tests/integration/store-core/e2e_json_round_trip.rs` | `store-core` | envelope | **the name claims `e2e`**; it runs under `cargo test` in-process — §4 Q2 |
| 11 | `tests/e2e_listener_firing.rs` | `tests/integration/store-core/e2e_listener_firing.rs` | `store-core` | envelope | same naming collision |
| 12 | `tests/properties.rs` | `tests/integration/store-core/properties.rs` | `store-core` | envelope | the register's executed layer, 8 rows, pinned seed |
| 13 | `tests/fail_codes.rs` | `tests/integration/store-fail-set/fail_codes.rs` | `store-fail-set` | envelope | one drive per member of the closed set + the generated messages |
| 14 | `tests/gate4_red_set_fix.rs` | `tests/integration/store-args/gate4_red_set_fix.rs` | `store-args` | envelope | its subject is the construction's and the listeners' outside values (the carriers) |
| 15 | `bindings/js/tests/crossing_copy.rs` | `tests/integration/binding-crossing/crossing_copy.rs` | `binding-crossing` | envelope | the copy discipline and the equality relation |
| 16 | `bindings/js/tests/register_layer.rs` | `tests/integration/binding-crossing/register_layer.rs` | `binding-crossing` | envelope | the register layer's RUST half (5 of 8 rows) |
| 17 | `bindings/js/tests/surface_verbs.rs` | `tests/integration/binding-crossing/surface_verbs.rs` | `binding-crossing` | envelope | the verb-level layer, driven through the conversion core |
| 18 | `bindings/js/tests/addon_adoption.rs` | `tests/integration/binding-crossing/addon_adoption.rs` | `binding-crossing` | envelope | the adoption unit's Rust half (lifetime/registry) |
| 19 | `bindings/js/test/held-listener-identity-kernel.test.mjs` | `tests/integration/js-constraints/held-listener-identity-kernel.test.mjs` | `js-constraints` | envelope | the kernel's selection/removal law; reached by the kernel helper |
| 20 | `bindings/js/test/held-listener-identity-gate4-regressions.test.mjs` | `tests/integration/js-constraints/held-listener-identity-gate4-regressions.test.mjs` | `js-constraints` | envelope | the four gate-4 findings, `K-6`'s non-enumeration among them |
| 21 | `bindings/js/test/held-listener-identity-refusal-restore.test.mjs` | `tests/integration/js-constraints/held-listener-identity-refusal-restore.test.mjs` | `js-constraints` | envelope | the purge order's wake; **reaches its subject through the entry** — arguably e2e (§4 Q1) |
| 22 | `bindings/js/test/constraint-kernel-deliverymodel.test.mjs` | `tests/integration/js-constraints/constraint-kernel-deliverymodel.test.mjs` | `js-constraints` | envelope | the two ordered delivery layers and the order law |
| 23 | `bindings/js/test/constraint-kernel-layers.test.mjs` | `tests/integration/js-constraints/constraint-kernel-layers.test.mjs` | `js-constraints` | envelope | layer (a)/(b) and `CommitRecord.pending` |
| 24 | `bindings/js/test/constraint-kernel-states.test.mjs` | `tests/integration/js-constraints/constraint-kernel-states.test.mjs` | `js-constraints` | envelope | the `KC` arms, repair, log, per-op rollback |
| 25 | `bindings/js/test/constraint-kernel-rollback.test.mjs` | `tests/integration/js-constraints/constraint-kernel-rollback.test.mjs` | `js-constraints` | envelope | the `A111` re-derivation of the rollback target |
| 26 | `bindings/js/test/constraint-kernel-deltamodel.test.mjs` | `tests/integration/js-constraints/constraint-kernel-deltamodel.test.mjs` | `js-constraints` | envelope | the delta model's arms |
| 27 | `bindings/js/test/constraint-kernel-negatives.test.mjs` | `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs` | `js-constraints` | envelope | the negative arms and the discard |
| 28 | `bindings/js/test/constraint-kernel-properties.test.mjs` | `tests/integration/js-constraints/constraint-kernel-properties.test.mjs` | `js-constraints` | envelope | the kernel's typed property layer, 21 rows × ≤19 |
| 29 | `bindings/js/test/constraint-kernel-repairop.test.mjs` | `tests/integration/js-constraints/constraint-kernel-repairop.test.mjs` | `js-constraints` | envelope | the repair-op seam and its malformed-return arm |

### §2.3 `tests/unit/<module>/` — 5 files

**⟶ MOVED, 2026-10-25: every `present path` cell below is a path that no longer exists and every `target` cell is
a file on disk. The five are exactly the five files `tests/unit/` carries — this scope was the only one the move
filled exactly.**

**`route`: `none, by design` for 3 of these** (`constraint-kernel.test.mjs` reaches the kernel through the
helper; both `crossing_*` files reach the `rlib`), and **`O4` for 2** — `a127-surface.test.mjs:72` and
`a126-constraint-methods.test.mjs:46` both import the package **by name**, so both must be re-spelled by a route
(§2.6.3, §2.6.4).

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `bindings/js/test/a126-constraint-methods.test.mjs` | `tests/unit/js-constraints/a126-constraint-methods.test.mjs` | `js-constraints` | envelope | the three constraint methods' signatures: add/overwrite, the two idempotent toggles, the carriage pre-condition, the one `TypeError` |
| 2 | `bindings/js/test/a127-surface.test.mjs` | `tests/unit/js-surface/a127-surface.test.mjs` | `js-surface` | envelope | one export, the member set, `write`'s fifth position, the two refusal rules — **a signature pin**; its `THE_TWELVE` constant is already named as owed a re-derivation |
| 3 | `bindings/js/test/constraint-kernel.test.mjs` | `tests/unit/js-constraints/constraint-kernel.test.mjs` | `js-constraints` | envelope | *"the five-item surface and its argument / return shapes"* — per-signature domains and guardrails |
| 4 | `bindings/js/tests/crossing_carriers.rs` | `tests/unit/binding-crossing/crossing_carriers.rs` | `binding-crossing` | envelope | the 8 carriers over 56 variant rows — the folds' per-signature domains |
| 5 | `bindings/js/tests/crossing_values.rs` | `tests/unit/binding-crossing/crossing_values.rs` | `binding-crossing` | envelope | the value table's 13 class rows — the conversion's per-class domain |

### §2.4 The arithmetic

**e2e 33 · integration 29 · unit 5 · helpers and non-tests 8 · total 75 ✓.**
**Routes across those 75: `O3` 5 · `O4` 33 · none-by-design 37 — the 33 e2e cells all carry a tag, the two
helpers take `O4` as well (their reach is the name, §2.6.6), three integration/unit files take `O4` between them,
and every route-null file's null is a stated answer and not a blank (§2.6.3).**
By directory: `tests/` 15 → 14 integration + 1 helper · `bindings/js/tests/` 7 → 4 integration + 2 unit +
1 helper · `bindings/js/test/` 42 → 23 e2e + 11 integration + 3 unit + 4 helpers + 1 record ·
`bindings/js/greens/` 11 → 10 e2e + 1 set document. **No path is assigned twice and none is omitted**; the
machine-readable form is `docs/L1/test-stratification.json`.

**⟶ AND THE DENOMINATOR IS UNMOVED AT `D-8`/`D-9`/`D-10`, which moved no assignment in or out of the 75.**
**Layers: `assembled` 8 · `envelope` 25 within the e2e scope** (four rows moved at `D-9`, §2.7) — and **the
targets: four rows now name `tests/e2e/staged-install/`**, which is the only `target` change this pass makes.
**A NEW artifact is declared, not assigned:** the installed battery (§2.8) is **not one of the 75**, so it adds no
row here and changes no count; it appears in §2.8 as a declaration in the same way a runner appears in §2.5 as a
helper rather than a test. **The 67+8 = 75 reconciliation, the 33/29/5 split and the `O3` 5 · `O4` 33 · none 37
route census all stand exactly as committed.**

### §2.5 Helpers and non-tests — declared separately, and deliberately not tests

**⟶ MOVED, 2026-10-25: the eight rows below are at their `target` paths and nowhere else**, so
`tests/integration/js-constraints/` now holds both cross-scope helpers and `tests/e2e/` holds the two per-battery
support modules and the two records. **The cross-scope consumption the paragraph under the table declares still
holds at the new paths — a scope that imports across a directory is lawful and `node --test` follows imports — and
the two-consumer/two-scope count is unmoved.**

| present path | target | consumed by | route | what it is |
|---|---|---|---|---|
| `tests/support/mod.rs` | `tests/integration/support/mod.rs` | integration (every `tests/*.rs`) | none, by design | the store crate's one scaffolding module: the spellings, the corpus, `support::Drive`'s caps |
| `bindings/js/tests/support/mod.rs` | `tests/integration/binding-crossing/support/mod.rs` | integration | none, by design | the binding crate's shared harness: corpus, equality relation, deterministic generator |
| `bindings/js/test/constraint-kernel-helpers.mjs` | `tests/integration/js-constraints/constraint-kernel-helpers.mjs` | **e2e (2) + integration (9) + unit (1)** | **`O4`** | fixtures and assertions for the constraints red set — **a helper consumed by all three scopes**; its name reach is the `O4` path (§2.6.6) |
| `bindings/js/test/held-listener-identity-helpers.mjs` | `tests/integration/js-constraints/held-listener-identity-helpers.mjs` | **e2e (2) + integration (3)** | **`O4`** | the handle/listen domains and the two refusal forms — **a helper consumed by two scopes** |
| `bindings/js/test/addon-surface-support.mjs` | `tests/e2e/addon-surface-support.mjs` | e2e | none (no specifier; `PACKAGE_DIR` joins only) | the addon-surface red set's declared figures (`DECLARED_SURFACE`, `THE_THREE_THAT_ARE_NOT_ENTRIES`, `OPEN_OWED`) |
| `bindings/js/test/addon-adoption-support.mjs` | `tests/e2e/addon-adoption-support.mjs` | e2e | none (no specifier) | the adoption statement and what the landing pass must provide |
| `bindings/js/test/REMEASURE-2026-10-18.md` | `tests/e2e/REMEASURE-2026-10-18.md` | nothing | none | **not a test and not a helper**: the red set's own measurement record, read by no code |
| `bindings/js/greens/file-tier-save/file-tier-save-greens.md` | `tests/e2e/file-tier-save/file-tier-save-greens.md` | e2e (the `FTS` runner's set) | none | the blind set the runner drives, cell for cell; authored, never imported |

**The two cross-scope helpers are the only files whose honest answer is "consumed by several scopes", and they
are declared here rather than assigned.** Their target sits under the module that owns the subject; a scope that
imports them reads across a directory, which is lawful (`node --test` follows imports) but means the integration
directory is load-bearing for **one unit file and four e2e files** — `ordering` and `constraints-publication`
through `constraint-kernel-helpers`, `held-listener-identity-surface` and `-properties` through
`held-listener-identity-helpers`. **§2.6.3 corrects this section's own earlier count** (8 integration → 9 for
`constraint-kernel-helpers`, whose two e2e consumers were missing) and **§2.6.6 records the route finding those
consumers carry.**

---

## §2.6 · The route — `O3` / `O4`, per `D-6`

**This section is `D-6`'s answer, declared where the blocker was.** It adds a **route** to every e2e cell,
states what the other two scopes' route is, declares the staged tree, and names the re-spellings. **It decides
no label** (`F3`, `F4` stand open — §2.6.7) and **builds nothing on the one reading `D-6` marks as inference**
(§2.6.7). **It moves no file and edits no test.**

### §2.6.1 The rule, the counts, and the borderline calls

**THE RULE.** `D-6`'s criterion is **purpose, not layer**. A cell whose subject is **whether the package as
shipped resolves and runs** takes **`O3`**: it assembles a package tree into a scratch `node_modules` and
imports the package **by its name from inside that tree**, passing through the package's **`exports` map** *and*
through an install-shaped tree. **Every other cell takes `O4`**: it reaches `bindings/js/index.mjs` **by path**,
which resolves the addon ladder from the entry's own directory and **bypasses `exports`**. **The tag is assigned
per file**, from the file's own header, its own specifier and the reach it spells — **never from its scope**, and
**never from whether it is a test**: the preset's three scopes cut across both routes, and a route may be
**inherited from a helper** (§2.6.6). The evidence per row is in §2.1's note column: the specifier each file
spells, or the path it computes.

**COUNTS.** **`O3` 5 · `O4` 28 · 33 ✓** — `bindings/js/test/` 23 → **4 `O3`** (`publish`, `publish-generators`,
`version-stamp`, `package-entry`) **+ 19 `O4`**; `bindings/js/greens/` 10 → **1 `O3`**
(`consumer-fix/scenarios`) **+ 9 `O4`**.

**THE BORDERLINE CALLS — six, each defended in one line, and none left silent.**

1. **`package-entry.test.mjs` → `O3`, though it stages nothing.** Its subject *is* the packaged resolution — its
   own header says the identity is *"reached as a SELF-REFERENCE through its `exports` map — which is also
   `DD-24`'s drive"* — and it asserts the one arms-bearing arm (`:82`), the refused wildcard and deep import
   (`:97`, `:136`), the single `.node` load (`:54`) and the engines/licence; **a path route would delete the very
   claim it exists to make**, so it takes `O3` and **adopts the staged tree's manifest** for its byte reads
   (today `PACKAGE_DIR/package.json`, `:30`). **★ and it must not inherit its state-(2) arm blindly**: that arm
   pins `MODULE_NOT_FOUND` *because* `bindings/js/node_modules` does not exist (`:150-154`) — **a state the
   staged tree removes**, so the migration restates that arm rather than carrying it across.
2. **`publish.test.mjs`, `publish-generators.test.mjs`, `version-stamp.test.mjs` → `O3`: each assembles a tree,
   whatever its subject.** `publish`'s `makeScratch`/`coveredEnv` **is** the precedent `D-6` cites;
   `publish-generators` drives the same idiom with staged **control** copies outside the repository;
   `version-stamp` assembles `<scratch>/{package.json, index.mjs, node_modules/<platform name>/…, build/Release/…,
   preload.cjs, driver.mjs}` and reads the stamp off the loaded artefact and the pre-publish guard. **A
   behaviour subject does not demote a cell that assembles the install shape** — that is the ruling's own words.
3. **`negative-generators.test.mjs` → `O4`, though one arm assembles a copy of the package.** That copy
   (`:1536-1572`) is not the cell's route, it is the cell's **subject** — *"a bare specifier resolved from a file
   UNDER the copy resolves to the copy through its `package.json`"* — while the file's own reach is the checkout
   entry (`:66`); and **tagging it `O3` would move ~60 crossing cells into a staged tree the ruling does not ask
   them to enter.** **The consequence is a hard constraint on the migration: its embedded specifier at `:1550`
   must NOT be re-spelled** — there, the name is the assertion. *(This is the call most open to the architect's
   correction: it is the one file where "assembles a tree" and "the file's own route" point the same way and
   disagree.)*
4. **`version-stamp-r2.test.mjs` → `O4`, and it reaches no entry at all.** Its subject is the stamp's **source**
   sites — `package.json`, `bindings/js/Cargo.toml`, `build.rs` and three specification documents, all read as
   bytes (`:311-330`, `:1960`) — not resolution and not running, so **`D-6`'s criterion does not reach it**. It is
   tagged `O4` because it is an earlier-set cell, and **its route is `none` in words rather than blank**: it has
   no specifier to re-spell.
5. **`consumer-fix/scenarios.mjs` → `O3`, with no entry reach today.** Its subject is the publish/version-stamp
   surface as a consumer meets it, and its own header records why it cannot drive the entry: *"the entry-level
   refusal cannot be driven by this pass: `index.mjs` is behind the implementation wall, and no published platform
   package exists to install"* (`:361-365`). So it is **publish-readiness by purpose and route-less by
   construction** — and `O3`'s staged tree is **the first instrument that could give it a subject**. **Whether it
   should take one is the test layer's to declare, not this pass's.**
6. **Two `O3`-shaped limbs sit inside `O4` files, and no cut is drawn** (the Q1 convention, preserved):
   **`greens.mjs`'s `JSG-12.18`** — the `files` allowlist's exact set equality at `:1205`, with the fifth entry
   and the looser form refused at `:1211` — and **`constraints-publication.test.mjs`'s allowlist assertion**. Both
   **read manifest bytes** rather than make a reach, so **neither forces its file's route**; both appear in §5's
   migration consequence, because the count's retirement hits them.

### §2.6.2 What `O3`'s staged tree contains — the declaration

**Following the tree's own precedents, not inventing a shape.** `D-6` makes this design the declaration's to
state; the four answers it names are given below, each citing the existing idiom it follows.

- **Which files it copies — the `files` allowlist as the manifest carries it.** `index.mjs`, `README.md`,
  `index.d.ts` and — **today** — `src/constraint-kernel.mjs` (the fourth entry), staged under
  `node_modules/provident-storeroom/`, with **the tree's own `package.json`** carrying `name`, `version`, `type`,
  `exports` and `optionalDependencies` **as the shipped manifest carries them**. **The precedent is exact**:
  `publish.test.mjs:711-715` writes that manifest (`exports: {'.': {import: './index.mjs'}}`) beside a
  byte-for-byte copy of the entry; and the **`typecheck` stage** (`package.json:8`, `typecheck:stage`) stages the
  *minimum* a name-resolved consumer needs — `package.json` + `index.d.ts` into
  `typecheck/node_modules/provident-storeroom` — which is the name route proven end-to-end for `tsc`. **The
  allowlist is copied as a fact of the tree and not as a rule** (`D-3`, `D-4`): when the fourth entry retires,
  the tree loses that file and nothing else about the shape moves.
- **How the addon is staged — as a platform package, not as the checkout's `build/Release`.** Rung one is
  `node_modules/@auspicion/<one of the five declared names>/`, with the artefact as that package's `main` —
  exactly what both publish batteries compose (`writeStub`, `writeArtefact`) and exactly the names the manifest's
  `optionalDependencies` pin. **The checkout's `build/Release` is NOT copied**, for two declared reasons: the
  prohibitions forbid `build/Release` in the tarball (`P-PUB-7`, `JSG-12.18`), and **rung two is precisely the
  rung an install shape must not lean on**. **Where a cell's subject *is* rung two, the tree writes its own
  candidate** (`makeScratch({rungTwo})`, `version-stamp`'s `build/Release`) — never the checkout's bytes.
- **How the tree is isolated per cell — one root per file, one tree per cell, every drive a subprocess.**
  `publish.test.mjs` mints one `SCRATCH_ROOT` per file under the OS temporary area (`:404`) and one `mkdtemp` tree
  per environment beneath it (`:705`), then runs every drive as
  `execFileSync(process.execPath, ['--require', preload, driver, entry])` with `cwd` = that tree and `NODE_PATH` =
  its `node_modules` (`:744-763`); `version-stamp` does the same (`:574`, `:647-674`);
  `publish-generators` adds a second root for its controls (`:189-190`). **Nothing of the repository is written,
  renamed or removed** — a control's mutant entry is staged in the temp area (`:706-711`) — and each file sweeps
  its root on exit.
- **Whether one tree may serve several cells — yes, but only where the cells differ by environment and not by
  tree contents.** `makeScratch`'s `env` lever (and `coveredEnv`'s options) is exactly that permission: a cell
  that changes only `PUBRED_*` reuses nothing structurally and still mints its own tree; **a cell whose subject is
  the tree's contents always mints its own.** **No tree is ever shared across files.**
- **★ THE ONE PIECE THE PRECEDENT DOES NOT SUPPLY, DECLARED RATHER THAN ASSUMED.** `D-6`'s `O3` has two halves —
  an **install-shaped tree** *and* an import **by name** through `exports`. **The precedent supplies the first
  half and a *rung-one* name reach**: `publish.test.mjs`'s driver imports the entry as
  `await import(process.argv[2])` (`:466`) — **by path inside the tree** — and reaches only the *artefact* by
  name. **No single existing cell does both at once.** The name-through-`exports` half exists in this tree in two
  other places: the package **self-reference** that 19 e2e files spell (a name reach through `exports`, with no
  staged tree) and **`negative-generators`' copy** (`:1539-1572`). So **`O3`'s mechanism is those precedents
  combined** — the `typecheck` stage's resolution site carrying the `publish` tree's contents — and this pass
  **declares the composition and invents no shape**. **It also states the test that would falsify it: a drive
  whose import site stands inside the tree and spells the package's name resolves through `exports` or the route
  is not being exercised.** *(Not measured — no shell in this pass; §7.)*

### §2.6.3 The integration and unit scopes: `none, by design`, with three named exceptions

**Stated plainly rather than left silent, because the silence would read as an omission.**

- **`tests/integration/<module>/` — 28 of 29 have no entry reach, by design.** The Rust legs reach the crate
  (`storeroom_native`, the binding crate's `rlib`) and the kernel legs reach `../src/constraint-kernel.mjs` **by
  that module's own declared path**. No `.node`, no entry, no package. **Their route is `none`, and that is the
  answer.**
- **The exception is `held-listener-identity-gate4-regressions.test.mjs`**, which spells
  `import { storeCreate } from 'provident-storeroom'` at `:45` — **kernel law is its subject, the entry is its
  reach** — so it takes **`O4`** with the e2e set and is re-spelled with it.
- **`tests/unit/<module>/` — 3 of 5 are route-free**; **`a127-surface.test.mjs:72`** and
  **`a126-constraint-methods.test.mjs:46`** both import the package **by name**, so both take **`O4`**: their
  subject is a signature pin and not a resolution, so a path route preserves them exactly.
- **★ AND A REACH THAT A PER-SCOPE ANSWER WOULD HIDE — the helpers.** `constraint-kernel-helpers.mjs` is imported
  by **9 integration files + 1 unit file + 2 e2e files**, and `held-listener-identity-helpers.mjs` by **3
  integration + 2 e2e**. **Both helpers reach the entry by name**, so **those ten integration/unit files inherit
  an entry reach they do not spell.** That is correct for their subjects — but it means the integration scope is
  **not** entry-free, and **the route is therefore stated per file and never per scope.**

### §2.6.4 The re-spellings, by route

**All 24 files that carry the bare specifier `'provident-storeroom'` today are re-spelled — 22 tests + the two
helpers** (see §2.6.5 for why this is 24 and not `D-6`'s 19). **The spelling each one becomes is decided by its
route, and the two routes take different mechanisms because they make different claims.**

**`O3` — 2 files carry the name**: `publish.test.mjs:4277` and `package-entry.test.mjs:38`, both
`await import('provident-storeroom')`.
- **The specifier does not move within the test file; it moves into the tree.** From `tests/e2e/` **no** file can
  resolve a package by name, so an `O3` cell's name reach must be spelled **in a driver staged inside the staged
  tree** — the `execFileSync(process.execPath, [driver])` / `--require preload` shape both publish batteries
  already run. **It must NOT be "fixed" to a path inside the tree**: a path there bypasses `exports` and voids
  the route it was tagged for.
- **`package-entry`'s byte reads re-point too** (`PACKAGE_DIR/package.json` → the tree's manifest), for the same
  reason: the cell's subject is the *shipped* shape, which is the tree's.
- **The other three `O3` files spell no name of their own** — `publish-generators` composes artefacts,
  `version-stamp` reaches the entry by path-in-tree and rung one by name, `consumer-fix` reaches nothing — so
  **they have nothing to re-spell and are listed here so the absence is explicit.**

**`O4` — the remaining 20 test files** (**all 17** of the test files `D-6` names, plus **3** its census omits:
`register`, `held-listener-identity-properties`, `a126-constraint-methods`):
- **The specifier becomes a path to the entry** — `bindings/js/index.mjs`, written relative from the new tree —
  which resolves the addon ladder **from the entry's own directory** (rung two, exactly as a name route does) and
  **bypasses `exports`**. **That bypass is the route's declared cost**, and it is why the `exports` claim is
  `O3`'s to make.
- **Two files need the re-spelling a second time, in embedded child-drive source**: `json-crossing.test.mjs`'s
  four `CHILD_*_SOURCE` templates (`:1719`, `:2330`, `:2830`, `:5025`) and `negative-generators.test.mjs`'s
  (`:1550`) — **and they point in opposite directions.** For `json-crossing` the child's specifier is a reach and
  must become a path **computed for the child's own location**; for `negative-generators` it is the assertion and
  **must stay the name** (§2.6.1 call 3). A mechanical sweep that re-spells both has broken one of them.
- **Three files carry the name only through a dynamic `await import(...)`** — `register.test.mjs:91`,
  `held-listener-identity-properties.test.mjs:1096`, `a126-constraint-methods.test.mjs:46` — and they are `O4`
  like their neighbours (§2.6.5).

**The two helpers — both `O4`, and §2.6.6 says why that is contingent.**

### §2.6.5 A measured correction to `D-6`'s census — recorded, put to the architect, not decided

**`D-6` names 19 files as carrying the bare specifier: 17 `*.test.mjs` plus the two helpers.** **Measured on this
branch by `grep` over `bindings/js/`, the figure is 24 — 22 test files + the two helpers.** The five files
`D-6`'s list does not carry are **`register.test.mjs`, `held-listener-identity-properties.test.mjs`,
`a126-constraint-methods.test.mjs`, `publish.test.mjs`, `package-entry.test.mjs`**, and they share one shape:
**their only occurrence is a dynamic `await import('provident-storeroom')`**, where **all 17 of the named files
spell a top-level static `import … from 'provident-storeroom'`**. **So `D-6`'s census appears to count static
imports** — that reconciliation is **my inference and is marked as one**, not as the ruling's meaning. **The five
are owed the same re-spelling by the same route rule**, and this pass tags and routes them rather than leaving
them out. Of the 22: **19 are e2e, 1 integration, 2 unit.**

### §2.6.6 The helpers: one mechanism serves both kinds today, and that is contingent — the finding

- **`constraint-kernel-helpers.mjs` → `O4`.** Imported by **2 e2e** (`ordering`, `constraints-publication`),
  **9 integration** (`held-listener-identity-kernel`, `constraint-kernel-deliverymodel`, `-rollback`,
  `-deltamodel`, `-layers`, `-states`, `-negatives`, `-repairop`, `-properties`) and **1 unit**
  (`constraint-kernel.test.mjs`) — **12 files, not the 8+1 this declaration's own §2.5 recorded**; that count is
  corrected here and in `test-stratification.json`'s `consumed_by`.
- **`held-listener-identity-helpers.mjs` → `O4`.** Imported by **2 e2e** (`held-listener-identity-surface`,
  `-properties`) and **3 integration** (`-kernel`, `-refusal-restore`, `-gate4-regressions`) — 5, as §2.5 says.
- **★ THE FINDING.** **A single `import` statement cannot be both a name reach and a path reach.** So **any
  helper consumed by cells of *both* routes must carry both mechanisms** — a name arm resolved inside the staged
  tree and a path arm for everything else — and the two cannot be one spelling. **Today that bifurcation is not
  owed: neither helper is imported by any `O3` cell** (`O3`'s five files import no helper at all). **It becomes
  owed the moment an `O3` cell imports one** — and because **the helpers are the only cross-route seam this
  declaration contains**, the migration wave must **re-check this negative file by file** rather than trust it.
  **That contingency is the finding; the current `O4` answer is a measurement, not a principle.**

### §2.6.7 The route is not the label, and one reading stays open

**⟶ SUPERSEDED IN PART AT `D-9`, AND READ THROUGH §2.7:** the bullets below stand as the route pass filed them
and the first one's *"`F3` and `F4` are NOT answered here"* was true of that pass. **`D-9` now answers `F3`'s
label question and `D-10` supplies `F4`'s battery (declared, unrun)**; what survives is the *distinction* — a
route records **how** a cell reaches the package and a label records **what it reports** — which §2.7 keeps by
giving the `O3` set its own run with its own label rather than by reading a tag as a label.

- **`D-6` answers no label question, and the route pass answers none either.** **`F3`** — whether a `.node`-loading
  checkout cell is labelled `assembled` or `envelope` — and **`F4`** — the absence of an installed-from-the-
  registry green — **stand exactly as §3 records them, unanswered.** A route records **how a cell reaches the
  package**; §2's layer column records **what it reports**. They are independent and must not collapse: an `O4`
  cell can be `assembled` (`live-drive`), an `O3` cell can be `envelope` (`publish`), and **no `O3` tag upgrades
  any file's layer.** `O3` is install-**shaped**, not installed: **it produces no `installed` green**, and `F4`'s
  driver is still owed.
- **★ THE OPEN READING, RECORDED AND NOT BUILT ON.** `D-6` carries L0's reading — *the packaged-resolution
  (`exports`) claim lives **exclusively** in the `O3` set* — as **inference awaiting the architect's
  confirmation**, and says so by name. **This pass's tagging is consistent with it and does not establish it.**
  What §2.6 actually shows is narrower: **the re-spelling moves the `exports` reach out of the `O4` cells**
  (their path route bypasses the map) — **not** that any earlier-set claim is thereby retired, and **not** that a
  packaged-resolution cell may not be added to the earlier set. **No design below may cite this section as having
  decided it.** It is put to the architect as **§4 Q10**.

---

## §2.7 · `D-9` / `F3` — the relabel, and the structural move chosen on evidence

**`D-9`'s words are *"the `O3` cells labelled `assembled` and the `O4` cells kept at `ENVELOPE/PURE`"*, and it
records the finding that the label is declared PER RUN, not per cell** — each greens runner carrying one
`const LAYER`, with `greens.mjs` stating the coupling in its own words (*"a cell of
`bindings/js/test/register.test.mjs` reads them, and a change there would manufacture a false green"*). **This
section declares the move: (b) — THE `O3` CELLS SEPARATED INTO THEIR OWN RUN, CARRYING ITS OWN LABEL.**

### §2.7.1 The five sites, read at the bytes, and what each decides

**Site 1 — `greens.mjs:70` `const LAYER = 'ENVELOPE/PURE'` with its asserting cells `JSG-12.15`/`JSG-12.16`
(`:1178`–`:1179`).** `JSG-12.15` asserts `LAYER === 'ENVELOPE/PURE'` and its declared expectation reads *"this
set's own layer is ENVELOPE/PURE **and the label travels with every figure of this run**"*; `JSG-12.16` asserts
`APP_LAYER === 'NONE'`. **Measured: `JSG-12.15` is a constant compared against its own literal — the shape
`register.test.mjs`'s `S-LAYER` was corrected out of on 2026-10-17 — so it can be re-spelled but it cannot be
satisfied by a run whose cells carry two labels.** Its expectation sentence is the load-bearing part: **one
label per run is what makes "every figure of this run" true.**

**Site 2 — `register.test.mjs`'s extraction, at two cells.** `LAYER_ARTIFACT = join(PACKAGE_DIR, 'greens',
'greens.mjs')` (`:129`); `layerLabelHomes()` (`:133`–`:148`) reads the artifact's `const LAYER` **and** the
`LAYER:` line of its head comment and requires them to agree; cell `S-LAYER` (`:749`–`:774`) requires
`homes.declared === 'ENVELOPE/PURE'` (`:762`) plus `homes.commented === homes.declared` (`:763`); the
printed-record cell (`:1085`–`:1107`) asserts the same two things again (`:1102`, `:1104`). **The cell's own
declared falsifier** (`:118`–`:122`): *change the label the artifact carries → `ASSEMBLED/RENDERER` — and
`S-LAYER` FAILS at the extraction … delete the artifact and it FAILS rather than passing over a literal.*
**This is the fact that decides the move: `register.test.mjs` is an `O4` cell that `D-9` keeps at
`ENVELOPE/PURE`, and it is pinned by path and by value to `greens.mjs`'s run-level label. Any per-cell
relabel of `greens.mjs` either deletes the constant — failing an `O4` cell the ruling says must stand — or
leaves it standing while no longer describing every figure, which falsifies `JSG-12.15`'s own text.**

**Site 3 — `package-entry.test.mjs:345`'s pin against `DD-20`.** `const layer = 'ENVELOPE/PURE'; // DD-20:
this unit's JS-side green, and NOTHING MORE` and `assert.ok(site.length > 0 && layer === 'ENVELOPE/PURE')`
(`:346`). **Two defects at one site, and they are different edits: the VALUE must become the `O3` run's label,
and the assertion cannot fail as written** — a literal compared to itself, the same `RCA-12` class the
`S-LAYER` repair named. **It is also the evidence that a `node --test` file already carries its label per file
with no run-level constant and no other cell reading it** — so the `O3` set can take a run of its own without
touching any `O4` cell's label.

**Site 4 — `json-acceptance-set-live.mjs:54`'s own glossed label.**
`const LAYER = 'ENVELOPE/PURE (the JavaScript package layer, in-process)'`. **Measured: this run-level constant
carries a QUALIFIER**, so it is not a bare vocabulary token — and a per-cell label vocabulary would have to
invent a qualifier per cell. It also shows the pre-existing disagreement §3 records: this file is `O4` and
`D-9` keeps it at `ENVELOPE/PURE`, yet §2.1's layer column calls it `assembled` (its re-drive is against the
built package). **Under (b) the constant is untouched and the disagreement stays where §3 records it (Q15).**

**Site 5 — the four runners' constants, plus the fifth that carries none.** Measured: exactly four files carry
`const LAYER` — `greens.mjs:70` · `held-listener-identity-greens.mjs:20` · `json-acceptance-set-greens.mjs:58` ·
`json-acceptance-set-live.mjs:54` — which is `D-9`'s own list; `live-drive.mjs` prints its label as a literal
(`:1296`) and `file-tier-save/scenarios.mjs` and `consumer-fix/scenarios.mjs` carry no label line at all
(`REMEASURE-2026-10-18.md:229` records the same: *"`live-drive.mjs` and `scenarios.mjs` carry none of these
lines"*). **And the O3 population, re-measured against those four: NONE of the five `O3` cells is inside any
run carrying a `const LAYER`** — four are `bindings/js/test/*.test.mjs` files (no constant in any of them) and
the fifth is `consumer-fix/scenarios.mjs` (its own file, its own exit rule, no constant). **So (b) relabels the
`O3` set without editing one byte of any existing run-level constant, and (a) would edit at least one to no
purpose and break an `O4` cell.**

### §2.7.2 The move, the labels, and why (a) is refused

**The `O3` family becomes three runs, each with its own label — which is `D-9`'s finding applied consistently,
and not three labels by preference:**

| run | cells | label | why that label |
|---|---|---|---|
| **A — the `O3` node leg**, `tests/e2e/staged-install/` | `publish` · `publish-generators` · `version-stamp` · `package-entry` | **`LIVE / ASSEMBLED PACKAGE`** (preset: `assembled`) | it stages a package tree **and** a platform package and must not lean on rung two (`D-9`'s ground) |
| **B — `consumer-fix/scenarios.mjs`**, its own run | one runner | **`LIVE / ASSEMBLED PACKAGE`** | `D-9` assigns it on route; **its cells are all `SOURCE-PINNED` today and it has no staged subject yet (Q12), so the label is DECLARED and not yet evidenced** — printed with that marking rather than left blank |
| **C — the installed battery**, `tests/e2e/installed/` | **15** (§2.8) | **`LIVE/INSTALL`** (preset: `installed`) | its own label, declared by `docs/specs/storeroom-publish/contract.md §4.2` item `3` |

**No vocabulary is minted.** `LIVE / ASSEMBLED PACKAGE` is the spelling the tree already prints
(`live-drive.mjs:1296`) and `LIVE/INSTALL` is the contract's own; both are members of the sibling unit's set,
whose definitional home is the **archived** `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/
acceptance.md §4.2`. **The publish contract's prohibition is obeyed rather than dodged: the vocabulary is
CITED AND NEVER RE-LABELLED** — this pass changes **which label a cell reports**, from within the declared set,
and writes no byte of the vocabulary.

**(a) is refused on site 2's evidence, not on taste.** Per-cell labels require `greens.mjs`'s `const LAYER` to
either disappear or stop describing its run; the first fires the falsifier `register.test.mjs` wrote into
itself and fails a cell `D-9` keeps at `ENVELOPE/PURE`, the second falsifies `JSG-12.15`'s own sentence. **And
(a) buys nothing (b) does not: the `O3` set is already disjoint from every `const LAYER`.**

**WHAT WOULD FALSIFY (b), stated so the choice is checkable:** (i) an `O3` route found inside `greens.mjs`,
`held-listener-identity-greens.mjs`, `json-acceptance-set-greens.mjs` or `json-acceptance-set-live.mjs` — the
`O3`-shaped limbs at §2.6.1 call 6 (`JSG-12.18`, `constraints-publication`'s allowlist assertion) would do it
**if the test layer promotes either limb to a route**; (ii) the test layer deciding Q12 that `consumer-fix`
joins an existing runner instead of keeping its own; (iii) the four `O3` node files being unable to form their
own leg because the root `package.json` cannot name a third command (Q16).

### §2.7.3 The files the plan touches, and what each edit changes — **stated in the battery's NEW home**

**`D-9`'s placement clause governs this: `bindings/js/test/` and `bindings/js/greens/` are present-state paths
no strata role may write (`D-5`), so every edit below is declared against its target path and lands with the
migration wave, never before.** Each present-state path appears only to identify the cell.

| file (target path) | the edit | what it changes |
|---|---|---|
| `tests/e2e/staged-install/staged-install-support.mjs` **(new, `D-7`'s own helper)** | carries `export const LAYER = 'LIVE / ASSEMBLED PACKAGE'` and `APP_LAYER = 'NONE'`, beside the staging and name-reach mechanism | **the label's single home for run A**, so no cell re-types it. It consumes **no `O4` helper** (`D-7`), and the four files' today-measured helper imports are empty, so no helper becomes two-mechanism (§2.6.6's negative is preserved) |
| `tests/e2e/staged-install/package-entry.test.mjs` | `:345`'s literal and `:346`'s self-comparing assertion | the label becomes **read** from the run's carrier, not typed; the assertion becomes able to fail (the `S-LAYER` repair's own precedent) — **two limbs at one site** |
| `tests/e2e/staged-install/publish.test.mjs` | header `:15`'s prose label; `P-PUB-8`'s figure row `:4164` and its assertion `:4167`; the `SITE` literal (F2) | the figure's layer becomes the run's label and the site becomes the new path — **a `{site, layer}` PAIR re-derived, which F2 records as not a rename** |
| `tests/e2e/staged-install/publish-generators.test.mjs` | `NG-PUB-J`'s two figure rows `:1305`–`:1306`, the pair assertion `:1315`, the site literals (F2); the `LAYERS` set `:1308` needs no change (it already admits the assembled spelling); the deliberate wrong-pair control `:1457` **keeps its literal** | the same pair re-derivation, and one control stated so a sweep does not "fix" it |
| `tests/e2e/staged-install/version-stamp.test.mjs` | **NO EDIT — measured** | a `grep` for `ENVELOPE` over the four `O3` files returns no site in this file; it takes the run's label from the command's own declaration. **The absence is stated so it is not read as an omission** |
| `tests/e2e/consumer-fix/scenarios.mjs` | **gains** a head-comment `LAYER:`/`APP LAYER:` line and a label constant | run B has **no label line at all today** (measured); the label is declared and its `SOURCE-PINNED` cells are not upgraded by it |
| `tests/e2e/installed/**` | **new files** | run C's own label, its own helpers (§2.8) |
| `package.json` (root, the instrument harness) | the new legs' commands | **owned by no module** (§5); the legs are named at §2.7.4 and §2.8 |
| `docs/specs/storeroom-publish/contract.md` `PUB-DD-24` · `docs/specs/storeroom-js/implementation-plan.md §2` | read through this ruling | both declare the legs **by command, site AND layer** and `PUB-DD-24` prices a separate command for the publish cells as needing *"a fresh ruling"* — **`D-9` is that ruling's ground and `D-5` is the directory's.** The corpus is unowned: the clause **stands as text and is read through `D-9`** (`D-3`'s ANNOTATE-BESIDE precedent). **No role here amends it (Q16)** |

**NOT EDITED, and this is the evidence for (b) rather than an omission:** `greens.mjs`'s `const LAYER` (`:70`),
its head-comment home (`:9`) and its print (`:1532`); `JSG-12.15`/`JSG-12.16`; the three other runners'
constants; and `register.test.mjs` — whose `LAYER_ARTIFACT` join is re-pointed **by F1's path sweep because the
directory moves**, while **both of its label cells keep their assertions whole because the artifact they read
keeps its label.** `greens.mjs`'s only edits in the wave are `JSG-12.18`'s two (§2.9).

### §2.7.4 Commands, and the adaptation the new home implies

- **The `O3` node leg:** `node --test tests/e2e/staged-install/*.test.mjs`, taken at the repository root — **its
  own glob, which a top-level `tests/e2e/*.test.mjs` leg does not match**, so the two runs cannot discover each
  other's cells. Its layer statement is run A's, printed per §2.7.2.
- **Adaptation 1 — the label's carrier moves.** Today the label's home is a constant inside a runner; after the
  move it is a constant inside **the run's own support helper** (run A) or the runner's own head (run B, run C).
  §2.7.3's table is what that implies file by file.
- **Adaptation 2 — the label's readers.** `register.test.mjs`'s extraction survives only if `greens.mjs`'s two
  label homes stay byte-identical (§2.7.3) **and** the `LAYER_ARTIFACT` join is re-pointed in the same wave
  (F1). **A wave that moves `greens.mjs` without re-pointing that join fails an `O4` cell at extraction** —
  exactly the damage F1 names.
- **Adaptation 3 — the command's owner.** The root `package.json` names the legs and is owned by no module
  (§5); with run A and run C added, the harness needs **three** `node` legs plus the greens command. **Who
  re-points it is Q16 and is not decided here.**
- **Adaptation 4 — the `O3` set's helpers are `O3`'s** (`D-7`): each of the three runs carries its own; no
  `O4` helper is consumed by any of them, and §2.6.6's cross-route negative is re-checked at the wave rather
  than trusted.

---

## §2.8 · `D-10` — the installed-layer battery, declared

**What it is.** The **`LIVE/INSTALL`** layer's battery, driven by **a LOCALLY PACKED TARBALL** — the instrument's
own *"packed or released tarball"* arm (`docs/specs/storeroom-publish/contract.md §4.2` item `1`): a real
package manager, in a **directory with no repository in its ancestry and no `build/Release` beside the entry**,
with **one real Node process**. **A registry release is not required and nothing here authorises one**
(`D-10`). **It answers F4** — not by turning `json-crossing-live.mjs`'s `JC_ENTRY` flag into a cell, but by
being the cell set the flag never was.

**Placement, label, command.** **Scope `tests/e2e/`** (surface-facing/install, `D-7`'s narrowed membership for
`O3`; the preset's scope per `D-5`). **Target path `tests/e2e/installed/`**, its own directory and its own run.
**Label string `LIVE/INSTALL`** (preset: `installed`), **`APP` LAYER `NONE`**. **Command
`node tests/e2e/installed/live-install.mjs`, taken at the repository root**; it is a **runner, not a
`node --test` file**, for three measured reasons: every drive must import **by name from inside the installed
tree**, so each is a subprocess (§2.6.2's composition); its verdict vocabulary needs `LAYER-LIMIT`, which
`node --test` has no form for; and the tree's own precedent for a layer that presumes external state is a runner
with its own exit rule (`json-crossing-live.mjs`). **Exit: non-zero on any `FAIL` or `FINDING`; `LAYER-LIMIT`
is neither.**

**Its helpers, under `D-7`:** `tests/e2e/installed/install-support.mjs` — the clean-directory minting, the
`npm pack` + `npm install` calls, the driver/preload staging that puts the import site inside the installed
tree, and the label constant. **It consumes no `O4` helper**, and neither does run A's.

**Its 15 cells, each with its subject.** *(Ids are this declaration's; the report's figure home is the
contract's own `§6` row `13` — the `LIVE/INSTALL` figure, a POST-RELEASE row — so no contract id is minted
here.)*

| id | subject |
|---|---|
| `INSTALL-01` | `npm pack` of `bindings/js` produces a tarball, and its **member set is read** (the installed shape's own bytes) — **⟶ MEASURED 2026-10-27 AT `1.0.1`: `19` members BARE and `20` ASSEMBLED.** The difference is the assembly's one staged byte, `LICENSE` (`PUB-DD-11`'s carriage, the same mechanism that lands `README.guide.md`); `package.json` is counted by both, and `npm pack`'s `fileCount`/`entryCount` and the archive's own index agree. The five platform tarballs carry `3` members each on this host (`package.json`, `README.md`, `LICENSE`) and `4` for the one platform that was BUILT here (`+ storeroom_js_binding.node`, `linux-x64`); the other four are `LAYER-LIMIT` at `INSTALL-09` for exactly that reason |
| `INSTALL-02` | **the allowlist falsifier:** every path the entry requires **by path** is present in the tarball's member set — **this is `D-3`/`D-4`'s successor to the retired count: reachability, not arity** |
| `INSTALL-03` | `npm install <tarball>` **succeeds** in a clean directory whose ancestry names no repository |
| `INSTALL-04` | the instrument's own topology: **no `build/Release` beside the entry**, none in the tarball, and no `.node` in the main package's member set (`PUB-DD`'s prohibitions, carried to the installed layer) |
| `INSTALL-05` | the packaged name **resolves through `exports`** from inside the installed tree — by name, one real Node process |
| `INSTALL-06` | the **version read does not refuse** the packed version (rung one's compare) |
| `INSTALL-07` | **the five declared names, as declarations:** `optionalDependencies` carries exactly five, each **pinned exactly** to the packed version, each spelled identically to the entry's own table — `@auspicion/provident-storeroom-js-linux-x64-gnu` · `-linux-arm64-gnu` · `-darwin-x64` · `-darwin-arm64` · `-win32-x64-msvc` |
| `INSTALL-08` | **the host's own name is the rung-one subject:** rung one **fires**, the artefact it loads is the one the host platform package carries, and its stamp equals the packed version |
| `INSTALL-09` | **the four non-host declared names, one arm each: `LAYER-LIMIT` — driven, reported, NEVER a pass.** The cell fails if any of the four is claimed green |
| `INSTALL-10` | an uncovered target meets the **declared absent-addon refusal**, with the two-subject join `PUB-DD-26` fixes (`rung one, rung two`, `', '`) |
| `INSTALL-11` | **the licence text travels although the manifest names no `LICENSE` row** — the carriage mechanism (`PUB-DD-11`: four published paths against three declared names, *"the mechanism rather than a defect"*). **A positive observable where a refusal used to stand** (§2.9) |
| `INSTALL-12` | **a `LICENSE` row, if present, cites its evidence** — `D-8` (iii)'s conditional, read where its evidence lives (§2.9) |
| `INSTALL-13` | **no digest figure is minted** (`PUB-DD-13`: a local tarball's digest is **not** the released artefact's tie; a consumer verifying against it meets a mismatch on a correct package) |
| `INSTALL-14` | **no consumer-loaded claim** (`PUB-DD-14`: *"a consumer has loaded this package"* is a universal negative this topology cannot falsify — `LIVE/INSTALL` drives a clean directory and one Node process, **not an application**) |
| `INSTALL-15` | **`APP` stays `NONE`** in the label and in the report, and it re-measures **none** of another unit's figures (`contract.md §4.3` item `2`) |

**WHICH CELLS FALSIFY THE FIVE PLATFORM NAMES — stated because rung one is what this battery alone reaches:**
**`INSTALL-07` falsifies the five as NAMES** (count, exact pins, and the entry's table agreeing — a misspelling,
a fourth spelling, a floating pin or a sixth name all fail it); **`INSTALL-08` falsifies THIS HOST'S name as a
LOAD** (rung one firing is the claim no in-place battery can make); **`INSTALL-09` falsifies the other FOUR as
CLAIMS** — it fires if any of them is reported green on evidence that cannot be taken here. **So all five names
are falsified across `07`–`09`, and exactly one of them can fail by a load.**

**The two prohibitions, carried whole and not as footnotes.** **`PUB-DD-13`:** the battery takes **shape**
evidence and **mints no digest figure** — the tarball is locally packed, so its digest ties nothing a registry
ever held (`INSTALL-13`). **`PUB-DD-14`:** the battery is **not** *"a consumer has loaded this package"*, and no
clause of it reports a consumer-loading figure (`INSTALL-14`). **And `APP` stays `NONE`** — an installed green
is not an `APP`-green (`INSTALL-15`).

**THE ADAPTATION THIS DECLARATION OWES, STATED RATHER THAN ASSUMED — the host platform package.** A local pack
of `bindings/js` carries **no addon** (the tarball's member set is the allowlist, and the prohibitions forbid a
`.node` in it), so **rung one cannot fire from the main tarball alone.** The declaration therefore takes the
one arm that keeps a real package manager: **a second locally packed tarball for the host platform name**,
composed from `bindings/js/platforms/<host name>/package.json` plus the built artefact, installed beside the
main tarball. **This is the release assembly's own act performed locally** (that step is what copies the
artefact into each platform package), and it is **declared here as a composition of the tree's own idiom, not
as a measured result — no instrument in this tree does it today** (§2.6.2's `O3` gap has the same shape).
**Its falsifier: if a locally packed platform tarball is not lawful, `INSTALL-08` falls to `LAYER-LIMIT` and
`D-10`'s "it reaches rung one" is unmet locally — the battery would then report the five names as declarations
(`07`) and four arms of `09`, and the rung-one claim would wait for a registry release. Put to the architect as
Q17 rather than decided by preference.**

---

## §2.9 · `D-8` — `JSG-12.18`'s `LICENSE` limb: retired here, re-derived there

**The cell, read at its bytes.** `greens.mjs:1205`–`:1214` — `A('JSG-12.18', …)` with `FILES = ['index.mjs',
'README.md', 'index.d.ts', 'src/constraint-kernel.mjs']`, asserting **exact set equality** (`:1212`), a
binary-free allowlist (`:1209` — no `build/Release` path, no `.node`), **and** the refusal of a `LICENSE` row
(`:1213`, the regex `/(^|\/)LICEN[CS]E$/i`). **It owes two edits, and they are separate findings:** the
equality is obsolete under `D-3`'s correction; **the `LICENSE` limb is obsolete under `D-8`, because an
unconditional refusal has no subject left** — the row is lawful exactly when evidence requires it.

**THE DISPOSAL: RETIRE the `LICENSE` limb in `JSG-12.18`, and RE-DERIVE its subject as a pair of
evidence-conditional cells in the installed battery (`INSTALL-11`, `INSTALL-12`).** Not one or the other, and
the split is the point:

- **Why RETIRE rather than re-derive in place.** A greens cell is a **blind instance authored from the
  documentation alone**, and its assertions are read off documented bytes and the tree. **`D-8` (iii)'s
  antecedent — does a consumer or a scanner need the row? — is not a documentary fact; it is an install
  observation**, and no greps of the manifest can decide it. A conditional whose antecedent no greens cell can
  evaluate is **not a greens assertion at all**: re-deriving it in place would leave a cell asserting a rule
  whose ground it cannot see. **So the answer to "does that assertion belong in a greens cell?" is NO.**
- **Why RE-DERIVE at all, rather than delete the limb and stop.** The row is not unassertable — it is
  assertable **where the evidence lives**, which is the installed layer. `D-4`'s criterion names that instrument
  (`delivery` **+ the e2e/blind scenario testing**), and `D-10` is the battery that carries it. **Retiring the
  limb with nothing in its place would leave the manifest row unobserved and would let a later pass add a
  `LICENSE` row silently.**
- **What the re-derivation asserts instead — two subjects, not one:**
  `INSTALL-11` asserts the **carriage** as a positive: **the licence text arrives in the installed tree
  although the manifest names no `LICENSE` row** (`PUB-DD-11`; `§2.3` item `2`; `PUB-DD-12`/`DD-43` unmoved).
  `INSTALL-12` asserts the **conditional**: **a `LICENSE` row present in the manifest is lawful only with a
  recorded evidence item naming a consumer or scanner requirement** — the evidence's home being this battery's
  own record (§4 Q18), which is **the only place `D-4`'s criterion can produce it**. **A row without its
  evidence fails; a row with it passes; no row passes.** That is `D-8` (iii) as a failable assertion, and it
  re-creates no fixed manifest rule — the thing `D-4` lifted.
- **What `JSG-12.18` keeps, and the wave must not take with the limb:** **no `build/Release` path and no
  `.node` at any entry** (`:1209`, the binary-free conjunct) — **functional and security prohibitions, not
  shape rules** — and its **equality edit** is `D-3`'s, a separate change to the same cell. **A pass that
  deletes the equality and takes the prohibitions with it has destroyed the load-bearing half of the cell**
  (`D-3`'s correction says so by name). **So the cell's wave edits are exactly two: the equality (`D-3`) and
  the `LICENSE` conjunct (`D-8`), and its citation line (`:1211`, which cites items `6`, `1` and `5` — all
  retired or re-read) is re-derived with them.**

---

## §3 · The layer-preservation clause

**The project's rule (`strata/brief.md` §5 item 8, `docs/guides/electron-integration.md`'s ladder (⟶ **THE LOCATION IS STALE, MEASURED 2026-10-27: `docs/guides/` carries ONE tracked file, `docs/guides/package-use.md` — the consumer guide and the guide's one authored home (`scripts/publish.sh`'s `GUIDE_CANONICAL`, landed at the packaging root byte-for-byte as `bindings/js/README.guide.md`). No `electron-integration.md` exists in this tree**, so the ladder is cited here without a document to check it against; the RULE it states — a green is always reported with its layer — is the one the runners carry),): a green is
always reported with its layer, the ladder is *envelope* → *loaded in dev* → *loaded in the packaged app* →
*installed from the registry*, and a green on one layer does not retire a red on another.** The move changes no
file's label **except where `D-9` orders one** (§2.7: the four `O3` rows move from `envelope` to `assembled`),
and this section states what each scope's battery reports **and what the move would cost if the labels were not
carried with the files.**

**⟶ THE CENSUS IS RE-COUNTED AT `D-9`:** `tests/e2e/` read **envelope 29 · assembled 4** and now reads
**envelope 25 · assembled 8** — `+4` from §2.1 rows 18, 20, 22 and 23, and **no other row moved**. The
`installed` column of the 75 stays **0**, because run C is **not one of the 75** (§2.8): it is a battery this
declaration creates, and its cells are declared, not measured.

| scope | the layers its battery reports | evidence read off the files |
|---|---|---|
| `tests/e2e/` | **envelope** (25 files), **assembled** (8: `live-drive`, `json-acceptance-set-live`, `json-crossing-live`, `json-crossing-live-s17`, and at `D-9` the four `O3` rows `staged-install/{publish, publish-generators, version-stamp, package-entry}`); **installed** — *within the 75, declared but unexercised* (`json-crossing-live.mjs`'s `LIVE/INSTALLED` reach via `JC_ENTRY`, which is a flag and not a cell), **and outside the 75, declared by §2.8 and run by nothing yet**; **app** — never, by declaration (`APP LAYER: NONE` in every runner, `DD-20`) | the `LAYER:`/`const LAYER` heads of `greens.mjs`, `held-listener-identity-greens.mjs`, `live-drive.mjs`, `json-acceptance-set-greens.mjs`, `json-acceptance-set-live.mjs`, `json-crossing-live.mjs`; `publish.test.mjs`'s `P-PUB-8`, `package-entry.test.mjs`'s `S-LAYER` and `publish-generators.test.mjs`'s `NG-PUB-J` rows (**all three re-derived at `D-9`**, §2.7.3); `register.test.mjs`'s `S-LAYER` (**unchanged — it reads the `O4` run's constant**) |
| `tests/integration/<module>/` | **envelope only**, and *by construction*: no `.node`, no entry, no process boundary — the Rust legs (`cargo test`) and the kernel legs (in-process) | `docs/specs/storeroom-publish/contract.md` §4.5 item 2 declares both Rust legs `ENVELOPE/PURE`; the kernel's files print no `LIVE` label |
| `tests/unit/<module>/` | **envelope only**, at the signature level: no state machine crosses a boundary, so no higher layer can be claimed | `a126`/`a127`'s own headers (specification-only, no artifact read); `crossing_*`'s `rlib`-only reach |

**FINDINGS — reporting that the move would *lose*, surfaced rather than absorbed:**

**⟶ AND THE ROUTE DOES NOT TOUCH ANY OF IT — BUT `D-9` AND `D-10` NOW DO.** `D-6` settles **how a cell reaches
the package**, not **what it reports**: **no route tag in §2.1 upgrades, downgrades or re-labels a file**, and
that distinction survives in §2.7, which gives the `O3` set a **run of its own with a label of its own** rather
than reading a tag as a label. **What changed at `D-8`/`D-9`/`D-10`:** `F3`'s label question is **answered for
the `O3` set by `D-9`** (§2.7) and **deliberately left as it stood for the `O4` set** (Q15); `F4`'s absent
`installed` battery is **supplied by `D-10`** as a declared, unrun cell set (§2.8). **A reader who takes the
route tag as a layer answer still collapses two questions this declaration keeps apart on purpose (§2.6.7).**

- **F1 · `register.test.mjs`'s `S-LAYER` reads its label by *path*.** `LAYER_ARTIFACT =
  join(PACKAGE_DIR, 'greens', 'greens.mjs')` (`:129`) — a green whose subject is *"the layer label READ OFF the
  artifact"* would stop resolving the moment `greens.mjs` and `register.test.mjs` sit in the same scope but the
  `PACKAGE_DIR/greens` join is not re-pointed. The assertion does not weaken; **it fails at extraction**, and a
  mechanical path edit is the repair. Recorded because it is exactly the kind of relocation damage that a
  "path rename" framing would absorb silently.
- **F2 · `publish.test.mjs`'s and `publish-generators.test.mjs`'s `S-LAYER` rows assert a `{site, layer}` pair
  with `site` a literal `'bindings/js/test/publish.test.mjs'`.** The move falsifies the site half of a *layer
  assertion* (`acceptance.md §2.3`: *"a wrong pair is void"*). Either the literal is re-derived at the move or the
  row is void — and re-deriving a *layer* row is not a path rename.
- **F3 · CLOSED FOR THE `O3` SET AT `D-9`, AND KEPT OPEN FOR THE `O4` SET (Q15) — the finding keeps its wording
  so a reader sees what was answered.** It read: *every JS `*.test.mjs` in this tree is labelled `ENVELOPE/PURE`
  by the declarations that govern it (`acceptance.md §5.2` row 1, `PUB-DD-24`, `implementation-plan.md §2`), yet
  each one loads the built `storeroom_js_binding.node` through the package entry — which the preset's own words
  make "drives the built artifact", i.e. `assembled`; if the answer is "assembled" then 24 files' reported layer
  changes with their directory.* **`D-9` answers it for the cells whose subject is the packaged resolution (the
  `O3` set) and for no others** — the ground it gives is that an `O3` cell stages a tree and a platform package
  and must not lean on rung two, while an `O4` cell is the *"package layer, in-process"* that rung two carries.
  **So the four `O3` rows are `assembled` (§2.1, §2.7) and the 21 remaining `O4` node cells keep `envelope`.**
  **★ BUT `D-9`'s blanket second half collides with four `O4` files this declaration itself labels `assembled`**
  — `live-drive`, `json-acceptance-set-live`, `json-crossing-live`, `json-crossing-live-s17`, each of which
  prints `LIVE / ASSEMBLED PACKAGE` off its own bytes — and with `json-acceptance-set-live.mjs:54`'s glossed
  `ENVELOPE/PURE (…)`. **This pass reads `D-9`'s second half as *the route does not move an `O4` label*, not as
  *every `O4` cell is re-labelled to envelope***, because flattening four runners would re-label a green on
  evidence the ruling did not weigh — **and it puts the reading to the architect rather than deciding it
  (Q15).**
- **F4 · AMENDED AT `D-10` — `installed` now has a battery; `app` still has none.** It read: *`app` and
  `installed` have no battery at all … the evidence `delivery` needs is `installed` evidence, and the only
  declared route to it (`json-crossing-live.mjs`'s `JC_ENTRY=LIVE/INSTALLED`) is a runner flag, not a cell.*
  **`D-10` supplies that battery and `§2.8` declares it** — 15 cells, its own label, its own command, its own
  helpers — **and it runs nothing yet: it is declared before it runs, like every unit here.** `APP` stays `NONE`
  and no `APP`-battery is owed; `json-crossing-live.mjs`'s `JC_ENTRY` arm **remains a flag and is not promoted
  into the battery** (its own run is `O4`/`assembled` and its label is its own).
- **F5 · `file-tier-save.test.mjs` reads the greens set by name** (`file-tier-save-greens.md`, cited at `:2271`
  as the source of a claim it refuses to assert). The runner and its set document move together in this
  declaration (`tests/e2e/file-tier-save/`), which is why the set's directory is preserved rather than flattened.

**⟶ FINDINGS OF THIS PASS (`D-8`, `D-9`, `D-10`), numbered on from the route pass's F11.**

- **F12 · The per-run label is a real coupling and it decides the structural move.** Measured: exactly **four**
  files carry `const LAYER` (`greens.mjs:70`, `held-listener-identity-greens.mjs:20`,
  `json-acceptance-set-greens.mjs:58`, `json-acceptance-set-live.mjs:54`); **`register.test.mjs` reads
  `greens.mjs`'s two label homes by path and asserts them against `ENVELOPE/PURE` at two cells** (`:762`,
  `:1104`), and its declared falsifier is a label change. **No `O3` cell is inside any of the four runs**
  (§2.7.1). That is why the move is **(b)** and not **(a)** (§2.7.2).
- **F13 · `package-entry.test.mjs`'s label cell cannot fail, and the same defect has a precedent.** `:346` is a
  literal compared to itself (`layer === 'ENVELOPE/PURE'`), the `RCA-12` class `register.test.mjs`'s `S-LAYER`
  was corrected out of on 2026-10-17. **The relabel's second edit there is not the value but the assertion's
  ability to fail** (§2.7.3).
- **F14 · Two `O3` label-literal sites are not named in `D-9` and the wave must still reach them.**
  `publish.test.mjs` `:15`/`:4164`/`:4167` (`P-PUB-8`) and `publish-generators.test.mjs`
  `:1305`/`:1306`/`:1315` (`NG-PUB-J`) both pin `ENVELOPE/PURE` **citing `PUB-DD-24` and `acceptance.md §5.2`
  row 1** — so the two `O3` files *do* carry label literals, and their relabel is a `{site, layer}` **pair**
  re-derivation rather than the four-site list's scope. **Whether `D-9`'s order reaches them is Q14.**
  (`version-stamp.test.mjs` carries none, measured; the deliberate wrong-pair control at
  `publish-generators.test.mjs:1457` keeps its literal.)
- **F15 · `D-9`'s second half collides with four `O4` files this declaration calls `assembled`.** They print
  `LIVE / ASSEMBLED PACKAGE` off their own bytes; a literal reading of *"the `O4` cells kept at
  `ENVELOPE/PURE`"* would re-label them and change `json-acceptance-set-live.mjs:54`'s constant. **Read as
  *the route moves no `O4` label* here; put to the architect as Q15.**
- **F16 · The installed battery cannot fire rung one from the main tarball alone, and the composition is
  declared, not measured.** A local pack carries no addon, so a **second locally packed platform tarball** is
  the arm that keeps a real package manager (§2.8). **Its falsifier is stated: refuse that arm and `INSTALL-08`
  falls to `LAYER-LIMIT` while `07` and `09` stand** (Q17).

---

## §4 · What does not stratify cleanly — named questions

**Q1 · Four files span two layers and are assigned by dominant; the split is owed and is not drawn here.**
`held-listener-identity-properties.test.mjs` (surface + kernel, `P-HL-1`…`8`), `constraints-publication.test.mjs`
(constraints + `delivery`'s allowlist), `json-crossing.test.mjs` (crossing + the kernel's `commit`/`runAttempt` at
`:124`), `file-tier-save(-properties).test.mjs` (the terminal arm + the kernel's pass).
`held-listener-identity-refusal-restore.test.mjs` is a fifth, of a different kind: its **subject** is kernel law but
its **reach** is the entry, so it is assigned `integration/js-constraints` on subject and could honestly be e2e on
reach. **This pass draws no cut inside any file.**

**Q2 · The word `e2e` means two different things, and two file names collide with the preset.** `tests/e2e_*.rs`
are the project's *in-crate* end-to-end batteries — the architect's own words commissioned them — and they run
under `cargo test` in-process with no artifact and no entry point. Under the preset's definition they are
**integration** (`store-core`), and this pass assigns them there **while keeping their names**; a rename is not a
stratification and is not ordered here.

**Q3 · `convenience.test.mjs` tests a surface that no longer exists.** It drives `on(address, listener)` and
`off(handle)`, which the brief's §3 records as **merged away** (no `on`, no `off`, no `settle` in the 14-member
declaration) — the file's own header says it was red by declaration and then green in its own era. Its scope
answer is e2e (it reaches the entry's product), but **its subject is superseded**: filing it under `tests/e2e/`
must not be read as renewing its claim. Whether it is retired, re-derived, or kept as a record is the architect's
or the test layer's, not this pass's.

**Q4 · `ENVELOPE/PURE` for a drive that loads the built addon — CLOSED FOR THE `O3` SET BY `D-9`, STILL OPEN FOR
THE `O4` SET (now Q15).** It read: *whether `ENVELOPE/PURE` means the layer of the package's envelope or the layer
at which the claim is measured.* **`D-9` answers it for the cells whose subject is the packaged resolution** —
the `O3` set is `assembled`, on the ground that it stages a tree and a platform package and must not lean on rung
two — **and answers it by run, not per cell** (§2.7). **The `O4` reading is carried forward as Q15, not decided
here.**

**Q5 · Five declared homes contradict the preset, and the contracts are unowned.** `docs/specs/storeroom-publish/
contract.md` **`PUB-DD-24`** fixes the publish red set's home at `bindings/js/test/publish.test.mjs` *"INSIDE THE
DIRECTORY THE LANDED JS LEG'S COMMAND GLOBS"* and prices the alternative; the same contract's §4.5 (and
`storeroom-js/package.md §4.2`) declare the legs **by command and site** (`node --test bindings/js/test/*.test.mjs`
at the repository root; `cargo test --manifest-path bindings/js/Cargo.toml`). Four further homes name the moved
paths: `package.json:7` (the root instrument harness), `scripts/publish.sh:197` (`delivery`), and
`bindings/js/README.md:222,238` (`delivery`). **`D-5` answers "which convention survives" and does not answer
"what happens to a contract clause that declares the path it is leaving."** The precedent is `D-3`'s: the clause
**stands as text and is read through the ruling** (ANNOTATE-BESIDE), no role rewrites the spec corpus, and the
authority log is what supersedes it. **That is a question for the architect, not a decision of this pass.**

**Q6 · The greens runners report rather than assert, and their scope answer is `e2e` on reach, not on kind.**
Six of the ten are blind instances and four are live re-drives; all ten print `RESULT <id> <verdict> :: …` and
carry their own exit rules — two of them (`json-acceptance-set-greens.mjs`, `file-tier-save/scenarios.mjs`) count
`FAIL` **and** `CONFLICT`, one ranks `LAYER-LIMIT`/`OBSERVED`/`GAP` as non-passes-not-failures, and one
(`consumer-fix/scenarios.mjs`) can answer `SOURCE-PINNED` off repo bytes with no run at all. **They are
instruments, not a battery that fails a build**: `node --test` will not even discover them (their names carry no
`.test.`), so placing them inside `tests/e2e/` makes one scope hold two kinds — discovered tests and
explicitly-invoked runners — and the run command (`npm run greens`) must keep naming them. Declared as a
consequence, not repaired.

**Q7 · Two `.md` artifacts live inside the batteries.** `REMEASURE-2026-10-18.md` (a measurement record, consumed
by nothing) and `file-tier-save-greens.md` (the blind set a runner drives). Neither is a test; both are declared
in §2.5 rather than assigned a scope. A fourth class — `bindings/js/test/*.mjs` where the name is not
`*.test.mjs` — is what the project's own glob turns into "not a test" (`node --test … *.test.mjs` does not match
them), and the four helpers say so at their own bytes.

**Q8 · No blind instance exists for either Rust crate, and one surface has none of its own.** The store crate and
the binding crate are internal libraries rather than general-purpose consumer surfaces, so this pass gives them
none; `js-resolution` has no blind instance of its own (its cells sit inside `package-entry.test.mjs` and
`consumer-fix/scenarios.mjs`). Whether the store crate's public surface is *general-purpose* enough to owe one is
put to the architect.

**⟶ QUESTIONS RAISED BY THE ROUTE PASS (`D-6`).**

**Q9 · `D-6`'s census says 19 files carry the bare specifier; this pass measures 24.** The five it does not carry
are `register`, `held-listener-identity-properties`, `a126-constraint-methods`, `publish` and `package-entry`, and
each reaches the name **only** through a dynamic `await import(...)` — where all 17 named files spell a static
import. **My reconciliation — that the ruling's census counts static imports — is an inference, not the ruling's
meaning.** The five are re-spelled by route above; **whether that is the right reading of `D-6` is the
architect's** (§2.6.5).

**Q10 · The packaged-resolution claim's exclusivity — `D-6`'s own open item, untouched here.** `D-6` records
L0's reading that *the `exports` claim lives exclusively in the `O3` set* as **inference awaiting confirmation**.
This pass's tagging is consistent with it and **does not settle it** (§2.6.7). **Confirm, correct, or leave it
open** — and note that if it is confirmed, `O4`'s path route is a *declared absence* of an `exports` claim rather
than an incidental bypass.

**Q11 · `O3`'s mechanism is a composition of two precedents, and the composition is unmeasured.** `D-6`'s `O3`
needs an install-shaped tree **and** a name import through `exports`. `publish.test.mjs`'s `makeScratch` supplies
the tree but imports the entry **by path inside it**; the `typecheck` stage and 19 e2e files supply the **name**
reach but no tree. **No existing cell does both** (§2.6.2). This declaration composes them and invents no shape —
**is the composition the intended `O3`, or does the ruling's "by name from inside that tree" require the entry
itself to be unreachable except through the map?** (No shell in this pass: the composition is declared, not
measured.)

**Q12 · `consumer-fix/scenarios.mjs` is publish-readiness with no subject it can reach.** Its own header records
that the entry-level refusal *"cannot be driven by this pass: `index.mjs` is behind the implementation wall, and no
published platform package exists to install."* It is tagged `O3` on purpose; **`O3`'s staged tree is the first
instrument that could give it a subject, and whether it should take one is the test layer's to declare — not this
pass's** (§2.6.1 call 5).

**Q13 · `D-4` lifts "NOTHING ELSE" while `D-3`'s correction keeps `JSG-12.18`'s `LICENSE`-row refusal — CLOSED
BY `D-8`.** The two clauses meet at one manifest row: a `LICENSE` row is *"something else"* under `D-4` and a
refusal under the correction. **`D-8` settles it as reading (iii): the row is lawful only if evidence requires
it**, so the unconditional refusal has **no subject**. **The disposal is declared at §2.9** — retired in
`JSG-12.18`, re-derived as `INSTALL-11`/`INSTALL-12` — **and the cell's edit is no longer blocked.**

**⟶ QUESTIONS RAISED BY THIS PASS (`D-8`, `D-9`, `D-10`).**

**Q14 · Does `D-9`'s relabel reach the two `O3` files that carry label literals but are not in its four-site
list?** `publish.test.mjs` (`:15`, `:4164`, `:4167`) and `publish-generators.test.mjs` (`:1305`, `:1306`,
`:1315`) pin `ENVELOPE/PURE` **citing `PUB-DD-24` and `acceptance.md §5.2` row 1**, and `PUB-DD-24` declares the
publish cells' leg *"at `ENVELOPE/PURE`"* by name. **This pass reads `D-9` as reaching them** — an `O3` cell
labelled `envelope` would leave the ruling half-applied and would make `P-PUB-8`/`NG-PUB-J` assert a layer their
own run does not report — **and that reading contradicts a declared contract clause, which is the architect's to
supersede or to confirm** (§2.7.3, F14).

**Q15 · Is `D-9`'s *"the `O4` cells kept at `ENVELOPE/PURE`"* a floor or a re-label?** Four `O4` files are
labelled **`assembled`** by this declaration and print `LIVE / ASSEMBLED PACKAGE` off their own bytes
(`live-drive`, `json-acceptance-set-live`, `json-crossing-live`, `json-crossing-live-s17`), and
`json-acceptance-set-live.mjs:54` carries a **glossed** constant (`ENVELOPE/PURE (the JavaScript package layer,
in-process)`). **This pass reads the ruling's second half as *the route moves no `O4` label*** and leaves all
four plus the glossed constant byte-identical (F15). **The other reading — every `O4` cell is envelope — would
re-label four runners and edit one constant, and it is the architect's to choose.**

**Q16 · Who declares the new legs, now that there are three `node` legs and the greens command?** The relabel
splits `O3` into runs A, B and C (§2.7.2), so the harness must name `node --test tests/e2e/staged-install/
*.test.mjs` · `node --test tests/e2e/*.test.mjs` · `node tests/e2e/installed/live-install.mjs` · the greens
command, and **`tests/e2e/` needs its own layer statement per leg** — which is exactly the cost `PUB-DD-24`'s
`alt` prices as needing *"a fresh ruling"*, and exactly the clause `D-5` relocates the files away from. **The
root `package.json` is owned by no module** (map §5.3) and the spec corpus is unowned, so **the leg declarations
and the `PUB-DD-24`/`implementation-plan.md §2` amendments have no owner this declaration can name.** This is
Q5 restated with three legs rather than one, and it is a blocker for the wave, not for this declaration.

**Q17 · May the installed battery pack a local platform tarball, or does rung one wait for a release?** A local
pack of `bindings/js` carries no addon, so `INSTALL-08` (rung one fires) needs a **second locally packed
tarball** composed from the platform package's manifest plus the built artefact — the release assembly's own copy
performed locally (§2.8). **This pass declares that arm**; the alternative is that `INSTALL-08` falls to
`LAYER-LIMIT` and all five platform names are falsified as *declarations* only (`INSTALL-07`, `INSTALL-09`).
**`D-10` says the battery reaches rung one, which is why the arm is declared rather than assumed.**

**Q18 · Where does the `LICENSE`-row evidence live, so `INSTALL-12` can read it?** `D-8` (iii) makes the row
conditional on *"an e2e/install scenario shows a consumer or a scanner needs the row"*. **A conditional needs a
home for its antecedent**, and this pass declares it as **the installed battery's own record** — the only place
`D-4`'s criterion produces it. **If the architect means a separate register instead, `INSTALL-12` reads that
register and this declaration's home moves with it; nothing else in §2.9 depends on the choice.**


---

## §5 · The migration shape — declared as consequences, not performed

**Nothing in this section has been done.** It states what the wave that executes §2 will meet.

**⟶ ★ AND IT HAS NOW BEEN DONE — 2026-10-25. THE WHOLE OF THIS SECTION IS READ AS THE WAVE'S OWN PLAN, CHECKED
OFF AFTER THE FACT.** **`tests/e2e/`, `tests/integration/` (with every subdirectory it names), `tests/unit/` (with
every subdirectory it names) exist and carry the files; the four present-state directories are empty or gone;
`tests/Cargo.toml` exists as the third workspace member; the root `package.json`'s `test` script globs
`tests/**/*.test.mjs`; and every route re-spelling §2.6.4 declares has landed.** **What a reader must not do is
read the future tense below as outstanding work** — it is a record of a prediction that held, and **the two
discoveries it priced were both real**: the `[[test]]` entries and the `#[path = "../support/mod.rs"]` resolution
are in the tree exactly where this section said they would be needed, and the root `package.json`'s script *was*
re-pointed by a pass that owns no module (`D-11`, `D-34`). **One discovery this section did NOT anticipate is named
so the record is honest: the Rust half needed a THIRD PACKAGE rather than a `[[test]]` path escaping its crate**,
which is `D-34`'s lift and `storeroom-tests`' whole reason to exist.

**Paths.** **None of the three scopes exists today** — *this sentence was true when written and is false now; the
three exist and this paragraph is the plan they were built from*: `tests/` holds only the store crate's 15 files,
`bindings/js/test/`, `bindings/js/tests/` and `bindings/js/greens/` hold the rest. The wave **creates**
`tests/e2e/` (with `file-tier-save/` and `consumer-fix/` subdirectories), `tests/integration/` (with
`store-core/`, `store-fail-set/`, `store-args/`, `binding-crossing/`, `js-constraints/`, `support/`),
`tests/unit/` (`js-surface/`, `js-constraints/`, `binding-crossing/`), and **empties** the four present-state
directories.

**Discovery — the two legs, and neither is a path rename:**

1. **`cargo test`.** `tests/` at the repository root *is* the store crate's integration-test directory, and
   `bindings/js/tests/` is the sibling crate's. Cargo's autodiscovery finds `tests/*.rs` (one target each) and
   `tests/*/main.rs` (one target per directory) — **it does not find `tests/integration/store-core/construction.rs`**,
   and it will walk the new directories looking for `main.rs` and find none. So the Rust half of the move needs
   either `[[test]]` entries carrying `path` in the root `Cargo.toml` and `bindings/js/Cargo.toml` (**owned by
   `delivery`**), or a shape change per target (`tests/<scope>/<module>/main.rs` declaring its siblings as
   modules) — and `mod support;` stops resolving across the extra directory level (`#[path = "../support/mod.rs"]`
   or a per-scope copy is owed). **These two targets' declarations are `delivery`'s and both crate manifests are
   in its `owns` list.** *(Stated as a consequence of cargo's documented discovery rules; this pass had no shell
   and ran no build — not measured here.)*
2. **`node --test`.** The root `package.json`'s `test` script globs `bindings/js/test/*.test.mjs`. After the move
   it must name three trees, and the four runners keep a separate command. **The root `package.json` is owned by
   no module** — map §5.3 gives it to no one, deliberately — so *"who re-points the instrument harness"* is a real
   question the wave will hit (it is not `delivery`'s: `delivery` owns `bindings/js/package.json`).

**Content — what will need adaptation, and where the adaptation is more than mechanical:**

- **The self-reference specifier — `D-6` HAS NOW ANSWERED THIS, PER ROUTE.** Every JS `*.test.mjs` imports
  `'provident-storeroom'`, resolved by Node's **package self-reference** through `bindings/js/package.json`'s
  `exports` map — lawful only because the importing file sits **inside** that package's directory. Files under
  `/tests/…` are outside it, so the specifier will not resolve, and the mechanical relative re-point **destroys
  the claim the battery rests on** (`acceptance.md §4.1` item 1 / `DD-18`: *"it drives the package through its
  CLAIMED ESM ENTRY POINT"*, *"a test that loads the addon itself is a finding"*; `DD-24` names the
  self-reference as its own drive). **This declaration recorded three lawful routes and took none; `D-6` takes
  them apart by purpose: `O3` cells keep a name reach and move it inside a staged tree, `O4` cells take the path —
  and the claim is carried by the `O3` set, not by a spelling every file shares.** The re-spelling is stated file
  by file at **§2.6.4**, including the two embedded child-drive specifiers that must be treated **oppositely**
  (`json-crossing`'s become paths; `negative-generators`' `:1550` stays a name, because there the name is the
  assertion).

**★ THE TWO CELLS THE `D-3` CORRECTION NAMES — the fourth `files` entry's retirement, costed where the move will
meet it.** Retiring the fourth `files` entry (`src/constraint-kernel.mjs`) fails **two cells in two batteries**,
and **both are e2e-bound**: **`P-PUB-7`** in `js-battery` (`publish.test.mjs`, tagged **`O3`**) — the
`assert.deepEqual` against the sorted four-name array at `:2283-2285` — and **`JSG-12.18`** in `greens-harness`
(`greens.mjs`, tagged **`O4`**) — the exact set equality at `:1205`, with the fourth entry refused any looser
form, a fifth entry refused and a `LICENSE` row refused at `:1211`. **A test cannot be superseded by a ruling**
(`D-3` says so by name), so both are **owed an edit by their owners**; and **each cell's *other* subjects are
prohibitions that survive the count's lifting and must not travel with it**:
**`P-PUB-7`** keeps `build/Release` leaving `files`, no `.node` published, no `postinstall` build-on-install route
and the tracked-tree walk for a shipped binary (`:2286-2299`); **`JSG-12.18`** keeps **no `build/Release` path**,
**no `.node` at any entry** and **no `LICENSE` row**. **A pass that deletes an equality and takes the
prohibitions with it has destroyed the load-bearing half of both cells** — and it will be doing it in **one `O3`
cell and one `O4` cell**, which is the sharpest illustration that **the route tag is no help at this migration**:
both cells read the manifest **as bytes**, neither goes through its route, and **neither tag makes the edit
mechanical**.
- **★ AND ONE COLLISION THIS PASS DOES NOT RESOLVE — IT RECORDS THE RULING THAT SETTLED PART OF IT.** `D-4` lifts
  the strict count **and** `§2.1` item `1`'s *"NOTHING ELSE"* exclusivity, while the `D-3` correction carries
  `JSG-12.18`'s **`LICENSE`-row refusal** as a *licensing* prohibition that survives. **`D-8` settles that
  collision (reading (iii): the row is lawful only if evidence requires it) and moves the refusal out of the
  cell** — so **`JSG-12.18` now owes exactly two edits and its `LICENSE` subject is no longer among the things it
  keeps** (§2.9). **What stays unresolved is where the evidence's home is (Q18) and whether the relabel reaches
  the two `O3` cells `D-9` does not name (Q14).**
- **★ THE RELABEL'S OWN WAVE, NAMED AS CONSEQUENCES (`D-9`, §2.7.3).** The wave **creates
  `tests/e2e/staged-install/`** and moves the four `O3` files into it; **adds `staged-install-support.mjs`** as
  run A's label carrier and import/install helper; **re-derives three label sites and one `{site, layer}` pair**
  (`package-entry` `:345`–`:346`; `publish` `:15`/`:4164`/`:4167`; `publish-generators`
  `:1305`/`:1306`/`:1315`) **and edits no byte of any existing `const LAYER`**; **adds a `LAYER:` line to
  `consumer-fix/scenarios.mjs`**; **re-points `register.test.mjs`'s `LAYER_ARTIFACT` join** (F1's path sweep,
  in the same wave, or an `O4` cell fails at extraction); and **names three `node` legs plus the greens command
  in a root `package.json` that no module owns** (Q16). **It also owes the bounded spec read-through of
  `PUB-DD-24` and `implementation-plan.md §2` — clauses that declare the legs by command, site and layer and
  that `D-5`/`D-9` leave behind — which no role in this workflow may perform (Q16).**
- **★ AND THE INSTALLED BATTERY'S WAVE (`D-10`, §2.8).** The wave **creates `tests/e2e/installed/`** —
  `live-install.mjs` and `install-support.mjs` — **and no file moves**: the battery is new, so it changes no
  present-state path and no entry of the 75. **Its `INSTALL-08` arm is the one piece that needs a second locally
  packed tarball for the host platform package** (Q17), and its record is where `D-8`'s evidence must be written
  if a `LICENSE` row is ever added (`INSTALL-12`, Q18).
- **Relative reaches to the kernel and to the artifact.** `../src/constraint-kernel.mjs` (five files import it,
  `:124`/`:156`/`:79`/`:161` and the helpers' `:33`/`:157`), `HERE/../index.mjs` and
  `HERE/../build/Release/storeroom_js_binding.node` (the greens), `ROOT` computed four levels up
  (`consumer-fix/scenarios.mjs`), `PACKAGE_DIR`-based joins (`register.test.mjs`, `addon-*-support.mjs`) — each
  is computed from `import.meta.url` and each must be recomputed once, in one pass, by one hand.
- **`fileURLToPath(new URL('../src/constraint-kernel.mjs', import.meta.url))`** is also used as an **identity**
  (`json-crossing.test.mjs:3936`, `CROSSING_KERNEL_FILE_SUFFIX`, a census exclusion) — a path used as a name.
- **Layer-asserting literals** (F1, F2) and **`a127`'s `THE_TWELVE`** — the latter is already named as owed a
  re-derivation by `docs/specs/storeroom-held-listener-identity/contract.md` §5.7 item 5 and §8 item 5.
- **Import graph across scopes**: the two cross-scope helpers (§2.5) mean `tests/integration/js-constraints/`
  is imported by two unit files and two e2e files — lawful, but it makes the integration directory a dependency
  of a scope that is not allowed to own it.
- **The map's own revision is owed *after* execution, not now**: `modules.json`'s four battery modules keep
  their ids and their `owns` lists must be re-pointed to the three scopes; the map's §2.4 note and its FIGURES
  (75 paths in four directories) move with them. **This pass does not edit either file.**

---

## §6 · What this pass did NOT decide

- **It moved nothing and edited no test.** No file under `tests/`, `bindings/`, `src/`, `docs/specs/` or
  `strata/` was created, renamed, edited or deleted.
- **It drew no cut inside any file.** Where a file is genuinely two layers (Q1), it is assigned by its dominant
  layer and the split is **owed**.
- **It decided no question in §4** — not the `ENVELOPE/PURE` label (Q4), not the fate of `convenience.test.mjs`
  (Q3), not what happens to `PUB-DD-24` and the leg declarations (Q5), not the specifier route, not whether the
  store crate owes a blind instance (Q8).
- **It ran nothing.** No `cargo test`, no `node --test`, no greens run. Every layer claim in §3 is read off a
  file's declaration, not measured by a run.
- **It did not verify** cargo's and Node's discovery behaviour on this tree (no shell); it did not verify the
  tracked status of any path; and it did not open any cell body it did not need — the survey was headers, doc
  comments, imports, cell names and file census, per the brief.
- **It did not delegate.** No L2 role was started: the decomposition is for the architect's review, and the
  cascade begins only after this is ruled on.
- **⟶ AND THE ROUTE PASS DECIDED NONE OF THE FOLLOWING.** **It did not answer `F3`** (the label of a
  `.node`-loading checkout cell) **and did not answer `F4`** (the absent installed-from-the-registry green):
  **`D-6` answers neither, and a route tag does not imply a label** (§2.6.7, §3). **It did not confirm the
  packaged-resolution claim's exclusivity** — `D-6`'s inference stands open as **Q10**, and nothing here is built
  on it. **It invented no packaged-resolution cell for the earlier set** (Q10 again): what §2.6 shows is that the
  *re-spelling* moves the `exports` reach out of the `O4` cells, not that any earlier-set claim changed. **It
  ordered no migration**: `D-6` orders no file move, and §5's costs are consequences, not a schedule. **It
  decided none of Q9–Q13.** **It started no L2.**

**⟶ AND THIS PASS DECIDED NONE OF THE FOLLOWING (`D-8`, `D-9`, `D-10`).**

- **It moved nothing, edited no test, ran nothing and started no L2.** Every edit in §2.7.3, §2.8 and §2.9 is
  declared against a **target** path — the battery's new home — and lands with the migration wave, because
  `bindings/js/test/` and `bindings/js/greens/` are present-state paths no strata role may write (`D-5`, `D-9`).
- **It ran no `npm pack`, no `npm install` and no `node` process.** **`INSTALL-01`…`INSTALL-15` are declared, not
  measured** — the battery is declared before it runs, like every unit here (`D-10`'s own closing clause).
- **It decided no question in §4's new block** — not whether `D-9` reaches the two `O3` cell sets it does not
  name (Q14), not whether *"the `O4` cells kept at `ENVELOPE/PURE`"* re-labels four runners (Q15), not who
  declares the three legs and amends `PUB-DD-24` (Q16), not whether a locally packed platform tarball is lawful
  (Q17), not where the `LICENSE` row's evidence lives (Q18).
- **It did not amend the spec corpus** — `PUB-DD-24`, `acceptance.md §5.2`, `implementation-plan.md §2` and the
  sibling layer vocabulary stand as text and are read through `D-9`/`D-5`/`D-8`. **No role in this workflow owns
  a contract** (map §5.3).
- **It did not add a module or an endpoint, and did not re-count the map.** 19 modules and 61 endpoints stand
  (Q16's owner question and §2.8's new battery change neither); the four battery modules keep their ids and
  their `owns` lists stay at their present-state paths until the post-migration revision §5 names.
- **It did not touch `modules.json`'s endpoint list except for one reading** — `delivery`'s allowlist endpoint,
  whose *"exactly four entries … no `LICENSE` row"* is now read through `D-3`, `D-4` and `D-8` (annotated at its
  own site, with the count unmoved).


---

## §7 · What was read off a file, and what was concluded

**Read at the bytes.** The **headers/doc comments of all 68 test artifacts** (and the whole of the two `.md`
files' first sections) — these are the evidence for every *scope* and *driver* cell in §2; the **import lines of
all 42 `bindings/js/test/*` files and all 11 greens** (the self-reference, the kernel reach, the helpers, the
`execFileSync`/`createRequire` staging); the **glob census** of the four directories (15 / 7 / 42 / 11 = 75); the
`LAYER`/`constraint-kernel.mjs`/`node --test bindings/js/test` greps behind §3; `docs/L1/modules.json` whole (the
19 ids and the four battery modules' `owns` lists); `docs/L1/module-map.md` §1, §2.1–§2.4, §3 (I-11…I-28), §4
(E1–E6), §5, §6, §7; `strata/decisions.md` and `strata/brief.md` whole; `package.json` (root) and
`bindings/js/package.json` whole; `docs/specs/storeroom-publish/contract.md`'s `PUB-DD-24` row and §4.5 legs
clause and `docs/specs/storeroom-js/contract.md`'s register-ledger clauses (by `grep`, quoted above where used).

**Concluded, not read.** That a file whose header says it drives *"the package's own boundary"* has the assembled
package as its subject (the headers are read; the *classification* is mine). That `tests/gate4_red_set_fix.rs`
belongs to `store-args` rather than `store-core` (its header names construction and listener outside values; the
carrier module is my mapping). That `record_shapes.rs` is `store-core`'s rather than `store-records`'s (the node
kinds are the register's; the module's declared responsibility is the *returned* records). That
`consumer-fix/scenarios.mjs` belongs to `delivery` (it reads the manifest, the workflow, the crate manifest and
the built stamp). Every "dominant layer" call in Q1.

**Could not verify.** Cargo and Node discovery on the moved tree (§5) — no shell in this pass; whether
`package.json`'s self-reference would resolve for a file outside `bindings/js/` (stated as a Node packaging rule,
not measured); the layer labels of the four `bindings/js/test/*` files that print no `LAYER` line (they inherit
`ENVELOPE/PURE` from the declarations that govern the leg, not from their own bytes); and the A112 ordering
gate's state, which the brief carries as `OWED` and which this pass neither re-measures nor uses.

**⟶ THE ROUTE PASS — WHAT WAS READ AT THE BYTES, WHAT WAS CONCLUDED, WHAT COULD NOT BE VERIFIED.**

**Read at the bytes (measured).** A `grep` census of the bare specifier `'provident-storeroom'` across
`bindings/js/**`, **file by file and line by line**, which returned **24 carrying files** — 22 `*.test.mjs` + the
two helpers — with each occurrence's line number and form (**static import / dynamic `import()` / embedded
child-drive source string**): this is the evidence for §2.6.5's correction of `D-6`'s 19, and it is a
**measurement**, not a reading. A `grep` census of the **staging idiom** (`mkdtemp` · `execFileSync` ·
`copyFileSync` · `node_modules` · `createRequire`) over the same 33 files, which returned **exactly four
tree-assembling files** — `publish`, `publish-generators`, `version-stamp`, and **one arm** of
`negative-generators` — plus two files (`surface`, `json-crossing-blinded`) whose `mkdtemp` calls are **real files
for a store boot**, not package trees: this is the evidence for §2.6.1's calls 2 and 3. The **entry reach of all
ten greens**, read off their own lines (`greens.mjs:196`, `live-drive.mjs:35`, `blind-constraints-v2.mjs:28`,
`held-listener-identity-greens.mjs:110`, `json-acceptance-set-greens.mjs:55`, `json-acceptance-set-live.mjs:51`,
`json-crossing-live.mjs:132`, `json-crossing-live-s17.mjs:50`, `file-tier-save/scenarios.mjs:32`, and
`consumer-fix/scenarios.mjs` — which imports nothing from the package at all). The **driver and preload shapes**
that make `O3`'s mechanism concrete (`publish.test.mjs:466`, `:704-764`, `:711-715`; `version-stamp:596-645`,
`:653-674`; `publish-generators:415-520`; `package.json:8`'s `typecheck:stage`). `package-entry.test.mjs`'s
manifest reads and its `exports` claims (`:30`, `:38`, `:82`, `:97`, `:136`, `:150-154`). `P-PUB-7`'s count
equality at `:2283-2285` and its four surviving prohibitions at `:2286-2299`. The **helper import graph**, both
helpers, consumer by consumer (12 and 5) — which is the measurement behind §2.6.6's correction.

**Concluded, not read.** **Every one of the 33 route tags** — the ruling names the criterion and deliberately
lists no cell, so **the assignment is mine**, made from each file's header, its own specifier and the reach it
spells; the six borderline calls are defended one by one at §2.6.1, and **call 3 (`negative-generators` → `O4`)
is the one I would put first to the architect if one is corrected.** That `consumer-fix` is *publish-readiness by
purpose* despite reaching nothing (call 5). That the five files `D-6`'s census omits are omitted because it counts
**static** imports (§2.6.5) — an inference, marked as one. That `O3`'s two precedent-halves can be composed
(§2.6.2) — declared, **not** measured.

**Could not verify (route pass).** **No shell and no run**: no staged tree was assembled, no `node --test`, no
greens run, no `cargo test`. So **the `O3` composition at §2.6.2 is a declaration and not a measurement**; no
cell's route was exercised; and **the claim that a path route bypasses `exports` while a name-from-tree route
passes through it is Node's documented resolution rule read off the map, not a driven result.** Whether
`bindings/js/index.mjs` reached by a **relative path from `tests/e2e/`** still resolves the addon ladder from the
entry's own directory **is likewise stated from the entry's own resolution code and not driven** — that is the
single most load-bearing unmeasured claim in `O4`, and the first thing the migration wave should drive.

**⟶ THIS PASS (`D-8`, `D-9`, `D-10`) — WHAT WAS READ AT THE BYTES, WHAT WAS CONCLUDED, WHAT COULD NOT BE
VERIFIED.**

**Read at the bytes (measured).** `greens.mjs` `:9` · `:62`–`:71` · `:1178`–`:1179` · `:1205`–`:1214` · `:1532`;
`register.test.mjs` `:106`–`:148`, `:749`–`:774`, `:1085`–`:1107`; `package-entry.test.mjs` `:340`–`:354`;
`json-acceptance-set-live.mjs` `:46`–`:56` and `:656`–`:660`; `json-crossing-live.mjs` `:37`–`:44`;
`consumer-fix/scenarios.mjs`'s header and its verdict vocabulary (`PASS|FAIL|SOURCE-PINNED|UNRUNNABLE`);
`REMEASURE-2026-10-18.md` `:223`–`:229`; a `grep` for `LAYER` over all `bindings/js/greens/**/*.mjs` (**four
files carry `const LAYER`, exactly the four `D-9` names**); a `grep` for `ENVELOPE` over `bindings/js/test/**`
(**four files, 19 hits — `register` 8, `publish` 3, `publish-generators` 5, `package-entry` 2, `REMEASURE` 1;
`version-stamp` carries none**); `bindings/js/package.json` whole (the five exact `optionalDependencies` names,
quoted at §2.8); `docs/specs/storeroom-publish/contract.md` §4.1–§4.5 whole, the `PUB-DD-13`/`PUB-DD-14`/
`PUB-DD-24` rows, and `§6`'s census rows `12`–`13`; and
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/acceptance.md` §4.1–§4.3 — **the archived vocabulary
home, cited at §2.7.2 because the kept corpus does not carry it.**

**Concluded, not read.** **The structural move (b)** — chosen on site 2's declared falsifier and on the measured
disjointness at §2.7.1, and falsifiable as stated at §2.7.2. That a greens cell cannot carry an
evidence-conditional assertion at all (§2.9) — a judgement about what a blind instance is, not a reading. That
the installed battery's shape follows `json-crossing-live.mjs`'s runner rather than `node --test` (§2.8). That
the five platform names are falsified across `INSTALL-07`–`INSTALL-09` in that partition — **the partition is
mine; the contract names the verifications, not the cells.**

**Could not verify.** **No shell and no run**: no `npm pack`, no `npm install`, no `node --test`, no greens run.
So **the `O3` label's carrier** (`staged-install-support.mjs`) is **declared, not built**; **the locally packed
platform tarball (Q17) is a composition of the release assembly's own act and is nowhere driven in this tree**;
`npm`'s always-included `LICENSE` behaviour — the half of `D-8`'s fact that makes the row purely declarative —
**is general npm behaviour read from the ruling and expressly not measured on this branch**; and **whether `D-9`'s
relabel leaves `PUB-DD-24`'s declared label honest** is a question for the architect (Q14, Q16), not a
measurement.

**⟶ AND THE COUNTS ARE RE-READ AT THE DOCUMENTATION RELEASE, 2026-10-30 — EVERY LEG UNMOVED, AND THE ONE NEW LEG IS A GUARD'S.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this one; every count it printed stays printed.** **THE POPULATION IS UNMOVED:** `tests/e2e/` 79 · `tests/integration/` 33 · `tests/unit/` 5 · `tests/Cargo.toml` 1 `= 118` ✓ · the e2e breakdown `55` · `12` · `8` · `1` · `3` `= 79` ✓ · `69` `*.test.mjs` ✓ — the four commits past `v1.6.0` write `strata/decisions.md` alone and this pass adds no file under `tests/` and no cell. **THE LEGS, EACH RUN THIS DATE, `0` failed:** `npm test` **1121 · 1120 pass · `0` fail · 1 skip**, exit `0` ✓ · `cargo test --offline` **669** (`434 + 235`) ✓ · `npm run greens` exit `0`, **11 discovered runners, AUTHORED 103 · EXECUTED 103 · PASS 103 · FAIL 0**, layer `LIVE / ASSEMBLED PACKAGE`, `APP` `NONE` ✓ · `npm run test:e2e` exit `0` (`15` declared · `15` recorded · `14` PASS · `1` LAYER-LIMIT · `0` FAIL) ✓ · `npm run typecheck` exit `0` ✓ · `scripts/publish.sh --figures` exit `0`, **three documents agreeing on `1.6.1`** ✓. **AND THE ONE LEG WHOSE VERDICT IS NOT GREEN IS THE PREFLIGHT, AND WHAT IT REFUSES ON IS THIS PASS'S OWN PROHIBITION AND NOT A DEFECT:** `scripts/publish.sh --check` exits `1` on exactly two lines — *"the working tree is dirty — 13 path(s). Commit or stash first"* and *"HEAD differs from origin/main — push or pull first"* — **because this pass may not commit and may not push; every other line of that preflight is green, including the ratchet's `83` accepted-baseline · `0` refused · `0` stale.** (`D-82`; the manifest's own `test` script; one run of each leg.)
