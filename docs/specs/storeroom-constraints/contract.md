# Contract — the caller-side constraint / repair kernel for the native Rust store (`U-STOREROOM-CONSTRAINTS`, `D-GP-SCNT`): the registry, the attempt, the repair, the message log and the applied-repair marker

- **Status:** **SPEC — the unit's canonical contract document, authored at the gate-2 spec gate of
  `U-STOREROOM-CONSTRAINTS` in the DIRECTORY form, in the SAME PASS as its parts and its index region.**
  Gate 1 is **PASSED**: the gate-1 record's **LAST** verdict re-issue is **`APPROVE-WITH-CONDITIONS` ·
  `DELEGABLE`** — `docs/specs/storeroom-constraints/proposal-review.md` **`§11.1`**, which is the OPERATIVE
  word (its `§1` prints the earlier `BLOCKED-ON-SEMANTICS` / `NOT-DELEGABLE` state and is read THROUGH the
  read-through pointer its own `§1` carries) — and the unit's admission is the architect's own act,
  **`§B.5`** / **`§B.1`**, landed as the ACTIVE `docs/decisions.md` row printed at that file's closing clause
  (the row whose printed name carries **`A101`**), with that file's own clause reading *"AND THE ROWS ABOVE
  ARE ACTIVE, NOT PROVISIONAL"*. **`docs/specs/storeroom-constraints/proposal-review.md` `§11.6` is the
  GATE-2 READINESS BLOCK this pass consumes: the contract directory, the register, the parameter-semantics
  subjects and the per-part inheritance are named there.** **This contract asserts no behaviour clause the
  architect's rulings supply and no clause the store's own contracts own; where a store-side subject is not
  settled by those rulings it stands `OWED` and is written as `OWED`, never as if ruled.** **⟶ AND RE-SPELLED AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`role_spec_writer`), WHICH LANDS THE ARCHITECT'S DELIVERY-MODEL RULING (`A: docs/decisions.md` · `A112`) AND TOUCHES THE CLAUSES IT MOVES AND NO OTHERS: THE RUST STORE RETURNS THE HANDLES AND INVOKES NOTHING (the half of the superseded clause that STANDS), THE **JS SURFACE** IS THE INVOKER AND HAS TWO ORDERED LAYERS BEFORE IT RETURNS TO THE CALLING PROCESS — THE TRIGGERED CONSTRAINTS FIRST, AND, ONLY ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS — AND `pending` IS THE WHOLE RETURNED SET, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES, SIFTING A SUBSET OUT OF IT BEING UNNECESSARY AND UNLAWFUL; SO THE READING THAT MADE THE CALLER'S OWN LOOP *"LAYER (b)'s ONLY INVOKER"* AND THE READING THAT SIFTED A SUBSET ARE BOTH WITHDRAWN BY NAME, THE CALLER'S OWN LOOP BEING ONE INVOKER AMONG THE SURFACE'S OWN LAYERS; (RE-DERIVED AT THE GATE-4 RECONCILIATION PASS OF 2026-10-13, WHICH ADDED NO CELL AND SPENT NO HEADROOM, AND THAT PASS'S ADDED FAILURE FACE IS FOLDED INTO `§5.5`'S ALREADY-COUNTED FAILURE ITEM SO NO CELL IS ADDED: `21` ROW CELLS × `19` = `399 ≤ 400` ✓, ONE CELL SPENT OF THE TEST'S OWN `ROWS_OF_CHECKS = 21` AND NO HEADROOM SPENT, with NO ROW ADDED OR REMOVED AND `26` ids over `8` rows UNMOVED — the terms as printed at `archive/spec-history/2026-10-13-reconciliation-deltas-superseded.md §2` item 3, `§6`'s terms being that item's now), `CommitRecord` `4` members, `PAR-C` `17`, the `KC` set `8`, the open `AttemptRecord` `9`, `RollbackStep` `6` and the battery's `16 × 7 = 112` all UNMOVED.** **⟶ RECONCILED AGAINST THE BUILT MODULE AT THE GATE-8 DOCUMENTATION REVIEW (2026-10-13, `role_documentation_reviewer`; the status clause above stands BYTE-FOR-BYTE and THIS clause is the operative statement of the contract's standing against the build): THE DECLARATIONS OF THIS DIRECTORY AND THE SHIPPED KERNEL AGREED AT EVERY POINT THIS PASS READ — `bindings/js/src/constraint-kernel.mjs` carries EXACTLY the five declared surface items of `kernel-surface.md §2.1` (`register` · `commit` · `runAttempt` · `log` · `report`), each taking the caller's own instance first; the `8` closed kernel states of `fail-surface.md §2` as token strings related by identity to `LogEntry.state`; the pair key of `attempt-lifecycle.md §2.4` item 2 in its CLASS-MARKED injective spelling; the ONE `outcome` entry carrying `KC-8` where the walk meets a store floor code, WITH item 5 (a)'s skip (the composition's step count is the calls ISSUED and may run below the list's size); the repair's op read off the repair's own `{ok, message, op}` return and off nothing else (`A110`'s deleted — never widened — addon route); and NO second load path in the module's whole import footprint. THE SPEC'S OWN `OWED` RESIDUE IS UNCHANGED AND IS THE STORE-SIDE PASS `J-20`–`J-22` (the per-landing constraint pass and the non-null `checkpoint` arm) together with `A111`'s withdrawn pre-state claim (`§0.1` item 5 (i)); NO `APP`-GREEN IS CLAIMED BY THIS UNIT AND ITS GREEN IS `ENVELOPE/PURE` (`RCA-12`; `live-greens.md` `CON-1`).**
- **Unit id / prefix:** **`U-STOREROOM-CONSTRAINTS`** is the unit id — **ADMITTED by the architect at
  `§B.5`** — and **`docs/specs/storeroom-constraints/`** is its contract directory. **Prefix `D-GP-SCNT`** —
  *declared by this contract, not previously filed*: the filing declared no prefix and `§11.6` names none.
  **This document mints FOUR id families and no fifth: the typed register's rows are
  `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-SM-5` · `P-SM-6` · `P-TP-7` · `P-TP-8` (`§5.1`–`§5.8`,
  `8` rows, cap `≤ 8` ✓), the parameter-semantics rows are `PAR-C-1`…`PAR-C-17` — `6` `parameter` + `2` `seam` + `2` `callback` + `2`
  `return-field` + `5` `option`, `6 + 2 + 2 + 2 + 5 = 17` ✓), the kernel's surface items are `K-1`…`K-5`
  (`kernel-surface.md` `§2.1`), and the kernel's own fail states are `KC-1`…`KC-8` (`fail-surface.md` `§2`).** **⟶ MOVED `8 → 9` ON 2026-10-28 BY `D-53`'S THIRD RULING — *"Open the token set"* — the appended member being the SAVE ARM's own `KC-9` (`ConstraintSaveFailed`): a save failure and a constraint refusal must cross with different statuses AND each be derivable from the log's terminal state (`strata/decisions.md` · `D-53`; `D-52` measured `KC-8` crossing as both).**
  **No id family of the store
  unit or of the JS unit is reached, re-used, renumbered or moved** (`P: §B.1` — *"A NEW UNIT with its own
  `≤ 8` register"*; `A: docs/specs/storeroom-native/contract.md §0.1` item 5 — the cap is PER UNIT).
  **⟶ AND THE EIGHT REGISTER SPELLINGS ABOVE ARE NOW THIS UNIT'S ALONE, 2026-10-17, BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`; `RCA-8(g)`: this bullet stands BYTE-FOR-BYTE above and is read THROUGH this clause, which states the ONE fact the ruling changed and moves no figure of it).** **THE SAME EIGHT IDS WERE DECLARED BY `U-STOREROOM-JS` AT ITS OWN `docs/specs/storeroom-js/contract.md §5.1`–`§5.8`, so a bare `P-IM-1` resolved to two different rows in two documents; THE RULING RE-MINTS THE JS UNIT'S EIGHT IDS TO `P-SR-1`…`P-SR-8` — `DD-3`'s own priced alternative, adopted at its own cell — and THIS UNIT'S EIGHT SPELLINGS ARE THEREFORE UNMOVED AND UNIQUE.** **THE ARITHMETIC, WITH ITS TERMS: `8` ROWS HERE at `8 ≤ 8` ✓ (`3 + 3 + 2 = 8` ✓, `§5.0` unmoved) + `8` ROWS THERE at `8 ≤ 8` ✓ = `16` DISTINCT ROW IDS ACROSS THE TWO DIRECTORY EDGES, `0` SHARED — AND NO ROW AND NO COUNT MOVED ON EITHER SIDE** (`docs/specs/storeroom-js/contract.md`'s unit/prefix line and its `DD-3` row as re-derived; `DEF-2026-10-16-S`; this document's `§5.0` clause of the same date).
- **The gate-1 disposition this contract derives from — one clause, and it is the only `derivation:` clause
  in this document:**
  `derivation: docs/specs/storeroom-constraints/proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  — **the clause's own slots, separated by the middle dot `·`, and its AUTHORITY IS THE FILED GATE-1 RECORD
  ITSELF** (that record's `§5` `decomposition` row as its `§11.3` moves it).
  **THE READING IS DISCLOSED RATHER THAN SMOOTHED, AND THE ROW'S OWN CELLS ARE READ EXACTLY AS THEY STAND:**
  the row's `recommendation` cell reads **`SPLIT-RECOMMENDED`**, its `disposition` cell originally read
  **`BUBBLE-TO-USER`** and **`§11.3` moves it to `SPLIT-NOW`**, its `decider` cell reads **`the user`** and is
  **NOT rewritten — the architect answered** — and its `remainder` cell carries the token
  **`BUBBLE-ANSWERED: SPLIT-AFFIRMED | 2026-10-13`**. **READ THE PRECEDENT CAREFULLY, BECAUSE `SPLIT-NOW` IS
  OVERLOADED IN THIS PROJECT AND `§11.3` states the distinction in its own words:** elsewhere `SPLIT-NOW` on
  a `NO-SPLIT` row means *the answered bubble DECLINED the split*; **HERE the architect ruled the OTHER WAY —
  the recommendation proposed *"a row inside `U-STOREROOM-JS`"* and `§B.5` ADMITS A UNIT instead — so
  `SPLIT-NOW` here carries an AFFIRMED split, and this unit's contract directory IS the split's
  landing.** **This unit's `ordering anchor` is therefore written here: the spec path is
  `docs/specs/storeroom-constraints/contract.md` and the status-line token is the `SPEC —` clause above.**
- **THE RULINGS THIS CONTRACT INHERITS, EACH READ AT ITS OWN BYTES AND CITED CLAUSE BY CLAUSE** — these are
  the whole of this unit's authority for behaviour, and **no clause below is written without one of them or
  an explicit `OWED`:**

  | The ruling | What it fixes | Where this contract consumes it |
  | --- | --- | --- |
  | **`§A.1`** — *"The handle is checked within the rust store as normal for listeners, the function is run in the node.js space (also like listeners)."* | **the TWO SIDES' DUTIES:** the constraint's HANDLE is checked in the Rust store **as normal for listeners**; its FUNCTION runs in the Node.js space; **read with `§B.7` and `§B.8`, the store's part is its EXISTING listener-machinery duty and its closed record shapes are untouched** | `kernel-surface.md §2.2` (the handle check), `kernel-surface.md §2.3` (the function's side) |
  | **`§B.7`** — *"A caller-side registry keyed by address + id (no store entry)"* | **THE REGISTRATION:** keyed **`address` + `id`**, in a CALLER-SIDE registry, **with NO store entry**; *"the store's listener machinery and its closed record shapes stay untouched; only the handle check duty sits store-side"* | `kernel-surface.md §2.1`–`§2.2`; `parameter-semantics.md §2.1`–`§2.3` |
  | **`§B.8`** — *"The caller-side registry, declared by the amendment"* | **THE APPLIED-REPAIR MARKER:** what marks a repair applied is the caller-side registry, and **the caller evaluates *"already recorded as applied"*** | `kernel-surface.md §2.5`; `P-TP-8` (`§5.8`) |
  | **`§A.2`** — *"Fail on the first repeat, never repeat a repair"*, read at its own fuller form: *"A repair already recorded as applied may not run again; a second violation of the same constraint fails the attempt."* | **THE FINITE TERMINATION BOUND:** the attempt FAILS ON THE FIRST REPEAT and **NEVER re-runs a repair already recorded as applied** | `kernel-surface.md §2.5`; `P-SM-6` (`§5.6`) |
  | **`§B.3`** — *"PER-OP `rollback` REPEATED OVER THE ATTEMPT'S OPS"*, as put: *"the compacted floor named: per-op reach, never a claim past a compacted base."* | **THE ROLLBACK'S REACH:** the attempt rolls back **per op** (`rollback(op.opId)`), repeated over the attempt's ops, **with the compacted floor named (`RollbackCompacted`)** | `composition-and-states.md §2.6`; `P-TP-7` (`§5.7`) |
  | **`§B.4`** — *"THE KERNEL'S OWN RECORD, DECLARED IN THE JS DIRECTORY"* | **THE ATTEMPT'S RECORD SHAPES:** the returned messages, the ops created and what has already run are **THE KERNEL'S OWN RECORD**, its **message log's order the kernel's own**, and **nothing crosses the store's surface** | `attempt-lifecycle.md §2.4`; `P-IM-2` (`§5.2`) |
  | **`§B.6`** — *"THE CALLER'S OWN MESSAGE"*, as put: *"the kernel's own failure form and never a store code; the closed set untouched; `RollbackCompacted`/`JournalOpUnknown` remain the only store-side arms a caller-side attempt can meet."* | **THE CONSTRAINT-FAILURE CHANNEL:** a constraint failure reaches the caller as **the caller's own message, NEVER a store code**; the closed `15` is untouched | `fail-surface.md §1`–`§2`; `P-IM-3` (`§5.3`) |
  | **`§B.1`** — *"A NEW UNIT with its own `≤ 8` register"* | **THE REGISTER CARRIER:** this unit carries its OWN register, `≤ 8`, **no ninth row and no second register** | `§5` below |
  | **`§B.5`** — *"ADMIT A UNIT"*, with *"its own directory, register, dossier and red set"* | **THE UNIT'S FORM**, the ledger's first admission, and the red set's owner | this index region; `e2e-scenarios.md` (the unit's own battery) |
  | **`§B.2`** — *"READ IT AND ACT BEFORE ANY PUBLISH"* | **THE PUBLISH READING** is acted on before any publish, or refused in writing | `fail-surface.md §4`; `implementation-plan.md`'s phase `B2a` |
- **Scope boundary — positive (what this contract binds), and nothing else.** Exactly six things, each a
  subject `§11.6` names: **(1)** the kernel's **registration** — the caller-side registry keyed
  `address` + `id` and the handle check that sits store-side (`kernel-surface.md §2`); **(2)** the kernel's
  **attempt** — the write attempt, its trigger selection and its ordering (`attempt-lifecycle.md §2.4`);
  **(3)** the kernel's **repair** — the caller's OWN `write`/`delete` and the re-run of the constraints
  (`kernel-surface.md §2.3`, `§2.5`); **(4)** the kernel's **message log** (`attempt-lifecycle.md §2.4`);
  **(5)** the kernel's **applied-repair marker** (`kernel-surface.md §2.5`); **(6)** the kernel's **fail
  surface** — its own refusals and the boundary at which a store code may reach the caller
  (`fail-surface.md §1`–`§3`).
- **Scope boundary — the boundaries this contract DOES NOT cross, stated as the closure predicate's own
  part.** **No store-side clause is declared here, and no store byte is reached:**

  1. **`docs/specs/storeroom-native/contract.md §7.3` clause 1 stays whole:** *"THE CORE CARRIES NO CONSTRAINT
     OR REPAIR IMPLEMENTATION, AND THIS CONTRACT DECLARES NO CONSTRAINT SURFACE, NO REPAIR SURFACE, NO
     CONSTRAINT REGISTRATION AND NO CONSTRAINT RECORD"*. **This unit declares all four ON THE CALLER'S SIDE,
     declared in THIS directory, and it declares none of them store-side** (`P: §B.7` — *"no store entry"*).
  2. **`§7.3` clause 3's `OWED` seam is UNMOVED AND NOT CLOSED — `J-20`–`J-22` stay `OWED`, owner the
     architect, positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row***: the
     evaluation's TIMING RELATIVE TO THE LANDING, WHAT THE CORE MUST EXPOSE FOR IT, and WHETHER A REPAIR
     WRITES THROUGH THE JOURNALED WRITE PATH. **No clause of this contract states any of the three, and no
     clause of this contract may be read as settling one.** **The store-side changes the answer set names
     remain `OWED`** (`P: §A.1`'s closing clause: *"NOTHING IN THESE ANSWERS MOVES A STORE-SIDE CONTRACT BY
     ITSELF"*; `R: §11.1` — `U22` partial, *"a residue this unit owes no clause for"*). **AND WHAT THIS CONTRACT DOES STATE ABOUT THE SEAM, SAID HERE SO NEITHER READING HAS TO BE GUESSED: it states WHICH OF ITS OWN CLAUSES DEPEND ON `J-21`'s TIMING and reads them as `OWED` — the per-landing constraint pass and a `checkpoint` that names an op, whose sites are enumerated at item 5 (i) below — while stating NEITHER the timing itself NOR what the core must expose for it, SO `J-20`–`J-22` STAND AS `OWED` AS THIS ITEM DECLARES AND NO CLAUSE OF THIS CONTRACT SETTLES ONE OF THE THREE** (`live-greens.md`'s `CON-1`; item 5 (i) above).
  3. **`docs/specs/storeroom-native/contract.md §8.1`'s CLOSED `15`-MEMBER SET IS UNTOUCHED:** no sixteenth
     member is minted, no member is renamed or re-ranked, and `§8.2`'s generated-message rule still governs
     every store message. **This unit's own failure form is NOT a store code and carries no store member**
     (`P: §B.6`).
  4. **The store's listener machinery and its closed record `{address, handle}` are UNTOUCHED**
     (`A: docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (a) — *"A LISTENER IS `{address,
     handle}` AND NOTHING ELSE"*; item 12 (c) — the address-level idempotence and the mint rule; `A:
     docs/specs/storeroom-native/contract.md §6.5` items 2 and 6; `docs/specs/storeroom-js/contract.md §2.10`).
  5. **`docs/specs/storeroom-native/contract.md §0.1` item 10's rules hold:** **no second register, no sixth
     structure, no second addressable home.** **This unit's registry and its attempt record are CALLER-SIDE
     shapes and are not addresses, not nodes, not tiers and not store structures** (`P: §B.7`, `§B.4`).
  6. **`docs/specs/storeroom-js/contract.md §2.6` and `parameter-semantics.md §2.18` (`PAR-JS-18`) stay
     whole:** the JS unit declares the constraint/repair subject as **a usage pattern over declared verbs,
     never a seam**, and *"the store's own surface takes no function at any position"*. **This unit declares
     the kernel the pattern's carriage names — its own caller-side body — and it declares NO new store
     parameter, NO store verb, NO store record and NO function-carrying store parameter** (`P: §B.4` —
     *"nothing crossing the store's surface"*).
- **Scope boundary — the recorded omissions (part of the closure predicate, and they are ABSENT, never
  written empty).** The names below are **OMITTED from this unit's directory, with their reason recorded
  here**; **an omitted part is ABSENT, and an empty file at any of these paths is a gate-2 finding**; **a
  name that would carry nothing is omitted rather than written empty — and the omission rule and the closure
  predicate this index region enforces are STATED HERE, at `§0.1` items 3 and 4 and at this bullet, in this
  document's own words and tagged `T`:** **the gate-1 record's `§11.6` names the DIRECTORY FORM, the
  REGISTER, the PARAMETER-SEMANTICS SUBJECTS and the PER-PART INHERITANCE as the gate-2 readiness block,
  and those four are what this pass authors** (`R: §11.6`; `[T: §0.1` item 10(b)–(c) — the omission rule and
  the closure predicate, stated locally per `§0.1` item 2's own rule | CONTRACT]`).

  | Omitted name | Why it is omitted for **this** unit | Its state |
  | --- | --- | --- |
  | `property-register` | **This unit's register IS `§5` below and its rows are `§5.1`–`§5.8` — the register's canonical home is the contract document's own `§5.x` region — so a part would hold no row this document does not already carry, and would be the SHADOW-HOME DEFECT `§0.1` item 10 forbids.** | **omitted; ABSENT, never written empty; a later bounded pass may MOVE the rows, never copy them** |
  | `data-class-structure` · `process-flow` | Both are **derived VIEWS** of structure and of flow this contract already declares at `§5` and in `attempt-lifecycle.md §2.4`; **a new declaration in a view is a gate-2 finding**, and their absence loses no claim. | **omitted; ABSENT, never written empty** |
  | `census` | The unit's figures are **carried where they are read** — the register's census at `§5.0`, the parameter set's at `parameter-semantics.md` `§1`, the fail set's at `fail-surface.md §2`, the battery's at `e2e-scenarios.md §1` — and a separate `census` carrier would restate figures that already have homes. | **omitted; ABSENT, never written empty; no figure of this unit lacks a home** |
  | **`implementation-plan`'s RECONCILED REGION** | **THE NAME IS NOT OMITTED; ITS RECONCILED REGION IS, AND THE REASON IS A DUTY AND NOT A CHOICE.** The map's `implementation-plan` row declares the KIND `carrier` at the path `docs/specs/storeroom-constraints/implementation-plan.md`, **and that file is a GATE-1 INPUT this pass may not edit**; its steps are PLAN STEPS and never contract claims, and its phase `B2` is where `AR-12`'s reconciled region lands. | **the row stands, KIND `carrier`; the reconciled region is `OWED` — owner `role_spec_writer`, positive revisit condition *the pass that takes phase `B2` of `implementation-plan.md`*; until then the file stands as the proposal-stage plan its own `§0` item 1 declares it.** **AND THE RE-DERIVATION `VF-16` ASKS FOR IS DISCHARGED HERE WHILE THE FILE EDIT REMAINS THE SUPERVISOR'S ACT: the plan's hold table row `1` reads `NOT MET` (`U1` · `U22` · `AR-1`) while its own `⟶ 2026-10-13` clause reads *"ROW `1` IS MET AND THE HOLD IS DISCHARGED"* — so the cell is RE-DERIVED as `MET` by the architect's second answer set (`P: §A.1` for the side; `P: §B.6`/`§B.7` for the failure's channel and the registry's home), the row's `BLOCKED-BY` set is now EMPTY, and the plan's own hold arithmetic becomes `0 NOT MET + 7 MET = 7` ✓ against the `7` printed preconditions.** **This contract states the re-derivation and does NOT edit the input file; the landing of that cell is `OWED` to the `B2` pass that owns the region** (`VF-16`; `docs/specs/storeroom-constraints/implementation-plan.md §5`'s hold table and its `⟶ 2026-10-13` clause; `§7`'s closing arithmetic) |
