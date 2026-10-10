# Part — the published package's plan (`U-STOREROOM-PUBLISH`): the phase table, the declared edit scope, the acceptance criterion, the stop conditions, the release acts and the pointer index

**Status.** **A PROPOSAL-STAGE PLAN, filed at this unit's gate 1 (step 3's return) and owed to be reconciled — never overwritten — into this unit's `implementation-plan` part at gate 2 in the same pass as that directory's index region and part map.** **Every step below is a PLAN STEP and never a contract claim.** **No unit row is admitted by it, no ledger count is moved by it, no red set is delegated and no implementer is dispatched.** **Nothing was run by the pass that authored it: no `npm`, `cargo`, `node`, pack, install or publish.**

---

## §1. THE DECLARED EDIT SCOPE, BY PATH, WITH THE PHASE THAT MAY WRITE EACH

| Path | The phase that may write it |
| --- | --- |
| `docs/specs/storeroom-publish/contract.md` **+ its declared parts** | `Q1` |
| `docs/specs/storeroom-publish-proposal-review.md` (this unit's gate-1 record) | `Q0` |
| `docs/specs/storeroom-publish-adoption-dossier.md` (if step 4 determines one is owed) | `Q0` |
| `bindings/js/test/publish.test.mjs` — **this unit's red set, inside the directory the landed JS leg's command globs** | `Q2` |
| `bindings/js/package.json` — `name`, the five `optionalDependencies` keys, `files`, `types`, metadata | `Q3`, **only as the `A82`+`A-1` two-home amendment** |
| `bindings/js/index.mjs` — the resolution rule, the version read, the closed key set | `Q3`, **only as the `A82`+`A-1` two-home amendment** |
| `docs/specs/storeroom-js/package.md` (`§1.4` item 3, `§3.1` item 2, `§3.2`) and `docs/specs/storeroom-js/contract.md` (`DD-25`, `DD-26`) | `Q3`, **the same amendment, ONE pass, with a same-pass backup per `DEF-14`** |
| `bindings/js/README.md` — the SHIPPED surface table and the resolution/install section | `Q3`, **the same amendment** |
| `bindings/js/greens/greens.mjs` — `JSG-12.10`/`JSG-12.12` re-issued **by their own author role** | `Q5` (the blind role), **never by `Q3`** |
| `docs/specs/storeroom-publish/*.d.ts` **or** the package's `.d.ts` per the `Q1` decision | `Q1` (the declared shape), `Q3` (the file) |
| the five platform manifests and the CI workflow file — **their PATHS and contents are `Q1`'s clauses; the files are `Q3`'s** | `Q1` (the paths), `Q3` (the files) |
| the four trackers `docs/{next-steps,decisions,pending,defects}.md` | **by the GATES, never by the build** — `Q0`, `Q4`, `Q7`, `Q9` |
| `archive/**` | `Q2`, `Q4`, `Q5`, `Q6`, `Q7`, `Q9` — each gate's own report lands in the pass that authors it; `archive/` is gitignored |

**A file written by any phase but the one named, or a file outside this table written at all, is a finding.**

### §1.1 THE NOT-TOUCHED SET — a step out of it is a failure at any phase, by any role

| # | Not touched, at any phase, by any role |
| --- | --- |
| **1** | **`../Provident-Electron/**` — IN FULL, EVERY BYTE.** Read as context, never as authority (`A9`); a finding against it is a `HO-` row, never a patch. |
| **2** | **THE STORE'S TREE — the root `Cargo.toml`, `src/**`, `tests/**`, its `379`** (`A68`; the filing's `§6`). |
| **3** | **THE CROSSING CORE — `bindings/js/src/crossing.rs` and `bindings/js/src/facade.rs`.** The load path is `index.mjs`'s; the core is unmoved. |
| **4** | **the store unit's contract directory `docs/specs/storeroom-native/**`** and its `DONE` row, its green and its figures. |
| **5** | **the JS unit's register — `8 ≤ 8` holds and NO NINTH ROW is minted** — and its `54` `DD` rows and `18` `PAR-JS` rows. |
| **6** | **`docs/specs/storeroom-js/**` beyond the six amendment cells `§1` names** — including `acceptance.md`'s layer vocabulary, which this unit cits and never edits. |
| **7** | **`docs/specs/storeroom-js-publish-proposal.md`** — the superseded filing stands whole with a dated pointer clause; nothing in it is deleted. |
| **8** | **`README.md` · `LICENSE` · `.gitignore` at the root** — the licence's bytes are the architect's act. |
| **9** | **`docs/pending.md` `P-4`** — the WASM/browser park, untouched and unlifted. |
| **10** | **every tracker's counts** — no ledger count moves except by the architect's admission. |

