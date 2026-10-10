# BACKUP MANIFEST — the compliance-close pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-native/`

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes only
— NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rule
`DEF-14`/`DEF-15` is therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file under
`docs/specs/storeroom-native/**` was re-worded, moved, replaced or deleted, so **`git diff` recovers every
pre-pass byte of every touched file as unchanged context and every byte this pass added as an added line**; and
**(2) THIS MANIFEST, which records each file's PRE-PASS LINE COUNT and every insertion with the PRE-PASS LINE it
stands beside** — so a reader holding the pre-pass bytes can check the two against each other without a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this pass's
own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved; **it
contributes to NEITHER side of the closure predicate** — it is not an entry of the part map and it is not a file
the map declares as a part, and it is not one of the `3` recorded omissions.

## 1. The directory's files, with the PRE-PASS and POST-PASS line counts of every file this pass touched

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-native/contract.md` | `3782` | `3856` | `+74` | **3 insertions** (the index region's `DD`-range restatement; the `DD-47`…`DD-53` block with its census clause; the no-cell disposition clause), plus `2` corrections **inside this pass's own added bytes** (one hyphen, one count word) |
| 2 | `docs/specs/storeroom-native/store-model.md` | `793` | `831` | `+38` | **1 insertion** (`§2.1`'s re-spelling of the home sentence, at the finding `F-9`) |
| 3 | `docs/specs/storeroom-native/write-and-read.md` | `1251` | `1274` | `+23` | **1 insertion** (`§6.5` item 8 (a)'s dated affirmation) |
| 4 | `docs/specs/storeroom-native/parameter-semantics.md` | — | — | `0` | **UNTOUCHED** |
| 5 | `docs/specs/storeroom-native/seams-and-lifecycle.md` | — | — | `0` | **UNTOUCHED** |
| 6 | `docs/specs/storeroom-native/implementation-plan.md` | — | — | `0` | **UNTOUCHED** |
| 7 | `docs/specs/storeroom-native/backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` (this file) | — | — | NEW | the pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `store-model.md` | `643` — *"and the home's own entries are reached by their handle and never by an address."* | the compliance sweep's `§3` · `F-9` (its smallest repair names this sentence) | **the home is ADDRESS-KEYED and its own entries ARE reached by their address; the home is NOT a resolver consumer and NO walk traverses it** — and the `§2.1` clause the second half keeps intact is this subsection's own consumer-set clause (`read` · `write` · `delete` · `listen` · `unlisten`, and no second resolver) |
| 2 | `write-and-read.md` | `1064` — *"`"second home for one registration state"` objection is closed by the ruling's own words.**"* (item 8 (a)'s foot) | the same `F-9` (its second named cell) | **item 8 (a) STANDS AS WRITTEN, dated**, now matching the shipped structure, and read as ONE declaration with `store-model.md §2.1`'s dated clause |
| 3 | `contract.md` | `61` — *"`[T: the two rulings' resolving citation form \| CROSS-REF]`)."* (the index region's last clause) | the `DD` range this index region prints | the operative `DD` range is `DD-1`…`DD-53`, with the census terms `24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 + 7 = 53` |
| 4 | `contract.md` | `547` — *"**⟶ AND THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS BY THIS EIGHTH BOUNDED AMENDMENT — THE OPERATIVE…"* | the sweep's `§4` · `U-1` · `U-2` · `U-3` · `U-4` · `U-6` · `U-7` · `U-8` | **seven priced, reversible `DECLARED-DEFAULT` rows (`DD-47`…`DD-53`)**, one per undeclared structure, plus the operative census at `53` rows |
| 5 | `contract.md` | the block row 4's own census clause, at its foot | the sweep's `§4` · `U-5` · `U-13` · `U-14` | **three structures need NO cell, each with the reason stated** (the structure no longer stands · the marker is derived · the divergence was the code's against a clause that already stands) |
| 6 | `store-model.md` · `write-and-read.md` · `contract.md` | rows 1–4's own added bytes | citation resolution (`DEF-16`'s class) | **six citation re-spellings inside this pass's own added bytes** (see `§4`), and **two row-id spellings** (`DD-51`, `DD-49`) so no pointer reads as a description that resolves to nothing |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and after it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**

## 3. The closure predicate, read off this directory — BOTH FIGURES

- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `6 − 1 =` `5`** (`store-model` · `write-and-read` · `seams-and-lifecycle` · `parameter-semantics` ·
  `implementation-plan`).
- **THE RIGHT SIDE IS `{files present in docs/specs/storeroom-native/} − {contract.md}` = `6 − 1 =` `5`**
  (`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`,
  `implementation-plan.md`), **and the `3` recorded omissions contribute to NEITHER side.**

