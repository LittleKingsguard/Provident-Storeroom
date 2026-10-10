# BACKUP MANIFEST — the store close-out pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-native/**`: the ONE store-side CONTRACT FINDING of the JS convenience unit's host-fix pass, closed

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes
only — NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rules
`DEF-14`/`DEF-15` are therefore satisfied by the TWO mechanisms this file records:** **(1) THE ONE EDIT OF
THIS PASS UNDER `docs/specs/storeroom-native/**` IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of
the file was re-worded, moved, replaced or deleted, so **`git diff` recovers every pre-pass byte as unchanged
context and every byte this pass added as an added line**; and **(2) THIS MANIFEST, which records the file's
PRE-PASS LINE COUNT and the insertion with the PRE-PASS LINE it stands beside** — so a reader holding the
pre-pass bytes can check the two against each other without a diff. **THE ANCHOR IS QUOTED BY ITS OWN FIRST
WORDS, SO IT SURVIVES THE SHIFT ITS OWN INSERTION CAUSES**, and **the edit RE-EMITS the text it matched**,
which is `DEF-15`'s remedy.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this pass's
own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved; **it
contributes to NEITHER side of the closure predicate** — it is not an entry of the part map, not a file the map
declares as a part, and not one of the `3` recorded omissions.

## 1. The file this pass touched, with its PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | The insertion, by its pre-pass anchor line |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-native/write-and-read.md` | `1387` | `1439` | `+52` | **1 insertion** — the `§6.5` item 12 clause binding the token to its REMAINING entries after a first-match withdrawal, landing at post-pass `1229`–`1280`, read beside the pre-pass line `1227` (*"its domain and `unlisten` over it is a no-op success.**"*, the close of item 12's `F-5` clause part (c)); **`**ITEM 13 …**` now begins at post-pass `1282` (pre-pass `1229`), and the part's `---` rule and `END OF THE \`write-and-read\` PART` clause follow at `1431`–`1439` unchanged in substance** |
| 2 | `docs/specs/storeroom-native/backup/STORE-CLOSE-2026-10-11-manifest.md` (this file) | — | — | NEW | the pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |
| 3 | `docs/specs/storeroom-native/contract.md` · `store-model.md` · `seams-and-lifecycle.md` · `parameter-semantics.md` · `implementation-plan.md` · `backup/A78-REHOMING-2026-10-11-manifest.md` · `backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` | — | — | `0` | **UNTOUCHED — read, never amended** |

**AND ONE HONESTY CLAUSE THE TABLE OWES:** **THE PRE-PASS LINE COUNT IS THE FIGURE THE FILE CARRIED AT THIS
PASS'S OWN START AND THE POST-PASS COUNT AND THE INSERTION RANGE ARE THIS PASS'S OWN READINGS OF THE FILE AS
IT NOW STANDS** — the file was read at its first and last lines before the edit and read back after it, and
its headings and its last line were re-located to fix the range (`docs/specs/storeroom-native/backup/A78-REHOMING-2026-10-11-manifest.md`
`§1` records the pre-pass `1387`). **So a reader holding `git diff` recovers every pre-pass byte as unchanged
context and every byte this pass added as an added line: NO PRE-PASS BYTE IS RE-WORDED, MOVED OR DELETED.**

## 2. The edit, one row — the anchor it stands beside, the finding it closes and the rule it declares

