
# Part — the JS integration's proposal-stage plan (`U-STOREROOM-JS`): the phase table, the declared edit scope, the acceptance criterion, the stop conditions and the pointer index

**Status.** **A PROPOSAL-STAGE PLAN, filed at the gate-1 record's own determination (§C: a NEW UNIT with `docs/specs/storeroom-js/`) and owed to be reconciled — never overwritten — into this unit's `implementation-plan` part at gate 2 in the same pass as that directory's index region and part map.** **Every step below is a PLAN STEP and never a contract claim.** **No unit row is admitted, no ledger count moves (`docs/next-steps.md` reads `1 DONE / 2 open` UNITS = `3`), no red set is delegated, no implementer is dispatched and no gate is entered by authoring this plan.**

---

**⟶ RECONCILED 2026-10-11 — GATE 2, THE SPEC GATE (`role_spec_writer`), ON `A1` (this unit's own go-ahead) READ WITH THE GATE-1 RECORD'S CLOSURE (`R: §5`), AND IT IS AN ANNOTATE-BESIDE INSERTION: EVERY BYTE OF THE PLAN ABOVE AND BELOW THIS CLAUSE STANDS EXACTLY AS FILED** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed status paragraph above is re-emitted by reference and is read THROUGH this clause; no byte of it is deleted, reworded or re-ordered, so `git diff` recovers the pre-pass text as a pure insertion**; `docs/specs/spec-scope-and-structure/contract.md` §C.6's dated amendment note — *the post-landing content is the same plan text RECONCILED to the contract, the reconciliation dated*; **A3**). **THE RECONCILIATION, STATED SO NOTHING BELOW IS READ AS SUPERSEDED:**

1. **THE CONTRACT THIS PLAN IS NOW RECONCILED TO EXISTS.** `docs/specs/storeroom-js/contract.md` plus its declared parts was authored at this gate in the same pass as this reconciliation, and **this directory's closure predicate reads `6 = 6`** — the map's `6` part entries against the `6` files present beside `contract.md` (`crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `implementation-plan.md`). **This clause adds one map entry to this plan's own `§6` pointer index — the pointer to the contract — and it is the only map row this clause adds.**
2. **THE PHASES DID NOT MOVE; TWO OF THEIR `BLOCKED-BY` CELLS CLOSED.** `docs/specs/storeroom-js/implementation-plan.md §3`'s table still stands as filed, and its two open cells are now answered by rulings the plan was written before: **`Q2`/`Q3`'s `U16` block is CLOSED by `A71`** (*"Publish with prebuilds"* — the published artefact with prebuilds **IS** in scope, so the packaging shape no longer blocks the red set; it **is** the shape), **and `U32`'s block is CLOSED by `A72`** (the STEP-0 route landed a one-row dossier whose row is `defined`, so nothing stops `Q1`). **`U1` never blocked and still does not** (`A70`). **`Q0` and `Q1` were discharged by the gate-1 close-out and by this pass respectively; `Q4`–`Q8` inherit their predecessors; `Q9` still waits on the architect's admission of the `DONE` row.**
3. **`§4`'S ACCEPTANCE CRITERION IS NOW READ AGAINST `acceptance.md`, ROW BY ROW, AND ITS ITEM 4 NARROWED.** The plan's item 4 required *"one row per `StoreValue` variant (`5` admitted + `8` outside), per `Segment` variant (`2` + `8`) and the per `*Arg` carrier"*. **The operative reading, at `docs/specs/storeroom-js/crossing.md` §1–§2: `StoreValue`'s `5 + 8 = 13` rows stand; the `*Arg` carriers' rows stand at `8` carriers; and the `Segment` half is carried INSIDE the address carrier's own row set (`AddressArg` · `Segment` · its `10` variants) rather than as a separate table** — the row count moves, the requirement does not. **AND `A63` REMOVES ONE OF THE PLAN'S OWN ASSUMPTIONS: `findAddress` is NOT EXPOSED, so `docs/specs/storeroom-js/crossing.md` carries no `NodeRef` crossing row and `docs/specs/storeroom-js/surface.md` §3 declares the non-exposure with its consequence.**
4. **`§4`'S `IT IS NOT DONE IF` LIST GAINS ONE ROW AND LOSES NONE.** The added row: **the JSON-text carrier route** — *"a JSON-text carrier (a `stringify`/`parse` crossing) is used or declared anywhere"* — because `A65`'s deep-copy discipline plus the store's closed surface (`R: §10 · A65`, `docs/specs/storeroom-native/contract.md` §7.2 item 7 (c): *"no verb returns JSON text"*) leaves the structural walk as the only lawful route. **The as-filed list stands byte-for-byte and this row is added beside it.**
5. **WHAT THIS CLAUSE DOES NOT DO.** It **rewrites no phase, no owner, no output, no stop condition and no acceptance item**; it **moves no ledger count** (`docs/next-steps.md` still reads `1 DONE / 2 open` UNITS = `3`); it **admits no unit row, authorises no red set and dispatches no implementer**; and it **authors no pinnable claim of the contract** — every clause it states is carried by `docs/specs/storeroom-js/contract.md` and its parts, and a step here remains **a plan step, never a contract claim** (§C.6's own rule). `[A1 | ordering claim]`

**THE POINTER THIS RECONCILIATION ADDS TO `§6`'s INDEX, PRINTED HERE BECAUSE `§6` STANDS AS FILED:** | this unit's contract directory, authored this pass | `docs/specs/storeroom-js/contract.md` + `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `implementation-plan.md` | — **and it is the row `§6`'s table would carry had it been drafted after the contract, named here rather than written into that table's bytes.** `[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 | cross-reference]`

## §1. THE DECLARED EDIT SCOPE, BY PATH, WITH THE PHASE THAT MAY WRITE EACH

| Path | The phase that may write it |
| --- | --- |
| `docs/specs/storeroom-js/contract.md` **+ its declared parts** | `Q1` (the spec gate; the plan is reconciled into its `implementation-plan` part in the same pass) |
| `docs/specs/storeroom-js-adoption-dossier.md` | `Q0` (step 4's STEP-0 pass) |
| `docs/specs/storeroom-js-proposal-review.md` (the gate-1 record) | `Q0` |
| `bindings/js/**` — the sibling crate's own `Cargo.toml`, `src/**` and its own tests | `Q2` (its tests), `Q3` (its manifest and sources) |
| the JS package inside `bindings/js/**` — `package.json`, its entry points, its generated `.d.ts`, its JS sources and its JS tests | `Q1` (the declared shape), `Q2` (its tests), `Q3` (its code) |
| the build configuration for the sibling and the package (`build.rs`, any `scripts/**`) | `Q1`, `Q3` |
| the four trackers `docs/{next-steps,decisions,pending,defects}.md` | **by the GATES, never by the build** — `Q0`, `Q4`, `Q7`, `Q9` |
| `archive/**` | `Q2`, `Q4`, `Q5`, `Q6`, `Q7`, `Q9` — each gate's own report lands under it in the pass that authors it; `archive/` is gitignored and no tracked byte moves |

**THE NON-TOUCHED SET — a step out of it is a failure at any phase, by any role.**

| # | Not touched, at any phase, by any role |
| --- | --- |
| **1** | **`../Provident-Electron/**` — IN FULL, EVERY BYTE.** The corpus, its landed store, its tests, its trackers, its gate records, its `archive/**`, its `AGENTS.md`, its `package.json` and its `src/**`. A finding against it is a `HO-` row in `docs/defects.md`, never a patch (`A9`; `docs/decisions.md`'s READ-ONLY row). |
| **2** | **`../Agent Harness/**`** — the process-rule specs are cited, never edited. |
| **3** | **the store unit's crate and red set** — the root `Cargo.toml`, `src/**`, `tests/**` (`A68`: the store's manifest, sources, tests and offline green are NOT touched). |
| **4** | **the store unit's contract directory `docs/specs/storeroom-native/**`** — read and cited; **no byte written, no part added, no `§`-number moved, no second register authored there**. |
| **5** | **the store unit's `DONE` row and the store's green figures** — not re-opened, not re-labelled, not re-measured as this unit's green. |
| **6** | **every tracker's counts** — no ledger count moves except by the architect's admission. |
| **7** | **`docs/specs/storeroom-js-proposal.md`** — the directive and the rulings stand byte-for-byte. |
| **8** | **the gate-1 step reports under `archive/gate1/**`** — landed, closed records; never rewritten and never re-dispositioned. |
| **9** | **`README.md` · `LICENSE` · `.gitignore`** — unchanged. |
| **10** | **every path under `docs/specs/` outside the declared set** — a new spec path is a spec-gate event, not a plan step. |

## §2. THE PHASE TABLE — phase · what it does · owner · input · output · the rule that authorizes it

| Phase | What it does | Owner | Its input | Its output | The rule that authorizes it |
| --- | --- | --- | --- | --- | --- |
| **`Q0` — the gate-1 close-out** | the STEP-0 determination, the dossier or its written route, the gate-1 record with its `## Semantics (STEP 0)` block, the union carried onto the record, the `decomposition` row dispositioned, the verdict, the tracker reconciliation | `role_change_analysis` (step 4) + the supervisor's landing pass | the proposal (`§1`–`§13`); the three step reports (`archive/gate1/storeroom-js-review/`); the rulings `A62`–`A69`; this plan | `docs/specs/storeroom-js-proposal-review.md`; `docs/specs/storeroom-js-adoption-dossier.md` (if owed) | the four-step chain (`AR-1`·`AR-2`·`AR-13`·`AR-19`) |
| **`Q1` — gate 2, the contract** | the pattern-C directory authored whole: the index region, the part map, the recorded omissions, the closure predicate, the typed `§5.x` register, the plan reconciled **dated, never overwritten**, and the package's declared shape | `role_spec_writer` | this gate-1 record + `A62`–`A69`; the proposal's `§9`–`§13`; the store's `§0.4`, `§3.6`, `§4.4`, `§5.x`, `§7.1`, `§7.2`, `§8.1`–`§8.3` | `docs/specs/storeroom-js/contract.md` + its parts; this plan reconciled as their `implementation-plan` part | the ACTIVE unit-id/directory rule; the `≤ 8` register rule for a code-bearing unit; the closure predicate |
| **`Q2` — gate 3, the red set** | the red set authored **from this contract alone** and **RUN**, its failing set **REPORTED BEFORE** any implementation | `role_test_writer` | the new contract directory, whole; the register's rows, each with its strategy id | the sibling crate's Rust tests + the package's JS tests; the reported failing set; the register's executed layer; the gate's record under `archive/` | **RED BEFORE GREEN** |
| **`Q3` — gate 3, the green** | the least code that turns exactly that red set green, inside `§1`'s declared scope | `role_implementer` | the reported red set + the declared scope | the sibling crate (`Cargo.toml`, `src/**`, the `#[napi]` facade and the conversion core) and the package's files | least code to green, after the red set is reported |
| **`Q4` — gate 4, the adversarial pass** | the read-only adversarial pass and the register's read-only audit; every finding dispositioned with ONE recorded disposition | `role_adversarial_reviewer` | the green tree + the executed register | the unit's layer-honesty regions filled; catalogue rows; the gate's record under `archive/` | the adversarial pass is mandatory per completed unit; **a package defect is catalogued, never patched** |
| **`Q5` — gate 5, the blind greens** | the greens set authored **AND run** from the delivered docs alone, by an agent who did **not** implement, against the built sibling crate and package from outside the unit directory | `role_blind_test_writer` | the delivered docs + the green tree | this unit's greens record + per-scenario pass/fail | a greens set authored by the implementer without a blind re-run is a review finding |
| **`Q6` — gate 6, the live determination** | a **WRITTEN** determination of whether this unit triggers the live battery, with its evidence and its **falsifier** | `role_live_scenario_runner` | the contract's declared change set + the package's real boundary | the recorded determination or the run's structured report | **no `APP`-green may be reported from a node-green**; this unit's `APP` layer is **NONE** until a consumer assembles it |
| **`Q7` — gates 7/8, proofreader + per-unit documentation review** | the proofreader audits the docs against the code; the documentation reviewer reconciles the contract, the greens record and the active trackers against the build | `role_proofreader` then `role_documentation_reviewer` | the green tree + the greens set + the trackers | the proofread's fixed cells · the review record | the documentation review is mandatory after the greens and runs **per unit** |
| **`Q8` — gate 9, the validation trio and its additive fourth leg** | the project's three checks plus the additive leg, **with the LAYER each covers stated**, and the crate's own `cargo test` leg and the package's `node --test` leg as declared additional legs | the trio's own passes | the frozen green tree | the commands' measured exit codes and figures, each with its layer | **a node-suite green is ENVELOPE-green, never `APP`-green** |
| **`Q9` — the `DONE` row, the ledger move, the archival loop** | the `DONE` row with its full content; the tracker/ledger move; the decisions/queue updates; the archival loop | the supervisor's landing pass, on the architect's admission | every gate's landed artifact | the `DONE` row · the moved ledger (`1 DONE / 2 open` → `2 DONE / 1 open` UNITS = `3`) · the reconciled trackers | **the architect admits ROWS, not a pass**; and the `DONE` row MUST cite this unit's gate-4 adversarial pass and its findings |

## §3. THE `BLOCKED-BY` CELLS — every phase the open rows block, marked

| Phase | What blocks it now | What does NOT block it |
| --- | --- | --- |
| **`Q0`** | **nothing** — step 4 owns the STEP-0 determination and the verdict, and `A66` superseded the store's integration-question prohibition **for this unit** | — |
| **`Q1`** | **nothing**, once the go-ahead lands; the register's cap is the new unit's own (`1 ≤ 8` is available on the current enumeration) | the `28` `DERIVABLE` rows and the one `MOOT`-closed set do **not** block: they are this contract's priced defaults |
| **`Q2`/`Q3`** | **`U16` if the architect rules that a published artefact is in scope** — the packaging shape then precedes the red set's JS-side rows; and **`U32`** if step 4 leaves an open entry (that would stop the whole gate, `Q1` included) | **`U1` does not block**: the realm set is entailed by the carrier, and the unclaimed realms are `HO-` rows |
| **`Q4`–`Q8`** | inherit their predecessor's | — |
| **`Q9`** | **the architect's admission of the `DONE` row** — the row lands only by his act | — |

**AND ONE BOUNDARY CARRIED SO NO PHASE READS IT AS A TASK: the store unit's `DONE` row and its green are NOT a phase of this plan, and no phase re-measures them as this unit's green.** `P-1` is **LIFTED**, not deleted, and its `28` rows are **this unit's own material**; **`P-3` is lifted and its four subjects were specified by the store's listener amendment** — nothing here re-opens either.

## §4. THE ACCEPTANCE CRITERION — `DONE`, and what makes it `NOT DONE`

**THE PRIMARY ACCEPTANCE LAYER, NAMED FIRST: the write→read round trip ACROSS THE BOUNDARY, in JS terms**, on the declared equality relation (§A.2), with the two declared normalizations and nothing else excluded.

**`DONE` REQUIRES ALL OF THE FOLLOWING.**

| # | The item | What makes it checkable |
| --- | --- | --- |
| 1 | the architect's go-ahead is recorded, and the gate-1 record exists with its required `## Semantics (STEP 0)` block and the union and the dispositioned row | `docs/specs/storeroom-js-proposal-review.md` |
| 2 | the contract is a **pattern-C directory** whose closure predicate holds, with **one** `derivation:` clause and its `ordering anchor` | the directory's index region |
| 3 | the typed register exists, uses the `P-*` vocabulary, is `≤ 8` rows, and carries a failable row per named interaction | the contract's `§5.x` |
| 4 | the value-crossing table is complete: one row per `StoreValue` variant (`5` admitted + `8` outside), per `Segment` variant (`2` + `8`) and per `*Arg` carrier, with the refusal preserved | the contract's crossing region |
| 5 | the failure channel names **exactly one** JS form, and the record's two members stay closed | the contract's failure region |
| 6 | the handle's domain, the construction's `listeners[]` and the registry's four rules are declared and drivable | the contract's handle/registry region |
| 7 | the realm claim is closed, with one declared answer per unclaimed realm, and the `HO-` rows are minted | the contract + `docs/defects.md` |
| 8 | the red set was authored from the contract alone, RUN, and its failing set REPORTED before implementation; the register's layer EXECUTED, every row printing its strategy id and verdict, `un-run` a failure | the gate-3 record |
| 9 | the green is the least code that turns exactly that red set green, inside the declared scope | `§1` |
| 10 | the adversarial pass ran read-only, every finding carries ONE recorded disposition, package findings catalogued and never patched | the gate-4 record |
| 11 | the greens set was authored AND run by an agent who did not implement | the greens record |
| 12 | the live determination is WRITTEN with its evidence and its falsifier | the gate-6 record |
| 13 | the proofread and the per-unit documentation review ran, and the contract, the greens record and the trackers were reconciled to the build in that same pass | the two records |
| 14 | the trio is green, the declared legs are green, **and every verification's LAYER is stated, with no `APP`-green reported from a node-green** | the trio's record |
| 15 | a commit exists at every gate boundary that changed files | the repository |
| 16 | the `DONE` row carries every field the plan lists, and the ledger move was taken by the architect | `docs/next-steps.md` |

**`IT IS NOT DONE IF`:** a store byte moved — the root `Cargo.toml`, `src/**` or `tests/**`; a byte of `docs/specs/storeroom-native/**` moved; a byte under `../Provident-Electron/**` was written or read as authority; a second `derivation:` clause was written; a register row was authored beyond the unit's own `≤ 8` cap, or a second register opened in either directory; the red set was authored or run **after** the implementation, or an existing test file was rewritten or an assertion weakened; a red set was authored against an unruled carrier, realm or boundary; a figure moved without a dated re-measure or a layer; an `APP`-green was claimed from a node-green; a park was read as a closure; a citation points at a file, a row or an id that does not resolve; a finding was left a bare `OWED`; a unit row was admitted or a ledger count moved by a pass; or the plan's own bytes were overwritten instead of reconciled.

## §5. THE STOP CONDITIONS

**A stop is a RETURN TO THE ARCHITECT in the concrete form the process requires** — what is blocked · the evidence · two or three options with a recommendation · what each blocks — **never a silent widening and never a second question about a ruling already recorded.**

| # | The stop |
| --- | --- |
| **A** | the sibling crate is made a workspace member, or the store's `Cargo.toml`/`src/**`/`tests/**` is reached for the binding's dependencies (`A68`) |
| **B** | the store's declared surface is extended — a text entry point, a `dispose()` verb, an `exists()` verb, a second register — to make the boundary easier |
| **C** | a value or a handle is passed by reference in either direction, or a borrow outlives one call (`A65`) |
| **D** | a `HO-` duty is proposed as a patch, or a consumer's wiring is proposed as a step of this unit (`A2`, `A9`) |
| **E** | a red set is authored against an unruled builder, realm or boundary; or the addon is made a prerequisite of the Rust core's own tests |
| **F** | an `APP`-green is claimed from a node-suite green, or the store's `377/377` is re-labelled as this unit's green |
| **G** | a step takes its input from a later phase of this table |

## §6. THE POINTER INDEX

| The artifact | Its path |
| --- | --- |
| the gate-1 record this plan derives from | `docs/specs/storeroom-js-proposal-review.md` |
| the filing, with the rulings `A62`–`A69` | `docs/specs/storeroom-js-proposal.md` |
| the three step reports | `archive/gate1/storeroom-js-review/{1-validity,2-critique,3-architecture}.md` |
| the STEP-0 dossier (if owed) | `docs/specs/storeroom-js-adoption-dossier.md` |
| the store's contract directory (cited, never amended) | `docs/specs/storeroom-native/contract.md` + its five parts |
| the store's crate and red set (not touched) | `Cargo.toml` · `src/**` · `tests/**` |
| the parks and the standing conditions | `docs/pending.md` (`P-1` LIFTED, not deleted) |
| the decisions and the trackers | `docs/decisions.md` · `docs/next-steps.md` (`N3`) · `docs/defects.md` |
| this unit's records, as they land | `archive/gate{3,4,6}/…` · `archive/reviews/…` |
