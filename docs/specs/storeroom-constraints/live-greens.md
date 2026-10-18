# LIVE GREENS — the blind green-scenario set for `U-STOREROOM-CONSTRAINTS` (`role_blind_test_writer`, GATE 5)

**ROLE.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE** — from
`docs/specs/storeroom-constraints/**` (`contract.md`, `kernel-surface.md`, `attempt-lifecycle.md`,
`composition-and-states.md`, `parameter-semantics.md`, `fail-surface.md`, `e2e-scenarios.md`,
`e2e-scenarios-b.md`, `proposal.md`, `adoption-dossier.md`, `implementation-plan.md`) **plus the store's own
documents** (`docs/specs/storeroom-native/**`, `docs/specs/storeroom-js/**`). **NO BYTE OF
`bindings/js/src/**` WAS READ, AND NO FILE OF `bindings/js/test/constraint-kernel*` WAS READ.** The kernel is
reached ONLY through its declared caller-side ESM entry, as a consumer.

**THE RUNNER, AND WHERE IT STANDS.** The scenarios are driven by
**`bindings/js/greens/blind-constraints-v2.mjs`** (the only other byte this pass wrote), the house
convention's greens home (`bindings/js/greens/*.mjs`) for a unit whose specs live at
`docs/specs/storeroom-constraints/`. **RUN:** `node bindings/js/greens/blind-constraints-v2.mjs` from the
repository root. Every handler body is FUNCTION DATA handed to the kernel through `K-1`; the fixture is the
store package's own `storeCreate(cfg)`; temporary stores live under
`fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-blind-'))`. The runner's exit code is `0` and its figures are
printed by its closing `TOTALS` line and its `FAILED CELLS` block.

**A THROW AT A STEP IS AN OBSERVATION AND NEVER A PASS.** The runner catches an undeclared throw, records it
as one additional `FAIL` naming the thrown form's `status`, and continues to the next scenario. A run failure
is a doc/spec drift OR an un-hardened regression — it is never read as a pass.

**THE HONEST-SET RULE.** Every cell below prints the observable that would make it RED, the doc path and `§`
that pins it, and the value the run produced. **A cell a blind driver cannot drive from the documentation is
written and MARKED `NOT DRIVABLE BLIND — <reason>`: that marking is the finding and never a pass.**

**HOW TO READ AN OP ID.** `op-N` ordinals are minted by the store in execution order and are therefore not
reproducible across runs; **what each cell asserts is an IDENTITY (`opId === opId`) or a COUNT, and never the
ordinal.** Every observed value below is one run's own rendering of an identity or a count.

---


## §1. THE SCENARIOS, AND THE RUN'S OWN FIGURE

| id | the scenario | start point (a real user input / external event) | final resolved state | cells | verdict |
| --- | --- | --- | --- | --- | --- |
| `E2E-C-1` | the happy path: one constraint passes and the attempt resolves | a caller registers one pair at `['a']` and commits an admitted value there | `K-3` returns the `passed` arm; `K-4`/`K-5` read the closed attempt back | 8 | **RAN · 8 PASS** |
| `E2E-C-2` | a two-op failing attempt: the unrepaired violation fails it and the composition rolls both ops back | a caller commits a value that violates a pair whose repair runs and whose re-run then violates a pair carrying no repair | `K-3` throws `KC-6`; the composition issues ONE CALL PER STILL-OWED OP in item 2's declared order, with item 5 (a)'s skip; the failed commit's `storeroom-native` undo reach is read back | 10 | **RAN · 9 PASS · 1 FAIL** |
| `E2E-C-3` | a successful repair: the re-run passes and the attempt resolves | a caller commits an over-large value whose repair clamps it in place | `K-3` returns `passed` with two ops and a four-entry log | 7 | **RAN · 7 PASS** |
| `E2E-C-4` | a failed repair: KC-4, and what was attempted is in the log | a caller commits an over-large value whose repair returns `{ok:false, message}` | `K-3` throws `KC-4` with the attempt's own three-entry log | 7 | **RAN · 7 PASS** |
| `E2E-C-5` | the first-repeat rule, driven on BOTH limbs in three windows: KC-6, KC-6 and KC-5 | three separate windows at one address, each with a pair whose repair lands a value another pair then violates | `KC-6` (alpha), `KC-6` (beta), `KC-5` (gamma); a second `K-3` is `KC-2` | 9 | **RAN · 9 PASS** |
| `E2E-C-6` | two registrations at one address, the pair's idempotence, and the KC-7 / KC-2 halves | a caller registers two pairs at one address, calls a second `K-2` there while the first attempt stands OPEN, and calls a further `K-2` AFTER that attempt's own terminal arm | `KC-7` while the address is HELD and a FRESH `CommitRecord` once the hold is released by the attempt's own terminal arm; `KC-2` on the stale record | 8 | **RAN · 8 PASS** |
| `E2E-C-7` | the function's side, the log's own order, and a comparison that can fail | a caller registers a pair at an ancestor and one at a descendant, then commits an object | one pair reaches two different outcomes for two different values | 7 | **RAN · 7 PASS** |
| `E2E-C-8` | parity between the app's own call and the app's listener body | a caller registers a store listener at the address, commits there; its own loop then reads `pending` | both windows resolve `passed`; the caller's own loop is layer (b)'s ONE invoker, and its work is the `pending` member's own declared duty | 6 | **RAN · 4 PASS · 1 FAIL · 1 NOT DRIVABLE BLIND** |
| `E2E-C-9` | the compacted floor: the composition reports what it performed and nothing wider | a caller commits a value whose repair lands outside its address while a second pair has no repair, the store's own `journalLength` putting a compacted entry inside the attempt's own call's reach | the composition meets the floor on a still-owed op: the store answers `RollbackCompacted`, the kernel reports `KC-8`, and the walk stops at that call | 9 | **RAN · 9 PASS** |
| `E2E-C-10` | the same attempt, delivered two ways: parity is required on every member | one window drives the caller's own call, the other the delivery layer, on the same pair and value | no common reader exists: alpha is `KC-3`, the beta window's report is refused `KC-7` | 7 | **RAN · 1 FAIL · 6 NOT DRIVABLE BLIND** |
| `E2E-C-11` | the marker is per-attempt: a second attempt runs the same repair again | two separate commits at one address, each over a pair whose repair runs | both attempts resolve `passed`, each with its own repair-run entry | 7 | **RAN · 7 PASS** |
| `E2E-C-12` | refusals at K-1: the kernel's own channel, and a registry that does not move | a caller calls `K-1` with an out-of-domain address, an empty id and a non-function | three refusals, all the kernel's own tokens, registry unmoved | 7 | **RAN · 7 PASS** |
| `E2E-C-13` | two store codes at the caller's own verb calls, and the one asymmetry between them | a caller commits an out-of-domain tier, and a repair whose own write lands under a leaf | the store's own codes at the verb calls, NAMED inside the `repair-run` entry's `message`; `KC-4` from the kernel | 7 | **RAN · 7 PASS** |
| `E2E-C-14` | an unknown attempt reference, and the refusal that is not KC-7 | a caller reads `K-4`/`K-5` over a closed, an unknown and three outside references | `KC-2` from the readers, never `KC-7` | 7 | **RAN · 7 PASS** |
| `E2E-C-15` | a nested processing: the second top-level attempt at a DESCENDANT address | an outer processing at `['a']` and an inner one at `['a','b']`, the latter opened and driven FIRST through the same store | the inner attempt fails on its own address; the outer then fails on its own; the `checkpoint` member's non-null arm is `OWED` to the store-side pass | 8 | **RAN · 6 PASS · 2 FAIL** |
| `E2E-C-16` | the delivery layer, and the caller's own loop as its one invoker | a caller registers a plain store listener at `['a']`, commits at `['a','b']`, and its own loop reads `pending` | the caller's own loop IS the body's invoker and hands it THE TRIGGERING ADDRESS read back verbatim; the `pending` member's populated state and the second top-level attempt are both unread at this drive | 8 | **RAN · 1 PASS · 4 FAIL · 3 NOT DRIVABLE BLIND** |
| `SURFACE` | the unit's declared surface: five items and the caller's own store | the module's own export list, the store package's own namespace, and one end-to-end call | exactly five kernel items and eight store verbs | 3 | **RAN · 3 PASS** |

**`16` scenarios × `7` columns = `112`** cells. **A `7`-column cell is not one observable:** several collapse
two or three distinct observables into one row, and this greens set splits them into the cells a blind driver
can actually read — the table above prints each scenario's own count. **`112` printed cells is therefore NOT
the same figure as the `125` observables this file drives, and the difference is stated here rather than
reconciled:** the battery's `7` columns are a census of *kinds of evidence*, while a cell below is one
readable assertion. The battery also authored no executable test code of its own (the `e2e-scenarios*.md`
files carry their drives in prose), so this file records the run of the blind driver and nothing else.

