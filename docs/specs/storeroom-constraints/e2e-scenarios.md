# `e2e-scenarios` — the unit's own end-to-end battery (`U-STOREROOM-CONSTRAINTS`): `16` scenarios, each carrying its start point, the surface it drives, its steps, the observation that makes it PASS, the fail-state it distinguishes and the ruling it pins

**KIND: `view`.** **This part DECLARES NOTHING the unit's contract does not already carry** — **every
scenario below is the CONTRACT's own clause put into a sequence, every expected observation cites the clause
it is derived from AND NAMES THE DECLARED MEMBER IT READS, and NO scenario invents a behaviour.** **It authors
NO test code, asserts NO result (its first line states it contains no executable tests), and derives from
`docs/specs/storeroom-constraints/contract.md` and the filing's rulings ONLY — never from any implementation,
and no implementation of this unit exists** (`R: §11.6` — the gate-2 readiness block's per-part inheritance;
`[T: this part's own scope, stated so it is not read as a test suite | CONTRACT]`).

**AND THE ONE THING THIS DOCUMENT IS NOT:** **it is not the unit's red set.** **The red set is a gate-3
delegation owned by `§B.5`'s declared owner, it carries assertions, and it is derived from the contract by
the pass that owns it — not here.** **A scenario below becomes an executable case only when a TestWriter
turns it, and the TestWriter asserts; this document only DECLARES.**

**⟶ PROVENANCE MOVED 2026-10-13 (the supervisor's applier act, the volume remedy): the per-pass notes that stood here are BYTE-EXACT at `archive/spec-history/2026-10-13-e2e-and-respelling-provenance.md §5`. NO RULE MOVED: every scenario, cell and census figure stays live in this document.**

**⟶ AND THE REPAIR RETURN SHAPE EVERY DRIVE BELOW READS IS `{ok, message, op}` — THE REPAIR-OP SEAM `A: docs/decisions.md` · `A110` RULES, ITS ONE HOME BEING `parameter-semantics.md §2.7`:** **`op` is the op the repair's own edit landed — the store's own `write` return's value — REQUIRED IFF `ok === true` and ABSENT where it is `false`, the kernel reading it off that return and nowhere else, with the no-second-route clause read at that row's `observable` cell and cited here.** **AND EVERY DRIVE WINDOW WHOSE REPAIR BODY RETURNS A VALUE NOW SPELLS THAT RETURN: THE BATTERY'S `12` REPAIR-RETURN SITES ON `11` WINDOWS — `7 + 5 = 12` ✓ sites and `6 + 5 = 11` ✓ windows. THIS FILE'S `6` WINDOWS AND `7` SITES: `E2E-C-2` `1` + `E2E-C-3` `1` + `E2E-C-4` `1` + `E2E-C-5`'s `3` windows `4` = `7` ✓, `E2E-C-5`'s `(α)` and `(β)` carrying `1` each and its `(γ)` carrying `2`.** **`e2e-scenarios-b.md`'S `5` WINDOWS AND `5` SITES: `E2E-C-9` `1` + `E2E-C-11` `2` + `E2E-C-15` `1` + `E2E-C-16` `1` = `5` ✓, `E2E-C-11`'s two being its two attempts and `E2E-C-16`'s one being `rA`'s own body.** **AND EVERY SITE IS COUNTED AT ITS OWN BODY: a window whose repair's return is read twice — at arm `(b)` and at the re-run — is ONE site and not two, and a window with NO repair at all is counted nowhere** (`E2E-C-1`, `-C-6`, `-C-7`, `-C-8`, `-C-10`, `-C-12`, `-C-14` carry no repair body and therefore no repair-return site). **AND THE BATTERY'S `16` SCENARIOS CLOSE ON THREE TERMS AT THIS LINE, SO NO SCENARIO IS LEFT BETWEEN THEM: `8` CARRY REPAIR-RETURN SITES, `7` CARRY NO REPAIR BODY AT ALL, AND `1` — `e2e-scenarios-b.md`'s `E2E-C-13` — CARRIES A REPAIR BODY THAT THREW AT ITS OWN VERB CALL AND SO REACHED NO RETURN: `8 + 7 + 1 = 16` ✓.** **⟶ RE-DERIVED AT THE GATE-5 BLIND-RUN ADJUDICATION OF 2026-10-13 (`role_spec_writer`), WHICH CORRECTS THIS LINE'S TWO SCENARIO SETS AT THEIR BYTES AND MOVES NO FIGURE: as this clause was filed, `E2E-C-9` stood IN TWO OF THE THREE GROUPS AT ONCE and `E2E-C-10` STOOD IN NONE — which is what the term list two sentences above contradicts, since `E2E-C-9`'s own drive carries NO repair body (`e2e-scenarios-b.md`'s `E2E-C-9`) while `E2E-C-10`'s listener callback RETURNS `{repair: …}` (`e2e-scenarios-b.md`'s `E2E-C-10` step (2)). THE TWO SETS ARE THEREFORE READ AS `E2E-C-2`, `-C-3`, `-C-4`, `-C-5`, `-C-9`, `-C-11`, `-C-15`, `-C-16` CARRYING REPAIR-RETURN SITES AND `E2E-C-1`, `-C-6`, `-C-7`, `-C-8`, `-C-10`, `-C-12`, `-C-14` CARRYING NO REPAIR BODY, so the three terms read `8 + 7 + 1 = 16` ✓ AND THE SITES AND WINDOWS READ `12` ON `11` — `7 + 5 = 12` ✓ sites, `6 + 5 = 11` ✓ windows — with both of those terms unmoved by this correction. **AND THE SPLIT STANDS RE-DERIVED AT THE SEAM `contract.md §0`'s `e2e-scenarios-b` map row PRINTS: `E2E-C-1` … `E2E-C-8` at THIS document (`8`) and `E2E-C-9` … `E2E-C-16` at that part (`8`), `8 + 8 = 16` ✓ — so `E2E-C-9`'s membership in the no-repair set and `E2E-C-10`'s in the repair-site set are read ACROSS the two carriers and neither set is a per-document count.** **AND A DRIVE WINDOW WHOSE REPAIR CARRIES NO SUCCESS FORM SAYS SO BY NAME, SO ITS ABSENT `op` IS READ AS THE FAILURE ARM'S OWN DECLARED FORM AND NEVER AS A MISSING MEMBER** (`E2E-C-4` here, whose repair RETURNS `{ok: false, message}` with its edit not made; `e2e-scenarios-b.md`'s `E2E-C-13` and its `E2E-C-16`'s `rB`, each of which THREW at its own verb call and reached no return at all).

**THIS DOCUMENT CONTAINS NO EXECUTABLE TESTS.** **Not one line of this file is a test, a drive, an assertion,
a fixture or a command: the file states, for each scenario, WHAT a drive would do and WHAT its observation
would read, and it names the clause each observation is derived from. `0` test code · `0` assertions · `0`
fixtures · `0` commands are authored here** (`[T: this document's own first-and-foremost statement, so it is
never read as the red set | CONTRACT]`).





---

## §1. THE DOCUMENT'S OWN RULES, AND THE CENSUS THEY CLOSE

1. **EVERY SCENARIO STARTS FROM REAL USER INPUT OR ANOTHER EXTERNAL EVENT AND RUNS TO THE FINAL RESOLVED
   STATE.** **A scenario that starts from an internal seam — a registry entry placed by hand, a log entry
   appended by hand, an attempt record read mid-flight as its start state — is NOT a lawful scenario; and a
   scenario that STOPS before the settled end state — the write landed but no outcome resolved, the rollback
   composed but no report returned — is NOT a lawful scenario either.** **So every scenario below names a
   START POINT that is a caller's own act at the store's or the kernel's declared surface, and an END STATE
   that is the FINAL RESOLVED one: for a success, the returned `AttemptReport` with the attempt's registry
   entry gone; for a failure, the thrown kernel form with the store's state read back through the store's own
   verb and the registry entry gone** (`[T: the topology's start/end-point clause, stated here as this
   document's own rule | CONTRACT]`).
2. **EVERY SCENARIO NAMES, IN ITS OWN CELLS, THE TWO STATES THAT MAKE IT REVIEWABLE IN ITS OWN RIGHT:** **the
   `the observation that makes it PASS` cell, which names the DECLARED MEMBER each observation reads, and the
   `the fail-state it distinguishes` cell, which states THE STATE THAT WOULD FALSIFY IT — i.e. the state a
   WRONG implementation would produce in this scenario's place.** **A scenario whose falsifier cannot be stated
   distinguishes nothing and is not a scenario** (`CC-18`; `CC-28`; `CC-29`; `CC-30`).
3. **THE SURFACE A SCENARIO DRIVES IS ONE OF THREE, AND EACH IS NAMED BY ITS OWN PATH AND `§`:**
   **(i) THE KERNEL'S SURFACE** — `K-1`…`K-5`, `docs/specs/storeroom-constraints/kernel-surface.md §2.1`;
   **(ii) THE STORE'S OWN VERBS** — the write, `delete`, `rollback` and `listen` as the unit's
   contract cites them, `docs/specs/storeroom-native/write-and-read.md §3` · `§4` · `§6.3` · `§6.5` —
   **AND `unlisten` IS DELIBERATELY NOT ONE OF THEM, SO THIS LIST IS NOT READ AS NAMING A VERB NO SCENARIO
   MAY DRIVE** (`RC-15`): **the kernel declares NO `unregister` and calls the store's `unlisten` never, an
   entry the app removes through `unlisten` leaves a live registry pair whose state this unit declares NO arm
   for, and NO scenario below drives `unlisten`** (`kernel-surface.md §2.1` item 1's permanent-entry clause
   and its third named consequence).
   **(iii) THE EXTERNAL PATH THE APP USES** — the JS package's crossing,
   `docs/specs/storeroom-js/contract.md §2.2` · `§2.6` · `§2.10`. **A scenario's `the surface it drives`
   cell names exactly one of these plus the item it calls.**
4. **THE DERIVATION RULE.** **Each scenario's `the observation that makes it PASS` is DERIVABLE FROM THE
   CONTRACT ALONE, and it cites the clause it is derived from.** **Where an expectation could not be derived
   it is NOT INVENTED: it is recorded in `§3`'s `OWED` list with its owner and with the ruling that would
   close it.** **AND AN EXPECTATION THAT IS WRITTEN CARRIES NO `INFERRED` CELL AT ALL IN THIS DOCUMENT'S
   REPAIRED FORM: the two the first writing marked `INFERRED` are now DERIVED (`E2E-C-10`) or CLOSED BY A
   DECLARED REFUSAL (`E2E-C-14`), so the document carries `0` `INFERRED` cells and `2` lawful `OWED` entries**
   (`CC-32`).
