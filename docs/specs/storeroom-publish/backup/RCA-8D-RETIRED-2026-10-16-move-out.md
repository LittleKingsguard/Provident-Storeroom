# ARCHIVE — the `RCA-8(d)` ANNOTATE-BESIDE cells MOVED OUT of `docs/specs/storeroom-publish/release.md` (`§1`'s CI-input era)

**This file is a home of the bytes `docs/specs/storeroom-publish/release.md` moved out on `2026-10-16` under the
architect's `A131` — *"Archive before proceeding"*.** **Each region NAMES the source path, its `§` and the source's
own line numbers at the moment of the move, and is written under `RCA-8(g)`: the superseded bytes are MOVED OUT
BYTE-EXACTLY and the source leaves a ONE-LINE POINTER NAMING this file and its `§`, never the displaced text beside
its replacement.** **The instrument that retires the spelling is `A129`: `RCA-8(d)` ANNOTATE-BESIDE is retired
CORPUS-WIDE, so every `RCA-8(d)` site is a CONVERSION TARGET and a live `RCA-8(d)` occurrence is a FINDING rather
than a conversion item** (`docs/decisions.md` · the ACTIVE `A129` row of `2026-10-16`; `A131`). **No rule lives here:
this is the record of the cells that WERE, and no pass may read it as an operative declaration** (`RCA-8(g)`;
`docs/specs/spec-scope-and-structure/contract.md §C.11.6` — a relocation carries its text and moves no claim).
**THIS FILE CARRIES `5` SECTIONS, `§1`–`§5`, EACH WITH ONE `## §n.` HEADING AND EACH HOLDING ONE MOVED CELL.**

---

## §1. MOVED OUT OF `docs/specs/storeroom-publish/release.md` — the part's own header convention clause, read at the source's line `:9`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` ANNOTATE-BESIDE spelling (`A129`), and the
second half it states is the width rule (`2000` BYTES per line) that is a STANDING convention of the corpus rather
than a claim of the `release` concern.** **The bytes, byte-exactly as they stood (read at the source file's own line
`:9` immediately before the move):**

**⟶ AND THIS RULE'S OWN SECOND HALF IS STATED HERE, DATED `2026-10-13` BY GATE 7'S PROOFREADING PASS (`role_proofreader`), BECAUSE THE RULE AS IT STOOD NAMED ITS WIDTH IN CHARACTERS AND THE WIDTH IS MEASURED IN BYTES, AND A CHARACTER-COUNTING TOOL REPORTS AN OUTSIDE-A-LIMIT LINE AS INSIDE IT.** `RCA-8(d)` ANNOTATE-BESIDE: **the convention above STANDS BYTE-FOR-BYTE and is read WITH this clause, never replaced by it; THIS clause adds the second half at the convention's own house and adds no rule of its own.** **THE SECOND HALF: THE WIDTH'S UNIT IS **BYTES**, AND THE WIDTH'S CEILING IS `2000` PER LINE — so THE INSTRUMENT IS `LC_ALL=C awk 'length($0)>2000'`, WHICH COUNTS BYTES IN THE `C` LOCALE, AND NEVER A TOOL THAT COUNTS CHARACTERS (a line of `2001` bytes can report `1999` characters, WHICH IS THE FAILURE THIS HALF EXISTS TO PREVENT, AND IT HAS HAPPENED TWICE IN THIS UNIT).** **AND THE OBLIGATION THE HALF CARRIES: ANY LINE THIS CORPUS TOUCHES WHOSE WIDTH EXCEEDS `2000` BYTES IS RE-FLOWED IN THE PASS THAT WROTE IT — an amendment authored as its own line and never appended — WITH THE MEASUREMENT PRINTED BESIDE THE FIGURE IT REPLACES.** `[A1 | requirement]`

---