**RUN FIGURES, FOR THIS PASS.** `17` rows (the battery's `16` scenarios + the surface row) = `125` cells, of
which **`106` PASS + `9` FAIL + `10` NOT DRIVABLE BLIND = `125`** ✓; runner exit `0`.

**PER-ROW ARITHMETIC, SO THE FIGURE IS CHECKABLE.** `8 + 10 + 7 + 7 + 9 + 8 + 7 + 6 + 9 + 7 + 7 + 7 + 7 + 7 + 8 + 8 + 3 = 125` ✓.

---

## §2. THE SCENARIOS, IN FULL

> **How to read a cell.** `[row.n]` is the cell's id, the line after it is the EXPECTED observation with the
> doc path and `§` that pins it, and the `observed:` line is the value THIS RUN produced. `PASS` means the two
> agree; `FAIL` means they do not, and every `FAIL` is carried again with its contradiction in `§3`;
> `NOT DRIVABLE BLIND` means the cell is written and its reason printed, and is counted as neither.

### `E2E-C-1` — the happy path: one constraint passes and the attempt resolves

- `[E2E-C-1.1]` **PASS** — K-1 returns the store-machinery handle (a non-null opaque value)
  - cites: `kernel-surface.md §2.1 item 1`
  - observed: `handle typeof=object`
- `[E2E-C-1.2]` **PASS** — CommitRecord has exactly {attempt, op, triggered, pending}; attempt is {id: non-empty string}; op is the write's op
  - cites: `kernel-surface.md §2.1 item 2`
  - observed: `keys=attempt,op,pending,triggered attempt={"id":"attempt-1"} opId=op-1`
- `[E2E-C-1.3]` **PASS** — 'passed' (the success arm's ONE value) and the SAME attempt reference K-2 minted
  - cites: `kernel-surface.md §2.1 item 3; attempt-lifecycle.md §2.4 item 4 arm (a)`
  - observed: `outcome=passed keys=attempt,log,ops,outcome,rollback attempt-match=true`
- `[E2E-C-1.4]` **PASS** — ops has one member, in creation order, and it is the store's own op (opId equal to the write's)
  - cites: `kernel-surface.md §2.1 item 3; attempt-lifecycle.md §2.4 item 1`
  - observed: `ops.length=1 ops[0].opId=op-1 write=op-1`
- `[E2E-C-1.5]` **PASS** — rollback is [] (an empty list, never an absent member) and triggered is the write's own returned set
  - cites: `kernel-surface.md §2.1 items 2–3; composition-and-states.md §2.6 item 8 (i)`
  - observed: `rollback=[] triggered=1 pending=0`
- `[E2E-C-1.6]` **PASS** — the log is one constraint-check (id 'x', opId the write's op, state null) then one commit entry (id null, opId the last op); seq 1,2; six-member entries
  - cites: `kernel-surface.md §2.5 items 1–3`
  - observed: `shape=ok kinds=[constraint-check/x/null commit/null/null]`
- `[E2E-C-1.7]` **PASS** — the attempt context carries exactly {address, tier, value, attempt, op}, all verbatim: address [a], tier mem, value 1, the attempt id, the evaluated op
  - cites: `parameter-semantics.md §2.16; kernel-surface.md §2.3 item 1`
  - observed: `ctx={"address":["a"],"attempt":{"id":"attempt-1"},"op":"op-1","tier":"mem","value":1}`
- `[E2E-C-1.8]` **PASS** — K-4 returns the closed attempt's final log and K-5 its final report — the SAME list and the same five-member report
  - cites: `kernel-surface.md §2.1 items 4–5; parameter-semantics.md §2.5 observable`
  - observed: `log-equal=true report-equal=true`

### `E2E-C-2` — a two-op failing attempt: the unrepaired violation fails it and the composition rolls both ops back

- `[E2E-C-2.1]` **PASS** — K-2 returns a record whose op is the write it landed, and THE PASS WAS NOT EVALUATED BY THE COMMIT — the three registered pairs have run 0 times when K-2 has returned
  - cites: `e2e-scenarios.md E2E-C-2 step (2) read with step (3); kernel-surface.md §2.1 item 2`
  - observed: `record op=op-3 keys=attempt,op,pending,triggered; evaluations when K-2 returned: x=0 y=0 z=0`
- `[E2E-C-2.2]` **PASS** — the pass over op1 evaluates ['a']'s pairs in first-registration order and STOPS AT THE FIRST VIOLATION: x, then y (whose repair runs and lands its own op), and the re-run then halts at x — so z, registered last, is never reached
  - cites: `attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 1`
  - observed: `evaluations: x=2 y=1 z=0 (z never reached); repair's op=op-4 write op=op-3`
- `[E2E-C-2.3]` **PASS** — the attempt fails by THROWING {status, message, log} and never by returning
  - cites: `fail-surface.md §1.1 items 1 and 4`
  - observed: `threw=true keys=log,message,status`
- `[E2E-C-2.4]` **PASS** — status is the kernel's own KC-6 (the repeat violation by a pair already in appliedRepairs)
  - cites: `fail-surface.md §1.1 item 1; fail-surface.md §2; attempt-lifecycle.md §2.4 item 4 arm (e)`
  - observed: `status=KC-6`
- `[E2E-C-2.5]` **PASS** — the thrown form carries the message log, and its outcome entry's state is the SAME token
  - cites: `fail-surface.md §1.1 item 1 (c); kernel-surface.md §2.5 item 1`
  - observed: `log.len=5 outcome.state=KC-6`
- `[E2E-C-2.6]` **PASS** — the pair (['a'],'x') carries TWO constraint-check entries against TWO opIds (op1 then the repaired op) and never three, the repair ran ONCE, and the outcome entry closes the log; the whole log is 2 + 1 + 1 + 1 = 5 entries, pair (['a'],'z') never being reached
  - cites: `attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 3 limb (ii); e2e-scenarios.md E2E-C-2 item 5 (the observation that makes it PASS)`
  - observed: `kinds=[constraint-check/x/null constraint-check/y/null repair-run/y/null constraint-check/x/null outcome/null/KC-6] length=5`
- `[E2E-C-2.7]` **PASS** — the composition issues ONE CALL PER STILL-OWED OP, IN ITEM 2'S DECLARED ORDER (the repaired op's call first, the attempt's first op's call LAST, one call per op and never a second over one opId); every step carries all six members; and the step count is the calls ISSUED, which MAY RUN BELOW the list's size — an op an earlier call's own undoneOps already reports undone is no longer still owed and gets NO call
  - cites: `composition-and-states.md §2.6 item 2 (the call list, fixed when the composition begins) and item 5 (a) (the skip and the member-based test); parameter-semantics.md §2.17`
  - observed: `len=1 declaredList=["op-4","op-3"] steps=[{"opId":"op-4","ans":"ok","failed":false,"undone":["op-4","op-3","op-2"],"cp":null}] repair-op=op-4 write-op=op-3 caller's-earlier-op=op-2`
  - **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`), ON THE ARCHITECT'S TWO RULINGS OF THAT DATE, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."* — THIS CELL'S PASS STANDS AS THE RECORD OF WHAT THE BUILD DID, AND THE READING THAT MADE THAT RECORD A LAWFUL RESULT IS WITHDRAWN; THE OBSERVED BYTES ABOVE ARE RETAINED UNCHANGED, BEING THE DEFECT'S REPRODUCTION AND NOT A WARRANT (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`).** **WHAT THE RECORD SHOWS, READ CORRECTLY: `undone` carries `op-2`, THE CALLER'S EARLIER OP, which the attempt never created and which lies OLDER than the named op `op-4` — under the amended `M-5` that entry is OUT OF SCOPE, so a build that reverses it has OVERSHOT, and overshoot is a defect.** **SO THE CELL'S `PASS` IS A PASS OF ITS OWN NARROW CLAIM — one call per still-owed op, the member-based skip, the step count as calls issued — AND NOT OF THE `undone` VALUE'S LEGALITY; the `undone` value is the failure.** **AFTER THE STORE'S TEMPORAL FLOOR LANDS THE EXPECTED RECORD IS `undone:["op-4","op-3"]` WITH `op-2` ABSENT AND ITS VALUE AT `['a']` STILL READING** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii), the corrected reading's home).
