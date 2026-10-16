# LIVE GREENS — the `A112` RE-RUN of the blind green-scenario set for `U-STOREROOM-CONSTRAINTS` (`role_blind_test_writer`, GATE 5)

**Date of this run:** 2026-10-13. **Authority:** `docs/decisions.md` · `A112` (the architect's delivery-model
ruling of 2026-10-13). **Superseded set:** `docs/specs/storeroom-constraints/live-greens.md` (`125` cells)
stands UNTOUCHED as the historical record of the WITHDRAWN reading; **this file is not a verdict on it and it
is not a revision of it** — the cells below are derived FRESH from the clauses as they now stand.

> **RE-RUN POINTER (added 2026-10-14, not a rewrite of any verdict below).** The `2026-10-13` verdicts below
> STAND as the historical record. A dated re-run against the kernel build fixed for `[A112-B4]` is appended at
> **`## RE-RUN 2026-10-14 …`** at this file's end: it moves exactly one verdict, `[A112-B4]` **`FAIL` →
> `PASS`**, with **no regression**; **re-run totals `41` cells / `36` PASS / `0` FAIL / `5`
> `NOT-EXERCISABLE`**.

> **SEAM POINTER (added 2026-10-15, not a rewrite of any verdict below).** The ordering gate this file marks as
> handed off is **LANDED**: `docs/decisions.md` · **`A116`** names the seam and lifts `A115` (D1)'s refusal for
> it — `docs/specs/storeroom-js/surface.md` `§2.4` item 9 declares `settle(record) -> undefined`, the member
> **the kernel calls and the entry implements**, at the two instants (before the store's write verb; at the
> pass's terminal arm), so the entry learns that a kernel evaluation set is in play and the in-window
> invocation is withheld. **THE CELLS ABOVE THAT NAMED `N7` AS THE REASON FOR `NOT-EXERCISABLE` ARE THEREFORE
> READ THROUGH THAT RULING AND NOT AS LIVE `NOT-EXERCISABLE` STATES**, and the kernel's export set stays
> **exactly five** (`A116` (D3) refuses a sixth item by name). **The re-derived blind set that measures the seam
> is the JS surface unit's own (`bindings/js/greens/greens.mjs`; `250` authored · `247` PASS · `3` FAIL as of
> this ruling, the three reported) **⟶ AND RE-DERIVED 2026-10-16: the runner's OPERATIVE reading at the settled
> tree is `255` AUTHORED · `255` EXECUTED · `255` PASS · `0` FAIL over the SAME `16` scenarios, exit `0`,
> nothing retired — `255 = 253 + 2`, the `253` RE-POINTED to the terminal arm (the ten cells `JSG-02.10`/`.11`/
> `.14`/`.15`/`.16` and `JSG-10.16`–`.20`) plus the `2` ADDED (`JSG-02.17`/`.18`, the two halves of
> `docs/decisions.md` · `A119`) — so the `250`/`247`/`3` this clause quotes STANDS AS THE `A116` ORDERING-SEAM
> TREE'S READINGS AS OF ITS OWN DATE and the split cell it reports (`JSG-16.1`) was settled on 2026-10-15
> (`A114` (D1); `A117` (D3)–(D6): `surface.md §2.7` item 6 governs the firing)** and it is NOT a re-run of this
> file's cells.**