## §2. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.2` — the runner-label amendment's preamble, read at the source's line `:33`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the five-row runner table
and the rule beneath it stand UNMOVED at the source, and the amendment's own operative reading is carried at the
source's as-filed-beside-operative table.** **The bytes, byte-exactly as they stood (read at the source file's own
line `:33` immediately before the move):**

**⟶ THE RUNNER-LABEL AMENDMENT, RECONCILED 2026-10-11 BY THE RUNNER-LABEL LANDING PASS (`role_spec_writer`): TWO OF THE FIVE LABELS MOVED, THE AMENDMENT THAT MOVED THEM IS THE CLAUSE ABOVE ITSELF, AND AN EXERCISED CLAUSE IS NOT AN OVERRULED TABLE.** `RCA-8(d)` ANNOTATE-BESIDE: **the five-row runner table above and the rule beneath it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no row to the table, moves no row's target, adds no runner, mints no `PUB-DD` row and re-decides no rule.**

---

## §3. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4` — the stage-then-promote insertion's preamble, read at the source's line `:69`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the as-filed six-step
table and the operative stage-then-promote sequence at `§1.5` stand UNMOVED at the source.** **The bytes,
byte-exactly as they stood (read at the source file's own line `:69` immediately before the move):**

**⟶ THE SIX STEPS BECOME A STAGE-THEN-PROMOTE SEQUENCE — INSERTED 2026-10-11 BY THE STAGED-RELEASE PASS (`role_spec_writer`), ON THE SECOND WORKFLOW RUN'S OWN EVIDENCE AS ITS BRIEF CARRIES IT.** `RCA-8(d)` ANNOTATE-BESIDE: **the table that follows is the AS-FILED SIX-STEP TABLE, RE-EMITTED BYTE-FOR-BYTE AT THE CLAUSE THE STAGED-PUBLISH MODEL MAKES NON-OPERATIVE — *"THE SIX PUBLISH STEPS, IN ORDER"* — SO THAT `git diff` RECOVERS EVERY PRE-PASS BYTE OF THE TWO `PUBLISH` ROWS AND OF THE HEADING; THIS CLAUSE IS AN INSERTION ABOVE IT, IT MOVES NO ROW AND IT RE-DECIDES NO RULE OF ITS OWN.** **THE OPERATIVE HEADING IS *"THE SIX STEPS' TWO PHASES, IN ORDER — STAGE, THEN PROMOTE"*, AND THE OPERATIVE SEQUENCE IS DECLARED AT `§1.5` BELOW.** **WHAT MOVES, STATED AT THE STEPS' OWN HOME SO NO READER INFERS IT FROM A DIFF: THE VERB OF THE TWO PUBLISH SITES IS NO LONGER `npm publish`.** **IT IS `npm stage publish`, AT EACH OF THE TWO SITES, AND THE ACT THAT MAKES A STAGED VERSION LIVE IS A NEW ONE — THE ARCHITECT'S OWN PROMOTION.** **AND THE REASON IS THE REGISTRY'S, NOT THE CODE'S: the trusted-publisher grant configured for these names is scoped to STAGE PUBLISH rather than to direct publish, so `npm publish` is refused with `403 · OIDC permission denied for this action` WHILE THE OIDC EXCHANGE AND THE PROVENANCE ATTESTATION BOTH SUCCEED.** **SO THE TWO PHASES ARE `stage` AND `promote`, THE OIDC AUTHENTICATION IS UNCHANGED AT BOTH, AND THE SIX STEPS' OWN ORDER IS PRESERVED THROUGH BOTH PHASES** (`§1.5`; `§6.7`). `[A1 — the second run's own log, quoted at the lines that carry it and transcribed at `§6.7`; read with the registry's own refusal of the direct verb | state or fail-state declaration]`

---

## §4. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the pre-publish version guard's insertion preamble, read at the source's line `:94`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the guard's own items
`1`–`11` and their dated clauses stand UNMOVED at the source, and the guard's register row is `P-PUB-10`.** **The
bytes, byte-exactly as they stood (read at the source file's own line `:94` immediately before the move):**

**⟶ INSERTED 2026-10-12 — THE `U-STOREROOM-CONSUMER-FIX` SPEC PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING `A91` (`(a2)`: the released artefact's self-report is stamped at BUILD TIME from the package manifest) AND ON THE GATE-1 REVIEW'S OWN DETERMINATION THAT THE STAMP NEEDS AN OBSERVABLE A RUN CAN FAIL.** `RCA-8(d)` ANNOTATE-BESIDE (with the one named re-emission printed immediately above, which is this insertion's anchor): **the five-runner table, its five `What it builds` cells, its `1`–`6` step table, the `3 + 2 + 1 = 6` ✓ arithmetic, the load-bearing step-5 ordering property and the prohibition are ALL UNMOVED at their own lines and their own wording; THIS insertion adds ONE STEP and ONE SUB-CLAUSE and re-decides no rule of the six, moves no runner, moves no step's order and adds no credential.** **THIS PASS RAN NOTHING, PACKED NOTHING, STAGED NOTHING AND PUBLISHED NOTHING.**

---

## §5. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the guard's blind-spot clause preamble, read at the source's line `:104`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the blind-spot
declaration it opens, the guard's items `1`–`11` and `§6.10`'s parser-domain clause stand UNMOVED at the source.**
**The bytes, byte-exactly as they stood (read at the source file's own line `:104` immediately before the move):**

**⟶ AND THE GUARD'S OWN BLIND SPOT IS DECLARED HERE, DATED `2026-10-13` BY THE GATE-4 ADVERSARIAL CLOSE-OUT PASS (`role_spec_writer`), BECAUSE A DECLARED COVERAGE THAT OMITS ITS OWN BLIND SPOT READS AS TOTAL — AND IT IS AUTHORED AS ITS OWN LINES AND APPENDED TO NO EXISTING ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **item `8` and every item of this section stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause WEAKENS NO STEP, MOVES NO ORDER, ADDS NO CREDENTIAL AND RE-DECIDES NO RULING — it states WHICH FAILURES THE STEP SEES AND WHICH IT CANNOT.**

---

## §6. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the spelling/position/token-set item's preamble, read at the source's line `:110` (first clause)

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the item's own `(a)`,
`(b)` and `(c)` sub-items and the dated corrections beside them stand UNMOVED at the source.** **The bytes,
byte-exactly as they stood (read at the source file's own line `:110` immediately before the move):**

11. **AND THE STEP'S OWN SPELLING IS DECLARED HERE, DATED `2026-10-13` BY THE GATE-2 EIGHT-FINDING CLOSE-OUT PASS (`role_spec_writer`), BECAUSE A REGISTER ROW THAT CLAIMS FIRABILITY MUST NAME WHAT THE CELL MATCHES.** `RCA-8(d)` ANNOTATE-BESIDE: **items `1`–`10` above stand BYTE-FOR-BYTE and are read THROUGH this item; THIS item states a SPELLING, A POSITION AND A TOKEN SET and re-decides no property, moves no step and adds no credential.** **THIS PASS IS NOT THE WORKFLOW FILE'S AUTHOR: the file is `docs/specs/storeroom-publish/implementation-plan.md` §1's DECLARED EDIT SCOPE and `Q3`'s to write, and WHAT IS OWED HERE IS THE DECLARATION A CELL NEEDS.** **AND THE FILE WAS READ AT ITS OWN BYTES BY THIS PASS — `.github/workflows/publish.yml`, `397` lines as `read` returned them — SO THE SPELLING BELOW IS DECLARED AGAINST THE FILE'S OWN STEP NAMES RATHER THAN AGAINST A GUESS.**

---

## §7. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the `(b)` sub-item's inserted count-correction clause, read at the source's line `:112` (second clause)

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the `(b)` sub-item's own
token set and its dated `2 → 3` correction stand UNMOVED at the source.** **The bytes, byte-exactly as they stood
(read at the source file's own line `:112` immediately before the move):**

**⟶ AND THIS COUNT IS CORRECTED HERE, DATED `2026-10-13`, BY THE GATE-3 OPENING PASS (`role_spec_writer`), BECAUSE IT PRINTED `TWO` AND THE FILE CARRIES THREE — AND THE SPELLING CHOSEN IS THE `4.` PREFIX RATHER THAN THE `4.` `guard:` FORM.** **⟶ AND ONE PRECISE REFERENCE POINT IS ADDED HERE BESIDE THIS ITEM, DATED `2026-10-13` BY THE GATE-3 OPENING PASS (`role_spec_writer`), BECAUSE THE PRE-PASS BYTE-STRING OF THE SENTENCE ABOVE NO LONGER STANDS AT ITS OWN LINE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of this item above stands BYTE-FOR-BYTE as the pass before this one left it and is read THROUGH this clause; THIS clause restores no byte, deletes none, edits none, and takes no count.**

---

## §8. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the `(c)` sub-item's blind-spot insertion clause, read at the source's line `:115` (final clause)

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the `(c)` position
constraint and the blind-spot declaration beneath it stand UNMOVED at the source.** **The bytes, byte-exactly as
they stood (read at the source file's own line `:115` immediately before the move):**

**⟶ AND THE EXISTENCE AND POSITION CHECK ABOVE IS THE WHOLE OF WHAT A FILE-READING CELL MAY CARRY, WHICH IS WHY THE COMPARISON'S BLIND SPOT IS DECLARED AT THIS ITEM TOO, DATED `2026-10-13` BY THE GATE-4 ADVERSARIAL CLOSE-OUT PASS (`role_spec_writer`):** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of this item stands and is read THROUGH this clause; THIS clause ADDS NO TOKEN, MOVES NO POSITION AND RE-DECIDES NOTHING.**

---

## §9. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the anchor re-measurement clause's preamble, read at the source's line `:118`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the four re-taken
anchors, the re-measured `17`/`3` census and the `422`-line reading stand UNMOVED at the source.** **The bytes,
byte-exactly as they stood (read at the source file's own line `:118` immediately before the move):**

**⟶ AND THE FOUR ANCHORS THE GATE-3 CLAUSE ABOVE PRINTS ARE RE-MEASURED BESIDE IT HERE, DATED `2026-10-13` BY GATE 7'S PROOFREADING PASS (`role_proofreader`), BECAUSE THE FILE HAS SINCE GROWN AND EVERY ONE OF THEM WAS TAKEN AT ITS OWN PASS'S BYTES.** `RCA-8(d)` ANNOTATE-BESIDE: **the gate-3 clause above and its count STAND BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause re-takes four `read` line numbers and re-measures the `17`/`3` census, and IT CORRECTS NO COUNT — the `3`-member `4.`-prefix set and the `17` step-name lines are BOTH RE-MEASURED TRUE.**

---

## §10. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4a` — the ordinal re-measurement clause's preamble, read at the source's line `:120`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the four measurements it
re-takes, its items `(i)`–`(v)` and the operative `422`-line reading stand UNMOVED at the source.** **The bytes,
byte-exactly as they stood (read at the source file's own line `:120` immediately before the move):**

**⟶ AND THE THREE LINE-ANCHORS AND THE ONE ORDINAL CLAIM THIS ITEM'S CLAUSES ABOVE CARRY ARE MEASURED AGAINST THE LIVE FILE HERE, DATED `2026-10-13` BY GATE 7'S PROOFREADING PASS (`role_proofreader`), AND TWO OF THE FOUR DO NOT HOLD.** `RCA-8(d)` ANNOTATE-BESIDE: **item `11`'s clauses and every line of this item stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause ADDS NO STEP, MOVES NO TOKEN SET, EDITS NO `.github/` BYTE AND RE-DECIDES NO ITEM — it re-takes FOUR MEASUREMENTS and prints each one beside the figure it replaces.**

---

## §11. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4` — the `npm`-floor CI-input clause's preamble, read at the source's line `:130`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the floor, its reason,
the `setup-node` step and the `24.x` pin stand UNMOVED at the source.** **The bytes, byte-exactly as they stood
(read at the source file's own line `:130` immediately before the move):**

**⟶ THE ONE CI INPUT THIS TABLE PRESUPPOSED AND DID NOT CARRY, INSERTED BESIDE IT 2026-10-11 BY THE RELEASE-FAILURE PASS (`role_spec_writer`), WITH THE RULE AND THE REASON NAMED: THE CLIENT'S OWN `npm` FLOOR, AND THE STEP THAT SUPPLIES IT.** `RCA-8(d)` ANNOTATE-BESIDE: **the six-step table above, its `3 + 2 + 1 = 6` ✓ arithmetic and the prohibition under it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no STEP to the table, moves no step's order, edits no subject and re-decides no rule.** **AND ONE DISTINCTION IS MADE FIRST, BECAUSE THE WHOLE OF THE CLAUSE RESTS ON IT: THIS IS NOT A SEVENTH STEP.** **IT IS A **CI INPUT** THE SIX STEPS ARE RUN BY — an input of the runner the steps execute on, in the class `release.md`'s own §-heading already names (*"the CI inputs — the workflow's path, its host, the five runners, the actor, the subject and the six steps"*) — so the step count and the step order are UNMOVED and `3 + 2 + 1 = 6` ✓ stands.**

---

## §12. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4` — the attestation-exception clause's preamble, read at the source's line `:135`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the exception's own
items `1`–`8`, its disposition, its two log transcriptions and the declined alternative's price stand UNMOVED at
the source.** **The bytes, byte-exactly as they stood (read at the source file's own line `:135` immediately before
the move):**

**⟶ AND ONE EXCEPTION AT THE STEP ITSELF, DATED — THE ATTESTATION STEP (`§1.4` STEP `6`): FOR THE RELEASE THIS UNIT PROMOTES, THE STEP DID NOT EXECUTE.** `RCA-8(d)` ANNOTATE-BESIDE: **the six-step table above, its `3 + 2 + 1 = 6` ✓ arithmetic, the closing prohibition under it and the CI-inputs clause above each stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no STEP to the table, moves no step's order, edits no step's subject and re-decides no rule.** **`§1.4` STEP `6` STAYS IN THE TABLE AS THE DECLARED SHAPE: its subject is the provenance attestation for the tagged commit's bytes, its precondition is the host's OIDC federation at the declared level of reach (`§1.3` item 2), and NONE OF THAT MOVES.**

---

## §13. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4` — the `A86` scope reconciliation clause, read at the source's line `:153`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the as-filed step-`4`
precondition, the operative `@auspicion` reading and the six-step arithmetic stand UNMOVED at the source.** **The
bytes, byte-exactly as they stood (read at the source file's own line `:153` immediately before the move):**

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): STEP `4`'s PRECONDITION, RE-EMITTED WITH ITS AS-FILED SPELLING AND RE-READ AT THE NEW ORG.** `RCA-8(d)` ANNOTATE-BESIDE: **the six-step table above and the prohibition under it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no step, moves no step's order, edits no subject and re-decides no rule.** **THE RULING IS `A86` — *"Change org to `@auspicion`"* — at its operative default `A86`(a).** **THE AS-FILED PRECONDITION IS RE-EMITTED VERBATIM: *"the scope `@provident-storeroom` is owned, and the five names are claimable"* (step `4`).** **THE OPERATIVE PRECONDITION IS THE SAME PRECONDITION AT THE NEW ORG: the scope `@auspicion` is owned — an org the architect controls — and the five names are claimable.** **AND THE STEPS THEMSELVES ARE UNMOVED: step `4`'s SUBJECT stays *"the five declared names, at the tag's own version"*, and step `5`'s SUBJECT stays `provident-storeroom` — THE MAIN PACKAGE'S UNSCOPED IDENTITY, which `A86` does not move** (`§4.2` act `1`'s *"claiming the six names — five scoped, one unscoped"* stands byte-for-byte and is READ WITH THIS CLAUSE). **AND THE `6`-STEP ARITHMETIC ABOVE IS UNMOVED: `3 + 2 + 1 = 6` ✓, and the ONE load-bearing ordering property — step `5`'s LAST place — is untouched** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-6`; `docs/specs/storeroom-publish-proposal.md §12`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the org that owns the five scoped names | requirement]`

---

## §14. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.4` — the `A88` project-token reconciliation clause, read at the source's line `:155`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the step-`4` subject at
its own words, the five operative names and the refused spelling stand UNMOVED at the source.** **The bytes,
byte-exactly as they stood (read at the source file's own line `:155` immediately before the move):**

**⟶ RECONCILED 2026-10-11 AGAIN — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`): STEP `4`'s PRECONDITION IS RE-EMITTED AT ITS AS-FILED SPELLING AND RE-READ WITH THE PROJECT TOKEN, AND THE PRECONDITION ITSELF DOES NOT MOVE.** `RCA-8(d)` ANNOTATE-BESIDE: **the six-step table above, the prohibition under it and both clauses beside them stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no step, moves no step's order, edits no subject and re-decides no rule.** **THE AS-FILED PRECONDITION IS RE-EMITTED VERBATIM: *"the scope `@provident-storeroom` is owned, and the five names are claimable"* (step `4`).** **THE OPERATIVE PRECONDITION IS THE SAME PRECONDITION AT THE SAME ORG — `A86`'s `@auspicion`, which this ruling does NOT move — so the precondition `A88` reaches is UNCHANGED and `A88` ADDS NO PRECONDITION: the project token is part of a name the org's owner claims, and no new owner, org, registry act or moment of no return is introduced.**

---

## §15. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.5` — the stage-then-promote section's preamble, read at the source's line `:164`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the two phases, their
order clauses `1`–`6` and the `PUB-DD-31` cell stand UNMOVED at the source.** **The bytes, byte-exactly as they
stood (read at the source file's own line `:164` immediately before the move):**

**⟶ INSERTED 2026-10-11 — THE STAGED-RELEASE PASS (`role_spec_writer`), ON THE SECOND WORKFLOW RUN'S OWN EVIDENCE: THE SIX-STEP CLAUSE BECOMES STAGE-THEN-PROMOTE, THE ORDER IS PRESERVED THROUGH BOTH PHASES, AND THE PROPERTY THE CHANGE BUYS IS NAMED.** `RCA-8(d)` ANNOTATE-BESIDE: **the as-filed six-step table above, its `3 + 2 + 1 = 6` ✓ arithmetic and the prohibition under it stand BYTE-FOR-BYTE and are read THROUGH this section; THIS section is a PURE INSERTION — it adds NO STEP to the count, moves NO step's order, edits NO subject-of-a-step and re-decides NO rule.** **AND IT NAMES NO SEVENTH STEP IN THE `3 + 2 + 1 = 6` ARITHMETIC: the PROMOTION IS THE OTHER HALF OF THE TWO PUBLISH STEPS ALREADY COUNTED** (`§1.4`).

---

## §16. MOVED OUT OF `docs/specs/storeroom-publish/release.md §1.6` — the discardability property's preamble, read at the source's line `:180`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the property's items
`1`–`4` and the `PUB-DD-31` cell stand UNMOVED at the source.** **The bytes, byte-exactly as they stood (read at
the source file's own line `:180` immediately before the move):**

**⟶ INSERTED 2026-10-11 — THE STAGED-RELEASE PASS (`role_spec_writer`): THE PROPERTY THAT IS THE REASON THE CHANGE WAS CHOSEN, STATED AT ITS OWN HOME.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this section; THIS section is a PURE INSERTION, it adds no step, moves no order and mints no register row.** **AND IT NAMES ITS OWN AUTHORITY: the property is the RUN's, at the registry's own refusal, and it is the property `§1.5`'s model exists to buy.** `[A1 — the run's own log and this pass's own declaration; read with `§1.5` | state or fail-state declaration]`

---

## §17. MOVED OUT OF `docs/specs/storeroom-publish/release.md §2.2` — the crate-version relationship clause's preamble, read at the source's line `:210`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the crate-versus-package
decision, its priced alternative, the `34`-row `PAR-PUB` arithmetic and the five bullets beneath it stand UNMOVED
at the source.** **The bytes, byte-exactly as they stood (read at the source file's own line `:210` immediately
before the move):**

**⟶ THE CRATE'S OWN VERSION AND THE PACKAGE'S VERSION — THE RELATIONSHIP DECLARED 2026-10-11 BY THE STAGED-RELEASE PASS (`role_spec_writer`), ON THE SECOND WORKFLOW RUN'S OWN LOG, BECAUSE THE COUPLING RULE ABOVE PINS THE MANIFESTS AND NOTHING DECLARED THE CRATE.** `RCA-8(d)` ANNOTATE-BESIDE: **items `1`–`4` above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no item, moves no figure of the `45`-cell arithmetic, mints no `PAR-PUB` row and re-decides no rule of the coupling rule's own three limbs.** **IT ANSWERS ONE QUESTION THE COUPLING RULE LEFT OPEN: WHAT THE SIBLING CRATE'S OWN `Cargo.toml` `version` HAS TO DO WITH THE SIX PACKAGE MANIFESTS' `version`.**

---

## §18. MOVED OUT OF `docs/specs/storeroom-publish/release.md §2.3` — the `0.2.1` class-determination clause's annotation, read at the source's line `:227`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`), and it is a LIVE
occurrence of that spelling rather than quoted-as-superseded history — the finding `A129` names.** **The dated
class clause's own operative text stands UNMOVED at the source at its own line, and the `MINOR` row of the class
table above it (`:222`) is the LIVE ORDERING this move does not touch.** **The bytes, byte-exactly as they stood
(read at the source file's own line `:227` immediately before the move):**

`RCA-8(d)` ANNOTATE-BESIDE: **the table's four rows, the operative clause and the priced `alt` beneath it, the dated clause of `2026-10-15` below and the dated clause of `2026-10-13` at this section's foot EACH STAND BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause ADDS NO ROW to that table, MOVES NO CELL of it and re-decides no class a row already governs.** **It mints no `PAR-PUB` row, mints no `PUB-DD` row and MOVES NO VERSION CELL: no `package.json`, no manifest, no tag and no registry interaction is touched by it.**

---

## §19. MOVED OUT OF `docs/specs/storeroom-publish/release.md §2.3` — the eleven-cell census clause's annotation, read at the source's line `:233`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`), and it is a LIVE
occurrence of that spelling rather than quoted-as-superseded history — the finding `A129` names.** **The dated
census clause's own operative text stands UNMOVED at the source at its own line, its items `1`–`3` and its
`11 = 5 + 1 + 5` ✓ arithmetic included.** **The bytes, byte-exactly as they stood (read at the source file's own
line `:233` immediately before the move):**

`RCA-8(d)` ANNOTATE-BESIDE: **every clause of this section, of `§2.1`, of `§2.2` and of `§2.3` above STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause MOVES NO VERSION CELL, re-decides no class, mints no id and puts no question to the architect.**

---

## §20. MOVED OUT OF `docs/specs/storeroom-publish/release.md §2.3` — the `RCA-9` file-tier-save row clause's parenthetical, read at the source's line `:239`

**Reason for the move: the parenthetical is carried in the retired `RCA-8(d)` spelling (`A129`); the clause's own
`MINOR` class reading, its items `1`–`2` and the `RCA-8(g)` pointer at `:242` stand UNMOVED at the source.** **The
bytes, byte-exactly as they stood (read at the source file's own line `:239` immediately before the move):**

`RCA-8(d)` ANNOTATE-BESIDE: **every row of the table above — `PATCH`, `MINOR`, `MAJOR` and `NOT A PACKAGE BUMP BY ITSELF` — and the operative clause and the priced `alt` beneath it, and the dated clause of 2026-10-13 below, stand BYTE-FOR-BYTE; THIS clause ADDS NO ROW, MOVES NO CELL and re-decides no class**.

---

## §21. MOVED OUT OF `docs/specs/storeroom-publish/release.md §2.3` — the `PATCH`-row construction-observable amendment's parenthetical, read at the source's line `:249`

**Reason for the move: the parenthetical is carried in the retired `RCA-8(d)` spelling (`A129`); the amendment's
own class ruling, its re-pointed `contract.md §10.2` citation and the fourth-row proof stand UNMOVED at the
source.** **The bytes, byte-exactly as they stood (read at the source file's own line `:249` immediately before
the move):**

`RCA-8(d)` ANNOTATE-BESIDE: **every row of the table above — `PATCH`, `MINOR`, `MAJOR` and `NOT A PACKAGE BUMP BY ITSELF` — and the operative clause and the priced `alt` beneath it stand BYTE-FOR-BYTE; THIS clause ADDS NO ROW, MOVES NO CELL and re-decides no class**

---

## §22. MOVED OUT OF `docs/specs/storeroom-publish/release.md` — the gate-8-foot reconciliation clause's preamble, read at the source's line `:319`

**Reason for the move: the clause is carried in the retired `RCA-8(d)` spelling (`A129`); the `END OF THIS PART`
foot above it and the clause below it stand UNMOVED at the source.** **The bytes, byte-exactly as they stood (read
at the source file's own line `:319` immediately before the move):**

**⟶ AND ONE CLAUSE IS THEREBY INSERTED AT THIS PART'S FOOT, AFTER THE `END OF THIS PART` FOOT THIS PASS RE-EMITS ABOVE AND ABOVE THE GATE-8 RECONCILIATION CLAUSE THAT FOLLOWS IT, SO THE TWO DATES ARE READ IN ORDER AND NO PRE-PASS LINE IS MOVED OR REWORDED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — `§1`'s CI inputs with their `A86` step-`4` reconciliation, `§2`'s tag/version, coupling and semver clauses, `§3`'s partial-publish arm and its `alt` table, `§4`'s acts and their actor, and the `END OF THIS PART` foot — STANDS BYTE-FOR-BYTE and is read THROUGH `§5` below.** **THE CLAUSE BELOW DECLARES WHAT THE RELEASE MUST SATISFY; IT PERFORMS NOTHING, WRITES NO WORKFLOW FILE, CREATES NO MANIFEST AND HOLDS NO TOKEN** (`§4.1` item `1`).

---

**END OF THIS ARCHIVE.** **`22` regions, `§1`–`§22`, each NAMED by its source path, its `§` and its source line
numbers; the source leaves one-line pointers at each site and re-emits no byte of them; the operative declarations
are the source's own `§1.2` table, `§1.4`/`§1.5` step clauses, `§1.4a` items `1`–`11`, `§1.6`, `§2.2`, `§2.3`'s
class table (`:221`–`:223`), `§2.4`, `§2.5`, `§6.10` and `§6.11`, each standing unmoved at
`docs/specs/storeroom-publish/release.md`** (`RCA-8(g)`; `A129`; `A131`).