## §2. THE PHASE TABLE — phase · what it does · owner · input · output · the rule that authorizes it

| Phase | What it does | Owner | Its input | Its output | The rule that authorizes it |
| --- | --- | --- | --- | --- | --- |
| **`Q0` — gate 1's close-out** | the STEP-0 determination for the plan's new tokens, the dossier or its zero-row route, this unit's gate-1 record with its `## Semantics (STEP 0)` block, the union carried onto the record, the `decomposition` row dispositioned, the verdict, the tracker reconciliation | `role_change_analysis` (step 4) + the supervisor's landing pass | the filing `docs/specs/storeroom-publish-proposal.md`; the three step reports under `archive/gate1/storeroom-publish-review/`; the rulings `A82`–`A84`; this plan | `docs/specs/storeroom-publish-proposal-review.md`; the dossier if owed | the four-step chain, and the `D-GP-SAD-5` row |
| **`Q1` — gate 2, the contract** | the pattern-C directory authored whole: the index region, the part map, the recorded omissions, the closure predicate, **this unit's `≤ 8` typed register**, and **the ten deliverable clauses of `§A.1`** — the resolution rule and its order, the state taxonomy and the single arm, the version read with its subject-narrowing, the five platform manifests, `files`, the licence notice and the five artefacts, the types and the closed set's enumeration, the CI inputs, the tag/provenance rule, and the `LIVE/INSTALL` definition | `role_spec_writer` | this unit's gate-1 record + `A82`–`A84`; the filing's `§1`–`§9`; `docs/specs/storeroom-js/{package,contract,acceptance}.md`; the store's `§8.1`–`§8.3` | `docs/specs/storeroom-publish/contract.md` + its parts | the ACTIVE unit-id/directory rule; the `≤ 8` register rule; the closure predicate |
| **`Q2` — gate 3, the red set** | the red set authored **from this contract alone**, one block per register row, and **RUN**, its failing set **REPORTED BEFORE** any implementation | `role_test_writer` | the new contract directory, whole; the register's rows, each with its strategy id | `bindings/js/test/publish.test.mjs`; the reported failing set; the register's executed layer; the gate's record | **RED BEFORE GREEN** |
| **`Q3` — gate 3, the green** | the least code that turns exactly that red set green, **inside `§1`'s declared scope**, and **the `A82`+`A-1` two-home amendment in ONE pass with a same-pass backup** | `role_implementer` | the reported red set + the declared scope | `index.mjs`'s resolution rule and version read; `package.json`'s name, keys, `files`, `types`, metadata; the six `docs/specs/storeroom-js/**` cells; `README.md`'s shipped section; the five manifests; the workflow file | least code to green, after the red set is reported; `DEF-14`'s same-pass backup rule |
| **`Q4` — gate 4, the adversarial pass** | the read-only adversarial pass and the register's read-only audit; every finding dispositioned with ONE recorded disposition | `role_adversarial_reviewer` | the green tree + the executed register | the unit's layer-honesty region filled; catalogue rows; the gate's record | the adversarial pass is mandatory; **a package defect is catalogued, never patched** |
| **`Q5` — gate 5, the blind greens** | the greens set authored **AND run** from the delivered docs alone, by an agent who did **not** implement, against the built artefact from outside the unit directory; **and the two re-issued assertions** | `role_blind_test_writer` | the delivered docs + the green tree | the greens record + per-scenario pass/fail; `greens.mjs`'s two re-issued rows | a greens set authored by the implementer without a blind re-run is a review finding |
| **`Q6` — gate 6, the live determination** | a **WRITTEN** determination of whether this unit triggers the live battery, with its evidence and its **falsifier**; the in-place live battery re-run as an added leg | `role_live_scenario_runner` | the contract's declared change set + the package's real boundary | the recorded determination, or the run's structured report | **no `APP`-green may be reported from any node green**; `APP` stays `NONE` |
| **`Q7` — gates 7/8, proofreader + documentation review** | the proofreader audits the docs against the code; the documentation reviewer reconciles the contract, the greens record and the active trackers against the build | `role_proofreader` then `role_documentation_reviewer` | the green tree + the greens set + the trackers | the fixed cells · the review record | the documentation review is mandatory after the greens and runs per unit |
| **`Q8` — gate 9, the trio and its legs** | the project's three checks plus the narrowed leg, **with the LAYER each covers stated**, and the crate's own `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` leg and the JS leg `node --test bindings/js/test/*.test.mjs` beside them, **each at the REPOSITORY ROOT and each at `ENVELOPE/PURE`** | the trio's own passes | the frozen green tree | the commands' measured exit codes and figures, each with its layer | **a node-suite green is `ENVELOPE/PURE`, never `APP`-green** |
| **`Q9` — THE RELEASE ACTS — the architect's** | claiming the six names; creating the tag; publishing the five platform artefacts and then the main package; the provenance attestation; deciding the partial-publish arm if `k` of six lands | **the architect** | the frozen green tree and the tagged commit | the published artefacts · the tag · the attestation | **`A82`'s identity and `DD-42`'s tag rule; "no pass publishes"** |
| **`Q10` — the `LIVE/INSTALL` battery** | the install of the RELEASED bytes, by a package manager, in a clean directory, exercised through the claimed ESM entry to a final resolved state; **then the uncovered-target arm** | `role_live_scenario_runner` | the published artefacts | the `LIVE/INSTALL` figure with its site, its label, and what it must not claim | this plan's `§4`; **the label's only home is this unit's contract** |
| **`Q11` — the `DONE` row, the ledger move, the archival loop** | the `DONE` row with its full content; the tracker/ledger move; the decisions/queue updates; the archival loop | the supervisor's landing pass, **on the architect's admission** | every gate's landed artifact | the `DONE` row · the moved ledger (`2 DONE / 0 open` → `3 DONE / 0 open` UNITS = `3`) · the reconciled trackers | **the architect admits ROWS, not a pass**; the row MUST cite this unit's gate-4 pass and its findings |

