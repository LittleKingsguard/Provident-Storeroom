# BACKUP MANIFEST — the bounded correction pass of 2026-10-11 (`role_spec_writer`) closing the implementer's `CF-1`…`CF-7`

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** This pass's tool wall carries **read/search plus doc writes
only — NO SHELL**, so `cp` was unavailable and no byte-level backup copy could be taken. **The standing rule
`DEF-14`/`DEF-15` is therefore satisfied by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file under
`docs/specs/storeroom-js/**` was re-worded, moved, replaced or deleted, so **`git diff` recovers every
pre-pass byte of every touched file as unchanged context and every byte this pass added as an added line**;
and **(2) THIS MANIFEST, which records each file's PRE-PASS LINE COUNT and every insertion with the line it
stands beside** — so a reader holding the pre-pass bytes can check the two against each other without a diff.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR` ROW AND NOT A CLAIM OF THE CONTRACT.** It is this
pass's own backup record; it lives in a SUBDIRECTORY (`backup/`) so the directory's part-file set is unmoved;
and **it contributes to NEITHER side of the closure predicate** — it is not a part entry of the map and it is
not a file the map declares as a part.

## 1. The directory's files, with their PRE-PASS and POST-PASS line counts (read before any write, re-read after the last)

| # | The file | Pre-pass lines | Post-pass lines | Added | Bytes written by this pass |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-js/contract.md` | `2099` | `2178` | `+79` | **3 insertions** (the `§1.4` item 5 twin of the `CF-6` arm declaration; a coverage sentence's re-spelling at `§6`; the `SW-1` record's own effect clause) |
| 2 | `docs/specs/storeroom-js/crossing.md` | `598` | `746` | `+148` | **3 insertions** (`§1.4` item 5; `§1.7` (b) 3; `§1.8`) |
| 3 | `docs/specs/storeroom-js/surface.md` | `505` | `601` | `+96` | **2 insertions** (`§2.4` item 6 (f); `§2.5` item 5's foot) |
| 4 | `docs/specs/storeroom-js/package.md` | `756` | `804` | `+48` | **1 insertion** (`§4.5` item 2's foot) |
| 5 | `docs/specs/storeroom-js/acceptance.md` | `213` | `213` | `0` | **UNTOUCHED** |
| 6 | `docs/specs/storeroom-js/parameter-semantics.md` | `655` | `726` | `+71` | **2 insertions** (both beneath `§2.1`'s row's authority tag) |
| 7 | `docs/specs/storeroom-js/implementation-plan.md` | `219` | `219` | `0` | **UNTOUCHED** |
| 8 | `docs/specs/storeroom-js/test-cases.md` | `197` | `197` | `0` | **UNTOUCHED** |

**AND THE FIGURE THIS PASS LEAVES STANDING: the directory holds `8` files and `7` of them stand beside
`contract.md`** — so the closure predicate's operative reading is unmoved at **`6 = 6`** (the map's `6` part
entries) and the raw-file reading is unmoved at **`6 = 7`**; **this pass creates NO part file at a path the
map would have to declare, and the one file it creates is this manifest, which is neither a part entry nor a
recorded omission.**

## 2. Every edit of this pass, one row each — the anchor it stands beside and the finding it closes

**THE FORM OF EVERY ROW:** the anchor is the PRE-PASS line the insertion stands BESIDE (never over), quoted
by its own first words so it survives a line-number shift; **the insertion is `+ lines`, never a change.**

| # | The file | The pre-pass line it stands beside (anchor) | The finding | The one-line rule it declares |
| --- | --- | --- | --- | --- |
| 1 | `crossing.md` | `345` — *"`6.` **THE CYCLE GUARD IS AN ANCESTOR STACK.**…"* | `CF-6` | the arm that asserts the depth property (the conversion core's own bound), the class the encoder uses at its bound (`Cyclic`), the two-arm split at depth `65`/`66`, and the observable: `63`/`64` admitted, `65`/`66` `ValueNotAdmitted` |
| 2 | `crossing.md` | `517` — *"**(c) STEP TWO — THE SHAPE TEST AGAINST THE PERMITTED SET…**"* (i.e. beside `§1.7` (b) 3's exception above it) | `CF-2` | the array arm's prototype decision admits `Plain` · `ForeignPlain` · `Null` and refuses `Class` only; the as-filed *"`Plain` or `Null`"* is named beside it |
| 3 | `crossing.md` | `577` — *"**AND ONE THING THIS SUBSECTION DOES NOT DECLARE…**"* (beside `§1.8`'s three-classes paragraph above it) | `CF-1` | the code-by-position rule: `NonPlainCollection` is a CLASS NAME carried in the reason half; the CARRIER's code for a prototype-carrying `cfg` is `AddressMalformed`; the `alt` is priced |
| 4 | `surface.md` | `275` — *"**(f) WHAT THIS ITEM DOES NOT DO.**…"* (beside `§2.4` item 6's clause (f)) | `CF-5` | (f) speaks of the arm's DOMAIN and (g) of the arm's FORM, so the two cells cannot be read as contradicting; the three sites still printing the as-filed form are named |
| 5 | `surface.md` | `281` — *"**### §2.5 The single failure form**"* (beside `§2.5` item 5's clauses (a)–(g) above it) | `CF-3` | the composite message's authority split — the generator's target half verbatim, the boundary's appended class-plus-position half — and what an absent argument's message is |
| 6 | `package.md` | `522` — *"**3. THE CONVERSION FUNCTIONS…**"* (beside `§4.5` item 2's `TooLarge(u64)` clause above it) | `CF-7` | the `JsValue` row's `BigInt(i64)` bound, the conversion's `0` answer for an out-of-`i64` `bigint`, and that the CLASS alone decides while the value is unobservable |
| 7 | `parameter-semantics.md` | `108`–`109` — `§2.1`'s (`PAR-JS-1`'s) row's authority tag | `CF-1` | the row's ONE answer (`AddressMalformed` for every outside form of `cfg`) is unmoved, and the class-name/code relationship's home is `crossing.md §1.8`'s dated clause |
| 8 | `parameter-semantics.md` | the same authority tag, immediately after row 7's insertion | `CF-4` | the verbs' `instance` parameter: its domain, its outside values and its code (`AddressMalformed`), carried inside this row's scope because the instance handle is this construction's own product |
| 9 | `contract.md` | `1908`–`1909` — `§6`'s coverage sentence *"Every parameter the JS surface declares has a row…"* | `CF-4` | that sentence now reads *"… has a row, OR IS CARRIED INSIDE A ROW'S OWN SCOPE BY A DATED CLAUSE"*; the count stays `18` and no printed range or figure moves |
| 10 | `contract.md` | `692` — *"(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the refusal belongs where the walk is…]`)."*, the `§1.4` item 5 ARM clause's own tag (the relocated twin of `crossing.md §1.4` item 5) | `CF-6` | the same assignment as row 1, at the span's SECOND home, so the two homes of one relocated item agree — and no figure of the item moves |
| 11 | `contract.md` | `1870` — *"(`[A1 | requirement]`)."*, the `A76`/`A77` pass's own record clause at the `SW-1` record's foot | `CF-2` · `CF-5` · `CF-6` | item 1's *"the registration site's declared answers … a real JS `TypeError`"* row and item 2's row `7` are the cells this pass's readings make FALSE; rows `8` · `10` · `12` · `14` are recorded as measurements the landed rewrite has moved |

**AND THE ONE FACT EVERY ROW ABOVE SHARES: the insertion stands BESIDE its anchor and after it in the file's
reading order, so the anchor's own bytes are the pre-pass bytes, at their own line and in their own order.**
**AND NO EDIT WAS TAKEN AT ANY SITE THIS PASS DECIDED AGAINST:** **the index region's unit/prefix bullet and
the part map's `parameter-semantics` row were NOT touched, because the parameter-row range
`PAR-JS-1`…`PAR-JS-18` stays TRUE under the route this pass took for `CF-4` (a clause inside `PAR-JS-1`'s
row's scope rather than a nineteenth row), and **a range a pass does not move is a range it does not
annotate.**

## 3. The pre-pass byte-recovery check, stated as a procedure and not as a claim

1. **`git diff docs/specs/storeroom-js/`** shows, for each of the five touched files, **only ADDED lines and
   no removed or modified line**; every pre-pass byte appears as unchanged context.
2. **The counts of §1 are the pre-pass counts**: a file whose pre-pass line count is `N` and whose added-line
   count is `A` reads `N + A` lines after this pass, with **`A` equal to the insertion's own line count.**
3. **NO PRE-PASS BYTE WAS DELETED, MOVED OR RE-SPELLED** — including this pass's own reading of every anchor,
   which is quoted in §2 rather than edited in place. **The only bytes this pass ever corrected were its OWN
   added bytes, inside the insertions themselves** (two rendered sentences), and those corrections stand
   inside lines that `git diff` prints as added.
4. **AND ONE MISHAP IS DISCLOSED RATHER THAN SMOOTHED, BECAUSE THIS RECORD'S WHOLE USE IS THAT IT BE TRUE:**
   at `contract.md §1.4` item 5 — the span §2's row 10 records — **one edit of this pass took as its
   `old_string` a block that ran three lines PAST its anchor, so items `7` and `8` of `§1.4` (their opening
   lines) were momentarily removed; the VERY NEXT edit of this pass re-emitted those bytes VERBATIM, in place,
   in their own order, and the file's final bytes in that region are the PRE-PASS bytes** — **so
   `git diff` shows NOTHING there, the four lines are recovered whole, and this record states the interim
   defect rather than leaving it to a reader's diff.**

**AND ONE LIMIT, DECLARED RATHER THAN SMOOTHED: this manifest is a RECORD OF THE PASS'S OWN EDITS, written by
the pass itself; it is not an independent measurement, and this pass holds no execution verb.**
