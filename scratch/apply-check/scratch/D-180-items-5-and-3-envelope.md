# Envelope — `D-180`'s residual `5` (the skipped cell) and residual `3` (`NG-PUB-F`'s inert control) · `2026-11-22`

**THE PASS IS `role_l3_test_writer`. TWO ITEMS, BOTH CLOSED, TESTS ONLY.** The patch is
`scratch/D-180-item5-retire-the-skip-item3-recut-the-control.patch` — `git apply --check` exit `0` on a clean
`git archive HEAD` copy, and applying it there reproduces this worktree's `tests/` byte for byte. **No `src/**`,
`bindings/**`, `docs/**` or `strata/**` byte moved** (`bindings/js/src/entry/{artefact-node,addon-slot}.mjs` were
changed twice under measurement and restored `cmp`-clean; `git diff --stat` carries them as unmoved).

**THE BASELINE, MEASURED ON THIS TREE BEFORE THE FIRST EDIT, NOT CARRIED:** `npm test` **`1386` tests · `1385`
pass · `0` fail · `1` skip · `0` todo, exit `0`** — `D-180`'s floor, re-read at its own bytes.

---

## 1 · ITEM ONE — THE SKIP: ARM `(a)`, RETIRE

**DECISION: (a).** `sas_d3_s_parity_each_verbs_answer_is_byte_identical_to_the_same_verb_through_the_old_dispatcher`
is withdrawn from `tests/e2e/addon-surface.test.mjs`. **THE ARM `(b)` TEST WAS RUN AND IT FAILS:** what replaced
`call(index, verb, args)` is the nine PER-VERB entries (`contract.md §1`: *"the addon's export set is exactly the
thirteen declared names — `4` standing plus `9` per-verb — and `call` is absent"*), so the only live "same verb
through the other shape" comparison is **a verb through its own entry against the same verb through the package's
wrapper** — one call and its own decoder. That comparison is real but it is not `P-SAS-3`'s: it cannot fail for the
reason the clause names (it asserts that the package merely forwards and decodes, which the group's first cell
already asserts at the package layer), and it would pass trivially at any byte. **So there is no honest `(b)`, and
the prompt's own rule applies: say so rather than take a third option.**

**THE RULING THAT RETIRED IT IS `D-180` ITEM 5, QUOTED AT ITS OWN SENTENCE:** *"A golden without a subject: it
should be RETIRED rather than skipped, since a skip is a cell that never executes and cannot fail."* **THE RULING
THAT REMOVED ITS SUBJECT IS THE UNIT'S OWN SPLIT**, `export-set-and-dispatch.md §2`: *"`call` IS DELETED. It was the
dispatcher: one entry taking `(instance, verb, args)` and matching the verb across nine arms. THE SPLIT IS
PRECISELY ITS REPLACEMENT, SO IT DOES NOT SURVIVE."*

**WHAT THE FILE'S HEAD NOW RECORDS** (§ `⟶ ONE CELL RETIRED`, lines 17–53): what it measured (`P-SAS-3`'s
old-dispatcher half, over `PARITY_CORPUS`, `read`/`write`/`delete`, two stores) · when it stopped measuring
anything (the instant the split landed and `call` left the export set — from then on its first statement was
`oldDispatcherShape() === null` and its whole act was `test.skip(…)`) · which ruling removed its subject (the split)
and which ruling retired the cell (`D-180` item 5) · **and what the retirement does NOT claim** (that `P-SAS-3` is
satisfied, or that the old dispatcher's answers were never compared). The `D-3` group's head, the drive table's
`D-3` row (`3` → `2`) and the valid-state line (`V-3`) are re-derived in the same pass. **`D-57`'s discipline is
cited where it applies:** the cut-state claim narrowed to *"the version line, which is the only figure a tarball can
be right about"* — a cell may not claim what it cannot observe.

**TWO STALE CLAIMS THE SAME RETIREMENT FALSIFIED, CORRECTED IN PLACE (not annotated beside):** the corpus docblock's
*"every cell of this group reads THE SAME rows"* (one cell reads them now) and `oldDispatcherShape()`'s *"A DRIVE
THAT CANNOT REACH THE OLD SHAPE SKIPS AND SAYS WHY … so the post-split run compares against these same records"* —
**no drive of this file skips any more, and `GOLDEN` is MODULE STATE, not a persisted image, so no post-split run has
ever compared against a capture.**

**MEASURED, BEFORE AND AFTER, THE FILE ON ITS OWN:** `26` cells · `25` pass · `0` fail · **`1` skip** → `25` cells ·
`25` pass · `0` fail · **`0` skip**.

---

## 2 · ITEM TWO — `NG-PUB-F`'S INERT CONTROL: RE-CUT, AND NOW ABLE TO FAIL

**THE FINDING, AT ITS BYTES.** The inert half is control `(3)`, `control-the-fallback-names-an-untried-path`
(`tests/e2e/staged-install/publish-generators.test.mjs:1073` ff.). Its as-filed first substitution spliced
`join(dirOf(fileURLToPath(import.meta.url)), 'never', 'tried', 'x.node')` into
`addon-slot.mjs:230`'s `const subject = absentSubject();`, and it could not fail **twice over**:

| the byte that blocks it | the reading |
|---|---|
| `addon-slot.mjs:228`–`:232` (`addonLoadMessage`) is reached only from `:283`, inside `withAddon`'s `addon === null` branch — **after** `if (addonArm !== null) fail(addonArm);` | the probe drives the MISMATCH state, so `addonArm` throws first and `addonLoadMessage` is evaluated on **no** evaluation of any drive: the mutated line never ran |
| `addon-slot.mjs:81` and `:85` are its whole import set (`./refusal.mjs`, `./class-decision.mjs`) | had the line been reached it would have died `ReferenceError: join is not defined` — a verdict attributable to the LEVER, not the mutation, i.e. the `F-14` class the harness exists to refuse |

**THE DECISION, BOTH OF THE PROMPT'S ARMS TAKEN AT ONCE: the successor splice lands at a site the MISMATCH drive
does evaluate, in the part that imports exactly what it calls.** `artefact-node.mjs` carries both the mismatch arm
and the three `node:` names (`import { dirname as dirOf, join } from 'node:path'`, `fileURLToPath` from
`node:url`, `:39`–`:41`), and it reads `entryUrl` — the entry's own adopted module context — so the path it renders
is rung two's own. **The as-filed half is not kept "beside" the new one:** an inert mutation standing beside a live
one is exactly the claim the control cannot observe, and `docs/L1/publish-readiness.md:116` records that the re-cut
was attempted twice and reverted both times rather than landed half-right.

**THE CONTROL'S TWO HALVES NOW:**

- **`(3a)` the subject handed to arm (b) is the module-relative addon path IN PLACE OF the rung-one artefact's own**
  — `§1.4` item 7's **second** named failure, which **no control of this generator measured**;
- **`(3b)` arm (b)'s fallback APPENDS that path beside the one the walk did try** — `§1.4` item 7's first.

**THE READINGS, BOTH PRINTED.** Each half was isolated by removing the other's `.replace(...)` from the chain, the
generator re-run, and the file restored byte-identically (`diff` clean against the saved copy):

```
=== BOTH HALVES (the shipped control) — FAIL, at the clause ========================================================
[F-14 audit] NG-PUB-F :: control-the-fallback-names-an-untried-path → verdict FAIL · state reached: 1 drive(s)
  against the staged bytes · attempt sets [2] · failed at: `§1.4` item 7: the subject is the RUNG-ONE ARTEFACT'S
  OWN PATH ALONE … got "'/tmp/…/build/Release/storeroom_js_binding.node', '/tmp/…/build/Release/
  storeroom_js_binding.node' is not reachable at construction, the path must exist or the application must be able
  to write it"

=== ISOLATION A — `(3a)` ALONE (the `(3b)` splice removed) — STILL FAIL =============================================
[F-14 audit] NG-PUB-F :: control-the-fallback-names-an-untried-path → verdict FAIL · state reached: 1 drive(s)
  against the staged bytes · attempt sets [2] · failed at: … got "'/tmp/…/build/Release/storeroom_js_binding.node'
  is not reachable at construction, the path must exist or the application must be able to write it"

=== ISOLATION B — `(3b)` ALONE (the `(3a)` splice removed) — STILL FAIL ============================================
[F-14 audit] NG-PUB-F :: control-the-fallback-names-an-untried-path → verdict FAIL · state reached: 1 drive(s)
  against the staged bytes · attempt sets [2] · failed at: … got "'@auspicion/provident-storeroom-js-linux-x64-gnu',
  '/tmp/…/build/Release/storeroom_js_binding.node' is not reachable at construction, the path must exist or the
  application must be able to write it"
```

**AND THE GUARD IS LIVE AT THE SHIPPED BYTES TOO — CHANGED, SEEN RED, RESTORED.** With
`addon-slot.mjs`'s `generatorFilePathUnreachable` rendering altered in the tree (the clause byte the property is
built on), the generator reports, exit `1`:

```
AssertionError [ERR_ASSERTION]: NG-PUB-F: THE PROPERTY DOES NOT HOLD AT THE SHIPPED BYTES — `§1.4` item 7: the
  subject is the RUNG-ONE ARTEFACT'S OWN PATH ALONE, rendered by the generator's own '<subject>' slot, and NEVER
  the both-paths join nor the module-relative addon path in its place — at this state only rung one was tried; g…
ℹ pass 0  ℹ fail 1
```

restored, `git diff --stat -- bindings/js/src/entry/addon-slot.mjs` prints nothing, and the generator is green again
(full suite below). **A SECOND, UNEXPECTED RED WAS MEASURED ON THE WAY, AND IT IS THE ANSWER TO THE LAST QUESTION
BELOW:** editing the arm's own subject line in the tree reddened the FILE at LOAD, at `NG-PUB-C`'s anchor, before a
single generator ran.

**ONE PROSE CORRECTION INSIDE THE PROBE:** the exact-rendering assertion's message now names **both** substitutions
(*"…the both-paths join **nor the module-relative addon path in its place**"*), so the `F-14` audit line under a red
control says which of the two halves it caught.

---

## 3 · THE TRIO, WITH INVOCATIONS, ON THE APPLIED TREE

| leg | invocation | reading |
|---|---|---|
| `test` | `npm test` (`node --test "tests/**/*.test.mjs"`) | **`1384` tests · `1384` pass · `0` fail · `0` skip · `0` todo, exit `0`** |
| `typecheck` | `npm run typecheck` | **exit `0`** |
| `build` | `CARGO_HOME=<abs>/.cargo-home npm run build` | **exit `0`** |
| native | `CARGO_HOME=<abs>/.cargo-home cargo test --offline` | **exit `0`** — `running 22 tests · 22 passed; 0 failed` beside the crate's other suites, **`0` FAILED anywhere** |
| wasm | `CARGO_HOME=<abs>/.cargo-home cargo check --offline --target wasm32-unknown-unknown` | **exit `0`, `0` errors** |

