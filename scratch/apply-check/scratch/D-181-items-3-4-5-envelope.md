# Envelope — `D-181`'s residual `3` (`NG-PUB-F`'s two halves), residual `4` (the one-row floor) and residual `5` (the capture cell) · `2026-11-22`

**THE PASS IS `role_l3_test_writer`. THREE ITEMS, THREE DECISIONS, ALL THREE CLOSED, TESTS ONLY.** The patch is
`scratch/D-181-items-3-4-5-split-the-control-rederive-the-floor-keep-the-capture.patch` — `git apply --check`
exit `0` on the clean worktree **and** on a `git archive HEAD` copy in `/tmp`, and applying it there reproduces
this pass's `tests/` **byte for byte** (`cmp`-clean on all three files). The worktree is restored clean:
`git status --porcelain` carries the patch and nothing else. **No `src/**`, no `bindings/**`, no `docs/**`, no
`strata/**` byte moved.**

**THE BASELINE, MEASURED ON THIS TREE BEFORE THE FIRST EDIT, NOT CARRIED:** `npm test` **`1384` tests · `1384`
pass · `0` fail · `0` skip · `0` todo, exit `0`** (the figure `D-181`'s floor records). Beside it, the two files'
own baselines: `tests/e2e/addon-surface.test.mjs` **`25` cells · `25` pass · `0` fail**, and `NG-PUB-F`'s ledger
line **`controls measured: 4`** (`SHIPPED-BYTES` + **`3`** measured controls).

---

## 1 · ITEM ONE — `NG-PUB-F`'S TWO HALVES: SPLIT, AND THE CENSUS RE-DERIVED `3 → 4`

**ARM: THE MOVE `D-181` ITEM 3 NAMED AND DID NOT TAKE — TAKEN.** The one `controls` entry
`control-the-fallback-names-an-untried-path` (which held `(3a)`'s subject substitution **and** `(3b)`'s fallback
substitution, applied by one chained `.replace`) is now **two entries**, one substitution each, in
`tests/e2e/staged-install/publish-generators.test.mjs`:

| control | the mutation, at its one site |
|---|---|
| `control-the-mismatch-arms-subject-is-a-path-the-walk-never-tried` | `src/entry/artefact-node.mjs:266` — the subject the mismatch arm hands arm (b) |
| `control-the-fallbacks-subject-appends-a-path-the-walk-never-tried` | `src/entry/artefact-node.mjs:326` — arm (b)'s own fallback rendering |

**WHY THE SPLIT IS THE RIGHT MOVE.** Two substitutions whose effects are independent are **two instruments**, and a
control whose ledger line covers both can report only *"one of these fired"* — it cannot say **which**. The
evidence that each half could fail was, until now, an **isolation run**: an experiment performed once, in a pass,
and unreproducible by a later reader. `D-181` item 3 is quoted at the control, at the cell and in the census
sentence: *"Splitting it into two controls takes the cell from `3` to `4` measured controls and reddens
`publish.test.mjs`'s prose count — a census move the pass did not take."* **This pass takes it, and pays the
reddening deliberately rather than discovering it.**

**BOTH ISOLATION READINGS, PRINTED** (the `F-14` audit line each control prints, verbatim; each control staged
**its own** scratch tree with **its own** single mutation — "remove the other's `.replace`" is now structural, and
no `diff`-dirty experiment is needed to make it true):

```
[F-14 audit] NG-PUB-F :: control-the-mismatch-arms-subject-is-a-path-the-walk-never-tried → verdict FAIL · failed at: `§1.4` item 7: the subject is the RUNG-ONE ARTEFACT'S OWN PATH ALONE, rendered by the generator's own '<subject>' slot, and NEVER the both-paths join nor the module-relative addon path in its place — at this state only rung one was tried; g
[F-14 audit] NG-PUB-F :: control-the-fallbacks-subject-appends-a-path-the-walk-never-tried → verdict FAIL · failed at: `§1.4` item 7: the subject is the RUNG-ONE ARTEFACT'S OWN PATH ALONE, rendered by the generator's own '<subject>' slot, and NEVER the both-paths join nor the module-relative addon path in its place — at this state only rung one was tried; g
```

Both also carry the `F-14` state guard, measured rather than assumed: **`1` drive against the staged bytes ·
attempt sets `[2]`** for each — the staged part loaded and walked, so each verdict is attributable to its own
mutation and not to the lever. **AND SAID PLAINLY, BECAUSE A READER WILL NOTICE IT: both halves red at the SAME
limb** — `assert.equal(A.message, gen(RUNG_ONE_TAIL))`, the clause's exact-rendering limb. That is expected and it
is not a defect of the split: both substitutions make the message name a path the walk never tried, and a control
cannot fail at a different clause without mutating a different clause. **What the split buys is not a different
limb — it is that the LEDGER NOW NAMES THE SITE**, so a red says `(3a)` or `(3b)` instead of "one of these".

**THE CENSUS FIGURE, BEFORE AND AFTER, AT EVERY HOME THAT CARRIES IT:**

| home | before | after |
|---|---|---|
| `NG-PUB-F` measured controls (the `controls` entries) | `3` | **`4`** |
| `NG-PUB-F`'s ledger line (`SHIPPED-BYTES` + the above) | `controls measured: 4` | **`controls measured: 5`** |
| `tests/e2e/staged-install/publish.test.mjs:1961` prose count | `3` | **`4`** |
| `npm test` tests / pass / fail / skip | `1384 / 1384 / 0 / 0` | **`1384 / 1384 / 0 / 0`** |

**AND THE TESTS FIGURE IS MEASURED, NOT ASSUMED**: a control is not a `test(…)` row — it is a `controls` entry
inside one generator — so the suite's census is **unmoved at `1384`**. `D-181` item 3 named the prose count as the
only thing the split reddens, and that is exactly what moved. **The sentence at `:1961` also had its citation
re-pointed** (`bindings/js/test/publish-generators.test.mjs` → `tests/e2e/staged-install/publish-generators.test.mjs`;
the old spelling matched no byte of this tree) — that is a `tests/**` byte, not a `docs/**` one.

---

## 2 · ITEM TWO — THE FLOOR: WHAT THE LIMB'S SUBJECT ACTUALLY IS, AND THE FIGURE `20 → 21`

**I READ THE CELL, and the answer is the first of the prompt's two readings: THE LIMB'S SUBJECT IS "THE DIFF
EXCLUDES SOMETHING", NOT "THESE PARTICULAR ROWS ARE COMPARED".** The evidence is at the cell's own bytes:
`sas_d3_s_parity_the_goldens_diff_excludes_the_keyset_cells_and_the_exclusion_is_the_d1_group_alone` asserts the
**excluded** set EXACTLY, by name, one limb above (`deepEqual` over the four `s_export_set_` names) — and the limb
in question stands on `§6` item `2`'s third bullet, *"every other cell is compared as it stands"*, whose subject is
the **COMPLEMENT**: an open-ended set the clause spells as *"every other"*.

**SO A FLOOR IS RIGHT AND A NAMED SET IS WRONG.** `deepEqual(compared.sort(), […21 names…])` would be a second
census of this file's cells that every rename or addition falsifies, and it would say nothing the `deepEqual`
above does not already say about the exclusion. **AND THE NUMBER IS THE TRAP, WHICH THE ARM NAMES RATHER THAN
HIDES:** `21` is what the compared group holds on this date (`25` cells − `4` excluded), so a retirement anywhere
in this file — of **any** group — lands *here*, at a cell that did not edit it. **THE FIGURE IS RE-DERIVED TO WHAT
THE GROUP NOW HOLDS AND THE LIMB'S JOB IS TO BE THAT ACKNOWLEDGEMENT**: `§6` item `2`'s rule is a statement about
the whole file's compared set, so a retirement in this file must be ledgered at this cell.

**WHAT CHANGED AT THE BYTE** — `tests/e2e/addon-surface.test.mjs`, the exclusion cell:

- `assert.ok(compared.length >= 20, …)` → **`>= 21`**;
- the message now prints **`compared` of `cells` cells AND `excluded.size`** (`21 of 25 cells, with the 4
  `s_export_set_` cells excluded by name`) plus `D-181` item 4's instruction, so **the next retirement reads what
  it broke and at which figure** before it reads as a defect of this cell;
- the record above the limb carries `D-181` item 4 quoted at its own sentence, the subject reading, why a floor was
  taken over a named set, and the measurement (`21` of `25`, `4` excluded).

**MEASURED**: `node --test tests/e2e/addon-surface.test.mjs` → `25` cells, `25` pass, `0` fail (the exclusion cell
green at `21 >= 21`). **AND THE HONEST COST, STATED: the re-derivation leaves ZERO rows of headroom, so the next
retirement in this file still trips this cell** — that is D-181 item 4's trap, now *armed exactly* and *legible*
rather than one row away and mute. The arms I refused, and why: **dropping the floor** would leave *"the diff
excludes something"* asserted by nothing (the partition limb below it is a tautology: `compared` is defined as
`cells` minus `excluded`); **naming the 21 rows** would be the second census §6 item 2 already has.

