# Part — `implementation-plan` (`U-STOREROOM-NATIVE`, prefix `D-GP-SNST`): the unit's ordered landing/verification plan and its acceptance criterion, RECONCILED to the contract

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-native/`** — authored at
  the gate-2 spec gate in the **same pass** as the contract document's index region and part map, whose
  `implementation-plan` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-native/implementation-plan.md`.
- **The derivation clause this part reads through — one clause, carried by
  the contract document and NOT re-spelled here:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  (`docs/specs/storeroom-native/contract.md`, its status block; the middle dot `·` separates the slots). **Its
  AUTHORITY IS THE FILED GATE-1 RECORD ITSELF** (that record's `decomposition` row and its `§4.1`) — **the
  unfiled process-rule literal that fixed the clause's spelling is NOT cited, because this repository files no
  process-rule spec and `contract.md §0.1` item 7 forbids a citation to a path that cannot be opened.**
- **WHAT THIS PART IS.** **It is the unit's ordered landing/verification plan AND its acceptance criterion,
  and it carries NO pinnable claim the contract document does not already carry** — the admissible-content
  rule the `implementation-plan` name is fixed by
  (`docs/specs/storeroom-native/contract.md` §0, whose part-map row declares this part's KIND and admissible
  content, read with `contract.md §0.1` item 10(a)'s relocation rule). **Its content is TWO things and nothing else:**
  1. **THE RECONCILED PLAN** — the proposal-stage plan's own phase table, reconciled **to this contract**
     and **DATED** (§3 below). **The pre-contract plan's own bytes stand at
     `docs/specs/storeroom-native-implementation-plan.md` and are ANNOTATED, never overwritten** — its own
     `§P.7` forbids the overwrite (*"the plan's own bytes were overwritten instead of reconciled"* is its
     `§P.4` item 12 failure). **This part is the reconciled form**; the two are one plan, and where they
     differ this part governs for the cells it names.
  2. **THE UNIT'S BUILD-ORDER MAP** (§2) — the ADOPTED BUILD ORDER bound to the contract's own clause order,
     which is the ordering the gate requires (`P: §12 · A20`; the record's `§17.4` condition 5).
- **AND WHAT THIS PART IS NOT.** **Every step below is a PLAN STEP and never a contract claim.** **Read in
  its reconciled form, the ledger binds it — each step is reconciled to the contract text that landed, the
  reconciliation is dated, and a step that has become a contract-bearing claim carries the contract's own
  citation here and in the contract document, or is marked `intent/parked`** (`docs/specs/storeroom-native/contract.md`
  §0.1 item 10(a) and §0.1 item 3, whose rules this part's form obeys). **This part admits no unit row, moves no ledger count
  (`docs/next-steps.md` stands `0 DONE / 1 open` UNITS = `1`), executes no register row, writes no `crate/**`
  or `src/**` byte and takes no ruling** (`[T | CONTRACT]`).

## §1. Scope boundary — the declared edit scope and the NOT-touched set

**THE DECLARED EDIT SCOPE, BY PATH, AS THE PROPOSAL-STAGE PLAN DECLARES IT** (the plan's `§P.2`, whose
table stands at its own bytes and is cited, not re-tabled here). **The paths this unit MAY write, with the
phase that may write each:** `docs/specs/storeroom-native/contract.md` **+ its declared parts** (`P1`,
this pass) · `docs/specs/storeroom-native-adoption-dossier.md` (`P0`) ·
`docs/specs/storeroom-native-proposal-review.md` (`P0`) · **`crate/**` — `Cargo.toml`, `src/**`, its own
unit tests** (`P2`, `P3`) · `src/**` (this project's own surface, if any — `P2`, `P3`) · `tests/**` (the
TestWriter's, `P2`) · **the build config** (`Cargo.toml`, `package.json`, `tsconfig*.json`, `scripts/**`)
(`P1`, `P3`) · `docs/specs/storeroom-native-implementation-plan.md` (`P1`, **reconciled, never rewritten**)
· the four trackers `docs/{next-steps,decisions,pending,defects}.md` (**by the GATES, never by the build** —
`P0`, `P4`, `P7`, `P9`) · `archive/**` (`P7`, `P9`).
**AND THE `archive/**` ROW'S OPERATIVE EDIT-SET READING, STATED BECAUSE THE GATE-3 RED SET LANDED OUTSIDE
THE LITERAL `P7`/`P9` CELL** (`[T: the archive row's declared reading, taken at this contract's third
bounded amendment; the gate-4 adversarial pass's `S-12` found the red set's landing path outside the
declared scope | CONTRACT]`): **`archive/**` is the ARCHIVAL LOOP'S directory, and every gate's own REPORT
and RECORD file lands under it in the pass that authors it** — the gate-3 report at
`archive/gate3/storeroom-native-red-set.md` (`P2`/`P3`) and this unit's gate-4 adversarial findings at
`archive/gate4/storeroom-native-adversarial.md` (`P4`) — **because `docs/decisions.md`'s archival row fixes
`archive/` as the home for *"findings reports and historical review records"* and makes it GITIGNORED, so
the path moves no tracked byte; the `P7`/`P9` cell names the phases that CARRY an artifact there by
relocation, and the reports' own landing passes are inside the scope by this clause rather than by a
licence read into `P7`/`P9`.** **A tracked-file edit outside every path above — and any write under
`../Provident-Electron/**` — remains OUT of scope and stays this plan's `NOT-touched` failure.**
**THE NOT-TOUCHED SET, FIRST MEMBER ABSOLUTE** (`[T]`, citing the plan's `§P.2`; **re-stated here because
its first member is the wall this unit's later gates are measured against**):

| # | Not touched, at any phase, by any role |
| --- | --- |
| **1** | **`../Provident-Electron/**` — IN FULL, EVERY BYTE.** The corpus, its landed store, its tests, its trackers, its gate records, its `archive/**`, its `AGENTS.md`, its `package.json` and its `src/**`. **A finding against that project is a `HO-` row in `docs/defects.md`, never a patch** (`P: §11 · A9`; `A: docs/decisions.md`'s ACTIVE row *"DECIDED: THE ADJACENT PROJECT'S CORPUS IS READ-ONLY FOR THIS PROJECT, AND ITS TEXT IS NEVER EDITED FROM HERE"*) |
| **2** | **`../Agent Harness/**`** — the process-rule specs are cited, never edited |
| **3** | **every tracker's counts** — no ledger count moves except by the architect's admission |
| **4** | **`docs/specs/storeroom-native-proposal.md`** — the directive stands byte-for-byte |
| **5** | **the gate-1 step reports under `archive/gate1/storeroom-native-review/`** — landed, closed records; **never rewritten and never re-dispositioned** |
| **6** | **`README.md` · `LICENSE` · `.gitignore`** — unchanged (`/target` and `archive/` are already ignored) |
| **7** | **every other project on the shared volume** |
| **8** | **any path under `docs/specs/` outside the declared set** — *a new spec path is a spec-gate event, not a plan step* |

**AND THE PLAN'S OWN BOUND, CARRIED:** **`§2`'s build-order map and `§3`'s phase table start nothing.**
**No red set is delegated, no implementer is dispatched, no leg is run and no gate is entered by authoring
this part** (`[T | NEGATIVE]`).

## §1.1 THE LAYOUT THE IMPLEMENTER WRITES — the crate, the red set, and how the crate's name reaches the tests

**WHY THIS SECTION EXISTS.** **The plan's `§P.2` edit scope names `crate/**` (`Cargo.toml`, `src/**`, its own
unit tests) for `P2`/`P3` and names `tests/**` as *"the TestWriter's, `P2`"* — while the red set landed at
the REPOSITORY ROOT's `tests/**` beside the still-absent crate, so the two paths' relation was undeclared
and the crate's ID was named nowhere in the contract directory.** **This section states the layout ONCE,
and `contract.md §0.4` states the crate's id and every surface item's Rust spelling ONCE** — **so the
implementer's wall and the red set's wall meet at a declared path and a declared name, and a rename is one
edit in one place** (`[T: the layout clause, authored at this contract's second bounded amendment |
CONTRACT]`). **It is a PLAN STEP and a pointer, never a claim about the store's behaviour**, and **it
admits no unit row and moves no ledger count** (this part's own bound, `§6`).

1. **THE CRATE'S HOME IS THE REPOSITORY ROOT.** **`Cargo.toml` at the repository root is the unit's
   manifest**, and **the crate's sources are `src/**` beneath it** — so `crate/**` in the plan's `§P.2` is
   realized as **`Cargo.toml` + `src/**` + the crate's own `[[test]]` units**, **not as a literal nested
   `crate/` directory**. **The `tests/**` path the plan already names is the SAME directory the red set
   lives in: the repository root's `tests/`.** **So the two rows of the plan's table that named `crate/**`
   and `tests/**` name TWO ROOTS UNDER ONE MANIFEST, and no path moves.**
2. **THE CRATE'S ID, AND HOW ITS NAME REACHES THE TESTS.** **The crate's id is `storeroom_native`**
   (`contract.md §0.4`): **`[package] name = "storeroom-native"` gives the crate the import path
   `storeroom_native`, and `[lib] name = "storeroom_native"` may be declared explicitly to make the spelling
   independent of the package name's hyphenation.** **A test under `tests/**` is a SEPARATE crate that
   depends on the unit's crate by `use storeroom_native::…`** — **Rust resolves that dependency because the
   test target and the library share one package**, so **no path dependency, no `[dev-dependencies]` entry
   and no workspace member is needed for the red set to reach the surface**; and **every item `§0.4`
   declares is re-exported from the crate root, so the red set's single `use storeroom_native::{…}` reaches
   all of them.**
3. **THE TEST-SIDE SCAFFOLDING'S PLACE AND ITS AUTHORITY.** **The red set's one scaffolding module is
   `tests/support/mod.rs`, included by each test file as `mod support;`.** **Its assumption table holds the
   SPELLINGS and cites the clause each spelling implements; the AUTHORITY for those spellings is
   `contract.md §0.4`.** **So a rename is TWO edits in TWO files and both are named here: `contract.md`
   §0.4's table, and `tests/support/mod.rs`'s `use` list** — **and no expectation, no arm, no fail-state and
   no `§`-number moves with either.**
4. **THE CRATE'S OWN TESTS, AND WHAT THEY ARE NOT.** **The crate may carry its own unit tests under
   `src/**` (the plan's `§P.2` row)**, and **they are NOT the red set and NOT the greens set** — **the red
   set at `tests/**` is the TestWriter's, authored from the contract alone and RUN BEFORE the crate existed;
   the greens set is gate 5's and is authored by an agent who did not implement** (this part's `§3`,
   `P2`/`P3`/`P5` rows). **A unit test inside `src/**` that reproduces a register row's drive is not the
   register's executed layer** (`contract.md §5.2`–`§5.9`).
5. **WHAT THIS SECTION DOES NOT DO.** **It writes no `Cargo.toml`, no `src/**` byte and no `tests/**`
   byte** — **`crate/**`'s first byte is the IMPLEMENTER's at `P3`, after the red set is reported**, and
   **`tests/**`'s bytes are the TestWriter's alone**: this section states the layout, and **nothing here
   starts a cycle** (`§6`; `[T | NEGATIVE]`).

`[T: this part's layout clause; contract.md §0.4 carries the naming clause it points at | CONTRACT]`

## §2. THE BUILD-ORDER MAP — the adopted order bound to this contract's clause order

**THE ADOPTED BUILD ORDER** (`P: §12 · A20`: *"Yes, recommended order"*; the record's `§17.4` condition 5):

> **record shapes → the walk and the resolver → the write/read/delete arms → tiers and purge → the journal
> and rollback → persistence**

**THE ORDER BINDS THE CONTRACT'S CLAUSE ORDER, AND A STEP TAKING ITS INPUT FROM A LATER STAGE FAILS**
(`R: §17.4` condition 5, `AR-47`). **THE MAP, WITH ITS TERMS:**

| The build stage | The contract's clauses, in this order | The part that carries them | What the stage TAKES as its input |
| --- | --- | --- | --- |
| **`1` — record shapes** | **`§1`** (the node kinds, the anchors, the link and its container, the value taxonomy, the address grammar, the register, the tier as a property) | `store-model.md §1` | **nothing** — the first stage |
| **`2` — the walk and the resolver** | **`§2`** (`findAddress`, the arm table, the selection rule) | `store-model.md §2` | **`§1`'s shapes, and nothing later** |
| **`3` — the write/read/delete arms** | **`§3`**, **`§4`** | `write-and-read.md §3`–`§4` | **`§2`'s walk, and nothing later** |
| **`4` — tiers and purge** | **`§5`** (the domain, the rank, the monotonic clause, the shadow, the purge chain) **with the typed register at `§5.2`–`§5.9`** | the contract document | **`§3`'s arms** — the purge is a **write**'s act, so `§5` is read from the write's arm table and not the other way round |
| **`5` — the journal and rollback** | **`§6`** | `write-and-read.md §6` | **`§3`'s arms and `§5`'s purge** — the entry-formation rule is `§6.1`'s item 1, which reads `§3.5`'s fail-closed guarantee |
| **`6` — persistence** | **`§7`** · **`§8`** | `seams-and-lifecycle.md §7`–`§8` | **`§6`'s journal** — `A16`'s automatic rollback is a journal act, and the fail-code set's `journal` members are `§6.4`'s |

**THE ARITHMETIC, PRINTED WITH ITS TERMS: `6` build stages over `6` contract `§`-blocks (`§1` · `§2` ·
`§3`+`§4` · `§5` · `§6` · `§7`+`§8`), in an order that satisfies the adopted chain with `0` inversions**
(`[P: §12 · A20; R: §17.4 condition 5; T: the map's own accounting | CENSUS]`).
**AND THE TWO SECTIONS THAT ARE NOT STAGES OF THE CHAIN, STATED SO THEIR POSITION IS NOT READ AS AN
INVERSION:** **`§0`** is the **index region and the defaults table** (a document-form region and the
residual carriage) and **`§9`/`§10`** are **the parameter index and the scope boundary** — **all three are
cross-cutting, none takes an input from a later stage, and the map above is unchanged by their position**
(`[T | OBSERVATION]`).

## §3. THE RECONCILED PHASE TABLE — DATED `2026-10-11`, RECONCILED TO THIS CONTRACT

**THE RECONCILIATION, STATED SO ITS FORM IS NOT MISTAKEN.** **The proposal-stage plan
(`docs/specs/storeroom-native-implementation-plan.md`) carries a phase table at its `§P.3` and an acceptance
criterion at its `§P.4`, both filed before this contract existed.** **This section reconciles them: each
phase's input cell gains the contract `§n` (and part) that the phase's work reads, and each acceptance item
gains the contract clause that makes it observable.** **The reconciliation is DATED and is an act of this
part's own author — it is not a silent overwrite, and the pre-contract text's bytes stand.**
`[T: the reconciliation's dated form; `contract.md` §0.1 item 10(a)'s relocation rule and §0.1 item 3's
claim classes (a plan step is a step and never a claim) | CONTRACT]`

| Phase | What it does (the plan's own cell, cited) | Its input, RECONCILED to this contract | Its output | Its gate's own rule |
| --- | --- | --- | --- | --- |
| **`P0` — the gate's close-out** *(landed)* | step 4's pass: the STEP-0 determination, the dossier or its zero-row rationale, the gate-1 record with its `## Semantics (STEP 0)` block, the union carried onto the record, the `decomposition` row, the verdict | `docs/specs/storeroom-native-proposal.md`; the three step reports (`archive/gate1/storeroom-native-review/`) | `docs/specs/storeroom-native-proposal-review.md`; `docs/specs/storeroom-native-adoption-dossier.md` | the four-step chain, fixed by `R: §5.1`'s `AR-1`·`AR-2`·`AR-19`·`AR-20`·`AR-22` and `R: §17.5` |
| **`P1` — gate 2, the contract** *(this pass)* | **the pattern-C directory contract + its parts, authored whole with the index region and part map; the typed `P-*` register; the plan reconciled** | the gate-1 record + the architect's rulings (`P: §8`–`§16`); the dossier `L: §1-bis`/`§1-ter` | **`docs/specs/storeroom-native/contract.md` + its `5` parts**; **the reconciled plan (this part)** | **`contract.md` §0.1 item 10(b)–(c)** (the omission rule and the closure predicate, both `T`-tagged in the contract's own index region); `R: §5.1`'s `AR-10`·`AR-11` |
| **`P2` — gate 3, the red set** | **the red set authored FROM THE CONTRACT ALONE and RUN, its failing set REPORTED before any implementation, plus the register's EXECUTED layer** | **the contract directory, whole** — `contract.md §1`–`§9` and the five parts; **the `§5.2`–`§5.9` register's `8` rows, each with its strategy id** (`P-SM-4` carries two: `S-ARM`, `S-TIER`) | **the red set at `tests/**`** (root-level, per this part's `§1.1`) + **the reported failing set** + the register's executed layer + **the gate's own report at `archive/gate3/storeroom-native-red-set.md`** (`§1`'s archive clause) | **RED BEFORE GREEN**; the register's rows cannot run before the surface they observe exists; **and the red set's OWN work is NOT parked — it drives the store-side surface the parks do not hold, needing no crate to be AUTHORED and only the crate to RUN** (`§1.1`; `§3`'s `BLOCKED-BY` table; `R: §5.1`'s `AR-17`) | 
| **`P3` — gate 3, the green** | **the least code that turns exactly that red set green, inside `§1`'s declared scope** | the reported red set + the declared scope | **the crate at the repository root** — `Cargo.toml` + `src/**`, id `storeroom_native` (this part's `§1.1`) — + the build config | least code to green, after the red set is reported |
| **`P4` — gate 4, the adversarial pass + the read-only register audit** | **the read-only adversarial pass and the register's read-only audit; every finding dispositioned with ONE recorded disposition** | the green tree + the executed register | the unit's `layer-honesty` regions filled; catalogue rows | the adversarial pass is mandatory per completed unit; **a package defect is catalogued, never patched** |
| **`P5` — gate 5, the blind greens** | **the greens set authored AND run from the docs alone, by an agent who did NOT implement** | the delivered docs + the green tree (run against it) | the unit's greens record + per-scenario pass/fail | a greens set authored by the implementer without a blind re-run is a review finding |
| **`P6` — gate 6, the live determination** | **a WRITTEN determination of whether this unit triggers the live battery, with the evidence and the falsifier** | the contract's declared change set + the host's two realms | the recorded determination (`TRIGGERS` / `DOES NOT TRIGGER`) or the run's structured report | **no `APP`-green may be reported from a node-green**; **and this unit's REALM is `P-1`'s — `intent/parked` until that park lifts** |
| **`P7` — gates 7/8, proofreader + per-unit documentation review** | **the proofreader audits the docs against the code; the documentation reviewer reconciles the contract, the greens record and the active trackers against the build** | the green tree + the greens set + the trackers | the proofread's fixed cells · the review record | the documentation review is mandatory after the greens and runs per unit, never batched |
| **`P8` — gate 9, the trio and its additive fourth leg** | **the project's three checks plus the additive fourth leg, with the LAYER each covers stated — and the crate's own test run as a declared additional leg** | the frozen green tree | the commands' measured exit codes and figures, each with its layer | **a node-suite green is ENVELOPE-green, never `APP`-green** |
| **`P9` — the DONE row, the ledger move, the archival loop** | **the DONE row with its full content; the tracker/ledger move; the decisions/queue updates; the archival loop** — **AND, AS A CONDITION OF THIS UNIT'S `P9` CELL, THE TRACKER-LANDING RECONCILIATION `§7` BELOW NAMES FOR IT** | every gate's landed artifact | the DONE row · the moved ledger (`0 DONE / 1 open` → `1 DONE / 0 open`) · the reconciled trackers | **the architect admits ROWS, not a pass**; **and the `DONE` row MUST cite this unit's gate-4 ADVERSARIAL PASS AND ITS FINDINGS** (`§7`) |

**THE PHASES' `BLOCKED-BY` CELLS, RECONCILED.** **The proposal-stage plan's `BLOCKED-BY` sets named union
rows of the gate-1 union; the gate's operative state is `35` blocking = `7` store-side + `28` parked
(`R: §17.5`), and the `7` store-side rows are ALL gate-2 `DECLARED-DEFAULT` CARRIAGE** (`R: §17.5`'s own
words: *"NOT ONE UNION ROW HAS BLOCKED THE DELEGABLE WORD"*). **THEREFORE, RECONCILED:**

| Phase | What blocks it now | What does NOT block it |
| --- | --- | --- |
| **`P1`** | **nothing** — the go-ahead is recorded (`P: §16 · A39`) and every residual entered this contract as a reversible default | — |
| **`P2`/`P3`** | **the REALM and the builder/ABI path are `P-1`'s, and *a red set is never authored against an unruled carrier, realm or boundary*** (`R: §17.4` condition 4, `AR-17`/`AR-30`) — **so the red set's `crate/**` work is `intent/parked` on `P-1`'s lift** — **AND THE PARK'S CELL IS READ NARROWLY, RECONCILED AT THIS PART'S `§1.1`: what is parked is the `crate/**` CROSSING work (the realm, the host handoff, the load path), NOT the red set's AUTHORING; the red set at `tests/**` crosses no realm, no boundary, no host and no load path, and drives only the store-side surface the parks' boundary block does not hold, so its authoring and its RUN proceed and only the crate's arrival is awaited** | **the `7` store-side rows and every `J`-residual do NOT block: they are this contract's `DD` rows** (`R: §17.4` condition 1) |
| **`P6`** | **the realm, again — the determination cannot be written before the realm is ruled: `intent/parked` on `P-1`** | — |
| **`P4`, `P5`, `P7`, `P8`, `P9`** | inherit their predecessor's | — |

**AND ONE PARK IS NAMED IN THE PLAN'S OWN TEXT SO NO PHASE READS IT AS A TASK:** **the LISTENER
IMPLEMENTATION (`docs/pending.md` `P-3`) is not a phase, not a red-set row and not a step of this plan.** **The
store-side duties it does NOT hold — the registration surface, the list's production and its return, and the
selection rule — ARE this contract's clauses and are red-set work** (`R: §17.1`; `§6.2`, `§6.5`).
`[R: §17.1 · §17.4 · §17.5; T: the reconciliation | CONTRACT]`

## §4. THE ACCEPTANCE CRITERION — DONE, and NOT done, each item bound to this contract

**THE PRIMARY ACCEPTANCE LAYER, NAMED FIRST BECAUSE THE RULING NAMES IT FIRST:** **the WRITE→READ ROUND
TRIP, TESTED IN ISOLATION** — *"Test write→read consistency in isolation"* (`P: §9 · A3`). **This unit's
primary property is `contract.md §5.2 · P-IM-1`, and a green claimed against an assembled host application
instead of the isolation suite is a FAILURE** (`R: §17.4`; `[P: §9 · A3 | CONTRACT]`).

**DONE REQUIRES ALL OF THE FOLLOWING, each item now bound to the contract clause that makes it
checkable** (`[T: the criterion's form; every `§` pointer resolves into this contract directory | CONTRACT]`):

| # | The item | The contract clause that makes it observable |
| --- | --- | --- |
| 1 | the architect's go-ahead is recorded, and the gate-1 record exists with its required semantics block | **`contract.md`'s status block** (the go-ahead recorded as `A39`; the record filed) |
| 2 | no union row `CARRIED-OPEN` and no non-`ANSWERED` dossier entry remains | **`contract.md §0.2`** — every residual is a `DD` row, **`31`** of them (**`24 + 3 + 2 + 1 + 1 = 31`**: the table's own as-filed arithmetic at `§0.2` (`30` rows after this contract's fourth bounded amendment) **plus `DD-31`, added at its fifth bounded amendment carrying the read's assembly-scope reading** — **⟶ RECONCILED 2026-10-11: this cell's as-filed form read *"`30` of them (`24 + 3 + 2 + 1 = 30`, the table's own arithmetic at `§0.2`, after this contract's fourth bounded amendment added `DD-30` — the delete's renumbering of a `VEC`'s surviving index keys)"*, and the figure stands corrected to the `31` the table now carries**), each with its alternative priced and each with a reversal instrument that is never a park. **⟶ RECONCILED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; BOTH CELLS ABOVE — the as-filed `30` and the `⟶ RECONCILED` `31` — STAND BYTE-FOR-BYTE, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THIS ROW'S FIGURE)** (`RCA-8(d)` ANNOTATE-BESIDE; `contract.md §0.2`'s own foot-of-section census, which is the figure this row counts): **THE AS-FILED CELLS THIS CLAUSE SUPERSEDES READ, IN THEIR OWN WORDS:** *"every residual is a `DD` row, **`31`** of them (**`24 + 3 + 2 + 1 + 1 = 31`**: the table's own as-filed arithmetic at `§0.2` (`30` rows after this contract's fourth bounded amendment) **plus `DD-31`** …)"*. **THE `DD` TABLE HAS SINCE REACHED `DD-45`, SO THIS ROW'S FIGURE MOVES WITH IT: the table carries `45` rows — `DD-1`…`DD-24` (`24`, the as-filed set) + `DD-25`…`DD-27` (`3`, the second bounded amendment) + `DD-28`/`DD-29` (`2`, the third) + `DD-30` (`1`, the fourth) + `DD-31` (`1`, the fifth) + `DD-32`…`DD-40` (`9`, the sixth — the listener amendment) + `DD-41`…`DD-45` (`5`, the seventh — the correction pass the gate-4 adversarial pass's findings opened) — so `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` ✓, which is the arithmetic `contract.md §0.2`'s own dated census clause prints with its terms.** **AND THE ROW'S OWN TEST — *"each with its alternative priced and each with a reversal instrument that is never a park"* — HOLDS OF ALL `45`: `§0.2`'s census clause reads *"every row of the `45` carries an `alt` cell with a price and a reversal cell naming an instrument, no reversal cell naming a park"*, and the park rule's consequence (`contract.md §0.1`'s preamble, `CL-3`) is read at `DD-23` and at `DD-39`'s own cells.** **NO OTHER CELL OF THIS ROW MOVES, `0` rows gain or lose an `alt` cell, and the register's `8 ≤ 8` and the fail set's `15` are untouched by this clause** (`[T: this row's figure, restated with its terms at the proofreading gate | CENSUS]`) |
| 3 | **the carrier is ruled and the boundary's value taxonomy, failure channel and resolver return are declared as clauses** | **`contract.md §2.1`**, **`§4.1`**, **`§8.3`**, **`store-model.md §1.4`** (the taxonomy) — **and the REALM is `P-1`'s, so this item is `intent/parked` until that park lifts** |
| 4 | the contract is a **pattern-C directory** with its closure predicate holding and one `derivation:` clause | **`contract.md`'s index region** and its closure line (`5 = 5`, state `CLOSED`) |
| 5 | the typed register exists, uses the `P-*` vocabulary, is `≤ 8` rows, and carries a failable row per named interaction | **`contract.md §5.2`–`§5.9`** (`8` rows after this contract's first bounded amendment — the former `P-TP-5` merged into the surviving row `P-SM-4`; **and `P-IM-3`, the one row the discharge declared WITHOUT a row body, is authored at `§5.5` at the second bounded amendment, with `§5.5.1` the merged row's pointer**; the cap breach is declared at **`§0.1` item 5** and its discharge is recorded there, dated **2026-10-11**) — **the interaction map stands at `§5.9`** |
| 6 | every candidate property the gate raised has a disposition | **`contract.md §10.3`** — the subject-level dispositions are landed, and **the id-level mapping is `OWED`** |
| 7 | the red set was authored from the contract alone, RUN, and its failing set REPORTED before implementation; the register's layer EXECUTED with every row printing its strategy id and verdict and `un-run` a failure | **`contract.md §5.2`–`§5.9`** — each row's `strategy` cell names its strategy id |
| 8 | the green is the least code that turns exactly that red set green, inside the declared scope | **`contract.md §1`**'s declared scope; **this part's `§1`** |
| 9 | the adversarial pass ran read-only, every finding carries ONE recorded disposition, package findings are catalogued and never patched | — (the plan's own `§P.3` `P4` row) |
| 10 | the greens set was authored AND run by an agent who did not implement | — (the plan's own `§P.3` `P5` row) |
| 11 | the live determination is WRITTEN with its evidence and its falsifier | — **`intent/parked` on the realm (`P-1`)** |
| 12 | the proofread and the per-unit documentation review ran, and the contract, the greens record and the trackers were reconciled to the build in that same pass | — (the plan's own `§P.3` `P7` row) |
| 13 | the trio is green, the fourth leg is green wherever owed, the crate's own test leg is green, **and every verification's LAYER is stated — with no `APP`-green reported from a node-green** | — (the plan's own `§P.3` `P8` row; `R: §17.4` condition 4) |
| 14 | a commit exists at every gate boundary that changed files | — (the plan's own `§P.3` commit block) |
| 15 | the DONE row carries every field the plan lists, and the ledger move was taken by the architect | — (`R: §17.4`: *"no unit row is admitted … and no ledger count moves"*) |

**IT IS NOT DONE IF** (the plan's own `§P.4` list, unchanged, each bound where this contract can bind it)
— **in particular these five, which this contract can now make mechanical:** **an un-run register row
reported as a pass** (**`contract.md §5.2`–`§5.9`** — `un-run` is a failure); **the greens set authored by
the implementer without a blind re-run**; **a finding left a bare `OWED`** (**`contract.md §0.2`** — every
`OWED` in this directory names an owner and a positive revisit condition); **a leg red, or a layer unstated,
or an `APP`-green reported from a node-green**; **a diff reaching outside the declared scope — including
into the adjacent project, another unit's test file, or a tracker** (`contract.md §1`'s NOT-touched set,
first member absolute); **a red set authored or run after the implementation**; **`crate/**` reached before
the realm ruling lands** (`intent/parked` on `P-1`); **the plan's own bytes overwritten instead of
reconciled** (this part's own form).
`[T: the criterion's items; the plan's §P.3/§P.4 cited through this part | CONTRACT]`

## §5. THE STOP CONDITIONS, RECONCILED

**A stop is a RETURN TO THE ARCHITECT in the concrete form the process requires** (what is blocked · the
evidence · two or three options with a recommendation · what each blocks) — **never a silent widening and
never a second question about a ruling already recorded** (`[T: the plan's §P.5 own bound | CONTRACT]`).
**This contract's own additions to that list, each already a clause:**

| # | The stop | Its home |
| --- | --- | --- |
| A | **a step takes its input from a later stage of the adopted order** | `contract.md §2`'s build-order map (this part) |
| B | **a row whose only ground was an adjacent-project clause is treated as answered or derivable** | `contract.md §0.1` item 4; **no clause of this directory cites that corpus as authority** |
| C | **a host-wiring step is proposed, or an integration or listener question is put while a park stands** | `contract.md §10.2`'s prohibited set, rows 1–3 |
| D | **a park is read as a closure, or a pass lifts a park** | `contract.md §10.1` and the parks' boundary block (`seams-and-lifecycle.md`) |
| E | **a `DD` row is reversed by a later pass's preference rather than by a ruling or a bounded amendment** | `contract.md §0.2`'s reversal-point clause |

`[R: §17.4; T: the reconciled stop list | CONTRACT]`

## §6. What this part does NOT do

1. **It starts no cycle.** No red set is delegated, no implementer is dispatched, no leg is run, no gate is
   entered.
2. **It admits no unit row and moves no ledger count** (`docs/next-steps.md` `0 DONE / 1 open` UNITS = `1`).
3. **It executes no register row** — the register is contract text, and its execution is the red set's.
4. **It authors no claim the contract does not carry**, and **no `§`-number, no `DD` row, no `PAR` row and
   no `P-*` register row** beyond the plan's own two.
5. **It takes no ruling** — where a step depends on a park, its cell says `intent/parked` and names the park.
6. **It touches no byte of any other project** — in particular none of `../Provident-Electron/**`.
7. **It does not overwrite the proposal-stage plan's bytes** — the reconciliation is this part's, and the
   original file stands annotated (`§1`).
8. **It decides no decomposition** — the gate-1 record's row already carries it, and this part reads it.

`[T: this part's own bound | NEGATIVE]`

## §7. THE TRACKER-LANDING RECONCILIATION THIS UNIT OWES — the cells that are STALE, and the `DONE` row's own content condition

**WHY THIS SECTION IS IN THIS PART AND NOT IN A TRACKER.** **The gate-4 adversarial pass found three tracked
cells STALE, and ITS OWN EDIT SCOPE PUTS THEM OUTSIDE THIS DIRECTORY:** `docs/{next-steps,decisions,pending,
defects}.md` are written **by the GATES** (`P0`, `P4`, `P7`, `P9`), while **this part and the contract
document may write nothing but `docs/specs/storeroom-native/**`.** **So the reconciliation is recorded HERE
as a NAMED DUTY with its cells quoted, and is not performed by a pass whose scope excludes it** (`[T: the
duty's carriage, taken at this contract's third bounded amendment, per the gate-4 adversarial pass's `S-11`
| OWED]`). **IT IS A PLAN STEP AND A POINTER, NEVER A CONTRACT CLAIM, and it takes no tracker's count.**

**THE THREE STALE CELLS, EACH QUOTED SO THE LANDING PASS RECONCILES THE BYTES IT WILL FIND:**

| # | The path, the cell, and its STALE text | What the record contradicts it with |
| --- | --- | --- |
| **1** | `docs/next-steps.md`'s **live-ledger line** — *"no contract, no code, no test and no `crate/**` byte exists… this project has run exactly one gate so far, and it did NOT pass it"* | the contract directory EXISTS (`docs/specs/storeroom-native/` · `5 = 5`, state `CLOSED`), the crate and the red set exist, and the record's `L-19`/`L-20` carry the dated `⟶ AMENDED` clauses that record **gate 1 PASSED**, gate 2 landed and gate 3 green |
| **2** | `docs/next-steps.md`'s **`N1` headline cell** — *"GATE 1 RUN AND NOT PASSED — … go-ahead WITHHELD"* | the same `L-19`/`L-20` clauses, and the gate-1 record's closing determination `APPROVE-WITH-CONDITIONS` · `DELEGABLE` with the go-ahead recorded as `A39` |
| **3** | `docs/pending.md`'s **`G-1` `Status` cell** — *"`OPEN` … AND THE GO-AHEAD IS WITHHELD"* | `G-1`'s own *"⟶ DISCHARGED 2026-10-11: BOTH CONJUNCTS ARE SATISFIED"* clause, whose second conjunct is `A39` |

**THE FORWARD CONDITION THIS GATE OWNS, RECORDED AS BINDING ON THE `P9` CELL (§3's own table):** **the
`DONE` section is EMPTY at gate 4 — correct at this gate — and the row that lands there MUST cite THIS
pass, the gate-4 ADVERSARIAL PASS and its findings**, because the tracker's own note already requires a DONE
row to carry *"its red set, green count, adversarial findings, blind-greens result, doc-review pass and trio
result"*. **The three stale cells above are reconciled in the SAME landing pass that lands the `DONE` row.**

**AND THE LANDING PASS IS NAMED, SO NO CELL OF THIS SECTION IS LEFT AS A BARE OWED:** **owner: the
supervisor's tracker-landing pass (with this contract directory where the reconciled text is itself a
contract byte); positive revisit condition: the four trackers are reconciled to `L-19`/`L-20`, gate 2, gate 3
and this gate's findings, and the `DONE` row cites this adversarial pass.** **NO COUNT MOVES BY THIS
SECTION: `docs/next-steps.md` stands `0 DONE / 1 open` UNITS = `1` until the architect admits a row**
(`[T: the duty, its cells and its owner, so no stale figure survives silently | OWED]`).

---

**END OF THE `implementation-plan` PART.** **Its authored content is `§1`–`§6` above — the declared edit
scope and NOT-touched set, the build-order map, the dated reconciled phase table and acceptance criterion,
the reconciled stop conditions and the bound — and every one of those is a plan step or a pointer, never a
new pinnable claim.** **The proposal-stage plan's own body stands at
`docs/specs/storeroom-native-implementation-plan.md`, reconciled and dated, never overwritten.**

---

**⟶ APPENDED 2026-10-11 (THE SUPERVISOR'S LANDING OF THE LISTENER AMENDMENT'S PLAN REGION — `RCA-8(d)` ANNOTATE-BESIDE: the part's bytes above stand, and the region below is the amendment's own plan, filed here so the contract directory's closure predicate holds at `5 = 5`).** **It is a PLAN REGION, never a contract claim: no behaviour clause, no signature, no return shape and no fail-state is asserted by it, it admits no unit row, moves no ledger count and lifts no park.**

## §8. THE LISTENER AMENDMENT'S PLAN — the phase table, the declared edit scope, the acceptance criterion, the stop conditions and the pointer index (dated 2026-10-11; the amendment's plan region)

**WHAT THIS REGION IS.** **It is the proposal-stage plan region for the listener work, filed under this unit's §C determination that the work is a BOUNDED AMENDMENT of this contract directory and not a successor unit.** **It states PROSPECTIVE PLAN STEPS: what will be built, in what order, and verified how.** **Every step below is a PLAN STEP and never a contract claim; no behaviour clause, no signature, no return shape and no fail-state is asserted anywhere in it.** **It admits no unit row, moves no ledger count, executes no register row, writes no `src/**` or `tests/**` byte, lifts no park and takes no ruling.** **It is reconciled to the amendment's own contract clauses when that amendment lands; until then its cells carry the shipped contract's `§`-numbers where the subject already stands there.**

**WHY IT SITS HERE AND NOT IN A NEW DIRECTORY.** **One unit id, one contract directory, one register (at its `≤ 8` cap), one red set at `tests/**`, one crate at the repository root, one `DONE` row** — the layout this part's `§1.1` fixes for ONE unit. **A second directory would need a second crate path and a second red-set path; that is a layout change to this unit, not a boundary.** **The listener's own surface (the alerted list's order, the attachment rule, the firing and callback invocation, and a throwing body) is `docs/pending.md` `P-3`'s and is NOT a phase, NOT a red-set row and NOT a step of this plan.**

### §8.1 THE DECLARED EDIT SCOPE — the paths this amendment may write, with the phase that may write each

| # | Path | What the amendment may do there | The phase that may write it |
| --- | --- | --- | --- |
| **1** | `docs/specs/storeroom-native/contract.md` + its declared parts (`store-model.md` · `write-and-read.md` · `parameter-semantics.md` · `implementation-plan.md` · `seams-and-lifecycle.md`) | **amended**: dated `⟶` clauses beside the sites that move, and — only where a member, a spelling or a returned shape moves — the clause itself | **`A1`** |
| **2** | this part (`implementation-plan.md`) | **this region's own reconciliation**, dated | **`A1`** |
| **3** | `tests/**` | **new files only**: the amendment's red rows, authored from the contract alone. **No existing file is rewritten and no assertion is weakened** | **`A2`** |
| **4** | `Cargo.toml` · `src/**` | the least code that turns exactly the amendment's red set green, inside the declared scope | **`A3`** |
| **5** | the four trackers `docs/{next-steps,decisions,pending,defects}.md` | **by the GATES only** — never by the build: the row admissions, the reconciled cells and the defect rows | **`A0`, `A4`, `A7`, `A9`** |
| **6** | `archive/**` (gitignored) | each gate's own report and record, in the pass that authors it | **`A2`…`A8`** |
| **7** | `docs/specs/storeroom-native-adoption-dossier.md` · the listener proposal's gate-1 record `docs/specs/storeroom-listeners-proposal-review.md` | **authored by STEP 0 / the gate-1 pass** — never by this plan's author; the gate-1 record carries the union, the row and the Semantics block | **`A0`** |

**A tracked-file edit outside every path above — and any write under `../Provident-Electron/**` — is out of scope and stays this plan's `NOT-touched` failure.**

### §8.2 THE NOT-TOUCHED SET (a step out of it is a failure at any phase, by any role)

| # | Not touched |
| --- | --- |
| **1** | **`../Provident-Electron/**` — IN FULL, EVERY BYTE.** The corpus, its landed store, its tests, its trackers, its gate records, its `archive/**`, its `AGENTS.md` and its `src/**`. **A finding against that project is a `HO-` row, never a patch** |
| **2** | **`../Agent Harness/**`** — the process-rule specs are cited, never edited |
| **3** | **the shipped unit's red-set bytes** — `tests/**` is extended by new files and its existing files are **never rewritten**; **no assertion is weakened** |
| **4** | **the shipped unit's gate-1 step reports** under `archive/gate1/storeroom-native-review/` — closed records, never rewritten and never re-dispositioned |
| **5** | **`docs/specs/storeroom-native-proposal.md`** and the shipped gate-1 record `docs/specs/storeroom-native-proposal-review.md` — closed; the amendment's derivation is a dated clause BESIDE the shipped `derivation:` clause, **never a second one** |
| **6** | **the register's cap and every landed row id** beyond the merge the amendment declares |
| **7** | **`README.md` · `LICENSE` · `.gitignore`** — unchanged |
| **8** | **every path under `docs/specs/` outside the declared set** — a new spec path is a spec-gate event, not a plan step; and **every other project on the shared volume** |
| **9** | **any byte of a park's subject** — no firing, no order, no attachment rule, no callback invocation, no throwing body, and no integration question while `P-1`/`P-3` stand |

### §8.3 THE PHASE TABLE — phase · what it does · owner · input · output · the rule that authorizes it

| Phase | What it does | Owner | Its input | Its output | The rule that authorizes it |
| --- | --- | --- | --- | --- | --- |
| **`A0` — the determination, the record and the go-ahead request** | records the FORM determination with its eight consequence cells; authors the listener gate-1 record with the Semantics (STEP 0) block, the union and the row; requests the architect's go-ahead; holds the pause | `role_change_analysis` (step 4), the supervisor's landing pass | `docs/specs/storeroom-listeners-proposal.md`; this pass's report; the two step reports | the gate-1 record; the dossier or its zero-row rationale; the tracker row | the four-step chain and gate 1's existing pause; `P-3`'s boundary and `G-2`'s no-deferral rule |
| **`A1` — the amendment's spec region** | lands the amendment's dated clauses: the one-home declaration, the identity surface (an id's `PAR` row, if any), the persistence/lifetime declaration, and any member, spelling or returned-shape change with its alternative priced; keeps the register at `8 ≤ 8` by merging where a row is added | `role_spec_writer` | the gate-1 record + the architect's rulings + the shipped contract directory | the amended `contract.md` + the parts, and this plan reconciled and dated | the contract's own amendment instrument (`§0.1` item 5); the naming/layout clauses (`§0.4`, `§1.1` of this part); the adopted build order |
| **`A2` — the red set** | authors the amendment's rows **from the contract alone**, RUNS them, and REPORTS the failing set **before any implementation**; re-runs the shipped red set and the register's executed layer | `role_test_writer` | the amended contract directory, whole | new files under `tests/**`; the reported failing set; the register layer's executed rows; the gate's report | **RED BEFORE GREEN**; and the park's boundary — a row that drives the listener's own surface FAILS |
| **`A3` — the green** | the least code that turns exactly that red set green, inside the declared scope | `role_implementer` | the reported red set + the declared scope | `Cargo.toml` + `src/**` (one crate, at the root) | least code to green, after the red set is reported |
| **`A4` — the adversarial pass + the register's read-only audit** | attacks the green read-only; audits the register row by row; every finding gets ONE recorded disposition; a package defect is catalogued, never patched | `role_adversarial_reviewer` | the green tree + the executed register | the gate's findings record; the layer-honesty regions filled | the adversarial pass is mandatory per completed unit |
| **`A5` — the blind greens** | authors **and runs** a set from the docs alone, against the crate as a consumer, by an agent who did **not** implement | `role_blind_test_writer` | the delivered docs + the green tree | the amendment's greens record with per-scenario pass/fail | a greens set authored by the implementer without a blind re-run is a finding |
| **`A6` — the live determination** | writes whether this amendment triggers the live battery, with its evidence and its falsifier — **`intent/parked` on `P-1`** | `role_live_scenario_runner` | the declared change set + the host's realms (parked) | the recorded determination or the run's structured report | no `APP`-green may be reported from a node-green; the realm is `P-1`'s |
| **`A7` — the proofread + the per-unit documentation review** | the proofreader audits the docs against the code; the documentation reviewer reconciles the contract, the greens record and the trackers against the build, per unit, in the same pass | `role_proofreader` + `role_documentation_reviewer` | the green tree + the greens record + the trackers | the proofread's fixed cells; the review record | both are mandatory and run per unit, never batched |
| **`A8` — the trio and the crate's own leg** | the project's three checks plus the additive fourth leg, each with the LAYER it covers stated, and the crate's own test run as a declared additional leg | the supervisor's validation trio | the frozen green tree | the commands' measured exit codes and figures, each with its layer | a node-suite green is ENVELOPE-green, never `APP`-green |
| **`A9` — the amortised row, the ledger and the archival loop** | amends the shipped `DONE` row's cells **in place** with dated re-measures and their layers; reconciles the tracker cells; lands the archival loop — **and moves no ledger count** | the supervisor's landing pass (the row's admission is the ARCHITECT'S) | every gate's landed artifact | the amended `DONE` row · the reconciled trackers · the archival record | the architect admits ROWS, not a pass; and the row must cite this amendment's adversarial pass and its findings |

**⟶ AMENDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
*"Apply narrowed c"*: THE `A8` ROW'S OWN CELL, READ AT THIS CELL SO NO READER OF THE PHASE TABLE STOPS
WITHOUT THE LEG.** `RCA-8(d)` ANNOTATE-BESIDE: **the `A8` row above stands BYTE-FOR-BYTE and is read
THROUGH this clause; THIS clause is a PURE INSERTION, it adds no phase, moves no `BLOCKED-BY` cell and
takes no ruling.** **THE TRIO THE `A8` ROW NAMES NOW CARRIES ONE ADDED, NARROWED LEG — TWO COMMANDS, ONE
PER CRATE, EACH GATING THE `clippy::correctness` GROUP ON THAT CRATE'S TEST TARGETS:**
**`cargo clippy --offline --tests -- -D clippy::correctness` addresses THE STORE CRATE at the repository
root, and `cargo clippy --manifest-path bindings/js/Cargo.toml --offline --tests -- -D clippy::correctness`
addresses THE SIBLING CRATE, its manifest named explicitly so the resolution cannot become the root
package's.** **A NON-ZERO EXIT FROM EITHER COMMAND FAILS THE TRIO — so `A8` is green only when BOTH exit
`0` — and both legs' subject is their own crate's TEST TARGETS, so both are `ENVELOPE/PURE`-green and
neither claims an `APP`-green.** **THE LEG'S FULL DECLARATION — the narrowing's reason and its measurement,
the `allow` admissibility rules and the NOTE FOR A FUTURE AUTHOR — stands at `§8.5`'s dated clause of this
date, which is the ONE HOME of the trio's definition; the sibling crate's own half, with its layer label and
its pointer back to that home, stands at `docs/specs/storeroom-js/acceptance.md` `§4.1`'s dated clause of this
date** (`[A1: the architect's ruling *"Apply narrowed c"*, as `docs/next-steps.md`'s `## NON-UNIT ROWS` row
of this date records it | requirement]`).

### §8.4 THE BLOCKED-BY CELLS — every phase the open rows block, marked

| Phase | What blocks it now | What does NOT block it |
| --- | --- | --- |
| **`A0`** | **nothing for the determination**; the **go-ahead** is the architect's separate act, and the park `P-3` stands `OPEN` | — |
| **`A1`** | **the architect's go-ahead; `U4`, `U5`, `U6`, `U7`, `U9`, `U11`, `U19`, `U25` (`ANSWERED-BY-NOTHING`) are carried to him and are not this pass's to answer; and the listener's own surface is `intent/parked`** | **the `13` `DERIVABLE` and `4` `MOOT` rows: they bind the FORM and are answered by named in-repo artifacts** |
| **`A2`** | **`A1`; and the park's boundary — the listener's own surface may not be driven** | **the store-side rows: the shipped `S-WATCH` selection rule, its tier test, its idempotence, and the boot's declared answer are all drivable today** |
| **`A3`** | **`A2`** | — |
| **`A4`** | **`A3`** | — |
| **`A5`** | **`A1` + `A3`** | — |
| **`A6`** | **the realm: `intent/parked` on `P-1`** | — |
| **`A7`, `A8`, `A9`** | **their predecessors; and `A9`'s row admission is the architect's** | — |

### §8.5 THE ACCEPTANCE CRITERION — and what makes it NOT done

**DONE REQUIRES ALL OF THE FOLLOWING, each bound where this directory can bind it.**

**⟶ THE TRIO'S DEFINITION LIVES IN THIS SECTION, AND IT IS ONE HOME: `§8.3`'s `A8` row's *"the trio"* means
the THREE CHECKS THIS SECTION'S OWN DATED CLAUSE NAMES PLUS THE ADDED LEG IT DECLARES, and every other cell
of this directory — and every cell of any other directory — that says *"the trio"* points at that clause
for its members rather than restating them** (`[T: the trio's members, declared once in this directory so
no cell enumerates a trio of its own | CONTRACT]`). **The three checks it inherits are `cargo build`,
`cargo clippy` and `cargo fmt --check`, each taken on both crates; the added leg and its two commands stand
in the dated clause at this section's foot.**

**THE LEG, MEASURED AND GREEN — TWO COMMANDS, ONE PER CRATE, EACH NAMING THE PACKAGE IT ADDRESSES:**

```
cargo clippy --offline --tests -- -D clippy::correctness                                   # the STORE crate
cargo clippy --manifest-path bindings/js/Cargo.toml --offline --tests -- -D clippy::correctness  # the SIBLING crate
```

**THE FIRST COMMAND ADDRESSES THE STORE CRATE** — **this unit's own package at the repository root, whose id
is `storeroom_native` (`§1.1` item 2), taken at the repository root with NO manifest flag, so what it
resolves is the root package and nothing else.** **THE SECOND COMMAND ADDRESSES THE SIBLING CRATE** — **the
independent JS-boundary crate under `bindings/js/`, whose manifest is named explicitly so the resolution
cannot become the root package's.** **BOTH ARE TAKEN AT THE REPOSITORY ROOT.** **A NON-ZERO EXIT FROM EITHER
COMMAND FAILS THE TRIO** — **both are legs of a gate and neither is a report** — **and `§8.5` item `11` is
read with this: the trio is green only when BOTH commands exit `0`.** **AND THE LAYER EACH COVERS IS STATED
SO NO READING RUNS THEM TOGETHER: each command's subject is ITS OWN CRATE'S TEST TARGETS — a `cargo clippy
--tests` invocation covers that crate's test targets and the library they test — so both legs are
`ENVELOPE/PURE`-green and NEITHER claims an `APP`-green, exactly as the `A8` row's own rule requires.**

**WHY THE LEG IS NARROWED RATHER THAN `-D warnings`, STATED WITH THE MEASUREMENT THAT DECIDED IT, BECAUSE A
NARROWING OWES ITS REASON AT ITS OWN CELL.** **Measured at the leg's adoption, the `--tests` clippy surface
carried `36` diagnostics — and `34` of them are style or performance PREFERENCE, or rustc built-ins
`cargo test` ALREADY PRINTS from `tests/**`: `7` blocks of `unused_imports`, `3` `unused_mut`, and
`2` `non_snake_case`.** **Gating those would cost a cleanup pass AND an `allow` for every wire-spelled
member — friction with NO defect-finding gain, and an `allow` per member would write exactly the kind of
blanket silence this clause refuses below.** **WHEREAS THE `clippy::correctness` GROUP IS THE CLASS THAT
WOULD MATTER — the group whose members flag code that is wrong rather than merely unfashionable — and it
costs nothing today: so the narrow gate buys the class that matters AT ZERO PRESENT COST.**

**AND THE LEG FIRED ON ADOPTION, WHICH IS THE EVIDENCE THAT IT IS A TRIPWIRE AND NOT A FORMALITY:** **the
root crate's `clippy::correctness` population measured `2` — both `clippy::approx_constant`, on π literals
in the JSON round-trip battery (`tests/e2e_json_round_trip.rs`), both FALSE POSITIVES because the literal IS
the assertion's subject — while the sibling crate's population measured `0`.** **Both root sites are
silenced by a TARGETED `#[allow]` that carries its reason at its own cell, and the gate now exits `0` on
both crates.** **TWO RULES ARE ADMISSIBLE AND BIND THE LEG'S OWN MAINTENANCE: NO CRATE-LEVEL AND NO
MODULE-LEVEL `allow` IS ADMISSIBLE under this ruling; and NO LINT IS OBEYED WHERE OBEYING IT WOULD DEFEAT A
CELL** — an `allow` at crate or module scope would silence the group the leg exists to gate, and a cell
whose literal (or whose spelling, or whose order) IS its own subject may not be rewritten to satisfy a
lint.** **A THIRD SITE OF EITHER KIND IS A FINDING AT THE TRIO'S OWN GATE AND NOT A CLEANUP.** **AND ONE
CORRECTION THE ADOPTION PRODUCED, NAMED SO A LATER READER DOES NOT RE-DERIVE IT: the count of
correctness-class hits was first read as `0` — a GREP ARTIFACT, because the group's name never appears in
the diagnostic text — and the true count is `2`; the isolation instrument is
`-A clippy::all -W clippy::correctness`** (`docs/next-steps.md`, its `## NON-UNIT ROWS` section's dated
clause of this date — THE TRACKER, WHICH CARRIES THE RULING AND ITS MEASUREMENTS AND IS NOT A CONTRACT
DIRECTORY; it is cited as the record of the ruling, and the declaration above is what MAKES the leg a cell
of this directory's validation) (**[A1: the architect's ruling *"Apply narrowed c"*, as `docs/next-steps.md`'s
non-unit row of this date records it | CONTRACT]**; the measurement itself is not re-derived here and no
`M`-tag is claimed for it).
**THE SIBLING CRATE'S HALF OF THE SAME DECLARATION STANDS AT
`docs/specs/storeroom-js/acceptance.md` `§4.1`'s dated clause of this date, which declares that crate's
command, its `ENVELOPE/PURE` layer label and its pointer back to this clause as the ONE HOME of the trio's
definition; and `docs/specs/storeroom-js/implementation-plan.md` `§4`'s `Q8` row is read with it.**

**A NOTE FOR A FUTURE AUTHOR — A NOTE, AND NOT A RULE OF THIS CONTRACT: rustc IGNORES AN `#[allow]` WRITTEN
ON AN ITEM-POSITION `macro_rules!` INVOCATION.** **Probe-measured, rustc answers `unused_attributes` —
*"the built-in attribute `allow` will be ignored, since it's applied to the macro invocation"* — and the
lint fires anyway, because the lint level governing an expanded literal is the level of the generated
item's scope.** **THEREFORE A TARGETED ALLOW MUST TRAVEL THROUGH THE MACRO: the JSON round-trip battery's
`rt_case!` gained an ASTERISK-QUANTIFIED ATTRIBUTE SLOT that forwards the attribute to the cell it
generates — and because `*` admits ZERO attributes, EVERY OTHER CELL OF THAT BATTERY EXPANDS
BYTE-IDENTICALLY to what it expanded to before the slot existed.** **This is recorded because a later author
would otherwise re-derive it; it obliges no leg, adds no `allow`, moves no figure, and is not contract
text** (`[T: the rustc behaviour, recorded as a NOTE for a future author and never as a rule of the contract
| OBSERVATION]`).

**AND THE FAILURE CLASS, NAMED SO THE ITEM THAT OWES THIS LEG IS CHECKABLE:** **a non-zero exit from EITHER
command, a leg reported without its crate, a leg reported without its layer, a crate-level or module-level
`allow` added to silence the group, a lint obeyed where obeying it defeats a cell, or a green claimed for a
crate the command did not address — EACH is the `§8.5` `IT IS NOT DONE IF` clause's *"a figure moved without a
dated re-measure or a layer"* or its *"an `APP`-green was claimed from a node-green"* read at this leg, and
each FAILS the trio** (`[T: the failure class | NEGATIVE]`).

| # | The item | What makes it checkable |
| --- | --- | --- |
| **1** | the architect's go-ahead is recorded, and the gate-1 record exists with its Semantics block, the union and the `decomposition` row | the listener gate-1 record's own status block |
| **2** | the FORM determination is recorded with its eight consequence cells, and no unit row is admitted and no count moved by it | that record's determination clause; the ledger's live line |
| **3** | the amendment's clauses landed, **with the register at `≤ 8`** and any new row preceded by a merge in the same pass | the contract's register region and its cap arithmetic |
| **4** | the closure predicate still holds (`5 = 5`) or the file set and the map are reconciled in the same pass | the contract's index region |
| **5** | the red set was authored from the contract alone, RUN, and its failing set REPORTED before implementation; the shipped red set re-run; the register layer EXECUTED with every row printing its strategy id and verdict | the gate's red-set report |
| **6** | the green is the least code that turns exactly that red set green inside the declared scope | this part's `§8.1` |
| **7** | the adversarial pass ran read-only, every finding carries ONE disposition, package findings are catalogued and never patched | the gate's findings record |
| **8** | the blind greens were authored AND run by an agent who did not implement | the amendment's greens record |
| **9** | **no listener-surface behaviour was driven or reported green**, and no park was read as a closure or lifted | `P-3`'s boundary line, the greens record and the live determination |
| **10** | the proofread and the per-unit documentation review ran, and the contract, the greens record and the trackers were reconciled **in the same pass** | their records |
| **11** | the trio and the crate's own leg are green, and **every layer is stated** — with no `APP`-green reported from a node-green | the trio's measured figures |
| **12** | the shipped `DONE` row's cells are amended in place with dated re-measures, its own adversarial pass cited, and the row is **not re-opened** | `docs/next-steps.md`'s `## DONE` row |
| **13** | the stale tracker cells are reconciled and the new row stands **inside** `## OPEN`'s table | the trackers |

**IT IS NOT DONE IF:** a listener-surface row was authored or driven, an order or an attachment rule was ruled, or a throwing body was specified; a park was read as a closure, lifted, or named as a reversal instrument; a listener or integration question was put to the architect while a park stands; a per-node member was added without this directory's member and spelling tables moving in the same pass; a ninth register row was authored or a second register opened; a second `derivation:` clause was written; a second crate, a workspace member or a red set outside `tests/**` appeared; the red set was authored or run after the implementation; an existing red-set file was rewritten or an assertion weakened; a figure moved without a dated re-measure or a layer; an `APP`-green was claimed from a node-green; a citation points at a file, a row or an id that does not resolve in this repository (`DEF-16` included); a unit row was admitted or a ledger count moved by a pass. **AND THE LEG DECLARED AT THIS SECTION'S FOOT IS READ WITH THAT SENTENCE: a NON-ZERO EXIT from EITHER of its two commands fails the trio, and so does a leg reported without its crate or without its layer.**

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
*"Apply narrowed c"*: THE TRIO GAINS ONE NARROWED LEG, DECLARED AT THIS SECTION'S VALIDATION AND ACCEPTANCE
CELL (`§8.3`'s `A8` row and the two statements above — the cells that OWE the trio's green) AND AT NO OTHER
CELL.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of `§8.5` above and of the `§8.3` `A8` row stands
byte-for-byte and is read THROUGH this clause; THIS clause is a PURE INSERTION at the foot of `§8.5`, it
admits no unit row, moves no ledger count, executes no register row, lifts no park, writes no `src/**` or
`tests/**` byte, and re-measures no green of its own.**

**AND THE LEG'S OWN DECLARATION STANDS IN THIS SECTION — the `⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS …` clause and the `THE LEG, MEASURED AND GREEN …` statement beside it, both between this section's own definition paragraph and its `DONE` table — whose two commands, crate attributions, narrowing's reason and measurement, `allow` admissibility and NOTE FOR A FUTURE AUTHOR are read WITH `DONE` item `11` and with the `IT IS NOT DONE IF` sentence above.** **THIS FOOT CLAUSE DECLARES NOTHING NEW AND MOVES NO BYTE: it names, at the section's end, where the leg's declaration sits, so a reader who enters `§8.5` at `DONE` item `11` or at the `NOT DONE` sentence finds the leg without having to read the section backwards** (`[T: the leg's declaration's own place, named at this section's foot | CROSS-REF]`).

### §8.6 THE STOP CONDITIONS

**A stop is a RETURN TO THE ARCHITECT in the concrete form the process requires** — what is blocked · the evidence · two or three options with a recommendation · what each blocks. **It is never a silent widening and never a second question about a ruling already recorded.**

| # | The stop |
| --- | --- |
| **A** | a phase takes its input from a later phase of the adopted order (record shapes → the walk and resolver → the arms → tiers and purge → the journal and rollback → persistence) |
| **B** | a row whose only ground was an adjacent-project clause is treated as answered or derivable |
| **C** | a host-wiring step is proposed, or an integration or listener question is put while a park stands |
| **D** | a park is read as a closure, or a pass lifts a park |
| **E** | a `DD` row is reversed by a later pass's preference rather than by a ruling or a bounded amendment |
| **F** | a phase writes outside this region's declared edit scope, or reaches any member of the `NOT-touched` set |
| **G** | a citation is written to a path this repository does not carry, or to an id that does not resolve in it |
| **H** | an addition is proposed that no register row can fail, or a register row is added while the cap is full without the merge |

### §8.7 THE POINTER INDEX

| What this plan reads or owes | Its path |
| --- | --- |
| the artifact under review | `docs/specs/storeroom-listeners-proposal.md` |
| this amendment's gate-1 record (owed) | `docs/specs/storeroom-listeners-proposal-review.md` |
| the shipped contract directory (the surface this amendment moves) | `docs/specs/storeroom-native/` (`contract.md` + `5` parts) |
| the rulings this amendment obeys | `docs/specs/storeroom-native-proposal.md` (`A7`, `A13`, `A17`–`A21`, `A25`, `A27`, `A33`, `A34`, `A37`, `A38`) · `docs/decisions.md` |
| the two parks and the standing conditions | `docs/pending.md` (`P-1`, `P-2`, `P-3`, `G-1`, `G-2`) |
| the ledger and the `DONE` row this amendment amends | `docs/next-steps.md` |
| the defect list the `DEF-16` condition resolves to | `docs/defects.md` |
| the shipped red set, green, findings and greens record | `archive/gate3/storeroom-native-red-set.md` · `archive/gate4/storeroom-native-adversarial.md` · `docs/specs/storeroom-native-greens.md` |
**END OF THE AMENDMENT'S PLAN REGION.**

---

**⟶ RECONCILED 2026-10-11 — THE AMENDMENT'S PLAN REGION'S OWN RECONCILIATION, DATED, AT THIS PART'S `§8`
(`RCA-8(d)` ANNOTATE-BESIDE: EVERY BYTE ABOVE STANDS; THIS CLAUSE RECONCILES THE PLAN TO THE AMENDMENT'S
LANDED CONTRACT CLAUSES, WHICH IS WHAT `A1`'S OWN ROW IN `§8.3` OWES.** **IT IS A PLAN REGION AND A POINTER
SET: NO BEHAVIOUR CLAUSE, NO SIGNATURE, NO RETURN SHAPE AND NO FAIL-STATE IS ASSERTED BY IT, it admits no
unit row, moves no ledger count, lifts no park, executes no register row and writes no `src/**` or
`tests/**` byte.**

**WHAT `A1` LANDED, BY PATH AND BY `§` — THE AMENDMENT'S OWN CLAUSES, SO THE PLAN'S POINTERS RESOLVE:**
**`docs/specs/storeroom-native/contract.md`** — the `§0.2` defaults table gains `DD-32`…`DD-40` with its
census reconciled to `40` (`24 + 3 + 2 + 1 + 1 + 9 = 40` ✓) — **⟶ RECONCILED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; THE AS-FILED CELL AND THE `⟶ RECONCILED` CLAUSE BESIDE IT STAND BYTE-FOR-BYTE, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE AMENDMENT'S OWN CENSUS FIGURE)** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell's own words are re-emitted here so nothing it read is lost**): **THE AS-FILED CELL READ:** *"the `§0.2` defaults table gains `DD-32`…`DD-40` with its census reconciled to `40` (`24 + 3 + 2 + 1 + 1 + 9 = 40` ✓)"*. **THAT FIGURE WAS THE LISTENER AMENDMENT'S OWN CENSUS AND IT HAS SINCE MOVED — `DD-41`…`DD-45` were added at this contract's SEVENTH bounded amendment (the correction pass the gate-4 adversarial pass's findings opened), so the table now carries `45` rows and the arithmetic this part's cell must print is `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` ✓, which is `contract.md §0.2`'s own foot-of-section census clause, printed with its terms, and the same figure the amended census clause beside this cell already carries.** 
**THE AMENDMENT'S OWN `9` ROWS `DD-32`…`DD-40` ARE UNMOVED AND NONE OF THEM IS RENUMBERED, DROPPED OR SUPERSEDED** — what moved is the TABLE'S TOTAL, not the amendment's contribution to it (`§4` item 2 of this part already carries the same correction at the acceptance criterion, and this clause makes the two cells agree)**. `§0.4`'s spelling table gains  **⟶ RECONCILED 2026-10-11 (THE SUPERVISOR'S LANDING OF THE GATE-4 SPEC FIX — `RCA-8(d)`: the as-filed cell stands and this clause is the operative figure): the `DD` table's census is `45` (`24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` ✓), the five new rows being `DD-41`…`DD-45` — `DD-41` the per-node listener index's materialization (declared OPTIONAL; `P-SM-4` (f) is conditional on it) · `DD-42` the handle-token collision (a minted token must not equal a held one) · `DD-43` the `VEC` index-range rule (`0 ≤ i ≤ n`; `i > n` → `ContainerKindConflict`) · `DD-44` the empty-address reference marker (non-colliding, true on the register's reference alone) · `DD-45` the reachability probe's decidable form.**
`ListenersArg`/`ListenerEntry`, `ListenerHandle`, `Listener`, and the amended `WriteResult`/`DeleteReceipt`
spellings, with `StoreConfig`'s third member; `§1.2`, `§1.6`, `§2.1`, `§3.6`, `§4.4`, `§5.3`, `§5.6`, `§5.8`,
`§5.9`, `§7.1`, **`§8.1` (the set at `15` members with `FilePathUnreachable` at rank `13`)**, `§8.2` (its
generator row) and `§9` (the index's three added rows); **`docs/specs/storeroom-native/store-model.md`** —
`§1.1`'s two member tables, `§1.2`'s register bound, `§1.5` item 4, `§1.6`'s items 3–4 (the parent anchor, the
carrier node and the conditional tier) and `§2.1`'s empty-address reference and consumer set;
**`docs/specs/storeroom-native/write-and-read.md`** — `§3.1.1`'s `listen` row and the `watch` row's
supersession, `§3.6`'s `triggered` member, `§4.3`/`§4.4`'s delete firing and receipt, and `§6.5`'s
supersession clause with items 8–13 (the home, the borrows and the two lists, the listener record and the
firing model, the returned members, the handle, the delta, and the parks' operative state);
**`docs/specs/storeroom-native/seams-and-lifecycle.md`** — the boot/lifetime block's item 8, `§7.1`'s
amended construction sequence and its amended table, and the parks' boundary block's operative state; and
**`docs/specs/storeroom-native/parameter-semantics.md`** — `PAR-6` amended, `PAR-8` and `PAR-9` re-pointed,
and the three rows `PAR-12`/`PAR-13`/`PAR-14` added with the part's census restated.
**AND THE FILE SET IS UNMOVED: the closure predicate reads `{part-map PART entries}` = `5` = `{files present
in docs/specs/storeroom-native/} − {contract.md}` = `5`, the `3` recorded omissions contributing to NEITHER
side — `5 = 5`, state `CLOSED`** (`contract.md §0.1` item 10(c); **no part is added, omitted or renamed by
this amendment, and `implementation-plan.md` is the fifth file it writes**).

**THE PROSPECTIVE PLAN STEPS THIS REGION DECLARED, AND WHAT IS NOW TRUE OF EACH — STATED AS PLAN STEPS AND
NEVER AS CONTRACT CLAIMS:** **`A1` is LANDED** (the clause region above) · **`A2` IS NOT STARTED: no red-set
byte was written by this pass, and the amendment's rows are the TestWriter's** — **and the SHIPPED red set's
re-derivation duty is NAMED, cell by cell: `tests/support/mod.rs`'s `CLOSED_CODES` (`[&str; 14]` → `15`
members, `FilePathUnreachable` at rank `13`), `tests/fail_codes.rs`'s `14`-member count assertions and its
per-member drives (a `15`th drive for the new member; `S-FAILSET`'s cells move `14 + 1` → `15 + 1`), and
`tests/watched_addresses.rs`'s `13` drives against the listener surface's re-derived `S-WATCH` (`6` cells,
of which the row's kept cell carries the two `watched`/`opId` drives)** · **`A3`–`A9` are unmoved and
un-started**, each with its own `§8.4` blocker and none by this pass. **THE SHIPPED `196`-TEST FIGURE IS
THEREFORE A FIGURE OF THE PRE-AMENDMENT TREE, and the moved figure owes a dated re-measure with its layer
stated** (`AR-14`; `DEF-5`/`DEF-7`/`DEF-10`'s class; **no `APP`-green is claimed from a node-green**). **⟶ RECONCILED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; THE SENTENCES ABOVE STAND BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE MOVED FIGURE — THE RE-MEASURE THIS REGION OWED HAS BEEN TAKEN AND IS PRINTED HERE WITH THE TREE EACH FIGURE DESCRIBES)** (`RCA-8(d)` ANNOTATE-BESIDE; `AR-14`; `DEF-5`/`DEF-7`/`DEF-10`'s class). **THE AS-FILED CELLS READ, IN THEIR OWN WORDS:** *"THE SHIPPED `196`-TEST FIGURE IS THEREFORE A FIGURE OF THE PRE-AMENDMENT TREE, and the moved figure owes a dated re-measure with its layer stated"*. **THE RE-MEASURE, AT ITS OWN BYTES (`archive/gate3/storeroom-native-red-set.md` `§16.2` and `§16.3`): `cargo test --offline --no-fail-fast` EXITS `0` — `218` test functions · `218` executed · `218` PASS · `0` FAIL · `0` ignored, over the `12` test targets beside `tests/support/mod.rs` (`construction` `22` · `fail_codes` `28` · `gate4_red_set_fix` `11` · `journal_and_rollback` `22` · `properties` `12` · `read_and_delete` `26` · `record_shapes` `20` · `tiers_and_purge` `12` · `walk_and_resolver` `20` · `watched_addresses` `16` · `write_arms` `29` · `lib`/doc-tests `0`); the register layer executes `11/11` STRATEGY LINES, ALL `HELD`, `0` `BROKEN`, `0` `un-run`, `318` attempts against the `400` total cap; `cargo build` · `cargo clippy --lib` · `cargo fmt --check` clean.** 
**AND THE THREE FIGURES, EACH LABELLED WITH ITS OWN TREE, SO NO READING RUNS THEM TOGETHER: `196` tests (`196` PASS, register layer `8/8` rows · `9` verdict lines · `314/400` attempts) is the PRE-AMENDMENT tree, the figure the shipped trackers carry (`docs/next-steps.md` `L-21`); `207` tests (`318/400` attempts) is the AMENDMENT'S TREE AS THE GATE-4 ADVERSARIAL PASS FOUND IT (`archive/gate4/storeroom-native-amendment-adversarial.md` `§7` item 2); and `218` tests (`218` PASS, `11/11` strategy lines, `318/400` attempts) is the AMENDED AND CORRECTED tree — the operative figure, being the `207` green plus the `11` test functions the correction pass's negative generators added (`8` green + `3` red, `archive/gate3/storeroom-native-red-set.md` `§15`), whose `3` red cells the SAME pass then turned green at its `§16`.** **NO FIGURE IS DELETED, NO CELL IS WEAKENED, NO `tests/**` BYTE IS WRITTEN BY THIS PASS, AND THE LAYER OF EVERY FIGURE IS ENVELOPE/PURE — NO `APP`-GREEN IS CLAIMED** (`[T: the re-measure's landing place, with its terms and its tree stated at the proofreading gate | CENSUS]`).**
**⟶ RECONCILED 2026-10-11 (`F-6`'s NOTE) — THE EDIT SCOPE'S `tests/**` CELL AND THIS REGION'S OWN
RECONCILIATION ARE RECONCILED, SO THE TWO CELLS AGREE AND NEITHER IS STALE** (`RCA-8(d)` ANNOTATE-BESIDE:
**the `§8.1` row `3`'s as-filed cell — *"new files only: the amendment's red rows, authored from the
contract alone. **No existing file is rewritten and no assertion is weakened**"* — and the `§8.2` row `3`
cell that repeats it STAND BYTE-FOR-BYTE ABOVE, and THIS clause is the operative statement of the amendment's
`tests/**` edit scope**). **THE DATED RECONCILIATION GOVERNS, AND THE REASON IS STATED IN ITS OWN TERMS:**
**it is dated AFTER the plan row; it names the files and the CELLS — `tests/support/mod.rs`'s `CLOSED_CODES`
(`[&str; 14]` → `15` members), `tests/fail_codes.rs`'s `14`-member assertions and its per-member drives, and
`tests/watched_addresses.rs`'s `13` drives — and `write-and-read.md §6.5`'s supersession clause 4 says that
file *"is RE-DERIVED BY ITS AUTHOR ROLE"*; and a RE-DERIVATION OF A FILE'S DRIVES CANNOT BE A NEW-FILE
EDIT, because `A58` supersedes the surface those drives observed in ONE PASS with no deprecation window.**
**THEREFORE, AT `A2`: `tests/**` is opened as (i) NEW FILES — the amendment's added cells — AND (ii) the
RE-DERIVATION, BY ITS AUTHOR ROLE `role_test_writer`, OF THE THREE NAMED FILES' OWN CELLS, each against the
`§`-clause it now drives — and NOTHING ELSE OF `tests/**` MOVES: no file outside those three is rewritten,
no assertion is weakened, no test is deleted, and the test-function census moves only by the cells the
amendment's clauses require** (`AR-14`; `AR-16`; **the three files are the ones the dated reconciliation
names by name, and the `15`-member `CLOSED_CODES` is the one it names first**). **A `tests/**` write that
touches a fourth file, or that weakens an assertion in any of the three, is a violation of the amendment's
declared edit scope exactly as the as-filed cell says** (`[T: the edit scope's reconciliation, dated, at this
part's `§8` | CONTRACT]`).
**AND THE PARKS ARE UNMOVED BY THIS REGION: `P-1` stands `OPEN`** — **so `A6` and the red set's `crate/**`
crossing work stay `intent/parked`, exactly as `§8.4` prints, and `P-3`'s lift, which the architect gave at
`A44`, is recorded in the contract directory's clauses and NOT read here as a closure.**
`[T: the plan region's reconciliation, dated, at this contract's sixth bounded amendment | CONTRACT + 1
OWED (the TestWriter's re-derivation duty, owner `role_test_writer`, positive revisit condition: the
amended red set is authored and run)]`

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-JS` GATE-7 PROOFREADING PASS (`role_proofreader`): THE PARKS CLAUSE
ABOVE AND THE STORE'S OWN TEST-COUNT FIGURE, EACH READ AT THE TRACKER'S AND THE TREE'S OWN BYTES.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the `196`/`207`/`218` reconciliation, the
`§8.1`/`§8.2` scope cells and the parks clause included — and each is read THROUGH this clause; THIS CLAUSE IS A
PURE INSERTION, it re-measures nothing and lifts no park.**

- **THE PARKS CLAUSE ABOVE READS** *"`P-1` stands `OPEN`"*. **THE OPERATIVE STATE, AT `docs/pending.md`'s OWN BYTES: `P-1` — the JS integration set — IS `lifted` (lifted, not deleted), BY THE ARCHITECT'S OWN ACT `A66` (*"this is the unpark of the integration"*), its `28` rows now `U-STOREROOM-JS`'s own material; and `P-3` — the listener implementation — IS `lifted` by `A44`.** **The row's own disposition cell still reads `OPEN` — a lift rewrites no row's cell by this project's annotate-beside convention — so the operative state is the dated lift clause and not the cell alone.** **WHAT THE SENTENCE IS RIGHT ABOUT AND THIS CLAUSE PRESERVES: the park's lifting is NOT a closure of anything, `A6` and the red set's `crate/**` crossing work still need the JS unit's own gate to dispose of them, and NOTHING PARKED IS REPORTED GREEN.** **THE `P-1` STATE IS NAMED HERE AS `lifted`, NOT AS `OPEN`, SO THE TWO UNITS' ROWS ARE NOT RUN TOGETHER** (`docs/pending.md` `§2` and its dated reconciliation bullets; `docs/next-steps.md` `## OPEN`'s dated clause).
- **AND THE TEST-COUNT FIGURE THE RECONCILIATION ABOVE PRINTS IS THE AMENDED AND CORRECTED TREE'S, NOT THE TREE THIS REPOSITORY NOW CARRIES.** **THAT CLAUSE PRINTS** *"`218` test functions · `218` executed · `218` PASS · `0` FAIL · `0` ignored, over the `12` test targets beside `tests/support/mod.rs` … the register layer executes `11/11` STRATEGY LINES, ALL `HELD` … `318` attempts against the `400` total cap"*. **THE OPERATIVE FIGURE AT THE STORE'S ROOT SUITE, AS THE BUILD PRINTS IT NOW: `cargo test --offline --no-fail-fast` — `377` PASS · `0` FAIL, with the root `Cargo.toml` byte-identical and the typed register layer executing `8/8` rows — `5` Rust strategy lines beside `3` JS ones, the JS half living in the sibling crate — every row `HELD` and `0` un-run.** **THE GROWTH IS NAMED, SO THE `377` IS NOT READ AS A THIRD RE-MEASURE OF ONE THING: `218` (the amended and corrected tree's `12` targets) + `103` (the `A59`/`A60` JSON round-trip battery at `tests/e2e_json_round_trip.rs`) + `46` (the listener-firing battery at `tests/e2e_listener_firing.rs`) + the cells the `A69` correction pass and the later bounded repairs added = `377`.** **`196` (pre-amendment), `207` (the gate-4 adversarial pass's reading) and `218` each stand above BYTE-FOR-BYTE with their own trees, and `318`/`8-8` remain those trees' register figures** (`docs/specs/storeroom-js/contract.md` `§7.1`–`§7.3`; `docs/specs/storeroom-js/implementation-plan.md` `§4.2`'s dated clause; `[T: the parks clause and the store's test-count figure, each with its tree | CENSUS]`).

**⟶ AND THE STORE'S ROOT-SUITE FIGURE THIS REGION PRINTS IS RE-STATED, LANDED 2026-10-11 BY THE BOUNDED
CLOSE-OUT PASS (`role_spec_writer`): THE OPERATIVE FIGURE IS `379` PASS · `0` FAIL.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE — the parks reconciliation, the `218` clause and the
`377` clause with its own growth arithmetic included — and each is read THROUGH this clause; THIS clause is a
PURE INSERTION, it re-measures nothing, lifts no park, moves no phase cell and adds no acceptance item.**
**THE CELL, QUOTED IN ITS OWN WORDS SO `git diff` RECOVERS IT WHERE IT STANDS:** *"THE OPERATIVE FIGURE AT
THE STORE'S ROOT SUITE, AS THE BUILD PRINTS IT NOW: `cargo test --offline --no-fail-fast` — `377` PASS · `0`
FAIL, with the root `Cargo.toml` byte-identical and the typed register layer executing `8/8` rows — `5` Rust
strategy lines beside `3` JS ones, the JS half living in the sibling crate — every row `HELD` and `0`
un-run."* **THE TREE HAS GROWN BY TWO CELLS, AND THE TWO ARE NAMED WITH THEIR CLAUSE AND THEIR HOME: `379`
PASS · `0` FAIL, because the `+2` are the two LISTENER CELLS `docs/specs/storeroom-native/write-and-read.md
`§6.5` item 14 (d)–(e) required, whose home is `tests/watched_addresses.rs` — its own count moves `19` → `21`
— so the growth arithmetic this clause's predecessor printed is extended by exactly one line: `377` (as that
clause named it) `+ 2 = 379`.** **EVERY OTHER READING STANDS UNMOVED AND IS NOT WITHDRAWN: `196`
(pre-amendment), `207` (the gate-4 adversarial pass's reading), `218` (the amended and corrected tree) and
`377` itself — now HISTORICAL, as the figure the tree printed before those two cells landed — each with its
own tree, and `318`/`8-8` remain those trees' register figures.** **NO `tests/**` BYTE IS WRITTEN BY THIS
CLAUSE, THE ROOT `Cargo.toml` STAYS BYTE-IDENTICAL, AND THIS PASS CLAIMS NO GREEN OF ANOTHER UNIT** (`[A3
docs/specs/storeroom-js/contract.md` `§7.1`–`§7.2`'s dated clauses of 2026-10-11 — the same figure's other
homes; A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 14 (d)–(e) — the two cells the `+2` are |
numeric or census claim]`).