- `[E2E-C-2.8]` **PASS — RE-CLASSED 2026-10-16: SEE THE MARK BELOW; THE ROW'S LAW IS WITHDRAWN AND ITS RECORD STANDS AS THE DEFECT'S** — THE STANDING LIMIT (A111, the failed commit's pre-state claim WITHDRAWN BY NAME): the composition's own calls reach the store's own reach, so the address stands where THE STORE'S OWN ANSWER left it — the read answers AddressNotFound where the CALLER'S OWN EARLIER value stood, and no step's undoneOps and no clause of this directory claims the caller's earlier write left standing
  - cites: `composition-and-states.md §2.6 item 8 (iii) (the withdrawal, the limit and A111); contract.md §5.7 (P-TP-7); docs/specs/storeroom-native/write-and-read.md §6.4 items 1/3/4 (M-5/M-7/M-8)`
  - observed: `read after failure = threw AddressNotFound (the caller's earlier write at ['a'] was 7, op op-2); report ops=["op-3","op-4"]; undone union=["op-4","op-3","op-2"] — THE STANDING LIMIT READ OFF THE STORE'S OWN ANSWER: the attempt's first performed call swept op op-2, an op THIS ATTEMPT NEVER CREATED, so the address's pre-existing write is deleted and read answers AddressNotFound where the caller's own earlier value stood`
  - **⟶ `RCA-8(g)`, 2026-10-16 (`role_spec_writer`): THIS CELL'S `PASS` IS RE-CLASSED AND THE STANDING-LIMIT DISPOSITION IT READS IS WITHDRAWN, ON THE ARCHITECT'S TWO RULINGS OF THAT DATE, VERBATIM: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*** **THE OBSERVED BYTES ABOVE ARE RETAINED UNCHANGED — THEY ARE THE DEFECT'S REPRODUCTION, AND THE OBSERVATION WAS TRUE WHILE ITS READING WAS WRONG: the run recorded what the build DID, and the build was DEFECTIVE** (`DEF-2026-10-02`: no whole-file rewrite, no `replace_all`). **WHY `PASS` CANNOT STAND: the cell's own claim is that *"no clause of this directory claims the caller's earlier write left standing"* — TRUE WHEN FILED, FALSE NOW: `composition-and-states.md §2.6` item 8 (iii) states the opposite and the store's amended `M-5` produces it, so the cell asserts a state the corpus FORBIDS.** **THE CELL'S RE-CLASSIFICATION AND ITS SUCCESSOR OBSERVABLE: the same window, driven against a store carrying the temporal floor, reads `read after failure === 7` at `['a']` — the seed STANDING — and `undone union === ["op-4","op-3"]` with `op-2` ABSENT; a run reproducing `AddressNotFound` there reproduces the OVERSHOOT and is a FAIL of the amended `M-5` and NOT a documentation update.** **WHAT STANDING LAW THE CELL MAY STILL DRIVE IS NARROWER AND IS NAMED SO THE ROW IS NOT LOST WITH ITS CLAIM: the union of the performed steps' `undoneOps` members is exactly the set the store reports reversed (`M-8`'s performed-set reading) and the composition claims no more than that — which the amended reach does not move.** **OWNER: `role_blind_test_writer`; POSITIVE REVISIT CONDITION: a re-measurement on a store carrying the amended `M-5`, in which the seed at `['a']` still reads its own value after the failed commit** (`A: docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16; `composition-and-states.md §2.6` item 8 (iii); `fail-surface.md §2`'s `KC-7` row as marked).
- `[E2E-C-2.9]` **FAIL** — the docs' own step (2) premise: `op1`'s landing VIOLATED `['a']`'s pair y AT ITS OWN LANDING — a write is checked atomically as it lands, which is what makes the checkpoint clause of step (7) and the whole checkpoint member meaningful — A STORE-SIDE OBLIGATION THIS CELL CANNOT OBSERVE AND MUST NOT READ AS SATISFIED
  - cites: `composition-and-states.md §2.6 item 8 (i)–(iii); parameter-semantics.md §2.17; contract.md §0.1 item 5 (i); e2e-scenarios.md E2E-C-2 step (7)`
  - observed: `OWED (the per-landing pass is the store-side pass J-20–J-22 declare; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): the live K-2 for this very window returned with the registered pairs evaluated x=0 y=0 z=0 times — the kernel runs NO constraint pass when a write lands, and every constraint-check entry of this attempt appears only at K-3's own pass. The landing that step (7) says VIOLATED pair y was never checked, so no landing of any attempt this drive opens can be recorded as one that "left every registered pair passing", and the null this window's checkpoint reads is the arm a caller-side drive reaches either way`
- `[E2E-C-2.10]` **PASS** — the failing pair (['a'],'x') is IN ran (it entered on op1) and NOT IN appliedRepairs (it carries no repair), so the attempt reaches arm (f): the ONE repair of this window belongs to (['a'],'y') and its repair-run count is 1, never 0
  - cites: `attempt-lifecycle.md §2.4 item 4's disjointness rule and arm (f); fail-surface.md §2's KC-5/KC-6 rows`
  - observed: `repair-run entries: y=1 x=0`

### `E2E-C-3` — a successful repair: the re-run passes and the attempt resolves

- `[E2E-C-3.1]` **PASS** — the re-run passes: outcome 'passed'
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (g); composition-and-states.md §2.7 item 6`
  - observed: `outcome=passed`
- `[E2E-C-3.2]` **PASS** — ops carries the write's op FIRST and the repair's op second, in creation order
  - cites: `attempt-lifecycle.md §2.4 item 1; composition-and-states.md §2.6 item 2`
  - observed: `ops=["op-5","op-6"]`
- `[E2E-C-3.3]` **PASS** — the repair context carries exactly {op, address, id, value, tier}: the violated pair and the value standing at the address
  - cites: `parameter-semantics.md §2.16; kernel-surface.md §2.3 item 2`
  - observed: `repair ctx={"address":["a"],"id":"x","op":"op-5","tier":"mem","value":99}`
- `[E2E-C-3.4]` **PASS** — the repair-run entry belongs to the pair, its opId is the op the repair produced, its state is null
  - cites: `kernel-surface.md §2.5 item 1 (the repair-run row)`
  - observed: `repair-run={"seq":2,"kind":"repair-run","id":"x","opId":"op-6","message":"the repair x landed op-6","state":null}`
- `[E2E-C-3.5]` **PASS** — the log's own message provenance: the constraint supplied its OWN string and it is carried WHOLE on its constraint-check entry; the repair's SUCCESS arm ({ok: true, op}) carries NO message, so the repair-run entry's text is the KERNEL's own generated sentence (and never a rewritten caller string)
  - cites: `kernel-surface.md §2.5 item 1 (the message table — the two provenances); fail-surface.md §1.1 item 2 (ii)`
  - observed: `constraint-check msg="value too large" repair-run msg="the repair x landed op-6"`
- `[E2E-C-3.6]` **PASS** — the log is constraint-check(x, op1) · repair-run(x, op2) · constraint-check(x, op2) · commit — one check per pair per pass
  - cites: `attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 1`
  - observed: `shape=ok kinds=[constraint-check/x/null repair-run/x/null constraint-check/x/null commit/null/null]`
- `[E2E-C-3.7]` **PASS** — rollback is [] on the success arm (the member exists and is empty)
  - cites: `kernel-surface.md §2.1 item 3; parameter-semantics.md §2.17`
  - observed: `rollback=[]`

### `E2E-C-4` — a failed repair: KC-4, and what was attempted is in the log

- `[E2E-C-4.1]` **PASS** — the attempt throws the kernel form with exactly {status, message, log}
  - cites: `fail-surface.md §1.1 item 1`
  - observed: `keys=log,message,status`
- `[E2E-C-4.2]` **PASS** — status is KC-4 and the thrown form's log differs from the open record's by TWO entries: the repair-run entry and the outcome entry
  - cites: `fail-surface.md §1.1 item 3; kernel-surface.md §2.5 item 1`
  - observed: `status=KC-4 kinds=[constraint-check/x/null repair-run/x/null outcome/null/KC-4]`
- `[E2E-C-4.3]` **PASS** — the repair-run entry's message carries WHAT WAS ATTEMPTED, verbatim from the repair's own return
  - cites: `kernel-surface.md §2.5 item 1 (the repair-run row); parameter-semantics.md §2.8`
  - observed: `repair-run={"seq":2,"kind":"repair-run","id":"x","opId":"op-7","message":"attempted to clamp at 5 and was refused","state":null}`
- `[E2E-C-4.4]` **PASS** — the repair ran exactly once for the pair, and no op was credited to the attempt
  - cites: `parameter-semantics.md §2.9`
  - observed: `repairRuns=1 ops=1`
- `[E2E-C-4.5]` **PASS** — the closed record K-5 returns carries that same final log and the failed outcome
  - cites: `kernel-surface.md §2.1 items 3,5`
  - observed: `report outcome=failed`
- `[E2E-C-4.6]` **PASS** — a thrown form's status is never a store member and the log's outcome state is the SAME token
  - cites: `fail-surface.md §1.1 item 1 (a),(c)`
  - observed: `status=KC-4 outcome.state=KC-4`
- `[E2E-C-4.7]` **PASS** — the store's own read at ['a'] answers the state that stood there before commit — here the write's own key was created by the rolled-back op, so the pre-state is the key's ABSENCE and the store's own answer is its AddressNotFound
  - cites: `composition-and-states.md §2.7 (the disposed state); contract.md §5.7 (P-TP-7); storeroom-native/write-and-read.md §2.2 (L-3)`
  - observed: `read=threw AddressNotFound`

### `E2E-C-5` — the first-repeat rule, driven on BOTH limbs in three windows: KC-6, KC-6 and KC-5

- `[E2E-C-5.1]` **PASS** — arm (f): the pair (['a'],'c1') is IN ran and NOT IN appliedRepairs, so the repeat carries the token its own limb names — KC-6
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (f); fail-surface.md §2's KC-6 row ("is NOT IN appliedRepairs ... NO repair is registered for it")`
  - observed: `status=KC-6`
- `[E2E-C-5.2]` **PASS** — the repeated pair's repair-run count is 0 and the repair that DID run belongs to (['a'],'c2') — the two limbs are disjoint on appliedRepairs
  - cites: `attempt-lifecycle.md §2.4 item 4 (the disjointness rule); fail-surface.md §2's KC-5 row`
  - observed: `kinds=[constraint-check/c1/null constraint-check/c2/null repair-run/c2/null constraint-check/c1/null outcome/null/KC-6]`
- `[E2E-C-5.3]` **PASS** — the repeated pair was evaluated twice, at two opIds, and its OWN violation count is 1 and never 2 — the first evaluation passed, the second violated
  - cites: `attempt-lifecycle.md §2.4 items 5 (ii),(iv); fail-surface.md §2's KC-6 row ("the pair's OWN VIOLATION count of 1")`
  - observed: `kinds=[constraint-check/c1/null constraint-check/c2/null repair-run/c2/null constraint-check/c1/null outcome/null/KC-6] c1-fn-runs=2`
- `[E2E-C-5.4]` **PASS** — the second window drives the SAME limb and the same token: KC-6, with (['a'],'cQ') in ran and out of appliedRepairs
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (f); e2e-scenarios.md E2E-C-5 item 5 (the observation that makes it PASS, (β)/() half)`
  - observed: `status=KC-6 cQ-fn-runs=2`
- `[E2E-C-5.5]` **PASS** — the two windows are DISJOINT on the two predicates and not one limb in two spellings: both read the pair IN ran and NOT IN appliedRepairs, and neither invoked a repair for the repeated pair
  - cites: `attempt-lifecycle.md §2.4 item 4's disjointness rule`
  - observed: `kinds=[constraint-check/cQ/null constraint-check/cP/null repair-run/cP/null constraint-check/cQ/null outcome/null/KC-6]`
- `[E2E-C-5.6]` **PASS** — arm (e): the repeated pair (['a'],'C1') IS IN appliedRepairs, so the token is KC-5 and the outcome entry's state is that same token
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (e); fail-surface.md §2's KC-5 row ("IS IN appliedRepairs before it")`
  - observed: `status=KC-5 outcome.state=KC-5 kinds=[constraint-check/C1/null repair-run/C1/null constraint-check/C1/null outcome/null/KC-5]`
- `[E2E-C-5.7]` **PASS** — no repair runs a second time: the repeated pair's repair-run count is exactly 1 and never 2
  - cites: `fail-surface.md §2's KC-5 row (its observable); e2e-scenarios.md E2E-C-5 item 5 (the observation that makes it PASS)`
  - observed: `C1 repair-runs=1 C1-fn-runs=2`
- `[E2E-C-5.8]` **PASS** — the attempt is closed on every failure arm, so the stale CommitRecord the caller still holds is refused KC-2 by a second K-3 — and never KC-7
  - cites: `kernel-surface.md §2.1 item 3 (RD-9); parameter-semantics.md §2.15`
  - observed: `second K-3 = KC-2`
- `[E2E-C-5.9]` **PASS** — the two limbs are DISJOINT on appliedRepairs alone and not on registration: the same address produced KC-6 where the pair's repair never ran and KC-5 where it had
  - cites: `attempt-lifecycle.md §2.4 item 4 (the disjointness rule, registration-keyed reading withdrawn by name); fail-surface.md §2 — the two rows`
  - observed: `limb tokens: (alpha)=KC-6 (gamma)=KC-5`

### `E2E-C-6` — two registrations at one address, the pair's idempotence, and the KC-7 / KC-2 halves

- `[E2E-C-6.1]` **PASS** — the pass evaluates the two pairs in first-registration order: A then B, each once, each at the write's op
  - cites: `kernel-surface.md §2.1 item 1 (order clause); attempt-lifecycle.md §2.4 item 5 (ii)`
  - observed: `kinds=[constraint-check/A/null constraint-check/B/null commit/null/null]`
- `[E2E-C-6.2]` **PASS** — each pair is evaluated exactly once in ONE pass (at most once per pass) — read off the FIRST attempt's own pass, before the second attempt's pass moves the counters
  - cites: `attempt-lifecycle.md §2.4 item 5 (iv)`
  - observed: `after the first attempt's own pass: A=1 B=1; totals after the second attempt's own pass: A=2 B=2`
- `[E2E-C-6.3]` **PASS** — BOTH halves of the two-state rule: (a) a second K-2 at the SAME address while the first attempt stands OPEN — the hold opening with K-2's own write verb and released only by the attempt's own terminal arm — is REFUSED with KC-7 BEFORE the write verb is reached; (b) a second K-2 at that address ONCE THE EARLIER ATTEMPT HAS REACHED ITS TERMINAL ARM is LAWFUL WHENEVER IT IS ISSUED and RETURNS A FRESH CommitRecord, no second act being needed beside the terminal arm
  - cites: `kernel-surface.md §2.1 item 2 (the hold's timing and both halves of the rule, read whole: the KC-7 refusal and the fresh record); fail-surface.md §2's KC-7 row; fail-surface.md §2's KC-2 row`
  - observed: `second K-2 while the attempt stood OPEN = KC-7; second K-2 after the terminal arm = returned a fresh record (attempt attempt-9 against attempt-8); its own K-3 = returned("passed"); stale K-3 = KC-2`
- `[E2E-C-6.4]` **PASS** — the stale record the caller still holds after a terminal arm is answered with KC-2 by K-3 and NEVER with KC-7, and no state moves: K-4 and K-5 over that same reference still return the closed record's log and report
  - cites: `kernel-surface.md §2.1 item 2 (RD-9, read whole); parameter-semantics.md §2.15`
  - observed: `second K-3 = KC-2; K-4 and K-5 over the same reference returned the attempt's own final log`
- `[E2E-C-6.5]` **PASS** — a re-registration at the SAME pair replaces the function, adds no second entry (one constraint-check entry)
  - cites: `kernel-surface.md §2.1 item 1 (pair idempotence); composition-and-states.md §2.7 item 2`
  - observed: `kinds=[constraint-check/A/null commit/null/null] replaced-ran=0 replacement-ran=1`
- `[E2E-C-6.6]` **PASS** — a re-registration at the same pair returns the SAME adopted handle (the store holds ONE entry at the address)
  - cites: `kernel-surface.md §2.1 item 1 (idempotence at the pair)`
  - observed: `two K-1 calls at pair (a,A) compared by identity`
- `[E2E-C-6.7]` **PASS** — the replacement's new function survives in the caller-side registry and nowhere else
  - cites: `kernel-surface.md §2.1 item 1 (CC-5)`
  - observed: `replacement=1 replaced=0`
- `[E2E-C-6.8]` **PASS** — a third id at the same address is appended AFTER every pair standing — the pass order is A then C
  - cites: `kernel-surface.md §2.1 item 1 (order clause)`
  - observed: `third registration appended last`

### `E2E-C-7` — the function's side, the log's own order, and a comparison that can fail

- `[E2E-C-7.1]` **PASS** — the pass over ['a'] evaluates exactly the pairs at the attempt's OWN address: the two at ['a'] and NOT the pair at ['a','b']
  - cites: `attempt-lifecycle.md §2.4 item 5 (iv)`
  - observed: `ctx a1=1 a2=1 checks=2`
- `[E2E-C-7.2]` **PASS** — the value the constraint read is the object the caller wrote, VERBATIM (the data the constraint confirms)
  - cites: `parameter-semantics.md §2.16; kernel-surface.md §2.3 item 1`
  - observed: `ctx.value={"n":1}`
- `[E2E-C-7.3]` **PASS** — op in the attempt context is the op WHOSE LANDING left the state the evaluation runs at — the write's own op
  - cites: `kernel-surface.md §2.3 item 1`
  - observed: `ctx.op=op-18 write=op-18`
- `[E2E-C-7.4]` **PASS** — every constraint-check entry names the op it evaluated and carries state null
  - cites: `kernel-surface.md §2.5 item 1 (the constraint-check row)`
  - observed: `kinds=[constraint-check/a1/null constraint-check/a2/null commit/null/null]`
- `[E2E-C-7.5]` **PASS** — K-4 over the OPEN attempt returns the open record's own log — read before K-3, it is empty and it is a LIST
  - cites: `kernel-surface.md §2.1 item 4; kernel-surface.md §2.3 item 1`
  - observed: `open log length at commit time = 0`
- `[E2E-C-7.6]` **PASS** — the SAME registered pair reaches DIFFERENT outcomes for different values: passed for 1, KC-3 for 9 — the comparison can fail
  - cites: `parameter-semantics.md §2.5 observable; attempt-lifecycle.md §2.4 item 4 arm (c)`
  - observed: `small=passed big=KC-3 values=1,9`
- `[E2E-C-7.7]` **PASS** — the kernel's own order is the log's seq and nothing store-side: seq strictly increasing from 1 in both attempts, no entry carrying a member outside the six
  - cites: `kernel-surface.md §2.5 item 1 (order); attempt-lifecycle.md §2.4 item 5 (ii)`
  - observed: `small shape=ok big kinds=[constraint-check/v/null outcome/null/KC-3]`

### `E2E-C-8` — parity between the app's own call and the app's listener body

- `[E2E-C-8.1]` **PASS** — both windows resolve to the success arm for the same pair and the same value
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (a)`
  - observed: `alpha=passed beta=passed`
- `[E2E-C-8.2]` **PASS** — the two windows' ops are of equal length with equal kind sequences
  - cites: `e2e-scenarios.md E2E-C-8 item 5 (the observation that makes it PASS); kernel-surface.md §2.1 item 3`
  - observed: `alpha ops=["write"] beta ops=["write"]`
- `[E2E-C-8.3]` **PASS** — the two windows' logs have equal length and equal kind/id/state sequences
  - cites: `e2e-scenarios.md E2E-C-8 item 5 (the observation that makes it PASS); kernel-surface.md §2.5 item 1`
  - observed: `alpha=[constraint-check/x/null commit/null/null] beta=[constraint-check/x/null commit/null/null]`
- `[E2E-C-8.4]` **PASS** — rollback is [] in both windows and each window's attempt reference is its own
  - cites: `kernel-surface.md §2.1 item 3`
  - observed: `alpha attempt=attempt-15 beta attempt=attempt-16`
- `[E2E-C-8.5]` **FAIL** — the body the caller's own loop over `pending` invokes ran once, and the handle it was invoked from is a `CommitRecord.pending` member of the caller's own write — THE LOOP IS THE DELIVERY LAYER (b)'s ONLY INVOKER
  - cites: `kernel-surface.md §2.1 item 2 (the loop, the member's populated state and its declared extent); kernel-surface.md §2.2 item 2`
  - observed: `OWED (the pending member's POPULATED state is a DECLARED DUTY OF THE KERNEL and NOT the store-side pass J-20–J-22's; owner role_kernel_writer per kernel-surface.md §2.1 item 2, whose positive revisit condition is this very step, E2E-C-8 step (2)): loop entries=[] — the caller's own loop invoked NOTHING; triggered carries the listener=true but pending.length=0; the body ran 2x in total`
- `[E2E-C-8.7]` **NOT DRIVABLE BLIND** — the kernel's own window delivered its pass for the same write: the body's own attempt carries the one constraint-check entry the pair's pass appended
  - cites: `attempt-lifecycle.md §2.4 item 5 (iii); kernel-surface.md §2.1 item 2`
  - observed: `NOT DRIVABLE BLIND — the body was not handed control by the caller's own loop (the row's fifth observation — the `pending` member's populated state — is the OWED reading named there): pending was empty (triggered.length=1) and no invocation came from the loop, so the cell's two halves cannot be read beside one another as the docs read them`

### `E2E-C-9` — the compacted floor: the composition reports what it performed and nothing wider

- `[E2E-C-9.1]` **PASS** — the floor is met BY THE COMPOSITION'S OWN ACT on a still-owed op — the STORE'S own `journalLength` being the app's declared control over the journal's compression, repeated writes at ['a'] put a compacted entry inside the attempt's own call's reach — the store answers RollbackCompacted, the kernel reports KC-8, and NOTHING is restored
  - cites: `composition-and-states.md §2.6 item 5 (b) and item 8 (iv) (the floor's precedence); fail-surface.md §2 (KC-8); parameter-semantics.md §2.17`
  - observed: `status=KC-8 repairRuns=1 repairOp=op-31 commitOp=op-30 steps=[{"opId":"op-31","answer":"ok","failed":false,"undoneOps":["op-31"],"restoredTo":{"present":false},"checkpoint":null},{"opId":"op-30","answer":"RollbackCompacted","failed":true,"undoneOps":[],"restoredTo":{"present":true,"value":9},"checkpoint":null}]`
- `[E2E-C-9.2]` **PASS** — the failing call's step carries the store's own code as its `answer`, its `undoneOps` is an EMPTY list (the floor is ALL-OR-NOTHING and never partial), its `restoredTo` is the state the addressed subtree stood at, and THE WALK STOPS AT IT — every step after the failing one is absent, so the `rollback` member's LAST element is that failing call's step
  - cites: `fail-surface.md §2's KC-8 row; parameter-semantics.md §2.17; storeroom-native/write-and-read.md §6.4 items 2 (M-6) and 5`
  - observed: `steps=[{"opId":"op-31","answer":"ok","failed":false,"undoneOps":["op-31"],"restoredTo":{"present":false},"checkpoint":null},{"opId":"op-30","answer":"RollbackCompacted","failed":true,"undoneOps":[],"restoredTo":{"present":true,"value":9},"checkpoint":null}]`
- `[E2E-C-9.3]` **PASS** — the attempt has ONE `outcome` entry, it carries KC-8, and the floor appends NO second one
  - cites: `composition-and-states.md §2.6 item 6 (a); fail-surface.md §2's KC-8 row; attempt-lifecycle.md §2.4 item 8 (ii)`
  - observed: `log=[constraint-check/x/null repair-run/x/null constraint-check/x/null constraint-check/y/null outcome/null/KC-8] outcomeEntries=1 failingStep={"opId":"op-30","answer":"RollbackCompacted","failed":true,"undoneOps":[],"restoredTo":{"present":true,"value":9},"checkpoint":null}`
- `[E2E-C-9.4]` **PASS** — the floor meets the STILL-OWED op's call and never the checkpoint op: the checkpoint member is null on every step of this attempt (no landing left the address valid), so no call of this walk stands over a stop op
  - cites: `composition-and-states.md §2.6 item 8 (iv) and (iii); parameter-semantics.md §2.17`
  - observed: `checkpoints=[null] declaredList=["op-31","op-30"] performed=["op-31","op-30"]`
- `[E2E-C-9.5]` **PASS** — the composition is per-op over the attempt's OWN ops and reports exactly the calls it PERFORMED — each step six members, in performed order, every performed opId drawn from ITEM 2'S DECLARED CALL LIST, one call per op and never two over one opId
  - cites: `composition-and-states.md §2.6 item 2 (the call list) and item 5 (a); parameter-semantics.md §2.17`
  - observed: `steps=["op-33","op-32"] declaredList=["op-33","op-32"] status=KC-3`
- `[E2E-C-9.6]` **PASS** — the union of the steps' undoneOps is the reach the composition actually had, and no wider: it names every op the attempt OWED — the ones it performed AND the ones an earlier call's own undoneOps already reported undone (item 5 (a)'s skip and its member-based test)
  - cites: `parameter-semantics.md §2.17 observable; composition-and-states.md §2.6 item 5 (a)`
  - observed: `union=["op-33","op-32"] declaredList=["op-33","op-32"] ops=["op-32","op-33"]`
- `[E2E-C-9.7]` **PASS** — no op is passed to the store verb twice, and no call of the walk comes AFTER a call that had already undone it
  - cites: `composition-and-states.md §2.6 item 4 (the guard) and item 5 (a) (the skip); parameter-semantics.md §2.17 outside values`
  - observed: `performed set checked pairwise against the calls that preceded each one`
- `[E2E-C-9.8]` **PASS** — all steps of one attempt carry IDENTICALLY the attempt's one checkpoint value (one op or null on every step)
  - cites: `parameter-semantics.md §2.17; composition-and-states.md §2.6 item 8`
  - observed: `checkpoints=["null"]`
- `[E2E-C-9.9]` **PASS** — the checkpoint names the OP whose landing left the state valid — an op, never a pair key, and never an op the walk passed to the store verb
  - cites: `composition-and-states.md §2.6 item 8 (iii) (A104: the checkpoint may name an op ANOTHER attempt landed)`
  - observed: `checkpoint values=[null]`

### `E2E-C-10` — the same attempt, delivered two ways: parity is required on every member

- `[E2E-C-10.1]` **FAIL** — both windows fail on the same arm: the same status token, read off the form each caller caught
  - cites: `fail-surface.md §1.1 item 1 (c)`
  - observed: `alpha=KC-3 beta=undefined (the beta window's own report is refused KC-7: see cell 7) — the two windows diverge because the beta window's own delivery layer never ran the constraint pass: pending.length=0 against triggered.length=1`
- `[E2E-C-10.2]` **NOT DRIVABLE BLIND** — outcome equal, ops of equal LENGTH with equal kind sequences
  - cites: `e2e-scenarios-b.md E2E-C-10; kernel-surface.md §2.1 item 3`
  - observed: `NOT DRIVABLE BLIND — the beta window has no record to compare against: its own report was refused KC-7 because the attempt never reached a terminal act of its own (cell 7), so this member pair cannot be read beside alpha's`
- `[E2E-C-10.3]` **NOT DRIVABLE BLIND** — log of equal length with equal kind/id/state sequences
  - cites: `e2e-scenarios-b.md E2E-C-10; kernel-surface.md §2.5 item 1`
  - observed: `NOT DRIVABLE BLIND — the beta window has no log to compare: its own report was refused KC-7 (cell 7). alpha's own log reads [constraint-check/x/null outcome/null/KC-3]`
- `[E2E-C-10.4]` **NOT DRIVABLE BLIND** — rollback of equal length, each step six members with equal answer/failed and the same undoneOps membership
  - cites: `parameter-semantics.md §2.17; e2e-scenarios-b.md E2E-C-10`
  - observed: `NOT DRIVABLE BLIND — the beta window has no composition to compare (cell 7): its own report was refused KC-7`
- `[E2E-C-10.5]` **NOT DRIVABLE BLIND** — the instrument each window read is NAMED: both are the kernel's own five-member record read through K-5, not a store structure
  - cites: `kernel-surface.md §2.1 item 5; fail-surface.md §1.2 item 4`
  - observed: `NOT DRIVABLE BLIND — the beta window's record was never returned: K-5 over that still-open attempt threw KC-7, so no five-member record of the beta window exists to name (cell 7)`
- `[E2E-C-10.6]` **NOT DRIVABLE BLIND** — message strings may differ where the kernel's own text names the trigger's arguments — and both are non-empty kernel sentences
  - cites: `e2e-scenarios.md E2E-C-8 item 5 (the observation that makes it PASS); fail-surface.md §1.1 item 2 (i)`
  - observed: `NOT DRIVABLE BLIND — the beta window produced no thrown form of its own: its attempt never reached a terminal act (cell 7). alpha's own sentence reads "too large", non-empty and the kernel's own`
- `[E2E-C-10.7]` **NOT DRIVABLE BLIND** — the beta window's store delivery came through the caller's own loop, and the two windows' answers are one token
  - cites: `kernel-surface.md §2.1 item 2 (the loop is layer (b)'s only invoker)`
  - observed: `NOT DRIVABLE BLIND — the caller's own loop over pending invoked 0 handle(s) at this build (pending.length=0, triggered.length=1), so the beta window's delivery is not reachable from the documented seam; and the beta attempt never reached a terminal act of its own, so its own report is refused KC-7 and the two windows' answers cannot be compared as the docs compare them. Observed: alpha=KC-3 (through the constraint pass), beta=undefined (through the un-reached delivery); the two are not one token at this build`

### `E2E-C-11` — the marker is per-attempt: a second attempt runs the same repair again

- `[E2E-C-11.1]` **PASS** — the FIRST attempt resolves passed with its own repair-run entry
  - cites: `attempt-lifecycle.md §2.4 item 4 arm (g)`
  - observed: `attempt1=passed repair-runs=1`
- `[E2E-C-11.2]` **PASS** — the SECOND, separate attempt at the same address runs the SAME repair AGAIN — its marker started empty, so its own repair-run entry exists
  - cites: `parameter-semantics.md §2.9 observable; contract.md §5.8 (P-TP-8)`
  - observed: `attempt2=passed repair-runs=1`
- `[E2E-C-11.3]` **PASS** — the marker did not survive attempt 1: attempt 2's ops carry its own repair op, distinct from attempt 1's
  - cites: `kernel-surface.md §2.5 item 2 (lifetime)`
  - observed: `attempt1 op2=op-38 attempt2 op2=op-40`
- `[E2E-C-11.4]` **PASS** — NO closed record carries the marker: the closed AttemptReport has exactly five members and no appliedRepairs member
  - cites: `kernel-surface.md §2.1 item 3; kernel-surface.md §2.5 item 2`
  - observed: `keys=attempt,log,ops,outcome,rollback`
- `[E2E-C-11.5]` **PASS** — nor does any closed record carry ran/open/checkpoint/ref/commit: the open shape's nine members are read off an OPEN attempt only
  - cites: `attempt-lifecycle.md §2.4 item 1`
  - observed: `keys=attempt,log,ops,outcome,rollback`
- `[E2E-C-11.6]` **PASS** — the two attempts' logs are each their own list: the seq ordinals restart at 1 and the witnesses name different opIds
  - cites: `kernel-surface.md §2.5 item 1 (append-only within one attempt)`
  - observed: `attempt1=[constraint-check/A/null repair-run/A/null constraint-check/A/null commit/null/null] attempt2=[constraint-check/A/null repair-run/A/null constraint-check/A/null commit/null/null]`
- `[E2E-C-11.7]` **PASS** — K-4 over each closed attempt returns that attempt's own log — two distinct lists, each equal to its own report's
  - cites: `kernel-surface.md §2.1 item 4`
  - observed: `both closed logs read back by K-4`

### `E2E-C-12` — refusals at K-1: the kernel's own channel, and a registry that does not move

- `[E2E-C-12.1]` **PASS** — the kernel refuses an address shape outside its domain BEFORE the store's listen is called: KC-1, in the kernel's own form, with an empty log
  - cites: `kernel-surface.md §2.1 item 1 channel (i); fail-surface.md §1.1 item 1`
  - observed: `status=KC-1 keys=log,message,status`
- `[E2E-C-12.2]` **PASS** — an id that is not a non-empty string is KC-2 (the kernel's own channel)
  - cites: `kernel-surface.md §2.1 item 1 channel (i); parameter-semantics.md §2.2`
  - observed: `status=KC-2`
- `[E2E-C-12.3]` **PASS** — a constraint that is not a function is KC-2
  - cites: `kernel-surface.md §2.1 item 1 channel (i)`
  - observed: `status=KC-2`
- `[E2E-C-12.4]` **PASS** — NO store member appears as a refused registration's status: all three are the kernel's own closed tokens
  - cites: `fail-surface.md §1.2 item 1 (i); contract.md §5.3 (P-IM-3)`
  - observed: `statuses=KC-1,KC-2,KC-2`
- `[E2E-C-12.5]` **PASS** — a refused registration leaves the registry exactly as it stood: the lawful registration after the three refusals stands and the pass evaluates ONE pair
  - cites: `kernel-surface.md §2.1 item 1 (no entry added on either channel)`
  - observed: `lawful K-1 ok=true`
- `[E2E-C-12.6]` **PASS** — nothing was added by the refusals: the pass's constraint-check entries name the ONE lawfully registered pair
  - cites: `e2e-scenarios-b.md E2E-C-12; kernel-surface.md §2.5 item 1`
  - observed: `entry ids=[lawful]`
- `[E2E-C-12.7]` **PASS** — the store's own machinery was not reached by a refused call: a fourth K-1 at the lawful pair still returns the adopted handle
  - cites: `kernel-surface.md §2.1 item 1 (listen throws ⇒ it created nothing)`
  - observed: `a further K-1 at the lawful pair returned the adopted handle`

### `E2E-C-13` — two store codes at the caller's own verb calls, and the one asymmetry between them

- `[E2E-C-13.1]` **PASS** — a tier the store refuses throws the STORE's own code OutOfDomainTier at the verb call, in the store's own two-member form (no log member)
  - cites: `kernel-surface.md §2.1 item 2 (the tier refusal); fail-surface.md §3 item 2; fail-surface.md §1.2 item 2`
  - observed: `status=OutOfDomainTier keys=message,status`
- `[E2E-C-13.2]` **PASS** — it opens NO attempt: a second refused commit at the same address is refused the same way and never KC-7
  - cites: `kernel-surface.md §2.1 item 2 (the tier refusal); parameter-semantics.md §2.11 (ii)`
  - observed: `second refusal = OutOfDomainTier`
- `[E2E-C-13.3]` **PASS** — the repair's own write at an address whose ancestor is a leaf is refused by the store with the store's own code
  - cites: `fail-surface.md §3 item 2 (the write path's own codes); parameter-semantics.md §2.7`
  - observed: `repair write status=WriteParentNotLink keys=message,status message="'b' cannot be written into 'a', it holds a leaf and not a link"`
- `[E2E-C-13.4]` **PASS** — the repair body THREW, so the caller holds the BODY'S OWN THROWABLE unchanged — the SAME object the body threw (identity), with no `log` member added and the store's code still the only `status` on it
  - cites: `parameter-semantics.md §2.16 (a throwing repair body); attempt-lifecycle.md §2.4 item 8 (i); fail-surface.md §1.2 item 1 (no conversion)`
  - observed: `the object the body threw is the object K-3 threw back: identity=true status=WriteParentNotLink keys=message,status (no log member); the store's own refusal at the caller's own verb call reached the caller as WriteParentNotLink`
- `[E2E-C-13.5]` **PASS** — the attempt is closed as failed and its own outcome entry carries KC-4's token — the kernel's own state for a repair that threw, on the kernel's own channel
  - cites: `fail-surface.md §1.1 item 3; composition-and-states.md §2.7 item 13; fail-surface.md §2's KC-4 row (the carrier named: where the repair body throws before it returns, the carrier IS the attempt's own message log — its ONE outcome entry, read off the log the caller holds after the throw)`
  - observed: `report outcome=failed report log=[constraint-check/x/null repair-run/x/null outcome/null/KC-4]`
- `[E2E-C-13.6]` **PASS** — the store's code is NAMED inside the repair-run entry's message as the store's own answer, and the entry's state stays null
  - cites: `kernel-surface.md §2.5 item 1 (the message table); fail-surface.md §1.2 item 3 (the asymmetry's own carrier clause: the store's code is NAMED INSIDE the repair-run entry's message)`
  - observed: `repair-run={"seq":2,"kind":"repair-run","id":"x","opId":"op-43","message":"the repair x was attempted and the store refused its own edit — the store's answer is WriteParentNotLink","state":null} — the store's own code the repair's verb call threw (WriteParentNotLink) IS named inside this entry's message (the message table's own carrier clause, kernel-surface.md §2.5 item 1) and the entry's state stays null`
- `[E2E-C-13.7]` **PASS** — the two channels are not converted into one another: the store code reached the repair body UNCHANGED at the verb call, no store code is ever a kernel state, and the kernel answers the caller on its own channel
  - cites: `fail-surface.md §1.2 item 1 (no conversion), items 2 and 4`
  - observed: `store code at K-2=OutOfDomainTier; store code at the repair's own call=WriteParentNotLink (the body held the store's own object unchanged=true); kernel state=KC-4; repair calls=1`

### `E2E-C-14` — an unknown attempt reference, and the refusal that is not KC-7

- `[E2E-C-14.1]` **PASS** — K-5 over a CLOSED attempt returns the final report, and K-4 its final log
  - cites: `kernel-surface.md §2.1 items 4–5`
  - observed: `report=passed log=2`
- `[E2E-C-14.2]` **PASS** — K-4 and K-5 accept the bare id string as the SAME argument (the AttemptRef or its id, nothing else)
  - cites: `parameter-semantics.md §2.15 domain`
  - observed: `bare-id reads compared member for member`
- `[E2E-C-14.3]` **PASS** — an id the kernel holds no attempt for is KC-2 from BOTH readers
  - cites: `parameter-semantics.md §2.15 outside values; kernel-surface.md §2.1 items 4–5`
  - observed: `K-4=KC-2 K-5=KC-2`
- `[E2E-C-14.4]` **PASS** — null, undefined and an empty-id AttemptRef are each KC-2 (the closed outside-value set)
  - cites: `parameter-semantics.md §2.15 outside values`
  - observed: `three outside values over K-5: KC-2,KC-2,KC-2`
- `[E2E-C-14.5]` **PASS** — K-3 over the SAME stale record (its attempt already disposed of) is KC-2 and NOT KC-7
  - cites: `kernel-surface.md §2.1 item 3 (RD-9); parameter-semantics.md §2.15 observable`
  - observed: `K-3 again = KC-2`
- `[E2E-C-14.6]` **PASS** — no state moved and no entry was appended: the closed record and its log are untouched by the refusals
  - cites: `kernel-surface.md §2.1 item 3 (no entry appended)`
  - observed: `log after the refusals compared member for member`
- `[E2E-C-14.7]` **PASS** — the reference K-3 minted is the same one K-5 accepts — the commit's member, the report's and the record's are one reference
  - cites: `kernel-surface.md §2.1 items 2–5`
  - observed: `refs=attempt-26/attempt-26/attempt-26`

### `E2E-C-15` — a nested processing: the second top-level attempt at a DESCENDANT address

- `[E2E-C-15.1]` **PASS** — the nested K-2 at a descendant address is NOT refused: the record is returned (KC-7 refuses only at the ONE address of the live attempt)
  - cites: `attempt-lifecycle.md §2.4 item 8 (ii); contract.md §0.1 item 5 (v) RC-18`
  - observed: `inner attempt=attempt-27 outer attempt=attempt-28 inner commit=returned`
- `[E2E-C-15.2]` **PASS** — the inner attempt fails on its OWN address's pair and its failure is composed per-op over its OWN ops, in ITEM 2'S DECLARED ORDER — the step count is the calls ISSUED and may run below the list's size
  - cites: `composition-and-states.md §2.6 items 1 and 2; composition-and-states.md §2.6 item 5 (a)`
  - observed: `inner=KC-3 steps=["op-46"] declaredList=["op-46"] (this window's inner attempt created ONE op of its own)`
- `[E2E-C-15.3]` **PASS** — the inner composition's performed set is its own — it DOES name the outer body's own write, because that op is the inner attempt's own state (its before-image is that write's value) and no step of it names the OUTER attempt's first write
  - cites: `composition-and-states.md §2.6 item 1 (the candidate set is exactly the attempt's own ops)`
  - observed: `undone union=["op-46"] outer-body write=op-46 outer first write=op-47`
- `[E2E-C-15.4]` **FAIL** — the inner walk stops AT its checkpoint: every step carries the OP whose landing left that address last valid — an op ANOTHER attempt landed (A104) — A NON-NULL `checkpoint` READING IS `OWED` AND IS NEVER A DRIVE'S DEMAND: the `null` arm reaches a caller-side surface either way, and NO DRIVE MAY READ A NON-NULL `checkpoint` AS A FAILURE OF THE KERNEL
  - cites: `composition-and-states.md §2.6 item 8 (iii) (A104); parameter-semantics.md §2.17 (the non-null arm is OBSERVABLE ONLY WHILE THE PER-LANDING PASS IS OWED); contract.md §0.1 item 5 (i); e2e-scenarios-b.md E2E-C-15 step (5)`
  - observed: `OWED (the store-side pass J-20–J-22 declare; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): the inner attempt's own address ['a','b'] was left valid by the outer body's landing op-46 — the pair at that address PASSES on op-46's value — yet every step of the inner composition carries checkpoint=null ([null]), the address-wide null arm. Root cause: the kernel runs NO constraint pass when a write lands (see E2E-C-2 cell 9, the OWED reading named there), so no landing is ever recorded as one that left the address valid`
- `[E2E-C-15.5]` **PASS** — no step passed the checkpoint op to the store verb (a walk rolling back its own stop op would sweep the last valid state)
  - cites: `composition-and-states.md §2.6 item 4; parameter-semantics.md §2.17 outside values`
  - observed: `performed opIds compared against the checkpoint`
- `[E2E-C-15.6]` **PASS** — the inner pass never evaluated the ancestor pair: no entry of the inner attempt's log carries the ancestor id
  - cites: `attempt-lifecycle.md §2.4 item 5 (iv)`
  - observed: `inner log ids=["b1","b2",null]`
- `[E2E-C-15.7]` **PASS** — the OUTER attempt reached its own terminal act and its record carries the outer body's own write — each commit this drive opened has its own resolution, and the inner attempt's failure did not resolve the outer one
  - cites: `composition-and-states.md §2.7 (the valid states)`
  - observed: `outer=failed outer ops=["op-47"] outer-body write=op-46 inner=KC-3`
- `[E2E-C-15.8]` **FAIL** — the checkpoint's own home: the member is the opId of the LAST LANDING THAT LEFT EVERY REGISTERED PAIR AT THE ATTEMPT'S ADDRESS PASSING — an op of ANOTHER attempt included — and a landing that failed its own pass leaves the member UNMOVED; A NON-NULL READING IS `OWED` (the per-landing pass), and the `null` arm it reaches instead IS the arm a caller-side drive reaches either way
  - cites: `composition-and-states.md §2.6 item 8 (i) and (iii); parameter-semantics.md §2.17 (both arms of the member, and which one a caller-side drive can reach)`
  - observed: `OWED (the same store-side pass J-20–J-22 as cell 4; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): checkpoint read off the inner composition = [null] while the outer body's own write landed op-46, and off the outer = [null] while its own write landed op-47 and its declared call list is ["op-47"]: the docs' member cannot be observed at this build, because the kernel runs NO constraint pass when a write lands (see E2E-C-2 cell 9), so no landing of any attempt is ever recorded as having left the address valid`

### `E2E-C-16` — the delivery layer, and the caller's own loop as its one invoker

- `[E2E-C-16.1]` **FAIL** — the caller's own write's record carries `pending` as the subset of `triggered` the kernel has NOT already invoked — and THE ONE REACHABLE ACT that leaves a handle in it is THE CALLER'S OWN `store.write` MADE UNDER A REGISTRATION, so the handle the write returns for a body its own pass did not run STANDS in this member at K-2's return
  - cites: `kernel-surface.md §2.1 item 2 (the member's populated state, the one reachable act, and the loop as layer (b)'s only invoker)`
  - observed: `pending.length=0 triggered.length=2 watched handle in pending=false; the body ran 2x during the store's own delivery and 1x more when the caller's loop ran`
- `[E2E-C-16.2]` **FAIL** — the two members differ in EXTENT and not in order: `triggered` carries every handle the write returned, `pending` the subset the kernel has not already invoked (the caller's own loop's work)
  - cites: `kernel-surface.md §2.1 item 2 (the two members' declared states)`
  - observed: `triggered=2 pending=0`
- `[E2E-C-16.3]` **FAIL** — the listener body ran from the CALLER'S OWN LOOP and was handed THE TRIGGERING ADDRESS — the operation's own address, never the watch address (`Listener = (address: Address) => void`)
  - cites: `kernel-surface.md §2.1 item 2 (the two kinds' call shapes and the referent of the triggering address); storeroom-native/write-and-read.md §6.5 item 3`
  - observed: `loop entries=1; the loop's own invocation was handed ["a","b"] against the watch address ['a'] and the operation's own address ["a","b"]; the store's own delivery had already reached the body 2x inside K-2`
- `[E2E-C-16.4]` **NOT DRIVABLE BLIND** — the listener body opened the SECOND top-level attempt at the other address — a nested processing takes its OWN registry entry, so the record crosses back — and its own `CommitRecord` is a record of its own attempt
  - cites: `attempt-lifecycle.md §2.4 item 8 (ii); contract.md §5.7 (the registry's keying rule, A106 Q4)`
  - observed: `NOT DRIVABLE BLIND — no second top-level attempt is opened: the body's own K-2 at ['a','c'] threw KC-7 at this build, so no record of a second processing crosses back. The handle the caller's own loop invoked WAS handed the triggering address (cell 3), so the body's own act is reachable — the refusal is the finding, and it is the KC-7 arm the docs read at a SECOND K-2 at a HELD address (kernel-surface.md §2.1 item 2) whose hold is RELEASED only by the attempt's own terminal arm`
- `[E2E-C-16.5]` **PASS** — the K-1 pair's own pass ran — the first attempt's own log carries its `constraint-check` entry and its one `outcome` entry reads KC-3
  - cites: `kernel-surface.md §2.1 item 2 (the loop's call shape, both kinds); kernel-surface.md §2.5 item 1; parameter-semantics.md §2.16`
  - observed: `first attempt final=KC-3 log=[constraint-check/cA/null outcome/null/KC-3]; loop entries of kind constraint=0`
- `[E2E-C-16.6]` **NOT DRIVABLE BLIND** — the SECOND top-level processing is driven to ITS OWN terminal arm, fails on its OWN address's pair, and its own `outcome` entry carries the token — no ninth member minted
  - cites: `attempt-lifecycle.md §2.4 item 4; fail-surface.md §1.1 item 1 (c); fail-surface.md §2 (the KC-3 row)`
  - observed: `NOT DRIVABLE BLIND — the second top-level processing does not exist at this drive: the body's own K-2 at ['a','c'] was refused KC-7 (cell 4), so no second processing's log exists to read. The FIRST processing's own log, whose pair entry and one outcome token ARE readable, is [constraint-check/cA/null outcome/null/KC-3] with outcome KC-3`
- `[E2E-C-16.7]` **NOT DRIVABLE BLIND** — the FIRST TERMINAL ACTOR: the SECOND top-level processing's own K-2 return precedes the first processing's own K-3 return, so the failing processing this window reads is the SECOND one — the winner named by the earlier RETURN and never by depth
  - cites: `attempt-lifecycle.md §2.4 item 8 (ii) head and items 1-5; contract.md §5.7 (A106 Q1/Q3)`
  - observed: `NOT DRIVABLE BLIND — the second top-level processing does not exist at this drive (cell 4): its own K-2 was refused, so the order of the two processes' returns — the whole subject of this cell — cannot be read beside the first processing's own K-3 return`
- `[E2E-C-16.8]` **FAIL** — the docs' own step (1): the store's delivery puts the CALLER's write's handle in `pending` for the caller's own loop to invoke — the app's own loop being its ONE invoker
  - cites: `e2e-scenarios-b.md E2E-C-16 steps (1) and (2); kernel-surface.md §2.1 item 2`
  - observed: `at K-2's return pending held 0 of 2 triggered handle(s) (listener in pending=false); the caller's own loop invoked it 1x — the populating member is the OWED duty E2E-C-16 step (1) names, and the loop's own call is this cell's reading`

### `SURFACE` — the unit's declared surface: five items and the caller's own store

- `[SURFACE.1]` **PASS** — the kernel module at the declared checkout home exports exactly the five items K-1 to K-5, and no sixth
  - cites: `kernel-surface.md §2.1 (five items); kernel-surface.md §1 items 1-2; parameter-semantics.md §2.16`
  - observed: `exports=commit,log,register,report,runAttempt`
- `[SURFACE.2]` **PASS** — the store's own package namespace stands at its own 8 verbs, unmoved by this unit
  - cites: `storeroom-js/surface.md §2.1/§2.2; parameter-semantics.md §2.16 observable`
  - observed: `package exports=delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write`
- `[SURFACE.3]` **PASS** — the fixture is the package's own storeCreate(cfg) over the three declared keys, and the kernel's items take it in the FIRST position
  - cites: `kernel-surface.md §2.1 (the five signatures); kernel-surface.md §1 item 5; storeroom-js/surface.md §2.1/§2.2`
  - observed: `instance constructed through the declared construction call`
---

## §3. THE LIVE CONTRADICTIONS

**Every entry below is a place where the documentation and the live modules disagree. None of them was fixed —
this pass reports.** Each `CON` names the cells that read it, the doc path and `§` it is measured against, and
the value the run produced. **This pass re-derived every row from the STANDING law** — `A111`'s withdrawal of the
failed commit's pre-state claim, `composition-and-states.md §2.6` items 2 and 5 (a) (one call per still-owed op,
in the declared order, with the skip), the settled `K-2` hold timing (`kernel-surface.md §2.1` item 2, `KC-7`),
and the settled per-landing pass (`contract.md §0.1` item 5 (i), `OWED` to `J-20`–`J-22`) — so the contradictions
that remain are the ones the standing law still produces.

### `CON-1` — the per-landing pass: `OWED` TO `J-20`–`J-22` AND NOT A KERNEL FAILURE — the `OWED` readings are `[E2E-C-2.9]`, `[E2E-C-15.4]`, `[E2E-C-15.8]`; the `null`-arm cells `[E2E-C-9.4]`, `[E2E-C-9.8]`, `[E2E-C-2.1]`, `[E2E-C-2.2]` PASS

**CITED.** `e2e-scenarios.md` `E2E-C-2` step (7) reads a landing that FAILED its own pass;
`composition-and-states.md §2.6` item 8 (i)–(iii) and `parameter-semantics.md §2.17` declare the `checkpoint`
member as *the `opId` of the LAST LANDING THAT LEFT EVERY REGISTERED PAIR AT THE ATTEMPT'S ADDRESS PASSING —
whoever's landing established it* (`A104`/`A105`), with the `null` arm *fixed address-wide* — and
`contract.md §0.1` item 5 (i) `OWED`s **the per-landing pass** to `J-20`–`J-22`, the store-side readings.

**OBSERVED.** `K-2`/`commit` performs NO constraint evaluation: the three registered pairs of `E2E-C-2` had run
`x=0 y=0 z=0` times when the commit returned, and a separate probe of a repair whose write lands `99` over a
`<= 10` pair still resolved `passed` with ops `[op-3]` and `read(['a']) === 5`. Every `constraint-check` entry
of an attempt appears only at `K-3`'s own pass. **The `null` arm is therefore the ONLY arm a caller-side drive
reaches** (`[E2E-C-9.4]`, `[E2E-C-9.8]`, `[E2E-C-15.4]`, `[E2E-C-15.8]`), including the case `[E2E-C-15.4]`
drives where the address in question was demonstrably left valid by another attempt's own landing.
**`parameter-semantics.md §2.17` settles this reading itself** — *only the `null` arm is observable while the
per-landing pass is `OWED`, and no drive may read a non-null `checkpoint` as a failure of the kernel* — so the
three cells that read the non-null arm are **`OWED` store-side readings and are carried as such, NOT as
contradictions of the kernel**, and the one cell that reads the `null` arm (`[E2E-C-9.4]`) PASSES.

### `CON-2` — the delivery layer is not reachable from the documented seam — read at `[E2E-C-8.5]`, `[E2E-C-8.7]`, `[E2E-C-10.*]`, `[E2E-C-16.1]`, `[E2E-C-16.2]`, `[E2E-C-16.3]`, `[E2E-C-16.4]`, `[E2E-C-16.6]`, `[E2E-C-16.7]`, `[E2E-C-16.8]`

**CITED.** `kernel-surface.md §2.1` item 2 (the caller's own loop over `CommitRecord.pending` is the delivery
layer's ONE invoker, and *the caller's own `store.write`/`delete` made UNDER A REGISTRATION* is *the one reachable
act* that leaves a handle in that member); `e2e-scenarios-b.md` `E2E-C-16` steps (1)–(2);
`attempt-lifecycle.md §2.4` item 8.

**OBSERVED.** `[E2E-C-8.5]`: `pending.length=0` against `triggered.length=1` with the body having run `2x` — **the
caller's own loop invoked NOTHING, so the ONE invoker the clause names has no work at this build.** The same
member read from `E2E-C-16` is empty (`pending.length=0`, `triggered.length=2`), and **`[E2E-C-16.3]` reads the
contradiction that survives both windows:** the caller's own loop DID invoke the listener's body and handed it
`["a","b"]` — the operation's own address, read back verbatim as `Listener = (address: Address) => void`
declares — **and that invocation is the THIRD time the body ran in that window, the store's own delivery having
already reached it `2x` inside `K-2`**: the loop is not the body's ONLY invoker. **`[E2E-C-16.4]` reads the second
half of the same root:** the body's own second top-level `K-2` at `['a','c']` was refused `KC-7`, so the nested
processing the docs' step (1) opens is not opened here. `[E2E-C-8.7]`, `[E2E-C-10.2]`–`[E2E-C-10.7]`,
`[E2E-C-16.6]`, `[E2E-C-16.7]` are the cells whose subject is that missing second record.

### `CON-3` — the battery's own census disagrees with itself — **AND BOTH OF THIS ENTRY'S HALVES ARE CLOSED IN THE BATTERY AT THE `A111`/GATE-2 REPAIR PASSES OF 2026-10-13, SO IT IS CARRIED AS THE RUN'S OWN FINDING AND NOT AS A STANDING CONTRADICTION: `e2e-scenarios.md` line 18 now names `E2E-C-10` in the seven no-repair scenarios and does NOT name `E2E-C-9`, and `fail-surface.md §2`'s `KC-5` row now reads the predicated pair as `ran` AND `appliedRepairs` together with the registration-keyed reading WITHDRAWN BY NAME there (`RE-1`) — the run's finding was true of the files as it read them, and the standing law it was re-derived from now carries it.**

`e2e-scenarios.md` line 18 lists the seven scenarios carrying no repair body as
`E2E-C-1, -C-6, -C-7, -C-8, -C-10, -C-12, -C-14` and says `E2E-C-9` carries a repair-return site; but
`e2e-scenarios-b.md`'s `E2E-C-9` carries a repair body (`x`'s repair clamps the value) and `E2E-C-10`'s listener
callback returns `{message}` with no repair body — so `E2E-C-10` belongs in the seven and `E2E-C-9` does not.
**A second internal disagreement:** `fail-surface.md §2`'s `KC-5` row reads *"IS IN `appliedRepairs` before it"*
while `e2e-scenarios.md` `E2E-C-2` (whose pair `x` is in `ran` but not in `appliedRepairs`) declares `KC-6`; the
live behaviour is `KC-6`, which is what `KC-6`'s own message text says — and this greens set drives **BOTH**
limbs separately (`[E2E-C-5.6]`, `[E2E-C-5.9]`), so the disagreement does not decide any cell here.

### `CON-4` — the battery's `E2E-C-9` shape is not executable as written, and its FLOOR arm is reachable only through the store's own `journalLength`

**CITED.** `e2e-scenarios-b.md` `E2E-C-9` steps (1)–(6); `storeroom-native/write-and-read.md §6.1` item 5 and
`§6.4` items 2 (`M-6`) and 5; `storeroom-js/parameter-semantics.md §2.3`; `fail-surface.md §2`'s `KC-8` row.

**OBSERVED.** The battery's step (2) has a repair write at `['a']` that lands a value *another* pair then
violates; a drive of that shape at a leaf address resolves `passed` (`read(['a']) === 1`, no composition at all),
so the failure the rest of the row reads never arises from that step alone. **The floor ITSELF is live and this
pass reaches it:** the store's own `journalLength` (a caller-supplied positive integer of ENTRIES,
`storeroom-js/parameter-semantics.md §2.3`) being the app's declared control over the journal's compression, a
store built with `journalLength: 2` and six writes at the attempt's address puts a compacted entry inside the
attempt's own call's reach, and the composition's call over the still-owed op then meets
`RollbackCompacted` — `failed: true`, `undoneOps: []`, `restoredTo` the state the addressed subtree stood at,
the kernel's `KC-8` in the attempt's ONE `outcome` entry, and no step after it
(`[E2E-C-9.1]`–`[E2E-C-9.3]`). **The `compacted` flag on an op never reads true in any window this driver could
build** (an op's `compacted` member was `false` on all eight appends of a `journalLength: 1` store), so the
battery's own *"the journal reports a compacted entry"* step has no caller-side reader; the floor is reached
through the store's own answer at the verb call instead.

---

## §4. WHAT COULD NOT BE WRITTEN BLIND, AND WHAT THIS PASS DID NOT DO

**THE `NOT DRIVABLE BLIND` CELLS, AND WHY EACH ONE IS A FINDING AND NOT A PASS.** Ten cells carry the marking:
`[E2E-C-8.7]`, `[E2E-C-10.2]`–`[E2E-C-10.7]`, `[E2E-C-16.4]`, `[E2E-C-16.6]`, `[E2E-C-16.7]`. Each is a cell the
battery writes that a blind driver cannot execute against the live modules — because the delivery layer it
names is not reachable (`CON-2`), because the body's own second top-level attempt is refused `KC-7`
(`[E2E-C-16.4]`), or because the window's own record was never returned (`[E2E-C-10.*]`). **None of them was
converted into a pass and none was dropped:** the row is written, its expected observation is stated, and the
reason it cannot be read is printed in the run. **No cell was invented to fill the count, and no row's size was
read off the battery's `7`-column census.**

**THE NINE FAILING CELLS, NAMED, WITH WHAT EACH ONE NOW IS.** `[E2E-C-2.9]`, `[E2E-C-8.5]`, `[E2E-C-10.1]`,
`[E2E-C-15.4]`, `[E2E-C-15.8]`, `[E2E-C-16.1]`, `[E2E-C-16.2]`, `[E2E-C-16.3]`, `[E2E-C-16.8]`.
- **`OWED` STORE-SIDE READINGS, said by name and cited to `J-20`–`J-22`:** `[E2E-C-2.9]` (the per-landing pass
  itself, `contract.md §0.1` item 5 (i)), `[E2E-C-15.4]` and `[E2E-C-15.8]` (the non-null `checkpoint` arm,
  `parameter-semantics.md §2.17`). These three are red because the reading they assert belongs to the store-side
  passes `J-20`–`J-22` declare — they are NOT red as failures of the kernel, and no drive may read them so.
- **LIVE CONTRADICTIONS OF A CLAUSE THE CLOSED CALLER-SIDE SURFACE CAN CARRY, with the doc path and `§` and the
  observed value:** `[E2E-C-8.5]`, `[E2E-C-16.1]`, `[E2E-C-16.2]`, `[E2E-C-16.8]` — `kernel-surface.md §2.1`
  item 2 declares the member's populated state a DECLARED DUTY OF THE KERNEL (owner `role_kernel_writer`, whose
  own positive revisit condition is `E2E-C-8` step (2)); observed `pending.length=0` against
  `triggered.length=1`/`2`. `[E2E-C-16.3]` — the same clause's *ONE invoker* half; observed `1` invocation from
  the caller's own loop against `2` from the store's own delivery inside `K-2`.
