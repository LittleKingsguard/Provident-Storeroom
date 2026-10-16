# `e2e-scenarios-b` — the second carrier of the unit's end-to-end battery (`U-STOREROOM-CONSTRAINTS`)

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-constraints/`** — authored
  at the **GATE-2 BATTERY SPLIT PASS OF 2026-10-13 (`role_spec_writer`)**: `e2e-scenarios.md` measured
  `127,681` B, `97 %` of the process's per-path volume line of `131,072` B, so **the battery is SPLIT and its
  scenarios `E2E-C-9` … `E2E-C-16` are MOVED OUT OF `e2e-scenarios.md` BYTE-EXACTLY, as they stood on that date
  — the one account this directory gives of the move is the short dated clause below, and this head's KIND is
  declared by this part's own `e2e-scenarios-b` row in `contract.md`'s part map.** **Its `e2e-scenarios-b` row
  in the contract document's part map declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-constraints/e2e-scenarios-b.md`, and `e2e-scenarios.md` is left carrying `E2E-C-1` …
  `E2E-C-8`, `§1`, `§2`'s cell schema and `§3` with a ONE-LINE POINTER where the moved scenarios stood**
  (`RCA-8(g)`: move out, leave a one-line pointer, never retain beside).
- **What this part is, and what it declares.** **This part carries `8` of the battery's `16` scenarios —
  `E2E-C-9`, `E2E-C-10`, `E2E-C-11`, `E2E-C-12`, `E2E-C-13`, `E2E-C-14`, `E2E-C-15` and `E2E-C-16` — each with
  its own seven mandatory cells, AS `e2e-scenarios.md` AUTHORED THEM, BYTE-EXACTLY.** **It declares no clause
  the unit's contract does not already carry: it is a CARRIER of relocated text, and its subject-matter is
  those `8` scenarios exactly as that document authored them** (`[T: this part's own carriage, whose scenarios
  moved and whose identifiers did not | CONTRACT]`).
- **NO SCENARIO, CELL OR FIGURE MOVED IN MEANING — the census, re-derived rather than carried, and printed
  with its terms.** **THE IDENTIFIERS ARE UNMOVED: `E2E-C-9` … `E2E-C-16` keep the ids they were authored under,
  the `<n>` of `E2E-C-<n>` does not renumber, and no scenario is renumbered, renamed or reordered.** **THE
  `7`-CELL SHAPE IS UNMOVED: the seven mandatory cells stand here, one and the same set as
  `e2e-scenarios.md §2`'s schema states it — the id · the start point · the surface it drives · its steps · the
  observation that makes it PASS · the fail-state it distinguishes · the ruling it pins.** **AND THE CENSUS IS
  RE-DERIVED FROM THE TWO CARRIERS RATHER THAN INFERRED FROM THE MOVE: `E2E-C-1` … `E2E-C-8` at
  `docs/specs/storeroom-constraints/e2e-scenarios.md` = `8`, `E2E-C-9` … `E2E-C-16` at this part = `8`, and
  `8 + 8 = 16` ✓ — so the battery's own census stands as `e2e-scenarios.md §1` prints it, `16` scenarios
  (`15 + 1 = 16` ✓) × `7` mandatory cells `= 112` cells ✓, of which this part carries `8` × `7` = `56` cells,
  and NO scenario, cell, identifier or census figure changed meaning in the move.**
  (`[T: this part's own carriage census, printed with its terms and derived from both carriers | CENSUS]`).
- **Scope boundary — what this part does NOT carry, and why.** **It carries no section `§1`, no cell schema
  `§2` heading and no `OWED` list `§3`: those stand at
  `docs/specs/storeroom-constraints/e2e-scenarios.md`, which carries the pointer to this part.** **It authors
  NO test code, asserts NO result, drives nothing and runs nothing: the disclaimer its sibling's `§1` carries
  governs this part too, and it is CITED there rather than restated here — this part states, for each scenario
  it carries, WHAT a drive would do and WHAT its observation would read** (`[T: this part's own scope boundary,
  so this file is never read as the red set | CONTRACT]`).
- **THE CROSS-CARRIER READ SET — DECLARED SO EVERY SCENARIO BELOW RESOLVES, AND STATED AS A DECLARATION AND
  NEVER AS A RESTATEMENT** (`DI-5`): **a reader of this part must read, at
  `docs/specs/storeroom-constraints/e2e-scenarios.md`, its `§1` (the document's own rules with the census and
  its terms), its `§2`'s CELL SCHEMA (the `7` mandatory cells every scenario here carries), its own
  first-line disclaimer (the statement that the battery authors no executable tests) and its `§3` (the `OWED`
  list) — and, at `docs/specs/storeroom-constraints/contract.md`'s part map, the `e2e-scenarios` and
  `e2e-scenarios-b` rows that name the two carriers and the identifiers each holds.** **THOSE SECTIONS ARE
  READ AND NOT RE-STATED: their rules stand at their own `§`, this part carries none of them, and NO RULE OF
  ANY OF THEM IS RE-STATED HERE — the one-line pointer at `e2e-scenarios.md §1`'s close, where the moved
  scenarios stood, is the address, and it is CITED and not copied** (`RCA-8(g)`).
  (`[T: the cross-carrier read set this part's scenarios depend on, declared so no rule of it gains a second
  home here | CROSS-REF]`).
- **⟶ AND EVERY DRIVE WINDOW IN THIS FILE WHOSE REPAIR BODY RETURNS A VALUE NOW SPELLS THE SHAPE `{ok, message, op}` — THE REPAIR-OP SEAM `A: docs/decisions.md` · `A110` RULES, ITS ONE HOME BEING `parameter-semantics.md §2.7` (`role_spec_writer`, 2026-10-13):** **`op` is the op the repair's own edit landed, REQUIRED IFF `ok === true` and ABSENT where it is `false`, and the kernel reads it off that return and nowhere else.** **THIS FILE'S `5` DRIVE WINDOWS AND `5` REPAIR-RETURN SITES — `E2E-C-9` `1` + `E2E-C-11` `2` (its two attempts) + `E2E-C-15` `1` + `E2E-C-16` `1` (`rA`'s own body) = `5` ✓ — and the whole battery's terms, printed with both sides, are `12` REPAIR-RETURN SITES ON `11` WINDOWS (`7 + 5 = 12` ✓ sites; `6 + 5 = 11` ✓ windows, this file's `5` and `5` and `e2e-scenarios.md`'s `7` and `6` being enumerated at ITS head, so each file prints its own terms and the total is closed once).** **AND THE THREE REPAIRS OF THE BATTERY THAT CARRY NO SUCCESS FORM SAY SO BY NAME, SO AN ABSENT `op` IS READ AS THE FAILURE ARM'S OWN DECLARED FORM AND NEVER AS A MISSING MEMBER: `E2E-C-13`'s repair and `E2E-C-16`'s `rB`, EACH OF WHICH THREW AT ITS OWN VERB CALL AND REACHED NO RETURN AT ALL (`rB`'s throw being the one the `KC-4` row's throwing-repair path disposes of at `fail-surface.md §2`), AND `e2e-scenarios.md`'s `E2E-C-4`, whose repair RETURNS `{ok: false, message}` WITH ITS OWN EDIT NOT MADE.** **NO SCENARIO, SEVEN-CELL SET, IDENTIFIER OR CENSUS FIGURE OF THIS PART MOVES.**
- **⟶ THE MOVE, DATED, IN ONE CLAUSE — SO THE PROVENANCE IS NOT LOST WITH THE BYTES: the scenarios
  `E2E-C-9` … `E2E-C-16` were moved here BYTE-EXACTLY on 2026-10-13 by the gate supervisor's applier act, under
  the per-path volume remedy, because `e2e-scenarios.md` had reached `127,681` B against the `131,072` B line;
  the identifiers, the seven cells of each and the census are unmoved, and the split's citations are re-spelled
  as `contract.md §0.1`'s re-spelling list enumerates them, item `32`.**

---

### `E2E-C-9` — the compacted floor: the composition reports what it performed and nothing wider

1. **Id:** **`E2E-C-9`**.
2. **Start point:** **the app performs enough writes at one address that the journal's own compression marks an entry `compacted`, and THEN registers a constraint whose repair writes at that address and commits a violating value**: the app writes at `['a']` several times — through the store's own verb — until the store's own journal reports a compacted entry in `['a']`'s subtree, and then `K-1` `register(['a'], 'x', cx)` where `cx`'s repair issues a write at `['a']` **and RETURNS `{ok: true, op}` with its `op` set to that write's own returned op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), and `K-2` `commit(['a'], '0', v)`.
3. **The surface it drives:** **the store's own verbs — the write and `rollback` — with the kernel's `K-1`,
   `K-2`, `K-3` composing them.**
