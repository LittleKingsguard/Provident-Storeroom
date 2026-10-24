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

**Step 3 — Author the red set and re-spell the moved greens cells.** **EXECUTED 2026-10-23.** The red set is `bindings/js/test/json-crossing.test.mjs`: `48` cells covering `test-cases.md` `JC-TC-01`…`JC-TC-48`; the first run is `23` pass / `25` fail (recorded at `§6`). The re-spelling landed at the green step: the `8` tagged hits scan as `4` value-tree occurrences plus `4` carrier literals (`{ k: 's', v: opId }` and `{ k: 's', v: 'extra' }`); only the `4` value-tree occurrences are changed, while the `L`/`T`/`v` carriers stay; the legacy mem-tier `-0` cell and the class-set/`128/129/130` cells moved with the contract. `[contract.md §6 rows 1, 5]`

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

**The 23 green cells:** `JC-TC-01`–`07`, `11`–`15`, `17`–`19`, `36`, `39`–`41`, `43`, `45`, `47`, `48`. They pin already-declared admitted values, the one refusal form's emptiness, the carrier order, the store set, and the no-fifth-entry rule. **No green cell was weakened to produce a pass.**

**Verdict of the red run.** The red set is a valid instrument: every cell's expected answer is the contract's, and every failure is a declared gap between the contract and the shipped tagged crossing. **GATE 3 WAS OPEN; THE GREEN IS NOW MEASURED AT `§6`.**

## §6 — THE GATE-3 GREEN RUN — 2026-10-23

**Command: `node --test bindings/js/test/json-crossing.test.mjs`.** **`48 / 48` pass, `0` fail.** The four landings are `bindings/js/Cargo.toml` (fourth entry `serde_json = "1"`; `napi` feature `serde-json`), `bindings/js/src/codec.rs` (serde `value_of` + bare `to_js_value` + bare `undefined` sentinel), `bindings/js/src/crossing.rs` (depth `128`) and `bindings/js/index.mjs` (bare `encodeValue`/`decodeValue`, early `write` refusal, `ValueRefusedAtBoundary`).

**Integrated suite: `npm test` = `706` tests · `704` pass · `1` fail · `1` skipped.** The only failure is the pre-existing parked `P-ADA-5` addon cell (`ada_pada5_s_commit_open_every_bracketing_verb_moves_the_count_and_every_other_does_not`), unrelated to this unit. **`npm run typecheck` exit `0`; `npm run build` exit `0`** (with `CARGO_HOME="$PWD/.cargo-home" PATH=/tmp/opencode/toolchain:$PATH CC=/tmp/opencode/toolchain/cc`; the build prints the two pre-existing `facade.rs` unused-variable warnings).

**Count correction, measured at the green run:** the red run's `8` tagged hits are `4` value-tree occurrences and `4` carriers, not `8` value-tree occurrences. `JC-TC-44` now whitelists the two carrier shapes and asserts zero value-tree tags. **Node ceiling at the package boundary is root-inclusive** (`999,999` members / `1,000,000` nodes admitted; `1,000,000` members / `1,000,001` nodes refused) to match the crate conversion.

**Verdict of the green run.** **GATE 3 GREEN: `48 / 48`.** The only integrated red is the parked, unrelated `P-ADA-5`. Gates `4`–`10` are owed.

## §7 — THE GATE-4 ADVERSARIAL / MALFORMED-DATA RUN — 2026-10-23

**File: `bindings/js/test/json-crossing-gate4-adversarial.test.mjs`; command: `node --test`.** **`36 / 36` pass** over three families: no user code runs on the refusal path; malformed value shapes are refused whole; malformed carrier/address data is bounded before the store. **The red set at `bindings/js/test/json-crossing.test.mjs` remains `48 / 48`; the integrated suite is `742` tests · `740` pass · `1` fail · `1` skipped**, the only red being the parked `P-ADA-5`.

**TWO GUARDRAIL FINDINGS WERE MEASURED AND CLOSED AT THE RUN, AND BOTH ARE `[BLOCKING]`:**

| # | Finding, measured by | What was wrong | The fix |
| --- | --- | --- | --- |
| `G4-1` | `ADV-03` / `ADV-05` / `ADV-06` | the VALUE-target renderer (`valueTargetSpelling`, `bindings/js/index.mjs`) lacked the `Proxy` guard its carrier sibling `targetSpelling` carries, so a refused `Proxy` reached `String(value)` and its `Symbol.toPrimitive` GET TRAP RAN — the exact trap the walk's `util.types.isProxy` refusal exists to avoid | the `types.isProxy` class read is taken before `String`, as at the carrier arm; no trap runs |
| `G4-2` | `ADV-12` | a stored member genuinely named `__proto__` did not cross back as an own member: `napi_set_property` on copy-out and `out[name] = …` in `decodeValue` both run `[[Set]]`, whose `__proto__` step makes the member the returned object's PROTOTYPE (and can shadow its methods) | copy-out defines own data properties (`napi_define_properties` via `Property` in `bindings/js/src/codec.rs`; `Object.fromEntries` in `decodeValue`), so the bare tree crosses member for member |

**Verdict of the gate-4 run.** **`36 / 36`, with the two findings closed and no cell weakened.** Gates `5`–`10` are owed.

## §8 — RISKS AND CONTROLS

- **A tagged-form assertion survives.** Control: step 3's scan and `JC-TC-44`'s zero-tag assertion; a tagged assertion is a failure.
- **The 15 status cells move without the depth re-derivation.** Control: step 3 names both; `JC-TC-10` and `JC-TC-27` pin the depth boundary.
- **The fourth dependency is treated as a fifth.** Control: `Cargo.toml` review and `JC-TC-46`.
- **The package mints a second message.** Control: `parameter-semantics.md §3` and `JC-TC-37`.
- **The outside variants are deleted instead of left unproduced.** Control: `contract.md §5` and `JC-TC-45`.

**END OF PLAN — GATE 3 GREEN 2026-10-23; GATE 4 ADVERSARIAL RUN 2026-10-23 (36/36, two findings closed); GATES 5–10 OWED.**
