# Contract — the generic JS integration for the native Rust store (`U-STOREROOM-JS`, `D-GP-SRJS`): the crossing, the surface, the package, the acceptance layer, and the reconciled plan

- **Status:** **SPEC — the unit's canonical contract document, authored at the gate-2 spec gate of
  `U-STOREROOM-JS` in the pattern-C directory form, in the same pass as its parts and its index region.**
  Gate 1 is **PASSED**: the gate-1 record's verdict is **`APPROVE-WITH-CONDITIONS` · `DELEGABLE`**
  (`docs/specs/storeroom-js-proposal-review.md` `§1.1`, re-issued on that record's own STEP-0
  determination), and **the architect's go-ahead is taken and recorded in that record's own opening
  clause** — his word, verbatim: ***"Proceed"*** (`docs/specs/storeroom-js-proposal-review.md`, the
  `⟶ THE ARCHITECT'S GO-AHEAD` clause; **A1**). **`docs/pending.md` `G-1`'s second conjunct is thereby
  satisfied by the architect's own act for this unit, and no gate is skipped and no gate count moves.**
  **This contract asserts no behaviour clause the architect's rulings supply or that this document itself
  declares as a reversible default; it takes no ruling, answers no residual as a fact, and puts no question
  to the architect.**
- **Unit id / prefix:** **`U-STOREROOM-JS`** is the unit id, and **`docs/specs/storeroom-js/`** is its
  contract directory (pattern C). **Prefix `D-GP-SRJS`** — *declared by this contract, not previously
  filed*: the gate-1 record declared the FORM and named no prefix, and the unit's ids were owed by the spec
  gate. **This document mints FOUR id families and no fifth: the typed register's rows are
  `P-IM-1`/`P-IM-2`/`P-IM-3`/`P-SM-4`/`P-SM-5`/`P-SM-6`/`P-TP-7`/`P-TP-8` (`§5.1`–`§5.8`, `8` rows, cap `≤ 8`),
  the parameter-semantics rows are `PAR-JS-1`…`PAR-JS-18` (`parameter-semantics.md`), the design-default rows
  are `DD-1`…`DD-47` (`§0.2` — `47` AUTHORED rows), and the handoff rows are `HO-1`…`HO-7` (`package.md` `§2`).**
  **No id family of the store unit is reached, re-used or moved** (`[A3 docs/specs/storeroom-native/contract.md §0.1 item 5
  — the store's own `DD`/`PAR`/`P-` families are ITS OWN and the cap is PER UNIT | requirement]`).
