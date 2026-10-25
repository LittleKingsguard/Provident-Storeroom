# IMPLEMENTATION PLAN — `U-STOREROOM-JSON-CROSSING`

**Part of `contract.md`.** This plan records the order, the declared edit scope, and the verification gates. **The package, codec and bindings landings are implemented and the gate-3 green is measured (2026-10-23).** The store-side prerequisite, this contract and the green run each landed in their declared order. `[T]`

## §1 — STATUS

| Item | State |
| --- | --- |
| Gate 1 | closed `APPROVE-WITH-CONDITIONS`; go-ahead granted 2026-10-23 |
| Gate 2 contract | authored 2026-10-23 (`contract.md` + three parts) |
| Store-side `17`th status | landed 2026-10-23 (`src/error.rs`, native contract, `P-TP-8`) |
| Gate 3 red set | **authored and run 2026-10-23** — `bindings/js/test/json-crossing.test.mjs`, `48` cells, `23` pass / `25` fail |
| Codec / package implementation | **landed and green 2026-10-23** — `bindings/js/index.mjs`, `bindings/js/src/codec.rs`, `bindings/js/src/crossing.rs`, `bindings/js/Cargo.toml` |
| Residue owners' passes | owed outside this unit |
| `P-ADA-5` addon red (`40/41`) | parked, unrelated |

## §2 — THE ORDERED STEPS

**Step 1 — Freeze the contract.** Verify the part map and closure (`3 = 4 − 1`), the 16-class table, the message provenance, the ceilings, and the residue owners. No code is written in this step. `[T]`

**Step 2 — Amend the governed specs.** **LANDED 2026-10-23.** The dated amendments at `docs/specs/storeroom-js/crossing.md` (head of `§1`) and `docs/specs/storeroom-js/surface.md` (head of `§2.5`) re-spell the value route to the bare tree, `ValueRefusedAtBoundary`, depth `128` and nodes `1,000,000`; older clauses stand at their own bytes and are read through those amendments. The store contract's `§0.4`, `§8.1`, `§8.2` and `P-TP-8` remain as already amended. `[A2 docs/decisions.md · A148 Q7]`

**⟶ AMENDED 2026-10-23 — THE GATE-3 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): TWO TERMS OF THE PARAGRAPH ABOVE ARE CORRECTED — ONE CITATION AND ONE STATE — AND THE STEP'S SUBSTANCE IS UNMOVED.** **The paragraph above stands byte-for-byte and is read THROUGH this clause; no landing date, no path and no re-spelled figure moves.** **(a) `A148 Q7` HAS NO SUBJECT:** `docs/decisions.md` · `A148` records five questions (`Q1`–`Q5`) and two follow-ups, so the tag is read as that row's `WHAT THEY PIN` items `(2)`, `(3)` and `(4)` together with its ceiling follow-up — the four things this step's amendments re-spell (`contract.md §4`'s clause of the same date states the re-spelling in full). **(b) THE `P-TP-8` HALF WAS FALSE AT THIS PASS'S READ AND IS NOW TRUE:** `docs/specs/storeroom-native/implementation-plan.md`'s `P-TP-8` still printed `16` members, the algebra `11 + 2 + 1 + 1 + 1 = 16` and the failure list *"a set of `15` or `17`"*, against `docs/specs/storeroom-native/contract.md §8.1`'s own 2026-10-23 widening and `A148` (3)'s direction that `P-TP-8` *"is re-derived to pin `17` at rank `17` and to remove the 'a set of `15` or `17`' failure clause"*; **the store contract's `§0.4`, `§8.1` and `§8.2` DO carry their amendments, verified at their own bytes** — `§0.4`'s `CODES` clause, `§8.1`'s heading clause and its rank-`17` row, and `§8.2`'s provenance clause — and **the `P-TP-8` re-derivation is carried at that row by a dated clause of the same date as this one.** **SO THE SENTENCE ABOVE IS READ AS TRUE FROM THIS DATE, and its `§0.4`/`§8.1`/`§8.2` half was true before it.** `[A2 docs/decisions.md · `A148` (3) and its follow-ups; docs/specs/storeroom-native/contract.md §0.4 · §8.1 · §8.2; docs/specs/storeroom-native/implementation-plan.md P-TP-8 | cross-reference]`