4. **Steps:** **(1)** the app's repeated writes at `['a']` and the journal's own compression. **(2)**
   `register` then `commit` → `op1`. **(3)** the pass violates `1:a#x` on the FIRST evaluation → arm `(b)`,
   `1:a#x` enters `ran` and `appliedRepairs`, the repair's write returns `op2`; and the re-run violates `1:a#x`
   AGAIN — IT IS IN `ran` AND IN `appliedRepairs`, so THE ATTEMPT REACHES ARM `(e)` AND ITS FAILURE TOKEN
   IS `KC-5` (`ConstraintRepairRepeat`), NO repair being invoked a second time** (`RE-5`; `kernel-surface.md §2.1`
   item 2 · `attempt-lifecycle.md §2.4` item 4's arms `(b)` and `(e)`: **the window carries NO pair with a repair unregistered, so arm `(c)`
   is NOT this window's arm**). **(4)** the composition runs
   over `ops` = `[op1, op2]`: a call whose candidate set includes a compacted entry **the composition still
   owes** fails `RollbackCompacted` and undoes nothing — and that state is `KC-8`, not a partial success.
   **THIS WINDOW'S ATTEMPT PASSES NO CHECKPOINT EITHER, AND THE FLOOR'S PRECEDENCE IS THEREFORE READ HERE
   RATHER THAN LEFT TO A DRIVE** (`A: docs/decisions.md` · `A102`, `D3`; `RC-14`; `composition-and-states.md §2.6`
   item 8 (iv)): **every write is checked atomically as it lands and NO op of this attempt left a valid state — the FIRST pass violated `1:a#x` on `op1`'s value at its first evaluation and the re-run repeated the violation on `op2`'s value, so no state at which every registered pair at `['a']` passed was ever left — and the steps' `checkpoint` member is `null` AND NO OTHER MEMBER CARRIES A BOUNDARY (`Q-A`; `Q-B`; `A102`, `D3`):
   AND THE ONE CLAUSE THAT OVERRIDES THE TARGET RULE IS THE FLOOR'S OWN, DECIDED HERE AND NOT BY A DRIVE: where a still-owed op's call meets a compacted base, it leaves the verb
   answering `RollbackCompacted`, the kernel reporting `KC-8`, and NOTHING RESTORED** — **so this scenario's
   end state is the floor's and not a last-all-passing-state claim, and the composition STOPS at the failing
   call: no step is recorded for an op after it, so the `rollback` member's LAST element is that failing
   call's step.**
5. **The observation that makes it PASS — with the member each observation reads:** **the thrown form reads
   `status: 'KC-8'`; its `log` carries EXACTLY ONE `outcome` ENTRY AND IT READS
   `state: 'KC-8'` — the floor's answer standing in the ONE entry the attempt's failure arm also appended,
   because an attempt has ONE `outcome` entry and the floor appends NO second one** (`RE-6`;
   `composition-and-states.md §2.6` item 6 (a)); **its `message`
   NAMES the store's own `RollbackCompacted` as the store's answer and names the op whose call met the
   floor; the `log`'s `repair-run` entry count for the pair key `(['a'], 'x')` is EXACTLY `1` and never `2`,
   which is arm `(e)`'s own observation; `K-5`'s report reads `rollback` with one `RollbackStep` per PERFORMED call, the failing call's
   `failed` member `true` with its `answer` carrying the store's own code, its `undoneOps` an EMPTY list and
   its `restoredTo` the state the addressed subtree stood at, while every call that RETURNED carries
   `failed: false`, `answer: 'ok'` and the store's own `undoneOps`/`restoredTo` verbatim; and the performed
   set — the
   union of the steps' `undoneOps` members — claims NO reach past the compacted base, so the store's read at
   `['a']` matches exactly what those members report; **and every recorded step carries `checkpoint: null`,
   which is this attempt's own target member and NOT a restored-state claim — the `null` and the floor's
   `KC-8` are read together, so a drive that reads a restored state past the compacted base has contradicted
   both.** (`A102`, `D3`; `composition-and-states.md §2.6` items 5 (b) and 6;
   `fail-surface.md §2`'s `KC-5`/`KC-8`; `contract.md §5.7`, `P-TP-7`; the arm `(e)` printed at `RE-5` and
   the ONE `outcome` entry at `RE-6`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a kernel that reports the
   rollback as whole, or that retries past the floor, or that claims a `pre-state` it did not reach, or that
   lets the attempt pass.** **FALSIFIED BY: an `outcome` entry whose `state` is not `KC-8` in a window whose
   composition met a compacted entry; or a SECOND `outcome` entry in that log (`RE-6`); or a `repair-run` entry count of `2` for the pair key `(['a'], 'x')`, which would be a repair invoked a second time (`RE-5`); or a `rollback` member asserting an undo the store did not report
   (a `RollbackStep.undoneOps` carrying an `opId` the store never undid); or a failing step whose `failed`
   member is `false` or absent — the four-member reading of this record, WITHDRAWN BY NAME at
   `composition-and-states.md §2.6` item 3 (`RC-10`) — or a step reporting a non-empty `undoneOps` with
   `failed: true`; or a report whose `outcome` is `'passed'`; **or a step of this window whose `checkpoint`
   member is NOT `null`; or a composition that continues past the failing call and records a step for an op
   after it — the floor is all-or-nothing and this window stops at the call that met it; or a drive that
   reads a restored state past the compacted base because the floor was given precedence over by a checkpoint claim, or because a checkpoint op was read as one the walk could pass to the verb and sweep — the stop op is never passed to the store verb at all, so no call of its own can meet a base and the floor's precedence is never in question (`A102`, `D3`; `Q-A`; `Q-B`).**
7. **The ruling it pins:** **`P: §B.3`** — *"the compacted floor named: per-op reach, never a claim past a
   compacted base"* — read with **`A: docs/specs/storeroom-native/write-and-read.md §6.4`** item 2's `M-6`
   (*"the floor is ALL-OR-NOTHING and never partial"*) and `§6.1` item 5's `M-4`.

### `E2E-C-10` — identical resolution from the external call site, with the instrument named

1. **Id:** **`E2E-C-10`**.
2. **Start point:** **the app reaches the kernel through the JS package's crossing — one `commit` issued by a
   listener body and one issued by an external call — over a store driven only by the caller's own writes**:
   the app's listener body calls `K-2`/`K-3` for a write it observed, and, in a separate window, the app's
   external call does the same for an identical registered pair and an identical written value.
3. **The surface it drives:** **the external path the app uses —
   `docs/specs/storeroom-js/contract.md §2.2` · `§2.6` · `§2.10`.**
4. **Steps:** **(1)** register the pair; **(2)** the write lands and the listener body runs the attempt;
   **(3)** the external window does the same; **(4)** a drive compares the two windows over the members
   named in cell (5).
5. **The observation that makes it PASS — with the member each observation reads:** **THE INSTRUMENT IS
   STATED SO THE CLAIM IS MEASURABLE RATHER THAN *"RESOLVES IDENTICALLY"*** (`CC-18`; `CC-32`): **the drive
   compares, member by member, (i) the thrown form's `status` or the report's `outcome`; (ii) the
   `AttemptReport.ops` LENGTH and its elements' `op.kind` sequence; (iii) the `AttemptReport.log` LENGTH and
   its elements' `kind`/`id`/`state` sequences; and (iv) the `RollbackStep` count and each step's
   `answer`/`failed` readings in performed order — **THE `opId` MEMBERS ARE EACH WINDOW'S OWN AND ARE NOT COMPARED FOR EQUALITY ACROSS THE TWO WINDOWS: each window's `commit` is its own store write and the store mints that write's `opId`, so the CROSS-WINDOW COMPARISON IS FALSIFIABLE ON THE STEP COUNT AND ON THE ANSWER/FAILED READINGS AND NOT ON AN `opId` THAT NO TWO WINDOWS CAN SHARE (`RE-8`), while WITHIN one window each step's `opId` IS the opId the kernel passed to that call** — **and the two windows read EQUAL on all four.** **The `message` strings are EXCLUDED
   from the equality and their exclusion is declared: a message names the trigger's arguments and its text is
   the kernel's own, so the comparison's instrument is the four member groups above** (`AttemptReport`,
   `LogEntry` and `RollbackStep` member sets; `attempt-lifecycle.md §2.4` item 5 (ii); `contract.md §5.4`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a kernel whose outcome
   depends on which call site reached it, or whose log's entry COUNT differs by call site.** **FALSIFIED
   BY: a difference between the two windows in the `status`/`outcome`, the `ops` length, the `log` length or
   any `kind`/`id`/`state` sequence, or the `RollbackStep` count, or the two steps' `answer`/`failed` readings in performed order — **and the `opId` members are NOT among the compared readings, because each window's `commit` mints its own** (`RE-8`).**
7. **The ruling it pins:** **`P: §B.4`** — the attempt's record the kernel's own and *"nothing crossing the
   store's surface"* — read with **`A: docs/specs/storeroom-js/contract.md §2.6`** (*"evaluate constraints
   AFTER a `write` returns"*) **— AND RE-SPELLED AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`A: docs/decisions.md` · `A112`): THE STORE RETURNS THE HANDLES AND INVOKES NOTHING, SO THE INVOCATION THIS SCENARIO'S TWO WINDOWS OBSERVE — THE LISTENER BODY'S OWN ATTEMPT AND THE EXTERNAL CALL'S — IS THE JS SURFACE'S OWN ORDERED LAYER, THE TRIGGERED CONSTRAINTS FIRST WITH EACH ENTRY CHECKED OFF AS IT PASSES AND THE OTHER LISTENERS ONCE EVERY CONSTRAINT HAS PASSED, THE CALLING PROCESS RECEIVING THE CALL ONLY AFTER BOTH; and the five compared member groups of cell (5) and the falsifier of cell (6) stand BYTE-FOR-BYTE, the delivery model being ADDED to what this cell pins and no member of either cell being re-derived.**

### `E2E-C-11` — the marker's scope: per attempt, and NO closed record carries it

1. **Id:** **`E2E-C-11`**.
2. **Start point:** **the app drives TWO separate attempts at the SAME address, each starting from its own
   `K-2`, and — in the third window — two kernel instances over ONE store**: the app registers a pair whose
   repair runs and whose edit is then broken by another constraint's repair; it commits, runs the attempt to
   a `KC-5` failure, and then, as a SEPARATE caller's act, commits again at the same address with the same
   violating value.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — over one store.**
4. **Steps:** **(1)** attempt ONE: the pass evaluates the pair on `v` and it is VIOLATED → arm `(b)`; the
   repair runs, its edit returns an op, **and the repair RETURNS `{ok: true, op}` with `op` = that op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), and the pair
   enters `ran` and `appliedRepairs`; the re-run evaluates the pair against that op's own value and it is
   VIOLATED AGAIN — `ran` membership plus `appliedRepairs` membership, i.e. arm `(e)` → `KC-5`; the attempt
   closes, its registry entry is disposed of by `attempt-lifecycle.md §2.4` item 3's terminal-arm clause — REMOVED where that attempt's own rollback is a successful rollback and LEFT STANDING where it is not — and its record is placed in the kernel's closed-attempt store. **AND THE TWO ATTEMPTS ARE SEPARATED BY THAT ENTRY AND NOT BY A SHARED ONE: attempt TWO's `ran` and `appliedRepairs` are ITS OWN and start EMPTY, because the registry entry is per attempt and not per address** (`attempt-lifecycle.md §2.4` item 7 (i)).
   **(2)**
   attempt TWO: a FRESH `K-2` at the same address opens a NEW attempt whose `ran` and `appliedRepairs` are
   EMPTY, and the same repair RUNS AGAIN — its edit returns a fresh op, **its own return carrying `{ok: true, op}` with `op` = that fresh op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), and the same pair's own repeat then
   fails THAT attempt at its own `KC-5`, so the second attempt reaches its own arm and does not refuse the
   repair. **(3)** a second kernel instance over the same store registers the same pair and runs its own
   attempt.
5. **The observation that makes it PASS — with the member each observation reads:** **attempt ONE's thrown
   form reads `status: 'KC-5'` and its `log`'s `outcome` entry reads `state: 'KC-5'`, and
   that log's `repair-run` entry count for the PAIR'S OWN KEY is exactly `1` — never `0` (the repair did run)
   and never `2` (it did not run twice)**; **attempt TWO's thrown form reads the SAME `status` and its log's
   `repair-run` entry count for the SAME pair's own key is exactly `1` TOO, because its `ran` and its
   `appliedRepairs` opened EMPTY and its `KC-5` is its OWN repeat's — so the count is per attempt and the
   second attempt's `1` is its own, NOT the first attempt's** (`LogEntry.kind`/`id`/`state`; `kernel-surface.md §2.5` item 2's
   limb (i) count; `kernel-surface.md §2.5` item 2); **and the SECOND INSTANCE's thrown form/`outcome` reads
   the SAME arm the first instance's attempt did,
   with the first instance's registrations having no effect on it** (`kernel-surface.md §2.5` item 2;
   `contract.md §5.8`, `P-TP-8`). **AND THE OBSERVATION IS TAKEN FROM THE THROWN FORM AND THE LOG AND NOT
   FROM AN `appliedRepairs` MEMBER READ OFF A REPORT** (`NV-1`): **`AttemptReport`'s five members carry no
   `appliedRepairs`, and `K-5` `report` over an OPEN attempt is refused `KC-7` — so `appliedRepairs` is a
   member of the OPEN `AttemptRecord` and of NO shape a drive reads for a closed attempt — the closed
   attempt's record is the FIVE-MEMBER `AttemptReport`, which CARRIES THE MARKER NOWHERE and is NOT a retained
   read-only list, the reading that made it one being WITHDRAWN BY NAME (`NX-1`; `RD-4`) — and this scenario
   observes the marker's scope through the per-attempt `repair-run` count instead** (`kernel-surface.md
   §2.5` item 2's lifetime limb; `attempt-lifecycle.md §2.4` item 7 (ii); `parameter-semantics.md §2.9`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a marker surviving its
   attempt — the second attempt refusing to run the repair, i.e. failing `KC-5` with a `repair-run` count of
   `0` for that pair; or a marker global to the process, or a marker read from the journal, or a marker
   written as a store entry.** **FALSIFIED BY: a second attempt at the same address whose log carries NO
   `repair-run` entry for that pair's own key, or whose count for it is `0`, or the two attempts' counts
   summed as `2` for one attempt; or two instances over one store where one instance's registrations change
   the other's result; or a drive that reads `appliedRepairs` off an `AttemptReport` or off ANY closed
   attempt's record and finds it** (`NX-1`; `RD-4`).
7. **The ruling it pins:** **`P: §B.8`** — *"The caller-side registry, declared by the amendment"*, with the
   caller evaluating *"already recorded as applied"* — read with **`P: §A.2`** and
   **`R: docs/decisions.md` · `A99`** — D3.

### `E2E-C-12` — three refused registrations, and a lawful pass that shows nothing was added

1. **Id:** **`E2E-C-12`**.
2. **Start point:** **the app attempts THREE refused registrations and then one lawful one, and commits**:
   `K-1` `register(null, 'x', f)`; `K-1` `register(['a'], '', f)`; `K-1` `register(['a'], 'x', 'not a
   function')`; then `K-1` `register(['a'], 'y', g)`; then `K-2` `commit(['a'], '0', v)`; then `K-3`
   `runAttempt`.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — with the store's own `listen`
   reached by the lawful registration.**
4. **Steps:** **(1)** the three refused calls each throw. **(2)** the lawful registration adopts the store's
   handle. **(3)** `commit` → `op1`, then `runAttempt` runs exactly the pairs the registry holds.
5. **The observation that makes it PASS — with the member each observation reads:** **the three refusals
   throw the kernel's own form with `status: 'KC-1'` (the `null` address) and
   `status: 'KC-2'` (the empty `id`; the non-function `constraint`) respectively; and the
   SUBSTITUTE OBSERVATION FOR *"no entry was added"* IS NAMED AND IS AVAILABLE** (`CC-2`; `composition-and-states.md
   §2.7` item 12 (i); `contract.md §5.7`, the registry's keying — ONE ENTRY PER CALL AT THE EXTERNAL SURFACE, so this pass reads its OWN call's entry and never a wider held set — A NESTED PROCESSING STANDING IN AN ENTRY OF ITS OWN, whose ops its encloser's entry never holds —): **the lawful pass's `AttemptReport.log` carries EXACTLY ONE `constraint-check` entry,
   whose `id` is `'y'` — so the three refused pairs added NOTHING to the registry, since a pass evaluates one
   entry per registered pair.** **AND THE OBSERVATION IS TAKEN ON A PASS THAT COMPLETES, DECLARED BECAUSE THE
   ENTRY SET IS THE PASS'S EVALUATED PREFIX AND NOT THE REGISTRY'S LIVE PAIR SET** (`RD-6`): **the pass above
   EVALUATES EVERY PAIR IT HOLDS — every one of them PASSES on `v`, so no violation stops it and every
   registered pair stands in the pass's prefix — and the `1`-entry reading is therefore sound ONLY for a pass
   that completes: a pass stopped at a violating pair appends NO entry for the pairs after it, and a drive
   that read `"no entry for the refused pair"` off such a pass would have read the prefix as the pair set**
   (`attempt-lifecycle.md §2.4` item 5 (ii)'s prefix rule; `contract.md §5.1`, `P-IM-1`; `fail-surface.md §2`'s
   `KC-1`/`KC-2`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a refusal that still adds a
   registry entry, or that throws a store code as its `status`, or a lawful pass that shows an entry for a
   refused pair.** **FALSIFIED BY: a `constraint-check` entry count greater than `1` in the lawful pass THAT
   COMPLETES — a pass stopped at a violating pair has no such reading (`RD-6`); or a
   refused call whose thrown form's `status` is a store member; or a refused call that returns a handle
   instead of throwing.**
7. **The ruling it pins:** **`P: §B.6`** — the kernel's own failure form and *"never a store code"* — read
   with **`P: §B.7`** and `contract.md §5.3` (`P-IM-3`).

### `E2E-C-13` — two store codes at the caller's own verb calls, and the one asymmetry between them

1. **Id:** **`E2E-C-13`**.
2. **Start point:** **a caller's own two verb calls that the store refuses**: **(α)** `K-2`
   `commit(['a'], '0', v)` with a tier outside the store's domain; **(β)** inside a lawful attempt, a
   constraint whose repair issues a write at an address the store refuses (a write under a leaf) **— SO THE REPAIR LANDS NO EDIT AT ALL: ITS OWN VERB CALL THREW THE STORE'S CODE BEFORE ANY OP EXISTED, SO THIS BODY REACHED NO RETURN AT ALL AND NO `op` MEMBER IS SOUGHT IN A RETURN IT NEVER MADE (and a body of this kind that CATCHES its own verb's refusal returns the `{ok: false, message}` arm, whose `op` is ABSENT by declaration) — *"NO OP PRODUCED"* IS THIS WINDOW'S DECLARED STATE AND NOT A MISSING MEMBER** (`parameter-semantics.md §2.7`; `A: docs/decisions.md` · `A110`).
3. **The surface it drives:** **the store's own verbs — the write reached by `K-2` and the write reached by
   the repair — with the kernel's `K-1`, `K-2`, `K-3` composing them.**
4. **Steps:** **(1)** the `commit` whose tier is outside the store's domain. **(2)** the lawful `register`,
   `commit` and `runAttempt` whose repair's own write the store refuses.
5. **The observation that makes it PASS — with the member each observation reads:** **(α) the thrown object
   carries EXACTLY the STORE's TWO members `{status, message}` with `status` a member of the store's closed
   `15` — `'OutOfDomainTier'` — and carries NO `log` member — so NO attempt was opened and the kernel
   appended no entry**; **AND THE ADDRESS IS UNHELD AFTER THE REFUSAL — DECLARED HERE SO THE REFUSED
   `commit` IS NOT READ AS HAVING LEFT A LIVE ATTEMPT BEHIND** (`NV-3`; `kernel-surface.md §2.1` item 2):
   **the refusal happens at the store's own write verb, BEFORE any attempt is opened, so the address holds
   no live attempt; and a SECOND `K-2` at that address RETURNS a fresh `CommitRecord` rather than throwing
   `KC-7`, which is how the drive observes that no attempt was left held and that the refused commit's own
   record cannot be read back by a second `K-2`** (`CommitRecord.attempt`;
   `kernel-surface.md §2.1` item 2's tier clause; `parameter-semantics.md §2.11` item (ii)).
   **(β) the thrown object carries the KERNEL's THREE members `{status, message, log}` with
   `status: 'KC-4'`, its `log`'s `outcome` entry reads `state: 'KC-4'`, its `log`'s
   `repair-run` entry's `message` NAMES the store's own code, and `K-5`'s report reads `ops` of length `1` —
   the refused op is NOT in `ops`, because the store never returned it** (`kernel-surface.md §2.3` item 2's
   channel clause; `fail-surface.md §1.2` items 2–3; `§2`'s `KC-4`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a store code re-labelled as
   a kernel `status` at `K-2` (the kernel's channel where the store's owns the act), or a refused repair
   whose store code reaches the caller as the thrown form's `status` (the store's channel where the kernel's
   owns the act), or an op credited that the store never returned.** **FALSIFIED BY: a `commit` whose thrown
   form's `status` is `KC-*`; or a repair refusal whose thrown form's `status` is a store member, or whose
   form lacks the `log` member; or a report whose `ops` has length `2` after the store refused the repair's
   write; or a second `K-2` at the address throwing `KC-7` after a FAILED `commit` — **i.e. a refused tier
   read as having opened an attempt** (`NV-3`). **AND THE `tier`
   REFUSAL IS NOT `P-SM-4`'s ARM `(h)`, WHICH IS STATED HERE SO THE TWO ARE NEVER CONFLATED** (`CC-21`):
   **arm `(h)` is an op the attempt ALREADY HOLDS refused by a verb the COMPOSITION calls, and a refused
   `commit` opens no attempt.**
7. **The ruling it pins:** **`P: §B.6`** — *"the kernel's own failure form and **never** a store code; the
   closed set untouched"* — read with **`A: docs/specs/storeroom-native/contract.md §8.3`** (the store's own
   form and its side of the throw) and `fail-surface.md §1.2`.

### `E2E-C-14` — an unknown attempt reference, and the refusal that is not `KC-7`

1. **Id:** **`E2E-C-14`**.
2. **Start point:** **the app holds a reference from a CLOSED attempt and asks for a report whose attempt is
   already gone, and asks for a report on an attempt that is still open**: `K-1`
   `register(['a'], 'x', c1)`; `K-2` `commit(['a'], '0', v)`; **`K-5` `report(CommitRecord.attempt)` WHILE
   THE ATTEMPT IS OPEN**; `K-3` `runAttempt` to its terminal arm; and then `K-5` `report(anAttemptRefTheKernel
   NeverHeld)`.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3`, `K-5` — and `K-4` for the
   closed attempt's own log, with `K-3` reached a SECOND time over the stale `CommitRecord` the caller still
   holds.**
4. **Steps:** **(1)** `register` then `commit` → `CommitRecord.attempt`, the ONLY declared way an attempt
   reference is obtained. **(2)** `K-5` `report(attempt)` while the attempt is open → it throws. **(3)**
   `K-3` `runAttempt` to its terminal arm. **(4)** `K-5` `report(attempt)` and `K-4` `log(attempt)` for the
   now-CLOSED attempt. **(5)** `K-3` `runAttempt` over a `CommitRecord` whose `attempt` is the SAME
   now-CLOSED reference — the stale record a caller still holds. **(6)** `K-5` `report(freshRef)` where
   `freshRef` is an `AttemptRef` the kernel holds no attempt for.
5. **The observation that makes it PASS — with the member each observation reads:** **the OPEN attempt's
   `K-5` throws the kernel's form with `status: 'KC-7'`, which is how the drive reads that
   the attempt IS live at that address** — **the OPEN state being read from the registry's own entry and from
   this refusal, and NOT from an `AttemptRecord.open` member read off a closed attempt, WHICH NO CLOSED
   RECORD CARRIES** (`NV-2`; `attempt-lifecycle.md §2.4` item 7 (ii)); **the CLOSED attempt's `K-5` RETURNS an
   `AttemptReport` whose members equal `K-3`'s return
   member for member, and whose `log`'s `outcome` entry's `state` carries the same token the terminal arm's
   thrown form's `status` carried, while `K-4` returns the SAME `LogEntry[]` list** (`AttemptReport`'s five
   members; `LogEntry.state`); **and the unknown reference's `K-5` throws the kernel's form with
   `status: 'KC-2'` — `KC-2` — and NOT `KC-7`** (`kernel-surface.md §2.1` items 4–5;
   `fail-surface.md §2`'s `KC-2` and `KC-7`; `contract.md §5.2`, `P-IM-2`). **AND THE SAME MEMBER ANSWERS THE
   STALE RECORD: step (5)'s `K-3` over the CLOSED reference throws the kernel's form with
   `status: 'KC-2'` — `KC-2`, and NOT `KC-7`, because `KC-7`'s `K-3` site is the RE-ENTRANT
   call for a LIVE attempt — while the closed record and its log are UNTOUCHED and step (4)'s `K-5`/`K-4`
   readings still stand** (`RD-9`; `kernel-surface.md §2.1` item 3's stale-record clause).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **an unknown reference answered
   as `KC-7` (the two refusal arms confused), or a closed attempt whose `K-5`/`K-4` cannot reach it, or a
   report whose member set differs from `K-3`'s, or a reference obtained from no declared item, or a closed
   attempt whose closure is read from an `open` flag rather than from its own `outcome` and the registry
   entry's absence.** **FALSIFIED
   BY: an unknown reference whose thrown form reads `KC-7`; or a `K-5` over a closed attempt throwing; or a
   `K-5` return whose member set is not `{attempt, outcome, ops, log, rollback}`, or whose member count is
   not `5`, or whose record CARRIES `open`, `ran`, `appliedRepairs` or `commit` — members the closed record
   does not have (`NV-2`); or a `K-3` over a CLOSED reference whose thrown form reads `KC-7`, or a `K-3` over
   a LIVE attempt's own reference whose thrown form reads `KC-2` — the two `K-3` refusal arms confused
   (`RD-9`); or a `K-4` return whose list differs from the thrown form's `log` for the same
   attempt; or an item
   that enumerates the closed-attempt store, which the surface refuses as its sixth item** (`RC-3` parks the
   store's retention at `contract.md §0.1` item 5 (v) and does not license one).**
7. **The ruling it pins:** **`P: §B.4`** — the attempt's record the unit's own and declared in
   `docs/specs/storeroom-constraints/` — read with **`R: docs/decisions.md` · `A98`** — D3 — and
   `attempt-lifecycle.md §2.4` items 1 and 7.

### `E2E-C-15` — the cross-address, re-entrant case: a nested attempt inside a live ancestor's subtree, and the checkpoint its failure stops at

1. **Id:** **`E2E-C-15`**.
2. **Start point:** **the app opens an attempt at `['a']` and, from INSIDE that attempt's own constraint body —
   which is where a caller's re-entrant call stands — opens a SECOND attempt at `['a','b']`, a DESCENDANT of
   the live address**: `K-1` `register(['a'], 'c1', c1)` where `c1`'s body inspects the value at `['a']`,
   **writes `['a','b','c']` through the store's own write verb — creating the op this window's post-checkpoint bound is read against — then `K-1` `register(['a','b'], 'c1b', c1b)`, `K-1` `register(['a','b'], 'c2', c2)` and then `K-2` `commit(['a','b'], '0', v2)` — the re-entrant
   act — runs `K-3` over that inner `CommitRecord` — and then returns `true` iff the value at `['a']` still
   passes**;
   `c1b`'s body returns `true` on every value it reads, so the inner address's own scope holds a pair that
   PASSES; `c2`'s body returns `true` on a lawful value and `{repair: r2, message: 'b is bad'}` on the two values this
   window writes at `['a','b']`, and `r2` issues a write at `['a','b']` through the caller's own store verb **and RETURNS `{ok: true, op}` with its `op` set to that write's own returned op — `op3`, the op step (4)'s arm `(b)` and this window's own re-run are read against** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`).
   **Then the app calls `K-2` `commit(['a'], '0', v1)` and `K-3` `runAttempt(commit)` — the `CommitRecord` that
   `K-2` returned, which is the ONE argument shape `K-3` takes at every call site of this battery.** **⟶ AND THE ORDER THE STEPS BELOW MAY BE DRIVEN IN IS DECLARED HERE, AT THIS CELL, BECAUSE THE GATE-5 BLIND RUN COULD NOT EXECUTE THIS SCENARIO AS WRITTEN AND THE SUBJECT OF THE SCENARIO IS UNMOVED BY THE CORRECTION** (`live-greens.md`'s `CON-4`; `A: docs/specs/storeroom-native/write-and-read.md §3.4`'s `W-2`/`W-3`/`W-4`; `A: docs/specs/storeroom-native/contract.md §8.1`'s #9; `contract.md`'s `DD-5`): **EVERY DESCENDANT WRITE THIS WINDOW MAKES — THE BODY'S OWN WRITE AT `['a','b','c']`, ITS TWO `register` CALLS AT `['a','b']` AND THE INNER `K-2`'s WRITE THERE — MUST BE MADE BEFORE THE OUTER ATTEMPT'S OWN WRITE AT `['a']` LANDS, BECAUSE THAT WRITE MINTS A LEAF AT `['a']` AND A LEAF HOLDS NO CHILD, SO A WRITE UNDER IT IS REFUSED `WriteParentNotLink` BY THE STORE'S OWN RULE; AND BECAUSE A FRESH STORE HOLDS NO KEYS AT ALL, A WRITE AT DEPTH `≥ 2` IS NO ADDRESS'S FIRST WRITE, SO THE STORE REFUSES THAT TOO UNLESS THE PARENT IS ESTABLISHED FIRST.** **THE DRIVE ORDER IS THEREFORE: STEP (1)'s REGISTRATION, THEN EVERY DESCENDANT ACT — THE BODY'S OWN WRITE, THE TWO `register` CALLS AT `['a','b']`, THE INNER `K-2` AND THE INNER `K-3` — AND ONLY THEN THE OUTER `K-2` OF STEP (2) AND THE OUTER `K-3` OF STEP (3); AND WHERE A LITERAL AT `['a']` IS WRITTEN BEFORE THE DESCENDANT ACTS, `W-2`'S RE-MINT IS THE ONLY SHAPE THAT WOULD MAKE THE LATER WRITES LAWFUL, SO NO DRIVE MAY READ THE STEPS' PRINTED NUMBERING AS THE DRIVE ORDER.** **AND THE SUBJECT IS UNCHANGED BY THIS: the outer attempt still stands `OPEN` at `['a']` while the inner attempt at `['a','b']` is opened and driven from inside its constraint body, and the inner attempt's own `checkpoint` is still the op step (4) reads.**
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — reached from TWO call sites: the
   app's own external call for the outer attempt and the outer constraint body's re-entrant call for the
   inner one, with the store's own write verb reached by both commits, by the body's own direct write and by
   `r2`'s edit.**
4. **Steps:** **(1)** `register(['a'], 'c1', c1)` → the store adopts the handle; the registry holds `a#c1`.
   **(2)** `commit(['a'], '0', v1)` → the store's write returns `op1`; the outer attempt is `OPEN` and `['a']`
   is held. **⟶ AND THE SEED THIS WINDOW'S OWN BODY REQUIRES IS DECLARED HERE, AT THIS STEP, BECAUSE WITHOUT IT THE WINDOW IS NOT EXECUTABLE AT ALL AND ITS SUBJECT IS UNMOVED BY THE CORRECTION** (`live-greens.md`'s `CON-4`; `A: docs/specs/storeroom-native/write-and-read.md §3.4`'s `W-2`/`W-3`/`W-4`; `contract.md`'s `DD-5`): **BEFORE THIS `K-2`, THE APP SEEDS `['a']` THROUGH THE STORE'S OWN WRITE VERB WITH A STRUCTURED (NON-LITERAL) VALUE, so `['a']` HOLDS A LINK AND NOTHING IS LOST AND THE DESCENDANT ADDRESS `['a','b','c']` IS WRITABLE — BECAUSE `['a']` IS A PREFIX OF BOTH THE REGISTRATIONS AND THE WRITES THE BODY MAKES FROM INSIDE THE OUTER PASS, AND A LITERAL AT `['a']` WOULD HOLD NO CHILD, SO THE BODY'S OWN WRITE AT `['a','b','c']` WOULD BE REFUSED `WriteParentNotLink` AND THE WINDOW COULD NOT REACH ITS OWN STEPS (4)–(9) — AND THIS STEP'S OWN ATTEMPT STILL STANDS `OPEN` AT `['a']` WHEN THE BODY RUNS, its own write landing over the seeded structure; AND THE SEED IS THE ONLY ACT THIS CORRECTION ADDS: NO STEP, NO CELL, NO OBSERVATION AND NO FAIL STATE OF THIS SCENARIO MOVES.** **(3)** `runAttempt(commit)` → the outer pass evaluates `a#c1` — **AND THAT EVALUATION IS THE KERNEL'S OWN ACT, SO LAYER (a) IS READ OFF THE WRITE THAT RETURNED THIS HANDLE — A WRITE THE KERNEL ITSELF MADE — AND NEVER OFF A LISTENER'S KIND: the kernel invokes `c1` because the constraint pass it is running needs that pair's function, which is why this body's acts stand INSIDE the live attempt's window and the re-entrant `K-2` of step (3) below is lawful** (`A: docs/decisions.md` · `A107` `D1`; `A109` `D1`; `kernel-surface.md §2.2` item 2) — **inside that evaluation**
   the body writes `['a','b','c']` — creating an op at a DESCENDANT address, which the inner attempt's composition later reaches as a STILL-OWED op — **AND THIS BODY IS LAYER (a)'s DELIVERY AND NOT LAYER (b)'s: the write that returned this handle was THE KERNEL'S OWN — made inside its own constraint pass — and that write's author is the split's whole predicate, never a listener's kind — while layer (b)'s handles are the ones a CALLER-made write returned, standing in `CommitRecord.pending` for the caller's own loop, whose instant no clause names and whose delivery ORDER is the one law `kernel-surface.md §2.1` item 2 states** (`A: docs/decisions.md` · `A107` `D1`; `A109` `D1`/`D2`) — then
   `K-1` `register(['a','b'], 'c1b', c1b)` and `K-1` `register(['a','b'], 'c2', c2)` (the two pairs appended
   after every pair at that address, in that order) and then `K-2`
   `commit(['a','b'], '0', v2)`: **`KC-7` is refused only AT THE ADDRESS THAT ALREADY HOLDS THE LIVE ATTEMPT,
   and `['a','b']` is not that address — so the inner `K-2` RETURNS a `CommitRecord` and opens a SECOND, live
   attempt** (`attempt-lifecycle.md §2.4` item 8 (ii) (g)). **(4)** the body calls `K-3` for the inner attempt:
   the inner pass over `op2` evaluates THE PAIRS THE ATTEMPT'S OWN ADDRESS REGISTERS — **`a/b#c1b` FIRST**, a
   pair this window's own `K-1` registered at `['a','b']`, which returns `true` and whose pair enters `ran` —
   then `a/b#c2`: `c2`
   is violated by `v2` → arm `(b)`, `r2` runs and its write returns `op3` **WHILE `r2`'s OWN RETURN CARRIES `{ok: true, op}` WITH `op` = `op3`** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`). **AND THE ANCESTOR PAIR `a#c1` IS
   EVALUATED BY NO PASS OF THE INNER ATTEMPT: it is the OUTER attempt's own pair, registered at `['a']`, an
   ANCESTOR of the inner attempt's address, and the pass's scope is the registry's rows at the attempt's OWN
   address — so a pass that read the ancestor's pair would be a pass whose scope was widened, which is the
   state cell 6 below falsifies** (`attempt-lifecycle.md §2.4` item 5 (iv)). **AND `op2` IS THE OP WHOSE LANDING LEFT THE INNER ATTEMPT'S ADDRESS AT THE STORE'S LAST VALID STATE — THE ARCHITECT'S OWN EXAMPLE, WHERE `a.b/y` PASSES CONSTRAINTS AND IS THEREFORE *"the last valid state"*, AND UNDER `A105` `Q1` (*"Any last valid state for the store."*) THAT STATE IS ESTABLISHED BY WHICHEVER LANDING LEFT IT, THIS ATTEMPT'S OR ANOTHER'S (`VD-3`) — BECAUSE EVERY REGISTERED PAIR AT THE ATTEMPT'S OWN ADDRESS `['a','b']` PASSED AT IT — `a/b#c1b` AND `a/b#c2` WERE EACH EVALUATED AT `op2` AND EACH RETURNED THE PASS ARM ON THE VALUE THE INNER ATTEMPT WROTE, `v2`, so THAT WRITE WAS CHECKED ATOMICALLY AS IT LANDED AND LEFT THAT ADDRESS'S STATE VALID (`Q-B`; `composition-and-states.md §2.6` item 8 (i); cell 5 reads the member that carries it).** **(5)** the re-run over `op3`
   evaluates `a/b#c1b` (passes) and then `a/b#c2`: **`a/b#c2` IS IN `ran` AND
   IN `appliedRepairs`, so the inner attempt reaches arm `(e)` and fails `KC-5`, NO repair being invoked a
   second time.** **THE RE-RUN OVER `op3` REACHED BOTH PAIRS AND FAILED AT `a/b#c2` — SO IT LEFT NO VALID STATE, AND THE INNER `checkpoint` REMAINS `op2`, THE LAST OP THAT DID: THE STOP OP IS THE OP AND NOT A PAIR KEY, AND THE WALK STOPS AT IT** (`Q-A`; `composition-and-states.md §2.6` item 8 (i)–(iii)). **(6)** the inner composition walks its call list —
   `ops` = `[op2, op3]`: `op3` first — the ONE op the composition still owed, the checkpoint being `op2` — each call recorded as a `RollbackStep`, and the inner
   attempt's registry entry is removed — THE INNER COMPOSITION'S ONE CALL HAVING RETURNED, WHICH IS THE *"SUCCESSFUL ROLLBACK"* `contract.md §5.7` DEFINES, so the removal here is the rule's own clearing and not an arm-level default (`attempt-lifecycle.md §2.4` item 7 (i)). **(6a)** the inner composition's first — AND ONLY — performed call is the one over
   `op3`, the still-owed op at the inner address, and its recorded step's `undoneOps` member names the op the
   body wrote at `['a','b','c']` — AN OP CREATED AFTER THE CHECKPOINT AND THEREFORE STILL OWED. **(6b)** the inner composition issues
   NO CALL OVER `op2`, the inner write's op, WHICH IS THE CHECKPOINT — the `opId` of the op whose landing left the attempt's last valid state — **so NO CALL IS EVER ISSUED OVER THE CHECKPOINT OP, AND `op2` SURVIVES THE COMPOSITION UNTOUCHED EVEN THOUGH ITS OWN ADDRESS `['a','b']` IS A PREFIX OF `['a','b','c']`, WHERE A CALL AT AN ANCESTOR ADDRESS WHOSE SUBTREE HOLDS IT WOULD OTHERWISE HAVE REACHED IT: THE STORE'S PER-OP REACH DOES NOT REFUTE THE STOP, BECAUSE THE COMPOSITION'S CALLS ARE MADE FOR THE STILL-OWED OPS ONLY** (`composition-and-states.md §2.6` item 4's reach/stop clause; `Q-B`). **(7)**
   **NO CALL OF THE INNER COMPOSITION NAMES THE OUTER ATTEMPT'S `op1`, AND NO CALL NAMES THE CHECKPOINT OP:
   `op1` stands at `['a']`, ONE LEVEL ABOVE the inner attempt's own address and outside the subtree of every
   op in the inner call list, so the store's own per-op reach over the inner calls does not name it** — **and
   `op1` STANDS, as the checkpoint op does, because neither is an op the composition still owed: `op1` was never
   a member of the inner attempt's call list at all, and `op2` IS the stop op.** **(8)** the outer constraint body returns `true` — the
   value at `['a']` still passes on the post-inner state — so the outer pass continues and completes with
   every pair at `['a']` passing; the outer attempt reaches the success arm with `ops` = `[op1]`.
   **(9) THE RULED CASE IS THEN DRIVEN ON THE SAME TWO ATTEMPTS, WHICH IS WHY THIS CELL CARRIES IT: the app
   opens ONE MORE attempt at the outer address, whose body writes an UNREPAIRABLE violation at `['a']` on its
   second run, so the OUTER attempt fails — and the value the OUTER attempt's `checkpoint` member names is
   `op2`'s, AN OP THE INNER ATTEMPT LANDED at the descendant address `['a','b']`, which the INNER attempt's own
   atomic evaluation left `['a','b']` valid after and which NO COMPOSITION OF THE OUTER ATTEMPT EVER ISSUES A
   CALL OVER.** **AND THE OUTER READING IS DERIVED FROM THE SAME MEMBERS AND FROM THE OUTER ATTEMPT'S OWN STEPS, NOT FROM THE SHARED `opId` (`VD-3`; `A105` `Q1`): `op2`'s landing was one at which EVERY REGISTERED PAIR OF THE OUTER ATTEMPT'S OWN ADDRESS PASSED — the ADDRESS-SCOPED evaluation `composition-and-states.md §2.6` item 8 (i) and `kernel-surface.md §2.3` item 1 declare — so THE STORE'S LAST VALID STATE AT THAT ADDRESS IS `op2` FOR THE OUTER ATTEMPT TOO, and the two readings being equal is a CONSEQUENCE of one state read by two attempts and never the derivation.** **AND EACH OF THIS SCENARIO'S TWO `checkpoint` READS IS TAKEN FROM ITS OWN ATTEMPT'S STEPS AND
   FROM NO OTHER SET: the INNER reading is `op2`'s `opId` READ FROM THE INNER ATTEMPT'S OWN STEPS — the inner
   `K-5` report's `rollback` member, which is the shape cell 5 reads it off — while the OUTER reading is the
   `checkpoint` value CARRIED BY THE OUTER ATTEMPT'S OWN STEPS — a DIFFERENT step list, from a different
   `AttemptReport`, whose value happens to be the same opId BECAUSE THE OP THAT LEFT THE STATE VALID WAS THE
   INNER ATTEMPT'S AND NOT THE OUTER'S.** **SO THE TWO READINGS ARE NEVER ONE READING OF ONE STEP LIST, AND
   THE MEMBER'S DOMAIN IS PROVEN WIDER RATHER THAN ASSUMED: a `checkpoint` names the op whose landing left the
   address in its last valid state, WHOEVER AUTHORED IT** (`A: docs/decisions.md` · `A104` — *"Yes — the
   checkpoint may name an op ANOTHER attempt landed."*; `attempt-lifecycle.md §2.4` item 8 (ii) (g);
   `contract.md §5.7`; `composition-and-states.md §2.6` items 3, 8 (i) and 8 (v)).
5. **The observation that makes it PASS — with the member each observation reads:** **⟶ AND EVERY NON-NULL `checkpoint` THIS SCENARIO READS IS AN `OWED` OBSERVATION, DECLARED ONCE HERE FOR THE WHOLE WINDOW BECAUSE THE GATE-5 BLIND RUN SAW EVERY ATTEMPT IN IT READ `null`** (`live-greens.md`'s `CON-1`, `[E2E-C-15.4]`, `[E2E-C-15.8]`; `contract.md §0.1` item 5 (i), `§3`'s `OWED`-dependent clause (c)): **the per-landing pass that can record such a landing is the store-side pass `J-21` declares and is `OWED` — owner THE ARCHITECT, positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row on the store-side evaluation seam* — so this scenario's inner and outer `checkpoint` readings stand RED AT THE BUILD THE BLIND RUN DROVE AND GREEN ON NOTHING ELSE, while the scenario's own SUBJECT — one inner attempt inside an outer attempt's constraint body, the outer's op naming the inner's op — is unchanged and is read off `RollbackStep.checkpoint` on the caller's side as `null` at that build.** **AND NO DRIVE OF THIS SCENARIO MAY READ THE `null` ARM AS A FAILURE: the arm reaches a caller-side surface either way, and whether a landing left a valid state is the store-side pass's answer and not this directory's.** **the inner `K-2`'s
   returned `CommitRecord` carries `attempt`/`op`/`triggered` and its call did NOT throw `KC-7`, which is the
   member that shows the cross-address nested attempt was ADMITTED** (`CommitRecord`'s four members, `pending` among them — `kernel-surface.md §2.1` item 2, the member added at the `A108` landing pass;
   `fail-surface.md §2`'s `KC-7`'s `K-2` half; `contract.md §5.7` — THE NESTED PROCESSING'S OPS STAND IN THE NESTED PROCESSING'S OWN ENTRY, so the inner attempt's ops are read off ITS entry and never the outer attempt's); **the inner attempt's `K-3` throws `KC-5`'s form and the inner
   record `K-5` returns reads `outcome: 'failed'` with `rollback` carrying the performed steps, EVERY step
   carrying the SAME `checkpoint` value — THE `opId` OF `op2`, THE OP WHOSE LANDING LEFT THE INNER ATTEMPT'S LAST VALID STATE, read AS AN OP AND NOT AS A PAIR KEY — so the walk's stop point is read off a DECLARED MEMBER and not inferred** (`RollbackStep`'s six
   members, `checkpoint` included; `AttemptReport.rollback`; `Q-A`); **AND THE VALUE IS SINGLE-VALUED FOR THIS
   SEQUENCE, WITH ITS GOVERNING CLAUSE NAMED: `op2` IS THE ONE OP AND `null` IS NOT A SECOND READING —
   `op2` is the only op the kernel lands AT THE INNER ATTEMPT'S OWN ADDRESS `['a','b']` in this window, the
   registered set at that address standing `{a/b#c1b, a/b#c2}` when it lands, and the clause that governs a
   landing whose pair set is read is `composition-and-states.md §2.6` item 8 (i)'s own empty-pair-set and
   pinning clause, cited here for exactly these two reads: it declares that EVERY pair of a landing's set
   returning the pass arm is what pins `checkpoint` at that landing's op, and that a landing whose pass returns
   a violation arm leaves the member **UNMOVED** — so `op2` stands and NO LATER LANDING NAMES A SECOND
   CHECKPOINT** (`composition-and-states.md §2.6` item 8 (i) — cited, not restated; `DC-1`; `DC-2`; `DC-3`);
   **the performed step over `op3`'s call names
   the op the body wrote at `['a','b','c']` in its `undoneOps` member — so the union of the steps' `undoneOps` members is READABLE and not
   empty, AND THE WALK'S PERFORMED SET IS EXACTLY THE OPS CREATED AFTER THE CHECKPOINT (that one, and `op3` itself, which is the step's own `opId`) — while NEITHER THE CHECKPOINT OP NOR THE OUTER ATTEMPT'S OP APPEARS AS AN `opId` ANY STEP WAS CALLED OVER: no step's `opId` is `op2.opId`, the checkpoint op the walk stops at, even though its own address `['a','b']` is a prefix of `['a','b','c']` and a call at an ancestor address would have reached it, and none contains `op1.opId`, the outer attempt's op, which was never a member of the inner call list — so THE CHECKPOINT OP SURVIVES and the bound the
   ruling fixes is read off a declared member rather than inferred** (`RollbackStep.undoneOps`; `RollbackStep.opId`);
   **AND THE TARGET IS READ FROM THE MEMBER: `rollback`'s LAST performed step's `undoneOps` does NOT contain `op2.opId` and the member's own value DOES name `op2.opId`, so every op of the composition is accounted for by one of the two declared members — the member's value for the stop op, an `undoneOps` member for every owed op**; **and the
   OUTER `K-5` report reads `outcome: 'passed'`, `rollback: []`, and `ops`
   whose single element is `op1`, while `K-4` over the outer reference still returns the outer attempt's log**
   (`composition-and-states.md §2.6` items 2–3 and item 8 (i)–(ii), (v); `attempt-lifecycle.md §2.4` item 8 (ii) (g); `fail-surface.md §2`'s
   `KC-7`; `A: docs/decisions.md` · `A102`, `D4`).
   **AND THE OUTER—FAILURE READING, WHICH IS STEP (9)'S AND WHICH READS ITS OWN STEPS: the OUTER attempt's `K-3` throws `KC-3`'s form and the OUTER record `K-5` returns reads `outcome: 'failed'` with `rollback` carrying the outer composition's performed steps, EVERY step of THAT list carrying the SAME `checkpoint` value — `op2`'s `opId`, READ OFF THE OUTER ATTEMPT'S OWN STEPS and naming AN OP THE INNER ATTEMPT LANDED — and NO step's `opId` being that value, so the outer walk issues NO call over the foreign checkpoint op, and the outer attempt's own op is the one its call was made over.** **THE TWO READINGS ARE SEPARATED BY THEIR STEP LISTS: the inner `checkpoint` is read from the INNER attempt's `K-5` report and the outer `checkpoint` from the OUTER attempt's, and a drive that read one attempt's value off the other's steps has conflated the two attempts and not the member** (`RollbackStep.checkpoint`; `AttemptReport.rollback`; `A: docs/decisions.md` · `A104`; `contract.md §5.7`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a kernel that refuses the
   nested attempt kernel-wide, or that lets an inner failure undo an outer attempt's op merely because that
   op was another attempt's, or that walks an inner failure past the last state at which its own pairs
   passed.** **FALSIFIED BY: an inner `K-2` whose thrown form reads `KC-7` (the `K-2` refusal read
   kernel-wide instead of at its own address, `D4`); or A KERNEL WHOSE OUTER ATTEMPT REFUSES TO CARRY AN INNER ATTEMPT'S OP AS ITS `checkpoint` VALUE — a step list naming a pair key, naming `null`, or naming an op of the outer attempt's own `ops` where the op that left the state valid was the INNER attempt's, which is the reading `A104` settles and the domain `parameter-semantics.md §2.17` now prints; or ONE ATTEMPT'S `checkpoint` VALUE READ OFF THE OTHER ATTEMPT'S STEPS, which would make two step lists one list; or an inner `K-2`/`K-3` answered by a `KC` member other
   than an existing one — `KC-7`'s `K-2` half or `KC-5`, with no NINTH member minted; or a performed inner
   step whose `opId` IS the checkpoint op's — a composition that called `rollback` OVER its own stop op, which would be the walk passing the checkpoint op to the store verb and sweeping the last valid state; or an inner `undoneOps` union that names `op1.opId`, the outer attempt's op, which would be the inner failure undoing
   an op it never held and walking past its
   checkpoint; or a pass of the INNER attempt that evaluates the ancestor pair `a#c1`, or an entry of the
   inner attempt's log carrying `id: 'c1'`, which would be the inner scope widened to an ancestor's pair; or
   two inner steps carrying two different `checkpoint` values, or a `checkpoint` naming a pair
   key, a pass, or an op outside the inner attempt's own `ops`, rather than the OP whose landing left that attempt's last valid state; or a `checkpoint` reading `null` where `op2` is the op the inner attempt's own address registers and its landing's pair set pinned it — the empty-pair-set clause of `composition-and-states.md §2.6` item 8 (i) being read against THIS sequence and not against a landing the address never ran, so ONE op is the checkpoint and no other candidate stands; or AN OUTER ATTEMPT'S OWN STEP LIST naming any `checkpoint` value but the ONE op the state was last left valid by — `op2` is that one op for BOTH attempts' step lists, so the two readings are equal because they read ONE state and never because one attempt's steps were read for the other's; or an outer `K-5` report whose `rollback` names
   a step (the outer attempt never failed), or whose `ops` is `[]`, or an outer `K-4`/`K-5` that cannot reach
   the outer attempt at all (`A102`, `D1`/`D4`; `Q-A`; `Q-B`; `Q-C`).**
   **AND THE OUTER ATTEMPT WHOSE OWN STEP LIST CARRIES THE INNER ATTEMPT'S OP AS ITS `checkpoint` — THE CASE STEP (9) DRIVES AND THE CASE THE ARCHITECT HAS CONFIRMED — IS THE ONE THAT DISTINGUISHES THE WIDENED DOMAIN FROM THE PAIR-KEY READING THIS SCENARIO ONCE CARRIED** (`VC-9`; `VC-14`; `CX-9`; `A: docs/decisions.md` · `A104`).
7. **The ruling it pins:** **the architect's ruling as `A: docs/decisions.md` · `A102` — *"Clarification on 1:
   Roll back to the last state that passed all constraints."*, its `D4` limb, **with his answers at this pass' ruling landing — *"Redefine the checkpoint AS the stop op."* (`Q-A`) and *"if `a.b/y` passes constraints, then it is the last valid state when `a/x` is attempted, and `a/x` is rolled back to `a.b/y`. Single writes are checked atomically."* (`Q-B`), whose own example this scenario IS** — read with
   `composition-and-states.md §2.6` item 3, item 4's reach/stop clause and item 8 (i)–(vi), `contract.md §5.7` (`P-TP-7`, and the commit registry's clearing rule `A103` states) and `contract.md §0.1` item 5 (v)'s
   now-`ANSWERED` `RC-18` row — **AND THE WIDENED `checkpoint` DOMAIN STEP (9) READS IS THE ARCHITECT'S OWN LATER CONFIRMATION: `A: docs/decisions.md` · `A104` — *"Yes — the checkpoint may name an op ANOTHER attempt landed."* — read with `parameter-semantics.md §2.17`'s re-derived `domain` cell, whose *"an op of another attempt"* exclusion is WITHDRAWN BY NAME** (`VC-1`; `CX-1`; `CX-9`).

