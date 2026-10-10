# BACKUP MANIFEST — the bounded caller-spelled-duplicate pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-js/`, closing the implementer's `CF-DUP-1` and the two priced residuals the previous pass named

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes only
— NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rule
`DEF-14`/`DEF-15` is therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file under `docs/specs/storeroom-js/**`
was re-worded, moved, replaced or deleted, so **`git diff` recovers every pre-pass byte of every touched file
as unchanged context and every byte this pass added as an added line**; and **(2) THIS MANIFEST, which records
each file's PRE-PASS LINE COUNT and every insertion with the PRE-PASS LINE it stands beside** — so a reader
holding the pre-pass bytes can check the two against each other without a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR-JS` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this
pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved;
**it contributes to NEITHER side of the closure predicate** — it is not an entry of the part map and it is not
a file the map declares as a part, and it is not one of the `3` recorded omissions.

## 1. The directory's files this pass touched, with their PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/contract.md` | `2307` | `2431` | `+124` | **2 insertions** — `§5.5`'s row clause (`+101` lines) and `§5.8`'s `S-SET` clause (`+23` lines); **no pre-pass byte re-worded, moved or deleted** |
| 2 | `docs/specs/storeroom-js/surface.md` | `726` | `756` | `+30` | **1 insertion** (the `CF-3` clause's `JSG-10.24` figure, corrected with a dated clause); **plus ONE SELF-CORRECTION INSIDE THIS PASS'S OWN ADDED BYTES, DISCLOSED AT `§3` BELOW** |
| 3 | `docs/specs/storeroom-js/parameter-semantics.md` | `726` | `816` | `+90` | **2 insertions** — `§2.13`'s dated clause (`+37` lines) and `§2.15`'s dated clause (`+53` lines); **no pre-pass byte re-worded, moved or deleted** |
| 4 | `docs/specs/storeroom-js/crossing.md` | — | — | `0` | **UNTOUCHED** |
| 5 | `docs/specs/storeroom-js/package.md` | — | — | `0` | **UNTOUCHED** |
| 6 | `docs/specs/storeroom-js/acceptance.md` | — | — | `0` | **UNTOUCHED** |
| 7 | `docs/specs/storeroom-js/implementation-plan.md` | — | — | `0` | **UNTOUCHED** |
| 8 | `docs/specs/storeroom-js/test-cases.md` | — | — | `0` | **UNTOUCHED** — its multiplicity row already carries the reconciled reading, and this pass's clauses carry nothing that row does not |
| 9 | `docs/specs/storeroom-js/backup/CF-DUP1-2026-10-11-manifest.md` (this file) | — | — | NEW | this pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |
| 10 | `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` · `backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` · `backup/GATE5-DOC-2026-10-11-manifest.md` | — | — | `0` | **UNTOUCHED** — earlier passes' own records are read, never amended |

**AND THE CLOSURE PREDICATE'S TWO FIGURES, PRINTED UNDER BOTH READINGS SO NEITHER IS ASSUMED:**
- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `7 − 1 =` `6`** — the operative, ENTRY-COUNTED reading; **this pass adds no row to the map and no part file
  at any path.**
- **THE RIGHT SIDE, UNDER THE OPERATIVE READING — THE MAP'S OWN PART ENTRIES — IS `6`: the `5` `carrier` parts
  (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) plus `implementation-plan`, with
  the `view` part `test-cases` counted in the map's entries and NOT in the index region's six-name
  parenthesis — so the predicate reads `6 = 6` ✓ AND IT HOLDS.**
- **THE RIGHT SIDE, UNDER THE RAW-FILE READING THE CLAUSE'S OWN WORDS NAME — *"{files present in
  `docs/specs/storeroom-js/`} − {contract.md}"* — IS `7`**, because `test-cases.md` is present as well — **so
  THE SAME PREDICATE READS `6 = 7` ON THAT COUNTING AND WOULD NOT HOLD.** **This pass MOVES NEITHER figure:
  it creates no ROOT-LEVEL file, and its own record sits in the `backup/` SUBDIRECTORY, held OUT of the
  count on the convention every earlier manifest of this directory uses.** **A reader who counts
  `backup/**` as root-level files of the clause's set reads a larger figure still and owes the
  directory-subtree question to the index region's own named repair.**