## §3. THE `BLOCKED-BY` CELLS — every phase the open rows block, marked

| Phase | What blocks it now | What does NOT block it |
| --- | --- | --- |
| **`Q0`** | **nothing** — step 4 owns the STEP-0 determination and the verdict | — |
| **`Q1`** | **nothing**, once the go-ahead lands; the register's `8 ≤ 8` budget is this unit's own | **the `15` open union rows do NOT block it**: they are this contract's priced carriage, each owner-named in `§5` |
| **`Q2`** | **nothing** — the red set is authored from `Q1`'s contract alone | — |
| **`Q3`** | **`ROW 13` — the two blind assertions' re-issue is not landed**, so the `113`-cell JS leg reads `BROKEN` on the old identity the moment `package.json`'s `name` moves; **and `ROW 16` — `files` is undecided**, so the red set's rung-two cells cannot be authored against a settled shape | **`ROW 10`'s conditional half does not block `Q3`**: the `package.md §1.4` item 3 narrowing is written IN the same amendment |
| **`Q4`–`Q8`** | inherit their predecessor's | — |
| **`Q9`** | **the architect's own act**, and **`ROW 24` — the partial-publish arm must be declared first**, so a release that fails after `k` of six has a legal recovery | **`ROW 20` (the universal negative) does not block it**: it is a statement, not a gate |
| **`Q10`** | **`Q9`** — the install layer presumes registry state, so its figure cannot exist before the release | **it never blocks `Q1`–`Q8`**: it is additive and post-release by construction |
| **`Q11`** | **the architect's admission of the `DONE` row** | — |