**`CARGO_HOME` IS AN ENVIRONMENT FACT, NOT A GREEN** (`strata/walkthrough.md:72`–`:73`).

**THE COUNT THE BRIEF NAMED (`1385` / `1384` / `0`) IS NOT ARITHMETICALLY REACHABLE BY RETIRING THIS CELL, AND THE
MEASUREMENT IS THE PROOF.** The skip was a **NESTED** subtest — `test.skip(…)` called inside a running `test(…)` —
so Node counts **two** rows for it: the parent (a pass) and the child (a skip). Measured directly:

```
▶ parent
  ﹣ child skip # SKIP
✔ parent
ℹ tests 3 · pass 2 · skipped 1     ← parent+child contribute 3 tests, 2 pass, 1 skip
```

Removing the parent therefore takes `tests −2` and `pass −1`: `1386/1385/0/1 → 1384/1384/0/0`. **The invariant the
brief wants holds exactly** — `0` skipped, `0` fail, and `pass` = baseline `pass − 1` (the retired cell), with no
other cell moved.

---

## 4 · WHAT COULD NOT BE HONESTLY CLOSED

1. **`P-SAS-3`'s old-dispatcher half now has NO instrument and can have none.** The retirement records it; the
   clause still stands at `docs/specs/storeroom-addon-surface/contract.md §5` (`P-SAS-3`) and `§6` item 1, and
   **those are `docs/**` — I did not move them.** Whoever owns the corpus should mark the half unobservable at its
   own row, or narrow it to the package-layer statement the two surviving cells carry.
