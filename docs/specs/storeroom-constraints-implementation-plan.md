# PROPOSAL-STAGE IMPLEMENTATION PLAN — the constraint/repair work (`U-STOREROOM-CONSTRAINTS`, provisional id), for `0.2.0`

**Filed 2026-10-13 by gate 1 step 4 (`role_change_analysis`), from step 3's own plan region** (`archive/gate1/storeroom-constraints-review/3-architecture.md` `§7`: `§7.1` the declared edit scope, `§7.2` the phase table, `§7.3` the acceptance criterion, `§7.4` the stop conditions, `§7.5` the pre-flight table), **carried onto disk here and reconciled to the gate-1 record** (`docs/specs/storeroom-constraints-proposal-review.md`).

## §0. WHAT THIS FILE IS — read this head before any step below

1. **EVERY STEP IN THIS FILE IS A PLAN STEP AND NEVER A CONTRACT CLAIM.** **No step asserts a behaviour, a signature, a return shape or a fail-state; no step licenses code; no step delegates a red set; no step admits a unit row; no step moves a ledger count.** A reader who finds a behaviour claim here has found a filing defect: the behaviour belongs in a contract, authored at the spec gate and nowhere else.
2. **THESE STEPS ARE RECONCILED TO THE CONTRACT AND DATED ONCE A CONTRACT LANDS.** **Until the unit's contract exists there is nothing to reconcile to** — so each phase below is a **schedule** and each phase's cells are discharged by the pass that lands it, **with a dated clause placed beside the site it moves** (`RCA-8(d)` ANNOTATE-BESIDE: the as-filed text stands byte-for-byte and the dated clause is the operative statement). **A phase that finds itself unable to reconcile its step to a landed contract STOPS and returns the finding; it does not re-word the contract to match the plan.**
3. **THIS IS A SCHEDULE AND NOT AN ORDERING CLAIM.** The order the phase table prints (`A1 → A2 → B1 → B2 → [B2a] → B3 → B4 → B5 → B6 → B7`) is **this plan's own dependency order** — each phase takes its input from the phase before it and from no later one. **It asserts nothing about the store's clauses, about any register's row order, or about the order the store's own lists are returned in** (that order is unobservable by clause: `docs/specs/storeroom-native/contract.md §6.5` item 5).
4. **WHERE THIS PLAN RE-HOMES AT GATE 2, IF THE FORM DETERMINATION LANDS AS STEP 3 RECOMMENDS.** The determination is **a BOUNDED AMENDMENT of `docs/specs/storeroom-js/`** — no new unit id and no `docs/specs/storeroom-constraints/` directory (`archive/gate1/storeroom-constraints-review/3-architecture.md` `§4`). **On that landing this plan re-homes at gate 2 into `docs/specs/storeroom-js/implementation-plan.md` as a dated `§n` region beside that file's existing regions** — the precedent sites are the listener amendment's `§8` and the access-probe amendment's `§9` in the store's own plan (`docs/specs/storeroom-native/implementation-plan.md`, whose `§9` the gate-7 proofreading pass verified present at `:647`) **THIS FILE IS THEREFORE THE PROPOSAL-STAGE STAGING SITE, and it is the file `docs/specs/storeroom-constraints-proposal-review.md`'s `§7` points at.** **The re-homing act is `B2`'s or the landing pass's, and this file is not deleted by it: it stands, with a dated pointer clause, as the proposal-stage record.** **A plan is drafted at the proposal stage for every unit, INCLUDING a proposal whose gate-1 verdict is a hold** — this plan's hold is stated at `§5` and its reason is precisely so that the architect can review the schedule before the word is given.
5. **NO LEDGER COUNT MOVES BY THIS FILE.** The plan admits no unit row, re-opens no `DONE` row, lifts no park and freezes no artifact. **The ledger's operative row-as-unit reading stands at `4 DONE / 0 open` UNITS = `4` (`docs/next-steps.md:578`, and `:21`'s census clause, and `3 + 0 = 3` ✓ on the units-as-units counting, which the same clause prints beside it — the two figures differ by the counting and not by the tree).**
6. **LAYER.** Every figure this plan touches is quoted from the tracker site that carries it. **The assembled/app layer for this work is `NONE`; no `APP`-green is claimed or claimable anywhere in this file or by this subject's gates.**
7. **Nothing was run in authoring this file:** no shell, no `cargo`, no test, no build, no `git`, no hashing verb.

---

## §1. THE DECLARED EDIT SCOPE — every path the work may write, and the phase that may write it

