# LIVE GREENS — the `A112` RE-RUN of the blind green-scenario set for `U-STOREROOM-CONSTRAINTS` (`role_blind_test_writer`, GATE 5)

**Date of this run:** 2026-10-13. **Authority:** `docs/decisions.md` · `A112` (the architect's delivery-model
ruling of 2026-10-13). **Superseded set:** `docs/specs/storeroom-constraints/live-greens.md` (`125` cells)
stands UNTOUCHED as the historical record of the WITHDRAWN reading; **this file is not a verdict on it and it
is not a revision of it** — the cells below are derived FRESH from the clauses as they now stand.

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
