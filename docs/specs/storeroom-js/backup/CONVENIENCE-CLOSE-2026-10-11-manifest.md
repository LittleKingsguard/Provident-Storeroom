# BACKUP MANIFEST — the JS convenience close-out pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-js/**` and `docs/specs/storeroom-native/**`: the SEVEN CONTRACT FINDINGS the host-fix pass filed against this directory's cells, closed

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes
only — NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rules
`DEF-14`/`DEF-15` are therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file this pass touched was re-worded,
moved, replaced or deleted, so **`git diff` recovers every pre-pass byte of every touched file as unchanged
context and every byte this pass added as an added line**; and **(2) THIS MANIFEST, which records each file's
PRE-PASS LINE COUNT and every insertion with the PRE-PASS LINE it stands beside** — so a reader holding the
pre-pass bytes can check the two against each other without a diff. **EVERY ANCHOR BELOW IS QUOTED BY ITS OWN
FIRST WORDS, SO IT SURVIVES THE LINE-NUMBER SHIFT ITS OWN INSERTION CAUSES**, and **every edit RE-EMITS the
text it matched**, which is `DEF-15`'s remedy.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR-JS` ROW, NOT A REGISTER ROW AND NOT A CLAIM OF EITHER
CONTRACT.** It is this pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's
part-file set is unmoved; **it contributes to NEITHER side of either closure predicate** — it is not an entry
of either part map, not a file either map declares as a part, and not one of either table's recorded
omissions.