| # | Path | What the pass may do there | The phase that may write it |
|---|---|---|---|
| 1 | `docs/specs/storeroom-js/contract.md` | the kernel's declaration: `§2.6`'s pattern clause extended, one member table for the kernel's surface, **one existing `§5.x` row's text re-derived** (`P-SM-5` recommended), and the dated clause beside each site that moves | `B2` |
| 2 | `docs/specs/storeroom-js/surface.md` | the `§2.6` region's member clauses | `B2` |
| 3 | `docs/specs/storeroom-js/parameter-semantics.md` | `§2.18`'s row (its `domain`, `observable` and `alt` cells) and the `§1` arithmetic clause | `B2` |
| 4 | `docs/specs/storeroom-js/implementation-plan.md` | **this plan, landed as a dated `§n` region** (`§0` item 4) | `B2` (the re-homing), `A1` (staging, this file) |
| 5 | `bindings/js/**` | the kernel implementation and its ESM export, **inside the declared surface only** | `B3` |
| 6 | `bindings/js/test/**` (plus the blind set outside the repository) | the drives: the attempt's transition table, the message-log equality, the rollback anchor, the finite bound | `B4` |
| 7 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | the supervisor's landing pass only: the row's status, the census reconciliation, and any park or defect the work creates | `B7` |
| 8 | `docs/specs/storeroom-publish/**` | **ONLY IF** a pass reads a kernel member as a declared-surface member under `PUB-DD-9`'s `MINOR` row (`docs/specs/storeroom-publish/contract.md`; `release.md §2`). **That reading is NOT taken here and is a `BLOCKED-BY`** | `B2a`, conditional |

**NOT-TOUCHED SET — a step out of it is a FAILURE at any phase, by any role.** `src/**` (**no store byte**) · `docs/specs/storeroom-native/**` (**no clause, no `DD` row, no register row, no fail member, no `StoreConfig` member**) · the listener amendment's landed clauses · **any register's ninth row** · **any second register, sixth structure or second addressable home** · any `F`-row or `§6`/`FS-n` form · **any store-side constraint record** · **any new unit id** · any byte under the adjacent project `../Provident-Electron/**` (read-only, by `A9`).

**AND THE PATH THIS PLAN MAY NOT WRITE EVEN THOUGH IT NAMES IT:** `docs/specs/storeroom-constraints-proposal.md` (the filing) and the three step reports under `archive/gate1/storeroom-constraints-review/` are **read, never edited**; they are the gate's evidence and each is a closed record.

---

## §2. THE PHASE TABLE — phase · what it does · owner · input · output · the rule that authorizes it