---

### `E2E-C-16` — the first terminal actor: a second TOP-LEVEL attempt opened at another address while the first stands `OPEN`, and the FIRST TERMINAL ACTOR, which this drive's earlier `K-3` return — the SECOND top-level processing's own — makes the failing processing (`A: docs/decisions.md` · `A107`; `A106` `Q1`)

1. **Id:** **`E2E-C-16`**.
2. **Start point:** **the app opens an attempt at `['a','b']` and, while that attempt stands `OPEN`, makes a
   SECOND TOP-LEVEL CALL at another address FROM INSIDE a listener body the first processing's own store verb
   call reaches.** **The registrations that make that listener exist and the pair the kernel must check at `['a']` stand as `K-1` acts of the same
   caller: `K-1` `register(['a'], 'cL', cL)` — the listener whose address `['a']` is a PREFIX of `['a','c']`,
   so it is TRIGGERED only by a write at `['a','c']` and its handle comes from `rA`'s own write at that address — a THIRD registration, `K-1` `register(['a'], 'cA', cA)`, holding the pair `a#cA` at the same address, whose handle `rA`'s write RETURNS TOO and whose body is THE ONE ITS OWN PASS AT `['a']` RUNS — the FIRST attempt's first pass, whose context carries `['a','b']` — with NO second in-window run for this write, the landing's own pass covering `['a','c']`'s registered pairs alone — and `K-1`
   `register(['a','c'], 'cB', cB)` — the pair the second attempt's own address holds.** **Then
   `K-1` `register(['a','b'], 'cA', cA)`, whose repair `rA` writes at `['a','c']`, a K-2
   `commit(['a','b'], '0', v1)` and the K-3 `runAttempt(commit)` over the `CommitRecord` that call returned.**
   **`cA`'s body returns `{repair: rA, message: 'a is bad'}` on the first attempt's value, and `rA`'s own write
   leaves `['a','c']` lawful — **AND `rA` RETURNS `{ok: true, op}` WITH `op` SET TO THAT WRITE'S OWN RETURNED OP, the op the attempt's `ops` carries and its re-run is evaluated against** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`) — so the first attempt's second pass PASSES.** **`cB`'s body returns `true` on the
   value the second attempt COMMITS and `{repair: rB, message: 'c is bad'}` on the value the first processing
   lands at `['a','c']` AFTERWARDS, and `rB` THROWS — the arm `fail-surface.md §2` fixes for a repair body that
   throws, arm (d), whose thrown status is `KC-4` and not `KC-3`** (`fail-surface.md §2`'s `KC-4` row; its
   `KC-3` row, whose arm is the one with NO repair registered and which this drive therefore does NOT reach).
   **And from inside `cL`'s own body — a caller body `rA`'s write's handle reaches, delivered at LAYER (b), whose handle that record carries in its `CommitRecord.pending` member and whose layer is fixed by the write that returned it and not by the listener's kind, the caller's own loop over that member being **ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NOT THE ONLY ONE** (`A: docs/decisions.md` · `A112`; the `layer (b)'s ONLY INVOKER` and `REACHED BY THAT LOOP AND BY NO OTHER INVOKER` spellings that once stood here are WITHDRAWN BY NAME, and no instant is named: THE ONE LAW IS THE ORDER, every layer-(a) delivery of a call completing before any layer-(b) body of that call runs, stated at its one home `kernel-surface.md §2.1`
   item 2 and cited here and re-spelled at no site** (`A: docs/decisions.md` · `A109` `D1`/`D2`) — **and the second
   call therefore stands after that one completed delivery, the app making it from that body: `K-2`
   `commit(['a','c'], '0', v2)`, which RETURNS a `CommitRecord`; the K-3 `runAttempt` over that record is
   invoked AFTER the first processing's write below.** **AND WHICH ACT LEAVES A HANDLE IN THAT MEMBER, DECLARED AT THIS CELL SO THIS DRIVE IS REACHABLE AT THE SEAM THE DOCUMENTED SURFACE OFFERS** (`live-greens.md`'s `CON-2`; `kernel-surface.md §2.1` item 2): **THE CALLER'S OWN `store.write` MADE UNDER A REGISTRATION — this window's own write at `['a','c']` under the `['a']` registration step (1) makes — PUTS THAT BODY'S HANDLE IN `CommitRecord.pending` AS PART OF THE WHOLE RETURNED SET, AND THAT BODY IS ONE THE SURFACE'S OWN CONSTRAINTS LAYER DOES NOT CHECK OFF — no pass of this attempt runs at its address — so its entry still stands there at `K-2`'s return for the caller's own loop, WHICH IS ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NOT THE ONLY ONE.** **TWO OTHER WRITES THIS DRIVE MAKES ARE NOT THAT ACT: `rA`'s own write at `['a','c']` stands INSIDE a kernel act, and NO `CommitRecord` is returned to the caller for it, so no `pending` member of this scenario's records carries the handle it returned — a handle the JS SURFACE'S OWN ORDERED LAYER may still run inside this call's window, which is the surface's act and not the store's, and which is what the blind run observed: THE STORE RETURNS THE HANDLES AND INVOKES NOTHING (`A: docs/decisions.md` · `A112`), so the `STORE's own delivery` spelling that once stood in this sentence IS WITHDRAWN BY NAME; and a `listen` handle's invocation is likewise the surface's layer and never the store's act.** **AND THE OBSERVATION IS READ OFF THE RECORD OF THE CALLER'S OWN WRITE ALONE: `pending` of THAT record carrying the handle of a body NO pass of this attempt checked off, and the caller's loop invoking the body off it, while at `K-2`'s own return for the first processing's record — whose write the kernel made, its handle being one `rA`'s write returned — NO pass of this attempt over `['a']` has run, so NO body of that pair stands checked off and the handle's own invocation is the surface's layer's OR the caller's loop's and never a store act.** **AND IF THE KERNEL'S BUILD DOES NOT CARRY THAT HANDLE IN THAT MEMBER, THE CELL IS RED AT THE BUILD AND GREEN ON NOTHING ELSE — a member that omits any handle of the returned set being a SIFT, which `A: docs/decisions.md` · `A112` declares UNNECESSARY AND UNLAWFUL — the duty and its owner standing at `kernel-surface.md §2.1` item 2, which this cell cites and does not re-declare.** **The second attempt's address is a DIFFERENT one, so
   nothing about the first attempt's address is re-committed: the second `K-2` RETURNS a `CommitRecord` and
   does not meet `KC-7`** (`A: docs/decisions.md` · `A106` `Q2`; `fail-surface.md §2`'s `KC-7`;
   `attempt-lifecycle.md §2.4` item 8 (ii) (a)). **AND THE LISTENER'S OWN SCOPE IS DECLARED AT ITS ONE HOME:
   `cL`'s body stands INSIDE clause (e)'s scope because clause (e)'s subject is A LISTENER BODY A STORE VERB
   CALL THE KERNEL IS RUNNING REACHES, and which of the kernel's own verbs made that call is not a term of the
   scope** (`attempt-lifecycle.md §2.4` item 8 (ii) (e) — the clause's own one-sentence answer, cited here and
   printed nowhere else; `DC-4`; `DC-5`; `VH-6`).
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — reached from TWO TOP-LEVEL call
   sites of ONE caller, the second made from inside the first call's own execution, with the store's own write
   verb reached by both commits and by `rA`'s edit.**