---

## 3 · ITEM THREE — THE CAPTURE CELL: ARM `(c)`, KEPT, WITH ITS REASON AT ITS BYTE

**ARM: `(c)` — KEPT UNCHANGED, WITH THE REASON RECORDED AT ITS OWN BYTE. And the reason is not that it is the
smallest edit; it is that `(a)` and `(b)` both destroy evidence, and the arm `(b)`'s own question comes back "no".**

**THE MEASUREMENTS THE DECISION RESTS ON, taken on this tree:**

1. `oldDispatcherShape()` answers **`null`** — `addon.call` is not a function of the shipped artefact — so the cell's
   first branch runs, pushes its skip record and returns. **The recording half is reached on NO evaluation**, and
   `GOLDEN.records` / `GOLDEN.ran` are `[]` in every run this tree can produce. **`GOLDEN` is MODULE STATE, not a
   persisted image, so the cell does not HOLD the pre-split capture anywhere — it holds the instrument that would
   produce it.** That distinction is what decides the arm.
2. The first branch's assertion is `addonKeySet().includes('call') === false` — **exactly the claim
   `sas_d1_s_export_set_call_is_absent_because_the_split_is_precisely_its_replacement` already makes** (`§2`'s
   `F-1`). So the cell's only failing claim is its neighbour's, reported under the golden's name.

