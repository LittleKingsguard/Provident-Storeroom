
---

## THE COVERAGE THE CLAUSES WERE READ FOR, AND WHERE EACH ITEM IS DRIVEN

| The clause's own demand (from `A112` and the part directory) | Cell(s) that drives it |
| --- | --- |
| `pending` is the WHOLE RETURNED SET, read as the caller reads it (the set minus the check-offs) | `[A112-B1]` (both members at the write's return), `[A112-B5]`, `[A112-B6]` (the write-instant and post-window readings, per write) |
| An entry leaves `pending` ONLY by being checked off AS IT PASSES | `[A112-B3]` (the mechanism, on the passing arm and the failing arm), `[A112-B4]` (the entry no pass evaluated — **FAIL**) |
| An entry whose pair NO pass of that attempt evaluates still standing | `[A112-B2]` (at the write's return), `[A112-B4]` (**FAIL** on the failing arm, standing on the passing arm of the same fixture), `[A112-G4]` (`E2E-C-16` cell 2) |
| The `SIFT` absent BY THE MECHANISM (traced to the deliveries, not asserted by equality with `triggered`) | `[A112-B3]`, `[A112-B4]` (the equality is used only as the write-instant reading) |
| Every listener is `pending` on every write | `[A112-B1]` (a pair + an app listener at the write's return), `[A112-B2]`, `[A112-G4]` |
| One delivery per evaluated pair, carrying THAT pair's own function, and for no other | `[A112-C3]` |
| The store invokes nothing | `[A112-D1]` (a bare store write reaches no registered function), `[A112-D4]` |
| The two ordered layers as declared | the ORDER `[A112-D5]` (`NOT-EXERCISABLE`, `N7`); the in-window instant of the constraints layer `[A112-D2]` (`NOT-EXERCISABLE`: which verb call is *"that same verb call"* for a caller who makes two is unpinned, and the order inside the window is `N7`); layer (b) as the caller's own loop `[A112-D3]`; both channels' one handle, and which body runs where `[A112-D4]`; the surface's own delivery loop reaching the app's listener `[A112-G2]` |
| The five kernel exports and the closed `8`-verb store namespace | `[A112-A1]`, `[A112-A2]` |
| `KC-5` / `KC-6` / `KC-7` hold-and-release edges | `[A112-E1]` (the hold, and the release by the terminal arm), `[A112-E2]` (release on a failure arm, read without the `OWED` pre-state claim), `[A112-E3]` (all three `KC-7` sites reached re-entrantly), `[A112-E4]` (`KC-5`), `[A112-E5]` (`KC-6` — `NOT-EXERCISABLE`, no declared drive) |
| The failed/discarded arm | `[A112-C1]`, `[A112-C2]`, and the failing arm of `[A112-B4]` |
| The composition's call list and the floor stop, with the ONE `outcome` entry carrying `KC-8` | `[A112-E6]`, `[A112-E7]`, `[A112-E8]`, `[A112-G1]`, `[A112-G6]` |
| `E2E-C-8` cells 5/6 (parity between the app's own call and the app's listener body) | `[A112-G2]` (cell 5's compared members, driven on both windows), `[A112-G3]` (cell 6's second limb — `NOT-EXERCISABLE`, `N7`). **NOTE: `E2E-C-8` step (2) as written runs a `commit`/`runAttempt` sequence INSIDE the listener body (`e2e-scenarios.md` §2 `E2E-C-8` step (2)) — a different drive from any cell here; `[A112-G2]` drives cell 5's compared members across the two windows the step names, and no cell of this set claims step (2)'s own body.** |
| `E2E-C-16` cells 2/5 | `[A112-G4]` (cell 2), `[A112-G5]` (cell 5) |
| `kernel-surface.md §2.3` item 1 (the constraint's function, the address-scoped pass, the `AttemptContext`) | `[A112-H3]`, `[A112-C4]`, `[A112-B2]` |
| `LogEntry` / `K-4` / `K-5` shapes and the readers | `[A112-H1]`, `[A112-H2]`, `[A112-F3]` |

**NOTHING IN THIS LIST IS `PASS` BY ABSENCE.** Every row names cells that were driven; the five rows whose
cells are not green say so at the row.

---

## THE ONE FAILING CELL, WITH ITS CLAUSE AND ITS OBSERVED VALUE

### `[A112-B4]` — **FAIL**: an entry left `pending` whose pair no pass of that attempt evaluated

**The clause it rests on.** `kernel-surface.md §2.1` item 2: *"`pending` CARRIES THE WHOLE RETURNED SET OF
TRIGGERED CONSTRAINTS AT THE MOMENT THIS CALL'S WRITE'S SET IS WRITTEN, AND AN ENTRY LEAVES IT ONLY BY BEING
CHECKED OFF AS IT PASSES"* — with a `SIFT` defined as *"a subtraction NOT tied to that entry's own pass"* — read
with `attempt-lifecycle.md §2.4` item 8 (i) (5)'s extent clause, which is the clause that decides this cell:
*"A FAILING ARM'S RECORD READS `triggered` AS THE STORE'S RETURNED SET VERBATIM AND `pending` EMPTY, because NO
pass checks any entry of it off — … THE DISCARD ACTS ON THE FAILED WRITE'S OWN RETURNED SET … AND REACHES EVERY
HANDLE OF IT, **AND NO ENTRY THIS WRITE'S SET DID NOT RETURN IS EVER REMOVED FROM THE MEMBER** — so the kernel
owes ONE REMOVAL PER ARM AND NEVER TWO IN ONE WINDOW."*

**The exact drive.** Fresh store; `K-1` registers pair `cL` at the ANCESTOR address `["a"]` with a counting
body; a bare `store.write(instance, ["a"], 'mem', …)` lands the parent; `K-1` registers pair `own` at
`["a","b"]` with a body returning a violation; `K-2` writes at `["a","b"]`; **at the write's return**
`triggered.length`/`pending.length` are read; `K-3` (the attempt's own pass, which is address-scoped to
`["a","b"]` and can never evaluate the ancestor pair) throws `KC-3` on `own`; after the pass `pending` is read
again and the ancestor's handle is looked for. **Then the SAME fixture with `own` PASSING**, so the member's
behaviour with and without a terminal arm is read on one drive.

**The expected observable.** On the failing arm every handle of the failed write's own returned set leaves and
no pass checks any of them off; **the never-evaluated ancestor's handle leaves only if the failed write's set
returned it** — and the ancestor's handle was returned by the ANCESTOR's write. On the passing arm the
never-evaluated ancestor entry STANDS in `pending`.

**Observed.** Failing arm: at the write's return `triggered=2`, `pending=2` (**the whole returned set: no
`SIFT`**); after the pass `pending=0`, the ancestor handle GONE, its pair evaluated by NO pass (ancestor body
calls `0`). Passing arm, same fixture: after the pass `pending=1` with the ancestor handle STANDING (`true`),
ancestor calls `0`, `outcome='passed'`. **So the removal on the failing arm is not a check-off of that entry —
its own pair never ran — and it is not the discard of the failed write's own returned set either, because the
ancestor handle was returned by the ancestor's write, not by the failed one. The extent clause's own words are
what this cell falsifies: *"NO ENTRY THIS WRITE'S SET DID NOT RETURN IS EVER REMOVED FROM THE MEMBER."***

**Reproduced in isolation** (`scratch/blind-a112-fail-repro.mjs`, fresh instances, no battery neighbours): the
same figures, both arms.

**What is NOT claimed.** This is not a claim that the `SIFT` survives: the write's return carries
`pending == triggered` (`[A112-B1]`, `[A112-B3]`, `[A112-B6]`), so the `SIFT` is gone at the write and the
check-off is real. And this is **not** a claim about the ordering hand-off — nothing here needs the ordering to
pass. **A blind writer has no second reading of the extent clause that clears it**: the only set the discard
may lawfully reach is the failed write's own returned set, and the ancestor handle is not in it. Reported FAIL.

---

## THE `NOT-EXERCISABLE` CELLS, AND THE CLAUSE THAT FAILED TO PIN EACH

| Cell | What it would assert | Which clause failed to pin what a blind driver needs |
| --- | --- | --- |
| `[A112-D2]` | the `A112` re-spell's OWN claimed instant for a caller-made write: that write's constraint body has run and been checked off by the time that verb call returns, and no body of another kind of that same call has run yet (`kernel-surface.md §2.1` item 2; `§2.2` item 2) | **Two clauses leave it unpinned, and one of them names the observable *unreachable*.** (1) *"that same verb call"* is not localised for a caller who makes two: the caller makes `K-2` and then `K-3`, and `attempt-lifecycle.md §2.4` item 6 reads the kernel's window as opens-at-`K-2` / closes-at-`K-3`'s terminal state. (2) **The order is the hand-off `docs/next-steps.md` · `N7`** — and `attempt-lifecycle.md §2.4` item 8 (ii) (e) **withdraws by name** the two phrasings that made *"before other listeners"* a claim about a watch address's own function slot, because the store holds ONE FUNCTION PER ADDRESS and `on` REPLACES it: at one address the reachable states are *the address's constraints evaluated from the kernel's own window with no other body running from the store there* **or** *the plain listener's body run by whoever registered it last with no constraint pass delivered from that address*. **The measured state is that second one — so it is reported as the hand-off's own state and NOT as a product failure.** Measured without a verdict: at `K-2`'s return the constraint body's count is `0` (not run) and `pending` carries the whole set (`1` of `1`), while the app listener's body count is `1`; after `K-3` the pass delivered (`1`/`1`, `outcome='passed'`, `pending` `0`). |
| `[A112-D5]` | the ORDER: every layer (a) delivery of the call completes before any layer (b) body of that call runs (`kernel-surface.md §2.1` item 2; `§2.2` item 2) | **`docs/next-steps.md` · `N7`.** The ordering gate is enforced nowhere in the delivered surface: the entry cannot learn whether a constraint stands owed, and the kernel's five exports carry no such read; `N7` also records the `P-PUB-7` allowlist blocker and the architect's named repairs (a declared sixth kernel read, or a signal through the store's own listener surface). **Handed off by `A112` (2); marked `N7` and not judged here.** Measured without a verdict: with `on()` issued after `K-1`, the app's listener body ran inside the `K-2` window while the constraint of that same write had not (`[A112-D2]`, `[A112-D4]`). |
| `[A112-G3]` | `E2E-C-8` cell 6's second falsifier limb: a `pending` READ AS CARRYING A LISTENER THE CONSTRAINTS HAVE NOT YET PASSED | **The same `N7` clause.** Whether a listener stands in `pending` *"while a constraint stands owed"* is precisely the state the entry cannot read. **The first limb of the same cell — a `pending` that omits no handle of the returned set — is driven and reported at `[A112-B1]`/`[A112-B2]`/`[A112-B4]`.** |
| `[A112-E5]` | `KC-6`: an evaluation violates a pair that is in `ran` and NOT in `appliedRepairs` (`fail-surface.md §2 KC-6`; `attempt-lifecycle.md §2.4` item 4 arm (f)) | **No clause pins a DRIVE.** The kernel's own pass evaluates each pair at most once per pass (`composition-and-states.md §2.6` item 8 (i)); a re-run of an address is caused only by a repair's own landing, which by construction is the pair whose repair RAN. The per-landing pass that could evaluate a pair a second time is `OWED` to `J-20`–`J-22` (`composition-and-states.md §2.6` item 8 (iii)) and no store act performs it (`kernel-surface.md §2.3` item 1). **A blind driver of the five declared items therefore cannot reach `KC-6` at all.** |
| `[A112-F4]` | the kernel declares NO store verb, member or function-carrying store parameter (`kernel-surface.md §1` item 3) | **No declared observable reads the kernel's own act.** None of the five items' returns exposes what the kernel holds or calls, and `composition-and-states.md §2.7` item 12's substitutions do not reach it. Only a source read or a store-side interception answers it, and both are outside a blind drive. |

**`[A112-D2]`, `[A112-D5]` and `[A112-G3]` are one clause seen three times** (`N7`, plus the unpinned verb call
at `[A112-D2]`) and are counted separately because the batteries state them as different cells.

---

## WHERE THE DOCS ARE AMBIGUOUS, CONTRADICTORY OR UN-RUNNABLE FOR A BLIND WRITER

**1. `attempt-lifecycle.md §2.4` item 8 (i) (5)'s extent clause and the delivered member disagree, and the
disagreement is the one FAIL of this run.** The clause fixes the failing arm's extent in two parts: *no pass
checks any entry off*, and *no entry this write's set did not return is ever removed from the member*.
`[A112-B4]` measures both parts and finds the second false on the failing arm — the ancestor's handle leaves
while its own pair was evaluated by no pass, and while that handle is not in the failed write's own returned
set. **Both homes of the rule must be reconciled: `kernel-surface.md §2.1` item 2 (the check-off as the only
removal) against `attempt-lifecycle.md §2.4` item 8 (i) (5) (the discard's extent).** A drive that reads only
the first finds a `SIFT`; a drive that reads only the second finds the write's-set reading violated; **the run
finds the second violated and the first satisfied.**

**2. `pending`'s populated state at the write's return is DECLARED `OWED` in the very clause that re-spells
`A112`, and this run measured the state the clause says is owed — the docs predict this re-run's central
reading in advance.** `kernel-surface.md §2.1` item 2 carries: *"THIS MEMBER'S POPULATED STATE IS `OWED` AT THE
BUILD THE BLIND RUN DROVE — a DECLARED DUTY OF THE KERNEL …, owner `role_kernel_writer`, positive revisit
condition *the caller's own loop reading a body off this member at `K-2`'s return*"*, and it adds that
`E2E-C-16` step (1) and `E2E-C-8` step (2) *"each READ RED AT THAT BUILD AND GREEN ON NOTHING ELSE"*. **The same
item also declares the state this run measured as a LAWFUL reading rather than a defect:** the handle a
caller-made write returns for a body its pass did not run *"STANDS IN THIS MEMBER AT `K-2`'S RETURN"*, and *"THE
INVOCATION THE RUN OBSERVED INSIDE THE VERB CALL'S OWN WINDOW IS THE JS SURFACE'S DECLARED ORDERED LAYER — THE
TRIGGERED CONSTRAINTS FIRST — AND NOT A STORE ACT"*, with *"a kernel invocation inside this call's own window,
which is the JS surface's constraints layer running a body for a pair its own pass evaluated"* named as one of
the two declared sources of handles in the member. **A blind writer must therefore read `[A112-D2]`'s
`0`-delivery and populated-`pending` figures as the OWED state and not as a regression, and the two named
battery steps as RED by declaration — which is what this run did.**

**3. The ordering claim is WITHDRAWN BY NAME for the one address shape a blind driver can build, and `N7`'s
hand-off is the reason.** `attempt-lifecycle.md §2.4` item 8 (ii) (e) withdraws *"a constraint runs before
other listeners AT A WATCH ADDRESS"* and *"the kernel adopts the address and, as the store's own single
function there, runs the address's constraints first and then the plain listener it was handed"* — because the
store's `on(address, listener)` REPLACES the function held for that address and the store holds ONE FUNCTION
PER ADDRESS. **Measured consequence a blind writer must not mis-read as the surface's order: an app listener
registered AFTER `K-1` runs its body inside the `K-2` window and takes the address's slot, while the kernel's
pass for that write runs in the `K-3` window (`[A112-D4]`, `[A112-D2]`); an app listener registered BEFORE
`K-1` is replaced by the kernel's registration and never runs at all.** No clause of the parts read states the
register-after or register-before hazard in one sentence; a blind writer discovers it from behaviour.

**4. `K-3`'s window is named nowhere as "the verb call" of `§2.1` item 2's instant.** The clause says
*"completes within that SAME VERB CALL"* — a verb call the caller made — and the caller makes two (`K-2`, then
`K-3`); `§2.4` item 6 opens the kernel's window at `K-2` and closes it at `K-3`'s terminal state. **The words'
plain reading fits `K-2`; the declared window arithmetic fits both; the measured delivery is in `K-3`.** This
is the ambiguity that leaves `[A112-D2]` un-exercisable rather than red, and it is named here so the supervisor
can close it in words rather than in a re-run. Related: `§2.2` item 2 says a write's constraint pass *"runs
inside the kernel's own act"* while `§2.3` item 1 says the pass runs *"AFTER THE WRITE VERB RETURNS"* — the two
sentences put the same pass on either side of the same instant.

**5. `Composition-and-states.md §2.7` row 4b's retained half contradicts its own discarded half for the same
record.** Row 4b keeps, *"byte-for-byte"*, *"the rolled-back write's set standing in `triggered` and in
`pending` NEVER"* — while `[A112-C2]` measures that same set carried by `pending` (`1` of `1`) at the write's
return and leaving during the pass, and while `kernel-surface.md §2.1` item 2 declares the caller's reading of
the whole set minus the check-offs. **The row does not say which instant its retained half talks about.**

**6. `KC-8`'s own `observable` names a member the failure path does not carry.** `fail-surface.md §2`'s `KC-8`
row reads the attempt's `rollback` member *"where the log is read instead"*; but on the throwing arm the
caller's only form is `{status, message, log}` (`fail-surface.md §1.1` item 1), which carries **no** `rollback`
member (measured, `[A112-E7]`: thrown keys `[log,message,status]`), and the step list is readable only
afterwards through `K-5`. **A drive reading `KC-8`'s declared observable at the failure has no member to read
it off.**

**7. `fail-surface.md §2`'s `KC-4` row does not pin which of its two channels a throwing repair reaches the
caller on.** One of the row's forms is *"the repair's own verb call threw the store's code"*; the run shows the
caller receiving that store code UNCONVERTED (`WriteParentNotLink`, `[A112-E8]`) while the attempt's own
`repair-run` log entry names the same code, and `KC-4`'s token appears on neither the thrown form nor that
window's report read. **The row states both the boundary rule and the `KC-4` disposal without saying which one
governs the throw.**

**8. `KC-6` is declared and unreachable from the five items' surface.** The token has a row
(`fail-surface.md §2`), an arm (`attempt-lifecycle.md §2.4` item 4 (f)) and a drive `OWED` to the store-side
pass (`J-20`–`J-22`) — but no declared act of the five items evaluates a pair twice inside one attempt, so a
blind driver of the surface cannot reach it (`[A112-E5]`). **A token whose only drive is `OWED` to a pass the
surface does not carry is not observable by a gate-5 blind run at all.**

**9. `K-4` over an open attempt is undeclared.** `parameter-semantics.md §2.15`'s `observable` cell declares
`K-5` throwing `KC-7` over a still-open attempt and `K-4` over the open record's `log` from INSIDE an
evaluation (*"a constraint body's own `K-4` call returns the open record's `log`"*); it does not state what a
`K-4` call makes outside the window over a still-open attempt. `[A112-E3]` drove the declared half from inside
and it answered (one entry, the pair's own).

**10. The two registration channels of `kernel-surface.md §2.1` item 1 are ONE handle, and no clause says
so.** `K-1` reaches the store's listener machinery through the store's own `listen` verb, and the store's
`listen` is idempotent at an address (measured: `K-1`, `store.listen`, and the instance member `on(address, …)`
all return the SAME handle, `[A112-A3]`) — so two `K-1` calls at one address under different ids return one
handle and `triggered` carries one handle for `n` pairs (`[A112-A4]`). **A reader who expects one handle per
pair will mis-derive `pending`'s extent.** The clause's *"a new id is appended; a replacement keeps its
position"* is about registry ROWS and is silent about the HANDLE.

**11. No clause declares the store's per-instance handle domain against a SECOND instance's.** Every handle in
this battery was adopted and compared by identity within one instance; nothing in the parts read tells a driver
whether two instances' handles may be compared, and this battery never compares across instances.

---

## WHAT WOULD MAKE THIS SET RED (THE HONEST-SET RULE)

Every cell prints the observable that would falsify it, and each cell's own `expected observable` line is that
sentence. **A cell whose expectation the run did not evaluate is recorded `FAIL`, not `PASS`** (the driver
enforces this; two cells were found returning no verdict during authoring and were corrected before this run).
**A cell a blind driver cannot drive is recorded `NOT-EXERCISABLE` with the clause that failed to pin it** —
that marking is a finding and never a pass. **One cell stands `FAIL` and is reported as such.**

**THE RUN'S EXIT IS NOT A GREEN.** `35` of `41` cells pass; **`1` fails against the clause it rests on
(`[A112-B4]`)**; `5` are not exercisable by this unit (`[A112-D2]`, `[A112-D5]`, `[A112-E5]`, `[A112-F4]`,
`[A112-G3]`). **`[A112-B4]` is the cell the supervisor must adjudicate**, against
`attempt-lifecycle.md §2.4` item 8 (i) (5)'s extent clause, and **`[A112-D2]` is the wording the supervisor
must close** — which verb call is *"that same verb call"* for a caller-made write. **Nothing here is a pass by
absence: the five hand-off cells are named, and the one FAIL is red.**

**BYTE WEIGHT.** This file is **`64,222` byte(s)** — inside the `110,000` byte gate for the greens artifact and
under the process's per-path line of `131,072` byte(s). The run's driver is `scratch/blind-greens-a112.mjs`
(`65,300` byte(s) at authoring, the greens artifact this pass wrote) and its record is
`scratch/blind-greens-a112-out.json` (`31,807` byte(s)); the console transcript is
`scratch/blind-greens-a112-final.txt`, and the isolated reproduction of the failing cell is
`scratch/blind-a112-fail-repro.mjs`.

**A SELF-CRITICISM ON THE RECORD, BECAUSE IT MATTERS TO HOW THIS SET IS WEIGHED.** This greens set was NOT
authored by the agent who implemented the kernel — it is a fresh derivation from the docs by a writer who read
no byte of `bindings/js/src/**` or of `bindings/js/test/**` — so the review finding *"a self-verified greens set
is worthless"* does not apply to it. The driver WAS corrected eight times during authoring (a cell helper that
let an unevaluated expectation read `PASS`; four cells whose expectation the docs' own later clauses re-grade;
one fixture whose write needed its parent landed; one measurement whose instant was wrong because the member is
live). **Every correction is named in this file's cell text where it changes a verdict, and the run reported is
the corrected run, reproduced three times on the same totals.**