- **THE OPERATIVE READING IS THE PART-ENTRY COUNTING, `6 = 6`, AND THE RAW-FILE COUNTING'S `7` IS NOT A CLAIM
  OF THIS UNIT** — it is REPORTED here with its terms and dispositioned, exactly as the index region's own
  dated clause states it.

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `contract.md` | `1774` — *"· §0.4's `ListenerHandle` clause \| requirement]`)."* (the `§5.5` rules-and-strategies tag's foot; the pre-pass `S-WITHDRAW` re-derivation clause follows at the pre-pass line `1776`) | **`CF-DUP-1`** at `§5.5`'s `S-REG-DUP` row and at `§5.5`'s `S-REG` row; the red set's `§12.5` finding 3 | **the array's element multiplicity is the STORE's (`triggered.length === 2` for a lawful caller-spelled duplicate, carried ELEMENT FOR ELEMENT) while the INVOCATION COUNT is the PACKAGE's, ONE per DISTINCT identity; the row's failure list now fails a collapsed array, a size-only comparison and an invocation per element; `8` rows, no ninth** |
| 2 | `contract.md` | `1870` — *"· §5.8 · P-TP-8 — the store's own member-set rule \| requirement]`)."* (the `§5.8` tag's foot, which in the PRE-PASS numbering stands at `1870`; the insertion lands at post-pass `1941`) | **`CF-DUP-1`** at `§5.8`'s `S-SET` cell; the red set's `§12.5` finding 3 | **`S-SET`'s set equality is MEMBER BY MEMBER, never by size, and the array's LENGTH and the DISTINCT-IDENTITY count are carried beside each other as two figure classes; the failure list now fails a size-only comparison, an accepted collapsed array, an invocation per element and a collapse of the two classes into one number** |
| 3 | `surface.md` | `612` — *"`DD-40` \| state or fail-state declaration]`)."* (the `CF-3` clause's own tag's foot, immediately above the pre-pass `§2.6` heading at line `614`) | **`LIVE-OBS-2`** (`archive/gate6/storeroom-js-live-determination.md` `§3`/`§8` item 2) | **the `JSG-10.24` citation's OPERATIVE figure is `236` PASS of `236` (commit `9707ee9`; the gate-6 re-measurement at the pinned artefact), and the `233`-of-`236` reading stands as the gate-5 tree's own HISTORICAL record** |
| 4 | `parameter-semantics.md` | `591` — *"`declared parameter semantics]`)."* (the `§2.13` · `PAR-JS-13` row's authority tag's foot at lines `590`–`591`, whose own text cites the store's `PAR-13`; the pre-pass `§2.14` heading follows at line `593`) | the residual the previous pass named at `backup/GATE5-DOC-2026-10-11-manifest.md` `§6` | **the stale *"unique PER STORE INSTANCE and PER SESSION"* spelling this row's authority tag reaches is read through the store's OWN dated `§0.4` clause 2 — a store-minted handle is UNIQUE PER PROCESS — and the store's as-filed cell is named, never patched from this directory** |
| 5 | `parameter-semantics.md` | `689` — *"\| declared parameter semantics]`)."* (the foot of the `A77`-pass dated clause under the `§2.15` row; the pre-pass `§2.16` heading follows at line `691`, and the insertion lands at post-pass `691`–`743`) | the residual the previous pass named at `§5` item 3 of the same manifest | **`PAR-JS-15`'s `unit` is the INVOCATION COUNT (one per DISTINCT identity) and NOT the array's size; its `domain`'s *"one per distinct handle"* is the DISTINCT-IDENTITY count and never an array deduplication; and its outside-value *"a duplicated member"* reads as the member a BOUNDARY-SIDE COLLAPSE would introduce, which this row does not declare** |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and AFTER it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**
**AND NO EDIT WAS TAKEN AT ANY SITE THIS PASS DECIDED AGAINST:** `crossing.md`, `package.md`,
`acceptance.md`, `implementation-plan.md` and `test-cases.md` were NOT touched; **no new part file, no `DD`
row, no `PAR-JS` row, no `HO-` row, no register row and no failure-code member was created.**

## 3. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff docs/specs/storeroom-js/`** shows, for each of the three touched files, **only ADDED lines and
   no removed or modified line**; every pre-pass byte appears as unchanged context.
2. **The counts of `§1` are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertions' own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor
   and of every as-filed sentence it quotes, which are quoted in the insertions rather than edited in place.
4. **ONE MISHAP IS DISCLOSED BECAUSE IT OCCURRED, AND ITS BYTES ARE RECOVERED RATHER THAN SMOOTHED:** the
   `surface.md` insertion's FIRST attempt anchored on the `§2.6` heading and placed the new clause ABOVE that
   heading, so the heading came to stand twice in the file (once restored, once pre-pass). **THE VERY NEXT
   EDIT RE-EMITTED THE MATCHED TEXT AND REMOVED THE DUPLICATED HEADING LINE — and the duplicated line was ONE
   of this pass's OWN ADDED BYTES, not a pre-pass byte.** **NET EFFECT: every pre-pass byte of `surface.md`
   stands exactly once, `git diff` prints the heading as UNCHANGED CONTEXT and the clause as ADDED LINES, and
   the post-pass count `756` carries the clause's own `30` lines and no duplicate.** **The heading's own line
   was verified present exactly once after the correction (`### §2.6 The constraint/repair pattern — a usage
   pattern over declared verbs, never a seam`, one occurrence).**
5. **ONE LIMIT, DECLARED RATHER THAN SMOOTHED:** this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
   the pass itself; it is not an independent measurement, and this pass holds no execution verb — **no `git`
   command, no `cargo` command and no `node` command was run by it.**

## 4. The citation re-spellings and the id/date re-spellings — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every re-spelling *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation, id or figure | The as-filed form | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | the blind set's pass figure inside the `CF-3` clause, in `surface.md` | `233` PASS of `236` | **`236` PASS of `236`** (commit `9707ee9`, `2026-10-09 23:39:01`) | **CHECKED** — `archive/gate6/storeroom-js-live-determination.md` `§2.3` prints `AUTHORED 236 · EXECUTED 236 · PASS 236 · FAIL 0`, `JSG-04 67` |
| 2 | the gate-5 figure, wherever this pass's added bytes quote it | — | `233` PASS · `3` FAIL, named as the gate-5 tree's own record and read as HISTORICAL | **CHECKED** — `docs/specs/storeroom-js-greens.md` `§4`, quoted and not withdrawn |
| 3 | the gate-6 observations this pass cites | — | `LIVE-F1` · `LIVE-OBS-2` and `§8` item 2 · `§2.3` · `§3` of the gate-6 record | **CHECKED** — all resolve at `archive/gate6/storeroom-js-live-determination.md` |
| 4 | the red set's findings this pass cites | — | `archive/gate3/storeroom-js-red-set.md` `§12.1`–`§12.2` and `§12.5` findings 1–3 | **CHECKED** — `§12.5` finding 3 assigns exactly this amendment to this role |
| 5 | the store-side clauses the multiplicity rests on | — | `docs/specs/storeroom-native/contract.md §0.2` · `DD-42` clause 3 and `DD-39`; that contract's `§0.4` clause 2 (b) and its dated clause; `write-and-read.md §6.5` item 12 (b) | **CHECKED** — all four resolve, and none is re-declared in this directory |
| 6 | the two other homes of the reconciled reading | — | `docs/specs/storeroom-js/surface.md §2.4`'s dated clause of 2026-10-11 and `docs/specs/storeroom-js/contract.md §2.4`'s dated clause of the same date | **CHECKED** — both stand byte-for-byte; this pass neither re-spells nor re-emits them |
| 7 | the previous pass's named repairs | — | `docs/specs/storeroom-js/backup/GATE5-DOC-2026-10-11-manifest.md` `§5` item 3 (the `PAR-JS-15` cells) and its `§6` (the store's as-filed `PAR-13` cell) | **CHECKED** — both are the rows this pass takes, and its `§5` item 1 and `§5` item 4 are named below as the cells this pass's fixes move |
| 8 | the store's own `PAR-13` cell, whose `§`-number this pass names | — | `docs/specs/storeroom-native/parameter-semantics.md` `§2.13` · `PAR-13` | **CHECKED** — the row exists at that path and that `§`, and NO byte of it is written from this directory |

## 5. THE RED-SET CELLS AND BLIND-GREEN ASSERTIONS THIS PASS'S FIXES MAKE FALSE — each named with its `§`

**NAMED, NOT EDITED: the TestWriter is re-deriving `NG-JS-G`'s figures in parallel and no byte of
`bindings/js/**`, of `archive/**` or of any tracker is written by this pass.**

| # | The cell or assertion | Its `§` | Verdict |
| --- | --- | --- | --- |
| 1 | **THE THREE INLINE READINGS OF THE REFUTED ARRAY FIGURE IN `register.test.mjs`** — `S-REG`'s duplicate arm (*"the store's own lawful duplicate (`triggered` carries it once)"*), the `S-REG-DUP` row's own comment (*"`triggered` carries it ONCE where the store minted it"*) and `S-SET`'s duplicate arm | `bindings/js/test/register.test.mjs` lines `313` · `364`–`373` · `563`–`567`, cited at `archive/gate3/storeroom-js-red-set.md` `§12.5` finding 3 and `§9.5`/`§10.7` | **MADE FALSE BY THIS PASS, AND IT IS THE DECLARED POINT OF THE AMENDMENT: those three lines print the COLLAPSED array figure (`triggered.length === 1`) for the state the register now declares CARRIED TWICE, so they read `BROKEN` against a correct build. THE ROWS THEY DRIVE ARE `P-SM-5`'s `S-REG`/`S-REG-DUP` and `P-TP-8`'s `S-SET`, and each owes ONE re-derivation — assert the array's LENGTH (`2`) and the DISTINCT-identity count (`1`) TOGETHER, or assert the invocation count alone. THE OWNER IS `role_test_writer`, the re-derivation is already under way in parallel, and the cell's NAME and wording are NOT false: *"fires once for the distinct handle"* is the INVOCATION rule, which survives.** |
| 2 | **`NG-JS-G`'s OWN FIGURES** — the id-identity arm's duplicate sub-case, whose printed expectation is the register's collapsed array figure | `archive/gate3/storeroom-js-red-set.md` `§9`/`§10` · `NG-JS-G` (the register row it drives: `contract.md §5.5`'s `S-REG-DUP`) | **RE-DERIVED IN PARALLEL BY THE TEST AUTHOR, AND NOT BY THIS PASS — named here so its two readings are not left standing silently: the red set's `§12.2` group (1) already drives `triggered.length === 2` with the distinct-identity count `1`, which AGREES with this pass's rows; the cell's older figure does not.** |
| 3 | the red-set register tables' `P-SM-5` and `P-TP-8` verdicts (`S-REG-DUP 10` · `S-SET 10`, both `HELD`) | `archive/gate3/storeroom-js-red-set.md` `§8.2` · `§10.3` · `§10.7` · `§11` · `§12.4` | **NOT MADE FALSE AS ASSERTIONS — the drives were green against the BUILD, and the build has not moved. WHAT MOVES IS THE VERDICT'S REACH: with the register's figure now the DECLARED `2`, those two lines are `BROKEN` against a build faithful to the corrected contract and `UN-RUN`-equivalent against the shipped one. The `HELD` verdicts are the red-set author's to re-issue; this pass names them and edits none.** |
| 4 | the blind set's `JSG-08.21` (the registry fires ONCE) and `JSG-08.22` (the `triggered` set's DISTINCT member count is ONE) | `docs/specs/storeroom-js-greens.md` `§2` · `JSG-08`, lines `420`–`421`; the gate-5 run record `§1` | **NOT MADE FALSE: `JSG-08.21` asserts the INVOCATION COUNT and `JSG-08.22` asserts a DISTINCT-IDENTITY count — neither asserts the ARRAY's length, which is the one figure the reconciled rule moves. THE SET IS UNMOVED, the gate-6 re-measurement still reads `236/236`, and no assertion of it is touched.** |
| 5 | the blind set's `JSG-10.24` | `docs/specs/storeroom-js-greens.md` `§2` · `JSG-10` | **NOT MADE FALSE — it is the cell whose DOC-SIDE citation this pass corrects: the blind driver's own figure (`236/236`) and the cell's assertions are unmoved, and only the `surface.md` clause's citation of that figure is re-spelled.** |
| 6 | the register's `8` rows and every failure list — `P-SM-5`'s *"a duplicate token that fires twice per distinct handle"*, `P-TP-8`'s *"a duplicate member where the store minted the token"*, `P-SM-6`'s `S-COUNT` (`2` in ⇒ `2` in the home) | `docs/specs/storeroom-js/contract.md` `§5.1`–`§5.8` | **NOT MOVED AND NOT MADE FALSE: no row is added, dropped, renumbered or re-worded (`8 ≤ 8` ✓); the two lines above stay false of every state the corrected clauses declare LAWFUL; and the three amended cells remain FAILABLE from either side — change the ARRAY's multiplicity and the collapsed-array entry fails, change the INVOCATION's and the as-filed entry fails.** |
| 7 | `test-cases.md`'s multiplicity row and its censuses (`71` · `4` · `4` · `5` · `3`, `84` and `87` pointers) | `docs/specs/storeroom-js/test-cases.md`, the fifth pointer set and its count clause | **NOT TOUCHED, NOT MOVED AND NOT MADE FALSE — the row already carries the reconciled reading (*"a drive may assert the array's LENGTH (`2`) and its DISTINCT-identity count (`1`) TOGETHER"*), which is exactly what this pass's register cells now declare; no pointer is added and no count changes.** |
| 8 | the closure predicate's left and right sides | `contract.md`, the index region's closure bullet and its dated clause | **NOT MOVED UNDER THE OPERATIVE, ENTRY-COUNTED READING (`6 = 6` ✓); the raw-file reading's figure is unchanged at `7` because this pass's own record sits in the `backup/` SUBDIRECTORY. Both figures are printed at `§1` above.** |
| 9 | the store's measured green (`377/377`), the JS-side test figures and the Rust leg's `223` | `contract.md` `§7.1`–`§7.3`; `archive/gate3/storeroom-js-red-set.md` `§9.5`/`§10.7` | **NOT TOUCHED AND NOT RE-MEASURED — this pass claims no figure of its own and runs nothing; the `236`/`236` and `233`/`3` figures it prints are QUOTED from the records that carry them, each named.** |

