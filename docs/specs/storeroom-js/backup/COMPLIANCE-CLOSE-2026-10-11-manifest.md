# BACKUP MANIFEST — the compliance-close pass of 2026-10-11 (`role_spec_writer`) on `docs/specs/storeroom-js/`

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes only
— NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rule
`DEF-14`/`DEF-15` is therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file under `docs/specs/storeroom-js/**` was
re-worded, moved, replaced or deleted, so **`git diff` recovers every pre-pass byte of every touched file as
unchanged context and every byte this pass added as an added line**; and **(2) THIS MANIFEST, which records each
file's PRE-PASS LINE COUNT and every insertion with the PRE-PASS LINE it stands beside** — so a reader holding
the pre-pass bytes can check the two against each other without a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR-JS` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this
pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved;
**it contributes to NEITHER side of the closure predicate** — it is not an entry of the part map and it is not a
file the map declares as a part, and it is not one of the `3` recorded omissions.

## 1. The directory's files this pass touched, with their PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/contract.md` | `2178` | `2234` | `+56` | **3 insertions** (the index region's `DD`-range bullet; the `DD-48`…`DD-50` block with its census clause; the `U-9` no-cell clause), plus `2` corrections **inside this pass's own added bytes** (two citation re-spellings) |
| 2 | `docs/specs/storeroom-js/package.md` | `804` | `874` | `+70` | **1 insertion** (`§4.5` item 5's dated clause: the invoker re-spelling and the signature-block reconciliation), plus `1` correction **inside this pass's own added bytes** (one row-id pointer) |
| 3 | `docs/specs/storeroom-js/crossing.md` | — | — | `0` | **UNTOUCHED** |
| 4 | `docs/specs/storeroom-js/surface.md` | — | — | `0` | **UNTOUCHED** |
| 5 | `docs/specs/storeroom-js/acceptance.md` | — | — | `0` | **UNTOUCHED** |
| 6 | `docs/specs/storeroom-js/parameter-semantics.md` | — | — | `0` | **UNTOUCHED** |
| 7 | `docs/specs/storeroom-js/test-cases.md` | — | — | `0` | **UNTOUCHED** |
| 8 | `docs/specs/storeroom-js/implementation-plan.md` | — | — | `0` | **UNTOUCHED** |
| 9 | `docs/specs/storeroom-js/backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` (this file) | — | — | NEW | the pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of the predicate** |
| 10 | `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` | — | — | `0` | **UNTOUCHED** — the earlier pass's own record is read, never amended |

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted by
its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `contract.md` | `22` — *"— the store's own `DD`/`PAR`/`P-` families are ITS OWN and the cap is PER UNIT \| requirement]`)."* (the unit/prefix bullet's foot) | the `DD` range this index region prints | the operative `DD` range is `DD-1`…`DD-50`, with the census terms `29 + 18 + 3 = 50`; no `PAR-JS`, register or `HO-` figure moves |
| 2 | `contract.md` | `356` — *"**AND THE TABLE'S OWN CENSUS, PRINTED WITH ITS TERMS, AND ITS NUMBERING DISCLOSURE BESIDE IT SO A READER…"* | the sweep's `§4` · `U-10` · `U-11` · `U-12` | **three priced, reversible `DECLARED-DEFAULT` rows (`DD-48` · `DD-49` · `DD-50`)**, one per undeclared structure, plus the operative census at `50` AUTHORED rows |
| 3 | `contract.md` | the block row 2's own census clause, at its foot | the sweep's `§4` · `U-9` | **one structure needs NO cell, with the reason stated** (settled in code by deletion; a `DD` row would declare a structure that exists in no byte) |
| 4 | `package.md` | `693` — *"DECLARED ORDER and no drive may assert one** (`§2.7` item 3, `DD-22`)."* (item 5's clause (c)) | the sweep's `§3` · `F-13` | **the INVOKER is the MAPPING LAYER (the package / the ESM entry), not the facade**, `"the core never invokes a listener of its own accord"` stays TRUE, and the signature block is reconciled: `triggered_set` deleted, the `listener: JsListener` parameter gone, `register` surviving as the domain half |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and after it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**

## 3. The closure predicate, read off this directory — BOTH FIGURES

- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `7 − 1 =` `6`** (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics` ·
  `implementation-plan` · the `view` part `test-cases`) — **the operative, ENTRY-COUNTED reading.**
- **THE RIGHT SIDE, UNDER THE OPERATIVE READING, IS `6`; UNDER THE RAW-FILE READING THE CLAUSE'S OWN WORDS
  NAME — *"{files present in `docs/specs/storeroom-js/`} − {contract.md}"* — IT IS `7`.**

**SO THE PREDICATE READS `6 = 6` ✓ AND IT HOLDS, with the raw-file reading's `6 = 7` reported and NOT claimed,
exactly as the index region's own dated clause states it** — **and THIS pass moves NEITHER figure: it creates no
file at a path the map would have to declare and no file at a path the omissions table names, and the one file
it creates lives in `backup/`, a SUBDIRECTORY.**

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every re-spelling *by name*, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation | The as-filed form | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | `A65` in `DD-48` | `A65` (a bare mark, which this directory's five-form enum does not admit as a citation) | `A1 docs/specs/storeroom-js-proposal.md §10 · `A65`` | **CHECKED** — the crossing's copy discipline is that proposal's `§10` |
| 2 | `A69` in `DD-49` | `A69` (bare) | `A1 docs/specs/storeroom-js-proposal.md §13 · `A69`` | **CHECKED** — the handle rulings are that proposal's `§13` |
| 3 | `package.md §4.5` item 5's pointer to the domain's carrier row | *"`§0.2`'s row for the core-side carrier …"* (a description) | `§0.2` · `DD-49` (a resolvable id) | **CHECKED** |
| 4 | the index region's `DD` range | `DD-1`…`DD-47` (`47` AUTHORED rows) | the operative range `DD-1`…`DD-50`, the as-filed form printed beside it | **CHECKED** |
| 5 | the `§0.2` heading's own range | `(`DD-1`…`DD-47`, `47` AUTHORED rows)` | **UNMOVED BYTE-FOR-BYTE and named as the as-filed figure** in the new census clause, which is the operative statement of the table's size | **CHECKED** |
| 6 | the three rows' checking-property cells | — | `P-TP-8` · `P-SM-5` · `P-TP-7` — **all three exist in the `8`-row register and no `P-TP-9` citation is written** | **CHECKED** |
| 7 | the store-side pointer the re-spelling owes | — | `docs/specs/storeroom-native/write-and-read.md §6.5` item 8, cited and never re-declared in this directory | **CHECKED** |

## 5. THE RED-SET CELLS THIS PASS'S FIXES COULD HAVE MADE FALSE — each named with its `§`, and NONE IS

| # | The cell | Its `§` | Verdict |
| --- | --- | --- | --- |
| 1 | `S-REG` — the registration site's answers, one row per outside class, asserted through the PACKAGE's own entry | `bindings/js/test/register.test.mjs`, cited at `archive/gate3/storeroom-js-red-set.md` `§8.2`/`§10.3`, driving `P-SM-5` | **NOT MADE FALSE.** The cell drives the JS SURFACE's `register(handle, listener)` (`§2.4` item 5), which this pass does not touch; the clause re-spells the CORE's interface only, and the core's surviving `register` is the very member the domain answer is asserted through. |
| 2 | CONTRACT FINDING 1 — the invocation passes no argument, naming `src/facade.rs`'s `invoke_listeners` as one of its two sites | `archive/gate3/storeroom-js-red-set.md` `§8.6` item 1 | **NOT MADE FALSE BY THIS PASS.** Its subject is `PAR-JS-12`'s declared domain, which is unmoved and which this pass's clause REINFORCES by naming the mapping layer as the invoker; the path its evidence line names was staled by the repair's deletion, not by a contract byte. |
| 3 | `bindings/js/README.md`'s `instance.register(handle, listener)` row, whose prose still prints the withdrawn `TypeError` | `archive/gate3/storeroom-js-red-set.md` `§10.5` item 3 (already filed) | **NOT MADE FALSE and NOT THIS PASS'S** — the signature it prints is the JS surface's and is unmoved; its stale prose site lies outside this pass's wall and is named here so it is not read as new. |
| 4 | the Rust half's declared interface, as the red set's own header pins it (`bindings/js/tests/support/mod.rs`) | `archive/gate3/storeroom-js-red-set.md` `§5` item 2 | **NOT MADE FALSE.** The header imports `Instance` and the carrier types, and carries **no** `JsListener` and **no** `triggered_set` — so no Rust drive references the two members this clause deletes. |
| 5 | the register-layer rows `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-SM-6` · `P-TP-7` · `P-TP-8` | `docs/specs/storeroom-js/contract.md §5.1`–`§5.8` | **NOT MOVED** — no row is added, dropped, renumbered or re-worded by this pass (`8 ≤ 8` ✓). |
| 6 | this unit's JS-side figures (`92` tests · `107` attempts · the `77`/`71`-row views) | `archive/gate3/storeroom-js-red-set.md` `§9.5`/`§10.7`; `test-cases.md`'s census | **NOT TOUCHED AND NOT RE-MEASURED** — this pass writes no test byte and claims no green. |

## 6. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff docs/specs/storeroom-js/`** shows, for each of the two touched files, **only ADDED lines and no
   removed or modified line**; every pre-pass byte appears as unchanged context.
2. **The counts of `§1` are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertion's own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor,
   which is quoted in `§2` and `§4` rather than edited in place. **The only bytes this pass ever corrected were
   its OWN added bytes, inside the insertions themselves** (the three citation re-spellings of `§4`), and those
   corrections stand inside lines `git diff` prints as added.
4. **NO MISHAP IS DISCLOSED BECAUSE NONE OCCURRED, AND THAT IS SAID PLAINLY RATHER THAN LEFT TO A DIFF:** every
   `old_string` this pass matched was re-emitted verbatim in its `new_string`, at the same position and in the
   same order; the one failed match (reported by the tool and not applied) took no byte — it had taken a
   paragraph's mid-point as its anchor, and the retry anchored at the paragraph's own foot.
5. **ONE LIMIT, DECLARED RATHER THAN SMOOTHED:** this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
   the pass itself; it is not an independent measurement, and this pass holds no execution verb — **no `git`
   command and no test run was made by it.**

## 7. What this pass did NOT write

**No `src/**` byte, no `tests/**` byte, no `bindings/**` byte, no byte under `../Provident-Electron/**`, no
tracker row, no `PAR-JS` row, no register row, no `HO-` row, no failure-code member, and no part file at a path
the map or the omissions table does not already carry.** **The register stands at its `8` rows with the cap
holding (`8 ≤ 8` ✓), the `derivation:` clause SINGLE in every document that carries one, and no clause of this
directory is re-decided beyond what the findings named in `§2` require.**