- **The gate-1 disposition this contract derives from — one clause, and it is the only `derivation:`
  clause in this document:**
  `derivation: docs/specs/storeroom-js-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  — **the clause's own slots, separated by the middle dot `·`, and its AUTHORITY IS THE FILED GATE-1 RECORD
  ITSELF** (the record's `decomposition` row and its `§4`). **Its slots are read exactly as that row carries
  them, and the reading is disclosed rather than smoothed:** the row's `recommendation` cell reads
  **`NO-SPLIT`**, its `disposition` cell reads **`SPLIT-NOW`**, its `decider` cell reads **`the user`** and
  its `bubble` cell reads **`yes`** with the token **`BUBBLE-ANSWERED: DECLINED | 2026-10-11`**
  (`docs/specs/storeroom-js-proposal-review.md` `§4.1`/`§4.2`). **`SPLIT-NOW` on a `NO-SPLIT` row means the
  split question is SETTLED (declined): the `NO-SPLIT` recommendation is adopted, the proposal stands whole,
  nothing is delegated and no `sub-module` is named — never that anything is delegated**
  (`[A3 docs/specs/spec-authoring-discipline/contract.md §6.4/§6.6 observable (2) — the answered-bubble
  reading, whose `the user` half is EVIDENCE-CONDITIONED on the row's own `BUBBLE-ANSWERED:` token, which
  that row carries | ordering claim]`). **This unit's `ordering anchor` is therefore written here: the spec
  path is `docs/specs/storeroom-js/contract.md` and the status-line token is the `SPEC —` clause above**
  (`[A3 docs/specs/spec-authoring-discipline/contract.md §6.6 | ordering claim]`).
- **The STEP-0 route this contract consumes, cited and never re-authored.** `STEP 0 run: yes`; the trigger
  **fires**; the dossier is `docs/specs/storeroom-js-adoption-dossier.md`, **one identifier row (cap `8`),
  `1` `defined`, `0` `undefined-until-answered`, `0` open-semantics entries, `1` collision row, `0` hits**;
  the row is keyed **`Node-API` / `napi`** and its instrument is the ACTIVE `docs/decisions.md` row naming
  `A1`·`A72` (**A4**; `docs/specs/storeroom-js-adoption-dossier.md` · `Node-API` / `napi`). **The dossier is a
  gate-1 INPUT: it is cited by path, it is not a contract, and no claim of this document is derived from it**
  (`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi | cross-reference]`). **Its snapshot is
  `sha256:8e603aeeed61099df73ba063c40be9949a79458ea9a386ecf044c1df98c11e46` over `23871` bytes · `117` lines,
  recorded by the landing pass in the gate-1 record's own `Dossier snapshot:` cell** (`[A1 | cross-reference]`).
- **Scope boundary — positive (what this contract binds), and nothing else.** Exactly seven things:
  1. **the value crossing** — the deep copy in and the deep copy out, one row per `StoreValue` variant and per
     argument carrier, the walk's per-class rules, the cycle guard and the cost ceiling, and the JS-side
     equality relation (`§1`, and the `crossing` part);
  2. **the JS surface's verbs** — `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` ·
     `listen` · `unlisten`, the handle clause, the registry's four rules, and the single failure form
     (`§2`, and the `surface` part);
  3. **the package** — the claimed realm and every unclaimed realm's declared answer, the publish story, the
     sibling crate's layout and the ownership clause (`§3`, and the `package` part);
  4. **the acceptance layer** — its runner, its pattern, its LAYER label, the round-trip property and the
     handoff ledger (`§4`, and the `acceptance` part);
  5. **the typed `§5.x` register** — `8` rows, cap `≤ 8` (`§5.1`–`§5.8`);
  6. **every declared JS parameter**, with its domain, its outside values and the declared answer for each
     (`parameter-semantics.md`, indexed at `§6`);
  7. **the reconciled plan and the census/handoff regions** (`§7`–`§9`, and the `implementation-plan` part).
  **Nothing of the store's own surface is bound, restated or amended here**: the store's contract directory
  `docs/specs/storeroom-native/**` is **cited, never moved**, and the store's crate (`Cargo.toml` · `src/**`
  · `tests/**`) and its measured green are **not touched and not re-measured as this unit's green**
  (`[A1 docs/specs/storeroom-js-proposal-review.md §5.2 item 3; A3 docs/specs/storeroom-native/contract.md
  §0.4 — the store's crate clause | prohibition]`).
- **Scope boundary — the negative set, each prohibition with its citation.** This contract **may not** and
  **does not** contain: **any byte under `../Provident-Electron/**` read as authority, cited as a source or
  written** — that corpus is *"poisoned"* context and a conflict with it is intentional (**A1**; `A9`);
  **any question put to the architect** (this unit's own gate may put integration questions, but the go-ahead
  is taken and every open detail is a reversible default here — **A1**; `docs/specs/storeroom-js-proposal.md`
  `§11` · `A66`); **any store-side clause amended, added or renumbered** — a clause the unit needs and the
  store's contract does not carry is a **CONTRACT FINDING for the store's author**, reported at `§8`, never
  an inline edit (**A1** `A68`; `A3` `docs/specs/storeroom-native/contract.md §0.1` item 2); **a second typed
  register** in this directory or in the store's (`D-GP-PBT-5` route; **A3**
  `docs/specs/spec-scope-and-structure/contract.md` §C.6's prohibitions); **any binary committed to the
  tracked tree** (**A1** `A71`); **a `dispose()`/`close()` verb at either layer** (**A1** `A74`); **a
  constraint or repair seam, verb or parameter** (**A1** `A73`); **a `findAddress` exposure, a `NodeRef`
  crossing, a live view, a borrow or a shared reference in either direction** (**A1** `A63` · `A65`); and
  **a `test-cases` part that declares a case the contract does not already pin** (**A3**
  `docs/specs/spec-scope-and-structure/contract.md` §C.6 binding rule 1).
- **The part map (a pointer set — no count, no hash, no cap, no order).** Each row states its part's
  **KIND**. **Rows are not ranked and no citation anywhere depends on a row's position**; every part is
  cited by its path and its `§<n>`.

  | Part | Kind | Path | What it carries |
  | --- | --- | --- | --- |
  | **the contract document** (this file; **not a part**, and not an entry of the closure predicate's left side) | — | `docs/specs/storeroom-js/contract.md` | the index region (the status block, the unit/prefix line, the scope boundary, this map), the claim-ledger rules and the design-defaults table (`§0.1`–`§0.3`), the crossing's own clauses (`§1`), the surface's own clauses (`§2`), the package's own clauses (`§3`), the acceptance layer's own clauses (`§4`), the typed register (`§5.1`–`§5.8`), the parameter-semantics index (`§6`), the census region (`§7`), the CONTRACT FINDINGS for the store's author (`§8`) and the handoff ledger (`§9`) |
  | `crossing` | **`carrier`** | `docs/specs/storeroom-js/crossing.md` | the value crossing's whole rules: one row per `StoreValue` variant (`5` admitted + `8` outside), per `Segment` variant (`2` + `10`) and per argument carrier (`8` carriers), the walk rules, the plain-object test, the ceiling, the cycle guard and the equality relation — **a relocation of this document's `§1` text whole, with every `§`-number, rule and citation unchanged** |
  | `surface` | **`carrier`** | `docs/specs/storeroom-js/surface.md` | the verbs that cross, `findAddress`'s non-exposure, the handle clause, the registry's four rules, the single failure form, listener delivery and the constraint/repair pattern — **a relocation of this document's `§2` text whole** |
  | `package` | **`carrier`** | `docs/specs/storeroom-js/package.md` | the claimed realm, the `HO-` handoff rows, the prebuild/publish story, the sibling-crate layout and the ownership clause — **a relocation of this document's `§3` text whole** |
  | `acceptance` | **`carrier`** | `docs/specs/storeroom-js/acceptance.md` | the JS test layer's runner, pattern and LAYER label, the round-trip property, and the handoff ledger — **a relocation of this document's `§4` text whole** |
  | `parameter-semantics` | **`carrier`** (its own authored rows are this part's admissible content; the `§6` index relocates here) | `docs/specs/storeroom-js/parameter-semantics.md` | **relocated:** the `§6` index; **and authored:** one row per declared JS parameter — **`PAR-JS-1`…`PAR-JS-18`** — carrying the parameter's kind, its unit, its domain, **the values outside it**, the declared answer for **each** outside value, its supplier, its evaluator and its observable |
  | `implementation-plan` | **`carrier`** | `docs/specs/storeroom-js/implementation-plan.md` | the unit's ordered landing/verification plan **and its acceptance criterion**, **reconciled to this contract and dated** at a dated clause that stands beside the as-filed plan text — carrying **no pinnable claim this contract does not already carry**; the as-filed proposal-stage plan's own bytes stand whole and are never overwritten |
  | `test-cases` | **`view`** | `docs/specs/storeroom-js/test-cases.md` | a **derived INVENTORY** of the cases this contract already pins, each row citing the `§n` that pins it; **its first line states that it contains NO executable tests**; **it declares nothing the contract does not already carry** |
- **Scope boundary — the recorded omissions (part of the closure predicate, and they are ABSENT, never written
  empty).** The **four** names below are **OMITTED from this unit's contract, with their reason recorded
  here**: **an omitted part is ABSENT, and an empty file at any of these paths is a gate-2 finding**; **a name
  that would carry nothing is omitted rather than written empty**, and **an omitted name contributes to
  NEITHER side of the closure predicate** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.3 — the
  omissions' complement status, and §C.6's binding rule 3 | requirement]`).

  | Omitted part (slug) | Why it is omitted for **this** unit | Its state |
  | --- | --- | --- |
  | `property-register` | **This unit HAS a register, and the register's canonical home is the contract document's own `§5.x` region, authored WHOLE in this pass — so a part would hold no row the document does not already carry**, and it would be a **second addressable home for the same rows**, which the second-register rule forbids (`D-GP-PBT-5`'s route; **A3** `docs/specs/spec-scope-and-structure/contract.md` §C.6's prohibitions). | **omitted; the name stays ADMISSIBLE** and may be authored later by its own bounded pass, which would MOVE the rows and leave no second home |
  | `data-class-structure` | The part is a **derived VIEW of structure the contract already declares**, and **a new declaration in it is a gate-2 finding**. **This contract declares its crossing's structure at `§1.2`–`§1.4` and its surface's structure at `§2`; the `crossing` and `surface` `carrier` parts carry the same text whole, so a view part would declare nothing new and lose no claim.** | **omitted; ABSENT, never written empty** |
  | `process-flow` | Same footing as the row above: a **derived VIEW** of a flow the contract already declares. **This contract declares the flow it has — the construction's sequence (`§3`/`§2.1`), the verb's round trip (`§4.3`) and the registry's transitions (`§2.4`) — and the ordering claims that carry it are `§2.1`'s and `implementation-plan.md`'s own.** | **omitted; ABSENT, never written empty** |
  | *(none further)* | **The five-name set's fifth name is `test-cases`, and it is AUTHORED here, not omitted** — it is a `view` part and its file is present. | — |
- **Closure state — `CLOSED`, on the single arithmetic.** `{part-map PART entries}` = `{rows of the part map} −
  {the contract-document row}` = **`6`** · `{files present in docs/specs/storeroom-js/} − {contract.md}` =
  **`6`** (`crossing.md`, `surface.md`, `package.md`, `acceptance.md`, `parameter-semantics.md`,
  `implementation-plan.md`); **`3` recorded omissions contribute to NEITHER side** — so the predicate reads
  **`6 = 6`** and this unit's state is **`CLOSED`** (`[A3 docs/specs/spec-scope-and-structure/contract.md
  §C.3 — the closure predicate's single arithmetic, the recorded omissions held to NEITHER side | census]`).
  **The closure arithmetic is a `CENSUS` observation about the file set and is not a claim about the
  package's behaviour.** **`test-cases`'s file is `test-cases.md` and it is a PART entry, not a recorded
  omission; the `3` omitted names are `property-register`, `data-class-structure` and `process-flow`, each
  recorded with its reason in the omissions table above, and the count is printed here so the predicate's
  two figures are read with their terms** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 —
  the entry-counted unit and the recorded-omissions row | numeric or census claim]`).

---

## §0. The index region's own rules — the claim ledger, the design-defaults table, and the id families

### §0.1 The document's own form rules

1. **Two regions.** The index region above (status line with its `derivation:` clause, unit/prefix line,
   scope boundary and part map) is **required content and carries no pinnable claim of the six classes**;
   the claim-bearing region is `§0.2` onward, and **every clause there carries its authority and its class
   inline** (`[<authority> | <class>]`), per the ledger rule this document states for itself at items 2–3
   and 11 below (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.2 — the two-region rule | requirement]`).
2. **The authority spellings this document uses, each inside the CLOSED five-form enum, and the
   seven-tag bridge this project's other directories print.** **The five forms, and no sixth:**
   - **`A1`** — a **user/architect statement recorded in this workspace**, cited by the tracker row that
     records it: `<path>:<line>` — a `docs/next-steps.md` / `docs/pending.md` / `docs/decisions.md` row
     whose text is the statement, plus its date;
   - **`A2`** — an **ACTIVE `docs/decisions.md` `D-id` or `A<n>`-named row**, cited `docs/decisions.md · <id>`;
   - **`A3`** — a **filed spec `§`**, cited `docs/specs/<unit>/contract.md §<n>` or
     `docs/specs/<unit>/<part>.md §<n>` — **in this document's own directory the path is written out
     wherever the target is outside this file, because a bare `§n` across two documents is not an
     edge**;
   - **`A4`** — a **dossier row**, cited `docs/specs/<unit>-adoption-dossier.md · <identifier>`, never by an
     `A-<n>` id;
   - **the inferred form** — the **status** form, which **stands nowhere in this document**: **`0`
     `INFERRED` annotations are written here**, because every clause below is carried by a resolving
     `A1`–`A4` citation (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.3 — the closed enum, its
     rules 1–10 | requirement]`).
   **AND ONE BRIDGE, STATED SO A READER OF THIS PROJECT'S OTHER DIRECTORIES DOES NOT READ THIS DOCUMENT'S
   TAGS AS A SIXTH FORM** (`RCA-8(d)` ANNOTATE-BESIDE: no cell of any other directory moves by this clause,
   which is a **reading rule for this file's own tags only**): **the store unit's contract prints a
   seven-tag family — `P` · `A` · `R` · `S` · `L` · `M` · `T` — and this document's four citation forms
   SUBSUME it one for one: `P` and `A` are **`A1`/`A2`** (the in-project ruled artifact with its ruling, and
   the ACTIVE `docs/decisions.md` row); `R` is **`A1`** where the gate-1 record carries the architect's own
   answered rows and **`A3`** where it is read as a filed record's section; `S` is **`A3`** (a filed
   process-rule spec's `§`); `L` is **`A4`**; `M` is a measurement of a path and is **written only where a
   figure is quoted from the artifact that carries it, and never as a citation value**; `T` is **the
   document's own declaration**, which this document writes as an `A3` self-reference where the clause also
   exists in a part and as a bare declaration where it does not.** **The store's seven-tag family is
   therefore NOT adopted as an eighth enum here; it is mapped, and the map is the whole of this item's
   claim** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.3 rule 9 — the enum is closed at five
   forms and a citation in a sixth spelling is a gate-2 finding | requirement]`).
3. **The claim classes are the CLOSED six:** **`requirement`** (a MUST/MUST NOT/prohibition) ·
   **`declared parameter semantics`** · **`state or fail-state declaration`** · **`numeric or census
   claim`** · **`cross-reference`** · **`ordering claim`**. **Every pinnable claim below carries an
   authority and one of these six; a claim with no authority, an authority outside the enum of item 2, or a
   class outside this set is a gate-2 finding** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 |
   requirement]`). **A `DECLARED-DEFAULT` is not a seventh class: it is a claim of the class its own text
   carries — usually `declared parameter semantics` or `state or fail-state declaration` — whose `alt` cell
   is mandatory and whose reversal point is an instrument.** **A `RECORDED-GAP` is likewise not a class: it
   is a `numeric or census claim` whose own text states that the count is non-re-derivable here.**
4. **The adjudications this document obeys, stated so they are not mistaken for the corpus's own.**
   **No clause of this contract is derived from `../Provident-Electron/**`**: that corpus is **context,
   never a source**, and *"where my instructions conflict with the existing work is intentional"*
   (`docs/specs/storeroom-js-proposal.md` `§11` · `A9`; **A1**; `docs/specs/storeroom-native/contract.md
   §0.1` item 4 prints the same adjudication for the store). **A disagreement between a clause below and
   that corpus is therefore intentional and is not evidence of a defect** (`[A1 | prohibition]`).
5. **The typed register's row form and cap.** The register is `§5.1`–`§5.8`, its rows are `P-IM-n`
   (invariant), `P-SM-n` (state-machine/arm) and `P-TP-n` (transition/property) rows, **never `F`-rows and
   never a `§6`/`FS-n` form**, and its cap is **`≤ 8` rows per unit** — **and the cap is PER UNIT, so this
   unit owes its OWN register and authors no row in the store's**
   (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions — no per-part reading of the
   cap and no second register | requirement]`).
6. **The dossier's clause cell resolves against THIS directory.** The dossier's clause cell reads
   `decision <the ACTIVE row naming A1·A72> — awaiting spec`, and the transition instrument admits
   **`spec §n`** once a filed spec carries the section. **This contract supplies it: the carrier's clause is
   `§3.1`'s of this document and the `package` part's, and the row's resolution is written at
   `package.md §1.1`** — so **the cell's third legal value is reachable from the bytes of this pass**
   (`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi | cross-reference]`).
7. **The citation-admissibility rule.** **No citation of this document points at a path or an id that does
   not exist in this repository.** **Where a rule this document obeys comes from a process-rule spec or an
   agent role file that is NOT filed under this repository, the clause STATES THE RULE ITSELF and tags it as
   its own declaration, rather than citing a path that cannot be opened** — and **the two process-rule specs
   this pass read are named at `§7`'s provenance as read-only citation text and are NOT cited as `A3`
   targets here**, because their paths lie outside this workspace (`[A3
   docs/specs/spec-authoring-discipline/contract.md §3.3 rule 2 — a missing or unresolvable authority is
   fail-loud | requirement]`).
8. **THE ONE-PREDICATE RULE, RESTATED WITH ITS RESOLVING CITATION:** **a lower-tier version IS a
   lower-persistence version**, so **every clause of this document that says *"lower persistence"* means
   the store's `rank` ascending**, exactly as `docs/specs/storeroom-native/contract.md §0.1` item 8 reads it
   (`[A3 docs/specs/storeroom-native/contract.md §0.1 item 8 | cross-reference]`).
9. **THE CLOSED-STATUS-CODE RULE, RESTATED WITH ITS RESOLVING CITATION:** **the store's failure channel is a
   CLOSED SET OF STATUS CODES with GENERATED messages**, `15` members ranked `1`…`15`, whose membership is
   the STORE contract's to close — **and this unit MINTS NO CODE, WIDENS NO SET, and renames no member**
   (`[A3 docs/specs/storeroom-native/contract.md §8.1 · §8.2 · §8.3 | cross-reference]`).
10. **THE OMISSION RULE AND THIS UNIT'S OWN OMISSION TABLE.** **A part name that would carry nothing is
    OMITTED RATHER THAN WRITTEN EMPTY**; **an omitted part is ABSENT, and an empty file at its path is a
    gate-2 finding**; **every omission is recorded with a one-line reason in the scope boundary's omissions
    table**, and **the omissions contribute to NEITHER side of the closure predicate**
    (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate and the omissions'
    complement status | requirement]`). **THIS UNIT RECORDS THREE OMISSIONS AND AUTHORS TWO OF THE
    FIVE-NAME SET'S NAMES AS PARTS; THE ARITHMETIC IS PRINTED SO THE TABLE IS READ WITH ITS TERMS:**
    - **`property-register` — OMITTED, with its reason recorded in the scope boundary's table:** this unit
      **HAS** a register, **and the register's canonical home for it IS the contract document's own `§5.x`
      region, authored WHOLE in this pass**, so a `property-register` part would hold no row the document
      does not already carry and would be a **second addressable home for the same rows**, which the
      second-register rule forbids. **The name stays ADMISSIBLE and may be authored later by a bounded pass
      that MOVES the rows and leaves no second home.**
    - **`data-class-structure` — OMITTED:** a **derived VIEW** of structure this contract already declares
      at `§1.2`–`§1.4` and `§2`, and **the `crossing`/`surface` carrier parts carry the same text whole, so a
      view part would declare nothing new**; **an omitted part is ABSENT, never written empty.**
    - **`process-flow` — OMITTED:** the same footing, over the flow this contract already declares (the
      construction's sequence, the verb's round trip, the registry's transitions) — **and the ordering
      claims that carry the flow are `§2.1`'s and the `implementation-plan` part's own, not a view's.**
    - **`test-cases` — NOT OMITTED: it is AUTHORED**, and it is a `view` part whose file `test-cases.md` is
      present and whose first line carries the required statement.
    **THE COUNT, STATED SO IT CANNOT BE MISREAD: `5` names = `3` omitted + `2` authored
    (`implementation-plan` · `test-cases`), and the `3` omissions enter the predicate on NEITHER side** —
    **so the closure reads `6 = 6` and nothing in the arithmetic depends on the omission count**
    (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — the name-resolution table and its binding
    rule 3, and §C.11.7's entry-counted unit | numeric or census claim]`).
11. **THE CLAIM LEDGER'S OWN TWO CLOSED SETS, RESTATED ONE LAST TIME SO EVERY CITATION'S ENUM IS IN THIS
    DOCUMENT AND NOT IN A FILE THIS REPOSITORY DOES NOT CARRY:** **the authority forms are the CLOSED five
    of item 2; the claim classes are the CLOSED six of item 3; and no seventh value stands in either.**
    **AND ONE DISCLOSURE THIS ITEM OWES: the five-form enum's `A3` target is "a FILED spec of THIS repo",
    so the two process-rule specs this pass read are named at `§7` as read-only citation text and never as
    citations — the count of `A3` citations in this directory that point outside this workspace is
    `0`** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.3 rule 6 | numeric or census claim]`).

### §0.2 THE DESIGN-DEFAULTS TABLE (`DD-1`…`DD-47`, `47` AUTHORED rows) — every residual, reversible, with its alternative priced

**WHAT THIS TABLE IS.** **Every residual the architect's rulings leave unnamed, AND EVERY ONE OF THE `28`
CARRIAGE ROWS the gate-1 record names as this unit's own material, enters this contract as a DECLARED,
REVERSIBLE default** — never as a blocker and never as a question. **Each row states: what it pins · the
clause it cites · what it REFUSES · the property that checks it · its priced alternative · its reversal
point.** **A `DD` row is a claim whose class is the one its own text carries, and its `alt` cell is
mandatory** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set, and the rule that a
pinned default carries a priced alternative | declared parameter semantics]`).
**THE REVERSAL POINT, STATED ONCE FOR EVERY ROW WHOSE SOURCE IS A RULING'S SILENCE:** **a fresh ruling of
the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of
`docs/specs/storeroom-js/`**; **no `DD` row may be reversed by a later pass's preference, and a park is never
a reversal point** (`[A1 docs/specs/storeroom-js-proposal.md §11 · A66 — the park's lift was the architect's
own act; a park is not an instrument a row may name | ordering claim]`).
**AND THE PREAMBLE'S INSTRUMENT RULE, STATED WITH ITS OWN CONSEQUENCE:** **the reversal point of a row whose
source is this contract's own choice is a bounded amendment of `docs/specs/storeroom-js/`, owned by
`role_spec_writer`, with the amendment row recorded**; **the reversal point of a row whose source is a
RULING's silence is a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row followed
by that same bounded amendment** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-12`'s
`DECLARED-DEFAULT` carriage | requirement]`).

| DD | The residual it carries (the carriage row or the ruling's silence) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-1`** | **the crossing's ARGUMENT CARRIERS' permissiveness** — `AddressArg`/`TierArg`/`TierSetItem`/`OpIdArg`/`FilePathArg`/`JournalLengthArg`/`ListenersArg` each carry their store-side outside variants as VALUES rather than as pre-checked errors | **the binding ADMITS each carrier's outside variants as values and converts them to the store's own refusal by CALLING the store's verb with them**, so the store's own closed fail set stays the ONLY producer of a code and **no second, binding-side refusal surface exists** | `§1.2`; `crossing.md §2` | a binding-side pre-check that throws its own `{status, message}` before the store is called; a JS-side code table; a coerced or silently repaired argument | `P-IM-3`; `P-TP-8` | **a binding-side pre-check with its own code set** — priced: it would give the crossing TWO producers of `{status, message}`, and `A72`'s dossier counts exactly ONE externally-sourced vocabulary token, so a second code surface would need its own dossier row and its own conformance drives; available only with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-2`** | `U2`/`U15`/`U16` · the BINDING LIBRARY CLASS (the gate-1 record's `U2`, closed by `A71`'s publish-with-prebuilds and priced at `§14.3` of the proposal) | **the export layer is built with a Node-API binding library of the `napi-rs` family, named ONLY as *"a Node-API binding library"*; the conversion core beneath it is PURE RUST with no Node-API types** | `package.md §4.1` | a hand-written `napi-sys` FFI layer; a `napi-rs` name written as a contract term; a conversion core that imports a Node-API type | `P-IM-1` (the core is drivable without a Node runtime); `P-TP-7` | **a hand-written `napi-sys` layer** — priced: it moves the conformance risk into hand-written FFI and gives the sibling crate an unsafe surface the `napi` CLI's absence at `L-4` does not force; **and naming `napi-rs` outright in a clause** — priced: that name is a **SECOND externally-sourced token**, so `A72`'s one-row dossier would owe a second row with its own `defined` instrument (`[A4]`); both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-3`** | `U18`/`U19` — the unit FORM's own consequence: this directory's register id family | **this unit's register rows are `P-IM-1`…`P-IM-3`, `P-SM-4`, `P-SM-5`, `P-SM-6`, `P-TP-7`, `P-TP-8` — EIGHT rows, ids minted by `D-GP-SRJS` and by no other family** | `§5.1`–`§5.8` | an `F-`-row family; a `§6`/`FS-n` form; a ninth row; a row added to the store's register; a per-part register | `P-TP-8` | **a `P-SR-*` id family** — priced: it is a rename with no behaviour change, so the price is a citation sweep; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-4`** | `U1`/`U14` · the REALM claim's residual: the addon's internal reach from the ESM entry | **the package's ESM entry reaches the `.node` addon through a `createRequire`-style internal shim, and the shim is NOT a documented, supported, second entry point** | `package.md §1.2`; `package.md §2.1` | a documented `require()` entry; a second `.node` load path; an `exports` map publishing a CJS arm | `P-TP-9` (the module resolves and the addon loads through it) | **publishing a CJS arm as a co-equal entry** — priced: it would make `require` a claimed realm, which `A70` did not claim, and it would oblige the CJS/ESM dual-package hazard's own clause; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-5`** | `U8`/`U23` · the CANONICAL NUMBER SPELLING's observability — the proposal's `K4` | **the canonical number spelling is declared OUTSIDE this unit's acceptance layer and is asserted by the STORE's own Rust battery against the file's bytes; the JS layer never reaches around the store's surface to read `cfg.filePath`** | `crossing.md §4`; `acceptance.md §3` | a JS-side read of `cfg.filePath`; a JSON-text carrier; a JS assertion about the file's bytes | `P-IM-1`'s two declared exclusions | **a JS-side file read** — priced: it reaches around the store's closed surface, which `A63`'s narrowing exists to prevent, and `docs/specs/storeroom-native/contract.md §7.2` item 7 (c) says *"no verb returns JSON text"*; available with a fresh ruling that opens the surface | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-6`** | `U3` · `K18`/`K2`/`K3`/`K4` — the crossing walk's residual | **the input copy IS a structural walk over the JS value, one decision per class, with no JSON-text step anywhere on the path** | `crossing.md §1`–`§3` | a `JSON.stringify`-then-parse route; a Rust-side JSON parser; a text entry point on the store's surface | `P-IM-2`; `P-TP-7` | **a `JSON.stringify` carrier plus a store-side parse** — priced: it is impossible as the store stands (no verb accepts text) and it would **MOVE THE STORE'S DECLARED SURFACE**, which is this unit's stop condition `B`; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-7`** | `U3` · the cross-realm plain-object test's residual | **the plain-object test is STRUCTURAL and REALM-AGNOSTIC: own enumerable string keys only, no accessor properties, no symbol-keyed own property, no holes, and a prototype that is `null` or a realm-agnostic plain-object prototype** | `crossing.md §3.2` | an `instanceof Object` test; an `Object.getPrototypeOf(x) === Object.prototype` test; a test that refuses `Object.create(null)` | `P-IM-2` | **the realm-IDENTITY test** — priced: it refuses a legitimate cross-realm plain object (`vm`, a worker, `structuredClone`), so "plain" would become a property of the caller's realm rather than of the value; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-8`** | `U3` · the walk's two undecided inputs: a symbol-keyed own property and a sparse array | **a value carrying a `Symbol`-keyed own property is REFUSED `ValueNotAdmitted`, and a SPARSE array is REFUSED `ValueNotAdmitted`; neither reading may be chosen silently** | `crossing.md §3.1` | dropping a symbol-keyed member silently; reading a hole as `undefined`; reading a hole as `null`; writing an omitted element | `P-IM-2`; `P-TP-7` | **dropping the symbol-keyed member** — priced: `docs/specs/storeroom-native/contract.md §1.4`'s write-time-failure rule forbids a silent coercion, and a dropped member is exactly that; **and reading the hole as `undefined`** — priced: `Array.from` and `JSON.stringify` disagree on the hole, so neither reading may be chosen silently; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-9`** | `U7`/`U26` · the JS-side EQUALITY RELATION — the proposal's `K3`, the *"third undeclared normalization"* | **the round trip is asserted under one declared relation: member-SET equality for objects (keys compared as a sorted set, never by insertion order), array INDEX ORDER significant, and `Object.is` for numbers where sign and `NaN` matter** | `crossing.md §5`; `acceptance.md §2` | a `===` comparison of objects; a deep-equal that treats `-0` and `0` as equal; a comparison that treats object key order as significant | `P-IM-1` | **member-order-significant object equality** — priced: the engine re-orders integer-like keys regardless of insertion order, so the relation would be unassertable in JS and the round trip could not be driven; **and `===` for numbers** — priced: `-0 === 0` is true while `Object.is(-0, 0)` is false, so a `file`-tier `-0` round trip would be unexpressible; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-10`** | `U31` · the COPY'S COST BOUND — the walk's depth and size ceiling | **the walk refuses a value whose nesting depth exceeds `64` or whose visited-node count exceeds `1,000,000` with `ValueNotAdmitted`, and the package ships no configuration knob for either bound** | `crossing.md §3.4` | an unbounded recursion; a caller-configurable ceiling; a stack-overflow failure path | `P-IM-2` | **no declared ceiling, with the engine's own stack limit as the only bound** — priced: the failure would be the runtime's `RangeError` and not the store's code, so a deep value would produce a failure OUTSIDE the closed `15`-member set; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-11`** | `U3` · the CYCLE guard's declared form | **a cycle in the input is REFUSED `ValueNotAdmitted`, detected on the walk's OWN ANCESTOR STACK, never by a `WeakSet` of visited objects** | `crossing.md §3.3` | a shared-but-acyclic reference read as a cycle; a cycle read as an ordinary object; a `WeakSet`-based test | `P-IM-2` | **a `WeakSet` of visited objects** — priced: it refuses a DIAMOND (a value reachable by two paths but acyclic), which an ancestor-stack test admits; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-12`** | `U6` · the failure channel's form — the proposal's `D5`/`N-4` | **a failure crosses as a THROWN plain object with EXACTLY two members, `{ status, message }` — the store's own `status` token verbatim as a JS `string` and its generated `message` verbatim as a JS `string`** | `§2.5`; `surface.md §5` | a returned tagged union; an `Error` subclass; a `Promise` rejection; a third member (`code`, `cause`, `stack`, `data`) | `P-TP-9` | **a thrown `Error` subclass carrying the two members** — priced: it adds a class the package must export and a `name` literal, and the store's own record declares exactly two members, so the subclass would be a translation of a record rather than the record; **and a returned `{ok, value}` union** — priced: it makes every call site branch on the arm, while the architect's own `status: 'AddressNotFound'` example is a THROWN status code; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-13`** | `U6` · `K6`'s residual, as `A64` narrows it | **the unit owes NO discrimination rule between a stored value and a failure record: storing a value whose shape is indistinguishable from `{status, message}` is an UNSUPPORTED ANTI-PATTERN the caller carries** | `§2.5` | a discrimination helper; a branded failure record; a value-shape check on the success path | `P-TP-9`'s form half only | **a branded failure record** — priced: it needs a third member (refused at `DD-12`) or a `Symbol` key (refused at `DD-8`), and the architect ruled the ambiguity the caller's own fault (`A64`); available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-14`** | `U10`/`U11`/`U15` · `K8`/`D7`/`C5` — the handle's JS spelling | **the construction's `listeners[]` takes handles as PLAIN STRINGS (input), and every handle RETURNED to JS is an OPAQUE JS value the package wraps; `unlisten` accepts the OPAQUE form ONLY; the package compares handle identity internally by the token it holds privately** | `§2.3`; `surface.md §3` | a returned handle that is the token string; an `unlisten` that accepts a bare string; a public token accessor on the wrapper | `P-TP-8` | **ONE spelling in both directions, the STRING** — priced: opacity is surrendered for a guessable `listener-<n>` namespace, which the store's own contract declares an ACCEPTED cross-process hazard and does not defend; **and** a caller-spelled opaque wrapper — priced: `unlisten`'s no-op answer over a fabricated handle stops being drivable; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-15`** | `U11` · `K9`/`D6`/`C6` — the handle→function registry's residual | **the registry is PER PACKAGE INSTANCE, keyed by the opaque handle the package returned, holding AT MOST ONE function per handle, and it is the package's own state — the store knows nothing of it** | `§2.4`; `surface.md §4` | an `unlisten` that unregisters the function; a fan-out registry; a registry owned by the store; a registry surviving the wrapper's collection | `P-TP-8` | **an `unlisten` that also unregisters** — priced: it merges a store-side withdrawal with a package-side holding and would make a re-registration's fate depend on the store's own no-op answer; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-16`** | `U22`/`U28` · `U-24`/`J-13` — the constraint/repair pattern's home, `A73`'s client-side cut | **constraint and repair evaluation is CLIENT-SIDE and is stated ONLY as a usage pattern over declared verbs: evaluate constraints after a `write`, and on a violation call `rollback` with the `JournalOp.opId` the write returned. NO constraint verb, no constraint parameter, no repair route and no seam is declared** | `§2.6`; `surface.md §6`; `parameter-semantics.md` `PAR-JS-18` | a constraint verb; a function-carrying parameter; a repair route through the journal; a store-surface change of any kind | `P-TP-8` | **a store-side constraint surface** — priced: the store declares no constraint surface and adding one is a STORE-SURFACE CHANGE (**stop condition `B`**), which `A68`'s whole layout exists to avoid; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-17`** | `U13`/`U30` · `K17`/`S-7`/`D8`/`C18` — instance ownership and the release question, `A74`'s *"Not needed"* | **one `Store` per package instance, CALLER-OWNED, with NO finalizer and NO release verb at either layer; a dropped wrapper holds only memory to process exit, because the store runs no background work, holds no OS handle beyond `cfg.filePath` and commits synchronously** | `§3.5`; `package.md §5` | a `dispose()`; a `close()`; a `FinalizationRegistry`-based release; a store-level teardown | `P-TP-7` | **a package-level `dispose()`** — priced: it is a small surface addition with a declared no-op on second call, and `A74` declined it, so adding it re-decides a closed ruling; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-18`** | `U17` · `S-9`/`D10`/`C10`/`L-6` — the JS test layer's runner and pattern | **the JS layer runs under `node --test` with `node:test` + `node:assert`, driven through the package's claimed ESM entry, from `bindings/js/`'s own test directory; the Rust layer runs `cargo test` in the sibling crate** | `§4.1`; `acceptance.md §1` | a third-party test runner; a runner that drives the addon directly rather than the package entry; a JS test of the store's Rust-only clauses | `P-TP-9` | **a third-party runner** — priced: it adds a dependency to the delivered package and a second lock file, while `node --test` is on the declared toolchain (`v24.20.0`) and ships with the runtime; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-19`** | `U20` · `L-5`/`C8`/`C17` — the RED SET's ownership and derivation | **this unit's own red set lives in `bindings/js/` (`src/**`'s unit tests beside it, the JS suite in its own directory), is authored FROM THIS CONTRACT ALONE, and is run and reported BEFORE any implementation; the store's `tests/**` is RE-RUN as a non-regression record and never rewritten** | `§4.3`; `acceptance.md §4` | a red set authored after the implementation; a rewritten store test; a weakened assertion; a red set inside the store's `tests/**` | `P-IM-1`; `P-TP-9` | **a red set kept inside the store's `tests/**`** — priced: it would make a root `cargo test` build and run this unit's drives, contradicting the store's plan cell *"NOT DONE IF … a red set outside `tests/**`"* and its single-package green; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-20`** | `U17`/`U29` · the LAYER discipline — `L-6`, `§5` of the gate-1 record | **this unit's JS-side green is an `ENVELOPE/PURE` green and NOTHING MORE; the ASSEMBLED/`APP` layer for this unit is `NONE`, and no node-suite green may be reported as an `APP`-green** | `§4.2`; `acceptance.md §2.3` | an `APP`-green claimed from a node-green; a re-labelling of the store's green as this unit's; a green claimed without its layer | `P-TP-9` | **an `APP`-green driven by a consumer that assembles the package** — priced: there is no assembled application in this repository — the unit delivers a LIBRARY — so the claim would have no host to be green IN; available with a consumer project's own unit | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-21`** | `U29` · `S-8`'s consumer half, `U-38`/`J-8` — the host handoff | **this unit installs, wires and configures NOTHING anywhere; a finding or a wiring duty for any consuming project is a `HO-` HANDOFF ROW and never a patch, and this unit dispatches no patch into any consumer** | `§9`; `package.md §2` | a wiring step in any phase; a `HO-` duty discharged as a patch; a consumer's configuration written by this unit | `P-TP-9` | **a first-consumer wiring step inside this unit** — priced: it would make this unit's scope depend on one consumer's module system and would re-open `A9`'s read-only ruling; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-22`** | `U30` · `S-7`'s delivery half, `U-45` — the FIRING WINDOW and order | **the package invokes a registered listener function SYNCHRONOUSLY AFTER the verb's own call has returned, in the order the package's own registry iteration produces — and NO ORDER IS ASSERTED, because the store declares the order unobservable** | `§2.7`; `surface.md §7` | a declared invocation order; an invocation before the verb returns; an asynchronous invocation with an undeclared scheduler | `P-TP-8` | **an ordering guarantee (registration order, or address order)** — priced: it needs a monotonic ordinal the store's own record does not carry, and the store's `DD-37` declares the returned set order-insignificant; **and** an async delivery — priced: it needs a queue, a flush rule and a failure channel for a throwing body, none of which any ruling names; both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-23`** | `U30` · `S-7`'s delivery half — the THROWING listener body | **a registered function that throws is NOT caught, NOT retried and NOT reported: the exception propagates out of the package's own invocation loop, and the store's verb result is already complete and unaffected by it** | `§2.7`; `surface.md §7` | a `try`/`catch` around a listener body; a retry; a collected error report; a rollback triggered by a listener's throw | `P-TP-8` | **catching and reporting a throwing body** — priced: the report would need a failure channel the package does not own (`DD-12`'s single form is the STORE's), and `A74`'s no-background-work reading leaves no queue to report through; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-24`** | `U14`/`U1` · the ONE ENTRY's shape — the load path's residual | **the package's `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one — and every other subpath a consumer could spell is either absent or an internal file the `exports` map does not expose** | `package.md §1.3` | a co-equal CJS arm; a deep-import path to the `.node`; a wildcard `"./*"` export | `P-TP-9` | **a CJS arm beside the ESM one** — priced: it is a SECOND claimed realm, and `A70` claimed exactly one; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-25`** | `U16` · `A71`'s own silence — the prebuild matrix's membership and hosting | **the prebuild matrix is the three platforms × two architectures the package's first cut supports — `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64` — `5` targets, produced by CI on each release tag and hosted as the registry's own per-target optional-dependency artefacts** | `package.md §3.2` | a committed binary; a `postinstall` build-on-install fallback as the primary route; an `armv7`/`wasm32`/`freebsd` target; a self-hosted binary store | `P-TP-9` | **fewer targets (the host platform's own)** — priced: an ordinary consumer on another platform would then need a Rust toolchain, which `A71`'s publish-with-prebuilds ruling exists to remove; **and a self-hosted artefact store** — priced: it adds a hosting duty and a network dependency the registry already supplies; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-26`** | `U16` · the package IDENTITY — `A71` names no registry identity | **the package's registry identity is `@provident-storeroom/js` and the sibling crate's `[package] name` is `storeroom-js-binding`, with the crate id `storeroom_js_binding`** | `package.md §3.1` | an unpublished package with no identity; a scoped name under an owner this project does not carry; a name colliding with the store's own crate | `P-TP-7` | **an unscoped, project-owned name** — priced: it is a rename with a `package.json` edit and a citation sweep and no behaviour change; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-27`** | `U12` · `A68`'s own silence — the sibling crate's edition, resolver and dependency pinning | **the sibling crate declares `edition = "2021"`, its OWN `Cargo.lock` is NOT committed (it is a library), and its dependencies are pinned by the caret requirement its `Cargo.toml` states; the crate has NO path back into the store beyond the single path dependency `storeroom-native = { path = "../.." }`** | `package.md §4.2` | a workspace membership; a second path dependency reaching into the store's `tests/**`; a vendored copy of the store's sources | `P-TP-7` | **a committed `Cargo.lock`** — priced: it would pin the store's transitive versions for every consumer of a library, which is a consuming-application decision and not a library's; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-28`** | `U5`/`U9` · `A69`'s two ACCEPTED consequences — the guessable namespace and the prior-session token | **the package treats a handle token as OPAQUE and NEVER spells one, so the guessable `listener-<n>` namespace is not reachable through the package's own documented surface; and the package states in its own documentation that a handle MUST NOT be carried across a process reload** | `§2.3`; `surface.md §3`; `parameter-semantics.md` `PAR-JS-8` | a documented token spelling; a serialization of a handle; a handle compared to a user-supplied string; a promise that a handle survives a reload | `P-TP-8` | **documenting the token spelling and letting callers build handles** — priced: it would make the containment note's hazard ordinary and would contradict `A69`'s accepted-consequence cell, which *accepts* the hazard rather than defending it; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-29`** | `U16`/`U15` · the PACKAGE'S OWN `Node-API` CARRIER VERSION — the residual `A71` leaves unnamed: the version the addon is built against and what the package declares about it | **the package declares NO Node-API version floor of its own and NO ABI assertion: the addon is built against the Node-API version the sibling crate's build target declares, and the package's documentation states the floor as the sibling crate's build target rather than as a JS-side constraint** | `package.md §1.4`; `package.md §4.3` | a JS-side ABI check at load; a runtime version assertion in the package; a second floor beside `DD-38`'s engine floor and beside `DD-38`'s own `"engines"` cell | `P-TP-7` | **a runtime ABI assertion in the package's own load path** — priced: it would make the package's load fail with a package-minted failure form (`DD-12`'s single form admits no second shape) for a state the addon's own loader already reports; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-30`** | `U33` · whether a `CLOSED` contract directory is a frozen surface, and `AMEND-FROZEN`'s availability | **`CLOSED` is a DIRECTORY-COMPLETENESS state and never a content freeze: this directory's rows are reversible defaults and this contract may be amended by its own author at a bounded amendment pass** | `§0.2`'s preamble; `§0.1` item 10 | a claim that this directory is frozen; an `AMEND-FROZEN` route taken against this contract | `P-TP-9` | **reading `CLOSED` as a freeze** — priced: it would make every one of the `47` defaults permanent and would contradict the reversal instrument each of their own cells names; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-31`** | `U34` · the store's `DONE` row, its green and its layer | **the store's `DONE` row is not re-opened, its green is not re-labelled and it is NOT re-measured as this unit's green; the store's suite is re-run only as a non-regression record, at the figure the artifact that carries it prints** | `§7.1`; `acceptance.md §4.2` | a re-measured store figure reported as this unit's; a re-opened `DONE` row; a store green claimed at the `APP` layer | `P-TP-9` | **re-running the store's suite as this unit's own acceptance leg** — priced: it makes this unit's green depend on a DONE unit's tree and contradicts `A68`'s non-touch clause; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-32`** | `U35` · `A69`'s store-side landing duties | **the store-side cells `A69` moved (`docs/specs/storeroom-native/contract.md §0.4` clause 2, `parameter-semantics.md §2.10`/`§2.13`, `write-and-read.md §6.2`'s relocated twin and `seams-and-lifecycle.md §10.2`'s relocated prohibition) are CITED as landed and are NOT amended, re-printed or reconciled by this unit; this unit's own reads are taken on the PROCESS scope** | `§2.3`; `§8` | an edit to any store-side cell; a re-derivation of the store's uniqueness domain here; a second copy of the store's reconciliation in this directory | `P-TP-8` | **re-printing the store's reconciliation here** — priced: it would give one rule two addressable homes in two directories and would drift the moment either moves; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-33`** | `U26`/`U24` · the FIGURES' sites and layers — `G-17`'s own finding | **every run, probe and count this unit reports carries its SITE and its LAYER; and the store's operative green is quoted at the figure the artifact that carries it prints, with the as-filed figures named as historical** | `§7.1`; `§7.2` | a figure without a site; a figure without a layer; a figure quoted from memory; a count re-derived as if measured here | `P-TP-9` | **quoting one figure for all time** — priced: three separate acceptance runs print three different figures for the same suite, so a single figure would be false of two of them; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-34`** | the unit's own choice — the WALK's treatment of a `Proxy` | **the BINDING owns proxy detection: a `Proxy` whose target is a plain object is REFUSED `ValueNotAdmitted` (`NonPlainCollection`), because a trap could change the membership between two reads of the same value** | `contract.md §1.4` item 4 (g); `crossing.md §3` | a `Proxy` walked as its traps report; a `Proxy` detected by a vendor-specific check; a `Proxy` admitted with a single-read assumption | `P-IM-2` | **walking the proxy as its traps report (single read)** — priced: the walk reads each member once, so a non-deterministic trap would make the copy's content a function of read order and unassertable; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-35`** | the unit's own choice — the WALK's treatment of `Object.create(null)` | **`Object.create(null)` is ACCEPTED as a plain object** | `contract.md §1.4` item 4 (e); `crossing.md §3` | a test that refuses a prototype-less object; a coercion of it into a prototype-carrying form | `P-IM-2` | **refusing it** — priced: it has no prototype at all, which is the plainest case there is, so refusing it would be a test that refuses its own premise; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-36`** | the unit's own choice — the CONSTRUCTION call's shape on the JS side | **`storeCreate(cfg)` takes ONE plain object with the store's THREE declared keys (`filePath` · `journalLength` · `listeners`), and the package passes them through WITHOUT adding a default, a rename or a fourth key** | `§2.1`; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4` | a defaulted `journalLength`; a required `filePath`; a `listeners` default of `[]`; a fourth key the package injects | `P-TP-7` | **defaulting `listeners` to `[]`** — priced: an ABSENT `listeners` is one of `PAR-12`'s own outside values and its declared answer is `AddressMalformed` with no instance, so a default would make a declared refusal unreachable; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-37`** | the unit's own choice — the READ's tier argument spelling on the JS side | **`read(address, tier?)` and `readLiteral(address, tier?)` accept the store's own two spellings — one token or an array of tokens — verbatim, and the package neither normalizes nor validates them** | `§2.2`; `parameter-semantics.md` `PAR-JS-6` | a normalized tier spelling; a pre-validated tier; an array flattened or de-duplicated by the package | `P-TP-8` | **accepting only a single token on read** — priced: it would make the store's own any-match set unreachable from JS and would narrow a declared parameter's domain; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-38`** | the unit's own choice — the PACKAGE's own JS runtime floor | **the package declares `"engines": { "node": ">=18.0.0" }`, which is the floor the Node-API carrier's own version needs and not a floor this unit measures** | `package.md §1.4` | an unbounded engine floor; a floor justified by a measurement this pass did not take; an Electron-specific floor | `P-TP-9` | **a higher floor (`>=20`)** — priced: it would exclude consumers the carrier itself serves, and the version is a declaration rather than a measurement; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-39`** | the unit's own choice — the JS SIDE'S SPELLINGS of the store's returned records | **the store's returned records cross as fresh JS objects with the store's OWN member names: `WriteResult` → `{ op, watched, triggered }`, `DeleteReceipt` → `{ address, tiers, triggered }`, `JournalOp` → `{ opId, kind, address, tier, before, after, seq, compacted }`, `BaseState` → `{ present, value }`, `RollbackResult` → `{ opId, undoneOps, restoredTo }`, and a tier crosses as the STRING token `'file'|'mem'|'temp'`** | `crossing.md §1.3`'s returned-record rows; `parameter-semantics.md` `§2.13`–`§2.16` | a renamed member; a camel-cased re-spelling of `opId`; a numeric index for a tier; an opaque wrapper for a record | `P-IM-1`; `P-TP-9` | **a camel-casing pass over the store's member names** — priced: `opId` is the store's own declared spelling (`docs/specs/storeroom-native/contract.md §0.4`) and a re-spelling would make the contract's own spelling table and the JS surface disagree; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-40`** | the unit's own choice — the BINDING's error path when the store returns a code outside the closed set | **the binding maps a code outside the `15`-member set to a thrown `{status, message}` whose `status` is the received token VERBATIM and whose `message` is generated by the store's own `storeErrorMessage`; the package MINTS NO CODE and throws NO code of its own** | `§2.5`; `surface.md §5` | a package-minted code; a silently swallowed non-member; a re-mapped code | `P-TP-9` | **throwing a package-owned `UnknownFailure` code** — priced: it adds a token outside the store's closed set, which the store's own contract calls *"a contract violation, not an extension of the set"*; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-41`** | the unit's own choice — the HANDOFF rows' ids | **the `HO-` family is minted here as `HO-1`…`HO-7`, one row per unclaimed realm and one for the IPC route, and the tracker rows the `HO-` duties land in are written by the TRACKER gate and not by this pass** | `§9`; `package.md §2` | a handoff duty discharged as a patch; an unnumbered handoff; a handoff row without a positive revisit condition | `P-TP-9` | **deferring the `HO-` ids to the tracker gate** — priced: the realm clause would then print unnumbered duties, which `AR-7` forbids; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-42`** | the unit's own choice — the PUBLISH step's TRIGGER and versioning policy | **the prebuild matrix is produced on a release TAG of the form `v<major>.<minor>.<patch>`, the package's `version` is that tag's, and NO publication happens from an untagged commit** | `package.md §3.3` | a publish from a branch; a version bumping on every commit; a prebuild matrix produced by hand | `P-TP-9` | **publishing from `main`'s head on every merge** — priced: an artefact with no identity to name and no reproducible tag to rebuild from, while the store's own plan cites reproducibility as its build's property; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-43`** | the unit's own choice — the `AGPL-3.0` declaration's SITE | **the licence is declared in the package's `package.json` `license` field, in `bindings/js/README.md`, and at `package.md §3.4`; the licence file itself is NOT copied into the sibling crate** | `package.md §3.4` | a copied `LICENSE` file inside `bindings/js/`; an undeclared licence; a licence other than the repository's | `P-TP-9` | **copying `LICENSE` into `bindings/js/`** — priced: it would duplicate a tracked file that the registry artefact already has to carry, and a stale copy is a silent licence divergence; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-44`** | the unit's own choice — the JS-side spelling of the CONSTRUCTION's `listeners[]` entries | **each entry is a plain JS object `{ address, handle }` where `address` is a JS array of segments and `handle` is a plain non-empty `string`** | `§2.1`; `parameter-semantics.md` `PAR-JS-4` | an entry carrying a wrapper object for the handle; an entry carrying a string address; an entry with a third member | `P-TP-7` | **accepting the package's own opaque wrapper in the construction** — priced: no wrapper exists before an instance does, so the construction would be unspellable for a first instance; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-45`** | the unit's own choice — the `delete` and `rollback` verbs' JS-side file behaviour | **`delete` and `rollback` perform no file I/O, so a JS caller that deletes or rolls back a `file`-tier version and then re-`storeCreate`s over an equal `cfg.filePath` sees the deleted version STAND AGAIN, and the package DOCUMENTS this as the store's own declared boot rather than as a defect** | `§2.8`; `surface.md §8` | a package-side compensating file write; a package-side re-commit; a package claim that a delete is durable | `P-TP-7` | **a package-side commit after a delete or a rollback** — priced: it would give the package a file-write duty the store deliberately does not carry, and it would need a failure channel for a write the store's own closed set declares only for a WRITE's commit path; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-46`** | the unit's own choice — the ARITY the package accepts for each verb's arguments | **the package passes every argument position through as supplied and performs NO arity check of its own: a missing, extra or wrong-shaped argument reaches the store's own carrier value and answers the store's own code** | `§2.2`; `parameter-semantics.md`'s every row | a JS-side arity check; a `TypeError` for a missing argument; a defaulted argument | `P-TP-8` | **a JS-side arity check throwing a package `TypeError`** — priced: a `TypeError` is a failure form OUTSIDE `DD-12`'s single form and outside the store's closed set, so the crossing would carry two failure channels; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-47`** | the unit's own choice — the CENSUS of `P-1`'s rows, at its own site | **the `28` rows are disposed of ROW BY ROW at `§7.3`, and the partition table that carried them is marked NON-RE-DERIVABLE here rather than reconstructed** | `§7.3`; `§8` item 1 | an invented row id; a reconstruction of the listener unit's partition table from memory; a silent disposal of the census | `P-TP-9` | **re-deriving the partition from the three step reports** — priced: those reports are transcriptions whose losses are filed as a defect class, so a reconstruction would be evidence about a transcription and not about the partition; available when the archival loop recovers the table | a bounded amendment of `docs/specs/storeroom-js/` |

**AND THE TABLE'S OWN CENSUS, PRINTED WITH ITS TERMS, AND ITS NUMBERING DISCLOSURE BESIDE IT SO A READER
COUNTS ROWS AND NUMBERS THE SAME WAY** (`RCA-8(d)` ANNOTATE-BESIDE: **the rows and the closing arithmetic
above stand byte-for-byte, and THIS clause is the operative statement of the table's size and of the one
numbering fact a reader needs**; `[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set
and the `alt` obligation | numeric or census claim]`): **the table carries `47` AUTHORED rows in TWO blocks —
`DD-1`…`DD-29` (`29` rows, `28` CARRIAGE rows and the residuals with them) and `DD-30`…`DD-47` (`18` rows,
the unit's own choices over the package, the acceptance layer, the handoff ids and the census region) — so
`29 + 18 = 47` ✓, the numbers run `1`…`47` with NO gap, `DD-29` is the `Node-API` carrier-version row and is
PRINTED at the table's foot, and NO row's citation depends on its printed position.**
**AND ONE ARITHMETIC THE READER MAY CHECK RATHER THAN TRUST: the `28` CARRIAGE ROWS the
gate-1 record names are absorbed HERE, and each row's own subject is traceable to one of the rows above or
to a part** — the realm (`DD-4`, `DD-24`, `DD-25`) · the builder/ABI and packaging path (`DD-2`, `DD-25`,
`DD-42`) · the host handoff (`DD-21`) · the crossing of every value the store produces (`DD-1`, `DD-6`,
`DD-7`, `DD-8`, `DD-39`) · the load path (`DD-24`, `DD-38`) · the surface's ownership (`DD-17`, `DD-40`) ·
the module-supplied functions' crossing (`DD-16`) · the consumer question (`DD-21`) · the in-flight cycle's
disposition (`DD-22`, `DD-23`) · the parameter rows' arity (`DD-37`, `DD-46`) · the event surface
(`DD-14`, `DD-15`) · the resolver's returned shape (`DD-14`) · the canonical spelling's observability
(`DD-5`) · the equality relation (`DD-9`) · the copy's cost bound (`DD-10`, `DD-11`) — **and each of the
`28`'s own ids is disposed of EXACTLY ONCE at `§7.3`, which is the map the gate-1 record's
`AR-8` condition requires and the stale citation `G-1` names is repaired there rather than here.**
**AND ONE NUMBERING DISCLOSURE, STATED SO THE TWO COUNTINGS AGREE** (`RCA-8(d)` ANNOTATE-BESIDE: this
sentence adds no row, drops no row and moves no cell): **the rows are PRINTED in one order and NUMBERED in
another in exactly ONE place — the row that carries the `Node-API` CARRIER'S VERSION is NUMBERED `DD-29` and
is PRINTED at the table's foot, so a reader who walks the table top to bottom meets `DD-30` before `DD-29`;
the numbers still run `1`…`47` with no gap, and NO citation in this directory depends on a row's printed
position.**

### §0.3 THE RESOLUTION OF THE DOSSIER'S CLAUSE CELL — `decision … — awaiting spec` → `spec §n`

**The dossier `docs/specs/storeroom-js-adoption-dossier.md` carries one identifier row, keyed
`Node-API` / `napi`, whose clause cell reads `decision <the ACTIVE row naming A1·A72> — awaiting spec`. THE
TRANSITION INSTRUMENT this contract's `§0.1` item 6 names admits `spec §n` once a filed spec carries the
section; the section is supplied here, and the resolution follows.** **It is a `cross-reference` claim and
changes no byte of the dossier** (`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi |
cross-reference]`).

| The dossier's row (`identifier`) | The meaning the dossier records | The section of THIS directory that pins it |
| --- | --- | --- |
| **`Node-API` / `napi`** (`kind = vocabulary-token`) | the carrier: which binary interface the package's native half is built against and loaded through, at the version the package's own build target declares; and, a Node-API addon being a CJS artefact, the ESM entry that reaches it | **`docs/specs/storeroom-js/contract.md` `§3.1` and `docs/specs/storeroom-js/package.md` `§1.1`** (the carrier clause and the claimed realm) · **`docs/specs/storeroom-js/package.md` `§4.1`** (the sibling crate that carries the carrier) · **`docs/specs/storeroom-js/contract.md` `§3.2`** (the `HO-` set the carrier cannot reach) |

**AND THE CELL'S TWO REMAINING VALUES, STATED SO THE ROW IS FULLY DISPOSED OF:** its `STATUS` is
**`defined`** and stays `defined` — this contract supplies a section, not a meaning; and its **source
citation** (`docs/specs/storeroom-native-proposal.md §9`'s adoption-ruling row with the architect's `A1`)
is the dossier's own and is **not re-authored here** (`[A4 docs/specs/storeroom-js-adoption-dossier.md ·
Node-API / napi | cross-reference]`).

---

## §1. The value crossing — deep copy in, deep copy out, and no shared ownership either way

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried, rule for
rule, at `docs/specs/storeroom-js/crossing.md` (`§1`–`§5` of this document, relocated WHOLE), which is the
`carrier` part this directory's map declares for it.** **A citation to it names that part's path plus the
`§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 — the ordinary cross-reference clause | requirement]`).
**The relocation is not a re-derivation: no claim below gains or loses an authority by moving, and every
authority citation stands unchanged in both homes** (`[A3 docs/specs/spec-scope-and-structure/contract.md
§C.11.6 — the kind rule | requirement]`).

### §1.1 The copy discipline, ruled — both directions, and nothing else

**THE ARCHITECT'S RULING, VERBATIM:** ***"Input must deep-copy the external data into the store, and the
output must deep-copy from the store into the JS output. Neither the store nor the JS should be able to get
a reference/pointer to data owned by the other."*** (`docs/specs/storeroom-js-proposal.md` `§10` · `A65`).
**THE DISCIPLINE, IN FOUR CLAUSES AND NOTHING ELSE:**
1. **INPUT IS A DEEP COPY.** A JS value the caller passes is **read once and CONVERTED into a value the
   STORE owns**; the store retains **no reference into JS memory**.
2. **OUTPUT IS A DEEP COPY.** A value the store returns is **CONVERTED into fresh JS-owned data**; the JS
   side holds **no reference into store-owned data**.
3. **NO SHARED OWNERSHIP EITHER WAY.** **No proxy, no live view, no getter into either side, no borrow and
   no pointer crosses in either direction, at any verb, at any argument position and at any return
   position.**
4. **CONSEQUENTLY THE BOUNDARY IS A VALUE BOUNDARY IN BOTH DIRECTIONS.** A mutation on one side after a
   call is **invisible** to the other, and **neither side's lifetime constrains the other's**.
   (`[A1 docs/specs/storeroom-js-proposal.md §10 · A65 | requirement]`)

**AND THE THREE THINGS THE RULING DOES NOT SAY, EACH DISPOSED OF HERE AS A DECLARED DEFAULT RATHER THAN
LEFT TO DISCOVERY:** **how either copy is performed** — the input copy **is** a structural walk
(`crossing.md §3`), and **no JSON-text carrier exists on the store's declared surface**, so a
`JSON.stringify`-then-parse route is impossible without a store-side change (`DD-6`); **whether the
store's own read already returns a copy the binding may adopt** — **the binding treats the store's returned
value as the thing to translate, and performs no second copy of its own** (`crossing.md §1.4`); and **what a
caller observes if it MUTATES its argument during a call** — **the walk reads each member ONCE, at the
moment it visits it, and the read-once rule is the whole of the answer: a mutation that lands after a member
has been visited is not observed, and a mutation that lands on a member the walk has not yet reached IS
observed — a single call is therefore a sequence of read-once observations and never a snapshot**
(`crossing.md §1.4`, `DD-34`).

### §1.2 The crossing table's own closure — what a JS value can become

**THE TAXONOMY IS THE STORE'S AND IT IS UNMOVED.** **A JS value crosses into `StoreValue`, whose admitted
variants are `Str` · `Bool` · `Num` · `Object` · `Array`, and whose outside variants are `Null` ·
`Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` · `NonPlainCollection`**
(`docs/specs/storeroom-native/contract.md §0.4`'s `StoreValue` rows; `src/value.rs`).
**THIS UNIT ADDS NO VARIANT, REMOVES NONE AND RE-NAMES NONE** (`[A3
docs/specs/storeroom-native/contract.md §1.4 — the admitted taxonomy and its outside list | requirement]`).

| # | The crossing row | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- | --- |
| **1** | `StoreValue::Str` | **a JS `string`**, primitive and `String` object alike? **— no: the OBJECT wrapper is refused** | `'a'`, `''`, a multi-byte string, a lone surrogate | a `new String('a')` **object wrapper** → `ValueNotAdmitted` (it is a `NonPlainCollection`, not a primitive) |
| **2** | `StoreValue::Bool` | **a JS `boolean`** | `true`, `false` | a `Boolean` object wrapper → `ValueNotAdmitted` |
| **3** | `StoreValue::Num` | **a JS `number`** | every finite `number`, integral or fractional, **positive and negative**, and both `0` and `-0` **in memory** | `NaN`, `Infinity`, `-Infinity` → `ValueNotAdmitted` (`NonFinite`); a `Number` object wrapper → `ValueNotAdmitted` |
| **4** | `StoreValue::Object` | **a plain JS object** | `{}`, `{a: 1}`, `Object.create(null)`, **a plain object from ANY realm**, an object with **non-integer-like** keys in any order | an object with a **`Symbol`-keyed own property** → `ValueNotAdmitted`; an object holding an **accessor** (`get`/`set`) own property → `ValueNotAdmitted`; a **class instance** (`new Foo()`) → `ValueNotAdmitted`; a `Map`/`Set`/typed array/`Date`/`RegExp` → `ValueNotAdmitted`; **a `Proxy` whose target is a plain object** → `ValueNotAdmitted` (`NonPlainCollection`, `DD-34`) |
| **5** | `StoreValue::Array` | **a plain JS array** | `[]`, `[1, 2, 3]`, a **dense** array of any admitted members, a cross-realm array? **— no: a cross-realm array IS accepted (it is an `Array`), a class extending `Array` is not** | a **sparse** array (`[1, , 3]`) → `ValueNotAdmitted` (`DD-8`); an array with an own **`Symbol`-keyed** property → `ValueNotAdmitted`; a class extending `Array` → `ValueNotAdmitted` |
| **6** | `StoreValue::Null` | **a JS `null`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, at any depth |
| **7** | `StoreValue::Undefined` | **a JS `undefined`** — including an object member `{a: undefined}` | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, at any depth. **The member is NOT dropped and its key is NOT skipped** |
| **8** | `StoreValue::Function` | **a JS function** (arrow, method, generator, async) | — | **ALWAYS REFUSED**: `ValueNotAdmitted` |
| **9** | `StoreValue::Symbol` | **a JS `symbol`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` — **and a symbol used as an OWN KEY is refused by row 4's rule, which is the same answer by a different route** |
| **10** | `StoreValue::BigInt` | **a JS `bigint`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`. **Stated because the store's numeric bound is JS-unreachable without it: a `BigInt` is the only JS spelling of `2^53 + 1`, and it is an outside class, so the out-of-bounds refusal has no JS-reachable instance and is a DEFENSE-IN-DEPTH rule** (`docs/specs/storeroom-js-proposal.md §8` · `A62`) |
| **11** | `StoreValue::NonFinite` | **a non-finite JS `number`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` |
| **12** | `StoreValue::Cyclic` | **a JS value that contains itself** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, detected on the walk's own ancestor stack (`DD-11`) |
| **13** | `StoreValue::NonPlainCollection` | **any other non-plain collection** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` — a `Map`, a `Set`, a `WeakMap`, a `WeakSet`, a typed array, an `ArrayBuffer`, a `DataView`, a `Date`, a `RegExp`, a `Promise`, an `Error`, a `Proxy`, a class instance |
**AND THE REFUSAL'S ONE FORM, STATED SO NO ROW ABOVE NEEDS TO REPEAT IT:** **every refused row answers the
SAME code, `ValueNotAdmitted`, with its message generated by the store's own generator from the failing
target's address; no node is minted, no anchor is installed, no container changes and no journal entry is
appended** (`[A3 docs/specs/storeroom-native/contract.md §1.4 · §8.1 #14 | state or fail-state declaration]`).
**AND THE ONE CODE THIS TABLE NEVER PRODUCES: the KIND-CONTRADICTING case is a DIFFERENT failure.** A value
that IS admitted but whose container kind contradicts the target's answers **`ContainerKindConflict`** at
the STORE, and this unit's crossing does not pre-empt it (`[A3
docs/specs/storeroom-native/contract.md §1.4's kind-contradiction paragraph | state or fail-state
declaration]`).

### §1.3 The argument carriers' crossing table — `8` carriers, and the refused forms with their answers

**THE CARRIERS ARE THE STORE'S OWN ARGUMENT TYPES** (`docs/specs/storeroom-native/contract.md §0.4`), and
**the JS side spells each ONE FOR ONE: no carrier is renamed, merged or omitted** (`[A3
docs/specs/storeroom-native/contract.md §0.4 — the declared Rust spellings of every surface item |
requirement]`).

**`AddressArg`** — the address argument, on `read` · `readLiteral` · `write` · `delete` · `listen`.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`AddressArg` 1** | a JS **array** of segments | `[]`; `['a']`; `['a', 0, 'b']`; any array of in-domain segments | — |
| **`AddressArg` 2** | **`Segment` = a JS `string`** | `'a'`; `''` (**the empty string IS a legal key and a legal register key**); any string including one containing a `.` or a `/` | — |
| **`AddressArg` 3** | **`Segment` = a JS non-negative integer `number`** | `0`; `1`; `2**32`; a `number` that is integral, `>= 0` and exact as an `f64` | — |
| **`AddressArg` 4** | an **ABSENT** `address` | — | **`AddressMalformed`** (a required argument is missing) |
| **`AddressArg` 5** | **`null`** / **`undefined`** | — | **`AddressMalformed`** (the shape is not the address's shape at all) |
| **`AddressArg` 6** | a **non-array** — a number, a string, a boolean, an object, a function | — | **`AddressMalformed`** — **`'a.b'` is NOT a delimited address and is refused as a shape, verbatim** |
| **`AddressArg` 7** | an array holding a **negative integer** | — | **`AddressMalformed`** |
| **`AddressArg` 8** | an array holding a **non-integer `number`** (`1.5`, `NaN`, `Infinity`) | — | **`AddressMalformed`** |
| **`AddressArg` 9** | an array holding **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`AddressArg` 10** | an array holding a **boolean**, an **object**, a nested **array** or a **function** | — | **`AddressMalformed`** |
| **`AddressArg` 11** | a **class instance** that is array-like but not an `Array` | — | **`AddressMalformed`** (the shape is not an array) |
| **`AddressArg` 12** | a **`Proxy` over an array** | — | **`AddressMalformed`** — **the binding owns proxy detection at the argument boundary exactly as it does inside the walk** (`DD-34`) |
| **`AddressArg` 13** | a **cross-realm array** (a `vm` array, an `Array` from a worker) | **ACCEPTED** — it is an `Array` | — |
| **`AddressArg` 14** | a **sparse array** as the address itself | — | **`AddressMalformed`** — **a hole is not an in-domain segment, and neither reading of a hole may be chosen silently** (`DD-8`) |

**`TierArg` and `TierSetItem`** — the tier argument, per verb; its arity is the STORE's own table and the
package passes it through verbatim (`DD-37`, `DD-46`).

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`TierArg` 1** | a tier **token string** | `'file'` · `'mem'` · `'temp'` | any other token (`'secure'`, `'FILE'`, `'disk'`, `'session'`, `''`) → **`OutOfDomainTier`** |
| **`TierArg` 2** | an **array** of tier tokens | on `read`/`readLiteral`: `[]`, `['mem']`, `['file','mem','temp']`, duplicates included | on `write`/`delete`: **any array of any length → `OutOfDomainTier`** (the array spelling is the READER's arity) |
| **`TierArg` 3** | **ABSENT** | on `read`/`readLiteral`/`delete`: in domain | on `write`: **`AddressMalformed`** (a required argument is missing) |
| **`TierArg` 4** | **`null`** / **`undefined`** | — | **`AddressMalformed`** on every verb |
| **`TierArg` 5** | a **non-string scalar** (number, boolean) | — | **`OutOfDomainTier`** |
| **`TierArg` 6** | an **object** | — | **`OutOfDomainTier`** |
| **`TierArg` 7** | a **function** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 1** | a member of the tier array: a **token string** | `'file'` · `'mem'` · `'temp'` | any other token → **`OutOfDomainTier`** |
| **`TierSetItem` 2** | a member that is **`null`** / **`undefined`** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 3** | a member that is a **non-string scalar** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 4** | a member that is an **object** or a **function** | — | **`OutOfDomainTier`** |

**`OpIdArg`** — the rollback's op id.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`OpIdArg` 1** | a **non-empty `string`** | only a value the `WriteResult.op.opId` the store returned, or a value the store's journal otherwise holds | — |
| **`OpIdArg` 2** | a **string the store's journal does not hold** | — | **`JournalOpUnknown`** (a well-shaped but unknown op id) |
| **`OpIdArg` 3** | the **empty string** | — | **`AddressMalformed`** (a blank `opId`) |
| **`OpIdArg` 4** | **ABSENT** | — | **`AddressMalformed`** |
| **`OpIdArg` 5** | **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`OpIdArg` 6** | a **number** | — | **`AddressMalformed`** |

**`FilePathArg`** and **`JournalLengthArg`** — the two construction arguments.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`FilePathArg` 1** | a **non-empty `string`** naming a path that PASSES the store's construction-time reachability probe | any such path | — |
| **`FilePathArg` 2** | **ABSENT** | **IN DOMAIN** — the register is created at `mem` and the store IS returned | — |
| **`FilePathArg` 3** | **`null`** / **`undefined`** / **`''`** / a **non-string** | — | **`AddressMalformed`**, no instance returned |
| **`FilePathArg` 4** | a string whose **parent directory does not exist** | — | **`FilePathUnreachable`**, no instance returned |
| **`FilePathArg` 5** | a string that **is a directory** | — | **`FilePathUnreachable`**, no instance returned |
| **`FilePathArg` 6** | a string naming an **existing but not writable** path | — | **`FilePathUnreachable`**, no instance returned |
| **`JournalLengthArg` 1** | a **positive integer `number`** (`>= 1`) | `1`, `2`, `100` | — |
| **`JournalLengthArg` 2** | **ABSENT** | — | **`ConstructionArgumentMissing`** — **the ONE absence the amended construction still refuses** |
| **`JournalLengthArg` 3** | **`0`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 4** | a **negative integer** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 5** | a **fractional number** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 6** | **`NaN`** / **`Infinity`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 7** | a **numeric string** (`'5'`) | — | **`AddressMalformed`** — **no coercion** |
| **`JournalLengthArg` 8** | a **boolean** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 9** | **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 10** | an **object** / a **function** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 11** | a **`bigint`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 12** | a positive integer **beyond `u32`** | — | **`AddressMalformed`** |

**`ListenersArg`** and **`ListenerHandle`** — the construction's array and the handle.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`ListenersArg` 1** | a JS **array** of `{ address, handle }` records | `[]` (**the ordinary no-listener store**); `[{address:['a'], handle:'l1'}]`; **a duplicate address with two DIFFERENT handles — both entries are KEPT** | — |
| **`ListenersArg` 2** | an array entry that is **not** a plain `{ address, handle }` record | — | **`AddressMalformed`**, no instance returned |
| **`ListenersArg` 3** | an array entry whose **`address`** lies outside `AddressArg`'s domain (rows 4–14) | — | **`AddressMalformed`** (`AddressArg`'s own answer carried) |
| **`ListenersArg` 4** | an array entry whose **`handle`** the construction cannot admit (a non-string, `null`, `undefined`, an object) | — | **`AddressMalformed`**, no instance returned |
| **`ListenersArg` 5** | **ABSENT** | — | **`AddressMalformed`** — **the ONE absence the construction does not admit** |
| **`ListenerHandle` 1** | **INPUT**: a **plain `string`** in a construction entry | any non-empty string; **a string equal to one the store would itself mint is ADOPTED VERBATIM and is lawful** | an empty string → **`AddressMalformed`** |
| **`ListenerHandle` 2** | **OUTPUT**: the package's **opaque JS value** wrapping a token the store returned | an identity the package itself minted a wrapper for, or adopted | **a bare `string` passed to `unlisten`** → the package answers as an unknown handle → **a no-op success** (see `surface.md §3` item 4) |

### §1.4 The walk's own rules — the per-class decisions, the plain-object test, the ceiling and the guard

**The whole of this subsection is carried at `docs/specs/storeroom-js/crossing.md §3`, cited by path from
every site that needs it** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

1. **A `Symbol`-KEYED OWN PROPERTY REFUSES THE WHOLE VALUE.** If the walk meets an object or an array
   carrying an own property whose key is a `Symbol`, **the whole value is refused `ValueNotAdmitted`** —
   **because a symbol key is invisible to `Object.keys`/`Object.entries`/`JSON.stringify`, so any other
   answer would DROP A MEMBER SILENTLY, which the store's own taxonomy forbids** (`DD-8`).
2. **A SPARSE ARRAY REFUSES THE WHOLE VALUE.** If the walk meets an array with a hole, **the whole value is
   refused `ValueNotAdmitted`** — **because `Array.from` reads the hole as `undefined` and
   `JSON.stringify` reads it as `null`, so the two readings disagree and neither may be chosen silently**
   (`DD-8`).
3. **AN `{a: undefined}` MEMBER REFUSES THE WHOLE VALUE.** The walk **sees** the member and **must decide**;
   `undefined` is an outside class, so **the member's value is refused `ValueNotAdmitted` and the key is
   NEVER dropped** (`DD-8`; row 7 of `§1.2`).
4. **THE PLAIN-OBJECT TEST IS STRUCTURAL AND REALM-AGNOSTIC, STATED IN WORDS SO IT IS NOT A ONE-LINER:**
   **a value is a plain object iff ALL of the following hold:** **(a)** it is not `null` and
   `typeof x === 'object'`; **(b)** its own property keys that are **enumerable string** keys are the
   members the walk takes; **(c)** it carries **no own accessor** (`get`/`set`) property — one refuses the
   whole value; **(d)** it carries **no own `Symbol`-keyed property**; **(e)** its prototype is **either
   `null`** (**and `Object.create(null)` is ACCEPTED — it is the plainest case there is**) **or a prototype
   whose OWN properties are exactly the plain-object prototype's, reached without an `instanceof` test and
   without a comparison against this realm's `Object.prototype`** — so **a plain object from ANOTHER REALM
   (`vm`, a worker, `structuredClone`) is ACCEPTED**; **(f)** it is **not** a class instance — **a
   prototype-carrying object whose prototype is not a plain-object prototype is REFUSED
   `ValueNotAdmitted` (`NonPlainCollection`)**, **and this is the ONE place where a rule resembling an
   identity test is right**; and **(g)** it is **not a `Proxy`** — **the BINDING owns proxy detection, and a
   `Proxy` is REFUSED** (`DD-34`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 — the supervisor's priced `K2` rule, as adopted |
   declared parameter semantics]`)
5. **THE DEPTH AND SIZE CEILING IS DECLARED AND PRICED.** **The walk refuses a value whose nesting depth
   exceeds `64` or whose visited-node count exceeds `1,000,000`, with `ValueNotAdmitted`; the package ships
   no configuration knob for either bound** (`DD-10`). **The two figures are this unit's own declaration and
   are not measurements** (`[A1 docs/specs/storeroom-js-proposal.md §10 · A65 — the copy's cost bound is
   one of the four things the ruling does not name | declared parameter semantics]`).
6. **THE CYCLE GUARD IS AN ANCESTOR STACK.** **A value that contains itself is refused `ValueNotAdmitted`,
   detected by testing each value against the walk's OWN ANCESTOR STACK — never by a `WeakSet` of visited
   objects, which would refuse an acyclic DIAMOND (a value reachable by two paths)** (`DD-11`).
7. **THE WALK READS EACH MEMBER ONCE, AND THAT IS THE WHOLE OF THE MUTATION ANSWER.** **No snapshot is
   taken and no argument is deep-copied twice** (`DD-6`; `§1.1`'s third unnamed item).
8. **THE WALK'S ORDER IS THE ENGINE'S OWN ENUMERATION ORDER AND NO CLAUSE DEPENDS ON IT.** **`Object.keys`
   order is not a declared order, it is not observable through the store, and no drive may assert it** —
   **and the round trip is asserted under the member-SET relation of `§1.5` precisely because the engine
   re-orders integer-like keys regardless of insertion order**
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 — the supervisor's priced `K3` rule, as adopted | ordering
   claim]`).

### §1.5 The JS-side equality relation — one declared relation, and its three clauses

**THE RELATION, STATED ONCE, AND IT IS THE ONLY RELATION THIS UNIT'S ACCEPTANCE LAYER MAY ASSERT:** **two
JS values are EQUAL under this unit's relation iff all three of the following hold:**
1. **MEMBER-SET EQUALITY FOR OBJECTS.** Two objects are equal iff their **member key sets are equal as
   SETS** — **compared as a sorted set, never by insertion order and never by the engine's enumeration
   order** — and each member's value is equal under this relation. **A JS engine re-orders keys that look
   like array indices numerically, whatever order they were inserted in, so the store's own
   `BTreeMap`-based lexicographic order (`"10" < "2"`) is NEVER what a JS consumer sees, and no drive may
   assert it** (`DD-9`).
2. **ARRAY INDEX ORDER IS SIGNIFICANT.** Two arrays are equal iff they are **dense**, of **equal length**,
   and **equal member-by-member by index** under this relation. **A `VEC`'s index order is a store-level
   fact and it is preserved across the boundary** (`DD-9`).
3. **`Object.is` WHERE SIGN OR `NaN` MATTERS.** Two numbers are equal iff **`Object.is(a, b)`** is true.
   **`-0` and `0` are therefore NOT equal under this relation, while JS `===` says they are** — and the
   store's own `mem`/`temp` behaviour keeps the sign, so a `mem`-tier `-0` round trip is
   **`Object.is`-equal** (`DD-9`).
**AND THE TWO THINGS THIS RELATION DOES NOT DO, STATED SO IT IS NOT OVER-READ:** **a caller comparing two
objects with `===` is comparing REFERENCES and not values** — the relation above is the only value
comparison this unit declares; and **the relation is a property of the PACKAGE's own helper and of this
unit's acceptance layer, NEVER of the store**, whose own equality already ignores member order
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — *"an object's key order counted as significant"*
FAILS the row | cross-reference]`).

### §1.6 The crossing's own census, printed with its terms

**THE CROSSING TABLE'S OWN ARITHMETIC, AND EVERY FIGURE IS RE-DERIVABLE FROM THE TABLES ABOVE:**
- **the value variants: `13` rows = `5` ADMITTED (`Str` · `Bool` · `Num` · `Object` · `Array`) + `8` OUTSIDE
  (`Null` · `Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` ·
  `NonPlainCollection`) — `5 + 8 = 13` ✓**;
- **the argument carriers: `8` — `AddressArg` · `TierArg` · `TierSetItem` · `OpIdArg` · `FilePathArg` ·
  `JournalLengthArg` · `ListenersArg` · `ListenerHandle`**;
- **the carriers' own variant rows: `56` = `AddressArg` `14` + `TierArg` `7` + `TierSetItem` `4` + `OpIdArg`
  `6` + `FilePathArg` `6` + `JournalLengthArg` `12` + `ListenersArg` `5` + `ListenerHandle` `2` — `14 + 7 +
  4 + 6 + 6 + 12 + 5 + 2 = 56` ✓**;
- **the REFUSED classes the crossing declares: `8` outside value classes, `10` outside segment classes, `8`
  carrier-refusal classes (`AddressMalformed` · `OutOfDomainTier` · `JournalOpUnknown` ·
  `ConstructionArgumentMissing` · `FilePathUnreachable` · `ValueNotAdmitted` · `ContainerKindConflict` ·
  the package's unknown-handle no-op), and `0` package-minted codes.**
**⟶ CORRECTED 2026-10-11, IN THE SAME PASS THAT AUTHORED IT (`RCA-8(d)` ANNOTATE-BESIDE — the figure this
clause corrects was first written as `66`, and `66` is REFUTED BY ITS OWN TERMS):** **the operative figure is
`56`, and it is re-derived ROW BY ROW rather than by the arithmetic alone: the `AddressArg` table prints
`14` rows, the `TierArg` table `7`, the `TierSetItem` table `4`, the `OpIdArg` table `6`, the `FilePathArg`
table `6`, the `JournalLengthArg` table `12`, the `ListenersArg` table `5` and the `ListenerHandle` table
`2`, each numbered in its own first column** (`[A3 docs/specs/storeroom-js/crossing.md §2 — the same tables,
relocated WHOLE | numeric or census claim]`). **THE VALUE-ROW AND OUTSIDE-CLASS FIGURES MOVE BY THIS
CLAUSE'S OWN COUNT: `13 = 5 + 8` ✓ and the refused-value-class figure is `8`; a `66` nowhere appears in
the operative text.**

---

## §2. The JS surface — the verbs that cross, the handle, and the registry

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/surface.md` (`§1`–`§9` of this document, relocated WHOLE), the `carrier` part this
directory's map declares for it**; a citation to it names that part's path plus the `§`-number (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

### §2.1 The construction call

**`storeCreate(cfg)` crosses as ONE JS function taking ONE plain object.** **`cfg` carries the store's THREE
declared keys — `filePath` · `journalLength` · `listeners` — and the package passes each through WITHOUT
adding a default, a rename or a fourth key** (`DD-36`). **A returned value is the package's own instance
handle** — an opaque JS object whose identity the package owns (**`ListenerHandle` is NOT this handle: this
is the PACKAGE's wrapper around the store's instance, and no clause of this directory exposes any member of
it**). **Every outside form of `cfg` and of its three keys answers the store's own code and returns no
instance** (`§1.3`; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4`)
(`[A3 docs/specs/storeroom-native/contract.md §7.1 — the construction input set | state or fail-state
declaration]`).

```
storeCreate(cfg) -> Instance          // throws {status, message} on failure; never returns a partial instance

cfg = {
  filePath:      string | absent,     // PAR-JS-2 — absent is IN DOMAIN (the register is created at mem)
  journalLength: number,              // PAR-JS-3 — REQUIRED, a positive integer counting ENTRIES
  listeners:     { address, handle }[] // PAR-JS-4 — REQUIRED, may be EMPTY, duplicates KEPT
}
```

### §2.2 The address verbs — `read` · `readLiteral` · `write` · `delete`

```
read(instance, address, tier?)        -> JS value          // the assembled value, a leaf's literal, or the whole register
readLiteral(instance, address, tier?)  -> JS value          // the SAME read, narrowed: the target must be a leaf
write(instance, address, tier, value)  -> { op, watched, triggered }
delete(instance, address, tier?)       -> { address, tiers, triggered }
rollback(instance, opId)               -> { opId, undoneOps, restoredTo }
```
**EVERY ONE OF THE FIVE IS SYNCHRONOUS AND RETURNS A FRESH JS VALUE** (`§1.1`'s deep copy out). **THE PACKAGE
PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN** (`DD-46`): **a missing, an extra or a
wrong-shaped argument reaches the store's own carrier value and answers the store's own code.** **`read`'s
`tier` accepts ZERO TO MANY — one token or an array — and an array is an ANY-MATCH set, not a union of
values, not an ordered preference and not a filter** (`DD-37`). **`write`'s `tier` is REQUIRED and SINGULAR;
`delete`'s `tier` is OPTIONAL and EXACTLY ONE when present.**
(`[A3 docs/specs/storeroom-native/contract.md §4.1 · §3.1 · §4.3 · §6.3 — the four verbs' own signatures |
requirement]`)

### §2.3 The handle clause — the construction's string, the returned opaque, and the accepted hazard

1. **THE TOKEN'S DOMAIN IS THE PROCESS, AND IT IS THE STORE'S DECLARED DOMAIN.** **A store-minted handle is
   UNIQUE PER PROCESS: no OTHER token the store mints — in this instance, in ANY other instance of THIS
   process, or at ANY LATER moment of THIS process — is equal to it.** **The construction ADOPTS the
   caller's tokens verbatim rather than re-minting them, and a caller-spelled token is instance-local
   because only the instance the caller handed it to holds it.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — *"Proceed on b"*; A3
   docs/specs/storeroom-native/contract.md §0.4 clause 2's dated reconciliation | requirement]`)
2. **TWO JS SPELLINGS FOR ONE TYPE, ONE PER DIRECTION, AND NEITHER DIRECTION IS THE OTHER'S.**
   **IN:** the construction's `listeners[]` takes each handle as a **plain `string`**. **OUT:** every handle a
   verb RETURNS is the package's **opaque JS value** wrapping the token, whose token is PRIVATE and readable
   by no JS code; the package compares handle identity **internally**, by the token it holds. **`unlisten`
   accepts the OPAQUE form ONLY.** (`DD-14`)
3. **THE TWO ACCEPTED CONSEQUENCES, PRINTED WITH THE CLAUSE BECAUSE A CLAUSE THAT HIDES ITS OWN HAZARD IS
   NOT A CLAUSE.** **(i) A PRIOR SESSION'S HANDLE IS OUTSIDE THE DOMAIN, AND WHERE THE CURRENT PROCESS HAS
   SINCE MINTED THE SAME TOKEN IT NAMES *THAT* REGISTRATION — a declared CROSS-PROCESS hazard, not a
   defended property: the counter restarts at each process, and handle identity is TOKEN EQUALITY ALONE.
   THE PACKAGE'S OWN DOCUMENTATION MUST STATE THAT A HANDLE MUST NOT BE CARRIED ACROSS A PROCESS RELOAD**
   (`DD-28`). **(ii) THE CONTAINMENT NOTE STANDS OPEN AND IS NOT DEFENDED HERE: the `listener-<n>` namespace
   is guessable — and the package's own surface never spells a token, so the hazard is reachable only by a
   caller that guesses one, which `DD-28` refuses to document.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — its accepted-consequence cell; A3
   docs/specs/storeroom-native/parameter-semantics.md §2.13 — `PAR-13`'s four outside-value classes | state
   or fail-state declaration]`)
4. **`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS.** **A value a foreign instance minted,
   a value a prior session minted, a value the store never minted at all (fabricated), a blank token and a
   non-opaque value are EACH a no-op success at `unlisten`: no code is produced and NO OTHER REGISTRATION IS
   REMOVED** (`§1.3`'s `ListenerHandle` rows; `parameter-semantics.md` `PAR-JS-8`).
   (`[A3 docs/specs/storeroom-native/parameter-semantics.md §2.13 — class (A), (B), (C) and (D), each with
   its declared answer | state or fail-state declaration]`)
5. **THE HANDLE'S PRESENCE IN A TRIGGERED SET IS DECIDED BY ADDRESS AND BY NOTHING ELSE:** **a handle
   appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the triggering address**
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 3 | requirement]`).

### §2.4 The registry — the package's own state, and its four rules

**THE STORE RETURNS HANDLES AND INVOKES NOTHING** (`A57`); **so a JS listener is a FUNCTION the PACKAGE must
hold, and the package owns a PER-INSTANCE REGISTRY keyed by the opaque handle it returned. THE FOUR RULES,
AND NO FIFTH:**
1. **AN UNREGISTERED HANDLE FIRES NOTHING, SILENTLY.** A handle returned in a `triggered` list with **no**
   registered function invokes nothing and reports nothing — **no code, no warning, no log**.
2. **A SECOND REGISTRATION FOR THE SAME HANDLE REPLACES THE FIRST.** **One handle, one function** — the
   registry is **not** a fan-out, and the replaced function is dropped without notice.
3. **A LAWFUL DUPLICATE FIRES ONCE PER DISTINCT HANDLE.** Where two construction entries at one address
   carry the caller's SAME token, the store returns **that token ONCE** in the triggered set where the store
   minted it, and the registry fires **one** invocation per DISTINCT handle — **not one per occurrence, and
   not one per entry** (the store's own `DD-42` is the mint's non-collision rule and its lawful
   caller-spelled collision; this rule is the package's own reading of it).
4. **`unlisten` WITHDRAWS THE REGISTRATION, NEVER THE FUNCTION.** **Withdrawal is the STORE's; invocation is
   the PACKAGE's.** `unlisten` removes the store-side home entry; **the package's registry entry stands**,
   so a function whose handle is withdrawn **simply never fires again** — and a later re-`listen` at the same
   address mints a **DIFFERENT** handle, whose registration is a NEW registry entry. **The registry is
   released with the instance and by nothing else** (`DD-15`, `DD-17`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.2 — the supervisor's priced `K9` rule, as adopted; A1
   docs/specs/storeroom-js-proposal.md §18 · A57 — *"a handle that it returns to alert the client of the
   trigger"* | requirement]`)

### §2.5 The single failure form

**A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY ONE SUCH
FORM:**
```
{ status: string, message: string }
```
1. **`status` is the store's own member token VERBATIM** — one of the store's closed `15` members, as a JS
   `string`, **never an index, never a lowercased or prefixed variant and never a package-minted code** —
   **and a code the store returns that lies outside the closed set is passed through VERBATIM rather than
   re-mapped** (`DD-40`).
2. **`message` is the store's own GENERATED message VERBATIM** — never empty, never a placeholder and never
   hand-authored by the package.
3. **THE FAILURE IS THROWN AND NEVER RETURNED.** There is **no** returned tagged union, **no** `{ok, value}`
   envelope, **no** `Promise` rejection (**every verb is synchronous**) and **no** `Error` subclass: **the
   object thrown is a plain object whose prototype is the caller realm's `Object.prototype` and whose two
   members are exactly `status` and `message`** (`DD-12`).
4. **NO DISCRIMINATION RULE IS OWED.** **A caller that stores a value whose shape is indistinguishable from
   this object and then cannot tell its own input from a genuine failure carries an UNSUPPORTED
   ANTI-PATTERN** — the architect's own ruling — **so this unit declares no discrimination helper, no
   branded record and no third member** (`DD-13`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A64; A3 docs/specs/storeroom-native/contract.md §8.3 — the
   error's closed two-member shape | state or fail-state declaration]`)

### §2.6 The constraint/repair pattern — a usage pattern over declared verbs, never a seam

**CONSTRAINT AND REPAIR EVALUATION IS CLIENT-SIDE.** **The JS side holds the constraint functions; the
crossing this subject needs is ALREADY IN the surface (`write` out, `rollback` in).** **The pattern, stated
in full because it is the whole of what this unit declares about it:** **evaluate constraints AFTER a
`write` returns; on a violation, call `rollback` with the `JournalOp.opId` THAT WRITE RETURNED.**
**NO constraint verb, NO repair verb, NO constraint parameter, NO constraint record and NO function-carrying
parameter is declared — and the store's own surface takes no function at any position** (`DD-16`).
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A73 — *"Constraint/Repair is client-side, using rollback to
reverse constraint violations."*; A3 docs/specs/storeroom-native/contract.md §7.3 — the constraint seam's
own boundary | requirement]`)

### §2.7 Listener delivery — the window, the order and a throwing body

1. **`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN OPAQUE HANDLES**, fresh on every call, in the
   two records the store's own contract declares (`WriteResult` and `DeleteReceipt`).
2. **THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED.** **The
   invocation is SYNCHRONOUS and happens after the store call has completed and the record has been
   copied out** (`DD-22`).
3. **NO ORDER IS ASSERTED.** The store declares the returned set's order unobservable, so **this unit asserts
   MEMBERSHIP ONLY**: a drive compares **sets**, never sequences, and **no clause of this unit promises a
   registration order, an address order or a tier order** (`DD-22`).
4. **A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED.** **The exception propagates out
   of the package's own invocation loop; the store's verb result is already complete and copied out, so the
   throw neither rolls back nor alters anything the store did** (`DD-23`).
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 5 — *"NO ORDER IS DECLARED FOR THE LIST"*; A1
   docs/specs/storeroom-js-proposal.md §15 · A73's neighbourhood — the firing window is this unit's own
   carriage | ordering claim]`)

### §2.8 The two file-behaviour readings a JS caller will meet

1. **A `delete` AND A `rollback` PERFORM NO FILE I/O.** **`file`-tier durability is produced by a
   successful `file`-tier `write` ONLY**, so **a JS caller that deletes or rolls back a `file`-tier version
   and then constructs a FRESH instance over an equal `cfg.filePath` sees the removed version STAND AGAIN**
   — **that re-boot is the store's own declared boot and is the declared consequence of this reading, NOT a
   defect** (`DD-45`).
2. **THE PACKAGE DOCUMENTS BOTH READINGS AND COMPENSATES FOR NEITHER.** **The package performs no
   compensating file write and no re-commit**, and **a `file`-tier write that fails answers
   `FileCommitFailed` AFTER the store's own automatic journal rollback has run**
   (`[A3 docs/specs/storeroom-native/contract.md §7.2 items 3–6 | state or fail-state declaration]`).

### §2.9 `findAddress` IS NOT EXPOSED — the non-exposure clause, and its consequence

**`findAddress` IS AN INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT.** **The architect's words, verbatim:
*"find address is an internal tool - JS only needs read + edit functions and listeners"*** (`A63`).
**CONSEQUENCES, EACH STATED SO NOTHING IS LEFT TO INFERENCE:**
1. **THE JS SURFACE IS EXACTLY `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` ·
   `listen` · `unlisten` — `8` verbs — plus the returned records.** **No `NodeRef` crosses, no reference
   crosses, and `findAddress`'s *"returns reference"* has no JS spelling.**
2. **A FAILED READ IS THE EXISTENCE PROBE.** **Because no resolver is exposed, a JS caller asks whether an
   address exists by `read`ing it: a `read` that resolves answers the value, and a `read` that does not
   answers a thrown `{status, message}`.** **THEREFORE ALL `15` FAIL CODES REMAIN REACHABLE FROM JS** — the
   walk's `9` address codes on the address verbs, the value taxonomy's `ValueNotAdmitted`, the two
   construction members, `JournalOpUnknown`, `RollbackCompacted`, `ReadTargetIsBranch` and
   `ContainerKindConflict` — **and no code is left without a JS-reachable trigger.**
3. **NO `exists()` VERB, NO `findAddress` SHIM AND NO BINDING-SIDE RESOLVER IS DECLARED** — an `exists()`
   verb would be a **store-surface addition** and a shim would be a **second resolver**, and the store's own
   contract declares exactly ONE shared resolver (`§2.1`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A1 docs/specs/storeroom-js-proposal.md §10 · A65 — no
   reference crosses either way, so the non-exposure is entailed by the copy discipline and not merely a
   surface choice | prohibition]`)

### §2.10 `listen` and `unlisten` — the crossing's two registration verbs

```
listen(instance, address)      -> Handle    // mints a token, populates the store's home, wraps it for JS
unlisten(instance, handle)     -> undefined  // drops ONE store-side home entry; a no-op success for anything else
```
**`listen`'s `address` is `AddressArg`'s domain and NOTHING MORE** — **a listener carries NO tier qualifier:
its address is the WHOLE of its key** (`[A3 docs/specs/storeroom-native/contract.md §6.5 — the listener
record's closed two-member set | requirement]`). **`unlisten` returns `undefined` on success, including on
its no-op success, and throws exactly where the store does** — **and the store throws nowhere on a withdrawal
except for a malformed argument's shape.** (`[A3 docs/specs/storeroom-native/contract.md §0.4 — the
`Store::listen`/`Store::unlisten` rows | requirement]`)

---

## §3. The package — the claimed realm, the handoffs, the publish story and the sibling crate

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/package.md` (`§1`–`§6` of this document, relocated WHOLE)**, the `carrier` part this
directory's map declares for it (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 |
requirement]`).

### §3.1 The claimed realm — Node ESM, alone

**THE ARCHITECT'S RULING, VERBATIM: *"Node ESM"*** (`docs/specs/storeroom-js-proposal.md` `§15` · `A70`).
**THE CLAIM, STATED SO IT CAN BE FALSIFIED:** **a consumer `import`s the package as an ES module from a Node
runtime whose ABI carries a Node-API addon, at a version at or above the floor this contract declares
(`DD-38`); the package reaches the addon INTERNALLY** — an addon being a CJS artefact, that internal reach is
the package's own `createRequire`-style step and **is NOT a second claimed realm** (`DD-4`).
**AND THE CARRIER'S OWN NAME IS THE ONE TOKEN THIS UNIT ADOPTS FROM OUTSIDE THIS PROJECT:** **`Node-API` /
`napi` is a STANDARD'S name**, it is the carrier this clause claims, and **its dossier row stands `defined`
with its clause supplied at `§0.3`** (`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi |
cross-reference]`).

### §3.2 Every other realm is UNCLAIMED, and each owes its declared answer

**THE REALM SET IS CLOSED AT ONE MEMBER, AND THE UNCLAIMED SET IS ENUMERATED RATHER THAN LEFT TO A READER'S
JUDGEMENT.** **Each row below is a `HO-` HANDOFF ROW with its own declared answer and its own positive
revisit condition; the row ids are minted here as `HO-1`…`HO-7` (`DD-41`), and the tracker rows the duties
land in are written by the TRACKER gate and not by this pass.**

| HO | The unclaimed realm | Why it is unclaimed, at the carrier's own terms | Its declared answer (what THIS unit does) | Its positive revisit condition |
| --- | --- | --- | --- | --- |
| **`HO-1`** | **Node CJS** — a consumer that spells `require('…')` | the carrier reaches JS through an addon that IS a CJS artefact, but `A70` claimed the ESM entry alone; a CJS consumer would need a second published arm | **the package publishes NO CJS arm and NO `require` entry** (`DD-24`, `DD-4`); a CJS consumer is served by the consumer's own ESM interop, which is the consumer's side of the boundary | a fresh ruling that claims CJS, followed by a bounded amendment |
| **`HO-2`** | **Electron `main`** — where the process's ABI matches the addon's | Electron carries its own ABI, so an addon built for Node's ABI is not guaranteed to load | **no Electron-specific rebuild, config or note is shipped in the first cut**; **the ABI question is the CONSUMER's host-configuration duty** | a fresh ruling that claims Electron `main`, followed by a bounded amendment |
| **`HO-3`** | **Electron `preload`** | same ABI question as `HO-2`, with a narrower surface | **as `HO-2`** | as `HO-2` |
| **`HO-4`** | **Electron `renderer`** | a renderer with `nodeIntegration` off **cannot load a `.node` at all**; the only route is `preload` + IPC | **nothing is shipped and nothing is promised**; a renderer consumer must go through the consumer's own main process | a fresh ruling that claims a renderer route, followed by a bounded amendment |
| **`HO-5`** | **the browser** — a browser ESM bundle or a browser worker | a bundler **cannot resolve a platform binary**, and tree-shaking cannot help | **nothing is shipped and nothing is promised**; **the promise would be false by construction** | a fresh ruling, which would need a carrier other than a Node-API addon |
| **`HO-6`** | **workers** — `worker_threads` and browser workers | `worker_threads` can load the addon where the ABI matches; a browser worker cannot | **no worker-specific entry, no transferable-value plan and no shared-memory clause is declared**; a `worker_threads` consumer uses the same ESM entry, at its own risk and its own ABI | a fresh ruling that claims a worker realm, followed by a bounded amendment |
| **`HO-7`** | **any IPC route** — a channel that carries store values between processes or realms | **it is A SECOND CROSSING**: every value would be serialized by the channel, so the deep-copy discipline would be re-stated in a second dialect, **functions cannot cross**, and the registry would have to live behind a channel-id dispatch with its own failure channel for a vanished channel and its own ordering rules | **this unit ships no bridge, no channel protocol and no serialized value form**; **the row names the crossing as ANOTHER UNIT'S work** | a fresh ruling, followed by a unit that can own a second serialization contract |

(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed realm; A1
docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`'s closed realm set and its one-declared-answer rule |
requirement]`)

### §3.3 The publish story — prebuilds, the matrix, and the licence

1. **THE ARCHITECT'S RULING, VERBATIM: *"Publish with prebuilds"*** (`docs/specs/storeroom-js-proposal.md`
   `§15` · `A71`). **A PUBLISHED ARTEFACT WITH PREBUILDS IS IN SCOPE: a registry identity, a per-platform/arch
   prebuild matrix, the CI that produces it and a hosting decision for the binaries are THIS UNIT'S.**
2. **THE MATRIX IS `5` TARGETS** — `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` ·
   `win32-x64` — **produced by CI on each release tag (`DD-42`) and hosted as the registry's own per-target
   optional-dependency artefacts; a further target is a bounded amendment and not a build flag** (`DD-25`).
3. **NO BINARY IS EVER COMMITTED TO THE TRACKED TREE.** **The artefacts are BUILT AND PUBLISHED, never
   stored in the tree** — `archive/` is gitignored and `/target` is ignored — **so the store's and this
   unit's tracked trees stay reviewable** (`DD-25`).
4. **`AGPL-3.0` IS THE DISTRIBUTION'S DECLARED FACT**, declared in the package's `package.json` `license`
   field, in `bindings/js/README.md` and at `package.md §3.4`; **the licence file itself is not copied into
   the sibling crate** (`DD-43`).
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A71; A1 docs/specs/storeroom-js-proposal-review.md §3 ·
   `U16`'s closure | requirement]`)

### §3.4 The sibling crate's layout — an independent crate, never a workspace member

1. **THE ARCHITECT'S RULING, VERBATIM: *"Confirm"*** (`docs/specs/storeroom-js-proposal.md` `§11` · `A68`).
   **THE LAYOUT: an INDEPENDENT SIBLING CRATE at `bindings/js/`, with its own `Cargo.toml`, its own
   dependencies, `crate-type = ["cdylib", "rlib"]`, and ONE path dependency on the store:
   `storeroom-native = { path = "../.." }`.**
2. **IT IS NOT A WORKSPACE MEMBER.** **A root `cargo test` therefore keeps its single-package meaning, and
   the store's manifest, its `src/**`, its `tests/**` and its measured green are NOT TOUCHED**
   (`DD-19`; the store's own plan cell *"NOT DONE IF … a second crate, a workspace member or a red set
   outside `tests/**`"* is not contradicted).
3. **`crate-type = ["cdylib", "rlib"]`, AND THE `rlib` HALF IS LOAD-BEARING.** **A `cdylib`-only crate cannot
   be linked by its own Rust integration tests**, so the `rlib` half is what makes the crossing's per-class
   table drivable in Rust **without a Node runtime** — **and it is the mechanical basis of the recommended
   variant `V1`** (a thin export facade over a PURE-RUST conversion core; `DD-2`).
4. **THE STORE'S PUBLIC SURFACE IS CITED AND NEVER AMENDED.** **This unit declares no store-side change; a
   clause it needs and the store's contract does not carry is a CONTRACT FINDING at `§8`, never an inline
   edit.**
   (`[A1 docs/specs/storeroom-js-proposal.md §11 · A68; A1 docs/specs/storeroom-js-proposal-review.md §5.2
   item 4 | requirement]`)

### §3.5 The ownership clause — one `Store` per instance, caller-owned, and no release verb

**THE ARCHITECT'S RULING, VERBATIM: *"Not needed"*** (`docs/specs/storeroom-js-proposal.md` `§15` · `A74`).
**ONE `Store` PER PACKAGE INSTANCE, CALLER-OWNED. THERE IS NO FINALIZER AND NO RELEASE VERB — neither
`dispose()` nor `close()`, at the package level or at the store level** — **and THE REASON IS DECLARED, not
implied: the store runs NO background work, holds NO OS handle beyond the path it was given (touched only by
a `file`-tier write) and COMMITS SYNCHRONOUSLY, so there is no in-flight state to flush and no async
resource whose abandonment could lose data. What is lost by dropping a wrapper is MEMORY AT PROCESS EXIT,
not a pending write** (`DD-17`).

**AND THE ONE HAZARD THIS CLAUSE DECLARES RATHER THAN DEFENDS:** **TWO INSTANCES OVER ONE `cfg.filePath` ARE
THE CALLER'S OWN HAZARD.** **Each boots (`§1.3`'s `FilePathArg` reading), each commits independently, and the
second instance's `file`-tier write CLOBBERS the first's bytes** — **and because a `delete` and a `rollback`
perform no file I/O (`§2.8`), a fresh boot over an equal path re-loads the LAST SUCCESSFUL `file` WRITE's
bytes and no other state.** **The package neither refuses the second instance nor warns on the first: the
hazard is declared here and in the package's own documentation**
(`[A3 docs/specs/storeroom-native/contract.md §7.2 item 5–6 and §5.7's `P-TP-7` row | state or fail-state
declaration]`).

---

## §4. The acceptance layer — the runner, the pattern, and the LAYER label

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/acceptance.md` (`§1`–`§5` of this document, relocated WHOLE)**, the `carrier` part
this directory's map declares for it (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 |
requirement]`).

### §4.1 The runner and the pattern

1. **THE JS LAYER RUNS UNDER `node --test`.** **The suite uses `node:test` and `node:assert`; it drives the
   package through its CLAIMED ESM ENTRY POINT and never the `.node` addon directly** (`DD-18`).
   **A test that loads the addon itself is a finding: it would not drive the crossing, only the store.**
4. **THE RUST LAYER RUNS `cargo test` IN `bindings/js/`.** **The conversion core's per-class table is
   drivable there, because the crate declares the `rlib` half** (`§3.4` item 3; `DD-19`).
5. **THE SUITE'S OWN PATTERN, STATED SO IT IS CHECKABLE:** **one test per crossing row of `§1.2`/`§1.3`
   (the accepted form and each refused form), one test per verb's success shape, one test per code the
   surface can reach, one test per registry rule of `§2.4`, and one test per `HO-` row — the last asserting
   only that the package EXPOSES NO entry for that realm.**

### §4.2 The LAYER label — and the rule no pass may break

1. **THIS UNIT'S JS-SIDE GREEN IS `ENVELOPE/PURE`, AND THE LABEL TRAVELS WITH EVERY FIGURE.**
   **Every reported figure names its SITE (the command and the directory it ran in) and its LAYER.**
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`; A1
   docs/specs/storeroom-js-proposal-review.md `§5` — the layer discipline | numeric or census claim]`)
2. **THE ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`.** **The unit delivers a LIBRARY — a sibling crate
   and a JS package — and exposes no rendered surface, no IPC and no MCP/UI tool surface; there is no
   assembled application to be green.**
3. **NO `APP`-GREEN MAY BE CLAIMED FROM A NODE TEST, AND NO `APP`-GREEN MAY BE CLAIMED FROM A `cargo test`
   EITHER.** **A node-suite green is `ENVELOPE/PURE`-green and never `APP`-green** (`DD-20`).
4. **THE STORE'S GREEN IS NOT RE-LABELLED AND NOT RE-MEASURED AS THIS UNIT'S.** **The store's suite is
   re-run, when it is re-run at all, as a NON-REGRESSION RECORD; the figure reported for it is the one the
   artifact that carries it prints, and the as-filed figures the gate-1 record names are marked HISTORICAL
   at their own sites** (`DD-31`, `DD-33`).

### §4.3 The round-trip property — the architect's directive, in JS terms

**THE DIRECTIVE'S OWN WORDS: *"passing in various JSON … expect exact match in all cases"*** (`A39`'s
neighbourhood; the store's `e2e_json_round_trip` battery is the Rust half). **THE PROPERTY THIS UNIT'S JS
LAYER ASSERTS, STATED IN THE JS-SIDE EQUALITY TERMS OF `§1.5`:**
**for every value `v` in the layer's corpus, `read(instance, address)` after
`write(instance, address, tier, v)` must be EQUAL to `v` UNDER THE RELATION OF `§1.5` — member-SET equality
for objects, array index order significant, and `Object.is` where sign or `NaN` matters.**
**THE CORPUS AND THE TWO EXCLUSIONS, AND NOTHING ELSE:** **the corpus is `various JSON` — a string, a
boolean, a finite number, an empty object, an empty array, a nested object, a nested array, an object
holding an array holding an object, and a value carrying an integer-like key beside a non-integer-like one;
and TWO DECLARED EXCLUSIONS stand: (i) a `file`-tier `-0` is read back as `0` after a boot — the declared
file-image normalization, asserted by the STORE's battery and NOT by this layer (`DD-5`); and (ii) object
member ORDER is not compared, because the engine re-orders integer-like keys.** **`0` other exclusion is
declared, and a third exclusion is a finding**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-14`'s round-trip property; A3
docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 | requirement]`).

### §4.4 The red set — authored from this contract alone, run and reported BEFORE implementation

**THIS UNIT'S RED SET IS ITS OWN, LIVES IN `bindings/js/`, IS AUTHORED FROM THIS CONTRACT ALONE, AND IS RUN
AND ITS FAILING SET REPORTED BEFORE ANY IMPLEMENTATION** (`DD-19`). **The store's `tests/**` is re-run as a
non-regression record, never rewritten, and no assertion is weakened**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.2 item 3 — the red set's ownership; A1
docs/specs/storeroom-js/implementation-plan.md §2 — `Q2`'s own phase | requirement]`).

### §4.5 The `HO-` handoff ledger

**SEVEN ROWS — `HO-1`…`HO-7` — each with the duty, its owner, and its positive revisit condition. NO
HANDOFF IS DISCHARGED AS A PATCH, and this unit dispatches no implementer into any consumer**
(`§9`; `package.md §2`; `DD-21`, `DD-41`)
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`; A1 docs/specs/storeroom-js-proposal.md §9 ·
A2 — *"integration into Provident-Electron will be delegated to that project's agents"* | requirement]`).

---

## §5. The typed property register — `8` rows, cap `≤ 8`

**THIS REGISTER IS THIS UNIT'S OWN, ITS ROWS ARE `P-IM`/`P-SM`/`P-TP`, ITS CAP IS `≤ 8` AND HOLDS AT
`8 ≤ 8`, AND NO ROW IS `F`-ROW OR `§6`/`FS-n`.** **It is authored IN THIS DOCUMENT and its records are
cited by `§`-number; the store's register is a SEPARATE surface and no row is added to it**
(`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions and §C.11.6 — the kind rule and
the per-unit cap | requirement]`).

### §5.0 The register's census, printed with its terms, and the dual-mapping disclosure

**`8` rows — `P-IM-1` · `P-IM-2` · `P-IM-3` (invariants) + `P-SM-4` · `P-SM-5` · `P-SM-6`
(state/arm rows) + `P-TP-7` · `P-TP-8` (transition/property rows) — `3 + 3 + 2 = 8` ✓**, **and every row
below carries a property, one or more strategy ids, and an explicit FAILURE LIST.** **A strategy id names
the shape of the drive; a row's failure list names every observable that makes it FAIL**
(`[A3 docs/specs/storeroom-native/contract.md §5.2 — the row form, cited as the form's precedent |
requirement]`).

**AND ONE DUAL-MAPPING DISCLOSURE, PRINTED BECAUSE THIS SPAN CARRIES TWO READINGS OF THE SAME NUMBERS — AND
THE RULE EVERY CITATION IN THIS DIRECTORY OBEYS** (`RCA-8(d)` ANNOTATE-BESIDE: **this clause adds no row,
moves no row and changes no property; it states how a `§5.x` citation is read**): **the numbered span below
carries `8` REGISTER ROWS — one row per `§5.1`…`§5.8` — and NO OTHER numbered content; the `P-*` IDS are
`P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-SM-5` · `P-SM-6` · `P-TP-7` · `P-TP-8` and their numbers do NOT
track the `§`-numbers, because the id family's ordinal is the row's own and the `§`-number is its position
here.** **SO A `§n` CITATION IN THIS DIRECTORY NAMES THE SECTION, AND A `P-*` CITATION NAMES THE ROW — and a
sentence that says *"`§5.2`'s `P-IM-2`"* is naming a section and the row that lives in it, which is the ONE
reading this contract uses.** **THE RULE IS THIS PROJECT'S OWN DIRECTORY-FORM DECISION and it takes no
ruling** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions — the per-unit cap and
the no-second-register rule — read with this section's own `§5.0` | cross-reference]`).

### §5.1 `P-IM-1` — the round trip, under the declared relation

**Property.** **For every admitted JS value `v` and every address `a` a write of `v` at `a` succeeds on,
the `read` of `a` afterwards is EQUAL to `v` under `§1.5`'s relation — with the store's value taxonomy
unmoved and the crossing's two exclusions and no third.**
**Strategy ids.** **`S-RT`** (the round trip over the corpus of `acceptance.md §4.3`) · **`S-RT-DEEP`** (the
same over a nested object/array corpus) · **`S-KEYSET`** (the member-SET half, over a value carrying
integer-like and non-integer-like keys).
**FAILURE LIST.** a read that is not equal to the written value under `§1.5`; a member dropped or added in
transit; a member's ORDER asserted as significant by a drive; `-0` compared with `===`; an object compared
by reference; a nested member that resolves to a different value than it was written with.
**The clauses it cites.** `§1.1` · `§1.2` · `§1.5` (intra-document, and therefore bare) ·
`docs/specs/storeroom-js/crossing.md §1` · `docs/specs/storeroom-js/acceptance.md §4.3`.
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — the same invariant at the store's own layer |
requirement]`)

### §5.2 `P-IM-2` — the copy's two directions, and the walk's closure

**Property.** **NO REFERENCE CROSSES IN EITHER DIRECTION.** A mutation of the caller's value after a
successful `write` is invisible to a later `read`; a mutation of a value a `read` returned does not reach
the store; and every value outside the taxonomy's admitted set is refused `ValueNotAdmitted` with **no node
minted, no anchor installed, no container changed and no journal entry appended.**
**Strategy ids.** **`S-COPY-IN`** (mutate-then-read) · **`S-COPY-OUT`** (read-mutate-read) · **`S-WALK`** (one
drive per refused class of `§1.2`'s rows 6–13) · **`S-WALK-CLASS`** (one drive per walk rule of `§1.4`:
symbol key, sparse array, `{a: undefined}`, cross-realm plain object, `Object.create(null)`, class instance,
`Proxy`) · **`S-CEIL`** (the depth and size ceilings, `DD-10`) · **`S-CYCLE`** (the ancestor-stack guard, and
the DIAMOND that must NOT be refused, `DD-11`).
**FAILURE LIST.** a returned object that is the store's own; a stored value that aliases the caller's; a
refused class that mints a node; a refusal that appends a journal entry; a `Symbol`-keyed member dropped
silently; a sparse array read as `undefined` or as `null`; a cross-realm plain object refused; an
`Object.create(null)` refused; a class instance admitted; a `Proxy` walked as its traps report; a DIAMOND
refused as a cycle; a depth or size beyond the ceilings admitted.
**The clauses it cites.** `§1.1` · `§1.2` · `§1.4` · `crossing.md §1`–`§4`.
(`[A1 docs/specs/storeroom-js-proposal.md §10 · A65; A3 docs/specs/storeroom-native/contract.md §1.4 ·
§3.5 | requirement]`)

### §5.3 `P-IM-3` — the failure channel's single form, and the closed set's reachability

**Property.** **EVERY FAILURE THAT CROSSES IS A THROWN `{status, message}` AND NOTHING ELSE**, whose
`status` is a member of the store's closed `15`-member set or a verbatim echo of a non-member the store
itself produced, and whose `message` is the store's generated string; **and ALL `15` MEMBERS REMAIN
REACHABLE FROM THE JS SURFACE** — a failed `read` being the existence probe, because no resolver is exposed.
**Strategy ids.** **`S-FAILFORM`** (the thrown object's `typeof`, its prototype being the caller realm's
`Object.prototype`, and its member SET being exactly `{status, message}`) · **`S-FAILSET`** (one drive per
member, `15` + `1` converse: no drive produces a code outside the set) · **`S-PROBE`** (a failed `read` as
the existence probe, at each of the walk's codes).
**FAILURE LIST.** a failure returned as a value; a `Promise` rejection; an `Error` instance; a third member
(`code`, `cause`, `stack`, `data`); a package-minted code; a `status` that is an index, a lowercased variant
or a prefixed variant; an empty or hand-authored `message`; a member of the set with no reachable trigger; a
drive that produces a code outside the set; a `findAddress` or `exists()` route that reaches an address
without going through `read`.
**The clauses it cites.** `§2.5` · `§2.9` · `surface.md §5` · `surface.md §9`.
(`[A1 docs/specs/storeroom-js-proposal.md §8 · A63 · A64; A3
docs/specs/storeroom-native/contract.md §8.1 · §8.2 · §8.3 | requirement]`)

### §5.4 `P-SM-4` — the crossing's own ARM TABLE is total, and every arm's answer is one of the declared ones

**Property.** **THE CROSSING'S ARM TABLES ARE CLOSED AND TOTAL: every in-domain argument form lands on a
declared success arm, every outside form lands on the declared answer its own row prints, and NO FORM IS
UNANSWERED.** **The tables are `§1.2`'s `13` value rows, `§1.3`'s `56` carrier-variant rows, and the store's
own verb arms they reach.**
**Strategy ids.** **`S-ARM`** (the arm table's totality and mutual exclusivity, per verb) · **`S-ARM-OUT`**
(one drive per outside value class, asserting the declared code) · **`S-ARM-ARITY`** (the tier arity, per
verb: absent, one token, an array of `0`, of `1` and of `≥ 2`).
**FAILURE LIST.** an in-domain form with no arm; one form that reaches two arms; an outside form that
succeeds; an outside form whose code differs from its row's; a `write` that accepts an array tier; a
`delete` that accepts a set; a `read` whose array tier is read as an ordered preference or as a union of
values.
**The clauses it cites.** `§1.2` · `§1.3` · `crossing.md §1`–`§2` · `parameter-semantics.md`'s every row.
(`[A3 docs/specs/storeroom-native/contract.md §3.4 · §4.4 — the store's own closed arm tables |
requirement]`)

### §5.5 `P-SM-5` — the registry's transition rules, and the handle's two spellings

**Property.** **THE REGISTRY'S FOUR RULES OF `§2.4` HOLD AT EVERY TRANSITION** — an unregistered handle
fires nothing silently; a second registration replaces the first; a lawful duplicate fires once per DISTINCT
handle; and `unlisten` withdraws the registration and never the function — **AND THE HANDLE'S TWO
SPELLINGS NEVER BLUR** (a plain `string` IN at the construction; the package's opaque value OUT, accepted by
`unlisten` alone).
**Strategy ids.** **`S-REG`** (the four rules, one drive each) · **`S-REG-DUP`** (two construction entries at
one address with one caller-spelled token: `triggered` carries it once where the store minted it, and the
registry fires once) · **`S-OPAQUE`** (a returned handle's token is not readable from JS; a bare string
passed to `unlisten` is an unknown handle and a no-op success) · **`S-WITHDRAW`** (after `unlisten`, the
function never fires again; a re-`listen` at the same address mints a DIFFERENT handle and a NEW entry).
**FAILURE LIST.** an unregistered handle that throws, logs or warns; a fan-out registration; a duplicate
token that fires twice per distinct handle; an `unlisten` that unregisters the function; a returned handle
whose token JS can read; an `unlisten` that accepts a bare `string` as a known handle; a re-`listen` that
re-uses a withdrawn handle.
**The clauses it cites.** `§2.3` · `§2.4` · `§2.10` · `surface.md §3`–`§4`.
(`[A1 docs/specs/storeroom-js-proposal.md §9.2 · A57 · A58; A3 docs/specs/storeroom-native/contract.md §6.5
· §0.4's `ListenerHandle` clause | requirement]`)

### §5.6 `P-SM-6` — the construction's sequence and the two instances hazard

**Property.** **THE CONSTRUCTION IS A FUNCTION OF ITS ARGUMENTS AND OF THE STORE'S OWN SEQUENCE:**
`cfg`'s three keys are passed through unmodified; the store's own sequence runs (its `journalLength` and
`filePath` handling, its reachability probe — a DRY RUN that creates no file, no directory and no byte —
its tier fixity, its home population from `listeners[]` BEFORE the register is generated, and its boot-load
of `cfg.filePath` when the path is present); **a legal construction returns an instance and an illegal one
throws and returns NOTHING**; and **two instances over one `cfg.filePath` are the caller's own declared
hazard, not a refused state.**
**Strategy ids.** **`S-CONSTRUCT`** (one drive per outside form of `cfg`'s three keys, plus the two legal
states of an absent `filePath`) · **`S-PROBE-DRY`** (the probe creates nothing: the parent directory, the
file's bytes and the directory's entries are unchanged by a failed construction) · **`S-COUNT`**
(`2` construction entries in ⇒ `2` entries in the store's home, and `0` entries in ⇒ a first write whose
`triggered` is `[]`) · **`S-TWO-PATHS`** (two instances over one path: each boots, the second's `file` write
clobbers the first's bytes, and a fresh boot over that path re-loads the last successful `file` write).
**FAILURE LIST.** a partial instance returned for an illegal construction; an absent `journalLength`
accepted; an absent `listeners` accepted; an absent `filePath` refused; a defaulted key; a fourth key that
changes the outcome; a probe that creates a file, a directory or a byte; a probe that truncates an existing
file; `listeners[]` collapsed from `2` entries to `1`; the home populated AFTER the register is generated;
a package-side refusal of a second instance over one path.
**The clauses it cites.** `§2.1` · `§3.5` · `package.md §4`–`§5` · `parameter-semantics.md`
`PAR-JS-1`–`PAR-JS-4`.
(`[A3 docs/specs/storeroom-native/contract.md §7.1 · §7.2 · §5.7 · P-TP-7 |
requirement]`)

### §5.7 `P-TP-7` — the package's boot, the realm claim, and the handoff set

**Property.** **THE PACKAGE'S OWN BOOT IS `ENVELOPE/PURE` AND REACHES EXACTLY ONE CLAIMED REALM:**
`import`ing the package's ESM entry under a Node runtime at or above the declared floor resolves the
module and loads exactly ONE Node-API addon through the package's internal step; **NO other realm, no second
addon, no subprocess, no shared library and no WASM module is loaded at any point to reach the store**; and
**every unclaimed realm of `§3.2` has a `HO-` row whose own drive asserts ONLY that the package exposes no
entry for it.**
**Strategy ids.** **`S-LOAD`** (one `import` of the entry from outside the unit directory, resolving and
loading the addon) · **`S-ONE-ADDON`** (exactly one `.node` load; no subprocess, no `dlopen` of a second
library, no WASM instantiation) · **`S-HO`** (one drive per `HO-` row: the package exposes no entry for the
realm) · **`S-LAYER`** (the reported figure names its site and its layer, and no `APP`-green is claimed).
**FAILURE LIST.** an import that resolves through a second addon; a shipped CJS arm beside the ESM one; a
documented `require` entry; a wildcard `"./*"` export that exposes the `.node`; a browser or renderer
promise anywhere in the package's documentation; a handoff discharged as a patch; a figure without a site or
a layer; an `APP`-green claimed from a node test.
**The clauses it cites.** `§3.1`–`§3.4` · `§4.1`–`§4.2` · `package.md §1`–`§4`.
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 · A71; A1
docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`/`AR-10`/`AR-17` | requirement]`)

### §5.8 `P-TP-8` — the handle's boundary domain, the trigger's membership, and the no-op set

**Property.** **A RETURNED HANDLE'S MEMBERSHIP IN A `triggered` SET IS DECIDED BY THE PREFIX TEST AND BY
NOTHING ELSE; a handle outside the process-scoped domain is a NO-OP SUCCESS at `unlisten` and removes NO
OTHER REGISTRATION; and the triggered set is a SET whose ORDER IS UNOBSERVABLE AND NEVER ASSERTED.**
**Strategy ids.** **`S-TRIGGER`** (the handle set is exactly the prefix set, descendant-inclusive, on both
`write` and `delete`) · **`S-NOOP`** (a fabricated handle, a foreign-instance handle and an
unknown-but-well-shaped handle are each a no-op success that removes nothing) · **`S-SET`** (set equality,
never a sequence; a registration's order is unobservable) · **`S-FIRE-WINDOW`** (the package's invocation
happens after the verb returns, and a throwing body neither rolls back nor alters the store's result).
**FAILURE LIST.** a handle returned for a listener that did not trigger; a handle omitted for one that did;
a duplicate member where the store minted the token; a foreign or fabricated handle that removes an
existing registration; a drive that asserts a sequence; an invocation before the verb returns; a
`try`/`catch` around a listener body; a rollback triggered by a listener's throw; a listener whose tier
qualifier suppresses (or extends) its own trigger.
**The clauses it cites.** `§2.3` · `§2.7` · `surface.md §3` · `surface.md §7` · `surface.md §10`.
(`[A3 docs/specs/storeroom-native/contract.md §6.5 · §5.8 · P-TP-8 — the store's own member-set rule |
requirement]`)

---

## §6. The parameter-semantics index — every declared JS parameter and where its row lives

**One row per declared JS parameter, carrying its kind, its unit, its domain, the values outside it, the
declared answer for EACH outside value, its supplier, its evaluator and its observable.** **The rows are
`PAR-JS-1`…`PAR-JS-18` and they live at `docs/specs/storeroom-js/parameter-semantics.md` `§2`** — **this
section is the index, and every row below is one map entry, not a restatement** (`[A3
docs/specs/storeroom-native/parameter-semantics.md §1 — the relocated index's own form, cited as the
precedent | cross-reference]`).

| Row | The JS parameter | Its kind | Where it is declared | Its row's home |
| --- | --- | --- | --- | --- |
| **`PAR-JS-1`** | **`cfg`** — the construction's one object argument | `parameter` | `§2.1`, `parameter-semantics.md §2.1` | `parameter-semantics.md` `§2.1` |
| **`PAR-JS-2`** | **`cfg.filePath`** | `parameter` | `§2.1`, `§1.3` | `parameter-semantics.md` `§2.2` |
| **`PAR-JS-3`** | **`cfg.journalLength`** | `parameter` | `§2.1`, `§1.3` | `parameter-semantics.md` `§2.3` |
| **`PAR-JS-4`** | **`cfg.listeners[]`** — the array and its `{ address, handle }` element | `parameter` | `§2.1`, `§1.3` | `parameter-semantics.md` `§2.4` |
| **`PAR-JS-5`** | **`address`** on `read` / `readLiteral` / `write` / `delete` / `listen` | `parameter` | `§1.3`, `§2.2` | `parameter-semantics.md` `§2.5` |
| **`PAR-JS-6`** | **`tier`** on `read` / `readLiteral` — optional, zero to many | `parameter` | `§2.2` (the verb's signature), `§1.3` (`TierArg`'s rows 1, 3 and 5) | `parameter-semantics.md` `§2.6` |
| **`PAR-JS-7`** | **`tier`** on `write` — required, exactly one | `parameter` | `§2.2`, `§1.3` | `parameter-semantics.md` `§2.7` |
| **`PAR-JS-8`** | **`handle`** — the listener's handle, its two spellings and its outside values | `return-field` (its construction-side twin is a `parameter`) | `§2.3`, `§1.3` | `parameter-semantics.md` `§2.8` |
| **`PAR-JS-9`** | **`opId`** on `rollback` | `parameter` | `§1.3`, `§2.2` | `parameter-semantics.md` `§2.9` |
| **`PAR-JS-10`** | **`value`** — the written value's taxonomy | `parameter` | `§1.2` | `parameter-semantics.md` `§2.10` |
| **`PAR-JS-11`** | **`tier`** on `delete` — optional, exactly one when present | `parameter` | `§2.2`, `§1.3` | `parameter-semantics.md` `§2.11` |
| **`PAR-JS-12`** | **`listener`** — the caller's function, held by the package's registry | `callback` | `§2.4`, `§2.7` | `parameter-semantics.md` `§2.12` |
| **`PAR-JS-13`** | **the returned `op`** — the `JournalOp` the write returned, in its JS spelling | `return-field` | `§1.3`, `§2.6`, `§2.8` | `parameter-semantics.md` `§2.13` |
| **`PAR-JS-14`** | **the returned `watched`** — the watched ADDRESSES | `return-field` | `§1.3`, `§2.2` | `parameter-semantics.md` `§2.14` |
| **`PAR-JS-15`** | **the returned `triggered`** — the triggered handles | `return-field` | `§2.7`, `§1.3` | `parameter-semantics.md` `§2.15` |
| **`PAR-JS-16`** | **the returned `tiers`** on the delete receipt | `return-field` | `§1.3` | `parameter-semantics.md` `§2.16` |
| **`PAR-JS-17`** | **the thrown `{status, message}`** — the failure channel's two members | `error-code` | `§2.5` | `parameter-semantics.md` `§2.17` |
| **`PAR-JS-18`** | **the constraint/repair pattern's own carrier** — the `write` → `rollback` pair, declared as a USAGE PATTERN and NOT as a parameter | `vocabulary-token` | `§2.6` | `parameter-semantics.md` `§2.18` |

**ARITHMETIC, PRINTED WITH ITS TERMS: the parameter-semantics set is `18` rows
(`PAR-JS-1`…`PAR-JS-18`) — `15` are parameters or returned fields this unit declares the JS surface as
carrying (`PAR-JS-1`…`PAR-JS-11` and `PAR-JS-13`…`PAR-JS-16`) + `1` callback (`PAR-JS-12`) + `1` error-code
carrier (`PAR-JS-17`) + `1` declared NON-parameter, the constraint pattern (`PAR-JS-18`) — so `15 + 1 + 1 +
1 = 18` ✓.** **Every parameter the JS surface declares has a row, and no parameter outside this list
exists** (`[A3 docs/specs/storeroom-js/parameter-semantics.md §2 — the rows themselves, each printed with
its own cells | numeric or census claim]`). **AND THE PARAMETER ROWS ARE UNCAPPED AND ARE NOT THE
REGISTER'S ROWS** — **the typed `P-*` register is a separate surface whose cap is `≤ 8` and which holds at
`8 ≤ 8` (`§5`), while the `PAR-JS-n` rows are provenance rows and no count in this document is a budget for
them** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — no per-part reading of the cap |
requirement]`).

---

## §7. The census region — the figures this unit carries, each with its site and its layer

### §7.1 The figures, and where each comes from

| # | The figure | Its SITE | Its LAYER | Its status here |
| --- | --- | --- | --- | --- |
| **1** | **the store's own suite green: `377` test functions · `377` PASS · `0` FAIL · `0` un-run, exit `0`; the typed register layer executing `11/11` strategy lines, ALL `HELD`; `cargo build` · `cargo clippy --lib` · `cargo fmt --check src/*.rs` clean** | **the store unit's own tree, as the gate-1 record reads it** (`docs/specs/storeroom-js-proposal-review.md` `§5.1` · `L-6`) | **`ENVELOPE/PURE`** | **QUOTED, NOT RE-MEASURED HERE — this pass holds no execution verb. `374` is the gate-1 FILING's own reading and is marked HISTORICAL; `377` is the figure the record's own measurement prints and is the OPERATIVE one** (`DD-33`) |
| **2** | **the store's e2e JSON round-trip battery: `110/110`, exact match in every case but the two DECLARED normalizations** | **the store unit's own tree, per the gate-1 filing** (`docs/specs/storeroom-js-proposal.md` `§2` item 1) | **`ENVELOPE/PURE`** | **QUOTED. `103` is the FILING's earlier reading and is HISTORICAL; `110` is operative (`G-17`'s sibling, the proposal's `§9.4`)** |
| **3** | **the store's e2e listener-firing battery: `46/46`** | **the store unit's own tree, per the gate-1 filing** | **`ENVELOPE/PURE`** | **QUOTED** |
| **4** | **the store's suite at the `A69` correction pass: `373 PASS / 1 FAIL` for the refuted per-instance remedy, and `377/377` on the handed-back tree** | **the proposal's `§12` measurement** | **`ENVELOPE/PURE`** | **QUOTED, and it is the evidence the refusal at `§2.3` rests on** |
| **5** | **the toolchain probe: Rust `1.98.0` · `cargo` offline-capable · Node `v24.20.0` · npm `12.0.2` · `pnpm` present · NO `napi` CLI on `PATH`** | **`docs/next-steps.md` `L-4`'s probe, at the gate-1 record's reading** | **`ENVELOPE/PURE` (a record reading, not this pass's measurement)** | **QUOTED. AND THE ABSENT CLI IS RESOLVED RATHER THAN BLOCKING: it is the PACKAGING front end and not the COMPILER front end, and the recommended builder path does not require it** (`DD-2`, `AR-16`) |
| **6** | **the out-of-repo blind harness at `/tmp/storeroom-blind/` — a scratch crate with a path dependency** | **out of this repository; named by the gate-1 filing** (`docs/specs/storeroom-js-proposal.md` `§2` item 5) | **out-of-repo EVIDENCE** | **PRECEDENT FOR THE SHAPE of the sibling crate's path dependency, NEVER AUTHORITY; it has no in-repo site and none is claimed** (`AR-10`, `AR-27`) |
| **7** | **this directory's closure: `6 = 6`** | **`docs/specs/storeroom-js/`'s own file set, read this pass** | **a file-set `CENSUS`** | **A claim about the FILE SET and not about the package's behaviour** (`§0.1` item 10) |
| **8** | **the crossing's own counts: `13` value rows · `8` carriers · `56` carrier-variant rows** | **`§1.2`/`§1.3` of this document, and `crossing.md §1`–`§2`** | **a table `CENSUS`** | **THIS UNIT'S OWN, re-derivable from the tables by their own first columns** (`§1.6`) |
| **9** | **the register's count: `8` rows, cap `≤ 8`** | **`§5` of this document** | **a table `CENSUS`** | **THIS UNIT'S OWN** |
| **10** | **the parameter-semantics count: `18` rows** | **`§6` of this document, and `parameter-semantics.md §2`** | **a table `CENSUS`** | **THIS UNIT'S OWN** |
| **11** | **`P-1`'s carriage census: `28` rows; `P-1`'s own enumeration as read from `docs/pending.md` names `27` ids and one row whose id is not recoverable** | **`docs/pending.md` `P-1`'s own text** | **a `CENSUS` of a tracker row** | **NON-RE-DERIVABLE IN PART — the partition table that carried the `28` does not survive in any artifact this workspace holds (`G-1`); the disposal is at `§7.3` and the finding is at `§8` item 1** |

**AND THE LAYER STATEMENT, IN ONE LINE:** **every figure above is an `ENVELOPE/PURE` or file-set figure;
the ASSEMBLED/`APP` layer for this unit is `NONE`, and no figure here may be reported as an `APP`-green**
(`§4.2`; `DD-20`).

### §7.2 The two figures the gate-1 record names as needing their terms printed

**`G-17`'s own finding, restated with its terms and nothing added: the operative store green is `377/377`,
while the filing, `docs/next-steps.md`'s `N3` row and both step reports print `374/374` or `374`; the three
cells the `A69` correction pass added (`377 − 374 = 3`) post-date the `374/374` figures the filing cites.**
**Therefore `377` is OPERATIVE and `374` is the filing-time reading, and every figure in this contract that
quotes the store's green names which of the two it means** (`DD-33`)
(`[A1 docs/specs/storeroom-js-proposal-review.md §1.2 · `G-17` | numeric or census claim]`).
**AND THE SECOND FIGURE, RESTATED THE SAME WAY:** **the JSON battery's `103`-versus-`110` pair is settled the
same way — the numeric cells were added after the first authoring, so `110` is OPERATIVE and `103` is
HISTORICAL** (`[A1 docs/specs/storeroom-js-proposal-review.md §3 · `U26` | numeric or census claim]`).

### §7.3 THE ROW-BY-ROW MAP OF `P-1`'S `28` ROWS — every id disposed of EXACTLY ONCE

**WHAT THIS TABLE IS, AND WHAT IT IS NOT.** **It disposes of every id `P-1`'s own enumeration carries, each
EXACTLY ONCE, into one of four dispositions: THIS UNIT · a `HO-` HANDOFF ROW · ANOTHER UNIT · OUT OF SCOPE
WITH ITS REASON.** **IT IS NOT A RECONSTRUCTION.** **The partition table that carried the `28` — the
listener unit's re-filed gate-1 record's `§10.1` table — DOES NOT SURVIVE in any artifact this workspace
holds, and the gate-1 record's `G-1` records exactly that as a STALE CITATION.** **So this table disposes of
the ids `P-1`'s OWN TEXT ENUMERATES, prints the two facts the gate-1 record requires it to print (the
`secure` row and `J-13`'s absence), and MARKS THE CENSUS NON-RE-DERIVABLE rather than inventing the missing
row's id** (`DD-47`; `docs/specs/storeroom-js-proposal-review.md §1.2 · `G-1`; its `§5.4` · `AR-8`).

| # | The id | Its subject, as `P-1`'s enumeration carries it | Its disposition | The clause or row that disposes of it |
| --- | --- | --- | --- | --- |
| 1 | **`J-1`** | an integration row carried by `P-1`'s enumeration and named nowhere else in the readable corpus | **OUT OF SCOPE — its subject is not recoverable from any artifact this workspace holds, and this contract invents no subject for it** | `§8` item 1 (the census finding) |
| 2 | **the integration half of `J-2`** | *"the integration halves of `J-2`"* — the store-side half is the store's own | **OUT OF SCOPE** — the store half is the store's and is not this unit's | `§3.4`; `DD-32` |
| 3 | **`J-3`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 4 | **the integration half of `J-4`** | as row 2 | **OUT OF SCOPE** — the store half is the store's | `§3.4`; `DD-32` |
| 5 | **`J-5`** | the journal as an observable across the boundary | **THIS UNIT** — the returned `op` crosses as a JS value and `rollback` consumes its `opId` | `§6`'s `PAR-JS-13` · `§6`'s `PAR-JS-9` · `§2.6` |
| 6 | **`J-6`** | **the realm** | **THIS UNIT** — claimed `{ Node ESM }`; every other realm is a `HO-` row | `§3.1` · `§3.2` |
| 7 | **`J-7`** | **the builder/ABI and the packaging path** | **THIS UNIT** — the sibling crate's builder path, the prebuild matrix and the CI | `§3.3` · `§3.4`; `package.md §3`–`§4` |
| 8 | **`J-8`** | **the host handoff** | **`HO-` HANDOFF ROW — `HO-1`…`HO-7`, and the host-wiring prohibition** | `§3.2` · `§4.5` · `§9`; `DD-21` |
| 9 | **`J-9`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 10 | **`J-10`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 11 | **`J-12`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 12 | **`J-13`** | **ABSENT FROM `P-1`'s ENUMERATION — and this is the fact the gate-1 record requires printed** | **OUT OF SCOPE, with its reason: the subject was NEVER CLEANLY ASSIGNED — `P-1`'s enumeration carries `U-24` and does NOT carry `J-13` at all, so no row of the park ever assigned it, and this unit's `§2.6` disposes of the SUBJECT (the module-supplied functions' crossing) as a client-side pattern** | `§2.6`; `DD-16`; `§8` item 2 |
| 13 | **`J-14`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 14 | **`J-15`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 15 | **`J-22`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 16 | **`J-23`** | **the crossing of the returned journal op** | **THIS UNIT** — `JournalOp` crosses member for member in the store's own spellings | `§6`'s `PAR-JS-13`; `DD-39` |
| 17 | **`J-24`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 18 | **`J-26`** | **the watched-address list** | **THIS UNIT** — `watched` crosses as a JS array of addresses | `§6`'s `PAR-JS-14` |
| 19 | **`J-27`** | **the attachment rule** | **THIS UNIT** — the package's registry keyed by the handle; the firing window | `§2.4` · `§2.7`; `DD-15`, `DD-22` |
| 20 | **`J-28`** | **a throwing body** | **THIS UNIT** — a throwing listener body is neither caught nor reported | `§2.7` item 4; `DD-23` |
| 21 | **`J-29`** | as row 1 | **OUT OF SCOPE — subject not recoverable** | `§8` item 1 |
| 22 | **`U-23`** | **the resolver's returned shape across the boundary** | **OUT OF SCOPE BY RULING — `findAddress` is INTERNAL and NOT EXPOSED; no `NodeRef` crosses** | `§2.9`; `DD-14`'s neighbourhood; `A63` |
| 23 | **`U-24`** | **the module-supplied functions' crossing** | **OUT OF SCOPE BY RULING — constraint/repair is client-side over the declared `write`→`rollback` pair; no seam, no function parameter** | `§2.6`; `DD-16`; `A73` |
| 24 | **`U-25`** | **the packaging** | **THIS UNIT** — the publish story, the identity, the matrix and the licence | `§3.3`; `package.md §3`; `DD-25`, `DD-26`, `DD-42` |
| 25 | **`U-26`** | **the surface's ownership** | **THIS UNIT** — one `Store` per instance, caller-owned, no release verb, and the two-instances hazard declared | `§3.5`; `DD-17` |
| 26 | **`U-34`** | **the boundary's taxonomy crossing** | **THIS UNIT** — the whole crossing table | `§1.2`–`§1.4`; `crossing.md` |
| 27 | **`U-38`** | **the consumer question** | **`HO-` HANDOFF ROW** — the wiring is the consuming project's own agents' | `§3.2` · `§9`; `DD-21` |
| 28 | **`U-39`** | **the event surface** | **THIS UNIT** — the registry, the delivery and the firing window | `§2.4` · `§2.7`; `DD-15`, `DD-22`, `DD-23` |
| 29 | **`U-40`** | **the parameter rows' arity** | **THIS UNIT** — the parameter-semantics set's `18` rows | `§6`; `parameter-semantics.md §2` |
| 30 | **`U-45`** | **the in-flight cycle's disposition** | **THIS UNIT** — the firing window and the order-insignificance | `§2.7`; `DD-22` |
| 31 | **the `secure` row** | **`P-1`'s OWN ENUMERATION CARRIES A `secure` ROW, AND THIS CONTRACT CANNOT DISPOSE OF ITS ID — the subject is the `secure` instance's mechanism, and the row's own id is not carried by any artifact this workspace holds** | **OUT OF SCOPE, with its subject disposed of and its id recorded as NON-RE-DERIVABLE: the `secure` instance and its `file` floor are the STORE's own (`A4`/`A32`, `DD-13`'s store-side row) and this unit declares no `secure` parameter, no `secure` tier and no floor check** | `§8` item 1; `parameter-semantics.md`'s NOT-a-parameter statement for the floor |

**THE ARITHMETIC, PRINTED WITH ITS TERMS AND WITH ITS OWN HONESTY:** **this table disposes of `31` rows —
the `27` ids `P-1`'s own enumeration names that are dispositionable by id, plus the `secure` row (whose
subject is disposed of and whose id is not recoverable), plus `J-13` (whose ABSENCE is the fact recorded),
plus the two integration halves of `J-2`/`J-4`** — **and the census it explains is `28`, so
`31 − 3 = 28` is NOT the arithmetic and this contract does not print it as if it were: what it prints is
that the `28` count and the `27`-id enumeration are `P-1`'s OWN, that ONE row of the `28` has no recoverable
id, that the `secure` row is that row or is a second such row, and that the disposal above therefore covers
EVERY ID THE ENUMERATION CARRIES and leaves exactly ONE census item UNRESOLVED — recorded as a finding at
`§8` item 1 rather than smoothed into an equal count.** **NO ID IS INVENTED, NO ROW IS DROPPED FROM THE
DISPOSAL, AND `J-13`'s ABSENCE IS PRINTED AS THE FACT IT IS** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-8` — the map's own requirement; `docs/pending.md`
`P-1`'s own enumeration, read at its own bytes | numeric or census claim]`).

---

## §8. CONTRACT FINDINGS for the store's author — clauses this unit needs and the store's contract does not carry

**WHAT A CONTRACT FINDING IS, AND WHAT IT IS NOT.** **A CONTRACT FINDING is a place where THIS unit needs a
clause, or meets a clause that does not resolve, and the clause belongs to ANOTHER unit's directory.**
**It is REPORTED HERE AND NEVER PATCHED INLINE** — **the store's contract directory
`docs/specs/storeroom-native/**` is not written by this pass, no `§`-number there is moved, and no byte of
its parts changes** (`DD-32`; **A1** `A68`; **A3** `docs/specs/storeroom-native/contract.md §0.1` item 2 —
no clause of this document is written to a path that does not resolve, and no foreign directory is edited
from here). **Each finding names its site, what this unit needed, and the disposition this unit took in the
meantime.**

| # | The finding | Its site | What this unit needed | The disposition taken HERE, pending the store author's own row |
| --- | --- | --- | --- | --- |
| **1** | **`P-1`'s `28`-row census is NOT RE-DERIVABLE from any artifact this workspace holds.** `P-1`'s own text names `27` ids and says the `28` rows are *"the `28` INTEGRATION rows of the gate-1 record's `§10.1` partition"*, while **that partition table does not survive** and `G-1` records the citation as STALE. **AND THE ENUMERATION CARRIES A `secure` ROW WHOSE ID IS NOT CARRIED BY `P-1`'s TEXT, WHILE THE FILING'S OWN SUBJECT LIST OMITS THE `secure` SUBJECT ENTIRELY — so the count `28` closes and the omission is invisible in the arithmetic** | `docs/pending.md` `P-1`; `docs/specs/storeroom-js-proposal-review.md §1.2` · `G-1` and its `§3` · `K13` | a census this unit's contract could dispose of row by row, exactly once | **the disposal is printed at `§7.3`, the census is MARKED NON-RE-DERIVABLE, ONE census item is recorded as UNRESOLVED, and NO id is invented** (`DD-47`) |
| **2** | **`J-13` occurs NOWHERE in `P-1`'s enumeration.** The park carries `U-24` (the module-supplied functions' crossing) and **does not carry `J-13` at all** | `docs/pending.md` `P-1`; `docs/specs/storeroom-js-proposal-review.md §1.2` · `G-11` | an assignment for the subject, or the statement that it was never assigned | **recorded as the fact it is at `§7.3` row 12, and the SUBJECT is disposed of at `§2.6` as a client-side pattern over the declared `write`→`rollback` pair** (`A73`; `DD-16`) |
| **3** | **THE STORE'S GREEN FIGURE IS STALE IN THREE PLACES.** The filing, `docs/next-steps.md`'s `N3` row and both step reports print `374/374` or `374`, while the record's own measurement and the correction pass's hand-back print `377/377` (`377 − 374 = 3`, the three cells the `A69` correction pass added) | `docs/specs/storeroom-js-proposal-review.md §1.2` · `G-17`; `docs/next-steps.md` `N3`; `docs/specs/storeroom-js-proposal.md §2` item 1 | one operative figure, with the as-filed readings named as historical | **`377` is treated as OPERATIVE and `374` as HISTORICAL wherever this directory quotes the store's green; the tracker reconciliation belongs to the supervisor's tracker pass (`AR-20`) and is not taken here** (`DD-33`; `§7.2`) |
| **4** | **THE STORE'S CLOSED SET'S OWN RANK CITATIONS ARE STALE IN ITS `src/**` COMMENTS.** `src/error.rs`'s trigger constructors still carry the PRE-AMENDMENT ranks — e.g. the `value_not_admitted` constructor's doc comment reads *"`§8.1` #13 at `F-2`"* and the `file_commit_failed` constructor's reads *"`§8.1` #14"* — while the store's contract renumbers those two members to `14` and `15` and the crate's own `CODES` array prints them at indices `13` and `14` | `src/error.rs`, the two constructors' doc comments; `docs/specs/storeroom-native/contract.md §8.1` #14/#15 | a comment that agrees with the set the crate itself closes | **reported only: no `src/**` byte is written by this pass, the code and the behaviour are UNCHANGED (the constructors pass the code as a literal, not as a rank) and the correction is a comment edit for the store's author or its proofreader** (`DD-32`) |
| **5** | **THE `secure` INSTANCE'S ROW IS UNREACHABLE FROM THIS DIRECTION, AND ITS FLOOR IS A CLIENT-SIDE DUTY THE STORE DECLINES.** The store declares no `secure` tier, no floor parameter and no floor check, and the `secure` instance's own construction is `A4`'s | `docs/specs/storeroom-native/contract.md §8.1` #2 and its `§10.2` item 6; `parameter-semantics.md §2.11` | the statement of whether a JS consumer can construct a `secure` instance at all, and what this unit owes for the floor | **this unit declares NO `secure` parameter, NO `secure` tier and NO floor check; a caller that needs the floor enforces it client-side, and `unlisten`-style no-op reasoning does not apply to it** (`DD-13`'s store-side row; `parameter-semantics.md`'s NOT-a-parameter statement) |

**AND ONE THING THIS SECTION DOES NOT DO: it files no `HO-` row, patches no consumer, and amends no byte of
any directory but this one.** **A finding against a CONSUMING project would be a `HO-` row in
`docs/defects.md` and never a patch** (`DD-21`) — **and the `HO-` rows this unit OWES are the realm rows of
`§3.2`, minted here as `HO-1`…`HO-7` and landed as tracker rows by the tracker gate** (`DD-41`)
(`[A1 docs/specs/storeroom-js-proposal-review.md §6 item 3 — no byte of the store's tree moves; A1
docs/specs/storeroom-js-proposal.md §11 · A68 | prohibition]`).

---

## §9. The handoff ledger — `HO-1`…`HO-7`, each with its owner and its positive revisit condition

**THE LEDGER IS PRINTED HERE IN ONE PLACE SO NO HANDOFF IS A BARE `OWED`.** **The rows are `§3.2`'s realm
rows and they are not restated: this table carries the owner, the duty and the revisit condition, and
`§3.2` carries the substance** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-7` — each
unclaimed realm owing its declared answer, and the ids minted at this gate | requirement]`).

| HO | The realm or route | The DUTY it carries | Its OWNER | Its positive revisit condition |
| --- | --- | --- | --- | --- |
| **`HO-1`** | **Node CJS** | the package publishes NO CJS arm and NO `require` entry; a CJS consumer's own ESM interop is the consumer's side | **the consuming project's own agents** (`A2`'s route) | a fresh ruling claiming CJS, recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this directory |
| **`HO-2`** | **Electron `main`** | no Electron-specific rebuild, config or note is shipped; the ABI question is the CONSUMER's host-configuration duty | **the consuming project's own agents** | as `HO-1` |
| **`HO-3`** | **Electron `preload`** | as `HO-2`, on the narrower preload surface | **the consuming project's own agents** | as `HO-1` |
| **`HO-4`** | **Electron `renderer`** | nothing is shipped and nothing is promised; a renderer consumer must go through the consumer's own main process | **the consuming project's own agents** | as `HO-1` |
| **`HO-5`** | **the browser** | nothing is shipped; the promise would be false by construction, because a bundler cannot resolve a platform binary | **the consuming project's own agents** | a fresh ruling, which would need a carrier other than a Node-API addon |
| **`HO-6`** | **workers** | no worker-specific entry, no transferable-value plan and no shared-memory clause is declared; a `worker_threads` consumer uses the same ESM entry at its own ABI risk | **the consuming project's own agents** | as `HO-1` |
| **`HO-7`** | **any IPC route** | no bridge, no channel protocol and no serialized value form is shipped; **the route is A SECOND CROSSING and belongs to a unit that can own a second serialization contract** | **a FUTURE UNIT, not yet minted and not named here** | a fresh ruling, followed by that unit's own gate 1 |

**ARITHMETIC, PRINTED WITH ITS TERMS: `7` handoff rows — `6` unclaimed realms (`HO-1`…`HO-6`) + `1` route
(`HO-7`) — `6 + 1 = 7` ✓, and NO row is a bare `OWED`: each names an owner and a positive revisit
condition** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-7` · `AR-12` | numeric or census
claim]`). **AND ONE BOUNDARY CARRIED SO THE LEDGER IS NOT READ AS A TASK LIST: this unit DISPATCHES NO
IMPLEMENTER into any consumer, and a `HO-` duty discharged as a patch is a FAILURE of this unit's own
stop conditions** (`[A1 docs/specs/storeroom-js/implementation-plan.md §5 — stop condition `D` |
prohibition]`).

---

**END OF THE CONTRACT DOCUMENT.** **The index region states the status, the unit and prefix, the scope
boundary and the part map; `§0` the claim-ledger rules, the `47`-row design-defaults table and the
dossier's clause-cell resolution; `§1` the value crossing; `§2` the JS surface; `§3` the package; `§4` the
acceptance layer; `§5` the typed register's `8` rows; `§6` the parameter-semantics index; `§7` the census
region with `P-1`'s `28`-row disposal; `§8` the CONTRACT FINDINGS for the store's author; and `§9` the
handoff ledger — and the order is the ADOPTED BUILD ORDER (the crossing → the surface → the package → the
acceptance layer → the plan), with no step taking its input from a later stage** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.3 — the recommended variant `V1` and its ordering ground |
ordering claim]`). **This directory's closure predicate reads `6 = 6` and its state is `CLOSED`.**
**No unit row is admitted, no `DONE` row is re-opened, no artifact is frozen and no ledger count moves:
`docs/next-steps.md` stands `1 DONE / 2 open` UNITS = `3`** (`[A1
docs/specs/storeroom-js-proposal-review.md §6 item 2 | numeric or census claim]`).
