# PROPOSAL-STAGE IMPLEMENTATION PLAN — the crossing's codec carries the JSON value tree (`U-STOREROOM-JSON-CROSSING`)

**THE UNIT, IN ONE LINE — THE FILING'S OWN, QUOTED AND NOT RE-SPELLED.** **THE UNIT'S ONE LINE:** the JavaScript↔native crossing carries the **JSON value tree** instead of the tagged `{k,v}` tree, and the **classes outside the JSON value tree — the nine markers spell **sixteen** classes — are refused at the package's own boundary** instead of crossing and being refused by the store. **THE AUTHORITY FOR BOTH HALVES IS `A147`'s OWN ROW, CITED AND NOT RE-SPELLED** `[A3 docs/decisions.md · A147 | the ruling's own row]`.

**THE AUTHORITY OF THIS PLAN IS `docs/decisions.md` · `A147` — CITED AND NOT RESTATED.** The row's own text is the authority, and no sentence of this file paraphrases it into a clause.

**EVERY STEP BELOW IS A PLAN STEP AND NEVER A CONTRACT CLAIM.** No step asserts a behaviour clause, a signature, a return shape, a fail-state, a status token or a message; no step licenses code; no step delegates a red set; no step admits a unit row; no step moves a ledger count; and no step takes a ruling. A step that reads as a behaviour claim here is a filing defect: the behaviour belongs in a contract, authored at the spec gate and nowhere else.

**THE PLAN IS RECONCILED TO THE CONTRACT, AND DATED, ONCE A CONTRACT LANDS.** Until the unit's contract exists there is nothing to reconcile to — at that point the contract's own `implementation-plan` region supersedes this schedule, and this file's steps gain the contract's pointers and keep their own bytes `[A2 docs/specs/storeroom-native-implementation-plan.md §P.6 · §P.7 | the house plan's own rule]`.

**DRAFTED AT THE PROPOSAL STAGE, IN THE UNIT'S FILING — `docs/specs/storeroom-json-crossing-proposal.md`.** A plan is drafted for EVERY unit at the proposal stage, including a proposal whose gate-1 verdict is a hold, because the reason for a hold may be to review that plan. **THE BYTES BELOW WERE MOVED OUT OF THAT FILING'S `docs/specs/storeroom-json-crossing-proposal.md §7.6` REGION — ITS PRE-MOVE ADDRESS — BYTE-EXACTLY, AND THE FILING CARRIES A ONE-LINE POINTER WHERE THEY STOOD** (`RCA-8(g)`: move out, leave a one-line pointer, never retain beside).

**THE SECTION MAP — EACH SECTION BELOW, AND THE FILING SECTION IT WAS MOVED FROM. THE FILING'S `§7.6` REGION IS **VACATED** — ITS SITE CARRIES THE ONE-LINE POINTER — AND THE ADDRESSES IN THE TABLE ARE THE REGION'S **PRE-MOVE** NUMBERS: THE PROVENANCE OF THE MOVE, AND NOT A LIVE CITATION OF A SECTION THAT STILL STANDS.**