**WHAT THIS RUN IS FOR.** `A112` rules the delivered model in four parts: **(1)** the Rust store returns the
handles and invokes nothing; **(2)** the JS surface runs the triggered CONSTRAINTS first and, once every
constraint has passed, the OTHER LISTENERS, before returning to the calling process; **(3)** `pending` IS THE
WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, each entry leaving it ONLY BY BEING CHECKED OFF AS IT PASSES — a
`SIFT` (a subtraction not tied to that entry's own pass) being UNNECESSARY AND UNLAWFUL; **(4)** every
listener is `pending` on every write. **The clauses that carry it, all read for this pass:**
`kernel-surface.md §2.1` item 2 (the member, its declared consequence, the `SIFT` definition and the
single-valued instant), `kernel-surface.md §2.2` items 2–3, `kernel-surface.md §2.3` item 1,
`composition-and-states.md §2.7` row 4b, `attempt-lifecycle.md §2.4` item 8, `parameter-semantics.md §2.13`,
`e2e-scenarios.md` `E2E-C-8` cells 5/6 and `e2e-scenarios-b.md` `E2E-C-16` cells 2/5.

**THE ONE THING HANDED OFF, AND HOW IT IS MARKED HERE.** The **ordering gate** (constraints before the other
listeners) is enforced NOWHERE in the delivered surface and is filed as **`docs/next-steps.md` · `N7`**: the
entry cannot learn whether a constraint stands owed, because the kernel's five exports carry no such read
(`N7` also records the `P-PUB-7` allowlist blocker and the architect's two named repairs). **Every cell that
would need that ordering, or an instant the ordering fixes, is marked `NOT-EXERCISABLE` naming `N7`** —
`[A112-D5]`, the second limb of `[A112-G3]`, and `[A112-D2]` (whose instant clause, `kernel-surface.md §2.1`
item 2's *"that same verb call"*, is left unpinned for a caller who makes two verb calls): **they are NOT
reported as product failures, and they are not pretended to pass.** Each observable was still MEASURED and is
printed without a verdict.

**BLINDNESS, STATED AS THE METHOD.** Every cell below was derived from the project's own documents and from the
packages' PUBLIC SURFACES AS THE DOCUMENTS DECLARE THEM. **NO BYTE OF `bindings/js/src/**`, NO FILE OF
`bindings/js/test/**`, NO PREVIOUS GREENS SET'S RUN OUTPUT AND NO SCRATCH DRIVER WAS READ** (the byte-level
check: `bindings/js/src/constraint-kernel.mjs` was imported as the docs' declared home — `kernel-surface.md §1`
item 1 — and never opened; no scratch file of any earlier pass was opened). The run was driven through a NEW
driver authored for this re-run, and the kernel build under it is the build landed at 2026-10-15 03:42 (the
file's own mtime, read as a NAME-AND-TIME listing only).

**THE DRIVER, AND HOW TO RE-RUN IT.** `scratch/blind-greens-a112.mjs` (the greens artifact for this pass; the
wall for this role admitted files under `scratch/` only) — run from the repository root with
`node scratch/blind-greens-a112.mjs`. Its run record is `scratch/blind-greens-a112-out.json`; its console
transcript is `scratch/blind-greens-a112-final.txt`. **The fixture is the store package's own
`storeCreate({journalLength, listeners})`** (the package resolved from `scratch/node_modules/provident-storeroom`,
which the checkout itself carries); **the kernel is reached through its five declared exports only** —
`register`, `commit`, `runAttempt`, `log`, `report` — and the store through its closed `8`-verb namespace and
the instance's `{register, on, off}`. **Every handler body is FUNCTION DATA handed to `K-1`** (constraint
bodies and repair bodies alike); no cell needed an outside function, a path of its own or a driver-side
channel, and **none was admitted.**

**A THROW AT A STEP IS AN OBSERVATION, NEVER A PASS.** The driver records every cell's own verdict from the
observable it declares, catches undeclared throws, and — after the first run — refuses to let an unevaluated
expectation read as a pass (**a cell that returns no verdict is recorded `FAIL`**; two cells were corrected
this way during authoring and the run was repeated). The run is deterministic: three consecutive runs printed
the same totals and the same failing set.

**HOW TO READ AN OP ID.** `op-N` ordinals are minted by the store in execution order and are not reproducible
across runs; **every cell asserts an IDENTITY or a COUNT, never an ordinal.**

**A `pending` READING'S INSTANT IS PART OF THE CELL.** `CommitRecord.pending` is a LIVE member: the check-off
the same record's window performs is observable in place (see `[A112-B5]`/`[A112-B6]`). Every cell below says
which instant it read — **at K-2's return** (the writing instant's record), **after K-3** (the reading the
clause calls the caller's own), or both.

---

## THE RUN'S OWN TOTALS

| Term | Figure |
| --- | --- |
| cells | **`41`** |
| pass | **`35`** |
| fail | **`1`** (`[A112-B4]`) |
| not-exercisable | **`5`** (`[A112-D2]`, `[A112-D5]`, `[A112-E5]`, `[A112-F4]`, `[A112-G3]`) |

**Per-group:** A `4` PASS of `4` · B `5` PASS and `1` FAIL of `6` · C `4` PASS of `4` · D `3` PASS and `2`
NOT-EXERCISABLE of `5` · E `6` PASS and `1` NOT-EXERCISABLE of `7` · F `3` PASS and `1` NOT-EXERCISABLE of
`4` · G `5` PASS and `1` NOT-EXERCISABLE of `6` · H `3` PASS of `3`.

**VERDICT, STATED PLAINLY: the set is NOT green.** **One** cell FAILS against the clause it rests on —
`[A112-B4]`: an entry left `pending` whose pair no pass of that attempt evaluated, so it cannot have left by
being checked off as it passed. **The one FAIL is not a pass and may not be read as one.** Five cells are
`NOT-EXERCISABLE` and are findings about the docs and about hand-offs, never verdicts: three of them the
ordering hand-off `N7`, one a state no declared drive reaches, one an act no declared observable reads.


---

## THE CELLS


### GROUP A — the declared surfaces

*the five kernel items, the closed `8`-verb store namespace, the instance's three members, the adopted handle, the record shape* — 4 cells: **4 PASS / 0 FAIL / 0 NOT-EXERCISABLE**.

#### `[A112-A1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §1 item 2; parameter-semantics.md §2.13 (domain/observable)
- **The exact drive.** import the kernel module and read its module namespace
- **The expected observable.** exactly the five items K-1..K-5 and no sixth
- **PASS.** Observed: keys=[commit,log,register,report,runAttempt] allFunctions=true

#### `[A112-A2]` — **`PASS`**

- **Clause it rests on.** docs/specs/storeroom-js/surface.md §2.9 item 1 (8 verbs); kernel-surface.md §2.1 item 1 (K-1 reaches the store through listen)
- **The exact drive.** read the store package module namespace
- **The expected observable.** the closed 8-verb namespace and no ninth name; the instance carries {register,on,off}
- **PASS.** Observed: store=[delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write] instance=[off,on,register]

#### `[A112-A3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 1 (return shape, adopted handle, address-level idempotence; native §6.5 item 12 (c))
- **The exact drive.** K-1 twice at the same pair; twice at the same address under a different id; store.listen at that address; the instance member on(address,fn)
- **The expected observable.** one adopted handle for the address on all four calls
- **PASS.** Observed: equal-adopted=true

#### `[A112-A4]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (record shape); docs/specs/storeroom-js/surface.md §2.2 (write return)
- **The exact drive.** K-2 and read its members against the store write verb's own return
- **The expected observable.** CommitRecord = {attempt,op,triggered,pending}; triggered carries the store's returned handle verbatim
- **PASS.** Observed: keys=[attempt,op,pending,triggered] triggered==[K-1 handle]=true attemptKeys=[id] opKind=write

### GROUP B — `pending` IS THE WHOLE RETURNED SET; the CHECK-OFF; the `SIFT`'s absence

*the member read as the caller reads it, the entry that leaves only by its own check-off, the entry no pass evaluated, the subtraction by mechanism* — 6 cells: **5 PASS / 1 FAIL / 0 NOT-EXERCISABLE**.

#### `[A112-B1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (the whole returned set written as `pending`; the entry leaves it ONLY by being CHECKED OFF AS IT PASSES)
- **The exact drive.** two distinct ids registered at ONE address (`p`,`q`, so one handle — A3/A4) + an app listener through the instance member at that address; K-2 and read `pending` against `triggered` at the return; count the listener bodies that ran inside that window
- **The expected observable.** pending is the whole returned set: every handle of triggered is present in pending
- **PASS.** Observed: triggered=1 pending=1 whole=true noExtra=true listenerCalls=1

#### `[A112-B2]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (an entry the pass did not evaluate stands in the member); §2.2 item 2 (the pass's set is address-scoped); §2.3 item 1 (address-scoped evaluation)
- **The exact drive.** pair at the ancestor address [a]; the parent is landed by a bare store.write there; K-2 at the descendant address [a,b]
- **The expected observable.** the ancestor pair's handle is returned because [a] is a prefix of the landing; the attempt's own pass is address-scoped and never evaluates it, so it stands in pending at the return
- **PASS.** Observed: triggered=1 pending=1 ancestorHandleCarried=true ancestorBodyCallsAtK-2=0

#### `[A112-B3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (SIFT definition: a subtraction NOT tied to that entry's own pass is unlawful; an entry leaves only by being checked off AS IT PASSES)
- **The exact drive.** the SAME handle as B1: K-2, read `pending`, then K-3 (the pass) and read `pending` again in place; the same fixture is then driven with a pair that FAILS its own pass
- **The expected observable.** the subtraction is accounted for: every handle that leaves `pending` did so against a delivery of its own pair that PASSED, and no handle leaves otherwise
- **PASS.** Observed: no SIFT at the write: PASSING record at K-2 return triggered=1 pending=1 (subtraction absent); its pair's own pass then ran and passed (1 call) and the entry left (pending 1 to 0); the SAME shape with a FAILING pair: at K-2 pending=1 to 0 after the pass, while the pair never passed (1 call, returned a violation, token KC-3) = a subtraction NOT tied to that entry's own pass = true

#### `[A112-B4]` — **`FAIL`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (SIFT absent BY THE MECHANISM: a SIFT is a subtraction not tied to that entry's own pass; and an entry leaves the member ONLY by being checked off as it passes); §2.2 item 2 (layer (b) s observable is `pending`); attempt-lifecycle.md §2.4 item 8 (i) (5) (the extent clause: a failing arm s record reads `pending` EMPTY because NO pass checks any entry of it off, and NO ENTRY THE FAILED WRITE S SET DID NOT RETURN IS EVER REMOVED FROM THE MEMBER)
- **The exact drive.** ancestor pair [a]#cL that NO pass of the attempt evaluates + a VIOLATION at the attempt's own address; K-2, K-3 (throws), read `pending` at the write's return and in place after the pass; then the same fixture with the attempt's own pair PASSING
- **The expected observable.** on the failing arm every handle of the failed write's own returned set leaves and no pass checks any of them off, and the never-evaluated ancestor's handle leaves only if the failed write's set returned it; on the passing arm the never-evaluated ancestor entry STANDS in `pending`
- **FAIL.** Observed: failing arm: at the write's return triggered=2 pending=2 (the whole returned set, no SIFT); after the pass pending=0, the never-evaluated ancestor handle still present=false, and its pair was evaluated by NO pass (ancestor body calls=0, the pass being address-scoped to the attempt's own address) so it CANNOT have left by being checked off as it passed; failing pair token=KC-3. PASSING arm of the SAME fixture: after the pass pending=1 with the ancestor handle standing=true (ancestor calls=0, outcome=passed) — so the removal on the failing arm is not a check-off, and it is not the discard of the failed write's own set either, because the ancestor handle was returned by the ANCESTOR s write, not by the failed one

#### `[A112-B5]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (the caller reads the record only after the verb call's window closes; the write-instant whole set is NOT a caller-observable reading); §2.2 item 3
- **The exact drive.** the record object returned by K-2 is read again after K-3 returns (the window that performs the check-off)
- **The expected observable.** the caller's reading tracks the subtraction: the entries checked off as they passed are gone from the member the record carries
- **PASS.** Observed: pending.length at K-2 return=1, after K-3=0, report.outcome=passed

#### `[A112-B6]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (the whole set is written, and it is the set the store's return carried); §2.2 item 2 (the store invokes nothing)
- **The exact drive.** K-2 whose pair passes, then K-3, then K-2 again at the same address; read `pending` at each return
- **The expected observable.** each write writes its own whole returned set: a fresh K-2 carries its own set, not a residue of the first
- **PASS.** Observed: K-2(1) at its return: triggered=1 pending=1 bodyCalls=0 -> after K-3 pending=0; K-2(2) at its return: triggered=1 pending=1 bodyCalls=1 -> after K-3 pending=0; the pair's body ran once per write, inside the two K-3 windows

### GROUP C — the failed/discarded arm, and one delivery per evaluated pair

*the throwing arm, the discard question, per-pair delivery, the one comparable order* — 4 cells: **4 PASS / 0 FAIL / 0 NOT-EXERCISABLE**.

#### `[A112-C1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (on a throwing arm the caller's loop performs no invocation for any handle this member carries) + attempt-lifecycle.md §2.4 item 8 (i) (5)
- **The exact drive.** a violating pair with no repair: K-2 (pending read), K-3 throws, read pending in place, then run the caller's own loop shape over whatever remains
- **The expected observable.** the arm reaches the loop with nothing left in it to invoke
- **PASS.** Observed: token=KC-3 pendingAfterThrow=0 caller-loop invocations=0 pairBodyCallsInsideK-3=1

#### `[A112-C2]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (the failed/discarded arm: a rolled-back write's handles are carried by `pending` NEVER); §2.2 item 2 (layer (b) s observable)
- **The exact drive.** same fixture as C1, read against the claim that its triggered set was DISCARDED rather than carried
- **The expected observable.** a write whose set is discarded carries `pending` == [] from the write itself on; a write whose set is not discarded carries it and it leaves only by check-off
- **PASS.** Observed: at K-2: triggered=1 pending=1 (discarded arm=false); after the failing K-3 pending=0; token=KC-3 -> the removal happened in the K-3 window, not at the write

#### `[A112-C3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.2 item 2 (one delivery per evaluated pair, each carrying THAT PAIR S OWN FUNCTION, and for no other)
- **The exact drive.** two pairs `p`,`q` at one address, each body recording its own mark; K-2 then K-3
- **The expected observable.** each evaluated pair delivers its own function exactly once, and no other
- **PASS.** Observed: delivered=[pq] constraint-check ids=[p,q] outcome=passed

#### `[A112-C4]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.2 item 3 (the one comparable order is the registry's own first-registration order); §2.1 item 1 (a new id is appended; a replacement keeps its position)
- **The exact drive.** three pairs registered as `b`,`a`,`c` at one address, then `b` re-registered with a NEW function; K-2, K-3
- **The expected observable.** the pass s `constraint-check` id sequence is the registry s first-registration order b,a,c and the replacement moves nothing
- **PASS.** Observed: constraint-check order=[b,a,c] replacementRan=1

### GROUP D — the store invokes nothing; the two ordered layers

*the store's silence, the in-window instant, layer (b), the `N7` hand-off* — 5 cells: **3 PASS / 0 FAIL / 2 NOT-EXERCISABLE**.

#### `[A112-D1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.2 item 2 (THE STORE RETURNS THE HANDLES AND INVOKES NOTHING; a handle in the kernel's registry that the store has no listener function for fires nothing); docs/specs/storeroom-js/surface.md §2.4 rules 1–4
- **The exact drive.** K-1 with a constraint whose body counts; store.unlisten(instance, handle) withdraws the store's home entry; a bare store.write at that address afterwards
- **The expected observable.** the store invokes nothing: the constraint body's count stays 0 on the bare write
- **PASS.** Observed: body calls after a bare store.write with the entry standing=0, after unlisten=0, write error=none

#### `[A112-D2]` — **`NOT-EXERCISABLE`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (for a caller-made write the constraints layer s run completes inside the verb call's own window, before it returns to the calling process; §2.2 item 2 the same); attempt-lifecycle.md §2.4 item 6 (the kernel's window opens at K-2 and closes at K-3 s terminal state). NOT `E2E-C-8` step (2), whose own drive runs a `commit`/`runAttempt` sequence INSIDE the listener body
- **The exact drive.** K-1 then K-2 with a constraint body that counts and an app listener registered through the instance member after K-1; read both counts and the record at K-2's return, then K-3
- **The expected observable.** at K-2's return the constraint body has run AND its handle has been checked off, and no body of another kind of that same call has run yet
- **NOT-EXERCISABLE.** Observed: MEASURED, WITHOUT VERDICT: at K-2's return constraint body calls=0 (the clause would have it completed), pending.length=1 of triggered.length=1 (no check-off), while the app listener's body calls=1 — a body of ANOTHER kind ran inside the write's own window and the constraint of that same write had not; after K-3 the pass delivered (constraint calls=1, listener calls=1, outcome=passed, pending 0). The populated `pending` at K-2's return is the clause's own declared state (kernel-surface.md §2.1 item 2: the handle a caller-made write returns for a body its pass has not run STANDS IN THIS MEMBER AT K-2 S RETURN).
- **Which clause failed to pin what a blind driver needs.** WHICH VERB CALL IS *"THAT SAME VERB CALL"* IS NOT PINNED FOR A CALLER WHO MAKES TWO: a caller-made write makes K-2 and then K-3, §2.4 item 6 reads the kernel's window as opens-at-K-2 / closes-at-K-3, and §2.1 item 2 s instant is spelled on the verb call without naming K-2. AND THE ORDER ITSELF IS THE HAND-OFF: whether a body of another kind may run inside the write's window while a constraint of that same write stands owed is `docs/next-steps.md` · `N7` (the ordering gate is enforced nowhere in the delivered surface; importing the kernel into the entry collides with `P-PUB-7` s allowlist, so the architect s named repairs are a declared sixth kernel read or a signal through the store's own listener surface), and `attempt-lifecycle.md §2.4` item 8 (ii) (e) WITHDRAWS BY NAME the two phrasings that made *"before other listeners"* a claim about a watch address's own function slot — the store holds ONE FUNCTION PER ADDRESS and `on` REPLACES it, so at one address the reachable states are *the address s constraints evaluated from the kernel's own window with no other body running from the store there* or *the plain listener's body run by whoever registered it last with no constraint pass delivered from that address*. THE OBSERVABLE IS THEREFORE READ AS THAT UNREACHABLE ORDER S STATE AND IS NOT REPORTED AS A PRODUCT FAILURE. (The same reading s other half — the ORDER — is `[A112-D5]`.)

#### `[A112-D3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.2 item 2 (layer (b) = the caller's own loop over CommitRecord.pending, one invoker among the surface's ordered layers); §2.1 item 2 (the loop s call shape and its one argument)
- **The exact drive.** K-2 with the instance listener registered and its handle kept; after K-3 return, run the caller's own loop over the handles remaining in `pending`
- **The expected observable.** the caller's loop reads its work off `pending` and invokes each remaining handle once — for a passing pair's already-checked-off handle there is nothing left to invoke
- **PASS.** Observed: handles left in `pending` after K-3=0; caller-loop invocations=0; outcome=passed

#### `[A112-D4]` — **`PASS`**

- **Clause it rests on.** docs/specs/storeroom-js/surface.md §2.4 rule 1 + kernel-surface.md §2.1 item 1 (an unregistered handle fires nothing, silently)
- **The exact drive.** register the instance listener AFTER K-1 (so the store's one function at that address is the kernel's no-op), K-2, and read the app's listener count
- **The expected observable.** a listener the app registered after the kernel's adoption is not invoked while the kernel's registration stands
- **PASS.** Observed: on() returned the SAME adopted handle=true; kernel body runs at K-3 (delivery); app listener calls at K-2=1, after K-3=1; outcome=passed; pending after K-3=0

#### `[A112-D5]` — **`NOT-EXERCISABLE`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (THE ORDER: every layer (a) delivery of the call completes before any layer (b) body of that call runs) + §2.2 item 2; docs/next-steps.md N7
- **The exact drive.** register a plain listener at the constraint's address AFTER K-1 so its body runs; observe whether it runs while the constraint of the same write stands owed (constraint body call count at that instant)
- **The expected observable.** the constraint's own delivery of that write has completed before any plain listener body of that call runs
- **NOT-EXERCISABLE.** Observed: the ordering of the two layers of one call.
- **Which clause failed to pin what a blind driver needs.** MEASURED, WITHOUT VERDICT: with `on()` issued AFTER `K-1` (so the store's one function at that address is the app's and its body runs), the app listener's body ran inside K-2's window while the constraint body's count for that same write stood at 0 (A112-D2/A112-D4) — i.e. a layer (b) body of the call ran while the constraint of the same call stood owed. WHETHER THE SURFACE OWES THE ORDER IS WHAT THE HAND-OFF RESERVES: the ordering gate is HANDED OFF and enforced nowhere in the delivered surface (docs/next-steps.md N7: the entry cannot learn whether a constraint stands owed — the kernel's five exports carry no such read). OBSERVED, WITHOUT VERDICT: with `on()` issued after `K-1`, the listener body ran inside the K-2 window while the constraint body's count stood at 0 for that same write (measured in A112-D2/D4).

### GROUP E — the hold/release edges, the repeat states and the repair states

*`KC-7` hold and release, `KC-5`, `KC-6`, `KC-4`, the body-throw arm, the `KC-8` floor* — 9 cells: **8 PASS / 0 FAIL / 1 NOT-EXERCISABLE**.

#### `[A112-E1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (an address is held from the moment K-2 s write verb returns until the attempt's terminal arm; a second K-2 at a held address is refused KC-7 BEFORE the write verb is reached); fail-surface.md §2 KC-7
- **The exact drive.** K-2 at [a]; a second K-2 at [a] while the first attempt is open; then K-3 for the first; then a fresh K-2 at [a]
- **The expected observable.** KC-7 before the write verb (no write happened), and no KC-7 after the terminal arm
- **PASS.** Observed: second K-2 while open=KC-7 (the address still reads 1 at that instant, i.e. the value the first write landed and NOT the refused one, so the refused call did not land its write); first arm=passed; fresh K-2 after the terminal arm=returned keys=[attempt,op,pending,triggered]

#### `[A112-E2]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (the hold is released by the attempt's own TERMINAL ARM and by no other act, and a delivery of the write's handles releases nothing); fail-surface.md §2 KC-7 (a failure arm s standing remainder is RESIDUE, not a live attempt)
- **The exact drive.** K-2 with a violating pair (the attempt reaches a FAILING terminal arm), then a fresh K-2 at that address and a read of the store's own surface there
- **The expected observable.** no KC-7, the write verb is reached; what the store then answers about the pre-state is OWED to J-20–J-22 and is not read here
- **PASS.** Observed: failing arm=KC-3; fresh K-2=returned keys=[attempt,op,pending,triggered]; read([a])=2 (the pre-state is OWED to J-20–J-22 and is NOT a verification of this surface)

#### `[A112-E3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 3 (a live attempt's re-entrant run is refused KC-7) + attempt-lifecycle.md §2.4 item 8 (ii) (b); fail-surface.md §2 KC-7 (the K-5 site)
- **The exact drive.** inside a constraint body of the live attempt: call K-2 at the attempt's own address, K-3 for the live attempt, K-1 at a new pair, K-4, and K-5 over the live attempt
- **The expected observable.** KC-7 for K-2 and for K-3 and for K-5; K-1 admitted; K-4 returns the open record's log; the log s seq/kind/id sequence is unchanged
- **PASS.** Observed: K-2=KC-7 K-3=KC-7 K-1=admitted K-5=KC-7 K-4=[1:constraint-check:p] outcome=passed

#### `[A112-E4]` — **`PASS`**

- **Clause it rests on.** fail-surface.md §2 KC-5 (an evaluation violates a pair that is in `ran` and IN `appliedRepairs`: the repair's own edit was broken); attempt-lifecycle.md §2.4 item 4 arm (e)
- **The exact drive.** a pair that fails, is repaired by a write, then FAILS AGAIN on the re-run of the repaired op; read the token and the log
- **The expected observable.** KC-5 carried by the thrown form's status and by the `outcome` entry's state, with exactly ONE `repair-run` entry for that pair
- **PASS.** Observed: status=KC-5 outcomeEntry.state=KC-5 repair-run(p)=1 constraint-check(p)=2 rows=[constraint-check:null:p,repair-run:null:p,constraint-check:null:p,outcome:KC-5:null]

#### `[A112-E5]` — **`NOT-EXERCISABLE`**

- **Clause it rests on.** fail-surface.md §2 KC-6 (an evaluation violates a pair in `ran` that is NOT in `appliedRepairs`); attempt-lifecycle.md §2.4 item 4 arm (f)
- **The exact drive.** a pair that passes (entering `ran` and not `appliedRepairs`) and is violated a SECOND time inside ONE attempt
- **The expected observable.** KC-6 carried by the thrown form's status and by the `outcome` entry's state
- **NOT-EXERCISABLE.** Observed: NO DECLARED DRIVE of the five items reaches this state.
- **Which clause failed to pin what a blind driver needs.** a blind driver of the five declared items has no declared means to evaluate a pair twice inside one attempt with the pair absent from `appliedRepairs`: the kernel's own pass evaluates each pair at most once per pass (composition-and-states.md §2.6 item 8 (i)) and a re-run of the address is caused only by a repair's own landing, which is by construction the pair whose repair RAN. The per-landing pass that could evaluate a pair a second time is `OWED` to J-20–J-22 (composition-and-states.md §2.6 item 8 (iii)) and its delivery is performed by no store act (kernel-surface.md §2.3 item 1). NO CLAUSE PINS THE DRIVE.

#### `[A112-E6]` — **`PASS`**

- **Clause it rests on.** composition-and-states.md §2.6 items 4–5 and 8 (iv) (the composition's own act reaches KC-8 where a still-owed op s call meets the store's floor); fail-surface.md §2 KC-8 (the ONE `outcome` entry carries its token)
- **The exact drive.** journalLength 2; a repair landing a chain of ops at other addresses, then a violation of the repaired pair so the attempt fails and its composition walks the still-owed ops
- **The expected observable.** KC-8 carried by the thrown form's status and by the attempt's ONE `outcome` entry's state, that entry naming the store's own answer
- **PASS.** Observed: status=KC-8 outcomeEntries=1 outcome.state=KC-8 message names the store's answer=true

#### `[A112-E7]` — **`PASS`**

- **Clause it rests on.** fail-surface.md §2 KC-8 (observable: the attempt's `rollback` member carries one `RollbackStep` per performed call); kernel-surface.md §2.1 item 3 (`rollback` is what the composition did); composition-and-states.md §2.6 item 3
- **The exact drive.** the same KC-8 fixture, then K-5 `report` over the closed attempt, read for the `rollback` member
- **The expected observable.** a closed attempt's report carries the RollbackStep list the composition performed
- **PASS.** Observed: thrown form keys=[log,message,status] K-5=returned rollback steps=2 step member set=[answer,checkpoint,failed,opId,restoredTo,undoneOps] first step={"opId":"op-38","answer":"ok","failed":false,"undoneOps":["op-38"],"restoredTo":{"present":false},"checkpoint":null}

#### `[A112-E8]` — **`PASS`**

- **Clause it rests on.** fail-surface.md §2 KC-4 (the repair transition: the repair returns `{ok:false,message}` / the repair's own verb call threw the store's code / it produced no op); kernel-surface.md §2.3 item 2
- **The exact drive.** a repair registered for a violated pair whose edit is made through the caller's own store verb and is REFUSED by the store; read the token, the `repair-run` entry s message and the `ops` list
- **The expected observable.** the kernel's answer is KC-4, its message NAMES the store's own code, and `ops` holds no op for the attempt
- **PASS.** Observed: thrown token=WriteParentNotLink (a store code? yes; a KC token? no) — the throw is the repair body's OWN verb call, so the caller receives the STORE's own code unconverted; the attempt's `repair-run` log entry names it: codeInMessage=yes; report.outcome=failed report.ops.length=1 repair-run.message=the repair p was attempted and the store refused its own edit — the store's answer is WriteParentNotLink

#### `[A112-E9]` — **`PASS`**

- **Clause it rests on.** composition-and-states.md §2.7 item 13 (a BODY that throws: the caller receives the BODY S OWN THROWABLE unchanged, the `outcome` entry reads `null` on the CONSTRAINT-body path, and the attempt is disposed of)
- **The exact drive.** a constraint body that throws; K-3; then K-4/K-5 over the closed reference and a fresh K-2 at the freed address
- **The expected observable.** the body's own throwable, unchanged; the closed record's `outcome` entry reads `null`; a fresh K-2 returns a record
- **PASS.** Observed: thrown is the body's own Error=true message=blind-body-throw closure.readState=undefined outcome.state=null fresh K-2=returned keys=[attempt,op,pending,triggered]

### GROUP F — the store's own channel and the five items' boundary

*the two registration channels, the store's codes verbatim, the one failure form* — 4 cells: **3 PASS / 0 FAIL / 1 NOT-EXERCISABLE**.

#### `[A112-F1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 1 (channel (i): KC-1 for an address shape outside the domain — null, undefined, a non-array — refused by the kernel BEFORE listen); fail-surface.md §2 KC-1 row
- **The exact drive.** K-1 with a null address, with a non-array address, with a blank-token array, with an empty id and with a non-function constraint
- **The expected observable.** KC-1 for the two outside address shapes; KC-2 for the empty id and the non-function; the token carried by the thrown form s `status`
- **PASS.** Observed: {"null":"KC-1","nonArray":"KC-1","blankToken":"none(no throw)","emptyId":"KC-2","nonFunction":"KC-2"} (the blank token `' ' is ADMITTED by the fail-surface KC-1 row's own re-derivation, so it must not throw)

#### `[A112-F2]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 2 (THROWS: the store's own code VERBATIM, the ONE item of the surface whose failure is the store s) + §2.1 item 1 channel (ii)
- **The exact drive.** K-2 whose write the store refuses (a tier outside the domain), read the thrown object
- **The expected observable.** the thrown object is the store's own code, unconverted, and no `KC` token appears; no attempt is opened and the address holds none
- **PASS.** Observed: store refusals read at K-2: tier=OutOfDomainTier (a KC token? false); an in-domain K-2 at the same address returned a record — so the refused call opened no attempt; a second K-2 at that address=KC-7

#### `[A112-F3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 3 (K-3 s throws are KC-3..KC-8) + attempt-lifecycle.md §2.4 item 8 (i); fail-surface.md §1.1 (the three-member failure form)
- **The exact drive.** read the member set of every thrown kernel form observed across the run's windows
- **The expected observable.** one form: exactly {status, message, log}, with the `log` carrying LogEntry members
- **PASS.** Observed: form keys=[log,message,status] LogEntry keys=[id,kind,message,opId,seq,state] status=KC-3 matches KC-1..KC-8=yes outcome.state=KC-3

#### `[A112-F4]` — **`NOT-EXERCISABLE`**

- **Clause it rests on.** kernel-surface.md §1 item 3 (the kernel declares NO store verb, member or function-carrying store parameter) — read against attempt-lifecycle.md §2.4 item 8 (ii) (e)
- **The exact drive.** a check that the kernel reaches the store only through the store's own declared verbs
- **The expected observable.** the kernel holds no store function and mints no store member
- **NOT-EXERCISABLE.** Observed: NO DECLARED OBSERVABLE of the five items reads the kernel's own act.
- **Which clause failed to pin what a blind driver needs.** NOT DRIVABLE WITHOUT READING THE IMPLEMENTATION: no declared member of the five items exposes the kernel's own call sites or what it holds (composition-and-states.md §2.7 item 12 enumerates the substitutions for states the five items do not expose, and none of them reaches this). Only a source read or a store-side interception would answer it, and both are outside a blind drive.

### GROUP G — the composition, the floor stop, and the two named batteries

*the call list, the floor stop, `E2E-C-8`, `E2E-C-16`* — 6 cells: **5 PASS / 0 FAIL / 1 NOT-EXERCISABLE**.

#### `[A112-G1]` — **`PASS`**

- **Clause it rests on.** composition-and-states.md §2.6 item 3 (a step is recorded for every call ISSUED; `rollback` is [] on the success arm and 1+ on a failure arm whose composition has a still-owed op)
- **The exact drive.** a passing attempt with a repair landing one op; read report.rollback on the success arm, then a failing attempt's report through K-5
- **The expected observable.** success arm: `rollback` == [] (an empty list, never an absent member); failure arm: one step per performed call
- **PASS.** Observed: success arm: report.rollback=[] ops=2; failure arm (KC-5): K-5 report rollback steps=2

#### `[A112-G2]` — **`PASS`**

- **Clause it rests on.** e2e-scenarios.md E2E-C-8 cells 2 and 5 (window (α) the app's own call; window (β) the same pair and the same value with the sequence run inside the app's own listener body; the compared members `outcome`, the `ops` kind sequence and the `log` length and kind/id/state sequences)
- **The exact drive.** window (α): register/commit/runAttempt from an external call site. window (β): the same pair registered, the same value written, and commit/runAttempt called INSIDE the app's listener body for the write it observed. Compare the declared members
- **The expected observable.** the two windows reports read EQUAL on outcome, on the ops kind sequence and on the log's kind/id/state sequences (message strings excluded)
- **PASS.** Observed: alpha={{"outcome":"KC-3","opsKinds":"","log":"constraint-check/c/null,outcome/null/KC-3","pending":0,"triggered":1}} betaListenerRan=true={{"pending":1,"triggered":1,"outcome":"KC-3","opsKinds":"","log":"constraint-check/c/null,outcome/null/KC-3"}} equal=true (the listener is INVOKED by the package's own delivery loop, so window (β) exists; the ORDER inside it is A112-D5 s hand-off)

#### `[A112-G3]` — **`NOT-EXERCISABLE`**

- **Clause it rests on.** e2e-scenarios.md E2E-C-8 cell 6 (the re-derived falsifier: FALSIFIED BY a `pending` that OMITS any handle of the set the write returned, or by a `pending` READ AS CARRYING A LISTENER THE CONSTRAINTS HAVE NOT YET PASSED)
- **The exact drive.** read `CommitRecord.pending` in window (β) — the listener-body window of E2E-C-8 — against the write s whole returned set
- **The expected observable.** no handle of the returned set is omitted, and no entry is read as carrying a listener the constraints have not yet passed
- **NOT-EXERCISABLE.** Observed: the falsifier s second limb is not readable by this unit.
- **Which clause failed to pin what a blind driver needs.** the second limb of this cell's own falsifier is the ORDERING GATE: whether a listener stands in `pending` while a constraint of that write is unchecked is what the entry cannot learn (docs/next-steps.md N7), so the cell cannot be read as a pass-or-fail by this unit. The FIRST limb is driven by A112-B1/B2/B4 and is reported there.

#### `[A112-G4]` — **`PASS`**

- **Clause it rests on.** e2e-scenarios-b.md E2E-C-16 cell 2 (the start point: an ancestor pair `a#cL` whose handle the caller's descendant write returns, and NO pass of that attempt checks it off, so it stands in `pending` at K-2's return for the caller's own loop)
- **The exact drive.** pair at [a]; a bare store write lands the parent; K-2 at the descendant [a,b]; then K-3
- **The expected observable.** the ancestor pair's handle stands in `triggered` (the store's own prefix rule) and in `pending`, and no pass of that attempt checks it off (the pass is address-scoped)
- **PASS.** Observed: triggered=1 pending at K-2=1 at K-3=1 ancestor still in pending=true ancestor body calls=0 outcome=passed

#### `[A112-G5]` — **`PASS`**

- **Clause it rests on.** e2e-scenarios-b.md E2E-C-16 cell 5 (a second TOP-LEVEL K-2 at another address while the first stands OPEN is LAWFUL — KC-7 is refused only at the address that holds the live attempt) + docs/decisions.md A106 Q2
- **The exact drive.** K-2 at [a,d] (attempt 1 OPEN); K-2 at [a,b] while attempt 1 is still open; read the second return
- **The expected observable.** the second K-2 returns a fresh CommitRecord and throws no KC-7 (the first attempt's address only is held)
- **PASS.** Observed: second K-2 while attempt 1 OPEN=returned keys=[attempt,op,pending,triggered] triggered=1 pending=1; attempt 1 arm=passed

#### `[A112-G6]` — **`PASS`**

- **Clause it rests on.** composition-and-states.md §3 item 3 (the composition s call list and the floor stop are NOT re-opened by A112: the step count is the calls ISSUED and a call meeting the store's floor stops the walk); §2.6 item 6 (a) (the ONE `outcome` entry carries KC-8)
- **The exact drive.** the A112-E6 floor fixture, read for the walk s stop: the `outcome` entry's count and the token it carries, against the pass's own arm
- **The expected observable.** exactly ONE `outcome` entry, carrying KC-8 and not the pass's own arm (KC-5), with the floor's answer named in its message
- **PASS.** Observed: outcome entries=1 token(s)=[KC-8] message names the store's answer AND the op=true rows=[constraint-check:null,repair-run:null,constraint-check:null,outcome:KC-8]

### GROUP H — the message log and the readers

*`LogEntry`, `K-4`/`K-5`, `AttemptContext`* — 3 cells: **3 PASS / 0 FAIL / 0 NOT-EXERCISABLE**.

#### `[A112-H1]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.5 item 1 (LogEntry s exactly six members; four kinds; `seq` strictly increasing from 1; `state` null on the three non-outcome kinds); §2.1 item 4 (K-4's order)
- **The exact drive.** a passing attempt with a repair: read the report's log and assert the member set, the kind set and the seq order
- **The expected observable.** every entry carries exactly {seq,kind,id,message,opId,state}; seq is 1..n ascending with no gap
- **PASS.** Observed: memberSetUniform=true seqs=[1,2,3,4] ascending-from-1=true kinds=[commit,constraint-check,repair-run] nonOutcome state null=true K-4 seqs=[1,2,3,4]

#### `[A112-H2]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.1 item 4 and item 5 (`K-4`/`K-5` over a CLOSED attempt return the closed record's own log and report; `K-3`'s return and `K-5`'s return are ONE SHAPE; a stale reference is refused KC-2 at K-3)
- **The exact drive.** a closed passing attempt: K-4, K-5, then K-3 with the same stale CommitRecord
- **The expected observable.** K-4 returns the final log; K-5 s five members equal K-3 s report; K-3 over the closed record throws KC-2 (and not KC-7)
- **PASS.** Observed: K-5 members=[attempt,log,ops,outcome,rollback] K-5 == K-3 report=true K-4 length=2 stale K-3 token=KC-2

#### `[A112-H3]` — **`PASS`**

- **Clause it rests on.** kernel-surface.md §2.3 item 1 (AttemptContext s exactly five members); parameter-semantics.md §2.16
- **The exact drive.** capture the argument the constraint body receives and read its member set
- **The expected observable.** exactly {address, tier, value, attempt, op}
- **PASS.** Observed: AttemptContext members=[address,attempt,op,tier,value] ctx.op.kind=write outcome=passed

---


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


---

## RE-RUN 2026-10-14 — THE SAME SET AGAINST THE KERNEL BUILD FIXED FOR `[A112-B4]` (`role_blind_test_writer`, GATE 5, re-run)

**Everything above this line is the `2026-10-13` run and stands as the historical record; not one cell text or
verdict above was rewritten by this re-run.** This section is the re-run of the SAME `41` cells against the
kernel build landed after it (`bindings/js/src/constraint-kernel.mjs`, mtime `2026-10-15 04:25:51`, read as a
name-and-time listing only). Same fixtures, same cells, **no expectation edited to fit a result**.

**Driver and record.** The re-run drove a fresh copy of the same driver,
`scratch/rerun-a112-kernel-fix/blind-greens-a112-rerun.mjs`, with the ORIGINAL
`scratch/blind-greens-a112.mjs` also run unchanged (`scratch/rerun-a112-kernel-fix/run-unchanged-1..3.txt`). The
copy differs from the original by exactly TWO edits: the relative import path (`../../`), and the cell
`[A112-B4]`'s own return line, whose verdict was previously SPELLED `FAIL` so that it could not move whatever
the observable was. The derived verdict is the clause's own falsifier: an entry leaves `pending` ONLY by being
checked off AS IT PASSES, and the one lawful removal beside a check-off is the DISCARD, which reaches exactly
the FAILED write's OWN returned set — so `FAIL` iff the ancestor handle is gone while its own pair was evaluated
by NO pass and while that handle is not in the failed write's returned set. Records:
`scratch/rerun-a112-kernel-fix/record-verdict-1..3.json`; console transcripts
`scratch/rerun-a112-kernel-fix/run-verdict-1..3.txt`; the pre-pass record and transcript are preserved at
`scratch/blind-greens-a112-out.gate5-first.json` and `scratch/blind-greens-a112-final.gate5-first.txt`.

**THE ONE VERDICT THAT MOVED.**

| Cell | Before (2026-10-13) | After (this re-run) |
| --- | --- | --- |
| `[A112-B4]` | **`FAIL`** | **`PASS`** |

**Observed, re-run** (`record-verdict-*.json`, identical in all three runs): failing arm — at the write's
return `triggered=2`, `pending=2` (the whole returned set, no `SIFT`), the failing pair's token `KC-3`; **after
the pass `pending=1`** and the never-evaluated ancestor handle **still present `true`** (ancestor body calls
`0`). PASSING arm of the same fixture — after the pass `pending=1`, ancestor handle standing `true`, ancestor
calls `0`, `outcome='passed'`. **The removal on the failing arm now reaches ONE entry and it is the failed
write's own** — the ancestor entry, whose pair no pass of that attempt evaluated, STANDS; so the clause this
cell rests on (`attempt-lifecycle.md §2.4` item 8 (i) (5)'s extent clause, reconciled `2026-10-13`) is
satisfied by the observable, and the cell that was red is green. **No other cell's verdict OR observed text
changed: nothing moved but `[A112-B4]`.**

**REGRESSIONS: NONE.** No cell that passed before fails or falls to `NOT-EXERCISABLE` now. The unchanged
driver's own totals are the same as before (`35` PASS / `1` FAIL / `5` `NOT-EXERCISABLE`), its one `FAIL` being
`[A112-B4]`'s hardcoded verdict, which is the string this pass's fix was about and not a new failure.

**THE RUN'S OWN TOTALS, BOTH TERMS.** Unchanged driver: **`41` cells — `35` PASS, `1` FAIL, `5`
`NOT-EXERCISABLE`** (identical to the historical run). Verdict-derived driver: **`41` cells — `36` PASS, `0`
FAIL, `5` `NOT-EXERCISABLE`**; per-group **B becomes `6` PASS of `6`**, the other groups as recorded above.

**DETERMINISM.** The set is deterministic. The unchanged driver ran three times: identical totals, identical
failing set. The verdict-derived driver ran three more times: identical totals, and the cell verdicts AND the
observed strings are byte-equal across all three runs (op ordinals are not compared, per the rule above).

**THE CELLS STILL `NOT-EXERCISABLE` — `5`, unmoved and never green:** `[A112-D5]` and `[A112-G3]` name the
ordering hand-off **`N7`**; `[A112-D2]` names **`N7`** plus the unpinned clause *which verb call is "that same
verb call"* for a caller who makes two; `[A112-E5]` — no clause pins a drive to `KC-6` from the five items'
surface; `[A112-F4]` — no declared observable reads the kernel's own act. **None of the five moved, and none was
converted to a pass.**

**WHAT COULD NOT BE RE-DERIVED BLIND, AND THE ONE FINDING THIS RE-RUN ADDS.**

1. **`[A112-B4]`'s verdict line is not derivable from the run: it was hardcoded.** The cell's observable is
   re-derivable (it is, above), but the cell as authored could not turn green whatever the kernel did. **A
   hardcoded verdict in a greens artifact is itself a finding** — the re-run had to edit it to read the result.
2. **`[A112-B3]`'s own sentence no longer matches the reconciled law, though its verdict is unmoved.** Its
   expectation reads *"no handle leaves otherwise"*, while the law's one lawful removal beside a check-off is
   the DISCARD of the failed write's OWN set — and B3's failing fixture has exactly one handle, the failed
   write's own, so the observable it declares (`pending` `1`→`0`, pair never passed) is satisfied by the
   lawful DISCARD rather than by a `SIFT`. **Under the reconciled law the same figures make B3 PASS; read
   against its own stricter sentence they would not, so B3's PASS rests on the clause and not on its text.**
   Named because a reviewer re-deriving B3 blind meets this fork; **B3 itself is unchanged and is a PASS.**
3. **The clause's own home for the hold's instant is split.** `kernel-surface.md §2.1` item 2 reads the hold as
   opening *"from the moment this call's write verb returns"*, while `attempt-lifecycle.md §2.4` item 8 (ii)
   (g) fixes it at `K-2`'s own act, **before** it reaches the store's write verb. **A blind driver cannot decide
   between the two from the five items' surface**, so no cell of this set rests on the difference. **The
   descendant-address admission is nonetheless exercised and green**: `[A112-G2]`'s listener body runs a nested
   `commit`/`runAttempt` while the outer attempt's hold is open and the outer arm completes (`equal=true`), and
   `[A112-E3]` drives the same-address re-entrant `K-2` and reads `KC-7`. **No cell is added or re-graded by
   this re-run** — that is a scope the supervisor owns, not this pass.

**BYTE WEIGHT, POST-PASS.** This appended section and the pointer above are the only additions of this pass; the
file's weight after it is **`71,198` byte(s)** — inside the `110,000` byte greens-artifact gate and under the
process's per-path line of `131,072` byte(s).


---

## VERDICT CORRECTION 2026-10-15 — THE TWO-CELL REMAND (`role_blind_test_writer`)

**Everything above stands as the historical record: not one earlier cell text and not one earlier verdict was rewritten by this section, and this section CORRECTS TWO OF THEM.** The gate-6 live run found two cells whose printed observed value contradicted their own verdict. **A CELL WHOSE VERDICT IS HARDCODED IS NOT EVIDENCE**, so both verdicts are re-derived from their clause's OWN FALSIFIER, re-run, and recorded here — whatever the derivation answered, `FAIL` included.

**DRIVER AND RECORD.** `scratch/vc-a112-correction.mjs` (a NEW driver; this role's wall admitted files under `scratch/` only), run from the repository root with `node scratch/vc-a112-correction.mjs <label>`; records `scratch/vc-a112-correction-out-run1..3.json`; the sweep of the operative driver's `41` verdict expressions is `scratch/vc-a112-sweep.txt`. The store is the package's own `storeCreate`, the kernel its five declared exports — **no byte of `bindings/js/src/**` was read, the module was imported only.** **THE RULE THIS PASS APPLIES TO EVERY CELL: the verdict IS the falsifier's answer, and where the clause is genuinely TWO-VALUED the cell is `NOT-EXERCISABLE` with the split NAMED — never a guessed verdict and never a pass.**

| Cell | Verdict filed | Verdict derived | The clause's own falsifier |
| --- | --- | --- | --- |
| `[A112-D4]` | **`PASS`** — a LITERAL in the driver, the file's only hardcoded verdict string | **`NOT-EXERCISABLE`** (the filed reading answers **`FAIL`**, the sibling reading `PASS`) | FAIL iff the app's listener, registered AFTER `K-1`, is invoked INSIDE the `K-2` window (`>0`) while the kernel's registration for that address still stands (`kernelPairCalls=1`, `outcome=passed`) |
| `[A112-E8]` | **`PASS`** — derived from an INVERTED predicate: `PASS` exactly when the thrown token is a STORE code and NOT a `KC` token | **`NOT-EXERCISABLE`** (the filed reading answers **`FAIL`**, the sibling reading `PASS`) | A: FAIL unless the thrown form is `{log,message,status}` with `status=KC-4`. B: FAIL unless the caller holds the BODY'S OWN THROWABLE — the store's `{status,message}` carrying the store's code VERBATIM — while `KC-4` stands on the attempt's `outcome` entry, the `repair-run` message NAMES the store's code, the report reads `failed`, and the refused edit left no op |

**`[A112-D4]` — OBSERVED (identical in all three runs).** `on()` returned the SAME adopted handle=`true`; **the app listener's calls INSIDE the `K-2` window=`1`**; **the constraint bodies' calls at that same instant=`0`**; `outcome=passed`; constraint body calls after `K-3`=`1`; `pending` after `K-3`=`0`. **THE FALSIFIER FIRED: `appListenerCalls=1` while the kernel's registration stands, so the reading this cell FILED reads `FAIL` — the `PASS` it printed is NOT DERIVABLE FROM ITS OWN FALSIFIER, and survives only by reading the sibling clause and thereby contradicting the cell's own printed expectation.** **AND THE SPLIT, NAMED (a finding about the docs):** `docs/specs/storeroom-js/surface.md §2.4` rule 1 + `kernel-surface.md §2.1` item 1 (*"neither call replaces the other's holder — the store holds ONE entry at that address, and the kernel holds its own registry entry beside it"*) **AGAINST** `docs/specs/storeroom-js/surface.md §2.4` rule 2 + **`§2.4` item 7 (a)'s HELD arm observable, verbatim** (*"the registry's function for it is the SECOND listener — a later trigger invokes the REPLACEMENT once, and the replaced function never fires again"*) — and the ORDER that would decide between them is the gate handed off at `docs/next-steps.md` · `N7`, enforced nowhere in the delivered surface. **The behaviour is filed package-side as `DEF-2026-10-15-N`; it is not read here as this set's product failure, because the same measured value is a DECLARED observable of a sibling clause of the very section the cell rests on and because the deciding instant is the `N7` hand-off.**

**`[A112-E8]` — OBSERVED (identical in all three runs).** the thrown form's keys=`[message,status]`; `status=WriteParentNotLink` (a store code? `true`; the kernel's own `KC-4`? `false`); the thrown form carries a `log` member=`false`; `K-4` names the store code in its `repair-run` entry=`true`; the attempt's own `outcome` entry `state`=`KC-4`; `report.outcome=failed`, `report.ops.length=1` (**the refused edit left no op=`true`**). **THE FALSIFIER FIRED under the reading the cell filed and did NOT fire under the sibling reading — and the split is printed INSIDE ONE ITEM:** `fail-surface.md §1.1`'s head + item 1 (a) + `§1.2` item 3's FIRST sentence (*"a REPAIR's store failure does not reach the caller as a store failure … the kernel's answer to the CALLER is `KC-4`"*) and its sentence *"the thrown form's `status` is `KC-4`"* **AGAINST** `§1.1` items 3 and 5 + `§1.2` item 2 + **`§1.2` item 3's OWN RULING sentence** (*"ON THIS PATH the caller holds the BODY'S OWN THROWABLE, which is the STORE's own form carrying the store's own code for its `status` … `§2`'s `KC-4` row is the MORE SPECIFIC clause and governs this path"*) + **`§2`'s `KC-4` row's `observable` cell** (*"THE DECLARED MEMBER THAT CARRIES THIS MEMBER ON THE THROWING-REPAIR PATH IS NAMED SO IT IS NOT SOUGHT IN THE THROWN FORM … its ONE `outcome` ENTRY, whose `state` member carries `KC-4`"*). The spec-side reconciliation of that split is a PARALLEL pass, and **this cell was NOT graded on a guess at its outcome**. **Filing: `DEF-2026-10-15-O` (the channel), package-side.** The cell's third limb (`ops` holds no op) is two-valued in the same way: `§2`'s `KC-4` row (`CC-9`) reads it as no op OF THE REFUSED EDIT, which the drive satisfies.

**THE SWEEP FOR THE SAME CLASS — the operative driver's `41` verdict expressions, read one by one** (`scratch/vc-a112-sweep.txt`; `scratch/rerun-a112-kernel-fix/blind-greens-a112-rerun.mjs`, the run behind every verdict above; the original `scratch/blind-greens-a112.mjs` was swept too and differs by the two edits the `2026-10-14` section already names). **EXACTLY TWO ARE IN THE CLASS, AND THEY ARE THE TWO CELLS ABOVE:** **`[A112-D4]` is the file's ONLY literal verdict** (`return { outcome: 'PASS' … }`), and **`[A112-E8]`'s predicate is the observation's INVERSE** — it answers `PASS` precisely when the thrown token is a store code and not a `KC` token, which is the negation of its own printed expected observable. **The other `39` verdicts are predicates over members their cells' expectations name**; the two known text/verdict forks are UNMOVED and already recorded above — **`[A112-B4]`'s literal `FAIL`** (fixed by the `2026-10-14` re-run, which also fixed the one such line) and **`[A112-B3]`, whose `PASS` rests on the clause and not on its own stricter sentence**. **AND ONE LESSER CLASS, NAMED SO IT IS NOT READ AS DERIVED:** `[A112-E9]` prints `closure.readState=` and `[A112-B1]`, `[A112-G2]`, `[A112-D2]` and `[A112-D5]` print the ordering datum (`listenerCalls=1` / `betaListenerRan=true`) that NO verdict of those cells reads — consistent with the `N7` policy above, and no verdict in that class is hardcoded.

**THE RUN'S OWN TOTALS, BOTH TERMS.** **The blind `A112` set (`41` cells) — the readings the cells filed: `36` PASS, `0` FAIL, `5` `NOT-EXERCISABLE`; the DERIVED verdicts after this correction: `34` PASS, `0` FAIL, `7` `NOT-EXERCISABLE`** (`[A112-D4]` and `[A112-E8]` PASS → `NOT-EXERCISABLE`; **no other cell moved, and no cell was converted to a pass**). **The correction set itself, both terms: the readings those two cells filed — `2` cells, `0` PASS, `2` FAIL; the derived verdicts — `2` cells, `0` PASS, `0` FAIL, `2` `NOT-EXERCISABLE`.** **And the live gate-6 battery's own totals, as that run measured them: `47` cells, `39` PASS, `2` FAIL, `6` `NOT-EXERCISABLE` — its two FAILs being exactly `A112-D4` and `A112-E8`** (`scratch/live-constraints-a112-gate6-out.json` · `-out-run1..3.json`, `LIVE / ASSEMBLED PACKAGE`).

**DETERMINISM.** The correction driver ran three times (`run1`–`run3`): identical totals, identical verdicts, identical readings, and BYTE-EQUAL observed strings — no op ordinal is printed or compared. The gate-6 battery's four run records print the same `47`/`39`/`2`/`6` and the same per-cell verdict set.

**THE CELLS `NOT-EXERCISABLE`, WITH THE SPLIT NAMED — `7` after this correction, none green.** `[A112-D2]`, `[A112-D5]`, `[A112-G3]` name the ordering hand-off **`N7`** (`[A112-D2]` also the unpinned *"that same verb call"*; `[A112-D5]`'s prose quotes `[A112-D4]`'s line and its own state is UNMOVED); `[A112-E5]` — no declared drive reaches `KC-6`; `[A112-F4]` — no declared observable reads the kernel's own act; **`[A112-D4]` — the `§2.4` rule 1 / rule 2 + item 7 (a) HELD-arm split, with `N7` the deciding order**; **`[A112-E8]` — the `fail-surface.md §1.1`/`§1.2` split, printed inside one item, under a parallel reconciliation.**

**WHAT COULD NOT BE DERIVED.** (1) **Neither corrected cell can be graded while its clause set is two-valued**, and neither was graded on a guess: `[A112-D4]`'s deciding order is the `N7` hand-off and its two clause pairs disagree; `[A112-E8]`'s split stands inside `§1.2` item 3 and in the row that item defers to. (2) **Whether an app's `on` at an address the kernel adopted leaves "the kernel's registration standing" is the question the two documents answer differently** (`kernel-surface.md §2.1` item 1's *"neither call replaces the other's holder"* vs `docs/specs/storeroom-js/surface.md §2.4` rule 2's *"one handle, one function"*), and no clause of either directory resolves it for a blind driver. (3) **No further hardcoded verdict was found in the set.**

**BYTE WEIGHT, POST-PASS.** This section is the only addition of this pass; the file's weight after it is **`81,237` byte(s)**, measured on the file itself — inside the `110,000` byte greens-artifact gate and under the process's per-path line of `131,072` byte(s).