## §4. THE ACCEPTANCE CRITERION — `DONE`, and what makes it `NOT DONE`

**THE PRIMARY ACCEPTANCE LAYER, NAMED FIRST: the resolution rule's own drive — the load path's state machine, every state answered once — at `ENVELOPE/PURE`, `SITE` the repository root.**

**`DONE` REQUIRES ALL OF THE FOLLOWING.**

| # | The item | What makes it checkable |
| --- | --- | --- |
| **1** | the architect's go-ahead is recorded, and this unit's gate-1 record exists with its `## Semantics (STEP 0)` block, the union and the dispositioned row | `docs/specs/storeroom-publish-proposal-review.md` |
| **2** | the contract is a pattern-C directory whose closure predicate holds, with **one** `derivation:` clause and its `ordering anchor` | the directory's index region |
| **3** | the typed register exists, uses the `P-PUB-*` vocabulary, is `≤ 8` rows, and carries a failable row per named interaction | the contract's `§5.x` |
| **4** | **the resolution rule's clauses are total**: the order, the closed five-name key set, the musl answer, the version read and its single arm, and the four-state taxonomy, each with its declared answer | the contract's resolution region |
| **5** | **the five platform manifests are fully specified, field by field, over the five declared names** | the contract's manifest region |
| **6** | **the main package's own shape is decided**: `files`, whether any binary ships, the licence notice and its five artefacts, the types, and the closed set's enumeration choice | the contract + `bindings/js/package.json` |
| **7** | **the CI inputs are declared**: the workflow's path, host, per-target runner, tag actor, provenance subject, and the six publish steps' order | the contract + the workflow file |
| **8** | the red set was authored from the contract alone, **RUN**, and its failing set **REPORTED before implementation**; the register's layer **EXECUTED**, every row printing its strategy id and verdict, `un-run` a failure | the gate-3 record |
| **9** | the green is the least code that turns exactly that red set green, inside `§1`'s scope | `§1` |
| **10** | **the `A82`+`A-1` two-home amendment landed in ONE pass, with a same-pass backup (`DEF-14`), and the two blind assertions re-issued by their own author role** | `docs/specs/storeroom-js/**` · `bindings/js/package.json` · `greens.mjs` |
| **11** | the adversarial pass ran read-only, every finding carries ONE recorded disposition, package findings catalogued and never patched | the gate-4 record |
| **12** | the greens set was authored **AND** run by an agent who did not implement | the greens record |
| **13** | the live determination is WRITTEN with its evidence and its falsifier | the gate-6 record |
| **14** | the proofread and the per-unit documentation review ran, and the contract, the greens record and the trackers were reconciled to the build in that same pass | the two records |
| **15** | the trio is green, the declared legs are green, **and every verification's LAYER is stated**, with no `APP`-green reported from any node green | the trio's record |
| **16** | **`LIVE/INSTALL` has run against the RELEASED bytes and reports its figure with its site and its label** — **a POST-RELEASE row, admitted by the architect's act** | the `LIVE/INSTALL` record |
| **17** | a commit exists at every gate boundary that changed files | the repository |
| **18** | the `DONE` row carries every field this plan lists, and the ledger move (`2 DONE / 0 open` → `3 DONE / 0 open` UNITS = `3`) was taken by the architect | `docs/next-steps.md` |

