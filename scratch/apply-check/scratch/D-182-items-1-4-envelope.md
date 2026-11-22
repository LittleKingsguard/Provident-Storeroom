# Envelope — the four residuals this pass was given: the eight members' live instrument · the two bases' difference · the zero-headroom floor · the sweep's bound · `2026-11-22`

**THE PASS IS `role_l3_test_writer`. FOUR ITEMS, FOUR CELLS, ALL FOUR CLOSED, TESTS ONLY.** The patch is
`scratch/D-182-items-1-4-live-instrument-partition-the-floor-sweep-bound.patch` — **`git apply --check` exit `0` on
the clean worktree and on a `git archive HEAD` copy in `/tmp`, and applying it there reproduces this pass's three
`tests/` files BYTE FOR BYTE** (`cmp`-clean on all three: `addon-surface.test.mjs`,
`kernel-attempt-window.test.mjs`, `journal_and_rollback.rs`). **The worktree is restored clean: `git status --porcelain` carries this envelope and the patch, and
nothing else.** **No `src/**`, no `bindings/**`, no `docs/**`, no `strata/**`
byte moved** — every temporary mutation driven below to redden a cell was restored, with `git status --short src/
bindings/` empty after each (the demonstrations are in §1–§4).

**THE BASELINE, MEASURED ON THIS TREE BEFORE THE FIRST EDIT, NOT CARRIED:** `npm test` **`1384` tests · `1384`
pass · `0` fail · `0` skip · `0` todo, exit `0`**. Beside it, on the same run: the store's own leg
`journal_and_rollback` **`46` passed**, which is the figure item 2 moves.

**AND THE FINAL READING IS `1386` / `1386` / `0` / `0`, NOT THE `1388` THE BRIEF PRICED.** The difference is the
FORM of two of the four cells and it is stated at its own item: **two items add a new `test(…)` row (`+1` each), one
is a rewrite INSIDE an existing row (`+0`), and one is a Rust `#[test]` in an existing cargo target (`+0` to
`npm test`, `+1` to `cargo test`).** `1384 + 2 = 1386` and `46 + 1 = 47`.

---

## 1 · ITEM ONE — THE OPERATION RECORD'S EIGHT MEMBERS, ON A PATH THAT RUNS

**THE DEFECT, QUOTED AND CONFIRMED AT THE BYTE.** `D-182`, on `D-181`'s three: *"**the operation record's eight
members are asserted by a cell that cannot fail** — **a live instrument is a new cell, not this pass's item**."* I
re-read the capture cell and measured the reason: `oldDispatcherShape()` answers `null` (the artefact exports no
`call`), so `sas_d3_s_parity_the_golden_captures_…` takes its first branch, asserts the `D-1` key-set claim and
returns — **the eight members are asserted on a body no run reaches.**

**THE CELL ADDED** (`tests/e2e/addon-surface.test.mjs`, a NEW `test(…)` row, `+1` to `npm test`):

`sas_d3_s_parity_the_live_write_carries_the_operations_eight_members_the_capture_wrote_and_no_run_reached`

**WHAT IT MEASURES, IN EIGHT LIMBS, ON A BODY THAT RUNS.** One store from the package's one declared factory
(`storeCreate`), one `write(['a'], 'mem', 1)`:

| limb | the assertion |
|---|---|
| the write record's own three | `Object.keys(record).sort()` is `['op','triggered','watched']` |
| **the operation record's eight, BY NAME** | `['address','after','before','compacted','kind','opId','seq','tier']` |
| each member at its VALUE | `address` `['a']` · `kind` `'write'` · `tier` `'mem'` · `opId` a `string` · `seq` `1` · `compacted` `false` |
| **both base states' two members** | `Object.keys(before/after)` is `['present','value']` on BOTH arms, with `value` `undefined` where no version stood, plus `before.present false` / `after.present true` / `after.value 1` |
| a second op answers the same set | `write(['a'],'mem',2)` — same eight names, `seq` `2` |
| **a second live route** | `delete(['a'],'mem')`'s `receipt.op` carries the same eight, `kind` `'delete'` |

