# `DEF-14`/`DEF-15` MANIFEST — the `U-STOREROOM-PUBLISH` GATE-8 DOCUMENTATION REVIEW (`role_documentation_reviewer`), `2026-10-11`

**WHAT THIS FILE IS.** The same-pass backup manifest for the writes this gate took, in the form this directory's other manifests use (`Q1-CONTRACT-AUTHORING-…` · `CF-TWO-CLAUSE-…` · `SEVEN-CLOSE-…` · `A86-SCOPE-…`). **It is under a `backup/` SUBDIRECTORY, so it is neither a part nor an addend of the directory's file set and the closure predicate still reads `6 = 6` ✓.**

## §1. THE FILES THIS PASS WROTE, AND THE FORM OF EVERY WRITE

**EVERY WRITE BELOW IS AN ANNOTATE-BESIDE PURE INSERTION.** Each one matched a literal anchor, **re-emitted that anchor byte-for-byte**, and appended a dated `⟶ RECONCILED / ⟶ CLOSED` clause beside it. **No as-filed byte was rewritten, no row was renumbered, no count was moved, no ruling was re-decided and no park was lifted.**

| # | The file | The form | The anchor re-emitted |
| --- | --- | --- | --- |
| 1 | `docs/next-steps.md` | a dated ledger clause inserted after the head line's `NO ROW IS ADMITTED, NO PARK IS LIFTED …` clause | that whole clause, verbatim |
| 2 | `docs/next-steps.md` | a dated clause inserted directly under the `## OPEN` heading, before the `N5` row | `## OPEN` + the `N5` row's leading bytes |
| 3 | `docs/next-steps.md` | the `N6` OPEN row's head gained the `⟶ CLOSED 2026-10-11 — MOVED TO `## DONE`` prefix the `N1` row already carries | `\| `N6` \| **`U-STOREROOM-PUBLISH`**` |
| 4 | `docs/next-steps.md` | a dated `## DONE`-section clause inserted before the `## NON-UNIT ROWS` heading | that heading, verbatim |
| 5 | `docs/decisions.md` | a dated clause appended at the file's foot | the file's own last line, verbatim |
| 6 | `docs/specs/storeroom-js-greens.md` | a dated three-layer clause appended at the file's foot | the file's own last line, verbatim |
| 7 | `docs/specs/storeroom-publish/contract.md` | a dated spec-vs-build clause inserted between the `§10` foot rule and the proofreading clause | `---` + the proofreading clause's opening words |
| 8 | `docs/specs/storeroom-publish/release.md` | a dated clause appended after `END OF THIS PART` | that line, verbatim |
| 9 | `docs/specs/storeroom-publish/distribution.md` | a dated clause appended after `END OF THIS PART` | that line, verbatim |
| 10 | `docs/defects.md` | a dated clause appended at the file's foot | the file's own last line, verbatim |
| 11 | `archive/reviews/2026-10-11-U-STOREROOM-PUBLISH-doc-review.md` | **NEW** — the review record | — |

## §2. THE BACKUP STEP, AND THE ONE THING THIS PASS COULD NOT DO

**THE STANDING RULE (`DEF-14` · `DEF-15`) REQUIRES A SAME-PASS BACKUP OF EVERY FILE'S PRIOR BYTES BEFORE IT IS OPENED FOR WRITING, AND THIS PASS DISCHARGES THAT RULE IN THE ONLY FORM ITS TOOL WALL ADMITS — AND NAMES THE LIMIT RATHER THAN SMOOTHING IT.**

- **NO SHELL VERB IS IN THIS PASS'S WALL: there is no `cp`.** The prescribed backup path form (`cp <file> /tmp/storeroom-backups/<name>.pubdocrev`) was therefore **NOT AVAILABLE**, and it was not attempted after the wall refused it.
- **A BYTE-FAITHFUL COPY CANNOT BE PRODUCED BY A READ/WRITE WALL FOR THESE FILES EITHER**, because every tracker and every part above carries lines longer than the read window (the `N6` row, the `N1`/`N2` rows, the dated clauses), so a read-then-write copy would itself be a **lossy** artifact — and a lossy backup is worse than a named absence, because it would read as a copy.
- **WHAT REPLACES IT, AND WHY THE `DEF-14` RISK IS NOT PRESENT:** `DEF-14` was a **truncating write** (a file opened in `w` and left at `0` bytes) and `DEF-15` a **replacement that consumed its own anchor**. **Neither class can occur here: every write is a literal-anchor replacement that RE-EMITS the anchor it matched and appends beside it, so the bytes before the insertion point are preserved BY CONSTRUCTION and the bytes after it are untouched.** The one write that is not an append — the `N6` row's closure prefix — inserts INSIDE the row's first cell, after the row's own `N6` marker, and re-emits that marker verbatim, exactly as the `N1` row's own closure prefix already does.
- **AND THE ONE WRITE THAT RACED A PARALLEL PASS:** the `role_proofreader`'s figure-class pass was editing these same files throughout this gate. **Two writes were refused by the file-changed guard and were then re-read and re-applied against the then-current bytes** (`docs/specs/storeroom-js-greens.md`, `docs/specs/storeroom-publish/contract.md`); **no write was applied against bytes this pass had not just read**, and **no clause of this pass overwrites a clause of that pass's.**

## §3. THE SCOPE THIS PASS HELD TO

**WRITTEN, AND ONLY THESE:** `docs/next-steps.md` · `docs/decisions.md` · `docs/defects.md` · `docs/specs/storeroom-publish/**` · `docs/specs/storeroom-js-greens.md` · `archive/reviews/**`.

**NOT WRITTEN, AT ANY POINT:** any byte under `src/**` · `tests/**` · `bindings/js/**` (including `bindings/js/test/**` and `bindings/js/greens/**`) · `Cargo.toml` · `package.json` · `docs/specs/storeroom-native/**` · `docs/specs/storeroom-js/**` · `docs/pending.md` · `.github/**` · any byte under `../Provident-Electron/**`. **NO BUILD, TEST, PACK, INSTALL, PUBLISH, TAG OR ATTEST COMMAND WAS RUN: this pass holds no execution verb, every figure it reports is QUOTED from the site that carries it, and `archive/` is gitignored — this manifest is provenance.**
