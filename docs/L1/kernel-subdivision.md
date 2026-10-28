# L1 kernel subdivision — `bindings/js/src/constraint-kernel.mjs`, cut at last (RE-ISSUED against HEAD)

**WHAT THIS FILE IS.** The declaration of **the constraint kernel's internal cut** that the architect sanctioned in
`strata/decisions.md` **`D-13`** (*"Kernel can be cut"*), and of **where the kernel's parts live**. It names **five
parts and a barrel**, each with a target path, the line regions it takes **measured at HEAD**, what it owns, and why
each boundary falls at a declaration boundary rather than one line either side; it states the **DAG re-derived at
HEAD** — not carried forward — and checks it for a cycle; it states **what the rulings deleted or moved** and what
each part therefore no longer owns; it places **the six exports**; it defines **`D-14`'s closed set** as a
target-state list; and it states the ownership arithmetic the cut produces.

**THIS IS A RE-ISSUE, AND THIS PASS MOVES NO CODE, WRITES NO CODE, EDITS NO MANIFEST, STARTS NO L2, AND COMMITS
NOTHING.** `D-13` orders no code move; `D-14` opens no wave. Every path below except the barrel's is a path **that
does not exist on disk** (measured: `bindings/js/src/**/*.mjs` returns exactly one file, the barrel).

**WHY IT IS RE-ISSUED — the supervisor's `FINDING` above this pass's commission, confirmed here at the bytes.** The
declaration accepted at `D-15` (commit `fe66387`) described a file that **no longer exists**: it declared **2,203**
lines with **eight blank separators** and its boundaries were drawn against **export sites at `486 · 1008 · 1158 ·
2063 · 2075 · 2111`**. At HEAD the file is **2,213 lines**, **all eight of those separator lines are non-blank**, and
the exports stand at **`472 · 1001 · 1155 · 2066 · 2082 · 2121`** — so the declared boundary at `L481–L483` falls
**inside `register`**, which starts at `L472`. **The cause is stated in `strata/decisions.md` and is not re-litigated
here: twenty-four commits touched this file after `D-15`** (the seven surface rulings `D-22`…`D-29`, and `D-30`).
**A declaration of line regions expires with the next commit that touches the file it measures.** An L4 pass refused
to execute this cut and **was right**; the refusal is the reason this file exists in this form.

**⟶ ★ AND THE CUT THIS FILE DECLARES HAS BEEN EXECUTED — 2026-10-25 — SO EVERY LINE REGION BELOW IS PRE-CUT AND
`bindings/js/src/constraint-kernel.mjs` IS NO LONGER THE FILE THEY ADDRESS.** It is **4 lines**: six names in four
re-export specifiers (`register`, `remove` from `./entry/kernel-registration.mjs`; `commit` from
`./entry/kernel-commit.mjs`; `runAttempt` from `./entry/kernel-attempt.mjs`; `log`, `report` from
`./entry/kernel-terminal.mjs`). **The five parts exist, under the paths §1 declares, measured at their own last
lines: `kernel-foundations.mjs` 529 · `kernel-registration.mjs` 644 · `kernel-commit.mjs` 156 ·
`kernel-attempt.mjs` 570 · `kernel-terminal.mjs` 324** — `528/642/154/567/322` plus the one-line provenance header
and the import block each part carries. **So §1's regions, §3.1's DAG, §4's export sites and §5's ownership
sentences all describe the pre-cut file**; the declaration landed as written, which is why the barrel reproduces
**exactly six enumerable names and no seventh** on this tree, and **a reader who needs a present line number must
treat the parts as the units — there are no regions left to cite.** **This is the second expiry of this file's own
subject, and the first is the one it was re-issued to repair:** both are the same lesson, printed here rather than
absorbed.

---

## §0 · The supersession record — what stood at each site, and why it was stale

**The map's own convention is ANNOTATE-BESIDE (`RCA-8(d)`): the superseded bytes stand as text and are read through
the correction.** This pass rewrites the *figures* because a figure that is false is not a reading — it is a false
measurement — and **quotes every superseded figure here, once per site, with the cause**, so the old declaration is
not erased from the project's record. **Old text is not deleted silently anywhere in this file; this table is where
it is preserved.**

| site | what stood there (accepted at `D-15`, file at `fe66387`) | the cause of its staleness | what stands now |
|---|---|---|---|
| the file's size | *"2,203 lines"*; `561 + 634 + 150 + 565 + 285 = 2,195` assigned `+ 8` separators `= 2,203` | 24 commits after `D-15` | **2,213** lines, `528 + 642 + 154 + 567 + 322 = 2,213`, **no unassigned lines at all** (§1) |
| the separators | eight blank lines at `482 · 1154 · 1363 · 1418 · 1776 · 1803 · 2059 · 2090` | **all eight are non-blank at HEAD** — none of the eight appears in the 90-line `^$` census, and two were read at their bytes: `482` is `if (!inDomainId(id) \|\| typeof constraint !== 'function') {` and `1418` is `return false;` | **seven separator lines, measured blank** at `468 · 997 · 1151 · 1360 · 1420 · 1778 · 2100` (§1) — **and they are no longer "unassigned"**: each is the last line of the part whose declaration it follows, so the tiling has no leftover lines at all |
| `9a`'s region | `L1–L481`, `L1364–L1417`, `L1777–L1802` | every bound moved; the first bound fell **inside `register`** | `L1–L468`, `L1361–L1420` (§1) |
| `9a`'s ownership of the pair key | *"the pair key and the row scans (`PAIR_KEYS`, `pairKey`, `pairSpelling`, `pairRowCarrying`, `pairKeyOf`, `pairRowAt`)"* | **`D-29` deleted `pairKey`, `PAIR_KEYS`, `pairKeyOf` and `pairRowCarrying`** — the file carries their tombstone at `L213–L236` and `L252–L257` | `pairSpelling` and `pairRowAt` only (§5) |
| `9a`'s ownership of the attempt state | *"the module-private state and its one accessor (`KERNELS`, `LIVE`, `CLOSED`, `ATTEMPTS`, `kernelFor`)"*, with *"the maps' **home** is 9a's and their **mutation** is any act part's"* | **`D-30` moved `LIVE`, `CLOSED` and `ATTEMPTS` INTO the per-store record `kernelFor(store)` creates** — tombstone at `L299–L311`; the record at `L313–L362` now carries `pairs`, `handles`, `live`, `closed`, `attempts`, `store` | `KERNELS` + `kernelFor` only; **the maps are fields of the record, so their *home* and their *declaration* are the same object** (§5, §3) |
| `9b`'s region | `L483–L1003`, `L2091–L2203` | `register` moved to `472`; the file's tail moved | `L469–L997`, `L2101–L2213` (§1) |
| `9b`'s ownership of the kernel's handle spelling | *"the kernel's handle spelling and its noop listener/handle"* (`noopHandleFor`, `noopListener`, `KERNEL_HANDLE_PREFIX`) | **`D-22` deleted all three** (*"Discard the noop prefix"*) — tombstone at `L975–L996`; `K-1`'s `store.register` call is deleted with them | **nothing**; `9b` owns no spelling (§5) |
| `9c`'s region | `L1004–L1153` | `commit` moved to `1001` | `L998–L1151`, **154** lines (§1) |
| `9d`'s region | `L1155–L1362`, `L1419–L1775` | the pass's declarations moved; `attemptIdOf`/`commitAttemptIdOf` are no longer a carve | `L1152–L1360`, `L1421–L1778` (§1) |
| `9e`'s region | `L1804–L2058`, `L2060–L2089` | the terminal act and the readers moved | `L1779–L2100`, **322** lines (§1) |
| the export sites | six, at `486 · 1008 · 1158 · 2063 · 2075 · 2111` | all six moved | `472 · 1001 · 1155 · 2066 · 2082 · 2121` (§4) |
| the DAG | `9a→∅ · 9b→9a · 9c→9a · 9d→9a,9e · 9e→9a` | **`D-30` changed `attemptHeldAt`'s signature and its consumers**, and the carve that produced the shape was justified against the old one | **the same shape, re-derived from HEAD's call sites, with a different justification and one carve withdrawn** (§3) |
| the barrel | *"five relative specifiers"* | arithmetic slip in the old text: only **four** parts export | **four specifiers, six names** (§4.3) |