5. **THE BOUNDARY EVERY SCENARIO RESPECTS, STATED ONCE SO NO STEP BREACHES IT:** **no step claims a
   store-side order the store does not expose** (`A: docs/specs/storeroom-native/contract.md §6.5` item 5 —
   *"NO ORDER IS DECLARED FOR THE LIST"*), **no step claims a reach past a compacted base**
   (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 2 — the all-or-nothing floor), **and no step
   claims a store-side change this unit's rulings do not supply**
   (`P: §A.1`'s closing clause — *"NOTHING IN THESE ANSWERS MOVES A STORE-SIDE CONTRACT BY ITSELF"*).
   **A scenario that would need one of the three stops at `OWED` rather than at an invented step.**
6. **AND EVERY SCENARIO'S CALLER-SIDE WINDOW IS SINGLE-CALLER, DECLARED BECAUSE THE STORE-SIDE WINDOW IS
   `OWED`** (`CC-30`; `attempt-lifecycle.md §2.4` item 6): **no scenario below drives a store write or delete
   from a SECOND caller while an attempt is open, and none asserts anything about such a write appearing in a
   `triggered` set, being reached by the composition, or being seen by the evaluation.** **That window is
   `EO-1`'s and it is `OWED` at `§3` — AND `A106` `Q2` NARROWS ITS SUBJECT WITHOUT TOUCHING IT: a SECOND
   TOP-LEVEL `K-2` AT A DIFFERENT ADDRESS WHILE ANOTHER ATTEMPT STANDS `OPEN` IS LEGAL AND REACHABLE (it
   RETURNS a `CommitRecord`, and the refusal `KC-7` meets two calls at ONE address only), SO IT IS NOT THIS
   WINDOW'S SUBJECT AND IS DRIVEN BY `E2E-C-16` BELOW; what stays this window's is ONLY the STORE-SIDE write
   or delete landing from another caller** (`A: docs/decisions.md` · `A106` `Q2`; `fail-surface.md §2`'s
   `KC-7`). **AND ONE SCENARIO DRIVES TWO OF THIS UNIT'S OWN ATTEMPTS CONCURRENTLY,
   STATED HERE SO THE RULE ABOVE IS NOT READ MORE WIDELY THAN ITS OWN TERMS** (`D4`): **`E2E-C-15` stands a
   SECOND KERNEL ATTEMPT at an address INSIDE a live ancestor attempt's subtree — two attempts and ONE caller,
   and no second caller at all** — **which is the case the architect's ruling admits, and it does not touch
   `EO-1`'s subject, which is a store write or delete landing from a caller the kernel does not hold**
   (`attempt-lifecycle.md §2.4` item 8 (ii) (g); `composition-and-states.md §2.6` item 8 (v)).

**THE CENSUS THIS DOCUMENT CLOSES ON, PRINTED WITH ITS TERMS.** **`16` scenarios (`E2E-C-1`…`E2E-C-16`) ×
`7` mandatory cells = `112` cells, and every one of the `112` is present — the seventh cell included, in all
`16` scenarios — the terms being `15 + 1 = 16` ✓ and `16 × 7 = 112` ✓** (`CC-29`; `A: docs/decisions.md` ·
`A102`; `A106`) **AND NO SUPERSEDED FIGURE STANDS HERE — THE `14 + 1 = 15` AND THE `15 × 7 = 105` ARE NOT REPRINTED: the note that records their withdrawal is MOVED WHOLE to `archive/spec-history/2026-10-13-e2e-and-respelling-provenance.md §2`** (`VH-2`; `RCA-8(g)`). **`2` entries stand in this document's
`OWED` list (`EO-1`, `EO-2`), each with an owner and a positive revisit condition; `0` `INFERRED` expectations
stand; `0` scenarios start at an internal seam; `0` scenarios stop before the resolved end state; `0`
scenarios lack a stated falsifier; `0` store-side orders are claimed; `0` reaches are claimed past a compacted
base; `0` test assertions are authored** (`[T: this document's own census, printed with its terms | CENSUS]`).

---

## §2. THE BATTERY — `16` scenarios, each with its seven cells, of which THIS document carries `8` (`E2E-C-1` … `E2E-C-8`) and its CARRIER PART `e2e-scenarios-b.md` carries the other `8` (`E2E-C-9` … `E2E-C-16`), `8 + 8 = 16` ✓

**THE CELL SCHEMA, STATED ONCE SO EVERY SCENARIO IS READ THE SAME WAY.** **Each scenario carries exactly
seven cells, in this order:** **(1) the id** · **(2) its START POINT** · **(3) the surface it drives** ·
**(4) its STEPS** · **(5) the observation that makes it PASS — with the DECLARED MEMBER each observation
reads** · **(6) the fail-state it distinguishes — with the state that would FALSIFY it** · **(7) the ruling it
pins.** **THE SEVENTH CELL IS NOT OPTIONAL AND IS NOT A CITATION OF THE SIXTH: it names the RULING — a
`docs/decisions.md` row, a `P: §n` clause, or the contract clause — the scenario's outcome is pinned to, so a
drive's verdict is traceable past the scenario to the authority that fixes it.**

### `E2E-C-1` — the happy path: one constraint passes and the attempt resolves

1. **Id:** **`E2E-C-1`**.
2. **Start point:** **the app calls `K-1` `register(['a'], 'x', c1)` with a constraint whose body returns
   `true`, and then `K-2` `commit(['a'], '0', value)`** — both caller's own acts at the kernel's declared
   surface. **The address `['a']` and the tier `'0'` are the store's own domain and the store admits both.**
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` and the store's own write verb
   `K-2` composes** (`kernel-surface.md §2.1`).
4. **Steps:** **(1)** `register(['a'], 'x', c1)` → the store's handle is adopted and returned; the registry
   holds the pair `1:a#x`. **(2)** `commit(['a'], '0', v)` → the store's write lands, `CommitRecord` carries
   `{attempt, op, triggered}`, and the attempt's address is held. **(3)** `runAttempt(commit)` — the `CommitRecord` the call above returned →
   `c1` is invoked with `AttemptContext {address: ['a'], tier: '0', value: v, attempt, op}` and returns
   `true`. **(4)** the attempt reaches the success arm.
5. **The observation that makes it PASS — with the member each observation reads:** **`K-1`'s return is a
   handle; `CommitRecord.attempt` and `CommitRecord.op` are present; `K-3`'s returned `AttemptReport` reads
   `outcome: 'passed'` (`AttemptReport.outcome`), `ops` carries EXACTLY the write's op (`AttemptReport.ops`,
   length `1`, `ops[0].opId === CommitRecord.op.opId`), and `rollback` is `[]`
   (`AttemptReport.rollback`); and the returned `AttemptReport.log` carries EXACTLY TWO entries in `seq`
   order — `seq: 1` with `kind: 'constraint-check'`, `id: 'x'`, `state: null`, and `seq: 2` with
   `kind: 'commit'`, `id: null`, `state: null`** (`kernel-surface.md §2.5` item 1's kind table and
   `attempt-lifecycle.md §2.4` item 4's arm `(a)`; `contract.md §5.4`, `P-SM-4`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a pass that appends no
   `constraint-check` entry (a constraint never invoked), or that carries `outcome: 'passed'` while `ops`
   holds an op no verb returned, or whose `seq` is not `1, 2`, or that leaves the address held.** **The
   observation that makes it PASS is the OPPOSITE of that: one `check` entry and one `commit` entry, `ops`
   of length `1`, and the attempt's registry entry gone.** **FALSIFIED BY: a `K-3` whose returned report
   carries `outcome: 'passed'` while its `log` holds no `constraint-check` entry — i.e. the constraint was
   never invoked — or while `CommitRecord.attempt` names an address a fresh `K-2` can still refuse with
   `KC-7`.**
7. **The ruling it pins:** **`P: §1`** — *"A constraint is a specialized listener"* — **READ THROUGH THE
   WITHDRAWAL OF ITS ORDERING HALF: the clause this cell once quoted as *"runs before other listeners"* is
   WITHDRAWN BY NAME at its one home, `attempt-lifecycle.md §2.4` item 5 (iii), together with the
   arrangement that would have made it reachable, so what this cell pins is the SAME passage read with THAT
   PART'S declared ordering rule — the order between the constraint pass and the caller's own delivery of
   the attempt's pending handles, read off the log's `seq` and off the `outcome` entry** (`P: §1`;
   `attempt-lifecycle.md §2.4` item 5 (iii) and (iv); `P-SM-5`) **— AND THAT RULE'S OWN DELIVERY TERM IS RE-SPELLED AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`A: docs/decisions.md` · `A112`): THE STORE RETURNS THE HANDLES AND INVOKES NOTHING, AND THE INVOCATION THE CALLER OBSERVES IS THE JS SURFACE'S OWN ORDERED LAYER — THE TRIGGERED CONSTRAINTS FIRST, EACH ENTRY CHECKED OFF AS IT PASSES, AND, ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, BEFORE RETURNING TO THE CALLING PROCESS — so the caller's own loop is ONE INVOKER AMONG THE SURFACE'S LAYERS AND NOT THE ONLY ONE, while what this cell pins — the constraint pass completing before the caller disposes of the attempt's handle set, and the log's own `seq` order — STANDS BYTE-FOR-BYTE** — read with
   **`P: §B.6`** (*"THE CALLER'S OWN MESSAGE"*, the attempt's own shapes caller-side) and the transition
   table's arm `(a)` at `attempt-lifecycle.md §2.4` item 4.

### `E2E-C-2` — a two-op failing attempt: the unrepaired violation fails it and the composition rolls both ops back

1. **Id:** **`E2E-C-2`**.
2. **Start point:** **the app registers THREE constraints and then commits**: `K-1`
   `register(['a'], 'x', c1)` where `c1` returns `{message: 'a must be small'}` when the value at `['a']` is
   too large and `true` otherwise — **its pair `1:a#x` carries NO repair, and `c1` PASSES on `v` and is VIOLATED
   by the value `r2` writes**; `K-1` `register(['a'], 'y', c2)` where `c2`'s body returns
   `{repair: r2, message: 'y is written by r2'}` and `r2` ISSUES A WRITE of a lawful value at `['a']` through
   the caller's own store write verb **and RETURNS `{ok: true, op}` with its `op` set to that write's own returned op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`); `K-1` `register(['a'], 'z', c3)` where `c3` returns `true` on every
   value this window writes. **Then `K-2` `commit(['a'], '0', v)` with `v` violating `c2` and NOT `c1`.**
   **AND THE WINDOW IS SINGLE-VIOLATION BY CONSTRUCTION, DECIDED HERE BECAUSE THE ARM'S OWN PREDICATE IS
   *"THE FIRST EVALUATING PAIR WHOSE OUTCOME IS A VIOLATION"*** (`RC-11`; `attempt-lifecycle.md §2.4` item 5
   (ii)): **a first pass in which `1:a#x` were violated AT ITS FIRST EVALUATION would fail the attempt at arm `(c)` — the pair NOT IN `ran` then, and NO repair registered for it — before `c2` ever
   ran, so the window that drives a two-op failing attempt is one whose FIRST violation is the repairable
   pair's.**
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3`, `K-4` — with the store's own write verb
   reached twice: once by `K-2` and once by `r2`'s own edit** (`kernel-surface.md §2.3` item 2's add rule).
4. **Steps:** **(1)** `register` × `3`: the registry holds `1:a#x`, `1:a#y` and `1:a#z` at the address `['a']`, in
   that first-registration order. **(2)** `commit(['a'], '0', v)` → `op1` is created;
   `CommitRecord.triggered` is the store's own set for the write at `['a']`. **(3)** `runAttempt(commit)`:
   the pass evaluates the pairs at the attempt's address in registry order — `1:a#x` first — and each
   evaluation completes before the next begins (`attempt-lifecycle.md §2.4` item 5 (ii)). **(4)** `c1` returns
   `true` on `v`: its `constraint-check` entry is appended, `1:a#x` enters `ran`, and the pass goes on.
   **(5)** `c2` returns `{repair: r2, message}` → arm `(b)`: `r2` is invoked with
   `RepairContext {op: op1, address: ['a'], id: 'y', value: v, tier: '0', pending: op1's own CommitRecord.pending, handed as a fresh list}` — **RE-SPELLED 2026-10-16 TO THE SIX-MEMBER SHAPE: this cell's as-filed literal carried the FIVE members `{op, address, id, value, tier}`, and the SIXTH, `pending: Handle[]`, was added 2026-10-15 at `kernel-surface.md §2.3` item 2, whose count `§1` item 4 re-derives as `5 + 1 = 6` ✓; its value is the commit's own `CommitRecord.pending` — the commit the repair is part of — handed as a fresh list** — and issues a write at `['a']`,
   whose verb returns **`op2`**; `op2` is ADDED to the attempt's `ops`, and the pair `1:a#y` enters `ran` and
   `appliedRepairs`. **(6)** the RE-RUN over `op2` evaluates EVERY PAIR AT THE ATTEMPT'S ADDRESS in
   registry order — `1:a#x`, `1:a#y`, `1:a#z` — **and `1:a#x` is VIOLATED by the value `r2` wrote while `1:a#y` and
   `1:a#z` pass**: **`1:a#x` is IN `ran` — it entered at step (4), on `op1` — and it is NOT IN `appliedRepairs`, because its repair is the repair `1:a#y` carries and `1:a#x` carries none, so the attempt reaches arm `(f)` and fails `KC-6` (`ConstraintRepeat`), **and the pass's later pairs are not evaluated** (`attempt-lifecycle.md §2.4` item 4's disjointness rule: NOT IN `ran` + no repair is `(c)`, and IN `ran` + NOT IN `appliedRepairs` is `(f)` — a pair IN `ran` violated again is NEVER arm `(c)`, AND THIS WINDOW'S ARM IS `(f)` BECAUSE THE `ran` LIMB IS THE ONE IT STANDS ON: ITS SECOND LIMB IS `NOT IN appliedRepairs` — `1:a#x` carries NO repair, so the first-repeat rule's positive limb is NOT this pair's predicate and the row this drive cites is `KC-6`'s, whose own trigger is the conjunction `ran` AND `NOT appliedRepairs` (`RE-1`; `e2e-scenarios.md`'s `E2E-C-5` `[5.6]`/`[5.9]`; `live-greens.md`'s `CON-3`, this battery's own census finding) (`RE-1`; `attempt-lifecycle.md §2.4` item 5 (iv) and (ii)). **(7)** the composition runs over `ops` = `[op1, op2]`: the repaired
   op `op2` first, then `op1` last (`composition-and-states.md §2.6` item 2), each call recorded as a
   `RollbackStep` — **AND THE WALK'S STOP POINT IS THIS WINDOW'S OWN `checkpoint`, RE-DERIVED AT THIS PASS
   FROM THE ARCHITECT'S RULING** (`A: docs/decisions.md` · `A102`, `D1`/`D2`; `RC-14`; `composition-and-states.md
   §2.6` item 8): **THIS WINDOW PASSES NO CHECKPOINT — EVERY WRITE IS CHECKED ATOMICALLY AS IT LANDS AND NEITHER OF THE ATTEMPT'S TWO OPS LEFT A VALID STATE: `op1`'s landing violated `1:a#y` and the re-run over `op2` violated `1:a#x` — so
   that pass evaluated an EVALUATED PREFIX and not the whole scope, and the re-run that follows fails at
   `1:a#x` — SO NO VALID-STATE OP STANDS, THE STEPS' `checkpoint` MEMBER IS
   `null`, and THE TARGET ONCE READ HERE AS THE STATE BEFORE THE ATTEMPT'S OWN WRITE IS WITHDRAWN BY NAME WITH THE FAILED COMMIT'S PRE-STATE CLAIM, the address standing where the store's own reach left it (`A: docs/decisions.md` · `A111`)** (`composition-and-states.md §2.6` item 8
   (iii)). **The walk therefore runs over the WHOLE call list as step (7)'s own order prints it and stops
   nowhere early, and a drive reads that no-checkpoint arm off the `null` member and NOT off the store's own
    state.** **AND THE PREMISE THIS STEP'S OWN CLAUSE CARRIES — *"EVERY WRITE IS CHECKED ATOMICALLY AS IT LANDS"* — IS A STORE-SIDE OBLIGATION THIS DOCUMENT STATES AND CANNOT OBSERVE, SO THIS STEP'S OBSERVATION IS `OWED` WITH THE PER-LANDING PASS AND IS NOT A VERIFICATION OF IT** (`contract.md §0.1` item 5 (i); `live-greens.md`'s `CON-1`, `[E2E-C-2.9]`; `§3`'s `OWED`-dependent clause (a)): **the `null` this step reads is the arm a CALLER-SIDE drive reaches either way, and the non-null arm belongs to the store-side pass `J-21` declares — so a drive that read this window's `null` as proof that no landing left a valid state would be reading an `OWED` clause as a settled one, and NO DRIVE OF THIS SCENARIO MAY DO SO.** **AND THE BUILD'S OWN DUTY ON THIS CELL IS NAMED BESIDE IT, BECAUSE THE GATE-6 LIVE RUN'S OWN `E2E-C-2.9` FOUND THE PASS ABSENT AT `K-2` ENTIRELY — the three registered pairs of that window had run `0` times when `K-2` returned, every `constraint-check` entry appearing only at `K-3`'s own pass (`scratch/live-constraints-gate6-out.txt`'s `E2E-C-2.1`, `2.2`, `2.9`; `live-greens.md`'s `CON-1` and `[E2E-C-2.9]`): THE BUILD OWES THE PER-LANDING ATOMIC EVALUATION THIS STEP'S PREMISE STATES — the address-scoped pass over the pairs registered at the landing's own address, run as the write lands and before any other kernel act, whose pass arm pins the `checkpoint` member and whose violation is what makes step (7)'s `null` arm MEANINGFUL RATHER THAN UNTESTED — AND THE CELL'S OBSERVATION STAYS `OWED` WITH `J-21` UNTIL IT LANDS: NO DRIVE READS THE `null` IT PRODUCES AS A VERIFICATION, AND THIS SENTENCE SETTLES NONE OF THE THREE `OWED` TERMS** (`contract.md §0.1` item 5 (i); `composition-and-states.md §2.6` item 8 (i); `J-21`'s owner THE ARCHITECT).
   state.**
5. **The observation that makes it PASS — with the member each observation reads:** **the thrown kernel form
   reads `status: 'KC-6'` — `KC-6`'s own token, because `1:a#x` is IN `ran` at the re-run and NOT
   IN `appliedRepairs` (`RE-1`); its `log`'s `outcome` entry reads `state: 'KC-6'`; its `log`
   carries a `constraint-check` entry whose PAIR KEY is `(['a'], 'x')` in EACH pass — **`2` such entries, the
   first at `op1` and the second at `op2.opId`, and never `3`** — and a `repair-run` entry whose pair key is
   `(['a'], 'y')`; **and the thrown form's `log` carries `5` entries — `2` `constraint-check` entries for
   `(['a'], 'x')` (`1` in each pass) + `1` `repair-run` entry for `(['a'], 'y')` + `1` `constraint-check`
   entry for `(['a'], 'y')`, the ONE the FIRST pass evaluated at `op1` before the transition, `1:a#z` never
   being reached + `1` `outcome` entry — `2 + 1 + 1 + 1 = 5 ✓`, TERMS AND ARITHMETIC RE-DERIVED AT THIS PASS
   FROM THE PASS'S OWN STOPPING RULE (`RE-2`), the `outcome` entry being the ONE entry the open
   record's log did not hold**;
   `K-5`
   `report(attempt)` reads `ops` of length **`2`** — `op1` and `op2`, `op2` being the op `r2`'s own write
   verb returned — and the store's own read at `['a']` answers what the composition's own performed calls left there —
   THE PRE-STATE READING ONCE PRINTED HERE BEING WITHDRAWN BY NAME WITH THE FAILED COMMIT'S PRE-STATE CLAIM, a failed commit at an address the caller already wrote to undoing the caller's own earlier write there (`A: docs/decisions.md` · `A111`; `A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4)** (`composition-and-states.md §2.6` items 2–3; `contract.md
   §5.7`, `P-TP-7`).
   **AND THE `rollback` MEMBER IS READ AS THE CALLS THE COMPOSITION PERFORMED, NOT AS ONE STEP PER OP, DECIDED
   HERE BECAUSE THE TWO OPS STAND AT ONE ADDRESS** (`RD-2`): **the composition walks `ops` minus its first
   entry, reversed, then that first entry last, and it SKIPS any op whose `opId` a previous call has already
   reported in its `undoneOps` member** (`composition-and-states.md §2.6` items 2 and 5 (a)). **THIS WINDOW'S TWO OPS
   BOTH STAND AT `['a']`, SO THE FIRST PERFORMED CALL — `op2`'s, the repaired op's — reaches the same subtree
   as `op1` and its own `undoneOps` may already report `op1.opId`; where it does, the call over `op1` is NOT
   OWED and is NOT PERFORMED.** **SO THE MEMBER READS: `rollback` is a list with AT LEAST ONE `RollbackStep`
   AND NEVER NONE, in the order the calls were PERFORMED, each step's `opId` the opId the kernel PASSED to
   that call and each step's `undoneOps`/`restoredTo` the store's own members VERBATIM — the first step's
   `opId` being `op2.opId`, which is the composition's own first op, and the `answer`/`failed` members reading
   `'ok'`/`false` on every step this window performs.** **AND THIS SCENARIO CLAIMS NO STEP COUNT OF `2` AND NO
   STORE REACH: the performed count is `1` or `2` here, decided by the store's own `undoneOps` report, and
   the drive's claim is the store's own answer at `['a']` plus the steps the composition actually performed, the pre-state reading once named here being WITHDRAWN BY NAME (`A: docs/decisions.md` · `A111`)**
   (`composition-and-states.md §2.6` items 3, 4 and 5 (a); `contract.md §5.7`, `P-TP-7`).
   **AND EVERY STEP CARRIES THIS ATTEMPT'S ONE `checkpoint` VALUE, RE-DERIVED AT THIS PASS WITH THE COUNT IT
   MOVES** (`A: docs/decisions.md` · `A102`, `D1`/`D2`): **`RollbackStep` carries `6` members — `opId`,
   `undoneOps`, `restoredTo`, `answer`, `failed`, `checkpoint` — and in THIS window every performed step reads
   `checkpoint: null`, because NO OP OF THIS ATTEMPT LEFT A VALID STATE — every write is checked atomically as it lands, and each of this window's two writes violated a registered pair at the attempt's own address at its own landing (`op1`: `1:a#y`; `op2`: `1:a#x`) — which is exactly the
   no-checkpoint arm `composition-and-states.md §2.6` item 8 (iii) declares** (`composition-and-states.md §2.6` item 3;
   `parameter-semantics.md §2.17`; `Q-A`; `Q-B`). **AND EACH OF THESE `null`s IS READ OFF THIS ATTEMPT'S OWN STEPS AND OFF NO OTHER ATTEMPT'S — the `rollback` member of the very `AttemptReport` this window's `K-5` returns, so a drive that read another attempt's steps has left this scenario and read a different attempt's window; the same separation `E2E-C-15`'s step (9) prints for the case where an attempt's `checkpoint` DOES name an op another attempt landed** (`A: docs/decisions.md` · `A104`; `attempt-lifecycle.md §2.4` item 8 (ii) (g)). **So the STOP POINT is observed without an inference: the whole call list
   is walked because `null` names no earlier boundary, and the end state the drive reads at `['a']` is the one
   the declared member predicts, not a boundary the drive guessed.**
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a `KC-3`-only attempt with
   NO second op (the repair never ran), or an attempt that fails at a violation BEFORE the repairable pair and
   leaves `op1` standing, or a composition of one commit-level call, or a `rollback` member that is absent
   rather than a list.** **FALSIFIED BY: a report whose `ops` has length `1` — i.e. the repair's write never
   entered the attempt, which is `CC-24`'s hole — or a `constraint-check` entry count of `1` for the pair key
   `(['a'], 'x')`, which is a re-run that never happened; or a report whose `rollback` member is absent, or
   EMPTY where the composition owed a call — a performed list of `0` (`RD-2`); or a `RollbackStep` whose
   `opId` is not an opId the kernel passed to that call, or whose `undoneOps`/`restoredTo` are not the
   store's own members; or a
   store read at `['a']` returning the VIOLATING value after the throw; or a thrown `status` that is `KC-3`
   for the failing pair's key (`(['a'], 'x')`), which IS IN `ran` at the re-run and is therefore `KC-6`'s
   state and never `(c)`'s (`RE-1`); or a thrown `status` that is `KC-5` where the failing pair's key carries
   NO repair in `appliedRepairs`; or a `constraint-check` entry for `(['a'], 'z')` in this window, which the
   pass's own stopping rule forbids (`RE-2`); **or a step whose `checkpoint` member is NOT `null` — a
   non-`null` value would name an op whose landing left a valid state at `['a']`, and NO op of this attempt did:
   `op1`'s landing violated `1:a#y` and the re-run over `op2` failed at `1:a#x`, so no op left a state at which every
   registered pair at `['a']` passed (`Q-A`; `Q-B`; `A102`, `D2`); or two
   steps of this attempt's composition carrying two different `checkpoint` values; or a walk that stops at a
   boundary the `checkpoint` member does not name — a composition that stops before `op1` last, or one that
   claims a target state at `['a']` other than the one the walk's own steps reach** (`composition-and-states.md §2.6`
   item 8; `parameter-semantics.md §2.17`).**
7. **The ruling it pins:** **`P: §1`** — *"If a constraint fails without a repair, or if it fails and it is
   already in the commit registry for failing … the entire commit fails to prevent a cycle and rolls back,
   returning the message log to the app as an error message."*, read with **`P: §B.3`** (*"PER-OP
   `rollback` REPEATED OVER THE ATTEMPT'S OPS … never a claim past a compacted base"*) and
   `contract.md §5.7` (`P-TP-7`) — **and with `attempt-lifecycle.md §2.4` item 5 (ii)'s own sequencing rule,
   read at this pass, which is what makes the arm single-valued** (`RC-11`; the failing arm is `(f)`, on the
   predicate `attempt-lifecycle.md §2.4` item 4's disjointness rule prints).

### `E2E-C-3` — a successful repair: the re-run passes and the attempt resolves

1. **Id:** **`E2E-C-3`**.
2. **Start point:** **the app registers ONE constraint whose repair writes a lawful value at the SAME
   address, then commits a violating value**: `K-1` `register(['a'], 'x', c1)` with `c1` returning
   `{repair: r1, message: 'a is too large'}` when the value at `['a']` is too large, and `true` otherwise;
   `r1` writes a smaller value at `['a']` through the caller's own write verb **and RETURNS `{ok: true, op}` with its `op` set to that write's own returned op — the repair-op seam `A: docs/decisions.md` · `A110` declares, its one home being `parameter-semantics.md §2.7`**. **Then `K-2`
   `commit(['a'], '0', bigValue)`.**
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — with the store's own write verb
   reached by `r1`'s edit.**
4. **Steps:** **(1)** `register` then `commit` → `op1`. **(2)** `runAttempt`: `c1` is violated → arm `(b)`;
   `r1` is invoked with `RepairContext {op: op1, address: ['a'], id: 'x', value: bigValue, tier: '0', pending: op1's own CommitRecord.pending, handed as a fresh list}` — **RE-SPELLED 2026-10-16 TO THE SIX-MEMBER SHAPE, exactly as this file's earlier scenario is (`kernel-surface.md §2.3` item 2; `§1` item 4's `5 + 1 = 6` ✓; the as-filed five-member literal stands at that cell's own dated note)** — and
   writes the smaller value, whose verb returns **`op2`**; `op2` is added and the pair `1:a#x` enters `ran`
   and `appliedRepairs`. **(3)** the re-run evaluates EVERY PAIR AT THE ATTEMPT'S ADDRESS in registry order
   against `op2` (`1:a#x` among them, and the only pair there) and **`c1` returns `true`**. **(4)** every
   registered pair has passed and the attempt reaches the success arm.
5. **The observation that makes it PASS — with the member each observation reads:** **`K-3`'s returned
   `AttemptReport` reads `outcome: 'passed'`, `ops` of length **`2`** (`op1` then `op2`, in CREATION order),
   and `rollback: []`; its `log` carries, in `seq` order: a `constraint-check` entry with `id: 'x'` (the
   violated evaluation), a `repair-run` entry with `id: 'x'` and `opId` = `op2.opId` (the op the repair
   PRODUCED), a SECOND `constraint-check` entry with `id: 'x'` and `opId` = `op2.opId` (the re-run), and a
   `commit` entry; and the store's own read at `['a']` returns the SMALLER value `r1` wrote**
   (`attempt-lifecycle.md §2.4` item 4's arm `(g)`; `kernel-surface.md §2.5` item 1's kind table; `contract.md §5.6`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a repair that runs but whose
   op is NOT re-evaluated (the re-run never happened), or a repair-run entry with no `opId`, or a pass whose
   `ops` omits the repaired op, or a `commit` entry appended BEFORE the re-run's `constraint-check` entry.**
   **FALSIFIED BY: an `AttemptReport` carrying `outcome: 'passed'` whose `log` holds NO second
   `constraint-check` entry for `id: 'x'`** — i.e. the re-run never happened — **or whose `ops` has length
   `1`**, or by a store read at `['a']` still returning `bigValue`.
7. **The ruling it pins:** **`P: §1`** — *"If a repair is made and successfully creates a new op, that op is
   added, and the triggered constraints run again."*, read with the transition table's arm `(b)` at
   `attempt-lifecycle.md §2.4` item 4 and arm `(g)`'s success.

### `E2E-C-4` — a failed repair: `KC-4`, and what was attempted is in the log

1. **Id:** **`E2E-C-4`**.
2. **Start point:** **the app registers ONE constraint whose repair returns `{ok: false, message}` and then
   commits a violating value**: `c1` returns `{repair: r1, message: 'a is invalid'}`; `r1` returns
   `{ok: false, message: 'could not find a lawful value at a'}` and makes NO edit — **NO EDIT MEANS NO OP: this return carries NO `op` member at all, which IS THE DECLARED FORM OF THE FAILURE ARM AND NEVER A MISSING MEMBER** (`parameter-semantics.md §2.7`; `A: docs/decisions.md` · `A110`). **Then `K-2`
   `commit(['a'], '0', v)`.**
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3`.**
4. **Steps:** **(1)** `register` then `commit` → `op1`. **(2)** `runAttempt`: `c1` violated → arm `(b)`;
   `r1` invoked and returns `{ok: false, message}` — **the declared failure arm, whose `op` is ABSENT and whose edit was never made** (`parameter-semantics.md §2.7`; `A: docs/decisions.md` · `A110`). **(3)** the attempt reaches arm `(d)`: `FAILING`. **(4)** the
   composition runs over `ops` = `[op1]` — one call — and the kernel throws.
5. **The observation that makes it PASS — with the member each observation reads:** **the thrown form reads
   `status: 'KC-4'`; its `log`'s `outcome` entry reads `state: 'KC-4'`; its `log`'s
   `repair-run` entry reads `id: 'x'` and its `message` carries the REPAIR's own string *"could not find a
   lawful value at a"* CARRIED WHOLE; `K-5`'s report reads `ops` of length **`1`** (no op was produced) and
   `rollback` of length `1` with `answer: 'ok'`; and the store's own read at `['a']` returns the value that
   stood there before `commit`** (`attempt-lifecycle.md §2.4` item 4's arm `(d)`; `fail-surface.md §2`'s
   `KC-4`; `§1.1` item 2 (ii) — the caller's own text carried whole).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a repair failure that
   silently passes the attempt, or one that credits an op the repair never produced, or one whose
   `repair-run` entry carries the KERNEL's generic text instead of the repair's own message.** **FALSIFIED
   BY: an `AttemptReport` with `outcome: 'passed'` after a repair returned `{ok: false, message}`; or a report whose
   `ops` has length `2`; or a `repair-run` `message` that is the kernel's own generated sentence rather than
   the repair's carried string.**
7. **The ruling it pins:** **`P: §1`** — *"It returns a success true/false and a message explaining the
   change made/attempted"*, read with `fail-surface.md §2`'s `KC-4` and `§1.1` item 2's two message
   provenances.

### `E2E-C-5` — the first-repeat rule, driven on BOTH limbs in THREE windows (α · β · γ, each its own attempt at one address): `KC-6`, `KC-6` and `KC-5`

1. **Id:** **`E2E-C-5`**.
2. **Start point:** **TWO windows declared here, α and β, each a caller's own act, each starting from the app's own registrations — WITH THE THIRD WINDOW γ, THE ONE THAT DRIVES THE OTHER LIMB, DECLARED AT STEP (4) BELOW, SO THIS CELL AND THAT CELL ARE READ TOGETHER AND NO READER COUNTS TWO WINDOWS WHERE THREE ARE DRIVEN — `3` windows, `3` attempts, each opened and closed in turn, so no two of them stand `OPEN` at once:**
   **(α)** the app registers at `['a']`, in this order, a pair `c1` whose body returns `true` on `v` and
   `{message}` on the value `c2`'s repair writes — **its pair `a#c1` carries NO repair, so it is a pair that
   has RUN and has recorded NO applied repair** — and a pair `c2` whose body returns
   `{repair: r2, message}` on `v` and whose repair's edit is the one `c1` is violated by; then `K-2`
   `commit(['a'], '0', v)`. **(β)** in a later window at
   the SAME address, the app registers TWO pairs — `cQ` whose body returns `true` on `v`'s evaluation and
   `{message: 'q is invalid'}` (NO repair registered for it) on anything a repair writes, and `cP` whose
   body returns `{repair: rp, message: 'p needs fixing'}` and whose repair writes an op — and then `K-2`
   `commit(['a'], '0', v)`.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — with the store's own write verb
   reached by each repair.**
4. **Steps:** **(α)** `commit` → `op1`; the pass evaluates the pairs at the attempt's address in
   first-registration order — `a#c1` first, which PASSES on `v` and whose `constraint-check` entry is
   appended and whose pair enters `ran` — then `a#c2`, which is violated → arm `(b)`: `c2`'s repair runs, its
   edit returns `op2`, **and `r2` RETURNS `{ok: true, op}` with `op` = that returned op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), and `a#c2` enters `ran` and `appliedRepairs`; the re-run over `op2` evaluates EVERY
   PAIR AT THE ATTEMPT'S ADDRESS in that same order — **`a#c1` first, and `c1` is violated by the value
   `c2`'s repair wrote: `a#c1` is IN `ran` — it entered on `op1` — and is NOT IN `appliedRepairs`, its pair carrying NO registered repair at all — THE PREDICATE IS `ran` MEMBERSHIP AND `appliedRepairs` MEMBERSHIP AND NOT REGISTRATION — so
   the attempt reaches arm `(f)` and fails `KC-6` with NO repair invoked for `a#c1`, and the pass's later pairs are not evaluated.**
   **(β)** `commit` →
   `op1`; the pass evaluates the two pairs in registry order — `a#Q` PASSES on `v` (its `constraint-check`
   entry is appended and the pair enters `ran`) and `a#P` is violated → arm `(b)`: `rp` runs, its write
   returns `op2` **and `rp` RETURNS `{ok: true, op}` with `op` = that returned op** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), and `a#P` enters `ran` and `appliedRepairs`; the re-run over `op2` evaluates EVERY PAIR AT
   THE ATTEMPT'S ADDRESS in registry order — `a#Q` first, `a#P` after it — **and `a#Q` is violated a
   SECOND time: the pair is IN `ran` — it entered on `op1` — and is NOT IN `appliedRepairs` (NO REPAIR IS REGISTERED for it), so the attempt reaches arm `(f)` and
   fails `KC-6`**, having never invoked a repair for `a#Q`.**
   **AND THE THREE WINDOWS DRIVE THE ARMS `(f)` AND `(e)` ON THE PREDICATES `attempt-lifecycle.md §2.4` ITEM 4 PINS AND ON NO OTHER — WHICH IS WHAT MAKES THEM DISJOINT RATHER THAN ONE ARM
   `ran` membership and `appliedRepairs` membership — WHICH IS WHAT MAKES THEM DISJOINT RATHER THAN ONE LIMB
   IN TWO SPELLINGS** (`RC-6`; `RE-3`; the four arms' predicates, printed identically at `attempt-lifecycle.md §2.4` item 4: `(e)` IS IN `ran` AND IN `appliedRepairs`, `(f)` IS IN `ran` AND NOT IN `appliedRepairs`, `(b)`/`(c)` are the two combinations with the pair NOT IN `ran`): **(α)'s FIRST REPEAT is `(f)` — IN `ran`, NOT IN `appliedRepairs` — and
   (β)'s second repeat is the same combination — so THE WINDOW THAT DRIVES `(e)` IS THE ONE IN WHICH THE
   VIOLATED PAIR'S REPAIR STANDS IN `appliedRepairs`, and it is printed below as (γ) BECAUSE THE TWO-PAIR
   WINDOWS ABOVE CANNOT PRODUCE IT.**
   **(γ) THE THIRD WINDOW, WHICH IS THE `KC-5` WINDOW AND THE ONE THE FIRST TWO CANNOT PRODUCE: the app
   registers at `['a']`, in this order, a pair `c1` whose body returns `{repair: r1, message}` on `v` and
   `{message}` on any value written after it, a pair `c2` whose body returns `true` on `v` and
   `{repair: r2, message}` on the value `r1` writes, and a third pair `c3` that passes throughout;
   `commit(['a'], '0', v)`; the pass evaluates the three in order — `a#c1` violated → arm `(b)`, `r1`'s write
   returns `op2` **AND `r1` RETURNS `{ok: true, op}` WITH `op` = THAT RETURNED OP** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`), `a#c1` enters `ran` AND `appliedRepairs` — then `a#c2` passes on `op2`'s value; the re-run
   over `op2` evaluates the pairs in order — `a#c1` PASSES, then `a#c2` is violated by `op2`'s own value →
   arm `(b)`, `r2`'s write returns `op3` and makes `c1` violated, `a#c2` enters `ran` and
   `appliedRepairs` **AND `r2` RETURNS `{ok: true, op}` WITH `op` = THE `op3` ITS WRITE RETURNED** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`); and the re-run over `op3` evaluates the pairs in order — **`a#c1` is VIOLATED AGAIN and
   `a#c1` IS IN `appliedRepairs`, so the attempt reaches arm `(e)` and fails `KC-5` with NO repair invoked a
   second time: `a#c1`'s `repair-run` entry count is `1` and never `2`.**
5. **The observation that makes it PASS — with the member each observation reads:** **(γ) the thrown form
   reads `status: 'KC-5'`; its `log`'s `outcome` entry reads `state: 'KC-5'`; and the
   COUNT of `repair-run` entries whose PAIR KEY is `(['a'], 'c1')` in that log is exactly **`1` and never
   `2`** — so no repair ran twice. **(α) the thrown form reads `status: 'KC-6'`; its `log`'s
   `outcome` entry reads `state: 'KC-6'`; the COUNT of `constraint-check` entries whose PAIR KEY is
   `(['a'], 'c1')` is exactly **`2` and never `3`**, AND the count that separates the arms is `a#c1`'s OWN
   VIOLATION COUNT, which is exactly **`1` and never `2`** — its first evaluation PASSED and its second
   VIOLATED, so its own key carries `1` pass entry and `1` violation entry, and only a pair that ran a third
   time would show `2` violations (`RD-3`). **(β) the same two members read `KC-6`/`KC-6`,
   the COUNT of `constraint-check` entries whose PAIR KEY is `(['a'], 'Q')` is exactly **`2` and never
   `3`**, and `a#Q`'s OWN VIOLATION COUNT is exactly **`1` and never `2`** — so the attempt failed at the
   second violation and did not reach a third evaluation.** **In all
   three windows `K-5`'s report reads `rollback` of length `1` or more and the registry entry is gone** —
   **and the count is keyed on the PAIR and not on the bare `id`, because one `id` may stand at two
   addresses** (`RC-12`) (`kernel-surface.md §2.5` item 3's two limbs; `fail-surface.md §2`'s `KC-5`/`KC-6`;
   `contract.md §5.6`, `P-SM-6`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a repair re-invoked a second
   time (a loop, and a `repair-run` count of `2` for that pair's own key), or an attempt that does NOT fail
   at the second violation of a never-repaired pair — i.e. a third evaluation of it — **or the two limbs
   confused — a pair whose repair IS in `appliedRepairs` reaching arm `(f)`/`KC-6`, or a pair in `ran` with
   NO applied repair reaching arm `(e)`/`KC-5` (which would be a `repair-run` count of `0` for a repair the
   attempt never invoked), or a first violation answered by a repeat arm instead of by `(b)`/`(c)` on the predicate the pair's `ran` membership decides.** **OR
   a first-repeat rule read as *"a repair is registered for the pair"* rather than as `appliedRepairs`
   membership — the registration-keyed reading, WITHDRAWN BY NAME at `attempt-lifecycle.md §2.4` item 4 (`RC-6`).**
   **FALSIFIED BY: a `repair-run` entry count of `2` for
   one pair's own key in one attempt; or a `constraint-check` entry count of `3` for one pair's own key; or
   a limb (ii) pair whose OWN VIOLATION COUNT is `2` rather than `1` — a third evaluation reached (`RD-3`);
   or
   a thrown form whose `status` is `KC-6` while the violated pair's key IS IN `appliedRepairs`; or a thrown
   form whose `status` is `KC-5` while no repair is recorded as applied for the violated pair** (`RC-12`).
7. **The ruling it pins:** **`P: §A.2`** — *"Fail on the first repeat, never repeat a repair"*, read at its
   fuller form *"A repair already recorded as applied may not run again; a second violation of the same
   constraint fails the attempt"* and filed as **`R: docs/decisions.md` · `A100`**.

### `E2E-C-6` — two registrations at one address, and the registry entry is gone after the pass

1. **Id:** **`E2E-C-6`**.
2. **Start point:** **the app registers TWO constraints at the SAME address under two ids, commits a value
   both admit, and then — after the pass — commits a SECOND value at that address**: `K-1`
   `register(['a'], 'p', cp)` and `K-1` `register(['a'], 'q', cq)` with both bodies returning `true`; then
   `K-2` `commit(['a'], '0', v)`; then `K-3` `runAttempt`; then, as a SEPARATE caller's act, `K-2`
   `commit(['a'], '0', v2)`.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — and, for the second commit, the
   kernel's `K-2` again, which is the declared way to read the registry's entry's absence**
   (`composition-and-states.md §2.7` item 12 (ii)).
4. **Steps:** **(1)** two `register` calls at one address: the registry holds TWO pairs, and the store's home
   holds ONE entry at that address. **(2)** `commit` then `runAttempt`: the pass appends one
   `constraint-check` entry per pair and then the `commit` entry. **(3)** the attempt's registry entry is
   removed by its own terminal act. **(4)** the second `K-2` `commit(['a'], '0', v2)` opens a NEW attempt —
   the address is unheld — and **(5) THAT SECOND ATTEMPT IS RUN TO ITS TERMINAL ARM BY THE ONLY ACT THAT
   CAN DISPOSE OF IT: `K-3` `runAttempt(secondCommitRecord)`, TAKING THE `CommitRecord` THE SECOND `K-2`
   RETURNED AND NOT AN ATTEMPT REFERENCE — so the window ends with BOTH attempts terminal and the registry
   holding nothing** (`RE-9`; `kernel-surface.md §2.1` item 3 — `K-3` takes the `CommitRecord` that CARRIES
   the attempt; `parameter-semantics.md §2.15`).
5. **The observation that makes it PASS — with the member each observation reads:** **`K-3`'s returned
   report's `log` carries EXACTLY TWO `constraint-check` entries, with `id: 'p'` at a lower `seq` than
   `id: 'q'` — the registry's own first-registration order** (`LogEntry.seq`, `LogEntry.id`) — **followed by
   the `commit` entry; and the SECOND `K-2` RETURNS a `CommitRecord` rather than throwing `KC-7`**
   (`CommitRecord.attempt` present), **the registry's entry for the first attempt thereby shown gone**;
   **and the second attempt's own `K-3` RETURNED a passed `AttemptReport` whose `log` carries its own two
   `constraint-check` entries and its own `commit` entry, so NO attempt is left OPEN at the end of this
   window and the registry entry is gone again — THE SECOND ATTEMPT'S TERMINAL ACT AND ITS ARGUMENT ARE NAMED AT STEP (5)** `RE-9`.
   AND THE STEPS THAT DISPOSE OF THAT SECOND ATTEMPT ARE STEP (5) OWN, that step naming its terminal act and its argument.
   6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **two ids collapsing into one
   registration (one `constraint-check` entry), or an attempt whose registry entry survives so the second
   commit is refused `KC-7`, or the two functions' order swapped by the second registration.** **FALSIFIED
   BY: a `constraint-check` entry count of `1` for an address holding two pairs; or the second `K-2` throwing
   `KC-7`; or a `seq` order in which `id: 'q'`'s entry precedes `id: 'p'`'s without a re-registration having
   occurred.**
7. **The ruling it pins:** **`P: §B.7`** — *"A caller-side registry keyed by address + id (no store entry)"*,
   read with **`R: docs/decisions.md` · `A98`** — D1/D2 — and `contract.md §5.1` (`P-IM-1`).

### `E2E-C-7` — the function's side, the log's own order, and a comparison that can fail

1. **Id:** **`E2E-C-7`**.
2. **Start point:** **the app registers FOUR constraints at three addresses — two of them at the SAME
   address, and ONE AT THE ADDRESS IT WILL COMMIT AT, so the pass's own scope is non-empty and the log it
   reads has a value** (`RE-7`) — **and ALSO registers its own listener at an ANCESTOR address through the
   store's own verb; then commits a value**: `K-1` `register(['a'], 'p', cp)`, `K-1`
   `register(['b'], 'p', cp2)`, `K-1` `register(['b'], 'q', cq)`, **`K-1` `register(['a','b'], 'r', cr)`**
   — each body appending a distinguishable marker to the log through its own
   return — and the store's own `listen(['a','b'])`; then `K-2` `commit(['a','b'], '0', v)`.
3. **The surface it drives:** **the kernel's surface — `K-1`, `K-2`, `K-3` — with the store's own `listen`
   and the store's own write verb reached as the unit's contract cites them.**
4. **Steps:** **(1)** the four `register` calls: one pair at `['a']`, two at `['b']` and ONE AT `['a','b']`;
   the store's home
   holds entries at `['a']`, at `['b']` and at `['a','b']`, and its entry at each is the SAME entry the app's
   own `listen` at that address would hold (`listen` is idempotent at the address level). **(2)** `commit` →
   `op1` and
   `CommitRecord.triggered`, the store's own set. **(3)** `runAttempt`: the kernel invokes the pairs at the
   attempt's address — THE ONE PAIR AT `['a','b']` — in ITS OWN registry order, then evaluates the re-run
   scope if a repair ran. **(4)** the
   attempt resolves. **(5)** a drive reads `CommitRecord.triggered` as a SET and compares it to the SET of
   handles the kernel's `register` calls returned and the app's own `listen` returned — and reads
   `AttemptReport.log`'s ordinals.
5. **The observation that makes it PASS — with the member each observation reads:** **`AttemptReport.log`'s
   `seq` values are STRICTLY INCREASING from `1` with no gap and no repeat, and the `kind`/`id` sequence
   reads the pairs THE PASS EVALUATED AT THE ATTEMPT'S ADDRESS — the one pair at `['a','b']`, its
   `constraint-check` entry carrying `id: 'r'`, followed by the `commit` entry — so the reading has a value
   and it is the registry's own order, while the pairs at `['a']` and `['b']` appear in NO entry of this
   pass's log because `attempt-lifecycle.md §2.4` item 5 (iv) bounds the pass's scope to the attempt's own address** (`RE-7`;
   `LogEntry.seq`, `LogEntry.kind`, `LogEntry.id`); **and
   `CommitRecord.triggered` — a list of HANDLES, not of addresses — read as a SET, EQUALS the set of handles
   the FOUR `listen` calls that preceded it returned — `['a']`, `['b']`, `['b']` and `['a','b']` — NAMED ONE BY ONE SO THE COMPARISON'S TWO SIDES ARE TWO
   DIFFERENT SETS AND NEITHER SIDE IS COMPARED WITH ITSELF** (`NV-6`): **the kernel's `register(['a'], 'p',
   cp)` returned handle `h1` for its own `listen(['a'])`; the kernel's `register(['b'], 'p', cp2)` and
   `register(['b'], 'q', cq)` EACH returned the SAME handle `h2`, because the store's `listen` at an
   already-registered address returns the existing handle and the two calls made ONE store entry; and the
   app's own `listen(['a','b'])` returned `h3`, WHICH IS ALSO THE HANDLE THE KERNEL'S FOURTH REGISTRATION
   ADOPTED at that address** — **so the equality asserted is `{triggered} = {h1, h2, h3}`,
   a set of `3` handles held by `3` entries (`['a']`, `['b']` and `['a','b']`), and the prefix rule
   *"`W` is a PREFIX of `X`, descendant-inclusive"* is what selects all three for a write at `['a','b']`**
   (`A: docs/specs/storeroom-native/write-and-read.md §6.5` item 3 and item 12 (c)). **AND — the
   discriminator this scenario exists for — the drive REPEATS the run with the
   store's returned `triggered` list in a DIFFERENT ORDER and the attempt's `AttemptReport.outcome`, its
   `ops` length and its `log`'s `kind`/`id` sequence are UNCHANGED, because the kernel derives nothing from
   a position: THE KERNEL'S OWN LOG ORDINAL AND ITS OWN REGISTRY ORDER stand, while the store's list's
   order is read as a set** (`attempt-lifecycle.md §2.4` item 5 (i)–(iii); `kernel-surface.md §2.5` item 1's order clause;
   `contract.md §5.5`, `P-SM-5`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a kernel outcome derived
   from a position in a store-returned list, or a log ordinal read off the store's list, or a constraint
   evaluated inside a store verb, or a `triggered` set that omits the app's own listener's handle `h3`, or
   one that omits `h2` because two registrations at `['b']` are read as two entries.** **AND
   THE FALSIFIER IS STATED EXACTLY, BECAUSE THIS SCENARIO ONCE COMPARED ONE HANDLE WITH ITSELF** (`NV-6`;
   `CC-28`):
   **FALSIFIED BY: a `triggered` set of `2` handles or of `4` handles for this window, or one containing a
   handle no `listen` call returned; or a run in which permuting the store's `triggered` list's order changes
   the attempt's `outcome`, its `ops` length or its `log`'s `kind`/`id`/`seq` sequence; or a kernel whose two
   `register` calls at one address return DIFFERENT handles where the store's address-level idempotence
   holds; or an `AttemptReport.log` whose `seq` values repeat or leave a gap; or an `AttemptReport.log`
   carrying a `constraint-check` entry for the pair at `['a']` or at `['b']`, whose addresses are NOT the
   attempt's address and are therefore outside the pass's own scope (`RE-7`).**
7. **The ruling it pins:** **`P: §A.1`** — *"the function is run in the node.js space (also like listeners)"*
   — read with **`A: docs/specs/storeroom-native/contract.md §6.5`** item 5 (*"NO ORDER IS DECLARED FOR THE
   LIST"*) and **`A: docs/specs/storeroom-native/write-and-read.md §6.5`** item 10 (d) (*"THE STORE NEVER
   INVOKES ANYTHING: IT RETURNS THE HANDLES"*).

### `E2E-C-8` — parity between the app's own call and the app's listener body

1. **Id:** **`E2E-C-8`**.
2. **Start point:** **TWO windows, each opening from the app's own act:** **(α)** the app calls the kernel
   directly — `register` then `commit` then `runAttempt` — from an external call site; **(β)** the app
   registers the SAME constraint at the SAME address and, inside ITS OWN listener body, calls `commit` and
   `runAttempt` for the write it has just observed. **Both windows start from a caller's own write at the
   store's surface.**
3. **The surface it drives:** **the external path the app uses — `docs/specs/storeroom-js/contract.md §2.2` ·
   `§2.6` · `§2.10` — with the kernel's `K-1`/`K-2`/`K-3` called from each call site.**
4. **Steps:** **(1)** (α): register, commit a violating value, run the attempt. **(2)** (β): register the
   same pair, write the same value, and inside the listener body run the same `commit`/`runAttempt`
   sequence. **(3)** a drive compares the two windows' declared members. **(4)** both windows resolve to
   their final states.
5. **The observation that makes it PASS — with the member each observation reads:** **the two windows'
   `CommitRecord` members `attempt`/`op`/`triggered` are of the same SHAPE (the op's `kind` equal, the
   attempt reference of each window its own), and their `AttemptReport` members read EQUAL where equality is
   declared: `outcome` equal, `ops` of equal LENGTH with equal `kind` sequences, and `log` of equal length
   with equal `kind`/`id`/`state` sequences — while `message` strings may differ where the kernel's own
   generated text names the trigger's arguments** (`CommitRecord`, `AttemptReport` and `LogEntry` member
   sets; `attempt-lifecycle.md §2.4` item 5 (ii); `contract.md §5.4`, `P-SM-4`).
6. **The fail-state it distinguishes — and the state that would FALSIFY it:** **a kernel that depends on the
   identity of the code that called it — a caller-realm check, a listener-context read, a different arm
   chosen inside a listener body.** **⟶ AND CELL (5)'s EXPECTED OBSERVATION AND THIS CELL ARE RE-DERIVED TO THE DELIVERY MODEL AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`A: docs/decisions.md` · `A112`): THE STORE RETURNS THE HANDLES AND INVOKES NOTHING, THE JS SURFACE RUNS THE TRIGGERED CONSTRAINTS FIRST, EACH ENTRY CHECKED OFF AS IT PASSES, AND, ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, BEFORE RETURNING TO THE CALLING PROCESS** — **so within window (β) the listener body's own `commit`/`runAttempt` sequence is reached by THE JS SURFACE'S OWN ORDERED LAYER and not by any store act, the compared members of cell (5) stand UNCHANGED, and `CommitRecord.pending` read in either window carries THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, each entry leaving it only by being checked off as it passes, the caller's own loop being ONE invoker among the surface's layers and never the only one** — **AND THE RE-DERIVED FALSIFIER ADDS TWO MEMBERS TO THIS CELL'S EXISTING STATE: FALSIFIED BY A RECORD WHOSE `pending` MEMBER OMITS ANY HANDLE OF THE SET THE WRITE RETURNED (a sifted subset), OR BY A `pending` MEMBER READ AS CARRYING A LISTENER THE CONSTRAINTS HAVE NOT YET PASSED.** **FALSIFIED BY: a window in which the SAME registered pair and the SAME
   written value reach a DIFFERENT `AttemptReport.outcome` or a different `ops` length depending only on
   whether the call was made from a listener body; or a `log` whose `kind`/`id`/`state` sequences differ
   between the two windows.**
7. **The ruling it pins:** **`P: §A.1`** — the constraint's handle checked store-side *"as normal for
   listeners"* and its function run in the Node.js space — read with **`P: §B.4`** (the attempt's record the
   kernel's own, and nothing in it crossing the store's surface).

**⟶ SCENARIOS `E2E-C-9` … `E2E-C-16` MOVED 2026-10-13 (the supervisor's applier act, the volume remedy): they are BYTE-EXACT at `docs/specs/storeroom-constraints/e2e-scenarios-b.md`, which carries them with the same identifiers, the same `7` cells each, and the same census. NO RULE MOVED.** **AND THIS MOVED THE UNIT'S PART COUNT, WHICH IS NOT THIS DOCUMENT'S FIGURE: the map now reads `8` part entries (`7 + 1 = 8` ✓) over `9` map rows (`8 + 1 = 9` ✓), and every citation of `E2E-C-9` … `E2E-C-16` that named this document is re-spelled to `e2e-scenarios-b.md` — both figures and the whole requirement list standing at ONE HOME, `contract.md §0`'s closure bullet and its re-spelling list item `32`, which this clause CITES and does not re-derive.**

## §3. THE `OWED` LIST — the expectations this unit does NOT invent, with their owners

**THE RULE, RESTATED SO THIS LIST IS READ AS A DELIBERATE STOP AND NOT AS AN OMISSION:** **where an
expectation could not be derived from the contract, it is NOT INVENTED — it is recorded here with its OWNER
and with the ruling that would close it.** **`2` entries stand, and both are ALREADY parked elsewhere in this
directory rather than minted here** (`CC-4`; `CC-30`; `attempt-lifecycle.md §2.4` item 6).

| # | The `OWED` entry | What it blocks, exactly | The owner, and the positive revisit condition that closes it |
| --- | --- | --- | --- |
| **`EO-1`** | **THE ATTEMPT'S WINDOW EDGES AGAINST STORE ACTIVITY** (the filing's `U12`, `CARRIED-OPEN`) | **every expectation about a store write or delete landing from ANOTHER caller through the store's own verbs WHILE AN ATTEMPT IS OPEN: (i) whether it appears in any `triggered` set an attempt reads; (ii) whether the attempt's per-op rollback composition's store-side reach touches it; (iii) whether the attempt's evaluation sees it at all. THIS ENTRY BLOCKS THOSE THREE AND NOTHING ELSE** — **the KERNEL'S OWN window edges are DERIVED and not owed** (`attempt-lifecycle.md §2.4` item 6 (A)), so **no scenario above needs this entry, and none of the `16` drives a second caller inside an open attempt** (`§1` item 6; `E2E-C-15`'s two attempts are ONE caller's own, which `§1` item 6's own amended clause states) — **AND THE ONE DRIVE THIS ENTRY ONCE CARRIED IS WITHDRAWN FROM IT BY NAME — `A106` `Q2` DECLARES THE SECOND TOP-LEVEL `K-2` AT A DIFFERENT ADDRESS LEGAL AND REACHABLE AND REQUIRES IT DRIVEN: it is `E2E-C-16` BELOW, so the class this entry used to name here (a second external-surface call standing open while another is open, which a single-threaded binding reaches only by a RE-ENTRANT `K-2` and not concurrently) IS NEITHER OWED NOR PARKED — `e2e-scenarios.md`'s own `G-7`, the drive this entry's subject was said to owe, is DISCHARGED — AND THIS ENTRY'S SUBJECT NARROWS TO ITS OWN THREE STORE-SIDE EXPECTATIONS, which no kernel-side act produces and which no scenario of this battery therefore drives (`A: docs/decisions.md` · `A106` `Q2`; `VG-2`; `VG-6`; `DB-2`)** | **owner: the architect, then this contract** — then the phase-`B2` reconciliation. **Positive revisit condition: a ruling recorded as an ACTIVE `docs/decisions.md` row on the attempt's window edges, or phase `B2`'s reconciliation of this contract against the landed plan.** **No clause of this directory settles it, and the store's `OWED` seam `J-20`–`J-22` is NOT this entry and is NOT moved by it** (`contract.md §0.1` item 5 (ii); `A: docs/specs/storeroom-native/contract.md §7.3` clause 3) |
| **`EO-2`** | **THE JOURNAL'S SCOPE AND LIFETIME AS A CALLER-SIDE ATTEMPT'S REFERENT** (the filing's `U15`, `CARRIED-OPEN`) | **every expectation about the journal's own extent BEYOND what `A7` supplies: what a caller-side attempt may reference from it, and how long such a reference stands.** **The op's crossing as a returned value on every write IS derived and is NOT owed** (`A: docs/specs/storeroom-native/write-and-read.md §6.3` — *"the op CROSSES as a returned value on every write"*), **so `E2E-C-2`, `-C-9` and `-C-13` read their `opId`s from verb returns and need no journal enumeration** | **owner: the architect**, and **this contract declares the attempt record caller-side and INHERITS NO JOURNAL REFERENT.** **Positive revisit condition: a ruling recorded as an ACTIVE `docs/decisions.md` row on the journal's scope and lifetime.** **No clause of this directory re-declares the journal or reads it: `rollback` is its only consumer** (`contract.md §0.1` item 5 (iii); `P: §B.4`; `A: docs/specs/storeroom-native/write-and-read.md §6.3`) |

**AND THE FOUR RULINGS THE GATE-2 RE-REVIEW PARKED STAND THE SAME WAY, ONE HOME AND NOT TWO — AND `2` OF THE
FOUR NOW READ `ANSWERED`:**
**`RC-3` (the closed-attempt store's retention and its eviction arm) · `RC-14` (the per-op rollback's
subtree-wide collateral reach) · `RC-18` (two live attempts at nested addresses) · `RC-19` (the finite
bound's authority) — each stands as an `OWED` ROW AT `contract.md §0.1` item 5 (v), OWNER THE ARCHITECT, and
each is therefore NOT re-printed here: this document POINTS at the four rows rather than minting a second copy
of them, because two homes for one `OWED` row is two authorities** (`RC-3`; `RC-14`; `RC-18`; `RC-19`).
**`RC-14` AND `RC-18` WERE `OPEN — awaiting the architect` AND NOW READ `ANSWERED`, BY THE ARCHITECT'S RULING
OF 2026-10-13 RECORDED AS `A: docs/decisions.md` · `A102`** — **`RC-14` by `D1`: the collateral reach is the
ruled end state and it is bounded by the checkpoint; `RC-18` by `D4`: nested attempts across addresses are
admitted and the boundary between them is that same checkpoint** — **so this document's pointer at those two
rows points at ANSWERED rows, and their landing sites are `composition-and-states.md §2.6` item 8, `contract.md §5.7`
and this battery's own re-derived `E2E-C-2`/`E2E-C-9` and added `E2E-C-15`.** **`RC-3` AND `RC-19` REMAIN
`OPEN — awaiting the architect`, unchanged and still PARKED.** **AND NO SCENARIO ABOVE DEPENDS ON EITHER OF
THE TWO STILL-OPEN ROWS:**
**`E2E-C-11` and `E2E-C-14` observe the closed attempt through `K-5` and never ask how long the kernel keeps
it (`RC-3`); and no scenario needs a bound's authority, because the finite bound is derived from `ran` and
`appliedRepairs` alone (`RC-19`).** **AND THE TWO ANSWERED ROWS' SUBJECTS ARE NOW DRIVEN RATHER THAN ONLY
POINTED AT, STATED SO THE READER SEES WHY THE BATTERY GREW: `E2E-C-2` and `E2E-C-9` read every rollback step
through the store's own returned members AND their own `checkpoint` member, so the collateral reach is read
with the bound the ruling supplies (`RC-14`), and `E2E-C-15` drives two live attempts at nested addresses —
the cross-address, re-entrant case the ruling admits (`RC-18`); this document no longer needs a
SINGLE-ATTEMPT-AT-AN-ADDRESS claim to stand over it as a substitute for the ruling.**

**AND WHAT IS *NOT* IN THIS LIST, STATED SO ITS ABSENCE IS AUDITED AND NOT ASSUMED:** **the store-side
`OWED` seam `J-20`–`J-22` (the evaluation's timing, what the core must expose, and whether a repair writes
through the journaled write path) is NOT an entry of this list, because NO scenario above depends on any of
the three: every scenario's writes and rollbacks are composed through the store's DECLARED verbs, and the
repair's channel is declared at `kernel-surface.md §2.3` item 2 as the caller's own `write`/`delete`
regardless of `J-22`'s answer** (`A: docs/specs/storeroom-native/contract.md §7.3` clause 3;
`fail-surface.md §3` item 3). **AND THE SENTENCE THAT ONCE STOOD HERE — *"because NO scenario above depends on any of the three"* — IS WITHDRAWN BY NAME AT THE GATE-5 BLIND-RUN ADJUDICATION OF 2026-10-13: `3` CELLS OF THIS BATTERY DEPEND ON `J-21`, the evaluation's timing relative to the landing, and each is `OWED` WITH IT, owner THE ARCHITECT and positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row on the store-side evaluation seam, followed by a bounded amendment of `docs/specs/storeroom-constraints/`* (`contract.md §0.1` item 5 (i), where the `OWED` STANDS and the pass's layer is ruled; `live-greens.md`'s `CON-1`): **(a)** THIS document's `E2E-C-2` step (7), whose no-checkpoint arm is read `null` ONLY BECAUSE the per-landing pass that could have left a valid state has not been built — so its observation is `null`-green at the store-side layer and its own premise (*"EVERY WRITE IS CHECKED ATOMICALLY AS IT LANDS"*) is a STORE-SIDE OBLIGATION it states and does not observe; **(b)** `e2e-scenarios-b.md`'s `E2E-C-9` step (5) and **(c)** `e2e-scenarios-b.md`'s `E2E-C-15` steps (4)/(5), whose non-null `checkpoint` readings are the same `OWED` arm — AND NO DRIVE OF THESE `3` CELLS MAY READ A NON-NULL `checkpoint` OFF A CLOSED CALLER-SIDE SURFACE UNTIL THAT PASS LANDS.** **NO FIGURE OF THIS BATTERY MOVES: `16` SCENARIOS (`15 + 1 = 16` ✓) × `7` CELLS `= 112` ✓, `8 + 8 = 16` BY CARRIER, AND THIS LIST'S OWN ENTRY COUNT IS UNMOVED — the `OWED` cell is `contract.md §0.1` item 5 (i)'s and is CITED here and minted nowhere.** **And the re-derived plan cell of `VF-16` is not an entry either: it is a DUTY
of the phase-`B2` pass recorded in this directory's index region, and no scenario depends on it.** **AND
NEITHER ARE THE FOUR ARCHITECT-OWNED RULINGS ENTRIES OF THIS LIST** (`RC-3`; `RC-14`; `RC-18`; `RC-19`):
**they stand at `contract.md §0.1` item 5 (v) with the architect named, `2` of them now reading `ANSWERED`
(`RC-14`; `RC-18` — by `A102`'s `D1`/`D4`) and `2` still `OPEN — awaiting the architect` (`RC-3`; `RC-19`),
this document points at them and does not re-print them, and the paragraphs above name what each would have
blocked and why no scenario above needs the two still open.**

---

**END OF THE BATTERY.** **`16` scenarios (`E2E-C-1`…`E2E-C-16`) · `7` mandatory cells each (`16 × 7 = 112`
(`EO-1`, `EO-2`), each owner-named and each with a positive revisit condition · **`4` architect-owned rulings
standing as `OWED` rows at `contract.md §0.1` item 5 (v) and POINTED AT here rather than re-printed (`RC-3`,
`RC-14`, `RC-18`, `RC-19`) — `2` of them, `RC-14` and `RC-18`, now `ANSWERED` by `A102` and driven by this
battery's re-derived `E2E-C-2`/`E2E-C-9` and its added `E2E-C-15`, and `2` of them, `RC-3` and `RC-19`, still
`OPEN — awaiting the architect` — so the directory's bare `OWED`
count closes at `0` with `2 + 4 = 6` owned rows named and `0` unowned; and the split of the four is printed as
its own arithmetic: `2` ANSWERED + `2` OPEN = `4` ✓** · `0` `INFERRED` expectations
(the first writing's two are now DERIVED — `E2E-C-10` — and CLOSED BY A DECLARED REFUSAL — `E2E-C-14`) · `0`
scenarios starting at an internal seam · `0` scenarios stopping before the resolved end state · `0`
scenarios lacking a stated falsifier · `0` store-side orders claimed · `0` reaches claimed past a compacted
base · `0` observations requiring a member no record declares — **`appliedRepairs` is read only off the NINE-MEMBER open `AttemptRecord` (`E2E-C-11`), `K-3`'s stale record is answered by `KC-2` (`E2E-C-14`), and `checkpoint` is read only off the SIX-MEMBER `RollbackStep` (`E2E-C-2`, `E2E-C-9`, `E2E-C-15`), so the count closes at `0`** (`NX-1`; `RD-4`; `RD-9`) · `0` test assertions authored.** **AND THE CARRIER EACH IDENTIFIER OF THIS CENSUS STANDS IN IS NAMED HERE ONCE, SO NO BARE `E2E-C-<n>` ABOVE RESOLVES BY GUESSWORK (`VM-7`): `E2E-C-9` … `E2E-C-16` stand at `docs/specs/storeroom-constraints/e2e-scenarios-b.md` and `E2E-C-1` … `E2E-C-8` stand HERE, `8 + 8 = 16` ✓ — the identifiers unmoved and the paths alone re-spelled** (`contract.md §0`'s re-spelling list item `32`)** (`[T: the census's own carriers, named at the census so a bare identifier resolves | CENSUS]`).**
## §4. `A112` DELIVERY-MODEL RE-SPELL, 2026-10-13

**THE RULING THIS SECTION RECORDS IS `A: docs/decisions.md` · `A112` — the architect's own words of 2026-10-13: *"The Rust store returns the handles, and then the JS surface functions run first the constraints and then, after all constraints pass, any other listeners before returning to the calling process. On a write, all constraints need to be run again anyway so all triggered constraints need to be run, sifting pending out of the set is not needed. Write the entire returned set of triggered constraints as pending and check off as they pass. Likewise, all listeners are not run until the constraints pass, so all listeners are pending on every write."* — AND THIS SECTION NAMES THE SITES THIS DOCUMENT RE-SPELLED FOR IT. It restates no standing scenario and moves no figure.**

1. **`E2E-C-1`, ITS CELL 7 — THE ORDERING CLAUSE'S DELIVERY TERM.** **WHAT MOVED: the phrase *"the caller's own delivery of the attempt's pending handles"*.** **IT STANDS NOW:** the rule of `attempt-lifecycle.md §2.4` item 5 (iii)/(iv) is read with **the store returning the handles and invoking nothing, and the invocation being the JS surface's own ordered layer — the triggered constraints first, each entry checked off as it passes, and the other listeners once every constraint has passed, the calling process receiving the call only after both**; **what the cell pins — the constraint pass completing before the caller disposes of the attempt's handle set, read off the log's `seq` and the `outcome` entry — is BYTE-FOR-BYTE the same, and cells 1–6 of that scenario are untouched.**
2. **`E2E-C-8` — PARITY BETWEEN THE APP'S OWN CALL AND THE APP'S LISTENER BODY: ITS EXPECTED OBSERVATION AND ITS FALSIFIER, RE-DERIVED, at that scenario's cell (5) and cell (6), which carry the re-derivation.** **WHAT MOVED:** window (β)'s listener body read as if the caller's loop were its layer's only invoker, and the member's reading left as a subset. **IT STANDS NOW:** **within window (β) the listener body's own `commit`/`runAttempt` sequence is reached by THE JS SURFACE'S OWN ORDERED LAYER — the constraints first, each entry checked off as it passes, the other listeners once every constraint has passed — and NOT by any store act** (`A112`), so the parity read is **between two call sites of the SAME surface and not between a store act and a caller act**; **the compared members are unchanged** — the `CommitRecord` members `attempt`/`op`/`triggered` of one SHAPE, and `AttemptReport.outcome`, the `ops` kind sequence and the `log`'s length and `kind`/`id`/`state` sequences read EQUAL across the two windows, with `message` strings excluded as before; **and `CommitRecord.pending`, read in either window, carries THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS with each entry leaving it only by being checked off as it passes** — the caller's own loop invoking whatever remains being **ONE invoker among the surface's layers and never the only one.** **Its falsifier is re-derived with it — the two added members are a `pending` that OMITS any handle of the set the write returned (a sifted subset), and a `pending` read as carrying a listener the constraints have not yet passed — and cells 1–4 and cell (7) of that scenario are untouched.**
3. **THE ROWS OF THIS DOCUMENT LEFT UNTOUCHED BY THIS PASS, WITH THE REASON.** **`E2E-C-2` … `E2E-C-7` carry no term the ruling moves** — they drive the arm table, the repair arms, the repeat rule, the registry's disposal, the function's side and the log's own order, and **not one of their steps or observations reads a `pending` member, a listener status, a filter or a subset** — so **no cell of theirs is re-spelled and their expected observations stand BYTE-FOR-BYTE.** **`E2E-C-9` … `E2E-C-16` stand in the carrier part `e2e-scenarios-b.md`, and the rows the ruling reaches there — `E2E-C-10` and `E2E-C-16` — are re-derived at that part's own dated section, cited here and not restated.**
4. **NO FIGURE OF THIS DOCUMENT MOVES.** **The battery's `16` scenarios, the `7`-cell schema of each, this document's `8` (`E2E-C-1` … `E2E-C-8`) and its carrier's `8` (`8 + 8 = 16` ✓), the `112` cells (`16 × 7 = 112`) and the `12` repair-return sites on `11` windows (`7 + 5 = 12` ✓) are all UNMOVED: this section adds no scenario, no cell and no census.**

**END OF THE `A112` DELIVERY-MODEL RE-SPELL SECTION.** **⟶ AND NO BYTE OF THIS DOCUMENT MOVED AT THIS PASS, AND `RCA-8(g)` WAS CONSIDERED AND NOT INVOKED.** **THE SUPERSEDED SPELLINGS THIS PASS NAMES ARE WITHDRAWN BY NAME IN PLACE AND ENUMERATED IN `§4` ABOVE; they total well under `1` KB, and this pass's own added text is the delta section and the two re-derived cells — so NO ARCHIVAL MOVE WAS RUN, NOTHING IS MOVED OUT, AND NO ONE-LINE POINTER STANDS FOR THIS PASS.** **THE PER-PATH VOLUME READING THAT WOULD DECIDE OTHERWISE IS `OWED` TO A PASS WITH A SHELL: THIS WALL CARRIES NONE, SO NO BYTE FIGURE IS PRINTED HERE** (`RCA-8(g)`: move out, leave a one-line pointer, never retain beside — NOT INVOKED; `DEF-2026-10-13-H`/`-I`'s volume rows carry the readings that were taken).

**Nothing was run: this document is derived from
`docs/specs/storeroom-constraints/contract.md`, its parts and the filing's rulings, and from nothing else**
(`[T: this document's own closing census, printed with its terms | CENSUS]`).**⟶ PROVENANCE MOVED 2026-10-13 (the gate supervisor's applier act, the volume remedy) — RECOVERED AT `archive/spec-history/2026-10-13-recovered-provenance.md`; the move, the `32` recovered lines and the `24` lost per-pass HISTORY notes (≈`5,000` B, `0` B of rule) are declared there and at `docs/defects.md` `DEF-2026-10-13-J`. NO RULE MOVED OR WAS LOST.**
