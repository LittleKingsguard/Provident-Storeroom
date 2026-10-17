
# Part — the JS integration's proposal-stage plan (`U-STOREROOM-JS`): the phase table, the declared edit scope, the acceptance criterion, the stop conditions and the pointer index

**Status.** **A PROPOSAL-STAGE PLAN, filed at the gate-1 record's own determination (§C: a NEW UNIT with `docs/specs/storeroom-js/`) and owed to be reconciled — never overwritten — into this unit's `implementation-plan` part at gate 2 in the same pass as that directory's index region and part map.** **Every step below is a PLAN STEP and never a contract claim.** **No unit row is admitted, no ledger count moves (`docs/next-steps.md` reads `1 DONE / 2 open` UNITS = `3`), no red set is delegated, no implementer is dispatched and no gate is entered by authoring this plan.**

---

**⟶ RECONCILED 2026-10-11 — GATE 2, THE SPEC GATE (`role_spec_writer`), ON `A1` (this unit's own go-ahead) READ WITH THE GATE-1 RECORD'S CLOSURE (`R: §5`), AND IT IS AN ANNOTATE-BESIDE INSERTION: EVERY BYTE OF THE PLAN ABOVE AND BELOW THIS CLAUSE STANDS EXACTLY AS FILED** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed status paragraph above is re-emitted by reference and is read THROUGH this clause; no byte of it is deleted, reworded or re-ordered, so `git diff` recovers the pre-pass text as a pure insertion**; `docs/specs/spec-scope-and-structure/contract.md` §C.6's dated amendment note — *the post-landing content is the same plan text RECONCILED to the contract, the reconciliation dated*; **A3**). **THE RECONCILIATION, STATED SO NOTHING BELOW IS READ AS SUPERSEDED:**
**⟶ WITHDRAWN DIGEST-FAMILY FRAGMENT — REMOVED 2026-10-13: the digest-family fragments inserted at this site on 2026-10-11 were WITHDRAWN AS CIRCULAR BY CONSTRUCTION on that date and are deleted here; the AS-FILED clause above is RESTORED, rejoined so it READS ONCE AND WHOLE. The withdrawal's authority is `docs/specs/storeroom-js-proposal-review.md` §5.4; `RCA-8(d)` ANNOTATE-BESIDE, the record standing BESIDE the restored clause and never inside it.**

1. **THE CONTRACT THIS PLAN IS NOW RECONCILED TO EXISTS.** `docs/specs/storeroom-js/contract.md` plus its declared parts was authored at this gate in the same pass as this reconciliation, and **this directory's closure predicate reads `6 = 6`** — the map's `6` part entries against the `6` files present beside `contract.md` (`crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `implementation-plan.md`). **This clause adds one map entry to this plan's own `§6` pointer index — the pointer to the contract — and it is the only map row this clause adds.**
2. **THE PHASES DID NOT MOVE; TWO OF THEIR `BLOCKED-BY` CELLS CLOSED.** `docs/specs/storeroom-js/implementation-plan.md §3`'s table still stands as filed, and its two open cells are now answered by rulings the plan was written before: **`Q2`/`Q3`'s `U16` block is CLOSED by `A71`** (*"Publish with prebuilds"* — the published artefact with prebuilds **IS** in scope, so the packaging shape no longer blocks the red set; it **is** the shape), **and `U32`'s block is CLOSED by `A72`** (the STEP-0 route landed a one-row dossier whose row is `defined`, so nothing stops `Q1`). **`U1` never blocked and still does not** (`A70`). **`Q0` and `Q1` were discharged by the gate-1 close-out and by this pass respectively; `Q4`–`Q8` inherit their predecessors; `Q9` still waits on the architect's admission of the `DONE` row.**
3. **`§4`'S ACCEPTANCE CRITERION IS NOW READ AGAINST `acceptance.md`, ROW BY ROW, AND ITS ITEM 4 NARROWED.** The plan's item 4 required *"one row per `StoreValue` variant (`5` admitted + `8` outside), per `Segment` variant (`2` + `8`) and the per `*Arg` carrier"*. **The operative reading, at `docs/specs/storeroom-js/crossing.md` §1–§2: `StoreValue`'s `5 + 8 = 13` rows stand; the `*Arg` carriers' rows stand at `8` carriers; and the `Segment` half is carried INSIDE the address carrier's own row set (`AddressArg` · `Segment` · its `10` variants) rather than as a separate table** — the row count moves, the requirement does not. **AND `A63` REMOVES ONE OF THE PLAN'S OWN ASSUMPTIONS: `findAddress` is NOT EXPOSED, so `docs/specs/storeroom-js/crossing.md` carries no `NodeRef` crossing row and `docs/specs/storeroom-js/surface.md` §3 declares the non-exposure with its consequence.**
4. **`§4`'S `IT IS NOT DONE IF` LIST GAINS ONE ROW AND LOSES NONE.** The added row: **the JSON-text carrier route** — *"a JSON-text carrier (a `stringify`/`parse` crossing) is used or declared anywhere"* — because `A65`'s deep-copy discipline plus the store's closed surface (`R: §10 · A65`, `docs/specs/storeroom-native/contract.md` §7.2 item 7 (c): *"no verb returns JSON text"*) leaves the structural walk as the only lawful route. **The as-filed list stands byte-for-byte and this row is added beside it.**
5. **WHAT THIS CLAUSE DOES NOT DO.** It **rewrites no phase, no owner, no output, no stop condition and no acceptance item**; it **moves no ledger count** (`docs/next-steps.md` still reads `1 DONE / 2 open` UNITS = `3`); it **admits no unit row, authorises no red set and dispatches no implementer**; and it **authors no pinnable claim of the contract** — every clause it states is carried by `docs/specs/storeroom-js/contract.md` and its parts, and a step here remains **a plan step, never a contract claim** (§C.6's own rule). `[A1 | ordering claim]`

**THE POINTER THIS RECONCILIATION ADDS TO `§6`'s INDEX, PRINTED HERE BECAUSE `§6` STANDS AS FILED:** | this unit's contract directory, authored this pass | `docs/specs/storeroom-js/contract.md` + `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `implementation-plan.md` | — **and it is the row `§6`'s table would carry had it been drafted after the contract, named here rather than written into that table's bytes.** `[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 | cross-reference]`

**⟶ RECONCILED AGAIN 2026-10-11 — THE BOUNDED DIVERGENCE SWEEP (`role_spec_writer`), BECAUSE TWO PHASES HAVE
LANDED SINCE THE GATE-2 CLAUSE ABOVE AND `§3`'s OWN CELLS STILL READ AS BLOCKED.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte of the plan above and below this clause stands exactly as filed — the gate-2
reconciliation is re-emitted by reference and read THROUGH this clause, and nothing is deleted, reworded,
re-ordered or renumbered, so `git diff` recovers the pre-pass text as a pure insertion; and `§6` STANDS AS
FILED with its added row named at the gate-2 clause above.** **THIS CLAUSE ADDS NO PHASE, NO OWNER, NO OUTPUT
AND NO ACCEPTANCE ITEM: it states the phase state the tree now carries, so the table is read with its terms**
(`[A1 | ordering claim]`).

1. **`Q2` — GATE 3, THE RED SET: LANDED.** Its cells live at `bindings/js/tests/*.rs` and
   `bindings/js/test/*.test.mjs`, authored from this directory alone and RUN BEFORE any implementation, and
   its record is `archive/gate3/storeroom-js-red-set.md`, whose `§5` carries the SIX CONTRACT FINDINGS that
   authoring exposed.
2. **`Q3` — GATE 3, THE GREEN: LANDED, and the figures are the ones the runs that carry them print.**
   `bindings/js/Cargo.toml` · `src/lib.rs` · `src/crossing.rs` (the pure-Rust conversion core) ·
   `src/facade.rs` (the Node-API export facade) · `index.mjs` · `package.json` · `README.md` ·
   `.gitignore` are present; the register layer's Rust half executes `395` attempts, ALL `HELD`; and the two
   legs the plan's `§4` item 14 names are the ones declared at `package.md §4.2` item 4's dated clause —
   `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` (`223` executed cells) and
   `node --test bindings/js/test/*.test.mjs` (`89` tests), each at the REPOSITORY ROOT and each at the
   `ENVELOPE/PURE` layer, with the store's root suite quoted at `377` and NOT re-measured as this unit's.
   **A leg's figure belongs to the tree that produced it, and this clause reports the figures this pass
   MEASURED at that tree.** **`Q4` — the read-only adversarial pass — is the NEXT phase, and it precedes
   `Q5`–`Q9`, which inherit it.**
3. **`§3`'s TWO OPEN CELLS ARE READ CLOSED rather than as blocking: `U16` is CLOSED by `A71` and `U32` by
   `A72`, exactly as the gate-2 clause above records, and the tree above is the evidence that neither blocked
   `Q2` or `Q3`.** **No cell of `§3`'s table is re-written by this clause: its `Q2`/`Q3` row is read THROUGH
   this item, and a later pass that re-spells it must land the re-spelling as a dated amendment with the
   as-filed sentence re-emitted beside it.**
4. **THE DECLARED EDIT SCOPE IS NOT CONTRADICTED BY THE TREE, AND ONE NAMED GAP IS RECORDED.** `§1`'s rows
   match what the tree holds, including the JS package's files under `bindings/js/**` and the crate's own
   manifest and sources. **THE GAP: `bindings/js/.gitignore`, the addon's own placement at
   `build/Release/storeroom_js_binding.node` and the package's `optionalDependencies` wiring are BUILD-SURFACE
   files that no row of `§1`'s scope names** — **the gap is named here and DISPOSED OF as the contract's own
   bounded-amendment work in the contract document's `SW-1` clause, never as a licence to write outside the
   declared scope** (`[A1 docs/specs/storeroom-js/contract.md · the sweep clause | cross-reference]`).
5. **WHAT THIS ITEM DOES NOT DO.** **It puts no question to the architect, re-decides no ruling, moves no
   ledger count (`docs/next-steps.md` still reads `1 DONE / 2 open` UNITS = `3`), admits no unit row,
   dispatches no implementer into any consumer, writes no byte outside `docs/specs/storeroom-js/**` and
   claims no `APP`-green.** **The unit's divergence table — every row's contract cell against this tree, with
   the side that must move — is the contract document's `SW-1` clause** (`[A1 | prohibition]`).

**⟶ RECONCILED AGAIN 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), CLOSING GATE 4'S
`JS-9` PLAN HALF: THE OPERATIVE JS TEST FIGURE IS `92`, AND THE `89` IS NAMED AS THE AS-FILED FIGURE.**
`RCA-8(d)` ANNOTATE-BESIDE: **every byte of the plan above and below this clause stands exactly as filed —
the gate-2 reconciliation and the sweep's reconciliation are re-emitted by reference and read THROUGH this
clause, and nothing is deleted, reworded, re-ordered or renumbered, so `git diff` recovers the pre-pass text
as a pure insertion.** **THIS CLAUSE ADDS NO PHASE, NO OWNER, NO OUTPUT AND NO ACCEPTANCE ITEM: it states the
figure the tree's own record prints, with the figure the plan's own bytes carry named beside it**
(`[A1 | numeric or census claim]`).

1. **WHAT THE PLAN PRINTS, AND WHAT THE TREE MEASURES.** **The reconciliation clause's item 2 above prints
   `node --test bindings/js/test/*.test.mjs` as *"`89` tests"*.** **THE OPERATIVE FIGURE IS `92`, AND IT IS THE
   FIGURE THE TREE'S OWN RECORD PRINTS AT TWO SEPARATE RUNS: `92` tests · `92` pass · `0` fail · `0` skipped
   · `0` todo · `0` cancelled, exit `0`** (`archive/gate3/storeroom-js-red-set.md` §9.3's two-run table;
   `archive/gate4/storeroom-js-adversarial.md` · FIGURES THE PASS COULD NOT REPRODUCE · item `1`, which
   names `92` as *"the operative one"*). **THE `89` IS NOT WITHDRAWN AS A READING: it is the figure the plan's
   own clause carries as filed, and it is HISTORICAL — the cells the `V-1` re-derivation added post-date it**
   (`§3`'s reconciliation item 2 and `archive/gate3/storeroom-js-red-set.md` §9's own header, each of which
   prints the earlier figure at its own site).
2. **THE FIVE PER-FILE FIGURES, PRINTED SO THE SUM IS CHECKED RATHER THAN TRUSTED — and because a total
   without its terms is the defect `JS-9` is about:** **`round-trip` `21` · `surface` `36` · `registry` `17` ·
   `package-entry` `17` · `register` `1` (the register runner) — so `21 + 36 + 17 + 17 + 1 = 92` ✓, and the
   `5` files are the `5` the JS leg's own command globs** (`archive/gate3/storeroom-js-red-set.md` §9.3's
   table). **A figure for this suite that is not `92`, or a per-file set that does not sum to it, is a
   FINDING at whatever record prints it** (`DD-33`).