---

**AND WHAT THIS FILE SUPERSEDES IN OTHER DECLARATIONS, NAMED BY SITE SO NO READER THINKS THE MAP WAS RE-VERIFIED.**

1. **`docs/L1/entry-subdivision.md` §9 Q1** — *"is the kernel to be subdivided too?"* — **CLOSED: yes**, by `D-13`, and
   that file's part 9 now points here for the cut.
2. **`docs/L1/entry-subdivision.md` §1 part 9** (*"the constraint kernel, the whole file, `L1–L2203`, 2,203 lines"*) is
   **superseded**: the kernel is five parts and a barrel at 2,213 lines, and **the 2,213 lines are no longer one file**.
3. **`docs/L1/module-map.md` §4 E6**'s paragraph *"its six exports stay exactly where they are"* is **corrected**: they
   stay module-level **names**, reachable at the same **path**, held there by a re-export shell, and the export *sites*
   are four files.
4. **`docs/L1/module-map.md` §6 Q6 and Q7** — the kernel's subdivision question and where its parts live — are
   **answered here**, and the map carries the pointers.
5. **`docs/L1/module-map.md` §2.3/§2.4 and its FIGURES still print the OLD regions and the OLD arithmetic** — the region
   `L483–L1003`/`L2091–L2203`, *"2,195 assigned + 8 blank separators = 2,203"*, `js-constraints`'s `L5202–L5903` region,
   and the entry's `5,903` lines. **They are stale at HEAD for the cause this file's §0 records, and they are NOT edited
   by this pass** (`module-map.md` is a declaration of the tree's ownership and its revision is its own act). **A pass
   that reads the map for a current line number is reading a superseded figure.**

---

## §1 · The cut — five parts and a barrel, measured at HEAD

| # | part | target path | line region taken | owns | decls | lines |
|---|---|---|---|---|---|---|
| **9a** | **the kernel's foundations** | `bindings/js/src/entry/kernel-foundations.mjs` | `L1–L468`, `L1361–L1420` | the closed state set (`KC`, `KC_TOKENS`, `STORE_FLOOR_CODES`), the five `Symbol.for` keys, `refuse`/`isKernelRefusal`, `inDomainAddress`/`inDomainId`, `pairSpelling`, `pairRowAt`, `sameAddress`, the per-store record and its one accessor (`KERNELS`, `kernelFor`), the log appenders (`append`, `withdraw`), the repair's own op reading (`landedOp`, `landedOpDefect`, `opSpelling`), **the record's two scans** (`pairsAtAddress`, `attemptHeldAt`), and the file header | **24** | **528** |
| **9b** | **the registration act, its evaluation, and the registry's removal** | `…/kernel-registration.mjs` | `L469–L997`, `L2101–L2213` | **`K-1`** `register` and its third step (the registration-time evaluation: `registrationEvaluation`, `registrationContext`, `readCurrent`, `registrationRepairContext`, `registrationAttempt`, `registrationRerun`, `registrationRefusal`, `closeRegistrationAttempt`), the withdrawal a refused registration owes (`withdrawRegistration`), and **`K-6`** `remove` | **11** | **642** |
| **9c** | **the commit act** | `…/kernel-commit.mjs` | `L998–L1151` | **`K-2`** `commit`: the held-address refusal, the attempt record's opening, the `CommitRecord`'s four members and their placement in `kernel.live`, and the store's own write verb at its fourth position | **1** | **154** |
| **9d** | **the pass** | `…/kernel-attempt.mjs` | `L1152–L1360`, `L1421–L1778` | **`K-3`** `runAttempt`, the seam's terminal instant (`settleArm`), the pass loop (`runToCompletion`), one evaluation run (`evaluate`), the run's check-off (`releasePending`), the passing arm's publication (`publishCheckedOff`) and the outside-return sentence (`unrecognized`) | **7** | **567** |
| **9e** | **the terminal act, the reference's spellings and the record readers** | `…/kernel-terminal.mjs` | `L1779–L2100` | the attempt reference's two spellings (`attemptIdOf`, `commitAttemptIdOf`), the terminal act (`terminal`), the per-op rollback composition (`composeRollback`), the store's base state (`baseState`), the one removal every terminal arm owes (`release`), the success arm's closer (`close`), and **`K-4`** `log` / **`K-5`** `report` | **9** | **322** |
| — | **the barrel** | `bindings/js/src/constraint-kernel.mjs` (**unchanged path**) | the file's 2,213 lines leave it; **six re-exports in four specifiers** remain | the six module-level names, and nothing else | — | 6 names |

**THE PARTITION IS EXACT AND CLOSED, WITH NO SEPARATOR LINES LEFT OVER — this is the one place the re-issue changes
the *rule* rather than the figures.** The old declaration assigned 2,195 lines and left 8 blank lines **unassigned**.
This one assigns **every line of the file exactly once**: a region boundary is a **measured blank line**, and that
line is **the last line of the part whose declaration it follows**. The arithmetic, printed with its terms:
`528 + 642 + 154 + 567 + 322 = 2,213` — the file's own last line, measured (`read` at offset 2130 reports *"total
2213 lines"*).

**⟶ AND THE CUT'S OWN FIGURES ARE RE-MEASURED AT THIS TREE 2026-10-28 — THE FIVE PART SIZES GREW, THE `2,213`-LINE SOURCE FILE NO LONGER EXISTS AT THAT PATH, AND THE CLOSED STATE SET IS NINE TOKENS, NOT EIGHT.** `RCA-8(g)` ANNOTATE-BESIDE: **every figure of this section stands BYTE-FOR-BYTE — the five target sizes, the `2,213` and its terms — and each is read THROUGH this clause as the reading of the file the cut was drawn against.** **THE FIVE PARTS AT THEIR OWN LAST LINES THIS DATE: `kernel-foundations.mjs` **908** (528) · `kernel-registration.mjs` **772** (642) · `kernel-commit.mjs` **190** (154) · `kernel-attempt.mjs` **879** (567) · `kernel-terminal.mjs` **422** (322)** — so the five read **`3,171`** together, and the barrel (`src/constraint-kernel.mjs`) is **`4`** lines: **the `2,213`-line source file §0 measures was cut and no longer exists, and the barrel's four specifiers still carry the six module-level names** (§4.3). **The regions, the seams and the declaration count are the readings of the file that was cut and are not re-derived here; what moved is length.** **AND THE CLOSED STATE SET IS NINE: `KC-1`…`KC-9`, `KC-9` the save arm's own — the architect's *"Open the token set"* (`D-53`), appended on fourteen sites so that a failed `file`-tier save is derivable from the log's terminal state (it ends the list at `KC-9`) and a constraint refusal is (`KC-3`/`KC-5`/`KC-6`/`KC-8`).** **So the *"eight tokens"* this file's §2 prints is the reading of its own date and reads `nine` from here on; the full names are labels and the closed set is `KC-1`…`KC-9`.** **NO STORE STATUS MEMBER MOVES WITH IT: `CODES` is still `[&str; 20]` and none of the twenty is a `KC` token.**

**⟶ AND THE FIVE PARTS ARE RE-MEASURED AGAIN AT THIS TREE 2026-10-28, BECAUSE THE CLAUSE ABOVE IS ITSELF PAST STATE — `D-57`'s ACT, AND THE SEVEN COMMITS IT READS.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed, including `kernel-commit.mjs` `190` and the `3,171` it read the five as.** **THE FIVE PARTS AT THEIR OWN LAST LINES THIS DATE, each beside that reading: `kernel-foundations.mjs` **1,058** (908) · `kernel-registration.mjs` **785** (772) · `kernel-commit.mjs` **355** (190 — **the movement the delete's `CommitRecord` and its pass made, and the largest in the family**) · `kernel-attempt.mjs` **920** (879) · `kernel-terminal.mjs` **422** ✓** — **so the five read `3,540` together, where the clause above read `3,171`**, **and the barrel (`src/constraint-kernel.mjs`) is still `4` lines ✓ — six names in four re-export specifiers, and `D-56`'s ancestor rule added no export** (§4.3). **The file count is unmoved at five parts plus the barrel, and the regions, the seams and the declaration count are not re-derived here: what moved is length.** **AND THE TWO FIGURES THIS FILE RESTATES AND DOES NOT OWN ARE RE-READ WITH IT AND UNMOVED: the closed state set is still NINE, `KC-1`…`KC-9` ✓, and the store's `CODES` is still `[&str; 20]` ✓.** (`D-57`; `D-56`; the matching re-read is `docs/L1/entry-subdivision.md`'s clause of the same date and `modules.json`'s `sizes_remeasured_2026_10_28_d57` key.)