| Phase | What it does | Owner | Input | Output | Authorizing rule |
|---|---|---|---|---|---|
| **`A1`** | records the gate-1 verdict, the Semantics block, the union, the `decomposition` row, **this plan region**, and takes the architect's go-ahead | `role_change_analysis` (step 4), then the architect | step 3's report · `1-validity.md` · `2-critique.md` · the filing | `docs/specs/storeroom-constraints-proposal-review.md` · **this file** · the STEP-0 dossier | the four-step gate; **the architect admits rows** |
| **`A2`** | **fires `AR-1` and `AR-4`** — which side holds a constraint, and the attempt's finite termination bound — **at gate 1's existing pause** | the architect | union `U1` · `U9` · `U22` | a ruling recorded as an ACTIVE `docs/decisions.md` row, or a park | `docs/specs/storeroom-native/contract.md §7.3` clause 3's own revisit condition (*a ruling recorded as an ACTIVE `docs/decisions.md` row*); `A73`'s reversal instrument |
| **`B1`** | re-derives the row text that carries the kernel's properties, **inside `8 ≤ 8`** | `role_spec_writer` | `P-TP-5` → `P-SM-4`'s landed merge precedent; the register census clause | the re-derived row's text and its strategy cell | the register's `≤ 8` cap and its merge instrument |
| **`B2`** | authors the amendment's clauses: the kernel's surface, its record shapes, its failure form (**the caller's own, never a store code**), its ordering statement, **and this plan re-homed as the dated region** | `role_spec_writer` | `A2`'s rulings; `storeroom-js/contract.md §2.6`; `parameter-semantics.md §2.18` | the amended `docs/specs/storeroom-js/` parts | the unit's own amendment route; `DD-3`'s reversal cell |
| **`B2a`** *(conditional)* | takes the publish reading, if taken at all, **before any member ships** | `role_spec_writer` + the architect | `PUB-DD-9`; `release.md §2`'s `MINOR` row | a publish-directory amendment, or a written refusal to take one | `PUB-DD-9`'s ordering (*a bounded amendment of `docs/specs/storeroom-publish/` FIRST*) |
| **`B3`** | implements the kernel inside the declared scope | the implementing pass | `B2`'s clauses | the kernel and its ESM export | **the delegated red set only** |
| **`B4`** | authors the red set **before** the implementation is run against it | the test-writing pass | `B2`'s clauses · `B1`'s row text | `bindings/js/test/**` cells | this project's red-set-first rule |
| **`B5`** | re-measures the unit's green and the register layer; records both figures **with their layer and site** | the test-writing pass | the built tree | the green figures, each with its layer | the figure discipline (a figure without its layer fails) |
| **`B6`** | the adversarial pass over `B2`'s clauses and `B3`'s implementation, read-only, with the findings landed | the adversarial role at this project's gate 4 | `B2`, `B3`, `B5` | the adversarial record and its fixes | the gate-4 instrument |
| **`B7`** | the supervisor's landing pass: the row's status, the census reconciliation, the archival loop — **and no ledger count moved** | the supervisor | every landed artifact | the reconciled trackers | **an amendment is a ROW and never a unit** |

**THE ORDER, ENCODED ONCE:** `A1 → A2 → B1 → B2 → [B2a] → B3 → B4 → B5 → B6 → B7`, **each phase taking its input from the phase before it and NOT from a later one. A step taken out of that order is a STOP (`§4`).** **AND THE CONDITIONAL PHASE'S OWN PLACE, STATED SO IT IS NOT READ AS AN ORDER:** `B2a` is taken **between `B2` and `B3`** if taken at all, because its ordering rule is *before any member ships*; declining it in writing closes its row by refusal and does not move any other phase.

**If the architect declines `P1`** (the caller-side kernel)**, the plan collapses to `A1` + `A2` and the work lands as a park** — phase `A1` only, with `BLOCKED-BY` = `AR-1`, in `docs/pending.md`'s park form (`P-3`'s and `P-4`'s shapes are the precedents), **and this file then stands as the park's own plan.**

---

## §3. THE ACCEPTANCE CRITERION — and what makes it NOT done

**DONE** when, **all at once**: `A1`'s record exists with its Semantics block, its union, its `decomposition` row and its verdict · `A2`'s rulings are recorded as ACTIVE `docs/decisions.md` rows (**or the work is parked per the collapse clause at `§2`**) · the register reads **`8 ≤ 8` in BOTH units** with **no ninth row** and **no second register** · the kernel's surface is declared in `docs/specs/storeroom-js/` with a member table, and **no store byte, no fail member, no `StoreConfig` member and no store-side record moved** · the red set was authored **before** the implementation and each new drive cites the clause it drives · **every figure is printed with its layer, and the blind set's run is recorded separately from the in-repo suite** · the adversarial pass's findings are landed · the trackers are reconciled **with the census arithmetic printed**.

**IT IS NOT DONE IF:** a store-side constraint surface, register, record or fail member was authored · a new unit id was minted **without the architect's admission** · a ninth property row was authored, a second register opened, or a row's text added without the cap's arithmetic printed · **an order claim was authored for the store's lists** · a constraint failure was given a code outside the closed `15` · a hand-authored message was specified · the red set was authored or run **after** the implementation · a figure moved without a dated re-measure or without its layer · a park was read as a closure or lifted by a pass · a citation points at a path, row or id that does not resolve in this repository · **an `APP`-green was claimed from a node-green.**

**AND THE ONE ACCEPTANCE FACT THIS HOLD ADDS, STATED SO IT IS NOT DISCOVERED LATE:** **`B1` cannot begin while `U23`'s carrier arithmetic is unmet in the authoring unit, and `B2` cannot begin while `U1`/`U22` stand unanswered** — so a green that arrives before `A2` is not this plan's green, and no phase may re-order itself to reach one.

---

## §4. THE STOP CONDITIONS

**A STOP IS A RETURN TO THE ARCHITECT in the concrete form the process requires: WHAT IS BLOCKED · THE EVIDENCE at its own path + `§n` · TWO OR THREE OPTIONS WITH A RECOMMENDATION · WHAT EACH BLOCKS. Never a silent widening, never a re-worded clause, never a widened scope.**

- **Stop `S-1`** — `A2`'s rulings are not recorded and no park is taken → **`B1`–`B7` do not begin.**
- **Stop `S-2`** — a pass finds it must move `src/**` or `docs/specs/storeroom-native/**` to make a drive green → **the pattern is wrong, not the drive**; the store-side remainder re-opens as `U22`'s question.
- **Stop `S-3`** — a drive cannot be authored without a ninth register row → **take the merge instrument (`B1`) or stop; a breach is NEVER silent.**
- **Stop `S-4`** — the publish reading (`B2a`) is refused by the architect → the kernel ships as a library member and `AR-10`'s row closes **by refusal**, recorded.
- **Stop `S-5`** — any phase is asked to author a clause for the store-side mechanism while `§7.3` clause 3's `J-20`–`J-22` stand `OWED` → **stop and cite clause 3.**

---

## §5. PRE-FLIGHT PRECONDITIONS — each with its state and its blocking row

| # | Precondition | State | Blocking row |
|---|---|---|---|
| 1 | the architect rules **which side holds a constraint** (store-core, caller/binding, or a bounded store-side exposure) | **NOT MET** | `U1` · `U22` · `AR-1` |
| 2 | **a finite re-evaluation bound is declared**, or a park is taken fixing it later | **NOT MET** | `U9` · `AR-4` |
| 3 | a property carrier exists under `8 ≤ 8` in the authoring unit | **MET at `8 ≤ 8`, with the merge instrument available and unexercised** | `U17` · `U23` · `AR-7` |
| 4 | the amendment instrument for a `DONE` unit is landed | **MET** (`docs/specs/storeroom-js/parameter-semantics.md §2.18`'s reconciliation clause; `docs/next-steps.md` `N4`) | `U24` |
| 5 | the store's half is built (the journal, the returned op, `rollback`) | **MET** (`docs/specs/storeroom-native/write-and-read.md §6.1`–`§6.4`; `docs/specs/storeroom-native/contract.md §7.3` clause 2 already names the journal as the evaluation's window) | — |
| 6 | the gate-1 record exists with its Semantics block and its dispositioned `decomposition` row | **MET by this pass** | `U20` · `AR-14` |
| 7 | the STEP-0 dossier's content-hash snapshot is taken | **MET** — `docs/specs/storeroom-constraints-adoption-dossier.md` · **`sha256: 80d0ca682e4a21ce93ee9f9e452380e6df44dcc7c8b0bfa8a6630ae2b7437d95`** · **`24,086` bytes** · **`90` lines** — **and the record's `§2` `Dossier snapshot:` cell carries the same three figures** (the dossier's `§0` names exactly what it owed and where it landed) · **⟶ 2026-10-13: the landing pass TOOK the snapshot and wrote the three figures into the gate-1 record's `§2`, so this cell's as-filed `OWED` reading is superseded and the precondition stands `MET`** | `AR-22` |

**⟶ `§5`'s ROW `1` IS MET AND THE HOLD IS DISCHARGED, 2026-10-13 (the architect's second answer set, `docs/specs/storeroom-constraints-proposal.md §B`; `RCA-8(d)`: the row above stands byte-for-byte and is read THROUGH this clause).** **The side is RULED (`§A.1` + `§B.6`/`§B.7`) and no `BLOCKED-BY` cell above is unmet: the record's `§11.5` carries the conditions' delta, `§11.1` re-issues the verdict as `APPROVE-WITH-CONDITIONS` · `DELEGABLE`, and `§11.2` carries the ledger, which now MOVES (`4 DONE / 1 open` UNITS = `5`, `4 + 1 = 5` ✓) because `§B.5` admits the unit. `U22`'s `OWED` seam is UNMOVED and bars no clause this unit owes. NO PHASE IS RE-ORDERED BY THIS CLAUSE and nothing was run.**

**THE HOLD, STATED IN ONE LINE SO THE PLAN IS NOT READ AS DELEGABLE.** **`1` of the `7` preconditions blocks `A2` after the `⟶ 2026-10-13` reconciliation of row `7` (`2` blocked `A2` as filed; row `7` is now `MET`), and its terms close: `1 NOT MET` (row `1`, `U1` · `U22` · `AR-1`) `+ 6 MET` (row `2` at `U9`/`AR-4`, row `3`, row `4`, row `5`, row `6`, row `7` — `1 + 6 = 7` ✓, the `7` counting rows `2`–`7` as filed), and `A2` gates every phase after it: this plan is filed WITH THE HOLD and the architect's go-ahead is withheld.** **NO GATE LATER THAN GATE 1 MAY RUN, ON THIS FILE'S OWN TERMS, WHILE ANY `BLOCKED-BY` CELL ABOVE IS UNMET** (`docs/pending.md` `G-1`'s form; `G-2`: *an adoption-row or open-semantics blocker may not be deferred to the spec filing — it escalates in the pass that finds it*). **A park is `OPEN`, never green, and its lift is the architect's act.**

---

**END OF THE PROPOSAL-STAGE PLAN.** **`10` phases (`A1`, `A2`, `B1`, `B2`, `B2a`, `B3`, `B4`, `B5`, `B6`, `B7` — `2 + 8 = 10` ✓, of which `1` is conditional) · `2` acceptance lists (`1` DONE set, `1` NOT-DONE set) · `5` stop conditions · `7` pre-flight preconditions (`3` MET, `3` NOT MET, `1` MET by this pass — `3 + 3 + 1 = 7` ✓) · `0` bare `OWED` besides the dossier snapshot cell the landing pass owes.** **It admits no unit row, moves no ledger count (`4 DONE / 0 open` UNITS = `4`), delegates no red set, licenses no code, and claims no `APP`-green — the assembled/app layer for this work is `NONE`.** **Nothing was run.**