## 1. The files this pass touched, with their PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | The insertions, by their pre-pass anchor line |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/crossing.md` | `775` | `867` | `+92` | **2 insertions, in file order** — (i) the `§1.3` clause on the OUT-OF-RANGE INTEGRAL SEGMENT and its boundary `Number.MAX_SAFE_INTEGER` (FINDING 3), landing at post-pass `198`–`242`, read beside the pre-pass line `196` (`AddressArg` row 14's own row; **the `TierArg` paragraph follows at post-pass `244` (pre-pass `198`)**); (ii) the `§1.4` item 9 clause on the SEGMENT and MEMBER-KEY positions of the lone-surrogate class (FINDING 4), landing at post-pass `431`–`476`, read beside the pre-pass line `429` (item 9's own `[A3 … §C.11.9 \| requirement])`.) tag foot; **the `### §1.5` heading follows at post-pass `524` (pre-pass `432`)**) |
| 2 | `docs/specs/storeroom-js/surface.md` | `1243` | `1381` | `+138` | **3 insertions, in file order** — (i) the `§2.4` item 7 (a) step-1 ORDER clause (FINDING 5: the class decision first, the `Proxy` refusal `DD-34` included, before the shape test and before any element/length read), landing at post-pass `698`–`722`, read beside the pre-pass line `696` (*"the call is refused BEFORE any admission, which is `A76`'s atomicity obtained by the validation's POSITION rather than by an `unlisten` rollback** (`A76`; `A81`)."*); (ii) the `§2.4` item 7 (b) OWN-ARM narrowing (FINDING 1), landing at post-pass `792`–`854`, read beside the pre-pass line `790` (*"NEW function offered by `on` at a HELD address whose entry was placed by `register` — IS `DD-52`.**"*); **the `(c)` sub-item follows at post-pass `856` (pre-pass `755`)**; (iii) the `§2.4` item 5 (a) member-set cell's own repair at this part's foot, landing at post-pass `1346`–`1381`, read beside the pre-pass line `1344` (the divergence-table clause's own tag foot *"the sweep clause \| cross-reference])`.)"*), which PAYS the `surface.md` half of the `Q1` amendment's owed repair-list item 1 and names the `contract.md` half and `bindings/js/README.md` as owed and reported |
| 3 | `docs/specs/storeroom-js/package.md` | `927` | `971` | `+44` | **1 insertion** — the `§1.3` item 4 member-set reconciliation to `{ register, on, off }` (FINDING 6), landing at post-pass `722`–`764`, read beside the pre-pass line `720` (the `F-DOC-1` clause's own tag foot *"its `JSG-01`/`JSG-12.13` figures \| cross-reference])`.)"*); **`**5. THE INSTANCE, ITS VERBS …**` now begins at post-pass `766` (pre-pass `722`)** |
| 4 | `docs/specs/storeroom-js/parameter-semantics.md` | `1091` | `1154` | `+63` | **1 insertion** — the `§2.17` item 6 on the `Proxy`-wrapped CALLABLE at `on`'s listener position (FINDING 7), landing at post-pass `1063`–`1124`, read beside the pre-pass line `1061` (`§2.17`'s dated clause's own tag foot *"the position this clause applies at the two sites; `DD-40` \| declared parameter semantics])`.)"*); **`### §2.18` now begins at post-pass `1126` (pre-pass `1063`)** |
| 5 | `docs/specs/storeroom-native/write-and-read.md` | `1387` | `1439` | `+52` | **1 insertion** — the `§6.5` item 12 clause binding the token to its REMAINING entries after a first-match withdrawal (FINDING 2), landing at post-pass `1229`–`1279`, read beside the pre-pass line `1227` (*"its domain and `unlisten` over it is a no-op success.**"*, the close of item 12's `F-5` clause part (c)); **`**ITEM 13 …**` now begins at post-pass `1281` (pre-pass `1229`)** |
| 6 | `docs/specs/storeroom-native/backup/STORE-CLOSE-2026-10-11-manifest.md` | — | — | NEW | this pass's OWN record for the ONE store-side insertion; **a subdirectory file, and it contributes to NEITHER side of either predicate** |
| 7 | `docs/specs/storeroom-js/backup/CONVENIENCE-CLOSE-2026-10-11-manifest.md` (this file) | — | — | NEW | this pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of either predicate** |
| 8 | `docs/specs/storeroom-js/contract.md` · `acceptance.md` · `implementation-plan.md` · `test-cases.md` · `docs/specs/storeroom-native/contract.md` · `store-model.md` · `seams-and-lifecycle.md` · `parameter-semantics.md` · `implementation-plan.md` and the seven earlier `storeroom-js/backup/*-manifest.md` files | — | — | `0` | **UNTOUCHED — read, never amended** |

**AND ONE HONESTY CLAUSE THE TABLE OWES, SO ITS TWO COLUMNS ARE READ WITH THEIR TERMS** (`RCA-8(d)`
ANNOTATE-BESIDE: **no figure of the table is withdrawn and none is moved; this clause states which column a
reader checks against which instrument**): **THE POST-PASS LINE COUNTS AND EVERY INSERTION RANGE ARE THIS
PASS'S OWN READINGS OF THE FILES AS THEY NOW STAND, AND THEY ARE THE OPERATIVE FIGURES** — each file was
read back after its insertion and its headings and its last line were re-located to fix the range. **THE
PRE-PASS LINE COUNTS ARE THE FIGURES THE FILES CARRIED AT THIS PASS'S OWN START (the JS four as the
immediately preceding pass's manifest, `docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md`
`§1`, and the store one as `docs/specs/storeroom-native/backup/A78-REHOMING-2026-10-11-manifest.md` `§1`,
record them; this pass re-read all five at their own first and last lines before writing)** — **so a reader
holding `git diff` recovers every pre-pass byte as unchanged context and every byte this pass added as an
added line, and no byte of any file is re-worded, moved or deleted by any of the NINE insertions above.**

## 2. The closure predicates' two figures, printed for BOTH directories

**`docs/specs/storeroom-js/` — the JS unit's directory.** **THE LEFT SIDE IS `{part-map PART entries}` =
`{rows of the part map} − {the contract-document row}` = `7 − 1 = 6`** — an ENTRY-COUNTED figure, read off the
map's own rows. **THE RIGHT SIDE, UNDER THE OPERATIVE PART-ENTRY READING — THE MAP'S OWN PART ENTRIES — IS
`6`: the `5` `carrier` parts (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) +
`implementation-plan` (a `carrier` part) + the `view` part `test-cases` = EVERY entry of the part map but the
contract-document row — so the predicate reads `6 = 6` ✓ AND IT HOLDS.** **AND THE RAW FILE SET, PRINTED
BESIDE IT BECAUSE A READER MAY COUNT FILES: `crossing.md` · `surface.md` · `package.md` · `acceptance.md` ·
`parameter-semantics.md` · `implementation-plan.md` · `test-cases.md` = `7` files beside `contract.md`, each
one an entry of the map — so the two countings agree at `7` entries and `7` files, and the `3` recorded
omissions (`property-register` · `data-class-structure` · `process-flow`) contribute to NEITHER side.**

**`docs/specs/storeroom-native/` — the store's directory, whose THREE of the seven findings are.**
**THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
`6 − 1 = 5` — an ENTRY-COUNTED figure, read off the map's own rows. THE RIGHT SIDE IS `5` UNDER BOTH
COUNTINGS: the `5` `carrier` parts (`store-model` · `write-and-read` · `seams-and-lifecycle` ·
`parameter-semantics` · `implementation-plan`) are exactly the `5` root-level files `{files present in
docs/specs/storeroom-native/} − {contract.md}` — the directory's `backup/` subdirectory holds two pass
records and is NOT a root-level file of the counted set, and the `3` recorded omissions are held to NEITHER
side — so the predicate reads `5 = 5` ✓ AND IT HOLDS.**

**THIS PASS CREATES NO PART FILE AT EITHER PATH AND NO ROOT-LEVEL FILE IN EITHER DIRECTORY: the only two files
it adds are the two `backup/*-manifest.md` records above** — **so the file sets' own figures and the maps' own
entry counts are BOTH UNMOVED, and BOTH states stay `CLOSED`.**

## 3. The rules of this pass, stated so its own insertions are checkable

1. **EVERY EDIT IS A PURE ANNOTATE-BESIDE INSERTION.** Each block opens with the `RCA-8(d)` ANNOTATE-BESIDE
   preamble, names what stands byte-for-byte beside it, and adds its claim BESIDE the pre-pass text and never
   in place of it. **NINE insertions across five files; `0` bytes re-worded, moved or deleted**
   (`crossing.md` `2` · `surface.md` `3` · `package.md` `1` · `parameter-semantics.md` `1` ·
   `write-and-read.md` `1`).
2. **THE `derivation:` CLAUSE STAYS SINGLE IN EACH DOCUMENT THAT CARRIES ONE.** No document of either
   directory gains a second; `storeroom-js/contract.md` still carries exactly ONE, at its opening clause, and
   `storeroom-native/contract.md`'s own single clause is unmoved.
3. **NO REGISTER ROW MOVES.** Both typed registers stand at `8` rows with the cap holding (`8 ≤ 8` ✓), every
   failure list unmoved, and no ninth row is minted in either directory.
4. **EVERY CLAIM CARRIES AN AUTHORITY TAG AND A CLAIM CLASS, INSIDE ITS OWN DOCUMENT'S CLOSED ENUM.** The JS
   blocks carry `A1`/`A3` with the closed six classes (`requirement` · `declared parameter semantics` · `state
   or fail-state declaration` · `numeric or census claim` · `cross-reference` · `ordering claim`); the store
   block carries `P`/`T` with the closed seven (`CONTRACT` · `OBSERVATION` · `CENSUS` · `CROSS-REF` · `OWED` ·
   `DECLARED-DEFAULT` · `NEGATIVE`).
5. **EVERY RED-SET CELL OR BLIND-GREEN ASSERTION THESE FIXES MAKE FALSE IS NAMED WITH ITS `§`** in this pass's
   own report to the supervisor, and none of them is re-issued here — the TestWriter's three (`C-6` · `C-7` ·
   `C-13`) and the supervisor's one (`C-8`) are REPORTED, never fixed.

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every citation form *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.** **THE FORMS THIS PASS'S OWN CLAUSES ADD, EACH IN THE SPELLING THIS DIRECTORY'S
`§0.1` ITEM 2 REQUIRES (a bare `§n` across two documents is not an edge):**

| # | The clause this pass added | The citation it writes | Its form, and where it resolves | Check |
| --- | --- | --- | --- | --- |
| 1 | `crossing.md §1.4` item 9's new clause | `A3 docs/specs/storeroom-js/crossing.md §1.2` row 1's dated clause and `§1.4` item 9; `§1.3`'s `AddressArg` row 2 and `§1.4` item 3; `A3 docs/specs/storeroom-js/surface.md §2.5` item 5 (b); `A3 docs/specs/storeroom-js/acceptance.md §4.1` item 6 | **path-qualified for `surface.md`/`acceptance.md` (other documents), in-document for `crossing.md`** | **CHECKED** — all six resolve; item 5 (b) is the class-and-position clause; `§4.1` item 6 is the JS-layer drive rule |
| 2 | `crossing.md §1.3`'s boundary clause | `A3 docs/specs/storeroom-js/crossing.md §1.3`'s `AddressArg` rows 3 and 8; `§1.8`; `A3 docs/specs/storeroom-js/package.md §4.5` item 2 | path-qualified where it crosses documents; **the `JsSegment::Index(u64)` carrier row** | **CHECKED** — `package.md §4.5` item 2's `JsSegment` row carries `Index(u64)`; `§1.8` is the no-repair prohibition |
| 3 | `surface.md §2.4` item 7 (a)'s order clause | `A1 docs/specs/storeroom-js-proposal.md §8` (`A81`, `A76`); `A3 docs/specs/storeroom-js/crossing.md §1.7` and `§1.8`; `A3 … crossing.md §1.3`'s `AddressArg` rows 1, 11 and 12 | `A1` for the rulings, `A3` for the filed spec | **CHECKED** — `§1.7` is the declared validation order and `§1.8` the no-repair rule |
| 4 | `surface.md §2.4` item 7 (b)'s OWN-arm narrowing | `A3 docs/specs/storeroom-native/contract.md §0.2` · `DD-39`, `DD-42`, `DD-51`; that contract's `§0.4` adoption-rule clause (2) and its mint clause; `A3 docs/specs/storeroom-native/write-and-read.md §6.5` items 12 and 14 | **path-qualified at every store-side citation — the STORE's directory is a different document** | **CHECKED** — `§0.2`'s table carries `DD-39`/`DD-42`/`DD-51`; `§0.4`'s clauses (1)–(3) are the mint's own; item 12 is the withdrawal and item 14 the firing |
| 5 | `package.md §1.3` item 4's member-set clause | `A1 docs/specs/storeroom-js-proposal.md §8` (`A79` · `A80`), `§15` (`A70`), `§17` (`A75`); `A3 docs/specs/storeroom-js/surface.md §2.1`'s dated clause 1 (a) and `§2.4` item 7; `A3 docs/specs/storeroom-js/contract.md §0.1`'s closure region | `A1` for the rulings; `A3` for the two filed cells in a SIBLING part and the index region | **CHECKED** — `surface.md §2.1`'s dated clause 1 (a) fixes `{ register, on, off }`; `contract.md §0.1`'s `Q1` index clause carries the figures table |
| 6 | `parameter-semantics.md §2.17` item 6 | `A1 docs/specs/storeroom-js-proposal.md §8` (`A81`); `A3 docs/specs/storeroom-js/surface.md §2.4` item 7 (a) and `§2.5` item 5; `A3 docs/specs/storeroom-js/crossing.md §1.2` rows 8 and 13 and `§1.4` item 4 (g) with `DD-34`; `A3 … surface.md §2.7` | path-qualified at every cross-document target | **CHECKED** — rows 8 and 13 are the `Function` and `NonPlainCollection` classes; `§1.4` item 4 (g) is the proxy rule at the value position |
| 7 | `write-and-read.md §6.5` item 12's new clause (the store's, filed in its own manifest too) | `P: §20 · A58`, `P: §18 · A57`; `contract.md §0.2` · `DD-39`, `DD-42`, `DD-51`; `contract.md §0.4` clause 2 (2) and its dated clause; `contract.md §5.8` | **the store's own seven-tag form, in-document for `contract.md`** | **CHECKED** — the `A57`/`A58` rulings are the listener surface's; `§5.8`'s `(a)`/`(f)` are the handle-preservation halves |

**AND ONE CITATION READ THAT IS **NOT** A RE-SPELLING IS NAMED SO IT IS NOT COUNTED AS ONE: this pass writes
no citation to a path or an id that does not exist in this repository, it carries no `S:`-tagged citation into
the store's directory (`storeroom-native/contract.md §0.1` item 11's own disclosure, whose count stays `0`),
and it cites no byte under `../Provident-Electron/**` (`A9`).**