**WHY THE LIVE PATH, READ FROM THE TREE AND NAMED AT THE CELL.** The package's `write` answers `{op, watched,
triggered}` (`surface.md §2.2`) and `op` **is** the store's journal record crossed member for member —
`bindings/js/index.d.ts`'s `JournalOp`: *"THE STORE'S OWN JOURNAL OP, CROSSED MEMBER FOR MEMBER AND IN THE STORE'S OWN
SPELLINGS — `DD-39`'s eight declared names (`distribution.md §5.2` item 1; `P-PUB-7`)"*. Measured live before the
cell was written: `["address","after","before","compacted","kind","opId","seq","tier"]`.

**AND WHAT IT CANNOT SEE, SAID AT ITS BYTE — THE ANSWER IS "THE SAME EIGHT, AND NOT THE CARRIER".** The capture's
`GOLDEN` row holds FOUR limbs: the receiver record's three names, the receiver's DECODED address, and — read through
the old dispatcher — the ARTEFACT-LAYER carrier spelling of that address (`{k, s}`) beside its tier
(`dispatcherCarrierAddress`, `dispatcherCarrierTier`). **The live path carries the first two and not the third**: the
package ENCODES an address to the crossing's carrier and DECODES the answer back to a JS segment array
(`surface.md §2.2`), so no `{k, s}` form is reachable from the package's own answer — and its producer, `call`, is
deleted (`export-set-and-dispatch.md §2`). **So the live record and the capture's record are the SAME SHAPE
(`WriteRecord.op`, the store's own journal op) and the carrier limb is NOT, and the cell asserts only what the live
path carries**; `dispatcherCarrierAddress`/`dispatcherCarrierTier` are named in the cell's record as **owed and owed
to nobody**. A cell asserting them would have been the same defect one layer over.

**FAILURE DEMONSTRATION — ONE LINE AT THE LIVE PRODUCER.** `bindings/js/src/entry/frame.mjs:607`'s
`compacted: encoded.compacted,` deleted (one line; **no rebuild**, the entry is JS):

```
✖ sas_d3_s_parity_the_live_write_carries_the_operations_eight_members_the_capture_wrote_and_no_run_reached
ℹ tests 26 · pass 25 · fail 1
  AssertionError: P-SAS-3 — the operation record's eight members, as `index.d.ts`'s `JournalOp` declares them and
  `distribution.md §5.2` item 1 names them. **THIS IS THE ASSERTION THE CAPTURE CELL HOLDS AND NO RUN REACHES**
  (`D-181` item 5); it is measured HERE, on a live write. Got ["address","after","before","kind","opId","seq","tier"]
```

**THE FILE'S OWN HEAD AND DIGEST MOVED WITH IT, DATED, AND NOT SILENTLY**: the `D-3` row's figure (`2`) now carries a
dated clause saying the group holds `3` and the file `26`; the group head's *"TWO CELLS … NOT THREE"* carries a dated
clause saying the group holds three AGAIN **on a cell added and not on one un-retired**; and the head's *"the
operation record's eight members are asserted there nowhere"* is corrected at its own sentence.

---

## 2 · ITEM TWO — TWO BASES BECAUSE THEY ANSWER TWO QUESTIONS, PINNED SO NOBODY UNIFIES THEM BY TIDINESS

**THE CELL ADDED** (`tests/integration/store-core/journal_and_rollback.rs`, a NEW `#[test]` in the existing
`journal_and_rollback` target — `+1` to `cargo test`, `+0` to `npm test`):

`d179_the_compacteds_floor_and_the_files_image_are_two_bases_and_both_paths_are_driven`

**THE RULING, QUOTED AT ITS OWN SENTENCE.** `D-179` item 4: *"`Store::regenerate`'s `apply_register(&self.born)` is
unmoved and marked as deliberately NOT this base — the two answer different questions."* `D-180` item 6: *"`replayMark`
and `regenerate` answer different questions and that is DELIBERATE … **Named here so a later pass does not unify them
by tidiness.**"* **Nothing measured it** — this is the only byte of the tree that would report a unification.

**BOTH HALVES ARE DRIVABLE IN ONE CELL, AND THE REASON IS NAMED RATHER THAN ASSUMED.** `regenerate` is private
(`fn regenerate(&mut self, scope: &[usize])`), so the cell reaches it through **its only public producer**: `rollback`
over an op the compaction has DROPPED, on a store that has a retrievable file — the arm `D-164` item 2 (a) declares
and `s6_4_m6_…` already drives. The replay half is public: `restoreFloor()` is `replayMark(None)`. **No owed half.**