**`IT IS NOT DONE IF`:** a store byte moved — the root `Cargo.toml`, `src/**` or `tests/**`; **the crossing core moved — `bindings/js/src/**`**; a byte of `docs/specs/storeroom-native/**` moved; a byte under `../Provident-Electron/**` was written or read as authority; a ninth JS register row was minted or a second register opened in either directory; **a computed package name outside the five was written at any depth**; **the version read was answered by anything but the single declared arm**; the red set was authored or run **after** the implementation, or an existing test file was rewritten or an assertion weakened; a figure moved without a dated re-measure or a layer; **an install-time figure was reported as an `APP`-green, or `LIVE/INSTALL` was reported as a substitute for the node legs**; a park was read as a closure; a citation points at a file, a row or an id that does not resolve; a finding was left a bare `OWED`; **a pass published, packed, tagged or installed**; a unit row was admitted or a ledger count moved by a pass; or this plan's own bytes were overwritten instead of reconciled.

## §5. THE STOP CONDITIONS

**A stop is a RETURN TO THE ARCHITECT in the concrete form the process requires** — what is blocked · the evidence · two or three options with a recommendation · what each blocks — **never a silent widening and never a second question about a ruling already recorded.**

| # | The stop |
| --- | --- |
| **A** | **a pass is asked to publish, pack, tag or install** — the release acts are the architect's, and no gate has one |
| **B** | **the version read is made to refuse in a second shape**, or given a status or a message of its own, or read as an ABI probe contrary to `package.md §1.4` item 3 |
| **C** | **a sixth package name is computed, or the closed five-name set is widened** at any depth |
| **D** | **`bindings/js/src/**` is reached** — the crossing core is not this unit's, and a load-path need that appears to require it is a CONTRACT FINDING |
| **E** | **the JS unit's cells are amended beyond the six `§1` names** — a seventh cell is a bounded amendment, not a step |
| **F** | **a `HO-` duty is proposed as a patch**, or a consumer's wiring is proposed as a step of this unit (`A2`, `A9`) |
| **G** | **a red set is authored against an unruled key, arm or manifest shape** |
| **H** | **an `APP`-green is claimed from any node green**, or the store's `379` is re-labelled as this unit's |
| **I** | **the `LIVE/INSTALL` battery is run, or its figure reported, before the release act** |
| **J** | **a release is attempted with no declared partial-publish arm** (`ROW 24`) |
| **K** | **a step takes its input from a later phase of this table** |

## §6. THE POINTER INDEX

| The artifact | Its path |
| --- | --- |
| the filing, with the FORM ruling and `A84` | `docs/specs/storeroom-publish-proposal.md` |
| the superseded filing, with `A82`/`A83`/the licence act | `docs/specs/storeroom-js-publish-proposal.md` |
| the superseded gate's two reports (the union's source) | `archive/gate1/storeroom-publish-review/{1-validity,2-critique}.md` |
| this gate's three step reports | `archive/gate1/storeroom-publish-review/{1-validity,2-critique,3-architecture}.md` |
| the JS unit's contract directory (amended only at `§1`'s six cells) | `docs/specs/storeroom-js/contract.md` + its parts |
| the package and its loader | `bindings/js/{package.json,index.mjs,README.md}` |
| the two blind rows to be re-issued | `bindings/js/greens/greens.mjs` (`JSG-12.10`, `JSG-12.12`) |
| the licence, complete by the architect's acts | `LICENSE` (`:632`–`:634`) |
| the store's contract directory (cited, never amended) | `docs/specs/storeroom-native/contract.md` + its parts |
| the store's crate and red set (not touched) | `Cargo.toml` · `src/**` · `tests/**` |
| the wasm/browser park (unlifted) | `docs/pending.md` `P-4` |
| the decisions and the trackers | `docs/decisions.md` · `docs/next-steps.md` (`N5` superseded, `N6`) · `docs/defects.md` · `docs/pending.md` |
| this unit's records, as they land | `archive/gate{3,4,6}/storeroom-publish-*.md` · `archive/reviews/…` |
