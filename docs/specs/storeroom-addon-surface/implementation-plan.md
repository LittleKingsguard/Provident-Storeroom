# Part — `implementation-plan` (`U-STOREROOM-ADDON-SURFACE`): what lands, in what order, verified how

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-surface/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** No clause of its own; **this part states the landing order and each step's verification.**
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE PRECONDITION

**THIS UNIT CANNOT START UNTIL THE FREEZE EXISTS.** The sibling unit produces the built artefact's `sha256`, the export name set and the boundary source's byte count. **Those three are this unit's declared inputs**, and the split is a change **against a known ABI** rather than a rewrite of live code.

---

## §2. THE ORDER, AND THE ONE THING THAT MAKES IT A SINGLE LANDING

**THE UNIT IS A SINGLE COMMIT.** **A partial landing does not compile as behaviour**: take the split alone and the JS side still holds an integer against entries that no longer take one. **So there is no legal intermediate state, and the steps below are the order of WORK, not of landings.**

| # | The step | What it moves | How it is verified |
| --- | --- | --- | --- |
| `1` | **THE SPLIT** | the boundary's dispatcher — nine arms to nine entries; `call` deleted; the export set `5 → 13` | the artefact's own key set is read and equals the declared thirteen (`P-SAS-1`) |
| `2` | **THE RECEIVER** | the integer dies; each entry resolves its store from `this` | the receiver drives `P-SAS-2`; two constructions still answer two stores; a detached call and a collected store's call both refuse (`P-SAS-4`) |
| `3` | **THE JS UNWRAP** | both wrappers deleted; each member calls its own entry; the write arm moves into the member | `P-SAS-6`, `P-SAS-7`, `P-SAS-8` |
| `4` | **THE TABLE'S RETIREMENT** | the receiver table gains a retirement path firing in the same act that frees a store | `P-SAS-5` |
| `5` | **THE CALIBRATION AND THE GOLDEN** | the green runner's dead export-table constant becomes live; the live pin elsewhere is re-cut; the golden is compared | `§4` below |

---

## §3. THE GOLDEN, AND WHY IT IS THIS UNIT'S AND NOT THE SIBLING'S

**THE STANDING SUITE DOES NOT WITNESS THIS CHANGE.** Its cells drive the boundary **through the package's own entry** as a means, not as a subject — **and the identity of a cell must not come from the artefact being changed**, or the comparison is of the change against itself.

**SO THE GOLDEN IS CAPTURED BEFORE STEP `1`, AGAINST THE FROZEN ARTEFACT, AND DIFFED CASE BY CASE AFTER — COMPARING EVERYTHING EXCEPT THE KEY-SET CELLS** (the rule, and why the exclusion is what makes the diff sound: `contract.md §6` item 2).

| The rule | Why |
| --- | --- |
| the case identity is the harness's own `test('<id> — …')` literal | never an ordinal, which is unstable; never anything taken from the artefact |
| the capture names its invocation and its seed | a pinned-seed layer inside the comparison must be reproducible |
| the capture records which cells ran and which skipped | the artefact-dependent cells skip when no artefact exists, **and a skip that becomes a run is a diff and not noise** |
| **the diff compares everything EXCEPT the key-set cells** | **the artefact's key set moves `5 → 13` between the capture and the diff, so a naive parity diff fails BY DESIGN on the cells that read it — the key set IS the change, `P-SAS-1` asserts it directly, and a diff that included it would mask every OTHER diff** (`contract.md §6` item 2) |
| **each new entry has at least one cell driving it** | otherwise the split adds nine entries and nothing exercises eight of them |

---

## §4. THE TWO CALIBRATION DEFECTS, WHICH ARE ONE OBLIGATION

**THE GREEN RUNNER DECLARES A CONSTANT NAMING THE ADDON'S EXPORT TABLE AND NEVER USES IT.** It is the only place in that runner naming the table, so **under this change the runner stays green while the real table moves from five names to thirteen.** **That is a falsely-green run, and it is repaired here** — the constant becomes a live assertion.

**AND A LIVE PIN ELSEWHERE ASSERTS THE FIVE-NAME TABLE.** It is in a different runner, and **it fails under this change — for the right reason**, because the table really did move. **It is re-cut to the thirteen.**

**BOTH ARE THE SAME OBLIGATION AS THE GOLDEN'S LAST RULE:** every entry the split adds must have something that names it. `P-SAS-1`'s strategy drives it.

---

## §5. THE WITNESS

**THE SAME TRIO AS THE SIBLING UNIT — node suite, type-check, build — PLUS THE GOLDEN.**

- **The trio alone is necessary and not sufficient**: it does not compare the before and after of the change's own surface.
- **The golden is the differential**, and it runs against the frozen artefact.
- **The asset that must exist before step `1` starts is the capture**, because a golden taken after the change compares the change against itself.

---

## §6. THE RISKS, NAMED

1. **THE GOLDEN'S CELL SET IS NOT REPRODUCIBLE WHERE THE ARTEFACT IS ABSENT**, which is why the capture records run-versus-skip. **AND THE TWO DIFF WINDOWS ARE PRICED SEPARATELY: the artefact-ABSENT case is covered by the run-versus-skip record, and the artefact-PRESENT-BUT-CHANGED case is covered by the key-set exclusion** (`§3`'s table; `contract.md §6` item 2). **A plan that priced only the absent case would leave the changed case to fail by design.**
2. **THE RECEIVER MAKES A WORKING PATTERN LEGAL-AND-NOT-FAIL.** The detached call is **the unit's ONE declared cost** — a working pattern that STOPPED working, which is a regression a caller must be told about (`receiver-and-refusal.md §7`). **AND REBINDING IS NOT A SECOND COST AND NOT A PLAN ITEM: it is unsupported breaking behaviour the package owes no guard for (`receiver-and-refusal.md §7`), so no step here guards against it and no risk below prices it.**
3. **THE TABLE'S RETIREMENT IS `OWED`.** A retirement that removes the wrong entry is a silent cross-store defect, which is what `P-SAS-5` exists to catch.