- **A RED CELL WITH NO RECORD TO COMPARE, BY CONSTRUCTION:** `[E2E-C-10.1]` is the parity cell whose beta half
  has no record, red for the reason `[E2E-C-10.7]` prints.

**⟶ THE RUN FIGURES' OWN ARITHMETIC, RECONCILED AT THE GATE-7 DOC REVIEW OF 2026-10-13 (`role_proofreader`), WHICH MOVES NO CELL, NO MARK AND NO VERDICT AND PRINTS NO NEW RUN.** **THE MARKED CELLS CLOSE ON BOTH SIDES AND THE TABLE'S OWN ROW-LEVEL ACCOUNTING IS THE TERM THAT DOES NOT — WITH §1'S HEAD NOTE READ ALONGSIDE THIS PARAGRAPH SO THE DISTINCTION IT DRAWS IS NOT CONFUSED WITH THE FIGURES BELOW: that note declares the battery's `16 × 7 = 112` PRINTED cells NOT the same figure as this file's `125` observables, which is right, and the comparison this paragraph makes is a second and different one — the table's row-level `123`/`112`/`16` against this file's mark-level `125`/`106`/`10`.** the `125` marked cells are `106` `**PASS**` + `9` `**FAIL**` + `10` `**NOT DRIVABLE BLIND**` — `106 + 9 + 10 = 125` ✓, read one by one at this file's own markers — while §1's `cells` column prints `8+10+7+7+9+8+7+6+9+7+7+7+7+7+8+8+3 = 123`, whose terms fall `2` SHORT OF THE FILE'S OWN MARKED CELLS (`125 − 123 = 2`) — the deficit's ONE UNMISTAKABLE SITE BEING `[E2E-C-8.6]`, SKIPPED BY THIS FILE'S OWN SEQUENCE (that row runs `[E2E-C-8.1]`–`[E2E-C-8.5]` then `[E2E-C-8.7]`, so its `cells` figure of `6` counts the cells it carries, its verdict cell printing `4` PASS + `1` FAIL + `1` NOT DRIVABLE BLIND = `6`) — while the TABLE'S PER-ROW `verdict` CELLS ARE THE OTHER FIGURE THAT DOES NOT CLOSE AGAINST THE MARKS: the `verdict` cells' own PASS terms sum to `112` and their `NOT DRIVABLE BLIND` terms to `16`, against this file's `106` `PASS` marks and `10` `NOT DRIVABLE BLIND` marks — so the row verdicts OVERSTATE the marks by `6` PASS and `6` NOT DRIVABLE BLIND (`112 + 9 + 10 = 131` against `106 + 9 + 10 = 125`), the `6` being the excess cells the rows' own verdict cells name beyond the marks the file's cells carry — THE `2`-CELL DEFICIT'S SITE AND THE EXCESS-PASS SITES ARE NAMED SO THE FIGURES ARE CHECKABLE, AND THE REMAINDER IS LEFT OPEN RATHER THAN CLOSED BY A GUESS: `[E2E-C-8.6]` is UNWRITTEN (that row's sequences carry `5` marks and its verdict names `6`), `E2E-C-15`'s row is the one whose `cells` figure of `8` exceeds the `8` marks it prints only in its verdict's PASS/FAIL split (`6 PASS · 2 FAIL` against `5 PASS · 2 FAIL`), and the rows whose `verdict` PASS terms exceed the `PASS` marks their own sequences carry are `E2E-C-2` (`9 PASS` against `7` marks), `E2E-C-5` (`9` against `8`), `E2E-C-8` (`4` against `3`), `E2E-C-15` (`6` against `5`) and `E2E-C-16` (`1` against `0`), whose `NOT DRIVABLE BLIND` terms likewise read `6 · 1 · 6 · 0 · 3` against the `5 · 1 · 5 · 0 · 2` their cells carry — the `6` PASS and `6` NOT DRIVABLE BLIND the paragraph above states — **AND ONE THING THE ROW VERDICTS AND THE CELL SEQUENCES CANNOT BOTH BE RIGHT ABOUT IS NAMED RATHER THAN RECONCILED: `E2E-C-8`'s verdict cell names `4 PASS + 1 FAIL + 1 NOT DRIVABLE BLIND = 6` where its cell sequences carry `3 PASS + 1 FAIL + 1 NOT DRIVABLE BLIND = 5`, ONE MARK SHORT of its own `cells` figure** — and NO CELL, MARK OR VERDICT IS MOVED HERE TO MAKE THEM CLOSE — **AND NO CELL IS INVENTED HERE TO CLOSE THE MARGIN, NO ROW'S SIZE IS READ OFF THE BATTERY'S `7`-COLUMN CENSUS, AND THE MARKED FIGURES `125`/`106`/`9`/`10` ARE THE ONES THIS FILE'S OWN CELLS CARRY AND THE ONES ITS §3, §4 AND CLOSING PARAGRAPHS PRINT.**

**THE CORRECTED CELLS, NAMED.** This pass re-derived cells whose expectation the STANDING law had moved; each is
named with the clause it now follows. Fifteen cells, named below (one bullet may name several of them):
- `[E2E-C-2.7]` — item 2's declared call list + item 5 (a)'s skip (`composition-and-states.md §2.6`): the step
  count is the calls ISSUED and may run below the list's size; the drive reads `len=1` against a declared list of
  `2`, the single call's `undoneOps` reporting the whole list undone.
- `[E2E-C-2.8]` — `composition-and-states.md §2.6` item 8 (iii) + `A111` + `contract.md §5.7`'s `P-TP-7`: the
  failed commit's pre-state claim is WITHDRAWN BY NAME in this unit, so the address stands where the STORE'S OWN
  ANSWER left it (read `AddressNotFound` where the caller's own earlier value stood).
- `[E2E-C-2.9]` — item 8 (i)–(iii) + `contract.md §0.1` item 5 (i): re-expressed as the `OWED` store-side
  reading, no longer a kernel contradiction.
- `[E2E-C-6.2]` and `[E2E-C-6.3]` — `kernel-surface.md §2.1` item 2 (`KC-7`) and `fail-surface.md §2`'s `KC-7`
  row: the hold opens with the write verb's attempt and is released only by that attempt's own terminal arm; the
  drive now reads both windows (`KC-7` while held; a FRESH record afterwards).
- `[E2E-C-9.1]`–`[E2E-C-9.3]` — `composition-and-states.md §2.6` item 5 (b), `fail-surface.md §2`'s `KC-8` row,
  `storeroom-native/write-and-read.md §6.1` item 5 (`journalLength`): the floor arm is now DRIVEN and PASSES.
- `[E2E-C-9.4]`–`[E2E-C-9.9]` — item 2's declared call list + item 5 (a)'s skip; the row's step count is no longer
  read off the list's size.
- `[E2E-C-13.6]` — `kernel-surface.md §2.5` item 1's message table + `fail-surface.md §1.2` item 3: the store's
  code IS named inside the `repair-run` entry's message; the stale expectation of the previous run is corrected.
- `[E2E-C-15.1]`,`[E2E-C-15.2]`,`[E2E-C-15.3]`,`[E2E-C-15.5]`–`[E2E-C-15.7]` — item 2's declared order, item 5
  (a)'s skip, and `storeroom-native/write-and-read.md §3.4` (`W-2`/`W-3`/`W-4`) for the seeding order the
  documented window needs; the row is drivable end to end at this build.
- `[E2E-C-15.4]` and `[E2E-C-15.8]` — `parameter-semantics.md §2.17` + `contract.md §0.1` item 5 (i): the non-null
  `checkpoint` arm is `OWED` to `J-20`–`J-22` and is NEVER a drive's demand.
- `[E2E-C-16.1]`–`[E2E-C-16.8]` — `kernel-surface.md §2.1` item 2 in full: the member's populated state and the
  loop's call shapes (constraint/repair handle → `AttemptContext`/`RepairContext`; plain store listener → the
  triggering address), with the window rebuilt on the documented shape (a structured seed so the descendant
  addresses exist as the store's own branches, the listener at `['a']`, the first attempt at `['a','b']`, the
  body's own second `K-2` at `['a','c']`).
- `[E2E-C-2.1]`–`[E2E-C-2.2]`, `[E2E-C-2.10]` — the same window's op ordinals and evaluation counts were
  re-derived after the caller's own earlier write was added to it (item 2's list now has three ops' worth of
  reach).

**WHAT THIS PASS DID NOT DO.** It did not read `bindings/js/src/**` and did not read
`bindings/js/test/constraint-kernel*`; it edited neither; it fixed nothing it found; it wrote exactly two
files — this document and `bindings/js/greens/blind-constraints-v2.mjs`. **It did not reconcile the
contradictions in `§3`:** reconciling them is a spec-writer's or a hardening pass's act, and a greens set that
did so would stop being a greens set. **This set is NOT self-verified:** the driver was authored by
`role_blind_test_writer` from the documentation, and the cells it drives were re-derived from the STANDING law
rather than from any implementation read.

**THE HONEST-SET STATEMENT.** The `106` passing cells are green because they assert something and the
assertions' teeth are printed beside them; the `9` failing cells are red for the reasons `§3` names (three of
them `OWED` store-side readings said by name); and the `10` marked cells are neither. **A green run would not
have been a pass either — it would have been a different run, and the difference is the finding.**