| This plan's section | The filing section it was moved from |
| --- | --- |
| **`§P.1`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6` |
| **`§P.2`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.1` |
| **`§P.3`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.2` |
| **`§P.4`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.3` |
| **`§P.5`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.4` |
| **`§P.6`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.5` |
| **`§P.7`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.6` |
| **`§P.8`** | `docs/specs/storeroom-json-crossing-proposal.md §7.6.7` |

**TWO READINGS THE MOVED BYTES NEED, DECLARED HERE SO THAT NOT ONE MOVED BYTE IS RE-WORDED.** (1) **THE DEMONSTRATIVE `THIS FILING` — IN EITHER ITS CAPITAL OR ITS SMALL-CASE SPELLING — MEANS THE UNIT'S FILING AT `docs/specs/storeroom-json-crossing-proposal.md`, THE DOCUMENT THESE BYTES WERE MOVED FROM, AND NOT THIS PLAN.** (2) **THE FILING'S OWN LABELS `M-1`…`M-9` (its measurements) AND `OM-1`…`OM-7` (its open mechanics) ARE CITED BELOW AND NOT RESTATED: THEY STAND AT `docs/specs/storeroom-json-crossing-proposal.md §3` AND `docs/specs/storeroom-json-crossing-proposal.md §5` RESPECTIVELY.**

---

### §P.1 THE PROPOSAL-STAGE IMPLEMENTATION PLAN — WHAT WILL BE BUILT, IN WHAT ORDER, AND HOW IT IS VERIFIED

**WHAT THIS IS, AND WHAT IT IS NOT.** **EVERY STEP BELOW IS A PLAN STEP AND NEVER A CONTRACT CLAUSE.** **No step asserts
a behaviour, a signature, a return shape, a fail-state, a status token or a message; no step licenses code; no step
delegates a red set; no step admits a unit row; no step moves a ledger count; and no step takes a ruling.** **A step
that reads as a behaviour claim here is a filing defect: the behaviour belongs in a contract, authored at the spec gate
and nowhere else.** **THE PLAN IS DATED (2026-10-22) AND IT IS RECONCILED TO THE UNIT'S CONTRACT, AND DATED, ONCE A
CONTRACT LANDS** — at that point the contract's own `implementation-plan` region supersedes this schedule and this
file's steps gain the contract's pointers and **keep their own bytes** (**`RCA-8(g)` — MOVE-OUT AND A ONE-LINE POINTER:
the superseded bytes move BYTE-EXACTLY to `archive/<topic>/<date>-<name>.md` (gitignored), and a ONE-LINE POINTER IS
LEFT AT THE VACATED SITE — NEVER AN OVERWRITE**) `[A2 docs/specs/storeroom-native-implementation-plan.md §P.6 · §P.7 | the
house plan's own rule]` `[A3 docs/decisions.md · A131 | the archive rule's own row]`. **THE HOUSE SHAPE IS THE CORPUS'S OWN** —
`docs/specs/storeroom-native-implementation-plan.md` (`§P.1`–`§P.7`) and
`docs/specs/storeroom-constraints/implementation-plan.md` (`§0`–`§5`) `[A2
docs/specs/storeroom-native-implementation-plan.md; docs/specs/storeroom-constraints/implementation-plan.md | the house
plans]`. **AND EVERY STATEMENT IN THIS PLAN IS A PLAN STEP OR A POINTER AND NOT A CLAIM THE LEDGER'S THREE AUTHORITIES
MUST CARRY** — the house rule, in the house plan's own words: *"IT AUTHORS NO CLAIM — no behaviour clause, no signature,
no return shape, no fail-state, no parameter row, no register row, no cap, no reason token, no `§`-number for the
contract and no id family. Its statements are **schedule rows and pointers**, and nothing else"* `[A2
docs/specs/storeroom-native-implementation-plan.md §P.6 | the house plan's own rule]`. **THE ORDER BELOW IS THIS PLAN'S
OWN DEPENDENCY ORDER AND NOT AN ORDERING CLAIM ON ANY SPEC'S OWN LISTS.**

### §P.2 THE PRE-FLIGHT — WHAT MUST EXIST BEFORE THE FIRST RED ROW IS AUTHORED

**Nothing in `§P.4` may begin until every line below resolves. Each line that is OPEN names what blocks it.**

| # | The precondition | Its state, and its source |
| --- | --- | --- |
| **1** | **THE ARCHITECT'S GO-AHEAD AFTER GATE 1'S VERDICT** — the only approval the chain waits for | **NOT TAKEN. GATE 1 IS OPEN, AND THIS FILING IS ITS INPUT** (`docs/next-steps.md` · `N8`'s gate state) `[A3 docs/next-steps.md · N8 | the queue's own row]` |
| **2** | **THE GATE-1 RECORD EXISTS, WITH ITS REQUIRED `## Semantics (STEP 0)` BLOCK** — the open rows, the open-semantics list and the effect on the verdict | **OWED — the verdict step's output.** The record's home is `docs/specs/storeroom-json-crossing-proposal-review.md` (`docs/specs/storeroom-json-crossing-proposal.md §7.5`) `[A3 docs/next-steps.md · N8 | the queue's own row]` |
| **3** | **THE STEP-0 ADOPTION DOSSIER EXISTS, IF STEP 0 TRIGGERS** — at `docs/specs/storeroom-json-crossing-adoption-dossier.md`, with its identifier rows, its populated collision block or a written zero-row rationale, and its `## Open semantics` section | **NOT YET DETERMINED — the verdict step's.** The trigger is `docs/pending.md` · `G-2`'s own, and the candidates are named at `docs/specs/storeroom-json-crossing-proposal.md §7.5`; **THIS FILING DECIDES NEITHER** `[A3 docs/pending.md · G-2 | the corpus's own trigger rule]` |
| **3-bis** | **THE GATE'S OWN `decomposition` ROW IS DISPOSITIONED** — the row the gate-1 record carries, whose disposition is the gate's own and not this filing's | **OWED — the verdict step's** (`§P.4` step 1) `[A3 docs/next-steps.md · N8 | the queue's own row]` |
| **4** | **THE SEVEN OPEN MECHANICS ARE ANSWERED** (`docs/specs/storeroom-json-crossing-proposal.md §5.8`'s union) | **OWED — the gate's.** **NO CONTRACT MAY ASSERT WHAT A RULING HAS NOT SETTLED** `[A2 docs/specs/storeroom-native-implementation-plan.md §P.3 | the house plan's own rule]` |
| **5** | **THE COPY-OUT DIRECTION IS SETTLED** (`OM-7`) — because the unit has four landings and the ruling's reach on two of them is open | **OWED — the gate's** (`docs/specs/storeroom-json-crossing-proposal.md §5.7`) |
| **6** | **THE STORE-SIDE STATUS-SET QUESTION IS SETTLED** (`OM-2`'s first half) — **AND, IF IT ROUTES TO A WIDENED SET, THE STORE-SIDE CHANGE HAS LANDED** | **OWED — the architect's** (`docs/specs/storeroom-json-crossing-proposal.md §5.2`; `docs/specs/storeroom-json-crossing-proposal.md §4.4`). **A STORE-SIDE CHANGE IS ANOTHER UNIT'S WORK, AND STEP 2 WAITS FOR IT RATHER THAN ABSORBING IT** |
| **7** | **THE RESIDUE'S DISPOSITIONS IN THE OTHER UNITS' OWN HOMES ARE SETTLED** (`OM-6`) — the re-render arm's home, the greens set's cells, the store's own set | **OWED — those units' own passes** (`docs/specs/storeroom-json-crossing-proposal.md §5.6`; `docs/specs/storeroom-json-crossing-proposal.md §6.4`) |

### §P.3 THE DECLARED EDIT SCOPE — THE PATHS THIS UNIT MAY WRITE, AND AT WHICH STEP

**Every path below is declared now and NO path is written by this plan's authoring.**

| # | Path | What the unit may do there | The step that may write it |
| --- | --- | --- | --- |
| **1** | `docs/specs/storeroom-json-crossing/` — the unit's own directory: `contract.md` + its **declared parts** (the part map authored in the same pass as the index region) + the contract's own `implementation-plan` region | **authored**, whole, at the contract step | **2** |
| **2** | `docs/specs/storeroom-json-crossing-adoption-dossier.md` (only if STEP 0 triggers; the zero-row form otherwise carries its rationale) | **authored** by STEP 0 at the verdict step | **1** |
| **3** | `docs/specs/storeroom-json-crossing-proposal-review.md` (the gate-1 record) | **authored** at the verdict step: the verdict, the `## Semantics (STEP 0)` block and this gate's `decomposition` row | **1** |
| **4** | `bindings/js/index.mjs` | **edited** — the encoder's value forms, the decoder's arms, and the boundary refusal frame | **4** |
| **5** | `bindings/js/src/codec.rs` | **edited** — the value reader, the value writer and the tag arms | **4** |
| **6** | `bindings/js/src/crossing.rs` | **edited** — the pure-Rust value model, where the ruling's class decision removes a variant's reach | **4** |
| **7** | `bindings/js/test/**` · `bindings/js/greens/**` | **authored/edited** — the red set and the greens set, re-spelled where the ruling moves an assertion — **AND THE OWNERSHIP IS RESOLVED HERE: THE **PATHS** ARE THIS UNIT'S OWN EDIT SCOPE, AND THE GREENS SET'S **CELLS'** DISPOSITIONS ARE **NOT** — a cell's disposition is ANOTHER UNIT'S OWN CLAIM, `OM-6` CARRIES IT, AND STEP 4 (iv) RE-SPELLS ONLY THE CELLS THIS UNIT'S OWN CHANGE MOVES AND ONLY AGAINST AN ANSWERED `OM-2` (`docs/specs/storeroom-json-crossing-proposal.md §6.5`; `docs/specs/storeroom-json-crossing-proposal.md §5.6`)** | **3** · **4** · **6** |
| **8** | `docs/specs/storeroom-js/crossing.md` · `docs/specs/storeroom-js/surface.md` · `docs/specs/storeroom-native/contract.md` | **edited by NAMED AMENDMENT** — the clauses `docs/specs/storeroom-json-crossing-proposal.md §4.3` names, and no other | **2** · **4** |
| **9** | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | **edited by the GATES, never by the build** — a tracker move belongs to the gate that earned it | **1** · **10** |

**THE NOT-TOUCHED SET, NAMED SO THE SILENCE IS A RESULT.**
1. **`src/**`'s value model and refusal arm, and `src/json.rs` and the file tier's three `json` call sites** — the file
   tier's bytes do not move (`docs/specs/storeroom-json-crossing-proposal.md §7.2`) `[A3 docs/decisions.md · A147 | the ruling's own row]`.
2. **THE FOUR CARRIER TAG SITES AND THE FOUR CARRIER ENCODERS** (`docs/specs/storeroom-json-crossing-proposal.md §4.4`) — the address, tier, op-id and handle carriers
   are carriers, not the value tree `[A1 bindings/js/src/codec.rs:485 · :562 · :602 · :629 | the codec's own carrier
   arms]`.
3. **THE STORE'S OWN CLOSED STATUS SET** — `src/error.rs`'s `CODES` array and the store contract's own set rows —
   **UNLESS `OM-2`'s FIRST HALF ROUTES TO A WIDENED SET, IN WHICH CASE THAT CHANGE IS A SEPARATE UNIT'S WORK AND THIS
   PLAN DOES NOT AUTHOR IT** (`docs/specs/storeroom-json-crossing-proposal.md §4.4`) `[A1 src/error.rs:43–:60 | the set's own array]`.
4. **`docs/specs/storeroom-addon-surface/**`** — the `ValueNotAdmitted` re-render arm's own home (`docs/specs/storeroom-json-crossing-proposal.md §6.4`) `[A2
   docs/specs/storeroom-addon-surface/contract.md §4 · §5 | the unit's own clauses and its own row]`.
5. **EVERY TRACKER'S COUNT** — no ledger count moves except by the architect's admission `[A2
   docs/specs/storeroom-native-implementation-plan.md §P.2 | the house plan's own rule]`.
6. **`../Provident-Electron/**` — IN FULL, EVERY BYTE, AT EVERY STEP** — read-only; a finding against that project is a
   `HO-` row in `docs/defects.md`, never a patch `[A2 docs/specs/storeroom-native-implementation-plan.md §P.2 | the
   house plan's own rule]`.
7. **ANY OTHER `docs/specs/` PATH** — a new spec path is a spec-gate event, not a plan step `[A2
   docs/specs/storeroom-native-implementation-plan.md §P.2 | the house plan's own rule]`.

### §P.4 THE ORDERED STEPS — STEP · WHAT WILL BE BUILT · IN WHAT ORDER · HOW IT IS VERIFIED

**One row per step. The order printed is this plan's own dependency order: each step takes its input from the step
before it and from no later one.** **THE GATE CHAIN THE STEPS FOLLOW IS THE CORPUS'S OWN** — proposal → `[role_validity
∥ role_critique]` → `role_architecture_review` → `role_change_analysis` → `role_spec_writer` → `role_test_writer` (red)
→ `role_implementer` (green) → `role_adversarial_reviewer` → `role_blind_test_writer` → `role_live_scenario_runner` →
`role_proofreader` → `role_documentation_reviewer` → validation trio → update trackers → DONE `[A3
docs/next-steps.md · N8 | the queue's own row]`.

| # | What will be built | In what order | How it is verified |
| --- | --- | --- | --- |
| **1 — THE VERDICT STEP** | the STEP-0 adoption dossier at its own home (`docs/specs/storeroom-json-crossing-proposal.md §7.5`), or the zero-row rationale; the gate-1 record with its `## Semantics (STEP 0)` block, its open-semantics list and its `decomposition` row; the verdict | **FIRST** — it is the gate's own close-out, and every later step takes its input from it — **AND ITS OWN PRECONDITION IS THE GATE'S OWN: `§P.2`'s rows `1`–`3` (the architect's go-ahead · the record's `## Semantics (STEP 0)` block · the STEP-0 dossier's determination) AND THE GATE'S `decomposition` ROW DISPOSITIONED (`§P.2` row 3-bis)** | the dossier's own schema and its snapshot, or the written zero-row rationale; the record's block present and its open rows dispositioned; **the architect's go-ahead recorded** |
| **2 — THE CONTRACT** | the unit's own directory contract and its parts: the value tree's clauses in **BOTH** directions, the copy discipline, the closed fail-state, the per-`§` parameter-semantics rows, and the typed `§5.x` property register; **and this plan reconciled to it, with a dated clause beside each site it moves** | **AFTER 1** — the contract takes the verdict and the answers to the seven open mechanics — **AND ITS OWN PRECONDITION IS `§P.2`'s ROWS `4`–`7`: ALL SEVEN MECHANICS ANSWERED (A CLAUSE MAY NOT REST ON AN OPEN MECHANIC) · THE STORE-SIDE LANDING, IF `OM-2` ROUTES TO A WIDENED SET · THE RESIDUE DISPOSITIONS SETTLED OR NAMED WITH OWNERS** | the directory's closure predicate holds (`{map entries} = {files present} − {contract.md}`); the register's cap and its disjoint id family hold; **no clause rests on an open mechanic that has no answer** |
| **3 — THE RED SET** | the red set, authored **FROM THE CONTRACT ALONE** and **RUN**, with its failing set **REPORTED BEFORE ANY IMPLEMENTATION**; plus the register's executed layer — one closed exhaustive table per row, each printing its strategy id and its `HELD`/`BROKEN` verdict, `un-run` reported as a failure | **AFTER 2** — the red set is authored from the contract and from nothing else — **AND ITS OWN PRECONDITION IS THE CELLS' OWN: `OM-2`'s STATUS FOR THE REFUSAL CELLS, `OM-7` FOR THE COPY-OUT CELLS** — **AND THE RED SET IS **ONE SET OVER TWO DIRECTIONS**, BECAUSE A ROUND-TRIP CELL CROSSES BOTH, AND A DIRECTION `OM-7` REMOVES IS **RE-SPELLED**, NOT DROPPED** | the reported failing set, run and reported before any implementation byte is written; the register's executed layer, every row printing its strategy id and its verdict |
| **4 — THE GREEN, IN FOUR BUILD STEPS IN THIS ORDER** | **(i)** the class-decision site and the boundary refusal frame at the package's own edge; **(ii)** the **copy-in** value tree — the JavaScript half writes it, the native half reads it; **(iii)** the **copy-out** value tree — the native half writes it, the JavaScript half reads it; **(iv)** the residue re-spelling, in the JavaScript test tree and the greens set | **AFTER 3** — the red set is reported first; and the four build steps run in the order printed, **because (ii) and (iii) are two INDEPENDENT DIRECTIONS AND EITHER ORDER IS LAWFUL, WHILE THE PAIR THAT CANNOT BE SPLIT IS **EACH DIRECTION'S OWN TWO ENDS** (`docs/specs/storeroom-json-crossing-proposal.md §4.1`'s own sentence), and (iv) is driven by what (i)–(iii) settle** — **AND EACH BUILD STEP'S OWN PRECONDITION: (i) `OM-2`'s STATUS AND MESSAGE, THE STORE-SIDE LANDING IF WIDENED, AND THE RE-RENDER ARM'S DISPOSITION — THE ARM'S TRIGGER DIES AT (i), AND ITS CLAUSES AND CELLS LIVE IN `docs/specs/storeroom-addon-surface/`; (ii) `OM-1`, AND `OM-5` BINDS THE NATIVE READER (THE READ-ONCE RULE); (iii) `OM-7`; (iv) (i)–(iii)** | the red set re-run and reported green; **the seven invariants at `§P.5` checked at each of (i)–(iii)**; (iv) re-measured against the residue census of `docs/specs/storeroom-json-crossing-proposal.md §6.1` and `docs/specs/storeroom-json-crossing-proposal.md §6.5` |
| **5 — THE ADVERSARIAL PASS + THE REGISTER'S AUDIT** | the read-only adversarial pass (edge cases · unauthorized access · malformed input) and the register's read-only audit; every finding dispositioned with ONE recorded disposition; host findings fixed and regression-tested; a package defect catalogued in `docs/defects.md` and never patched | **AFTER 4** | the findings' dispositions recorded; the register's audit run and read-only; the fixed hosts' checks re-run |
| **6 — THE BLIND GREENS** | the greens set, authored AND run from the delivered docs alone, by an agent who did not implement the unit | **AFTER 5** | the greens set's per-scenario pass/fail, with the layer stated on every figure |
| **7 — THE LIVE DETERMINATION** | a WRITTEN determination of whether the unit triggers the mandatory live battery, from the predicate's own limbs, with the evidence that decided it and the falsifier that would flip it | **AFTER 6** | the determination's own evidence and falsifier, written either way; **no `APP`-green reported from a node-green** |
| **8 — THE PROOFREAD + THE DOCUMENTATION REVIEW** | the proofread of the docs against the code; the documentation review reconciling the contract, the greens record and the active trackers against the actual build, fixing stale entries in the same pass | **AFTER 7** | the proofread's fixed cells; the review record; the trackers reconciled to the build in the same pass |
| **9 — THE TRIO + THE CRATE'S OWN LEG** | the project's three checks and the crate's own test run, each figure printed with its layer | **AFTER 8** | the measured exit codes and figures, each with its layer; a node-suite green is `ENVELOPE`-green and never `APP`-green |
| **10 — THE TRACKERS** | the unit's `DONE` row and the tracker reconciliation | **AFTER 9** | the row's content; the ledger's move, taken by the architect and by no other instrument |

**AND THE ONE CONDITIONAL BUILD STEP, NAMED SO IT IS NOT READ AS SCHEDULED: the STORE-SIDE STATUS-SET CHANGE** — the
widening of `src/error.rs`'s `CODES` array and of the store contract's own set rows, which `OM-2`'s first half may route
to (`docs/specs/storeroom-json-crossing-proposal.md §4.4`) — **IS A SEPARATE UNIT'S WORK AND IS NOT ONE OF THIS PLAN'S STEPS.** **IF `OM-2`'s FIRST HALF ROUTES THERE,
THIS PLAN'S STEP 2 IS BLOCKED BY THAT UNIT'S OWN LANDING, AND THE BLOCK IS RECORDED RATHER THAN ABSORBED.**

### §P.5 THE INVARIANTS EVERY BUILD STEP PRESERVES — AND WHAT THE RULING DOES TO EACH

**SEVEN INVARIANTS — THE SEVENTH BEING THE RULING'S OWN HEADLINE CLAUSE — EACH WITH ITS OWN GROUND AT THE CORPUS'S OWN
BYTES, AND EACH ONE IS A CONSTRAINT ON THE BUILD STEPS AT `§P.4` — NOT A CLAIM ABOUT WHAT THE BUILD WILL DO.**

1. **THE CROSSING IS A DEEP COPY IN BOTH DIRECTIONS, AT EVERY DEPTH, WITH NO SHARED OWNERSHIP.** `docs/specs/storeroom-js/crossing.md §1.1`'s four clauses (`:30`–`:45`) `[A2 docs/specs/storeroom-js/crossing.md §1.1 | the copy discipline]`. **THE NEW VALUE TREE MUST STILL BE A COPY ON BOTH HALVES — the copy-in (landing one) and the copy-out (landing three).**
2. **READ-ONCE: A MUTATION AFTER A VISITED MEMBER IS NOT OBSERVED; A MUTATION ON AN UNVISITED MEMBER IS.** `docs/specs/storeroom-js/crossing.md §1.4` item `7` (`:556`–`:557`) and `§1.1`'s third paragraph (`:52`–`:57`) `[A2 docs/specs/storeroom-js/crossing.md §1.1 · §1.4 | the copy discipline and the walk's own items]`. **A JSON READER THAT READS A VALUE TWICE BREAKS IT, AND WHICH READER THE NATIVE HALF ADOPTS IS `OM-1`'s OWN CHOICE — SO THE READER IS CHOSEN AGAINST THIS RULE AND NOT AFTER IT.**
3. **THE WALK IS BOUNDED: DEPTH ≤ `64`, NODES ≤ `1,000,000`, REFUSED WITHIN THE CALL.** `docs/specs/storeroom-js/crossing.md §1.4` item `5` (`:451`–`:455`) and the `DD-10` row (`docs/specs/storeroom-js/contract.md:587`) `[A2 docs/specs/storeroom-js/crossing.md §1.4; A2 docs/specs/storeroom-js/contract.md §6 | the walk's own item and the corpus's own row]`. **THE BOUND IS THE PACKAGE'S OWN WALK'S AND NOT A SECOND CEILING — A READER THAT CARRIES ITS OWN BOUND (`OM-1`'s ROUTE (b) CARRIES THE ADOPTED CRATE'S `128` AND `1,000,000`) ADDS A CEILING AND DOES NOT REPLACE THIS ONE.**
4. **THE REFUSAL ORDER IS THE STORE'S: THE CARRIER ROW'S `AddressMalformed` PRECEDES THE VALUE'S ANSWER.** `bindings/js/index.mjs:996`–`:1006` — the code's own comment, naming `DD-46` and `JSG-05.7`/`JSG-10.2` — with the `DD-46` row (`docs/specs/storeroom-js/contract.md:625`) and the two greens cells (`bindings/js/greens/greens.mjs:594` · `:879`) `[A1 bindings/js/index.mjs:996–:1006; bindings/js/greens/greens.mjs:594 · :879 | the code's own comment and the two cells]` · `[A2 docs/specs/storeroom-js/contract.md §6 | the corpus's own row]`. **⟹ AND THE RULING'S CONSEQUENCE, NAMED AND NOT DECIDED: UNDER THE RULING THE VALUE'S ANSWER NO LONGER EXISTS AT THE STORE, SO THIS ORDERING RULE'S SECOND ARM HAS NOTHING TO ORDER AGAINST — A CONSEQUENCE TO BE SETTLED, NOT A RULING THIS FILING TAKES.**
5. **A REFUSED VALUE MINTS NO NODE, NO ANCHOR, NO CONTAINER CHANGE AND NO JOURNAL ENTRY.** `docs/specs/storeroom-js/crossing.md §1.2`'s closing clause (`:85`–`:88`) `[A2 docs/specs/storeroom-js/crossing.md §1.2 | the table's own closing clause]`. **THE RULE HOLDS WHETHER THE REFUSAL IS PRODUCED AT THE PACKAGE'S OWN WALK OR AT THE STORE — AND A REFUSAL PRODUCED AT THE PACKAGE'S OWN WALK MINTS EVEN LESS, BECAUSE NO VERB IS CALLED AT ALL.**
6. **THE COPY-OUT IS A DEEP COPY AT EVERY DEPTH.** `docs/specs/storeroom-js/crossing.md §1.1` clause 2 (`:38`–`:39`) `[A2 docs/specs/storeroom-js/crossing.md §1.1 | the copy discipline]`. **THE COPY-OUT'S OWN LANDING (landing three) IS WHERE THIS IS CHECKED — AND IT IS A LANDING THIS FILING RECORDS FOR THE FIRST TIME (`docs/specs/storeroom-json-crossing-proposal.md §4.1`).**
7. **THE HEADLINE CLAUSE: THE CLASSES ARE REFUSED **AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED** — NOT BY THE
   STORE, AFTER A VERB WAS CALLED.** `A147`'s own second answer — *"Refuse them at the package's boundary"* — and its own
   holding that the class is *"DECIDED AT THE PACKAGE'S WALK"* `[A3 docs/decisions.md · A147 | the ruling's own row]`.
   **THE WALK IS BOTH THE CLASS-DECISION SITE AND THE REFUSAL SITE, THE STORE IS NEVER ASKED ABOUT THESE CLASSES, AND
   THIS IS WHAT THE REFUSAL CELLS MEASURE** (`M-9`'s `15` cells; `docs/specs/storeroom-json-crossing-proposal.md §6.5`).

### §P.6 THE ACCEPTANCE CRITERION — WHAT MAKES THIS UNIT DONE, AND WHAT MAKES IT NOT DONE

**DONE REQUIRES ALL OF:** the architect's go-ahead recorded and the gate-1 record in place; the seven open mechanics
answered; the contract a pattern-C directory whose closure predicate holds, with the typed register inside its cap; the
red set authored from the contract alone, run and reported before any implementation; the green the least code that
turns that red set green inside `§P.3`'s scope; the seven invariants of `§P.5` holding at both directions; the
adversarial pass and the register's audit read-only and every finding dispositioned; the greens set authored and run by
an agent who did not implement; the live determination written either way; the proofread and the per-unit documentation
review run and the trackers reconciled in the same pass; the trio and the crate's own leg green with every layer stated;
and the `DONE` row carrying its full content, with the ledger move taken by the architect.

**IT IS **NOT** DONE IF:** any of `§P.7`'s stop conditions fires; a diff reaches outside `§P.3`'s declared scope; a
claim in the contract rests on an open mechanic that has no answer; the copy-out's landing was left speaking the
tagged form while the copy-in's landed speaking the JSON tree; or the plan's own bytes were overwritten instead of
reconciled.

### §P.7 THE STOP CONDITIONS — WHERE THE CHAIN STOPS AND RETURNS TO THE ARCHITECT

1. **THE ARCHITECT'S GO-AHEAD IS NOT GIVEN** after the verdict.
2. **ANY OF THE SEVEN OPEN MECHANICS IS UNANSWERED** when the contract step would begin.
3. **THE STEP-0 TRIGGER'S DETERMINATION IS DEFERRED** to this filing or to the contract — `docs/pending.md` · `G-2`
   forbids that deferral.
4. **THE UNIT'S SCOPE PROVES WIDER THAN THE FOUR LANDINGS** `docs/specs/storeroom-json-crossing-proposal.md §4.1` names, and the wider scope is not a named landing.
5. **`OM-2`'s FIRST HALF ROUTES TO A WIDENED SET** and the store-side change has not landed as its own unit's work.
6. **A DIFF REACHES OUTSIDE `§P.3`'s DECLARED SCOPE** — into the adjacent project, another unit's test file, the
   store's own set, or a tracker.
7. **THE PLAN'S OWN BYTES ARE OVERWRITTEN** instead of reconciled.

### §P.8 WHAT THIS PLAN DOES NOT DO

1. **IT IS NOT A CONTRACT** — it asserts no behaviour clause, no signature, no return shape, no fail-state, no
   parameter row, no register row, no cap, no reason token and no `§`-number for the contract.
2. **IT AUTHORISES NO CODE** and it delegates no red set.
3. **IT ADMITS NO UNIT ROW AND MOVES NO LEDGER COUNT** — the architect admits rows, not a pass.
4. **IT DECIDES NO OPEN MECHANIC** — `docs/specs/storeroom-json-crossing-proposal.md §5.8`'s seven stay open, and `OM-1` · `OM-2` (both halves) · `OM-3` · `OM-4` ·
   `OM-5` · `OM-6` · `OM-7` are named, not answered.
5. **IT TAKES NO RULING ON** the copy-out's reachability, the store-side status-set change, the adoption trigger, or any
   of the four.
6. **IT WRITES NO CELL, NO DRIVE, NO GREEN AND NO ACCEPTANCE ROW** — and no test byte.
7. **IT IS NOT THE CONTRACT** — and it is reconciled to the contract once a contract lands.

**END OF THE PROPOSAL-STAGE PLAN.**