**ARM `(a)`, RETIREMENT, DESTROYS THE INSTRUMENT — and the instrument is not nothing.** What this cell holds and no
other byte of this tree holds: the only written spelling of the two-shape capture (`§6` items `1` and `4`); the
run-versus-skip ledger; the invocation and its date (the frozen artefact, `DISCHARGED 2026-10-21`); `PARITY_CORPUS`'s
only consumer; and — measurably — **the ONLY assertion of the operation record's EIGHT members**
(`address`, `after`, `before`, `compacted`, `kind`, `opId`, `seq`, `tier`), which I measured TRUE on this tree
(`node -e` against `bindings/js/index.mjs`: `["address","after","before","compacted","kind","opId","seq","tier"]`)
and which no other cell asserts. A head record would describe all of that and keep none of it. **The description of
an instrument is not the instrument.**

**ARM `(b)`, REMOVE THE DUPLICATE, DESTROYS THE LAST CLAIM AND GAINS NONE.** With the duplicate gone the cell's whole
reachable body is a ledger push and a `return`: it can fail on no byte. **That is the status `D-180` item 5 refused
for the skip — one degree worse, because a skip does not execute while this row RUNS and reports `PASS`.** **AND THE
ANSWER TO THE QUESTION ARM `(b)` ASKS: NO — a cell that cannot reach its own subject does not belong in a run AS A
CLAIM.** It may stand only as a RECORD; and the arm `(c)` record is what makes that difference readable at the
byte, so no census, ledger or later pass reads the row as coverage of the capture.

