# BACKUP MANIFEST — the gate-5 doc pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-js/`, closing the two DOC findings the blind run recorded (`F-DOC-1` and the `§2.4` rule 3 / `DD-42` tension) and reconciling the `§2.5` item 5 (b) cell with the `CF-3` clause

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes only
— NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rule
`DEF-14`/`DEF-15` is therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file under
`docs/specs/storeroom-js/**` was re-worded, moved, replaced or deleted, so **`git diff` recovers every
pre-pass byte of every touched file as unchanged context and every byte this pass added as an added line**;
and **(2) THIS MANIFEST, which records each file's PRE-PASS LINE COUNT and every insertion with the PRE-PASS
LINE it stands beside** — so a reader holding the pre-pass bytes can check the two against each other without
a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR-JS` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this
pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved;
**it contributes to NEITHER side of the closure predicate** — it is not an entry of the part map and it is not
a file the map declares as a part, and it is not one of the `3` recorded omissions.

## 1. The directory's files this pass touched, with their PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/package.md` | `874` | `927` | `+53` | **1 insertion** (`§1.3` item 4's dated clause: the `F-DOC-1` reconciliation, in `53` lines) |
| 2 | `docs/specs/storeroom-js/contract.md` | `2234` | `2307` | `+73` | **2 insertions** (`§2.4` rule 3's dated clause, `+30` lines — the twin of the `surface` part's; `§3.1`'s dated clause, `+43` lines — the twin of the `package` part's item-4 clause) |
| 3 | `docs/specs/storeroom-js/surface.md` | `601` | `726` | `+125` | **2 insertions** (`§2.4` rule 3's dated clause, `+74` lines; `§2.5` item 5 (b)'s dated clause, `+51` lines) |
| 4 | `docs/specs/storeroom-js/test-cases.md` | `197` | `219` | `+22` | **1 insertion** (a FIFTH pointer set of `3` unnumbered rows, read through no numbered row) |
| 5 | `docs/specs/storeroom-js/backup/GATE5-DOC-2026-10-11-manifest.md` (this file) | — | — | NEW | the pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |
| 6 | `docs/specs/storeroom-js/crossing.md` | — | — | `0` | **UNTOUCHED** |
| 7 | `docs/specs/storeroom-js/acceptance.md` | — | — | `0` | **UNTOUCHED** |
| 8 | `docs/specs/storeroom-js/parameter-semantics.md` | — | — | `0` | **UNTOUCHED** — and the cell this pass's second fix leaves standing is NAMED in `§5` below rather than smoothed |
| 9 | `docs/specs/storeroom-js/implementation-plan.md` | — | — | `0` | **UNTOUCHED** |
| 10 | `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` | — | — | `0` | **UNTOUCHED** — an earlier pass's own record is read, never amended |
| 11 | `docs/specs/storeroom-js/backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` | — | — | `0` | **UNTOUCHED** — idem |

**AND THE CLOSURE PREDICATE'S TWO FIGURES, PRINTED UNDER BOTH READINGS SO NEITHER IS ASSUMED:**
- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `7 − 1 =` `6`** — the operative, ENTRY-COUNTED reading; **this pass adds no row to the map and no part
  file at any path.**
- **THE RIGHT SIDE, UNDER THE OPERATIVE READING, IS `6` — so the predicate reads `6 = 6` ✓ AND IT HOLDS.**
- **THE RIGHT SIDE, UNDER THE RAW-FILE READING THE CLAUSE'S OWN WORDS NAME — *"{files present in
  `docs/specs/storeroom-js/`} − {contract.md}"* — IS `8`, and the as-filed `7` MOVES BY THIS PASS and by no
  earlier one: this pass CREATES one file, and it is the only new path.** **UNDER THAT READING THE PREDICATE
  READS `6 = 8` AND WOULD NOT HOLD.** **THE `8`'s TERMS: the `7` names the earlier counting —
  `test-cases.md` as the seventh root-level file — with every `backup/`-directory record held OUT of the
  count; on the same convention this pass's own manifest is held OUT TOO and the raw-file figure STANDS at
  `7`; a reader who counts THIS record as a root-level file of the clause's set counts `8` and owes the
  directory-subtree question to the index region's own named repair.** **THE OPERATIVE READING IS THE
  ENTRY-COUNTED ONE, and the raw-file reading's figure is REPORTED and NOT CLAIMED, exactly as the index
  region's own dated clause states it.**

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `package.md` | `667` — *"side's own spellings, read with `DD-40` \| requirement]`)."* (the `§4.5` item 4 tag's foot) | `F-DOC-1` (`archive/gate5/storeroom-js-greens-run.md` §4) | **the entry's named exports ARE the `8` of item 3's list — `storeCreate` among them — the four internal-only addon names are absent, and a NINTH entry name or a SIXTH addon name is a FINDING** |
| 2 | `contract.md` | `1024` — *"trigger"* \| requirement]`)"* (the `§2.4` rules 1–4 tag's foot) | the recorded tension (`greens-run` §4) | **rule 3's *"once"* governs the store-minted case; the caller-spelled duplicate's ARRAY multiplicity is the store's (`TWICE`); the INVOCATION is ONE per distinct identity** |
| 3 | `contract.md` | `1329` — *"reach, which is not a second realm and not a second entry \| requirement]`)."* (the `§3.1` internal-reach clause's tag) | `F-DOC-1`, second home | **the same split at the contract document's own home, so the two homes of the span agree** |
| 4 | `surface.md` | `316` — *"(f) through \| state or fail-state declaration]`)."* (the `§2.4` item 6 (f) clause's tag) | the recorded tension, second home | **the same reconciliation, stated ONCE and unambiguously, with the shipped boundary collapse named and its `alt` priced** |
| 5 | `surface.md` | `561` — *"`DD-1`; `DD-40` \| state or fail-state declaration]`)."* (the `CF-3` clause's tag) | the implementer's parallel finding on `§2.5` item 5 (b) | **SEGMENT ONE is the store's generator's string verbatim and SEGMENT TWO is the boundary's appended class-plus-position half; the `status` is neither; a package-authored Segment One is a FINDING** |
| 6 | `test-cases.md` | `197` — *"the contract does not pin, and no row of it declares a requirement of its own."* (the fourth pointer set's closing sentence) | the three cells this pass reconciles | **a FIFTH pointer set of `3` unnumbered rows, each pointing at a clause this pass authored and at no case the contract does not already pin** |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and after it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**
**AND NO EDIT WAS TAKEN AT ANY SITE THIS PASS DECIDED AGAINST:** `parameter-semantics.md` was NOT touched
(its row's cell is NAMED at `§5` below), `crossing.md` and `acceptance.md` were NOT touched, and **no new part
file, no `DD` row, no `PAR-JS` row and no register row was created — a range or a set a pass does not move is
a set it does not annotate.**

## 3. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff docs/specs/storeroom-js/`** shows, for each of the four touched files, **only ADDED lines and
   no removed or modified line**; every pre-pass byte appears as unchanged context.
2. **The counts of `§1` are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertion's own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor
   and of every as-filed sentence it quotes, which are quoted in the insertions rather than edited in place.
   **The only bytes this pass ever corrected were its OWN added bytes, inside the insertions themselves**
   (`2` corrections: one citation path re-spelled, one unmatched emphasis marker closed), and those
   corrections stand inside lines `git diff` prints as added.
4. **NO MISHAP IS DISCLOSED BECAUSE NONE OCCURRED, AND THAT IS SAID PLAINLY RATHER THAN LEFT TO A DIFF:** every
   `old_string` this pass matched was re-emitted verbatim in its `new_string`, at the same position and in the
   same order; and **`2` matches FAILED and were not applied** — the first took a three-line block that ran
   past its intended anchor, the second a block whose line breaks differed by one word — **so the retries
   anchored on a shorter, uniquely-resolving tail of the SAME clause. NEITHER failed match took a byte.**
5. **ONE LIMIT, DECLARED RATHER THAN SMOOTHED:** this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
   the pass itself; it is not an independent measurement, and this pass holds no execution verb — **no `git`
   command, no `cargo` command and no `node` command was run by it.**

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every re-spelling *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation | The as-filed form in this pass's first draft | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | the blind run's record, in `contract.md` `§3.1` | `archive/gate5/storeroom JS-greens-run.md` (a space where the hyphen belongs) | `archive/gate5/storeroom-js-greens-run.md` | **CHECKED** — the path resolves |
| 2 | the store's `DD-42` clause, read with the home's rule, in `surface.md` and `contract.md` `§2.4` | *"its clause (2) at that contract's `§0.4`"* (the clause number of the wrong item list) | *"its clause (2) at that contract's `§0.4`, the mint's-own-rule clause"* | **CHECKED** — `docs/specs/storeroom-native/contract.md` `§0.4`'s mint clause is the dated clause that carries `DD-42` clauses (1)–(3), and it resolves |
| 3 | the emphasis marker of the `JSG-10.24` sentence, in `surface.md` `§2.5` | a closing `**` was written as `)` | the `**` closed before the `)` | **CHECKED** — the sentence's own brackets pair |
| 4 | the two as-filed quotations this pass re-emits — `package.md` `§1.3` item 4's *"Every one of the five is INTERNAL …"* and `contract.md` `§3.1`'s *"NO ONE OF THE FIVE IS A NAMED EXPORT …"* | — | **NOT re-spelled: both are re-emitted in their own words, inside the insertions that quote them** | **CHECKED** — a quotation inside an insertion is lawful, and the pre-pass sentences stand unmoved where they were filed |
| 5 | the store-side rows this pass cites | — | `docs/specs/storeroom-native/contract.md §0.2` · `DD-39` and `DD-42`; that contract's `§0.4` clauses 1–2 with its mint clause; `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 | **CHECKED** — all four resolve, and none is re-declared in this directory |
| 6 | the findings' own homes | — | `archive/gate5/storeroom-js-greens-run.md` §4 (and its §2) · `docs/specs/storeroom-js-greens.md` §2 · `archive/gate4/storeroom-js-adversarial.md` §A · `JS-3` | **CHECKED** |

## 5. THE RED-SET CELLS AND BLIND-GREEN ASSERTIONS THIS PASS'S FIXES COULD HAVE MADE FALSE — each named with its `§`

| # | The cell or assertion | Its `§` | Verdict |
| --- | --- | --- | --- |
| 1 | `registry_the_lawful_duplicate_token_fires_once_for_the_distinct_handle` — *"one DISTINCT handle, not one per occurrence and not one per entry"*, asserting `record.triggered.length === 1` for two `listeners[]` entries carrying ONE token | `bindings/js/test/registry.test.mjs` (cited at `archive/gate3/storeroom-js-red-set.md` §8/§10), driving `P-SM-5`'s `S-REG-DUP` (`contract.md` §5.5) | **THE ONE CELL THIS PASS MAKES FALSE, AND IT IS NAMED WITH ITS REASON: the cell's assertion is an ARRAY-LENGTH figure (`1`) for CASE B of `surface.md` §2.4's dated clause, and that clause now declares the array's element multiplicity to be the STORE's — `TWICE` — so a build faithful to the corrected contract answers `2` and the drive fails. THE ROW'S OWN WORDING IS NOT FALSE: *"fires once for the distinct handle"* and *"not one per occurrence and not one per entry"* are the INVOCATION rule, which the dated clause keeps. The drive owes ONE re-derivation — assert the LENGTH (`2`) and the DISTINCT-identity count (`1`) together, or assert the invocation count alone — and that re-derivation belongs to the red set's author (`role_test_writer`), not to this pass.** |
| 2 | `test-cases.md`'s close-out pointer — *"none of the five is a named export of the claimed ESM entry, whose named exports are the `8` verbs and `NOTHING ELSE`"* | `docs/specs/storeroom-js/test-cases.md`, the close-out pass's table (unnumbered) | **MADE FALSE AS FILED, AND NAMED: the pointer prints the as-filed reading of `package.md` §1.3 item 4 that `F-DOC-1` refutes. It is not re-written by this pass — no numbered row and no earlier pointer row is amended — and it is READ THROUGH item 4's dated clause, which is the operative statement; the fifth pointer set this pass adds carries the corrected case beside it.** |
| 3 | `PAR-JS-15`'s cells — `unit`: *"`count` — a count of DISTINCT handles"*; `domain`: *"one per distinct handle the store returned"*; its OUTSIDE-value list's *"a duplicated member"* | `docs/specs/storeroom-js/parameter-semantics.md` §2.15 | **NOT READ THROUGH BY THIS PASS, AND NAMED RATHER THAN SMOOTHED: the row's *"one per distinct handle"* is TRUE of the COUNT the dated clause declares and would be FALSE read as a deduplication of the ARRAY; the row is UNTOUCHED here — this pass writes no byte of that file — and a dated clause at `§2.15` stating the same split, or the re-spelling of its `domain` cell, is the NAMED REPAIR OF A LATER BOUNDED AMENDMENT.** |
| 4 | the blind greens set's `JSG-08.21` (the registry fires ONCE) and `JSG-08.22` (the `triggered` set's DISTINCT member count is ONE) | `docs/specs/storeroom-js-greens.md` §2 · `JSG-08`; the run's record §1 | **NOT MADE FALSE — AND THE SET'S OWN NOTE IS NOW PARTLY SUPERSEDED, WHICH IS SAID PLAINLY: `JSG-08.21` asserts the INVOCATION COUNT (unmoved), and `JSG-08.22` asserts a DISTINCT-handle count, not an array length — so no assertion of the set is falsified. What the set's closing note records — *"does NOT assert the duplicate token's multiplicity in the array … because two documents print two counts"* — is RESOLVED by this pass's clause, and a later pass may drive the array's LENGTH (`2`) with that clause as its citation.** |
| 5 | the blind greens set's `JSG-12.13` derivation — *"the FIFTH, `storeCreate`, is the ENTRY'S OWN FACTORY and not the addon's internal step (an as-filed reading of `package.md §1.3` item 4 that would forbid that name is REFUTED by item 3's own list …)"* | `docs/specs/storeroom-js-greens.md` §2 · `JSG-12.13`; the run's record §2 | **NOT FALSE IN WHAT IT ASSERTS; FALSE IN ITS PREMISE, AND NAMED: item 4 no longer forbids that name, so *"refuted by item 3's own list"* — which named the BUILD in the right and the DOCUMENT in the wrong — now names the DOCUMENT as reconciled. The assertion itself (the four internal-only names absent, `storeCreate` the entry's own factory) HOLDS and is what this pass's clause declares.** |
| 6 | the blind greens set's `JSG-01`, `JSG-01.2`, `JSG-01.7`, `JSG-01.9`, `JSG-01.12` | `docs/specs/storeroom-js-greens.md` §2 · `JSG-01` | **NOT MADE FALSE — they are the measurement this pass's clause CITES (the `8` names, `{ register }`, the four internal-only names absent).** |
| 7 | the register's `8` rows and every failure list — `P-SM-5`'s *"a duplicate token that fires twice per distinct handle"*, `P-TP-8`'s *"a duplicate member where the store minted the token"*, `P-TP-7`'s `S-COUNT` (`2` in ⇒ `2` in the home) | `docs/specs/storeroom-js/contract.md` §5.1–§5.8 | **NOT MOVED AND NOT MADE FALSE: no row is added, dropped, renumbered or re-worded (`8 ≤ 8` ✓), and each of the three lines above stays FALSE of every state the corrected clauses declare LAWFUL.** |
| 8 | the closure predicate's left and right sides | `contract.md`, the index region's closure bullet and its dated clause | **NOT MOVED UNDER THE OPERATIVE, ENTRY-COUNTED READING (`6 = 6` ✓); the raw-file reading's figure MOVES from `7` to `8` if this pass's own manifest is counted as a root-level file, and both figures are printed at `§1` above.** |
| 9 | `contract.md` §7.2's restatement of the store green (`377/377` operative, `374` historical) and §7.3's `28`-row disposal | `contract.md` §7.1–§7.3 | **NOT TOUCHED AND NOT RE-MEASURED — this pass claims no figure of its own and runs nothing.** |

## 6. What this pass did NOT write, and the residual it names instead of taking

**NO `bindings/js/**` byte, no `src/**` byte, no `tests/**` byte, no byte under `../Provident-Electron/**`, no
tracker row, no `DD` row, no `PAR-JS` row, no register row, no `HO-` row, no failure-code member, and no part
file at a path the map or the omissions table does not already carry.** **The register stands at its `8` rows
with the cap holding (`8 ≤ 8` ✓), the `derivation:` clause stays SINGLE in every document that carries one
(the `2` `contract.md` insertions carry authority tags and no `derivation:` clause), and no clause of this
directory is re-decided beyond what the findings named at `§2` require.**

**AND ONE RESIDUAL IS NAMED AS ITS OWN `DECLARED-DEFAULT` RATHER THAN TAKEN AS A FINDING, WITH ITS REVERSAL
POINT: `parameter-semantics.md` §2.13's `PAR-13` `domain` cell still prints *"unique PER STORE INSTANCE and
PER SESSION"*, while `docs/specs/storeroom-native/contract.md` `§0.4` clause 2's dated clause and this
directory's own `parameter-semantics.md` §2.13 dated clause both carry the OPERATIVE *"UNIQUE PER PROCESS"*,
and the same file's `§2.15` `domain` cell carries the array-multiplicity reading this pass's `§2.4` clause
splits.** **The operative readings are declared and the as-filed cells stand; the re-spelling of those two
cells is a NAMED REPAIR of a later bounded amendment of `docs/specs/storeroom-js/`, and NO PARK IS NAMED AS ITS
INSTRUMENT** (`A66`). **This pass reports it to the supervisor rather than widening itself into two more
cells.**