**RUN FIGURES, RESTATED FOR THE READER WHO READS ONLY THIS PARAGRAPH.**
`node bindings/js/greens/blind-constraints-v2.mjs` → `rows=17 cells=125 PASS=106 FAIL=9
NOT-DRIVABLE-BLIND=10`, exit `0`. `106 + 9 + 10 = 125` ✓.

**⟶ AND ONE READING OF THIS RECORD IS RE-SPELLED AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13 (`A: docs/decisions.md` · `A112`), WITHOUT ONE OBSERVED BYTE MOVING: WHEREVER THIS RECORD READS *"THE STORE'S OWN DELIVERY"* — the `[E2E-C-8.5]` cell's observation, the `CON-2` cells' observations at `§3`'s `[E2E-C-16.1]`–`[E2E-C-16.3]`, and the notes that count the body's runs inside `K-2` and against the caller's own loop — THE INVOCATION SO NAMED IS THE JS SURFACE'S OWN CONSTRAINTS LAYER, THE TRIGGERED CONSTRAINTS RUN FIRST WITH EACH ENTRY CHECKED OFF AS IT PASSES AND, ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, THE CALLER'S OWN LOOP BEING ONE INVOKER AMONG THOSE LAYERS AND NEVER THE ONLY ONE; the store RETURNS the handles and invokes NOTHING.** **NO OBSERVATION, NO COUNT AND NO VERDICT OF THE BLIND RUN MOVES BY THIS: the record states what the run printed, the instrument is re-triaged here, and the two `DEF-2026-10-13-K`/`-L` premises this record's observations gave rise to are re-triaged at `kernel-surface.md §2.1` item 2 as NOT package defects.**