**The declaration count closes the same way:** `24 + 11 + 1 + 7 + 9 = 52`, the top-level declaration sites at HEAD
(measured: a `^(import|export|function|const|let|class|async function|export const)` grep returns **52** matches, of
which **6 are `export function`**, **37 are internal `function` declarations**, and **9 are top-level `const`
bindings** — `52 = 6 + 37 + 9` ✓). The old declaration counted **62**; §5 accounts for the **ten that the rulings
removed**.

**Two parts take more than one region, and both carves are stated with the edge each one removes or the ownership
each one follows — never for tidiness:**

- **9a takes `L1361–L1420`** (`pairsAtAddress` `L1386`, `attemptHeldAt` `L1414`) **out of the pass's region.** The
  justification is **ownership, and `D-30` is what makes it one**: both functions are **scans over the record
  `kernelFor(store)` creates** — `pairsAtAddress` iterates `kernel.pairs` (`L1388`) and `attemptHeldAt` iterates
  `kernel.live.values()` (`L1415`) — and **after `D-30` those two maps are fields of the very record 9a declares**
  (`L324`, `L354`). The scans are the record's read end; the record is 9a's; so the scans are 9a's.
  **What this carve does NOT do is break a cycle, and the old declaration's claim that it did is hereby corrected:**
  the old text said it removed `9b → 9d` and `9c → 9d`; §3.2 shows that leaving the scans in 9d yields a DAG that is
  **still acyclic**. **The carve removes two cross-part edges and keeps the DAG's shape** (exactly one part reaching a
  second part); it does not prevent a cycle, and a later reader must not infer one.
- **9b takes `L2101–L2213`** (**`K-6`** `remove`) **out of the file's tail**, because `withdrawRegistration`'s
  refusal path calls it (`L652`) and both acts write one pair of maps (`kernel.pairs`/`kernel.handles`: `570`/`571`/
  `579` and `639`/`640` in 9b; `2185`/`2186` in the tail). One caller inside the family, one subject: the registry.

**`L1779–L2100` is now one contiguous region, and that is a change from the old cut**: `attemptIdOf` (`1787`) and
`commitAttemptIdOf` (`1797`) were **carved up into 9a** by the old declaration *"because they are read by two parts
and belong below both"*. At HEAD they sit **between `unrecognized`'s close (`1777`) and `terminal`'s doc block
(`1806`)**, so 9e takes them **contiguously**, and 9d's one edge into them (`runAttempt` `L1157`) is an edge 9d already
has into 9e for `terminal` (`1188`, `1275`) and `close` (`1213`). **The carve is withdrawn because it was a carve, not
a boundary: the read end of the attempt identity belongs with the terminal act and the readers, and nothing in 9a or
9d needs it to move.**

**Nothing else moves region.** The vocabulary, the refusal form, the pair machinery and the record are already a
contiguous head (`L1–L468`); `kernel-foundations.mjs` is that head plus the two scans.

---

## §2 · Why each boundary falls there, and not one line either side

**Every boundary below is a measured blank line between two declarations** — the line numbers are read, not
computed, and the declaration on each side is named so a reader can check the seam without reading the file.

**`L468 → L469` (9a / 9b).** `L467` is `opSpelling`'s closing brace, `L468` is blank, `L469–L471` is the `K-1` banner
(`// ---` / `// K-1 register(store, address, id, constraint) -> Handle` / `// ---`), `L472` is `export function
register`. **`refuse` cannot live above anything** — it is called from all four act parts (`477`, `483`, `1017`,
`1162`–`1202`, `1635`, `2076`–`2169`) — and **the record cannot live below `refuse`**, because `kernelFor` is the only
declaration of the state four parts write.