**THE FIXTURE IS THE ONE STATE THAT SEPARATES THEM — A STORE WITH BOTH A DROPPED ENTRY AND A BOOTED IMAGE**: a first
store writes `x` at `file` and the terminal arm commits it; a second instance boots that path with `journalLength: 2`;
three `mem` writes (`a`, `b`, `c`) make the third append DROP `a`'s entry, so **the compacted floor is `{x:1, a:1}` and
the file's image is `{x:1}`.** Then, each landing read before the next path runs:

| path | its base | `a` | `b` | `c` | `x` |
|---|---|---|---|---|---|
| `restoreFloor()` — `replayMark(None)` | **the compacted floor** | **`1`** | `AddressNotFound` | `AddressNotFound` | `1` |
| `rollback(a.op.opId)` — `regenerate` | **the file's image**, plus every retained entry outside the scope | **`AddressNotFound`** | **`1`** | **`1`** | `1` |

**So the two paths land on DIFFERENT states from the same journal, and the difference is the dropped entry's effect
(floor: has it, image: never had it) and the retained entries (image: replayed onto it, floor: not on it).** `x` is the
one member the difference is not about, and it is asserted on both paths.

**FAILURE DEMONSTRATION — TWO ONE-LINE UNIFICATIONS, EACH DRIVEN AND EACH RESTORED `diff`-CLEAN.**

| the unification | the red |
|---|---|
| `src/store.rs:3842` — `let floor = self.floor_state.clone();` → `let floor = self.born.clone();` (the replay begins at `born` again) | `panicked: **D-179 item 1 — THE DROPPED ENTRY'S EFFECT STANDS ON THE FLOOR.** … a replay that began at `born` (or at the file's image) answers `AddressNotFound` here: the contract declares success here; got status AddressNotFound` |
| `src/store.rs:3783` — `self.reset_register(); self.install_file_image(&members);` → `self.apply_register(&self.floor_state.clone());` (the regeneration re-bases on the floor) | `panicked: the regeneration's base is the FILE's image, which never carried `a`: the contract declares a failure here; the call succeeded` |

**Each unification reddens EXACTLY ONE of the two halves, which is the property the cell exists for**: a later pass
that tidies either base is told which of the two questions it answered differently.

---

## 3 · ITEM THREE — THE ZERO-HEADROOM FLOOR, REPLACED BY A PARTITION OF THE FILE'S OWN CELLS