**THE FORM OF THE ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+52` lines, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `write-and-read.md` | `1227` — *"its domain and `unlisten` over it is a no-op success.**"* | the JS unit's host-fix pass, FINDING 2: `contract.md §0.2` · `DD-42`'s unconditional *"the home never holds two entries with ONE token, `unlisten` removes exactly the entry it names"*, read against the same row's own exception licensing the caller-spelled duplicate at two addresses (this item's own claim, at its `F-5` clause part (c)) | **A FIRST-MATCH WITHDRAWAL UNBINDS THE TOKEN FROM THE ONE ENTRY IT NAMES AND FROM NOTHING ELSE: the token STAYS BOUND to its REMAINING entries, each still returned by a trigger and each still withdrawable by a later `unlisten` over the same token — and the *"an entry that CAN NEVER BE WITHDRAWN"* state is FORBIDDEN BY CLAUSE**, with the authority pointed at the store's own structure: the home's handle→address index is a lookup structure DERIVED from the home and never patched entry by entry (`contract.md §0.2` · `DD-51` and its dated clause; `contract.md §0.4`'s mint clause and its dated clause; `§5.8`'s handle-preservation half) |

**AND THE ONE FACT THE ROW SHARES WITH EVERY OTHER EDIT OF THIS PASS: the insertion stands BESIDE its anchor
and after it in the file's reading order, so the anchor's own bytes are the pre-pass bytes, at their own line
and in their own order.**

## 3. The closure predicate, read off this directory — BOTH FIGURES

- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `6 − 1 =` `5`** (`store-model` · `write-and-read` · `seams-and-lifecycle` · `parameter-semantics` ·
  `implementation-plan`).
- **THE RIGHT SIDE IS `{files present in docs/specs/storeroom-native/} − {contract.md}` = `6 − 1 =` `5`**
  (`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`,
  `implementation-plan.md`), **and the `3` recorded omissions contribute to NEITHER side.**

**SO THE PREDICATE READS `5 = 5` ✓ AND IT HOLDS, and the state stays `CLOSED`.** **This pass creates NO file at
a path the map would have to declare and no file at a path the omissions table names; the one file it creates
lives in `backup/`, a SUBDIRECTORY, and is neither a part entry nor a recorded omission.** **The store's typed
register stands at its `8` rows with the cap holding (`8 ≤ 8` ✓), every failure list unmoved and no ninth row
minted; the `PAR` set stands at its `14` rows; the `DD` range stands at `DD-1`…`DD-53`; the closed fail set
stands at its `15` members; the prohibited set stands at its `7` rows; and the `derivation:` clause stands
single.**

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every citation form *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation | The as-filed form it is read against | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | `contract.md §0.2` · `DD-42` | *"the home never holds two entries with ONE token, `unlisten` removes exactly the entry it names"* — quoted VERBATIM in the new clause and read as the MINTED-token case | **unchanged and UNMOVED; the new clause states which state the sentence's unconditional reading overreaches and leaves the row's own exception sentence as the operative qualification** | **CHECKED** — `contract.md §0.2`'s `DD-42` row carries both sentences; `§0.4`'s mint clause's dated clause leaves `DD-42` clause (2)'s FIRST-match answer UNMOVED |
| 2 | `contract.md §0.2` · `DD-51` | *"the handle→address INDEX inside the home … a LOOKUP STRUCTURE ONLY"* | **cited as the AUTHORITY for the survivors staying indexed, and its `what it REFUSES` cell's *"an index whose membership and the home's entries can disagree"* is quoted as the forbidden species** | **CHECKED** — `contract.md §0.2` · `DD-51` is the row; `contract.md §0.4`'s dated clause and `store-model.md §2.1`'s dated clause carry the index's form |
| 3 | `write-and-read.md §6.5` item 12's own sentence | *"`unlisten` removes exactly ONE home entry"* | **unchanged and UNMOVED; the new clause reads the ONE-entry removal as the FIRST-match rule `DD-42` clause (2) declares and states what it does NOT do to the token's other entries** | **CHECKED** — item 12's opening clause and this part's item 12 (c) both print the one-entry removal |
| 4 | the store's own seven-tag form | — | **the new clause's tag foot carries `P` (`§20 · A58`, `§18 · A57`) and `T`, inside the CLOSED seven-tag enum (`contract.md §0.1` item 2)** | **CHECKED** — no `S:`-tagged citation is written (item 11's own disclosure, count stays `0`), and no citation points outside this repository |