**⟶ AMENDED 2026-10-23 (`A149`) — THE STEP'S TWO CEILING PRINTS ARE RE-DERIVED TO THE CROSSING'S OPERATIVE BOUND, AND NOTHING ELSE OF THE STEP MOVES** (`RCA-8(g)`: **the paragraph above and its proofreading clause of the same date stand byte-for-byte and are read THROUGH this clause; the landing date, both amended paths, the bare tree, `ValueRefusedAtBoundary`, and the `§0.4`/`§8.1`/`§8.2`/`P-TP-8` half are unmoved**). **THE CELL: the paragraph prints *"depth `128` and nodes `1,000,000`"*; from this date that reads *"depth `126` and nodes `0…999,999`"* — the operative admission ceiling being the store's persistent one on BOTH routes, with depth `127` and beyond refused at the package's walk before any store verb, in the class `a value over the walk ceiling` and with the status `ValueRefusedAtBoundary`** (`contract.md §4`'s clause of this date; `docs/specs/storeroom-js/crossing.md §1`'s head clause of this date). **AND THE SUPERSEDED FIGURES ARE NOT WITHDRAWN AS THE CRATE'S OWN: `bindings/js/src/crossing.rs`'s `depth > 128 || visited > 1_000_000` remains the CONVERSION's bound and is no admission bound of this crossing.** `[A2 docs/decisions.md · `A149` — the operative ceiling and the node range; docs/specs/storeroom-json-crossing/contract.md §4 — its clause of this date | numeric or census claim]`

**Step 3 — Author the red set and re-spell the moved greens cells.** **EXECUTED 2026-10-23.** The red set is `bindings/js/test/json-crossing.test.mjs`: `48` cells covering `test-cases.md` `JC-TC-01`…`JC-TC-48`; the first run is `23` pass / `25` fail (recorded at `§6`). The re-spelling landed at the green step: the `8` tagged hits scan as `4` value-tree occurrences plus `4` carrier literals (`{ k: 's', v: opId }` and `{ k: 's', v: 'extra' }`); only the `4` value-tree occurrences are changed, while the `L`/`T`/`v` carriers stay; the legacy mem-tier `-0` cell and the class-set/`128/129/130` cells moved with the contract. `[contract.md §6 rows 1, 5]`

**⟶ AMENDED 2026-10-23 (`A149`) — THE STEP'S `128/129/130` PRINT IS RE-DERIVED, AND THE CELL CENSUS IS UNMOVED** (`RCA-8(g)`: **the paragraph above stands byte-for-byte and is read THROUGH this clause; the `48` cells, the `8` tagged hits, the `4`-plus-`4` split, the `L`/`T`/`v` carriers and the legacy mem-tier `-0` cell are unmoved**). **THE CELL: *"the class-set/`128/129/130` cells moved with the contract"* reads *"the class-set/`126/127` cells"* — `126` ADMITTED and `127` REFUSED, the refusal at the walk before any store verb, in the class `a value over the walk ceiling` with the status `ValueRefusedAtBoundary`, and `128` and `130` being refused depths beside `127`** (`contract.md §6` row `5`'s clause of this date; `test-cases.md §6`'s clause of this date). **NO CELL IS ADDED AND NONE IS REMOVED: the set stays `JC-TC-01`…`JC-TC-48`, the boundary's admitted side being carried inside `JC-TC-09`'s and `JC-TC-42`'s own cells and not as a further id.** `[A2 docs/decisions.md · `A149` — the re-spelled depth cells; docs/specs/storeroom-json-crossing/test-cases.md §6 — its clause of this date | numeric or census claim]`

**Step 4 — Implement the package and codec.** **LANDED 2026-10-23.**
- `bindings/js/index.mjs`: `encodeValue` emits the bare tree; `boundaryReject`/`valueReject` select `ValueRefusedAtBoundary`; `decodeValue` returns the bare tree; the class and position clause is appended.
- `bindings/js/src/codec.rs`: `value_of` reads the bare JSON value through the `napi` `serde-json` conversion; `to_js_value` writes the bare tree; the four carrier tag sites are untouched.
- `bindings/js/src/crossing.rs`: keep the `JsValue` outside variants declared; copy-in no longer produces them on this route.
- `bindings/js/Cargo.toml`: add `serde_json = "1"` as the fourth direct entry and the `napi` `serde-json` feature; a fifth entry remains unlawful. Any lockfile the resolver writes stays uncommitted. `[A2 docs/decisions.md · A148 Q2 · Q5; A145]`