**SO THE PREDICATE READS `5 = 5` ✓ AND IT HOLDS, and the state stays `CLOSED`.** **This pass creates NO file at
a path the map would have to declare and no file at a path the omissions table names; the one file it creates
lives in `backup/`, a SUBDIRECTORY, and is neither a part entry nor a recorded omission.**

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every re-spelling *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation | The as-filed form | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | `A45` in `store-model.md §2.1`'s dated clause | `P: §13 · A45` | `P: §11 · A45` | **CHECKED** — the listeners proposal's `§11` is the home ruling |
| 2 | `A45` in `write-and-read.md §6.5` item 8's affirmation | `P: §13 · A45` | `P: §11 · A45` | **CHECKED** |
| 3 | `A22` in `DD-47` | `P: §14 · A22` | `P: §13 · A22` | **CHECKED** — the native proposal's `§13` carries `A21`–`A26` |
| 4 | `A41` in `DD-48` | `P: §12 · A41` | `P: §8 · A41` | **CHECKED** — the listeners proposal's `§8` is the register's parent-anchor clarification |
| 5 | `A18` in `DD-49` | `P: §13 · A18` | `P: §12 · A18` | **CHECKED** — the native proposal's `§12` closes with `A17`–`A20` |
| 6 | `A9` in `DD-53` | `P: §11 · A9`'s boundary rule *"as `§10` carries it"* | `P: §11 · A9` | **CHECKED** — `§10` was a second referent and the citation is now single-voiced |
| 7 | the home's handle index, in `store-model.md §2.1`'s dated clause | *"the defaults table's row carrying …"* (a description) | `contract.md §0.2` · `DD-51` (a resolvable id) | **CHECKED** |
| 8 | the instance's domain carrier, in `package.md §4.5` item 5's dated clause (the JS directory's file; listed here because it is the same re-spelling class) | *"`§0.2`'s row for the core-side carrier …"* (a description) | `§0.2` · `DD-49` (a resolvable id) | **CHECKED** |

## 5. THE RED-SET CELLS THIS PASS'S FIXES COULD HAVE MADE FALSE — each named with its `§`, and NONE IS

| # | The cell | Its `§` | Verdict |
| --- | --- | --- | --- |
| 1 | `tests/watched_addresses.rs`'s HOME-IS-NOT-A-GRAPH-STRUCTURE drive — *"`read([])` carries no listener entry; the home is NOT addressable; a fresh instance over an equal `cfg.filePath` begins with `triggered: []`"* | `archive/gate3/storeroom-native-red-set.md` `§13.1` item 3, cell `(v)` | **NOT MADE FALSE.** The cell's *"NOT addressable"* is `write-and-read.md §6.5` item 8 (b)'s reading — no segment path reaches the home, no `findAddress` returns it, no read includes it — and this pass's clause keeps that half WHOLE while it declares the KEY half. The `§13.1` cell's three observables are unmoved, and the clause that carries the same three at `contract.md §5.8`'s `(v)` cell is named in `store-model.md`'s insertion so the pairing is visible. |
| 2 | the store's `P-TP-8` row's `S-WATCH` cell `(v)` | `docs/specs/storeroom-native/contract.md §5.8` | **NOT MADE FALSE** — it asserts `findAddress` reaches no home entry at any address, which the new clause keeps; it is cited in the insertion as the home of that half. |
| 3 | `P-SM-4`'s pair-count arms and `P-IM-3`'s closure | `contract.md §5.4` · `§5.5` | **NOT MADE FALSE AND NOT MOVED** — `DD-47`/`DD-49` declare the structures that CARRY those properties; no arm, no row and no failure list changes. |
| 4 | the `D-1`…`D-3` delete arms and the rollback's totality cells | `contract.md §4.3` · §5.4's register rows | **NOT MADE FALSE** — `DD-50` declares the internal pre-state carrier `DD-20`/`DD-21` already require; no returned member and no fail-state moves. |
| 5 | `DD-42`'s mint drive (`dd_42_the_mint_never_takes_a_token_the_instance_s_home_already_holds`) | `tests/e2e_listener_firing.rs`, cited at `archive/gate3/storeroom-native-red-set.md` `§19` | **NOT MADE FALSE** — the RULE is unmoved; only the collision TEST's form is declared (`DD-51`), and the drive asserts the RULE's answer, which is identical either way. |
| 6 | the `377`-test and `218`-test figures quoted in this directory | `contract.md §6.5` item 4's dated clause; `write-and-read.md §6.5` | **NOT TOUCHED AND NOT RE-MEASURED** — this pass writes no `tests/**` byte and claims no green. |

## 6. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff docs/specs/storeroom-native/`** shows, for each of the three touched files, **only ADDED lines
   and no removed or modified line**; every pre-pass byte appears as unchanged context.
2. **The counts of `§1` are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertion's own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor,
   which is quoted in `§2` and `§4` rather than edited in place. **The only bytes this pass ever corrected were
   its OWN added bytes, inside the insertions themselves** (one hyphen in a `DD-3` citation, one count word, and
   the six citation re-spellings of `§4`), and those corrections stand inside lines `git diff` prints as added.
4. **NO MISHAP IS DISCLOSED BECAUSE NONE OCCURRED IN THIS DIRECTORY, AND THAT IS SAID PLAINLY RATHER THAN LEFT
   TO A DIFF:** every `old_string` this pass matched in `docs/specs/storeroom-native/**` was re-emitted verbatim
   in its `new_string`, at the same position and in the same order, and **no match failed and no edit was
   retried here** — the pass's ONE failed match was in the sibling directory's `package.md` and it took no byte,
   which that directory's own manifest records.
5. **ONE LIMIT, DECLARED RATHER THAN SMOOTHED:** this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
   the pass itself; it is not an independent measurement, and this pass holds no execution verb — **no `git`
   command and no test run was made by it.**

## 7. What this pass did NOT write

**No `src/**` byte, no `tests/**` byte, no `bindings/**` byte, no byte under `../Provident-Electron/**`, no
tracker row, no `PAR` row, no register row, no fail-code member, and no part file at a path the map or the
omissions table does not already carry.** **The register stands at its `8` rows with the cap holding
(`8 ≤ 8` ✓), the fail set at its `15` members (`11 + 2 + 1 + 1 = 15` ✓), the `derivation:` clause SINGLE in every
document that carries one, and no clause of this directory is re-decided beyond what the findings named in `§2`
require.**