3. **AND THE ONE THING THIS CLAUSE DOES NOT DO.** **It re-measures nothing — this pass runs no command — and
   it does not move `§2`'s or `§3`'s phase cells, the register's figures (`395` Rust attempts · `107` JS
   attempts) or the store's `377`, which is QUOTED and not re-labelled** (`DD-31`; `DD-33`; `§4.2`).
   **The plan's as-filed bytes and both reconciliation clauses stand whole, and `§1`'s declared edit scope is
   untouched by it** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` — every figure carries
   its site and its layer | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-JS` GATE-7 PROOFREADING PASS (`role_proofreader`), MEASURING THE
FIGURES THE CLAUSES ABOVE PRINT AGAINST THE TREE THE BUILD NOW CARRIES.** `RCA-8(d)` ANNOTATE-BESIDE:
**every byte of the plan above and below this clause stands exactly as filed — the gate-2 reconciliation, the
sweep's reconciliation and the bounded declaration pass's `92`-figure clause are re-emitted by reference and read
THROUGH this clause, and nothing is deleted, reworded, re-ordered or renumbered, so `git diff` recovers the
pre-pass text as a pure insertion.** **THIS CLAUSE ADDS NO PHASE, NO OWNER, NO OUTPUT AND NO ACCEPTANCE ITEM: it
states the figures the tree's own runs print, with the figures the clauses above carry named beside them**
(`[A1 | numeric or census claim]`).

1. **THE JS LEG'S FIGURE, AT ITS OWN BYTES.** **THE CLAUSES ABOVE PRINT `node --test bindings/js/test/*.test.mjs`
   as *"`89` tests"* (the sweep's item 2) and as *"`92` tests"* (the bounded declaration pass's items 1–2, with
   the five-file set `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register`
   `1`, `21 + 36 + 17 + 17 + 1 = 92` ✓).** **THE OPERATIVE FIGURE THE TREE PRINTS IS `101`: `101` tests ·
   `101` pass · `0` fail, run twice with identical results once timings are stripped, over the SAME five
   files, to which the gate-4 negative-generator cells and the crossing cells have since been added.** **`89`
   AND `92` ARE NOT WITHDRAWN AS READINGS — each is the figure the clause that prints it carries and each is
   HISTORICAL, the gate-3 landing and its `V-1` re-derivation post-dating the first and the negative
   generators post-dating the second.** **A figure for this suite that is not `101`, or a per-file set that
   does not sum to it, is a FINDING at whatever record prints it** (`DD-33`).
2. **THE REGISTER LAYER'S TWO FIGURES, COUNTED ROW BY ROW.** **THE CLAUSES ABOVE PRINT the Rust half's `395`
   attempts and the JS half's `107` attempts.** **THE OPERATIVE READING, AT THE TWO TREES' OWN BYTES: `8` ROWS
   TOTAL — `5` Rust register rows at `bindings/js/tests/register_layer.rs` (`P-IM-1` · `P-IM-2` · `P-SM-4` ·
   `P-SM-6` · `P-TP-8`, together `395` attempts, ALL `HELD`) beside `3` JS rows at
   `bindings/js/test/register.test.mjs` (`P-SM-5` · `P-TP-7` · `P-TP-8`, together `107` attempts, ALL `HELD`,
   `0` un-run), against the declared `≤ 100` per row and `≤ 400` total — so both figures stand as printed, the
   layer's row count is `8` (`5 + 3 = 8` ✓, the register's own `8 ≤ 8` cap holding), and the `11`-strategy-line
   or `8/8`-row readings belong to the store's tree and to the amendment's clauses, each as its own record
   prints them** (`docs/specs/storeroom-js/contract.md` `§5.1`–`§5.8`; `archive/gate3/storeroom-js-red-set.md`
   `§9`/`§10`; `DD-31`).
