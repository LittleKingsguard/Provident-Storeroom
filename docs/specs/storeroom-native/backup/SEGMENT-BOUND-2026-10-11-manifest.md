# BACKUP MANIFEST — the SEGMENT-DOMAIN-BOUND declaration pass of 2026-10-11 (`role_spec_writer`): the index class's upper bound declared as the domain's OWN clause, at its five cells

**WHY THIS FILE EXISTS, AND WHAT IT IS NOT.** **This pass's tool wall carries read/search plus doc writes only —
NO SHELL — so `cp` was unavailable and no byte-level backup copy could be taken.** **The standing rules
`DEF-14`/`DEF-15` are therefore discharged by the TWO mechanisms this file records:** **(1) EVERY EDIT OF THIS
PASS UNDER EITHER DIRECTORY IS A PURE ANNOTATE-BESIDE INSERTION** — no pre-pass byte of any file this pass
touched was re-worded, moved, replaced or deleted, so **`git diff` recovers every pre-pass byte as unchanged
context and every byte this pass added as an added line** — **and EVERY MATCHED ANCHOR IS RE-EMITTED in the text
it anchors** (`DEF-15`'s remedy); **and (2) THIS MANIFEST, which records each file's PRE-PASS LINE COUNT and
every insertion with the PRE-PASS ANCHOR it stands beside**, quoted by the anchor's own first words so the
anchor survives the shift its own insertion causes.

**THIS FILE IS NOT A PART, NOT A `DD` ROW, NOT A `PAR` ROW, NOT A `P-*` REGISTER ROW, NOT A `PAR-JS` ROW AND NOT
A CLAIM OF EITHER CONTRACT.** It lives in a SUBDIRECTORY (`backup/`) so neither directory's part-file set is
unmoved by its creation, and **it contributes to NEITHER side of either closure predicate** — it is not an entry
of either part map, not a file either map declares as a part, and not one of either table's recorded omissions.

---

## 1. The five cells this pass declares, each with the `§` where its declaration now stands

**THE RULING THIS PASS DECLARES, IN ONE LINE: the STORE's segment domain gains the UPPER BOUND as its OWN
clause — `0 ≤ n ≤ Number.MAX_SAFE_INTEGER` (`9_007_199_254_740_991`, `2^53 − 1`, INCLUSIVE) for an integral
segment — and the ARM THAT ANSWERS an integral segment above that bound is the walk's `L-1`, whose code is
`AddressMalformed`.** **The code already enforced it; the clause is what was owed.**

| # | The cell, as this pass found it | Where its declaration NOW stands |
| --- | --- | --- |
| **1** | **the PRIMARY: the segment domain's own upper bound** — `store-model.md §1.5` ITEM 1, whose as-filed text read *"a `string` (a key) and a non-negative integer (an index)"* with NO upper bound | **`docs/specs/storeroom-native/store-model.md §1.5`, item 1** — a dated clause ADDED to item 1 (post-pass `432`–`472`), declaring the bound, the arm that answers it, the enforcing site named as EVIDENCE ONLY, the priced alternative and the reversal point. **This item is the DOMAIN'S HOME.** |
| **2a** | **the twin: `contract.md §1.5` item 1** | **`docs/specs/storeroom-native/contract.md §1.5`, item 1** — a dated clause ADDED to item 1 (post-pass `1291`–`1315`), reconciling this document's copy to the SAME bound and **POINTING at `store-model.md §1.5` item 1 as the domain's home** so the two read as one declaration |
| **2b** | **the twin: `parameter-semantics.md §2.1`'s `PAR-1` `domain` ROW** | **`docs/specs/storeroom-native/parameter-semantics.md §2.1`** — a dated clause ADDED immediately after the row's authority tag (post-pass `137`–`160`), giving the row's `domain` cell the same bound, naming the ONE outside class the bound adds to the row's outside-value cell (`AddressMalformed` UNMOVED as its answer) and pointing at the same home |
| **3** | **the arm that ANSWERS the refusal: `store-model.md §2.2`'s `L-1`** — the arm table's own home (see item 3 of `§4` below for the citation's resolving form against the request's `write-and-read.md §2.2`) | **`docs/specs/storeroom-native/store-model.md §2.2`** — a dated clause ADDED at the section's foot, beside the arm table (post-pass `846`–`873`), naming `L-1` as the out-of-range integral segment's arm on all five routes and holding both homes apart: the domain's at `§1.5` item 1, the answer's here. **A POINTER CLAUSE IS ALSO ADDED at `docs/specs/storeroom-native/write-and-read.md`'s scope-boundary region (post-pass `57`–`68`)**, because a reader of the verbs arrives at that part first |
| **4** | **`crossing.md §1.3`'s RECONCILED-2026-10-11 clause** — its item 1's closing sentence and its item 2's last sentence | **`docs/specs/storeroom-js/crossing.md §1.3`** — a clause RE-DERIVED 2026-10-11 ADDED after that clause's foot tag (post-pass `250`–`335`), re-deriving both sentences with the as-filed forms re-emitted verbatim and naming the retired reading (see `§3` below) |
| **5** | **`package.md §4.5` item 2's `JsSegment` ROW** — the row the JS clause said the bound *"sits in front of"* | **`docs/specs/storeroom-js/package.md §4.5`, item 2** — a dated clause ADDED at item 2's foot (post-pass `570`–`618`), stating where the bound now stands at both ends of the crossing and that the store's shared predicate makes the cast TOTAL IN THE CONTRACT SENSE even though it still saturates arithmetically (see `§2` below) |

**AND THE BOUND, AS DECLARED, WITH THE ARM THAT ANSWERS IT:** **an index `n` is IN DOMAIN iff
`0 ≤ n ≤ Number.MAX_SAFE_INTEGER` (`9_007_199_254_740_991`, `2^53 − 1`, INCLUSIVE); an INTEGRAL SEGMENT ABOVE
THAT BOUND IS OUTSIDE THE SEGMENT DOMAIN, and the WALK's `L-1` ARM (`store-model.md §2.2`) ANSWERS IT
`AddressMalformed`** — **on every one of the five routes: the walk's `L-1` behind `read` · `readLiteral` ·
`findAddress`; `write`'s target arm and its parents' walk; `delete`'s target arm and its parents' walk;
`listen`'s per-segment loop; and the construction's `listeners[]` adoption.** **THE ENFORCING SITE, NAMED AS
EVIDENCE AND NEVER AS THE RULE'S HOME: `src/value.rs`'s `Segment::is_in_domain`, whose `Index` arm is
`n <= 9_007_199_254_740_991`** — **the ONE predicate all five routes ask.**

---

## 2. The files this pass touched, with PRE-PASS and POST-PASS line counts

| # | The file | Pre-pass lines | Post-pass lines | Added | The insertions, by their PRE-PASS anchor lines |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/specs/storeroom-native/store-model.md` | `864` | `935` | `+71` | **2 insertions** — (i) the `§1.5` item 1 clause, landing post-pass `432`–`472`, read beside pre-pass `430` (*"its alternative — refusing `""` — is priced at `DD-24(c)`)."*, the close of item 1's `⟶ AMENDED` dated clause; **`2. NO COERCION OCCURS.` now begins at post-pass `473` (pre-pass `442`)**; (ii) the `§2.2` clause on `L-1`'s carriage of the bound, landing post-pass `846`–`873`, read beside pre-pass `843` (*"`[P: §1, §13 · A23 · A25 \| CONTRACT]`"*, the foot of the walk's `§2.2`); **`### §2.3` now begins at post-pass `875` (pre-pass `804`); `END OF THE \`store-model\` PART` moves from `859` to `930`** |
| 2 | `docs/specs/storeroom-native/contract.md` | `3975` | `4000` | `+25` | **1 insertion** — the `§1.5` item 1 twin clause, landing post-pass `1291`–`1315`, read beside pre-pass `1290` (*"its alternative — refusing `""` — is priced at `DD-24(c)`)."*); **`2. NO COERCION OCCURS.` now begins at post-pass `1316` (pre-pass `1291`)** |
| 3 | `docs/specs/storeroom-native/parameter-semantics.md` | `588` | `614` | `+26` | **1 insertion** — the `§2.1` `PAR-1` clause, landing post-pass `137`–`161`, read beside pre-pass `135` (*"`[P: §1, §13 · A23 · A25; L: §1-bis · address; T \| CONTRACT]`"*, `PAR-1`'s authority tag); **`### §2.2 \`PAR-2\`` now begins at post-pass `163` (pre-pass `137`)** |
| 4 | `docs/specs/storeroom-native/write-and-read.md` | `1439` | `1453` | `+14` | **1 insertion** — the pointer clause naming the two homes, landing post-pass `58`–`69`, read beside pre-pass `56` (*"`[T: the pointer's form \| CROSS-REF]`"*, the scope-boundary region's tag foot); **`## §3. The write verb` now begins at post-pass `74` (pre-pass `60`)** |
| 5 | `docs/specs/storeroom-js/crossing.md` | `872` | `953` | `+81` | **1 insertion** — the RE-DERIVED `§1.3` clause, landing post-pass `248`–`326`, read beside pre-pass `248` (*"`DD-40` \| state or fail-state declaration]`)."*, the `RECONCILED` clause's foot tag); **the `TierArg` and `TierSetItem` paragraph now begins at post-pass `337` (pre-pass `250`)** |
| 6 | `docs/specs/storeroom-js/package.md` | `971` | `1021` | `+50` | **1 insertion** — the `§4.5` item 2 clause on where the bound now stands, landing post-pass `570`–`620`, read beside pre-pass `568` (*"and never converted; `DD-1`; `DD-40` \| declared parameter semantics]`)."*, item 2's `BigInt` declaration's foot tag); **`3. THE CONVERSION FUNCTIONS …` now begins at post-pass `620` (pre-pass `570`)** |
| 7 | `docs/specs/storeroom-native/backup/SEGMENT-BOUND-2026-10-11-manifest.md` (this file) | — (**CREATED by this pass**) | — | NEW | the pass's own backup record; **a subdirectory file, and it contributes to NEITHER side of either predicate** |
| 8 | `docs/specs/storeroom-js/backup/SEGMENT-BOUND-2026-10-11-manifest.md` | — (**CREATED by this pass**) | — | NEW | the JS directory's own record of the two insertions in that directory |
| 9 | every other file of `docs/specs/storeroom-native/**` and `docs/specs/storeroom-js/**` — `seams-and-lifecycle.md` · `implementation-plan.md` (each directory) · `surface.md` · `acceptance.md` · `test-cases.md` · `contract.md` (JS) · `parameter-semantics.md` (JS) and every `backup/` manifest | — | — | `0` | **UNTOUCHED — read, never amended** |
| 10 | `src/**` · `bindings/js/**` · `tests/**` · the four trackers · any byte under `../Provident-Electron/**` | — | — | `0` | **UNTOUCHED — read at the bytes where this pass verified the code, never written** |

**AND ONE HONESTY CLAUSE THE TABLE OWES:** **each pre-pass count is the figure the file carried at this pass's
own first read of it, and each post-pass count and insertion range is this pass's own reading of the file as it
now stands.** **No edit was made to a file this pass had not read whole or in the region it edited; every
anchor is re-emitted in the insertion that stands beside it, so `git diff` shows the anchor as unchanged
context and the insertion as added lines: NO PRE-PASS BYTE IS RE-WORDED, MOVED OR DELETED.**

---

## 3. `crossing.md`'s TWO SENTENCES RE-DERIVED, AND WHAT THEY RETIRE

**THE TWO SENTENCES, IN THEIR OWN WORDS, AND WHAT THE RE-DERIVATION DOES WITH EACH:**

1. **`RECONCILED` CLAUSE ITEM 1's CLOSING SENTENCE.** **THE AS-FILED TEXT:** *"WHAT THE STORE'S OWN Rust SURFACE
   DOES IS UNMOVED AND REMAINS THE STORE'S: `src/store.rs`'s `Segment::is_in_domain` admits every `u64`, so the
   CARRIER is wider than the boundary's declared bound — which is exactly the narrowing this clause declares
   (`package.md §4.5` item 2's `JsSegment` row is the carrier the bound sits in front of)."* **RE-DERIVED: the
   clause it quotes has MOVED — the predicate now admits `Index(n)` iff `n <= 9_007_199_254_740_991` — and its
   *"the CARRIER is wider than the boundary's declared bound"* no longer describes the tree.**
2. **`RECONCILED` CLAUSE ITEM 2's LAST SENTENCE.** **THE AS-FILED TEXT:** *"— the boundary itself, its answer
   and the code's behaviour are the same under both readings, so no drive and no green depends on the
   choice."* **RE-DERIVED: the boundary, its answer and the code's behaviour ARE still the same under both
   readings AND at both ends of the crossing (unmoved, and now true twice over); the OWNER sentence stands
   unmoved; and the one term that MOVED is *"no drive and no green depends on the choice"* — which is now
   true of the drives and FALSE OF ONE RED-SET CONTROL'S RECORDED READING** (item 3 below).

**THE READING OF THE STORE-SIDE THAT IS THEREBY RETIRED, NAMED SO NO READER TAKES TWO STATES FOR ONE:** **the
reading that *"THE STORE'S OWN CARRIER IS WIDER THAN THE BOUNDARY'S DECLARED BOUND"* — i.e. that
`Segment::Index`'s `u64` carrier's own range is the store's segment domain, so a JS `number` in
`(2^53 − 1, u64::MAX]` is IN DOMAIN at the store's Rust surface and the store is MORE PERMISSIVE than this
boundary — **IS RETIRED AS A READING OF THE TREE.** **WHAT STANDS IN ITS PLACE: the store's segment domain and
this boundary's declared bound COINCIDE at `[0, 2^53 − 1]`, and `Segment::Index`'s `u64` is the CARRIER's TYPE
WIDTH and is no longer the admitted domain.** **NOT WITHDRAWN WITH IT: the `RECONCILED` clause item 1's three
operative halves — the two sites' SAME class-then-RANGE decision, `listen`'s routing through
`encodeAddress`, and *"NO JS `number` REACHES THE STORE'S OWN `u64`-ONLY ARM"* — each of which is now true
TWICE OVER: the boundary refuses BEFORE the cast, and the store refuses at its own walk.**

**AND ONE RED-SET CONTROL NAMED WITH ITS `§`, BECAUSE THE RE-DERIVATION MOVES ITS EXPECTED READING AND THIS
PASS MAY NOT EDIT IT:** **`archive/gate3/storeroom-js-red-set.md`'s `NG-JS-L` saturation arm** records that
*"THE SATURATION ARM IS BACKSTOPPED TWICE AT `on` (the walk's own guard AND `encodeSegment`'s) and once more
at the store's carrier, so NO SINGLE-BYTE control reaches it"*, and **that record's `§`-citation of the store's
own guard as a non-refusing backstop is now stale — the store's `L-1` refuses the same value at the same
bound.** **The arm's SUBJECT is unmoved (an integral segment above the bound is REFUSED, not folded); its
recorded failure signature and its *"once more at the store's carrier"* half owe ONE re-derivation at
`role_test_writer`'s hand — no test byte and no red-set byte is written by this pass.**

---

## 4. THE CITATION RE-SPELLINGS — a REQUIREMENT list, each item checked off against the bytes

**WHY A LIST RATHER THAN A DIFF.** A reader must be able to check every citation form **by name**, never by
inferring it from a byte diff. **Every item below is a claim of THIS pass's own added bytes; not one of them
moves a pre-pass byte.**

| # | The citation | The as-filed form it is read against | The operative form this pass wrote | Check |
| --- | --- | --- | --- | --- |
| 1 | `store-model.md §1.5` item 1's as-filed sentence | *"The segment domain is closed at exactly two classes: a `string` (a key) and a non-negative integer (an index)."* | **RE-EMITTED verbatim in the new clause's own `RCA-8(d)` disclosure and read as the sentence the bound COMPLETES** | **CHECKED** — the quotation stands in the added clause at `store-model.md §1.5` item 1, and the as-filed sentence above it is unaltered |
| 2 | `store-model.md §2.2`'s `L-1` row | `L-1` fires at *"`a[i]` is outside the segment domain (`§1.5` item 1)"* and **fails `AddressMalformed`** | **RE-EMITTED verbatim in the new clause with the *"outside the segment domain (`§1.5` item 1)"* half quoted and read as the half the bound now fills** | **CHECKED** — the arm table's own row stands byte-for-byte; the new clause cites it and adds no row |
| 3 | the arm table's home | the request's `write-and-read.md §2.2`; the directory's actual home is `store-model.md §2.2` | **the bound's ANSWER is cited as `store-model.md §2.2`, and a POINTER clause is landed at `write-and-read.md`'s scope-boundary region naming BOTH homes**, so a reader who looks for `write-and-read.md §2.2` is resolved to the section that carries the arm and is served no second copy | **CHECKED** — `write-and-read.md`'s relocated spans are `contract.md §3`, `§4` and `§6`; the walk's arm table is `store-model.md §2.2`; the pointer clause prints both paths |
| 4 | `contract.md §1.5` item 1's as-filed sentence | *"The segment domain is closed at exactly two classes: a `string` (a key) and a non-negative integer (an index)."* | **read THROUGH the new twin clause, which POINTS at `store-model.md §1.5` item 1 and authors no second price and no second bound** | **CHECKED** — the twin's `alt` cell names the domain's own priced alternative and reversal point, and authors none of its own |
| 5 | `parameter-semantics.md §2.1`'s `domain` and outside-value cells | *"a `string` (a key) or a non-negative integer (an index)"* · *"an array containing a non-integer `number`"* | **read THROUGH the new clause: the `domain` cell gains the bound, the outside-value cell gains ONE class (the out-of-range INTEGRAL segment) with the reason it is not covered by *"a non-integer `number`"*, and the ANSWER cell is UNMOVED (`AddressMalformed`)** | **CHECKED** — `PAR-1`'s row stands; the count stays `14` rows (`12 + 1 + 1 = 14` ✓) |
| 6 | `crossing.md §1.3` `RECONCILED` item 1's closing sentence | quoted in full at `§3` item 1 above | **RE-EMITTED verbatim in the new clause, its two stale terms named, its one standing term named, and the RETIRED READING named with what stands in its place** | **CHECKED** — both as-filed sentences are re-emitted byte-for-byte as quoted text |
| 7 | `crossing.md §1.3` `RECONCILED` item 2's last sentence | quoted in full at `§3` item 2 above | **RE-EMITTED verbatim in the new clause, its two unmoved halves named and its one moved term named with its `§`** | **CHECKED** |
| 8 | `package.md §4.5` item 2's `JsSegment` row | *"`Index(u64)` (row 3)"* · *"`10` REFUSED classes beside the `2` admitted ones"* | **read THROUGH the new clause, which adds no variant, moves no count and states the bound's two positions and the cast's contract-sense totality** | **CHECKED** — the row and both count tables stand; `crossing.md §1.6`'s `56`-row census is unmoved (`14 + 7 + 4 + 6 + 6 + 12 + 5 + 2 = 56` ✓) |
| 9 | the store-side bound's own home | `src/value.rs`'s `MAX_SAFE_INTEGER` comment, whose own words say *"the store cell that owes this clause its own dated home is filed as a contract finding"* | **the OWED HOME IS NOW LANDED, and cited as EVIDENCE ONLY: `store-model.md §1.5` item 1 is the DECLARATION's home and the predicate is where the rule is ENFORCED** | **CHECKED** — no `src/**` byte is written by this pass; the code comment's owed-home sentence is now satisfied at the spec side |
| 10 | the `derivation:` clause, in each document that carries one | — | **SINGLE and UNMOVED: every insertion of this pass carries an authority tag and NO `derivation:` clause** | **CHECKED** — `contract.md` (native), `store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`, `implementation-plan.md` and `contract.md` (JS) each carry exactly ONE `derivation:` clause, at their own opening clause, unmoved |
| 11 | the seven-tag enum (native) and the five-form enum (JS) | — | **every added citation is inside its own document's enum:** native insertions carry `P` and `T`; the two JS insertions carry `A1` and `A3` | **CHECKED** — `0` `S:`-tagged citations are written (the native directory's count stays `0`), and `0` clauses cite a path this repository does not carry |
| 12 | the claim classes | — | **each insertion carries ONE class inline:** native — `DECLARED-DEFAULT` (the two domain clauses) and `CONTRACT` (`L-1`'s carriage), plus `CROSS-REF` (the `write-and-read.md` pointer); JS — `state or fail-state declaration` (both) | **CHECKED** — inside each document's closed class set |
| 13 | the predicate's own path, in the `RECONCILED` clause's as-filed sentence | *"`src/store.rs`'s `Segment::is_in_domain` admits every `u64`"* | **RE-EMITTED verbatim in the new clause and RE-SPELLED beside it: the predicate stands at `src/value.rs`'s `Segment::is_in_domain`**, so the two clauses' spellings of ONE home now agree and no citation points at a path that does not resolve | **CHECKED** — `src/value.rs` line `127` carries `pub fn is_in_domain(&self)`; `src/store.rs` calls it at its walk, its `write` arm and its `listen` loop; the as-filed sentence stands above byte-for-byte |

---

## 5. THE CLOSURE PREDICATE — BOTH DIRECTORIES, BOTH FIGURES, PRINTED

**BOTH PREDICATES HOLD. The figures below are `CENSUS` observations about the file sets and are not claims
about either unit's behaviour.**

| The directory | Its LEFT side (entry-counted) | Its RIGHT side, as its own operative clause states it | The raw-file reading, printed beside it | The predicate |
| --- | --- | --- | --- | --- |
| **`docs/specs/storeroom-native/`** | `{part-map PART entries}` = `{rows of the part map}` − `{the contract-document row}` = `6 − 1` = **`5`** | **`5`** — the `5` part entries (`store-model` · `write-and-read` · `seams-and-lifecycle` · `parameter-semantics` · `implementation-plan`) | **`6` `.md` files beside `contract.md` at the directory's root read as `5` part files + `contract.md`, so `{files present} − {contract.md}` = `5`** — the `2` files under `backup/` are subdirectory files and are counted by NEITHER side | **`5 = 5` ✓ HOLDS; state `CLOSED`** |
| **`docs/specs/storeroom-js/`** | `{part-map PART entries}` = `{rows of the part map}` − `{the contract-document row}` = `7 − 1` = **`6`** | **`6`** — the `5` `carrier` parts (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) + `implementation-plan` (a `carrier` part) + the `view` part `test-cases` | **`7`** `.md` files beside `contract.md` at the directory's root, EACH ONE AN ENTRY OF THE MAP, so the two countings agree at `7` entries / `7` files — the `10` files under `backup/` are subdirectory files and are counted by NEITHER side | **`6 = 6` ✓ HOLDS on the entry-counted AND the raw-file readings; state `CLOSED`** |

**AND THE `3` RECORDED OMISSIONS OF EACH DIRECTORY CONTRIBUTE TO NEITHER SIDE.** **This pass creates NO file at
either directory's root: the only two files it adds are the two `backup/` manifests above and below this line,
each a SUBDIRECTORY file that is neither a part entry nor a recorded omission** — **so both file sets' figures
and both maps' entry counts are UNMOVED by this pass.**

### 5.1 THE REGISTERS' ROW COUNTS, AND THE CAP

| The register | Its rows | The cap | The figure |
| --- | --- | --- | --- |
| **`docs/specs/storeroom-native/`'s typed register** (`§5.2`–`§5.9`) | `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-TP-6` · `P-TP-7` · `P-TP-8` · `P-TP-9` | `≤ 8` rows per unit | **`8` rows, `8 ≤ 8` ✓ — NO ROW ADDED, DROPPED OR RENUMBERED BY THIS PASS** |
| **`docs/specs/storeroom-js/`'s typed register** (`§5.1`–`§5.8`) | `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-SM-5` · `P-SM-6` · `P-TP-7` · `P-TP-8` | `≤ 8` rows per unit | **`8` rows, `8 ≤ 8` ✓ — NO ROW ADDED, DROPPED OR RENUMBERED BY THIS PASS** |

**AND EVERY ROW OF BOTH REGISTERS STAYS FAILABLE: this pass adds no row and changes no row's property, so
every failure list of both registers — and every cell that could be made to print `HELD` over an
unexhibitable state by a change here — is UNMOVED.** **The only cells this pass could have reached are the
`AddressMalformed`-bearing ones, and each of them keeps a REACHABLE trigger: a negative integer, a fractional
number, `null`, `undefined`, a boolean, an object, an array or a function as a segment is still outside the
domain and still answers the same member, and a segment at or below the bound is still admitted.**

**THE OTHER FIGURES, PRINTED SO NO COUNT IS ASSUMED:** **`PAR-1`…`PAR-14` stand at `14` (`12 + 1 + 1 = 14` ✓) ·
`PAR-JS-1`…`PAR-JS-18` stand at `18` (`15 + 1 + 1 + 1 = 18` ✓) · the closed fail set stands at `15` members
(`11 + 2 + 1 + 1 = 15` ✓) · the native typed register's `DD` range stands at `DD-1`…`DD-53` and the JS
directory's at `DD-1`…`DD-54`, NEITHER MOVED BY THIS PASS.**

**AND ONE FIGURE THIS MANIFEST DOES NOT RECONCILE, REPORTED RATHER THAN EDITED, AT ITS OWN `§`: `docs/specs/storeroom-native/parameter-semantics.md`'s closing count line (post-pass `613`) prints the design-defaults
table at `46` (`24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46` ✓) while the contract document's own index region and
`§0.2` census print the operative range as `DD-1`…`DD-53` (`24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 + 7 = 53`).** **THE
TWO FIGURES ARE THE NINTH AMENDMENT'S `+7` APART, and that discrepancy is NOT this pass's subject: no `DD`
row is authored, moved or renumbered here, and the reconciliation of that part's closing count belongs to the
store contract's author or its proofreader** (`docs/specs/storeroom-native/contract.md` §0's dated `DD`
range clause, item 7 of whose own `RCA-8(d)` reading prints `DD-1`…`DD-53`).

---

## 6. THE TOKENS THIS PASS CARRIES, EACH AT ITS OWN `§`

- **The bound:** `0 ≤ n ≤ Number.MAX_SAFE_INTEGER` (`9_007_199_254_740_991`, `2^53 − 1`, INCLUSIVE) — declared
  at `store-model.md §1.5` item 1; reconciled at `contract.md §1.5` item 1 and `parameter-semantics.md §2.1`.
- **The arm:** `L-1` — `store-model.md §2.2`, whose code is `AddressMalformed` (`seams-and-lifecycle.md §8.1`
  #1), pointed at from `write-and-read.md`'s scope-boundary region.
- **The JS-side re-derivations:** `crossing.md §1.3` (the two sentences, the retired reading) and
  `package.md §4.5` item 2 (where the bound stands; the cast total in the contract sense).
- **The closed seven/`six` class sets, the two enums, the single `derivation:` clause and both closure
  predicates:** UNMOVED, each printed above with its terms.