**⟶ AND ONE COUNT OF THIS RECORD IS RE-TRIAGED AT THE GATE-4 RECONCILIATION PASS OF 2026-10-13, WITHOUT ONE PRINTED OBSERVATION MOVING (`A: docs/decisions.md` · `A112`): WHEREVER THIS RECORD PRINTS `pending.length=0` AGAINST A NON-EMPTY `triggered` AT `K-2`'S OWN RETURN — `[E2E-C-8.5]`'s observation, `[E2E-C-10]`'s two cells, `[E2E-C-16.1]`–`[E2E-C-16.3]`'s, and the `CON-2` paragraph that reads them — THAT READING IS OF THE BUILD THE RUN MEASURED, WHERE THE CHECK-OFF HAD ALREADY RUN INSIDE `K-2`'s OWN WINDOW; UNDER THE DELTA THE MEMBER IS WRITTEN AS THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS AND AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES, THE PASS BEING `K-3`'s, SO A CALLER'S FIRST READ OF THE MEMBER AT `K-2`'S RETURN CARRIES THE WHOLE SET AND `pending.length=0` IS A READING NO DELIVERED BUILD MAY NOW PRINT THERE.** **THE BLIND RUN'S OWN VERDICTS STAND AS FILED AND NO CELL IS RE-SCORED HERE: what is named is the one figure those cells read — the member's extent at `K-2`'s return — whose home is `kernel-surface.md §2.1` item 2, whose extent clause `attempt-lifecycle.md §2.4` item 8 (i) (5) fixes, and whose drives are owed to `docs/pending.md` `G-8`.**

**⟶ AND THE MEMBER'S EMPTY READING ON THE FAILING ARM IS NARROWED BY THE SAME PASS, AT THE CLAUSE IT BELONGS TO (`A: docs/decisions.md` · `A112`): WHERE THIS RECORD'S FAILING-ARM CELLS PRINT `pending.length=0`, THAT READING IS OF A RECORD WHOSE RETURNED SET IS THE FAILED WRITE'S OWN HANDLES — the discard removing exactly those — and it is NOT the general rule the reading once carried: THE DISCARD REACHES THE WRITE THAT FAILED AT ITS LANDING AND NO OTHER WRITE'S ENTRY, so an entry for a handle an EARLIER caller write returned STANDS after the arm, and the whole-member clear is WITHDRAWN BY NAME as the second, unlawful removal** (`attempt-lifecycle.md §2.4` item 8 (i) (5); `live-greens-a112.md`'s `[A112-B4]`, whose expected observable is that standing entry and whose `FAIL` is that defect read at its own build).