- **The part map (a pointer set — no count, no hash, no cap, and no order).** Each row states its part's
  **KIND**. **Rows are not ranked and no citation anywhere depends on a row's position**; every part is
  cited by its path and its `§<n>`.

  | Part | Kind | Path | What it carries |
  | --- | --- | --- | --- |
  | **the contract document** (this file; **not a part**, and not an entry of the closure predicate's left side) | — | `docs/specs/storeroom-constraints/contract.md` | the index region (`§0`), the claim ledger and the form rules (`§0.1`), the design-default rows this contract carries (`§0.2`), the scope boundary with the inherited rulings and the recorded omissions, and the typed property register (`§5.0`–`§5.8`, `8` rows) |
  | `parameter-semantics` | **`carrier`** | `docs/specs/storeroom-constraints/parameter-semantics.md` | the unit's own authored `PAR-C-n` rows — **one row per declared parameter, option, seam and callback**, `17` rows (`PAR-C-1`…`PAR-C-17`), each carrying its unit, its domain, its referent, its evaluator and its observable — with the `PAR-C` index (`§1`) — and at the ruling-landing pass of 2026-10-13 `§2.17`'s `checkpoint` cells were re-derived to the OP whose landing left the attempt's last valid state (`Q-A`; `Q-B`) without adding a row, the commit registry's clearing rule being cited from `§5.7` (`A103`) |
  | `kernel-surface` | **`carrier`** | `docs/specs/storeroom-constraints/kernel-surface.md` | the kernel's declared surface: the module, the five surface items `K-1`…`K-5` with their signatures, their return shapes and their throw patterns, **the ELEVEN closed record shapes (`AttemptContext` · `RepairContext` · `AttemptRef` · `AttemptRecord` · `LogEntry` · `RollbackStep` · `CommitRecord` · `AttemptReport` · `ConstraintOutcome` · `RepairResult` and the kernel's failure form, enumerated one by one at `§1` item 4) — NAMED KERNEL-SIDE SHAPES NUMBERING `12`, the ELEVEN records plus the commit registry's own declared map row (`11 + 1 = 12`), AND `CommitRecord` CARRIES FOUR MEMBERS AT THE `A108` LANDING PASS OF 2026-10-13, `{attempt, op, triggered, pending}` (`3 + 1 = 4` ✓, its member census read at `§2.1` item 2, the fourth being the member layer (b)'s handles stand in) — **AND `RepairResult`'S SUCCESS ARM NOW CARRIES THE `op` THE REPAIR LANDED, `{ok, message, op}` — the shape's three members across its two arms, `2 + 1 = 3` ✓, landed at the `A110` pass of 2026-10-13 with its ONE HOME at `parameter-semantics.md §2.7` (`A: docs/decisions.md` · `A110`)** — the message log and its order, and the applied-repair marker — **AND ITS DECLARED SCOPE IS `§1`, `§2`, `§2.1`–`§2.3` AND `§2.5` — CORRECTED AT THE GATE-2 SPLIT PASSES OF 2026-10-13, and it ENDS AT `§2.3` and RESUMES AT `§2.5`: the per-op rollback composition and the kernel's valid and fail states are NO LONGER CARRIED HERE and stand, numbered `§2.6`–`§2.7`, at the `composition-and-states` row below; and `§2.4` (THE ATTEMPT) is NO LONGER CARRIED HERE either — it stands, with its NUMBER UNMOVED, at the `attempt-lifecycle` row below; the body of this part carries a ONE-LINE POINTER where each moved text stood, and this head's own scope sentence is the only place its carried set is declared** (`RCA-8(g)`) |
  | `attempt-lifecycle` | **`carrier`** | `docs/specs/storeroom-constraints/attempt-lifecycle.md` | **`§2.4` THE ATTEMPT — its record, its states, its transition table and its trigger selection — MOVED OUT of `kernel-surface.md` BYTE-EXACTLY AND WITH ITS `§`-NUMBER UNMOVED at the SECOND GATE-2 SPLIT PASS OF 2026-10-13, because `kernel-surface.md` measured `129,778` B, `99 %` of the process's per-path volume line of `131,072` B:** a CARRIER of relocated text that **DECLARES NOTHING THIS CONTRACT DOES NOT ALREADY CARRY** — `§2.4` remains the home of the open `AttemptRecord`'s NINE members (`§2.4` item 1) and of the closed `AttemptReport`'s membership rule (`§2.4` item 7 (ii)), of the pair-key spelling (`§2.4` item 2), of the four-arm disjointness rule (`§2.4` item 4) and of the terminal-arm clause that fixes which arms remove the attempt's own registry entry (`§2.4` item 3; item 8 (i) (3)), the commit registry being there declared as the MAP member of the set of named kernel-side shapes — **AND THE ONE-LINE POINTER AT `kernel-surface.md`'s OWN BODY names this path, that part having kept no rule of this section** (`RCA-8(g)`) |
  | `composition-and-states` | **`carrier`** | `docs/specs/storeroom-constraints/composition-and-states.md` | **the split's landing, authored at the GATE-2 SPLIT PASS OF 2026-10-13 because `kernel-surface.md` measured `137,457` B, OVER the per-path volume line of `131,072` B, and the archival pass was insufficient:** the kernel's **per-op rollback composition** — its reach (`AttemptRecord.ops` as the composition's CALL LIST), its order, its guard and its floor — **with the architect's ruling `A102` and the checkpoint** (`§2.6`), and **the states a TestWriter derives** — every valid/happy-path state and every documented fail-state (`§2.7`). **Both sections were MOVED OUT of `kernel-surface.md` AT THE PRE-SPLIT EXTENT THEY STOOD AT ON THAT DATE — the one account this directory gives of the move, printed in the same words at `kernel-surface.md`'s own Status line and at that part's own head: the sections were moved as they stood at the split, with the same date's `VA` closes landed in them BEFORE the move, and the bare `§n` cross-references they carried were then repointed WITH THEIR PATHS, since a bare `§n` does not cross two documents — and they KEEP THEIR NUMBERS: they are a CARRIER of relocated text, declaring nothing this contract does not already carry, and `§2.6` remains the home of `RollbackStep`'s sixth member `checkpoint` — **re-spelled AT THE RULING-LANDING PASS OF 2026-10-13 FROM A PAIR KEY TO THE OP whose landing left the attempt's last valid state, which IS the walk's stop op (`Q-A`)** — and of the target rule `A102` (`D1`) pins, with the commit registry's clearing rule cited there from its one home `§5.7` (`A103`, `D5`).** |
  | `fail-surface` | **`carrier`** | `docs/specs/storeroom-constraints/fail-surface.md` | the kernel's own fail states `KC-1`…`KC-8` (**⟶ `KC-1`…`KC-9` from 2026-10-28**: `D-53`'s third ruling appends the save arm's `KC-9`), the boundary at which a store code may reach the caller, the closed `15` read once as the untouched neighbour it is, and the publish reading `§B.2` |
  | `implementation-plan` | **`carrier`** | `docs/specs/storeroom-constraints/implementation-plan.md` | the unit's ordered landing/verification plan, **reconciled to this contract and dated once its region lands** — see the omission row above: **the reconciled region is `OWED` to phase `B2`, and the file stands as a gate-1 input this pass does not edit** |
  | `e2e-scenarios` | **`view`** | `docs/specs/storeroom-constraints/e2e-scenarios.md` | **DECLARES NOTHING THIS CONTRACT DOES NOT ALREADY CARRY:** the unit's own e2e battery — `16` scenarios, each id `E2E-C-<n>`, each carrying its **seven mandatory cells** (id · start point · the surface it drives · its steps · the observation that makes it PASS · the fail-state it distinguishes · the ruling it pins) — so the battery's own census is **`16 × 7 = 112` cells**, all present, the fifteenth being `E2E-C-15`, authored at a previous pass for the cross-address re-entrant case the architect's ruling admits, and the sixteenth being `E2E-C-16`, authored at the `A106` landing pass to drive the FIRST TERMINAL ACTOR order `Q2` declares reachable (`15 + 1 = 16` ✓). **Every expected observation is DERIVED from a clause of this document or of its parts, NAMES THE DECLARED MEMBER IT READS, and cites its derivation; a scenario with no derivation is recorded in that document's own `OWED` list instead of invented** — **AND AT THE RULING-LANDING PASS OF 2026-10-13 (`Q-A`; `Q-B`; `Q-C`) the `checkpoint`-reading cells of `E2E-C-2`, `E2E-C-9` and `E2E-C-15` were re-derived with the member read AS AN OP (`E2E-C-15` now driving the architect's own worked example, its checkpoint op proven to survive the call at the ancestor address) and the census was re-derived at `15 × 7 = 105` with its `14 + 1 = 15` terms — A FIGURE SUPERSEDED AT THE `A106` LANDING PASS AND NOT REPRINTED HERE (`VH-2`): THE CENSUS STANDS WITH ITS LIVE TERMS, `16` SCENARIOS (`15 + 1 = 16` ✓) × `7` CELLS `= 112` ✓, AND NO SUPERSEDED TERM STANDS IN THIS ROW.** **AND THE SCENARIOS THIS ROW NAMES AS ITS OWN ARE NAMED WITH THE DOCUMENT EACH NOW STANDS IN — the split of the pass that added the `e2e-scenarios-b` row below: `E2E-C-2` at this document's path, and `E2E-C-9` and `E2E-C-15` at `docs/specs/storeroom-constraints/e2e-scenarios-b.md`, whose `e2e-scenarios-b` row carries the split and whose citation re-spellings are item `32`.** |
  | `e2e-scenarios-b` | **`carrier`** | `docs/specs/storeroom-constraints/e2e-scenarios-b.md` | **the battery's own split, authored at the GATE-2 BATTERY SPLIT PASS OF 2026-10-13 (`role_spec_writer`): `e2e-scenarios.md` had reached `127,681` B, `97 %` of the process's per-path volume line of `131,072` B, so `8` of the battery's `16` scenarios — `E2E-C-9`, `E2E-C-10`, `E2E-C-11`, `E2E-C-12`, `E2E-C-13`, `E2E-C-14`, `E2E-C-15` and `E2E-C-16` — were MOVED OUT OF THAT DOCUMENT BYTE-EXACTLY, as they stood on that date, into this CARRIER part, while `E2E-C-1` … `E2E-C-8` and that document's `§1` (its rules and its census), `§2`'s cell schema and `§3` (its `OWED` list) REMAIN at `docs/specs/storeroom-constraints/e2e-scenarios.md`, which carries a ONE-LINE POINTER where the moved scenarios stood** (`RCA-8(g)`: move out, leave a one-line pointer, never retain beside). **NO SCENARIO, CELL OR FIGURE MOVED IN MEANING, AND THE BATTERY'S CENSUS IS RE-DERIVED FROM THE TWO CARRIERS: `E2E-C-1` … `E2E-C-8` at `e2e-scenarios.md` = `8`, `E2E-C-9` … `E2E-C-16` at this part = `8`, `8 + 8 = 16` ✓, so `16` scenarios (`15 + 1 = 16` ✓) × `7` mandatory cells = `112` ✓ stands unmoved and no identifier is renumbered.** **This part declares nothing this contract does not already carry: it is a CARRIER of relocated text, it authors NO test code and asserts NOTHING — the disclaimer `e2e-scenarios.md §1` carries is CITED and not restated — and it declares no surface item, no record shape, no register row, no parameter row and no fail state.** |

  **AND ONE POINTER THIS REGION STATES SO NO READER TAKES THE BATTERY FOR A TEST SUITE:** **`e2e-scenarios.md`
  authors NO test code, asserts NO result and derives from THIS contract and the filing's rulings ONLY —
  never from any implementation, and no implementation of this unit exists.** **AND THE BATTERY POINTS BACK
  AT THIS REGION'S OWED CELLS RATHER THAN RE-PRINTING THEM: its `§3` names the two `EO` entries as its own,
  names the store-side seam `J-20`–`J-22` as NOT an entry of its list, and POINTS AT the four
  architect-owned rulings parked at `§0.1` item 5 (v) — **`2` of them now `ANSWERED` (`RC-14`; `RC-18`) and
  `2` still `OPEN` (`RC-3`; `RC-19`) — and the answered pair's landing sites are named at that item** — so each
  `OWED` row in this directory has ONE home and no second authority copies it** (`RC-3`; `RC-14`; `RC-18`;
  `RC-19`). **The red set is the TestWriter's, at `§B.5`'s declared owner, and it is NOT an artifact of this
  pass.**
- **Closure state — `CLOSED`, on the single arithmetic, RE-DERIVED AT THE SECOND GATE-2 SPLIT PASS OF
  2026-10-13.**
  **BOTH TERMS, WITH THEIR TERMS PRINTED:** `{part-map PART entries}` = `{rows of the part map} − {the
  contract-document row}` = `9 − 1` = **`8`** — the map's part rows being the EIGHT the table above now lists
  (`parameter-semantics` · `kernel-surface` · **`attempt-lifecycle`** · **`composition-and-states`** ·
  `fail-surface` · `implementation-plan` · `e2e-scenarios` · **`e2e-scenarios-b`**), over a map whose rows are **`9`** WITH the
  contract-document row counted**, **⟶ AND RE-DERIVED AGAIN AT THE GATE-2 BATTERY SPLIT PASS OF 2026-10-13
  (`role_spec_writer`), WHICH SPLITS `e2e-scenarios.md` AND ADDS ONE MAP ROW AND ONE PART ENTRY, REMOVING NONE,
  so **`6 → 8` PARTS, BEFORE THE THREE SPLITS OF 2026-10-13 AND AFTER THEM,
  `8` parts now — **THE PER-INCREMENT TERMS, PRINTED SO THE ARITHMETIC CLOSES WHERE THE FIGURES STAND: this pass ADDS the part `e2e-scenarios-b`, so `7 + 1 = 8` ✓, and it ADDS that part's own map row, so `8 + 1 = 9` ✓ — the `7` and the `8` being the figures the SECOND GATE-2 SPLIT PASS of the same date left, and `6 + 2 = 8` ✓ read as `6 + 1 = 7` at the second split and `7 + 1 = 8` here**, over a map of **`7 → 9` ROWS, `9` now — `7 + 2 = 9` ✓ printed per increment: `7 + 1 = 8` at the second split, then `8 + 1 = 9` here** · `{files the index
  region enumerates in docs/specs/storeroom-constraints/} − {the `3` GATE-1 INPUT **FILES**} − {the gate-1
  input that is NOT a file in its own right, the implementation plan's own AS-FILED BODY, whose file IS a map
  row and is counted} − {contract.md}` = **`12 − 3 − 0 − 1` = `8`** — **the `12` being the directory's `12`
  `.md` files, RECOUNTED ONE BY ONE AT THE BYTES THIS PASS AND NAMED SO THE FIRST TERM IS AUDITABLE AND NOT
  ASSERTED: `proposal.md` · `proposal-review.md` · `adoption-dossier.md` · `implementation-plan.md` ·
  `contract.md` · `kernel-surface.md` · `attempt-lifecycle.md` · `composition-and-states.md` ·
  `parameter-semantics.md` · `fail-surface.md` · `e2e-scenarios.md` · **`e2e-scenarios-b.md`** = `12` ✓** — the `3` subtracted being
  `proposal.md`, `proposal-review.md` and `adoption-dossier.md`, and the fourth gate-1 input subtracting
  NOTHING because `implementation-plan.md` is one of the `8` the right side KEEPS
  (`parameter-semantics.md`, `kernel-surface.md`, **`attempt-lifecycle.md`**, **`composition-and-states.md`**,
  `fail-surface.md`, **`e2e-scenarios-b.md`**, `e2e-scenarios.md`, `implementation-plan.md` = `8` ✓), so THE SUBTRACTION IS OF THREE
  FILES AND OF ONE BODY THAT HAS NO FILE OF ITS OWN — **`12` FILES LESS `3` GATE-1 FILES LESS `1` CONTRACT
  DOCUMENT = `8`, WHICH IS THE PART COUNT EXACTLY: `8 = 8` ✓**; the `4` recorded omission names
  contribute to NEITHER side — so the predicate reads **`8 = 8`** ✓ — **`9 = 9` ✓ COUNTING THE MAP ROWS
  AGAINST THE FILES PLUS THIS CONTRACT DOCUMENT, WHICH IS THE SAME SINGLE ARITHMETIC READ WITH ITS TWO
  ADDITIONS STATED: `{the 8 kept part files}` + `{contract.md}` = `8 + 1 = 9` ✓, against the map's `9` rows**
  — and this unit's state is **`CLOSED`**
  (`[T: §0.1` item 10(c) — the closure arithmetic is this document's own index-region rule over the file set
  `docs/specs/storeroom-constraints/` | CENSUS]`). **The closure arithmetic is a `CENSUS` observation about
  the file set and is NOT a claim about the kernel's behaviour.** **AND THE SPLIT MOVES THIS ARITHMETIC AND
  NOTHING ELSE IN THIS REGION: the register's `8 ≤ 8`, the `KC` set `8`, the fail-surface site census `13`,
  the `PAR-C` set `17` and the battery's `16 × 7 = 112` cells are figures of OTHER subjects and are NOT
  touched by a split — a section that changes PATH changes no count of a register, a fail set, a census or a
  battery.** **THE FOUR GATE-1 INPUTS ARE NAMED SO THE
  RIGHT SIDE IS AUDITABLE AND NOT COUNTED: `proposal.md` · `proposal-review.md` · `adoption-dossier.md` ·
  the implementation plan's own as-filed body** — **the first three are FILES and are subtracted from the file
  set, so they are counted on NEITHER side**; the
  fourth IS a map row (`implementation-plan`), so its file is KEPT on the right side and is counted ONCE, on
  the left side as its row and on the right side as its file, exactly as `§0.1` item 10(c) reads — and
  `implementation-plan.md` appears in the `7` the right side prints for exactly that reason.
- **The citation re-spellings this DIRECTORY SPLIT requires, ENUMERATED AS A REQUIREMENT LIST AND CHECKED
  OFF — never inferred from a byte diff.** **Each line reads *old form → new form*.** **Every item below is
  a citation that moved because this unit's contract is a DIRECTORY and not a monolith; the list is closed
  and each entry is checked.**

  | # | Old form (a monolith's citation) | New form (this directory's citation) | Checked |
  | --- | --- | --- | --- |
  | 1 | `contract.md §2` | `docs/specs/storeroom-constraints/kernel-surface.md §2` | ✓ |
  | 2 | `contract.md §2.1` (the surface items) | `docs/specs/storeroom-constraints/kernel-surface.md §2.1` | ✓ |
  | 3 | `contract.md §2.2` (the handle check) | `docs/specs/storeroom-constraints/kernel-surface.md §2.2` | ✓ |
  | 4 | `contract.md §2.3` (the repair's own verbs) | `docs/specs/storeroom-constraints/kernel-surface.md §2.3` | ✓ |
  | 5 | `contract.md §2.4` (the attempt and the message log — the OLD FORM being recorded, re-spelled as the monolith's own citation and NOT written here as a live citation of a second document; `VN-6`) | `docs/specs/storeroom-constraints/attempt-lifecycle.md §2.4` | ✓ |
  | 6 | `contract.md §2.5` (the applied-repair marker) | `docs/specs/storeroom-constraints/kernel-surface.md §2.5` | ✓ |
  | 7 | `contract.md §2.6` (the per-op rollback) | `docs/specs/storeroom-constraints/composition-and-states.md §2.6` — **this split's landing: the section's NUMBER did not move, only its path, so this row is re-spelled by the split pass and the item `27` below (whose row MOVED to `archive/spec-history/2026-10-13-recovered-provenance.md` at the volume remedy of 2026-10-13, its number UNMOVED) records the same move for every clause already written to it** | ✓ |
  | 8 | `contract.md §3` (the fail surface) | `docs/specs/storeroom-constraints/fail-surface.md §1`–`§4` | ✓ |
  | 9 | `contract.md §4` (the parameter rows) | `docs/specs/storeroom-constraints/parameter-semantics.md §1`–`§2` | ✓ |
  | 10 | `contract.md §5` (the register's census) | `docs/specs/storeroom-constraints/contract.md §5.0` | ✓ |
  | 11 | `contract.md §5.n` (a register row) | `docs/specs/storeroom-constraints/contract.md §5.n` (`n` = `1`…`8`) | ✓ |
  | 12 | `contract.md §6` (the e2e battery) | `docs/specs/storeroom-constraints/e2e-scenarios.md §1`–`§3` — **its scenarios `E2E-C-1` … `E2E-C-8` staying there, and its scenarios `E2E-C-9` … `E2E-C-16` re-spelled to `docs/specs/storeroom-constraints/e2e-scenarios-b.md §2` by the battery split below, item `32`** | ✓ |
  | 13 | `contract.md §7` (the plan region) | `docs/specs/storeroom-constraints/implementation-plan.md` (its reconciled region, `OWED` to phase `B2`) | ✓ |
  | 14 | `contract.md §0.1` item 10's **`docs/specs/storeroom-native/…`** targets | **UNCHANGED — a cross-document citation is written with its own path plus its `§`-number, and this split moves none of them** (`docs/specs/storeroom-native/contract.md §0.1` item 10(a)) | ✓ |
  | 15 | `contract.md §4` (a parameter row, `PAR-C-1`…`PAR-C-11`) | `docs/specs/storeroom-constraints/parameter-semantics.md §2.1`–`§2.17` (`17` rows, `PAR-C-1`…`PAR-C-17` — the repair pass's four added rows are `§2.14`–`§2.17`) | ✓ |
  **⟶ ITEMS `29`, `30`, `31` AND `32` MOVED 2026-10-13 (the volume remedy of `contract.md`, at `95 %` of the per-path line): the four paragraph items' bodies are BYTE-EXACT at `archive/spec-history/2026-10-13-contract-respelling-record.md` (`§1` item `29` · `§2` item `30` with its `A109` amendment · `§3` item `31` · `§4` item `32`), each written there and re-read and verified BEFORE any byte left this document, NO RULE MOVED, and each row's NUMBER is UNMOVED. THE LIVE ARITHMETIC OF THIS LIST STANDS AT ITS CLOSE, ONE LINE BELOW, WITH BOTH ITS TERMS** (`RCA-8(g)`; `VH-2`).**

**THE LIST'S FIGURE, ITS TERMS AND ITS ONE HOME (re-derived and re-counted at the bytes by the supervisor's applier pass of 2026-10-13, the archival move's own record): the LIVE list on THIS path is `15` items — `15` TABLE ROWS, `#` `1`…`15`, `15` CHECKED, `0` OUTSTANDING; the WHOLE figure is `32` items, closed by three terms — `15` live HERE `+` `4` PARAGRAPH ROWS, `#` `29`…`32`, moved byte-exact to `archive/spec-history/2026-10-13-contract-respelling-record.md §6.1`–`§6.3` (item `29`'s head stands at that file's `§1`; its body is the same move's) `+` `13` ROWS, `#` `16`…`28`, standing byte-exact at `archive/spec-history/2026-10-13-recovered-provenance.md` — `15 + 4 + 13 = 32` ✓; the list's pre-compaction arithmetic stands at `archive/spec-history/2026-10-13-contract-respelling-record.md §6.4`, and the four paragraph rows KEEP the numbers a superseded plan assigned them** (`RCA-8(g)`; `VH-2`).



---

## §0. The index region's own rules — the claim ledger, the authority enum and the class set

### §0.1 The document's own form rules

1. **Two regions.** The index region above (status line with its `derivation:` clause, unit/prefix line, the
   inherited-rulings table, the scope boundary, the omissions table, the part map, the closure bullet and
   the re-spelling list) is **required content and carries no pinnable claim of the seven classes** — **AND THE LIST'S ROWS `16`…`28` ARE NO LONGER CARRIED IN THIS DOCUMENT: they MOVED, verbatim and in source order, to `archive/spec-history/2026-10-13-recovered-provenance.md` at the volume remedy of 2026-10-13, with their numbers UNMOVED, and the live list's census and terms stand at its close** (`RCA-8(g)`); the
   claim-bearing region is `§0.1` onward, and **every claim-bearing clause carries its authority and its
   class inline**.
2. **THE AUTHORITY TAGS THIS DOCUMENT USES, EACH INSIDE A CLOSED FOUR-VALUE ENUM, AND EVERY ONE OF THEM
   RESOLVES IN THIS REPOSITORY.** **(a) `R`** — the ARCHITECT'S RULINGS as this repository files them:
   **`R: docs/decisions.md` · `A98`** · **`R: docs/decisions.md` · `A99`** · **`R: docs/decisions.md` ·
   `A100`** · **`R: docs/decisions.md` · `A101`** — the four ACTIVE rows of `2026-10-13` whose own printed
   names carry those markers, each cited **by its marker**, which is the row's own printed name in that
   file — **AND THE `A105` LANDING PASS'S OWN CITATIONS ADD FOUR FURTHER ACTIVE ROWS OF THE SAME FILE, BY THE
   SAME RULE: `A102` · `A103` · `A104` · `A105`, so the `A` tag's resolved rows are `4 + 4 = 8` ✓ — `A98`,
   `A99`, `A100`, `A101` and those four — and NO citation of this directory is written to a marker that is
   not a row's own printed name (`VD-2`).** **(b) `P`** — the FILED PROPOSAL `docs/specs/storeroom-constraints/proposal.md`, cited as
   **`P: §1`** (the architect's proposal text, byte-verbatim) · **`P: §A.1`** · **`P: §A.2`** ·
   **`P: §B.1`**–**`P: §B.8`** (his two answer sets, verbatim). **(c) `A`** — ANY OTHER PATH THIS
   REPOSITORY CARRIES, written in full with its `§`-number: the store's and the JS unit's contracts, their
   parts, the trackers. **A cross-document citation is written with its own path plus its `§`-number,
   because a bare `§n` across two documents is not an edge** (`A: docs/specs/storeroom-native/contract.md
   §0.1` item 10(a)). **(d) `T`** — **what THIS contract itself declares**, always with the reason the
   declaration is this document's own to make.
   **NO FIFTH TAG EXISTS, AND NO CITATION OF THIS DIRECTORY IS WRITTEN TO A PATH THAT DOES NOT RESOLVE IN
   THIS REPOSITORY:** the process-rule specs the gate-1 record names (`docs/specs/spec-authoring-discipline/
   contract.md`, `docs/specs/adoption-semantics-gate/contract.md`, `docs/specs/spec-scope-and-structure/
   contract.md`) **are NOT readable from this root and are cited by NO clause of this directory** — the
   rules they carry are **stated in this document's own words and tagged `T`**, exactly as the store's
   contract does at its own `§0.1` item 7 (`[A: docs/specs/storeroom-native/contract.md §0.1` items 2, 7
   and 11 | CROSS-REF]`).
3. **The claim classes are the CLOSED seven:** **`CONTRACT`** · **`OBSERVATION`** · **`CENSUS`** ·
   **`CROSS-REF`** · **`OWED`** (always with an owner **and** a positive revisit condition, never bare) ·
   **`DECLARED-DEFAULT`** (always with its alternative priced) · **`NEGATIVE`**.
   **A claim with no authority, an authority outside the enum, or a class outside the set is a filing
   defect** (`[T: the class set, restated here so every clause below is checkable without an unfiled path |
   CONTRACT]`).
4. **THE ONE RULE ABOUT WHAT A CLause OF THIS UNIT MAY STATE.** **A clause whose subject is the kernel's
   own caller-side behaviour states it and cites a ruling or this document**; **a clause whose subject is
   the STORE'S behaviour CITES the store's clause and declares nothing new**; **a clause whose subject is
   neither settled by a ruling nor carried by the store's contract is written as `OWED`, with its owner and
   its positive revisit condition named.** **The third form is not a gap and is not a defect: it is the
   declared state of a subject the architect has not ruled** (`R: §11.1` — the `U22` residue; `P: §A.1`'s
   closing clause). **`J-20`–`J-22` and the two `CARRIED-OPEN` rows of the filing (`U12`, `U15`) are the
   subjects that land in the third form, and each appears below with its owner.**
5. **THIS UNIT'S `OWED` CELLS, ENUMERATED ONCE SO NONE IS LEFT BARE.** **(i)** the store-side evaluation
   seam's three parts — `J-20`–`J-22` — **owner the architect, positive revisit condition *a ruling recorded
   as an ACTIVE `docs/decisions.md` row*** — **the store-side row `J-21` fixing the timing, so the evaluation seam is what such a row nails down** (`A: docs/specs/storeroom-native/contract.md §7.3` clause 3). **AND THE WITHDRAWN PRE-STATE CLAIM STANDS INSIDE THIS SAME CELL, DECLARED HERE SO THIS UNIT'S GREEN IS HONEST ON THAT CLAIM TOO (`A: docs/decisions.md` · `A111`; `A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4): NO COMPOSITION OF THIS KERNEL LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING — a failed commit at an address the caller already wrote to UNDOES the caller's own earlier write there, the store's own reach being subtree-wide and backward to the oldest entry, and NO COMMIT-LEVEL ROLLBACK EXISTS — SO THE PRE-STATE CLAIM IS `OWED` TO `J-20`–`J-22` WITH THIS CELL'S OWN REVISIT CONDITION, AND IS NOT A VERIFICATION THE CLOSED CALLER-SIDE SURFACE CAN HAVE; its one home is `composition-and-states.md §2.6` item 8 (iii), which this cell CITES and does not re-state.** **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THE *"SUBtree-WIDE AND BACKWARD TO THE OLDEST ENTRY"* GROUND IS WITHDRAWN AT THIS CELL AND THE SENTENCE ABOVE IS READ THROUGH THIS MARK — ITS BYTES STAND (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT DOES NOT MOVE, NAMED SO THE MARK IS BOUNDED: THE PRE-STATE CLAIM STAYS `OWED` TO `J-20`–`J-22` AND STAYS WITHDRAWN — the ruling moves the store's SCOPE and does not make the store-side evaluation seam, so this cell's own operative conclusion is unchanged.** **WHAT MOVES IS THE GROUND AND THE DIRECTION OF THE CONSEQUENCE: the store's amended scope is the spatial test **AND** a temporal test (`E.seq` ≥ the named op's own `seq`), and `M-7`'s walk stops AT THE NAMED OP rather than at the oldest entry — so a failed commit at an address the caller already wrote to now LEAVES THAT EARLIER WRITE STANDING, and the state to be refused is its REVERSAL, not its loss** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), where the withdrawal, the corrected reading and the reconciliation register stand).
   **⟶ AND THE PER-LANDING CONSTRAINT PASS, AND WITH IT EVERY `checkpoint` THIS DIRECTORY READS AS AN OP, LAND
   INSIDE THAT SAME CELL — DECLARED HERE, ONCE, BECAUSE THE GATE-5 BLIND RUN FOUND A LIVE `K-2` RETURNING WITH
   NO PASS AT ITS LANDING AND EVERY `checkpoint` READING `null`, SO THE UNIT'S GREEN IS ENVELOPE-GREEN ON THAT
   LAYER AND NO CLAUSE OF THIS DIRECTORY MAY CLAIM A VERIFICATION THE CLOSED SURFACE CANNOT HAVE**
   (`live-greens.md`'s `CON-1`; `DR-7`'s `OWED` root at `J-20`–`J-22`): **THE PASS ITSELF IS `J-21`'s — the
   evaluation's timing relative to the landing — which is why no clause of this contract may declare it and why
   this cell, and not a new row, is its home; the KERNEL'S OWN evaluation of the same pairs at `K-3` is a
   separate act declared at `kernel-surface.md §2.3` item 1, and it CANNOT make a landing a last valid state by
   itself.** **AND THE SITES THAT DEPEND ON THIS PASS, NAMED ONE BY ONE SO EACH READS `OWED` HERE AND STATES
   NOTHING NEW OF ITS OWN — `5` CLAUSES, `6` SITES, `0` OF THEM A CLAIM OF OBSERVABILITY THEY KEEP:**
   **(a)** `kernel-surface.md §2.3` item 1's declaration that ONE PASS RUNS AT EVERY LANDING and that its result
   is pinned at the attempt's `checkpoint` member — **the pass is `OWED`, and the clause's claim that a write
   landing under a REGISTRATION is checked by it is a store-side obligation and is re-spelled as such there**;
   **(b)** `composition-and-states.md §2.6` item 8 (i)'s atomic-evaluation declaration, **(c)** that same
   item 8 (iii)'s `checkpoint` member — BOTH ALREADY CARRYING the layer ruling and the `OWED` beside it, so
   neither is re-spelled and this cell is their CITATION; **(d)** `parameter-semantics.md §2.17`'s `observable`
   cell, **re-spelled**: a drive reads the `null` arm off `RollbackStep.checkpoint` and can never read a
   non-null value there until the store-side pass lands; **(e)** `e2e-scenarios-b.md`'s `E2E-C-15` steps (4)–(5),
   whose inner and outer `checkpoint` readings are `null` at the blind run's build although that scenario's own
   subject requires an op, **re-spelled as `OWED` at its observation cell (5), one declaration for that window**,
   and `e2e-scenarios.md`'s `E2E-C-2` step (7), **re-spelled at the step** — **while `e2e-scenarios-b.md`'s
   `E2E-C-9` step (5) is NOT a site of this cell and is left as filed: its `checkpoint` reading is `null`, which is
   the arm a caller-side surface reaches either way, and its own premise is not a claim of observation** (`VF-10`;
   `RD-5`; `CW-07`; `CW-09`; `live-greens.md`'s `CON-1`);
   **(f)** AND `e2e-scenarios.md`'s `§3` `OWED` LIST, **whose own sentence that no expectation of the battery
   depends on `J-20`–`J-22` is FALSE AS FILED and is re-spelled there, the `3` cells above being the
   counter-example.** **NO FIGURE OF THIS DIRECTORY MOVES: the `KC` set stays `8` (`2 + 2 + 2 + 1 + 1`) on `13`
   sites (`1 + 4 + 4 + 3 + 1`), `PAR-C` stays `17` (`6 + 2 + 2 + 2 + 5`), the register stays `8 ≤ 8`, and
   `RollbackStep` `6`, `AttemptRecord` `9`, `CommitRecord` `3 + 1 = 4`, `AttemptReport` `5` and
   `RepairResult` `3` (`2 + 1`) are unmoved — because a member's own arm being `OWED` adds no member and
   removes none.**
   **(ii)** the attempt's WINDOW EDGES (`U12`, `CARRIED-OPEN`) — **owner: the architect, then this
   contract**, positive revisit condition *a ruling on the attempt's window, or phase `B2`'s reconciliation
   of this contract against the landed plan*. **AND WHAT THIS PARKS IS THE STORE-SIDE EXTENT OF THE EDGES
   AND NOT THE HOLD'S OWN RELEASE, STATED SO THE GATE-6 LIVE-CONTRADICTION ADJUDICATION IS NOT READ AS
   CLOSING THIS CELL** (`e2e-scenarios.md`'s `EO-1`, read with `attempt-lifecycle.md §2.4` item 6 (A)): the
   kernel's own window edges are DERIVED, and the one member whose row once asked whether a failure arm's
   standing remainder refuses a later `K-2` now carries that one reading at its own row —
   `fail-surface.md §2`'s `KC-7`, where the remainder is declared RESIDUE and NOT a live attempt — **so the
   cell above keeps its owner and its subject and no longer carries that question.** **(iii)** the journal's scope and lifetime INHERITED BY A
   CALLER-SIDE ATTEMPT'S referent (`U15`, `CARRIED-OPEN`) — **owner: the architect**, positive revisit
   condition *a ruling recorded as an ACTIVE `docs/decisions.md` row*; **this contract declares the attempt
   record caller-side and INHERITS NO JOURNAL REFERENT** (`P: §B.4`; `R: §11.4`). **(iv)** the reconciled
   plan region — **owner `role_spec_writer`**, positive revisit condition *phase `B2`* — **with the cell's
   re-derivation ALREADY STATED in this document's index region (the omission row for
   `implementation-plan`'s reconciled region, which re-derives the plan's hold row `1` as `MET` from
   `P: §A.1` · `P: §B.6` · `P: §B.7`) and with the LANDING of that cell in the input file owed to the `B2`
   pass, because `implementation-plan.md` is a gate-1 input this pass may not edit** (`VF-16`).
   **(v) THE FOUR ARCHITECT-OWNED RULINGS THE GATE-2 RE-REVIEW PARKED — AND, SINCE THIS PASS, THE TWO OF THEM
   THE ARCHITECT HAS ANSWERED.** **Each row names one question and states what it does not block; `2` of the
   four now read `ANSWERED` because the architect's ruling of 2026-10-13 answers them, and the other `2`
   remain `OPEN — awaiting the architect`, settled by no clause of this directory.** **Each cell's owner is
   THE ARCHITECT, and each cell's positive revisit condition is *a ruling recorded as an ACTIVE
   `docs/decisions.md` row*, followed by a bounded amendment of `docs/specs/storeroom-constraints/`:**

   **THE RULING THAT ANSWERS ROWS `2` AND `3`, CARRIED VERBATIM SO THE ANSWER IS QUOTED AND NOT PARAPHRASED —
   the architect's own words: *"Clarification on 1: Roll back to the last state that passed all
   constraints."*** — **recorded as the ACTIVE `docs/decisions.md` row whose printed name carries `A102` and
   LANDED at `composition-and-states.md §2.6` item 8 (its `(i)`–`(vi)`, the stop op's own clauses at item 3, item 4 and item 8 (ii) (5) included), at `attempt-lifecycle.md §2.4` item 8 (ii) (g), the cross-address clause and the ONLY one this ruling's `D4` limb lands on, at
   `parameter-semantics.md §2.17`, at `e2e-scenarios.md`'s re-derived `E2E-C-2` and at `e2e-scenarios-b.md`'s re-derived `E2E-C-9`, with its new
   `e2e-scenarios-b.md` `E2E-C-15`.** **What it pins: the composition's target and its STOP OP are one value — the checkpoint, carried as the op whose landing left the last valid state (`D1`) — that state defined in this unit's own terms with its evidence, recorded
   on a declared shape, and observable by a caller (`D2`); the store's floor not overridden (`D3`); and the
   cross-address, re-entrant case following from the same rule (`D4`).** **AND ITS FURTHER ANSWERS AT THIS
   PASS' RULING-LANDING LAND TOO — *"Redefine the checkpoint AS the stop op."* (`Q-A`) and *"if `a.b/y`
   passes constraints, then it is the last valid state when `a/x` is attempted, and `a/x` is rolled back to
   `a.b/y`. Single writes are checked atomically."* (`Q-B`) — with `A103` fixing the commit registry's
   clearing rule (`Q-C`, `D5`, stated once at `§5.7`) and the set's last five findings `CW-07`–`CW-11`
   closed by them.**

   | # | `OWED` id | The question, as it stands | `STATUS` | Owner | The positive revisit condition that closes it | What it does **not** block |
   | --- | --- | --- | --- | --- | --- | --- |
   | **1** | **`RC-3`** | **THE CLOSED-ATTEMPT STORE'S RETENTION: `attempt-lifecycle.md §2.4` item 7 (ii) holds every closed attempt's report and full final log for the LIFE OF THE KERNEL INSTANCE — no bound, no eviction arm and no enumerator exist, and the kernel declares no sixth surface item through which one could be reached.** **Is a retention bound or an eviction arm ruled, or is the unbounded lifetime the declared answer?** | **`OPEN — awaiting the architect`** | **the architect** | **a ruling recorded as an ACTIVE `docs/decisions.md` row on the closed-attempt store's retention, or the same pass's confirmation that the unbounded lifetime is the declared answer** | **it does NOT block this contract's authoring or the red set, and no scenario of `e2e-scenarios.md` observes a closed record's absence: `K-4`/`K-5` are declared single-valued over a reference the kernel holds, and the retention question is about a reference the kernel no longer holds** (`RC-3`) |
   | **2** | **`RC-14`** | **THE PER-OP ROLLBACK'S COLLATERAL REACH: the store's own reach is subtree-wide and candidate-set-wide, so a failing attempt's per-op calls undo store operations THIS ATTEMPT DID NOT CREATE — and no scenario bounds that loss.** **Is the undoing bounded to the attempt's own ops, or is the collateral reach declared as the lawful end state?** | **`ANSWERED` — by the architect's ruling of 2026-10-13 recorded as the ACTIVE `docs/decisions.md` row `A102`: *"Clarification on 1: Roll back to the last state that passed all constraints."* (`D1`)** **THE COLLATERAL REACH IS THE RULED END STATE AND IT IS BOUNDED BY THE CHECKPOINT: the per-op `rollback` walks back over THE OPS THE COMMIT REGISTRY HOLDS SINCE THE CHECKPOINT — the ops the attempt made since its last valid state — and stops at the checkpoint op, over which NO CALL IS EVER ISSUED — an op AT or before that op is NOT undone whether or not the attempt created it, and an op after it IS undone whether or not the attempt created it** (`Q-A`; `Q-B`; `composition-and-states.md §2.6` items 4 and 8 (i) and (v); `e2e-scenarios.md`'s `E2E-C-2`) | **the architect** | **a further ruling recorded as an ACTIVE `docs/decisions.md` row, or phase `B2`'s reconciliation** | **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THIS ROW'S *"UNDOES THE CALLER'S OWN EARLIER WRITE THERE"* LIMB IS WITHDRAWN AT THIS CELL, WITH THE WORDS *"the store's own reach being subtree-wide and backward to the oldest entry"* AS ITS GROUND — THE ROW'S BYTES STAND AND ARE READ THROUGH THIS MARK (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT STANDS AT THIS ROW: its `ANSWERED` verdict, its `A102` `D1` provenance, its collateral-reach reading (*"an op after it IS undone whether or not the attempt created it"* — now bounded on BOTH sides, by the checkpoint AND by the store's temporal floor: an op the attempt did not create is undone by a call only where its own `seq` is at or after that call's named op's), the `KC-8`/`P-TP-7` cells, and `A111`'s pre-state withdrawal as an `OWED` to `J-20`–`J-22`.** **WHAT MOVES: THE ANSWER TO *"is the collateral reach the lawful end state"* IS NARROWED AT THE ONE LOSS THIS ROW NAMED — a failed commit no longer UNDOES the caller's own earlier write there; the earlier write STANDS, and its reversal is a defect** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home and the reconciliation register's home). **it does NOT block the unit: `P-TP-7` (`§5.7`) asserts the store's standing ONLY where every op the attempt created lies under a call the composition performed — AND, BY THE ARCHITECT'S RULING OF 2026-10-13 RECORDED AS THE ACTIVE `docs/decisions.md` ROW `A111` (`A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4), THAT ASSERTION NO LONGER READS AS *"the store stands at the pre-state"*: a failed commit at an address the caller already wrote to UNDOES THE CALLER'S OWN EARLIER WRITE THERE — the STANDING LIMIT of the closed caller-side surface, `OWED` to the store-side pass `J-20`–`J-22` (`contract.md §0.1` item 5 (i)) — while the collateral reach this row declares stands as ruled, bounded by the checkpoint and aimed by the call list** (`RC-14`; `composition-and-states.md §2.6` item 8 (iii)) |
   | **3** | **`RC-18`** | **TWO LIVE ATTEMPTS AT NESTED ADDRESSES: `attempt-lifecycle.md §2.4` item 8 (ii) (a) refuses a second kernel attempt only at THE SAME address — the item that DECLARES the refusal, this row's citation having named item 6 (B), which declares no such refusal and is superseded here (`VG-10`) — so two lawful attempts at addresses one of which is a prefix of the other may both stand live and one composition may undo the other's ops.** **AND THE SAME OPENNESS CARRIES THE CROSS-ADDRESS RE-ENTRANT `K-2`/`K-3` SEQUENCE, NAMED HERE SO IT IS ADJUDICATED IN THIS ROW AND NOT INVENTED IN A CLAUSE (`RD-5`, `RC-18`'s family): a re-entrant `K-2` for ANOTHER address opens a second attempt while the live attempt stands at the first, and a re-entrant `K-3` carries that second attempt's own `CommitRecord.attempt` — so the two refusals `attempt-lifecycle.md §2.4` item 8 (ii) (a)–(b) declare PER ADDRESS are asked here for the cross-address case too.** **Is a cross-attempt arm declared, or is a second live attempt refused kernel-wide?** | **`ANSWERED` — by the same ruling, `A102`'s `D4`: nested attempts ACROSS ADDRESSES are ADMITTED — `KC-7` is refused only at the address that already holds the live attempt (`attempt-lifecycle.md §2.4` item 8 (ii) (g)) — and the boundary between them is THE CHECKPOINT, so an inner write that PASSED EVERY REGISTERED PAIR AT ITS OWN ADDRESS as it landed outlives the outer attempt's violating op — the architect's own example, `a/x` rolled back to `a.b/y` (`Q-B`) — and the walk never undoes past that op merely because the surviving op was another attempt's; the answer uses the EXISTING member `KC-7` and MINTS NO NINTH** (`composition-and-states.md §2.6` items 4 and 8 (v)–(vi); `e2e-scenarios-b.md`'s `E2E-C-15`) | **the architect** | **a further ruling recorded as an ACTIVE `docs/decisions.md` row, or one refusing a second live attempt kernel-wide, or phase `B2`'s reconciliation** | **it does NOT block the unit: `KC-7`'s `K-2` half stands exactly as `fail-surface.md §2` prints it, and the cross-address window is now DRIVEN by `e2e-scenarios.md`'s `E2E-C-15`** (`RC-18`) |
    **AND ONE CLAUSE OF THIS ITEM IS WIDENED BY A LATER ANSWER OF THE SAME ARCHITECT, DECLARED HERE SO `RC-18`'s ANSWER IS NOT READ AS NARROWER THAN IT IS** (`VC-1`; `CX-1`): **the checkpoint op's AUTHOR is not restricted: `A: docs/decisions.md` · `A104` — *"Yes — the checkpoint may name an op ANOTHER attempt landed."* — CONFIRMS the cross-attempt reading this row's `(v)` and `composition-and-states.md §2.6` item 8 (v) already print, and `parameter-semantics.md §2.17`'s `the values OUTSIDE it` cell WITHDRAWS its *"an op of another attempt"* exclusion BY NAME; the member's domain and the pin's instant have ONE home each, and `§5.7` states them** (`contract.md §5.7`; `kernel-surface.md §2.3` item 1; `parameter-semantics.md §2.17`).
   | **4** | **`RC-19`** | **THE FINITE BOUND'S AUTHORITY: *"fail on the first repeat, never repeat a repair"* is adopted from corpus token `R15`, which this repository carries ONLY as the dossier's `AM-1` row with `STATUS: OVERFLOW` and the words *"awaiting spec"* — no in-repo text states the ruling itself.** **Is the ruling's text obtained, or is the bound restated as this unit's own clause?** | **`OPEN — awaiting the architect`** | **the architect** | **a ruling recorded as an ACTIVE `docs/decisions.md` row carrying the ruling's own text, or the architect's restatement of the bound as this unit's own clause** | **it does NOT block the unit: `P-SM-6` (`§5.6`) and `P-TP-8` (`§5.8`) already state the bound in this unit's own words, `A100` is an ACTIVE row adopting `R15` BY NAME, and every drive of `P-SM-6` reads an arm of `attempt-lifecycle.md §2.4` item 4 and a member of the log rather than the corpus token** (`RC-19`) |

   **(vi)** nothing else BESIDE `(vii)` BELOW:
   **`0` bare `OWED` stands in this directory, and every cell of (v) — AND THE ONE CELL `(vii)` BELOW, ADDED
   2026-10-15 — is owner-named and carries a
   positive revisit condition exactly as `§0.1` item 3 requires.** **AND THE TABLE'S STATE IS MIXED AND
   PRINTED AS SUCH, AND ITS FIGURES ARE `(v)`'S OWN FOUR AND DO NOT COUNT `(vii)`: `2` of the four are PARKED and NOT ANSWERED — the pass that put them names the architect
   and stops (`RC-3`; `RC-19`) — and `2` are ANSWERED by the architect's ruling (`RC-14`; `RC-18`), whose
   landing sites are named in the ruling's own paragraph above.** **No row's owner column and no row's
   *"what it does not block"* cell is rewritten by the answering: the answer moves the `STATUS` cell and the
   question's own closure, and nothing else.**
   **(vii) THE ORDERING SEAM'S ABSENT-MEMBER ARM — ADDED 2026-10-15 BY THE REMAND OF THE `A116` DOCUMENTATION
   REVIEW (`role_spec_writer`), BECAUSE THIS UNIT DECLARES THE SEAM AS A REQUIRED CALL AND DECLARES THE ARM
   NOWHERE.** **THE SUBJECT: what this unit does at its two call sites when the instance's `settle` member is
   ABSENT — or present and not a function: whether it REFUSES, SKIPS the seam and issues the write, or throws
   — is NOT DECIDABLE FROM THIS UNIT'S DECLARATIONS, no clause of this directory stating the member's
   presence and the JS unit's clauses declaring the set `{ register, on, off, settle }` without an
   absent-member arm either** (`kernel-surface.md §2.1` item 2's seam clause and item 3's, which declare the
   two call sites and this arm as an OPEN hole; `A: docs/specs/storeroom-js/surface.md §2.4` item 9).
   **OWNER: the architect, positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row
   on the seam's absent-member arm, followed by a bounded amendment of this directory and of
   `docs/specs/storeroom-js/`*.** **IT DOES NOT BLOCK THIS UNIT: the seam's two call sites, their instants
   and the member's identity are declared at `kernel-surface.md §2.1` items 2–3, the kernel's five-item
   extent stands, `CommitRecord`'s `4` members stand, the register's `8` rows stand and no cell of the
   battery depends on this arm.** **NO CLAUSE OF THIS DIRECTORY MAY BE READ AS SETTLING IT.**

### §0.2 The design-default rows this contract carries, each reversible with its alternative priced

**WHAT A `DD`-CLASS CELL IS HERE.** **This directory carries NO `DD-n` family** — the id families are the
four the status block names, and a `DD-n` row would collide with the store unit's own family. **Where this
contract must declare a residual the architects' rulings do not fix, it declares it INLINE, at the clause
that needs it, tagged `[T: <the clause> | DECLARED-DEFAULT]`, with its alternative priced and its reversal
point named.** **The reversal point for every such clause is ONE instrument and it is stated once here: a
fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment
of `docs/specs/storeroom-constraints/`, owned by `role_spec_writer`.**
**THE INLINE DECLARED DEFAULTS THIS DIRECTORY CARRIES, ENUMERATED SO EACH IS FINDABLE:** **(1)** the kernel
module's own declared name (`kernel-surface.md §1`); **(2)** the kernel's failure form's member set
(`fail-surface.md §1.1`); **(3)** the message log's entry member set — **six members, the `state` member
included** (`kernel-surface.md §2.5`); **(4)** the kernel's evaluation order within one pass — **the pass's
scope and its sequencing around a repair transition included** (`attempt-lifecycle.md §2.4`); **(5)** the attempt
record's member set (`attempt-lifecycle.md §2.4`); **(6)** the repair result's member set
(`kernel-surface.md §2.3` — **its `op` member included since the `A110` pass of 2026-10-13, the shape's `3` members across its two arms being `2 + 1 = 3` ✓, its ONE HOME for the seam being `parameter-semantics.md §2.7` and the member set's own count standing at `kernel-surface.md §1` item 4**); **(7)** the ATTEMPT CONTEXT's member set — the constraint's one argument
(`kernel-surface.md §2.3`); **(8)** the REPAIR CONTEXT's member set — **the five members, `value` and `tier`
included** (`kernel-surface.md §2.3`); **(9)** the ROLLBACK STEP's member set — what each per-op call
returned, **whether it returned at all, and the composition's own target: the `failed` arm and
the `checkpoint` member included** (`kernel-surface.md §1` item 4 — **the ONE home that reprints `RollbackStep`'s member count, `6`**; `composition-and-states.md §2.6` item 3 carries the
member sentence and reads its count from there, so no third clause mints a figure of its own; `parameter-semantics.md §2.17` prints the same set as its own `domain` cell's obligation; `A: docs/decisions.md` · `A102` — the
count is re-derived at that pass from `5` to `6` and every reader of the shape is re-derived with it). **`9` inline declared defaults, each priced at its own clause, `0` of them a
subject the architect ruled** (`[T: §0.2`'s own census, printed with its terms | CENSUS]`). **AND THE TERMS
ARE THE ENUMERATION ABOVE AND NOTHING ELSE: the `9` is the count of the nine numbered items `(1)`–`(9)`, one
clause each — `9` items · `9` inline declared defaults · `9 − 9 = 0` items unnumbered — so the figure and its
enumeration close** (`NV-8`).
**AND ONE CLOSED LIFETIME THAT IS NOT A DECLARED DEFAULT, STATED HERE SO IT IS NOT MISTAKEN FOR ONE:** **the
closed-attempt record's lifetime — held for the life of the kernel instance, with no eviction declared — is
`attempt-lifecycle.md §2.4` item 7 (ii)'s own rule, is tagged `DECLARED-DEFAULT` AT THAT CLAUSE, and is not
double-counted in the `9` above** (`VF-5`).

---

## §5. The typed property register — `8` rows, cap `≤ 8`

**THIS REGISTER IS THIS UNIT'S OWN, ITS ROWS ARE `P-IM`/`P-SM`/`P-TP`, ITS CAP IS `≤ 8` AND HOLDS AT
`8 ≤ 8` ✓, AND NO ROW IS AN `F`-ROW AND NONE IS A `§6`/`FS-n` FORM.** **It is authored HERE, in this
document, in the same pass as the parts, and no row is added to the store's register or to the JS unit's**
(`P: §B.1` — *"A NEW UNIT with its own `≤ 8` register"*; `R: §11.1` — *"THE UNIT'S OWN DIRECTORY AND ITS OWN
`≤ 8` REGISTER NOW EXIST"*; `R: §11.5` — `AR-7` standing).

### §5.0 The register's census, printed with its terms

**`8` rows — `P-IM-1` · `P-IM-2` · `P-IM-3` (invariants) + `P-SM-4` · `P-SM-5` · `P-SM-6` (state/arm rows)
+ `P-TP-7` · `P-TP-8` (transition/property rows) — `3 + 3 + 2 = 8` ✓**, **and every row below carries: its
property · one or more strategy ids · and an explicit FAILURE LIST.** **A strategy id names the SHAPE of the
drive; a row's failure list names every observable that makes it FAIL.** **AND THE EIGHT IDS ARE NOW THIS UNIT'S ALONE, 2026-10-17 (`DEF-2026-10-16-S`'s re-mint pass; `RCA-8(g)`: this census line stands BYTE-FOR-BYTE above and is read THROUGH this clause, which re-spells NOTHING here and states the one fact that changed): the ids were SHARED with `U-STOREROOM-JS` until that unit's eight were re-minted to `P-SR-1`…`P-SR-8`, and THIS UNIT'S EIGHT SPELLINGS, THEIR ORDER, THEIR THREE TERMS AND ITS `8 ≤ 8` ✓ ARE UNMOVED.** **AND THE `§5.1`–`§5.8` ROW HEADERS BELOW ARE UNMOVED WITH THEM: every one of the eight rows stands at its own `§`-number, carrying its own id, its property, its strategy ids and its failure list, and NO ROW'S TEXT MOVED IN THIS PASS** (`docs/specs/storeroom-js/contract.md`'s unit/prefix line and its `DD-3` row as re-derived; `DEF-2026-10-16-S`; `§5.1`'s own row below). **THE REGISTER'S OWN ARITHMETIC IS
PRINTED WITH ITS TERMS AND AGAINST BOTH NEIGHBOURS: the store's register stands `8 ≤ 8` ✓ and the JS unit's
stands `8 ≤ 8` ✓ — this unit's `8` is a THIRD surface and moves neither** (`A: docs/specs/storeroom-native/
contract.md §0.1` item 5; `A: docs/specs/storeroom-js/contract.md §5.0`; `[T: this unit's own census |
CENSUS]`).
**AND THE FIGURE IS UNMOVED BY THE RULING-LANDING PASS OF 2026-10-13, WHICH RE-DERIVED `P-TP-7`'s TEXT AND ADDED NO ROW — the same `3 + 3 + 2 = 8` terms reprint above, and `A103`'s `D5` rule is stated INSIDE `P-TP-7` and not as a ninth row.** **AND ONE DUAL-MAPPING DISCLOSURE, PRINTED BECAUSE THIS SPAN PRINTS TWO READING SYSTEMS:** **the numbered
span `§5.1`–`§5.8` carries `8` REGISTER ROWS and nothing else, and a `P-*` ID's ordinal does NOT track the
`§`-number — the id family's ordinal is the row's own and the `§`-number is its POSITION here.** **So a `§n`
citation names the section and a `P-*` citation names the row, and a sentence reading *"`§5.4`'s `P-SM-4`"*
is naming a section and the row that lives in it** (`[A: docs/specs/storeroom-js/contract.md §5.0` — the
same disclosure at the sibling's own register | CROSS-REF]`).

**⟶ AND THIS CENSUS'S OWN DISAMBIGUATION IS RE-DERIVED AT THIS CELL, 2026-10-17 BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`; `RCA-8(g)`: the census and the disclosure above stand BYTE-FOR-BYTE and are read THROUGH this clause, which moves NO term of their arithmetic and adds no row).** **THE `8` IS UNMOVED AND ITS TERMS ARE UNMOVED: `8` rows — `P-IM-1` · `P-IM-2` · `P-IM-3` (invariants) + `P-SM-4` · `P-SM-5` · `P-SM-6` (state/arm rows) + `P-TP-7` · `P-TP-8` (transition/property rows) — `3 + 3 + 2 = 8` ✓, the cap holding at `8 ≤ 8` ✓; the register stays a THIRD surface, the store's stands `8 ≤ 8` ✓ and the JS unit's stands `8 ≤ 8` ✓.** **WHAT MOVES IS ONE FACT AND NOT ONE FIGURE: THE JS UNIT RE-MINTED ITS EIGHT IDS TO `P-SR-1`…`P-SR-8`, so the two registers are now DISJOINT (`8 + 8 = 16` DISTINCT IDS, `0` SHARED) and THIS SPAN'S OWN DUAL-MAPPING DISCLOSURE — *"a `§n` citation names the section and a `P-*` citation names the row"* — keeps its `§`-half ONLY: a bare `P-IM-1` now names ONE row in this repository, and it is OURS.** **AND THE TWO CITATIONS ABOVE STILL RESOLVE EXACTLY AS PRINTED: `§5.4`'s `P-SM-4` is this unit's row, and the sibling's `§5.0` disclosure is the sibling's own** (`docs/specs/storeroom-js/contract.md`'s unit/prefix line and its `DD-3` row as re-derived; `DEF-2026-10-16-S`; this document's index-region clause of the same date).

### §5.1 `P-IM-1` — the registration key's uniqueness domain, and the handle check's side

**Property.** **THE REGISTRY IS KEYED BY THE PAIR (`address`, `id`): for every registered pair the key is
EXACTLY that pair — the `address` as the store's own address domain fixes it and the `id` as the caller
spelled it — and the pair's key is UNIQUE in the registry.** **AND THE UNIQUENESS CLAIM READS THE PAIR THROUGH ITS ONE DECLARED SPELLING AND NOT THROUGH A BARE `#`-SPLIT: the pair's key is EXACTLY the token of `attempt-lifecycle.md §2.4` item 2, whose form is INJECTIVE — each address segment length-prefixed inside the address half and the id appended after the ONE `#` the address half cannot carry — so distinct pairs spell DISTINCT keys and no two registry entries can stand under one key (`S6`; `VF-3`).** **A registration at an `address` the registry
already holds under a DIFFERENT `id` is a SEPARATE key and both stand; a registration at an address AND id
the registry already holds is IDEMPOTENT — it adds no second entry and replaces the FIRST registration's
function with the new one.** **AND THE HANDLE CHECK SITS STORE-SIDE: the `address` a registration names is
checked by the store's own listener machinery *"as normal for listeners"*, while the registry itself has NO
store entry.** **AND THE TWO REGISTRIES THIS UNIT DECLARES ARE DISTINCT AND NEITHER IS RE-KEYED HERE: this row's pair-keyed registration registry holds functions and no op, while the COMMIT REGISTRY — the ops a processing holds — is KEYED PER PROCESSING at its own one home, `§5.7`** (`attempt-lifecycle.md §2.4` item 7 (i)).
**Strategy ids.** **`S-KEY`** (the pair's uniqueness, one drive per in-domain pair and per duplicate pair) ·
**`S-KEY-ADDR`** (one address, two ids: both stand, and the store's listener machinery holds ONE entry at
that address because `listen` is idempotent at the address level) · **`S-CHECK`** (the handle check's side:
a registration whose address the store refuses, and a registration whose address the store admits).
**FAILURE LIST.** a second entry at one pair; a registration whose `id` is the key and whose `address` is
not; an address-keyed registry that makes two ids at one address one registration; **a SECOND store home entry
arising from a registration — the reading this failure item carries, and NOT the entry a `register` lawfully
creates: `K-1` calls the store's own `listen(address)` once, so a registration at a fresh address DOES write
one store home entry, exactly as the app's own `listen` at that address would, and the failure is a SECOND
home entry (a second `listen`, a second token, or a registry pair holding a store entry of its own)**; a
handle check that runs caller-side; a store-side registration entry that arises from a registration **in
addition to the one the store's own `listen` creates**.
**The clauses it cites.** `kernel-surface.md §2.1` · `kernel-surface.md §2.2` ·
`parameter-semantics.md §2.1`–`§2.3`.
(`P: §B.7` — *"A caller-side registry keyed by address + id (no store entry)"* · *"the store's listener
machinery and its closed record shapes stay untouched; only the handle check duty sits store-side"*;
`P: §A.1` — *"The handle is checked within the rust store as normal for listeners"*; `R: docs/decisions.md`
· `A98`/`A99`; `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) — the address-level
idempotence and the mint rule; `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (a) — the
closed two-member listener record | CONTRACT`)
**AND THE READING THIS ITEM'S FIRST WRITING PRINTED IS WITHDRAWN BY NAME, BECAUSE IT CONTRADICTED `K-1`'s OWN
CALL** (`RC-4`): **the phrase *"a registration that writes a store entry"* is WITHDRAWN — the lawful entry the
store's own `listen(address)` creates at `K-1` is not an entry a registration may not write, and reading the
item that way made every lawful registration a failure. THE ONE LIVE READING IS THE SECOND-HOME-ENTRY READING
PRINTED ABOVE, and no clause of this directory carries the withdrawn one** (`RC-4`; `kernel-surface.md §2.1`
item 1).

### §5.2 `P-IM-2` — the per-attempt record's closure, and its non-crossing of the store's surface

**Property.** **THE ATTEMPT'S RECORD IS THE KERNEL'S OWN AND IS CLOSED AT ITS DECLARED MEMBERS: the returned
messages (the MESSAGE LOG), the OPS CREATED and THE SET OF WHAT HAS ALREADY RUN are all carried by the
kernel's own shapes, and NOTHING OF THEM CROSSES THE STORE'S SURFACE — no store verb takes one, no store
record holds one, and no store code names one.** **An attempt's record exists in TWO declared places over its life, and the two are different shapes: the MUTABLE registry entry, which exists ONLY while its attempt is open and is removed by the attempt's own terminal act — at FAILURE (its log thrown to the caller) and at SUCCESS (returned) alike — and the CLOSED-ATTEMPT RECORD, which the same terminal act places in the kernel's own caller-side store keyed by `AttemptRef` and holds, read-only, for the life of the instance.** **The two are never both standing for one attempt, and no attempt is left in the OPEN-ATTEMPT registry by either terminal arm — WHICH IS THE CONDITIONAL THIS SENTENCE NOW IS, READ AT THE PER-ARM TABLE (`attempt-lifecycle.md §2.4` item 3; `VD-9`): the arm that removes the open entry is ALWAYS the attempt's own terminal act, while a STANDING COMMIT-REGISTRY ENTRY IS LEFT BY ANY FAILURE ARM WHOSE COMPOSITION IS NOT A SUCCESSFUL ROLLBACK — that entry being the residue of its own un-undone ops and cleared by no later act of this kernel, because the clearing act IS the terminal act's removal and that act has run** (`attempt-lifecycle.md §2.4` item 7 (i); `composition-and-states.md §2.6` item 10).
**Strategy ids.** **`S-REC`** (the record's member set, one drive per member) · **`S-REC-SURFACE`** (no
store verb takes or returns any part of the record: the write's returned shape is the store's own
`{op, watched, triggered}` and carries no constraint member) · **`S-REC-DISPOSE`** (the two disposal arms:
failure throws the log, success returns the report) · **`S-REC-RETAIN`** (the closed attempt's record: `K-4`
returns its final log and `K-5` its report, while a fresh `K-2` at that address does not throw `KC-7` because
the registry entry is gone).
**⟶ AND THE RETENTION IS NARROWED FROM 2026-10-28 — `D-58`, AND `RC-3` IS ANSWERED BY IT.** `RCA-8(g)`
ANNOTATE-BESIDE: **the paragraph above and the two strategy lines `S-REC-RETAIN` and `S-REC-DISPOSE` stand
BYTE-FOR-BYTE and are read THROUGH this clause; the two-place life, the per-arm table and the marker
prohibition do not move.** **The ruling is `strata/decisions.md` · `D-58`, the architect, verbatim: *"The client
does not need any insight into the current state of a commit/attempt before it completes. Don't expose any of
it. After a commit/attempt resolves/rejects, the store does not need to retain the message log or other
client-returned data. Don't retain it."***
- **`K-4`'s LIVE ARM REFUSES `KC-7`** — the member `K-5` already answers — so **no in-flight `seq` list is a
  consumer read**, and the two readers refuse an open attempt with ONE three-member form, ONE message family
  and ONE empty `log` (`bindings/js/src/entry/kernel-terminal.mjs`; `DW-11.1`, `DW-11.2`).
- **ONCE THE ATTEMPT RESOLVES OR REJECTS THE STORE RETAINS THE OUTCOME, THE OPS AND THE REVERSAL'S RECORD AND
  NO LOG**: the closed record `K-5` answers is `{attempt, outcome, ops, rollback}`, and **`K-4` over a closed
  attempt still answers — the empty retained list** (`bindings/js/src/entry/kernel-terminal.mjs`'s
  `dropHandoff`; `DW-11.3`). **The list is the HANDOFF's**: `K-3`'s return or the refusal a caller caught, sealed
  and the consumer's only copy (`DW-11.4`).
- **WHAT THAT COSTS, NAMED RATHER THAN PAPERED OVER**: on an arm whose handoff carries no list — a repair
  body's own throwable, and a PASSING call through the published `write` (whose record is
  `{op, watched, triggered}` and has never carried a log) — **the entries are no longer observable anywhere
  after the close**, and the cells that measured them there now say so (`ck_states`'s repair-throw arm,
  `ck_p_neg_17`'s arm 2, `repair-in-commit`'s `seq` reading, which moves to a direct `K-2`/`K-3` handoff).
- **AND THE CLOSED RECORD NO LONGER EQUALS THE `K-3` RETURN**, which is the seal's own consequence: the record
  the client holds is frozen and final, and the store's is the reduced one.
**FAILURE LIST (READ THROUGH THE CLAUSE ABOVE).** **a closed record that RETAINS a `log` member, or an entry
of one; an open attempt whose list `K-4` answers**; a store verb that accepts an attempt record; a store record that holds a message-log
entry; **a registry entry that survives its attempt**; a success that leaves its registry entry standing; a
failure that leaves its registry entry standing; a log returned to the caller that omits an entry the
attempt made; **a closed attempt whose record `K-4` or `K-5` cannot reach; a closed attempt whose record is read for an `appliedRepairs` member — a member no closed record carries, so the "retained read-only history" reading is WITHDRAWN BY NAME and a later attempt's decision cannot be drawn from one (`NX-1`; `RD-4`)**.
**The clauses it cites.** `attempt-lifecycle.md §2.4` · `fail-surface.md §1`.
(`P: §B.4` — *"THE KERNEL'S OWN RECORD, DECLARED IN THE JS DIRECTORY"*, as put: *"the message log's order
the kernel's own (`AR-9`), nothing crossing the store's surface"*; `R: docs/decisions.md` · `A98` — D3, *"the
attempt's record, the message log and the applied-repair record are the unit's OWN caller-side shapes"*;
`A: docs/specs/storeroom-native/write-and-read.md §3.6` — the write's closed three-member `WriteResult`;
`A: docs/specs/storeroom-native/contract.md §1.7` | CONTRACT`)

### §5.3 `P-IM-3` — the constraint-failure channel never carries a store code

**Property.** **EVERY CONSTRAINT FAILURE THIS KERNEL REPORTS REACHES THE CALLER AS THE KERNEL'S OWN THROWN
FORM, WHOSE `status` IS ONE OF THE KERNEL'S OWN DECLARED STATES `KC-1`–`KC-8` AND NEVER A MEMBER OF THE
STORE'S CLOSED `15`-MEMBER SET; and the closed `15` stands UNTOUCHED — no member minted, renamed or
re-ranked.** **AND THE CLAIM THIS ROW'S FIRST SENTENCE MAKES IS READ AS A SCOPE AND NOT AS A UNIVERSAL, NAMED AT THE ONE PLACE IT IS NOT UNIVERSAL** (`S7`): **on the CONSTRAINT-BODY and REPAIR-BODY THROW PATHS the caller holds the BODY'S OWN THROWABLE and NOT a form of this shape at all (`fail-surface.md §1.1` item 5), so NO `status` MEMBER AND NO `KC` TOKEN EXISTS ON THOSE PATHS — the attempt's own record still carries its `outcome` entry, whose `state` is `null` on the constraint-body path and `KC-4`'s token on the repair-body path (`kernel-surface.md §2.5` item 1; `composition-and-states.md §2.7` item 13) — so *"EVERY constraint failure reaches the caller as the kernel's own thrown form"* is read as *"every constraint failure that reaches the caller AS A KERNEL FORM carries one of the kernel's own declared states, and no constraint failure ever carries a store member"*, WHICH IS WHAT STANDS.** **AND THE PROPERTY'S SUBJECT IS THE ATTEMPT'S FAILURE AND THE KERNEL'S OWN REFUSALS, NOT EVERY
`listen` CALL THE KERNEL MAKES: where the STORE's own `listen(address)` REFUSES an in-domain address, the
store's own code is thrown in the store's own form and reaches the caller UNCONVERTED, which is the STORE's
failure on the STORE's channel and NOT a failure of this property's subject**
(`kernel-surface.md §2.1` item 1's two channels; `fail-surface.md §1.2` item 2). **AND THE CONVERSE HOLDS, SCOPED TO THE SENTENCES THE KERNEL ITSELF COMPOSES: every message the
kernel REPORTS IN A SENTENCE IT COMPOSES is the kernel's OWN text, and no store generated string is ever used
as a constraint failure's message.** **THE SCOPE IS THE WHOLE OF THE CONVERSE AND IT IS NAMED BECAUSE THE
FAILURE FORM ALSO CARRIES THE CALLER'S OWN TEXT WHOLE** (`RC-17`): **a constraint's own violation string and
a repair's own *"what was attempted"* reach the caller inside the failure form's `log` and inside its
`repair-run`/`constraint-check` entries exactly as their authors spelled them — CARRIED, never rewritten and
never regenerated — so THIS UNIT'S CONVERSE IS NOT *"every message is the kernel's own text"*: it is *"every
sentence the kernel COMPOSES is the kernel's own, and the caller's own text is carried whole beside it"*, the
two provenances being the two `fail-surface.md §1.1` item 2 prints** (`A: docs/specs/storeroom-native/
contract.md §8.2` — the store's generator is the store's, and a constraint failure has no store code for it
to generate from).
**Strategy ids.** **`S-CHAN`** (all `8` kernel states are reachable and none is a store code) ·
**`S-CHAN-CONV`** (the `16`-member converse: no drive of this unit produces a store member as a CONSTRAINT
failure's status — **⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: this cell read `15`, BYTE-FOR-BYTE
above and read THROUGH this reading; the store's set is `16` with `ConstraintListInvalid` appended at rank
`16` (`docs/specs/storeroom-native/contract.md §8.1`'s dated clause of 2026-10-15), and the strategy's own
subject and its drive set are UNMOVED by the count**) · **`S-CHAN-FORM`** (the thrown object's member SET is exactly the kernel's declared set,
its prototype the caller realm's `Object.prototype`, and it is THROWN and never returned).
**FAILURE LIST.** a constraint failure that carries a store member; a kernel state outside `KC-1`–`KC-8`; a
sixteenth store member; a constraint failure RETURNED as a value; an `Error` instance or a `Promise`
rejection; a store generated message used as a constraint failure's message; a kernel message that is empty
or a placeholder.
**The clauses it cites.** `fail-surface.md §1`–`§2` · `attempt-lifecycle.md §2.4`.
(`P: §B.6` — *"THE CALLER'S OWN MESSAGE"*, as put: *"the kernel's own failure form and **never** a store
code; the closed set untouched"*; `R: docs/decisions.md` · `A98` — D4; `A: docs/specs/storeroom-native/
contract.md §8.1` (the closed `15`) and `§8.2` (the generator); `A: docs/specs/storeroom-js/contract.md`
`§2.5` — the client-side failure form this kernel's form is the caller-side twin of | CONTRACT`)

### §5.4 `P-SM-4` — the attempt's transition table is TOTAL, and every arm's answer is a declared one

**Property.** **THE ATTEMPT'S ARM TABLE IS CLOSED AND TOTAL: every in-domain attempt form lands on a
declared success arm, every outside form lands on the declared answer its own row prints, and NO FORM IS
UNANSWERED — **WITH ONE FORM NAMED BECAUSE IT IS NOT AN ARM AT ALL** (`S7`): **a CONSTRAINT BODY or a
REPAIR BODY that THROWS is not a row of this table and not an outside form of it either: the arm is still
decided (item 4's `(d)` on the repair-body path, and the attempt's disposal on the constraint-body path),
the attempt's bookkeeping completes as every other arm's does, and the `outcome` entry placed beside it
carries `state: null` on the CONSTRAINT-body path and `KC-4`'s token on the REPAIR-body path
(`kernel-surface.md §2.5` item 1; `attempt-lifecycle.md §2.4` item 8 (i); `composition-and-states.md §2.7`
item 13) — while WHAT THE CALLER RECEIVES is the BODY'S OWN THROWABLE and never a thrown form of this
kernel, so a sentence reading *"every form's answer is a declared one"* is read as *"every form's answer is
a declared one, and a body's own throwable is the answer of the two body paths and of no arm"*.** **The arms are: (a) every registered constraint passes on the first evaluation; (b) a
constraint's FIRST violation — its pair NOT in `ran` before the evaluation — with a repair registered for
it and the repair SUCCEEDS **and its own return carries `{ok: true, op}` — the op its edit landed, read off that return and nowhere else, the seam whose ONE HOME is `parameter-semantics.md §2.7` (`A: docs/decisions.md` · `A110`)**; (c) a constraint fails and NO repair is registered for it; (d) a constraint fails and its repair FAILS **— OR ITS `ok === true` RETURN CARRIES NO `op`, OR AN `op` THAT IS NOT THE ONE IT LANDED, which the same arm and the same `KC-4` dispose of as a failed repair**; (e) a pair that had **ALREADY RUN** in this attempt and whose repair **HAS ALREADY BEEN APPLIED** — i.e. the pair stands in `appliedRepairs` before this evaluation — is violated again; (f) a pair that had **ALREADY RUN** in this attempt and whose repair has **NOT** been recorded as applied — the pair being in `ran` and NOT in `appliedRepairs` — is violated a second time; (g) a repaired op's evaluation passes and every constraint passes; (h) an op the COMPOSITION STILL OWES — the op a failing attempt's per-op rollback walk has reached and not yet called, NOT *"an op the attempt already holds"* — is refused by a store verb the COMPOSITION calls — the per-op rollback meets its floor under `composition-and-states.md §2.6` item 5 (b)'s condition.** **`(a)` and `(g)` are the two success arms; `(c)`, `(d)`, `(e)`, `(f)` and `(h)` are the failure
arms; `(b)` is the transition arm and is not itself terminal.** **AND `(c)`, `(e)` AND `(f)` ARE PAIRWISE
DISJOINT: in `ran` + `appliedRepairs` → `(e)`; in `ran` and not in `appliedRepairs` → `(f)`; NOT in `ran` +
repair registered → the transition arm `(b)`; NOT in `ran` and no repair registered → `(c)` — so NO STATE
REACHES TWO OF THEM** (`attempt-lifecycle.md §2.4` item 4). **AND THE SECOND PREDICATE IS `appliedRepairs` AND NOT *"whether a
repair is registered for the pair"*, DECIDED HERE BECAUSE THE TWO READINGS DIFFER ON WHAT A DRIVE CAN SEE**
(`RC-6`): **`(e)`'s signature is a pair whose repair HAS ALREADY RUN — a state `appliedRepairs` records and a
bare registration does not — and the reading keyed on registration alone is WITHDRAWN BY NAME: it demanded a
`repair-run` entry count of `1` for a pair whose repair the attempt had never invoked, which no drive can
observe.** **So `(e)` requires the pair's `appliedRepairs` membership before the evaluation and its
`repair-run` entry count for that pair is `1`; a pair whose repair is registered but has never run is answered
by `(b)` on its FIRST violation, because a registered-but-unrun pair is NOT in `ran` before that evaluation, and by `(f)` at a repeat, exactly as the four combinations above print, and no clause of this directory carries the withdrawn registration-keyed reading.**
**Strategy ids.** **`S-ATT-ARM`** (the table's totality and mutual exclusivity, one drive per arm — **with one
drive per arm of the `(e)`/`(f)` pair, since those two are the pair the `ran`/`appliedRepairs` membership pair
separates**) ·
**`S-ATT-OUT`** (one drive per outside form, asserting the declared kernel state) · **`S-ATT-SHAPE`** (the
attempt's argument shapes: an absent `address`, an absent or non-function `constraint`, a `tier` outside its
domain — **which is the STORE'S `OutOfDomainTier` at the verb call, with NO attempt opened, and never `(h)`**
— an absent `value`, **whose answer is the STORE'S OWN write-verb refusal on the store's channel and never `KC-2` (`RD-1`)** — and **a `CommitRecord.attempt` naming a CLOSED or UNKNOWN attempt, refused `KC-2` at `K-3` and never `KC-7` (`RD-9`)**).
**FAILURE LIST.** an in-domain form with no arm; one form that reaches two arms; **an `(e)`/`(f)` drive whose
violated pair satisfies both membership conditions, or neither — i.e. a pair in `ran` and in `appliedRepairs`
reaching `(f)`, or a pair in `ran` and NOT in `appliedRepairs` reaching `(e)`**; an outside form that
succeeds; an outside form whose kernel state differs from its row's; **a `KC-2` thrown for an absent `value`, or a `KC-7` thrown over a CLOSED attempt's own reference — the two sites the `K-2` and `K-3` rows do NOT carry (`RD-1`; `RD-9`)**; a second evaluation of an op that was
never repaired; an attempt that returns without a resolved outcome. **The clauses it cites.** `kernel-surface.md §2.3` · `attempt-lifecycle.md §2.4` · `fail-surface.md §2` ·
`parameter-semantics.md §2.4`–`§2.8` · `parameter-semantics.md §2.14`–`§2.16`.
(`P: §1` — the architect's proposal text: *"If a constraint fails without a repair, or if it fails and it is
already in the commit registry for failing … the entire commit fails to prevent a cycle and rolls back,
returning the message log to the app as an error message. A commit is removed from the registry after
reporting failure or if it reaches a state where it passes all constraints (returning success)."* — **AND THE PROPOSAL'S OWN *"removed from the registry after reporting failure"* IS READ THROUGH THE ARCHITECT'S LATER RULING AND NOT AS A CLEARING ARM: THE COMMIT REGISTRY'S CLEARING RULE IS STATED ONCE AT `§5.7` — CLEARED ONLY ON A CLEARED PASS OR A SUCCESSFUL ROLLBACK, NEVER ON A FAILURE, A VIOLATION OR A REPAIR (`A103`, `D5`) — so what this row's quote fixes is the CYCLE PREVENTION it names (the entire commit fails and rolls back) and NOT the registry's lifetime, which the ruling owns and which `§5.7` states** (`Q-C`; `CW-11`; this directory's re-spelling list item `22` — **ITS ROW MOVED TO `archive/spec-history/2026-10-13-recovered-provenance.md` AT THE VOLUME REMEDY OF 2026-10-13, WHICH IS THAT ROW'S ONE HOME; THE NUMBER IS UNMOVED**); `R:
docs/decisions.md` · `A101`; `A: docs/specs/storeroom-native/contract.md §8.1`'s arithmetic
(`11 + 2 + 1 + 1 = 15` ✓ — **⟶ RE-SPELLED 2026-10-15 BY THE `CODES`-CLASS SWEEP (`role_spec_writer`): the `15` and its four-term sum are this clause's FILING-TIME print and stand BYTE-FOR-BYTE above, read THROUGH this reading; the store's LIVE ALGEBRA IS `11 + 2 + 1 + 1 + 1 = 16` ✓, `ConstraintListInvalid` the appended fifth term at rank `16`**) | CONTRACT`)

### §5.5 `P-SM-5` — the function's side, the evaluation's window, and the log's own order

**Property.** **THE CONSTRAINT FUNCTION RUNS IN THE NODE.JS SPACE (never store-side) AND IS EVALUATED AFTER
THE WRITE VERB HAS RETURNED — the kernel's own window, which opens AT `K-2`'S OWN ACT, BEFORE IT REACHES THE STORE'S WRITE VERB, and closes when `K-3` reaches a terminal state — and the MESSAGE LOG'S ORDER IS THE KERNEL'S OWN,
NEVER INHERITED FROM ANY STORE LIST: the log's entries carry the kernel's own append ordinal, strictly
increasing from `1`, and no clause of this directory derives an outcome from a position in any store-returned
list.** **AND THE KERNEL ASSERTS NO STORE-SIDE ORDER: the store's returned lists are SETS over membership and
the kernel reads them as sets** (`A: docs/specs/storeroom-native/contract.md §6.5` item 5 — *"NO ORDER IS
DECLARED FOR THE LIST"*; `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (e) and item 14 (f)).
**AND THE ONE ORDER THE KERNEL DOES DECLARE IS ITS OWN AND NOT THE STORE'S: within one evaluation pass it
runs the functions at the attempt's address in the order its registry's rows stand, and *"runs before other
listeners"* is read ONLY as *the constraint pass completes before the caller disposes of the attempt's own
`triggered` handles* — never as a claim about the store's list's order** (`attempt-lifecycle.md §2.4` item 5
(ii)–(iii)).
**AND THE SAME ORDER GOVERNS EVERY RE-RUN A REPAIR'S OP PROMPTS — SO EVERY PASS IS SINGLE-VALUED AND NO ARM'S
STATE IS REACHED BY AN UNDECLARED ORDER** (`NV-4`; `attempt-lifecycle.md §2.4` item 5 (iv)): **a re-run's
membership is every pair registered at the attempt's address and its ORDER is first-registration order there,
the same one-pair-at-a-time sequencing as the first pass, and the attempt transitions at the FIRST evaluating
pair whose outcome is a violation — so the evaluated prefix, the arm, the log and the `ops` are determined,
and the reading that a pass's order is whatever order the store's own trigger selection happened to return is
withdrawn by name.**
**AND THE SAME WINDOW CARRIES THE DELTA'S OWN TWO LAWS, READ HERE BECAUSE THIS ROW IS THE ONE THAT OWNS THE EVALUATION'S INSTANT** (`A: docs/decisions.md` · `A112`): **the store returns the handles and invokes nothing, and THE JS SURFACE RUNS THE TRIGGERED CONSTRAINTS FIRST AND, ONLY ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, BEFORE RETURNING TO THE CALLING PROCESS — so THE CALLER'S OWN LOOP OVER `CommitRecord.pending` IS ONE INVOKER AMONG THOSE LAYERS AND NEVER THE ONLY ONE — AND `pending` IS WRITTEN AS THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES, SIFTING A SUBSET OUT OF IT BEING UNNECESSARY AND UNLAWFUL: the caller's FIRST reading of the member is `K-2`'s own return, where no pass has run, and after the pass it holds the checked-off residue; where the attempt's own write failed at its landing and could not be repaired, EVERY handle of THAT write leaves the member by the DISCARD and no handle of any other write does, so an entry for a handle an EARLIER caller write returned — one whose pair no pass of the attempt evaluated — STANDS after the arm.**
**Strategy ids.** **`S-SIDE`** (the function's realm AND THE TWO-LAYER SPLIT: the store returns the handles and invokes nothing; the JS surface runs the TRIGGERED CONSTRAINTS FIRST and, ONLY ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, before returning to the calling process; a handle a write the KERNEL made is the kernel's own in-window delivery, and every handle a CALLER-made write returned is the caller's own loop's work — the caller's loop being ONE INVOKER AMONG THOSE LAYERS AND NEVER THE ONLY ONE) · **`S-WINDOW`** (the evaluation happens after the write verb returned, on the value the verb returned — AND THE MEMBER'S OWN TWO INSTANTS: `pending` IS WRITTEN AS THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES, SO A DRIVE READS THE WHOLE SET AT `K-2`'s RETURN AND THE CHECKED-OFF RESIDUE AFTER THE PASS, A MID-WINDOW TRANSITION BEING NO READING AT ALL, AND SIFTING A SUBSET OUT OF THE RETURNED SET BEING UNNECESSARY AND UNLAWFUL; where the attempt's own write failed at its landing and could not be repaired, every handle of THAT write leaves the member by the DISCARD and NO handle of any other write does — an entry for an earlier caller write whose pair no pass of the attempt evaluated STANDS after the arm) · **`S-LOG-ORDER`** (the log's ordinal is strictly increasing and the entries' sequence is the
kernel's own) · **`S-NO-STORE-ORDER`** (a drive compares store-returned lists as SETS and never asserts a
sequence, and no kernel drive derives its outcome from a position).
**FAILURE LIST.** a constraint evaluated inside a store verb; a constraint evaluated before the write verb
returned; a constraint evaluated before `K-2` has registered the attempt's address as held; **a `pending` that SIFTS a subset — an entry of the write's returned set absent from the member while the write's own attempt stands — or a CHECKED-OFF ENTRY THAT NEVER LEFT IT, one member's two failure faces, read at each arm's own observable (`K-2`'s whole set, the pass's residue, the failing arm's `triggered` VERBATIM with every handle of that failed write gone and an earlier write's entry still standing); and a listener or a constraint body read as delivered by the STORE rather than by the surface's ordered layers (`A: docs/decisions.md` · `A112`; `kernel-surface.md §2.1` item 2)**; a log entry
whose ordinal is not strictly increasing; a kernel outcome derived from a position in
`triggered` or `watched`; a kernel clause that promises a registration order OF THE STORE'S LIST, an address order or a tier
order **of the store's returned list**; **a kernel clause that denies the kernel's own evaluation order over its
registry's rows and its own log ordinal, which are the kernel's own bookkeeping and are declared at
`attempt-lifecycle.md §2.4` item 5 (ii)**; a log whose sequence is read off a store list.
**The clauses it cites.** `kernel-surface.md §2.2`–`§2.3` · `attempt-lifecycle.md §2.4`.
(`P: §A.1` — *"the function is run in the node.js space (also like listeners)"*; `A: docs/specs/storeroom-js/
contract.md §2.6` — *"evaluate constraints AFTER a `write` returns"*; `A: docs/specs/storeroom-native/
contract.md §6.5` item 5 with `docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) — the store
NEVER invokes anything, it RETURNS the handles — READ WITH `kernel-surface.md §2.2` item 2's SPLIT, WHOSE PARTITION PREDICATE IS **THE WRITE'S AUTHOR AND NOT THE LISTENER'S KIND** — THE KERNEL INVOKES A HANDLE A WRITE THE KERNEL ITSELF MADE RETURNED, AND EVERY HANDLE A CALLER-MADE WRITE RETURNED STANDS IN `CommitRecord.pending`** — **AND THAT MEMBER CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES, SO THE `FOR **THE CALLER'S OWN LOOP** TO RUN, THAT LOOP BEING LAYER (b)'s ONLY INVOKER` SPELLING THAT ONCE STOOD HERE IS WITHDRAWN BY NAME AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`A: docs/decisions.md` · `A112`): THE JS SURFACE RUNS THE TRIGGERED CONSTRAINTS FIRST AND, ONCE ALL CONSTRAINTS PASS, THE OTHER LISTENERS, BEFORE RETURNING TO THE CALLING PROCESS, AND THE CALLER'S OWN LOOP IS ONE INVOKER AMONG THOSE LAYERS AND NOT THE ONLY ONE — SIFTING A SUBSET OUT OF THE RETURNED SET BEING UNNECESSARY AND UNLAWFUL (`A107` `D1`; `A108` `D1`/`D2`; `A109` `D2`; `A112`; `kernel-surface.md §2.1` item 2)** — no callback parameter existing on `K-1`–`K-5` and no sixth surface item being declared (`A: docs/decisions.md` · `A107` `D1`; `A108` `D1`/`D2`; `A109` `D2`; `kernel-surface.md §2.1` item 2); `R: §11.5` — `AR-9` | CONTRACT`)

**⟶ AND THE ORDINAL'S SUBJECT IS NAMED AT THIS ROW, 2026-10-28 — `DEF-AI`, MEASURED.** `RCA-8(d)` ANNOTATE-BESIDE:
**every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause.** **`seq` is the position of the entry in
the COMMIT's own message log; it is not the store's journal ordinal, and the two differ by design** (`D-53` moves
the list from the attempt to the commit; the kernel mints `log.length + 1` on that one list). **THE MEASUREMENT THE
ROW FILED: a refusal's entry carried `seq` `1` while the store's journal counter read `41`**, because the two
numbers are ordered by two different records — the commit's list and the store's journal — and no clause of this
directory ever made them one. **AND THE ORDER ACROSS A COMMIT'S ATTEMPTS IS MEASURED AND MONOTONE**: one repair
write appends `1..5` (`constraint-check` · `repair-run` · `commit` · `constraint-check` · `commit`) across the pass,
the repair's own joined write and the re-run, strictly increasing in array order (`tests/e2e/
repair-in-commit.test.mjs`'s `D-46` (1) cell). **A SEVENTH ORDINAL IS NOT MINTED**: a number read off the store's
journal counter would be a second ordinal with no consumer. (`strata/decisions.md` · `D-53`, `D-48` · `DEF-AI`;
`P-SM-5`'s `S-LOG-ORDER` strategy id, whose subject is UNMOVED.)

### §5.6 `P-SM-6` — the first-repeat rule: an applied repair never runs twice, and a repeat fails the attempt

**Property.** **A REPAIR ALREADY RECORDED AS APPLIED IN THIS ATTEMPT MAY NOT RUN AGAIN, AND A SECOND
VIOLATION OF THE SAME CONSTRAINT FAILS THE ATTEMPT.** **The two limbs are ONE rule's two spellings, each
decided by TWO DECIDABLE PREDICATES the kernel holds — the violated pair's membership of `ran` BEFORE the
evaluation, and its membership of `appliedRepairs` at that same moment — and each is drivable on its own:
(i) a pair that had ALREADY RUN and whose repair stands in `appliedRepairs`, violated again, FAILS the attempt
with `KC-5` and NO repair function is invoked a second time — so the arm's own `repair-run` entry count for
that pair is `1` and never `2`; and (ii) a pair that had ALREADY RUN and whose repair is NOT in
`appliedRepairs` — whether because no repair is registered for it or because a registered repair has not run —
violated again, FAILS the attempt with `KC-6` — so the observation that SEPARATES the arms is that pair's OWN VIOLATION COUNT: `1` for a limb (ii) pair whose own key carries the PASSING entry of its first evaluation beside the VIOLATING entry of its second (`2` entries under that key and never `3`, of which `1` is a violation), and `2` only where a pair ran a third time** (`RD-3`; `kernel-surface.md §2.5` item 3's limb (ii)). **A pair whose first violation is unanswered by a repair
fails at its own first evaluation (`KC-3`), so limb (ii)'s state is reachable only where the pair's first evaluation
passed — and the four arms `(b)`, `(c)`, `(e)`, `(f)` are pairwise disjoint on those two predicates, printed identically here as `attempt-lifecycle.md §2.4` item 4 prints them: `(c)` NOT IN `ran` + NO repair registered for the pair · `(b)` NOT IN `ran` + a repair IS registered · `(e)` IN `ran` + IN `appliedRepairs` · `(f)` IN `ran` + NOT IN `appliedRepairs`, so a pair IN `ran` violated again is `(f)`/`KC-6` and NEVER `(c)`/`KC-3`, whatever its registration** (`RE-1`; `RE-3`; `RE-4`). **NOTHING IS
RE-RUN, NOTHING IS RE-EVALUATED A THIRD TIME, AND THE ATTEMPT'S
BOUND IS THEREFORE FINITE WITHOUT A REPAIR BUDGET OR A PROGRESS MEASURE.**
**Strategy ids.** **`S-FIRST-REPEAT`** (a repair whose own edit breaks another constraint's repair: the pair
had already run and its repair stands in `appliedRepairs` — arm `(e)`'s own predicate — the attempt FAILS
`KC-5` on the repeat, and the `repair-run` entry count for that pair is `1` and never `2`) ·
**`S-SECOND-VIOLATION`** (the same constraint violated twice with no repair ever registered for it, so its
pair never enters `appliedRepairs`: its first evaluation PASSES, its second violates, the attempt FAILS
`KC-6`, and the pair's OWN VIOLATION COUNT **for that pair's own key** is `1` and never `2` — its `constraint-check` entries under that key being `2` and never `3` (`RD-3`)) ·
**`S-NO-BUDGET`** (no clause of this directory
declares a repair budget, a retry count or a progress measure, and a drive that needs one to terminate has
found a failure of this row).
**FAILURE LIST.** a repair that runs twice in one attempt; a second violation that succeeds; an attempt that
does not terminate because a third evaluation was reached; a repair budget invented as a bound; a progress
measure invented as a bound; a repeat answered by anything but failure; **a pair whose repair stands in
`appliedRepairs` that reaches limb (ii), or a pair whose repair is NOT in `appliedRepairs` that reaches limb
(i), or a first violation answered by either limb instead of by `(b)`/`(c)`**.
**The clauses it cites.** `kernel-surface.md §2.5` · `fail-surface.md §2`'s `KC-5`/`KC-6` ·
`parameter-semantics.md §2.9`–`§2.11`.
(`P: §A.2` — the ruling as the architect selected it: *"Fail on the first repeat, never repeat a repair"*,
reading *"A repair already recorded as applied may not run again; a second violation of the same constraint
fails the attempt."*; `R: docs/decisions.md` · `A100`; `P: §A.2`'s own carrier — the corpus's `R15`, filed
as `AM-1` at `docs/specs/storeroom-constraints/adoption-dossier.md §5` with `STATUS: OVERFLOW` | CONTRACT`)

### §5.7 `P-TP-7` — the whole attempt is all-or-nothing, and the rollback is per op with a named floor

**Property.** **A FAILED ATTEMPT'S END STATE IS THE STATE THE STORE'S OWN COMPOSITION PRODUCED, AND THE
COMPOSITION IS ALL-OR-NOTHING OVER WHAT IT OWES: the kernel composes `rollback(op.opId)` PER OP over the
attempt's own ops — the repaired ops first, in reverse of the order they were created, then the attempt's
first write's op last — **THE CALL LIST IS ITEM 2'S OWN ON THE `null`-`checkpoint` ARM TOO (`A: docs/decisions.md` · `A111`; `composition-and-states.md §2.6` items 2 and 8 (iii): the sentence reading that arm as *"the attempt's FIRST OP ALONE"* is WITHDRAWN BY NAME AT THAT HOME, AND THE WALK RUNS OP BY OP IN THE COMPOSITION'S ORDER ON THAT ARM TOO — NEVER BEGINNING OVER THE LIST'S LAST ENTRY, AS THE SENTENCE STRUCK HERE READ IT (`e2e-scenarios.md`'s `E2E-C-2` step (7)))** — SKIPS an op already reported undone by an earlier call's own `undoneOps` member, so the step count is the calls ISSUED and MAY RUN BELOW the list's size, and performs NO commit-level rollback.**
**AND EVERY PART OF THAT END STATE IS READ FROM A DECLARED MEMBER: the composition's performed calls are the
`rollback` member of the attempt's report — one `RollbackStep` per call, in performed order, each carrying the
store's own `undoneOps`, `restoredTo` and `answer` **and its own `failed` flag, so a call that THREW is
distinguishable from one that returned** — **and a recorded step whose `answer` carries a store code that is NEITHER `RollbackCompacted` NOR `JournalOpUnknown` leaves the kernel's answer where `KC-8` already puts it, with that code named in the entry's `message` as the STORE'S answer and NEVER minted into the kernel's `status` (`RD-8`)** — so the performed set is the union of the steps'
`undoneOps` members and NO WIDER, and a step whose call THREW carries `undoneOps: []` and `failed: true` and
claims no undo at all** (`RC-10`; `composition-and-states.md §2.6` item 3).
**AND THE COMPOSITION'S TARGET IS THE LAST STATE AT WHICH ALL REGISTERED CONSTRAINTS PASSED, WHICH THE ARCHITECT RULED AT THIS PASS AND WHICH THIS ROW NOW CARRIES** (`A: docs/decisions.md` · `A102` — *"Clarification on 1: Roll back to the last state that passed all constraints."*; `RC-14`; `RC-18`; `RD-5`): **`AttemptRecord.ops` is the composition's CALL LIST — it fixes WHICH OPS ARE CALLED and no longer the reach — and the walk runs op by op in the composition's order OVER THE OPS THE COMMIT REGISTRY HOLDS SINCE THE CHECKPOINT AND STOPS AT THE OP THE `checkpoint` MEMBER NAMES — never issuing a call over it: an op AFTER the checkpoint is undone, whether or not the attempt created it, and the op AT the checkpoint and every op BEFORE it are NEVER UNDONE — THIS LIMB READING THE ARM IN WHICH THAT MEMBER NAMES AN OP; WHERE IT IS `null` THERE IS NO OP AT WHICH THE WALK STOPS, AND THAT ARM READ AT THE SENTENCE THIS ROW CARRIES BELOW.** **THE CHECKPOINT IS THEREFORE A DECLARED MEMBER AND NOT AN INFERENCE, AND IT IS AN OP AND NOT A PAIR KEY — THE STOP POINT IS THAT OP AND ONE VALUE CARRIES ONE READING** (`Q-A`; `Q-B`; `CW-07`; `CW-08`; `CW-09`; `CW-10`): **`RollbackStep` carries it (`composition-and-states.md §2.6` item 3, its `checkpoint` member, `string | null`), every step of one attempt's composition carries that attempt's ONE value, and THE MEMBER'S DOMAIN — THE OP, ITS ADDRESS-WIDE CANDIDATE SET AND ITS `null` ARM — IS READ AT ITS ONE HOME, `composition-and-states.md §2.6` item 8 (iii), which this row CITES AND RE-STATES NOWHERE: the `null` arm is fixed THERE, ADDRESS-WIDE AND NEVER *"no op of the attempt left one"*, the attempt-scoped spelling being WITHDRAWN BY NAME AT THAT HOME (`VE-10`; `VE-11`; `A105` `Q1`), and THE MEMBER'S VALUE IS ITS OWN CARRIER — the `opId` identifies the state — so NO CLAUSE OF THIS ROW ASKS THE KERNEL TO READ OR SCAN A STORE-WIDE STATE and no second observable is minted for it (`CZ-12`); the target being that op, where the member is `null` the walk runs over the whole call list — the aim ONCE READ HERE AS THE STATE BEFORE THE ATTEMPT'S OWN WRITE BEING WITHDRAWN BY NAME AS THE SAME PRE-STATE CLAIM (`A: docs/decisions.md` · `A111`; `composition-and-states.md §2.6` item 8 (iii))** (`composition-and-states.md §2.6` item 8 (i)–(iii), (v)). **AND THE READINGS THAT ONCE STOOD AT THIS SENTENCE — the `null` arm's ONE OP passed to the store's per-op `rollback`, that one op being the attempt's own first op — THE CALL LIST UNDER THAT MEMBER BEING THAT ONE OP ALONE, with no op before it ever undone — ARE WITHDRAWN BY NAME HERE (`A: docs/decisions.md` · `A111`): on that arm the call list is item 2's own — THE WHOLE LIST — AND WHAT A FAILED COMMIT LEAVES AT AN ADDRESS THE CALLER ALREADY WROTE TO IS READ AT `composition-and-states.md §2.6` item 8 (iii), CITED HERE AND RE-STATED NOWHERE** (`Q-A`; `A102` `D1`; `A103` `D5`). **AND THE END STATE THAT SENTENCE ONCE READ — after a failed attempt at an address that HELD A VALUE, the store's read at that address answering THE CALLER'S OWN EARLIER VALUE, `present: true`, never `AddressNotFound` — IS WITHDRAWN BY NAME AS THE SAME CLAIM (`A: docs/decisions.md` · `A111`)** — **the live run's `E2E-C-2` window being the shape that limit governs, its first performed call's own store report having deleted the pre-existing write** (`scratch/live-constraints-gate6-out.txt`'s `E2E-C-2.8`; `live-greens.md`'s `[E2E-C-2.8]`). **AND THE REACH/STOP CLAUSE IS WHAT MAKES THE CHECKPOINT OP SURVIVE A CALL MADE AT AN ANCESTOR ADDRESS WHOSE SUBTREE HOLDS IT: the composition's calls are made for THE STILL-OWED OPS ONLY — an op of the attempt's `ops` whose `opId` stands in no earlier step's `undoneOps` member AND WHICH IS NOT THE OP THE `checkpoint` MEMBER NAMES — so no call is ever issued over the checkpoint op, and the store's per-op reach can reach it by no call the kernel makes** (`composition-and-states.md §2.6` item 4; item 8 (v) — the architect's own worked example). **AND WHERE THE RULED TARGET AND THIS ROW'S OWN CAVEAT MEET, THE READING IS FIXED: a store operation the attempt did NOT create and that lies BEFORE the checkpoint, or AT it, is a ruled, declared end state by `A102`'s `D1`, and one that lies AFTER it is undone by the call that reaches it — which is what `RC-14`'s answered row at `§0.1` item 5 (v) now records.** **AND THE COMMIT REGISTRY'S OWN LIFETIME IS PINNED HERE, ONCE, BECAUSE THE WALK'S SET IS THE REGISTRY'S: the registry holds EVERY EDIT OP THE ATTEMPT HAS MADE SINCE ITS LAST VALID STATE, and IT IS CLEARED ONLY ON A CLEARED PASS — all constraints passed — OR ON A SUCCESSFUL ROLLBACK, and NEVER on a failure, NEVER on a violation and NEVER on a repair** (`A: docs/decisions.md` · `A103`, the architect's ruling: *"all edit ops made since the last valid state will still be in the commit registry, since it is only cleared on a cleared pass or a successful rollback."*; `Q-C`; `CW-11`; cited, never re-derived, at `composition-and-states.md §2.6` item 8 (ii) (5) and `§2.7` item 13, at `kernel-surface.md §1` item 4 and `§2.4` item 7 (i), and at `parameter-semantics.md §2.17`) — **AND ARRIVAL IS A FUNCTION OF DECLARED MEMBERS ALONE: the walk never observes store state, and *"until the store stands at that state"* is WITHDRAWN BY NAME as a stop condition** (`composition-and-states.md §2.6` item 8 (ii) (5)). **AND THE COMPOSITION HAS A NAMED FLOOR: an op the composition STILL OWES
— a member of the attempt's `ops` whose `opId` stands in no earlier step's `undoneOps` AND WHICH IS NOT THE OP THE `checkpoint` MEMBER NAMES — whose own rollback's
candidate set includes a `compacted` entry FAILS `RollbackCompacted`, and the kernel's answer for that state is
the kernel's own `KC-8`, thrown with the store's member NAMED INSIDE the `outcome` entry's message: it never
claims a reach past a compacted base and it never reports a rollback it did not perform.**
**AND ONE CLAIM THIS ROW DOES **NOT** MAKE, NAMED BECAUSE THE STORE'S REACH IS SUBTREE-WIDE AND CANDIDATE-SET-WIDE: a
per-op call may reach store operations THIS ATTEMPT DID NOT CREATE, so the store's end state is read from the performed calls' own members AND THE PRE-STATE IS ASSERTED IN NO CASE — THE CONDITIONAL SPELLING THAT ASSERTED IT WHERE EVERY OP THE ATTEMPT CREATED LIES UNDER A PERFORMED CALL BEING WITHDRAWN WITH IT (`A: docs/decisions.md` · `A111`) —
AND *"the store stands at the pre-state"* IS WITHDRAWN BY NAME AS A CLAIM OF THIS ROW: a failed commit at an address the caller already wrote to UNDOES THE CALLER'S OWN EARLIER WRITE THERE, the store's own reach walking backward to the oldest entry of the named op's subtree (`A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4), so the pre-state claim is `OWED` to the store-side pass `J-20`–`J-22` and no clause of this directory claims it (`contract.md §0.1` item 5 (i); `composition-and-states.md §2.6` item 8 (iii)) — **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THE *"UNDOES THE CALLER'S OWN EARLIER WRITE THERE"* CLAUSE OF THIS CELL IS WITHDRAWN, WITH ITS GROUND *"the store's own reach walking backward to the oldest entry of the named op's subtree"*, AND THE CELL'S BYTES STAND (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT STANDS: the withdrawal of *"the store stands at the pre-state"* and the `OWED` to `J-20`–`J-22`.** **WHAT MOVES: the earlier write at the attempt's address is NOT undone — the store's amended scope is the spatial test **AND** a temporal test and the walk stops AT THE NAMED OP — so this cell's `OWED` term stands for the SEAM alone and no longer carries a claim about that write's loss** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home) — a store
operation outside every such subtree's reach is NOT undone by this composition, and no clause of this
directory claims otherwise** (`composition-and-states.md §2.6` items 4–5). **AND THIS CLAIM'S OWN TWO ARMS ARE NAMED SO THE FAILURE LIST'S FALSIFIER IS UNAMBIGUOUS: WHERE THE `checkpoint` MEMBER NAMES AN OP THE WALK STOPS AT THAT OP, AND WHERE IT IS `null` THE ARM'S TARGET AS THE ATTEMPT'S OWN FIRST OP AND ITS RESTORED STATE AS THE ONE THAT STOOD BEFORE THE ATTEMPT'S OWN FIRST LANDING ARE WITHDRAWN BY NAME AS THE SAME PRE-STATE CLAIM THE CLAUSE ABOVE WITHDRAWS, WHATEVER THE STORE'S REACH TOUCHES BEING THE STANDING LIMIT STATED ABOVE — so *"the walk stops AT that op"* is never read as leaving that op standing** (`A: docs/decisions.md` · `A111`; `composition-and-states.md §2.6` item 8 (iii); `A102` `D1`). **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THE *"WHATEVER THE STORE'S REACH TOUCHES BEING THE STANDING LIMIT"* TERM OF THIS SENTENCE IS WITHDRAWN AT THIS CELL AND EVERY OTHER TERM OF IT STANDS BYTE-FOR-BYTE, READ THROUGH THIS MARK (`DEF-2026-10-02`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT STANDS: the `A111` pre-state withdrawal, the `null` arm's own two withdrawals, and the sentence's conclusion — *"the walk stops AT that op"* is never read as leaving that op standing.** **WHAT MOVES: the store's reach is no longer a standing limit at all, so the `null` arm is no longer bounded by an unlimited store reach but by the amended scope — an entry is in scope only at or after the named op's own `seq`** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home). **AND THE ONE HALF THIS CELL'S OWN CLAUSE PRINTS ELSEWHERE IS INVERTED WITH IT: *"a failed commit at an address the caller already wrote to UNDOES THE CALLER'S OWN EARLIER WRITE THERE"* is no longer the store's answer — the earlier write STANDS.**
**Strategy ids.** **`S-ROLLBACK-ALL`** (every op the attempt created that lies under a performed call is rolled back, read from the steps' `undoneOps` members) ·
**`S-ROLLBACK-PER-OP`** (the rollback is composed of per-op calls the composition PERFORMED over the attempt's own ops — AT LEAST ONE AND NEVER NONE ON EVERY FAILURE ARM WHOSE COMPOSITION HAS AT LEAST ONE STILL-OWED OP — a residual arm's count being the calls it ISSUED and never a step per op — AND `[]` ON THE SUCCESS ARM, WHERE THE COMPOSITION IS NEVER REACHED AND THE COUNT IS `0` (`CX-16`), the skip decided by an earlier step's `undoneOps`, so the count is the calls performed and not one per op (`RD-2`) — over the
composition's order of repaired-ops-reversed-then-the-write — AND THAT ORDER IS READ OVER THE OPS THE COMMIT REGISTRY HOLDS SINCE THE `checkpoint` MEMBER'S OP, NO CALL EVER BEING ISSUED OVER THE STOP OP ITSELF (`Q-A`; `Q-B`)) · **`S-ROLLBACK-FLOOR`** (a `compacted` entry in the candidate set of a call over an op the
composition still owes: that call fails `RollbackCompacted`, the kernel's own `KC-8` is thrown with the store's
member named in the `outcome` entry's `message`, the step for that call carries `undoneOps: []` with
`failed: true` and the store's own code in its `answer`, and the performed set is the steps' union and no
wider) · **`S-ROLLBACK-TARGET`** (the walk STOPS at the checkpoint OP — the op whose landing left the last
state at which all registered constraints passed: the steps' own `checkpoint` member carries that op's
`opId` and is `null` where the attempt left none, the checkpoint op and every op before it are not undone
whether or not the attempt created them, an op after it is undone whether or not the attempt created it, the
walk never observes store state, and where no checkpoint stands the AIM ONCE READ HERE AS THE STATE BEFORE THE ATTEMPT'S OWN WRITE IS WITHDRAWN BY NAME AS THE SAME PRE-STATE CLAIM, AND NO CLAUSE OF THIS STRATEGY LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING — a failed commit there UNDOES the caller's own earlier write, because the store's own reach walks backward to the oldest entry of the named op's subtree — which `A111` records as the STANDING LIMIT of the closed caller-side surface and `OWES` to the store-side pass `J-20`–`J-22` (`A: docs/decisions.md` · `A111`; `A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4) (`A: docs/decisions.md` · `A102`, `D1`/`D2`; `A103`, `D5`; `composition-and-states.md §2.6` item 8)). **AND THE `null` LIMB IS READ AT ITS OWN HOME AND NOT RE-STATED HERE: THE READINGS THAT ONCE STOOD AT THIS SENTENCE — THE ATTEMPT'S OWN FIRST OP AS THE OP THE CALL THE WALK BEGINS OVER IS MADE OVER, WITH NO OP OLDER THAN IT UNDONE — ARE WITHDRAWN BY NAME AS THAT SAME CLAIM** — **read with that limb's own home, `composition-and-states.md §2.6` item 8 (iii), which this row cites and re-states nowhere** (`Q-A`; `A102` `D1`; `A: docs/decisions.md` · `A111`). **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THE *"NO CLAUSE OF THIS STRATEGY LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING"* LIMB IS WITHDRAWN AT THIS CELL, WITH THE STATEMENT AND ITS GROUND (*"a failed commit there UNDOES the caller's own earlier write, because the store's own reach walks backward to the oldest entry of the named op's subtree"*) — ITS BYTES STAND AND ARE READ THROUGH THIS MARK (`DEF-2026-10-02`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT STANDS AT THIS CELL: the withdrawal of the *"state before the attempt's own write"* aim, the `null` limb's own withdrawn readings, and the checkpoint's authorship-independence (`A104`).** **WHAT MOVES: THE STRATEGY'S CLAUSE NOW HOLDS THE OTHER WAY — a failed commit at an address the caller already wrote to LEAVES THAT EARLIER WRITE STANDING, because the store's amended scope is the spatial test **AND** a temporal test (`E.seq` ≥ the named op's own `seq`) and the walk stops AT THE NAMED OP rather than at the subtree's oldest entry** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home). **THE ROW'S `A111`/`J-20`–`J-22` `OWED` TERM IS UNMOVED: the store-side evaluation seam is still unmade.** **AND THE CHECKPOINT OP MAY BE AN OP THAT THIS ATTEMPT DID NOT LAND — WHICH THE ARCHITECT HAS CONFIRMED — SO THE MEMBER'S DOMAIN IS DECLARED WITH IT AND THE CROSS-ATTEMPT CASE IS NOT AN OUTSIDE VALUE** (`VC-1`; `CX-1`; `A: docs/decisions.md` · `A104` — *"Yes — the checkpoint may name an op ANOTHER attempt landed."*; `Q-A`; `Q-B`): **`checkpoint` names the op WHOSE LANDING LEFT THE ADDRESS IN ITS LAST VALID STATE, WHOEVER AUTHORED IT — an op of THIS attempt, OR an INNER attempt's op at a descendant address, OR an op of any other attempt that this attempt's own atomic evaluation found the address valid after** (`composition-and-states.md §2.6` items 8 (i), 8 (ii) (5) and 8 (v); `attempt-lifecycle.md §2.4` item 8 (ii) (g); `e2e-scenarios-b.md`'s `E2E-C-15`). **AND THE COMMIT REGISTRY'S CLEARING RULE, STATED HERE ONCE BECAUSE THIS ROW IS ITS ONE HOME AND EVERY OTHER SITE OF THIS DIRECTORY CITES IT AND RE-DERIVES NOTHING** (`Q-C`; `D5`; `A: docs/decisions.md` · `A103` — *"all edit ops made since the last valid state will still be in the commit registry, since it is only cleared on a cleared pass or a successful rollback."*): **THE COMMIT REGISTRY IS A CALLER-SIDE MAP WHOSE ONE KEY IS A PROCESSING — THE EXTERNAL-SURFACE WRITE OR DELETE CALL — SO EVERY SUCH CALL HAS A KEY AND AN ENTRY, AND A WRITE/DELETE CALL THAT OPENS NO ATTEMPT IS KEYED BY THAT SAME DECLARED KEY AND NOT BY AN ATTEMPT'S IDENTITY: ONE KEY, AT THIS ONE HOME, FOR EVERY WRITE/DELETE CALL, AND A READ OPENS NO PROCESSING, TAKES NO KEY AND ADDS NO ENTRY** (`A106` `Q4` — *"Per external surface write/delete call - a read will not make changes and therefore not need to check constraints."*; `VG-7`; `DB-4`) **— AND NO ANCESTOR'S ENTRY EVER HOLDS ANOTHER PROCESSING'S OPS — AND ONE PROCESSING'S ENTRY CARRIES THAT CALL'S OWN EDIT OPS SINCE ITS OWN LAST VALID STATE AND NO OTHER PROCESSING'S, READ WITH THE ARCHITECT'S `Q2` (*"Commit registry holds all ops made in the processing of a given call at the external surface … and any ops made by repair functions triggered in the process of checking that commit. If another write is made during that processing, the related ops will be stored separately."*), SO THE HELD SET IS PER CALL'S PROCESSING — ONE CALL'S OWN OPS PLUS ITS REPAIRS' OPS, A WRITE MADE DURING ANOTHER'S PROCESSING TAKING ITS OWN REGISTRYTHER'S PROCESSING TAKING ITS OWN ENTRY — **AND THE ONE ENTRY THAT HOLDS A NESTED PROCESSING'S OPS IS THE NESTED PROCESSING'S OWN ENTRY, NEVER ITS ENCLOSER'S: a re-entrant `K-2` opens a processing OF ITS OWN, so its call's ops and its repairs' ops stand in an entry keyed to that processing and in NO entry keyed to the processing it was opened inside** — **AND THE REGISTRY IS THEREFORE KEYED PER PROCESSING AND BY NOTHING ELSE: ONE ENTRY PER CALL AT THE EXTERNAL SURFACE, WHERE *"PER ATTEMPT"* IS THAT SAME COUNT AND NEVER AN EQUATION BETWEEN AN ATTEMPT AND A CALL — neither *"one entry per attempt"* read as a claim about a nested processing NOR *"per attempt = per call's processing"* is a spelling any clause of this directory carries, this row stating the keying ONCE at this, its one home, and every other site of this directory citing this row** (`CY-1`; `CY-2`; `attempt-lifecycle.md §2.4` item 7 (i) (1)–(2); `composition-and-states.md §2.6` item 1), THE DECLARED EDGE CASE CONSTRAINTS BEING JS AND THE KERNEL SINGLE-THREADED (`D2`; `D3`; `A105`) — AND WHERE TWO PROCESSINGS CONFLICT SO THAT THEY CANNOT BOTH RESOLVE TO A VALID STATE, WHICHEVER REACHES A TERMINATION STATE FIRST FAILS, THE SECOND CONTINUING REPAIRS UNTIL IT REACHES A SUCCESSFUL STATE AND ROLLING BACK ONLY IF IT REACHES AN UNREPAIRABLE ONE (`D4`; `A105`; `attempt-lifecycle.md §2.4` item 8 (i))** (`attempt-lifecycle.md §2.4` item 7 (i)). **IT IS CLEARED ONLY ON A CLEARED PASS OR ON A SUCCESSFUL ROLLBACK — NEVER ON A FAILURE, NEVER ON A VIOLATION AND NEVER ON A REPAIR — SO IT STILL HOLDS THIS ATTEMPT'S OPS WHEN THIS ATTEMPT'S OWN COMPOSITION WALKS THEM, AND *"A CLEARED PASS"* IS PINNED BY NAME HERE, AT THIS RULE'S ONE HOME, AS THE TERMINAL ACT'S OWN ALL-PASSING ARM: A RE-RUN WHOSE EVALUATIONS ALL PASS IS NOT A CLEARED PASS AND CLEARS NOTHING BY ITSELF, WHICH IS WHAT `CY-12` ASKED AND WHAT THE ARCHITECT'S OWN WORDS FIX** (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause; `composition-and-states.md §2.6` item 8 (ii) (5)). **AND *"A SUCCESSFUL ROLLBACK"* IS A PREDICATE AND NOT A SYNONYM FOR THE ATTEMPT'S OWN OUTCOME: it is the attempt's own composition having issued a call over EVERY still-owed op with EVERY such call RETURNING — so a FAILING attempt whose composition did that CLEARS the registry, while a failure arm whose call THREW leaves this attempt's entry STANDING with the ops it never undid** (`attempt-lifecycle.md §2.4` item 7 (i); `composition-and-states.md §2.6` items 5 (a)–(b) and 10). **AND *"A CLEARED PASS"* IS A PASS ALL OF WHOSE EVALUATIONS RETURNED THE PASS ARM AND NOT THE ATTEMPT'S OWN `PASSED` STATE** (`attempt-lifecycle.md §2.4` item 5 (iv)).
**FAILURE LIST.** a rollback that reaches past a compacted base; a rollback claim over an op the store did
not undo; a partial rollback reported as whole; a rollback composed of one commit-level call the store does
not declare; an attempt whose OWN EARLIER OPS are left standing after failure — the ATTEMPT'S OWN, AND NOT ANY EARLIER WRITE AT ITS ADDRESS, THE CALLER'S OWN EARLIER WRITE THERE BEING UNDONE BY THAT SAME FAILED COMMIT (`A111`); **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THIS FALSIFIER IS INVERTED AT THIS CELL AND ITS BYTES STAND (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **THE STATE THIS LIST REFUSES IS NOW THE REVERSAL, NOT THE SURVIVAL: an attempt whose failure LEAVES THE CALLER'S OWN EARLIER WRITE AT ITS ADDRESS STANDING is the STATE LAW REQUIRES, and the state to be refused is a failed commit that UNDOES that earlier write — an entry older than the call's named op reversed by it is out of scope by `M-5`'s temporal test and therefore a defect** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home). **SO A DRIVE THAT FINDS THE CALLER'S SEED STILL READING HAS FOUND THE AMENDED CLAUSE SATISFIED AND MUST NOT READ IT AS THIS LIST'S REFUSED STATE**; a `RollbackCompacted` the kernel
reports as success; **a `rollback` member that omits a call the composition performed or carries one it did
not**; **a step whose `failed` flag says a call returned where the store's `answer` names a code, or says a
call threw where `answer` is `'ok'`**; **a *"pre-state"* claim asserted over a store operation no performed call reached — AND EVERY *"pre-state"* CLAIM IS WITHDRAWN FROM THIS DIRECTORY AND NOT THIS NARROW FORM OF IT ALONE**; **AND THE ONE *"pre-state"* CLAIM THIS DIRECTORY MAY NOT MAKE IS NAMED WITH THE RULING THAT WITHDREW IT (`A: docs/decisions.md` · `A111`): NO COMPOSITION OF THIS KERNEL LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING — a failed commit at an address the caller already wrote to UNDOES the caller's own earlier write there, the store's own reach being subtree-wide and backward to the oldest entry (`A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4) and NO COMMIT-LEVEL ROLLBACK EXISTING — so the pre-state claim is `OWED` to the store-side pass `J-20`–`J-22` and is not a verification the closed caller-side surface can have (`contract.md §0.1` item 5 (i); `composition-and-states.md §2.6` item 8 (iii))**; **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THE NAMED CLAIM ABOVE — *"NO COMPOSITION OF THIS KERNEL LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING"*, WITH ITS GROUND *"the store's own reach being subtree-wide and backward to the oldest entry"* — IS WITHDRAWN AT THIS CELL, AND ITS BYTES STAND AND ARE READ THROUGH THIS MARK (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **ON THE ARCHITECT'S TWO RULINGS OF 2026-10-16, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **WHAT STANDS: THE `OWED` TO `J-20`–`J-22` AND THE WITHDRAWAL OF EVERY PRE-STATE CLAIM — the amendment makes no store-side evaluation seam.** **WHAT MOVES: THE CLAIM THIS LIST FORBADE IS NOW THE CLAIM THE AMENDED `M-5` PRODUCES — a composition DOES leave the caller's earlier write at the attempt's address standing, because the store's scope is the spatial test **AND** a temporal test (`E.seq` ≥ the named op's own `seq`) and the walk stops AT THE NAMED OP** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home). **SO THE REFUSED STATE IS THE EARLIER WRITE'S REVERSAL AND NOT ITS SURVIVAL**; **a `KC-8` thrown
by a call the kernel skipped under `composition-and-states.md §2.6` item 5 (a), which it never issues**; **a walk that
STOPS SHORT OF the last all-constraints-passing state, or that walks PAST it and undoes an op standing before
it — including the op AT the checkpoint and any op the attempt did not create; a `checkpoint` member that names a pair key, a `passed` pair, an op outside `ops`, or an op whose landing left no valid state; a `checkpoint` value that differs between two steps of one attempt;
a `null` `checkpoint` on an attempt for whose address some landing left EVERY REGISTERED PAIR THERE PASSING — the member being `null` ONLY where NO landing at that address left it valid, ADDRESS-WIDE AND NEVER *"no op of the attempt left one"*, the entry's one reading standing at `composition-and-states.md §2.6` item 8 (iii), which this list cites and re-spells nowhere; a composition that issues a call OVER its own checkpoint op, or one read as stopping where the store's reach rather than the member says it did; an arrival clause read as a store state the kernel must observe, or a registry clearing rule read as clearing on a failure, a violation or a repair (`A103`); a checkpoint rule read as
overriding the store's floor — a still-owed op's call over a compacted base leaves the verb answering
`RollbackCompacted`, the kernel reporting `KC-8`, and NOTHING restored (`A102`, `D3`)**.
**The clauses it cites.** `composition-and-states.md §2.6` (its item 8 included) · `fail-surface.md §3` ·
`parameter-semantics.md §2.14`–`§2.17` **(`§2.17`'s `RollbackStep` row is re-derived at this pass to `6`
members — the `failed` arm and the `checkpoint` member included — and the throwing call's step is `§2.17`'s
own clause)**.
(`P: §B.3` — *"PER-OP `rollback` REPEATED OVER THE ATTEMPT'S OPS"*, as put: *"the compacted floor named:
per-op reach, never a claim past a compacted base."*; `A: docs/specs/storeroom-native/write-and-read.md
§6.1` item 5's `M-4` floor and `§6.4`'s `M-5`–`M-10`; `A: docs/specs/storeroom-native/contract.md §8.1`
member `11` `RollbackCompacted`; `R: §11.5` — `AR-15` | CONTRACT`)

### §5.8 `P-TP-8` — the applied-repair marker is PER ATTEMPT, never global

**Property.** **THE APPLIED-REPAIR MARKER IS PER ATTEMPT AND ITS PREDICATE IS A PREDICATE OVER ATTEMPTS, NEVER OVER VALUES: the record of
what has already run is the caller-side registry's OWN state for THAT attempt, so a repair recorded as
applied in one attempt IS NOT APPLIED IN A LATER ATTEMPT — a second, separate attempt at the same address
runs the same repair again, because the second attempt starts with an EMPTY `appliedRepairs` and an EMPTY
`ran`.** **AND THE MARKER'S ONE HOME IS THE OPEN ATTEMPT'S OWN RECORD, AND NO CLOSED RECORD CARRIES IT: `appliedRepairs` is a member of the open `AttemptRecord` (`attempt-lifecycle.md §2.4` item 1) and the closed attempt's form is the FIVE-MEMBER `AttemptReport` (`kernel-surface.md §2.1` item 3), which has no such member — so the reading that a closed attempt RETAINS an `appliedRepairs` list as READ-ONLY HISTORY is WITHDRAWN BY NAME, and *"did not survive"* means the marker's own lifetime ended with the attempt it belonged to.** **AND
NEITHER IS THE MARKER GLOBAL TO THE PROCESS NOR SHARED BETWEEN TWO INSTANCES: it holds no state outside its
attempt's lifetime, it writes no store entry, and it appends no journal entry** (`A: docs/specs/
storeroom-native/write-and-read.md §6.1` item 1 — one entry per SUCCESSFUL write; the marker is not one).
**Strategy ids.** **`S-MARK-ATTEMPT`** (the marker's lifetime is the attempt's: one attempt's repeat fails,
and the *same* pair in a second attempt runs again) · **`S-MARK-SCOPE`** (two instances: neither sees the
other's marker) · **`S-MARK-NO-HOME`** (the marker writes no store entry, appends no journal entry, and stands in NO closed record: its only home is the open `AttemptRecord`, and the closed form is the five-member `AttemptReport` — the retained-history reading WITHDRAWN BY NAME at `kernel-surface.md §2.5` item 2 (`NX-1`; `RD-4`)).
**FAILURE LIST.** a marker that survives its attempt; a second attempt that refuses to run a repair the first
attempt ran; **an `appliedRepairs` member read off a CLOSED attempt's record, or a decision for a later attempt
drawn from one — a member no closed record carries, `kernel-surface.md §2.5` item 2's lifetime limb**;
a marker shared between two instances; a marker that writes a store entry; a marker that appends
a journal entry; a marker read from the journal; a marker that is global to the process.
**The clauses it cites.** `kernel-surface.md §2.5` · `fail-surface.md §2`'s `KC-5` ·
`parameter-semantics.md §2.10`–`§2.11`.
(`P: §B.8` — *"The caller-side registry, declared by the amendment"*, as put: *"`AR-23`'s own text names it
the lawful home for \"already recorded as applied\" — nothing crosses the store's surface."*; `P: §A.2` —
*"A repair already recorded as applied may not run again"*, whose subject the marker is; `R: §11.5` —
`AR-23`, read caller-side; `A: docs/specs/storeroom-native/write-and-read.md §6.1` item 5 — the journal's
`compacted` mark is a DIFFERENT predicate and is not this marker | CONTRACT`)

---

## §6. `A112` DELIVERY-MODEL RE-SPELL, 2026-10-13 — **MOVED 2026-10-13 (`RCA-8(g)`, the volume remedy: this document measured `133,162` B, `2,090` B over the per-path line of `131,072` B)**

**THIS SECTION MOVED OUT BYTE-EXACTLY AND IS NO LONGER CARRIED HERE.** **WHERE IT STANDS NOW: `archive/spec-history/2026-10-13-reconciliation-deltas-superseded.md §2` — the moved block's header, its `A: docs/decisions.md` · `A112` ruling line (the architect's own words, quoted in full there) and all `7` of its numbered items (items `1`–`7` of that `§6`) stand at that path, which NAMES THE SOURCE PATH AND LINES `701`–`713`.** **WHAT IT RECORDED: the `A112` delivery-model re-spell — the store returns the handles and invokes nothing; the JS surface is the invoker and runs the triggered constraints first, and the other listeners only once every constraint has passed, before returning to the calling process; and `pending` is the whole returned set, each entry leaving it only by being checked off as it passes, a sift being unnecessary and unlawful.** **NO CLAUSE OF THIS DOCUMENT MOVED WITH IT AND NO CITATION IS DROPPED: the laws it records stand at the clauses that carry them — `§5.5` (`P-SM-5`) in this document, and `kernel-surface.md §2.1` item 2 with `§2.2` items 2 and 3 — and every site the moved section named is named at the status head's own `A112` clause above and at the parts' own dated delta sections, none of which is this section** (`RCA-8(g)`: move out, leave a one-line pointer, never retain beside).

---**⟶ PROVENANCE MOVED 2026-10-13 (the gate supervisor's applier act, the volume remedy) — RECOVERED AT `archive/spec-history/2026-10-13-recovered-provenance.md`.**** **The blocks that stood here are at that path, recovered FROM THE SESSION TRANSCRIPTS after the applier script that performed the move wrote pointers without the moved bytes (`docs/defects.md` `DEF-2026-10-13-J`): the contract set's `32` lines were recovered and verified line by line against the pre-move byte lengths (each within `0`–`4` B, the residue being trailing whitespace), and `24` of this part's own head notes (≈`5,000` B of per-pass HISTORY, `0` B of rule) were not recoverable — declared at the same archive path. NO RULE MOVED OR WAS LOST: every clause these notes describe stands at its own home.**