**THE FIGURE, AT ITS OWN QUOTE.** `D-181` item 4: *"`sas_d3_s_parity_the_goldens_diff_excludes_…`'s `compared.length
>= 20` limb now has ONE row of headroom (`21`), so any further retirement in that group trips a cell from a different
group than the one edited. **A brittleness, not a defect**; the figure should be re-derived to whatever the group now
holds."* The pass that re-derived it to `21` left **ZERO** headroom, and `D-182` named the trap.

**THE FORM CHOSEN — A PARTITION AGAINST THE DECLARATIONS, AND WHY IT AND NOT THE OTHERS.** The limb now asserts:

> **the two sets the golden's diff holds — the excluded `s_export_set_` cells and the `compared` ones — name EVERY
> declared cell of this file, and each EXACTLY ONCE** (`new Set([...excluded, ...compared]).size === declarations.length`),

where `declarations` is read from the file's OWN bytes a second time, as `/^[ \t]*test[.(]/` — **any `test(`/`test.`
form at a line's start, indentation allowed** — while `cells` is still the strict `/^test\('…'/` the rest of the file's
instruments use. **A cell can then escape BOTH sets only by escaping the read that finds the declarations, which is
exactly what the two figures disagree about**: a `test.skip(`, an indented declaration, a double-quoted or
template-literal name, a name declared twice, or a `compared` set quietly truncated — **all five redden, and the
message prints both figures.**

**THE ARMS REFUSED, WITH THE MEASUREMENT THAT REFUSED THEM.**
- **(a) A RE-DERIVED FLOOR** (`>= 22` now that the file declares `26` cells) is the same defect at the next figure.
- **(b) A NAMED SET** of the 22 compared rows is a second census every rename or addition falsifies.
- **(c) A BODY-DERIVED PARTITION** — deriving *"reads the artefact's key set"* from each cell's own text, which is
  `§6` item 2's literal wording — **was measured and refused**: `addonKeySet(` is reached at six sites in this file,
  and one is the CAPTURE cell's own `assert.equal(addonKeySet().includes('call'), false, …)` — the `D-1` claim that
  record cell duplicates (`D-181` item 5). **A body read would find a RECORD and report it as a defect**, and greening
  it would mean deleting a record the corpus keeps on purpose. The cell's own head sentence (*"the cells that read the
  artefact's own key set are the ones whose body reaches `addonKeySet`"*) was false as written and is **corrected in
  place at its byte**, with the six sites named.

**FAILURE DEMONSTRATIONS, BOTH TAKEN (the second is the one that had to stay GREEN).**

```
(a) ONE CELL'S DECLARATION INDENTED BY TWO SPACES — a cell silently dropped from BOTH sets:
    ✖ sas_d3_s_parity_the_goldens_diff_excludes_the_keyset_cells_and_the_exclusion_is_the_d1_group_alone
    AssertionError: every declared cell of this file is accounted for EXACTLY ONCE across the diff's two sets —
    `4` excluded `s_export_set_` cells and `21` compared ones, `25` distinct names, against `26` declarations
    read at their own bytes …
    ℹ tests 26 · pass 25 · fail 1

(b) ONE CELL RETIRED OUTRIGHT (the whole `sas_d6_s_state_id_gone_no_state_id_survives_…` row deleted):
    ℹ tests 25 · pass 25 · fail 0
```

**(b) is the point of the item: a retirement no longer reddens a cell from another group.** The old limb would have
been at exactly zero headroom at `25` cells (`compared = 21`, `>= 21`), so the NEXT retirement in this file would have
landed here; **the file may now gain or lose cells without this cell moving, and it still reddens on a drop.**

---

## 4 · ITEM FOUR — THE SWEEP'S BOUND, MEASURED AGAINST THE BOUND THE CODE GIVES AND NOT A NICER ONE

**THE CELL ADDED** (`tests/e2e/kernel-attempt-window.test.mjs`, a NEW `test(…)` row, `+1` to `npm test`):

`KAW-3 · D-180 item 8 — the closed-id table is bounded by the 256-seal sweep, and the bound is NOT <= 256`

**WHAT WAS UNMEASURED, AT ITS OWN QUOTE.** `D-180` item 8: *"`closedIds` is bounded by a sweep of every `256` seals
and by nothing else — a bound with a constant in it, like the window it replaced, and **the only one left in that
file**."* **The sweep, read at `bindings/js/src/entry/kernel-foundations.mjs:756` and quoted in the cell**: `const
CLOSED_ID_SWEEP = 256;` (not exported, unlike `CLOSED_ATTEMPT_WINDOW` beside it), `kernel.closedSeals += 1`, a return
unless the seal count is a multiple, then a rebuild keeping `[id, ref]` only where `ref.deref() !== undefined`.

**THE TRUE WORST CASE, STATED AT THE CELL AND ASSERTED AT ITS ARITHMETIC.**
- A sweep KEEPS every entry whose `WeakRef` still dereferences: **the size immediately after a sweep is the number of
  attempts something can still name** (`live`) — and that is bounded by NOTHING the sweep controls. **Measured on this
  tree: `1200` writes, receipts dropped, no collection → `closedIds.size === 1200`** (every entry kept, because every
  ref still dereferenced); and with the receipts dropped but no TURN between batches, `5120` → `5120`. **So the table
  is UNBOUNDED when the refs are reachable, and an assertion of `<= 256` would be wrong twice over.**
- Between sweeps, each seal writes one fresh id and nothing is removed, so
  **`size ≤ live-at-the-last-sweep + (CLOSED_ID_SWEEP − 1)` = `survivors + 255`.** The cell asserts THAT with the
  survivors it measures.

**THE INSTRUMENT, AND WHY IT IS A CHILD WITH A TURN.** `npm test` carries no `--expose-gc`, so the collector cannot be
forced in the test process — **and a `WeakRef.deref()` inside the sweep keeps its target alive until the end of the
CURRENT SYNCHRONOUS JOB** (the spec's `KeepDuringJob`), so a `gc()` in the sealing batch collects nothing.
**Measured both ways and quoted in the cell's record** (`1200 → 1200` without a turn; `5120 → 5120` with
`gc()` every 16 writes in one job). The probe is this same file re-executed with `--expose-gc`, `setTimeout(0)` then
two collects per batch — the device `tests/e2e/store-retirement.test.mjs` uses. **Workload: `5120` writes with every
receipt dropped, `80` batches of `64`, one store.**

**THE MEASURED FIGURES, PRINTED BY EVERY FAILURE MESSAGE AND PINNED HERE:**

```
{"gc":true,"writes":5120,"seals":10240,"maxSize":191,"survivors":64,"maxRise":127,"midMax":191,"finalSize":64}
```

= **`maxSize` 191** against the code's bound `survivors + 255 = 319` (margin 128) and against the absolute figure
`2 × 256 − 1 = 511` (margin 320); `maxRise` 127 inside one interval of 255 seals; and the two halves' maxima EQUAL
(191 = 191) over 5120 writes.

**FIVE LIMBS, IN THE ORDER THEY FIRE.** the constant is still the source's own (the cell PINS `256` and asserts the
declaration, so a changed constant must be acknowledged) · the collector ran · the workload crossed ≥ 8 intervals ·
**the rise inside one interval ≤ 255** (the schedule: it reddens if the sweep runs less often than the constant says or
a seal writes two entries — **and it cannot see the pruning, said at its own byte, because the interval resets every
256 seals whether or not anything was dropped**) · **the table does not grow with the write count** (`maxSize ≤
midMax + 255`: the pruning itself) · the size ≤ `survivors + 255` · the absolute `≤ 511` · the workload is large
enough that the bound separates an unswept table from a swept one (`writes ≥ 4 × 511`).

**FAILURE DEMONSTRATIONS — TWO, EACH A ONE-LINE CHANGE, EACH RESTORED `diff`-CLEAN.**

```
(a) `const CLOSED_ID_SWEEP = 1 << 20;`  (kernel-foundations.mjs:756)
    AssertionError: the bound this cell asserts is the source's own — `bindings/js/src/entry/kernel-foundations.mjs`
    must declare `const CLOSED_ID_SWEEP = 256;`, and it does not. **A CHANGE TO THE CONSTANT IS A CHANGE TO THE
    BOUND, SO IT MUST BE ACKNOWLEDGED HERE AND NOT SLIP THROUGH** (`D-180` item `8`: it is "the only one left in
    that file")

(b) `pruneClosedIds`'s body replaced by `// the sweep removed: closedIds is never pruned`  (the same file, the loop
    and the `kernel.closedIds = kept` gone)
    AssertionError: **THE TABLE DOES NOT GROW WITH THE WRITE COUNT** — the second half's maximum **5120** exceeds
    the first half's **2560** by **2560**, inside the one sweep interval of **255** that a bounded table can rise by.
    **A TABLE THAT KEPT ONE ENTRY PER WRITE WOULD SHOW THE WHOLE COUNT HERE**
```

---

## 5 · THE RUNS, TAKEN ONCE AFTER (this worktree, these bytes — and the tree is restored clean)

| gate | command | reading |
|---|---|---|
| `test` | `npm test` | **`1386` tests · `1386` pass · `0` fail · `0` skip · `0` todo, exit `0`** (baseline `1384/1384/0/0`; `+2` rows) |
| the files' own | `node --test tests/e2e/addon-surface.test.mjs` · `node --test tests/e2e/kernel-attempt-window.test.mjs` | **`26` cells, `26` pass** (was `25`) · **`3` cells, `3` pass** (was `2`) |
| `typecheck` | `npm run typecheck` | **exit `0`**, no diagnostic |
| `cargo test` | `CARGO_HOME="$PWD/.cargo-home" cargo test --offline` | **exit `0`**, **`22` `test result: ok` lines**, **`676` passed · `0` FAILED** — the one cell this pass adds, over the baseline run's `journal_and_rollback` **`46` → `47`** (`676 − 1 = 675`, the figure `D-181`'s floor also records) |
| `cargo check --target wasm32` | `CARGO_HOME="$PWD/.cargo-home" cargo check --offline --target wasm32-unknown-unknown` | **exit `0`, `0` errors** |
| `build` | `CARGO_HOME="$PWD/.cargo-home" npm run build` | **exit `0`**, addon re-staged (`1481152` bytes) |
| **the patch, on a clean copy** | `git archive HEAD` → `/tmp`, `git apply --check`, `git apply`, `cmp` | **`--check` exit `0` · apply exit `0` · all three files `cmp`-clean against the measured bytes** |
| **and the clean copy's suite, with and without it** | `npm test` in the bare archive | **without the patch `1377` / `1375` / `2` · with it `1379` / `1377` / `2`** — **the patch adds exactly two cells and moves no other**, and the `2` are the bare archive's own two environment reds (`wasm-arm.test.mjs` needs `.cargo-home/bin/wasm-bindgen`; `staged-install`'s `GUARD::the real entry still resolves IN PLACE at rung two` needs the staged tree), identical with and without it |

`CARGO_HOME` is the repository's own prepared `.cargo-home`; with the machine's default `~/.cargo` no Rust command
resolves this workspace offline (a property of the machine, not of the patch).

---

## 6 · WHAT I COULD NOT CLOSE, AND WHY

1. **THE CAPTURE'S CARRIER LIMBS HAVE NO INSTRUMENT AND CAN HAVE NONE** — `dispatcherCarrierAddress` and
   `dispatcherCarrierTier` were read through `call(index, verb, args)`, which `export-set-and-dispatch.md §2` deletes;
   the package decodes the carrier, so no live path produces the `{k, s}` spelling. **Named at item 1's cell as owed
   and owed to nobody**, not invented.
2. **THE BODY-DERIVED FORM OF `§6` ITEM 2's RULE IS STILL UN-INSTRUMENTED, AND IT IS A REAL (SMALL) FINDING.** `§6`
   item 2 says *"the golden compares everything except the cells that read the artefact's key set"*, and **the capture
   cell reads the key set (`addonKeySet().includes('call')`) while standing in the COMPARED set** — i.e. a key-set
   claim lives outside the exclusion. That is the `D-181` item 5 duplicate, kept on purpose as a record. **Curing it is
   a decision about the capture cell (retire it, or move its key-set limb to `P-SAS-1`) and not a limb of this cell**;
   the cell says so at its own byte, in the refused arm `(c)`.
3. **THE `<= 256` QUESTION HAS NO CELL BECAUSE IT HAS NO ANSWER TO PIN**: the table's size with reachable refs is
   unbounded *by design* and depends on the collector. It is recorded as a MEASUREMENT (`1200` writes → `1200`;
   `5120` writes with no turn → `5120`) in `KAW-3`'s record and in `KAW-1`'s complementary reading, not asserted, so
   that nothing here claims a bound the code does not guarantee.
4. **THE `1388` FIGURE IS NOT REACHED AND MUST NOT BE PADDED TO**: it is `1386` because item 2 is a Rust cell and
   item 3 is a rewrite inside an existing row (§ preface). **No cell was added to make a number.**
5. **NO `docs/**` OR `strata/**` BYTE MOVED**, so `D-181`/`D-182`'s records still carry the pre-pass sentences (*"a
   live instrument is a new cell, not this pass's item"*, *"at zero headroom"*). **Owner: the supervisor's envelope,
   which is `strata/**` and outside every delegate's write set.**

---

## 7 · THE ONE EDIT MOST LIKELY TO REDDEN A CELL I DID NOT EXPECT

**`KAW-3`'s flatness limb (`maxSize ≤ midMax + 255`).** It reddens on **anything that makes a closed attempt's
`AttemptRef` reachable after its write returns** — a cache of refs in the entry, a report kept strongly instead of
under the `WeakMap`, a `FinalizationRegistry` with a strong held value (the very shape `D-175` removed), or a caller-
side retain that the workload does not do — because then the collector cannot take it, `survivors` climbs toward the
write count, and **the table grows per write at a cell whose name is about the sweep**. Such a pass would not have
touched `kernel-foundations.mjs`'s `256` at all, and the red would land here first.

**Runner-up, named because it is the other direction of the same surprise**: the partition limb of
`sas_d3_s_parity_the_goldens_diff_excludes_…` reads **every** `test(` declaration in `addon-surface.test.mjs`, so a
future cell added to that file **in a form the strict name pattern cannot see** (`test.skip(`, an indented or
double-quoted declaration, a template-literal name) reddens a census cell from another group — which is now the ONLY
way a cell added or retired in that file can redden it, and is deliberately so.