**Step 5 — Re-spell the residue in the owning units' passes.** The `ValueNotAdmitted` re-render arm, the greens/`JAS` cells, and the dependency table are edited by their named owners, not here. This unit edits only the cells its own change moves. `[contract.md §6]`

**Step 6 — Verify.** Run the JavaScript test suite, the store test suite (`cargo test --offline` with the local toolchain), the contract's acceptance cases, `git diff --check`, and the conflict-marker scan. A tagged-form assertion or an `ValueNotAdmitted` class-set assertion is a failure. `[T]`

**Step 7 — Close gate 2.** Record the test result, the closure predicate, the residue's owner states, and the `JC-C3`/`JC-C6`/`JC-C7` discharge in the gate record. No ledger count moves except by the architect's admission. `[A2 docs/specs/storeroom-native-implementation-plan.md §P.2]`

## §3 — THE DECLARED EDIT SCOPE

| # | Path | What this unit may do | Step |
| --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-json-crossing/` | author whole | 1 |
| 2 | `docs/specs/storeroom-js/crossing.md` · `surface.md` | edit by named amendment | 2 |
| 3 | `bindings/js/test/**` · `bindings/js/greens/**` | author/edit the red set and only the moved cells | 3 |
| 4 | `bindings/js/index.mjs` | edit `encodeValue`, `boundaryReject`/`valueReject`, `decodeValue` | 4 |
| 5 | `bindings/js/src/codec.rs` | edit `value_of`, `to_js_value`, value-tree tag arms | 4 |
| 6 | `bindings/js/src/crossing.rs` | edit only where the ruling removes a variant's reach | 4 |
| 7 | `bindings/js/Cargo.toml` | fourth entry and `napi` feature | 4 |
| 8 | `src/error.rs` · `docs/specs/storeroom-native/contract.md` | already amended `CODES` `16 → 17`; no further store byte | landed |
| 9 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | gate/tracker moves only | 7 |

**Not touched.** `src/**` outside `src/error.rs` (including `src/value.rs` and `src/json.rs`); the four carrier tag sites and four carrier encoders; `docs/specs/storeroom-addon-surface/**`; every tracker count; `../Provident-Electron/**` in full; any other `docs/specs/` path. `[A2 docs/decisions.md · A147 · A148]`

## §4 — VERIFICATION

| Gate | Command / check | Pass condition |
| --- | --- | --- |
| Contract closure | `{map entries} = {files present} − {contract.md}` | `3 = 4 − 1` |
| Store suite | `PATH=/tmp/opencode/toolchain:$PATH CC=/tmp/opencode/toolchain/cc cargo test --offline` | no failure |
| JS suite | the repository's JavaScript test command | all crossing and greens cases pass |
| Acceptance | `test-cases.md` | every case matches the bare tree or the exact refusal |
| Whitespace | `git diff --check` | clean |
| Conflict markers | repository-wide scan | none |
| Residue | `contract.md §6` | every row has an owner and a state |

## §5 — THE GATE-3 RED RUN — 2026-10-23

**Command.** `node --test bindings/js/test/json-crossing.test.mjs`, then `npm test` for the integrated run.
**Red-set result:** `48` cells — `23` pass · `25` fail · `0` skipped. **Integrated suite:** `706` tests — `679` pass · `26` fail · `1` skipped; the extra failure is the pre-existing parked `P-ADA-5` addon cell (`DEF-2026-10-20-F`), unchanged by this unit.

**The 25 red cells, by contract group:**

| Group | Cells | The measured reason |
| --- | --- | --- |
| `-0` normalization | `JC-TC-08`, `JC-TC-16` | the binding still returns `-0`; the contract returns `0` |
| Depth ceiling | `JC-TC-09`, `JC-TC-10`, `JC-TC-27` | the old `65/66` package bound is still operative; depth `128` is refused and `66` is not admitted |
| The sixteen classes | `JC-TC-20`…`JC-TC-35` | the status is `ValueNotAdmitted`, not `ValueRefusedAtBoundary`; the generator text and class/position clauses are the old ones |
| Message and status | `JC-TC-37`, `JC-TC-38` | PART ONE still reads `is not an admitted value, admitted values are …`; the status is rank `14`'s token |
| Node ceiling | `JC-TC-42` | the node overage is answered `ValueNotAdmitted` with no class |
| Test-tree residue | `JC-TC-44` | `8` tagged hits measured: `4` value-tree literals in `addon-adoption.test.mjs` (2), `addon-surface.test.mjs` (4), `file-tier-save-properties.test.mjs` (2) **and** `4` carrier literals; the green re-spells the `4` value-tree occurrences only |
| Dependency entry | `JC-TC-46` | the crate has `3` direct dependencies; `serde_json = "1"` and the `napi` `serde-json` feature are absent |

**⟶ AMENDED 2026-10-23 (`A149`) — THE TABLE'S `Depth ceiling` ROW IS READ THROUGH THIS CLAUSE: ITS MEASURED HALF STANDS AND ITS CONTRACT HALF IS RE-DERIVED** (`RCA-8(g)`: **the table above stands byte-for-byte and is read THROUGH this clause; its other six rows, the `25` red cells, the `23` green cells and the verdict are unmoved**). **THE ROW: *"the old `65/66` package bound is still operative; depth `128` is refused and `66` is not admitted"* records the RED TREE of 2026-10-23 and stands as that measurement — at that tree the package bound WAS the old `65`/`66` one, so the row's two halves are the red state read at its own date and not the rule this unit declares.** **WHAT THE GROUP'S CELLS PIN FROM THIS DATE: depth `126` ADMITTED and depth `127` REFUSED — at the walk, before any store verb, in the class `a value over the walk ceiling` with the status `ValueRefusedAtBoundary`** — **so the row's *"depth `128` is refused"* is read as `127` refused beside `126` admitted, and its *"`66` is not admitted"* is read as the red tree's reading alone, `65` and `66` being ADMITTED depth values under the operative `126`** (`test-cases.md §1`'s `JC-TC-09`, its `§3`'s `JC-TC-27`, its `§4`'s `JC-TC-42`, and that file's `§6` clause of this date). `[A2 docs/decisions.md · `A149` — the operative boundary; docs/specs/storeroom-json-crossing/test-cases.md §1 · §3 · §4 — the three cells, and §6 — their re-derivation | state or fail-state declaration]`

**The 23 green cells:** `JC-TC-01`–`07`, `11`–`15`, `17`–`19`, `36`, `39`–`41`, `43`, `45`, `47`, `48`. They pin already-declared admitted values, the one refusal form's emptiness, the carrier order, the store set, and the no-fifth-entry rule. **No green cell was weakened to produce a pass.**

**Verdict of the red run.** The red set is a valid instrument: every cell's expected answer is the contract's, and every failure is a declared gap between the contract and the shipped tagged crossing. **GATE 3 WAS OPEN; THE GREEN IS NOW MEASURED AT `§6`.**

## §6 — THE GATE-3 GREEN RUN — 2026-10-23

**Command: `node --test bindings/js/test/json-crossing.test.mjs`.** **`48 / 48` pass, `0` fail.** The four landings are `bindings/js/Cargo.toml` (fourth entry `serde_json = "1"`; `napi` feature `serde-json`), `bindings/js/src/codec.rs` (serde `value_of` + bare `to_js_value` + bare `undefined` sentinel), `bindings/js/src/crossing.rs` (depth `128`) and `bindings/js/index.mjs` (bare `encodeValue`/`decodeValue`, early `write` refusal, `ValueRefusedAtBoundary`).

**⟶ AMENDED 2026-10-23 (`A149`) — THE `crossing.rs` FIGURE ABOVE IS LEFT, AND IT IS NAMED FOR WHAT IT IS: THE CRATE-SIDE CONVERSION'S OWN BOUND** (`RCA-8(g)`: **the paragraph stands byte-for-byte and is read THROUGH this clause; the `48 / 48`, the four landings, the fourth dependency entry and the `napi` `serde-json` feature are unmoved**). **THE FIGURE: *"`bindings/js/src/crossing.rs` (depth `128`)"* is NOT re-derived to `126`, because it names the conversion's guard and not an admission bound — that file's `depth > 128 || visited > 1_000_000` is left standing by `A149` (4) as the CONVERSION's own.** **THE CONSEQUENCE, SO THE TWO BOUNDS ARE NOT READ AS ONE: a value the crossing's walk admits (`126` deep, `0…999,999` own nodes) is one the conversion admits, so the conversion's `128` is unreachable from this route and is no ceiling of this unit's** (`contract.md §4`'s clause of this date; `docs/specs/storeroom-js/crossing.md §1`'s head clause of this date). `[A2 docs/decisions.md · `A149` (4) — the conversion's bound left standing; A1 bindings/js/src/crossing.rs — the guard, cited by symbol | numeric or census claim]`

**Integrated suite: `npm test` = `706` tests · `704` pass · `1` fail · `1` skipped.** The only failure is the pre-existing parked `P-ADA-5` addon cell (`ada_pada5_s_commit_open_every_bracketing_verb_moves_the_count_and_every_other_does_not`), unrelated to this unit. **`npm run typecheck` exit `0`; `npm run build` exit `0`** (with `CARGO_HOME="$PWD/.cargo-home" PATH=/tmp/opencode/toolchain:$PATH CC=/tmp/opencode/toolchain/cc`; the build prints the two pre-existing `facade.rs` unused-variable warnings).

**Count correction, measured at the green run:** the red run's `8` tagged hits are `4` value-tree occurrences and `4` carriers, not `8` value-tree occurrences. `JC-TC-44` now whitelists the two carrier shapes and asserts zero value-tree tags. **Node ceiling at the package boundary is root-inclusive** (`999,999` members / `1,000,000` nodes admitted; `1,000,000` members / `1,000,001` nodes refused) to match the crate conversion.

**⟶ AMENDED 2026-10-23 (`A149`) — THIS PARAGRAPH'S NODE SENTENCE IS RE-DERIVED IN ITS DECLARATION AND ITS PURPOSE, AND ITS COUNTED PAIRS STAND** (`RCA-8(g)`: **the paragraph stands byte-for-byte and is read THROUGH this clause; its `8`-tagged-hits correction, its `4`-plus-`4` split and `JC-TC-44`'s zero-tag assertion are unmoved**). **THE CELL: *"Node ceiling at the package boundary is root-inclusive (`999,999` members / `1,000,000` nodes admitted; `1,000,000` members / `1,000,001` nodes refused) to match the crate conversion"* — THE PAIRS STAND and are read as the walk's COUNTED numbers, the root being counted as its first node; WHAT IS RE-DERIVED IS THE DECLARATION AND THE PURPOSE: the crossing's declared ADMITTED node range is `0…999,999`, a value of `1,000,000` own nodes is REFUSED in the class `a value over the walk ceiling` with the status `ValueRefusedAtBoundary`, and the walk's ceiling is set to the STORE'S PERSISTENT limit and no longer *"to match the crate conversion"* — the crate's `1,000,000` remaining the CONVERSION's own** (`contract.md §4`'s clause of this date; `parameter-semantics.md §1` rows `7`–`8`; `test-cases.md §4`'s `JC-TC-42`, re-derived at that file's `§6` clause of this date). `[A2 docs/decisions.md · `A149` (3) — the admitted node range; docs/specs/storeroom-json-crossing/contract.md §4 — its clause of this date | numeric or census claim]`

**Verdict of the green run.** **GATE 3 GREEN: `48 / 48`.** The only integrated red is the parked, unrelated `P-ADA-5`. Gates `4`–`10` are owed.

## §7 — THE GATE-4 ADVERSARIAL / MALFORMED-DATA RUN — 2026-10-23

**File: `bindings/js/test/json-crossing-gate4-adversarial.test.mjs`; command: `node --test`.** **`36 / 36` pass** over three families: no user code runs on the refusal path; malformed value shapes are refused whole; malformed carrier/address data is bounded before the store. **The red set at `bindings/js/test/json-crossing.test.mjs` remains `48 / 48`; the integrated suite is `742` tests · `740` pass · `1` fail · `1` skipped**, the only red being the parked `P-ADA-5`.

**TWO GUARDRAIL FINDINGS WERE MEASURED AND CLOSED AT THE RUN, AND BOTH ARE `[BLOCKING]`:**

| # | Finding, measured by | What was wrong | The fix |
| --- | --- | --- | --- |
| `G4-1` | `ADV-03` / `ADV-05` / `ADV-06` | the VALUE-target renderer (`valueTargetSpelling`, `bindings/js/index.mjs`) lacked the `Proxy` guard its carrier sibling `targetSpelling` carries, so a refused `Proxy` reached `String(value)` and its `Symbol.toPrimitive` GET TRAP RAN — the exact trap the walk's `util.types.isProxy` refusal exists to avoid | the `types.isProxy` class read is taken before `String`, as at the carrier arm; no trap runs |
| `G4-2` | `ADV-12` | a stored member genuinely named `__proto__` did not cross back as an own member: `napi_set_property` on copy-out and `out[name] = …` in `decodeValue` both run `[[Set]]`, whose `__proto__` step makes the member the returned object's PROTOTYPE (and can shadow its methods) | copy-out defines own data properties (`napi_define_properties` via `Property` in `bindings/js/src/codec.rs`; `Object.fromEntries` in `decodeValue`), so the bare tree crosses member for member |

**Verdict of the gate-4 run.** **`36 / 36`, with the two findings closed and no cell weakened.** Gates `5`–`10` are owed.

**⟶ AMENDED 2026-10-23 (`A149`) — THE FILE'S COUNTED FIGURE IS CONFIRMED AND STANDS, AND NO CELL OF IT IS ADDED, REMOVED OR RENUMBERED** (`RCA-8(g)`: **every word above stands byte-for-byte and is read THROUGH this clause; the three families, the two findings `G4-1`/`G4-2`, the `48 / 48` red-set figure and the `742` / `740` / `1` / `1` integrated reading are unmoved**). **THE FIGURE: `36 / 36` STANDS — the ruling re-derives the EXPECTED BOUNDARY inside cells that already exist and neither adds nor removes one, so the census is `ADV-01`…`ADV-36`, `36` cells, and the pass figure this section prints is not stale.** **THE CELL THAT MOVES, NAMED AT ITS TITLE: the file's depth cell pinned *"depth `128` is admitted and depth `129` is refused"* at the run's tree, and from this date the SAME ONE CELL pins depth `126` ADMITTED and depth `127` REFUSED — the admitted arm reading `125` and `126`, the refused arm `127` — at the walk, before any store verb, in the class `a value over the walk ceiling` with the status `ValueRefusedAtBoundary`, and at the `127`-segment member path below the root `value` position.** **AND NO OTHER FIGURE OF THIS SECTION IS DEPTH-DERIVED: the node statements, the carrier and address families, the refusal-path family and both findings carry no ceiling of their own.** `[A2 docs/decisions.md · `A149` (1)–(2) — the operative ceiling, the refusing site, the class and the position; A1 bindings/js/test/json-crossing-gate4-adversarial.test.mjs — `ADV-28` as re-derived, cited by id | numeric or census claim]`

## §8 — RISKS AND CONTROLS

- **A tagged-form assertion survives.** Control: step 3's scan and `JC-TC-44`'s zero-tag assertion; a tagged assertion is a failure.
- **The 15 status cells move without the depth re-derivation.** Control: step 3 names both; `JC-TC-10` and `JC-TC-27` pin the depth boundary.
- **The fourth dependency is treated as a fifth.** Control: `Cargo.toml` review and `JC-TC-46`.
- **The package mints a second message.** Control: `parameter-semantics.md §3` and `JC-TC-37`.
- **The outside variants are deleted instead of left unproduced.** Control: `contract.md §5` and `JC-TC-45`.

**END OF PLAN — GATE 3 GREEN 2026-10-23; GATE 4 ADVERSARIAL RUN 2026-10-23 (36/36, two findings closed); GATES 5–10 OWED.**

**⟶ RECONCILED 2026-10-24 — THE DOCUMENTATION REVIEW (`role_documentation_reviewer`; `RCA-8(g)`): THIS PART'S MARKER DATES AND ITS OWED-GATE STATE ARE RECONCILED AGAINST THE RUNS, AND NO STEP, SCOPE, FIGURE OR OWNER MOVES.** **Every clause and table of this part stands byte-for-byte and is read THROUGH this one; THIS clause re-orders no step, widens no scope and re-decides no gate's result.**

**(a) THE DATE — THE MARKERS STAND AND THE FILINGS ARE `2026-10-24`.** The `A149` clauses above (`§2` step `2`'s two ceiling clauses, `§6`, `§7`) carry `2026-10-23` and record landings of **`2026-10-24`**, one day after the marker: the ceiling pass's source edit is `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` at mtime **`2026-10-24 19:09:06`**, and the native addon it drove was built `19:09:49` and restaged `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`); the gate-3 proofreading clause at `§2` step `2` measured **`17:23` on `2026-10-24`** (`… §10`). **No marker is rewritten — they are cited by `A149`, by the `N8` delta and by the review record — and this item is their resolution of record** (`docs/defects.md` · `DEF-2026-10-24-A`). **The gate-`3` red/green runs, the gate-`4` run and the store-side landing the plan dates `2026-10-23` genuinely happened that day and their dates are unmoved.**

**(b) THE OWED-GATE STATE — GATES `5`, `6` AND `7` HAVE RUN, SO `§7`'s CLOSING VERDICT READS `8`–`10`.** `§6`'s *"Gates `4`–`10` are owed"* is read as gates `5`–`10` at `§7`'s record of the same day, and `§7`'s verdict below (and the closing line above) now read **gates `8`–`10` owed**, each of the three intervening gates having run at its own home: gate `5` blind greens **`67`/`67`** (`docs/specs/storeroom-json-crossing-greens.md` `§2` · `§5`); gate `6` the live battery, whose first run's one FINDING at `LIVE-B54` was ruled by `A149` and whose red-first re-derivation plus re-drive **cleared** it — **`70` cells · `68` PASS · `0` FAIL · `0` FINDING · `2` OBSERVED per reach, exit `0`, on both `LIVE/CHECKOUT` and `LIVE/INSTALLED`** (`docs/specs/storeroom-json-crossing-live-report.md §11`, `§11.5`); gate `7` the proofreading (**`18` found, `10` fixed as dated clauses, `8` reported and since repaired** in `bindings/js/index.mjs`, `src/error.rs` and `tests/support/mod.rs`). **`§1`'s status table keeps its `2026-10-23` rows as filed — it is a gate-`3` table and is read with this clause — and the plan's declared scope, its four landings, its ordered steps and `§8`'s controls are unmoved.**

**(c) THE FIGURES THIS PART PRINTS ARE MEASURED AND HOLD.** The green run's `48`/`48` (`bindings/js/test/json-crossing.test.mjs`, `48` `test()` cells ✓), the gate-`4` `36`/`36` (`bindings/js/test/json-crossing-gate4-adversarial.test.mjs`, `36` `test()` cells ✓) and `ADV-28`'s re-derived text — *"depth `126` is admitted and depth `127` is refused at the walk"* — each resolve at their own bytes; **the gate-`4` integrated figure `742` tests · `740` pass · `1` fail · `1` skipped (its only red the parked `P-ADA-5`, `DEF-2026-10-20-F`) is quoted as the contract's clause records it and was NOT re-run by this review, which has no runner** — and **the superseded `128` reading of `§7`'s `ADV-28` sentence is the `A149` clause above, so no figure of this plan states the `128` law as operative.** `[A1 bindings/js/test/json-crossing.test.mjs and bindings/js/test/json-crossing-gate4-adversarial.test.mjs, cell counts taken at this pass's read, and bindings/js/index.mjs:1042 | numeric or census claim; A2 docs/specs/storeroom-json-crossing-live-report.md §10 · §11 | the landing dates and the re-drive; A2 docs/specs/storeroom-json-crossing-greens.md §5 | the blind set; docs/defects.md · `DEF-2026-10-24-A` | cross-reference]`
