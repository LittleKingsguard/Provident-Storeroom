# BACKUP MANIFEST — the bounded combined repair of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-js**` and its two sibling records, carrying the `CF-DUP-3` clause and correcting the three stale ledger citations

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes only —
NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rules
`DEF-14`/`DEF-15` are therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file this pass touched was re-worded,
moved, replaced or deleted, so **`git diff` recovers every pre-pass byte of every touched file as unchanged
context and every byte this pass added as an added line**; and **(2) THIS MANIFEST, which records each file's
PRE-PASS LINE COUNT and every insertion with the PRE-PASS LINE it stands beside** — so a reader holding the
pre-pass bytes can check the two against each other without a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR-JS` ROW, NOT A REGISTER ROW AND NOT A CLAIM OF THE
CONTRACT.** It is this pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's
part-file set is unmoved; **it contributes to NEITHER side of the closure predicate** — it is not an entry of
the part map, not a file the map declares as a part, and not one of the `3` recorded omissions. **It is also
NOT a root-level file of `docs/specs/` and adds no path to the set this directory's predicate counts.**

## 1. The files this pass touched, with their PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/surface.md` | `791` | `873` | `+82` | **1 insertion** — the `CF-DUP-3` clause at `§2.4`, landing at post-pass `392`–`472` and read beside the pre-pass line `390` (the `§2.4` dated clause's own tag foot); **`81` content lines + `1` blank separator line**; **no pre-pass byte re-worded, moved or deleted** |
| 2 | `docs/specs/storeroom-js/parameter-semantics.md` | `816` | `836` | `+20` | **1 insertion** — the `§2.12` pointer clause at post-pass `571`–`589`, read beside the pre-pass line `577` (the `§2.12` second dated clause's foot; the `§2.13` heading follows at `591`); **`19` content lines + `1` blank separator line**; **no pre-pass byte re-worded, moved or deleted** |
| 3 | `docs/specs/storeroom-js/test-cases.md` | `219` | `235` | `+16` | **1 insertion** — the row-71 ledger-correction clause at post-pass `111`–`125`, read beside the pre-pass line `110` (the inventory's honest note's foot); **`15` content lines + `1` blank separator line**; **no row of the `71` added, removed or renumbered, no pointer count moved** |
| 4 | `docs/specs/storeroom-js-proposal.md` | `463` | `482` | `+19` | **1 insertion** — the `§6` ledger-correction clause at post-pass `111`–`129`, read beside the pre-pass line `110` (`§6`'s ledger clause's foot); **`18` content lines + `1` blank separator line**; **no pre-pass byte re-worded, moved or deleted** |
| 5 | `docs/specs/storeroom-js-proposal-review.md` | `300` | `323` | `+23` | **1 insertion** — the `§5.1` · `§6` ledger-correction clause at post-pass `302`–`323`, read beside the pre-pass line `300` (the record's own last pre-pass line); **`22` content lines, the blank separator line among them (the block opens with the `---` rule that separates it from the gate-7 reconciliation above); no pre-pass byte re-worded, moved or deleted** |
| 6 | `docs/specs/storeroom-js/backup/CF-DUP3-LEDGER-2026-10-11-manifest.md` (this file) | — | — | NEW | this pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |
| 7 | `docs/specs/storeroom-js/contract.md` · `crossing.md` · `package.md` · `acceptance.md` · `implementation-plan.md` and the four earlier `backup/*-manifest.md` files | — | — | `0` | **UNTOUCHED — read, never amended** |

**AND THE CLOSURE PREDICATE'S TWO FIGURES, PRINTED UNDER BOTH READINGS SO NEITHER IS ASSUMED:**
- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `7 − 1 =` `6`** — the operative, ENTRY-COUNTED reading; **this pass adds no row to the map and no part file
  at any path.**
- **THE RIGHT SIDE, UNDER THE OPERATIVE READING — THE MAP'S OWN PART ENTRIES — IS `6`: the `5` `carrier`
  parts (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) plus
  `implementation-plan`, with the `view` part `test-cases` counted in the map's entries and NOT in the index
  region's six-name parenthesis — so the predicate reads `6 = 6` ✓ AND IT HOLDS.**
- **THE RIGHT SIDE, UNDER THE RAW-FILE READING THE CLAUSE'S OWN WORDS NAME — *"{files present in
  `docs/specs/storeroom-js/} − {contract.md}"* — IS `7`**, because `test-cases.md` is present as well — **so
  THE SAME PREDICATE READS `6 = 7` ON THAT COUNTING AND WOULD NOT HOLD.** **This pass MOVES NEITHER figure:
  it creates no ROOT-LEVEL file of this directory, and its own record sits in the `backup/` SUBDIRECTORY.**
- **THE OPERATIVE READING IS THE PART-ENTRY COUNTING, `6 = 6`, AND THE RAW-FILE COUNTING'S `7` IS NOT A CLAIM
  OF THIS UNIT** — it is REPORTED here with its terms, exactly as the index region's own dated clause states
  it. **The two files this pass edited OUTSIDE this directory (`docs/specs/storeroom-js-proposal.md` and
  `docs/specs/storeroom-js-proposal-review.md`) are siblings of `docs/specs/` and of the unit's own directory;
  neither is a file of the predicate's set and neither figure moves by them.**

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `surface.md` | `390` — *"and its `alt` included, and it is read THROUGH this clause; THIS clause is a PURE INSERTION, it re-spells no rule, adds no member to any record, mints no code and moves no register row."* (the foot of `§2.4`'s own dated clause; the pre-pass `### §2.5 The single failure form` heading follows at line `392`) | **`CF-DUP-3`** — the in-delivery registration corner, read at `docs/open-items-review.md` `§2-bis` and at `docs/pending.md`'s own `CF-DUP-3` clause; the red set's `§13.6` revisit condition (a) | **a delivery window's recipient set is read from the array AS IT STANDS WHEN THE WINDOW OPENS; a registration, a replacement or a withdrawal made DURING it takes effect at the NEXT trigger; the reading is DERIVED from the store's order-unobservability (`DD-22`), because the alternative would make an OBSERVABLE invocation depend on an UNOBSERVABLE element position; the finding is CLOSED by this clause; NO `deliver` change is owed and none is recommended** |
| 2 | `parameter-semantics.md` | `577` — *"`docs/specs/storeroom-js/surface.md §2.5` item 6 (g))"* (the foot of the `§2.12` row's second dated clause — the `A76` reconciliation; the pre-pass `### §2.13 … PAR-JS-13` heading follows at line `578`) | the second revisit condition `docs/pending.md`'s `CF-DUP-3` clause and the red set's `§13.6` name — *"`parameter-semantics.md §2.12`'s registration cell gains a clause about a registration arriving inside a delivery window"* | **the pointer, not a second home: this row's `declared answer` cell declares no window rule, this row is READ THROUGH `surface.md §2.4`'s `CF-DUP-3` clause, and the clause's argument is NOT restated here** |
| 3 | `test-cases.md` | `110` — *"and no row of it declares a requirement of its own."* (the foot of the inventory's own honest note; the pre-pass `⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS` clause follows at line `112`) | **open-items-review `§2` item 6** third cell — *"three cells still print the pre-close-out ledger figure"* — at THIS part's row `71` | **row `71`'s as-filed `1 DONE / 2 open` UNITS = `3` is the tracker's PRE-`N2`-CLOSE-OUT reading; the operative figure is `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓) and the close-out that moves it to `3 DONE / 0 open` UNITS = `3` is the `U-STOREROOM-JS` close-out of 2026-10-11 at commit `86b3a02`; the `71`-row census and every pointer count are UNMOVED — this insertion adds no row to any set** |
| 4 | `docs/specs/storeroom-js-proposal.md` | `110` — *"with the LAST dated clause of the head line as its operative statement (condition `C12` makes three-way agreement over the tracker's sections a gate-1 condition).**"* (the foot of `§6`'s ledger clause; the pre-pass `---` rule and `## §7. PROVENANCE` follow at lines `112`–`114`) | **open-items-review `§2` item 6** second cell — *"`storeroom-js-proposal.md` (its ledger clause)"* | **`§6`'s as-filed `1 DONE / 2 open` UNITS = `3` is the filing-time figure; the operative figure is `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓); the close-out that moves it is the `U-STOREROOM-JS` close-out of 2026-10-11 at commit `86b3a02`, and every *"THE LEDGER STANDS `1 DONE / 2 open` UNITS = `3`"* sentence this filing prints is read through it** |
| 5 | `docs/specs/storeroom-js-proposal-review.md` | `300` — *"`docs/specs/storeroom-js/implementation-plan.md` `§4.2`'s dated clause and at `docs/specs/storeroom-js/contract.md` `§7.2`'s.** **NO FIGURE IS RE-MEASURED BY THIS CLAUSE: this pass holds no execution verb** (`[T: this record's superseded heading, its ledger clauses and its operative figures, each with its own reading | CENSUS]`)."* (the record's LAST pre-pass line; this insertion stands at the file's tail) | **open-items-review `§2` item 6** third cell — *"`storeroom-js-proposal-review.md` (its `§5.1`/`§6` cells)"* | **`§5.1`'s `L-8` cell and `§6` item 2's *"NO LEDGER COUNT MOVES"* cell each print `1 DONE / 2 open` UNITS = `3`; the operative figure is `2 DONE / 1 open` UNITS = `3` and the close-out that moves it to `3 DONE / 0 open` UNITS = `3` is the `U-STOREROOM-JS` close-out of 2026-10-11 at commit `86b3a02`; the record's verdict, its conditions and its figures are UNMOVED** |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and AFTER it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**
**AND NO EDIT WAS TAKEN AT ANY SITE THIS PASS DECIDED AGAINST:** `contract.md`, `crossing.md`, `package.md`,
`acceptance.md`, `implementation-plan.md`, the four trackers and every byte of `bindings/js/**`, `src/**`,
`tests/**` and `../Provident-Electron/**` were NOT touched; **no new part file, no `DD` row, no `PAR-JS` row, no
`HO-` row, no register row, no failure-code member and no map row was created.**

## 3. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff`** over the five touched files shows, for each, **only ADDED lines and no removed or modified
   line**; every pre-pass byte appears as unchanged context.
2. **The counts of `§1` are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertion's own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor
   and of every as-filed sentence it quotes, which are quoted in the insertions rather than edited in place.
4. **ONE LIMIT, DECLARED RATHER THAN SMOOTHED:** this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
   the pass itself; it is not an independent measurement, and this pass holds no execution verb — **no `git`
   command, no `cargo` command and no `node` command was run by it.** **The commit id `86b3a02` is taken from
   the close-out record as this pass received it; this pass resolved no git object.**

## 4. The citation re-spellings and the id/date re-spellings — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every re-spelling *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation, id or figure | The as-filed form | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | the `CF-DUP-3` finding, named as the finding this pass closes | `docs/pending.md`'s `CF-DUP-3` clause, *"THE IN-DELIVERY REGISTRATION CORNER — STANDS `OPEN`"*, read with `archive/gate3/storeroom-js-red-set.md` `§13.6` | **`CF-DUP-3`, and it now stands PINNED AND CLOSED by `surface.md §2.4`'s `CF-DUP-3` clause** — the tracker row is the supervisor's to update and is NAMED in this pass's report as such | **CHECKED** — the clause's own words name the finding and its revisit condition (a)/(b), and it declares no ledger or tracker edit |
| 2 | the corner's two readings | red set `§13.6`'s *"READING A — THE DEDUP IS OVER THE ARRAY'S IDENTITY SET"* and *"READING B — THE DEDUP IS OVER THE OCCURRENCES ALREADY INVOKED"* | **READING A is declared the contract's reading, and READING B is REFUSED by the order-unobservability argument the clause carries** | **CHECKED** — the argument, its two limbs and the contradiction it names are printed in the clause; `§13.6`'s own revisit condition (a) is what the insertion satisfies |
| 3 | the order rule the argument rests on | `§2.7` item 3 *"no clause of this unit promises a registration order, an address order or a tier order"*; `DD-22` | **the SAME two cells, cited by the `CF-DUP-3` clause as the authority the argument rests on** | **CHECKED** — neither cell is re-worded and neither figure moves |
| 4 | the ledger figure, at all three stale cells | `1 DONE / 2 open` UNITS = `3` (test-cases row `71` · proposal `§6` · review `§5.1` `L-8` and `§6` item 2) | **the operative figure `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓), with the close-out move to `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓) named at commit `86b3a02`** | **CHECKED** — the three corrections cite the same two figures and the same close-out, and each points at `docs/next-steps.md`'s head line for the two readings the architect must choose between |
| 5 | the tracker head line's own two readings | — | **`docs/next-steps.md`'s head line is where the as-filed figure and the operative figure BOTH stand, and the amendment-as-a-unit question is the architect's one line** — this pass writes no tracker byte and names that row for the supervisor | **CHECKED** — `docs/next-steps.md`'s head line and `## OPEN`'s closing line, both read at their own bytes; no byte of them is written from this pass |
| 6 | the `CF-DUP-3` clause's authority tag | — | **`[A3 docs/specs/storeroom-js/surface.md §2.7` item 3 · `§2.4` rules 1–3 and item 6 (b) · `A3` docs/specs/storeroom-native/contract.md `§6.5` item 5 + `DD-22` · `A1` docs/specs/storeroom-js-proposal.md `§18` · `A77` · `A3` docs/specs/storeroom-js-proposal-review.md `§5.4` · `AR-12` | state or fail-state declaration]** | **CHECKED** — every one of the five resolves at the path and `§` printed, and none is a park (`A66`) |
| 7 | the `§2.12` pointer clause's authority tag | — | **`[A1` docs/specs/storeroom-js-proposal-review.md `§5.4` · `AR-12`; `A3` docs/specs/storeroom-js/parameter-semantics.md `§2.12` · `PAR-JS-12` | declared parameter semantics]** | **CHECKED** — the pointer names the home that owns the rule and declares nothing itself |
| 8 | the closure predicate's left and right sides | — | **NOT MOVED UNDER THE OPERATIVE, ENTRY-COUNTED READING (`6 = 6` ✓); the raw-file reading's figure is unchanged at `7` because this pass's own record sits in the `backup/` SUBDIRECTORY and its two outside-directory records are not files of the predicate's set. Both figures are printed at `§1` above.** | **CHECKED** — no root-level file of `docs/specs/storeroom-js/` was created by this pass |
| 9 | the register's row count and its cap | `8` rows, cap `≤ 8` | **`8` rows, cap holding (`8 ≤ 8` ✓) — this pass adds no row, renumbers none and re-words none** | **CHECKED** — the `CF-DUP-3` clause and the three ledger corrections carry authority tags and add no register row |
| 10 | the `derivation:` clause | single, in `contract.md`'s index region | **SINGLE and unmoved — no `derivation:` clause is authored, re-emitted or duplicated by this pass** | **CHECKED** — five insertions, `0` `derivation:` clauses among them |

## 5. THE RED-SET CELLS AND BLIND-GREEN ASSERTIONS THIS PASS'S FIXES MAKE FALSE — each named with its `§`

**NAMED, NOT EDITED: no byte of `bindings/js/**`, of `archive/**` or of any tracker is written by this pass.**

| # | The cell or assertion | Its `§` | Verdict |
| --- | --- | --- | --- |
| 1 | **`CF-DUP-3` itself, as the red set's `OPEN` row** — *"`CF-DUP-3` — THE IN-DELIVERY REGISTRATION CORNER IS UNPINNED AND IS RECORDED OPEN RATHER THAN DRIVEN"* | `archive/gate3/storeroom-js-red-set.md` `§13.6` and its `§13` row `1` | **MADE FALSE BY THIS PASS, AND IT IS THE DECLARED POINT OF THE REPAIR: the corner is no longer unpinned and is no longer `OPEN` — the contract now declares READING A, so the row's *"NOTHING DRIVEN, NOTHING OWED YET"* cell and its `§13.6` revisit condition (a)/(b) are satisfied. THE OWNER IS `role_test_writer` (a drive for the new clause) and the row's own verdict is the red set's author's to re-issue; the clause declares the reading so a drive EXISTS to be authored.** |
| 2 | **`docs/pending.md`'s `CF-DUP-3` clause** — *"STANDS `OPEN` … UNTIL THEN THE READING IS THE IMPLEMENTATION'S AND NOT THE CONTRACT'S"* | `docs/pending.md`, the clause at its tail | **MADE FALSE IN ITS OPERATIVE READING BY THIS PASS — the reading is now the CONTRACT's — and the row is NAMED FOR THE SUPERVISOR and NOT written here, because `docs/pending.md` is OUTSIDE this pass's edit scope. The tracker row owes a dated closing clause naming `surface.md §2.4`'s `CF-DUP-3` clause.** |
| 3 | **the three stale ledger cells** — test-cases row `71`, proposal `§6`'s ledger sentence, review `§5.1`'s `L-8` cell and `§6` item 2's *"NO LEDGER COUNT MOVES"* cell | `docs/specs/storeroom-js/test-cases.md` row `71` · `docs/specs/storeroom-js-proposal.md` `§6` · `docs/specs/storeroom-js-proposal-review.md` `§5.1` `L-8` and `§6` item 2 | **CORRECTED BY THIS PASS, NOT MADE FALSE: each cell's as-filed figure stands byte-for-byte and is READ THROUGH its own dated correction clause, so no reader meets the stale figure as the operative one. The census figures (`71`, `4`, `4`, `5`, `3`, `84`, `87`) are UNMOVED — no row and no pointer is added.** |
| 4 | **the register's `8` rows and every failure list** — including `P-SM-5`'s `S-REG`/`S-REG-DUP` and `P-TP-8`'s `S-SET` | `docs/specs/storeroom-js/contract.md` `§5.1`–`§5.8` | **NOT MADE FALSE AND NOT TOUCHED: the `CF-DUP-3` clause adds no rule the register must fail on — the register rows drive the id-match, the multiplicity and the invocation count, each of which the clause leaves exactly as printed — and the register stands at `8 ≤ 8` ✓. NO ROW OF `§5` IS RED AGAINST THE STATE THE CLAUSE DESCRIBES, because the clause declares the reading the shipped `deliver` already holds.** |
| 5 | **the blind set's `JSG-08` and `JSG-09` cells** (the registry's four rules; `register`'s arms) and **`JSG-01`/`JSG-12`** (the named-export set) | `docs/specs/storeroom-js-greens.md` `§2` · `JSG-08`, `JSG-09`, `JSG-01`, `JSG-12` | **NOT MADE FALSE AND NOT TOUCHED: no assertion of the set drives the mid-window corner, none asserts a recipient-set reading, and the `CF-DUP-3` clause adds no member, no verb, no parameter and no named export. The set's `236/236` figure is unmoved and is not re-measured here.** |
| 6 | **the JS registry/delivery cells** — `registry.test.mjs`'s `delivery_*` group and the Rust `surface_verbs.rs` `delivery_*` group | `bindings/js/test/registry.test.mjs` lines `419`–`459`; `bindings/js/tests/surface_verbs.rs` lines `594`–`644`, `822` | **NOT MADE FALSE: every one of those cells asserts the window's ORDER (`AFTER the verb has returned`), the record's COMPLETENESS before the window opens, the `unlisten` no-op arm, the address-only key and the throwing body — NONE asserts a recipient-set reading for a registration arriving inside the window, which is exactly the corner the contract did not pin. `delivery_the_record_is_complete_before_the_window_opens` (`registry.test.mjs` `422`; `surface_verbs.rs` `641`) is the NEAREST cell and is CONSISTENT with the new clause: it asserts the record is complete before the window opens, and the clause fixes the recipient set at that same moment.** |
| 7 | **the closure predicate's left and right sides** | `contract.md`, the index region's closure bullet and its dated clause | **NOT MOVED UNDER THE OPERATIVE, ENTRY-COUNTED READING (`6 = 6` ✓); the raw-file reading's figure is unchanged at `7`. Both figures are printed at `§1` above.** |
| 8 | **the store's measured green (`377/377`), the JS suite (`101/101`), the sibling crate (`223`) and the blind/live figures (`236/236`, `72/72`)** | `contract.md` `§7.1`–`§7.3`; the trackers' `N3` row | **NOT TOUCHED AND NOT RE-MEASURED — this pass claims no figure of its own and runs nothing; every figure it prints is QUOTED from the record that carries it, each named. The commit id `86b3a02` is QUOTED from the close-out record as received.** |

## 6. What this pass did NOT write

**NO `bindings/js/**` byte, no `src/**` byte, no `tests/**` byte, no byte under `../Provident-Electron/**`, no
tracker row (`docs/next-steps.md`, `docs/decisions.md`, `docs/pending.md`, `docs/defects.md`), no `DD` row, no
`PAR-JS` row, no register row, no `HO-` row, no failure-code member, and no part file at a path the map or the
omissions table does not already carry.** **The register stands at its `8` rows with the cap holding
(`8 ≤ 8` ✓); the `derivation:` clause stays SINGLE; no question is put to the architect; and no clause is
re-decided beyond what the two items of this repair name.** **NO PARK IS NAMED AS ANY INSTRUMENT OF THIS PASS,
and `CF-DUP-3` is closed as a CONTRACT reading and never as a park** (`A66`).