2. **The corpus rows that still name the two defects are stale and outside my write set:**
   `docs/L1/publish-readiness.md:43`, `:116`, `:205`, `:264`, `docs/L1/wasm-realm.md:412` (the inert control) and
   `strata/decisions.md` `D-180` items 3 and 5. **They now describe a state this tree no longer holds.**
3. **The two halves of the re-cut control are independent in effect but not separately ledgered.** They compound in
   one run (the message carries the addon path twice, above), so the audit's single `why` cannot say which half
   fired; each half's teeth are shown by the isolation runs, **which are not a permanent instrument.** Splitting the
   control into two would take `NG-PUB-F`'s measured controls from `3` to `4` and redden the prose count at
   `publish.test.mjs:1961` (*"with `3` measured controls"*) — **a census move I did not take, because the honest
   instrument is the ledger and the ledger's count is asserted elsewhere.**
4. **A SECOND CELL OF THE SAME CLASS IS NAMED AND NOT RETIRED:** the capture cell
   (`sas_d3_s_parity_the_golden_captures_…`) is green only because its first branch asserts `call` absent — **which
   `sas_d1_s_export_set_call_is_absent_because_the_split_is_precisely_its_replacement` already asserts** — and its
   whole recording half is unreachable on this tree. `D-180` item 5 rules on the SKIP and not on the capture; its
   pre-split records are the only evidence the old comparison ever ran. **Whoever retires it must take the evidence
   with it, which is why I did not.**

---

## 5 · THE ONE EDIT MOST LIKELY TO REDDEN A CELL I DID NOT EXPECT

**A MOVE OF THE MISMATCH ARM'S OWN LINE — `artefact-node.mjs:266`, `addonArm = { status: 'FilePathUnreachable',
message: mismatchArmMessage(candidate, name) };` — REDDENS `publish-generators.test.mjs` AT LOAD, NOT AT A CELL.**
Measured: edited there, the file failed in `28 ms` with
`AssertionError: NG-PUB-C: the mismatch arm site moved; the control must be re-cut`, **before any generator body
ran**, because `controlEntry(…)` executes at module evaluation and `controlCarrier.replace` refuses an anchor that
matches no file. **Both of my re-cuts sit on that same anchor surface** — my `(3a)` anchor is
`message: mismatchArmMessage(candidate, name) };`, shared with `NG-PUB-C`'s and `NG-PUB-F`'s other two controls —
so **any pass that re-spells that line must re-cut five controls, not one**, and the failure will arrive as a
file-level load error rather than as a named red. The second-order risk on the same file is
`addon-surface.test.mjs`'s exclusion cell, whose `compared.length >= 20` limb now stands at `21`: **one further
retirement in that group of two trips it.**

---

**THE PATCH:** `scratch/D-180-item5-retire-the-skip-item3-recut-the-control.patch`
(`tests/e2e/addon-surface.test.mjs` · `tests/e2e/staged-install/publish-generators.test.mjs`; `90` insertions,
`80` deletions).