**WHAT THE ARM PRESERVES**: the whole cell, byte for byte, plus a dated block above it (`D-181` item 5 quoted, the
capture described, the unreachability measured, the duplicate named, both refused arms and their costs, and the
sentence that the row is **not** coverage); a pointer inside the first branch saying whose claim that assertion is
and why it is not removed; and one correction at the file's head — the `D-180` item 5 record said the package-layer
half *"stand[s] asserted in the group's first cell"*, which is true of the BYTES and false of any RUN, so it now
says **"written there and measured nowhere"** and names `sas_d7_s_unwrap_parity_…`'s independent coverage of the
write and delete member sets. **WHAT IT DESTROYS: nothing.**

---

## 4 · THE RUNS, TAKEN ONCE AFTER (this worktree, these bytes)

| gate | command | reading |
|---|---|---|
| `npm test` | `npm test` | **`1384` tests · `1384` pass · `0` fail · `0` skip · `0` todo, exit `0`** |
| `typecheck` | `npm run typecheck` | **exit `0`** |
| `cargo test` | `CARGO_HOME="$PWD/.cargo-home" cargo test --offline` | **exit `0`** — the store's own suite `running 22 tests · 22 passed; 0 failed`, all `22` test-result lines `ok`, **`675` passed · `0` FAILED anywhere** |
| `cargo check --target wasm32` | `CARGO_HOME="$PWD/.cargo-home" cargo check --offline --target wasm32-unknown-unknown` | **exit `0`, `0` errors** |
| `build` | `CARGO_HOME="$PWD/.cargo-home" npm run build` | **exit `0`**, addon re-staged (`1481152` bytes) |
| the arm's own cells | `node --test tests/e2e/addon-surface.test.mjs` · `node --test tests/e2e/staged-install/publish-generators.test.mjs` | **`25/25` pass** · **`10/10` pass, `NG-PUB-F` `controls measured: 5`** |

`CARGO_HOME` is the repository's own prepared `.cargo-home`; with the machine's default `~/.cargo` **no** Rust
command can resolve this workspace offline (`no matching package named 'napi'`), which is a property of this
machine and not of the patch — the patch touches no `.rs` byte.

---

## 5 · WHAT I COULD NOT CLOSE, AND THE ONE FIGURE I DID NOT MOVE

1. **A STALE `docs/**` PROSE COUNT, NAMED AND NOT MOVED** — the prompt's own instruction applies:
   `docs/specs/storeroom-publish/contract.md:834` (the `P-PUB-5` coverage row) still says *"the generator
   `NG-PUB-F` drives it with `3` measured controls"*. **It is `3` at a byte I may not write, and it is `4` on the
   tree.** (`strata/decisions.md:9032`, which also says `3`, is `D-180`'s own record of the move it did not take
   and is correct as history.) The same row's *"TWO measured controls"* at `contract.md:243` is `publish.test.mjs`'s
   own cell and is unmoved.
2. **THE OPERATION RECORD'S EIGHT MEMBERS REMAIN ASSERTED AND UNMEASURED.** They are true on this tree and no cell
   measures them; the arm `(c)` record names that at the capture cell and at the head rather than reporting a
   coverage this pass does not have. A live instrument for them is a *new* cell (`surface.md §2.2`'s operation
   record at the package surface) and it is **not** this pass's item — named, not invented.
3. **`publish.test.mjs`'s two controls are untouched** and `contract.md:243`'s "TWO measured controls" stays true.

---

## 6 · THE ONE EDIT MOST LIKELY TO REDDEN A CELL I DID NOT EXPECT

**The `compared.length >= 21` floor** (`tests/e2e/addon-surface.test.mjs`, the exclusion cell). It is now the
file's own census at **zero headroom**, so it reddens on **any** retirement anywhere in `addon-surface.test.mjs`
— **or** on anything that changes what the cell's own instrumentation counts: a cell renamed so it contains
`s_export_set_` (moves out of `compared`, and trips the `deepEqual` above it too), or a cell whose declaration no
longer begins a line with `test('` (`test.skip(`, a template-literal name, an indented declaration) — the regex
`/^test\('([^']+)'/gm` simply stops seeing it, and `cells` drops while nothing about the golden moved. **That is the
trap `D-181` item 4 described, and this arm arms it exactly and prints what broke.**