4. **Steps:** **(1)** `register(['a'], 'cL', cL)`, `register(['a','c'], 'cB', cB)` and `register(['a'], 'cA', cA)` → three handles are
   adopted; the registry holds `a#cL` (the pair the caller's own write of step (1b) leaves in `pending`, so the caller's loop runs it at LAYER (b)) and `a.c#cB` at `['a','c']`, and the SAME function `cA` holds the pair `a#cA` at `['a']` beside `cL` — a second pair at one address, so the store's machinery holds ONE entry there and the two pairs stand in one registry order.** **(1b) THE CALLER'S OWN WRITE — THE ACT THIS DRIVE'S DELIVERY LAYER HANGS ON, ADDED AT THE GATE-5 BLIND-RUN ADJUDICATION OF 2026-10-13 BECAUSE THE SCENARIO AS FILED LEFT NO ACT THAT PUTS A HANDLE IN `pending`** (`live-greens.md`'s `CON-2`; `kernel-surface.md §2.1` item 2): **the app itself writes at `['a','c']` through the store's own verb under the registration of step (1) — and THIS WRITE IS MADE AFTER STEP (2)'S WRITE LANDS, BECAUSE THE FIRST WRITE AT `['a']` MINTS A LEAF THERE AND ITS DESCENDANT `['a','c']` WOULD OTHERWISE BE REFUSED `WriteParentNotLink`, a fresh store holding no keys at all** (`A: docs/specs/storeroom-native/write-and-read.md §3.4`'s `W-2`/`W-3`/`W-4`; `contract.md`'s `DD-5`; `live-greens.md`'s `CON-2`) — **so `['a']` is its own link, the write lands, and the store's returned set for it carries `cL`'s handle BECAUSE THAT WRITE IS THE CALLER'S: that handle stands in THIS write's `CommitRecord.pending` and the caller's own loop over that member invokes the body, LAYER (b)'s one invoker** — **AND THE ORDER WITHIN THIS SCENARIO IS DECLARED HERE SO NO STEP IS LEFT TO A NUMBERING: EVERY STEP BELOW STANDS AFTER STEP (2)'s WRITE AND AFTER THIS WRITE, AND THE SECOND TOP-LEVEL `K-2` OF STEP (4) IS MADE FROM INSIDE THE BODY THIS WRITE'S LOOP RUNS.** **(2)** `register(['a','b'], 'cA', cA)` and `commit(['a','b'], '0', v1)` → the store's write returns `op1`; the FIRST processing's attempt stands
   `OPEN` and `['a','b']` is held — AND THIS WRITE RETURNS NO HANDLE FOR `cL`: the store's prefix selection answers a write at `['a','b']` with the registrations whose own address is a PREFIX OF THE WRITTEN ADDRESS, and `['a']` is not one of them, so that write's set carries no listener handle at all and the `pending` member THIS DRIVE READS IS STEP (1b)'s. **(3)** `runAttempt(commit)` → the first pass evaluates `a.b#cA`; `cA`'s
   body returns the repair arm, the kernel RUNS `rA`, and `rA`'s own write lands `op3` at `['a','c']` — a write
   THE KERNEL ITSELF MADE, INSIDE THE PASS, whose returned set carries `cL`'s handle AND `cA`'s, `['a']` being
   a PREFIX of the written address; **`op3`'s own landing runs the atomic evaluation at `['a','c']` over
   `a.c#cB`, which returns
   the PASS arm there, but the SECOND attempt is not yet live, so no `checkpoint` member of any attempt is
   moved by that landing** (`composition-and-states.md §2.6` item 8 (i); `kernel-surface.md §2.3` item 1) —
   so that handle is LAYER (b)'s AND the kernel invokes NO body for it in its own window, BECAUSE NO PASS OF THIS ATTEMPT OVER `['a']` RUNS FOR THIS WRITE — the landing's own atomic pass is over the pairs registered at `['a','c']`, and the ancestor pair is not one of them** (`A: docs/decisions.md` · `A107` `D1`; `A108` `D1`; `kernel-surface.md §2.2` item 2; `attempt-lifecycle.md §2.4` item 5 (iv)). **AND THE ONE READING THAT KEEPS IT FROM RUNNING TWICE IS THIS: NO pass of this attempt CHECKED THE PAIR `a#cL` OFF, so that handle stands in the returned set and in `CommitRecord.pending` with the rest of it, and the caller's own loop IS ONE INVOKER THAT RUNS IT — AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY ONE (`A: docs/decisions.md` · `A112`) — the ONE law for its order standing at its one home `kernel-surface.md §2.1` item 2 and cited here and re-spelled nowhere, the loop's own call shape being declared at that same home** (`A: docs/decisions.md` · `A109` `D1`/`D2`; `kernel-surface.md §2.1` item 2).
       **(4)** From inside `cL`'s body — reached by the caller's own loop at LAYER (b), that loop being ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NOT THE ONLY ONE (`A: docs/decisions.md` · `A112`; the `and by no other invoker` spelling that once stood here being WITHDRAWN BY NAME), its work read off the `pending` member of STEP (1b)'s RECORD — THE CALLER'S OWN WRITE'S — which is the write whose RETURNED SET carries the whole set of triggered constraints, that handle's entry leaving it only by being checked off as it passes (this cell's declaration above; `kernel-surface.md §2.1` item 2), and NOT off step (2)'s record, whose write is the kernel's own (`rA`'s write in step (3) returned that same handle by the store's prefix selection, and no pass of any attempt over `['a']` ran for it) — the app calls `commit(['a','c'], '0', v2)`, **the SECOND TOP-LEVEL call at an address that holds no live processing**

    **(5)** That `K-2` returns the store's own `op2` AND a `CommitRecord`** — the second top-level call's own return, READ AGAINST `fail-surface.md §2`'s `KC-7` REFUSAL, WHICH IT IS NOT: no attempt at `['a','c']` is live, so the call is LEGAL and RETURNS rather than throwing, AND `op2`'s landing runs the atomic evaluation over `a.c#cB`, `cB` returning `true` on the
    value that landing wrote, so the landing returns the PASS arm and pins the SECOND attempt's `checkpoint` at
    `op2` — ITS OWN COMMIT'S OP** (`fail-surface.md §2`'s `KC-7` row; `A: docs/decisions.md` · `A106` `Q2`; `kernel-surface.md §2.3` item 1; `composition-and-states.md §2.6` item 8 (i)). **AND THE FOREIGN PASS-ARM RULE IS OBSERVED HERE BY ITS OWN NAMED STEP AND NOT LEFT TO A DRIVE: the rule — A PASS-ARM FOREIGN LANDING MOVES THE HELD ATTEMPT'S `checkpoint` TO THAT LANDING'S OP, WHILE A VIOLATION ARM LEAVES IT UNMOVED — is what step (6)'s foreign landing is read against, and THE OBSERVATION IS READ OFF THE MEMBER ITSELF: THE SECOND ATTEMPT'S `checkpoint`, READ ON EVERY `RollbackStep` OF ITS OWN STEP (7) ROLLBACK, STILL NAMES `op2` AND NOTHING THE FIRST PROCESSING LANDED AFTER IT, so the drive tells a moved pin from an unmoved one by a declared member and by no inference** (`composition-and-states.md §2.6` item 8 (i)'s foreign-landing declaration — THE RULE'S ONE HOME; `A: docs/decisions.md` · `A107` `D5`).
**(6)** `cL`'s body returns the `CommitRecord` of step (5) to the first processing's own body — AN OP OF THE FIRST
   PROCESSING'S, landed by that body at `['a','c']` inside the second attempt's own live window, which the first
   processing's own `K-3` of step (8) then re-evaluates, and WHICH OF THE TWO SUBJECTS THIS CELL NAMES AS VIOLATED
   BY IT — the second attempt's own constraint, or the second attempt itself — THE CELLS BELOW DECLARE NEITHER, so
   the disjunction stands filed as an `OWED` row at `docs/pending.md` `G-10`. **(7)** Control returns to the caller, which calls `K-3` `runAttempt(that record)` — the
   step the second call's own start point places AFTER that write: **the second processing's pass evaluates
   `a.c#cB` over that later op's value, `cB` returns `{repair: rB, message: 'c is bad'}`, `rB` THROWS, and the
   second processing's `K-3` TERMINATES FIRST with `KC-4`** — arm (d), the arm `fail-surface.md §2` fixes for a
   repair body that throws, and NOT arm (c)'s `KC-3`, which requires that NO repair be registered
   (`fail-surface.md §2`'s `KC-4` row; its `KC-3` row) — **and its arm is `FAILING`-with-residue: its
   ATTEMPT-RECORD ENTRY IS REMOVED by its own terminal act and its COMMIT-REGISTRY ENTRY STANDS, holding the
   op it never undid — `op2`, THE SECOND `K-2`'S OWN COMMIT'S OP, which this attempt's own composition stops
   AT as its `checkpoint` and never issues a call over, read off the same `RollbackStep.checkpoint` member
   every step carries** (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause; `§2.4` item 7 (i);
   `composition-and-states.md §2.6` item 3; item 8 (i) — AND THE CLAIM THIS STEP ONCE CARRIED IS REPOINTED BY NAME TO THE ARM THAT YIELDS THE FORM: the partial write of `rB`'s is a form THIS arm NEVER YIELDS, because the repair body THROWS before it can return one, so the DRIVEN arm (d) carries no such form and the residue is `op2`, THE SECOND `K-2`'S OWN COMMIT'S OP, standing in the loser's own commit-registry entry, and NEVER an op of another processing's (`DC-7`).
   **(8)** The first processing's `K-3`
   **TERMINATES SECOND**: `rA` writes at `['a','c']`, the first attempt re-evaluates `a.b#cA`, which PASSES,
   and its `K-3` returns `outcome: 'passed'` with its own attempt-record entry removed and its report placed.
   **(9) AND THE DRIVE DISCRIMINATES THE RULE FROM THE LOSER'S OWN CONSTRAINT, IN THIS SCENARIO AND BY ITS OWN
   CELLS: the value that violates `a.c#cB` in step (7) is the one the FIRST PROCESSING landed at `['a','c']`
   in step (6) — an op of ANOTHER processing's, landed inside the second attempt's live window — while the
   value the SECOND attempt itself committed in step (5) PASSED `cB` at its own landing AND pinned that
   attempt's own `checkpoint`.** **So the second processing's loss is read off the ORDER — the processing
   whose own terminal act the kernel performed first — and NOT off its own constraint: a reader who found the
   loser's own pair violated by the value the loser itself committed, or its own landing returning anything but
   the PASS arm, would have found the loser's own constraint failing and would have found THIS CELL's claim
   unproved** (`A: docs/decisions.md` · `A106` `Q1`; `attempt-lifecycle.md §2.4` item 8 (ii) (1)–(2) and (4);
   `VH-7`).
5. **The observation that makes it PASS — with the DECLARED MEMBER each observation reads:** **AND LAYER (b)'s DELIVERY AND ITS MEMBER ARE READ HERE, SO THIS DRIVE CARRIES LAYER (b)'s OBSERVABLE:** the drive compares the `triggered` member of STEP (1b)'s OWN RETURNED `CommitRecord` — the record of THE CALLER'S OWN WRITE at `['a','c']` under the `['a']` registration, which is the write whose returned set carries a body's handle the caller's own loop may run as ONE invoker among the JS surface's own ordered layers (`kernel-surface.md §2.1` item 2, its `pending` clause; `A: docs/decisions.md` · `A112`) — with that SAME record's `pending` member, ONE record's members and never two records' — `cL`'s handle appearing in BOTH, because the write that returned it was THE CALLER'S and the kernel has run no body for it, while `cA`'s handle is one `rA`'s write returned and NO PASS OF THIS ATTEMPT OVER `['a']` RAN FOR IT, so the kernel invoked no body for it in its own window — AND `cA`'s handle is NOT a member of STEP (1b)'s record at all, that record being the one THE CALLER'S OWN WRITE at `['a','c']` returned and `cA`'s registration standing at `['a']` — the address the write landed at — WHOSE ENTRY THAT RETURN DID CARRY, `cA` being a pair this attempt's own `K-1` registered there and that write's landing being what step (2)'s own `K-2` write did NOT reach — and the drive reads `cL` ALONE off that record's `pending` — **AND THE OBSERVATION THAT READS THE LOOP'S CALL SHAPE IS THIS ONE CELL'S OWN LIMB, PRINTED BECAUSE IT ADDS NO SCENARIO AND NO FIFTH OBSERVATION: THE CALL IS READ OFF A FUNCTION'S OWN RECORDED ARGUMENT.** **The two registrations step (1) makes are of the two kinds the loop's own clause separates, so the ONE run of the loop delivers BOTH SHAPES and each delivery is read at its own call: `cA`'s body is the CONSTRAINT this drive's step (1) registered at `['a']` through `K-1`, so the call it receives carries THE ATTEMPT CONTEXT — its `address` member reading `['a']`, the attempt's own address the pair was registered at, and never `['a','c']`, the address the write landed at — while `cL`'s body is the PLAIN LISTENER the app registered at `['a']` through the store's own `on`/`register`, so the call IT receives carries `['a','c']`, THE OPERATION'S OWN ADDRESS, and never `['a']`, the WATCH ADDRESS that is its proper prefix.** **THE OBSERVATION IS THEREFORE THE FUNCTION'S OWN RECORDED ARGUMENT AND NOT A MEMBER OF ANY KERNEL RECORD — each body recording the argument it was handed is what makes the two call shapes distinguishable — so a drive whose bodies record no argument observes the call shape NOT AT ALL, and a delivery carrying one body's argument shape at the other body's call is this cell's falsifier** (`kernel-surface.md §2.1` item 2 — the loop's call-shape clause, ITS ONE HOME; `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 3 — the prefix test that fires the registration at the proper prefix and at the operation's own address). **AND THE ONE EXPECTATION THIS DRIVE DOES NOT ASSERT IS PRINTED AS `OWED` RATHER THAN LEFT ASSERTED (`DG-4`): that a handle a KERNEL-made write returned is observable in `triggered` and NEVER in `pending` is NOT read here, because no record the caller holds is declared to carry that handle's membership — step (2)'s write being the CALLER'S and returning `cL`'s handle alone — so the carrier is FILED at `docs/pending.md` `G-9` and the discriminating membership is asserted for NO record** — and it reads the `pending` member of the `K-2` answer as the CALLER'S OWN WORK LIST, the member its invocation loop runs cL's body off, layer (b)'s only invoker (`A109` `D2`); **AND THE DISCARD RULE'S OWN SIDE OF THAT MEMBER IS STATED WITH THE OBSERVABLE, BECAUSE A SET IS DRIVEN BY ITS ABSENCE AS WELL AS BY ITS PRESENCE: had a write of this window failed the registered constraints at its landing and been rolled back rather than repaired, its handles would stand in `triggered` and in `pending` NEVER, its bodies never being invoked by either layer** (`kernel-surface.md §2.1` item 2 — **whose throwing-arm clause is the clause that fixes what this member's un-run handles get where a `K-3` throws (`DG-5`)**; `kernel-surface.md §2.2` items 2 and 3; `attempt-lifecycle.md §2.4` item 8 (i) (5) — the discard rule's one home, whose (3) is a DIFFERENT subject, the successful-rollback predicate, and is not cited here for the discard; `A: docs/decisions.md` · `A107` `D3`; `A108` `D2`/`DF-4`; `A109` `D1`/`D2`). **the `K-2`
   answer of step (5) — `K-2`'s `CommitRecord` return, read against `fail-surface.md §2`'s `KC-7` refusal at
   the item it belongs to — shows the second open write call LEGAL at its own address; the K-3 answer and the
   K-5 `AttemptReport` of the SECOND processing (`attempt`, `outcome`, `ops`, `log`, `rollback`) show the
   failure on the processing that terminated FIRST — `outcome: 'failed'` with the `KC-4` token its own arm
   carries, arm (d), read by `fail-surface.md §1.1` item 3's same-token rule off the `outcome` entry's `state`
   as well as off the thrown form — with that report's `ops` naming an op the union of its own
   `rollback[].undoneOps` does NOT name: **the op `op2`, ITS OWN COMMIT'S OP, held by the STANDING
   COMMIT-REGISTRY ENTRY that report is read with, whose ATTEMPT-RECORD ENTRY is removed by its own terminal
   act**; **the SECOND attempt's own `checkpoint` value reads `op2` — READ OFF A DECLARED CARRIER AND NOT FROM ANY INFERENCE: the second attempt's own `K-5` report's `rollback` steps, each of which carries that attempt's ONE `RollbackStep.checkpoint`, that member being the only carrier a drive can read the value off, no declared report exposing it twice — the OP ITS OWN commit's landing pinned there
   because that landing returned the PASS arm — so the loser's own pair is read as VALID at its own
   address — and the SECOND attempt's own pass reads `op3`'s value, an op the FIRST processing landed inside
   its live window, as the violating one** (`kernel-surface.md §2.3` item 1; `composition-and-states.md §2.6`
   item 8 (i); `attempt-lifecycle.md §2.4` item 1's ninth member); **the K-3 answer of the FIRST processing
   shows `outcome: 'passed'` with its report placed; and a FRESH `K-2` at `['a','c']` after both attempts
   closed RETURNS a `CommitRecord`, showing the residue does not refuse it.** **AND THE SILENT LANDING IS READ
   OFF A DECLARED CLAUSE AND NOT INFERRED: `op3`'s own landing in step (3) runs ONE atomic evaluation at
   `['a','c']` with NO attempt live there, and a landing whose pass returns over a pair set while no attempt
   at that address stands live appends NO declared `constraint-check` or `outcome` entry, reaches NO arm of
   the closed set, and is observed by a drive ONLY through the `checkpoint` member it does or does not move —
   here it moves none** (`composition-and-states.md §2.6` item 8 (i) — WHICH ALSO CARRIES THE DECLARATION STEP (6)'S FOREIGN LIVE-ADDRESS LANDING IS READ OFF: a store verb call the kernel is running at an address ANOTHER, LIVE attempt holds pins that attempt's `checkpoint` where the landing's pass returns the PASS arm, appends NOTHING to that live attempt's message log (no `constraint-check` entry, no `outcome` entry), reaches no arm, and leaves that attempt's `ran` and `appliedRepairs` UNMOVED, those two moving only in that attempt's own repair transition — so the FIRST processing's own write at `['a','c']` in step (6) appends no entry to the SECOND attempt's log and leaves its `ran` and `appliedRepairs` empty, while its `checkpoint` stands at `op2`, moved there by ITS OWN step (5) landing, a landing whose pass returns a VIOLATION arm leaving the member UNMOVED —
   cited here and printed nowhere else; `DC-8`).**
   **THE ORDER THIS DRIVE FIXES IS THE CLAUSE'S TERM AND NOT A DETAIL OF NESTING: THE FIRST TERMINAL ACTOR IS
   THE PROCESSING WHOSE OWN TERMINAL ACT THE KERNEL PERFORMS FIRST — AND HERE IT IS THE SECOND PROCESSING ITSELF: ITS OWN `K-3` OF STEP (7) RETURNS, AND THROWS `KC-4`, BEFORE THE FIRST PROCESSING'S OWN `K-3` OF STEP (8) RETURNS, THAT RETURN BEING THE ORDER THIS DRIVE ACTUALLY RUNS AND NEVER A DEPTH.
   so this scenario and `E2E-C-15` (whose INNER processing terminates first and fails) TOGETHER DRIVE BOTH ORDERS OF ONE RULE — the winner named by the earlier RETURN and never by depth: the second `K-3`'s return precedes the first's, the second processing's own `op2` landing and its pin standing at step (5) and the FIRST processing's own write at step (6), both before it.
   AND THE TWO ORDERS ARE THE ONLY TWO THIS RULE HAS, WHICH IS WHAT MAKES THE PAIR OF DRIVES A DISCRIMINATION: THIS PAGE'S ORDER, WHOSE FIRST TERMINAL ACTOR IS THE SECOND PROCESSING, AND `E2E-C-15`'S, WHOSE FIRST TERMINAL ACTOR IS ITS INNER PROCESSING** (`attempt-lifecycle.md §2.4`
   item 8 (ii) (1)–(2) and item 8 (ii) (4); `A: docs/decisions.md` · `A106` `Q1`).
6. **The fail-state it distinguishes — with the state that would FALSIFY it:** **the second call at a
   different address RETURNS and the FIRST TERMINAL ACTOR fails** — **FALSIFIED BY: a `K-2` from inside the
   first processing's own execution whose thrown form reads `KC-7` (the refusal read kernel-wide, or read off
   any other live processing rather than off the address's own live attempt); or a failure that lands on the
   INNER processing because it is the deeper one, or on the attempt opened LAST, or on the attempt whose
   constraint is at the shorter address — the loser read off DEPTH or off opening order rather than off the
   terminal act the kernel performed first, which would make this scenario's outcome and `E2E-C-15`'s the same
   rule chosen by nesting; or a losing processing's own `K-5` report carrying no residue, or its `ops` named
   entire by its own `rollback[].undoneOps` (`FAILING`-with-a-successful-rollback where the arm is
   `FAILING`-with-residue); or a fresh `K-2` at the losing address whose thrown form reads `KC-7` — the
   residue read as an open attempt-record entry, which `A106` `Q3` withdraws; or the FIRST processing's own
   `K-3` returning any arm but `outcome: 'passed'`, or its own entry left standing; or a `K-4`/`K-5` that
   cannot reach the losing processing at all (`A106` `Q1`; `VG-1`; `VG-3`; `VG-4`; `DB-1`; `DB-7`).**
   **AND FOUR FALSIFIERS OF THIS PASS'S OWN TWO DECLARATIONS JOIN THAT LIST, SO THE DRIVE'S DISCRIMINATION AND
   ITS SILENT LANDING ARE BOTH CHECKABLE: the loser's own `checkpoint` member reading any op but `op2`, or its
   own landing at `op2` returning anything but the PASS arm — the loser's own pair failing on the value the
   loser itself committed, which would leave the loss read as the loser's own constraint's (`VH-7`); the
   violating value in step (7) named as one the SECOND processing itself landed (`VH-7`); the loser's arm read
   as arm (c)'s `KC-3`, or its thrown status read as any token but `KC-4` — a repair body that throws being arm
   (d) and arm (c) requiring that NO repair be registered (`DC-6`); or the residue named as anything but the
   SECOND `K-2`'s own commit's op standing in the loser's own commit-registry entry — AND ON THIS ARM THE COMMIT-REGISTRY OP NAMED IS THE WHOLE POSSIBLE RESIDUE, a partial write of `rB`'s
   leaving a still-owed op being a form NO declared repair result produces (`DC-7`); or `op3`'s landing in step
   (3) appending a declared `constraint-check` or `outcome` entry or reaching any arm with no attempt live at
   `['a','c']` (`DC-8`).** **AND TWO FALSIFIERS OF THE `A108` LANDING PASS'S OWN TWO DECLARATIONS JOIN THE LIST: a `pending` member on a returned `CommitRecord` that OMITS a handle the CALLER's own write returned or CARRIES one the kernel had already run from ITS OWN write in-window, or CARRIES a handle of a write that failed the registered constraints at its landing and was rolled back (the discard reaching only the triggers not yet invoked, a body already run never being un-run) — **READ AT ITS OWN INSTANT, PER THE GATE-4 RECONCILIATION PASS OF 2026-10-13: what is forbidden is a member STILL CARRYING A HANDLE OF THE FAILED WRITE once that write's attempt has reached its failing terminal arm, where those handles are gone by the DISCARD (`attempt-lifecycle.md §2.4` item 8 (i) (5), its one home) — AND NEVER a member read at `K-2`'s own return, where no discard and no check-off has run and the whole set stands, nor an entry of ANOTHER write, which the discard never reaches** (`A: docs/decisions.md` · `A112`); or the delivery of step (3) labelled by a LISTENER'S KIND rather than by the write that returned the handle — a pair registered at the ANCESTOR address `['a']` with no pass of this attempt over `['a']` run for `rA`'s kernel-made write, which is the delivery this clause's scope FORBIDS and which is where the handle `rA`'s write returned for it belongs instead, `cL`'s off the CALLER's write at `['a','b']` — which would move `cL`'s delivery to layer (a) and break the re-entrancy this drive's whole order stands on** (`A: docs/decisions.md` · `A108` `D1`/`D2`; `kernel-surface.md §2.1` item 2; `kernel-surface.md §2.2` items 2 and 3; `attempt-lifecycle.md §2.4` item 8 (i) (5) — the discard rule's home, the (3) that once stood beside it being the SUCCESSFUL-ROLLBACK PREDICATE's and not the discard's).**
7. **The ruling it pins:** **`A: docs/decisions.md` · `A106` — the architect's `Q1` *"The FIRST to terminate
   fails (the inner) — `E2E-C-15` stands."* and his `Q2` *"It is legal — the arm is reachable and must be
   driven."*, the `E2E-C-16` drive `Q2` requires, read with `Q3` *"The COMMIT-REGISTRY entry stands and a
   later `K-2` is free."* — and the clause it drives is `attempt-lifecycle.md §2.4` item 8 (ii)'s head and
   items (1)–(5), whose reading of the FIRST TERMINAL ACTOR is one term of the rule and never a sentence about
   any one nested case, with `KC-7`'s `K-2` site refusing a second call ONLY WHILE THE ATTEMPT IS LIVE
   (`fail-surface.md §2`; `composition-and-states.md §2.7` item 12 (ii)) — read with `contract.md §5.7` for
   the registry key this scenario's residue is read under** (`VG-1`; `VG-2`; `VG-3`; `VG-4`; `DB-1`; `DB-2`;
   `DB-7`; `G-7` discharged).

## `A112` DELIVERY-MODEL RE-SPELL, 2026-10-13

**THE RULING THIS SECTION RECORDS IS `A: docs/decisions.md` · `A112` — the architect's own words of 2026-10-13: *"The Rust store returns the handles, and then the JS surface functions run first the constraints and then, after all constraints pass, any other listeners before returning to the calling process. On a write, all constraints need to be run again anyway so all triggered constraints need to be run, sifting pending out of the set is not needed. Write the entire returned set of triggered constraints as pending and check off as they pass. Likewise, all listeners are not run until the constraints pass, so all listeners are pending on every write."* — AND THIS SECTION NAMES THE SITES THIS PART RE-SPELLED FOR IT, AND RE-DERIVES ITS TWO DELIVERY-LAYER ROWS' EXPECTED OBSERVATIONS. It restates no standing scenario and moves no figure.**

1. **`E2E-C-16`, ITS START-POINT CELL (2).** **WHAT MOVED: the invoker's rank, and the source of an in-window invocation.** **IT STOOD:** *"the caller's own loop … being layer (b)'s ONLY INVOKER"*, *"the body is REACHED BY THAT LOOP AND BY NO OTHER INVOKER"*, *"that loop is LAYER (b)'s ONE INVOKER"* and *"the caller's own loop IS THE ONE INVOKER that runs it"*. **IT STANDS NOW:** the caller's own loop is **ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY ONE** (`A112`); **the store returns the handles and invokes nothing**, so **the invocation the blind run observed inside the write's own window is the SURFACE'S CONSTRAINTS LAYER and NOT a store act** — the `STORE's own delivery` spelling is **WITHDRAWN BY NAME, and neither it nor an owed `pending` member on the store's own `write` return is a package defect**; and the step's own reachability reading is re-spelled at its terms: **the caller's write's whole returned set stands in `pending`, no pass of this attempt checks the ancestor pair `a#cL` off, and that entry therefore stands there at `K-2`'s return for the caller's own loop to run as one invoker among the surface's layers.**
2. **`E2E-C-16`, ITS STEP (3) AND ITS STEP (4) LIMBS.** **WHAT MOVED: the same rank, at the two sites that read layer (b)'s work.** **IT STOOD:** *"the caller's own loop IS THE ONE INVOKER that runs it"* and *"that handle … IS THE ONE INVOKER"*. **IT STANDS NOW:** **NO pass of this attempt CHECKED THE PAIR OFF, so the handle stands in the returned set and in `pending` with the rest of it, and the caller's own loop runs it as ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY ONE** — **no body running twice WITHIN ONE LAYER, AND ONLY THAT IS WHAT THESE LIMBS FIX** — for the handle this cell's own loop delivers is delivered at NO OTHER LAYER of this attempt, its pair being one no pass checks off (`§2.1` item 2's `pending` clause), so the loop's one invocation IS that handle's whole delivery; **a second invocation of a handle ACROSS the two layers where each layer runs it once is LAWFUL and is NOT the double run this reading forbids — the sentence *"NO HANDLE IS DELIVERED TWICE"* is ruled PER LAYER, each layer carrying the count once (`kernel-surface.md §2.1` item 3, the architect's ruling of 2026-10-16, landed at that clause and at its item `(g)`) — the per-layer count being the reading a drive asserts, and the two-layer sum being no count of that clause** — **and the order law they cite (`kernel-surface.md §2.1` item 2) is unmoved.**
3. **`E2E-C-16`, ITS OBSERVATION CELL (5) — RE-DERIVED, AND THE DRIVE'S READING IS KEPT.** **WHAT MOVED: the sentence naming *"the one act that leaves a body's handle standing for the caller's own loop"*, and the ground the member is read on.** **IT STANDS NOW:** **the record compared is still STEP (1b)'s own `CommitRecord` and its `pending` member — ONE record's members and never two records' — and the expected observation is still `cL`'s handle appearing in BOTH the record's `triggered` and its `pending`, while `cA`'s handle is not a member of that record at all**; **what is re-derived is WHY: `pending` is the KERNEL's member, sourced from the whole set the store's return carries, with each entry leaving it ONLY by being checked off as it passes (`A112`) — so `cL`, whose pair NO pass of this attempt checks off, is still there at `K-2`'s return, and the caller's own loop reaching its body is ONE invoker among the surface's layers.** **THE OTHER MEMBERS THIS CELL READS — the `triggered`/`pending` extent comparison, the call-shape limb and the two registrations' two kinds — stand BYTE-FOR-BYTE, and the cell's own two-kinds call-shape limb is unmoved by the ruling.**
4. **`E2E-C-16`, ITS FALSIFIER CELL (6).** **WHAT MOVED: nothing of its subjects; the sifted-subset reading is added to it.** **IT STANDS NOW:** **the same falsifiers** — a handle read as layer (a)'s that stands for a write in the kernel's window, a handle carried by a write that failed the registered constraints and was rolled back (**the discard rule's extent unmoved: a body already run is never un-run, so the discard reaches only the triggers not yet invoked — while the set it reaches is the WHOLE returned set and not a sifted subset**), and a delivery labelled by a LISTENER'S KIND rather than by the write that returned the handle — **read with `A112`: a `pending` member that OMITS any handle of the set the write returned is a SIFT and is UNNECESSARY AND UNLAWFUL, and a listener read as *"already run"* is no ground for absenting it from a write's set, because every listener is `pending` on every write.**
5. **`E2E-C-16`'S HEAD, ITS `A107`/`A106` CITATION AND ITS REMAINING CELLS (3), (4) AND (7).** **WHAT MOVED: nothing.** **The scenario's identifier, its start point's registration set, its seven cells, the first-terminal-actor rule it drives (`attempt-lifecycle.md §2.4` item 8 (ii) (1)–(2), (4)), the `KC-4` arm it reads, the `A110` repair return it spells and its `A107`/`A106` citations all stand BYTE-FOR-BYTE** — **`A112` moves neither `A106`'s terminal-actor rule nor `A107`'s write-author predicate, and no cell of that scenario is renumbered or added to.**
6. **`E2E-C-10`, ITS CELL (7).** **WHAT MOVED: nothing of its five compared member groups or its falsifier; the delivery model is added to what the cell pins.** **IT STANDS NOW:** the invocation its two windows observe is **the JS surface's own ordered layer and not a store act** — the triggered constraints first, each entry checked off as it passes, the other listeners once every constraint has passed, the calling process receiving the call only after both — with **`docs/specs/storeroom-js/contract.md §2.6`** (*"evaluate constraints AFTER a `write` returns"*) **left exactly as it stands**, and **cells (1)–(6) of that scenario untouched.**
7. **THE ROWS AND CELLS OF THIS PART LEFT UNTOUCHED BY THIS PASS, WITH THE REASON.** **`E2E-C-9`, `E2E-C-11`, `E2E-C-12`, `E2E-C-13`, `E2E-C-14` and `E2E-C-15` carry no term the ruling moves** — their subjects are the compacted floor, the applied-repair marker's scope, three refused registrations, two store codes at caller verb calls, an unknown attempt reference and the cross-address checkpoint — and **not one of their steps, observations or falsifiers reads a `pending` member, a listener status, a filter or a subset** — so **no cell of theirs is re-spelled and their expected observations stand BYTE-FOR-BYTE.** **AND NO FIGURE OF THIS PART MOVES: its `8` scenarios (`E2E-C-9` … `E2E-C-16`), the `7` cells each, the battery's `16` (`8 + 8 = 16` ✓), the `112` cells (`16 × 7 = 112` ✓) and the `5` repair-return windows and `5` sites this part carries are all UNMOVED, and this section adds no scenario, no cell and no census.**

**END OF THE `A112` DELIVERY-MODEL RE-SPELL SECTION.**

---