3. **THE SIBLING CRATE'S RUST LEG.** **THE CLAUSE ABOVE PRINTS `cargo test --manifest-path
   bindings/js/Cargo.toml --offline --no-fail-fast` as *"`223` executed cells"*.** **THAT IS THE FIGURE THE TREE
   PRINTS — `223` PASS · `0` FAIL, the manifest named explicitly, taken at the REPOSITORY ROOT — and the
   command site is the one `package.md §4.2` item 4's dated clause declares, so the leg cannot silently
   resolve the root package.**
4. **AND THE STORE'S OWN FIGURE, WHICH IS QUOTED AND NOT RE-MEASURED.** **The clause above quotes the store's
   root suite at `377`.** **THAT IS THE FIGURE THE STORE'S TREE PRINTS: `cargo test --offline --no-fail-fast` —
   `377` PASS · `0` FAIL, its root `Cargo.toml` byte-identical. `374` is the LISTENER-AMENDMENT tree's reading
   and `373 PASS / 1 FAIL` its `A69` correction-pass reading; neither is this unit's green and neither is
   re-labelled here** (`docs/specs/storeroom-js/contract.md` `§7.1`–`§7.3`; `DD-33`).
5. **AND THE ONE THING THIS CLAUSE DOES NOT DO.** **It re-measures nothing: this pass holds no execution verb,
   the figures above are read at the sites that carry them, it moves `§2`'s or `§3`'s phase cells by nothing, it
   lifts no park and it claims no `APP`-green.** **`§1`'s declared edit scope is untouched by it, and the JS
   leg's build step and the store's root suite remain two different trees' figures** (`[A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10`; `[T: this part's figures, each with the tree it
   describes and its layer | CENSUS]`).**

**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8): THE
OPERATIVE JS-SUITE FIGURE IS `101`, AND THE `92` IS NAMED AS THE FIGURE OF THE TREE THAT PRECEDES THE
GATE-4/5 TEST-SIDE PASSES.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the plan's as-filed `89`, the
gate-2 reconciliation and the bounded declaration pass's `92` clause with its five per-file figures — stands
exactly as filed and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no phase, no owner,
no output and no acceptance item, and it moves no cell of `§1`'s scope, `§2`'s phase table or `§4`'s
acceptance criterion.** **THE FIGURE IT PRINTS, QUOTED IN ITS OWN WORDS SO NOTHING IS LOST: the clause above
reads *"THE OPERATIVE FIGURE IS `92`"* and prints `21 + 36 + 17 + 17 + 1 = 92` ✓ over `5` files.**

1. **THE OPERATIVE FIGURE IS `101`, AND IT IS THE TREE'S OWN.** **The tree now carries SIX files under
   `bindings/js/test/**`, not five: the gate-4 adversarial pass's tasked negative generators were authored at
   `bindings/js/test/negative-generators.test.mjs`, and the register runner gained a second cell — so the
   per-file set is `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2`
   · `negative-generators` `8`, and `21 + 36 + 17 + 17 + 2 + 8 = 101` ✓. **`83` of the `101` are literal
   `test(...)` declarations, and the remaining `18` are the two table-driven loops' own expansions — the `13`
   members of `round-trip.test.mjs`'s `CORPUS` (`assert.equal(CORPUS.length, 13)`) and the `7` rows of
   `package-entry.test.mjs`'s `HO_ROWS` — so `83 + 13 + 7 = 101` ✓ and the two derivations agree**
   (`archive/gate3/storeroom-js-red-set.md` §10.7, §11.4 and §13.4, whose own records print `101` tests · `101`
   pass · `0` fail at two separate runs).
2. **THE `92` IS NOT WITHDRAWN AS A READING: it is the figure the `V-1` re-derivation's tree measured, and it
   is HISTORICAL.** The `89` the plan's own clause carries is the figure of the pre-`V-1` tree, and the `92`
   the bounded declaration pass carried is the figure of the tree as it stood before the gate-4 close-out's
   `10` added cells — **so three readings of one suite across three trees stand, each named with its tree,
   and the operative one is `101`** (`archive/gate4/storeroom-js-adversarial.md` · FIGURES THE PASS COULD NOT
   REPRODUCE · items `1` and `2`, whose own `92` and `107` figures are read as that tree's).
3. **WHAT THIS CLAUSE DOES NOT DO.** **It re-measures nothing — this pass holds no execution verb and runs no
   command — and it does not move `§2`'s or `§3`'s phase cells, the register's figures (`395` Rust attempts ·
   `107` JS attempts, both unmoved and both still the register's own), or the store's `377`, which is QUOTED
   and not re-labelled** (`DD-31`; `DD-33`; `§4.2`). **The layer of every figure above is `ENVELOPE/PURE`, the
   ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`, and NO `APP`-GREEN IS CLAIMED** (`§4.2` items 2–3; `DD-20`;
   `[A3 docs/specs/storeroom-js/contract.md §10 — this pass's own reconciliation region, which prints the
   same figure with its derivation | numeric or census claim]`).

**⟶ AND ONE LEDGER FIGURE THIS PART PRINTS IS SUPERSEDED, RECONCILED HERE BECAUSE IT IS `§1`'s AND `§3`'s
CELLS AND THIS PASS'S OWN SCOPE, AND LEFT UNTOUCHED WHERE IT IS.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte
above and below stands byte-for-byte, and this clause adds no phase, no owner, no output and no acceptance
item.**

| The cell, and what it read before (quoted) | What it reads now, at the trackers' own bytes |
| --- | --- |
| **`§2`'s reconciliation item `5`:** *"moves no ledger count (`docs/next-steps.md` still reads `1 DONE / 2 open` UNITS = `3`)"* | **SUPERSEDED: the ledger reads `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓)** — `U-STOREROOM-NATIVE` (`N1`) and `U-STOREROOM-LISTENERS` (`N2`) are the two `DONE` rows and `U-STOREROOM-JS` (`N3`) is the ONE open unit (`1 + 0 = 1` ✓). The `1 DONE / 2 open` figure was correct at its own filing date — the listener unit was still open — and was superseded when it closed; **NO COUNT IS MOVED BY THIS PASS.** |
| **`§3`'s `Q9` row:** *"the moved ledger (`1 DONE / 2 open` → `2 DONE / 1 open` UNITS = `3`)"* | **HALF-CONSUMED AND HALF OWED: the `1 DONE / 2 open` → `2 DONE / 1 open` move was taken by the SUPERVISOR'S LANDINGS for the two closed units, NOT by this unit's close-out. THIS UNIT's close-out owes `2 DONE / 1 open` → `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓), and the row remains the supervisor's landing pass.** The row's other cells — the `DONE` row's full content, the decisions/queue updates and the archival loop — **are `§3`'s and stand as filed; the unit's `DONE`-row inventory is carried at `docs/next-steps.md`'s `## DONE` reconciliation clause.** |
| **`§1`'s row `docs/specs/storeroom-js/contract.md` + its declared parts:** | **UNMOVED — and the closure arithmetic it feeds is unmoved: the map's own PART entries are `6` and `test-cases.md` is the map's SEVENTH entry but sits outside the index region's six-name parenthesis, so the operative predicate reads `6 = 6` ✓ on the part-entry reading and the predicate HOLDS. This pass created no file in the directory.** |

**AND THE ONE FIGURE THIS PART STILL PRINTS THAT IS NOT ITS OWN TO MOVE: `docs/specs/storeroom-js/test-cases.md`
row `71` carries the same `1 DONE / 2 open` sentence, and it is a `view` part whose rows must declare nothing
the contract does not already carry** (`§C.6 binding rule 1`) — **so its row is read THROUGH this clause and
through `contract.md`'s closing ledger clause, and it is NOT rewritten here** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10`; A3 docs/specs/storeroom-js/contract.md §10 and its
closing ledger clause | numeric or census claim]`).

## §1. THE DECLARED EDIT SCOPE, BY PATH, WITH THE PHASE THAT MAY WRITE EACH

| Path | The phase that may write it |
| --- | --- |
| `docs/specs/storeroom-js/contract.md` **+ its declared parts** | `Q1` (the spec gate; the plan is reconciled into its `implementation-plan` part in the same pass) |
| `docs/specs/storeroom-js-adoption-dossier.md` | `Q0` (step 4's STEP-0 pass) |
| `docs/specs/storeroom-js-proposal-review.md` (the gate-1 record) | `Q0` |
| `bindings/js/**` — the sibling crate's own `Cargo.toml`, `src/**` and its own tests | `Q2` (its tests), `Q3` (its manifest and sources) |
| the JS package inside `bindings/js/**` — `package.json`, its entry points, its generated `.d.ts`, its JS sources and its JS tests | `Q1` (the declared shape), `Q2` (its tests), `Q3` (its code) |
| the build configuration for the sibling and the package (`build.rs`, any `scripts/**`) | `Q1`, `Q3` |

**⟶ AND THE SCOPE ROW ABOVE IS READ THROUGH THIS DATED CLAUSE, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT
PASS (`role_spec_writer`), BECAUSE THE TREE'S BUILD SURFACE IS WIDER THAN THE ROW NAMES.** `RCA-8(d)`
ANNOTATE-BESIDE: **the row above stands byte-for-byte and the phase cells (`Q1`, `Q3`) do not move; THIS
clause is a PURE INSERTION, it adds no phase, no owner and no output, and it is the NAMED GAP the sweep
recorded at `§2`'s reconciliation, item 4, now carried as the scope's own terms.** **THE TREE'S BUILD-SURFACE
FILES, NAMED WITH THE PHASE THAT MAY WRITE EACH:**

| The build-surface file or wiring the row above does not name | The phase that may write it |
| --- | --- |
| `bindings/js/.gitignore` — the ignore file that keeps `/target/`, `/build/` and the crate's `Cargo.lock` out of the tracked tree | **`Q1` (the declared shape), `Q3` (its content)** |
| `bindings/js/build/Release/storeroom_js_binding.node` — the addon's own PLACEMENT, the IGNORED path the package's internal step loads, and the artefact an acceptance leg's BUILD STEP produces | **`Q3` (the path is the package's), and the artefact itself by the build step `bindings/js/README.md` declares** |
| `bindings/js/package.json`'s `optionalDependencies` wiring — the per-target artefact names the prebuild matrix publishes under | **`Q1` (the declared shape), `Q3` (the wiring)** |
| **THE ONE THING THE ROW ABOVE NAMES THAT THE TREE DOES NOT CARRY, STATED SO THE ROW IS NOT READ AS WRONG:** **there is NO `build.rs` and NO `scripts/**` in the tree.** **The row's declared edit scope is therefore NOT CONTRADICTED but INCOMPLETE, because a non-`build.rs` FFI facade lives inside `src/**`** — **so the row's parenthesised examples are read as EXAMPLES the phase may write where they exist, and the three rows above as the build surface the tree actually carries.** | — |

**A file of the four above written by any phase but the one named, or a FIFTH build-surface file written
without a bounded amendment of this row, is a finding** (`[A1
docs/specs/storeroom-js/contract.md · the sweep clause, item 2 row 29 — the NAMED GAP this clause carries as
the scope's own terms; A3 docs/specs/storeroom-js/contract.md · the index region's declared edit scope |
requirement]`).
| the four trackers `docs/{next-steps,decisions,pending,defects}.md` | **by the GATES, never by the build** — `Q0`, `Q4`, `Q7`, `Q9` |
| `archive/**` | `Q2`, `Q4`, `Q5`, `Q6`, `Q7`, `Q9` — each gate's own report lands under it in the pass that authors it; `archive/` is gitignored and no tracked byte moves |

**THE NON-TOUCHED SET — a step out of it is a failure at any phase, by any role.**

| # | Not touched, at any phase, by any role |
| --- | --- |
| **1** | **`../Provident-Electron/**` — IN FULL, EVERY BYTE.** The corpus, its landed store, its tests, its trackers, its gate records, its `archive/**`, its `AGENTS.md`, its `package.json` and its `src/**`. A finding against it is a `HO-` row in `docs/defects.md`, never a patch (`A9`; `docs/decisions.md`'s READ-ONLY row). |
| **2** | **`../Agent Harness/**`** — the process-rule specs are cited, never edited. |
| **3** | **the store unit's crate and red set** — the root `Cargo.toml`, `src/**`, `tests/**` (`A68`: the store's manifest, sources, tests and offline green are NOT touched). |
| **4** | **the store unit's contract directory `docs/specs/storeroom-native/**`** — read and cited; **no byte written, no part added, no `§`-number moved, no second register authored there**. |
| **5** | **the store unit's `DONE` row and the store's green figures** — not re-opened, not re-labelled, not re-measured as this unit's green. |
| **6** | **every tracker's counts** — no ledger count moves except by the architect's admission. |
| **7** | **`docs/specs/storeroom-js-proposal.md`** — the directive and the rulings stand byte-for-byte. |
| **8** | **the gate-1 step reports under `archive/gate1/**`** — landed, closed records; never rewritten and never re-dispositioned. |
| **9** | **`README.md` · `LICENSE` · `.gitignore`** — unchanged. |
| **10** | **every path under `docs/specs/` outside the declared set** — a new spec path is a spec-gate event, not a plan step. |

## §2. THE PHASE TABLE — phase · what it does · owner · input · output · the rule that authorizes it

| Phase | What it does | Owner | Its input | Its output | The rule that authorizes it |
| --- | --- | --- | --- | --- | --- |
| **`Q0` — the gate-1 close-out** | the STEP-0 determination, the dossier or its written route, the gate-1 record with its `## Semantics (STEP 0)` block, the union carried onto the record, the `decomposition` row dispositioned, the verdict, the tracker reconciliation | `role_change_analysis` (step 4) + the supervisor's landing pass | the proposal (`§1`–`§13`); the three step reports (`archive/gate1/storeroom-js-review/`); the rulings `A62`–`A69`; this plan | `docs/specs/storeroom-js-proposal-review.md`; `docs/specs/storeroom-js-adoption-dossier.md` (if owed) | the four-step chain (`AR-1`·`AR-2`·`AR-13`·`AR-19`) |
| **`Q1` — gate 2, the contract** | the pattern-C directory authored whole: the index region, the part map, the recorded omissions, the closure predicate, the typed `§5.x` register, the plan reconciled **dated, never overwritten**, and the package's declared shape | `role_spec_writer` | this gate-1 record + `A62`–`A69`; the proposal's `§9`–`§13`; the store's `§0.4`, `§3.6`, `§4.4`, `§5.x`, `§7.1`, `§7.2`, `§8.1`–`§8.3` | `docs/specs/storeroom-js/contract.md` + its parts; this plan reconciled as their `implementation-plan` part | the ACTIVE unit-id/directory rule; the `≤ 8` register rule for a code-bearing unit; the closure predicate |
| **`Q2` — gate 3, the red set** | the red set authored **from this contract alone** and **RUN**, its failing set **REPORTED BEFORE** any implementation | `role_test_writer` | the new contract directory, whole; the register's rows, each with its strategy id | the sibling crate's Rust tests + the package's JS tests; the reported failing set; the register's executed layer; the gate's record under `archive/` | **RED BEFORE GREEN** |
| **`Q3` — gate 3, the green** | the least code that turns exactly that red set green, inside `§1`'s declared scope | `role_implementer` | the reported red set + the declared scope | the sibling crate (`Cargo.toml`, `src/**`, the `#[napi]` facade and the conversion core) and the package's files | least code to green, after the red set is reported |
| **`Q4` — gate 4, the adversarial pass** | the read-only adversarial pass and the register's read-only audit; every finding dispositioned with ONE recorded disposition | `role_adversarial_reviewer` | the green tree + the executed register | the unit's layer-honesty regions filled; catalogue rows; the gate's record under `archive/` | the adversarial pass is mandatory per completed unit; **a package defect is catalogued, never patched** |
| **`Q5` — gate 5, the blind greens** | the greens set authored **AND run** from the delivered docs alone, by an agent who did **not** implement, against the built sibling crate and package from outside the unit directory | `role_blind_test_writer` | the delivered docs + the green tree | this unit's greens record + per-scenario pass/fail | a greens set authored by the implementer without a blind re-run is a review finding |
| **`Q6` — gate 6, the live determination** | a **WRITTEN** determination of whether this unit triggers the live battery, with its evidence and its **falsifier** | `role_live_scenario_runner` | the contract's declared change set + the package's real boundary | the recorded determination or the run's structured report | **no `APP`-green may be reported from a node-green**; this unit's `APP` layer is **NONE** until a consumer assembles it |
| **`Q7` — gates 7/8, proofreader + per-unit documentation review** | the proofreader audits the docs against the code; the documentation reviewer reconciles the contract, the greens record and the active trackers against the build | `role_proofreader` then `role_documentation_reviewer` | the green tree + the greens set + the trackers | the proofread's fixed cells · the review record | the documentation review is mandatory after the greens and runs **per unit** |
| **`Q8` — gate 9, the validation trio and its additive fourth leg** | the project's three checks plus the additive leg, **with the LAYER each covers stated**, and the crate's own `cargo test` leg and the package's `node --test` leg as declared additional legs — **⟶ AMENDED 2026-10-11 (THE BOUNDED DECLARATION PASS, `role_spec_writer`; the row's as-filed cell above stands byte-for-byte and is read through this clause): the trio now carries ONE ADDED, NARROWED LEG, and the sibling crate's half of it is `cargo clippy --manifest-path bindings/js/Cargo.toml --offline --tests -- -D clippy::correctness`, taken at the REPOSITORY ROOT, green at `ENVELOPE/PURE` and claiming no `APP`-green; a NON-ZERO EXIT FAILS THE TRIO. The leg's declaration stands at `docs/specs/storeroom-js/acceptance.md` `§4.1`'s dated clause of this date, and the trio's DEFINITION — both commands, the crate each addresses, the failure rule and the narrowing's reason and measurement — stands at `docs/specs/storeroom-native/implementation-plan.md` `§8.5`'s dated clause of this date, which is the ONE HOME of it. THIS CELL MOVES NO OTHER FIGURE** | the trio's own passes | the frozen green tree | the commands' measured exit codes and figures, each with its layer | **a node-suite green is ENVELOPE-green, never `APP`-green** |
| **`Q9` — the `DONE` row, the ledger move, the archival loop** | the `DONE` row with its full content; the tracker/ledger move; the decisions/queue updates; the archival loop | the supervisor's landing pass, on the architect's admission | every gate's landed artifact | the `DONE` row · the moved ledger (`1 DONE / 2 open` → `2 DONE / 1 open` UNITS = `3`) · the reconciled trackers | **the architect admits ROWS, not a pass**; and the `DONE` row MUST cite this unit's gate-4 adversarial pass and its findings |

## §3. THE `BLOCKED-BY` CELLS — every phase the open rows block, marked

| Phase | What blocks it now | What does NOT block it |
| --- | --- | --- |
| **`Q0`** | **nothing** — step 4 owns the STEP-0 determination and the verdict, and `A66` superseded the store's integration-question prohibition **for this unit** | — |
| **`Q1`** | **nothing**, once the go-ahead lands; the register's cap is the new unit's own (`1 ≤ 8` is available on the current enumeration) | the `28` `DERIVABLE` rows and the one `MOOT`-closed set do **not** block: they are this contract's priced defaults |
| **`Q2`/`Q3`** | **`U16` if the architect rules that a published artefact is in scope** — the packaging shape then precedes the red set's JS-side rows; and **`U32`** if step 4 leaves an open entry (that would stop the whole gate, `Q1` included) | **`U1` does not block**: the realm set is entailed by the carrier, and the unclaimed realms are `HO-` rows |
| **`Q4`–`Q8`** | inherit their predecessor's | — |
| **`Q9`** | **the architect's admission of the `DONE` row** — the row lands only by his act | — |

**AND ONE BOUNDARY CARRIED SO NO PHASE READS IT AS A TASK: the store unit's `DONE` row and its green are NOT a phase of this plan, and no phase re-measures them as this unit's green.** `P-1` is **LIFTED**, not deleted, and its `28` rows are **this unit's own material**; **`P-3` is lifted and its four subjects were specified by the store's listener amendment** — nothing here re-opens either.

## §4. THE ACCEPTANCE CRITERION — `DONE`, and what makes it `NOT DONE`

**THE PRIMARY ACCEPTANCE LAYER, NAMED FIRST: the write→read round trip ACROSS THE BOUNDARY, in JS terms**, on the declared equality relation (§A.2), with the two declared normalizations and nothing else excluded.

**`DONE` REQUIRES ALL OF THE FOLLOWING.**

| # | The item | What makes it checkable |
| --- | --- | --- |
| 1 | the architect's go-ahead is recorded, and the gate-1 record exists with its required `## Semantics (STEP 0)` block and the union and the dispositioned row | `docs/specs/storeroom-js-proposal-review.md` |
| 2 | the contract is a **pattern-C directory** whose closure predicate holds, with **one** `derivation:` clause and its `ordering anchor` | the directory's index region |
| 3 | the typed register exists, uses the `P-*` vocabulary, is `≤ 8` rows, and carries a failable row per named interaction | the contract's `§5.x` |
| 4 | the value-crossing table is complete: one row per `StoreValue` variant (`5` admitted + `8` outside), per `Segment` variant (`2` + `8`) and per `*Arg` carrier, with the refusal preserved | the contract's crossing region |
| 5 | the failure channel names **exactly one** JS form, and the record's two members stay closed | the contract's failure region |
| 6 | the handle's domain, the construction's `listeners[]` and the registry's four rules are declared and drivable | the contract's handle/registry region |
| 7 | the realm claim is closed, with one declared answer per unclaimed realm, and the `HO-` rows are minted | the contract + `docs/defects.md` |
| 8 | the red set was authored from the contract alone, RUN, and its failing set REPORTED before implementation; the register's layer EXECUTED, every row printing its strategy id and verdict, `un-run` a failure | the gate-3 record |
| 9 | the green is the least code that turns exactly that red set green, inside the declared scope | `§1` |
| 10 | the adversarial pass ran read-only, every finding carries ONE recorded disposition, package findings catalogued and never patched | the gate-4 record |
| 11 | the greens set was authored AND run by an agent who did not implement | the greens record |
| 12 | the live determination is WRITTEN with its evidence and its falsifier | the gate-6 record |
| 13 | the proofread and the per-unit documentation review ran, and the contract, the greens record and the trackers were reconciled to the build in that same pass | the two records |
| 14 | the trio is green, the declared legs are green, **and every verification's LAYER is stated, with no `APP`-green reported from a node-green** | the trio's record |
| 15 | a commit exists at every gate boundary that changed files | the repository |
| 16 | the `DONE` row carries every field the plan lists, and the ledger move was taken by the architect | `docs/next-steps.md` |

**`IT IS NOT DONE IF`:** a store byte moved — the root `Cargo.toml`, `src/**` or `tests/**`; a byte of `docs/specs/storeroom-native/**` moved; a byte under `../Provident-Electron/**` was written or read as authority; a second `derivation:` clause was written; a register row was authored beyond the unit's own `≤ 8` cap, or a second register opened in either directory; the red set was authored or run **after** the implementation, or an existing test file was rewritten or an assertion weakened; a red set was authored against an unruled carrier, realm or boundary; a figure moved without a dated re-measure or a layer; an `APP`-green was claimed from a node-green; a park was read as a closure; a citation points at a file, a row or an id that does not resolve; a finding was left a bare `OWED`; a unit row was admitted or a ledger count moved by a pass; or the plan's own bytes were overwritten instead of reconciled.

## §5. THE STOP CONDITIONS

**A stop is a RETURN TO THE ARCHITECT in the concrete form the process requires** — what is blocked · the evidence · two or three options with a recommendation · what each blocks — **never a silent widening and never a second question about a ruling already recorded.**

| # | The stop |
| --- | --- |
| **A** | the sibling crate is made a workspace member, or the store's `Cargo.toml`/`src/**`/`tests/**` is reached for the binding's dependencies (`A68`) |
| **B** | the store's declared surface is extended — a text entry point, a `dispose()` verb, an `exists()` verb, a second register — to make the boundary easier |
| **C** | a value or a handle is passed by reference in either direction, or a borrow outlives one call (`A65`) |
| **D** | a `HO-` duty is proposed as a patch, or a consumer's wiring is proposed as a step of this unit (`A2`, `A9`) |
| **E** | a red set is authored against an unruled builder, realm or boundary; or the addon is made a prerequisite of the Rust core's own tests |
| **F** | an `APP`-green is claimed from a node-suite green, or the store's `379/379` is re-labelled as this unit's green (**the figure as filed in this row is `377/377`; the bounded close-out pass of 2026-10-11 re-states it, and the re-statement is this part's dated clause under this table**) |
| **G** | a step takes its input from a later phase of this table |
| **H** | **a consumer-reachable route to the constraint engine is shipped — an `exports` arm, a subpath, a second entry point or a second package for the kernel — instead of the engine sitting behind the one declared package surface (`A122`, 2026-10-16; `§7` below, which is that ruling's re-derivation in this plan)** |

## §6. THE POINTER INDEX

| The artifact | Its path |
| --- | --- |
| the gate-1 record this plan derives from | `docs/specs/storeroom-js-proposal-review.md` |
| the filing, with the rulings `A62`–`A69` | `docs/specs/storeroom-js-proposal.md` |
| the three step reports | `archive/gate1/storeroom-js-review/{1-validity,2-critique,3-architecture}.md` |
| the STEP-0 dossier (if owed) | `docs/specs/storeroom-js-adoption-dossier.md` |
| the store's contract directory (cited, never amended) | `docs/specs/storeroom-native/contract.md` + its five parts |
| the store's crate and red set (not touched) | `Cargo.toml` · `src/**` · `tests/**` |
| the parks and the standing conditions | `docs/pending.md` (`P-1` LIFTED, not deleted) |
| the decisions and the trackers | `docs/decisions.md` · `docs/next-steps.md` (`N3`) · `docs/defects.md` |
| this unit's records, as they land | `archive/gate{3,4,6}/…` · `archive/reviews/…` |

**⟶ AND THE STORE'S GREEN FIGURE THIS PART QUOTES AT FOUR CELLS IS RE-STATED, LANDED 2026-10-11 BY THE
BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE OPERATIVE FIGURE IS `379` PASS · `0` FAIL.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte of this part — the plan's own clauses, both reconciliation clauses, the `§3`
figure clause and the `§5` stop table — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a
PURE INSERTION — it adds no phase, no owner, no output and no acceptance item, it lifts no park, it
re-measures nothing and it moves no cell of `§1`'s scope or `§2`'s phase table.** **THE FIGURE MOVED, AND WHY,
WITH ITS TERMS: the store's root suite — `cargo test --offline --no-fail-fast`, at the REPOSITORY ROOT, its
root `Cargo.toml` byte-identical — is now `379` PASS · `0` FAIL, because the `+2` are the two LISTENER CELLS
`docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e) required, whose home is
`tests/watched_addresses.rs` (its own count moves `19` → `21`), so `379 = 377 + 2`.**
**THE FOUR CELLS OF THIS PART THAT READ `377`, EACH WITH WHAT IT NOW READS:**

| The cell | The reading it carried | What it reads now |
| --- | --- | --- |
| **`§0`'s reconciliation item `2`** — *"with the store's root suite quoted at `377` and NOT re-measured as this unit's"* | **`377`** | **`379`, QUOTED and NOT re-measured as this unit's — the clause's own subject, that the figure is QUOTED and never re-labelled, is UNMOVED** |
| **`§0`'s reconciliation item `3`** — *"or the store's `377`, which is QUOTED and not re-labelled"* | **`377`** | **`379`** — **the same clause's `395` Rust attempts and `107` JS attempts are UNMOVED** |
| **`§1`'s item `3`** — *"`107` JS attempts, both unmoved and both still the register's own), or the store's `377`, which is QUOTED and not re-labelled"* | **`377`** | **`379`** — **the register's own two figures are UNMOVED** |
| **`§5`'s stop row `F`** — *"the store's `377/377` is re-labelled as this unit's green"* | **`377/377`** | **`379/379`** — **and the stop itself is UNMOVED: an `APP`-green claimed from a node-suite green remains a stop, whatever the store's own figure is** |

**AND THE ONE CELL THIS CLAUSE NAMES BUT DOES NOT MOVE, SO A READER IS NOT SENT TO A FIGURE THAT STILL READS
`377`: `§3`'s item `4`** — *"THAT IS THE FIGURE THE STORE'S TREE PRINTS: `cargo test --offline --no-fail-fast` —
`377` PASS · `0` FAIL, its root `Cargo.toml` byte-identical"* — **is the PROOFREADING PASS'S OWN CLAUSE,
re-emitted as that pass filed it, and it is read as that pass's reading of the tree that stood at its date; the
operative figure is the `379` this clause states, and `374` (the filing-time reading) and `373 PASS / 1 FAIL`
(the `A69` correction-pass reading) both remain HISTORICAL, each with its own tree.** **NO `APP`-GREEN IS
CLAIMED, THE LAYER OF EVERY FIGURE ABOVE IS `ENVELOPE/PURE`, AND THE `APP` LAYER FOR THIS UNIT IS `NONE`**
(`DD-20`; `DD-31`; `DD-33`; `[A1 docs/specs/storeroom-js/contract.md §7.1`–`§7.3` — this unit's census region,
whose dated clauses are the same figure's other homes; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 14 (d)–(e) — the two cells the `+2` are | numeric or
census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THIS PART'S JS-SUITE FIGURE, ITS LEDGER CELLS AND ITS POINTER INDEX.** `RCA-8(d)` ANNOTATE-BESIDE: **every clause above — the plan's own clauses, both reconciliation clauses, the `92` figure clause, the four-`377` table and the close-out's `379` clause — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no phase, no owner, no output and no acceptance item, lifts no park and re-measures nothing.**

1. **THE OPERATIVE JS-SUITE FIGURE IS `113`, NOT `101`.** **The clause above reads** *"THE OPERATIVE JS-SUITE FIGURE IS `101`"* **and derives it as `21 + 36 + 17 + 17 + 2 + 8 = 101` over SIX files; `89` and `92` stand beside it as their trees' readings.** **THE TREE CARRIES SEVEN FILES UNDER `bindings/js/test/**` AND `113` TESTS: `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2` · `negative-generators` `12` · `convenience` `8` = `113` ✓, and `93` literal `test(...)` declarations + the `13`-member `CORPUS` loop + the `7`-row `HO_ROWS` loop = `113` ✓** — the `+12` being the convenience add-on's own cells: its eighth cell at `convenience.test.mjs` and the four generators `NG-JS-I`…`NG-JS-L`, with the register runner's `8` cells moving to `12` under the amendment's two new sites. **SO FOUR READINGS OF ONE SUITE STAND ACROSS FOUR TREES — `89`, `92`, `101` and `113` — and the operative one is `113`** (`archive/gate3/storeroom-js-red-set.md` `§14`-neighbouring cells and `archive/gate4/storeroom-js-convenience-adversarial.md` `§1`'s `108`-figure check, whose own count is the AMENDMENT's red-entry reading).
2. **AND ONE DERIVATION THIS PART PRINTS DOES NOT CLOSE, NAMED RATHER THAN RE-WRITTEN: the clause reads** *"`83` of the `101` are literal `test(...)` declarations … so `83 + 13 + 7 = 101` ✓"*, **while `83 + 13 + 7 = 103`. THE LITERAL COUNT AT THE TREE THAT CLAUSE DESCRIBES WAS `81` (and is `93` at this pass's tree), so the as-filed `83` is a stale term standing INSIDE a derivation whose two other terms are right; the per-file arithmetic beside it (`21 + 36 + 17 + 17 + 2 + 8 = 101`) closes, and THIS PASS RE-DERIVES THE OPERATIVE ONE AS `93 + 13 + 7 = 113 ✓` BY STATIC COUNT AT THE FILES' OWN DECLARATIONS — no command was run by it.**
3. **AND THE LEDGER CELLS THIS PART PRINTS ARE SUPERSEDED BY THE ARCHITECT'S CENSUS RULING.** **The clause above reads** *"the close-out that moves it is the `U-STOREROOM-JS` CLOSE-OUT OF 2026-10-11 AT COMMIT `86b3a02`, which carries the ledger to `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓)"*, **and `§5`'s stop table and `§0`'s reconciliation print the `1 DONE / 2 open` and `2 DONE / 1 open` states.** **THE OPERATIVE ARITHMETIC: `2 DONE / 0 open` UNITS = `2` (`2 + 0 = 2` ✓), the `2` `DONE` units being `U-STOREROOM-NATIVE` (`N1`) and `U-STOREROOM-JS` (`N3`), each carrying its AMENDMENT as a ROW — an amendment is a ROW and never a unit — with the `## OPEN` set at `0` unit rows and `0` open non-unit rows (`0 + 0 = 0` ✓)** (`docs/next-steps.md`'s `Q7` clauses; `docs/specs/storeroom-js-convenience-proposal.md` `§5`'s `Q7` row). **NO COUNT IS MOVED BY THIS PART AND NONE MAY BE MOVED FROM IT.**
4. **AND THE POINTER INDEX'S OWN ROWS, RE-READ AT THEIR SUBJECTS: `§6`'s *"the filing, with the rulings `A62`–`A69`"* is now `docs/specs/storeroom-js-proposal.md`, whose filed rulings run `A62`–`A81` — the listener re-homing `A78` at its `§19`, the `A77` id-matched delivery and the convenience add-on's `A79`–`A81` at its `§8` — and the CONVENIENCE ADD-ON'S OWN FILING IS `docs/specs/storeroom-js-convenience-proposal.md`, which the index does not yet name.** **The `store's crate and red set (not touched)` row and the parks row stand UNMOVED; the pointer is re-read here so no reader takes `A62`–`A69` as the filing's whole ruling span.**
**THE LAYER OF EVERY FIGURE ABOVE IS `ENVELOPE/PURE`, EXCEPT THE LIVE BATTERY'S `LIVE / ASSEMBLED PACKAGE`; `APP` LAYER `NONE`, NO `APP`-GREEN CLAIMED** (`§4.2` items 2–3; `DD-20`, `DD-33`; `[T: this part's JS-suite figure, its ledger cells and its pointer index, each with its tree | CENSUS]`).

**⟶ RECONCILED 2026-10-11 — THE `Q7`/`Q8` DOCUMENTATION GATES OF THE JS CONVENIENCE ADD-ON (`role_documentation_reviewer`), ON THE ARCHITECT'S RULINGS `A79`–`A81`: THE TWO GREENS THE AMENDMENT MOVED, THE REGISTER'S JS HALF REPORTED AS UNCLOSED, AND THE ARTEFACT'S TIE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the as-filed plan, both reconciliation clauses, the `113` clause and its four-reading table, the `83`-term disclosure and the pointer-index rows included — and each is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no phase, no owner, no output and no acceptance item, it lifts no park, it re-measures nothing and it moves no cell of `§1`'s scope, `§2`'s phase table or `§4`'s acceptance criterion.**
1. **THE BLIND SET IS `240/240`, NOT `236/236`.** **`240` authored · `240` executed · `240` PASS · `0` FAIL over the SAME `13` scenarios, `JSG-01` reading `17`; the heads sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 240` ✓.** **`236/236` is the pre-amendment tree's reading and `233`/`3` the gate-5 tree's, each with its own tree.** **`ENVELOPE/PURE`; `APP` LAYER `NONE`.** **NO SCENARIO WAS EDITED AND NO RE-RUN WAS TAKEN BY THIS PASS.**
2. **THE LIVE BATTERY IS `91/91`, NOT `72/72`.** **`13` scenarios · `91` authored/executed/PASS · `0` FAIL, the count moving `12` · `72` → `13` · `91` by `LIVE-13`'s `19` assertions (`72 + 19 = 91` ✓).** **Layer `LIVE / ASSEMBLED PACKAGE`, additive — it retires no `ENVELOPE/PURE` row — and `APP` LAYER `NONE`.** **NO SCENARIO WAS EDITED AND NO RE-RUN WAS TAKEN BY THIS PASS.**
3. **AND THE REGISTER'S JS HALF IS REPORTED AS UNCLOSED RATHER THAN TAKEN, SO THIS PART'S `§1` ITEM `2` AND `§4`'s FIGURES ARE NOT READ AS MEASURED ON THE AMENDED TREE: the `107` JS attempts those clauses print are the as-filed reading, while `bindings/js/test/register.test.mjs`'s own `line(...)` caps now sum to `117` over `12` lines — `S-REG` `20` · `S-REG-DUP` `10` · `S-OPAQUE` `10` · `S-WITHDRAW` `10` · `S-LOAD` `5` · `S-ONE-ADDON` `5` · `S-HO` `7` · `S-LAYER` `5` · `S-TRIGGER` `10` · `S-NOOP` `10` · `S-SET` `10` · `S-FIRE-WINDOW` `5` = `117`.** **The register runner's own printed total is the authority and THIS PASS RAN NOTHING; the row set stays `8` rows (`5` Rust · `3` JS) with every row `HELD` and `0` un-run as filed.**
4. **AND THE ARTEFACT'S TIE, WHICH `C-8` NAMED AND WHICH THE SUPERVISOR HAS SINCE LANDED: `bindings/js/build/Release/storeroom_js_binding.node` — `sha256:cf088d91…`, `957,904` bytes — sits in BOTH run records' tail clauses and ties EXACTLY TWO figures of this unit's amendment, the blind set's `240/240` and the live battery's `91/91`; the pre-amendment digest is `effcf6a6…`.** **NEITHER figure names a digest in its own cell, and the gate-5 record's in-record legs (`108` JS tests · `379` store root · `72` live with `71` PASS · `1` FAIL) were taken on a `950,960`-byte artefact written `2026-10-10 03:12` for which NO DIGEST IS RECORDED ANYWHERE IN THIS REPOSITORY.** **The `223` and `379` figures are the two Rust suites' own totals and load no `.node` at all.**
**AND NOTHING ELSE MOVES: the ledger stands at `2 DONE / 0 open` UNITS = `2` ✓ as the clause above prints it, this pass admits no row, moves no count and lifts no park, and NO `APP`-GREEN IS CLAIMED OR AVAILABLE — NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79`–`A81`; A1 docs/specs/storeroom-js-convenience-proposal.md `§6`; A3 docs/specs/storeroom-js/contract.md §7.2` — the same figures' other home, whose clause carries the digest and the unclosed `107`; A3 `archive/gate5/storeroom-js-greens-run.md` `§7` · `archive/gate6/storeroom-js-live-determination.md` `§4` | numeric or census claim]`).

**⟶ AND THREE FIGURES THE TWO CLAUSES ABOVE PRINT ARE MOVED BESIDE THEMSELVES, LANDED 2026-10-11 BY THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`), BECAUSE A THIRD TREE HAS LANDED SINCE THEY WERE FILED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the as-filed plan, both reconciliation clauses, the `113` clause and its four-reading table, the `83`-term disclosure, the `Q7` clause's three items and the `Q7`/`Q8` clause's four — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no phase, no owner, no output and no acceptance item, it lifts no park, re-measures nothing and moves no cell of `§1`'s scope, `§2`'s phase table or `§4`'s acceptance criterion.** **THIS PASS RAN NOTHING: every figure below is QUOTED from the site that carries it, and each is the publish unit's close-out measurement, taken on artefact `sha256:0136c912…` (`958,112` bytes).**

1. **THE JS-SUITE FIGURE — `113` IS NOW ONE TREE BEHIND, AND THE ITEM ABOVE THAT DECLARES IT OPERATIVE IS READ THROUGH THIS ITEM.** **The `Q7` clause's item `1` reads** *"THE OPERATIVE JS-SUITE FIGURE IS `113`, NOT `101`"*, **and the `Q7`/`Q8` clause adds its `113` beside it.** **THE OPERATIVE READING, AT ITS OWN SITE: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `185` tests · `185` PASS · `0` FAIL · `0` skipped, over `NINE` files: `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2` · `negative-generators` `12` · `convenience` `8` · `publish` `62` · `publish-generators` `10` = `185` ✓**, **the `+72` being `U-STOREROOM-PUBLISH`'s own red set and its `10` generators (`113 + 62 + 10 = 185` ✓).** **SO FIVE READINGS OF ONE SUITE STAND ACROSS FIVE TREES — `89`, `92`, `101`, `113` AND `185` — and the operative one is `185`; `174`, wherever a record prints it, is the reading of the tree between the last two.** **AND THE `93 + 13 + 7 = 113`-SHAPE DERIVATION THE ITEMS ABOVE CARRY IS NOT RE-USED AT THIS TREE: this pass does NOT re-derive a literal-declaration term for `185` by static count, because the two publish-unit files' cells are minted by the REGISTRIES their own code declares (`bindings/js/test/publish.test.mjs`'s `BLOCKS` table and `publish-generators.test.mjs`'s `GENERATORS` table) rather than by a countable set of literal declarations, and a derivation the files' own bytes do not support would be a figure this pass invented.** **SO THE `185` IS CARRIED BY ITS OWN PER-FILE ARITHMETIC ABOVE — the one arithmetic that closes — and the older derivation's shape is named as that tree's and not restated here.** **⟶ AND THE OPERATIVE FIGURE MOVES ONCE MORE, 2026-10-15 (the `A116` ORDERING-SEAM PASS): the JS leg is `348` tests · `348` PASS · `0` FAIL, of which `constraint-kernel*` is `127`/`127`/`0` and the seam's own `ordering` file is `5`/`5`/`0`, so `185` and the `89`/`92`/`101`/`113`/`174` readings beside it are each read at their own tree and `348` is the operative one; the per-file arithmetic of THIS item is NOT re-derived here and is owed to a pass that counts the tree's own files, because the seam's file adds its five cells and the kernel's added cells are minted by tables whose terms this pass does not measure.**
2. **THE BLIND SET — `240/240` IS ONE TREE BEHIND; THE OPERATIVE READING IS `241` AUTHORED · `241` EXECUTED · `241` PASS · `0` FAIL OVER THE SAME `13` SCENARIOS, `JSG-12` AT `18`.** **The `+1` is `JSG-12.18`, the `files` allowlist, which the publish unit's re-derivation ADDED and which `docs/specs/storeroom-js-greens.md` `JSG-12`'s item `5` prints; `236/236` and `233`/`3` remain the two earlier trees' readings.** **`ENVELOPE/PURE`; `APP` LAYER `NONE`, NO `APP`-GREEN CLAIMED.** **⟶ AND THE BLIND SET'S OPERATIVE READING MOVES ONCE MORE, 2026-10-15 (the `A116` ORDERING-SEAM PASS): `250` AUTHORED · `247` PASS · `3` FAIL over the SAME `13` scenarios, deterministic over six runs — the member-set cell `JSG-01.9` re-derived to FOUR, the three FAILs REPORTED rather than patched, and one of them the SPLIT cell `JSG-16.1`, whose two readings (`surface.md §2.7` item 6 against `§2.4` item 8 (c) at the pair-adopted address) AWAIT THE ARCHITECT'S RULING — so `241/241` above and `240/240`, `236/236` and `233`/`3` beside it are each read at their own tree.**
3. **AND THE ARTEFACT'S IDENTITY — THE `cf088d91…` / `957,904`-BYTE READING THESE CLAUSES CARRY IS THE `Q7`/`Q8` GATES' OWN TREE'S.** **The operative identity at this close-out is `bindings/js/build/Release/storeroom_js_binding.node` — `sha256:0136c912…`, `958,112` bytes — the same re-pinned identity `archive/gate6/storeroom-js-live-determination.md` `§11.2` already reads.** **SO THE TIE THIS PART PRINTS IS HISTORICAL AND IS READ AT ITS OWN TREE; the blind set's and the live battery's operative figures each carry that record's own tail clause and no figure names a digest in its own cell.** **THE `223` AND `379` BEAR NO DIGEST AT ALL — neither Rust leg loads a `.node` — and a cell that reads either as artefact-tied is a FINDING.**
4. **AND THE ONE FIGURE THIS PART LEAVES EXACTLY AS THE CLAUSE ABOVE FILED IT: the register's JS half. `107` attempts is the as-filed reading and `117` over `12` lines is what `bindings/js/test/register.test.mjs`'s own `line(...)` caps sum to — THE FIGURE STAYS OPEN FOR THE REGISTER RUNNER'S OWN OUTPUT, and no pass of this one has measured the amended tree.**
5. **AND THE LEDGER, READ ONCE MORE AT THIS CLOSE-OUT: `docs/next-steps.md`'s operative line now reads `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓), the `U-STOREROOM-PUBLISH` `DONE` row having landed; this part MOVES NO COUNT and admits no row, and the census ruling — an amendment is a ROW and never a unit — is unmoved.** **The one membership the bytes do not fix is reported at `docs/next-steps.md`'s own close-out clause, with both readings, and is not decided here or there.**
**THE LAYER OF EVERY FIGURE ABOVE IS `ENVELOPE/PURE`, EXCEPT THE LIVE BATTERY'S `LIVE / ASSEMBLED PACKAGE`; `APP` LAYER `NONE`, AND NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE** (`[A3 docs/specs/storeroom-js/contract.md §7.1`–`§7.3`, `§10` — the same figures' other homes, each with its dated clauses; A3 `bindings/js/test/publish.test.mjs` and `bindings/js/test/publish-generators.test.mjs` — the `+72`'s own homes; A1 docs/specs/storeroom-publish-proposal.md `§12` · `A86`(a) | numeric or census claim]`).

---

**⟶ RE-DERIVED 2026-10-16 — THE `file`-TIER SAVE'S OWN PASS (`role_spec_writer`), ON THE GATE-8 DOCUMENTATION REVIEW OF THAT UNIT (`archive/reviews/2026-10-16-file-tier-save-doc-review.md` §2 items `19`–`20` and §5 (b) item `4`): THE TWO OPERATIVE FIGURES THIS PART'S ITEMS `1` AND `2` PRINT ARE RE-DERIVED AT THE SETTLED TREE, AND THE RULING-PENDING HALF OF ITEM `2` IS SPENT.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the as-filed plan, every reconciliation clause, the `113` clause and its four-reading table, this part's five items and its tail layer clause — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no phase, no owner, no output and no acceptance item, it lifts no park, mints no id, moves no file count and re-decides no ruling. THIS PASS RAN NOTHING.**

1. **ITEM `1`'S JS-LEG FIGURE, RE-DERIVED: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `410` tests · `410` PASS · `0` FAIL · `0` skipped — the file-tier save's own suite (`bindings/js/test/file-tier-save.test.mjs`) being part of that set.** **THE `348` ITEM `1`'S OWN LAST LIMB PRINTS IS THE `A116` ORDERING-SEAM PASS'S READING AT ITS OWN TREE (`348` · `348` PASS · `0` FAIL, `constraint-kernel*` `127`/`127`/`0` and `ordering` `5`/`5`/`0`) and the `185`, `174`, `113`, `101`, `92` and `89` beside it are each their own tree's; SO THE OPERATIVE FIGURE IS `410` AND THE `348` STANDS AS A DATED READING.** **NO `410`-SHAPED DERIVATION IS INVENTED HERE: the operative figure is the suite runner's own total and this pass holds no execution verb.**
2. **ITEM `2`'S BLIND-SET FIGURE, RE-DERIVED: `255` AUTHORED · `255` EXECUTED · `255` PASS · `0` FAIL over the SAME `16` scenarios, exit `0`, nothing retired — `255 = 253 + 2`, the `253` RE-POINTED to the terminal arm (the ten cells `JSG-02.10`/`.11`/`.14`/`.15`/`.16` and `JSG-10.16`–`.20`) plus the `2` ADDED (`JSG-02.17`/`.18`, the two halves of `A119`), the `§2` heads summing `17 + 18 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 + 5 + 3 + 4 = 255` ✓.** **THE `250` AUTHORED · `247` PASS · `3` FAIL ITEM `2`'S OWN LAST LIMB PRINTS IS THE `A116` PASS'S READING AT ITS OWN TREE (over the `13` scenarios of that landing), and `241/241`, `240/240`, `236/236` and `233`/`3` beside it are each read at their own tree.** **`ENVELOPE/PURE`; `APP` LAYER `NONE`, NO `APP`-GREEN CLAIMED OR AVAILABLE.**
3. **AND THE ONE HALF OF ITEM `2` THAT NO LONGER RESOLVES, SPENT: its *"AWAIT THE ARCHITECT'S RULING"* is re-spelled — THE RULING LANDED 2026-10-15: `surface.md §2.7` item 6 GOVERNS the firing at the pair-adopted address and `§2.4` item 8 (c) is read as the registration-side statement it is, its non-delivery derivations superseded, so `JSG-16.1` is no longer a SPLIT awaiting a side but a cell asserting THE RULED FIRING, both readings printed at `docs/specs/storeroom-js-greens.md`'s own `JSG-16` head.** **THE SPLIT STANDS AS ONE DATED LINE; NO CELL OF THIS PART AWAITS ANY RULING FROM THIS DATE** (`docs/decisions.md` · `A114` (D1) and `A117` (D3)–(D6)).
4. **AND THE FIGURES THIS CLAUSE DOES NOT MOVE: the live battery stays `91` authored · `91` PASS · `0` FAIL over `13` scenarios with `LIVE-13` at `19`; the artefact identity of item `3` stays `sha256:0136c912…` at `958,112` bytes with its historical `cf088d91…`/`957,904` tie; the two Rust legs stay `223` and `379`; item `4`'s register-JS debt (`107` as filed against `117` over `12` lines) REMAINS OPEN exactly as filed; and item `5`'s ledger stands as that item reads it.**

(`[A3 bindings/js/greens/greens.mjs` and `bindings/js/test/file-tier-save.test.mjs` — the two runners this clause reads; A3 docs/next-steps.md` — the settled tree's `410/410/0/0`, `255/255`, root `cargo test` `395`/`0` and binding crate `224`/`0`; A2 docs/decisions.md` · `A114` (D1), `A117` (D3)–(D6), `A119`; A3 docs/specs/storeroom-js/contract.md §10`'s own re-derivation clause of this date — the same two figures at their other home | numeric or census claim]`)

---

## §7. THE ENGINE'S RE-HOMING INTO THE DELIVERY ROUTE — RE-DERIVED 2026-10-16 ON `A122` · `A123` · `A124` · `A125`

**LANDED BY THE `A122` PASS (`role_spec_writer`) ON THE ARCHITECT'S FOUR RULINGS OF 2026-10-16
(`docs/decisions.md`).** **THIS SECTION IS A RE-DERIVATION AND NOT AN ANNOTATION BESIDE THE `§1` SCOPE ROW OR
THE `§2` PHASE TABLE: it RESTATES the cells it moves, so that a reader takes each moved cell from ONE
statement and so that the engine's route is a PLAN STEP rather than a hole.** **Every step below is a PLAN
STEP and
never a contract claim; the law this plan drives is `docs/specs/storeroom-js/surface.md §2.12`, authored the
same date in the `surface` part and owed its carriage into the contract document by this section.**

**1. WHAT MOVED, AND WHY — WITH ITS TERMS.** **`A122`, verbatim: *"The kernel is supposed to be behind the
published surface, not a separately reachable export."*** **THE ENGINE — the constraint kernel module, whose
home is inside the sibling package at `bindings/js/src/**` — IS BEHIND THE PUBLISHED PACKAGE SURFACE FROM THIS
DATE: it ships INSIDE the package and it is reached ONLY from the entry module's own `write` verb. IT IS NOT AN
`exports` TARGET AND IT HAS NO ARMS-BEARING ARM OF ITS OWN.** **THE ONE DELIVERY ROUTE THIS UNIT DECLARES IS
THEREFORE THE CLAIMED ESM ENTRY ALONE — the namespace `surface.md §2.9` item 1 declares, whose count moves
`8 → 9` with `manageConstraints` — and no consumer-spelled specifier reaches the engine.** **AND ONE
CONSEQUENCE IS PRINTED BECAUSE IT IS WHAT MOVED AND NOT WHAT WAS ALREADY TRUE: another planning pass recommended
a `provident-storeroom/…` SUBPATH EXPORT for the kernel
(`docs/specs/storeroom-constraints/publication-plan.md`), and under `A122` THAT RECOMMENDATION IS WRONG — a
subpath is exactly the *"separately reachable export"* the ruling refuses, and it would also move the `exports`
map's arms-bearing arm count, which `A122` keeps at ONE.** **THAT FILE IS RE-DERIVED BY ANOTHER PASS AND IS
TOUCHED BY NO BYTE OF THIS ONE; this sentence is the pointer and not the edit.**

**2. THE WORK, PHASE BY PHASE, IN THE PHASES `§2` ALREADY NAMES.** **No phase is added, no owner changes and no
output is invented; the three rows below are the cells this section moves.**

| The phase | What it now carries, re-derived | Which cell of `§1`'s scope it writes |
| --- | --- | --- |
| **`Q1` — gate 2, the contract** | **the spec side of this re-homing: `surface.md §2.12` authored, and owed its carriage into `contract.md §2` as a clause; `§2.6`'s one-line pointer; the two moved counts — ⟶ *"(`9` verbs and FIVE own members)"* REPLACED 2026-10-16 BY THIS POINTER (`role_spec_writer`; `RCA-8(g)`: the superseded figures leave this cell and stand at `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md` and `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §12`) — the ONE named export `storeCreate` and the TWELVE-member product, whose one statement is `docs/specs/storeroom-js/surface.md §2.9` item 1's and `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clauses of that date; and the `PAR-JS` rows (`PAR-JS-22`–`PAR-JS-25` at `parameter-semantics.md §2.22`–`§2.25`, the set's operative range being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date). `Q1` writes no package byte and no plugin byte** | `docs/specs/storeroom-js/contract.md` **+ its declared parts** |
| **`Q3` — gate 3, the green** | **the code side, THREE EDITS AND NO FOURTH: (i) the one code defect the gate-1 record MEASURED is closed — the kernel module's own store write must carry the FIFTH POSITION, per `docs/specs/storeroom-constraints/kernel-surface.md` `§1` item 5's dated spelling, so that the entry does not re-enter the kernel for the kernel's own store leg; (ii) the post-creation constraint route is carried as the product's METHODS `addConstraint` · `constraintOn` · `constraintOff` — ⟶ *"(ii) `manageConstraints` is added as the ninth named export and the instance's FIFTH own member, per `surface.md §2.12` item 2"* REPLACED 2026-10-16 BY THIS POINTER (`role_spec_writer`; `RCA-8(g)`: the superseded declaration, its arm region and its moved-out cell stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1`–`§3`) — the receiver being the store, whose member set is TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause, and NO name being added to the module namespace, which carries the ONE name `storeCreate`, `11 → 1` ✓; and (iii) the published allowlist takes the kernel module's own path, so the engine SHIPS** | the JS package inside `bindings/js/**` — `package.json`, its entry points, its generated `.d.ts`, its JS sources and its JS tests |
| **`Q3` — the same phase, the types half** | **`bindings/js/index.d.ts` is re-derived to declare the ONE named export `storeCreate` and the TWELVE-member product — ⟶ the as-filed *"the NINE names and the FIVE own members"* REPLACED 2026-10-16 BY THIS POINTER (`role_spec_writer`; `RCA-8(g)`: the superseded figures stand at `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md` and `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §12`), so a declaration file that still reads eight, nine or eleven verbs or a four-, five- or seven-member product is a FINDING. THE FIGURES AND THE DUTY ARE NOT THIS PLAN'S: they are `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of 2026-10-16 and `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause, and this plan only NAMES the phase that performs the edit** | the JS package inside `bindings/js/**` |

**3. THE ONE EDGE THIS PLAN NOW PUTS WORK UNDER, AND WHAT IT DOES NOT LICENSE.** **THE ENTRY→KERNEL CALL IS
`surface.md §2.12` ITEM 1's AND NOT THIS PLAN'S: a four-position `write` enters the kernel's `K-2`, the kernel
drives the store with the fifth position, the constraint pass runs INSIDE the call, and the two success arms
and the fail arm report back to the caller exactly as that item prints them.** **AND `A125` IS HONOURED BY EVERY
STEP ABOVE: an externally-supplied `commit` is an UNSUPPORTED ANTI-PATTERN and no step of this plan requires
one — the fifth position these edits carry is the KERNEL's own supply of a record identity THIS INSTANCE HAS
ADOPTED (`A124`: passed and matching, the write joins it; passed and matching nothing, it is refused; absent, a
new commit is created) — and a consumer's own supply is neither a step, nor an output, nor a drive's subject**
(`surface.md §2.2` clause 5).

**4. WHAT THIS SECTION DOES NOT DO.** **It adds no phase and no owner; it adds no acceptance item beyond
naming the phase that already owns each edit; it lifts no park; it re-measures nothing; and it writes no byte
outside `docs/specs/storeroom-js/**`.** **The store's crate, its `src/**` and its `tests/**` are NOT TOUCHED —
the engine is the sibling package's own module, and the store's closed `16`-member set, its `8`-verb namespace
and its `379` are UNMOVED** — and **`docs/specs/storeroom-constraints/**`, `docs/specs/storeroom-publish/**`
and the four trackers are OUTSIDE this plan's edit scope: each is re-derived by its own pass or written by a
gate** (`[A2 docs/decisions.md` · `A122` · `A123` · `A124` · `A125`, all 2026-10-16; A3
docs/specs/storeroom-js/surface.md §2.12 and §2.9 item 1's dated clause; A3
docs/specs/storeroom-constraints/kernel-surface.md` `§1` item 5; A3
archive/reviews/2026-10-16-constraints-publication-gate1.md §17.1 · §17.5 · §17.6 | cross-reference]`).

---

## §8. THE `A127` RECEIVER-RULING PASS OF 2026-10-16 — what it owed, what stands, and the ONE ITEM IT COULD NOT DISCHARGE

**ITS ENTRY CONDITION AND ITS SHAPE: the architect's receiver ruling (`A127`, verbatim at `docs/decisions.md`), whose gate-1 verdict is PASS with `A128`'s version fiat, and the SETTLED-RULING LANDS pass the go-ahead authorised — AUTHORING ONLY, no run, no test and no write outside `docs/specs/storeroom-js/**`.**

**1. WHAT IT LANDED, AS PLAN STEPS AND NOT AS CONTRACT CLAIMS.** **The contract text's one home for each of the six landed subjects is named here so a later pass reads the operative clause rather than this plan's summary of it:** **(i) the namespace's fall `11 → 1` and the REMOVAL-VERSUS-DEPRECATION declaration with its ten-name migration map — `surface.md §2.9` item 1's clauses and `§2.9`'s removal clause of this date; (ii) the twelve-member product and the TEN METHODS' arity/answer/refusal table — `surface.md §2.4` item 9 (f)'s `A127` clause; (iii) the product's opacity, the one-name namespace and the one-spelling rule — `surface.md §2.1`'s `A127` clause, **AUTHORED AT THAT SECTION as its `(e)` in the GATE-2 third reviewer-loop pass of this date**, the three rules carried there as OPERATIVE TEXT with the ten methods' table POINTED AT `§2.4` item 9 (f) and not restated, **and that same pass RE-SPELLED `§2.1` (c)'s own `listen`/`unlisten` into the method form and MOVED ITS SUPERSEDED COMMAND OUT to `backup/RCA-A127-2026-10-16-superseded.md §17`, so the site is INSIDE `§2.4` item 3's list at the SIXTH entry and not outside its reach — **AND THIS CELL'S OWN LOCATOR IS CORRECTED 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS, BECAUSE IT WAS STALE TWICE: the list lives at `surface.md §2.4` ITEM 3 and is re-stated at `§2.9` item 1 CLAUSE `2` — WHILE CLAUSE `3` IS THE REMOVAL-VERSUS-DEPRECATION CLAUSE AND LISTS NO SITES — and the SIXTH entry is `§2.12` item 1's stage `2`, `§2.1` (c) being entry ONE and not the sixth; the set is `13` sites from that date, `9 + 4 = 13` ✓ — NOT the `12` this pass was sent to confirm, because NO member of the earlier list is removed: `surface.md §2.12` item 2 clause (ii)'s three signatures carry the `instance` position at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §3`, while only that archive's own summary note calls them position-less — and the thirteen-site enumeration, the count and the searched set printed beside it have their ONE home at `§2.4` item 3 of that date****; (iv) the three constraint methods' position-less shapes and their replacement refusal clause — `surface.md §2.12` items 2 (ii) and 4; (v) `PAR-JS-23` re-derived IN PLACE to a `VACATED` row, no row minted, no id or `§`-home moved — `parameter-semantics.md §2.23`'s clause of this date and `§1`'s count clause; (vi) the typed register's ZERO-ROW rationale and the index region's three figures — `contract.md §5.0` and `§2`'s clauses of this date.**
**2. THE VERIFICATION THIS PASS COULD PERFORM, AND THE ONE IT COULD NOT — PRINTED SO THE PLAN'S OWN ORDER IS HONEST.** **Every check in `§4`'s acceptance criterion that is a READING was performed at the clauses named in item 1; NO CHECK THAT REQUIRES RUNNING ANYTHING WAS PERFORMED, and none is claimed: no test ran, no typecheck ran and no boot was taken.** **THE STEPS A DRIVE OWES ARE THE METHODS' ARITY, POSITIONS, ANSWERS AND REFUSALS — ONE TABLE, `surface.md §2.4` item 9 (f)'s `A127` clause — and the two refusal rules that clause states are the whole of the failure-cell derivation.**
**3. AND IT RECONCILED THIS PLAN TO THE CONTRACT, ONCE, AS `§7` DID FOR ITS OWN SUBJECT: the plan's phases, its `BLOCKED-BY` cells, its acceptance criterion and its stop conditions are UNMOVED, because the receiver ruling adds no phase, no owner and no acceptance item — it re-spells the surface's calls and re-derives one parameter row, which the phases of `§2` already carry.** **A reader who needs the phases reads `§2`; the receiver ruling's effect on them is that every call the phases name is spelled with the store as receiver.**
**4. THE ONE ITEM THIS PASS COULD NOT DISCHARGE, NAMED RATHER THAN LEFT TO INFERENCE — THE ARCHIVAL MOVE-OUT OF `surface.md §2.9` ITEM 1's THREE SUPERSEDED CLAUSES.** **WHAT IS OWED: the `A123`-pass namespace clause (`8 → 9`), the `A126`-pass one (`9 → 11`, `8 + 3 = 11 ✓`) and the owed-types clause that named an eight-verb and a nine-verb `bindings/js/index.d.ts` surface are SUPERSEDED WHOLE by `§2.9` item 1's `A127` clause, and `RCA-8(g)` requires their bytes to LEAVE the file behind one-line pointers.** **WHAT ACTUALLY LANDED, STATED PLAINLY: the ONE-LINE POINTER LANDED and the three clauses' bytes DID NOT — a byte-exact copy could not be taken from these reads in this pass, and a MOVE-OUT CLAIMED WITHOUT THE BYTES WOULD BE FALSE — so the three clauses STAND AT THEIR OWN BYTES MARKED DISPLACED IN OPERATION AND NOT IN TEXT, and a RECONSTRUCTION of the region is filed at `backup/RCA-A127-2026-10-16-superseded.md §1` WITH ITS RECONSTRUCTION DECLARED THERE.** **I WITHDRAW THIS ITEM'S *"OWED"* READING, 2026-10-16 BY THE SCOPE-CORRECTION PASS (`role_spec_writer`; `RCA-8(g)`: a cell may not print a superseded figure under a live label — and a plan cell that files a debt already paid is the same fault in the plan's own register): THE DEBT IS DISCHARGED AND THIS ITEM'S `OWED` READING IS STALE.** **WHAT LANDED, AT THE ARCHIVE'S OWN BYTES AND AT THE SOURCE'S: the as-filed bytes of the three clauses stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §9`, byte-exactly as they stood, and that archive's `§1`'s head NAMES THE DEBT AS DISCHARGED rather than leaving it to this plan's record — *"THE DEBT IS THEREFORE DISCHARGED AND IS NAMED AS DISCHARGED"* — so the completion step this item describes as PENDING has been TAKEN.** **AND `surface.md §2.9` item 1 now carries the ONE-LINE POINTER and NO superseded clause; the `A123`-era and `A126`-era clauses had already left for `§1` in the same pass's first half, and the owed-types clause stands at `§10`.** **THE FORM IS UNCHANGED AND IS NOT RESTATED HERE: no whole-file rewrite of `surface.md` is the remedy (`DEF-2026-10-02`), the move-out is a bounded region edit, and any further archival pass on that file is a SEPARATE NAMED PASS with its own fraction** (`RCA-8(g)`; `docs/defects.md` · `DEF-2026-10-02`; `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §1` and `§9`).
**5. AND THE FRACTIONS OF THIS UNIT'S FILES THAT ARE OVER THE BYTE LINE, NAMED SO NO READER ASSUMES A FULL ARCHIVAL PASS WAS TAKEN: `contract.md`, `surface.md` and `parameter-semantics.md` each stand far over `131,072` bytes and each was edited by this pass BY BOUNDED REGION ONLY. NO FULL ARCHIVAL PASS WAS PERFORMED ON ANY OF THE THREE, no standing text was grown where a superseded clause stood, and each displaced region this pass moved was moved REGION BY REGION and named at its pointer** (`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A122`; A3 `RCA-8(g)`; A3 docs/defects.md · `DEF-2026-10-02` and `DEF-2026-10-16-O` | cross-reference]`).