**`L997 → L998` (9b / 9c).** `L996` is the last line of the `D-22` tombstone block that stands where
`noopListener`/`KERNEL_HANDLE_PREFIX`/`noopHandleFor` were, `L997` is blank, `L998–L1000` is the `K-2` banner, `L1001`
is `export function commit`. **One line higher puts the tombstone in the commit part** (it is registration's history);
**one line lower puts the `K-2` banner inside the registration part.**

**`L1151 → L1152` (9c / 9d).** `L1149` is `commit`'s `return record;`, `L1150` its closing brace, `L1151` blank,
`L1152–L1154` the `K-3` banner, `L1155` `export function runAttempt`. **The split is the file's own item boundary:
`K-2` ends and `K-3` begins**, and `commit` calls no other act part (§3.1).

**`L1360 → L1361` and `L1420 → L1421` (9d / 9a / 9d).** `L1359` is `runToCompletion`'s closing brace, `L1360` blank,
`L1361` the first line of `pairsAtAddress`'s doc block; `L1419` is `attemptHeldAt`'s closing brace, `L1420` blank,
`L1421` the first line of `evaluate`'s doc block. **Both seams put a declaration's doc block with its declaration** —
a boundary that split a doc block from its function would be a boundary drawn on commentary rather than on code.

**`L1778 → L1779` (9d / 9e).** `L1777` is `unrecognized`'s closing brace, `L1778` blank, `L1779` the first line of
`attemptIdOf`'s doc block. **This is the seam that replaces the old `L1803`**: the old declaration ended the pass at
`unrecognized` and then carved `1777–1802` upward; at HEAD the same two declarations meet at a blank line, so the
seam is taken where the file puts it and no carve is needed (§1).

**`L2100 → L2101` (9e / 9b).** `L2099` is `report`'s closing brace, `L2100` blank, `L2101–L2120` the `K-6` banner
(whose own text declares the extent's move `5 → 6`), `L2121` `export function remove`.

**9a — the foundations, group by group, and why each is a foundation rather than a part's property.**

- **The closed vocabulary and the one refusal form** (`KC` `46`, `KC_TOKENS` `59`, `STORE_FLOOR_CODES` `67`, five
  symbol keys `97`/`113`/`135`/`148` + `KERNEL_REFUSAL` `138`, `refuse` `149`, `isKernelRefusal` `167`). `refuse` is
  called from **four** parts (`477`/`483` 9b, `1017` 9c, `1162`–`1202` 9d, `2076`–`2169` 9e) and depends on nothing;
  the eight tokens are the closed set every status is a member of; `KERNEL_REFUSAL` is the one `Symbol.for` key the
  entry also spells (`index.mjs:6287`).
- **The pair lookups** (`pairSpelling` `247`, `pairRowAt` `267`, `sameAddress` `281`). `pairRowAt` is called by
  `registrationAttempt` (`797`, 9b) and `remove` (`2167`, 9b); `sameAddress` by `pairRowAt` (`270`), `register` (`528`,
  9b), `pairsAtAddress` (`1390`, 9a), `attemptHeldAt` (`1416`, 9a) and `evaluate` (`1695`, 9d); `pairSpelling` only by
  `evaluate` (`1528`, `1531`, `1542`, `1550`, 9d). **Both act parts read this block, so it sits below both.** §3.2
  case 1 is the candidate cut that would put it in the registry and invert that.
- **The per-store record and its one accessor** (`KERNELS` `297`, `kernelFor` `313–362`). **This is the group `D-30`
  re-wrote**, and the re-issue states the write sites instead of routing them, because they are shared writes to one
  home and not edges: `kernel.attempts += 1` at `804` (9b) and `1040` (9c); `kernel.live.set` at `1120` (9c);
  `kernel.live.delete` at `970` (9b) and `1891` (9e); `kernel.closed.set` at `969` (9b), `1875` and `1905` (9e);
  `kernel.pairs`/`kernel.handles` written at `570`/`571`/`579` and `639`/`640` (9b) and `2185`/`2186` (9b). **Under
  `D-30` the *home*, the *declaration* and the *identity* of these maps are one object** — the record `kernelFor(store)`
  returns per store — which is a stronger statement than the old *"shared writes to one home"* and is the reason
  `attemptHeldAt` can now be a foundations scan (§1).
- **The two appenders** (`append` `368`, `withdraw` `380`). Three parts write one log: `registrationAttempt`
  (`831`, `833`), `evaluate` (`1479`, `1560`), `runAttempt` (`1293`) and `terminal` (`1835`).
- **The repair's own op reading** (`landedOp` `428`, `landedOpDefect` `449`, `opSpelling` `460`). Read at **both**
  repair sites — `registrationAttempt` `849` (9b) and `evaluate` `1647`/`1650` (9d) — so it sits below both. §3.2
  case 2 is the candidate cut that gives it to the attempt engine, refused on the mechanism.
- **The record's two scans** (`pairsAtAddress` `1386`, `attemptHeldAt` `1414`), carved — see §1. Consumers:
  `pairsAtAddress` at `registrationRerun` `897` (9b) **and** `evaluate` `1446` (9d); `attemptHeldAt` at `commit`
  `1016` (9c) — **one caller, not two, which is the `D-30` fact the old DAG's own description got wrong**.

**9b — why `K-1`, its evaluation and `K-6` are one part.** All three are the registry's mutation surface and nothing
else: `register` writes `kernel.pairs`/`kernel.handles` (`570`, `571`, `579`) and `remove` deletes them (`2185`,
`2186`), and **`withdrawRegistration`'s refusal path calls `remove`** (`652`). **Split `K-6` into a part of its own
and `register` depends on it, one-way — no cycle — but the dependency would read "the registration act depends on
the removal act it calls only to undo itself", and the two acts' shared subject is that registry.** The
registration-time evaluation travels with `K-1` because it **is** `K-1`'s third step and because it calls **nothing in
9d or 9e** (measured: every name in `684–972` resolves to 9a or to itself; `registrationRerun` inlines its own
evaluation rather than calling `evaluate`, `886–938`; `closeRegistrationAttempt` writes `kernel.closed`/`kernel.live`
directly rather than calling `close`, `969`/`970`).

**A measured duplication the cut does not resolve, named so the wave does not "tidy" it.**
`closeRegistrationAttempt` (`956–972`, 9b) and `close` (`1895–1908`, 9e) build the same five-member report, set
`kernel.closed`, delete `kernel.live` and return. **They are one shape in two parts and unifying them would create the
edge 9b → 9e**, which the DAG does not have. Its disposition is no decision of this pass's.

**9c — why `K-2` is alone.** `commit` is one 154-line region whose body reads the foundations and the store:
`kernelFor` `1002`, `inDomainAddress` `1003`, `attemptHeldAt` `1016`, `refuse` `1017`, `kernel.attempts += 1` `1040`,
`kernel.live.set` `1120`, the store's `write` verb at the fourth position. **It calls no other act part**, and
nothing but `runAttempt` reads what it wrote (`kernel.live.get` `1158`). One item, one part.

**9d — why the pass is one part and why the seam is in it.** `runAttempt` (`1155`) is the only caller of
`runToCompletion` (`1184`), `terminal` (`1188`, `1275`), `settleArm` (`1198`, `1255`), `close` (`1213`) and
`publishCheckedOff` (`1226`); `runToCompletion` is the only caller of `evaluate` (`1355`); `evaluate` is the only
caller of `releasePending` (`1672`, `1679`), `withdraw` (`1488`), `unrecognized` (`1502`, `1505`) and `pairSpelling`.
**`settleArm` belongs here rather than with the terminal act** although it is named for the terminal instant: its whole
body is `store[TERMINAL_ARM](record)` (`1319`), **the *entry's* channel**, and its call sites are `runAttempt`'s two
arms. What sits in 9e is the **kernel's** terminal act; the two are different acts sharing one instant.

**9e — why the terminal act, the reference's spellings and the readers are one part.** `log` and `report` (`2066`,
`2082`) answer **from the records `terminal` and `close` write** — `kernel.live.get`/`kernel.closed.get` at
`2072`/`2074` and `2087`/`2095`, on the same two maps those functions set at `1875`/`1905`. `terminal` is reached from
five sites, **all in 9d** (`1188`, `1275`, `1489`, `1628`, `1637`), and calls `composeRollback` (`1824`), `append`
(9a, `1835`), `release` (`1876`) and `kernel.closed.set` (`1875`); `composeRollback` calls `baseState` (`2028`) and
the store's `rollback`/`read`, and reads `STORE_FLOOR_CODES` (9a); `baseState` calls the store's `read` (`2053`).
**The record's write end and its read end are one part because they are one subject: the closed attempt.** And the
attempt reference's two spellings sit at the head of that part because they are the identity those readers are handed.

---

## §3 · The dependency DAG, RE-DERIVED at HEAD, and the cycle check

### §3.1 The DAG

**The arrow points at what is *needed*.** Every edge below was measured twice: by grep for `name(` over the file
(direct named calls), **and** by grep for `kernel\.(live|closed|attempts|pairs|handles)` for the record's field
accesses, which a call-site grep **cannot** see. §8 states the method's blind spots.

```
9a foundations  → (nothing — the part imports nothing at all)
9b registration → 9a
9c commit       → 9a
9d attempt      → 9a, 9e
9e terminal     → 9a
```

**Its shape: 9a is the root and has no outgoing edge; 9e depends on 9a alone; 9d is the only part that reaches a second
part, and it reaches 9e; 9b and 9c are leaves above the root. Depth is three, the longest path is `9d → 9e → 9a`, and
there is exactly one edge that is not `→ 9a`.**

**THE CYCLE CHECK, MECHANICAL AND COMPLETE:** a cycle requires either an out-edge from 9a or an edge from 9e (or 9d)
back into a part above it. **9a has none**: every one of its 24 declarations resolves to a name inside 9a
(`refuse`, `sameAddress`, `pairRowAt`, `opSpelling`, `kernelFor`, …) — measured by grepping the 9a regions for the
names declared elsewhere, which returns nothing. **9e's only out-edge is `→ 9a`** (`kernelFor` `2070`/`2085`, `append`
`1835`, `refuse` `2076`/`2093`/`2098`, `STORE_FLOOR_CODES`, `attemptIdOf` internal). **9d's only out-edges are `→ 9a`
and `→ 9e`.** So the graph is acyclic, and **the one path that could close it — `9e → 9d` — is absent.**

