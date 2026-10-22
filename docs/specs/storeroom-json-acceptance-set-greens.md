# GREENS — the blind-scenario set for the `file` tier's JSON CODEC as a declared contract (`JAS`), authored from the documentation alone

**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.** The inputs read for the
behaviour were `docs/specs/storeroom-native/seams-and-lifecycle.md` (`§7.2` item 2 — the commit's own
verification — and `§7.2` item 7 part (f) — the loader's acceptance set and the answer for a file the loader
refuses, read in WHOLE), `docs/specs/storeroom-native/contract.md` (`§8.1` rows `15` and `16`, and `§5.2`
`P-IM-1` with its 2026-10-22 clause), `docs/decisions.md` (`A140`, `A141`, `A143`, `A144` — the `A`-rows the
clauses name), `docs/specs/storeroom-js/crossing.md` (`§1.2` rows 1–5, `§1.4` item 5), `docs/specs/storeroom-js/surface.md`
(`§2.1`'s `cfg` block, `§2.2`'s verb block, `§2.11` clause 2), `docs/specs/storeroom-js/parameter-semantics.md`
(`§2.21`), `docs/specs/storeroom-native/store-model.md` (`§1.4`'s admitted taxonomy) and
`docs/specs/storeroom-constraints/kernel-surface.md` (`§2.1`'s five items), and the corpus's own greens-set
FORMAT (`docs/specs/storeroom-native-greens.md`, `docs/specs/storeroom-held-listener-identity-greens.md`,
`bindings/js/greens/file-tier-save/scenarios.mjs`).

**NO BYTE OF `src/**`, `tests/**`, `bindings/js/src/**`, `bindings/js/index.mjs`, `bindings/js/index.d.ts` OR ANY
TEST FILE WAS READ.** The package (`bindings/js/index.mjs`, the claimed ESM entry of
`docs/specs/storeroom-js/package.md §1.1`) and the kernel (`bindings/js/src/constraint-kernel.mjs`) were
**IMPORTED AND DRIVEN, never read**; the built addon was reached only through the package's own internal step.
**The only bytes this pass wrote inside the repository are this document and its runner,
`bindings/js/greens/json-acceptance-set-greens.mjs`.**

**⟶ RE-SPELLED 2026-10-22 — THE DEPTH CLASS'S COUNTING CONVENTION AND ITS REACH ARE NOW DECLARED, AND THREE
CELLS MOVE. THE RE-SPELLING IS DERIVED FROM THE DECLARATION, NOT FROM ANY MEASUREMENT.** **The inputs read for
this re-spelling were `docs/specs/storeroom-native/seams-and-lifecycle.md` `§7.2` item 7 (f) class (4) — its
COUNTING CONVENTION clause and the REACH clause that follows it, read in WHOLE — and
`docs/decisions.md` · `A143` (1) and `A144` (1), the two rows the class sentence itself cites.** **THE THREE
MOVING CELLS: `JAS-07.1` (was a LAYER-LIMIT ⇒ an ASSERTED cell), `JAS-07.2` (was an OBSERVED row ⇒ the SECOND
route, asserted) and `JAS-12.1` (was a GAP ⇒ CLOSED).** **`JAS-11.1` STAYS A LAYER LIMIT, AND NO OTHER CELL
MOVED.** **THE SET'S OTHER FORTY-SEVEN CELLS STAY AS THEY ARE — their text, their clauses and their verdicts are
untouched by this pass.**

**LAYER — THE SUMMARY LINE, STATED FIRST AND STATED ONCE.** **THIS SET VERIFIES THE JAVASCRIPT PACKAGE
LAYER: the built `storeroom-js-binding` reached through the package's own ESM entry and the JavaScript API
(`storeCreate` · `read` · `write` and the kernel's own commit route), in-process, against the `file` tier's
declared JSON codec contract. LAYER `ENVELOPE/PURE`; THE `APP` LAYER IS `NONE` AND NO `APP`-GREEN IS CLAIMED
ANYWHERE IN THIS FILE OR IN ITS RUNNER.** **A LIVE PASS HERE IS ADDITIVE AND APP-GREEN; IT NEVER RETIRES AN
ENVELOPE / NODE / TRIO ROW.**

**THE LAYER-HONESTY RULE THIS SET APPLIES.** **A JAVASCRIPT-LAYER CELL THAT CANNOT REACH A DECLARED BEHAVIOUR
IS A LAYER LIMIT — NOT A PASS AND NOT A FAILURE — AND IT IS RECORDED AS SUCH, WITH THE REASON NAMED FROM THE
DOCS.** **NO CELL OF THIS SET CLAIMS A PASS FOR A LAYER LIMIT, AND THE LAYER LIMIT IS PRINTED BY THE RUNNER IN
A BLOCK OF ITS OWN.** (AFTER THE RE-SPELLING OF 2026-10-22 THERE IS **ONE** LAYER LIMIT — `JAS-11.1`, the
commit's own verification — and the depth class is **NOT** ONE OF THEM.)

---

## §1. THE SCENARIO SET — 12 scenarios, 50 cells, each bound to its clause

| id | the clause(s) it derives from | the observable, in one line | the cell count and the verdict |
| --- | --- | --- | --- |
| **`JAS-01`** | **THE LOADER'S ACCEPTANCE SET, CLASS 1 — THE RAW CONTROL CHARACTER.** A raw control character inside a string is REFUSED (the clause names a literal `LF`, a literal `TAB` and a literal `NUL`) and the ESCAPED form `\u0000` is ACCEPTED; the FIVE SHORT ESCAPES are admitted on `A141`'s own spelling — `seams-and-lifecycle.md §7.2` item 7 (f) class (1); `A143` (1); `A141` (1) and (3) | a foreign image carrying a raw control character loads NOTHING (the register begins empty); the same image with the ESCAPED form loads both keys, the value carrying the escaped control character | **6 cells · 6 PASS** |
| **`JAS-02`** | **CLASS 2, THE GRAMMAR VIOLATION.** Eleven number spellings the JSON grammar does not admit are REFUSED — `01` · `+1` · `.5` · `1.` · `1e` · `Infinity` · `NaN` · `0x1` · `1_0` · `--1` · `1.2.3` — `seams-and-lifecycle.md §7.2` item 7 (f) class (2); `A143` (1) | each named spelling: the WHOLE file does not load and the register begins empty; a grammar-admitted spelling loads | **12 cells · 12 PASS** |
| **`JAS-03`** | **CLASS 2, THE OVERFLOW.** A spelling the grammar admits whose value does not fit is REFUSED — `1e400` · `1e999999999` · `1e309` — `seams-and-lifecycle.md §7.2` item 7 (f) class (2); `A143` (1) | each named spelling: the WHOLE file does not load and the register begins empty; a fitting spelling (`1e308`) loads and reads back | **4 cells · 4 PASS** |
| **`JAS-04`** | **CLASS 2, THE UNDERFLOW HALF — "ACCEPTED AND IS NOT A DIVERGENCE".** `1e-400` and `1e-324` BECOME `0` — `seams-and-lifecycle.md §7.2` item 7 (f) class (2); `A143` (1) | each named spelling is ACCEPTED, the key loads, and its value reads back `0`; a small-but-fitting exponent is accepted and is NOT zeroed | **3 cells · 3 PASS** |
| **`JAS-05`** | **CLASS 3 — THE TOKEN SEPARATOR.** EXACTLY FOUR separators are admitted (space · tab · `LF` · `CR`) and `U+00A0` is not one of them — `seams-and-lifecycle.md §7.2` item 7 (f) class (3); `A143` (1) | each admitted separator loads the image; `U+00A0` as a separator refuses the WHOLE file; `U+00A0` INSIDE a string is admitted (the acceptance set is the JSON grammar's) | **6 cells · 6 PASS** |
| **`JAS-06`** | **THE WIDENING CLASS BESIDE THE FOUR.** The loader ACCEPTS an escaped surrogate pair `\uD83D\uDE00`, which the pre-swap codec refused outright — `seams-and-lifecycle.md §7.2` item 7 (f); `A143` (1) | the key loads and its value IS THE PAIR (two code units, `0xD83D` and `0xDE00`) | **1 cell · 1 PASS** |
| **`JAS-07`** | **CLASS 4 — THE NESTING DEPTH, WITH ITS COUNTING CONVENTION NAMED.** "A NESTING DEPTH OF `128` OR MORE IS REFUSED" — **"THE LOADER'S COUNT IS `serde_json`'S OWN RECURSION COUNT, IN WHICH THE ROOT OBJECT IS THE FIRST LEVEL ⇒ `127` CONTAINERS (THE ROOT COUNTED) ARE ACCEPTED AND `128` CONTAINERS ARE REFUSED; IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127`"** — and the class's OWN REACH clause: **"THE FOREIGN-FILE ROUTE IS OPEN ⇒ THE CLASS IS OBSERVABLE FROM THE JAVASCRIPT LAYER"**, and the JavaScript layer's OWN ceiling as a **SECOND AND SEPARATE** figure — `seams-and-lifecycle.md §7.2` item 7 (f) class (4); `A143` (1); `A143` (3); `A144` (1); `crossing.md §1.4` item 5 | **THE LOADER'S BOUNDARY, ON THE FOREIGN-FILE ROUTE** — an image of `127` CONTAINERS (the root counted ⇒ walk-depth `126`) is **ACCEPTED** (the key loads and its value IS the nested array) and an image of `128` CONTAINERS (walk-depth `127`) is **REFUSED** (the whole file does not load, the register begins empty, the instance is returned, no error reaches the caller); **and the SECOND ROUTE, the PACKAGE'S OWN WALK** — walk-depth `64` is **ADMITTED** (the write succeeds and the value round-trips), walk-depth `65` and `66` are **REFUSED `ValueNotAdmitted`** (the store is never reached) — with what that route does **NOT** show named in the cell | **2 cells · 2 PASS** |
| **`JAS-08`** | **THE ANSWER FOR A FILE THE LOADER REFUSES — ARM (a).** "NO CONSTRAINT LIST ⇒ THE INSTANCE IS RETURNED, THE REGISTER BEGINS EMPTY, AND NO ERROR REACHES THE CALLER: the whole file does not load, the boot falls through, and `storeCreate` still returns an instance" — `seams-and-lifecycle.md §7.2` item 7 (f); `A143` (2); `§7.2` item 6 (the boot; `DD-29`) | over a refused image: the construction returns an INSTANCE and no error reaches the caller; the register begins EMPTY; the WHOLE file does not load (the sibling well-formed key is gone too); and the CONTROL — a PARSEABLE file with one non-admitted member loses THAT MEMBER only | **4 cells · 4 PASS** |
| **`JAS-09`** | **THE ANSWER FOR A FILE THE LOADER REFUSES — ARM (b).** "A CONSTRAINT LIST SUPPLIED ⇒ THE CONSTRUCTION ANSWERS `ConstraintListInvalid` (`§8.1` #16) AND NO INSTANCE IS RETURNED" — `seams-and-lifecycle.md §7.2` item 7 (f); `A143` (2); `contract.md §8.1` #16; `surface.md §2.1`'s `cfg` block (the FOURTH declared key `constraints`); `parameter-semantics.md §2.21` (`PAR-JS-21`); `contract.md §7.2` item 1 (the load-side predicate) | over the SAME refused image with a list naming at least one address: the construction answers `ConstraintListInvalid` and no instance is returned; the CONTROL — an EMPTY list has nothing to fail, so the instance IS returned and the answer stays in arm (a); the SECOND CONTROL — the SAME list over a parseable image that DOES carry the named address yields an instance, so the pair is a well-formed entry and the refusal is the LOAD-SIDE validation over the empty register | **3 cells · 3 PASS** |
| **`JAS-10`** | **THE STORE'S OWN IMAGE ROUND TRIPS.** "THE `file` TIER'S ROUND TRIP IS EXACT FOR EVERY ADMITTED VALUE WHOSE COMMITTED IMAGE THE LOADER ADMITS" — `contract.md §5.2` `P-IM-1` and its 2026-10-22 clause (a); `A144` (2); `A141` (1) (the escape image); `A140` (5) (the `-0` normalisation at the binding boundary) | a `file`-tier write committed by the terminal arm, then a FRESH boot over the same path: the value reads back exactly — for a string, a number, a boolean, a plain object, a plain array, a string carrying a CONTROL CHARACTER (the image escapes it and the loader admits the escaped form), and the ONE declared normalisation (`-0` reads back `0`) | **7 cells · 7 PASS** |
| **`JAS-11`** | **THE COMMIT'S OWN VERIFICATION.** The commit re-decodes the image it is about to rename over the path and refuses with the EXISTING `FileCommitFailed` when it does not load — `seams-and-lifecycle.md §7.2` item 2 (parts (1)–(2)); `A144` (1) and (4); `contract.md §8.1` #15; `crossing.md §1.4` item 5 | **OUT OF THIS LAYER'S REACH** (the cell says so and claims no pass) | **1 cell · 1 LAYER-LIMIT** |
| **`JAS-12`** | **THE GAPS IN THE DECLARATION ITSELF** — the clause that would have to say more is named at the cell | the depth class's counting convention — **THE GAP IS CLOSED** by the clause it named (`A144` (1), with the same convention carried by `A143` (1) and by the class sentence's own COUNTING CONVENTION clause), and the boundary it makes derivable is ASSERTED at `JAS-07.1` | **1 cell · 1 CLOSED** |

**COVERAGE AGAINST THE WAVE'S THREE DECLARED BEHAVIOURS.** (1) **THE LOADER'S ACCEPTANCE SET** — the four
narrowing classes as the JS surface can reach them, and the widening class → **`JAS-01`** (class 1, refused and
escaped), **`JAS-02`** (class 2's grammar violation, all eleven named spellings), **`JAS-03`** (class 2's
overflow), **`JAS-04`** (class 2's underflow half — accepted, and it becomes `0`), **`JAS-05`** (class 3, the
four admitted separators and the refused `U+00A0`), **`JAS-06`** (the escaped surrogate pair) and
**`JAS-07`** (class 4, the depth class — **ASSERTED, on the foreign-file route, at the declared boundary**).
(2) **THE ANSWER FOR A FILE THE LOADER REFUSES** → **`JAS-08`** (arm (a): the whole file does not load, the
register begins empty, the instance IS returned, no error reaches the caller) and **`JAS-09`** (arm (b): the
supplied constraint list ⇒ `ConstraintListInvalid`, no instance). (3) **THE STORE'S OWN IMAGE ROUND TRIPS** →
**`JAS-10`**.

---

## §2. THE RUN — `50` cells, `48` PASS, `0` FAIL, `1` LAYER-LIMIT, `1` CLOSED, `0` OBSERVED, `0` GAP

**THE RUNNER.** `bindings/js/greens/json-acceptance-set-greens.mjs`.
**RUN, from the repository root:** `node bindings/js/greens/json-acceptance-set-greens.mjs`.
**EVERY CELL PRINTS `RESULT <id> <verdict> :: <detail> :: <clause>`.** The verdicts are the corpus's own:
**`PASS`** (the clause's own observable was produced by a run) · **`FAIL`** (the run answered something the
clause does not declare) · **`LAYER-LIMIT`** (the clause's expectation is NOT reachable from this layer; the
reason is printed; **never counted as a pass**) · **`OBSERVED`** (the run's value is recorded and **not
asserted**; never counted as a pass) · **`GAP`** (no cell could be derived from the clause; the clause that
would have to say more is named) · **`CLOSED`** (**ADDED BY THE RE-SPELLING OF 2026-10-22** — the gap a cell
named is closed by the clause it named, and the closing clause is named in the cell; a documentary cell, and
**neither a pass nor a failure**).

**THE RAW SUMMARY LINE, AS THE RUNNER PRINTS IT:**

```
SUMMARY 50 cells · 48 PASS · 0 FAIL · 1 LAYER-LIMIT · 1 CLOSED · 0 OBSERVED · 0 GAP
```

**THE RUNNER'S EXIT CODE IS `0`**, and it is `0` because **no cell FAILed**; a `LAYER-LIMIT`, an `OBSERVED`, a
`GAP` and a `CLOSED` are not failures and do not move the exit (the house rule: *exit `0` iff no scenario is
`FAIL`*).

**THE RUN WAS EXECUTED FOUR TIMES AGAINST THE RUNNING PACKAGE, AND THE SUMMARY LINE WAS IDENTICAL ON ALL
FOUR.** (The three further runs of the re-spelled set — 2026-10-22 — printed the same line again, and the
runner left `0` scratch directories behind.)

**THE PACKAGE THE RUN WAS EXECUTED AGAINST, AND WHY IT IS PART OF THE RECORD.** **THE PACKAGE LOADS
`bindings/js/build/Release/storeroom_js_binding.node` — CONFIRMED BY THE RUNNER'S OWN PROCESS, whose
`/proc/self/maps` names the mapped artefact — AND THAT FILE IS A BUILD OUTPUT (git-ignored, per
`bindings/js/.gitignore`: *"NO BINARY IS EVER COMMITTED TO THE TRACKED TREE"*), staged by the project's own
documented step (`scripts/publish.sh`: `cp -f bindings/js/target/release/libstoreroom_js_binding.so
bindings/js/build/Release/storeroom_js_binding.node`).** **ON THIS RE-RUN THE STAGED ARTEFACT WAS CHECKED
AGAINST THE FRESH BUILD OUTPUT AND WAS BYTE-IDENTICAL TO IT (`md5 83019d359bc304adf5115f4da07590d5` for
both), AND IT POST-DATES THE CURRENT SOURCES (`src/store.rs`, 2026-10-22 05:22; the build output 05:53; the
staged copy 06:11) — SO NO REBUILD AND NO RE-STAGING WAS NEEDED, AND THIS PASS WROTE NO BYTE OUTSIDE THE
TWO ARTEFACTS IT OWNS.** (THE FIRST RUN OF THIS SET DID RE-STAGE, because the staged copy was then dated
before the current sources; that is recorded in the first run's own §2 and is not repeated here.)
**NO SOURCE FILE WAS TOUCHED BY THIS PASS: the two artefacts this pass wrote are this document and its runner.**

**THE FIGURE CENSUS, printed with its terms.** **`12` scenarios · `50` cells, of which `48` PASS, `0` FAIL,
`1` LAYER-LIMIT, `1` CLOSED, `0` OBSERVED, `0` GAP.**

| id | cells | PASS | FAIL | LAYER-LIMIT | CLOSED | OBSERVED | GAP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`JAS-01`** | 6 | 6 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-02`** | 12 | 12 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-03`** | 4 | 4 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-04`** | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-05`** | 6 | 6 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-06`** | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-07`** | 2 | **2** | 0 | 0 | 0 | 0 | 0 |
| **`JAS-08`** | 4 | 4 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-09`** | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-10`** | 7 | 7 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-11`** | 1 | 0 | 0 | **1** | 0 | 0 | 0 |
| **`JAS-12`** | 1 | 0 | 0 | 0 | **1** | 0 | 0 |
| **TOTAL** | **50** | **48** | **0** | **1** | **1** | **0** | **0** |

`6 + 12 + 4 + 3 + 6 + 1 + 2 + 4 + 3 + 7 + 1 + 1 = 50` ✓ and `48 + 0 + 1 + 1 + 0 + 0 = 50` ✓.

### §2.1 THE METHOD, IN FIVE CLAUSES

1. **THE TWO MODULES, AND NOTHING ELSE.** The package's claimed ESM entry (`../index.mjs`) and the kernel
   module's declared checkout home (`../src/constraint-kernel.mjs`), reached through the call shapes
   `kernel-surface.md §2.1` prints (`K-1 register(store, address, id, constraint)` · `K-2 commit(store, address,
   tier, value)` · `K-3 runAttempt(store, commit)`). No third module is imported, no path is spelled in a drive,
   no module interception and no monkey-patch is used.
2. **THE FOREIGN IMAGE IS THE ONLY ROUTE TO THE LOADER, AND THAT IS THE CLAUSE'S OWN ROUTE.** A143 (3) and
   A144 (3) say the refusal class is confined to FOREIGN files — *"a file the loader refuses and the store did
   not write — is a FOREIGN file"* — and the store's own writer never produces a refused file. Every cell of
   `JAS-01`…`JAS-06`, `JAS-07.1` and `JAS-08`/`JAS-09` therefore writes the image's BYTES at a fresh path and
   boots the store over it, which is the declared shape of the acceptance set's subject.
3. **THE STORE'S OWN IMAGE IS WRITTEN THE WAY THE DOCS SAY IT IS WRITTEN.** The `file`-tier save is the
   terminal arm's act (`surface.md §2.11` clause 2), so `JAS-10`'s image is committed through the kernel's own
   commit route, and the round trip is measured by a FRESH `storeCreate` over the same path.
4. **THE SCRATCH AREA.** Every path is created in a `fs.mkdtempSync` directory under the platform temp root
   and removed at the end of the run; **nothing is written inside the repository by the run.**
5. **THE VERDICT RULE.** A divergence is a FINDING with the clause on each side and is never a pass; **no
   assertion was weakened to make a cell pass, and no failing cell was re-worded after it was seen.** The one
   correction this pass made to the DRIVER (never to an expectation) was a template-literal syntax error in the
   runner's own clause strings, fixed before the first complete run.
6. **THE DEPTH FIGURES ARE COUNTED, NOT ASSUMED, AND THE TWO ROUTES ARE KEPT APART (the re-spelling of
   2026-10-22).** **THE CONTAINER COUNT OF THE FOREIGN IMAGE IS COUNTED IN THE BYTES THE DRIVE WRITES** (the
   number of `[` and `{` in the image), and the drive asserts that count as well as the clause's figure — so the
   cell fails if the image is not the image the cell claims. **THE TWO ROUTES ARE SEPARATE CELLS AND SEPARATE
   CLAUSES: `JAS-07.1` is the LOADER's route (a FOREIGN FILE, read off a path) and `JAS-07.2` is the PACKAGE'S
   OWN WALK's route (a VALUE handed to a verb), and NO FIGURE FROM ONE ROUTE IS ASSERTED ON THE OTHER.**

### §2.2 THE DRIVE'S DISCRIMINATORS, NAMED PER SCENARIO — so a reader can see that a cell is not vacuous

**EVERY CELL THAT ASSERTS A REFUSAL IS READ BESIDE A CELL THAT ASSERTS THE OPPOSITE ARM OF THE SAME CLAUSE.**
`JAS-01.1`/`.2`/`.3` (refused) beside `JAS-01.4`/`.5`/`.6` (admitted); `JAS-02.1`–`.11` (refused) beside
`JAS-02.12` (admitted); `JAS-03.1`–`.3` (refused) beside `JAS-03.4` (admitted); `JAS-04.1`/`.2` (accepted, and
`0`) beside `JAS-04.3` (accepted, and NOT `0`); `JAS-05.1`–`.4` (the four admitted separators) beside
`JAS-05.5` (the refused separator) and `JAS-05.6` (the same character admitted in a string); `JAS-08.1`–`.3`
(the WHOLE file does not load) beside `JAS-08.4` (a parseable file loses ONE member and keeps the rest);
`JAS-09.1` (`ConstraintListInvalid`) beside `JAS-09.2` (an empty list ⇒ the instance is returned) and
`JAS-09.3` (the same list over an image that carries the named address ⇒ the instance is returned, so the
refusal at `JAS-09.1` is the LOAD-SIDE validation and not a refusal of the list's own shape).

**AND THE DEPTH CLASS'S TWO ARMS, ON BOTH OF ITS ROUTES.** **`JAS-07.1` DRIVES BOTH ARMS OF THE ONE
BOUNDARY — the image of `127` CONTAINERS (walk-depth `126`) is ACCEPTED and the image of `128` CONTAINERS
(walk-depth `127`) is REFUSED — IN ONE CELL, AND THE CELL PASSES ONLY IF BOTH HOLD, so a reader sees the
boundary and not a half of it. `JAS-07.2` DRIVES THE THREE ARMED FIGURES THE WALK'S OWN TABLE NAMES — walk-depth
`64` ADMITTED (the write succeeds and the value round-trips), walk-depth `65` REFUSED and walk-depth `66`
REFUSED — and the refused arms are read against the ADMITTED arm of the same route.**

### §2.3 THE LIVE REPORT, COMPARED WITH THIS RE-RUN — **THE FIGURES AGREE; THE CELL MAP AND ONE VERDICT TOKEN
DIFFER, AND THE DIFFERENCES ARE NAMED**

**THE LIVE REPORT (`docs/specs/storeroom-json-acceptance-set-live-report.md`) IS NOT THIS PASS'S ARTEFACT AND WAS
NOT EDITED BY IT.** It is the live runner's own record of an independent re-drive of this set's scenarios.

**THE FIGURES AGREE, EXACTLY, ON THE ROUTE BOTH RUNS MEASURED.** **THE LIVE REPORT'S MEASURED BRACKET OVER THE
FOREIGN-FILE ROUTE IS `126` → LOADED, `127` → LOADED, `128` → REFUSED, `129` → REFUSED (the root object counted
as the first level).** **THIS RE-RUN'S CELL ASSERTS THE TWO DECLARED FIGURES DIRECTLY — `127` CONTAINERS ACCEPTED, `128` CONTAINERS
REFUSED, WITH THE CONTAINER COUNT COUNTED IN THE BYTES — AND THE NEIGHBOURING FIGURES ON THE SAME ROUTE WERE
MEASURED WHILE THE CELL WAS WRITTEN: `125` → LOADED, `126` → LOADED, `129` → REFUSED (the root object counted as
the first level).** **BOTH RUNS MEASURE THE SAME BOUNDARY — `127` CONTAINERS ACCEPTED, `128` CONTAINERS REFUSED —
AND BOTH MATCH THE DECLARED FIGURES.** **THE FIRST RUN OF THIS SET MEASURED THE SAME BOUNDARY IN THE OTHER SPELLING (an image of
`126` NESTED ARRAYS is an image of `127` CONTAINERS): see `§3.0`.**

**THE TWO DIFFERENCES, NAMED, NEITHER OF THEM A CONTRADICTION OF A FIGURE:**

1. **THE CELL MAP OF `JAS-07.2` IS NOT THE SAME SUBJECT IN THE TWO ARTEFACTS.** **THE LIVE REPORT MAPS
   `JAS-07.1` = THE LOADER'S REFUSED ARM (`128` CONTAINERS) AND `JAS-07.2` = THE LOADER'S ACCEPTED ARM
   (`127` CONTAINERS).** **THIS SET, RE-SPELLED ON THE BRIEF'S OWN TERMS, MAPS `JAS-07.1` = THE LOADER'S BOUNDARY
   (BOTH ARMS, ONE CELL) AND `JAS-07.2` = THE SECOND ROUTE (THE PACKAGE'S OWN WALK).** **THE VERDICTS AGREE —
   `PASS` AND `PASS` — AND THE FIGURES AGREE; ONLY THE CELL THAT CARRIES WHICH SUBJECT DIFFERS.** (THE LIVE
   REPORT'S WALK-SIDE OBSERVATION IS ITS OWN EXTRA CELL, `JAS-11.x1`: a `file`-tier write at depth `64` does not
   throw and depths `65` and `127` are refused with `ValueNotAdmitted` — THE SAME THREE FIGURES THIS SET
   ASSERTS AT `JAS-07.2`.)
2. **THE VERDICT TOKEN FOR `JAS-12.1` DIFFERS, AND THE SUBSTANCE DOES NOT.** **THE LIVE REPORT RECORDS
   `JAS-12.1` AS `PASS` ("the set's `GAP` is closed by the second branch the gap cell itself named"); THIS SET
   RECORDS IT AS `CLOSED`.** **BOTH NAME THE SAME CLOSING CLAUSE (`A144` (1)`, with the convention carried by
   `A143` (1)` and by the class sentence's own counting-convention clause) AND BOTH MEAN THAT THE GAP IS CLOSED;
   `CLOSED` IS THIS SET'S OWN TOKEN FOR A DOCUMENTARY CELL THAT IS NEITHER A PASS NOR A FAILURE.** **THE CELL
   COUNTS ALSO DIFFER BY THE LIVE RUNNER'S OWN TWO EXTRA CELLS (`52` there, `50` here).**

---

## §3. THE LAYER LIMITS — named, with the reason cited from the docs, and claiming no pass

**AFTER THE RE-SPELLING OF 2026-10-22 THERE IS ONE LAYER LIMIT IN THIS SET — `JAS-11.1`, the commit's own
verification. THE DEPTH CLASS IS **NOT** ONE: the class's own REACH clause declares the FOREIGN-FILE ROUTE open
and the class observable from this layer, and the class is asserted at `JAS-07.1`.**

### §3.0 THE DEPTH CLASS, RE-SPELLED — **TWO ROUTES, TWO CEILINGS, AND THE DERIVATION OF EACH FIGURE FROM THE
DECLARATION** (`seams-and-lifecycle.md §7.2` item 7 (f) class (4))

**THE CLASS SAYS, IN ITS OWN WORDS (read in WHOLE, with the clause that follows it):** *"A NESTING DEPTH OF `128`
OR MORE IS REFUSED — **AND THE COUNTING CONVENTION IS NAMED: THE LOADER'S COUNT IS `serde_json`'S OWN RECURSION
COUNT, IN WHICH THE ROOT OBJECT IS THE FIRST LEVEL ⇒ `127` CONTAINERS (THE ROOT COUNTED) ARE ACCEPTED AND `128`
CONTAINERS ARE REFUSED; IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS
WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127` — THE LOADER'S LEVEL IS THE WALK-DEPTH PLUS ONE**"*
— and then the class's OWN REACH clause: *"**AND CLASS (4)'S OWN SCOPE IS MADE EXPLICIT, AND ITS REACH IS
DECLARED: THE FOREIGN-FILE ROUTE IS OPEN — A HAND-WRITTEN FILE IS AN EXTERNAL EVENT, AND THE LOADER'S REFUSAL OF
IT IS A PLAIN OBSERVABLE — SO THE CLASS IS OBSERVABLE FROM THE JAVASCRIPT LAYER; AND THE JAVASCRIPT LAYER'S OWN
CEILING IS A SECOND AND SEPARATE FIGURE — THE PACKAGE'S OWN WALK REFUSES A VALUE OF DEPTH `65` BEFORE ANY VERB
IS CALLED, SO THE JAVASCRIPT LAYER CANNOT HAND THE STORE A `128`-DEEP VALUE, AND THE LOADER'S `128` AND THAT
WALK'S `65` ARE NOT THE SAME FIGURE AND NEITHER BOUNDS THE OTHER; AND THE COMMIT'S VERIFICATION REMAINS
UNREACHABLE FROM THE JAVASCRIPT LAYER (`A144` (1))**"*. The SAME convention is carried by `docs/decisions.md` ·
`A143` (1) and `A144` (1).

**THE TWO ROUTES, AND WHAT EACH ONE SHOWS — AND THEY ARE NOT MERGED.**

1. **THE LOADER'S ROUTE — A FOREIGN FILE READ OFF A PATH (`JAS-07.1`, ASSERTED, `PASS`).** The image is
   hand-written bytes at a fresh path and booted through the package's own `storeCreate`; the container count is
   COUNTED IN THE BYTES the drive writes, and the drive asserts that count beside the clause's figure. **The
   boundary this route shows is the loader's own: `127` CONTAINERS (the root counted ⇒ walk-depth `126`) LOAD and
   `128` CONTAINERS (walk-depth `127`) DO NOT LOAD** — the whole file does not load, the register begins empty,
   the instance is returned and no error reaches the caller (arm (a) of the refused-file answer). **This route
   shows NOTHING about the package's own walk, and nothing on the other route is asserted on it.**
2. **THE PACKAGE'S OWN WALK'S ROUTE — A VALUE HANDED TO A VERB (`JAS-07.2`, ASSERTED, `PASS`).** The value is
   handed to the package's own `write` verb; the walk's ceiling is `crossing.md §1.4` item 5's own table: walk-depth
   `63`/`64` **ADMITTED** (the write succeeds and the value round-trips), walk-depth `65` **REFUSED**
   `ValueNotAdmitted`, walk-depth `66` and beyond **REFUSED `ValueNotAdmitted`** — the same code and the same
   form, by the other arm. **WHAT THIS ROUTE DOES NOT SHOW: THE LOADER'S BOUNDARY. The refused value never
   reaches the store — no image is written on the path and no node is installed in the register — so the LOADER
   NEVER READS ONE, and this route therefore says NOTHING about the `127`/`128` boundary.** The two figures are
   different figures on different routes, and **neither bounds the other** — the class's own words.

**THE DERIVATION OF THE TWO FIGURES FROM THE DECLARATION, AND THE FIRST RUN'S OWN FIGURES, RE-DERIVED.** **THE
FIRST RUN OF THIS SET MEASURED, OVER THE FOREIGN-FILE ROUTE, "IMAGES OF `126` · `127` · `128` NESTED ARRAYS:
`126` LOADS, `127` AND `128` DO NOT" — AND THAT IMAGE WAS SPELLED AS A ROOT OBJECT CARRYING `N` NESTED ARRAYS, SO
ITS CONTAINER COUNT IS `N + 1`: `126` NESTED ARRAYS IS AN IMAGE OF `127` CONTAINERS (the LAST ACCEPTED), AND
`127` NESTED ARRAYS IS AN IMAGE OF `128` CONTAINERS (the FIRST REFUSED).** **THE RE-SPELLED CELL COUNTS THE
CONTAINERS DIRECTLY AND MEASURED EXACTLY THE DECLARED BOUNDARY: `127` CONTAINERS LOAD, `128` CONTAINERS DO NOT.**
**SO THE FIRST RUN'S FIGURES AND THE DECLARED FIGURES ARE THE SAME BOUNDARY, WRITTEN IN THE OTHER SPELLING, AND
NO CELL OF THIS SET EVER ASSERTS A BOUNDARY THE ROUTE DOES NOT SHOW.**

### §3.1 `JAS-11.1` — **THE COMMIT'S OWN VERIFICATION** (`seams-and-lifecycle.md §7.2` item 2)

**THE REASON, CITED.** **THE SAME CEILING: `crossing.md §1.4` item 5.** The commit's verification fires only
for an image the LOADER would refuse, and the loader's ceiling is `128` nested containers (`A144` (1)) while
the package's own walk refuses a value of depth `65` before any verb is called. The store admits a value of any
depth (`A143` (1)), so the only route by which the JS surface could hand the store such a value is closed by
the package's own walk: **the JS layer cannot cause the commit's refusal.** **`A144` (1) says the same in its own
words: *"THE JS SURFACE CANNOT REACH IT — THE NATIVE LIBRARY'S OWN API WAS."*** **AND THE CLASS (4) ARM'S OWN
REACH CLAUSE NOW SAYS IT TOO, IN ITS OWN WORDS: *"AND THE COMMIT'S VERIFICATION REMAINS UNREACHABLE FROM THE
JAVASCRIPT LAYER (`A144` (1))"*.** **THIS CELL IS A LAYER LIMIT AND NOT A PASS AND NOT A FAILURE.** (The two
cells of `§7.2` item 2 that WOULD have been driven — the re-decode itself and the rollback-then-answer order —
are the same act, and so they stand or fall with this one.) **THE DEPTH CLASS ITSELF IS NOT THIS LIMIT: it is
observable from this layer on the FOREIGN-FILE route, and it is asserted at `JAS-07.1`.**

### §3.2 THE THIRD LIMIT NAMED IN THE BRIEF — **ARM (b) IS NOT A LAYER LIMIT, AND THIS SET SAYS SO**

**THE BRIEF NAMED THREE LIMITS. **ONE OF THE FIRST TWO STILL HOLDS AND IS ABOVE — `JAS-11.1`, the commit's own
verification; THE OTHER, THE DEPTH CLASS, **IS NO LONGER A LIMIT**, because the class's own REACH clause declares
the foreign-file route open and the class is now ASSERTED at `JAS-07.1` (see `§3.0`).** THE THIRD — "ARM (b) OF
THE REFUSED-FILE ANSWER … the JavaScript surface exposes no constraint list ⇒ OUT OF REACH" — IS NOT SUPPORTED BY
THE DOCS, AND THE SET SAYS SO INSTEAD OF RECORDING A LIMIT THAT DOES NOT EXIST.**

**WHAT THE DOCS SAY, CITED.** **`docs/specs/storeroom-js/surface.md §2.1`'s `cfg` block declares FOUR declared
keys — `filePath` · `journalLength` · `listeners` · `constraints` — and `constraints` is `ConstraintEntry[]`,
"the store's constraint list, ONE element per pair: `{ address, id }`. Validated at create AND at load"; the
clause of the same date adds that the fourth key was added by `RCA-9` and that the list "is validated at
create and at load, and its answer is the store's own code".** `docs/specs/storeroom-js/parameter-semantics.md
§2.21` (`PAR-JS-21`) carries that key's domain. **THE JS SURFACE THEREFORE DOES EXPOSE A CONSTRAINT LIST, AND
ARM (b) IS REACHABLE FROM THIS LAYER.**

**SO THE CELL IS DRIVEN, AND IT PASSES.** `JAS-09.1`: over the SAME refused image, with
`cfg.constraints = [{ address: ['x'], id: 'c1' }]`, the construction answers **`ConstraintListInvalid`**
(`contract.md §8.1` #16) and **no instance is returned** — the observed thrown form carried
`status="ConstraintListInvalid"`. `JAS-09.2`, the control, holds the other half: over the SAME refused image
with an EMPTY list, the instance IS returned and the register is empty (arm (a)). `JAS-09.3`, the second
control, closes the route: the SAME supplied list over a PARSEABLE image that DOES carry the named address
yields an INSTANCE, **so the pair is a well-formed entry and the refusal at `JAS-09.1` IS the LOAD-SIDE
validation over the empty register — the very mechanism `A143` (2) names — and not a refusal of the list's own
shape.** **THE CORPUS'S OWN SET ALREADY DRIVES THIS ROUTE AT THE `file`-TIER SAVE: `FTS-09.8`
(`bindings/js/greens/file-tier-save/scenarios.mjs`) drives a PRESENT, NON-ZERO-LENGTH image against a list
naming one pair and asserts `ConstraintListInvalid` with no instance, and `FTS-09.7` drives the SAME PAIR
against an image that carries the named key and asserts an INSTANCE — the pair's own admission at create.** **THIS
IS RECORDED AS A DRIVEN CELL AND NOT AS A LIMIT, BECAUSE A LIMIT THAT IS NOT TRUE IS A FALSE STATEMENT IN A GATE
ARTEFACT, AND THE BRIEF'S OWN RULE MAKES THE LIMIT CONDITIONAL — "a JavaScript-layer cell that CANNOT reach a
declared behaviour".** **THE SUPERVISOR MAY RULE OTHERWISE; THE DOCS AND THE LIVE BYTES ARE BOTH AGAINST IT.**

---

## §4. THE GAPS IN THE DECLARATION ITSELF — none open; the one this set named is CLOSED, with the clause named

### `JAS-12.1` — **THE DEPTH CLASS'S COUNTING CONVENTION — CLOSED** (verdict: `CLOSED`)

**THE CLAUSE THAT CLOSED IT, NAMED.** **THE GAP CELL NAMED ITS OWN SECOND BRANCH — *"`A144` (1) would have to state
that its walk-depth figure IS its nested-container figure"* — AND `A144` (1) NOW STATES IT:** *"THE LOADER'S
CEILING IS `serde_json`'S RECURSION GUARD AT `128` LEVELS OF NESTED CONTAINERS — **THE COUNTING CONVENTION IS
DECLARED, AND IT IS ONE BOUNDARY IN TWO CONVENTIONS: the loader's count is `serde_json`'s own recursion count, in
which THE ROOT OBJECT IS THE FIRST LEVEL ⇒ an image of `127` CONTAINERS (the root counted) IS ACCEPTED and an
image of `128` CONTAINERS IS REFUSED; IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED
VALUE IS WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127` — the loader's level is the walk-depth plus
one**"*.** THE SAME CONVENTION IS CARRIED BY `A143` (1) — *"THE ROOT OBJECT IS THE FIRST LEVEL, SO THE REFUSED
IMAGE IS THE `128`th LEVEL OF NESTED CONTAINERS (THE ROOT COUNTED) — EQUIVALENTLY, IN THE CORPUS'S WALK-DEPTH
CONVENTION (THE ROOT AT `0`), THE FIRST REFUSED VALUE IS WALK-DEPTH `127` AND THE LAST ACCEPTED IS WALK-DEPTH
`126`"* — AND BY THE CLASS SENTENCE ITSELF AT `seams-and-lifecycle.md §7.2` item 7 (f) class (4), whose own
COUNTING CONVENTION clause now reads: *"THE LOADER'S COUNT IS `serde_json`'S OWN RECURSION COUNT, IN WHICH THE
ROOT OBJECT IS THE FIRST LEVEL ⇒ `127` CONTAINERS (THE ROOT COUNTED) ARE ACCEPTED AND `128` CONTAINERS ARE
REFUSED; IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS WALK-DEPTH `126` AND
THE FIRST REFUSED IS WALK-DEPTH `127` — THE LOADER'S LEVEL IS THE WALK-DEPTH PLUS ONE"*.**

**WHY THE GAP IS CLOSED AND NOT PAPERED OVER.** **THE RELATION THE GAP NAMED IS NOW STATED IN THREE PLACES, IN
FIGURES, SO A BOUNDARY CELL IS DERIVABLE FROM THE CLAUSE AND NOT CHOSEN BY THE DRIVE** — and the derived boundary
IS asserted, on the route the class's own REACH clause declares open, at `JAS-07.1`: an image of `127` CONTAINERS
loads and an image of `128` CONTAINERS does not. **THE GAP CELL'S VERDICT IS `CLOSED` — A DOCUMENTARY VERDICT, AND
NEITHER A PASS NOR A FAILURE.**

**AND THE RESIDUAL-GAP QUESTION, ANSWERED PLAINLY: THERE IS NO RESIDUAL GAP IN THE COUNTING CONVENTION, AND THIS
SET NAMES NONE ELSE.** **THE DEPTH CLASS IS NOW FULLY DERIVABLE: its boundary (the loader's `127`/`128` in
containers, the corpus's walk-depth `126`/`127`), its reach (the foreign-file route is open ⇒ observable from this
layer), and the second, separate figure (the package's own walk's `65`, on the other route) are each stated by a
clause, and each is asserted by a cell.** **WHAT REMAINS OUT OF REACH IS NOT A GAP IN THE DECLARATION BUT A LIMIT
OF THIS LAYER, AND IT IS NAMED AS ONE: the commit's own verification (`JAS-11.1`), whose unreachability the class's
own REACH clause now states in its own words.**

---

## §5. WHAT THIS SET DID NOT DRIVE, AND WHY

1. **THE COMMIT'S OWN VERIFICATION AS AN ASSERTED CELL** — the limit at `JAS-11.1`. (THE DEPTH CLASS IS **NO
   LONGER** IN THIS LIST: it is asserted, at `JAS-07.1` and `JAS-07.2`, since the class's own REACH clause
   declared the foreign-file route open.)
2. **ANYTHING THE DOCS DECLINE TO GIVE AN OBSERVABLE FOR.** **THE CLASS'S OWN SET IS WIDER THAN THE
   DIVERGENCE SET** (`seams-and-lifecycle.md §7.2` item 7 (f): *"the class names the SHIPPED decoder's grammar,
   and a spelling BOTH builds refuse is not a divergence"*), so a spelling the class does not name is not a
   cell here; and the clause's own boundary of the control-character class names `LF`, `TAB` and `NUL` — the
   rest of the `< 0x20` range is covered here only through the JSON grammar's own rule (`A143` (1)) and through
   the five short escapes (`JAS-01.6`).
3. **THE `mem`/`temp` TIERS' `-0` HALF** (`contract.md §5.2` `P-IM-1` (b): *"a `mem`/`temp` `-0` reads back
   `-0`"*) — **NOT REACHABLE FROM THIS LAYER, AND THE REASON IS THE DOCS'**: `A140` (5) — *"The binding's
   conversion core normalizes `-0.0` to `0.0` in BOTH directions, so no binding path admits or returns a
   negative zero"* — and `crossing.md §1.2` row 3's clause of 2026-10-21: *"`-0` CROSSES AS `0` AT THE BINDING
   BOUNDARY"*. **The JS layer never carries a negative zero, so it cannot observe the `mem`/`temp` half; the
   `file`-tier half is asserted at `JAS-10.7`.**
4. **THE LOADER'S ANSWER FOR A LONE SURROGATE** (an unpaired `\uD83D`) — **the class names the PAIR only**;
   the lone surrogate's answer is not named by `§7.2` item 7 (f), so no cell asserts it.
5. **THE `APP` LAYER, WHICH IS `NONE`**, and any cost, timing or order.

---

## §6. THE SELF-VERIFICATION FINDING AGAINST THIS ARTEFACT (not an assertion; a review finding by construction)

**THE BRIEF'S OWN RULE: "A self-verified greens set (authored by the same agent who implemented) is a review
finding."** **The implementing agent and the authoring agent here are DIFFERENT ROLES — `role_blind_test_writer`
authored and ran this set and wrote no line of the implementation — but THEY ARE THE SAME SESSION AND THE SAME
PASS, and that is the whole of the mitigation.** **What is verifiable by a reader: the runner is a tracked
artefact at `bindings/js/greens/json-acceptance-set-greens.mjs`, it is re-runnable with ONE `node` command from
the repository root, every cell carries its clause in the source, and the run prints a per-cell verdict and a
per-scenario census. What is NOT verifiable from this document alone: that no expectation was authored after
seeing a result. THE REMEDY THIS PASS RECOMMENDS, and the supervisor's to take: an INDEPENDENT pass re-runs the
runner and diffs the census against `§2`'s table.**

**AND THE ONE PLACE WHERE THE SET COULD HAVE BEEN EASIER THAN IT WAS, NAMED SO A REVIEWER CAN SEE IT: `§3.2` —
the brief named arm (b) a layer limit, and this set drove it anyway, on the clause and the live bytes, and
reported the divergence instead of recording a limit that the docs do not support.**

**AND THE RE-SPELLING OF 2026-10-22, WITH ITS OWN REVIEW FINDING STATED (not an assertion; a finding by
construction).** **THE THREE CELLS THAT MOVED WERE RE-SPELLED AGAINST A DECLARATION AMENDMENT THAT LANDED AFTER
THE FIRST RUN — `JAS-07.1` (a LAYER-LIMIT ⇒ an ASSERTED cell), `JAS-07.2` (an OBSERVED row ⇒ the SECOND route,
asserted) and `JAS-12.1` (a GAP ⇒ CLOSED) — AND THE EXPECTATIONS WERE DERIVED FROM THE CLAUSE'S OWN TEXT
(`A143` (1), `A144` (1), and the class (4) arm's COUNTING CONVENTION and REACH clauses), NOT FROM ANY
MEASUREMENT: the boundary the cells assert (`127` CONTAINERS accepted, `128` refused; walk-depth `64` admitted,
`65`/`66` refused) is spelled out in those clauses in figures.** **WHAT A REVIEWER CANNOT VERIFY FROM THIS
DOCUMENT ALONE: that the re-spelling was not bent towards a measurement. THE TWO REMEDIES A REVIEWER CAN TAKE, AND
THE FIRST IS THE STRONGER ONE: (i) an INDEPENDENT pass re-runs the runner and diffs the census against `§2`'s
table, AND (ii) AN INDEPENDENT READER CHECKS THE THREE CELLS' EXPECTATIONS AGAINST THE FOUR CLAUSES BY NAME —
`seams-and-lifecycle.md §7.2` item 7 (f) class (4) (the counting convention clause and the reach clause),
`docs/decisions.md` · `A143` (1), `docs/decisions.md` · `A144` (1), and `docs/specs/storeroom-js/crossing.md
§1.4` item 5 — WITHOUT READING THIS SET'S OBSERVED VALUES.** **THE FIGURES IN THE THREE CELLS ARE THE CLAUSES'
OWN FIGURES, AND THE LIVE BYTES ANSWERED THEM; THE REVERSE ORDER WAS NOT AVAILABLE.**

---

**run: 2026-10-22 — `node bindings/js/greens/json-acceptance-set-greens.mjs` from the repository root, four
consecutive runs against the RUNNING package, IDENTICAL counts: `50` cells · `48` PASS · `0` FAIL ·
`1` LAYER-LIMIT · `1` CLOSED · `0` OBSERVED · `0` GAP; runner exit `0`. Layer `ENVELOPE/PURE` (the JavaScript
package layer: the built `storeroom-js-binding` through the package's own ESM entry and the JavaScript API); `APP`
layer `NONE`. Every scenario was executed against the live tree with no implementation byte read by the
authoring pass, and the ONE correction this pass made to the DRIVER (a template-literal syntax error in the
runner's own clause strings) moved no expectation. **⟶ RE-RUN 2026-10-22, AFTER THE RE-SPELLING: the same
command, the same runner, the same counts — `50` cells · `48` PASS · `0` FAIL · `1` LAYER-LIMIT · `1` CLOSED ·
`0` OBSERVED · `0` GAP; runner exit `0` — with `JAS-07.1` and `JAS-07.2` PASS and `JAS-12.1` CLOSED, the staged
addon byte-identical to the fresh build output, and NO byte of the implementation, the spec documents, the live
report or the trackers touched.**

**⟶ DOCUMENTATION REVIEW 2026-10-22 (`role_documentation_reviewer`) — THIS SET WAS RECONCILED AGAINST THE BUILD, AND
NO CELL, NO LABEL, NO FIGURE AND NO CLAUSE IN IT MOVED. ONE FORMATTING DEFECT WAS REPAIRED (a nested emphasis marker in
`§3`'s opening line, which changed no word, no cell and no verdict).** **WHAT WAS CHECKED, AND AGAINST WHAT: (1) THE
CENSUS — `12` scenarios, `50` cells, `48` PASS, `0` FAIL, `1` LAYER-LIMIT (`JAS-11.1`), `1` CLOSED (`JAS-12.1`), `0`
OBSERVED, `0` GAP, and both arithmetic lines (`6 + 12 + 4 + 3 + 6 + 1 + 2 + 4 + 3 + 7 + 1 + 1 = 50` ✓ and
`48 + 0 + 1 + 1 + 0 + 0 = 50` ✓) — against `bindings/js/greens/json-acceptance-set-greens.mjs`'s own `SUMMARY` line on
disk and against `bindings/js/greens/json-acceptance-set-live.mjs`'s independent re-drive (`52` cells · `49` PASS ·
`0` FAIL · `1` LAYER-LIMIT · `2` OBSERVED · `0` FINDING, exit `0`); (2) EVERY CLAUSE EACH CELL CITES, against its home
— `docs/specs/storeroom-native/seams-and-lifecycle.md §7.2` item 2's clause of 2026-10-21 (parts `(1)`–`(2)`) and item
7 (f) (its class (4) arm's COUNTING CONVENTION clause and REACH clause), `docs/specs/storeroom-native/contract.md §8.1`
rows `15` and `16`, `§5.2`'s `P-IM-1` with its 2026-10-22 clause (a) and `§7.2` item 4, `docs/decisions.md` · `A140` ·
`A141` · `A143` · `A144`, `docs/specs/storeroom-js/crossing.md §1.4` item 5, `docs/specs/storeroom-js/surface.md §2.1`'s
`cfg` block and `§2.11` clause 2, `docs/specs/storeroom-js/parameter-semantics.md §2.21` (`PAR-JS-21`),
`docs/specs/storeroom-native/store-model.md §1.4` and `docs/specs/storeroom-constraints/kernel-surface.md §2.1` — EVERY
ONE RESOLVES; AND (3) THE ONE LAYER LIMIT'S OWN REASON, against the build: `src/store.rs`'s `write_file` re-decodes the
image it is about to rename over the path and refuses it with the EXISTING `FileCommitFailed` BEFORE the sibling is
written, so the JS package's own walk (which refuses a value of depth `65` before any verb is called) cannot hand the
store an image the loader would refuse — the limit is TRUE AND STANDS.** **THE LAYER CLAIM, RESTATED AND CHECKED: THIS
SET IS `ENVELOPE/PURE` (the JavaScript package layer) AND ITS `APP` LAYER IS `NONE`; IT CLAIMS NO `APP`-GREEN; A LIVE
PASS OVER IT IS ADDITIVE AND `APP`-GREEN AND NEVER RETIRES AN ENVELOPE / NODE / TRIO ROW; A NODE-GREEN STAYS GREEN ON
ITS OWN LAYER, AND AN `APP`-GREEN DOES NOT STAND IN FOR A NODE-GREEN.** **THE REVIEW'S RECORD:
`archive/reviews/2026-10-22-storeroom-json-codec-wave-doc-review.md` — the `archive/` tree is gitignored by the
repository's own `.gitignore` (the corpus's rule), so the tracker cells carry the pointer.**