## 6. What this pass did NOT write, and the two residuals it closes rather than takes

**NO `bindings/js/**` byte, no `src/**` byte, no `tests/**` byte, no byte under `../Provident-Electron/**`, no
tracker row, no `DD` row, no `PAR-JS` row, no register row, no `HO-` row, no failure-code member, and no part
file at a path the map or the omissions table does not already carry.** **The register stands at its `8` rows
with the cap holding (`8 ≤ 8` ✓); the `derivation:` clause stays SINGLE in every document that carries one
(this pass's four insertions carry authority tags and no `derivation:` clause); no question is put to the
architect; and no clause is re-decided beyond what the findings named at `§2` require.**

**AND THE TWO RESIDUALS THE PREVIOUS PASS NAMED ARE CLOSED HERE RATHER THAN RE-NAMED: `PAR-JS-15`'s `unit`,
`domain` and outside-value cells are read as a COUNT and never as an array deduplication, at their own row
(`parameter-semantics.md §2.15`'s dated clause); and the store's as-filed *"PER INSTANCE AND PER SESSION"*
`PAR-13` cell is read through the store's own dated `§0.4` clause 2 at the row of THIS directory that cites it
(`parameter-semantics.md §2.13`'s dated clause), with no byte of `docs/specs/storeroom-native/**` written.**
**BOTH ARE LAW-DATED CLAUSES OF THIS DIRECTORY, ANNOTATE-BESIDE, WITH THEIR REVERSAL POINT A BOUNDED AMENDMENT
OF `docs/specs/storeroom-js/` AND NEVER A PARK** (`A66`). **NO PARK IS NAMED AS ANY INSTRUMENT OF THIS PASS.**

**AND THE ONE THING THIS PASS'S AMENDMENTS OWE FORWARD, STATED SO IT IS NOT DISCOVERED: the boundary's own
collapse (`bindings/js/index.mjs`'s `wrapHandles`) and the delivery-time dedup beside it
(`deliver`) remain the SHIPPED reading — the priced alternative the `surface.md §2.4` dated clause names — and
`archive/gate3/storeroom-js-red-set.md §12.5` findings 1 and 2 hand that reconciliation to `role_implementer`.
THIS PASS DECLARES THE READING AND TAKES NO FINDING AGAINST THE BUILD.**