**Every edge, named with its call sites (all lines measured):**

| edge | what crosses, and where |
|---|---|
| **9b → 9a** | `kernelFor` `473`; `inDomainAddress` `476`; `inDomainId` `482`; `refuse` `477`, `483`; `sameAddress` `528`; `pairRowAt` `797`; `append` `831`, `833`; `landedOp` `849`; `pairsAtAddress` `897`; and the record fields `kernel.pairs`/`handles` (`522`, `570`, `571`, `579`, `639`, `640`, `899`, `2184`–`2186`), `kernel.attempts` (`804`), `kernel.live` (`970`), `kernel.closed` (`969`) |
| **9c → 9a** | `kernelFor` `1002`; `inDomainAddress` `1003`; `attemptHeldAt` `1016`; `refuse` `1017`; `kernel.attempts` `1040`; `kernel.live.set` `1120` |
| **9d → 9a** | `kernelFor` `1156`; `refuse` `1162`, `1173`, `1179`, `1202`, `1635`; `append` `1293`, `1479`, `1560`; `pairsAtAddress` `1446`; `sameAddress` `1695`; `withdraw` `1488`; `isKernelRefusal` `1619`; `landedOp` `1647`; `landedOpDefect` `1650`; `pairSpelling` `1528`–`1550`; the record fields `kernel.live` `1158`, `kernel.pairs` `1463`, `kernel.handles` `1732` |
| **9d → 9e** | `commitAttemptIdOf` `1157`; `terminal` `1188`, `1275`, `1489`, `1628`, `1637`; `close` `1213` |
| **9e → 9a** | `kernelFor` `2070`, `2085`; `append` `1835`; `refuse` `2076`, `2093`, `2098`; `STORE_FLOOR_CODES` (in `composeRollback`); `attemptIdOf` internal (`1803`, `2071`, `2086`); the record fields `kernel.closed` `1875`, `1905`, `kernel.live` `1891`, `2072`, `2087`, `kernel.closed.get` `2074`, `2095` |

**`store.*` is not an import and not an edge.** Every store-reaching act is a **method, or a computed symbol-keyed
member, of the object the caller passed first** — `store.listen`, `store.register` (both now deleted from `K-1` by
`D-22`), `store.write`, `store.read`, `store.rollback`, `store.removeListener`, `store[TERMINAL_ARM]` (`1319`, a
computed member a `name(` grep cannot see and which was therefore measured separately). **The cut must not move one of
these behind a sibling**: a part that exported a "store accessor" would mint the second route
`parameter-semantics.md §2.7` refuses.

### §3.2 The candidate cuts, priced — and what a *re-derivation* changed

**1. "The pair lookups travel with the registry that owns them"** — `pairSpelling`, `pairRowAt`, `sameAddress` into
9b. 9b already depends on 9a, and moving the block up gives **9a → 9b**: 9a's `pairsAtAddress` calls `sameAddress`
(`1390`), its `attemptHeldAt` calls it too (`1416`), `pairRowAt` calls it (`270`), while 9d's `evaluate` reaches
`sameAddress` through 9a (`1695`). **A two-part cycle, `9a ↔ 9b`. Refused: the comparison and the row lookup stay
below every part that reads them.** *(This is the exact mirror of the entry cut's `homeAddressKey` case.)*

**2. "The repair's own op reading travels with the attempt engine"** — `landedOp`, `landedOpDefect`, `opSpelling` into
9d. **It closes no cycle** (9d does not reach 9b) **and it is refused on the mechanism rather than on dependency**:
9b's `registrationAttempt` reads the same three at `849`, so the registration act would depend on the attempt engine —
**`K-1` depending on `K-3`, the act on the act it precedes.**

**3. "The terminal act travels with the pass, which is its only caller"** — `terminal`, `composeRollback`, `baseState`,
`release`, `close` into 9d. **It closes no cycle either**: `terminal → composeRollback → baseState → store.read` has no
return edge, and no part outside 9d calls any of them. **Refused on legibility and on the store's own shape**:
`composeRollback` is 99 lines of `RollbackResult`/`undoneOps`/floor-code arithmetic that is not the pass's subject, and
`log`/`report` would be left in a part that no longer writes the record they read.

**4. ★ THE RE-DERIVATION THE SUPERVISOR'S `FINDING` DEMANDS — what `D-30` did to the old DAG's ground, and what this
pass therefore says instead.** The old declaration justified 9a's carve of `pairsAtAddress`/`attemptHeldAt` by two
claims: that `attemptHeldAt`'s *"consumers"* reached it from 9c, and that the carve removed two edges. **At HEAD the
first claim is thinner and the second is not a cycle-break:**
- **The old signature is NOT re-measured here, and this pass says so rather than guessing.** What is measured is
  **the shape at HEAD**: `attemptHeldAt(kernel, address)` (`1414`), one call site (`1016`), and its subject is the
  per-store record's `live` map (`1415`, the field declared at `354`). **What `D-30` changed is what `kernel` MEANS** —
  the record `kernelFor(store)` creates, rather than a module-level `LIVE` map — and that is enough to change the
  carve's character: **it is no longer "removes `9b → 9d` and `9c → 9d`" (which never was a cycle) but "the scans read
  a record 9a declares, and after `D-30` that record is the only home the state has."** *Whether the old parameter list
  was textually identical is not claimed; the old file was not read at `fe66387` in this pass, and `strata/decisions.md`
  records the signature change without printing either form.*
- **The un-carved alternative is printed so the choice can be checked:** with the scans left in 9d the DAG becomes
  `9b → {9a, 9d} · 9c → {9a, 9d} · 9d → {9a, 9e} · 9e → 9a` — **still acyclic, depth three, but with three cross-part
  edges instead of one.** The carve is taken for the record's own sake and for that shape, **not to break a cycle that
  does not exist.** A pass that later reads this file must not be told otherwise.

### §3.3 What the cut must NOT do to the kernel

Four prohibitions, three inherited and one added by this pass:

1. **The `Symbol.for` keys stay declared on both sides** (`kernel-surface.md §1` item 1; the entry's own comments call
   the duplication the mechanism). The kernel declares **five** (`97`, `113`, `135`, `148`, `138`) and **spells the
   sixth inline** (`Symbol.for('provident-storeroom.forget-pair')` at `2202`); the entry declares **six** plus three of
   its own. **A tidying pass that collapses them into one home would make a kernel part import an entry part**, and
   9a's empty out-edge would be gone. **Refused here by name so no wave "improves" it.**
2. **No kernel part imports a node builtin.** The file imports nothing at all (measured: `^import` and `require(`
   return nothing); the cut adds **four** relative imports (one per exporting part) plus the barrel's four, and no
   other kind. A part that reached for `node:fs` would be a second route to the store's own facts.
3. **The family imports nothing from `src/entry/`'s other parts** — no `refusal.mjs`, no `artefact.mjs`, no
   `state.mjs`. The one shared shape is the doubled symbol spelling, and it stays doubled.
4. **NEW: the barrel exports exactly six enumerable names — no `default`, no seventh, no helper.** See §4.2 for the two
   cells that assert the namespace's key set.

---

## §4 · The six exports — the names stay, the sites move, and where they land

### §4.1 The fact, and what changes

| | today (measured) | after the cut |
|---|---|---|
| export sites | six, in one file: `register` `L472`, `commit` `L1001`, `runAttempt` `L1155`, `log` `L2066`, `report` `L2082`, `remove` `L2121` | six, across **four** files: `register`/`remove` (**9b**), `commit` (**9c**), `runAttempt` (**9d**), `log`/`report` (**9e**) |
| the module namespace at `src/constraint-kernel.mjs` | the six, and nothing else | **the same six, and nothing else**, held by a re-export shell |
| how a consumer reaches them | `import(...)` of the path | **unchanged** — the path is the same path |

### §4.2 Why re-exported, and not re-pointed

Three measured facts, and each alone would settle it:

1. **A large population of files reaches the path in code.** The entry declaration counted **21 non-`scratch/` files**
   (11 under `bindings/js/test/`, 9 under `bindings/js/greens/`, and `index.mjs`), **27 naming it in all**, with mixed
   forms: named imports, namespace imports, dynamic `await import(...)`, a path constant, and one use as an **identity**
   (`json-crossing.test.mjs`'s `fileURLToPath(new URL('../src/constraint-kernel.mjs', …))`). **A re-point is that many
   files' worth of mechanical edit for one file's legibility — and it puts the six names in four files' namespaces,
   where the next reader has to discover which.** *(Not re-measured in this pass; carried from
   `entry-subdivision.md` §7 and named as carried in §8.)*
2. **Two runner cells assert the namespace's key set, so the namespace's *shape* is a measured subject.**
   `greens/blind-constraints-v2.mjs:1139` pins `KERNEL_EXPORTS` to the **five** names and is **red at HEAD** (`K-6`
   landed); `held-listener-identity-greens.mjs:909` (`HLI-13.1`) compares `Object.keys(kernel).sort()` against that
   file's **own** six-name `KERNEL_ITEMS` (`:31`) and is **green**. **Only one of the two is red, and the barrel must
   keep both states exactly as they are** — this is `D-15`'s correction of the previous pass's finding, restated so it
   is not mis-corrected again. **⟶ AND ONE OF THOSE TWO STATES IS NO LONGER THE TREE'S, CORRECTED 2026-10-25 ON
   MEASUREMENT: `blind-constraints-v2.mjs`'s cell stands at `:1249` and is GREEN on SIX**, the battery's `D-20`
   execution pass having re-derived it (its own comment at `:1242` records the move). **So BOTH cells are green and
   the barrel must KEEP SIX ENUMERABLE NAMES — the "exactly as red after the wave as before" reading below is
   superseded by the battery's re-derivation, not by the cut.**
3. **A test that must change for a reason other than a path is a falsifier of the cut.** Re-pointing the reaches is
   exactly that edit.

**So: re-exported**, and the reason is also contractual rather than only mechanical (§4.3).

### §4.3 What the barrel is, precisely — and why its path cannot move

- **It is a shell with no logic**: **four** relative specifiers and six re-exported names —
  `export { register, remove } from './entry/kernel-registration.mjs';` · `export { commit } from
  './entry/kernel-commit.mjs';` · `export { runAttempt } from './entry/kernel-attempt.mjs';` · `export { log, report }
  from './entry/kernel-terminal.mjs';` — and nothing else. *(The old text said "five relative specifiers"; only four
  parts export, and the arithmetic is `1 + 1 + 1 + 1 = 4` files for `2 + 1 + 1 + 2 = 6` names.)*
- **Its path is required by an archived clause, not chosen by this pass.** `kernel-surface.md §1` item 1 (now at
  `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/kernel-surface.md`) declares the module's
  **one checkout home** to be `bindings/js/src/constraint-kernel.mjs` and the **import spelling** a red set at
  `bindings/js/test/**` uses to be `from '../src/constraint-kernel.mjs'`. **A barrel at that path preserves both the
  one home and that spelling, so the five parts sit *behind* the home rather than becoming five new homes.**
  *(This is `D-15`'s reading of that archived clause; it is L0's reading of a contract, marked as such, and the
  architect may overrule it.)*
- **It is the only file of the family at a path that exists today**, which is why `D-14` pairs its glob with *this*
  path explicitly: the glob covers `src/entry/*.mjs` and **cannot express a file one directory up**.
- **It is not an `exports` arm and not a published module.** `bindings/js/package.json`'s `exports` publishes `"."`
  alone (measured: lines 27–32), so no consumer can reach the six names; they are reached by the batteries and by
  `index.mjs`'s lazy `require_` (`index.mjs:5604`).

---

## §5 · The inventory — what the rulings deleted or moved, and what each part therefore does NOT own

**This is the part of the re-issue the old declaration could not carry, because the deletions landed after it.**
**A part that owns a declaration the rulings removed has no such declaration to own**, and the honest form is to say
so once per site. **All ten removed declarations are confirmed absent from HEAD by the 52-site declaration census
(`62 − 10 = 52` ✓), and each one's tombstone in the file is cited so the reading it carried is not lost.**

| the ruling | what it removed or moved | where its record stands at HEAD | the old declaration assigned it to | owner at HEAD |
|---|---|---|---|---|
| **`D-29`** (*"Handle becomes the internal ID"*) | **`pairKey`**, **`PAIR_KEYS`**, **`pairKeyOf`**, **`pairRowCarrying`** — four declarations, gone because *"two distinct pairs cannot share one `id`"*, so the function-identity discriminator has no subject and the reverse lookup has no caller | tombstone `L213–L236` (the four named, with what each superseded) and `L252–L257` (`pairRowCarrying`'s own) | **9a** | **nobody**: the key is the plain `id` string (`kernel.pairs`/`kernel.handles` keyed by it, `L324`/`340`, `L570`/`571`); `pairRowAt` stands and its `key` is now the row's `id` (`L230`) |
| **`D-29`** | **`kernel.pairs`/`kernel.handles` re-keyed** from the `(address, id)` tuple to the `id` alone — **not a deletion but a shape change** that moves no line and changes what `pairRowAt`/`pairsAtAddress`/`remove` read | `L214`–`L224` | 9a / 9b / 9e (unchanged) | unchanged parts, changed key |
| **`D-30`** (*"Creating a new store should create a new stack"*) | **`LIVE`**, **`CLOSED`**, **`ATTEMPTS`** — the three module-level bindings gone from module scope, **moved into the record `kernelFor(store)` creates** as `live` (`L354`), `closed` (`L355`), `attempts` (`L356`) | tombstone `L299–L311`, the record at `L313–L362` | **9a** owned the bindings | **9a still owns them — as the record's fields.** `kernelFor` is 9a's, so the *home* is 9a's; the *writes* are 9b (`804`, `969`, `970`), 9c (`1040`, `1120`) and 9e (`1875`, `1891`, `1905`) |
| **`D-22`** (*"Discard the noop prefix"*) | **`noopListener`**, **`KERNEL_HANDLE_PREFIX`**, **`noopHandleFor`** — three declarations, gone with their doc blocks; **`K-1`'s `store.register(home, noopListener)` call is deleted, not re-pointed** (`L555`, `L538`'s comment) | tombstone `L975–L996`, with what replaces each one | **9b** (*"the kernel's handle spelling and its noop listener/handle"*) | **nobody**: the caller's own `id` is the handle (`D-23`/`D-24`), so there is no kernel-authored spelling left to reserve |
| *(pre-existing, named so the count closes)* | `addressToken` (deleted before these rulings; tombstone `L190–L211`), `byAddress`/`kernel.homes`/`kernel.held` (deleted; their tombstone text stands inside `kernelFor`, `L325`–`L344`) | as cited | — | — |

**And the three declarations the old declaration *moved by carve* which this pass places differently:** `attemptIdOf`
and `commitAttemptIdOf` go **contiguously to 9e** (§1); the old carve of `L1777–L1802` into 9a is withdrawn, and the
DAG does not change because 9d already reaches 9e.

---

## §6 · Part sizes, and why the largest is the size it is

| part | lines | one sentence on why it is one part |
|---|---|---|
| 9a | **528** | the vocabulary, the refusal form, the pair lookups, the record and its scans, the log and the repair reading — the block **four** act parts read, and the one group `D-30` re-shaped |
| **9b** | **642** | **the largest**: `K-1`'s act (`472–629`), its registration-time evaluation (`630–972`, ten declarations), the `D-22` tombstone (`975–996`) and `K-6` (`2101–2213`); one subject, the registry's mutation surface |
| 9c | **154** | `K-2` alone; it calls no other act part |
| 9d | **567** | `K-3`'s driver (`1152–1360`) and one evaluation run (`1421–1778`) — the pass, one subject |
| 9e | **322** | the closed attempt's write end and its read end |

**Why 9b is 642 and not smaller, with the comparison the project already uses.** The previous declaration's largest
part was **9b at 634** (`D-13`'s yardstick), and this 9b is the same part on the same subject: it **lost** three
declarations to `D-22` and **gained** the registration-time evaluation's growth since (`+8` net on the head region and
the `D-22` tombstone in place of the noop doc blocks: `521 + 113 = 634` → `529 + 113 = 642`). **Its size is the size
of `K-1`'s three steps plus the removal that undoes the first**, and the alternatives are priced in §2 (K-6 as its own
part: one-way edge, 113 lines, and a dependency that reads "register depends on the removal it calls only to undo
itself"; the evaluation split off: two parts of 328 and 313 with a one-way edge, available if the architect wants every
part under 200 lines, at the cost of splitting one item's machinery across two files).

**The comparison band, printed so this is not a slogan:** the entry's parts after its own re-issue are `1,400 · 81 ·
335 · 593 · 1,155 · 1,337 · 662 · 787`. **Kernel parts sit well inside that band**, and the kernel's largest (642) is
**less than half** the entry's largest non-factory part.

---

## §7 · The home, and `D-14`'s closed set defined before the directory exists

**DECISION (unchanged, and re-confirmed against HEAD): the kernel's five parts live under `bindings/js/src/entry/`
with a `kernel-` prefix; the barrel stays at `bindings/js/src/constraint-kernel.mjs`.** `D-13` confirmed the entry's
home and left the kernel's open; `D-15` settled it on `D-14`'s mechanism. **The reasoning is one sentence: `D-14`'s
mechanism is one glob plus one explicit path, and it stages a loadable tree only if the parts share the globbed
directory — a nested `src/entry/kernel/` would need a recursive glob or a second one, which `D-14` did not sanction.**

**`bindings/js/src/entry/` DOES NOT EXIST AT HEAD AND THE GLOB THEREFORE HAS NO CLOSED SET TODAY.** Measured:
`bindings/js/src/**/*.mjs` returns exactly one path — `bindings/js/src/constraint-kernel.mjs` — and
`bindings/js/src/*` lists `facade.rs`, `lib.rs`, `crossing.rs`, `codec.rs` and that one `.mjs`.

**So this declaration defines the closed set by ENUMERATION, as a target state, and the wave's obligation is to create
exactly these paths and no others.** **The AUTHORITATIVE enumeration is `docs/L1/entry-subdivision.md` §7** — the
directory is named for the entry's parts and that file numbers all twelve; **the table below mirrors it, and if the two
ever disagree the entry file governs and this one is owed an edit.** **`src/entry/*.mjs` after the wave — twelve files,
and the glob is closed by construction because the list is closed by declaration:**

| # | target path | this declaration's part | sibling declaration's part |
|---|---|---|---|
| 1 | `bindings/js/src/entry/refusal.mjs` | `entry-subdivision.md` part 2 | — |
| 2 | `bindings/js/src/entry/artefact.mjs` | part 3 | — |
| 3 | `bindings/js/src/entry/state.mjs` | part 4 | — |
| 4 | `bindings/js/src/entry/class-decision.mjs` | part 5 | — |
| 5 | `bindings/js/src/entry/walk.mjs` | part 6 | — |
| 6 | `bindings/js/src/entry/delivery.mjs` | part 7 | — |
| 7 | `bindings/js/src/entry/constraints.mjs` | part 8 | — |
| 8 | `bindings/js/src/entry/kernel-foundations.mjs` | **9a** | `kernel-subdivision.md` §1 |
| 9 | `bindings/js/src/entry/kernel-registration.mjs` | **9b** | §1 |
| 10 | `bindings/js/src/entry/kernel-commit.mjs` | **9c** | §1 |
| 11 | `bindings/js/src/entry/kernel-attempt.mjs` | **9d** | §1 |
| 12 | `bindings/js/src/entry/kernel-terminal.mjs` | **9e** | §1 |
| — | `bindings/js/src/constraint-kernel.mjs` | the barrel — **outside the glob, named explicitly** | §4.3 |

**Three rules make the enumeration a closed set rather than a list:**
1. **The directory holds `.mjs` files that are parts and nothing else.** A `.md`, a `.json`, a fixture or a scratch
   file placed under `src/entry/` would be staged by the glob; the declaration forbids it, and the wave must not create
   one.
2. **A zero match, or a degraded match, is a loud failure at staging** (`docs/L1/drive-restaging.md` §2.2), and a
   closure check over the staged bytes resolves every relative specifier inside the staged set — **so a thirteenth
   file that some later pass adds is either staged (and its specifiers checked) or the check fails naming it.**
3. **`D-14`'s explicit path is load-bearing for exactly one file: the barrel.** The glob covers rows 1–12; the barrel is
   one directory up and is matched by no glob.

**What the enumeration does NOT claim:** that the directory exists (it does not), that twelve files are easy to create
in one wave (they are not), or that the tracked-path count is known — §8.

---

## §8 · Measured, concluded, and not verified

**Read at the bytes.** `bindings/js/src/constraint-kernel.mjs` **whole at its declaration sites and its boundary
zones**, all line numbers printed in this file being read, not computed: the 52-site declaration census
(`^(import|export|function|const|let|class|async function|export const)` grep, 52 matches, 6 `export function`);
the 90 blank lines (`^$` grep, 90 matches — the eight separators of §1 are members of that set, and the old eight are
measured **not** to be); the file's last line (`read` at offset 2130: *"total 2213 lines"*); the call graph (a `name(` grep per declaration
group, the groups §3.1's table names) **and** the record's field accesses (`kernel\.(live|closed|attempts|pairs|
handles)` grep, 46 matches); the boundaries `L467–L472` (read), `L994–L1001` (read), `L1138–L1162` (read),
`L1305–1340` (read), `L1330–1439` (read), `L1755–1834` (read), `L1866–1913` (read), `L2085–2124` (read), `L2130–2213`
(read); the record `L225–374` (read); the tombstones `L186–240` (read), `L975–996` (read inside `L940–1049`);
`bindings/js/package.json` whole (50 lines); `bindings/js/src/**/*.mjs` and `bindings/js/src/*` for the closed-set
premise; and `docs/L1/entry-subdivision.md` §1/§4 and `docs/L1/drive-restaging.md` whole.

**Concluded, not measured:**
1. **That each part is independently readable.** The dependencies are measured; the *coherence* of each grouping is my
   judgement, on the same footing as the entry cut's nine.
2. **That the call graph is complete.** Edges were found by grep for `name(` — **direct named calls only** — plus a
   second grep for the record's field accesses. **A call through a variable, a destructured alias, a computed member
   (other than `store[TERMINAL_ARM]`, measured), a closure or `Reflect.apply` would be invisible to both.** The risk
   class is real: the kernel reaches the store through method calls on a handed object, and **a caller's own
   constraint body can re-enter `K-2` from inside `runAttempt`** — a dynamic edge no static survey can close.
3. **The declaration count per part** is arithmetic on the 52-site census: `24 + 11 + 1 + 7 + 9 = 52`.
4. **That the barrel preserves the six names for every reach.** The two namespace-asserting cells were read at their
   bytes (`blind-constraints-v2.mjs:1139`, `held-listener-identity-greens.mjs:909`/`:31`); the other reaches are
   carried from the entry pass's count and **not re-measured here**.
5. **The `files` allowlist consequence** (§9): reachability arithmetic on a manifest read in this pass, **not** a
   measured publish.

**Not verified, and named as not verified:** **no shell and no run in this pass — no `node --test`, no greens run, no
`wc -l`, no `git ls-files`**; that `src/entry/` stays a closed set of `.mjs` parts after the wave (a convention, and
§7 makes it a declared obligation instead of a hope); the tracked-path consequence of the five new paths; and whether
the strictest reading of `kernel-surface.md §1` item 1 forbids five relative imports among the kernel's own parts
(`D-15`'s reading says it does not — an architect's call, not a measurement).

**Measured and recorded because they contradict a document:**
- **`blind-constraints-v2.mjs:1139` pins the kernel's namespace to FIVE names** and is **red at HEAD** (`K-6` landed).
  **⟶ CORRECTED 2026-10-25 ON MEASUREMENT: the cell is at `:1249`, it asserts SIX, and it is GREEN** — the battery's
  `D-20` execution pass re-derived it. **So the only surviving item of this list's first bullet is the fact that the
  cell censuses the namespace by exact string, which is what makes SIX the figure the barrel must reproduce.**
- **`constraint-kernel-helpers.mjs:48` declares `KERNEL_ITEMS` with five names** while
  `held-listener-identity-helpers.mjs:163` declares six — **two shared helpers disagree about the kernel's extent.**
- **`closeRegistrationAttempt` and `close` are the same closer written twice** (§2).
- **`attemptHeldAt` has exactly one consumer at HEAD** (`commit` `1016`), against the old declaration's *"9c's `commit`
  reaches it (`L1020`)"* plus the plural *"consumers"* — a figure that was right and is now a single site.

---

## §9 · Consequences for the shipped package — consequences only, no manifest edited

**`delivery` owns these bytes and this pass decides none of them** (`D-3`: the count is retired; `D-4`: the shape is
*"determined empirically — by `delivery` together with the e2e/blind scenario testing"*). What the cut changes is **what
the entry requires by path**, which is the one rule `D-3` leaves binding (measured manifest, 50 lines):

- **today:** four rows — `index.mjs`, `README.md`, `index.d.ts`, `src/constraint-kernel.mjs`.
- **after both cuts:** the entry imports **8 entry parts and 1 barrel**, and the barrel imports **5 kernel parts** — so
  reachability puts **16 rows** in the allowlist (`4 + 12`), **arithmetic on a manifest this pass read and not a
  measured publish**.
- **`src/constraint-kernel.mjs`'s ground changes for the third time in this branch's record**: *the separately
  reachable fourth entry* (`D-1`'s subject, dissolved) → *a file the entry requires like every other part* → **the
  re-export shell the entry requires, which is the only file of the family that is not a part**.
- **`exports` is unmoved** (one arm, `"."`). **No kernel part and not the barrel may be added to it** — an `exports` arm
  for an internal part would republish the six names and re-create the boundary `D-1` dissolved.
- **A tarball cut between the code and the manifest throws at `import`**, naming the missing file — the failure mode
  `D-1-ter` priced, moved earlier and given its own name.

---

## §10 · What a reader should check first, and what would falsify this re-issued cut

**CHECK FIRST, in this order — each is cheap and each can kill a part:**
1. **`grep -n '^function\|^const \|^let \|^export' bindings/js/src/entry/kernel-*.mjs` after the wave, against §1's
   per-part declaration counts (`24 / 11 / 1 / 7 / 9`).** A declaration in two parts, or in none, means a region was
   mis-assigned.
2. **Every name a part uses but does not declare, resolved to 9a or to 9e.** **One edge into 9a or out of 9e upward is
   a cycle**; the check is mechanical and needs no run. **Also grep `kernel\.(live|closed|attempts|pairs|handles)`** —
   a member read is not a call and a call-site grep will miss it.
3. **`Object.keys(await import('./src/constraint-kernel.mjs')).sort()` === the six, and nothing else.**
4. **`grep '^import' bindings/js/src/entry/kernel-*.mjs` must return only `./kernel-*.mjs` specifiers** — a node
   builtin or a `../state.mjs` is a prohibition broken (§3.3).
5. **The drives' staged trees, before believing `docs/L1/drive-restaging.md`**: a publish cell that passes with the
   entry and no `src/` means the entry does not statically import its parts.

**WHAT WOULD SHOW A BOUNDARY IS IN THE WRONG PLACE:**
- **A part that cannot be read without a second part's comments.** If `kernel-commit.mjs` is unintelligible without
  `kernel-foundations.mjs`'s record essay, the two are one part and `L1151→L1152` is a false boundary.
- **Any upward edge**, e.g. `kernel-foundations.mjs` reaching for `pairsAtAddress`'s caller.
- **A `Reflect.apply`/alias call across a boundary that grep could not see**, whose first symptom is a
  `ReferenceError` at import.
- **A greens or battery cell that must change for a reason other than a path.** The two namespace cells of §4.2 are
  the ones to watch: **`blind-constraints-v2.mjs:1139` must be exactly as red after the wave as it is now, for the
  same reason, and `HLI-13.1` must stay green.** **⟶ AND THE WAVE LANDED WITH BOTH GREEN, 2026-10-25: the first cell
  was re-derived to SIX by the battery's own `D-20` pass before the cut, so the falsifier's antecedent — a red that
  the cut neither fixes nor worsens — no longer exists for it. The remaining subject is the one stated above it: six
  names and no seventh.**
- **The installed battery failing on a missing kernel part** — that would mean §9's reachability consequence was
  declared right and landed wrong.

---

## §11 · Questions for the architect

**Q1 — is `src/entry/` still the right home, given that the kernel's parts and the entry's parts share one directory
and one owner?** `D-15` settled it on `D-14`'s mechanism, and the mechanism is what the re-derivation still supports:
one glob stages twelve files only because they share the directory, and the barrel is the one file outside it. **The
alternative — `src/entry/kernel/` with a recursive glob — is now the only shape that would let a directory say what a
`kernel-` prefix says**, and it costs `D-14`'s closed set its "by construction" property. **I have not taken it; the
re-issue keeps `D-15`'s answer.**

**Q2 — the barrel's reading of `kernel-surface.md §1` item 1 is L0's, not a measurement.** `D-15` reads that clause as
governing **where the surface is reached from a red set** and not the edges inside the package, which is what makes
four relative imports in the barrel and four among the parts lawful. **If that reading is refused, the cut and the
clause are in direct conflict and the architect must choose, because a 2,213-line file cannot be cut without at least
one relative import.**

**Q3 — 9b is the largest part at 642 lines, and it is 8 lines larger than the part `D-13` accepted.** Two splits are
drawn to nothing and priced: `K-6` alone (113 lines, one-way edge) and the registration-time evaluation alone (313
lines, one-way edge). **Neither is taken because both separate one item's machinery across files and neither buys a
cycle-break; if the architect wants every kernel part under 400 lines, the second split is the one to order and the
re-issue of this file is a table edit.**

**Q4 — should `attemptIdOf`/`commitAttemptIdOf` return to 9a?** The old declaration carved them up; this pass puts them
in 9e contiguously, and the DAG is identical either way (`9d → 9e` exists already). **A carve costs one multi-region
part; a contiguous 9e costs nothing and reads better. I declare the contiguous placement and record the old carve as
withdrawn.**
